import * as THREE from 'three'
import { C } from './palette'
import {
  BAILEY_Y,
  FLOOR_HEIGHT,
  FLOOR_LEVELS,
  KEEP_HALF,
  KEEP_PLINTH_R,
  KEEP_SIZE,
  KEEP_Y,
} from './layout'
import {
  Batcher,
  archShapeGeometry,
  clothGeometry,
  conicalRoofGeometry,
  lerp,
  merlonGeometry,
  roundedBoxGeometry,
  toonMaterial,
  tubeAlong,
} from './utils'

const WALL_TOTAL = FLOOR_HEIGHT * 5
const KEEP_TOP = KEEP_Y + WALL_TOTAL
const TURRET_TOP = KEEP_Y + WALL_TOTAL + 3.4
const TURRET_R = 1.5
const TURRET_OFFSET = KEEP_HALF + 0.9
const WALL_T = 0.95

/** 螺旋楼梯的位置与半径，内部家具与楼板开洞都以此为准。 */
export const STAIR_X = -2.9
export const STAIR_Z = -2.9
export const STAIR_R = 1.32

export type KeepHandle = {
  group: THREE.Group
  /** 剖视时淡出的外壳（四面墙、屋顶板、门窗）。 */
  shell: THREE.Group
  update: (time: number, delta: number) => void
  setNight: (amount: number) => void
  setCutaway: (on: boolean) => void
}

