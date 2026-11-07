import * as THREE from 'three'
import { DAY_NIGHT, PALETTE } from './palette'
import { fbm2, makeRandom, pick, range } from './noise'
import { cone, cyl, matte, sphere, uniqueMatte } from './materials'
import { ISLAND } from './island'
import { buildTree } from './terrain'

/**
 * 环境：渐变天穹、日月、星空、云、远处的小浮岛、萤火。
 * 昼夜切换通过对 uniform / 材质参数插值完成，避免重建几何体。
 */

// ---------- 天穹 ----------

const SKY_VERT = /* glsl */ `
  varying vec3 vWorld;
  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorld = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`

const SKY_FRAG = /* glsl */ `
  uniform vec3 uTop;
  uniform vec3 uMid;
  uniform vec3 uBottom;
  uniform float uHorizon;
  varying vec3 vWorld;
  void main() {
    float h = normalize(vWorld).y;
    // 地平线附近偏暖，天顶偏冷
    float t = clamp(h * 1.15 + 0.12, -1.0, 1.0);
    vec3 col;
    if (t > uHorizon) {
      col = mix(uMid, uTop, smoothstep(uHorizon, 1.0, t));
    } else {
      col = mix(uMid, uBottom, smoothstep(uHorizon, -0.55, t));
    }
    gl_FragColor = vec4(col, 1.0);
  }
`

export interface Sky {
  mesh: THREE.Mesh
  uniforms: {
    uTop: { value: THREE.Color }
    uMid: { value: THREE.Color }
    uBottom: { value: THREE.Color }
    uHorizon: { value: number }
  }
}

export function buildSky(): Sky {
  const uniforms = {
    uTop: { value: new THREE.Color(PALETTE.skyDayTop) },
    uMid: { value: new THREE.Color(PALETTE.skyDayMid) },
    uBottom: { value: new THREE.Color(PALETTE.skyDayBottom) },
    uHorizon: { value: 0.12 },
  }
  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(600, 40, 28),
    new THREE.ShaderMaterial({
      uniforms,
      vertexShader: SKY_VERT,
      fragmentShader: SKY_FRAG,
      side: THREE.BackSide,
      depthWrite: false,
      fog: false,
    }),
  )
  mesh.name = 'sky'
  mesh.frustumCulled = false
  return { mesh, uniforms }
}

// ---------- 星空 ----------

export interface Stars {
  points: THREE.Points
  material: THREE.PointsMaterial
  twinkleSeeds: Float32Array
}

let dotTextureInstance: THREE.Texture | null = null
/** 径向渐变的圆点贴图：让星与萤火是圆光点而不是方块。 */
function dotTexture(): THREE.Texture {
  if (dotTextureInstance) return dotTextureInstance
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  grad.addColorStop(0, 'rgba(255,255,255,1)')
  grad.addColorStop(0.4, 'rgba(255,255,255,0.8)')
  grad.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, size, size)
  dotTextureInstance = new THREE.CanvasTexture(canvas)
  return dotTextureInstance
}

export function buildStars(): Stars {
  const count = 1400
  const positions = new Float32Array(count * 3)
  const sizes = new Float32Array(count)
  const seeds = new Float32Array(count)
  const rand = makeRandom(90210)

  for (let i = 0; i < count; i++) {
    // 只分布在上半球偏上的区域，地平线以下不需要
    const u = rand()
    const v = range(rand, 0.02, 1.0)
    const theta = u * Math.PI * 2
    const phi = Math.acos(1 - v * 0.95)
    const r = 520
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = r * Math.cos(phi)
    positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
    sizes[i] = range(rand, 1.2, 3.6)
    seeds[i] = rand() * Math.PI * 2
  }

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  const material = new THREE.PointsMaterial({
    color: PALETTE.star,
    size: 3.2,
    sizeAttenuation: false,
    map: dotTexture(),
    alphaTest: 0.02,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    fog: false,
  })
  const points = new THREE.Points(geo, material)
  points.frustumCulled = false
  points.name = 'stars'
  void sizes
  return { points, material, twinkleSeeds: seeds }
}

// ---------- 日 / 月 ----------

export interface CelestialBody {
  group: THREE.Group
  disc: THREE.Mesh
  halo: THREE.Mesh
  light: THREE.DirectionalLight
}

