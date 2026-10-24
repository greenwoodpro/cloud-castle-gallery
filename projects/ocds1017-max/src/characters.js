import * as THREE from 'three';
import {
  P, rnd, onFrame, gradientMap, box, sphere, cone, cyl, toon, basic,
  makePerson, glowSprite, starShape, LAYOUT,
} from './utils.js';
import { terrainHeight } from './terrain.js';

function addScarf(prince) {
  const geo = new THREE.PlaneGeometry(0.17, 1.0, 4, 10);
  geo.translate(0, -0.5, 0);
  const mat = new THREE.MeshToonMaterial({
    color: 0xe6a39c, side: THREE.DoubleSide, gradientMap: gradientMap(),
  });
  const scarf = new THREE.Mesh(geo, mat);
  scarf.position.set(0, 1.03, -0.1);
  scarf.rotation.x = 0.25;
  scarf.rotation.z = 0.1;
  scarf.castShadow = true;
  prince.add(scarf);
  const base = geo.attributes.position.array.slice();
  onFrame((t) => {
    const arr = geo.attributes.position.array;
    for (let i = 0; i < arr.length; i += 3) {
      const y = base[i + 1];
      const k = Math.min(1, -y);
      arr[i + 2] = Math.sin(t * 2.1 + y * 4.5) * 0.16 * k + 0.06 * k;
      arr[i] = base[i] + Math.sin(t * 1.5 + y * 3) * 0.08 * k;
    }
    geo.attributes.position.needsUpdate = true;
  });
}

function buildPrince(island) {
  const x = 7.75;
  const z = 8.6;
  const y = terrainHeight(x, z);
  const prince = makePerson({
    height: 0.94,
    outfit: 0xa9bd92,
    accent: P.gold,
    skin: 0xf7dbc4,
    hair: P.hairBlond,
    hairStyle: 'halo',
    pants: 0x77856f,
  });
  prince.position.set(x, y, z);
  const rosePos = new THREE.Vector3(LAYOUT.garden.x, 0, LAYOUT.garden.z);
  prince.rotation.y = Math.atan2(rosePos.x - x, rosePos.z - z) + 0.35;
  island.add(prince);
  addScarf(prince);
  const star = new THREE.Mesh(
    new THREE.ShapeGeometry(starShape(0.05, 0.022, 5)),
    new THREE.MeshBasicMaterial({ color: 0xf2d585, side: THREE.DoubleSide, toneMapped: false })
  );
  star.position.set(0.0, 0.72, 0.155);
  prince.add(star);
  const armWave = new THREE.Group();
  armWave.position.set(0.19, 0.85, 0);
  island.add(armWave);
  return prince;
}

function buildFox(island) {
  const x = 8.55;
  const z = 9.55;
  const y = terrainHeight(x, z);
  const g = new THREE.Group();
  g.position.set(x, y, z);
  island.add(g);
  const orange = 0xde9a61;
  const cream = 0xf6e7d4;
  const dark = 0x4e3b32;
  const body = sphere(g, 0.28, orange, 0, 0.3, 0, { scale: [0.85, 0.9, 1.0] });
  const haunch = sphere(g, 0.24, orange, -0.12, 0.22, -0.14, { scale: [0.95, 0.9, 1] });
  const chest = sphere(g, 0.17, cream, 0.07, 0.32, 0.2, { scale: [0.8, 1.05, 0.5] });
  const head = new THREE.Group();
  head.position.set(0.16, 0.62, 0.12);
  g.add(head);
  sphere(head, 0.19, orange, 0, 0, 0, { scale: [0.9, 0.95, 1] });
  sphere(head, 0.08, cream, 0.03, -0.04, 0.17, { scale: [1.25, 0.8, 1] });
  cone(head, 0.09, 0.2, cream, 0.15, -0.02, 0.22, { segments: 8, rot: [0, 0, -Math.PI / 2] });
  sphere(head, 0.027, dark, 0.25, -0.01, 0.24, { low: true });
  for (const sx of [-1, 1]) {
    cone(head, 0.08, 0.22, orange, sx * 0.12, 0.19, -0.02, { segments: 5, rot: [0, 0, sx * 0.2] });
    cone(head, 0.045, 0.14, cream, sx * 0.11, 0.2, 0.0, { segments: 5, rot: [0, 0, sx * 0.2] });
    const eye = sphere(head, 0.025, dark, sx * 0.1, 0.04, 0.16, { low: true });
  }
  const tailPts = [];
  for (let i = 0; i <= 8; i++) {
    const a = i * 0.5;
    tailPts.push(new THREE.Vector3(-0.2 - i * 0.06, 0.28 + Math.sin(i * 0.5) * 0.18 + i * 0.025, -0.18 - i * 0.09));
  }
  const tailCurve = new THREE.CatmullRomCurve3(tailPts);
  const tail = new THREE.Mesh(
    new THREE.TubeGeometry(tailCurve, 18, 0.115, 6, false),
    new THREE.MeshToonMaterial({ color: orange, gradientMap: gradientMap() })
  );
  tail.castShadow = true;
  g.add(tail);
  sphere(g, 0.13, cream, tailPts[8].x, tailPts[8].y, tailPts[8].z, { low: true });
  for (const sx of [-1, 1]) {
    for (const zz of [-0.18, 0.15]) {
      cyl(g, 0.035, 0.045, 0.3, dark, sx * 0.14, 0.13, zz, { segments: 5 });
    }
  }
  g.rotation.y = Math.atan2(7.75 - x, 8.6 - z);
  onFrame((t) => {
    head.rotation.y = Math.sin(t * 0.7) * 0.1;
  });
  return g;
}

