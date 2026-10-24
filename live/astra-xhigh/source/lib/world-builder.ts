import * as THREE from 'three'
import { ModelKit, seededRandom, type MaterialName } from './model-kit'
import { addCottage, buildCastle } from './castle-builder'
import { palette, type Vec3 } from './world-data'

function island(k: ModelKit) {
  const rand = seededRandom(18)
  const segments = 44
  const radii = Array.from({ length: segments }, (_, i) => 1 + Math.sin(i * 1.8) * 0.045 + rand() * 0.06)
  const levels = [[0.12, 6.2], [-0.22, 6.4], [-1.05, 5.9], [-2.1, 4.85], [-3.45, 3.45], [-4.55, 1.8], [-5.25, 0.3]]
  const ring = levels.map(([y, radius], row) => radii.map((r, i) => {
    const angle = i / segments * Math.PI * 2
    return [Math.cos(angle) * radius * r, y + (row > 1 ? (rand() - 0.5) * 0.7 : 0), Math.sin(angle) * radius * r * 0.85] as Vec3
  }))
  for (let row = 0; row < levels.length - 1; row++) {
    for (let i = 0; i < segments; i++) {
      const j = (i + 1) % segments
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.Float32BufferAttribute([...ring[row][i], ...ring[row][j], ...ring[row + 1][i], ...ring[row][j], ...ring[row + 1][j], ...ring[row + 1][i]], 3))
      k.add(geo, row === 0 ? 'grass' : (i + row) % 4 === 0 ? 'rockShade' : 'rock')
    }
  }
  for (let i = 0; i < segments; i++) {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute([0, 0.12, 0, ...ring[0][(i + 1) % segments], ...ring[0][i]], 3))
    k.add(geo, i % 5 === 0 ? 'grassLight' : 'grass')
  }
  for (let i = 0; i < 25; i++) {
    const angle = rand() * Math.PI * 2, r = 5.4 + rand() * 0.4
    k.ball([Math.cos(angle) * r, -0.35 - rand() * 1.1, Math.sin(angle) * r * 0.85], [0.35 + rand() * 0.65, 0.5 + rand() * 0.75, 0.4 + rand() * 0.5], i % 3 === 0 ? 'rockShade' : 'rock', 0)
  }
  for (let i = 0; i < 17; i++) {
    const angle = 0.3 + i * 0.36, r = 6.02
    for (let j = 0; j < 3 + i % 4; j++) {
      k.ball([Math.cos(angle) * (r - j * 0.08), -j * 0.2, Math.sin(angle) * (r - j * 0.08) * 0.85], [0.12, 0.18, 0.12], 'leaves', 0)
    }
  }
  k.ball([4.25, 0.28, -2.3], [1.6, 0.6, 1.4], 'grass', 1)
  k.ball([-4.3, 0.2, -2.5], [1.6, 0.35, 1.3], 'grassLight', 1)
  for (const [x, y, z, s] of [[-7.2, -2.2, -0.8, 0.55], [7.1, -1.1, -1.7, 0.65], [4.7, -3.7, 3.5, 0.32], [-4, -4.1, 3, 0.25]]) {
    k.ball([x, y, z], [s, s * 1.3, s], 'rock', 0)
    k.ball([x, y + s * 0.65, z], [s * 0.8, s * 0.18, s * 0.8], 'grass', 0)
  }
}

function tree(k: ModelKit, x: number, z: number, scale: number, pine = false, base = 0.12) {
  k.cylinder([x, base + 0.6 * scale, z], 0.055 * scale, 0.11 * scale, 1.2 * scale, 'wood', 7)
  if (pine) {
    for (let i = 0; i < 3; i++) k.cylinder([x, base + (0.9 + i * 0.43) * scale, z], 0, (0.63 - i * 0.13) * scale, 1.18 * scale, i % 2 ? 'leaves' : 'grass', 8)
  } else {
    k.beam([x, base + 0.65 * scale, z], [x + 0.3 * scale, base + 1.3 * scale, z], 0.045 * scale, 'wood')
    k.ball([x, base + 1.48 * scale, z], [0.68 * scale, 0.8 * scale, 0.6 * scale], 'grassLight', 1)
    k.ball([x - 0.32 * scale, base + 1.16 * scale, z + 0.16 * scale], [0.5 * scale, 0.57 * scale, 0.5 * scale], 'grass', 1)
    k.ball([x + 0.39 * scale, base + 1.3 * scale, z - 0.05 * scale], [0.48 * scale, 0.61 * scale, 0.46 * scale], 'leaves', 1)
  }
}

function path(k: ModelKit, points: Vec3[], width: number, material: MaterialName = 'stoneShade') {
  const curve = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)))
  const samples = curve.getPoints(65)
  for (let i = 0; i < samples.length - 1; i++) {
    const a = samples[i], b = samples[i + 1], tangent = b.clone().sub(a)
    k.box(a.clone().add(b).multiplyScalar(0.5).toArray() as Vec3, [width, 0.035, tangent.length() + 0.03], material, [0, Math.atan2(tangent.x, tangent.z), 0])
  }
}

