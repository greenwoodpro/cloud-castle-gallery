/* 调色盘与几何工具 —— 小王子水彩手记 */
import * as T from '../vendor/three.module.js';

export const TAU = Math.PI * 2;
export const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
export const lerp = (a, b, t) => a + (b - a) * t;
export const smooth = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };

export function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6D2B79F5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
export const rand = rng(20261106);

export const COL = {
  stone: 0xf2e5cd, stone2: 0xe5d4b8, stoneDk: 0xc9b393, stoneShade: 0xd8c5a6,
  wood: 0xba8b60, woodDk: 0x8b6546, woodLt: 0xd2ad83,
  roofBlue: 0x8fa9b8, roofRed: 0xb87c6f, roofMoss: 0x8ca98d, roofDark: 0x76919f,
  grass: 0xa9c291, grass2: 0x93b383, grassLt: 0xc3d3a6,
  rock: 0xc3a98e, rock2: 0xa98e79, rockDeep: 0x8d7a78, rockLt: 0xd8c0a4,
  water: 0x9ac9d2, waterDeep: 0x79b0bd, sand: 0xe8d6af, wheat: 0xe0c17e,
  ink: 0x6b5a49, gold: 0xf0c987, warm: 0xffd9a0, flame: 0xffb86b,
  rose: 0xd97b78, roseDk: 0xb85e63, fox: 0xd9905a, prince: 0x7fa88a,
  skyBlue: 0x9fbcd0, linen: 0xfaf3e6, purple: 0xb9a6c4,
};

const matCache = new Map();
export function M(color, opts = {}) {
  const key = color + '|' + JSON.stringify(opts);
  if (!matCache.has(key)) matCache.set(key, new T.MeshLambertMaterial({ color, ...opts }));
  return matCache.get(key);
}
/* 独占材质：剖面动画等需要单独改透明度 */
export function MU(color, opts = {}) { return new T.MeshLambertMaterial({ color, ...opts }); }
export function B(color, opts = {}) { return new T.MeshBasicMaterial({ color, ...opts }); }

/* 复用单位几何体，靠 scale 变形，省显存 */
export const GEO = {
  box: new T.BoxGeometry(1, 1, 1),
  cyl: new T.CylinderGeometry(1, 1, 1, 16),
  cyl8: new T.CylinderGeometry(1, 1, 1, 8),
  cyl24: new T.CylinderGeometry(1, 1, 1, 24),
  cone: new T.ConeGeometry(1, 1, 16),
  cone8: new T.ConeGeometry(1, 1, 8),
  cone4: new T.ConeGeometry(1, 1, 4),
  sphere: new T.SphereGeometry(1, 16, 12),
  sphere8: new T.IcosahedronGeometry(1, 1),
  plane: new T.PlaneGeometry(1, 1),
  torus: new T.TorusGeometry(1, 0.12, 8, 28),
  capsule: new T.CapsuleGeometry(1, 1, 4, 10),
  circle: new T.CircleGeometry(1, 32),
};

export function put(parent, geo, mat, x = 0, y = 0, z = 0, sx = 1, sy = 1, sz = 1, rx = 0, ry = 0, rz = 0) {
  const m = new T.Mesh(geo, mat);
  m.position.set(x, y, z); m.scale.set(sx, sy, sz); m.rotation.set(rx, ry, rz);
  m.castShadow = true; m.receiveShadow = true;
  parent.add(m);
  return m;
}
export function box(p, w, h, d, m, x, y, z, ry = 0) { return put(p, GEO.box, m, x, y, z, w, h, d, 0, ry, 0); }
export function cyl(p, r, h, m, x, y, z, seg = 16) {
  return put(p, seg === 8 ? GEO.cyl8 : seg === 24 ? GEO.cyl24 : GEO.cyl, m, x, y, z, r, h, r);
}
export function cone(p, r, h, m, x, y, z, seg = 16) {
  return put(p, seg === 8 ? GEO.cone8 : seg === 4 ? GEO.cone4 : GEO.cone, m, x, y, z, r, h, r);
}
export function ball(p, r, m, x, y, z, sy = 1, sz = 1) { return put(p, GEO.sphere, m, x, y, z, r, r * sy, r * sz); }
export function quad(p, w, h, m, x, y, z, rx = 0, ry = 0, rz = 0) { return put(p, GEO.plane, m, x, y, z, w, h, 1, rx, ry, rz); }

