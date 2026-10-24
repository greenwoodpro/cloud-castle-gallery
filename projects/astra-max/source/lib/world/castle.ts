import * as THREE from 'three'
import { WorldBuilder, mergeStatic, type MaterialKey } from './primitives'
import type { Vector3Tuple } from '../world-data'

function windowAt(b: WorldBuilder, group: THREE.Group, position: Vector3Tuple, width = 0.23, height = 0.52, angle = 0) {
  const frame = b.group(group, '拱形石窗', position)
  frame.rotation.y = angle
  b.arch(frame, [0, -0.045, 0], width + 0.13, height + 0.12, 'trim')
  b.arch(frame, [0, 0, 0.04], width, height, 'dark')
  b.arch(frame, [0, 0.025, 0.065], width * 0.68, height * 0.8, 'window')
  b.box(frame, [0, height * 0.42, 0.085], [0.035, height * 0.84, 0.035], 'wood')
  b.box(frame, [0, height * 0.47, 0.09], [width * 0.8, 0.035, 0.035], 'wood')
  b.box(frame, [0, -0.045, 0.055], [width + 0.23, 0.085, 0.15], 'stone')
}

function turret(b: WorldBuilder, parent: THREE.Group, x: number, z: number, radius: number, height: number, roofHeight: number, flags: THREE.Group[]) {
  const group = b.group(parent, '圆形守望塔', [x, 0.1, z])
  b.cylinder(group, [0, height / 2, 0], radius * 0.93, radius, height, 'stone', 24)
  b.cylinder(group, [0, 0.14, 0], radius * 1.13, radius * 1.16, 0.28, 'trim', 24)
  b.cylinder(group, [0, height - 0.1, 0], radius * 1.13, radius * 1.03, 0.18, 'trim', 24)
  for (let y = 0.65; y < height - 0.2; y += 0.65) {
    b.cylinder(group, [0, y, 0], radius * 1.008, radius * 1.008, 0.026, 'mortar', 24)
  }
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2
    for (let y = 0.95; y < height - 0.35; y += 1.2) {
      windowAt(b, group, [Math.sin(angle) * radius * 0.97, y, Math.cos(angle) * radius * 0.97], 0.19, 0.46, angle)
    }
  }
  const rows = 7
  for (let i = 0; i < rows; i++) {
    const bottom = radius * 1.31 * (1 - i / rows) + 0.025
    const top = radius * 1.31 * (1 - (i + 1) / rows) + 0.025
    b.cylinder(group, [0, height + (i + 0.5) * roofHeight / rows, 0], top, bottom + 0.045, roofHeight / rows + 0.028, i % 3 === 0 ? 'roofLight' : 'roof', 24)
  }
  b.sphere(group, [0, height + roofHeight + 0.045, 0], [0.065, 0.065, 0.065], 'gold', 1)
  if (height > 2.6) {
    b.cylinder(group, [0, height + roofHeight + 0.36, 0], 0.017, 0.017, 0.65, 'wood', 6)
    const flag = b.group(parent, '随风轻动的旗帜', [x, height + roofHeight + 0.52, z])
    const shape = new THREE.Shape()
    shape.moveTo(0, 0)
    shape.lineTo(0.67, -0.04)
    shape.lineTo(0.53, -0.17)
    shape.lineTo(0.67, -0.28)
    shape.lineTo(0, -0.24)
    shape.closePath()
    const cloth = b.mesh(flag, new THREE.ShapeGeometry(shape), 'gold')
    cloth.material = b.materials.gold.clone()
    ;(cloth.material as THREE.MeshStandardMaterial).side = THREE.DoubleSide
    flags.push(flag)
  }
  mergeStatic(group)
}