function nature(k: ModelKit) {
  const rand = seededRandom(241)
  path(k, [[0, 0.16, 2.8], [0, 0.16, 3.8], [-1.8, 0.16, 4.15], [-4.2, 0.16, 2.9]], 0.6)
  path(k, [[-2, 0.16, 4.1], [-2.5, 0.16, 2.9], [-4.4, 0.16, 1.4], [-4.4, 0.16, -1.5]], 0.4)
  path(k, [[0, 0.16, 3.6], [1.7, 0.16, 3.7], [3, 0.16, 3.15], [4.2, 0.16, 2.2]], 0.4)
  path(k, [[4.5, 0.19, -2.8], [4.05, 0.19, -1.4], [4.6, 0.19, 0.1], [3.95, 0.19, 1.5], [4.4, 0.19, 2.6], [4.3, 0.19, 3.9]], 0.75, 'water')
  k.ball([4.3, 0.14, -1.1], [0.84, 0.07, 0.95], 'water', 2)
  for (let i = 0; i < 24; i++) {
    const z = -2.4 + i * 0.25, x = 4.35 + Math.sin(z * 2) * 0.26
    if (i % 3 === 0) k.ball([x + (i % 2 ? 0.5 : -0.5), 0.2, z], [0.14, 0.14, 0.2], 'rock', 0)
  }
  k.layer = 'waterfall'
  for (let i = 0; i < 9; i++) {
    const length = 3.6 + rand() * 1.5
    k.box([4.02 + i * 0.065, -length / 2 + 0.15, 3.96 + Math.sin(i) * 0.045], [0.085, length, 0.07], i % 3 === 0 ? 'stone' : 'water', [0.055, 0, -0.02])
  }
  k.layer = 'landscape'
  for (let i = 0; i < 9; i++) {
    const x = 3.64 + i * 0.13, y = 0.37 + Math.sin(i / 8 * Math.PI) * 0.16
    k.box([x, y, 2.55], [0.12, 0.1, 0.7], 'wood')
    if (i % 2 === 0) for (const z of [2.17, 2.93]) k.box([x, y + 0.23, z], [0.045, 0.45, 0.045], 'wood')
  }
  for (const z of [2.17, 2.93]) k.beam([3.64, 0.78, z], [4.68, 0.78, z], 0.025, 'wood')
  const trees: [number, number, number, boolean?, number?][] = [
    [-4.9, -1.5, 1.15], [-4.7, -2.7, 0.95, true], [-3.8, -3.4, 1.2, true], [-2.7, -3.7, 0.8, true],
    [3.9, -2.9, 1, true, 0.35], [4.8, -2.35, 1.1, true, 0.3], [5.25, -1.4, 0.8, true], [5.4, 0, 0.85],
    [5.2, 1.3, 0.8], [2.8, 3.35, 0.85], [-4.45, 2.7, 0.85], [-3.6, 3.85, 0.65], [0.8, -3.9, 0.9, true],
    [-5.5, -0.1, 0.7], [-5.1, 1.25, 0.72], [3.2, -3.4, 0.8, true],
  ]
  trees.forEach(t => tree(k, ...t))
  for (let i = 0; i < 90; i++) {
    const x = (rand() - 0.5) * 11, z = (rand() - 0.5) * 8.8
    if ((Math.abs(x) < 3.35 && z < 2.8) || x * x / 34 + z * z / 23 > 0.92 || (x > 3.5 && x < 4.9)) continue
    const size = 0.08 + rand() * 0.15
    k.ball([x, 0.2, z], [size * 1.6, size, size], i % 4 ? 'grassLight' : 'leaves', 0)
    if (i % 2 === 0) {
      k.cylinder([x, 0.27, z], 0.012, 0.012, 0.2, 'leaves', 4)
      k.ball([x, 0.39, z], [0.06, 0.055, 0.06], i % 4 ? 'stone' : 'wood', 0)
    }
  }
  for (const x of [-3.65, -2.35]) {
    k.box([x, 0.3, 2.55], [0.18, 0.36, 1.35], 'leaves')
  }
  for (const z of [1.94, 3.17]) k.box([-3, 0.3, z], [1.4, 0.36, 0.17], 'leaves')
  for (let row = 0; row < 3; row++) for (let col = 0; col < 4; col++) {
    const x = -3.4 + col * 0.26, z = 2.14 + row * 0.34
    k.cylinder([x, 0.34, z], 0.014, 0.014, 0.3, 'leaves', 4)
    k.ball([x, 0.51, z], [0.105, 0.1, 0.105], (row + col) % 3 === 0 ? 'wood' : 'stone', 1)
  }
  for (let i = 0; i < 6; i++) {
    k.box([-4.9 + i * 0.3, 0.38, 2.2], [0.045, 0.5, 0.05], 'wood')
  }
  k.box([-4.15, 0.5, 2.2], [1.65, 0.045, 0.045], 'wood')
}

