export const ISLAND_RADIUS = 34
export const PLATEAU = { x: 0, z: 0, r: 14, h: 1.2 }
export const MOUNTAIN = { x: 17, z: -15, sigma: 4.6, h: 12.5 }
export const LAKE = { x: -19, z: 9, r: 6.2, level: -0.28 }
export const WHEAT = { x0: -21, x1: -12.5, z0: -20, z1: -12.5 }
export const DESERT = { x: 17, z: 15, r: 7.2 }
export const VILLAGE = { x: -3, z: 22 }
export const KNOLL = { x: -16, z: 21, h: 1.6 }
export const WINDMILL = { x: -24.5, z: -8.5 }
export const VOLCANOES = [
  { x: 25, z: -5, h: 2.6, r: 2.7, active: true },
  { x: 26.5, z: 1.5, h: 2, r: 2.2, active: true },
  { x: 24, z: 7, h: 1.4, r: 1.9, active: false },
]

export const ROADS: [number, number][][] = [
  [[0, 9.5], [0.5, 14], [-1.5, 18.5], [-3, 22]],
  [[-3, 22], [-8, 22.8], [-13, 21.8]],
  [[-3, 22], [4, 21.5], [10, 18.5], [13.5, 16]],
  [[0, 9.5], [-6, 12.3], [-11, 12], [-13.2, 8.5]],
  [[-9.5, -5.5], [-14, -7.5], [-18.5, -8.2], [-22.6, -8.6]],
  [[5.5, -9.6], [9, -12.2], [12.5, -13]],
]

/** Channel the lake drains through to reach the waterfall on the western rim. */
export const STREAM = { x0: -24.5, z0: 10.5, dirX: -0.96, dirZ: 0.28, width: 1.5 }

export function islandRadiusAt(angle: number) {
  return (
    ISLAND_RADIUS +
    2.2 * Math.sin(3 * angle + 0.6) +
    1.4 * Math.sin(5 * angle + 2.1) +
    0.8 * Math.sin(9 * angle)
  )
}

export function radialFactor(x: number, z: number) {
  return Math.hypot(x, z) / islandRadiusAt(Math.atan2(z, x))
}

export function isOnIsland(x: number, z: number, margin = 1) {
  return Math.hypot(x, z) < islandRadiusAt(Math.atan2(z, x)) - margin
}

function smoothstep(a: number, b: number, v: number) {
  const t = Math.min(1, Math.max(0, (v - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

export function noise2(x: number, z: number) {
  return (
    Math.sin(x * 0.31 + Math.sin(z * 0.23) * 1.7) * 0.5 +
    Math.sin(z * 0.27 + Math.sin(x * 0.19) * 1.3) * 0.5
  )
}

function segmentDistance(px: number, pz: number, ax: number, az: number, bx: number, bz: number) {
  const vx = bx - ax
  const vz = bz - az
  const t = Math.max(0, Math.min(1, ((px - ax) * vx + (pz - az) * vz) / (vx * vx + vz * vz)))
  return Math.hypot(px - (ax + vx * t), pz - (az + vz * t))
}

export function roadDistance(x: number, z: number) {
  let best = Infinity
  for (const road of ROADS) {
    for (let i = 0; i < road.length - 1; i++) {
      const [ax, az] = road[i]
      const [bx, bz] = road[i + 1]
      best = Math.min(best, segmentDistance(x, z, ax, az, bx, bz))
    }
  }
  return best
}

export function streamDistance(x: number, z: number) {
  const { x0, z0, dirX, dirZ } = STREAM
  return segmentDistance(x, z, x0 + 3, z0 - 1, x0 + dirX * 14, z0 + dirZ * 14)
}

export function inWheat(x: number, z: number) {
  return x > WHEAT.x0 && x < WHEAT.x1 && z > WHEAT.z0 && z < WHEAT.z1
}

export function desertFactor(x: number, z: number) {
  return 1 - smoothstep(DESERT.r - 1.5, DESERT.r + 1.2, Math.hypot(x - DESERT.x, z - DESERT.z) + noise2(x * 2, z * 2) * 0.8)
}

export function lakeDistance(x: number, z: number) {
  return Math.hypot(x - LAKE.x, z - LAKE.z)
}

export function mountainHeight(x: number, z: number) {
  const dx = x - MOUNTAIN.x
  const dz = z - MOUNTAIN.z
  const d2 = dx * dx + dz * dz
  const angle = Math.atan2(dz, dx)
  const ridges = 0.82 + 0.18 * Math.sin(angle * 5 + 0.7) + 0.06 * Math.sin(angle * 11)
  return MOUNTAIN.h * Math.exp(-d2 / (2 * MOUNTAIN.sigma * MOUNTAIN.sigma)) * ridges
}

export function heightAt(x: number, z: number) {
  const rf = radialFactor(x, z)
  let h = 0.35 * noise2(x * 0.6, z * 0.6) + 0.25 * Math.sin(x * 0.07 + z * 0.11)

  const plateauD = Math.hypot(x - PLATEAU.x, z - PLATEAU.z)
  h += (PLATEAU.h - h) * (1 - smoothstep(PLATEAU.r - 2, PLATEAU.r + 3, plateauD))

  const knollD = Math.hypot(x - KNOLL.x, z - KNOLL.z)
  h += KNOLL.h * (1 - smoothstep(1, 5, knollD))

  h += mountainHeight(x, z)

  const df = desertFactor(x, z)
  h += df * (0.45 * Math.sin(x * 0.9 + z * 0.35) + 0.3)

  const ld = lakeDistance(x, z)
  h -= 1.6 * (1 - smoothstep(LAKE.r - 2.5, LAKE.r + 0.8, ld))

  const sd = streamDistance(x, z)
  if (sd < STREAM.width + 1) {
    const carve = 1 - smoothstep(STREAM.width * 0.5, STREAM.width + 1, sd)
    h = h * (1 - carve) + -0.75 * carve
  }

  const rd = roadDistance(x, z)
  if (rd < 1.2) h -= 0.06 * (1 - rd / 1.2)

  h -= smoothstep(0.86, 1.0, rf) * 0.9
  return h
}

export interface TerrainZone {
  wheat: boolean
  desert: number
  road: number
  lake: number
  mountain: number
  stream: number
  rim: number
}

export function zoneAt(x: number, z: number): TerrainZone {
  return {
    wheat: inWheat(x, z),
    desert: desertFactor(x, z),
    road: roadDistance(x, z),
    lake: lakeDistance(x, z),
    mountain: mountainHeight(x, z),
    stream: streamDistance(x, z),
    rim: radialFactor(x, z),
  }
}
