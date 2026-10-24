import * as THREE from 'three'
import { Kit } from './batch'
import { C } from './palette'
import { mulberry32 } from './noise'
import type { Built } from './buildings'
import type { Materials } from './materials'

const PI = Math.PI

export interface SkyBuild extends Built {
  stars: THREE.Points
}

export function buildSky(mats: Materials): SkyBuild {
  const group = new THREE.Group()
  const anims: Built['anims'] = []
  const rnd = mulberry32(7)

  /* 云：绕岛缓慢漂移 */
  for (let i = 0; i < 16; i++) {
    const ck = new Kit()
    const n = 4 + Math.floor(rnd() * 3)
    const sc = 3 + rnd() * 4
    for (let j = 0; j < n; j++) ck.s.sph(sc * (0.5 + rnd() * 0.45), [(j - n / 2) * sc * 0.75, rnd() * sc * 0.3, (rnd() - 0.5) * sc * 0.6], '#ffffff', [1.2, 0.7, 1], 9, 0)
    const m = ck.s.build(mats.cloud, false, false)
    if (!m) continue
    const pivot = new THREE.Group()
    const ang = rnd() * PI * 2
    const rad = 62 + rnd() * 70
    m.position.set(Math.cos(ang) * rad, -10 + rnd() * 48, Math.sin(ang) * rad)
    m.rotation.y = -ang
    pivot.add(m)
    group.add(pivot)
    const sp = (0.004 + rnd() * 0.006) * (i % 2 ? 1 : -1)
    anims.push((t) => {
      pivot.rotation.y = t * sp
    })
  }

  /* 远处的浮空小岛 */
  const islet = (x: number, y: number, z: number, r: number, kind: number) => {
    const k = new Kit()
    k.s.cone(r, r * 1.6, [0, -r * 0.8, 0], C.rock, 9, [PI, 0, 0], 1, 0.08)
    k.s.cone(r * 0.5, r * 1.3, [r * 0.2, -r * 1.4, 0], C.rockD, 7, [PI, 0, 0], 1, 0.08)
    k.s.cyl(r * 1.02, r, 0.5, [0, 0.1, 0], C.leaf, 14, [0, 0, 0], 1, 0.05)
    if (kind === 0) {
      k.s.cyl(0.1, 0.16, 1.4, [0, 1.0, 0], C.woodD, 7)
      k.s.sph(1.1, [0, 2.2, 0], C.blossom, 1, 9)
      k.s.sph(0.7, [0.7, 1.8, 0.2], C.pink, 1, 8)
      k.s.rod([0.5, 1.8, 0], [0.5, 0.5, 0], 0.015, C.cream)
      k.s.box(0.4, 0.06, 0.2, [0.5, 0.5, 0], C.woodL)
    } else if (kind === 1) {
      k.s.box(1.6, 1.2, 1.3, [0, 0.9, 0], '#f3e3cc')
      k.s.gable(1.8, 2.0, 0.9, [0, 1.5, 0], C.roofRed, PI / 2)
      k.g.box(0.3, 0.35, 0.05, [0.4, 1.0, 0.67], '#ffd98a', [0, 0, 0], 0)
      k.s.cyl(0.05, 0.05, 1.0, [r * 0.5, 0.6, r * 0.3], C.iron, 6)
      k.g.sph(0.14, [r * 0.5, 1.2, r * 0.3], '#ffd98a', 1, 6, 0)
    } else {
      k.s.cyl(0.9, 1.1, 2.6, [0, 1.5, 0], C.stoneL, 10)
      k.s.cone(1.3, 1.5, [0, 3.5, 0], C.roofBlue, 10)
      k.g.box(0.25, 0.5, 0.06, [0, 1.9, 1.0], '#ffd98a', [0, 0, 0], 0)
    }
    const m = k.s.build(mats.toon)
    const g = k.g.build(mats.glow, false, false)
    const holder = new THREE.Group()
    if (m) holder.add(m)
    if (g) holder.add(g)
    holder.position.set(x, y, z)
    group.add(holder)
    const ph = rnd() * 6
    anims.push((t) => {
      holder.position.y = y + Math.sin(t * 0.5 + ph) * 0.5
      holder.rotation.y = Math.sin(t * 0.1 + ph) * 0.2
    })
  }
  islet(-70, 18, 34, 4.6, 0)
  islet(82, 8, -34, 5.4, 1)
  islet(74, 26, 40, 3.4, 2)
  islet(-82, 4, -42, 4.0, 0)

  /* B-612 小行星：火山、猴面包树、路灯 */
  const R = 5
  const pk = new Kit()
  pk.s.sph(R, [0, 0, 0], C.leaf, 1, 18, 0.06)
  const place = (n: [number, number, number], fn: (k: Kit) => void) => {
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(...n).normalize())
    const rot = new THREE.Matrix4().makeRotationFromQuaternion(q)
    const tmp = new Kit()
    fn(tmp.at(0, R - 0.1, 0))
    for (const g of tmp.s.geos) {
      g.applyMatrix4(rot)
      pk.s.geos.push(g)
    }
    for (const g of tmp.g.geos) {
      g.applyMatrix4(rot)
      pk.g.geos.push(g)
    }
  }
  place([0, 1, 0], (k) => {
    k.s.cone(1.1, 1.3, [0, 0.6, 0], C.rockD, 8)
    k.s.cone(0.4, 0.2, [0, 1.25, 0], '#e8734f', 8)
  })
  place([0.9, 0.5, 0.2], (k) => {
    k.s.cyl(0.35, 0.55, 1.8, [0, 0.9, 0], C.woodL, 8)
    k.s.sph(0.9, [0, 2.1, 0], C.leafD, [1.3, 0.7, 1.3], 9)
  })
  place([-0.7, 0.6, 0.5], (k) => {
    k.s.cyl(0.25, 0.4, 1.2, [0, 0.6, 0], C.woodL, 8)
    k.s.sph(0.65, [0, 1.4, 0], C.leaf, [1.3, 0.7, 1.3], 9)
  })
  place([0.2, 0.6, -0.9], (k) => {
    k.s.cone(0.22, 0.6, [0, 0.3, 0], C.leaf, 6)
    k.s.cone(0.18, 0.5, [0.2, 0.25, 0.1], C.leafL, 6, [0, 0, -0.5])
  })
  place([-0.5, 0.2, 0.9], (k) => {
    k.s.cyl(0.04, 0.05, 0.9, [0, 0.45, 0], C.iron, 6)
    k.g.sph(0.14, [0, 1.0, 0], '#ffd98a', 1, 6, 0)
  })
  const planet = new THREE.Group()
  const pm = pk.s.build(mats.toon)
  const pg = pk.g.build(mats.glow, false, false)
  if (pm) planet.add(pm)
  if (pg) planet.add(pg)
  planet.position.set(-48, 34, -52)
  group.add(planet)
  anims.push((t) => {
    planet.rotation.y = t * 0.08
    planet.position.y = 34 + Math.sin(t * 0.4) * 0.7
  })

  /* 热气球 */
  const bk = new Kit()
  const cols = [C.red, C.cream, C.teal, C.gold, C.pink, C.cream]
  for (let i = 0; i < 6; i++) bk.s.add(new THREE.SphereGeometry(2.2, 10, 9, (i * PI * 2) / 6, (PI * 2) / 6), cols[i], [0, 0, 0], [0, 0, 0], [1, 1.15, 1], 0.03, true)
  bk.s.box(0.9, 0.55, 0.9, [0, -3.6, 0], C.woodL)
  for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]] as const) bk.s.rod([sx * 0.4, -3.35, sz * 0.4], [sx * 1.3, -1.7, sz * 1.3], 0.02, C.woodD)
  bk.g.sph(0.13, [0, -2.9, 0], '#ffb347', 1, 6, 0)
  const balloon = new THREE.Group()
  const bm = bk.s.build(mats.toon)
  const bg = bk.g.build(mats.glow, false, false)
  if (bm) balloon.add(bm)
  if (bg) balloon.add(bg)
  group.add(balloon)
  anims.push((t) => {
    const a = t * 0.025 + 1.2
    balloon.position.set(Math.cos(a) * 78, 26 + Math.sin(t * 0.5) * 0.8, Math.sin(a) * 78)
    balloon.rotation.y = -a
  })

  /* 鸟群 */
  const wingGeo = new THREE.BufferGeometry()
  wingGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array([0, 0, 0, 0.55, 0.05, 0.12, 0.2, 0, -0.22]), 3))
  wingGeo.computeVertexNormals()
  const birdMat = mats.cloth('#fffaf0')
  for (let i = 0; i < 9; i++) {
    const b = new THREE.Group()
    const wl = new THREE.Mesh(wingGeo, birdMat)
    const wr = new THREE.Mesh(wingGeo, birdMat)
    wr.scale.x = -1
    b.add(wl, wr)
    b.scale.setScalar(1.4)
    group.add(b)
    const rad = 52 + (i % 3) * 9
    const h = 6 + (i % 4) * 4
    const sp = 0.05 + (i % 3) * 0.012
    const ph = i * 0.7
    anims.push((t) => {
      const a = t * sp + ph
      b.position.set(Math.cos(a) * rad, h + Math.sin(t * 0.9 + ph) * 1.2, Math.sin(a) * rad)
      b.rotation.y = -a
      const f = Math.sin(t * 8 + ph * 3) * 0.6
      wl.rotation.z = f
      wr.rotation.z = -f
    })
  }

  /* 星星 */
  const N = 700
  const pos = new Float32Array(N * 3)
  const size = new Float32Array(N)
  const phase = new Float32Array(N)
  for (let i = 0; i < N; i++) {
    const u = rnd() * 2 - 1
    const a = rnd() * PI * 2
    const s = Math.sqrt(1 - u * u)
    const y = Math.abs(u) * 0.9 + 0.08
    const len = Math.sqrt(s * s + y * y)
    pos[i * 3] = ((Math.cos(a) * s) / len) * 800
    pos[i * 3 + 1] = (y / len) * 800
    pos[i * 3 + 2] = ((Math.sin(a) * s) / len) * 800
    size[i] = 8 + rnd() * rnd() * 26
    phase[i] = rnd()
  }
  const sg = new THREE.BufferGeometry()
  sg.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  sg.setAttribute('aSize', new THREE.BufferAttribute(size, 1))
  sg.setAttribute('aPhase', new THREE.BufferAttribute(phase, 1))
  const stars = new THREE.Points(sg, mats.stars)
  stars.frustumCulled = false
  stars.renderOrder = -1
  group.add(stars)

  return { group, anims, stars }
}
