import * as THREE from 'three';
import {
  P, rnd, onFrame, gradientMap, box, sphere, ico, cone, cyl, disc, toon, basic,
  glowSprite, makeStar, LAYOUT,
} from './utils.js';
import { terrainHeight } from './terrain.js';

function swayGroup(g, phase, amp = 0.012) {
  onFrame((t) => {
    g.rotation.z = Math.sin(t * 0.5 + phase) * amp;
    g.rotation.x = Math.cos(t * 0.37 + phase * 1.7) * amp * 0.6;
  });
}

function makeRoundTree(x, z, scale = 1, fruit = false) {
  const g = new THREE.Group();
  const y = terrainHeight(x, z);
  g.position.set(x, y, z);
  cyl(g, 0.1 * scale, 0.17 * scale, 1.45 * scale, P.wood, 0, 0.72 * scale, 0, { segments: 7 });
  const branch = cyl(g, 0.05 * scale, 0.08 * scale, 0.8 * scale, P.wood, 0.25 * scale, 1.35 * scale, 0.08, {
    segments: 5, rot: [0, 0, -0.5],
  });
  const blobs = [
    [0, 2.05, 0, 1.0, P.leaf],
    [0.62, 1.82, 0.18, 0.66, P.leafLight],
    [-0.55, 1.94, 0.15, 0.62, P.leafDeep],
    [0.08, 2.3, -0.4, 0.58, P.leafLight],
    [-0.25, 1.65, 0.5, 0.48, P.leaf],
  ];
  for (const [bx, by, bz, br, col] of blobs) {
    sphere(g, br * scale, col, bx * scale, by * scale, bz * scale, { low: true, scale: [1.1, 0.9, 1] });
  }
  if (fruit) {
    for (let i = 0; i < 7; i++) {
      const a = rnd(0, 6.28);
      const rr = rnd(0.4, 1.0);
      sphere(g, 0.06 * scale, P.rose, Math.cos(a) * rr * scale, (1.75 + rnd(0, 0.5)) * scale, Math.sin(a) * rr * scale, { low: true });
    }
  }
  for (let i = 0; i < 4; i++) {
    sphere(g, 0.16 * scale, i % 2 ? P.leafLight : P.leafDeep, rnd(-0.7, 0.7) * scale, 0.22 * scale, rnd(-0.7, 0.7) * scale, { low: true, scale: [1, 0.5, 1] });
  }
  swayGroup(g, rnd(0, 6), 0.009);
  return g;
}

function makePineTree(x, z, scale = 1) {
  const g = new THREE.Group();
  g.position.set(x, terrainHeight(x, z), z);
  cyl(g, 0.08 * scale, 0.14 * scale, 1.2 * scale, P.woodDark, 0, 0.6 * scale, 0, { segments: 6 });
  const layers = [
    [1.15, 1.7, 1.55, P.leafDeep],
    [0.9, 1.4, 2.55, P.leaf],
    [0.62, 1.1, 3.45, P.leafLight],
  ];
  for (const [r, h, y, col] of layers) {
    cone(g, r * scale, h * scale, col, 0, y * scale, 0, { segments: 9 });
  }
  swayGroup(g, rnd(0, 6), 0.007);
  return g;
}

function makeCypress(x, z, scale = 1) {
  const g = new THREE.Group();
  g.position.set(x, terrainHeight(x, z), z);
  cyl(g, 0.06 * scale, 0.12 * scale, 1.3 * scale, P.woodDark, 0, 0.65 * scale, 0, { segments: 6 });
  sphere(g, 0.62 * scale, P.leafDeep, 0, 2.55 * scale, 0, { scale: [0.72, 2.0, 0.72] });
  sphere(g, 0.42 * scale, P.leaf, 0.12 * scale, 3.1 * scale, 0, { low: true, scale: [0.8, 1.4, 0.8] });
  swayGroup(g, rnd(0, 6), 0.006);
  return g;
}

function makeBirch(x, z, scale = 1) {
  const g = new THREE.Group();
  g.position.set(x, terrainHeight(x, z), z);
  cyl(g, 0.06 * scale, 0.11 * scale, 1.7 * scale, 0xf2ead9, 0, 0.85 * scale, 0, { segments: 7 });
  for (let i = 0; i < 7; i++) {
    box(g, 0.05 * scale, 0.025 * scale, 0.12 * scale, 0x5a5048, 0.08 * scale, (0.3 + i * 0.2) * scale, 0, { cast: false });
  }
  sphere(g, 0.75 * scale, P.leafLight, 0, 2.1 * scale, 0, { scale: [1, 0.85, 1] });
  sphere(g, 0.5 * scale, P.leaf, 0.45 * scale, 2.25 * scale, 0.2 * scale, { low: true });
  sphere(g, 0.42 * scale, P.leaf, -0.4 * scale, 1.9 * scale, -0.2 * scale, { low: true });
  swayGroup(g, rnd(0, 6), 0.01);
  return g;
}

