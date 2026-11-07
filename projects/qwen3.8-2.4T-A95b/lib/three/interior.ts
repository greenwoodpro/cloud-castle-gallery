import * as THREE from 'three'
import { PALETTE } from './palette'
import { makeRandom, pick, range } from './noise'
import { archDoor, box, capsule, cone, conicalRoof, cyl, flag, matte, sphere, torus, uniqueMatte } from './materials'
import type { XRayTargets } from './castle'

/**
 * 主堡（Donjon / Keep）——城堡的核心，也是内部构造最完整的部分。
 *
 * 竖向分层（局部坐标，y=0 为庭院地面）：
 *   0.0 – 3.2   地牢与厨房储藏（Dungeon / Kitchen）
 *   3.2 – 8.4   大厅（Great Hall，含王座、壁炉、长桌、乐师廊）
 *   8.4 – 12.6  议事厅与图书馆（Council Chamber / Library）
 *  12.6 – 16.6  卧室与天文台（Bedchamber / Observatory）
 *  16.6 –  顶   屋顶平台、四角小塔与中央尖顶
 *
 * 一座螺旋楼梯塔贯穿全部楼层。
 */

export const KEEP = {
  size: 14,
  wallT: 0.95,
  levels: [
    { name: 'dungeon', y0: 0, y1: 3.2 },
    { name: 'greatHall', y0: 3.2, y1: 8.4 },
    { name: 'council', y0: 8.4, y1: 12.6 },
    { name: 'bedroom', y0: 12.6, y1: 16.6 },
  ],
  roofY: 16.6,
}

const HALF = KEEP.size / 2

// ---------- 通用家具 ----------

function trestleTable(w: number, d: number, h = 0.78): THREE.Group {
  const g = new THREE.Group()
  const top = box(w, 0.12, d, PALETTE.wood)
  top.position.y = h
  g.add(top)
  for (const sx of [-w / 2 + 0.45, w / 2 - 0.45]) {
    const leg = box(0.16, h, 0.16, PALETTE.woodDark)
    leg.position.set(sx, h / 2, 0)
    g.add(leg)
    const foot = box(0.16, 0.14, d * 0.8, PALETTE.woodDark)
    foot.position.set(sx, 0.07, 0)
    g.add(foot)
    const brace = box(0.12, 0.12, d * 0.7, PALETTE.woodDeep)
    brace.position.set(sx, h * 0.55, 0)
    g.add(brace)
  }
  const stretcher = box(w * 0.8, 0.1, 0.1, PALETTE.woodDeep)
  stretcher.position.y = h * 0.4
  g.add(stretcher)
  return g
}

function bench(w: number): THREE.Group {
  const g = new THREE.Group()
  const seat = box(w, 0.1, 0.42, PALETTE.wood)
  seat.position.y = 0.46
  g.add(seat)
  for (const sx of [-w / 2 + 0.25, w / 2 - 0.25]) {
    const leg = box(0.12, 0.46, 0.36, PALETTE.woodDark)
    leg.position.set(sx, 0.23, 0)
    g.add(leg)
  }
  return g
}

function chair(withArms = true): THREE.Group {
  const g = new THREE.Group()
  const seat = box(0.52, 0.09, 0.5, PALETTE.woodDark)
  seat.position.y = 0.46
  g.add(seat)
  const back = box(0.52, 0.85, 0.09, PALETTE.woodDark)
  back.position.set(0, 0.88, -0.21)
  g.add(back)
  for (const sx of [-0.21, 0.21]) {
    for (const sz of [-0.2, 0.2]) {
      const leg = box(0.08, 0.46, 0.08, PALETTE.woodDeep)
      leg.position.set(sx, 0.23, sz)
      g.add(leg)
    }
    if (withArms) {
      const arm = box(0.08, 0.08, 0.44, PALETTE.woodDeep)
      arm.position.set(sx, 0.68, 0.02)
      g.add(arm)
    }
  }
  const finial1 = sphere(0.07, PALETTE.gold, 7)
  finial1.position.set(-0.21, 1.34, -0.21)
  g.add(finial1)
  const finial2 = finial1.clone()
  finial2.position.x = 0.21
  g.add(finial2)
  return g
}

function throne(): THREE.Group {
  const g = new THREE.Group()
  const seat = box(1.15, 0.16, 1.0, PALETTE.goldDark)
  seat.position.y = 0.72
  g.add(seat)
  const back = box(1.15, 1.9, 0.16, PALETTE.goldDark)
  back.position.set(0, 1.6, -0.42)
  g.add(back)
  const cushion = box(1.0, 0.16, 0.86, PALETTE.bannerRed)
  cushion.position.y = 0.86
  g.add(cushion)
  const backCushion = box(0.95, 1.5, 0.14, PALETTE.bannerRed)
  backCushion.position.set(0, 1.55, -0.3)
  g.add(backCushion)
  for (const sx of [-0.55, 0.55]) {
    const arm = box(0.14, 0.14, 0.9, PALETTE.gold)
    arm.position.set(sx, 1.05, 0.02)
    g.add(arm)
    const support = box(0.14, 0.4, 0.14, PALETTE.gold)
    support.position.set(sx, 0.86, 0.42)
    g.add(support)
    const leg = box(0.16, 0.72, 0.16, PALETTE.goldDark)
    leg.position.set(sx, 0.36, -0.36)
    g.add(leg)
    const leg2 = box(0.16, 0.72, 0.16, PALETTE.goldDark)
    leg2.position.set(sx, 0.36, 0.36)
    g.add(leg2)
  }
  // 王座顶部的皇冠饰
  const crownBase = cyl(0.34, 0.34, 0.16, PALETTE.gold, 12)
  crownBase.position.set(0, 2.62, -0.42)
  g.add(crownBase)
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2
    const point = cone(0.07, 0.26, PALETTE.gold, 6)
    point.position.set(Math.cos(a) * 0.3, 2.83, -0.42 + Math.sin(a) * 0.3)
    g.add(point)
  }
  const jewel = sphere(0.11, PALETTE.roseRed, 8)
  jewel.position.set(0, 1.9, -0.32)
  g.add(jewel)
  return g
}

function fourPosterBed(): THREE.Group {
  const g = new THREE.Group()
  const frame = box(2.3, 0.4, 3.2, PALETTE.woodDeep)
  frame.position.y = 0.42
  g.add(frame)
  const mattress = box(2.1, 0.34, 3.0, PALETTE.cookApron)
  mattress.position.y = 0.76
  g.add(mattress)
  const blanket = box(2.14, 0.16, 2.0, PALETTE.bannerBlue)
  blanket.position.set(0, 0.96, 0.45)
  g.add(blanket)
  const fold = box(2.16, 0.1, 0.3, PALETTE.cloud)
  fold.position.set(0, 1.0, -0.55)
  g.add(fold)
  const pillow1 = box(0.85, 0.24, 0.55, PALETTE.cloud)
  pillow1.position.set(-0.5, 1.02, -1.15)
  pillow1.rotation.y = 0.06
  g.add(pillow1)
  const pillow2 = pillow1.clone()
  pillow2.position.x = 0.5
  pillow2.rotation.y = -0.05
  g.add(pillow2)

  // 四柱与华盖
  for (const sx of [-1.1, 1.1]) {
    for (const sz of [-1.55, 1.55]) {
      const post = cyl(0.09, 0.11, 3.1, PALETTE.woodDeep, 8)
      post.position.set(sx, 1.55, sz)
      post.castShadow = true
      g.add(post)
      const knob = sphere(0.13, PALETTE.gold, 8)
      knob.position.set(sx, 3.15, sz)
      g.add(knob)
    }
  }
  const canopy = box(2.5, 0.14, 3.4, PALETTE.woodDeep)
  canopy.position.y = 3.05
  g.add(canopy)
  const canopyCloth = box(2.3, 0.1, 3.2, PALETTE.maidDress)
  canopyCloth.position.y = 2.94
  g.add(canopyCloth)
  // 帷幔
  for (const sx of [-1.14, 1.14]) {
    const curtain = new THREE.Mesh(
      new THREE.PlaneGeometry(1.5, 2.5, 4, 6),
      new THREE.MeshLambertMaterial({ color: new THREE.Color(PALETTE.maidDress), side: THREE.DoubleSide }),
    )
    curtain.position.set(sx, 1.7, -0.9)
    curtain.rotation.y = sx > 0 ? -Math.PI / 2 : Math.PI / 2
    curtain.castShadow = true
    g.add(curtain)
  }
  const backDrape = new THREE.Mesh(
    new THREE.PlaneGeometry(2.3, 2.6, 5, 6),
    new THREE.MeshLambertMaterial({ color: new THREE.Color(PALETTE.bannerRed), side: THREE.DoubleSide }),
  )
  backDrape.position.set(0, 1.7, -1.58)
  g.add(backDrape)
  return g
}

function bookshelf(w: number, h: number, rand: () => number): THREE.Group {
  const g = new THREE.Group()
  const back = box(w, h, 0.1, PALETTE.woodDeep)
  back.position.y = h / 2
  g.add(back)
  for (const sx of [-w / 2, w / 2]) {
    const side = box(0.12, h, 0.5, PALETTE.woodDark)
    side.position.set(sx, h / 2, 0.2)
    g.add(side)
  }
  const shelves = Math.max(2, Math.floor(h / 0.72))
  const bookColors = [PALETTE.bannerRed, PALETTE.bannerBlue, PALETTE.trunk, PALETTE.leafDark, PALETTE.goldDark, PALETTE.kingRobe, PALETTE.trunkDark]
  for (let s = 0; s <= shelves; s++) {
    const y = (h / shelves) * s
    const shelf = box(w, 0.09, 0.5, PALETTE.woodDark)
    shelf.position.set(0, y + 0.045, 0.2)
    g.add(shelf)
    if (s === shelves) continue
    // 书
    let x = -w / 2 + 0.2
    while (x < w / 2 - 0.25) {
      const bw = range(rand, 0.09, 0.19)
      const bh = range(rand, 0.34, 0.52)
      if (rand() > 0.88) {
        x += 0.22
        continue
      }
      const book = box(bw, bh, 0.36, pick(rand, bookColors))
      book.position.set(x + bw / 2, y + 0.09 + bh / 2, 0.2)
      if (rand() > 0.9) book.rotation.z = 0.22
      g.add(book)
      x += bw + 0.015
    }
    // 偶尔放一卷羊皮纸或一个小摆件
    if (rand() > 0.6) {
      const scroll = cyl(0.07, 0.07, 0.4, PALETTE.sand, 8)
      scroll.rotation.z = Math.PI / 2
      scroll.position.set(range(rand, -w / 3, w / 3), y + 0.16, 0.24)
      g.add(scroll)
    }
  }
  // 顶部装饰
  const cornice = box(w + 0.2, 0.16, 0.6, PALETTE.woodDark)
  cornice.position.set(0, h + 0.08, 0.2)
  g.add(cornice)
  return g
}

function chest(w = 1.2): THREE.Group {
  const g = new THREE.Group()
  const body = box(w, 0.6, 0.66, PALETTE.woodDark)
  body.position.y = 0.3
  g.add(body)
  const lid = new THREE.Mesh(new THREE.CylinderGeometry(0.33, 0.33, w, 12, 1, false, 0, Math.PI), matte(PALETTE.wood))
  lid.rotation.z = Math.PI / 2
  lid.rotation.y = Math.PI / 2
  lid.position.y = 0.6
  lid.castShadow = true
  g.add(lid)
  for (const sx of [-w / 2 + 0.15, w / 2 - 0.15]) {
    const band = box(0.12, 0.62, 0.7, PALETTE.ironDark)
    band.position.set(sx, 0.31, 0)
    g.add(band)
  }
  const lock = box(0.2, 0.24, 0.1, PALETTE.gold)
  lock.position.set(0, 0.42, 0.35)
  g.add(lock)
  return g
}

