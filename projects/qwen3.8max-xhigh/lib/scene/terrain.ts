import * as THREE from 'three'
import { C } from './palette'
import {
  BRIDGE_CENTER,
  ISLAND_RADIUS,
  POND_CENTER,
  POND_RADIUS,
  STREAM_POINTS,
  groundAt,
  islandSurfaceHeight,
} from './island'
import { WALL_RADIUS } from './layout'
import {
  Batcher,
  conicalRoofGeometry,
  mulberry32,
  roundedBoxGeometry,
  toonMaterial,
  waterTexture,
} from './utils'

/* ------------------------------------------------------------------ */
/* 落位管理：避免物体互相重叠、掉进池塘或压在城墙上                        */
/* ------------------------------------------------------------------ */

type Occupied = { x: number; z: number; r: number }

class Field {
  private taken: Occupied[] = []

  reserve(x: number, z: number, r: number) {
    this.taken.push({ x, z, r })
    return this
  }

  private free(x: number, z: number, clearance: number) {
    if (islandSurfaceHeight(x, z) === null) return false
    const r = Math.hypot(x, z)
    if (r < WALL_RADIUS + 3.2 || r > ISLAND_RADIUS - 2.4) return false
    for (const t of this.taken) {
      if (Math.hypot(x - t.x, z - t.z) < t.r + clearance) return false
    }
    return true
  }

  /** 在环带上找一个空位，找不到返回 null。 */
  find(
    random: () => number,
    minR: number,
    maxR: number,
    clearance = 1.6,
    angleRange?: [number, number],
    tries = 40,
  ): { x: number; z: number; y: number } | null {
    for (let i = 0; i < tries; i++) {
      const a = angleRange
        ? angleRange[0] + random() * (angleRange[1] - angleRange[0])
        : random() * Math.PI * 2
      const r = minR + random() * (maxR - minR)
      const x = Math.cos(a) * r
      const z = Math.sin(a) * r
      if (this.free(x, z, clearance)) {
        this.taken.push({ x, z, r: clearance })
        return { x, z, y: groundAt(x, z) }
      }
    }
    return null
  }
}

/* ------------------------------------------------------------------ */
/* 水体                                                                */
/* ------------------------------------------------------------------ */

function buildPond(): { mesh: THREE.Mesh; update: (t: number) => void; waterY: number } {
  const waterY = groundAt(POND_CENTER.x, POND_CENTER.y) + 1.0
  const geo = new THREE.CircleGeometry(POND_RADIUS * 0.94, 44, 0, Math.PI * 2)
  geo.rotateX(-Math.PI / 2)
  const base = (geo.getAttribute('position') as THREE.BufferAttribute).array.slice() as Float32Array
  const tex = waterTexture()
  const mat = new THREE.MeshToonMaterial({
    color: new THREE.Color(C.water),
    map: tex,
    transparent: true,
    opacity: 0.86,
  })
  const mesh = new THREE.Mesh(geo, mat)
  mesh.position.set(POND_CENTER.x, waterY, POND_CENTER.y)
  mesh.receiveShadow = true

  return {
    mesh,
    waterY,
    update(t) {
      const pos = geo.getAttribute('position') as THREE.BufferAttribute
      for (let i = 0; i < pos.count; i++) {
        const x = base[i * 3]
        const z = base[i * 3 + 2]
        pos.setY(i, Math.sin(x * 0.85 + t * 1.3) * 0.055 + Math.cos(z * 0.7 - t * 1.05) * 0.05)
      }
      pos.needsUpdate = true
      tex.offset.x = t * 0.012
      tex.offset.y = t * 0.008
    },
  }
}

/** 沿溪流中心线生成一条起伏的水带。 */
function buildStream(): { mesh: THREE.Mesh; update: (t: number) => void } {
  const samples = 90
  const width = 1.5
  const positions: number[] = []
  const uvs: number[] = []
  const indices: number[] = []
  const tex = waterTexture()
  tex.repeat.set(1, 9)

  const pts: THREE.Vector3[] = []
  const curve = new THREE.SplineCurve(STREAM_POINTS)
  for (let i = 0; i <= samples; i++) {
    const t = i / samples
    const p = curve.getPoint(t)
    const tan = curve.getTangent(t)
    const nx = -tan.y
    const nz = tan.x
    const len = Math.hypot(nx, nz) || 1
    const y = groundAt(p.x, p.y) + 0.62
    const w = width * (0.72 + 0.4 * Math.sin(t * 7.3)) * (0.6 + t * 0.7)
    pts.push(new THREE.Vector3(p.x, y, p.y))
    positions.push(p.x + (nx / len) * w, y, p.y + (nz / len) * w)
    positions.push(p.x - (nx / len) * w, y, p.y - (nz / len) * w)
    uvs.push(0, t * 9, 1, t * 9)
    if (i < samples) {
      const a = i * 2
      indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2)
    }
  }

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))
  geo.setIndex(indices)
  geo.computeVertexNormals()
  const mat = new THREE.MeshToonMaterial({
    color: new THREE.Color(C.water),
    map: tex,
    transparent: true,
    opacity: 0.84,
    side: THREE.DoubleSide,
  })
  const mesh = new THREE.Mesh(geo, mat)
  void pts
  return {
    mesh,
    update(t) {
      tex.offset.y = -t * 0.16
    },
  }
}

