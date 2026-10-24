import * as THREE from 'three'
import { Kit, type V3 } from './batch'
import { C } from './palette'
import * as P from './props'
import { CASTLE, KEEP, MILL, VILLAGE, FARM } from './layout'
import { heightAt } from './terrain'
import { mulberry32 } from './noise'
import type { Materials } from './materials'

const PI = Math.PI

export interface Built {
  group: THREE.Group
  anims: Array<(t: number) => void>
}

export const floorTop = (f: number) => f * KEEP.floor + 0.14
export const keepAt = (x: number, y: number, z: number): V3 => [CASTLE.x + x, CASTLE.y + KEEP.plinth + y, CASTLE.z + KEEP.lz + z]
export const courtAt = (x: number, y: number, z: number): V3 => [CASTLE.x + x, CASTLE.y + y, CASTLE.z + z]

export function flush(k: Kit, mats: Materials, group: THREE.Group) {
  const s = k.s.build(mats.toon)
  if (s) group.add(s)
  const g = k.g.build(mats.glow, false, false)
  if (g) group.add(g)
}

export function makeFlag(mats: Materials, color: string, anims: Built['anims'], phase = 0, w = 0.9, h = 0.52) {
  const geo = new THREE.PlaneGeometry(w, h, 8, 1)
  geo.translate(w / 2, 0, 0)
  const pos = geo.getAttribute('position') as THREE.BufferAttribute
  const base = Float32Array.from(pos.array as Float32Array)
  anims.push((t) => {
    for (let i = 0; i < pos.count; i++) pos.setZ(i, Math.sin(base[i * 3] * 6 - t * 3.2 + phase) * 0.08 * (base[i * 3] / w))
    pos.needsUpdate = true
  })
  const m = new THREE.Mesh(geo, mats.cloth(color))
  m.castShadow = true
  return m
}

