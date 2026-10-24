import * as THREE from 'three'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'

export const PALETTE = {
  grass: '#a8c47f',
  grassDeep: '#86a968',
  meadowLight: '#c4d68f',
  wheat: '#ecc66b',
  sand: '#efd5a0',
  dune: '#e4bf82',
  rock: '#b39b85',
  rockDark: '#8c7465',
  soil: '#9b7a5c',
  snow: '#f7f3ea',
  water: '#8fc9cc',
  waterDeep: '#6aaab5',
  stone: '#e8dfc9',
  stoneShade: '#d2c4a6',
  stoneDark: '#a99b84',
  roofBlue: '#5d7aa6',
  roofRose: '#c98272',
  roofSlate: '#6e7f95',
  wood: '#9a6f4c',
  woodDark: '#6f4d36',
  plank: '#c49a6c',
  gold: '#f2c14e',
  princeGreen: '#6f9b6c',
  crimson: '#b8504a',
  royal: '#5a5f9e',
  cream: '#f6efdc',
  ink: '#4a3a2f',
  windowNight: '#ffd88a',
  windowDay: '#5a6e8a',
  leaf: '#7fae6a',
  leafDeep: '#5f8f5a',
  pine: '#5e8c6a',
  baobab: '#9c8a6a',
  lava: '#ff9a5a',
  white: '#fbf8f1',
  skin: '#f6d9bf',
}

let gradientMap: THREE.DataTexture | null = null

export function getGradientMap() {
  if (gradientMap) return gradientMap
  const tones = new Uint8Array([120, 178, 228, 255])
  const tex = new THREE.DataTexture(tones, tones.length, 1, THREE.RedFormat)
  tex.minFilter = THREE.NearestFilter
  tex.magFilter = THREE.NearestFilter
  tex.generateMipmaps = false
  tex.needsUpdate = true
  gradientMap = tex
  return tex
}

export interface ToonOptions {
  emissive?: THREE.ColorRepresentation
  emissiveIntensity?: number
  transparent?: boolean
  opacity?: number
  side?: THREE.Side
  vertexColors?: boolean
  outline?: boolean
  outlineThickness?: number
}

const materialCache = new Map<string, THREE.MeshToonMaterial>()

const INK: [number, number, number] = [0.27, 0.2, 0.16]

export function toon(color: THREE.ColorRepresentation, opts: ToonOptions = {}) {
  const key = `${new THREE.Color(color).getHexString()}|${JSON.stringify(opts)}`
  const cached = materialCache.get(key)
  if (cached) return cached
  const material = new THREE.MeshToonMaterial({
    color,
    gradientMap: getGradientMap(),
    emissive: opts.emissive ?? '#000000',
    emissiveIntensity: opts.emissiveIntensity ?? 1,
    transparent: opts.transparent ?? false,
    opacity: opts.opacity ?? 1,
    side: opts.side ?? THREE.FrontSide,
    vertexColors: opts.vertexColors ?? false,
  })
  material.userData.outlineParameters =
    opts.outline === false
      ? { visible: false }
      : { thickness: opts.outlineThickness ?? 0.0032, color: INK, alpha: 0.85 }
  materialCache.set(key, material)
  return material
}

export function noOutline<T extends THREE.Material>(material: T): T {
  material.userData.outlineParameters = { visible: false }
  return material
}

export function disposeMaterialCache() {
  materialCache.forEach((m) => m.dispose())
  materialCache.clear()
  gradientMap?.dispose()
  gradientMap = null
}