function chandelier(r: number, candles: number): THREE.Group {
  const g = new THREE.Group()
  // 光锚：scene 会在此处生成暖色点光源，让烛光照亮房间
  const anchor = new THREE.Object3D()
  anchor.position.y = -0.2
  anchor.userData.lightSpec = { color: '#ffc078', intensity: 5, distance: 16, decay: 1.8 }
  g.add(anchor)
  const ring = torus(r, 0.06, PALETTE.ironDark, 8, 22)
  ring.rotation.x = Math.PI / 2
  g.add(ring)
  const ring2 = torus(r * 0.6, 0.045, PALETTE.ironDark, 7, 18)
  ring2.rotation.x = Math.PI / 2
  ring2.position.y = -0.28
  g.add(ring2)
  const chain = cyl(0.035, 0.035, 1.6, PALETTE.ironDark, 6)
  chain.position.y = 0.8
  g.add(chain)
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2
    const rod = cyl(0.03, 0.03, r * 0.62, PALETTE.ironDark, 5)
    rod.rotation.z = Math.PI / 2
    rod.rotation.y = a
    rod.position.set(Math.cos(a) * r * 0.3, -0.14, Math.sin(a) * r * 0.3)
    g.add(rod)
  }
  for (let i = 0; i < candles; i++) {
    const a = (i / candles) * Math.PI * 2
    const x = Math.cos(a) * r
    const z = Math.sin(a) * r
    const candle = cyl(0.055, 0.06, 0.3, PALETTE.cookApron, 7)
    candle.position.set(x, 0.2, z)
    g.add(candle)
    const flame = cone(0.055, 0.17, PALETTE.fireCore, 6)
    const fm = flame.material as THREE.MeshLambertMaterial
    fm.emissive = new THREE.Color(PALETTE.fireCore)
    fm.emissiveIntensity = 1.7
    flame.position.set(x, 0.43, z)
    flame.userData.flame = { phase: i * 1.3 }
    g.add(flame)
  }
  return g
}

function wallTorch(): THREE.Group {
  const g = new THREE.Group()
  const bracket = cyl(0.05, 0.07, 0.42, PALETTE.ironDark, 6)
  bracket.rotation.x = -0.5
  bracket.position.y = 0.2
  g.add(bracket)
  const cup = cyl(0.13, 0.09, 0.16, PALETTE.ironDark, 8)
  cup.position.y = 0.42
  g.add(cup)
  const flame = cone(0.14, 0.42, PALETTE.fire, 7)
  const fm = flame.material as THREE.MeshLambertMaterial
  fm.emissive = new THREE.Color(PALETTE.fire)
  fm.emissiveIntensity = 1.5
  flame.position.y = 0.68
  flame.userData.flame = { phase: Math.random() * 6.28 }
  g.add(flame)
  const core = cone(0.07, 0.24, PALETTE.fireCore, 6)
  const cm = core.material as THREE.MeshLambertMaterial
  cm.emissive = new THREE.Color(PALETTE.fireCore)
  cm.emissiveIntensity = 1.8
  core.position.y = 0.6
  core.userData.flame = { phase: Math.random() * 6.28 + 2 }
  g.add(core)
  return g
}

function tapestry(w: number, h: number, color: string, rand: () => number): THREE.Group {
  const g = new THREE.Group()
  const cloth = new THREE.Mesh(
    new THREE.PlaneGeometry(w, h, 6, 8),
    new THREE.MeshLambertMaterial({ color: new THREE.Color(color), side: THREE.DoubleSide }),
  )
  cloth.position.y = -h / 2
  cloth.castShadow = true
  g.add(cloth)
  const rod = cyl(0.055, 0.055, w + 0.5, PALETTE.goldDark, 7)
  rod.rotation.z = Math.PI / 2
  g.add(rod)
  for (const sx of [-(w + 0.5) / 2, (w + 0.5) / 2]) {
    const finial = sphere(0.09, PALETTE.gold, 7)
    finial.position.x = sx
    g.add(finial)
  }
  // 简单纹样：中央菱形 + 边框
  const border = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.86, h * 0.8), matte(PALETTE.bannerGold))
  border.position.set(0, -h / 2, 0.02)
  g.add(border)
  const inner = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.72, h * 0.66), matte(color))
  inner.position.set(0, -h / 2, 0.03)
  g.add(inner)
  const diamond = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.34, w * 0.34), matte(PALETTE.bannerRed))
  diamond.rotation.z = Math.PI / 4
  diamond.position.set(0, -h / 2, 0.04)
  g.add(diamond)
  const star = new THREE.Mesh(new THREE.CircleGeometry(w * 0.1, 5), matte(PALETTE.bannerGold))
  star.position.set(0, -h / 2, 0.05)
  g.add(star)
  // 底部流苏
  for (let i = 0; i < 7; i++) {
    const t = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.24, 5), matte(PALETTE.bannerGold))
    t.rotation.x = Math.PI
    t.position.set(-w / 2 + (w / 6) * i, -h - 0.12, 0)
    g.add(t)
  }
  void rand
  return g
}

function armorStand(rand: () => number): THREE.Group {
  const g = new THREE.Group()
  const steel = rand() > 0.5 ? PALETTE.iron : PALETTE.ironDark
  // 头盔
  const helm = sphere(0.24, steel, 12)
  helm.position.y = 1.72
  helm.scale.y = 1.15
  g.add(helm)
  const visor = box(0.3, 0.1, 0.26, PALETTE.stoneShadow)
  visor.position.set(0, 1.7, 0.14)
  g.add(visor)
  const plume = cone(0.1, 0.4, PALETTE.bannerRed, 7)
  plume.position.y = 2.08
  g.add(plume)
  // 胸甲
  const torso = capsule(0.3, 0.5, steel, 12)
  torso.position.y = 1.24
  torso.scale.z = 0.72
  g.add(torso)
  const belt = cyl(0.31, 0.31, 0.12, PALETTE.woodDeep, 12)
  belt.position.y = 0.94
  g.add(belt)
  // 肩甲
  for (const sx of [-0.36, 0.36]) {
    const pauldron = sphere(0.17, steel, 10)
    pauldron.position.set(sx, 1.5, 0)
    pauldron.scale.set(1, 0.7, 0.9)
    g.add(pauldron)
    const arm = capsule(0.1, 0.42, steel, 8)
    arm.position.set(sx * 1.15, 1.18, 0)
    g.add(arm)
    const gauntlet = sphere(0.11, steel, 8)
    gauntlet.position.set(sx * 1.15, 0.88, 0)
    g.add(gauntlet)
  }
  // 腿甲
  for (const sx of [-0.16, 0.16]) {
    const leg = capsule(0.12, 0.5, steel, 8)
    leg.position.set(sx, 0.55, 0)
    g.add(leg)
    const sabaton = box(0.2, 0.12, 0.34, steel)
    sabaton.position.set(sx, 0.06, 0.06)
    g.add(sabaton)
  }
  // 盾牌与剑
  const shield = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.08, 3), matte(PALETTE.bannerBlue))
  shield.rotation.x = Math.PI / 2
  shield.rotation.z = Math.PI
  shield.scale.y = 1.2
  shield.position.set(-0.52, 1.2, 0.2)
  g.add(shield)
  const sword = new THREE.Group()
  const blade = box(0.09, 1.15, 0.03, PALETTE.iron)
  blade.position.y = 0.6
  sword.add(blade)
  const guard = box(0.34, 0.07, 0.07, PALETTE.gold)
  sword.add(guard)
  const grip = cyl(0.045, 0.045, 0.26, PALETTE.woodDeep, 7)
  grip.position.y = -0.15
  sword.add(grip)
  const pommel = sphere(0.07, PALETTE.gold, 7)
  pommel.position.y = -0.3
  sword.add(pommel)
  sword.position.set(0.55, 1.05, 0.16)
  sword.rotation.z = -0.12
  g.add(sword)
  // 木底座
  const stand = cyl(0.42, 0.5, 0.14, PALETTE.woodDeep, 10)
  stand.position.y = 0.07
  g.add(stand)
  return g
}

function fireplace(): THREE.Group {
  const g = new THREE.Group()
  const anchor = new THREE.Object3D()
  anchor.position.set(0, 1.2, 0.8)
  anchor.userData.lightSpec = { color: '#ff9a4d', intensity: 8, distance: 14, decay: 1.8 }
  g.add(anchor)
  // 壁炉体
  const surround = box(4.2, 3.6, 1.3, PALETTE.stoneMid)
  surround.position.y = 1.8
  g.add(surround)
  const opening = archDoor(2.4, 2.4, 1.5, PALETTE.stoneShadow)
  opening.position.set(0, 0, 0.1)
  g.add(opening)
  // 炉膛内的火
  const fireBed = box(2.0, 0.2, 0.9, PALETTE.rockDeep)
  fireBed.position.set(0, 0.24, 0.3)
  g.add(fireBed)
  for (let i = 0; i < 3; i++) {
    const log = cyl(0.13, 0.14, 1.5, PALETTE.trunkDark, 8)
    log.rotation.z = Math.PI / 2
    log.rotation.y = range(makeRandom(i + 1), -0.3, 0.3)
    log.position.set(0, 0.42 + i * 0.12, 0.3 + (i - 1) * 0.14)
    g.add(log)
  }
  for (let i = 0; i < 5; i++) {
    const flame = cone(range(makeRandom(i + 9), 0.16, 0.3), range(makeRandom(i + 3), 0.5, 1.0), i % 2 ? PALETTE.fire : PALETTE.fireCore)
    const fm = flame.material as THREE.MeshLambertMaterial
    fm.emissive = new THREE.Color(i % 2 ? PALETTE.fire : PALETTE.fireCore)
    fm.emissiveIntensity = 1.6
    flame.position.set(-0.6 + i * 0.3, 0.85, 0.3)
    flame.userData.flame = { phase: i * 1.1 }
    g.add(flame)
  }
  // 壁炉架
  const mantel = box(4.8, 0.28, 1.6, PALETTE.stoneDark)
  mantel.position.y = 3.0
  g.add(mantel)
  // 烟囱胸墙向上延伸
  const breast = box(3.0, 5.4, 1.0, PALETTE.stoneMid)
  breast.position.y = 5.8
  g.add(breast)
  // 壁炉架上的烛台与摆件
  for (const sx of [-1.7, 1.7]) {
    const candlestick = cyl(0.09, 0.13, 0.4, PALETTE.gold, 8)
    candlestick.position.set(sx, 3.34, 0.2)
    g.add(candlestick)
    const candle = cyl(0.05, 0.05, 0.3, PALETTE.cookApron, 7)
    candle.position.set(sx, 3.68, 0.2)
    g.add(candle)
    const flame = cone(0.05, 0.15, PALETTE.fireCore, 6)
    const fm = flame.material as THREE.MeshLambertMaterial
    fm.emissive = new THREE.Color(PALETTE.fireCore)
    fm.emissiveIntensity = 1.7
    flame.position.set(sx, 3.9, 0.2)
    flame.userData.flame = { phase: sx }
    g.add(flame)
  }
  const shieldDeco = new THREE.Mesh(new THREE.CircleGeometry(0.55, 16), matte(PALETTE.goldDark))
  shieldDeco.position.set(0, 3.9, 0.52)
  g.add(shieldDeco)
  // 炉前地毯与柴堆
  const hearthRug = box(3.4, 0.05, 1.8, PALETTE.bannerRed)
  hearthRug.position.set(0, 0.03, 1.7)
  g.add(hearthRug)
  for (let i = 0; i < 6; i++) {
    const log = cyl(0.11, 0.12, 0.9, PALETTE.trunkDark, 7)
    log.rotation.z = Math.PI / 2
    log.position.set(-2.6, 0.14 + Math.floor(i / 3) * 0.24, 1.2 + (i % 3) * 0.26)
    g.add(log)
  }
  const andiron1 = box(0.1, 0.5, 0.1, PALETTE.ironDark)
  andiron1.position.set(-0.8, 0.25, 0.75)
  g.add(andiron1)
  const andiron2 = andiron1.clone()
  andiron2.position.x = 0.8
  g.add(andiron2)
  return g
}

