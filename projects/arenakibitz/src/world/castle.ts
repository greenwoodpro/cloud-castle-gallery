import * as THREE from 'three'
import {
  addBarrel,
  addBed,
  addBench,
  addBookcase,
  addCandle,
  addCrate,
  addLadderStairs,
  addTable,
  box,
  createArchGeometry,
  createGableGeometry,
  cylinder,
  mesh,
  standard,
} from './geometry'

export interface CastleRefs {
  group: THREE.Group
  cutawayMaterials: THREE.MeshStandardMaterial[]
  windowMaterials: THREE.MeshStandardMaterial[]
  lights: THREE.PointLight[]
  smokeSources: THREE.Vector3[]
  flagMaterials: THREE.ShaderMaterial[]
  flames: THREE.Mesh[]
}

const stone = standard('#b8ad96')
const paleStone = standard('#c9bda5')
const darkStone = standard('#8f897c')
const slate = standard('#596d7d')
const wood = standard('#76563f')
const darkWood = standard('#594437')
const iron = standard('#4f5556', 0.55, 0.3)
const brass = standard('#b99b57', 0.42, 0.55)

function cutaway(object: THREE.Mesh, refs: CastleRefs) {
  const source = object.material as THREE.MeshStandardMaterial
  const material = source.clone()
  material.transparent = true
  material.opacity = 1
  object.material = material
  refs.cutawayMaterials.push(material)
  return object
}

function addWindow(
  parent: THREE.Object3D,
  refs: CastleRefs,
  position: [number, number, number],
  width = 0.45,
  height = 0.95,
  rotationY = 0,
  stained = false,
) {
  const frame = mesh(createArchGeometry(width + 0.16, height + 0.14, 0.07), darkStone, parent, position, [0, rotationY, 0])
  const material = new THREE.MeshStandardMaterial({
    color: stained ? '#718aaa' : '#72909a',
    emissive: stained ? '#5e6f9b' : '#e5ae62',
    emissiveIntensity: 0.12,
    roughness: 0.35,
    metalness: 0.05,
    transparent: true,
    opacity: 0.88,
  })
  refs.windowMaterials.push(material)
  const glass = mesh(createArchGeometry(width, height, 0.075), material, parent, [position[0], position[1] + 0.02, position[2]], [0, rotationY, 0])
  if (Math.abs(rotationY) < 0.01) glass.position.z += 0.045
  else glass.position.x += rotationY > 0 ? 0.045 : -0.045
  frame.castShadow = false
  glass.castShadow = false
  return glass
}

function addFlag(parent: THREE.Object3D, refs: CastleRefs, position: [number, number, number], color = '#a75f59') {
  cylinder(parent, 0.025, 0.035, 2.1, 6, [position[0], position[1] - 0.85, position[2]], darkWood)
  const geometry = new THREE.PlaneGeometry(1.25, 0.68, 12, 3)
  geometry.translate(0.625, 0, 0)
  const material = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    transparent: true,
    uniforms: {
      uTime: { value: 0 },
      uWind: { value: 0.35 },
      uColor: { value: new THREE.Color(color) },
    },
    vertexShader: `
      uniform float uTime;
      uniform float uWind;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vec3 p = position;
        float anchor = smoothstep(0.0, 0.85, p.x);
        p.z += sin(p.x * 5.0 - uTime * (2.0 + uWind * 3.0)) * 0.14 * anchor * (0.35 + uWind);
        p.y += sin(p.x * 3.0 - uTime * 2.2) * 0.045 * anchor * uWind;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      varying vec2 vUv;
      void main() {
        float border = step(0.055, vUv.y) * step(vUv.y, 0.945);
        vec2 p = vUv - vec2(0.56, 0.5);
        float star = 1.0 - smoothstep(0.02, 0.15, abs(p.x) + abs(p.y));
        vec3 gold = vec3(0.91, 0.75, 0.42);
        vec3 col = mix(uColor * 0.78, uColor, border);
        col = mix(col, gold, star * 0.85);
        gl_FragColor = vec4(col, 0.96);
      }
    `,
  })
  refs.flagMaterials.push(material)
  const flag = mesh(geometry, material, parent, position)
  flag.castShadow = false
  return flag
}

