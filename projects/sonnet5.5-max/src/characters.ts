import * as THREE from 'three'
import { Kit, type Batch, type V3 } from './batch'
import { C } from './palette'
import { heightAt } from './terrain'
import { mulberry32 } from './noise'
import { keepAt, courtAt, floorTop, type Built } from './buildings'
import { CASTLE, KEEP, LAKE, MEADOW, FARM, VILLAGE, CAVE, MILL, ORCHARD, MOUNTAIN, onIsland } from './layout'
import type { Materials } from './materials'

const PI = Math.PI

interface PersonSpec {
  top: string
  bottom?: string
  skin?: string
  hair?: string
  hairStyle?: 'short' | 'long' | 'bun' | 'bald' | 'spiky'
  hat?: 'crown' | 'helmet' | 'cook' | 'straw' | 'cap' | 'hood' | 'pointed' | 'none'
  hatColor?: string
  robe?: boolean
  trim?: string
  scarf?: string
  cape?: string
  apron?: string
  beard?: string
  scale?: number
  hold?: 'sword' | 'spear' | 'staff' | 'ladle' | 'book' | 'hammer' | 'rod' | 'basket' | 'lute' | 'sack' | 'apple' | 'wheat' | 'plate'
  sit?: boolean
  wave?: boolean
}

function holdItem(B: Batch, kind: NonNullable<PersonSpec['hold']>) {
  switch (kind) {
    case 'sword':
      B.box(0.035, 0.55, 0.012, [0.27, 0.62, 0.1], C.steel, [0, 0, 0], 0)
      B.box(0.16, 0.035, 0.04, [0.27, 0.34, 0.1], C.gold, [0, 0, 0], 0)
      break
    case 'spear':
      B.rod([0.27, 0.0, 0.08], [0.27, 1.45, 0.08], 0.018, C.woodD)
      B.cone(0.045, 0.22, [0.27, 1.55, 0.08], C.steel, 6)
      break
    case 'staff':
      B.rod([0.27, 0.0, 0.08], [0.27, 1.3, 0.08], 0.022, C.woodD)
      B.sph(0.06, [0.27, 1.34, 0.08], C.glass, 1, 8)
      break
    case 'ladle':
      B.rod([0.25, 0.4, 0.12], [0.3, 0.75, 0.3], 0.015, C.woodD)
      B.sph(0.05, [0.3, 0.76, 0.31], C.iron, 1, 6)
      break
    case 'book':
      B.box(0.16, 0.03, 0.2, [0.12, 0.55, 0.17], C.red, [0.4, 0, 0], 0)
      break
    case 'hammer':
      B.rod([0.25, 0.4, 0.1], [0.33, 0.82, 0.2], 0.02, C.woodD)
      B.box(0.14, 0.09, 0.09, [0.33, 0.86, 0.2], C.iron, [0, 0, 0], 0)
      break
    case 'rod':
      B.rod([0.22, 0.5, 0.15], [0.75, 1.15, 0.9], 0.012, C.woodD)
      B.rod([0.75, 1.15, 0.9], [0.8, 0.0, 1.05], 0.004, C.cream)
      break
    case 'basket':
      B.cyl(0.11, 0.08, 0.1, [0.28, 0.4, 0.1], C.woodL, 8)
      B.sph(0.05, [0.26, 0.47, 0.1], C.red, 1, 6)
      B.sph(0.05, [0.31, 0.47, 0.12], C.gold, 1, 6)
      break
    case 'lute':
      B.sph(0.11, [0.1, 0.5, 0.2], C.wood, [1, 1.25, 0.6], 8)
      B.rod([0.1, 0.55, 0.2], [0.23, 0.92, 0.2], 0.018, C.woodD)
      break
    case 'sack':
      B.sph(0.16, [0.0, 0.6, -0.2], C.cream, [1, 1.2, 0.9], 8)
      break
    case 'apple':
      B.sph(0.04, [0.26, 0.44, 0.12], C.red, 1, 6)
      break
    case 'wheat':
      B.rod([0.25, 0.3, 0.1], [0.3, 0.95, 0.1], 0.012, C.leafL)
      B.cone(0.04, 0.2, [0.3, 1.02, 0.1], C.gold, 5)
      break
    case 'plate':
      B.cyl(0.1, 0.1, 0.02, [0.22, 0.55, 0.22], C.white, 10)
      B.sph(0.04, [0.22, 0.6, 0.22], C.red, 1, 6)
      break
  }
}

