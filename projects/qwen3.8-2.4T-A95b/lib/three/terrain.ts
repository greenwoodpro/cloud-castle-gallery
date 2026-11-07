import * as THREE from 'three'
import { PALETTE } from './palette'
import { fbm2, lerp, makeRandom, pick, range, smoothstep } from './noise'
import { box, capsule, cone, cyl, flowTexture, matte, place, scatter, sphere, torus, uniqueMatte } from './materials'
import { FALL_EXIT, ISLAND, ZONES, groundY, terrainHeight } from './island'

// ---------- 湖泊 ----------

/** 湖面：顶点做正弦涟漪，材质半透明，能看到湖底沙色。 */
export function buildLake(): THREE.Group {
  const g = new THREE.Group()
  g.name = 'lake'

  const geo = new THREE.CircleGeometry(ZONES.lake.r * 0.98, 72, 0, Math.PI * 2)
  geo.rotateX(-Math.PI / 2)
  // 加密中心顶点，让涟漪有足够细分
  const water = new THREE.Mesh(
    new THREE.CircleGeometry(ZONES.lake.r * 0.98, 64, 0, Math.PI * 2).rotateX(-Math.PI / 2),
    new THREE.MeshLambertMaterial({
      color: PALETTE.water,
      transparent: true,
      opacity: 0.82,
      depthWrite: false,
    }),
  )
  water.position.set(ZONES.lake.x, ISLAND.waterLevel, ZONES.lake.z)
  water.receiveShadow = true
  water.userData.water = true
  g.add(water)
  geo.dispose()

  // 湖底
  const bed = new THREE.Mesh(
    new THREE.CircleGeometry(ZONES.lake.r * 1.02, 48).rotateX(-Math.PI / 2),
    matte(PALETTE.dirtDark),
  )
  bed.position.set(ZONES.lake.x, ISLAND.waterLevel - 1.9, ZONES.lake.z)
  bed.receiveShadow = true
  g.add(bed)

  const rand = makeRandom(31337)

  // 睡莲
  for (let i = 0; i < 16; i++) {
    const a = rand() * Math.PI * 2
    const r = range(rand, ZONES.lake.r * 0.25, ZONES.lake.r * 0.86)
    const pad = cyl(range(rand, 0.42, 0.85), range(rand, 0.42, 0.85), 0.07, PALETTE.leafDark, 10)
    pad.position.set(ZONES.lake.x + Math.cos(a) * r, ISLAND.waterLevel + 0.06, ZONES.lake.z + Math.sin(a) * r)
    pad.scale.z = 0.86
    pad.userData.bob = { phase: rand() * 6.28, amp: 0.035 }
    g.add(pad)
    if (rand() > 0.6) {
      const bloom = sphere(0.17, PALETTE.rosePink, 8)
      bloom.position.copy(pad.position)
      bloom.position.y += 0.14
      bloom.userData.bob = pad.userData.bob
      g.add(bloom)
    }
  }

  // 岸边芦苇
  const reedMat = matte(PALETTE.grassDark)
  for (let i = 0; i < 90; i++) {
    const a = rand() * Math.PI * 2
    const r = range(rand, ZONES.lake.r * 0.88, ZONES.lake.r * 1.12)
    const x = ZONES.lake.x + Math.cos(a) * r
    const z = ZONES.lake.z + Math.sin(a) * r
    const h = range(rand, 0.9, 2.1)
    const stem = cyl(0.035, 0.05, h, PALETTE.grassDark, 5)
    stem.position.set(x, ISLAND.waterLevel + h / 2 - 0.25, z)
    stem.rotation.set(range(rand, -0.14, 0.14), rand() * 3, range(rand, -0.14, 0.14))
    stem.material = reedMat
    g.add(stem)
    if (rand() > 0.55) {
      const head = capsule(0.075, 0.28, PALETTE.trunk, 6)
      head.position.set(stem.position.x, stem.position.y + h / 2 + 0.1, stem.position.z)
      g.add(head)
    }
  }

  // 木栈桥
  const dock = new THREE.Group()
  const dockAngle = Math.atan2(-ZONES.lake.z, -ZONES.lake.x) + 0.5
  for (let i = 0; i < 9; i++) {
    const plank = box(2.5, 0.14, 0.52, i % 2 ? PALETTE.wood : PALETTE.woodDark)
    plank.position.set(0, 0, i * 0.58)
    dock.add(plank)
  }
  for (const sx of [-1.05, 1.05]) {
    for (const sz of [0.4, 4.6]) {
      const post = cyl(0.11, 0.13, 1.7, PALETTE.woodDeep, 8)
      post.position.set(sx, -0.8, sz)
      dock.add(post)
    }
  }
  const lanternPost = cyl(0.08, 0.09, 1.5, PALETTE.woodDeep, 8)
  lanternPost.position.set(1.05, 0.75, 4.9)
  dock.add(lanternPost)
  const lanternBox = box(0.34, 0.4, 0.34, PALETTE.lantern)
  const lm = lanternBox.material as THREE.MeshLambertMaterial
  lm.emissive = new THREE.Color(PALETTE.lantern)
  lm.emissiveIntensity = 0.9
  lanternBox.position.set(1.05, 1.62, 4.9)
  lanternBox.userData.lamp = true
  dock.add(lanternBox)

  dock.position.set(
    ZONES.lake.x + Math.cos(dockAngle) * (ZONES.lake.r * 0.55),
    ISLAND.waterLevel + 0.28,
    ZONES.lake.z + Math.sin(dockAngle) * (ZONES.lake.r * 0.55),
  )
  dock.rotation.y = -dockAngle + Math.PI / 2
  g.add(dock)

  // 小木船
  const boat = new THREE.Group()
  const hull = new THREE.Mesh(new THREE.SphereGeometry(1.15, 14, 10, 0, Math.PI * 2, 0, Math.PI / 2), matte(PALETTE.wood))
  hull.rotation.x = Math.PI
  hull.scale.set(1, 0.52, 1.9)
  hull.castShadow = true
  boat.add(hull)
  const rim = torus(1.12, 0.09, PALETTE.woodDark, 8, 20)
  rim.rotation.x = Math.PI / 2
  rim.scale.z = 1.9
  boat.add(rim)
  const seat = box(1.5, 0.1, 0.34, PALETTE.woodDark)
  seat.position.y = 0.16
  boat.add(seat)
  boat.position.set(ZONES.lake.x - 3.4, ISLAND.waterLevel + 0.16, ZONES.lake.z + 2.6)
  boat.rotation.y = 0.7
  boat.userData.bob = { phase: 1.2, amp: 0.07, rock: true }
  g.add(boat)

  return g
}

