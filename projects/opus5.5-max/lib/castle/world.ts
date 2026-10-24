import * as THREE from 'three'
import { Batcher, Builder, mat4, noOutline, PALETTE, toon, unitGeo } from './core'
import { prism, windowAt, type CastleMaterials } from './castle'
import { DESERT, heightAt, KNOLL, LAKE, VOLCANOES, WHEAT, WINDMILL } from './terrain'

interface HouseSpec {
  x: number
  z: number
  rot: number
  w: number
  d: number
  roof: string
  chimney?: boolean
}

export const HOUSES: HouseSpec[] = [
  { x: -6.6, z: 19.4, rot: 0.3, w: 2.6, d: 2.0, roof: PALETTE.roofRose, chimney: true },
  { x: -7.8, z: 25.2, rot: -0.4, w: 2.4, d: 2.0, roof: PALETTE.roofSlate },
  { x: 1.2, z: 19.0, rot: -0.5, w: 2.2, d: 1.8, roof: PALETTE.roofBlue },
  { x: 2.8, z: 25.6, rot: -2.6, w: 3.0, d: 2.3, roof: '#b9785f', chimney: true },
  { x: -3.4, z: 26.6, rot: 3.0, w: 2.4, d: 1.9, roof: PALETTE.roofRose },
]

function cottage(b: Builder, M: CastleMaterials, spec: HouseSpec) {
  const base = Math.min(
    heightAt(spec.x - spec.w / 2, spec.z - spec.d / 2),
    heightAt(spec.x + spec.w / 2, spec.z + spec.d / 2),
    heightAt(spec.x, spec.z),
  )
  const h = b.child(spec.x, base, spec.z, spec.rot)
  const { w, d } = spec
  const wallH = 1.8
  h.box(M.dark, w + 0.2, 0.5, d + 0.2, 0, -0.4, 0)
  h.box(M.cream, w, wallH, d, 0, 0, 0)
  const beam = M.woodDark
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) h.box(beam, 0.12, wallH, 0.12, sx * (w / 2 - 0.02), 0, sz * (d / 2 - 0.02))
  }
  h.box(beam, w + 0.04, 0.1, 0.1, 0, wallH * 0.52, d / 2)
  h.box(beam, w + 0.04, 0.1, 0.1, 0, wallH * 0.52, -d / 2)
  h.box(beam, w + 0.04, 0.12, d + 0.04, 0, wallH - 0.1, 0)
  for (const sx of [-1, 1]) {
    h.box(beam, 0.08, 1.05, 0.08, sx * w * 0.3, wallH * 0.52, d / 2 + 0.01, 0, 0, sx * 0.6)
  }
  h.arch(M.door, 0.55, 1.15, 0.08, 0, 0, d / 2 + 0.02)
  windowAt(h, M, -w * 0.3, 0.45, d / 2 + 0.03, 0, 0.36, 0.5)
  windowAt(h, M, w * 0.3, 0.45, d / 2 + 0.03, 0, 0.36, 0.5)
  windowAt(h, M, w / 2 + 0.02, 0.6, 0, Math.PI / 2, 0.36, 0.5)
  h.box(toon('#9a6f4c'), 0.5, 0.12, 0.16, -w * 0.3, 0.32, d / 2 + 0.1)
  for (let i = 0; i < 3; i++) h.sphere(toon(i % 2 ? '#f2b6c1' : '#f6d77a'), 0.07, -w * 0.3 - 0.15 + i * 0.15, 0.48, d / 2 + 0.12)
  prism(h, M.cream, w / 2, 1.4, d - 0.02, 0, wallH, 0, Math.PI / 2)
  prism(h, toon(spec.roof), w / 2 + 0.3, 1.7, d + 0.5, 0, wallH - 0.2, 0, Math.PI / 2)
  if (spec.chimney) {
    h.box(M.shade, 0.4, 1.9, 0.4, w * 0.28, wallH, -d * 0.15)
    h.box(M.dark, 0.5, 0.12, 0.5, w * 0.28, wallH + 1.9, -d * 0.15)
  }
  return new THREE.Vector3(spec.x, base, spec.z)
}

