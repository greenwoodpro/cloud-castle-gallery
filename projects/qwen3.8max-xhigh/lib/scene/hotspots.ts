import * as THREE from 'three'
import { FLOOR_LEVELS } from './layout'
import { BRIDGE_CENTER, POND_CENTER } from './island'
import { CAMPFIRE_POS, ROSE_GARDEN, WHEAT_FIELD, WINDMILL_POS } from './terrain'
import { STAIR_X, STAIR_Z } from './keep'

export type Hotspot = {
  id: string
  index: number
  title: string
  subtitle: string
  desc: string
  position: THREE.Vector3
  /** 只在剖视模式下显示的室内标注。 */
  interior?: boolean
  view: { cam: THREE.Vector3; target: THREE.Vector3 }
}

const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z)

type Raw = Omit<Hotspot, 'index' | 'position' | 'view'> & {
  position: [number, number, number]
  view: { cam: [number, number, number]; target: [number, number, number] }
}

const RAW: Raw[] = [
  /* ---------- 外部 ---------- */
  {
    id: 'island',
    title: '浮空岛',
    subtitle: '整座城堡的地基',
    desc: '一块从别处撕下来的岩体，上覆草皮、下垂根须。岩层按高度分带着色，越往深处越冷越暗；岛底有一圈柔光，暗示它为什么不会掉下去。环绕的碎石以不同速度缓慢公转。',
    position: [0, -17, 19],
    view: { cam: [36, -22, 56], target: [0, -12, 0] },
  },
  {
    id: 'gate',
    title: '城门与吊桥',
    subtitle: '唯一的入口',
    desc: '两座方塔夹着一道拱券，拱顶上方是带杀人孔的挑出廊道。吊闸是九根铁杆加三道横撑，木门分两扇向内开。吊桥由两条铁链吊着，放下时跨过干壕落在前方平台上。',
    position: [0, 6.2, 16.4],
    view: { cam: [2, 10, 40], target: [0, 5.5, 15] },
  },
  {
    id: 'wall',
    title: '城墙与雉堞',
    subtitle: '八折环形幕墙',
    desc: '八个折点、八段直墙，墙厚 1.5、高 6。顶部有走道，外沿排着齿状雉堞，每块实心齿（merlon）下方留一个射箭孔。墙面每隔一段开一扇小拱窗，夜里会亮。',
    position: [-12.2, 8.4, 6.4],
    view: { cam: [-40, 17, 28], target: [-12, 7, 6.4] },
  },
  {
    id: 'tower',
    title: '圆塔',
    subtitle: '四座角塔，两种收顶',
    desc: '塔身带收分（下粗上细），顶部由一圈牛腿承托挑出的战斗平台。对角的两座戴陶土色尖顶并立旗杆，另两座是平顶加木造瞭望棚——这样轮廓不会四座一模一样。',
    position: [9.9, 15.5, 9.9],
    view: { cam: [32, 23, 36], target: [9.9, 12, 9.9] },
  },
  {
    id: 'keep',
    title: '主堡（Donjon）',
    subtitle: '五层的方形塔楼',
    desc: '城堡最后防线，边长 10.2、通高 21.75，坐落在独立的台基上。四角各有一座高出女儿墙的小塔，戴尖顶。开启剖视后四面墙会淡成幽灵轮廓，五层楼板与家具全部露出来。',
    position: [0, 16, 6.6],
    view: { cam: [28, 21, 36], target: [0, 14, 0] },
  },
  {
    id: 'chapel',
    title: '礼拜堂',
    subtitle: '带钟楼与玫瑰窗',
    desc: '长方形中殿配半圆后殿，一端是方形钟楼，钟就挂在百叶开口里。山墙上嵌三重石环的玫瑰窗，两侧是尖拱窗与扶壁。门前有一个小门廊。',
    position: [-11, 7.6, 0],
    view: { cam: [-36, 13, 12], target: [-11, 6, 0] },
  },
  {
    id: 'stables',
    title: '马厩',
    subtitle: '半木结构长屋',
    desc: '灰泥墙面上钉着深色木架，草顶双坡。旁边是木栅栏围出的马场、水槽和草堆。干草阁的窗在夜里透出暖光。',
    position: [11, 5.4, 0],
    view: { cam: [34, 11, 12], target: [11, 4, 0] },
  },
  {
    id: 'village',
    title: '内庭村落',
    subtitle: '六户半木民居',
    desc: '沿内墙排开的民居，每户都是石砌基座 + 灰泥墙 + 深色木架 + 斜撑，屋顶颜色各不相同（陶土、茅草、石板蓝）。门一律朝内庭开，烟囱会持续冒烟。',
    position: [-8.6, 5.6, -8.6],
    view: { cam: [-28, 15, -28], target: [-8.6, 4, -8.6] },
  },
  {
    id: 'well',
    title: '水井',
    subtitle: '内庭的中心',
    desc: '石砌井筒配木架双坡小顶，辘轳上缠着绳子，吊着一只木桶。井口一圈压顶石被磨得发亮。',
    position: [6.3, 4.2, -7.5],
    view: { cam: [22, 11, -22], target: [6.3, 3, -7.5] },
  },
  {
    id: 'market',
    title: '市集摊位',
    subtitle: '三处条纹雨棚',
    desc: '四根木柱撑起条纹布棚，摊板上摆着面包、苹果、布卷与陶罐。商人在这里卖"节省时间的药丸"。',
    position: [5.0, 4.0, 8.4],
    view: { cam: [20, 10, 30], target: [5, 3, 8.4] },
  },
  {
    id: 'yard',
    title: '训练场',
    subtitle: '靶架与武器架',
    desc: '圆木围栏围出一块场地，中央是转靶（quintain）：一头是圆靶，另一头挂沙袋，打偏了会被扫下马。旁边有草人、木桶和插满长枪的武器架。',
    position: [-1.5, 3.6, -9.7],
    view: { cam: [-10, 10, -32], target: [-1.5, 3, -9.7] },
  },
  {
    id: 'windmill',
    title: '风车',
    subtitle: '岛东的高地上',
    desc: '石砌塔身收分向上，戴陶土尖顶，腰部有一圈木平台与栏杆。四片帆架持续转动，帆面是米色帆布。',
    position: [WINDMILL_POS.x, 11.5, WINDMILL_POS.y],
    view: { cam: [46, 17, -26], target: [WINDMILL_POS.x, 8, WINDMILL_POS.y] },
  },
  {
    id: 'rose',
    title: '玫瑰园',
    subtitle: '小王子的地方',
    desc: '圆形石砌花坛里种着四株普通的玫瑰，正中央那一朵罩在玻璃钟罩下——它有四根刺，却并不足以保护自己。园边有一条石凳。',
    position: [ROSE_GARDEN.x, 3.6, ROSE_GARDEN.y],
    view: { cam: [16, 11, -46], target: [ROSE_GARDEN.x, 3, ROSE_GARDEN.y] },
  },
  {
    id: 'waterfall',
    title: '瀑布',
    subtitle: '岛上的水最终去了哪里',
    desc: '溪流从池塘出发，穿过石桥，一路走到岛缘，然后从缺口直落 26 单位，在下方散成水雾。水面用程序化纹理滚动，不依赖任何外部贴图。',
    position: [12.9, -9, 22],
    view: { cam: [42, -4, 54], target: [12.9, -8, 22] },
  },
  {
    id: 'pond',
    title: '池塘与码头',
    subtitle: '岛西的静水',
    desc: '池塘由地表高度函数直接挖出，边缘长满芦苇。水面顶点每帧做正弦位移，所以会有细碎的起伏。岸边有一座小木码头，系着一条小船。',
    position: [POND_CENTER.x, 3.4, POND_CENTER.y],
    view: { cam: [-44, 13, 32], target: [POND_CENTER.x, 2, POND_CENTER.y] },
  },
  {
    id: 'wheat',
    title: '麦田',
    subtitle: '岛东的金色地块',
    desc: '三百多株麦穗用批处理合并成一次绘制，外围是木栅栏，田里立着一个戴尖顶帽的稻草人。',
    position: [WHEAT_FIELD.x, 3.6, WHEAT_FIELD.y],
    view: { cam: [50, 11, 20], target: [WHEAT_FIELD.x, 3, WHEAT_FIELD.y] },
  },
  {
    id: 'bridge',
    title: '石桥',
    subtitle: '城门大道跨溪处',
    desc: '桥面长轴垂直于水流，两端各有一道半圆拱券跨在溪上。两侧是石柱栏杆，桥头各立一根灯柱，夜里点亮。',
    position: [BRIDGE_CENTER.x, 4.0, BRIDGE_CENTER.y],
    view: { cam: [12, 9, 44], target: [BRIDGE_CENTER.x, 3, BRIDGE_CENTER.y] },
  },
  {
    id: 'campfire',
    title: '篝火',
    subtitle: '岛南的营地',
    desc: '九块石头围成一圈，中间架着木柴，五簇火焰各自以不同频率跳动，配一盏会闪烁的点光源。两侧各有一根可以坐的原木。',
    position: [CAMPFIRE_POS.x, 3.2, CAMPFIRE_POS.y],
    view: { cam: [-22, 9, 48], target: [CAMPFIRE_POS.x, 2.5, CAMPFIRE_POS.y] },
  },
  {
    id: 'swing',
    title: '树下的秋千',
    subtitle: '岛西的一棵大树',
    desc: '两条麻绳从树枝垂下，座板以正弦摆动。这是全岛最没有用、也最让人想坐上去的东西。',
    position: [-21.5, 5.6, -6.5],
    view: { cam: [-48, 13, -18], target: [-21.5, 4, -6.5] },
  },

  /* ---------- 内部（剖视） ---------- */
  {
    id: 'dungeon',
    title: '地牢与储藏室',
    subtitle: '最底层 · 标高 2.68',
    interior: true,
    desc: '两间带铁栏的牢房、墙上的锁链、酒桶与酒架、板条箱和一张工具台。-Z 墙里有一道通往岛外的暗道拱门。天花板上挂着一只鸟笼——里面的鸟还没有被放走。',
    position: [1.6, FLOOR_LEVELS.dungeon + 1.6, 1.6],
    view: { cam: [17, 8, 27], target: [0, FLOOR_LEVELS.dungeon + 1.4, 0] },
  },
  {
    id: 'hall',
    title: '大厅',
    subtitle: '第一层 · 标高 7.03',
    interior: true,
    desc: '尽头是高台与王座，配紫色华盖。两张长桌各配四条长凳，桌上有盘子、酒杯、烤肉和蜡烛。-Z 墙是带柴堆的大壁炉，两盏环形吊灯从天花垂下，四面墙挂着挂毯与盾牌。',
    position: [0, FLOOR_LEVELS.hall + 2.0, 1.2],
    view: { cam: [19, 13, 29], target: [0, FLOOR_LEVELS.hall + 1.6, 0] },
  },
  {
    id: 'kitchen',
    title: '厨房与面包房',
    subtitle: '第二层 · 标高 11.38',
    interior: true,
    desc: '大灶上架着一口吊锅，旁边是穹顶面包炉。长工作台上摆着六个面包和擀面杖，天花垂下铜锅与香草束，转烤架上有正在烤的肉。角落有水桶、奶油桶和猫的坐垫。',
    position: [0.6, FLOOR_LEVELS.kitchen + 1.8, 1.0],
    view: { cam: [19, 17, 29], target: [0, FLOOR_LEVELS.kitchen + 1.4, 0] },
  },
  {
    id: 'library',
    title: '书房与星象室',
    subtitle: '第三层 · 标高 15.73',
    interior: true,
    desc: '四组书架沿墙排开，每层都逐本生成不同宽度、高度与颜色的书。写字台上摊着一本书，旁边是墨水瓶与羽毛笔。还有天球仪、四环浑天仪、钉在墙上的星图，以及一支指向窗外的望远镜。',
    position: [0.4, FLOOR_LEVELS.library + 1.9, 1.4],
    view: { cam: [19, 21, 29], target: [0, FLOOR_LEVELS.library + 1.5, 0] },
  },
  {
    id: 'bedchamber',
    title: '寝室与玫瑰室',
    subtitle: '第四层 · 标高 20.08',
    interior: true,
    desc: '四柱床挂着紫色床幔，圆地毯、衣柜、圆顶木箱、梳妆镜。窗座上放着靠垫——小王子就坐在这里看星星。床头柜上有一支蜡烛，和一朵罩在玻璃罩里的玫瑰。墙上挂着那幅"吞了大象的蟒蛇"。',
    position: [0.2, FLOOR_LEVELS.bedchamber + 1.8, 1.6],
    view: { cam: [19, 26, 29], target: [0, FLOOR_LEVELS.bedchamber + 1.4, 0] },
  },
  {
    id: 'stair',
    title: '螺旋楼梯',
    subtitle: '贯穿五层的垂直交通',
    interior: true,
    desc: '绕着中心石柱盘旋 90 级台阶，每层 18 级，从地牢一直通到屋顶平台。外侧是每两级一根的栏杆柱，加一条用曲线管生成的连续螺旋扶手。上层楼板在梯井处开了圆洞并围了木栏。',
    position: [STAIR_X + 1.2, FLOOR_LEVELS.kitchen + 1.0, STAIR_Z + 1.2],
    view: { cam: [15, 17, 25], target: [STAIR_X, FLOOR_LEVELS.kitchen, STAIR_Z] },
  },
  {
    id: 'roof',
    title: '屋顶平台',
    subtitle: '标高 24.43',
    interior: true,
    desc: '主堡顶部是一圈带雉堞的步道，角落有一座木造瞭望亭，亭里架着望远镜。夜里小王子会站在这里数星星。屋顶板属于剖视外壳，开启剖视后可以俯视最顶层。',
    position: [0, FLOOR_LEVELS.roof + 1.6, 0],
    view: { cam: [24, 36, 32], target: [0, FLOOR_LEVELS.roof, 0] },
  },
]

export const HOTSPOTS: Hotspot[] = RAW.map((h, i) => ({
  ...h,
  index: i + 1,
  position: v(...h.position),
  view: { cam: v(...h.view.cam), target: v(...h.view.target) },
}))

export const HOTSPOT_BY_ID = new Map(HOTSPOTS.map((h) => [h.id, h]))