function addTrees(island) {
  const specs = [
    [-10.8, -1.4, 'round', 1.16, false],
    [-12.8, 0.5, 'pine', 1.1, false],
    [-11.5, -3.6, 'birch', 1.0, false],
    [-13.8, 3.0, 'cypress', 1.05, false],
    [-9.3, -5.7, 'pine', 0.9, false],
    [-12.6, -6.2, 'round', 0.92, false],
    [-7.9, 4.6, 'birch', 0.82, false],
    [-6.0, -12.0, 'pine', 1.2, false],
    [1.8, -13.4, 'cypress', 1.0, false],
    [8.5, -12.3, 'round', 1.15, false],
    [-14.6, -1.8, 'pine', 0.92, false],
    [10.4, -5.2, 'round', 0.85, true],
    [12.4, -2.8, 'round', 0.8, true],
    [13.3, 1.0, 'birch', 0.9, false],
    [11.7, 5.6, 'round', 0.9, false],
    [15.8, 6.5, 'round', 1.15, false],
    [3.0, 15.8, 'cypress', 0.85, false],
    [2.0, 10.5, 'birch', 0.82, false],
    [14.2, -8.2, 'pine', 1.0, false],
    [2.5, 13.4, 'round', 0.75, false],
    [-4.7, 12.2, 'round', 0.9, false],
  ];
  for (const [x, z, type, s, fruit] of specs) {
    let t;
    if (type === 'round') t = makeRoundTree(x, z, s, fruit);
    else if (type === 'pine') t = makePineTree(x, z, s);
    else if (type === 'cypress') t = makeCypress(x, z, s);
    else t = makeBirch(x, z, s);
    island.add(t);
  }
}

function scatterRocks(island) {
  const spots = [
    [-15.6, 1.8, 0.55], [-7.8, 6.4, 0.35], [-6.4, -8.6, 0.6], [3.6, 12.7, 0.45],
    [11.5, 8.7, 0.5], [15.2, -3.5, 0.7], [-1.8, 10.8, 0.3], [8.9, -8.8, 0.45],
    [-14.2, 6.3, 0.4], [5.9, -9.7, 0.35],
  ];
  for (const [x, z, s] of spots) {
    const y = terrainHeight(x, z);
    const rock = ico(island, s, rnd() > 0.5 ? P.rock[1] : P.rock[3], x, y + s * 0.25, z, {
      scale: [1.3, 0.7, 1], rot: [rnd(0, 2), rnd(0, 4), rnd(0, 2)],
    });
    if (rnd() > 0.4) {
      sphere(island, s * 0.75, P.leafDeep, x + rnd(-0.3, 0.3), y + s * 0.55, z + rnd(-0.3, 0.3), {
        low: true, scale: [1, 0.4, 1],
      });
    }
  }
}

function makeRoseBloom(parent, x, y, z, s = 1, color = P.rose) {
  const g = new THREE.Group();
  g.position.set(x, y, z);
  parent.add(g);
  const colors = [color, 0xef9da1, 0xc97680];
  for (let layer = 0; layer < 3; layer++) {
    const n = 5 + layer * 2;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + layer * 0.4;
      const r = (0.06 + layer * 0.035) * s;
      const petal = sphere(g, (0.06 - layer * 0.01) * s, colors[layer % 3], Math.cos(a) * r, layer * 0.025 * s, Math.sin(a) * r, {
        low: true, scale: [1.0, 0.55, 1.5], rot: [0, -a, 0.2],
      });
    }
  }
  sphere(g, 0.05 * s, 0xb85c68, 0, 0.09 * s, 0, { low: true, scale: [1, 0.8, 1] });
  return g;
}

function makeRosePlant(x, z, s = 1, parent) {
  const g = new THREE.Group();
  g.position.set(x, terrainHeight(x, z), z);
  parent.add(g);
  const stemMat = toon(P.leafDeep);
  for (let i = 0; i < 5; i++) {
    const a = rnd(0, 6.28);
    const bend = rnd(0.3, 0.8);
    const stem = cyl(g, 0.012 * s, 0.02 * s, rnd(0.5, 1.0) * s, stemMat, 0, 0.3 * s, 0, {
      segments: 4, rot: [bend * Math.cos(a), 0, bend * Math.sin(a)],
    });
    const h = rnd(0.45, 0.9) * s;
    const dx = Math.sin(a) * 0.25 * s;
    const dz = Math.cos(a) * 0.25 * s;
    makeRoseBloom(g, dx, h, dz, s * rnd(0.8, 1.1));
    for (let k = 0; k < 2; k++) {
      sphere(g, 0.07 * s, k ? P.leaf : P.leafDeep, dx * 0.7 + rnd(-0.1, 0.1), h * 0.5 + k * 0.1, dz * 0.7, {
        low: true, scale: [0.8, 0.25, 1.4], rot: [rnd(-0.5, 0.5), rnd(0, 3), 0],
      });
    }
  }
  return g;
}

