export const WORLD_COLORS = {
  paper: '#f5f4ee',
  ink: '#394a42',
  sage: '#7e9777',
  rose: '#bd806b',
  gold: '#d6b67b',
} as const

export type PlaceId = 'overview' | 'castle' | 'garden' | 'forest' | 'village'
export type TimeOfDay = 'day' | 'sunset' | 'night'
export type Vector3Tuple = [number, number, number]

export const PLACES: {
  id: Exclude<PlaceId, 'overview'>
  title: string
  subtitle: string
  tag: string
  description: string
  detail: string
  camera: Vector3Tuple
  target: Vector3Tuple
}[] = [
  {
    id: 'castle',
    title: '风栖城堡',
    subtitle: '石墙之内，也有柔软的日常',
    tag: '建筑 · 三层空间',
    description: '圆塔守着风，红瓦接住晚霞。这座没有战争的城堡，把最明亮的房间留给了书、星星和远道而来的客人。',
    detail: '一层的长桌宴会厅与炉灶相邻，壁炉、木凳和陶罐围出温暖的公共空间。沿侧面的木阶上楼，二层是藏书室，书架旁留着阅读桌。三层的卧房放着四柱床、地毯与小书桌。掀开屋顶，就能像翻开一本立体书一样，看见每一层的生活。',
    camera: [8, 6.5, 10],
    target: [0, 2.2, -0.6],
  },
  {
    id: 'garden',
    title: '玫瑰与小径',
    subtitle: '总有一朵花，值得你停下来',
    tag: '花园 · 庭院与溪流',
    description: '石子路绕过小小的喷泉，玫瑰在低矮的树篱里慢慢盛开。一个戴着金色围巾的孩子，正在等他的狐狸朋友。',
    detail: '城门外的缓坡上，玫瑰花圃与低矮灌木相互围合。步石小径把城堡、村庄和水边连在一起；木桥跨过清浅的溪流。孩子站在桥边，狐狸伏在草地上，绵羊在坡地吃草。所有居民都以微缩木偶的比例建模，可以放大细看。',
    camera: [7, 4.8, 10],
    target: [1.8, 0.5, 2.9],
  },
  {
    id: 'forest',
    title: '林间的回声',
    subtitle: '溪水从岛的边缘，流向云海',
    tag: '地形 · 森林与瀑布',
    description: '针叶林披着鼠尾草色的薄雾。溪流穿过岩石与野花，在岛屿的边缘变成一条没有尽头的瀑布。',
    detail: '浮岛由不规则的多层岩体托起：上层是覆盖草甸的缓坡，中层露出风化石壁，下层收束成悬空的岩锥。东侧保留针叶林和散落的巨石，泉水从林中汇入溪流，越过木桥后跌落云间。卫星小岛、流云与飞鸟共同构成远景。',
    camera: [12, 5.7, 8],
    target: [4, -0.2, 0.8],
  },
  {
    id: 'village',
    title: '慢慢生活的村庄',
    subtitle: '面包出炉时，风车刚好转过一圈',
    tag: '居民 · 村舍与风车',
    description: '城墙外有三间小屋、一座风车和几块菜畦。面包师、园丁与守塔人，让这个悬在天空中的世界有了生活的温度。',
    detail: '木骨架村舍围着小广场展开，门前有柴堆、木桶与货摊。风车的木质叶片缓慢旋转，旁边是整齐的菜畦。面包师站在屋前，园丁照看花圃，守塔人在城门值守。村路最后通往西侧的小观景台，那里适合看云。',
    camera: [-10, 5.5, 10],
    target: [-3.5, 0.6, 2],
  },
]

export const RESIDENTS = [
  { name: '星星旅人', role: '收集日落的孩子', description: '浅绿色外衣、金色围巾，站在溪边等一位新朋友。', location: 'garden' as const },
  { name: '面包师阿诺', role: '村庄里的早起者', description: '戴着柔软的帽子，守着红瓦小屋与刚刚出炉的面包。', location: 'village' as const },
  { name: '园丁艾拉', role: '玫瑰的照料者', description: '每日沿石子路走一遍，给玫瑰、香草和菜苗浇水。', location: 'garden' as const },
  { name: '守塔人卢克', role: '为归途点灯的人', description: '在城门与高塔间巡视，不是为了战争，而是迎接来客。', location: 'castle' as const },
]

export const WORLD_NOTES = `云屿 · 风栖城堡\n\n这是一个以 Three.js 程序化搭建的原创浮空岛世界，灵感来自温柔的童话与欧洲中世纪建筑。\n\n${PLACES.map((place) => `${place.title}\n${place.description}\n${place.detail}`).join('\n\n')}\n\n岛上居民\n${RESIDENTS.map((resident) => `${resident.name}：${resident.role}。${resident.description}`).join('\n')}\n\n交互：拖动旋转、滚轮缩放、右键拖动平移；触屏单指旋转、双指缩放与平移。点击地点卡片可切换视角；剖面模式展示城堡内部；可切换晴日、黄昏和星夜。\n\n导出的 GLB 为可独立打开的静态完整模型，包含室内、居民与地形。动态水流、风车和时间切换保留在项目源码中。\n`
