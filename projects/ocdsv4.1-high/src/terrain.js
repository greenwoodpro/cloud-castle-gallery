import * as THREE from 'three';
import {
  M, Merge, R, RI, pick, TAU, reg, tick, holder, gBox, gRBox, gCyl, gCone, gSph, gTor, gLathe, gPlane,
  shadowed, label, groundY, clamp, lerp, smoothstep, jitterGeo, ribbon, texSoft, texRug, texHerald, PAL
} from './core.js';
import {
  propBarrel, propCrate, propSack, propHay, propTable, propStool, propBench, propFence, propWell,
  makeLampPost, makeFlame, makeSmoke, propCart, propScarecrow, propSignPost, propLantern, propPot,
  propLadder, propTorch, WaveCloth, propFlag
} from './props.js';
import { makeFigure, makeBeast, Actor, BeastActor, makeRose, addFigure } from './characters.js';

export const PLAT = 4.4;
export const MESA_R = 14;
export const SKIRT_R = 20.5;

const LAKE = { x: 21, z: 17.5, r: 4.6, y: -0.55 };

export const RING = [
  [0, 25.4], [7, 26.6], [12.5, 25.2], [17, 24], [20.5, 21.5], [22.6, 18.4], [25, 13], [26.5, 6], [27, -1],
  [25.5, -8], [22, -14], [16, -19.5], [9, -23.5], [2, -25.5], [-5, -25], [-11, -24], [-16, -20.5],
  [-19.5, -14], [-22, -7], [-24, 0], [-25.5, 7], [-25.5, 13], [-22.5, 19], [-16.5, 23], [-9, 25.2], [-3, 25.8], [0, 25.4]
];

export function pathCurve(pts, lift = 0.09) {
  return new THREE.CatmullRomCurve3(pts.map((p) => new THREE.Vector3(p[0], groundY(p[0], p[1]) + lift, p[1])));
}
function distToRing(x, z) {
  let d = 1e9;
  for (let i = 0; i < RING.length; i++) {
    const a = RING[i], b = RING[(i + 1) % RING.length];
    const vx = b[0] - a[0], vz = b[1] - a[1];
    const wx = x - a[0], wz = z - a[1];
    const t = clamp((wx * vx + wz * vz) / (vx * vx + vz * vz), 0, 1);
    d = Math.min(d, Math.hypot(x - (a[0] + vx * t), z - (a[1] + vz * t)));
  }
  return d;
}
function freeSpot(x, z, opt = {}) {
  const r = Math.hypot(x, z);
  if (r < (opt.minR ?? SKIRT_R + 0.6) || r > (opt.maxR ?? 32.4)) return false;
  if (Math.hypot(x - LAKE.x, z - LAKE.z) < LAKE.r * (opt.lake ?? 1.25)) return false;
  if (distToRing(x, z) < (opt.path ?? 1.6)) return false;
  return true;
}

function treeRound(parent, x, z, s = 1, key = 'foliage1', opts = {}) {
  const g = new THREE.Group();
  const y = groundY(x, z);
  g.position.set(x, y, z);
  g.rotation.y = R(0, TAU);
  g.scale.setScalar(s);
  parent.add(g);
  const Mg = new Merge();
  Mg.cyl('woodDark', 0.16, 0.26, 2.2, [0, 1.1, 0], [0, 0, 0], 8);
  Mg.cyl('woodDark', 0.08, 0.11, 1.0, [0.3, 1.9, 0.1], [0, 0, -0.5], 6);
  Mg.cyl('woodDark', 0.08, 0.11, 1.0, [-0.28, 1.85, -0.1], [0.3, 0, 0.5], 6);
  const crown = [
    [0, 2.9, 0, 1.25], [0.75, 2.6, 0.2, 0.9], [-0.7, 2.7, -0.25, 0.95], [0.15, 3.5, -0.5, 0.85],
    [-0.2, 3.4, 0.55, 0.8], [0.6, 3.3, -0.6, 0.7], [-0.65, 3.1, 0.5, 0.72]
  ];
  crown.forEach(([cx, cy, cz, cr]) => {
    Mg.sph(key, cr, [cx, cy, cz], 10);
  });
  const m = Mg.build(M);
  m.castShadow = true;
  m.receiveShadow = true;
  g.add(m);
  if (opts.apples) {
    const am = new Merge();
    for (let i = 0; i < 10; i++) am.sph(pick(['clothRose', 'gold', 'book1']), 0.12, [R(-1.2, 1.2), R(2.4, 3.6), R(-1.2, 1.2)], 8);
    g.add(am.build(M));
  }
  const ph = R(0, TAU);
  tick((dt, t) => {
    g.rotation.z = Math.sin(t * 0.5 + ph) * 0.014;
  });
  return g;
}
function treePine(parent, x, z, s = 1) {
  const g = new THREE.Group();
  g.position.set(x, groundY(x, z), z);
  g.rotation.y = R(0, TAU);
  g.scale.setScalar(s);
  parent.add(g);
  const Mg = new Merge();
  Mg.cyl('woodDark', 0.14, 0.2, 1.4, [0, 0.7, 0], [0, 0, 0], 8);
  for (let i = 0; i < 5; i++) Mg.cone('pine', 1.5 - i * 0.26, 1.5 - i * 0.14, [0, 1.5 + i * 0.62, 0], [0, R(0, 1), 0], 9);
  g.add(Mg.build(M));
  const ph = R(0, TAU);
  tick((dt, t) => {
    g.rotation.z = Math.sin(t * 0.4 + ph) * 0.01;
  });
  return g;
}
function treePoplar(parent, x, z, s = 1) {
  const g = new THREE.Group();
  g.position.set(x, groundY(x, z), z);
  g.rotation.y = R(0, TAU);
  g.scale.setScalar(s);
  parent.add(g);
  const Mg = new Merge();
  Mg.cyl('woodDark', 0.12, 0.2, 2.4, [0, 1.2, 0], [0, 0, 0], 8);
  Mg.add('foliage2', new THREE.SphereGeometry(0.9, 12, 10), [0, 3.4, 0], [0, 0, 0], [0.85, 2.1, 0.85]);
  g.add(Mg.build(M));
  return g;
}
function bush(parent, x, z, s = 1, key = 'hedge') {
  const y = groundY(x, z);
  const Mg = new Merge();
  for (let i = 0; i < 4; i++) Mg.sph(key, R(0.32, 0.5) * s, [x + R(-0.5, 0.5) * s, y + R(0.2, 0.5) * s, z + R(-0.5, 0.5) * s], 9);
  const m = Mg.build(M);
  m.castShadow = true;
  m.receiveShadow = true;
  parent.add(m);
  return m;
}
function hedgerow(parent, x0, z0, x1, z1, h = 1.0, yFn = groundY) {
  const Mg = new Merge();
  const len = Math.hypot(x1 - x0, z1 - z0);
  const n = Math.max(2, Math.round(len / 0.9));
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const px = lerp(x0, x1, t), pz = lerp(z0, z1, t);
    const y = yFn(px, pz);
    Mg.rbox('hedge', len / n + 0.3, h, 0.85, [px, y + h / 2, pz], [0, Math.atan2(x1 - x0, z1 - z0), 0], 0.18);
  }
  const m = Mg.build(M);
  m.castShadow = true;
  m.receiveShadow = true;
  parent.add(m);
  return m;
}
function stones(parent, list, s = 1) {
  const Mg = new Merge();
  list.forEach(([x, z, sc = 1, j = 1], i) => {
    Mg.add('rockPlain', jitterGeo(new THREE.IcosahedronGeometry(0.5 * sc * s, 1), 0.22, i), [x, groundY(x, z) + 0.1 * sc, z], [R(0, 3), R(0, 3), R(0, 3)], [1, R(0.6, 0.95), 1]);
  });
  const m = Mg.build(M);
  m.castShadow = m.receiveShadow = true;
  parent.add(m);
  return m;
}

