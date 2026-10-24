import * as THREE from 'three';

/* ------------------------------------------------------------------ *
 *  尺寸与调色板 —— 小王子式的柔和水彩色
 * ------------------------------------------------------------------ */
export const ISLAND_R = 26;
export const PLATEAU_Y = 3.0;

export const PAL = {
  skyTop: 0x8fb8d8,
  skyMid: 0xd9e4e8,
  skyLow: 0xf7dcc0,
  sun: 0xffe6b8,
  star: 0xfff4d6,
  moon: 0xfff6df,

  grass: 0x9ec98b,
  grassDark: 0x83b27a,
  grassLight: 0xc2da9b,
  meadow: 0xb7d59a,
  soil: 0xc8a884,

  stone: 0xeadfc9,
  stoneWarm: 0xe3d3b7,
  stoneCool: 0xd8d2c4,
  stoneDark: 0xc5b79e,
  stoneLine: 0xb5a68c,
  rock: 0xc7a98f,
  rockPink: 0xd3ae9c,
  rockViolet: 0xa89ab8,
  rockDeep: 0x8d7f9c,

  roof: 0x8f9fb8,
  roofWarm: 0xc48d7c,
  roofTeal: 0x7fa3a8,
  roofPlum: 0x9a7f9b,
  wood: 0xb98a5e,
  woodDark: 0x8d6444,
  woodPale: 0xd6ad7c,

  gold: 0xecc06a,
  cream: 0xf7efdd,
  white: 0xfbf6ea,
  red: 0xc76b6b,
  wine: 0x9c5560,
  rose: 0xd97f8f,
  roseDeep: 0xb75b73,
  blue: 0x7d9fbf,
  lavender: 0xb9a6cb,
  wheat: 0xe4c983,
  fire: 0xffb066,
  water: 0x93c7d8,
  waterDeep: 0x6fa8bf,
  leaf: 0x86b07c,
  leafPale: 0xa9c791,
  fox: 0xdd8a55,
  skin: 0xf3d3b6,
  hair: 0xf0d28c,
  coat: 0x6d9b7f,
  scarf: 0xf0bf5c,
  nightTop: 0x2b3657,
  nightLow: 0x6b5f85,
};

/* ------------------------------------------------------------------ *
 *  确定性噪声（无依赖）
 * ------------------------------------------------------------------ */
function hash2(x, y) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
  return s - Math.floor(s);
}
export function vnoise(x, y) {
  const xi = Math.floor(x), yi = Math.floor(y);
  const xf = x - xi, yf = y - yi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const a = hash2(xi, yi), b = hash2(xi + 1, yi);
  const c = hash2(xi, yi + 1), d = hash2(xi + 1, yi + 1);
  return a * (1 - u) * (1 - v) + b * u * (1 - v) + c * (1 - u) * v + d * u * v;
}
export function fbm(x, y, oct = 4) {
  let sum = 0, amp = 0.5, freq = 1, norm = 0;
  for (let i = 0; i < oct; i++) {
    sum += amp * vnoise(x * freq, y * freq);
    norm += amp;
    amp *= 0.5;
    freq *= 2.03;
  }
  return sum / norm;
}
export const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
export const smoothstep = (a, b, x) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};
export const lerp = (a, b, t) => a + (b - a) * t;
export const rand = (a = 0, b = 1) => a + Math.random() * (b - a);

/* ------------------------------------------------------------------ *
 *  卡通渐变贴图（柔和四级）
 * ------------------------------------------------------------------ */
const gradientMap = (() => {
  const steps = [96, 150, 202, 246, 255];
  const data = new Uint8Array(steps.length * 4);
  steps.forEach((s, i) => {
    data[i * 4] = s;
    data[i * 4 + 1] = s;
    data[i * 4 + 2] = s;
    data[i * 4 + 3] = 255;
  });
  const tex = new THREE.DataTexture(data, steps.length, 1, THREE.RGBAFormat);
  tex.minFilter = THREE.NearestFilter;
  tex.magFilter = THREE.NearestFilter;
  tex.needsUpdate = true;
  return tex;
})();

export function mat(color, opts = {}) {
  const m = new THREE.MeshToonMaterial({
    color,
    gradientMap,
    ...opts,
  });
  return m;
}

/* ------------------------------------------------------------------ *
 *  几何小工具
 * ------------------------------------------------------------------ */
export function addFlat(geo) {
  return geo.toNonIndexed ? geo : geo; // placeholder for readability
}

export function mesh(geo, materialOrColor, opts = {}) {
  const material =
    materialOrColor && materialOrColor.isMaterial ? materialOrColor : mat(materialOrColor ?? 0xffffff, opts.material || {});
  const m = new THREE.Mesh(geo, material);
  m.castShadow = opts.castShadow ?? true;
  m.receiveShadow = opts.receiveShadow ?? true;
  if (opts.pos) m.position.set(opts.pos[0], opts.pos[1], opts.pos[2]);
  if (opts.rot) m.rotation.set(opts.rot[0], opts.rot[1], opts.rot[2]);
  if (opts.scale) m.scale.set(opts.scale[0], opts.scale[1], opts.scale[2]);
  if (opts.name) m.name = opts.name;
  return m;
}

