import { ExtrudeGeometry, Shape } from 'three'
import { ModelKit, type MaterialName } from './model-kit'
import type { Vec3 } from './world-data'

function windowDetail(k: ModelKit, x: number, y: number, z: number, width = 0.3, height = 0.65, angle = 0) {
  k.arch([x, y, z], width + 0.14, height + 0.09, 0.035, 'stoneShade', angle)
  const dx = Math.sin(angle) * 0.045, dz = Math.cos(angle) * 0.045
  k.arch([x + dx, y + 0.04, z + dz], width, height - 0.04, 0.04, 'dark', angle)
  k.box([x + dx * 2, y + height * 0.46, z + dz * 2], [0.035, height * 0.8, 0.035], 'wood', [0, angle, 0])
  k.box([x + dx * 2, y + height * 0.47, z + dz * 2], [width * 0.9, 0.035, 0.035], 'wood', [0, angle, 0])
  k.box([x, y - 0.015, z], [width + 0.2, 0.09, 0.17], 'stoneShade', [0, angle, 0])
}

function flag(k: ModelKit, x: number, y: number, z: number, small = false) {
  const s = small ? 0.65 : 1
  k.cylinder([x, y + 0.38 * s, z], 0.018, 0.025, 0.8 * s, 'wood', 6)
  k.ball([x, y + 0.81 * s, z], [0.045, 0.045, 0.045], 'wood')
  k.box([x + 0.19 * s, y + 0.58 * s, z], [0.36 * s, 0.18 * s, 0.024], 'wood', [0, 0.15, -0.1])
}

function coneRoof(k: ModelKit, x: number, y: number, z: number, radius: number, height: number) {
  const count = Math.ceil(height * 7)
  for (let i = 0; i < count; i++) {
    const bottom = radius * (1 - i / count)
    const top = radius * (1 - (i + 1) / count)
    k.cylinder([x, y + (i + 0.5) * height / count, z], top, bottom + 0.035, height / count + 0.015, i % 3 === 0 ? 'roofLight' : 'roof', 16)
  }
  flag(k, x, y + height, z, radius < 0.65)
}

function tower(k: ModelKit, x: number, z: number, radius: number, height: number, roofHeight: number, y = 0.24) {
  k.cylinder([x, y + height / 2, z], radius, radius + 0.1, height, 'stone', 16)
  k.cylinder([x, y + 0.14, z], radius + 0.13, radius + 0.17, 0.28, 'stoneShade', 16)
  for (let i = 1; i < 4; i++) {
    k.cylinder([x, y + height * i / 4, z], radius + 0.025, radius + 0.025, 0.07, 'stoneShade', 16)
  }
  k.cylinder([x, y + height - 0.09, z], radius + 0.11, radius, 0.24, 'stoneShade', 16)
  const floors = Math.max(1, Math.floor(height / 1.2))
  for (let floor = 0; floor < floors; floor++) {
    for (let side = 0; side < 4; side++) {
      const angle = side * Math.PI / 2
      windowDetail(k, x + Math.sin(angle) * (radius + 0.015), y + 0.6 + floor * 1.15, z + Math.cos(angle) * (radius + 0.015), radius * 0.35, 0.53, angle)
    }
  }
  for (let i = 0; i < 8; i++) {
    const a = i * Math.PI / 4
    k.box([x + Math.cos(a) * radius, y + height - 0.24, z + Math.sin(a) * radius], [0.13, 0.22, 0.13], 'stoneShade', [0, -a, 0])
  }
  coneRoof(k, x, y + height, z, radius + 0.23, roofHeight)
}

function battlement(k: ModelKit, from: Vec3, to: Vec3, height: number) {
  const dx = to[0] - from[0], dz = to[2] - from[2]
  const length = Math.hypot(dx, dz), angle = -Math.atan2(dz, dx)
  const cx = (from[0] + to[0]) / 2, cz = (from[2] + to[2]) / 2
  k.box([cx, 0.3 + height / 2, cz], [length, height, 0.3], 'stone', [0, angle, 0])
  k.box([cx, 0.28 + height, cz], [length, 0.12, 0.4], 'stoneShade', [0, angle, 0])
  k.box([cx, 0.62, cz], [length, 0.15, 0.36], 'stoneShade', [0, angle, 0])
  const count = Math.ceil(length / 0.39)
  for (let i = 0; i <= count; i++) {
    const t = i / count
    k.box([from[0] + dx * t, height + 0.46, from[2] + dz * t], [0.24, 0.34, 0.36], 'stone', [0, angle, 0])
    if (i % 3 === 1) k.box([from[0] + dx * t, 0.9, from[2] + dz * t + 0.16], [0.08, 0.38, 0.025], 'dark', [0, angle, 0])
  }
}

