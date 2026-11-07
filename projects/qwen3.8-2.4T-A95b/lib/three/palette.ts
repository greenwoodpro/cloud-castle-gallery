/**
 * 小王子绘本风格配色。
 * 整体偏水彩：低饱和、暖调、纸质感，避免任何高对比的荧光色。
 */

export const PALETTE = {
  // 天空
  skyDayTop: '#a9c9dd',
  skyDayMid: '#d9e4e6',
  skyDayBottom: '#f6e2cf',
  skyNightTop: '#1b2447',
  skyNightMid: '#2f3d68',
  skyNightBottom: '#5b5f86',
  sun: '#ffe6b0',
  moon: '#f2f0e2',
  star: '#fff6dc',
  cloud: '#fdf6ec',
  cloudShade: '#e6dcd2',

  // 地形
  grassLight: '#b7cfa4',
  grass: '#8cba7a',
  grassDark: '#7fa474',
  grassDry: '#b7c489',
  dirt: '#c2a687',
  dirtDark: '#a68a6c',
  rock: '#b3a899',
  rockDark: '#8d8377',
  rockDeep: '#6f665c',
  sand: '#e6d9bd',
  water: '#9dc6d6',
  waterDeep: '#7ba9bd',
  waterFoam: '#e8f2f2',
  snow: '#f4f1e8',

  // 植被
  leaf: '#8fb87f',
  leafDark: '#6f9a68',
  leafAutumn: '#d9a86c',
  trunk: '#9a7a5c',
  trunkDark: '#7d6147',
  wheat: '#e0c079',
  wheatDark: '#c9a55e',
  hedge: '#7ea370',

  // 花
  roseRed: '#e0748a',
  rosePink: '#f0a8b4',
  roseWhite: '#f7ece4',
  flowerYellow: '#f0d089',
  flowerBlue: '#9db4d8',
  flowerViolet: '#b79cc9',

  // 石材 / 建筑
  stoneLight: '#efe4d2',
  stone: '#ddd0ba',
  stoneMid: '#c8b9a1',
  stoneDark: '#a99a84',
  stoneShadow: '#8b7d69',
  mortar: '#cfc2ac',

  // 屋顶
  roofRose: '#d9917f',
  roofRoseDark: '#bd7565',
  roofSlate: '#8496a8',
  roofSlateDark: '#6a7c8e',
  roofCopper: '#9fbfa8',

  // 木材
  wood: '#b08a63',
  woodDark: '#8a6a4a',
  woodDeep: '#6b5138',

  // 金属 / 装饰
  gold: '#e3bd7c',
  goldDark: '#c39a58',
  iron: '#7b7568',
  ironDark: '#5c574c',
  bannerRed: '#c96a6a',
  bannerBlue: '#7d94bd',
  bannerGold: '#e0c088',

  // 光
  lantern: '#ffcf87',
  windowGlow: '#ffd79a',
  fire: '#f0a05a',
  fireCore: '#ffd9a0',

  // 人物
  skin: '#f2d3b3',
  skinShade: '#e0bb98',
  princeHair: '#f0c977',
  princeCoat: '#63a89e',
  princeCoatDark: '#4d8b83',
  princeScarf: '#f6efdd',
  princeBoots: '#8a6a4a',
  foxFur: '#dd9a5c',
  foxFurLight: '#f0d9b8',
  foxFurDark: '#b87a45',
  kingRobe: '#9a7fb8',
  kingRobeTrim: '#e8d6a8',
  guardTunic: '#8496a8',
  guardTunicAlt: '#c96a6a',
  maidDress: '#e8c9d2',
  cookApron: '#f2ece0',
  monkRobe: '#a98a6a',
  sheepWool: '#f5f0e4',
  horseBody: '#b08a63',
  horseMane: '#6b5138',
  birdBody: '#f0e2cc',
  birdWing: '#cbb89c',
} as const

export type PaletteKey = keyof typeof PALETTE

/** 昼夜两套环境光参数，切换时做插值。 */
export const DAY_NIGHT = {
  day: {
    hemiSky: '#dceaf2',
    hemiGround: '#c8b79c',
    hemiIntensity: 1.05,
    sunColor: '#fff0d4',
    sunIntensity: 2.1,
    ambient: '#f4e6d4',
    ambientIntensity: 0.35,
    fogColor: '#e8ded0',
    fogNear: 90,
    fogFar: 340,
    exposure: 1.0,
  },
  night: {
    hemiSky: '#3a4a7a',
    hemiGround: '#2a2c46',
    hemiIntensity: 0.5,
    sunColor: '#a8bce8',
    sunIntensity: 0.55,
    ambient: '#3d4a72',
    ambientIntensity: 0.28,
    fogColor: '#2b3358',
    fogNear: 70,
    fogFar: 300,
    exposure: 1.05,
  },
} as const

export type TimeOfDay = keyof typeof DAY_NIGHT