/* ------------------------------------------------------------------ */
/* 石桥与道路                                                          */
/* ------------------------------------------------------------------ */

function buildBridge(batch: Batcher) {
  const y = groundAt(BRIDGE_CENTER.x, BRIDGE_CENTER.y)
  const dir = new THREE.Vector2(
    STREAM_POINTS[4].x - STREAM_POINTS[3].x,
    STREAM_POINTS[4].y - STREAM_POINTS[3].y,
  ).normalize()
  // 桥面长轴垂直于水流，与城门大道同向
  const theta = Math.atan2(dir.x, dir.y) + Math.PI / 2
  const cosT = Math.cos(theta)
  const sinT = Math.sin(theta)
  const span = 5.6
  const deckW = 3.0
  const cx = BRIDGE_CENTER.x
  const cz = BRIDGE_CENTER.y
  /** 把桥面局部坐标 (lx, lz) 换算到世界坐标。 */
  const toWorld = (lx: number, lz: number) => ({
    x: cx + lx * cosT + lz * sinT,
    z: cz - lx * sinT + lz * cosT,
  })

  batch.add(roundedBoxGeometry(deckW, 0.42, span, 0.1, 2), C.stoneShade, {
    position: [cx, y + 1.05, cz],
    rotation: [0, theta, 0],
  })

  // 两端的拱券，跨在溪流上方
  for (const lz of [-1, 1]) {
    const p = toWorld(0, lz * (span / 2 - 0.45))
    batch.add(new THREE.TorusGeometry(1.45, 0.32, 6, 14, Math.PI), C.stone, {
      position: [p.x, y + 0.5, p.z],
      rotation: [0, theta, 0],
      scale: [1, 1, 0.55],
    })
  }

  // 栏杆立柱与压顶
  for (const side of [-1, 1]) {
    for (let i = -2; i <= 2; i++) {
      const p = toWorld(side * (deckW / 2 - 0.18), (i / 2) * (span / 2 - 0.4))
      batch.add(roundedBoxGeometry(0.26, 0.95, 0.26, 0.05, 2), C.stone, {
        position: [p.x, y + 1.7, p.z],
        rotation: [0, theta, 0],
      })
    }
    const rail = toWorld(side * (deckW / 2 - 0.18), 0)
    batch.add(roundedBoxGeometry(0.2, 0.2, span, 0.05, 2), C.stoneLight, {
      position: [rail.x, y + 2.12, rail.z],
      rotation: [0, theta, 0],
    })
  }

  // 桥头灯柱
  for (const side of [-1, 1]) {
    const p = toWorld(side * (deckW / 2 + 0.55), 0)
    batch.add(new THREE.CylinderGeometry(0.11, 0.15, 2.6, 6), C.woodDark, { position: [p.x, y + 2.3, p.z] })
    batch.add(roundedBoxGeometry(0.44, 0.5, 0.44, 0.08, 2), C.gold, { position: [p.x, y + 3.75, p.z] })
    batch.add(conicalRoofGeometry(0.36, 0.4, 4), C.roofDeep, { position: [p.x, y + 4.2, p.z] })
  }
}

function layPath(batch: Batcher, points: THREE.Vector2[], slab = 1.05, width = 2.2, random = Math.random) {
  const curve = new THREE.SplineCurve(points)
  const total = curve.getLength()
  const steps = Math.max(4, Math.floor(total / slab))
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const p = curve.getPoint(t)
    const tan = curve.getTangent(t)
    const angle = Math.atan2(tan.x, tan.y)
    const y = groundAt(p.x, p.y)
    const jitter = (random() - 0.5) * 0.35
    const nx = -tan.y
    const nz = tan.x
    batch.add(
      roundedBoxGeometry(width * (0.82 + random() * 0.3), 0.16, slab * (0.8 + random() * 0.35), 0.05, 1),
      random() > 0.62 ? C.stoneLight : C.stoneCool,
      {
        position: [p.x + nx * jitter, y + 0.09, p.y + nz * jitter],
        rotation: [0, angle + (random() - 0.5) * 0.22, 0],
      },
    )
  }
}

/* ------------------------------------------------------------------ */
/* 植物                                                                */
/* ------------------------------------------------------------------ */

type TreeKind = 'round' | 'gold' | 'cypress' | 'pine' | 'blossom'

