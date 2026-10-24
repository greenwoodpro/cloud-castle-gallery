import * as THREE from 'three';
import {
  P, rnd, onFrame, gradientMap, box, sphere, cyl, cone, toon, basic,
  disc, glowSprite, clothBanner, rugTexture, tapestryTexture, bannerTexture,
  archedWindow, archedDoorway, makeStar, addMesh, LAYOUT,
} from './utils.js';
import { cobbleTexture } from './utils.js';

const FLOOR = 0.16;
const UPPER = 4.33;
const BACK = -1.84;
const LEFT = -2.25;
const RIGHT = 2.25;
const FRONT = 2.28;

function candle(parent, x, y, z, s = 1, opts = {}) {
  const g = new THREE.Group();
  g.position.set(x, y, z);
  parent.add(g);
  cyl(g, 0.05 * s, 0.09 * s, 0.07 * s, P.goldDeep, 0, 0.035 * s, 0, { segments: 10 });
  cyl(g, 0.04 * s, 0.05 * s, 0.05 * s, P.gold, 0, 0.09 * s, 0, { segments: 10 });
  cyl(g, 0.022 * s, 0.028 * s, 0.3 * s, 0xfff4dc, 0, 0.26 * s, 0, { segments: 8, cast: false });
  const flameMat = new THREE.MeshBasicMaterial({
    color: 0xffcf7a, transparent: true, opacity: 0.95, toneMapped: false,
  });
  const flame = new THREE.Mesh(new THREE.SphereGeometry(0.032 * s, 8, 6), flameMat);
  flame.scale.set(1, 1.9, 1);
  flame.position.y = 0.44 * s;
  g.add(flame);
  const glow = glowSprite(g, 0xffc06a, 0.45 * s, 0, 0.44 * s, 0, 0.22);
  const phase = rnd(0, 6.28);
  onFrame((t) => {
    const f = 0.85 + Math.sin(t * 9 + phase) * 0.12 + Math.sin(t * 23 + phase * 2) * 0.05;
    flame.scale.set(0.9 + (f - 0.85) * 0.6, 1.7 * f, 0.9);
    flameMat.opacity = 0.75 + 0.2 * f;
    glow.material.opacity = 0.12 + 0.08 * f;
  });
  return g;
}

function makeFlame(parent, x, y, z, scale = 1) {
  const g = new THREE.Group();
  g.position.set(x, y, z);
  parent.add(g);
  const mat = new THREE.MeshBasicMaterial({
    color: 0xff9d4a, transparent: true, opacity: 0.82, toneMapped: false,
    blending: THREE.AdditiveBlending, depthWrite: false,
  });
  const mat2 = new THREE.MeshBasicMaterial({
    color: 0xffe3a4, transparent: true, opacity: 0.9, toneMapped: false,
    blending: THREE.AdditiveBlending, depthWrite: false,
  });
  const f1 = new THREE.Mesh(new THREE.ConeGeometry(0.2 * scale, 0.75 * scale, 8), mat);
  f1.position.y = 0.25 * scale;
  g.add(f1);
  const f2 = new THREE.Mesh(new THREE.ConeGeometry(0.11 * scale, 0.48 * scale, 7), mat2);
  f2.position.y = 0.22 * scale;
  g.add(f2);
  const glow = glowSprite(g, 0xff9f58, 1.5 * scale, 0, 0.3 * scale, 0, 0.3);
  const phase = rnd(0, 6.28);
  onFrame((t) => {
    const f = 0.85 + Math.sin(t * 8 + phase) * 0.15 + Math.sin(t * 19 + phase) * 0.06;
    f1.scale.set(0.9 + f * 0.1, f, 0.9 + f * 0.1);
    f2.scale.set(0.95, 0.9 + f * 0.16, 0.95);
    glow.material.opacity = 0.2 + f * 0.08;
    g.rotation.z = Math.sin(t * 2.2 + phase) * 0.08;
  });
  return g;
}

function tapestry(parent, tex, w, h, pos, rotY = 0) {
  const g = new THREE.Group();
  g.position.set(pos[0], pos[1], pos[2]);
  g.rotation.y = rotY;
  parent.add(g);
  const mat = new THREE.MeshToonMaterial({
    map: tex, gradientMap: gradientMap(), side: THREE.DoubleSide,
  });
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
  m.castShadow = true;
  g.add(m);
  cyl(g, 0.035, 0.035, w + 0.25, P.woodDark, 0, h / 2 + 0.06, 0, {
    segments: 6, rot: [0, 0, Math.PI / 2],
  });
  for (const sx of [-1, 1]) {
    sphere(g, 0.06, P.gold, sx * (w / 2 + 0.13), h / 2 + 0.06, 0, { low: true });
  }
  return g;
}