function village(b: Builder, M: CastleMaterials) {
  const chimneys: THREE.Vector3[] = []
  HOUSES.forEach((spec) => {
    const p = cottage(b, M, spec)
    if (spec.chimney) {
      const off = new THREE.Vector3(spec.w * 0.28, 0, -spec.d * 0.15).applyAxisAngle(new THREE.Vector3(0, 1, 0), spec.rot)
      chimneys.push(new THREE.Vector3(p.x + off.x, p.y + 4.1, p.z + off.z))
    }
  })

  const wy = heightAt(-4.6, 23)
  b.cyl(M.dark, 0.6, 0.65, 0.65, -4.6, wy, 23, 14)
  b.cyl(toon(PALETTE.waterDeep), 0.48, 0.48, 0.02, -4.6, wy + 0.6, 23, 14)
  b.box(M.woodDark, 0.1, 1.5, 0.1, -5.2, wy + 0.5, 23)
  b.box(M.woodDark, 0.1, 1.5, 0.1, -4.0, wy + 0.5, 23)
  prism(b, M.roofRose, 0.8, 0.45, 0.9, -4.6, wy + 1.95, 23, Math.PI / 2)

  const sy = heightAt(-0.4, 23)
  const stall = b.child(-0.4, sy, 23.2, -0.2)
  stall.box(M.wood, 1.6, 0.8, 0.7, 0, 0, 0)
  for (const sx of [-0.75, 0.75]) {
    stall.box(M.woodDark, 0.08, 1.9, 0.08, sx, 0, 0.35)
    stall.box(M.woodDark, 0.08, 1.7, 0.08, sx, 0, -0.35)
  }
  for (let i = 0; i < 6; i++) {
    stall.box(toon(i % 2 ? PALETTE.cream : PALETTE.crimson), 0.3, 0.06, 1.1, -0.75 + i * 0.3 + 0.15, 1.85, 0.05, 0, -0.25)
  }
  const fruit = ['#e3893f', '#d9534f', '#8fb36f', '#f6d77a']
  for (let i = 0; i < 12; i++) stall.sphere(toon(fruit[i % 4]), 0.08, -0.6 + (i % 6) * 0.24, 0.88, -0.15 + Math.floor(i / 6) * 0.25)

  const py = heightAt(-1.4, 20.4)
  b.box(M.wood, 0.1, 1.6, 0.1, -1.4, py, 20.4)
  b.box(M.plank, 0.8, 0.22, 0.05, -1.1, py + 1.3, 20.4, 0.3)
  b.box(M.plank, 0.7, 0.22, 0.05, -1.7, py + 1.0, 20.4, -0.6)
  return chimneys
}

function windmill(b: Builder, M: CastleMaterials, group: THREE.Group) {
  const { x, z } = WINDMILL
  const y = heightAt(x, z) - 0.2
  b.cyl(M.cream, 1.0, 1.45, 4.4, x, y, z, 14)
  b.cyl(M.woodDark, 1.12, 1.12, 0.14, x, y + 2.2, z, 14)
  b.cone(toon('#a46a54'), 1.35, 1.6, x, y + 4.35, z, 14)
  const facing = Math.atan2(-x, -z)
  const dir = new THREE.Vector3(Math.sin(facing), 0, Math.cos(facing))
  b.arch(M.door, 0.7, 1.3, 0.1, x + dir.x * 1.42, y, z + dir.z * 1.42, facing)
  windowAt(b, M, x + dir.x * 1.13, y + 2.8, z + dir.z * 1.13, facing, 0.35, 0.55)
  const sails = new THREE.Group()
  const wood = toon(PALETTE.plank)
  const cloth = toon(PALETTE.cream, { side: THREE.DoubleSide })
  const hub = new THREE.Mesh(unitGeo.sphere(10, 8), toon(PALETTE.woodDark))
  hub.scale.setScalar(0.2)
  sails.add(hub)
  for (let i = 0; i < 4; i++) {
    const arm = new THREE.Group()
    arm.rotation.z = (i / 4) * Math.PI * 2
    const spar = new THREE.Mesh(unitGeo.box(), wood)
    spar.scale.set(0.1, 2.8, 0.08)
    arm.add(spar)
    const sail = new THREE.Mesh(unitGeo.box(), cloth)
    sail.scale.set(0.55, 2.2, 0.02)
    sail.position.set(0.3, 0.55, 0)
    arm.add(sail)
    sails.add(arm)
  }
  sails.position.set(x + dir.x * 1.35, y + 3.9, z + dir.z * 1.35)
  sails.rotation.y = facing
  group.add(sails)
  return sails
}

