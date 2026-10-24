export type Vec3 = [number, number, number]

export const ISLAND_RADIUS = 16
export const PLATEAU = { x: 0, z: -1.5, radius: 7.8, height: 1.4 }
export const CASTLE_ORIGIN: Vec3 = [PLATEAU.x, PLATEAU.height, PLATEAU.z]
export const WALL_HALF = 4.2
export const WALL_HEIGHT = 2.8
export const TOWER_RADIUS = 0.95

export const KEEP_LOCAL: Vec3 = [0, 0, -1.6]
export const KEEP_SIZE = 3.4
export const FLOOR_HEIGHT = 2.2
export const KEEP_FLOORS = 3

export const CHAPEL_LOCAL: Vec3 = [2.55, 0, 0.7]
export const FORGE_LOCAL: Vec3 = [-2.75, 0, 1.2]
export const WELL_LOCAL: Vec3 = [0, 0, 1.3]

export const LAKE = { x: -9.6, z: 1.2, radius: 3.1 }
export const WATERFALL = { x: -15.4, z: 2.4 }
export const VILLAGE = { x: 9.2, z: 6.2 }
export const WINDMILL = { x: 12, z: -2.6 }
export const FIELDS = { x: -6.8, z: 9.2 }
export const MEADOW = { x: 2.5, z: 12 }
export const CRAGS = { x: -8.6, z: -9.4 }
export const FOX: Vec3 = [-2.6, 0, 10.2]
export const B612: Vec3 = [24, 10, -15]

export function edgeRadius(angle: number) {
  return (
    ISLAND_RADIUS *
    (1 + 0.07 * Math.sin(angle * 5 + 1) + 0.05 * Math.sin(angle * 9 + 2) + 0.03 * Math.sin(angle * 17))
  )
}

export function insideIsland(x: number, z: number, margin = 0) {
  return Math.hypot(x, z) < edgeRadius(Math.atan2(z, x)) - margin
}

export function toWorld(local: Vec3): Vec3 {
  return [
    CASTLE_ORIGIN[0] + local[0],
    CASTLE_ORIGIN[1] + local[1],
    CASTLE_ORIGIN[2] + local[2],
  ]
}

export function insideKeep(floor: number, local: Vec3 = [0, 0, 0]): Vec3 {
  return toWorld([
    KEEP_LOCAL[0] + local[0],
    KEEP_LOCAL[1] + floor * FLOOR_HEIGHT + local[1],
    KEEP_LOCAL[2] + local[2],
  ])
}