function pointLight(parent, color, intensity, distance, pos) {
  const l = new THREE.PointLight(color, intensity, distance, 2);
  l.position.set(pos[0], pos[1], pos[2]);
  parent.add(l);
  return l;
}

function buildHearth(keep, lightOut) {
  const zc = 0.82;
  const group = new THREE.Group();
  group.position.set(LEFT + 0.28, 0, zc);
  keep.add(group);
  box(group, 0.72, 3.3, 1.85, P.stone, 0, 1.65, 0);
  box(group, 0.42, 0.9, 1.65, 0x3b302b, 0.17, 0.61, 0);
  box(group, 0.22, 1.7, 0.3, P.stoneLight, 0.28, 0.9, -0.84);
  box(group, 0.22, 1.7, 0.3, P.stoneLight, 0.28, 0.9, 0.84);
  box(group, 0.36, 0.28, 2.05, P.stoneLight, 0.23, 1.78, 0);
  box(group, 0.5, 0.15, 2.2, P.stoneDim, 0.2, 1.96, 0);
  box(group, 0.3, 0.1, 1.8, P.stoneDark, 0.2, 0.2, 0);
  const logMat = toon(P.woodDark);
  for (let i = 0; i < 3; i++) {
    const log = cyl(group, 0.07, 0.08, 0.85, logMat, 0.32, 0.27 + i * 0.02, -0.3 + i * 0.3, {
      segments: 6, rot: [Math.PI / 2, 0, 0.25],
    });
  }
  makeFlame(group, 0.38, 0.27, 0.05, 1.05);
  makeFlame(group, 0.38, 0.27, -0.35, 0.7);
  makeFlame(group, 0.38, 0.27, 0.38, 0.65);
  const light = pointLight(group, 0xffa15e, 3.2, 7, [0.7, 1.1, 0]);
  lightOut.push(light);
  const mantelObjects = [
    [-0.6, 'candle'], [0, 'ship'], [0.68, 'vase'],
  ];
  for (const [z, kind] of mantelObjects) {
    if (kind === 'candle') candle(group, 0.3, 2.05, z, 0.8);
    if (kind === 'ship') {
      box(group, 0.25, 0.05, 0.32, P.wood, 0.32, 2.08, z);
      cyl(group, 0.015, 0.02, 0.42, P.woodDark, 0.32, 2.3, z, { segments: 5 });
      const sail = new THREE.Mesh(
        new THREE.PlaneGeometry(0.22, 0.28),
        new THREE.MeshBasicMaterial({ color: 0xfff6e4, side: THREE.DoubleSide })
      );
      sail.position.set(0.32, 2.3, z + 0.06);
      group.add(sail);
    }
    if (kind === 'vase') {
      cyl(group, 0.06, 0.09, 0.2, P.lavender, 0.32, 2.13, z, { segments: 8 });
      for (let i = 0; i < 3; i++) {
        sphere(group, 0.04, P.rose, 0.32 + rnd(-0.08, 0.08), 2.3 + rnd(0, 0.1), z + rnd(-0.08, 0.08), { low: true });
      }
    }
  }
  box(group, 0.2, 0.12, 0.5, P.stoneLight, 0.32, 0.09, 0);
  return group;
}

