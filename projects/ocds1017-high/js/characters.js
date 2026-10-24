import * as THREE from 'three';
import { PALETTE, box, sphere, cylinder, cone, capsuleBetween } from './core.js';

export const characterAnimators = [];

const M = {
  skin: new THREE.MeshStandardMaterial({ color: 0xf2cdb4, roughness: 0.9 }),
  skin2: new THREE.MeshStandardMaterial({ color: 0xe7b69c, roughness: 0.9 }),
  hairGold: new THREE.MeshStandardMaterial({ color: 0xdfb95f, roughness: 0.82 }),
  hairBrown: new THREE.MeshStandardMaterial({ color: 0x8a6148, roughness: 0.9 }),
  hairDark: new THREE.MeshStandardMaterial({ color: 0x4d3935, roughness: 0.9 }),
  green: new THREE.MeshStandardMaterial({ color: 0x71916f, roughness: 0.92 }),
  greenPale: new THREE.MeshStandardMaterial({ color: 0x94ab87, roughness: 0.92 }),
  cream: new THREE.MeshStandardMaterial({ color: 0xf3e7d2, roughness: 0.94 }),
  red: new THREE.MeshStandardMaterial({ color: 0xbc5d62, roughness: 0.9 }),
  redPale: new THREE.MeshStandardMaterial({ color: 0xd88a86, roughness: 0.9 }),
  blue: new THREE.MeshStandardMaterial({ color: 0x7f96ad, roughness: 0.9 }),
  blueDeep: new THREE.MeshStandardMaterial({ color: 0x5f7289, roughness: 0.9 }),
  purple: new THREE.MeshStandardMaterial({ color: 0x8c739a, roughness: 0.9 }),
  brown: new THREE.MeshStandardMaterial({ color: 0x7d5b45, roughness: 0.94 }),
  dark: new THREE.MeshStandardMaterial({ color: 0x423d3e, roughness: 0.82 }),
  black: new THREE.MeshStandardMaterial({ color: 0x2f2c2d, roughness: 0.7 }),
  white: new THREE.MeshStandardMaterial({ color: 0xf9f3e6, roughness: 0.92 }),
  gold: new THREE.MeshStandardMaterial({ color: 0xe4b767, roughness: 0.4, metalness: 0.55 }),
  silver: new THREE.MeshStandardMaterial({ color: 0xc9c6c0, roughness: 0.3, metalness: 0.7 }),
  iron: new THREE.MeshStandardMaterial({ color: 0x6f6a68, roughness: 0.45, metalness: 0.65 }),
  fox: new THREE.MeshStandardMaterial({ color: 0xcd8150, roughness: 0.92 }),
  foxPale: new THREE.MeshStandardMaterial({ color: 0xefdcc2, roughness: 0.92 }),
  foxDark: new THREE.MeshStandardMaterial({ color: 0x62483f, roughness: 0.9 }),
  rose: new THREE.MeshStandardMaterial({ color: 0xce5f6f, roughness: 0.72 }),
  rosePale: new THREE.MeshStandardMaterial({ color: 0xef9ea7, roughness: 0.75 }),
  stem: new THREE.MeshStandardMaterial({ color: 0x718e6e, roughness: 0.9 }),
  sheep: new THREE.MeshStandardMaterial({ color: 0xf6efdf, roughness: 1 }),
  flame: new THREE.MeshBasicMaterial({ color: 0xffc06d, transparent: true, opacity: 0.95 }),
  glass: new THREE.MeshPhysicalMaterial({
    color: 0xe4f2f4, roughness: 0.035, transparent: true, opacity: 0.24,
    side: THREE.DoubleSide, depthWrite: false, clearcoat: 1, clearcoatRoughness: 0.03,
  }),
  apron: new THREE.MeshStandardMaterial({ color: 0xf1e5d1, roughness: 0.96 }),
};

const rand = (a, b) => a + Math.random() * (b - a);

function addEyes(head, y, z, spread = 0.075, scale = 1) {
  const eL = sphere(0.022 * scale, M.dark, -spread, y, z, 5);
  const eR = sphere(0.022 * scale, M.dark, spread, y, z, 5);
  head.add(eL, eR);
}