function volcanoes(b: Builder, group: THREE.Group) {
  const vents: THREE.Vector3[] = []
  VOLCANOES.forEach((v) => {
    const base = heightAt(v.x, v.z) - 0.3
    const points = [
      new THREE.Vector2(v.r, 0),
      new THREE.Vector2(v.r * 0.82, v.h * 0.35),
      new THREE.Vector2(v.r * 0.45, v.h * 0.92),
      new THREE.Vector2(v.r * 0.36, v.h),
      new THREE.Vector2(v.r * 0.24, v.h * 0.88),
      new THREE.Vector2(0.01, v.h * 0.82),
    ]
    const geo = new THREE.LatheGeometry(points, 18)
    b.batcher.add(geo, toon(v.active ? '#9c7a68' : '#8f9a78'), mat4(v.x, base, v.z))
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2 + v.x
      b.rock(toon(PALETTE.rockDark), 0.25 + (i % 3) * 0.12, v.x + Math.cos(a) * v.r * 0.95, base + 0.15, v.z + Math.sin(a) * v.r * 0.95, a)
    }
    if (v.active) {
      const lava = new THREE.Mesh(new THREE.CircleGeometry(v.r * 0.24, 16), noOutline(new THREE.MeshBasicMaterial({ color: PALETTE.lava })))
      lava.rotation.x = -Math.PI / 2
      lava.position.set(v.x, base + v.h * 0.84, v.z)
      group.add(lava)
      vents.push(new THREE.Vector3(v.x, base + v.h + 0.2, v.z))
    } else {
      b.sphere(toon(PALETTE.leaf), v.r * 0.22, v.x, base + v.h * 0.86, v.z, 1, 0.3, 1)
    }
  })
  return vents
}

function crashedPlane(b: Builder, group: THREE.Group) {
  const x = DESERT.x + 1.2
  const z = DESERT.z + 0.6
  const y = heightAt(x, z)
  const p = b.child(x, y, z, 0.7)
  const cream = toon('#f1e6cf')
  const red = toon('#c9564c')
  const dark = toon('#4a4a52')
  p.batcher.add(unitGeo.cyl(0.55, 14), cream, p.base.clone().multiply(mat4(0, 0.75, -1.3, Math.PI / 2 + 0.12, 0, 0, 0.42, 3.2, 0.42)))
  p.batcher.add(unitGeo.cyl(1, 14), red, p.base.clone().multiply(mat4(0, 0.82, -0.2, Math.PI / 2 + 0.12, 0, 0, 0.43, 0.25, 0.43)))
  p.batcher.add(unitGeo.sphere(), red, p.base.clone().multiply(mat4(0, 0.62, 1.9, 0, 0, 0, 0.34, 0.34, 0.3)))
  p.box(cream, 4.4, 0.08, 0.95, 0, 0.55, 0.4, 0, 0, 0.12)
  p.box(red, 0.6, 0.085, 0.96, -1.9, 0.82, 0.4, 0, 0, 0.12)
  p.box(red, 0.6, 0.085, 0.96, 1.9, 0.28, 0.4, 0, 0, 0.12)
  p.box(cream, 1.5, 0.06, 0.5, 0, 1.15, -2.7, 0, 0.12, 0)
  p.box(red, 0.06, 0.7, 0.6, 0, 1.2, -2.75, 0, 0.12, 0)
  p.box(toon('#a6c4cf'), 0.5, 0.25, 0.45, 0, 1.08, -0.2, 0, -0.2, 0)
  for (const sx of [-0.6, 0.6]) {
    p.box(dark, 0.06, 0.45, 0.06, sx, 0.05, 0.9)
    p.batcher.add(new THREE.CylinderGeometry(0.16, 0.16, 0.08, 12).rotateZ(Math.PI / 2), dark, p.base.clone().multiply(mat4(sx, 0.1, 0.9)))
  }
  const prop = new THREE.Group()
  for (let i = 0; i < 2; i++) {
    const blade = new THREE.Mesh(unitGeo.box(), toon(PALETTE.woodDark))
    blade.scale.set(0.12, 1.3, 0.04)
    blade.position.y = -0.65
    blade.rotation.z = i * Math.PI + 0.2
    const pivot = new THREE.Group()
    pivot.rotation.z = i * Math.PI
    pivot.add(blade)
    prop.add(pivot)
  }
  const propWorld = new THREE.Vector3(0, 0.62, 2.22).applyAxisAngle(new THREE.Vector3(0, 1, 0), 0.7)
  prop.position.set(x + propWorld.x, y + propWorld.y, z + propWorld.z)
  prop.rotation.set(0.12, 0.7, 0.4)
  group.add(prop)
  p.box(toon(PALETTE.crimson), 0.5, 0.3, 0.3, -2.2, 0, -0.8, 0.3)
  p.cyl(toon('#7f9a8a'), 0.12, 0.12, 0.35, -2.6, 0, -0.3, 10)
  return prop
}