function buildGarden(island) {
  const cx = LAYOUT.garden.x;
  const cz = LAYOUT.garden.z;
  const cy = terrainHeight(cx, cz);
  const g = new THREE.Group();
  g.position.set(cx, cy, cz);
  island.add(g);
  const bed = disc(g, 2.15, 0xcfbfa4, 0, 0.015, 0, { segments: 40, cast: false });
  const ring = new THREE.Mesh(new THREE.RingGeometry(2.02, 2.28, 48), toon(P.stoneLight));
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.03;
  ring.receiveShadow = true;
  g.add(ring);
  for (let i = 0; i < 26; i++) {
    const a = rnd(0, Math.PI * 2);
    const rr = rnd(2.15, 2.4);
    sphere(g, rnd(0.06, 0.12), P.stoneLight, Math.cos(a) * rr, 0.04, Math.sin(a) * rr, { low: true, scale: [1, 0.4, 1] });
  }
  const pedestal = cyl(g, 0.45, 0.55, 0.52, P.stone, 0, 0.28, 0, { segments: 12 });
  cyl(g, 0.58, 0.6, 0.08, P.stoneLight, 0, 0.56, 0, { segments: 12 });
  cyl(g, 0.36, 0.42, 0.12, P.stoneDim, 0, 0.64, 0, { segments: 12 });
  const rose = makeRosePlant(0, 0, 1.0, g);
  rose.position.y = 0.64;
  rose.scale.setScalar(0.95);
  const stem = cyl(rose, 0.02, 0.03, 0.55, P.leafDeep, 0, 0.28, 0, { segments: 5 });
  for (let i = 0; i < 4; i++) {
    sphere(rose, 0.1, i % 2 ? P.leaf : P.leafDeep, Math.cos(i * 1.7) * 0.16, 0.25 + i * 0.1, Math.sin(i * 1.7) * 0.16, {
      low: true, scale: [0.9, 0.28, 1.2], rot: [0, i * 2, 0.4],
    });
  }
  const bloom = makeRoseBloom(rose, 0, 0.76, 0, 1.8, P.rose);
  glowSprite(rose, 0xffb2ad, 1.3, 0, 0.78, 0, 0.28);
  const glass = new THREE.Mesh(
    new THREE.SphereGeometry(0.6, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.72),
    new THREE.MeshPhysicalMaterial({
      color: 0xe9f5ff, transparent: true, opacity: 0.18, roughness: 0.06,
      metalness: 0.0, clearcoat: 1, side: THREE.DoubleSide, depthWrite: false,
    })
  );
  glass.position.y = 1.25;
  glass.castShadow = false;
  g.add(glass);
  sphere(g, 0.065, P.stoneLight, 0, 1.79, 0, { low: true });
  const glassBase = new THREE.Mesh(new THREE.TorusGeometry(0.585, 0.035, 6, 28), toon(P.gold));
  glassBase.rotation.x = Math.PI / 2;
  glassBase.position.y = 0.87;
  g.add(glassBase);
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + 0.5;
    makeRosePlant(Math.cos(a) * 1.55, Math.sin(a) * 1.55, 0.7, g);
  }
  makeRosePlant(1.3, 0.2, 0.55, g);
  makeRosePlant(-1.15, -0.4, 0.6, g);

  const bench = new THREE.Group();
  bench.position.set(1.8, 0, 1.85);
  bench.rotation.y = -2.25;
  g.add(bench);
  box(bench, 1.5, 0.1, 0.42, P.wood, 0, 0.5, 0);
  box(bench, 1.5, 0.55, 0.08, P.wood, 0, 0.78, -0.18, { rot: [-0.12, 0, 0] });
  for (const sx of [-1, 1]) {
    box(bench, 0.1, 0.5, 0.38, P.stoneDim, sx * 0.6, 0.25, 0);
  }
  const can = new THREE.Group();
  can.position.set(-0.7, 0.06, 1.4);
  can.rotation.y = 0.8;
  g.add(can);
  cyl(can, 0.16, 0.18, 0.3, 0x9fb8b5, 0, 0.16, 0, { segments: 10 });
  cyl(can, 0.03, 0.045, 0.42, 0x9fb8b5, 0.27, 0.23, 0, { segments: 6, rot: [0, 0, -0.9] });
  const handle = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.02, 5, 14, Math.PI), toon(0x9fb8b5));
  handle.position.set(-0.06, 0.32, 0);
  handle.rotation.z = 0.2;
  can.add(handle);

  const arch = new THREE.Group();
  arch.position.set(-2.55, 0, -0.2);
  arch.rotation.y = 0.9;
  g.add(arch);
  for (const sx of [-1, 1]) {
    cyl(arch, 0.06, 0.09, 2.2, P.wood, sx * 1.05, 1.1, 0, { segments: 6 });
    for (let i = 0; i < 3; i++) {
      sphere(arch, 0.18, i % 2 ? P.leaf : P.leafLight, sx * 1.05 + rnd(-0.1, 0.1), 0.9 + i * 0.35, rnd(-0.1, 0.1), { low: true });
      if (i === 1) makeRoseBloom(arch, sx * 1.05, 1.2, 0.12, 0.7);
    }
  }
  const archTop = new THREE.Mesh(new THREE.TorusGeometry(1.05, 0.05, 6, 28, Math.PI), toon(P.wood));
  archTop.position.y = 2.2;
  arch.add(archTop);
  for (let i = 0; i < 9; i++) {
    const a = Math.PI + (i / 8) * Math.PI;
    sphere(arch, 0.13, i % 3 ? P.leaf : P.leafLight, Math.cos(a) * 1.05, 2.2 + Math.sin(a) * 1.05, rnd(-0.08, 0.08), { low: true });
    if (i % 3 === 0) makeRoseBloom(arch, Math.cos(a) * 1.05, 2.2 + Math.sin(a) * 1.05 + 0.05, 0.15, 0.65);
  }

  for (let i = 0; i < 12; i++) {
    const a = rnd(0, 6.28);
    const rr = rnd(2.6, 3.6);
    const x = Math.cos(a) * rr;
    const z = Math.sin(a) * rr;
    if (Math.hypot(x - 2.55, z + 0.2) < 1.4) continue;
    sphere(g, rnd(0.05, 0.09), [P.rose, P.butter, P.white, P.lavender][i % 4], x, 0.32, z, { low: true });
  }

  const fireflies = [];
  for (let i = 0; i < 9; i++) {
    const sp = glowSprite(g, 0xffe3a8, rnd(0.18, 0.32), rnd(-2.8, 2.8), rnd(0.8, 2.2), rnd(-2.8, 2.8), 0.55);
    fireflies.push({ sprite: sp, phase: rnd(0, 6), baseX: sp.position.x, baseZ: sp.position.z, baseY: sp.position.y });
  }
  onFrame((t) => {
    for (const f of fireflies) {
      f.sprite.position.x = f.baseX + Math.sin(t * 0.5 + f.phase) * 0.4;
      f.sprite.position.z = f.baseZ + Math.cos(t * 0.4 + f.phase) * 0.4;
      f.sprite.position.y = f.baseY + Math.sin(t * 0.7 + f.phase * 2) * 0.2;
      f.sprite.material.opacity = 0.22 + 0.3 * (0.5 + 0.5 * Math.sin(t * 2 + f.phase));
    }
  });
  return g;
}

