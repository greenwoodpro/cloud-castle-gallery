import * as THREE from 'three'
import { noOutline, PALETTE, toon, unitGeo } from './core'
import type { Anchor } from './interior'
import { WALL_TOP } from './layout'
import { DESERT, heightAt, KNOLL } from './terrain'

interface FigureOptions {
  coat: string
  legs?: string
  skin?: string
  robe?: boolean
  robeRadius?: number
}

interface Figure {
  group: THREE.Group
  head: THREE.Group
  body: THREE.Mesh
  armL: THREE.Group
  armR: THREE.Group
  legL: THREE.Group | null
  legR: THREE.Group | null
}

function mesh(geo: THREE.BufferGeometry, material: THREE.Material, sx: number, sy: number, sz: number, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(geo, material)
  m.scale.set(sx, sy, sz)
  m.position.set(x, y, z)
  m.castShadow = true
  return m
}

const BODY_TOP = 0.86

function makeFigure(o: FigureOptions): Figure {
  const group = new THREE.Group()
  const skin = toon(o.skin ?? PALETTE.skin)
  const coat = toon(o.coat)
  let legL: THREE.Group | null = null
  let legR: THREE.Group | null = null

  if (!o.robe) {
    const legMat = toon(o.legs ?? PALETTE.woodDark)
    const makeLeg = (x: number) => {
      const pivot = new THREE.Group()
      pivot.position.set(x, 0.34, 0)
      pivot.add(mesh(unitGeo.cyl(1, 8), legMat, 0.075, 0.34, 0.075, 0, -0.34, 0))
      pivot.add(mesh(unitGeo.sphere(8, 6), legMat, 0.085, 0.06, 0.12, 0, -0.32, 0.03))
      group.add(pivot)
      return pivot
    }
    legL = makeLeg(-0.09)
    legR = makeLeg(0.09)
  }

  const body = o.robe
    ? mesh(unitGeo.cyl(0.42, 14), coat, o.robeRadius ?? 0.36, BODY_TOP, o.robeRadius ?? 0.36)
    : mesh(unitGeo.cyl(0.66, 14), coat, 0.26, BODY_TOP - 0.3, 0.26, 0, 0.3, 0)
  group.add(body)

  const makeArm = (x: number) => {
    const pivot = new THREE.Group()
    pivot.position.set(x, BODY_TOP - 0.06, 0)
    pivot.add(mesh(unitGeo.cyl(0.8, 8), coat, 0.06, 0.4, 0.06, 0, -0.4, 0))
    pivot.add(mesh(unitGeo.sphere(8, 6), skin, 0.06, 0.06, 0.06, 0, -0.43, 0))
    group.add(pivot)
    return pivot
  }
  const armL = makeArm(-0.2)
  const armR = makeArm(0.2)

  const head = new THREE.Group()
  head.position.set(0, BODY_TOP + 0.24, 0)
  head.add(mesh(unitGeo.sphere(16, 12), skin, 0.26, 0.25, 0.25))
  const eye = toon(PALETTE.ink, { outline: false })
  head.add(mesh(unitGeo.sphere(6, 5), eye, 0.025, 0.035, 0.02, -0.085, 0.02, 0.235))
  head.add(mesh(unitGeo.sphere(6, 5), eye, 0.025, 0.035, 0.02, 0.085, 0.02, 0.235))
  const blush = toon('#f2a9a0', { outline: false })
  head.add(mesh(unitGeo.sphere(6, 5), blush, 0.05, 0.03, 0.02, -0.15, -0.06, 0.2))
  head.add(mesh(unitGeo.sphere(6, 5), blush, 0.05, 0.03, 0.02, 0.15, -0.06, 0.2))
  head.add(mesh(unitGeo.sphere(6, 5), skin, 0.035, 0.03, 0.03, 0, -0.02, 0.255))
  group.add(head)

  return { group, head, body, armL, armR, legL, legR }
}

function place(group: THREE.Object3D, anchor: Anchor) {
  group.position.copy(anchor.position)
  group.rotation.y = anchor.rotation
}

