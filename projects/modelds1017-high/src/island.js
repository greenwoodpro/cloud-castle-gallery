import * as THREE from 'three';
import {
  PAL,
  ISLAND_R,
  PLATEAU_Y,
  mat,
  mesh,
  box,
  cyl,
  cone,
  sph,
  ico,
  torus,
  clamp,
  smoothstep,
  lerp,
  fbm,
  vnoise,
  canvasTexture,
  makeBanner,
  waveBanner,
  glowSprite,
  shadowAll,
} from './utils.js';

/* ------------------------------------------------------------------ *
 *  地形高度：中心台地 + 缓坡 + 两道溪流刻槽
 * ------------------------------------------------------------------ */
const STREAM_PATHS = [
  [[-18, 13.6], [-10, 12.6], [-3, 11.6], [3, 11.2], [10, 11.8], [17, 13.0]],
  [[3, 11.2], [4.4, 14.6], [6.3, 18.2], [7.6, 21.4], [7.2, 24.2]],
];

function distToSegment(px, pz, ax, az, bx, bz) {
  const dx = bx - ax, dz = bz - az;
  const len2 = dx * dx + dz * dz || 1;
  let t = ((px - ax) * dx + (pz - az) * dz) / len2;
  t = clamp(t, 0, 1);
  const x = ax + dx * t, z = az + dz * t;
  return Math.hypot(px - x, pz - z);
}
function distToPath(px, pz, path) {
  let best = Infinity;
  for (let i = 0; i < path.length - 1; i++) {
    const d = distToSegment(px, pz, path[i][0], path[i][1], path[i + 1][0], path[i + 1][1]);
    if (d < best) best = d;
  }
  return best;
}
export function streamDepth(x, z) {
  let d = Infinity;
  for (const p of STREAM_PATHS) d = Math.min(d, distToPath(x, z, p));
  return 1.58 * Math.exp(-Math.pow(d / 1.28, 2));
}
export function distToStream(x, z) {
  let d = Infinity;
  for (const p of STREAM_PATHS) d = Math.min(d, distToPath(x, z, p));
  return d;
}

export function heightAt(x, z) {
  const d = Math.hypot(x, z);
  let h = PLATEAU_Y * (1 - smoothstep(14, 22.5, d));
  const rolling = (fbm(x * 0.085 + 2.1, z * 0.085 + 5.3, 3) - 0.5) * 1.9;
  h += rolling * smoothstep(12, 18, d) * (1 - smoothstep(23, 26, d) * 0.7);
  h += (fbm(x * 0.22 + 9, z * 0.22 + 1, 2) - 0.5) * 0.22 * smoothstep(12, 16, d);
  h -= streamDepth(x, z);
  h -= 1.5 * smoothstep(23.6, 26, d);
  return h;
}

export function waterY(x, z) {
  return heightAt(x, z) + 0.92;
}

/* ------------------------------------------------------------------ *
 *  岛屿顶面：极坐标网格，顶点着色
 * ------------------------------------------------------------------ */
