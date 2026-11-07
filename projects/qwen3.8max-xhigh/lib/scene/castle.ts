import * as THREE from 'three'
import { C } from './palette'
import {
  BAILEY_RADIUS,
  BAILEY_Y,
  GATE_TOWER_ANGLES,
  KEEP_PLINTH_R,
  ROUND_TOWER_ANGLES,
  TURRET_ANGLES,
  WALL_HEIGHT,
  WALL_RADIUS,
  WALL_THICKNESS,
  WALL_VERTICES,
} from './layout'
import {
  Batcher,
  archShapeGeometry,
  clothGeometry,
  conicalRoofGeometry,
  gableRoofGeometry,
  lerp,
  merlonGeometry,
  mulberry32,
  roundedBoxGeometry,
  softDotTexture,
  toonMaterial,
  withColor,
} from './utils'

/* ------------------------------------------------------------------ */
/* 外庭落位：先占位再摆放，避免建筑互相穿插                               */
/* ------------------------------------------------------------------ */

type Spot = { x: number; z: number; y: number; theta: number }

class Bailey {
  private reserved: Array<{ x: number; z: number; r: number }> = []

  reserve(x: number, z: number, r: number) {
    this.reserved.push({ x, z, r })
    return this
  }

  private ok(x: number, z: number, need: number) {
    const r = Math.hypot(x, z)
    if (r < KEEP_PLINTH_R + need + 0.5 || r > BAILEY_RADIUS - 1.4 - need * 0.4) return false
    return this.reserved.every((o) => Math.hypot(x - o.x, z - o.z) >= o.r + need)
  }

  /** 在偏好位置附近抖动寻找一个不冲突的落点。 */
  place(
    random: () => number,
    angle: number,
    radius: number,
    need: number,
    jitterA = 0.22,
    jitterR = 1.5,
    tries = 60,
  ): Spot | null {
    for (let i = 0; i < tries; i++) {
      const a = angle + (random() - 0.5) * 2 * jitterA * (i / tries + 0.25)
      const r = radius + (random() - 0.5) * 2 * jitterR * (i / tries + 0.25)
      const x = Math.cos(a) * r
      const z = Math.sin(a) * r
      if (this.ok(x, z, need)) {
        this.reserved.push({ x, z, r: need })
        return { x, z, y: BAILEY_Y, theta: Math.PI / 2 - a }
      }
    }
    return null
  }
}

/* ------------------------------------------------------------------ */
/* 局部坐标换算                                                        */
/* ------------------------------------------------------------------ */

function localToWorld(cx: number, cz: number, theta: number, lx: number, lz: number) {
  const cos = Math.cos(theta)
  const sin = Math.sin(theta)
  return { x: cx + lx * cos + lz * sin, z: cz - lx * sin + lz * cos }
}

/* ------------------------------------------------------------------ */
/* 城墙                                                                */
/* ------------------------------------------------------------------ */

function buildWallRun(
  batch: Batcher,
  glowBatch: Batcher,
  cx: number,
  cz: number,
  theta: number,
  length: number,
  random: () => number,
  opts: { torches?: boolean } = {},
) {
  const y0 = BAILEY_Y
  const outer = WALL_THICKNESS / 2
  batch.add(roundedBoxGeometry(length, WALL_HEIGHT, WALL_THICKNESS, 0.05, 1), C.stone, {
    position: [cx, y0 + WALL_HEIGHT / 2, cz],
    rotation: [0, theta, 0],
  })
  // 墙基斜撑
  batch.add(roundedBoxGeometry(length + 0.2, 0.7, WALL_THICKNESS + 0.5, 0.06, 1), C.stoneShade, {
    position: [cx, y0 + 0.35, cz],
    rotation: [0, theta, 0],
  })
  // 顶部走道
  batch.add(roundedBoxGeometry(length, 0.28, WALL_THICKNESS + 0.34, 0.04, 1), C.stoneCool, {
    position: [cx, y0 + WALL_HEIGHT + 0.14, cz],
    rotation: [0, theta, 0],
  })
  // 雉堞
  const count = Math.max(3, Math.floor(length / 1.02))
  for (let i = 0; i < count; i++) {
    const along = ((i + 0.5) / count - 0.5) * (length - 0.5)
    const p = localToWorld(cx, cz, theta, along, outer - 0.16)
    batch.add(merlonGeometry(0.6, 0.82, 0.52), i % 2 ? C.stone : C.stoneLight, {
      position: [p.x, y0 + WALL_HEIGHT + 0.68, p.z],
      rotation: [0, theta, 0],
    })
    // 射箭孔
    if (i % 2 === 0) {
      batch.add(roundedBoxGeometry(0.14, 0.42, 0.2, 0.02, 1), C.stoneDark, {
        position: [p.x, y0 + WALL_HEIGHT + 0.66, p.z],
        rotation: [0, theta, 0],
      })
    }
  }
  // 墙面小窗
  const winCount = Math.max(1, Math.floor(length / 3.6))
  for (let i = 0; i < winCount; i++) {
    const along = ((i + 0.5) / winCount - 0.5) * (length - 1.6)
    const p = localToWorld(cx, cz, theta, along, outer + 0.02)
    glowBatch.add(archShapeGeometry(0.5, 1.1, 0.3), C.windowGlow, {
      position: [p.x, y0 + WALL_HEIGHT * 0.55, p.z],
      rotation: [0, theta + Math.PI / 2, 0],
    })
    batch.add(archShapeGeometry(0.72, 1.35, 0.18), C.stoneLight, {
      position: [p.x, y0 + WALL_HEIGHT * 0.55, p.z],
      rotation: [0, theta + Math.PI / 2, 0],
    })
  }
  // 火把
  if (opts.torches) {
    for (const side of [-1, 1]) {
      const along = side * (length / 2 - 0.9)
      const p = localToWorld(cx, cz, theta, along, outer + 0.34)
      batch.add(new THREE.CylinderGeometry(0.06, 0.08, 0.7, 5), C.woodDark, {
        position: [p.x, y0 + WALL_HEIGHT - 0.9, p.z],
        rotation: [Math.PI / 7, 0, 0],
      })
      glowBatch.add(new THREE.SphereGeometry(0.16, 6, 5), C.fireGlow, {
        position: [p.x, y0 + WALL_HEIGHT - 0.5, p.z + 0.1],
      })
    }
  }
  void random
}