function onGround(x: number, z: number, rotation: number): Anchor {
  return { position: new THREE.Vector3(x, heightAt(x, z) - 0.02, z), rotation }
}

export interface Character {
  id: string
  group: THREE.Object3D
  update: (time: number, night: number) => void
}

function littlePrince(): Character {
  const f = makeFigure({ coat: PALETTE.princeGreen, legs: '#5d8a5c' })
  f.body.scale.set(0.28, BODY_TOP - 0.12, 0.28)
  f.body.position.y = 0.12
  const gold = toon(PALETTE.gold)
  f.head.add(mesh(unitGeo.sphere(14, 10), gold, 0.27, 0.2, 0.27, 0, 0.08, -0.03))
  for (let i = 0; i < 9; i++) {
    const a = (i / 9) * Math.PI * 2
    const spike = mesh(unitGeo.cone(6), gold, 0.07, 0.2, 0.07, Math.cos(a) * 0.17, 0.14, Math.sin(a) * 0.17 - 0.03)
    spike.rotation.set(Math.sin(a) * 0.9, 0, -Math.cos(a) * 0.9)
    f.head.add(spike)
  }
  const scarfMat = toon('#f5c94f', { side: THREE.DoubleSide })
  const collar = mesh(unitGeo.torus(0.35, 16), scarfMat, 0.19, 0.19, 0.19, 0, BODY_TOP - 0.02, 0)
  collar.rotation.x = Math.PI / 2
  f.group.add(collar)
  const scarf = new THREE.Group()
  scarf.position.set(0.05, BODY_TOP - 0.02, -0.15)
  const tail1 = mesh(unitGeo.box(), scarfMat, 0.12, 0.03, 0.55, 0, 0, -0.27)
  const tail2 = mesh(unitGeo.box(), scarfMat, 0.1, 0.03, 0.45, 0.12, -0.02, -0.25)
  scarf.add(tail1, tail2)
  f.group.add(scarf)
  for (const sx of [-0.22, 0.22]) {
    f.group.add(mesh(unitGeo.sphere(8, 6), gold, 0.06, 0.03, 0.06, sx, BODY_TOP - 0.02, 0))
  }
  place(f.group, onGround(KNOLL.x - 0.5, KNOLL.z + 0.4, -Math.PI / 2 - 0.4))
  return {
    id: 'prince',
    group: f.group,
    update(t) {
      scarf.rotation.y = 0.5 + Math.sin(t * 2.2) * 0.35
      scarf.rotation.x = -0.25 + Math.sin(t * 3.1) * 0.12
      tail2.rotation.y = Math.sin(t * 2.7 + 1) * 0.3
      f.head.rotation.y = Math.sin(t * 0.4) * 0.35
      f.head.rotation.x = -0.12
      f.armR.rotation.z = 0.15 + Math.max(0, Math.sin(t * 0.5)) * 0.5
      f.armR.rotation.x = -Math.max(0, Math.sin(t * 0.5)) * 1.6
      f.armL.rotation.z = -0.12
    },
  }
}

function rose(): Character {
  const group = new THREE.Group()
  const stem = toon(PALETTE.leafDeep)
  group.add(mesh(unitGeo.cyl(1, 6), stem, 0.02, 0.42, 0.02))
  const leaf = mesh(unitGeo.sphere(8, 6), toon(PALETTE.leaf), 0.08, 0.02, 0.04, 0.06, 0.18, 0)
  leaf.rotation.z = 0.5
  group.add(leaf)
  const petals = toon('#d9534f')
  const bloom = new THREE.Group()
  bloom.position.y = 0.45
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2
    const p = mesh(unitGeo.sphere(8, 6), petals, 0.06, 0.08, 0.04, Math.cos(a) * 0.04, 0, Math.sin(a) * 0.04)
    p.rotation.y = -a
    p.rotation.z = 0.35
    bloom.add(p)
  }
  bloom.add(mesh(unitGeo.sphere(8, 6), toon('#c0413d'), 0.05, 0.07, 0.05, 0, 0.02, 0))
  group.add(bloom)
  const glass = noOutline(
    new THREE.MeshToonMaterial({ color: '#e6f4f8', transparent: true, opacity: 0.28, depthWrite: false }),
  )
  const dome = new THREE.Mesh(new THREE.SphereGeometry(0.3, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2), glass)
  dome.scale.set(1, 2.1, 1)
  group.add(dome)
  group.add(mesh(unitGeo.cyl(1, 16), toon(PALETTE.wood), 0.33, 0.04, 0.33))
  group.add(mesh(unitGeo.sphere(8, 6), toon('#e6f4f8'), 0.04, 0.04, 0.04, 0, 0.64, 0))
  place(group, onGround(KNOLL.x + 0.6, KNOLL.z - 0.4, 0))
  return {
    id: 'rose',
    group,
    update(t) {
      bloom.rotation.z = Math.sin(t * 1.3) * 0.06
    },
  }
}