function buildTerrain() {
  const SEG = 168;
  const RINGS = 34;
  const positions = [];
  const colors = [];
  const indices = [];
  const cGrass = new THREE.Color(PAL.grass);
  const cLight = new THREE.Color(PAL.grassLight);
  const cDark = new THREE.Color(PAL.grassDark);
  const cSoil = new THREE.Color(PAL.soil);
  const cRock = new THREE.Color(PAL.rock);

  const centerY = heightAt(0, 0);
  positions.push(0, centerY, 0);
  colors.push(cGrass.r, cGrass.g, cGrass.b);

  for (let i = 1; i <= RINGS; i++) {
    const t = i / RINGS;
    for (let j = 0; j < SEG; j++) {
      const a = (j / SEG) * Math.PI * 2;
      const edge = 1 - 0.055 * Math.pow(vnoise(Math.cos(a) * 2.7 + 10, Math.sin(a) * 2.7 + 4), 2);
      const r = ISLAND_R * Math.pow(t, 0.92) * edge;
      const x = Math.cos(a) * r;
      const z = Math.sin(a) * r;
      const y = heightAt(x, z);
      positions.push(x, y, z);

      const n = fbm(x * 0.16 + 3, z * 0.16 + 8, 3);
      const c = cGrass.clone();
      c.lerp(cLight, clamp(n * 1.4 - 0.25, 0, 1) * 0.8);
      c.lerp(cDark, clamp(0.55 - n, 0, 1) * 0.7);
      const nearWater = smoothstep(3.6, 1.2, distToStream(x, z));
      c.lerp(cSoil, nearWater * 0.55);
      const slope = Math.abs(heightAt(x + 0.8, z) - y) + Math.abs(heightAt(x, z + 0.8) - y);
      c.lerp(cRock, clamp((slope - 0.55) * 0.7, 0, 0.35));
      colors.push(c.r, c.g, c.b);
    }
  }

  const idx = (i, j) => 1 + (i - 1) * SEG + ((j + SEG) % SEG);
  for (let j = 0; j < SEG; j++) indices.push(0, idx(1, j + 1), idx(1, j));
  for (let i = 1; i < RINGS; i++) {
    for (let j = 0; j < SEG; j++) {
      const a = idx(i, j), b = idx(i, j + 1), c = idx(i + 1, j + 1), d = idx(i + 1, j);
      indices.push(a, b, c);
      indices.push(a, c, d);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();

  const m = new THREE.Mesh(
    geo,
    new THREE.MeshToonMaterial({ vertexColors: true, gradientMap: undefined })
  );
  // 用标准 toon 渐变
  m.material = new THREE.MeshToonMaterial({ vertexColors: true });
  m.receiveShadow = true;
  m.castShadow = false;
  return m;
}

/* ------------------------------------------------------------------ *
 *  岛底：层叠岩层 + 悬浮碎石
 * ------------------------------------------------------------------ */
function buildUnderside() {
  const SEG = 96;
  const RINGS = 14;
  const positions = [];
  const colors = [];
  const indices = [];

  const strata = [
    new THREE.Color(0xc9ac90),
    new THREE.Color(0xd7ad9c),
    new THREE.Color(0xb59a9c),
    new THREE.Color(0xa391a8),
    new THREE.Color(0x8c7f9a),
  ];

  const topY = [];
  for (let j = 0; j < SEG; j++) {
    const a = (j / SEG) * Math.PI * 2;
    const edge = ISLAND_R * (1 - 0.055 * Math.pow(vnoise(Math.cos(a) * 2.7 + 10, Math.sin(a) * 2.7 + 4), 2));
    const x = Math.cos(a) * edge;
    const z = Math.sin(a) * edge;
    topY.push({ x, z, y: heightAt(x, z) - 0.15 });
  }

  const TIP_Y = -17.5;
  for (let i = 0; i <= RINGS; i++) {
    const t = i / RINGS;
    const shrink = Math.pow(1 - t, 0.72) * (1 + 0.075 * Math.sin(t * 21));
    const wobble = 1 + 0.06 * Math.sin(t * 9 + 0.7);
    for (let j = 0; j < SEG; j++) {
      const a = (j / SEG) * Math.PI * 2;
      const edgeR = ISLAND_R * (1 - 0.055 * Math.pow(vnoise(Math.cos(a) * 2.7 + 10, Math.sin(a) * 2.7 + 4), 2));
      const r = edgeR * shrink * wobble;
      const y = lerp(topY[j].y, TIP_Y, Math.pow(t, 0.82)) + Math.sin(a * 6 + t * 8) * 0.35 * (1 - t) * t * 4;
      const x = Math.cos(a) * r;
      const z = Math.sin(a) * r;
      positions.push(x, y, z);

      const band = (t * 5.2 + 0.25 * vnoise(Math.cos(a) * 3 + 1, Math.sin(a) * 3 + t * 4)) % strata.length;
      const c = strata[Math.floor(band)].clone();
      c.multiplyScalar(0.92 + 0.16 * vnoise(x * 0.5, z * 0.5));
      colors.push(c.r, c.g, c.b);
    }
  }

  const idx = (i, j) => i * SEG + ((j + SEG) % SEG);
  for (let i = 0; i < RINGS; i++) {
    for (let j = 0; j < SEG; j++) {
      const a = idx(i, j), b = idx(i, j + 1), c = idx(i + 1, j + 1), d = idx(i + 1, j);
      indices.push(a, b, c);
      indices.push(a, c, d);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  const m = new THREE.Mesh(geo, new THREE.MeshToonMaterial({ vertexColors: true }));
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

function buildFloatingRocks() {
  const g = new THREE.Group();
  const specs = [
    [-16, -11, 9, 2.6],
    [15, -13, -6, 2.0],
    [-9, -18, -14, 1.6],
    [12, -8, 16, 1.3],
    [4, -22, 8, 1.1],
    [-20, -6, -3, 1.0],
    [20, -17, 2, 1.7],
  ];
  for (const [x, y, z, s] of specs) {
    const rock = ico(s, PAL.rock, { detail: 1, castShadow: false });
    rock.scale.set(1, 0.8 + Math.random() * 0.5, 1);
    rock.position.set(x, y, z);
    rock.rotation.set(Math.random(), Math.random(), Math.random());
    g.add(rock);
    const moss = ico(s * 0.62, PAL.grassDark, { detail: 0, castShadow: false });
    moss.position.set(x, y + s * 0.42, z);
    moss.scale.set(1, 0.28, 1);
    g.add(moss);
    if (s > 1.2) {
      const t = makeTree('round', 1.1 + Math.random() * 0.4);
      t.position.set(x + 0.2, y + s * 0.45, z);
      g.add(t);
    }
  }
  return g;
}

/* ------------------------------------------------------------------ *
 *  溪流 / 瀑布 / 桥
 * ------------------------------------------------------------------ */
function streamRibbon(points, width, color, lift, opacity) {
  const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(p[0], 0, p[1])));
  const N = 90;
  const pos = [];
  const uv = [];
  const idx = [];
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const p = curve.getPoint(t);
    const p2 = curve.getPoint(Math.min(1, t + 0.01));
    const dir = new THREE.Vector2(p2.x - p.x, p2.z - p.z).normalize();
    const nx = -dir.y, nz = dir.x;
    const y = heightAt(p.x, p.z) + lift;
    const w = width * (0.82 + 0.3 * vnoise(t * 7, 3));
    pos.push(p.x + nx * w / 2, y, p.z + nz * w / 2);
    pos.push(p.x - nx * w / 2, y, p.z - nz * w / 2);
    uv.push(0, t * 6, 1, t * 6);
  }
  for (let i = 0; i < N; i++) {
    const a = i * 2, b = i * 2 + 1, c = i * 2 + 2, d = i * 2 + 3;
    idx.push(a, c, b, b, c, d);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  const m = new THREE.Mesh(
    geo,
    new THREE.MeshToonMaterial({ color, transparent: true, opacity, side: THREE.DoubleSide })
  );
  m.receiveShadow = true;
  return m;
}

function buildWaterfall(start, dirOut, ctx) {
  const g = new THREE.Group();
  const W = 4.0, H = 17;
  const geo = new THREE.PlaneGeometry(W, H, 10, 26);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const t = (H / 2 - y) / H; // 0 top -> 1 bottom
    const curl = 1.1 * Math.pow(t, 1.4);
    pos.setZ(i, -Math.sin((x / W) * Math.PI) * 0.5 - curl * 0.15);
    pos.setX(i, x * (1 + t * 0.55));
  }
  geo.computeVertexNormals();

  const tex = canvasTexture(64, 256, (c2d, w, h) => {
    c2d.fillStyle = 'rgba(255,255,255,0.0)';
    c2d.fillRect(0, 0, w, h);
    for (let i = 0; i < 34; i++) {
      const x = Math.random() * w;
      const len = 30 + Math.random() * 130;
      const y = Math.random() * h;
      const grad = c2d.createLinearGradient(0, y, 0, y + len);
      grad.addColorStop(0, 'rgba(255,255,255,0)');
      grad.addColorStop(0.55, 'rgba(255,255,255,0.55)');
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      c2d.strokeStyle = grad;
      c2d.lineWidth = 1 + Math.random() * 2.4;
      c2d.beginPath();
      c2d.moveTo(x, y);
      c2d.lineTo(x, y + len);
      c2d.stroke();
    }
  });
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 2.4);

  const backing = new THREE.Mesh(
    geo.clone(),
    new THREE.MeshBasicMaterial({
      color: 0xbedaee,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide,
      depthWrite: false,
    })
  );
  backing.position.z = -0.06;
  g.add(backing);

  const waterfall = new THREE.Mesh(
    geo,
    new THREE.MeshBasicMaterial({
      color: 0xe8f7fc,
      map: tex,
      transparent: true,
      opacity: 0.95,
      side: THREE.DoubleSide,
      depthWrite: false,
    })
  );
  waterfall.userData.isWaterfall = true;
  waterfall.userData.tex = tex;
  g.add(waterfall);
  g.position.set(start.x, start.y - H / 2 + 0.2, start.z);
  g.rotation.y = Math.atan2(dirOut.x, dirOut.z);
  g.userData.tex = tex;

  for (let i = 0; i < 7; i++) {
    const s = glowSprite(2.4 + Math.random() * 2.4, 0xeaf7ff, 0.32);
    s.position.set((Math.random() - 0.5) * 3.6, -H - 0.6 + Math.random() * 2.6, (Math.random() - 0.5) * 2.2);
    s.userData.drift = { y: s.position.y, speed: 0.2 + Math.random() * 0.35, off: Math.random() * 10 };
    g.add(s);
    ctx.mist.push(s);
  }
  return g;
}

function buildStreams(ctx) {
  const g = new THREE.Group();
  g.add(streamRibbon(STREAM_PATHS[0], 2.9, PAL.water, 0.94, 0.86));
  g.add(streamRibbon(STREAM_PATHS[1], 2.5, PAL.water, 0.9, 0.86));

  // 河床的暖色石子
  for (const path of STREAM_PATHS) {
    const curve = new THREE.CatmullRomCurve3(path.map((p) => new THREE.Vector3(p[0], 0, p[1])));
    for (let i = 0; i < 46; i++) {
      const t = Math.random();
      const p = curve.getPoint(t);
      const off = (Math.random() - 0.5) * 3.1;
      const perp = new THREE.Vector3(-p.z, 0, p.x).normalize();
      const x = p.x + perp.x * off * 0.35, z = p.z + perp.z * off * 0.35;
      const s = 0.08 + Math.random() * 0.18;
      const pebble = ico(s, Math.random() > 0.5 ? PAL.stoneDark : PAL.rockPink, {
        detail: 0,
        castShadow: false,
      });
      pebble.position.set(x + (Math.random() - 0.5) * 2.2, heightAt(x, z) + 0.1, z + (Math.random() - 0.5) * 2.2);
      pebble.scale.y = 0.6;
      g.add(pebble);
    }
  }

  // 芦苇
  for (const path of STREAM_PATHS) {
    const curve = new THREE.CatmullRomCurve3(path.map((p) => new THREE.Vector3(p[0], 0, p[1])));
    for (let i = 0; i < 40; i++) {
      const t = Math.random();
      const p = curve.getPoint(t);
      const side = Math.random() > 0.5 ? 1 : -1;
      const perp = new THREE.Vector3(-p.z, 0, p.x).normalize().multiplyScalar(side * (1.6 + Math.random() * 0.6));
      const x = p.x + perp.x, z = p.z + perp.z;
      const reed = cone(0.05, 0.7 + Math.random() * 0.5, Math.random() > 0.4 ? PAL.grassDark : PAL.leaf, 5, {
        castShadow: false,
      });
      reed.position.set(x, heightAt(x, z) + 0.35, z);
      reed.rotation.z = (Math.random() - 0.5) * 0.3;
      g.add(reed);
    }
  }

  // 溪流尽头瀑布
  const end = STREAM_PATHS[1][STREAM_PATHS[1].length - 1];
  const dirOut = new THREE.Vector3(end[0], 0, end[1]).normalize();
  const fall = buildWaterfall({ x: end[0] + dirOut.x * 1.9, y: 1.0, z: end[1] + dirOut.z * 1.9 }, dirOut, ctx);
  g.add(fall);
  ctx.waterfall = fall;

  // 出水口的白色水花
  for (let i = 0; i < 4; i++) {
    const foam = ico(0.42 + Math.random() * 0.3, 0xf4fbfd, { detail: 0, castShadow: false });
    foam.position.set(
      end[0] + dirOut.x * (1.1 + i * 0.3) + (Math.random() - 0.5) * 0.8,
      0.95 + Math.random() * 0.25,
      end[1] + dirOut.z * (1.1 + i * 0.3) + (Math.random() - 0.5) * 0.8
    );
    foam.scale.y = 0.55;
    g.add(foam);
  }

  return g;
}

/* ------------------------------------------------------------------ *
 *  小路的贴地飘带
 * ------------------------------------------------------------------ */
export function ribbonPath(points, width, color, lift = 0.06, segs = 70) {
  const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(p[0], 0, p[1])));
  const pos = [], idx = [];
  for (let i = 0; i <= segs; i++) {
    const t = i / segs;
    const p = curve.getPoint(t);
    const p2 = curve.getPoint(Math.min(1, t + 0.02));
    const dir = new THREE.Vector2(p2.x - p.x, p2.z - p.z).normalize();
    const nx = -dir.y, nz = dir.x;
    const w = width * (0.9 + 0.14 * vnoise(t * 5, 2));
    const yL = heightAt(p.x + nx * w / 2, p.z + nz * w / 2) + lift;
    const yR = heightAt(p.x - nx * w / 2, p.z - nz * w / 2) + lift;
    const yC = heightAt(p.x, p.z) + lift;
    pos.push(p.x + nx * w / 2, Math.max(yL, yC), p.z + nz * w / 2);
    pos.push(p.x, yC + 0.015, p.z);
    pos.push(p.x - nx * w / 2, Math.max(yR, yC), p.z - nz * w / 2);
  }
  for (let i = 0; i < segs; i++) {
    const a = i * 3;
    idx.push(a, a + 3, a + 1, a + 1, a + 3, a + 4);
    idx.push(a + 1, a + 4, a + 2, a + 2, a + 4, a + 5);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  const m = new THREE.Mesh(geo, new THREE.MeshToonMaterial({ color, side: THREE.DoubleSide }));
  m.receiveShadow = true;
  m.castShadow = false;
  return m;
}

