import * as THREE from 'three';

export const PALETTE = {
  skyTop: 0x8eb3d1,
  skyMid: 0xe9bcc6,
  skyLow: 0xf9ddc5,
  sun: 0xffd9a3,
  fog: 0xe8d7d4,
  grass: [0x96b477, 0xaac38a, 0xc9cf95, 0x7f9c70],
  path: 0xe6d4b6,
  stone: 0xead9c1,
  stoneDark: 0xd4bfa4,
  stoneLight: 0xf6ebd8,
  roof: 0x7387ab,
  roofLight: 0x8d9ec1,
  wood: 0x9b7355,
  woodDark: 0x6f4f3c,
  gold: 0xe6b565,
  rose: 0xd46978,
  rosePale: 0xf2aab1,
  water: 0xa6cbd4,
  leaf: 0x8fad82,
  leafDark: 0x6f8f70,
  blush: 0xdca8a8,
  lilac: 0xb8a6c9,
  cream: 0xf7edda,
};

export const GROUND_Y = 3.2;

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const smooth = (a, b, v) => {
  const t = clamp((v - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

function gauss(x, z, cx, cz, sx, sz) {
  const dx = (x - cx) / sx;
  const dz = (z - cz) / sz;
  return Math.exp(-(dx * dx + dz * dz));
}

export function edgeRadius(theta) {
  return 39.5 + Math.sin(theta * 3 + 1.1) * 2.3 + Math.sin(theta * 7 + 0.4) * 1.1 + Math.sin(theta * 11) * 0.5;
}

export function islandHeight(x, z) {
  const r = Math.hypot(x, z);
  const th = Math.atan2(z, x);
  const R = edgeRadius(th);
  let h = GROUND_Y - smooth(15.5, R * 0.99, r) * 2.15;
  const hillMask = smooth(14, 20, r);
  h += hillMask * (
    2.15 * gauss(x, z, -20, 11, 8.5, 6.2) +
    1.55 * gauss(x, z, 21, -9, 7.5, 6.5) +
    1.35 * gauss(x, z, 14, 22, 6.8, 5.2) +
    1.7 * gauss(x, z, -8, 24, 7.0, 5.0)
  );
  h -= 1.65 * gauss(x, z, 20, 14, 5.2, 4.2);
  const edge = smooth(R - 2.0, R + 0.2, r);
  h -= edge * 0.55;
  return h;
}

export function terrainNormal(x, z, eps = 0.25) {
  const hL = islandHeight(x - eps, z);
  const hR = islandHeight(x + eps, z);
  const hD = islandHeight(x, z - eps);
  const hU = islandHeight(x, z + eps);
  return new THREE.Vector3(hL - hR, 2 * eps, hD - hU).normalize();
}

export function seedNoise(x, y = 0) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

export function makeCanvasTexture(size, draw, repeatX = 1, repeatY = 1) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  draw(ctx, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeatX, repeatY);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function paperNoise(ctx, size, alpha = 0.05) {
  const img = ctx.getImageData(0, 0, size, size);
  for (let i = 0; i < img.data.length; i += 4) {
    const n = (Math.random() - 0.5) * 255;
    img.data[i] = clamp(img.data[i] + n, 0, 255);
    img.data[i + 1] = clamp(img.data[i + 1] + n, 0, 255);
    img.data[i + 2] = clamp(img.data[i + 2] + n, 0, 255);
    img.data[i + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  ctx.globalAlpha = alpha;
  for (let i = 0; i < 90; i++) {
    ctx.fillStyle = Math.random() > 0.5 ? '#fff8ec' : '#9a8577';
    ctx.beginPath();
    ctx.ellipse(Math.random() * size, Math.random() * size, Math.random() * 22 + 2, Math.random() * 5 + 1, Math.random() * 6, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

export function makeStoneTexture(base = '#ead9c1', mortar = '#c9b399') {
  return makeCanvasTexture(512, (ctx, size) => {
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, size, size);
    const rows = 12;
    const rh = size / rows;
    for (let row = 0; row < rows; row++) {
      let x = row % 2 ? -35 : 0;
      while (x < size) {
        const w = 50 + Math.random() * 45;
        const shade = Math.floor(Math.random() * 16) - 8;
        ctx.fillStyle = shadeHex(base, shade);
        ctx.fillRect(x + 2, row * rh + 2, w - 3, rh - 4);
        ctx.strokeStyle = mortar;
        ctx.lineWidth = 2.2;
        ctx.strokeRect(x + 1, row * rh + 1, w - 2, rh - 2);
        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x + 5, row * rh + 4);
        ctx.lineTo(x + w - 5, row * rh + 4);
        ctx.stroke();
        x += w;
      }
    }
    paperNoise(ctx, size, 0.035);
  }, 2.5, 2.5);
}

function shadeHex(hex, delta) {
  const c = new THREE.Color(hex);
  c.offsetHSL(0, 0, delta / 255);
  return '#' + c.getHexString();
}

export function makeRoofTexture(base = '#7387ab') {
  return makeCanvasTexture(512, (ctx, size) => {
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, size, size);
    const rows = 13;
    const rh = size / rows;
    for (let row = 0; row < rows; row++) {
      const offset = row % 2 ? 20 : 0;
      for (let x = -20; x < size + 30; x += 40) {
        const c = new THREE.Color(base);
        c.offsetHSL(0, 0, (Math.random() - 0.5) * 0.11);
        ctx.fillStyle = '#' + c.getHexString();
        ctx.beginPath();
        ctx.moveTo(x + offset, row * rh);
        ctx.lineTo(x + offset + 38, row * rh);
        ctx.lineTo(x + offset + 38, row * rh + rh * 0.70);
        ctx.quadraticCurveTo(x + offset + 19, row * rh + rh * 1.15, x + offset, row * rh + rh * 0.70);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = 'rgba(60,58,86,0.28)';
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
    }
    paperNoise(ctx, size, 0.04);
  }, 3, 2);
}

export function makeWoodTexture() {
  return makeCanvasTexture(512, (ctx, size) => {
    ctx.fillStyle = '#9a7153';
    ctx.fillRect(0, 0, size, size);
    for (let i = 0; i < 34; i++) {
      const y = Math.random() * size;
      ctx.strokeStyle = `rgba(${Math.random() > 0.5 ? '70,45,30' : '210,170,130'},${0.12 + Math.random() * 0.18})`;
      ctx.lineWidth = 1 + Math.random() * 5;
      ctx.beginPath();
      ctx.moveTo(0, y);
      for (let x = 0; x <= size; x += 32) {
        ctx.lineTo(x, y + Math.sin(x * 0.05 + i) * 5);
      }
      ctx.stroke();
    }
    paperNoise(ctx, size, 0.03);
  }, 2, 2);
}

export function makeWatercolorTexture() {
  return makeCanvasTexture(256, (ctx, size) => {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);
    for (let i = 0; i < 180; i++) {
      ctx.fillStyle = `rgba(${Math.random() > 0.5 ? '255,250,240' : '150,140,120'},${0.04 + Math.random() * 0.05})`;
      ctx.beginPath();
      ctx.arc(Math.random() * size, Math.random() * size, Math.random() * 25 + 2, 0, Math.PI * 2);
      ctx.fill();
    }
    paperNoise(ctx, size, 0.015);
  }, 2, 2);
}

export function makeGlassTexture() {
  return makeCanvasTexture(256, (ctx, size) => {
    const cols = ['#e5a07f', '#e6c07a', '#8fb7c7', '#b39bc9', '#9ebd98', '#e8b9c4'];
    ctx.fillStyle = '#f3e6ce';
    ctx.fillRect(0, 0, size, size);
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        ctx.fillStyle = cols[(x * 3 + y * 5) % cols.length];
        ctx.globalAlpha = 0.55 + Math.random() * 0.3;
        ctx.beginPath();
        ctx.arc(x * 32 + 16, y * 32 + 16, 11 + Math.random() * 5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
    ctx.strokeStyle = '#6f5a4b';
    ctx.lineWidth = 3;
    for (let i = 0; i <= 8; i++) {
      ctx.beginPath();
      ctx.moveTo(i * 32, 0);
      ctx.lineTo(i * 32, size);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * 32);
      ctx.lineTo(size, i * 32);
      ctx.stroke();
    }
  });
}

export function createMaterials() {
  const stoneTex = makeStoneTexture();
  const stoneLightTex = makeStoneTexture('#f5e9d5', '#dbc7ab');
  const roofTex = makeRoofTexture();
  const woodTex = makeWoodTexture();
  const paperTex = makeWatercolorTexture();

  const standard = (opts) => new THREE.MeshStandardMaterial(opts);

  return {
    stone: standard({ color: 0xffffff, map: stoneTex, roughness: 0.93, metalness: 0 }),
    stoneLight: standard({ color: 0xffffff, map: stoneLightTex, roughness: 0.95 }),
    stoneDark: standard({ color: 0xcbb597, map: stoneTex, roughness: 0.96 }),
    stoneCool: standard({ color: 0xcfd2cf, map: stoneTex, roughness: 0.95 }),
    roof: standard({ color: 0xffffff, map: roofTex, roughness: 0.78, metalness: 0.05 }),
    roofLight: standard({ color: 0xb9bdd3, map: roofTex, roughness: 0.8 }),
    wood: standard({ color: 0xffffff, map: woodTex, roughness: 0.87 }),
    woodDark: standard({ color: 0x74513c, roughness: 0.9 }),
    woodPale: standard({ color: 0xc69c72, map: woodTex, roughness: 0.9 }),
    gold: standard({ color: PALETTE.gold, roughness: 0.36, metalness: 0.72 }),
    goldSoft: standard({ color: 0xf0cf8c, roughness: 0.5, metalness: 0.42 }),
    iron: standard({ color: 0x6e6a6a, roughness: 0.45, metalness: 0.72 }),
    grass: standard({ color: 0xffffff, map: paperTex, vertexColors: true, roughness: 1 }),
    leaf: standard({ color: 0x93ad83, roughness: 0.96, flatShading: true }),
    leafPale: standard({ color: 0xb6c799, roughness: 0.98, flatShading: true }),
    leafDark: standard({ color: 0x728b72, roughness: 0.96, flatShading: true }),
    trunk: standard({ color: 0x8f6d53, roughness: 0.98 }),
    rose: standard({ color: PALETTE.rose, roughness: 0.7 }),
    rosePale: standard({ color: PALETTE.rosePale, roughness: 0.75 }),
    pink: standard({ color: 0xe9b5b7, roughness: 0.88, flatShading: true }),
    clothRed: standard({ color: 0xb85860, roughness: 0.92, side: THREE.DoubleSide }),
    clothCream: standard({ color: 0xf0dfc2, roughness: 0.95, side: THREE.DoubleSide }),
    clothBlue: standard({ color: 0x8197b2, roughness: 0.92, side: THREE.DoubleSide }),
    clothGreen: standard({ color: 0x78957a, roughness: 0.94, side: THREE.DoubleSide }),
    clothPurple: standard({ color: 0x8b769e, roughness: 0.93, side: THREE.DoubleSide }),
    banner: standard({ color: 0xf2dfc2, roughness: 0.95, side: THREE.DoubleSide }),
    skin: standard({ color: 0xf2cfb6, roughness: 0.92 }),
    skinRose: standard({ color: 0xe9b9a7, roughness: 0.92 }),
    hair: standard({ color: 0xd8b56f, roughness: 0.9 }),
    black: standard({ color: 0x3f3a3d, roughness: 0.8 }),
    silver: standard({ color: 0xc9c6c1, roughness: 0.32, metalness: 0.72 }),
    water: standard({ color: PALETTE.water, roughness: 0.16, metalness: 0.15, transparent: true, opacity: 0.76 }),
    waterDark: standard({ color: 0x6e9aab, roughness: 0.2, transparent: true, opacity: 0.8 }),
    glass: new THREE.MeshPhysicalMaterial({
      color: 0xeaf4f5, roughness: 0.06, metalness: 0,
      transparent: true, opacity: 0.19, side: THREE.DoubleSide,
      depthWrite: false, clearcoat: 1, clearcoatRoughness: 0.05,
    }),
    glassWarm: new THREE.MeshStandardMaterial({
      color: 0xffd9a3, emissive: 0xffb25f, emissiveIntensity: 1.4,
      transparent: true, opacity: 0.55, side: THREE.DoubleSide, depthWrite: false,
    }),
    candle: standard({ color: 0xfff2d4, roughness: 0.7 }),
    flame: new THREE.MeshBasicMaterial({ color: 0xffb765, transparent: true, opacity: 0.95 }),
    stained: standard({
      color: 0xffffff, map: makeGlassTexture(),
      emissive: 0x7a5c72, emissiveIntensity: 0.25, roughness: 0.4,
    }),
    emissiveWarm: new THREE.MeshBasicMaterial({ color: 0xffc27c }),
    darkWood: standard({ color: 0x5c4335, roughness: 0.95 }),
    rugRed: standard({ color: 0xa64f55, roughness: 1 }),
    rugBlue: standard({ color: 0x6f86a2, roughness: 1 }),
    rugCream: standard({ color: 0xe2ccb2, roughness: 1 }),
    ceramic: standard({ color: 0xd9c3a7, roughness: 0.55 }),
    ceramicBlue: standard({ color: 0x91aab8, roughness: 0.5 }),
    paper: standard({ color: 0xf4e8d3, roughness: 0.96, side: THREE.DoubleSide }),
    cloud: standard({ color: 0xfff5ec, roughness: 1, flatShading: true, transparent: true, opacity: 0.96 }),
  };
}

export function box(w, h, d, mat, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

export function sphere(r, mat, x = 0, y = 0, z = 0, seg = 14) {
  const m = new THREE.Mesh(new THREE.SphereGeometry(r, seg, Math.max(8, seg - 2)), mat);
  m.position.set(x, y, z);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

export function cylinder(rt, rb, h, mat, x = 0, y = 0, z = 0, seg = 18) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), mat);
  m.position.set(x, y, z);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

export function cone(r, h, mat, x = 0, y = 0, z = 0, seg = 20) {
  const m = new THREE.Mesh(new THREE.ConeGeometry(r, h, seg), mat);
  m.position.set(x, y, z);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

export function capsuleBetween(a, b, radius, mat, seg = 8) {
  const dir = new THREE.Vector3().subVectors(b, a);
  const len = dir.length();
  const geo = new THREE.CapsuleGeometry(radius, Math.max(0.001, len - radius * 2), 4, seg);
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.copy(a).addScaledVector(dir, 0.5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
  mesh.castShadow = true;
  return mesh;
}

export function addWindow(parent, mat, x, y, z, width, height, ry = 0, warm = true) {
  const g = new THREE.Group();
  g.position.set(x, y, z);
  g.rotation.y = ry;
  const frame = box(width + 0.26, height + 0.26, 0.14, mat.stoneLight, 0, 0, 0);
  const glassMat = warm ? new THREE.MeshStandardMaterial({
    color: 0xffddb0, emissive: 0xe6a45f, emissiveIntensity: 0.5, roughness: 0.35,
  }) : new THREE.MeshStandardMaterial({ color: 0x9fb7c5, roughness: 0.25, metalness: 0.1 });
  const glass = box(width, height, 0.08, glassMat, 0, 0, 0.08);
  g.add(frame, glass);
  const mullionV = box(0.06, height, 0.1, mat.woodDark, 0, 0, 0.14);
  const mullionH = box(width, 0.06, 0.1, mat.woodDark, 0, 0, 0.14);
  g.add(mullionV, mullionH);
  parent.add(g);
  return g;
}

export function addPointedWindow(parent, mat, x, y, z, width, height, ry = 0, warm = true) {
  const g = new THREE.Group();
  g.position.set(x, y, z);
  g.rotation.y = ry;

  const shape = new THREE.Shape();
  const w = width / 2;
  const shoulder = height * 0.6;
  shape.moveTo(-w, 0);
  shape.lineTo(-w, shoulder);
  shape.quadraticCurveTo(-w * 0.9, height * 0.86, 0, height);
  shape.quadraticCurveTo(w * 0.9, height * 0.86, w, shoulder);
  shape.lineTo(w, 0);
  shape.closePath();
  const geo = new THREE.ShapeGeometry(shape, 10);
  const glassMat = warm ? new THREE.MeshStandardMaterial({
    color: 0xffd9a3, emissive: 0xd48b4b, emissiveIntensity: 0.55, roughness: 0.4, side: THREE.DoubleSide,
  }) : new THREE.MeshStandardMaterial({ color: 0x9fb7c5, roughness: 0.25 });
  const glass = new THREE.Mesh(geo, glassMat);
  glass.position.z = 0.04;
  g.add(glass);

  const frameGeo = new THREE.EdgesGeometry(geo);
  const frame = new THREE.LineSegments(frameGeo, new THREE.LineBasicMaterial({ color: 0x8f7962 }));
  frame.position.z = 0.09;
  g.add(frame);
  parent.add(g);
  return g;
}

export function makeFlag(mat, width = 1.8, height = 1.0) {
  const geo = new THREE.PlaneGeometry(width, height, 14, 6);
  geo.translate(width / 2, -height / 2, 0);
  const mesh = new THREE.Mesh(geo, mat);
  mesh.userData.base = geo.attributes.position.array.slice();
  mesh.userData.phase = Math.random() * 10;
  mesh.castShadow = true;
  return mesh;
}

export function makeRibbon(points, width, material, yOffset = 0.08) {
  const curve = new THREE.CatmullRomCurve3(points);
  const segments = Math.max(24, points.length * 14);
  const verts = [];
  const uvs = [];
  const indices = [];
  const up = new THREE.Vector3(0, 1, 0);
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const p = curve.getPoint(t);
    const tangent = curve.getTangent(t);
    const side = new THREE.Vector3().crossVectors(tangent, up).normalize();
    const w = width * (0.9 + Math.sin(t * 12) * 0.05);
    const h1 = islandHeight(p.x + side.x * w * 0.5, p.z + side.z * w * 0.5) + yOffset;
    const h2 = islandHeight(p.x - side.x * w * 0.5, p.z - side.z * w * 0.5) + yOffset;
    verts.push(p.x + side.x * w * 0.5, h1, p.z + side.z * w * 0.5);
    verts.push(p.x - side.x * w * 0.5, h2, p.z - side.z * w * 0.5);
    uvs.push(0, t * 8, 1, t * 8);
    if (i < segments) {
      const a = i * 2;
      indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  const mesh = new THREE.Mesh(geo, material);
  mesh.receiveShadow = true;
  return mesh;
}

export function lerpAngle(a, b, t) {
  let d = b - a;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return a + d * t;
}