function addTree(batch: Batcher, kind: TreeKind, x: number, y: number, z: number, scale: number, random: () => number) {
  const trunkH = (kind === 'cypress' ? 2.2 : 1.7) * scale
  batch.add(new THREE.CylinderGeometry(0.17 * scale, 0.28 * scale, trunkH, 6), C.trunk, {
    position: [x, y + trunkH / 2, z],
    rotation: [0, random() * 3, (random() - 0.5) * 0.08],
  })

  if (kind === 'cypress') {
    for (let i = 0; i < 3; i++) {
      const t = i / 3
      batch.add(
        new THREE.ConeGeometry((1.15 - t * 0.3) * scale, 2.1 * scale, 7),
        i % 2 ? C.leafDeep : C.leaf,
        { position: [x, y + trunkH + 0.7 * scale + t * 1.5 * scale, z] },
      )
    }
    return
  }

  if (kind === 'pine') {
    for (let i = 0; i < 3; i++) {
      const t = i / 3
      batch.add(
        new THREE.ConeGeometry((1.7 - t * 0.45) * scale, 1.7 * scale, 8),
        i % 2 ? C.leafDeep : C.leaf,
        { position: [x, y + trunkH + 0.5 * scale + t * 1.25 * scale, z] },
      )
    }
    return
  }

  const canopyColor = kind === 'gold' ? C.leafGold : kind === 'blossom' ? C.leafRose : C.leaf
  const altColor = kind === 'gold' ? C.gold : kind === 'blossom' ? C.clothCream : C.leafDeep
  const blobs = kind === 'gold' ? 5 : 4
  for (let i = 0; i < blobs; i++) {
    const a = (i / blobs) * Math.PI * 2 + random()
    const rr = (0.55 + random() * 0.4) * scale
    const size = (1.05 + random() * 0.55) * scale
    batch.add(new THREE.IcosahedronGeometry(size, 1), i % 2 ? canopyColor : altColor, {
      position: [
        x + Math.cos(a) * rr,
        y + trunkH + (0.75 + random() * 0.6) * scale,
        z + Math.sin(a) * rr,
      ],
      rotation: [random(), random(), random()],
      scale: [1, 0.86, 1],
    })
  }
}

function addBush(batch: Batcher, x: number, y: number, z: number, scale: number, random: () => number) {
  const blobs = 2 + Math.floor(random() * 2)
  for (let i = 0; i < blobs; i++) {
    batch.add(
      new THREE.IcosahedronGeometry((0.5 + random() * 0.35) * scale, 0),
      random() > 0.5 ? C.leafDeep : C.leaf,
      {
        position: [x + (random() - 0.5) * scale, y + 0.35 * scale, z + (random() - 0.5) * scale],
        rotation: [random(), random(), random()],
        scale: [1, 0.8, 1],
      },
    )
  }
}

const FLOWER_PALETTE = [C.clothRed, C.gold, C.clothCream, C.leafRose, C.clothBlue] as number[]

function addFlower(batch: Batcher, x: number, y: number, z: number, random: () => number, color?: number) {
  const h = 0.32 + random() * 0.34
  batch.add(new THREE.CylinderGeometry(0.022, 0.03, h, 3), C.grassDeep, { position: [x, y + h / 2, z] })
  const bloom = color ?? FLOWER_PALETTE[Math.floor(random() * FLOWER_PALETTE.length)]
  batch.add(new THREE.IcosahedronGeometry(0.1 + random() * 0.07, 0), bloom, {
    position: [x, y + h + 0.05, z],
  })
}

function addGrassTuft(batch: Batcher, x: number, y: number, z: number, random: () => number) {
  const blades = 3
  for (let i = 0; i < blades; i++) {
    const h = 0.3 + random() * 0.42
    batch.add(new THREE.ConeGeometry(0.055, h, 3), random() > 0.72 ? C.grassLight : C.grass, {
      position: [x + (random() - 0.5) * 0.22, y + h / 2, z + (random() - 0.5) * 0.22],
      rotation: [(random() - 0.5) * 0.4, random() * 3, (random() - 0.5) * 0.4],
    })
  }
}

/* ------------------------------------------------------------------ */
/* 玫瑰园（小王子的玫瑰）                                                */
/* ------------------------------------------------------------------ */

export const ROSE_GARDEN = new THREE.Vector2(4.5, -20.5)

function buildRoseGarden(batch: Batcher, glassBatch: Batcher, random: () => number) {
  const cx = ROSE_GARDEN.x
  const cz = ROSE_GARDEN.y
  const cy = groundAt(cx, cz)

  // 圆形石砌花坛
  for (let i = 0; i < 22; i++) {
    const a = (i / 22) * Math.PI * 2
    batch.add(roundedBoxGeometry(0.62, 0.5, 0.42, 0.07, 1), i % 2 ? C.stone : C.stoneShade, {
      position: [cx + Math.cos(a) * 3.5, cy + 0.24, cz + Math.sin(a) * 3.5],
      rotation: [0, -a, 0],
    })
  }
  batch.add(new THREE.CylinderGeometry(3.4, 3.4, 0.22, 24), C.dirt, { position: [cx, cy + 0.12, cz] })

  // 四株普通的玫瑰
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + 0.4
    const rx = cx + Math.cos(a) * 2.1
    const rz = cz + Math.sin(a) * 2.1
    addRose(batch, rx, cy + 0.2, rz, random, false)
  }

  // 玻璃罩下的那一朵
  addRose(batch, cx, cy + 0.2, cz, random, true)
  glassBatch.add(new THREE.SphereGeometry(1.05, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2), 0xffffff, {
    position: [cx, cy + 0.22, cz],
  })
  glassBatch.add(new THREE.CylinderGeometry(1.08, 1.12, 0.16, 16), C.gold, { position: [cx, cy + 0.26, cz] })

  // 园边的小石凳
  batch.add(roundedBoxGeometry(1.7, 0.22, 0.6, 0.06, 2), C.stoneLight, {
    position: [cx + 4.4, cy + 0.55, cz + 0.6],
    rotation: [0, 0.4, 0],
  })
  for (const s of [-1, 1]) {
    batch.add(roundedBoxGeometry(0.3, 0.55, 0.5, 0.05, 1), C.stone, {
      position: [cx + 4.4 + s * 0.62, cy + 0.28, cz + 0.6 - s * 0.1],
      rotation: [0, 0.4, 0],
    })
  }
}