function buildSheep(island, x, z, rotY, scale = 1) {
  const g = new THREE.Group();
  g.position.set(x, terrainHeight(x, z), z);
  g.rotation.y = rotY;
  g.scale.setScalar(scale);
  island.add(g);
  const wool = new THREE.MeshToonMaterial({ color: 0xf6f0e0, gradientMap: gradientMap() });
  const wool2 = new THREE.MeshToonMaterial({ color: 0xece2d0, gradientMap: gradientMap() });
  sphere(g, 0.3, wool, 0, 0.35, 0, { scale: [1.35, 0.9, 0.85] });
  sphere(g, 0.2, wool2, -0.22, 0.4, 0.05, { low: true });
  sphere(g, 0.19, wool, 0.22, 0.38, -0.03, { low: true });
  sphere(g, 0.17, wool2, 0.05, 0.47, 0.15, { low: true });
  const face = sphere(g, 0.12, 0x4d423b, 0.38, 0.36, 0.1, { scale: [0.9, 1, 0.9] });
  sphere(g, 0.05, 0x4d423b, 0.46, 0.33, 0.18, { low: true, scale: [1, 1, 0.8] });
  for (const sx of [-1, 1]) {
    const ear = sphere(g, 0.08, 0x51453e, 0.37 + rnd(-0.01, 0.01), 0.43, 0.1 + sx * 0.11, { low: true, scale: [1.4, 0.5, 0.7] });
    const eye = sphere(g, 0.018, 0xf4e8d4, 0.44, 0.38, 0.17 + sx * 0.05, { low: true });
  }
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      cyl(g, 0.035, 0.045, 0.25, 0x5a4a3e, sx * 0.17, 0.13, sz * 0.22, { segments: 5 });
      box(g, 0.08, 0.04, 0.09, 0x3d342d, sx * 0.17, 0.03, sz * 0.22 + 0.03);
    }
  }
  return g;
}

function buildSheepFlock(island) {
  buildSheep(island, 10.9, 3.1, -1.1, 1.0);
  buildSheep(island, 11.7, 4.0, -0.5, 0.85);
  buildSheep(island, 9.4, 4.3, 2.2, 0.95);
  buildSheep(island, 12.4, 5.5, 0.8, 0.75);
  const lamb = buildSheep(island, 10.1, 2.0, -2.4, 0.6);
}

function buildKing(keep) {
  const king = makePerson({
    height: 0.95,
    outfit: 0x7c6b9d,
    accent: P.gold,
    skin: 0xf0c9ab,
    hair: 0xeae4db,
    hairStyle: 'bald',
    crown: true,
    beard: true,
    seated: true,
    skirt: true,
    cape: 0x6f5d8f,
    pants: 0x5a4b72,
  });
  king.position.set(0.15, 0.64, -1.12);
  keep.add(king);
  const scepter = new THREE.Group();
  scepter.position.set(0.52, 1.0, 0.2);
  scepter.rotation.z = -0.25;
  king.add(scepter);
  cyl(scepter, 0.015, 0.02, 1.1, P.gold, 0, 0.5, 0, { segments: 6 });
  sphere(scepter, 0.07, P.goldDeep, 0, 1.08, 0, { low: true });
  sphere(scepter, 0.035, P.rose, 0, 1.18, 0, { low: true });
  const collar = new THREE.Mesh(new THREE.TorusGeometry(0.17, 0.04, 5, 16, Math.PI), toon(0xf3e1b4));
  collar.position.set(0, 1.02, 0);
  collar.rotation.x = -0.3;
  king.add(collar);
  return king;
}

