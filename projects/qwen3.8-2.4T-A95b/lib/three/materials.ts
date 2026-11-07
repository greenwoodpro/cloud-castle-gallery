import * as THREE from 'three'
import { PALETTE } from './palette'

/**
 * 统一材质工厂。
 * 全部使用 Lambert（纯漫反射、无高光），模拟水彩纸面上的哑光颜料；
 * 配合半球光得到柔和的绘本明暗，而不是塑料感的 PBR 高光。
 */

const cache = new Map<string, THREE.MeshLambertMaterial>()

export function matte(color: string, opts: Partial<THREE.MeshLambertMaterialParameters> = {}): THREE.MeshLambertMaterial {
  const key = `${color}|${JSON.stringify(opts)}`
  const hit = cache.get(key)
  if (hit) return hit
  const mat = new THREE.MeshLambertMaterial({ color: new THREE.Color(color), ...opts })
  cache.set(key, mat)
  return mat
}

export function glow(color: string, intensity = 1): THREE.MeshBasicMaterial {
  return new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(intensity) })
}

/**
 * 独立材质（不进缓存）。
 * matte() 会按颜色复用同一个实例，这对合并静态几何很关键；
 * 但凡是要单独改 emissive / 透明度 / side 的构件，必须用这个，
 * 否则会连带影响所有同色物件。
 */
export function uniqueMatte(color: string, opts: Partial<THREE.MeshLambertMaterialParameters> = {}): THREE.MeshLambertMaterial {
  return new THREE.MeshLambertMaterial({ color: new THREE.Color(color), ...opts })
}

export function transparentMatte(
  color: string,
  opacity: number,
  opts: Partial<THREE.MeshLambertMaterialParameters> = {},
): THREE.MeshLambertMaterial {
  return new THREE.MeshLambertMaterial({
    color: new THREE.Color(color),
    transparent: true,
    opacity,
    depthWrite: opacity > 0.6,
    ...opts,
  })
}

let flowTex: THREE.Texture | null = null

/**
 * 水流条纹贴图。
 * 程序化生成，靠滚动 UV 的 offset 表现溪流与瀑布的流动，
 * 比逐顶点位移便宜得多，也更像水彩里的留白笔触。
 */
export function flowTexture(): THREE.Texture {
  if (flowTex) return flowTex
  const size = 128
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    flowTex = new THREE.Texture()
    return flowTex
  }
  ctx.fillStyle = '#c9c9c9'
  ctx.fillRect(0, 0, size, size)
  const rand = makeRandomLocal(4242)
  for (let i = 0; i < 70; i++) {
    const x = rand() * size
    const w = 1 + rand() * 5
    const bright = 190 + Math.floor(rand() * 65)
    ctx.fillStyle = `rgba(${bright},${bright},${bright},${0.25 + rand() * 0.6})`
    ctx.fillRect(x, 0, w, size)
  }
  for (let i = 0; i < 26; i++) {
    const y = rand() * size
    ctx.fillStyle = `rgba(255,255,255,${0.15 + rand() * 0.35})`
    ctx.fillRect(0, y, size, 1 + rand() * 3)
  }
  const tex = new THREE.CanvasTexture(canvas)
  tex.wrapS = THREE.RepeatWrapping
  tex.wrapT = THREE.RepeatWrapping
  tex.colorSpace = THREE.SRGBColorSpace
  flowTex = tex
  return tex
}

function makeRandomLocal(seed: number) {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}

/** 玻璃罩（玫瑰用的那种），双面 + 低透明度。 */
export function glass(): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#eaf4f6'),
    transparent: true,
    opacity: 0.18,
    roughness: 0.05,
    metalness: 0,
    transmission: 0.9,
    thickness: 0.4,
    side: THREE.DoubleSide,
    depthWrite: false,
  })
}

// ---------- 基础构件 ----------

export function box(
  w: number,
  h: number,
  d: number,
  color: string,
  opts: Partial<THREE.MeshLambertMaterialParameters> = {},
): THREE.Mesh {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), matte(color, opts))
  mesh.castShadow = true
  mesh.receiveShadow = true
  return mesh
}

export function cyl(
  rt: number,
  rb: number,
  h: number,
  color: string,
  seg = 16,
  opts: Partial<THREE.MeshLambertMaterialParameters> = {},
): THREE.Mesh {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), matte(color, opts))
  mesh.castShadow = true
  mesh.receiveShadow = true
  return mesh
}

