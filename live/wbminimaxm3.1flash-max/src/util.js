import * as THREE from 'three';

export const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
export const lerp = (a, b, t) => a + (b - a) * t;
export const smoothstep = (e0, e1, x) => {
  const t = clamp((x - e0) / (e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
};
export const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
export const TAU = Math.PI * 2;

export function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hash2(ix, iy, seed) {
  let h = Math.imul(ix, 374761393) ^ Math.imul(iy, 668265263) ^ Math.imul(seed | 0, 1442695041);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

/** 二维值噪声，返回 0..1 */
export function noise2(x, y, seed = 0) {
  const ix = Math.floor(x), iy = Math.floor(y);
  const fx = x - ix, fy = y - iy;
  const ux = fx * fx * (3 - 2 * fx);
  const uy = fy * fy * (3 - 2 * fy);
  const a = hash2(ix, iy, seed);
  const b = hash2(ix + 1, iy, seed);
  const c = hash2(ix, iy + 1, seed);
  const d = hash2(ix + 1, iy + 1, seed);
  return lerp(lerp(a, b, ux), lerp(c, d, ux), uy);
}

/** 分形叠加噪声 */
export function fbm(x, y, seed = 0, octaves = 4, gain = 0.5) {
  let v = 0, amp = 1, freq = 1, norm = 0;
  for (let i = 0; i < octaves; i++) {
    v += amp * noise2(x * freq, y * freq, seed + i * 17);
    norm += amp;
    amp *= gain;
    freq *= 2;
  }
  return v / norm;
}

/** 由画布生成纹理 */
export function canvasTexture(size, draw, opts = {}) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  draw(ctx, size);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(opts.repeat ? opts.repeat[0] : 1, opts.repeat ? opts.repeat[1] : 1);
  if (opts.srgb !== false) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = opts.aniso ?? 8;
  if (opts.offset) t.offset.set(opts.offset[0], opts.offset[1]);
  return t;
}

/** 简易 3D 网格线描边：加一个背面外扩壳，模拟绘本描边 */
export function addOutline(mesh, color = 0x5a4a3c, scale = 1.035) {
  if (!mesh.geometry) return null;
  const mat = new THREE.MeshBasicMaterial({
    color,
    side: THREE.BackSide,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
  });
  const shell = new THREE.Mesh(mesh.geometry, mat);
  shell.scale.setScalar(scale);
  shell.renderOrder = (mesh.renderOrder || 0) - 1;
  mesh.add(shell);
  return shell;
}

/** 给一组网格批量描边 */
export function outlineAll(root, color, scale = 1.035) {
  const targets = [];
  root.traverse((o) => {
    if (o.isMesh && !o.userData.noOutline && o.geometry.type !== 'PlaneGeometry') targets.push(o);
  });
  targets.forEach((m) => addOutline(m, color, scale));
  return root;
}

export const MAT = {
  grass: 0x8fae5c,
  grassDark: 0x6f9147,
  rock: 0xb3a08b,
  rockDark: 0x7d6c5c,
  stone: 0xe7dbc4,
  stoneWarm: 0xdccbb0,
  stoneDark: 0xc3b096,
  roof: 0xc9643f,
  roofDark: 0xa44e30,
  wood: 0x8a5f3c,
  woodDark: 0x5f4029,
  iron: 0x4a4a52,
  gold: 0xe8b64c,
  red: 0xd24a44,
  blue: 0x3f6fb5,
  cream: 0xf6ead2,
  glass: 0xcfe6e2,
  water: 0x6fb6c4,
  green: 0x6f9a4a,
  greenDark: 0x4d7a34,
};

/** 让材质保持绘本感：低金属度、高粗糙 */
export function matte(color, extra = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.94,
    metalness: 0.0,
    ...extra,
  });
}

/** 随机点分布（泊松式抖动） */
export function scatter(radius, count, rand, innerR = 0) {
  const out = [];
  for (let i = 0; i < count; i++) {
    const r = innerR + Math.sqrt(rand()) * (radius - innerR);
    const a = rand() * TAU;
    out.push(new THREE.Vector2(Math.cos(a) * r, Math.sin(a) * r));
  }
  return out;
}