function makeStandingPerson(opts = {}) {
  const {
    height = 1.6, robe = M.green, robe2 = null, skin = M.skin,
    hair = M.hairGold, hairStyle = 'cap', hat = null,
    showLegs = true, legMat = M.brown, shoeMat = M.dark,
    arms = 'down', eyeScale = 1,
  } = opts;
  const g = new THREE.Group();
  const s = height / 1.6;

  if (showLegs) {
    const legL = capsuleBetween(new THREE.Vector3(-0.085, 0.5, 0), new THREE.Vector3(-0.085, 0.04, 0), 0.055, legMat);
    const legR = capsuleBetween(new THREE.Vector3(0.085, 0.5, 0), new THREE.Vector3(0.085, 0.04, 0), 0.055, legMat);
    g.add(legL, legR);
    g.add(box(0.14, 0.08, 0.26, shoeMat, -0.09, 0.04, 0.06));
    g.add(box(0.14, 0.08, 0.26, shoeMat, 0.09, 0.04, 0.06));
  }

  const body = cylinder(0.17, 0.27, 0.62, robe, 0, 0.88, 0, 10);
  g.add(body);
  if (robe2) {
    const over = cylinder(0.19, 0.31, 0.25, robe2, 0, 0.63, 0, 10);
    g.add(over);
  }
  const collar = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.035, 5, 12), robe2 || robe);
  collar.rotation.x = Math.PI / 2;
  collar.position.y = 1.18;
  g.add(collar);

  const head = new THREE.Group();
  head.position.y = 1.36;
  const skull = sphere(0.21, skin, 0, 0, 0, 12);
  skull.scale.set(0.95, 1.05, 0.95);
  head.add(skull);
  addEyes(head, 0.025, 0.19, 0.07, eyeScale);
  const nose = sphere(0.028, skin, 0, -0.01, 0.205, 5);
  head.add(nose);

  if (hairStyle === 'cap') {
    const cap = sphere(0.215, hair, 0, 0.045, -0.018, 12);
    cap.scale.set(1.02, 0.95, 1.0);
    cap.position.y = 0.055;
    head.add(cap);
    const fringe = box(0.22, 0.07, 0.08, hair, 0, 0.12, 0.18);
    head.add(fringe);
  } else if (hairStyle === 'long') {
    const cap = sphere(0.225, hair, 0, 0.04, -0.02, 12);
    cap.scale.set(1.03, 1.0, 1.02);
    head.add(cap);
    const back = box(0.32, 0.38, 0.12, hair, 0, -0.16, -0.16);
    head.add(back);
    const fringe = box(0.24, 0.08, 0.08, hair, 0, 0.12, 0.18);
    head.add(fringe);
  } else if (hairStyle === 'bald') {
    const fringe = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.025, 4, 12, Math.PI), hair);
    fringe.rotation.x = -Math.PI / 2;
    fringe.rotation.z = Math.PI;
    fringe.position.set(0, 0.08, -0.02);
    head.add(fringe);
  } else if (hairStyle === 'spiky') {
    for (let i = 0; i < 7; i++) {
      const a = (i / 7) * Math.PI * 2;
      const spike = cone(0.07, 0.18, hair, Math.cos(a) * 0.16, 0.16 + (i % 2) * 0.05, Math.sin(a) * 0.14, 5);
      spike.rotation.z = Math.cos(a) * 0.55;
      spike.rotation.x = -Math.sin(a) * 0.55;
      head.add(spike);
    }
    const cap = sphere(0.21, hair, 0, 0.045, 0, 10);
    head.add(cap);
  }

  if (hat === 'cook') {
    const brim = cylinder(0.24, 0.26, 0.06, M.white, 0, 0.2, 0, 12);
    const puff = sphere(0.22, M.white, 0, 0.36, 0, 10);
    puff.scale.set(1, 0.75, 1);
    head.add(brim, puff);
  } else if (hat === 'wizard') {
    const brim = cylinder(0.29, 0.3, 0.05, M.blueDeep, 0, 0.18, 0, 12);
    const top = cone(0.24, 0.72, M.blueDeep, 0, 0.55, 0, 12);
    top.rotation.z = -0.1;
    head.add(brim, top);
  }
  g.add(head);

  const armMat = robe;
  if (arms === 'down') {
    const armL = capsuleBetween(new THREE.Vector3(-0.17, 1.12, 0), new THREE.Vector3(-0.25, 0.68, 0.08), 0.045, armMat);
    const armR = capsuleBetween(new THREE.Vector3(0.17, 1.12, 0), new THREE.Vector3(0.25, 0.68, 0.08), 0.045, armMat);
    g.add(armL, armR);
    g.add(sphere(0.05, skin, -0.25, 0.66, 0.08, 6), sphere(0.05, skin, 0.25, 0.66, 0.08, 6));
  } else if (arms === 'out') {
    const armL = capsuleBetween(new THREE.Vector3(-0.17, 1.1, 0), new THREE.Vector3(-0.42, 0.95, 0.1), 0.045, armMat);
    const armR = capsuleBetween(new THREE.Vector3(0.17, 1.1, 0), new THREE.Vector3(0.42, 0.95, 0.1), 0.045, armMat);
    g.add(armL, armR);
  } else if (arms === 'up') {
    const armL = capsuleBetween(new THREE.Vector3(-0.17, 1.12, 0), new THREE.Vector3(-0.32, 1.5, 0.08), 0.045, armMat);
    const armR = capsuleBetween(new THREE.Vector3(0.17, 1.12, 0), new THREE.Vector3(0.34, 1.42, 0.12), 0.045, armMat);
    g.add(armL, armR);
    g.add(sphere(0.05, skin, -0.33, 1.52, 0.08, 6), sphere(0.05, skin, 0.35, 1.44, 0.12, 6));
  }
  g.scale.setScalar(s);
  return g;
}

