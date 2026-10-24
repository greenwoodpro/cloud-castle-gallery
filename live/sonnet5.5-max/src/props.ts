import * as THREE from 'three'
import { Kit } from './batch'
import { C, BOOKS } from './palette'
import { Rng } from './noise'

const PI = Math.PI

export function table(k: Kit, w: number, d: number, h = 0.52, top: string = C.woodL, leg: string = C.woodD) {
  k.s.box(w, 0.07, d, [0, h - 0.035, 0], top)
  k.s.box(w - 0.14, 0.07, d - 0.14, [0, h - 0.1, 0], leg)
  for (const sx of [-1, 1])
    for (const sz of [-1, 1]) k.s.box(0.07, h - 0.07, 0.07, [sx * (w / 2 - 0.07), (h - 0.07) / 2, sz * (d / 2 - 0.07)], leg)
}

export function bench(k: Kit, w: number) {
  k.s.box(w, 0.06, 0.26, [0, 0.27, 0], C.wood)
  for (const sx of [-1, 1]) k.s.box(0.06, 0.25, 0.22, [sx * (w / 2 - 0.12), 0.125, 0], C.woodD)
}

export function chair(k: Kit, fabric: string = C.red) {
  k.s.box(0.42, 0.06, 0.4, [0, 0.3, 0], C.wood)
  k.s.box(0.36, 0.05, 0.34, [0, 0.35, 0], fabric)
  for (const sx of [-1, 1])
    for (const sz of [-1, 1]) k.s.box(0.05, 0.3, 0.05, [sx * 0.18, 0.15, sz * 0.17], C.woodD)
  k.s.box(0.42, 0.5, 0.05, [0, 0.58, -0.18], C.wood)
  k.s.box(0.34, 0.3, 0.04, [0, 0.6, -0.155], fabric)
}

export function armchair(k: Kit, fabric: string = C.teal) {
  k.s.box(0.7, 0.3, 0.62, [0, 0.2, 0], C.woodD)
  k.s.box(0.58, 0.14, 0.5, [0, 0.4, 0.03], fabric)
  k.s.box(0.7, 0.66, 0.14, [0, 0.62, -0.26], fabric)
  for (const sx of [-1, 1]) k.s.box(0.1, 0.3, 0.55, [sx * 0.34, 0.45, 0], fabric)
}

export function throne(k: Kit, fabric: string = C.red, trim: string = C.gold) {
  k.s.box(0.66, 0.34, 0.58, [0, 0.17, 0], trim)
  k.s.box(0.56, 0.1, 0.5, [0, 0.39, 0.02], fabric)
  k.s.box(0.72, 1.35, 0.12, [0, 0.82, -0.28], trim)
  k.s.box(0.54, 1.0, 0.05, [0, 0.9, -0.215], fabric)
  k.s.cone(0.18, 0.3, [0, 1.65, -0.28], trim, 4, [0, PI / 4, 0])
  for (const sx of [-1, 1]) {
    k.s.box(0.1, 0.36, 0.5, [sx * 0.37, 0.5, 0.02], trim)
    k.s.sph(0.06, [sx * 0.37, 0.72, 0.22], trim)
    k.s.sph(0.05, [sx * 0.34, 1.52, -0.28], trim)
    k.g.sph(0.03, [sx * 0.34, 1.52, -0.22], '#ff9bb0')
  }
  k.g.sph(0.045, [0, 1.46, -0.21], '#9fe6ff')
}

export function bed(k: Kit, cover: string = C.mint, canopy: string = C.pink) {
  k.s.box(1.5, 0.28, 2.1, [0, 0.14, 0], C.woodD)
  k.s.box(1.4, 0.18, 2.0, [0, 0.37, 0], C.cream)
  k.s.box(1.42, 0.12, 1.3, [0, 0.46, 0.34], cover)
  k.s.box(1.44, 0.04, 0.3, [0, 0.53, -0.28], C.white)
  for (const sx of [-1, 1]) k.s.box(0.55, 0.13, 0.34, [sx * 0.36, 0.52, -0.8], C.white)
  k.s.box(1.5, 0.95, 0.1, [0, 0.62, -1.05], C.woodD)
  k.s.box(1.5, 0.45, 0.1, [0, 0.37, 1.05], C.woodD)
  for (const sx of [-1, 1])
    for (const sz of [-1, 1]) k.s.cyl(0.04, 0.04, 1.85, [sx * 0.73, 0.92, sz * 1.02], C.woodD, 8)
  k.s.box(1.62, 0.06, 2.24, [0, 1.86, 0], canopy)
  for (const sx of [-1, 1]) {
    k.s.box(0.04, 0.9, 0.5, [sx * 0.76, 1.38, -0.8], canopy)
    k.s.box(0.04, 0.9, 0.5, [sx * 0.76, 1.38, 0.8], canopy)
  }
}

