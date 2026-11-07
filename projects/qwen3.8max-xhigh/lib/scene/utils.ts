import * as THREE from 'three'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'

/* ------------------------------------------------------------------ */
/* 随机与噪声                                                          */
/* ------------------------------------------------------------------ */

/** 可复现的伪随机数发生器，保证每次刷新岛屿形状一致。 */
export function mulberry32(seed: number) {
  let a = seed >>> 0
  return function random() {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export type Random = () => number

export function makeRandomRange(random: Random) {
  return {
    range: (min: number, max: number) => min + random() * (max - min),
    int: (min: number, max: number) => Math.floor(min + random() * (max - min + 1)),
    pick: <T>(items: readonly T[]): T => items[Math.floor(random() * items.length)],
    sign: () => (random() < 0.5 ? -1 : 1),
  }
}

function hash3(ix: number, iy: number, iz: number, seed: number) {
  let h = ix * 374761393 + iy * 668265263 + iz * 2147483647 + seed * 1274126177
  h = (h ^ (h >>> 13)) * 1274126177
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296
}

function smooth(t: number) {
  return t * t * (3 - 2 * t)
}

/** 三维值噪声，用于地形与岩石的不规则起伏。 */
export function noise3(x: number, y: number, z: number, seed = 1): number {
  const ix = Math.floor(x)
  const iy = Math.floor(y)
  const iz = Math.floor(z)
  const fx = smooth(x - ix)
  const fy = smooth(y - iy)
  const fz = smooth(z - iz)

  const c000 = hash3(ix, iy, iz, seed)
  const c100 = hash3(ix + 1, iy, iz, seed)
  const c010 = hash3(ix, iy + 1, iz, seed)
  const c110 = hash3(ix + 1, iy + 1, iz, seed)
  const c001 = hash3(ix, iy, iz + 1, seed)
  const c101 = hash3(ix + 1, iy, iz + 1, seed)
  const c011 = hash3(ix, iy + 1, iz + 1, seed)
  const c111 = hash3(ix + 1, iy + 1, iz + 1, seed)

  const x00 = c000 + (c100 - c000) * fx
  const x10 = c010 + (c110 - c010) * fx
  const x01 = c001 + (c101 - c001) * fx
  const x11 = c011 + (c111 - c011) * fx
  const y0 = x00 + (x10 - x00) * fy
  const y1 = x01 + (x11 - x01) * fy
  return y0 + (y1 - y0) * fz
}

export function noise2(x: number, y: number, seed = 1): number {
  return noise3(x, y, 0.37, seed)
}

/** 分形叠加噪声，返回 0..1。 */
export function fbm(x: number, y: number, z: number, octaves = 4, seed = 1): number {
  let amp = 0.5
  let freq = 1
  let sum = 0
  let norm = 0
  for (let i = 0; i < octaves; i++) {
    sum += noise3(x * freq, y * freq, z * freq, seed + i * 17) * amp
    norm += amp
    amp *= 0.5
    freq *= 2.03
  }
  return sum / norm
}

export function clamp(v: number, min: number, max: number) {
  return v < min ? min : v > max ? max : v
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

export function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp((x - edge0) / (edge1 - edge0 || 1e-6), 0, 1)
  return t * t * (3 - 2 * t)
}

/* ------------------------------------------------------------------ */
/* 材质：柔和的卡通渐变，模拟水彩晕染                                    */
/* ------------------------------------------------------------------ */

let gradientMapCache: THREE.DataTexture | null = null

/** 8 级柔和渐变贴图，比硬边卡通着色更接近水彩的层层渲染。 */
export function getGradientMap(): THREE.DataTexture {
  if (gradientMapCache) return gradientMapCache
  const steps = 8
  const data = new Uint8Array(steps * 4)
  for (let i = 0; i < steps; i++) {
    const t = i / (steps - 1)
    // 暗部不要压太死，保留水彩的通透感
    const v = Math.round((0.46 + 0.54 * Math.pow(t, 0.82)) * 255)
    data[i * 4] = v
    data[i * 4 + 1] = v
    data[i * 4 + 2] = v
    data[i * 4 + 3] = 255
  }
  const tex = new THREE.DataTexture(data, steps, 1, THREE.RGBAFormat)
  tex.minFilter = THREE.LinearFilter
  tex.magFilter = THREE.LinearFilter
  tex.wrapS = THREE.ClampToEdgeWrapping
  tex.wrapT = THREE.ClampToEdgeWrapping
  tex.needsUpdate = true
  gradientMapCache = tex
  return tex
}

export function toonMaterial(opts: {
  flatShading?: boolean
  transparent?: boolean
  opacity?: number
  side?: THREE.Side
  emissive?: number
  emissiveIntensity?: number
  depthWrite?: boolean
} = {}): THREE.MeshToonMaterial {
  // 注意：r186 的 MeshToonMaterial 不再接受 flatShading，低多边形的硬边感靠几何本身的平滑组实现
  void opts.flatShading
  return new THREE.MeshToonMaterial({
    vertexColors: true,
    gradientMap: getGradientMap(),
    transparent: opts.transparent ?? false,
    opacity: opts.opacity ?? 1,
    side: opts.side ?? THREE.FrontSide,
    emissive: new THREE.Color(opts.emissive ?? 0x000000),
    emissiveIntensity: opts.emissiveIntensity ?? 1,
    depthWrite: opts.depthWrite ?? true,
  })
}

/* ------------------------------------------------------------------ */
/* 几何批处理器：把成百上千个小构件合并成极少的 draw call                 */
/* ------------------------------------------------------------------ */

const _m4 = new THREE.Matrix4()
const _q = new THREE.Quaternion()
const _v3 = new THREE.Vector3()
const _v3b = new THREE.Vector3()
const _euler = new THREE.Euler()
const _color = new THREE.Color()

export type Placement = {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number | [number, number, number]
}

function applyPlacement(geo: THREE.BufferGeometry, p?: Placement) {
  if (!p) return geo
  _v3.set(...(p.position ?? [0, 0, 0]))
  _euler.set(...(p.rotation ?? [0, 0, 0]))
  _q.setFromEuler(_euler)
  const s = p.scale
  const sv = typeof s === 'number' ? _v3b.set(s, s, s) : _v3b.set(s?.[0] ?? 1, s?.[1] ?? 1, s?.[2] ?? 1)
  _m4.compose(_v3, _q, sv)
  geo.applyMatrix4(_m4)
  return geo
}

/** 统一属性集合（position / normal / uv / color），保证 mergeGeometries 不会失败。 */
function normalizeGeo(geo: THREE.BufferGeometry, color: THREE.Color): THREE.BufferGeometry {
  if (!geo.getAttribute('normal')) geo.computeVertexNormals()
  if (!geo.getAttribute('uv')) {
    const count = geo.getAttribute('position').count
    geo.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(count * 2), 2))
  }
  const count = geo.getAttribute('position').count
  const colors = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    colors[i * 3] = color.r
    colors[i * 3 + 1] = color.g
    colors[i * 3 + 2] = color.b
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  // 清理多余属性，避免合并时属性集合不一致
  for (const name of Object.keys(geo.attributes)) {
    if (!['position', 'normal', 'uv', 'color'].includes(name)) geo.deleteAttribute(name)
  }
  return geo
}

