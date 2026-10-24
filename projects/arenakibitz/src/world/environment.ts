import * as THREE from 'three'
import {
  addBarrel,
  addCrate,
  box,
  createGableGeometry,
  createRibbonGeometry,
  cylinder,
  mesh,
  seededRandom,
  standard,
} from './geometry'
import type { Season } from './data'

interface WindShaderUniforms {
  uTime: { value: number }
  uWind: { value: number }
}

interface SeasonalMesh {
  mesh: THREE.InstancedMesh
  kind: 'pine' | 'leaf' | 'orchard' | 'grass' | 'flower' | 'wheat'
  variation: number[]
}

interface Cloud {
  group: THREE.Group
  speed: number
  phase: number
  baseY: number
}

interface Butterfly {
  root: THREE.Group
  left: THREE.Group
  right: THREE.Group
  center: THREE.Vector3
  phase: number
  radius: number
  speed: number
}

interface Bird {
  root: THREE.Group
  left: THREE.Group
  right: THREE.Group
  phase: number
  radius: number
  speed: number
  height: number
  center: THREE.Vector3
}

export interface EnvironmentRefs {
  group: THREE.Group
  top: THREE.Mesh
  topMaterial: THREE.MeshStandardMaterial
  rockMaterial: THREE.ShaderMaterial
  waterMaterials: THREE.ShaderMaterial[]
  windUniforms: WindShaderUniforms[]
  seasonal: SeasonalMesh[]
  waterWheel: THREE.Group
  clouds: Cloud[]
  floaters: { mesh: THREE.Mesh; baseY: number; phase: number }[]
  rain: THREE.LineSegments
  rainPositions: Float32Array
  rainMaterial: THREE.LineBasicMaterial
  fireflies: THREE.Points
  fireflyMaterial: THREE.ShaderMaterial
  butterflies: Butterfly[]
  birds: Bird[]
  mist: THREE.Points
  mistPositions: Float32Array
}

const random = seededRandom(93217)

function islandRadius(angle: number) {
  return 18 * (1 + Math.sin(angle * 5 + 0.7) * 0.035 + Math.sin(angle * 11 - 0.4) * 0.022)
}

function createTopTerrain() {
  const segments = 96
  const rings = 12
  const positions: number[] = []
  const colors: number[] = []
  const indices: number[] = []
  const color = new THREE.Color()
  const pushVertex = (x: number, z: number) => {
    const radius = Math.hypot(x, z)
    const relief = Math.sin(x * 0.55) * Math.cos(z * 0.43) * 0.13
    const y = 0.07 + relief * THREE.MathUtils.smoothstep(Math.hypot(x + 1, z), 8, 11)
    positions.push(x, y, z)
    color.set('#91a77b')
    color.lerp(new THREE.Color('#a1a879'), THREE.MathUtils.smoothstep(-z, 5.5, 9) * 0.62)
    color.lerp(new THREE.Color('#799478'), THREE.MathUtils.smoothstep(-x, 5, 10) * 0.64)
    color.lerp(new THREE.Color('#8da77e'), THREE.MathUtils.smoothstep(x, 4.5, 9) * 0.52)
    color.lerp(new THREE.Color('#9caf82'), THREE.MathUtils.smoothstep(z, 5, 10) * 0.38)
    const variation = 0.92 + (Math.sin(x * 4.13 + z * 7.7 + radius) * 0.5 + 0.5) * 0.14
    colors.push(color.r * variation, color.g * variation, color.b * variation)
  }
  pushVertex(0, 0)
  for (let ring = 1; ring <= rings; ring++) {
    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * Math.PI * 2
      const radius = (ring / rings) * islandRadius(angle)
      pushVertex(Math.cos(angle) * radius, Math.sin(angle) * radius)
    }
  }
  const indexAt = (ring: number, i: number) => 1 + (ring - 1) * segments + ((i + segments) % segments)
  for (let i = 0; i < segments; i++) indices.push(0, indexAt(1, i + 1), indexAt(1, i))
  for (let ring = 2; ring <= rings; ring++) {
    for (let i = 0; i < segments; i++) {
      const a = indexAt(ring - 1, i)
      const b = indexAt(ring - 1, i + 1)
      const c = indexAt(ring, i)
      const d = indexAt(ring, i + 1)
      indices.push(a, b, c, b, d, c)
    }
  }
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
  geometry.setIndex(indices)
  geometry.computeVertexNormals()
  const material = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1, metalness: 0 })
  const top = new THREE.Mesh(geometry, material)
  top.receiveShadow = true
  top.name = '可交互的岛屿草地'
  top.userData.terrain = true
  return { top, material }
}

