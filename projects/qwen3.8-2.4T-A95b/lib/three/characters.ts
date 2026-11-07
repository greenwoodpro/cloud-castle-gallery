import * as THREE from 'three'
import { PALETTE } from './palette'
import { makeRandom, pick, range } from './noise'
import { box, capsule, cone, cyl, glass, matte, sphere, torus, uniqueMatte } from './materials'
import { CASTLE_Y, APOTHEM, WALL } from './castle'
import { KEEP } from './interior'
import { ISLAND, ZONES, groundY } from './island'

/**
 * 人物与生物。
 * 比例刻意做成「大头小身」的绘本比例，动作幅度很小，
 * 保持小王子插画里那种安静、温和的气质。
 */

/** 主堡局部坐标里乐师廊的位置（+Z 墙内侧）。 */
const GALLERY_Z = KEEP.size / 2 - 1.9

export type HairStyle = 'prince' | 'crown' | 'helmet' | 'hood' | 'cap' | 'bun' | 'beret' | 'bald' | 'coif'
export type Prop = 'halberd' | 'lantern' | 'scepter' | 'book' | 'broom' | 'hammer' | 'lute' | 'basket' | 'shepherdCrook' | 'quill' | 'telescope' | 'key' | 'pitchfork' | 'shield' | 'tray' | 'hoe'

export interface FigureOptions {
  height?: number
  robe: string
  trim?: string
  skin?: string
  hair?: string
  hairStyle?: HairStyle
  robed?: boolean
  cape?: string
  apron?: string
  props?: Prop[]
  pose?: 'stand' | 'walk' | 'sit' | 'point' | 'read'
  belt?: string
}

