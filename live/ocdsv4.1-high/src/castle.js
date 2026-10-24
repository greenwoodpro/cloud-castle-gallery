import * as THREE from 'three';
import {
  M, Merge, R, RI, pick, TAU, reg, tick, holder, gBox, gRBox, gCyl, gCone, gSph, gTor, gLathe, gPlane,
  shadowed, label, clamp, lerp, smoothstep, jitterGeo, wallInto, wallRects, slabWithHole, hipRoofParts,
  texRug, texHerald, texSoft, texQuilt, PAL, mergeTo, env
} from './core.js';
import {
  propBarrel, propCrate, propSack, propHay, propTable, propStool, propChair, propBench, propChest,
  propShelf, propPot, propJar, propCandle, makeFlame, propCandelabra, propBed, propWardrobe, propWashstand,
  propFence, propWell, propTorch, propLantern, makeLampPost, propRug, WaveCloth, propFlag, propBanner,
  propAnvil, propForge, makeSmoke, propCart, propLadder, propStall, propSignPost, propBooks, glowMat
} from './props.js';
import { makeFigure, makeBeast, Actor, BeastActor, makeRose, addFigure } from './characters.js';
import { PLAT, MESA_R, SKIRT_R } from './terrain.js';
import { rockShell, makeWaterfall } from './island.js';

const H = 20;
const FW = 11.4;
const FD = 10.4;
const T = 0.62;

function wallPanelInto(Mg, W, Ht, Tt, opens, pos, rot) {
  const rects = wallRects(W, Ht, opens);
  Mg.frame(pos, rot);
  rects.forEach((r) => Mg.box('stoneWarm', r.w, r.h, Tt, [r.x, r.y, 0]));
  Mg.reset();
  return Mg;
}
function merlonsAlong(Mg, a, b, y, key = 'stone') {
  const dx = b[0] - a[0], dz = b[1] - a[1];
  const len = Math.hypot(dx, dz);
  const ang = Math.atan2(dx, dz);
  const n = Math.max(2, Math.round(len / 1.5));
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    Mg.frame([a[0] + dx * t, y, a[1] + dz * t], [0, ang, 0]);
    Mg.box(key, 0.72, 1.0, 1.25, [0, 0.5, 0]);
    Mg.reset();
  }
  return Mg;
}
function merlonsRing(Mg, cx, cz, r, y, n, key = 'stone', w = 0.6, h = 0.9) {
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU;
    Mg.frame([cx + Math.cos(a) * r, y, cz + Math.sin(a) * r], [0, -a, 0]);
    Mg.box(key, w, h, 0.7, [0, h / 2, 0]);
    Mg.reset();
  }
  return Mg;
}

function mesa(G) {
  const rings = [
    { r: 15.3, y: PLAT + 0.3, jag: 0.02, bump: 0.2 },
    { r: 15.6, y: PLAT - 0.6, jag: 0.03, bump: 0.35 },
    { r: 16.6, y: PLAT - 1.6, jag: 0.04, bump: 0.45 },
    { r: 18.0, y: PLAT - 2.7, jag: 0.045, bump: 0.5 },
    { r: 19.8, y: PLAT - 3.9, jag: 0.05, bump: 0.55 },
    { r: 21.6, y: PLAT - 5.2, jag: 0.05, bump: 0.5 },
    { r: 23.2, y: -2.4, jag: 0.04, bump: 0.4 },
    { r: 24.4, y: -4.4, jag: 0.03, bump: 0.3 }
  ];
  const rock = new THREE.Mesh(rockShell(rings, 72), M.rock);
  rock.castShadow = true;
  rock.receiveShadow = true;
  G.add(rock);
  const top = new THREE.Mesh(new THREE.CircleGeometry(12.4, 64), M.cobble);
  top.rotation.x = -Math.PI / 2;
  top.position.y = PLAT + 0.03;
  top.receiveShadow = true;
  const p = top.geometry.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i);
    p.setZ(i, Math.sin(x * 0.62) * 0.013 + Math.cos(y * 0.55) * 0.01);
  }
  top.geometry.computeVertexNormals();
  G.add(top);
  const ledge = new THREE.Mesh(new THREE.RingGeometry(12.3, 15.4, 72, 3), M.dirt);
  ledge.rotation.x = -Math.PI / 2;
  ledge.position.y = PLAT + 0.02;
  ledge.receiveShadow = true;
  G.add(ledge);
  const Mg = new Merge();
  Mg.lathe('stone', [[14.55, 0], [14.55, 0.95], [15.25, 0.95], [15.35, 0.72], [15.35, 0]], [0, PLAT, 0], [0, 0, 0], 64);
  for (let i = 0; i < 40; i++) {
    const a = (i / 40) * TAU;
    Mg.box('stoneWarm', 0.5, 0.34, 0.28, [Math.cos(a) * 14.9, PLAT + 1.02, Math.sin(a) * 14.9], [0, -a, 0]);
  }
  Mg.add('dirt', new THREE.CircleGeometry(15.1, 48), [0, PLAT + 0.06, 0], [-Math.PI / 2, 0, 0], [0.98, 0.98, 1]);
  const m = Mg.build(M, { receive: true });
  G.add(m);
  const g = new THREE.Group();
  G.add(g);
  const ga = Math.PI / 4;
  const stepN = 22;
  const start = 15.9, end = SKIRT_R + 1.4;
  const Sm = new Merge();
  for (let i = 0; i < stepN; i++) {
    const t = i / (stepN - 1);
    const r = lerp(start, end, t);
    const y = lerp(PLAT - 0.15, -0.3, Math.pow(t, 1.15));
    Sm.frame([Math.cos(ga) * r, y, Math.sin(ga) * r], [0, -ga, 0]);
    Sm.box('stone', 4.2, 0.34, (end - start) / stepN + 0.5, [0, 0, 0]);
    Sm.reset();
  }
  Sm.frame([Math.cos(ga) * (start + 0.4), PLAT, Math.sin(ga) * (start + 0.4)], [0, -ga, 0]);
  Sm.box('stone', 4.6, 0.4, 1.4, [0, -0.1, 0]);
  Sm.reset();
  const sw = Sm.build(M);
  g.add(sw);
  const wallM = new Merge();
  for (let sd = -1; sd <= 1; sd += 2) {
    for (let i = 0; i < 6; i++) {
      const t = i / 5;
      const r = lerp(start - 0.4, end - 1.0, t);
      const y = lerp(PLAT - 0.2, -0.1, Math.pow(t, 1.15));
      const px = Math.cos(ga) * r + Math.cos(ga + Math.PI / 2) * 2.5 * sd;
      const pz = Math.sin(ga) * r + Math.sin(ga + Math.PI / 2) * 2.5 * sd;
      wallM.frame([px, y + 0.45, pz], [0, -ga, 0]);
      wallM.box('stoneWarm', 0.45, 0.9, (end - start) / 5 + 0.4, [0, 0, 0]);
      wallM.reset();
      if (i === 5) {
        wallM.frame([px, y + 1.1, pz], [0, -ga, 0]);
        wallM.box('stoneWarm', 0.7, 0.7, 0.7, [0, 0, 0]);
        wallM.reset();
      }
    }
  }
  const wm = wallM.build(M);
  g.add(wm);
  const bx = Math.cos(ga) * (end + 0.8), bz = Math.sin(ga) * (end + 0.8);
  makeLampPost(g, bx + Math.cos(ga + Math.PI / 2) * 2.6, bz + Math.sin(ga + Math.PI / 2) * 2.6, { y: -0.3, s: 0.9 });
  makeLampPost(g, bx - Math.cos(ga + Math.PI / 2) * 2.6, bz - Math.sin(ga + Math.PI / 2) * 2.6, { y: -0.3, s: 0.9 });
  const st = new Merge();
  const s1x = Math.cos(ga) * (end + 2.2), s1z = Math.sin(ga) * (end + 2.2);
  propFlag(g, s1x + 2.4, -0.3, s1z - 1.0, 4.2, 1.25, texHerald(PAL.clothBlue, '#f7ecd2', 'tower'), PAL.clothBlue, -ga);
  propFlag(g, s1x - 2.4, -0.3, s1z + 1.0, 4.2, 1.25, texHerald(PAL.roofRose, '#f7ecd2', 'rose'), PAL.roofRose, -ga);
  label('城堡台地', new THREE.Vector3(0, PLAT + 2, 15), '岩台上砌着石墙与坡道；阶梯尽头是吊起的木闸门。', 'place');
  return { stepTop: [Math.cos(ga) * (end + 1.2), -0.2, Math.sin(ga) * (end + 1.2)] };
}