function buildTable(keep) {
  const g = new THREE.Group();
  g.position.set(-0.1, FLOOR, -0.1);
  keep.add(g);
  const tableTopY = 0.78;
  box(g, 3.4, 0.12, 1.0, P.woodDark, 0, tableTopY, 0);
  box(g, 3.5, 0.025, 1.08, 0xfff7e6, 0, tableTopY + 0.07, 0);
  box(g, 3.54, 0.02, 0.05, P.gold, 0, tableTopY + 0.08, 0.51, { cast: false });
  box(g, 3.54, 0.02, 0.05, P.gold, 0, tableTopY + 0.08, -0.51, { cast: false });
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      box(g, 0.14, tableTopY, 0.14, P.woodDark, sx * 1.5, tableTopY / 2, sz * 0.38);
    }
  }
  for (const sz of [-1, 1]) {
    box(g, 3.1, 0.09, 0.3, P.wood, 0, 0.48, sz * 0.82);
    for (const sx of [-1.25, 0, 1.25]) {
      box(g, 0.1, 0.48, 0.22, P.woodDark, sx, 0.24, sz * 0.82);
    }
  }
  const tableY = tableTopY + 0.1;
  for (const x of [-1.15, 0.35]) {
    const cand = new THREE.Group();
    cand.position.set(x, tableY, -0.12);
    g.add(cand);
    cyl(cand, 0.08, 0.12, 0.04, P.goldDeep, 0, 0.02, 0, { segments: 10 });
    cyl(cand, 0.025, 0.035, 0.24, P.gold, 0, 0.16, 0, { segments: 8 });
    for (const a of [0, 2.1, 4.2]) {
      candle(cand, Math.cos(a) * 0.15, 0.28, Math.sin(a) * 0.15, 0.7);
    }
  }
  const dishes = [[-0.55, 0.3], [0.72, 0.3], [-0.38, -0.32], [0.88, -0.3]];
  for (const [x, z] of dishes) {
    cyl(g, 0.18, 0.16, 0.025, 0xf6e7cd, x, tableY + 0.02, z, { segments: 16 });
    const food = sphere(g, 0.075, rnd() > 0.5 ? 0xdba46c : 0xe7b0a5, x, tableY + 0.08, z, {
      scale: [1.25, 0.55, 1], low: true,
    });
    cyl(g, 0.025, 0.035, 0.15, P.gold, x + 0.26, tableY + 0.08, z - 0.08, { segments: 8 });
    const wine = cyl(g, 0.03, 0.024, 0.06, 0x9a4a54, x + 0.26, tableY + 0.13, z - 0.08, { segments: 8 });
  }
  cyl(g, 0.26, 0.22, 0.09, P.woodLight, 0, tableY + 0.05, 0.05, { segments: 14 });
  for (let i = 0; i < 5; i++) {
    sphere(g, 0.075, [0xd9a75d, 0xc98a51, 0xe0b86d][i % 3], rnd(-0.14, 0.14), tableY + 0.13, 0.05 + rnd(-0.12, 0.12), { low: true, scale: [1, 0.7, 1] });
  }
  const book = box(g, 0.4, 0.04, 0.3, 0x7a8a9e, 1.1, tableY + 0.04, 0.18);
  book.rotation.y = 0.3;
  box(g, 0.36, 0.02, 0.27, 0xfff7e7, 1.1, tableY + 0.065, 0.18, { rot: [0, 0.3, 0] });
  const map = new THREE.Mesh(
    new THREE.PlaneGeometry(0.65, 0.45),
    new THREE.MeshBasicMaterial({ color: 0xead6af, side: THREE.DoubleSide })
  );
  map.rotation.x = -Math.PI / 2;
  map.rotation.z = -0.2;
  map.position.set(-0.15, tableY + 0.033, 0.13);
  g.add(map);
  for (let i = 0; i < 7; i++) {
    const p = new THREE.Vector2(rnd(-0.28, 0.28), rnd(-0.17, 0.17));
    box(g, 0.02, 0.002, 0.02, 0x8b6a55, p.x, tableY + 0.035, 0.13 + p.y, { cast: false });
  }
  return g;
}

function buildThrone(keep) {
  const g = new THREE.Group();
  g.position.set(0.15, 0, -1.18);
  keep.add(g);
  box(g, 2.7, 0.16, 1.15, P.stoneDim, 0, FLOOR + 0.08, 0);
  box(g, 2.35, 0.16, 0.9, P.stoneLight, 0, FLOOR + 0.24, -0.09);
  box(g, 2.0, 0.16, 0.68, P.stoneDim, 0, FLOOR + 0.4, -0.2);
  const daisTop = FLOOR + 0.48;
  const seatY = daisTop + 0.48;
  box(g, 1.15, 0.45, 1.0, P.woodDark, 0, daisTop + 0.225, -0.15);
  box(g, 1.1, 0.1, 0.92, 0x9c5f64, 0, seatY + 0.03, 0.02);
  box(g, 1.1, 1.65, 0.16, P.woodDark, 0, daisTop + 1.12, -0.66);
  box(g, 0.94, 1.25, 0.09, 0xb56e72, 0, daisTop + 1.13, -0.56);
  for (let i = 0; i < 18; i++) {
    sphere(g, 0.06, P.gold, -0.45 + (i % 6) * 0.18, daisTop + 1.7 - Math.floor(i / 6) * 0.1, -0.51, { low: true, scale: [1, 1, 0.3] });
  }
  for (const sx of [-1, 1]) {
    box(g, 0.14, 0.5, 0.75, P.woodDark, sx * 0.55, seatY + 0.25, 0.06);
    sphere(g, 0.09, P.gold, sx * 0.55, seatY + 0.55, 0.4, { low: true });
    const post = cyl(g, 0.035, 0.045, 2.1, P.woodDark, sx * 0.72, daisTop + 1.05, -0.62, { segments: 6 });
    sphere(g, 0.08, P.gold, sx * 0.72, daisTop + 2.1, -0.72, { low: true });
  }
  box(g, 1.55, 0.09, 0.4, P.woodDark, 0, daisTop + 2.1, -0.62);
  const drape = new THREE.Mesh(
    new THREE.PlaneGeometry(1.35, 1.0, 8, 4),
    new THREE.MeshToonMaterial({ color: 0xb47076, side: THREE.DoubleSide, gradientMap: gradientMap() })
  );
  drape.position.set(0, daisTop + 1.65, -0.55);
  g.add(drape);
  box(g, 1.5, 0.04, 0.06, P.gold, 0, daisTop + 2.14, -0.62, { cast: false });
  return g;
}