/** 通用人形。返回的 group 带 userData.anim，供动画循环驱动。 */
export function buildFigure(opts: FigureOptions): THREE.Group {
  const g = new THREE.Group()
  const h = opts.height ?? 1.7
  const skin = opts.skin ?? PALETTE.skin
  const hair = opts.hair ?? PALETTE.trunkDark
  const robed = opts.robed ?? true
  const pose = opts.pose ?? 'stand'

  const headR = h * 0.155
  const headY = h * 0.845
  const sitting = pose === 'sit'
  const bodyH = sitting ? h * 0.34 : h * 0.6

  // ---- 腿（非长袍人物才露出）----
  if (!robed) {
    for (const sx of [-1, 1]) {
      const leg = capsule(h * 0.05, sitting ? h * 0.14 : h * 0.24, opts.trim ?? PALETTE.woodDark, 8)
      leg.position.set(sx * h * 0.075, sitting ? h * 0.16 : h * 0.17, sitting ? h * 0.1 : 0)
      if (sitting) leg.rotation.x = -Math.PI / 2.4
      g.add(leg)
      const boot = box(h * 0.1, h * 0.07, h * 0.16, PALETTE.princeBoots)
      boot.position.set(sx * h * 0.075, h * 0.035, sitting ? h * 0.2 : h * 0.02)
      g.add(boot)
    }
  }

  // ---- 躯干 ----
  const torsoY = sitting ? h * 0.34 : bodyH / 2 + (robed ? 0 : h * 0.06)
  if (robed) {
    // 长袍：下摆宽、肩部窄
    const robe = new THREE.Mesh(
      new THREE.CylinderGeometry(h * 0.115, h * 0.2, bodyH, 14),
      matte(opts.robe),
    )
    robe.position.y = torsoY
    robe.castShadow = true
    robe.receiveShadow = true
    g.add(robe)
    // 下摆
    const hem = cyl(h * 0.205, h * 0.21, h * 0.05, opts.trim ?? PALETTE.cloud, 14)
    hem.position.y = h * 0.03
    g.add(hem)
    // 腰带
    if (opts.belt) {
      const belt = cyl(h * 0.135, h * 0.14, h * 0.05, opts.belt, 14)
      belt.position.y = bodyH * 0.62
      g.add(belt)
    }
  } else {
    const torso = capsule(h * 0.105, bodyH * 0.5, opts.robe, 12)
    torso.position.y = torsoY
    torso.scale.z = 0.78
    torso.castShadow = true
    g.add(torso)
    if (opts.belt) {
      const belt = cyl(h * 0.115, h * 0.115, h * 0.05, opts.belt, 12)
      belt.position.y = bodyH * 0.55
      g.add(belt)
    }
  }

  // 围裙
  if (opts.apron) {
    const apron = box(h * 0.24, bodyH * 0.72, h * 0.04, opts.apron)
    apron.position.set(0, bodyH * 0.45, h * 0.13)
    g.add(apron)
    const strap1 = box(h * 0.03, bodyH * 0.4, h * 0.03, opts.apron)
    strap1.position.set(-h * 0.07, bodyH * 0.85, h * 0.1)
    strap1.rotation.x = -0.2
    g.add(strap1)
    const strap2 = strap1.clone()
    strap2.position.x = h * 0.07
    g.add(strap2)
  }

  // 披风
  if (opts.cape) {
    const cape = new THREE.Mesh(
      new THREE.CylinderGeometry(h * 0.13, h * 0.24, bodyH * 1.05, 14, 1, true, Math.PI * 0.25, Math.PI * 1.5),
      new THREE.MeshLambertMaterial({ color: new THREE.Color(opts.cape), side: THREE.DoubleSide }),
    )
    cape.position.y = bodyH * 0.52
    cape.rotation.y = Math.PI
    cape.castShadow = true
    g.add(cape)
    const clasp = sphere(h * 0.035, PALETTE.gold, 8)
    clasp.position.set(0, bodyH * 0.98, h * 0.11)
    g.add(clasp)
  }

  // ---- 手臂 ----
  const arms: THREE.Object3D[] = []
  const armLen = h * 0.26
  for (const sx of [-1, 1]) {
    const pivot = new THREE.Group()
    pivot.position.set(sx * h * 0.135, bodyH * 0.86, 0)
    const arm = capsule(h * 0.042, armLen * 0.6, opts.robe, 8)
    arm.position.y = -armLen / 2
    pivot.add(arm)
    const hand = sphere(h * 0.05, skin, 8)
    hand.position.y = -armLen
    pivot.add(hand)
    // 袖口
    const cuff = cyl(h * 0.052, h * 0.055, h * 0.035, opts.trim ?? opts.robe, 8)
    cuff.position.y = -armLen * 0.82
    pivot.add(cuff)

    if (pose === 'point' && sx > 0) {
      pivot.rotation.z = -1.25
      pivot.rotation.x = -0.3
    } else if (pose === 'read') {
      pivot.rotation.x = -1.15
      pivot.rotation.z = sx * 0.28
    } else if (pose === 'sit') {
      pivot.rotation.x = -0.5
      pivot.rotation.z = sx * 0.18
    } else {
      pivot.rotation.z = sx * 0.14
    }
    g.add(pivot)
    arms.push(pivot)
  }

  // ---- 头 ----
  const head = sphere(headR, skin, 16)
  head.position.y = headY
  head.castShadow = true
  g.add(head)
  const neck = cyl(headR * 0.42, headR * 0.5, headR * 0.5, skin, 8)
  neck.position.y = headY - headR * 0.95
  g.add(neck)

  // 五官：只用极简的两点眼睛与一抹腮红，保持插画的含蓄
  for (const sx of [-1, 1]) {
    const eye = sphere(headR * 0.11, '#4a4238', 7)
    eye.position.set(sx * headR * 0.36, headY + headR * 0.06, headR * 0.88)
    g.add(eye)
    const blush = sphere(headR * 0.17, PALETTE.rosePink, 7)
    blush.material = uniqueMatte(PALETTE.rosePink, { transparent: true, opacity: 0.45 })
    blush.position.set(sx * headR * 0.6, headY - headR * 0.2, headR * 0.72)
    blush.scale.set(1, 0.6, 0.4)
    g.add(blush)
  }
  const mouth = box(headR * 0.22, headR * 0.05, headR * 0.06, '#b5836d')
  mouth.position.set(0, headY - headR * 0.36, headR * 0.9)
  g.add(mouth)

  // ---- 发型 / 头饰 ----
  const hs = opts.hairStyle ?? 'prince'
  if (hs === 'prince') {
    // 小王子的金色蓬松头发：几团交叠的球
    const cap = new THREE.Mesh(
      new THREE.SphereGeometry(headR * 1.08, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.62),
      matte(hair),
    )
    cap.position.y = headY + headR * 0.06
    cap.castShadow = true
    g.add(cap)
    const rand = makeRandom(99)
    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * Math.PI * 2
      const tuft = sphere(headR * range(rand, 0.26, 0.42), hair, 8)
      tuft.position.set(
        Math.cos(a) * headR * range(rand, 0.7, 1.0),
        headY + headR * range(rand, 0.5, 0.95),
        Math.sin(a) * headR * range(rand, 0.7, 1.0),
      )
      g.add(tuft)
    }
    // 额前的一缕
    const fringe = sphere(headR * 0.34, hair, 8)
    fringe.position.set(headR * 0.2, headY + headR * 0.62, headR * 0.82)
    fringe.scale.set(1.3, 0.7, 0.8)
    g.add(fringe)
  } else if (hs === 'crown') {
    const hairCap = new THREE.Mesh(
      new THREE.SphereGeometry(headR * 1.05, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.55),
      matte(hair),
    )
    hairCap.position.y = headY + headR * 0.05
    g.add(hairCap)
    const band = cyl(headR * 1.12, headR * 1.12, headR * 0.28, PALETTE.gold, 16)
    band.position.y = headY + headR * 0.62
    g.add(band)
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2
      const point = cone(headR * 0.16, headR * 0.42, PALETTE.gold, 5)
      point.position.set(Math.cos(a) * headR * 1.05, headY + headR * 0.95, Math.sin(a) * headR * 1.05)
      g.add(point)
      if (i % 2 === 0) {
        const gem = sphere(headR * 0.1, PALETTE.roseRed, 7)
        gem.position.set(Math.cos(a) * headR * 1.14, headY + headR * 0.62, Math.sin(a) * headR * 1.14)
        g.add(gem)
      }
    }
    // 胡���
    const beard = sphere(headR * 0.85, PALETTE.cloud, 12)
    beard.position.set(0, headY - headR * 0.5, headR * 0.25)
    beard.scale.set(1, 0.85, 0.9)
    g.add(beard)
  } else if (hs === 'helmet') {
    const helm = sphere(headR * 1.12, PALETTE.iron, 14)
    helm.position.y = headY + headR * 0.1
    helm.scale.y = 1.1
    g.add(helm)
    const nasal = box(headR * 0.14, headR * 0.8, headR * 0.14, PALETTE.iron)
    nasal.position.set(0, headY + headR * 0.05, headR * 1.0)
    g.add(nasal)
    const brim = cyl(headR * 1.2, headR * 1.2, headR * 0.14, PALETTE.ironDark, 16)
    brim.position.y = headY + headR * 0.42
    g.add(brim)
    const plume = cone(headR * 0.2, headR * 0.85, opts.trim ?? PALETTE.bannerRed, 8)
    plume.position.y = headY + headR * 1.5
    g.add(plume)
    // 护颈
    const aventail = new THREE.Mesh(
      new THREE.CylinderGeometry(headR * 1.05, headR * 1.15, headR * 0.5, 14, 1, true),
      matte(PALETTE.ironDark),
    )
    aventail.position.y = headY - headR * 0.55
    g.add(aventail)
  } else if (hs === 'hood') {
    const hood = new THREE.Mesh(
      new THREE.SphereGeometry(headR * 1.25, 14, 12, 0, Math.PI * 2, 0, Math.PI * 0.72),
      matte(opts.robe),
    )
    hood.position.y = headY + headR * 0.05
    hood.castShadow = true
    g.add(hood)
    const hoodBack = sphere(headR * 0.9, opts.robe, 12)
    hoodBack.position.set(0, headY - headR * 0.35, -headR * 0.55)
    hoodBack.scale.set(1.1, 1.2, 0.9)
    g.add(hoodBack)
  } else if (hs === 'cap') {
    const hairCap = new THREE.Mesh(
      new THREE.SphereGeometry(headR * 1.04, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.5),
      matte(hair),
    )
    hairCap.position.y = headY + headR * 0.05
    g.add(hairCap)
    const cap = new THREE.Mesh(
      new THREE.SphereGeometry(headR * 1.14, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.5),
      matte(opts.trim ?? PALETTE.bannerBlue),
    )
    cap.position.y = headY + headR * 0.3
    g.add(cap)
    const brim = cyl(headR * 1.25, headR * 1.25, headR * 0.1, opts.trim ?? PALETTE.bannerBlue, 16)
    brim.position.y = headY + headR * 0.34
    g.add(brim)
  } else if (hs === 'beret') {
    const hairCap = new THREE.Mesh(
      new THREE.SphereGeometry(headR * 1.04, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.5),
      matte(hair),
    )
    hairCap.position.y = headY + headR * 0.05
    g.add(hairCap)
    const beret = cyl(headR * 1.15, headR * 0.95, headR * 0.3, opts.trim ?? PALETTE.bannerRed, 14)
    beret.position.y = headY + headR * 0.72
    beret.rotation.z = 0.18
    g.add(beret)
  } else if (hs === 'bun') {
    const hairCap = new THREE.Mesh(
      new THREE.SphereGeometry(headR * 1.08, 14, 12, 0, Math.PI * 2, 0, Math.PI * 0.66),
      matte(hair),
    )
    hairCap.position.y = headY + headR * 0.04
    g.add(hairCap)
    const bun = sphere(headR * 0.45, hair, 10)
    bun.position.set(0, headY + headR * 0.55, -headR * 0.85)
    g.add(bun)
    for (const sx of [-1, 1]) {
      const sideHair = sphere(headR * 0.28, hair, 8)
      sideHair.position.set(sx * headR * 0.92, headY - headR * 0.1, headR * 0.1)
      sideHair.scale.set(0.6, 1.3, 1)
      g.add(sideHair)
    }
  } else if (hs === 'coif') {
    // 修士头巾
    const coif = new THREE.Mesh(
      new THREE.SphereGeometry(headR * 1.1, 14, 12, 0, Math.PI * 2, 0, Math.PI * 0.6),
      matte(PALETTE.cookApron),
    )
    coif.position.y = headY + headR * 0.05
    g.add(coif)
    const tonsure = sphere(headR * 0.5, hair, 10)
    tonsure.position.y = headY + headR * 0.72
    tonsure.scale.y = 0.35
    g.add(tonsure)
  } else {
    const hairCap = new THREE.Mesh(
      new THREE.SphereGeometry(headR * 1.05, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.55),
      matte(hair),
    )
    hairCap.position.y = headY + headR * 0.05
    g.add(hairCap)
  }

  // ---- 手持物 ----
  const props = opts.props ?? []
  props.forEach((prop, idx) => {
    const side = idx === 0 ? 1 : -1
    const handPos = new THREE.Vector3(side * h * 0.135, bodyH * 0.86 - armLen, 0)
    if (pose === 'point' && side > 0) handPos.set(side * h * 0.34, bodyH * 0.95, -h * 0.06)
    if (pose === 'read') handPos.set(side * h * 0.1, bodyH * 0.62, h * 0.2)
    const p = buildProp(prop, h)
    p.position.copy(handPos)
    g.add(p)
  })

  g.userData.anim = {
    pose,
    phase: Math.random() * 6.28,
    arms,
    head,
    height: h,
    baseY: 0,
  }
  return g
}