function person(mats: Materials, s: PersonSpec) {
  const k = new Kit()
  const B = k.s
  const skin = s.skin ?? C.skin
  const bottom = s.bottom ?? C.ink
  const hair = s.hair ?? C.hairBrown
  const sleeve = s.top

  if (s.robe) {
    B.cyl(0.15, 0.27, 0.52, [0, 0.27, 0], s.top, 12)
    B.cyl(0.275, 0.275, 0.04, [0, 0.03, 0], s.trim ?? C.gold, 12, [0, 0, 0], 1, 0)
  } else if (s.sit) {
    for (const sx of [-1, 1]) {
      B.rod([sx * 0.07, 0.46, 0], [sx * 0.07, 0.46, 0.3], 0.05, bottom)
      B.rod([sx * 0.07, 0.46, 0.3], [sx * 0.07, 0.04, 0.33], 0.045, bottom)
      B.box(0.11, 0.06, 0.17, [sx * 0.07, 0.03, 0.38], C.woodD)
    }
  } else {
    for (const sx of [-1, 1]) {
      B.cyl(0.05, 0.045, 0.4, [sx * 0.07, 0.22, 0], bottom, 7)
      B.box(0.11, 0.06, 0.17, [sx * 0.07, 0.03, 0.03], C.woodD)
    }
  }
  B.cyl(0.13, 0.17, 0.44, [0, 0.64, 0], s.top, 10)
  B.cyl(0.172, 0.172, 0.04, [0, 0.45, 0], s.trim ?? C.woodD, 10, [0, 0, 0], 1, 0)
  B.cyl(0.04, 0.045, 0.06, [0, 0.88, 0], skin, 6)
  B.sph(0.15, [0, 1.0, 0], skin, 1, 12)
  for (const sx of [-1, 1]) {
    B.sph(0.02, [sx * 0.058, 1.01, 0.138], C.ink, 1, 6, 0)
    B.sph(0.026, [sx * 0.095, 0.96, 0.122], '#f2a3a0', [1, 0.6, 0.3], 6, 0)
  }
  B.sph(0.016, [0, 0.975, 0.147], C.skinD, 1, 6, 0)

  const hs = s.hairStyle ?? 'short'
  if (hs === 'short' || hs === 'bun' || hs === 'long') B.sph(0.158, [0, 1.04, -0.02], hair, [1, 0.82, 1.03], 10)
  if (hs === 'long') B.sph(0.16, [0, 0.9, -0.07], hair, [1, 1.45, 0.85], 8)
  if (hs === 'bun') B.sph(0.07, [0, 1.2, -0.06], hair, 1, 8)
  if (hs === 'spiky') {
    B.sph(0.154, [0, 1.04, -0.02], hair, [1, 0.78, 1.03], 10)
    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * PI * 2
      const dx = Math.sin(a)
      const dz = Math.cos(a)
      B.cone(0.05, 0.17, [dx * 0.1, 1.15, dz * 0.1 - 0.02], hair, 5, [dz * 0.7, 0, -dx * 0.7])
    }
    B.cone(0.055, 0.2, [0, 1.2, 0], hair, 5)
  }
  if (s.beard) B.cone(0.11, 0.26, [0, 0.84, 0.09], s.beard, 7, [PI + 0.15, 0, 0])

  const hc = s.hatColor ?? C.red
  switch (s.hat) {
    case 'crown':
      B.cyl(0.14, 0.15, 0.09, [0, 1.17, 0], C.gold, 10)
      for (let i = 0; i < 5; i++) B.cone(0.035, 0.08, [Math.sin((i / 5) * PI * 2) * 0.13, 1.25, Math.cos((i / 5) * PI * 2) * 0.13], C.gold, 4)
      B.sph(0.03, [0, 1.17, 0.15], C.red, 1, 6)
      break
    case 'helmet':
      B.sph(0.17, [0, 1.03, 0], C.steel, [1, 0.95, 1], 10)
      B.box(0.2, 0.04, 0.06, [0, 0.99, 0.15], C.ironL, [0, 0, 0], 0)
      B.cone(0.05, 0.3, [0, 1.3, -0.04], hc, 6, [-0.3, 0, 0])
      break
    case 'cook':
      B.cyl(0.14, 0.14, 0.12, [0, 1.17, 0], C.white, 10)
      B.sph(0.17, [0, 1.3, 0], C.white, [1, 0.8, 1], 10)
      break
    case 'straw':
      B.cone(0.33, 0.13, [0, 1.13, 0], C.sand, 14)
      B.cyl(0.13, 0.15, 0.1, [0, 1.19, 0], C.sand, 10)
      B.cyl(0.152, 0.152, 0.03, [0, 1.15, 0], hc, 10, [0, 0, 0], 1, 0)
      break
    case 'cap':
      B.sph(0.16, [0, 1.1, 0], hc, [1, 0.55, 1.05], 10)
      B.box(0.18, 0.02, 0.1, [0, 1.07, 0.15], hc, [0.1, 0, 0], 0)
      break
    case 'hood':
      B.sph(0.19, [0, 1.0, -0.03], s.top, [1, 1.05, 1.0], 10)
      break
    case 'pointed':
      B.cone(0.17, 0.5, [0, 1.33, 0], hc, 10, [0.1, 0, 0])
      B.cyl(0.23, 0.23, 0.03, [0, 1.11, 0], hc, 12, [0, 0, 0], 1, 0)
      B.sph(0.035, [0.03, 1.4, 0.1], C.gold, 1, 6, 0)
      break
  }
  if (s.scarf) {
    B.tor(0.1, 0.04, [0, 0.85, 0], s.scarf, [PI / 2, 0, 0], 10, 0)
    B.rod([0.08, 0.82, 0.1], [0.2, 0.5, -0.24], 0.034, s.scarf)
    B.rod([0.2, 0.5, -0.24], [0.26, 0.2, -0.45], 0.03, s.scarf)
  }
  if (s.cape) B.box(0.36, 0.56, 0.04, [0, 0.62, -0.17], s.cape, [0.12, 0, 0])
  if (s.apron) B.box(0.26, 0.38, 0.03, [0, 0.52, 0.16], s.apron, [0, 0, 0], 0)

  B.cyl(0.04, 0.036, 0.34, [-0.19, 0.64, 0.0], sleeve, 7, [0, 0, 0.2])
  B.sph(0.04, [-0.235, 0.46, 0.0], skin, 1, 6)
  if (!s.wave) {
    B.cyl(0.04, 0.036, 0.34, [0.19, 0.64, 0.0], sleeve, 7, [0, 0, -0.2])
    B.sph(0.04, [0.235, 0.46, 0.0], skin, 1, 6)
  }
  if (s.hold) holdItem(B, s.hold)

  const group = new THREE.Group()
  const body = k.s.build(mats.toon)
  if (body) group.add(body)
  let arm: THREE.Group | null = null
  if (s.wave) {
    const ak = new Kit()
    ak.s.cyl(0.04, 0.036, 0.34, [0, -0.15, 0], sleeve, 7)
    ak.s.sph(0.045, [0, -0.33, 0], skin, 1, 6)
    const am = ak.s.build(mats.toon)
    arm = new THREE.Group()
    arm.position.set(0.17, 0.8, 0)
    if (am) arm.add(am)
    group.add(arm)
  }
  group.scale.setScalar(s.scale ?? 1)
  return { group, arm }
}

