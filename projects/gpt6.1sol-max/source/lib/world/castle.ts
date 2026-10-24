import * as THREE from 'three'
import { MAT, archGeometry, ball, beam, box, cylinder, flag, gableRoof, mesh, optimize, person, windowArch, type Point } from './primitives'
import { makeInteriors } from './interiors'

function tower(parent: THREE.Object3D, x: number, z: number, height: number, radius: number, pointed = true) {
  const group = new THREE.Group()
  group.position.set(x, 0.55, z)
  parent.add(group)
  cylinder(group, radius + 0.16, radius + 0.23, 0.34, [0, 0.17, 0], MAT.stoneEdge, 20)
  cylinder(group, radius, radius + 0.07, height, [0, height / 2, 0], MAT.stone, 20)
  for (let level = 0.45; level < height; level += 0.75) {
    cylinder(group, radius + 0.02, radius + 0.02, 0.07, [0, level, 0], MAT.stoneShade, 20)
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2 + Math.floor(level) * 0.2
      box(group, [0.11, 0.12, 0.025], [Math.sin(angle) * (radius + 0.012), level + 0.17 + (i % 2) * 0.13, Math.cos(angle) * (radius + 0.012)], MAT.stoneShade, [0, angle, 0])
    }
  }
  for (let level = 0.95; level < height - 0.5; level += 1.45) {
    for (const angle of [0, Math.PI / 2, Math.PI, -Math.PI / 2]) windowArch(group, [Math.sin(angle) * (radius + 0.02), level, Math.cos(angle) * (radius + 0.02)], radius * 0.4, 0.66, angle)
  }
  cylinder(group, radius + 0.16, radius, 0.2, [0, height - 0.05, 0], MAT.stoneShade, 20)
  cylinder(group, radius + 0.17, radius + 0.17, 0.16, [0, height + 0.09, 0], MAT.stone, 20)
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2
    box(group, [0.15, 0.22, 0.15], [Math.sin(angle) * (radius + 0.05), height - 0.26, Math.cos(angle) * (radius + 0.05)], MAT.stoneShade, [0, angle, 0])
  }
  if (pointed) {
    const roofHeight = radius * 2.6
    cylinder(group, 0.025, radius + 0.32, roofHeight, [0, height + roofHeight / 2 + 0.18, 0], MAT.roof, 20)
    for (let i = 1; i <= 6; i++) {
      const t = i / 7
      const r = (radius + 0.32) * (1 - t)
      cylinder(group, r, r + 0.028, 0.04, [0, height + 0.18 + roofHeight * t, 0], MAT.roofLight, 20)
    }
    cylinder(group, radius + 0.35, radius + 0.3, 0.13, [0, height + 0.17, 0], MAT.roofLight, 20)
    ball(group, 0.095, [0, height + roofHeight + 0.2, 0], MAT.gold)
    flag(group, [0, height + roofHeight + 0.2, 0], radius < 0.8)
  } else {
    for (let i = 0; i < 10; i++) {
      const angle = (i / 10) * Math.PI * 2
      box(group, [0.28, 0.37, 0.25], [Math.sin(angle) * radius, height + 0.3, Math.cos(angle) * radius], MAT.stone, [0, angle, 0])
    }
  }
}

function battlement(parent: THREE.Object3D, start: Point, end: Point, height = 1.65) {
  const length = new THREE.Vector3(...start).distanceTo(new THREE.Vector3(...end))
  const group = new THREE.Group()
  group.position.set((start[0] + end[0]) / 2, 0.55, (start[2] + end[2]) / 2)
  group.rotation.y = Math.atan2(end[0] - start[0], end[2] - start[2])
  parent.add(group)
  box(group, [0.3, height, length], [0, height / 2, 0], MAT.stone)
  box(group, [0.43, 0.12, length], [0, height - 0.1, 0], MAT.stoneShade)
  box(group, [0.5, 0.14, length], [0, 0.1, 0], MAT.stoneEdge)
  const count = Math.floor(length / 0.48)
  for (let i = 0; i <= count; i++) box(group, [0.36, 0.35, 0.28], [0, height + 0.13, -length / 2 + (i / count) * length], MAT.stone)
  for (let i = 0; i < count * 2; i++) box(group, [0.013, 0.025, 0.22], [0.156, 0.4 + (i % 3) * 0.4, -length / 2 + i * 0.23], MAT.stoneShade)
}

