/**
 * 视角预设。
 * 单独放在没有 three.js 依赖的模块里，UI 可以直接引用，
 * 不会把 three 拖进首屏 bundle。
 */

export type ViewCategory = '外观' | '内部' | '岛上'

export interface ViewPreset {
  id: string
  label: string
  category: ViewCategory
  position: [number, number, number]
  target: [number, number, number]
  /** 该视角的解说文字 */
  note: string
  /** 建议同时开启透视模式 */
  suggestXRay?: boolean
}

/** 与 castle.ts / interior.ts 的常量保持一致。 */
const CASTLE_Y = 2.8
const KEEP_Z = -4
const F_DUNGEON = CASTLE_Y
const F_HALL = CASTLE_Y + 3.2
const F_COUNCIL = CASTLE_Y + 8.4
const F_BEDROOM = CASTLE_Y + 12.6

export const VIEW_PRESETS: ViewPreset[] = [
  {
    id: 'panorama',
    label: '全景',
    category: '外观',
    position: [96, 50, 108],
    target: [0, 4, 0],
    note: '整座浮空岛：上方是草原、湖泊、村庄与农田，下方是倒锥形的岩层，垂着树根与发光的矿石，碎石不断坠落。',
  },
  {
    id: 'gate',
    label: '城门与吊桥',
    category: '外观',
    position: [4, 21, 64],
    target: [0, 9, 24],
    note: '八角形城墙的正面：门楼带两座圆塔、石拱门洞、半升起的铁闸门与敞开的包铁木门，吊桥跨过干护壕，由两根铁链吊住。',
  },
  {
    id: 'wallwalk',
    label: '城墙步道',
    category: '外观',
    position: [34, 15, 38],
    target: [13, 9.5, 15],
    note: '墙顶的巡逻道：外侧是雉堞与支垛，内侧是矮护墙，每隔一段有箭窗、扶壁与火把。点灯人与卫兵沿这条道巡夜。',
  },
  {
    id: 'courtyard',
    label: '内庭',
    category: '外观',
    position: [16, 13, 22],
    target: [0, 5, 0],
    note: '内庭环绕主堡：教堂、马厩、铁匠铺、兵营与训练场，另有水井、鸽舍、货车、木箱、菜畦与晾衣绳——一座自给自足的小城。',
  },
  {
    id: 'chapel',
    label: '教堂',
    category: '外观',
    position: [-36, 30, 16],
    target: [-12.5, 6, -8],
    note: '城堡教堂：中殿、半圆圣坛、钟楼与尖顶，山墙上是彩色玻璃玫瑰窗，侧窗在夜里会透出蓝、红、黄的光。',
  },
  {
    id: 'aerial',
    label: '俯瞰',
    category: '外观',
    position: [4, 138, 46],
    target: [0, 0, 0],
    note: '正上方俯瞰：能看清八角城墙、主堡屋顶、螺旋楼梯塔，以及岛上放射状分布的石板路。',
  },
  {
    id: 'underside',
    label: '岛底',
    category: '外观',
    position: [108, -72, 124],
    target: [0, -14, 0],
    note: '浮空岛的底部：车削出的倒锥岩层加了噪声断裂，垂挂树根与藤蔓，嵌着发冷光的矿石——那是岛屿悬浮的理由。',
  },
  {
    id: 'dollhouse',
    label: '主堡剖面',
    category: '外观',
    position: [38, 24, 34],
    target: [0, 11, KEEP_Z],
    note: '透视模式下，城墙与主堡石墙变为半透明、屋顶隐去，四层楼同时可见：地牢、大厅、议事厅与图书馆、卧室与天文台。',
    suggestXRay: true,
  },

  {
    id: 'greatHall',
    label: '大厅',
    category: '内部',
    position: [2.8, F_HALL + 2.4, 0.8],
    target: [0, F_HALL + 1.8, KEEP_Z - 5.4],
    note: '大厅（Great Hall）：北端三级台阶上的王座与华盖，两侧旗帜；两张七米长桌配长凳、餐具与烤肉；西墙大壁炉；四根石柱托住木梁天花板，两盏八枝吊灯，墙上挂毯，南端入口上方是乐师廊。',
  },
  {
    id: 'council',
    label: '议事厅',
    category: '内部',
    position: [4.8, F_COUNCIL + 2.0, KEEP_Z - 1.6],
    target: [-1.6, F_COUNCIL + 1.2, KEEP_Z - 4.0],
    note: '二层北半的议事厅：橡木圆桌铺着地图与标记，八把椅子环绕，主位是一张缩小版的王座；墙上挂着航海图与罗盘玫瑰，两侧立着旗帜。',
  },
  {
    id: 'library',
    label: '图书馆',
    category: '内部',
    position: [4.6, F_COUNCIL + 2.0, KEEP_Z + 5.2],
    target: [-2.6, F_COUNCIL + 1.4, KEEP_Z + 2.0],
    note: '二层南半的图书馆：三面墙到顶的书架塞满书卷与羊皮纸，中央阅读桌上摊开着书，另有地球仪、浑天仪、书梯、散落的书堆，以及一张铺地毯的扶手椅阅读角。',
  },
  {
    id: 'bedroom',
    label: '卧室',
    category: '内部',
    position: [-0.6, F_BEDROOM + 2.0, KEEP_Z + 5.4],
    target: [-4.8, F_BEDROOM + 1.2, KEEP_Z - 2.8],
    note: '三层西半的卧室：四柱华盖床带帷幔与羽绒枕，衣柜、梳妆台与圆镜、洗脸架、宝箱、坐垫，窗座上放着靠垫，地毯是蓝底金边。',
  },
  {
    id: 'observatory',
    label: '天文台',
    category: '内部',
    position: [5.8, F_BEDROOM + 2.0, KEEP_Z + 5.6],
    target: [3.4, F_BEDROOM + 1.4, KEEP_Z - 3.2],
    note: '三层东半的天文台：黄铜望远镜架在三脚架上指向大窗，星图桌上钉着星座图，墙上挂三面星象盘，还有浑天仪、天平与一叠天文手稿。屋顶留有观星天窗。',
  },
  {
    id: 'dungeon',
    label: '地牢与厨房',
    category: '内部',
    position: [-1.2, F_DUNGEON + 1.9, KEEP_Z + 7.4],
    target: [-5.0, F_DUNGEON + 1.0, KEEP_Z - 3.0],
    note: '底层一分为二：西半是三间带铁栅的牢房，内有稻草、水桶、锁链与狱卒的钥匙桌；东半是厨房与储藏室，有大灶、吊锅、面团案、悬挂的铜锅香草、面包奶酪架、酒桶，角落里还锁着一箱金币。',
  },
  {
    id: 'stair',
    label: '螺旋楼梯',
    category: '内部',
    position: [-16, 13, KEEP_Z - 4],
    target: [-8.4, 10, KEEP_Z - 8.4],
    note: '贴在主堡西北角外的螺旋楼梯塔：78 级石阶绕中心柱盘旋四圈多，外侧有木扶手与栏杆柱，每层设有休息平台，塔身开窄窗采光，直通屋顶。',
    suggestXRay: true,
  },

  {
    id: 'prince',
    label: '小王子与狐狸',
    category: '岛上',
    position: [37, 9, 18],
    target: [30, 4.4, 8],
    note: '岛东侧的小丘上：金发的小王子系着白围巾，身旁坐着驯养的狐狸，面前是玻璃罩里的那朵玫瑰——只有四根刺，却是他唯一的花。',
  },
  {
    id: 'lake',
    label: '湖泊',
    category: '岛上',
    position: [-58, 12, 48],
    target: [-40, 0, 26],
    note: '岛西北的湖：水面有正弦涟漪，湖底是沙泥色，浮着睡莲，岸边长芦苇；木栈桥尽头挂着一盏灯，还系着一条小木船。',
  },
  {
    id: 'waterfall',
    label: '瀑布',
    category: '岛上',
    position: [-74, -6, 56],
    target: [-56, -16, 36],
    note: '湖水沿溪流渠道流向岛缘，从断崖口溢出成瀑布，一路落到岛底以下五十米，沿途散出水雾。',
  },
  {
    id: 'village',
    label: '村庄',
    category: '岛上',
    position: [38, 13, 58],
    target: [22, 4, 37],
    note: '城墙外的村庄：九栋半木结构民居，屋顶有烟囱冒着炊烟，村中有水井、集市摊位，石板路一直通到城门。',
  },
  {
    id: 'farmland',
    label: '农田与风车',
    category: '岛上',
    position: [-46, 13, -52],
    target: [-30, 4, -32],
    note: '梯田式的农田：一千五百株麦穗按条带状耕作色排布，田边有农舍、草垛与栅栏，石砌风车的四片帆一直在转。',
  },
  {
    id: 'roseGarden',
    label: '玫瑰园',
    category: '岛上',
    position: [46, 11, 42],
    target: [33, 4, 25],
    note: '环形绿篱围出的玫瑰园：红、粉、白三色玫瑰各九十丛，内圈是碎石小径，园门口立着爬满花的木拱门。',
  },
  {
    id: 'forest',
    label: '森林',
    category: '岛上',
    position: [58, 13, -44],
    target: [40, 5, -26],
    note: '岛东南的森林：圆冠树与松树混生，间有秋色，林间空地上长着一圈小蘑菇。树冠会随风轻轻摆动。',
  },
  {
    id: 'sheep',
    label: '绵羊圈',
    category: '岛上',
    position: [26, 10, 40],
    target: [16, 4, 26],
    note: '草地上的木栅栏羊圈：六只卷毛绵羊在吃草，有小羊棚、水槽与干草堆，牧羊人拄着弯头羊杖站在旁边。',
  },
]

export const VIEW_CATEGORIES: ViewCategory[] = ['外观', '内部', '岛上']

export function presetsByCategory(category: ViewCategory): ViewPreset[] {
  return VIEW_PRESETS.filter((p) => p.category === category)
}

export function findPreset(id: string | null): ViewPreset | undefined {
  if (!id) return undefined
  return VIEW_PRESETS.find((p) => p.id === id)
}