// ---------- 溪流与瀑布 ----------

/** 沿路径采样地形，生成一条贴合地面的水面带。 */
function ribbonAlongPath(
  points: THREE.Vector3[],
  widthFn: (t: number) => number,
  yOffset: number,
  material: THREE.Material,
  segments = 60,
): THREE.Mesh {
  const positions: number[] = []
  const uvs: number[] = []
  const indices: number[] = []
  const curve = new THREE.CatmullRomCurve3(points)

  for (let i = 0; i <= segments; i++) {
    const t = i / segments
    const p = curve.getPoint(t)
    const tan = curve.getTangent(t)
    const side = new THREE.Vector3(-tan.z, 0, tan.x).normalize()
    const w = widthFn(t) / 2
    const y = p.y + yOffset
    positions.push(p.x - side.x * w, y, p.z - side.z * w)
    positions.push(p.x + side.x * w, y, p.z + side.z * w)
    uvs.push(0, t * 6, 1, t * 6)
    if (i < segments) {
      const a = i * 2
      indices.push(a, a + 1, a + 3, a, a + 3, a + 2)
    }
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))
  geo.setIndex(indices)
  geo.computeVertexNormals()
  const mesh = new THREE.Mesh(geo, material)
  mesh.receiveShadow = true
  return mesh
}

export function buildWaterfall(): THREE.Group {
  const g = new THREE.Group()
  g.name = 'waterfall'

  // 每条水流用独立材质 + 独立贴图副本，这样各自的 UV 滚动速度互不干扰
  const makeFlowMat = (color: string, opacity: number) =>
    new THREE.MeshLambertMaterial({
      color: new THREE.Color(color),
      map: flowTexture().clone(),
      transparent: true,
      opacity,
      depthWrite: false,
      side: THREE.DoubleSide,
    })
  const waterMat = makeFlowMat(PALETTE.water, 0.8)
  const foamMat = makeFlowMat(PALETTE.waterFoam, 0.66)
  const innerMat = makeFlowMat(PALETTE.water, 0.72)

  // 溪流：湖岸 → 岛缘
  const lx = ZONES.lake.x
  const lz = ZONES.lake.z
  const streamPts: THREE.Vector3[] = []
  const steps = 8
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const x = lerp(lx, FALL_EXIT.x, t)
    const z = lerp(lz, FALL_EXIT.z, t)
    const y = Math.min(terrainHeight(x, z), ISLAND.waterLevel - 0.35) + 0.42
    streamPts.push(new THREE.Vector3(x, y, z))
  }
  const stream = ribbonAlongPath(streamPts, (t) => lerp(2.6, 3.6, t), 0.02, waterMat, 48)
  stream.userData.flow = { speed: 0.55 }
  g.add(stream)

  // 瀑布：从岛缘垂直落下
  const fallTop = new THREE.Vector3(FALL_EXIT.x * 0.985, -3.4, FALL_EXIT.z * 0.985)
  const fallBottom = new THREE.Vector3(FALL_EXIT.x * 0.86, -52, FALL_EXIT.z * 0.86)
  const fallPts: THREE.Vector3[] = []
  const fSteps = 14
  for (let i = 0; i <= fSteps; i++) {
    const t = i / fSteps
    fallPts.push(
      new THREE.Vector3(
        lerp(fallTop.x, fallBottom.x, t) + Math.sin(t * 4) * 0.5,
        lerp(fallTop.y, fallBottom.y, Math.pow(t, 0.82)),
        lerp(fallTop.z, fallBottom.z, t) + Math.cos(t * 4) * 0.5,
      ),
    )
  }
  const fall = ribbonAlongPath(fallPts, (t) => lerp(4.2, 1.6, t), 0, foamMat, 40)
  fall.userData.flow = { speed: 2.4, vertical: true }
  g.add(fall)

  const fallInner = ribbonAlongPath(fallPts, (t) => lerp(2.6, 0.8, t), 0.12, innerMat, 40)
  fallInner.userData.flow = { speed: 3.1, vertical: true }
  g.add(fallInner)

  // 崖口溢流的一小片水舌
  const lip = new THREE.Mesh(new THREE.SphereGeometry(2.1, 14, 10), uniqueMatte(PALETTE.waterFoam, { transparent: true, opacity: 0.7 }))
  const lipMat = lip.material as THREE.MeshLambertMaterial
  lip.scale.set(1.5, 0.35, 1)
  lip.position.set(FALL_EXIT.x * 0.99, -3.2, FALL_EXIT.z * 0.99)
  lip.rotation.y = Math.atan2(FALL_EXIT.z, FALL_EXIT.x)
  g.add(lip)

  // 水雾
  const mistCount = 220
  const mistPos = new Float32Array(mistCount * 3)
  const mistSeed = new Float32Array(mistCount)
  const rand = makeRandom(8080)
  for (let i = 0; i < mistCount; i++) {
    const t = rand()
    mistPos[i * 3] = lerp(fallTop.x, fallBottom.x, t) + range(rand, -3, 3)
    mistPos[i * 3 + 1] = lerp(fallTop.y, fallBottom.y, t) + range(rand, -2, 2)
    mistPos[i * 3 + 2] = lerp(fallTop.z, fallBottom.z, t) + range(rand, -3, 3)
    mistSeed[i] = rand() * 6.28
  }
  const mistGeo = new THREE.BufferGeometry()
  mistGeo.setAttribute('position', new THREE.Float32BufferAttribute(mistPos, 3))
  const mist = new THREE.Points(
    mistGeo,
    new THREE.PointsMaterial({
      color: PALETTE.waterFoam,
      size: 1.5,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.4,
      depthWrite: false,
    }),
  )
  mist.userData.mist = { seeds: mistSeed, top: fallTop.clone(), bottom: fallBottom.clone() }
  g.add(mist)

  return g
}