export function bookshelf(k: Kit, w: number, h: number, seed = 1) {
  const rng = new Rng(seed)
  const rows = Math.max(2, Math.round(h / 0.42))
  const rh = h / rows
  k.s.box(w, h, 0.05, [0, h / 2, -0.12], C.woodD)
  for (const sx of [-1, 1]) k.s.box(0.06, h, 0.3, [sx * (w / 2 - 0.03), h / 2, 0], C.wood)
  for (let r = 0; r <= rows; r++) k.s.box(w, 0.05, 0.3, [0, r * rh, 0], C.wood)
  for (let r = 0; r < rows; r++) {
    let x = -w / 2 + 0.1
    while (x < w / 2 - 0.12) {
      const bw = rng.range(0.045, 0.1)
      const bh = rng.range(rh * 0.55, rh * 0.88)
      if (rng.chance(0.07)) {
        x += bw * 2
        continue
      }
      k.s.box(bw, bh, 0.2, [x + bw / 2, r * rh + 0.025 + bh / 2, -0.01], rng.pick(BOOKS), [0, 0, rng.chance(0.05) ? 0.25 : 0])
      x += bw + 0.005
    }
  }
}

export function barrel(k: Kit, r = 0.27, h = 0.55) {
  k.s.cyl(r * 0.88, r * 0.88, h, [0, h / 2, 0], C.wood, 12)
  k.s.cyl(r, r, h * 0.55, [0, h / 2, 0], C.woodL, 12)
  for (const t of [0.22, 0.78]) k.s.cyl(r * 0.97, r * 0.97, 0.04, [0, h * t, 0], C.iron, 12)
  k.s.cyl(r * 0.85, r * 0.85, 0.03, [0, h + 0.01, 0], C.woodL, 12)
}

export function crate(k: Kit, s = 0.45, color: string = C.wood) {
  k.s.box(s, s, s, [0, s / 2, 0], color)
  k.s.box(s + 0.02, 0.05, s + 0.02, [0, s * 0.2, 0], C.woodD)
  k.s.box(s + 0.02, 0.05, s + 0.02, [0, s * 0.8, 0], C.woodD)
}

export function sack(k: Kit, color: string = C.cream) {
  k.s.sph(0.25, [0, 0.22, 0], color, [1, 1.1, 0.85])
  k.s.sph(0.1, [0, 0.46, 0], color)
  k.s.tor(0.07, 0.02, [0, 0.4, 0], C.woodD, [PI / 2, 0, 0], 8)
}

export function candle(k: Kit, h = 0.18) {
  k.s.cyl(0.03, 0.03, h, [0, h / 2, 0], C.cream, 8)
  k.s.cyl(0.055, 0.055, 0.02, [0, 0.01, 0], C.brass, 8)
  k.g.sph(0.032, [0, h + 0.05, 0], '#ffd27a', [1, 1.6, 1], 6)
}

export function torch(k: Kit) {
  k.s.box(0.1, 0.05, 0.14, [0, 0, -0.04], C.iron)
  k.s.cyl(0.035, 0.03, 0.4, [0, 0.12, 0.04], C.woodD, 6, [0.25, 0, 0])
  k.s.cyl(0.07, 0.04, 0.1, [0, 0.33, 0.1], C.iron, 8)
  k.g.cone(0.07, 0.24, [0, 0.47, 0.1], '#ffb347', 6)
  k.g.cone(0.045, 0.16, [0, 0.45, 0.1], '#ffe08a', 6)
}

