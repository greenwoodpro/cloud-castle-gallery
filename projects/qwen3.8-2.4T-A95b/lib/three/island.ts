import * as THREE from 'three'
import { PALETTE } from './palette'
import { fbm2, lerp, makeRandom, range, smoothstep } from './noise'
import { matte, sphere, cyl, cone, glow } from './materials'

/** 岛屿总体尺寸。所有地形/建筑坐标都基于这套常量。 */
export const ISLAND = {
  radius: 62,
  rockDepth: 34,
  waterLevel: -1.15,
  plateauHeight: 2.4,
  plateauRadius: 25,
}

/** 岛上各个功能区的中心，供地形整形与物件摆放共用。 */
export const ZONES = {
  lake: { x: -38, z: 24, r: 12 },
  forest: { x: 40, z: -26, r: 16 },
  farm: { x: -30, z: -32, r: 12 },
  village: { x: 22, z: 37, r: 11 },
  roseGarden: { x: 33, z: 25, r: 9 },
  quarry: { x: -46, z: -12, r: 8 },
}

/** 瀑布出口方向：从湖心沿径向延伸到岛缘。 */
const FALL_ANGLE = Math.atan2(ZONES.lake.z, ZONES.lake.x)
export const FALL_EXIT = {
  x: Math.cos(FALL_ANGLE) * ISLAND.radius,
  z: Math.sin(FALL_ANGLE) * ISLAND.radius,
}

const c = new THREE.Color()

/**
 * 地形高度场。
 * 由「基础起伏 + 城堡高原 + 湖盆 + 溪流渠道 + 岛缘悬崖」几层叠加而成，
 * 保证城堡坐落在平整高地上，同时湖面、农田、崖壁各有明确形态。
 */
export function terrainHeight(x: number, z: number): number {
  const r = Math.hypot(x, z)

  let h = fbm2(x * 0.032, z * 0.032, 4, 7) * 2.3
  h += fbm2(x * 0.1, z * 0.1, 2, 23) * 0.5

  // 城堡高原：中心抬升并压平，边缘柔和过渡
  const plateau = 1 - smoothstep(ISLAND.plateauRadius * 0.62, ISLAND.plateauRadius * 1.12, r)
  h = lerp(h, ISLAND.plateauHeight, plateau)

  // 湖盆
  const lakeD = Math.hypot(x - ZONES.lake.x, z - ZONES.lake.z)
  const lakeMask = 1 - smoothstep(ZONES.lake.r * 0.42, ZONES.lake.r * 1.02, lakeD)
  h = lerp(h, -3.1, lakeMask)

  // 溪流渠道：湖 → 岛缘，形成瀑布
  const channel = channelMask(x, z)
  h = lerp(h, Math.min(h, -1.5) - 0.9, channel)

  // 采石场凹地
  const qD = Math.hypot(x - ZONES.quarry.x, z - ZONES.quarry.z)
  h = lerp(h, h - 2.2, 1 - smoothstep(ZONES.quarry.r * 0.4, ZONES.quarry.r, qD))

  // 农田做成缓坡梯田
  const fD = Math.hypot(x - ZONES.farm.x, z - ZONES.farm.z)
  const farmMask = 1 - smoothstep(ZONES.farm.r * 0.5, ZONES.farm.r * 1.05, fD)
  if (farmMask > 0) {
    const terrace = Math.round(h * 1.6) / 1.6
    h = lerp(h, terrace, farmMask * 0.85)
  }

  // 岛缘悬崖：靠近边缘时急剧下沉，形成浮空岛的断崖
  const rim = smoothstep(ISLAND.radius * 0.82, ISLAND.radius * 1.0, r)
  h = lerp(h, -4.2, rim)

  return h
}

/** 到「湖心 → 岛缘」折线的归一化距离，0 表示在渠道中心。 */
function channelMask(x: number, z: number): number {
  const ax = ZONES.lake.x
  const az = ZONES.lake.z
  const bx = FALL_EXIT.x
  const bz = FALL_EXIT.z
  const dx = bx - ax
  const dz = bz - az
  const len2 = dx * dx + dz * dz
  let t = ((x - ax) * dx + (z - az) * dz) / len2
  t = t < 0 ? 0 : t > 1 ? 1 : t
  const px = ax + dx * t
  const pz = az + dz * t
  const d = Math.hypot(x - px, z - pz)
  const width = lerp(2.2, 3.4, t)
  return (1 - smoothstep(width * 0.35, width, d)) * smoothstep(0.02, 0.18, t)
}

/** 该点是否在水下（用于判断能否摆放水生植物）。 */
export function isUnderwater(x: number, z: number): boolean {
  return terrainHeight(x, z) < ISLAND.waterLevel - 0.15
}