// ---------- 植被 ----------

/** 圆冠树：小王子插画里那种一团一团的树。 */
export function buildTree(rand: () => number, scale = 1, autumn = false): THREE.Group {
  const g = new THREE.Group()
  const trunkH = range(rand, 1.5, 2.8) * scale
  const trunk = cyl(0.17 * scale, 0.28 * scale, trunkH, PALETTE.trunk, 8)
  trunk.position.y = trunkH / 2
  g.add(trunk)

  const leafColor = autumn ? pick(rand, [PALETTE.leafAutumn, PALETTE.leaf, PALETTE.leafDark]) : pick(rand, [PALETTE.leaf, PALETTE.leafDark, PALETTE.leaf])
  const blobs = 3 + Math.floor(rand() * 3)
  for (let i = 0; i < blobs; i++) {
    const r = range(rand, 0.85, 1.5) * scale
    const b = sphere(r, leafColor, 10)
    b.position.set(
      range(rand, -0.6, 0.6) * scale,
      trunkH + range(rand, 0.2, 1.2) * scale,
      range(rand, -0.6, 0.6) * scale,
    )
    b.scale.y = range(rand, 0.78, 1.0)
    g.add(b)
  }
  g.userData.sway = { phase: rand() * 6.28, amp: 0.02 }
  return g
}

/** 松树：圆锥叠层，用在岛缘与采石场附近。 */
function buildPine(rand: () => number, scale = 1): THREE.Group {
  const g = new THREE.Group()
  const h = range(rand, 2.4, 4.2) * scale
  const trunk = cyl(0.14 * scale, 0.22 * scale, h * 0.4, PALETTE.trunkDark, 7)
  trunk.position.y = h * 0.2
  g.add(trunk)
  const tiers = 3 + Math.floor(rand() * 2)
  for (let i = 0; i < tiers; i++) {
    const t = i / tiers
    const cr = lerp(1.25, 0.35, t) * scale
    const ch = lerp(1.3, 0.8, t) * scale
    const c = cone(cr, ch, i % 2 ? PALETTE.leafDark : PALETTE.leaf, 9)
    c.position.y = h * 0.32 + t * h * 0.62
    g.add(c)
  }
  g.userData.sway = { phase: rand() * 6.28, amp: 0.014 }
  return g
}

/** 猴面包树幼苗：书里小王子每天要拔掉的那种。 */
function buildBaobabSapling(rand: () => number): THREE.Group {
  const g = new THREE.Group()
  const body = cyl(0.22, 0.34, 0.85, PALETTE.grassDark, 9)
  body.position.y = 0.42
  g.add(body)
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2
    const leaf = sphere(0.24, PALETTE.leaf, 8)
    leaf.position.set(Math.cos(a) * 0.26, 0.92, Math.sin(a) * 0.26)
    leaf.scale.set(1, 0.55, 1)
    g.add(leaf)
  }
  const top = sphere(0.2, PALETTE.leafDark, 8)
  top.position.y = 1.02
  g.add(top)
  return g
}

export function buildForest(): THREE.Group {
  const g = new THREE.Group()
  g.name = 'forest'
  const rand = makeRandom(2468)
  const { x: cx, z: cz, r } = ZONES.forest

  for (let i = 0; i < 62; i++) {
    const a = rand() * Math.PI * 2
    const d = Math.sqrt(rand()) * r
    const x = cx + Math.cos(a) * d
    const z = cz + Math.sin(a) * d
    const y = groundY(x, z)
    if (y < ISLAND.waterLevel + 0.4) continue
    const tree = rand() > 0.78 ? buildPine(rand, range(rand, 0.85, 1.25)) : buildTree(rand, range(rand, 0.8, 1.4), rand() > 0.72)
    place(tree, x, y - 0.15, z)
    scatter(tree, rand, Math.PI * 2, 0.08)
    g.add(tree)
  }

  // 林间空地的小蘑菇圈
  for (let i = 0; i < 14; i++) {
    const a = rand() * Math.PI * 2
    const d = Math.sqrt(rand()) * r * 0.8
    const x = cx + Math.cos(a) * d
    const z = cz + Math.sin(a) * d
    const y = groundY(x, z)
    if (y < ISLAND.waterLevel + 0.4) continue
    const stem = cyl(0.09, 0.11, 0.24, PALETTE.cookApron, 7)
    stem.position.set(x, y + 0.12, z)
    g.add(stem)
    const cap = cone(0.24, 0.2, rand() > 0.5 ? PALETTE.roseRed : PALETTE.wheat, 9)
    cap.position.set(x, y + 0.3, z)
    g.add(cap)
  }

  return g
}

// ---------- 农田 ----------

