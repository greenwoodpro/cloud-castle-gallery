/**
 * 确定性伪随机与值噪声。
 * 用固定种子保证每次刷新岛屿形状一致，方便调参与截图对比。
 */

export function makeRandom(seed = 20250607) {
  let s = seed >>> 0
  return function random(): number {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}

export type Random = ReturnType<typeof makeRandom>

export function range(rand: Random, min: number, max: number): number {
  return min + rand() * (max - min)
}

export function pick<T>(rand: Random, items: readonly T[]): T {
  return items[Math.floor(rand() * items.length) % items.length]
}

function hash2(x: number, y: number, seed: number): number {
  let h = Math.imul(x | 0, 374761393) ^ Math.imul(y | 0, 668265263) ^ Math.imul(seed | 0, 2246822519)
  h = Math.imul(h ^ (h >>> 13), 1274126177)
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296
}

function smooth(t: number): number {
  return t * t * (3 - 2 * t)
}

/** 二维值噪声，返回 0..1。 */
export function valueNoise2(x: number, y: number, seed = 1): number {
  const xi = Math.floor(x)
  const yi = Math.floor(y)
  const xf = x - xi
  const yf = y - yi
  const a = hash2(xi, yi, seed)
  const b = hash2(xi + 1, yi, seed)
  const c = hash2(xi, yi + 1, seed)
  const d = hash2(xi + 1, yi + 1, seed)
  const u = smooth(xf)
  const v = smooth(yf)
  return a * (1 - u) * (1 - v) + b * u * (1 - v) + c * (1 - u) * v + d * u * v
}

/** 分形叠加噪声，返回约 -1..1。 */
export function fbm2(x: number, y: number, octaves = 4, seed = 1): number {
  let amp = 0.5
  let freq = 1
  let sum = 0
  let norm = 0
  for (let i = 0; i < octaves; i++) {
    sum += amp * valueNoise2(x * freq, y * freq, seed + i * 17)
    norm += amp
    amp *= 0.5
    freq *= 2.03
  }
  return (sum / norm) * 2 - 1
}

export function clamp(v: number, min: number, max: number): number {
  return v < min ? min : v > max ? max : v
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

/** 平滑阶梯，用于地形区域之间的柔和过渡。 */
export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp((x - edge0) / (edge1 - edge0 || 1e-6), 0, 1)
  return t * t * (3 - 2 * t)
}