export function createCook() {
  const g = makeStandingPerson({
    height: 1.5, robe: M.cream, robe2: M.apron, hair: M.hairBrown, hairStyle: 'cap',
    hat: 'cook', eyeScale: 0.8,
  });
  const spoon = cylinder(0.022, 0.022, 0.7, M.wood, 0.24, 1.02, 0.16, 5);
  spoon.rotation.z = -0.4;
  g.add(spoon);
  const ladle = sphere(0.09, M.iron, 0.38, 0.72, 0.22, 6);
  ladle.scale.y = 0.5;
  g.add(ladle);
  return g;
}

export function createScholar(seated = true) {
  const g = new THREE.Group();
  if (seated) {
    g.add(cylinder(0.24, 0.36, 0.42, M.blueDeep, 0, 0.62, 0, 10));
    const legL = capsuleBetween(new THREE.Vector3(-0.1, 0.45, 0), new THREE.Vector3(-0.1, 0.16, 0.35), 0.06, M.blueDeep);
    const legR = capsuleBetween(new THREE.Vector3(0.1, 0.45, 0), new THREE.Vector3(0.1, 0.16, 0.35), 0.06, M.blueDeep);
    g.add(legL, legR);
    g.add(box(0.14, 0.08, 0.26, M.dark, -0.1, 0.08, 0.46));
    g.add(box(0.14, 0.08, 0.26, M.dark, 0.1, 0.08, 0.46));
    const torso = cylinder(0.18, 0.25, 0.5, M.blue, 0, 1.02, 0, 10);
    g.add(torso);
    const head = new THREE.Group();
    head.position.y = 1.42;
    head.add(sphere(0.21, M.skin, 0, 0, 0, 12));
    addEyes(head, 0.02, 0.19, 0.07, 0.9);
    const hair = sphere(0.215, M.hairDark, 0, 0.05, -0.01, 10);
    head.add(hair);
    head.add(box(0.16, 0.16, 0.08, M.hairDark, 0, 0.02, 0.18));
    const glasses = new THREE.Mesh(new THREE.TorusGeometry(0.07, 0.011, 4, 10), M.gold);
    glasses.position.set(-0.075, 0.02, 0.2);
    const glasses2 = glasses.clone();
    glasses2.position.x = 0.075;
    head.add(glasses, glasses2);
    const bridge = box(0.06, 0.012, 0.012, M.gold, 0, 0.02, 0.205);
    head.add(bridge);
    g.add(head);
    const armL = capsuleBetween(new THREE.Vector3(-0.18, 1.18, 0), new THREE.Vector3(-0.22, 0.78, 0.42), 0.045, M.blue);
    const armR = capsuleBetween(new THREE.Vector3(0.18, 1.18, 0), new THREE.Vector3(0.22, 0.78, 0.42), 0.045, M.blue);
    g.add(armL, armR);
    const book = box(0.5, 0.04, 0.34, M.cream, 0, 0.82, 0.44);
    book.rotation.x = 0.4;
    g.add(book);
    const page = box(0.44, 0.01, 0.28, M.white, 0, 0.84, 0.45);
    page.rotation.x = 0.4;
    g.add(page);
  } else {
    const p = makeStandingPerson({ height: 1.55, robe: M.blue, hair: M.hairDark, hairStyle: 'long' });
    g.add(p);
  }
  return g;
}