function addCurtainWall(
  parent: THREE.Object3D,
  length: number,
  position: [number, number, number],
  rotationY = 0,
) {
  const group = new THREE.Group()
  group.position.set(...position)
  group.rotation.y = rotationY
  parent.add(group)
  box(group, [length, 3.25, 0.62], [0, 1.77, 0], stone)
  box(group, [length + 0.08, 0.18, 0.92], [0, 3.35, 0], paleStone)
  const count = Math.floor(length / 0.85)
  for (let i = 0; i <= count; i++) {
    const x = -length / 2 + (i / count) * length
    box(group, [0.48, 0.58, 0.7], [x, 3.68, 0], paleStone)
  }
  for (let i = 0; i < Math.floor(length / 2.4); i++) {
    const x = -length / 2 + 1.1 + i * 2.4
    const slit = box(group, [0.11, 0.65, 0.025], [x, 2.05, 0.325], standard('#5f625e'))
    slit.castShadow = false
  }
  return group
}

function addRoundTower(parent: THREE.Object3D, refs: CastleRefs, x: number, z: number, roof: boolean, height = 4.7) {
  const group = new THREE.Group()
  group.position.set(x, 0.15, z)
  parent.add(group)
  cylinder(group, 1.12, 1.22, height, 14, [0, height / 2, 0], stone)
  cylinder(group, 1.25, 1.25, 0.18, 14, [0, height - 0.12, 0], paleStone)
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2
    box(group, [0.42, 0.55, 0.4], [Math.sin(a) * 1.03, height + 0.17, Math.cos(a) * 1.03], paleStone, [0, a, 0])
  }
  if (roof) {
    cylinder(group, 0, 1.45, 2.25, 14, [0, height + 1.25, 0], slate)
    mesh(new THREE.SphereGeometry(0.09, 7, 5), brass, group, [0, height + 2.43, 0])
  }
  for (let floor = 0; floor < 2; floor++) {
    addWindow(group, refs, [0, 1.15 + floor * 2.05, 1.17], 0.32, 0.72)
  }
  return group
}

function addFireplace(parent: THREE.Object3D, refs: CastleRefs, position: [number, number, number], rotationY = 0, scale = 1) {
  const group = new THREE.Group()
  group.position.set(...position)
  group.rotation.y = rotationY
  group.scale.setScalar(scale)
  parent.add(group)
  box(group, [1.5, 1.5, 0.35], [0, 0.75, 0], darkStone)
  box(group, [0.86, 0.85, 0.38], [0, 0.43, 0.08], standard('#3f403b'))
  box(group, [1.75, 0.18, 0.56], [0, 1.46, 0.05], paleStone)
  for (const x of [-0.24, 0, 0.24]) {
    const flame = mesh(new THREE.ConeGeometry(0.13, 0.45, 7), new THREE.MeshBasicMaterial({ color: x === 0 ? '#ffd078' : '#d9824f' }), group, [x, 0.34, 0.32])
    flame.userData.baseY = flame.position.y
    refs.flames.push(flame)
  }
  const light = new THREE.PointLight('#ffb66b', 0.65, 7, 2)
  light.position.set(0, 0.75, 0.8)
  group.add(light)
  refs.lights.push(light)
  return group
}