export function fireplace(k: Kit) {
  k.s.box(1.7, 1.4, 0.55, [0, 0.7, 0], C.stone)
  k.s.box(0.92, 0.8, 0.02, [0, 0.46, 0.28], '#3d3338')
  k.s.box(1.9, 0.1, 0.7, [0, 1.35, 0.05], C.stoneL)
  k.s.box(0.9, 1.1, 0.45, [0, 1.95, -0.05], C.stone)
  k.s.cyl(0.05, 0.05, 0.62, [0, 0.12, 0.18], C.woodD, 6, [0, 0, PI / 2])
  k.s.cyl(0.05, 0.05, 0.55, [0.05, 0.19, 0.12], C.wood, 6, [0, 0.4, PI / 2])
  k.g.cone(0.17, 0.55, [0, 0.46, 0.2], '#ffb347', 6)
  k.g.cone(0.11, 0.42, [0.14, 0.4, 0.2], '#ffd980', 6)
  k.g.cone(0.11, 0.36, [-0.14, 0.38, 0.2], '#ff9d5c', 6)
  k.g.cone(0.07, 0.28, [0.02, 0.4, 0.22], '#fff0b3', 6)
  for (const sx of [-1, 1]) k.s.box(0.08, 0.9, 0.08, [sx * 0.52, 0.45, 0.3], C.stoneL)
}

export function chandelier(k: Kit) {
  k.s.tor(0.55, 0.03, [0, 0, 0], C.iron, [PI / 2, 0, 0], 20)
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * PI * 2
    const x = Math.cos(a) * 0.55
    const z = Math.sin(a) * 0.55
    k.s.cyl(0.025, 0.025, 0.14, [x, 0.08, z], C.cream, 6)
    k.g.sph(0.03, [x, 0.2, z], '#ffd27a', [1, 1.6, 1], 6)
    k.s.rod([x, 0, z], [0, 0.75, 0], 0.008, C.iron, 4)
  }
  k.s.sph(0.06, [0, 0.76, 0], C.brass)
  k.s.rod([0, 0.76, 0], [0, 1.1, 0], 0.012, C.iron, 4)
}

export function banner(k: Kit, w: number, h: number, color: string, trim: string = C.gold) {
  k.s.rod([-w / 2 - 0.06, 0, 0], [w / 2 + 0.06, 0, 0], 0.025, C.woodD, 6)
  k.s.box(w, h, 0.03, [0, -h / 2 - 0.03, 0], color)
  k.s.box(w * 0.72, w * 0.72, 0.03, [0, -h - 0.03 + w * 0.05, 0], color, [0, 0, PI / 4])
  k.s.box(w * 0.22, w * 0.22, 0.036, [0, -h * 0.5, 0.003], trim, [0, 0, PI / 4])
  k.s.box(w * 0.1, w * 0.4, 0.036, [0, -h * 0.5, 0.003], trim)
  k.s.box(w * 0.4, w * 0.1, 0.036, [0, -h * 0.5, 0.003], trim)
}

export function tapestry(k: Kit, w: number, h: number, color: string, trim: string = C.gold) {
  k.s.box(w + 0.14, h + 0.14, 0.03, [0, 0, 0], trim)
  k.s.box(w, h, 0.04, [0, 0, 0.005], color)
  k.s.box(w * 0.5, w * 0.5, 0.045, [0, 0, 0.008], trim, [0, 0, PI / 4])
  k.s.box(w * 0.34, w * 0.34, 0.05, [0, 0, 0.01], color, [0, 0, PI / 4])
  k.g.sph(0.05, [0, 0, 0.05], '#fff1b8')
}

export function rugRound(k: Kit, r: number, c1: string, c2: string) {
  k.s.cyl(r, r, 0.03, [0, 0.015, 0], c1, 28, [0, 0, 0], 1, 0.02)
  k.s.cyl(r * 0.72, r * 0.72, 0.035, [0, 0.018, 0], c2, 28, [0, 0, 0], 1, 0.02)
  k.s.cyl(r * 0.36, r * 0.36, 0.04, [0, 0.02, 0], c1, 28, [0, 0, 0], 1, 0.02)
}

export function cauldron(k: Kit) {
  k.s.sph(0.34, [0, 0.5, 0], C.iron, [1, 0.85, 1], 12)
  k.s.tor(0.31, 0.04, [0, 0.7, 0], C.ironL, [PI / 2, 0, 0], 16)
  k.s.cyl(0.29, 0.29, 0.02, [0, 0.69, 0], '#e8a84e', 14)
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * PI * 2
    k.s.cyl(0.04, 0.03, 0.22, [Math.cos(a) * 0.22, 0.11, Math.sin(a) * 0.22], C.iron, 6)
  }
}

