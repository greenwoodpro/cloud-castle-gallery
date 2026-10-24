import * as THREE from 'three'
import { PALETTE } from './config'
import { MAT, ball, beam, blend, box, cylinder, mesh, person, seededRandom, type Point } from './primitives'

export function island(parent: THREE.Object3D, scale = 1) {
  const group = new THREE.Group()
  group.scale.setScalar(scale)
  parent.add(group)
  const segments = 48
  const ring = (i: number, level: number) => {
    const angle = (i / segments) * Math.PI * 2
    const ripple = 1 + Math.sin(angle * 7 + 1) * 0.035 + Math.sin(angle * 11) * 0.025
    const factor = [1, 0.98, 0.77, 0.43, 0.06][level]
    const y = [0.12, -0.65, -2.15, -3.65, -4.7][level]
    return new THREE.Vector3(Math.cos(angle) * 9 * ripple * factor, y + (level === 0 ? 0 : Math.sin(angle * 5 + level) * 0.28), Math.sin(angle) * 7 * ripple * factor)
  }
  for (let level = 0; level < 4; level++) {
    const positions: number[] = []
    const colors: number[] = []
    for (let i = 0; i < segments; i++) {
      const points = [ring(i, level), ring(i + 1, level), ring(i, level + 1), ring(i + 1, level + 1)]
      const shade = blend(PALETTE.clay, PALETTE.ink, 0.2 + level * 0.07 + Math.sin(i * 11) * 0.07)
      if (i % 6 === 0) shade.lerp(new THREE.Color(PALETTE.paper), 0.22)
      for (const index of [0, 1, 2, 1, 3, 2]) {
        positions.push(...points[index].toArray())
        colors.push(shade.r, shade.g, shade.b)
      }
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    geo.computeVertexNormals()
    mesh(group, geo, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1, flatShading: true, side: THREE.DoubleSide }))
  }
  const top = new THREE.Shape()
  for (let i = 0; i <= segments; i++) {
    const p = ring(i, 0)
    if (i === 0) top.moveTo(p.x, -p.z)
    else top.lineTo(p.x, -p.z)
  }
  const surface = mesh(group, new THREE.ShapeGeometry(top), MAT.grass, [0, 0.135, 0], [-Math.PI / 2, 0, 0])
  surface.receiveShadow = true
  const random = seededRandom(81)
  for (let i = 0; i < 24; i++) {
    const angle = (i / 24) * Math.PI * 2
    const x = Math.cos(angle) * 8.3
    const z = Math.sin(angle) * 6.5
    ball(group, 0.45 + random() * 0.45, [x, -0.05, z], i % 3 === 0 ? MAT.grassLight : MAT.grass, [1.5, 0.32, 1.2])
    if (i % 2 === 0) {
      beam(group, [x, -0.6, z], [x * 0.96, -1.8 - random(), z * 0.96], 0.035, MAT.wood)
      ball(group, 0.15, [x * 0.97, -1.2, z * 0.97], MAT.grassDark)
    }
  }
  return group
}

export function tree(parent: THREE.Object3D, position: Point, scale = 1, kind: 'broad' | 'pine' | 'gold' = 'broad') {
  const group = new THREE.Group()
  group.position.set(...position)
  group.scale.setScalar(scale)
  parent.add(group)
  cylinder(group, 0.07, 0.13, 1.25, [0, 0.65, 0], MAT.wood, 7)
  if (kind === 'pine') {
    for (let i = 0; i < 4; i++) cylinder(group, 0.02, 0.72 - i * 0.14, 1.15 - i * 0.12, [0, 1.0 + i * 0.43, 0], i % 2 ? MAT.pine : MAT.grassDark, 9)
  } else {
    const foliage = kind === 'gold' ? MAT.gold : MAT.leaf
    beam(group, [0, 0.7, 0], [-0.38, 1.4, 0.12], 0.05, MAT.wood)
    beam(group, [0, 0.9, 0], [0.38, 1.6, -0.12], 0.045, MAT.wood)
    ball(group, 0.7, [-0.35, 1.65, 0.12], foliage, [0.95, 1.1, 0.95])
    ball(group, 0.72, [0.31, 1.8, -0.15], foliage, [0.85, 1.05, 0.9])
    ball(group, 0.66, [0, 2.17, 0], kind === 'gold' ? MAT.gold : MAT.grassLight, [0.85, 1, 0.9])
    ball(group, 0.55, [0.2, 1.56, 0.42], foliage)
  }
  return group
}