/* ---------------- 动物 ---------------- */
function sheep(mats: Materials) {
  const k = new Kit()
  const B = k.s
  B.sph(0.22, [0, 0.3, 0], C.white, [1.15, 0.9, 1.35], 9)
  for (const [x, y, z] of [[0.14, 0.42, 0.1], [-0.14, 0.42, 0.0], [0.1, 0.4, -0.2], [-0.1, 0.44, 0.2], [0, 0.5, -0.05]] as const) B.sph(0.12, [x, y, z], C.cream, 1, 7)
  for (const [x, z] of [[-0.1, 0.16], [0.1, 0.16], [-0.1, -0.16], [0.1, -0.16]] as const) B.cyl(0.02, 0.02, 0.18, [x, 0.09, z], C.ink, 5, [0, 0, 0], 1, 0)
  const head = new Kit()
  head.s.sph(0.1, [0, 0, 0], '#4a4a5c', [0.9, 1, 1.1], 8, 0)
  head.s.sph(0.03, [-0.05, 0.03, 0.08], C.white, 1, 5, 0)
  head.s.sph(0.03, [0.05, 0.03, 0.08], C.white, 1, 5, 0)
  head.s.sph(0.012, [-0.05, 0.03, 0.1], C.ink, 1, 4, 0)
  head.s.sph(0.012, [0.05, 0.03, 0.1], C.ink, 1, 4, 0)
  head.s.sph(0.05, [-0.11, 0.02, 0], '#4a4a5c', [1, 0.5, 0.6], 5, 0)
  head.s.sph(0.05, [0.11, 0.02, 0], '#4a4a5c', [1, 0.5, 0.6], 5, 0)
  const g = new THREE.Group()
  const body = B.build(mats.toon)
  if (body) g.add(body)
  const hm = head.s.build(mats.toon)
  const pivot = new THREE.Group()
  pivot.position.set(0, 0.36, 0.28)
  if (hm) pivot.add(hm)
  g.add(pivot)
  return { group: g, head: pivot }
}