/** 取地表高度，物件摆放统一走这里。 */
export function groundY(x: number, z: number): number {
  return terrainHeight(x, z)
}

// ---------- 岛面网格 ----------

function buildTopSurface(): THREE.Mesh {
  const radial = 168
  const rings = 78
  const positions: number[] = []
  const colors: number[] = []
  const indices: number[] = []
  const normals: number[] = []

  const ringRadii: number[] = []
  for (let i = 0; i <= rings; i++) {
    // 中心区域采样密一些，边缘稀疏，节省顶点
    const t = i / rings
    ringRadii.push(ISLAND.radius * Math.pow(t, 0.86))
  }

  const heightAt = (r: number, a: number) => terrainHeight(Math.cos(a) * r, Math.sin(a) * r)

  for (let i = 0; i <= rings; i++) {
    const r = ringRadii[i]
    for (let j = 0; j <= radial; j++) {
      const a = (j / radial) * Math.PI * 2
      const x = Math.cos(a) * r
      const z = Math.sin(a) * r
      const y = i === 0 ? terrainHeight(0, 0) : heightAt(r, a)
      positions.push(x, y, z)
      normals.push(0, 1, 0)

      const col = surfaceColor(x, z, y, r)
      colors.push(col.r, col.g, col.b)
    }
  }

  const stride = radial + 1
  for (let i = 0; i < rings; i++) {
    for (let j = 0; j < radial; j++) {
      const a = i * stride + j
      const b = a + 1
      const c2 = a + stride
      const d = c2 + 1
      if (i === 0) {
        indices.push(a, c2, d)
      } else {
        indices.push(a, c2, d, a, d, b)
      }
    }
  }

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
  geo.setIndex(indices)
  geo.computeVertexNormals()

  const mesh = new THREE.Mesh(
    geo,
    // DoubleSide：环带绕序若使正面朝下，从上方看会被背面剔除，导致"地面消失"
    new THREE.MeshLambertMaterial({ vertexColors: true, side: THREE.DoubleSide }),
  )
  mesh.receiveShadow = true
  mesh.castShadow = false
  mesh.name = 'island-top'
  return mesh
}

/** 依据高度、坡度、所属区域给顶点上色，得到水彩般的地表过渡。 */
function surfaceColor(x: number, z: number, y: number, r: number): THREE.Color {
  const rand = Math.abs(fbm2(x * 0.55, z * 0.55, 2, 91))

  // 坡度：用邻近采样估算
  const e = 1.1
  const hx = terrainHeight(x + e, z) - terrainHeight(x - e, z)
  const hz = terrainHeight(x, z + e) - terrainHeight(x, z - e)
  const slope = Math.min(1, Math.hypot(hx, hz) / (2 * e) / 0.85)

  c.set(PALETTE.grass)

  // 高地偏干黄，低洼偏深绿
  const dry = smoothstep(1.6, 3.8, y)
  c.lerp(new THREE.Color(PALETTE.grassDry), dry * 0.32)
  const low = smoothstep(0.6, -1.6, y)
  c.lerp(new THREE.Color(PALETTE.grassDark), low * 0.45)

  // 只有真正陡的坡才露出岩石；阈值太低会让整座岛发灰
  c.lerp(new THREE.Color(PALETTE.rock), smoothstep(1.1, 2.4, slope) * 0.8)

  // 水线附近的沙泥
  const shore = 1 - smoothstep(0.1, 1.5, Math.abs(y - ISLAND.waterLevel))
  c.lerp(new THREE.Color(PALETTE.sand), shore * 0.85)
  if (y < ISLAND.waterLevel - 0.4) c.lerp(new THREE.Color(PALETTE.dirtDark), 0.5)

  // 城堡高原顶部铺石板
  const pave = (1 - smoothstep(ISLAND.plateauRadius * 0.26, ISLAND.plateauRadius * 0.46, r)) * smoothstep(1.5, 2.2, y)
  c.lerp(new THREE.Color(PALETTE.stoneMid), pave * 0.2)

  // 农田：条状耕作色
  const fD = Math.hypot(x - ZONES.farm.x, z - ZONES.farm.z)
  const farm = 1 - smoothstep(ZONES.farm.r * 0.55, ZONES.farm.r * 0.98, fD)
  if (farm > 0) {
    const local = (x - ZONES.farm.x) * 0.62 + (z - ZONES.farm.z) * 0.62
    const stripe = Math.sin(local * 0.85) * 0.5 + 0.5
    const crop = new THREE.Color(PALETTE.wheat).lerp(new THREE.Color(PALETTE.wheatDark), stripe)
    c.lerp(crop, farm * 0.8)
    c.lerp(new THREE.Color(PALETTE.dirt), farm * (1 - stripe) * 0.35)
  }

  // 玫瑰园土壤偏深
  const rD = Math.hypot(x - ZONES.roseGarden.x, z - ZONES.roseGarden.z)
  c.lerp(new THREE.Color(PALETTE.dirt), (1 - smoothstep(ZONES.roseGarden.r * 0.5, ZONES.roseGarden.r, rD)) * 0.4)

  // 采石场岩色
  const qD = Math.hypot(x - ZONES.quarry.x, z - ZONES.quarry.z)
  c.lerp(new THREE.Color(PALETTE.rockDark), (1 - smoothstep(ZONES.quarry.r * 0.35, ZONES.quarry.r, qD)) * 0.75)

  // 岛缘断崖
  const rim = smoothstep(ISLAND.radius * 0.8, ISLAND.radius * 0.99, r)
  c.lerp(new THREE.Color(PALETTE.rockDark), rim * 0.9)

  // 细微色斑，打破大面积均匀
  c.offsetHSL(0, 0, (rand - 0.5) * 0.055)
  return c.clone()
}