function ribbonGeometry(points, width, lift = 0.03, segs = 80, uvV = 8) {
  const curve = new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.25);
  const positions = [];
  const uvs = [];
  const indices = [];
  for (let i = 0; i <= segs; i++) {
    const t = i / segs;
    const p = curve.getPoint(t);
    const tan = curve.getTangent(t);
    const sideX = -tan.z;
    const sideZ = tan.x;
    const sl = Math.hypot(sideX, sideZ) || 1;
    for (const s of [-1, 1]) {
      const x = p.x + (sideX / sl) * (width / 2) * s;
      const z = p.z + (sideZ / sl) * (width / 2) * s;
      const y = terrainHeight(x, z) + lift;
      positions.push(x, y, z);
      uvs.push(s * 0.5 + 0.5, t * uvV);
    }
    if (i < segs) {
      const n = i * 2;
      indices.push(n, n + 1, n + 2, n + 1, n + 3, n + 2);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

function buildPaths(island) {
  const mainPts = [
    new THREE.Vector3(-2.0, 0, 8.22),
    new THREE.Vector3(-0.3, 0, 8.9),
    new THREE.Vector3(2.6, 0, 9.2),
    new THREE.Vector3(4.2, 0, 9.4),
  ];
  const main = new THREE.Mesh(
    ribbonGeometry(mainPts, 1.35, 0.035, 70, 1),
    new THREE.MeshToonMaterial({ color: 0xd8c4a4, gradientMap: gradientMap() })
  );
  main.receiveShadow = true;
  island.add(main);
  const branchPts = [
    new THREE.Vector3(-2.0, 0, 8.22),
    new THREE.Vector3(-3.8, 0, 8.5),
    new THREE.Vector3(-5.4, 0, 9.0),
    new THREE.Vector3(-6.4, 0, 8.7),
  ];
  const branch = new THREE.Mesh(
    ribbonGeometry(branchPts, 0.72, 0.035, 40, 1),
    new THREE.MeshToonMaterial({ color: 0xd4bf9f, gradientMap: gradientMap() })
  );
  branch.receiveShadow = true;
  island.add(branch);

  const curve = new THREE.CatmullRomCurve3(mainPts);
  const stoneGeo = new THREE.CylinderGeometry(1, 1, 1, 7);
  for (let i = 0; i < 30; i++) {
    const t = (i + 0.5) / 30;
    const p = curve.getPoint(t);
    const x = p.x + rnd(-0.45, 0.45);
    const z = p.z + rnd(-0.35, 0.35);
    const y = terrainHeight(x, z) + 0.045;
    const s = rnd(0.28, 0.5);
    const stone = new THREE.Mesh(stoneGeo, toon(i % 3 === 0 ? P.stoneLight : P.stoneDim));
    stone.scale.set(s, 0.045, s * rnd(0.7, 1.1));
    stone.position.set(x, y, z);
    stone.rotation.y = rnd(0, 6);
    stone.receiveShadow = true;
    island.add(stone);
  }
  const bcurve = new THREE.CatmullRomCurve3(branchPts);
  for (let i = 0; i < 12; i++) {
    const p = bcurve.getPoint((i + 0.5) / 12);
    const x = p.x + rnd(-0.25, 0.25);
    const z = p.z + rnd(-0.25, 0.25);
    const stone = new THREE.Mesh(stoneGeo, toon(P.stoneDim));
    stone.scale.set(rnd(0.24, 0.36), 0.04, rnd(0.22, 0.34));
    stone.position.set(x, terrainHeight(x, z) + 0.045, z);
    stone.rotation.y = rnd(0, 6);
    stone.receiveShadow = true;
    island.add(stone);
  }
}

function makeFlowerHeadGeometry() {
  const positions = [];
  const indices = [];
  const tips = 5;
  for (let p = 0; p < tips; p++) {
    const a = (p / tips) * Math.PI * 2;
    const dx = Math.cos(a);
    const dz = Math.sin(a);
    const px = -Math.sin(a);
    const pz = Math.cos(a);
    const base = positions.length / 3;
    positions.push(
      0, 0.015, 0,
      dx * 0.055 + px * 0.05, 0.035, dz * 0.055 + pz * 0.05,
      dx * 0.14, 0.05, dz * 0.14,
      dx * 0.055 - px * 0.05, 0.035, dz * 0.055 - pz * 0.05,
    );
    indices.push(base, base + 1, base + 2, base, base + 2, base + 3);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

function buildFlora(island) {
  const flowerColors = [0xf2b6b7, 0xf7e0a8, 0xcbb9e2, 0xfff6e9, 0xe8949c, 0xf0c9b3];
  const dummy = new THREE.Object3D();
  const clusters = [
    { x: 6.8, z: 9.5, r: 3.8, n: 120, yOff: 0.05 },
    { x: 10.5, z: 2.0, r: 4.2, n: 80, yOff: 0.05 },
    { x: -7.0, z: 10.8, r: 2.8, n: 45, yOff: 0.05 },
    { x: -11.0, z: -1.0, r: 4.0, n: 45, yOff: 0.05 },
    { x: 2.0, z: 11.8, r: 3.2, n: 55, yOff: 0.05 },
    { x: -3.5, z: -11.5, r: 3.0, n: 30, yOff: 0.05 },
  ];
  const points = [];
  for (const c of clusters) {
    let tries = 0;
    while (points.length < (c.base ?? 0) + c.n && tries < c.n * 8) {
      tries++;
      const a = rnd(0, Math.PI * 2);
      const rr = Math.sqrt(rnd()) * c.r;
      const x = c.x + Math.cos(a) * rr;
      const z = c.z + Math.sin(a) * rr;
      const rad = Math.hypot(x, z);
      const plat = Math.hypot(x + 2, z + 5.5);
      if (rad > 16.8 || plat < 9.8) continue;
      if (Math.hypot(x + 9.2, z - 7.9) < 3.6) continue;
      if (Math.hypot(x - 6.8, z - 9.5) < 0.7) continue;
      points.push({ x, z, color: flowerColors[Math.floor(rnd(0, flowerColors.length))] });
    }
  }
  const stemGeo = new THREE.CylinderGeometry(0.011, 0.015, 0.32, 4);
  const headGeo = makeFlowerHeadGeometry();
  const stems = new THREE.InstancedMesh(stemGeo, toon(P.leafDeep), points.length);
  stems.castShadow = false;
  stems.receiveShadow = true;
  const heads = new THREE.InstancedMesh(headGeo, new THREE.MeshToonMaterial({ color: 0xffffff, gradientMap: gradientMap(), side: THREE.DoubleSide }), points.length);
  heads.castShadow = false;
  heads.receiveShadow = true;
  const centers = new THREE.InstancedMesh(new THREE.SphereGeometry(0.026, 5, 3), toon(0xf0c25a), points.length);
  centers.castShadow = false;
  centers.receiveShadow = false;
  const color = new THREE.Color();
  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    const y = terrainHeight(p.x, p.z);
    const h = rnd(0.8, 1.25);
    dummy.position.set(p.x, y + 0.16 * h, p.z);
    dummy.rotation.set(rnd(-0.12, 0.12), rnd(0, 6), rnd(-0.12, 0.12));
    dummy.scale.set(1, h, 1);
    dummy.updateMatrix();
    stems.setMatrixAt(i, dummy.matrix);
    dummy.position.set(p.x, y + 0.32 * h, p.z);
    dummy.scale.setScalar(rnd(0.75, 1.25));
    dummy.rotation.set(0, rnd(0, 6), 0);
    dummy.updateMatrix();
    heads.setMatrixAt(i, dummy.matrix);
    heads.setColorAt(i, color.setHex(p.color));
    dummy.position.y += 0.045;
    dummy.scale.setScalar(0.75);
    dummy.updateMatrix();
    centers.setMatrixAt(i, dummy.matrix);
  }
  island.add(stems);
  island.add(heads);
  island.add(centers);
  if (heads.instanceColor) heads.instanceColor.needsUpdate = true;

  const tuftGeo = new THREE.ConeGeometry(0.055, 0.34, 4);
  const tuftMat = new THREE.MeshToonMaterial({ color: 0xffffff, gradientMap: gradientMap() });
  const tuftCount = 650;
  const tufts = new THREE.InstancedMesh(tuftGeo, tuftMat, tuftCount);
  tufts.castShadow = false;
  tufts.receiveShadow = false;
  let placed = 0;
  let guard = 0;
  while (placed < tuftCount && guard < 5000) {
    guard++;
    const a = rnd(0, Math.PI * 2);
    const rr = Math.sqrt(rnd()) * 17.4;
    const x = Math.cos(a) * rr;
    const z = Math.sin(a) * rr;
    if (Math.hypot(x + 2, z + 5.5) < 9.0) continue;
    if (Math.hypot(x + 9.2, z - 7.9) < 3.4) continue;
    const y = terrainHeight(x, z);
    dummy.position.set(x, y + 0.14, z);
    dummy.rotation.set(rnd(-0.1, 0.1), rnd(0, 6), rnd(-0.1, 0.1));
    dummy.scale.set(rnd(0.7, 1.4), rnd(0.6, 1.3), rnd(0.7, 1.4));
    dummy.updateMatrix();
    tufts.setMatrixAt(placed, dummy.matrix);
    tufts.setColorAt(placed, color.setHex([0x9bc791, 0x87b986, 0xb3d49b, 0x7fae86][placed % 4]));
    placed++;
  }
  tufts.instanceMatrix.needsUpdate = true;
  if (tufts.instanceColor) tufts.instanceColor.needsUpdate = true;
  island.add(tufts);
}

function buildMushrooms(island) {
  const positions = [
    [-11.5, 1.4, 1.0], [-10.4, 0.5, 0.7], [-12.9, 2.2, 0.85], [-9.2, -3.9, 0.65],
    [11.2, -8.0, 0.7], [12.0, -7.4, 0.55], [4.2, 12.4, 0.6],
  ];
  for (const [x, z, s] of positions) {
    const y = terrainHeight(x, z);
    cyl(island, 0.035 * s, 0.05 * s, 0.18 * s, 0xf3e7d3, x, y + 0.09 * s, z, { segments: 6 });
    const cap = sphere(island, 0.16 * s, 0xc87072, x, y + 0.2 * s, z, { scale: [1, 0.5, 1], low: true });
    for (let i = 0; i < 3; i++) {
      const a = rnd(0, 6.28);
      sphere(island, 0.022 * s, 0xfff3e1, x + Math.cos(a) * 0.09 * s, y + 0.25 * s, z + Math.sin(a) * 0.09 * s, { low: true });
    }
  }
}

function buildPond(island) {
  const cx = LAYOUT.pond.x;
  const cz = LAYOUT.pond.z;
  const cy = terrainHeight(cx, cz);
  const g = new THREE.Group();
  g.position.set(cx, cy, cz);
  island.add(g);
  const basin = new THREE.Mesh(new THREE.CircleGeometry(1, 40), toon(0x8b7c68));
  basin.rotation.x = -Math.PI / 2;
  basin.scale.set(3.25, 2.5, 1);
  basin.position.y = 0.015;
  basin.receiveShadow = true;
  g.add(basin);
  const water = new THREE.Mesh(
    new THREE.CircleGeometry(1, 48),
    new THREE.MeshPhysicalMaterial({
      color: 0x8ccbda, transparent: true, opacity: 0.82, roughness: 0.08,
      metalness: 0.02, clearcoat: 1, clearcoatRoughness: 0.1,
    })
  );
  water.rotation.x = -Math.PI / 2;
  water.scale.set(3.05, 2.35, 1);
  water.position.y = 0.11;
  water.receiveShadow = true;
  g.add(water);
  for (let i = 0; i < 30; i++) {
    const a = rnd(0, Math.PI * 2);
    const rx = 3.08 + rnd(-0.12, 0.3);
    const rz = 2.38 + rnd(-0.1, 0.28);
    const x = Math.cos(a) * rx;
    const z = Math.sin(a) * rz;
    const s = rnd(0.09, 0.24);
    sphere(g, s, rnd() > 0.4 ? P.stoneDim : P.rock[1], x, 0.05, z, { low: true, scale: [1.2, 0.55, 1] });
  }
  const ripples = [];
  for (let i = 0; i < 3; i++) {
    const mat = new THREE.MeshBasicMaterial({ color: 0xdff8fa, transparent: true, opacity: 0.2, depthWrite: false, side: THREE.DoubleSide });
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.96, 1.0, 40), mat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.125;
    ring.scale.set(3.05, 2.35, 1);
    g.add(ring);
    ripples.push({ mesh: ring, mat, phase: i / 3 });
  }
  onFrame((t) => {
    for (const r of ripples) {
      const ph = (t * 0.1 + r.phase) % 1;
      r.mesh.scale.set(3.05 * (0.35 + ph * 0.65), 2.35 * (0.35 + ph * 0.65), 1);
      r.mat.opacity = (1 - ph) * 0.18;
    }
  });
  for (let i = 0; i < 7; i++) {
    const a = rnd(0, Math.PI * 2);
    const rr = rnd(0.4, 0.82);
    const pad = new THREE.Mesh(
      new THREE.CircleGeometry(rnd(0.18, 0.32), 12, 0, Math.PI * 1.85),
      toon(i % 2 ? P.leaf : P.leafLight)
    );
    pad.rotation.x = -Math.PI / 2;
    pad.rotation.z = rnd(0, 6);
    pad.position.set(Math.cos(a) * rr * 2.4, 0.125, Math.sin(a) * rr * 1.8);
    g.add(pad);
    if (i < 3) {
      sphere(g, 0.08, P.rose, pad.position.x + rnd(-0.08, 0.08), 0.2, pad.position.z + rnd(-0.08, 0.08), { low: true, scale: [1, 0.7, 1] });
    }
  }
  for (const a of [0.3, 1.0, 1.8, 4.0, 4.8, 5.6]) {
    const rr = 3.2;
    const x = Math.cos(a) * rr;
    const z = Math.sin(a) * rr;
    const h = rnd(0.65, 1.15);
    cyl(g, 0.016, 0.02, h, P.leafDeep, x, 0.1 + h / 2, z, { segments: 4, rot: [rnd(-0.1, 0.1), 0, rnd(-0.1, 0.1)] });
    cyl(g, 0.035, 0.035, 0.18, 0x8a6c4f, x, 0.12 + h, z, { segments: 5 });
    for (let i = 0; i < 2; i++) {
      const leaf = box(g, 0.02, 0.4, 0.06, P.leaf, x + 0.04, 0.25 + i * 0.18, z, { rot: [0, rnd(0, 3), 0.4], cast: false });
    }
  }
  for (let i = 0; i < 8; i++) {
    const a = rnd(0, 6.28);
    sphere(g, rnd(0.06, 0.1), i % 2 ? P.butter : P.white, Math.cos(a) * rnd(3.3, 3.7), 0.3, Math.sin(a) * rnd(2.6, 3.0), { low: true });
  }
  return g;
}

function buildStreamAndFall(island) {
  const pts = [
    new THREE.Vector3(-11.6, 0, 8.7),
    new THREE.Vector3(-12.6, 0, 9.0),
    new THREE.Vector3(-13.7, 0, 9.2),
    new THREE.Vector3(-14.7, 0, 9.35),
    new THREE.Vector3(-15.4, 0, 9.4),
  ];
  const geo = ribbonGeometry(pts, 1.05, 0.055, 50, 6);
  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    uniforms: { uTime: { value: 0 } },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec2 vUv;
      uniform float uTime;
      void main() {
        float n = sin(vUv.y * 9.0 - uTime * 1.8 + sin(vUv.x * 12.0) * 1.2) * 0.5 + 0.5;
        float sparkle = smoothstep(0.8, 0.98, sin(vUv.y * 32.0 - uTime * 4.0 + vUv.x * 20.0) * 0.5 + 0.5);
        float edge = smoothstep(0.0, 0.2, vUv.x) * smoothstep(1.0, 0.8, vUv.x);
        vec3 col = mix(vec3(0.44, 0.71, 0.77), vec3(0.8, 0.93, 0.94), n * 0.7 + sparkle * 0.4);
        gl_FragColor = vec4(col, (0.6 + n * 0.25) * edge);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
  });
  const stream = new THREE.Mesh(geo, mat);
  island.add(stream);
  onFrame((t) => { mat.uniforms.uTime.value = t; });

  for (let i = 0; i < 22; i++) {
    const t = (i + 0.5) / 22;
    const p = new THREE.CatmullRomCurve3(pts).getPoint(t);
    const side = i % 2 ? 1 : -1;
    const x = p.x + side * rnd(0.6, 0.9);
    const z = p.z + rnd(-0.2, 0.2);
    sphere(island, rnd(0.06, 0.16), i % 3 ? P.stoneDim : P.stoneLight, x, terrainHeight(x, z) + 0.05, z, {
      low: true, scale: [1.3, 0.5, 1],
    });
  }

  const source = new THREE.Vector3(-15.55, 0.5, 9.42);
  const out = new THREE.Vector3(source.x, 0, source.z).normalize();
  const angle = Math.atan2(out.x, out.z);
  const lip = new THREE.Group();
  lip.position.copy(source);
  lip.rotation.y = angle;
  island.add(lip);
  for (let i = 0; i < 4; i++) {
    const x = rnd(-1.2, 1.2);
    sphere(lip, rnd(0.18, 0.36), i % 2 ? P.rock[2] : P.rock[0], x, rnd(-0.1, 0.1), rnd(-0.35, 0.15), {
      low: true, scale: [1.4, 0.7, 1],
    });
  }
  const fallGeo = new THREE.PlaneGeometry(1.9, 12.0, 10, 30);
  fallGeo.translate(0, -6.0, 0);
  const fpos = fallGeo.attributes.position;
  for (let i = 0; i < fpos.count; i++) {
    const y = fpos.getY(i);
    const v = Math.min(1, -y / 12);
    fpos.setX(i, fpos.getX(i) * (1 + v * 0.35) + Math.sin(v * 8) * 0.1);
    fpos.setZ(i, Math.sin(v * Math.PI) * 0.45 + Math.sin(v * 5 + 0.4) * 0.08);
  }
  fallGeo.computeVertexNormals();
  const fallMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    uniforms: { uTime: { value: 0 } },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec2 vUv;
      uniform float uTime;
      float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float noise(vec2 p) {
        vec2 i = floor(p); vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i), hash(i + vec2(1,0)), f.x), mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x), f.y);
      }
      void main() {
        vec2 p = vUv;
        float flow = p.y * 8.0 + uTime * 1.4;
        float n = noise(vec2(p.x * 7.0, flow));
        float n2 = noise(vec2(p.x * 24.0, flow * 2.3));
        float streak = smoothstep(0.35, 0.8, n);
        float foam = smoothstep(0.62, 1.0, n2) * 0.5;
        float edge = smoothstep(0.0, 0.12, p.x) * smoothstep(1.0, 0.88, p.x);
        float fade = smoothstep(0.0, 0.05, p.y) * (1.0 - smoothstep(0.86, 1.0, p.y) * 0.5);
        vec3 col = mix(vec3(0.65, 0.82, 0.87), vec3(1.0, 0.99, 0.96), streak * 0.7 + foam * 0.4);
        gl_FragColor = vec4(col, (0.4 + streak * 0.35 + foam * 0.2) * edge * fade);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
  });
  const fall = new THREE.Mesh(fallGeo, fallMat);
  lip.add(fall);
  onFrame((t) => { fallMat.uniforms.uTime.value = t; });
  const lipGlow = glowSprite(lip, 0xe6fbff, 3.2, 0, -0.1, 0.35, 0.35);
  const mistPositions = [
    [-0.6, -7.2, 0.6, 5.0], [0.7, -9.0, 0.9, 6.5], [0, -10.5, 0.3, 7.5], [-1.2, -5.2, 0.7, 4.2],
  ];
  const mists = [];
  for (const [mx, my, mz, ms] of mistPositions) {
    const sp = glowSprite(lip, 0xe7f8fb, ms, mx, my, mz, 0.25);
    mists.push({ sprite: sp, base: sp.position.clone(), phase: rnd(0, 6) });
  }
  onFrame((t) => {
    lipGlow.material.opacity = 0.25 + Math.sin(t * 2.2) * 0.05;
    for (const m of mists) {
      m.sprite.position.y = m.base.y + Math.sin(t * 0.5 + m.phase) * 0.4;
      m.sprite.material.opacity = 0.14 + 0.1 * (0.5 + 0.5 * Math.sin(t * 0.7 + m.phase));
    }
  });

  for (let i = 0; i < 5; i++) {
    const s = rnd(0.25, 0.6);
    sphere(island, s, i % 2 ? P.rock[1] : P.stoneDim, -16.2 + rnd(-0.6, 0.6), rnd(-2.1, -0.3), 10.1 + rnd(-0.5, 0.5), {
      low: true, scale: [1.4, 0.8, 1],
    });
  }
  return { source, fall };
}

