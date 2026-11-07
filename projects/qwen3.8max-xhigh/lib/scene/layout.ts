/**
 * 城堡的统一尺寸常量。
 * 外观、内部剖视、标注热点都从这里取值，保证各模块对得上。
 */

/** 外庭（bailey）地面高度。 */
export const BAILEY_Y = 1.28
/** 主堡台地顶面高度。 */
export const KEEP_Y = 2.68
/** 外庭台地半径。 */
export const BAILEY_RADIUS = 15.4
/** 城墙中心线半径。 */
export const WALL_RADIUS = 14
/** 城墙高度（不含雉堞）。 */
export const WALL_HEIGHT = 6.0
/** 城墙厚度。 */
export const WALL_THICKNESS = 1.5
/** 主堡台地半径。 */
export const KEEP_PLINTH_R = 7.6
/** 主堡方形主体边长。 */
export const KEEP_SIZE = 10.2
/** 每层净高。 */
export const FLOOR_HEIGHT = 4.35

/** 主堡五层的楼面高度（自下而上）。 */
export const FLOOR_LEVELS = {
  dungeon: KEEP_Y,
  hall: KEEP_Y + FLOOR_HEIGHT,
  kitchen: KEEP_Y + FLOOR_HEIGHT * 2,
  library: KEEP_Y + FLOOR_HEIGHT * 3,
  bedchamber: KEEP_Y + FLOOR_HEIGHT * 4,
  roof: KEEP_Y + FLOOR_HEIGHT * 5,
} as const

/** 主堡半宽。 */
export const KEEP_HALF = KEEP_SIZE / 2

/** 城门朝向：+Z（默认镜头所在的一侧）。 */
export const GATE_ANGLE = Math.PI / 2
export const GATE_POS = { x: 0, z: WALL_RADIUS }

/** 城墙八个折点的角度，其中 67.5° 与 112.5° 之间正好是城门。 */
export const WALL_VERTICES = Array.from({ length: 8 }, (_, k) => Math.PI / 8 + (k * Math.PI) / 4)

/** 四座圆塔所在的折点角度。 */
export const ROUND_TOWER_ANGLES = [WALL_VERTICES[0], WALL_VERTICES[3], WALL_VERTICES[4], WALL_VERTICES[7]]

/** 门楼两侧方塔的角度。 */
export const GATE_TOWER_ANGLES = [WALL_VERTICES[1], WALL_VERTICES[2]]

/** 两座小角楼的角度。 */
export const TURRET_ANGLES = [WALL_VERTICES[5], WALL_VERTICES[6]]

/** 主堡四角小塔相对主堡中心的偏移。 */
export const KEEP_TURRET_OFFSET = KEEP_HALF + 0.95

export type FloorKey = keyof typeof FLOOR_LEVELS

export const FLOOR_META: Array<{
  key: FloorKey
  index: number
  name: string
  subtitle: string
}> = [
  { key: 'dungeon', index: 0, name: '地牢与储藏室', subtitle: '最底层' },
  { key: 'hall', index: 1, name: '大厅', subtitle: '第一层' },
  { key: 'kitchen', index: 2, name: '厨房与面包房', subtitle: '第二层' },
  { key: 'library', index: 3, name: '书房与星象室', subtitle: '第三层' },
  { key: 'bedchamber', index: 4, name: '寝室与玫瑰室', subtitle: '第四层' },
]