/** 给单个几何体填上统一顶点色，供 vertexColors 材质直接使用。 */
export function withColor(geo: THREE.BufferGeometry, color: number): THREE.BufferGeometry {
  _color.setHex(color)
  return normalizeGeo(geo, _color.clone())
}

/** 给几何体加上轻微的水彩色斑（顶点色扰动）。 */
export function mottle(geo: THREE.BufferGeometry, amount = 0.07, seed = 7): THREE.BufferGeometry {
  const pos = geo.getAttribute('position') as THREE.BufferAttribute
  const col = geo.getAttribute('color') as THREE.BufferAttribute | undefined
  if (!col) return geo
  for (let i = 0; i < pos.count; i++) {
    const n = fbm(pos.getX(i) * 0.55, pos.getY(i) * 0.55, pos.getZ(i) * 0.55, 2, seed)
    const k = 1 + (n - 0.5) * 2 * amount
    col.setXYZ(i, col.getX(i) * k, col.getY(i) * k, col.getZ(i) * k)
  }
  col.needsUpdate = true
  return geo
}

export class Batcher {
  private parts: THREE.BufferGeometry[] = []

  add(geo: THREE.BufferGeometry, color: number, placement?: Placement) {
    const g = applyPlacement(geo.clone(), placement)
    _color.setHex(color)
    this.parts.push(normalizeGeo(g, _color.clone()))
    return this
  }