function fox(mats: Materials) {
  const k = new Kit()
  const B = k.s
  const orange = '#e59b5b'
  B.sph(0.16, [0, 0.22, 0], orange, [0.8, 0.8, 1.5], 9)
  B.sph(0.1, [0, 0.33, 0.22], orange, 1, 9)
  B.cone(0.05, 0.14, [-0.06, 0.45, 0.2], orange, 4)
  B.cone(0.05, 0.14, [0.06, 0.45, 0.2], orange, 4)
  B.cone(0.05, 0.12, [0, 0.31, 0.33], C.cream, 5, [PI / 2, 0, 0])
  B.sph(0.02, [0, 0.31, 0.38], C.ink, 1, 5, 0)
  B.sph(0.014, [-0.04, 0.36, 0.3], C.ink, 1, 5, 0)
  B.sph(0.014, [0.04, 0.36, 0.3], C.ink, 1, 5, 0)
  B.sph(0.09, [0, 0.14, 0.2], C.cream, [0.8, 1, 0.5], 7)
  for (const [x, z] of [[-0.06, 0.12], [0.06, 0.12], [-0.06, -0.12], [0.06, -0.12]] as const) B.cyl(0.025, 0.02, 0.16, [x, 0.08, z], '#8a5a3c', 5, [0, 0, 0], 1, 0)
  const tail = new Kit()
  tail.s.sph(0.1, [0, 0, -0.14], orange, [0.8, 0.8, 1.9], 8)
  tail.s.sph(0.07, [0, 0, -0.34], C.white, [0.9, 0.9, 1.2], 7)
  const g = new THREE.Group()
  const body = B.build(mats.toon)
  if (body) g.add(body)
  const tm = tail.s.build(mats.toon)
  const pivot = new THREE.Group()
  pivot.position.set(0, 0.24, -0.2)
  if (tm) pivot.add(tm)
  g.add(pivot)
  g.scale.setScalar(1.35)
  return { group: g, tail: pivot }
}

function cat(mats: Materials) {
  const k = new Kit()
  const B = k.s
  const col = '#c9b49c'
  B.sph(0.1, [0, 0.12, 0], col, [0.9, 0.9, 1.4], 8)
  B.sph(0.075, [0, 0.21, 0.13], col, 1, 8)
  B.cone(0.03, 0.06, [-0.04, 0.28, 0.13], col, 4)
  B.cone(0.03, 0.06, [0.04, 0.28, 0.13], col, 4)
  B.sph(0.01, [-0.03, 0.22, 0.2], C.ink, 1, 4, 0)
  B.sph(0.01, [0.03, 0.22, 0.2], C.ink, 1, 4, 0)
  B.rod([0, 0.14, -0.14], [0, 0.32, -0.2], 0.016, col)
  const g = new THREE.Group()
  const m = B.build(mats.toon)
  if (m) g.add(m)
  g.scale.setScalar(1.3)
  return g
}

function horse(mats: Materials) {
  const k = new Kit()
  const B = k.s
  const col = '#d9b48c'
  B.sph(0.3, [0, 0.8, 0], col, [0.9, 0.9, 1.7], 10)
  B.rod([0, 0.95, 0.38], [0, 1.4, 0.62], 0.14, col, 8)
  B.sph(0.14, [0, 1.46, 0.72], col, [0.9, 0.95, 1.5], 8)
  B.sph(0.03, [-0.08, 1.52, 0.78], C.ink, 1, 5, 0)
  B.sph(0.03, [0.08, 1.52, 0.78], C.ink, 1, 5, 0)
  B.cone(0.035, 0.1, [-0.06, 1.62, 0.6], col, 4)
  B.cone(0.035, 0.1, [0.06, 1.62, 0.6], col, 4)
  B.box(0.07, 0.4, 0.4, [0, 1.35, 0.55], C.woodD, [0.4, 0, 0])
  B.rod([0, 0.95, -0.45], [0, 0.45, -0.62], 0.05, C.woodD, 6)
  for (const [x, z] of [[-0.14, 0.38], [0.14, 0.38], [-0.14, -0.38], [0.14, -0.38]] as const) {
    B.cyl(0.055, 0.04, 0.62, [x, 0.34, z], col, 6, [0, 0, 0], 1, 0)
    B.cyl(0.05, 0.05, 0.06, [x, 0.03, z], C.woodD, 6, [0, 0, 0], 1, 0)
  }
  B.box(0.5, 0.06, 0.5, [0, 1.1, -0.02], C.red)
  const g = new THREE.Group()
  const m = B.build(mats.toon)
  if (m) g.add(m)
  g.scale.setScalar(0.85)
  return g
}

function dragon(mats: Materials) {
  const k = new Kit()
  const B = k.s
  const body = '#9fd3b5'
  const belly = C.cream
  B.sph(0.7, [0, 0.62, 0], body, [1.1, 0.9, 1.3], 12)
  B.sph(0.5, [0, 0.45, 0.2], belly, [1, 0.75, 0.9], 10)
  B.sph(0.42, [0.2, 0.8, 0.9], body, [1, 0.95, 1.1], 10)
  B.sph(0.07, [0.02, 0.95, 1.22], C.ink, 1, 6, 0)
  B.sph(0.07, [0.38, 0.95, 1.22], C.ink, 1, 6, 0)
  B.sph(0.1, [-0.02, 0.76, 1.23], '#f2a3a0', [1, 0.6, 0.4], 6, 0)
  B.cone(0.1, 0.34, [0.0, 1.26, 0.85], C.gold, 5, [0.2, 0, 0.2])
  B.cone(0.1, 0.34, [0.42, 1.26, 0.85], C.gold, 5, [0.2, 0, -0.2])
  for (let i = 0; i < 5; i++) B.cone(0.09, 0.2, [0, 1.1 - i * 0.09, -0.1 - i * 0.2], C.gold, 4, [-0.4, 0, 0])
  for (let i = 0; i < 7; i++) B.sph(0.34 - i * 0.04, [0.4 * Math.sin(i * 0.5) + 0.6, 0.3, -0.6 - i * 0.28], body, 1, 8)
  B.cone(0.1, 0.28, [-0.55, 0.4, 0.3], C.gold, 4, [0, 0, 1.3])
  const wing = new Kit()
  wing.s.box(0.04, 0.5, 0.5, [0, 0.3, 0], C.pink, [0, 0, 0.0], 0)
  wing.s.cone(0.4, 0.8, [0, 0.3, 0], C.pink, 3, [0, 0, 0], [0.12, 1, 1.2], 0)
  const g = new THREE.Group()
  const m = B.build(mats.toon)
  if (m) g.add(m)
  const wm = wing.s.build(mats.toon)
  const wings: THREE.Group[] = []
  for (const sx of [-1, 1]) {
    const p = new THREE.Group()
    p.position.set(sx * 0.55, 0.95, -0.1)
    if (wm) {
      const c = wm.clone()
      p.add(c)
    }
    g.add(p)
    wings.push(p)
  }
  g.scale.setScalar(0.62)
  return { group: g, wings, body: m }
}

