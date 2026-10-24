import * as THREE from 'three'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { Batcher, Builder, mat4, noOutline, PALETTE, rng, toon, unitGeo } from './core'
import {
  DESERT,
  heightAt,
  inWheat,
  isOnIsland,
  KNOLL,
  LAKE,
  lakeDistance,
  mountainHeight,
  desertFactor,
  roadDistance,
  streamDistance,
  VILLAGE,
  VOLCANOES,
  WHEAT,
  WINDMILL,
} from './terrain'

export const BAOBABS: [number, number, number][] = [
  [-26, -3, 1.15],
  [-24.5, 4, 0.9],
  [9, -27, 1.05],
  [-12, 26.5, 0.45],
  [-20.5, 18.5, 0.35],
]

function isFree(x: number, z: number, margin = 2.4) {
  if (!isOnIsland(x, z, margin)) return false
  if (Math.hypot(x, z) < 15.5) return false
  if (roadDistance(x, z) < 1.7) return false
  if (lakeDistance(x, z) < LAKE.r + 1.4) return false
  if (streamDistance(x, z) < 2.2) return false
  if (inWheat(x - 1, z - 1) || inWheat(x + 1, z + 1)) return false
  if (desertFactor(x, z) > 0.05) return false
  if (Math.hypot(x - VILLAGE.x, z - VILLAGE.z) < 7) return false
  if (Math.hypot(x - KNOLL.x, z - KNOLL.z) < 4) return false
  if (Math.hypot(x - WINDMILL.x, z - WINDMILL.z) < 3.5) return false
  for (const v of VOLCANOES) if (Math.hypot(x - v.x, z - v.z) < v.r + 1.5) return false
  return true
}

function roundTree(b: Builder, x: number, z: number, s: number, random: () => number) {
  const y = heightAt(x, z) - 0.1
  const trunk = toon(PALETTE.wood)
  const crowns = [toon(PALETTE.leaf), toon(PALETTE.leafDeep), toon('#9cbf74')]
  const crown = crowns[Math.floor(random() * crowns.length)]
  b.cyl(trunk, 0.12 * s, 0.2 * s, 1.6 * s, x, y, z, 6)
  const geo = unitGeo.ico(1)
  b.batcher.add(geo, crown, b.base.clone().multiply(mat4(x, y + 2.1 * s, z, 0, random() * 3, 0, 1.05 * s, 0.95 * s, 1.05 * s)))
  if (random() > 0.4) {
    b.batcher.add(geo, crown, b.base.clone().multiply(mat4(x + 0.55 * s, y + 1.75 * s, z + 0.2 * s, 0, 0, 0, 0.62 * s, 0.56 * s, 0.62 * s)))
  }
}

function poplar(b: Builder, x: number, z: number, s: number) {
  const y = heightAt(x, z) - 0.1
  b.cyl(toon(PALETTE.wood), 0.1 * s, 0.15 * s, 1 * s, x, y, z, 6)
  b.batcher.add(unitGeo.ico(1), toon(PALETTE.leafDeep), b.base.clone().multiply(mat4(x, y + 2.4 * s, z, 0, 0, 0, 0.62 * s, 1.75 * s, 0.62 * s)))
}

function pine(b: Builder, x: number, z: number, s: number, snowy: boolean) {
  const y = heightAt(x, z) - 0.15
  const green = toon(PALETTE.pine)
  const snow = toon(PALETTE.snow)
  b.cyl(toon(PALETTE.woodDark), 0.1 * s, 0.14 * s, 0.7 * s, x, y, z, 5)
  b.cone(green, 0.95 * s, 1.5 * s, x, y + 0.5 * s, z, 8)
  b.cone(green, 0.75 * s, 1.3 * s, x, y + 1.15 * s, z, 8)
  b.cone(snowy ? snow : green, 0.52 * s, 1.1 * s, x, y + 1.8 * s, z, 8)
}