  /** 直接加入一个已经带好顶点色的几何体。 */
  addRaw(geo: THREE.BufferGeometry, placement?: Placement) {
    this.parts.push(applyPlacement(geo.clone(), placement))
    return this
  }

  get count() {
    return this.parts.length
  }

  build(material: THREE.Material, opts: { mottle?: number; seed?: number } = {}): THREE.Mesh | null {
    if (this.parts.length === 0) return null
    let merged: THREE.BufferGeometry | null
    const allIndexed = this.parts.every((g) => g.index !== null)
    const prepared = allIndexed ? this.parts : this.parts.map((g) => (g.index ? g.toNonIndexed() : g))
    try {
      merged = mergeGeometries(prepared, false)
    } catch {
      merged = mergeGeometries(
        prepared.map((g) => (g.index ? g.toNonIndexed() : g)),
        false,
      )
    }
    for (const g of this.parts) g.dispose()
    this.parts = []
    if (!merged) return null
    if (opts.mottle) mottle(merged, opts.mottle, opts.seed ?? 3)
    merged.computeBoundingSphere()
    const mesh = new THREE.Mesh(merged, material)
    mesh.castShadow = true
    mesh.receiveShadow = true
    return mesh
  }

  /** 构建后不释放缓存，允许同一个 Batcher 复用（用于需要多材质的情况）。 */
  get isEmpty() {
    return this.parts.length === 0
  }
}

/* ------------------------------------------------------------------ */
/* 常用几何生成                                                        */
/* ------------------------------------------------------------------ */

/** 圆角盒子：把 BoxGeometry 的顶点向外推成柔和的枕形，避免生硬的直角。 */
export function roundedBoxGeometry(w: number, h: number, d: number, radius = 0.12, segments = 3) {
  const geo = new THREE.BoxGeometry(w, h, d, segments, segments, segments)
  const pos = geo.getAttribute('position') as THREE.BufferAttribute
  const hx = w / 2
  const hy = h / 2
  const hz = d / 2
  const r = Math.min(radius, Math.min(hx, hy, hz) * 0.95)
  const v = new THREE.Vector3()
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i)
    const cx = clamp(v.x, -hx + r, hx - r)
    const cy = clamp(v.y, -hy + r, hy - r)
    const cz = clamp(v.z, -hz + r, hz - r)
    const dx = v.x - cx
    const dy = v.y - cy
    const dz = v.z - cz
    const len = Math.hypot(dx, dy, dz)
    if (len > 1e-6) {
      const k = r / len
      v.set(cx + dx * k, cy + dy * k, cz + dz * k)
      pos.setXYZ(i, v.x, v.y, v.z)
    }
  }
  pos.needsUpdate = true
  geo.computeVertexNormals()
  return geo
}

/** 拱形开口：半圆顶 + 矩形腿，用于城门、窗、壁炉。 */
export function archShapeGeometry(width: number, height: number, depth: number) {
  const r = width / 2
  const straight = Math.max(0, height - r)
  const shape = new THREE.Shape()
  shape.moveTo(-r, 0)
  shape.lineTo(-r, straight)
  shape.absarc(0, straight, r, Math.PI, 0, true)
  shape.lineTo(r, 0)
  shape.lineTo(-r, 0)
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.04,
    bevelSegments: 1,
    curveSegments: 12,
  })
  geo.translate(0, 0, -depth / 2)
  return geo
}

/** 一段城齿（雉堞）。 */
export function merlonGeometry(w = 0.62, h = 0.85, d = 0.7) {
  return roundedBoxGeometry(w, h, d, 0.06, 2)
}

/** 圆锥屋顶，带一点弧度让它像手绘的尖顶。 */
export function conicalRoofGeometry(radius: number, height: number, segments = 14) {
  const geo = new THREE.ConeGeometry(radius, height, segments, 4)
  const pos = geo.getAttribute('position') as THREE.BufferAttribute
  const v = new THREE.Vector3()
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i)
    const t = (v.y + height / 2) / height
    // 微微内凹的曲线，像童话书里的塔尖
    const k = 1 - 0.16 * Math.sin(t * Math.PI)
    v.x *= k
    v.z *= k
    pos.setXYZ(i, v.x, v.y, v.z)
  }
  pos.needsUpdate = true
  geo.computeVertexNormals()
  return geo
}