export function flat(geo) {
  const g = geo.index ? geo.toNonIndexed() : geo;
  g.computeVertexNormals();
  return g;
}

export function box(w, h, d, color, opts = {}) {
  const geo = new THREE.BoxGeometry(w, h, d, opts.seg || 1, opts.seg || 1, opts.seg || 1);
  return mesh(geo, color, opts);
}

export function cyl(rTop, rBot, h, color, seg = 16, opts = {}) {
  const geo = new THREE.CylinderGeometry(rTop, rBot, h, seg, opts.hSeg || 1, !!opts.open);
  return mesh(geo, color, opts);
}

export function cone(r, h, color, seg = 16, opts = {}) {
  const geo = new THREE.ConeGeometry(r, h, seg);
  return mesh(geo, color, opts);
}

export function sph(r, color, opts = {}) {
  const geo = new THREE.SphereGeometry(r, opts.seg || 18, opts.seg2 || 14);
  return mesh(geo, color, opts);
}

export function ico(r, color, opts = {}) {
  const geo = new THREE.IcosahedronGeometry(r, opts.detail ?? 0);
  if (opts.flat !== false) flat(geo);
  return mesh(geo, color, opts);
}

export function torus(r, tube, color, opts = {}) {
  const geo = new THREE.TorusGeometry(r, tube, opts.radial || 8, opts.tubular || 24, opts.arc ?? Math.PI * 2);
  return mesh(geo, color, opts);
}

export function capsule(r, len, color, opts = {}) {
  const geo = new THREE.CapsuleGeometry(r, len, 4, 12);
  return mesh(geo, color, opts);
}

export function plane(w, h, color, opts = {}) {
  const geo = new THREE.PlaneGeometry(w, h, opts.seg || 1, opts.seg2 || 1);
  return mesh(geo, color, opts);
}

export function roundedBox(w, h, d, radius, color, opts = {}) {
  const r = Math.min(radius, w / 2 - 0.001, h / 2 - 0.001, d / 2 - 0.001);
  const shape = new THREE.Shape();
  const x = -w / 2 + r, y = -h / 2 + r;
  shape.moveTo(x, y - r);
  shape.lineTo(x, y);
  shape.quadraticCurveTo(x, y + r, x + r, y + r);
  shape.lineTo(-x - r, y + r);
  shape.quadraticCurveTo(-x, y + r, -x, y);
  shape.lineTo(-x, -y);
  shape.quadraticCurveTo(-x, -y - r, -x - r, -y - r);
  shape.lineTo(x + r, -y - r);
  shape.quadraticCurveTo(x, -y - r, x, -y);
  shape.closePath();
  const depth = Math.max(0.01, d - 2 * r);
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: r * 0.6,
    bevelThickness: r,
    curveSegments: 4,
  });
  geo.translate(0, 0, -depth / 2);
  return mesh(geo, color, opts);
}

export function lathe(profile, color, seg = 20, opts = {}) {
  const pts = profile.map((p) => new THREE.Vector2(p[0], p[1]));
  const geo = new THREE.LatheGeometry(pts, seg);
  return mesh(geo, color, opts);
}

/* 给单个网格加一圈描边（做成子节点，随缩放走） */
export function outline(obj, color = 0x4d4659, scale = 1.055, opacity = 0.65) {
  if (!obj.isMesh) return obj;
  const m = new THREE.Mesh(
    obj.geometry,
    new THREE.MeshBasicMaterial({ color, side: THREE.BackSide, transparent: true, opacity, depthWrite: false })
  );
  m.scale.setScalar(scale);
  m.renderOrder = -1;
  m.castShadow = false;
  m.receiveShadow = false;
  obj.add(m);
  return obj;
}

/* 拱形门洞墙（用带洞的挤出体） */
export function archWall(w, h, d, archW, archH, color, opts = {}) {
  const shape = new THREE.Shape();
  shape.moveTo(-w / 2, 0);
  shape.lineTo(w / 2, 0);
  shape.lineTo(w / 2, h);
  shape.lineTo(-w / 2, h);
  shape.closePath();

  const hw = archW / 2;
  const hole = new THREE.Path();
  hole.moveTo(-hw, 0);
  hole.lineTo(hw, 0);
  hole.lineTo(hw, archH - hw);
  hole.absarc(0, archH - hw, hw, 0, Math.PI, false);
  hole.lineTo(-hw, 0);
  shape.holes.push(hole);

  const geo = new THREE.ExtrudeGeometry(shape, { depth: d, bevelEnabled: false, curveSegments: 12 });
  geo.translate(0, 0, -d / 2);
  return mesh(geo, color, opts);
}