function buildKeep(parent: THREE.Object3D, refs: CastleRefs) {
  const keep = new THREE.Group()
  keep.name = '三层主塔与星象亭'
  parent.add(keep)
  const cx = -3
  const cz = -1
  const width = 4.8
  const depth = 4.8
  const left = cx - width / 2
  const right = cx + width / 2
  const back = cz - depth / 2
  const front = cz + depth / 2
  const floorLevels = [0.25, 3.25, 6.3, 8.95]

  box(keep, [width, 0.38, depth], [cx, 0.18, cz], darkStone)
  box(keep, [0.38, 8.8, depth], [left, 4.65, cz], stone)
  box(keep, [0.38, 8.8, depth], [right, 4.65, cz], stone)
  box(keep, [width, 8.8, 0.38], [cx, 4.65, back], stone)
  for (let floor = 0; floor < 3; floor++) {
    const base = floorLevels[floor]
    const wall = box(keep, [width, 2.85, 0.34], [cx, base + 1.47, front], stone)
    cutaway(wall, refs)
    const slab = box(keep, [width - 0.35, 0.17, depth - 0.35], [cx, floorLevels[floor + 1], cz], floor === 2 ? paleStone : wood)
    if (floor === 2) cutaway(slab, refs)
    for (const wx of [cx - 1.25, cx + 1.25]) {
      const window = addWindow(keep, refs, [wx, base + 1.05, front + 0.19], 0.48, 1.05)
      cutaway(window, refs)
    }
    if (floor > 0) {
      addWindow(keep, refs, [left - 0.2, base + 1.0, cz - 0.7], 0.42, 0.95, -Math.PI / 2)
      addWindow(keep, refs, [right + 0.2, base + 1.0, cz + 0.4], 0.42, 0.95, Math.PI / 2)
    }
  }

  // Ground floor: guard room, armory and stores.
  addTable(keep, [-3.2, 0.3, -0.7], 1.55, 0.85)
  addBench(keep, [-2.45, 0.3, -0.7], 1.5)
  addBarrel(keep, [-4.75, 0.3, -2.55], 0.9)
  addBarrel(keep, [-4.15, 0.3, -2.7], 0.75)
  addCrate(keep, [-1.25, 0.3, -2.65], 0.8)
  const rack = new THREE.Group()
  rack.position.set(-4.85, 0.35, 0.1)
  keep.add(rack)
  box(rack, [0.16, 1.5, 1.6], [0, 0.75, 0], darkWood)
  for (let i = 0; i < 4; i++) {
    cylinder(rack, 0.025, 0.025, 1.45, 5, [0.14, 0.85, -0.55 + i * 0.36], iron, [0, 0, -0.12 + i * 0.07])
    box(rack, [0.08, 0.06, 0.4], [0.16, 0.45, -0.55 + i * 0.36], brass)
  }
  addLadderStairs(keep, [-1.35, 0.3, 0.75], 2.9, Math.PI)

  // Second floor: solar, open library and writing desk.
  addBed(keep, [-4.1, 3.34, -1.65], 0)
  addBookcase(keep, [-1.25, 3.34, -2.95], 0)
  const desk = addTable(keep, [-2.4, 3.34, 0.15], 1.15, 0.8)
  desk.rotation.y = Math.PI / 2
  addCandle(keep, [-2.4, 4.24, 0.1], 0.28)
  addBench(keep, [-3.05, 3.34, 0.2], 0.75, Math.PI / 2)
  const rug = box(keep, [1.75, 0.025, 2.15], [-3.25, 3.38, -0.75], standard('#788c82'))
  rug.castShadow = false
  addFireplace(keep, refs, [-4.95, 3.35, -0.2], Math.PI / 2, 0.75)
  addLadderStairs(keep, [-1.35, 3.35, 0.75], 2.85, Math.PI)

  // Third floor: map room and stair to the roof.
  addBookcase(keep, [-4.75, 6.4, -2.75], 0)
  addTable(keep, [-3, 6.4, -0.9], 1.9, 1.15)
  for (let i = 0; i < 5; i++) {
    const paper = box(keep, [0.45, 0.018, 0.62], [-3.65 + i * 0.32, 7.29 + i * 0.002, -0.9 + Math.sin(i) * 0.16], standard(i % 2 ? '#d8c9a5' : '#e4d9bb'), [0, i * 0.18, 0])
    paper.castShadow = false
  }
  addCandle(keep, [-2.5, 7.29, -0.75], 0.33)
  addLadderStairs(keep, [-1.35, 6.4, 0.75], 2.5, Math.PI)

  // Open observatory above the keep.
  const pavilion = new THREE.Group()
  pavilion.position.set(cx, 9.02, cz)
  keep.add(pavilion)
  cylinder(pavilion, 2.05, 2.05, 0.18, 8, [0, 0, 0], paleStone)
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2
    cylinder(pavilion, 0.055, 0.065, 1.75, 7, [Math.sin(a) * 1.75, 0.93, Math.cos(a) * 1.75], wood)
  }
  const roof = cylinder(pavilion, 0.35, 2.35, 1.05, 8, [0, 2.15, 0], slate)
  cutaway(roof, refs)
  const telescope = new THREE.Group()
  telescope.position.set(0.25, 0.45, -0.2)
  telescope.rotation.y = -0.55
  pavilion.add(telescope)
  cylinder(telescope, 0.14, 0.2, 1.6, 10, [0, 1.05, 0], brass, [Math.PI / 2.8, 0, 0])
  cylinder(telescope, 0.05, 0.07, 1.1, 7, [0, 0.45, 0.15], darkWood)
  const orrery = new THREE.Group()
  orrery.position.set(-0.9, 0.65, 0.65)
  pavilion.add(orrery)
  cylinder(orrery, 0.28, 0.35, 0.12, 12, [0, 0, 0], brass)
  mesh(new THREE.SphereGeometry(0.13, 10, 7), new THREE.MeshBasicMaterial({ color: '#e3b862' }), orrery, [0, 0.43, 0])
  const orbit = mesh(new THREE.TorusGeometry(0.47, 0.015, 5, 32), brass, orrery, [0, 0.43, 0], [Math.PI / 2, 0, 0])
  orbit.castShadow = false
  mesh(new THREE.SphereGeometry(0.065, 8, 6), standard('#8ca4ad'), orrery, [0.47, 0.43, 0])
  addFlag(keep, refs, [-5.05, 11.75, -2.85], '#9c625e')
  return keep
}