function cellBlock(w: number, h: number, rand: () => number): THREE.Group {
  const g = new THREE.Group()
  const bars = Math.max(4, Math.floor(w / 0.32))
  for (let i = 0; i <= bars; i++) {
    const x = -w / 2 + (w / bars) * i
    const bar = cyl(0.055, 0.055, h, PALETTE.ironDark, 6)
    bar.position.set(x, h / 2, 0)
    bar.castShadow = true
    g.add(bar)
  }
  for (const y of [0.25, h * 0.5, h - 0.2]) {
    const rail = box(w + 0.1, 0.11, 0.11, PALETTE.ironDark)
    rail.position.y = y
    g.add(rail)
  }
  // 牢门
  const doorW = 0.95
  const door = new THREE.Group()
  for (let i = 0; i <= 3; i++) {
    const x = -doorW / 2 + (doorW / 3) * i
    const bar = cyl(0.06, 0.06, h - 0.2, PALETTE.ironDark, 6)
    bar.position.set(x, (h - 0.2) / 2, 0.06)
    door.add(bar)
  }
  for (const y of [0.3, h * 0.55, h - 0.35]) {
    const rail = box(doorW + 0.08, 0.12, 0.12, PALETTE.ironDark)
    rail.position.set(0, y, 0.06)
    door.add(rail)
  }
  const ring = torus(0.13, 0.03, PALETTE.iron, 6, 14)
  ring.position.set(doorW / 2 - 0.12, h * 0.5, 0.16)
  door.add(ring)
  door.position.x = w / 2 - doorW / 2 - 0.1
  door.rotation.y = -0.5
  g.add(door)

  // 牢内：稻草、水桶、锁链
  for (let i = 0; i < 5; i++) {
    const straw = box(range(rand, 0.5, 0.9), 0.1, range(rand, 0.3, 0.6), PALETTE.wheat)
    straw.position.set(range(rand, -w / 2, w / 2 - 1.2), 0.05, range(rand, -0.9, -0.3))
    straw.rotation.y = rand() * 0.6
    g.add(straw)
  }
  const bucket = cyl(0.2, 0.17, 0.3, PALETTE.woodDark, 9)
  bucket.position.set(-w / 2 + 0.5, 0.15, -0.7)
  g.add(bucket)
  const chain = cyl(0.03, 0.03, 1.1, PALETTE.iron, 5)
  chain.position.set(-w / 2 + 0.3, 1.4, -1.0)
  chain.rotation.z = 0.4
  g.add(chain)
  const shackle = torus(0.14, 0.035, PALETTE.ironDark, 6, 12)
  shackle.position.set(-w / 2 + 0.75, 0.92, -1.0)
  g.add(shackle)
  return g
}

function telescope(): THREE.Group {
  const g = new THREE.Group()
  // 三脚架
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2
    const leg = cyl(0.05, 0.06, 1.5, PALETTE.woodDeep, 6)
    leg.position.set(Math.cos(a) * 0.32, 0.72, Math.sin(a) * 0.32)
    leg.rotation.set(Math.sin(a) * 0.24, 0, -Math.cos(a) * 0.24)
    g.add(leg)
  }
  const hub = sphere(0.14, PALETTE.goldDark, 10)
  hub.position.y = 1.42
  g.add(hub)
  // 镜筒
  const tube = new THREE.Group()
  const main = cyl(0.17, 0.22, 1.9, PALETTE.goldDark, 14)
  main.rotation.x = Math.PI / 2
  tube.add(main)
  const lensRing = cyl(0.24, 0.24, 0.12, PALETTE.gold, 14)
  lensRing.rotation.x = Math.PI / 2
  lensRing.position.z = 0.95
  tube.add(lensRing)
  const lens = new THREE.Mesh(
    new THREE.CircleGeometry(0.2, 14),
    uniqueMatte(PALETTE.water, { emissive: new THREE.Color(PALETTE.water), emissiveIntensity: 0.5 }),
  )
  lens.position.z = 1.02
  tube.add(lens)
  const eyepiece = cyl(0.1, 0.13, 0.34, PALETTE.gold, 10)
  eyepiece.rotation.x = Math.PI / 2
  eyepiece.position.z = -1.05
  tube.add(eyepiece)
  for (const z of [-0.4, 0.4]) {
    const band = cyl(0.2, 0.2, 0.1, PALETTE.gold, 14)
    band.rotation.x = Math.PI / 2
    band.position.z = z
    tube.add(band)
  }
  tube.position.y = 1.5
  tube.rotation.x = -0.62
  g.add(tube)
  return g
}

function globe(): THREE.Group {
  const g = new THREE.Group()
  const stand = cyl(0.06, 0.24, 0.5, PALETTE.woodDeep, 8)
  stand.position.y = 0.25
  g.add(stand)
  const ring = torus(0.42, 0.035, PALETTE.goldDark, 8, 26)
  ring.rotation.x = 0.4
  ring.position.y = 0.85
  g.add(ring)
  const ball = sphere(0.38, PALETTE.water, 18)
  ball.position.y = 0.85
  g.add(ball)
  // 大陆块
  const rand = makeRandom(4646)
  for (let i = 0; i < 14; i++) {
    const a = rand() * Math.PI * 2
    const b = range(rand, -1.1, 1.1)
    const land = sphere(range(rand, 0.09, 0.19), PALETTE.leaf, 8)
    land.position.set(Math.cos(a) * Math.cos(b) * 0.37, 0.85 + Math.sin(b) * 0.37, Math.sin(a) * Math.cos(b) * 0.37)
    land.scale.set(1.4, 0.5, 1.2)
    land.lookAt(new THREE.Vector3(0, 0.85, 0))
    g.add(land)
  }
  g.userData.globe = ball
  return g
}

function armillary(): THREE.Group {
  const g = new THREE.Group()
  const base = cyl(0.28, 0.36, 0.16, PALETTE.woodDeep, 10)
  base.position.y = 0.08
  g.add(base)
  const column = cyl(0.06, 0.08, 0.5, PALETTE.goldDark, 8)
  column.position.y = 0.38
  g.add(column)
  const rings = new THREE.Group()
  for (let i = 0; i < 4; i++) {
    const ring = torus(0.34 - i * 0.03, 0.022, PALETTE.gold, 7, 26)
    ring.rotation.set(i * 0.5, i * 0.7, i * 0.3)
    rings.add(ring)
  }
  const earth = sphere(0.1, PALETTE.water, 10)
  rings.add(earth)
  rings.position.y = 0.95
  g.add(rings)
  g.userData.armillary = rings
  return g
}

// ---------- 楼层 ----------

/** 地牢层：左侧牢房，右侧厨房与储藏室。 */
function buildDungeonLevel(xray: XRayTargets): THREE.Group {
  const g = new THREE.Group()
  const { y0, y1 } = KEEP.levels[0]
  const H = y1 - y0
  const rand = makeRandom(3141)
  g.position.y = y0

  const wallMat = new THREE.MeshLambertMaterial({ color: new THREE.Color(PALETTE.stoneDark), side: THREE.DoubleSide })
  xray.fade.push(wallMat)

  // 四面墙
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2
    const wall = new THREE.Mesh(new THREE.BoxGeometry(KEEP.size, H, KEEP.wallT), wallMat)
    wall.position.set(Math.sin(a) * (HALF - KEEP.wallT / 2), H / 2, Math.cos(a) * (HALF - KEEP.wallT / 2))
    wall.rotation.y = a
    wall.castShadow = true
    wall.receiveShadow = true
    g.add(wall)
  }

  // 高位小窗（带铁栅）
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      const win = box(0.7, 0.55, 0.3, PALETTE.stoneShadow)
      win.position.set(sx * 3.4, H * 0.78, sz * (HALF - 0.3))
      g.add(win)
      for (let b = 0; b < 3; b++) {
        const bar = cyl(0.035, 0.035, 0.55, PALETTE.ironDark, 5)
        bar.position.set(sx * 3.4 - 0.22 + b * 0.22, H * 0.78, sz * (HALF - 0.16))
        g.add(bar)
      }
    }
  }

  // 中央隔墙：分开牢房与厨房
  const divider = new THREE.Mesh(new THREE.BoxGeometry(0.7, H, KEEP.size - 2), wallMat)
  divider.position.set(1.2, H / 2, 0)
  divider.castShadow = true
  g.add(divider)
  const doorway = archDoor(1.4, 2.2, 0.9, PALETTE.stoneShadow)
  doorway.position.set(1.2, 0, 3.2)
  doorway.rotation.y = Math.PI / 2
  g.add(doorway)

  // ---- 左半：牢房 ----
  const prison = new THREE.Group()
  // 走廊地面（潮湿的石板）
  const corridor = box(5.4, 0.06, KEEP.size - 2, PALETTE.rockDark)
  corridor.position.set(-3.4, 0.03, 0)
  g.add(corridor)

  for (let i = 0; i < 3; i++) {
    const z = -4.2 + i * 4.2
    const cell = cellBlock(3.4, H * 0.82, rand)
    cell.position.set(-5.6, 0, z)
    cell.rotation.y = Math.PI / 2
    prison.add(cell)
    // 牢内后墙
    const back = new THREE.Mesh(new THREE.BoxGeometry(0.5, H, 3.6), wallMat)
    back.position.set(-6.6, H / 2, z)
    prison.add(back)
    // 牢内火把（每两间一支）
    if (i < 2) {
      const t = wallTorch()
      t.position.set(-1.0, H * 0.62, z + 2.1)
      t.rotation.y = -Math.PI / 2
      prison.add(t)
    }
  }
  // 狱卒桌
  const desk = trestleTable(1.6, 0.8, 0.76)
  desk.position.set(-2.2, 0, 5.4)
  desk.rotation.y = Math.PI / 2
  prison.add(desk)
  const deskChair = chair(false)
  deskChair.position.set(-3.1, 0, 5.4)
  deskChair.rotation.y = Math.PI / 2
  prison.add(deskChair)
  const keyRing = torus(0.16, 0.03, PALETTE.gold, 6, 14)
  keyRing.position.set(-2.2, 0.85, 5.4)
  prison.add(keyRing)
  for (let i = 0; i < 4; i++) {
    const key = box(0.05, 0.24, 0.03, PALETTE.goldDark)
    key.position.set(-2.2 - 0.12 + i * 0.08, 0.72, 5.4)
    key.rotation.z = range(rand, -0.3, 0.3)
    prison.add(key)
  }
  const lantern = box(0.28, 0.36, 0.28, PALETTE.lantern)
  const lmat = lantern.material as THREE.MeshLambertMaterial
  lmat.emissive = new THREE.Color(PALETTE.lantern)
  lmat.emissiveIntensity = 1.0
  lantern.position.set(-2.2, 0.98, 5.0)
  lantern.userData.lamp = true
  prison.add(lantern)
  g.add(prison)

  // ---- 右半：厨房与储藏 ----
  const kitchen = new THREE.Group()
  kitchen.position.x = 1.2

  // 大灶
  const stove = box(3.4, 1.5, 1.6, PALETTE.stoneMid)
  stove.position.set(3.6, 0.75, -4.6)
  kitchen.add(stove)
  const stoveTop = box(3.6, 0.16, 1.8, PALETTE.ironDark)
  stoveTop.position.set(3.6, 1.58, -4.6)
  kitchen.add(stoveTop)
  const stoveFire = box(1.6, 0.7, 0.2, PALETTE.fire)
  const sfm = stoveFire.material as THREE.MeshLambertMaterial
  sfm.emissive = new THREE.Color(PALETTE.fire)
  sfm.emissiveIntensity = 1.3
  stoveFire.position.set(3.6, 0.6, -3.75)
  stoveFire.userData.forge = true
  kitchen.add(stoveFire)
  const chimneyPipe = cyl(0.42, 0.5, H - 1.6, PALETTE.stoneDark, 10)
  chimneyPipe.position.set(3.6, 1.6 + (H - 1.6) / 2, -4.6)
  kitchen.add(chimneyPipe)
  // 大锅
  const cauldron = new THREE.Mesh(new THREE.SphereGeometry(0.55, 14, 10, 0, Math.PI * 2, 0, Math.PI / 2), matte(PALETTE.ironDark))
  cauldron.rotation.x = Math.PI
  cauldron.position.set(3.0, 2.1, -4.6)
  cauldron.castShadow = true
  kitchen.add(cauldron)
  const soup = cyl(0.5, 0.5, 0.06, PALETTE.leafAutumn, 14)
  soup.position.set(3.0, 1.86, -4.6)
  kitchen.add(soup)
  const hook = cyl(0.03, 0.03, 0.7, PALETTE.ironDark, 5)
  hook.position.set(3.0, 2.5, -4.6)
  kitchen.add(hook)

  // 长案与面团
  const prepTable = trestleTable(3.2, 1.1, 0.9)
  prepTable.position.set(3.4, 0, -1.2)
  kitchen.add(prepTable)
  for (let i = 0; i < 4; i++) {
    const dough = sphere(range(rand, 0.16, 0.26), PALETTE.sand, 9)
    dough.position.set(2.4 + i * 0.65, 1.05, -1.2)
    dough.scale.y = 0.65
    kitchen.add(dough)
  }
  const rollingPin = cyl(0.07, 0.07, 0.7, PALETTE.wood, 8)
  rollingPin.rotation.z = Math.PI / 2
  rollingPin.position.set(3.6, 0.98, -0.75)
  kitchen.add(rollingPin)

  // 悬挂的铜锅与香草
  for (let i = 0; i < 5; i++) {
    const pan = cyl(range(rand, 0.2, 0.32), range(rand, 0.18, 0.3), 0.16, i % 2 ? PALETTE.goldDark : PALETTE.ironDark, 12)
    pan.position.set(2.0 + i * 0.75, H * 0.78, -5.6)
    kitchen.add(pan)
    const panHook = cyl(0.02, 0.02, 0.3, PALETTE.ironDark, 4)
    panHook.position.set(2.0 + i * 0.75, H * 0.78 + 0.22, -5.6)
    kitchen.add(panHook)
  }
  for (let i = 0; i < 4; i++) {
    const herb = cone(0.13, 0.42, PALETTE.leafDark, 6)
    herb.rotation.x = Math.PI
    herb.position.set(5.6, H * 0.72, -3.4 + i * 0.7)
    kitchen.add(herb)
  }

  // 储藏架：面包、奶酪、酒坛
  for (let s = 0; s < 3; s++) {
    const shelf = box(3.0, 0.1, 0.7, PALETTE.woodDark)
    shelf.position.set(4.2, 0.9 + s * 0.72, 2.6)
    kitchen.add(shelf)
    for (let i = 0; i < 5; i++) {
      const kind = rand()
      if (kind > 0.66) {
        const loaf = sphere(0.19, PALETTE.wheatDark, 8)
        loaf.scale.set(1.3, 0.7, 1)
        loaf.position.set(3.0 + i * 0.55, 1.05 + s * 0.72, 2.6)
        kitchen.add(loaf)
      } else if (kind > 0.33) {
        const cheese = cyl(0.19, 0.19, 0.16, PALETTE.flowerYellow, 10)
        cheese.position.set(3.0 + i * 0.55, 1.03 + s * 0.72, 2.6)
        kitchen.add(cheese)
      } else {
        const jar = cyl(0.15, 0.19, 0.4, PALETTE.rockDark, 9)
        jar.position.set(3.0 + i * 0.55, 1.15 + s * 0.72, 2.6)
        kitchen.add(jar)
      }
    }
  }
  // 酒桶
  for (let i = 0; i < 4; i++) {
    const barrel = cyl(0.48, 0.44, 1.05, PALETTE.wood, 12)
    barrel.position.set(2.4 + (i % 2) * 1.05, 0.53, 4.6 + Math.floor(i / 2) * 1.1)
    barrel.castShadow = true
    kitchen.add(barrel)
    for (const by of [0.24, 0.8]) {
      const hoop = torus(0.47, 0.04, PALETTE.ironDark, 6, 14)
      hoop.rotation.x = Math.PI / 2
      hoop.position.set(barrel.position.x, by, barrel.position.z)
      kitchen.add(hoop)
    }
  }
  // 宝箱（藏宝室一角）
  const treasure = chest(1.3)
  treasure.position.set(5.4, 0, 5.2)
  treasure.rotation.y = -0.5
  kitchen.add(treasure)
  for (let i = 0; i < 9; i++) {
    const coin = cyl(0.11, 0.11, 0.03, PALETTE.gold, 10)
    coin.position.set(range(rand, 4.6, 6.2), 0.02 + Math.floor(rand() * 3) * 0.035, range(rand, 4.4, 5.9))
    coin.rotation.set(range(rand, -0.2, 0.2), rand() * 3, range(rand, -0.2, 0.2))
    kitchen.add(coin)
  }
  const kitchenTorch = wallTorch()
  kitchenTorch.position.set(1.7, H * 0.66, 0.6)
  kitchenTorch.rotation.y = Math.PI / 2
  kitchen.add(kitchenTorch)

  g.add(kitchen)
  return g
}

