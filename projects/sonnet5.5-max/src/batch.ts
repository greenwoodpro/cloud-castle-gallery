import * as THREE from 'three'
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'
import { noise2 } from './noise'

export type V3 = [number, number, number]
const Z3: V3 = [0, 0, 0]
const UP = new THREE.Vector3(0, 1, 0)

const _c = new THREE.Color()
const _e = new THREE.Euler()
const _q = new THREE.Quaternion()
const _p = new THREE.Vector3()
const _s = new THREE.Vector3()
const _m = new THREE.Matrix4()

/**
 * 把大量小几何体合并为一个带顶点色的网格。
 * 所有位置都是「中心点」坐标；at() 返回带局部坐标系的子批处理。
 */
export class Batch {
  readonly geos: THREE.BufferGeometry[]
  private base: THREE.Matrix4 | null

  constructor(public jitter = 0.05, geos?: THREE.BufferGeometry[], base?: THREE.Matrix4 | null) {
    this.geos = geos ?? []
    this.base = base ?? null
  }

  at(x: number, y: number, z: number, ry = 0, sc = 1): Batch {
    const m = new THREE.Matrix4().compose(
      new THREE.Vector3(x, y, z),
      new THREE.Quaternion().setFromAxisAngle(UP, ry),
      new THREE.Vector3(sc, sc, sc),
    )
    return new Batch(this.jitter, this.geos, this.base ? this.base.clone().multiply(m) : m)
  }

  add(
    g: THREE.BufferGeometry,
    color: THREE.ColorRepresentation,
    p: V3 = Z3,
    r: V3 = Z3,
    s: V3 | number = 1,
    jit = this.jitter,
    own = false,
  ) {
    let geo = own ? g : g.clone()
    if (geo.index) {
      const ni = geo.toNonIndexed()
      geo.dispose()
      geo = ni
    }
    if (geo.getAttribute('uv')) geo.deleteAttribute('uv')
    const sc = typeof s === 'number' ? [s, s, s] : s
    _e.set(r[0], r[1], r[2])
    _q.setFromEuler(_e)
    _m.compose(_p.set(p[0], p[1], p[2]), _q, _s.set(sc[0], sc[1], sc[2]))
    if (this.base) _m.premultiply(this.base)
    geo.applyMatrix4(_m)

    _c.set(color)
    const br = _c.r
    const bg = _c.g
    const bb = _c.b
    const pos = geo.getAttribute('position')
    const n = pos.count
    const col = new Float32Array(n * 3)
    for (let i = 0; i < n; i++) {
      const x = pos.getX(i)
      const y = pos.getY(i)
      const z = pos.getZ(i)
      const k = jit === 0 ? 1 : 1 + (noise2(x * 0.85 + z * 0.55, y * 0.7 + z * 0.4) - 0.5) * 2 * jit
      col[i * 3] = br * k
      col[i * 3 + 1] = bg * (1 + (k - 1) * 0.85)
      col[i * 3 + 2] = bb * (1 + (k - 1) * 1.1)
    }
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3))
    this.geos.push(geo)
  }

  box(w: number, h: number, d: number, p: V3, color: THREE.ColorRepresentation, r: V3 = Z3, jit?: number) {
    this.add(new THREE.BoxGeometry(w, h, d), color, p, r, 1, jit, true)
  }

  cyl(
    rt: number,
    rb: number,
    h: number,
    p: V3,
    color: THREE.ColorRepresentation,
    seg = 10,
    r: V3 = Z3,
    s: V3 | number = 1,
    jit?: number,
  ) {
    this.add(new THREE.CylinderGeometry(rt, rb, h, seg), color, p, r, s, jit, true)
  }

  cone(r: number, h: number, p: V3, color: THREE.ColorRepresentation, seg = 10, rot: V3 = Z3, s: V3 | number = 1, jit?: number) {
    this.add(new THREE.ConeGeometry(r, h, seg), color, p, rot, s, jit, true)
  }

  sph(r: number, p: V3, color: THREE.ColorRepresentation, s: V3 | number = 1, seg = 10, jit?: number) {
    this.add(new THREE.SphereGeometry(r, seg, Math.max(5, Math.round(seg * 0.7))), color, p, Z3, s, jit, true)
  }

  tor(R: number, r: number, p: V3, color: THREE.ColorRepresentation, rot: V3 = Z3, seg = 14, jit?: number) {
    this.add(new THREE.TorusGeometry(R, r, 6, seg), color, p, rot, 1, jit, true)
  }

  /** 两点之间的圆杆（栏杆、锁链、长矛、绳索） */
  rod(a: V3, b: V3, r: number, color: THREE.ColorRepresentation, seg = 6) {
    const dir = new THREE.Vector3(b[0] - a[0], b[1] - a[1], b[2] - a[2])
    const len = dir.length()
    if (len < 1e-5) return
    const q = new THREE.Quaternion().setFromUnitVectors(UP, dir.normalize())
    const e = new THREE.Euler().setFromQuaternion(q)
    this.cyl(r, r, len, [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2], color, seg, [e.x, e.y, e.z], 1, 0)
  }

  /** 两点之间的方梁 */
  beam(a: V3, b: V3, w: number, h: number, color: THREE.ColorRepresentation) {
    const dir = new THREE.Vector3(b[0] - a[0], b[1] - a[1], b[2] - a[2])
    const len = dir.length()
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), dir.normalize())
    const e = new THREE.Euler().setFromQuaternion(q)
    this.box(w, h, len, [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2], color, [e.x, e.y, e.z])
  }

  /** 屋脊朝 x 轴方向的人字屋顶（底面在 y=0 平面，中心在原点） */
  gable(w: number, d: number, h: number, p: V3, color: THREE.ColorRepresentation, ry = 0) {
    const shape = new THREE.Shape()
    shape.moveTo(-w / 2, 0)
    shape.lineTo(w / 2, 0)
    shape.lineTo(0, h)
    shape.closePath()
    const g = new THREE.ExtrudeGeometry(shape, { depth: d, bevelEnabled: false })
    g.translate(0, 0, -d / 2)
    this.add(g, color, p, [0, ry, 0], 1, undefined, true)
  }

  /** 四坡屋顶 / 角锥顶 */
  hip(w: number, d: number, h: number, p: V3, color: THREE.ColorRepresentation) {
    const g = new THREE.ConeGeometry(w / Math.SQRT2, h, 4)
    g.rotateY(Math.PI / 4)
    this.add(g, color, p, Z3, [1, 1, d / w], undefined, true)
  }

  geometry(): THREE.BufferGeometry | null {
    if (!this.geos.length) return null
    const g = mergeGeometries(this.geos, false)
    return g
  }

  build(material: THREE.Material, cast = true, receive = true): THREE.Mesh | null {
    const g = this.geometry()
    if (!g) return null
    g.computeBoundingSphere()
    const mesh = new THREE.Mesh(g, material)
    mesh.castShadow = cast
    mesh.receiveShadow = receive
    return mesh
  }
}

/** 实体 + 自发光两套批处理 */
export class Kit {
  constructor(
    public s: Batch = new Batch(0.05),
    public g: Batch = new Batch(0),
  ) {}

  at(x: number, y: number, z: number, ry = 0, sc = 1): Kit {
    return new Kit(this.s.at(x, y, z, ry, sc), this.g.at(x, y, z, ry, sc))
  }
}
