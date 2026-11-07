import * as THREE from 'three'
import { PALETTE } from './palette'
import { makeRandom, pick, range } from './noise'
import { archDoor, box, cone, conicalRoof, crenellations, cyl, flag, matte, pyramidRoof, uniqueMatte } from './materials'
import { buildKeep } from './interior'

/** 城堡基准面：高原上再砌一圈石台，所有建筑都以这个高度为地面。 */
export const CASTLE_Y = 2.8

/** 八角形城墙的几何参数。 */
const WALL = {
  sides: 8,
  circumR: 22,
  height: 6.4,
  thickness: 1.8,
  phase: -Math.PI / 8,
  gateSide: 2,
}
const APOTHEM = WALL.circumR * Math.cos(Math.PI / WALL.sides)
const SIDE_LEN = 2 * WALL.circumR * Math.sin(Math.PI / WALL.sides)

/** 透视模式下需要处理的对象。 */
export interface XRayTargets {
  /** 变为半透明的材质（城墙、主堡石墙） */
  fade: THREE.Material[]
  /** 完全隐藏的对象（各类屋顶、天花板） */
  hide: THREE.Object3D[]
}

function sideAngle(k: number): number {
  return (Math.PI * 2 * (k + 0.5)) / WALL.sides + WALL.phase
}

function vertexAngle(k: number): number {
  return (Math.PI * 2 * k) / WALL.sides + WALL.phase
}

/** 让墙段的局部 -Z 指向城外。 */
function orientToSide(obj: THREE.Object3D, sideAngleRad: number, radius: number): void {
  const a = sideAngleRad
  obj.position.set(Math.cos(a) * radius, CASTLE_Y, Math.sin(a) * radius)
  obj.rotation.y = Math.atan2(-Math.cos(a), -Math.sin(a))
}

// ---------- 石台 ----------

function buildPlatform(xray: XRayTargets): THREE.Group {
  const g = new THREE.Group()
  g.name = 'castle-platform'

  const top = new THREE.Mesh(
    new THREE.CylinderGeometry(WALL.circumR + 2.6, WALL.circumR + 3.4, 1.2, 64),
    matte(PALETTE.stoneMid),
  )
  top.position.y = CASTLE_Y - 0.6
  top.receiveShadow = true
  top.castShadow = true
  g.add(top)

  // 台基外圈的砌石纹理：一圈交替深浅的石块
  const rand = makeRandom(2024)
  const courseGeo = new THREE.BoxGeometry(1.5, 0.55, 0.5)
  const count = 150
  const courses = new THREE.InstancedMesh(courseGeo, matte(PALETTE.stoneDark), count)
  const m = new THREE.Matrix4()
  const q = new THREE.Quaternion()
  const e = new THREE.Euler()
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2
    const r = WALL.circumR + 3.15
    e.set(0, -a, 0)
    q.setFromEuler(e)
    const s = range(rand, 0.85, 1.15)
    m.compose(new THREE.Vector3(Math.cos(a) * r, CASTLE_Y - 0.95, Math.sin(a) * r), q, new THREE.Vector3(s, 1, 1))
    courses.setMatrixAt(i, m)
  }
  courses.instanceMatrix.needsUpdate = true
  courses.castShadow = true
  courses.receiveShadow = true
  g.add(courses)

  // 台基下方的护坡
  const slope = new THREE.Mesh(
    new THREE.CylinderGeometry(WALL.circumR + 3.4, WALL.circumR + 6.5, 2.6, 48),
    matte(PALETTE.rockDark),
  )
  slope.position.y = CASTLE_Y - 2.4
  slope.receiveShadow = true
  g.add(slope)

  // 庭院地面：石板铺装
  const yard = new THREE.Mesh(
    new THREE.CircleGeometry(WALL.circumR - 0.6, 56).rotateX(-Math.PI / 2),
    matte(PALETTE.stone),
  )
  yard.position.y = CASTLE_Y + 0.02
  yard.receiveShadow = true
  g.add(yard)

  // 庭院中央的放射状拼花
  const inlay = new THREE.Mesh(
    new THREE.RingGeometry(4.2, 6.4, 40).rotateX(-Math.PI / 2),
    matte(PALETTE.stoneMid),
  )
  inlay.position.set(0, CASTLE_Y + 0.04, 5)
  inlay.receiveShadow = true
  g.add(inlay)
  const inlay2 = new THREE.Mesh(
    new THREE.RingGeometry(1.4, 2.6, 32).rotateX(-Math.PI / 2),
    matte(PALETTE.stoneDark),
  )
  inlay2.position.set(0, CASTLE_Y + 0.05, 5)
  g.add(inlay2)

  void xray
  return g
}

// ---------- 城墙段 ----------

function buildWallSegment(length: number, xray: XRayTargets): THREE.Group {
  const g = new THREE.Group()
  const H = WALL.height
  const T = WALL.thickness

  const wallMat = new THREE.MeshLambertMaterial({ color: new THREE.Color(PALETTE.stone) })
  xray.fade.push(wallMat)

  const body = new THREE.Mesh(new THREE.BoxGeometry(length, H, T), wallMat)
  body.position.y = H / 2
  body.castShadow = true
  body.receiveShadow = true
  g.add(body)

  // 底部斜砌基座（batter），让墙看起来更稳
  const base = new THREE.Mesh(new THREE.BoxGeometry(length + 0.2, 0.9, T + 0.5), matte(PALETTE.stoneDark))
  base.position.y = 0.45
  base.castShadow = true
  base.receiveShadow = true
  g.add(base)

  // 顶部走道板，向城内挑出
  const walk = new THREE.Mesh(new THREE.BoxGeometry(length, 0.34, T + 1.5), matte(PALETTE.stoneMid))
  walk.position.set(0, H + 0.17, 0.75)
  walk.castShadow = true
  walk.receiveShadow = true
  g.add(walk)

  // 外侧雉堞
  const merlons = crenellations(length, 0.5, PALETTE.stoneLight, 0.78, 0.56, 0.95)
  merlons.position.set(0, H + 0.34, -T / 2 - 0.25)
  g.add(merlons)

  // 内侧矮护墙
  const innerParapet = new THREE.Mesh(new THREE.BoxGeometry(length, 0.42, 0.3), matte(PALETTE.stoneMid))
  innerParapet.position.set(0, H + 0.55, T / 2 + 1.35)
  innerParapet.castShadow = true
  g.add(innerParapet)

  // 支垛（corbel）：托住挑出的走道
  const corbelCount = Math.max(3, Math.floor(length / 2.2))
  for (let i = 0; i < corbelCount; i++) {
    const x = -length / 2 + (length / (corbelCount - 1)) * i
    const corbel = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.5, 0.7), matte(PALETTE.stoneDark))
    corbel.position.set(x, H - 0.2, -T / 2 - 0.2)
    corbel.castShadow = true
    g.add(corbel)
  }

  // 箭窗
  const slitCount = Math.max(2, Math.floor(length / 4.4))
  for (let i = 0; i < slitCount; i++) {
    const x = -length / 2 + (length / (slitCount + 1)) * (i + 1)
    const slit = new THREE.Mesh(new THREE.BoxGeometry(0.22, 1.15, 0.3), matte(PALETTE.stoneShadow))
    slit.position.set(x, H * 0.55, -T / 2 - 0.06)
    g.add(slit)
    const hood = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.14, 0.36), matte(PALETTE.stoneDark))
    hood.position.set(x, H * 0.55 + 0.66, -T / 2 - 0.08)
    g.add(hood)
  }

  // 扶壁
  for (const sx of [-length / 2 + 0.9, length / 2 - 0.9]) {
    const buttress = new THREE.Mesh(new THREE.BoxGeometry(1.1, H * 0.72, 0.9), matte(PALETTE.stoneMid))
    buttress.position.set(sx, H * 0.36, -T / 2 - 0.45)
    buttress.castShadow = true
    buttress.receiveShadow = true
    g.add(buttress)
    const cap = new THREE.Mesh(new THREE.ConeGeometry(0.72, 0.6, 4), matte(PALETTE.stoneDark))
    cap.rotation.y = Math.PI / 4
    cap.position.set(sx, H * 0.72 + 0.3, -T / 2 - 0.45)
    cap.castShadow = true
    g.add(cap)
  }

  return g
}