function buildProp(prop: Prop, h: number): THREE.Group {
  const g = new THREE.Group()
  switch (prop) {
    case 'halberd': {
      const shaft = cyl(h * 0.028, h * 0.032, h * 1.5, PALETTE.wood, 7)
      shaft.position.y = h * 0.5
      g.add(shaft)
      const blade = box(h * 0.09, h * 0.34, h * 0.02, PALETTE.iron)
      blade.position.set(h * 0.06, h * 1.16, 0)
      g.add(blade)
      const spike = cone(h * 0.035, h * 0.2, PALETTE.iron, 6)
      spike.position.y = h * 1.34
      g.add(spike)
      const hook = box(h * 0.1, h * 0.05, h * 0.02, PALETTE.ironDark)
      hook.position.set(-h * 0.06, h * 1.05, 0)
      g.add(hook)
      const tassel = cone(h * 0.05, h * 0.16, PALETTE.bannerRed, 6)
      tassel.rotation.x = Math.PI
      tassel.position.y = h * 0.92
      g.add(tassel)
      break
    }
    case 'lantern': {
      const handle = torus(h * 0.06, h * 0.012, PALETTE.ironDark, 6, 12)
      handle.position.y = h * 0.06
      g.add(handle)
      const frame = cyl(h * 0.075, h * 0.09, h * 0.16, PALETTE.ironDark, 6)
      frame.position.y = -h * 0.06
      g.add(frame)
      const glowBox = box(h * 0.11, h * 0.13, h * 0.11, PALETTE.lantern)
      const m = glowBox.material as THREE.MeshLambertMaterial
      m.emissive = new THREE.Color(PALETTE.lantern)
      m.emissiveIntensity = 1.3
      glowBox.position.y = -h * 0.06
      glowBox.userData.lamp = true
      g.add(glowBox)
      const cap = cone(h * 0.1, h * 0.07, PALETTE.ironDark, 6)
      cap.position.y = h * 0.02
      g.add(cap)
      break
    }
    case 'scepter': {
      const rod = cyl(h * 0.025, h * 0.03, h * 0.7, PALETTE.gold, 8)
      rod.position.y = h * 0.2
      g.add(rod)
      const orb = sphere(h * 0.07, PALETTE.gold, 10)
      orb.position.y = h * 0.58
      g.add(orb)
      const crossV = box(h * 0.02, h * 0.12, h * 0.02, PALETTE.gold)
      crossV.position.y = h * 0.7
      g.add(crossV)
      const crossH = box(h * 0.08, h * 0.02, h * 0.02, PALETTE.gold)
      crossH.position.y = h * 0.72
      g.add(crossH)
      break
    }
    case 'book': {
      const cover = box(h * 0.2, h * 0.05, h * 0.26, PALETTE.bannerRed)
      g.add(cover)
      const pages = box(h * 0.18, h * 0.04, h * 0.24, PALETTE.cloud)
      pages.position.y = h * 0.035
      g.add(pages)
      const spine = box(h * 0.03, h * 0.07, h * 0.26, PALETTE.goldDark)
      spine.position.x = -h * 0.09
      g.add(spine)
      break
    }
    case 'broom': {
      const handle = cyl(h * 0.022, h * 0.026, h * 1.1, PALETTE.wood, 6)
      handle.position.y = h * 0.35
      g.add(handle)
      const head = cone(h * 0.11, h * 0.3, PALETTE.wheat, 9)
      head.rotation.x = Math.PI
      head.position.y = -h * 0.28
      g.add(head)
      const binding = cyl(h * 0.06, h * 0.06, h * 0.05, PALETTE.trunkDark, 8)
      binding.position.y = -h * 0.14
      g.add(binding)
      break
    }
    case 'hammer': {
      const handle = cyl(h * 0.025, h * 0.03, h * 0.5, PALETTE.wood, 7)
      handle.position.y = h * 0.1
      g.add(handle)
      const head = box(h * 0.16, h * 0.11, h * 0.1, PALETTE.ironDark)
      head.position.y = h * 0.36
      g.add(head)
      break
    }
    case 'lute': {
      const body = sphere(h * 0.16, PALETTE.wood, 12)
      body.scale.set(1, 0.55, 1.35)
      g.add(body)
      const neck = box(h * 0.05, h * 0.04, h * 0.34, PALETTE.woodDeep)
      neck.position.z = h * 0.3
      g.add(neck)
      const headstock = box(h * 0.07, h * 0.06, h * 0.08, PALETTE.woodDeep)
      headstock.position.z = h * 0.48
      g.add(headstock)
      for (let i = 0; i < 4; i++) {
        const string = box(h * 0.008, h * 0.008, h * 0.5, PALETTE.cloud)
        string.position.set(-h * 0.03 + i * h * 0.02, h * 0.09, h * 0.16)
        g.add(string)
      }
      break
    }
    case 'basket': {
      const body = cyl(h * 0.14, h * 0.11, h * 0.18, PALETTE.wheatDark, 12)
      g.add(body)
      const handle = torus(h * 0.13, h * 0.014, PALETTE.trunk, 6, 14, )
      handle.rotation.x = 0
      handle.position.y = h * 0.14
      g.add(handle)
      for (let i = 0; i < 4; i++) {
        const item = sphere(h * 0.05, pick(makeRandom(i + 5), [PALETTE.roseRed, PALETTE.leafAutumn, PALETTE.flowerYellow]), 7)
        item.position.set(range(makeRandom(i), -0.07, 0.07) * h, h * 0.11, range(makeRandom(i + 2), -0.07, 0.07) * h)
        g.add(item)
      }
      break
    }
    case 'shepherdCrook': {
      const shaft = cyl(h * 0.025, h * 0.03, h * 1.2, PALETTE.wood, 7)
      shaft.position.y = h * 0.4
      g.add(shaft)
      const hook = torus(h * 0.09, h * 0.025, PALETTE.wood, 6, 12, Math.PI * 1.3)
      hook.position.y = h * 1.02
      hook.rotation.z = -0.4
      g.add(hook)
      break
    }
    case 'quill': {
      const feather = cone(h * 0.05, h * 0.34, PALETTE.cloud, 7)
      feather.position.y = h * 0.12
      feather.rotation.z = 0.3
      g.add(feather)
      break
    }
    case 'key': {
      const ring = torus(h * 0.05, h * 0.012, PALETTE.goldDark, 6, 12)
      ring.position.y = h * 0.1
      g.add(ring)
      const shaft = cyl(h * 0.014, h * 0.014, h * 0.18, PALETTE.goldDark, 6)
      shaft.position.y = -h * 0.02
      g.add(shaft)
      const tooth = box(h * 0.06, h * 0.03, h * 0.02, PALETTE.goldDark)
      tooth.position.set(h * 0.03, -h * 0.1, 0)
      g.add(tooth)
      break
    }
    case 'pitchfork': {
      const shaft = cyl(h * 0.025, h * 0.03, h * 1.2, PALETTE.wood, 7)
      shaft.position.y = h * 0.4
      g.add(shaft)
      for (let i = 0; i < 3; i++) {
        const tine = cyl(h * 0.014, h * 0.018, h * 0.28, PALETTE.iron, 5)
        tine.position.set(-h * 0.05 + i * h * 0.05, h * 1.12, 0)
        g.add(tine)
      }
      break
    }
    case 'shield': {
      const shield = new THREE.Mesh(new THREE.CylinderGeometry(h * 0.2, h * 0.2, h * 0.04, 3), matte(PALETTE.bannerBlue))
      shield.rotation.x = Math.PI / 2
      shield.rotation.z = Math.PI
      shield.scale.y = 1.25
      g.add(shield)
      const boss = sphere(h * 0.05, PALETTE.gold, 8)
      boss.position.z = h * 0.03
      g.add(boss)
      break
    }
    case 'tray': {
      const tray = cyl(h * 0.17, h * 0.15, h * 0.03, PALETTE.goldDark, 14)
      g.add(tray)
      const goblet = cyl(h * 0.04, h * 0.055, h * 0.11, PALETTE.gold, 8)
      goblet.position.set(-h * 0.06, h * 0.07, 0)
      g.add(goblet)
      const jug = cyl(h * 0.06, h * 0.08, h * 0.14, PALETTE.rockDark, 9)
      jug.position.set(h * 0.06, h * 0.08, 0)
      g.add(jug)
      break
    }
    case 'hoe': {
      const shaft = cyl(h * 0.025, h * 0.03, h * 1.0, PALETTE.wood, 7)
      shaft.position.y = h * 0.3
      g.add(shaft)
      const blade = box(h * 0.16, h * 0.1, h * 0.02, PALETTE.iron)
      blade.position.set(0, h * 0.82, h * 0.06)
      blade.rotation.x = 0.5
      g.add(blade)
      break
    }
    case 'telescope': {
      const tube = cyl(h * 0.05, h * 0.07, h * 0.5, PALETTE.goldDark, 12)
      tube.rotation.x = Math.PI / 2.4
      g.add(tube)
      break
    }
  }
  return g
}

// ---------- 动物 ----------

