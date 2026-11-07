import * as THREE from 'three'
import { C } from './palette'
import { FLOOR_HEIGHT, FLOOR_LEVELS, KEEP_SIZE } from './layout'
import { Batcher, archShapeGeometry, mulberry32, roundedBoxGeometry, toonMaterial, tubeAlong } from './utils'

/** 室内可用半径（墙内表面）。 */
const ROOM_HALF = KEEP_SIZE / 2 - 0.95

export type RoomSpot = { pos: THREE.Vector3; face: number }

/** 各层的人物落位点，供 characters 模块摆放角色。 */
export const ROOM_SPOTS: Record<string, RoomSpot> = {
  // 地牢
  dungeonGuard: { pos: new THREE.Vector3(2.6, FLOOR_LEVELS.dungeon, 2.4), face: Math.PI },
  // 大厅
  king: { pos: new THREE.Vector3(0, FLOOR_LEVELS.hall + 1.32, -3.3), face: 0 },
  hallGuardL: { pos: new THREE.Vector3(-1.75, FLOOR_LEVELS.hall + 0.73, -3.5), face: 0 },
  hallGuardR: { pos: new THREE.Vector3(1.75, FLOOR_LEVELS.hall + 0.73, -3.5), face: 0 },
  minstrel: { pos: new THREE.Vector3(3.2, FLOOR_LEVELS.hall, 0.4), face: -Math.PI / 2 },
  servantA: { pos: new THREE.Vector3(-1.2, FLOOR_LEVELS.hall, 0.1), face: Math.PI },
  servantB: { pos: new THREE.Vector3(1.6, FLOOR_LEVELS.hall, -0.9), face: 0 },
  // 厨房
  cook: { pos: new THREE.Vector3(-0.6, FLOOR_LEVELS.kitchen, -1.5), face: 0 },
  scullion: { pos: new THREE.Vector3(2.9, FLOOR_LEVELS.kitchen, 1.9), face: -Math.PI / 2 },
  // 书房
  astronomer: { pos: new THREE.Vector3(1.4, FLOOR_LEVELS.library, -1.2), face: 0.4 },
  // 寝室：小王子坐在窗座上望着星空
  prince: { pos: new THREE.Vector3(0.2, FLOOR_LEVELS.bedchamber + 0.66, ROOM_HALF - 0.55), face: Math.PI },
  fox: { pos: new THREE.Vector3(1.3, FLOOR_LEVELS.bedchamber, 1.9), face: 2.4 },
  // 屋顶
  roofPrince: { pos: new THREE.Vector3(2.6, FLOOR_LEVELS.roof + 0.05, 3.4), face: Math.PI / 2 },
}

export type InteriorHandle = {
  group: THREE.Group
  update: (time: number, delta: number) => void
  setNight: (amount: number) => void
}

