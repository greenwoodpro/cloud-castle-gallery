import * as THREE from 'three';
import {
  P, rnd, hash2, smoothstep, lerp, clamp, gradientMap,
  box, sphere, ico, cone, cyl, toon, onFrame, glowSprite, addMesh, pick, makeCanvasTexture,
} from './utils.js';

export function terrainHeight(x, z) {
  let h = 0.62;
  h += 0.42 * Math.sin(x * 0.31 + 0.8) * Math.cos(z * 0.26 - 0.4);
  h += 0.22 * Math.sin((x + z) * 0.48 + 2.1);
  h += 1.05 * Math.exp(-(((x - 6.8) ** 2 + (z - 9.4) ** 2) / (2 * 3.6 ** 2)));
  h += 0.5 * Math.exp(-(((x + 10.5) ** 2 + (z + 1.5) ** 2) / (2 * 4.6 ** 2)));
  h += 0.3 * Math.exp(-(((x - 10) ** 2 + (z - 3.2) ** 2) / (2 * 3.2 ** 2)));
  h += 0.24 * Math.exp(-(((x - 1.5) ** 2 + (z - 12.2) ** 2) / (2 * 2.4 ** 2)));
  const pondD = Math.hypot(x + 9.2, z - 7.9);
  const pondMask = smoothstep(4.5, 2.2, pondD);
  h = lerp(h, 0.5, pondMask * 0.92);
  const r = Math.hypot(x, z) / 18.4;
  h = lerp(h, 0.2, smoothstep(0.84, 1.0, r));
  return h;
}

export function edgeNoise(a) {
  return 1 + 0.05 * Math.sin(a * 3 + 0.4) + 0.028 * Math.sin(a * 7 + 1.7) +
    0.015 * Math.sin(a * 13 + 3.1) + 0.008 * Math.sin(a * 23 + 0.7);
}

let _grassMap = null;
function grassMap() {
  if (_grassMap) return _grassMap;
  _grassMap = makeCanvasTexture(512, 512, (ctx, w, h) => {
    ctx.fillStyle = '#fffdf4';
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 70; i++) {
      const x = rnd(0, w);
      const y = rnd(0, h);
      const r = rnd(18, 90);
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, i % 3 === 0 ? 'rgba(137,162,115,0.20)' : 'rgba(218,226,190,0.28)');
      g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    for (let i = 0; i < 800; i++) {
      const x = rnd(0, w);
      const y = rnd(0, h);
      ctx.strokeStyle = i % 3 === 0 ? 'rgba(116,142,95,0.17)' : 'rgba(242,246,218,0.24)';
      ctx.lineWidth = rnd(0.7, 1.8);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + rnd(-3, 3), y + rnd(-7, -2));
      ctx.stroke();
    }
    for (let i = 0; i < 60; i++) {
      ctx.fillStyle = 'rgba(255,255,255,0.15)';
      ctx.fillRect(rnd(0, w), rnd(0, h), 2, 2);
    }
  });
  _grassMap.wrapS = _grassMap.wrapT = THREE.RepeatWrapping;
  return _grassMap;
}