export function stove(k: Kit) {
  k.s.box(1.6, 0.72, 0.85, [0, 0.36, 0], C.stoneD)
  k.s.box(1.62, 0.06, 0.88, [0, 0.75, 0], C.iron)
  k.s.box(0.55, 0.32, 0.02, [0.3, 0.32, 0.43], '#3d3338')
  k.g.box(0.44, 0.2, 0.02, [0.3, 0.27, 0.44], '#ffb347')
  k.s.box(0.55, 1.6, 0.55, [-0.45, 1.55, -0.12], C.stoneD)
}

export function weaponRack(k: Kit) {
  k.s.box(1.4, 0.06, 0.28, [0, 0.12, 0], C.woodD)
  k.s.box(1.4, 0.06, 0.28, [0, 0.9, -0.04], C.woodD)
  for (const sx of [-1, 1]) k.s.box(0.07, 1.0, 0.07, [sx * 0.68, 0.5, 0], C.woodD)
  for (let i = 0; i < 4; i++) {
    const x = -0.5 + i * 0.33
    if (i % 2 === 0) {
      k.s.rod([x, 0.1, 0.02], [x, 1.55, 0.02], 0.016, C.wood, 5)
      k.s.cone(0.05, 0.2, [x, 1.64, 0.02], C.steel, 4)
    } else {
      k.s.box(0.05, 1.0, 0.012, [x, 0.7, 0.02], C.steel)
      k.s.box(0.26, 0.04, 0.04, [x, 1.2, 0.02], C.brass)
      k.s.cyl(0.02, 0.02, 0.2, [x, 1.32, 0.02], C.woodD, 5)
    }
  }
  k.s.rod([0.58, 0.1, 0.05], [0.58, 1.0, 0.05], 0.014, C.wood, 5)
  k.s.box(0.22, 0.2, 0.03, [0.58, 1.06, 0.05], C.steel)
}

export function shield(k: Kit, c1: string, c2: string) {
  k.s.cyl(0.3, 0.3, 0.05, [0, 0, 0], c1, 18, [PI / 2, 0, 0])
  k.s.box(0.12, 0.58, 0.06, [0, 0, 0.005], c2)
  k.s.box(0.58, 0.12, 0.06, [0, 0, 0.005], c2)
  k.s.sph(0.07, [0, 0, 0.05], C.gold)
}

export function armorStand(k: Kit) {
  k.s.cyl(0.25, 0.28, 0.05, [0, 0.025, 0], C.woodD, 10)
  k.s.cyl(0.03, 0.03, 0.7, [0, 0.4, 0], C.woodD, 6)
  for (const sx of [-1, 1]) k.s.cyl(0.07, 0.06, 0.4, [sx * 0.09, 0.28, 0], C.steel, 8)
  k.s.cyl(0.21, 0.16, 0.5, [0, 0.82, 0], C.steel, 10)
  k.s.tor(0.15, 0.03, [0, 0.62, 0], C.brass, [PI / 2, 0, 0], 10)
  for (const sx of [-1, 1]) {
    k.s.sph(0.1, [sx * 0.24, 1.0, 0], C.steel)
    k.s.cyl(0.05, 0.045, 0.4, [sx * 0.29, 0.78, 0], C.steel, 6, [0, 0, sx * 0.15])
  }
  k.s.sph(0.17, [0, 1.2, 0], C.steel, [1, 1.05, 1])
  k.s.box(0.2, 0.04, 0.04, [0, 1.2, 0.16], C.shadow)
  k.s.cone(0.06, 0.25, [0, 1.46, -0.04], C.red, 6, [-0.3, 0, 0])
}

export function trainingDummy(k: Kit) {
  k.s.cyl(0.05, 0.06, 1.1, [0, 0.55, 0], C.woodD, 6)
  k.s.box(0.7, 0.07, 0.07, [0, 0.85, 0], C.woodD)
  k.s.sph(0.15, [0, 1.2, 0], '#e7d8b0', [1, 1.05, 1])
  k.s.cyl(0.2, 0.17, 0.5, [0, 0.8, 0], '#d3b98d', 8)
  k.s.cyl(0.2, 0.2, 0.05, [0, 0.04, 0], C.woodD, 8)
  k.s.cone(0.1, 0.14, [0, 1.4, 0], C.red, 6)
}

