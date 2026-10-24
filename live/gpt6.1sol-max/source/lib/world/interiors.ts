import * as THREE from 'three'
import { MAT, archGeometry, ball, beam, box, cylinder, mesh, person } from './primitives'

export function makeInteriors(parent: THREE.Group) {
  for (const y of [0.65, 2.7, 4.75]) {
    box(parent, [4.36, 0.13, 3.1], [-0.7, y, -0.45], MAT.woodLight)
    box(parent, [4.48, 0.12, 0.12], [-0.7, y + 0.02, 1.12], MAT.wood)
    if (y === 0.65) for (let x = 0; x < 10; x++) for (let z = 0; z < 7; z++) box(parent, [0.42, 0.015, 0.42], [-2.64 + x * 0.43, y + 0.075, -1.78 + z * 0.43], (x + z) % 2 ? MAT.stone : MAT.stoneShade)
    else for (let i = 0; i < 13; i++) box(parent, [0.018, 0.013, 3], [-2.6 + i * 0.32, y + 0.075, -0.45], MAT.wood)
  }
  box(parent, [2.3, 0.12, 0.78], [-0.55, 1.4, -0.3], MAT.wood)
  for (const x of [-1.45, 0.35]) for (const z of [-0.57, -0.03]) box(parent, [0.12, 0.67, 0.12], [x, 1.01, z], MAT.wood)
  for (let i = 0; i < 5; i++) {
    const x = -1.44 + i * 0.43
    for (const z of [-0.85, 0.29]) {
      cylinder(parent, 0.2, 0.2, 0.08, [x, 1.05, z], MAT.woodLight, 8)
      for (const side of [-1, 1]) box(parent, [0.05, 0.4, 0.05], [x + side * 0.11, 0.82, z], MAT.wood)
    }
    cylinder(parent, 0.1, 0.08, 0.025, [x, 1.48, -0.3], MAT.stone, 12)
    ball(parent, 0.1, [x, 1.5, -0.3], MAT.gold, [1, 0.5, 0.7])
    cylinder(parent, 0.045, 0.035, 0.12, [x, 1.52, -0.49], MAT.roof, 8)
  }
  box(parent, [1.15, 1.35, 0.35], [-1.95, 1.4, -1.85], MAT.stoneEdge)
  mesh(parent, archGeometry(0.7, 0.93, 0.05), MAT.dark, [-1.95, 0.74, -1.64])
  box(parent, [1.4, 0.16, 0.55], [-1.95, 2.06, -1.8], MAT.stoneShade)
  for (let i = 0; i < 4; i++) {
    beam(parent, [-2.18 + i * 0.15, 0.82, -1.59], [-2.0 + i * 0.1, 0.82, -1.49], 0.04, MAT.wood)
    ball(parent, 0.08, [-2.15 + i * 0.13, 0.92, -1.51], MAT.glow, [0.6, 1.8, 0.6], 0)
  }
  person(parent, [0.55, 0.75, -1.22], 'baker', 0.3)
  box(parent, [0.15, 1.86, 3], [-0.43, 3.68, -0.44], MAT.stoneShade)
  box(parent, [0.26, 1.58, 2.55], [-2.65, 3.52, -0.52], MAT.wood)
  for (let i = 0; i < 4; i++) box(parent, [0.44, 0.06, 2.58], [-2.55, 2.88 + i * 0.42, -0.52], MAT.woodLight)
  for (let row = 0; row < 3; row++) for (let i = 0; i < 13; i++) box(parent, [0.19, 0.22 + (i % 3) * 0.04, 0.09], [-2.43, 3.05 + row * 0.42, -1.66 + i * 0.18], [MAT.roof, MAT.grassDark, MAT.gold, MAT.stone][i % 4], [0, (i % 2) * 0.1, i % 4 === 0 ? 0.1 : 0])
  box(parent, [1.25, 0.08, 0.6], [-1.5, 3.36, -1.38], MAT.woodLight)
  for (const x of [-2, -1.0]) box(parent, [0.07, 0.58, 0.45], [x, 3.04, -1.38], MAT.wood)
  box(parent, [0.44, 0.012, 0.35], [-1.4, 3.42, -1.34], MAT.stone, [0, -0.2, 0])
  cylinder(parent, 0.06, 0.08, 0.13, [-1.9, 3.47, -1.4], MAT.wood, 8)
  beam(parent, [-1.87, 3.51, -1.4], [-1.74, 3.76, -1.4], 0.012, MAT.stone)
  box(parent, [1.1, 0.32, 1.7], [0.65, 2.96, -0.65], MAT.wood)
  box(parent, [1.04, 0.13, 1.62], [0.65, 3.16, -0.65], MAT.stone)
  box(parent, [1.05, 0.08, 1.04], [0.65, 3.26, -0.36], MAT.grassDark)
  box(parent, [0.76, 0.12, 0.35], [0.65, 3.27, -1.23], MAT.stone)
  box(parent, [1.16, 0.65, 0.12], [0.65, 3.2, -1.54], MAT.wood)
  box(parent, [0.47, 0.48, 0.5], [1.25, 2.99, 0.57], MAT.woodLight)
  cylinder(parent, 0.08, 0.07, 0.21, [1.25, 3.33, 0.57], MAT.roofLight, 10)
  beam(parent, [1.25, 3.46, 0.57], [1.25, 3.7, 0.57], 0.013, MAT.grassDark)
  ball(parent, 0.08, [1.25, 3.7, 0.57], MAT.roofLight, [1, 0.7, 1])
  for (let i = 0; i < 12; i++) {
    box(parent, [0.62, 0.16, 0.24], [-2.35, 0.79 + i * 0.17, 0.87 - i * 0.21], MAT.woodLight)
    beam(parent, [-2.02, 1.12 + i * 0.17, 0.87 - i * 0.21], [-2.02, 1.55 + i * 0.17, 0.87 - i * 0.21], 0.02, MAT.wood)
  }
  beam(parent, [-2.02, 1.55, 0.87], [-2.02, 3.42, -1.44], 0.03, MAT.wood)
  cylinder(parent, 0.53, 0.53, 0.1, [-1.1, 5.4, -0.5], MAT.woodLight, 14)
  cylinder(parent, 0.09, 0.2, 0.6, [-1.1, 5.06, -0.5], MAT.wood, 8)
  cylinder(parent, 0.35, 0.35, 0.018, [-1.1, 5.47, -0.5], MAT.stone, 16)
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2
    ball(parent, 0.025, [-1.1 + Math.cos(a) * 0.2, 5.49, -0.5 + Math.sin(a) * 0.2], MAT.gold, undefined, 0)
  }
  beam(parent, [-0.2, 4.85, -1.3], [0.15, 5.58, -1.3], 0.035, MAT.wood)
  beam(parent, [0.5, 4.85, -1.3], [0.15, 5.58, -1.3], 0.035, MAT.wood)
  beam(parent, [0.15, 4.85, -0.85], [0.15, 5.58, -1.3], 0.035, MAT.wood)
  beam(parent, [-0.25, 5.42, -0.95], [0.65, 5.92, -1.65], 0.11, MAT.gold)
  person(parent, [-1.3, 4.85, 0.25], 'prince', -0.5)
  for (let i = 0; i < 12; i++) box(parent, [0.04, 0.47, 0.04], [-2.74 + i * 0.35, 5.06, 1.01], MAT.wood)
  box(parent, [4.2, 0.06, 0.06], [-0.8, 5.3, 1.01], MAT.wood)
}