function curtain(G) {
  const g = new THREE.Group();
  G.add(g);
  const verts = [];
  const n = 8;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU + Math.PI / 4 + Math.PI / 8;
    const r = 12 + Math.sin(a * 2.3) * 0.5;
    verts.push([Math.cos(a) * r, Math.sin(a) * r, a]);
  }
  const wallH = 4.3;
  const gateEdge = 0;
  const Mg = new Merge();
  for (let i = 0; i < n; i++) {
    const a0 = verts[i], a1 = verts[(i + 1) % n];
    if (i === gateEdge) continue;
    const cx = (a0[0] + a1[0]) / 2, cz = (a0[1] + a1[1]) / 2;
    const len = Math.hypot(a1[0] - a0[0], a1[1] - a0[1]);
    const ang = Math.atan2(a1[0] - a0[0], a1[1] - a0[1]);
    Mg.frame([cx, PLAT, cz], [0, ang, 0]);
    Mg.box('stone', 1.0, wallH, len + 0.2, [0, wallH / 2, 0]);
    Mg.box('stoneWarm', 1.35, 0.35, len + 0.2, [0, wallH + 0.1, 0]);
    Mg.reset();
    for (let k = 0; k < 2; k++) {
      const s = k ? 1 : -1;
      merlonsAlong(Mg,
        [cx + Math.cos(ang) * s * 0.5 - Math.sin(ang) * (len / 2), 0, cz + Math.sin(ang) * s * 0.5 - Math.cos(ang) * (len / 2)],
        [cx + Math.cos(ang) * s * 0.5 + Math.sin(ang) * (len / 2), 0, cz + Math.sin(ang) * s * 0.5 + Math.cos(ang) * (len / 2)],
        PLAT + wallH + 0.22);
    }
    const mid = [(a0[0] + a1[0]) / 2, (a0[1] + a1[1]) / 2];
    for (let k = -1; k <= 1; k += 2) {
      Mg.frame([mid[0] - Math.sin(ang) * k * 3.2, PLAT + 1.3, mid[1] - Math.cos(ang) * k * 3.2], [0, ang, 0]);
      Mg.box('stoneWarm', 0.9, 1.3, 0.75, [0, 0, 0]);
      Mg.reset();
    }
    for (let k = -1; k <= 1; k += 2) {
      const sx = mid[0] - Math.sin(ang) * k * 3.2 + Math.cos(ang + Math.PI / 2) * 0.6;
      const sz = mid[1] - Math.cos(ang) * k * 3.2 + Math.sin(ang + Math.PI / 2) * 0.6;
      reg.interior.push(propBanner(g, sx, PLAT + 3.4, sz, 0.8, 1.8, texHerald(pick([PAL.clothBlue, PAL.clothRose, PAL.clothGreen]), '#f6ead2', pick(['star', 'tower', 'cross'])), ang + Math.PI / 2));
    }
  }
  const m = Mg.build(M);
  g.add(m);
  for (let i = 0; i < n; i++) {
    const v = verts[i];
    const tw = new THREE.Group();
    tw.position.set(v[0], PLAT, v[1]);
    g.add(tw);
    const Tm = new Merge();
    Tm.lathe('stoneWarm', [[0.005, 0], [2.5, 0.02], [2.65, 0.5], [2.4, 0.6], [2.32, 5.4], [2.45, 5.55], [2.45, 6.1], [2.2, 6.2], [2.2, 6.2]], [0, 0, 0], [0, 0, 0], 18);
    for (let f = 0; f < 3; f++) {
      const fy = 1.3 + f * 1.6;
      for (let k = 0; k < 4; k++) {
        const a = (k / 4) * TAU + 0.4;
        Tm.box('stoneWarm', 0.7, (f === 0 ? 1.1 : 0.85), 0.3, [Math.cos(a) * 2.4, fy, Math.sin(a) * 2.4], [0, -a, 0]);
        Tm.box('ink', 0.34, (f === 0 ? 0.8 : 0.6), 0.2, [Math.cos(a) * 2.5, fy, Math.sin(a) * 2.5], [0, -a, 0]);
      }
    }
    Tm.box('woodDark', 0.9, 1.7, 0.25, [Math.cos(v[2] + Math.PI / 2) * 2.5, 0.9, Math.sin(v[2] + Math.PI / 2) * 2.5], [0, -(v[2] + Math.PI / 2), 0]);
    tw.add(Tm.build(M));
    const Rm = new Merge();
    const rh = 3.2 + (i % 3) * 0.3;
    Rm.cone('slate', 2.72, rh, [0, 6.25 + rh / 2, 0], [0, i * 0.6, 0], 18);
    Rm.tor('slate', 2.25, 0.14, [0, 6.3, 0], [Math.PI / 2, 0, 0]);
    Rm.sph('gold', 0.16, [0, 7.9 + rh / 2, 0], 10);
    tw.add(Rm.build(M));
    propFlag(tw, 0, 8.0 + rh / 2, 0, 2.6, 1.0, texHerald(pick([PAL.clothBlue, PAL.clothRose, PAL.roofGreen, PAL.clothPlum]), '#f6ead2', pick(['star', 'moon', 'rose', 'tower'])), PAL.clothBlue);
  }
  const gate = new THREE.Group();
  g.add(gate);
  const ga = verts[0][2];
  const gx = Math.cos(ga) * 12, gz = Math.sin(ga) * 12;
  gate.position.set(gx, PLAT, gz);
  gate.rotation.y = -ga + Math.PI / 2;
  const Gm = new Merge();
  Gm.box('stone', 7.4, 6.4, 2.6, [0, 3.2, 0]);
  Gm.box('stoneWarm', 8.2, 0.5, 3.2, [0, 6.55, 0]);
  [-1, 1].forEach((s) => {
    Gm.lathe('stoneWarm', [[0.005, 0], [3.0, 0.02], [3.2, 0.6], [2.9, 0.8], [2.85, 7.4], [3.0, 7.6], [3.0, 8.2], [2.7, 8.3], [2.7, 8.3]], [s * 3.4, 0, 0], [0, 0, 0], 16);
  });
  for (let s = -1; s <= 1; s += 2) {
    for (let f = 0; f < 5; f++) {
      const a = (f / 5) * TAU;
      Gm.box('ink', 0.3, 0.9, 0.2, [s * 3.4 + Math.cos(a) * 2.9, 2.4 + f * 1.3, Math.sin(a) * 2.9], [0, -a, 0]);
    }
  }
  Gm.frame([0, 4.06, 0], [0, 0, 0]);
  Gm.box('stoneWarm', 9.4, 1.0, 3.0, [0, -0.4, 0]);
  Gm.reset();
  for (let i = -3; i <= 3; i++) {
    Gm.box('stone', 0.9, 3.4, 0.3, [0, 3.4, 1.32]);
    Gm.box('stone', 0.9, 1.1, 0.3, [0, 1.1, 1.32]);
  }
  gate.add(Gm.build(M));
  const Rg = new Merge();
  [-1, 1].forEach((s) => {
    const rh = 3.8;
    Rg.cone('slate', 3.05, rh, [s * 3.4, 8.3 + rh / 2, 0], [0, s * 0.4, 0], 16);
    Rg.tor('slate', 2.5, 0.14, [s * 3.4, 8.35, 0], [Math.PI / 2, 0, 0]);
    Rg.sph('gold', 0.17, [s * 3.4, 10.4 + rh / 2, 0], 10);
  });
  gate.add(Rg.build(M));
  [-1, 1].forEach((s) => propFlag(gate, s * 3.4, 8.9 + 4.0, 0, 3.0, 1.1, texHerald(s < 0 ? PAL.clothBlue : PAL.roofRose, '#f6ead2', s < 0 ? 'tower' : 'rose'), PAL.clothBlue));
  const gmask = new THREE.Group();
  gate.add(gmask);
  const Gk = new Merge();
  Gk.box('woodDark', 5.6, 3.9, 0.24, [0, 1.95, 0.9]);
  for (let i = 0; i < 8; i++) Gk.box('ironDark', 5.6, 0.06, 0.1, [0, 0.4 + i * 0.45, 0.76]);
  Gk.box('ironDark', 1.5, 0.12, 0.12, [0, 1.4, 0.75]);
  Gk.box('gold', 0.3, 0.3, 0.2, [0, 1.95, 0.72]);
  gmask.add(Gk.build(M));
  const wire = new THREE.Group();
  gate.add(wire);
  const c1 = new THREE.Vector3(-3.4, 8.2, 0.2), c2 = new THREE.Vector3(3.4, 8.2, 0.2);
  const curve = new THREE.CatmullRomCurve3([c1, new THREE.Vector3(-1.2, 7.4, 0.2), new THREE.Vector3(1.2, 7.4, 0.2), c2]);
  const rope = new THREE.Mesh(new THREE.TubeGeometry(curve, 10, 0.03, 5, false), M.ironDark);
  wire.add(rope);
  for (let i = 0; i < 5; i++) {
    const p = curve.getPointAt((i + 1) / 6);
    const l = new THREE.Mesh(gSph(0.16, 8), M.emitWarm.clone());
    l.position.copy(p).y -= 0.22;
    wire.add(l);
    reg.lampMats.push(l.material);
    reg.lampLights.push({ light: null, glow: l.material });
  }
  const light = new THREE.PointLight('#ffb060', 0, 14, 1.8);
  light.position.set(0, 6.6, 1.2);
  gate.add(light);
  reg.lampLights.push({ light, max: 1.2 });
  propTorch(gate, -2.4, 3.4, 1.5, 0, { s: 1.1 });
  propTorch(gate, 2.4, 3.4, 1.5, 0, { s: 1.1 });
  label('城门与箭塔', new THREE.Vector3(gx * 1.25, PLAT + 7, gz * 1.25), '四角圆塔守着城墙，铁闸与木门后是内院；塔顶的旗子换了风向就换颜色。', 'place');
  return { group: g, verts, gateEdge };
}