function createRockIsland() {
  const segments = 72
  const rings = [
    { y: -0.02, radius: 18 },
    { y: -1.8, radius: 17.2 },
    { y: -4.7, radius: 14.4 },
    { y: -8.2, radius: 10.2 },
    { y: -11.7, radius: 5.6 },
    { y: -14.8, radius: 0.45 },
  ]
  const positions: number[] = []
  const indices: number[] = []
  for (let r = 0; r < rings.length; r++) {
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2
      const base = islandRadius(angle) / 18
      const jitter = r === 0 || r === rings.length - 1 ? 1 : 1 + Math.sin(i * 12.73 + r * 4.17) * 0.045
      const radius = rings[r].radius * base * jitter
      const heightNoise = r === 0 ? 0 : Math.sin(i * 3.7 + r) * 0.16
      positions.push(Math.cos(angle) * radius, rings[r].y + heightNoise, Math.sin(angle) * radius)
      if (r < rings.length - 1 && i < segments) {
        const a = r * (segments + 1) + i
        const b = a + segments + 1
        indices.push(a, a + 1, b, b, a + 1, b + 1)
      }
    }
  }
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geometry.setIndex(indices)
  geometry.computeVertexNormals()
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uSunDirection: { value: new THREE.Vector3(0.4, 0.8, 0.3) },
      uDay: { value: 1 },
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vLocal;
      varying vec3 vWorld;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vLocal = position;
        vec4 world = modelMatrix * vec4(position, 1.0);
        vWorld = world.xyz;
        gl_Position = projectionMatrix * viewMatrix * world;
      }
    `,
    fragmentShader: `
      uniform vec3 uSunDirection;
      uniform float uDay;
      varying vec3 vNormal;
      varying vec3 vLocal;
      varying vec3 vWorld;
      float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
      void main() {
        float strata = sin(vLocal.y * 3.4 + sin(vLocal.x * 0.6) * 0.8) * 0.5 + 0.5;
        float grain = hash(floor(vLocal.xz * 2.2) + floor(vLocal.y * 3.0));
        vec3 limestone = vec3(0.55, 0.52, 0.45);
        vec3 basalt = vec3(0.28, 0.32, 0.34);
        vec3 col = mix(limestone, basalt, 1.0 - smoothstep(-13.0, -3.0, vLocal.y));
        col *= 0.88 + strata * 0.14 + grain * 0.08;
        float quartz = smoothstep(0.94, 0.99, sin(vLocal.y * 5.0 + vLocal.x * 0.7 + vLocal.z * 0.4) * 0.5 + 0.5);
        col = mix(col, vec3(0.48, 0.64, 0.66), quartz * 0.55);
        float diffuse = max(dot(normalize(vNormal), normalize(uSunDirection)), 0.0);
        float rim = pow(1.0 - abs(dot(normalize(vNormal), normalize(cameraPosition - vWorld))), 3.0);
        col *= 0.48 + diffuse * 0.6;
        col += rim * vec3(0.11, 0.15, 0.18);
        col *= mix(0.46, 1.0, uDay);
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  })
  const rock = new THREE.Mesh(geometry, material)
  rock.castShadow = true
  rock.receiveShadow = true
  return { rock, material }
}

function createWaterMaterial() {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    uniforms: {
      uTime: { value: 0 },
      uWind: { value: 0.35 },
      uDay: { value: 1 },
    },
    vertexShader: `
      uniform float uTime;
      uniform float uWind;
      varying vec2 vUv;
      varying float vWave;
      void main() {
        vUv = uv;
        vec3 p = position;
        float wave = sin(uv.y * 7.0 - uTime * 2.2) * 0.5 + sin(uv.y * 13.0 + uv.x * 5.0 + uTime * 1.4) * 0.5;
        p.y += wave * (0.012 + uWind * 0.018);
        vWave = wave;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform float uDay;
      varying vec2 vUv;
      varying float vWave;
      void main() {
        float flow = sin(vUv.y * 17.0 - uTime * 3.2 + sin(vUv.x * 9.0)) * 0.5 + 0.5;
        float edge = pow(abs(vUv.x - 0.5) * 2.0, 3.0);
        vec3 deep = vec3(0.25, 0.50, 0.57);
        vec3 pale = vec3(0.61, 0.79, 0.77);
        vec3 col = mix(deep, pale, flow * 0.25 + edge * 0.45 + vWave * 0.08);
        col *= mix(0.55, 1.05, uDay);
        float alpha = 0.84 + edge * 0.1;
        gl_FragColor = vec4(col, alpha);
      }
    `,
  })
}

function createWaterfallMaterial() {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    uniforms: { uTime: { value: 0 }, uDay: { value: 1 }, uWind: { value: 0.35 } },
    vertexShader: `
      uniform float uTime;
      uniform float uWind;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vec3 p = position;
        p.z += sin(uv.y * 13.0 + uTime * 2.0 + uv.x * 4.0) * 0.09 * (1.0 - uv.y) * (0.4 + uWind);
        p.x += sin(uv.y * 8.0 + uTime) * 0.04 * (1.0 - uv.y) * uWind;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform float uDay;
      varying vec2 vUv;
      void main() {
        float streak = sin(vUv.x * 47.0 + sin(vUv.y * 13.0) - uTime * 1.8) * 0.5 + 0.5;
        float rush = sin(vUv.y * 60.0 + uTime * 8.0 + vUv.x * 8.0) * 0.5 + 0.5;
        float sideFade = smoothstep(0.0, 0.15, vUv.x) * smoothstep(0.0, 0.15, 1.0 - vUv.x);
        vec3 col = mix(vec3(0.38,0.64,0.69), vec3(0.78,0.87,0.83), streak * 0.55 + rush * 0.15);
        col *= mix(0.55, 1.0, uDay);
        gl_FragColor = vec4(col, sideFade * (0.38 + streak * 0.38));
      }
    `,
  })
}