function fox(): Character {
  const group = new THREE.Group()
  const fur = toon('#e08a4a')
  const white = toon(PALETTE.white)
  const dark = toon('#4a3a2f')
  group.add(mesh(unitGeo.sphere(12, 10), fur, 0.2, 0.22, 0.3, 0, 0.3, 0))
  group.add(mesh(unitGeo.sphere(10, 8), white, 0.13, 0.14, 0.1, 0, 0.32, 0.2))
  for (const [x, z] of [[-0.09, 0.15], [0.09, 0.15], [-0.09, -0.15], [0.09, -0.15]]) {
    group.add(mesh(unitGeo.cyl(1, 6), dark, 0.035, 0.2, 0.035, x, 0, z))
  }
  const head = new THREE.Group()
  head.position.set(0, 0.55, 0.25)
  head.add(mesh(unitGeo.sphere(12, 10), fur, 0.15, 0.14, 0.15))
  const snout = mesh(unitGeo.cone(8), white, 0.07, 0.16, 0.07, 0, -0.02, 0.12)
  snout.rotation.x = Math.PI / 2
  head.add(snout)
  head.add(mesh(unitGeo.sphere(6, 5), dark, 0.025, 0.025, 0.025, 0, -0.02, 0.29))
  for (const sx of [-0.08, 0.08]) {
    const ear = mesh(unitGeo.cone(5), fur, 0.05, 0.14, 0.04, sx, 0.1, -0.02)
    ear.rotation.z = -sx * 2
    head.add(ear)
    head.add(mesh(unitGeo.sphere(6, 5), dark, 0.018, 0.024, 0.015, sx * 0.75, 0.03, 0.135))
  }
  group.add(head)
  const tail = new THREE.Group()
  tail.position.set(0, 0.3, -0.27)
  const tailBody = mesh(unitGeo.sphere(10, 8), fur, 0.09, 0.09, 0.26, 0, 0.08, -0.22)
  tailBody.rotation.x = -0.6
  tail.add(tailBody)
  tail.add(mesh(unitGeo.sphere(8, 6), white, 0.065, 0.065, 0.08, 0, 0.22, -0.42))
  group.add(tail)
  place(group, onGround(-16.4, -11.2, 0.5))
  return {
    id: 'fox',
    group,
    update(t) {
      tail.rotation.y = Math.sin(t * 2.4) * 0.45
      head.rotation.y = Math.sin(t * 0.6) * 0.5
      head.rotation.z = Math.sin(t * 0.9) * 0.12
    },
  }
}