export function buildFarmland(): THREE.Group {
  const g = new THREE.Group()
  g.name = 'farmland'
  const rand = makeRandom(1357)
  const { x: cx, z: cz, r } = ZONES.farm

  // 麦穗：InstancedMesh，一次绘制上千株
  const stalkGeo = new THREE.ConeGeometry(0.11, 0.95, 5)
  stalkGeo.translate(0, 0.47, 0)
  const stalkMat = matte(PALETTE.wheat)
  const count = 1500
  const stalks = new THREE.InstancedMesh(stalkGeo, stalkMat, count)
  const headGeo = new THREE.SphereGeometry(0.13, 6, 5)
  const heads = new THREE.InstancedMesh(headGeo, matte(PALETTE.wheatDark), count)
  const m = new THREE.Matrix4()
  const q = new THREE.Quaternion()
  const e = new THREE.Euler()
  const s = new THREE.Vector3()
  const p = new THREE.Vector3()
  let n = 0
  for (let i = 0; i < count * 2 && n < count; i++) {
    const a = rand() * Math.PI * 2
    const d = Math.sqrt(rand()) * r * 0.94
    const x = cx + Math.cos(a) * d
    const z = cz + Math.sin(a) * d
    const y = groundY(x, z)
    if (y < ISLAND.waterLevel + 0.6) continue
    const sc = range(rand, 0.75, 1.2)
    e.set(range(rand, -0.1, 0.1), rand() * Math.PI, range(rand, -0.1, 0.1))
    q.setFromEuler(e)
    p.set(x, y, z)
    s.set(sc, sc, sc)
    m.compose(p, q, s)
    stalks.setMatrixAt(n, m)
    p.set(x, y + 0.95 * sc, z)
    m.compose(p, q, s)
    heads.setMatrixAt(n, m)
    n++
  }
  stalks.count = n
  heads.count = n
  stalks.instanceMatrix.needsUpdate = true
  heads.instanceMatrix.needsUpdate = true
  stalks.castShadow = true
  stalks.receiveShadow = true
  g.add(stalks, heads)

  // 农舍
  const house = new THREE.Group()
  const body = box(4.2, 2.6, 3.4, PALETTE.stoneLight)
  body.position.y = 1.3
  house.add(body)
  const roofGeo = new THREE.CylinderGeometry(2.5, 2.5, 4.5, 3, 1, false)
  roofGeo.rotateZ(Math.PI / 2)
  roofGeo.rotateY(Math.PI / 2)
  const roof = new THREE.Mesh(roofGeo, matte(PALETTE.roofRose))
  roof.scale.set(1, 1, 0.86)
  roof.position.y = 3.5
  roof.castShadow = true
  house.add(roof)
  const door = box(0.9, 1.5, 0.12, PALETTE.woodDeep)
  door.position.set(0, 0.75, 1.72)
  house.add(door)
  for (const sx of [-1.3, 1.3]) {
    const win = box(0.7, 0.7, 0.12, PALETTE.windowGlow)
    const wm = win.material as THREE.MeshLambertMaterial
    wm.emissive = new THREE.Color(PALETTE.windowGlow)
    wm.emissiveIntensity = 0.55
    win.position.set(sx, 1.6, 1.72)
    win.userData.lamp = true
    house.add(win)
  }
  const chimney = box(0.6, 1.6, 0.6, PALETTE.stoneDark)
  chimney.position.set(1.3, 4.1, -0.6)
  house.add(chimney)
  house.position.set(cx + 6.5, groundY(cx + 6.5, cz - 5.5), cz - 5.5)
  house.rotation.y = -0.5
  g.add(house)

  // 风车
  const mill = new THREE.Group()
  const tower = cyl(1.1, 1.7, 5.4, PALETTE.stone, 12)
  tower.position.y = 2.7
  mill.add(tower)
  const cap = cone(1.5, 1.5, PALETTE.roofSlate, 12)
  cap.position.y = 6.1
  mill.add(cap)
  const blades = new THREE.Group()
  for (let i = 0; i < 4; i++) {
    const arm = box(0.18, 4.4, 0.14, PALETTE.woodDark)
    arm.position.y = 2.2
    const sail = box(0.85, 3.4, 0.06, PALETTE.cloud)
    sail.position.set(0.5, 2.3, 0)
    const blade = new THREE.Group()
    blade.add(arm, sail)
    blade.rotation.z = (i / 4) * Math.PI * 2
    blades.add(blade)
  }
  blades.position.set(0, 5.4, 1.5)
  mill.add(blades)
  mill.userData.windmill = blades
  const mx = cx - 7
  const mz = cz + 4
  mill.position.set(mx, groundY(mx, mz), mz)
  g.add(mill)

  // 草垛与栅栏
  for (let i = 0; i < 5; i++) {
    const a = rand() * Math.PI * 2
    const d = range(rand, r * 0.7, r * 1.15)
    const x = cx + Math.cos(a) * d
    const z = cz + Math.sin(a) * d
    const y = groundY(x, z)
    if (y < ISLAND.waterLevel + 0.5) continue
    const stack = cyl(0.9, 1.05, 1.1, PALETTE.wheatDark, 10)
    stack.position.set(x, y + 0.55, z)
    g.add(stack)
    const top = cone(1.0, 0.7, PALETTE.wheat, 10)
    top.position.set(x, y + 1.45, z)
    g.add(top)
  }

  return g
}

// ---------- 村庄 ----------