function buildQueen(keep) {
  const queen = makePerson({
    height: 1.0,
    outfit: 0x6f9a9d,
    accent: 0xe9c97f,
    skin: 0xf7dbc3,
    hair: P.hairBrown,
    hairStyle: 'bun',
    crown: true,
    skirt: true,
    cape: 0x7fa9a8,
  });
  queen.position.set(1.5, 4.33, 1.55);
  queen.rotation.y = 0.25;
  keep.add(queen);
  const shawl = new THREE.Mesh(
    new THREE.PlaneGeometry(0.44, 0.55, 5, 5),
    new THREE.MeshToonMaterial({
      color: 0xdce9df, side: THREE.DoubleSide, transparent: true, opacity: 0.85,
      gradientMap: gradientMap(),
    })
  );
  shawl.position.set(0, 0.92, 0.13);
  shawl.rotation.x = -0.2;
  queen.add(shawl);
  const book = box(queen, 0.2, 0.035, 0.24, 0x8d6f7d, 0.25, 0.65, 0.15, { rot: [0, 0.2, -0.3] });
  return queen;
}

function buildKnight(castle) {
  const g = new THREE.Group();
  g.position.set(-1.35, 0.02, 5.5);
  g.rotation.y = 0.35;
  castle.add(g);
  const steel = 0xbac6cf;
  const steelDark = 0x8c9aa6;
  const gold = P.gold;
  for (const sx of [-1, 1]) {
    cyl(g, 0.075, 0.085, 0.62, steelDark, sx * 0.12, 0.31, 0, { segments: 8 });
    box(g, 0.16, 0.08, 0.25, 0x4d4a48, sx * 0.12, 0.04, 0.04);
  }
  cyl(g, 0.28, 0.32, 0.18, steel, 0, 0.63, 0, { segments: 10 });
  cyl(g, 0.28, 0.25, 0.62, steel, 0, 1.02, 0, { segments: 12 });
  sphere(g, 0.1, gold, 0, 1.22, 0.23, { low: true, scale: [1.2, 1.2, 0.4] });
  cyl(g, 0.25, 0.25, 0.07, gold, 0, 0.74, 0, { segments: 12 });
  for (const sx of [-1, 1]) {
    sphere(g, 0.14, steel, sx * 0.31, 1.25, 0, { low: true, scale: [1.1, 0.8, 1] });
    const arm = cyl(g, 0.06, 0.07, 0.52, steel, sx * 0.36, 0.99, 0, { segments: 8, rot: [0, 0, sx * 0.1] });
    sphere(g, 0.075, gold, sx * 0.38, 0.72, 0, { low: true });
  }
  cyl(g, 0.12, 0.14, 0.1, steelDark, 0, 1.34, 0, { segments: 10 });
  const helm = sphere(g, 0.18, steel, 0, 1.53, 0, { scale: [1, 1.08, 1.05] });
  box(g, 0.27, 0.055, 0.1, 0x33302e, 0, 1.53, 0.16);
  box(g, 0.05, 0.2, 0.05, 0x33302e, 0, 1.45, 0.185);
  cone(g, 0.06, 0.34, P.red, 0, 1.82, -0.03, { segments: 6, rot: [0.2, 0, 0.2] });
  for (let i = 0; i < 3; i++) {
    cone(g, 0.05, 0.22 - i * 0.04, P.rose, 0.02 + i * 0.04, 1.78 - i * 0.04, -0.08 - i * 0.04, { segments: 5, rot: [0.3, 0, 0.2] });
  }
  const spear = new THREE.Group();
  spear.position.set(0.44, 0.02, 0.06);
  g.add(spear);
  cyl(spear, 0.018, 0.023, 2.35, P.wood, 0, 1.2, 0, { segments: 5 });
  cone(spear, 0.06, 0.25, steel, 0, 2.47, 0, { segments: 8 });
  box(spear, 0.1, 0.05, 0.05, gold, 0, 2.33, 0);
  const shield = new THREE.Group();
  shield.position.set(-0.42, 1.0, 0.18);
  shield.rotation.y = 0.25;
  g.add(shield);
  const s = new THREE.Shape();
  s.moveTo(-0.25, 0.32);
  s.lineTo(0.25, 0.32);
  s.lineTo(0.25, 0);
  s.quadraticCurveTo(0.25, -0.28, 0, -0.42);
  s.quadraticCurveTo(-0.25, -0.28, -0.25, 0);
  s.closePath();
  const board = new THREE.Mesh(new THREE.ShapeGeometry(s), toon(0x7e9bb9));
  board.position.z = 0.03;
  shield.add(board);
  const border = new THREE.Mesh(new THREE.ShapeGeometry(s), toon(gold));
  border.scale.setScalar(1.12);
  border.position.z = 0.02;
  shield.add(border);
  const star = new THREE.Mesh(
    new THREE.ShapeGeometry(starShape(0.13, 0.055, 5)),
    new THREE.MeshBasicMaterial({ color: 0xf4dfa4, toneMapped: false, side: THREE.DoubleSide })
  );
  star.position.z = 0.045;
  shield.add(star);
  const sword = new THREE.Group();
  sword.position.set(-0.34, 0.2, -0.1);
  sword.rotation.z = 0.4;
  g.add(sword);
  box(sword, 0.04, 0.8, 0.04, steel, 0, 0.35, 0);
  box(sword, 0.3, 0.04, 0.06, gold, 0, 0.72, 0);
  onFrame((t) => {
    g.position.y = 0.02 + Math.sin(t * 0.8) * 0.006;
  });
  return g;
}