function buildRoundTower(
  batch: Batcher,
  glowBatch: Batcher,
  x: number,
  z: number,
  style: 'spire' | 'flat',
  random: () => number,
): { flagAnchor: THREE.Vector3 } {
  const r = 2.75
  const h = style === 'spire' ? 13.2 : 11.4
  const y0 = BAILEY_Y
  batch.add(new THREE.CylinderGeometry(r, r + 0.45, h, 14), C.stone, { position: [x, y0 + h / 2, z] })
  // 底座斜撑
  batch.add(new THREE.CylinderGeometry(r + 0.5, r + 0.85, 1.1, 14), C.stoneShade, { position: [x, y0 + 0.55, z] })
  // 牛腿承托层
  batch.add(new THREE.CylinderGeometry(r + 0.42, r - 0.06, 0.85, 14), C.stoneShade, {
    position: [x, y0 + h - 0.5, z],
  })
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2
    batch.add(roundedBoxGeometry(0.34, 0.5, 0.34, 0.05, 1), C.stoneDark, {
      position: [x + Math.cos(a) * (r + 0.16), y0 + h - 0.95, z + Math.sin(a) * (r + 0.16)],
      rotation: [0, -a, 0],
    })
  }
  const topY = y0 + h

  // 箭缝与窗
  for (let level = 0; level < 3; level++) {
    const wy = y0 + 3.2 + level * 3.4
    const n = level === 0 ? 3 : 4
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + level * 0.4 + random() * 0.2
      const px = x + Math.cos(a) * (r - 0.02)
      const pz = z + Math.sin(a) * (r - 0.02)
      if (level === 0) {
        batch.add(roundedBoxGeometry(0.2, 1.3, 0.3, 0.03, 1), C.stoneDark, {
          position: [px, wy, pz],
          rotation: [0, -a + Math.PI / 2, 0],
        })
      } else {
        glowBatch.add(archShapeGeometry(0.62, 1.35, 0.4), C.windowGlow, {
          position: [px, wy, pz],
          rotation: [0, -a + Math.PI / 2, 0],
        })
        batch.add(archShapeGeometry(0.86, 1.6, 0.22), C.stoneLight, {
          position: [px, wy, pz],
          rotation: [0, -a + Math.PI / 2, 0],
        })
      }
    }
  }

  let flagY = topY
  if (style === 'spire') {
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2
      batch.add(merlonGeometry(0.56, 0.78, 0.46), i % 2 ? C.stone : C.stoneLight, {
        position: [x + Math.cos(a) * (r + 0.2), topY + 0.3, z + Math.sin(a) * (r + 0.2)],
        rotation: [0, -a, 0],
      })
    }
    batch.add(conicalRoofGeometry(r + 0.78, 4.6, 12), C.roofRose, { position: [x, topY + 2.9, z] })
    // 瓦片纹理：几圈凸起的瓦垄
    for (let k = 0; k < 3; k++) {
      const t = (k + 1) / 4
      batch.add(new THREE.TorusGeometry((r + 0.78) * (1 - t) * 0.98, 0.09, 4, 14), C.roofDeep, {
        position: [x, topY + 0.6 + t * 4.6, z],
        rotation: [Math.PI / 2, 0, 0],
      })
    }
    batch.add(new THREE.SphereGeometry(0.24, 8, 6), C.gold, { position: [x, topY + 5.3, z] })
    batch.add(new THREE.CylinderGeometry(0.055, 0.055, 2.2, 4), C.woodDark, {
      position: [x, topY + 6.3, z],
    })
    flagY = topY + 6.9
  } else {
    batch.add(new THREE.CylinderGeometry(r + 0.3, r + 0.3, 0.3, 14), C.stoneCool, {
      position: [x, topY + 0.15, z],
    })
    for (let i = 0; i < 13; i++) {
      const a = (i / 13) * Math.PI * 2
      batch.add(merlonGeometry(0.58, 0.86, 0.5), i % 2 ? C.stone : C.stoneLight, {
        position: [x + Math.cos(a) * (r + 0.16), topY + 0.72, z + Math.sin(a) * (r + 0.16)],
        rotation: [0, -a, 0],
      })
    }
    // 顶上的小瞭望棚
    const hx = x + 0.5
    const hz = z - 0.4
    batch.add(roundedBoxGeometry(2.0, 0.2, 2.0, 0.04, 1), C.woodDark, { position: [hx, topY + 0.4, hz] })
    for (const sx of [-1, 1]) {
      for (const sz of [-1, 1]) {
        batch.add(new THREE.CylinderGeometry(0.09, 0.11, 1.9, 5), C.wood, {
          position: [hx + sx * 0.82, topY + 1.35, hz + sz * 0.82],
        })
      }
    }
    batch.add(conicalRoofGeometry(1.62, 1.35, 4), C.roofSlate, {
      position: [hx, topY + 2.9, hz],
      rotation: [0, Math.PI / 4, 0],
    })
    glowBatch.add(roundedBoxGeometry(0.5, 0.6, 0.5, 0.08, 1), C.lampGlow, {
      position: [hx - 0.9, topY + 1.5, hz + 0.9],
    })
    batch.add(new THREE.CylinderGeometry(0.05, 0.05, 1.8, 4), C.woodDark, {
      position: [x - r + 0.2, topY + 1.2, z + r - 0.2],
    })
    flagY = topY + 2.0
  }

  return { flagAnchor: new THREE.Vector3(x, flagY, z) }
}

function buildGateTower(batch: Batcher, glowBatch: Batcher, x: number, z: number, theta: number) {
  const w = 3.5
  const h = 10.6
  const y0 = BAILEY_Y
  batch.add(roundedBoxGeometry(w, h, w, 0.08, 1), C.stone, {
    position: [x, y0 + h / 2, z],
    rotation: [0, theta, 0],
  })
  batch.add(roundedBoxGeometry(w + 0.5, 0.9, w + 0.5, 0.08, 1), C.stoneShade, {
    position: [x, y0 + 0.45, z],
    rotation: [0, theta, 0],
  })
  batch.add(roundedBoxGeometry(w + 0.42, 0.34, w + 0.42, 0.06, 1), C.stoneCool, {
    position: [x, y0 + h + 0.17, z],
    rotation: [0, theta, 0],
  })
  for (let i = 0; i < 4; i++) {
    const along = ((i + 0.5) / 4 - 0.5) * (w - 0.3)
    for (const side of [-1, 1]) {
      const p = localToWorld(x, z, theta, along, side * (w / 2 - 0.1))
      batch.add(merlonGeometry(0.56, 0.8, 0.48), i % 2 ? C.stone : C.stoneLight, {
        position: [p.x, y0 + h + 0.72, p.z],
        rotation: [0, theta, 0],
      })
    }
  }
  // 角上的小尖塔
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      const p = localToWorld(x, z, theta, sx * (w / 2), sz * (w / 2))
      batch.add(new THREE.CylinderGeometry(0.52, 0.6, h + 1.6, 8), C.stoneShade, {
        position: [p.x, y0 + (h + 1.6) / 2, p.z],
      })
      batch.add(conicalRoofGeometry(0.78, 1.7, 8), C.roofDeep, {
        position: [p.x, y0 + h + 2.4, p.z],
      })
      batch.add(new THREE.SphereGeometry(0.13, 6, 5), C.gold, { position: [p.x, y0 + h + 3.3, p.z] })
    }
  }
  // 窗
  for (let level = 0; level < 2; level++) {
    const wy = y0 + 3.6 + level * 3.6
    for (const side of [-1, 1]) {
      const p = localToWorld(x, z, theta, 0, side * (w / 2 + 0.02))
      glowBatch.add(archShapeGeometry(0.7, 1.5, 0.4), C.windowGlow, {
        position: [p.x, wy, p.z],
        rotation: [0, theta + Math.PI / 2, 0],
      })
      batch.add(archShapeGeometry(0.95, 1.75, 0.2), C.stoneLight, {
        position: [p.x, wy, p.z],
        rotation: [0, theta + Math.PI / 2, 0],
      })
    }
  }
}

/* ------------------------------------------------------------------ */
/* 门楼：拱券、吊闸、木门、吊桥                                          */
/* ------------------------------------------------------------------ */

const GATE_Z = WALL_RADIUS * Math.cos(Math.PI / 8)
const GATE_OPEN_HALF = 2.35

type GateParts = {
  portcullis: THREE.Group
  doorL: THREE.Group
  doorR: THREE.Group
  bridge: THREE.Group
  chainL: THREE.Mesh
  chainR: THREE.Mesh
}