function buildCottage(rand: () => number): THREE.Group {
  const g = new THREE.Group()
  const w = range(rand, 2.8, 4.0)
  const d = range(rand, 2.6, 3.6)
  const h = range(rand, 2.0, 2.8)
  const body = box(w, h, d, pick(rand, [PALETTE.stoneLight, PALETTE.stone, PALETTE.cloud]))
  body.position.y = h / 2
  g.add(body)

  // 木骨架（半木结构民居）
  const beamMat = matte(PALETTE.woodDeep)
  for (const sx of [-w / 2 + 0.25, w / 2 - 0.25]) {
    const b = box(0.14, h, 0.14, PALETTE.woodDeep)
    b.material = beamMat
    b.position.set(sx, h / 2, d / 2 + 0.02)
    g.add(b)
  }
  const mid = box(w, 0.14, 0.14, PALETTE.woodDeep)
  mid.material = beamMat
  mid.position.set(0, h * 0.62, d / 2 + 0.02)
  g.add(mid)

  const roofH = range(rand, 1.4, 2.0)
  const roofGeo = new THREE.CylinderGeometry(d * 0.78, d * 0.78, w + 0.6, 3, 1, false)
  roofGeo.rotateZ(Math.PI / 2)
  roofGeo.rotateY(Math.PI / 2)
  const roof = new THREE.Mesh(roofGeo, matte(pick(rand, [PALETTE.roofRose, PALETTE.roofSlate, PALETTE.roofRoseDark])))
  roof.scale.set(1, 1, 0.9)
  roof.position.y = h + roofH * 0.42
  roof.castShadow = true
  g.add(roof)

  const door = box(0.75, 1.35, 0.1, PALETTE.woodDeep)
  door.position.set(range(rand, -0.5, 0.5), 0.68, d / 2 + 0.05)
  g.add(door)

  const win = box(0.6, 0.6, 0.1, PALETTE.windowGlow)
  const wm = win.material as THREE.MeshLambertMaterial
  wm.emissive = new THREE.Color(PALETTE.windowGlow)
  wm.emissiveIntensity = 0.6
  win.position.set(-door.position.x * 0.6 - 0.7, h * 0.6, d / 2 + 0.05)
  win.userData.lamp = true
  g.add(win)

  if (rand() > 0.45) {
    const chimney = box(0.45, 1.3, 0.45, PALETTE.stoneDark)
    chimney.position.set(w * 0.28, h + roofH * 0.7, -d * 0.15)
    g.add(chimney)
    const smoke = new THREE.Mesh(
      new THREE.SphereGeometry(0.4, 8, 6),
      new THREE.MeshBasicMaterial({ color: PALETTE.cloud, transparent: true, opacity: 0.4, depthWrite: false }),
    )
    smoke.position.set(w * 0.28, h + roofH * 0.7 + 1.1, -d * 0.15)
    smoke.userData.smoke = { phase: rand() * 6.28, baseY: smoke.position.y }
    g.add(smoke)
  }
  return g
}

export function buildVillage(): THREE.Group {
  const g = new THREE.Group()
  g.name = 'village'
  const rand = makeRandom(9753)
  const { x: cx, z: cz, r } = ZONES.village

  for (let i = 0; i < 9; i++) {
    const a = (i / 9) * Math.PI * 2 + range(rand, -0.2, 0.2)
    const d = range(rand, r * 0.3, r * 0.95)
    const x = cx + Math.cos(a) * d
    const z = cz + Math.sin(a) * d
    const y = groundY(x, z)
    if (y < ISLAND.waterLevel + 0.6) continue
    const cottage = buildCottage(rand)
    place(cottage, x, y - 0.1, z)
    cottage.rotation.y = Math.atan2(cx - x, cz - z) + range(rand, -0.3, 0.3)
    g.add(cottage)
  }

  // 村口集市摊位
  for (let i = 0; i < 4; i++) {
    const a = range(rand, 0, Math.PI * 2)
    const d = range(rand, r * 0.15, r * 0.5)
    const x = cx + Math.cos(a) * d
    const z = cz + Math.sin(a) * d
    const y = groundY(x, z)
    if (y < ISLAND.waterLevel + 0.6) continue
    const stall = new THREE.Group()
    const counter = box(1.8, 0.16, 0.9, PALETTE.wood)
    counter.position.y = 0.85
    stall.add(counter)
    for (const sx of [-0.8, 0.8]) {
      for (const sz of [-0.35, 0.35]) {
        const leg = cyl(0.06, 0.06, 0.85, PALETTE.woodDark, 6)
        leg.position.set(sx, 0.42, sz)
        stall.add(leg)
      }
      const pole = cyl(0.07, 0.07, 2.1, PALETTE.woodDark, 6)
      pole.position.set(sx, 1.05, 0)
      stall.add(pole)
    }
    const canopy = box(2.1, 0.1, 1.2, i % 2 ? PALETTE.bannerRed : PALETTE.bannerBlue)
    canopy.position.y = 2.1
    canopy.rotation.z = 0.12
    stall.add(canopy)
    for (let k = 0; k < 4; k++) {
      const goods = sphere(0.14, pick(rand, [PALETTE.roseRed, PALETTE.wheat, PALETTE.flowerYellow, PALETTE.leaf]), 7)
      goods.position.set(range(rand, -0.7, 0.7), 1.0, range(rand, -0.3, 0.3))
      stall.add(goods)
    }
    place(stall, x, y, z)
    stall.rotation.y = rand() * Math.PI * 2
    g.add(stall)
  }

  // 村中水井
  const wx = cx + 1.5
  const wz = cz - 1.5
  const wy = groundY(wx, wz)
  const well = new THREE.Group()
  const base = cyl(0.85, 0.95, 0.9, PALETTE.stoneMid, 12)
  base.position.y = 0.45
  well.add(base)
  const water = cyl(0.72, 0.72, 0.06, PALETTE.waterDeep, 12)
  water.position.y = 0.82
  well.add(water)
  for (const sx of [-0.7, 0.7]) {
    const post = cyl(0.09, 0.09, 1.7, PALETTE.woodDeep, 7)
    post.position.set(sx, 1.6, 0)
    well.add(post)
  }
  const beam = cyl(0.09, 0.09, 1.6, PALETTE.woodDeep, 7)
  beam.rotation.z = Math.PI / 2
  beam.position.y = 2.4
  well.add(beam)
  const wellRoof = cone(1.25, 0.85, PALETTE.roofSlate, 4)
  wellRoof.rotation.y = Math.PI / 4
  wellRoof.position.y = 2.9
  well.add(wellRoof)
  const bucket = cyl(0.2, 0.17, 0.28, PALETTE.woodDark, 8)
  bucket.position.set(0, 1.7, 0)
  well.add(bucket)
  place(well, wx, wy, wz)
  g.add(well)

  return g
}

// ---------- 玫瑰园 ----------

export function buildRoseBush(rand: () => number, flowerColor: string): THREE.Group {
  const g = new THREE.Group()
  const bush = sphere(range(rand, 0.42, 0.62), PALETTE.hedge, 9)
  bush.position.y = 0.42
  bush.scale.y = 0.82
  g.add(bush)
  const blooms = 4 + Math.floor(rand() * 5)
  for (let i = 0; i < blooms; i++) {
    const a = rand() * Math.PI * 2
    const rr = range(rand, 0.2, 0.55)
    const f = sphere(0.11, flowerColor, 7)
    f.position.set(Math.cos(a) * rr, range(rand, 0.45, 0.85), Math.sin(a) * rr)
    g.add(f)
  }
  return g
}