export function path(parent: THREE.Object3D, points: Point[], width = 0.68) {
  const random = seededRandom(53)
  const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)))
  const steps = Math.ceil(curve.getLength() * 7)
  for (let i = 0; i <= steps; i++) {
    const p = curve.getPoint(i / steps)
    const tangent = curve.getTangent(i / steps)
    const across = new THREE.Vector3(-tangent.z, 0, tangent.x)
    for (const side of [-1, 0, 1]) {
      const position = p.clone().addScaledVector(across, side * width * 0.3 + (random() - 0.5) * 0.07)
      const stone = cylinder(parent, 0.11 + random() * 0.035, 0.13, 0.045, [position.x, position.y + 0.025, position.z], i % 3 ? MAT.stoneShade : MAT.stoneEdge, 6)
      stone.scale.z = 0.78
      stone.rotation.y = random() * Math.PI
    }
  }
}

function flower(parent: THREE.Object3D, position: Point, color = MAT.roofLight, scale = 1) {
  beam(parent, position, [position[0], position[1] + 0.17 * scale, position[2]], 0.012 * scale, MAT.grassDark)
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2
    ball(parent, 0.036 * scale, [position[0] + Math.cos(a) * 0.039 * scale, position[1] + 0.17 * scale, position[2] + Math.sin(a) * 0.039 * scale], color, [1, 0.75, 1], 0)
  }
  ball(parent, 0.027 * scale, [position[0], position[1] + 0.19 * scale, position[2]], MAT.gold, undefined, 0)
}

export function makeGarden(parent: THREE.Object3D) {
  path(parent, [[-1, 0.21, 4.1], [-3.2, 0.21, 4.7], [-5.8, 0.21, 4.1]], 0.7)
  for (const x of [-6.6, -4.7]) {
    for (const z of [2.8, 4.8]) {
      box(parent, [1.45, 0.12, 1.1], [x, 0.2, z], MAT.woodLight)
      box(parent, [1.34, 0.1, 0.99], [x, 0.28, z], MAT.rock)
      for (let i = 0; i < 9; i++) flower(parent, [x - 0.48 + (i % 3) * 0.45, 0.34, z - 0.33 + Math.floor(i / 3) * 0.33], i % 3 === 0 ? MAT.gold : MAT.roofLight, 1.4)
    }
  }
  cylinder(parent, 0.46, 0.55, 0.2, [-5.7, 0.3, 3.8], MAT.stone, 16)
  flower(parent, [-5.7, 0.4, 3.8], MAT.roof, 2.2)
  const dome = mesh(parent, new THREE.SphereGeometry(0.35, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2), MAT.glass, [-5.7, 0.49, 3.8])
  dome.scale.y = 1.65
  cylinder(parent, 0.35, 0.35, 0.28, [-5.7, 0.48, 3.8], MAT.glass, 16)
  person(parent, [-6.3, 0.2, 3.6], 'gardener', Math.PI / 2)
  person(parent, [-5.2, 0.2, 4.25], 'prince', -0.7)
  box(parent, [1.1, 0.1, 0.35], [-7, 0.57, 2.8], MAT.woodLight, [0, 0.25, 0])
  box(parent, [1.1, 0.28, 0.08], [-7, 0.77, 2.65], MAT.woodLight, [0, 0.25, 0])
  for (const x of [-7.4, -6.6]) box(parent, [0.08, 0.4, 0.28], [x, 0.35, 2.8], MAT.wood)
  tree(parent, [-7.2, 0.15, 1.6], 0.9)
}

