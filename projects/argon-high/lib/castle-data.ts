export type TimeMode = 'sunset' | 'morning' | 'night'

export interface CameraPreset {
  id: string
  name: string
  subtitle: string
  position: [number, number, number]
  target: [number, number, number]
  cutawayRecommended?: boolean
  category: 'overview' | 'interior' | 'character' | 'terrain'
}

export interface InteriorSection {
  id: string
  floor: string
  name: string
  enName: string
  heightRange: string
  architecturalStyle: string
  summary: string
  structuralDetails: string[]
  furnishings: string[]
  materials: string[]
  hotspotPosition: [number, number, number]
  cameraPosition: [number, number, number]
  cameraTarget: [number, number, number]
  cutawayRequired: boolean
  colorAccent: string
}

export interface CastleCharacter {
  id: string
  name: string
  title: string
  locationName: string
  quote: string
  appearance: string
  dailyRoutine: string
  personality: string
  position: [number, number, number]
  cameraPosition: [number, number, number]
  cameraTarget: [number, number, number]
  cutawayRequired?: boolean
  badgeColor: string
}

export interface TerrainZone {
  id: string
  name: string
  enName: string
  elevation: string
  geology: string
  floraAndFauna: string
  description: string
  ecologicalRole: string
  position: [number, number, number]
  cameraPosition: [number, number, number]
  cameraTarget: [number, number, number]
  palette: string[]
}

export interface EnvironmentAspect {
  id: string
  title: string
  subtitle: string
  description: string
  visualFeatures: string[]
  symbolism: string
}

export const CAMERA_PRESETS: CameraPreset[] = [
  {
    id: 'panorama',
    name: '星屿全貌远眺',
    subtitle: 'B-612 浮空城堡群全景',
    position: [46, 30, 52],
    target: [0, 6, 0],
    cutawayRecommended: false,
    category: 'overview',
  },
  {
    id: 'cutaway-keep',
    name: '主堡内部四层剖面',
    subtitle: '透视地窖、宴会厅、书库与花房',
    position: [22, 14, 24],
    target: [0, 9.5, -2],
    cutawayRecommended: true,
    category: 'interior',
  },
  {
    id: 'rose-dome',
    name: '玻璃穹顶玫瑰花房',
    subtitle: '顶层唯一红玫瑰与小王子',
    position: [7, 23.5, 9],
    target: [0, 19.5, -2],
    cutawayRecommended: true,
    category: 'interior',
  },
  {
    id: 'great-hall',
    name: '王座礼堂与宴会厅',
    subtitle: '一层暖炉长桌与彩绘拱窗',
    position: [13, 8.5, 11],
    target: [0, 5.5, -2],
    cutawayRecommended: true,
    category: 'interior',
  },
  {
    id: 'scriptorium',
    name: '星象环形图书馆',
    subtitle: '二层古籍书架与天球仪',
    position: [12, 13.8, 10],
    target: [0, 11.2, -2],
    cutawayRecommended: true,
    category: 'interior',
  },
  {
    id: 'alchemy-vault',
    name: '星核浮空炼金地窖',
    subtitle: 'B1 层以太水晶浮力核心',
    position: [13, 3.2, 12],
    target: [0, 1.0, -2],
    cutawayRecommended: true,
    category: 'interior',
  },
  {
    id: 'gatehouse',
    name: '瓮城吊桥与点灯人',
    subtitle: '南门双塔、护城河与星灯',
    position: [10, 8, 30],
    target: [0, 3.5, 15],
    cutawayRecommended: false,
    category: 'character',
  },
  {
    id: 'fox-wheat',
    name: '金色麦浪与小狐狸',
    subtitle: '东侧梯田「驯服与金发麦田」',
    position: [28, 10, 16],
    target: [15, 3.2, 4],
    cutawayRecommended: false,
    category: 'terrain',
  },
  {
    id: 'windmill-islet',
    name: '风车副岛与云端石桥',
    subtitle: '东北部浮屿、木风车与绵羊草坡',
    position: [42, 15, -10],
    target: [26, 6, -14],
    cutawayRecommended: false,
    category: 'terrain',
  },
  {
    id: 'volcano-cliff',
    name: '三座微型火山与日落椅',
    subtitle: '西岸玄武岩台地与四十四次日落',
    position: [-34, 12, 14],
    target: [-18, 4, 2],
    cutawayRecommended: false,
    category: 'terrain',
  },
  {
    id: 'crystal-roots',
    name: '浮岛底端星晶岩根',
    subtitle: '仰视倒悬山岩与发光紫水晶簇',
    position: [28, -14, 32],
    target: [0, -8, 0],
    cutawayRecommended: false,
    category: 'terrain',
  },
]

