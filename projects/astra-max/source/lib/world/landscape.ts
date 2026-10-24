import * as THREE from 'three'
import { WorldBuilder, seeded, mergeStatic, type MaterialKey } from './primitives'
import type { Vector3Tuple } from '../world-data'

export function pine(b: WorldBuilder, parent: THREE.Group, x: number, z: number, height: number, y = 0.12) {
  b.cylinder(parent, [x, y + height * 0.23, z], height * 0.035, height * 0.045, height * 0.46, 'wood', 7)
  for (let i = 0; i < 3; i++) {
    const h = height * (0.53 - i * 0.08)
    const r = height * (0.26 - i * 0.055)
    b.cylinder(parent, [x, y + height * (0.47 + i * 0.2), z], 0.015, r, h, i === 1 ? 'leafLight' : 'leaf', 9)
  }
}

function broadleaf(b: WorldBuilder, parent: THREE.Group, x: number, z: number, height: number) {
  b.cylinder(parent, [x, height * 0.36, z], 0.06, 0.1, height * 0.65, 'wood', 8)
  b.beam(parent, [x, height * 0.38, z], [x + 0.24, height * 0.68, z + 0.1], 0.065)
  b.sphere(parent, [x, height * 0.8, z], [height * 0.37, height * 0.4, height * 0.33], 'leafLight', 2)
  b.sphere(parent, [x + height * 0.2, height * 0.7, z + 0.1], [height * 0.27, height * 0.3, height * 0.28], 'leaf', 1)
}

function island(b: WorldBuilder, parent: THREE.Group, scale = 1, position: Vector3Tuple = [0, 0, 0]) {
  const group = b.group(parent, '悬浮的风化岩层', position)
  group.scale.setScalar(scale)
  const segments = 44
  const rings = [
    { radius: 1, y: 0 },
    { radius: 1.01, y: -0.35 },
    { radius: 0.92, y: -1.05 },
    { radius: 0.72, y: -2.0 },
    { radius: 0.48, y: -3.45 },
    { radius: 0.08, y: -5.1 },
  ]
  const vertices: THREE.Vector3[][] = rings.map((ring, row) => Array.from({ length: segments }, (_, i) => {
    const angle = i / segments * Math.PI * 2
    const irregular = 1 + Math.sin(angle * 5 + 1) * 0.035 + Math.cos(angle * 9) * 0.026 + (row > 1 ? (seeded(i, row) - 0.5) * 0.13 : 0)
    return new THREE.Vector3(Math.cos(angle) * 6.45 * ring.radius * irregular, ring.y + (row > 1 ? seeded(i, row + 3) * 0.35 : 0), Math.sin(angle) * 4.9 * ring.radius * irregular)
  }))
  const faces: Record<string, number[]> = { grass: [], grassLight: [], rock: [], rockLight: [], rockDark: [] }
  for (let i = 0; i < segments; i++) {
    const next = (i + 1) % segments
    const a = vertices[0][i], c = vertices[0][next]
    faces[i % 5 === 0 ? 'grassLight' : 'grass'].push(0, 0.015, 0, ...c.toArray(), ...a.toArray())
    for (let row = 0; row < rings.length - 1; row++) {
      const one = vertices[row][i], two = vertices[row][next], three = vertices[row + 1][i], four = vertices[row + 1][next]
      const material = row === 0 ? 'grass' : (i + row) % 6 === 0 ? 'rockLight' : (i * 3 + row) % 5 === 0 ? 'rockDark' : 'rock'
      faces[material].push(...one.toArray(), ...two.toArray(), ...three.toArray(), ...two.toArray(), ...four.toArray(), ...three.toArray())
    }
  }
  for (const [material, positions] of Object.entries(faces)) {
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geometry.computeVertexNormals()
    b.mesh(group, geometry, material as MaterialKey)
  }
  return group
}

function steppingPath(b: WorldBuilder, parent: THREE.Group, points: Vector3Tuple[], width: number) {
  const curve = new THREE.CatmullRomCurve3(points.map((point) => new THREE.Vector3(...point)))
  const count = Math.ceil(curve.getLength() / 0.19)
  for (let i = 0; i <= count; i++) {
    const point = curve.getPointAt(i / count)
    const tangent = curve.getTangentAt(i / count)
    b.box(parent, [point.x, point.y, point.z], [width * (0.86 + seeded(i, 9) * 0.14), 0.045, 0.145], i % 6 === 0 ? 'trim' : 'stone', [0, Math.atan2(tangent.x, tangent.z), 0])
  }
}