/* ------------------------------------------------------------------ *
 *  树、灌木、花、篱笆
 * ------------------------------------------------------------------ */
export function makeTree(kind = 'round', s = 1) {
  const g = new THREE.Group();
  if (kind === 'cypress') {
    const trunk = cyl(0.11 * s, 0.17 * s, 1.5 * s, PAL.woodDark, 7);
    trunk.position.y = 0.75 * s;
    g.add(trunk);
    const body = cone(0.72 * s, 3.2 * s, PAL.leaf, 10);
    body.position.y = 2.35 * s;
    g.add(body);
    const body2 = cone(0.54 * s, 2.0 * s, PAL.leafPale, 10);
    body2.position.y = 3.4 * s;
    g.add(body2);
  } else if (kind === 'apple') {
    const trunk = cyl(0.1 * s, 0.16 * s, 1.25 * s, PAL.woodDark, 7);
    trunk.position.y = 0.62 * s;
    g.add(trunk);
    const crown = ico(0.85 * s, PAL.leaf, { detail: 1 });
    crown.position.y = 1.85 * s;
    crown.scale.set(1.1, 0.9, 1.05);
    g.add(crown);
    for (let i = 0; i < 7; i++) {
      const a = (i / 7) * Math.PI * 2;
      const apple = sph(0.09 * s, PAL.red, { seg: 8, seg2: 6, castShadow: false });
      apple.position.set(Math.cos(a) * 0.75 * s, 1.7 * s + Math.sin(i * 2.1) * 0.35 * s, Math.sin(a) * 0.75 * s);
      g.add(apple);
    }
  } else if (kind === 'pine') {
    const trunk = cyl(0.1 * s, 0.16 * s, 1.1 * s, PAL.woodDark, 7);
    trunk.position.y = 0.55 * s;
    g.add(trunk);
    for (let i = 0; i < 3; i++) {
      const tier = cone((0.95 - i * 0.22) * s, 1.25 * s, i % 2 ? PAL.leafPale : PAL.leaf, 9);
      tier.position.y = (1.1 + i * 0.62) * s;
      g.add(tier);
    }
  } else if (kind === 'willow') {
    const trunk = cyl(0.14 * s, 0.22 * s, 1.7 * s, PAL.woodDark, 7);
    trunk.position.y = 0.85 * s;
    trunk.rotation.z = 0.08;
    g.add(trunk);
    const crown = sph(1.05 * s, PAL.leafPale, { seg: 12, seg2: 9 });
    crown.position.y = 2.2 * s;
    crown.scale.set(1.1, 0.85, 1);
    g.add(crown);
    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * Math.PI * 2;
      const strand = cone(0.07 * s, 1.3 * s + Math.random() * 0.5, PAL.leaf, 5, { castShadow: false });
      strand.position.set(Math.cos(a) * 0.9 * s, 1.75 * s, Math.sin(a) * 0.9 * s);
      strand.rotation.x = Math.PI;
      g.add(strand);
    }
  } else {
    // 圆冠树
    const trunk = cyl(0.12 * s, 0.19 * s, 1.4 * s, PAL.woodDark, 7);
    trunk.position.y = 0.7 * s;
    g.add(trunk);
    const crown = ico(0.95 * s, PAL.leaf, { detail: 1 });
    crown.position.y = 1.95 * s;
    crown.scale.set(1.05, 1, 1.05);
    g.add(crown);
    const crown2 = ico(0.6 * s, PAL.leafPale, { detail: 1 });
    crown2.position.set(0.45 * s, 2.35 * s, 0.2 * s);
    g.add(crown2);
  }
  shadowAll(g, true, true);
  return g;
}