function gate(parent: THREE.Object3D) {
  const group = new THREE.Group()
  group.position.set(0, 0.55, 3.08)
  parent.add(group)
  const width = 2.3, height = 2.55, r = 0.58, opening = 1.72
  const shape = new THREE.Shape()
  shape.moveTo(-width / 2, 0)
  shape.lineTo(-width / 2, height)
  shape.lineTo(width / 2, height)
  shape.lineTo(width / 2, 0)
  shape.lineTo(r, 0)
  shape.lineTo(r, opening - r)
  shape.absarc(0, opening - r, r, 0, Math.PI, false)
  shape.lineTo(-r, 0)
  shape.closePath()
  mesh(group, new THREE.ExtrudeGeometry(shape, { depth: 0.65, bevelEnabled: false, curveSegments: 12 }), MAT.stone, [0, 0, -0.3])
  for (let i = 0; i <= 10; i++) {
    const a = (i / 10) * Math.PI
    box(group, [0.2, 0.23, 0.12], [Math.cos(a) * 0.69, opening - r + Math.sin(a) * 0.69, 0.4], MAT.stoneShade, [0, 0, a - Math.PI / 2])
  }
  for (const x of [-0.7, 0.7]) for (let y = 0.12; y < 1.1; y += 0.24) box(group, [0.22, 0.2, 0.12], [x, y, 0.4], MAT.stoneShade)
  for (let i = 0; i < 6; i++) box(group, [0.26, 0.34, 0.68], [-1.0 + i * 0.4, height + 0.13, 0], MAT.stone)
  box(group, [2.42, 0.12, 0.78], [0, height - 0.13, 0.02], MAT.stoneShade)
  box(group, [0.37, 0.6, 0.04], [0, 2.03, 0.38], MAT.grassDark)
  ball(group, 0.08, [0, 2.08, 0.42], MAT.gold, [0.8, 1.1, 0.2])
  for (const x of [-0.89, 0.89]) {
    box(group, [0.12, 0.2, 0.13], [x, 1.53, 0.46], MAT.wood)
    ball(group, 0.07, [x, 1.62, 0.47], MAT.glow)
    beam(group, [x, 1.4, 0.42], [x, 0.02, 1.75], 0.015, MAT.wood)
  }
  for (let i = 0; i < 12; i++) box(group, [1.3, 0.08, 0.15], [0, -0.01 - i * 0.022, 0.45 + i * 0.16], MAT.woodLight)
  for (const x of [-0.6, 0.6]) box(group, [0.07, 0.08, 2.1], [x, -0.15, 1.3], MAT.wood)
  person(parent, [-0.96, 0.57, 3.6], 'guard', 0.15)
  person(parent, [0.96, 0.57, 3.6], 'guard', -0.15)
}

