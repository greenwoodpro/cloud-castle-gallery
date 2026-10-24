export type WorldView = 'island' | 'castle' | 'residents' | 'nature'
export type TimeOfDay = 'morning' | 'sunset' | 'night'
export type Vec3 = [number, number, number]

export const palette = {
  paper: '#f4f2e9',
  ink: '#4d5756',
  sage: '#93a286',
  slate: '#87979f',
  gold: '#c4a574',
}

export const views: Record<WorldView, { position: Vec3; target: Vec3; label: string }> = {
  island: { position: [19.5, 14, 24], target: [0, 1.7, 0], label: '浮岛全景' },
  castle: { position: [6.5, 6, 13], target: [0, 2.5, -0.5], label: '城堡内部' },
  residents: { position: [6.5, 5.5, 11], target: [-1.8, 0.8, 2.8], label: '岛上居民' },
  nature: { position: [14, 6.5, 11], target: [3.8, -0.2, 1.8], label: '自然秘境' },
}

export const chapters = [
  {
    id: 'castle', number: '01', title: '云端的城堡', subtitle: '每一扇窗，都藏着一个小小的故事。',
    tag: '建筑与室内', view: 'castle' as WorldView,
    description: '以欧洲中世纪城塞、法式尖顶与修道院庭院为灵感，这座想象中的城堡不属于任何王朝。它只属于愿意抬头看云的人。',
    sections: [
      { title: '城门与防御回廊', text: '两座圆形门塔守着拱形入口。木吊桥接向石阶，城墙上排列着垛口与巡逻步道；细长箭窗让守望者看见远方，却不必惊动岛上的安宁。' },
      { title: '一层 · 宴会厅与厨房', text: '开启内部剖视，可以看见中央长桌、木凳、餐盘和壁炉。侧边的厨房摆着陶罐与储物架，石壁隔开食物储藏间与通向楼上的阶梯。' },
      { title: '二层 · 藏书室与卧房', text: '木楼板承托着成排书架、书桌和一本摊开的书。另一侧是有床柱的小床、柔软被褥与木箱。窗边留着一个位置，给每个旅行归来的人。' },
      { title: '高塔 · 观星室', text: '最高的尖塔伸向星空，屋顶下是一间小小的观星室。望远镜、星图桌与温润的木楼板相伴；金色风向旗记录着云海每天经过的方向。' },
    ],
  },
  {
    id: 'residents', number: '02', title: '住在星星旁的人', subtitle: '小小的身影，让整座岛有了温度。',
    tag: '人物与日常', view: 'residents' as WorldView,
    description: '这里没有繁忙的钟声。每个人都有一件珍视的小事，而那些看似微不足道的事，恰好构成了一整个世界。',
    sections: [
      { title: '披围巾的旅人', text: '城门前，金发小旅人披着长长的围巾，和狐狸一起仰望高塔。他并不急着抵达，脚下的每一块石头都值得停留。' },
      { title: '花园的照料者', text: '园丁住在西侧木屋里，每天给花圃浇水。低矮树篱围成小径，木桶收集晨露，木屋旁还有刚刚发芽的菜畦。' },
      { title: '守望者与读书人', text: '城门边的守望者带着小盾牌，巡逻的脚步很轻。庭院中，读书人守着喷泉边的长凳；羊群则慢慢经过山坡。' },
      { title: '云边的小村落', text: '木梁小屋、磨坊与一张集市木桌围成村落。屋顶烟囱没有浓烟，只有柔软云影经过。院外种着蔬菜，门前放着木桶，集市桌上摆着新烤好的面包。' },
    ],
  },
  {
    id: 'nature', number: '03', title: '风经过的地方', subtitle: '森林、溪谷与花田，各自安静地生长。',
    tag: '地形与自然', view: 'nature' as WorldView,
    description: '浮岛的地表被分成高地、草甸、林地和水岸。下方裸露的岩层像倒悬的山脉，把一小片春天托在云海之上。',
    sections: [
      { title: '层叠岩壁与悬空山体', text: '草甸之下是层层收拢的多面岩块，深浅交替的断层延伸至岛底。边缘悬挂着苔藓与藤蔓，散落的小岩岛像尚未归队的星星。' },
      { title: '溪流、石桥与瀑布', text: '东侧的溪流从林间浅潭出发，穿过木桥，最终越过浮岛边缘。细长的瀑布落入云海，水面映着天空，也倒映着城堡的尖顶。' },
      { title: '林地与花园', text: '圆冠树木与针叶林交错，灌木沿着石径生长。西侧的花圃由修剪整齐的树篱围合，白色与淡金色小花在草地上散开。' },
      { title: '从晨光到星夜', text: '晨光柔和，落日为墙面镀上一层金色；到了夜晚，窗户亮起，星星开始呼吸。切换天空时刻，听见同一座岛不同的安静。' },
    ],
  },
]