export function buildFox(scale = 1): THREE.Group {
  const g = new THREE.Group()
  const fur = matte(PALETTE.foxFur)
  const light = matte(PALETTE.foxFurLight)
  const dark = matte(PALETTE.foxFurDark)

  // 身体（坐姿）
  const body = capsule(0.26, 0.24, PALETTE.foxFur, 12)
  body.position.y = 0.42
  body.rotation.x = 0.35
  body.castShadow = true
  g.add(body)
  const chest = sphere(0.22, PALETTE.foxFurLight, 12)
  chest.position.set(0, 0.42, 0.16)
  chest.scale.set(0.85, 1.1, 0.8)
  g.add(chest)

  // 头
  const head = sphere(0.24, PALETTE.foxFur, 14)
  head.position.set(0, 0.78, 0.1)
  head.scale.set(1, 0.92, 1.05)
  head.castShadow = true
  g.add(head)
  const muzzle = cone(0.13, 0.3, PALETTE.foxFurLight, 10)
  muzzle.rotation.x = Math.PI / 2
  muzzle.position.set(0, 0.72, 0.3)
  g.add(muzzle)
  const nose = sphere(0.05, '#4a4238', 8)
  nose.position.set(0, 0.73, 0.44)
  g.add(nose)
  for (const sx of [-1, 1]) {
    const eye = sphere(0.042, '#4a4238', 7)
    eye.position.set(sx * 0.11, 0.84, 0.26)
    g.add(eye)
    const ear = cone(0.1, 0.26, PALETTE.foxFurDark, 6)
    ear.position.set(sx * 0.14, 1.0, 0.02)
    ear.rotation.set(-0.1, 0, sx * 0.22)
    g.add(ear)
    const earInner = cone(0.055, 0.16, PALETTE.foxFurLight, 6)
    earInner.position.set(sx * 0.14, 0.98, 0.05)
    earInner.rotation.set(-0.1, 0, sx * 0.22)
    g.add(earInner)
    const cheek = sphere(0.11, PALETTE.foxFurLight, 9)
    cheek.position.set(sx * 0.17, 0.74, 0.16)
    cheek.scale.set(0.7, 1, 0.9)
    g.add(cheek)
  }

  // 前腿
  for (const sx of [-1, 1]) {
    const leg = capsule(0.065, 0.2, PALETTE.foxFurDark, 8)
    leg.position.set(sx * 0.13, 0.16, 0.2)
    g.add(leg)
    const paw = sphere(0.075, PALETTE.foxFurLight, 8)
    paw.position.set(sx * 0.13, 0.05, 0.24)
    paw.scale.y = 0.6
    g.add(paw)
  }

  // 大尾巴（白尖）
  const tail = new THREE.Group()
  const tailMain = capsule(0.14, 0.42, PALETTE.foxFur, 10)
  tailMain.rotation.x = 0.9
  tailMain.position.set(0, 0.16, -0.28)
  tail.add(tailMain)
  const tailTip = sphere(0.15, PALETTE.foxFurLight, 10)
  tailTip.position.set(0, 0.02, -0.52)
  tailTip.scale.set(1, 0.9, 1.2)
  tail.add(tailTip)
  g.add(tail)

  g.scale.setScalar(scale)
  g.userData.anim = { type: 'fox', phase: Math.random() * 6.28, tail, head }
  void fur
  void light
  void dark
  return g
}

export function buildSheep(scale = 1): THREE.Group {
  const g = new THREE.Group()
  const wool = sphere(0.42, PALETTE.sheepWool, 14)
  wool.position.y = 0.52
  wool.scale.set(1.25, 1, 1)
  wool.castShadow = true
  g.add(wool)
  const rand = makeRandom(77)
  for (let i = 0; i < 9; i++) {
    const a = (i / 9) * Math.PI * 2
    const puff = sphere(range(rand, 0.16, 0.26), PALETTE.sheepWool, 9)
    puff.position.set(Math.cos(a) * 0.36, 0.52 + range(rand, -0.14, 0.2), Math.sin(a) * 0.3)
    g.add(puff)
  }
  const head = sphere(0.2, PALETTE.skinShade, 12)
  head.position.set(0, 0.56, 0.5)
  head.scale.set(0.85, 1.1, 1)
  head.castShadow = true
  g.add(head)
  const fringe = sphere(0.17, PALETTE.sheepWool, 10)
  fringe.position.set(0, 0.72, 0.42)
  fringe.scale.set(1.1, 0.7, 0.9)
  g.add(fringe)
  for (const sx of [-1, 1]) {
    const ear = sphere(0.08, PALETTE.skinShade, 8)
    ear.position.set(sx * 0.19, 0.6, 0.42)
    ear.scale.set(1.4, 0.5, 0.8)
    g.add(ear)
    const eye = sphere(0.035, '#4a4238', 6)
    eye.position.set(sx * 0.09, 0.6, 0.66)
    g.add(eye)
    for (const [lx, lz] of [
      [sx * 0.2, 0.24],
      [sx * 0.2, -0.24],
    ]) {
      const leg = capsule(0.06, 0.24, PALETTE.skinShade, 7)
      leg.position.set(lx, 0.18, lz)
      g.add(leg)
      const hoof = cyl(0.065, 0.06, 0.08, PALETTE.trunkDark, 7)
      hoof.position.set(lx, 0.04, lz)
      g.add(hoof)
    }
  }
  g.scale.setScalar(scale)
  g.userData.anim = { type: 'graze', phase: Math.random() * 6.28, head }
  return g
}

export function buildHorse(scale = 1): THREE.Group {
  const g = new THREE.Group()
  const body = capsule(0.34, 0.7, PALETTE.horseBody, 14)
  body.rotation.z = Math.PI / 2
  body.position.y = 1.05
  body.castShadow = true
  g.add(body)
  const chest = sphere(0.34, PALETTE.horseBody, 12)
  chest.position.set(0, 1.05, 0.42)
  chest.scale.set(0.85, 1, 1)
  g.add(chest)
  const rump = sphere(0.34, PALETTE.horseBody, 12)
  rump.position.set(0, 1.05, -0.42)
  rump.scale.set(0.85, 1, 1)
  g.add(rump)

  // 颈与头
  const neckGroup = new THREE.Group()
  const neck = capsule(0.17, 0.42, PALETTE.horseBody, 12)
  neck.position.y = 0.28
  neck.rotation.x = -0.35
  neckGroup.add(neck)
  const head = capsule(0.14, 0.3, PALETTE.horseBody, 12)
  head.position.set(0, 0.6, 0.16)
  head.rotation.x = Math.PI / 2.4
  neckGroup.add(head)
  const muzzle = sphere(0.13, PALETTE.skinShade, 10)
  muzzle.position.set(0, 0.56, 0.36)
  muzzle.scale.set(0.9, 0.8, 1.2)
  neckGroup.add(muzzle)
  for (const sx of [-1, 1]) {
    const ear = cone(0.06, 0.17, PALETTE.horseBody, 6)
    ear.position.set(sx * 0.09, 0.78, 0.02)
    ear.rotation.z = sx * 0.2
    neckGroup.add(ear)
    const eye = sphere(0.04, '#3d352c', 7)
    eye.position.set(sx * 0.11, 0.68, 0.16)
    neckGroup.add(eye)
  }
  // 鬃毛
  for (let i = 0; i < 7; i++) {
    const mane = box(0.06, 0.24, 0.1, PALETTE.horseMane)
    mane.position.set(0, 0.16 + i * 0.09, -0.14 - i * 0.01)
    mane.rotation.x = -0.4
    neckGroup.add(mane)
  }
  const forelock = box(0.07, 0.2, 0.09, PALETTE.horseMane)
  forelock.position.set(0, 0.76, 0.08)
  neckGroup.add(forelock)
  neckGroup.position.set(0, 1.2, 0.5)
  g.add(neckGroup)

  // 腿
  const legs: THREE.Object3D[] = []
  for (const sx of [-1, 1]) {
    for (const sz of [0.4, -0.4]) {
      const legPivot = new THREE.Group()
      legPivot.position.set(sx * 0.2, 0.85, sz)
      const upper = capsule(0.09, 0.34, PALETTE.horseBody, 8)
      upper.position.y = -0.24
      legPivot.add(upper)
      const lower = capsule(0.07, 0.3, PALETTE.horseBody, 8)
      lower.position.y = -0.62
      legPivot.add(lower)
      const hoof = cyl(0.09, 0.085, 0.12, PALETTE.trunkDark, 8)
      hoof.position.y = -0.83
      legPivot.add(hoof)
      g.add(legPivot)
      legs.push(legPivot)
    }
  }

  // 尾巴
  const tail = new THREE.Group()
  for (let i = 0; i < 5; i++) {
    const strand = capsule(0.05, 0.3, PALETTE.horseMane, 6)
    strand.position.set(range(makeRandom(i), -0.08, 0.08), -0.2 - i * 0.05, -0.05)
    strand.rotation.x = 0.25
    tail.add(strand)
  }
  tail.position.set(0, 1.25, -0.68)
  tail.rotation.x = 0.5
  g.add(tail)

  // 鞍与缰绳
  const saddle = box(0.5, 0.14, 0.62, PALETTE.bannerRed)
  saddle.position.set(0, 1.42, -0.05)
  g.add(saddle)
  const saddleBlanket = box(0.56, 0.06, 0.78, PALETTE.bannerGold)
  saddleBlanket.position.set(0, 1.36, -0.05)
  g.add(saddleBlanket)
  const bridle = torus(0.15, 0.022, PALETTE.woodDeep, 6, 14)
  bridle.position.set(0, 1.76, 0.82)
  bridle.rotation.y = Math.PI / 2
  g.add(bridle)

  g.scale.setScalar(scale)
  g.userData.anim = { type: 'horse', phase: Math.random() * 6.28, legs, tail, neck: neckGroup }
  return g
}