function addRose(batch: Batcher, x: number, y: number, z: number, random: () => number, special: boolean) {
  const h = special ? 1.15 : 0.75 + random() * 0.35
  batch.add(new THREE.CylinderGeometry(0.035, 0.05, h, 5), C.leafDeep, {
    position: [x, y + h / 2, z],
    rotation: [0, 0, (random() - 0.5) * 0.12],
  })
  for (let i = 0; i < 3; i++) {
    const t = 0.3 + i * 0.22
    batch.add(new THREE.SphereGeometry(0.13, 6, 4), C.leaf, {
      position: [x + (i % 2 ? 0.14 : -0.14), y + h * t, z],
      scale: [1, 0.4, 0.7],
      rotation: [0, random() * 3, 0],
    })
  }
  // 四根刺（书里玫瑰说自己有四根刺）
  if (special) {
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2
      batch.add(new THREE.ConeGeometry(0.035, 0.16, 3), C.gold, {
        position: [x + Math.cos(a) * 0.06, y + h * 0.45, z + Math.sin(a) * 0.06],
        rotation: [Math.PI / 2, 0, -a],
      })
    }
  }
  const bloom = special ? C.clothRed : random() > 0.5 ? C.clothRed : C.leafRose
  batch.add(new THREE.SphereGeometry(special ? 0.26 : 0.19, 8, 6), bloom, {
    position: [x, y + h + 0.1, z],
    scale: [1, 0.85, 1],
  })
  batch.add(new THREE.SphereGeometry(special ? 0.14 : 0.1, 6, 5), C.gold, {
    position: [x, y + h + 0.2, z],
  })
}

/* ------------------------------------------------------------------ */
/* 风车、秋千、篝火                                                    */
/* ------------------------------------------------------------------ */

export const WINDMILL_POS = new THREE.Vector2(19.5, -9.5)

function buildWindmill(batch: Batcher): { sails: THREE.Group; y: number } {
  const x = WINDMILL_POS.x
  const z = WINDMILL_POS.y
  const y = groundAt(x, z)
  const h = 7.4

  batch.add(new THREE.CylinderGeometry(1.5, 2.3, h, 12), C.stone, { position: [x, y + h / 2, z] })
  for (let i = 0; i < 3; i++) {
    batch.add(new THREE.TorusGeometry(1.62 - i * 0.1, 0.1, 4, 14), C.stoneShade, {
      position: [x, y + 1.6 + i * 2.2, z],
      rotation: [Math.PI / 2, 0, 0],
    })
  }
  batch.add(conicalRoofGeometry(1.85, 2.1, 10), C.roofRose, { position: [x, y + h + 1.0, z] })
  batch.add(new THREE.SphereGeometry(0.22, 8, 6), C.gold, { position: [x, y + h + 2.15, z] })
  // 门与小窗
  batch.add(roundedBoxGeometry(0.9, 1.5, 0.2, 0.3, 2), C.woodDark, {
    position: [x, y + 0.78, z + 2.16],
  })
  batch.add(roundedBoxGeometry(0.5, 0.6, 0.2, 0.1, 2), C.windowGlow, {
    position: [x, y + 4.2, z + 1.62],
  })
  // 小平台
  batch.add(new THREE.CylinderGeometry(2.7, 2.7, 0.18, 14), C.woodDark, { position: [x, y + 3.1, z] })
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2
    batch.add(roundedBoxGeometry(0.12, 0.7, 0.12, 0.03, 1), C.wood, {
      position: [x + Math.cos(a) * 2.6, y + 3.5, z + Math.sin(a) * 2.6],
    })
  }

  const sails = new THREE.Group()
  sails.position.set(x, y + h + 0.5, z + 1.75)
  const sailBatch = new Batcher()
  sailBatch.add(new THREE.CylinderGeometry(0.34, 0.34, 0.7, 8), C.woodDark, { rotation: [Math.PI / 2, 0, 0] })
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2
    const armLen = 5.0
    sailBatch.add(roundedBoxGeometry(0.22, armLen, 0.22, 0.05, 1), C.wood, {
      position: [Math.cos(a) * (armLen / 2), Math.sin(a) * (armLen / 2), 0.1],
      rotation: [0, 0, a - Math.PI / 2],
    })
    sailBatch.add(roundedBoxGeometry(1.15, armLen * 0.72, 0.07, 0.03, 1), C.clothCream, {
      position: [Math.cos(a) * (armLen * 0.58) - Math.sin(a) * 0.62, Math.sin(a) * (armLen * 0.58) + Math.cos(a) * 0.62, 0.24],
      rotation: [0, 0, a - Math.PI / 2],
    })
  }
  const sailMesh = sailBatch.build(toonMaterial({ flatShading: true }))
  if (sailMesh) {
    sailMesh.castShadow = true
    sails.add(sailMesh)
  }
  return { sails, y }
}

