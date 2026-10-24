export const PALETTE = {
  paper: '#f5f3ec',
  ink: '#44544b',
  sage: '#9eb298',
  clay: '#cf987c',
  gold: '#dfc382',
} as const

export type PlaceId = 'castle' | 'garden' | 'village' | 'forest' | 'waterfall'
export type TimeOfDay = 'day' | 'sunset' | 'night'
export type ViewMode = 'overview' | 'interior'

export interface Place {
  id: PlaceId
  name: string
  subtitle: string
  description: string
  details: { title: string; text: string }[]
  camera: [number, number, number]
  target: [number, number, number]
  marker: [number, number, number]
}

export const PLACES: Place[] = [
  {
    id: 'castle',
    name: '云端城堡',
    subtitle: '风住在尖塔里，故事藏在窗后。',
    description: '一座没有战争的中世纪城堡。奶油色的石墙围起小小庭院，陶粉色屋顶接住途经的云，最高的塔楼每天为星星留一盏灯。',
    details: [
      { title: '一层 · 炉火大厅', text: '拱门后是铺着棋盘石砖的宴会厅。长桌摆着陶碗与面包，壁炉守着余温，厨师正在为晚归的旅人准备晚餐。' },
      { title: '二层 · 藏书与梦', text: '木楼梯通向书房与寝室。满墙的书、临窗的写字台、铺着柔软被子的木床，以及一封还没有寄出的信。' },
      { title: '三层 · 观星阁', text: '旋梯尽头藏着小小的天文台。黄铜望远镜朝向远方，圆桌摊开星图，金色旗帜在尖塔上迎风起伏。' },
    ],
    camera: [15, 12, 20], target: [0, 2, 0], marker: [0.8, 9.7, -1.3],
  },
  {
    id: 'garden',
    name: '玫瑰花园',
    subtitle: '因为你为它花过时间，它才如此重要。',
    description: '城墙之外，一位小小的园丁照料着玫瑰。修剪整齐的绿篱围出安静的花圃，石凳旁留着一只陶壶，花瓣上还停着清晨的露水。',
    details: [
      { title: '被照料的玫瑰', text: '陶粉与金色的小花沿石径开放，中央的玫瑰被玻璃罩轻轻保护。这里没有匆忙，只有浇水、等待和日复一日的陪伴。' },
      { title: '午后的长椅', text: '木质长椅面向云海。金发小旅人与戴着草帽的园丁偶尔坐在这里，听风穿过叶子的声音。' },
    ],
    camera: [-12, 8, 14], target: [-5.6, 0.8, 3.7], marker: [-5.5, 1.7, 3.5],
  },
  {
    id: 'village',
    name: '风车小镇',
    subtitle: '面包的香气，比钟声更早叫醒清晨。',
    description: '沿着碎石小路走下城堡，半木结构的小屋依着草坡而建。风车慢慢转动，集市摊开彩色棚布，村民把平凡的日子过成童话。',
    details: [
      { title: '面包房与小集市', text: '木梁嵌进浅色粉墙，斜屋顶下挂着招牌。小摊上有南瓜、苹果与麦穗，门前的木桶储存着雨水。' },
      { title: '磨坊的一天', text: '四片木质风叶带动磨坊。磨坊主站在门边，搬运面粉的村民沿石路往来，猫咪在阳光里打盹。' },
    ],
    camera: [13, 7, 15], target: [5.5, 1, 1.1], marker: [6.2, 3.8, 0.2],
  },
  {
    id: 'forest',
    name: '低语森林',
    subtitle: '每一棵树，都有自己的年轮与秘密。',
    description: '岛屿背面是起伏的草丘与针叶林。圆润的阔叶树和高低错落的松树沿山脊生长，林间露出蘑菇、岩石与一条只属于小狐狸的路。',
    details: [
      { title: '草丘与林地', text: '柔软的丘陵从草甸过渡到山石，深浅不同的树冠构成林缘。低矮灌木为小动物留出躲藏的地方。' },
      { title: '狐狸的约定', text: '一只陶色的小狐狸在树下等候。牧羊人牵着羊走过草坡，远处的碎石小岛悬在云间，像还未读完的一句话。' },
    ],
    camera: [-13, 9, -13], target: [-4, 1, -3.6], marker: [-5.8, 3.2, -3.7],
  },
  {
    id: 'waterfall',
    name: '星落瀑布',
    subtitle: '河流到了世界的尽头，便成为云。',
    description: '一条浅浅的溪流绕过磨坊，汇入碧色的小湖，再从浮空岛的边缘轻轻落下。水没有终点，只在云海里换一种模样。',
    details: [
      { title: '溪流与石拱桥', text: '圆石围着清浅的湖泊，木桥连接两岸。溪面浮着细碎波光，桥边的垂钓人不太在意有没有鱼上钩。' },
      { title: '悬崖下的世界', text: '瀑布沿着层叠的悬岩垂落，细水在半空中渐渐散成雾。岛屿的底部露出风化岩层与植物根系。' },
    ],
    camera: [15, 3, 17], target: [4.5, -0.8, 5.3], marker: [4.7, 1.1, 5.6],
  },
]

export const DEFAULT_CAMERA: [number, number, number] = [21, 15, 28.5]
export const DEFAULT_TARGET: [number, number, number] = [0, 1.7, 0]
export const INTERIOR_CAMERA: [number, number, number] = [9, 7.4, 14]
export const INTERIOR_TARGET: [number, number, number] = [-0.6, 2.8, -0.5]