export function buildRoseGarden(): THREE.Group {
  const g = new THREE.Group()
  g.name = 'rose-garden'
  const rand = makeRandom(6789)
  const { x: cx, z: cz, r } = ZONES.roseGarden
  const y = groundY(cx, cz)

  // 环形绿篱
  const hedge = new THREE.Mesh(
    new THREE.TorusGeometry(r * 0.92, 0.62, 8, 44),
    matte(PALETTE.hedge),
  )
  hedge.rotation.x = Math.PI / 2
  hedge.position.set(cx, y + 0.5, cz)
  hedge.castShadow = true
  hedge.receiveShadow = true
  g.add(hedge)

  // 内圈碎石小径
  const path = new THREE.Mesh(
    new THREE.RingGeometry(r * 0.3, r * 0.72, 40).rotateX(-Math.PI / 2),
    matte(PALETTE.sand),
  )
  path.position.set(cx, y + 0.06, cz)
  path.receiveShadow = true
  g.add(path)

  // 五千朵玫瑰（书里的意象）——用实例化画几百丛
  const colors = [PALETTE.roseRed, PALETTE.rosePink, PALETTE.roseWhite]
  const bushGeo = new THREE.SphereGeometry(0.42, 8, 6)
  const bloomGeo = new THREE.SphereGeometry(0.12, 6, 5)
  for (const col of colors) {
    const N = 90
    const bushes = new THREE.InstancedMesh(bushGeo, matte(PALETTE.hedge), N)
    const blooms = new THREE.InstancedMesh(bloomGeo, matte(col), N * 3)
    const m = new THREE.Matrix4()
    let bi = 0
    let fi = 0
    for (let i = 0; i < N; i++) {
      const a = rand() * Math.PI * 2
      const d = range(rand, r * 0.32, r * 0.86)
      const x = cx + Math.cos(a) * d
      const z = cz + Math.sin(a) * d
      const sc = range(rand, 0.75, 1.2)
      m.makeScale(sc, sc * 0.85, sc)
      m.setPosition(x, groundY(x, z) + 0.36 * sc, z)
      bushes.setMatrixAt(bi++, m)
      for (let k = 0; k < 3; k++) {
        const fa = rand() * Math.PI * 2
        const fd = range(rand, 0.1, 0.4) * sc
        m.makeScale(1, 1, 1)
        m.setPosition(x + Math.cos(fa) * fd, groundY(x, z) + range(rand, 0.5, 0.85) * sc, z + Math.sin(fa) * fd)
        blooms.setMatrixAt(fi++, m)
      }
    }
    bushes.count = bi
    blooms.count = fi
    bushes.castShadow = true
    bushes.receiveShadow = true
    g.add(bushes, blooms)
  }

  // 园中拱门
  const arch = new THREE.Group()
  for (const sx of [-1.5, 1.5]) {
    const post = cyl(0.16, 0.18, 3.0, PALETTE.woodDark, 8)
    post.position.set(sx, 1.5, 0)
    arch.add(post)
  }
  const top = torus(1.5, 0.15, PALETTE.woodDark, 8, 20)
  top.position.y = 3.0
  top.rotation.z = 0
  arch.add(top)
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI
    const f = sphere(0.14, PALETTE.rosePink, 7)
    f.position.set(Math.cos(a) * 1.5, 3.0 + Math.sin(a) * 1.5, 0)
    arch.add(f)
  }
  arch.position.set(cx, y, cz + r * 0.92)
  arch.rotation.y = Math.atan2(-cx, -cz)
  g.add(arch)

  return g
}

// ---------- 采石场与岩石 ----------

export function buildQuarry(): THREE.Group {
  const g = new THREE.Group()
  g.name = 'quarry'
  const rand = makeRandom(4321)
  const { x: cx, z: cz, r } = ZONES.quarry

  for (let i = 0; i < 16; i++) {
    const a = rand() * Math.PI * 2
    const d = Math.sqrt(rand()) * r
    const x = cx + Math.cos(a) * d
    const z = cz + Math.sin(a) * d
    const y = groundY(x, z)
    const size = range(rand, 0.7, 2.4)
    const rock = new THREE.Mesh(
      new THREE.DodecahedronGeometry(size, 0),
      matte(rand() > 0.5 ? PALETTE.rock : PALETTE.rockDark),
    )
    rock.position.set(x, y + size * 0.4, z)
    rock.rotation.set(rand() * 3, rand() * 3, rand() * 3)
    rock.scale.set(range(rand, 0.8, 1.3), range(rand, 0.6, 1.0), range(rand, 0.8, 1.3))
    rock.castShadow = true
    rock.receiveShadow = true
    g.add(rock)
  }

  // 已切好的石料堆
  for (let i = 0; i < 9; i++) {
    const x = cx + range(rand, -3, 3)
    const z = cz + range(rand, -3, 3)
    const y = groundY(x, z)
    const block = box(range(rand, 0.9, 1.5), 0.6, range(rand, 0.7, 1.1), PALETTE.stoneMid)
    block.position.set(x, y + 0.3, z)
    block.rotation.y = rand() * 0.6
    g.add(block)
  }

  // 吊臂
  const crane = new THREE.Group()
  const mast = cyl(0.2, 0.26, 5.2, PALETTE.woodDeep, 8)
  mast.position.y = 2.6
  crane.add(mast)
  const jib = box(4.2, 0.2, 0.2, PALETTE.woodDark)
  jib.position.set(1.6, 4.9, 0)
  jib.rotation.z = -0.16
  crane.add(jib)
  const rope = cyl(0.03, 0.03, 2.4, PALETTE.ironDark, 5)
  rope.position.set(3.4, 3.6, 0)
  crane.add(rope)
  const hookBlock = box(0.8, 0.5, 0.6, PALETTE.stone)
  hookBlock.position.set(3.4, 2.2, 0)
  crane.add(hookBlock)
  const kx = cx + 2
  const kz = cz - 3
  crane.position.set(kx, groundY(kx, kz), kz)
  crane.rotation.y = 0.8
  g.add(crane)

  return g
}