function makeWindMaterial(color: string, uniforms: WindShaderUniforms, amount = 0.12) {
  const material = new THREE.MeshStandardMaterial({ color, roughness: 1 })
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = uniforms.uTime
    shader.uniforms.uWind = uniforms.uWind
    shader.vertexShader = shader.vertexShader.replace(
      '#include <common>',
      `#include <common>\nuniform float uTime;\nuniform float uWind;`,
    )
    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      `vec3 transformed = vec3(position);
       #ifdef USE_INSTANCING
         float windPhase = instanceMatrix[3].x * 0.71 + instanceMatrix[3].z * 0.53;
         transformed.x += sin(uTime * 1.7 + windPhase) * uWind * ${amount.toFixed(3)} * max(position.y, 0.0);
         transformed.z += cos(uTime * 1.3 + windPhase) * uWind * ${(amount * 0.55).toFixed(3)} * max(position.y, 0.0);
       #endif`,
    )
  }
  material.customProgramCacheKey = () => `island-wind-${amount}`
  return material
}

function addPath(group: THREE.Group, points: [number, number, number][], width: number) {
  const path = mesh(createRibbonGeometry(points, width, 48, 0.08), standard('#b7a887'), group)
  path.receiveShadow = true
  path.castShadow = false
  return path
}

function addHouse(group: THREE.Group, x: number, z: number, scale: number, wallColor = '#b7a88e', roofColor = '#687787') {
  const house = new THREE.Group()
  house.position.set(x, 0.12, z)
  house.scale.setScalar(scale)
  group.add(house)
  const walls = standard(wallColor)
  box(house, [2.25, 1.8, 2.7], [0, 0.9, 0], walls)
  const roof = mesh(createGableGeometry(2.75, 3.15, 1.25), standard(roofColor), house, [0, 1.82, 0])
  ;(roof.material as THREE.MeshStandardMaterial).side = THREE.DoubleSide
  box(house, [0.58, 1.1, 0.12], [0, 0.55, 1.39], standard('#6e5039'))
  for (const xPos of [-0.7, 0.7]) {
    const windowMat = new THREE.MeshStandardMaterial({ color: '#779094', emissive: '#dca65e', emissiveIntensity: 0.15 })
    box(house, [0.4, 0.58, 0.08], [xPos, 1.05, 1.4], windowMat)
    box(house, [0.04, 0.6, 0.09], [xPos, 1.05, 1.45], standard('#70553e'))
  }
  box(house, [0.4, 1.45, 0.45], [0.65, 2.35, -0.5], standard('#8f8170'))
  addBarrel(house, [-1.25, 0, 0.65], 0.7)
  return house
}

function addMill(group: THREE.Group) {
  const mill = addHouse(group, 8.15, 2.7, 1.15, '#a7a58c', '#657984')
  mill.rotation.y = -0.08
  // Timber frame, visible gears and a loading beam.
  for (const x of [-1.05, 1.05]) box(mill, [0.13, 1.75, 0.12], [x, 0.92, 1.39], standard('#66543f'))
  box(mill, [2.2, 0.12, 0.12], [0, 1.65, 1.4], standard('#66543f'))
  box(mill, [0.14, 0.14, 1.5], [0, 2.15, 1.7], standard('#66543f'))
  const gear = mesh(new THREE.TorusGeometry(0.46, 0.08, 6, 12), standard('#806143'), mill, [0.65, 0.75, 1.46])
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2
    box(gear, [0.09, 0.28, 0.09], [Math.cos(a) * 0.5, Math.sin(a) * 0.5, 0], standard('#806143'), [0, 0, a])
  }
  const wheelPivot = new THREE.Group()
  wheelPivot.position.set(9.55, 1.35, 2.8)
  wheelPivot.rotation.y = Math.PI / 2
  group.add(wheelPivot)
  const rotor = new THREE.Group()
  wheelPivot.add(rotor)
  mesh(new THREE.TorusGeometry(1.18, 0.1, 7, 24), standard('#69543f'), rotor)
  mesh(new THREE.TorusGeometry(0.88, 0.07, 6, 24), standard('#765e44'), rotor)
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2
    box(rotor, [0.16, 0.48, 0.65], [Math.cos(a) * 1.05, Math.sin(a) * 1.05, 0], standard('#80674a'), [0, 0, a])
    box(rotor, [2.15, 0.07, 0.08], [0, 0, 0], standard('#66513c'), [0, 0, a])
  }
  cylinder(rotor, 0.13, 0.13, 1.1, 8, [0, 0, 0], standard('#545854', 0.5, 0.3), [Math.PI / 2, 0, 0])
  addCrate(group, [7.2, 0.15, 4.6], 0.8)
  addBarrel(group, [8.1, 0.15, 4.8], 0.8)
  return rotor
}