function buildChandelier(keep, lightOut) {
  const root = new THREE.Group();
  root.position.set(0, 3.9, -0.15);
  keep.add(root);
  const swing = new THREE.Group();
  root.add(swing);
  cyl(swing, 0.012, 0.012, 0.5, P.iron, 0, -0.25, 0, { segments: 5 });
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.62, 0.028, 6, 28),
    toon(P.iron)
  );
  ring.rotation.x = Math.PI / 2;
  ring.position.y = -0.62;
  swing.add(ring);
  const ring2 = new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.018, 5, 22), toon(P.iron));
  ring2.rotation.x = Math.PI / 2;
  ring2.position.y = -0.52;
  swing.add(ring2);
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    const x = Math.cos(a) * 0.62;
    const z = Math.sin(a) * 0.62;
    cyl(swing, 0.015, 0.015, 0.22, P.iron, x, -0.5, z, { segments: 5 });
    candle(swing, x, -0.64, z, 0.62);
    cyl(swing, 0.015, 0.015, 0.3, P.iron, Math.cos(a) * 0.49, -0.48, Math.sin(a) * 0.49, {
      segments: 5, rot: [Math.sin(a) * 0.7, 0, Math.cos(a) * 0.7],
    });
  }
  glowSprite(swing, 0xffc77d, 2.1, 0, -0.55, 0, 0.16);
  const light = pointLight(swing, 0xffbe7d, 2.2, 6.5, [0, -0.6, 0]);
  lightOut.push(light);
  onFrame((t) => {
    swing.rotation.z = Math.sin(t * 0.55) * 0.025;
    swing.rotation.x = Math.cos(t * 0.42) * 0.02;
    light.intensity = 2.0 + Math.sin(t * 7.3) * 0.25 + Math.sin(t * 13.1) * 0.12;
  });
  return root;
}

function buildHarp(keep) {
  const g = new THREE.Group();
  g.position.set(-1.85, FLOOR, -1.5);
  g.rotation.y = 0.4;
  keep.add(g);
  box(g, 0.5, 0.1, 0.35, P.woodDark, 0, 0.05, 0);
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0.1, 0),
    new THREE.Vector3(-0.05, 0.75, 0.05),
    new THREE.Vector3(0.05, 1.3, 0.03),
    new THREE.Vector3(0.45, 1.5, 0),
    new THREE.Vector3(0.55, 1.2, -0.02),
  ]);
  const frame = new THREE.Mesh(new THREE.TubeGeometry(curve, 24, 0.03, 5, false), toon(P.goldDeep));
  frame.castShadow = true;
  g.add(frame);
  for (let i = 0; i < 7; i++) {
    const x = 0.07 + i * 0.06;
    cyl(g, 0.0035, 0.0035, 1.15 - i * 0.025, 0xfff3d7, x, 0.72 + i * 0.02, 0.02, { segments: 3, cast: false });
  }
  return g;
}