/** 大厅层：王座、长桌、壁炉、乐师廊、盔甲、吊灯。 */
function buildGreatHall(xray: XRayTargets): THREE.Group {
  const g = new THREE.Group()
  const { y0, y1 } = KEEP.levels[1]
  const H = y1 - y0
  const rand = makeRandom(2718)
  g.position.y = y0

  const wallMat = new THREE.MeshLambertMaterial({ color: new THREE.Color(PALETTE.stone), side: THREE.DoubleSide })
  xray.fade.push(wallMat)

  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2
    const wall = new THREE.Mesh(new THREE.BoxGeometry(KEEP.size, H, KEEP.wallT), wallMat)
    wall.position.set(Math.sin(a) * (HALF - KEEP.wallT / 2), H / 2, Math.cos(a) * (HALF - KEEP.wallT / 2))
    wall.rotation.y = a
    wall.castShadow = true
    wall.receiveShadow = true
    g.add(wall)
  }

  // 木地板
  const floor = new THREE.Group()
  for (let i = 0; i < 12; i++) {
    const plank = box(KEEP.size - 1.6, 0.12, 1.0, i % 2 ? PALETTE.wood : PALETTE.woodDark)
    plank.position.set(0, 0.06, -HALF + 0.9 + i * 1.05)
    plank.receiveShadow = true
    floor.add(plank)
  }
  g.add(floor)

  // 天花板木梁
  const beams = new THREE.Group()
  for (let i = 0; i < 6; i++) {
    const beam = box(KEEP.size - 1.4, 0.42, 0.42, PALETTE.woodDeep)
    beam.position.set(0, H - 0.3, -HALF + 1.6 + i * 2.1)
    beam.castShadow = true
    beams.add(beam)
  }
  const spine = box(0.5, 0.5, KEEP.size - 1.4, PALETTE.woodDeep)
  spine.position.y = H - 0.62
  beams.add(spine)
  for (let i = 0; i < 5; i++) {
    for (const sx of [-1, 1]) {
      const brace = box(0.24, 1.5, 0.24, PALETTE.woodDark)
      brace.position.set(sx * 3.2, H - 1.0, -HALF + 2.6 + i * 2.1)
      brace.rotation.z = sx * 0.5
      beams.add(brace)
    }
  }
  g.add(beams)
  xray.hide.push(beams)

  // ---- 王座区（北端，-Z）----
  const dais = new THREE.Group()
  for (let s = 0; s < 3; s++) {
    const step = box(7.4 - s * 0.5, 0.24, 1.0 - s * 0.1, PALETTE.stoneMid)
    step.position.set(0, 0.12 + s * 0.24, -3.4 + s * 0.85)
    step.castShadow = true
    step.receiveShadow = true
    dais.add(step)
  }
  const platform = box(6.6, 0.24, 3.0, PALETTE.stoneLight)
  platform.position.set(0, 0.84, -5.0)
  platform.receiveShadow = true
  dais.add(platform)
  const throneObj = throne()
  throneObj.position.set(0, 0.96, -5.6)
  dais.add(throneObj)
  // 王座华盖
  const canopy = box(3.4, 0.2, 1.6, PALETTE.goldDark)
  canopy.position.set(0, 3.9, -5.7)
  dais.add(canopy)
  const canopyCloth = new THREE.Mesh(
    new THREE.PlaneGeometry(3.2, 2.6, 6, 6),
    new THREE.MeshLambertMaterial({ color: new THREE.Color(PALETTE.bannerRed), side: THREE.DoubleSide }),
  )
  canopyCloth.position.set(0, 2.6, -6.3)
  dais.add(canopyCloth)
  for (const sx of [-1.5, 1.5]) {
    const post = cyl(0.1, 0.12, 3.0, PALETTE.goldDark, 8)
    post.position.set(sx, 2.4, -5.9)
    dais.add(post)
  }
  // 王座两侧旗帜
  for (const sx of [-2.6, 2.6]) {
    const f = flag(3.6, sx < 0 ? PALETTE.bannerBlue : PALETTE.bannerRed, 1.2, 2.2)
    f.position.set(sx, 0.96, -6.1)
    dais.add(f)
  }
  // 王座前的地毯
  const runner = box(2.6, 0.05, 8.4, PALETTE.bannerRed)
  runner.position.set(0, 0.14, -0.6)
  dais.add(runner)
  const runnerBorder = box(2.9, 0.04, 8.7, PALETTE.bannerGold)
  runnerBorder.position.set(0, 0.125, -0.6)
  dais.add(runnerBorder)
  g.add(dais)

  // ---- 壁炉（西墙）----
  const fp = fireplace()
  fp.position.set(-HALF + 0.75, 0.12, 1.5)
  fp.rotation.y = Math.PI / 2
  g.add(fp)

  // ---- 两张长桌与长凳 ----
  for (const sx of [-2.9, 2.9]) {
    const table = trestleTable(7.2, 1.3, 0.8)
    table.position.set(sx, 0.12, 1.6)
    g.add(table)
    for (const bz of [-0.95, 0.95]) {
      const b = bench(6.4)
      b.position.set(sx, 0.12, 1.6 + bz)
      g.add(b)
    }
    // 桌面餐具
    for (let i = 0; i < 6; i++) {
      const px = sx - 3.0 + i * 1.2
      const plate = cyl(0.24, 0.22, 0.05, PALETTE.cloud, 12)
      plate.position.set(px, 0.95, 1.6 - 0.3)
      g.add(plate)
      const goblet = cyl(0.08, 0.11, 0.22, PALETTE.gold, 9)
      goblet.position.set(px + 0.3, 1.02, 1.6 + 0.28)
      g.add(goblet)
      const candle = cyl(0.05, 0.055, 0.26, PALETTE.cookApron, 6)
      candle.position.set(px + 0.55, 1.05, 1.6)
      g.add(candle)
      if (i % 2 === 0) {
        const flame = cone(0.05, 0.14, PALETTE.fireCore, 6)
        const fm = flame.material as THREE.MeshLambertMaterial
        fm.emissive = new THREE.Color(PALETTE.fireCore)
        fm.emissiveIntensity = 1.7
        flame.position.set(px + 0.55, 1.25, 1.6)
        flame.userData.flame = { phase: i + sx }
        g.add(flame)
      }
    }
    // 中央的烤肉与果盘
    const platter = cyl(0.5, 0.46, 0.08, PALETTE.goldDark, 14)
    platter.position.set(sx, 0.96, 1.6)
    g.add(platter)
    const roast = sphere(0.34, PALETTE.trunk, 12)
    roast.position.set(sx, 1.16, 1.6)
    roast.scale.set(1.4, 0.8, 1)
    g.add(roast)
    for (let i = 0; i < 5; i++) {
      const fruit = sphere(0.11, pick(rand, [PALETTE.roseRed, PALETTE.leafAutumn, PALETTE.flowerYellow, PALETTE.rosePink]), 7)
      fruit.position.set(sx + range(rand, -0.4, 0.4), 1.05, 1.6 + range(rand, -0.35, 0.35))
      g.add(fruit)
    }
  }

  // ---- 立柱 ----
  for (const sx of [-4.6, 4.6]) {
    for (const sz of [-2.2, 3.4]) {
      const col = cyl(0.34, 0.4, H - 0.6, PALETTE.stoneMid, 12)
      col.position.set(sx, (H - 0.6) / 2 + 0.12, sz)
      col.castShadow = true
      g.add(col)
      const capital = cyl(0.52, 0.36, 0.4, PALETTE.stoneDark, 12)
      capital.position.set(sx, H - 0.4, sz)
      g.add(capital)
      const baseM = cyl(0.52, 0.56, 0.3, PALETTE.stoneDark, 12)
      baseM.position.set(sx, 0.27, sz)
      g.add(baseM)
    }
  }

  // ---- 吊灯 ----
  for (const sz of [-1.4, 3.2]) {
    const ch = chandelier(0.85, 8)
    ch.position.set(0, H - 1.5, sz)
    g.add(ch)
  }

  // ---- 挂毯 ----
  const tapColors = [PALETTE.bannerRed, PALETTE.bannerBlue, PALETTE.kingRobe, PALETTE.bannerGold]
  for (let i = 0; i < 3; i++) {
    const t = tapestry(1.7, 2.6, tapColors[i], rand)
    t.position.set(HALF - 0.55, H * 0.78, -3.2 + i * 3.2)
    t.rotation.y = -Math.PI / 2
    g.add(t)
  }
  for (let i = 0; i < 2; i++) {
    const t = tapestry(1.5, 2.3, tapColors[3 - i], rand)
    t.position.set(-2.6 + i * 5.2, H * 0.78, -HALF + 0.55)
    t.rotation.y = Math.PI
    g.add(t)
  }

  // ---- 高窗（东墙与南墙）----
  for (let i = 0; i < 3; i++) {
    const winGroup = new THREE.Group()
    const recess = archDoor(1.3, 3.0, 0.6, PALETTE.stoneMid)
    winGroup.add(recess)
    const glassPane = new THREE.Mesh(new THREE.PlaneGeometry(1.05, 2.6), matte(PALETTE.windowGlow))
    const gm = glassPane.material as THREE.MeshLambertMaterial
    gm.emissive = new THREE.Color(PALETTE.windowGlow)
    gm.emissiveIntensity = 0.75
    glassPane.position.set(0, 1.4, 0.32)
    glassPane.userData.lamp = true
    winGroup.add(glassPane)
    for (let m = 0; m < 2; m++) {
      const mullion = box(0.08, 2.6, 0.1, PALETTE.stoneDark)
      mullion.position.set(-0.26 + m * 0.52, 1.4, 0.36)
      winGroup.add(mullion)
    }
    const transom = box(1.1, 0.08, 0.1, PALETTE.stoneDark)
    transom.position.set(0, 1.9, 0.36)
    winGroup.add(transom)
    // 窗座
    const seat = box(1.5, 0.16, 0.8, PALETTE.wood)
    seat.position.set(0, 0.5, 0.6)
    winGroup.add(seat)
    const cushion = box(1.3, 0.16, 0.66, PALETTE.maidDress)
    cushion.position.set(0, 0.66, 0.6)
    winGroup.add(cushion)

    if (i < 2) {
      winGroup.position.set(HALF - 0.3, 0.12, -2.4 + i * 4.6)
      winGroup.rotation.y = -Math.PI / 2
    } else {
      winGroup.position.set(3.6, 0.12, HALF - 0.3)
      winGroup.rotation.y = Math.PI
    }
    g.add(winGroup)
  }

  // ---- 乐师廊（南端入口上方）----
  const gallery = new THREE.Group()
  const galleryFloor = box(KEEP.size - 2.4, 0.22, 2.4, PALETTE.wood)
  galleryFloor.position.set(0, 3.1, HALF - 1.9)
  galleryFloor.castShadow = true
  gallery.add(galleryFloor)
  const rail = box(KEEP.size - 2.4, 0.7, 0.14, PALETTE.woodDark)
  rail.position.set(0, 3.55, HALF - 3.05)
  gallery.add(rail)
  for (let i = 0; i < 9; i++) {
    const baluster = cyl(0.06, 0.06, 0.6, PALETTE.woodDeep, 6)
    baluster.position.set(-5.6 + i * 1.4, 3.5, HALF - 3.05)
    gallery.add(baluster)
  }
  for (const sx of [-4.4, 4.4]) {
    const bracket = box(0.3, 1.2, 1.6, PALETTE.woodDeep)
    bracket.position.set(sx, 2.5, HALF - 1.9)
    bracket.rotation.x = 0.3
    gallery.add(bracket)
  }
  // 廊上的乐器
  const lute = new THREE.Group()
  const luteBody = sphere(0.28, PALETTE.wood, 12)
  luteBody.scale.set(1, 0.5, 1.3)
  lute.add(luteBody)
  const luteNeck = box(0.1, 0.08, 0.7, PALETTE.woodDeep)
  luteNeck.position.z = 0.55
  lute.add(luteNeck)
  lute.position.set(-3.4, 3.4, HALF - 2.0)
  lute.rotation.set(0.3, 0.4, 0.2)
  gallery.add(lute)
  const harp = new THREE.Group()
  const harpFrame = torus(0.5, 0.06, PALETTE.goldDark, 8, 20, )
  harpFrame.scale.set(1, 1.3, 1)
  harp.add(harpFrame)
  for (let i = 0; i < 7; i++) {
    const string = cyl(0.012, 0.012, 0.9 - i * 0.06, PALETTE.cloud, 4)
    string.position.set(-0.3 + i * 0.09, 0.05, 0)
    harp.add(string)
  }
  harp.position.set(3.2, 3.75, HALF - 2.0)
  gallery.add(harp)
  const drum = cyl(0.34, 0.34, 0.4, PALETTE.bannerRed, 14)
  drum.position.set(0.6, 3.4, HALF - 2.0)
  gallery.add(drum)
  g.add(gallery)

  // ---- 盔甲与武器 ----
  for (const [ax, az, ry] of [
    [-5.6, -4.6, 0.4],
    [5.6, -4.6, -0.4],
    [-5.6, 5.2, 1.2],
    [5.6, 5.2, -1.2],
  ] as [number, number, number][]) {
    const armor = armorStand(rand)
    armor.position.set(ax, 0.12, az)
    armor.rotation.y = ry
    g.add(armor)
  }

  // ---- 入口大门（南面，通向庭院）----
  const mainDoor = archDoor(2.8, 3.8, KEEP.wallT + 0.4, PALETTE.woodDeep)
  mainDoor.position.set(0, 0.12, HALF - KEEP.wallT / 2)
  g.add(mainDoor)
  const doorFrame = archDoor(3.4, 4.3, KEEP.wallT + 0.1, PALETTE.stoneMid)
  doorFrame.position.set(0, 0.12, HALF - KEEP.wallT / 2)
  g.add(doorFrame)

  // ---- 通往上层的螺旋楼梯入口 ----
  const stairDoor = archDoor(1.5, 2.6, KEEP.wallT + 0.3, PALETTE.stoneShadow)
  stairDoor.position.set(-HALF + KEEP.wallT / 2, 0.12, -4.6)
  stairDoor.rotation.y = Math.PI / 2
  g.add(stairDoor)

  // 墙上的火把
  for (const [tx, tz, ry] of [
    [-HALF + 0.6, -3.0, Math.PI / 2],
    [HALF - 0.6, -0.4, -Math.PI / 2],
    [HALF - 0.6, 3.6, -Math.PI / 2],
    [-2.0, -HALF + 0.6, Math.PI],
    [2.0, -HALF + 0.6, Math.PI],
  ] as [number, number, number][]) {
    const t = wallTorch()
    t.position.set(tx, H * 0.6, tz)
    t.rotation.y = ry
    g.add(t)
  }

  return g
}