/* ------------------------------------------------------------------ */
/*  城堡：城墙、塔楼、城门、主堡（剖开的内部）、礼拜堂、马厩、铁匠铺等        */
/* ------------------------------------------------------------------ */
export function buildCastle(mats: Materials, glassMat: THREE.Material): Built {
  const group = new THREE.Group()
  group.position.set(CASTLE.x, CASTLE.y, CASTLE.z)
  const anims: Built['anims'] = []
  const k = new Kit()
  const { hx, hz } = CASTLE
  const wt = 0.9

  /* ---- 城墙 ---- */
  const wallX = (x1: number, x2: number, z: number, h: number) => {
    const cx = (x1 + x2) / 2
    k.s.box(x2 - x1, h, wt, [cx, h / 2, z], C.stone)
    k.s.box(x2 - x1, 0.35, wt + 0.2, [cx, 0.17, z], C.stoneD)
    k.s.box(x2 - x1, 0.2, wt + 0.18, [cx, h - 0.1, z], C.stoneL)
    const n = Math.max(1, Math.round((x2 - x1) / 0.74))
    for (let i = 0; i < n; i++) k.s.box(0.4, 0.36, wt * 0.9, [x1 + ((i + 0.5) / n) * (x2 - x1), h + 0.18, z], C.stoneL)
  }
  const wallZ = (z1: number, z2: number, x: number, h: number) => {
    const cz = (z1 + z2) / 2
    k.s.box(wt, h, z2 - z1, [x, h / 2, cz], C.stone)
    k.s.box(wt + 0.2, 0.35, z2 - z1, [x, 0.17, cz], C.stoneD)
    k.s.box(wt + 0.18, 0.2, z2 - z1, [x, h - 0.1, cz], C.stoneL)
    const n = Math.max(1, Math.round((z2 - z1) / 0.74))
    for (let i = 0; i < n; i++) k.s.box(wt * 0.9, 0.36, 0.4, [x, h + 0.18, z1 + ((i + 0.5) / n) * (z2 - z1)], C.stoneL)
  }
  wallX(-hx, hx, -hz, 3.5)
  wallZ(-hz, hz, -hx, 3.0)
  wallZ(-hz, hz, hx, 3.0)
  wallX(-hx, -3.4, hz, 2.5)
  wallX(3.4, hx, hz, 2.5)

  /* ---- 塔楼 ---- */
  const flagAt = (x: number, y: number, z: number, color: string, ph: number) => {
    k.s.rod([x, y, z], [x, y + 1.3, z], 0.035, C.woodD)
    k.s.sph(0.06, [x, y + 1.32, z], C.gold, 1, 6)
    const f = makeFlag(mats, color, anims, ph)
    f.position.set(x + 0.02, y + 1.05, z)
    group.add(f)
  }
  const roundTower = (x: number, z: number, r: number, h: number, roofC: string, flag: string, ph: number) => {
    k.s.cyl(r * 1.12, r * 1.2, 0.5, [x, 0.25, z], C.stoneD, 16)
    k.s.cyl(r, r * 1.08, h, [x, h / 2 + 0.25, z], C.stone, 16)
    k.s.cyl(r * 1.2, r * 1.0, 0.36, [x, h + 0.43, z], C.stoneL, 16)
    const rh = r * 2.4
    k.s.cone(r * 1.38, rh, [x, h + 0.6 + rh / 2, z], roofC, 16)
    k.s.sph(0.13, [x, h + 0.6 + rh + 0.05, z], C.gold, 1, 8)
    for (const yy of [h * 0.42, h * 0.78]) {
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * PI * 2 + yy
        k.g.box(0.17, 0.52, 0.07, [x + Math.sin(a) * r * 1.02, yy, z + Math.cos(a) * r * 1.02], '#ffd98a', [0, a, 0], 0)
      }
    }
    flagAt(x, h + 0.6 + rh + 0.1, z, flag, ph)
  }
  const squareTower = (x: number, z: number, w: number, h: number, roofC: string, flag?: string, ph = 0) => {
    k.s.box(w + 0.3, 0.45, w + 0.3, [x, 0.22, z], C.stoneD)
    k.s.box(w, h, w, [x, h / 2 + 0.2, z], C.stone)
    k.s.box(w + 0.4, 0.3, w + 0.4, [x, h + 0.35, z], C.stoneL)
    const rh = w * 1.15 + 0.4
    k.s.hip(w + 0.8, w + 0.8, rh, [x, h + 0.5 + rh / 2, z], roofC)
    for (let i = 0; i < 2; i++) {
      k.g.box(0.2, 0.55, 0.07, [x + (i ? 0.38 : -0.38), h * 0.62, z + w / 2 + 0.02], '#ffd98a', [0, 0, 0], 0)
      k.g.box(0.07, 0.55, 0.2, [x + (i ? w / 2 + 0.02 : -w / 2 - 0.02), h * 0.62, z], '#ffd98a', [0, 0, 0], 0)
    }
    if (flag) flagAt(x, h + 0.5 + rh, z, flag, ph)
  }
  roundTower(-hx, -hz, 1.75, 7.2, C.roofBlue, C.red, 0)
  roundTower(hx, -hz, 1.75, 6.3, C.roofRed, C.teal, 1.3)
  roundTower(-hx, hz, 1.5, 4.9, C.roofRose, C.gold, 2.1)
  roundTower(hx, hz, 1.5, 5.3, C.roofBlue, C.lilac, 3.4)
  squareTower(-hx, 0.5, 1.5, 3.8, C.roofBlueD)
  squareTower(hx, 0.5, 1.5, 3.8, C.roofBlueD)

  /* ---- 城门楼、吊桥、闸门 ---- */
  squareTower(-2.3, hz, 2.2, 4.6, C.roofRed, C.red, 0.7)
  squareTower(2.3, hz, 2.2, 4.6, C.roofRed, C.gold, 1.9)
  k.s.box(2.6, 1.7, 1.3, [0, 3.45, hz], C.stone)
  k.s.box(2.9, 0.22, 1.5, [0, 4.4, hz], C.stoneL)
  for (let i = 0; i < 4; i++) k.s.box(0.4, 0.36, 1.2, [-1.05 + i * 0.7, 4.7, hz], C.stoneL)
  k.s.box(2.6, 0.2, 1.4, [0, 2.55, hz], C.gold)
  P.shield(k.at(0, 3.45, hz + 0.68), C.red, C.cream)
  for (let i = -3; i <= 3; i++) k.s.rod([i * 0.32, 1.1, hz + 0.1], [i * 0.32, 2.45, hz + 0.1], 0.03, C.iron)
  for (const y of [1.3, 1.8, 2.3]) k.s.rod([-1.1, y, hz + 0.1], [1.1, y, hz + 0.1], 0.03, C.iron)
  k.s.box(2.4, 0.12, 3.3, [0, -0.06, hz + 2.2], C.woodL)
  for (let i = 0; i < 8; i++) k.s.box(2.4, 0.02, 0.05, [0, 0.01, hz + 0.9 + i * 0.4], C.woodD, [0, 0, 0], 0)
  for (const sx of [-1, 1]) {
    k.s.rod([sx * 1.1, 2.4, hz + 0.6], [sx * 1.1, 0.0, hz + 3.7], 0.025, C.iron)
    k.s.rod([sx * 1.2, 0.5, hz + 1.0], [sx * 1.2, 0.5, hz + 3.7], 0.035, C.woodD)
    for (let i = 0; i < 4; i++) k.s.cyl(0.05, 0.05, 0.5, [sx * 1.2, 0.25, hz + 1.1 + i * 0.85], C.woodD, 6)
    k.s.box(0.6, 0.9, 0.6, [sx * 1.4, 0.2, hz + 4.0], C.stoneD)
  }

  /* ---- 主堡：外壳 + 四层剖开的室内 ---- */
  const K = k.at(0, KEEP.plinth, KEEP.lz)
  const W = KEEP.w
  const D = KEEP.d
  const FH = KEEP.floor
  const hw = W / 2
  const hd = D / 2
  const zb = -hd + 0.35
  const zf = hd - 0.08
  k.s.box(W + 0.8, KEEP.plinth + 0.02, D + 0.8, [0, KEEP.plinth / 2, KEEP.lz], C.stoneD)

  const slab = (f: number, x1: number, x2: number, z1: number, z2: number) =>
    K.s.box(x2 - x1, 0.14, z2 - z1, [(x1 + x2) / 2, f * FH + 0.07, (z1 + z2) / 2], f === 0 ? C.stoneL : C.woodL)
  slab(0, -hw + 0.3, hw - 0.3, zb, zf)
  slab(1, -hw + 0.3, 3.9, zb, zf)
  slab(1, 3.9, hw - 0.3, zb, -0.5)
  slab(2, -3.9, hw - 0.3, zb, zf)
  slab(2, -hw + 0.3, -3.9, zb, -0.5)
  K.s.box(W - 0.6, 0.2, D - 0.2, [0, 3 * FH + 0.1, 0], C.woodD)

  const wallH = 3 * FH + 0.3
  K.s.box(W, wallH, 0.35, [0, wallH / 2, -hd + 0.175], C.stone)
  for (const sx of [-1, 1]) {
    K.s.box(0.35, wallH, D, [sx * (hw - 0.175), wallH / 2, 0], C.stone)
    K.s.box(0.55, wallH + 0.1, 0.55, [sx * (hw - 0.2), wallH / 2, hd - 0.25], C.stoneL)
  }
  for (let f = 1; f <= 3; f++) K.s.box(W + 0.3, 0.22, 0.3, [0, f * FH + 0.02, hd + 0.02], C.stoneL)
  for (let f = 1; f <= 2; f++) {
    const y = floorTop(f)
    K.s.box(W - 0.9, 0.07, 0.1, [0, y + 0.55, hd - 0.1], C.woodD)
    for (let x = -hw + 0.8; x < hw - 0.6; x += 0.45) K.s.cyl(0.035, 0.035, 0.5, [x, y + 0.28, hd - 0.1], C.woodL, 6, [0, 0, 0], 1, 0)
  }
  for (let x = -hw + 0.8; x < hw - 0.6; x += 0.45) K.s.cyl(0.03, 0.03, 0.4, [x, 0.34, hd + 0.18], C.stoneL, 6, [0, 0, 0], 1, 0)

  const stair = (f: number, x1: number, x2: number, zs: number, ze: number) => {
    const n = 10
    const base = f * FH + 0.14
    for (let i = 0; i < n; i++) {
      const hgt = ((i + 1) * (FH - 0.0)) / n
      K.s.box(x2 - x1, hgt, Math.abs(ze - zs) / n, [(x1 + x2) / 2, base + hgt / 2, zs + ((ze - zs) * (i + 0.5)) / n], C.stoneD, [0, 0, 0], 0.03)
    }
    K.s.rod([x1 - 0.03, base + 0.9, zs], [x1 - 0.03, base + FH + 0.9, ze], 0.03, C.woodD)
  }
  stair(0, 4.0, 4.8, 3.0, -0.3)
  stair(1, -4.8, -4.0, 3.0, -0.3)

  const partition = (f: number, px: number) => {
    const y0 = f * FH + 0.14
    const h = FH - 0.14
    const z1 = zb
    K.s.box(0.22, h, -0.55 - z1, [px, y0 + h / 2, (z1 - 0.55) / 2], C.stone)
    K.s.box(0.22, h, zf - 0.55, [px, y0 + h / 2, (zf + 0.55) / 2], C.stone)
    K.s.box(0.22, h - 1.55, 1.1, [px, y0 + 1.55 + (h - 1.55) / 2, 0], C.stone)
    K.s.box(0.3, 0.1, 1.2, [px, y0 + 1.55, 0], C.gold, [0, 0, 0], 0)
  }
  partition(0, -1.8)
  partition(1, 1.8)
  partition(2, -1.8)

  const sideWinZ = [-1.2, 1.4]
  for (let f = 0; f < 3; f++) {
    const y = floorTop(f)
    for (const wx of f === 0 ? [-2.9, 1.0] : f === 1 ? [0.5, 3.0] : [-2.8, 0.8]) P.archWindow(K.at(0, 0, 0).at(wx, y + 0.9 + KEEP.plinth, zb + KEEP.lz + 0.01), 0.7, 1.1)
    for (const wz of sideWinZ) {
      P.archWindow(K.at(-hw + 0.36, y + 0.9, wz, PI / 2), 0.7, 1.1)
      P.archWindow(K.at(hw - 0.36, y + 0.9, wz, -PI / 2), 0.7, 1.1)
    }
  }

  /* 一层：厨房 + 大厅 */
  const y0 = floorTop(0)
  P.stove(K.at(-4.3, y0, -2.45))
  P.cauldron(K.at(-3.0, y0, -2.45))
  P.table(K.at(-3.3, y0, 0.3), 1.6, 0.8)
  P.loaf(K.at(-3.6, y0 + 0.52, 0.3))
  P.apple(K.at(-3.0, y0 + 0.52, 0.45))
  P.cheese(K.at(-3.3, y0 + 0.52, 0.1))
  P.barrel(K.at(-4.55, y0, 1.2))
  P.barrel(K.at(-4.5, y0, 1.85), 0.25, 0.5)
  P.sack(K.at(-4.35, y0, 2.5))
  P.sack(K.at(-3.7, y0, 2.6, 0.6))
  P.crate(K.at(-2.4, y0, 2.4))
  P.torch(K.at(-1.65, y0 + 1.3, 1.6, PI / 2))
  P.torch(K.at(-1.95, y0 + 1.3, -2.0, -PI / 2))
  K.s.box(2.3, 0.22, 1.7, [3.2, y0 + 0.11, -1.95], C.stoneD)
  P.throne(K.at(3.2, y0 + 0.22, -2.3))
  K.s.box(1.0, 0.02, 4.3, [3.2, y0 + 0.01, 0.9], C.red, [0, 0, 0], 0)
  K.s.box(1.1, 0.02, 0.1, [3.2, y0 + 0.02, 3.0], C.gold, [0, 0, 0], 0)
  P.table(K.at(0.7, y0, 0.8), 2.8, 0.9)
  for (const [px, pz, ry] of [[-0.3, 0.8, 0.3], [0.6, 0.65, 0], [1.6, 0.9, -0.2]] as const) P.plate(K.at(px, y0 + 0.52, pz, ry))
  P.goblet(K.at(1.2, y0 + 0.52, 0.8))
  P.goblet(K.at(-0.6, y0 + 0.52, 0.95))
  P.loaf(K.at(0.2, y0 + 0.52, 1.0))
  P.apple(K.at(1.9, y0 + 0.52, 0.7))
  for (const cx of [-0.4, 0.8, 1.9]) {
    P.chair(K.at(cx, y0, 1.55, PI), C.teal)
    P.chair(K.at(cx, y0, 0.05, 0), C.red)
  }
  P.fireplace(K.at(-0.6, y0, -2.62))
  P.tapestry(K.at(1.4, y0 + 1.3, -2.82), 0.8, 1.4, C.teal)
  P.banner(K.at(2.2, y0 + 1.45, -2.82), 0.5, 1.2, C.red)
  P.banner(K.at(4.2, y0 + 1.45, -2.82), 0.5, 1.2, C.red)
  P.chandelier(K.at(1.6, y0 + 2.0, 0.6))
  P.rugRound(K.at(-0.3, y0 + 0.01, -0.9), 0.7, C.lilac, C.cream)

  /* 二层：图书馆 + 议事厅/武器库 */
  const y1 = floorTop(1)
  for (const [bx, s] of [[-4.0, 1], [-2.6, 2], [-1.2, 3]] as const) P.bookshelf(K.at(bx, y1, -2.68), 1.25, 1.95, s)
  P.table(K.at(-3.3, y1, 0.4), 1.3, 0.8)
  P.globe(K.at(-3.7, y1 + 0.52, 0.4))
  P.openBook(K.at(-3.0, y1 + 0.52, 0.45))
  P.quill(K.at(-2.7, y1 + 0.52, 0.3))
  P.scrolls(K.at(-3.3, y1 + 0.52, 0.65))
  P.chair(K.at(-3.3, y1, 1.2, PI), C.lilac)
  P.armchair(K.at(-0.7, y1, 1.0, 0.4), C.teal)
  P.ladder(K.at(0.8, y1, -2.7))
  P.plant(K.at(-4.5, y1, 2.4), 1.1)
  P.chandelier(K.at(-2.2, y1 + 2.0, 0.6))
  P.table(K.at(3.4, y1, 0.3), 1.5, 1.0)
  P.scrolls(K.at(3.2, y1 + 0.52, 0.2))
  P.candle(K.at(3.8, y1 + 0.52, 0.4))
  for (const [cx, cz, ry] of [[2.7, 0.3, PI / 2], [4.1, 0.3, -PI / 2], [3.4, 1.1, PI]] as const) P.chair(K.at(cx, y1, cz, ry), C.red)
  P.weaponRack(K.at(4.4, y1, -2.5))
  P.armorStand(K.at(2.6, y1, -2.45))
  P.shield(K.at(3.4, y1 + 1.55, -2.82), C.red, C.cream)
  P.shield(K.at(3.0, y1 + 1.2, -2.82), C.teal, C.cream)
  P.chest(K.at(4.35, y1, 1.9, -PI / 2))
  P.torch(K.at(1.7, y1 + 1.3, 1.6, -PI / 2))

  /* 三层：小王子的房间 + 国王卧室 */
  const y2 = floorTop(2)
  P.bed(K.at(-3.7, y2, -1.9, 0), C.mint, C.pink)
  P.nightstand(K.at(-2.4, y2, -2.5))
  P.candle(K.at(-2.4, y2 + 0.5, -2.5))
  K.s.cyl(0.3, 0.38, 0.7, [-3.2, y2 + 0.35, 1.4], C.stoneL, 12)
  P.roseDome(K.at(-3.2, y2 + 0.7, 1.4))
  const dome = P.glassDome(glassMat)
  dome.position.set(...keepAt(-3.2, y2 + 0.7, 1.4))
  dome.position.x -= CASTLE.x
  dome.position.y -= CASTLE.y
  dome.position.z -= CASTLE.z
  group.add(dome)
  P.telescope(K.at(-4.4, y2, 1.9, 0.9))
  P.globe(K.at(-2.3, y2, 1.9))
  P.banner(K.at(-4.55, y2 + 1.4, -0.9, PI / 2), 0.5, 1.1, C.lilac)
  P.bed(K.at(3.5, y2, -2.0, 0), C.pink, C.red)
  P.wardrobe(K.at(0.0, y2, -2.55))
  P.vanity(K.at(1.5, y2, -2.65))
  P.chest(K.at(4.35, y2, 1.8, -PI / 2))
  P.rugRound(K.at(2.0, y2 + 0.01, 0.7), 1.0, C.pink, C.cream)
  P.chandelier(K.at(2.0, y2 + 2.0, 0.8))
  P.plant(K.at(-0.9, y2, 2.4), 1.0)

  /* 顶层：天文台 + 屋顶 */
  const y3 = 3 * FH + 0.2
  K.s.box(3.5, 0.16, D - 0.2, [-3.25, 3 * FH + 0.28, 0], C.woodL)
  K.s.box(3.5, 1.9, 0.3, [-3.25, y3 + 0.95, -hd + 0.15], C.stone)
  K.s.box(0.3, 1.9, D - 0.2, [-hw + 0.15, y3 + 0.95, 0], C.stone)
  for (const [px, pz] of [[-1.5, hd - 0.3], [-hw + 0.3, hd - 0.3], [-1.5, -hd + 0.3]] as const) K.s.cyl(0.15, 0.17, 2.1, [px, y3 + 1.0, pz], C.stoneL, 8)
  K.s.hip(4.4, 4.4 + 2.0, 2.2, [-3.25, y3 + 1.9 + 1.1, 0], C.roofBlue)
  K.s.sph(0.15, [-3.25, y3 + 4.15, 0], C.gold, 1, 8)
  P.telescope(K.at(-3.0, y3 + 0.08, 1.3, 0.2), )
  P.armillary(K.at(-4.2, y3 + 0.08, -1.6))
  P.bell(K.at(-3.25, y3 + 1.7, 0))
  P.table(K.at(-2.3, y3 + 0.08, -1.7), 0.8, 0.6)
  P.scrolls(K.at(-2.3, y3 + 0.6, -1.7))
  P.chandelier(K.at(-3.2, y3 + 1.9, 0.0))

  const roofLen = hw - 1.7 + 0.5
  K.s.gable(D + 1.0, roofLen + 0.6, 2.3, [(1.7 + hw + 0.3) / 2 - 0.1, 3 * FH + 0.3, 0], C.roofBlue, PI / 2)
  K.s.box(roofLen + 0.5, 0.1, 0.18, [(1.7 + hw + 0.3) / 2 - 0.1, 3 * FH + 2.62, 0], C.roofBlueD)
  K.s.box(0.4, 1.3, 0.4, [3.9, 3 * FH + 2.4, -1.0], C.stoneD)
  K.s.box(0.55, 0.14, 0.55, [3.9, 3 * FH + 3.1, -1.0], C.stoneL)
  for (const dx of [0.2, 3.0]) {
    K.s.box(0.8, 0.7, 0.7, [dx + 0.6, 3 * FH + 1.0, hd + 0.3], C.stone, [0, 0, 0], 0.03)
  }
  P.banner(K.at(0, 3 * FH - 0.5, hd + 0.25), 0.7, 1.4, C.red)
  P.banner(K.at(-4.0, 3 * FH - 0.5, hd + 0.25), 0.7, 1.4, C.teal)

  /* ---- 庭院：礼拜堂 ---- */
  const cx = -7.4
  const cz = 3.2
  const CH = k.at(cx, 0, cz)
  CH.s.box(3.6, 0.15, 4.8, [0, 0.07, 0], C.stoneL)
  CH.s.box(0.3, 3.0, 4.8, [-1.65, 1.5, 0], C.stone)
  CH.s.box(3.6, 3.0, 0.3, [0, 1.5, -2.25], C.stone)
  CH.s.box(3.6, 3.0, 0.3, [0, 1.5, 2.25], C.stone)
  for (const pz of [-2.1, 2.1]) CH.s.cyl(0.17, 0.2, 3.2, [1.7, 1.6, pz], C.stoneL, 8)
  CH.s.gable(5.4, 4.0, 1.9, [0.0, 3.0, 0], C.roofRose, 0)
  const panes = [C.red, C.teal, C.gold, C.lilac, C.pink, C.mint]
  CH.s.box(1.3, 1.8, 0.1, [-1.48, 1.7, 0], C.woodD, [0, 0, 0], 0)
  for (let i = 0; i < 3; i++) for (let j = 0; j < 4; j++) CH.g.box(0.35, 0.38, 0.08, [-1.42, 1.1 + j * 0.42, -0.45 + i * 0.45], panes[(i * 4 + j) % panes.length], [0, 0, 0], 0)
  CH.s.box(0.7, 0.8, 1.7, [-1.2, 0.55, 0], C.stoneL)
  CH.s.box(0.74, 0.06, 1.74, [-1.2, 0.97, 0], C.cream)
  CH.s.box(0.06, 0.5, 0.06, [-1.2, 1.25, 0], C.gold)
  CH.s.box(0.3, 0.06, 0.06, [-1.2, 1.35, 0], C.gold)
  P.candle(CH.at(-1.2, 1.0, -0.6))
  P.candle(CH.at(-1.2, 1.0, 0.6))
  for (const bx of [-0.2, 0.7]) for (const bz of [-0.9, 0.9]) P.bench(CH.at(bx, 0.15, bz, PI / 2), 1.2)
  CH.s.box(0.9, 0.02, 3.0, [0.3, 0.16, 0], C.red, [0, 0, 0], 0)
  CH.s.box(1.1, 1.8, 1.1, [0.6, 3.0 + 1.2, 0], C.stone)
  CH.s.hip(1.5, 1.5, 1.4, [0.6, 3.0 + 2.1 + 0.7 + 0.3, 0], C.roofBlue)
  P.bell(CH.at(0.6, 5.3, 0))
  for (const [ax, az] of [[0.6, 0.57], [0.6, -0.57]] as const) CH.g.box(0.35, 0.8, 0.05, [ax, 5.0, az], '#ffd98a', [0, 0, 0], 0)

  /* ---- 庭院：马厩 ---- */
  const SB = k.at(7.9, 0, 3.0)
  SB.s.box(2.6, 0.12, 4.0, [0, 0.06, 0], C.dirt)
  SB.s.box(0.25, 2.4, 4.0, [1.2, 1.2, 0], C.woodD)
  SB.s.box(2.6, 2.4, 0.2, [0, 1.2, -2.0], C.wood)
  SB.s.box(2.6, 0.9, 0.12, [0, 0.45, 2.0], C.wood)
  SB.s.box(3.0, 0.14, 4.4, [0, 2.5, 0], C.roofRed, [0, 0, 0.12])
  for (const pz of [-1.9, 1.9]) SB.s.cyl(0.08, 0.08, 2.4, [-1.25, 1.2, pz], C.woodD, 6)
  for (const [hxx, hzz] of [[0.6, -1.4], [0.8, 1.2], [0.2, 0.0]] as const) SB.s.box(0.7, 0.4, 0.5, [hxx, 0.3, hzz], C.sand, [0, 0.3, 0])
  SB.s.box(0.5, 0.25, 1.1, [-0.9, 0.22, 0.8], C.woodD)
  P.barrel(SB.at(-1.0, 0, -1.4), 0.22, 0.45)

  /* ---- 庭院：铁匠铺 ---- */
  const SM = k.at(7.7, 0, -4.6)
  SM.s.box(3.2, 0.1, 3.4, [0, 0.05, 0], C.stoneD)
  SM.s.box(3.4, 0.14, 3.7, [0, 2.45, 0], C.roofRed, [0, 0, -0.1])
  for (const [px, pz] of [[-1.5, 1.6], [-1.5, -1.6], [1.5, 1.6]] as const) SM.s.cyl(0.09, 0.09, 2.4, [px, 1.2, pz], C.woodD, 6)
  P.forge(SM.at(1.2, 0.1, -1.1))
  P.anvil(SM.at(-0.2, 0.1, 0.1))
  P.barrel(SM.at(-1.2, 0.1, -1.2), 0.25, 0.5)
  P.weaponRack(SM.at(-1.3, 0.1, 1.2, PI / 2))

  /* ---- 庭院：集市摊位 ---- */
  for (const [sx, sz, c1] of [[-3.8, 6.0, C.red], [-6.0, 6.3, C.teal]] as const) {
    const ST = k.at(sx, 0, sz, 0.15)
    P.table(ST.at(0, 0, 0), 1.6, 0.7, 0.6)
    for (const px of [-0.85, 0.85]) ST.s.cyl(0.05, 0.05, 1.6, [px, 0.8, -0.3], C.woodD, 6)
    for (let i = 0; i < 8; i++) ST.s.box(0.22, 0.04, 1.1, [-0.77 + i * 0.22, 1.55 - 0.0, -0.1], i % 2 ? C.cream : c1, [0.5, 0, 0], 0)
    for (let i = 0; i < 6; i++) P.apple(ST.at(-0.6 + i * 0.24, 0.6, 0.0 + (i % 2) * 0.12), i % 2 ? C.red : C.gold)
  }

  /* ---- 庭院：训练场、喷泉、水井、花坛、小树 ---- */
  P.trainingDummy(k.at(4.0, 0, 6.0, 0.3))
  P.trainingDummy(k.at(5.6, 0, 5.4, -0.2))
  P.weaponRack(k.at(6.8, 0, 6.6, -0.4))
  k.s.cyl(0.55, 0.55, 0.12, [3.0, 0.6, 7.4], C.sand, 14, [PI / 2, 0, 0])
  k.s.tor(0.4, 0.05, [3.0, 0.6, 7.33], C.red, [0, 0, 0], 16)
  k.s.tor(0.22, 0.05, [3.0, 0.6, 7.32], C.cream, [0, 0, 0], 14)
  k.s.rod([3.0, 0, 7.42], [3.0, 0.6, 7.42], 0.04, C.woodD)
  P.fountain(k.at(0, 0, 4.4))
  P.well(k.at(-3.2, 0, 2.4))
  for (const fx of [-4.4, -2.8, 2.6, 4.2]) {
    k.s.box(1.2, 0.2, 0.5, [fx, 0.1, 0.55], C.stoneD)
    for (let i = 0; i < 6; i++) {
      const c = [C.pink, C.gold, C.lilac, C.red, C.cream, C.blossom][(i + Math.round(fx * 3)) % 6]
      k.s.cyl(0.02, 0.02, 0.28, [fx - 0.5 + i * 0.2, 0.32, 0.55], C.leafD, 4, [0, 0, 0], 1, 0)
      k.s.sph(0.07, [fx - 0.5 + i * 0.2, 0.5, 0.55], c, 1, 6)
    }
  }
  for (const [tx, tz] of [[-8.6, 6.9], [8.6, 7.0], [-1.0, -0.9]] as const) {
    if (tz < 0) continue
    k.s.cyl(0.14, 0.2, 1.3, [tx, 0.65, tz], C.woodD, 7)
    k.s.sph(0.9, [tx, 1.9, tz], C.leaf, 1, 9)
    k.s.sph(0.65, [tx + 0.5, 1.6, tz + 0.2], C.leafL, 1, 8)
    k.s.sph(0.6, [tx - 0.45, 1.7, tz - 0.2], C.leafD, 1, 8)
  }
  for (const [lx, lz] of [[-1.8, 7.0], [1.8, 7.0], [-5.2, 0.8], [5.2, 0.8]] as const) {
    k.s.cyl(0.05, 0.07, 1.5, [lx, 0.75, lz], C.iron, 6)
    k.s.box(0.26, 0.3, 0.26, [lx, 1.65, lz], C.iron)
    k.g.box(0.18, 0.22, 0.18, [lx, 1.65, lz], '#ffd98a', [0, 0, 0], 0)
    k.s.cone(0.22, 0.2, [lx, 1.9, lz], C.iron, 4)
  }
  for (const [tx, tz, ry] of [[-hx + 0.8, -2.0, PI / 2], [hx - 0.8, -2.0, -PI / 2], [-6, -hz + 0.8, 0], [6, -hz + 0.8, 0]] as const) P.torch(k.at(tx, 1.4, tz, ry))
  P.banner(k.at(-6.3, 2.2, -hz + 0.5), 0.6, 1.3, C.red)
  P.banner(k.at(6.3, 2.2, -hz + 0.5), 0.6, 1.3, C.teal)

  flush(k, mats, group)
  return { group, anims }
}

