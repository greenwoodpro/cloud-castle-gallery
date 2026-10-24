import * as THREE from 'three';

export const P = {
  grass: 0x94c17f,
  grassLight: 0xbddc9a,
  grassDeep: 0x76a874,
  grassShade: 0x68956b,
  soil: 0xa88b6f,
  stone: 0xecd8b9,
  stoneLight: 0xf8ecd4,
  stoneDim: 0xd5bda0,
  stoneDark: 0xb69b7d,
  rock: [0xd3ad8d, 0xbc9277, 0xdfc2a2, 0xa9826b, 0xc8a482],
  roof: 0x8aa7c4,
  roofDeep: 0x728fab,
  roofRose: 0xd59c9f,
  gold: 0xe9c97f,
  goldDeep: 0xc7a159,
  wood: 0x9a6b50,
  woodLight: 0xbf9270,
  woodDark: 0x6d4a39,
  cream: 0xfff3df,
  paper: 0xfff8ea,
  white: 0xfffbf2,
  water: 0x8fcbdb,
  waterDeep: 0x6aacbf,
  leaf: 0x86b67f,
  leafLight: 0xaacf93,
  leafDeep: 0x639270,
  leafBlue: 0x8fb3a4,
  pink: 0xf3b6b7,
  rose: 0xe48f96,
  red: 0xc4656b,
  lavender: 0xc5b5dd,
  butter: 0xf4dfa4,
  brown: 0x8b6a55,
  dark: 0x4b423e,
  iron: 0x5a5a5e,
  skin: 0xf6d8c0,
  skinWarm: 0xefc9ae,
  hairBlond: 0xf2d078,
  hairBrown: 0x7d5b46,
  hairDark: 0x4a3a35,
};

export const LAYOUT = {
  platform: { x: -2, y: 3, z: -5.5, r: 8.9 },
  garden: { x: 6.8, z: 9.5 },
  pond: { x: -9.2, z: 7.9 },
  stairsBottom: { x: -2, z: 7.3 },
};

let _seed = 20261021;
function nextRandom() {
  _seed |= 0;
  _seed = (_seed + 0x6d2b79f5) | 0;
  let t = Math.imul(_seed ^ (_seed >>> 15), 1 | _seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}
export function rnd(a = 0, b = 1) {
  return a + nextRandom() * (b - a);
}
export function rndInt(a, b) {
  return Math.floor(rnd(a, b + 1));
}
export function pick(arr) {
  return arr[Math.floor(nextRandom() * arr.length)];
}
export function hash2(x, y) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
}
export function smoothstep(edge0, edge1, x) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}
export const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
export const lerp = (a, b, t) => a + (b - a) * t;
export const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export const updaters = [];
export function onFrame(fn) {
  updaters.push(fn);
}
export function tickUpdaters(t, dt) {
  for (let i = 0; i < updaters.length; i++) updaters[i](t, dt);
}

let _gradient = null;
export function gradientMap() {
  if (!_gradient) {
    const levels = new Uint8Array([124, 158, 192, 222, 243, 255]);
    const tex = new THREE.DataTexture(levels, levels.length, 1, THREE.RedFormat);
    tex.minFilter = THREE.NearestFilter;
    tex.magFilter = THREE.NearestFilter;
    tex.generateMipmaps = false;
    tex.unpackAlignment = 1;
    tex.needsUpdate = true;
    _gradient = tex;
  }
  return _gradient;
}

const _toonCache = new Map();
export function toon(color, opts = null) {
  if (!opts || Object.keys(opts).length === 0) {
    const key = typeof color === 'number' ? color : String(color);
    if (!_toonCache.has(key)) {
      _toonCache.set(key, new THREE.MeshToonMaterial({ color, gradientMap: gradientMap() }));
    }
    return _toonCache.get(key);
  }
  return new THREE.MeshToonMaterial({ color, gradientMap: gradientMap(), ...opts });
}

const _basicCache = new Map();
export function basic(color, opts = null) {
  if (!opts || Object.keys(opts).length === 0) {
    if (!_basicCache.has(color)) _basicCache.set(color, new THREE.MeshBasicMaterial({ color }));
    return _basicCache.get(color);
  }
  return new THREE.MeshBasicMaterial({ color, ...opts });
}

export function resolveMat(color, opts) {
  if (color && color.isMaterial) return color;
  return toon(color, opts);
}

const G = {
  box: new THREE.BoxGeometry(1, 1, 1),
  sphere: new THREE.SphereGeometry(1, 20, 14),
  sphereLow: new THREE.SphereGeometry(1, 10, 8),
  icosa: new THREE.IcosahedronGeometry(1, 1),
};

export function box(parent, w, h, d, color, x = 0, y = 0, z = 0, opts = {}) {
  const m = new THREE.Mesh(G.box, resolveMat(color, opts.matOpts));
  m.position.set(x, y, z);
  m.scale.set(w, h, d);
  if (opts.rot) m.rotation.set(opts.rot[0] || 0, opts.rot[1] || 0, opts.rot[2] || 0);
  m.castShadow = opts.cast !== false;
  m.receiveShadow = opts.receive !== false;
  if (opts.name) m.name = opts.name;
  parent.add(m);
  return m;
}

