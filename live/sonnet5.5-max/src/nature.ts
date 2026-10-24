import * as THREE from 'three'
import { Kit } from './batch'
import { C } from './palette'
import { MOUNTAIN, LAKE, MEADOW, ORCHARD, FOREST_A, FOREST_B, CAVE, FARM, VILLAGE, MILL, distToRoads } from './layout'
import { heightAt, castleSd, lakeD, insideIsland } from './terrain'
import { mulberry32 } from './noise'
import { flush, type Built } from './buildings'
import type { Materials } from './materials'

const PI = Math.PI

const isLand = (x: number, z: number, margin = 2.4) => insideIsland(x, z, margin) && heightAt(x, z) > 0.05 && lakeD(x, z) > 1.3 && castleSd(x, z) > 3.4

const isFree = (x: number, z: number) =>
  isLand(x, z) &&
  distToRoads(x, z) > 1.3 &&
  Math.hypot(x - VILLAGE.x, z - VILLAGE.z) > 8.5 &&
  Math.hypot(x - MILL.x, z - MILL.z) > 5 &&
  Math.hypot(x - CAVE.x, z - CAVE.z) > 4 &&
  !(Math.abs(x - FARM.x) < FARM.w / 2 + 4.5 && Math.abs(z - FARM.z) < FARM.d / 2 + 3.5)

function pine(k: Kit, x: number, y: number, z: number, s: number) {
  k.s.cyl(0.08 * s, 0.13 * s, 0.8 * s, [x, y + 0.4 * s, z], C.woodD, 6)
  for (let i = 0; i < 4; i++) k.s.cone((0.95 - i * 0.2) * s, 1.15 * s, [x, y + (1.0 + i * 0.62) * s, z], i % 2 ? C.pine : C.pineD, 8)
  k.s.cone(0.22 * s, 0.5 * s, [x, y + 3.45 * s, z], C.pine, 6)
}

function leafy(k: Kit, x: number, y: number, z: number, s: number, tone = 0) {
  k.s.cyl(0.1 * s, 0.17 * s, 1.3 * s, [x, y + 0.65 * s, z], C.woodD, 7)
  const cols = [C.leaf, C.leafL, C.leafD]
  k.s.sph(0.95 * s, [x, y + 1.9 * s, z], cols[tone % 3], 1, 9)
  k.s.sph(0.65 * s, [x + 0.55 * s, y + 1.55 * s, z + 0.2 * s], cols[(1 + tone) % 3], 1, 8)
  k.s.sph(0.7 * s, [x - 0.5 * s, y + 1.65 * s, z - 0.2 * s], cols[(2 + tone) % 3], 1, 8)
  k.s.sph(0.55 * s, [x + 0.1 * s, y + 2.5 * s, z - 0.1 * s], cols[(1 + tone) % 3], 1, 8)
}

function blossom(k: Kit, x: number, y: number, z: number, s: number, fruit: boolean) {
  k.s.cyl(0.1 * s, 0.16 * s, 1.1 * s, [x, y + 0.55 * s, z], C.woodD, 7)
  k.s.sph(0.9 * s, [x, y + 1.7 * s, z], C.blossom, 1, 9)
  k.s.sph(0.6 * s, [x + 0.6 * s, y + 1.45 * s, z + 0.1 * s], C.pink, 1, 8)
  k.s.sph(0.6 * s, [x - 0.55 * s, y + 1.5 * s, z - 0.1 * s], '#f6cdd6', 1, 8)
  k.s.sph(0.5 * s, [x, y + 2.3 * s, z], C.pink, 1, 8)
  if (fruit) for (let i = 0; i < 4; i++) k.s.sph(0.07, [x + Math.sin(i * 2) * 0.8 * s, y + 0.9 * s, z + Math.cos(i * 2) * 0.8 * s], C.red, 1, 6)
}