function buildSwing(batch: Batcher, random: () => number): { seat: THREE.Group } | null {
  const spot = { x: -21.5, z: -6.5 }
  const y = groundAt(spot.x, spot.z)
  if (islandSurfaceHeight(spot.x, spot.z) === null) return null
  const h = 5.2
  // 大树
  addTree(batch, 'round', spot.x, y, spot.z, 1.7, random)
  const branchY = y + h * 0.84
  const seat = new THREE.Group()
  seat.position.set(spot.x + 1.9, branchY, spot.z)
  const ropeLen = 2.6
  const sb = new Batcher()
  for (const s of [-1, 1]) {
    sb.add(new THREE.CylinderGeometry(0.035, 0.035, ropeLen, 4), C.woodDark, {
      position: [s * 0.42, -ropeLen / 2, 0],
    })
  }
  sb.add(roundedBoxGeometry(1.15, 0.12, 0.42, 0.04, 1), C.wood, { position: [0, -ropeLen, 0] })
  const mesh = sb.build(toonMaterial({}))
  if (mesh) seat.add(mesh)
  return { seat }
}

export const CAMPFIRE_POS = new THREE.Vector2(-8.5, 22.5)

function buildCampfire(batch: Batcher): { flames: THREE.Group; light: THREE.PointLight } {
  const x = CAMPFIRE_POS.x
  const z = CAMPFIRE_POS.y
  const y = groundAt(x, z)
  for (let i = 0; i < 9; i++) {
    const a = (i / 9) * Math.PI * 2
    batch.add(new THREE.DodecahedronGeometry(0.3 + (i % 3) * 0.08, 0), C.rockLight, {
      position: [x + Math.cos(a) * 1.15, y + 0.16, z + Math.sin(a) * 1.15],
      rotation: [Math.random(), Math.random(), Math.random()],
    })
  }
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2
    batch.add(new THREE.CylinderGeometry(0.11, 0.13, 1.5, 5), C.woodDark, {
      position: [x + Math.cos(a) * 0.2, y + 0.4, z + Math.sin(a) * 0.2],
      rotation: [Math.cos(a) * 0.5, 0, Math.sin(a) * 0.5],
    })
  }
  // 围坐的原木
  for (const s of [-1, 1]) {
    batch.add(new THREE.CylinderGeometry(0.28, 0.28, 2.0, 7), C.trunk, {
      position: [x + s * 2.3, y + 0.3, z + s * 0.4],
      rotation: [0, 0, Math.PI / 2],
    })
  }

  const flames = new THREE.Group()
  flames.position.set(x, y + 0.45, z)
  const light = new THREE.PointLight(C.fireGlow, 6, 16, 2)
  light.position.set(x, y + 1.2, z)
  return { flames, light }
}

/* ------------------------------------------------------------------ */
/* 麦田、篱笆、岩石                                                     */
/* ------------------------------------------------------------------ */

export const WHEAT_FIELD = new THREE.Vector2(21.5, 6.5)