function buildGatehouse(batch: Batcher, glowBatch: Batcher): GateParts {
  const y0 = BAILEY_Y
  const towerX = WALL_RADIUS * Math.sin(Math.PI / 8)
  const blockHalf = towerX - 1.75

  // 门楼主体：两侧墩 + 拱券 + 上部墙体
  for (const s of [-1, 1]) {
    const jambW = blockHalf - GATE_OPEN_HALF
    batch.add(roundedBoxGeometry(jambW, WALL_HEIGHT + 2.4, WALL_THICKNESS + 0.55, 0.05, 1), C.stone, {
      position: [s * (GATE_OPEN_HALF + jambW / 2), y0 + (WALL_HEIGHT + 2.4) / 2, GATE_Z],
    })
  }
  // 拱券
  batch.add(new THREE.TorusGeometry(GATE_OPEN_HALF, 0.44, 6, 18, Math.PI), C.stoneLight, {
    position: [0, y0 + 2.95, GATE_Z + WALL_THICKNESS / 2 - 0.05],
  })
  batch.add(new THREE.TorusGeometry(GATE_OPEN_HALF + 0.5, 0.2, 5, 18, Math.PI), C.stoneShade, {
    position: [0, y0 + 2.95, GATE_Z + WALL_THICKNESS / 2 + 0.16],
  })
  // 拱顶以上的墙体
  batch.add(roundedBoxGeometry(blockHalf * 2, WALL_HEIGHT + 2.4 - 5.3, WALL_THICKNESS + 0.55, 0.05, 1), C.stone, {
    position: [0, y0 + 5.3 + (WALL_HEIGHT + 2.4 - 5.3) / 2, GATE_Z],
  })
  // 杀人孔（machicolations）
  batch.add(roundedBoxGeometry(blockHalf * 2 + 0.7, 0.4, WALL_THICKNESS + 1.3, 0.05, 1), C.stoneShade, {
    position: [0, y0 + WALL_HEIGHT + 2.5, GATE_Z],
  })
  for (let i = 0; i < 5; i++) {
    const along = ((i + 0.5) / 5 - 0.5) * (blockHalf * 2 - 0.4)
    batch.add(merlonGeometry(0.62, 0.86, 0.55), i % 2 ? C.stone : C.stoneLight, {
      position: [along, y0 + WALL_HEIGHT + 3.1, GATE_Z + WALL_THICKNESS / 2 + 0.1],
    })
    batch.add(merlonGeometry(0.62, 0.86, 0.55), i % 2 ? C.stoneLight : C.stone, {
      position: [along, y0 + WALL_HEIGHT + 3.1, GATE_Z - WALL_THICKNESS / 2 - 0.1],
    })
  }
  // 门楼上方的钟与纹章
  glowBatch.add(new THREE.CircleGeometry(0.72, 16), C.gold, {
    position: [0, y0 + WALL_HEIGHT + 0.9, GATE_Z + WALL_THICKNESS / 2 + 0.3],
  })
  batch.add(new THREE.TorusGeometry(0.78, 0.1, 5, 18), C.goldDeep, {
    position: [0, y0 + WALL_HEIGHT + 0.9, GATE_Z + WALL_THICKNESS / 2 + 0.3],
  })
  batch.add(roundedBoxGeometry(0.1, 0.9, 0.1, 0.02, 1), C.goldDeep, {
    position: [0, y0 + WALL_HEIGHT + 0.9, GATE_Z + WALL_THICKNESS / 2 + 0.36],
  })
  batch.add(roundedBoxGeometry(0.6, 0.1, 0.1, 0.02, 1), C.goldDeep, {
    position: [0, y0 + WALL_HEIGHT + 1.05, GATE_Z + WALL_THICKNESS / 2 + 0.36],
  })

  /* 吊闸 */
  const portcullis = new THREE.Group()
  portcullis.position.set(0, y0, GATE_Z)
  const pgBatch = new Batcher()
  const barH = 5.0
  for (let i = -4; i <= 4; i++) {
    pgBatch.add(roundedBoxGeometry(0.15, barH, 0.15, 0.03, 1), C.guardSteelDark, {
      position: [i * 0.52, barH / 2, 0],
    })
    pgBatch.add(new THREE.ConeGeometry(0.11, 0.3, 4), C.guardSteel, { position: [i * 0.52, 0.05, 0] })
  }
  for (let k = 0; k < 4; k++) {
    pgBatch.add(roundedBoxGeometry(GATE_OPEN_HALF * 2 - 0.2, 0.14, 0.14, 0.03, 1), C.guardSteel, {
      position: [0, 0.7 + k * 1.25, 0],
    })
  }
  const pgMesh = pgBatch.build(toonMaterial({ flatShading: true }))
  if (pgMesh) {
    pgMesh.castShadow = true
    portcullis.add(pgMesh)
  }

  /* 木门 */
  const doorMat = toonMaterial({})
  const makeDoor = (side: number) => {
    const g = new THREE.Group()
    g.position.set(side * GATE_OPEN_HALF, y0, GATE_Z - 0.35)
    const db = new Batcher()
    db.add(roundedBoxGeometry(GATE_OPEN_HALF, 4.5, 0.24, 0.05, 1), C.woodDark, {
      position: [(-side * GATE_OPEN_HALF) / 2, 2.25, 0],
    })
    for (let k = 0; k < 3; k++) {
      db.add(roundedBoxGeometry(GATE_OPEN_HALF - 0.12, 0.2, 0.1, 0.02, 1), C.guardSteelDark, {
        position: [(-side * GATE_OPEN_HALF) / 2, 0.9 + k * 1.35, 0.16],
      })
    }
    for (let k = 0; k < 8; k++) {
      db.add(new THREE.SphereGeometry(0.07, 5, 4), C.guardSteel, {
        position: [(-side * GATE_OPEN_HALF) / 2 + (k % 4 - 1.5) * 0.5, 0.9 + Math.floor(k / 4) * 2.7, 0.2],
      })
    }
    const m = db.build(doorMat)
    if (m) {
      m.castShadow = true
      g.add(m)
    }
    return g
  }
  const doorL = makeDoor(-1)
  const doorR = makeDoor(1)

  /* 干壕与前方平台 */
  const courtTop = 1.42
  for (const s of [-1, 1]) {
    batch.add(roundedBoxGeometry(4.0, courtTop + 0.9, 5.4, 0.06, 1), C.stoneShade, {
      position: [s * 4.85, (courtTop - 0.9) / 2, 17.9],
    })
    // 壕沟侧壁
    batch.add(roundedBoxGeometry(0.6, courtTop + 1.3, 4.6, 0.05, 1), C.stone, {
      position: [s * 3.05, (courtTop - 1.3) / 2 + 0.1, 17.7],
    })
    // 平台边缘的矮墙
    for (let i = 0; i < 5; i++) {
      batch.add(merlonGeometry(0.6, 0.6, 0.5), i % 2 ? C.stone : C.stoneLight, {
        position: [s * (3.6 + i * 0.75), courtTop + 0.3, 20.4],
      })
    }
  }
  // 壕沟底
  batch.add(roundedBoxGeometry(5.6, 0.35, 4.6, 0.05, 1), C.rockDeep, { position: [0, -1.15, 17.7] })
  for (let i = 0; i < 8; i++) {
    batch.add(new THREE.DodecahedronGeometry(0.28 + (i % 3) * 0.14, 0), C.rock, {
      position: [(i % 4 - 1.5) * 1.3, -0.9, 16.2 + Math.floor(i / 4) * 2.6],
      rotation: [i, i * 0.7, i * 0.3],
    })
  }
  // 壕沟里的小暗门
  batch.add(archShapeGeometry(1.1, 1.9, 0.4), C.woodDark, { position: [-3.0, -0.9, 17.7], rotation: [0, Math.PI / 2, 0] })

  /* 吊桥 */
  const bridge = new THREE.Group()
  bridge.position.set(0, y0 + 0.02, GATE_Z + WALL_THICKNESS / 2)
  const bb = new Batcher()
  const bridgeLen = 5.6
  for (let i = 0; i < 9; i++) {
    bb.add(roundedBoxGeometry(4.7, 0.22, 0.56, 0.03, 1), i % 2 ? C.wood : C.woodLight, {
      position: [0, 0, 0.32 + i * 0.6],
    })
  }
  for (const s of [-1, 1]) {
    bb.add(roundedBoxGeometry(0.24, 0.3, bridgeLen, 0.04, 1), C.woodDark, {
      position: [s * 2.3, 0.02, bridgeLen / 2],
    })
    bb.add(roundedBoxGeometry(0.18, 0.18, bridgeLen, 0.03, 1), C.timber, {
      position: [s * 1.5, -0.16, bridgeLen / 2],
    })
  }
  // 桥面铁带
  for (let i = 0; i < 3; i++) {
    bb.add(roundedBoxGeometry(4.8, 0.1, 0.16, 0.02, 1), C.guardSteelDark, {
      position: [0, 0.14, 1.2 + i * 1.7],
    })
  }
  const bridgeMesh = bb.build(toonMaterial({}))
  if (bridgeMesh) {
    bridgeMesh.castShadow = true
    bridgeMesh.receiveShadow = true
    bridge.add(bridgeMesh)
  }

  /* 铁链 */
  const chainMat = toonMaterial({})
  const chainL = new THREE.Mesh(withColor(new THREE.CylinderGeometry(0.055, 0.055, 6.4, 5), C.guardSteelDark), chainMat)
  const chainR = new THREE.Mesh(withColor(new THREE.CylinderGeometry(0.055, 0.055, 6.4, 5), C.guardSteelDark), chainMat)
  chainL.castShadow = true
  chainR.castShadow = true

  return { portcullis, doorL, doorR, bridge, chainL, chainR }
}