function baobab(b: Builder, x: number, z: number, s: number, random: () => number) {
  const y = heightAt(x, z) - 0.2
  const bark = toon(PALETTE.baobab)
  const crown = toon('#7ea56a')
  b.cyl(bark, 0.75 * s, 1.25 * s, 3.6 * s, x, y, z, 10)
  b.sphere(bark, 1.05 * s, x, y + 1.2 * s, z, 1, 0.9, 1)
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + 0.4
    const rx = Math.cos(a)
    const rz = Math.sin(a)
    b.batcher.add(unitGeo.cyl(0.6, 6), bark, b.base.clone().multiply(mat4(x + rx * 0.9 * s, y + 0.2, z + rz * 0.9 * s, rz * 1.3, 0, -rx * 1.3, 0.35 * s, 1.2 * s, 0.35 * s)))
  }
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2 + random()
    const len = 1.8 * s
    const bx = x + Math.cos(a) * len
    const bz = z + Math.sin(a) * len
    const by = y + 3.4 * s + random() * 0.6 * s
    b.batcher.add(unitGeo.cyl(0.55, 5), bark, b.base.clone().multiply(mat4(x, y + 3.2 * s, z, Math.sin(a) * 0.95, 0, -Math.cos(a) * 0.95, 0.22 * s, len * 1.15, 0.22 * s)))
    b.sphere(crown, 1.05 * s, bx, by + 0.5 * s, bz, 1.25, 0.55, 1.25)
  }
  b.sphere(crown, 1.4 * s, x, y + 4.2 * s, z, 1.35, 0.55, 1.35)
}