function blobDisc(y, rf, rings = 6, A = 44) {
  const pos = [], uv = [], idx = [];
  for (let ri = 0; ri <= rings; ri++) {
    const t = ri / rings;
    for (let ai = 0; ai <= A; ai++) {
      const a = (ai / A) * TAU;
      const r = rf(a) * t;
      pos.push(Math.cos(a) * r, y, Math.sin(a) * r);
      uv.push(Math.cos(a) * r * 0.12 + 0.5, Math.sin(a) * r * 0.12 + 0.5);
    }
  }
  for (let ri = 0; ri < rings; ri++)
    for (let ai = 0; ai < A; ai++) {
      const a0 = ri * (A + 1) + ai, a1 = a0 + 1, b0 = (ri + 1) * (A + 1) + ai, b1 = b0 + 1;
      if (ri === 0) idx.push(a0, a1, b0);
      else idx.push(a0, a1, b0, a1, b1, b0);
    }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

function lake(parent) {
  const { x: lx, z: lz, r: lr, y: ly } = LAKE;
  const rf = (a) => lr * (1 + Math.sin(a * 2.3 + 0.5) * 0.13 + Math.sin(a * 5.1 + 1.2) * 0.08);
  const water = new THREE.Mesh(blobDisc(ly, rf), M.water);
  water.position.set(lx, 0, lz);
  water.receiveShadow = true;
  parent.add(water);
  const sand = new THREE.Mesh(blobDisc(ly + 0.05, (a) => rf(a) * 1.3), M.sand);
  sand.position.set(lx, 0, lz);
  sand.receiveShadow = true;
  parent.add(sand);
  const shallow = new THREE.Mesh(blobDisc(ly + 0.02, (a) => rf(a) * 1.06), new THREE.MeshStandardMaterial({ color: '#bfe0e8', roughness: 0.3, transparent: true, opacity: 0.6 }));
  shallow.position.set(lx, 0, lz);
  parent.add(shallow);
  const reedM = new Merge();
  for (let i = 0; i < 120; i++) {
    const a = R(0, TAU);
    const rr = rf(a) * R(1.02, 1.22);
    const px = lx + Math.cos(a) * rr, pz = lz + Math.sin(a) * rr;
    const h = R(0.7, 1.5);
    reedM.cyl('foliage2', 0.03, 0.045, h, [px, ly + h / 2, pz], [R(-0.12, 0.12), 0, R(-0.12, 0.12)], 5);
    if (Math.random() < 0.35) reedM.cyl('woodDark', 0.05, 0.05, 0.26, [px, ly + h + 0.1, pz], [0, 0, 0], 6);
  }
  for (let i = 0; i < 22; i++) {
    const a = R(0, TAU), rr = rf(a) * R(0.3, 0.95);
    reedM.cyl('pine', 0.02, 0.03, 0.5, [lx + Math.cos(a) * rr, ly + 0.6, lz + Math.sin(a) * rr], [R(-0.3, 0.3), 0, R(-0.3, 0.3)], 5);
  }
  const waterlily = new Merge();
  for (let i = 0; i < 16; i++) {
    const a = R(0, TAU), rr = rf(a) * R(0.25, 0.9);
    waterlily.cyl('foliage1', 0.3, 0.3, 0.03, [lx + Math.cos(a) * rr, ly + 0.03, lz + Math.sin(a) * rr], [0, 0, 0], 10);
    if (Math.random() < 0.3) waterlily.sph('rosePetal', 0.09, [lx + Math.cos(a) * rr + 0.1, ly + 0.1, lz + Math.sin(a) * rr], 8);
  }
  const rm = reedM.build(M);
  rm.castShadow = true;
  parent.add(rm);
  parent.add(waterlily.build(M));
  const dock = new THREE.Group();
  parent.add(dock);
  const Dm = new Merge();
  const da = Math.atan2(lz, lx) + 0.5;
  const dx = lx + Math.cos(da) * (lr * 0.5), dz = lz + Math.sin(da) * (lr * 0.5);
  for (let i = 0; i < 9; i++) {
    Dm.box('wood', 2.2, 0.1, 0.34, [dx + Math.cos(da + Math.PI / 2) * 0 + Math.cos(da) * (i - 4) * 0.42, ly + 0.42, dz + Math.sin(da) * (i - 4) * 0.42], [0, da + Math.PI / 2, 0]);
  }
  [0, 8].forEach((i) => {
    Dm.cyl('woodDark', 0.11, 0.13, 1.4, [dx + Math.cos(da) * (i - 4) * 0.42 + Math.cos(da + Math.PI / 2) * 0.95, ly + 0.2, dz + Math.sin(da) * (i - 4) * 0.42 + Math.sin(da + Math.PI / 2) * 0.95], [0, 0, 0], 7);
    Dm.cyl('woodDark', 0.11, 0.13, 1.4, [dx + Math.cos(da) * (i - 4) * 0.42 - Math.cos(da + Math.PI / 2) * 0.95, ly + 0.2, dz + Math.sin(da) * (i - 4) * 0.42 - Math.sin(da + Math.PI / 2) * 0.95], [0, 0, 0], 7);
  });
  dock.add(Dm.build(M));
  const boat = new THREE.Group();
  boat.position.set(lx + Math.cos(da + 0.9) * lr * 0.95, ly + 0.12, lz + Math.sin(da + 0.9) * lr * 0.95);
  boat.rotation.y = R(0, TAU);
  parent.add(boat);
  const Bm = new Merge();
  Bm.lathe('wood', [[0.005, 0], [1.1, 0.02], [1.25, 0.28], [1.2, 0.4], [1.05, 0.4], [0.9, 0.26], [0.005, 0.24]], [0, 0, 0], [0, 0, 0], 14);
  Bm.box('woodDark', 2.1, 0.07, 0.24, [0, 0.32, 0], [0, 0, 0]);
  Bm.cyl('woodDark', 0.05, 0.05, 1.8, [0.5, 0.5, 0.2], [0, 0, 0.4], 6);
  Bm.add('woodPale', new THREE.BoxGeometry(0.3, 0.06, 0.5), [0.9, 0.62, 0.28], [0.3, 0, 0.4]);
  boat.add(Bm.build(M));
  const ph = R(0, TAU);
  tick((dt, t) => {
    boat.position.y = ly + 0.12 + Math.sin(t * 0.9 + ph) * 0.05;
    boat.rotation.z = Math.sin(t * 0.7 + ph) * 0.03;
    water.material.map.offset.set(t * 0.006, Math.sin(t * 0.1) * 0.02);
  });
  const stepM = new Merge();
  [[-0.9, -3.2], [0.2, -2.4], [1.4, -1.7]].forEach(([ox, oz], i) => {
    stepM.cyl('rockPlain', 0.42, 0.5, 0.34, [lx + ox, ly + 0.1, lz + oz], [0, R(0, 3), 0], 9);
  });
  const sm = stepM.build(M);
  sm.castShadow = true;
  parent.add(sm);

  const ducks = [];
  for (let i = 0; i < 3; i++) {
    const d = new THREE.Group();
    const a = R(0, TAU), rr = lr * R(0.35, 0.8);
    d.position.set(lx + Math.cos(a) * rr, ly + 0.08, lz + Math.sin(a) * rr);
    parent.add(d);
    const Dm2 = new Merge();
    Dm2.add('wool', new THREE.SphereGeometry(0.24, 12, 9), [0, 0.16, 0], [0, 0, 0], [0.8, 0.68, 1.25]);
    Dm2.add('wool', new THREE.SphereGeometry(0.13, 10, 8), [0, 0.4, 0.24], [0, 0, 0], [0.9, 1, 1]);
    Dm2.cone('gold', 0.06, 0.16, [0, 0.38, 0.4], [Math.PI / 2, 0, 0], 6);
    Dm2.sph('ink', 0.02, [-0.07, 0.44, 0.31], 6);
    Dm2.sph('ink', 0.02, [0.07, 0.44, 0.31], 6);
    d.add(Dm2.build(M));
    ducks.push({ d, a, rr, ph: R(0, TAU) });
  }
  tick((dt, t) => {
    ducks.forEach((u, i) => {
      u.a += dt * 0.06 * (i % 2 ? 1 : -1);
      const px = lx + Math.cos(u.a) * u.rr, pz = lz + Math.sin(u.a) * u.rr;
      u.d.position.set(px, ly + 0.06 + Math.sin(t * 1.6 + u.ph) * 0.03, pz);
      u.d.rotation.y = -u.a + Math.PI / 2 + Math.sin(t * 0.6 + u.ph) * 0.3;
    });
  });
  label('镜湖与瀑布', new THREE.Vector3(lx, ly + 3.4, lz), '湖水清浅，芦苇与睡莲环绕，木栈桥与小船停在岸边；湖的外缘直接跌出岛去，成了那道大瀑布。', 'place');
  return { water };
}

function windmill(parent) {
  const x = 29.2, z = -3.4;
  const y = groundY(x, z);
  const g = new THREE.Group();
  g.position.set(x, y, z);
  g.rotation.y = -0.35;
  parent.add(g);
  const Mg = new Merge();
  Mg.lathe('stone', [[0.005, 0], [2.1, 0.02], [2.0, 0.6], [1.75, 2.6], [1.55, 4.6], [1.6, 4.8], [1.4, 4.85]], [0, 0, 0], [0, 0, 0], 16);
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * TAU;
    Mg.box('stoneWarm', 0.55, 0.5, 0.12, [Math.cos(a) * 1.62, 3.5, Math.sin(a) * 1.62], [0, -a + Math.PI / 2, 0]);
  }
  Mg.box('stoneWarm', 1.0, 1.7, 0.14, [0, 0.85, 2.05], [0, 0, 0]);
  Mg.box('woodDark', 0.9, 1.5, 0.1, [0, 0.85, 2.12]);
  g.add(Mg.build(M));
  const roof = new Merge();
  roof.cone('thatch', 2.1, 1.9, [0, 5.5, 0], [0, 0.4, 0], 4);
  roof.cyl('woodDark', 0.06, 0.06, 1.0, [0, 6.6, 0], [0, 0, 0], 6);
  g.add(roof.build(M));
  const blades = new THREE.Group();
  blades.position.set(0, 4.4, 2.3);
  g.add(blades);
  const Bm = new Merge();
  Bm.cyl('woodDark', 0.16, 0.2, 0.4, [0, 0, 0.2], [Math.PI / 2, 0, 0], 8);
  for (let i = 0; i < 4; i++) {
    Bm.frame([0, 0, 0.3], [0, 0, (i / 4) * TAU]);
    Bm.box('woodDark', 0.22, 5.4, 0.14, [0, 2.7, 0]);
    for (let k = 0; k < 7; k++) Bm.box('woodPale', 0.62, 0.34, 0.06, [0.42, 0.7 + k * 0.72, 0.08]);
    Bm.reset();
  }
  blades.add(Bm.build(M));
  tick((dt, t) => {
    blades.rotation.z -= dt * 0.5;
  });
  const ponds = new Merge();
  propBarrel(ponds, 1.9, 0, 1.4, 1.1);
  propCrate(ponds, -1.6, 0, 1.9, 1.0, 0.4);
  propSack(ponds, -2.2, 0, 0.6, 1.3);
  g.add(ponds.build(M));
  const miller = makeFigure({ coat: 'clothGreen', pants: 'woodDark', hairKey: 'hair', hat: 'straw', apron: 'cream' });
  addFigure(g, '磨坊主', '守着风车的老人，口袋里的面粉比话还多。', miller, { pos: [1.1, 0, 2.6], ry: -0.6 });
  new Actor(miller, { mode: 'work' });
  return g;
}