export function buildBird(scale = 1, color: string = PALETTE.birdBody): THREE.Group {
  const g = new THREE.Group()
  const body = capsule(0.11, 0.16, color, 10)
  body.rotation.x = Math.PI / 2
  body.castShadow = false
  g.add(body)
  const head = sphere(0.1, color, 10)
  head.position.set(0, 0.06, 0.17)
  g.add(head)
  const beak = cone(0.04, 0.13, PALETTE.flowerYellow, 6)
  beak.rotation.x = Math.PI / 2
  beak.position.set(0, 0.04, 0.29)
  g.add(beak)
  const tailFan = cone(0.1, 0.22, PALETTE.birdWing, 5)
  tailFan.rotation.x = -Math.PI / 2.3
  tailFan.position.set(0, 0.03, -0.24)
  g.add(tailFan)
  for (const sx of [-1, 1]) {
    const eye = sphere(0.022, '#3d352c', 6)
    eye.position.set(sx * 0.07, 0.09, 0.22)
    g.add(eye)
  }
  const wings: THREE.Object3D[] = []
  for (const sx of [-1, 1]) {
    const pivot = new THREE.Group()
    pivot.position.set(sx * 0.09, 0.04, 0)
    const wing = sphere(0.22, PALETTE.birdWing, 10)
    wing.scale.set(1.15, 0.1, 0.5)
    wing.position.set(sx * 0.2, 0, -0.02)
    pivot.add(wing)
    g.add(pivot)
    wings.push(pivot)
  }
  g.scale.setScalar(scale)
  g.userData.anim = { type: 'bird', phase: Math.random() * 6.28, wings }
  return g
}

export function buildButterfly(scale = 1): THREE.Group {
  const g = new THREE.Group()
  const body = capsule(0.03, 0.1, '#6b5f52', 6)
  body.rotation.x = Math.PI / 2
  g.add(body)
  const colors = [PALETTE.flowerYellow, PALETTE.rosePink, PALETTE.flowerBlue, PALETTE.cloud]
  const col = pick(makeRandom(Math.floor(scale * 100) + 3), colors)
  const wings: THREE.Object3D[] = []
  for (const sx of [-1, 1]) {
    const pivot = new THREE.Group()
    pivot.position.set(sx * 0.03, 0, 0)
    for (const [r, ox, oy] of [
      [0.11, 0.09, 0.04],
      [0.08, 0.08, -0.07],
    ] as [number, number, number][]) {
      const w = new THREE.Mesh(new THREE.CircleGeometry(r, 10), uniqueMatte(col, { side: THREE.DoubleSide }))
      w.position.set(sx * ox, oy, 0)
      pivot.add(w)
    }
    g.add(pivot)
    wings.push(pivot)
  }
  g.scale.setScalar(scale)
  g.userData.anim = { type: 'butterfly', phase: Math.random() * 6.28, wings }
  return g
}

// ---------- 玫瑰（玻璃罩下的那一朵）----------

export function buildTheRose(): THREE.Group {
  const g = new THREE.Group()
  g.name = 'the-rose'

  // 小花坛
  const bed = cyl(1.1, 1.25, 0.4, PALETTE.stoneMid, 18)
  bed.position.y = 0.2
  bed.castShadow = true
  bed.receiveShadow = true
  g.add(bed)
  const soil = cyl(0.95, 0.95, 0.1, PALETTE.dirt, 18)
  soil.position.y = 0.42
  g.add(soil)
  const rim = torus(1.12, 0.1, PALETTE.stoneDark, 8, 24)
  rim.rotation.x = Math.PI / 2
  rim.position.y = 0.42
  g.add(rim)

  // 茎与叶
  const stemPts = [
    new THREE.Vector3(0, 0.45, 0),
    new THREE.Vector3(0.06, 0.85, 0.03),
    new THREE.Vector3(-0.04, 1.25, -0.02),
    new THREE.Vector3(0.02, 1.6, 0.01),
  ]
  const stemCurve = new THREE.CatmullRomCurve3(stemPts)
  const stem = new THREE.Mesh(new THREE.TubeGeometry(stemCurve, 14, 0.045, 7, false), matte(PALETTE.leafDark))
  stem.castShadow = true
  g.add(stem)
  for (let i = 0; i < 4; i++) {
    const t = 0.25 + i * 0.18
    const p = stemCurve.getPoint(t)
    const leaf = sphere(0.19, PALETTE.leaf, 9)
    leaf.position.set(p.x + (i % 2 ? 0.2 : -0.2), p.y, p.z)
    leaf.scale.set(1.5, 0.35, 0.9)
    leaf.rotation.z = i % 2 ? -0.35 : 0.35
    g.add(leaf)
  }
  // 刺
  for (let i = 0; i < 5; i++) {
    const t = 0.2 + i * 0.15
    const p = stemCurve.getPoint(t)
    const thorn = cone(0.03, 0.11, PALETTE.leafDark, 5)
    thorn.position.set(p.x + 0.06, p.y, p.z)
    thorn.rotation.z = -Math.PI / 2.4
    g.add(thorn)
  }

  // 花朵：四层花瓣
  const flower = new THREE.Group()
  const petalLayers = [
    { r: 0.34, count: 7, color: PALETTE.roseRed, y: 0, tilt: 0.9 },
    { r: 0.27, count: 6, color: PALETTE.roseRed, y: 0.09, tilt: 0.6 },
    { r: 0.19, count: 5, color: PALETTE.rosePink, y: 0.17, tilt: 0.35 },
    { r: 0.11, count: 4, color: PALETTE.rosePink, y: 0.24, tilt: 0.15 },
  ]
  for (const layer of petalLayers) {
    for (let i = 0; i < layer.count; i++) {
      const a = (i / layer.count) * Math.PI * 2 + layer.r
      const petal = new THREE.Mesh(
        new THREE.SphereGeometry(layer.r * 0.62, 10, 8, 0, Math.PI * 2, 0, Math.PI / 2),
        matte(layer.color),
      )
      petal.position.set(Math.cos(a) * layer.r * 0.55, layer.y, Math.sin(a) * layer.r * 0.55)
      petal.rotation.set(0, -a, layer.tilt)
      petal.scale.set(1, 0.5, 1.3)
      petal.castShadow = true
      flower.add(petal)
    }
  }
  const heart = sphere(0.09, PALETTE.flowerYellow, 9)
  heart.position.y = 0.28
  flower.add(heart)
  flower.position.set(0.02, 1.62, 0.01)
  g.add(flower)
  g.userData.rose = flower

  // 玻璃罩
  const dome = new THREE.Mesh(new THREE.SphereGeometry(1.0, 22, 16, 0, Math.PI * 2, 0, Math.PI / 2), glass())
  dome.position.y = 0.45
  dome.scale.y = 1.5
  g.add(dome)
  const domeRim = torus(1.0, 0.06, PALETTE.gold, 8, 26)
  domeRim.rotation.x = Math.PI / 2
  domeRim.position.y = 0.46
  g.add(domeRim)
  const domeKnob = sphere(0.1, PALETTE.gold, 10)
  domeKnob.position.y = 1.98
  g.add(domeKnob)

  return g
}

// ---------- 场景人物布置 ----------

export interface CharacterRig {
  group: THREE.Group
  /** 需要每帧驱动的对象 */
  walkers: { obj: THREE.Group; path: THREE.Vector3[]; speed: number; t: number }[]
  birds: { obj: THREE.Group; radius: number; height: number; speed: number; phase: number; tilt: number }[]
  butterflies: { obj: THREE.Group; center: THREE.Vector3; radius: number; speed: number; phase: number }[]
}