// ---------- 圆塔 ----------

export interface TowerOptions {
  radius?: number
  height?: number
  roofColor?: string
  roofHeight?: number
  hasFlag?: boolean
  flagColor?: string
  windows?: number
  taper?: boolean
}

export function buildRoundTower(opts: TowerOptions = {}, xray?: XRayTargets): THREE.Group {
  const g = new THREE.Group()
  const R = opts.radius ?? 3.2
  const H = opts.height ?? 12
  const roofColor = opts.roofColor ?? PALETTE.roofSlate
  const roofH = opts.roofHeight ?? R * 2.1

  const wallMat = new THREE.MeshLambertMaterial({ color: new THREE.Color(PALETTE.stoneLight) })
  xray?.fade.push(wallMat)

  // 塔身：下粗上细
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(R * 0.94, R, H, 22), wallMat)
  shaft.position.y = H / 2
  shaft.castShadow = true
  shaft.receiveShadow = true
  g.add(shaft)

  // 基座
  const base = new THREE.Mesh(new THREE.CylinderGeometry(R * 1.08, R * 1.2, 1.1, 22), matte(PALETTE.stoneDark))
  base.position.y = 0.55
  base.castShadow = true
  base.receiveShadow = true
  g.add(base)

  // 挑出的塔顶平台 + 支撑垛
  const platform = new THREE.Mesh(new THREE.CylinderGeometry(R * 1.16, R * 1.02, 0.5, 22), matte(PALETTE.stoneMid))
  platform.position.y = H + 0.25
  platform.castShadow = true
  g.add(platform)

  const corbels = 12
  for (let i = 0; i < corbels; i++) {
    const a = (i / corbels) * Math.PI * 2
    const corbel = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.55, 0.5), matte(PALETTE.stoneDark))
    corbel.position.set(Math.cos(a) * R * 1.02, H - 0.22, Math.sin(a) * R * 1.02)
    corbel.rotation.y = -a
    corbel.castShadow = true
    g.add(corbel)
  }

  // 塔顶雉堞（环状）
  const merlonCount = 12
  for (let i = 0; i < merlonCount; i++) {
    if (i % 2 === 1) continue
    const a = (i / merlonCount) * Math.PI * 2
    const merlon = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.9, 0.44), matte(PALETTE.stoneLight))
    merlon.position.set(Math.cos(a) * R * 1.1, H + 0.95, Math.sin(a) * R * 1.1)
    merlon.rotation.y = -a
    merlon.castShadow = true
    g.add(merlon)
  }

  // 锥形屋顶
  const roof = conicalRoof(R * 1.12, roofH, roofColor, 22, PALETTE.gold)
  roof.position.y = H + 0.5
  g.add(roof)
  xray?.hide.push(roof)

  // 箭窗 / 窗
  const rows = opts.windows ?? 3
  for (let r = 0; r < rows; r++) {
    const y = H * (0.28 + r * 0.22)
    const perRow = 3
    for (let i = 0; i < perRow; i++) {
      const a = (i / perRow) * Math.PI * 2 + r * 0.5
      const isLit = r === rows - 1
      const win = new THREE.Mesh(
        new THREE.BoxGeometry(0.3, isLit ? 0.85 : 1.0, 0.24),
        isLit ? matte(PALETTE.windowGlow) : matte(PALETTE.stoneShadow),
      )
      if (isLit) {
        const wm = win.material as THREE.MeshLambertMaterial
        wm.emissive = new THREE.Color(PALETTE.windowGlow)
        wm.emissiveIntensity = 0.6
        win.userData.lamp = true
      }
      win.position.set(Math.cos(a) * R * 0.95, y, Math.sin(a) * R * 0.95)
      win.rotation.y = -a
      g.add(win)
    }
  }

  // 门（塔底）
  const door = archDoor(1.3, 2.1, 0.3, PALETTE.woodDeep)
  door.position.set(0, 0, R * 0.96)
  g.add(door)

  if (opts.hasFlag) {
    const f = flag(3.4, opts.flagColor ?? PALETTE.bannerRed, 1.6, 0.95)
    f.position.y = H + roofH + 0.6
    g.add(f)
  }

  return g
}

// ---------- 门楼 ----------