export function rng(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const _euler = new THREE.Euler()
const _quat = new THREE.Quaternion()
const _pos = new THREE.Vector3()
const _scale = new THREE.Vector3()

export function mat4(
  x = 0,
  y = 0,
  z = 0,
  rx = 0,
  ry = 0,
  rz = 0,
  sx = 1,
  sy = 1,
  sz = 1,
) {
  _euler.set(rx, ry, rz)
  _quat.setFromEuler(_euler)
  _pos.set(x, y, z)
  _scale.set(sx, sy, sz)
  return new THREE.Matrix4().compose(_pos, _quat, _scale)
}

const geometryCache = new Map<string, THREE.BufferGeometry>()

function cachedGeometry(key: string, make: () => THREE.BufferGeometry) {
  let g = geometryCache.get(key)
  if (!g) {
    g = make()
    geometryCache.set(key, g)
  }
  return g
}

export const unitGeo = {
  box: () => cachedGeometry('box', () => new THREE.BoxGeometry(1, 1, 1).translate(0, 0.5, 0)),
  cyl: (topRatio = 1, seg = 12) =>
    cachedGeometry(`cyl${topRatio.toFixed(3)}|${seg}`, () =>
      new THREE.CylinderGeometry(topRatio, 1, 1, seg).translate(0, 0.5, 0),
    ),
  cone: (seg = 12) =>
    cachedGeometry(`cone${seg}`, () => new THREE.ConeGeometry(1, 1, seg).translate(0, 0.5, 0)),
  sphere: (w = 12, h = 10) =>
    cachedGeometry(`sph${w}|${h}`, () => new THREE.SphereGeometry(1, w, h)),
  halfCyl: (seg = 10) =>
    cachedGeometry(`half${seg}`, () =>
      new THREE.CylinderGeometry(1, 1, 1, seg, 1, false, -Math.PI / 2, Math.PI)
        .rotateX(-Math.PI / 2),
    ),
  ico: (detail = 0) =>
    cachedGeometry(`ico${detail}`, () => new THREE.IcosahedronGeometry(1, detail)),
  torus: (tube = 0.15, seg = 16) =>
    cachedGeometry(`tor${tube}|${seg}`, () => new THREE.TorusGeometry(1, tube, 6, seg)),
}

export function disposeGeometryCache() {
  geometryCache.forEach((g) => g.dispose())
  geometryCache.clear()
}

function normalizeGeometry(source: THREE.BufferGeometry, matrix: THREE.Matrix4) {
  const g = source.index ? source.toNonIndexed() : source.clone()
  for (const name of Object.keys(g.attributes)) {
    if (name !== 'position' && name !== 'normal' && name !== 'uv') g.deleteAttribute(name)
  }
  if (!g.attributes.normal) g.computeVertexNormals()
  if (!g.attributes.uv) {
    const count = g.attributes.position.count
    g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(count * 2), 2))
  }
  g.applyMatrix4(matrix)
  return g
}

interface Bucket {
  material: THREE.Material
  layer: string
  geometries: THREE.BufferGeometry[]
}

/**
 * Collects static parts and merges them per material/layer so the whole
 * castle renders in a few dozen draw calls (the outline pass doubles them).
 */
export class Batcher {
  private buckets = new Map<string, Bucket>()

  add(geometry: THREE.BufferGeometry, material: THREE.Material, matrix: THREE.Matrix4, layer = 'core') {
    const key = `${material.uuid}|${layer}`
    let bucket = this.buckets.get(key)
    if (!bucket) {
      bucket = { material, layer, geometries: [] }
      this.buckets.set(key, bucket)
    }
    bucket.geometries.push(normalizeGeometry(geometry, matrix))
  }

  build(name = 'batch') {
    const root = new THREE.Group()
    root.name = name
    const layers = new Map<string, THREE.Group>()
    this.buckets.forEach((bucket) => {
      const merged = mergeGeometries(bucket.geometries, false)
      bucket.geometries.forEach((g) => g.dispose())
      if (!merged) return
      merged.computeBoundingSphere()
      const mesh = new THREE.Mesh(merged, bucket.material)
      mesh.castShadow = true
      mesh.receiveShadow = true
      let layerGroup = layers.get(bucket.layer)
      if (!layerGroup) {
        layerGroup = new THREE.Group()
        layerGroup.name = bucket.layer
        layers.set(bucket.layer, layerGroup)
        root.add(layerGroup)
      }
      layerGroup.add(mesh)
    })
    this.buckets.clear()
    root.userData.layers = layers
    return root
  }
}