function king(anchor: Anchor): Character {
  const f = makeFigure({ coat: PALETTE.crimson, robe: true, robeRadius: 0.52 })
  const ermine = toon(PALETTE.white)
  const ring = mesh(unitGeo.torus(0.3, 18), ermine, 0.5, 0.5, 0.5, 0, 0.04, 0)
  ring.rotation.x = Math.PI / 2
  f.group.add(ring)
  const collar = mesh(unitGeo.torus(0.45, 16), ermine, 0.2, 0.2, 0.2, 0, BODY_TOP - 0.03, 0)
  collar.rotation.x = Math.PI / 2
  f.group.add(collar)
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2
    f.group.add(mesh(unitGeo.sphere(5, 4), toon(PALETTE.ink, { outline: false }), 0.02, 0.03, 0.02, Math.cos(a) * 0.52, 0.06, Math.sin(a) * 0.52))
  }
  const gold = toon(PALETTE.gold)
  f.head.add(mesh(unitGeo.cyl(1, 12), gold, 0.15, 0.1, 0.15, 0, 0.18, -0.01))
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2
    f.head.add(mesh(unitGeo.cone(4), gold, 0.035, 0.09, 0.035, Math.cos(a) * 0.14, 0.28, Math.sin(a) * 0.14))
  }
  const beard = mesh(unitGeo.cone(10), ermine, 0.17, 0.32, 0.12, 0, -0.08, 0.13)
  beard.rotation.x = Math.PI
  f.head.add(beard)
  f.head.add(mesh(unitGeo.sphere(8, 6), ermine, 0.12, 0.035, 0.05, 0, -0.07, 0.24))
  const scepter = new THREE.Group()
  scepter.add(mesh(unitGeo.cyl(1, 6), gold, 0.025, 0.6, 0.025, 0, -0.5, 0))
  scepter.add(mesh(unitGeo.sphere(8, 6), gold, 0.06, 0.06, 0.06, 0, 0.12, 0))
  scepter.position.set(0, -0.42, 0.04)
  f.armR.add(scepter)
  place(f.group, anchor)
  f.group.position.y -= 0.42
  f.group.scale.setScalar(1.05)
  return {
    id: 'king',
    group: f.group,
    update(t) {
      f.armR.rotation.x = -0.9 + Math.sin(t * 0.8) * 0.25
      f.armL.rotation.x = -0.5
      f.armL.rotation.z = -0.3 + Math.sin(t * 0.7) * 0.15
      f.head.rotation.y = Math.sin(t * 0.3) * 0.3
      f.head.rotation.x = -0.08
    },
  }
}

function princess(anchor: Anchor): Character {
  const f = makeFigure({ coat: '#e7a9a2', robe: true, robeRadius: 0.38 })
  const hair = toon('#8a5a3c')
  f.head.add(mesh(unitGeo.sphere(14, 10), hair, 0.27, 0.24, 0.27, 0, 0.05, -0.04))
  f.head.add(mesh(unitGeo.box(), hair, 0.4, 0.42, 0.12, 0, -0.38, -0.16))
  const tiara = mesh(unitGeo.torus(0.2, 14), toon(PALETTE.gold), 0.15, 0.15, 0.15, 0, 0.2, 0)
  tiara.rotation.x = Math.PI / 2 - 0.3
  f.head.add(tiara)
  const book = mesh(unitGeo.box(), toon(PALETTE.royal), 0.26, 0.04, 0.2, 0, -0.44, 0.12)
  f.armR.add(book)
  place(f.group, anchor)
  f.group.scale.setScalar(0.92)
  return {
    id: 'princess',
    group: f.group,
    update(t) {
      f.armR.rotation.x = -1.1
      f.armL.rotation.x = -1.0 + Math.sin(t * 0.9) * 0.15
      f.head.rotation.x = 0.35 + Math.sin(t * 0.5) * 0.05
      f.head.rotation.z = Math.sin(t * 0.4) * 0.08
    },
  }
}

function geographer(anchor: Anchor): Character {
  const f = makeFigure({ coat: '#7b6a8f', robe: true, robeRadius: 0.4 })
  const white = toon(PALETTE.white)
  const beard = mesh(unitGeo.cone(10), white, 0.2, 0.5, 0.14, 0, -0.08, 0.12)
  beard.rotation.x = Math.PI
  f.head.add(beard)
  for (const sx of [-0.2, 0.2]) f.head.add(mesh(unitGeo.sphere(8, 6), white, 0.09, 0.12, 0.12, sx, 0.02, -0.04))
  for (const sx of [-0.09, 0.09]) {
    const lens = mesh(unitGeo.torus(0.2, 12), toon(PALETTE.gold), 0.055, 0.055, 0.055, sx, 0.02, 0.25)
    f.head.add(lens)
  }
  const hat = mesh(unitGeo.cone(12), toon('#4f5d8a'), 0.24, 0.5, 0.24, 0, 0.12, -0.02)
  f.head.add(hat)
  const book = mesh(unitGeo.box(), toon('#c98a4b'), 0.3, 0.06, 0.22, 0, -0.44, 0.1)
  f.armL.add(book)
  place(f.group, anchor)
  return {
    id: 'geographer',
    group: f.group,
    update(t) {
      const look = Math.sin(t * 0.35)
      f.head.rotation.y = look * 0.7
      f.head.rotation.x = -0.15 - Math.max(0, look) * 0.25
      f.armL.rotation.x = -1.0
      f.armR.rotation.x = -0.6 + Math.sin(t * 1.4) * 0.3
      f.armR.rotation.z = 0.2
    },
  }
}