function buildGatehouse(xray: XRayTargets): THREE.Group {
  const g = new THREE.Group()
  g.name = 'gatehouse'
  const H = WALL.height

  const wallMat = new THREE.MeshLambertMaterial({ color: new THREE.Color(PALETTE.stone) })
  xray.fade.push(wallMat)

  // 门楼主体
  const bodyW = 11
  const bodyH = H + 4.2
  const bodyD = 4.6
  const body = new THREE.Mesh(new THREE.BoxGeometry(bodyW, bodyH, bodyD), wallMat)
  body.position.y = bodyH / 2
  body.castShadow = true
  body.receiveShadow = true
  g.add(body)

  const base = new THREE.Mesh(new THREE.BoxGeometry(bodyW + 0.3, 1.0, bodyD + 0.5), matte(PALETTE.stoneDark))
  base.position.y = 0.5
  base.castShadow = true
  g.add(base)

  // 顶部走道与雉堞
  const walk = new THREE.Mesh(new THREE.BoxGeometry(bodyW, 0.34, bodyD + 1.2), matte(PALETTE.stoneMid))
  walk.position.set(0, bodyH + 0.17, 0.6)
  walk.castShadow = true
  g.add(walk)
  const merlons = crenellations(bodyW, 0.5, PALETTE.stoneLight, 0.8, 0.55, 1.0)
  merlons.position.set(0, bodyH + 0.34, -bodyD / 2 - 0.2)
  g.add(merlons)

  // 门洞：外圈石拱 + 内木门
  const archFrame = archDoor(4.6, 5.4, bodyD + 0.4, PALETTE.stoneMid)
  archFrame.position.set(0, 0, 0)
  g.add(archFrame)
  const opening = archDoor(3.6, 4.6, bodyD + 0.8, PALETTE.stoneShadow)
  opening.position.set(0, 0, 0)
  g.add(opening)

  // 闸门（portcullis）：竖栅 + 横杆，半升起状态
  const portcullis = new THREE.Group()
  const barMat = matte(PALETTE.ironDark)
  for (let i = 0; i < 7; i++) {
    const x = -1.5 + i * 0.5
    const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 4.2, 6), barMat)
    bar.position.set(x, 2.1, 0)
    bar.castShadow = true
    portcullis.add(bar)
    const spike = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.3, 6), barMat)
    spike.rotation.x = Math.PI
    spike.position.set(x, -0.1, 0)
    portcullis.add(spike)
  }
  for (let r = 0; r < 4; r++) {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(3.3, 0.13, 0.13), barMat)
    rail.position.set(0, 0.5 + r * 1.1, 0)
    portcullis.add(rail)
  }
  portcullis.position.set(0, 2.5, -bodyD / 2 + 0.5)
  g.add(portcullis)

  // 木门（敞开，向内转）
  for (const sx of [-1, 1]) {
    const leaf = new THREE.Group()
    const panel = new THREE.Mesh(new THREE.BoxGeometry(1.7, 3.6, 0.22), matte(PALETTE.woodDeep))
    panel.position.set(sx * 0.85, 1.8, 0)
    panel.castShadow = true
    leaf.add(panel)
    for (let b = 0; b < 3; b++) {
      const band = new THREE.Mesh(new THREE.BoxGeometry(1.72, 0.16, 0.28), matte(PALETTE.iron))
      band.position.set(sx * 0.85, 0.7 + b * 1.1, 0)
      leaf.add(band)
      for (let s = 0; s < 3; s++) {
        const stud = new THREE.Mesh(new THREE.SphereGeometry(0.07, 6, 5), matte(PALETTE.ironDark))
        stud.position.set(sx * (0.35 + s * 0.5), 0.7 + b * 1.1, 0.15)
        leaf.add(stud)
      }
    }
    leaf.position.set(sx * 1.75, 0, bodyD / 2 - 0.2)
    leaf.rotation.y = sx * 1.15
    g.add(leaf)
  }

  // 门楼上的窗与纹章
  for (const sx of [-3.4, 3.4]) {
    const win = new THREE.Mesh(new THREE.BoxGeometry(0.85, 1.3, 0.24), matte(PALETTE.windowGlow))
    const wm = win.material as THREE.MeshLambertMaterial
    wm.emissive = new THREE.Color(PALETTE.windowGlow)
    wm.emissiveIntensity = 0.6
    win.position.set(sx, bodyH * 0.62, -bodyD / 2 - 0.08)
    win.userData.lamp = true
    g.add(win)
    const hood = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.18, 0.34), matte(PALETTE.stoneDark))
    hood.position.set(sx, bodyH * 0.62 + 0.78, -bodyD / 2 - 0.1)
    g.add(hood)
  }

  // 纹章盾
  const shield = new THREE.Group()
  const shieldBody = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 0.16, 3), matte(PALETTE.bannerBlue))
  shieldBody.rotation.x = Math.PI / 2
  shieldBody.rotation.z = Math.PI
  shieldBody.scale.y = 1.15
  shield.add(shieldBody)
  const cross1 = new THREE.Mesh(new THREE.BoxGeometry(0.2, 1.5, 0.2), matte(PALETTE.bannerGold))
  shield.add(cross1)
  const cross2 = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.2, 0.2), matte(PALETTE.bannerGold))
  shield.add(cross2)
  shield.position.set(0, bodyH * 0.72, -bodyD / 2 - 0.2)
  g.add(shield)

  // 两侧塔楼
  for (const sx of [-1, 1]) {
    const tower = buildRoundTower(
      { radius: 2.9, height: bodyH + 3.4, roofColor: PALETTE.roofRose, roofHeight: 5.4, hasFlag: true, flagColor: sx < 0 ? PALETTE.bannerRed : PALETTE.bannerBlue, windows: 4 },
      xray,
    )
    tower.position.set(sx * (bodyW / 2 + 1.4), 0, -0.4)
    g.add(tower)
  }

  // 门楼内侧的绞盘房（升降闸门用）
  const winchRoom = new THREE.Mesh(new THREE.BoxGeometry(3.4, 2.4, 2.6), matte(PALETTE.wood))
  winchRoom.position.set(0, bodyH - 1.4, bodyD / 2 + 1.1)
  winchRoom.castShadow = true
  g.add(winchRoom)
  const winchRoof = pyramidRoof(3.8, 3.0, 1.5, PALETTE.roofSlateDark)
  winchRoof.position.set(0, bodyH - 0.2, bodyD / 2 + 1.1)
  g.add(winchRoof)
  xray.hide.push(winchRoof)

  return g
}

// ---------- 吊桥与护壕 ----------

function buildDrawbridge(): THREE.Group {
  const g = new THREE.Group()
  g.name = 'drawbridge'
  const rand = makeRandom(606)

  // 干护壕
  const ditch = new THREE.Mesh(
    new THREE.BoxGeometry(15, 2.4, 6.5),
    matte(PALETTE.dirtDark),
  )
  ditch.position.set(0, CASTLE_Y - 1.2, APOTHEM + 5.2)
  ditch.receiveShadow = true
  g.add(ditch)
  for (const sx of [-1, 1]) {
    const bank = new THREE.Mesh(new THREE.BoxGeometry(0.6, 2.6, 6.8), matte(PALETTE.rockDark))
    bank.position.set(sx * 7.6, CASTLE_Y - 1.2, APOTHEM + 5.2)
    bank.castShadow = true
    g.add(bank)
  }
  // 壕底碎石
  for (let i = 0; i < 22; i++) {
    const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(range(rand, 0.2, 0.55), 0), matte(PALETTE.rock))
    rock.position.set(range(rand, -6.5, 6.5), CASTLE_Y - 2.2, APOTHEM + range(rand, 2.6, 7.8))
    rock.rotation.set(rand() * 3, rand() * 3, rand() * 3)
    g.add(rock)
  }

  // 桥面（放下的状态）
  const bridge = new THREE.Group()
  for (let i = 0; i < 12; i++) {
    const plank = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.2, 0.62), matte(i % 2 ? PALETTE.wood : PALETTE.woodDark))
    plank.position.set(0, 0, i * 0.66)
    plank.castShadow = true
    plank.receiveShadow = true
    bridge.add(plank)
  }
  for (const sx of [-2.1, 2.1]) {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.16, 7.6), matte(PALETTE.woodDeep))
    rail.position.set(sx, 0.75, 3.7)
    bridge.add(rail)
    for (let i = 0; i < 5; i++) {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.09, 0.85, 6), matte(PALETTE.woodDeep))
      post.position.set(sx, 0.4, 0.5 + i * 1.6)
      bridge.add(post)
    }
  }
  bridge.position.set(0, CASTLE_Y + 0.05, APOTHEM + 1.6)
  g.add(bridge)

  // 铁链：从门楼高处的链孔垂到桥面外端，中段微垂
  const chainMat = matte(PALETTE.iron)
  for (const sx of [-1.9, 1.9]) {
    const pts: THREE.Vector3[] = []
    for (let i = 0; i <= 8; i++) {
      const t = i / 8
      const y = CASTLE_Y + 7.2 - t * 6.6 - Math.sin(t * Math.PI) * 0.5
      const z = APOTHEM + 0.8 + t * 7.6
      pts.push(new THREE.Vector3(sx * (0.75 + t * 0.85), y, z))
    }
    const curve = new THREE.CatmullRomCurve3(pts)
    const chain = new THREE.Mesh(new THREE.TubeGeometry(curve, 16, 0.055, 5, false), chainMat)
    g.add(chain)
  }

  // 桥头外的道路与路碑
  const roadStart = new THREE.Mesh(
    new THREE.BoxGeometry(5.2, 0.16, 8),
    matte(PALETTE.sand),
  )
  roadStart.position.set(0, CASTLE_Y - 0.05, APOTHEM + 12)
  roadStart.receiveShadow = true
  g.add(roadStart)

  void rand
  return g
}