function buildGreatHall(parent: THREE.Object3D, refs: CastleRefs) {
  const hall = new THREE.Group()
  hall.name = '大厅与厨房'
  parent.add(hall)
  const cx = 2.15
  const cz = -1
  const w = 4.3
  const d = 7
  box(hall, [w, 0.3, d], [cx, 0.2, cz], darkStone)
  box(hall, [0.32, 4.25, d], [cx + w / 2, 2.3, cz], stone)
  box(hall, [w, 4.25, 0.32], [cx, 2.3, cz - d / 2], stone)
  box(hall, [0.26, 4.25, d], [cx - w / 2, 2.3, cz], stone)
  cutaway(box(hall, [w, 4.25, 0.28], [cx, 2.3, cz + d / 2], stone), refs)
  const roof = mesh(createGableGeometry(w + 0.55, d + 0.55, 2), slate, hall, [cx, 4.43, cz])
  ;(roof.material as THREE.MeshStandardMaterial).side = THREE.DoubleSide
  cutaway(roof, refs)
  for (const z of [-3.2, -1.2, 0.8]) addWindow(hall, refs, [cx + w / 2 + 0.18, 1.55, z], 0.48, 1.2, Math.PI / 2)
  for (const x of [0.95, 3.3]) cutaway(addWindow(hall, refs, [x, 1.35, cz + d / 2 + 0.16], 0.52, 1.3), refs)

  addTable(hall, [2.15, 0.34, -0.8], 4.2, 1.05)
  addBench(hall, [1.3, 0.34, -0.8], 4.1)
  addBench(hall, [3.0, 0.34, -0.8], 4.1)
  for (const z of [-2.1, -0.8, 0.5]) {
    addCandle(hall, [2.15, 1.25, z], 0.26)
    cylinder(hall, 0.12, 0.12, 0.035, 12, [1.85, 1.24, z + 0.25], standard('#b9aa86'))
  }
  addFireplace(hall, refs, [2.15, 0.35, -4.25], 0, 1.15)
  refs.smokeSources.push(new THREE.Vector3(2.15, 7.3, -4.1))
  box(hall, [0.65, 2.6, 0.65], [2.15, 5.7, -4.1], darkStone)

  // Kitchen occupies the south end, with a real work sequence.
  box(hall, [3.65, 0.14, 0.75], [2.15, 0.95, 1.85], wood)
  for (const x of [0.65, 3.65]) box(hall, [0.15, 0.9, 0.6], [x, 0.48, 1.85], darkWood)
  cylinder(hall, 0.36, 0.28, 0.28, 12, [3.25, 1.18, 1.8], standard('#8b6a50', 0.45, 0.25))
  cylinder(hall, 0.28, 0.34, 0.6, 12, [0.7, 0.63, 1.25], standard('#b39772'))
  addBarrel(hall, [3.65, 0.34, 0.85], 0.75)
  addCrate(hall, [0.65, 0.34, 0.7], 0.72)
  const gallery = box(hall, [3.9, 0.16, 1.15], [2.15, 2.8, -3.65], wood)
  gallery.castShadow = true
  for (const x of [0.45, 3.85]) box(hall, [0.12, 2.5, 0.12], [x, 1.55, -3.65], darkWood)
  addBench(hall, [2.15, 2.9, -3.65], 0.8)
  return hall
}