/* ------------------------------------------------------------------ */
/*  村庄、风车、农场                                                     */
/* ------------------------------------------------------------------ */
function house(k: Kit, x: number, z: number, ry: number, w: number, d: number, h: number, wall: string, roof: string, tag = 0) {
  const y = heightAt(x, z)
  const H = k.at(x, y, z, ry)
  H.s.box(w + 0.25, 0.8, d + 0.25, [0, -0.1, 0], C.stoneD)
  H.s.box(w, h, d, [0, h / 2 + 0.3, 0], wall)
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) H.s.box(0.13, h, 0.13, [sx * w / 2, h / 2 + 0.3, sz * d / 2], C.woodD, [0, 0, 0], 0.02)
  H.s.box(w + 0.02, 0.1, d + 0.02, [0, h * 0.55 + 0.3, 0], C.woodD, [0, 0, 0], 0.02)
  H.s.beam([-w / 2, 0.3, d / 2 + 0.01], [-w * 0.1, h * 0.55 + 0.3, d / 2 + 0.01], 0.08, 0.06, C.woodD)
  H.s.beam([w / 2, 0.3, d / 2 + 0.01], [w * 0.1, h * 0.55 + 0.3, d / 2 + 0.01], 0.08, 0.06, C.woodD)
  const rh = Math.max(0.9, d * 0.62)
  H.s.gable(d + 0.7, w + 0.7, rh, [0, h + 0.3, 0], roof, PI / 2)
  H.s.box(w + 0.8, 0.08, 0.14, [0, h + 0.3 + rh, 0], C.woodD)
  H.s.box(0.34, 1.0, 0.34, [w / 4, h + rh * 0.8, -d / 4], C.stoneD)
  H.s.box(0.46, 0.1, 0.46, [w / 4, h + rh * 0.8 + 0.55, -d / 4], C.stoneL)
  P.archDoor(H.at(w * 0.18, 0.3, d / 2 + 0.03), 0.5, 0.85)
  P.archWindow(H.at(-w * 0.25, h * 0.4 + 0.45, d / 2 + 0.03), 0.38, 0.5)
  P.archWindow(H.at(w / 2 + 0.03, h * 0.4 + 0.45, 0, PI / 2), 0.38, 0.5)
  if (tag === 1) {
    H.s.rod([w / 2 + 0.05, h * 0.7, d / 2 + 0.2], [w / 2 + 0.7, h * 0.7, d / 2 + 0.2], 0.03, C.iron)
    H.s.box(0.5, 0.35, 0.05, [w / 2 + 0.55, h * 0.55, d / 2 + 0.2], C.wood)
    P.barrel(H.at(-w / 2 - 0.3, 0.3, d / 2 + 0.2), 0.2, 0.4)
  }
  if (tag === 2) {
    H.s.box(w * 0.7, 0.05, 0.6, [0, 0.35, d / 2 + 0.4], C.woodL)
    P.loaf(H.at(-0.2, 0.62, d / 2 + 0.4))
    P.loaf(H.at(0.25, 0.62, d / 2 + 0.4))
  }
  const fence = (fx: number, fz: number, len: number) => {
    for (let i = 0; i <= len / 0.45; i++) H.s.box(0.06, 0.4, 0.06, [fx + i * 0.45, 0.2, fz], C.woodL, [0, 0, 0], 0)
    H.s.box(len, 0.05, 0.04, [fx + len / 2, 0.3, fz], C.woodL, [0, 0, 0], 0)
  }
  fence(-w / 2 - 0.4, d / 2 + 1.1, w + 0.8)
}