export function openBook(k: Kit, color: string = C.cream) {
  k.s.box(0.2, 0.025, 0.28, [-0.1, 0.03, 0], color, [0, 0, 0.12])
  k.s.box(0.2, 0.025, 0.28, [0.1, 0.03, 0], color, [0, 0, -0.12])
  k.s.box(0.46, 0.02, 0.3, [0, 0.008, 0], C.redD)
}

export function globe(k: Kit) {
  k.s.cyl(0.18, 0.22, 0.05, [0, 0.025, 0], C.woodD, 10)
  k.s.cyl(0.03, 0.03, 0.5, [0, 0.3, 0], C.woodD, 6)
  k.s.sph(0.3, [0, 0.86, 0], '#8fc0d6', 1, 16)
  for (const [x, y, z, s] of [
    [0.1, 0.95, 0.24, 0.1],
    [-0.16, 0.8, 0.22, 0.12],
    [0.2, 0.75, 0.16, 0.08],
    [0, 1.12, 0.1, 0.07],
  ] as const)
    k.s.sph(s, [x, y, z], '#9ccf8a', [1, 0.8, 0.5], 6)
  k.s.tor(0.36, 0.018, [0, 0.86, 0], C.brass, [0.2, 0, 0.3], 24)
}

export function ladder(k: Kit) {
  for (const sx of [-1, 1]) k.s.rod([sx * 0.22, 0, 0.45], [sx * 0.22, 2.0, 0], 0.025, C.wood, 5)
  for (let i = 1; i < 8; i++) {
    const t = i / 8
    k.s.rod([-0.22, t * 2.0, 0.45 * (1 - t)], [0.22, t * 2.0, 0.45 * (1 - t)], 0.018, C.woodD, 5)
  }
}

export function telescope(k: Kit) {
  const top: [number, number, number] = [0, 1.0, 0]
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * PI * 2 + 0.5
    k.s.rod(top, [Math.cos(a) * 0.45, 0, Math.sin(a) * 0.45], 0.022, C.woodD, 5)
  }
  k.s.sph(0.07, top, C.brass)
  k.s.cyl(0.075, 0.1, 1.5, [0.0, 1.45, -0.2], C.brass, 12, [-0.85, 0, 0])
  k.s.cyl(0.11, 0.11, 0.1, [0, 1.78, -0.52], C.goldD, 12, [-0.85, 0, 0])
  k.s.cyl(0.04, 0.04, 0.15, [0, 1.12, 0.35], C.iron, 6, [-0.85, 0, 0])
}

export function armillary(k: Kit) {
  k.s.cyl(0.14, 0.2, 0.06, [0, 0.03, 0], C.woodD, 10)
  k.s.cyl(0.025, 0.025, 0.32, [0, 0.2, 0], C.brass, 6)
  k.s.sph(0.08, [0, 0.58, 0], '#8fc0d6')
  k.s.tor(0.28, 0.014, [0, 0.58, 0], C.brass, [0, 0, 0], 24)
  k.s.tor(0.28, 0.014, [0, 0.58, 0], C.brass, [PI / 2, 0, 0], 24)
  k.s.tor(0.28, 0.014, [0, 0.58, 0], C.goldD, [0.6, 0.5, 0.9], 24)
}

export function bell(k: Kit) {
  for (const sx of [-1, 1]) k.s.box(0.1, 1.4, 0.1, [sx * 0.42, 0.7, 0], C.woodD)
  k.s.box(1.1, 0.12, 0.14, [0, 1.42, 0], C.woodD)
  k.s.cyl(0.1, 0.3, 0.42, [0, 1.08, 0], C.brass, 14)
  k.s.tor(0.3, 0.035, [0, 0.87, 0], C.goldD, [PI / 2, 0, 0], 16)
  k.s.sph(0.07, [0, 0.8, 0], C.iron)
  k.s.rod([0.1, 1.2, 0.08], [0.18, 0.2, 0.3], 0.012, C.cream, 4)
}