/** 二层：议事厅与图书馆。 */
function buildCouncilLevel(xray: XRayTargets): THREE.Group {
  const g = new THREE.Group()
  const { y0, y1 } = KEEP.levels[2]
  const H = y1 - y0
  const rand = makeRandom(1618)
  g.position.y = y0

  const wallMat = new THREE.MeshLambertMaterial({ color: new THREE.Color(PALETTE.stone), side: THREE.DoubleSide })
  xray.fade.push(wallMat)

  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2
    const wall = new THREE.Mesh(new THREE.BoxGeometry(KEEP.size, H, KEEP.wallT), wallMat)
    wall.position.set(Math.sin(a) * (HALF - KEEP.wallT / 2), H / 2, Math.cos(a) * (HALF - KEEP.wallT / 2))
    wall.rotation.y = a
    wall.castShadow = true
    wall.receiveShadow = true
    g.add(wall)
  }

  // 木地板（人字拼感觉：交替方向的板）
  for (let i = 0; i < 12; i++) {
    for (let j = 0; j < 6; j++) {
      const plank = box(2.1, 0.1, 1.0, (i + j) % 2 ? PALETTE.wood : PALETTE.woodDark)
      plank.position.set(-HALF + 1.6 + i * 1.05, 0.05, -HALF + 1.4 + j * 2.1)
      plank.receiveShadow = true
      g.add(plank)
    }
  }

  // 天花板
  const ceiling = box(KEEP.size - 1.2, 0.2, KEEP.size - 1.2, PALETTE.woodDeep)
  ceiling.position.y = H - 0.1
  g.add(ceiling)
  xray.hide.push(ceiling)
  const beams = new THREE.Group()
  for (let i = 0; i < 5; i++) {
    const beam = box(KEEP.size - 1.4, 0.34, 0.34, PALETTE.woodDark)
    beam.position.set(0, H - 0.34, -HALF + 2.0 + i * 2.4)
    beams.add(beam)
  }
  g.add(beams)
  xray.hide.push(beams)

  // 中央隔墙：北半议事厅，南半图书馆
  const divider = new THREE.Mesh(new THREE.BoxGeometry(KEEP.size - 2, H, 0.6), wallMat)
  divider.position.set(0, H / 2, 0.6)
  divider.castShadow = true
  g.add(divider)
  const arch1 = archDoor(2.2, 3.0, 0.8, PALETTE.stoneMid)
  arch1.position.set(-2.6, 0, 0.6)
  g.add(arch1)
  const arch2 = archDoor(2.2, 3.0, 0.8, PALETTE.stoneMid)
  arch2.position.set(2.6, 0, 0.6)
  g.add(arch2)

  // ---- 议事厅（北半）----
  const council = new THREE.Group()
  // 圆桌
  const roundTable = cyl(2.5, 2.5, 0.16, PALETTE.wood, 26)
  roundTable.position.set(0, 0.82, -3.4)
  roundTable.castShadow = true
  council.add(roundTable)
  const tableEdge = torus(2.5, 0.1, PALETTE.woodDark, 8, 30)
  tableEdge.rotation.x = Math.PI / 2
  tableEdge.position.set(0, 0.82, -3.4)
  council.add(tableEdge)
  const tablePedestal = cyl(0.5, 0.9, 0.74, PALETTE.woodDeep, 12)
  tablePedestal.position.set(0, 0.37, -3.4)
  council.add(tablePedestal)
  // 桌上的地图
  const map = box(2.6, 0.04, 1.8, PALETTE.sand)
  map.position.set(0, 0.92, -3.4)
  map.rotation.y = 0.3
  council.add(map)
  for (let i = 0; i < 6; i++) {
    const route = box(range(rand, 0.5, 1.4), 0.05, 0.05, PALETTE.trunkDark)
    route.position.set(range(rand, -0.9, 0.9), 0.95, -3.4 + range(rand, -0.6, 0.6))
    route.rotation.y = rand() * Math.PI
    council.add(route)
  }
  for (let i = 0; i < 4; i++) {
    const marker = cone(0.1, 0.24, PALETTE.bannerRed, 6)
    marker.position.set(range(rand, -1.0, 1.0), 1.02, -3.4 + range(rand, -0.7, 0.7))
    council.add(marker)
  }
  // 烛台与墨水瓶
  const candelabra = cyl(0.14, 0.2, 0.5, PALETTE.gold, 10)
  candelabra.position.set(-1.5, 1.15, -3.9)
  council.add(candelabra)
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2
    const candle = cyl(0.045, 0.05, 0.28, PALETTE.cookApron, 6)
    candle.position.set(-1.5 + Math.cos(a) * 0.16, 1.5, -3.9 + Math.sin(a) * 0.16)
    council.add(candle)
    const flame = cone(0.045, 0.13, PALETTE.fireCore, 6)
    const fm = flame.material as THREE.MeshLambertMaterial
    fm.emissive = new THREE.Color(PALETTE.fireCore)
    fm.emissiveIntensity = 1.7
    flame.position.set(-1.5 + Math.cos(a) * 0.16, 1.7, -3.9 + Math.sin(a) * 0.16)
    flame.userData.flame = { phase: i }
    council.add(flame)
  }
  const inkwell = cyl(0.09, 0.11, 0.14, PALETTE.ironDark, 8)
  inkwell.position.set(1.4, 0.98, -2.9)
  council.add(inkwell)
  const quill = cone(0.05, 0.5, PALETTE.cloud, 6)
  quill.position.set(1.5, 1.2, -2.9)
  quill.rotation.z = 0.4
  council.add(quill)

  // 圆桌周围的椅子
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2
    const ch = chair(i === 0)
    ch.position.set(Math.cos(a) * 3.3, 0.1, -3.4 + Math.sin(a) * 3.3)
    ch.rotation.y = -a + Math.PI
    council.add(ch)
  }
  // 主位（国王的椅子）更大
  const highChair = throne()
  highChair.scale.setScalar(0.72)
  highChair.position.set(0, 0.1, -6.0)
  council.add(highChair)

  // 墙上的地图与旗帜
  const wallMap = box(3.4, 2.2, 0.08, PALETTE.sand)
  wallMap.position.set(-3.6, 2.4, -HALF + 0.6)
  council.add(wallMap)
  for (let i = 0; i < 8; i++) {
    const line = box(range(rand, 0.4, 1.6), 0.04, 0.04, PALETTE.waterDeep)
    line.position.set(-3.6 + range(rand, -1.3, 1.3), 2.4 + range(rand, -0.8, 0.8), -HALF + 0.66)
    line.rotation.z = rand() * Math.PI
    council.add(line)
  }
  const compassRose = new THREE.Mesh(new THREE.CircleGeometry(0.3, 8), matte(PALETTE.bannerGold))
  compassRose.position.set(-2.6, 1.9, -HALF + 0.66)
  council.add(compassRose)

  for (const sx of [-5.4, 5.4]) {
    const f = flag(3.0, sx < 0 ? PALETTE.bannerBlue : PALETTE.bannerRed, 1.0, 1.8)
    f.position.set(sx, 0.1, -HALF + 1.0)
    council.add(f)
  }

  // 议事厅的窗
  for (let i = 0; i < 2; i++) {
    const win = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 2.2), matte(PALETTE.windowGlow))
    const wm = win.material as THREE.MeshLambertMaterial
    wm.emissive = new THREE.Color(PALETTE.windowGlow)
    wm.emissiveIntensity = 0.7
    win.position.set(HALF - 0.42, 2.2, -4.6 + i * 3.0)
    win.rotation.y = -Math.PI / 2
    win.userData.lamp = true
    council.add(win)
    const frame = archDoor(1.4, 2.5, 0.3, PALETTE.stoneMid)
    frame.position.set(HALF - 0.5, 0.9, -4.6 + i * 3.0)
    frame.rotation.y = -Math.PI / 2
    council.add(frame)
  }
  const chandelier1 = chandelier(0.7, 6)
  chandelier1.position.set(0, H - 0.7, -3.4)
  council.add(chandelier1)
  g.add(council)

  // ---- 图书馆（南半）----
  const library = new THREE.Group()
  // 靠墙书架
  for (let i = 0; i < 3; i++) {
    const shelf = bookshelf(3.4, H - 0.6, rand)
    shelf.position.set(-4.4 + i * 4.4, 0.1, HALF - 0.85)
    shelf.rotation.y = Math.PI
    library.add(shelf)
  }
  for (let i = 0; i < 2; i++) {
    const shelf = bookshelf(3.0, H - 0.9, rand)
    shelf.position.set(-HALF + 0.85, 0.1, 2.4 + i * 3.0)
    shelf.rotation.y = Math.PI / 2
    library.add(shelf)
  }
  // 中央阅读桌
  const readTable = trestleTable(3.4, 1.4, 0.78)
  readTable.position.set(1.2, 0.1, 3.4)
  library.add(readTable)
  for (const bz of [-1.0, 1.0]) {
    const b = bench(3.0)
    b.position.set(1.2, 0.1, 3.4 + bz)
    library.add(b)
  }
  // 摊开的书
  for (let i = 0; i < 3; i++) {
    const openBook = new THREE.Group()
    for (const sx of [-0.24, 0.24]) {
      const page = box(0.46, 0.04, 0.62, PALETTE.cloud)
      page.position.set(sx, 0, 0)
      page.rotation.z = sx * 0.08
      openBook.add(page)
    }
    const spine = box(0.08, 0.06, 0.64, PALETTE.bannerRed)
    openBook.add(spine)
    for (let l = 0; l < 5; l++) {
      const textLine = box(0.34, 0.045, 0.03, PALETTE.stoneShadow)
      textLine.position.set(l % 2 ? 0.24 : -0.24, 0.025, -0.2 + Math.floor(l / 2) * 0.16)
      openBook.add(textLine)
    }
    openBook.position.set(0.2 + i * 1.0, 0.92, 3.4)
    openBook.rotation.y = range(rand, -0.3, 0.3)
    library.add(openBook)
  }
  // 地球仪与浑天仪
  const g1 = globe()
  g1.position.set(-2.6, 0.1, 2.2)
  library.add(g1)
  const arm = armillary()
  arm.position.set(4.6, 0.1, 4.6)
  library.add(arm)
  // 书梯
  const ladder = new THREE.Group()
  for (const sx of [-0.3, 0.3]) {
    const rail = cyl(0.05, 0.05, 3.2, PALETTE.woodDeep, 6)
    rail.position.set(sx, 1.6, 0)
    ladder.add(rail)
  }
  for (let i = 0; i < 7; i++) {
    const rung = cyl(0.04, 0.04, 0.6, PALETTE.wood, 6)
    rung.rotation.z = Math.PI / 2
    rung.position.y = 0.35 + i * 0.42
    ladder.add(rung)
  }
  ladder.position.set(-4.4, 0.1, HALF - 1.5)
  ladder.rotation.set(0.18, 0.3, 0)
  library.add(ladder)
  // 散落的书堆
  for (let i = 0; i < 4; i++) {
    const stackH = 2 + Math.floor(rand() * 4)
    for (let s = 0; s < stackH; s++) {
      const bk = box(range(rand, 0.34, 0.5), 0.11, range(rand, 0.44, 0.6), pick(rand, [PALETTE.bannerRed, PALETTE.bannerBlue, PALETTE.leafDark, PALETTE.goldDark, PALETTE.trunk]))
      bk.position.set(4.8 + range(rand, -0.2, 0.2), 0.16 + s * 0.115, 1.6 + i * 0.9)
      bk.rotation.y = range(rand, -0.4, 0.4)
      library.add(bk)
    }
  }
  // 阅读角的扶手椅与地毯
  const rug = cyl(1.7, 1.7, 0.04, PALETTE.bannerRed, 20)
  rug.position.set(-3.4, 0.12, 4.2)
  library.add(rug)
  const rugInner = cyl(1.2, 1.2, 0.05, PALETTE.bannerGold, 18)
  rugInner.position.set(-3.4, 0.13, 4.2)
  library.add(rugInner)
  const armchair = chair(true)
  armchair.scale.setScalar(1.25)
  armchair.position.set(-3.4, 0.14, 4.6)
  armchair.rotation.y = Math.PI * 0.85
  library.add(armchair)
  const sideTable = cyl(0.42, 0.42, 0.08, PALETTE.woodDark, 12)
  sideTable.position.set(-4.6, 0.62, 3.6)
  library.add(sideTable)
  const sideLeg = cyl(0.08, 0.14, 0.58, PALETTE.woodDeep, 8)
  sideLeg.position.set(-4.6, 0.29, 3.6)
  library.add(sideLeg)
  const readingLamp = box(0.24, 0.3, 0.24, PALETTE.lantern)
  const rlm = readingLamp.material as THREE.MeshLambertMaterial
  rlm.emissive = new THREE.Color(PALETTE.lantern)
  rlm.emissiveIntensity = 1.0
  readingLamp.position.set(-4.6, 0.82, 3.6)
  readingLamp.userData.lamp = true
  library.add(readingLamp)

  const chandelier2 = chandelier(0.75, 7)
  chandelier2.position.set(0.6, H - 0.7, 3.4)
  library.add(chandelier2)

  // 图书馆的窗
  for (let i = 0; i < 2; i++) {
    const win = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 2.2), matte(PALETTE.windowGlow))
    const wm = win.material as THREE.MeshLambertMaterial
    wm.emissive = new THREE.Color(PALETTE.windowGlow)
    wm.emissiveIntensity = 0.7
    win.position.set(HALF - 0.42, 2.2, 2.6 + i * 2.8)
    win.rotation.y = -Math.PI / 2
    win.userData.lamp = true
    library.add(win)
  }
  g.add(library)

  // 火把
  for (const [tx, tz, ry] of [
    [-HALF + 0.6, -1.6, Math.PI / 2],
    [HALF - 0.6, -1.6, -Math.PI / 2],
    [-HALF + 0.6, 5.0, Math.PI / 2],
  ] as [number, number, number][]) {
    const t = wallTorch()
    t.position.set(tx, H * 0.62, tz)
    t.rotation.y = ry
    g.add(t)
  }

  return g
}

