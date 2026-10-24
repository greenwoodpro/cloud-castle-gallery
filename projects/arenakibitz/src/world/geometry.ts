import * as THREE from 'three'

export function standard(color: string | number, roughness = 0.88, metalness = 0) {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness })
}

export function mesh(
  geometry: THREE.BufferGeometry,
  material: THREE.Material,
  parent: THREE.Object3D,
  position: [number, number, number] = [0, 0, 0],
  rotation: [number, number, number] = [0, 0, 0],
) {
  const object = new THREE.Mesh(geometry, material)
  object.position.set(...position)
  object.rotation.set(...rotation)
  object.castShadow = true
  object.receiveShadow = true
  parent.add(object)
  return object
}

export function box(
  parent: THREE.Object3D,
  size: [number, number, number],
  position: [number, number, number],
  material: THREE.Material,
  rotation: [number, number, number] = [0, 0, 0],
) {
  return mesh(new THREE.BoxGeometry(...size), material, parent, position, rotation)
}

export function cylinder(
  parent: THREE.Object3D,
  radiusTop: number,
  radiusBottom: number,
  height: number,
  segments: number,
  position: [number, number, number],
  material: THREE.Material,
  rotation: [number, number, number] = [0, 0, 0],
) {
  return mesh(new THREE.CylinderGeometry(radiusTop, radiusBottom, height, segments), material, parent, position, rotation)
}

export function createGableGeometry(width: number, depth: number, height: number) {
  const w = width / 2
  const d = depth / 2
  const positions = new Float32Array([
    -w, 0, -d, w, 0, -d, 0, height, -d,
    -w, 0, d, 0, height, d, w, 0, d,
    -w, 0, -d, 0, height, -d, -w, 0, d,
    -w, 0, d, 0, height, -d, 0, height, d,
    w, 0, -d, w, 0, d, 0, height, -d,
    w, 0, d, 0, height, d, 0, height, -d,
    -w, 0, -d, -w, 0, d, w, 0, -d,
    -w, 0, d, w, 0, d, w, 0, -d,
  ])
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.computeVertexNormals()
  return geometry
}

export function createRibbonGeometry(
  points: [number, number, number][],
  width: number,
  segments = 72,
  widthVariation = 0,
) {
  const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)))
  const positions: number[] = []
  const uvs: number[] = []
  const indices: number[] = []
  for (let i = 0; i <= segments; i++) {
    const t = i / segments
    const p = curve.getPoint(t)
    const tangent = curve.getTangent(t).normalize()
    const side = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize()
    const w = width * (1 + Math.sin(t * 19.3) * widthVariation) * 0.5
    const left = p.clone().addScaledVector(side, w)
    const right = p.clone().addScaledVector(side, -w)
    positions.push(left.x, left.y, left.z, right.x, right.y, right.z)
    uvs.push(0, t * 8, 1, t * 8)
    if (i < segments) {
      const a = i * 2
      indices.push(a, a + 2, a + 1, a + 2, a + 3, a + 1)
    }
  }
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))
  geometry.setIndex(indices)
  geometry.computeVertexNormals()
  return geometry
}

export function createArchGeometry(width: number, height: number, depth = 0.045) {
  const shape = new THREE.Shape()
  const w = width / 2
  shape.moveTo(-w, 0)
  shape.lineTo(-w, height * 0.57)
  shape.quadraticCurveTo(-w, height * 0.83, 0, height)
  shape.quadraticCurveTo(w, height * 0.83, w, height * 0.57)
  shape.lineTo(w, 0)
  shape.closePath()
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: false,
    curveSegments: 5,
  })
  geometry.translate(0, 0, -depth / 2)
  return geometry
}

export function addTable(parent: THREE.Object3D, position: [number, number, number], length = 2.6, width = 0.9) {
  const group = new THREE.Group()
  group.position.set(...position)
  parent.add(group)
  const wood = standard('#8a6043')
  const dark = standard('#624835')
  box(group, [width, 0.13, length], [0, 0.82, 0], wood)
  for (const x of [-width * 0.34, width * 0.34]) {
    for (const z of [-length * 0.36, length * 0.36]) box(group, [0.12, 0.8, 0.12], [x, 0.4, z], dark)
  }
  return group
}

export function addBench(parent: THREE.Object3D, position: [number, number, number], length = 2.4, rotationY = 0) {
  const group = new THREE.Group()
  group.position.set(...position)
  group.rotation.y = rotationY
  parent.add(group)
  const wood = standard('#876345')
  box(group, [0.35, 0.1, length], [0, 0.48, 0], wood)
  for (const z of [-length * 0.34, length * 0.34]) box(group, [0.25, 0.46, 0.13], [0, 0.23, z], wood)
  return group
}