export function makeCastle() {
  const main = new THREE.Group(); main.name = 'castle-structure'
  const cutaway = new THREE.Group(); cutaway.name = 'castle-cutaway'
  const interior = new THREE.Group(); interior.name = 'castle-interior'
  const towers = new THREE.Group(); towers.name = 'castle-towers'
  box(main, [8.1, 0.45, 6.3], [0, 0.34, 0], MAT.stoneEdge)
  box(main, [7.9, 0.12, 6.1], [0, 0.59, 0], MAT.stoneShade)
  for (let i = 0; i < 26; i++) for (let j = 0; j < 19; j++) {
    if (i > 3 && i < 19 && j > 1 && j < 13) continue
    box(main, [0.26, 0.013, 0.27], [-3.8 + i * 0.3, 0.66, -2.8 + j * 0.3], (i + j) % 3 ? MAT.stone : MAT.stoneShade)
  }
  battlement(main, [-3.75, 0, -2.8], [3.75, 0, -2.8], 2.2)
  battlement(main, [-3.75, 0, -2.8], [-3.75, 0, 2.8], 1.8)
  battlement(cutaway, [3.75, 0, -2.8], [3.75, 0, 2.8], 1.65)
  battlement(cutaway, [-3.75, 0, 2.8], [-1.1, 0, 2.8], 1.65)
  battlement(cutaway, [1.1, 0, 2.8], [3.75, 0, 2.8], 1.65)
  gate(cutaway)
  tower(towers, -3.7, -2.75, 5.1, 0.72)
  tower(towers, 3.7, -2.75, 5.9, 0.72)
  tower(towers, -3.7, 2.8, 3.4, 0.75, false)
  tower(towers, 3.7, 2.8, 3.8, 0.77)
  tower(towers, 1.15, -1.45, 6.9, 0.88)
  box(main, [4.5, 4.25, 0.2], [-0.7, 2.72, -2.06], MAT.stone)
  box(main, [0.2, 4.25, 3.2], [-2.95, 2.72, -0.5], MAT.stone)
  box(cutaway, [4.5, 4.25, 0.2], [-0.7, 2.72, 1.06], MAT.stone)
  box(cutaway, [0.2, 4.25, 3.2], [1.55, 2.72, -0.5], MAT.stone)
  for (const y of [0.75, 2.68, 4.7]) {
    box(cutaway, [4.64, 0.13, 0.28], [-0.7, y, 1.09], MAT.stoneShade)
    box(cutaway, [0.28, 0.13, 3.3], [1.57, y, -0.5], MAT.stoneShade)
    box(main, [4.64, 0.13, 0.28], [-0.7, y, -2.08], MAT.stoneShade)
  }
  for (const x of [-2.79, 1.42]) for (const z of [-2.0, 1.08]) box(z > 0 ? cutaway : main, [0.25, 4.4, 0.26], [x, 2.72, z], MAT.stoneShade)
  for (const y of [1.25, 3.25]) {
    for (const x of [-2.05, -0.7, 0.65]) windowArch(cutaway, [x, y, 1.19], 0.48, 0.95)
    for (const z of [-1.35, 0.18]) windowArch(cutaway, [1.68, y, z], 0.4, 0.9, Math.PI / 2)
    for (const x of [-2.05, -0.7, 0.65]) windowArch(main, [x, y, -2.19], 0.4, 0.87, Math.PI)
    for (const z of [-1.3, 0.25]) windowArch(main, [-3.08, y, z], 0.4, 0.85, -Math.PI / 2)
  }
  gableRoof(cutaway, 4.96, 3.6, 2.05, [-0.7, 4.9, -0.5])
  for (const z of [-1.45, 0.35]) {
    box(cutaway, [0.56, 0.65, 0.65], [-1.9, 5.8, z], MAT.stone)
    gableRoof(cutaway, 0.8, 0.86, 0.56, [-1.9, 6.1, z])
    windowArch(cutaway, [-1.9, 5.74, z + 0.36], 0.25, 0.41)
  }
  box(cutaway, [0.45, 1.25, 0.45], [-0.6, 6.25, -1.3], MAT.stoneShade)
  box(cutaway, [0.6, 0.12, 0.6], [-0.6, 6.93, -1.3], MAT.stone)
  flag(cutaway, [-0.7, 6.98, 0.5], true)
  box(cutaway, [0.4, 1.3, 0.045], [-0.75, 2.62, 1.23], MAT.grassDark)
  ball(cutaway, 0.14, [-0.75, 2.83, 1.28], MAT.gold, [0.75, 1, 0.15])
  box(main, [1.2, 1.8, 2.7], [-4.45, 1.5, -0.8], MAT.stone)
  gableRoof(main, 1.65, 3.0, 1.2, [-4.45, 2.46, -0.8])
  for (const z of [-1.6, -0.6, 0.35]) windowArch(main, [-5.09, 1.3, z], 0.27, 0.82, -Math.PI / 2)
  cylinder(main, 0.55, 0.55, 0.45, [-0.3, 0.85, 2.04], MAT.stoneEdge, 16)
  cylinder(main, 0.4, 0.45, 0.09, [-0.3, 1.11, 2.04], MAT.water, 16)
  cylinder(main, 0.11, 0.18, 0.6, [-0.3, 1.25, 2.04], MAT.stone, 12)
  cylinder(main, 0.35, 0.22, 0.1, [-0.3, 1.57, 2.04], MAT.stone, 16)
  ball(main, 0.1, [-0.3, 1.72, 2.04], MAT.gold)
  person(main, [-1.4, 0.7, 1.98], 'villager', 0.9)
  person(main, [1.75, 0.7, 1.8], 'baker', -0.9)
  makeInteriors(interior)
  for (const group of [main, cutaway, interior, towers]) optimize(group)
  interior.visible = false
  return { main, cutaway, interior, towers }
}