/* 尖拱窗：发光面 + 木框 + 十字棂 */
export function makeWindow(w, h, opts = {}) {
  const g = new THREE.Group();
  const glow = new THREE.Mesh(
    new THREE.PlaneGeometry(w, h),
    new THREE.MeshBasicMaterial({ color: opts.color ?? 0xffdca8, transparent: true, opacity: opts.glow ?? 0.92 })
  );
  glow.position.z = 0.01;
  glow.userData.isWindowGlow = true;
  g.add(glow);

  const frameMat = mat(opts.frame ?? PAL.woodDark);
  const t = opts.frameThick ?? 0.07;
  const top = h / 2, bottom = -h / 2;
  const side = (x) => {
    const b = new THREE.Mesh(new THREE.BoxGeometry(t, h, t * 2), frameMat);
    b.position.set(x, 0, 0.02);
    g.add(b);
  };
  side(-w / 2 + t / 2);
  side(w / 2 - t / 2);
  const topBar = new THREE.Mesh(new THREE.BoxGeometry(w, t, t * 2), frameMat);
  topBar.position.set(0, top - t / 2, 0.02);
  g.add(topBar);
  const botBar = topBar.clone();
  botBar.position.y = bottom + t / 2;
  g.add(botBar);
  if (opts.mullion !== false) {
    const mv = new THREE.Mesh(new THREE.BoxGeometry(t * 0.7, h, t * 2), frameMat);
    mv.position.z = 0.02;
    g.add(mv);
    const mh = new THREE.Mesh(new THREE.BoxGeometry(w, t * 0.7, t * 2), frameMat);
    mh.position.set(0, h * 0.12, 0.02);
    g.add(mh);
  }
  g.traverse((o) => {
    if (o.isMesh) {
      o.castShadow = false;
      o.receiveShadow = false;
    }
  });
  if (opts.outline) {
    const line = new THREE.Mesh(
      new THREE.PlaneGeometry(w + 0.14, h + 0.14),
      new THREE.MeshBasicMaterial({ color: 0x4d4659, transparent: true, opacity: 0.4 })
    );
    line.position.z = -0.03;
    g.add(line);
  }
  return g;
}

/* 布幡（可飘动） */
export function makeBanner(w, h, color, opts = {}) {
  const geo = new THREE.PlaneGeometry(w, h, 6, 10);
  const m = new THREE.Mesh(
    geo,
    new THREE.MeshToonMaterial({
      color,
      gradientMap,
      side: THREE.DoubleSide,
    })
  );
  m.castShadow = false;
  m.receiveShadow = false;
  m.userData.base = geo.attributes.position.array.slice();
  m.userData.phase = Math.random() * Math.PI * 2;
  m.userData.wave = opts.wave ?? 1;
  return m;
}

/* 把旗帜顶点做正弦扰动 */
export function waveBanner(banner, t) {
  const pos = banner.geometry.attributes.position;
  const base = banner.userData.base;
  const phase = banner.userData.phase;
  const amp = banner.userData.wave * 0.09;
  for (let i = 0; i < pos.count; i++) {
    const x = base[i * 3];
    const y = base[i * 3 + 1];
    pos.array[i * 3] = x;
    pos.array[i * 3 + 1] = y + Math.sin(t * 2.2 + phase + x * 2.4) * amp * 0.35;
    pos.array[i * 3 + 2] = Math.sin(t * 2.6 + phase + x * 2.8 + y * 0.6) * amp * (0.35 + Math.abs(x) * 0.6);
  }
  pos.needsUpdate = true;
}

/* 沿地形贴合的网格（XZ 网格，y 由传入函数决定） */
export function drapedPlane(w, d, segX, segZ, color, yFn, opts = {}) {
  const geo = new THREE.PlaneGeometry(w, d, segX, segZ);
  geo.rotateX(-Math.PI / 2);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i) + (opts.x || 0);
    const z = pos.getZ(i) + (opts.z || 0);
    pos.setY(i, yFn(x, z) + (opts.lift ?? 0.04));
  }
  geo.computeVertexNormals();
  return mesh(geo, color, opts);
}

/* 画布贴图助手 */
export function canvasTexture(w, h, draw) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d');
  draw(ctx, w, h);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

let glowTex = null;
export function glowTexture() {
  if (glowTex) return glowTex;
  glowTex = canvasTexture(128, 128, (ctx, w, h) => {
    const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.35, 'rgba(255,240,210,0.55)');
    g.addColorStop(1, 'rgba(255,240,210,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  });
  return glowTex;
}

export function glowSprite(size = 2, color = 0xffe3b0, opacity = 0.8) {
  const s = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: glowTexture(),
      color,
      transparent: true,
      opacity,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  );
  s.scale.set(size, size, 1);
  return s;
}

/* 小工具：把一个 group 里的所有 mesh 统一开关阴影 */
export function shadowAll(obj, cast = true, receive = true) {
  obj.traverse((o) => {
    if (o.isMesh) {
      o.castShadow = cast;
      o.receiveShadow = receive;
    }
  });
  return obj;
}