function buildWheatField(batch: Batcher, random: () => number) {
  const cx = WHEAT_FIELD.x
  const cz = WHEAT_FIELD.y
  for (let i = 0; i < 460; i++) {
    const a = random() * Math.PI * 2
    const r = Math.sqrt(random()) * 5.4
    const x = cx + Math.cos(a) * r
    const z = cz + Math.sin(a) * r * 0.82
    if (islandSurfaceHeight(x, z) === null) continue
    const y = groundAt(x, z)
    const h = 0.7 + random() * 0.5
    batch.add(new THREE.CylinderGeometry(0.022, 0.035, h, 3), C.grassDry, {
      position: [x, y + h / 2, z],
      rotation: [(random() - 0.5) * 0.22, random() * 3, (random() - 0.5) * 0.22],
    })
    batch.add(new THREE.ConeGeometry(0.075, 0.3, 4), C.gold, {
      position: [x, y + h + 0.12, z],
      rotation: [(random() - 0.5) * 0.22, random() * 3, (random() - 0.5) * 0.22],
    })
  }
  // 田边的木栅栏
  for (let i = 0; i < 20; i++) {
    const a = (i / 20) * Math.PI * 2
    const x = cx + Math.cos(a) * 6.1
    const z = cz + Math.sin(a) * 5.0
    if (islandSurfaceHeight(x, z) === null) continue
    const y = groundAt(x, z)
    batch.add(roundedBoxGeometry(0.13, 0.95, 0.13, 0.03, 1), C.wood, { position: [x, y + 0.48, z] })
    const a2 = ((i + 1) / 20) * Math.PI * 2
    const mx = cx + Math.cos((a + a2) / 2) * 6.1
    const mz = cz + Math.sin((a + a2) / 2) * 5.0
    const my = groundAt(mx, mz)
    const len = Math.hypot(mx - x, mz - z)
    batch.add(roundedBoxGeometry(0.08, 0.09, len, 0.02, 1), C.woodLight, {
      position: [(x + mx) / 2, (y + my) / 2 + 0.72, (z + mz) / 2],
      rotation: [0, Math.atan2(mx - x, mz - z), 0],
    })
  }
  // 稻草人
  const sx = cx - 1.2
  const sz = cz + 0.8
  const sy = groundAt(sx, sz)
  batch.add(new THREE.CylinderGeometry(0.09, 0.11, 2.5, 6), C.woodDark, { position: [sx, sy + 1.25, sz] })
  batch.add(roundedBoxGeometry(1.7, 0.11, 0.11, 0.03, 1), C.woodDark, { position: [sx, sy + 1.85, sz] })
  batch.add(roundedBoxGeometry(0.72, 0.85, 0.42, 0.12, 2), C.clothRed, { position: [sx, sy + 1.5, sz] })
  batch.add(new THREE.SphereGeometry(0.3, 8, 6), C.grassDry, { position: [sx, sy + 2.15, sz] })
  batch.add(conicalRoofGeometry(0.42, 0.42, 8), C.roofDeep, { position: [sx, sy + 2.5, sz] })
}

/* ------------------------------------------------------------------ */
/* 主模块                                                              */
/* ------------------------------------------------------------------ */

export type TerrainHandle = {
  group: THREE.Group
  update: (time: number, delta: number) => void
  setNight: (amount: number) => void
  field: Field
}