export const INTERIOR_SECTIONS: InteriorSection[] = [
  {
    id: 'b1-alchemy',
    floor: 'B1 地下一层',
    name: '星核地窖与浮空炼金室',
    enName: 'Aether Core Undercroft & Alchemy Vault',
    heightRange: '海拔 -2.0m ~ +2.8m（嵌入主岛岩芯）',
    architecturalStyle: '罗曼式厚重石拱（Romanesque Groin Vault）与黄铜星轨机关',
    summary:
      '位于中央主堡基座正下方，直接凿入浮空岛的星陨石灰岩层。室内中央悬浮着一颗缓慢脉动的「B-612 以太浮空晶核」，通过三道黄铜陀螺仪环将重力转化为柔和的上升浮力，支撑整座城堡群落稳稳停驻于云海之上。',
    structuralDetails: [
      '十字交叉石肋拱顶：由四根粗壮的暖砂岩墩柱承重，将上方三层主堡的荷载均匀传导至浮岛基岩。',
      '重力传导井：地板中央设有八角形下沉式能量池，与岛底倒悬的紫水晶矿脉直接贯通。',
      '恒温储藏暗廊：北侧墙体嵌有拱形壁龛，用于存放修道院酿造的薰衣草蜜酒与星辰药剂。',
    ],
    furnishings: [
      '悬浮以太蓝水晶核心与双层旋转黄铜星环',
      '炼金蒸馏器皿台、羊皮卷手稿与发光药水瓶',
      '中世纪橡木酒桶阵列与锻铁壁挂火炬',
    ],
    materials: ['深赭石基岩砖', '拉丝古黄铜', '半透明发光天青石', '陈年北美白橡木'],
    hotspotPosition: [0, 1.2, -2],
    cameraPosition: [13, 3.2, 12],
    cameraTarget: [0, 1.0, -2],
    cutawayRequired: true,
    colorAccent: '#5FB3B3',
  },
  {
    id: '1f-greathall',
    floor: '1F 首层核心',
    name: '王座大礼堂与骑士宴会厅',
    enName: 'The Great Hall & Sovereign Banquet Chamber',
    heightRange: '海拔 +2.8m ~ +8.8m（挑高 6 米）',
    architecturalStyle: '早期哥特式尖拱长厅（Early Gothic Hall）配绘本暖色木梁',
    summary:
      '主堡一层是整座城堡最温暖热闹的社交心脏。地面铺设奶油白与暖灰陶交错的棋盘格石砖，中央摆放长达八米的橡木宴会长桌。北端高台上设有天鹅绒王座与巨型石砌壁炉，炉火终年不熄，驱散高空云层的寒意。',
    structuralDetails: [
      '双排哥特式束柱走廊：两侧立柱向上延伸托起木质桁架天花，形成庄重而温柔的纵深感。',
      '两侧彩绘玻璃高窗：东窗迎入晨曦，西窗映照「四十四次日落」的琥珀色霞光。',
      '贯通式壁炉烟道：北墙厚达 1.8 米，内置双螺旋排烟道，温暖整座主堡的墙体。',
    ],
    furnishings: [
      '铺有勃艮第红桌旗的橡木长宴会桌与高背木椅',
      '黄金烛台、银质酒爵与烘焙麦香面包盘',
      '高台红丝绒领主王座、壁挂星辰挂毯与暖光壁炉',
    ],
    materials: ['科茨沃尔德暖奶油石灰岩', '勃艮第天鹅绒', '手绘彩玻', '蜂蜡涂装胡桃木'],
    hotspotPosition: [0, 5.5, -2],
    cameraPosition: [13, 8.5, 11],
    cameraTarget: [0, 5.5, -2],
    cutawayRequired: true,
    colorAccent: '#E58D82',
  },
  {
    id: '2f-library',
    floor: '2F 二层文化核心',
    name: '皇家抄写室与星象环形书库',
    enName: 'Celestial Scriptorium & Ring Library',
    heightRange: '海拔 +8.8m ~ +14.8m',
    architecturalStyle: '中世纪修道院藏书阁（Monastic Scriptorium）与玫瑰花窗层',
    summary:
      '这里收藏着旅人们途经各个小行星留下的见闻手稿——有点灯人的值班日志、地理学家的山川永存图鉴，以及狐狸口述的《驯服哲学》。通高书架环壁而立，中央陈列着一架精密运转的黄铜天球仪。',
    structuralDetails: [
      '悬挑木质回廊：沿四壁架设胡桃木二层走马廊，配以镂空三叶草雕花护栏。',
      '正南向大玫瑰花窗（Rose Window）：十二瓣放射状窗棂如盛开的玫瑰，将阳光染成柔和的粉金色。',
      '静音木质浮筑楼板：采用双层杉木龙骨与羊毛毡隔音层，保持阅读与沉思的静谧。',
    ],
    furnishings: [
      '四面通顶彩色绘本古籍书架（藏书逾三千册）',
      '中央大型黄铜浑天仪（Armillary Sphere）与星图桌',
      '斜面抄写木台、鹅毛笔墨水瓶与暖黄羊皮纸台灯',
    ],
    materials: ['温润樱桃木', '彩色压花皮革书脊', '磨砂彩绘琉璃', '手工羊皮纸'],
    hotspotPosition: [0, 11.2, -2],
    cameraPosition: [12, 13.8, 10],
    cameraTarget: [0, 11.2, -2],
    cutawayRequired: true,
    colorAccent: '#F2C96B',
  },
  {
    id: '3f-rosedome',
    floor: '3F 顶层圣殿',
    name: '玫瑰温室穹顶与星象观测台',
    enName: 'Glass Rose Sanctuary & Astral Observatory',
    heightRange: '海拔 +14.8m ~ +23.5m',
    architecturalStyle: '文艺复兴早期肋架玻璃穹顶（Ribbed Glass Conservatory）与观星尖塔',
    summary:
      '主堡最高处并非军事箭楼，而是一座通体澄澈的锻铁玻璃花房。花房正中央的汉白玉底座上，安放着那朵独一无二的红玫瑰与防风玻璃罩。旁侧延伸出观星露台与高耸的尖顶钟塔，小王子常在此擦拭玻璃罩、仰望漫天繁星。',
    structuralDetails: [
      '十二肋锻铁玻璃穹顶：白天汇聚和煦日光，夜晚如同一盏漂浮在云海上的水晶灯笼。',
      '可开合防风屏风系统：根据高空微风方向调节通风，呵护娇嫩却骄傲的玫瑰。',
      '侧翼螺旋观星塔：通过外挂圆形石塔内的旋转石梯直达最高处星象仪。',
    ],
    furnishings: [
      '金边玻璃钟罩与四刺红玫瑰（The Beloved Rose）',
      '紫铜折射望远镜、铜壶浇水器的鎏金收纳架',
      '可折叠绘本屏风与星轨记录仪',
    ],
    materials: ['高透吹制水晶玻璃', '雾面香槟金锻铁', '卡拉拉白大理石', '丝绒玫瑰花瓣'],
    hotspotPosition: [0, 18.2, -2],
    cameraPosition: [7, 23.5, 9],
    cameraTarget: [0, 19.5, -2],
    cutawayRequired: true,
    colorAccent: '#E06D79',
  },
  {
    id: 'chapel-cloister',
    floor: '西翼附属建筑',
    name: '晨星哥特礼拜堂与静思回廊',
    enName: 'Morning Star Gothic Chapel & Cloister',
    heightRange: '海拔 +2.0m ~ +16.0m',
    architecturalStyle: '盛期哥特式飞扶壁建筑（High Gothic with Flying Buttresses）',
    summary:
      '位于主堡西侧，拥有高耸的板岩蓝尖顶与纤细的钟楼。每当黄昏来临或清晨破晓，钟楼会敲响清脆如八音盒般的钟声，提醒岛上的居民停下手中的忙碌，欣赏又一次日落。',
    structuralDetails: [
      '外露轻盈石质扶壁：勾勒出优美的几何剪影，兼具结构稳固与童话美感。',
      '柳叶尖拱长窗（Lancet Windows）：内部透出温暖的琥珀色烛光。',
      '半围合中庭回廊：连接主堡与西侧花园，雨天亦可在拱廊下漫步。',
    ],
    furnishings: ['管风琴共鸣壁', '长排木质祈祷椅', '钟楼青铜风铃钟'],
    materials: ['雾蓝页岩瓦', '暖白砂岩', '彩绘铅条玻璃'],
    hotspotPosition: [-10, 7, -1],
    cameraPosition: [-20, 11, 14],
    cameraTarget: [-10, 6, -1],
    cutawayRequired: false,
    colorAccent: '#7A9CC6',
  },
  {
    id: 'courtyard-ward',
    floor: '外城与内庭工坊群',
    name: '半木结构内庭、面包坊与双塔瓮城',
    enName: 'Timber-Framed Inner Ward, Bakery & Gatehouse',
    heightRange: '海拔 +1.5m ~ +12.0m',
    architecturalStyle: '阿尔萨斯/诺曼底半木结构（Colombage Timber Framing）与中世纪城防',
    summary:
      '环绕主堡的环形城墙四角矗立着圆锥顶角楼，南侧为带有可升降铁闸门与木吊桥的双塔瓮城。内庭广场设有许愿喷泉，东侧紧挨着飘出麦香的半木结构面包工坊与铁匠铺，充满温柔的人间烟火气。',
    structuralDetails: [
      '稚堞垛口步道（Chemin de Ronde）：守卫与旅人可沿城墙顶部环绕漫步，俯瞰脚下云海。',
      '配重式橡木吊桥：横跨琉璃护城河，连接城门与南端迎宾石阶。',
      '外露木筋墙体：白灰泥墙面镶嵌暖棕色交叉木骨，屋顶覆盖赤陶红鱼鳞瓦。',
    ],
    furnishings: ['内庭中央星泉水池', '面包窑炉与冒着白烟的石砌烟囱', '城门锻铁落闸与旗帜'],
    materials: ['赤陶红瓦', '白垩灰泥', '深棕橡木外露梁', '青灰鹅卵石铺地'],
    hotspotPosition: [6, 4.5, 8],
    cameraPosition: [14, 11, 24],
    cameraTarget: [3, 4, 8],
    cutawayRequired: false,
    colorAccent: '#D98A6C',
  },
]

