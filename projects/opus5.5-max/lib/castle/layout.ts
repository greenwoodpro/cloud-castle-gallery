export const G = 1.2

export const KEEP = { x0: -4, x1: 4, z0: -8.5, z1: -3, levels: [G, G + 2.9, G + 5.8], top: G + 8.6 }
export const HALL = { x0: 3.6, x1: 8.5, z0: -3, z1: 4.5, h: 4.4 }
export const CHAPEL = { x0: -8.5, x1: -4.6, z0: -2.5, z1: 4, h: 4.2 }
export const KITCHEN = { x0: -8.5, x1: -4.6, z0: 5.2, z1: 8.5, h: 3.2 }
export const SMITHY = { x0: 4.6, x1: 8.5, z0: 5.6, z1: 8.5 }
export const STAR_TOWER = { x: 5.4, z: -7.6, r: 1.5, h: 14.5 }
export const CORNER_TOWERS: [number, number][] = [
  [-9, -9],
  [9, -9],
  [9, 9],
  [-9, 9],
]
export const WALL_TOP = G + 5