function knight(): Character {
  const f = makeFigure({ coat: '#9aa2b0', legs: '#7d8492' })
  const steel = toon('#b9c0cb')
  f.head.add(mesh(unitGeo.sphere(14, 10), steel, 0.285, 0.29, 0.285, 0, 0.03, 0))
  f.head.add(mesh(unitGeo.box(), toon('#3f3a3a', { outline: false }), 0.3, 0.035, 0.05, 0, 0.02, 0.27))
  f.head.add(mesh(unitGeo.sphere(10, 8), toon(PALETTE.crimson), 0.07, 0.16, 0.2, 0, 0.36, -0.04))
  const tabard = mesh(unitGeo.box(), toon(PALETTE.royal), 0.3, 0.45, 0.04, 0, 0.36, 0.2)
  f.group.add(tabard)
  f.group.add(mesh(unitGeo.box(), toon(PALETTE.gold), 0.1, 0.1, 0.045, 0, 0.6, 0.205))
  const shield = new THREE.Group()
  const disc = mesh(new THREE.CylinderGeometry(1, 1, 1, 14), toon(PALETTE.royal), 0.22, 0.04, 0.22)
  disc.rotation.z = Math.PI / 2
  shield.add(disc)
  const emblem = mesh(unitGeo.box(), toon(PALETTE.gold), 0.045, 0.2, 0.08)
  shield.add(emblem)
  shield.position.set(-0.06, -0.3, 0.05)
  f.armL.add(shield)
  const spear = new THREE.Group()
  spear.add(mesh(unitGeo.cyl(1, 6), toon(PALETTE.wood), 0.025, 2.0, 0.025, 0, -0.8, 0))
  spear.add(mesh(unitGeo.cone(6), steel, 0.06, 0.24, 0.06, 0, 1.2, 0))
  spear.position.set(0, -0.42, 0.05)
  f.armR.add(spear)

  const path = { x: 8.88, zMin: -5.6, zMax: 5.6 }
  f.group.position.set(path.x, WALL_TOP, 0)
  return {
    id: 'knight',
    group: f.group,
    update(t) {
      const span = path.zMax - path.zMin
      const cycle = (t * 0.55) % (span * 2)
      const forward = cycle < span
      const z = forward ? path.zMin + cycle : path.zMax - (cycle - span)
      f.group.position.z = z
      f.group.rotation.y = forward ? 0 : Math.PI
      const swing = Math.sin(t * 6)
      f.legL!.rotation.x = swing * 0.5
      f.legR!.rotation.x = -swing * 0.5
      f.armL.rotation.x = -0.6
      f.armR.rotation.x = -0.25 - swing * 0.08
      f.group.position.y = WALL_TOP + Math.abs(Math.sin(t * 6)) * 0.03
    },
  }
}