/* ------------------------------------------------------------------ */
/* 外庭建筑                                                            */
/* ------------------------------------------------------------------ */

function addHouse(
  batch: Batcher,
  glowBatch: Batcher,
  spot: Spot,
  w: number,
  d: number,
  h: number,
  random: () => number,
  roofColor: number,
) {
  const { x, z, y, theta } = spot
  const add = (geo: THREE.BufferGeometry, color: number, lx: number, ly: number, lz: number) => {
    const p = localToWorld(x, z, theta, lx, lz)
    batch.add(geo, color, { position: [p.x, y + ly, p.z], rotation: [0, theta, 0] })
  }
  const addGlow = (geo: THREE.BufferGeometry, color: number, lx: number, ly: number, lz: number) => {
    const p = localToWorld(x, z, theta, lx, lz)
    glowBatch.add(geo, color, { position: [p.x, y + ly, p.z], rotation: [0, theta, 0] })
  }

  // 石砌基座
  add(roundedBoxGeometry(w + 0.2, 0.9, d + 0.2, 0.06, 1), C.stoneShade, 0, 0.45, 0)
  // 半木结构：灰泥墙 + 深色木架
  add(roundedBoxGeometry(w, h, d, 0.05, 1), C.clothCream, 0, 0.9 + h / 2, 0)
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      add(roundedBoxGeometry(0.2, h + 0.2, 0.2, 0.03, 1), C.timber, sx * (w / 2 - 0.08), 0.9 + h / 2, sz * (d / 2 - 0.08))
    }
  }
  add(roundedBoxGeometry(w + 0.1, 0.2, d + 0.1, 0.03, 1), C.timber, 0, 0.9 + h * 0.52, 0)
  add(roundedBoxGeometry(w + 0.1, 0.18, d + 0.1, 0.03, 1), C.timber, 0, 0.95, 0)
  // 斜撑
  for (const sx of [-1, 1]) {
    add(roundedBoxGeometry(0.14, h * 0.62, 0.14, 0.03, 1), C.timber, sx * (w / 2 - 0.06), 0.9 + h * 0.28, 0)
  }
  // 屋顶
  const roofH = 1.5 + random() * 0.5
  add(gableRoofGeometry(d, w, roofH, 0.34), roofColor, 0, 0.9 + h, 0)
  add(roundedBoxGeometry(0.24, 0.24, d + 0.9, 0.04, 1), C.woodDark, 0, 0.9 + h + roofH, 0)
  // 山墙上的木条
  for (const sz of [-1, 1]) {
    add(roundedBoxGeometry(w * 0.86, 0.14, 0.14, 0.02, 1), C.timber, 0, 0.9 + h + roofH * 0.45, sz * (d / 2 + 0.02))
  }
  // 门（朝内庭）
  add(roundedBoxGeometry(0.95, 1.75, 0.16, 0.2, 1), C.woodDark, 0, 1.75, -d / 2 - 0.06)
  add(new THREE.SphereGeometry(0.07, 5, 4), C.gold, 0.3, 1.7, -d / 2 - 0.16)
  // 窗（夜里发光）
  for (const sx of [-1, 1]) {
    addGlow(roundedBoxGeometry(0.62, 0.66, 0.14, 0.04, 1), C.windowGlow, sx * (w / 2 - 0.02), 0.9 + h * 0.62, -d / 2 - 0.05)
    add(roundedBoxGeometry(0.78, 0.82, 0.1, 0.03, 1), C.timber, sx * (w / 2 - 0.02), 0.9 + h * 0.62, -d / 2 - 0.01)
  }
  addGlow(roundedBoxGeometry(0.5, 0.5, 0.14, 0.04, 1), C.windowGlow, 0, 0.9 + h + roofH * 0.42, -d / 2 - 0.1)
  // 烟囱
  const cx = w / 2 - 0.7
  add(roundedBoxGeometry(0.62, roofH + 1.5, 0.62, 0.05, 1), C.stoneDark, cx, 0.9 + h + (roofH + 1.5) / 2 - 0.4, 0)
  add(roundedBoxGeometry(0.8, 0.2, 0.8, 0.04, 1), C.stoneDark, cx, 0.9 + h + roofH + 1.15, 0)
  // 门口的花盆与小桶
  add(new THREE.CylinderGeometry(0.24, 0.2, 0.34, 8), C.roofDeep, -0.85, 1.05, -d / 2 - 0.4)
  add(new THREE.IcosahedronGeometry(0.24, 0), C.leaf, -0.85, 1.32, -d / 2 - 0.4)
  return { chimneyWorld: localToWorld(x, z, theta, cx, 0).x, chimneyZ: localToWorld(x, z, theta, cx, 0).z, chimneyY: y + 0.9 + h + roofH + 1.3 }
}

function buildChapel(batch: Batcher, glowBatch: Batcher, spot: Spot) {
  const { x, z, y, theta } = spot
  const add = (geo: THREE.BufferGeometry, color: number, lx: number, ly: number, lz: number, extra = 0) => {
    const p = localToWorld(x, z, theta, lx, lz)
    batch.add(geo, color, { position: [p.x, y + ly, p.z], rotation: [0, theta + extra, 0] })
  }
  const addGlow = (geo: THREE.BufferGeometry, color: number, lx: number, ly: number, lz: number, extra = 0) => {
    const p = localToWorld(x, z, theta, lx, lz)
    glowBatch.add(geo, color, { position: [p.x, y + ly, p.z], rotation: [0, theta + extra, 0] })
  }

  const naveW = 4.0
  const naveH = 4.4
  const naveD = 6.8
  add(roundedBoxGeometry(naveW, naveH, naveD, 0.06, 1), C.stoneLight, 0, naveH / 2, 0)
  add(gableRoofGeometry(naveW, naveD, 2.1, 0.4), C.roofSlate, 0, naveH, 0)
  add(roundedBoxGeometry(0.26, 0.26, naveD + 1.0, 0.04, 1), C.stoneDark, 0, naveH + 2.1, 0)
  // 后殿：半圆 apse，凸向 +Z
  add(
    new THREE.CylinderGeometry(1.7, 1.7, naveH * 0.68, 10, 1, false, 0, Math.PI),
    C.stone,
    0,
    naveH * 0.34,
    naveD / 2 - 0.2,
    -Math.PI / 2,
  )
  add(
    new THREE.ConeGeometry(2.0, 1.35, 10, 1, false, 0, Math.PI),
    C.roofSlate,
    0,
    naveH * 0.68 + 0.67,
    naveD / 2 - 0.2,
    -Math.PI / 2,
  )
  // 钟楼
  const tw = 2.5
  const th = 9.4
  add(roundedBoxGeometry(tw, th, tw, 0.06, 1), C.stone, 0, th / 2, -naveD / 2 - 0.5)
  add(roundedBoxGeometry(tw + 0.4, 0.34, tw + 0.4, 0.05, 1), C.stoneShade, 0, th - 1.9, -naveD / 2 - 0.5)
  // 钟楼的百叶开口与钟
  for (const s of [-1, 1]) {
    add(roundedBoxGeometry(1.0, 1.5, 0.2, 0.04, 1), C.stoneDark, s * 0.0, th - 1.0, -naveD / 2 - 0.5 + s * (tw / 2 + 0.02))
    add(roundedBoxGeometry(0.12, 1.3, 0.12, 0.02, 1), C.woodDark, 0, th - 1.0, -naveD / 2 - 0.5 + s * (tw / 2 + 0.06))
  }
  add(new THREE.SphereGeometry(0.42, 10, 8, 0, Math.PI * 2, 0, Math.PI / 2), C.gold, 0, th - 1.5, -naveD / 2 - 0.5)
  add(conicalRoofGeometry(tw * 0.86, 3.0, 4), C.roofDeep, 0, th + 1.5, -naveD / 2 - 0.5, Math.PI / 4)
  add(new THREE.SphereGeometry(0.2, 8, 6), C.gold, 0, th + 3.1, -naveD / 2 - 0.5)
  add(new THREE.CylinderGeometry(0.05, 0.05, 1.3, 4), C.woodDark, 0, th + 3.7, -naveD / 2 - 0.5)
  // 风向标
  add(roundedBoxGeometry(0.9, 0.5, 0.06, 0.02, 1), C.gold, 0.3, th + 4.2, -naveD / 2 - 0.5)

  // 玫瑰窗：三重石环 + 彩色玻璃
  const roseY = naveH + 1.0
  const roseZ = naveD / 2 + 0.04
  add(new THREE.TorusGeometry(1.08, 0.17, 6, 22), C.stoneLight, 0, roseY, roseZ)
  addGlow(new THREE.CircleGeometry(1.02, 20), C.windowGlow, 0, roseY, roseZ + 0.04)
  add(new THREE.TorusGeometry(0.68, 0.09, 5, 18), C.stoneLight, 0, roseY, roseZ + 0.1)
  add(new THREE.TorusGeometry(0.3, 0.08, 5, 14), C.stoneLight, 0, roseY, roseZ + 0.12)
  addGlow(new THREE.CircleGeometry(0.26, 12), C.gold, 0, roseY, roseZ + 0.16)

  // 侧窗
  for (let i = 0; i < 3; i++) {
    const lz = -1.9 + i * 1.9
    for (const s of [-1, 1]) {
      addGlow(archShapeGeometry(0.62, 2.1, 0.3), C.windowGlow, s * (naveW / 2 + 0.02), 1.5, lz, s > 0 ? Math.PI / 2 : -Math.PI / 2)
      add(archShapeGeometry(0.86, 2.4, 0.16), C.stoneLight, s * (naveW / 2 + 0.04), 1.5, lz, s > 0 ? Math.PI / 2 : -Math.PI / 2)
    }
  }
  // 扶壁
  for (let i = 0; i < 3; i++) {
    const lz = -2.2 + i * 2.2
    for (const s of [-1, 1]) {
      add(roundedBoxGeometry(0.55, 3.4, 0.7, 0.06, 1), C.stoneShade, s * (naveW / 2 + 0.3), 1.7, lz)
    }
  }
  // 门廊
  add(roundedBoxGeometry(2.2, 2.8, 1.4, 0.06, 1), C.stone, 0, 1.4, -naveD / 2 + 0.9)
  add(gableRoofGeometry(2.2, 1.4, 0.9, 0.24), C.roofSlate, 0, 2.8, -naveD / 2 + 0.9)
  add(archShapeGeometry(1.15, 2.2, 0.3), C.woodDark, 0, 0.05, -naveD / 2 + 0.24)
}

