import * as THREE from 'three'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { Batcher, Builder, mat4, noOutline, PALETTE, rng, toon, unitGeo } from './core'
import { heightAt, isOnIsland } from './terrain'

interface SkyKey {
  hour: number
  top: string
  horizon: string
  bottom: string
  light: string
  lightIntensity: number
  hemiSky: string
  hemiGround: string
  hemiIntensity: number
  night: number
}

const SKY_KEYS: SkyKey[] = [
  { hour: 0, top: '#16234a', horizon: '#34497a', bottom: '#1d2846', light: '#a9bde6', lightIntensity: 0.7, hemiSky: '#5a6ea6', hemiGround: '#343a55', hemiIntensity: 1.3, night: 1 },
  { hour: 5, top: '#25386a', horizon: '#c99ba0', bottom: '#4b5680', light: '#f3b9a0', lightIntensity: 0.6, hemiSky: '#8d93b8', hemiGround: '#4a4a5a', hemiIntensity: 1.15, night: 0.7 },
  { hour: 6.5, top: '#6f97c9', horizon: '#fbd7b4', bottom: '#b7c3d8', light: '#ffd2a8', lightIntensity: 1.5, hemiSky: '#cdd8ea', hemiGround: '#b6a084', hemiIntensity: 1.45, night: 0.1 },
  { hour: 9, top: '#7fb2e0', horizon: '#f6ead2', bottom: '#cfdce8', light: '#fff2dc', lightIntensity: 1.85, hemiSky: '#dbe8f4', hemiGround: '#bfae8c', hemiIntensity: 1.55, night: 0 },
  { hour: 12, top: '#74ace0', horizon: '#eef3f0', bottom: '#d3e2ec', light: '#fffaf0', lightIntensity: 2.0, hemiSky: '#e2eef8', hemiGround: '#c4b494', hemiIntensity: 1.6, night: 0 },
  { hour: 16.5, top: '#7ea8d6', horizon: '#f8e4c6', bottom: '#d6d6dc', light: '#ffe6bf', lightIntensity: 1.85, hemiSky: '#dfe6f0', hemiGround: '#c4ab88', hemiIntensity: 1.5, night: 0 },
  { hour: 18.2, top: '#5872a8', horizon: '#f5c29c', bottom: '#c3a2a6', light: '#ffbb88', lightIntensity: 1.55, hemiSky: '#cdc0cc', hemiGround: '#a78670', hemiIntensity: 1.4, night: 0.2 },
  { hour: 19.6, top: '#2b3c70', horizon: '#c9857c', bottom: '#4d4c74', light: '#d8a8b0', lightIntensity: 0.7, hemiSky: '#7d7fa8', hemiGround: '#4a4052', hemiIntensity: 1.15, night: 0.7 },
  { hour: 24, top: '#16234a', horizon: '#34497a', bottom: '#1d2846', light: '#a9bde6', lightIntensity: 0.7, hemiSky: '#5a6ea6', hemiGround: '#343a55', hemiIntensity: 1.3, night: 1 },
]

const _ca = new THREE.Color()
const _cb = new THREE.Color()

function mixColor(a: string, b: string, t: number, out: THREE.Color) {
  _ca.set(a)
  _cb.set(b)
  return out.copy(_ca).lerp(_cb, t)
}

export interface SkyState {
  top: THREE.Color
  horizon: THREE.Color
  bottom: THREE.Color
  light: THREE.Color
  lightIntensity: number
  hemiSky: THREE.Color
  hemiGround: THREE.Color
  hemiIntensity: number
  night: number
}

export function sampleSky(hour: number, out: SkyState) {
  const h = ((hour % 24) + 24) % 24
  let i = 0
  while (i < SKY_KEYS.length - 2 && SKY_KEYS[i + 1].hour <= h) i++
  const a = SKY_KEYS[i]
  const b = SKY_KEYS[i + 1]
  const raw = (h - a.hour) / (b.hour - a.hour)
  const t = raw * raw * (3 - 2 * raw)
  mixColor(a.top, b.top, t, out.top)
  mixColor(a.horizon, b.horizon, t, out.horizon)
  mixColor(a.bottom, b.bottom, t, out.bottom)
  mixColor(a.light, b.light, t, out.light)
  mixColor(a.hemiSky, b.hemiSky, t, out.hemiSky)
  mixColor(a.hemiGround, b.hemiGround, t, out.hemiGround)
  out.lightIntensity = a.lightIntensity + (b.lightIntensity - a.lightIntensity) * t
  out.hemiIntensity = a.hemiIntensity + (b.hemiIntensity - a.hemiIntensity) * t
  out.night = a.night + (b.night - a.night) * t
  return out
}