function keep(G) {
  const K = new THREE.Group();
  K.position.set(0, PLAT, -0.5);
  G.add(K);
  const Mg = new Merge();
  Mg.box('stone', FW + 1.0, 0.7, FD + 1.0, [0, 0.3, 0]);
  Mg.box('stoneWarm', FW + 0.7, 0.22, FD + 0.7, [0, 0.68, 0]);
  const winRow = (y, h, w, xs, key = 'windowGlow') => xs.map((x) => ({ x, y: y - H / 2, w, h }));
  const wm = new Merge();
  const opens = [
    ...winRow(3.4, 1.9, 1.3, [-2.6, 2.6]),
    ...winRow(8.6, 1.7, 1.2, [-2.6, 2.6]),
    ...winRow(13.4, 2.8, 1.6, [-3.4, 0, 3.4]),
    ...winRow(18.2, 2.0, 1.4, [-2.6, 2.6])
  ];
  wallPanelInto(wm, FW, H, T, opens, [0, H / 2, -FD / 2 + T / 2]);
  const sideOpen = [
    ...winRow(3.4, 1.9, 1.3, [-2.4, 2.4]),
    ...winRow(8.6, 1.7, 1.2, [-2.4, 2.4]),
    ...winRow(13.4, 2.8, 1.6, [-2.8, 2.8]),
    ...winRow(18.2, 2.0, 1.4, [-2.4, 2.4])
  ];
  wallPanelInto(wm, FD, H, T, sideOpen, [-FW / 2 + T / 2, H / 2, 0], [0, Math.PI / 2, 0]);
  const rightOpen = [
    { x: 0, y: 1.5 - H / 2, w: 2.0, h: 3.0 },
    ...winRow(8.6, 1.7, 1.2, [-2.4, 2.4]),
    ...winRow(13.4, 2.8, 1.6, [-2.8, 2.8]),
    ...winRow(18.2, 2.0, 1.4, [-2.4, 2.4])
  ];
  wallPanelInto(wm, FD, H, T, rightOpen, [FW / 2 - T / 2, H / 2, 0], [0, Math.PI / 2, 0]);
  K.add(wm.build(M, { receive: true }));

  const cut = new THREE.Group();
  K.add(cut);
  const fm = new Merge();
  const frontOpen = [
    { x: 0, y: 1.6 - H / 2, w: 2.2, h: 3.2 },
    ...winRow(8.6, 1.7, 1.2, [-2.6, 2.6]),
    ...winRow(13.4, 2.8, 1.6, [-3.4, 0, 3.4]),
    ...winRow(18.2, 2.0, 1.4, [-2.6, 2.6])
  ];
  wallPanelInto(fm, FW, H, T, frontOpen, [0, H / 2, FD / 2 - T / 2]);
  for (let i = 0; i < 4; i++) {
    fm.box('stoneWarm', 0.3, 0.3, 1.5, [-FW / 2 + 0.4 + i * 3.5, 3.66, FD / 2 - 0.3]);
  }
  fm.box('stoneWarm', 3.0, 4.4, 0.5, [0, H + 0.6, FD / 2 - 0.2]);
  const fmm = fm.build(M, { receive: true });
  cut.add(fmm);
  reg.cutaway.push(cut);

  const floors = new THREE.Group();
  K.add(floors);
  [0, 5, 10, 15].forEach((y, i) => {
    const Fm = new Merge();
    slabWithHole(Fm, i === 0 ? 'marble' : 'wood', FW - 0.9, FD - 0.9, 0.4, y === 0 ? 0.25 : y, { x: -3.5, z: 2.6, s: 2.0 });
    if (y > 0) {
      for (let k = 0; k < 14; k++) {
        const z = -FD / 2 + 0.3 + k * (FD / 14);
        Fm.box('woodDark', FW, 0.08, 0.16, [0, y - 0.02, z]);
      }
    }
    const fmesh = Fm.build(M, { receive: true, cast: true });
    floors.add(fmesh);
  });
  const beams = new Merge();
  [4.8, 9.8, 14.8, 19.8].forEach((y) => {
    for (let i = 0; i < 5; i++) beams.box('woodDark', 0.28, 0.34, FD - 0.4, [-FW / 2 + 1.0 + i * 2.3, y, 0]);
  });
  floors.add(beams.build(M));

  const roofParts = hipRoofParts(FW, FD, 5.4, 0.7);
  const ceil = new Merge();
  slabWithHole(ceil, 'wood', FW - 1.2, FD - 1.2, 0.36, H + 0.22, { x: -3.5, z: 2.6, s: 2.0 });
  const ceilMesh = ceil.build(M, { receive: true });
  K.add(ceilMesh);
  const roofG = new THREE.Group();
  K.add(roofG);
  const roofMeshes = {};
  Object.entries(roofParts).forEach(([k, geo]) => {
    const m = new THREE.Mesh(geo, M.slate);
    m.position.y = H + 0.4;
    m.castShadow = true;
    m.receiveShadow = true;
    roofG.add(m);
    roofMeshes[k] = m;
  });
  roofMeshes.front.position.y = H + 0.4;
  reg.cutaway.push(roofMeshes.front);
  const Rm = new Merge();
  Rm.box('stoneWarm', 1.2, 2.4, 1.2, [-3.4, H + 3.0, -1.6]);
  Rm.box('stoneWarm', 0.9, 1.8, 0.9, [3.6, H + 2.6, 1.4]);
  Rm.box('stoneWarm', 2.6, 3.4, 0.6, [0, H + 5.0, FD / 2 - 1.0]);
  Rm.box('woodDark', 1.1, 1.2, 0.9, [-3.4, H + 4.4, -1.6]);
  Rm.box('woodDark', 1.1, 1.2, 0.9, [3.6, H + 3.7, 1.4]);
  K.add(Rm.build(M));
  makeSmoke(K, -3.4, H + 4.3, -1.6, { count: 26, size: 1.5, opacity: 0.2 });
  makeSmoke(K, 3.6, H + 3.7, 1.4, { count: 20, size: 1.2, opacity: 0.16 });
  [-FW / 2 + 0.1, FW / 2 - 0.1].forEach((x, i) => {
    const bt = new THREE.Group();
    bt.position.set(x, 16.4, FD / 2 - 0.9);
    K.add(bt);
    const Bm = new Merge();
    Bm.cyl('stoneWarm', 1.1, 0.9, 2.6, [0, 0.4, 0], [0, 0, 0], 12);
    Bm.cone('stoneWarm', 1.25, 0.6, [0, -1.0, 0], [Math.PI, 0, 0], 12);
    for (let f = 0; f < 3; f++) {
      const a = (f / 3) * TAU;
      Bm.box('ink', 0.3, 0.9, 0.2, [Math.cos(a) * 0.95, 0.5, Math.sin(a) * 0.95], [0, -a, 0]);
    }
    Bm.box('stoneWarm', 1.2, 0.4, 1.2, [0, 1.8, 0]);
    bt.add(Bm.build(M));
    const Br = new Merge();
    Br.cone('slate', 1.5, 2.0, [0, 2.9, 0], [0, 0.5 + i, 0], 10);
    Br.sph('gold', 0.11, [0, 3.95, 0], 8);
    bt.add(Br.build(M));
  });
  const stairs = new THREE.Group();
  K.add(stairs);
  const Sm = new Merge();
  Sm.cyl('stoneWarm', 0.4, 0.4, H + 0.4, [-3.5, (H + 0.4) / 2, 2.6], [0, 0, 0], 12);
  const steps = 44;
  for (let i = 0; i < steps; i++) {
    const y = 0.4 + (i / steps) * H;
    const a = (i / steps) * TAU * 3.4;
    Sm.frame([-3.5, y, 2.6], [0, a, 0]);
    Sm.box('stoneWarm', 1.02, 0.2, 0.8, [0.92, 0, 0]);
    Sm.reset();
  }
  Sm.tor('woodDark', 1.5, 0.05, [-3.5, H + 0.2, 2.6], [Math.PI / 2, 0, 0], 24);
  K.add(Sm.build(M, { receive: true }));
  const rail = [];
  for (let i = 0; i <= 40; i++) {
    const t = i / 40;
    const y = 0.6 + t * H * 0.98;
    const a = t * TAU * 3.4;
    rail.push(new THREE.Vector3(-3.5 + Math.cos(a) * 1.45, y + 0.9, 2.6 + Math.sin(a) * 1.45));
  }
  const railMesh = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(rail), 120, 0.05, 6, false), M.ironDark);
  railMesh.castShadow = true;
  K.add(railMesh);
  return { K, roofMeshes, cuts: reg.cutaway.length };
}