/** 岛缘散布的大石块，勾出悬崖轮廓。 */
export function buildRimRocks(): THREE.Group {
  const g = new THREE.Group()
  const rand = makeRandom(1122)
  for (let i = 0; i < 46; i++) {
    const a = rand() * Math.PI * 2
    const d = range(rand, ISLAND.radius * 0.8, ISLAND.radius * 0.99)
    const x = Math.cos(a) * d
    const z = Math.sin(a) * d
    const y = groundY(x, z)
    const size = range(rand, 0.5, 1.9)
    const rock = new THREE.Mesh(
      new THREE.DodecahedronGeometry(size, 0),
      matte(pick(rand, [PALETTE.rock, PALETTE.rockDark])),
    )
    rock.position.set(x, y + size * 0.3, z)
    rock.rotation.set(rand() * 3, rand() * 3, rand() * 3)
    rock.scale.y = range(rand, 0.55, 0.95)
    rock.castShadow = true
    rock.receiveShadow = true
    g.add(rock)
  }
  return g
}

// ---------- 草丛与野花 ----------

export function buildGroundDetails(): THREE.Group {
  const g = new THREE.Group()
  g.name = 'ground-details'
  const rand = makeRandom(777)

  // 草簇
  const tuftGeo = new THREE.ConeGeometry(0.16, 0.55, 4)
  tuftGeo.translate(0, 0.27, 0)
  const tufts = new THREE.InstancedMesh(tuftGeo, matte(PALETTE.grassDark), 2600)
  // 野花
  const flowerGeo = new THREE.SphereGeometry(0.1, 6, 5)
  const flowerColors = [PALETTE.flowerYellow, PALETTE.flowerBlue, PALETTE.flowerViolet, PALETTE.roseWhite]
  const stemGeo = new THREE.CylinderGeometry(0.02, 0.025, 0.34, 4)
  stemGeo.translate(0, 0.17, 0)
  const stems = new THREE.InstancedMesh(stemGeo, matte(PALETTE.grassDark), 900)
  const flowerMeshes = flowerColors.map((col) => new THREE.InstancedMesh(flowerGeo, matte(col), 260))

  const m = new THREE.Matrix4()
  const q = new THREE.Quaternion()
  const e = new THREE.Euler()
  const s = new THREE.Vector3()
  const p = new THREE.Vector3()
  const flowerCounts = [0, 0, 0, 0]

  let ti = 0
  let si = 0
  for (let i = 0; i < 9000 && ti < 2600; i++) {
    const a = rand() * Math.PI * 2
    const d = Math.sqrt(rand()) * ISLAND.radius * 0.97
    const x = Math.cos(a) * d
    const z = Math.sin(a) * d
    const y = groundY(x, z)
    if (y < ISLAND.waterLevel + 0.35) continue
    // 城堡高原与道路上少长草
    const r = Math.hypot(x, z)
    if (r < ISLAND.plateauRadius * 0.92 && y > 1.6) continue
    const inFarm = Math.hypot(x - ZONES.farm.x, z - ZONES.farm.z) < ZONES.farm.r * 0.95
    if (inFarm) continue

    const sc = range(rand, 0.6, 1.35)
    e.set(range(rand, -0.16, 0.16), rand() * Math.PI, range(rand, -0.16, 0.16))
    q.setFromEuler(e)
    s.set(sc, sc, sc)
    p.set(x, y, z)
    m.compose(p, q, s)
    tufts.setMatrixAt(ti++, m)

    if (rand() > 0.66 && si < 900) {
      m.compose(p, q, new THREE.Vector3(1, 1, 1))
      stems.setMatrixAt(si++, m)
      const ci = Math.floor(rand() * flowerColors.length) % flowerColors.length
      if (flowerCounts[ci] < 260) {
        p.set(x, y + 0.36, z)
        m.compose(p, q, new THREE.Vector3(1, 1, 1))
        flowerMeshes[ci].setMatrixAt(flowerCounts[ci]++, m)
      }
    }
  }

  tufts.count = ti
  stems.count = si
  tufts.instanceMatrix.needsUpdate = true
  stems.instanceMatrix.needsUpdate = true
  tufts.receiveShadow = true
  g.add(tufts, stems)
  flowerMeshes.forEach((fm, i) => {
    fm.count = flowerCounts[i]
    fm.instanceMatrix.needsUpdate = true
    g.add(fm)
  })

  // 猴面包树幼苗（书里的意象）
  for (let i = 0; i < 12; i++) {
    const a = rand() * Math.PI * 2
    const d = range(rand, ISLAND.radius * 0.35, ISLAND.radius * 0.9)
    const x = Math.cos(a) * d
    const z = Math.sin(a) * d
    const y = groundY(x, z)
    if (y < ISLAND.waterLevel + 0.5) continue
    const sap = buildBaobabSapling(rand)
    place(sap, x, y, z)
    sap.scale.setScalar(range(rand, 0.7, 1.3))
    g.add(sap)
  }

  // 岛缘零星小树
  for (let i = 0; i < 26; i++) {
    const a = rand() * Math.PI * 2
    const d = range(rand, ISLAND.radius * 0.6, ISLAND.radius * 0.94)
    const x = Math.cos(a) * d
    const z = Math.sin(a) * d
    const y = groundY(x, z)
    if (y < ISLAND.waterLevel + 0.6) continue
    if (Math.hypot(x - ZONES.forest.x, z - ZONES.forest.z) < ZONES.forest.r) continue
    const tree = rand() > 0.6 ? buildPine(rand, range(rand, 0.6, 1.0)) : buildTree(rand, range(rand, 0.55, 0.95), rand() > 0.6)
    place(tree, x, y - 0.1, z)
    g.add(tree)
  }

  return g
}