export function createKing() {
  const g = new THREE.Group();
  const robe = cylinder(0.25, 0.48, 1.15, M.purple, 0, 0.58, 0, 12);
  g.add(robe);
  const robeTrim = cylinder(0.46, 0.5, 0.11, M.gold, 0, 0.06, 0, 12);
  g.add(robeTrim);
  const torso = cylinder(0.22, 0.27, 0.55, M.red, 0, 1.32, 0, 10);
  g.add(torso);
  const fur = cylinder(0.3, 0.3, 0.16, M.white, 0, 1.61, 0, 10);
  g.add(fur);
  const head = new THREE.Group();
  head.position.y = 1.9;
  head.add(sphere(0.22, M.skin, 0, 0, 0, 12));
  addEyes(head, 0.02, 0.2, 0.07, 0.9);
  const beard = cone(0.16, 0.38, M.white, 0, -0.2, 0.11, 8);
  beard.rotation.x = Math.PI;
  head.add(beard);
  const crownBand = cylinder(0.17, 0.18, 0.17, M.gold, 0, 0.22, 0, 10);
  head.add(crownBand);
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    const spike = cone(0.05, 0.18, M.gold, Math.cos(a) * 0.16, 0.39, Math.sin(a) * 0.16, 5);
    head.add(spike);
  }
  head.add(sphere(0.045, M.red, 0, 0.31, 0.17, 5));
  g.add(head);
  const armL = capsuleBetween(new THREE.Vector3(-0.25, 1.4, 0), new THREE.Vector3(-0.42, 0.95, 0.22), 0.05, M.purple);
  const armR = capsuleBetween(new THREE.Vector3(0.25, 1.4, 0), new THREE.Vector3(0.42, 0.95, 0.22), 0.05, M.purple);
  g.add(armL, armR);
  const scepter = cylinder(0.025, 0.025, 1.15, M.gold, 0.42, 1.5, 0.26, 5);
  scepter.rotation.z = -0.1;
  g.add(scepter);
  g.add(sphere(0.09, M.gold, 0.47, 2.08, 0.26, 8));
  return g;
}

export function createPage() {
  const g = makeStandingPerson({
    height: 1.25, robe: M.blueDeep, robe2: M.gold, hair: M.hairBrown, hairStyle: 'cap', skin: M.skin2,
  });
  const tray = cylinder(0.26, 0.26, 0.04, M.gold, 0.22, 0.95, 0.25, 12);
  g.add(tray);
  g.add(sphere(0.1, M.ceramic, 0.22, 1.02, 0.25, 6));
  return g;
}

export function createKnight() {
  const g = new THREE.Group();
  const legL = capsuleBetween(new THREE.Vector3(-0.1, 0.52, 0), new THREE.Vector3(-0.1, 0.04, 0), 0.065, M.silver);
  const legR = capsuleBetween(new THREE.Vector3(0.1, 0.52, 0), new THREE.Vector3(0.1, 0.04, 0), 0.065, M.silver);
  g.add(legL, legR);
  g.add(box(0.16, 0.09, 0.28, M.iron, -0.1, 0.04, 0.05));
  g.add(box(0.16, 0.09, 0.28, M.iron, 0.1, 0.04, 0.05));
  const body = cylinder(0.2, 0.27, 0.7, M.silver, 0, 0.92, 0, 10);
  g.add(body);
  g.add(box(0.32, 0.4, 0.05, M.blueDeep, 0, 1.0, -0.23));
  const head = new THREE.Group();
  head.position.y = 1.46;
  const helmet = sphere(0.23, M.silver, 0, 0, 0, 10);
  helmet.scale.set(1, 1.1, 1);
  head.add(helmet);
  const visor = box(0.3, 0.08, 0.05, M.dark, 0, 0.02, 0.21);
  head.add(visor);
  const plume = cone(0.14, 0.42, M.red, 0, 0.32, -0.04, 7);
  plume.rotation.x = -0.3;
  head.add(plume);
  g.add(head);
  const armL = capsuleBetween(new THREE.Vector3(-0.2, 1.18, 0), new THREE.Vector3(-0.3, 0.8, 0.16), 0.055, M.silver);
  const armR = capsuleBetween(new THREE.Vector3(0.2, 1.18, 0), new THREE.Vector3(0.32, 0.8, 0.16), 0.055, M.silver);
  g.add(armL, armR);
  const shield = new THREE.Group();
  shield.position.set(-0.38, 0.92, 0.18);
  shield.rotation.y = 0.3;
  const shieldMesh = cylinder(0.34, 0.34, 0.06, M.blueDeep, 0, 0, 0, 6);
  shieldMesh.rotation.x = Math.PI / 2;
  shield.add(shieldMesh);
  const boss = sphere(0.09, M.gold, 0, 0, 0.05, 6);
  shield.add(boss);
  const crescent = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.025, 4, 12, Math.PI * 1.2), M.gold);
  crescent.position.z = 0.06;
  shield.add(crescent);
  g.add(shield);
  const sword = new THREE.Group();
  sword.position.set(0.37, 0.9, 0.18);
  sword.rotation.z = -0.18;
  sword.add(box(0.06, 0.9, 0.02, M.silver, 0, 0.3, 0));
  sword.add(box(0.26, 0.05, 0.06, M.gold, 0, -0.18, 0));
  sword.add(cylinder(0.03, 0.03, 0.2, M.brown, 0, -0.3, 0, 5));
  g.add(sword);
  return g;
}

