import * as THREE from 'three'
import { clamp, lerp, smoothstep, noise2, fbm, ridged } from './noise'
import {
  CASTLE,
  MOUNTAIN,
  LAKE,
  MILL,
  MOAT_Y,
  TIP_Y,
  WORLD,
  RIVER_IN_PTS,
  RIVER_OUT_PTS,
  edgeR,
  samplePolyline,
  type XZ,
} from './layout'

function sdBox(px: number, pz: number, cx: number, cz: number, hx: number, hz: number) {
  const dx = Math.abs(px - cx) - hx
  const dz = Math.abs(pz - cz) - hz
  return Math.hypot(Math.max(dx, 0), Math.max(dz, 0)) + Math.min(Math.max(dx, dz), 0)
}

export const castleSd = (x: number, z: number) => sdBox(x, z, CASTLE.x, CASTLE.z, CASTLE.hx, CASTLE.hz)
export const lakeD = (x: number, z: number) => Math.hypot((x - LAKE.x) / LAKE.rx, (z - LAKE.z) / LAKE.rz)

/** 没有河流/湖泊/护城河的基础地形 */
export function baseHeight(x: number, z: number): number {
  const r = Math.hypot(x, z)
  const R = edgeR(Math.atan2(z, x))
  let hills = (fbm(x * 0.055 + 13, z * 0.055 + 5, 3) - 0.44) * 3.4
  hills = Math.max(hills, -0.12)
  let h = hills + 0.8 * (1 - smoothstep(0, R, r))

  const dm = Math.hypot(x - MILL.x, z - MILL.z)
  h += 3.0 * (1 - smoothstep(0, 7.5, dm))

  const pl = 1 - smoothstep(4.2, 15, castleSd(x, z))
  h = lerp(h, CASTLE.y, pl)

  const dM = Math.hypot(x - MOUNTAIN.x, z - MOUNTAIN.z)
  const t = clamp(1 - dM / MOUNTAIN.r, 0, 1)
  if (t > 0) {
    const ridge = ridged(x * 0.16 + 40, z * 0.16 + 9, 3)
    h += Math.pow(t, 1.2) * (MOUNTAIN.h * 0.72 + MOUNTAIN.h * 0.55 * ridge * t)
  }

  h -= 1.2 * smoothstep(R - 5, R, r)
  return h
}

function withLakeAndMoat(x: number, z: number, h: number): number {
  const sd = castleSd(x, z)
  const moat = smoothstep(0.6, 1.4, sd) * (1 - smoothstep(2.7, 3.5, sd))
  h -= 1.2 * moat
  const lm = 1 - smoothstep(0.5, 1.1, lakeD(x, z))
  h -= 2.4 * Math.pow(lm, 1.1)
  return h
}

export interface RiverSample {
  x: number
  z: number
  y: number
  hw: number
}

function buildRiver(pts: XZ[], startY: number | null, hw0: number, hw1: number, easeToLake: boolean): RiverSample[] {
  const sm = samplePolyline(pts, 64)
  const out: RiverSample[] = []
  let prev = startY ?? Infinity
  sm.forEach(([x, z], i) => {
    const t = i / (sm.length - 1)
    let y = Math.min(prev, baseHeight(x, z) - 0.32)
    if (easeToLake) y = Math.min(y, lerp(y, LAKE.y, smoothstep(0.7, 1, t)))
    prev = y
    out.push({ x, z, y, hw: lerp(hw0, hw1, t) })
  })
  return out
}

export const RIVER_IN = buildRiver(RIVER_IN_PTS, null, 0.7, 0.95, true)
export const RIVER_OUT = buildRiver(RIVER_OUT_PTS, LAKE.y, 1.3, 1.7, false)
const ALL_RIVER = [...RIVER_IN, ...RIVER_OUT]

function carveRivers(x: number, z: number, h: number): number {
  let best = Infinity
  let bi = -1
  for (let i = 0; i < ALL_RIVER.length; i++) {
    const s = ALL_RIVER[i]
    const dx = s.x - x
    const dz = s.z - z
    const d = dx * dx + dz * dz
    if (d < best) {
      best = d
      bi = i
    }
  }
  const s = ALL_RIVER[bi]
  const d = Math.sqrt(best)
  const w = 1 - smoothstep(s.hw * 0.9, s.hw * 2.8, d)
  if (w <= 0) return h
  const bed = s.y - 0.4
  return h + (Math.min(h, bed) - h) * w
}