function wheatField(parent) {
  const cx = 24.5, cz = 3.6;
  const Mg = new Merge();
  const rows = 9;
  for (let r0 = 0; r0 < rows; r0++) {
    for (let i = 0; i < 26; i++) {
      const px = cx - 5.4 + i * 0.44;
      const pz = cz - 3.4 + r0 * 0.8;
      const y = groundY(px, pz);
      Mg.cyl('thatch', 0.02, 0.03, 0.62, [px, y + 0.3, pz], [R(-0.1, 0.1), 0, R(-0.1, 0.1)], 4);
      if (i % 2 === 0) Mg.sph('gold', 0.075, [px, y + 0.62, pz], 6);
    }
  }
  const m = Mg.build(M);
  m.castShadow = true;
  parent.add(m);
  const Mg2 = new Merge();
  propFence(Mg2, cx - 5.8, cz - 3.9, cx + 5.9, cz - 3.9, { yFn: groundY, h: 0.9 });
  propFence(Mg2, cx + 5.9, cz - 3.9, cx + 5.9, cz + 3.6, { yFn: groundY, h: 0.9 });
  propFence(Mg2, cx + 5.9, cz + 3.6, cx - 5.8, cz + 3.6, { yFn: groundY, h: 0.9 });
  propScarecrow(parent, cx + 3.4, groundY(cx + 3.4, cz + 0.4), cz + 0.4, 2.2);
  parent.add(Mg2.build(M));
  label('麦田', new THREE.Vector3(cx, 2, cz), '整齐的麦垄，田角站着一位草人，风过时整片金黄一齐低头。', 'place');
}

function vineyard(parent) {
  const cx = -26.5, cz = -0.5;
  const base = groundY(cx, cz);
  const Mg = new Merge();
  const dir = 0.5;
  for (let tier = 0; tier < 3; tier++) {
    const ty = base + tier * 0.55;
    Mg.box('stone', 11, 0.6, 4.4, [cx, ty - 0.3, cz - 5.0 + tier * 4.4], [0, -0.2, 0]);
    Mg.box('dirt', 10.6, 0.16, 4.1, [cx, ty + 0.02, cz - 5.0 + tier * 4.4], [0, -0.2, 0]);
    for (let r0 = 0; r0 < 4; r0++) {
      const pz = cz - 6.4 + tier * 4.4 + r0 * 1.0;
      for (let i = 0; i < 11; i++) {
        const px = cx - 4.6 + i * 0.92;
        Mg.cyl('woodDark', 0.06, 0.07, 1.3, [px, ty + 0.7, pz], [0, 0, 0], 6);
        Mg.sph('foliage2', 0.32, [px + 0.1, ty + 1.3, pz], 8);
        if ((i + r0) % 3 === 0) Mg.sph('clothPlum', 0.11, [px - 0.2, ty + 1.1, pz + 0.2], 6);
      }
      Mg.box('woodDark', 9.6, 0.04, 0.04, [cx, ty + 1.3, pz], [0, 0, 0]);
    }
    Mg.box('woodDark', 0.06, 1.1, 4.2, [cx - 4.9, ty + 0.9, cz - 5.0 + tier * 4.4], [0, 0, 0]);
  }
  const m = Mg.build(M);
  m.castShadow = m.receiveShadow = true;
  parent.add(m);
  const vine = makeFigure({ coat: 'clothPlum', pants: 'ink', hat: 'straw', carry: true });
  addFigure(parent, '葡萄农', '梯田上的一天从修剪老藤开始，篮子里装着今年的收成。', vine, { pos: [cx + 1.6, groundY(cx + 1.6, cz + 1.6), cz + 1.6], ry: 2.4 });
  new Actor(vine, { mode: 'work' });
  label('葡萄梯田', new THREE.Vector3(cx, 3.4, cz - 1), '三层石砌梯田，藤架成行，秋天会结出紫得发黑的葡萄。', 'place');
}