function buildChapel(parent: THREE.Object3D, refs: CastleRefs) {
  const chapel = new THREE.Group()
  chapel.name = '彩窗礼拜堂'
  parent.add(chapel)
  const cx = -6.45
  const cz = -0.35
  const w = 2.55
  const d = 4.1
  box(chapel, [w, 0.28, d], [cx, 0.2, cz], darkStone)
  box(chapel, [0.28, 3.65, d], [cx - w / 2, 2.05, cz], paleStone)
  box(chapel, [0.28, 3.65, d], [cx + w / 2, 2.05, cz], paleStone)
  box(chapel, [w, 3.65, 0.28], [cx, 2.05, cz - d / 2], paleStone)
  cutaway(box(chapel, [w, 3.65, 0.25], [cx, 2.05, cz + d / 2], paleStone), refs)
  const roof = mesh(createGableGeometry(w + 0.4, d + 0.4, 1.6), standard('#6b7186'), chapel, [cx, 3.88, cz])
  ;(roof.material as THREE.MeshStandardMaterial).side = THREE.DoubleSide
  cutaway(roof, refs)
  const stained = addWindow(chapel, refs, [cx, 1.3, cz - d / 2 - 0.16], 1.05, 1.85, Math.PI, true)
  stained.material = new THREE.MeshStandardMaterial({ color: '#777da5', emissive: '#7c6d9d', emissiveIntensity: 0.6, transparent: true, opacity: 0.85 })
  refs.windowMaterials.push(stained.material as THREE.MeshStandardMaterial)
  for (let row = 0; row < 5; row++) {
    for (const side of [-1, 1]) addBench(chapel, [cx + side * 0.58, 0.33, cz - 0.75 + row * 0.56], 0.85)
  }
  box(chapel, [1.45, 0.85, 0.68], [cx, 0.77, cz - 1.55], paleStone)
  box(chapel, [1.65, 0.12, 0.82], [cx, 1.23, cz - 1.55], standard('#d2c5aa'))
  for (const x of [-0.52, 0.52]) addCandle(chapel, [cx + x, 1.3, cz - 1.55], 0.42)
  const cross = new THREE.Group()
  cross.position.set(cx, 2.1, cz - 1.92)
  chapel.add(cross)
  box(cross, [0.09, 0.8, 0.08], [0, 0, 0], brass)
  box(cross, [0.48, 0.09, 0.08], [0, 0.13, 0], brass)
  return chapel
}

function buildGate(parent: THREE.Object3D, refs: CastleRefs) {
  const gate = new THREE.Group()
  gate.name = '晨钟城门'
  parent.add(gate)
  addRoundTower(gate, refs, -2.55, 5, true, 4.35)
  addRoundTower(gate, refs, 0.55, 5, true, 4.35)
  box(gate, [1.25, 1.45, 0.7], [-1, 4.0, 5], stone)
  const arch = mesh(createArchGeometry(2.0, 3.0, 0.72), darkStone, gate, [-1, 0.2, 5])
  arch.scale.set(1.2, 1.15, 1)
  // A dark arched opening sits in front of a raised portcullis.
  const opening = mesh(createArchGeometry(1.6, 2.55, 0.76), new THREE.MeshBasicMaterial({ color: '#4a4b47' }), gate, [-1, 0.22, 5.02])
  opening.castShadow = false
  for (let i = 0; i < 7; i++) box(gate, [0.045, 1.7, 0.06], [-1.65 + i * 0.215, 2.45, 5.45], iron)
  box(gate, [1.55, 0.06, 0.07], [-1, 2.15, 5.45], iron)
  box(gate, [1.55, 0.06, 0.07], [-1, 2.75, 5.45], iron)
  // Wooden drawbridge and individual planks.
  const bridge = new THREE.Group()
  bridge.position.set(-1, 0.15, 6.6)
  gate.add(bridge)
  for (let i = 0; i < 12; i++) box(bridge, [2.05, 0.14, 0.25], [0, Math.sin(i * 0.4) * 0.025, -1.35 + i * 0.25], i % 3 === 0 ? standard('#8e6b48') : wood)
  for (const x of [-0.83, 0.83]) {
    cylinder(bridge, 0.025, 0.025, 3.4, 6, [x, 1.35, -0.9], iron, [Math.PI / 3.2, 0, 0])
  }
  addTable(gate, [-2.25, 0.35, 3.95], 0.8, 0.55)
  addCandle(gate, [-2.25, 1.25, 3.95], 0.24)
  addFlag(gate, refs, [0.55, 8.2, 5], '#6e7f9a')
  return gate
}