export function heightAt(x: number, z: number): number {
  return carveRivers(x, z, withLakeAndMoat(x, z, baseHeight(x, z)))
}

const eps = 0.3
export function normalAt(x: number, z: number, out = new THREE.Vector3()): THREE.Vector3 {
  const hx = heightAt(x + eps, z) - heightAt(x - eps, z)
  const hz = heightAt(x, z + eps) - heightAt(x, z - eps)
  return out.set(-hx / (2 * eps), 1, -hz / (2 * eps)).normalize()
}

/** 点是否在岛内（留出 margin） */
export function insideIsland(x: number, z: number, margin = 0) {
  return Math.hypot(x, z) < edgeR(Math.atan2(z, x)) - margin
}

const STRATA = ['#d8b786', '#c9a078', '#b6937f', '#9d8d9b', '#8691b2'].map((c) => new THREE.Color(c))
const MOSS = new THREE.Color('#9dba72')
const LIP = new THREE.Color('#e3c79a')

function strata(t: number, out: THREE.Color) {
  const f = clamp(t, 0, 0.9999) * (STRATA.length - 1)
  const i = Math.floor(f)
  return out.copy(STRATA[i]).lerp(STRATA[i + 1], f - i)
}

/** 岛底表面上的点：th 为方位角，u∈(0,1] 从岛沿到底部尖端，ry 为岛沿高度 */
function undersidePos(th: number, u: number, ry: number) {
  const c = Math.cos(th)
  const sn = Math.sin(th)
  const R = edgeR(th)
  const sinU = Math.sin(Math.PI * u)
  const n1 = noise2(c * 2.1 + u * 3.3 + 10, sn * 2.1 + u * 2.7 + 5)
  const n2 = noise2(c * 3.3 - u * 4.0 + 31, sn * 3.3 + u * 3.1 + 17)
  const n3 = noise2(c * 5.2 + 7, sn * 5.2 - u * 9 + 3)
  const rad = R * (1 - Math.pow(u, 1.55)) * (1 + 0.14 * sinU * (n1 - 0.5) * 2)
  const spike = Math.min(7, Math.pow(Math.max(0, n2 - 0.42), 2) * 38) * sinU
  const y = lerp(ry, TIP_Y, Math.pow(u, 0.72)) - spike * (0.4 + 0.6 * u) + (n3 - 0.5) * 1.6 * sinU
  return { x: c * rad, y, z: sn * rad, n1, n3 }
}

/** 供装饰物使用：岛底表面一点及其向外的法线方向（水平分量） */
export function undersideAt(th: number, u: number) {
  const R = edgeR(th)
  const ry = heightAt(Math.cos(th) * R, Math.sin(th) * R)
  const p = undersidePos(th, u, ry)
  return { x: p.x, y: p.y, z: p.z, nx: Math.cos(th), nz: Math.sin(th) }
}