function addGreenhouse(group: THREE.Group) {
  const house = new THREE.Group()
  house.position.set(-9.2, 0.14, 8.2)
  house.rotation.y = 0.12
  group.add(house)
  const frame = standard('#b7aa88')
  const glass = new THREE.MeshStandardMaterial({ color: '#b8d0c5', transparent: true, opacity: 0.27, roughness: 0.25, metalness: 0.05, side: THREE.DoubleSide, depthWrite: false })
  box(house, [3.6, 0.18, 2.5], [0, 0.09, 0], standard('#9b9178'))
  for (const x of [-1.75, 0, 1.75]) for (const z of [-1.2, 1.2]) box(house, [0.07, 2.1, 0.07], [x, 1.15, z], frame)
  for (const z of [-1.2, 1.2]) {
    box(house, [3.5, 1.75, 0.025], [0, 1.15, z], glass)
    box(house, [3.6, 0.07, 0.08], [0, 2.18, z], frame)
  }
  for (const x of [-1.75, 1.75]) box(house, [0.025, 1.75, 2.4], [x, 1.15, 0], glass)
  const roof = mesh(createGableGeometry(3.75, 2.7, 1.0), glass, house, [0, 2.18, 0])
  roof.castShadow = false
  for (const z of [-1.25, 0, 1.25]) {
    const beam = box(house, [0.07, 0.07, 2.8], [0, 2.65, z], frame, [0, 0, Math.PI / 4])
    beam.visible = z === 0
  }
  // Herb beds, labels and the single rose.
  for (let row = 0; row < 3; row++) {
    box(house, [0.72, 0.2, 1.75], [-1.05 + row * 1.05, 0.25, 0], standard('#75644d'))
    for (let i = 0; i < 6; i++) {
      const herb = mesh(new THREE.OctahedronGeometry(0.12, 0), standard(row === 0 ? '#738b68' : row === 1 ? '#87966d' : '#a49a6b'), house, [-1.05 + row * 1.05 + Math.sin(i) * 0.16, 0.48, -0.7 + i * 0.28])
      herb.scale.set(1, 1.6, 1)
    }
    box(house, [0.28, 0.18, 0.035], [-1.05 + row * 1.05, 0.52, 0.96], standard('#d2bd91'), [0.2, 0, 0])
  }
  cylinder(house, 0.025, 0.035, 0.9, 6, [0.15, 0.83, -0.15], standard('#607b55'))
  for (let i = 0; i < 7; i++) {
    const petal = mesh(new THREE.SphereGeometry(0.11, 7, 5), standard('#bd7f82'), house, [0.15 + Math.cos(i) * 0.08, 1.32 + Math.sin(i * 2) * 0.04, -0.15 + Math.sin(i) * 0.08])
    petal.scale.set(1, 0.65, 1)
  }
  for (const x of [-2.3, -2.9]) {
    box(house, [0.48, 0.65, 0.55], [x, 0.38, 0.5], standard('#b18f56'))
    box(house, [0.6, 0.08, 0.67], [x, 0.74, 0.5], standard('#776345'))
  }
  return house
}