export function sunDirection(hour: number, out: THREE.Vector3) {
  const a = ((hour - 6) / 12) * Math.PI
  const elevation = Math.sin(a) * 1.05
  out.set(Math.cos(a) * Math.cos(elevation), Math.sin(elevation), -0.38)
  return out.normalize()
}

const skyVertex = /* glsl */ `
  varying vec3 vDir;
  void main() {
    vDir = normalize(position);
    vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_Position = p.xyww;
  }
`

const skyFragment = /* glsl */ `
  uniform vec3 uTop;
  uniform vec3 uHorizon;
  uniform vec3 uBottom;
  uniform vec3 uSunDir;
  uniform vec3 uSunColor;
  uniform vec3 uMoonDir;
  uniform float uNight;
  varying vec3 vDir;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
  }

  void main() {
    vec3 d = normalize(vDir);
    float h = d.y;
    vec3 col = h > 0.0
      ? mix(uHorizon, uTop, pow(smoothstep(0.0, 0.7, h), 0.75))
      : mix(uHorizon, uBottom, smoothstep(0.0, -0.45, h));
    vec2 uv = vec2(atan(d.z, d.x) * 2.0, h * 6.0);
    float wash = noise(uv * 1.7) * 0.6 + noise(uv * 4.3) * 0.4;
    col *= 0.965 + wash * 0.06;
    float sun = max(dot(d, uSunDir), 0.0);
    float sunUp = smoothstep(-0.12, 0.05, uSunDir.y);
    col += uSunColor * (pow(sun, 6.0) * 0.22 + pow(sun, 48.0) * 0.35) * sunUp;
    col = mix(col, uSunColor * 0.4 + vec3(1.0, 0.96, 0.86) * 0.7, smoothstep(0.9975, 0.9984, sun) * sunUp);
    float moon = dot(d, uMoonDir);
    float shadow = dot(d, normalize(uMoonDir + vec3(0.016, 0.01, 0.0)));
    float disc = smoothstep(0.9989, 0.9992, moon) * (1.0 - smoothstep(0.9989, 0.9992, shadow));
    col += pow(max(moon, 0.0), 300.0) * 0.12 * uNight;
    col = mix(col, vec3(1.0, 0.95, 0.8), disc * uNight);
    gl_FragColor = vec4(col, 1.0);
  }
`

function createSky() {
  const uniforms = {
    uTop: { value: new THREE.Color() },
    uHorizon: { value: new THREE.Color() },
    uBottom: { value: new THREE.Color() },
    uSunDir: { value: new THREE.Vector3(0, 1, 0) },
    uSunColor: { value: new THREE.Color() },
    uMoonDir: { value: new THREE.Vector3(-0.4, 0.55, -0.7).normalize() },
    uNight: { value: 0 },
  }
  const material = noOutline(
    new THREE.ShaderMaterial({
      uniforms,
      vertexShader: skyVertex,
      fragmentShader: skyFragment,
      side: THREE.BackSide,
      depthWrite: false,
    }),
  )
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(500, 48, 24), material)
  mesh.frustumCulled = false
  mesh.renderOrder = -10
  return { mesh, uniforms }
}

const starVertex = /* glsl */ `
  attribute float aPhase;
  attribute float aSize;
  uniform float uTime;
  uniform float uOpacity;
  uniform float uPixelRatio;
  varying float vAlpha;
  void main() {
    vAlpha = uOpacity * (0.55 + 0.45 * sin(uTime * 1.8 + aPhase));
    gl_PointSize = aSize * uPixelRatio;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const starFragment = /* glsl */ `
  uniform vec3 uColor;
  varying float vAlpha;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    float core = smoothstep(0.5, 0.0, d);
    float rays = max(smoothstep(0.08, 0.0, abs(c.x)), smoothstep(0.08, 0.0, abs(c.y))) * smoothstep(0.5, 0.1, d);
    float a = max(core * core, rays * 0.6) * vAlpha;
    if (a < 0.01) discard;
    gl_FragColor = vec4(uColor, a);
  }