export function createLandscape(b: WorldBuilder, root: THREE.Group) {
  const terrain = b.group(root, '浮空岛 · 岩体与草甸')
  island(b, terrain)
  const vegetation = b.group(root, '浮空岛 · 林地与野花')
  const details = b.group(root, '浮空岛 · 小径与花园')
  const water = b.group(root, '浮空岛 · 泉水与瀑布')
  const foam = b.group(root, '浮空岛 · 流动的水花')

  for (let i = 0; i < 22; i++) {
    const angle = i / 22 * Math.PI * 2
    const x = Math.cos(angle) * (5.6 + seeded(i, 3) * 0.38)
    const z = Math.sin(angle) * (4.15 + seeded(i, 5) * 0.3)
    b.sphere(terrain, [x, -0.08, z], [0.4 + seeded(i) * 0.4, 0.14 + seeded(i, 2) * 0.14, 0.32], i % 3 ? 'grass' : 'grassLight', 1)
  }
  for (let i = 0; i < 24; i++) {
    const x = 3.1 + seeded(i, 18) * 2.4
    const z = -3.5 + seeded(i, 12) * 3.5
    if (x * x / 36 + z * z / 21 > 0.88) continue
    pine(b, vegetation, x, z, 0.85 + seeded(i, 16) * 1.05)
  }
  for (let i = 0; i < 12; i++) {
    const x = -4.8 + seeded(i, 22) * 1.8
    const z = -3.3 + seeded(i, 23) * 2.6
    if (x * x / 36 + z * z / 21 > 0.82) continue
    pine(b, vegetation, x, z, 0.95 + seeded(i, 25) * 1.05)
  }
  broadleaf(b, vegetation, -4.9, 0.6, 1.45)
  broadleaf(b, vegetation, 0.1, 3.75, 1.23)
  broadleaf(b, vegetation, -1.75, 3.4, 1.1)
  for (let i = 0; i < 23; i++) {
    const angle = seeded(i, 29) * Math.PI * 2
    const x = Math.cos(angle) * (4.7 + seeded(i, 30))
    const z = Math.sin(angle) * (3.7 + seeded(i, 31) * 0.5)
    if (x > 4 && z > 1.3 && z < 3.5) continue
    b.sphere(terrain, [x, 0.15, z], [0.2 + seeded(i) * 0.22, 0.18 + seeded(i, 2) * 0.2, 0.23], i % 3 === 0 ? 'rockLight' : 'rock', 0)
  }
  steppingPath(b, details, [[0, 0.11, 1.9], [0, 0.11, 2.6], [-1.8, 0.11, 2.5], [-3.4, 0.11, 1.3], [-4.3, 0.11, 1.5]], 0.63)
  steppingPath(b, details, [[0, 0.12, 2.6], [1.1, 0.12, 2.55], [2.2, 0.12, 2.6], [3.4, 0.12, 3.4], [4.5, 0.12, 3.35]], 0.5)

  const riverCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(3.3, 0.045, -1.7), new THREE.Vector3(3.0, 0.045, -0.1),
    new THREE.Vector3(3.45, 0.045, 1.05), new THREE.Vector3(4.2, 0.045, 1.9),
    new THREE.Vector3(4.6, 0.035, 2.65), new THREE.Vector3(4.9, -0.12, 3.05),
    new THREE.Vector3(4.95, -1.1, 3.1), new THREE.Vector3(4.98, -2.5, 3.15),
    new THREE.Vector3(5.02, -4.6, 3.18),
  ])
  const ribbon: number[] = []
  const steps = 100
  for (let i = 0; i < steps; i++) {
    const t = i / steps
    const a = riverCurve.getPoint(t), c = riverCurve.getPoint((i + 1) / steps)
    const tangent = riverCurve.getTangent(t)
    const side = t > 0.63 ? new THREE.Vector3(0.53, 0, 0) : new THREE.Vector3(-tangent.z, 0, tangent.x).normalize().multiplyScalar(0.31 + Math.sin(t * 7) * 0.07)
    const p1 = a.clone().add(side), p2 = a.clone().sub(side), p3 = c.clone().add(side), p4 = c.clone().sub(side)
    ribbon.push(...p1.toArray(), ...p2.toArray(), ...p3.toArray(), ...p2.toArray(), ...p4.toArray(), ...p3.toArray())
  }
  const riverGeometry = new THREE.BufferGeometry()
  riverGeometry.setAttribute('position', new THREE.Float32BufferAttribute(ribbon, 3))
  riverGeometry.computeVertexNormals()
  b.materials.water.side = THREE.DoubleSide
  b.mesh(water, riverGeometry, 'water')
  for (let i = 0; i < 18; i++) {
    const x = 4.52 + seeded(i, 42) * 0.85
    const y = -seeded(i, 43) * 4.4
    const streak = b.box(foam, [x, y, 3.2], [0.018 + seeded(i) * 0.025, 0.24 + seeded(i, 2) * 0.4, 0.025], 'foam')
    streak.userData.startY = y
  }
  for (let i = 0; i < 8; i++) {
    const point = riverCurve.getPoint(0.15 + i * 0.055)
    b.box(details, [point.x, 0.065, point.z], [0.13, 0.01, 0.026], 'paper')
  }
  const bridge = b.group(details, '溪流上的木桥', [3.8, 0.12, 1.5])
  bridge.rotation.y = -0.63
  for (let i = 0; i < 11; i++) {
    const x = -0.65 + i * 0.13
    const rise = Math.cos(x / 0.9 * Math.PI / 2) * 0.17
    b.box(bridge, [x, rise, 0], [0.12, 0.06, 0.65], 'woodLight')
  }
  for (const z of [-0.34, 0.34]) {
    for (const x of [-0.65, 0, 0.65]) b.box(bridge, [x, 0.3, z], [0.045, 0.5, 0.045], 'wood')
    b.beam(bridge, [-0.68, 0.5, z], [0, 0.64, z], 0.045)
    b.beam(bridge, [0, 0.64, z], [0.68, 0.5, z], 0.045)
  }

  b.cylinder(details, [1.25, 0.17, 3.1], 0.59, 0.64, 0.19, 'trim', 24)
  b.cylinder(details, [1.25, 0.28, 3.1], 0.5, 0.5, 0.06, 'water', 24)
  b.cylinder(details, [1.25, 0.46, 3.1], 0.08, 0.14, 0.4, 'stone', 12)
  b.cylinder(details, [1.25, 0.66, 3.1], 0.26, 0.13, 0.12, 'trim', 20)
  b.sphere(details, [1.25, 0.8, 3.1], [0.095, 0.095, 0.095], 'stone', 2)
  for (const x of [0.2, 2.3]) {
    b.box(details, [x, 0.12, 3.1], [0.31, 0.18, 1.25], 'trim')
    b.box(details, [x, 0.26, 3.1], [0.24, 0.25, 1.16], 'leaf')
    for (let i = 0; i < 7; i++) b.sphere(details, [x + (i % 2) * 0.06, 0.45, 2.62 + i * 0.16], [0.065, 0.07, 0.065], i % 3 ? 'rose' : 'paper', 1)
  }

  for (let i = 0; i < 120; i++) {
    const x = (seeded(i, 62) - 0.5) * 11.8
    const z = (seeded(i, 64) - 0.5) * 8.6
    if (x * x / 34 + z * z / 19 > 0.92 || (Math.abs(x) < 2.85 && z < 2.2) || (x < -2.5 && z > 0) || (x > 2.8 && z > 0.6)) continue
    b.cylinder(vegetation, [x, 0.13, z], 0.008, 0.008, 0.19, 'leafDark', 4)
    b.sphere(vegetation, [x, 0.25, z], [0.045, 0.036, 0.045], i % 4 === 0 ? 'rose' : i % 3 === 0 ? 'gold' : 'paper', 0)
  }

  island(b, terrain, 0.16, [-8.0, -1.4, -2.9])
  pine(b, vegetation, -8.02, -2.9, 0.67, -1.37)
  island(b, terrain, 0.1, [7.8, -1.7, -3.6])
  pine(b, vegetation, 7.8, -3.6, 0.48, -1.67)
  for (const group of [terrain, vegetation, details, water]) mergeStatic(group)
  return { foam }
}