export function buildIsland(material: THREE.Material) {
  const SEG = 240
  const NT = 180
  const NB = 72
  const rows = NT + 1 + NB
  const count = rows * SEG
  const pos = new Float32Array(count * 3)
  const col = new Float32Array(count * 3)
  const uv = new Float32Array(count * 2)
  const rimY = new Float32Array(SEG)
  const tmp = new THREE.Color()
  const tmp2 = new THREE.Color()
  let vi = 0

  for (let i = 0; i <= NT; i++) {
    const s = i / NT
    for (let j = 0; j < SEG; j++) {
      const th = (j / SEG) * Math.PI * 2
      const R = edgeR(th)
      const r = s * R
      const x = Math.cos(th) * r
      const z = Math.sin(th) * r
      const y = heightAt(x, z)
      if (i === NT) rimY[j] = y
      pos.set([x, y, z], vi * 3)
      uv[vi * 2] = (x + WORLD / 2) / WORLD
      uv[vi * 2 + 1] = 1 - (z + WORLD / 2) / WORLD
      const e = smoothstep(R - 4.8, R - 0.2, r)
      col[vi * 3] = lerp(1, 0.9, e)
      col[vi * 3 + 1] = lerp(1, 0.72, e)
      col[vi * 3 + 2] = lerp(1, 0.52, e)
      vi++
    }
  }

  for (let k = 1; k <= NB; k++) {
    const u = k / NB
    for (let j = 0; j < SEG; j++) {
      const th = (j / SEG) * Math.PI * 2
      const c = Math.cos(th)
      const sn = Math.sin(th)
      const ry = rimY[j]
      const p = undersidePos(th, u, ry)
      const { n1, n3, y } = p
      pos.set([p.x, p.y, p.z], vi * 3)
      uv[vi * 2] = 0.988
      uv[vi * 2 + 1] = 0.012

      const depthT = clamp((ry - y) / (ry - TIP_Y), 0, 1)
      strata(depthT, tmp)
      const band = 0.5 + 0.5 * Math.sin(y * 1.5 + n3 * 5 + n1 * 3)
      tmp.lerp(tmp2.set('#f1dcb4'), band * 0.22 * (1 - depthT * 0.5))
      tmp.multiplyScalar(0.92 + n1 * 0.16)
      if (u < 0.12) {
        const w = (1 - u / 0.12) * (0.45 + 0.55 * noise2(c * 9 + 3, sn * 9 + 1))
        tmp.lerp(MOSS, clamp(w, 0, 1) * 0.85)
      }
      if (u < 0.03) tmp.lerp(LIP, 0.25)
      col[vi * 3] = tmp.r
      col[vi * 3 + 1] = tmp.g
      col[vi * 3 + 2] = tmp.b
      vi++
    }
  }

  const index: number[] = []
  for (let i = 0; i < rows - 1; i++) {
    for (let j = 0; j < SEG; j++) {
      const a = i * SEG + j
      const b = i * SEG + ((j + 1) % SEG)
      const c = (i + 1) * SEG + j
      const d = (i + 1) * SEG + ((j + 1) % SEG)
      index.push(a, b, c, b, d, c)
    }
  }

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3))
  geo.setAttribute('uv', new THREE.BufferAttribute(uv, 2))
  geo.setIndex(index)
  geo.computeVertexNormals()

  const nrm = geo.getAttribute('normal') as THREE.BufferAttribute
  const n = new THREE.Vector3()
  for (let i = 0; i < NT; i++) {
    for (let j = 0; j < SEG; j++) {
      const idx = i * SEG + j
      normalAt(pos[idx * 3], pos[idx * 3 + 2], n)
      nrm.setXYZ(idx, n.x, n.y, n.z)
    }
  }
  geo.computeBoundingSphere()

  const mesh = new THREE.Mesh(geo, material)
  mesh.castShadow = true
  mesh.receiveShadow = true
  return mesh
}

function addEdge(geo: THREE.BufferGeometry, value: number | number[]) {
  const n = geo.getAttribute('position').count
  const a = new Float32Array(n)
  for (let i = 0; i < n; i++) a[i] = Array.isArray(value) ? value[i] : value
  geo.setAttribute('edge', new THREE.BufferAttribute(a, 1))
}

function ribbon(samples: RiverSample[], widthScale: number, lift: number): THREE.BufferGeometry {
  const n = samples.length
  const pos = new Float32Array(n * 3 * 3)
  const uv = new Float32Array(n * 3 * 2)
  const edge: number[] = []
  for (let i = 0; i < n; i++) {
    const a = samples[Math.max(0, i - 1)]
    const b = samples[Math.min(n - 1, i + 1)]
    let tx = b.x - a.x
    let tz = b.z - a.z
    const l = Math.hypot(tx, tz) || 1
    tx /= l
    tz /= l
    const s = samples[i]
    const w = s.hw * widthScale
    const nx = -tz
    const nz = tx
    const y = s.y + lift
    pos.set([s.x - nx * w, y, s.z - nz * w, s.x, y, s.z, s.x + nx * w, y, s.z + nz * w], i * 9)
    for (let k = 0; k < 3; k++) {
      uv[(i * 3 + k) * 2] = k / 2
      uv[(i * 3 + k) * 2 + 1] = i / (n - 1)
    }
    edge.push(0, 1, 0)
  }
  const index: number[] = []
  for (let i = 0; i < n - 1; i++) {
    for (let k = 0; k < 2; k++) {
      const a = i * 3 + k
      const b = i * 3 + k + 1
      const c = (i + 1) * 3 + k
      const d = (i + 1) * 3 + k + 1
      index.push(a, c, b, b, c, d)
    }
  }
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  g.setAttribute('uv', new THREE.BufferAttribute(uv, 2))
  addEdge(g, edge)
  g.setIndex(index)
  return g
}