export function createCat() {
  const g = new THREE.Group();
  const body = sphere(0.28, M.dark, 0, 0.28, 0, 10);
  body.scale.set(1.2, 0.75, 1.55);
  g.add(body);
  const head = sphere(0.18, M.dark, 0.22, 0.4, 0.18, 10);
  g.add(head);
  for (const x of [0.16, 0.28]) {
    const ear = cone(0.07, 0.15, M.dark, x, 0.56, 0.14, 5);
    g.add(ear);
  }
  for (const z of [0.25, 0.52]) {
    const eye = box(0.06, 0.012, 0.012, M.white, 0.26, 0.43, z * 0.6 + 0.1);
    eye.rotation.z = 0.1;
    g.add(eye);
  }
  const nose = sphere(0.025, M.redPale, 0.36, 0.4, 0.31, 5);
  g.add(nose);
  const tail = new THREE.Mesh(new THREE.TorusGeometry(0.27, 0.05, 5, 16, Math.PI * 1.4), M.dark);
  tail.rotation.x = Math.PI / 2;
  tail.rotation.z = 0.5;
  tail.position.set(0.1, 0.2, -0.22);
  g.add(tail);
  return g;
}

export function createDog() {
  const g = new THREE.Group();
  const body = sphere(0.22, M.brown, 0, 0.28, 0, 8);
  body.scale.set(1.0, 0.8, 1.55);
  g.add(body);
  const head = sphere(0.16, M.brown, 0.05, 0.5, 0.3, 8);
  g.add(head);
  const earL = sphere(0.07, M.brown, -0.1, 0.57, 0.25, 5);
  const earR = earL.clone();
  earR.position.x = 0.2;
  g.add(earL, earR);
  const nose = sphere(0.04, M.dark, 0.05, 0.48, 0.45, 5);
  g.add(nose);
  for (const [x, z] of [[-0.12, 0.2], [0.14, 0.2], [-0.12, -0.22], [0.14, -0.22]]) {
    g.add(cylinder(0.035, 0.035, 0.28, M.brown, x, 0.14, z, 5));
  }
  const tail = cylinder(0.035, 0.02, 0.32, M.brown, 0.03, 0.42, -0.36, 5);
  tail.rotation.x = 0.7;
  g.add(tail);
  return g;
}

export function createChicken() {
  const g = new THREE.Group();
  const body = sphere(0.2, M.white, 0, 0.24, 0, 8);
  body.scale.set(0.9, 1.0, 1.2);
  g.add(body);
  const head = sphere(0.12, M.white, 0.05, 0.47, 0.12, 7);
  g.add(head);
  const beak = cone(0.04, 0.11, M.gold, 0.05, 0.44, 0.24, 5);
  beak.rotation.x = Math.PI / 2;
  g.add(beak);
  const comb = sphere(0.05, M.red, 0.05, 0.57, 0.1, 5);
  comb.scale.set(0.7, 0.8, 1.6);
  g.add(comb);
  for (const x of [-0.07, 0.07]) {
    g.add(cylinder(0.018, 0.018, 0.18, M.gold, x, 0.09, 0, 4));
  }
  return g;
}

export function createHorse() {
  const g = new THREE.Group();
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0xb98d6c, roughness: 0.9 });
  const maneMat = new THREE.MeshStandardMaterial({ color: 0x69503f, roughness: 0.95 });
  const body = sphere(0.48, bodyMat, 0, 1.15, 0, 10);
  body.scale.set(0.85, 0.8, 1.7);
  g.add(body);
  const neck = capsuleBetween(new THREE.Vector3(0, 1.35, 0.55), new THREE.Vector3(0, 1.9, 0.9), 0.2, bodyMat);
  g.add(neck);
  const head = sphere(0.25, bodyMat, 0, 2.0, 1.0, 8);
  head.scale.set(0.75, 0.7, 1.4);
  g.add(head);
  const muzzle = sphere(0.16, bodyMat, 0, 1.9, 1.25, 8);
  muzzle.scale.set(0.8, 0.75, 1.0);
  g.add(muzzle);
  for (const x of [-0.1, 0.1]) {
    const ear = cone(0.06, 0.2, bodyMat, x, 2.22, 0.85, 5);
    g.add(ear);
  }
  const mane = box(0.12, 0.6, 0.16, maneMat, 0, 1.78, 0.73);
  mane.rotation.x = -0.6;
  g.add(mane);
  for (const [x, z] of [[-0.28, 0.55], [0.28, 0.55], [-0.28, -0.5], [0.28, -0.5]]) {
    g.add(cylinder(0.075, 0.07, 1.0, bodyMat, x, 0.55, z, 6));
  }
  const tail = cylinder(0.06, 0.02, 0.9, maneMat, 0, 0.92, -0.85, 5);
  tail.rotation.x = -0.35;
  g.add(tail);
  return g;
}