// ---------- 教堂 ----------

function buildChapel(xray: XRayTargets): THREE.Group {
  const g = new THREE.Group()
  g.name = 'chapel'

  const wallMat = new THREE.MeshLambertMaterial({ color: new THREE.Color(PALETTE.stoneLight) })
  xray.fade.push(wallMat)

  // 中殿
  const nave = new THREE.Mesh(new THREE.BoxGeometry(6.4, 5.2, 10), wallMat)
  nave.position.y = 2.6
  nave.castShadow = true
  nave.receiveShadow = true
  g.add(nave)

  const naveRoof = new THREE.Mesh(new THREE.CylinderGeometry(4.6, 4.6, 10.4, 3, 1, false), matte(PALETTE.roofSlate))
  naveRoof.rotation.z = Math.PI / 2
  naveRoof.rotation.y = Math.PI / 2
  naveRoof.scale.set(1, 1, 0.78)
  naveRoof.position.y = 6.4
  naveRoof.castShadow = true
  g.add(naveRoof)
  xray.hide.push(naveRoof)

  // 圣坛（东端半圆室）
  const apse = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 2.6, 4.4, 14, 1, false, 0, Math.PI), wallMat)
  apse.rotation.y = Math.PI / 2
  apse.position.set(0, 2.2, -5.6)
  apse.castShadow = true
  g.add(apse)
  const apseRoof = new THREE.Mesh(new THREE.SphereGeometry(2.7, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), matte(PALETTE.roofSlateDark))
  apseRoof.scale.y = 0.7
  apseRoof.position.set(0, 4.4, -5.6)
  apseRoof.castShadow = true
  g.add(apseRoof)
  xray.hide.push(apseRoof)

  // 钟楼
  const bell = new THREE.Mesh(new THREE.BoxGeometry(3.4, 11, 3.4), wallMat)
  bell.position.set(0, 5.5, 5.4)
  bell.castShadow = true
  bell.receiveShadow = true
  g.add(bell)

  // 钟楼层的开口
  for (let level = 0; level < 2; level++) {
    const y = 7.4 + level * 2.2
    for (let s = 0; s < 4; s++) {
      const a = (s / 4) * Math.PI * 2 + Math.PI / 4
      const open = new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.7, 0.3), matte(PALETTE.stoneShadow))
      open.position.set(Math.cos(a) * 1.72, y, 5.4 + Math.sin(a) * 1.72)
      open.rotation.y = -a
      g.add(open)
    }
  }
  // 钟
  const bellBronze = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.72, 0.95, 12), matte(PALETTE.goldDark))
  bellBronze.position.set(0, 7.6, 5.4)
  g.add(bellBronze)

  const spire = conicalRoof(2.6, 5.2, PALETTE.roofSlateDark, 4, PALETTE.gold)
  spire.position.set(0, 11, 5.4)
  spire.rotation.y = Math.PI / 4
  g.add(spire)
  xray.hide.push(spire)

  // 十字架
  const crossV = new THREE.Mesh(new THREE.BoxGeometry(0.16, 1.5, 0.16), matte(PALETTE.gold))
  crossV.position.set(0, 17.0, 5.4)
  g.add(crossV)
  const crossH = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.16, 0.16), matte(PALETTE.gold))
  crossH.position.set(0, 17.3, 5.4)
  g.add(crossH)

  // 玫瑰窗
  const roseWin = new THREE.Group()
  const ring = new THREE.Mesh(new THREE.TorusGeometry(1.15, 0.14, 8, 22), matte(PALETTE.stoneDark))
  roseWin.add(ring)
  const glassDisc = new THREE.Mesh(
    new THREE.CircleGeometry(1.1, 22),
    uniqueMatte(PALETTE.flowerBlue, { emissive: new THREE.Color(PALETTE.flowerBlue), emissiveIntensity: 0.45 }),
  )
  glassDisc.userData.lamp = true
  roseWin.add(glassDisc)
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2
    const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.1, 2.1, 0.1), matte(PALETTE.stoneDark))
    spoke.rotation.z = a
    roseWin.add(spoke)
    const petalColor = i % 2 ? PALETTE.roseRed : PALETTE.flowerYellow
    const petal = new THREE.Mesh(
      new THREE.CircleGeometry(0.3, 10),
      uniqueMatte(petalColor, { emissive: new THREE.Color(petalColor), emissiveIntensity: 0.4 }),
    )
    petal.position.set(Math.cos(a) * 0.62, Math.sin(a) * 0.62, 0.02)
    petal.userData.lamp = true
    roseWin.add(petal)
  }
  const center = new THREE.Mesh(
    new THREE.CircleGeometry(0.32, 12),
    uniqueMatte(PALETTE.bannerGold, { emissive: new THREE.Color(PALETTE.bannerGold), emissiveIntensity: 0.5 }),
  )
  center.position.z = 0.03
  center.userData.lamp = true
  roseWin.add(center)
  roseWin.position.set(0, 4.0, 5.05 + 0.42)
  roseWin.rotation.y = 0
  // 玫瑰窗放在中殿山墙上
  roseWin.position.set(0, 4.2, 5.02)
  g.add(roseWin)

  // 侧窗（彩色玻璃）
  const glassColors = [PALETTE.flowerBlue, PALETTE.roseRed, PALETTE.flowerYellow, PALETTE.flowerViolet]
  for (let i = 0; i < 4; i++) {
    for (const sx of [-1, 1]) {
      const win = new THREE.Mesh(new THREE.BoxGeometry(0.2, 2.2, 0.85), matte(glassColors[i]))
      const wm = win.material as THREE.MeshLambertMaterial
      wm.emissive = new THREE.Color(glassColors[i])
      wm.emissiveIntensity = 0.4
      win.position.set(sx * 3.22, 3.0, -3.4 + i * 2.3)
      win.userData.lamp = true
      g.add(win)
    }
  }

  // 大门
  const door = archDoor(2.2, 3.2, 0.4, PALETTE.woodDeep)
  door.position.set(0, 0, 5.05)
  g.add(door)
  const doorFrame = archDoor(2.8, 3.7, 0.3, PALETTE.stoneMid)
  doorFrame.position.set(0, 0, 5.0)
  g.add(doorFrame)

  // 扶壁
  for (let i = 0; i < 4; i++) {
    for (const sx of [-1, 1]) {
      const b = new THREE.Mesh(new THREE.BoxGeometry(0.7, 3.6, 0.8), matte(PALETTE.stoneMid))
      b.position.set(sx * 3.5, 1.8, -3.4 + i * 2.3)
      b.castShadow = true
      g.add(b)
    }
  }

  return g
}