export function instances(parent, geo, mat, arr, shadows = false) {
  if (!arr.length) return null;
  const im = new T.InstancedMesh(geo, mat, arr.length);
  const d = new T.Object3D();
  const c = new T.Color();
  for (let i = 0; i < arr.length; i++) {
    const o = arr[i];
    d.position.set(o.x, o.y, o.z);
    d.rotation.set(o.rx || 0, o.ry || 0, o.rz || 0);
    d.scale.set(o.sx ?? 1, o.sy ?? 1, o.sz ?? 1);
    d.updateMatrix(); im.setMatrixAt(i, d.matrix);
    if (o.color !== undefined) im.setColorAt(i, c.setHex(o.color));
  }
  im.instanceMatrix.needsUpdate = true;
  im.castShadow = shadows; im.receiveShadow = shadows;
  parent.add(im);
  return im;
}

/* 细墨线：只给主要体块点缀，避免变成工程图 */
export function ink(mesh, opacity = 0.15, color = COL.ink) {
  const e = new T.LineSegments(
    new T.EdgesGeometry(mesh.geometry, 24),
    new T.LineBasicMaterial({ color, transparent: true, opacity, depthWrite: false })
  );
  e.position.copy(mesh.position); e.rotation.copy(mesh.rotation);
  e.scale.copy(mesh.scale).multiplyScalar(1.004);
  mesh.parent.add(e);
  return e;
}

/* 径向光斑贴图（星点 / 光晕 / 窗光） */
let glowTex = null;
export function glowTexture() {
  if (glowTex) return glowTex;
  const cv = document.createElement('canvas'); cv.width = cv.height = 128;
  const g = cv.getContext('2d');
  const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  gr.addColorStop(0, 'rgba(255,255,255,1)');
  gr.addColorStop(0.22, 'rgba(255,255,255,.78)');
  gr.addColorStop(0.55, 'rgba(255,255,255,.20)');
  gr.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 128, 128);
  glowTex = new T.CanvasTexture(cv);
  glowTex.colorSpace = T.SRGBColorSpace;
  return glowTex;
}
export function halo(parent, color, size, x, y, z, opacity = 0.9) {
  const s = new T.Sprite(new T.SpriteMaterial({
    map: glowTexture(), color, transparent: true, opacity,
    blending: T.AdditiveBlending, depthWrite: false, depthTest: true, fog: false,
  }));
  s.position.set(x, y, z); s.scale.set(size, size, 1);
  parent.add(s);
  return s;
}

/* 半透明水彩贴片（云、烟雾、瀑布）用的软边贴图 */
let softTex = null;
export function softTexture() {
  if (softTex) return softTex;
  const cv = document.createElement('canvas'); cv.width = cv.height = 128;
  const g = cv.getContext('2d');
  const gr = g.createRadialGradient(64, 64, 8, 64, 64, 64);
  gr.addColorStop(0, 'rgba(255,255,255,.95)');
  gr.addColorStop(0.5, 'rgba(255,255,255,.55)');
  gr.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 128, 128);
  softTex = new T.CanvasTexture(cv);
  return softTex;
}

export function group(parent, x = 0, y = 0, z = 0) {
  const g = new T.Group(); g.position.set(x, y, z); parent.add(g); return g;
}

/* 两点之间的细杆：铁链、长矛、支架、旗绳 */
export function rod(parent, a, b, r, mat) {
  const A = new T.Vector3(a[0], a[1], a[2]);
  const B = new T.Vector3(b[0], b[1], b[2]);
  const v = new T.Vector3().subVectors(B, A);
  const m = new T.Mesh(new T.CylinderGeometry(r, r, v.length(), 8), mat);
  m.position.copy(A).add(B).multiplyScalar(0.5);
  m.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), v.normalize());
  m.castShadow = true;
  parent.add(m);
  return m;
}
