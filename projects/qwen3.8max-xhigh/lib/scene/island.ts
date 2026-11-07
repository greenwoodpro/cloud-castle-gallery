import * as THREE from 'three'
import { C } from './palette'
import {
  Batcher,
  clamp,
  fbm,
  lerp,
  mulberry32,
  noise3,
  smoothstep,
  softDotTexture,
  toonMaterial,
  tubeAlong,
  waterfallTexture,
} from './utils'

export const ISLAND_RADIUS = 30

/** 岛屿轮廓的半径随角度起伏，避免正圆带来的呆板。 */
export function islandOutlineRadius(angle: number): number {
  return (
    ISLAND_RADIUS *
    (1 +
      0.085 * Math.sin(3 * angle + 1.2) +
      0.055 * Math.sin(5 * angle + 0.4) +
      0.032 * Math.sin(8 * angle + 2.1))
  )
}

/** 从岛心到边缘的地表基准剖面（r 为半径比例，y 为高度）。 */
const SURFACE_PROFILE: Array<[number, number]> = [
  [0.0, 1.5],
  [0.16, 1.15],
  [0.3, 1.6],
  [0.44, 1.0],
  [0.58, 1.35],
  [0.72, 0.85],
  [0.86, 1.05],
  [0.95, 0.6],
  [1.0, 0.2],
]

/** 岛屿下方的岩石剖面。 */
const ROCK_PROFILE: Array<[number, number]> = [
  [1.0, 0.2],
  [0.985, -1.5],
  [0.94, -3.3],
  [0.87, -6.0],
  [0.77, -9.3],
  [0.66, -12.6],
  [0.53, -16.1],
  [0.4, -19.6],
  [0.28, -23.0],
  [0.17, -26.2],
  [0.09, -29.0],
  [0.035, -31.4],
  [0.0, -32.8],
]

function sampleProfile(profile: Array<[number, number]>, rFrac: number): number {
  if (rFrac <= profile[0][0]) return profile[0][1]
  for (let i = 0; i < profile.length - 1; i++) {
    const [r0, y0] = profile[i]
    const [r1, y1] = profile[i + 1]
    if (rFrac <= r1) {
      const t = (rFrac - r0) / (r1 - r0 || 1e-6)
      return lerp(y0, y1, t * t * (3 - 2 * t))
    }
  }
  return profile[profile.length - 1][1]
}

/* ---------------- 地表雕刻：池塘与溪流 ---------------- */

export const POND_CENTER = new THREE.Vector2(-17.5, 11.5)
export const POND_RADIUS = 5.2

const WATERFALL_ANGLE = 1.04
const waterfallRimR = islandOutlineRadius(WATERFALL_ANGLE) * 0.995
export const WATERFALL_TOP = new THREE.Vector3(
  Math.cos(WATERFALL_ANGLE) * waterfallRimR,
  0,
  Math.sin(WATERFALL_ANGLE) * waterfallRimR,
)

/** 溪流中心线，从池塘一路蜿蜒到瀑布口。 */
export const STREAM_POINTS: THREE.Vector2[] = [
  POND_CENTER.clone(),
  new THREE.Vector2(-13.5, 14.8),
  new THREE.Vector2(-8.5, 17.2),
  new THREE.Vector2(-3.5, 19.0),
  new THREE.Vector2(1.5, 20.4),
  new THREE.Vector2(7.0, 21.4),
  new THREE.Vector2(
    Math.cos(WATERFALL_ANGLE) * waterfallRimR * 0.9,
    Math.sin(WATERFALL_ANGLE) * waterfallRimR * 0.9,
  ),
]

/** 石桥的位置：溪流与城门大道的交汇处。 */
export const BRIDGE_CENTER = new THREE.Vector2(1.5, 20.4)

function distanceToPolyline(x: number, z: number, pts: THREE.Vector2[]): number {
  let best = Infinity
  for (let i = 0; i < pts.length - 1; i++) {
    const ax = pts[i].x
    const az = pts[i].y
    const bx = pts[i + 1].x
    const bz = pts[i + 1].y
    const dx = bx - ax
    const dz = bz - az
    const len2 = dx * dx + dz * dz || 1e-6
    let t = ((x - ax) * dx + (z - az) * dz) / len2
    t = clamp(t, 0, 1)
    const px = ax + dx * t
    const pz = az + dz * t
    best = Math.min(best, Math.hypot(x - px, z - pz))
  }
  return best
}