function makeBody(color: string, radius: number, haloScale: number): { group: THREE.Group; disc: THREE.Mesh; halo: THREE.Mesh } {
  const group = new THREE.Group()
  const disc = new THREE.Mesh(
    new THREE.CircleGeometry(radius, 32),
    new THREE.MeshBasicMaterial({ color: new THREE.Color(color), transparent: true, opacity: 0.95, depthWrite: false, fog: false }),
  )
  group.add(disc)
  const halo = new THREE.Mesh(
    new THREE.CircleGeometry(radius * haloScale, 32),
    new THREE.MeshBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: 0.16,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      fog: false,
    }),
  )
  halo.position.z = -0.5
  group.add(halo)
  const halo2 = new THREE.Mesh(
    new THREE.CircleGeometry(radius * haloScale * 1.9, 32),
    new THREE.MeshBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: 0.06,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      fog: false,
    }),
  )
  halo2.position.z = -1
  group.add(halo2)
  return { group, disc, halo }
}

export function buildSun(): CelestialBody {
  const { group, disc, halo } = makeBody(PALETTE.sun, 26, 2.4)
  group.name = 'sun'
  const light = new THREE.DirectionalLight(new THREE.Color(DAY_NIGHT.day.sunColor), DAY_NIGHT.day.sunIntensity)
  light.position.set(120, 150, 90)
  light.castShadow = true
  light.shadow.mapSize.set(2048, 2048)
  light.shadow.camera.near = 10
  light.shadow.camera.far = 460
  light.shadow.camera.left = -95
  light.shadow.camera.right = 95
  light.shadow.camera.top = 95
  light.shadow.camera.bottom = -95
  light.shadow.bias = -0.0006
  light.shadow.normalBias = 0.6
  group.userData.light = light
  void disc
  void halo
  return { group, disc, halo, light }
}

export function buildMoon(): CelestialBody {
  const { group, disc, halo } = makeBody(PALETTE.moon, 17, 2.8)
  group.name = 'moon'
  // 月面环形山
  const rand = makeRandom(555)
  for (let i = 0; i < 7; i++) {
    const crater = new THREE.Mesh(
      new THREE.CircleGeometry(range(rand, 1.6, 4.2), 14),
      new THREE.MeshBasicMaterial({ color: new THREE.Color('#dcd8c6'), transparent: true, opacity: 0.55, depthWrite: false, fog: false }),
    )
    crater.position.set(range(rand, -9, 9), range(rand, -9, 9), 0.2)
    group.add(crater)
  }
  const light = new THREE.DirectionalLight(new THREE.Color(DAY_NIGHT.night.sunColor), 0)
  light.position.set(-110, 120, -70)
  group.userData.light = light
  return { group, disc, halo, light }
}

// ---------- 云 ----------

export interface Clouds {
  group: THREE.Group
  drifters: { obj: THREE.Group; speed: number; radius: number; angle: number; baseY: number; bob: number }[]
}

function buildCloudPuff(rand: () => number, scale: number): THREE.Group {
  const g = new THREE.Group()
  g.name = 'cloud-puff'
  const mat = new THREE.MeshLambertMaterial({
    color: new THREE.Color(PALETTE.cloud),
    transparent: true,
    opacity: 0.92,
    depthWrite: false,
  })
  const shadeMat = new THREE.MeshLambertMaterial({
    color: new THREE.Color(PALETTE.cloudShade),
    transparent: true,
    opacity: 0.7,
    depthWrite: false,
  })
  const blobs = 5 + Math.floor(rand() * 5)
  for (let i = 0; i < blobs; i++) {
    const r = range(rand, 1.6, 3.6) * scale
    const blob = new THREE.Mesh(new THREE.SphereGeometry(r, 12, 9), i > blobs - 3 ? shadeMat : mat)
    blob.position.set(range(rand, -4, 4) * scale, range(rand, -0.6, 0.9) * scale, range(rand, -2, 2) * scale)
    blob.scale.y = range(rand, 0.55, 0.8)
    g.add(blob)
  }
  return g
}