// ---------- 庭院建筑 ----------

function buildStables(xray: XRayTargets): THREE.Group {
  const g = new THREE.Group()
  g.name = 'stables'
  const wallMat = new THREE.MeshLambertMaterial({ color: new THREE.Color(PALETTE.stone) })
  xray.fade.push(wallMat)

  const body = new THREE.Mesh(new THREE.BoxGeometry(9, 3.6, 5.4), wallMat)
  body.position.y = 1.8
  body.castShadow = true
  body.receiveShadow = true
  g.add(body)

  const roof = new THREE.Mesh(new THREE.CylinderGeometry(3.6, 3.6, 9.6, 3, 1, false), matte(PALETTE.roofRose))
  roof.rotation.z = Math.PI / 2
  roof.rotation.y = Math.PI / 2
  roof.scale.set(1, 1, 0.82)
  roof.position.y = 4.6
  roof.castShadow = true
  g.add(roof)
  xray.hide.push(roof)

  // 三个马厩门
  for (let i = 0; i < 3; i++) {
    const x = -3 + i * 3
    const door = new THREE.Mesh(new THREE.BoxGeometry(1.9, 2.5, 0.16), matte(PALETTE.woodDeep))
    door.position.set(x, 1.25, 2.72)
    door.castShadow = true
    g.add(door)
    for (let b = 0; b < 2; b++) {
      const band = new THREE.Mesh(new THREE.BoxGeometry(1.95, 0.14, 0.2), matte(PALETTE.iron))
      band.position.set(x, 0.7 + b * 1.2, 2.76)
      g.add(band)
    }
    // 马蹄铁
    const shoe = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.05, 6, 12, Math.PI * 1.4), matte(PALETTE.ironDark))
    shoe.position.set(x, 3.0, 2.78)
    g.add(shoe)
  }

  // 干草堆
  const rand = makeRandom(8888)
  for (let i = 0; i < 4; i++) {
    const hay = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.8, 0.9, 10), matte(PALETTE.wheat))
    hay.position.set(-3.6 + i * 2.4, 0.45, -3.4)
    hay.castShadow = true
    g.add(hay)
  }
  // 水槽
  const trough = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.6, 0.9), matte(PALETTE.woodDark))
  trough.position.set(0, 0.3, 4.0)
  trough.castShadow = true
  g.add(trough)
  const water = new THREE.Mesh(new THREE.BoxGeometry(2.9, 0.1, 0.7), matte(PALETTE.water))
  water.position.set(0, 0.58, 4.0)
  g.add(water)

  void rand
  return g
}

function buildSmithy(xray: XRayTargets): THREE.Group {
  const g = new THREE.Group()
  g.name = 'smithy'
  const wallMat = new THREE.MeshLambertMaterial({ color: new THREE.Color(PALETTE.stoneMid) })
  xray.fade.push(wallMat)

  const body = new THREE.Mesh(new THREE.BoxGeometry(6.4, 3.4, 5), wallMat)
  body.position.y = 1.7
  body.castShadow = true
  body.receiveShadow = true
  g.add(body)
  const roof = new THREE.Mesh(new THREE.CylinderGeometry(3.3, 3.3, 7.0, 3, 1, false), matte(PALETTE.roofSlateDark))
  roof.rotation.z = Math.PI / 2
  roof.rotation.y = Math.PI / 2
  roof.scale.set(1, 1, 0.8)
  roof.position.y = 4.3
  roof.castShadow = true
  g.add(roof)
  xray.hide.push(roof)

  // 大烟囱（铁匠炉）
  const chimney = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 1.3, 6.2, 12), matte(PALETTE.stoneDark))
  chimney.position.set(-2.2, 3.1, -1.4)
  chimney.castShadow = true
  g.add(chimney)
  const chimneyTop = new THREE.Mesh(new THREE.CylinderGeometry(1.25, 1.05, 0.5, 12), matte(PALETTE.ironDark))
  chimneyTop.position.set(-2.2, 6.3, -1.4)
  g.add(chimneyTop)
  // 炉火的光
  const forge = new THREE.Mesh(new THREE.BoxGeometry(1.3, 1.0, 0.3), matte(PALETTE.fire))
  const fm = forge.material as THREE.MeshLambertMaterial
  fm.emissive = new THREE.Color(PALETTE.fire)
  fm.emissiveIntensity = 1.2
  forge.position.set(-2.2, 1.0, 2.55)
  forge.userData.forge = true
  g.add(forge)

  // 敞开的工坊门
  const door = new THREE.Mesh(new THREE.BoxGeometry(2.6, 2.6, 0.16), matte(PALETTE.woodDeep))
  door.position.set(1.2, 1.3, 2.55)
  g.add(door)

  // 铁砧与成品
  const anvil = new THREE.Group()
  const anvilBase = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.5, 0.6, 8), matte(PALETTE.woodDeep))
  anvilBase.position.y = 0.3
  anvil.add(anvilBase)
  const anvilTop = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.3, 0.4), matte(PALETTE.ironDark))
  anvilTop.position.y = 0.75
  anvil.add(anvilTop)
  const anvilHorn = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.5, 8), matte(PALETTE.ironDark))
  anvilHorn.rotation.z = -Math.PI / 2
  anvilHorn.position.set(0.7, 0.75, 0)
  anvil.add(anvilHorn)
  anvil.position.set(1.4, 0, 4.0)
  g.add(anvil)

  // 挂着的铁器
  for (let i = 0; i < 5; i++) {
    const tool = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.9, 0.12), matte(PALETTE.iron))
    tool.position.set(3.3, 2.4 - i * 0.05, 1.6 - i * 0.55)
    g.add(tool)
  }
  // 木桶
  for (let i = 0; i < 3; i++) {
    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.42, 0.95, 12), matte(PALETTE.wood))
    barrel.position.set(-0.6 + i * 0.95, 0.48, 4.2)
    barrel.castShadow = true
    g.add(barrel)
    for (const by of [0.22, 0.72]) {
      const hoop = new THREE.Mesh(new THREE.TorusGeometry(0.45, 0.04, 6, 14), matte(PALETTE.ironDark))
      hoop.rotation.x = Math.PI / 2
      hoop.position.set(-0.6 + i * 0.95, by, 4.2)
      g.add(hoop)
    }
  }

  return g
}