/** 双坡屋顶（棱柱）。 */
export function gableRoofGeometry(width: number, depth: number, height: number, overhang = 0.25) {
  const w = width / 2 + overhang
  const d = depth / 2 + overhang
  const shape = new THREE.Shape()
  shape.moveTo(-w, 0)
  shape.lineTo(0, height)
  shape.lineTo(w, 0)
  shape.lineTo(-w, 0)
  const geo = new THREE.ExtrudeGeometry(shape, { depth: d * 2, bevelEnabled: false, curveSegments: 1 })
  geo.translate(0, 0, -d)
  geo.computeVertexNormals()
  return geo
}

/** 旗帜布面：带波浪的平面，用于旗帜与挂毯。 */
export function clothGeometry(width: number, height: number, segX = 10, segY = 6, wave = 0.12) {
  const geo = new THREE.PlaneGeometry(width, height, segX, segY)
  const pos = geo.getAttribute('position') as THREE.BufferAttribute
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i)
    const y = pos.getY(i)
    const t = (x + width / 2) / width
    pos.setZ(i, Math.sin(t * Math.PI * 2.2 + y * 0.6) * wave * t)
  }
  pos.needsUpdate = true
  geo.computeVertexNormals()
  return geo
}

/** 由曲线生成的管状体（根须、藤蔓、烟）。 */
export function tubeAlong(points: THREE.Vector3[], radius = 0.1, segments = 24, radial = 6) {
  const curve = new THREE.CatmullRomCurve3(points)
  return new THREE.TubeGeometry(curve, segments, radius, radial, false)
}

/** 圆形柔光贴图，用于星光、雾、光晕精灵。 */
export function softDotTexture(inner = 'rgba(255,255,255,1)', outer = 'rgba(255,255,255,0)') {
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  g.addColorStop(0, inner)
  g.addColorStop(0.45, inner.replace(/[\d.]+\)$/, '0.45)'))
  g.addColorStop(1, outer)
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  const tex = new THREE.CanvasTexture(canvas)
  tex.needsUpdate = true
  return tex
}

/** 水面波纹贴图（程序化生成，避免外部资源）。 */
export function waterTexture() {
  const size = 128
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, size, size)
  for (let i = 0; i < 90; i++) {
    const y = Math.random() * size
    const x = Math.random() * size
    const w = 8 + Math.random() * 34
    ctx.strokeStyle = `rgba(190,215,225,${0.18 + Math.random() * 0.3})`
    ctx.lineWidth = 1 + Math.random() * 1.6
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.quadraticCurveTo(x + w / 2, y - 3 + Math.random() * 6, x + w, y)
    ctx.stroke()
  }
  const tex = new THREE.CanvasTexture(canvas)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  tex.repeat.set(2, 2)
  tex.needsUpdate = true
  return tex
}

/** 瀑布条纹贴图。 */
export function waterfallTexture() {
  const w = 64
  const h = 256
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')!
  ctx.clearRect(0, 0, w, h)
  for (let i = 0; i < 46; i++) {
    const x = Math.random() * w
    const len = 40 + Math.random() * 150
    const y = Math.random() * h
    const grad = ctx.createLinearGradient(x, y, x, y + len)
    grad.addColorStop(0, 'rgba(255,255,255,0)')
    grad.addColorStop(0.4, `rgba(255,255,255,${0.25 + Math.random() * 0.45})`)
    grad.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.strokeStyle = grad
    ctx.lineWidth = 1 + Math.random() * 3
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x + (Math.random() - 0.5) * 5, y + len)
    ctx.stroke()
  }
  const tex = new THREE.CanvasTexture(canvas)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  tex.repeat.set(1, 1.6)
  tex.needsUpdate = true
  return tex
}

export function disposeObject(root: THREE.Object3D) {
  root.traverse((obj) => {
    const mesh = obj as THREE.Mesh
    if (mesh.geometry) mesh.geometry.dispose()
    const mat = mesh.material as THREE.Material | THREE.Material[] | undefined
    if (Array.isArray(mat)) mat.forEach((m) => m.dispose())
    else if (mat) mat.dispose()
  })
}