function orchard(parent) {
  const cx = -21, cz = 16.6;
  for (let r0 = 0; r0 < 3; r0++)
    for (let i = 0; i < 4; i++) {
      const px = cx - 5.0 + i * 3.3 + (r0 % 2) * 0.6;
      const pz = cz - 3.4 + r0 * 3.4;
      treeRound(parent, px, pz, R(0.8, 1.0), 'foliage3', { apples: true });
    }
  const Mg = new Merge();
  const bx = cx + 1.2, bz = cz + 1.0;
  Mg.box('woodPale', 2.0, 0.1, 1.0, [bx, groundY(bx, bz) + 0.72, bz]);
  [[-0.8, -0.3], [0.8, -0.3], [-0.8, 0.3], [0.8, 0.3]].forEach(([ox, oz]) => Mg.box('woodDark', 0.1, 0.72, 0.1, [bx + ox, groundY(bx, bz) + 0.36, bz + oz]));
  for (let i = 0; i < 5; i++) Mg.sph('clothRose', 0.13, [bx + R(-0.8, 0.8), groundY(bx, bz) + 0.86, bz + R(-0.35, 0.35)], 8);
  const hm = Mg.build(M);
  hm.castShadow = true;
  hm.receiveShadow = true;
  parent.add(hm);
  const ladder = new Merge();
  propLadder(ladder, cx - 5.2, groundY(cx - 5.2, cz - 3.2), cz - 3.2, 3.2, 0.4);
  parent.add(ladder.build(M));
  const kid = makeFigure({ scale: 0.72, coat: 'clothRose', pants: 'woodDark', carry: true });
  addFigure(parent, '摘苹果的孩子', '踮起脚也够不到最高的那枝，只好等风来。', kid, { pos: [cx - 2.6, groundY(cx - 2.6, cz + 1.2), cz + 1.2], ry: 1.2 });
  const a = new Actor(kid, { mode: 'idle', bob: 0.05 });
  label('苹果园', new THREE.Vector3(cx, 4, cz - 2), '矮壮的苹果树排成方阵，熟透的果子落进草丛里。', 'place');
}

function kitchenGarden(parent) {
  const cx = -11.4, cz = 22.6;
  const Mg = new Merge();
  for (let bed = 0; bed < 3; bed++) {
    const bx = cx - 2.6 + bed * 2.7;
    const by = groundY(bx, cz);
    Mg.rbox('woodDark', 2.3, 0.36, 4.4, [bx, by + 0.18, cz], [0, 0, 0], 0.05);
    Mg.rbox('dirt', 2.1, 0.1, 4.2, [bx, by + 0.34, cz], [0, 0, 0], 0.04);
    for (let i = 0; i < 9; i++)
      for (let k = 0; k < 2; k++) {
        const px = bx - 0.9 + k * 1.0, pz = cz - 1.9 + i * 0.46;
        Mg.sph(pick(['foliage1', 'foliage2', 'hedge']), R(0.12, 0.19), [px + R(-0.06, 0.06), by + 0.44, pz], 7);
        if (Math.random() < 0.25) Mg.sph(pick(['clothRose', 'gold']), 0.09, [px, by + 0.5, pz + 0.1], 6);
      }
  }
  const m = Mg.build(M);
  m.castShadow = m.receiveShadow = true;
  parent.add(m);
  const gm = new Merge();
  propBarrel(gm, cx + 3.4, groundY(cx + 3.4, cz + 1.4), cz + 1.4, 1.0);
  propBarrel(gm, cx + 4.2, groundY(cx + 4.2, cz + 2.2), cz + 2.2, 0.9);
  propScarecrow(parent, cx - 4.0, groundY(cx - 4.0, cz - 1.0), cz - 1.0, 0.6, 0.9);
  parent.add(gm.build(M));
  const den = new Merge();
  const dx = cx - 3.4, dz = cz + 3.4;
  den.add('dirt', new THREE.SphereGeometry(1.5, 14, 10), [dx, groundY(dx, dz) - 0.2, dz], [0, 0, 0], [1, 0.7, 1.2]);
  den.add('ink', new THREE.SphereGeometry(0.5, 10, 8), [dx + 0.9, groundY(dx, dz) + 0.1, dz + 0.6], [0, 0, 0], [1, 0.8, 0.7]);
  parent.add(den.build(M));
  label('菜园', new THREE.Vector3(cx, 2, cz - 3), '三畦菜地，卷心菜、胡萝卜和几株番茄，篱笆边藏着狐狸的洞口。', 'place');
}