function buildUpperRoom(keep, lightOut) {
  const g = new THREE.Group();
  g.position.y = UPPER;
  keep.add(g);

  const rug = new THREE.Mesh(
    new THREE.CircleGeometry(1.65, 36),
    new THREE.MeshToonMaterial({ map: rugTexture('blue'), gradientMap: gradientMap() })
  );
  rug.rotation.x = -Math.PI / 2;
  rug.rotation.z = 0.3;
  rug.scale.set(1.15, 0.8, 1);
  rug.position.set(-0.3, 0.012, 0.55);
  rug.receiveShadow = true;
  g.add(rug);

  const bed = new THREE.Group();
  bed.position.set(-1.25, 0, -0.65);
  g.add(bed);
  box(bed, 1.7, 0.32, 2.2, P.woodDark, 0, 0.26, 0);
  box(bed, 1.55, 0.25, 2.0, 0xfff1de, 0, 0.48, 0);
  box(bed, 1.6, 0.1, 1.55, 0xb67a82, 0, 0.62, 0.22);
  box(bed, 1.58, 0.07, 0.5, 0xe9c9ab, 0, 0.66, -0.65);
  for (const sx of [-1, 1]) {
    box(bed, 0.6, 0.16, 0.34, P.cream, sx * 0.4, 0.68, -0.85, { rot: [0.1, 0, 0] });
  }
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      cyl(bed, 0.045, 0.06, 2.05, P.woodDark, sx * 0.8, 1.03, sz * 1.02, { segments: 6 });
      sphere(bed, 0.075, P.gold, sx * 0.8, 2.07, sz * 1.02, { low: true });
    }
  }
  box(bed, 1.75, 0.1, 2.25, P.woodDark, 0, 2.03, 0);
  box(bed, 1.5, 0.08, 2.0, P.rose, 0, 2.11, 0);
  for (const sx of [-1, 1]) {
    const drape = new THREE.Mesh(
      new THREE.PlaneGeometry(0.5, 1.5, 5, 6),
      new THREE.MeshToonMaterial({
        color: 0xe7b8b3, side: THREE.DoubleSide, transparent: true, opacity: 0.82,
        gradientMap: gradientMap(),
      })
    );
    drape.position.set(sx * 0.82, 1.32, 0.95);
    drape.rotation.y = sx * 0.25;
    bed.add(drape);
  }
  box(bed, 1.68, 0.22, 0.05, 0xb98287, 0, 1.88, 1.06);
  box(bed, 1.72, 0.035, 0.06, P.gold, 0, 1.75, 1.07, { cast: false });
  for (let i = 0; i < 7; i++) {
    sphere(bed, 0.045, P.gold, -0.72 + i * 0.24, 1.73, 1.09, { low: true, scale: [1, 1.4, 0.5] });
  }

  const nightstand = new THREE.Group();
  nightstand.position.set(-1.25, 0, 0.75);
  g.add(nightstand);
  box(nightstand, 0.5, 0.55, 0.45, P.wood, 0, 0.26, 0);
  box(nightstand, 0.54, 0.05, 0.49, P.woodLight, 0, 0.54, 0);
  candle(nightstand, 0, 0.57, 0, 0.75);
  const book = box(nightstand, 0.2, 0.03, 0.28, 0x88778c, 0.12, 0.58, 0.05);
  const glass = cyl(nightstand, 0.025, 0.035, 0.12, 0xd6e8e4, -0.12, 0.61, 0.03, { segments: 8, cast: false });

  const desk = new THREE.Group();
  desk.position.set(1.55, 0, -1.52);
  desk.rotation.y = -0.45;
  g.add(desk);
  box(desk, 1.1, 0.07, 0.65, P.wood, 0, 0.74, 0);
  for (const sx of [-1, 1]) {
    box(desk, 0.07, 0.7, 0.55, P.woodDark, sx * 0.47, 0.36, 0);
  }
  box(desk, 0.35, 0.04, 0.25, 0x9aa4b2, 0.1, 0.8, 0);
  const paper = box(desk, 0.36, 0.005, 0.27, 0xfff7e8, 0.08, 0.83, 0.02, { rot: [0, 0.15, 0] });
  cyl(desk, 0.008, 0.008, 0.3, P.woodDark, 0.2, 0.98, 0.05, { segments: 4, rot: [0, 0, -0.4] });
  sphere(desk, 0.025, P.cream, 0.26, 1.1, 0.05, { low: true });
  candle(desk, -0.3, 0.78, 0.08, 0.8);
  const chair = new THREE.Group();
  chair.position.set(1.25, 0, -0.65);
  chair.rotation.y = -0.35;
  g.add(chair);
  box(chair, 0.5, 0.08, 0.5, P.wood, 0, 0.45, 0);
  box(chair, 0.5, 0.7, 0.08, P.woodDark, 0, 0.82, -0.24);
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      box(chair, 0.05, 0.44, 0.05, P.woodDark, sx * 0.2, 0.22, sz * 0.2);
    }
  }

  const shelf = new THREE.Group();
  shelf.position.set(2.18, 0, -0.7);
  shelf.rotation.y = -Math.PI / 2;
  g.add(shelf);
  box(shelf, 1.4, 2.1, 0.34, P.woodDark, 0, 1.05, 0);
  for (let r = 0; r < 4; r++) {
    box(shelf, 1.25, 0.04, 0.28, P.wood, 0, 0.4 + r * 0.48, 0.02);
    let bx = -0.56;
    while (bx < 0.55) {
      const bw = rnd(0.05, 0.12);
      const bh = rnd(0.22, 0.36);
      const colors = [0x8d9f9e, 0xb58d8a, 0xc0aa7c, 0x8c88a5, 0xa7b58c, 0xc4a09b];
      box(shelf, bw, bh, 0.2, colors[Math.floor(rnd(0, colors.length))], bx + bw / 2, 0.42 + r * 0.48 + bh / 2, 0.04);
      bx += bw + 0.015;
    }
  }
  const globe = new THREE.Group();
  globe.position.set(1.45, 0, 0.82);
  g.add(globe);
  cyl(globe, 0.06, 0.09, 0.5, P.woodDark, 0, 0.25, 0, { segments: 8 });
  sphere(globe, 0.24, 0x9fb6bb, 0, 0.63, 0, { low: true });
  const globeRing = new THREE.Mesh(new THREE.TorusGeometry(0.29, 0.01, 4, 24), toon(P.goldDeep));
  globeRing.rotation.x = 0.5;
  globeRing.position.y = 0.63;
  globe.add(globeRing);

  const telescope = new THREE.Group();
  telescope.position.set(-1.55, 0, 1.2);
  telescope.rotation.y = -0.3;
  g.add(telescope);
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2;
    cyl(telescope, 0.02, 0.025, 0.9, P.woodDark, Math.cos(a) * 0.2, 0.4, Math.sin(a) * 0.2, {
      segments: 5, rot: [Math.sin(a) * 0.25, 0, -Math.cos(a) * 0.25],
    });
  }
  const scope = new THREE.Group();
  scope.position.y = 0.9;
  scope.rotation.x = -0.55;
  scope.rotation.y = 0.3;
  telescope.add(scope);
  cyl(scope, 0.07, 0.1, 0.9, P.goldDeep, 0, 0, 0, { segments: 10, rot: [Math.PI / 2, 0, 0] });
  cyl(scope, 0.09, 0.07, 0.25, P.gold, 0, 0, 0.52, { segments: 10, rot: [Math.PI / 2, 0, 0] });
  const lens = new THREE.Mesh(
    new THREE.CircleGeometry(0.085, 16),
    new THREE.MeshBasicMaterial({ color: 0xbfe2e8, transparent: true, opacity: 0.6 })
  );
  lens.position.z = 0.65;
  scope.add(lens);

  const trunk = box(g, 0.8, 0.5, 0.5, P.wood, 0.7, 0.25, 1.75);
  box(g, 0.84, 0.06, 0.54, P.woodDark, 0.7, 0.52, 1.75);
  box(g, 0.86, 0.08, 0.1, P.goldDeep, 0.7, 0.38, 1.72);

  for (const sx of [-1, 1]) {
    const railZ = FRONT - 0.02;
    box(g, 0.05, 0.9, 0.05, P.woodDark, sx * 2.14, 0.45, railZ);
    sphere(g, 0.06, P.gold, sx * 2.14, 0.94, railZ, { low: true });
  }
  box(g, 4.28, 0.05, 0.05, P.woodDark, 0, 0.87, FRONT - 0.02);
  box(g, 4.28, 0.04, 0.04, P.woodDark, 0, 0.46, FRONT - 0.02);
  for (let i = -4; i <= 4; i++) {
    box(g, 0.035, 0.45, 0.035, P.woodDark, i * 0.5, 0.66, FRONT - 0.02);
  }

  const mobile = new THREE.Group();
  mobile.position.set(-1.0, 2.75, 0.4);
  g.add(mobile);
  cyl(mobile, 0.012, 0.012, 0.7, P.iron, 0, 0.35, 0, { segments: 4 });
  const starCol = [P.butter, P.rose, P.water];
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    const px = Math.cos(a) * 0.55;
    const pz = Math.sin(a) * 0.55;
    cyl(mobile, 0.004, 0.004, 0.5, P.iron, px, 0.05, pz, { segments: 3, cast: false });
    const st = makeStar(mobile, 0.09, starCol[i % 3], px, -0.18, pz, 0, {});
    st.rotation.y = a;
    st.castShadow = true;
  }
  onFrame((t) => {
    mobile.rotation.y = t * 0.12;
    mobile.rotation.z = Math.sin(t * 0.4) * 0.05;
  });

  archedWindow(keep, 0.5, 1.25, [0.55, UPPER + 1.3, BACK - 0.008], 0, {
    color: 0xffdfb0, frame: P.stoneDim, bars: true,
  });

  const winLight = pointLight(g, 0xffcf98, 1.2, 5.0, [0.5, 2.2, 0.4]);
  lightOut.push(winLight);

  const cat = makeSleepingCat();
  cat.position.set(-1.25, 0.72, -0.4);
  cat.rotation.y = 0.7;
  g.add(cat);

  return g;
}