export function addBarrel(parent: THREE.Object3D, position: [number, number, number], scale = 1) {
  const group = new THREE.Group()
  group.position.set(...position)
  group.scale.setScalar(scale)
  parent.add(group)
  cylinder(group, 0.27, 0.3, 0.65, 10, [0, 0.33, 0], standard('#8f6948'))
  const hoop = standard('#565b58', 0.55, 0.25)
  cylinder(group, 0.306, 0.306, 0.045, 10, [0, 0.17, 0], hoop)
  cylinder(group, 0.286, 0.286, 0.045, 10, [0, 0.52, 0], hoop)
  return group
}

export function addCrate(parent: THREE.Object3D, position: [number, number, number], scale = 1) {
  const group = new THREE.Group()
  group.position.set(...position)
  group.scale.setScalar(scale)
  parent.add(group)
  const wood = standard('#9c7953')
  box(group, [0.65, 0.58, 0.65], [0, 0.29, 0], wood)
  const slat = standard('#6f5239')
  for (const y of [0.07, 0.51]) {
    box(group, [0.69, 0.06, 0.05], [0, y, 0.33], slat)
    box(group, [0.05, 0.06, 0.69], [0.33, y, 0], slat)
  }
  box(group, [0.07, 0.66, 0.04], [0, 0.29, 0.36], slat, [0, 0, 0.72])
  return group
}

export function addCandle(parent: THREE.Object3D, position: [number, number, number], height = 0.3) {
  const group = new THREE.Group()
  group.position.set(...position)
  parent.add(group)
  cylinder(group, 0.035, 0.04, height, 7, [0, height / 2, 0], standard('#e8d9ae'))
  const flameMaterial = new THREE.MeshBasicMaterial({ color: '#ffd080' })
  const flame = mesh(new THREE.SphereGeometry(0.045, 6, 5), flameMaterial, group, [0, height + 0.045, 0])
  flame.scale.set(0.75, 1.35, 0.75)
  flame.userData.flame = true
  return group
}

export function addBookcase(parent: THREE.Object3D, position: [number, number, number], rotationY = 0) {
  const group = new THREE.Group()
  group.position.set(...position)
  group.rotation.y = rotationY
  parent.add(group)
  const wood = standard('#674c3c')
  box(group, [1.25, 1.8, 0.18], [0, 0.9, -0.12], wood)
  for (const x of [-0.62, 0.62]) box(group, [0.1, 1.9, 0.38], [x, 0.95, 0], wood)
  const bookColors = ['#8d5d58', '#5e7680', '#a08152', '#6f7b5f', '#8a7088']
  for (let shelf = 0; shelf < 4; shelf++) {
    const y = 0.18 + shelf * 0.47
    box(group, [1.25, 0.07, 0.42], [0, y, 0], wood)
    for (let i = 0; i < 7; i++) {
      const h = 0.25 + ((i * 13 + shelf * 7) % 10) * 0.012
      box(group, [0.11, h, 0.25], [-0.48 + i * 0.155, y + 0.04 + h / 2, 0.06], standard(bookColors[(i + shelf) % bookColors.length]))
    }
  }
  return group
}

export function addBed(parent: THREE.Object3D, position: [number, number, number], rotationY = 0) {
  const group = new THREE.Group()
  group.position.set(...position)
  group.rotation.y = rotationY
  parent.add(group)
  const wood = standard('#725444')
  box(group, [1.25, 0.24, 2.05], [0, 0.38, 0], wood)
  box(group, [1.17, 0.18, 1.94], [0, 0.57, 0], standard('#ded2b8'))
  box(group, [1.18, 0.09, 1.25], [0, 0.69, 0.28], standard('#81958a'))
  box(group, [0.82, 0.16, 0.42], [0, 0.72, -0.68], standard('#eee4cf'))
  box(group, [1.35, 1.25, 0.12], [0, 0.65, -1.02], wood)
  for (const x of [-0.65, 0.65]) {
    cylinder(group, 0.055, 0.065, 1.65, 7, [x, 0.83, -1.02], wood)
    mesh(new THREE.SphereGeometry(0.09, 7, 5), standard('#b79b62'), group, [x, 1.68, -1.02])
  }
  return group
}

export function addLadderStairs(parent: THREE.Object3D, position: [number, number, number], height = 2.8, rotationY = 0) {
  const group = new THREE.Group()
  group.position.set(...position)
  group.rotation.y = rotationY
  parent.add(group)
  const material = standard('#7a5b42')
  const steps = 11
  for (let i = 0; i < steps; i++) {
    box(group, [0.85, 0.16, 0.38], [0, (i + 0.5) * (height / steps), -i * 0.25], material)
  }
  return group
}

export function seededRandom(seed: number) {
  let value = seed >>> 0
  return () => {
    value += 0x6d2b79f5
    let t = value
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