export const CASTLE_CHARACTERS: CastleCharacter[] = [
  {
    id: 'little-prince',
    name: '星旅小王子（年轻城主）',
    title: '玫瑰与浮空星屿的守护者',
    locationName: '3F 玫瑰花房观星露台',
    quote: '「正是你为你的玫瑰花费的时间，才使你的玫瑰变得如此重要。」',
    appearance:
      '身着淡青蓝镶金边礼服外套，颈间系着随高空微风轻轻飘扬的明黄色长围巾，一头蓬松柔软的金色卷发。',
    dailyRoutine:
      '清晨为西岸的三座微型火山疏通烟道，午后在二层书库翻阅星图，傍晚准时回到顶层玻璃花房为红玫瑰盖好防风屏风，并静静观赏第四十四次日落。',
    personality: '温柔、好奇、执着于真诚的联结，从不轻视任何一个看似天真的问题。',
    position: [2.4, 15.2, 1.5],
    cameraPosition: [8.5, 19.5, 9.5],
    cameraTarget: [1.5, 16.2, 0.2],
    cutawayRequired: false,
    badgeColor: '#F2C96B',
  },
  {
    id: 'tamed-fox',
    name: '小狐狸阿金（Le Renard）',
    title: '麦田梯田的哲学家与挚友',
    locationName: '东侧金色麦浪与薰衣草梯田',
    quote: '「只有用心灵才能看得清事物本质，真正重要的东西是用眼睛看不见的。」',
    appearance:
      '温暖的朱砂橘红毛色，胸前与蓬松大尾巴尖端呈奶油白色，竖着两只灵敏的尖耳朵，眼神清澈温和。',
    dailyRoutine:
      '喜欢在下午四点钟坐在东侧金黄色麦田的石阶旁（因为如果小王子四点来，它从三点钟就会开始感到幸福），偶尔追逐麦穗间飞舞的发光蒲公英。',
    personality: '聪慧、细腻、懂得「仪式感」与「驯服」的真谛。',
    position: [15.5, 2.2, 5.2],
    cameraPosition: [23, 6.5, 12],
    cameraTarget: [15.5, 2.5, 5.2],
    cutawayRequired: false,
    badgeColor: '#E88358',
  },
  {
    id: 'lamplighter',
    name: '守信的点灯人',
    title: '瓮城吊桥与星路引航者',
    locationName: '南门双塔瓮城与琉璃吊桥头',
    quote: '「我的工作很辛苦，但绝不荒谬——因为每点亮一盏灯，就像让天上多诞生了一颗星星，或地上多开了一朵花。」',
    appearance:
      '戴着圆边软呢帽与藏青色披肩，手持一根修长的黄铜挑杆，杆头悬挂着一盏散发暖琥珀光芒的六角星灯。',
    dailyRoutine:
      '随着浮空岛的自转与昼夜交替，一丝不苟地点亮或熄灭吊桥与城墙上的每一盏路灯，为远道而来的星际旅人照亮落脚点。',
    personality: '尽职、纯粹、全城堡唯一一个不只关心自己的人。',
    position: [2.2, 1.8, 17.8],
    cameraPosition: [8, 5.5, 25],
    cameraTarget: [1.5, 2.5, 17.5],
    cutawayRequired: false,
    badgeColor: '#F4B966',
  },
  {
    id: 'astronomer',
    name: '观星地理学家老博学',
    title: '星轨记录官与浮岛编年史家',
    locationName: '主堡东北角观星尖塔连廊',
    quote: '「我们只记录永恒的山川与星辰——但唯有那朵短暂盛开的玫瑰，让永恒有了温度。」',
    appearance:
      '身穿缀满银色星座暗纹的深紫蓝长袍，头戴微弯的学者高帽，白胡须垂至胸前，手捧羊皮星盘。',
    dailyRoutine:
      '白天在二层圆形图书馆整理各颗小行星的访客记录，夜晚登上观星塔校准黄铜望远镜，测算彗星掠过城堡的时刻。',
    personality: '严谨却富于童心，最终被小王子说服，将「花朵」也写进了永恒的地理书。',
    position: [-5.8, 14.8, -5.8],
    cameraPosition: [-12, 18.5, 2],
    cameraTarget: [-5.8, 15.2, -5.8],
    cutawayRequired: false,
    badgeColor: '#8B80B6',
  },
  {
    id: 'gentle-knight',
    name: '云端守卫骑士罗兰',
    title: '内庭与玫瑰誓约的护卫',
    locationName: '内庭广场喷泉与城门步道',
    quote: '「我的长枪不为征服而举，只为挡住偶尔吹向玫瑰的凌冽北风。」',
    appearance:
      '身披柔和银白与雾蓝色相间的轻甲，肩披淡玫瑰色披风，身旁站立着一匹温顺的奶油白色骏马。',
    dailyRoutine:
      '每日清晨巡视环城雉堞与云端石拱桥，给白马梳理鬓毛，午后常听吟游诗人在喷泉旁弹奏鲁特琴。',
    personality: '谦逊、温和，崇尚旧日骑士的守护精神。',
    position: [-3.5, 1.8, 9.2],
    cameraPosition: [-9, 5.5, 16],
    cameraTarget: [-3.0, 2.2, 9.0],
    cutawayRequired: false,
    badgeColor: '#7A9CC6',
  },
  {
    id: 'troubadour-baker',
    name: '吟游面包师米歇尔',
    title: '麦香工坊主理人与歌谣收集者',
    locationName: '内庭东侧半木结构工坊前',
    quote: '「用东岸梯田的金麦烤出的面包，尝起来有阳光和友情的味道。」',
    appearance:
      '系着亚麻白围裙，头戴插着一根白鸽羽毛的贝雷帽，怀抱一把圆腹木制鲁特琴。',
    dailyRoutine:
      '用风车副岛磨出的新麦粉烘烤牛角包与乡村欧包，烟囱里冒出的圆团白烟会飘成云朵的形状。',
    personality: '热情开朗，能把每一颗流星的故事编成温柔的民谣。',
    position: [6.2, 1.8, 6.8],
    cameraPosition: [12, 5.5, 13],
    cameraTarget: [6.0, 2.2, 6.5],
    cutawayRequired: false,
    badgeColor: '#D98A6C',
  },
  {
    id: 'sheep-and-box',
    name: '箱中小绵羊（Le Mouton）',
    title: '翡翠草坡与猴面包树苗巡查员',
    locationName: '风车副岛与主岛交界草坡',
    quote: '「你给我画一只绵羊吧……瞧，你要的羊就在这个带三个透气孔的木箱子里。」',
    appearance:
      '蓬松如云朵般的奶油白卷毛小羊，身旁放着那个著名的、带三个圆孔的浅木色小箱子。',
    dailyRoutine:
      '在风车岛与主岛草坡上慢悠悠地吃草，帮小王子清除可能会把星球撑裂的猴面包树（巴奥巴树）幼苗，但绝不会碰顶层的红玫瑰。',
    personality: '安静、温顺，累了就会钻回木箱子里打瞌睡。',
    position: [25.5, 4.8, -11.5],
    cameraPosition: [33, 8.5, -5],
    cameraTarget: [25.5, 5.0, -11.5],
    cutawayRequired: false,
    badgeColor: '#95B89C',
  },
]