export function wardrobe(k: Kit) {
  k.s.box(0.95, 1.7, 0.5, [0, 0.85, 0], C.woodD)
  k.s.box(0.4, 1.5, 0.03, [-0.22, 0.85, 0.26], C.wood)
  k.s.box(0.4, 1.5, 0.03, [0.22, 0.85, 0.26], C.wood)
  k.s.sph(0.03, [-0.05, 0.85, 0.29], C.brass)
  k.s.sph(0.03, [0.05, 0.85, 0.29], C.brass)
  k.s.box(1.05, 0.08, 0.58, [0, 1.74, 0], C.wood)
}

export function chest(k: Kit, color: string = C.woodD) {
  k.s.box(0.8, 0.36, 0.45, [0, 0.18, 0], color)
  k.s.cyl(0.225, 0.225, 0.8, [0, 0.36, 0], color, 12, [0, 0, PI / 2], [1, 0.7, 1])
  k.s.box(0.82, 0.07, 0.47, [0, 0.2, 0], C.iron)
  k.s.box(0.08, 0.14, 0.05, [0, 0.36, 0.24], C.brass)
}

export function nightstand(k: Kit) {
  k.s.box(0.45, 0.5, 0.4, [0, 0.25, 0], C.wood)
  k.s.box(0.38, 0.12, 0.02, [0, 0.35, 0.21], C.woodD)
  const c = k.at(0, 0.5, 0)
  candle(c)
}

export function vanity(k: Kit) {
  table(k, 0.9, 0.45, 0.55, C.woodL, C.woodD)
  k.s.cyl(0.3, 0.3, 0.04, [0, 1.15, -0.2], C.brass, 16, [PI / 2, 0, 0])
  k.g.cyl(0.26, 0.26, 0.02, [0, 1.15, -0.18], '#d7efff', 16, [PI / 2, 0, 0])
  k.s.rod([0, 0.55, -0.2], [0, 0.86, -0.2], 0.02, C.brass, 5)
  k.s.cyl(0.08, 0.08, 0.1, [0.25, 0.6, 0.0], C.pink, 8)
}

export function plant(k: Kit, scale = 1) {
  k.s.cyl(0.15 * scale, 0.11 * scale, 0.22 * scale, [0, 0.11 * scale, 0], C.roofRed, 8)
  for (const [x, y, z, r] of [
    [0, 0.42, 0, 0.2],
    [0.12, 0.34, 0.06, 0.14],
    [-0.1, 0.36, -0.06, 0.15],
  ] as const)
    k.s.sph(r * scale, [x * scale, y * scale, z * scale], C.leaf, 1, 7)
}

/** 小物件 */
export function plate(k: Kit, color: string = C.white) {
  k.s.cyl(0.1, 0.07, 0.02, [0, 0.01, 0], color, 10)
}
export function goblet(k: Kit) {
  k.s.cyl(0.03, 0.03, 0.08, [0, 0.04, 0], C.goldD, 6)
  k.s.cyl(0.05, 0.03, 0.07, [0, 0.11, 0], C.gold, 8)
}
export function loaf(k: Kit) {
  k.s.sph(0.11, [0, 0.06, 0], '#e2b878', [1.4, 0.7, 0.85], 8)
}
export function apple(k: Kit, color: string = C.red) {
  k.s.sph(0.05, [0, 0.05, 0], color, 1, 8)
}
export function cheese(k: Kit) {
  k.s.cyl(0.09, 0.09, 0.07, [0, 0.035, 0], '#f2d36b', 8)
}

/** 带拱顶的窗：glass 为发光批（夜晚点亮）。面朝 +z。 */
export function archWindow(k: Kit, w: number, h: number, glass: Kit['g'] = k.g) {
  glass.box(w, h, 0.03, [0, 0, 0.005], C.glass, [0, 0, 0], 0)
  glass.add(new THREE.CircleGeometry(w / 2, 14, 0, PI), C.glass, [0, h / 2, 0.006], [0, 0, 0], 1, 0, true)
  const t = 0.06
  k.s.box(t, h + 0.04, 0.05, [-w / 2 - t / 2 + 0.01, 0, 0.02], C.woodD)
  k.s.box(t, h + 0.04, 0.05, [w / 2 + t / 2 - 0.01, 0, 0.02], C.woodD)
  k.s.box(w, t, 0.05, [0, -h / 2 + 0.01, 0.02], C.woodD)
  k.s.box(t * 0.7, h + w / 2, 0.045, [0, w / 4, 0.02], C.woodD)
  k.s.box(w, t * 0.7, 0.045, [0, h * 0.1, 0.02], C.woodD)
  k.s.tor(w / 2 + 0.03, 0.03, [0, h / 2, 0.02], C.stoneD, [0, 0, 0], 14)
  k.s.box(w + 0.26, 0.07, 0.16, [0, -h / 2 - 0.04, 0.07], C.stoneL)
}