export function createKeep(): KeepHandle {
  const group = new THREE.Group()
  group.name = 'keep'
  const shell = new THREE.Group()
  shell.name = 'keep-shell'
  group.add(shell)

  /* 材质：外壳单独一套，才能整体淡出 */
  const solidMat = toonMaterial({})
  const shellMat = toonMaterial({ transparent: true, opacity: 1 })
  const shellGlowMat = toonMaterial({
    transparent: true,
    opacity: 1,
    emissive: C.windowGlow,
    emissiveIntensity: 0.15,
  })
  const solidGlowMat = toonMaterial({ emissive: C.windowGlow, emissiveIntensity: 0.15 })
  const shellMaterials = [shellMat, shellGlowMat]

  const solid = new Batcher()
  const shellBatch = new Batcher()
  const shellGlow = new Batcher()
  const solidGlow = new Batcher()

  /* ---------------- 台基与台阶 ---------------- */
  solid.add(new THREE.CylinderGeometry(KEEP_PLINTH_R, KEEP_PLINTH_R + 0.5, KEEP_Y - BAILEY_Y + 0.6, 20), C.stone, {
    position: [0, BAILEY_Y + (KEEP_Y - BAILEY_Y) / 2 - 0.1, 0],
  })
  solid.add(new THREE.TorusGeometry(KEEP_PLINTH_R + 0.06, 0.16, 5, 22), C.stoneShade, {
    position: [0, KEEP_Y - 0.06, 0],
    rotation: [Math.PI / 2, 0, 0],
  })
  solid.add(new THREE.CylinderGeometry(KEEP_PLINTH_R - 0.05, KEEP_PLINTH_R - 0.05, 0.2, 20), C.stoneCool, {
    position: [0, KEEP_Y + 0.02, 0],
  })
  // 正面台阶
  for (let i = 0; i < 4; i++) {
    const t = i / 4
    solid.add(roundedBoxGeometry(4.6 - i * 0.25, 0.36, 1.0, 0.05, 1), i % 2 ? C.stone : C.stoneShade, {
      position: [0, BAILEY_Y + 0.18 + t * (KEEP_Y - BAILEY_Y), KEEP_PLINTH_R + 1.6 - i * 0.52],
    })
  }

  /* ---------------- 楼板（永远实体，构成剖视的层线） ---------------- */
  const slabSize = KEEP_SIZE - WALL_T * 2 + 0.5
  // 螺旋梯井：上层楼板在楼梯处开洞
  const slabShape = new THREE.Shape()
  const hs = slabSize / 2
  slabShape.moveTo(-hs, -hs)
  slabShape.lineTo(hs, -hs)
  slabShape.lineTo(hs, hs)
  slabShape.lineTo(-hs, hs)
  slabShape.lineTo(-hs, -hs)
  const wellHole = new THREE.Path()
  // 形状空间 y 对应世界 -z，因此楼梯在 (-2.9,-2.9) 时孔位取 (-2.9, 2.9)
  wellHole.absarc(STAIR_X, -STAIR_Z, STAIR_R + 0.28, 0, Math.PI * 2, true)
  slabShape.holes.push(wellHole)
  const slabGeo = new THREE.ExtrudeGeometry(slabShape, { depth: 0.36, bevelEnabled: false, curveSegments: 14 })
  slabGeo.rotateX(-Math.PI / 2)

  for (const key of ['dungeon', 'hall', 'kitchen', 'library', 'bedchamber'] as const) {
    const y = FLOOR_LEVELS[key]
    if (key === 'dungeon') {
      solid.add(roundedBoxGeometry(slabSize, 0.36, slabSize, 0.04, 1), C.stoneShade, {
        position: [0, y - 0.18, 0],
      })
    } else {
      solid.add(slabGeo, C.stoneShade, { position: [0, y - 0.36, 0] })
    }
    // 楼板边缘的一圈线脚
    solid.add(roundedBoxGeometry(slabSize + 0.16, 0.1, slabSize + 0.16, 0.03, 1), C.stoneDark, {
      position: [0, y - 0.4, 0],
    })
    // 梯井围栏
    if (key !== 'dungeon') {
      for (let i = 0; i < 10; i++) {
        const a = (i / 10) * Math.PI * 2
        const rx = STAIR_X + Math.cos(a) * (STAIR_R + 0.34)
        const rz = STAIR_Z + Math.sin(a) * (STAIR_R + 0.34)
        if (rx > -0.9 && rz > -0.9) continue
        solid.add(roundedBoxGeometry(0.1, 0.72, 0.1, 0.02, 1), C.wood, { position: [rx, y + 0.36, rz] })
      }
    }
  }

  /* ---------------- 螺旋楼梯（贯穿五层，剖视时的主角） ---------------- */
  {
    const riseTotal = FLOOR_LEVELS.roof - FLOOR_LEVELS.dungeon
    const stepsPerFloor = 18
    const totalSteps = stepsPerFloor * 5
    const stepRise = riseTotal / totalSteps
    const stepTurn = (Math.PI * 2) / stepsPerFloor
    const startAngle = Math.PI * 0.75

    // 中心柱
    solid.add(new THREE.CylinderGeometry(0.26, 0.32, riseTotal + 1.6, 10), C.stoneShade, {
      position: [STAIR_X, FLOOR_LEVELS.dungeon + (riseTotal + 1.6) / 2 - 0.4, STAIR_Z],
    })
    solid.add(new THREE.SphereGeometry(0.3, 8, 6), C.gold, {
      position: [STAIR_X, FLOOR_LEVELS.roof + 1.3, STAIR_Z],
    })

    const stepGeo = new THREE.CylinderGeometry(STAIR_R, STAIR_R, 0.17, 7, 1, false, 0, stepTurn + 0.04)
    for (let i = 0; i < totalSteps; i++) {
      const a = startAngle + i * stepTurn
      const y = FLOOR_LEVELS.dungeon + i * stepRise
      solid.add(stepGeo, i % 2 ? C.stone : C.stoneLight, {
        position: [STAIR_X, y, STAIR_Z],
        rotation: [0, -a, 0],
      })
      // 每两级一根栏杆柱
      if (i % 2 === 0) {
        const rx = STAIR_X + Math.cos(a) * (STAIR_R - 0.1)
        const rz = STAIR_Z + Math.sin(a) * (STAIR_R - 0.1)
        solid.add(new THREE.CylinderGeometry(0.045, 0.05, 0.86, 4), C.woodDark, {
          position: [rx, y + 0.5, rz],
        })
      }
    }

    // 螺旋扶手
    const helix: THREE.Vector3[] = []
    const samples = 260
    for (let i = 0; i <= samples; i++) {
      const t = i / samples
      const a = startAngle + t * totalSteps * stepTurn
      helix.push(
        new THREE.Vector3(
          STAIR_X + Math.cos(a) * (STAIR_R - 0.1),
          FLOOR_LEVELS.dungeon + t * riseTotal + 0.9,
          STAIR_Z + Math.sin(a) * (STAIR_R - 0.1),
        ),
      )
    }
    solid.add(tubeAlong(helix, 0.075, 300, 5), C.wood, {})
  }

  /* ---------------- 四面墙（外壳） ---------------- */
  const wallGeo = roundedBoxGeometry(KEEP_SIZE + 1.9, WALL_TOTAL, WALL_T, 0.05, 1)
  for (const [px, pz, ry] of [
    [0, KEEP_HALF, 0],
    [0, -KEEP_HALF, 0],
    [KEEP_HALF, 0, Math.PI / 2],
    [-KEEP_HALF, 0, Math.PI / 2],
  ] as Array<[number, number, number]>) {
    shellBatch.add(wallGeo, C.stone, { position: [px, KEEP_Y + WALL_TOTAL / 2, pz], rotation: [0, ry, 0] })
    // 每层的腰线
    for (const key of ['hall', 'kitchen', 'library', 'bedchamber'] as const) {
      shellBatch.add(roundedBoxGeometry(KEEP_SIZE + 2.1, 0.26, WALL_T + 0.22, 0.04, 1), C.stoneShade, {
        position: [px, FLOOR_LEVELS[key] - 0.4, pz],
        rotation: [0, ry, 0],
      })
    }
    // 扶壁
    for (const s of [-1, 1]) {
      const localX = s * (KEEP_HALF - 0.9)
      const wx = px + (ry === 0 ? localX : 0)
      const wz = pz + (ry === 0 ? 0 : localX)
      shellBatch.add(roundedBoxGeometry(0.7, WALL_TOTAL - 1.2, WALL_T + 0.5, 0.06, 1), C.stoneShade, {
        position: [wx, KEEP_Y + (WALL_TOTAL - 1.2) / 2, wz],
        rotation: [0, ry, 0],
      })
    }
  }

  /* ---------------- 窗户 ---------------- */
  const windowSpec: Array<{ level: number; w: number; h: number; faces: number[] }> = [
    { level: FLOOR_LEVELS.dungeon, w: 0.62, h: 1.5, faces: [0, 1, 2, 3] },
    { level: FLOOR_LEVELS.hall, w: 1.5, h: 2.9, faces: [0, 1, 2, 3] },
    { level: FLOOR_LEVELS.kitchen, w: 1.15, h: 2.0, faces: [0, 1, 2, 3] },
    { level: FLOOR_LEVELS.library, w: 1.6, h: 3.0, faces: [0, 1, 2, 3] },
    { level: FLOOR_LEVELS.bedchamber, w: 1.3, h: 2.4, faces: [0, 1, 2, 3] },
  ]
  // face 0:+Z 1:-Z 2:+X 3:-X
  const faceTransform = (face: number, offset: number) => {
    const d = KEEP_HALF + WALL_T / 2
    switch (face) {
      case 0:
        return { pos: [offset, 0, d] as const, ry: 0 }
      case 1:
        return { pos: [offset, 0, -d] as const, ry: Math.PI }
      case 2:
        return { pos: [d, 0, offset] as const, ry: Math.PI / 2 }
      default:
        return { pos: [-d, 0, offset] as const, ry: -Math.PI / 2 }
    }
  }

  for (const spec of windowSpec) {
    const cy = spec.level + FLOOR_HEIGHT * 0.52
    const offsets = spec.w > 1.3 ? [-2.5, 0, 2.5] : spec.level === FLOOR_LEVELS.dungeon ? [-3.1, 3.1] : [-2.6, 2.6]
    for (const face of spec.faces) {
      for (const off of offsets) {
        // 正面中央留给大门与阳台
        if (face === 0 && off === 0 && spec.level === FLOOR_LEVELS.dungeon) continue
        if (face === 0 && off === 0 && spec.level === FLOOR_LEVELS.hall) continue
        const { pos, ry } = faceTransform(face, off)
        // 石质窗套
        shellBatch.add(archShapeGeometry(spec.w + 0.5, spec.h + 0.42, WALL_T + 0.34), C.stoneLight, {
          position: [pos[0], cy - spec.h / 2 + 0.1, pos[2]],
          rotation: [0, ry, 0],
        })
        // 发光玻璃
        shellGlow.add(archShapeGeometry(spec.w, spec.h, WALL_T + 0.5), C.windowGlow, {
          position: [pos[0], cy - spec.h / 2 + 0.1, pos[2]],
          rotation: [0, ry, 0],
        })
        // 窗棂
        shellBatch.add(roundedBoxGeometry(0.1, spec.h * 0.86, 0.12, 0.02, 1), C.timber, {
          position: [pos[0], cy + 0.05, pos[2]],
          rotation: [0, ry, 0],
        })
        // 窗台
        shellBatch.add(roundedBoxGeometry(spec.w + 0.72, 0.18, WALL_T + 0.6, 0.04, 1), C.stoneShade, {
          position: [pos[0], cy - spec.h / 2 - 0.06, pos[2]],
          rotation: [0, ry, 0],
        })
      }
    }
  }

  /* ---------------- 大门 ---------------- */
  {
    const doorH = 3.5
    const doorW = 2.5
    const dz = KEEP_HALF + WALL_T / 2
    const baseY = FLOOR_LEVELS.dungeon
    shellBatch.add(archShapeGeometry(doorW + 0.8, doorH + 0.5, WALL_T + 0.4), C.stoneLight, {
      position: [0, baseY, dz],
    })
    shellBatch.add(archShapeGeometry(doorW, doorH, 0.34), C.woodDark, {
      position: [0, baseY, dz + 0.1],
    })
    // 门上的铁带与铆钉
    for (let i = 0; i < 3; i++) {
      shellBatch.add(roundedBoxGeometry(doorW - 0.1, 0.16, 0.1, 0.02, 1), C.guardSteelDark, {
        position: [0, baseY + 0.7 + i * 1.0, dz + 0.3],
      })
    }
    for (const s of [-1, 1]) {
      shellBatch.add(new THREE.SphereGeometry(0.13, 6, 5), C.gold, {
        position: [s * 0.62, baseY + 1.6, dz + 0.34],
      })
    }
    // 门楣上的旗帜与纹章
    shellBatch.add(roundedBoxGeometry(2.0, 1.3, 0.14, 0.05, 1), C.clothRed, {
      position: [0, baseY + doorH + 1.35, dz + 0.2],
    })
    shellBatch.add(new THREE.CircleGeometry(0.42, 12), C.gold, {
      position: [0, baseY + doorH + 1.35, dz + 0.29],
    })
    shellBatch.add(new THREE.CircleGeometry(0.2, 10), C.clothBlue, {
      position: [0, baseY + doorH + 1.35, dz + 0.31],
    })
  }

  /* ---------------- 四角小塔（实体） ---------------- */
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      const x = sx * TURRET_OFFSET
      const z = sz * TURRET_OFFSET
      const h = TURRET_TOP - KEEP_Y
      solid.add(new THREE.CylinderGeometry(TURRET_R, TURRET_R + 0.28, h, 12), C.stone, {
        position: [x, KEEP_Y + h / 2, z],
      })
      // 牛腿承托
      solid.add(new THREE.CylinderGeometry(TURRET_R + 0.34, TURRET_R - 0.05, 0.7, 12), C.stoneShade, {
        position: [x, TURRET_TOP - 3.0, z],
      })
      // 塔顶雉堞
      for (let i = 0; i < 9; i++) {
        const a = (i / 9) * Math.PI * 2
        solid.add(merlonGeometry(0.5, 0.72, 0.42), i % 2 ? C.stone : C.stoneLight, {
          position: [x + Math.cos(a) * (TURRET_R + 0.1), TURRET_TOP - 2.3, z + Math.sin(a) * (TURRET_R + 0.1)],
          rotation: [0, -a, 0],
        })
      }
      solid.add(conicalRoofGeometry(TURRET_R + 0.62, 3.5, 10), C.roofRose, {
        position: [x, TURRET_TOP - 0.2, z],
      })
      solid.add(new THREE.SphereGeometry(0.2, 8, 6), C.gold, { position: [x, TURRET_TOP + 1.62, z] })
      solid.add(new THREE.CylinderGeometry(0.05, 0.05, 1.5, 4), C.woodDark, {
        position: [x, TURRET_TOP + 2.3, z],
      })
      // 塔身小窗（实体，夜里会亮）
      for (let f = 0; f < 3; f++) {
        const a = Math.atan2(sz, sx) + (f - 1) * 0.85
        const wy = KEEP_Y + 6 + f * 7.2
        solidGlow.add(archShapeGeometry(0.55, 1.25, 0.5), C.windowGlow, {
          position: [x + Math.cos(a) * (TURRET_R - 0.05), wy, z + Math.sin(a) * (TURRET_R - 0.05)],
          rotation: [0, -a + Math.PI / 2, 0],
        })
        solid.add(archShapeGeometry(0.78, 1.5, 0.34), C.stoneLight, {
          position: [x + Math.cos(a) * (TURRET_R + 0.02), wy, z + Math.sin(a) * (TURRET_R + 0.02)],
          rotation: [0, -a + Math.PI / 2, 0],
        })
      }
    }
  }

  /* ---------------- 顶部雉堞与屋顶平台 ---------------- */
  // 屋顶板属于外壳，剖视时可以俯视室内
  shellBatch.add(roundedBoxGeometry(KEEP_SIZE + 2.0, 0.34, KEEP_SIZE + 2.0, 0.05, 1), C.stoneCool, {
    position: [0, KEEP_TOP - 0.17, 0],
  })
  for (const [px, pz, ry, len] of [
    [0, KEEP_HALF + 0.95, 0, KEEP_SIZE + 2.4],
    [0, -KEEP_HALF - 0.95, 0, KEEP_SIZE + 2.4],
    [KEEP_HALF + 0.95, 0, Math.PI / 2, KEEP_SIZE + 2.4],
    [-KEEP_HALF - 0.95, 0, Math.PI / 2, KEEP_SIZE + 2.4],
  ] as Array<[number, number, number, number]>) {
    solid.add(roundedBoxGeometry(len, 0.5, 0.5, 0.05, 1), C.stoneShade, {
      position: [px, KEEP_TOP + 0.25, pz],
      rotation: [0, ry, 0],
    })
    const count = Math.floor(len / 1.05)
    for (let i = 0; i < count; i++) {
      const t = (i + 0.5) / count - 0.5
      const along = t * (len - 0.6)
      const wx = px + (ry === 0 ? along : 0)
      const wz = pz + (ry === 0 ? 0 : along)
      solid.add(merlonGeometry(0.62, 0.85, 0.5), i % 2 ? C.stone : C.stoneLight, {
        position: [wx, KEEP_TOP + 0.9, wz],
        rotation: [0, ry, 0],
      })
    }
  }

  /* ---------------- 屋顶瞭望亭（实体） ---------------- */
  {
    const hx = -2.4
    const hz = -2.4
    const hy = KEEP_TOP + 0.1
    solid.add(roundedBoxGeometry(2.6, 0.24, 2.6, 0.05, 1), C.woodDark, { position: [hx, hy + 0.12, hz] })
    for (const sx of [-1, 1]) {
      for (const sz of [-1, 1]) {
        solid.add(new THREE.CylinderGeometry(0.11, 0.13, 2.3, 6), C.wood, {
          position: [hx + sx * 1.1, hy + 1.3, hz + sz * 1.1],
        })
      }
    }
    solid.add(conicalRoofGeometry(2.05, 1.7, 4), C.roofSlate, {
      position: [hx, hy + 3.2, hz],
      rotation: [0, Math.PI / 4, 0],
    })
    solid.add(new THREE.SphereGeometry(0.17, 8, 6), C.gold, { position: [hx, hy + 4.1, hz] })
    // 亭子里的望远镜（指向星空）
    solid.add(new THREE.CylinderGeometry(0.13, 0.19, 1.5, 8), C.goldDeep, {
      position: [hx + 0.3, hy + 1.35, hz + 0.3],
      rotation: [Math.PI / 3.1, 0.6, 0],
    })
    solid.add(new THREE.CylinderGeometry(0.06, 0.06, 1.0, 5), C.woodDark, { position: [hx + 0.1, hy + 0.7, hz + 0.1] })
  }

  /* ---------------- 烟囱 ---------------- */
  {
    const cx = 2.6
    const cz = -KEEP_HALF - 0.5
    solid.add(roundedBoxGeometry(1.3, KEEP_TOP - KEEP_Y + 3.2, 1.1, 0.06, 1), C.stoneShade, {
      position: [cx, KEEP_Y + (KEEP_TOP - KEEP_Y + 3.2) / 2 - 1.0, cz],
    })
    solid.add(roundedBoxGeometry(1.6, 0.34, 1.4, 0.06, 1), C.stoneDark, {
      position: [cx, KEEP_TOP + 2.3, cz],
    })
    for (const s of [-1, 1]) {
      solid.add(new THREE.CylinderGeometry(0.24, 0.28, 0.9, 8), C.roofDeep, {
        position: [cx + s * 0.36, KEEP_TOP + 2.9, cz],
      })
    }
  }

  /* ---------------- 悬挂的旗帜（会飘动） ---------------- */
  const banners: THREE.Mesh[] = []
  for (const [bx, bz, ry] of [
    [KEEP_HALF + WALL_T / 2 + 0.06, 3.2, Math.PI / 2],
    [-KEEP_HALF - WALL_T / 2 - 0.06, 3.2, -Math.PI / 2],
  ] as Array<[number, number, number]>) {
    const geo = clothGeometry(1.5, 3.4, 9, 5, 0.16)
    const colors = new Float32Array(geo.getAttribute('position').count * 3)
    const col = new THREE.Color(C.clothBlue)
    const col2 = new THREE.Color(C.gold)
    for (let i = 0; i < colors.length / 3; i++) {
      const y = (geo.getAttribute('position') as THREE.BufferAttribute).getY(i)
      const use = y > 0.4 ? col2 : col
      colors[i * 3] = use.r
      colors[i * 3 + 1] = use.g
      colors[i * 3 + 2] = use.b
    }
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    const mat = new THREE.MeshToonMaterial({ vertexColors: true, side: THREE.DoubleSide })
    const mesh = new THREE.Mesh(geo, mat)
    mesh.position.set(bx, FLOOR_LEVELS.library + 1.2, bz)
    mesh.rotation.y = ry
    mesh.castShadow = true
    shell.add(mesh)
    banners.push(mesh)
  }

  /* ---------------- 组装 ---------------- */
  const solidMesh = solid.build(solidMat, { mottle: 0.07, seed: 9 })
  if (solidMesh) group.add(solidMesh)
  const shellMesh = shellBatch.build(shellMat, { mottle: 0.06, seed: 12 })
  if (shellMesh) {
    shellMesh.renderOrder = 2
    shell.add(shellMesh)
  }
  const shellGlowMesh = shellGlow.build(shellGlowMat)
  if (shellGlowMesh) {
    shellGlowMesh.renderOrder = 2
    shell.add(shellGlowMesh)
  }
  const solidGlowMesh = solidGlow.build(solidGlowMat)
  if (solidGlowMesh) group.add(solidGlowMesh)

  /* ---------------- 状态 ---------------- */
  let night = 0
  let cutawayTarget = 0
  let cutaway = 0

  return {
    group,
    shell,
    update(time, delta) {
      // 剖视淡入淡出
      cutaway = lerp(cutaway, cutawayTarget, 1 - Math.pow(0.0015, delta))
      const opacity = 1 - cutaway * 0.92
      for (const m of shellMaterials) {
        m.opacity = opacity
        m.depthWrite = opacity > 0.6
        m.transparent = true
      }
      shell.visible = opacity > 0.02

      // 旗帜飘动
      for (let b = 0; b < banners.length; b++) {
        const mesh = banners[b]
        const pos = mesh.geometry.getAttribute('position') as THREE.BufferAttribute
        for (let i = 0; i < pos.count; i++) {
          const x = pos.getX(i)
          const y = pos.getY(i)
          const t = (x + 0.75) / 1.5
          pos.setZ(i, Math.sin(t * 5.2 + time * 2.4 + b) * 0.17 * t + Math.sin(y * 1.4 + time * 1.7) * 0.05 * t)
        }
        pos.needsUpdate = true
        mesh.geometry.computeVertexNormals()
      }

      const glow = 0.12 + night * 1.5
      shellGlowMat.emissiveIntensity = glow
      solidGlowMat.emissiveIntensity = glow
    },
    setNight(amount) {
      night = amount
    },
    setCutaway(on) {
      cutawayTarget = on ? 1 : 0
    },
  }
}

export { KEEP_TOP, TURRET_TOP, WALL_TOTAL }
export const KEEP_DOOR_POS = new THREE.Vector3(0, FLOOR_LEVELS.dungeon, KEEP_HALF + 1.4)
export const KEEP_ROOF_POS = new THREE.Vector3(0, KEEP_TOP + 1.2, 0)
export const KEEP_CENTER = new THREE.Vector3(0, KEEP_Y + WALL_TOTAL / 2, 0)