`

function createStars(pixelRatio: number) {
  const count = 700
  const random = rng(77)
  const positions = new Float32Array(count * 3)
  const phases = new Float32Array(count)
  const sizes = new Float32Array(count)
  for (let i = 0; i < count; i++) {
    const y = random() * 0.95 + 0.02
    const theta = random() * Math.PI * 2
    const r = Math.sqrt(1 - y * y)
    const sign = random() > 0.85 ? -1 : 1
    positions.set([Math.cos(theta) * r * 420, sign * y * 420, Math.sin(theta) * r * 420], i * 3)
    phases[i] = random() * 10
    sizes[i] = random() > 0.96 ? 9 : 2 + random() * 3.5
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geo.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1))
  geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
  const uniforms = {
    uTime: { value: 0 },
    uOpacity: { value: 0 },
    uPixelRatio: { value: pixelRatio },
    uColor: { value: new THREE.Color('#fff4d6') },
  }
  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: starVertex,
    fragmentShader: starFragment,
    transparent: true,
    depthWrite: false,
  })
  const points = new THREE.Points(geo, material)
  points.frustumCulled = false
  return { points, uniforms }
}

function cloudGeometry(random: () => number, puffs: number, spread: number, flat: number) {
  const parts: THREE.BufferGeometry[] = []
  for (let i = 0; i < puffs; i++) {
    const s = 1 + random() * 1.4
    const g = new THREE.IcosahedronGeometry(1, 2)
    g.applyMatrix4(mat4((random() - 0.5) * spread, random() * s * 0.4 * flat, (random() - 0.5) * spread * 0.55, 0, random() * 3, 0, s * 1.15, s * 0.8 * flat, s))
    parts.push(g)
  }
  const merged = mergeGeometries(parts)!
  parts.forEach((g) => g.dispose())
  return merged
}

function createClouds() {
  const random = rng(101)
  const group = new THREE.Group()
  const material = noOutline(new THREE.MeshToonMaterial({ color: '#ffffff', transparent: true, opacity: 0.96 }))
  const seaMaterial = noOutline(new THREE.MeshToonMaterial({ color: '#f3f1f4', transparent: true, opacity: 0.92 }))
  for (let i = 0; i < 16; i++) {
    const a = random() * Math.PI * 2
    const r = 52 + random() * 45
    const cloud = new THREE.Mesh(cloudGeometry(random, 6 + Math.floor(random() * 5), 7, 1), material)
    cloud.scale.setScalar(1 + random() * 1.1)
    cloud.position.set(Math.cos(a) * r, -18 + random() * 16, Math.sin(a) * r)
    cloud.rotation.y = random() * Math.PI
    group.add(cloud)
  }
  for (let i = 0; i < 28; i++) {
    const a = random() * Math.PI * 2
    const r = 10 + random() * 95
    const cloud = new THREE.Mesh(cloudGeometry(random, 9, 14, 0.7), seaMaterial)
    cloud.scale.setScalar(2.4 + random() * 1.6)
    cloud.position.set(Math.cos(a) * r, -44 - random() * 8, Math.sin(a) * r)
    group.add(cloud)
  }
  return { group, materials: [material, seaMaterial] }
}

function createBirds() {
  const group = new THREE.Group()
  const birds: { wingL: THREE.Mesh; wingR: THREE.Mesh; phase: number }[] = []
  const bodyMat = toon('#f6f1e8')
  const wingGeo = new THREE.BoxGeometry(0.9, 0.04, 0.32).translate(0.45, 0, 0)
  for (let i = 0; i < 9; i++) {
    const row = Math.ceil(i / 2)
    const side = i % 2 === 0 ? 1 : -1
    const bird = new THREE.Group()
    bird.position.set(i === 0 ? 0 : side * row * 1.4, Math.sin(i) * 0.5, -row * 1.3)
    const body = new THREE.Mesh(unitGeo.sphere(8, 6), bodyMat)
    body.scale.set(0.16, 0.14, 0.38)
    bird.add(body)
    const wingL = new THREE.Mesh(wingGeo, bodyMat)
    const wingR = new THREE.Mesh(wingGeo, bodyMat)
    wingR.rotation.y = Math.PI
    bird.add(wingL, wingR)
    group.add(bird)
    birds.push({ wingL, wingR, phase: i * 0.6 })
  }
  return {
    group,
    update(time: number) {
      const angle = time * 0.06
      group.position.set(Math.cos(angle) * 40, 17 + Math.sin(time * 0.3) * 2, Math.sin(angle) * 40)
      group.rotation.y = -angle
      birds.forEach((b) => {
        const flap = Math.sin(time * 6 + b.phase) * 0.6
        b.wingL.rotation.z = flap
        b.wingR.rotation.z = flap
      })
    },
  }
}

const fireflyVertex = /* glsl */ `
  attribute float aPhase;
  uniform float uTime;
  uniform float uOpacity;
  uniform float uPixelRatio;
  varying float vAlpha;
  void main() {
    vec3 p = position;
    p.x += sin(uTime * 0.7 + aPhase) * 0.6;
    p.y += sin(uTime * 1.1 + aPhase * 1.7) * 0.35;
    p.z += cos(uTime * 0.6 + aPhase) * 0.6;
    vAlpha = uOpacity * (0.5 + 0.5 * sin(uTime * 3.0 + aPhase * 3.0));
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = uPixelRatio * 90.0 / -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`

const fireflyFragment = /* glsl */ `
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d) * vAlpha;
    if (a < 0.01) discard;
    gl_FragColor = vec4(1.0, 0.86, 0.45, a);
  }