export function archDoor(k: Kit, w: number, h: number) {
  k.s.box(w, h, 0.07, [0, h / 2, 0], C.woodD)
  k.s.add(new THREE.CircleGeometry(w / 2, 14, 0, PI), C.woodD, [0, h, 0.036], [0, 0, 0], 1, 0.05, true)
  for (let i = -2; i <= 2; i++) k.s.box(0.02, h, 0.02, [i * (w / 5), h / 2, 0.045], C.wood)
  k.s.box(w, 0.06, 0.03, [0, h * 0.3, 0.05], C.iron)
  k.s.box(w, 0.06, 0.03, [0, h * 0.75, 0.05], C.iron)
  k.s.sph(0.045, [w * 0.3, h * 0.5, 0.07], C.brass)
  k.s.tor(w / 2 + 0.05, 0.05, [0, h, 0.02], C.stoneD, [0, 0, 0], 14)
  k.s.box(0.1, h, 0.12, [-w / 2 - 0.05, h / 2, 0.03], C.stoneD)
  k.s.box(0.1, h, 0.12, [w / 2 + 0.05, h / 2, 0.03], C.stoneD)
}

export function quill(k: Kit) {
  k.s.cyl(0.04, 0.04, 0.07, [0, 0.035, 0], C.shadow, 6)
  k.s.rod([0, 0.07, 0], [0.08, 0.3, 0.02], 0.007, C.white, 4)
}

export function scrolls(k: Kit) {
  k.s.cyl(0.03, 0.03, 0.3, [0, 0.03, 0], C.cream, 6, [0, 0.3, PI / 2])
  k.s.cyl(0.03, 0.03, 0.26, [0.02, 0.07, 0.05], '#efe2c0', 6, [0, -0.2, PI / 2])
  k.s.box(0.3, 0.01, 0.22, [0, 0.005, 0.14], C.cream, [0, 0.1, 0])
}

export function anvil(k: Kit) {
  k.s.box(0.3, 0.4, 0.3, [0, 0.2, 0], C.woodD)
  k.s.box(0.55, 0.14, 0.2, [0, 0.47, 0], C.iron)
  k.s.cone(0.1, 0.24, [0.37, 0.47, 0], C.iron, 4, [0, 0, -PI / 2])
  k.s.box(0.3, 0.06, 0.24, [0, 0.4, 0], C.iron)
}

export function forge(k: Kit) {
  k.s.box(1.1, 0.7, 0.8, [0, 0.35, 0], C.stoneD)
  k.s.box(0.8, 0.12, 0.55, [0, 0.74, 0.04], '#3d3338')
  k.g.box(0.7, 0.05, 0.46, [0, 0.78, 0.04], '#ff9d5c')
  k.g.cone(0.1, 0.22, [0.1, 0.9, 0.04], '#ffb347', 6)
  k.g.cone(0.07, 0.18, [-0.15, 0.88, 0.0], '#ffd980', 6)
  k.s.box(0.6, 1.9, 0.45, [0, 1.65, -0.15], C.stoneD)
  k.s.box(0.7, 0.1, 0.55, [0, 2.65, -0.15], C.stone)
  k.s.cone(0.25, 0.36, [0.7, 0.4, 0.1], C.wood, 4, [0, PI / 4, -PI / 2], [1, 1, 0.6])
}