function pasture(parent) {
  const cx = 7.4, cz = -26.2;
  const barn = new THREE.Group();
  barn.position.set(cx + 2.6, groundY(cx + 2.6, cz - 2.2), cz - 2.2);
  barn.rotation.y = 0.5;
  parent.add(barn);
  const Bm = new Merge();
  Bm.box('stone', 7.4, 0.5, 5.4, [0, 0.25, 0]);
  Bm.box('woodDark', 7.0, 3.0, 5.0, [0, 1.9, 0]);
  for (let i = 0; i < 7; i++) Bm.box('woodPale', 0.14, 3.0, 5.06, [-3.2 + i * 1.07, 1.9, 0]);
  Bm.box('woodDark', 2.2, 2.6, 0.16, [0, 1.3, 2.5]);
  Bm.box('woodPale', 2.4, 0.2, 0.2, [0, 2.7, 2.56]);
  Bm.box('woodDark', 0.2, 2.6, 0.2, [0, 1.3, 2.5], [0, 0, 0.0]);
  Bm.lathe('woodDark', [[0.005, 0], [1.6, 0.02], [1.5, 0.3], [0.005, 0.34]], [0, 4.4, 1.6], [0, 0, 0], 10);
  const bm = Bm.build(M);
  barn.add(bm);
  const roof = new Merge();
  roof.box('thatch', 8.2, 0.3, 3.2, [0, 3.96, -1.1], [-0.5, 0, 0]);
  roof.box('thatch', 8.2, 0.3, 3.2, [0, 3.96, 1.1], [0.5, 0, 0]);
  roof.box('thatch', 8.4, 0.36, 0.4, [0, 4.7, 0]);
  barn.add(roof.build(M));
  const hay = new Merge();
  propHay(hay, -4.6, groundY(cx - 4.6, cz + 3.0), cz + 3.0, 1.1, 0.3);
  propHay(hay, -3.2, groundY(cx - 3.2, cz + 4.2), cz + 4.2, 0.9, 1.1);
  propHay(hay, 4.6, groundY(cx + 4.6, cz + 2.6), cz + 2.6, 1.0, 2.2);
  parent.add(hay.build(M));
  const pen = new THREE.Group();
  parent.add(pen);
  const Pm = new Merge();
  const pr = 6.4;
  for (let i = 0; i < 14; i++) {
    const a0 = (i / 14) * TAU, a1 = ((i + 1) / 14) * TAU;
    propFence(Pm, cx - 4 + Math.cos(a0) * pr, cz + 3 + Math.sin(a0) * pr, cx - 4 + Math.cos(a1) * pr, cz + 3 + Math.sin(a1) * pr, { yFn: groundY, h: 1.0 });
  }
  const trough = new Merge();
  const tx = cx - 4, tz = cz + 3;
  propBarrel(trough, tx - 1.4, groundY(tx - 1.4, tz + 4.6), tz + 4.6, 1.0, 0, true);
  trough.box('woodDark', 1.8, 0.34, 0.6, [tx + 2.0, groundY(tx + 2.0, tz - 3.4) + 0.2, tz - 3.4]);
  Pm.frame([tx - 1.4, groundY(tx - 1.4, tz + 4.6) + 0.28, tz + 4.6], [0, 0, 0]);
  Pm.box('water', 0.78, 0.04, 0.4, [0, 0, 0]);
  Pm.reset();
  parent.add(Pm.build(M));
  parent.add(trough.build(M));
  const horses = [];
  [[-2.4, 2.2], [0.6, 4.4]].forEach(([ox, oz], i) => {
    const h = makeBeast({ scale: 1.45, body: i ? 'horseDark' : 'horse', legKey: 'horseDark', legLen: 0.5, bw: 0.28, bl: 0.66, bh: 0.34, tail: 'mane', tailKey: 'horseDark', ears: 'tiny', headR: 0.19, neckF: 0.6, headUp: 1.4, headF: 0.85, muzzleKey: 'cream', hoofKey: 'ink' });
    addFigure(parent, i ? '黑马' : '枣红马', '马厩里的两匹马，一匹爱吃干草，一匹爱看人来人往。', h, { pos: [cx - 1.8 + ox, groundY(cx - 1.8 + ox, cz + 4 + oz), cz + 4 + oz], ry: R(0, TAU) });
    horses.push(h);
    const ba = new BeastActor(h, { mode: 'idle' });
    ba.setBase(h.group.position.y);
  });
  const sheepPos = [[-6.6, 3.4], [-4.2, 5.6], [-1.4, 2.0], [-5.8, 1.2], [-2.2, 6.2]];
  sheepPos.forEach(([ox, oz]) => {
    const s = makeBeast({ scale: 0.8, body: 'wool', wool: 'wool', legKey: 'ink', legR: 0.035, legLen: 0.22, bw: 0.16, bl: 0.3, bh: 0.2, ears: 'flop', earKey: 'ink', tail: 'thin', tailKey: 'wool', headR: 0.11, muzzleKey: 'ink', headUp: 1.15, headF: 0.7 });
    addFigure(parent, '绵羊', '云一样的毛团，低头吃草的时间比抬头长。', s, { pos: [cx - 4 + ox, groundY(cx - 4 + ox, cz + 3 + oz), cz + 3 + oz], ry: R(0, TAU) });
    const ba = new BeastActor(s, { mode: 'idle' });
    ba.setBase(s.group.position.y);
  });
  const shepherd = makeFigure({ coat: 'clothBlue', pants: 'woodDark', hat: 'straw', scarf: true, scarfColor: '#cd8f99', broom: true });
  addFigure(parent, '牧羊人', '带着木杖与牧羊犬，数羊数到一半就睡着了。', shepherd, { pos: [cx - 8.2, groundY(cx - 8.2, cz + 4.4), cz + 4.4], ry: 0.9 });
  const sa = new Actor(shepherd, { mode: 'idle' });
  const dog = makeBeast({ scale: 0.6, body: 'clothRose', earKey: 'clothRose', ears: 'flop', legLen: 0.2, bw: 0.15, bl: 0.3, bh: 0.19, tail: 'thin', headR: 0.11, headUp: 1.2, headF: 0.75, muzzleKey: 'cream' });
  addFigure(parent, '牧羊犬', '围着羊群打转的短腿牧羊犬，尾巴摇得像风车。', dog, { pos: [cx - 6.0, groundY(cx - 6.0, cz + 6.0), cz + 6.0], ry: 2.6 });
  new BeastActor(dog, { mode: 'idle' });
  const cart = propCart(parent, cx + 6.2, groundY(cx + 6.2, cz + 3.6), cz + 3.6, 1.2, 0.9);
  const barrelM = new Merge();
  propBarrel(barrelM, cx + 6.2, groundY(cx + 6.2, cz + 3.6) + 0.3, cz + 3.2, 0.8);
  propBarrel(barrelM, cx + 5.8, groundY(cx + 5.8, cz + 3.6) + 0.3, cz + 4.2, 0.8);
  cart.add(barrelM.build(M));
  label('牧场与羊圈', new THREE.Vector3(cx, 2, cz + 2), '木屋、干草堆与围栏里的绵羊；牧羊犬在草地上跑圈。', 'place');
}

function marsh(parent) {
  const cx = -9.2, cz = -24.6;
  const Mg = new Merge();
  const mud = new Merge();
  for (let i = 0; i < 8; i++) {
    const a = R(0, TAU), rr = R(0, 5.5);
    const px = cx + Math.cos(a) * rr, pz = cz + Math.sin(a) * rr;
    mud.add('dirt', new THREE.CircleGeometry(R(0.8, 2.0), 12), [px, groundY(px, pz) + 0.05, pz], [-Math.PI / 2, 0, R(0, TAU)]);
  }
  const mm = mud.build(M, { cast: false });
  mm.receiveShadow = true;
  parent.add(mm);
  const puddle = new Merge();
  for (let i = 0; i < 6; i++) {
    const a = R(0, TAU), rr = R(0, 4.6);
    const px = cx + Math.cos(a) * rr, pz = cz + Math.sin(a) * rr;
    puddle.add('water', new THREE.CircleGeometry(R(0.5, 1.3), 12), [px, groundY(px, pz) + 0.09, pz], [-Math.PI / 2, 0, 0]);
  }
  const pm = puddle.build(M, { cast: false });
  pm.receiveShadow = true;
  parent.add(pm);
  for (let i = 0; i < 130; i++) {
    const a = R(0, TAU), rr = R(0, 7);
    const px = cx + Math.cos(a) * rr, pz = cz + Math.sin(a) * rr;
    const h = R(0.6, 1.8);
    Mg.cyl(pick(['foliage2', 'pine', 'thatch']), 0.03, 0.05, h, [px, groundY(px, pz) + h / 2, pz], [R(-0.2, 0.2), 0, R(-0.2, 0.2)], 5);
    if (Math.random() < 0.3) Mg.cyl('woodDark', 0.055, 0.055, 0.3, [px, groundY(px, pz) + h + 0.12, pz], [0, 0, 0], 6);
  }
  for (let i = 0; i < 12; i++) {
    const a = R(0, TAU), rr = R(1, 6);
    const px = cx + Math.cos(a) * rr, pz = cz + Math.sin(a) * rr;
    Mg.cyl('cream', 0.05, 0.09, 0.34, [px, groundY(px, pz) + 0.17, pz], [0, 0, 0], 6);
    Mg.sph('clothRose', 0.14, [px, groundY(px, pz) + 0.36, pz], 8, 0.1);
  }
  const ry = Mg.build(M);
  ry.castShadow = true;
  parent.add(ry);
  const log = new Merge();
  const lx = cx + 4.4, lz = cz - 2.4;
  log.cyl('woodDark', 0.3, 0.34, 4.4, [lx, groundY(lx, lz) + 0.3, lz], [0, 1.1, Math.PI / 2], 10);
  log.sph('pine', 0.3, [lx + 1.4, groundY(lx, lz) + 0.5, lz + 1.1], 8);
  parent.add(log.build(M));
  const dead = new Merge();
  for (let i = 0; i < 3; i++) {
    const dx = cx - 4 + i * 3.4, dz = cz + R(-3, 3);
    dead.cyl('woodDark', 0.18, 0.3, 3.4, [dx, groundY(dx, dz) + 1.7, dz], [0.06 * i, 0, 0.08], 8);
    dead.cyl('woodDark', 0.07, 0.1, 1.6, [dx + 0.6, groundY(dx, dz) + 3.0, dz], [0, 0, -0.7], 6);
  }
  parent.add(dead.build(M));
  const fire = [];
  const fm = new Merge();
  for (let i = 0; i < 34; i++) {
    const a = R(0, TAU), rr = R(0, 8);
    fm.sph('book3', 0.07, [cx + Math.cos(a) * rr, groundY(cx + Math.cos(a) * rr, cz + Math.sin(a) * rr) + R(0.1, 0.4), cz + Math.sin(a) * rr], 6);
  }
  parent.add(fm.build(M));
  const fgeo = new THREE.BufferGeometry();
  const N = 60;
  const fp = new Float32Array(N * 3), fl = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    const a = R(0, TAU), rr = R(0, 8);
    fp[i * 3] = cx + Math.cos(a) * rr;
    fp[i * 3 + 1] = groundY(cx + Math.cos(a) * rr, cz + Math.sin(a) * rr) + R(0.4, 2.6);
    fp[i * 3 + 2] = cz + Math.sin(a) * rr;
    fl[i] = R(0, 1);
  }
  fgeo.setAttribute('position', new THREE.BufferAttribute(fp, 3));
  const fmat = new THREE.PointsMaterial({ size: 0.5, map: texSoft('#ffe7a0'), color: '#ffe7a0', transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false });
  const flies = new THREE.Points(fgeo, fmat);
  parent.add(flies);
  tick((dt, t) => {
    const p = fgeo.attributes.position.array;
    for (let i = 0; i < N; i++) {
      p[i * 3 + 1] += Math.sin(t * 1.7 + i) * dt * 0.5;
      p[i * 3] += Math.sin(t * 0.9 + i * 2) * dt * 0.5;
      p[i * 3 + 2] += Math.cos(t * 0.8 + i) * dt * 0.5;
    }
    fgeo.attributes.position.needsUpdate = true;
    fmat.opacity = 0.25 + (0.75) * clamp(envNightLocal(), 0.15, 1);
  });
  label('湿沼与萤火', new THREE.Vector3(cx, 2.6, cz), '泥沼、芦苇与枯木桩；入夜后成群的萤火虫浮在草上。', 'place');
}
let _envNight = 0;
export function setEnvNight(v) {
  _envNight = v;
}
function envNightLocal() {
  return _envNight;
}