export function sphere(parent, radius, color, x = 0, y = 0, z = 0, opts = {}) {
  const m = new THREE.Mesh(opts.low ? G.sphereLow : G.sphere, resolveMat(color, opts.matOpts));
  m.position.set(x, y, z);
  if (Array.isArray(opts.scale)) m.scale.set(radius * opts.scale[0], radius * opts.scale[1], radius * opts.scale[2]);
  else m.scale.setScalar(radius * (opts.scale || 1));
  if (opts.rot) m.rotation.set(opts.rot[0] || 0, opts.rot[1] || 0, opts.rot[2] || 0);
  m.castShadow = opts.cast !== false;
  m.receiveShadow = opts.receive !== false;
  parent.add(m);
  return m;
}

export function ico(parent, radius, color, x = 0, y = 0, z = 0, opts = {}) {
  const m = new THREE.Mesh(G.icosa, resolveMat(color, opts.matOpts));
  m.position.set(x, y, z);
  m.scale.setScalar(radius);
  if (opts.scale) m.scale.set(radius * opts.scale[0], radius * opts.scale[1], radius * opts.scale[2]);
  if (opts.rot) m.rotation.set(opts.rot[0] || 0, opts.rot[1] || 0, opts.rot[2] || 0);
  m.castShadow = opts.cast !== false;
  m.receiveShadow = opts.receive !== false;
  parent.add(m);
  return m;
}

const _coneGeos = new Map();
export function cone(parent, radius, height, color, x = 0, y = 0, z = 0, opts = {}) {
  const seg = opts.segments || 16;
  const key = seg + ':' + (opts.open ? 1 : 0);
  let geo = _coneGeos.get(key);
  if (!geo) {
    geo = new THREE.ConeGeometry(1, 1, seg, 1, !!opts.open);
    _coneGeos.set(key, geo);
  }
  const m = new THREE.Mesh(geo, resolveMat(color, opts.matOpts));
  m.position.set(x, y, z);
  m.scale.set(radius, height, radius);
  if (opts.rot) m.rotation.set(opts.rot[0] || 0, opts.rot[1] || 0, opts.rot[2] || 0);
  m.castShadow = opts.cast !== false;
  m.receiveShadow = opts.receive !== false;
  parent.add(m);
  return m;
}

export function cyl(parent, rTop, rBottom, h, color, x = 0, y = 0, z = 0, opts = {}) {
  const geo = new THREE.CylinderGeometry(rTop, rBottom, h, opts.segments || 16, 1, !!opts.open);
  const m = new THREE.Mesh(geo, resolveMat(color, opts.matOpts));
  m.position.set(x, y, z);
  if (opts.rot) m.rotation.set(opts.rot[0] || 0, opts.rot[1] || 0, opts.rot[2] || 0);
  if (opts.scale) m.scale.set(opts.scale[0], opts.scale[1], opts.scale[2]);
  m.castShadow = opts.cast !== false;
  m.receiveShadow = opts.receive !== false;
  parent.add(m);
  return m;
}

export function disc(parent, radius, color, x = 0, y = 0, z = 0, opts = {}) {
  const geo = new THREE.CircleGeometry(radius, opts.segments || 40);
  const m = new THREE.Mesh(geo, resolveMat(color, opts.matOpts));
  m.rotation.x = -Math.PI / 2;
  if (opts.rot) m.rotation.set(opts.rot[0], opts.rot[1], opts.rot[2]);
  m.position.set(x, y, z);
  m.castShadow = opts.cast !== false;
  m.receiveShadow = opts.receive !== false;
  parent.add(m);
  return m;
}

export function addMesh(parent, geo, mat, pos = [0, 0, 0], opts = {}) {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(pos[0], pos[1], pos[2]);
  if (opts.rot) m.rotation.set(opts.rot[0] || 0, opts.rot[1] || 0, opts.rot[2] || 0);
  if (opts.scale) m.scale.set(opts.scale[0], opts.scale[1], opts.scale[2]);
  m.castShadow = opts.cast !== false;
  m.receiveShadow = opts.receive !== false;
  parent.add(m);
  return m;
}

