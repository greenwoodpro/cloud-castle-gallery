export const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t
export const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a), 0, 1)
  return t * t * (3 - 2 * t)
}

export function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export class Rng {
  private r: () => number
  constructor(seed: number) {
    this.r = mulberry32(seed)
  }
  next() {
    return this.r()
  }
  range(a: number, b: number) {
    return a + (b - a) * this.r()
  }
  int(a: number, b: number) {
    return Math.floor(this.range(a, b + 1))
  }
  pick<T>(arr: readonly T[]): T {
    return arr[Math.floor(this.r() * arr.length) % arr.length]
  }
  chance(p: number) {
    return this.r() < p
  }
}

function hash2(ix: number, iy: number) {
  let h = Math.imul(ix, 374761393) ^ Math.imul(iy, 668265263)
  h = Math.imul(h ^ (h >>> 13), 1274126177)
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295
}

/** value noise, 0..1 */
export function noise2(x: number, y: number) {
  const ix = Math.floor(x)
  const iy = Math.floor(y)
  const fx = x - ix
  const fy = y - iy
  const u = fx * fx * (3 - 2 * fx)
  const v = fy * fy * (3 - 2 * fy)
  const a = hash2(ix, iy)
  const b = hash2(ix + 1, iy)
  const c = hash2(ix, iy + 1)
  const d = hash2(ix + 1, iy + 1)
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v
}

export function fbm(x: number, y: number, octaves = 4) {
  let s = 0
  let a = 0.5
  let f = 1
  for (let i = 0; i < octaves; i++) {
    s += a * noise2(x * f, y * f)
    f *= 2
    a *= 0.5
  }
  return s
}

/** ridged noise, 0..1 */
export function ridged(x: number, y: number, octaves = 3) {
  let s = 0
  let a = 0.55
  let f = 1
  for (let i = 0; i < octaves; i++) {
    s += a * (1 - Math.abs(noise2(x * f, y * f) * 2 - 1))
    f *= 2.1
    a *= 0.5
  }
  return s
}