export function createLamplighter() {
  const g = makeStandingPerson({
    height: 1.55, robe: M.blueDeep, robe2: M.gold, hair: M.hairBrown, hairStyle: 'cap', arms: 'out',
  });
  const pole = cylinder(0.03, 0.03, 2.2, M.iron, 0.5, 1.25, 0.1, 6);
  g.add(pole);
  const lamp = new THREE.Group();
  lamp.position.set(0.5, 2.36, 0.1);
  lamp.add(box(0.28, 0.36, 0.28, M.iron, 0, 0, 0));
  const glass = box(0.22, 0.29, 0.22, new THREE.MeshBasicMaterial({ color: 0xffd58e }), 0, 0, 0);
  lamp.add(glass);
  lamp.add(cone(0.23, 0.18, M.iron, 0, 0.26, 0, 4));
  const halo = new THREE.PointLight(0xffbd6e, 12, 9, 2);
  halo.position.set(0, 0, 0);
  lamp.add(halo);
  g.add(lamp);
  characterAnimators.push((t) => {
    halo.intensity = 10 + Math.sin(t * 4.1) * 2;
  });
  return g;
}

export function createVillager(variant = 0) {
  const robes = [M.greenPale, M.rose, M.blue, M.cream];
  const hairs = [M.hairBrown, M.hairDark, M.hairGold, M.hairBrown];
  const g = makeStandingPerson({
    height: 1.45 + variant * 0.03,
    robe: robes[variant % robes.length],
    robe2: variant === 1 ? M.cream : M.redPale,
    hair: hairs[variant % hairs.length],
    hairStyle: variant === 1 ? 'long' : 'cap',
    skin: variant === 2 ? M.skin2 : M.skin,
  });
  if (variant === 0) {
    const basket = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.035, 4, 12), M.wood);
    basket.rotation.x = Math.PI / 2;
    basket.position.set(0.3, 0.9, 0.1);
    g.add(basket);
    for (let i = 0; i < 4; i++) {
      g.add(sphere(0.09, i % 2 ? M.red : M.gold, 0.3 + (i - 1.5) * 0.08, 0.96, 0.1 + (i % 2) * 0.06, 5));
    }
  } else if (variant === 3) {
    const staff = cylinder(0.025, 0.03, 1.9, M.woodDark, -0.3, 0.95, 0.15, 5);
    g.add(staff);
  }
  return g;
}

export function createSheep() {
  const g = new THREE.Group();
  const body = new THREE.Group();
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * Math.PI * 2;
    const puff = sphere(0.24, M.sheep, Math.cos(a) * 0.2, 0.52 + (i % 2) * 0.08, Math.sin(a) * 0.28, 7);
    body.add(puff);
  }
  g.add(body);
  const head = sphere(0.17, M.dark, 0.38, 0.55, 0.05, 8);
  head.scale.set(1.1, 0.9, 0.85);
  g.add(head);
  const earL = sphere(0.06, M.dark, 0.3, 0.65, 0.14, 5);
  const earR = earL.clone();
  earR.position.z = -0.1;
  g.add(earL, earR);
  const face = sphere(0.11, M.sheep, 0.46, 0.58, 0.05, 6);
  face.scale.set(0.7, 0.8, 0.9);
  g.add(face);
  addEyes(head, 0.03, 0.15, 0.06, 0.7);
  for (const [x, z] of [[-0.17, 0.16], [-0.17, -0.18], [0.18, 0.16], [0.18, -0.18]]) {
    g.add(cylinder(0.035, 0.032, 0.35, M.dark, x, 0.2, z, 4));
  }
  return g;
}

export function createFox() {
  const g = new THREE.Group();
  const body = sphere(0.32, M.fox, 0, 0.55, 0, 10);
  body.scale.set(0.9, 1.2, 0.8);
  g.add(body);
  const chest = sphere(0.22, M.foxPale, 0, 0.52, 0.2, 8);
  chest.scale.set(0.8, 1.0, 0.5);
  g.add(chest);
  const head = new THREE.Group();
  head.position.set(0, 1.02, 0.11);
  const skull = sphere(0.25, M.fox, 0, 0, 0, 10);
  skull.scale.set(1, 0.9, 1.05);
  head.add(skull);
  const snout = sphere(0.14, M.foxPale, 0, -0.08, 0.19, 8);
  snout.scale.set(0.9, 0.7, 1.3);
  head.add(snout);
  const nose = sphere(0.04, M.foxDark, 0, -0.07, 0.34, 5);
  head.add(nose);
  for (const x of [-0.12, 0.12]) {
    const ear = cone(0.1, 0.3, M.fox, x, 0.23, -0.02, 5);
    ear.rotation.z = x > 0 ? -0.18 : 0.18;
    head.add(ear);
    const inner = cone(0.055, 0.17, M.foxPale, x, 0.24, 0.01, 5);
    head.add(inner);
  }
  addEyes(head, 0.03, 0.2, 0.075, 1.1);
  g.add(head);
  for (const x of [-0.14, 0.14]) {
    const leg = capsuleBetween(new THREE.Vector3(x, 0.4, 0.12), new THREE.Vector3(x, 0.04, 0.18), 0.055, M.foxDark);
    g.add(leg);
  }
  const tail = new THREE.Group();
  tail.position.set(0.05, 0.38, -0.35);
  const tailGeo = new THREE.CylinderGeometry(0.11, 0.22, 0.85, 8);
  const tailMesh = new THREE.Mesh(tailGeo, M.fox);
  tailMesh.rotation.z = 0.8;
  tailMesh.rotation.x = 0.2;
  tailMesh.position.set(0.2, 0.3, -0.1);
  tail.add(tailMesh);
  const tailTip = sphere(0.2, M.foxPale, 0.52, 0.56, -0.15, 8);
  tail.add(tailTip);
  g.add(tail);
  characterAnimators.push((t) => {
    tail.rotation.y = Math.sin(t * 0.9) * 0.16;
    head.rotation.z = Math.sin(t * 0.5) * 0.04;
  });
  return g;
}