export function buildTown(mats: Materials): Built {
  const group = new THREE.Group()
  const anims: Built['anims'] = []
  const k = new Kit()
  const { x: vx, z: vz } = VILLAGE
  const spec: Array<[number, number, number, number, number, number, string, string, number]> = [
    [-4.6, -2.4, 0.5, 2.0, 1.6, 1.3, '#f3e3cc', C.roofRed, 0],
    [-0.6, -4.6, 0.1, 2.2, 1.7, 1.4, '#e7efe0', C.roofBlue, 2],
    [4.0, -2.2, -0.5, 1.8, 1.5, 1.2, '#f6dfd2', C.roofRose, 0],
    [-5.0, 2.9, 0.9, 2.2, 1.7, 1.3, '#eadfca', C.roofBlue, 0],
    [4.9, 2.9, -0.9, 2.0, 1.6, 1.3, '#f3e3cc', C.roofRed, 0],
    [0.4, 5.2, 3.1, 3.0, 2.0, 1.8, '#f0dcc2', C.roofBlueD, 1],
  ]
  for (const s of spec) house(k, vx + s[0], vz + s[1], s[2], s[3], s[4], s[5], s[6], s[7], s[8])
  P.well(k.at(vx, heightAt(vx, vz), vz))
  for (const [bx, bz, br] of [[-2.2, 2.4, 0.4], [2.4, 2.0, -0.3]] as const) {
    P.bench(k.at(vx + bx, heightAt(vx + bx, vz + bz), vz + bz, br), 1.2)
  }
  for (const [lx, lz] of [[-2.0, -1.2], [2.0, -1.0], [-0.6, 3.0]] as const) {
    const y = heightAt(vx + lx, vz + lz)
    k.s.cyl(0.05, 0.07, 1.5, [vx + lx, y + 0.75, vz + lz], C.iron, 6)
    k.s.box(0.26, 0.3, 0.26, [vx + lx, y + 1.65, vz + lz], C.iron)
    k.g.box(0.18, 0.22, 0.18, [vx + lx, y + 1.65, vz + lz], '#ffd98a', [0, 0, 0], 0)
  }

  /* 风车 */
  const my = heightAt(MILL.x, MILL.z)
  const M = k.at(MILL.x, my, MILL.z, 0.2)
  M.s.cyl(1.2, 1.8, 5.2, [0, 2.6, 0], '#f1e7d4', 14)
  M.s.cyl(1.9, 2.0, 0.4, [0, 0.2, 0], C.stoneD, 14)
  M.s.cone(1.5, 1.6, [0, 6.0, 0], C.roofRed, 14)
  M.s.sph(0.15, [0, 6.9, 0], C.gold, 1, 8)
  P.archDoor(M.at(0, 0.3, 1.78), 0.7, 1.1)
  for (const [wy, wr] of [[2.6, 1.55], [4.0, 1.35]] as const) M.g.box(0.32, 0.5, 0.06, [0, wy, wr + 0.02], '#ffd98a', [0, 0, 0], 0)
  M.s.cyl(0.18, 0.18, 0.9, [0, 5.0, 1.5], C.woodD, 8, [PI / 2, 0, 0])
  P.sack(M.at(1.6, 0.0, 1.7))
  P.sack(M.at(2.0, 0.0, 1.2, 0.7))
  flush(k, mats, group)

  const bladesKit = new Kit()
  for (let i = 0; i < 4; i++) {
    const a = (i * PI) / 2
    const bx = Math.sin(a)
    const by = Math.cos(a)
    bladesKit.s.beam([0, 0, 0], [bx * 3.6, by * 3.6, 0], 0.12, 0.12, C.woodD)
    for (let j = 1; j <= 5; j++) {
      const t = 0.8 + j * 0.55
      bladesKit.s.box(0.55, 0.05, 0.06, [bx * t + by * 0.28, by * t - bx * 0.28, 0.04], C.woodL, [0, 0, -a], 0)
    }
    bladesKit.s.box(0.55, 2.6, 0.04, [bx * 2.3 - by * 0.32, by * 2.3 + bx * 0.32, 0.03], C.cream, [0, 0, -a], 0)
  }
  bladesKit.s.sph(0.24, [0, 0, 0.1], C.gold, 1, 8)
  const blades = bladesKit.s.build(mats.toon)
  if (blades) {
    const pivot = new THREE.Group()
    const off = new THREE.Vector3(0, 5.0, 1.62).applyAxisAngle(new THREE.Vector3(0, 1, 0), 0.2)
    pivot.position.set(MILL.x + off.x, my + off.y, MILL.z + off.z)
    pivot.rotation.y = 0.2
    pivot.add(blades)
    group.add(pivot)
    anims.push((t) => {
      blades.rotation.z = -t * 0.55
    })
  }

  /* 农场：谷仓、麦田、稻草人、干草堆 */
  const fk = new Kit()
  const bx = FARM.x + FARM.w / 2 + 3.4
  const bz = FARM.z
  const BY = heightAt(bx, bz)
  const B = fk.at(bx, BY, bz, -0.35)
  B.s.box(4.2, 2.2, 3.2, [0, 1.2, 0], '#d98f74')
  B.s.box(4.3, 0.12, 3.3, [0, 0.12, 0], C.stoneD)
  B.s.gable(3.8, 4.8, 1.6, [0, 2.3, 0], C.roofBlueD, PI / 2)
  B.s.box(1.2, 1.7, 0.08, [0, 1.0, 1.62], C.cream)
  B.s.beam([-0.6, 0.2, 1.64], [0.6, 1.85, 1.64], 0.1, 0.05, C.red)
  B.s.beam([0.6, 0.2, 1.64], [-0.6, 1.85, 1.64], 0.1, 0.05, C.red)
  B.g.box(0.4, 0.4, 0.06, [0, 3.0, 1.62], '#ffd98a', [0, 0, 0], 0)
  const rnd = mulberry32(21)
  for (let r = 0; r < 16; r++) {
    const zz = FARM.z - FARM.d / 2 + 0.5 + (r / 15) * (FARM.d - 1.0)
    for (let i = 0; i < 30; i++) {
      const xx = FARM.x - FARM.w / 2 + 0.6 + (i / 29) * (FARM.w - 1.2) + (rnd() - 0.5) * 0.14
      const yy = heightAt(xx, zz)
      const s = 0.8 + rnd() * 0.45
      fk.s.cyl(0.012, 0.018, 0.55 * s, [xx, yy + 0.27 * s, zz], C.leafL, 4, [0, 0, 0], 1, 0.04)
      fk.s.cone(0.05, 0.26 * s, [xx, yy + 0.62 * s, zz], C.gold, 5, [0, 0, (rnd() - 0.5) * 0.25], 1, 0.06)
    }
  }
  const sx = FARM.x + 2.0
  const sz = FARM.z - 0.5
  const sy = heightAt(sx, sz)
  fk.s.cyl(0.05, 0.05, 1.7, [sx, sy + 0.85, sz], C.woodD, 6)
  fk.s.beam([sx - 0.7, sy + 1.3, sz], [sx + 0.7, sy + 1.3, sz], 0.08, 0.08, C.woodD)
  fk.s.box(0.4, 0.55, 0.22, [sx, sy + 1.1, sz], C.teal)
  fk.s.sph(0.2, [sx, sy + 1.62, sz], C.sand, 1, 8)
  fk.s.cone(0.34, 0.1, [sx, sy + 1.78, sz], C.sand, 12)
  fk.s.cyl(0.17, 0.17, 0.3, [sx, sy + 1.9, sz], C.wood, 10)
  for (const [hx2, hz2] of [[FARM.x + FARM.w / 2 + 0.8, FARM.z + 3.4], [FARM.x - FARM.w / 2 - 1.2, FARM.z - 2.2]] as const) {
    const hy = heightAt(hx2, hz2)
    fk.s.cyl(0.7, 0.8, 0.9, [hx2, hy + 0.45, hz2], C.sand, 10)
    fk.s.cone(0.82, 0.8, [hx2, hy + 1.3, hz2], C.gold, 10)
  }
  for (let i = 0; i <= 30; i++) {
    const fx = FARM.x - FARM.w / 2 - 0.4 + (i / 30) * (FARM.w + 0.8)
    fk.s.box(0.06, 0.45, 0.06, [fx, heightAt(fx, FARM.z + FARM.d / 2 + 0.5) + 0.22, FARM.z + FARM.d / 2 + 0.5], C.woodL, [0, 0, 0], 0)
  }
  flush(fk, mats, group)

  return { group, anims }
}