export function well(k: Kit) {
  k.s.cyl(0.62, 0.66, 0.7, [0, 0.35, 0], C.stoneD, 14)
  k.s.tor(0.63, 0.06, [0, 0.7, 0], C.stoneL, [PI / 2, 0, 0], 14)
  k.s.cyl(0.52, 0.52, 0.02, [0, 0.62, 0], '#6fb3c4', 14)
  for (const sx of [-1, 1]) k.s.box(0.08, 1.4, 0.08, [sx * 0.62, 1.1, 0], C.woodD)
  k.s.cyl(0.05, 0.05, 1.3, [0, 1.7, 0], C.wood, 6, [0, 0, PI / 2])
  k.s.gable(1.6, 1.3, 0.55, [0, 1.8, 0], C.roofBlue, PI / 2)
  k.s.cyl(0.09, 0.09, 0.14, [0.12, 1.12, 0], C.woodD, 8)
  k.s.rod([0.12, 1.65, 0], [0.12, 1.12, 0], 0.01, C.cream, 4)
}

export function fountain(k: Kit) {
  k.s.cyl(1.2, 1.3, 0.34, [0, 0.17, 0], C.stoneL, 20)
  k.s.cyl(1.04, 1.04, 0.02, [0, 0.3, 0], '#8ad1d4', 20)
  k.s.cyl(0.2, 0.3, 0.9, [0, 0.65, 0], C.stone, 12)
  k.s.cyl(0.62, 0.3, 0.14, [0, 1.05, 0], C.stoneL, 16)
  k.s.cyl(0.52, 0.52, 0.02, [0, 1.11, 0], '#8ad1d4', 16)
  k.s.cyl(0.07, 0.1, 0.4, [0, 1.3, 0], C.stone, 8)
  k.s.sph(0.1, [0, 1.52, 0], '#bfeaee', [1, 1.3, 1], 8)
}

export function roseDome(k: Kit) {
  k.s.cyl(0.38, 0.44, 0.14, [0, 0.07, 0], C.stoneL, 14)
  k.s.cyl(0.05, 0.06, 0.34, [0, 0.31, 0], '#6fa46f', 6)
  for (const [x, y, z] of [
    [0, 0.52, 0],
    [0.05, 0.46, 0.04],
    [-0.04, 0.48, -0.03],
  ] as const)
    k.s.sph(0.07, [x, y, z], '#e0555f', 1, 8)
  k.s.cone(0.1, 0.05, [0.12, 0.28, 0], C.leaf, 4, [0, 0, -1.2], [1, 0.4, 1])
  k.s.cone(0.1, 0.05, [-0.12, 0.24, 0], C.leaf, 4, [0, 0, 1.2], [1, 0.4, 1])
}

/** 玻璃罩单独作为半透明网格返回 */
export function glassDome(mat: THREE.Material) {
  const g = new THREE.SphereGeometry(0.4, 20, 14, 0, Math.PI * 2, 0, Math.PI / 2)
  const m = new THREE.Mesh(g, mat)
  m.position.y = 0.14
  m.scale.set(1, 1.25, 1)
  return m
}

/** 双坡屋顶：两块带厚度的屋面板 + 屋脊，屋脊沿 z 轴；山墙三角另用 gable 填充 */
export function roofSlabs(k: Kit, w: number, d: number, h: number, base: [number, number, number], color: string, overhang = 0.3, ridge: string = C.roofBlueD) {
  const halfW = w / 2 + overhang
  const slope = h / (w / 2)
  const eaveY = -overhang * slope
  const rise = h - eaveY
  const len = Math.hypot(halfW, rise)
  const ang = Math.atan2(rise, halfW)
  for (const sx of [-1, 1]) {
    k.s.box(len, 0.13, d + overhang * 2, [base[0] + (sx * halfW) / 2, base[1] + (eaveY + h) / 2, base[2]], color, [0, 0, -sx * ang])
  }
  k.s.box(0.2, 0.14, d + overhang * 2 + 0.04, [base[0], base[1] + h + 0.03, base[2]], ridge)
}

export function stairFlight(k: Kit, dir: 1 | -1, y0: number, rise: number, length: number, width: number, color: string, steps = 11) {
  const run = length / steps
  const sr = rise / steps
  for (let i = 0; i < steps; i++) {
    const z = dir === 1 ? length / 2 - run * (i + 0.5) : -length / 2 + run * (i + 0.5)
    const hgt = sr * (i + 1)
    k.s.box(width, hgt, run, [0, y0 + hgt / 2, z], i % 2 === 0 ? color : C.stoneL)
  }
}