function buildMaid(castle) {
  const maid = makePerson({
    height: 0.9,
    outfit: 0x9a7362,
    accent: P.white,
    skin: 0xf4d4bd,
    hair: 0x7a5a44,
    hairStyle: 'bun',
    skirt: true,
    basket: true,
  });
  maid.position.set(2.95, 0.02, 2.85);
  maid.rotation.y = -1.6;
  castle.add(maid);
  const apron = new THREE.Mesh(
    new THREE.ShapeGeometry(new THREE.Shape([
      new THREE.Vector2(-0.16, 0), new THREE.Vector2(0.16, 0), new THREE.Vector2(0.19, 0.5),
      new THREE.Vector2(0, 0.55), new THREE.Vector2(-0.19, 0.5),
    ].map((v) => v))),
    basic(0xfbf4e6),
  );
  const apronShape = new THREE.Shape();
  apronShape.moveTo(-0.1, 0);
  apronShape.lineTo(0.1, 0);
  apronShape.lineTo(0.16, 0.52);
  apronShape.lineTo(0, 0.58);
  apronShape.lineTo(-0.16, 0.52);
  apronShape.closePath();
  const apron2 = new THREE.Mesh(new THREE.ShapeGeometry(apronShape), basic(0xfcf5e8));
  apron2.position.set(0, 0.18, 0.22);
  apron2.rotation.x = -0.13;
  maid.add(apron2);
  const cap = sphere(maid, 0.12, 0xfdf6e9, 0, 1.1, -0.01, { scale: [1.25, 0.4, 0.9] });
  for (let i = 0; i < 3; i++) {
    sphere(maid, 0.045, [P.butter, P.rose, P.cream][i], -0.11 + i * 0.1, 0.7, 0.2, { low: true });
  }
  return maid;
}

function buildBard(castle) {
  const bard = makePerson({
    height: 0.98,
    outfit: 0x8e7ba2,
    accent: P.rose,
    skin: 0xf2cdb3,
    hair: P.hairBrown,
    hairStyle: 'long',
    hat: 'feather',
    hatColor: 0x6b5668,
    tool: 'lute',
    pants: 0x5a4c5e,
  });
  bard.position.set(-4.35, 0.02, 5.75);
  bard.rotation.y = 1.25;
  castle.add(bard);
  const amp = 0.0;
  return bard;
}