/** 石板路：从城门蜿蜒到村庄�� */
export function buildPaths(): THREE.Group {
  const g = new THREE.Group()
  g.name = 'paths'
  const rand = makeRandom(3344)

  const curves: THREE.Vector3[][] = [
    // 城门 → 村庄
    [
      new THREE.Vector3(0, 0, ISLAND.plateauRadius * 0.9),
      new THREE.Vector3(4, 0, 34),
      new THREE.Vector3(12, 0, 38),
      new THREE.Vector3(ZONES.village.x, 0, ZONES.village.z),
    ],
    // 城门 → 玫瑰园
    [
      new THREE.Vector3(6, 0, ISLAND.plateauRadius * 0.8),
      new THREE.Vector3(20, 0, 26),
      new THREE.Vector3(ZONES.roseGarden.x, 0, ZONES.roseGarden.z),
    ],
    // 城门 → 农田
    [
      new THREE.Vector3(-8, 0, ISLAND.plateauRadius * 0.8),
      new THREE.Vector3(-20, 0, 20),
      new THREE.Vector3(-26, 0, 4),
      new THREE.Vector3(ZONES.farm.x + 6, 0, ZONES.farm.z + 6),
    ],
    // 村庄 → 湖
    [
      new THREE.Vector3(ZONES.village.x - 6, 0, ZONES.village.z - 4),
      new THREE.Vector3(-8, 0, 34),
      new THREE.Vector3(-26, 0, 30),
      new THREE.Vector3(ZONES.lake.x + 10, 0, ZONES.lake.z + 6),
    ],
  ]

  const stoneGeo = new THREE.CylinderGeometry(0.52, 0.58, 0.14, 7)
  const stoneMat = matte(PALETTE.stoneMid)
  const all: THREE.Matrix4[] = []
  const m = new THREE.Matrix4()
  const q = new THREE.Quaternion()
  const e = new THREE.Euler()

  for (const pts of curves) {
    const pathPts = pts.map((p) => new THREE.Vector3(p.x, groundY(p.x, p.z) + 0.08, p.z))
    const curve = new THREE.CatmullRomCurve3(pathPts)
    const n = Math.floor(curve.getLength() / 1.15)
    for (let i = 0; i <= n; i++) {
      const t = i / n
      const p = curve.getPoint(t)
      const tan = curve.getTangent(t)
      const side = new THREE.Vector3(-tan.z, 0, tan.x).normalize()
      for (const off of [-0.55, 0.55]) {
        const jitter = range(rand, -0.14, 0.14)
        const x = p.x + side.x * (off + jitter)
        const z = p.z + side.z * (off + jitter)
        const y = groundY(x, z) + 0.07
        if (y < ISLAND.waterLevel + 0.3) continue
        const sc = range(rand, 0.78, 1.12)
        e.set(0, rand() * Math.PI, 0)
        q.setFromEuler(e)
        m.compose(new THREE.Vector3(x, y, z), q, new THREE.Vector3(sc, 1, sc))
        all.push(m.clone())
      }
    }
  }

  const stones = new THREE.InstancedMesh(stoneGeo, stoneMat, all.length)
  all.forEach((mat, i) => stones.setMatrixAt(i, mat))
  stones.instanceMatrix.needsUpdate = true
  stones.receiveShadow = true
  stones.castShadow = false
  g.add(stones)

  // 路灯（点灯人负责点亮的那些）
  const lampPositions: THREE.Vector3[] = []
  for (const pts of curves) {
    const pathPts = pts.map((p) => new THREE.Vector3(p.x, groundY(p.x, p.z), p.z))
    const curve = new THREE.CatmullRomCurve3(pathPts)
    const n = Math.max(2, Math.floor(curve.getLength() / 16))
    for (let i = 1; i < n; i++) {
      const p = curve.getPoint(i / n)
      const tan = curve.getTangent(i / n)
      const side = new THREE.Vector3(-tan.z, 0, tan.x).normalize()
      lampPositions.push(new THREE.Vector3(p.x + side.x * 1.9, 0, p.z + side.z * 1.9))
    }
  }
  for (const lp of lampPositions) {
    const y = groundY(lp.x, lp.z)
    if (y < ISLAND.waterLevel + 0.4) continue
    const post = cyl(0.09, 0.12, 2.6, PALETTE.ironDark, 8)
    post.position.set(lp.x, y + 1.3, lp.z)
    g.add(post)
    const arm = cyl(0.05, 0.05, 0.6, PALETTE.ironDark, 6)
    arm.rotation.z = Math.PI / 2
    arm.position.set(lp.x + 0.25, y + 2.5, lp.z)
    g.add(arm)
    const lampHead = box(0.36, 0.44, 0.36, PALETTE.lantern)
    const lm = lampHead.material as THREE.MeshLambertMaterial
    lm.emissive = new THREE.Color(PALETTE.lantern)
    lm.emissiveIntensity = 0.95
    lampHead.position.set(lp.x + 0.5, y + 2.32, lp.z)
    lampHead.userData.lamp = true
    g.add(lampHead)
    const capL = cone(0.3, 0.24, PALETTE.ironDark, 4)
    capL.rotation.y = Math.PI / 4
    capL.position.set(lp.x + 0.5, y + 2.66, lp.z)
    g.add(capL)
  }

  return g
}

/** 汇总所有地形要素。 */
export function buildTerrain(): THREE.Group {
  const g = new THREE.Group()
  g.name = 'terrain'
  g.add(buildLake())
  g.add(buildWaterfall())
  g.add(buildForest())
  g.add(buildFarmland())
  g.add(buildVillage())
  g.add(buildRoseGarden())
  g.add(buildQuarry())
  g.add(buildRimRocks())
  g.add(buildPaths())
  g.add(buildGroundDetails())
  return g
}

export { smoothstep, fbm2 }
