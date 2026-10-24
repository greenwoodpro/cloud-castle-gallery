import * as THREE from 'three'
import { Rng, noise2 } from './noise'
import {
  WORLD,
  CASTLE,
  MOUNTAIN,
  LAKE,
  VILLAGE,
  FARM,
  ORCHARD,
  MEADOW,
  FOREST_A,
  FOREST_B,
  ROAD_SAMPLES,
  distToRoads,
  edgeR,
} from './layout'
import { RIVER_IN, RIVER_OUT, castleSd, lakeD } from './terrain'

const S = 2048

function hexA(hex: string, a: number) {
  const n = parseInt(hex.slice(1), 16)
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`
}

/** 以自上而下的俯视方式绘制整座岛的地面：草地、道路、麦田、湖岸、庭院石板、野花…… */
export function paintGround(maxAnisotropy = 8): THREE.CanvasTexture {
  const cv = document.createElement('canvas')
  cv.width = cv.height = S
  const ctx = cv.getContext('2d')!
  const k = S / WORLD
  const X = (x: number) => (x + WORLD / 2) * k
  const Z = (z: number) => (z + WORLD / 2) * k
  const rng = new Rng(11)

  const blot = (x: number, z: number, r: number, color: string, alpha: number) => {
    const g = ctx.createRadialGradient(X(x), Z(z), 0, X(x), Z(z), r * k)
    g.addColorStop(0, hexA(color, alpha))
    g.addColorStop(1, hexA(color, 0))
    ctx.fillStyle = g
    ctx.beginPath()
    ctx.arc(X(x), Z(z), r * k, 0, Math.PI * 2)
    ctx.fill()
  }
  const dab = (x: number, z: number, r: number, color: string) => {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(X(x), Z(z), Math.max(1, r * k), 0, Math.PI * 2)
    ctx.fill()
  }
  const strokePoly = (pts: [number, number][], width: number, color: string) => {
    ctx.strokeStyle = color
    ctx.lineWidth = width * k
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.beginPath()
    pts.forEach(([x, z], i) => (i === 0 ? ctx.moveTo(X(x), Z(z)) : ctx.lineTo(X(x), Z(z))))
    ctx.stroke()
  }
  const inRotRect = (cx: number, cz: number, w: number, d: number, rot: number, fn: () => void) => {
    ctx.save()
    ctx.translate(X(cx), Z(cz))
    ctx.rotate(rot)
    ctx.scale(k, k)
    fn()
    ctx.restore()
  }

  // 1. 草地底色与水彩晕染
  ctx.fillStyle = '#b9d291'
  ctx.fillRect(0, 0, S, S)
  const greens = ['#a6c97f', '#c8dd9b', '#b0cf8a', '#9cc27d', '#d6e3a2', '#c1d98f']
  for (let i = 0; i < 420; i++) {
    const a = rng.range(0, Math.PI * 2)
    const r = Math.sqrt(rng.next()) * 42
    blot(Math.cos(a) * r, Math.sin(a) * r, rng.range(2.5, 7.5), rng.pick(greens), 0.5)
  }

  // 2. 森林地面
  for (const f of [FOREST_A, FOREST_B]) {
    for (let i = 0; i < 26; i++) {
      const a = rng.range(0, Math.PI * 2)
      const r = Math.sqrt(rng.next()) * f.r * 1.1
      blot(f.x + Math.cos(a) * r, f.z + Math.sin(a) * r, rng.range(2, 5), '#86ac74', 0.65)
    }
    for (let i = 0; i < 90; i++) {
      const a = rng.range(0, Math.PI * 2)
      const r = Math.sqrt(rng.next()) * f.r
      dab(f.x + Math.cos(a) * r, f.z + Math.sin(a) * r, rng.range(0.08, 0.2), rng.pick(['#c5b07e', '#d2bd8a', '#a7a070']))
    }
  }

  // 3. 山体：雪顶 → 岩石 → 碎石草坡
  {
    const g = ctx.createRadialGradient(X(MOUNTAIN.x), Z(MOUNTAIN.z), 0, X(MOUNTAIN.x), Z(MOUNTAIN.z), MOUNTAIN.r * 1.05 * k)
    g.addColorStop(0, '#f5f2f8')
    g.addColorStop(0.2, '#ece7ee')
    g.addColorStop(0.34, '#cfc6c6')
    g.addColorStop(0.55, '#b7a999')
    g.addColorStop(0.78, '#b9b78e')
    g.addColorStop(1, hexA('#b9b78e', 0))
    ctx.fillStyle = g
    ctx.beginPath()
    ctx.arc(X(MOUNTAIN.x), Z(MOUNTAIN.z), MOUNTAIN.r * 1.05 * k, 0, Math.PI * 2)
    ctx.fill()
    for (let i = 0; i < 520; i++) {
      const a = rng.range(0, Math.PI * 2)
      const r = Math.sqrt(rng.next()) * MOUNTAIN.r * 0.85
      const t = r / (MOUNTAIN.r * 0.85)
      const c = t < 0.28 ? rng.pick(['#fbf9fc', '#e5e0ea', '#d9d4e0']) : rng.pick(['#a99b8b', '#c2b6a6', '#8f8578', '#b4a79a'])
      dab(MOUNTAIN.x + Math.cos(a) * r, MOUNTAIN.z + Math.sin(a) * r, rng.range(0.12, 0.42), c)
    }
  }

  // 4. 湖岸沙滩
  ctx.save()
  ctx.translate(X(LAKE.x), Z(LAKE.z))
  ctx.scale(LAKE.rx * 1.16 * k, LAKE.rz * 1.16 * k)
  {
    const g = ctx.createRadialGradient(0, 0, 0.4, 0, 0, 1)
    g.addColorStop(0, '#efdcaa')
    g.addColorStop(0.78, '#efdcaa')
    g.addColorStop(1, hexA('#efdcaa', 0))
    ctx.fillStyle = g
    ctx.beginPath()
    ctx.arc(0, 0, 1, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.restore()

  // 5. 河岸
  for (const river of [RIVER_IN, RIVER_OUT]) {
    const pts = river.map((s) => [s.x, s.z] as [number, number])
    strokePoly(pts, 4.6, hexA('#e9d6a4', 0.5))
    strokePoly(pts, 3.0, hexA('#e9d6a4', 0.7))
  }

  // 6. 田地（麦田、青苗、翻耕地、薰衣草）
  {
    const plots = [
      { c: '#e7c973', row: '#d1ac55' },
      { c: '#a1c97c', row: '#86b568' },
      { c: '#cba97b', row: '#b38e63' },
      { c: '#c9aedb', row: '#b08fc4' },
    ]
    inRotRect(FARM.x, FARM.z, FARM.w, FARM.d, FARM.rot, () => {
      const pw = FARM.w / plots.length
      plots.forEach((p, i) => {
        const x0 = -FARM.w / 2 + i * pw
        ctx.fillStyle = p.c
        ctx.fillRect(x0 + 0.12, -FARM.d / 2, pw - 0.24, FARM.d)
        ctx.fillStyle = p.row
        for (let x = x0 + 0.45; x < x0 + pw - 0.3; x += 0.62) ctx.fillRect(x, -FARM.d / 2 + 0.2, 0.22, FARM.d - 0.4)
        ctx.fillStyle = hexA('#8d7249', 0.45)
        ctx.fillRect(x0 + pw - 0.18, -FARM.d / 2, 0.12, FARM.d)
      })
    })
  }

  // 7. 果园
  for (let i = 0; i < 18; i++) {
    const a = rng.range(0, Math.PI * 2)
    const r = Math.sqrt(rng.next()) * ORCHARD.r
    blot(ORCHARD.x + Math.cos(a) * r, ORCHARD.z + Math.sin(a) * r, rng.range(1.5, 3), '#cfe3a0', 0.6)
  }

  // 8. 道路
  for (const s of ROAD_SAMPLES) {
    strokePoly(s, 2.9, '#cfba8f')
    strokePoly(s, 2.1, '#ead9b0')
    for (let i = 0; i < s.length; i++) {
      for (let j = 0; j < 5; j++) {
        const [x, z] = s[i]
        dab(x + rng.range(-1, 1), z + rng.range(-1, 1), rng.range(0.04, 0.1), rng.pick(['#d5c29a', '#c8b48a', '#f3e6c4']))
      }
    }
  }

  // 9. 村庄广场
  blot(VILLAGE.x, VILLAGE.z, 4.4, '#dccaa0', 1)
  for (let i = 0; i < 160; i++) {
    const a = rng.range(0, Math.PI * 2)
    const r = Math.sqrt(rng.next()) * 3.4
    dab(VILLAGE.x + Math.cos(a) * r, VILLAGE.z + Math.sin(a) * r, rng.range(0.1, 0.26), rng.pick(['#e7d8b0', '#cdb98f', '#d9c79c']))
  }

  // 10. 城堡内院石板与花圃
  inRotRect(CASTLE.x, CASTLE.z, 20, 16, 0, () => {
    ctx.fillStyle = '#dcd1bc'
    ctx.fillRect(-9.6, -7.6, 19.2, 15.2)
    for (let x = -9.6; x < 9.6; x += 0.62) {
      for (let z = -7.6; z < 7.6; z += 0.62) {
        const n = noise2(x * 3.1, z * 2.7)
        ctx.fillStyle = hexA(n > 0.5 ? '#ffffff' : '#8c7f6a', 0.14 + n * 0.12)
        ctx.fillRect(x + 0.03, z + 0.03, 0.56, 0.56)
      }
    }
    ctx.fillStyle = '#cbbfa7'
    ctx.fillRect(-1.2, -1, 2.4, 9)
    const beds: [number, number, number, number][] = [
      [-6.6, 3.2, 4.2, 3.4],
      [3.2, 4.6, 3.6, 2.4],
    ]
    for (const [bx, bz, bw, bd] of beds) {
      ctx.fillStyle = '#9fc67a'
      ctx.fillRect(bx - bw / 2, bz - bd / 2, bw, bd)
      ctx.strokeStyle = '#b9a98a'
      ctx.lineWidth = 0.14
      ctx.strokeRect(bx - bw / 2, bz - bd / 2, bw, bd)
      for (let i = 0; i < 70; i++) {
        ctx.fillStyle = rng.pick(['#e9a3b0', '#f2d06a', '#fbf6ea', '#b9a3d9'])
        ctx.beginPath()
        ctx.arc(bx + rng.range(-bw / 2 + 0.2, bw / 2 - 0.2), bz + rng.range(-bd / 2 + 0.2, bd / 2 - 0.2), rng.range(0.06, 0.13), 0, Math.PI * 2)
        ctx.fill()
      }
    }
  })

  // 11. 野花
  const flowerCols = ['#e9a3b0', '#f2d06a', '#fbf6ea', '#b9a3d9', '#f0b58f']
  const okFlower = (x: number, z: number) =>
    Math.hypot(x, z) < edgeR(Math.atan2(z, x)) - 2.5 &&
    lakeD(x, z) > 1.15 &&
    castleSd(x, z) > 4.6 &&
    distToRoads(x, z) > 1.6 &&
    Math.hypot(x - VILLAGE.x, z - VILLAGE.z) > 4.6 &&
    Math.hypot(x - MOUNTAIN.x, z - MOUNTAIN.z) > MOUNTAIN.r * 0.6
  let placed = 0
  for (let tries = 0; tries < 22000 && placed < 4200; tries++) {
    const a = rng.range(0, Math.PI * 2)
    const r = Math.sqrt(rng.next()) * 39
    const x = Math.cos(a) * r
    const z = Math.sin(a) * r
    if (!okFlower(x, z)) continue
    if (x > FARM.x - FARM.w / 2 - 1 && x < FARM.x + FARM.w / 2 + 1 && z > FARM.z - FARM.d / 2 - 1 && z < FARM.z + FARM.d / 2 + 1) continue
    dab(x, z, rng.range(0.07, 0.15), rng.pick(flowerCols))
    placed++
  }
  for (let i = 0; i < 1100; i++) {
    const a = rng.range(0, Math.PI * 2)
    const r = Math.sqrt(rng.next()) * MEADOW.r
    const x = MEADOW.x + Math.cos(a) * r
    const z = MEADOW.z + Math.sin(a) * r
    if (okFlower(x, z)) dab(x, z, rng.range(0.07, 0.16), rng.pick(flowerCols))
  }

  // 12. 纸面水彩颗粒
  for (let i = 0; i < 7000; i++) {
    const x = rng.range(-WORLD / 2, WORLD / 2)
    const z = rng.range(-WORLD / 2, WORLD / 2)
    ctx.save()
    ctx.translate(X(x), Z(z))
    ctx.rotate(rng.range(0, Math.PI))
    ctx.fillStyle = rng.chance(0.5) ? 'rgba(255,255,255,0.05)' : 'rgba(80,90,40,0.04)'
    ctx.fillRect(0, 0, rng.range(0.4, 1.2) * k, rng.range(0.06, 0.16) * k)
    ctx.restore()
  }

  // 岛底顶点色使用的纯白区域
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(S - 48, S - 48, 48, 48)

  const tex = new THREE.CanvasTexture(cv)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = maxAnisotropy
  tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping
  tex.needsUpdate = true
  return tex
}