/** 池塘与溪流把地表向下挖出的深度。 */
function carveDepth(x: number, z: number): number {
  const pondD = Math.hypot(x - POND_CENTER.x, z - POND_CENTER.y)
  const pond = 1.75 * (1 - smoothstep(POND_RADIUS * 0.42, POND_RADIUS, pondD))
  const streamD = distanceToPolyline(x, z, STREAM_POINTS)
  const stream = 1.05 * (1 - smoothstep(0.7, 2.5, streamD))
  return Math.max(pond, stream)
}

/** 丘陵振幅：城堡台地（r < 16）保持平整，中圈起伏，边缘归零。 */
function hillAmplitude(rFrac: number): number {
  return smoothstep(0.56, 0.74, rFrac) * (1 - smoothstep(0.86, 0.99, rFrac)) * 3.1
}

/** 城堡台地的平整高度，城墙以内几乎水平，建筑才能稳稳落地。 */
export const PLATEAU_Y = 1.15

/**
 * 全岛统一的地表高度函数。
 * 岛屿网格、树木、人物、建筑都从这里取高度，保证一切都贴合地面。
 */
export function islandSurfaceHeight(x: number, z: number): number | null {
  const r = Math.hypot(x, z)
  const angle = Math.atan2(z, x)
  const rMax = islandOutlineRadius(angle)
  const rFrac = r / rMax
  if (rFrac > 1.0) return null

  const base = sampleProfile(SURFACE_PROFILE, rFrac)
  const hills = (fbm(x * 0.082, 0.31, z * 0.082, 3, 11) - 0.5) * 2 * hillAmplitude(rFrac)
  const detail = (fbm(x * 0.31, 0.77, z * 0.31, 2, 29) - 0.5) * 0.55 * (1 - smoothstep(0.88, 1, rFrac))
  const rimDrop = -0.5 * smoothstep(0.93, 1.0, rFrac)
  const natural = base + hills + detail + rimDrop - carveDepth(x, z)

  // 城堡台地：中心区压平，向外自然过渡
  const plateauBlend = 1 - smoothstep(0.5, 0.63, rFrac)
  if (plateauBlend <= 0) return natural
  const flat = PLATEAU_Y + (fbm(x * 0.4, 2.1, z * 0.4, 2, 71) - 0.5) * 0.14
  return lerp(natural, flat, plateauBlend)
}

/** 便于摆放物体的安全取高：岛外返回 0。 */
export function groundAt(x: number, z: number): number {
  return islandSurfaceHeight(x, z) ?? 0
}

/* ---------------- 顶点着色 ---------------- */

const _cA = new THREE.Color()
const _cB = new THREE.Color()
const _cC = new THREE.Color()

function paintGrass(
  colors: Float32Array,
  index: number,
  x: number,
  y: number,
  z: number,
  rFrac: number,
) {
  const n = fbm(x * 0.22, 0.4, z * 0.22, 3, 51)
  const patch = fbm(x * 0.07, 1.3, z * 0.07, 2, 63)
  _cA.setHex(C.grass)
  _cB.setHex(patch > 0.52 ? C.grassLight : C.grassDeep)
  _cA.lerp(_cB, Math.abs(n - 0.5) * 1.5)
  // 靠近边缘混入泥土色
  _cC.setHex(C.dirt)
  _cA.lerp(_cC, smoothstep(0.86, 1.0, rFrac) * 0.75)
  // 低洼处（溪流与池塘边）颜色更深更湿
  _cB.setHex(C.grassDeep)
  _cA.lerp(_cB, smoothstep(0.4, -0.6, y - sampleProfile(SURFACE_PROFILE, rFrac)) * 0.6)
  const k = 0.94 + n * 0.13
  colors[index * 3] = _cA.r * k
  colors[index * 3 + 1] = _cA.g * k
  colors[index * 3 + 2] = _cA.b * k
}