function buildBarracks(xray: XRayTargets): THREE.Group {
  const g = new THREE.Group()
  g.name = 'barracks'
  const wallMat = new THREE.MeshLambertMaterial({ color: new THREE.Color(PALETTE.stone) })
  xray.fade.push(wallMat)

  const body = new THREE.Mesh(new THREE.BoxGeometry(8, 4.2, 5), wallMat)
  body.position.y = 2.1
  body.castShadow = true
  body.receiveShadow = true
  g.add(body)
  const roof = new THREE.Mesh(new THREE.CylinderGeometry(3.4, 3.4, 8.6, 3, 1, false), matte(PALETTE.roofRoseDark))
  roof.rotation.z = Math.PI / 2
  roof.rotation.y = Math.PI / 2
  roof.scale.set(1, 1, 0.8)
  roof.position.y = 5.3
  roof.castShadow = true
  g.add(roof)
  xray.hide.push(roof)

  for (let i = 0; i < 3; i++) {
    const win = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.1, 0.2), matte(PALETTE.windowGlow))
    const wm = win.material as THREE.MeshLambertMaterial
    wm.emissive = new THREE.Color(PALETTE.windowGlow)
    wm.emissiveIntensity = 0.55
    win.position.set(-2.6 + i * 2.6, 2.6, 2.55)
    win.userData.lamp = true
    g.add(win)
  }
  const door = archDoor(1.6, 2.6, 0.3, PALETTE.woodDeep)
  door.position.set(0, 0, 2.52)
  g.add(door)

  // 训练场：靶子、武器架、木桩
  const yard = new THREE.Group()
  for (let i = 0; i < 3; i++) {
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 2.2, 7), matte(PALETTE.woodDark))
    post.position.set(-2.4 + i * 2.4, 1.1, 0)
    yard.add(post)
    const target = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.12, 16), matte(PALETTE.cloud))
    target.rotation.x = Math.PI / 2
    target.position.set(-2.4 + i * 2.4, 1.9, 0.05)
    yard.add(target)
    const inner = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.14, 14), matte(PALETTE.bannerRed))
    inner.rotation.x = Math.PI / 2
    inner.position.set(-2.4 + i * 2.4, 1.9, 0.07)
    yard.add(inner)
    const bull = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.16, 12), matte(PALETTE.bannerGold))
    bull.rotation.x = Math.PI / 2
    bull.position.set(-2.4 + i * 2.4, 1.9, 0.09)
    yard.add(bull)
  }
  // 武器架
  const rack = new THREE.Group()
  for (const sx of [-1.4, 1.4]) {
    const p = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.1, 1.8, 7), matte(PALETTE.woodDeep))
    p.position.set(sx, 0.9, 0)
    rack.add(p)
  }
  const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 3.0, 7), matte(PALETTE.woodDeep))
  bar.rotation.z = Math.PI / 2
  bar.position.y = 1.5
  rack.add(bar)
  for (let i = 0; i < 5; i++) {
    const spear = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 2.6, 6), matte(PALETTE.wood))
    spear.position.set(-1.1 + i * 0.55, 1.3, 0.1)
    spear.rotation.z = 0.06
    rack.add(spear)
    const tip = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.34, 6), matte(PALETTE.iron))
    tip.position.set(-1.1 + i * 0.55 + 0.08, 2.7, 0.1)
    rack.add(tip)
  }
  rack.position.set(0, 0, 2.6)
  yard.add(rack)

  yard.position.set(0, 0, 6.4)
  g.add(yard)

  return g
}

/** 庭院水井（城堡自己的水源）。 */
function buildCourtyardWell(): THREE.Group {
  const g = new THREE.Group()
  const base = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.3, 1.1, 14), matte(PALETTE.stoneMid))
  base.position.y = 0.55
  base.castShadow = true
  base.receiveShadow = true
  g.add(base)
  const rim = new THREE.Mesh(new THREE.TorusGeometry(1.18, 0.14, 8, 20), matte(PALETTE.stoneDark))
  rim.rotation.x = Math.PI / 2
  rim.position.y = 1.12
  g.add(rim)
  const water = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 1.0, 0.08, 14), matte(PALETTE.waterDeep))
  water.position.y = 0.95
  g.add(water)
  for (const sx of [-1.0, 1.0]) {
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.12, 2.2, 8), matte(PALETTE.woodDeep))
    post.position.set(sx, 2.0, 0)
    post.castShadow = true
    g.add(post)
  }
  const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 2.2, 8), matte(PALETTE.woodDeep))
  beam.rotation.z = Math.PI / 2
  beam.position.y = 3.0
  g.add(beam)
  const crank = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.5, 6), matte(PALETTE.iron))
  crank.rotation.z = Math.PI / 2
  crank.position.set(1.25, 2.85, 0)
  g.add(crank)
  const roof = new THREE.Mesh(new THREE.CylinderGeometry(1.7, 1.7, 1.1, 4, 1, false), matte(PALETTE.roofRose))
  roof.rotation.y = Math.PI / 4
  roof.scale.set(1, 1, 0.85)
  roof.position.y = 3.7
  roof.castShadow = true
  g.add(roof)
  const bucket = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.22, 0.36, 10), matte(PALETTE.woodDark))
  bucket.position.set(0, 2.1, 0)
  g.add(bucket)
  const rope = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.9, 5), matte(PALETTE.trunk))
  rope.position.set(0, 2.55, 0)
  g.add(rope)
  return g
}