function buildStables(batch: Batcher, glowBatch: Batcher, spot: Spot, random: () => number) {
  const { x, z, y, theta } = spot
  const add = (geo: THREE.BufferGeometry, color: number, lx: number, ly: number, lz: number) => {
    const p = localToWorld(x, z, theta, lx, lz)
    batch.add(geo, color, { position: [p.x, y + ly, p.z], rotation: [0, theta, 0] })
  }
  const w = 4.2
  const d = 7.4
  const h = 3.2
  add(roundedBoxGeometry(w, h, d, 0.06, 1), C.clothCream, 0, h / 2, 0)
  add(roundedBoxGeometry(w + 0.2, 0.7, d + 0.2, 0.06, 1), C.stoneShade, 0, 0.35, 0)
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      add(roundedBoxGeometry(0.22, h, 0.22, 0.03, 1), C.timber, sx * (w / 2 - 0.09), h / 2, sz * (d / 2 - 0.09))
    }
  }
  // X 形木撑
  for (const sz of [-1, 1]) {
    add(roundedBoxGeometry(0.14, 3.4, 0.14, 0.02, 1), C.timber, 0, h / 2, sz * (d / 2 - 0.05))
  }
  add(gableRoofGeometry(w, d, 1.9, 0.42), C.grassDry, 0, h, 0)
  add(roundedBoxGeometry(0.24, 0.24, d + 1.0, 0.04, 1), C.woodDark, 0, h + 1.9, 0)
  // 大门
  add(roundedBoxGeometry(2.4, 2.5, 0.18, 0.05, 1), C.woodDark, 0, 1.25, -d / 2 - 0.06)
  for (let k = 0; k < 3; k++) {
    add(roundedBoxGeometry(2.3, 0.14, 0.1, 0.02, 1), C.timber, 0, 0.5 + k * 0.85, -d / 2 - 0.18)
  }
  // 干草阁窗
  glowBatch.add(roundedBoxGeometry(0.9, 0.8, 0.14, 0.04, 1), C.lampGlow, {
    position: [localToWorld(x, z, theta, 0, -d / 2 - 0.06).x, y + h + 0.85, localToWorld(x, z, theta, 0, -d / 2 - 0.06).z],
    rotation: [0, theta, 0],
  })
  // 侧窗
  for (const s of [-1, 1]) {
    add(roundedBoxGeometry(0.14, 0.8, 1.1, 0.03, 1), C.windowGlow, s * (w / 2 + 0.02), 1.9, -1.4)
    add(roundedBoxGeometry(0.14, 0.8, 1.1, 0.03, 1), C.windowGlow, s * (w / 2 + 0.02), 1.9, 1.4)
  }
  // 马场围栏
  const fenceX = -w / 2 - 1.0
  for (let i = 0; i < 6; i++) {
    const lz = -d / 2 - 1.0 - (i / 5) * 4.0
    add(roundedBoxGeometry(0.14, 1.15, 0.14, 0.03, 1), C.wood, fenceX, 0.58, lz)
  }
  for (let k = 0; k < 2; k++) {
    add(roundedBoxGeometry(0.1, 0.11, 4.2, 0.02, 1), C.woodLight, fenceX, 0.5 + k * 0.5, -d / 2 - 3.0)
  }
  // 水槽与草堆
  add(roundedBoxGeometry(1.5, 0.55, 0.8, 0.06, 1), C.woodDark, w / 2 + 1.1, 0.28, -1.6)
  add(roundedBoxGeometry(1.3, 0.16, 0.62, 0.03, 1), C.water, w / 2 + 1.1, 0.52, -1.6)
  for (let i = 0; i < 3; i++) {
    add(roundedBoxGeometry(1.0, 0.75, 0.8, 0.08, 1), C.grassDry, w / 2 + 1.2 + (i % 2) * 0.4, 0.38 + Math.floor(i / 2) * 0.75, 1.2 + i * 0.9)
  }
  void random
}

function buildWell(batch: Batcher, spot: Spot) {
  const { x, z, y, theta } = spot
  const add = (geo: THREE.BufferGeometry, color: number, lx: number, ly: number, lz: number) => {
    const p = localToWorld(x, z, theta, lx, lz)
    batch.add(geo, color, { position: [p.x, y + ly, p.z], rotation: [0, theta, 0] })
  }
  add(new THREE.CylinderGeometry(1.15, 1.25, 1.15, 12), C.stone, 0, 0.58, 0)
  add(new THREE.TorusGeometry(1.2, 0.14, 5, 14), C.stoneShade, 0, 1.16, 0)
  add(new THREE.CylinderGeometry(1.0, 1.0, 0.1, 12), C.waterDeep, 0, 0.95, 0)
  for (const s of [-1, 1]) {
    add(roundedBoxGeometry(0.18, 2.5, 0.18, 0.03, 1), C.woodDark, s * 0.95, 2.3, 0)
  }
  add(gableRoofGeometry(2.6, 1.9, 0.95, 0.3), C.roofRose, 0, 3.5, 0)
  add(new THREE.CylinderGeometry(0.1, 0.1, 2.1, 6), C.wood, 0, 3.0, 0)
  add(new THREE.CylinderGeometry(0.26, 0.26, 0.5, 8), C.woodLight, 0, 3.0, 0)
  add(new THREE.CylinderGeometry(0.03, 0.03, 1.5, 4), C.clothCream, 0.2, 2.3, 0)
  add(new THREE.CylinderGeometry(0.24, 0.2, 0.42, 8), C.woodDark, 0.2, 1.5, 0)
  add(new THREE.CylinderGeometry(0.16, 0.16, 0.08, 8), C.water, 0.2, 1.66, 0)
}

