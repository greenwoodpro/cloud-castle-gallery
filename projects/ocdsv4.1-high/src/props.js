import * as THREE from 'three';
import {
  M, Merge, R, RI, pick, TAU, reg, tick, gBox, gRBox, gCyl, gCone, gSph, gTor, gLathe, gPlane,
  shadowed, holder, texRug, texHerald, texQuilt, texSoft, PAL, lerp, clamp
} from './core.js';

export const fireMat = new THREE.MeshBasicMaterial({ color: '#ffb763', transparent: true, opacity: 0.72, blending: THREE.AdditiveBlending, depthWrite: false });
export const glowMat = new THREE.MeshBasicMaterial({ color: '#ffd39a', transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false });

export function barrelProfile(s) {
  return [[0.005, 0], [0.33, 0.03], [0.42, 0.3], [0.43, 0.58], [0.34, 0.85], [0.005, 0.88]].map((p) => [p[0] * s, p[1] * s]);
}
export function propBarrel(Mg, x, y, z, s = 1, ry = 0, lying = false) {
  if (lying) {
    Mg.frame([x, y + 0.44 * s, z], [0, ry, Math.PI / 2]);
    Mg.lathe('wood', barrelProfile(s), [0, -0.44 * s, 0]);
    Mg.tor('ironDark', 0.43 * s, 0.028 * s, [0, 0.3 * s, 0], [Math.PI / 2, 0, 0]);
    Mg.tor('ironDark', 0.43 * s, 0.028 * s, [0, -0.18 * s, 0], [Math.PI / 2, 0, 0]);
  } else {
    Mg.frame([x, y, z], [0, ry, 0]);
    Mg.lathe('wood', barrelProfile(s), [0, 0, 0]);
    Mg.tor('ironDark', 0.43 * s, 0.03 * s, [0, 0.3 * s, 0], [Math.PI / 2, 0, 0]);
    Mg.tor('ironDark', 0.44 * s, 0.03 * s, [0, 0.58 * s, 0], [Math.PI / 2, 0, 0]);
    Mg.cyl('ironDark', 0.36 * s, 0.36 * s, 0.03 * s, [0, 0.87 * s, 0]);
  }
  Mg.reset();
  return Mg;
}
export function propCrate(Mg, x, y, z, s = 1, ry = 0) {
  Mg.frame([x, y + 0.42 * s, z], [0, ry, 0.02]);
  Mg.box('wood', 0.84 * s, 0.84 * s, 0.84 * s, [0, 0, 0]);
  const t = 0.05 * s;
  Mg.box('woodDark', 0.9 * s, t, 0.9 * s, [0, 0.4 * s, 0]);
  Mg.box('woodDark', 0.9 * s, t, 0.9 * s, [0, -0.4 * s, 0]);
  Mg.box('woodDark', 0.9 * s, 0.09 * s, t, [0, 0, 0.42 * s]);
  Mg.reset();
  return Mg;
}
export function propSack(Mg, x, y, z, s = 1, ry = 0) {
  Mg.frame([x, y, z], [0, ry, 0]);
  Mg.sph('thatch', 0.3 * s, [0, 0.3 * s, 0], 10);
  Mg.cyl('thatch', 0.13 * s, 0.2 * s, 0.22 * s, [0, 0.56 * s, 0]);
  Mg.sph('woodDark', 0.05 * s, [0, 0.68 * s, 0]);
  Mg.reset();
  return Mg;
}
export function propHay(Mg, x, y, z, s = 1, ry = 0) {
  Mg.frame([x, y, z], [0, ry, 0]);
  Mg.lathe('thatch', [[0.005, 0], [0.9 * s, 0.1 * s], [1.15 * s, 0.85 * s], [1.0 * s, 1.6 * s], [0.75 * s, 2.15 * s], [0.005, 2.3 * s]], [0, 0, 0], [0, 0, 0], 14);
  Mg.reset();
  return Mg;
}
export function propTable(Mg, x, y, z, w = 2, d = 1, h = 0.78, ry = 0, opts = {}) {
  Mg.frame([x, y + h, z], [0, ry, 0]);
  Mg.box('woodPale', w, 0.09, d, [0, 0, 0]);
  const lx = w / 2 - 0.16, lz = d / 2 - 0.16;
  [[-lx, -lz], [lx, -lz], [-lx, lz], [lx, lz]].forEach(([px, pz]) => Mg.box('woodDark', 0.13, h, 0.13, [px, -h / 2, pz]));
  Mg.box('woodDark', w - 0.3, 0.07, 0.09, [0, -h * 0.45, 0]);
  if (opts.cloth) {
    Mg.box('clothCream', w * 1.02, 0.04, d * 1.02, [0, 0.06, 0]);
  }
  Mg.reset();
  return Mg;
}
export function propStool(Mg, x, y, z, ry = 0, h = 0.48) {
  Mg.frame([x, y + h, z], [0, ry, 0]);
  Mg.box('wood', 0.42, 0.07, 0.42, [0, 0, 0]);
  [[-0.15, -0.15], [0.15, -0.15], [-0.15, 0.15], [0.15, 0.15]].forEach(([px, pz]) => Mg.cyl('woodDark', 0.035, 0.03, h, [px * 1.3, -h / 2, pz * 1.3]));
  Mg.reset();
  return Mg;
}
export function propChair(Mg, x, y, z, ry = 0, s = 1) {
  Mg.frame([x, y, z], [0, ry, 0]);
  Mg.box('woodDark', 0.46 * s, 0.08 * s, 0.46 * s, [0, 0.46 * s, 0]);
  Mg.box('woodDark', 0.46 * s, 0.62 * s, 0.08 * s, [0, 0.78 * s, -0.19 * s]);
  [[-0.18, -0.18], [0.18, -0.18], [-0.18, 0.18], [0.18, 0.18]].forEach(([px, pz]) => Mg.box('woodDark', 0.06 * s, 0.46 * s, 0.06 * s, [px * s, 0.23 * s, pz * s]));
  Mg.reset();
  return Mg;
}
export function propBench(Mg, x, y, z, ry = 0, len = 2) {
  Mg.frame([x, y, z], [0, ry, 0]);
  Mg.box('wood', len, 0.09, 0.42, [0, 0.46, 0]);
  Mg.box('woodDark', len, 0.4, 0.08, [0, 0.72, -0.16]);
  Mg.box('woodDark', 0.12, 0.46, 0.36, [-len / 2 + 0.2, 0.23, 0]);
  Mg.box('woodDark', 0.12, 0.46, 0.36, [len / 2 - 0.2, 0.23, 0]);
  Mg.reset();
  return Mg;
}
export function propChest(Mg, x, y, z, ry = 0, s = 1) {
  Mg.frame([x, y, z], [0, ry, 0]);
  Mg.rbox('woodDark', 0.9 * s, 0.46 * s, 0.55 * s, [0, 0.23 * s, 0], [0, 0, 0], 0.04);
  Mg.rbox('wood', 0.92 * s, 0.24 * s, 0.57 * s, [0, 0.56 * s, 0], [0, 0, 0], 0.1);
  Mg.box('ironDark', 0.1 * s, 0.8 * s, 0.6 * s, [0, 0.4 * s, 0]);
  Mg.box('gold', 0.12 * s, 0.1 * s, 0.05 * s, [0, 0.44 * s, 0.29 * s]);
  Mg.reset();
  return Mg;
}
export function propShelf(Mg, x, y, z, ry = 0, w = 1.6, h = 2, tiers = 4, books = true) {
  Mg.frame([x, y, z], [0, ry, 0]);
  Mg.box('woodDark', w, h, 0.06, [0, h / 2, -0.2]);
  Mg.box('woodDark', 0.08, h, 0.42, [-w / 2, h / 2, 0]);
  Mg.box('woodDark', 0.08, h, 0.42, [w / 2, h / 2, 0]);
  const bookKeys = ['book1', 'book2', 'book3', 'book4', 'book5'];
  for (let i = 1; i <= tiers; i++) {
    const ty = (h / tiers) * i;
    Mg.box('woodDark', w, 0.06, 0.42, [0, ty, 0]);
    if (!books || i === tiers) continue;
    let px = -w / 2 + 0.16;
    const rowH = ty - h / tiers;
    while (px < w / 2 - 0.2) {
      const bw = R(0.05, 0.12), bh = R(rowH * 0.5, rowH * 0.82);
      Mg.box(pick(bookKeys), bw, bh, R(0.22, 0.3), [px + bw / 2, ty + bh / 2, R(-0.02, 0.04)]);
      if (Math.random() < 0.1) px += 0.14;
      px += bw + 0.012;
    }
  }
  Mg.reset();
  return Mg;
}
export function propPot(Mg, x, y, z, s = 1, key = 'dirt') {
  Mg.frame([x, y, z], [0, R(0, TAU), 0]);
  Mg.lathe(key, [[0.005, 0], [0.22 * s, 0.02 * s], [0.3 * s, 0.22 * s], [0.2 * s, 0.46 * s], [0.24 * s, 0.5 * s], [0.16 * s, 0.5 * s]], [0, 0, 0], [0, 0, 0], 12);
  Mg.reset();
  return Mg;
}
export function propJar(Mg, x, y, z, s = 1, key = 'glass') {
  Mg.frame([x, y, z], [0, 0, 0]);
  Mg.lathe(key, [[0.005, 0], [0.13 * s, 0.01 * s], [0.16 * s, 0.16 * s], [0.1 * s, 0.3 * s], [0.11 * s, 0.36 * s], [0.07 * s, 0.37 * s]], [0, 0, 0], [0, 0, 0], 10);
  Mg.reset();
  return Mg;
}
export function propCandle(Mg, x, y, z, s = 1, key = 'candle') {
  Mg.frame([x, y, z], [0, 0, 0]);
  Mg.cyl('ironDark', 0.09 * s, 0.11 * s, 0.04 * s, [0, 0.02 * s, 0]);
  Mg.cyl(key, 0.035 * s, 0.045 * s, R(0.24, 0.4) * s, [0, 0.22 * s, 0]);
  Mg.reset();
  return Mg;
}
export function makeFlame(parent, x, y, z, s = 1, color = '#ffb763') {
  const g = new THREE.Group();
  g.position.set(x, y, z);
  const mat = fireMat.clone();
  mat.color = new THREE.Color(color);
  const core = new THREE.Mesh(gCone(0.07 * s, 0.22 * s, 6), mat);
  core.position.y = 0.11 * s;
  const outer = new THREE.Mesh(gCone(0.12 * s, 0.3 * s, 6), mat.clone());
  outer.material.opacity = 0.34;
  outer.position.y = 0.14 * s;
  g.add(core, outer);
  const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: texSoft(color), color: '#ffffff', transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false }));
  glow.scale.setScalar(1.1 * s);
  glow.position.y = 0.14 * s;
  g.add(glow);
  parent.add(g);
  const ph = R(0, TAU), sp = R(6, 11);
  tick((dt, t) => {
    const f = 0.75 + Math.sin(t * sp + ph) * 0.16 + Math.sin(t * sp * 2.7 + ph * 2) * 0.1;
    core.scale.set(0.9 + f * 0.2, f, 0.9 + f * 0.2);
    outer.scale.setScalar(0.85 + f * 0.35);
    glow.material.opacity = 0.22 + f * 0.22;
    g.rotation.z = Math.sin(t * sp * 0.6 + ph) * 0.09;
  });
  return g;
}
export function propCandelabra(Mg, x, y, z, s = 1) {
  Mg.frame([x, y, z], [0, 0, 0]);
  Mg.lathe('gold', [[0.005, 0], [0.16 * s, 0.02 * s], [0.09 * s, 0.06 * s], [0.05 * s, 0.4 * s]], [0, 0, 0], [0, 0, 0], 12);
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * TAU;
    Mg.tor('gold', 0.16 * s, 0.02 * s, [Math.cos(a) * 0.16 * s, 0.42 * s, Math.sin(a) * 0.16 * s], [Math.PI / 2, 0, 0]);
    Mg.cyl('candle', 0.035 * s, 0.04 * s, 0.26 * s, [Math.cos(a) * 0.32 * s, 0.55 * s, Math.sin(a) * 0.32 * s]);
    Mg.cyl('candle', 0.035 * s, 0.04 * s, 0.26 * s, [0, 0.6 * s, 0]);
  }
  Mg.reset();
  return Mg;
}
export function propBed(Mg, x, y, z, ry = 0, opts = {}) {
  const w = 1.5, l = 2.2, h = 0.62;
  Mg.frame([x, y, z], [0, ry, 0]);
  Mg.rbox('woodDark', w + 0.16, h, l + 0.16, [0, h / 2, 0], [0, 0, 0], 0.05);
  Mg.rbox('clothCream', w, 0.2, l, [0, h + 0.06, 0], [0, 0, 0], 0.08);
  Mg.rbox(opts.quiltKey || 'clothRose', w * 1.02, 0.16, l * 0.72, [0, h + 0.19, l * 0.12], [0, 0, 0], 0.08);
  Mg.rbox('clothCream', 0.7, 0.18, 0.42, [-0.3, h + 0.22, -l / 2 + 0.34], [0, 0.2, 0], 0.07);
  Mg.rbox('clothCream', 0.7, 0.17, 0.4, [0.3, h + 0.22, -l / 2 + 0.32], [0, -0.16, 0], 0.07);
  const px = w / 2 + 0.04, pz = l / 2 + 0.04;
  [[-px, -pz], [px, -pz], [-px, pz], [px, pz]].forEach(([a, b]) => {
    Mg.cyl('woodDark', 0.07, 0.09, 2.0, [a, 1.0, b]);
    Mg.sph('woodDark', 0.09, [a, 2.0, b], 8);
  });
  if (opts.canopy !== false) {
    Mg.box('clothPlum', w + 0.24, 0.1, l + 0.24, [0, 2.0, 0]);
    Mg.box('clothPlum', w + 0.3, 0.5, 0.08, [0, 1.72, -pz]);
    Mg.rbox('clothPlum', 0.1, 1.2, l + 0.2, [-px, 1.4, 0], [0, 0, 0], 0.03);
  }
  Mg.reset();
  return Mg;
}
export function propWardrobe(Mg, x, y, z, ry = 0, s = 1) {
  Mg.frame([x, y, z], [0, ry, 0]);
  Mg.rbox('woodDark', 1.1 * s, 1.9 * s, 0.6 * s, [0, 0.95 * s, 0], [0, 0, 0], 0.04);
  Mg.box('wood', 0.52 * s, 1.7 * s, 0.05 * s, [-0.27 * s, 0.95 * s, 0.31 * s]);
  Mg.box('wood', 0.52 * s, 1.7 * s, 0.05 * s, [0.27 * s, 0.95 * s, 0.31 * s]);
  Mg.sph('gold', 0.05 * s, [-0.06 * s, 0.95 * s, 0.34 * s], 8);
  Mg.sph('gold', 0.05 * s, [0.06 * s, 0.95 * s, 0.34 * s], 8);
  Mg.box('woodDark', 1.2 * s, 0.1 * s, 0.7 * s, [0, 1.95 * s, 0]);
  Mg.reset();
  return Mg;
}
export function propWashstand(Mg, x, y, z, ry = 0) {
  Mg.frame([x, y, z], [0, ry, 0]);
  Mg.box('wood', 0.7, 0.07, 0.5, [0, 0.72, 0]);
  [[-0.3, -0.2], [0.3, -0.2], [-0.3, 0.2], [0.3, 0.2]].forEach(([px, pz]) => Mg.cyl('woodDark', 0.035, 0.03, 0.72, [px, 0.36, pz]));
  Mg.lathe('marble', [[0.005, 0], [0.2, 0.02], [0.26, 0.14], [0.22, 0.18], [0.24, 0.19]], [0, 0.76, 0], [0, 0, 0], 12);
  Mg.lathe('dirt', [[0.005, 0], [0.08, 0.01], [0.1, 0.16], [0.05, 0.22]], [0.26, 0.76, 0.1], [0, 0, 0], 8);
  Mg.box('gold', 0.02, 0.3, 0.16, [0.0, 1.02, -0.22]);
  Mg.reset();
  return Mg;
}
export function propFence(Mg, x0, z0, x1, z1, opts = {}) {
  const h = opts.h || 1.1;
  const dx = x1 - x0, dz = z1 - z0;
  const len = Math.hypot(dx, dz);
  const ang = Math.atan2(dx, dz);
  const n = Math.max(2, Math.round(len / 1.5) + 1);
  const yFn = opts.yFn;
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    const px = x0 + dx * t, pz = z0 + dz * t;
    const py = yFn ? yFn(px, pz) : 0;
    Mg.frame([px, py, pz], [0, ang, 0]);
    Mg.cyl(opts.postKey || 'woodDark', 0.08, 0.1, h, [0, h / 2, 0], [0, 0, 0], 8);
    Mg.cone('woodDark', 0.09, 0.14, [0, h + 0.05, 0], [0, 0, 0], 8);
    if (i < n - 1) {
      const seg = len / (n - 1);
      [h * 0.72, h * 0.4].forEach((ry) => Mg.box(opts.railKey || 'wood', 0.07, 0.08, seg, [0, ry, seg / 2], [0, 0, 0]));
    }
  }
  Mg.reset();
  return Mg;
}
export function propWell(parent, x, y, z, s = 1) {
  const Mg = new Merge();
  Mg.frame([x, y, z], [0, 0, 0]);
  Mg.lathe('stone', [[0.005, 0], [1.0 * s, 0], [1.05 * s, 0.15 * s], [0.98 * s, 1.0 * s], [0.9 * s, 1.0 * s], [0.86 * s, 0.1 * s], [0.8 * s, 0.05 * s]], [0, 0, 0], [0, 0, 0], 18);
  Mg.cyl('ironDark', 0.06 * s, 0.06 * s, 2.3 * s, [-0.95 * s, 1.15 * s, 0]);
  Mg.cyl('ironDark', 0.06 * s, 0.06 * s, 2.3 * s, [0.95 * s, 1.15 * s, 0]);
  Mg.cyl('woodDark', 0.07 * s, 0.07 * s, 2.0 * s, [0, 2.34 * s, 0], [0, 0, Math.PI / 2]);
  Mg.cyl('woodDark', 0.14 * s, 0.14 * s, 0.1 * s, [0.85 * s, 2.34 * s, 0], [0, 0, Math.PI / 2]);
  const roofPts = [[0.005, 0], [1.35 * s, 0.1 * s], [1.5 * s, 0.75 * s], [0.005, 1.15 * s]];
  Mg.lathe('wood', roofPts, [0, 2.4 * s, 0], [0, 0, 0], 4);
  Mg.box('ironDark', 0.03 * s, 0.5 * s, 0.03 * s, [0, 2.1 * s, 0]);
  const mesh = Mg.build(M);
  parent.add(mesh);
  const Mw = new Merge();
  Mw.frame([x, y + 0.42 * s, z], [0, 0.4, 0]);
  Mw.cyl('woodDark', 0.2 * s, 0.16 * s, 0.34 * s, [0, 0, 0]);
  Mw.tor('ironDark', 0.22 * s, 0.02 * s, [0, 0.16 * s, 0], [Math.PI / 2, 0, 0]);
  const bucket = Mw.build(M);
  parent.add(bucket);
  const ropeCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(x, y + 3.05 * s, z),
    new THREE.Vector3(x + 0.06 * s, y + 2.5 * s, z + 0.02 * s),
    new THREE.Vector3(x + 0.18 * s, y + 1.9 * s, z + 0.04 * s),
    new THREE.Vector3(x + 0.2 * s, y + 0.7 * s, z)
  ]);
  const rope = new THREE.Mesh(new THREE.TubeGeometry(ropeCurve, 14, 0.018 * s, 5, false), M.woodDark);
  parent.add(rope);
  return mesh;
}
export function propTorch(parent, x, y, z, rotY = 0, opts = {}) {
  const g = new THREE.Group();
  g.position.set(x, y, z);
  g.rotation.y = rotY;
  parent.add(g);
  const Mg = new Merge();
  Mg.box('ironDark', 0.08, 0.5, 0.8, [0, 0, 0.4]);
  Mg.cyl('ironDark', 0.05, 0.05, 0.5, [0, 0.16, 0.78], [Math.PI / 2.4, 0, 0]);
  Mg.cyl('woodDark', 0.07, 0.05, 0.4, [0, 0.34, 0.92], [Math.PI / 5, 0, 0]);
  const m = Mg.build(M);
  g.add(m);
  const flame = makeFlame(g, 0, 0.44, 0.98, opts.s || 1);
  let light = null;
  if (opts.light !== false) {
    light = new THREE.PointLight(opts.color || '#ffb060', 0, 13, 1.8);
    light.position.set(0, 0.5, 1.0);
    g.add(light);
    reg.lampLights.push({ light, max: opts.power || 1.9 });
  }
  return { group: g, flame, light };
}
export function propLantern(Mg, x, y, z, s = 1, key = 'paper') {
  Mg.frame([x, y, z], [0, 0, 0]);
  Mg.cyl('ironDark', 0.02 * s, 0.02 * s, 0.3 * s, [0, 0.45 * s, 0]);
  Mg.box('ironDark', 0.04 * s, 0.04 * s, 0.5 * s, [0, 0.62 * s, 0]);
  Mg.box('ironDark', 0.24 * s, 0.05 * s, 0.24 * s, [0, 0.32 * s, 0]);
  Mg.box(key, 0.2 * s, 0.3 * s, 0.2 * s, [0, 0.17 * s, 0]);
  Mg.cyl('ironDark', 0.12 * s, 0.14 * s, 0.06 * s, [0, 0.34 * s, 0]);
  Mg.reset();
  return Mg;
}
export function makeLampPost(parent, x, z, opts = {}) {
  const y = opts.y || 0;
  const s = opts.s || 1;
  const Mg = new Merge();
  Mg.frame([x, y, z], [0, opts.ry || 0, 0]);
  Mg.lathe('ironDark', [[0.06 * s, 0], [0.16 * s, 0.02 * s], [0.19 * s, 0.4 * s], [0.06 * s, 0.5 * s]], [0, 0, 0], [0, 0, 0], 10);
  Mg.cyl('ironDark', 0.05 * s, 0.06 * s, 3.0 * s, [0, 1.7 * s, 0], [0, 0, 0], 8);
  Mg.tor('ironDark', 0.16 * s, 0.02 * s, [0, 3.2 * s, 0], [Math.PI / 2, 0, 0]);
  const g = new THREE.Group();
  g.position.set(x, y, z);
  parent.add(g);
  const mesh = Mg.build(M);
  g.add(mesh);
  const lamp = new THREE.Group();
  lamp.position.set(0, 3.3 * s, 0);
  g.add(lamp);
  const Mg2 = new Merge();
  Mg2.cyl('ironDark', 0.03 * s, 0.03 * s, 0.5 * s, [0, 0.25 * s, 0]);
  Mg2.cone('ironDark', 0.26 * s, 0.22 * s, [0, 0.6 * s, 0], [0, 0, 0], 8);
  const holderMesh = Mg2.build(M);
  lamp.add(holderMesh);
  const glassMat = new THREE.MeshStandardMaterial({ color: '#fff1d4', emissive: '#ffcf8a', emissiveIntensity: 0, roughness: 0.4, transparent: true, opacity: 0.9 });
  const glass = new THREE.Mesh(gRBox(0.24 * s, 0.38 * s, 0.24 * s, 0.04), glassMat);
  glass.position.y = 0.19 * s;
  lamp.add(glass);
  const light = new THREE.PointLight('#ffc178', 0, 16, 1.7);
  light.position.set(0, 0.2 * s, 0);
  lamp.add(light);
  reg.lampLights.push({ light, max: opts.power || 1.5 });
  reg.lampMats.push(glassMat);
  tick((dt, t) => {
    const f = 0.85 + Math.sin(t * 3.1 + x) * 0.07 + Math.sin(t * 8.3 + z) * 0.05;
    glassMat.emissiveIntensity = 0.15 + f * 1.5 * clamp(1 - envNight(), 0, 1);
  });
  return { group: g, light };
}
function envNight() {
  return regNightRef.n;
}
const regNightRef = { n: 0 };
export function setNightRef(n) {
  regNightRef.n = n;
}
export function propRug(parent, x, y, z, w, d, ry = 0, tex = null) {
  const mat = new THREE.MeshStandardMaterial({ map: tex || texRug(1), roughness: 1 });
  const m = new THREE.Mesh(gPlane(w, d), mat);
  m.rotation.set(-Math.PI / 2, 0, ry);
  m.position.set(x, y, z);
  m.receiveShadow = true;
  parent.add(m);
  return m;
}
export class WaveCloth {
  constructor(parent, geo, mat, opts = {}) {
    this.geo = geo;
    this.mesh = new THREE.Mesh(geo, mat);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    if (opts.pos) this.mesh.position.set(opts.pos[0], opts.pos[1], opts.pos[2]);
    if (opts.rot) this.mesh.rotation.set(opts.rot[0], opts.rot[1], opts.rot[2]);
    this.amp = opts.amp ?? 0.18;
    this.freq = opts.freq ?? 2.2;
    this.speed = opts.speed ?? 2.4;
    this.dir = opts.dir || 'z';
    this.ph = R(0, TAU);
    this.base = geo.attributes.position.array.slice();
    parent.add(this.mesh);
    tick((dt, t) => this.update(t));
  }
  update(t) {
    const p = this.geo.attributes.position;
    const b = this.base;
    for (let i = 0; i < p.count; i++) {
      const x = b[i * 3], y = b[i * 3 + 1], z = b[i * 3 + 2];
      const along = this.dir === 'z' ? y : x;
      const w = this.dir === 'z' ? x : y;
      const k = (along + 1) / 2;
      const off = Math.sin(along * this.freq + t * this.speed + this.ph) * this.amp * k;
      if (this.dir === 'z') p.setXYZ(i, x + off, y, z + off * 0.5);
      else p.setXYZ(i, x, y, z + off);
    }
    p.needsUpdate = true;
    this.geo.computeVertexNormals();
  }
}
export function propFlag(parent, x, y, z, h = 2.4, size = 1, tex = null, color = PAL.clothBlue, ry = 0) {
  const g = new THREE.Group();
  g.position.set(x, y, z);
  g.rotation.y = ry;
  parent.add(g);
  const Mg = new Merge();
  Mg.cyl('woodDark', 0.05, 0.07, h, [0, h / 2, 0]);
  Mg.sph('gold', 0.09, [0, h + 0.06, 0], 10);
  g.add(Mg.build(M));
  const mat = new THREE.MeshStandardMaterial({
    map: tex || texHerald(color, '#f7ecd2', 'star'),
    roughness: 0.9,
    side: THREE.DoubleSide
  });
  const geo = gPlane(1.0 * size, 0.66 * size, 10, 6);
  geo.translate(0.5 * size + 0.05, h - 0.45 * size, 0);
  const cloth = new WaveCloth(g, geo, mat, { amp: 0.13 * size, freq: 3.2, speed: 3.4, dir: 'z' });
  return { group: g, cloth };
}
export function propBanner(parent, x, y, z, w = 0.9, h = 2.1, tex = null, ry = 0, opts = {}) {
  const mat = new THREE.MeshStandardMaterial({ map: tex || texHerald(PAL.clothRose, '#f7ecd2', 'rose'), roughness: 0.92, side: THREE.DoubleSide });
  const geo = gPlane(w, h, 8, 12);
  geo.translate(0, -h / 2, 0);
  const cloth = new WaveCloth(parent, geo, mat, { pos: [x, y, z], rot: [0, ry, 0], amp: 0.1, freq: 1.6, speed: 2.0, dir: 'y' });
  const rod = new THREE.Mesh(gCyl(0.035, 0.035, w + 0.16, 8), M.ironDark);
  rod.rotation.set(0, ry, Math.PI / 2);
  rod.position.set(x, y, z);
  parent.add(rod);
  return cloth;
}
export function propAnvil(Mg, x, y, z, ry = 0) {
  Mg.frame([x, y, z], [0, ry, 0]);
  Mg.cyl('woodDark', 0.3, 0.34, 0.4, [0, 0.2, 0], [0, 0, 0], 10);
  Mg.rbox('ironDark', 1.0, 0.28, 0.36, [0, 0.54, 0], [0, 0, 0], 0.05);
  Mg.cyl('ironDark', 0.12, 0.16, 0.3, [0, 0.68, 0], [0, 0, 0], 8);
  Mg.cone('ironDark', 0.1, 0.4, [0.6, 0.56, 0], [0, 0, -Math.PI / 2], 8);
  Mg.reset();
  return Mg;
}
export function propForge(parent, x, y, z, ry = 0) {
  const g = new THREE.Group();
  g.position.set(x, y, z);
  g.rotation.y = ry;
  parent.add(g);
  const Mg = new Merge();
  Mg.rbox('stoneWarm', 1.4, 0.9, 1.2, [0, 0.45, 0], [0, 0, 0], 0.06);
  Mg.rbox('stoneWarm', 0.9, 1.5, 0.5, [0, 1.1, -0.35], [0, 0, 0], 0.06);
  Mg.cyl('ironDark', 0.22, 0.22, 0.3, [0, 1.92, -0.35], [Math.PI / 2, 0, 0], 10);
  Mg.lathe('ironDark', [[0.005, 0], [0.3, 0.02], [0.26, 0.2], [0.12, 0.3]], [0, 2.06, -0.35], [0, 0, 0], 10);
  Mg.box('ironDark', 0.5, 0.06, 0.5, [0, 2.32, -0.35]);
  g.add(Mg.build(M));
  const glow = new THREE.Mesh(gRBox(0.5, 0.35, 0.12, 0.03), new THREE.MeshBasicMaterial({ color: '#ffab55', transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending }));
  glow.position.set(0, 1.05, -0.1);
  g.add(glow);
  const light = new THREE.PointLight('#ff9c46', 0, 11, 1.8);
  light.position.set(0, 1.3, 0.2);
  g.add(light);
  tick((dt, t) => {
    const f = 0.8 + Math.sin(t * 7.3) * 0.1 + Math.sin(t * 17.1) * 0.06;
    glow.material.opacity = 0.5 + f * 0.4;
    light.intensity = (0.6 + f * 1.1) * (0.45 + 0.55 * clamp(1 - regNightRef.n, 0, 1) + regNightRef.n * 0.8);
  });
  const coalMat = new THREE.MeshBasicMaterial({ color: '#ff8b3d' });
  return g;
}
export function makeSmoke(parent, x, y, z, opts = {}) {
  const N = opts.count || 40;
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(N * 3);
  const life = new Float32Array(N);
  const spd = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    pos[i * 3] = x + R(-0.3, 0.3);
    pos[i * 3 + 1] = y + R(0, 3);
    pos[i * 3 + 2] = z + R(-0.3, 0.3);
    life[i] = R(0, 1);
    spd[i] = R(0.5, 1.3);
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const mat = new THREE.PointsMaterial({
    size: opts.size || 1.4,
    map: texSoft(opts.color || '#efe8dc'),
    color: '#ffffff',
    transparent: true,
    opacity: 0.3,
    depthWrite: false,
    sizeAttenuation: true
  });
  const pts = new THREE.Points(geo, mat);
  parent.add(pts);
  tick((dt, t) => {
    const p = geo.attributes.position.array;
    for (let i = 0; i < N; i++) {
      life[i] += dt * 0.13 * spd[i];
      if (life[i] > 1) {
        life[i] = 0;
        p[i * 3] = x + R(-0.3, 0.3);
        p[i * 3 + 1] = y;
        p[i * 3 + 2] = z + R(-0.3, 0.3);
      }
      p[i * 3 + 1] += dt * 0.9 * spd[i];
      p[i * 3] += Math.sin(t * 0.7 + i) * dt * 0.35;
    }
    geo.attributes.position.needsUpdate = true;
    mat.opacity = 0.22 + (opts.opacity || 0) ;
  });
  return pts;
}
export function propCart(parent, x, y, z, ry = 0, s = 1) {
  const g = new THREE.Group();
  g.position.set(x, y, z);
  g.rotation.y = ry;
  parent.add(g);
  const Mg = new Merge();
  Mg.frame([0, 0, 0], [0, 0, 0]);
  Mg.box('wood', 1.1 * s, 0.14 * s, 2.2 * s, [0, 0.72 * s, 0]);
  Mg.box('woodDark', 0.08 * s, 0.4 * s, 2.2 * s, [-0.55 * s, 0.94 * s, 0]);
  Mg.box('woodDark', 0.08 * s, 0.4 * s, 2.2 * s, [0.55 * s, 0.94 * s, 0]);
  Mg.box('woodDark', 1.1 * s, 0.4 * s, 0.08 * s, [0, 0.94 * s, -1.1 * s]);
  Mg.cyl('woodDark', 0.09 * s, 0.09 * s, 0.9 * s, [0, 0.55, 1.5 * s], [0, 0, Math.PI / 2]);
  Mg.cyl('woodDark', 0.09 * s, 0.09 * s, 0.9 * s, [0, 0.55, 0.4 * s], [0, 0, Math.PI / 2]);
  Mg.box('wood', 0.14 * s, 1.2 * s, 0.14 * s, [-0.4 * s, 0.2 * s, 2.0 * s], [-0.5, 0, 0]);
  Mg.box('wood', 0.14 * s, 1.2 * s, 0.14 * s, [0.4 * s, 0.2 * s, 2.0 * s], [-0.5, 0, 0]);
  Mg.box('wood', 1.1 * s, 0.1 * s, 0.1 * s, [0, 0.5 * s, 2.4 * s]);
  g.add(Mg.build(M));
  [[-0.6, 0.6], [0.6, 0.6], [-0.6, -0.6], [0.6, -0.6]].forEach(([sx, sz]) => {
    const wheel = new THREE.Mesh(gTor(0.42 * s, 0.07 * s, 14, 6), M.woodDark);
    wheel.rotation.y = Math.PI / 2;
    wheel.position.set(sx * s, 0.42 * s, sz * 0.9 * s);
    wheel.castShadow = true;
    g.add(wheel);
    const spoke = new Merge();
    spoke.cyl('woodDark', 0.028 * s, 0.028 * s, 0.8 * s, [0, 0, 0], [0, 0, Math.PI / 2], 6);
    spoke.cyl('woodDark', 0.028 * s, 0.028 * s, 0.8 * s, [0, 0, 0], [Math.PI / 2, 0, 0], 6);
    spoke.cyl('woodDark', 0.03 * s, 0.03 * s, 0.14 * s, [0, 0, 0], [0, 0, Math.PI / 2], 8);
    const sm = spoke.build(M);
    sm.rotation.y = Math.PI / 2;
    sm.position.copy(wheel.position);
    g.add(sm);
  });
  return g;
}
export function propLadder(Mg, x, y, z, h = 3, ry = 0, lean = 0.16) {
  Mg.frame([x, y, z], [0, ry, lean]);
  Mg.box('woodDark', 0.08, h, 0.08, [-0.22, h / 2, 0]);
  Mg.box('woodDark', 0.08, h, 0.08, [0.22, h / 2, 0]);
  const n = Math.max(3, Math.round(h / 0.42));
  for (let i = 1; i <= n; i++) Mg.box('wood', 0.5, 0.05, 0.06, [0, (h / (n + 1)) * i, 0]);
  Mg.reset();
  return Mg;
}
export function propScarecrow(parent, x, y, z, ry = 0, s = 1) {
  const g = new THREE.Group();
  g.position.set(x, y, z);
  g.rotation.y = ry;
  parent.add(g);
  const Mg = new Merge();
  Mg.cyl('woodDark', 0.07 * s, 0.08 * s, 2.0 * s, [0, 1.0 * s, 0]);
  Mg.cyl('woodDark', 0.05 * s, 0.05 * s, 1.3 * s, [0, 1.5 * s, 0], [0, 0, Math.PI / 2]);
  Mg.box('thatch', 0.3 * s, 0.5 * s, 0.24 * s, [-0.2 * s, 1.5 * s, 0], [0, 0, 0.3]);
  Mg.box('thatch', 0.3 * s, 0.5 * s, 0.24 * s, [0.2 * s, 1.5 * s, 0], [0, 0, -0.3]);
  Mg.rbox('clothBlue', 0.44 * s, 0.72 * s, 0.3 * s, [0, 1.3 * s, 0], [0, 0, 0], 0.08);
  Mg.sph('thatch', 0.16 * s, [0, 1.86 * s, 0], 10);
  Mg.cone('thatch', 0.26 * s, 0.24 * s, [0, 2.02 * s, 0], [0, 0, 0], 10);
  g.add(Mg.build(M));
  return g;
}
export function propStall(parent, x, y, z, ry = 0, opts = {}) {
  const g = new THREE.Group();
  g.position.set(x, y, z);
  g.rotation.y = ry;
  parent.add(g);
  const Mg = new Merge();
  const w = opts.w || 2.0, d = opts.d || 1.3;
  [[-w / 2 + 0.1, -d / 2 + 0.1], [w / 2 - 0.1, -d / 2 + 0.1], [-w / 2 + 0.1, d / 2 - 0.1], [w / 2 - 0.1, d / 2 - 0.1]].forEach(([px, pz]) => Mg.box('woodDark', 0.11, 2.4, 0.11, [px, 1.2, pz]));
  Mg.box('woodPale', w, 0.1, d, [0, 1.05, 0]);
  Mg.box('woodDark', w, 0.09, d, [0, 0.6, 0]);
  g.add(Mg.build(M));
  const clothKey = opts.cloth || 'clothRose';
  const awningMat = M.cloth[clothKey].clone();
  awningMat.side = THREE.DoubleSide;
  const aw = new THREE.Mesh(gPlane(w + 0.6, d + 1.1, 10, 6), awningMat);
  aw.rotation.set(-Math.PI / 2 + 0.34, 0, 0);
  aw.position.set(0, 2.42, 0.1);
  aw.castShadow = true;
  g.add(aw);
  const fringe = new THREE.Mesh(gPlane(w + 0.6, 0.3, 10, 1), awningMat);
  fringe.position.set(0, 2.2, 0.72);
  fringe.rotation.x = -0.5;
  g.add(fringe);
  const goods = new Merge();
  const types = opts.goods || 'fruit';
  if (types === 'fruit') {
    for (let i = 0; i < 22; i++) {
      const px = R(-w / 2 + 0.2, w / 2 - 0.2), pz = R(-d / 2 + 0.15, d / 2 - 0.15);
      goods.sph(pick(['book1', 'gold', 'clothRose']), R(0.07, 0.11), [px, 1.16 + R(0, 0.06), pz], 8);
    }
    goods.box('woodDark', w * 0.5, 0.16, d * 0.6, [-w * 0.2, 1.2, 0]);
  } else if (types === 'pot') {
    for (let i = 0; i < 8; i++) {
      goods.lathe(pick(['clay', 'stone', 'dirt']), [[0.005, 0], [0.16, 0.01], [0.2, 0.2], [0.12, 0.3]], [R(-w / 2 + 0.25, w / 2 - 0.25), 1.1, R(-d / 2 + 0.2, d / 2 - 0.2)], [0, 0, 0], 10);
    }
  } else {
    for (let i = 0; i < 6; i++) goods.box(pick(['book2', 'book3', 'book1']), R(0.2, 0.3), R(0.14, 0.22), R(0.18, 0.3), [R(-w / 2 + 0.3, w / 2 - 0.3), 1.16, R(-d / 2 + 0.2, d / 2 - 0.2)]);
  }
  const gm = goods.build(M);
  if (gm) g.add(gm);
  return g;
}
export function propBooks(Mg, x, y, z, size = 0.3) {
  Mg.box(pick(['book1', 'book2', 'book3', 'book4', 'book5']), size, size * 0.24, size * 0.78, [x, y, z], [0, R(0, TAU), 0]);
  return Mg;
}
export function propSignPost(Mg, x, y, z, ry = 0) {
  Mg.frame([x, y, z], [0, ry, 0]);
  Mg.cyl('woodDark', 0.07, 0.08, 2.2, [0, 1.1, 0]);
  Mg.box('woodPale', 0.9, 0.28, 0.06, [0.3, 1.9, 0], [0, 0, 0]);
  Mg.box('woodPale', 0.8, 0.26, 0.06, [0.25, 1.5, 0], [0, 0, 0]);
  Mg.reset();
  return Mg;
}