export function makeForest(parent: THREE.Object3D) {
  const trees: [number, number, number, number][] = [
    [-7, -2.3, 0.25, 1.1], [-6.1, -3.6, 0.5, 1.05], [-7.2, -4.0, 0.25, 0.8], [-5.0, -4.7, 0.65, 1.15], [-3.7, -5.5, 0.65, 0.85], [-1.9, -5.5, 0.45, 1.05], [0, -5.5, 0.3, 0.8], [2.1, -5.0, 0.45, 1], [4, -4.7, 0.6, 1.0], [5.7, -3.8, 0.3, 1.1], [7.2, -2.5, 0.25, 0.8], [-7.9, -0.5, 0.15, 0.85], [7.7, 1, 0.15, 0.85], [-6.7, -1.5, 0.15, 0.7], [5.8, -4.7, 0.2, 0.75],
  ]
  trees.forEach(([x, z, y, s], i) => {
    ball(parent, 1.4, [x, y - 0.4, z], i % 3 ? MAT.grass : MAT.grassLight, [1.4, 0.45, 1.1])
    tree(parent, [x, y, z], s, i % 3 ? 'pine' : 'broad')
  })
  for (const [x, z] of [[-6.5, -4.7], [-3.0, -5.5], [3.1, -5.4], [6.9, -3.7]]) {
    ball(parent, 0.65, [x, 0.35, z], MAT.stoneEdge, [1.1, 1.0, 0.8], 0)
    ball(parent, 0.42, [x + 0.45, 0.2, z + 0.3], MAT.rockLight, undefined, 0)
  }
  const random = seededRandom(451)
  for (let i = 0; i < 85; i++) {
    const angle = random() * Math.PI * 2
    const radius = 0.77 + random() * 0.16
    const x = Math.cos(angle) * 8.4 * radius
    const z = Math.sin(angle) * 6.5 * radius
    if (x > 2 && z > 3) continue
    if (i % 4 === 0) {
      cylinder(parent, 0.012, 0.02, 0.12, [x, 0.22, z], MAT.stone, 5)
      ball(parent, 0.09, [x, 0.3, z], MAT.roof, [1, 0.5, 1], 0)
    } else flower(parent, [x, 0.17, z], i % 2 ? MAT.gold : MAT.stone)
  }
  const fox = new THREE.Group()
  fox.position.set(-6.4, 0.3, -2.2)
  parent.add(fox)
  ball(fox, 0.2, [0, 0.16, 0], MAT.roof, [1.5, 0.75, 0.75])
  ball(fox, 0.15, [0.24, 0.29, 0], MAT.roof)
  cylinder(fox, 0, 0.06, 0.14, [0.24, 0.45, 0.065], MAT.roof, 4)
  cylinder(fox, 0, 0.06, 0.14, [0.24, 0.45, -0.065], MAT.roof, 4)
  ball(fox, 0.05, [0.37, 0.25, 0.02], MAT.stone)
  ball(fox, 0.15, [-0.34, 0.17, 0.05], MAT.roof, [1.7, 0.65, 0.7])
  ball(fox, 0.09, [-0.52, 0.18, 0.05], MAT.stone, [1.1, 0.7, 0.8])
  for (const x of [-0.13, 0.13]) for (const z of [-0.07, 0.07]) box(fox, [0.035, 0.16, 0.035], [x, 0.07, z], MAT.wood)
  for (let i = 0; i < 3; i++) {
    const x = -3.9 + i * 0.47
    ball(parent, 0.19, [x, 0.39, -4.0 - i * 0.18], MAT.stone, [1.3, 0.9, 0.9])
    ball(parent, 0.09, [x + 0.21, 0.4, -4.0 - i * 0.18], MAT.wood)
    for (const side of [-1, 1]) box(parent, [0.035, 0.2, 0.035], [x + side * 0.11, 0.21, -4.0 - i * 0.18], MAT.wood)
  }
  person(parent, [-4.3, 0.25, -4.2], 'villager', 0.7)
}