export function makeCanvasTexture(w, h, draw) {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  draw(ctx, w, h);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

let _glowTex = null;
export function glowTexture() {
  if (_glowTex) return _glowTex;
  _glowTex = makeCanvasTexture(256, 256, (ctx, w, h) => {
    const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.18, 'rgba(255,255,250,0.85)');
    g.addColorStop(0.45, 'rgba(255,240,210,0.32)');
    g.addColorStop(1, 'rgba(255,230,190,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  });
  return _glowTex;
}

let _cloudTex = null;
export function cloudTexture() {
  if (_cloudTex) return _cloudTex;
  _cloudTex = makeCanvasTexture(512, 512, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    const blobs = 26;
    for (let i = 0; i < blobs; i++) {
      const bx = w * (0.18 + 0.64 * rnd());
      const by = h * (0.32 + 0.36 * rnd());
      const br = w * (0.06 + 0.16 * rnd());
      const g = ctx.createRadialGradient(bx, by, 0, bx, by, br);
      g.addColorStop(0, 'rgba(255,252,246,0.5)');
      g.addColorStop(0.55, 'rgba(255,246,238,0.28)');
      g.addColorStop(1, 'rgba(255,240,232,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(bx, by, br, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalCompositeOperation = 'source-atop';
    const sh = ctx.createLinearGradient(0, h * 0.4, 0, h * 0.8);
    sh.addColorStop(0, 'rgba(255,250,245,0.05)');
    sh.addColorStop(1, 'rgba(240,205,205,0.22)');
    ctx.fillStyle = sh;
    ctx.fillRect(0, 0, w, h);
  });
  return _cloudTex;
}

export function glowSprite(parent, color, scale, x, y, z, opacity = 0.75) {
  const mat = new THREE.SpriteMaterial({
    map: glowTexture(),
    color,
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    toneMapped: false,
  });
  const s = new THREE.Sprite(mat);
  s.scale.set(scale, scale, 1);
  s.position.set(x, y, z);
  parent.add(s);
  return s;
}

export function cobbleTexture() {
  const tex = makeCanvasTexture(512, 512, (ctx, w, h) => {
    ctx.fillStyle = '#cbb79d';
    ctx.fillRect(0, 0, w, h);
    const palette = ['#e3d2ba', '#d9c6ab', '#ccb79c', '#eadac3', '#d3bda2', '#dfcab0'];
    let y = -20;
    let row = 0;
    while (y < h + 30) {
      const rh = 36 + rnd() * 18;
      let x = row % 2 === 0 ? -28 : -4;
      while (x < w + 30) {
        const rw = 44 + rnd() * 58;
        const cx = x + rw / 2 + rnd(-3, 3);
        const cy = y + rh / 2 + rnd(-3, 3);
        const rx = rw / 2 - 3;
        const ry = rh / 2 - 3;
        ctx.beginPath();
        const n = 9;
        for (let i = 0; i <= n; i++) {
          const a = (i / n) * Math.PI * 2;
          const wob = 0.86 + 0.14 * Math.sin(i * 2.3 + cx * 0.1) + rnd(-0.03, 0.03);
          const px = cx + Math.cos(a) * rx * wob;
          const py = cy + Math.sin(a) * ry * wob;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fillStyle = pick(palette);
        ctx.fill();
        ctx.strokeStyle = 'rgba(126,104,82,0.24)';
        ctx.lineWidth = 2.2;
        ctx.stroke();
        ctx.strokeStyle = 'rgba(255,250,240,0.2)';
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.ellipse(cx - rx * 0.12, cy - ry * 0.2, rx * 0.62, ry * 0.42, -0.1, Math.PI * 0.9, Math.PI * 1.9);
        ctx.stroke();
        x += rw + 7 + rnd() * 5;
      }
      y += rh + 7;
      row++;
    }
    for (let i = 0; i < 900; i++) {
      ctx.fillStyle = rnd() > 0.5 ? 'rgba(255,255,255,0.05)' : 'rgba(90,70,50,0.045)';
      ctx.fillRect(rnd() * w, rnd() * h, 2, 2);
    }
  });
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(5, 5);
  return tex;
}

export function bannerTexture(kind = 'blue') {
  const blue = kind === 'blue';
  const bg1 = blue ? '#7d9dbe' : '#cf9097';
  const bg2 = blue ? '#5c7d9f' : '#b1717c';
  return makeCanvasTexture(256, 512, (ctx, w, h) => {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, bg1);
    g.addColorStop(0.55, bg2);
    g.addColorStop(1, bg1);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 40; i++) {
      ctx.fillStyle = 'rgba(255,255,255,0.03)';
      ctx.fillRect(rnd() * w, 0, 1 + rnd() * 3, h);
    }
    ctx.strokeStyle = '#e9c97f';
    ctx.lineWidth = 9;
    ctx.strokeRect(12, 12, w - 24, h - 24);
    ctx.strokeStyle = 'rgba(120,80,50,0.35)';
    ctx.lineWidth = 2;
    ctx.strokeRect(24, 24, w - 48, h - 48);
    ctx.save();
    ctx.translate(w / 2, h * 0.42);
    ctx.fillStyle = '#f5dc9d';
    ctx.beginPath();
    for (let i = 0; i < 10; i++) {
      const a = -Math.PI / 2 + (i * Math.PI) / 5;
      const r = i % 2 === 0 ? 52 : 22;
      ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    ctx.strokeStyle = '#f0d595';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(w / 2, h * 0.42, 72, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = 'rgba(250,237,205,0.9)';
    ctx.font = 'italic 24px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('petit', w / 2, h * 0.76);
    ctx.fillText('royaume', w / 2, h * 0.83);
    for (let i = 0; i < 13; i++) {
      ctx.beginPath();
      const fx = 36 + i * 15;
      ctx.moveTo(fx, h - 28);
      ctx.lineTo(fx, h - 10);
      ctx.lineTo(fx + 5, h - 18);
      ctx.lineTo(fx + 10, h - 10);
      ctx.lineTo(fx + 10, h - 28);
      ctx.fillStyle = '#e9c97f';
      ctx.fill();
    }
  });
}

export function tapestryTexture(variant = 0) {
  const bg = variant === 0 ? '#c7b49c' : '#b8a9bf';
  return makeCanvasTexture(384, 512, (ctx, w, h) => {
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, 'rgba(255,248,235,0.25)');
    g.addColorStop(1, 'rgba(70,50,40,0.22)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = '#e2c687';
    ctx.lineWidth = 16;
    ctx.strokeRect(10, 10, w - 20, h - 20);
    ctx.strokeStyle = 'rgba(110,80,60,0.45)';
    ctx.lineWidth = 3;
    ctx.strokeRect(28, 28, w - 56, h - 56);
    for (let i = 0; i < 30; i++) {
      const x = 34 + i * 11;
      if (x > w - 30) break;
      ctx.fillStyle = i % 2 ? '#e2c687' : '#d7a5a3';
      ctx.beginPath();
      ctx.arc(x, 20, 3, 0, Math.PI * 2);
      ctx.fill();
    }
    const sky = ctx.createLinearGradient(0, 60, 0, h - 120);
    sky.addColorStop(0, '#8fa9c4');
    sky.addColorStop(0.6, '#d8c7b8');
    sky.addColorStop(1, '#c3b291');
    ctx.fillStyle = sky;
    ctx.fillRect(36, 36, w - 72, h - 72);
    ctx.fillStyle = '#f6e6ae';
    ctx.beginPath();
    ctx.arc(w * 0.72, h * 0.24, 34, 0, Math.PI * 2);
    ctx.fill();
    for (let i = 0; i < 18; i++) {
      ctx.fillStyle = 'rgba(255,248,220,0.8)';
      ctx.beginPath();
      ctx.arc(48 + rnd() * (w - 96), 50 + rnd() * h * 0.4, rnd(1, 2.5), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = '#9cae8d';
    ctx.beginPath();
    ctx.moveTo(36, h - 150);
    ctx.quadraticCurveTo(w * 0.28, h - 250, w * 0.5, h - 140);
    ctx.quadraticCurveTo(w * 0.75, h - 235, w - 36, h - 155);
    ctx.lineTo(w - 36, h - 36);
    ctx.lineTo(36, h - 36);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#7f957c';
    ctx.beginPath();
    ctx.moveTo(36, h - 110);
    ctx.quadraticCurveTo(w * 0.4, h - 175, w - 36, h - 120);
    ctx.lineTo(w - 36, h - 36);
    ctx.lineTo(36, h - 36);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#f0e3cd';
    ctx.fillRect(w * 0.34, h - 208, 26, 72);
    ctx.fillRect(w * 0.58, h - 230, 22, 94);
    ctx.fillRect(w * 0.44, h - 178, 62, 48);
    ctx.beginPath();
    ctx.moveTo(w * 0.32, h - 210);
    ctx.lineTo(w * 0.39, h - 238);
    ctx.lineTo(w * 0.46, h - 210);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(w * 0.56, h - 232);
    ctx.lineTo(w * 0.615, h - 262);
    ctx.lineTo(w * 0.67, h - 232);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#c96f78';
    for (let i = 0; i < 9; i++) {
      const bx = 56 + i * 34;
      const by = h - 74 - (i % 3) * 16;
      ctx.beginPath();
      ctx.arc(bx, by, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#71896c';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(bx, by + 8);
      ctx.lineTo(bx, by + 26);
      ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(90,70,50,0.35)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 12; i++) {
      ctx.beginPath();
      ctx.moveTo(36, 36 + i * 36);
      ctx.lineTo(w - 36, 36 + i * 36 + 8);
      ctx.stroke();
    }
  });
}

export function rugTexture(palette = 'rose') {
  const base = palette === 'rose' ? '#b96c72' : '#6f7fa1';
  const light = palette === 'rose' ? '#e9c9aa' : '#dcd2b8';
  return makeCanvasTexture(512, 512, (ctx, w, h) => {
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = light;
    ctx.lineWidth = 18;
    ctx.strokeRect(18, 18, w - 36, h - 36);
    ctx.strokeStyle = 'rgba(255,240,210,0.55)';
    ctx.lineWidth = 5;
    ctx.strokeRect(46, 46, w - 92, h - 92);
    ctx.strokeStyle = 'rgba(255,240,210,0.35)';
    ctx.lineWidth = 3;
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const cx = w / 2 + Math.cos(a) * 150;
      const cy = h / 2 + Math.sin(a) * 150;
      ctx.beginPath();
      for (let k = 0; k < 8; k++) {
        const ang = (k / 8) * Math.PI * 2;
        const r = k % 2 ? 12 : 30;
        ctx.lineTo(cx + Math.cos(ang) * r, cy + Math.sin(ang) * r);
      }
      ctx.closePath();
      ctx.stroke();
    }
    ctx.fillStyle = 'rgba(255,240,210,0.5)';
    ctx.beginPath();
    for (let i = 0; i < 16; i++) {
      const a = -Math.PI / 2 + (i * Math.PI) / 8;
      const r = i % 2 ? 40 : 92;
      ctx.lineTo(w / 2 + Math.cos(a) * r, h / 2 + Math.sin(a) * r);
    }
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = base;
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, 28, 0, Math.PI * 2);
    ctx.fill();
    for (let i = 0; i < 500; i++) {
      ctx.fillStyle = rnd() > 0.5 ? 'rgba(255,250,240,0.04)' : 'rgba(60,40,40,0.05)';
      ctx.fillRect(rnd() * w, rnd() * h, 2, 2);
    }
  });
}

export function roseWindowTexture() {
  return makeCanvasTexture(384, 384, (ctx, w, h) => {
    ctx.fillStyle = '#3f4247';
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, w / 2 - 4, 0, Math.PI * 2);
    ctx.fill();
    const cols = ['#d9808c', '#88a9cf', '#e8c878', '#9bbf9c', '#b79bc9', '#7fb6c5'];
    const cx = w / 2;
    const cy = h / 2;
    for (let ring = 0; ring < 2; ring++) {
      const rIn = ring === 0 ? 28 : 104;
      const rOut = ring === 0 ? 102 : 174;
      const n = ring === 0 ? 8 : 16;
      for (let i = 0; i < n; i++) {
        const a0 = (i / n) * Math.PI * 2;
        const a1 = ((i + 1) / n) * Math.PI * 2;
        ctx.beginPath();
        ctx.arc(cx, cy, rOut, a0, a1);
        ctx.arc(cx, cy, rIn, a1, a0, true);
        ctx.closePath();
        ctx.fillStyle = cols[(i + ring * 2) % cols.length];
        ctx.fill();
        ctx.strokeStyle = '#2f3238';
        ctx.lineWidth = 7;
        ctx.stroke();
      }
    }
    ctx.fillStyle = '#e7c979';
    ctx.beginPath();
    ctx.arc(cx, cy, 26, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#3b3d42';
    ctx.lineWidth = 8;
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(a) * 26, cy + Math.sin(a) * 26);
      ctx.lineTo(cx + Math.cos(a) * 174, cy + Math.sin(a) * 174);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(cx, cy, 174, 0, Math.PI * 2);
    ctx.strokeStyle = '#e7c979';
    ctx.lineWidth = 12;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, cy, 190, 0, Math.PI * 2);
    ctx.strokeStyle = '#5b544b';
    ctx.lineWidth = 12;
    ctx.stroke();
  });
}

export function archShape(w, h, archH) {
  const s = new THREE.Shape();
  const half = w / 2;
  s.moveTo(-half, 0);
  s.lineTo(half, 0);
  s.lineTo(half, h - archH);
  s.absarc(0, h - archH, half, 0, Math.PI, false);
  s.lineTo(-half, 0);
  return s;
}

export function archedWindow(parent, w, h, pos, rotY = 0, opts = {}) {
  const group = new THREE.Group();
  group.position.set(pos[0], pos[1], pos[2]);
  group.rotation.y = rotY;
  parent.add(group);
  const pane = new THREE.Mesh(
    new THREE.ShapeGeometry(archShape(w, h, w / 2), 12),
    new THREE.MeshBasicMaterial({
      color: opts.color || 0xffd9a1,
      transparent: true,
      opacity: opts.opacity ?? 0.95,
      side: THREE.DoubleSide,
      toneMapped: false,
    })
  );
  pane.position.z = 0.012;
  group.add(pane);
  const frameColor = opts.frame || P.stoneDim;
  const fw = w * 0.11;
  box(group, w + fw * 2, fw, 0.06, frameColor, 0, h - w / 2, 0.03);
  box(group, fw, h - w / 2, 0.08, frameColor, -w / 2 - fw / 2, (h - w / 2) / 2, 0.03);
  box(group, fw, h - w / 2, 0.08, frameColor, w / 2 + fw / 2, (h - w / 2) / 2, 0.03);
  const arc = new THREE.Mesh(
    new THREE.TorusGeometry(w / 2 + fw / 2, fw * 0.55, 6, 20, Math.PI),
    resolveMat(frameColor)
  );
  arc.position.set(0, h - w / 2, 0.05);
  arc.castShadow = true;
  group.add(arc);
  if (opts.bars !== false) {
    box(group, w * 0.055, h * 0.92, 0.04, opts.barColor || P.woodDark, 0, h * 0.46, 0.045);
    box(group, w * 0.92, w * 0.045, 0.04, opts.barColor || P.woodDark, 0, h * 0.42, 0.045);
  }
  box(group, w + fw * 2.4, fw * 0.7, 0.16, frameColor, 0, -fw * 0.2, 0.04);
  if (opts.glow !== false) glowSprite(group, opts.glowColor || 0xffc97a, w * 3.2, 0, h / 2, 0.1, 0.28);
  return group;
}

export function clothBanner(parent, texture, w, h, pos, rotY = 0, opts = {}) {
  const geo = new THREE.PlaneGeometry(w, h, 5, 10);
  geo.translate(0, -h / 2, 0);
  const mat = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide,
    transparent: true,
    toneMapped: true,
    color: opts.tint || 0xffffff,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(pos[0], pos[1], pos[2]);
  mesh.rotation.y = rotY;
  mesh.castShadow = true;
  parent.add(mesh);
  const base = geo.attributes.position.array.slice();
  const phase = rnd(0, Math.PI * 2);
  const amp = opts.amp ?? 0.07;
  onFrame((t) => {
    const arr = geo.attributes.position.array;
    for (let i = 0; i < arr.length; i += 3) {
      const y = base[i + 1];
      arr[i + 2] = Math.sin(t * 1.7 + phase + y * 3.0) * amp * Math.min(1, -y / h + 0.15) +
        Math.sin(t * 2.6 + phase * 2 + y * 5.0) * amp * 0.25;
    }
    geo.attributes.position.needsUpdate = true;
    geo.computeVertexNormals();
  });
  return mesh;
}

export function pennant(parent, color, pos, rotY = 0) {
  const pole = cyl(parent, 0.022, 0.03, 1.0, P.woodDark, pos[0], pos[1] - 0.5, pos[2], { segments: 6 });
  const tip = sphere(parent, 0.06, P.gold, pos[0], pos[1] + 0.02, pos[2], { low: true });
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0, 0.62, -0.09, 0, 0, -0.34, 0], 3));
  geo.computeVertexNormals();
  const flag = new THREE.Mesh(
    geo,
    new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide, toneMapped: true })
  );
  flag.position.set(pos[0] + 0.01, pos[1] - 0.06, pos[2]);
  flag.rotation.y = rotY;
  flag.castShadow = true;
  parent.add(flag);
  const phase = rnd(0, 6);
  onFrame((t) => {
    flag.rotation.y = rotY + Math.sin(t * 2.1 + phase) * 0.22;
    flag.scale.x = 0.92 + Math.sin(t * 3.3 + phase) * 0.08;
  });
  return pole;
}