/** 三层：卧室与天文台。 */
function buildBedroomLevel(xray: XRayTargets): THREE.Group {
  const g = new THREE.Group()
  const { y0, y1 } = KEEP.levels[3]
  const H = y1 - y0
  const rand = makeRandom(5150)
  g.position.y = y0

  const wallMat = new THREE.MeshLambertMaterial({ color: new THREE.Color(PALETTE.stoneLight), side: THREE.DoubleSide })
  xray.fade.push(wallMat)

  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2
    const wall = new THREE.Mesh(new THREE.BoxGeometry(KEEP.size, H, KEEP.wallT), wallMat)
    wall.position.set(Math.sin(a) * (HALF - KEEP.wallT / 2), H / 2, Math.cos(a) * (HALF - KEEP.wallT / 2))
    wall.rotation.y = a
    wall.castShadow = true
    wall.receiveShadow = true
    g.add(wall)
  }

  // 木地板
  for (let i = 0; i < 12; i++) {
    const plank = box(1.0, 0.1, KEEP.size - 1.6, i % 2 ? PALETTE.wood : PALETTE.woodDark)
    plank.position.set(-HALF + 0.9 + i * 1.05, 0.05, 0)
    plank.receiveShadow = true
    g.add(plank)
  }
  const ceiling = box(KEEP.size - 1.2, 0.2, KEEP.size - 1.2, PALETTE.woodDeep)
  ceiling.position.y = H - 0.1
  g.add(ceiling)
  xray.hide.push(ceiling)

  // 隔墙：西半卧室，东半天文台
  const divider = new THREE.Mesh(new THREE.BoxGeometry(0.6, H, KEEP.size - 2), wallMat)
  divider.position.set(0.8, H / 2, 0)
  divider.castShadow = true
  g.add(divider)
  const door = archDoor(1.8, 2.7, 0.8, PALETTE.woodDark)
  door.position.set(0.8, 0, 2.4)
  door.rotation.y = Math.PI / 2
  g.add(door)
  const doorFrame = archDoor(2.1, 3.0, 0.7, PALETTE.stoneMid)
  doorFrame.position.set(0.8, 0, 2.4)
  doorFrame.rotation.y = Math.PI / 2
  g.add(doorFrame)

  // ---- 卧室（西半）----
  const bedroom = new THREE.Group()
  const bed = fourPosterBed()
  bed.position.set(-3.6, 0.1, -3.2)
  bed.rotation.y = Math.PI / 2
  bedroom.add(bed)

  // 地毯
  const rug = box(4.0, 0.04, 3.0, PALETTE.bannerBlue)
  rug.position.set(-3.2, 0.12, 0.6)
  bedroom.add(rug)
  const rugBorder = box(4.3, 0.03, 3.3, PALETTE.bannerGold)
  rugBorder.position.set(-3.2, 0.11, 0.6)
  bedroom.add(rugBorder)
  for (let i = 0; i < 5; i++) {
    const motif = new THREE.Mesh(new THREE.CircleGeometry(0.22, 10), matte(PALETTE.bannerGold))
    motif.rotation.x = -Math.PI / 2
    motif.position.set(-4.6 + i * 0.7, 0.145, 0.6)
    bedroom.add(motif)
  }

  // 衣柜
  const wardrobe = new THREE.Group()
  const wBody = box(2.2, 2.6, 0.8, PALETTE.woodDark)
  wBody.position.y = 1.3
  wardrobe.add(wBody)
  for (const sx of [-0.55, 0.55]) {
    const wDoor = box(1.02, 2.4, 0.1, PALETTE.wood)
    wDoor.position.set(sx, 1.3, 0.42)
    wardrobe.add(wDoor)
    const panel = box(0.7, 1.8, 0.06, PALETTE.woodDeep)
    panel.position.set(sx, 1.3, 0.48)
    wardrobe.add(panel)
    const knob = sphere(0.07, PALETTE.gold, 7)
    knob.position.set(sx - Math.sign(sx) * 0.38, 1.3, 0.54)
    wardrobe.add(knob)
  }
  const cornice = box(2.4, 0.2, 0.95, PALETTE.woodDeep)
  cornice.position.y = 2.7
  wardrobe.add(cornice)
  for (const sx of [-1.0, 1.0]) {
    const foot = box(0.2, 0.2, 0.8, PALETTE.woodDeep)
    foot.position.set(sx, 0.1, 0)
    wardrobe.add(foot)
  }
  wardrobe.position.set(-5.6, 0.1, 3.4)
  wardrobe.rotation.y = Math.PI / 2
  bedroom.add(wardrobe)

  // 梳妆台与镜子
  const vanity = new THREE.Group()
  const vTop = box(1.6, 0.1, 0.7, PALETTE.wood)
  vTop.position.y = 0.82
  vanity.add(vTop)
  for (const sx of [-0.7, 0.7]) {
    const leg = box(0.12, 0.82, 0.12, PALETTE.woodDark)
    leg.position.set(sx, 0.41, 0)
    vanity.add(leg)
  }
  const mirrorFrame = torus(0.5, 0.08, PALETTE.gold, 8, 22)
  mirrorFrame.position.set(0, 1.6, -0.2)
  vanity.add(mirrorFrame)
  const mirror = new THREE.Mesh(
    new THREE.CircleGeometry(0.46, 20),
    uniqueMatte(PALETTE.water, { emissive: new THREE.Color(PALETTE.water), emissiveIntensity: 0.25 }),
  )
  mirror.position.set(0, 1.6, -0.18)
  vanity.add(mirror)
  const brush = box(0.1, 0.06, 0.28, PALETTE.woodDeep)
  brush.position.set(-0.4, 0.9, 0.1)
  vanity.add(brush)
  const perfume = cyl(0.09, 0.11, 0.24, PALETTE.rosePink, 9)
  perfume.position.set(0.4, 0.99, 0.05)
  vanity.add(perfume)
  const candle = cyl(0.05, 0.055, 0.24, PALETTE.cookApron, 6)
  candle.position.set(0.1, 0.99, 0.2)
  vanity.add(candle)
  vanity.position.set(-1.6, 0.1, 4.6)
  vanity.rotation.y = Math.PI
  bedroom.add(vanity)

  // 洗脸架
  const washstand = new THREE.Group()
  const basin = cyl(0.42, 0.3, 0.2, PALETTE.cloud, 14)
  basin.position.y = 0.9
  washstand.add(basin)
  const waterIn = cyl(0.36, 0.36, 0.04, PALETTE.water, 14)
  waterIn.position.y = 0.98
  washstand.add(waterIn)
  const stand = cyl(0.09, 0.2, 0.8, PALETTE.woodDeep, 8)
  stand.position.y = 0.4
  washstand.add(stand)
  const pitcher = cyl(0.16, 0.22, 0.4, PALETTE.cloud, 10)
  pitcher.position.set(0.5, 1.05, 0)
  washstand.add(pitcher)
  const towel = box(0.5, 0.7, 0.05, PALETTE.cookApron)
  towel.position.set(-0.55, 0.9, 0)
  washstand.add(towel)
  washstand.position.set(-5.8, 0.1, -0.4)
  bedroom.add(washstand)

  // 宝箱与坐垫
  const chestObj = chest(1.4)
  chestObj.position.set(-1.8, 0.1, -5.4)
  chestObj.rotation.y = 0.2
  bedroom.add(chestObj)
  for (let i = 0; i < 3; i++) {
    const cushion = box(0.7, 0.22, 0.7, pick(rand, [PALETTE.maidDress, PALETTE.bannerRed, PALETTE.bannerBlue]))
    cushion.position.set(-4.6 + i * 0.9, 0.24, 3.6)
    cushion.rotation.y = range(rand, -0.3, 0.3)
    bedroom.add(cushion)
  }

  // 窗座（西墙与南墙）
  for (const [wx, wz, ry] of [
    [-HALF + 0.5, 1.6, Math.PI / 2],
    [-3.0, HALF - 0.5, Math.PI],
  ] as [number, number, number][]) {
    const winGroup = new THREE.Group()
    const pane = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 2.4), matte(PALETTE.windowGlow))
    const pm = pane.material as THREE.MeshLambertMaterial
    pm.emissive = new THREE.Color(PALETTE.windowGlow)
    pm.emissiveIntensity = 0.75
    pane.position.set(0, 1.9, 0)
    pane.userData.lamp = true
    winGroup.add(pane)
    const frame = archDoor(1.5, 2.7, 0.28, PALETTE.stoneMid)
    frame.position.set(0, 0.55, -0.05)
    winGroup.add(frame)
    const seat = box(1.7, 0.16, 0.85, PALETTE.wood)
    seat.position.set(0, 0.62, 0.4)
    winGroup.add(seat)
    for (let i = 0; i < 2; i++) {
      const cush = box(0.6, 0.2, 0.6, i ? PALETTE.maidDress : PALETTE.bannerBlue)
      cush.position.set(-0.35 + i * 0.7, 0.8, 0.4)
      winGroup.add(cush)
    }
    // 窗帘
    for (const sx of [-0.85, 0.85]) {
      const curtain = new THREE.Mesh(
        new THREE.PlaneGeometry(0.6, 2.6, 3, 6),
        new THREE.MeshLambertMaterial({ color: new THREE.Color(PALETTE.maidDress), side: THREE.DoubleSide }),
      )
      curtain.position.set(sx, 1.9, 0.12)
      winGroup.add(curtain)
    }
    const rod = cyl(0.045, 0.045, 2.1, PALETTE.goldDark, 6)
    rod.rotation.z = Math.PI / 2
    rod.position.set(0, 3.25, 0.12)
    winGroup.add(rod)
    winGroup.position.set(wx, 0.1, wz)
    winGroup.rotation.y = ry
    bedroom.add(winGroup)
  }

  const chandelierB = chandelier(0.6, 6)
  chandelierB.position.set(-3.2, H - 0.6, 0.4)
  bedroom.add(chandelierB)
  const t1 = wallTorch()
  t1.position.set(-HALF + 0.6, H * 0.6, -5.0)
  t1.rotation.y = Math.PI / 2
  bedroom.add(t1)
  g.add(bedroom)

  // ---- 天文台（东半）----
  const observatory = new THREE.Group()
  // 望远镜指向窗外的星空
  const scope = telescope()
  scope.position.set(3.8, 0.1, -3.4)
  scope.rotation.y = -0.7
  observatory.add(scope)

  // 星图桌
  const starTable = trestleTable(2.8, 1.3, 0.78)
  starTable.position.set(4.2, 0.1, 1.2)
  observatory.add(starTable)
  const starChart = box(2.2, 0.04, 1.0, PALETTE.stoneShadow)
  starChart.position.set(4.2, 0.9, 1.2)
  observatory.add(starChart)
  for (let i = 0; i < 22; i++) {
    const starDot = new THREE.Mesh(new THREE.CircleGeometry(range(rand, 0.03, 0.07), 7), matte(PALETTE.star))
    const sm = starDot.material as THREE.MeshLambertMaterial
    sm.emissive = new THREE.Color(PALETTE.star)
    sm.emissiveIntensity = 1.2
    starDot.rotation.x = -Math.PI / 2
    starDot.position.set(4.2 + range(rand, -1.0, 1.0), 0.93, 1.2 + range(rand, -0.42, 0.42))
    observatory.add(starDot)
  }
  for (let i = 0; i < 5; i++) {
    const line = box(range(rand, 0.3, 0.8), 0.045, 0.02, PALETTE.star)
    const lm2 = line.material as THREE.MeshLambertMaterial
    lm2.emissive = new THREE.Color(PALETTE.star)
    lm2.emissiveIntensity = 0.7
    line.position.set(4.2 + range(rand, -0.8, 0.8), 0.935, 1.2 + range(rand, -0.35, 0.35))
    line.rotation.y = rand() * Math.PI
    observatory.add(line)
  }
  const astro = new THREE.Group()
  const astroRing = torus(0.26, 0.03, PALETTE.gold, 7, 20)
  astro.add(astroRing)
  const astroRing2 = torus(0.2, 0.025, PALETTE.goldDark, 7, 18)
  astroRing2.rotation.y = 0.8
  astro.add(astroRing2)
  astro.position.set(2.9, 1.15, 1.5)
  observatory.add(astro)

  // 墙上的星象盘与星座图
  for (let i = 0; i < 3; i++) {
    const chart = new THREE.Mesh(new THREE.CircleGeometry(0.75, 20), matte(PALETTE.stoneShadow))
    chart.position.set(HALF - 0.44, 2.4, -3.0 + i * 2.8)
    chart.rotation.y = -Math.PI / 2
    observatory.add(chart)
    const chartRing = torus(0.76, 0.05, PALETTE.goldDark, 7, 22)
    chartRing.position.copy(chart.position)
    chartRing.rotation.y = -Math.PI / 2
    observatory.add(chartRing)
    for (let s = 0; s < 9; s++) {
      const a = rand() * Math.PI * 2
      const d = rand() * 0.6
      const dot = new THREE.Mesh(new THREE.CircleGeometry(0.045, 6), matte(PALETTE.star))
      const dm = dot.material as THREE.MeshLambertMaterial
      dm.emissive = new THREE.Color(PALETTE.star)
      dm.emissiveIntensity = 1.3
      dot.position.set(HALF - 0.42, 2.4 + Math.sin(a) * d, -3.0 + i * 2.8 + Math.cos(a) * d)
      dot.rotation.y = -Math.PI / 2
      observatory.add(dot)
    }
  }

  // 大窗（观星用，朝向天空）
  const bigWin = new THREE.Group()
  const bigPane = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 3.0), matte(PALETTE.skyNightMid))
  const bpm = bigPane.material as THREE.MeshLambertMaterial
  bpm.emissive = new THREE.Color(PALETTE.skyNightMid)
  bpm.emissiveIntensity = 0.35
  bigPane.position.set(0, 2.2, 0)
  bigWin.add(bigPane)
  const bigFrame = archDoor(3.0, 3.4, 0.3, PALETTE.stoneMid)
  bigFrame.position.set(0, 0.5, -0.06)
  bigWin.add(bigFrame)
  for (let i = 0; i < 3; i++) {
    const mullion = box(0.09, 3.0, 0.1, PALETTE.stoneDark)
    mullion.position.set(-0.85 + i * 0.85, 2.2, 0.04)
    bigWin.add(mullion)
  }
  bigWin.position.set(3.4, 0.1, -HALF + 0.5)
  observatory.add(bigWin)

  // 天文台的旋转穹顶开口（屋顶处）
  const hatch = cyl(1.6, 1.6, 0.2, PALETTE.woodDark, 16)
  hatch.position.set(3.6, H - 0.2, -2.6)
  observatory.add(hatch)
  xray.hide.push(hatch)

  // 书堆与椅子
  const astroChair = chair(true)
  astroChair.position.set(4.2, 0.1, 2.6)
  astroChair.rotation.y = Math.PI
  observatory.add(astroChair)
  for (let i = 0; i < 3; i++) {
    for (let s = 0; s < 3; s++) {
      const bk = box(range(rand, 0.36, 0.5), 0.11, range(rand, 0.44, 0.58), pick(rand, [PALETTE.bannerBlue, PALETTE.kingRobe, PALETTE.leafDark]))
      bk.position.set(1.8 + i * 0.55, 0.16 + s * 0.115, 4.6)
      bk.rotation.y = range(rand, -0.4, 0.4)
      observatory.add(bk)
    }
  }
  // 一座小天平与量角器
  const scale = new THREE.Group()
  const scalePost = cyl(0.04, 0.06, 0.6, PALETTE.gold, 7)
  scalePost.position.y = 0.3
  scale.add(scalePost)
  const scaleBeam = box(0.7, 0.04, 0.04, PALETTE.gold)
  scaleBeam.position.y = 0.58
  scale.add(scaleBeam)
  for (const sx of [-0.32, 0.32]) {
    const pan = cyl(0.14, 0.12, 0.04, PALETTE.goldDark, 10)
    pan.position.set(sx, 0.42, 0)
    scale.add(pan)
  }
  scale.position.set(5.6, 0.9, 1.2)
  observatory.add(scale)
  const pedestal = cyl(0.2, 0.26, 0.8, PALETTE.woodDeep, 8)
  pedestal.position.set(5.6, 0.5, 1.2)
  observatory.add(pedestal)

  const chandelierO = chandelier(0.55, 5)
  chandelierO.position.set(3.6, H - 0.6, 0.6)
  observatory.add(chandelierO)
  g.add(observatory)

  return g
}