export function createPrince() {
  const g = new THREE.Group();
  const legL = capsuleBetween(new THREE.Vector3(-0.08, 0.48, 0), new THREE.Vector3(-0.08, 0.03, 0), 0.052, M.cream);
  const legR = capsuleBetween(new THREE.Vector3(0.08, 0.48, 0), new THREE.Vector3(0.08, 0.03, 0), 0.052, M.cream);
  g.add(legL, legR);
  g.add(box(0.14, 0.07, 0.24, M.brown, -0.08, 0.035, 0.05));
  g.add(box(0.14, 0.07, 0.24, M.brown, 0.08, 0.035, 0.05));
  const coat = cylinder(0.16, 0.24, 0.55, M.green, 0, 0.82, 0, 10);
  g.add(coat);
  const coatTrim = cylinder(0.245, 0.25, 0.08, M.gold, 0, 0.56, 0, 10);
  g.add(coatTrim);
  const cape = cone(0.27, 0.8, M.greenPale, 0, 0.85, -0.12, 10);
  cape.rotation.x = Math.PI;
  g.add(cape);
  const head = new THREE.Group();
  head.position.y = 1.27;
  head.add(sphere(0.2, M.skin, 0, 0, 0, 12));
  addEyes(head, 0.025, 0.18, 0.068, 1.0);
  const nose = sphere(0.025, M.skin, 0, -0.01, 0.195, 5);
  head.add(nose);
  const hair = sphere(0.21, M.hairGold, 0, 0.055, -0.01, 10);
  head.add(hair);
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * Math.PI * 2;
    const spike = cone(0.06, 0.17, M.hairGold, Math.cos(a) * 0.15, 0.18, Math.sin(a) * 0.13, 5);
    spike.rotation.z = Math.cos(a) * 0.6;
    spike.rotation.x = -Math.sin(a) * 0.6;
    head.add(spike);
  }
  g.add(head);
  const scarfMat = new THREE.MeshStandardMaterial({ color: 0xd5686d, roughness: 0.8, side: THREE.DoubleSide });
  const scarf = new THREE.Mesh(new THREE.TorusGeometry(0.155, 0.045, 5, 12), scarfMat);
  scarf.rotation.x = Math.PI / 2;
  scarf.position.y = 1.14;
  g.add(scarf);
  const tail = new THREE.Group();
  const tailMesh = box(0.14, 0.035, 0.75, scarfMat, 0, 0, 0.36);
  tail.add(tailMesh);
  tail.position.set(-0.1, 1.12, -0.12);
  tail.rotation.y = 0.35;
  g.add(tail);
  const armL = capsuleBetween(new THREE.Vector3(-0.16, 1.0, 0), new THREE.Vector3(-0.28, 0.72, 0.18), 0.042, M.green);
  const armR = capsuleBetween(new THREE.Vector3(0.16, 1.0, 0), new THREE.Vector3(0.3, 0.85, 0.22), 0.042, M.green);
  g.add(armL, armR);
  g.add(sphere(0.045, M.skin, -0.29, 0.7, 0.19, 5), sphere(0.045, M.skin, 0.31, 0.83, 0.23, 5));
  g.scale.setScalar(1.05);
  characterAnimators.push((t) => {
    tail.rotation.y = 0.35 + Math.sin(t * 0.85) * 0.2;
    tail.rotation.x = Math.sin(t * 1.3) * 0.05;
  });
  return g;
}