function addVegetation(group: THREE.Group, seasonal: SeasonalMesh[], windUniforms: WindShaderUniforms[]) {
  const trunkGeometry = new THREE.CylinderGeometry(0.12, 0.18, 1.7, 6)
  const trunkMaterial = standard('#6c5b47')
  const treePositions: { x: number; z: number; scale: number; pine: boolean }[] = []
  let attempts = 0
  while (treePositions.length < 58 && attempts++ < 800) {
    const x = -16 + random() * 10.5
    const z = -11.5 + random() * 16.5
    if (Math.hypot(x, z) > 16.7 || (x > -9 && z > -5) || (z > 5 && x > -12)) continue
    if (treePositions.some((p) => Math.hypot(p.x - x, p.z - z) < 1.05)) continue
    treePositions.push({ x, z, scale: 0.72 + random() * 0.75, pine: random() < 0.55 })
  }
  const trunks = new THREE.InstancedMesh(trunkGeometry, trunkMaterial, treePositions.length)
  trunks.castShadow = true
  trunks.receiveShadow = true
  const dummy = new THREE.Object3D()
  treePositions.forEach((p, i) => {
    dummy.position.set(p.x, 0.85 * p.scale + 0.1, p.z)
    dummy.scale.set(p.scale, p.scale, p.scale)
    dummy.rotation.y = random() * Math.PI
    dummy.updateMatrix()
    trunks.setMatrixAt(i, dummy.matrix)
  })
  group.add(trunks)
  for (const pine of [true, false]) {
    const subset = treePositions.filter((p) => p.pine === pine)
    const geometry = pine ? new THREE.ConeGeometry(0.95, 2.7, 7) : new THREE.IcosahedronGeometry(1.05, 1)
    const uniforms: WindShaderUniforms = { uTime: { value: 0 }, uWind: { value: 0.35 } }
    windUniforms.push(uniforms)
    const material = makeWindMaterial('#ffffff', uniforms, pine ? 0.035 : 0.055)
    const crowns = new THREE.InstancedMesh(geometry, material, subset.length)
    crowns.castShadow = true
    crowns.receiveShadow = true
    const variations: number[] = []
    subset.forEach((p, i) => {
      dummy.position.set(p.x, (pine ? 2.35 : 2.05) * p.scale, p.z)
      dummy.scale.set(p.scale, p.scale * (pine ? 1 : 0.9), p.scale)
      dummy.rotation.set(0, random() * Math.PI, 0)
      dummy.updateMatrix()
      crowns.setMatrixAt(i, dummy.matrix)
      variations.push(random())
      crowns.setColorAt(i, new THREE.Color(pine ? '#557666' : '#789170'))
    })
    group.add(crowns)
    seasonal.push({ mesh: crowns, kind: pine ? 'pine' : 'leaf', variation: variations })
  }

  // Orchard trees are separate from the wild forest and carry visible fruit.
  const orchardPositions: [number, number][] = []
  for (let row = 0; row < 3; row++) for (let col = 0; col < 4; col++) orchardPositions.push([-12.5 + col * 1.75, -13 + row * 1.65])
  const orchardTrunks = new THREE.InstancedMesh(trunkGeometry, trunkMaterial, orchardPositions.length)
  const orchardCrowns = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(0.85, 1), standard('#8b9c6d'), orchardPositions.length)
  const fruit = new THREE.InstancedMesh(new THREE.SphereGeometry(0.09, 6, 5), standard('#b9755f'), orchardPositions.length * 3)
  const orchardVariation: number[] = []
  orchardPositions.forEach(([x, z], i) => {
    const scale = 0.75 + (i % 4) * 0.06
    dummy.position.set(x, 0.8 * scale, z)
    dummy.scale.setScalar(scale)
    dummy.rotation.set(0, i, 0)
    dummy.updateMatrix()
    orchardTrunks.setMatrixAt(i, dummy.matrix)
    dummy.position.set(x, 1.9 * scale, z)
    dummy.scale.set(scale, scale * 0.85, scale)
    dummy.updateMatrix()
    orchardCrowns.setMatrixAt(i, dummy.matrix)
    orchardCrowns.setColorAt(i, new THREE.Color('#87996c'))
    orchardVariation.push((i % 5) / 5)
    for (let j = 0; j < 3; j++) {
      dummy.position.set(x + Math.cos(i + j * 2.1) * 0.55, 1.75 * scale + j * 0.15, z + Math.sin(i + j * 2.1) * 0.5)
      dummy.scale.setScalar(1)
      dummy.updateMatrix()
      fruit.setMatrixAt(i * 3 + j, dummy.matrix)
    }
  })
  orchardTrunks.castShadow = orchardCrowns.castShadow = true
  group.add(orchardTrunks, orchardCrowns, fruit)
  seasonal.push({ mesh: orchardCrowns, kind: 'orchard', variation: orchardVariation })

  // Meadow grass and flower heads use instancing and a shared vertex wind field.
  const grassCount = 520
  const grassUniforms: WindShaderUniforms = { uTime: { value: 0 }, uWind: { value: 0.35 } }
  windUniforms.push(grassUniforms)
  const grass = new THREE.InstancedMesh(new THREE.ConeGeometry(0.055, 0.42, 3), makeWindMaterial('#ffffff', grassUniforms, 0.3), grassCount)
  const grassVariation: number[] = []
  let placed = 0
  attempts = 0
  while (placed < grassCount && attempts++ < 4000) {
    const angle = random() * Math.PI * 2
    const radius = 7 + random() * 10
    const x = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius
    if (Math.abs(x - 9) < 1.4 || (x < -6 && z < -7) || Math.hypot(x, z) > 17.3) continue
    dummy.position.set(x, 0.25, z)
    dummy.scale.set(0.7 + random() * 0.7, 0.6 + random() * 1.1, 0.7 + random() * 0.7)
    dummy.rotation.set(0, random() * Math.PI, (random() - 0.5) * 0.18)
    dummy.updateMatrix()
    grass.setMatrixAt(placed, dummy.matrix)
    grass.setColorAt(placed, new THREE.Color(placed % 4 === 0 ? '#a9b381' : '#849c70'))
    grassVariation.push(random())
    placed++
  }
  grass.count = placed
  grass.receiveShadow = true
  group.add(grass)
  seasonal.push({ mesh: grass, kind: 'grass', variation: grassVariation })

  const flowerCount = 260
  const flowers = new THREE.InstancedMesh(new THREE.OctahedronGeometry(0.075, 0), standard('#ffffff'), flowerCount)
  const flowerVariation: number[] = []
  const palette = ['#d8b2ad', '#e5d6a7', '#b6b5d0', '#e7e1cd', '#c69292']
  for (let i = 0; i < flowerCount; i++) {
    let x: number
    let z: number
    if (i < 110) {
      x = -12 + random() * 7
      z = 6 + random() * 5
    } else {
      const angle = random() * Math.PI * 2
      const radius = 10 + random() * 6.5
      x = Math.cos(angle) * radius
      z = Math.sin(angle) * radius
    }
    dummy.position.set(x, 0.32 + random() * 0.12, z)
    dummy.scale.setScalar(0.7 + random() * 0.9)
    dummy.rotation.set(random(), random(), random())
    dummy.updateMatrix()
    flowers.setMatrixAt(i, dummy.matrix)
    flowers.setColorAt(i, new THREE.Color(palette[i % palette.length]))
    flowerVariation.push(random())
  }
  group.add(flowers)
  seasonal.push({ mesh: flowers, kind: 'flower', variation: flowerVariation })
}

function addTerraces(group: THREE.Group, seasonal: SeasonalMesh[]) {
  const cropMaterials = ['#b4a567', '#87966b', '#9b9c72']
  for (let level = 0; level < 3; level++) {
    const z = -7.4 - level * 1.75
    const field = box(group, [7.7 - level * 0.35, 0.16, 1.5], [-5.7, 0.17 + level * 0.05, z], standard(cropMaterials[level]))
    field.rotation.y = -0.035 + level * 0.025
    for (let i = 0; i < 14; i++) {
      const x = -9.4 + i * 0.56
      box(group, [0.52, 0.35, 0.32], [x, 0.24 + level * 0.05, z + 0.83], standard(i % 3 ? '#9b917c' : '#afa28a'), [0, (i % 2) * 0.08, 0])
    }
  }
  const dummy = new THREE.Object3D()
  const wheat = new THREE.InstancedMesh(new THREE.ConeGeometry(0.04, 0.52, 4), standard('#c1ae68'), 210)
  const variation: number[] = []
  for (let i = 0; i < 210; i++) {
    const x = -9.1 + (i % 30) * 0.235 + (random() - 0.5) * 0.1
    const z = -7.95 + Math.floor(i / 30) * 0.16
    dummy.position.set(x, 0.52, z)
    dummy.scale.setScalar(0.8 + random() * 0.4)
    dummy.rotation.set(0, random() * 3, (random() - 0.5) * 0.15)
    dummy.updateMatrix()
    wheat.setMatrixAt(i, dummy.matrix)
    wheat.setColorAt(i, new THREE.Color(i % 4 === 0 ? '#d0bb78' : '#b5a160'))
    variation.push(random())
  }
  group.add(wheat)
  seasonal.push({ mesh: wheat, kind: 'wheat', variation })
  // Open threshing shelter and tools.
  for (const x of [-2.8, -0.8]) box(group, [0.12, 1.8, 0.12], [x, 1.0, -10.8], standard('#725a40'))
  const shelterRoof = mesh(createGableGeometry(2.8, 2.3, 0.8), standard('#8a7756'), group, [-1.8, 1.9, -10.8])
  ;(shelterRoof.material as THREE.MeshStandardMaterial).side = THREE.DoubleSide
  addCrate(group, [-2.2, 0.16, -10.5], 0.75)
  addBarrel(group, [-1.25, 0.16, -10.5], 0.7)
}