function meadow(parent) {
  const cx = 19.6, cz = -16.4;
  const big = treeRound(parent, cx + 2.4, cz - 1.2, 2.3, 'foliage1');
  const Mg = new Merge();
  const sx = cx - 2.0, sz = cz + 1.4;
  const sy = groundY(sx, sz);
  Mg.box('clothRose', 3.0, 0.06, 2.2, [sx, sy + 0.07, sz]);
  Mg.box('cream', 2.6, 0.05, 0.5, [sx, sy + 0.1, sz + 0.6]);
  Mg.box('clothBlue', 2.6, 0.05, 0.5, [sx, sy + 0.1, sz - 0.6]);
  propBarrel(Mg, sx + 1.0, sy + 0.05, sz - 0.6, 0.5);
  Mg.sph('clothRose', 0.12, [sx - 0.8, sy + 0.2, sz + 0.4], 8);
  Mg.sph('gold', 0.1, [sx - 0.5, sy + 0.2, sz - 0.1], 8);
  const m = Mg.build(M);
  m.castShadow = true;
  parent.add(m);
  const swing = new THREE.Group();
  parent.add(swing);
  const Sm = new Merge();
  const wx = cx + 2.4, wz = cz - 1.2;
  const wy = groundY(wx, wz);
  Sm.cyl('woodDark', 0.04, 0.04, 3.4, [wx + 1.9, wy + 2.3, wz + 0.2], [0, 0, 0], 6);
  Sm.cyl('woodDark', 0.04, 0.04, 3.4, [wx + 2.4, wy + 2.3, wz + 0.7], [0, 0, 0], 6);
  const swm = Sm.build(M);
  swing.add(swm);
  const plank = new THREE.Mesh(gBox(0.7, 0.06, 0.24), M.woodPale);
  plank.position.set(wx + 2.15, wy + 1.5, wz + 0.45);
  plank.castShadow = true;
  swing.add(plank);
  const ropeM = new Merge();
  ropeM.cyl('thatch', 0.02, 0.02, 0.85, [wx + 2.15, wy + 1.95, wz + 0.28], [0, 0, 0], 5);
  ropeM.cyl('thatch', 0.02, 0.02, 0.85, [wx + 2.15, wy + 1.95, wz + 0.62], [0, 0, 0], 5);
  swing.add(ropeM.build(M));
  tick((dt, t) => {
    plank.rotation.x = Math.sin(t * 1.1) * 0.22;
    plank.position.y = wy + 1.5 + Math.sin(t * 1.1) * 0.02;
  });
  const couple = [];
  const p1 = makeFigure({ coat: 'clothBlue', pants: 'woodDark', hat: 'feather' });
  addFigure(parent, '旅人', '在树荫下歇脚的人，正把一路的见闻讲给同伴听。', p1, { pos: [sx - 0.7, sy, sz + 0.2], ry: 0.7 });
  const a1 = new Actor(p1, { mode: 'sit', bob: 0.02 });
  const p2 = makeFigure({ coat: 'clothRose', pants: 'ink', hairKey: 'hair' });
  addFigure(parent, '同伴', '认真听故事的人，手里的面包忘了吃。', p2, { pos: [sx + 0.7, sy, sz - 0.3], ry: -1.4 });
  const a2 = new Actor(p2, { mode: 'sit', bob: 0.02 });
  const bfly = [];
  for (let i = 0; i < 10; i++) {
    const b = new THREE.Group();
    const wm = new THREE.Mesh(gPlane(0.3, 0.22), new THREE.MeshStandardMaterial({ color: pick(['#f2cf8a', '#e2939f', '#cfe3f5']), side: THREE.DoubleSide, roughness: 1 }));
    const wm2 = wm.clone();
    wm.position.x = -0.16;
    wm2.position.x = 0.16;
    b.add(wm, wm2);
    b.position.set(cx + R(-6, 6), groundY(cx, cz) + R(0.7, 2.2), cz + R(-5, 5));
    b.userData = { a: R(0, TAU), r: R(0.4, 1.6), y: b.position.y, ph: R(0, TAU), wm, wm2 };
    parent.add(b);
    bfly.push(b);
  }
  const bc = [cx, cz];
  tick((dt, t) => {
    bfly.forEach((b) => {
      const u = b.userData;
      u.a += dt * 1.1;
      b.position.set(bc[0] + Math.cos(u.a) * u.r, u.y + Math.sin(t * 2 + u.ph) * 0.3, bc[1] + Math.sin(u.a * 0.8) * u.r);
      b.rotation.y = -u.a;
      const f = Math.abs(Math.sin(t * 9 + u.ph));
      u.wm.rotation.z = -f * 0.9;
      u.wm2.rotation.z = f * 0.9;
    });
  });
  label('花海草坪', new THREE.Vector3(cx - 2, 2.4, cz + 1), '大树、秋千与野餐毯，风把野花吹成一片一片的浪。', 'place');
}