function makeCottage(s = 1, roofColor = PAL.roofWarm) {
  const g = new THREE.Group();
  const base = roundedBoxLocal(1.9 * s, 1.5 * s, 1.6 * s, 0.1, PAL.cream);
  base.position.y = 0.75 * s;
  g.add(base);
  const roofGeo = new THREE.ConeGeometry(1.65 * s, 1.25 * s, 4, 1);
  roofGeo.rotateY(Math.PI / 4);
  const roof = new THREE.Mesh(roofGeo, mat(roofColor));
  roof.position.y = 2.05 * s;
  roof.scale.set(1, 1, 0.86);
  roof.castShadow = true;
  g.add(roof);
  const door = box(0.42 * s, 0.72 * s, 0.08 * s, PAL.woodDark);
  door.position.set(0, 0.36 * s, 0.82 * s);
  g.add(door);
  const win = box(0.34 * s, 0.34 * s, 0.07 * s, 0x8a6a4a);
  win.position.set(0.55 * s, 0.95 * s, 0.82 * s);
  g.add(win);
  const glow = new THREE.Mesh(
    new THREE.PlaneGeometry(0.26 * s, 0.26 * s),
    new THREE.MeshBasicMaterial({ color: 0xffd89a })
  );
  glow.position.set(0.55 * s, 0.95 * s, 0.87 * s);
  g.add(glow);
  const chimney = box(0.25 * s, 0.75 * s, 0.25 * s, PAL.stoneDark);
  chimney.position.set(-0.55 * s, 2.05 * s, -0.2 * s);
  g.add(chimney);
  shadowAll(g);
  return g;
}