function wall(b: WorldBuilder, parent: THREE.Group, x: number, z: number, length: number, angle = 0, height = 1.28) {
  const group = b.group(parent, '雉堞城墙', [x, 0.12, z])
  group.rotation.y = angle
  b.box(group, [0, height / 2, 0], [length, height, 0.28])
  b.box(group, [0, 0.12, 0], [length + 0.08, 0.24, 0.39], 'trim')
  b.box(group, [0, height - 0.04, 0], [length + 0.06, 0.13, 0.38], 'trim')
  const count = Math.ceil(length / 0.38)
  for (let i = 0; i <= count; i++) {
    b.box(group, [-length / 2 + i * length / count, height + 0.13, 0], [0.22, 0.29, 0.36])
  }
  for (let y = 0.35; y < height; y += 0.28) b.box(group, [0, y, 0.146], [length, 0.014, 0.014], 'mortar')
  for (let x0 = -length / 2 + 0.35; x0 < length / 2; x0 += 0.7) {
    b.box(group, [x0, 0.75, 0.155], [0.06, 0.29, 0.03], 'dark')
  }
}

function chair(b: WorldBuilder, group: THREE.Group, x: number, y: number, z: number, angle = 0) {
  const chairGroup = b.group(group, '木椅', [x, y, z])
  chairGroup.rotation.y = angle
  b.box(chairGroup, [0, 0.23, 0], [0.28, 0.055, 0.28], 'woodLight')
  b.box(chairGroup, [0, 0.42, -0.12], [0.27, 0.36, 0.04], 'wood')
  for (const px of [-0.1, 0.1]) for (const pz of [-0.1, 0.1]) b.box(chairGroup, [px, 0.11, pz], [0.035, 0.23, 0.035], 'wood')
}

function candle(b: WorldBuilder, group: THREE.Group, position: Vector3Tuple) {
  b.cylinder(group, position, 0.025, 0.035, 0.15, 'paper', 8)
  b.sphere(group, [position[0], position[1] + 0.1, position[2]], [0.025, 0.05, 0.025], 'window', 1)
}

