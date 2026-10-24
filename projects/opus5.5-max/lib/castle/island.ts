import * as THREE from 'three'
import { Batcher, mat4, noOutline, PALETTE, rng, toon, unitGeo } from './core'
import {
  heightAt,
  islandRadiusAt,
  LAKE,
  noise2,
  radialFactor,
  STREAM,
  zoneAt,
} from './terrain'

const RINGS = 60
const SEGS = 200

function smooth(a: number, b: number, v: number) {
  const t = Math.min(1, Math.max(0, (v - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

const C = {
  grass: new THREE.Color(PALETTE.grass),
  grassDeep: new THREE.Color(PALETTE.grassDeep),
  meadow: new THREE.Color(PALETTE.meadowLight),
  wheatSoil: new THREE.Color('#d9b45e'),
  sand: new THREE.Color(PALETTE.sand),
  sandWet: new THREE.Color('#cdbb8f'),
  rock: new THREE.Color(PALETTE.rock),
  rockDark: new THREE.Color(PALETTE.rockDark),
  soil: new THREE.Color(PALETTE.soil),
  snow: new THREE.Color(PALETTE.snow),
  road: new THREE.Color('#e3cfa4'),
  paving: new THREE.Color('#d8cdb4'),
}

function terrainColor(x: number, z: number, h: number, out: THREE.Color) {
  const zn = zoneAt(x, z)
  const n = noise2(x * 1.3 + 5, z * 1.3)
  out.copy(C.grass)
  if (n > 0.25) out.lerp(C.meadow, Math.min(1, (n - 0.25) * 1.4))
  if (n < -0.35) out.lerp(C.grassDeep, Math.min(1, (-0.35 - n) * 1.6))
  if (zn.wheat) out.lerp(C.wheatSoil, 0.85)
  if (zn.desert > 0) out.lerp(C.sand, zn.desert)
  if (zn.mountain > 2.2) out.lerp(C.rock, smooth(2.2, 4.8, zn.mountain))
  const snowLine = 8.4 + n * 0.7
  if (h > snowLine - 1) out.lerp(C.snow, smooth(snowLine - 0.6, snowLine + 0.4, h))
  if (zn.lake < LAKE.r + 0.8) out.lerp(C.sandWet, smooth(LAKE.r + 0.8, LAKE.r - 0.4, zn.lake))
  if (zn.stream < STREAM.width + 0.4) out.lerp(C.sandWet, smooth(STREAM.width + 0.4, STREAM.width * 0.4, zn.stream))
  if (zn.road < 1.05) out.lerp(C.road, smooth(1.05, 0.55, zn.road))
  if (Math.abs(x) < 8.9 && Math.abs(z) < 8.9) out.lerp(C.paving, 0.92)
  if (zn.rim > 0.9) out.lerp(C.grassDeep, smooth(0.9, 1, zn.rim) * 0.35)
  return out
}

function buildTop() {
  const positions: number[] = []
  const colors: number[] = []
  const indices: number[] = []
  const color = new THREE.Color()

  positions.push(0, heightAt(0, 0), 0)
  terrainColor(0, 0, heightAt(0, 0), color)
  colors.push(color.r, color.g, color.b)

  for (let i = 1; i <= RINGS; i++) {
    for (let j = 0; j < SEGS; j++) {
      const angle = (j / SEGS) * Math.PI * 2
      const r = (i / RINGS) * islandRadiusAt(angle) * (i === RINGS ? 0.999 : 1)
      const x = Math.cos(angle) * r
      const z = Math.sin(angle) * r
      const h = heightAt(x, z)
      positions.push(x, h, z)
      terrainColor(x, z, h, color)
      colors.push(color.r, color.g, color.b)
    }
  }

  for (let j = 0; j < SEGS; j++) {
    const a = 1 + j
    const b = 1 + ((j + 1) % SEGS)
    indices.push(0, b, a)
  }
  for (let i = 1; i < RINGS; i++) {
    for (let j = 0; j < SEGS; j++) {
      const a = 1 + (i - 1) * SEGS + j
      const b = 1 + (i - 1) * SEGS + ((j + 1) % SEGS)
      const c = 1 + i * SEGS + j
      const d = 1 + i * SEGS + ((j + 1) % SEGS)
      indices.push(a, b, c, b, d, c)
    }
  }

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
  geo.setIndex(indices)
  geo.computeVertexNormals()
  const mesh = new THREE.Mesh(geo, toon('#ffffff', { vertexColors: true, outlineThickness: 0.002 }))
  mesh.receiveShadow = true
  mesh.castShadow = true
  mesh.name = 'island-top'
  return mesh
}

function buildUnderside() {
  const K = 16
  const positions: number[] = []
  const colors: number[] = []
  const indices: number[] = []
  const color = new THREE.Color()

  for (let k = 0; k <= K; k++) {
    for (let j = 0; j < SEGS; j++) {
      const angle = (j / SEGS) * Math.PI * 2
      const R = islandRadiusAt(angle) * 0.999
      const ex = Math.cos(angle) * R
      const ez = Math.sin(angle) * R
      const he = heightAt(ex, ez)
      let r: number
      let y: number
      if (k === 0) {
        r = R
        y = he
      } else if (k === 1) {
        r = R + 0.55
        y = he - 0.7
      } else {
        const t = (k - 1) / (K - 1)
        const wobble = 1 + 0.09 * Math.sin(angle * 7 + k) + 0.06 * Math.sin(angle * 13 - k * 2)
        r = R * Math.pow(1 - t, 0.8) * wobble
        const depth = 26 + 3.5 * Math.sin(angle * 2 + 1) + 2 * Math.sin(angle * 5)
        y = he - 0.7 - Math.pow(t, 1.15) * depth
      }
      positions.push(Math.cos(angle) * r, y, Math.sin(angle) * r)
      if (k <= 1) color.copy(C.grassDeep)
      else if (k === 2) color.copy(C.soil)
      else {
        const band = Math.sin(y * 0.9 + Math.sin(angle * 3) * 1.2)
        color.copy(band > 0.35 ? C.rock : band < -0.45 ? C.soil : C.rockDark)
        color.lerp(C.rockDark, Math.min(1, -y / 40))
      }
      colors.push(color.r, color.g, color.b)
    }
  }
  for (let k = 0; k < K; k++) {
    for (let j = 0; j < SEGS; j++) {
      const a = k * SEGS + j
      const b = k * SEGS + ((j + 1) % SEGS)
      const c = (k + 1) * SEGS + j
      const d = (k + 1) * SEGS + ((j + 1) % SEGS)
      indices.push(a, c, b, b, c, d)
    }
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
  geo.setIndex(indices)
  geo.computeVertexNormals()
  const mesh = new THREE.Mesh(geo, toon('#ffffff', { vertexColors: true, outlineThickness: 0.0025 }))
  mesh.castShadow = true
  mesh.receiveShadow = true
  mesh.name = 'island-underside'
  return mesh
}

function buildHangingDetails() {
  const batcher = new Batcher()
  const random = rng(42)
  const rootMat = toon(PALETTE.woodDark)
  const vineMat = toon(PALETTE.leafDeep)
  const rockMat = toon(PALETTE.rockDark)

  for (let i = 0; i < 70; i++) {
    const angle = random() * Math.PI * 2
    const R = islandRadiusAt(angle) + 0.25
    const x = Math.cos(angle) * R
    const z = Math.sin(angle) * R
    const top = heightAt(x * 0.99, z * 0.99) - 0.7
    const len = 1.5 + random() * 4.5
    const thick = 0.05 + random() * 0.07
    const sway = (random() - 0.5) * 0.25
    batcher.add(unitGeo.cyl(0.4, 5), random() > 0.4 ? rootMat : vineMat, mat4(x, top - len, z, sway, 0, sway, thick, len, thick))
    if (random() > 0.55) {
      for (let l = 0; l < 3; l++) {
        batcher.add(unitGeo.sphere(6, 5), vineMat, mat4(x + (random() - 0.5) * 0.3, top - random() * len, z + (random() - 0.5) * 0.3, 0, 0, 0, 0.18, 0.12, 0.18))
      }
    }
  }

  for (let i = 0; i < 46; i++) {
    const angle = random() * Math.PI * 2
    const t = 0.25 + random() * 0.6
    const R = islandRadiusAt(angle) * Math.pow(1 - t, 0.8) * 0.92
    const depth = 26 + 3.5 * Math.sin(angle * 2 + 1)
    const y = -0.7 - Math.pow(t, 1.15) * depth
    const len = 1.5 + random() * 4 * (1 - t * 0.5)
    const r = 0.5 + random() * 1.1
    batcher.add(unitGeo.cone(7), rockMat, mat4(Math.cos(angle) * R, y + 0.3, Math.sin(angle) * R, Math.PI, random() * 3, 0, r, len, r))
  }
  return batcher.build('underside-details')
}

function buildCrystals() {
  const group = new THREE.Group()
  const material = toon('#bfe3f0', { emissive: '#8fd0ea', emissiveIntensity: 0.35, outlineThickness: 0.002 })
  const geo = new THREE.OctahedronGeometry(1, 0)
  const random = rng(7)
  for (let i = 0; i < 18; i++) {
    const angle = random() * Math.PI * 2
    const t = 0.3 + random() * 0.55
    const R = islandRadiusAt(angle) * Math.pow(1 - t, 0.8) * 0.9
    const y = -0.7 - Math.pow(t, 1.15) * 26
    const mesh = new THREE.Mesh(geo, material)
    const s = 0.35 + random() * 0.6
    mesh.scale.set(s * 0.6, s * 1.6, s * 0.6)
    mesh.position.set(Math.cos(angle) * R, y - s, Math.sin(angle) * R)
    mesh.rotation.set(random() * 0.4, random() * 3, random() * 0.4)
    group.add(mesh)
  }
  return { group, material }
}

function findStreamEdge() {
  let x = STREAM.x0
  let z = STREAM.z0
  for (let i = 0; i < 200; i++) {
    if (radialFactor(x, z) >= 0.995) break
    x += STREAM.dirX * 0.1
    z += STREAM.dirZ * 0.1
  }
  return new THREE.Vector3(x, heightAt(x, z), z)
}

const waterfallVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const waterfallFragment = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColor;
  uniform vec3 uFoam;
  varying vec2 vUv;
  void main() {
    float streak = sin(vUv.x * 21.0 + sin(vUv.x * 7.0) * 2.0) * 0.5 + 0.5;
    float flow = fract(vUv.y * 7.0 - uTime * 1.3 + streak * 0.4);
    float band = smoothstep(0.0, 0.2, flow) * smoothstep(0.75, 0.35, flow);
    vec3 col = mix(uColor, uFoam, band * 0.55 + smoothstep(0.65, 1.0, streak) * 0.3);
    float edge = smoothstep(0.0, 0.2, vUv.x) * smoothstep(1.0, 0.8, vUv.x);
    float fade = 1.0 - smoothstep(0.45, 1.0, vUv.y);
    gl_FragColor = vec4(col, 0.88 * edge * fade);
  }
`

function buildWater() {
  const group = new THREE.Group()
  const waterMat = noOutline(
    new THREE.MeshToonMaterial({
      color: PALETTE.water,
      transparent: true,
      opacity: 0.86,
    }),
  )

  const lake = new THREE.Mesh(new THREE.CircleGeometry(LAKE.r + 0.7, 64), waterMat)
  lake.rotation.x = -Math.PI / 2
  lake.position.set(LAKE.x, LAKE.level, LAKE.z)
  lake.receiveShadow = true
  group.add(lake)

  const edge = findStreamEdge()
  const startX = LAKE.x - LAKE.r * 0.8
  const startZ = LAKE.z + 0.6
  const len = Math.hypot(edge.x - startX, edge.z - startZ)
  const stream = new THREE.Mesh(new THREE.PlaneGeometry(len + 0.6, STREAM.width * 1.25), waterMat)
  stream.rotation.x = -Math.PI / 2
  stream.rotation.z = -Math.atan2(edge.z - startZ, edge.x - startX)
  stream.position.set((startX + edge.x) / 2, LAKE.level - 0.12, (startZ + edge.z) / 2)
  group.add(stream)

  const ripples: THREE.Mesh[] = []
  const rippleMat = noOutline(new THREE.MeshBasicMaterial({ color: PALETTE.white, transparent: true, opacity: 0.5 }))
  for (let i = 0; i < 3; i++) {
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.92, 1, 40), rippleMat.clone())
    ring.rotation.x = -Math.PI / 2
    ring.position.set(LAKE.x + (i - 1) * 1.8, LAKE.level + 0.02, LAKE.z + (i % 2) * 1.5 - 0.5)
    ring.userData.phase = i / 3
    ripples.push(ring)
    group.add(ring)
  }

  const padMat = toon(PALETTE.leaf, { outlineThickness: 0.002 })
  const random = rng(19)
  for (let i = 0; i < 9; i++) {
    const a = random() * Math.PI * 2
    const d = 2 + random() * (LAKE.r - 2.6)
    const pad = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.05, 10, 1, false, 0.3, Math.PI * 1.8), padMat)
    pad.position.set(LAKE.x + Math.cos(a) * d, LAKE.level + 0.03, LAKE.z + Math.sin(a) * d)
    pad.rotation.y = random() * Math.PI
    group.add(pad)
    if (i % 3 === 0) {
      const flower = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 6), toon('#f6c6cf'))
      flower.position.copy(pad.position).add(new THREE.Vector3(0.1, 0.1, 0))
      group.add(flower)
    }
  }

  const dir = new THREE.Vector3(STREAM.dirX, 0, STREAM.dirZ).normalize()
  const side = new THREE.Vector3(-dir.z, 0, dir.x)
  const FALL = 30
  const ROWS = 48
  const width = STREAM.width * 1.25
  const positions: number[] = []
  const uvs: number[] = []
  const indices: number[] = []
  for (let v = 0; v <= ROWS; v++) {
    const t = v / ROWS
    const fall = t * FALL
    const out = 0.35 + Math.sqrt(fall) * 0.75
    const spread = width / 2 + fall * 0.05
    for (let u = 0; u <= 1; u++) {
      const s = u === 0 ? -spread : spread
      positions.push(
        edge.x + dir.x * out + side.x * s,
        LAKE.level - 0.15 - fall,
        edge.z + dir.z * out + side.z * s,
      )
      uvs.push(u, t)
    }
  }
  for (let v = 0; v < ROWS; v++) {
    const a = v * 2
    indices.push(a, a + 2, a + 1, a + 1, a + 2, a + 3)
  }
  const fallGeo = new THREE.BufferGeometry()
  fallGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  fallGeo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))
  fallGeo.setIndex(indices)
  const fallMat = noOutline(
    new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(PALETTE.water) },
        uFoam: { value: new THREE.Color(PALETTE.white) },
      },
      vertexShader: waterfallVertex,
      fragmentShader: waterfallFragment,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    }),
  )
  const waterfall = new THREE.Mesh(fallGeo, fallMat)
  waterfall.name = 'waterfall'
  group.add(waterfall)

  const mistMat = noOutline(new THREE.MeshBasicMaterial({ color: PALETTE.white, transparent: true, opacity: 0.55, depthWrite: false }))
  const mist: THREE.Mesh[] = []
  for (let i = 0; i < 9; i++) {
    const puff = new THREE.Mesh(unitGeo.sphere(10, 8), mistMat)
    const fall = 12 + i * 2.2
    const out = 0.35 + Math.sqrt(fall) * 0.75
    puff.position.set(edge.x + dir.x * out + side.x * (Math.random() - 0.5) * 2, LAKE.level - fall, edge.z + dir.z * out + side.z * (Math.random() - 0.5) * 2)
    const s = 0.9 + i * 0.25
    puff.scale.setScalar(s)
    puff.userData.base = puff.position.y
    puff.userData.phase = i * 0.7
    mist.push(puff)
    group.add(puff)
  }

  return {
    group,
    waterfallEdge: edge,
    update(time: number) {
      fallMat.uniforms.uTime.value = time
      ripples.forEach((ring) => {
        const p = (time * 0.25 + ring.userData.phase) % 1
        ring.scale.setScalar(0.3 + p * 2.2)
        ;(ring.material as THREE.MeshBasicMaterial).opacity = 0.5 * (1 - p)
      })
      mist.forEach((puff) => {
        puff.position.y = puff.userData.base + Math.sin(time * 0.6 + puff.userData.phase) * 0.4
      })
    },
  }
}

export function createIsland() {
  const group = new THREE.Group()
  group.name = 'island'
  group.add(buildTop())
  group.add(buildUnderside())
  group.add(buildHangingDetails())
  const crystals = buildCrystals()
  group.add(crystals.group)
  const water = buildWater()
  group.add(water.group)

  return {
    group,
    waterfallEdge: water.waterfallEdge,
    update(time: number, night: number) {
      water.update(time)
      crystals.material.emissiveIntensity = 0.25 + night * 0.9
      crystals.group.children.forEach((c, i) => {
        c.rotation.y += 0.002 * (i % 2 === 0 ? 1 : -1)
      })
    },
  }
}