function duck(mats: Materials) {
  const k = new Kit()
  k.s.sph(0.1, [0, 0.06, 0], C.white, [0.9, 0.7, 1.3], 8)
  k.s.sph(0.06, [0, 0.16, 0.1], C.white, 1, 8)
  k.s.cone(0.025, 0.06, [0, 0.15, 0.17], '#f2a65a', 5, [PI / 2, 0, 0])
  const g = new THREE.Group()
  const m = k.s.build(mats.toon)
  if (m) g.add(m)
  g.scale.setScalar(1.4)
  return g
}

function chicken(mats: Materials, col: string) {
  const k = new Kit()
  k.s.sph(0.08, [0, 0.1, 0], col, [0.9, 1, 1.2], 8)
  k.s.sph(0.045, [0, 0.2, 0.07], col, 1, 8)
  k.s.cone(0.015, 0.04, [0, 0.19, 0.12], '#f2a65a', 4, [PI / 2, 0, 0])
  k.s.cone(0.02, 0.04, [0, 0.26, 0.07], C.red, 4)
  k.s.cone(0.04, 0.1, [0, 0.14, -0.1], col, 4, [-1.1, 0, 0])
  const g = new THREE.Group()
  const m = k.s.build(mats.toon)
  if (m) g.add(m)
  g.scale.setScalar(1.3)
  return g
}