`

function createFireflies(pixelRatio: number) {
  const random = rng(303)
  const positions: number[] = []
  const phases: number[] = []
  let tries = 0
  while (positions.length < 220 * 3 && tries < 5000) {
    tries++
    const x = (random() - 0.5) * 60
    const z = (random() - 0.5) * 60
    if (!isOnIsland(x, z, 2) || Math.hypot(x, z) < 12) continue
    positions.push(x, heightAt(x, z) + 0.5 + random() * 2, z)
    phases.push(random() * 20)
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geo.setAttribute('aPhase', new THREE.Float32BufferAttribute(phases, 1))
  const uniforms = { uTime: { value: 0 }, uOpacity: { value: 0 }, uPixelRatio: { value: pixelRatio } }
  const points = new THREE.Points(
    geo,
    new THREE.ShaderMaterial({
      uniforms,
      vertexShader: fireflyVertex,
      fragmentShader: fireflyFragment,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
  )
  return { points, uniforms }
}

interface Puff {
  mesh: THREE.Mesh
  material: THREE.MeshToonMaterial
  age: number
  life: number
  origin: THREE.Vector3
  scale: number
  rise: number
}

function createSmoke(sources: THREE.Vector3[], vents: THREE.Vector3[]) {
  const group = new THREE.Group()
  const geo = unitGeo.ico(1)
  const puffs: Puff[] = []
  const emitters = [
    ...sources.map((origin) => ({ origin, color: '#f4f0ea', life: 5, scale: 0.55, rise: 3.2 })),
    ...vents.map((origin) => ({ origin, color: '#cbbfb8', life: 6.5, scale: 1.0, rise: 4.5 })),
  ]
  const perEmitter = 9
  emitters.forEach((e, ei) => {
    for (let i = 0; i < perEmitter; i++) {
      const material = noOutline(new THREE.MeshToonMaterial({ color: e.color, transparent: true, opacity: 0, depthWrite: false }))
      const mesh = new THREE.Mesh(geo, material)
      group.add(mesh)
      puffs.push({ mesh, material, age: (i / perEmitter) * e.life + ei * 0.37, life: e.life, origin: e.origin, scale: e.scale, rise: e.rise })
    }
  })
  return {
    group,
    update(dt: number) {
      puffs.forEach((p) => {
        p.age = (p.age + dt) % p.life
        const t = p.age / p.life
        p.mesh.position.set(p.origin.x + t * 1.8, p.origin.y + t * p.rise, p.origin.z - t * 1.0 + Math.sin(t * 6 + p.origin.x) * 0.2)
        p.mesh.scale.setScalar(p.scale * (0.35 + t * 1.3))
        p.material.opacity = Math.sin(Math.min(1, t * 1.2) * Math.PI) * 0.75
      })
    },
  }
}

function createIslets() {
  const random = rng(909)
  const islets: { group: THREE.Group; base: number; phase: number }[] = []
  const group = new THREE.Group()
  const specs = [
    { a: 0.6, r: 52, y: 6, s: 1.0, item: 'lamp' },
    { a: 2.0, r: 58, y: -4, s: 1.3, item: 'house' },
    { a: 3.3, r: 50, y: 10, s: 0.9, item: 'baobab' },
    { a: 4.4, r: 60, y: 2, s: 1.1, item: 'rose' },
    { a: 5.4, r: 54, y: -8, s: 0.8, item: 'well' },
  ]
  specs.forEach((spec, idx) => {
    const batcher = new Batcher()
    const b = new Builder(batcher)
    const grass = toon(PALETTE.grass)
    const rock = toon(PALETTE.rockDark)
    b.cyl(grass, 2.2, 2.0, 0.6, 0, -0.3, 0, 14)
    batcher.add(unitGeo.cone(9), rock, mat4(0, -0.25, 0, Math.PI, 0, 0, 2.05, 4 + random() * 2, 2.05))
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2 + random()
      batcher.add(unitGeo.cone(6), rock, mat4(Math.cos(a) * 1.4, -0.4, Math.sin(a) * 1.4, Math.PI, 0, 0, 0.5, 1.5 + random() * 1.5, 0.5))
    }
    if (spec.item === 'lamp') {
      b.cyl(toon('#4a4a52'), 0.05, 0.08, 1.8, 0, 0.3, 0, 6)
      b.box(toon(PALETTE.windowNight, { emissive: '#ffc46b', emissiveIntensity: 0.6 }), 0.3, 0.38, 0.3, 0, 2.1, 0)
      b.cone(toon('#4a4a52'), 0.28, 0.25, 0, 2.48, 0, 4, Math.PI / 4)
    } else if (spec.item === 'house') {
      b.box(toon(PALETTE.cream), 1.2, 0.9, 1.0, 0, 0.3, 0)
      b.cone(toon(PALETTE.roofRose), 0.95, 0.9, 0, 1.2, 0, 4, Math.PI / 4)
      b.box(toon('#6a4b38'), 0.3, 0.5, 0.05, 0, 0.3, 0.51)
    } else if (spec.item === 'baobab') {
      b.cyl(toon(PALETTE.baobab), 0.35, 0.55, 1.6, 0, 0.3, 0, 10)
      b.sphere(toon('#7ea56a'), 0.9, 0, 2.3, 0, 1.4, 0.5, 1.4)
    } else if (spec.item === 'rose') {
      b.cyl(toon(PALETTE.leafDeep), 0.03, 0.03, 0.6, 0, 0.3, 0, 5)
      b.sphere(toon('#d9534f'), 0.16, 0, 1.0, 0)
      for (let i = 0; i < 5; i++) b.sphere(toon(PALETTE.leaf), 0.12, Math.cos(i) * 0.5, 0.4, Math.sin(i) * 0.5, 1, 0.5, 1)
    } else {
      b.cyl(toon(PALETTE.stoneShade), 0.4, 0.45, 0.5, 0, 0.3, 0, 12)
      b.box(toon(PALETTE.woodDark), 0.06, 0.9, 0.06, -0.35, 0.6, 0)
      b.box(toon(PALETTE.woodDark), 0.06, 0.9, 0.06, 0.35, 0.6, 0)
      b.cone(toon(PALETTE.roofBlue), 0.6, 0.35, 0, 1.5, 0, 4, Math.PI / 4)
    }
    const islet = batcher.build(`islet-${idx}`)
    islet.scale.setScalar(spec.s)
    islet.position.set(Math.cos(spec.a) * spec.r, spec.y, Math.sin(spec.a) * spec.r)
    group.add(islet)
    islets.push({ group: islet, base: spec.y, phase: idx * 1.3 })
  })
  return {
    group,
    update(time: number) {
      islets.forEach((i) => {
        i.group.position.y = i.base + Math.sin(time * 0.5 + i.phase) * 0.6
        i.group.rotation.y = time * 0.03 + i.phase
      })
    },
  }
}

export function createEnvironment(scene: THREE.Scene, pixelRatio: number, smokeSources: THREE.Vector3[], vents: THREE.Vector3[]) {
  const sky = createSky()
  const stars = createStars(pixelRatio)
  const clouds = createClouds()
  const birds = createBirds()
  const fireflies = createFireflies(pixelRatio)
  const smoke = createSmoke(smokeSources, vents)
  const islets = createIslets()

  const hemi = new THREE.HemisphereLight('#ffffff', '#888888', 1.5)
  const sun = new THREE.DirectionalLight('#ffffff', 2)
  sun.castShadow = true
  sun.shadow.mapSize.set(2048, 2048)
  const cam = sun.shadow.camera
  cam.left = -40
  cam.right = 40
  cam.top = 40
  cam.bottom = -40
  cam.near = 1
  cam.far = 240
  sun.shadow.bias = -0.0006
  sun.shadow.normalBias = 0.05
  sun.shadow.intensity = 0.62
  sun.target.position.set(0, 0, 0)

  scene.add(sky.mesh, stars.points, clouds.group, birds.group, fireflies.points, smoke.group, islets.group, hemi, sun, sun.target)
  scene.fog = new THREE.Fog('#ffffff', 110, 330)

  const state: SkyState = {
    top: new THREE.Color(),
    horizon: new THREE.Color(),
    bottom: new THREE.Color(),
    light: new THREE.Color(),
    lightIntensity: 1,
    hemiSky: new THREE.Color(),
    hemiGround: new THREE.Color(),
    hemiIntensity: 1,
    night: 0,
  }
  const sunDir = new THREE.Vector3()
  const lightDir = new THREE.Vector3()
  const cloudTint = new THREE.Color()
  const white = new THREE.Color('#ffffff')

  return {
    state,
    update(time: number, dt: number, hour: number, camera: THREE.Camera) {
      sampleSky(hour, state)
      sunDirection(hour, sunDir)
      sky.mesh.position.copy(camera.position)
      stars.points.position.copy(camera.position)
      sky.uniforms.uTop.value.copy(state.top)
      sky.uniforms.uHorizon.value.copy(state.horizon)
      sky.uniforms.uBottom.value.copy(state.bottom)
      sky.uniforms.uSunDir.value.copy(sunDir)
      sky.uniforms.uSunColor.value.copy(state.light)
      sky.uniforms.uNight.value = state.night

      if (sunDir.y > -0.05) lightDir.copy(sunDir)
      else lightDir.set(-sunDir.x * 0.6, Math.max(0.35, -sunDir.y), -0.5).normalize()
      lightDir.y = Math.max(lightDir.y, 0.18)
      lightDir.normalize()
      sun.position.copy(lightDir).multiplyScalar(110)
      sun.color.copy(state.light)
      sun.intensity = state.lightIntensity
      hemi.color.copy(state.hemiSky)
      hemi.groundColor.copy(state.hemiGround)
      hemi.intensity = state.hemiIntensity
      ;(scene.fog as THREE.Fog).color.copy(state.horizon)

      stars.uniforms.uTime.value = time
      stars.uniforms.uOpacity.value = Math.max(0, state.night - 0.15) * 1.15
      fireflies.uniforms.uTime.value = time
      fireflies.uniforms.uOpacity.value = Math.max(0, state.night - 0.3) * 1.3

      cloudTint.copy(white).lerp(state.horizon, 0.35 + state.night * 0.3)
      clouds.materials[0].color.copy(cloudTint)
      clouds.materials[1].color.copy(cloudTint).lerp(state.bottom, 0.25)
      clouds.group.rotation.y = time * 0.004

      birds.update(time)
      smoke.update(dt)
      islets.update(time)
      return state.night
    },
  }
}
