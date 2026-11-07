/**
 * 小王子水彩画风调色板。
 * 全部色相都从 UI 的五色系统派生：沙岩金 / 陶土玫瑰 / 苔藓绿 / 暮蓝 / 羊皮纸。
 */
export const C = {
  // 石材（沙岩系）
  stoneLight: 0xf3e4c6,
  stone: 0xe4d1ab,
  stoneShade: 0xcbb68f,
  stoneDark: 0xa8926d,
  stoneCool: 0xb9b3a6,
  mortar: 0xd8c6a2,

  // 屋顶（陶土玫瑰 + 石板蓝）
  roofRose: 0xc87f6a,
  roofDeep: 0xa9604f,
  roofLight: 0xdc9a83,
  roofSlate: 0x6d7a92,

  // 木作
  wood: 0x9a6b45,
  woodLight: 0xb98a5e,
  woodDark: 0x6f4a30,
  timber: 0x5b4030,

  // 自然
  grass: 0x7ba25f,
  grassDeep: 0x5c8448,
  grassLight: 0x94b874,
  grassDry: 0xbfae77,
  leaf: 0x6f9c58,
  leafDeep: 0x4f7a44,
  leafGold: 0xd9a95b,
  leafRose: 0xd99a86,
  trunk: 0x8a6244,
  dirt: 0x9c7f5e,

  // 岩石（暮蓝紫灰）
  rock: 0x8d8299,
  rockLight: 0xa99fb4,
  rockDeep: 0x6a5f78,
  rockDark: 0x4c4460,

  // 水
  water: 0x86b8cd,
  waterDeep: 0x5d93ad,
  foam: 0xe8f2f4,

  // 天空
  skyDayTop: 0x8dc3e2,
  skyDayBottom: 0xf7e2c3,
  skyDuskTop: 0x4b5b8e,
  skyDuskBottom: 0xeaa37c,
  skyNightTop: 0x131b38,
  skyNightBottom: 0x3b4573,
  fogDay: 0xdfe6ea,
  fogDusk: 0xc99a86,
  fogNight: 0x232c50,

  // 点缀
  gold: 0xe3b257,
  goldDeep: 0xc08f36,
  hairGold: 0xf2d283,
  skin: 0xf3d5b5,
  skinShade: 0xe0b894,
  princeGreen: 0x6f9c6a,
  princeBlue: 0x5b7fb5,
  kingPurple: 0x8a6aa8,
  guardSteel: 0x9dabb9,
  guardSteelDark: 0x74828f,
  clothRed: 0xc05f52,
  clothCream: 0xf4e8cf,
  clothBlue: 0x6b87b4,
  ink: 0x3a3550,
  paper: 0xf6ecd6,

  // 光
  windowGlow: 0xffcf87,
  fireGlow: 0xff9a4d,
  lampGlow: 0xffd79a,
  starWhite: 0xfff4dc,
} as const

export type PaletteKey = keyof typeof C