function greatHall(K, y) {
  const Mh = new Merge();
  propRug(K, 0.6, y + 0.48, 0.6, 8.4, 7.4, 0, texRug(1, '#cd8f99', '#8ea9c9'));
  propTable(Mh, 0.4, y + 0.48, 1.6, 7.0, 1.3, 0.82);
  for (let i = 0; i < 4; i++) {
    propChair(Mh, -2.6 + i * 1.85, y + 0.48, 0.5, Math.PI, 1);
    propChair(Mh, -2.6 + i * 1.85, y + 0.48, 2.75, 0, 1);
  }
  for (let i = 0; i < 7; i++) {
    const x = -2.6 + i * 0.9;
    Mh.lathe('clothCream', [[0.005, 0], [0.22, 0.02], [0.26, 0.05], [0.005, 0.06]], [x, y + 1.2, 1.4 + (i % 2) * 0.5], [0, 0, 0], 12);
    Mh.sph('gold', 0.1, [x, y + 1.3, 1.4 + (i % 2) * 0.5], 8);
    Mh.sph('clothRose', 0.12, [x + 0.1, y + 1.28, 1.5 + (i % 2) * 0.4], 8);
  }
  propCandelabra(Mh, 0.4, y + 1.25, 1.6, 1.1);
  propStool(Mh, -2.2, y + 0.4, 4.0);
  propBarrel(Mh, 4.2, y + 0.4, 3.2, 0.9);
  propBarrel(Mh, 4.9, y + 0.4, 2.2, 0.85);
  propSack(Mh, 4.6, y + 0.4, -3.4, 1.1);
  propCrate(Mh, -4.7, y + 0.4, -2.6, 0.9, 0.4);
  Mh.box('woodPale', 6.6, 0.35, 1.4, [0, y + 1.0, -4.4]);
  for (let i = 0; i < 3; i++) Mh.box('woodDark', 0.3, 2.0, 0.3, [-2.4 + i * 2.4, y + 1.9, -3.4]);
  Mh.box('clothPlum', 7.6, 0.3, 3.8, [0, y + 3.2, -4.4]);
  Mh.box('clothPlum', 7.6, 1.6, 0.2, [0, y + 2.5, -2.6]);
  Mh.cone('clothPlum', 1.5, 1.2, [-3.7, y + 3.6, -2.6], [0, 0, 0], 6);
  Mh.cone('clothPlum', 1.5, 1.2, [3.7, y + 3.6, -2.6], [0, 0, 0], 6);
  Mh.sph('gold', 0.2, [-3.7, y + 4.2, -2.6], 10);
  Mh.sph('gold', 0.2, [3.7, y + 4.2, -2.6], 10);
  const throne = new Merge();
  propChair(throne, 0, y + 0.4, -4.3, 0, 1.9);
  throne.box('gold', 0.9, 0.1, 0.9, [0, y + 1.9, -4.55]);
  for (let i = 0; i < 5; i++) throne.cone('gold', 0.07, 0.24, [-0.36 + i * 0.18, y + 2.1, -4.6], [0, 0, 0], 6);
  Mh.box('stoneWarm', 2.6, 0.4, 1.6, [0, y + 0.2, -4.2]);
  propBench(Mh, -1.6, y + 0.4, -3.0, 0.4, 1.4);
  propBench(Mh, 1.6, y + 0.4, -3.0, -0.4, 1.4);
  Mh.box('stoneWarm', 0.75, 2.6, 3.8, [-4.85, y + 1.3, 0.6]);
  Mh.box('ink', 0.22, 1.9, 2.6, [-4.6, y + 1.2, 0.6]);
  Mh.box('stoneWarm', 0.8, 0.18, 3.2, [-4.6, y + 0.3, 0.6]);
  Mh.box('woodDark', 0.7, 0.28, 3.4, [-4.6, y + 2.66, 0.6]);
  Mh.box('stoneWarm', 0.7, 2.8, 0.6, [-4.85, y + 1.4, -2.0]);
  Mh.box('stoneWarm', 0.7, 2.8, 0.6, [-4.85, y + 1.4, 3.2]);
  for (let i = 0; i < 4; i++) {
    Mh.cyl('woodDark', 0.1, 0.11, 0.6, [-4.7, y + 0.4 + i * 0.02, 1.6 - i * 0.22], [Math.PI / 2, 0, 0], 6);
  }
  const chandelier = new THREE.Group();
  chandelier.position.set(0.4, y + 3.6, 0.6);
  K.add(chandelier);
  const Ch = new Merge();
  Ch.cyl('ironDark', 0.03, 0.03, 1.1, [0, 0.55, 0], [0, 0, 0], 5);
  Ch.tor('ironDark', 1.0, 0.05, [0, 0, 0], [Math.PI / 2, 0, 0], 20);
  Ch.tor('ironDark', 0.62, 0.04, [0, 0.4, 0], [Math.PI / 2, 0, 0], 16);
  for (let i = 0; i < 9; i++) {
    const a = (i / 9) * TAU;
    Ch.cyl('candle', 0.028, 0.035, 0.3, [Math.cos(a) * 1.0, 0.16, Math.sin(a) * 1.0], [0, 0, 0], 6);
  }
  const chm = Ch.build(M);
  chandelier.add(chm);
  for (let i = 0; i < 9; i++) {
    const a = (i / 9) * TAU;
    makeFlame(chandelier, Math.cos(a) * 1.0, 0.34, Math.sin(a) * 1.0, 0.55, '#ffcc7a');
  }
  const light = new THREE.PointLight('#ffb861', 0, 12, 1.6);
  light.position.set(0.4, y + 1.0, 0.6);
  K.add(light);
  reg.lampLights.push({ light, max: 2.0, interior: true });
  propTorch(K, -4.9, y + 2.6, -1.0, Math.PI / 2, { light: false, s: 0.9 });
  propTorch(K, -4.9, y + 2.6, 2.2, Math.PI / 2, { light: false, s: 0.9 });
  const gm = Mh.build(M);
  K.add(gm);
  makeFlame(K, -4.5, y + 0.55, 0.6, 2.0, '#ffab55');
  const fl = new THREE.PointLight('#ff9c46', 0, 11, 1.9);
  fl.position.set(-4.1, y + 1.4, 0.6);
  K.add(fl);
  reg.lampLights.push({ light: fl, max: 1.8, interior: true });
  propBanner(K, -5.2, y + 4.4, -2.0, 1.3, 2.6, texHerald(PAL.clothBlue, '#f6ead2', 'tower'), Math.PI / 2);
  propBanner(K, -5.2, y + 4.4, 3.0, 1.3, 2.6, texHerald(PAL.roofRose, '#f6ead2', 'rose'), Math.PI / 2);
  propBanner(K, 0, y + 4.6, -5.0, 1.4, 2.8, texHerald(PAL.clothGreen, '#f6ead2', 'star'));
  const shields = new Merge();
  for (let i = 0; i < 3; i++) {
    shields.frame([-5.15, y + 2.9, -3.4 + i * 0.9], [0, Math.PI / 2, 0]);
    shields.lathe('stone', [[0.005, 0], [0.42, 0.02], [0.46, 0.22], [0.34, 0.5], [0.005, 0.56]], [0, -0.28, 0], [0, 0, 0], 10);
    shields.reset();
  }
  K.add(shields.build(M));
  const king = makeFigure({ scale: 1.05, coat: 'clothPlum', pants: 'ink', hat: 'crown', cape: true, capeColor: PAL.clothRose, collarKey: 'gold', ermine: true, beard: 'cream' });
  addFigure(K, '国王', '坐在王座上，把每一颗星星都当成自己的臣民来数。', king, { pos: [0, y + 0.62, -4.0], ry: 0.06, view: [[-2.4, 6.9, -1.4], [0.2, 6.5, -4.2], 32] });
  new Actor(king, { mode: 'sit' });
  const queen = makeFigure({ scale: 1.0, coat: 'clothBlue', pants: 'ink', hat: 'crown', robe: 'clothBlue', collarKey: 'gold' });
  addFigure(K, '王后', '王座旁的第二把椅子；她更关心的是那条新挂毯的配色。', queen, { pos: [1.6, y + 0.6, -4.1], ry: -0.1, view: [[1.4, 6.7, -1.1], [1.6, 5.8, -4.2], 34] });
  new Actor(queen, { mode: 'sit' });
  [-3.4, 3.4].forEach((x, i) => {
    const gd = makeFigure({ coat: 'clothBlue', pants: 'ink', hat: 'helmet', collarKey: 'iron', footScale: 1.2 });
    addFigure(K, '卫兵', '长矛立得笔直，头盔下的眼睛其实在偷看桌上的烤鸡。', gd, { pos: [x, y + 0.5, -3.2], ry: i ? -0.4 : 0.4 });
    new Actor(gd, { mode: 'freeze' });
  });
  const dog = makeBeast({ scale: 0.62, body: 'clothRose', earKey: 'clothRose', ears: 'flop', legLen: 0.2, bw: 0.15, bl: 0.3, bh: 0.19, tail: 'thin', headR: 0.11, headUp: 1.2, headF: 0.75, muzzleKey: 'cream' });
  addFigure(K, '猎犬', '壁炉边占了最好的位置，谁赶都不走。', dog, { pos: [-3.2, y + 0.5, 0.8], ry: 1.4 });
  new BeastActor(dog, { mode: 'idle' });
  label('王座大厅', new THREE.Vector3(0, PLAT + 4, 4), '长桌、挂毯与壁炉；国王与王后坐在垂幔的华盖下，两侧站着卫兵。', 'floor');
}
function kitchen(K, y) {
  const Mk = new Merge();
  propTable(Mk, -0.6, y + 0.5, 1.2, 3.4, 1.5, 0.86);
  for (let i = 0; i < 8; i++) {
    Mk.sph(pick(['clothRose', 'gold', 'clothGreen', 'cream']), R(0.1, 0.18), [R(-2.0, 0.8), y + 1.42, R(0.6, 1.8)], 8);
  }
  Mk.cyl('woodPale', 0.34, 0.34, 0.06, [0.4, y + 1.4, 1.2], [0, 0, 0], 12);
  Mk.cyl('cream', 0.16, 0.2, 0.14, [-1.0, y + 1.42, 1.0], [0, 0, 0], 10);
  propStool(Mk, 1.4, y + 0.5, 1.0);
  propBarrel(Mk, 4.0, y + 0.5, 3.2, 1.0);
  propBarrel(Mk, 4.6, y + 0.5, 2.0, 0.9);
  propSack(Mk, 4.4, y + 0.5, -3.6, 1.2);
  propSack(Mk, -4.6, y + 0.5, 0.2, 1.0);
  propCrate(Mk, 4.4, y + 0.5, 0.4, 0.9, 0.3);
  Mk.box('woodDark', 0.9, 0.2, 0.6, [3.6, y + 0.9, -3.4]);
  Mk.box('stoneWarm', 4.0, 3.2, 0.7, [-3.2, y + 1.6, -4.6]);
  Mk.box('ink', 2.6, 2.2, 0.2, [-3.2, y + 1.5, -4.15]);
  Mk.box('ironDark', 3.4, 0.18, 0.7, [-3.2, y + 0.28, -3.9]);
  Mk.box('stoneWarm', 0.8, 3.2, 0.5, [-5.0, y + 1.6, -4.6]);
  Mk.box('stoneWarm', 0.8, 3.2, 0.5, [-1.4, y + 1.6, -4.6]);
  Mk.box('woodDark', 0.14, 1.4, 0.14, [-3.2, y + 1.0, -3.6], [0, 0, 0.3]);
  Mk.cyl('ironDark', 0.5, 0.42, 0.5, [-3.2, y + 0.75, -3.6], [0, 0, 0], 14);
  Mk.tor('ironDark', 0.5, 0.07, [-3.2, y + 1.0, -3.6], [Math.PI / 2, 0, 0], 16);
  for (let i = 0; i < 4; i++) Mk.sph('clothGreen', 0.11, [-3.2 + R(-0.3, 0.3), y + 1.05, -3.6 + R(-0.3, 0.3)], 7);
  Mk.box('woodPale', 1.4, 0.22, 0.7, [-1.0, y + 1.1, -3.9]);
  for (let i = 0; i < 5; i++) {
    Mk.cyl('cream', 0.09, 0.09, 0.36, [-1.5 + i * 0.26, y + 1.4, -3.9], [R(-0.4, 0.4), 0, R(-0.4, 0.4)], 8);
  }
  Mk.cyl('woodDark', 0.05, 0.05, 1.2, [-1.0, y + 1.6, -3.9], [0, 0, Math.PI / 2], 6);
  for (let i = 0; i < 4; i++) Mk.sph('book1', 0.1, [-1.4 + i * 0.3, y + 1.35, -3.85], 7);
  propShelf(Mk, -2.0, y + 0.5, 4.7, 0, 1.5, 2.0, 3, false);
  for (let i = 0; i < 6; i++) propJar(Mk, -2.6 + i * 0.24, y + 0.9 + (i % 2) * 0.6, 4.6, 1.0, 'paper');
  for (let i = 0; i < 5; i++) propJar(Mk, 0.4 + i * 0.26, y + 0.9 + (i % 2) * 0.6, 4.6, 0.9, 'clothGreen');
  propShelf(Mk, 2.6, y + 0.5, 4.7, 0, 1.3, 2.0, 3, false);
  Mk.box('woodPale', 2.2, 0.1, 0.6, [2.6, y + 1.6, 4.6]);
  for (let i = 0; i < 4; i++) {
    Mk.sph('clothRose', 0.12, [1.9 + i * 0.45, y + 1.68, 4.6], 8);
    Mk.box('clothGreen', 0.3, 0.24, 0.06, [1.9 + i * 0.45, y + 1.55, 4.6]);
  }
  const hm = Mk.build(M);
  K.add(hm);
  makeFlame(K, -3.2, y + 0.5, -3.7, 1.8, '#ff9f52');
  const fl = new THREE.PointLight('#ff9c46', 0, 10, 1.9);
  fl.position.set(-3.0, y + 1.2, -3.0);
  K.add(fl);
  reg.lampLights.push({ light: fl, max: 2.2, interior: true });
  const kl = new THREE.PointLight('#ffcf9a', 0, 11, 1.7);
  kl.position.set(2.4, y + 3.5, 1.4);
  K.add(kl);
  reg.lampLights.push({ light: kl, max: 1.4, interior: true });
  const km = new Merge();
  propLantern(km, 2.4, y + 3.5, 1.4, 1.1, 'paper');
  const kmesh = km.build(M);
  K.add(kmesh);
  const cook = makeFigure({ coat: 'cream', pants: 'woodDark', hat: 'hood', hatKey: 'cream', apron: 'cream' });
  addFigure(K, '厨娘', '木勺就是她的权杖，锅里的汤从来不许人乱搅。', cook, { pos: [-2.6, y + 0.5, -3.0], ry: 2.0, view: [[-2.6, 11.9, -0.2], [-2.6, 10.5, -3.4], 38] });
  new Actor(cook, { mode: 'work' });
  const cat = makeBeast({ scale: 0.55, body: 'clothPlum', legLen: 0.18, bw: 0.14, bl: 0.28, bh: 0.18, tail: 'thin', ears: 'pointy', headR: 0.11, headUp: 1.2, headF: 0.78, muzzleKey: 'cream' });
  addFigure(K, '猫', '盘在货架最上层，尾巴垂下来像一条围巾。', cat, { pos: [2.6, y + 2.6, 4.4], ry: 3.1 });
  new BeastActor(cat, { mode: 'idle' });
  propBanner(K, 0, y + 4.4, 4.9, 1.0, 2.0, texHerald(PAL.clothGreen, '#f6ead2', 'cross'));
  propTorch(K, -4.9, y + 2.6, 2.4, Math.PI / 2, { light: false, s: 0.9 });
  label('厨房与储藏', new THREE.Vector3(0, PLAT + 9, 4), '吊钩上挂着铁锅，架子上排满陶罐与药草；灶膛的火一天都不熄。', 'floor');
}
function study(K, y) {
  const Ms = new Merge();
  propShelf(Ms, -4.5, y + 0.5, -4.6, 0, 2.0, 4.0, 5, true);
  propShelf(Ms, 0, y + 0.5, -4.9, 0, 2.0, 4.0, 5, true);
  propShelf(Ms, 4.5, y + 0.5, -4.6, 0, 2.0, 4.0, 5, true);
  propShelf(Ms, -5.0, y + 0.5, 0.5, Math.PI / 2, 1.8, 3.0, 4, true);
  propTable(Ms, 0.6, y + 0.5, 1.6, 2.6, 1.4, 0.8);
  for (let i = 0; i < 6; i++) {
    Ms.box('paper', 0.42, 0.02, 0.56, [0.6 + R(-0.6, 0.8), y + 1.32, 1.6 + R(-0.3, 0.3)], [0, R(-0.4, 0.4), 0]);
  }
  Ms.cyl('ink', 0.06, 0.07, 0.12, [1.2, y + 1.36, 1.1], [0, 0, 0], 8);
  Ms.cyl('cream', 0.012, 0.02, 0.4, [1.2, y + 1.6, 1.05], [0.3, 0, 0.2], 5);
  Ms.cone('cream', 0.05, 0.22, [1.32, y + 1.86, 0.98], [0.3, 0, 0.6], 6);
  propCandle(Ms, 0.1, y + 1.3, 1.9, 1.2);
  const globe = new THREE.Group();
  globe.position.set(2.0, y + 1.3, 1.9);
  K.add(globe);
  const Gb = new Merge();
  Gb.add('foliage2', new THREE.SphereGeometry(0.26, 16, 12), [0, 0, 0], [0.3, 0, 0.2]);
  Gb.tor('gold', 0.26, 0.02, [0, 0.05, 0], [0.3, 0, -0.3], 16);
  Gb.cyl('woodDark', 0.04, 0.05, 0.3, [0, -0.2, 0], [0, 0, 0], 8);
  Gb.lathe('woodDark', [[0.005, 0], [0.16, 0.02], [0.1, 0.08]], [0, -0.4, 0], [0, 0, 0], 10);
  const gm2 = Gb.build(M);
  globe.add(gm2);
  propChair(Ms, 0.6, y + 0.5, 3.0, Math.PI, 1.1);
  propChest(Ms, -3.2, y + 0.5, 3.6, 0.6, 1.1);
  propStool(Ms, 2.6, y + 0.5, 3.4);
  propStool(Ms, 3.4, y + 0.5, 3.0);
  propBooks(Ms, -3.0, y + 1.0, 4.2, 0.34);
  propBooks(Ms, 2.2, y + 1.0, 4.4, 0.3);
  propRug(K, 0.8, y + 0.48, 3.0, 5.0, 3.4, 0.1, texRug(1, '#6f8bb0', '#c8a765'));
  Ms.cyl('gold', 0.5, 0.5, 0.06, [-2.6, y + 3.4, -4.85], [Math.PI / 2, 0, 0], 24);
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * TAU;
    Ms.cyl('gold', 0.02, 0.02, 0.9, [-2.6 + Math.cos(a) * 0.42, y + 3.4, -4.85 + Math.sin(a) * 0.42], [Math.PI / 2, 0, 0], 5);
  }
  const desk = Ms.build(M);
  K.add(desk);
  const scope = new THREE.Group();
  scope.position.set(-3.6, y + 0.5, -3.4);
  K.add(scope);
  const Sc = new Merge();
  Sc.cyl('woodDark', 0.04, 0.05, 1.5, [-0.3, 0.75, 0.2], [0.18, 0, 0.4], 7);
  Sc.cyl('woodDark', 0.04, 0.05, 1.5, [0.35, 0.75, 0.15], [0.18, 0, -0.3], 7);
  Sc.cyl('woodDark', 0.04, 0.05, 1.5, [0.05, 0.75, -0.35], [0.3, 0, 0.05], 7);
  Sc.cyl('gold', 0.13, 0.16, 1.5, [0, 1.6, 0.5], [-1.05, 0, 0], 12);
  Sc.cyl('gold', 0.17, 0.13, 0.3, [0, 1.94, 1.05], [-1.05, 0, 0], 12);
  Sc.cyl('ink', 0.14, 0.14, 0.06, [0, 1.94, 1.05], [-1.05, 0, 0], 12);
  Sc.cyl('gold', 0.1, 0.12, 0.26, [0, 1.24, -0.04], [-1.05, 0, 0], 12);
  scope.add(Sc.build(M));
  propLantern(Ms, 3.9, y + 3.4, -4.0, 1.0, 'paper');
  const lamp = new THREE.PointLight('#ffd9a0', 0, 11, 1.7);
  lamp.position.set(0.6, y + 3.0, 1.6);
  K.add(lamp);
  reg.lampLights.push({ light: lamp, max: 1.9, interior: true });
  const ast = makeFigure({ coat: 'clothPlum', pants: 'ink', hat: 'wizard', hairKey: 'cream', beard: 'cream', cape: true, capeColor: PAL.clothBlue });
  addFigure(K, '天文学家', '把星图钉满墙壁的人；他说星星的名字比人间的头衔可靠。', ast, { pos: [-3.0, y + 0.5, -3.6], ry: 1.4, view: [[-3.0, 17.0, -0.6], [-3.0, 15.6, -4.0], 38] });
  new Actor(ast, { mode: 'work' });
  const cat = makeBeast({ scale: 0.6, body: 'wool', legLen: 0.2, bw: 0.15, bl: 0.3, bh: 0.19, tail: 'thin', ears: 'pointy', headR: 0.11, headUp: 1.2, headF: 0.78, muzzleKey: 'clothRose' });
  addFigure(K, '白猫', '趴在书堆上睡觉，尾巴偶尔扫过一页星图。', cat, { pos: [-3.0, y + 0.62, 4.1], ry: 0.4 });
  new BeastActor(cat, { mode: 'idle' });
  label('图书室 · 观星台', new THREE.Vector3(0, PLAT + 14, -3), '三面书墙、一张摊满星图的长桌，角落里架着黄铜望远镜。', 'floor');
}
function bedchamber(K, y) {
  const Mb = new Merge();
  propBed(Mb, -3.0, y + 0.5, 0.4, Math.PI / 2, { quiltKey: 'clothRose' });
  propWardrobe(Mb, 4.4, y + 0.5, -4.2, -0.4, 1.1);
  propChest(Mb, 4.6, y + 0.5, 1.6, 0, 1.1);
  propWashstand(Mb, 4.6, y + 0.5, -1.4, -0.9);
  propTable(Mb, 4.4, y + 0.5, 4.2, 0.9, 0.8, 0.72);
  propCandle(Mb, 4.4, y + 1.24, 4.2, 1.1);
  propStool(Mb, 3.4, y + 0.5, 4.4);
  propStool(Mb, 2.6, y + 0.5, 3.6);
  propShelf(Mb, 0.6, y + 0.5, -4.8, 0, 1.4, 2.2, 3, false);
  for (let i = 0; i < 3; i++) propJar(Mb, 0.3 + i * 0.3, y + 1.5, -4.7, 1.0, 'paper');
  propBooks(Mb, 1.4, y + 1.0, -4.6, 0.3);
  Mb.tor('clothPlum', 1.6, 0.05, [-3.4, y + 3.4, 0.4], [0, 0, Math.PI / 2], 20);
  propRug(K, -0.4, y + 0.48, 1.4, 4.0, 3.2, 0.05, texQuilt(PAL.clothRose, '#f3e6c8'));
  const curtains = new Merge();
  [-3.6, -2.4].forEach((x) => {
    curtains.add('clothRose', new THREE.BoxGeometry(0.5, 2.2, 0.1), [x, y + 2.0, -4.4], [0, 0, 0]);
  });
  curtains.box('clothRose', 2.0, 0.3, 0.2, [-3.0, y + 3.2, -4.4]);
  K.add(curtains.build(M));
  const mirror = new THREE.Mesh(gPlane(0.7, 1.4), M.silver);
  mirror.position.set(4.85, y + 1.9, 3.0);
  mirror.rotation.y = -Math.PI / 2;
  K.add(mirror);
  K.add(Mb.build(M));
  const bedRose = makeRose(K, -2.5, y + 2.22, -4.45, 0.68, { dome: true });
  registerBedRose(bedRose);
  const toy = makeBeast({ scale: 0.4, body: 'wool', wool: 'wool', legLen: 0.12, bw: 0.12, bl: 0.22, bh: 0.15, ears: 'flop', earKey: 'ink', tail: 'thin', headR: 0.09, muzzleKey: 'ink', headUp: 1.15, headF: 0.7 });
  addFigure(K, '布羊', '床脚的布偶羊，被抱过太多次，绒毛都塌了。', toy, { pos: [-2.2, y + 1.4, 0.6], ry: 1.2 });
  new BeastActor(toy, { mode: 'freeze' });
  const rock = new THREE.Group();
  rock.position.set(1.6, y + 0.5, 3.8);
  K.add(rock);
  const Rk = new Merge();
  Rk.box('woodDark', 1.2, 0.12, 0.4, [0, 0.55, 0]);
  Rk.box('woodDark', 0.12, 0.7, 0.4, [-0.6, 0.85, 0], [0, 0, 0.3]);
  Rk.box('woodDark', 0.12, 0.7, 0.4, [0.6, 0.85, 0], [0, 0, -0.3]);
  Rk.cyl('woodDark', 0.06, 0.06, 1.2, [-0.35, 0.35, 0], [0, 0, 0], 6);
  Rk.cyl('woodDark', 0.06, 0.06, 1.2, [0.35, 0.35, 0], [0, 0, 0], 6);
  Rk.cyl('wood', 0.16, 0.2, 0.55, [0, 0.8, 0], [0, 0, Math.PI / 2], 10);
  Rk.sph('cream', 0.1, [0, 0.95, 0.3], 8);
  Rk.cone('clothRose', 0.08, 0.2, [0, 1.15, 0.35], [0, 0, 0], 6);
  const rkm = Rk.build(M);
  rock.add(rkm);
  const light = new THREE.PointLight('#ffcf9a', 0, 10, 1.7);
  light.position.set(-1.0, y + 3.4, 0.4);
  K.add(light);
  reg.lampLights.push({ light, max: 1.9, interior: true });
  const bl2 = new THREE.PointLight('#ffcf9a', 0, 10, 1.7);
  bl2.position.set(2.4, y + 3.4, 2.4);
  K.add(bl2);
  reg.lampLights.push({ light: bl2, max: 1.3, interior: true });
  propCandle(Mb, 4.4, y + 1.24, 4.2, 1.0);
  const lf = makeFlame(K, 4.4, y + 1.5, 4.2, 0.5, '#ffcc7a');
  const prince = makeFigure({ scale: 0.82, coat: 'clothGreen', pants: 'clothGreen', scarf: true, scarfColor: '#f2c14e', hairKey: 'hair', spikyHair: true, shoes: 'ink' });
  addFigure(K, '小王子', '他站在窗边看着那颗属于他的小行星，手里还提着浇花的壶。', prince, { pos: [-3.0, y + 0.5, -3.6], ry: 0, view: [[-1.6, 21.3, -0.6], [-3.0, 20.7, -4.1], 40] });
  const pa = new Actor(prince, { mode: 'idle', bob: 0.05 });
  const can = new Merge();
  can.cyl('iron', 0.16, 0.18, 0.22, [0, 0, 0], [0, 0, 0], 12);
  can.cyl('iron', 0.02, 0.02, 0.4, [0.16, 0.06, 0], [0, 0, -0.7], 6);
  can.cone('iron', 0.07, 0.18, [0.34, 0.16, 0], [0, 0, -1.1], 10);
  const cm = can.build(M);
  cm.position.set(0.28, y + 0.5 + 0.3, -3.4);
  K.add(cm);
  label('卧房 · 玫瑰', new THREE.Vector3(0, PLAT + 19, -2), '四柱床、星毯与窗纱；窗台上玻璃罩里是那朵玫瑰，小王子守着它。', 'floor');
}
function registerBedRose(r) {
  reg.figures.push({ name: '玫瑰（窗台）', desc: '罩在玻璃罩里，怕风、怕虫、怕被忘记。', group: r.group, view: [[-2.5, 22.3, -1.7], [-2.5, 22.1, -4.9], 30] });
  r.group.userData.pickable = true;
  r.group.userData.name = '玫瑰（窗台）';
  r.group.userData.desc = '罩在玻璃罩里，怕风、怕虫、怕被忘记。';
  r.group.traverse((o) => {
    o.userData.fig = r.group;
  });
}
function belfry(K, y) {
  const Mm = new Merge();
  const bell = new THREE.Group();
  bell.position.set(0, y + 1.8, -1.6);
  K.add(bell);
  const Bl = new Merge();
  Bl.box('woodDark', 0.24, 2.6, 0.24, [-0.7, -0.2, 0]);
  Bl.box('woodDark', 0.24, 2.6, 0.24, [0.7, -0.2, 0]);
  Bl.box('woodDark', 1.8, 0.24, 0.24, [0, 1.0, 0]);
  Bl.lathe('gold', [[0.005, 0.5], [0.3, 0.42], [0.5, 0.2], [0.46, 0.0], [0.44, -0.06], [0.005, -0.06]], [0, -0.9, 0], [0, 0, 0], 14);
  Bl.cyl('gold', 0.07, 0.07, 0.3, [0, 0.3, 0], [0, 0, 0], 8);
  Bl.sph('gold', 0.12, [0, 0.5, 0], 10);
  Bl.cyl('thatch', 0.03, 0.03, 1.6, [0, -1.4, 0], [0, 0, 0], 5);
  bell.add(Bl.build(M));
  Mm.cyl('woodDark', 0.05, 0.05, 1.0, [0.6, 3.0, -1.6], [0, 0, 0.4], 6);
  propBarrel(Mm, -4.0, y + 0.4, 3.4, 0.95);
  propBarrel(Mm, -4.2, y + 0.4, 2.2, 0.85);
  propCrate(Mm, 4.2, y + 0.4, 3.2, 0.95, 0.2);
  propCrate(Mm, 4.2, y + 1.3, 3.2, 0.8, 0.5);
  propLadder(Mm, 3.0, y + 0.4, -4.0, 3.4, 0, 0.1);
  const m = Mm.build(M);
  K.add(m);
  const peg = makeBeast({ scale: 0.42, body: 'silver', legLen: 0.12, bw: 0.1, bl: 0.2, bh: 0.13, tail: 'thin', tailKey: 'silver', headR: 0.08, headUp: 1.2, headF: 0.8, beak: true });
  addFigure(K, '鸽子', '在钟梁上安了家，钟一响就飞到屋顶上抗议。', peg, { pos: [0.9, y + 3.4, -1.0], ry: 2.2 });
  new BeastActor(peg, { mode: 'idle' });
  const guard = makeFigure({ scale: 1.0, coat: 'clothGreen', pants: 'ink', hat: 'helmet', collarKey: 'iron' });
  addFigure(K, '哨兵', '整夜站在屋顶小窗旁，替整座城堡看着云海。', guard, { pos: [3.7, y + 0.5, -3.4], ry: -1.2 });
  new Actor(guard, { mode: 'idle' });
  makeSmoke(K, 0, y + 4.0, 0, { count: 10, size: 1.0, opacity: 0.1 });
  label('钟楼与屋顶', new THREE.Vector3(0, PLAT + 25, 0), '大钟、绳梯、鸽巢与一扇朝云海的小窗。', 'floor');
}