export function makeWater(parent: THREE.Object3D) {
  const shape = new THREE.Shape()
  shape.moveTo(3.4, -3.9)
  shape.bezierCurveTo(3, -3.0, 3.7, -2.4, 4.5, -2.65)
  shape.bezierCurveTo(6.7, -2.7, 7.6, -4.0, 6.2, -4.9)
  shape.bezierCurveTo(5.5, -5.3, 5.25, -5.85, 5.2, -6.0)
  shape.lineTo(4.25, -6.0)
  shape.bezierCurveTo(4.5, -5.0, 2.8, -4.8, 3.4, -3.9)
  mesh(parent, new THREE.ShapeGeometry(shape, 28), MAT.water, [0, 0.19, 0], [-Math.PI / 2, 0, 0])
  const curve = new THREE.CatmullRomCurve3([new THREE.Vector3(6.5, 0.15, -2), new THREE.Vector3(5.8, 0.15, -0.5), new THREE.Vector3(6.5, 0.15, 1.0), new THREE.Vector3(5.1, 0.15, 3.1)])
  mesh(parent, new THREE.TubeGeometry(curve, 40, 0.24, 6, false), MAT.water)
  const random = seededRandom(99)
  for (let i = 0; i < 24; i++) {
    const a = (i / 24) * Math.PI * 2
    const x = 4.8 + Math.cos(a) * 1.68
    const z = 3.8 + Math.sin(a) * 1.2
    if (z > 4.7 && x > 4 && x < 5.6) continue
    ball(parent, 0.16 + random() * 0.1, [x, 0.23, z], i % 3 ? MAT.stoneEdge : MAT.stone, [1.4, 0.7, 1], 0)
  }
  for (let i = 0; i < 11; i++) {
    const x = 3.8 + random() * 2
    const z = 3.1 + random() * 1.4
    box(parent, [0.16 + random() * 0.25, 0.012, 0.025], [x, 0.205, z], MAT.foam)
  }
  for (let i = 0; i < 8; i++) {
    const x = 4.25 + i * 0.135
    const points: THREE.Vector3[] = []
    for (let j = 0; j <= 12; j++) {
      const t = j / 12
      points.push(new THREE.Vector3(x + Math.sin(t * 8 + i) * 0.035, 0.17 - t * (4.0 + (i % 3) * 0.2), 5.87 + Math.sin(t * 2) * 0.31))
    }
    const ribbon = mesh(parent, new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 16, i % 3 ? 0.065 : 0.035, 5, false), i % 3 ? MAT.water : MAT.foam)
    ribbon.name = 'falling-water'
  }
  for (let i = 0; i < 7; i++) ball(parent, 0.19, [4.3 + random(), -3.7 - random() * 0.8, 6.12], MAT.cloud, [1.5, 0.6, 1])
  const bridge = new THREE.Group()
  bridge.position.set(6.05, 0.34, 1.45)
  bridge.rotation.y = -0.5
  parent.add(bridge)
  for (let i = 0; i < 10; i++) box(bridge, [0.86, 0.09, 0.13], [0, Math.sin((i / 9) * Math.PI) * 0.16, -0.65 + i * 0.145], MAT.woodLight)
  for (const x of [-0.42, 0.42]) {
    for (const z of [-0.65, 0, 0.65]) box(bridge, [0.06, 0.6, 0.06], [x, 0.2, z], MAT.wood)
    beam(bridge, [x, 0.5, -0.65], [x, 0.5, 0.65], 0.035, MAT.wood)
  }
  person(parent, [3.6, 0.22, 4.7], 'villager', 1.7)
  beam(parent, [3.8, 0.63, 4.7], [4.6, 1.4, 4.4], 0.015, MAT.wood)
  beam(parent, [4.6, 1.4, 4.4], [4.8, 0.2, 4.3], 0.003, MAT.stone)
}

export function makeClouds(parent: THREE.Object3D) {
  const positions: [number, number, number, number][] = [[-10, -1.2, 2.8, 1.3], [9.8, -1.9, -2.5, 1.1], [-6, -3.7, 6, 0.9], [7, -4.6, 4, 0.9], [1, -5.3, -5.2, 1.2], [-10.5, 3.6, -7.5, 0.62], [10, 4.8, -7.2, 0.7]]
  positions.forEach(([x, y, z, s], i) => {
    const cloud = new THREE.Group()
    cloud.position.set(x, y, z)
    cloud.scale.setScalar(s)
    cloud.userData.animated = 'cloud'
    cloud.userData.originX = x
    cloud.userData.phase = i * 1.7
    parent.add(cloud)
    for (let j = 0; j < 5; j++) ball(cloud, 0.65 + Math.sin(j * 2) * 0.17, [(j - 2) * 0.58, Math.sin(j * 1.6) * 0.15, Math.cos(j * 2) * 0.15], MAT.cloud, [1.15, 0.75, 0.85], 2)
  })
}