function knollProps(b: Builder) {
  const x = KNOLL.x - 1.3
  const z = KNOLL.z - 0.7
  const y = heightAt(x, z)
  b.box(toon(PALETTE.plank), 0.42, 0.3, 0.32, x, y - 0.02, z, 0.4)
  for (let i = 0; i < 3; i++) b.sphere(toon(PALETTE.ink, { outline: false }), 0.035, x + (i - 1) * 0.11, y + 0.18, z + 0.165, 1, 1, 0.3)
}

function lakeProps(b: Builder, group: THREE.Group) {
  const deckY = LAKE.level + 0.3
  b.box(toon(PALETTE.plank), 2.8, 0.1, 0.9, -14.3, deckY, 8.6, 0.05)
  for (const dx of [-15.5, -14.3, -13.1]) {
    for (const dz of [8.2, 9.0]) b.cyl(toon(PALETTE.woodDark), 0.06, 0.06, 1.1, dx, LAKE.level - 0.7, dz, 6)
  }
  const boat = new THREE.Group()
  const hull = new THREE.Mesh(new THREE.SphereGeometry(1, 14, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), toon(PALETTE.wood, { side: THREE.DoubleSide }))
  hull.scale.set(0.45, 0.28, 1.0)
  boat.add(hull)
  const seat = new THREE.Mesh(unitGeo.box(), toon(PALETTE.plank))
  seat.scale.set(0.8, 0.04, 0.22)
  seat.position.y = -0.06
  boat.add(seat)
  const oar = new THREE.Mesh(unitGeo.box(), toon(PALETTE.woodDark))
  oar.scale.set(1.4, 0.03, 0.06)
  oar.position.set(0.2, 0, 0.1)
  oar.rotation.y = 0.3
  boat.add(oar)
  boat.position.set(-16.6, LAKE.level + 0.08, 7.6)
  boat.rotation.y = 0.8
  group.add(boat)
  return boat
}

function scarecrow(b: Builder) {
  const x = (WHEAT.x0 + WHEAT.x1) / 2
  const z = (WHEAT.z0 + WHEAT.z1) / 2
  const y = heightAt(x, z)
  b.box(toon(PALETTE.woodDark), 0.1, 2.0, 0.1, x, y, z)
  b.box(toon(PALETTE.woodDark), 1.3, 0.08, 0.08, x, y + 1.5, z)
  b.cyl(toon('#7f6a9a'), 0.22, 0.3, 0.7, x, y + 1.0, z, 8)
  b.sphere(toon('#e8d3a0'), 0.22, x, y + 1.95, z)
  b.cyl(toon(PALETTE.wheat), 0.42, 0.42, 0.04, x, y + 2.1, z, 12)
  b.cone(toon(PALETTE.wheat), 0.22, 0.3, x, y + 2.12, z, 10)
}

export function createWorld(M: CastleMaterials) {
  const batcher = new Batcher()
  const b = new Builder(batcher)
  const group = new THREE.Group()
  group.name = 'world'

  const chimneys = village(b, M)
  const sails = windmill(b, M, group)
  const vents = volcanoes(b, group)
  const prop = crashedPlane(b, group)
  knollProps(b)
  const boat = lakeProps(b, group)
  scarecrow(b)
  group.add(batcher.build('world-batch'))

  return {
    group,
    smokeSources: chimneys,
    volcanoVents: vents,
    update(time: number) {
      sails.rotateZ(0.012)
      prop.rotation.z = 0.4 + Math.sin(time * 0.3) * 0.05
      boat.position.y = LAKE.level + 0.08 + Math.sin(time * 1.4) * 0.03
      boat.rotation.z = Math.sin(time * 1.1) * 0.04
    },
  }
}