function boulder(k: Kit, x: number, y: number, z: number, s: number, rnd: () => number) {
  const c = [C.rock, C.rockD, '#c4b8a8'][Math.floor(rnd() * 3)]
  k.s.sph(0.6 * s, [x, y + 0.2 * s, z], c, [1.1, 0.7, 0.95], 7)
  k.s.sph(0.35 * s, [x + 0.5 * s, y + 0.1 * s, z + 0.2 * s], C.rockD, [1, 0.7, 1], 6)
}

export function buildNature(mats: Materials): Built {
  const group = new THREE.Group()
  const anims: Built['anims'] = []
  const k = new Kit()
  const rnd = mulberry32(2024)

  const forest = (cx: number, cz: number, r: number, n: number, pineBias: number) => {
    const placed: Array<[number, number]> = []
    let tries = 0
    while (placed.length < n && tries++ < n * 30) {
      const a = rnd() * PI * 2
      const d = Math.sqrt(rnd()) * r
      const x = cx + Math.cos(a) * d
      const z = cz + Math.sin(a) * d
      if (!isFree(x, z) || placed.some(([px, pz]) => Math.hypot(px - x, pz - z) < 1.7)) continue
      placed.push([x, z])
      const y = heightAt(x, z)
      const s = 0.8 + rnd() * 0.7
      if (rnd() < pineBias) pine(k, x, y, z, s)
      else leafy(k, x, y, z, s, Math.floor(rnd() * 3))
    }
  }
  forest(FOREST_A.x, FOREST_A.z, FOREST_A.r, 56, 0.55)
  forest(FOREST_B.x, FOREST_B.z, FOREST_B.r, 46, 0.3)

  for (let i = 0; i < 9; i++) {
    const a = (i / 9) * PI * 2
    const d = i === 0 ? 0 : ORCHARD.r * (0.55 + (i % 2) * 0.35)
    const x = ORCHARD.x + Math.cos(a) * d
    const z = ORCHARD.z + Math.sin(a) * d
    if (isLand(x, z, 2.5) && distToRoads(x, z) > 1.0) blossom(k, x, heightAt(x, z), z, 0.9 + rnd() * 0.25, i % 2 === 0)
  }
  for (let i = 0; i < 26; i++) {
    const a = rnd() * PI * 2
    const d = 12 + rnd() * 26
    const x = Math.cos(a) * d
    const z = Math.sin(a) * d
    if (!isFree(x, z)) continue
    if (rnd() < 0.5) leafy(k, x, heightAt(x, z), z, 0.8 + rnd() * 0.5, Math.floor(rnd() * 3))
    else pine(k, x, heightAt(x, z), z, 0.7 + rnd() * 0.5)
  }

  /* 山：松林、积雪、巨石、洞穴 */
  for (let i = 0; i < 22; i++) {
    const a = rnd() * PI * 2
    const d = MOUNTAIN.r * (0.45 + rnd() * 0.75)
    const x = MOUNTAIN.x + Math.cos(a) * d
    const z = MOUNTAIN.z + Math.sin(a) * d
    if (!isLand(x, z, 2.5) || Math.hypot(x - CAVE.x, z - CAVE.z) < 3.5) continue
    pine(k, x, heightAt(x, z) - 0.1, z, 0.55 + rnd() * 0.5)
  }
  for (let i = 0; i < 26; i++) {
    const a = rnd() * PI * 2
    const d = Math.sqrt(rnd()) * MOUNTAIN.r * 0.8
    const x = MOUNTAIN.x + Math.cos(a) * d
    const z = MOUNTAIN.z + Math.sin(a) * d
    const y = heightAt(x, z)
    if (y > MOUNTAIN.h * 0.62) k.s.sph(0.5 + rnd() * 0.7, [x, y + 0.02, z], C.snow, [1, 0.28, 1], 8, 0.02)
  }
  for (let i = 0; i < 24; i++) {
    const a = rnd() * PI * 2
    const d = 8 + rnd() * 30
    const x = Math.cos(a) * d
    const z = Math.sin(a) * d
    if (!isLand(x, z, 1.8) || distToRoads(x, z) < 1.0) continue
    boulder(k, x, heightAt(x, z) - 0.05, z, 0.5 + rnd() * 0.7, rnd)
  }
  const dir = Math.atan2(CAVE.x - MOUNTAIN.x, CAVE.z - MOUNTAIN.z)
  const cv = k.at(CAVE.x, heightAt(CAVE.x, CAVE.z) - 0.15, CAVE.z, dir)
  cv.s.tor(1.25, 0.42, [0, 0.95, 0], C.rock, [0, 0, 0], 14)
  cv.s.cyl(1.2, 1.2, 0.08, [0, 0.95, -0.1], '#2f3452', 18, [PI / 2, 0, 0], 1, 0)
  for (const [bx, by, bz, bs] of [[-1.5, 0.3, 0.3, 0.9], [1.5, 0.3, 0.3, 0.8], [-1.0, 1.9, 0.0, 0.7], [1.0, 1.9, 0.0, 0.7]] as const) cv.s.sph(0.55 * bs, [bx, by, bz], C.rockD, [1, 0.8, 1], 7)
  cv.s.cyl(0.04, 0.05, 1.2, [1.9, 0.6, 1.2], C.iron, 6)
  cv.s.box(0.22, 0.26, 0.22, [1.9, 1.3, 1.2], C.iron)
  cv.g.box(0.15, 0.18, 0.15, [1.9, 1.3, 1.2], '#ffd98a', [0, 0, 0], 0)
  const sx = CAVE.x + Math.sin(dir + 0.8) * 4.2
  const sz = CAVE.z + Math.cos(dir + 0.8) * 4.2
  const sy = heightAt(sx, sz)
  k.s.cyl(0.05, 0.06, 1.1, [sx, sy + 0.55, sz], C.woodD, 6)
  k.s.box(0.7, 0.28, 0.06, [sx, sy + 1.0, sz], C.woodL, [0, dir + 0.8, 0.08])
  k.s.box(0.6, 0.24, 0.06, [sx, sy + 0.7, sz], C.woodL, [0, dir + 1.2, -0.08])

  /* 湖：栈桥、小船、芦苇、睡莲 */
  const jx = LAKE.x - LAKE.rx - 0.6
  for (let i = 0; i < 9; i++) k.s.box(0.34, 0.07, 1.0, [jx + i * 0.38, LAKE.y + 0.38, LAKE.z - 1.2], C.woodL, [0, 0, 0], 0.04)
  for (let i = 0; i < 4; i++) for (const s of [-1, 1]) k.s.cyl(0.06, 0.06, 1.0, [jx + 0.3 + i * 1.0, LAKE.y - 0.1, LAKE.z - 1.2 + s * 0.45], C.woodD, 6)
  const BT = k.at(LAKE.x - 1.6, LAKE.y + 0.05, LAKE.z + 0.4, 0.9)
  BT.s.box(0.75, 0.24, 1.6, [0, 0.12, 0], C.wood)
  BT.s.cone(0.38, 0.55, [0, 0.12, 1.02], C.wood, 4, [PI / 2, PI / 4, 0], [1, 1, 0.6])
  BT.s.cone(0.38, 0.55, [0, 0.12, -1.02], C.wood, 4, [-PI / 2, PI / 4, 0], [1, 1, 0.6])
  BT.s.box(0.7, 0.05, 0.3, [0, 0.3, -0.3], C.woodL)
  BT.s.box(0.76, 0.06, 1.62, [0, 0.25, 0], C.roofRed, [0, 0, 0], 0)
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * PI * 2 + rnd() * 0.3
    const x = LAKE.x + Math.cos(a) * LAKE.rx * 1.02
    const z = LAKE.z + Math.sin(a) * LAKE.rz * 1.02
    if (!insideIsland(x, z, 2) || castleSd(x, z) < 3) continue
    const y = Math.max(heightAt(x, z), LAKE.y)
    for (let j = 0; j < 5; j++) {
      const rx = x + (rnd() - 0.5) * 0.5
      const rz = z + (rnd() - 0.5) * 0.5
      const h = 0.8 + rnd() * 0.7
      k.s.cyl(0.012, 0.018, h, [rx, y + h / 2, rz], C.leafL, 4, [0, 0, (rnd() - 0.5) * 0.2], 1, 0)
      if (j % 2 === 0) k.s.cyl(0.035, 0.035, 0.2, [rx, y + h + 0.05, rz], C.woodD, 5, [0, 0, 0], 1, 0)
    }
  }
  for (let i = 0; i < 10; i++) {
    const a = rnd() * PI * 2
    const d = Math.sqrt(rnd()) * 0.75
    const x = LAKE.x + Math.cos(a) * LAKE.rx * d
    const z = LAKE.z + Math.sin(a) * LAKE.rz * d
    k.s.cyl(0.26, 0.26, 0.02, [x, LAKE.y + 0.03, z], C.leafD, 9, [0, 0, 0], 1, 0.03)
    if (i % 2 === 0) k.s.sph(0.08, [x + 0.05, LAKE.y + 0.1, z], C.pink, [1, 0.7, 1], 6, 0)
  }

  /* 草地：野花、野餐毯 */
  for (let i = 0; i < 190; i++) {
    const a = rnd() * PI * 2
    const d = Math.sqrt(rnd()) * MEADOW.r
    const x = MEADOW.x + Math.cos(a) * d
    const z = MEADOW.z + Math.sin(a) * d
    if (!insideIsland(x, z, 2.2) || heightAt(x, z) < 0.05) continue
    const y = heightAt(x, z)
    const col = [C.pink, C.gold, C.white, C.lilac, C.red][i % 5]
    k.s.cyl(0.012, 0.012, 0.3, [x, y + 0.15, z], C.leafD, 4, [0, 0, 0], 1, 0)
    k.s.sph(0.06, [x, y + 0.32, z], col, [1, 0.7, 1], 6)
  }
  const px = MEADOW.x + 2.8
  const pz = MEADOW.z - 1.2
  const py = heightAt(px, pz)
  const blanket = k.at(px, py, pz, 0.4)
  blanket.s.box(1.7, 0.03, 1.3, [0, 0.03, 0], C.red, [0, 0, 0], 0)
  for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) if ((i + j) % 2 === 0) blanket.s.box(0.42, 0.035, 0.43, [(i - 1.5) * 0.42, 0.05, (j - 1) * 0.43], C.cream, [0, 0, 0], 0)
  blanket.s.cyl(0.18, 0.15, 0.14, [0.2, 0.12, 0], C.woodL, 8)
  blanket.s.sph(0.06, [-0.3, 0.1, 0.2], C.red, 1, 6)

  /* 全岛草丛与小花 */
  let tufts = 0
  let guard = 0
  while (tufts < 420 && guard++ < 4000) {
    const a = rnd() * PI * 2
    const d = Math.sqrt(rnd()) * 40
    const x = Math.cos(a) * d
    const z = Math.sin(a) * d
    if (!isFree(x, z) || heightAt(x, z) > MOUNTAIN.h * 0.55 + 2) continue
    const y = heightAt(x, z)
    const c = [C.leaf, C.leafL, C.leafD][tufts % 3]
    for (let j = 0; j < 3; j++) k.s.cone(0.05, 0.3 + rnd() * 0.15, [x + (j - 1) * 0.06, y + 0.15, z + (rnd() - 0.5) * 0.06], c, 4, [(rnd() - 0.5) * 0.4, 0, (rnd() - 0.5) * 0.4], 1, 0.05)
    if (tufts % 3 === 0) {
      const fc = [C.pink, C.gold, C.white, C.lilac][tufts % 4]
      k.s.cyl(0.01, 0.01, 0.22, [x + 0.12, y + 0.11, z], C.leafD, 4, [0, 0, 0], 1, 0)
      k.s.sph(0.05, [x + 0.12, y + 0.24, z], fc, [1, 0.7, 1], 6)
    }
    tufts++
  }

  flush(k, mats, group)
  return { group, anims }
}