function addClouds(group: THREE.Group) {
  const clouds: Cloud[] = []
  const cloudMaterial = new THREE.MeshStandardMaterial({ color: '#e5e6dc', roughness: 1, transparent: true, opacity: 0.5, depthWrite: false, flatShading: true })
  for (let i = 0; i < 16; i++) {
    const cloud = new THREE.Group()
    const angle = (i / 16) * Math.PI * 2 + random() * 0.4
    const radius = 24 + random() * 27
    cloud.position.set(Math.cos(angle) * radius, -5 + random() * 22, Math.sin(angle) * radius)
    const scale = 1.5 + random() * 2.8
    cloud.scale.setScalar(scale)
    for (let j = 0; j < 5; j++) {
      const puff = mesh(new THREE.IcosahedronGeometry(0.8 + random() * 0.65, 1), cloudMaterial, cloud, [(j - 2) * 0.72, Math.sin(j * 2.1) * 0.35, (random() - 0.5) * 0.8])
      puff.castShadow = false
      puff.receiveShadow = false
    }
    group.add(cloud)
    clouds.push({ group: cloud, speed: 0.12 + random() * 0.16, phase: random() * 10, baseY: cloud.position.y })
  }
  return clouds
}

function addBirds(group: THREE.Group) {
  const birds: Bird[] = []
  const birdMaterial = new THREE.MeshStandardMaterial({ color: '#5d6d73', roughness: 0.9, side: THREE.DoubleSide })
  const wingGeometry = new THREE.BufferGeometry()
  wingGeometry.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0, 0.55, 0, -0.12, 0.15, 0, 0.25], 3))
  wingGeometry.computeVertexNormals()
  for (let i = 0; i < 12; i++) {
    const root = new THREE.Group()
    const body = mesh(new THREE.ConeGeometry(0.09, 0.55, 6), birdMaterial, root, [0, 0, 0], [Math.PI / 2, 0, 0])
    body.castShadow = false
    const left = new THREE.Group()
    const right = new THREE.Group()
    root.add(left, right)
    mesh(wingGeometry, birdMaterial, left)
    const rightWing = mesh(wingGeometry, birdMaterial, right)
    rightWing.scale.x = -1
    root.scale.setScalar(0.65 + (i % 4) * 0.12)
    group.add(root)
    birds.push({
      root, left, right,
      phase: i * 0.83,
      radius: 11 + (i % 5) * 1.4,
      speed: 0.12 + (i % 4) * 0.015,
      height: 8 + (i % 6) * 0.75,
      center: new THREE.Vector3(i < 7 ? -4 : 4, 0, i < 7 ? -2 : 2),
    })
  }
  return birds
}

function addButterflies(group: THREE.Group) {
  const butterflies: Butterfly[] = []
  const wingGeometry = new THREE.CircleGeometry(0.11, 5, 0, Math.PI)
  const colors = ['#d6b079', '#b89ebd', '#d69b91', '#e1d3a5']
  for (let i = 0; i < 16; i++) {
    const root = new THREE.Group()
    const material = new THREE.MeshBasicMaterial({ color: colors[i % colors.length], side: THREE.DoubleSide, transparent: true, opacity: 0.9 })
    const left = new THREE.Group()
    const right = new THREE.Group()
    root.add(left, right)
    const lw = mesh(wingGeometry, material, left, [-0.08, 0, 0], [Math.PI / 2, 0, 0])
    const rw = mesh(wingGeometry, material, right, [0.08, 0, 0], [Math.PI / 2, 0, Math.PI])
    lw.castShadow = rw.castShadow = false
    group.add(root)
    butterflies.push({
      root, left, right,
      center: new THREE.Vector3(i < 11 ? -9 : -1, 0.8 + (i % 4) * 0.25, i < 11 ? 8 : 2.5),
      phase: i * 1.37,
      radius: 0.8 + (i % 5) * 0.4,
      speed: 0.45 + (i % 4) * 0.11,
    })
  }
  return butterflies
}