function paintRock(colors: Float32Array, index: number, x: number, y: number, z: number, t: number) {
  const n = fbm(x * 0.16, y * 0.16, z * 0.16, 3, 91)
  const depthT = smoothstep(0, -30, y)
  _cA.setHex(C.rockLight)
  _cB.setHex(C.rockDeep)
  _cA.lerp(_cB, depthT * 0.85 + (n - 0.5) * 0.35)
  // 地层条带
  const strata = Math.sin(y * 0.72 + n * 5.2 + x * 0.06)
  if (strata > 0.42) {
    _cB.setHex(C.rockDark)
    _cA.lerp(_cB, smoothstep(0.42, 0.95, strata) * 0.62)
  }
  // 顶部一层土壤
  _cB.setHex(C.dirt)
  _cA.lerp(_cB, (1 - smoothstep(-3.4, -0.4, y)) * 0.8)
  // 尖端偏冷偏暗
  _cB.setHex(C.rockDark)
  _cA.lerp(_cB, smoothstep(0.72, 1, t) * 0.5)
  const k = 0.9 + n * 0.2
  colors[index * 3] = _cA.r * k
  colors[index * 3 + 1] = _cA.g * k
  colors[index * 3 + 2] = _cA.b * k
}

/* ---------------- 网格生成 ---------------- */

const ANGULAR_SEGMENTS = 132

function buildSurfaceGeometry(): THREE.BufferGeometry {
  const rings = SURFACE_PROFILE.length
  const vCount = rings * (ANGULAR_SEGMENTS + 1)
  const positions = new Float32Array(vCount * 3)
  const colors = new Float32Array(vCount * 3)
  const uvs = new Float32Array(vCount * 2)
  const indices: number[] = []

  for (let j = 0; j <= ANGULAR_SEGMENTS; j++) {
    const angle = (j / ANGULAR_SEGMENTS) * Math.PI * 2
    const rMax = islandOutlineRadius(angle)
    const ca = Math.cos(angle)
    const sa = Math.sin(angle)
    for (let i = 0; i < rings; i++) {
      const rFrac = SURFACE_PROFILE[i][0]
      const r = rFrac * rMax
      const x = ca * r
      const z = sa * r
      const y = islandSurfaceHeight(x, z) ?? SURFACE_PROFILE[i][1]
      const idx = i * (ANGULAR_SEGMENTS + 1) + j
      positions[idx * 3] = x
      positions[idx * 3 + 1] = y
      positions[idx * 3 + 2] = z
      uvs[idx * 2] = rFrac
      uvs[idx * 2 + 1] = j / ANGULAR_SEGMENTS
      paintGrass(colors, idx, x, y, z, rFrac)
    }
  }

  for (let i = 0; i < rings - 1; i++) {
    for (let j = 0; j < ANGULAR_SEGMENTS; j++) {
      const a = i * (ANGULAR_SEGMENTS + 1) + j
      const b = a + 1
      const c = a + (ANGULAR_SEGMENTS + 1)
      const d = c + 1
      // 修复：原绕序让顶面法线全部朝下，单面材质下从上往下渲染会被背面剔除，
      // 整块地面消失、只剩岩层内壁。翻转绕序使法线朝上。
      indices.push(a, b, c, b, d, c)
    }
  }

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  geo.setAttribute('uv', new THREE.BufferAttribute(uvs, 2))
  geo.setIndex(indices)
  geo.computeVertexNormals()
  return geo
}