function knoll(parent) {
  const cx = -18.6, cz = -18.6;
  for (let i = 0; i < 16; i++) {
    const a = R(0, TAU), rr = R(0, 8.5);
    const px = cx + Math.cos(a) * rr, pz = cz + Math.sin(a) * rr;
    if (Math.hypot(px, pz) < SKIRT_R + 1) continue;
    treePine(parent, px, pz, R(0.9, 1.5));
  }
  const Mg = new Merge();
  const tx = cx + 1.2, tz = cz + 1.6;
  const ty = groundY(tx, tz);
  Mg.lathe('stoneWarm', [[0.005, 0], [2.4, 0.02], [2.55, 0.4], [2.3, 3.2], [2.35, 3.6], [2.2, 4.4]], [tx, ty, tz], [0, 0, 0], 18);
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * TAU;
    const hh = 0.3 + (i % 3) * 0.28;
    Mg.box('stoneWarm', 0.62, hh + 0.5, 0.5, [tx + Math.cos(a) * 2.3, ty + 4.4 + hh / 2, tz + Math.sin(a) * 2.3], [0, -a + Math.PI / 2, 0]);
  }
  Mg.box('stoneWarm', 1.0, 2.0, 0.2, [tx, ty + 1.0, tz + 2.35]);
  Mg.box('stoneWarm', 0.9, 1.6, 0.18, [tx, ty + 0.8, tz - 2.35]);
  Mg.cyl('stoneWarm', 2.6, 2.9, 0.6, [tx, ty + 0.2, tz], [0, 0, 0], 18);
  const m = Mg.build(M);
  m.castShadow = m.receiveShadow = true;
  parent.add(m);
  const rub = new Merge();
  for (let i = 0; i < 16; i++) {
    const a = R(0, TAU), rr = R(2.8, 6.6);
    const px = tx + Math.cos(a) * rr, pz = tz + Math.sin(a) * rr;
    rub.add('stoneWarm', new THREE.BoxGeometry(R(0.4, 0.9), R(0.2, 0.4), R(0.4, 0.8)), [px, groundY(px, pz) + 0.15, pz], [R(0, 0.4), R(0, 3), R(0, 0.4)]);
  }
  const rm = rub.build(M);
  rm.castShadow = rm.receiveShadow = true;
  parent.add(rm);
  const cat = makeBeast({ scale: 0.5, body: 'ink', legLen: 0.16, bw: 0.13, bl: 0.26, bh: 0.17, tail: 'thin', tailKey: 'ink', ears: 'pointy', earKey: 'ink', headR: 0.1, headUp: 1.2, headF: 0.78, muzzleKey: 'cream' });
  addFigure(parent, '黑猫', '住在废塔里的黑猫，是这片松林的看守。', cat, { pos: [tx + 1.6, ty + 4.5, tz + 1.2], ry: 0.8 });
  new BeastActor(cat, { mode: 'idle' });
  const fw = new THREE.Group();
  fw.position.set(tx - 3.2, groundY(tx - 3.2, tz + 2.6), tz + 2.6);
  parent.add(fw);
  const fm = new Merge();
  fm.add('dirt', new THREE.CircleGeometry(1.1, 12), [0, 0.06, 0], [-Math.PI / 2, 0, 0]);
  fm.cyl('woodDark', 0.07, 0.07, 0.9, [0, 0.45, 0], [0.3, 0, 0.2], 6);
  fm.cyl('woodDark', 0.07, 0.07, 0.9, [0.3, 0.45, 0.1], [-0.2, 0, -0.3], 6);
  const fmm = fm.build(M);
  fw.add(fmm);
  makeFlame(fw, 0, 0.3, 0, 1.4, '#ffb763');
  const l = new THREE.PointLight('#ff9c46', 0, 12, 1.8);
  l.position.set(0, 0.7, 0);
  fw.add(l);
  reg.lampLights.push({ light: l, max: 1.6 });
  const bm2 = new Merge();
  propBench(bm2, tx + 3.4, groundY(tx + 3.4, tz - 2.2), tz - 2.2, 1.6, 1.6);
  const bm2m = bm2.build(M);
  bm2m.castShadow = true;
  parent.add(bm2m);
  label('松林丘 · 古塔废墟', new THREE.Vector3(cx, 6.6, cz), '山坡上散着松林与断墙，塔顶只剩一圈石齿；黑猫守着篝火。', 'place');
}

function roseGarden(parent) {
  const cx = 12.4, cz = 22.2;
  const Mg = new Merge();
  const g = new THREE.Group();
  g.position.set(cx, groundY(cx, cz), cz);
  g.rotation.y = -0.6;
  parent.add(g);
  const seg = 3.0;
  const layout = [
    [-seg, -seg, seg, -seg], [seg, -seg, seg, 0], [seg, 0, 0, 0], [-seg, seg, 0, seg],
    [0, seg, seg, seg], [-seg, 0, -seg, seg], [0, 0, 0, seg]
  ];
  layout.forEach(([x0, z0, x1, z1]) => hedgerow(g, x0, z0, x1, z1, 0.95, () => 0));
  const pathM = new Merge();
  for (let i = 0; i < 22; i++) {
    pathM.cyl('sand', R(0.24, 0.34), R(0.26, 0.36), 0.12, [R(-5, 5), 0.06, R(-5, 5)], [0, 0, 0], 8);
  }
  g.add(pathM.build(M, { cast: false }));
  const bm = new Merge();
  propBench(bm, -2.2, 0, 4.2, 0.4, 1.7);
  propBench(bm, 3.6, 0, -2.4, -1.4, 1.7);
  g.add(bm.build(M));
  const statue = new Merge();
  [-4.2, 4.2].forEach((sx) => {
    statue.cyl('marble', 0.4, 0.5, 1.1, [sx, 0.55, 0.2], [0, 0, 0], 10);
    statue.sph('marble', 0.22, [sx, 1.35, 0.2], 12);
    statue.lathe('marble', [[0.005, 0], [0.3, 0.02], [0.32, 0.6], [0.2, 0.9]], [sx, 1.05, 0.2], [0, 0, 0], 12);
  });
  const stm = statue.build(M);
  stm.castShadow = true;
  g.add(stm);
  const rose = makeRose(g, 0, 0.1, -0.4, 1.5);
  registerRose(rose);
  const lam = new THREE.Group();
  g.add(lam);
  makeLampPost(g, -5.0, 5.0, { s: 0.8 });
  makeLampPost(g, 5.0, 5.0, { s: 0.8 });
  func_noop();
  label('玫瑰园', new THREE.Vector3(cx, 2.6, cz), '修剪成迷宫状的矮篱与碎石小径，中央的玻璃罩里住着那朵骄傲的玫瑰。', 'place');
  return rose;
}
function registerRose(rose) {
  reg.figures.push({ name: '玫瑰', desc: '她要玻璃罩、要屏风、要人时时刻刻记得她——因为她只有四根刺来保护自己。', group: rose.group, rose: true });
  rose.group.userData.pickable = true;
  rose.group.userData.name = '玫瑰';
  rose.group.userData.desc = '她要玻璃罩、要屏风、要人时时刻刻记得她。';
  rose.group.traverse((o) => {
    o.userData.fig = rose.group;
  });
}
function func_noop() {}

