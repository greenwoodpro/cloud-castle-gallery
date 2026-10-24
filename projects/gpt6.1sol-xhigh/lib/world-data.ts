export type PlaceId = 'castle' | 'garden' | 'village' | 'waterfall'
export type TimeOfDay = 'day' | 'sunset' | 'night'

export const palette = {
  paper: '#f7f6f0',
  ink: '#384740',
  stone: '#d8cbb0',
  sage: '#829784',
  gold: '#d9b65e',
} as const

export const places = [
  {
    id: 'castle' as const,
    title: '星语城堡',
    subtitle: '每一扇窗，都是一个故事',
    category: '城堡 · 建筑与内部',
    description: '在云海中央，石灰岩砌成的城堡静静生长。尖顶收集星光，回廊接住风声。这里没有战争，只有一位守着日落的小小王子。',
    details: [
      { title: '主堡的三层生活', text: '底层是宴会厅：橡木长桌、陶盘与壁炉围成温暖的公共空间。二层是图书室，一排排书架沿石墙展开，小桌上摊着远方的地图。三层是寝居，低矮的床、床头柜与织毯相伴。打开「内部剖面」，可以直接看见每层的家具。' },
      { title: '塔楼、城墙与庭院', text: '四角圆塔连接带垛口的环形防御墙。中央主塔与北侧钟塔高低错落，锥形铜绿屋顶上飘着金色小旗。南门由双塔守护，石拱门通向有喷泉的内庭；窄窗与塔身石带保留了中世纪城堡的构造语言。' },
      { title: '住在城堡里的人', text: '金色头发的小王子站在高处看云；门卫带着长矛守在城门两侧；图书管理员照顾着每一本旧书。人物以小型立体偶人的方式融入场景，靠近便能发现他们。' },
    ],
    camera: [14, 12, 18] as [number, number, number],
    target: [0, 4, 0] as [number, number, number],
    pin: [0, 10.3, 0] as [number, number, number],
  },
  {
    id: 'garden' as const,
    title: '玫瑰与秘密花园',
    subtitle: '为一朵花，留下一整个春天',
    category: '花园 · 植物与人物',
    description: '城墙外的坡地上，金黄的小花沿着碎石路开放。圆润的树冠挡住远方的风，花园里的一切都被温柔地照料着。',
    details: [
      { title: '缓坡上的花园', text: '南侧草地以不规则的地形起伏衔接岩缘。细碎的花丛、矮灌木和不同高度的阔叶树围绕蜿蜒小径生长，石阶将花园与主城门连接。' },
      { title: '小王子的玫瑰', text: '路边一座玻璃罩保护着一朵金色的玫瑰。这不是一座用来炫耀的花园，而是一处关于耐心与陪伴的小小纪念。' },
      { title: '园丁的日常', text: '戴着宽檐帽的园丁守在花圃附近。木桶放在井边，长凳面对着云海；每个午后，都有人坐在这里等待一场不必着急的日落。' },
    ],
    camera: [10, 7, 18] as [number, number, number],
    target: [3.4, 0.8, 5.5] as [number, number, number],
    pin: [3.6, 1.6, 6.3] as [number, number, number],
  },
  {
    id: 'village' as const,
    title: '风车下的小村落',
    subtitle: '面包香气，沿着云朵飘散',
    category: '村落 · 生活与地形',
    description: '几间木骨架小屋依山而建，斜屋顶在树影里露出一角。风车慢悠悠地转，村民在小径上相遇，谁都愿意多停留一会儿。',
    details: [
      { title: '木骨架与石砌基座', text: '村屋使用中世纪欧洲常见的木骨架结构：深色立柱、浅色填充墙、双坡屋顶和小烟囱。三间小屋分散在西侧台地，门窗、横梁与门前的小路都可以环绕观察。' },
      { title: '会转动的风车', text: '四片木质风车叶片随时间缓缓旋转，磨坊的石基稳稳立在草地上。屋后的针叶林与村前的麦色植被形成不同的地貌层次。' },
      { title: '村里的朋友', text: '面包师站在屋前，提着篮子的旅人走在石径上，村民们穿着鼠尾草绿与麦金色的衣服。他们与城门的守卫、花园的园丁共同组成这座小岛的日常。' },
    ],
    camera: [-16, 8, 15] as [number, number, number],
    target: [-5, 1, 2] as [number, number, number],
    pin: [-6.1, 3.6, 2.5] as [number, number, number],
  },
  {
    id: 'waterfall' as const,
    title: '坠入云海的瀑布',
    subtitle: '在世界的边缘，听水流说话',
    category: '自然 · 溪流与岩层',
    description: '山泉绕过城堡，汇入一汪浅浅的湖。水流从浮岛边缘坠落，像一条松开的丝带，最后消失在柔软的云层里。',
    details: [
      { title: '从湖泊到瀑布', text: '东侧的浅湖由一圈卵石环绕，短溪流顺着岛缘流下。瀑布由半透明的层叠水带组成，细细的水纹向下移动，让静止的浮岛仍然拥有呼吸。' },
      { title: '悬空的岩石地貌', text: '草地之下是向下收束的多面岩体。浅色岩层、深色裂隙与伸出的岩棱交替分布，底部的小石块悬停在云里。整座岛可以从任意方位与下方观察。' },
      { title: '云层里的微小天气', text: '云团在岛屿周围缓缓漂浮。可以切换晴昼、日暮与星夜：白天看清建筑细节，黄昏让石墙带上暖意，夜晚则能发现窗内的灯光与远处星点。' },
    ],
    camera: [19, 5, 16] as [number, number, number],
    target: [6, -1.5, 1.8] as [number, number, number],
    pin: [8.3, -1.1, 3.8] as [number, number, number],
  },
]

export const overviewCamera = [23, 16, 29] as [number, number, number]
export const overviewTarget = [0, 2.2, 0] as [number, number, number]