// ---------- 螺旋楼梯塔 ----------

function buildSpiralStair(xray: XRayTargets): THREE.Group {
  const g = new THREE.Group()
  g.name = 'spiral-stair'
  const totalH = KEEP.roofY
  const R = 2.3
  const wallMat = new THREE.MeshLambertMaterial({ color: new THREE.Color(PALETTE.stoneLight), side: THREE.DoubleSide })
  xray.fade.push(wallMat)

  // 塔身
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(R, R * 1.04, totalH, 20, 1, true), wallMat)
  shaft.position.y = totalH / 2
  shaft.castShadow = true
  shaft.receiveShadow = true
  g.add(shaft)

  // 中心柱
  const newel = cyl(0.42, 0.46, totalH, PALETTE.stoneMid, 12)
  newel.position.y = totalH / 2
  newel.castShadow = true
  g.add(newel)

  // 台阶：绕中心柱螺旋上升
  const steps = 78
  const turns = 4.2
  const stepGeo = new THREE.BoxGeometry(R - 0.5, 0.18, 0.72)
  const stepMat = matte(PALETTE.stone)
  for (let i = 0; i < steps; i++) {
    const t = i / steps
    const a = t * Math.PI * 2 * turns
    const y = t * (totalH - 0.6) + 0.2
    const step = new THREE.Mesh(stepGeo, stepMat)
    step.position.set(Math.cos(a) * (R * 0.55 + 0.1), y, Math.sin(a) * (R * 0.55 + 0.1))
    step.rotation.y = -a
    step.castShadow = true
    step.receiveShadow = true
    g.add(step)
    // 外侧扶手柱
    if (i % 4 === 0) {
      const baluster = cyl(0.05, 0.05, 0.7, PALETTE.woodDark, 6)
      baluster.position.set(Math.cos(a) * (R - 0.28), y + 0.4, Math.sin(a) * (R - 0.28))
      g.add(baluster)
    }
  }
  // 扶手（螺旋管）
  const railPts: THREE.Vector3[] = []
  for (let i = 0; i <= 120; i++) {
    const t = i / 120
    const a = t * Math.PI * 2 * turns
    const y = t * (totalH - 0.6) + 0.9
    railPts.push(new THREE.Vector3(Math.cos(a) * (R - 0.28), y, Math.sin(a) * (R - 0.28)))
  }
  const railCurve = new THREE.CatmullRomCurve3(railPts)
  const rail = new THREE.Mesh(new THREE.TubeGeometry(railCurve, 160, 0.07, 6, false), matte(PALETTE.wood))
  rail.castShadow = true
  g.add(rail)

  // 每层的 landing 与门洞
  for (let li = 1; li < KEEP.levels.length; li++) {
    const y = KEEP.levels[li].y0
    const landing = cyl(R - 0.1, R - 0.1, 0.2, PALETTE.stoneMid, 18)
    landing.position.y = y + 0.1
    landing.receiveShadow = true
    g.add(landing)
  }

  // 塔顶小尖顶
  const roof = conicalRoof(R * 1.15, 4.2, PALETTE.roofRose, 18, PALETTE.gold)
  roof.position.y = totalH
  g.add(roof)
  xray.hide.push(roof)

  // 塔身窄窗（采光）
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2 * 2.3
    const y = 1.6 + i * (totalH / 9)
    const slit = box(0.24, 0.9, 0.3, PALETTE.windowGlow)
    const sm = slit.material as THREE.MeshLambertMaterial
    sm.emissive = new THREE.Color(PALETTE.windowGlow)
    sm.emissiveIntensity = 0.6
    slit.position.set(Math.cos(a) * (R - 0.02), y, Math.sin(a) * (R - 0.02))
    slit.rotation.y = -a
    slit.userData.lamp = true
    g.add(slit)
  }

  return g
}

