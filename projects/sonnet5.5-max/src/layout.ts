import * as THREE from 'three'
import { fbm } from './noise'

/** 地面彩绘贴图覆盖的世界范围 [-WORLD/2, WORLD/2] */
export const WORLD = 100

export const CASTLE = { x: -2, z: -9, y: 3.2, hx: 10.4, hz: 8.4 }
export const KEEP = { lz: -3.6, w: 10, d: 6.4, floor: 2.2, plinth: 0.4 }
export const MOUNTAIN = { x: 20, z: -17, r: 11, h: 10 }
export const LAKE = { x: 17, z: 12.5, rx: 7, rz: 5.2, y: -0.55 }
export const VILLAGE = { x: -21, z: 9.5 }
export const MILL = { x: -30, z: -3.5 }
export const FARM = { x: -6, z: 22, w: 16, d: 8.5, rot: 0.06 }
export const ORCHARD = { x: -25, z: 19, r: 5.5 }
export const MEADOW = { x: 10, z: 25, r: 7 }
export const FOREST_A = { x: -28, z: -16, r: 9 }
export const FOREST_B = { x: -8, z: -30, r: 8 }
export const CAVE = { x: 16.2, z: -13.6 }
export const MOAT_Y = CASTLE.y - 0.7
export const TIP_Y = -34

export type XZ = [number, number]

export const RIVER_IN_PTS: XZ[] = [
  [19.2, -9],
  [19.8, -4.5],
  [18.6, 0.5],
  [17.6, 7.4],
]
export const RIVER_OUT_PTS: XZ[] = [
  [23.2, 12.8],
  [28, 13.6],
  [33, 14.2],
  [41, 15],
]

export const ROAD_MAIN: XZ[] = [
  [CASTLE.x, 3.2],
  [CASTLE.x + 0.4, 6.5],
  [-4.5, 9.6],
  [-9.5, 11.4],
  [-15, 11.2],
  [-19.5, 10],
]
export const ROAD_FARM: XZ[] = [
  [-3.2, 7.4],
  [-2.8, 11.5],
  [-4.2, 16],
  [-5.6, 18.2],
]
export const ROAD_LAKE: XZ[] = [
  [-1.4, 5.6],
  [4, 6.6],
  [9.5, 5.6],
  [13.5, 1.8],
  [16.2, -1.4],
]
export const ROAD_MILL: XZ[] = [
  [-22.5, 7.5],
  [-26, 3.5],
  [-29, -1.2],
]
export const ROAD_MEADOW: XZ[] = [
  [-1.2, 8],
  [4, 14],
  [8, 19.5],
  [11.5, 23],
]
export const ROAD_CAVE: XZ[] = [
  [16.2, -1.4],
  [15.4, -6],
  [15.6, -11.2],
]

export const ROADS: XZ[][] = [ROAD_MAIN, ROAD_FARM, ROAD_LAKE, ROAD_MILL, ROAD_MEADOW, ROAD_CAVE]

export function samplePolyline(pts: XZ[], n = 60): XZ[] {
  const curve = new THREE.CatmullRomCurve3(
    pts.map(([x, z]) => new THREE.Vector3(x, 0, z)),
    false,
    'catmullrom',
    0.5,
  )
  return curve.getPoints(n).map((v) => [v.x, v.z] as XZ)
}

export const ROAD_SAMPLES: XZ[][] = ROADS.map((r) => samplePolyline(r, 70))

export function distToPolyline(samples: XZ[], x: number, z: number): number {
  let best = Infinity
  for (let i = 0; i < samples.length - 1; i++) {
    const [ax, az] = samples[i]
    const [bx, bz] = samples[i + 1]
    const dx = bx - ax
    const dz = bz - az
    const l2 = dx * dx + dz * dz || 1
    const t = Math.max(0, Math.min(1, ((x - ax) * dx + (z - az) * dz) / l2))
    const px = ax + dx * t
    const pz = az + dz * t
    const d = Math.hypot(x - px, z - pz)
    if (d < best) best = d
  }
  return best
}

export function distToRoads(x: number, z: number): number {
  let best = Infinity
  for (const s of ROAD_SAMPLES) best = Math.min(best, distToPolyline(s, x, z))
  return best
}

export function edgeR(theta: number): number {
  const n = fbm(Math.cos(theta) * 1.5 + 7.3, Math.sin(theta) * 1.5 + 3.1, 3)
  return (38 + (n - 0.44) * 7) * (1 + 0.05 * Math.cos(2 * theta - 0.4))
}

/** 圆形岛边缘内 inset 米处的点（angle：度，0=+x，90=+z 朝向观众） */
export function onIsland(angleDeg: number, inset: number): XZ {
  const th = (angleDeg * Math.PI) / 180
  const r = edgeR(th) - inset
  return [Math.cos(th) * r, Math.sin(th) * r]
}

export const castleToWorld = (x: number, y: number, z: number): V3t => [CASTLE.x + x, CASTLE.y + y, CASTLE.z + z]
export const keepToWorld = (x: number, y: number, z: number): V3t => [
  CASTLE.x + x,
  CASTLE.y + KEEP.plinth + y,
  CASTLE.z + KEEP.lz + z,
]
export type V3t = [number, number, number]

/** 主堡每层地板的高度（主堡局部坐标） */
export const FLOOR_Y = [0, 2.2, 4.4, 6.6]