export interface WaterBuild {
  group: THREE.Group
  waterfall: { x: number; y: number; z: number; dx: number; dz: number; hw: number }
}

export function buildWater(waterMat: THREE.Material, fallMat: THREE.Material): WaterBuild {
  const group = new THREE.Group()

  const lakeGeo = new THREE.CircleGeometry(1, 72)
  addEdge(lakeGeo, 1)
  const lake = new THREE.Mesh(lakeGeo, waterMat)
  lake.rotation.x = -Math.PI / 2
  lake.scale.set(LAKE.rx * 1.4, LAKE.rz * 1.4, 1)
  lake.position.set(LAKE.x, LAKE.y, LAKE.z)
  group.add(lake)

  const moatGeo = new THREE.PlaneGeometry((CASTLE.hx + 4.2) * 2, (CASTLE.hz + 4.2) * 2)
  addEdge(moatGeo, 1)
  const moat = new THREE.Mesh(moatGeo, waterMat)
  moat.rotation.x = -Math.PI / 2
  moat.position.set(CASTLE.x, MOAT_Y, CASTLE.z)
  group.add(moat)

  group.add(new THREE.Mesh(ribbon(RIVER_IN, 1.7, 0.02), waterMat))

  let cut = RIVER_OUT.length
  for (let i = 0; i < RIVER_OUT.length; i++) {
    const s = RIVER_OUT[i]
    if (Math.hypot(s.x, s.z) > edgeR(Math.atan2(s.z, s.x)) - 0.4) {
      cut = Math.max(2, i)
      break
    }
  }
  const outSamples = RIVER_OUT.slice(0, cut)
  group.add(new THREE.Mesh(ribbon(outSamples, 1.7, 0.02), waterMat))

  const last = outSamples[outSamples.length - 1]
  const prevS = outSamples[outSamples.length - 2]
  let dx = last.x - prevS.x
  let dz = last.z - prevS.z
  const dl = Math.hypot(dx, dz) || 1
  dx /= dl
  dz /= dl
  const hw = last.hw * 1.7
  const fall = { x: last.x + dx * 0.2, y: last.y + 0.02, z: last.z + dz * 0.2, dx, dz, hw }

  const H = 30
  const makeSheet = (w: number, ry: number) => {
    const g = new THREE.PlaneGeometry(w, H, 1, 16)
    g.translate(0, -H / 2, 0)
    addEdge(g, 1)
    const m = new THREE.Mesh(g, fallMat)
    m.position.set(fall.x, fall.y, fall.z)
    m.rotation.y = ry
    return m
  }
  const ry = Math.atan2(dx, dz)
  group.add(makeSheet(hw * 2, ry), makeSheet(hw * 1.2, ry + Math.PI / 2))

  return { group, waterfall: fall }
}

/** 从岛底垂下的根须 */
export function buildRoots(): THREE.Group {
  const g = new THREE.Group()
  const mat = new THREE.MeshToonMaterial({ color: '#a98462' })
  const n = 46
  for (let i = 0; i < n; i++) {
    const th = (i / n) * Math.PI * 2 + noise2(i * 3.1, 2) * 0.5
    const u = 0.04 + noise2(i * 1.7, 9) * 0.34
    const p = undersideAt(th, u)
    const x = p.x - p.nx * 0.12
    const y = p.y + 0.1
    const z = p.z - p.nz * 0.12
    const len = 3 + noise2(i * 5.3, 1) * 7
    const pts = [0, 0.33, 0.66, 1].map(
      (t) =>
        new THREE.Vector3(
          x + Math.sin(t * 3 + i) * 0.5 * t + p.nx * 0.6 * t,
          y - len * t,
          z + Math.cos(t * 2.4 + i) * 0.5 * t + p.nz * 0.6 * t,
        ),
    )
    const curve = new THREE.CatmullRomCurve3(pts)
    const tube = new THREE.TubeGeometry(curve, 8, 0.09 + noise2(i, 4) * 0.08, 5, false)
    const m = new THREE.Mesh(tube, mat)
    g.add(m)
  }
  return g
}