// ---------- 屋顶 ----------

function buildKeepRoof(xray: XRayTargets): THREE.Group {
  const g = new THREE.Group()
  g.name = 'keep-roof'
  const y = KEEP.roofY

  // 屋顶平台与雉堞
  const deck = box(KEEP.size + 1.4, 0.4, KEEP.size + 1.4, PALETTE.stoneMid)
  deck.position.y = y + 0.2
  deck.castShadow = true
  deck.receiveShadow = true
  g.add(deck)

  const parapetH = 1.1
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2
    const parapet = box(KEEP.size + 1.4, parapetH, 0.5, PALETTE.stoneLight)
    parapet.position.set(Math.sin(a) * (HALF + 0.45), y + 0.4 + parapetH / 2, Math.cos(a) * (HALF + 0.45))
    parapet.rotation.y = a
    parapet.castShadow = true
    g.add(parapet)
    // 雉堞齿
    const merlonCount = 7
    for (let m = 0; m < merlonCount; m++) {
      if (m % 2 === 1) continue
      const off = -HALF + ((HALF * 2) / (merlonCount - 1)) * m
      const merlon = box(1.0, 0.75, 0.6, PALETTE.stoneLight)
      merlon.position.set(
        Math.sin(a) * (HALF + 0.45) + Math.cos(a) * off,
        y + 0.4 + parapetH + 0.37,
        Math.cos(a) * (HALF + 0.45) - Math.sin(a) * off,
      )
      merlon.rotation.y = a
      merlon.castShadow = true
      g.add(merlon)
    }
  }

  // 中央大尖顶
  const spireBase = box(7.0, 1.0, 7.0, PALETTE.stoneDark)
  spireBase.position.y = y + 1.4
  g.add(spireBase)
  const spire = new THREE.Mesh(new THREE.ConeGeometry(5.2, 7.4, 4), matte(PALETTE.roofSlate))
  spire.rotation.y = Math.PI / 4
  spire.position.y = y + 5.6
  spire.castShadow = true
  g.add(spire)
  const spireBall = sphere(0.42, PALETTE.gold, 12)
  spireBall.position.y = y + 9.5
  g.add(spireBall)
  const spireSpike = cyl(0.09, 0.09, 1.6, PALETTE.gold, 8)
  spireSpike.position.y = y + 10.4
  g.add(spireSpike)
  const mainFlag = flag(3.6, PALETTE.bannerRed, 2.0, 1.2)
  mainFlag.position.y = y + 11.1
  g.add(mainFlag)
  g.userData.mainRoof = true

  // 四角小塔
  for (const [sx, sz] of [
    [-1, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
  ] as [number, number][]) {
    const turret = new THREE.Group()
    const body = cyl(1.5, 1.6, 3.4, PALETTE.stoneLight, 14)
    body.position.y = 1.7
    body.castShadow = true
    turret.add(body)
    const corbelRing = cyl(1.75, 1.55, 0.4, PALETTE.stoneDark, 14)
    corbelRing.position.y = 3.5
    turret.add(corbelRing)
    for (let m = 0; m < 8; m++) {
      if (m % 2 === 1) continue
      const a = (m / 8) * Math.PI * 2
      const merlon = box(0.55, 0.6, 0.34, PALETTE.stoneLight)
      merlon.position.set(Math.cos(a) * 1.7, 4.0, Math.sin(a) * 1.7)
      merlon.rotation.y = -a
      merlon.castShadow = true
      turret.add(merlon)
    }
    const roof = conicalRoof(1.85, 3.4, PALETTE.roofRose, 14, PALETTE.gold)
    roof.position.y = 3.7
    turret.add(roof)
    xray.hide.push(roof)
    const tFlag = flag(2.0, PALETTE.bannerBlue, 1.0, 0.6)
    tFlag.position.y = 7.0
    turret.add(tFlag)
    // 小窗
    for (let w = 0; w < 3; w++) {
      const a = (w / 3) * Math.PI * 2
      const win = box(0.3, 0.7, 0.2, PALETTE.windowGlow)
      const wm = win.material as THREE.MeshLambertMaterial
      wm.emissive = new THREE.Color(PALETTE.windowGlow)
      wm.emissiveIntensity = 0.6
      win.position.set(Math.cos(a) * 1.52, 2.0, Math.sin(a) * 1.52)
      win.rotation.y = -a
      win.userData.lamp = true
      turret.add(win)
    }
    turret.position.set(sx * (HALF + 0.5), y + 0.4, sz * (HALF + 0.5))
    g.add(turret)
  }

  // 屋顶上的钟（报警钟）
  const bellFrame = new THREE.Group()
  for (const sx of [-0.9, 0.9]) {
    const post = cyl(0.11, 0.13, 2.2, PALETTE.woodDeep, 8)
    post.position.set(sx, 1.1, 0)
    bellFrame.add(post)
  }
  const beam = cyl(0.11, 0.11, 2.0, PALETTE.woodDeep, 8)
  beam.rotation.z = Math.PI / 2
  beam.position.y = 2.2
  bellFrame.add(beam)
  const bell = cyl(0.42, 0.6, 0.85, PALETTE.goldDark, 14)
  bell.position.y = 1.6
  bellFrame.add(bell)
  const bellRoof = new THREE.Mesh(new THREE.ConeGeometry(1.4, 1.0, 4), matte(PALETTE.roofSlateDark))
  bellRoof.rotation.y = Math.PI / 4
  bellRoof.position.y = 2.8
  bellFrame.add(bellRoof)
  bellFrame.position.set(-4.2, y + 0.4, 4.2)
  g.add(bellFrame)

  // 屋顶火把
  for (const [tx, tz] of [
    [-HALF - 0.2, 0],
    [HALF + 0.2, 0],
    [0, -HALF - 0.2],
  ] as [number, number][]) {
    const t = wallTorch()
    t.position.set(tx, y + 0.6, tz)
    g.add(t)
  }

  xray.hide.push(g)
  return g
}

// ---------- 主堡总装 ----------

export function buildKeep(xray: XRayTargets): THREE.Group {
  const g = new THREE.Group()
  g.name = 'keep'

  g.add(buildDungeonLevel(xray))
  g.add(buildGreatHall(xray))
  g.add(buildCouncilLevel(xray))
  g.add(buildBedroomLevel(xray))

  // 螺旋楼梯塔：贴在主堡西北角外侧
  const stair = buildSpiralStair(xray)
  stair.position.set(-HALF - 1.4, 0, -HALF - 1.4)
  g.add(stair)

  g.add(buildKeepRoof(xray))

  // 主堡外立面装饰：入口门廊、扶壁、纹章
  const porch = new THREE.Group()
  const porchRoof = new THREE.Mesh(new THREE.ConeGeometry(3.2, 2.0, 4), matte(PALETTE.roofRose))
  porchRoof.rotation.y = Math.PI / 4
  porchRoof.scale.set(1.3, 1, 0.7)
  porchRoof.position.set(0, 4.6, HALF + 1.0)
  porchRoof.castShadow = true
  porch.add(porchRoof)
  for (const sx of [-1.9, 1.9]) {
    const col = cyl(0.26, 0.3, 4.4, PALETTE.stoneMid, 10)
    col.position.set(sx, 2.2, HALF + 1.4)
    col.castShadow = true
    porch.add(col)
    const cap = cyl(0.38, 0.28, 0.3, PALETTE.stoneDark, 10)
    cap.position.set(sx, 4.4, HALF + 1.4)
    porch.add(cap)
  }
  const steps = box(5.0, 0.3, 1.6, PALETTE.stoneMid)
  steps.position.set(0, 0.15, HALF + 1.6)
  steps.receiveShadow = true
  porch.add(steps)
  // 门廊上的纹章
  const crest = new THREE.Group()
  const crestShield = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 0.14, 3), matte(PALETTE.bannerRed))
  crestShield.rotation.x = Math.PI / 2
  crestShield.rotation.z = Math.PI
  crestShield.scale.y = 1.2
  crest.add(crestShield)
  const crestStar = new THREE.Mesh(new THREE.CircleGeometry(0.3, 5), matte(PALETTE.bannerGold))
  crestStar.position.z = 0.09
  crest.add(crestStar)
  crest.position.set(0, 5.0, HALF + 0.6)
  porch.add(crest)
  g.add(porch)

  // 外扶壁
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + Math.PI / 4
    for (const off of [-1, 1]) {
      const bx = Math.sin(a) * (HALF + 0.5) + Math.cos(a) * (off * 4.2)
      const bz = Math.cos(a) * (HALF + 0.5) - Math.sin(a) * (off * 4.2)
      if (Math.hypot(bx + HALF + 1.4, bz + HALF + 1.4) < 3.4) continue
      const buttress = box(1.3, KEEP.roofY * 0.62, 1.0, PALETTE.stoneMid)
      buttress.position.set(bx, KEEP.roofY * 0.31, bz)
      buttress.rotation.y = a
      buttress.castShadow = true
      buttress.receiveShadow = true
      g.add(buttress)
      const cap = cone(0.85, 0.9, PALETTE.stoneDark, 4)
      cap.rotation.y = Math.PI / 4 + a
      cap.position.set(bx, KEEP.roofY * 0.62 + 0.45, bz)
      cap.castShadow = true
      g.add(cap)
    }
  }

  // 主堡外立面的窗（每层每面）
  for (let li = 0; li < KEEP.levels.length; li++) {
    const lvl = KEEP.levels[li]
    const midY = (lvl.y0 + lvl.y1) / 2
    for (let face = 0; face < 4; face++) {
      const a = (face / 4) * Math.PI * 2
      for (let w = 0; w < 2; w++) {
        const off = w === 0 ? -3.2 : 3.2
        if (li === 0 && Math.abs(off) < 4) continue
        const wx = Math.sin(a) * (HALF + 0.06) + Math.cos(a) * off
        const wz = Math.cos(a) * (HALF + 0.06) - Math.sin(a) * off
        const win = box(0.9, li === 1 ? 2.2 : 1.5, 0.22, PALETTE.windowGlow)
        const wm = win.material as THREE.MeshLambertMaterial
        wm.emissive = new THREE.Color(PALETTE.windowGlow)
        wm.emissiveIntensity = 0.65
        win.position.set(wx, midY, wz)
        win.rotation.y = a
        win.userData.lamp = true
        g.add(win)
        const hood = box(1.2, 0.16, 0.3, PALETTE.stoneDark)
        hood.position.set(wx, midY + (li === 1 ? 1.2 : 0.85), wz)
        hood.rotation.y = a
        g.add(hood)
      }
    }
  }

  return g
}