function makeRock() {
  const profile = [
    [17.98, 0.05], [18.1, -0.3], [17.8, -0.95], [17.1, -1.9],
    [16.0, -3.1], [14.5, -4.6], [12.7, -6.2], [10.9, -7.9],
    [9.0, -9.5], [7.0, -11.0], [5.1, -12.3], [3.2, -13.3], [1.3, -13.9], [0.1, -14.15],
  ];
  const pts = profile.map(([r, y]) => new THREE.Vector2(r, y));
  const geo = new THREE.LatheGeometry(pts, 96);
  const pos = geo.attributes.position;
  const colors = [];
  const palette = P.rock.map((c) => new THREE.Color(c));
  const moss = new THREE.Color(0x8fae7c);
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    const y = pos.getY(i);
    const ang = Math.atan2(z, x);
    const wob = edgeNoise(ang) * (1 + 0.018 * Math.sin(ang * 17 + 1.2) + 0.01 * Math.sin(ang * 31 + 0.3));
    pos.setX(i, x * wob);
    pos.setZ(i, z * wob);
    pos.setY(i, y + 0.2 * Math.sin(ang * 5 + y * 0.42) * smoothstep(-1, -4, y));
    const band = Math.floor((-y) / 1.55 + Math.sin(ang * 2.0) * 0.35 + hash2(ang * 3, y) * 0.3);
    const c = palette[((band % palette.length) + palette.length) % palette.length].clone();
    c.offsetHSL(0, 0, (hash2(x * 1.7, z * 1.3 + y) - 0.5) * 0.085);
    if (y > -1.1 && hash2(x, z) > 0.55) c.lerp(moss, 0.35);
    colors.push(c.r, c.g, c.b);
  }
  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  const g = geo.toNonIndexed();
  g.computeVertexNormals();
  const mat = new THREE.MeshToonMaterial({ vertexColors: true, gradientMap: gradientMap() });
  const mesh = new THREE.Mesh(g, mat);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function makeGrass() {
  const R = 18.45;
  const SEG = 144;
  const rings = [
    { r: 0.0, off: 0 }, { r: 0.06, off: 0 }, { r: 0.13, off: 0 }, { r: 0.21, off: 0 },
    { r: 0.3, off: 0 }, { r: 0.4, off: 0 }, { r: 0.5, off: 0 }, { r: 0.6, off: 0 },
    { r: 0.7, off: 0 }, { r: 0.79, off: 0 }, { r: 0.87, off: 0 }, { r: 0.93, off: 0 },
    { r: 0.975, off: 0 }, { r: 1.0, off: -0.18 }, { r: 1.016, off: -0.55 }, { r: 1.022, off: -1.5 },
  ];
  const positions = [];
  const colors = [];
  const uvs = [];
  const indices = [];
  const cGrass = new THREE.Color(P.grass);
  const cLight = new THREE.Color(P.grassLight);
  const cDeep = new THREE.Color(P.grassDeep);
  const cSoil = new THREE.Color(0x947e63);
  const cMoss = new THREE.Color(0x6f9874);
  for (let row = 0; row < rings.length; row++) {
    const ring = rings[row];
    for (let i = 0; i < SEG; i++) {
      const a = (i / SEG) * Math.PI * 2;
      const edgeWob = edgeNoise(a) * (1 + 0.006 * Math.sin(a * 29 + 1.1));
      const rr = R * ring.r * edgeWob;
      const x = Math.cos(a) * rr;
      const z = Math.sin(a) * rr;
      let y = terrainHeight(x, z) + ring.off;
      if (row === 13) y = terrainHeight(x, z) - 0.18;
      if (row === 14) y = -0.6;
      if (row === 15) y = -1.5;
      positions.push(x, y, z);
      uvs.push(x * 0.105 + 0.5, z * 0.105 + 0.5);
      let c;
      if (row < 12) {
        c = cGrass.clone();
        const n = 0.5 + 0.5 * Math.sin(x * 0.33 + 2.1) * Math.cos(z * 0.29 - 0.8);
        c.lerp(cLight, clamp(n * 0.55 + hash2(x, z) * 0.22, 0, 0.75));
        c.lerp(cDeep, clamp(hash2(x * 1.3 + 4, z * 1.1) * 0.4, 0, 0.38));
        if (hash2(x * 0.27 + 7.1, z * 0.23 + 3.4) > 0.9) c.lerp(cSoil, 0.16);
        const pondD = Math.hypot(x + 9.2, z - 7.9);
        c.lerp(cMoss, smoothstep(4.5, 2.4, pondD) * 0.35);
        const castleD = Math.hypot(x + 2, z + 5.5);
        if (castleD < 10.5) c.lerp(cDeep, 0.16);
      } else if (row < 13) {
        c = cGrass.clone().lerp(cLight, 0.18);
      } else if (row === 13) {
        c = cMoss.clone().lerp(cDeep, 0.4);
      } else {
        c = cSoil.clone().lerp(cMoss, row === 14 ? 0.6 : 0.15);
      }
      c.offsetHSL(0, 0, (hash2(x * 0.7, z * 0.9) - 0.5) * 0.035);
      colors.push(c.r, c.g, c.b);
    }
  }
  for (let row = 0; row < rings.length - 1; row++) {
    for (let i = 0; i < SEG; i++) {
      const a = row * SEG + i;
      const b = row * SEG + ((i + 1) % SEG);
      const c = (row + 1) * SEG + i;
      const d = (row + 1) * SEG + ((i + 1) % SEG);
      indices.push(a, b, c, b, d, c);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  const mat = new THREE.MeshToonMaterial({ vertexColors: true, gradientMap: gradientMap(), map: grassMap() });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.receiveShadow = true;
  mesh.castShadow = true;
  return mesh;
}

function makeVine(parent, x, y, z, len, color = P.leafDeep) {
  const pts = [];
  const sway = rnd(-0.6, 0.6);
  for (let i = 0; i <= 6; i++) {
    const t = i / 6;
    pts.push(new THREE.Vector3(x + Math.sin(t * 3 + sway) * 0.25, y - t * len, z + Math.cos(t * 2.5 + sway) * 0.2));
  }
  const curve = new THREE.CatmullRomCurve3(pts);
  const geo = new THREE.TubeGeometry(curve, 12, 0.035, 4, false);
  const m = new THREE.Mesh(geo, toon(color));
  m.castShadow = true;
  parent.add(m);
  for (let i = 1; i < 7; i++) {
    const p = curve.getPoint(i / 8);
    const leaf = addMesh(parent, new THREE.SphereGeometry(0.12, 5, 4), toon(P.leaf), [p.x + rnd(-0.1, 0.1), p.y, p.z + rnd(-0.1, 0.1)], {
      scale: [1, 0.35, 0.55],
      rot: [rnd(0, 1), rnd(0, 3), rnd(0, 1)],
      cast: false,
    });
  }
}

function makeUnderLantern(parent, x, y, z) {
  cyl(parent, 0.015, 0.015, 1.8, P.iron, x, y - 0.9, z, { segments: 5 });
  const cage = new THREE.Group();
  cage.position.set(x, y - 1.95, z);
  parent.add(cage);
  cyl(cage, 0.16, 0.2, 0.1, P.iron, 0, 0.12, 0, { segments: 4 });
  cone(cage, 0.22, 0.18, P.iron, 0, -0.1, 0, { segments: 4, rot: [Math.PI, 0, 0] });
  const glowMat = new THREE.MeshBasicMaterial({ color: 0xffd795, toneMapped: false });
  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 6), glowMat);
  cage.add(bulb);
  glowSprite(cage, 0xffc987, 1.4, 0, 0, 0, 0.5);
  onFrame((t) => {
    cage.rotation.z = Math.sin(t * 0.6 + x) * 0.08;
    cage.rotation.x = Math.cos(t * 0.45 + z) * 0.06;
  });
}