export function createRoseDome() {
  const g = new THREE.Group();
  const stand = new THREE.Group();
  stand.add(cylinder(0.56, 0.72, 0.28, M.gold, 0, 0.14, 0, 12));
  stand.add(cylinder(0.38, 0.46, 0.5, M.cream, 0, 0.52, 0, 12));
  stand.add(cylinder(0.58, 0.5, 0.16, M.gold, 0, 0.84, 0, 12));
  g.add(stand);

  const rose = new THREE.Group();
  rose.position.y = 0.92;
  const stem = cylinder(0.03, 0.04, 0.9, M.stem, 0, 0.45, 0, 6);
  rose.add(stem);
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2;
    const leaf = sphere(0.12, M.stem, Math.cos(a) * 0.13, 0.35 + i * 0.18, Math.sin(a) * 0.13, 6);
    leaf.scale.set(1.6, 0.35, 0.6);
    leaf.rotation.y = a;
    rose.add(leaf);
  }
  for (let layer = 0; layer < 3; layer++) {
    const count = 5 + layer * 2;
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2 + layer * 0.4;
      const petal = sphere(0.11 - layer * 0.015, layer === 2 ? M.rosePale : M.rose, Math.cos(a) * (0.13 - layer * 0.02), 0.95 + layer * 0.06, Math.sin(a) * (0.13 - layer * 0.02), 7);
      petal.scale.set(0.9, 1.55, 0.55);
      petal.rotation.y = a;
      petal.rotation.z = 0.25;
      rose.add(petal);
    }
  }
  rose.add(sphere(0.09, M.rosePale, 0, 1.07, 0, 8));
  g.add(rose);
  characterAnimators.push((t) => {
    rose.rotation.z = Math.sin(t * 0.55) * 0.025;
    rose.rotation.y = t * 0.03;
  });

  const dome = new THREE.Mesh(new THREE.SphereGeometry(1.0, 24, 18, 0, Math.PI * 2, 0, Math.PI * 0.62), M.glass);
  dome.position.y = 0.92;
  g.add(dome);
  const innerDome = new THREE.Mesh(
    new THREE.SphereGeometry(0.93, 20, 14, 0, Math.PI * 2, 0, Math.PI * 0.6),
    new THREE.MeshBasicMaterial({ color: 0xf7ffff, transparent: true, opacity: 0.055, side: THREE.BackSide, depthWrite: false }),
  );
  innerDome.position.y = 0.92;
  g.add(innerDome);
  for (let i = 0; i < 4; i++) {
    const rib = new THREE.Mesh(new THREE.TorusGeometry(0.985, 0.012, 4, 24, Math.PI), M.gold);
    rib.position.y = 0.94;
    rib.rotation.y = (i / 4) * Math.PI;
    g.add(rib);
  }
  const rim = new THREE.Mesh(new THREE.TorusGeometry(0.95, 0.035, 5, 28), M.gold);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.96;
  g.add(rim);
  const waist = new THREE.Mesh(new THREE.TorusGeometry(0.65, 0.012, 4, 24), M.gold);
  waist.rotation.x = Math.PI / 2;
  waist.position.y = 1.18;
  g.add(waist);
  const finial = sphere(0.1, M.gold, 0, 1.94, 0, 8);
  g.add(finial);

  const emblem = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.035, 4, 14, Math.PI * 1.35), M.gold);
  emblem.position.set(0.55, 0.52, 0.37);
  emblem.rotation.y = 0.5;
  emblem.rotation.z = 0.6;
  g.add(emblem);
  for (let i = 0; i < 8; i++) {
    const leaf = sphere(0.055, M.stem, 0.52 + rand(-0.25, 0.25), 0.3 + i * 0.06, 0.42, 5);
    leaf.scale.set(0.6, 1.5, 0.4);
    leaf.castShadow = false;
    g.add(leaf);
  }
  return g;
}

export function createButterfly(color = 0xf1c9c9) {
  const g = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.8, side: THREE.DoubleSide });
  const wingGeo = new THREE.CircleGeometry(0.12, 8);
  const wl = new THREE.Mesh(wingGeo, mat);
  const wr = new THREE.Mesh(wingGeo, mat);
  wl.scale.set(0.8, 1.3, 1);
  wr.scale.set(0.8, 1.3, 1);
  wl.position.x = -0.12;
  wr.position.x = 0.12;
  wl.rotation.y = 0.8;
  wr.rotation.y = -0.8;
  const body = capsuleBetween(new THREE.Vector3(0, -0.08, 0), new THREE.Vector3(0, 0.1, 0), 0.025, M.dark);
  g.add(wl, wr, body);
  characterAnimators.push((t) => {
    wl.rotation.y = 0.8 + Math.sin(t * 14) * 0.5;
    wr.rotation.y = -0.8 - Math.sin(t * 14) * 0.5;
    g.position.y += Math.sin(t * 1.5) * 0.001;
  });
  return g;
}