function courtyard(G) {
  const c = new THREE.Group();
  c.position.y = PLAT;
  G.add(c);
  propWell(c, 7.6, 0.1, 1.4, 1.0);
  makeLampPost(c, 7.6, 5.2, { y: 0.1, s: 0.85 });
  const chapel = new THREE.Group();
  chapel.position.set(-7.8, 0.1, 4.4);
  chapel.rotation.y = -0.7;
  c.add(chapel);
  const Cm = new Merge();
  Cm.box('stoneWarm', 5.6, 0.5, 4.4, [0, 0.25, 0]);
  Cm.box('stoneWarm', 5.2, 3.6, 4.0, [0, 2.1, 0]);
  Cm.box('stoneWarm', 0.4, 1.0, 3.0, [0, 4.3, 0]);
  Cm.box('stoneWarm', 1.0, 1.0, 0.4, [0, 4.3, -1.6]);
  Cm.box('stoneWarm', 1.0, 1.0, 0.4, [0, 4.3, 1.6]);
  Cm.lathe('stoneWarm', [[0.005, 0], [0.9, 0.02], [0.95, 0.7], [0.005, 0.9]], [0, 5.6, -1.5], [0, 0, 0], 8);
  chapel.add(Cm.build(M));
  const Cr = hipRoofParts(5.6, 4.4, 2.6, 0.4);
  const cg = new THREE.Group();
  cg.position.y = 3.9;
  chapel.add(cg);
  Object.values(Cr).forEach((geo) => {
    const m = new THREE.Mesh(geo, M.roofRose);
    m.castShadow = true;
    m.receiveShadow = true;
    cg.add(m);
  });
  const win = new THREE.Mesh(new THREE.CircleGeometry(0.85, 20), new THREE.MeshStandardMaterial({ map: texHerald('#f6d9a8', '#c98f6b', 'rose'), roughness: 0.6, emissive: '#ffcf8a', emissiveIntensity: 0.25 }));
  win.position.set(-2.6, 2.5, 0);
  win.rotation.y = -Math.PI / 2;
  chapel.add(win);
  reg.lampMats.push(win.material);
  const ring = new THREE.Mesh(gTor(0.9, 0.12, 22, 8), M.stoneWarm);
  ring.position.copy(win.position);
  ring.rotation.y = -Math.PI / 2;
  chapel.add(ring);
  const door = new THREE.Mesh(gPlane(1.3, 2.3), new THREE.MeshStandardMaterial({ map: texHerald('#8a6a4a', '#c9a878', 'cross'), roughness: 0.9 }));
  door.position.set(0, 1.15, 2.02);
  chapel.add(door);
  const Ch = new Merge();
  for (let i = 0; i < 3; i++) propBench(Ch, 0, 0.2, -1.4 + i * 1.3, 0, 3.0);
  Ch.box('stoneWarm', 3.6, 1.0, 0.7, [0, 0.7, -1.7]);
  Ch.box('clothRose', 4.0, 0.16, 0.9, [0, 1.24, -1.7]);
  propCandle(Ch, -1.2, 1.3, -1.5, 1.2);
  propCandle(Ch, 1.2, 1.3, -1.5, 1.2);
  const chm = Ch.build(M);
  chm.position.set(0, 0, 0);
  chapel.add(chm);
  const cl = new THREE.PointLight('#ffcf9a', 0, 9, 1.7);
  cl.position.set(0, 2.0, -1.2);
  chapel.add(cl);
  reg.lampLights.push({ light: cl, max: 1.3, interior: true });
  const monk = makeFigure({ scale: 0.95, coat: 'clothGreen', hat: 'hood', hatKey: 'clothGreen', robe: 'clothGreen', belt: 'thatch' });
  addFigure(chapel, '修士', '抄书、敲钟、给羊羔起名字；他的袖子总是沾着墨水。', monk, { pos: [-0.9, 0.2, 0.4], ry: 3.0 });
  new Actor(monk, { mode: 'freeze' });
  const smith = new THREE.Group();
  smith.position.set(-7.0, 0.1, -7.0);
  smith.rotation.y = 0.9;
  c.add(smith);
  const Sh = new Merge();
  [[-2.6, -2.0], [2.6, -2.0], [-2.6, 2.0], [2.6, 2.0]].forEach(([px, pz]) => Sh.cyl('woodDark', 0.16, 0.18, 3.2, [px, 1.6, pz], [0, 0, 0], 8));
  Sh.box('woodDark', 5.6, 0.24, 0.3, [0, 3.2, -2.0]);
  Sh.box('woodDark', 5.6, 0.24, 0.3, [0, 3.2, 2.0]);
  Sh.box('thatch', 6.4, 0.3, 2.6, [0, 3.7, -1.0], [-0.4, 0, 0]);
  Sh.box('thatch', 6.4, 0.3, 2.6, [0, 3.7, 1.0], [0.4, 0, 0]);
  smith.add(Sh.build(M));
  propForge(smith, 2.2, 0, -1.0, Math.PI);
  propAnvil(Sh, -1.6, 0, 0.4, 0.4);
  const anvm = Sh.build(M);
  smith.add(anvm);
  const rack = new Merge();
  for (let i = 0; i < 4; i++) {
    rack.cyl('woodDark', 0.05, 0.05, 0.6, [-2.4 + i * 0.5, 0.4, 1.6], [0.4, 0, 0.2], 6);
    rack.box('iron', 0.06, 0.7, 0.06, [-2.35 + i * 0.5, 0.9, 1.75], [0.4, 0, 0.2]);
  }
  rack.box('woodPale', 2.4, 0.12, 0.16, [-1.6, 0.9, 1.6]);
  const rkm = rack.build(M);
  smith.add(rkm);
  propBarrel(Sh, -2.2, 0, -1.8, 0.9);
  const bsm = makeBeast({ scale: 0.62, body: 'horseDark', legLen: 0.2, bw: 0.15, bl: 0.3, bh: 0.19, tail: 'thin', ears: 'tiny', headR: 0.11, headUp: 1.2, headF: 0.78, muzzleKey: 'cream' });
  const blk = makeFigure({ scale: 1.08, coat: 'leather', pants: 'ink', apron: 'leather', hairKey: 'ink', beard: 'ink' });
  addFigure(smith, '铁匠', '一锤一锤把铁打成犁、钉成马蹄；也是全城堡嗓门最大的人。', blk, { pos: [-1.4, 0, 0.2], ry: 2.6, view: [[-5.4, 6.2, -3.4], [-7.7, 5.5, -5.5], 40] });
  new Actor(blk, { mode: 'work', hammer: true });
  const sparks = (() => {
    const N = 26;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(N * 3);
    const vel = [];
    for (let i = 0; i < N; i++) {
      pos[i * 3] = -1.6; pos[i * 3 + 1] = 0.9; pos[i * 3 + 2] = 0.4;
      vel.push({ x: R(-1, 1), y: R(1.5, 3), z: R(-1, 1), l: R(0, 1) });
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const m = new THREE.PointsMaterial({ size: 0.14, map: texSoft('#ffd08a'), color: '#ffd08a', transparent: true, blending: THREE.AdditiveBlending, depthWrite: false });
    const pts = new THREE.Points(geo, m);
    smith.add(pts);
    tick((dt, t) => {
      const p = geo.attributes.position.array;
      for (let i = 0; i < N; i++) {
        const v = vel[i];
        if (t % 2.2 < 0.05) { p[i * 3] = -1.6; p[i * 3 + 1] = 0.9; p[i * 3 + 2] = 0.4; }
        v.l -= dt;
        if (v.l < 0) { v.l = R(0.3, 1); p[i * 3] = -1.6; p[i * 3 + 1] = 0.9; p[i * 3 + 2] = 0.4; }
        p[i * 3] += v.x * dt;
        p[i * 3 + 1] += v.y * dt;
        p[i * 3 + 2] += v.z * dt;
        v.y -= dt * 6;
      }
      geo.attributes.position.needsUpdate = true;
    });
    return pts;
  })();
  const stable = new THREE.Group();
  stable.position.set(6.4, 0.1, -7.4);
  stable.rotation.y = -0.6;
  c.add(stable);
  const St = new Merge();
  St.box('stone', 6.4, 0.4, 4.4, [0, 0.2, 0]);
  St.box('woodDark', 6.0, 2.8, 4.0, [0, 1.8, 0]);
  for (let i = 0; i < 6; i++) St.box('woodPale', 0.12, 2.8, 4.06, [-2.6 + i * 1.04, 1.8, 0]);
  St.box('woodDark', 1.8, 2.2, 0.14, [0, 1.3, 2.05]);
  St.box('thatch', 7.0, 0.3, 2.6, [0, 3.6, -0.9], [-0.45, 0, 0]);
  St.box('thatch', 7.0, 0.3, 2.6, [0, 3.6, 0.9], [0.45, 0, 0]);
  St.box('thatch', 7.2, 0.4, 0.5, [0, 4.3, 0]);
  stable.add(St.build(M));
  const hst = new Merge();
  propHay(hst, -3.4, 0.1, 2.6, 0.9);
  propBarrel(hst, 2.8, 0.1, 2.0, 0.85);
  propCart(c, 3.6, PLAT + 0.1, -8.6, -1.1, 0.85);
  stable.add(hst.build(M));
  const horse = makeBeast({ scale: 1.3, body: 'horse', legKey: 'horseDark', legLen: 0.44, bw: 0.26, bl: 0.6, bh: 0.32, tail: 'mane', tailKey: 'horseDark', ears: 'tiny', headR: 0.18, headUp: 1.4, headF: 0.85, muzzleKey: 'cream', hoofKey: 'ink' });
  addFigure(stable, '白马', '马厩里刨着蹄子，等着出门巡山。', horse, { pos: [1.4, 0.1, 0], ry: -1.4 });
  const ha = new BeastActor(horse, { mode: 'idle' });
  ha.setBase(PLAT + 0.1);
  const stalls = [
    { p: [1.6, 8.2], r: -1.2, cloth: 'clothRose', goods: 'fruit' },
    { p: [-1.2, 9.0], r: -1.6, cloth: 'clothBlue', goods: 'pot' },
    { p: [4.2, 7.8], r: -0.8, cloth: 'clothGreen', goods: 'book' }
  ];
  stalls.forEach((s, i) => {
    const st = propStall(c, s.p[0], PLAT + 0.1, s.p[1], s.r, { cloth: s.cloth, goods: s.goods });
    if (i < 2) {
      const merch = makeFigure({ coat: pick(['clothBlue', 'clothPlum']), pants: 'woodDark', hat: 'feather', apron: 'cream' });
      addFigure(c, i ? '陶器商人' : '果蔬商人', i ? '把陶罐摆成金字塔的人，最怕猫。' : '吆喝声比市集还大，苹果只肯按个卖。', merch, { pos: [s.p[0] - 0.2, PLAT + 0.1, s.p[1] + 1.1], ry: Math.PI + s.r });
      new Actor(merch, { mode: 'idle' });
    }
  });
  const Mg = new Merge();
  propBarrel(Mg, 10.2, PLAT + 0.1, -3.2, 1.0);
  propBarrel(Mg, 10.4, PLAT + 0.1, -4.2, 0.9);
  propCrate(Mg, -9.6, PLAT + 0.1, -1.0, 1.0, 0.2);
  propCrate(Mg, -9.6, PLAT + 1.0, -1.0, 0.85, 0.5);
  propSack(Mg, -9.2, PLAT + 0.1, 0.4, 1.2);
  propSack(Mg, -9.4, PLAT + 0.1, 1.6, 1.0);
  propHay(Mg, 10.6, PLAT + 0.1, 5.6, 0.9);
  propChest(Mg, -6.0, PLAT + 0.1, -8.6, 0.3, 1.0);
  const nm = Mg.build(M);
  c.add(nm);
  const dummy = new THREE.Group();
  dummy.position.set(4.4, PLAT + 0.1, -3.0);
  c.add(dummy);
  const Dm = new Merge();
  Dm.cyl('woodDark', 0.1, 0.14, 1.9, [0, 0.95, 0], [0, 0, 0], 8);
  Dm.cyl('woodDark', 0.08, 0.08, 1.2, [0, 1.7, 0], [0, 0, Math.PI / 2], 6);
  Dm.sph('thatch', 0.22, [0, 2.0, 0], 10);
  Dm.rbox('thatch', 0.5, 0.9, 0.4, [0, 1.3, 0], [0, 0, 0], 0.08);
  dummy.add(Dm.build(M));
  const chickens = [];
  for (let i = 0; i < 5; i++) {
    const ch = new THREE.Group();
    const y0 = PLAT + 0.1;
    ch.position.set(R(-2, 6), y0, R(-6, -2));
    c.add(ch);
    const Ck = new Merge();
    Ck.add('wool', new THREE.SphereGeometry(0.2, 10, 8), [0, 0.18, 0], [0, 0, 0], [0.9, 0.9, 1.2]);
    Ck.sph('wool', 0.11, [0, 0.38, 0.18], 8);
    Ck.cone('gold', 0.05, 0.12, [0, 0.36, 0.3], [Math.PI / 2, 0, 0], 6);
    Ck.cone('clothRose', 0.06, 0.12, [0, 0.5, 0.16], [0, 0, 0], 6);
    Ck.sph('ink', 0.02, [-0.06, 0.42, 0.24], 6);
    Ck.sph('ink', 0.02, [0.06, 0.42, 0.24], 6);
    Ck.cyl('gold', 0.02, 0.02, 0.16, [-0.07, 0.06, 0], [0, 0, 0], 5);
    Ck.cyl('gold', 0.02, 0.02, 0.16, [0.07, 0.06, 0], [0, 0, 0], 5);
    ch.add(Ck.build(M));
    chickens.push({ g: ch, ph: R(0, TAU), a: R(0, TAU), r: R(1.4, 3.4), cx: ch.position.x, cz: ch.position.z });
  }
  tick((dt, t) => {
    chickens.forEach((ch) => {
      ch.a += dt * 0.5;
      ch.g.position.set(ch.cx + Math.cos(ch.a) * ch.r, PLAT + 0.1 + Math.abs(Math.sin(t * 9 + ch.ph)) * 0.05, ch.cz + Math.sin(ch.a) * ch.r);
      ch.g.rotation.y = -ch.a + Math.PI / 2;
    });
  });
  const wash = new THREE.Group();
  wash.position.set(9.6, PLAT + 0.1, 6.4);
  wash.rotation.y = -0.9;
  c.add(wash);
  const Wm = new Merge();
  Wm.cyl('woodDark', 0.08, 0.1, 2.2, [-2.0, 1.1, 0], [0, 0, 0], 6);
  Wm.cyl('woodDark', 0.08, 0.1, 2.2, [2.0, 1.1, 0], [0, 0, 0], 6);
  Wm.cyl('thatch', 0.02, 0.02, 4.0, [0, 2.05, 0], [0, 0, Math.PI / 2], 5);
  wash.add(Wm.build(M));
  for (let i = 0; i < 4; i++) {
    const cl = new THREE.Mesh(gPlane(0.7, 0.9, 6, 8), new THREE.MeshStandardMaterial({ color: pick(['#f4ece0', '#cfe0f5', '#cd8f99']), roughness: 1, side: THREE.DoubleSide }));
    const pos = [-1.4 + i * 0.95, 1.5, 0];
    new WaveCloth(wash, cl.geometry, cl.material, { pos, rot: [0, Math.PI / 2, 0], amp: 0.05, freq: 1.2, speed: 1.4, dir: 'y' });
  }
  const garden = new THREE.Group();
  garden.position.set(-9.0, PLAT + 0.1, 6.0);
  c.add(garden);
  for (let i = 0; i < 4; i++) {
    const bx = -1.8 + i * 1.2;
    const pm = new Merge();
    pm.lathe('dirt', [[0.005, 0], [0.34, 0.02], [0.38, 0.3], [0.36, 0.44], [0.4, 0.5], [0.32, 0.5]], [bx, 0, 0], [0, 0, 0], 12);
    pm.sph(pick(['foliage1', 'foliage2']), 0.3, [bx, 0.72, 0], 8);
    pm.sph(pick(['clothRose', 'gold', 'clothBlue']), 0.1, [bx + 0.15, 0.95, 0.1], 6);
    garden.add(pm.build(M));
  }
  const sacks = new Merge();
  propSack(sacks, -9.6, PLAT + 0.1, 8.4, 1.0);
  c.add(sacks.build(M));
  propTorch(c, 11.4, PLAT + 2.4, 0.0, Math.PI / 2, { light: false });
  propTorch(c, -11.4, PLAT + 2.4, 0.0, -Math.PI / 2, { light: false });
  propTorch(c, 0.0, PLAT + 2.4, 11.4, Math.PI, { light: false });
  const cl2 = new THREE.PointLight('#ffb060', 0, 15, 1.8);
  cl2.position.set(0, PLAT + 4.4, 6.0);
  c.add(cl2);
  reg.lampLights.push({ light: cl2, max: 1.1 });
  label('内院与市集', new THREE.Vector3(0, PLAT + 3.2, 9), '水井、市集摊、铁匠棚与马厩；晾着的衣物把风的样子留了下来。', 'place');
  label('礼拜堂', new THREE.Vector3(-7.8, PLAT + 4.6, 4.4), '玫瑰窗、长凳与一支永明的蜡烛；修士在这里抄书。', 'place');
  return c;
}

export function buildCastle(scene) {
  const G = new THREE.Group();
  scene.add(G);
  mesa(G);
  curtain(G);
  const { K, roofMeshes } = keep(G);
  greatHall(K, 0.4);
  kitchen(K, 5.4);
  study(K, 10.4);
  bedchamber(K, 15.4);
  belfry(K, 20.4);
  courtyard(G);
  return { group: G, keep: K, roofMeshes };
}