function buildMarketStall(batch: Batcher, spot: Spot, canopyA: number, canopyB: number, random: () => number) {
  const { x, z, y, theta } = spot
  const add = (geo: THREE.BufferGeometry, color: number, lx: number, ly: number, lz: number) => {
    const p = localToWorld(x, z, theta, lx, lz)
    batch.add(geo, color, { position: [p.x, y + ly, p.z], rotation: [0, theta, 0] })
  }
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      add(new THREE.CylinderGeometry(0.08, 0.1, 2.5, 5), C.wood, sx * 1.35, 1.25, sz * 0.95)
    }
  }
  add(roundedBoxGeometry(3.0, 0.16, 2.1, 0.04, 1), C.woodLight, 0, 1.05, 0)
  add(roundedBoxGeometry(2.8, 0.7, 1.9, 0.05, 1), C.wood, 0, 0.62, 0)
  // 条纹雨棚
  for (let i = 0; i < 6; i++) {
    add(roundedBoxGeometry(0.52, 0.09, 2.5, 0.02, 1), i % 2 ? canopyA : canopyB, -1.3 + i * 0.52, 2.62 - Math.abs(i - 2.5) * 0.05, 0.1)
  }
  // 货物
  const goods = [C.gold, C.clothRed, C.leaf, C.clothCream, C.roofDeep]
  for (let i = 0; i < 9; i++) {
    const lx = -1.1 + (i % 5) * 0.55
    const lz = -0.55 + Math.floor(i / 5) * 1.1
    add(new THREE.IcosahedronGeometry(0.16 + random() * 0.1, 0), goods[i % goods.length], lx, 1.28, lz)
  }
  add(roundedBoxGeometry(0.7, 0.34, 0.5, 0.06, 1), C.grassDry, 1.0, 1.3, 0.4)
  add(new THREE.CylinderGeometry(0.3, 0.3, 0.5, 8), C.woodDark, -1.0, 1.35, -0.5)
}

function buildTrainingYard(batch: Batcher, spot: Spot, random: () => number) {
  const { x, z, y, theta } = spot
  const add = (geo: THREE.BufferGeometry, color: number, lx: number, ly: number, lz: number, ry = 0) => {
    const p = localToWorld(x, z, theta, lx, lz)
    batch.add(geo, color, { position: [p.x, y + ly, p.z], rotation: [0, theta + ry, 0] })
  }
  // 圆形围栏（正面留出入口）
  const SEG = 16
  for (let i = 0; i < SEG; i++) {
    const a = (i / SEG) * Math.PI * 2
    if (a > 1.3 && a < 1.85) continue
    add(roundedBoxGeometry(0.14, 1.2, 0.14, 0.03, 1), C.wood, Math.cos(a) * 3.1, 0.6, Math.sin(a) * 3.1)
  }
  for (let k = 0; k < 2; k++) {
    for (let i = 0; i < SEG; i++) {
      const a1 = (i / SEG) * Math.PI * 2
      const a2 = ((i + 1) / SEG) * Math.PI * 2
      if (a1 > 1.25 && a1 < 1.9) continue
      const am = (a1 + a2) / 2
      const len = Math.hypot(Math.cos(a2) - Math.cos(a1), Math.sin(a2) - Math.sin(a1)) * 3.1
      add(roundedBoxGeometry(0.09, 0.09, len, 0.02, 1), C.woodLight, Math.cos(am) * 3.1, 0.5 + k * 0.5, Math.sin(am) * 3.1, -am)
    }
  }
  // 靶架（quintain）
  add(new THREE.CylinderGeometry(0.16, 0.2, 3.0, 6), C.woodDark, 0, 1.5, 0)
  add(roundedBoxGeometry(2.4, 0.16, 0.16, 0.03, 1), C.wood, 0, 2.7, 0)
  add(new THREE.CircleGeometry(0.55, 14), C.clothCream, 1.15, 2.7, 0.1)
  add(new THREE.TorusGeometry(0.55, 0.08, 5, 14), C.clothRed, 1.15, 2.7, 0.1)
  add(new THREE.TorusGeometry(0.26, 0.07, 5, 12), C.clothRed, 1.15, 2.7, 0.12)
  add(roundedBoxGeometry(0.5, 0.7, 0.14, 0.04, 1), C.guardSteel, -1.15, 2.6, 0)
  // 草靶与木桶
  add(roundedBoxGeometry(0.8, 1.3, 0.5, 0.14, 1), C.grassDry, -1.9, 0.65, 1.4)
  add(new THREE.SphereGeometry(0.3, 8, 6), C.grassDry, -1.9, 1.5, 1.4)
  for (let i = 0; i < 3; i++) {
    add(new THREE.CylinderGeometry(0.36, 0.32, 0.85, 9), C.wood, 1.7 + (i % 2) * 0.5, 0.43 + Math.floor(i / 2) * 0.85, -1.5 + i * 0.35)
  }
  // 武器架
  add(roundedBoxGeometry(1.8, 0.14, 0.14, 0.02, 1), C.woodDark, 0.4, 1.1, -2.2)
  for (const s of [-1, 1]) {
    add(roundedBoxGeometry(0.12, 1.2, 0.12, 0.02, 1), C.woodDark, 0.4 + s * 0.8, 0.6, -2.2)
  }
  for (let i = 0; i < 4; i++) {
    add(new THREE.CylinderGeometry(0.045, 0.045, 2.1, 5), C.guardSteel, -0.2 + i * 0.4, 1.5, -2.2)
    add(new THREE.ConeGeometry(0.11, 0.34, 4), C.guardSteelDark, -0.2 + i * 0.4, 2.65, -2.2)
  }
  void random
}

/* ------------------------------------------------------------------ */
/* 主模块                                                              */
/* ------------------------------------------------------------------ */

export type CastleHandle = {
  group: THREE.Group
  update: (time: number, delta: number) => void
  setNight: (amount: number) => void
  setGateOpen: (open: boolean) => void
  chimneyTops: THREE.Vector3[]
}