export function buildClouds(): Clouds {
  const group = new THREE.Group()
  group.name = 'clouds'
  const rand = makeRandom(1969)
  const drifters: Clouds['drifters'] = []

  for (let i = 0; i < 22; i++) {
    const puff = buildCloudPuff(rand, range(rand, 0.8, 1.7))
    const radius = range(rand, 140, 300)
    const angle = rand() * Math.PI * 2
    const baseY = range(rand, 26, 78)
    puff.position.set(Math.cos(angle) * radius, baseY, Math.sin(angle) * radius)
    puff.rotation.y = rand() * Math.PI
    group.add(puff)
    drifters.push({ obj: puff, speed: range(rand, 0.004, 0.014) * (rand() > 0.5 ? 1 : -1), radius, angle, baseY, bob: range(rand, 0.4, 1.4) })
  }

  // 岛下方的一层薄云，强化「浮空」感
  for (let i = 0; i < 8; i++) {
    const puff = buildCloudPuff(rand, range(rand, 1.4, 2.6))
    const radius = range(rand, 30, 80)
    const angle = rand() * Math.PI * 2
    const baseY = range(rand, -46, -26)
    puff.position.set(Math.cos(angle) * radius, baseY, Math.sin(angle) * radius)
    group.add(puff)
    drifters.push({ obj: puff, speed: range(rand, 0.006, 0.016), radius, angle, baseY, bob: range(rand, 0.5, 1.6) })
  }

  return { group, drifters }
}

// ---------- 远处的浮空小岛 ----------

export interface Islets {
  group: THREE.Group
  bobbers: { obj: THREE.Group; baseY: number; amp: number; phase: number; spin: number }[]
}

function buildIslet(rand: () => number, scale: number): THREE.Group {
  const g = new THREE.Group()
  const R = 6 * scale

  // 草顶
  const top = new THREE.Mesh(new THREE.SphereGeometry(R, 18, 12, 0, Math.PI * 2, 0, Math.PI / 2), matte(PALETTE.grass))
  top.scale.y = 0.32
  top.receiveShadow = true
  g.add(top)
  // 岩底
  const rockPts: THREE.Vector2[] = [
    new THREE.Vector2(R, 0),
    new THREE.Vector2(R * 0.82, -R * 0.5),
    new THREE.Vector2(R * 0.55, -R * 1.1),
    new THREE.Vector2(R * 0.28, -R * 1.7),
    new THREE.Vector2(0.05, -R * 2.2),
  ]
  const rockGeo = new THREE.LatheGeometry(rockPts, 20)
  const pos = rockGeo.attributes.position as THREE.BufferAttribute
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i)
    const y = pos.getY(i)
    const z = pos.getZ(i)
    const r = Math.hypot(x, z)
    if (r > 0.2) {
      const n = fbm2(x * 0.3, z * 0.3 + y * 0.2, 3, 41)
      const k = 1 + (n * 1.2) / Math.max(1, r)
      pos.setXYZ(i, x * k, y + n * 0.3, z * k)
    }
  }
  rockGeo.computeVertexNormals()
  const rock = new THREE.Mesh(rockGeo, matte(PALETTE.rockDark))
  g.add(rock)

  // 岛上的小树 / 小灯塔
  const treeCount = 1 + Math.floor(rand() * 3)
  for (let i = 0; i < treeCount; i++) {
    const tree = buildTree(rand, range(rand, 0.5, 0.9) * scale, rand() > 0.6)
    const a = rand() * Math.PI * 2
    const d = rand() * R * 0.55
    tree.position.set(Math.cos(a) * d, R * 0.16, Math.sin(a) * d)
    g.add(tree)
  }
  if (rand() > 0.55) {
    // 一座发光的小灯塔，夜里像星星一样
    const tower = cyl(0.5 * scale, 0.7 * scale, 3.2 * scale, PALETTE.stoneLight, 10)
    tower.position.y = 1.6 * scale
    g.add(tower)
    const roof = cone(0.95 * scale, 1.3 * scale, PALETTE.roofRose, 10)
    roof.position.y = 3.8 * scale
    g.add(roof)
    const lamp = sphere(0.34 * scale, PALETTE.lantern, 9)
    const lm = lamp.material as THREE.MeshLambertMaterial
    lm.emissive = new THREE.Color(PALETTE.lantern)
    lm.emissiveIntensity = 1.1
    lamp.position.y = 2.9 * scale
    lamp.userData.lamp = true
    g.add(lamp)
  }

  return g
}