function buildHorse(island) {
  const x = -8.55;
  const z = 3.0;
  const y = terrainHeight(x, z) + 0.02;
  const g = new THREE.Group();
  g.position.set(x, y, z);
  g.rotation.y = 1.9;
  island.add(g);
  const coat = 0xac7b57;
  const mane = 0xe4d3b7;
  sphere(g, 0.48, coat, 0, 0.92, 0, { scale: [1.5, 0.85, 0.75] });
  sphere(g, 0.3, coat, 0.62, 1.08, 0, { scale: [1, 1, 0.8] });
  const neck = cyl(g, 0.15, 0.22, 0.65, coat, 0.78, 1.38, 0, { segments: 9, rot: [0, 0, -0.55] });
  const head = sphere(g, 0.21, coat, 1.06, 1.66, 0, { scale: [1.25, 0.75, 0.65] });
  box(g, 0.32, 0.2, 0.2, coat, 1.16, 1.58, 0);
  sphere(g, 0.06, 0x4a3930, 1.2, 1.55, 0.1, { low: true });
  for (const sz of [-1, 1]) {
    cone(g, 0.06, 0.18, coat, 0.94, 1.83, sz * 0.1, { segments: 5 });
    sphere(g, 0.03, 0x2f2925, 1.08, 1.67, sz * 0.11, { low: true });
  }
  for (let i = 0; i < 6; i++) {
    sphere(g, 0.09, mane, 0.63 + i * 0.05, 1.22 + i * 0.09, 0, { low: true, scale: [0.7, 1.3, 0.5] });
  }
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      cyl(g, 0.055, 0.07, 0.78, coat, sx * 0.45, 0.42, sz * 0.28, { segments: 6 });
      box(g, 0.13, 0.07, 0.16, 0x4c3a2f, sx * 0.45, 0.05, sz * 0.28);
    }
  }
  const tailCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.75, 1.06, 0),
    new THREE.Vector3(-0.9, 0.8, 0.03),
    new THREE.Vector3(-0.92, 0.45, 0.06),
  ]);
  const tail = new THREE.Mesh(new THREE.TubeGeometry(tailCurve, 10, 0.07, 5, false), toon(mane));
  tail.castShadow = true;
  g.add(tail);
  box(g, 0.6, 0.08, 0.55, 0x8f5d48, 0, 1.28, 0);
  box(g, 0.52, 0.06, 0.3, 0x5d4032, 0, 1.33, 0);
  onFrame((t) => {
    head.rotation.y = Math.sin(t * 0.4) * 0.05;
    g.position.y = y + Math.sin(t * 0.6) * 0.01;
  });
  return g;
}

function buildChickens(castle) {
  const positions = [
    [3.45, 3.2, 1.2],
    [3.75, 2.8, -0.5],
    [-0.65, 3.35, 2.4],
  ];
  for (const [x, z, rot] of positions) {
    const g = new THREE.Group();
    g.position.set(x, 0.02, z);
    g.rotation.y = rot;
    castle.add(g);
    sphere(g, 0.13, 0xf7eedb, 0, 0.2, 0, { scale: [1.2, 0.9, 0.9] });
    sphere(g, 0.08, 0xf7eedb, 0.12, 0.31, 0, { low: true });
    cone(g, 0.03, 0.07, 0xe8a13f, 0.19, 0.31, 0, { segments: 4, rot: [0, 0, -Math.PI / 2] });
    for (let k = 0; k < 3; k++) {
      cone(g, 0.025, 0.07, 0xd36a65, 0.12 + (k % 2) * 0.02, 0.38, -0.03 + k * 0.03, { segments: 4 });
    }
    for (const sx of [-1, 1]) {
      cyl(g, 0.01, 0.012, 0.12, 0xd8a04a, sx * 0.06, 0.06, 0, { segments: 4 });
    }
    const beak = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.06, 4), toon(0xe8a13f));
    beak.rotation.z = -Math.PI / 2;
    beak.position.set(0.2, 0.31, 0);
    g.add(beak);
  }
}