function addPrecipitation(group: THREE.Group) {
  const count = 420
  const rainPositions = new Float32Array(count * 6)
  for (let i = 0; i < count; i++) {
    const x = (random() - 0.5) * 38
    const y = random() * 24
    const z = (random() - 0.5) * 38
    rainPositions.set([x, y, z, x + 0.05, y - 0.65, z + 0.03], i * 6)
  }
  const rainGeometry = new THREE.BufferGeometry()
  rainGeometry.setAttribute('position', new THREE.BufferAttribute(rainPositions, 3))
  const rainMaterial = new THREE.LineBasicMaterial({ color: '#b6ccd1', transparent: true, opacity: 0, depthWrite: false })
  const rain = new THREE.LineSegments(rainGeometry, rainMaterial)
  rain.frustumCulled = false
  group.add(rain)

  const fireflyCount = 90
  const positions = new Float32Array(fireflyCount * 3)
  for (let i = 0; i < fireflyCount; i++) {
    const region = i < 40 ? 0 : i < 65 ? 1 : 2
    const centerX = region === 0 ? -10 : region === 1 ? -12 : -3
    const centerZ = region === 0 ? 8 : region === 1 ? -3 : 2.5
    positions[i * 3] = centerX + (random() - 0.5) * (region === 1 ? 6 : 8)
    positions[i * 3 + 1] = 0.4 + random() * 2.6
    positions[i * 3 + 2] = centerZ + (random() - 0.5) * 6
  }
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  const fireflyMaterial = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: { uTime: { value: 0 }, uNight: { value: 0 }, uWind: { value: 0.3 }, uPixelRatio: { value: 1 } },
    vertexShader: `
      uniform float uTime;
      uniform float uWind;
      uniform float uPixelRatio;
      varying float vPulse;
      void main() {
        vec3 p = position;
        float phase = position.x * 3.1 + position.z * 2.7;
        p.x += sin(uTime * 0.7 + phase) * (0.18 + uWind * 0.25);
        p.y += sin(uTime * 1.1 + phase * 1.7) * 0.22;
        p.z += cos(uTime * 0.6 + phase) * 0.18;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        vPulse = sin(uTime * 2.0 + phase) * 0.5 + 0.5;
        gl_PointSize = (3.0 + vPulse * 3.5) * uPixelRatio * (18.0 / -mv.z);
      }
    `,
    fragmentShader: `
      uniform float uNight;
      varying float vPulse;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        float alpha = (1.0 - smoothstep(0.0, 0.5, d)) * uNight * (0.35 + vPulse * 0.65);
        gl_FragColor = vec4(vec3(1.0, 0.78, 0.3), alpha);
      }
    `,
  })
  const fireflies = new THREE.Points(geometry, fireflyMaterial)
  fireflies.frustumCulled = false
  group.add(fireflies)

  const mistCount = 110
  const mistPositions = new Float32Array(mistCount * 3)
  for (let i = 0; i < mistCount; i++) {
    mistPositions.set([11.8 + (random() - 0.5) * 3, -11 + random() * 6, 14.5 + (random() - 0.5) * 3], i * 3)
  }
  const mistGeometry = new THREE.BufferGeometry()
  mistGeometry.setAttribute('position', new THREE.BufferAttribute(mistPositions, 3))
  const mist = new THREE.Points(mistGeometry, new THREE.PointsMaterial({ color: '#d5e2df', size: 0.32, transparent: true, opacity: 0.35, depthWrite: false }))
  group.add(mist)
  return { rain, rainPositions, rainMaterial, fireflies, fireflyMaterial, mist, mistPositions }
}

function addDistantIslets(group: THREE.Group) {
  for (const [x, y, z, scale] of [[-38, 2, -28, 0.8], [35, -3, -34, 0.55], [-32, -8, 26, 0.45]] as const) {
    const islet = new THREE.Group()
    islet.position.set(x, y, z)
    islet.scale.setScalar(scale)
    group.add(islet)
    cylinder(islet, 3.8, 0.25, 7, 9, [0, -3.4, 0], standard('#747a70'))
    cylinder(islet, 3.85, 3.85, 0.35, 9, [0, 0.1, 0], standard('#879a79'))
    cylinder(islet, 0.16, 0.22, 2, 6, [0, 1.1, 0], standard('#685744'))
    mesh(new THREE.IcosahedronGeometry(1.25, 1), standard('#718b75'), islet, [0, 2.5, 0])
  }
}