/** 庭院里的生活细节：货车、木箱、菜畦、晾衣绳、鸽舍。 */
function buildCourtyardDetails(): THREE.Group {
  const g = new THREE.Group()
  const rand = makeRandom(1212)

  // 货车
  const cart = new THREE.Group()
  const bed = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.2, 1.5), matte(PALETTE.wood))
  bed.position.y = 0.75
  bed.castShadow = true
  cart.add(bed)
  for (const sx of [-1.0, 1.0]) {
    const wheel = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.1, 7, 16), matte(PALETTE.woodDark))
    wheel.position.set(sx, 0.55, 0.8)
    wheel.castShadow = true
    cart.add(wheel)
    const wheel2 = wheel.clone()
    wheel2.position.z = -0.8
    cart.add(wheel2)
    for (let s = 0; s < 6; s++) {
      const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.07, 1.0, 0.07), matte(PALETTE.woodDeep))
      spoke.rotation.z = (s / 6) * Math.PI
      spoke.position.set(sx, 0.55, 0.8)
      cart.add(spoke)
    }
  }
  const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 2.2, 7), matte(PALETTE.woodDeep))
  handle.rotation.z = Math.PI / 2 - 0.2
  handle.position.set(2.5, 0.95, 0)
  cart.add(handle)
  // 车上的南瓜与干草
  for (let i = 0; i < 5; i++) {
    const gourd = new THREE.Mesh(new THREE.SphereGeometry(range(rand, 0.22, 0.36), 9, 7), matte(PALETTE.leafAutumn))
    gourd.position.set(range(rand, -1.1, 1.1), 1.05, range(rand, -0.5, 0.5))
    gourd.scale.y = 0.82
    cart.add(gourd)
  }
  cart.position.set(-6.5, CASTLE_Y, 12)
  cart.rotation.y = 0.5
  g.add(cart)

  // 木箱堆
  for (let i = 0; i < 7; i++) {
    const s = range(rand, 0.6, 1.0)
    const crate = new THREE.Mesh(new THREE.BoxGeometry(s, s, s), matte(i % 2 ? PALETTE.wood : PALETTE.woodDark))
    crate.position.set(8 + range(rand, -1.4, 1.4), CASTLE_Y + s / 2 + (i > 4 ? 0.9 : 0), 13 + range(rand, -1.2, 1.2))
    crate.rotation.y = rand() * 0.7
    crate.castShadow = true
    crate.receiveShadow = true
    g.add(crate)
  }

  // 菜畦与香草园
  for (let i = 0; i < 4; i++) {
    const bed = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.4, 1.3), matte(PALETTE.dirt))
    bed.position.set(-14 + i * 0.0, CASTLE_Y + 0.2, 12 + i * 1.7)
    bed.receiveShadow = true
    bed.castShadow = true
    g.add(bed)
    for (let k = 0; k < 7; k++) {
      const plant = new THREE.Mesh(new THREE.SphereGeometry(0.22, 7, 6), matte(k % 2 ? PALETTE.leaf : PALETTE.leafDark))
      plant.position.set(-15.3 + k * 0.45, CASTLE_Y + 0.52, 12 + i * 1.7)
      plant.scale.y = 0.7
      g.add(plant)
    }
  }

  // 晾衣绳
  const line = new THREE.Group()
  for (const sx of [-2.2, 2.2]) {
    const p = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.08, 2.6, 6), matte(PALETTE.woodDeep))
    p.position.set(sx, 1.3, 0)
    line.add(p)
  }
  const ropePts = [new THREE.Vector3(-2.2, 2.5, 0), new THREE.Vector3(0, 2.25, 0), new THREE.Vector3(2.2, 2.5, 0)]
  const ropeCurve = new THREE.CatmullRomCurve3(ropePts)
  const rope = new THREE.Mesh(new THREE.TubeGeometry(ropeCurve, 12, 0.03, 5, false), matte(PALETTE.trunk))
  line.add(rope)
  const clothColors = [PALETTE.cloud, PALETTE.maidDress, PALETTE.bannerBlue, PALETTE.cookApron, PALETTE.princeScarf]
  for (let i = 0; i < 5; i++) {
    const t = (i + 0.5) / 5
    const p = ropeCurve.getPoint(t)
    const cloth = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.95, 3, 3), new THREE.MeshLambertMaterial({ color: new THREE.Color(clothColors[i]), side: THREE.DoubleSide }))
    cloth.position.set(p.x, p.y - 0.5, p.z)
    cloth.castShadow = true
    cloth.userData.wave = { segX: 3, segY: 3, clothW: 0.7, base: (cloth.geometry.attributes.position.array as Float32Array).slice() }
    line.add(cloth)
  }
  line.position.set(11, CASTLE_Y, -13)
  line.rotation.y = 0.4
  g.add(line)

  // 鸽舍
  const dovecote = new THREE.Group()
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.28, 4.4, 10), matte(PALETTE.woodDeep))
  pole.position.y = 2.2
  pole.castShadow = true
  dovecote.add(pole)
  const houseBody = new THREE.Mesh(new THREE.CylinderGeometry(1.3, 1.3, 1.8, 10), matte(PALETTE.stoneLight))
  houseBody.position.y = 5.2
  houseBody.castShadow = true
  dovecote.add(houseBody)
  const houseRoof = new THREE.Mesh(new THREE.ConeGeometry(1.6, 1.3, 10), matte(PALETTE.roofSlate))
  houseRoof.position.y = 6.7
  houseRoof.castShadow = true
  dovecote.add(houseRoof)
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2
    const hole = new THREE.Mesh(new THREE.CircleGeometry(0.2, 10), matte(PALETTE.stoneShadow))
    hole.position.set(Math.cos(a) * 1.31, 5.3, Math.sin(a) * 1.31)
    hole.rotation.y = -a
    dovecote.add(hole)
  }
  dovecote.position.set(15, CASTLE_Y, 2)
  g.add(dovecote)

  // 庭院里的树与花坛
  for (const [tx, tz] of [
    [-9, 6],
    [9, 7],
    [-4, 15],
    [5, 16],
  ]) {
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.32, 2.6, 9), matte(PALETTE.trunk))
    trunk.position.set(tx, CASTLE_Y + 1.3, tz)
    trunk.castShadow = true
    g.add(trunk)
    for (let i = 0; i < 3; i++) {
      const canopy = new THREE.Mesh(new THREE.SphereGeometry(range(rand, 1.0, 1.5), 11, 9), matte(i % 2 ? PALETTE.leaf : PALETTE.leafDark))
      canopy.position.set(tx + range(rand, -0.5, 0.5), CASTLE_Y + 3.0 + range(rand, 0, 0.7), tz + range(rand, -0.5, 0.5))
      canopy.scale.y = 0.85
      canopy.castShadow = true
      canopy.userData.sway = { phase: rand() * 6.28, amp: 0.02 }
      g.add(canopy)
    }
    // 树池
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.85, 0.16, 7, 18), matte(PALETTE.stoneDark))
    ring.rotation.x = Math.PI / 2
    ring.position.set(tx, CASTLE_Y + 0.14, tz)
    g.add(ring)
  }

  // 花坛
  for (let i = 0; i < 26; i++) {
    const a = rand() * Math.PI * 2
    const d = range(rand, 7.5, 12)
    const x = Math.cos(a) * d
    const z = 5 + Math.sin(a) * d * 0.7
    if (Math.hypot(x, z - 5) < 7) continue
    const bloom = new THREE.Mesh(new THREE.SphereGeometry(0.16, 7, 6), matte(pick(rand, [PALETTE.roseRed, PALETTE.rosePink, PALETTE.flowerYellow, PALETTE.flowerViolet, PALETTE.roseWhite])))
    bloom.position.set(x, CASTLE_Y + 0.2, z)
    g.add(bloom)
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.03, 0.3, 5), matte(PALETTE.grassDark))
    stem.position.set(x, CASTLE_Y + 0.1, z)
    g.add(stem)
  }

  return g
}