function buildDucks(island) {
  const waterY = terrainHeight(LAYOUT.pond.x, LAYOUT.pond.z) + 0.12;
  const duck1 = new THREE.Group();
  duck1.position.set(-10.0, waterY + 0.04, 7.6);
  duck1.rotation.y = 1.0;
  island.add(duck1);
  const white = 0xf9f2e2;
  sphere(duck1, 0.16, white, 0, 0.12, 0, { scale: [1.5, 0.75, 0.9] });
  sphere(duck1, 0.09, white, 0.17, 0.25, 0, { low: true });
  cone(duck1, 0.03, 0.08, 0xe3a14c, 0.26, 0.24, 0, { segments: 4, rot: [0, 0, -Math.PI / 2] });
  for (const sx of [-1, 1]) {
    sphere(duck1, 0.015, 0x33302c, 0.2, 0.28, sx * 0.05, { low: true });
  }
  cone(duck1, 0.06, 0.16, white, -0.2, 0.16, 0, { segments: 4, rot: [0, 0, 0.9] });
  const duck2 = duck1.clone();
  duck2.position.set(-8.3, waterY + 0.04, 7.0);
  duck2.rotation.y = -2.0;
  island.add(duck2);
  onFrame((t) => {
    duck1.position.y = waterY + 0.04 + Math.sin(t * 1.1) * 0.012;
    duck2.position.y = waterY + 0.04 + Math.sin(t * 1.3 + 1) * 0.012;
    duck1.rotation.y = 1.0 + Math.sin(t * 0.3) * 0.1;
  });
}

function buildBirds(island) {
  const specs = [
    { radius: 12, height: 12, speed: 0.13, phase: 0, scale: 1 },
    { radius: 15, height: 14, speed: 0.1, phase: 2.1, scale: 1.2 },
    { radius: 17, height: 11, speed: 0.08, phase: 4.2, scale: 0.8 },
    { radius: 10, height: 16, speed: 0.16, phase: 1.1, scale: 0.9 },
    { radius: 19, height: 13, speed: 0.07, phase: 5.3, scale: 1.1 },
  ];
  const birds = [];
  for (const spec of specs) {
    const g = new THREE.Group();
    island.add(g);
    const bird = new THREE.Group();
    bird.scale.setScalar(spec.scale);
    g.add(bird);
    sphere(bird, 0.11, 0xf3eee4, 0, 0, 0, { scale: [1.5, 0.7, 0.7], low: true });
    sphere(bird, 0.065, 0xf3eee4, 0.13, 0.03, 0, { low: true });
    cone(bird, 0.022, 0.07, 0xddb367, 0.19, 0.02, 0, { segments: 4, rot: [0, 0, -Math.PI / 2] });
    const wings = [];
    for (const sx of [-1, 1]) {
      const wingPivot = new THREE.Group();
      wingPivot.position.set(0.0, 0.04, sx * 0.05);
      bird.add(wingPivot);
      const shape = new THREE.Shape();
      shape.moveTo(0, 0);
      shape.quadraticCurveTo(0.15, 0.1, 0.42, 0.02);
      shape.quadraticCurveTo(0.22, -0.04, 0.02, -0.04);
      shape.closePath();
      const wing = new THREE.Mesh(
        new THREE.ShapeGeometry(shape),
        new THREE.MeshBasicMaterial({ color: 0xf6f0e4, side: THREE.DoubleSide, toneMapped: false })
      );
      wing.rotation.x = Math.PI / 2;
      wing.rotation.y = sx > 0 ? -Math.PI / 2 : Math.PI / 2;
      wingPivot.add(wing);
      wings.push({ pivot: wingPivot, side: sx, mesh: wing });
    }
    birds.push({ group: g, bird, wings, spec });
  }
  onFrame((t) => {
    for (const b of birds) {
      const a = t * b.spec.speed + b.spec.phase;
      b.group.position.set(Math.cos(a) * b.spec.radius - 1, b.spec.height + Math.sin(t * 0.4 + b.spec.phase) * 0.6, Math.sin(a) * b.spec.radius - 2);
      b.group.rotation.y = -a + Math.PI / 2;
      const flap = Math.sin(t * 7 + b.spec.phase) * 0.65;
      for (const w of b.wings) {
        w.pivot.rotation.z = w.side * flap;
        w.pivot.rotation.x = 0.1;
      }
    }
  });
}