// 局部圆角盒（避免循环依赖 utils 的 roundedBox，这里简版）
function roundedBoxLocal(w, h, d, r, color) {
  const geo = new THREE.BoxGeometry(w, h, d);
  return mesh(geo, color);
}

/* ------------------------------------------------------------------ *
 *  风车
 * ------------------------------------------------------------------ */
function makeWindmill(ctx) {
  const g = new THREE.Group();
  const tower = cyl(0.95, 1.35, 4.2, PAL.stoneWarm, 8);
  tower.position.y = 2.1;
  g.add(tower);
  const band = cyl(1.0, 1.0, 0.18, PAL.stoneDark, 8);
  band.position.y = 3.1;
  g.add(band);
  const roof = cone(1.25, 1.35, PAL.roofWarm, 8);
  roof.position.y = 4.85;
  g.add(roof);
  const door = box(0.55, 1.0, 0.12, PAL.woodDark);
  door.position.set(0, 0.5, 1.28);
  g.add(door);
  const win = new THREE.Mesh(
    new THREE.PlaneGeometry(0.4, 0.4),
    new THREE.MeshBasicMaterial({ color: 0xffd89a })
  );
  win.position.set(0, 2.4, 1.28);
  g.add(win);

  const hub = new THREE.Group();
  hub.position.set(0, 4.1, 1.34);
  g.add(hub);
  const axle = cyl(0.1, 0.1, 0.4, PAL.woodDark, 8);
  axle.rotation.x = Math.PI / 2;
  hub.add(axle);
  for (let i = 0; i < 4; i++) {
    const arm = new THREE.Group();
    arm.rotation.z = (i / 4) * Math.PI * 2;
    const spar = box(0.1, 2.6, 0.08, PAL.woodDark);
    spar.position.y = 1.3;
    arm.add(spar);
    const sail = box(0.62, 1.9, 0.04, PAL.cream);
    sail.position.set(0.35, 1.55, 0.03);
    arm.add(sail);
    for (let k = 0; k < 4; k++) {
      const slat = box(0.58, 0.03, 0.02, PAL.woodPale);
      slat.position.set(0.35, 0.85 + k * 0.45, 0.06);
      arm.add(slat);
    }
    hub.add(arm);
  }
  hub.userData.spin = 0.35;
  ctx.spinners.push(hub);
  shadowAll(g);
  return g;
}