export function createCastle(b: WorldBuilder, root: THREE.Group) {
  const stonework = b.group(root, '城堡 · 基础与后墙')
  const shell = b.group(root, '城堡 · 可移除的屋顶与前墙')
  const interior = b.group(root, '城堡 · 三层室内陈设')
  const flagRoot = b.group(root, '城堡 · 旗帜')
  const flags: THREE.Group[] = []

  b.box(stonework, [0, 0.11, -0.75], [5.35, 0.22, 4.35], 'trim')
  b.box(stonework, [0, 0.24, -0.7], [4.95, 0.13, 4.0], 'stone')
  wall(b, stonework, 0, -2.65, 4.6)
  wall(b, stonework, -2.35, -0.6, 4.0, Math.PI / 2)
  wall(b, stonework, 2.35, -0.6, 4.0, Math.PI / 2)
  wall(b, shell, -1.65, 1.45, 1.45)
  wall(b, shell, 1.65, 1.45, 1.45)

  turret(b, stonework, -2.25, -2.3, 0.55, 3.25, 1.25, flags)
  turret(b, stonework, 2.25, -2.3, 0.58, 3.55, 1.35, flags)
  turret(b, shell, -2.25, 1.28, 0.47, 2.12, 1.0, flags)
  turret(b, shell, 2.25, 1.28, 0.49, 2.45, 1.1, flags)
  turret(b, stonework, 0.96, -1.8, 0.64, 4.5, 1.65, flags)

  for (const x of [-0.69, 0.69]) {
    b.box(shell, [x, 0.88, 1.52], [0.38, 1.55, 0.55])
    b.box(shell, [x, 1.7, 1.52], [0.48, 0.17, 0.65], 'trim')
  }
  const archShape = new THREE.Shape()
  archShape.absarc(0, 0, 0.9, 0, Math.PI, false)
  archShape.lineTo(-0.51, 0)
  archShape.absarc(0, 0, 0.51, Math.PI, 0, true)
  archShape.closePath()
  b.mesh(shell, new THREE.ExtrudeGeometry(archShape, { depth: 0.52, bevelEnabled: false, curveSegments: 12 }), 'stone', [0, 1.1, 1.25])
  for (let i = -2; i <= 2; i++) b.box(shell, [i * 0.31, 2.08, 1.52], [0.21, 0.28, 0.57], 'stone')
  b.box(shell, [0, 0.35, 1.65], [1.1, 0.11, 0.7], 'woodLight')
  for (let i = 0; i < 4; i++) b.box(shell, [0, 0.3 - i * 0.06, 2.0 + i * 0.19], [1.15, 0.1, 0.24], 'stone')

  const floors = [0.42, 1.55, 2.68]
  b.box(stonework, [-0.35, 1.93, -2.03], [2.95, 3.12, 0.18])
  b.box(stonework, [-1.77, 1.93, -0.82], [0.17, 3.12, 2.55])
  b.box(shell, [1.07, 1.93, -0.82], [0.17, 3.12, 2.55])
  b.box(shell, [-0.35, 1.93, 0.4], [2.95, 3.12, 0.18])
  for (const y of floors) {
    b.box(interior, [-0.35, y, -0.82], [2.95, 0.12, 2.55], 'woodLight')
    for (let z = -1.9; z < 0.4; z += 0.19) b.box(interior, [-0.35, y + 0.062, z], [2.88, 0.005, 0.01], 'wood')
    b.box(stonework, [-0.35, y, -2.15], [3.12, 0.15, 0.12], 'trim')
    b.box(shell, [-0.35, y, 0.51], [3.12, 0.15, 0.15], 'trim')
  }
  for (const y of [0.72, 1.83, 2.96]) {
    for (const x of [-1.28, -0.37, 0.55]) windowAt(b, shell, [x, y, 0.51], 0.29, 0.56)
    for (const z of [-1.6, -0.6]) windowAt(b, shell, [1.19, y, z], 0.26, 0.54, Math.PI / 2)
    windowAt(b, stonework, [-1.88, y, -0.8], 0.26, 0.54, -Math.PI / 2)
  }
  for (let y = 0.65; y < 3.4; y += 0.27) {
    for (const x of [-1.77, 1.08]) b.box(shell, [x, y, 0.51], [0.23, 0.12, 0.09], 'trim')
  }
  b.roof(shell, [-0.35, 3.55, -0.82], 3.3, 2.95, 1.17)
  const roofAngle = Math.atan2(1.17, 1.65)
  for (let i = 1; i < 8; i++) {
    const x = 1.65 * (i / 8)
    const y = 4.72 - 1.17 * (i / 8)
    for (const side of [-1, 1]) b.box(shell, [-0.35 + side * x, y, -0.82], [0.035, 0.04, 2.99], 'roofLight', [0, 0, -side * roofAngle])
  }
  b.box(shell, [-0.35, 4.73, -0.82], [0.1, 0.1, 3.02], 'roofDark')
  for (const z of [-1.6, -0.15]) {
    b.box(shell, [0.8, 4.08, z], [0.27, 0.9, 0.3], 'stone')
    b.box(shell, [0.8, 4.56, z], [0.36, 0.1, 0.39], 'trim')
  }
  const dormer = b.group(shell, '阁楼老虎窗', [-0.35, 3.93, 0.45])
  b.box(dormer, [0, 0.1, 0], [0.5, 0.56, 0.6], 'stone')
  b.roof(dormer, [0, 0.38, 0], 0.65, 0.77, 0.4, 'roofDark')
  windowAt(b, dormer, [0, -0.1, 0.33], 0.22, 0.38)

  b.box(interior, [-0.45, 0.95, -0.7], [0.75, 0.1, 1.58], 'wood')
  for (const x of [-0.72, -0.18]) for (const z of [-1.3, -0.1]) b.box(interior, [x, 0.72, z], [0.08, 0.46, 0.08], 'wood')
  for (const z of [-1.22, -0.64, -0.06]) {
    chair(b, interior, -1.05, 0.49, z, -Math.PI / 2)
    chair(b, interior, 0.18, 0.49, z, Math.PI / 2)
    b.cylinder(interior, [-0.45, 1.015, z], 0.11, 0.11, 0.025, 'paper', 16)
  }
  candle(b, interior, [-0.45, 1.1, -0.96])
  candle(b, interior, [-0.45, 1.1, -0.35])
  b.box(interior, [0.65, 0.85, -1.65], [0.55, 0.77, 0.5], 'rock')
  b.arch(interior, [0.65, 0.5, -1.385], 0.36, 0.46, 'dark')
  b.sphere(interior, [0.65, 0.64, -1.34], [0.12, 0.16, 0.025], 'gold')
  b.box(interior, [0.65, 1.29, -1.7], [0.42, 0.13, 0.43], 'trim')
  for (let i = 0; i < 3; i++) b.cylinder(interior, [0.63, 0.66, -0.9 + i * 0.3], 0.1, 0.08, 0.22, i === 1 ? 'rose' : 'woodLight', 12)

  for (const x of [-1.45, -0.58, 0.29]) {
    b.box(interior, [x, 2.08, -1.84], [0.72, 0.92, 0.24], 'wood')
    for (let shelf = 0; shelf < 3; shelf++) {
      const y = 1.74 + shelf * 0.25
      b.box(interior, [x, y - 0.04, -1.67], [0.7, 0.035, 0.28], 'woodLight')
      for (let book = 0; book < 7; book++) {
        const materials: MaterialKey[] = ['rose', 'leaf', 'gold', 'paper', 'roofDark']
        b.box(interior, [x - 0.27 + book * 0.085, y + 0.06, -1.66], [0.065, 0.15 + (book % 3) * 0.023, 0.18], materials[(book + shelf) % materials.length])
      }
    }
  }
  b.box(interior, [-0.55, 2.04, -0.25], [1.0, 0.07, 0.5], 'woodLight')
  for (const x of [-0.94, -0.16]) for (const z of [-0.42, -0.08]) b.box(interior, [x, 1.83, z], [0.05, 0.42, 0.05], 'wood')
  b.box(interior, [-0.5, 2.09, -0.25], [0.32, 0.025, 0.22], 'paper', [0, 0.2, 0])
  chair(b, interior, -0.55, 1.62, 0.19, Math.PI)
  candle(b, interior, [-0.95, 2.16, -0.27])

  b.box(interior, [-1.02, 2.96, -0.95], [0.9, 0.28, 1.5], 'wood')
  b.box(interior, [-1.02, 3.12, -0.89], [0.85, 0.12, 1.33], 'paper')
  b.box(interior, [-1.02, 3.2, -0.57], [0.88, 0.08, 0.83], 'rose')
  b.box(interior, [-1.02, 3.22, -1.42], [0.56, 0.12, 0.29], 'paper')
  for (const x of [-1.47, -0.57]) for (const z of [-1.7, -0.2]) b.box(interior, [x, 3.12, z], [0.055, 0.76, 0.055], 'wood')
  b.box(interior, [0.34, 2.76, -0.58], [0.62, 0.025, 1.28], 'gold')
  b.box(interior, [0.36, 3.15, -1.68], [0.72, 0.08, 0.43], 'woodLight')
  for (const x of [0.07, 0.64]) b.box(interior, [x, 2.95, -1.68], [0.055, 0.4, 0.32], 'wood')
  b.sphere(interior, [0.37, 3.37, -1.68], [0.13, 0.13, 0.13], 'leafLight', 2)
  b.cylinder(interior, [0.37, 3.22, -1.68], 0.05, 0.1, 0.09, 'gold')

  for (let floor = 0; floor < 2; floor++) {
    for (let step = 0; step < 9; step++) {
      b.box(interior, [0.75, floors[floor] + step * 0.125 + 0.1, -1.25 + step * 0.17], [0.45, 0.09, 0.21], 'woodLight')
    }
    b.beam(interior, [0.95, floors[floor] + 0.5, -1.25], [0.95, floors[floor] + 1.5, 0.11], 0.045)
  }

  for (const flag of flags) flagRoot.attach(flag)
  mergeStatic(stonework)
  mergeStatic(shell)
  mergeStatic(interior)
  return { shell, interior, flags }
}