function buildButterflies(island) {
  const colors = [0xf2b6b7, 0xf4dfa4, 0xcbb9e2];
  for (let i = 0; i < 3; i++) {
    const g = new THREE.Group();
    island.add(g);
    const body = cyl(g, 0.008, 0.008, 0.08, 0x6f5f52, 0, 0, 0, { segments: 4 });
    const wings = [];
    for (const sx of [-1, 1]) {
      const pivot = new THREE.Group();
      pivot.position.set(0, 0.01, 0);
      g.add(pivot);
      const shape = new THREE.Shape();
      shape.moveTo(0, 0);
      shape.bezierCurveTo(0.12, 0.15, 0.24, 0.06, 0.2, -0.06);
      shape.bezierCurveTo(0.15, -0.16, 0.04, -0.08, 0, 0);
      const wing = new THREE.Mesh(
        new THREE.ShapeGeometry(shape),
        new THREE.MeshBasicMaterial({ color: colors[i], side: THREE.DoubleSide, toneMapped: false })
      );
      wing.rotation.x = -Math.PI / 2;
      wing.scale.x = sx;
      pivot.add(wing);
      wings.push({ pivot, sx });
    }
    const cx = 7 + i * 1.2;
    const cz = 8.3 + i * 0.8;
    const phase = rnd(0, 6);
    onFrame((t) => {
      const a = t * 0.5 + phase;
      const x = cx + Math.cos(a) * (1.2 + i * 0.2);
      const z = cz + Math.sin(a * 0.8) * 1.0;
      const y = terrainHeight(x, z) + 1.3 + Math.sin(t * 1.2 + i) * 0.35;
      g.position.set(x, y, z);
      g.rotation.y = -a + Math.PI / 2;
      for (const w of wings) {
        w.pivot.rotation.z = w.sx * (0.45 + Math.sin(t * 14 + phase) * 0.5);
      }
    });
  }
}

function buildKiteBoy(island) {
  const x = -6.2;
  const z = 13.2;
  const y = terrainHeight(x, z);
  const boy = makePerson({
    height: 0.72,
    outfit: 0xd8a77f,
    accent: 0xf3e3c5,
    skin: 0xf5d4ba,
    hair: 0x7a5a44,
    hairStyle: 'short',
    pants: 0x7f8f9e,
  });
  boy.position.set(x, y, z);
  boy.rotation.y = 0.4;
  island.add(boy);
  const kitePos = new THREE.Vector3(x + 2.1, y + 5.0, z - 1.2);
  const kite = new THREE.Group();
  kite.position.copy(kitePos);
  kite.rotation.z = 0.18;
  island.add(kite);
  const diamond = new THREE.Shape();
  diamond.moveTo(0, 0.45);
  diamond.lineTo(0.34, 0);
  diamond.lineTo(0, -0.45);
  diamond.lineTo(-0.34, 0);
  diamond.closePath();
  const face = new THREE.Mesh(
    new THREE.ShapeGeometry(diamond),
    new THREE.MeshBasicMaterial({ color: 0xe8a09d, side: THREE.DoubleSide, toneMapped: false })
  );
  kite.add(face);
  const cross = new THREE.Mesh(
    new THREE.ShapeGeometry(diamond),
    new THREE.MeshBasicMaterial({ color: 0xfff3dd, side: THREE.DoubleSide, toneMapped: false })
  );
  cross.scale.setScalar(0.45);
  cross.position.z = 0.01;
  kite.add(cross);
  for (let i = 0; i < 3; i++) {
    const bow = box(kite, 0.14, 0.04, 0.01, i % 2 ? P.rose : P.butter, 0, -0.5 - i * 0.18, 0, { cast: false });
    bow.rotation.z = i % 2 ? 0.4 : -0.4;
  }
  const stringCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(x + 0.2, y + 0.8, z + 0.1),
    new THREE.Vector3(x + 0.7, y + 2.4, z - 0.5),
    kitePos.clone().add(new THREE.Vector3(0, -0.3, 0)),
  ]);
  const string = new THREE.Mesh(
    new THREE.TubeGeometry(stringCurve, 20, 0.007, 3, false),
    basic(0xf1e7d4)
  );
  island.add(string);
  onFrame((t) => {
    kite.position.y = kitePos.y + Math.sin(t * 0.7) * 0.2;
    kite.rotation.z = 0.18 + Math.sin(t * 0.5) * 0.06;
    kite.rotation.y = Math.sin(t * 0.3) * 0.1;
  });
  return boy;
}

export function buildCharacters(island, castle, keep) {
  buildPrince(island);
  buildFox(island);
  buildSheepFlock(island);
  buildKing(keep);
  buildQueen(keep);
  buildKnight(castle);
  buildMaid(castle);
  buildBard(castle);
  buildHorse(island);
  buildChickens(castle);
  buildDucks(island);
  buildBirds(island);
  buildButterflies(island);
  buildKiteBoy(island);
}