/* ---------------- 布置所有角色 ---------------- */
export function populate(mats: Materials): Built {
  const root = new THREE.Group()
  const anims: Built['anims'] = []
  const rnd = mulberry32(99)
  type Mode = 'idle' | 'wave' | 'walk'
  interface Opts {
    ry?: number
    mode?: Mode
    to?: V3
    speed?: number
    ground?: boolean
  }
  const addPerson = (spec: PersonSpec, pos: V3, o: Opts = {}) => {
    const { group, arm } = person(mats, { ...spec, wave: o.mode === 'wave' })
    group.position.set(...pos)
    group.rotation.y = o.ry ?? 0
    root.add(group)
    const ph = rnd() * 6
    if (o.mode === 'walk' && o.to) {
      const a = new THREE.Vector3(...pos)
      const b = new THREE.Vector3(...o.to)
      const len = a.distanceTo(b)
      const sp = o.speed ?? 0.35
      anims.push((t) => {
        const cyc = ((t * sp) / len + ph) % 2
        const u = cyc > 1 ? 2 - cyc : cyc
        const fwd = cyc <= 1
        const x = a.x + (b.x - a.x) * u
        const z = a.z + (b.z - a.z) * u
        const y = o.ground ? heightAt(x, z) : a.y + (b.y - a.y) * u
        group.position.set(x, y + Math.abs(Math.sin(t * 6 + ph)) * 0.03, z)
        group.rotation.y = Math.atan2(b.x - a.x, b.z - a.z) + (fwd ? 0 : PI)
        group.rotation.z = Math.sin(t * 6 + ph) * 0.03
      })
    } else {
      anims.push((t) => {
        group.position.y = pos[1] + Math.sin(t * 1.8 + ph) * 0.01
        group.rotation.z = Math.sin(t * 1.1 + ph) * 0.015
        if (arm) arm.rotation.z = 2.55 + Math.sin(t * 6 + ph) * 0.35
      })
      if (arm) arm.rotation.z = 2.55
    }
    return group
  }
  const gy = (x: number, z: number): V3 => [x, heightAt(x, z), z]

  /* ---- 城堡内部 ---- */
  const y0 = floorTop(0)
  const y1 = floorTop(1)
  const y2 = floorTop(2)
  const y3 = 3 * KEEP.floor + 0.36
  addPerson({ top: C.red, bottom: C.redD, hat: 'crown', hair: C.hairGray, beard: C.hairGray, cape: C.white, trim: C.gold, sit: true, scale: 1.05 }, keepAt(3.2, y0 + 0.22 + 0.04, -2.2), { ry: 0 })
  addPerson({ top: C.pink, robe: true, trim: C.gold, hat: 'crown', hairStyle: 'long', hair: C.hairGold, scale: 0.98 }, keepAt(4.2, y0 + 0.22, -1.7), { ry: -0.3 })
  addPerson({ top: C.teal, hat: 'cap', hatColor: C.red, hold: 'lute', hair: C.hairDark }, keepAt(2.3, y0, 2.2), { ry: -0.5 })
  addPerson({ top: C.white, bottom: C.ink, apron: C.cream, hat: 'cook', hold: 'ladle', hair: C.hairBrown }, keepAt(-3.0, y0, -1.75), { ry: PI })
  addPerson({ top: C.white, bottom: C.ink, apron: C.cream, hat: 'cook', hairStyle: 'bald', beard: C.hairBrown, scale: 1.08 }, keepAt(-3.3, y0, 1.0), { ry: PI })
  addPerson({ top: C.mint, robe: true, apron: C.white, hat: 'cap', hatColor: C.white, hairStyle: 'bun', hold: 'plate', hair: C.hairBrown }, keepAt(-0.8, y0, 2.4), { mode: 'walk', to: keepAt(2.2, y0, 2.4), speed: 0.3 })
  addPerson({ top: C.lilac, robe: true, hat: 'pointed', hatColor: C.lilac, beard: C.hairGray, hair: C.hairGray, sit: true }, keepAt(-3.3, y1, 1.2), { ry: PI })
  addPerson({ top: C.teal, robe: true, hairStyle: 'bun', hold: 'book', hair: C.hairBrown, scale: 0.95 }, keepAt(-1.2, y1, 1.6), { ry: 0.6 })
  addPerson({ top: C.steel, bottom: C.ironL, hat: 'helmet', hatColor: C.red, sit: true, cape: C.red }, keepAt(2.7, y1, 0.3), { ry: PI / 2 })
  addPerson({ top: C.steel, bottom: C.ironL, hat: 'helmet', hatColor: C.teal, sit: true, cape: C.teal }, keepAt(4.1, y1, 0.3), { ry: -PI / 2 })
  addPerson({ top: C.pink, robe: true, trim: C.gold, hat: 'crown', hairStyle: 'long', hair: C.hairGold, hold: 'book', scale: 0.9 }, keepAt(1.5, y2, -1.8), { ry: PI })
  addPerson({ top: C.mint, bottom: C.tealD, hair: C.hairBrown, hold: 'book', scale: 0.78, hat: 'cap', hatColor: C.lilac }, keepAt(-3.2, y2, 2.2), { ry: 0.3 })
  addPerson({ top: C.lilac, robe: true, hat: 'pointed', hatColor: C.tealD, beard: C.hairGray, hair: C.hairGray, hold: 'staff' }, keepAt(-2.4, y3, 0.7), { ry: 0.5 })

  /* ---- 庭院与城墙 ---- */
  const hz = CASTLE.hz
  const hx = CASTLE.hx
  for (const sx of [-1, 1]) addPerson({ top: C.steel, bottom: C.ironL, hat: 'helmet', hatColor: sx < 0 ? C.red : C.teal, hold: 'spear', cape: C.red }, courtAt(sx * 1.6, 0, hz - 1.0), { ry: 0.1 * sx })
  addPerson({ top: C.steel, bottom: C.ironL, hat: 'helmet', hold: 'spear' }, courtAt(-hx, 3.0, -4), { mode: 'walk', to: courtAt(-hx, 3.0, 4.5), speed: 0.25 })
  addPerson({ top: C.steel, bottom: C.ironL, hat: 'helmet', hatColor: C.gold, hold: 'sword' }, courtAt(-6, 3.5, -hz), { mode: 'walk', to: courtAt(6, 3.5, -hz), speed: 0.3 })
  addPerson({ top: C.steel, bottom: C.ironL, hat: 'helmet', hatColor: C.teal, hold: 'spear' }, courtAt(hx, 3.0, 4), { mode: 'walk', to: courtAt(hx, 3.0, -4), speed: 0.22 })
  addPerson({ top: C.woodD, bottom: C.ink, apron: C.ink, hairStyle: 'bald', beard: C.hairDark, hold: 'hammer', scale: 1.1 }, courtAt(7.3, 0.1, -3.7), { ry: PI })
  addPerson({ top: C.mint, bottom: C.woodD, hat: 'cap', hatColor: C.gold, hold: 'apple', scale: 0.82 }, courtAt(6.3, 0, 3.6), { ry: PI / 2 })
  addPerson({ top: C.white, robe: true, trim: C.gold, hat: 'cap', hatColor: C.white, hairStyle: 'bald', beard: C.hairGray }, courtAt(-8.0, 0.15, 3.2), { ry: -PI / 2 })
  addPerson({ top: C.mint, robe: true, hairStyle: 'bun', hair: C.hairGray, sit: true, scale: 0.95 }, courtAt(-6.7, 0.15, 2.3), { ry: -PI / 2 })
  addPerson({ top: C.roofRose, robe: true, hairStyle: 'long', hair: C.hairBrown, sit: true, scale: 0.9 }, courtAt(-6.7, 0.15, 4.1), { ry: -PI / 2 })
  addPerson({ top: C.redD, bottom: C.ink, apron: C.cream, hat: 'cap', hatColor: C.red, hair: C.hairDark }, courtAt(-3.8, 0, 5.2), { ry: 0.15 })
  addPerson({ top: C.teal, bottom: C.ink, hairStyle: 'long', hair: C.hairGold, hold: 'basket', scale: 0.95 }, courtAt(-3.2, 0, 7.0), { ry: PI + 0.2 })
  addPerson({ top: C.gold, robe: true, apron: C.cream, hat: 'cap', hatColor: C.white, hairStyle: 'bun', hair: C.hairBrown }, courtAt(-6.0, 0, 5.5), { ry: 0.15 })
  addPerson({ top: C.steel, bottom: C.ironL, hat: 'helmet', hatColor: C.red, hold: 'sword', cape: C.red }, courtAt(4.2, 0, 4.9), { ry: 0.3 })
  addPerson({ top: C.lilac, bottom: C.ink, hair: C.hairGold, hold: 'sword', scale: 0.75, hat: 'cap', hatColor: C.teal }, courtAt(5.4, 0, 4.4), { ry: -0.2 })
  addPerson({ top: C.roofRose, robe: true, hairStyle: 'long', hair: C.hairBrown, scale: 0.7 }, courtAt(-1.6, 0, 3.3), { mode: 'wave', ry: 0.4 })
  addPerson({ top: C.mint, bottom: C.tealD, hair: C.hairBrown, scale: 0.7, hat: 'cap', hatColor: C.gold }, courtAt(1.6, 0, 3.0), { mode: 'walk', to: courtAt(1.6, 0, 5.8), speed: 0.4 })
  const horseG = horse(mats)
  horseG.position.set(...courtAt(8.0, 0.1, 3.6))
  horseG.rotation.y = -PI / 2
  root.add(horseG)
  const catG = cat(mats)
  catG.position.set(...courtAt(0.9, 0.34, 4.4))
  root.add(catG)

  /* ---- 小王子与狐狸（岛屿正面边缘） ---- */
  const pp = onIsland(70, 3.8)
  const pg = addPerson({ top: C.leaf, bottom: C.leafD, hair: C.hairGold, hairStyle: 'spiky', scarf: C.gold, cape: C.leaf, scale: 1.25 }, gy(pp[0], pp[1]), { mode: 'wave', ry: 0.25 })
  pg.position.y += 0
  const fp = onIsland(76, 3.6)
  const foxG = fox(mats)
  foxG.group.position.set(fp[0], heightAt(fp[0], fp[1]), fp[1])
  foxG.group.rotation.y = -0.9
  root.add(foxG.group)
  anims.push((t) => {
    foxG.tail.rotation.y = Math.sin(t * 2.4) * 0.5
  })

  /* ---- 村庄 ---- */
  const { x: vx, z: vz } = VILLAGE
  addPerson({ top: C.cream, bottom: C.ink, apron: C.white, hat: 'cap', hatColor: C.white, hair: C.hairBrown, hold: 'plate' }, gy(vx - 1.8, vz - 2.9), { ry: PI - 0.4 })
  addPerson({ top: C.woodL, bottom: C.woodD, hat: 'straw', hairStyle: 'bald', beard: C.hairGray, hold: 'staff', sit: true, scale: 0.95 }, [vx - 2.2, heightAt(vx - 2.2, vz + 2.4), vz + 2.4], { ry: 0.4 })
  addPerson({ top: C.red, robe: true, hairStyle: 'bun', hair: C.hairDark, hold: 'basket' }, gy(vx - 3.2, vz + 0.8), { mode: 'walk', to: gy(vx + 3.2, vz + 0.4), speed: 0.3, ground: true })
  addPerson({ top: C.teal, bottom: C.ink, hat: 'cap', hatColor: C.gold, hair: C.hairBrown, hold: 'sack' }, gy(vx + 3.4, vz + 1.6), { mode: 'walk', to: gy(vx - 2.0, vz + 1.8), speed: 0.28, ground: true })
  addPerson({ top: C.pink, robe: true, hairStyle: 'long', hair: C.hairGold, scale: 0.68 }, gy(vx + 1.3, vz + 0.9), { mode: 'wave', ry: -0.3 })
  addPerson({ top: C.mint, bottom: C.tealD, hair: C.hairDark, scale: 0.68 }, gy(vx + 0.3, vz + 1.2), { ry: 0.5 })
  addPerson({ top: C.woodL, bottom: C.woodD, hat: 'cap', hatColor: C.woodD, hold: 'sack', hair: C.hairBrown, scale: 1.05 }, gy(MILL.x + 2.4, MILL.z + 2.4), { mode: 'walk', to: gy(MILL.x + 5.0, MILL.z + 4.0), speed: 0.25, ground: true })

  /* ---- 农场 / 果园 ---- */
  addPerson({ top: C.teal, bottom: C.woodD, hat: 'straw', hatColor: C.red, hold: 'wheat', hair: C.hairBrown }, gy(FARM.x - 6, FARM.z + 1.5), { mode: 'walk', to: gy(FARM.x + 5, FARM.z + 1.5), speed: 0.22, ground: true })
  addPerson({ top: C.roofRose, robe: true, hat: 'straw', hatColor: C.pink, hold: 'basket', hairStyle: 'long', hair: C.hairBrown }, gy(ORCHARD.x + 2, ORCHARD.z + 1.8), { ry: -2.2 })
  for (let i = 0; i < 4; i++) {
    const cg = chicken(mats, i % 2 ? C.white : C.sand)
    const cxp = FARM.x + FARM.w / 2 + 1 + (i % 2) * 0.7
    const czp = FARM.z + 2.8 + Math.floor(i / 2) * 0.8
    cg.position.set(cxp, heightAt(cxp, czp), czp)
    cg.rotation.y = i * 1.7
    root.add(cg)
    anims.push((t) => {
      cg.rotation.x = Math.max(0, Math.sin(t * 3 + i * 2)) * 0.5
    })
  }

  /* ---- 牧场：牧羊人与羊群 ---- */
  addPerson({ top: C.mint, bottom: C.woodD, hat: 'straw', hatColor: C.teal, hold: 'staff', hairStyle: 'long', hair: C.hairBrown }, gy(MEADOW.x - 1.5, MEADOW.z - 0.5), { ry: 0.8 })
  for (let i = 0; i < 7; i++) {
    const s = sheep(mats)
    const cx = MEADOW.x + (rnd() - 0.5) * 8
    const cz = MEADOW.z + (rnd() - 0.5) * 6
    const r = 0.5 + rnd() * 1.2
    const sp = 0.1 + rnd() * 0.1
    const ph = rnd() * 6
    s.group.scale.setScalar(0.85 + rnd() * 0.3)
    root.add(s.group)
    anims.push((t) => {
      const a = t * sp + ph
      const x = cx + Math.cos(a) * r
      const z = cz + Math.sin(a) * r
      s.group.position.set(x, heightAt(x, z), z)
      s.group.rotation.y = -a + PI
      s.head.rotation.x = 0.35 + Math.sin(t * 1.2 + ph) * 0.3
    })
  }

  /* ---- 湖：渔夫与鸭子 ---- */
  const bx = LAKE.x - 1.6
  const bz = LAKE.z + 0.4
  addPerson({ top: C.roofBlue, bottom: C.woodD, hat: 'straw', hold: 'rod', hair: C.hairBrown, sit: true, scale: 0.9 }, [bx, LAKE.y + 0.22, bz], { ry: 0.9 })
  for (let i = 0; i < 3; i++) {
    const d = duck(mats)
    root.add(d)
    const r = 1.4 + i * 0.7
    anims.push((t) => {
      const a = t * (0.12 + i * 0.03) + i * 2
      d.position.set(LAKE.x + 1.8 + Math.cos(a) * r, LAKE.y + 0.04 + Math.sin(t * 2 + i) * 0.01, LAKE.z - 0.6 + Math.sin(a) * r * 0.6)
      d.rotation.y = -a + PI
    })
  }

  /* ---- 山：小龙与旅人 ---- */
  const dir = Math.atan2(CAVE.x - MOUNTAIN.x, CAVE.z - MOUNTAIN.z)
  const dx = CAVE.x + Math.sin(dir) * 2.6
  const dz = CAVE.z + Math.cos(dir) * 2.6
  const dr = dragon(mats)
  dr.group.position.set(dx, heightAt(dx, dz) + 0.05, dz)
  dr.group.rotation.y = dir + 0.5
  root.add(dr.group)
  anims.push((t) => {
    const s = 0.62 * (1 + Math.sin(t * 1.4) * 0.025)
    dr.group.scale.setScalar(s)
    dr.wings[0].rotation.z = -0.35 + Math.sin(t * 1.4) * 0.05
    dr.wings[1].rotation.z = 0.35 - Math.sin(t * 1.4) * 0.05
  })
  const hxk = CAVE.x + Math.sin(dir + 0.9) * 5.0
  const hzk = CAVE.z + Math.cos(dir + 0.9) * 5.0
  addPerson({ top: C.red, bottom: C.ink, hat: 'hood', hold: 'staff', cape: C.redD, hair: C.hairDark }, gy(hxk, hzk), { ry: dir + 0.9 + PI + 0.4 })

  return { group: root, anims }
}

void CASTLE