function buildRockGeometry(): THREE.BufferGeometry {
  const rings = ROCK_PROFILE.length
  const vCount = rings * (ANGULAR_SEGMENTS + 1)
  const positions = new Float32Array(vCount * 3)
  const colors = new Float32Array(vCount * 3)
  const uvs = new Float32Array(vCount * 2)
  const indices: number[] = []

  for (let j = 0; j <= ANGULAR_SEGMENTS; j++) {
    const angle = (j / ANGULAR_SEGMENTS) * Math.PI * 2
    const rMax = islandOutlineRadius(angle)
    const ca = Math.cos(angle)
    const sa = Math.sin(angle)
    for (let i = 0; i < rings; i++) {
      const [rFrac, baseY] = ROCK_PROFILE[i]
      const t = i / (rings - 1)
      // 顶圈必须与草皮边缘完全重合，因此噪声从第二圈才开始生效
      const noiseGate = smoothstep(0, 0.22, t)
      const nx = (noise3(ca * 2.1 + j * 0.001, baseY * 0.13, sa * 2.1, 131) - 0.5) * 5.4 * noiseGate
      const ny = (noise3(ca * 1.7, baseY * 0.19 + 4, sa * 1.7, 149) - 0.5) * 3.2 * noiseGate
      // 大块的棱角：让岩体像被撕下来的碎块
      const lobe = 1 + 0.11 * Math.sin(4 * angle + baseY * 0.22) * noiseGate
      const r = Math.max(0, rFrac * rMax * lobe + nx * rFrac)
      const x = ca * r
      const z = sa * r
      const y = baseY + ny
      const idx = i * (ANGULAR_SEGMENTS + 1) + j
      positions[idx * 3] = x
      positions[idx * 3 + 1] = y
      positions[idx * 3 + 2] = z
      uvs[idx * 2] = rFrac
      uvs[idx * 2 + 1] = t
      paintRock(colors, idx, x, y, z, t)
    }
  }

  for (let i = 0; i < rings - 1; i++) {
    for (let j = 0; j < ANGULAR_SEGMENTS; j++) {
      const a = i * (ANGULAR_SEGMENTS + 1) + j
      const b = a + 1
      const c = a + (ANGULAR_SEGMENTS + 1)
      const d = c + 1
      // 法线朝外（从上方俯视时是顺时针）
      indices.push(a, b, c, b, d, c)
    }
  }

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  geo.setAttribute('uv', new THREE.BufferAttribute(uvs, 2))
  geo.setIndex(indices)
  geo.computeVertexNormals()
  return geo
}

/* ---------------- 附属元素 ---------------- */

function buildHangingRoots(random: () => number): THREE.Mesh | null {
  const batch = new Batcher()
  const count = 16
  for (let i = 0; i < count; i++) {
    const angle = random() * Math.PI * 2
    const rMax = islandOutlineRadius(angle)
    const rFrac = 0.55 + random() * 0.42
    const startX = Math.cos(angle) * rMax * rFrac
    const startZ = Math.sin(angle) * rMax * rFrac
    const startY = -1.5 - random() * 6
    const length = 4 + random() * 11
    const pts: THREE.Vector3[] = []
    const sway = (random() - 0.5) * 3.4
    for (let k = 0; k <= 4; k++) {
      const t = k / 4
      pts.push(
        new THREE.Vector3(
          startX + sway * t * t + Math.sin(t * 3 + i) * 0.4,
          startY - length * t,
          startZ + sway * t * t * 0.6 + Math.cos(t * 2.4 + i) * 0.4,
        ),
      )
    }
    batch.add(tubeAlong(pts, 0.16 + random() * 0.16, 16, 5), random() > 0.5 ? C.trunk : C.woodDark)
  }
  // 垂下的藤蔓叶簇
  for (let i = 0; i < 26; i++) {
    const angle = random() * Math.PI * 2
    const rMax = islandOutlineRadius(angle)
    const rFrac = 0.86 + random() * 0.13
    const x = Math.cos(angle) * rMax * rFrac
    const z = Math.sin(angle) * rMax * rFrac
    const y = -0.6 - random() * 3.4
    batch.add(
      new THREE.IcosahedronGeometry(0.32 + random() * 0.42, 0),
      random() > 0.45 ? C.leafDeep : C.leaf,
      { position: [x, y, z], scale: [1, 0.7, 1] },
    )
  }
  return batch.build(toonMaterial({ flatShading: true }), { mottle: 0.09, seed: 17 })
}

function buildOverhangTufts(random: () => number): THREE.Mesh | null {
  const batch = new Batcher()
  for (let i = 0; i < 90; i++) {
    const angle = random() * Math.PI * 2
    const rMax = islandOutlineRadius(angle)
    const rFrac = 0.955 + random() * 0.04
    const x = Math.cos(angle) * rMax * rFrac
    const z = Math.sin(angle) * rMax * rFrac
    const y = (islandSurfaceHeight(x, z) ?? 0.2) - 0.25 - random() * 0.5
    batch.add(new THREE.ConeGeometry(0.2 + random() * 0.2, 0.7 + random() * 0.9, 4), C.grassDeep, {
      position: [x, y, z],
      rotation: [Math.PI + (random() - 0.5) * 0.5, random() * 3, (random() - 0.5) * 0.5],
    })
  }
  return batch.build(toonMaterial({ flatShading: true }), { mottle: 0.1, seed: 33 })
}