/* ------------------------------------------------------------------ *
 *  主入口
 * ------------------------------------------------------------------ */
export function createIsland(ctx) {
  const group = new THREE.Group();
  group.name = 'island';

  group.add(buildTerrain());
  group.add(buildUnderside());
  group.add(buildFloatingRocks());
  group.add(buildStreams(ctx));

  // 主路：城门 → 桥 → 缓坡 → 草甸
  group.add(
    ribbonPath(
      [
        [0, 8.2],
        [0, 11.4],
        [1.5, 14.5],
        [4, 18],
        [7, 22.5],
      ],
      2.6,
      0xd9cbb0,
      0.07
    )
  );
  // 岔路：向西去村子
  group.add(
    ribbonPath(
      [
        [1.2, 14.8],
        [-4, 16.5],
        [-10, 17.5],
        [-15, 15.5],
      ],
      1.7,
      0xd2c3a6,
      0.07
    )
  );
  // 岔路：向东去玫瑰园
  group.add(
    ribbonPath(
      [
        [1.4, 15.2],
        [7, 15.6],
        [11, 14.2],
        [14.5, 12],
      ],
      1.5,
      0xd2c3a6,
      0.07
    )
  );

  // 西北梯田
  const fieldSpecs = [
    { x: -16.5, z: -8.5, w: 7.5, d: 5.2, color: 0xe8c46a, rows: 7 },
    { x: -16.5, z: -14.2, w: 7.5, d: 4.6, color: 0xd9b184, rows: 6 },
    { x: -9.5, z: -16.5, w: 5.6, d: 5.0, color: 0xae8fcb, rows: 6 },
    { x: -19.5, z: -2.5, w: 4.6, d: 5.0, color: 0x9fc487, rows: 6 },
    { x: 16.5, z: -10, w: 6.0, d: 5.5, color: 0xc7d48a, rows: 7 },
  ];
  for (const f of fieldSpecs) {
    const patch = drapedPlaneLocal(f.w, f.d, 12, 12, f.color, f.x, f.z, 0.24);
    group.add(patch);
    for (let i = 0; i < f.rows; i++) {
      const t = (i + 0.5) / f.rows;
      const zz = f.z - f.d / 2 + t * f.d;
      const row = drapedPlaneLocal(f.w * 0.9, 0.13, 16, 1, 0x8f7a52, f.x, zz, 0.27);
      group.add(row);
    }
    // 篱笆围边
    const hedgeMat = PAL.leaf;
    for (const [dx, dz, ww, dd] of [
      [f.x, f.z - f.d / 2, f.w, 0.22],
      [f.x, f.z + f.d / 2, f.w, 0.22],
      [f.x - f.w / 2, f.z, 0.22, f.d],
      [f.x + f.w / 2, f.z, 0.22, f.d],
    ]) {
      const h = box(ww, 0.24, dd, hedgeMat, { castShadow: false });
      h.position.set(dx, heightAt(dx, dz) + 0.3, dz);
      group.add(h);
    }
  }

  // 果园
  for (let i = 0; i < 9; i++) {
    const x = -18 + (i % 3) * 2.1;
    const z = 1.5 + Math.floor(i / 3) * 2.1;
    const t = makeTree('apple', 0.95);
    t.position.set(x, heightAt(x, z), z);
    t.rotation.y = Math.random() * 6;
    group.add(t);
  }

  // 零散树木（避开城堡与溪流）
  const treeSpots = [
    [-22, -17, 'pine', 1.1],
    [-18.5, -19, 'cypress', 1.0],
    [20.5, -16, 'pine', 1.0],
    [22, -10, 'round', 0.9],
    [19, 3, 'willow', 1.0],
    [21.5, 7, 'round', 0.85],
    [-21, 8, 'round', 0.9],
    [-19, 17.5, 'cypress', 0.9],
    [17, 18.5, 'round', 0.8],
    [12, 22, 'willow', 0.8],
    [-12, 21.5, 'round', 0.85],
    [-5, 20, 'cypress', 0.8],
    [14.5, -4.5, 'cypress', 0.85],
    [13.8, 4.2, 'round', 0.7],
    [-14.5, 6, 'apple', 0.8],
    [-7, -20, 'pine', 0.9],
  ];
  for (const [x, z, kind, s] of treeSpots) {
    if (Math.hypot(x, z) < 14) continue;
    const t = makeTree(kind, s);
    t.position.set(x, heightAt(x, z), z);
    t.rotation.y = Math.random() * 6.28;
    group.add(t);
  }

  // 风车
  const wm = makeWindmill(ctx);
  wm.position.set(-12.5, heightAt(-12.5, -19.5), -19.5);
  wm.rotation.y = 0.5;
  group.add(wm);

  // 小村子（三座茅屋）
  const cottages = [
    [-17.5, 18.5, 0.9, PAL.roofWarm],
    [-19.5, 13.8, 0.72, 0xc08a72],
    [-13.8, 19.8, 0.62, PAL.roofTeal],
  ];
  for (const [x, z, s, c] of cottages) {
    const h = makeCottage(s, c);
    h.position.set(x, heightAt(x, z), z);
    h.rotation.y = Math.random() * 0.7 - 0.35;
    group.add(h);
    if (Math.random() > 0.2) ctx.smokePoints.push(new THREE.Vector3(x - 0.55 * s, heightAt(x, z) + 2.5 * s, z - 0.2 * s));
  }

  // 羊圈
  const pen = new THREE.Group();
  const px = -13, pz = 15.2;
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    const x = px + Math.cos(a) * 3.0, z = pz + Math.sin(a) * 2.3;
    const post = cyl(0.07, 0.08, 0.9, PAL.woodDark, 6);
    post.position.set(x, heightAt(x, z) + 0.4, z);
    pen.add(post);
    if (i < 11) {
      const a2 = ((i + 1) / 12) * Math.PI * 2;
      const x2 = px + Math.cos(a2) * 3.0, z2 = pz + Math.sin(a2) * 2.3;
      const len = Math.hypot(x2 - x, z2 - z);
      const rail = box(len, 0.07, 0.07, PAL.woodPale, { castShadow: false });
      rail.position.set((x + x2) / 2, heightAt((x + x2) / 2, (z + z2) / 2) + 0.62, (z + z2) / 2);
      rail.rotation.y = -Math.atan2(z2 - z, x2 - x);
      pen.add(rail);
    }
  }
  group.add(pen);

  // 花丛与草簇（实例化）
  const flowerColors = [0xf2b8c6, 0xf7e0a3, 0xd9c2ea, 0xfff4e2, 0xe89aa8];
  const flowerGeo = new THREE.SphereGeometry(0.075, 6, 5);
  const flowers = new THREE.InstancedMesh(flowerGeo, mat(0xffffff), 900);
  flowers.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  flowers.castShadow = false;
  flowers.receiveShadow = false;
  const dummy = new THREE.Object3D();
  const col = new THREE.Color();
  let fi = 0;
  for (let i = 0; i < 900; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = 15 + Math.random() * 10;
    const x = Math.cos(a) * r, z = Math.sin(a) * r;
    if (distToStream(x, z) < 2.2) continue;
    dummy.position.set(x, heightAt(x, z) + 0.12, z);
    const s = 0.6 + Math.random() * 1.1;
    dummy.scale.setScalar(s);
    dummy.updateMatrix();
    flowers.setMatrixAt(fi, dummy.matrix);
    flowers.setColorAt(fi, col.setHex(flowerColors[Math.floor(Math.random() * flowerColors.length)]));
    fi++;
  }
  flowers.count = fi;
  flowers.instanceMatrix.needsUpdate = true;
  if (flowers.instanceColor) flowers.instanceColor.needsUpdate = true;
  group.add(flowers);

  // 草簇
  const tuftGeo = new THREE.ConeGeometry(0.09, 0.55, 4);
  const tufts = new THREE.InstancedMesh(tuftGeo, mat(PAL.grassDark), 700);
  tufts.castShadow = false;
  let ti = 0;
  for (let i = 0; i < 700; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = 15.5 + Math.random() * 9.5;
    const x = Math.cos(a) * r, z = Math.sin(a) * r;
    if (distToStream(x, z) < 2.0) continue;
    dummy.position.set(x, heightAt(x, z) + 0.2, z);
    dummy.scale.set(0.6 + Math.random(), 0.7 + Math.random(), 0.6 + Math.random());
    dummy.rotation.y = Math.random() * 6;
    dummy.updateMatrix();
    tufts.setMatrixAt(ti++, dummy.matrix);
  }
  tufts.count = ti;
  tufts.instanceMatrix.needsUpdate = true;
  group.add(tufts);

  // 岛缘的小草坡 / 边缘石
  for (let i = 0; i < 26; i++) {
    const a = (i / 26) * Math.PI * 2 + Math.random() * 0.1;
    const r = 22.5 + Math.random() * 2.8;
    const x = Math.cos(a) * r, z = Math.sin(a) * r;
    const rock = ico(0.3 + Math.random() * 0.4, Math.random() > 0.5 ? PAL.rock : PAL.stoneDark, {
      detail: 0,
      castShadow: false,
    });
    rock.position.set(x, heightAt(x, z) + 0.05, z);
    rock.scale.y = 0.55;
    group.add(rock);
  }

  return group;
}

/* 贴地小平面（带顶点高度的平面） */
function drapedPlaneLocal(w, d, sx, sz, color, cx, cz, lift) {
  const geo = new THREE.PlaneGeometry(w, d, sx, sz);
  geo.rotateX(-Math.PI / 2);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i) + cx, z = pos.getZ(i) + cz;
    pos.setY(i, heightAt(x, z) + lift);
  }
  geo.translate(cx, 0, cz);
  geo.computeVertexNormals();
  const m = new THREE.Mesh(geo, new THREE.MeshToonMaterial({ color }));
  m.receiveShadow = true;
  m.castShadow = false;
  return m;
}