function cook(anchor: Anchor): Character {
  const f = makeFigure({ coat: '#f3ece0', legs: '#6d6a72' })
  const white = toon(PALETTE.white)
  f.head.add(mesh(unitGeo.cyl(1, 12), white, 0.18, 0.18, 0.18, 0, 0.15, 0))
  f.head.add(mesh(unitGeo.sphere(12, 8), white, 0.25, 0.14, 0.25, 0, 0.38, 0))
  f.group.add(mesh(unitGeo.box(), toon('#e8cfa0'), 0.34, 0.4, 0.05, 0, 0.32, 0.2))
  const ladle = new THREE.Group()
  ladle.add(mesh(unitGeo.cyl(1, 6), toon(PALETTE.woodDark), 0.02, 0.6, 0.02, 0, -0.6, 0))
  ladle.position.set(0, -0.42, 0.05)
  f.armR.add(ladle)
  place(f.group, anchor)
  return {
    id: 'cook',
    group: f.group,
    update(t) {
      f.armR.rotation.x = -1.0 + Math.sin(t * 3) * 0.2
      f.armR.rotation.z = Math.cos(t * 3) * 0.25
      f.armL.rotation.x = -0.3
      f.head.rotation.x = 0.2
      f.head.rotation.y = Math.sin(t * 0.8) * 0.2
    },
  }
}

function smith(anchor: Anchor): Character {
  const f = makeFigure({ coat: '#8a6a5a', legs: '#4a3a33' })
  f.group.add(mesh(unitGeo.box(), toon('#5b4030'), 0.36, 0.55, 0.05, 0, 0.26, 0.21))
  const beard = mesh(unitGeo.sphere(10, 8), toon('#5b3d2b'), 0.18, 0.13, 0.12, 0, -0.12, 0.14)
  f.head.add(beard)
  const hammer = new THREE.Group()
  hammer.add(mesh(unitGeo.cyl(1, 6), toon(PALETTE.wood), 0.025, 0.4, 0.025, 0, -0.32, 0.05))
  hammer.add(mesh(unitGeo.box(), toon('#6d6f78'), 0.2, 0.1, 0.1, 0, -0.35, 0.05))
  hammer.rotation.x = Math.PI / 2
  hammer.position.set(0, -0.42, 0)
  f.armR.add(hammer)
  place(f.group, anchor)
  return {
    id: 'smith',
    group: f.group,
    update(t) {
      const hit = Math.pow(Math.abs(Math.sin(t * 2.6)), 0.6)
      f.armR.rotation.x = -0.6 - hit * 1.6
      f.armL.rotation.x = -0.8
      f.head.rotation.x = 0.3
    },
  }
}

function monk(anchor: Anchor): Character {
  const f = makeFigure({ coat: '#8a6e55', robe: true, robeRadius: 0.36 })
  f.head.add(mesh(unitGeo.sphere(14, 10), toon('#7a604a'), 0.3, 0.3, 0.3, 0, 0.02, -0.06))
  const belt = mesh(unitGeo.torus(0.12, 14), toon(PALETTE.cream), 0.22, 0.22, 0.22, 0, 0.5, 0)
  belt.rotation.x = Math.PI / 2
  f.group.add(belt)
  place(f.group, anchor)
  return {
    id: 'monk',
    group: f.group,
    update(t) {
      const bow = (Math.sin(t * 0.5) + 1) / 2
      f.head.rotation.x = 0.1 + bow * 0.35
      f.armL.rotation.x = -1.1
      f.armR.rotation.x = -1.1
      f.armL.rotation.z = 0.45
      f.armR.rotation.z = -0.45
    },
  }
}