function buildCourtyard(parent: THREE.Object3D, refs: CastleRefs) {
  const courtyard = new THREE.Group()
  courtyard.name = '回声庭院'
  parent.add(courtyard)
  // Well with stone rim, timber canopy and a visible bucket.
  const well = new THREE.Group()
  well.position.set(-1.8, 0.25, 2.65)
  courtyard.add(well)
  cylinder(well, 0.68, 0.75, 0.72, 14, [0, 0.36, 0], darkStone)
  cylinder(well, 0.48, 0.48, 0.75, 14, [0, 0.48, 0], new THREE.MeshBasicMaterial({ color: '#4d6265' }))
  for (const x of [-0.72, 0.72]) box(well, [0.12, 1.85, 0.12], [x, 1.25, 0], wood)
  cylinder(well, 0.07, 0.07, 1.65, 8, [0, 1.45, 0], darkWood, [0, 0, Math.PI / 2])
  const canopy = mesh(createGableGeometry(2, 1.35, 0.65), slate, well, [0, 2.05, 0])
  ;(canopy.material as THREE.MeshStandardMaterial).side = THREE.DoubleSide
  cylinder(well, 0.18, 0.14, 0.32, 10, [0.15, 0.95, 0], standard('#7c664c'))
  addBarrel(courtyard, [-4.8, 0.3, 2.2], 0.8)
  addCrate(courtyard, [-4.15, 0.3, 2.35], 0.7)
  addBench(courtyard, [-0.2, 0.3, 1.85], 1.6, Math.PI / 2)
  // Notice frame with actual separate paper sheets.
  box(courtyard, [1.25, 1.05, 0.1], [-3.8, 1.35, 1.65], wood)
  for (let i = 0; i < 3; i++) box(courtyard, [0.3, 0.42, 0.025], [-4.18 + i * 0.38, 1.38 + (i % 2) * 0.08, 1.72], standard(i === 1 ? '#d8c7a5' : '#e5d9bb'), [0, 0, (i - 1) * 0.08])
  // Lanterns are genuine light sources at night.
  for (const [x, y, z] of [[-0.2, 2.2, 4.65], [-5.1, 2.2, 1.6], [0.1, 2.2, 1.65]] as [number, number, number][]) {
    box(courtyard, [0.08, 0.6, 0.08], [x, y + 0.3, z], iron)
    const lampMat = new THREE.MeshStandardMaterial({ color: '#d8b66e', emissive: '#ffb45d', emissiveIntensity: 0.4 })
    refs.windowMaterials.push(lampMat)
    mesh(new THREE.OctahedronGeometry(0.18, 0), lampMat, courtyard, [x, y, z])
    const light = new THREE.PointLight('#ffc477', 0.3, 6, 2)
    light.position.set(x, y, z)
    courtyard.add(light)
    refs.lights.push(light)
  }
  return courtyard
}

export function buildCastle(): CastleRefs {
  const refs: CastleRefs = {
    group: new THREE.Group(),
    cutawayMaterials: [],
    windowMaterials: [],
    lights: [],
    smokeSources: [],
    flagMaterials: [],
    flames: [],
  }
  refs.group.name = '云上玫瑰堡'
  addCurtainWall(refs.group, 13, [-1.5, 0, -5], 0)
  addCurtainWall(refs.group, 10, [-8, 0, 0], Math.PI / 2)
  addCurtainWall(refs.group, 10, [5, 0, 0], Math.PI / 2)
  addCurtainWall(refs.group, 5.1, [-5.45, 0, 5], 0)
  addCurtainWall(refs.group, 3.25, [3.38, 0, 5], 0)
  addRoundTower(refs.group, refs, -8, -5, false, 4.8)
  addRoundTower(refs.group, refs, 5, -5, true, 4.8)
  addRoundTower(refs.group, refs, -8, 5, true, 4.6)
  addRoundTower(refs.group, refs, 5, 5, false, 4.6)
  buildKeep(refs.group, refs)
  buildGreatHall(refs.group, refs)
  buildChapel(refs.group, refs)
  buildGate(refs.group, refs)
  buildCourtyard(refs.group, refs)

  // Stair to the wall walk and small masonry repairs make the silhouette lived-in.
  for (let i = 0; i < 10; i++) box(refs.group, [1.05, 0.28, 0.42], [4.15, 0.35 + i * 0.3, 3.8 - i * 0.36], darkStone)
  for (let i = 0; i < 16; i++) {
    const x = -7.4 + ((i * 37) % 110) / 10
    box(refs.group, [0.34 + (i % 3) * 0.08, 0.18, 0.06], [x, 0.7 + (i % 5) * 0.5, -4.68], paleStone)
  }
  return refs
}