export function createTerrain(): TerrainHandle {
  const random = mulberry32(778899)
  const group = new THREE.Group()
  group.name = 'terrain'

  const field = new Field()
  // 预先占位：池塘、溪流、风车、玫瑰园、麦田、篝火、桥
  field
    .reserve(POND_CENTER.x, POND_CENTER.y, POND_RADIUS + 2)
    .reserve(WINDMILL_POS.x, WINDMILL_POS.y, 5)
    .reserve(ROSE_GARDEN.x, ROSE_GARDEN.y, 6)
    .reserve(WHEAT_FIELD.x, WHEAT_FIELD.y, 7.5)
    .reserve(CAMPFIRE_POS.x, CAMPFIRE_POS.y, 4)
    .reserve(BRIDGE_CENTER.x, BRIDGE_CENTER.y, 4)
    .reserve(-21.5, -6.5, 4)
  for (const p of STREAM_POINTS) field.reserve(p.x, p.y, 2.6)
  for (let i = 0; i <= 24; i++) {
    const t = i / 24
    field.reserve(t * 1.2, WALL_RADIUS + 2 + t * 11, 2.4)
  }

  const mat = toonMaterial({})
  const batch = new Batcher()
  const glassBatch = new Batcher()

  /* 道路 */
  layPath(
    batch,
    [
      new THREE.Vector2(0, WALL_RADIUS + 1.5),
      new THREE.Vector2(0.4, WALL_RADIUS + 6),
      new THREE.Vector2(BRIDGE_CENTER.x, BRIDGE_CENTER.y),
      new THREE.Vector2(3.2, 24.5),
      new THREE.Vector2(4.6, 27.2),
    ],
    1.0,
    2.4,
    random,
  )
  layPath(
    batch,
    [
      new THREE.Vector2(BRIDGE_CENTER.x, BRIDGE_CENTER.y),
      new THREE.Vector2(-4.5, 19.6),
      new THREE.Vector2(-10.5, 18.2),
      new THREE.Vector2(-15.2, 16.2),
      new THREE.Vector2(POND_CENTER.x + 3.4, POND_CENTER.y + 3.2),
    ],
    0.9,
    1.7,
    random,
  )
  layPath(
    batch,
    [
      new THREE.Vector2(WALL_RADIUS * 0.72, -WALL_RADIUS * 0.72),
      new THREE.Vector2(15.5, -12.5),
      new THREE.Vector2(18.2, -10.6),
      new THREE.Vector2(WINDMILL_POS.x - 1.6, WINDMILL_POS.y + 2.2),
    ],
    0.85,
    1.6,
    random,
  )
  layPath(
    batch,
    [
      new THREE.Vector2(-WALL_RADIUS * 0.8, -WALL_RADIUS * 0.62),
      new THREE.Vector2(-16.5, -13.5),
      new THREE.Vector2(-13.5, -18.5),
      new THREE.Vector2(-4.5, -20.5),
      new THREE.Vector2(ROSE_GARDEN.x - 3.6, ROSE_GARDEN.y + 0.6),
    ],
    0.85,
    1.6,
    random,
  )

  /* 石桥 */
  buildBridge(batch)

  /* 玫瑰园 */
  buildRoseGarden(batch, glassBatch, random)

  /* 风车 */
  const windmill = buildWindmill(batch)

  /* 麦田 */
  buildWheatField(batch, random)

  /* 篝火 */
  const campfire = buildCampfire(batch)

  /* 秋千 */
  const swing = buildSwing(batch, random)

  /* 池塘边的小木码头 */
  {
    const a = Math.atan2(POND_CENTER.y, POND_CENTER.x) + 2.2
    const px = POND_CENTER.x + Math.cos(a) * (POND_RADIUS - 0.6)
    const pz = POND_CENTER.y + Math.sin(a) * (POND_RADIUS - 0.6)
    const py = groundAt(px, pz)
    batch.add(roundedBoxGeometry(1.5, 0.16, 3.4, 0.04, 1), C.wood, {
      position: [px, py + 0.85, pz],
      rotation: [0, a + Math.PI / 2, 0],
    })
    for (const s of [-1, 1]) {
      batch.add(new THREE.CylinderGeometry(0.12, 0.14, 1.5, 6), C.woodDark, {
        position: [px + Math.cos(a + Math.PI / 2) * s * 0.6, py + 0.2, pz + Math.sin(a + Math.PI / 2) * s * 0.6],
      })
    }
    // 系着的小木船
    const bx = px + Math.cos(a) * 1.9
    const bz = pz + Math.sin(a) * 1.9
    batch.add(roundedBoxGeometry(1.0, 0.5, 2.3, 0.22, 2), C.woodLight, {
      position: [bx, py + 0.75, bz],
      rotation: [0, a + Math.PI / 2 + 0.3, 0],
    })
    batch.add(roundedBoxGeometry(0.7, 0.16, 1.7, 0.06, 1), C.woodDark, {
      position: [bx, py + 1.0, bz],
      rotation: [0, a + Math.PI / 2 + 0.3, 0],
    })
  }

  /* 芦苇 */
  for (let i = 0; i < 70; i++) {
    const a = random() * Math.PI * 2
    const r = POND_RADIUS * (0.86 + random() * 0.28)
    const x = POND_CENTER.x + Math.cos(a) * r
    const z = POND_CENTER.y + Math.sin(a) * r
    const y = groundAt(x, z)
    const h = 0.9 + random() * 0.9
    batch.add(new THREE.CylinderGeometry(0.028, 0.045, h, 3), C.grassDeep, {
      position: [x, y + h / 2 + 0.3, z],
      rotation: [(random() - 0.5) * 0.25, random() * 3, (random() - 0.5) * 0.25],
    })
    if (random() > 0.55) {
      batch.add(new THREE.CylinderGeometry(0.06, 0.06, 0.28, 4), C.trunk, {
        position: [x, y + h + 0.35, z],
      })
    }
  }

  /* 树木 */
  const treeSpots: Array<{ kind: TreeKind; angle: [number, number]; count: number; scale: [number, number] }> = [
    { kind: 'round', angle: [2.5, 3.5], count: 11, scale: [0.9, 1.6] },
    { kind: 'gold', angle: [-1.9, -0.9], count: 8, scale: [0.9, 1.5] },
    { kind: 'pine', angle: [-0.55, 0.35], count: 7, scale: [0.9, 1.4] },
    { kind: 'cypress', angle: [1.5, 2.3], count: 6, scale: [0.85, 1.3] },
    { kind: 'blossom', angle: [-2.7, -2.0], count: 6, scale: [0.8, 1.25] },
    { kind: 'round', angle: [0.5, 1.35], count: 6, scale: [0.8, 1.3] },
  ]
  for (const spec of treeSpots) {
    for (let i = 0; i < spec.count; i++) {
      const spot = field.find(random, 17.5, ISLAND_RADIUS - 3.5, 2.2, spec.angle, 60)
      if (!spot) continue
      const s = spec.scale[0] + random() * (spec.scale[1] - spec.scale[0])
      addTree(batch, spec.kind, spot.x, spot.y, spot.z, s, random)
    }
  }
  // 零星散布的树
  for (let i = 0; i < 10; i++) {
    const spot = field.find(random, 17.5, ISLAND_RADIUS - 3.5, 2.6, undefined, 60)
    if (!spot) continue
    addTree(batch, random() > 0.5 ? 'round' : 'pine', spot.x, spot.y, spot.z, 0.8 + random() * 0.6, random)
  }

  /* 灌木 */
  for (let i = 0; i < 42; i++) {
    const spot = field.find(random, 17, ISLAND_RADIUS - 2.8, 1.1, undefined, 30)
    if (!spot) continue
    addBush(batch, spot.x, spot.y, spot.z, 0.8 + random() * 0.7, random)
  }

  /* 岩石 */
  for (let i = 0; i < 34; i++) {
    const spot = field.find(random, 17, ISLAND_RADIUS - 2.2, 1.0, undefined, 30)
    if (!spot) continue
    const s = 0.4 + random() * 1.3
    batch.add(new THREE.DodecahedronGeometry(s, 0), random() > 0.5 ? C.rock : C.rockLight, {
      position: [spot.x, spot.y + s * 0.4, spot.z],
      rotation: [random() * 3, random() * 3, random() * 3],
      scale: [1, 0.68 + random() * 0.3, 1],
    })
  }

  /* 草丛与野花 */
  for (let i = 0; i < 620; i++) {
    const a = random() * Math.PI * 2
    const r = 16.6 + random() * (ISLAND_RADIUS - 19.2)
    const x = Math.cos(a) * r
    const z = Math.sin(a) * r
    if (islandSurfaceHeight(x, z) === null) continue
    if (Math.hypot(x - POND_CENTER.x, z - POND_CENTER.y) < POND_RADIUS * 0.92) continue
    const y = groundAt(x, z)
    addGrassTuft(batch, x, y, z, random)
  }
  for (let i = 0; i < 300; i++) {
    const a = random() * Math.PI * 2
    const r = 16.8 + random() * (ISLAND_RADIUS - 19.6)
    const x = Math.cos(a) * r
    const z = Math.sin(a) * r
    if (islandSurfaceHeight(x, z) === null) continue
    if (Math.hypot(x - POND_CENTER.x, z - POND_CENTER.y) < POND_RADIUS) continue
    addFlower(batch, x, groundAt(x, z), z, random)
  }

  /* 边缘的木牌与瞭望柱 */
  {
    const a = -2.35
    const r = ISLAND_RADIUS - 3.4
    const x = Math.cos(a) * r
    const z = Math.sin(a) * r
    const y = groundAt(x, z)
    batch.add(new THREE.CylinderGeometry(0.13, 0.16, 3.0, 6), C.woodDark, { position: [x, y + 1.5, z] })
    batch.add(roundedBoxGeometry(1.9, 0.85, 0.14, 0.06, 2), C.wood, {
      position: [x, y + 2.7, z],
      rotation: [0, -a + Math.PI / 2, 0],
    })
    batch.add(conicalRoofGeometry(0.5, 0.55, 4), C.roofRose, { position: [x, y + 3.35, z] })
  }

  const terrainMesh = batch.build(mat, { mottle: 0.075, seed: 5 })
  if (terrainMesh) {
    terrainMesh.castShadow = true
    terrainMesh.receiveShadow = true
    group.add(terrainMesh)
  }

  const glassMat = new THREE.MeshToonMaterial({
    color: new THREE.Color(0xdfeef2),
    transparent: true,
    opacity: 0.26,
    depthWrite: false,
    side: THREE.DoubleSide,
  })
  const glassMesh = glassBatch.build(glassMat)
  if (glassMesh) {
    glassMesh.castShadow = false
    glassMesh.receiveShadow = false
    glassMesh.renderOrder = 3
    group.add(glassMesh)
  }

  /* 水体 */
  const pond = buildPond()
  group.add(pond.mesh)
  const stream = buildStream()
  group.add(stream.mesh)

  /* 风车叶片 */
  group.add(windmill.sails)

  /* 秋千 */
  if (swing) group.add(swing.seat)

  /* 篝火火焰 */
  const flameMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(C.fireGlow),
    transparent: true,
    opacity: 0.9,
    depthWrite: false,
  })
  const flameMat2 = new THREE.MeshBasicMaterial({
    color: new THREE.Color(C.gold),
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
  })
  const flames: THREE.Mesh[] = []
  for (let i = 0; i < 5; i++) {
    const f = new THREE.Mesh(new THREE.ConeGeometry(0.2 + i * 0.05, 0.7 + i * 0.16, 6), i % 2 ? flameMat : flameMat2)
    f.position.set((i - 2) * 0.16, 0.35 + (i % 2) * 0.14, (i % 2 ? 0.12 : -0.12))
    campfire.flames.add(f)
    flames.push(f)
  }
  group.add(campfire.flames)
  group.add(campfire.light)

  let night = 0

  return {
    group,
    field,
    update(time, delta) {
      pond.update(time)
      stream.update(time)
      windmill.sails.rotation.z -= delta * 0.55
      if (swing) {
        swing.seat.rotation.z = Math.sin(time * 1.15) * 0.32
      }
      for (let i = 0; i < flames.length; i++) {
        const f = flames[i]
        const k = 0.78 + Math.sin(time * 7.5 + i * 1.7) * 0.22
        f.scale.set(k, 0.7 + Math.abs(Math.sin(time * 6.1 + i)) * 0.65, k)
        f.rotation.y = time * 1.4 + i
      }
      campfire.light.intensity = (2.2 + Math.sin(time * 8.3) * 0.5 + Math.sin(time * 13.1) * 0.3) * (0.55 + night * 0.9)
      flameMat.opacity = 0.55 + night * 0.4
      flameMat2.opacity = 0.5 + night * 0.4
    },
    setNight(amount) {
      night = amount
    },
  }
}