/** 岛底岩石：车削出倒锥轮廓后逐顶点加噪声，得到自然断裂感。 */
function buildRock(): THREE.Mesh {
  const R = ISLAND.radius
  const D = ISLAND.rockDepth
  const profile: THREE.Vector2[] = [
    new THREE.Vector2(R * 1.0, 0.6),
    new THREE.Vector2(R * 0.99, -1.4),
    new THREE.Vector2(R * 0.93, -4.2),
    new THREE.Vector2(R * 0.82, -7.6),
    new THREE.Vector2(R * 0.66, -11.5),
    new THREE.Vector2(R * 0.5, -15.4),
    new THREE.Vector2(R * 0.35, -19.6),
    new THREE.Vector2(R * 0.22, -23.8),
    new THREE.Vector2(R * 0.12, -27.6),
    new THREE.Vector2(R * 0.05, -30.6),
    new THREE.Vector2(0.02, -D),
  ]

  const geo = new THREE.LatheGeometry(profile, 120)
  geo.rotateY(0.3)
  const pos = geo.attributes.position as THREE.BufferAttribute
  const colors: number[] = []
  const rand = makeRandom(4242)

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i)
    const y = pos.getY(i)
    const z = pos.getZ(i)
    const r = Math.hypot(x, z)
    if (r > 0.5) {
      const n = fbm2(x * 0.09, z * 0.09 + y * 0.06, 4, 55)
      const n2 = fbm2(x * 0.28, z * 0.28 - y * 0.18, 2, 77)
      const disp = n * 3.4 + n2 * 1.1
      const k = 1 + disp / Math.max(2, r)
      pos.setXYZ(i, x * k, y + n2 * 1.3, z * k)
    }
    // 越深越暗，顶部带一点草色渗透
    const depth = smoothstep(0, -D, y)
    c.set(PALETTE.rockDark).lerp(new THREE.Color(PALETTE.rockDeep), depth)
    c.lerp(new THREE.Color(PALETTE.grassDark), (1 - smoothstep(-1, -6, y)) * 0.55)
    c.offsetHSL(0, 0, (rand() - 0.5) * 0.06)
    colors.push(c.r, c.g, c.b)
  }

  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
  geo.computeVertexNormals()

  const mesh = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({ vertexColors: true, side: THREE.DoubleSide }))
  mesh.castShadow = false
  mesh.receiveShadow = true
  mesh.name = 'island-rock'
  return mesh
}

/** 岛缘一圈「草皮裙边」，让草地与岩石的交界不生硬。 */
function buildRimSkirt(): THREE.Mesh {
  const radial = 168
  const rows = 7
  const positions: number[] = []
  const colors: number[] = []
  const indices: number[] = []

  for (let i = 0; i <= rows; i++) {
    const t = i / rows
    const y = lerp(-0.2, -6.4, Math.pow(t, 1.35))
    const shrink = 1 - t * 0.055
    for (let j = 0; j <= radial; j++) {
      const a = (j / radial) * Math.PI * 2
      const wob = 1 + fbm2(Math.cos(a) * 3, Math.sin(a) * 3 + t * 2, 2, 31) * 0.022
      const r = ISLAND.radius * shrink * wob
      positions.push(Math.cos(a) * r, y + fbm2(Math.cos(a) * 5, Math.sin(a) * 5, 2, 12) * 0.5 * t, Math.sin(a) * r)
      c.set(PALETTE.rockDark).lerp(new THREE.Color(PALETTE.grassDark), (1 - t) * 0.7)
      c.offsetHSL(0, 0, (fbm2(j * 0.3, i * 0.7, 2, 5) - 0.5) * 0.06)
      colors.push(c.r, c.g, c.b)
    }
  }
  const stride = radial + 1
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < radial; j++) {
      const a = i * stride + j
      indices.push(a, a + stride, a + stride + 1, a, a + stride + 1, a + 1)
    }
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
  geo.setIndex(indices)
  geo.computeVertexNormals()
  const mesh = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({ vertexColors: true, side: THREE.DoubleSide }))
  mesh.receiveShadow = true
  return mesh
}