function buildMeadowDetails(island) {
  const fence = new THREE.Group();
  const base = terrainHeight(10.8, 4.4);
  fence.position.set(10.8, base, 4.4);
  fence.rotation.y = -0.25;
  island.add(fence);
  for (let i = 0; i < 5; i++) {
    const x = -2.0 + i * 1.0;
    box(fence, 0.1, 0.95, 0.1, P.wood, x, 0.47, 0);
    box(fence, 0.1, 0.95, 0.1, P.wood, x, 0.47, 0.8);
    if (i < 4) {
      box(fence, 1.0, 0.08, 0.06, P.woodLight, x + 0.5, 0.62, 0);
      box(fence, 1.0, 0.07, 0.05, P.woodLight, x + 0.5, 0.85, 0);
      box(fence, 1.0, 0.08, 0.06, P.woodLight, x + 0.5, 0.62, 0.8);
    }
  }
  const hay = new THREE.Group();
  const hx = 12.1, hz = 4.1;
  hay.position.set(hx, terrainHeight(hx, hz), hz);
  island.add(hay);
  cyl(hay, 0.6, 0.7, 0.75, P.butter, 0, 0.37, 0, { segments: 10 });
  cone(hay, 0.7, 0.4, 0xdcc184, 0, 0.9, 0, { segments: 10 });
  for (let i = 0; i < 12; i++) {
    box(hay, 0.25, 0.02, 0.03, 0xd4b876, rnd(-0.6, 0.6), rnd(0.2, 0.7), rnd(-0.6, 0.6), { rot: [rnd(0, 2), rnd(0, 3), rnd(0, 2)], cast: false });
  }
  const log = new THREE.Group();
  const lx = -12.0, lz = -5.6;
  log.position.set(lx, terrainHeight(lx, lz), lz);
  log.rotation.y = 0.5;
  island.add(log);
  const trunk = cyl(log, 0.24, 0.28, 2.4, P.wood, 0, 0.25, 0, { segments: 8, rot: [0, 0, Math.PI / 2] });
  const end1 = cyl(log, 0.275, 0.275, 0.04, 0xc9a887, 1.21, 0.25, 0, { segments: 8, rot: [0, 0, Math.PI / 2] });
  const end2 = cyl(log, 0.235, 0.235, 0.04, 0xc9a887, -1.21, 0.25, 0, { segments: 8, rot: [0, 0, Math.PI / 2] });
  for (let i = 0; i < 3; i++) {
    sphere(log, 0.16, i % 2 ? P.leafDeep : P.leaf, -0.7 + i * 0.7, 0.46, rnd(-0.1, 0.1), { low: true, scale: [1.6, 0.25, 0.8] });
  }
}