export const TERRAIN_ZONES: TerrainZone[] = [
  {
    id: 'main-plateau',
    name: '翡翠苔原与星岩主台地',
    enName: 'Emerald Velvet Plateau & B-612 Highlands',
    elevation: '主岛核心层（海拔 0m ~ +4.5m）',
    geology: '微弧形星球曲率表层土壤，下覆暖赭色砂岩与粉灰石灰岩层理',
    floraAndFauna: '丝绒短叶三叶草、高山雏菊、环绕飞行的折纸白鸽群',
    description:
      '主浮空岛顶部呈现《小王子》B-612 星球特有的柔和微弧曲率。青翠欲滴的草坪如天鹅绒般铺展，鹅卵石小径蜿蜒连接南门吊桥、内庭广场与东西两侧山坡。',
    ecologicalRole: '承载整座中世纪城堡群落的核心地基，收集云雾露水汇入内庭星泉。',
    position: [0, 1.5, 8],
    cameraPosition: [22, 16, 32],
    cameraTarget: [0, 3, 4],
    palette: ['#84A98C', '#A3C49B', '#E8D8C0'],
  },
  {
    id: 'wheat-terraces',
    name: '金色麦浪与薰衣草东岸梯田',
    enName: 'Golden Wheat & Lavender Stepped Terraces',
    elevation: '主岛东翼缓坡（海拔 +1.2m ~ +3.8m）',
    geology: '富含阳光矿质的暖黄壤梯田，以干垒矮石墙分级围合',
    floraAndFauna: '随风摇曳的金黄小麦穗、普罗旺斯紫薰衣草丛、小狐狸阿金与蜜蜂',
    description:
      '致敬小王子与狐狸关于「金黄色麦田」的约定。层层叠叠的弧形梯田分布在城堡东侧向阳坡，微风拂过时，上百株立体麦穗泛起温暖的金色涟漪，与淡紫色的薰衣草交相辉映。',
    ecologicalRole: '为城堡面包坊提供阳光麦粒，同时也是小狐狸每日下午四点守候的秘密花园。',
    position: [15.5, 2.0, 4.0],
    cameraPosition: [28, 10, 16],
    cameraTarget: [15, 3.2, 4],
    palette: ['#F2C96B', '#D9A74A', '#9B8EC4'],
  },
  {
    id: 'crystal-moat-waterfall',
    name: '琉璃护城河与云海飞瀑',
    enName: 'Translucent Sky-Moat & Cloud-Fall Cascade',
    elevation: '南门环城水道至断崖（海拔 +0.5m ~ -18.0m）',
    geology: '天然星晶凹槽河床与悬崖溢流口',
    floraAndFauna: '发光水生睡莲、云雾水滴粒子、虹彩水汽泡',
    description:
      '澄澈的薄荷青琉璃水围绕南侧瓮城形成半月形护城河，木吊桥倒映其中。河水向南流淌至浮空岛边缘，化作一道垂直倾泻入云海的银河飞瀑，在岛屿下方激起团团绵软的白色水雾。',
    ecologicalRole: '调节浮空岛微气候湿度，瀑布飞溅的水雾在夕阳下折射出柔和的光晕。',
    position: [4.5, 0.5, 19.5],
    cameraPosition: [16, 5, 34],
    cameraTarget: [3, -2, 18],
    palette: ['#72C2C9', '#A8E0E4', '#FDF9F3'],
  },
  {
    id: 'windmill-satellite-islet',
    name: '风车果园副岛与云端石拱桥',
    enName: 'Windmill Orchard Satellite Islet & Sky Arch Bridge',
    elevation: '东北侧独立浮屿（海拔 +3.5m ~ +14.0m）',
    geology: '轻质浮石与红土岩核，由一座跨度 12 米的弧形石拱悬索桥与主岛相连',
    floraAndFauna: '圆冠童话果树、旋转四翼木风车、绵羊与三孔木箱',
    description:
      '悬浮在主岛右后方的独立小浮屿，通过一座覆满常春藤的云端石拱桥相连。岛上矗立着一座传统欧洲六角木风车，四片帆布风叶在高空信风中徐徐转动，果树下停放着小绵羊的木箱。',
    ecologicalRole: '利用高空恒定气流驱动风车研磨谷物，并为绵羊提供安静安全的牧场。',
    position: [26, 5.5, -14],
    cameraPosition: [42, 15, -10],
    cameraTarget: [26, 6, -14],
    palette: ['#84A98C', '#E58D82', '#F5E6D3'],
  },
  {
    id: 'volcano-basalt-ledge',
    name: '三座微型火山口与观日落崖',
    enName: 'Three Miniature Volcanoes & 44-Sunsets Ledge',
    elevation: '主岛西岸玄武岩台地（海拔 +1.5m ~ +5.5m）',
    geology: '温暖的灰紫玄武岩锥体与温润地热岩层',
    floraAndFauna: '耐热星苔、两座冒着粉色暖蒸汽的活火山、一座安静的死火山、观日落小木椅',
    description:
      '完美还原《小王子》中齐膝高的三座小火山：两座活火山正咕嘟咕嘟冒着温柔的暖粉色蒸汽（非常适合早上热早餐！），另一座死火山也总是被细心打扫干净——因为「谁知道呢，说不定哪天它也会喷发」。崖边放着一张小木凳，只要把椅子挪几步，就能再看一次日落。',
    ecologicalRole: '为整座寒冷高空中的浮岛提供源源不断的温和地热与暖炉热源。',
    position: [-18, 3.0, 2.0],
    cameraPosition: [-34, 12, 14],
    cameraTarget: [-18, 4, 2],
    palette: ['#7D7489', '#E58D82', '#F7C59F'],
  },
  {
    id: 'inverted-crystal-roots',
    name: '倒悬岩锥与微光星晶矿脉',
    enName: 'Inverted Mountain Roots & Luminescent Aether Geodes',
    elevation: '浮岛底部（海拔 0m ~ -22.0m）',
    geology: '多面体手工纸雕质感岩层（赭石、灰玫瑰、深板岩三色渐层）与巨型紫青晶簇',
    floraAndFauna: '倒垂的古老藤蔓根系、环绕岛底公转的碎石浮岩、发光以太萤火粒子',
    description:
      '将视角旋转至浮空岛下方，可见如绘本折纸与粘土雕塑般层叠收拢的巨大倒锥形山体。岩壁裂隙间生长着散发柔光的紫水晶与海蓝宝石晶簇，十余块小型浮石在重力和谐场中围绕岛底缓缓公转。',
    ecologicalRole: '与 B1 层的炼金星核共鸣，构成整座浮空岛群的反重力锚定系统。',
    position: [0, -10, 0],
    cameraPosition: [28, -14, 32],
    cameraTarget: [0, -8, 0],
    palette: ['#C89D7C', '#8E7DBE', '#64B6AC'],
  },
]