export function buildIslets(): Islets {
  const group = new THREE.Group()
  group.name = 'islets'
  const rand = makeRandom(31415)
  const bobbers: Islets['bobbers'] = []

  for (let i = 0; i < 11; i++) {
    const scale = range(rand, 0.5, 1.7)
    const islet = buildIslet(rand, scale)
    const angle = (i / 11) * Math.PI * 2 + range(rand, -0.2, 0.2)
    const dist = range(rand, 130, 300)
    const baseY = range(rand, -55, 55)
    islet.position.set(Math.cos(angle) * dist, baseY, Math.sin(angle) * dist)
    islet.rotation.y = rand() * Math.PI * 2
    group.add(islet)
    bobbers.push({ obj: islet, baseY, amp: range(rand, 0.8, 2.6), phase: rand() * Math.PI * 2, spin: range(rand, -0.01, 0.01) })
  }

  // 一颗特别小的星球：致敬 B-612
  const b612 = new THREE.Group()
  const core = sphere(3.2, PALETTE.grassDark, 18)
  b612.add(core)
  const rand2 = makeRandom(612)
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2
    const volcano = cone(0.7, 1.3, PALETTE.rockDark, 9)
    volcano.position.set(Math.cos(a) * 1.6, 2.6, Math.sin(a) * 1.6)
    b612.add(volcano)
  }
  // 那朵玫瑰的光点
  const roseLight = sphere(0.28, PALETTE.roseRed, 9)
  roseLight.material = uniqueMatte(PALETTE.roseRed, {
    emissive: new THREE.Color(PALETTE.roseRed),
    emissiveIntensity: 1.0,
  })
  roseLight.position.set(0.6, 3.1, 1.4)
  roseLight.userData.lamp = true
  b612.add(roseLight)
  const dome = new THREE.Mesh(
    new THREE.SphereGeometry(0.62, 14, 10),
    new THREE.MeshBasicMaterial({ color: PALETTE.waterFoam, transparent: true, opacity: 0.22, depthWrite: false }),
  )
  dome.position.copy(roseLight.position)
  b612.add(dome)
  b612.position.set(-190, 78, -150)
  group.add(b612)
  bobbers.push({ obj: b612, baseY: 78, amp: 1.6, phase: 0.7, spin: 0.03 })
  void rand2
  void pick

  return { group, bobbers }
}

// ---------- 萤火 / 夜光微粒 ----------

export interface Fireflies {
  points: THREE.Points
  material: THREE.PointsMaterial
  seeds: Float32Array
  centers: Float32Array
}

export function buildFireflies(): Fireflies {
  const count = 260
  const positions = new Float32Array(count * 3)
  const centers = new Float32Array(count * 3)
  const seeds = new Float32Array(count)
  const rand = makeRandom(777)

  for (let i = 0; i < count; i++) {
    const a = rand() * Math.PI * 2
    const d = range(rand, 6, ISLAND.radius * 1.05)
    const x = Math.cos(a) * d
    const z = Math.sin(a) * d
    const y = range(rand, 4, 26)
    centers[i * 3] = x
    centers[i * 3 + 1] = y
    centers[i * 3 + 2] = z
    positions[i * 3] = x
    positions[i * 3 + 1] = y
    positions[i * 3 + 2] = z
    seeds[i] = rand() * Math.PI * 2
  }

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  const material = new THREE.PointsMaterial({
    color: PALETTE.lantern,
    size: 0.7,
    sizeAttenuation: true,
    map: dotTexture(),
    transparent: true,
    opacity: 0,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })
  const points = new THREE.Points(geo, material)
  points.name = 'fireflies'
  return { points, material, seeds, centers }
}

/** 汇总环境元素。 */
export function buildEnvironment() {
  const sky = buildSky()
  const stars = buildStars()
  const sun = buildSun()
  const moon = buildMoon()
  const clouds = buildClouds()
  const islets = buildIslets()
  const fireflies = buildFireflies()

  const group = new THREE.Group()
  group.name = 'environment'
  group.add(sky.mesh)
  group.add(stars.points)
  group.add(sun.group)
  group.add(moon.group)
  group.add(clouds.group)
  group.add(islets.group)
  group.add(fireflies.points)

  return { group, sky, stars, sun, moon, clouds, islets, fireflies }
}