function buildFireflies(island) {
  const N = 40;
  const positions = new Float32Array(N * 3);
  const seeds = [];
  for (let i = 0; i < N; i++) {
    const a = rnd(0, Math.PI * 2);
    const r = rnd(3, 9);
    const cx = -10;
    const cz = 5;
    const x = cx + Math.cos(a) * r;
    const z = cz + Math.sin(a) * r;
    positions[i * 3] = x;
    positions[i * 3 + 1] = terrainHeight(x, z) + rnd(0.4, 2.0);
    positions[i * 3 + 2] = z;
    seeds.push({ phase: rnd(0, 6), rx: rnd(0.2, 1.2), rz: rnd(0.2, 1.2), baseY: positions[i * 3 + 1] });
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({
    color: 0xffe8ad, size: 0.09, transparent: true, opacity: 0.75,
    depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false,
  });
  const pts = new THREE.Points(geo, mat);
  island.add(pts);
  onFrame((t) => {
    const arr = geo.attributes.position.array;
    for (let i = 0; i < N; i++) {
      const s = seeds[i];
      arr[i * 3] += Math.sin(t * 0.3 + s.phase) * 0.002 * s.rx;
      arr[i * 3 + 1] = s.baseY + Math.sin(t * 0.5 + s.phase) * 0.3;
      arr[i * 3 + 2] += Math.cos(t * 0.25 + s.phase) * 0.002 * s.rz;
    }
    geo.attributes.position.needsUpdate = true;
    mat.opacity = 0.45 + 0.3 * (0.5 + 0.5 * Math.sin(t * 1.5));
  });
}

export function buildNature(island) {
  addTrees(island);
  scatterRocks(island);
  buildPaths(island);
  buildGarden(island);
  buildFlora(island);
  buildMushrooms(island);
  buildPond(island);
  buildStreamAndFall(island);
  buildMeadowDetails(island);
  buildFireflies(island);
}