function lamplighter(): Character {
  const f = makeFigure({ coat: '#4f6a8f', legs: '#3d4a5f' })
  const cap = toon('#3d4a5f')
  f.head.add(mesh(unitGeo.cyl(1, 12), cap, 0.24, 0.1, 0.24, 0, 0.13, 0))
  f.head.add(mesh(unitGeo.box(), cap, 0.2, 0.025, 0.14, 0, 0.13, 0.22))
  f.head.add(mesh(unitGeo.sphere(8, 6), toon('#5b3d2b'), 0.13, 0.04, 0.05, 0, -0.08, 0.23))
  const pole = new THREE.Group()
  pole.add(mesh(unitGeo.cyl(1, 6), toon(PALETTE.wood), 0.018, 1.5, 0.018, 0, -0.3, 0))
  const wick = mesh(unitGeo.cone(6), noOutline(new THREE.MeshBasicMaterial({ color: '#ffc46b' })), 0.03, 0.08, 0.03, 0, 1.2, 0)
  pole.add(wick)
  pole.position.set(0, -0.42, 0.05)
  f.armR.add(pole)

  const lamp = new THREE.Group()
  const iron = toon('#4a4a52')
  lamp.add(mesh(unitGeo.cyl(0.7, 6), iron, 0.05, 1.9, 0.05))
  lamp.add(mesh(unitGeo.box(), iron, 0.4, 0.04, 0.04, 0.18, 1.88, 0))
  const glassMat = new THREE.MeshBasicMaterial({ color: '#6c7188' })
  noOutline(glassMat)
  const lantern = mesh(unitGeo.box(), glassMat, 0.22, 0.3, 0.22, 0.34, 1.5, 0)
  lamp.add(lantern)
  lamp.add(mesh(unitGeo.cone(4), iron, 0.2, 0.18, 0.2, 0.34, 1.8, 0))
  const light = new THREE.PointLight('#ffc77a', 0, 6, 2)
  light.position.set(0.34, 1.65, 0)
  lamp.add(light)
  lamp.position.set(-0.75, 0, -0.05)

  const group = new THREE.Group()
  group.add(f.group, lamp)
  group.position.set(-6.2, WALL_TOP, 8.95)
  group.rotation.y = Math.PI
  return {
    id: 'lamplighter',
    group,
    update(t, night) {
      const period = 6
      const phase = (t % period) / period
      const lit = phase < 0.5
      const reach = Math.max(0, 1 - Math.abs(phase - 0.5) * 8) + Math.max(0, 1 - Math.min(phase, 1 - phase) * 8)
      f.armR.rotation.x = -0.4 - reach * 1.7
      f.armR.rotation.z = reach * 0.6
      f.head.rotation.y = -reach * 0.6
      f.head.rotation.x = -reach * 0.4
      glassMat.color.set(lit ? '#ffd88a' : '#6c7188')
      light.intensity = lit ? 2.5 + night * 4 : 0
    },
  }
}

function aviator(): Character {
  const f = makeFigure({ coat: '#9a6f4c', legs: '#6b5a48' })
  const leather = toon('#7a5236')
  f.head.add(mesh(unitGeo.sphere(14, 10), leather, 0.27, 0.22, 0.27, 0, 0.07, -0.02))
  for (const sx of [-0.08, 0.08]) {
    const g = mesh(unitGeo.cyl(1, 10), toon('#a6c4cf'), 0.06, 0.04, 0.06, sx, 0.15, 0.22)
    g.rotation.x = Math.PI / 2 - 0.3
    f.head.add(g)
  }
  const scarf = mesh(unitGeo.box(), toon(PALETTE.cream), 0.12, 0.03, 0.6, 0.1, BODY_TOP - 0.05, -0.32)
  scarf.rotation.x = -0.4
  f.group.add(scarf)
  const pad = mesh(unitGeo.box(), toon(PALETTE.white), 0.26, 0.02, 0.2, 0, -0.44, 0.1)
  f.armL.add(pad)
  place(f.group, onGround(DESERT.x - 2.2, DESERT.z - 1.4, 0.9))
  return {
    id: 'aviator',
    group: f.group,
    update(t) {
      f.armL.rotation.x = -1.2
      f.armR.rotation.x = -1.0 + Math.sin(t * 4) * 0.12
      f.armR.rotation.z = Math.sin(t * 2) * 0.15
      f.head.rotation.x = 0.35
      scarf.rotation.y = Math.sin(t * 2.5) * 0.3
    },
  }
}

function villager(id: string, coat: string, hat: string, x: number, z: number, rot: number, phase: number): Character {
  const f = makeFigure({ coat })
  f.head.add(mesh(unitGeo.cyl(1, 12), toon(hat), 0.38, 0.03, 0.38, 0, 0.12, 0))
  f.head.add(mesh(unitGeo.sphere(10, 8), toon(hat), 0.2, 0.15, 0.2, 0, 0.16, 0))
  place(f.group, onGround(x, z, rot))
  return {
    id,
    group: f.group,
    update(t) {
      const talk = Math.sin(t * 2 + phase)
      f.armR.rotation.x = -0.4 - Math.max(0, talk) * 0.8
      f.armR.rotation.z = Math.max(0, talk) * 0.3
      f.head.rotation.z = Math.sin(t * 1.2 + phase) * 0.12
      f.armL.rotation.x = -0.15
    },
  }
}