export function createCastle(): CastleHandle {
  const random = mulberry32(31337)
  const group = new THREE.Group()
  group.name = 'castle'

  const mat = toonMaterial({})
  const glowMat = toonMaterial({ emissive: C.windowGlow, emissiveIntensity: 0.15 })
  const batch = new Batcher()
  const glowBatch = new Batcher()

  const bailey = new Bailey()
  bailey.reserve(0, 0, KEEP_PLINTH_R + 0.6)
  for (const a of ROUND_TOWER_ANGLES) bailey.reserve(Math.cos(a) * WALL_RADIUS, Math.sin(a) * WALL_RADIUS, 3.5)
  for (const a of GATE_TOWER_ANGLES) bailey.reserve(Math.cos(a) * WALL_RADIUS, Math.sin(a) * WALL_RADIUS, 3.1)
  for (const a of TURRET_ANGLES) bailey.reserve(Math.cos(a) * WALL_RADIUS, Math.sin(a) * WALL_RADIUS, 2.0)
  // 城门大道与吊桥区域
  for (let i = 0; i < 8; i++) bailey.reserve(0, WALL_RADIUS - 1 + i * 1.1, 3.4)

  /* ---------------- 外庭台地 ---------------- */
  batch.add(new THREE.CylinderGeometry(BAILEY_RADIUS, BAILEY_RADIUS + 0.7, 3.0, 40), C.stoneShade, {
    position: [0, BAILEY_Y - 1.5, 0],
  })
  batch.add(new THREE.TorusGeometry(BAILEY_RADIUS + 0.05, 0.2, 5, 40), C.stoneDark, {
    position: [0, BAILEY_Y - 0.08, 0],
    rotation: [Math.PI / 2, 0, 0],
  })
  batch.add(new THREE.CylinderGeometry(BAILEY_RADIUS - 0.05, BAILEY_RADIUS - 0.05, 0.22, 40), C.grassDeep, {
    position: [0, BAILEY_Y - 0.05, 0],
  })
  // 内庭石板环
  batch.add(new THREE.RingGeometry(KEEP_PLINTH_R + 0.4, WALL_RADIUS - 1.5, 40, 1), C.stoneCool, {
    position: [0, BAILEY_Y + 0.07, 0],
    rotation: [-Math.PI / 2, 0, 0],
  })
  // 散铺的石板
  for (let i = 0; i < 240; i++) {
    const a = random() * Math.PI * 2
    const r = KEEP_PLINTH_R + 0.8 + random() * (WALL_RADIUS - KEEP_PLINTH_R - 2.4)
    const px = Math.cos(a) * r
    const pz = Math.sin(a) * r
    if (Math.abs(px) < 3.0 && pz > 0 && pz < WALL_RADIUS) continue
    batch.add(
      new THREE.CylinderGeometry(0.34 + random() * 0.3, 0.34 + random() * 0.3, 0.1, 6),
      random() > 0.55 ? C.stone : C.stoneLight,
      { position: [px, BAILEY_Y + 0.13, pz], rotation: [0, random() * 3, 0] },
    )
  }

  /* ---------------- 城墙 ---------------- */
  for (let k = 0; k < 8; k++) {
    const a1 = WALL_VERTICES[k]
    const a2 = WALL_VERTICES[(k + 1) % 8]
    const mid = (a1 + a2) / 2
    const midR = WALL_RADIUS * Math.cos(Math.PI / 8)
    const cx = Math.cos(mid) * midR
    const cz = Math.sin(mid) * midR
    const theta = Math.PI / 2 - mid
    const chord = 2 * WALL_RADIUS * Math.sin(Math.PI / 8)

    // 城门那一段由门楼整体接管
    if (k === 1) continue
    buildWallRun(batch, glowBatch, cx, cz, theta, chord, random, { torches: k % 2 === 0 })
  }

  /* ---------------- 塔楼 ---------------- */
  const flagAnchors: THREE.Vector3[] = []
  ROUND_TOWER_ANGLES.forEach((a, i) => {
    const x = Math.cos(a) * WALL_RADIUS
    const z = Math.sin(a) * WALL_RADIUS
    const res = buildRoundTower(batch, glowBatch, x, z, i % 2 === 0 ? 'spire' : 'flat', random)
    flagAnchors.push(res.flagAnchor)
  })
  GATE_TOWER_ANGLES.forEach((a) => {
    buildGateTower(batch, glowBatch, Math.cos(a) * WALL_RADIUS, Math.sin(a) * WALL_RADIUS, Math.PI / 2 - a)
  })
  for (const a of TURRET_ANGLES) {
    const x = Math.cos(a) * WALL_RADIUS
    const z = Math.sin(a) * WALL_RADIUS
    const h = 8.2
    batch.add(new THREE.CylinderGeometry(1.5, 1.75, h, 10), C.stone, { position: [x, BAILEY_Y + h / 2, z] })
    batch.add(new THREE.CylinderGeometry(1.72, 1.45, 0.6, 10), C.stoneShade, { position: [x, BAILEY_Y + h - 0.4, z] })
    for (let i = 0; i < 9; i++) {
      const aa = (i / 9) * Math.PI * 2
      batch.add(merlonGeometry(0.46, 0.66, 0.4), i % 2 ? C.stone : C.stoneLight, {
        position: [x + Math.cos(aa) * 1.6, BAILEY_Y + h + 0.2, z + Math.sin(aa) * 1.6],
        rotation: [0, -aa, 0],
      })
    }
    batch.add(conicalRoofGeometry(1.95, 2.6, 10), C.roofDeep, { position: [x, BAILEY_Y + h + 1.7, z] })
    batch.add(new THREE.SphereGeometry(0.17, 8, 6), C.gold, { position: [x, BAILEY_Y + h + 3.1, z] })
    glowBatch.add(archShapeGeometry(0.5, 1.1, 0.36), C.windowGlow, {
      position: [x + Math.cos(a) * 1.46, BAILEY_Y + 4.4, z + Math.sin(a) * 1.46],
      rotation: [0, -a + Math.PI / 2, 0],
    })
  }

  /* ---------------- 门楼 ---------------- */
  const gate = buildGatehouse(batch, glowBatch)
  group.add(gate.portcullis, gate.doorL, gate.doorR, gate.bridge, gate.chainL, gate.chainR)

  /* ---------------- 外庭建筑 ---------------- */
  const chimneyTops: THREE.Vector3[] = []

  const chapelSpot = bailey.place(random, Math.PI, 11.2, 2.6, 0.1, 0.7)
  if (chapelSpot) buildChapel(batch, glowBatch, chapelSpot)

  const stableSpot = bailey.place(random, 0, 11.2, 2.6, 0.1, 0.7)
  if (stableSpot) buildStables(batch, glowBatch, stableSpot, random)

  const houseAngles = [3.72, 4.32, 4.92, 5.52, 0.42, 2.62]
  const roofColors = [C.roofRose, C.grassDry, C.roofDeep, C.roofSlate]
  for (let i = 0; i < houseAngles.length; i++) {
    const spot = bailey.place(random, houseAngles[i], 10.9, 2.3, 0.2, 1.2)
    if (!spot) continue
    const res = addHouse(
      batch,
      glowBatch,
      spot,
      3.2 + random() * 0.9,
      3.6 + random() * 1.1,
      2.8 + random() * 0.7,
      random,
      roofColors[i % roofColors.length],
    )
    chimneyTops.push(new THREE.Vector3(res.chimneyWorld, res.chimneyY, res.chimneyZ))
  }

  const wellSpot = bailey.place(random, -0.95, 10.2, 1.5, 0.25, 1.0)
  if (wellSpot) buildWell(batch, wellSpot)

  for (const [ang, rad, ca, cb] of [
    [1.05, 9.7, C.clothRed, C.clothCream],
    [2.1, 9.7, C.clothBlue, C.clothCream],
    [5.95, 9.9, C.gold, C.clothCream],
  ] as Array<[number, number, number, number]>) {
    const spot = bailey.place(random, ang, rad, 1.7, 0.2, 0.9)
    if (spot) buildMarketStall(batch, spot, ca, cb, random)
  }

  const yardSpot = bailey.place(random, 4.55, 9.9, 3.3, 0.15, 0.8)
  if (yardSpot) buildTrainingYard(batch, yardSpot, random)

  // 内庭里的树与灌木
  for (let i = 0; i < 7; i++) {
    const spot = bailey.place(random, random() * Math.PI * 2, 9.4 + random() * 3.2, 1.0, 0.5, 1.6, 30)
    if (!spot) continue
    const s = 0.55 + random() * 0.35
    batch.add(new THREE.CylinderGeometry(0.12 * s, 0.2 * s, 1.5 * s, 6), C.trunk, {
      position: [spot.x, BAILEY_Y + 0.75 * s, spot.z],
    })
    for (let b = 0; b < 3; b++) {
      const a = (b / 3) * Math.PI * 2 + random()
      batch.add(new THREE.IcosahedronGeometry((0.72 + random() * 0.3) * s, 1), b % 2 ? C.leaf : C.leafDeep, {
        position: [spot.x + Math.cos(a) * 0.4 * s, BAILEY_Y + (1.6 + random() * 0.4) * s, spot.z + Math.sin(a) * 0.4 * s],
        scale: [1, 0.85, 1],
      })
    }
  }
  // 花盆与木桶点缀
  for (let i = 0; i < 16; i++) {
    const a = random() * Math.PI * 2
    const r = KEEP_PLINTH_R + 1.0 + random() * 1.6
    batch.add(new THREE.CylinderGeometry(0.28, 0.22, 0.42, 8), i % 2 ? C.roofDeep : C.woodDark, {
      position: [Math.cos(a) * r, BAILEY_Y + 0.28, Math.sin(a) * r],
    })
    batch.add(new THREE.IcosahedronGeometry(0.26, 0), random() > 0.5 ? C.leaf : C.clothRed, {
      position: [Math.cos(a) * r, BAILEY_Y + 0.6, Math.sin(a) * r],
    })
  }

  /* ---------------- 墙上悬挂的旗帜 ---------------- */
  const wallBanners: THREE.Mesh[] = []
  for (let k = 0; k < 8; k++) {
    if (k === 1) continue
    const a1 = WALL_VERTICES[k]
    const a2 = WALL_VERTICES[(k + 1) % 8]
    const mid = (a1 + a2) / 2
    const midR = WALL_RADIUS * Math.cos(Math.PI / 8)
    const cx = Math.cos(mid) * (midR + WALL_THICKNESS / 2 + 0.1)
    const cz = Math.sin(mid) * (midR + WALL_THICKNESS / 2 + 0.1)
    const geo = clothGeometry(1.3, 2.8, 8, 4, 0.14)
    const colors = new Float32Array(geo.getAttribute('position').count * 3)
    const colA = new THREE.Color(k % 2 ? C.clothRed : C.clothBlue)
    const colB = new THREE.Color(C.gold)
    const posAttr = geo.getAttribute('position') as THREE.BufferAttribute
    for (let i = 0; i < colors.length / 3; i++) {
      const yy = posAttr.getY(i)
      const use = yy < -0.6 ? colB : colA
      colors[i * 3] = use.r
      colors[i * 3 + 1] = use.g
      colors[i * 3 + 2] = use.b
    }
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    const mesh = new THREE.Mesh(geo, new THREE.MeshToonMaterial({ vertexColors: true, side: THREE.DoubleSide }))
    mesh.position.set(cx, BAILEY_Y + WALL_HEIGHT - 1.5, cz)
    mesh.rotation.y = Math.PI / 2 - mid
    mesh.castShadow = true
    group.add(mesh)
    wallBanners.push(mesh)
  }

  // 塔顶三角旗
  const pennants: THREE.Mesh[] = []
  for (const anchor of flagAnchors) {
    const geo = clothGeometry(1.5, 0.85, 8, 3, 0.16)
    const colors = new Float32Array(geo.getAttribute('position').count * 3)
    const col = new THREE.Color(C.gold)
    for (let i = 0; i < colors.length / 3; i++) {
      colors[i * 3] = col.r
      colors[i * 3 + 1] = col.g
      colors[i * 3 + 2] = col.b
    }
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    const mesh = new THREE.Mesh(geo, new THREE.MeshToonMaterial({ vertexColors: true, side: THREE.DoubleSide }))
    mesh.position.set(anchor.x + 0.75, anchor.y, anchor.z)
    mesh.castShadow = false
    group.add(mesh)
    pennants.push(mesh)
  }

  /* ---------------- 炊烟 ---------------- */
  const smokeSources = [...chimneyTops, new THREE.Vector3(2.6, 28.2, -5.6)]
  const smokeTex = softDotTexture('rgba(240,235,225,0.6)', 'rgba(240,235,225,0)')
  const perSource = 16
  const smokeCount = smokeSources.length * perSource
  const smokePos = new Float32Array(smokeCount * 3)
  const smokeSeed: number[] = []
  for (let i = 0; i < smokeCount; i++) {
    smokeSeed.push(random() * 10)
  }
  const smokeGeo = new THREE.BufferGeometry()
  smokeGeo.setAttribute('position', new THREE.BufferAttribute(smokePos, 3))
  const smokeMat = new THREE.PointsMaterial({
    size: 1.5,
    map: smokeTex,
    transparent: true,
    opacity: 0.42,
    depthWrite: false,
    sizeAttenuation: true,
    color: new THREE.Color(C.clothCream),
  })
  const smoke = new THREE.Points(smokeGeo, smokeMat)
  smoke.frustumCulled = false
  group.add(smoke)

  /* ---------------- 组装 ---------------- */
  const castleMesh = batch.build(mat, { mottle: 0.07, seed: 21 })
  if (castleMesh) {
    castleMesh.castShadow = true
    castleMesh.receiveShadow = true
    group.add(castleMesh)
  }
  const glowMesh = glowBatch.build(glowMat)
  if (glowMesh) group.add(glowMesh)

  /* ---------------- 动画状态 ---------------- */
  let night = 0
  let gateOpenTarget = 1
  let gateOpen = 1

  const bridgeHinge = new THREE.Vector3(0, BAILEY_Y + 0.02, GATE_Z + WALL_THICKNESS / 2)
  const chainTopL = new THREE.Vector3(-2.0, BAILEY_Y + 8.4, GATE_Z + WALL_THICKNESS / 2 + 0.4)
  const chainTopR = new THREE.Vector3(2.0, BAILEY_Y + 8.4, GATE_Z + WALL_THICKNESS / 2 + 0.4)

  return {
    group,
    chimneyTops,
    update(time, delta) {
      gateOpen = lerp(gateOpen, gateOpenTarget, 1 - Math.pow(0.12, delta))
      // 吊桥
      gate.bridge.rotation.x = -gateOpen * 1.42
      // 吊闸
      gate.portcullis.position.y = BAILEY_Y + gateOpen * 4.6
      // 木门
      gate.doorL.rotation.y = -gateOpen * 1.35
      gate.doorR.rotation.y = gateOpen * 1.35

      // 铁链跟随桥面
      const tipAngle = -gateOpen * 1.42
      const tipY = bridgeHinge.y - Math.sin(tipAngle) * 5.5
      const tipZ = bridgeHinge.z + Math.cos(tipAngle) * 5.5
      for (const [chain, top, sx] of [
        [gate.chainL, chainTopL, -1],
        [gate.chainR, chainTopR, 1],
      ] as Array<[THREE.Mesh, THREE.Vector3, number]>) {
        const start = new THREE.Vector3(top.x, top.y, top.z)
        const end = new THREE.Vector3(sx * 2.0, tipY, tipZ)
        const mid = start.clone().add(end).multiplyScalar(0.5)
        const len = start.distanceTo(end)
        chain.position.copy(mid)
        chain.scale.y = len / 6.4
        chain.lookAt(end)
        chain.rotateX(Math.PI / 2)
      }

      // 旗帜飘动
      for (let b = 0; b < wallBanners.length; b++) {
        const mesh = wallBanners[b]
        const pos = mesh.geometry.getAttribute('position') as THREE.BufferAttribute
        for (let i = 0; i < pos.count; i++) {
          const xx = pos.getX(i)
          const t = (xx + 0.65) / 1.3
          pos.setZ(i, Math.sin(t * 4.6 + time * 2.1 + b * 0.9) * 0.15 * t)
        }
        pos.needsUpdate = true
        mesh.geometry.computeVertexNormals()
      }
      for (let b = 0; b < pennants.length; b++) {
        const mesh = pennants[b]
        const pos = mesh.geometry.getAttribute('position') as THREE.BufferAttribute
        for (let i = 0; i < pos.count; i++) {
          const xx = pos.getX(i)
          const t = (xx + 0.75) / 1.5
          pos.setZ(i, Math.sin(t * 6.0 + time * 3.4 + b) * 0.2 * t)
          pos.setY(i, pos.getY(i) * (1 - t * 0.55))
        }
        pos.needsUpdate = true
        mesh.geometry.computeVertexNormals()
      }

      // 炊烟
      const sp = smokeGeo.getAttribute('position') as THREE.BufferAttribute
      for (let i = 0; i < smokeCount; i++) {
        const src = smokeSources[Math.floor(i / perSource)]
        const s = smokeSeed[i]
        const life = ((time * 0.16 + s * 0.1) % 1 + 1) % 1
        sp.setX(i, src.x + Math.sin(s * 12.9 + life * 3.4 + time * 0.3) * life * 1.9)
        sp.setY(i, src.y + life * 6.5)
        sp.setZ(i, src.z + Math.cos(s * 7.7 + life * 2.8 + time * 0.24) * life * 1.9)
      }
      sp.needsUpdate = true
      smokeMat.opacity = 0.3 + night * 0.16

      glowMat.emissiveIntensity = 0.12 + night * 1.55
    },
    setNight(amount) {
      night = amount
    },
    setGateOpen(open) {
      gateOpenTarget = open ? 1 : 0
    },
  }
}