/** 城墙上悬挂的旗帜与挂毯。 */
function buildBanners(): THREE.Group {
  const g = new THREE.Group()
  const colors = [PALETTE.bannerRed, PALETTE.bannerBlue, PALETTE.bannerGold]
  for (let k = 0; k < WALL.sides; k++) {
    if (k === WALL.gateSide) continue
    const a = sideAngle(k)
    for (let i = 0; i < 3; i++) {
      const t = (i - 1) * 0.3
      const x = Math.cos(a) * (APOTHEM - 0.05) + -Math.sin(a) * (t * SIDE_LEN)
      const z = Math.sin(a) * (APOTHEM - 0.05) + Math.cos(a) * (t * SIDE_LEN)
      const banner = new THREE.Group()
      const cloth = new THREE.Mesh(
        new THREE.PlaneGeometry(1.1, 2.6, 4, 8),
        new THREE.MeshLambertMaterial({ color: new THREE.Color(colors[(k + i) % 3]), side: THREE.DoubleSide }),
      )
      cloth.position.y = -1.3
      cloth.castShadow = true
      cloth.userData.wave = { segX: 4, segY: 8, clothW: 1.1, base: (cloth.geometry.attributes.position.array as Float32Array).slice() }
      banner.add(cloth)
      const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.4, 6), matte(PALETTE.woodDeep))
      rod.rotation.z = Math.PI / 2
      banner.add(rod)
      const emblem = new THREE.Mesh(new THREE.CircleGeometry(0.28, 12), matte(PALETTE.bannerGold))
      emblem.position.set(0, -1.0, 0.02)
      banner.add(emblem)
      banner.position.set(x, CASTLE_Y + WALL.height - 0.4, z)
      banner.rotation.y = Math.atan2(-Math.cos(a), -Math.sin(a)) + Math.PI
      g.add(banner)
    }
  }
  return g
}

/** 城墙上的一圈火把（夜里点亮）。 */
function buildWallTorches(): THREE.Group {
  const g = new THREE.Group()
  for (let k = 0; k < WALL.sides; k++) {
    const a = sideAngle(k)
    for (let i = 0; i < 2; i++) {
      const t = (i === 0 ? -0.28 : 0.28) * SIDE_LEN
      const x = Math.cos(a) * (APOTHEM + 0.2) + -Math.sin(a) * t
      const z = Math.sin(a) * (APOTHEM + 0.2) + Math.cos(a) * t
      const torch = new THREE.Group()
      const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 0.8, 6), matte(PALETTE.woodDeep))
      stick.position.y = 0.4
      torch.add(stick)
      const bracket = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.04, 6, 12), matte(PALETTE.ironDark))
      bracket.rotation.x = Math.PI / 2
      bracket.position.y = 0.1
      torch.add(bracket)
      const flame = new THREE.Mesh(new THREE.ConeGeometry(0.17, 0.5, 8), matte(PALETTE.fire))
      const fm = flame.material as THREE.MeshLambertMaterial
      fm.emissive = new THREE.Color(PALETTE.fire)
      fm.emissiveIntensity = 1.4
      flame.position.y = 0.98
      flame.userData.flame = { phase: Math.random() * 6.28 }
      torch.add(flame)
      const core = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.3, 7), matte(PALETTE.fireCore))
      const cm = core.material as THREE.MeshLambertMaterial
      cm.emissive = new THREE.Color(PALETTE.fireCore)
      cm.emissiveIntensity = 1.6
      core.position.y = 0.9
      core.userData.flame = { phase: Math.random() * 6.28 + 1 }
      torch.add(core)
      torch.position.set(x, CASTLE_Y + WALL.height + 0.34, z)
      g.add(torch)
    }
  }
  return g
}

// ---------- 总装 ----------

export interface CastleResult {
  group: THREE.Group
  xray: XRayTargets
  /** 城墙上巡逻路径的世界坐标，供点灯人/卫兵使用 */
  wallWalkY: number
  apothem: number
}

export function buildCastle(): CastleResult {
  const xray: XRayTargets = { fade: [], hide: [] }
  const g = new THREE.Group()
  g.name = 'castle'

  g.add(buildPlatform(xray))

  // 城墙：八段，正面那段留给门楼
  for (let k = 0; k < WALL.sides; k++) {
    const a = sideAngle(k)
    if (k === WALL.gateSide) {
      // 门楼两侧的短墙
      const stubLen = (SIDE_LEN - 13.8) / 2
      for (const sx of [-1, 1]) {
        const stub = buildWallSegment(stubLen, xray)
        const offset = sx * (13.8 / 2 + stubLen / 2)
        stub.position.set(
          Math.cos(a) * APOTHEM + -Math.sin(a) * offset,
          CASTLE_Y,
          Math.sin(a) * APOTHEM + Math.cos(a) * offset,
        )
        stub.rotation.y = Math.atan2(-Math.cos(a), -Math.sin(a))
        g.add(stub)
      }
      const gate = buildGatehouse(xray)
      orientToSide(gate, a, APOTHEM)
      g.add(gate)
    } else {
      const seg = buildWallSegment(SIDE_LEN, xray)
      orientToSide(seg, a, APOTHEM)
      g.add(seg)
    }
  }

  // 八角塔
  const towerColors = [PALETTE.roofSlate, PALETTE.roofRose, PALETTE.roofSlateDark, PALETTE.roofRoseDark]
  const flagColors = [PALETTE.bannerRed, PALETTE.bannerBlue, PALETTE.bannerGold, PALETTE.bannerRed]
  for (let k = 0; k < WALL.sides; k++) {
    const a = vertexAngle(k)
    const isMain = k % 2 === 0
    const tower = buildRoundTower(
      {
        radius: isMain ? 3.5 : 2.9,
        height: isMain ? 15.5 : 12.5,
        roofColor: towerColors[k % 4],
        roofHeight: isMain ? 7.2 : 5.6,
        hasFlag: isMain,
        flagColor: flagColors[k % 4],
        windows: isMain ? 4 : 3,
      },
      xray,
    )
    tower.position.set(Math.cos(a) * WALL.circumR, CASTLE_Y, Math.sin(a) * WALL.circumR)
    tower.rotation.y = -a + Math.PI / 2
    g.add(tower)
  }

  g.add(buildDrawbridge())
  g.add(buildBanners())
  g.add(buildWallTorches())

  // 教堂：城内左后方
  const chapel = buildChapel(xray)
  chapel.position.set(-12.5, CASTLE_Y, -8)
  chapel.rotation.y = Math.PI * 0.78
  g.add(chapel)

  // 马厩：城内右侧
  const stables = buildStables(xray)
  stables.position.set(13.5, CASTLE_Y, 6)
  stables.rotation.y = -Math.PI / 2 - 0.2
  g.add(stables)

  // 铁匠铺：城内左侧
  const smithy = buildSmithy(xray)
  smithy.position.set(-14, CASTLE_Y, 5)
  smithy.rotation.y = Math.PI / 2 + 0.2
  g.add(smithy)

  // 兵营：城内右后
  const barracks = buildBarracks(xray)
  barracks.position.set(11, CASTLE_Y, -12)
  barracks.rotation.y = -Math.PI * 0.72
  g.add(barracks)

  // 主堡（含内部构造）
  const keep = buildKeep(xray)
  keep.position.set(0, CASTLE_Y, -4)
  g.add(keep)

  // 庭院水井
  const well = buildCourtyardWell()
  well.position.set(7.5, CASTLE_Y, 8)
  g.add(well)

  g.add(buildCourtyardDetails())

  return { group: g, xray, wallWalkY: CASTLE_Y + WALL.height + 0.34, apothem: APOTHEM }
}

export { WALL, APOTHEM, SIDE_LEN, sideAngle, vertexAngle }
