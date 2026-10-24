import * as THREE from 'three'
import { MAT, ball, beam, box, cylinder, gableRoof, mesh, person, windowArch } from './primitives'
import { path, tree } from './nature'

function cottage(parent: THREE.Object3D, x: number, z: number, rotation: number, scale = 1) {
  const house = new THREE.Group()
  house.position.set(x, 0.17, z)
  house.rotation.y = rotation
  house.scale.setScalar(scale)
  parent.add(house)
  box(house, [1.65, 0.15, 1.6], [0, 0.07, 0], MAT.stoneEdge)
  box(house, [1.45, 1.33, 1.4], [0, 0.8, 0], MAT.stone)
  for (const x of [-0.7, 0, 0.7]) box(house, [0.07, 1.36, 0.08], [x, 0.8, 0.72], MAT.wood)
  for (const y of [0.17, 0.82, 1.46]) box(house, [1.5, 0.075, 0.08], [0, y, 0.72], MAT.wood)
  for (const side of [-1, 1]) beam(house, [side * 0.68, 0.86, 0.75], [0, 1.4, 0.75], 0.025, MAT.wood)
  gableRoof(house, 1.86, 1.82, 1.0, [0, 1.47, 0])
  windowArch(house, [-0.38, 0.94, 0.77], 0.28, 0.38)
  windowArch(house, [0.38, 0.94, 0.77], 0.28, 0.38)
  windowArch(house, [-0.77, 0.67, 0], 0.32, 0.53, -Math.PI / 2)
  mesh(house, new THREE.BoxGeometry(0.46, 0.67, 0.08), MAT.wood, [0.32, 0.5, 0.77])
  ball(house, 0.025, [0.46, 0.5, 0.83], MAT.gold)
  for (let i = 0; i < 3; i++) box(house, [0.64 + i * 0.14, 0.1, 0.19], [0.3, 0.16 - i * 0.04, 0.86 + i * 0.15], MAT.stoneShade)
  box(house, [0.24, 0.7, 0.28], [-0.35, 2.01, -0.3], MAT.stoneShade)
  box(house, [0.32, 0.08, 0.36], [-0.35, 2.38, -0.3], MAT.stone)
  for (const x of [-0.4, -0.16]) {
    cylinder(house, 0.15, 0.12, 0.22, [x - 0.5, 0.19, 0.9], MAT.roof, 8)
    ball(house, 0.17, [x - 0.5, 0.38, 0.9], MAT.grassDark)
    ball(house, 0.045, [x - 0.5, 0.49, 0.9], MAT.roofLight, undefined, 0)
  }
}

function barrel(parent: THREE.Object3D, x: number, z: number, scale = 1) {
  const y = 0.2 + scale * 0.2
  cylinder(parent, 0.17 * scale, 0.17 * scale, 0.4 * scale, [x, y, z], MAT.woodLight, 10)
  for (const offset of [-0.12, 0.13]) cylinder(parent, 0.18 * scale, 0.18 * scale, 0.035 * scale, [x, y + offset * scale, z], MAT.wood, 10)
}

export function makeVillage(parent: THREE.Object3D) {
  cottage(parent, 5.15, 0.55, -0.25, 0.88)
  cottage(parent, 6.45, -1.8, -0.2, 0.77)
  cottage(parent, 2.2, 4.25, -0.15, 0.68)
  path(parent, [[0, 0.2, 5.5], [1.8, 0.2, 5.25], [3.2, 0.2, 2.8], [4.9, 0.2, 2.3], [5.6, 0.2, 1.9]], 0.7)
  path(parent, [[5.3, 0.2, 1.95], [6.95, 0.2, 0.7], [6.0, 0.2, -1.1]], 0.6)
  const mill = new THREE.Group()
  mill.position.set(6.5, 0.15, -0.1)
  mill.rotation.y = 0.22
  parent.add(mill)
  cylinder(mill, 0.5, 0.75, 2.55, [0, 1.28, 0], MAT.stoneShade, 14)
  cylinder(mill, 0.035, 0.82, 1.14, [0, 3.03, 0], MAT.roof, 14)
  cylinder(mill, 0.77, 0.73, 0.1, [0, 2.51, 0], MAT.roofLight, 14)
  windowArch(mill, [0, 0.05, 0.77], 0.38, 0.71)
  windowArch(mill, [0.58, 1.2, 0.18], 0.23, 0.4, Math.PI / 2)
  const blades = new THREE.Group()
  blades.name = 'windmill-blades'
  blades.position.set(0, 2.12, 0.67)
  blades.userData.animated = 'windmill'
  mill.add(blades)
  for (let i = 0; i < 4; i++) {
    const blade = new THREE.Group()
    blade.rotation.z = (i / 4) * Math.PI * 2
    blades.add(blade)
    box(blade, [0.07, 1.65, 0.06], [0, 0.65, 0], MAT.wood)
    box(blade, [0.39, 0.92, 0.04], [0.13, 0.97, 0.035], MAT.stone)
    for (let j = 0; j < 5; j++) box(blade, [0.4, 0.035, 0.06], [0.13, 0.59 + j * 0.19, 0.06], MAT.woodLight)
    for (const x of [-0.055, 0.32]) box(blade, [0.03, 0.96, 0.06], [x, 0.97, 0.06], MAT.woodLight)
  }
  ball(blades, 0.13, [0, 0, 0.1], MAT.woodLight)
  const stall = new THREE.Group()
  stall.position.set(4.5, 0.17, 2.1)
  stall.rotation.y = -0.25
  parent.add(stall)
  box(stall, [1.1, 0.42, 0.55], [0, 0.24, 0], MAT.woodLight)
  for (const x of [-0.52, 0.52]) box(stall, [0.045, 1.27, 0.045], [x, 0.63, 0], MAT.wood)
  for (let i = 0; i < 5; i++) box(stall, [0.25, 0.055, 0.9], [-0.5 + i * 0.25, 1.19, 0.05], i % 2 ? MAT.stone : MAT.roofLight, [-0.15, 0, 0])
  for (let i = 0; i < 12; i++) ball(stall, 0.07, [-0.4 + (i % 6) * 0.15, 0.51, -0.12 + Math.floor(i / 6) * 0.21], i % 2 ? MAT.gold : MAT.roof, undefined, 0)
  person(parent, [4.6, 0.2, 1.65], 'baker', Math.PI)
  person(parent, [5.1, 0.2, 2.7], 'villager', -1)
  person(parent, [6, 0.2, -0.3], 'gardener', 0.6)
  person(parent, [1.4, 0.2, 4.8], 'villager', 0.5)
  barrel(parent, 5.9, 0.9)
  barrel(parent, 5.7, 0.6, 0.8)
  barrel(parent, 6.8, -1.0, 0.8)
  tree(parent, [2.9, 0.17, 5], 0.65, 'gold')
  tree(parent, [7.5, 0.17, -0.7], 0.7, 'broad')
  for (let i = 0; i < 8; i++) box(parent, [0.045, 0.46, 0.045], [1.4 + i * 0.25, 0.4, 5.8], MAT.woodLight)
  beam(parent, [1.35, 0.57, 5.8], [3.2, 0.57, 5.8], 0.025, MAT.woodLight)
  beam(parent, [1.35, 0.35, 5.8], [3.2, 0.35, 5.8], 0.025, MAT.woodLight)
}