function sheep(x: number, z: number, rot: number, phase: number): Character {
  const group = new THREE.Group()
  const wool = toon(PALETTE.white)
  const face = toon('#5a4a42')
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * Math.PI * 2
    group.add(mesh(unitGeo.ico(1), wool, 0.17, 0.17, 0.17, Math.cos(a) * 0.12, 0.42 + Math.sin(i * 1.7) * 0.05, Math.sin(a) * 0.18))
  }
  group.add(mesh(unitGeo.ico(1), wool, 0.24, 0.22, 0.3, 0, 0.42, 0))
  for (const [lx, lz] of [[-0.1, 0.15], [0.1, 0.15], [-0.1, -0.15], [0.1, -0.15]]) group.add(mesh(unitGeo.cyl(1, 6), face, 0.03, 0.26, 0.03, lx, 0, lz))
  const head = new THREE.Group()
  head.position.set(0, 0.5, 0.3)
  head.add(mesh(unitGeo.sphere(10, 8), face, 0.1, 0.12, 0.13))
  head.add(mesh(unitGeo.ico(1), wool, 0.1, 0.06, 0.1, 0, 0.1, -0.02))
  for (const sx of [-0.1, 0.1]) head.add(mesh(unitGeo.sphere(6, 5), face, 0.06, 0.025, 0.035, sx, 0.03, -0.02))
  group.add(head)
  place(group, onGround(x, z, rot))
  return {
    id: 'sheep',
    group,
    update(t) {
      const graze = (Math.sin(t * 0.7 + phase) + 1) / 2
      head.rotation.x = graze * 0.9
      head.position.y = 0.5 - graze * 0.12
    },
  }
}

function cat(anchor: Anchor): Character {
  const group = new THREE.Group()
  const fur = toon('#f0a65e')
  group.add(mesh(unitGeo.sphere(12, 8), fur, 0.18, 0.1, 0.13, 0, 0.08, 0))
  group.add(mesh(unitGeo.sphere(10, 8), fur, 0.09, 0.08, 0.09, 0.17, 0.1, 0.03))
  for (const ez of [-0.02, 0.07]) {
    const ear = mesh(unitGeo.cone(4), fur, 0.03, 0.06, 0.03, 0.19, 0.17, ez)
    group.add(ear)
  }
  const tail = mesh(unitGeo.torus(0.2, 12), fur, 0.12, 0.12, 0.12, -0.1, 0.05, 0.05)
  tail.rotation.x = Math.PI / 2
  group.add(tail)
  place(group, anchor)
  return {
    id: 'cat',
    group,
    update(t) {
      const breath = 1 + Math.sin(t * 2) * 0.05
      group.scale.set(1, breath, 1)
    },
  }
}

export function createCharacters(anchors: Record<string, Anchor>) {
  const list: Character[] = [
    littlePrince(),
    rose(),
    fox(),
    king(anchors.king),
    princess(anchors.princess),
    geographer(anchors.geographer),
    knight(),
    cook(anchors.cook),
    smith(anchors.smith),
    monk(anchors.monk),
    lamplighter(),
    aviator(),
    villager('villager-a', '#c98272', '#e8c66a', -2.4, 21.2, 2.4, 0),
    villager('villager-b', '#6f9b6c', '#d9c08f', -3.4, 20.3, -0.6, 1.7),
    villager('merchant', '#e8dcc6', '#f3ece0', -0.25, 22.35, -0.2, 3),
    sheep(-8.8, 16.6, 0.4, 0),
    sheep(-7.2, 17.8, 2.2, 1.3),
    sheep(-10.3, 18.4, -1.1, 2.6),
    sheep(-9.4, 19.9, 1.4, 3.8),
    cat(anchors.cat),
  ]
  const group = new THREE.Group()
  group.name = 'characters'
  list.forEach((c) => group.add(c.group))
  return {
    group,
    list,
    update(time: number, night: number) {
      list.forEach((c) => c.update(time, night))
    },
  }
}