export function buildEnvironment(): EnvironmentRefs {
  const group = new THREE.Group()
  group.name = '浮岛地貌与生态'
  const { top, material: topMaterial } = createTopTerrain()
  const { rock, material: rockMaterial } = createRockIsland()
  group.add(rock, top)

  const waterMaterials: THREE.ShaderMaterial[] = []
  const waterMaterial = createWaterMaterial()
  waterMaterials.push(waterMaterial)
  const river = mesh(createRibbonGeometry([
    [6.8, 0.19, -13.4], [8.1, 0.2, -9.2], [9.8, 0.19, -4.4], [9.1, 0.2, 0],
    [10.1, 0.2, 5.2], [11.2, 0.19, 10.1], [11.8, 0.16, 14.5],
  ], 1.45, 90, 0.13), waterMaterial, group)
  river.castShadow = false
  const pond = mesh(new THREE.CircleGeometry(2.25, 36), waterMaterial, group, [6.8, 0.18, -13.3], [-Math.PI / 2, 0, 0])
  pond.castShadow = false
  const waterfallMaterial = createWaterfallMaterial()
  waterMaterials.push(waterfallMaterial)
  const waterfall = mesh(new THREE.PlaneGeometry(1.75, 12, 10, 40), waterfallMaterial, group, [11.8, -5.85, 14.55], [0, -0.08, 0])
  waterfall.castShadow = false

  addPath(group, [[-1, 0.15, 6], [-1.8, 0.15, 7.7], [-5, 0.15, 8.4], [-9.2, 0.15, 8.2]], 1.15)
  addPath(group, [[0, 0.15, 6], [3.5, 0.15, 7], [6.5, 0.15, 5], [8.1, 0.15, 2.8]], 1.0)
  addPath(group, [[-4.5, 0.15, -5.4], [-5.3, 0.15, -7], [-5.7, 0.15, -10.4]], 0.9)
  addPath(group, [[-8.4, 0.15, 1], [-10.2, 0.15, -0.5], [-12.2, 0.15, -3.5], [-12.8, 0.15, -6]], 0.7)
  addPath(group, [[-1, 0.15, 6.2], [2.8, 0.15, 8.4], [5.6, 0.15, 7.2]], 0.8)

  const seasonal: SeasonalMesh[] = []
  const windUniforms: WindShaderUniforms[] = []
  addVegetation(group, seasonal, windUniforms)
  addTerraces(group, seasonal)
  addGreenhouse(group)
  const waterWheel = addMill(group)
  const forge = addHouse(group, 6.6, 3.6, 0.78, '#a89c86', '#6e7379')
  forge.rotation.y = -0.3
  const stable = addHouse(group, 5.3, 7.4, 0.9, '#b3a182', '#7c7880')
  stable.rotation.y = 0.18
  const herbal = addHouse(group, -11.2, -1.8, 0.72, '#a89f89', '#66796f')
  herbal.rotation.y = 0.4
  addHouse(group, -11.7, 5.1, 0.68, '#b7a78d', '#7c7180')

  // Fences, beehives, reeds and riverbank stones.
  for (let i = 0; i < 18; i++) {
    const x = -12.8 + i * 0.72
    box(group, [0.08, 0.75, 0.08], [x, 0.48, -5.95], standard('#887352'))
    if (i < 17) box(group, [0.76, 0.07, 0.07], [x + 0.35, 0.55, -5.95], standard('#887352'))
  }
  for (let i = 0; i < 34; i++) {
    const z = -11 + i * 0.7
    const x = 9.5 + Math.sin(i * 0.7) * 1.0 + (i % 2 ? 0.9 : -0.9)
    if (Math.hypot(x, z) > 17) continue
    const stone = mesh(new THREE.DodecahedronGeometry(0.18 + random() * 0.23, 0), standard(i % 3 ? '#92998b' : '#adb09e'), group, [x, 0.24, z])
    stone.scale.y = 0.55
  }

  const floaters: EnvironmentRefs['floaters'] = []
  for (let i = 0; i < 18; i++) {
    const angle = random() * Math.PI * 2
    const radius = 4 + random() * 11
    const y = -4 - random() * 11
    const fragment = mesh(new THREE.DodecahedronGeometry(0.18 + random() * 0.5, 0), standard('#646b67'), group, [Math.cos(angle) * radius, y, Math.sin(angle) * radius])
    fragment.scale.set(1, 1.4, 0.8)
    floaters.push({ mesh: fragment, baseY: y, phase: random() * 8 })
  }

  const clouds = addClouds(group)
  const birds = addBirds(group)
  const butterflies = addButterflies(group)
  const precipitation = addPrecipitation(group)
  addDistantIslets(group)

  return {
    group, top, topMaterial, rockMaterial, waterMaterials, windUniforms, seasonal, waterWheel,
    clouds, floaters, butterflies, birds, ...precipitation,
  }
}

const seasonPalettes: Record<Season, Record<SeasonalMesh['kind'], string[]>> = {
  春: {
    pine: ['#557666', '#607e6c'], leaf: ['#789170', '#8da17a'], orchard: ['#87996c', '#9aa779'],
    grass: ['#849c70', '#a9b381'], flower: ['#d8b2ad', '#e5d6a7', '#b6b5d0'], wheat: ['#b5a160', '#d0bb78'],
  },
  夏: {
    pine: ['#496c5d', '#557664'], leaf: ['#657f5d', '#748b63'], orchard: ['#6f875c', '#829466'],
    grass: ['#748c5e', '#98a56c'], flower: ['#cf8e91', '#e3c680', '#a99cc4'], wheat: ['#c5a454', '#d6bb68'],
  },
  秋: {
    pine: ['#536d5e', '#607665'], leaf: ['#a58155', '#b29360', '#8d7653'], orchard: ['#9b8355', '#aa955f'],
    grass: ['#9b9667', '#b0a271'], flower: ['#c38e77', '#d4b476', '#a58ca0'], wheat: ['#b49450', '#c8aa62'],
  },
  冬: {
    pine: ['#526a63', '#61776e'], leaf: ['#7c8173', '#909183'], orchard: ['#818574', '#969784'],
    grass: ['#929982', '#abb09b'], flower: ['#c7c4b7', '#d9d4c6', '#b5b8c0'], wheat: ['#a99f7c', '#bbb18e'],
  },
}

export function applySeason(refs: EnvironmentRefs, season: Season) {
  const dummyColor = new THREE.Color()
  for (const item of refs.seasonal) {
    const palette = seasonPalettes[season][item.kind]
    for (let i = 0; i < item.mesh.count; i++) {
      dummyColor.set(palette[i % palette.length])
      const variation = item.variation[i] ?? 0.5
      dummyColor.offsetHSL(0, 0, (variation - 0.5) * 0.08)
      item.mesh.setColorAt(i, dummyColor)
    }
    if (item.mesh.instanceColor) item.mesh.instanceColor.needsUpdate = true
  }
  refs.topMaterial.color.set(season === '冬' ? '#d2d5c9' : season === '秋' ? '#e3d5b8' : '#ffffff')
}