function gableRoof(k: ModelKit, x: number, y: number, z: number, width: number, depth: number, height: number) {
  const incline = Math.atan2(height, width / 2)
  const length = Math.hypot(width / 2, height)
  for (const sign of [-1, 1]) {
    k.box([x + sign * width / 4, y + height / 2, z], [length + 0.16, 0.12, depth + 0.3], 'roof', [0, 0, sign * -incline])
    for (let row = 0; row < 9; row++) {
      const t = (row + 0.2) / 9
      k.box([x + sign * width * 0.5 * t, y + height * (1 - t) + 0.07, z], [0.045, 0.04, depth + 0.31], 'roofLight', [0, 0, -sign * incline])
    }
  }
  k.box([x, y + height + 0.07, z], [0.15, 0.14, depth + 0.4], 'roofLight')
}

export function addCottage(k: ModelKit, x: number, z: number, scale = 1) {
  const y = 0.18, width = 1.1 * scale, depth = 1.3 * scale, h = 1.1 * scale
  k.box([x, y + h / 2, z], [width, h, depth], 'stone')
  for (const side of [-1, 1]) {
    k.box([x + side * width * 0.43, y + h / 2, z + depth * 0.51], [0.065, h, 0.07], 'wood')
  }
  k.box([x, y + h * 0.65, z + depth * 0.51], [width, 0.07, 0.07], 'wood')
  k.arch([x - width * 0.2, y, z + depth / 2 + 0.01], 0.32 * scale, h * 0.62, 0.06, 'wood')
  windowDetail(k, x + width * 0.25, y + h * 0.43, z + depth / 2 + 0.02, 0.21 * scale, 0.32 * scale)
  gableRoof(k, x, y + h, z, width + 0.12, depth, h * 0.66)
  k.box([x + width * 0.26, y + h * 1.65, z - depth * 0.22], [0.22 * scale, 0.6 * scale, 0.23 * scale], 'stoneShade')
  k.box([x + width * 0.26, y + h * 1.96, z - depth * 0.22], [0.28 * scale, 0.09 * scale, 0.29 * scale], 'stone')
  k.cylinder([x - 0.62 * scale, 0.34, z + 0.6 * scale], 0.16, 0.15, 0.35, 'wood', 10)
}