function keepLocal(x: number, y: number, z: number): THREE.Vector3 {
  // 主堡在城堡内的位置是 (0, CASTLE_Y, -4)
  return new THREE.Vector3(x, CASTLE_Y + y, z - 4)
}

export function buildCharacters(): CharacterRig {
  const group = new THREE.Group()
  group.name = 'characters'
  const rand = makeRandom(24680)
  const walkers: CharacterRig['walkers'] = []
  const birds: CharacterRig['birds'] = []
  const butterflies: CharacterRig['butterflies'] = []

  // ===== 小王子与狐狸：岛东侧的小丘上，望着玫瑰 =====
  const hillX = 30
  const hillZ = 8
  const hillY = groundY(hillX, hillZ)
  const mound = sphere(4.2, PALETTE.grass, 18)
  mound.position.set(hillX, hillY - 2.6, hillZ)
  mound.scale.set(1, 0.5, 1)
  mound.receiveShadow = true
  mound.castShadow = true
  group.add(mound)
  const moundTopY = groundY(hillX, hillZ) + 0.35

  const prince = buildFigure({
    height: 1.35,
    robe: PALETTE.princeCoat,
    trim: PALETTE.princeScarf,
    hair: PALETTE.princeHair,
    hairStyle: 'prince',
    robed: false,
    belt: PALETTE.goldDark,
    pose: 'stand',
  })
  // 围巾
  const scarf = new THREE.Mesh(
    new THREE.TorusGeometry(0.13, 0.055, 8, 16),
    matte(PALETTE.princeScarf),
  )
  scarf.rotation.x = Math.PI / 2
  scarf.position.y = 1.02
  prince.add(scarf)
  const scarfTail = new THREE.Mesh(
    new THREE.PlaneGeometry(0.16, 0.62, 2, 5),
    new THREE.MeshLambertMaterial({ color: new THREE.Color(PALETTE.princeScarf), side: THREE.DoubleSide }),
  )
  scarfTail.position.set(0.1, 0.78, -0.12)
  scarfTail.userData.wave = { segX: 2, segY: 5, clothW: 0.16, base: (scarfTail.geometry.attributes.position.array as Float32Array).slice() }
  prince.add(scarfTail)
  // 靴子
  for (const sx of [-1, 1]) {
    const boot = box(0.13, 0.2, 0.2, PALETTE.princeBoots)
    boot.position.set(sx * 0.1, 0.1, 0.02)
    prince.add(boot)
  }
  prince.position.set(hillX - 0.7, moundTopY, hillZ + 0.4)
  prince.rotation.y = Math.atan2(6 - hillX, 20 - hillZ)
  group.add(prince)

  const fox = buildFox(1.05)
  fox.position.set(hillX + 0.75, moundTopY, hillZ + 0.9)
  fox.rotation.y = Math.atan2(6 - hillX, 20 - hillZ) - 0.3
  group.add(fox)

  // 玻璃罩里的玫瑰，就在他们身旁
  const rose = buildTheRose()
  rose.position.set(hillX + 0.2, moundTopY - 0.1, hillZ - 1.5)
  rose.rotation.y = 0.6
  group.add(rose)

  // 小丘上的小草与花
  for (let i = 0; i < 22; i++) {
    const a = rand() * Math.PI * 2
    const d = range(rand, 1.6, 3.8)
    const x = hillX + Math.cos(a) * d
    const z = hillZ + Math.sin(a) * d
    const tuft = cone(0.14, 0.45, PALETTE.grassDark, 4)
    tuft.position.set(x, moundTopY - 0.5 + Math.abs(3.8 - d) * 0.12, z)
    group.add(tuft)
    if (rand() > 0.6) {
      const bloom = sphere(0.1, pick(rand, [PALETTE.flowerYellow, PALETTE.rosePink, PALETTE.flowerBlue]), 7)
      bloom.position.set(x, moundTopY - 0.2, z)
      group.add(bloom)
    }
  }

  // ===== 国王：大厅王座上 =====
  const king = buildFigure({
    height: 1.8,
    robe: PALETTE.kingRobe,
    trim: PALETTE.kingRobeTrim,
    hair: PALETTE.cloud,
    hairStyle: 'crown',
    cape: PALETTE.bannerRed,
    belt: PALETTE.gold,
    props: ['scepter'],
    pose: 'sit',
  })
  king.position.copy(keepLocal(0, KEEP.levels[1].y0 + 0.96 + 0.12, -5.5))
  king.rotation.y = Math.PI
  group.add(king)

  // 大厅里的侍从与乐师
  const courtier = buildFigure({
    height: 1.72,
    robe: PALETTE.bannerBlue,
    trim: PALETTE.bannerGold,
    hairStyle: 'cap',
    hair: PALETTE.trunkDark,
    cape: PALETTE.bannerBlue,
    belt: PALETTE.goldDark,
    props: ['book'],
    pose: 'stand',
  })
  courtier.position.copy(keepLocal(-2.4, KEEP.levels[1].y0 + 0.12, -3.6))
  courtier.rotation.y = Math.PI * 0.9
  group.add(courtier)

  const minstrel = buildFigure({
    height: 1.68,
    robe: PALETTE.leafDark,
    trim: PALETTE.bannerGold,
    hairStyle: 'beret',
    hair: PALETTE.trunk,
    belt: PALETTE.woodDeep,
    props: ['lute'],
    pose: 'sit',
    robed: false,
  })
  minstrel.position.copy(keepLocal(-3.4, KEEP.levels[1].y0 + 3.32, GALLERY_Z))
  minstrel.rotation.y = Math.PI
  group.add(minstrel)

  const minstrel2 = buildFigure({
    height: 1.66,
    robe: PALETTE.bannerRed,
    trim: PALETTE.cloud,
    hairStyle: 'cap',
    hair: PALETTE.trunkDark,
    robed: false,
    belt: PALETTE.woodDeep,
    pose: 'sit',
  })
  minstrel2.position.copy(keepLocal(0.6, KEEP.levels[1].y0 + 3.32, GALLERY_Z))
  minstrel2.rotation.y = Math.PI
  group.add(minstrel2)

  // 大厅长桌旁的宾客
  for (let i = 0; i < 6; i++) {
    const sx = i < 3 ? -2.9 : 2.9
    const guest = buildFigure({
      height: range(rand, 1.62, 1.78),
      robe: pick(rand, [PALETTE.bannerBlue, PALETTE.bannerRed, PALETTE.leafDark, PALETTE.kingRobe, PALETTE.trunk]),
      trim: PALETTE.cloud,
      hairStyle: pick(rand, ['cap', 'beret', 'bun', 'coif'] as const),
      hair: pick(rand, [PALETTE.trunkDark, PALETTE.trunk, PALETTE.cloud, PALETTE.princeHair]),
      robed: false,
      belt: PALETTE.woodDeep,
      pose: 'sit',
      props: rand() > 0.6 ? ['tray'] : [],
    })
    guest.position.copy(keepLocal(sx + (i % 3 - 1) * 1.9, KEEP.levels[1].y0 + 0.12, 1.6 + (i % 2 ? 0.95 : -0.95)))
    guest.rotation.y = i % 2 ? Math.PI : 0
    group.add(guest)
  }

  // ===== 天文学家：天文台，俯身看望远镜 =====
  const astronomer = buildFigure({
    height: 1.74,
    robe: PALETTE.skyNightMid,
    trim: PALETTE.bannerGold,
    hairStyle: 'bald',
    hair: PALETTE.cloud,
    belt: PALETTE.goldDark,
    cape: PALETTE.skyNightMid,
    pose: 'point',
    props: ['quill'],
  })
  // 星星纹样的斗篷点缀
  for (let i = 0; i < 8; i++) {
    const starDot = new THREE.Mesh(new THREE.CircleGeometry(0.045, 5), matte(PALETTE.star))
    const m = starDot.material as THREE.MeshLambertMaterial
    m.emissive = new THREE.Color(PALETTE.star)
    m.emissiveIntensity = 0.9
    starDot.position.set(range(rand, -0.16, 0.16), range(rand, 0.4, 1.0), -0.2)
    astronomer.add(starDot)
  }
  astronomer.position.copy(keepLocal(3.2, KEEP.levels[3].y0 + 0.1, -2.6))
  astronomer.rotation.y = -0.7 + Math.PI
  group.add(astronomer)

  // ===== 图书管理员 =====
  const librarian = buildFigure({
    height: 1.7,
    robe: PALETTE.monkRobe,
    trim: PALETTE.cookApron,
    hairStyle: 'coif',
    hair: PALETTE.trunkDark,
    belt: PALETTE.trunkDark,
    props: ['book'],
    pose: 'read',
  })
  librarian.position.copy(keepLocal(1.2, KEEP.levels[2].y0 + 0.1, 2.3))
  librarian.rotation.y = Math.PI
  group.add(librarian)

  // 议事厅的贵族
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + 0.6
    const noble = buildFigure({
      height: range(rand, 1.66, 1.8),
      robe: pick(rand, [PALETTE.bannerBlue, PALETTE.bannerRed, PALETTE.kingRobe, PALETTE.leafDark]),
      trim: PALETTE.bannerGold,
      hairStyle: pick(rand, ['cap', 'bun', 'beret'] as const),
      hair: pick(rand, [PALETTE.trunkDark, PALETTE.trunk, PALETTE.cloud]),
      cape: rand() > 0.5 ? PALETTE.bannerRed : undefined,
      belt: PALETTE.goldDark,
      pose: 'sit',
    })
    noble.position.copy(keepLocal(Math.cos(a) * 3.3, KEEP.levels[2].y0 + 0.1, -3.4 + Math.sin(a) * 3.3))
    noble.rotation.y = -a + Math.PI
    group.add(noble)
  }

  // ===== 侍女：卧室 =====
  const maid = buildFigure({
    height: 1.66,
    robe: PALETTE.maidDress,
    trim: PALETTE.cookApron,
    apron: PALETTE.cookApron,
    hairStyle: 'bun',
    hair: PALETTE.trunk,
    props: ['broom'],
    pose: 'stand',
  })
  maid.position.copy(keepLocal(-3.2, KEEP.levels[3].y0 + 0.1, 1.4))
  maid.rotation.y = 0.6
  group.add(maid)

  // ===== 厨师：地下室厨房 =====
  const cook = buildFigure({
    height: 1.72,
    robe: PALETTE.cookApron,
    trim: PALETTE.cloud,
    apron: PALETTE.cloud,
    hairStyle: 'cap',
    hair: PALETTE.trunkDark,
    belt: PALETTE.bannerRed,
    props: ['tray'],
    pose: 'stand',
    robed: false,
  })
  cook.position.copy(keepLocal(1.2 + 3.0, KEEP.levels[0].y0, -2.6))
  cook.rotation.y = Math.PI * 0.8
  group.add(cook)

  // ===== 狱卒：地牢 =====
  const jailer = buildFigure({
    height: 1.75,
    robe: PALETTE.ironDark,
    trim: PALETTE.rockDark,
    hairStyle: 'cap',
    hair: PALETTE.trunkDark,
    belt: PALETTE.trunkDark,
    props: ['key', 'lantern'],
    pose: 'stand',
    robed: false,
  })
  jailer.position.copy(keepLocal(-2.6, KEEP.levels[0].y0, 4.2))
  jailer.rotation.y = Math.PI * 0.5
  group.add(jailer)

  // ===== 点灯人：沿城墙步道巡逻（书里的第五颗星球）=====
  const lamplighter = buildFigure({
    height: 1.72,
    robe: PALETTE.roofSlateDark,
    trim: PALETTE.bannerGold,
    hairStyle: 'cap',
    hair: PALETTE.trunkDark,
    belt: PALETTE.ironDark,
    props: ['lantern'],
    pose: 'walk',
    robed: false,
    cape: PALETTE.roofSlate,
  })
  group.add(lamplighter)
  const walkY = CASTLE_Y + WALL.height + 0.34
  const wallPath: THREE.Vector3[] = []
  for (let k = 0; k < WALL.sides; k++) {
    const a = (Math.PI * 2 * (k + 0.5)) / WALL.sides - Math.PI / 8
    wallPath.push(new THREE.Vector3(Math.cos(a) * (APOTHEM + 0.4), walkY, Math.sin(a) * (APOTHEM + 0.4)))
  }
  walkers.push({ obj: lamplighter, path: wallPath, speed: 0.016, t: 0 })

  // ===== 卫兵 =====
  const guardSpots: { pos: THREE.Vector3; rot: number; patrol?: THREE.Vector3[] }[] = [
    // 城门两侧
    { pos: new THREE.Vector3(-3.2, CASTLE_Y, APOTHEM + 2.4), rot: 0 },
    { pos: new THREE.Vector3(3.2, CASTLE_Y, APOTHEM + 2.4), rot: 0 },
    // 吊桥外
    { pos: new THREE.Vector3(-2.4, CASTLE_Y, APOTHEM + 9.5), rot: 0 },
    { pos: new THREE.Vector3(2.4, CASTLE_Y, APOTHEM + 9.5), rot: 0 },
    // 主堡门前
    { pos: new THREE.Vector3(-2.6, CASTLE_Y, 3.6), rot: Math.PI },
    { pos: new THREE.Vector3(2.6, CASTLE_Y, 3.6), rot: Math.PI },
  ]
  guardSpots.forEach((spot, i) => {
    const guard = buildFigure({
      height: 1.78,
      robe: i % 2 ? PALETTE.guardTunic : PALETTE.guardTunicAlt,
      trim: PALETTE.cloud,
      hairStyle: 'helmet',
      hair: PALETTE.iron,
      belt: PALETTE.woodDeep,
      props: ['halberd', 'shield'],
      pose: 'stand',
      robed: false,
    })
    guard.position.copy(spot.pos)
    guard.rotation.y = spot.rot
    group.add(guard)
  })

  // 城墙上巡逻的卫兵（两名，走另外两段）
  for (let i = 0; i < 2; i++) {
    const patrolGuard = buildFigure({
      height: 1.76,
      robe: PALETTE.guardTunic,
      trim: PALETTE.cloud,
      hairStyle: 'helmet',
      hair: PALETTE.iron,
      belt: PALETTE.woodDeep,
      props: ['halberd'],
      pose: 'walk',
      robed: false,
    })
    group.add(patrolGuard)
    const path: THREE.Vector3[] = []
    for (let k = 0; k < 3; k++) {
      const side = (i * 3 + k + 4) % WALL.sides
      const a = (Math.PI * 2 * (side + 0.5)) / WALL.sides - Math.PI / 8
      path.push(new THREE.Vector3(Math.cos(a) * (APOTHEM + 0.4), walkY, Math.sin(a) * (APOTHEM + 0.4)))
    }
    path.push(path[0].clone())
    walkers.push({ obj: patrolGuard, path, speed: 0.03, t: i * 0.5 })
  }

  // ===== 铁匠 =====
  const smith = buildFigure({
    height: 1.8,
    robe: PALETTE.rockDark,
    trim: PALETTE.ironDark,
    apron: PALETTE.trunkDark,
    hairStyle: 'bald',
    hair: PALETTE.trunkDark,
    belt: PALETTE.woodDeep,
    props: ['hammer'],
    pose: 'point',
    robed: false,
  })
  smith.position.set(-11.4, CASTLE_Y, 6.6)
  smith.rotation.y = Math.PI * 0.6
  group.add(smith)

  // ===== 马夫与马 =====
  const stableHand = buildFigure({
    height: 1.68,
    robe: PALETTE.wheatDark,
    trim: PALETTE.cloud,
    hairStyle: 'cap',
    hair: PALETTE.trunk,
    belt: PALETTE.woodDeep,
    props: ['pitchfork'],
    pose: 'stand',
    robed: false,
  })
  stableHand.position.set(10.6, CASTLE_Y, 8.4)
  stableHand.rotation.y = -Math.PI * 0.4
  group.add(stableHand)

  const horse = buildHorse(1.0)
  horse.position.set(12.4, CASTLE_Y, 10.2)
  horse.rotation.y = -Math.PI * 0.65
  group.add(horse)

  const horse2 = buildHorse(0.92)
  horse2.position.set(14.6, CASTLE_Y, 8.0)
  horse2.rotation.y = -Math.PI * 0.9
  group.add(horse2)

  // ===== 绵羊圈（书里那只装在盒子里的羊，这里放养在草地上）=====
  const penX = 16
  const penZ = 26
  const penY = groundY(penX, penZ)
  const pen = new THREE.Group()
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2
    const post = cyl(0.09, 0.11, 1.1, PALETTE.wood, 7)
    post.position.set(Math.cos(a) * 4.2, 0.55, Math.sin(a) * 4.2)
    pen.add(post)
  }
  for (let r = 0; r < 2; r++) {
    const rail = torus(4.2, 0.055, PALETTE.woodDark, 6, 40)
    rail.rotation.x = Math.PI / 2
    rail.position.y = 0.4 + r * 0.45
    pen.add(rail)
  }
  // 小羊棚
  const shelter = new THREE.Group()
  const shelterBody = box(2.6, 1.6, 2.0, PALETTE.wood)
  shelterBody.position.y = 0.8
  shelter.add(shelterBody)
  const shelterRoof = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, 2.9, 3, 1, false), matte(PALETTE.roofRose))
  shelterRoof.rotation.z = Math.PI / 2
  shelterRoof.rotation.y = Math.PI / 2
  shelterRoof.scale.set(1, 1, 0.8)
  shelterRoof.position.y = 2.1
  shelterRoof.castShadow = true
  shelter.add(shelterRoof)
  const shelterDoor = box(1.0, 1.1, 0.1, PALETTE.woodDeep)
  shelterDoor.position.set(0, 0.55, 1.02)
  shelter.add(shelterDoor)
  shelter.position.set(0, 0, -2.4)
  pen.add(shelter)
  // 水槽与干草
  const trough = box(1.6, 0.4, 0.6, PALETTE.woodDark)
  trough.position.set(2.0, 0.2, 1.6)
  pen.add(trough)
  const hay = cyl(0.6, 0.7, 0.7, PALETTE.wheat, 10)
  hay.position.set(-2.2, 0.35, 1.4)
  pen.add(hay)
  pen.position.set(penX, penY, penZ)
  group.add(pen)

  for (let i = 0; i < 6; i++) {
    const a = rand() * Math.PI * 2
    const d = rand() * 2.8
    const sheep = buildSheep(range(rand, 0.8, 1.1))
    sheep.position.set(penX + Math.cos(a) * d, penY, penZ + Math.sin(a) * d)
    sheep.rotation.y = rand() * Math.PI * 2
    group.add(sheep)
  }
  // 牧羊人
  const shepherd = buildFigure({
    height: 1.7,
    robe: PALETTE.grassDark,
    trim: PALETTE.cloud,
    hairStyle: 'beret',
    hair: PALETTE.trunk,
    belt: PALETTE.woodDeep,
    props: ['shepherdCrook'],
    pose: 'stand',
    robed: false,
    cape: PALETTE.trunk,
  })
  shepherd.position.set(penX + 4.8, penY, penZ + 1.5)
  shepherd.rotation.y = -Math.PI * 0.6
  group.add(shepherd)

  // ===== 村民与农夫 =====
  const villagerSpots: [number, number][] = [
    [ZONES.village.x - 3, ZONES.village.z + 2],
    [ZONES.village.x + 4, ZONES.village.z - 1],
    [ZONES.village.x + 1, ZONES.village.z + 5],
    [ZONES.village.x - 5, ZONES.village.z - 4],
    [ZONES.farm.x + 3, ZONES.farm.z + 7],
    [ZONES.farm.x - 4, ZONES.farm.z + 2],
    [ZONES.roseGarden.x - 3, ZONES.roseGarden.z + 5],
    [-14, 30],
    [6, 32],
  ]
  for (const [vx, vz] of villagerSpots) {
    const vy = groundY(vx, vz)
    if (vy < ISLAND.waterLevel + 0.5) continue
    const isFarmer = Math.hypot(vx - ZONES.farm.x, vz - ZONES.farm.z) < ZONES.farm.r + 4
    const villager = buildFigure({
      height: range(rand, 1.58, 1.76),
      robe: pick(rand, [PALETTE.maidDress, PALETTE.bannerBlue, PALETTE.wheatDark, PALETTE.leafDark, PALETTE.monkRobe, PALETTE.roofRose]),
      trim: PALETTE.cloud,
      hairStyle: pick(rand, ['bun', 'cap', 'beret', 'coif', 'hood'] as const),
      hair: pick(rand, [PALETTE.trunkDark, PALETTE.trunk, PALETTE.princeHair, PALETTE.cloud]),
      apron: rand() > 0.6 ? PALETTE.cookApron : undefined,
      belt: PALETTE.woodDeep,
      props: isFarmer ? [pick(rand, ['hoe', 'pitchfork', 'basket'] as const)] : rand() > 0.6 ? ['basket'] : [],
      pose: rand() > 0.75 ? 'walk' : 'stand',
      robed: rand() > 0.4,
    })
    villager.position.set(vx, vy, vz)
    villager.rotation.y = rand() * Math.PI * 2
    group.add(villager)
    if (villager.userData.anim.pose === 'walk') {
      const path: THREE.Vector3[] = []
      for (let s = 0; s < 4; s++) {
        const a = rand() * Math.PI * 2
        const d = range(rand, 2, 5)
        const px = vx + Math.cos(a) * d
        const pz = vz + Math.sin(a) * d
        path.push(new THREE.Vector3(px, groundY(px, pz), pz))
      }
      path.push(path[0].clone())
      walkers.push({ obj: villager, path, speed: range(rand, 0.02, 0.045), t: rand() })
    }
  }

  // 湖边钓鱼的孩子
  const fisherKid = buildFigure({
    height: 1.3,
    robe: PALETTE.flowerBlue,
    trim: PALETTE.cloud,
    hairStyle: 'prince',
    hair: PALETTE.trunk,
    belt: PALETTE.woodDeep,
    pose: 'sit',
    robed: false,
  })
  const fkx = ZONES.lake.x + 9
  const fkz = ZONES.lake.z + 7
  fisherKid.position.set(fkx, groundY(fkx, fkz), fkz)
  fisherKid.rotation.y = Math.atan2(ZONES.lake.x - fkx, ZONES.lake.z - fkz)
  group.add(fisherKid)
  const rod = cyl(0.03, 0.02, 2.4, PALETTE.wood, 6)
  rod.position.set(fkx + 0.3, groundY(fkx, fkz) + 1.0, fkz - 0.6)
  rod.rotation.set(0.7, 0, 0.3)
  group.add(rod)

  // ===== 飞鸟 =====
  for (let i = 0; i < 11; i++) {
    const bird = buildBird(range(rand, 0.8, 1.4), pick(rand, [PALETTE.birdBody, PALETTE.cloud, PALETTE.birdWing, PALETTE.roseWhite]))
    group.add(bird)
    birds.push({
      obj: bird,
      radius: range(rand, 30, 78),
      height: range(rand, 22, 52),
      speed: range(rand, 0.06, 0.16) * (rand() > 0.5 ? 1 : -1),
      phase: rand() * Math.PI * 2,
      tilt: range(rand, -0.12, 0.12),
    })
  }
  // 鸽舍附近的鸽子
  for (let i = 0; i < 5; i++) {
    const dove = buildBird(range(rand, 0.6, 0.85), PALETTE.roseWhite)
    group.add(dove)
    birds.push({
      obj: dove,
      radius: range(rand, 6, 14),
      height: range(rand, 9, 15),
      speed: range(rand, 0.2, 0.35),
      phase: rand() * Math.PI * 2,
      tilt: range(rand, -0.2, 0.2),
    })
    dove.userData.orbitCenter = new THREE.Vector3(15, CASTLE_Y, 2)
  }

  // ===== 蝴蝶（玫瑰园与花丛间）=====
  for (let i = 0; i < 14; i++) {
    const bf = buildButterfly(range(rand, 0.8, 1.3))
    group.add(bf)
    const inRoseGarden = i < 7
    const cx = inRoseGarden ? ZONES.roseGarden.x + range(rand, -6, 6) : range(rand, -40, 40)
    const cz = inRoseGarden ? ZONES.roseGarden.z + range(rand, -6, 6) : range(rand, -40, 40)
    butterflies.push({
      obj: bf,
      center: new THREE.Vector3(cx, groundY(cx, cz) + range(rand, 1.0, 2.6), cz),
      radius: range(rand, 0.8, 2.6),
      speed: range(rand, 0.5, 1.3),
      phase: rand() * Math.PI * 2,
    })
  }

  return { group, walkers, birds, butterflies }
}