/** Placement helper. For box/cyl/cone the y coordinate is the bottom of the part. */
export class Builder {
  constructor(
    public batcher: Batcher,
    public base: THREE.Matrix4 = new THREE.Matrix4(),
    public layer = 'core',
  ) {}

  private put(geo: THREE.BufferGeometry, material: THREE.Material, local: THREE.Matrix4) {
    this.batcher.add(geo, material, this.base.clone().multiply(local), this.layer)
  }

  child(x = 0, y = 0, z = 0, ry = 0, layer?: string) {
    return new Builder(this.batcher, this.base.clone().multiply(mat4(x, y, z, 0, ry, 0)), layer ?? this.layer)
  }

  withLayer(layer: string) {
    return new Builder(this.batcher, this.base, layer)
  }

  box(m: THREE.Material, w: number, h: number, d: number, x: number, y: number, z: number, ry = 0, rx = 0, rz = 0) {
    this.put(unitGeo.box(), m, mat4(x, y, z, rx, ry, rz, w, h, d))
  }

  cyl(m: THREE.Material, rTop: number, rBottom: number, h: number, x: number, y: number, z: number, seg = 12, rx = 0, rz = 0) {
    const ratio = rBottom === 0 ? 1 : rTop / rBottom
    this.put(unitGeo.cyl(ratio, seg), m, mat4(x, y, z, rx, 0, rz, rBottom, h, rBottom))
  }

  cone(m: THREE.Material, r: number, h: number, x: number, y: number, z: number, seg = 12, ry = 0) {
    this.put(unitGeo.cone(seg), m, mat4(x, y, z, 0, ry, 0, r, h, r))
  }

  sphere(m: THREE.Material, r: number, x: number, y: number, z: number, sx = 1, sy = 1, sz = 1) {
    this.put(unitGeo.sphere(), m, mat4(x, y, z, 0, 0, 0, r * sx, r * sy, r * sz))
  }

  rock(m: THREE.Material, r: number, x: number, y: number, z: number, ry = 0, sy = 0.7) {
    this.put(unitGeo.ico(0), m, mat4(x, y, z, 0.3, ry, 0.2, r, r * sy, r))
  }

  /** Arched opening facing +z: rectangular body plus half-round top. */
  arch(m: THREE.Material, w: number, h: number, depth: number, x: number, y: number, z: number, ry = 0) {
    const r = w / 2
    const local = this.child(x, y, z, ry)
    local.box(m, w, h - r, depth, 0, 0, 0)
    local.put(unitGeo.halfCyl(), m, mat4(0, h - r, 0, 0, 0, 0, r, r, depth))
  }

  /** Crenellations along a segment, sitting on top of a wall at height y. */
  merlons(m: THREE.Material, x1: number, z1: number, x2: number, z2: number, y: number, thickness = 0.5, size = 0.55, gap = 0.55) {
    const dx = x2 - x1
    const dz = z2 - z1
    const len = Math.hypot(dx, dz)
    const angle = Math.atan2(dx, dz)
    const count = Math.max(1, Math.floor(len / (size + gap)))
    const step = len / count
    for (let i = 0; i < count; i++) {
      const t = (i + 0.5) * step
      this.box(m, thickness, size * 0.9, size, x1 + (dx * t) / len, y, z1 + (dz * t) / len, angle)
    }
  }

  ringMerlons(m: THREE.Material, r: number, y: number, count: number, cx = 0, cz = 0, size = 0.42) {
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2
      this.box(m, size, size * 0.95, 0.32, cx + Math.sin(a) * r, y, cz + Math.cos(a) * r, a)
    }
  }
}