export function sphere(r: number, color: string, seg = 16, opts: Partial<THREE.MeshLambertMaterialParameters> = {}): THREE.Mesh {
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(r, seg, Math.max(8, seg / 2)), matte(color, opts))
  mesh.castShadow = true
  mesh.receiveShadow = true
  return mesh
}

export function cone(r: number, h: number, color: string, seg = 16, opts: Partial<THREE.MeshLambertMaterialParameters> = {}): THREE.Mesh {
  const mesh = new THREE.Mesh(new THREE.ConeGeometry(r, h, seg), matte(color, opts))
  mesh.castShadow = true
  mesh.receiveShadow = true
  return mesh
}

export function torus(r: number, tube: number, color: string, seg = 12, radial = 24, arc = Math.PI * 2): THREE.Mesh {
  const mesh = new THREE.Mesh(new THREE.TorusGeometry(r, tube, seg, radial, arc), matte(color))
  mesh.castShadow = true
  mesh.receiveShadow = true
  return mesh
}

export function place<T extends THREE.Object3D>(obj: T, x: number, y: number, z: number): T {
  obj.position.set(x, y, z)
  return obj
}

/** 让物体绕 Y 轴朝向某个世界坐标。 */
export function lookAtY(obj: THREE.Object3D, x: number, z: number): void {
  obj.rotation.y = Math.atan2(x - obj.position.x, z - obj.position.z)
}

/** 随机轻微旋转 + 缩放，让重复摆放的物件不显得机械。 */
export function scatter(obj: THREE.Object3D, rand: () => number, rotJitter = Math.PI * 2, scaleJitter = 0.12): void {
  obj.rotation.y = rand() * rotJitter
  const s = 1 + (rand() - 0.5) * 2 * scaleJitter
  obj.scale.setScalar(s)
}

// ---------- 复合构件 ----------

/** 圆头胶囊，用于人物躯干、动物身体等柔和体量。 */
export function capsule(r: number, len: number, color: string, seg = 12): THREE.Mesh {
  const mesh = new THREE.Mesh(new THREE.CapsuleGeometry(r, len, Math.max(4, seg / 3), seg), matte(color))
  mesh.castShadow = true
  mesh.receiveShadow = true
  return mesh
}

/** 一段圆弧墙 / 拱门用的环形几何。 */
export function arcWall(
  innerR: number,
  thickness: number,
  height: number,
  startAngle: number,
  endAngle: number,
  color: string,
  segments = 24,
): THREE.Mesh {
  const shape = new THREE.Shape()
  const outerR = innerR + thickness
  shape.absarc(0, 0, outerR, startAngle, endAngle, false)
  shape.absarc(0, 0, innerR, endAngle, startAngle, true)
  const geo = new THREE.ExtrudeGeometry(shape, { depth: height, bevelEnabled: false, curveSegments: segments })
  geo.rotateX(-Math.PI / 2)
  const mesh = new THREE.Mesh(geo, matte(color))
  mesh.castShadow = true
  mesh.receiveShadow = true
  return mesh
}

/** 拱形门洞（半圆顶 + 两侧直边），用于城门、教堂门。 */
export function archDoor(width: number, height: number, depth: number, color: string): THREE.Mesh {
  const r = width / 2
  const straight = Math.max(0.01, height - r)
  const shape = new THREE.Shape()
  shape.moveTo(-r, 0)
  shape.lineTo(-r, straight)
  shape.absarc(0, straight, r, Math.PI, 0, true)
  shape.lineTo(r, 0)
  shape.lineTo(-r, 0)
  const geo = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false, curveSegments: 20 })
  geo.translate(0, 0, -depth / 2)
  const mesh = new THREE.Mesh(geo, matte(color))
  mesh.castShadow = true
  mesh.receiveShadow = true
  return mesh
}

/** 雉堞（城垛）：一排交替的实心齿与缺口。 */
export function crenellations(length: number, depth: number, color: string, merlonW = 0.7, gap = 0.55, h = 0.85): THREE.Group {
  const g = new THREE.Group()
  const step = merlonW + gap
  const count = Math.max(1, Math.floor(length / step))
  const geo = new THREE.BoxGeometry(merlonW, h, depth)
  const mat = matte(color)
  const start = -((count - 1) * step) / 2
  for (let i = 0; i < count; i++) {
    const m = new THREE.Mesh(geo, mat)
    m.position.set(start + i * step, h / 2, 0)
    m.castShadow = true
    m.receiveShadow = true
    g.add(m)
  }
  return g
}