function makeSleepingCat() {
  const g = new THREE.Group();
  const body = sphere(g, 0.22, 0x9b938b, 0, 0.13, 0, { scale: [1.3, 0.65, 0.9] });
  const head = sphere(g, 0.13, 0x9b938b, 0.22, 0.18, 0.08, { low: true });
  cone(g, 0.05, 0.1, 0x8a827a, 0.2, 0.28, 0.06, { segments: 4 });
  cone(g, 0.05, 0.1, 0x8a827a, 0.29, 0.28, 0.1, { segments: 4 });
  const tail = new THREE.Mesh(
    new THREE.TorusGeometry(0.22, 0.035, 5, 16, Math.PI * 1.3),
    toon(0x9b938b)
  );
  tail.rotation.x = -Math.PI / 2;
  tail.rotation.z = -0.4;
  tail.position.set(-0.2, 0.06, -0.02);
  g.add(tail);
  return g;
}

export function buildInterior(keep) {
  const lights = [];

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(4.44, 4.08),
    new THREE.MeshToonMaterial({ map: cobbleTexture(), gradientMap: gradientMap(), color: 0xfff1df })
  );
  floor.material.map = cobbleTexture();
  floor.material.map.repeat.set(2.0, 1.8);
  floor.material.needsUpdate = true;
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, FLOOR + 0.012, 0.2);
  floor.receiveShadow = true;
  keep.add(floor);

  const rug = new THREE.Mesh(
    new THREE.CircleGeometry(2.2, 40),
    new THREE.MeshToonMaterial({ map: rugTexture('rose'), gradientMap: gradientMap() })
  );
  rug.rotation.x = -Math.PI / 2;
  rug.scale.set(1.05, 0.72, 1);
  rug.position.set(-0.15, FLOOR + 0.022, -0.15);
  rug.receiveShadow = true;
  keep.add(rug);

  const wallMat = toon(0xe8d6bd);
  box(keep, 0.16, 1.4, 4.2, P.wood, LEFT + 0.12, FLOOR + 0.7, 0.1, { cast: false });
  box(keep, 0.16, 1.4, 4.2, P.wood, RIGHT - 0.12, FLOOR + 0.7, 0.1, { cast: false });
  box(keep, 4.7, 1.4, 0.16, P.wood, 0, FLOOR + 0.7, BACK + 0.12, { cast: false });
  for (const sx of [-1, 1]) {
    box(keep, 0.2, 0.2, 4.15, P.woodDark, sx * 2.37, FLOOR + 1.42, 0.18, { cast: false });
    for (let i = 0; i < 5; i++) {
      box(keep, 0.06, 1.15, 0.06, P.woodDark, sx * 2.36, FLOOR + 0.76, -1.7 + i * 0.85, { cast: false });
    }
  }

  for (const z of [-1.1, 0.1, 1.3]) {
    box(keep, 4.62, 0.16, 0.2, P.woodDark, 0, 3.91, z, { cast: false });
  }
  box(keep, 4.62, 0.16, 0.23, P.woodDark, 0, 3.91, 2.05, { cast: false });

  archedWindow(keep, 0.5, 1.25, [LEFT + 0.02, 1.1, -0.55], Math.PI / 2, {
    color: 0xffd69b, frame: P.stoneDim, bars: true, glow: false,
  });
  archedWindow(keep, 0.55, 1.35, [RIGHT - 0.02, 1.1, -0.55], -Math.PI / 2, {
    color: 0xffd69b, frame: P.stoneDim, bars: true, glow: false,
  });

  const door = archedDoorway(keep, 0.7, 1.5, [RIGHT - 0.02, FLOOR, 1.5], -Math.PI / 2, 0x4a3728);
  const doorGlow = new THREE.Mesh(
    new THREE.PlaneGeometry(0.35, 1.05),
    new THREE.MeshBasicMaterial({ color: 0xffd59b, transparent: true, opacity: 0.32, toneMapped: false })
  );
  doorGlow.rotation.y = -Math.PI / 2;
  doorGlow.position.set(RIGHT - 0.04, FLOOR + 0.7, 1.5);
  keep.add(doorGlow);

  buildHearth(keep, lights);
  buildTable(keep);
  buildThrone(keep);
  buildChandelier(keep, lights);
  buildHarp(keep);

  tapestry(keep, tapestryTexture(0), 1.15, 1.85, [-1.45, 2.45, BACK + 0.01], 0);
  tapestry(keep, tapestryTexture(1), 1.2, 1.9, [1.55, 2.4, BACK + 0.01], 0);

  const armor = new THREE.Group();
  armor.position.set(2.1, FLOOR, 0.9);
  armor.rotation.y = -0.25;
  keep.add(armor);
  box(armor, 0.45, 0.08, 0.45, P.woodDark, 0, 0.04, 0);
  cyl(armor, 0.045, 0.055, 0.7, P.woodDark, 0, 0.4, 0, { segments: 6 });
  cyl(armor, 0.18, 0.24, 0.55, 0xb5c1ca, 0, 0.95, 0, { segments: 12 });
  sphere(armor, 0.075, 0xb5c1ca, -0.24, 1.16, 0, { low: true });
  sphere(armor, 0.075, 0xb5c1ca, 0.24, 1.16, 0, { low: true });
  const helm = sphere(armor, 0.17, 0xb5c1ca, 0, 1.4, 0, { scale: [1, 1.1, 1] });
  box(armor, 0.24, 0.05, 0.18, 0x3b3937, 0, 1.38, 0.1);
  cone(armor, 0.045, 0.2, P.roofRose, 0, 1.6, 0, { segments: 6 });
  const shield = makeStar(armor, 0.13, P.gold, 0, 1.02, 0.24, 0, {});
  const spear = cyl(armor, 0.015, 0.015, 1.75, P.wood, 0.36, 0.95, 0.08, { segments: 5 });
  cone(armor, 0.04, 0.2, P.stoneLight, 0.36, 1.92, 0.08, { segments: 6 });

  const cabinet = new THREE.Group();
  cabinet.position.set(1.9, FLOOR, -1.58);
  keep.add(cabinet);
  box(cabinet, 0.9, 1.0, 0.5, P.wood, 0, 0.5, 0);
  box(cabinet, 0.95, 0.06, 0.56, P.woodLight, 0, 1.02, 0);
  for (let i = 0; i < 2; i++) {
    box(cabinet, 0.35, 0.7, 0.03, P.woodDark, -0.22 + i * 0.44, 0.5, 0.26);
    sphere(cabinet, 0.035, P.gold, -0.22 + i * 0.44, 0.5, 0.29, { low: true });
  }
  cyl(cabinet, 0.09, 0.07, 0.25, P.lavender, -0.3, 1.17, 0, { segments: 8 });
  for (let i = 0; i < 4; i++) {
    sphere(cabinet, 0.04, P.lavender, -0.3 + rnd(-0.08, 0.08), 1.3 + rnd(0, 0.1), rnd(-0.08, 0.08), { low: true });
  }
  box(cabinet, 0.3, 0.04, 0.22, 0x8b6a55, 0.25, 1.07, 0.05);

  const stool = box(keep, 0.36, 0.08, 0.36, P.wood, -0.4, FLOOR + 0.38, 1.3);
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      box(keep, 0.045, 0.38, 0.045, P.woodDark, -0.4 + sx * 0.13, FLOOR + 0.19, 1.3 + sz * 0.13);
    }
  }

  const pot = new THREE.Group();
  pot.position.set(-2.05, FLOOR, 1.9);
  keep.add(pot);
  cyl(pot, 0.18, 0.13, 0.3, 0xb98f77, 0, 0.15, 0, { segments: 10 });
  for (let i = 0; i < 5; i++) {
    const leaf = sphere(pot, 0.16, i % 2 ? P.leaf : P.leafLight, rnd(-0.1, 0.1), 0.38 + rnd(0, 0.25), rnd(-0.1, 0.1), {
      scale: [0.5, 1.1, 0.35], rot: [rnd(-0.5, 0.5), rnd(0, 2), rnd(-0.4, 0.4)],
    });
  }

  const dog = new THREE.Group();
  dog.position.set(-1.75, FLOOR, 1.55);
  dog.rotation.y = 0.9;
  keep.add(dog);
  sphere(dog, 0.28, 0xc9a783, 0, 0.2, 0, { scale: [1.35, 0.65, 0.85] });
  sphere(dog, 0.15, 0xc9a783, -0.34, 0.29, 0.05, { low: true });
  sphere(dog, 0.08, 0xc9a783, -0.48, 0.22, 0.05, { low: true, scale: [1.4, 0.7, 0.8] });
  for (const s of [-1, 1]) {
    cone(dog, 0.05, 0.12, 0x8b6a55, -0.32, 0.36, 0.13 + s * 0.1, { segments: 4 });
  }
  const tail = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.04, 5, 12, Math.PI), toon(0xc9a783));
  tail.rotation.x = -Math.PI / 2;
  tail.position.set(0.3, 0.15, 0.05);
  dog.add(tail);
  const dogNose = sphere(dog, 0.035, 0x3b312b, -0.57, 0.25, 0.05, { low: true });

  buildUpperRoom(keep, lights);

  const ceiling = new THREE.Mesh(
    new THREE.PlaneGeometry(5.2, 4.4),
    new THREE.MeshToonMaterial({ color: 0x776354, gradientMap: gradientMap() })
  );
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.set(0, 7.35, 0.05);
  keep.add(ceiling);

  return { lights };
}