function makeIslet(size) {
  const g = new THREE.Group();
  const rock = ico(g, size, pick(P.rock), 0, -size * 0.35, 0, {
    scale: [1.0, 0.72, 0.9],
    rot: [rnd(0, 1), rnd(0, 3), rnd(0, 1)],
    low: false,
  });
  const cap = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), toon(P.grass));
  cap.scale.set(size * 0.92, size * 0.22, size * 0.82);
  cap.position.y = size * 0.18;
  cap.castShadow = true;
  cap.receiveShadow = true;
  g.add(cap);
  return g;
}

export function buildIsland(root) {
  const rock = makeRock();
  root.add(rock);
  const grass = makeGrass();
  root.add(grass);

  for (let i = 0; i < 7; i++) {
    const a = rnd(0, Math.PI * 2);
    const r = rnd(2, 12);
    const size = rnd(0.4, 1.2);
    const x = Math.cos(a) * (18.2 + rnd(-0.6, 0.4));
    const z = Math.sin(a) * (18.2 + rnd(-0.6, 0.4));
    const b = ico(root, size, pick(P.rock), x, rnd(-3.2, -1.2), z, {
      scale: [1.3, 0.8, 1],
      rot: [rnd(0, 2), rnd(0, 3), rnd(0, 2)],
    });
  }

  makeVine(root, 7.5, -1.4, -13.2, 5.2);
  makeVine(root, -11.2, -2.1, 7.6, 4.1, P.leafBlue);
  makeVine(root, -5.0, -1.8, -14.5, 5.8);
  makeVine(root, 13.6, -2.8, -5.1, 3.8, P.leafDeep);
  makeUnderLantern(root, 10.2, -1.2, 8.2);

  const isletSpecs = [
    { a: 2.4, r: 27, y: 4.8, s: 2.1, decor: 'tree' },
    { a: -0.9, r: 24, y: -5.4, s: 1.3, decor: 'lantern' },
    { a: 1.25, r: 30, y: -1.2, s: 1.6, decor: 'chair' },
    { a: 3.6, r: 23, y: 8.2, s: 0.9, decor: 'none' },
  ];
  const islets = new THREE.Group();
  root.add(islets);
  for (const spec of isletSpecs) {
    const islet = makeIslet(spec.s);
    islet.position.set(Math.cos(spec.a) * spec.r, spec.y, Math.sin(spec.a) * spec.r);
    islets.add(islet);
    if (spec.decor === 'tree') {
      cyl(islet, 0.05, 0.08, 0.8, P.wood, 0.15, spec.s * 0.36, 0.1, { segments: 6 });
      sphere(islet, 0.55, P.leaf, 0.15, spec.s * 0.36 + 0.8, 0.1, { scale: [1.1, 0.85, 1.05] });
      sphere(islet, 0.38, P.leafLight, 0.55, spec.s * 0.36 + 0.6, 0.25, { low: true });
    } else if (spec.decor === 'lantern') {
      box(islet, 0.22, 0.3, 0.22, P.iron, 0, spec.s * 0.3 + 0.2, 0);
      glowSprite(islet, 0xffc87d, 1.5, 0, spec.s * 0.3 + 0.2, 0.15, 0.55);
    } else if (spec.decor === 'chair') {
      box(islet, 0.34, 0.05, 0.3, P.woodLight, 0, spec.s * 0.28 + 0.4, 0, { rot: [0, 0.5, 0] });
      box(islet, 0.34, 0.45, 0.05, P.woodLight, 0, spec.s * 0.28 + 0.62, -0.13, { rot: [0, 0.5, 0] });
      box(islet, 0.05, 0.4, 0.28, P.woodLight, -0.15, spec.s * 0.28 + 0.2, 0, { rot: [0, 0.5, 0] });
      box(islet, 0.05, 0.4, 0.28, P.woodLight, 0.15, spec.s * 0.28 + 0.2, 0, { rot: [0, 0.5, 0] });
    }
    const phase = rnd(0, 6.28);
    const baseY = islet.position.y;
    const spin = rnd(-0.02, 0.02);
    onFrame((t) => {
      islet.position.y = baseY + Math.sin(t * 0.35 + phase) * 0.35;
      islet.rotation.y = phase + t * spin;
    });
  }

  const crown = new THREE.Group();
  root.add(crown);
  for (let i = 0; i < 5; i++) {
    const a = rnd(0, Math.PI * 2);
    const r = rnd(1.0, 3.5);
    const sx = Math.cos(a) * r;
    const sz = Math.sin(a) * r;
    if (sz < 4 && sx > -5) continue;
    const tuft = new THREE.Mesh(new THREE.ConeGeometry(0.24, 1.1, 5), toon(P.leafDeep));
    tuft.position.set(sx, terrainHeight(sx, sz) + 0.25, sz);
    tuft.rotation.z = rnd(-0.15, 0.15);
    crown.add(tuft);
  }

  return { rock, grass };
}