/** 岛底垂挂的树根与藤蔓。 */
function buildHangingRoots(): THREE.Group {
  const g = new THREE.Group()
  const rand = makeRandom(9091)
  const rootMat = matte(PALETTE.trunkDark)
  const vineMat = matte(PALETTE.leafDark)

  for (let i = 0; i < 34; i++) {
    const a = rand() * Math.PI * 2
    const r = range(rand, ISLAND.radius * 0.35, ISLAND.radius * 0.97)
    const x = Math.cos(a) * r
    const z = Math.sin(a) * r
    const topY = -range(rand, 1.5, 9)
    const len = range(rand, 5, 17)

    const pts: THREE.Vector3[] = []
    const segs = 5
    for (let s = 0; s <= segs; s++) {
      const t = s / segs
      pts.push(
        new THREE.Vector3(
          x + Math.sin(t * 3 + i) * t * 1.6,
          topY - t * len,
          z + Math.cos(t * 2.4 + i) * t * 1.6,
        ),
      )
    }
    const curve = new THREE.CatmullRomCurve3(pts)
    const tube = new THREE.Mesh(
      new THREE.TubeGeometry(curve, 10, range(rand, 0.14, 0.42) * (1 - 0.0), 6, false),
      rand() > 0.45 ? rootMat : vineMat,
    )
    tube.castShadow = false
    g.add(tube)

    // 藤蔓末端的小叶簇
    if (rand() > 0.5) {
      const leaf = sphere(range(rand, 0.5, 1.1), PALETTE.leafDark, 8)
      leaf.position.copy(pts[pts.length - 1])
      leaf.scale.y = 0.7
      g.add(leaf)
    }
  }
  return g
}

/** 岛底发光的矿石，夜里提供冷色补光，也是「浮空」的视觉理由。 */
function buildCrystals(): THREE.Group {
  const g = new THREE.Group()
  const rand = makeRandom(1717)
  for (let i = 0; i < 22; i++) {
    const a = rand() * Math.PI * 2
    const r = range(rand, ISLAND.radius * 0.1, ISLAND.radius * 0.72)
    const depth = -range(rand, 8, 28)
    const size = range(rand, 0.7, 2.4)
    const shard = cone(size * 0.42, size * 2.1, '#9fd8e8', 6)
    const mat = shard.material as THREE.MeshLambertMaterial
    mat.emissive = new THREE.Color('#63c6e0')
    mat.emissiveIntensity = 0.85
    shard.position.set(Math.cos(a) * r, depth, Math.sin(a) * r)
    shard.rotation.set(range(rand, -0.5, 0.5), rand() * Math.PI, range(rand, -0.5, 0.5))
    shard.userData.crystal = true
    g.add(shard)

    const halo = new THREE.Mesh(
      new THREE.SphereGeometry(size * 1.5, 10, 8),
      new THREE.MeshBasicMaterial({ color: '#7fd0e6', transparent: true, opacity: 0.1, depthWrite: false }),
    )
    halo.position.copy(shard.position)
    halo.userData.crystalHalo = true
    g.add(halo)
  }
  return g
}

/** 从岛底持续坠落的小碎石，强化「悬浮」的动感。 */
export function buildFallingDebris(): THREE.Points {
  const count = 160
  const positions = new Float32Array(count * 3)
  const speeds = new Float32Array(count)
  const rand = makeRandom(555)
  for (let i = 0; i < count; i++) {
    const a = rand() * Math.PI * 2
    const r = range(rand, 4, ISLAND.radius * 0.9)
    positions[i * 3] = Math.cos(a) * r
    positions[i * 3 + 1] = -range(rand, 4, 60)
    positions[i * 3 + 2] = Math.sin(a) * r
    speeds[i] = range(rand, 1.2, 3.6)
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  const pts = new THREE.Points(
    geo,
    new THREE.PointsMaterial({ color: PALETTE.rockDark, size: 0.55, sizeAttenuation: true, transparent: true, opacity: 0.75 }),
  )
  pts.userData.speeds = speeds
  return pts
}

/** 组装整座浮空岛。 */
export function buildIsland(): THREE.Group {
  const g = new THREE.Group()
  g.name = 'floating-island'
  g.add(buildTopSurface())
  g.add(buildRimSkirt())
  g.add(buildRock())
  g.add(buildHangingRoots())
  g.add(buildCrystals())
  g.add(buildFallingDebris())
  return g
}

export { glow, cyl }