function furniture(k: ModelKit) {
  k.layer = 'interior'
  for (const y of [0.32, 1.95, 3.55]) {
    k.box([0, y, -0.65], [3.15, 0.12, 2.55], 'wood')
    for (let plank = 0; plank < 13; plank++) k.box([-1.5 + plank * 0.25, y + 0.065, -0.65], [0.015, 0.008, 2.5], 'stoneShade')
  }
  k.box([0, 0.88, -0.55], [0.75, 0.1, 1.7], 'wood')
  for (const x of [-0.28, 0.28]) for (const z of [-1.2, 0.1]) k.box([x, 0.6, z], [0.08, 0.5, 0.08], 'wood')
  for (const x of [-0.65, 0.65]) {
    k.box([x, 0.62, -0.55], [0.23, 0.09, 1.65], 'wood')
    for (const z of [-1.1, 0.05]) k.box([x, 0.47, z], [0.1, 0.3, 0.1], 'wood')
  }
  for (let i = 0; i < 4; i++) {
    k.cylinder([0, 0.95, -1.14 + i * 0.39], 0.095, 0.095, 0.018, 'stone', 12)
    k.cylinder([0.24, 0.99, -1.14 + i * 0.39], 0.045, 0.03, 0.1, 'light', 8)
  }
  k.box([-1.19, 0.89, -1.57], [0.6, 1, 0.45], 'stoneShade')
  k.arch([-1.19, 0.37, -1.32], 0.38, 0.61, 0.04, 'dark')
  k.ball([-1.19, 0.53, -1.27], [0.13, 0.19, 0.08], 'light')
  k.box([-1.19, 1.4, -1.55], [0.72, 0.1, 0.5], 'stone')
  k.box([1.16, 0.78, -1.5], [0.56, 0.12, 0.46], 'wood')
  for (let i = 0; i < 3; i++) k.cylinder([0.98 + i * 0.16, 0.91, -1.5], 0.05, 0.07, 0.18, 'stoneShade', 8)
  for (const x of [-0.95, -0.2]) {
    k.box([x, 2.52, -1.72], [0.63, 1.1, 0.22], 'wood')
    for (let row = 0; row < 3; row++) {
      k.box([x, 2.13 + row * 0.32, -1.56], [0.66, 0.045, 0.27], 'wood')
      for (let book = 0; book < 6; book++) {
        k.box([x - 0.25 + book * 0.1, 2.27 + row * 0.32, -1.57], [0.065, 0.22 + book % 2 * 0.04, 0.15], (['roof', 'stone', 'grass'] as MaterialName[])[book % 3])
      }
    }
  }
  k.box([-0.8, 2.5, -0.25], [0.65, 0.07, 0.5], 'wood')
  for (const x of [-1.05, -0.55]) k.box([x, 2.24, -0.25], [0.07, 0.5, 0.07], 'wood')
  k.box([-0.8, 2.55, -0.25], [0.3, 0.035, 0.23], 'stone')
  k.box([0.86, 2.23, -0.68], [0.75, 0.24, 1.4], 'wood')
  k.box([0.86, 2.38, -0.64], [0.7, 0.12, 1.25], 'stone')
  k.box([0.86, 2.46, -0.38], [0.7, 0.06, 0.7], 'grass')
  k.box([0.86, 2.49, -1.08], [0.5, 0.14, 0.26], 'stone')
  for (const x of [0.5, 1.22]) for (const z of [-1.36, 0]) k.cylinder([x, 2.49, z], 0.035, 0.045, 0.9, 'wood', 6)
  for (let i = 0; i < 11; i++) k.box([1.24, 0.43 + i * 0.14, 0.46 - i * 0.14], [0.45, 0.15, 0.17], 'stoneShade')
  k.cylinder([0, 3.99, -0.55], 0.45, 0.45, 0.08, 'wood', 16)
  k.cylinder([0, 3.77, -0.55], 0.07, 0.12, 0.45, 'wood', 8)
  k.cylinder([0, 4.04, -0.55], 0.34, 0.34, 0.02, 'roofLight', 16)
  k.beam([0.7, 3.63, -0.5], [0.85, 4.27, -0.6], 0.025, 'wood')
  k.beam([1, 3.63, -0.5], [0.85, 4.27, -0.6], 0.025, 'wood')
  k.beam([0.85, 3.63, -0.9], [0.85, 4.27, -0.6], 0.025, 'wood')
  k.beam([0.6, 4.17, -0.5], [1.14, 4.46, -0.75], 0.085, 'wood')
}