/** 圆锥屋顶 + 顶饰（小球 / 旗杆）。 */
export function conicalRoof(r: number, h: number, color: string, seg = 20, finialColor = PALETTE.gold): THREE.Group {
  const g = new THREE.Group()
  const roof = cone(r, h, color, seg)
  roof.position.y = h / 2
  g.add(roof)
  // 屋檐外挑一圈
  const eave = cyl(r * 1.06, r * 1.06, h * 0.045, PALETTE.woodDark, seg)
  eave.position.y = h * 0.02
  g.add(eave)
  const ball = sphere(r * 0.11, finialColor, 10)
  ball.position.y = h + r * 0.08
  g.add(ball)
  const spike = cyl(r * 0.025, r * 0.025, h * 0.16, finialColor, 6)
  spike.position.y = h + h * 0.08
  g.add(spike)
  return g
}

/** 四棱锥屋顶（方塔用）。 */
export function pyramidRoof(w: number, d: number, h: number, color: string): THREE.Group {
  const g = new THREE.Group()
  const geo = new THREE.ConeGeometry(Math.hypot(w, d) / 2, h, 4)
  geo.rotateY(Math.PI / 4)
  const roof = new THREE.Mesh(geo, matte(color))
  roof.scale.set(w / Math.hypot(w, d), 1, d / Math.hypot(w, d))
  roof.position.y = h / 2
  roof.castShadow = true
  roof.receiveShadow = true
  g.add(roof)
  const eave = box(w * 1.08, h * 0.05, d * 1.08, PALETTE.woodDark)
  eave.position.y = h * 0.025
  g.add(eave)
  return g
}

/** 旗帜：杆 + 三角布，布面顶点会随风摆动（由调用方在动画里更新 userData.wave）。 */
export function flag(poleH: number, clothColor: string, clothW = 1.5, clothH = 0.9): THREE.Group {
  const g = new THREE.Group()
  const pole = cyl(0.05, 0.06, poleH, PALETTE.woodDeep, 8)
  pole.position.y = poleH / 2
  g.add(pole)
  const tip = sphere(0.11, PALETTE.gold, 8)
  tip.position.y = poleH
  g.add(tip)

  const segX = 8
  const segY = 5
  const geo = new THREE.PlaneGeometry(clothW, clothH, segX, segY)
  geo.translate(clothW / 2, 0, 0)
  const cloth = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({ color: new THREE.Color(clothColor), side: THREE.DoubleSide }))
  cloth.castShadow = true
  cloth.position.set(0.05, poleH - clothH / 2 - 0.12, 0)
  cloth.userData.wave = { segX, segY, clothW, base: geo.attributes.position.array.slice() as Float32Array }
  g.add(cloth)
  g.userData.cloth = cloth
  return g
}

/** 更新旗面波动。 */
export function waveFlag(cloth: THREE.Mesh, time: number, phase = 0, amp = 0.14): void {
  const data = cloth.userData.wave as { segX: number; segY: number; clothW: number; base: Float32Array } | undefined
  if (!data) return
  const pos = cloth.geometry.attributes.position as THREE.BufferAttribute
  const arr = pos.array as Float32Array
  const base = data.base
  for (let i = 0; i < arr.length; i += 3) {
    const x = base[i]
    const y = base[i + 1]
    const k = x / data.clothW
    arr[i + 2] = Math.sin(time * 3.1 + phase + k * 5.2) * amp * k * k + Math.sin(time * 5.3 + phase + y * 3) * amp * 0.25 * k
    arr[i + 1] = y + Math.cos(time * 2.6 + phase + k * 4) * amp * 0.18 * k
  }
  pos.needsUpdate = true
  cloth.geometry.computeVertexNormals()
}

/** 收集一个子树里所有旗帜布面，方便统一驱动。 */
export function collectCloths(root: THREE.Object3D, out: THREE.Mesh[] = []): THREE.Mesh[] {
  root.traverse((o) => {
    const m = o as THREE.Mesh
    if (m.isMesh && m.userData.wave) out.push(m)
  })
  return out
}