export const ENVIRONMENT_ASPECTS: EnvironmentAspect[] = [
  {
    id: 'art-style',
    title: '小王子绘本水彩与纸偶质感',
    subtitle: 'Saint-Exupéry Watercolor & Tactile Clay-Paper Craft',
    description:
      '摒弃冰冷写实的金属与刺眼高光，采用低饱和暖奶油调色盘、手绘颗粒感石砖纹理、柔和半球天光（Hemisphere Light）与温暖边缘轮廓光（Rim Light），让每一块城墙砖、每一片树叶都宛如从立体绘本中生长出来。',
    visualFeatures: [
      '暖羊皮纸色高光与玫瑰粉灰阴影过渡',
      '圆润多面体（Soft Faceted）山石与树冠造型',
      '窗格内部散发的暖琥珀色点光源呼吸灯效',
    ],
    symbolism: '让成人重拾孩童的目光——看见「帽子」背后的大象，看见石墙背后的玫瑰与星辰。',
  },
  {
    id: 'sunset-cycle',
    title: '一天看四十四次日落（三段天象模式）',
    subtitle: '44th Sunset · Watercolor Dawn · B-612 Starry Night',
    description:
      '支持实时切换与拖动「日落进度条」。在「四十四次日落」模式下，天空呈现杏橘与暮色紫罗兰渐变；「晨曦水彩」模式下如清爽的纸本水彩画；「璀璨星夜」下千颗繁星闪烁，城堡窗户与点灯人的灯笼温暖亮起。',
    visualFeatures: [
      '动态天穹球体着色器（Sky Dome Shader）平滑过渡三段天色',
      '太阳/月亮高度角与色温实时联动投影方向',
      '夜晚模式自动唤醒城堡内部 28 扇暖光窗户与星核辉光',
    ],
    symbolism: '「有一天，我看了四十四次日落……你知道，当人们感到非常忧伤的时候，总是喜欢看日落的。」',
  },
  {
    id: 'sky-ecosystem',
    title: '环轨小行星、折纸白鸽与云海粒子',
    subtitle: 'Orbiting Asteroids, Origami Doves & Floating Spores',
    description:
      '浮空岛并非孤立存在：远空中有 B-325、B-328 等微型小行星带着星环缓缓公转；中空有十余朵蓬松如棉花糖的云团与盘旋的折纸白鸽；近处则漂浮着数以百计的金色星尘与蒲公英绒毛。',
    visualFeatures: [
      '带倾角星环的远景微型小行星群实时轨道运行',
      '扇动翅膀并沿环形轨迹滑翔的立体白鸽群',
      '瀑布水雾粒子、面包坊烟囱圆团炊烟与火山粉色暖蒸汽',
    ],
    symbolism: '宇宙虽大而寂寥，但每一颗星球、每一缕炊烟都在温柔地彼此呼应。',
  },
]