export function buildCastle(k: ModelKit) {
  k.layer = 'architecture'
  k.box([0, 0.19, -0.4], [6.1, 0.28, 5.1], 'stoneShade')
  k.box([0, 2.35, -1.9], [3.3, 4.15, 0.24], 'stone')
  k.box([-1.53, 2.35, -0.7], [0.24, 4.15, 2.55], 'stone')
  k.layer = 'cutaway-shell'
  k.box([1.53, 2.35, -0.7], [0.24, 4.15, 2.55], 'stone')
  k.box([0, 2.35, 0.6], [3.3, 4.15, 0.24], 'stone')
  for (const y of [0.55, 1.92, 3.52, 4.4]) k.box([0, y, 0.75], [3.43, 0.11, 0.12], 'stoneShade')
  for (const x of [-1.14, 0, 1.14]) {
    for (const y of [1.05, 2.45, 3.78]) windowDetail(k, x, y, 0.73, 0.38, 0.72)
  }
  for (const z of [-1.35, -0.15]) for (const y of [1.05, 2.45, 3.75]) windowDetail(k, 1.66, y, z, 0.36, 0.72, Math.PI / 2)
  const gable = new Shape()
  gable.moveTo(-1.65, 0)
  gable.lineTo(1.65, 0)
  gable.lineTo(0, 1.6)
  gable.closePath()
  for (const z of [-2.03, 0.56]) k.add(new ExtrudeGeometry(gable, { depth: 0.18, bevelEnabled: false }), 'stone', [0, 4.43, z])
  windowDetail(k, 0, 4.68, 0.75, 0.33, 0.6)
  gableRoof(k, 0, 4.46, -0.7, 3.4, 2.9, 1.65)
  for (const z of [-1.6, 0.1]) {
    k.box([1.06, 5.15, z], [0.4, 0.7, 0.46], 'stone')
    windowDetail(k, 1.29, 4.98, z, 0.2, 0.4, Math.PI / 2)
    k.cylinder([1.06, 5.66, z], 0, 0.42, 0.45, 'roof', 4, [0, Math.PI / 4, 0])
  }
  k.layer = 'cutaway-shell'
  tower(k, -1.6, -1.72, 0.66, 5.5, 2.1)
  tower(k, 1.58, -1.72, 0.6, 4.85, 1.9)
  tower(k, -0.35, -1.75, 0.55, 6.75, 2.5)
  k.layer = 'cutaway-shell'
  tower(k, -1.65, 0.5, 0.47, 3.5, 1.7)
  tower(k, 1.7, 0.5, 0.47, 3.9, 1.65)
  k.layer = 'architecture'
  battlement(k, [-2.6, 0, -2.4], [2.65, 0, -2.4], 1.65)
  battlement(k, [-2.7, 0, -2.4], [-2.7, 0, 1.8], 1.5)
  k.layer = 'cutaway-shell'
  battlement(k, [2.7, 0, -2.4], [2.7, 0, 1.8], 1.5)
  battlement(k, [-2.7, 0, 1.8], [-0.75, 0, 1.8], 1.5)
  battlement(k, [0.75, 0, 1.8], [2.7, 0, 1.8], 1.5)
  k.layer = 'architecture'
  tower(k, -2.7, -2.3, 0.47, 2.55, 1.4)
  tower(k, 2.7, -2.3, 0.47, 2.65, 1.4)
  k.layer = 'cutaway-shell'
  tower(k, -2.7, 1.8, 0.53, 2.25, 1.3)
  tower(k, 2.7, 1.8, 0.53, 2.25, 1.3)
  tower(k, -0.8, 2.05, 0.42, 2.45, 1.35)
  tower(k, 0.8, 2.05, 0.42, 2.45, 1.35)
  k.box([0, 2.13, 2.05], [1.3, 0.6, 0.54], 'stone')
  for (let i = 0; i < 7; i++) {
    const a = Math.PI * i / 6
    k.box([Math.cos(a) * 0.47, 1.23 + Math.sin(a) * 0.47, 2.36], [0.23, 0.2, 0.16], 'stoneShade', [0, 0, a - Math.PI / 2])
  }
  k.box([-0.47, 0.8, 2.36], [0.18, 0.85, 0.16], 'stoneShade')
  k.box([0.47, 0.8, 2.36], [0.18, 0.85, 0.16], 'stoneShade')
  k.layer = 'architecture'
  for (let i = 0; i < 7; i++) k.box([0, 0.29 - i * 0.025, 2.55 + i * 0.2], [0.95, 0.1, 0.185], 'wood')
  for (const x of [-0.53, 0.53]) k.beam([x, 1.2, 2.26], [x, 0.36, 3.64], 0.018, 'dark')
  k.cylinder([-1.05, 0.47, 1.15], 0.37, 0.42, 0.22, 'stoneShade', 12)
  k.cylinder([-1.05, 0.59, 1.15], 0.31, 0.31, 0.03, 'water', 12)
  k.cylinder([-1.05, 0.8, 1.15], 0.06, 0.12, 0.5, 'stone', 10)
  k.cylinder([-1.05, 1.06, 1.15], 0.19, 0.08, 0.12, 'stoneShade', 12)
  furniture(k)
  k.layer = 'landscape'
}