export function makePerson(opts = {}) {
  const {
    skin = P.skin,
    hair = P.hairBrown,
    outfit = P.leaf,
    accent = P.gold,
    height = 1,
    skirt = false,
    cape = null,
    crown = false,
    hat = null,
    beard = false,
    seated = false,
    hairStyle = 'short',
    basket = false,
  } = opts;
  const g = new THREE.Group();
  const s = height;
  const legColor = opts.pants || 0x5d534b;
  const shoeColor = 0x4a4038;
  if (!skirt && !seated) {
    cyl(g, 0.055 * s, 0.065 * s, 0.4 * s, legColor, -0.09 * s, (seated ? 0.3 : 0.2) * s, 0, { segments: 8 });
    cyl(g, 0.055 * s, 0.065 * s, 0.4 * s, legColor, 0.09 * s, (seated ? 0.3 : 0.2) * s, 0, { segments: 8 });
    box(g, 0.14 * s, 0.06 * s, 0.2 * s, shoeColor, -0.09 * s, (seated ? 0.1 : 0.03) * s, 0.03 * s);
    box(g, 0.14 * s, 0.06 * s, 0.2 * s, shoeColor, 0.09 * s, (seated ? 0.1 : 0.03) * s, 0.03 * s);
  } else {
    cone(g, 0.29 * s, 0.78 * s, outfit, 0, 0.39 * s, 0, { segments: 18 });
    cyl(g, 0.07 * s, 0.09 * s, 0.06 * s, shoeColor, -0.09 * s, 0.03 * s, 0.04 * s, { segments: 8 });
    cyl(g, 0.07 * s, 0.09 * s, 0.06 * s, shoeColor, 0.09 * s, 0.03 * s, 0.04 * s, { segments: 8 });
  }
  let bodyY = 0.72 * s;
  if (seated) bodyY = 0.88 * s;
  const body = cyl(g, 0.15 * s, 0.21 * s, 0.5 * s, outfit, 0, bodyY, 0, { segments: 12 });
  if (skirt) {
    body.position.y = 0.88 * s;
    body.scale.set(0.9, 0.55, 0.9);
  }
  if (seated) {
    box(g, 0.11 * s, 0.11 * s, 0.42 * s, legColor, -0.09 * s, 0.48 * s, 0.18 * s);
    box(g, 0.11 * s, 0.11 * s, 0.42 * s, legColor, 0.09 * s, 0.48 * s, 0.18 * s);
    cyl(g, 0.055 * s, 0.06 * s, 0.36 * s, legColor, -0.09 * s, 0.3 * s, 0.36 * s, { segments: 8 });
    cyl(g, 0.055 * s, 0.06 * s, 0.36 * s, legColor, 0.09 * s, 0.3 * s, 0.36 * s, { segments: 8 });
    box(g, 0.14 * s, 0.06 * s, 0.2 * s, shoeColor, -0.09 * s, 0.12 * s, 0.42 * s);
    box(g, 0.14 * s, 0.06 * s, 0.2 * s, shoeColor, 0.09 * s, 0.12 * s, 0.42 * s);
  }
  const shoulderY = bodyY + 0.2 * s;
  const armGeo = [0.05 * s, 0.06 * s, 0.44 * s];
  const armL = new THREE.Group();
  armL.position.set(-0.2 * s, shoulderY, 0);
  armL.rotation.z = 0.18;
  armL.rotation.x = seated ? -0.5 : 0.08;
  const armLMesh = cyl(armL, armGeo[0], armGeo[1], armGeo[2], outfit, 0, -armGeo[2] / 2, 0, { segments: 8 });
  sphere(armL, 0.05 * s, skin, 0, -armGeo[2] - 0.01 * s, 0, { low: true });
  g.add(armL);
  const armR = new THREE.Group();
  armR.position.set(0.2 * s, shoulderY, 0);
  armR.rotation.z = -0.18;
  armR.rotation.x = seated ? -0.5 : -0.08;
  cyl(armR, armGeo[0], armGeo[1], armGeo[2], outfit, 0, -armGeo[2] / 2, 0, { segments: 8 });
  sphere(armR, 0.05 * s, skin, 0, -armGeo[2] - 0.01 * s, 0, { low: true });
  g.add(armR);
  const headY = bodyY + 0.42 * s;
  sphere(g, 0.155 * s, skin, 0, headY, 0.01 * s, { scale: [1, 1.05, 1] });
  cyl(g, 0.055 * s, 0.06 * s, 0.08 * s, skin, 0, headY - 0.15 * s, 0, { segments: 8 });
  const eyeMat = basic(0x3a3330);
  for (const sx of [-1, 1]) {
    const eye = new THREE.Mesh(G.sphereLow, eyeMat);
    eye.scale.setScalar(0.016 * s);
    eye.position.set(sx * 0.055 * s, headY + 0.015 * s, 0.148 * s);
    g.add(eye);
  }
  const blush = basic(0xeaa9a0, { transparent: true, opacity: 0.55 });
  for (const sx of [-1, 1]) {
    const b = new THREE.Mesh(G.sphereLow, blush);
    b.scale.set(0.028 * s, 0.018 * s, 0.012 * s);
    b.position.set(sx * 0.085 * s, headY - 0.045 * s, 0.13 * s);
    g.add(b);
  }
  if (hairStyle === 'halo') {
    const hairMat = toon(hair);
    sphere(g, 0.17 * s, hair, 0, headY + 0.07 * s, 0, { scale: [1.02, 0.72, 1.02], matOpts: {} });
    const tuft = [[-0.11, 0.1, 0.08], [0, 0.16, 0.02], [0.11, 0.1, 0.07], [-0.15, 0.02, 0.02], [0.15, 0.02, 0.03], [0, 0.06, -0.12]];
    for (const [tx, ty, tz] of tuft) {
      sphere(g, 0.065 * s, hair, tx * s, headY + ty * s, tz * s, { low: true });
    }
  } else if (hairStyle === 'bun') {
    sphere(g, 0.17 * s, hair, 0, headY + 0.05 * s, -0.02 * s, { scale: [1.02, 0.9, 1.0] });
    sphere(g, 0.1 * s, hair, 0, headY + 0.21 * s, -0.08 * s, { low: true });
  } else if (hairStyle === 'long') {
    sphere(g, 0.17 * s, hair, 0, headY + 0.05 * s, -0.03 * s, { scale: [1.05, 1.0, 1.02] });
    box(g, 0.16 * s, 0.36 * s, 0.1 * s, hair, 0, headY - 0.15 * s, -0.1 * s);
  } else if (hairStyle === 'bald') {
    sphere(g, 0.168 * s, skin, 0, headY + 0.02 * s, 0, { scale: [1, 0.9, 1] });
  } else {
    sphere(g, 0.165 * s, hair, 0, headY + 0.04 * s, -0.015 * s, { scale: [1.03, 0.88, 1.02] });
  }
  if (hat === 'wizard') {
    cyl(g, 0.24 * s, 0.2 * s, 0.04 * s, P.wood, 0, headY + 0.14 * s, 0, { segments: 16 });
    cone(g, 0.15 * s, 0.42 * s, P.wood, 0, headY + 0.35 * s, 0, { segments: 16 });
  } else if (hat === 'feather') {
    cyl(g, 0.22 * s, 0.24 * s, 0.035 * s, opts.hatColor || P.woodDark, 0, headY + 0.14 * s, 0, { segments: 16 });
    cone(g, 0.13 * s, 0.2 * s, opts.hatColor || P.woodDark, 0, headY + 0.23 * s, 0, { segments: 16 });
    const feather = box(g, 0.025 * s, 0.28 * s, 0.08 * s, P.cream, 0.18 * s, headY + 0.25 * s, 0);
    feather.rotation.z = -0.4;
  }
  if (crown) {
    const crownMat = toon(P.gold);
    const c = new THREE.Mesh(new THREE.CylinderGeometry(0.14 * s, 0.12 * s, 0.1 * s, 12, 1, true), crownMat);
    c.position.set(0, headY + 0.16 * s, 0);
    c.castShadow = true;
    g.add(c);
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      cone(g, 0.035 * s, 0.12 * s, P.gold, Math.cos(a) * 0.12 * s, headY + 0.26 * s, Math.sin(a) * 0.12 * s, { segments: 5 });
    }
    sphere(g, 0.035 * s, P.rose, 0, headY + 0.255 * s, 0.12 * s, { low: true });
  }
  if (beard) {
    cone(g, 0.11 * s, 0.3 * s, P.white, 0, headY - 0.2 * s, 0.09 * s, { segments: 10, rot: [Math.PI, 0, 0] });
  }
  if (cape) {
    const capeGeo = new THREE.PlaneGeometry(0.5 * s, 0.75 * s, 4, 6);
    capeGeo.translate(0, -0.375 * s, 0);
    const capeM = new THREE.Mesh(
      capeGeo,
      new THREE.MeshToonMaterial({ color: cape, side: THREE.DoubleSide, gradientMap: gradientMap() })
    );
    capeM.position.set(0, shoulderY + 0.1 * s, -0.15 * s);
    capeM.rotation.x = 0.12;
    capeM.castShadow = true;
    g.add(capeM);
  }
  if (basket) {
    const b = cyl(g, 0.13 * s, 0.1 * s, 0.16 * s, P.woodLight, 0.25 * s, 0.62 * s, 0.14 * s, { segments: 12 });
    for (let i = 0; i < 3; i++) {
      sphere(g, 0.05 * s, P.woodLight, (0.2 + i * 0.05) * s, 0.72 * s, 0.14 * s, { low: true, scale: [1, 0.6, 1] });
    }
  }
  if (opts.tool === 'spear') {
    const spear = cyl(g, 0.018 * s, 0.018 * s, 1.85 * s, P.wood, 0.28 * s, 0.95 * s, 0.06 * s, { segments: 6 });
    cone(g, 0.045 * s, 0.18 * s, P.stoneLight, 0.28 * s, 1.98 * s, 0.06 * s, { segments: 8 });
  }
  if (opts.tool === 'lute') {
    const body = sphere(g, 0.16 * s, P.woodLight, 0.2 * s, 0.72 * s, 0.18 * s, { scale: [0.8, 1.1, 0.3], low: true });
    box(g, 0.035 * s, 0.36 * s, 0.05 * s, P.woodDark, 0.2 * s, 1.0 * s, 0.18 * s);
    box(g, 0.14 * s, 0.02 * s, 0.02 * s, P.gold, 0.2 * s, 1.14 * s, 0.18 * s);
    armL.rotation.x = -0.9;
    armL.rotation.z = 0.45;
    armR.rotation.x = -0.75;
    armR.rotation.z = -0.5;
  }
  return g;
}