function person(k: ModelKit, x: number, z: number, color: MaterialName, scarf = false, y = 0.18) {
  for (const dx of [-0.055, 0.055]) k.box([x + dx, y + 0.09, z], [0.055, 0.19, 0.07], 'dark')
  k.cylinder([x, y + 0.28, z], 0.085, 0.125, 0.26, color, 7)
  k.ball([x, y + 0.5, z], [0.095, 0.11, 0.095], 'stoneShade', 1)
  k.ball([x, y + 0.565, z - 0.015], [0.105, 0.07, 0.1], 'wood', 1)
  for (const sign of [-1, 1]) k.beam([x + sign * 0.08, y + 0.35, z], [x + sign * 0.15, y + 0.19, z + 0.025], 0.034, color)
  if (scarf) {
    k.box([x, y + 0.4, z + 0.03], [0.21, 0.05, 0.17], 'wood')
    k.box([x + 0.2, y + 0.39, z - 0.015], [0.35, 0.055, 0.09], 'wood', [0, -0.3, 0.2])
  }
}

function residents(k: ModelKit) {
  k.layer = 'residents'
  person(k, -0.34, 3.5, 'grass', true)
  person(k, -3.85, 2.68, 'roof')
  person(k, 1.15, 2.65, 'roof')
  k.box([1.3, 0.48, 2.72], [0.15, 0.24, 0.06], 'wood')
  k.beam([1.03, 0.16, 2.7], [1.03, 1.03, 2.7], 0.018, 'wood')
  person(k, -4.1, 0.38, 'stone')
  person(k, 1.4, 1.15, 'wood', false, 0.3)
  k.ball([0.08, 0.32, 3.6], [0.09, 0.12, 0.19], 'wood', 1)
  k.ball([0.08, 0.44, 3.73], [0.09, 0.09, 0.1], 'wood', 0)
  for (const x of [0.02, 0.14]) k.cylinder([x, 0.54, 3.74], 0, 0.035, 0.1, 'wood', 4)
  k.beam([0.08, 0.29, 3.45], [0.12, 0.39, 3.22], 0.055, 'wood')
  k.ball([0.12, 0.39, 3.21], [0.055, 0.055, 0.06], 'stone', 0)
  for (const [x, z] of [[2.1, 4], [2.5, 4.25], [1.65, 4.35]]) {
    k.ball([x, 0.35, z], [0.24, 0.19, 0.16], 'stone', 1)
    k.ball([x + 0.2, 0.36, z], [0.1, 0.12, 0.09], 'dark', 0)
    for (const dx of [-0.12, 0.12]) for (const dz of [-0.08, 0.08]) k.box([x + dx, 0.2, z + dz], [0.035, 0.16, 0.035], 'dark')
  }
  k.layer = 'landscape'
}

export function buildWorld() {
  const k = new ModelKit()
  island(k)
  nature(k)
  buildCastle(k)
  addCottage(k, -4.05, -0.7, 0.9)
  addCottage(k, -3.65, 0.9, 0.72)
  addCottage(k, -2.6, -3.3, 0.72)
  k.cylinder([-4.1, 0.95, -2.6], 0.32, 0.47, 1.65, 'stone', 12)
  k.cylinder([-4.1, 1.95, -2.6], 0, 0.5, 0.65, 'roof', 12)
  for (const angle of [Math.PI / 4, -Math.PI / 4]) k.box([-4.1, 1.45, -2.1], [0.12, 1.9, 0.06], 'wood', [0, 0, angle])
  k.ball([-4.1, 1.45, -2.04], [0.1, 0.1, 0.08], 'stoneShade', 1)
  for (let row = 0; row < 3; row++) {
    k.box([-4.75, 0.17, 0.65 + row * 0.3], [0.55, 0.07, 0.18], 'wood')
    for (let plant = 0; plant < 3; plant++) k.ball([-4.94 + plant * 0.19, 0.26, 0.65 + row * 0.3], [0.08, 0.08, 0.07], 'leaves', 0)
  }
  k.box([-4.6, 0.6, 0.75], [0.65, 0.07, 0.42], 'wood')
  for (const x of [-4.85, -4.35]) k.box([x, 0.36, 0.75], [0.055, 0.48, 0.055], 'wood')
  for (let i = 0; i < 3; i++) k.ball([-4.8 + i * 0.19, 0.68, 0.75], [0.08, 0.04, 0.07], 'stoneShade', 1)
  residents(k)
  return k.finish()
}

export function setWorldCutaway(world: THREE.Group, enabled: boolean) {
  const shell = world.getObjectByName('cutaway-shell')
  if (shell) shell.visible = !enabled
}

export function setWorldNight(world: THREE.Group, enabled: boolean) {
  world.traverse(object => {
    if (object instanceof THREE.Mesh && object.name.endsWith('-dark')) {
      const material = object.material as THREE.MeshStandardMaterial
      material.emissive.set(enabled ? palette.gold : palette.ink)
      material.emissiveIntensity = enabled ? 0.55 : 0
    }
  })
}