export type IslandHandle = {
  group: THREE.Group
  update: (time: number, delta: number) => void
  setNight: (amount: number) => void
}

export function createIsland(): IslandHandle {
  const random = mulberry32(20261028)
  const group = new THREE.Group()
  group.name = 'floating-island'

  const surfaceMat = toonMaterial({})
  const rockMat = toonMaterial({ flatShading: true })

  const surface = new THREE.Mesh(buildSurfaceGeometry(), surfaceMat)
  surface.receiveShadow = true
  surface.castShadow = false
  surface.name = 'island-surface'
  group.add(surface)

  const rock = new THREE.Mesh(buildRockGeometry(), rockMat)
  rock.castShadow = true
  rock.receiveShadow = true
  rock.name = 'island-rock'
  group.add(rock)

  const roots = buildHangingRoots(random)
  if (roots) {
    roots.castShadow = true
    group.add(roots)
  }
  const tufts = buildOverhangTufts(random)
  if (tufts) group.add(tufts)

  /* 瀑布 */
  const fallHeight = 26
  const fallWidth = 3.4
  const fallTex = waterfallTexture()
  const fallMat = new THREE.MeshBasicMaterial({
    map: fallTex,
    transparent: true,
    opacity: 0.72,
    depthWrite: false,
    side: THREE.DoubleSide,
    color: new THREE.Color(C.foam),
    blending: THREE.NormalBlending,
  })
  const fallGeo = new THREE.PlaneGeometry(fallWidth, fallHeight, 1, 12)
  const waterfall = new THREE.Mesh(fallGeo, fallMat)
  const fallTopY = islandSurfaceHeight(WATERFALL_TOP.x, WATERFALL_TOP.z) ?? 0
  waterfall.position.set(WATERFALL_TOP.x, fallTopY - fallHeight / 2 - 0.4, WATERFALL_TOP.z)
  waterfall.lookAt(0, waterfall.position.y, 0)
  waterfall.rotateY(Math.PI)
  waterfall.translateZ(0.6)
  group.add(waterfall)

  // 瀑布内侧的第二层，增加厚度感
  const fall2 = new THREE.Mesh(fallGeo.clone(), fallMat.clone())
  fall2.position.copy(waterfall.position)
  fall2.rotation.copy(waterfall.rotation)
  fall2.translateZ(-0.9)
  fall2.scale.set(0.72, 1, 1)
  group.add(fall2)

  /* 瀑布口的水潭与源头 */
  const poolBatch = new Batcher()
  const poolY = fallTopY - 0.55
  poolBatch.add(
    new THREE.CylinderGeometry(2.5, 2.2, 0.35, 20),
    C.water,
    { position: [WATERFALL_TOP.x * 0.955, poolY, WATERFALL_TOP.z * 0.955] },
  )
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2
    poolBatch.add(
      new THREE.DodecahedronGeometry(0.3 + random() * 0.3, 0),
      C.rockLight,
      {
        position: [
          WATERFALL_TOP.x * 0.955 + Math.cos(a) * 2.5,
          poolY + 0.1,
          WATERFALL_TOP.z * 0.955 + Math.sin(a) * 2.5,
        ],
        rotation: [random(), random(), random()],
      },
    )
  }
  const pool = poolBatch.build(toonMaterial({ flatShading: true }), { mottle: 0.08 })
  if (pool) group.add(pool)

  /* 水雾 */
  const mistTex = softDotTexture('rgba(232,242,244,0.85)', 'rgba(232,242,244,0)')
  const mistCount = 46
  const mistGeo = new THREE.BufferGeometry()
  const mistPos = new Float32Array(mistCount * 3)
  const mistSeed: number[] = []
  for (let i = 0; i < mistCount; i++) {
    mistPos[i * 3] = WATERFALL_TOP.x + (random() - 0.5) * 5
    mistPos[i * 3 + 1] = fallTopY - fallHeight + random() * 7
    mistPos[i * 3 + 2] = WATERFALL_TOP.z + (random() - 0.5) * 5
    mistSeed.push(random() * Math.PI * 2)
  }
  mistGeo.setAttribute('position', new THREE.BufferAttribute(mistPos, 3))
  const mistMat = new THREE.PointsMaterial({
    size: 4.2,
    map: mistTex,
    transparent: true,
    opacity: 0.4,
    depthWrite: false,
    sizeAttenuation: true,
    color: new THREE.Color(C.foam),
  })
  const mist = new THREE.Points(mistGeo, mistMat)
  group.add(mist)

  /* 环绕的浮空碎石 */
  const shardGroup = new THREE.Group()
  const shardBatch = new Batcher()
  const shards: Array<{ mesh: THREE.Mesh; radius: number; angle: number; y: number; speed: number; spin: number }> = []
  const shardMat = toonMaterial({ flatShading: true })
  for (let i = 0; i < 15; i++) {
    const b = new Batcher()
    const size = 0.7 + random() * 2.1
    b.add(new THREE.IcosahedronGeometry(size, 0), C.rock, { scale: [1, 0.72 + random() * 0.4, 1] })
    b.add(
      new THREE.IcosahedronGeometry(size * 0.42, 0),
      C.rockLight,
      { position: [size * 0.5, size * 0.4, size * 0.3], rotation: [random(), random(), random()] },
    )
    if (random() > 0.45) {
      b.add(new THREE.IcosahedronGeometry(size * 0.5, 0), C.grassDeep, {
        position: [0, size * 0.55, 0],
        scale: [1.1, 0.3, 1.1],
      })
    }
    const mesh = b.build(shardMat, { mottle: 0.12, seed: i + 5 })
    if (!mesh) continue
    const radius = ISLAND_RADIUS + 6 + random() * 20
    const angle = random() * Math.PI * 2
    const y = -4 - random() * 22
    mesh.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius)
    mesh.rotation.set(random() * 3, random() * 3, random() * 3)
    shardGroup.add(mesh)
    shards.push({ mesh, radius, angle, y, speed: 0.012 + random() * 0.03, spin: (random() - 0.5) * 0.25 })
  }
  void shardBatch
  group.add(shardGroup)

  /* 岛底的柔光，暗示浮空的力量 */
  const glowTex = softDotTexture('rgba(255,214,150,0.75)', 'rgba(255,214,150,0)')
  const glow = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: glowTex,
      transparent: true,
      opacity: 0.34,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
  )
  glow.scale.set(46, 46, 1)
  glow.position.set(0, -33, 0)
  group.add(glow)

  const glow2 = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: glowTex,
      transparent: true,
      opacity: 0.2,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      color: new THREE.Color(C.water),
    }),
  )
  glow2.scale.set(78, 30, 1)
  glow2.position.set(0, -20, 0)
  group.add(glow2)

  let nightAmount = 0

  return {
    group,
    update(time, delta) {
      fallTex.offset.y -= delta * 0.55
      ;(fall2.material as THREE.MeshBasicMaterial).map!.offset.y -= delta * 0.42

      const mp = mistGeo.getAttribute('position') as THREE.BufferAttribute
      for (let i = 0; i < mistCount; i++) {
        const s = mistSeed[i]
        const life = ((time * 0.22 + s) % 1 + 1) % 1
        mp.setY(i, fallTopY - fallHeight + life * 9.5)
        mp.setX(i, WATERFALL_TOP.x + Math.sin(s * 7 + time * 0.4) * (1.4 + life * 3.2))
        mp.setZ(i, WATERFALL_TOP.z + Math.cos(s * 5 + time * 0.35) * (1.4 + life * 3.2))
      }
      mp.needsUpdate = true
      mistMat.opacity = 0.3 + Math.sin(time * 0.7) * 0.07

      for (const s of shards) {
        s.angle += s.speed * delta
        s.mesh.position.x = Math.cos(s.angle) * s.radius
        s.mesh.position.z = Math.sin(s.angle) * s.radius
        s.mesh.position.y = s.y + Math.sin(time * 0.4 + s.angle * 2) * 1.1
        s.mesh.rotation.y += s.spin * delta
        s.mesh.rotation.x += s.spin * delta * 0.4
      }

      glow.material.opacity = 0.2 + nightAmount * 0.4 + Math.sin(time * 0.8) * 0.03
      glow2.material.opacity = 0.12 + nightAmount * 0.24
    },
    setNight(amount) {
      nightAmount = amount
      fallMat.opacity = 0.72 - amount * 0.3
    },
  }
}