export function makeCrown(parent, x, y, z, s = 1) {
  const c = cyl(parent, 0.14 * s, 0.12 * s, 0.1 * s, P.gold, x, y, z, { segments: 12, open: true });
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    cone(parent, 0.035 * s, 0.12 * s, P.gold, x + Math.cos(a) * 0.12 * s, y + 0.1 * s, z + Math.sin(a) * 0.12 * s, { segments: 5 });
  }
  return c;
}

export function starShape(outer = 1, inner = 0.45, points = 5) {
  const s = new THREE.Shape();
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = -Math.PI / 2 + (i * Math.PI) / points;
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r;
    if (i === 0) s.moveTo(x, y);
    else s.lineTo(x, y);
  }
  s.closePath();
  return s;
}

export function makeStar(parent, size, color, x, y, z, rotY = 0, opts = {}) {
  const geo = new THREE.ShapeGeometry(starShape(size, size * 0.45, 5));
  const mat = new THREE.MeshBasicMaterial({
    color,
    side: THREE.DoubleSide,
    transparent: opts.opacity !== undefined,
    opacity: opts.opacity ?? 1,
    toneMapped: false,
  });
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  m.rotation.y = rotY;
  m.rotation.z = opts.rotZ || 0;
  parent.add(m);
  return m;
}

export function archedDoorway(parent, w, h, pos, rotY, color = 0x2e2b2a) {
  const group = new THREE.Group();
  group.position.set(pos[0], pos[1], pos[2]);
  group.rotation.y = rotY;
  parent.add(group);
  const pane = new THREE.Mesh(
    new THREE.ShapeGeometry(archShape(w, h, w / 2), 12),
    new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide })
  );
  pane.position.z = 0.01;
  group.add(pane);
  const arc = new THREE.Mesh(
    new THREE.TorusGeometry(w / 2, w * 0.08, 6, 18, Math.PI),
    resolveMat(P.stoneDim)
  );
  arc.position.set(0, h - w / 2, 0.02);
  group.add(arc);
  return group;
}