function windSway(material: THREE.Material, strength: number, uTime: { value: number }) {
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = uTime
    shader.vertexShader =
      'uniform float uTime;\n' +
      shader.vertexShader.replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>
        #ifdef USE_INSTANCING
          vec3 swayOrigin = vec3(instanceMatrix[3][0], 0.0, instanceMatrix[3][2]);
        #else
          vec3 swayOrigin = vec3(0.0);
        #endif
        float sway = sin(uTime * 1.7 + swayOrigin.x * 0.42 + swayOrigin.z * 0.31) * ${strength.toFixed(3)} * max(position.y, 0.0);
        transformed.x += sway;
        transformed.z += sway * 0.45;`,
      )
  }
  material.customProgramCacheKey = () => `wind-${strength}`
}

function buildWheat(uTime: { value: number }) {
  const stalk = new THREE.ConeGeometry(0.035, 1, 3).translate(0, 0.5, 0)
  const head = new THREE.SphereGeometry(0.07, 5, 4).scale(1, 2.6, 1).translate(0, 1.02, 0)
  const geo = mergeGeometries([stalk.toNonIndexed(), head.toNonIndexed()])!
  const material = noOutline(toon('#ffffff', { outline: false }).clone())
  windSway(material, 0.13, uTime)
  const random = rng(5)
  const spots: THREE.Matrix4[] = []
  for (let x = WHEAT.x0 + 0.3; x < WHEAT.x1 - 0.3; x += 0.32) {
    for (let z = WHEAT.z0 + 0.3; z < WHEAT.z1 - 0.3; z += 0.36) {
      if (Math.floor((x - WHEAT.x0) / 2.4) % 4 === 3 && Math.abs(((x - WHEAT.x0) % 2.4) - 1.2) < 0.45) continue
      const jx = x + (random() - 0.5) * 0.22
      const jz = z + (random() - 0.5) * 0.22
      if (!isOnIsland(jx, jz, 1.5)) continue
      const s = 0.75 + random() * 0.45
      spots.push(mat4(jx, heightAt(jx, jz) - 0.05, jz, (random() - 0.5) * 0.2, random() * 3, (random() - 0.5) * 0.2, s, s, s))
    }
  }
  const mesh = new THREE.InstancedMesh(geo, material, spots.length)
  const color = new THREE.Color()
  spots.forEach((m, i) => {
    mesh.setMatrixAt(i, m)
    color.set(PALETTE.wheat).offsetHSL((random() - 0.5) * 0.03, 0, (random() - 0.5) * 0.08)
    mesh.setColorAt(i, color)
  })
  mesh.receiveShadow = true
  mesh.name = 'wheat'
  return mesh
}

function buildGrassAndFlowers(uTime: { value: number }) {
  const random = rng(11)
  const blades = [0, 1, 2].map((i) =>
    new THREE.ConeGeometry(0.05, 0.55 - i * 0.08, 3)
      .translate(0, (0.55 - i * 0.08) / 2, 0)
      .rotateZ((i - 1) * 0.35)
      .translate((i - 1) * 0.06, 0, 0)
      .toNonIndexed(),
  )
  const tuftGeo = mergeGeometries(blades)!
  const tuftMat = noOutline(toon('#ffffff', { outline: false }).clone())
  windSway(tuftMat, 0.22, uTime)

  const tufts: THREE.Matrix4[] = []
  const tuftColors: THREE.Color[] = []
  let tries = 0
  while (tufts.length < 1400 && tries < 9000) {
    tries++
    const a = random() * Math.PI * 2
    const r = Math.sqrt(random()) * 33
    const x = Math.cos(a) * r
    const z = Math.sin(a) * r
    if (!isOnIsland(x, z, 1)) continue
    if (Math.abs(x) < 9.4 && Math.abs(z) < 9.4) continue
    if (inWheat(x, z) || desertFactor(x, z) > 0.2 || roadDistance(x, z) < 0.9) continue
    if (lakeDistance(x, z) < LAKE.r + 0.3 || streamDistance(x, z) < 1.2) continue
    if (mountainHeight(x, z) > 4) continue
    const s = 0.7 + random() * 0.7
    tufts.push(mat4(x, heightAt(x, z) - 0.04, z, 0, random() * 3, 0, s, s, s))
    tuftColors.push(new THREE.Color(random() > 0.5 ? PALETTE.grassDeep : '#98b873').offsetHSL(0, 0, (random() - 0.5) * 0.06))
  }
  const grass = new THREE.InstancedMesh(tuftGeo, tuftMat, tufts.length)
  tufts.forEach((m, i) => {
    grass.setMatrixAt(i, m)
    grass.setColorAt(i, tuftColors[i])
  })
  grass.receiveShadow = true
  grass.name = 'grass'

  const stem = new THREE.CylinderGeometry(0.015, 0.015, 0.4, 3).translate(0, 0.2, 0).toNonIndexed()
  const bloom = new THREE.IcosahedronGeometry(0.09, 0).translate(0, 0.43, 0)
  const flowerGeo = mergeGeometries([stem, bloom])!
  const flowerMat = noOutline(toon('#ffffff', { outline: false }).clone())
  windSway(flowerMat, 0.25, uTime)
  const palette = ['#fbf3df', '#f6d77a', '#f2b6c1', '#a9c4ea', '#f7f0f6']
  const flowers: THREE.Matrix4[] = []
  const flowerColors: THREE.Color[] = []
  tries = 0
  while (flowers.length < 700 && tries < 8000) {
    tries++
    const cx = (random() - 0.5) * 60
    const cz = (random() - 0.5) * 60
    if (!isOnIsland(cx, cz, 1.5) || Math.hypot(cx, cz) < 14) continue
    if (inWheat(cx, cz) || desertFactor(cx, cz) > 0.1 || roadDistance(cx, cz) < 1) continue
    if (lakeDistance(cx, cz) < LAKE.r + 0.5 || mountainHeight(cx, cz) > 3) continue
    const hue = palette[Math.floor(random() * palette.length)]
    for (let k = 0; k < 6; k++) {
      const x = cx + (random() - 0.5) * 2.2
      const z = cz + (random() - 0.5) * 2.2
      if (!isOnIsland(x, z, 1.2)) continue
      const s = 0.8 + random() * 0.5
      flowers.push(mat4(x, heightAt(x, z) - 0.03, z, 0, random() * 3, 0, s, s, s))
      flowerColors.push(new THREE.Color(hue))
    }
  }
  const knollFlowers = 40
  for (let i = 0; i < knollFlowers; i++) {
    const a = random() * Math.PI * 2
    const r = 1.5 + random() * 3
    const x = KNOLL.x + Math.cos(a) * r
    const z = KNOLL.z + Math.sin(a) * r
    flowers.push(mat4(x, heightAt(x, z) - 0.03, z, 0, a, 0, 1, 1, 1))
    flowerColors.push(new THREE.Color(i % 3 === 0 ? '#f6d77a' : '#fbf3df'))
  }
  const flowerMesh = new THREE.InstancedMesh(flowerGeo, flowerMat, flowers.length)
  flowers.forEach((m, i) => {
    flowerMesh.setMatrixAt(i, m)
    flowerMesh.setColorAt(i, flowerColors[i])
  })
  flowerMesh.name = 'flowers'
  return [grass, flowerMesh]
}

function buildStatic() {
  const batcher = new Batcher()
  const b = new Builder(batcher)
  const random = rng(23)

  let placed = 0
  for (let i = 0; i < 900 && placed < 70; i++) {
    const x = (random() - 0.5) * 64
    const z = (random() - 0.5) * 64
    if (!isFree(x, z) || mountainHeight(x, z) > 1.5) continue
    const forest = Math.hypot(x - 1, z + 24) < 9 || Math.hypot(x + 27, z + 18) < 6
    if (!forest && random() > 0.35) continue
    if (random() > 0.75) poplar(b, x, z, 0.9 + random() * 0.5)
    else roundTree(b, x, z, 0.85 + random() * 0.6, random)
    placed++
  }

  placed = 0
  for (let i = 0; i < 1400 && placed < 60; i++) {
    const x = (random() - 0.5) * 64
    const z = (random() - 0.5) * 64
    const mh = mountainHeight(x, z)
    if (!isOnIsland(x, z, 2.2) || roadDistance(x, z) < 1.4) continue
    const inForest = Math.hypot(x - 1, z + 24) < 9
    if (!(mh > 0.8 && mh < 8.2) && !(inForest && random() > 0.5)) continue
    if (Math.hypot(x, z) < 15.5) continue
    pine(b, x, z, 0.8 + random() * 0.6, mh > 6.6)
    placed++
  }

  for (const [x, z, s] of BAOBABS) baobab(b, x, z, s * 1.6, random)

  const rockMat = toon(PALETTE.rock)
  const rockDark = toon(PALETTE.rockDark)
  for (let i = 0; i < 70; i++) {
    const x = (random() - 0.5) * 64
    const z = (random() - 0.5) * 64
    if (!isOnIsland(x, z, 1.2) || Math.hypot(x, z) < 14 || roadDistance(x, z) < 1.2) continue
    if (inWheat(x, z) || lakeDistance(x, z) < LAKE.r - 0.5) continue
    const mh = mountainHeight(x, z)
    const s = 0.25 + random() * (mh > 2 ? 0.9 : 0.45)
    b.rock(random() > 0.5 ? rockMat : rockDark, s, x, heightAt(x, z) + s * 0.25, z, random() * 3)
  }

  for (let i = 0; i < 40; i++) {
    const a = random() * Math.PI * 2
    const r = random() * DESERT.r * 0.85
    const x = DESERT.x + Math.cos(a) * r
    const z = DESERT.z + Math.sin(a) * r
    if (random() > 0.6) b.rock(toon('#d8b98a'), 0.2 + random() * 0.5, x, heightAt(x, z) + 0.1, z, random() * 3, 0.55)
  }

  const fence = toon(PALETTE.plank)
  const corners: [number, number][] = [
    [WHEAT.x0 - 0.4, WHEAT.z0 - 0.4],
    [WHEAT.x1 + 0.4, WHEAT.z0 - 0.4],
    [WHEAT.x1 + 0.4, WHEAT.z1 + 0.4],
    [WHEAT.x0 - 0.4, WHEAT.z1 + 0.4],
  ]
  for (let c = 0; c < 4; c++) {
    const [ax, az] = corners[c]
    const [bx, bz] = corners[(c + 1) % 4]
    const len = Math.hypot(bx - ax, bz - az)
    const posts = Math.floor(len / 1.6)
    for (let p = 0; p <= posts; p++) {
      const t = p / posts
      const x = ax + (bx - ax) * t
      const z = az + (bz - az) * t
      if (!isOnIsland(x, z, 0.8)) continue
      if (c === 2 && Math.abs(x - (WHEAT.x0 + WHEAT.x1) / 2) < 1.2) continue
      const y = heightAt(x, z)
      b.box(fence, 0.12, 0.85, 0.12, x, y - 0.1, z)
      if (p < posts) {
        const nx = ax + (bx - ax) * ((p + 1) / posts)
        const nz = az + (bz - az) * ((p + 1) / posts)
        if (!isOnIsland(nx, nz, 0.8)) continue
        if (c === 2 && Math.abs((x + nx) / 2 - (WHEAT.x0 + WHEAT.x1) / 2) < 1.6) continue
        const angle = Math.atan2(nx - x, nz - z)
        const ny = heightAt(nx, nz)
        const seg = Math.hypot(nx - x, nz - z)
        b.box(fence, 0.06, 0.08, seg, (x + nx) / 2, (y + ny) / 2 + 0.45, (z + nz) / 2, angle)
        b.box(fence, 0.06, 0.08, seg, (x + nx) / 2, (y + ny) / 2 + 0.2, (z + nz) / 2, angle)
      }
    }
  }

  const bushMat = toon('#8fb36f')
  for (let i = 0; i < 60; i++) {
    const a = random() * Math.PI * 2
    const r = 15 + random() * 16
    const x = Math.cos(a) * r
    const z = Math.sin(a) * r
    if (!isFree(x, z, 1.8)) continue
    const s = 0.4 + random() * 0.4
    b.batcher.add(unitGeo.ico(1), bushMat, mat4(x, heightAt(x, z) + s * 0.3, z, 0, random() * 3, 0, s * 1.2, s * 0.8, s * 1.2))
  }

  return batcher.build('vegetation')
}

export function createVegetation() {
  const uTime = { value: 0 }
  const group = new THREE.Group()
  group.name = 'vegetation'
  group.add(buildStatic())
  group.add(buildWheat(uTime))
  buildGrassAndFlowers(uTime).forEach((m) => group.add(m))
  return {
    group,
    update(time: number) {
      uTime.value = time
    },
  }
}