export function createInterior(): InteriorHandle {
  const random = mulberry32(90210)
  const group = new THREE.Group()
  group.name = 'interior'

  const mat = toonMaterial({})
  const glowMat = toonMaterial({ emissive: C.lampGlow, emissiveIntensity: 0.2 })
  const batch = new Batcher()
  const glow = new Batcher()
  const glassBatch = new Batcher()

  /* ================= 地牢 ================= */
  {
    const y = FLOOR_LEVELS.dungeon
    // 石板地与干草
    batch.add(roundedBoxGeometry(ROOM_HALF * 2, 0.08, ROOM_HALF * 2, 0.02, 1), C.stoneDark, {
      position: [0, y + 0.04, 0],
    })
    for (let i = 0; i < 40; i++) {
      batch.add(new THREE.CylinderGeometry(0.03, 0.03, 0.4, 3), C.grassDry, {
        position: [(random() - 0.5) * 7, y + 0.14, (random() - 0.5) * 7],
        rotation: [Math.PI / 2 + (random() - 0.5), random() * 3, 0],
      })
    }
    // 两间牢房（-X 墙一侧）
    for (let c = 0; c < 2; c++) {
      const cz = 0.4 + c * 2.6
      // 隔墙
      batch.add(roundedBoxGeometry(0.3, FLOOR_HEIGHT - 0.6, 2.4, 0.04, 1), C.stoneShade, {
        position: [-ROOM_HALF + 1.35, y + (FLOOR_HEIGHT - 0.6) / 2, cz - 1.25],
      })
      // 铁栏
      for (let i = 0; i < 7; i++) {
        batch.add(roundedBoxGeometry(0.11, FLOOR_HEIGHT - 0.7, 0.11, 0.02, 1), C.guardSteelDark, {
          position: [-ROOM_HALF + 2.55, y + (FLOOR_HEIGHT - 0.7) / 2, cz - 1.0 + i * 0.34],
        })
      }
      for (let k = 0; k < 3; k++) {
        batch.add(roundedBoxGeometry(0.1, 0.1, 2.3, 0.02, 1), C.guardSteel, {
          position: [-ROOM_HALF + 2.55, y + 0.5 + k * 1.35, cz + 0.02],
        })
      }
      // 牢门与锁
      batch.add(roundedBoxGeometry(0.14, 1.9, 0.9, 0.04, 1), C.woodDark, {
        position: [-ROOM_HALF + 2.55, y + 0.95, cz + 1.5],
      })
      batch.add(new THREE.TorusGeometry(0.16, 0.05, 4, 10), C.gold, {
        position: [-ROOM_HALF + 2.62, y + 1.1, cz + 1.5],
        rotation: [0, Math.PI / 2, 0],
      })
      // 草铺与破碗
      batch.add(roundedBoxGeometry(1.5, 0.22, 0.85, 0.08, 1), C.grassDry, {
        position: [-ROOM_HALF + 0.9, y + 0.16, cz],
      })
      batch.add(new THREE.CylinderGeometry(0.14, 0.1, 0.12, 8), C.stoneCool, {
        position: [-ROOM_HALF + 1.9, y + 0.14, cz + 0.5],
      })
    }
    // 墙上的锁链
    for (let i = 0; i < 3; i++) {
      const cz = -1.4 + i * 1.1
      const pts: THREE.Vector3[] = []
      for (let k = 0; k <= 6; k++) {
        const t = k / 6
        pts.push(new THREE.Vector3(-ROOM_HALF + 0.25, y + 2.4 - t * 1.5 - Math.sin(t * Math.PI) * 0.35, cz + t * 0.2))
      }
      batch.add(tubeAlong(pts, 0.045, 18, 4), C.guardSteelDark)
      batch.add(new THREE.TorusGeometry(0.19, 0.055, 4, 10), C.guardSteel, {
        position: [-ROOM_HALF + 0.28, y + 2.4, cz],
        rotation: [0, Math.PI / 2, 0],
      })
    }
    // 酒窖：木桶与酒架
    for (let i = 0; i < 4; i++) {
      const bx = 1.4 + (i % 2) * 1.15
      const bz = -3.1 + Math.floor(i / 2) * 1.2
      batch.add(new THREE.CylinderGeometry(0.52, 0.52, 0.95, 12), C.wood, {
        position: [bx, y + 0.5, bz],
        rotation: [Math.PI / 2, 0, 0],
      })
      for (const s of [-1, 1]) {
        batch.add(new THREE.TorusGeometry(0.53, 0.05, 4, 12), C.guardSteelDark, {
          position: [bx, y + 0.5, bz + s * 0.28],
        })
      }
    }
    for (let i = 0; i < 3; i++) {
      batch.add(roundedBoxGeometry(2.2, 0.12, 0.5, 0.03, 1), C.woodDark, {
        position: [2.6, y + 0.7 + i * 0.75, -0.4],
      })
      for (let b = 0; b < 5; b++) {
        batch.add(new THREE.CylinderGeometry(0.09, 0.07, 0.34, 6), b % 2 ? C.rockDeep : C.leafDeep, {
          position: [1.8 + b * 0.4, y + 0.94 + i * 0.75, -0.4],
          rotation: [Math.PI / 2.4, 0, 0],
        })
      }
    }
    // 板条箱与工具台
    for (let i = 0; i < 3; i++) {
      batch.add(roundedBoxGeometry(0.85, 0.75, 0.85, 0.05, 1), C.woodLight, {
        position: [3.0 + (i % 2) * 0.5, y + 0.38 + Math.floor(i / 2) * 0.76, 2.6 - i * 0.35],
      })
      batch.add(roundedBoxGeometry(0.9, 0.1, 0.1, 0.02, 1), C.woodDark, {
        position: [3.0 + (i % 2) * 0.5, y + 0.38 + Math.floor(i / 2) * 0.76, 2.6 - i * 0.35 + 0.44],
      })
    }
    batch.add(roundedBoxGeometry(2.0, 0.16, 0.85, 0.04, 1), C.wood, { position: [2.4, y + 0.95, 0.9] })
    for (const s of [-1, 1]) {
      batch.add(roundedBoxGeometry(0.14, 0.95, 0.7, 0.03, 1), C.woodDark, { position: [2.4 + s * 0.85, y + 0.48, 0.9] })
    }
    // 工具
    for (let i = 0; i < 4; i++) {
      batch.add(new THREE.CylinderGeometry(0.035, 0.035, 0.6, 4), C.woodDark, {
        position: [1.8 + i * 0.35, y + 1.2, 0.9],
        rotation: [0, 0, 0.2],
      })
      batch.add(roundedBoxGeometry(0.16, 0.2, 0.08, 0.02, 1), C.guardSteel, {
        position: [1.8 + i * 0.35, y + 1.55, 0.9],
      })
    }
    // 通往外面的暗道拱门
    batch.add(archShapeGeometry(1.7, 2.6, 1.0), C.rockDeep, { position: [1.2, y, -ROOM_HALF + 0.1] })
    batch.add(archShapeGeometry(1.3, 2.2, 1.2), C.ink, { position: [1.2, y, -ROOM_HALF + 0.05] })
    // 壁灯
    for (const [tx, tz] of [
      [ROOM_HALF - 0.2, 1.8],
      [ROOM_HALF - 0.2, -1.8],
      [0.4, -ROOM_HALF + 0.2],
    ] as Array<[number, number]>) {
      batch.add(new THREE.CylinderGeometry(0.06, 0.08, 0.55, 5), C.woodDark, { position: [tx, y + 2.3, tz] })
      glow.add(new THREE.SphereGeometry(0.17, 6, 5), C.fireGlow, { position: [tx, y + 2.62, tz] })
      batch.add(new THREE.TorusGeometry(0.14, 0.04, 4, 10), C.guardSteelDark, { position: [tx, y + 2.1, tz] })
    }
    // 悬挂的鸟笼
    const cageX = -3.1
    const cageZ = 1.6
    const cageY = y + 2.5
    batch.add(new THREE.CylinderGeometry(0.03, 0.03, 1.4, 4), C.guardSteelDark, { position: [cageX, y + 3.6, cageZ] })
    batch.add(new THREE.CylinderGeometry(0.62, 0.62, 0.08, 12), C.goldDeep, { position: [cageX, cageY - 0.55, cageZ] })
    batch.add(new THREE.SphereGeometry(0.62, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), C.goldDeep, {
      position: [cageX, cageY - 0.55, cageZ],
      scale: [1, 1.25, 1],
    })
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2
      batch.add(new THREE.CylinderGeometry(0.022, 0.022, 1.5, 3), C.gold, {
        position: [cageX + Math.cos(a) * 0.6, cageY + 0.15, cageZ + Math.sin(a) * 0.6],
      })
    }
    glow.add(new THREE.SphereGeometry(0.19, 8, 6), C.gold, { position: [cageX, cageY + 0.1, cageZ] })
    glow.add(new THREE.SphereGeometry(0.13, 6, 5), C.gold, { position: [cageX, cageY + 0.32, cageZ + 0.05] })
    batch.add(new THREE.ConeGeometry(0.07, 0.16, 4), C.gold, {
      position: [cageX - 0.16, cageY + 0.34, cageZ],
      rotation: [0, 0, Math.PI / 2.4],
    })
  }

  /* ================= 大厅 ================= */
  {
    const y = FLOOR_LEVELS.hall
    // 木地板
    for (let i = 0; i < 12; i++) {
      batch.add(roundedBoxGeometry(ROOM_HALF * 2, 0.09, 0.66, 0.02, 1), i % 2 ? C.wood : C.woodLight, {
        position: [0, y + 0.05, -ROOM_HALF + 0.35 + i * 0.7],
      })
    }
    // 长地毯
    batch.add(roundedBoxGeometry(2.2, 0.06, 6.4, 0.02, 1), C.clothRed, { position: [0, y + 0.11, 0.2] })
    batch.add(roundedBoxGeometry(1.8, 0.07, 6.0, 0.02, 1), C.gold, { position: [0, y + 0.13, 0.2] })
    batch.add(roundedBoxGeometry(1.4, 0.08, 5.6, 0.02, 1), C.clothRed, { position: [0, y + 0.15, 0.2] })

    // 壁炉
    const fy = y
    const fz = -ROOM_HALF + 0.55
    batch.add(roundedBoxGeometry(3.4, 3.6, 1.1, 0.06, 1), C.stoneShade, { position: [0, fy + 1.8, fz] })
    batch.add(archShapeGeometry(2.0, 2.3, 1.2), C.stone, { position: [0, fy, fz - 0.05] })
    batch.add(archShapeGeometry(1.6, 1.9, 1.3), C.ink, { position: [0, fy, fz - 0.1] })
    batch.add(roundedBoxGeometry(3.8, 0.28, 1.4, 0.05, 1), C.stoneLight, { position: [0, fy + 2.5, fz] })
    batch.add(roundedBoxGeometry(3.0, 0.9, 0.9, 0.05, 1), C.stone, { position: [0, fy + 3.1, fz] })
    // 壁炉台上的烛台与小物
    for (const s of [-1, 1]) {
      batch.add(new THREE.CylinderGeometry(0.11, 0.15, 0.4, 8), C.gold, { position: [s * 1.3, fy + 2.85, fz] })
      glow.add(new THREE.SphereGeometry(0.09, 6, 5), C.lampGlow, { position: [s * 1.3, fy + 3.12, fz] })
    }
    batch.add(roundedBoxGeometry(0.5, 0.42, 0.3, 0.05, 1), C.goldDeep, { position: [0, fy + 2.85, fz] })
    // 柴堆
    for (let i = 0; i < 5; i++) {
      batch.add(new THREE.CylinderGeometry(0.11, 0.11, 0.9, 5), C.woodDark, {
        position: [-1.9 + (i % 3) * 0.24, fy + 0.14 + Math.floor(i / 3) * 0.24, fz + 0.9],
        rotation: [Math.PI / 2, 0, 0],
      })
    }

    // 王座高台
    batch.add(roundedBoxGeometry(4.6, 0.62, 2.4, 0.06, 1), C.stoneShade, { position: [0, y + 0.31, -2.9] })
    batch.add(roundedBoxGeometry(4.8, 0.14, 2.6, 0.04, 1), C.stoneLight, { position: [0, y + 0.66, -2.9] })
    // 王座
    batch.add(roundedBoxGeometry(1.3, 0.2, 1.1, 0.05, 1), C.woodDark, { position: [0, y + 1.15, -3.35] })
    batch.add(roundedBoxGeometry(1.3, 2.6, 0.22, 0.06, 1), C.woodDark, { position: [0, y + 2.3, -3.85] })
    for (const s of [-1, 1]) {
      batch.add(roundedBoxGeometry(0.2, 1.5, 1.1, 0.05, 1), C.woodDark, { position: [s * 0.62, y + 1.7, -3.35] })
      batch.add(new THREE.SphereGeometry(0.15, 8, 6), C.gold, { position: [s * 0.62, y + 2.5, -3.35] })
      batch.add(roundedBoxGeometry(0.18, 1.05, 0.18, 0.03, 1), C.woodDark, { position: [s * 0.55, y + 0.72, -2.9] })
    }
    batch.add(roundedBoxGeometry(1.05, 0.22, 0.9, 0.06, 1), C.clothRed, { position: [0, y + 1.32, -3.3] })
    batch.add(roundedBoxGeometry(0.95, 1.5, 0.14, 0.05, 1), C.kingPurple, { position: [0, y + 2.1, -3.7] })
    batch.add(new THREE.CircleGeometry(0.3, 12), C.gold, { position: [0, y + 2.6, -3.62] })
    // 王座华盖
    for (const s of [-1, 1]) {
      batch.add(new THREE.CylinderGeometry(0.09, 0.11, 3.4, 6), C.goldDeep, { position: [s * 0.95, y + 2.9, -3.8] })
    }
    batch.add(roundedBoxGeometry(2.4, 0.18, 1.3, 0.05, 1), C.kingPurple, { position: [0, y + 4.0, -3.4] })
    for (let i = 0; i < 7; i++) {
      batch.add(new THREE.ConeGeometry(0.09, 0.3, 4), C.gold, { position: [-0.9 + i * 0.3, y + 3.78, -2.8] })
    }

    // 两张长桌与长凳
    for (const tz of [-1.5, 1.7]) {
      batch.add(roundedBoxGeometry(5.4, 0.18, 1.15, 0.04, 1), C.woodLight, { position: [0, y + 1.0, tz] })
      for (const s of [-1, 1]) {
        batch.add(roundedBoxGeometry(0.22, 1.0, 0.9, 0.04, 1), C.woodDark, { position: [s * 2.3, y + 0.5, tz] })
      }
      for (const side of [-1, 1]) {
        batch.add(roundedBoxGeometry(4.8, 0.14, 0.42, 0.04, 1), C.wood, {
          position: [0, y + 0.62, tz + side * 1.05],
        })
        for (const s of [-1, 1]) {
          batch.add(roundedBoxGeometry(0.16, 0.62, 0.36, 0.03, 1), C.woodDark, {
            position: [s * 1.9, y + 0.31, tz + side * 1.05],
          })
        }
      }
      // 桌面：盘子、酒杯、食物、蜡烛
      for (let i = 0; i < 7; i++) {
        const px = -2.4 + i * 0.8
        batch.add(new THREE.CylinderGeometry(0.24, 0.2, 0.05, 10), C.stoneCool, { position: [px, y + 1.12, tz - 0.2] })
        batch.add(new THREE.CylinderGeometry(0.09, 0.13, 0.26, 8), C.gold, { position: [px + 0.3, y + 1.22, tz + 0.24] })
        if (i % 2 === 0) {
          batch.add(new THREE.IcosahedronGeometry(0.17, 0), i % 4 === 0 ? C.clothRed : C.gold, {
            position: [px, y + 1.24, tz - 0.2],
          })
        }
      }
      batch.add(roundedBoxGeometry(0.9, 0.34, 0.55, 0.14, 1), C.roofDeep, { position: [0.6, y + 1.26, tz] })
      batch.add(roundedBoxGeometry(0.7, 0.24, 0.4, 0.1, 1), C.grassDry, { position: [-1.4, y + 1.22, tz + 0.1] })
      for (const cx of [-2.0, 2.0]) {
        batch.add(new THREE.CylinderGeometry(0.13, 0.17, 0.34, 8), C.goldDeep, { position: [cx, y + 1.26, tz] })
        glow.add(new THREE.SphereGeometry(0.1, 6, 5), C.lampGlow, { position: [cx, y + 1.5, tz] })
      }
    }

    // 吊灯
    for (const cx of [-1.6, 1.6]) {
      const cy = y + FLOOR_HEIGHT - 0.9
      batch.add(new THREE.CylinderGeometry(0.03, 0.03, 0.9, 4), C.guardSteelDark, { position: [cx, cy + 0.45, 0.1] })
      batch.add(new THREE.TorusGeometry(0.62, 0.07, 5, 16), C.goldDeep, { position: [cx, cy, 0.1] })
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2
        batch.add(new THREE.CylinderGeometry(0.05, 0.07, 0.26, 6), C.clothCream, {
          position: [cx + Math.cos(a) * 0.62, cy + 0.2, 0.1 + Math.sin(a) * 0.62],
        })
        glow.add(new THREE.SphereGeometry(0.08, 6, 5), C.lampGlow, {
          position: [cx + Math.cos(a) * 0.62, cy + 0.38, 0.1 + Math.sin(a) * 0.62],
        })
      }
    }

    // 挂毯
    for (const [tx, tz, ry] of [
      [-ROOM_HALF + 0.12, -1.2, Math.PI / 2],
      [-ROOM_HALF + 0.12, 1.6, Math.PI / 2],
      [ROOM_HALF - 0.12, -1.2, -Math.PI / 2],
      [ROOM_HALF - 0.12, 1.6, -Math.PI / 2],
    ] as Array<[number, number, number]>) {
      batch.add(roundedBoxGeometry(1.5, 2.6, 0.08, 0.03, 1), C.clothBlue, {
        position: [tx, y + 2.3, tz],
        rotation: [0, ry, 0],
      })
      batch.add(roundedBoxGeometry(1.5, 0.5, 0.1, 0.03, 1), C.gold, {
        position: [tx, y + 1.3, tz],
        rotation: [0, ry, 0],
      })
      batch.add(new THREE.CircleGeometry(0.36, 12), C.clothRed, {
        position: [tx + (ry > 0 ? 0.06 : -0.06), y + 2.6, tz],
        rotation: [0, ry, 0],
      })
      batch.add(roundedBoxGeometry(1.7, 0.12, 0.14, 0.03, 1), C.woodDark, {
        position: [tx, y + 3.62, tz],
        rotation: [0, ry, 0],
      })
    }

    // 边柜与盾牌
    batch.add(roundedBoxGeometry(2.4, 1.0, 0.7, 0.05, 1), C.woodDark, { position: [ROOM_HALF - 0.5, y + 0.5, -2.6] })
    batch.add(roundedBoxGeometry(2.5, 0.12, 0.8, 0.04, 1), C.wood, { position: [ROOM_HALF - 0.5, y + 1.05, -2.6] })
    for (let i = 0; i < 3; i++) {
      batch.add(new THREE.CylinderGeometry(0.16, 0.12, 0.34, 8), C.gold, {
        position: [ROOM_HALF - 1.2 + i * 0.7, y + 1.28, -2.6],
      })
    }
    for (let i = 0; i < 3; i++) {
      batch.add(new THREE.CircleGeometry(0.42, 12), i % 2 ? C.guardSteel : C.clothRed, {
        position: [ROOM_HALF - 0.1, y + 2.9, -0.6 + i * 1.1],
        rotation: [0, -Math.PI / 2, 0],
      })
      batch.add(new THREE.TorusGeometry(0.44, 0.06, 4, 14), C.goldDeep, {
        position: [ROOM_HALF - 0.1, y + 2.9, -0.6 + i * 1.1],
        rotation: [0, Math.PI / 2, 0],
      })
    }
  }

  /* ================= 厨房与面包房 ================= */
  {
    const y = FLOOR_LEVELS.kitchen
    for (let i = 0; i < 12; i++) {
      batch.add(roundedBoxGeometry(ROOM_HALF * 2, 0.08, 0.66, 0.02, 1), i % 2 ? C.stoneCool : C.stoneDark, {
        position: [0, y + 0.04, -ROOM_HALF + 0.35 + i * 0.7],
      })
    }
    // 大灶
    const fz = -ROOM_HALF + 0.6
    batch.add(roundedBoxGeometry(3.6, 3.0, 1.3, 0.06, 1), C.stoneShade, { position: [-0.6, y + 1.5, fz] })
    batch.add(archShapeGeometry(2.2, 2.0, 1.4), C.stone, { position: [-0.6, y, fz - 0.05] })
    batch.add(archShapeGeometry(1.8, 1.6, 1.5), C.ink, { position: [-0.6, y, fz - 0.1] })
    batch.add(roundedBoxGeometry(4.0, 0.26, 1.6, 0.05, 1), C.stoneLight, { position: [-0.6, y + 3.05, fz] })
    // 灶上的大锅
    batch.add(new THREE.SphereGeometry(0.62, 12, 8, 0, Math.PI * 2, 0, Math.PI / 1.6), C.guardSteelDark, {
      position: [-0.6, y + 1.15, fz + 0.15],
      rotation: [Math.PI, 0, 0],
    })
    batch.add(new THREE.TorusGeometry(0.6, 0.06, 4, 14), C.guardSteel, {
      position: [-0.6, y + 1.15, fz + 0.15],
      rotation: [Math.PI / 2, 0, 0],
    })
    batch.add(new THREE.CylinderGeometry(0.05, 0.05, 1.5, 5), C.guardSteelDark, {
      position: [-0.6, y + 1.9, fz + 0.15],
    })
    // 烤面包的穹顶炉
    batch.add(new THREE.SphereGeometry(1.05, 14, 10, 0, Math.PI * 2, 0, Math.PI / 2), C.stone, {
      position: [2.6, y + 0.1, -ROOM_HALF + 0.9],
      scale: [1, 0.85, 1],
    })
    batch.add(archShapeGeometry(0.8, 0.75, 0.6), C.ink, { position: [2.6, y + 0.1, -ROOM_HALF + 0.1] })
    batch.add(new THREE.CylinderGeometry(0.3, 0.34, 1.6, 8), C.stoneShade, {
      position: [2.6, y + 1.5, -ROOM_HALF + 0.7],
    })
    // 长工作台
    batch.add(roundedBoxGeometry(4.2, 0.18, 1.3, 0.04, 1), C.woodLight, { position: [0.4, y + 1.05, 1.4] })
    for (const s of [-1, 1]) {
      batch.add(roundedBoxGeometry(0.2, 1.05, 1.1, 0.04, 1), C.woodDark, { position: [0.4 + s * 1.8, y + 0.52, 1.4] })
    }
    // 面包、擀面杖、面粉袋
    for (let i = 0; i < 6; i++) {
      batch.add(new THREE.SphereGeometry(0.2 + (i % 3) * 0.05, 8, 6), C.gold, {
        position: [-1.1 + i * 0.55, y + 1.28, 1.25 + (i % 2) * 0.3],
        scale: [1.3, 0.72, 1],
      })
      batch.add(roundedBoxGeometry(0.34, 0.1, 0.1, 0.02, 1), C.roofDeep, {
        position: [-1.1 + i * 0.55, y + 1.4, 1.25 + (i % 2) * 0.3],
      })
    }
    batch.add(new THREE.CylinderGeometry(0.09, 0.09, 0.9, 8), C.woodLight, {
      position: [1.6, y + 1.2, 1.7],
      rotation: [0, 0, Math.PI / 2],
    })
    for (let i = 0; i < 3; i++) {
      batch.add(roundedBoxGeometry(0.6, 0.85, 0.5, 0.16, 1), C.clothCream, {
        position: [-1.6 + i * 0.65, y + 0.42, 2.9],
      })
    }
    // 悬挂的铜锅与香草
    for (let i = 0; i < 7; i++) {
      const px = -2.4 + i * 0.72
      batch.add(new THREE.CylinderGeometry(0.02, 0.02, 0.5 + (i % 3) * 0.16, 3), C.guardSteelDark, {
        position: [px, y + FLOOR_HEIGHT - 0.5, -0.6],
      })
      batch.add(new THREE.SphereGeometry(0.24, 10, 7, 0, Math.PI * 2, 0, Math.PI / 1.7), i % 2 ? C.roofDeep : C.goldDeep, {
        position: [px, y + FLOOR_HEIGHT - 0.95 - (i % 3) * 0.16, -0.6],
        rotation: [Math.PI, 0, 0],
      })
    }
    for (let i = 0; i < 5; i++) {
      const px = -1.6 + i * 0.8
      batch.add(new THREE.CylinderGeometry(0.02, 0.02, 0.4, 3), C.woodDark, {
        position: [px, y + FLOOR_HEIGHT - 0.45, 2.2],
      })
      for (let k = 0; k < 4; k++) {
        batch.add(new THREE.ConeGeometry(0.07, 0.3, 4), k % 2 ? C.leafDeep : C.grassDry, {
          position: [px + (k - 1.5) * 0.07, y + FLOOR_HEIGHT - 0.85, 2.2],
          rotation: [Math.PI, 0, 0],
        })
      }
    }
    // 转烤架
    batch.add(new THREE.CylinderGeometry(0.05, 0.05, 2.4, 5), C.guardSteelDark, {
      position: [-0.6, y + 0.75, fz + 0.75],
      rotation: [0, 0, Math.PI / 2],
    })
    batch.add(roundedBoxGeometry(0.95, 0.55, 0.55, 0.2, 2), C.roofDeep, { position: [-0.6, y + 0.75, fz + 0.75] })
    batch.add(new THREE.TorusGeometry(0.42, 0.05, 4, 12), C.guardSteel, {
      position: [0.5, y + 0.75, fz + 0.75],
      rotation: [0, Math.PI / 2, 0],
    })
    // 架子与罐子
    for (let i = 0; i < 3; i++) {
      batch.add(roundedBoxGeometry(2.6, 0.12, 0.55, 0.03, 1), C.wood, {
        position: [ROOM_HALF - 0.4, y + 1.2 + i * 0.85, 0.6],
      })
      for (let b = 0; b < 5; b++) {
        batch.add(new THREE.CylinderGeometry(0.13, 0.11, 0.32, 8), b % 2 ? C.roofDeep : C.leafDeep, {
          position: [ROOM_HALF - 1.4 + b * 0.5, y + 1.42 + i * 0.85, 0.6],
        })
      }
    }
    // 水桶与奶油桶
    batch.add(new THREE.CylinderGeometry(0.42, 0.36, 0.85, 10), C.wood, { position: [-3.0, y + 0.42, 2.6] })
    batch.add(new THREE.TorusGeometry(0.42, 0.05, 4, 12), C.guardSteelDark, {
      position: [-3.0, y + 0.6, 2.6],
      rotation: [Math.PI / 2, 0, 0],
    })
    batch.add(new THREE.CylinderGeometry(0.3, 0.34, 1.0, 10), C.woodLight, { position: [2.9, y + 0.5, 2.9] })
    batch.add(new THREE.CylinderGeometry(0.07, 0.07, 0.6, 5), C.woodDark, { position: [2.9, y + 1.2, 2.9] })
    // 猫窝与小凳
    batch.add(roundedBoxGeometry(0.6, 0.5, 0.6, 0.06, 1), C.wood, { position: [3.1, y + 0.25, 0.4] })
    batch.add(roundedBoxGeometry(0.75, 0.16, 0.75, 0.06, 1), C.clothRed, { position: [3.1, y + 0.56, 0.4] })
  }

  /* ================= 书房与星象室 ================= */
  {
    const y = FLOOR_LEVELS.library
    for (let i = 0; i < 12; i++) {
      batch.add(roundedBoxGeometry(ROOM_HALF * 2, 0.08, 0.66, 0.02, 1), i % 2 ? C.woodDark : C.wood, {
        position: [0, y + 0.04, -ROOM_HALF + 0.35 + i * 0.7],
      })
    }
    // 书架（沿 -Z 与 ±X 墙）
    const bookColors = [C.clothRed, C.clothBlue, C.leafDeep, C.gold, C.kingPurple, C.roofDeep, C.timber]
    const shelves: Array<{ x: number; z: number; ry: number; w: number }> = [
      { x: -1.4, z: -ROOM_HALF + 0.42, ry: 0, w: 3.4 },
      { x: 2.0, z: -ROOM_HALF + 0.42, ry: 0, w: 2.6 },
      { x: -ROOM_HALF + 0.42, z: 1.4, ry: Math.PI / 2, w: 3.6 },
      { x: ROOM_HALF - 0.42, z: -1.0, ry: Math.PI / 2, w: 3.2 },
    ]
    for (const sh of shelves) {
      const cos = Math.cos(sh.ry)
      const sin = Math.sin(sh.ry)
      const put = (lx: number, ly: number, lz: number, geo: THREE.BufferGeometry, color: number) => {
        batch.add(geo, color, {
          position: [sh.x + lx * cos + lz * sin, y + ly, sh.z - lx * sin + lz * cos],
          rotation: [0, sh.ry, 0],
        })
      }
      put(0, 1.6, 0, roundedBoxGeometry(sh.w, 3.2, 0.62, 0.04, 1), C.woodDark)
      for (let t = 0; t < 4; t++) {
        put(0, 0.35 + t * 0.85, 0.04, roundedBoxGeometry(sh.w - 0.1, 0.1, 0.58, 0.02, 1), C.wood)
        // 书
        let cursor = -sh.w / 2 + 0.22
        while (cursor < sh.w / 2 - 0.25) {
          const bw = 0.09 + random() * 0.1
          const bh = 0.44 + random() * 0.24
          put(cursor + bw / 2, 0.4 + t * 0.85 + bh / 2, 0.04, roundedBoxGeometry(bw, bh, 0.4, 0.015, 1), bookColors[Math.floor(random() * bookColors.length)])
          cursor += bw + 0.015
          if (random() > 0.9) cursor += 0.16
        }
      }
      put(0, 3.3, 0, roundedBoxGeometry(sh.w + 0.2, 0.16, 0.72, 0.04, 1), C.wood)
    }
    // 写字台
    batch.add(roundedBoxGeometry(2.2, 0.14, 1.15, 0.04, 1), C.woodDark, { position: [1.5, y + 1.0, 1.6] })
    for (const s of [-1, 1]) {
      batch.add(roundedBoxGeometry(0.16, 1.0, 1.0, 0.04, 1), C.woodDark, { position: [1.5 + s * 0.95, y + 0.5, 1.6] })
    }
    // 摊开的书
    for (const s of [-1, 1]) {
      batch.add(roundedBoxGeometry(0.52, 0.06, 0.72, 0.02, 1), C.paper, {
        position: [1.5 + s * 0.27, y + 1.11, 1.6],
        rotation: [0, 0, s * -0.06],
      })
    }
    batch.add(roundedBoxGeometry(0.08, 0.07, 0.74, 0.02, 1), C.timber, { position: [1.5, y + 1.1, 1.6] })
    // 墨水瓶与羽毛笔
    batch.add(new THREE.CylinderGeometry(0.1, 0.12, 0.18, 8), C.ink, { position: [2.3, y + 1.16, 1.3] })
    batch.add(new THREE.ConeGeometry(0.05, 0.55, 4), C.clothCream, {
      position: [2.35, y + 1.4, 1.3],
      rotation: [0, 0, -0.5],
    })
    // 烛台
    batch.add(new THREE.CylinderGeometry(0.14, 0.19, 0.42, 8), C.goldDeep, { position: [0.7, y + 1.28, 1.7] })
    glow.add(new THREE.SphereGeometry(0.11, 6, 5), C.lampGlow, { position: [0.7, y + 1.56, 1.7] })
    // 天球仪
    batch.add(new THREE.CylinderGeometry(0.42, 0.5, 0.16, 10), C.woodDark, { position: [-1.6, y + 0.08, 2.4] })
    batch.add(new THREE.CylinderGeometry(0.07, 0.07, 1.0, 6), C.goldDeep, { position: [-1.6, y + 0.6, 2.4] })
    batch.add(new THREE.TorusGeometry(0.56, 0.05, 5, 18), C.goldDeep, {
      position: [-1.6, y + 1.5, 2.4],
      rotation: [Math.PI / 2.6, 0, 0],
    })
    batch.add(new THREE.SphereGeometry(0.5, 16, 12), C.clothBlue, { position: [-1.6, y + 1.5, 2.4] })
    for (let i = 0; i < 12; i++) {
      const a = random() * Math.PI * 2
      const b = (random() - 0.5) * Math.PI
      batch.add(new THREE.IcosahedronGeometry(0.07, 0), C.leaf, {
        position: [-1.6 + Math.cos(a) * Math.cos(b) * 0.5, y + 1.5 + Math.sin(b) * 0.5, 2.4 + Math.sin(a) * Math.cos(b) * 0.5],
      })
    }
    // 浑天仪
    const ax = 3.0
    const az = 2.6
    batch.add(new THREE.CylinderGeometry(0.34, 0.42, 0.14, 10), C.woodDark, { position: [ax, y + 0.07, az] })
    batch.add(new THREE.CylinderGeometry(0.06, 0.06, 0.8, 6), C.goldDeep, { position: [ax, y + 0.5, az] })
    for (let i = 0; i < 4; i++) {
      batch.add(new THREE.TorusGeometry(0.44 - i * 0.05, 0.03, 4, 20), C.gold, {
        position: [ax, y + 1.15, az],
        rotation: [i * 0.5, i * 0.7, i * 0.35],
      })
    }
    batch.add(new THREE.SphereGeometry(0.11, 8, 6), C.gold, { position: [ax, y + 1.15, az] })
    // 星图
    for (let i = 0; i < 3; i++) {
      const px = -1.6 + i * 1.5
      batch.add(roundedBoxGeometry(1.1, 0.85, 0.05, 0.02, 1), C.paper, {
        position: [px, y + 2.9, ROOM_HALF - 0.12],
        rotation: [0, Math.PI, 0],
      })
      for (let s = 0; s < 9; s++) {
        glow.add(new THREE.SphereGeometry(0.035, 4, 4), C.starWhite, {
          position: [px + (random() - 0.5) * 0.9, y + 2.9 + (random() - 0.5) * 0.65, ROOM_HALF - 0.16],
        })
      }
    }
    // 阅读椅与小几、梯凳
    batch.add(roundedBoxGeometry(0.95, 0.2, 0.9, 0.06, 1), C.woodDark, { position: [-0.4, y + 0.55, 0.6] })
    batch.add(roundedBoxGeometry(0.95, 1.3, 0.18, 0.06, 1), C.woodDark, { position: [-0.4, y + 1.2, 0.18] })
    batch.add(roundedBoxGeometry(0.85, 0.14, 0.8, 0.05, 1), C.kingPurple, { position: [-0.4, y + 0.7, 0.62] })
    for (const s of [-1, 1]) {
      for (const t of [-1, 1]) {
        batch.add(roundedBoxGeometry(0.12, 0.55, 0.12, 0.03, 1), C.woodDark, {
          position: [-0.4 + s * 0.38, y + 0.28, 0.6 + t * 0.34],
        })
      }
    }
    batch.add(new THREE.CylinderGeometry(0.42, 0.36, 0.62, 10), C.wood, { position: [0.7, y + 0.31, 0.2] })
    batch.add(new THREE.CylinderGeometry(0.48, 0.48, 0.1, 10), C.woodLight, { position: [0.7, y + 0.66, 0.2] })
    // 地上堆着的书
    for (let i = 0; i < 7; i++) {
      batch.add(roundedBoxGeometry(0.55, 0.11, 0.42, 0.02, 1), bookColors[i % bookColors.length], {
        position: [2.9 + (i % 2) * 0.12, y + 0.06 + Math.floor(i / 2) * 0.12, -2.6],
        rotation: [0, (i % 3) * 0.2, 0],
      })
    }
    // 望远镜
    batch.add(new THREE.CylinderGeometry(0.05, 0.05, 1.1, 5), C.woodDark, { position: [3.2, y + 0.55, 1.0] })
    batch.add(new THREE.CylinderGeometry(0.11, 0.16, 1.3, 8), C.goldDeep, {
      position: [3.2, y + 1.4, 1.0],
      rotation: [Math.PI / 2.6, 0.3, 0],
    })
  }

  /* ================= 寝室与玫瑰室 ================= */
  {
    const y = FLOOR_LEVELS.bedchamber
    for (let i = 0; i < 12; i++) {
      batch.add(roundedBoxGeometry(ROOM_HALF * 2, 0.08, 0.66, 0.02, 1), i % 2 ? C.wood : C.woodLight, {
        position: [0, y + 0.04, -ROOM_HALF + 0.35 + i * 0.7],
      })
    }
    // 地毯
    batch.add(new THREE.CylinderGeometry(2.1, 2.1, 0.06, 20), C.clothBlue, { position: [0.6, y + 0.05, 0.8] })
    batch.add(new THREE.TorusGeometry(1.7, 0.14, 4, 22), C.gold, {
      position: [0.6, y + 0.09, 0.8],
      rotation: [Math.PI / 2, 0, 0],
    })
    batch.add(new THREE.CylinderGeometry(0.9, 0.9, 0.07, 16), C.clothRed, { position: [0.6, y + 0.1, 0.8] })

    // 四柱床
    const bx = -1.6
    const bz = -2.4
    batch.add(roundedBoxGeometry(2.5, 0.5, 3.3, 0.06, 1), C.woodDark, { position: [bx, y + 0.45, bz] })
    batch.add(roundedBoxGeometry(2.4, 0.34, 3.2, 0.1, 1), C.clothCream, { position: [bx, y + 0.82, bz] })
    batch.add(roundedBoxGeometry(2.3, 0.2, 2.2, 0.09, 1), C.clothRed, { position: [bx, y + 1.0, bz + 0.4] })
    batch.add(roundedBoxGeometry(2.5, 1.5, 0.2, 0.06, 1), C.woodDark, { position: [bx, y + 1.3, bz - 1.6] })
    for (const sx of [-1, 1]) {
      for (const sz of [-1, 1]) {
        batch.add(new THREE.CylinderGeometry(0.11, 0.13, 3.4, 8), C.woodDark, {
          position: [bx + sx * 1.2, y + 1.7, bz + sz * 1.6],
        })
        batch.add(new THREE.SphereGeometry(0.16, 8, 6), C.gold, {
          position: [bx + sx * 1.2, y + 3.45, bz + sz * 1.6],
        })
      }
    }
    batch.add(roundedBoxGeometry(2.7, 0.16, 3.5, 0.05, 1), C.woodDark, { position: [bx, y + 3.5, bz] })
    // 床幔
    for (const [cx, cz, w] of [
      [bx - 1.24, bz, 3.3],
      [bx + 1.24, bz, 3.3],
      [bx, bz - 1.68, 2.5],
    ] as Array<[number, number, number]>) {
      batch.add(roundedBoxGeometry(cx === bx ? w : 0.1, 2.5, cx === bx ? 0.1 : w, 0.04, 1), C.kingPurple, {
        position: [cx, y + 2.2, cz],
      })
    }
    // 枕头
    batch.add(roundedBoxGeometry(0.85, 0.24, 0.55, 0.11, 2), C.clothCream, {
      position: [bx - 0.5, y + 1.1, bz - 1.15],
    })
    batch.add(roundedBoxGeometry(0.85, 0.24, 0.55, 0.11, 2), C.clothCream, {
      position: [bx + 0.5, y + 1.1, bz - 1.15],
    })

    // 床头柜与玻璃罩里的玫瑰
    batch.add(roundedBoxGeometry(0.75, 0.75, 0.65, 0.05, 1), C.woodDark, { position: [bx + 1.85, y + 0.38, bz - 1.2] })
    batch.add(roundedBoxGeometry(0.85, 0.1, 0.75, 0.03, 1), C.wood, { position: [bx + 1.85, y + 0.8, bz - 1.2] })
    batch.add(new THREE.CylinderGeometry(0.16, 0.2, 0.3, 8), C.goldDeep, { position: [bx + 1.6, y + 1.0, bz - 1.2] })
    glow.add(new THREE.SphereGeometry(0.1, 6, 5), C.lampGlow, { position: [bx + 1.6, y + 1.22, bz - 1.2] })
    // 玫瑰
    const rx = bx + 2.15
    const rz = bz - 1.15
    batch.add(new THREE.CylinderGeometry(0.24, 0.28, 0.14, 10), C.goldDeep, { position: [rx, y + 0.87, rz] })
    batch.add(new THREE.CylinderGeometry(0.035, 0.05, 0.75, 5), C.leafDeep, { position: [rx, y + 1.3, rz] })
    for (let i = 0; i < 3; i++) {
      batch.add(new THREE.SphereGeometry(0.11, 6, 4), C.leaf, {
        position: [rx + (i % 2 ? 0.12 : -0.12), y + 1.1 + i * 0.18, rz],
        scale: [1, 0.4, 0.7],
      })
    }
    batch.add(new THREE.SphereGeometry(0.22, 10, 8), C.clothRed, { position: [rx, y + 1.78, rz], scale: [1, 0.88, 1] })
    batch.add(new THREE.SphereGeometry(0.11, 6, 5), C.gold, { position: [rx, y + 1.88, rz] })
    glassBatch.add(new THREE.SphereGeometry(0.62, 14, 10, 0, Math.PI * 2, 0, Math.PI / 2), 0xffffff, {
      position: [rx, y + 0.94, rz],
    })

    // 衣柜
    batch.add(roundedBoxGeometry(1.7, 2.5, 0.75, 0.06, 1), C.woodDark, { position: [ROOM_HALF - 0.5, y + 1.25, -2.6] })
    batch.add(roundedBoxGeometry(1.8, 0.18, 0.85, 0.04, 1), C.wood, { position: [ROOM_HALF - 0.5, y + 2.58, -2.6] })
    batch.add(roundedBoxGeometry(0.06, 2.2, 0.1, 0.02, 1), C.timber, { position: [ROOM_HALF - 0.5, y + 1.25, -2.98] })
    for (const s of [-1, 1]) {
      batch.add(new THREE.SphereGeometry(0.08, 6, 5), C.gold, {
        position: [ROOM_HALF - 0.5 + s * 0.16, y + 1.3, -3.0],
      })
    }
    // 箱子
    batch.add(roundedBoxGeometry(1.4, 0.7, 0.75, 0.06, 1), C.wood, { position: [2.6, y + 0.35, 2.4] })
    batch.add(new THREE.CylinderGeometry(0.38, 0.38, 1.42, 10, 1, false, 0, Math.PI), C.woodDark, {
      position: [2.6, y + 0.7, 2.4],
      rotation: [0, 0, Math.PI / 2],
    })
    for (const s of [-1, 1]) {
      batch.add(roundedBoxGeometry(0.12, 0.78, 0.82, 0.03, 1), C.goldDeep, { position: [2.6 + s * 0.5, y + 0.4, 2.4] })
    }
    batch.add(new THREE.TorusGeometry(0.12, 0.035, 4, 10), C.gold, { position: [2.6, y + 0.55, 2.79] })
    // 梳妆镜
    batch.add(roundedBoxGeometry(1.0, 1.5, 0.1, 0.05, 1), C.goldDeep, {
      position: [-ROOM_HALF + 0.16, y + 2.0, 1.6],
      rotation: [0, Math.PI / 2, 0],
    })
    batch.add(roundedBoxGeometry(0.8, 1.3, 0.08, 0.04, 1), C.waterDeep, {
      position: [-ROOM_HALF + 0.22, y + 2.0, 1.6],
      rotation: [0, Math.PI / 2, 0],
    })
    batch.add(roundedBoxGeometry(1.1, 0.14, 0.5, 0.04, 1), C.woodDark, {
      position: [-ROOM_HALF + 0.35, y + 1.15, 1.6],
      rotation: [0, Math.PI / 2, 0],
    })
    // 窗座与靠垫
    batch.add(roundedBoxGeometry(2.2, 0.5, 0.9, 0.06, 1), C.wood, { position: [0.2, y + 0.25, ROOM_HALF - 0.5] })
    batch.add(roundedBoxGeometry(2.1, 0.18, 0.85, 0.07, 1), C.clothBlue, { position: [0.2, y + 0.58, ROOM_HALF - 0.5] })
    for (const s of [-1, 1]) {
      batch.add(roundedBoxGeometry(0.5, 0.4, 0.34, 0.14, 2), C.gold, {
        position: [0.2 + s * 0.65, y + 0.82, ROOM_HALF - 0.55],
        rotation: [0, 0, s * 0.2],
      })
    }
    // 小王子的画（挂在墙上）
    batch.add(roundedBoxGeometry(0.95, 0.75, 0.06, 0.03, 1), C.woodLight, {
      position: [ROOM_HALF - 0.14, y + 2.4, 1.2],
      rotation: [0, -Math.PI / 2, 0],
    })
    batch.add(roundedBoxGeometry(0.78, 0.58, 0.05, 0.02, 1), C.paper, {
      position: [ROOM_HALF - 0.18, y + 2.4, 1.2],
      rotation: [0, -Math.PI / 2, 0],
    })
    // 画里那条"吞了大象的蟒蛇"
    batch.add(tubeAlong([
      new THREE.Vector3(ROOM_HALF - 0.22, y + 2.28, 0.98),
      new THREE.Vector3(ROOM_HALF - 0.22, y + 2.5, 1.12),
      new THREE.Vector3(ROOM_HALF - 0.22, y + 2.34, 1.3),
      new THREE.Vector3(ROOM_HALF - 0.22, y + 2.5, 1.44),
    ], 0.035, 20, 4), C.leafDeep)
    // 小凳与拖鞋
    batch.add(new THREE.CylinderGeometry(0.32, 0.28, 0.5, 8), C.wood, { position: [1.4, y + 0.25, -0.6] })
    batch.add(new THREE.CylinderGeometry(0.36, 0.36, 0.1, 8), C.clothRed, { position: [1.4, y + 0.53, -0.6] })
    for (const s of [-1, 1]) {
      batch.add(roundedBoxGeometry(0.24, 0.1, 0.42, 0.05, 1), C.clothBlue, {
        position: [0.2 + s * 0.24, y + 0.06, -0.9],
        rotation: [0, s * 0.3, 0],
      })
    }
  }

  /* ================= 组装 ================= */
  const mesh = batch.build(mat, { mottle: 0.06, seed: 44 })
  if (mesh) {
    mesh.castShadow = true
    mesh.receiveShadow = true
    group.add(mesh)
  }
  const glowMesh = glow.build(glowMat)
  if (glowMesh) group.add(glowMesh)
  const glassMesh = glassBatch.build(
    new THREE.MeshToonMaterial({
      color: new THREE.Color(0xe4f1f4),
      transparent: true,
      opacity: 0.24,
      depthWrite: false,
      side: THREE.DoubleSide,
    }),
  )
  if (glassMesh) {
    glassMesh.renderOrder = 4
    group.add(glassMesh)
  }

  /* ================= 动画的火焰 ================= */
  const fires: Array<{ group: THREE.Group; flames: THREE.Mesh[]; light: THREE.PointLight }> = []
  const fireSpecs: Array<[number, number, number, number, number]> = [
    // x, y, z, 规模, 光强
    [0, FLOOR_LEVELS.hall, -ROOM_HALF + 0.9, 1.0, 9],
    [-0.6, FLOOR_LEVELS.kitchen, -ROOM_HALF + 1.0, 0.85, 7],
    [2.6, FLOOR_LEVELS.kitchen, -ROOM_HALF + 0.5, 0.5, 4],
  ]
  const flameMats = [
    new THREE.MeshBasicMaterial({ color: new THREE.Color(C.fireGlow), transparent: true, opacity: 0.92, depthWrite: false }),
    new THREE.MeshBasicMaterial({ color: new THREE.Color(C.gold), transparent: true, opacity: 0.88, depthWrite: false }),
    new THREE.MeshBasicMaterial({ color: new THREE.Color(C.clothCream), transparent: true, opacity: 0.7, depthWrite: false }),
  ]
  for (const [fx, fy, fz, scale, intensity] of fireSpecs) {
    const fg = new THREE.Group()
    fg.position.set(fx, fy + 0.12, fz)
    const flames: THREE.Mesh[] = []
    for (let i = 0; i < 6; i++) {
      const f = new THREE.Mesh(
        new THREE.ConeGeometry((0.16 + i * 0.045) * scale, (0.6 + i * 0.14) * scale, 6),
        flameMats[i % 3],
      )
      f.position.set((i - 2.5) * 0.13 * scale, (0.3 + (i % 3) * 0.1) * scale, (i % 2 ? 0.08 : -0.08) * scale)
      fg.add(f)
      flames.push(f)
    }
    // 柴
    const logBatch = new Batcher()
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2
      logBatch.add(new THREE.CylinderGeometry(0.09 * scale, 0.11 * scale, 1.1 * scale, 5), C.woodDark, {
        position: [Math.cos(a) * 0.14 * scale, 0.1 * scale, Math.sin(a) * 0.14 * scale],
        rotation: [Math.cos(a) * 0.5, 0, Math.sin(a) * 0.5 + Math.PI / 2],
      })
    }
    const logs = logBatch.build(mat)
    if (logs) fg.add(logs)
    group.add(fg)
    const light = new THREE.PointLight(C.fireGlow, intensity, 13, 2)
    light.position.set(fx, fy + 1.0, fz + 0.5)
    group.add(light)
    fires.push({ group: fg, flames, light })
  }

  let night = 0

  return {
    group,
    update(time, delta) {
      void delta
      for (let f = 0; f < fires.length; f++) {
        const fire = fires[f]
        for (let i = 0; i < fire.flames.length; i++) {
          const fl = fire.flames[i]
          const k = 0.75 + Math.sin(time * 8.2 + i * 1.9 + f * 2.3) * 0.25
          fl.scale.set(k, 0.65 + Math.abs(Math.sin(time * 6.7 + i * 1.3 + f)) * 0.75, k)
          fl.rotation.y = time * 1.6 + i
        }
        if (fire.light.userData.base === undefined) fire.light.userData.base = fire.light.intensity
        const base = fire.light.userData.base as number
        fire.light.intensity =
          base * (0.72 + Math.sin(time * 9.1 + f) * 0.16 + Math.sin(time * 14.3 + f * 2) * 0.12)
      }
      // 烛光与灯火随夜色增强
      glowMat.emissiveIntensity = 0.25 + night * 1.5
      for (const m of flameMats) m.opacity = 0.6 + night * 0.35
    },
    setNight(amount) {
      night = amount
    },
  }
}