export function scatter(parent) {
  const tuft = gCone(0.09, 0.5, 3);
  tuft.translate(0, 0.25, 0);
  const N = 2600;
  const im = new THREE.InstancedMesh(tuft, new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 1 }), N);
  const dummy = new THREE.Object3D();
  const col = new THREE.Color();
  let n = 0, guard = 0;
  while (n < N && guard < N * 20) {
    guard++;
    const a = R(0, TAU), rr = R(SKIRT_R + 0.4, 32.6);
    const x = Math.cos(a) * rr, z = Math.sin(a) * rr;
    if (!freeSpot(x, z, { path: 1.35, lake: 1.15, minR: SKIRT_R + 0.3 })) continue;
    const y = groundY(x, z);
    dummy.position.set(x, y, z);
    dummy.rotation.set(R(-0.2, 0.2), R(0, TAU), R(-0.2, 0.2));
    const s = R(0.6, 1.5);
    dummy.scale.set(s, R(0.7, 1.6), s);
    dummy.updateMatrix();
    im.setMatrixAt(n, dummy.matrix);
    col.set(pick(['#c3dda3', '#a8c78e', '#8fb277', '#d6e6b4', '#b7d194']));
    im.setColorAt(n, col);
    n++;
  }
  im.count = n;
  im.castShadow = false;
  im.receiveShadow = true;
  im.instanceMatrix.needsUpdate = true;
  if (im.instanceColor) im.instanceColor.needsUpdate = true;
  parent.add(im);

  const petal = gPlane(0.24, 0.24);
  petal.translate(0, 0.14, 0);
  const N2 = 900;
  const flowerTex = new THREE.CanvasTexture(flowerCanvas());
  flowerTex.colorSpace = THREE.SRGBColorSpace;
  const fm = new THREE.InstancedMesh(petal, new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 1, map: flowerTex, side: THREE.DoubleSide, transparent: true, alphaTest: 0.3 }), N2);
  let n2 = 0;
  guard = 0;
  while (n2 < N2 && guard < N2 * 20) {
    guard++;
    const a = R(0, TAU), rr = R(SKIRT_R + 0.5, 32);
    const x = Math.cos(a) * rr, z = Math.sin(a) * rr;
    if (!freeSpot(x, z, { path: 1.2, lake: 1.15 })) continue;
    dummy.position.set(x, groundY(x, z), z);
    dummy.rotation.set(0, R(0, TAU), R(-0.15, 0.15));
    dummy.scale.setScalar(R(0.7, 1.5));
    dummy.updateMatrix();
    fm.setMatrixAt(n2, dummy.matrix);
    col.set(pick(['#ffffff', '#f5c8d0', '#cfe0f5', '#f6dda0', '#e8a0ac', '#d7c6f0']));
    fm.setColorAt(n2, col);
    n2++;
  }
  fm.count = n2;
  fm.castShadow = false;
  fm.receiveShadow = true;
  parent.add(fm);

  const stonesM = new Merge();
  for (let i = 0; i < 60; i++) {
    const a = R(0, TAU), rr = R(SKIRT_R + 0.2, 32.6);
    const x = Math.cos(a) * rr, z = Math.sin(a) * rr;
    if (!freeSpot(x, z, { path: 1.1, lake: 1.2 })) continue;
    stonesM.add('rockPlain', jitterGeo(new THREE.IcosahedronGeometry(R(0.2, 0.55), 0), 0.24, i), [x, groundY(x, z) + 0.08, z], [R(0, 3), R(0, 3), R(0, 3)], [1, R(0.6, 0.9), 1]);
  }
  const sm = stonesM.build(M);
  sm.castShadow = sm.receiveShadow = true;
  parent.add(sm);

  for (let i = 0; i < 26; i++) {
    let x, z, ok = false;
    for (let k = 0; k < 30 && !ok; k++) {
      const a = R(0, TAU), rr = R(SKIRT_R + 2.4, 31.6);
      x = Math.cos(a) * rr; z = Math.sin(a) * rr;
      ok = freeSpot(x, z, { path: 2.6, lake: 1.5, minR: SKIRT_R + 2.2 });
    }
    if (!ok) continue;
    if (Math.random() < 0.3) bush(parent, x, z, R(0.8, 1.4));
    else treeRound(parent, x, z, R(0.7, 1.15), pick(['foliage1', 'foliage2', 'foliage3', 'foliage4']));
  }
  for (let i = 0; i < 7; i++) {
    const a = R(0, TAU), rr = R(SKIRT_R + 1.2, 31);
    const x = Math.cos(a) * rr, z = Math.sin(a) * rr;
    if (!freeSpot(x, z, { path: 2.2, lake: 1.4 })) continue;
    treePoplar(parent, x, z, R(0.9, 1.3));
  }
  const logs = new Merge();
  for (let i = 0; i < 7; i++) {
    const a = R(0, TAU), rr = R(SKIRT_R + 1, 31);
    const x = Math.cos(a) * rr, z = Math.sin(a) * rr;
    if (!freeSpot(x, z, { path: 2.0, lake: 1.4 })) continue;
    if (Math.random() < 0.5) logs.cyl('woodDark', 0.24, 0.28, R(1.4, 3), [x, groundY(x, z) + 0.26, z], [0, R(0, 3), Math.PI / 2 + R(-0.2, 0.2)], 9);
    else logs.cyl('woodDark', R(0.3, 0.42), R(0.36, 0.46), 0.5, [x, groundY(x, z) + 0.25, z], [0, R(0, 3), 0], 10);
  }
  const lm = logs.build(M);
  lm.castShadow = lm.receiveShadow = true;
  parent.add(lm);
}
function flowerCanvas() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const x = c.getContext('2d');
  x.translate(32, 34);
  x.fillStyle = '#ffffff';
  for (let i = 0; i < 5; i++) {
    x.save();
    x.rotate((i / 5) * TAU);
    x.beginPath();
    x.ellipse(0, -11, 7.5, 12, 0, 0, TAU);
    x.fill();
    x.restore();
  }
  x.fillStyle = '#f6dfa6';
  x.beginPath();
  x.arc(0, 0, 6, 0, TAU);
  x.fill();
  return c;
}

export function buildTerrain(scene) {
  const g = new THREE.Group();
  scene.add(g);
  const p = new Merge();
  propFence(p, -2.2, 29.0, 2.2, 29.0, { yFn: groundY, h: 0.9 });
  const ringCurve = pathCurve(RING);
  ribbon(g, RING.map(([x, z]) => [x, groundY(x, z) + 0.075, z]), 2.5, M.dirt, { seg: 360, uvRep: 40 });
  const branch = [[0, 25.4], [0.6, 24.0], [0.2, 22.6]];
  bookBranch(g, branch, [0, 21.6]);
  scatter(g);
  lake(g);
  windmill(g);
  wheatField(g);
  vineyard(g);
  orchard(g);
  kitchenGarden(g);
  pasture(g);
  marsh(g);
  meadow(g);
  knoll(g);
  const rose = roseGarden(g);
  g.add(p.build(M));

  const lamps = [[9, 25.6], [-9, 25.4], [20.6, 20.6], [-20.4, 20.4], [25.6, 10], [-25.6, 9], [25.8, -7], [-24, -6], [16, -18.6], [-15.6, -19.6], [2, -24.6], [-8, -23.4], [12.6, 24.4], [-11, 23.6]];
  lamps.forEach(([x, z]) => makeLampPost(g, x, z, { y: groundY(x, z), s: 1.0 }));

  const sign = new Merge();
  propSignPost(sign, 1.2, groundY(1.2, 24.2), 24.2, 0.3);
  propSignPost(sign, 8.6, groundY(8.6, 26), 26, -0.5);
  propSignPost(sign, -8.6, groundY(-8.6, 25.2), 25.2, 0.6);
  propSignPost(sign, 21.4, groundY(21.4, 19), 19, -1.1);
  const sg = sign.build(M);
  sg.castShadow = true;
  g.add(sg);

  for (let i = 0; i < 9; i++) {
    const a = R(0, TAU), rr = R(SKIRT_R + 1.5, 31.5);
    const x = Math.cos(a) * rr, z = Math.sin(a) * rr;
    if (!freeSpot(x, z, { path: 2.4, lake: 1.5 })) continue;
    propCart(g, x, groundY(x, z), z, R(0, TAU), R(0.8, 1.0));
  }
  return { group: g, ringCurve, rose };
}
function bookBranch(g, pts, gate) {
  const all = [...pts, gate];
  ribbon(g, all.map(([x, z]) => [x, groundY(x, z) + 0.07, z]), 2.2, M.dirt, { seg: 40 });
}
