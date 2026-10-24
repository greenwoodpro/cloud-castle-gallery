import * as THREE from 'three';
import {
  PAL,
  mat,
  box,
  cyl,
  cone,
  sph,
  ico,
  torus,
  capsule,
  outline,
  makeBanner,
  glowSprite,
  shadowAll,
  canvasTexture,
} from './utils.js';
import { heightAt as islandHeight } from './island.js';

/* ------------------------------------------------------------------ *
 *  人物工厂：极简、圆润的小王子插画比例
 * ------------------------------------------------------------------ */
function eye(x, y, z, parent, r = 0.022) {
  const e = sph(r, 0x3b3335, { seg: 6, seg2: 5, castShadow: false });
  e.position.set(x, y, z);
  parent.add(e);
  return e;
}

export function makePerson(p = {}) {
  const s = p.scale ?? 1;
  const g = new THREE.Group();
  const skin = p.skin ?? PAL.skin;
  const hair = p.hair ?? PAL.hair;
  const coat = p.coat ?? PAL.coat;
  const pants = p.pants ?? 0x7f7668;
  const boot = p.boot ?? 0x6f5a46;
  const legY = 0.38;

  // 腿
  for (const sx of [-1, 1]) {
    const leg = cyl(0.07, 0.065, 0.72, pants, 7);
    leg.position.set(sx * 0.1, legY, 0);
    g.add(leg);
    const b = box(0.16, 0.13, 0.24, boot);
    b.position.set(sx * 0.1, 0.065, 0.03);
    g.add(b);
  }

  // 身体 / 外套
  const coatLen = p.longCoat ? 0.95 : 0.7;
  const body = cyl(0.18, p.longCoat ? 0.3 : 0.23, coatLen, coat, 10);
  body.position.y = 0.74 + coatLen / 2;
  g.add(body);
  if (p.trim) {
    const trim = cyl(0.185, p.longCoat ? 0.31 : 0.24, 0.07, p.trim, 10, { castShadow: false });
    trim.position.y = 0.74;
    g.add(trim);
  }

  // 手臂
  for (const sx of [-1, 1]) {
    const arm = cyl(0.045, 0.05, 0.62, coat, 6);
    arm.position.set(sx * 0.23, 1.1, 0);
    arm.rotation.z = sx * (p.armAngle ?? 0.16);
    g.add(arm);
    const hand = sph(0.055, skin, { seg: 7, seg2: 6 });
    hand.position.set(sx * 0.28, 0.8, 0);
    g.add(hand);
  }

  // 头
  const head = sph(0.21, skin, { seg: 14, seg2: 11 });
  head.position.y = 1.56;
  g.add(head);
  outline(head, 0x4d4659, 1.07, 0.5);

  // 头发（半球帽）
  const hairCap = sph(0.215, hair, { seg: 14, seg2: 10 });
  hairCap.scale.set(1.02, 0.78, 1.03);
  hairCap.position.set(0, 1.62, -0.015);
  g.add(hairCap);
  // 刘海
  const fringe = sph(0.2, hair, { seg: 10, seg2: 8 });
  fringe.scale.set(1, 0.32, 0.55);
  fringe.position.set(0, 1.69, 0.14);
  g.add(fringe);

  // 五官
  eye(-0.075, 1.58, 0.2, g, 0.027);
  eye(0.075, 1.58, 0.2, g, 0.027);
  const nose = sph(0.02, skin, { seg: 5, seg2: 4, castShadow: false });
  nose.position.set(0, 1.53, 0.215);
  g.add(nose);
  const mouth = new THREE.Mesh(
    new THREE.TorusGeometry(0.035, 0.008, 4, 8, Math.PI),
    new THREE.MeshBasicMaterial({ color: 0xb87878 })
  );
  mouth.position.set(0, 1.47, 0.2);
  mouth.rotation.z = Math.PI;
  g.add(mouth);

  // 小王子式的金色卷发（几撮）
  if (p.spikyHair) {
    for (let i = 0; i < 7; i++) {
      const a = (i / 7) * Math.PI * 2;
      const spike = cone(0.05, 0.16, hair, 5, { castShadow: false });
      spike.position.set(Math.cos(a) * 0.13, 1.76 + Math.sin(i * 1.7) * 0.03, Math.sin(a) * 0.13 - 0.02);
      spike.rotation.z = Math.cos(a) * 0.5;
      spike.rotation.x = -Math.sin(a) * 0.5;
      g.add(spike);
    }
  }

  // 围巾
  if (p.scarf) {
    const scarf = torus(0.14, 0.045, p.scarf, { radial: 6, tubular: 14 });
    scarf.rotation.x = Math.PI / 2;
    scarf.position.y = 1.34;
    g.add(scarf);
    const tail = makeBanner(0.16, 0.5, p.scarf);
    tail.position.set(0.13, 1.2, -0.13);
    tail.rotation.y = Math.PI;
    g.add(tail);
    g.userData.scarf = tail;
  }

  // 帽子 / 王冠 / 头盔
  if (p.hat === 'crown') {
    const band = cyl(0.17, 0.18, 0.13, PAL.gold, 10);
    band.position.y = 1.78;
    g.add(band);
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      const point = cone(0.05, 0.16, PAL.gold, 5);
      point.position.set(Math.cos(a) * 0.14, 1.91, Math.sin(a) * 0.14);
      g.add(point);
      const jewel = sph(0.03, [PAL.red, PAL.blue, PAL.rose][i % 3], { seg: 5, seg2: 4, castShadow: false });
      jewel.position.set(Math.cos(a) * 0.16, 1.81, Math.sin(a) * 0.16);
      g.add(jewel);
    }
  } else if (p.hat === 'helmet') {
    const helm = sph(0.235, 0xb9b9c4, { seg: 12, seg2: 10 });
    helm.position.y = 1.6;
    g.add(helm);
    const visor = box(0.3, 0.08, 0.2, 0x6f6c78);
    visor.position.set(0, 1.57, 0.16);
    g.add(visor);
    const slit = box(0.24, 0.02, 0.02, 0x2f2b33, { castShadow: false });
    slit.position.set(0, 1.6, 0.27);
    g.add(slit);
    const crest = cone(0.08, 0.35, PAL.red, 6);
    crest.position.set(0, 1.87, -0.02);
    g.add(crest);
  } else if (p.hat === 'chef') {
    const brim = cyl(0.2, 0.2, 0.06, PAL.cream, 12);
    brim.position.y = 1.75;
    g.add(brim);
    const puff = sph(0.19, PAL.cream, { seg: 10, seg2: 8 });
    puff.scale.set(1.1, 0.8, 1.1);
    puff.position.y = 1.9;
    g.add(puff);
  } else if (p.hat === 'hood') {
    const hood = cone(0.25, 0.45, p.coat ?? PAL.lavender, 9);
    hood.position.y = 1.72;
    hood.rotation.x = -0.1;
    g.add(hood);
  } else if (p.hat === 'cap') {
    const cap = cyl(0.22, 0.22, 0.08, p.hatColor ?? PAL.blue, 10);
    cap.position.y = 1.75;
    g.add(cap);
    const peak = box(0.22, 0.03, 0.16, p.hatColor ?? PAL.blue, { castShadow: false });
    peak.position.set(0, 1.73, 0.18);
    g.add(peak);
  }

  // 斗篷
  if (p.cape) {
    const cape = new THREE.Mesh(
      new THREE.ConeGeometry(0.36, 1.05, 8, 1, true),
      new THREE.MeshToonMaterial({ color: p.cape, side: THREE.DoubleSide })
    );
    cape.position.set(0, 1.12, -0.02);
    cape.scale.z = 0.55;
    cape.castShadow = true;
    g.add(cape);
    const trim = new THREE.Mesh(
      new THREE.ConeGeometry(0.37, 0.16, 8, 1, true),
      new THREE.MeshToonMaterial({ color: p.capeTrim ?? PAL.cream, side: THREE.DoubleSide })
    );
    trim.position.set(0, 0.62, -0.02);
    trim.scale.z = 0.55;
    g.add(trim);
  }

  // 胡须
  if (p.beard) {
    const b = sph(0.13, p.beard, { seg: 9, seg2: 7 });
    b.scale.set(0.8, 1.2, 0.6);
    b.position.set(0, 1.42, 0.13);
    g.add(b);
  }

  // 手持物
  if (p.hold) {
    p.hold(g);
  }

  g.scale.setScalar(s);
  g.traverse((o) => {
    if (o.isMesh) {
      o.castShadow = true;
      o.receiveShadow = true;
    }
  });
  return g;
}

/* ------------------------------------------------------------------ *
 *  小王子
 * ------------------------------------------------------------------ */
export function makeLittlePrince() {
  const p = makePerson({
    skin: 0xf6d9bd,
    hair: PAL.hair,
    coat: PAL.coat,
    pants: 0x5f7f6a,
    boot: 0x6b5a44,
    scarf: PAL.scarf,
    spikyHair: true,
    longCoat: true,
    trim: 0x5c8a70,
    scale: 1.0,
    armAngle: 0.1,
  });
  p.userData.name = 'littlePrince';
  return p;
}

/* ------------------------------------------------------------------ *
 *  国王（B325 的国王）
 * ------------------------------------------------------------------ */
export function makeKing() {
  const g = makePerson({
    skin: 0xf0cfb0,
    hair: 0xdfd6c8,
    coat: 0x9a4f63,
    pants: 0x6f4f63,
    boot: 0x5f4a38,
    hat: 'crown',
    longCoat: true,
    trim: PAL.gold,
    cape: 0xa05a6a,
    capeTrim: PAL.cream,
    beard: 0xe8ddca,
    scale: 1.05,
    armAngle: 0.3,
  });
  // 权杖
  const staff = new THREE.Group();
  const rod = cyl(0.025, 0.03, 1.5, PAL.gold, 6);
  rod.position.y = 0.75;
  staff.add(rod);
  const orb = sph(0.09, PAL.gold, { seg: 8, seg2: 6 });
  orb.position.y = 1.55;
  staff.add(orb);
  const cross = box(0.02, 0.12, 0.02, PAL.red, { castShadow: false });
  cross.position.y = 1.7;
  staff.add(cross);
  staff.position.set(0.34, 0.72, 0.08);
  staff.rotation.z = -0.12;
  g.add(staff);
  return g;
}

/* ------------------------------------------------------------------ *
 *  点灯人
 * ------------------------------------------------------------------ */
export function makeLamplighter() {
  const g = makePerson({
    skin: 0xefd0b3,
    hair: 0x6f5a46,
    coat: 0x6f7f9a,
    pants: 0x5c5468,
    boot: 0x4f4238,
    hat: 'cap',
    hatColor: 0x596579,
    scarf: 0xd9a0a8,
    scale: 1.0,
  });
  const pole = new THREE.Group();
  const rod = cyl(0.025, 0.03, 1.9, PAL.woodDark, 6);
  rod.position.y = 0.95;
  pole.add(rod);
  const lantern = new THREE.Group();
  const frame = box(0.24, 0.34, 0.24, 0xffd79a);
  frame.material = new THREE.MeshBasicMaterial({ color: 0xffd79a });
  lantern.add(frame);
  const cap = cone(0.17, 0.14, 0x5f5a55, 4);
  cap.position.y = 0.24;
  lantern.add(cap);
  const ring = torus(0.13, 0.02, 0x5f5a55, { tubular: 10 });
  ring.position.y = 0.18;
  ring.rotation.x = Math.PI / 2;
  lantern.add(ring);
  lantern.position.y = 1.95;
  pole.add(lantern);
  const glow = glowSprite(1.6, 0xffc983, 0.65);
  glow.position.y = 1.95;
  pole.add(glow);
  pole.position.set(0.33, 0.02, 0.1);
  g.add(pole);
  g.userData.lantern = lantern;
  return g;
}

/* ------------------------------------------------------------------ *
 *  骑士
 * ------------------------------------------------------------------ */
export function makeKnight() {
  const g = makePerson({
    skin: 0xe8c6a6,
    hair: 0x7f6a55,
    coat: 0xa9a9b6,
    pants: 0x8f8f9c,
    boot: 0x6f6c78,
    hat: 'helmet',
    cape: 0x7d9fbf,
    trim: PAL.gold,
    scale: 1.05,
    armAngle: 0.32,
  });
  // 长矛
  const spear = new THREE.Group();
  const shaft = cyl(0.03, 0.035, 2.6, PAL.woodDark, 6);
  shaft.position.y = 1.3;
  spear.add(shaft);
  const tip = cone(0.07, 0.36, 0xc9c6d0, 6);
  tip.position.y = 2.75;
  spear.add(tip);
  const grip = cyl(0.05, 0.05, 0.2, PAL.gold, 6);
  grip.position.y = 1.0;
  spear.add(grip);
  spear.position.set(0.42, 0.02, 0.1);
  g.add(spear);
  // 盾牌
  const shield = new THREE.Group();
  const face = cyl(0.32, 0.32, 0.07, 0x7d9fbf, 12);
  face.rotation.x = Math.PI / 2;
  shield.add(face);
  const rim = torus(0.31, 0.03, PAL.gold, { tubular: 16 });
  shield.add(rim);
  const boss = sph(0.1, PAL.gold, { seg: 8, seg2: 6 });
  boss.position.z = 0.07;
  shield.add(boss);
  const star = new THREE.Mesh(
    new THREE.CircleGeometry(0.1, 5),
    new THREE.MeshBasicMaterial({ color: PAL.cream })
  );
  star.position.z = 0.075;
  shield.add(star);
  shield.position.set(-0.32, 1.0, 0.12);
  shield.rotation.x = 0.05;
  g.add(shield);
  return g;
}

/* ------------------------------------------------------------------ *
 *  铁匠
 * ------------------------------------------------------------------ */
export function makeBlacksmith() {
  const g = makePerson({
    skin: 0xe0a87f,
    hair: 0x5a4030,
    coat: 0x9a7f6a,
    pants: 0x6f5a46,
    boot: 0x554636,
    beard: 0x5a4030,
    scale: 1.02,
    armAngle: 0.3,
  });
  const apron = box(0.4, 0.72, 0.05, 0x8a5a44);
  apron.position.set(0, 1.02, 0.15);
  g.add(apron);
  const hammer = new THREE.Group();
  const handle = box(0.05, 0.7, 0.05, PAL.wood);
  handle.position.y = 0.35;
  hammer.add(handle);
  const head = box(0.26, 0.14, 0.14, 0x55525a);
  head.position.y = 0.7;
  hammer.add(head);
  hammer.position.set(0.36, 0.78, 0.1);
  hammer.rotation.z = -0.5;
  g.add(hammer);
  return g;
}

/* ------------------------------------------------------------------ *
 *  厨娘
 * ------------------------------------------------------------------ */
export function makeCook() {
  const g = makePerson({
    skin: 0xf0c8a8,
    hair: 0x8a6a4a,
    coat: 0xa88f7a,
    pants: 0x7f6a58,
    boot: 0x5f4a38,
    hat: 'chef',
    trim: 0xbfa88f,
    scale: 0.96,
  });
  const apron = box(0.38, 0.8, 0.04, PAL.cream);
  apron.position.set(0, 0.98, 0.16);
  g.add(apron);
  const ladle = new THREE.Group();
  const handle = cyl(0.02, 0.02, 0.55, PAL.woodDark, 5);
  handle.position.y = 0.27;
  ladle.add(handle);
  const cup = sph(0.09, 0x9a9490, { seg: 8, seg2: 6 });
  cup.scale.set(1, 0.5, 1);
  cup.position.y = 0.02;
  ladle.add(cup);
  ladle.position.set(0.3, 0.9, 0.1);
  ladle.rotation.z = -0.3;
  g.add(ladle);
  return g;
}

/* ------------------------------------------------------------------ *
 *  学者 / 地理学家
 * ------------------------------------------------------------------ */
export function makeScholar() {
  const g = makePerson({
    skin: 0xe8c9a8,
    hair: 0xcfc4b4,
    coat: 0x6f7f9a,
    pants: 0x5f5a6a,
    boot: 0x4f4238,
    hat: 'hood',
    beard: 0xd8cdbd,
    longCoat: true,
    scale: 1.0,
    armAngle: 0.25,
  });
  const book = new THREE.Group();
  const cover = box(0.36, 0.06, 0.28, PAL.wine);
  book.add(cover);
  const pages = box(0.33, 0.045, 0.25, PAL.cream);
  pages.position.y = 0.03;
  book.add(pages);
  book.position.set(0.26, 1.02, 0.22);
  book.rotation.x = -0.4;
  g.add(book);
  return g;
}

/* ------------------------------------------------------------------ *
 *  小孩
 * ------------------------------------------------------------------ */
export function makeChild(color = PAL.rose, scale = 0.72) {
  return makePerson({
    skin: 0xf6d9bd,
    hair: 0x8a6a4a,
    coat: color,
    pants: 0x7f7668,
    boot: 0x6f5a46,
    scale,
    spikyHair: true,
  });
}

/* ------------------------------------------------------------------ *
 *  动物
 * ------------------------------------------------------------------ */
export function makeSheep() {
  const g = new THREE.Group();
  const wool = ico(0.36, 0xf2ecdd, { detail: 1 });
  wool.scale.set(1.2, 0.85, 1.35);
  wool.position.y = 0.55;
  g.add(wool);
  const head = sph(0.16, 0x4f4a4a, { seg: 10, seg2: 8 });
  head.position.set(0, 0.62, 0.42);
  g.add(head);
  const snout = sph(0.09, 0x6a6464, { seg: 7, seg2: 5, castShadow: false });
  snout.position.set(0, 0.56, 0.55);
  g.add(snout);
  for (const sx of [-0.16, 0.16]) {
    const ear = box(0.12, 0.05, 0.08, 0x4f4a4a, { castShadow: false });
    ear.position.set(sx, 0.72, 0.38);
    ear.rotation.z = sx > 0 ? -0.4 : 0.4;
    g.add(ear);
    for (const sz of [-0.16, 0.16]) {
      const leg = cyl(0.045, 0.04, 0.35, 0x4f4a4a, 5);
      leg.position.set(sx * 0.7, 0.17, sz * 1.1);
      g.add(leg);
    }
  }
  const tail = sph(0.07, 0xf2ecdd, { seg: 6, seg2: 5, castShadow: false });
  tail.position.set(0, 0.6, -0.46);
  g.add(tail);
  shadowAll(g);
  return g;
}

export function makeFox() {
  const g = new THREE.Group();
  // 坐姿
  const body = capsule(0.2, 0.3, PAL.fox, { pos: [0, 0.42, 0] });
  body.rotation.x = 0.25;
  g.add(body);
  const chest = sph(0.16, PAL.cream, { seg: 10, seg2: 8, castShadow: false });
  chest.scale.set(0.9, 1.1, 0.7);
  chest.position.set(0, 0.5, 0.14);
  g.add(chest);
  const head = sph(0.155, PAL.fox, { seg: 12, seg2: 9 });
  head.scale.set(1, 0.9, 1.05);
  head.position.set(0, 0.8, 0.05);
  g.add(head);
  const snout = cone(0.06, 0.23, PAL.fox, 6);
  snout.rotation.x = Math.PI / 2;
  snout.position.set(0, 0.76, 0.21);
  g.add(snout);
  const nose = sph(0.03, 0x3b3335, { seg: 5, seg2: 4, castShadow: false });
  nose.position.set(0, 0.75, 0.33);
  g.add(nose);
  for (const sx of [-1, 1]) {
    const ear = cone(0.08, 0.26, PAL.fox, 6);
    ear.position.set(sx * 0.1, 0.98, 0.02);
    ear.rotation.z = sx * 0.18;
    g.add(ear);
    const innerEar = cone(0.045, 0.15, 0xe8b39a, 5, { castShadow: false });
    innerEar.position.set(sx * 0.1, 0.99, 0.04);
    innerEar.rotation.z = sx * 0.18;
    g.add(innerEar);
    const eyeF = sph(0.022, 0x3b3335, { seg: 5, seg2: 4, castShadow: false });
    eyeF.position.set(sx * 0.065, 0.83, 0.17);
    g.add(eyeF);
    // 前腿
    const leg = cyl(0.05, 0.055, 0.34, 0xcf7f4f, 6);
    leg.position.set(sx * 0.1, 0.2, 0.12);
    g.add(leg);
    const paw = sph(0.06, 0x4a3b35, { seg: 6, seg2: 5, castShadow: false });
    paw.position.set(sx * 0.1, 0.05, 0.14);
    g.add(paw);
  }
  // 尾巴
  const tail = new THREE.Group();
  const t1 = capsule(0.12, 0.45, PAL.fox, { castShadow: false });
  t1.rotation.z = 0.9;
  tail.add(t1);
  const tip = sph(0.13, PAL.cream, { seg: 8, seg2: 6, castShadow: false });
  tip.position.set(0.34, 0.18, 0);
  tail.add(tip);
  tail.position.set(-0.18, 0.32, -0.18);
  tail.rotation.y = 0.5;
  g.add(tail);
  shadowAll(g);
  return g;
}

export function makeHorse() {
  const g = new THREE.Group();
  const body = capsule(0.38, 0.9, 0xb98a6a, { pos: [0, 1.05, 0] });
  body.rotation.x = Math.PI / 2;
  g.add(body);
  const neck = capsule(0.18, 0.55, 0xb98a6a);
  neck.position.set(0, 1.45, 0.58);
  neck.rotation.x = -0.5;
  g.add(neck);
  const head = box(0.3, 0.32, 0.62, 0xb98a6a);
  head.position.set(0, 1.78, 0.95);
  head.rotation.x = 0.2;
  g.add(head);
  const muzzle = box(0.26, 0.22, 0.22, 0xa87f62);
  muzzle.position.set(0, 1.7, 1.28);
  g.add(muzzle);
  for (const sx of [-0.15, 0.15]) {
    const ear = cone(0.05, 0.18, 0xa87f62, 5);
    ear.position.set(sx, 1.98, 0.78);
    g.add(ear);
  }
  const mane = box(0.08, 0.5, 0.3, 0x6f4f38, { castShadow: false });
  mane.position.set(0, 1.75, 0.55);
  mane.rotation.x = -0.5;
  g.add(mane);
  for (const sx of [-0.22, 0.22]) {
    for (const sz of [-0.5, 0.45]) {
      const leg = cyl(0.07, 0.065, 0.75, 0xa87f62, 6);
      leg.position.set(sx, 0.4, sz);
      g.add(leg);
      const hoof = cyl(0.075, 0.08, 0.1, 0x5a4a3a, 6, { castShadow: false });
      hoof.position.set(sx, 0.06, sz);
      g.add(hoof);
    }
  }
  const tail = capsule(0.09, 0.6, 0x6f4f38);
  tail.position.set(0, 1.1, -0.75);
  tail.rotation.x = 0.6;
  g.add(tail);
  // 鞍与毯
  const blanket = box(0.72, 0.08, 0.8, PAL.wine);
  blanket.position.set(0, 1.31, 0);
  g.add(blanket);
  const saddle = box(0.36, 0.16, 0.42, 0x6f4f38);
  saddle.position.set(0, 1.42, 0);
  g.add(saddle);
  shadowAll(g);
  return g;
}

export function makeDog() {
  const g = new THREE.Group();
  const body = capsule(0.14, 0.34, 0xc9a97e, { pos: [0, 0.2, 0] });
  body.rotation.x = Math.PI / 2;
  body.rotation.z = 1.45;
  g.add(body);
  const head = sph(0.14, 0xc9a97e, { seg: 10, seg2: 8 });
  head.position.set(0.3, 0.24, 0.05);
  g.add(head);
  const snout = box(0.14, 0.1, 0.16, 0xb9986f);
  snout.position.set(0.41, 0.2, 0.05);
  g.add(snout);
  for (const sz of [-0.07, 0.07]) {
    const ear = cone(0.05, 0.12, 0xa9885f, 5);
    ear.position.set(0.26, 0.35, sz);
    g.add(ear);
  }
  const tail = capsule(0.04, 0.24, 0xc9a97e);
  tail.position.set(-0.32, 0.22, 0);
  tail.rotation.z = -1.0;
  tail.rotation.x = 0.2;
  g.add(tail);
  shadowAll(g);
  return g;
}

export function makeCat() {
  const g = new THREE.Group();
  const body = sph(0.14, 0xc9b8a8, { seg: 10, seg2: 8 });
  body.scale.set(1, 1.1, 0.9);
  body.position.y = 0.17;
  g.add(body);
  const head = sph(0.11, 0xc9b8a8, { seg: 10, seg2: 8 });
  head.position.set(0, 0.36, 0.03);
  g.add(head);
  for (const sx of [-1, 1]) {
    const ear = cone(0.04, 0.1, 0xc9b8a8, 4);
    ear.position.set(sx * 0.07, 0.46, 0.02);
    g.add(ear);
    const eyeC = sph(0.02, 0x3b3335, { seg: 5, seg2: 4, castShadow: false });
    eyeC.position.set(sx * 0.04, 0.37, 0.1);
    g.add(eyeC);
  }
  const tail = capsule(0.03, 0.24, 0xc9b8a8);
  tail.position.set(-0.1, 0.2, -0.1);
  tail.rotation.z = -0.8;
  g.add(tail);
  shadowAll(g);
  return g;
}

export function makeChicken() {
  const g = new THREE.Group();
  const body = sph(0.13, 0xf5efe0, { seg: 9, seg2: 7 });
  body.scale.set(0.9, 1, 1.2);
  body.position.y = 0.16;
  g.add(body);
  const head = sph(0.08, 0xf5efe0, { seg: 8, seg2: 6 });
  head.position.set(0, 0.3, 0.1);
  g.add(head);
  const comb = box(0.03, 0.06, 0.06, PAL.red, { castShadow: false });
  comb.position.set(0, 0.38, 0.1);
  g.add(comb);
  const beak = cone(0.025, 0.06, 0xd8b45e, 4);
  beak.rotation.x = Math.PI / 2;
  beak.position.set(0, 0.29, 0.18);
  g.add(beak);
  for (const sx of [-0.04, 0.04]) {
    const leg = cyl(0.012, 0.012, 0.1, 0xd8a45e, 4, { castShadow: false });
    leg.position.set(sx, 0.05, 0);
    g.add(leg);
  }
  const tail = cone(0.07, 0.18, 0xf5efe0, 5);
  tail.rotation.x = -1.2;
  tail.position.set(0, 0.24, -0.14);
  g.add(tail);
  shadowAll(g);
  return g;
}

/* ------------------------------------------------------------------ *
 *  玫瑰与玻璃罩
 * ------------------------------------------------------------------ */
function roseBloom(scale = 1) {
  const g = new THREE.Group();
  const layers = [
    { n: 9, r: 0.22, size: 0.23, y: 0.0, tilt: 0.55, color: 0xd0708a },
    { n: 7, r: 0.155, size: 0.21, y: 0.07, tilt: 0.4, color: 0xe08fa2 },
    { n: 5, r: 0.095, size: 0.18, y: 0.13, tilt: 0.25, color: 0xeca6b3 },
    { n: 3, r: 0.045, size: 0.15, y: 0.19, tilt: 0.1, color: 0xf6c3cc },
  ];
  const c = new THREE.Color();
  for (const layer of layers) {
    for (let i = 0; i < layer.n; i++) {
      const a = (i / layer.n) * Math.PI * 2 + layer.y * 7;
      const petal = sph(layer.size * scale, layer.color, { seg: 9, seg2: 7 });
      petal.scale.set(0.62, 0.95, 0.3);
      petal.position.set(Math.sin(a) * layer.r * scale, layer.y * scale, Math.cos(a) * layer.r * scale);
      petal.rotation.y = a;
      petal.rotation.x = layer.tilt;
      g.add(petal);
    }
  }
  const center = sph(0.09 * scale, 0xfad4da, { seg: 8, seg2: 6 });
  center.scale.y = 0.8;
  center.position.y = 0.22 * scale;
  g.add(center);
  return g;
}

export function makeRoseInCloche(ctx) {
  const g = new THREE.Group();
  // 石台
  const pedestal = cyl(0.62, 0.72, 0.55, PAL.stoneCool, 14);
  pedestal.position.y = 0.27;
  g.add(pedestal);
  const cap = cyl(0.7, 0.64, 0.12, PAL.stone, 14);
  cap.position.y = 0.57;
  g.add(cap);

  // 花盆
  const pot = cyl(0.22, 0.17, 0.24, 0xc08a6a, 10);
  pot.position.y = 0.75;
  g.add(pot);
  const soil = cyl(0.2, 0.2, 0.03, 0x6f5a46, 10, { castShadow: false });
  soil.position.y = 0.87;
  g.add(soil);

  // 玫瑰
  const rose = new THREE.Group();
  const stem = cyl(0.018, 0.022, 0.72, 0x6f8f6a, 5);
  stem.position.y = 0.36;
  rose.add(stem);
  for (const [sx, sy, sz] of [[0.13, 0.42, 0], [-0.12, 0.55, 0], [0, 0.3, 0.12]]) {
    const leaf = sph(0.09, 0x7fa06a, { seg: 7, seg2: 5 });
    leaf.scale.set(1.4, 0.25, 0.7);
    leaf.position.set(sx, sy, sz);
    leaf.rotation.z = sx > 0 ? 0.5 : -0.5;
    rose.add(leaf);
  }
  const bloom = roseBloom(1.0);
  bloom.position.y = 0.78;
  rose.add(bloom);
  rose.position.set(0, 0.88, 0);
  g.add(rose);
  g.userData.rose = rose;

  // 玻璃罩
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xdcecf2,
    transparent: true,
    opacity: 0.22,
    roughness: 0.05,
    metalness: 0,
    transmission: 0.3,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const dome = new THREE.Mesh(new THREE.SphereGeometry(0.5, 20, 14, 0, Math.PI * 2, 0, Math.PI / 2), glassMat);
  dome.position.y = 1.52;
  dome.castShadow = false;
  g.add(dome);
  const glassCyl = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.62, 20, 1, true), glassMat);
  glassCyl.position.y = 1.21;
  g.add(glassCyl);
  const rim = torus(0.5, 0.018, PAL.gold, { tubular: 24 });
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.9;
  g.add(rim);
  const knob = sph(0.06, PAL.gold, { seg: 8, seg2: 6 });
  knob.position.y = 2.04;
  g.add(knob);

  const glow = glowSprite(1.4, 0xffc7d4, 0.35);
  glow.position.y = 1.5;
  g.add(glow);

  shadowAll(g);
  return g;
}

/* ------------------------------------------------------------------ *
 *  玫瑰园小景
 * ------------------------------------------------------------------ */
function makeGarden(ctx, x, z) {
  const g = new THREE.Group();
  const base = islandHeight(x, z);
  g.position.set(x, base, z);
  const h = (lx, lz) => islandHeight(x + lx, z + lz) - base;

  // 贴地的草地小圆台
  const discGeo = new THREE.CircleGeometry(4.3, 56);
  discGeo.rotateX(-Math.PI / 2);
  const dp = discGeo.attributes.position;
  for (let i = 0; i < dp.count; i++) {
    dp.setY(i, h(dp.getX(i), dp.getZ(i)) + 0.055);
  }
  discGeo.computeVertexNormals();
  const circle = new THREE.Mesh(discGeo, new THREE.MeshToonMaterial({ color: 0xa9c98f }));
  circle.receiveShadow = true;
  g.add(circle);

  // 矮篱笆
  for (let i = 0; i < 44; i++) {
    const a = (i / 44) * Math.PI * 2;
    const lx = Math.cos(a) * 3.85;
    const lz = Math.sin(a) * 3.85;
    const bush = ico(0.3, i % 3 ? PAL.leaf : PAL.leafPale, { detail: 0, castShadow: false });
    bush.position.set(lx, h(lx, lz) + 0.17, lz);
    bush.scale.y = 0.8;
    g.add(bush);
  }
  // 花床
  for (let i = 0; i < 22; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = 1.7 + Math.random() * 1.7;
    const lx = Math.cos(a) * r;
    const lz = Math.sin(a) * r;
    const flower = new THREE.Group();
    const stem = cyl(0.012, 0.012, 0.22, 0x6f8f6a, 4, { castShadow: false });
    stem.position.y = 0.11;
    flower.add(stem);
    const bloom = sph(0.07, [PAL.rose, 0xf2b8c6, 0xe8c46a, 0xd9c2ea][i % 4], {
      seg: 6,
      seg2: 5,
      castShadow: false,
    });
    bloom.position.y = 0.24;
    flower.add(bloom);
    flower.position.set(lx, h(lx, lz) + 0.06, lz);
    g.add(flower);
  }

  // 石板小径
  for (let i = 0; i < 7; i++) {
    const lx = 3.6 - i * 0.62;
    const lz = 2.0 - i * 0.3;
    const stone = cyl(0.3, 0.32, 0.07, PAL.stoneCool, 7, { castShadow: false });
    stone.position.set(lx, h(lx, lz) + 0.06, lz);
    stone.rotation.y = i;
    g.add(stone);
  }

  // 石凳
  const benchG = new THREE.Group();
  const seat = box(1.6, 0.12, 0.5, PAL.stoneCool);
  seat.position.y = 0.45;
  benchG.add(seat);
  for (const sx of [-0.6, 0.6]) {
    const leg = box(0.2, 0.45, 0.42, PAL.stoneDark);
    leg.position.set(sx, 0.22, 0);
    benchG.add(leg);
  }
  benchG.position.set(2.2, h(2.2, -1.9), -1.9);
  benchG.rotation.y = -0.6;
  g.add(benchG);

  // 小路灯
  const lampPost = new THREE.Group();
  const post = cyl(0.04, 0.05, 1.8, PAL.stoneDark, 6);
  post.position.y = 0.9;
  lampPost.add(post);
  const lampGlow = new THREE.Mesh(
    new THREE.BoxGeometry(0.24, 0.3, 0.24),
    new THREE.MeshBasicMaterial({ color: 0xffd79a })
  );
  lampGlow.position.y = 1.9;
  lampPost.add(lampGlow);
  const glow = glowSprite(1.3, 0xffc983, 0.55);
  glow.position.y = 1.9;
  lampPost.add(glow);
  lampPost.position.set(-2.5, h(-2.5, -1.1), -1.1);
  g.add(lampPost);

  // 小王子
  const prince = makeLittlePrince();
  prince.position.set(1.05, h(1.05, 0.35) + 0.07, 0.35);
  prince.rotation.y = 0.62;
  g.add(prince);
  ctx.banners.push(prince.userData.scarf);

  // 玻璃罩玫瑰
  const rose = makeRoseInCloche(ctx);
  rose.position.set(-0.5, h(-0.5, -0.15) + 0.07, -0.15);
  g.add(rose);

  // 狐狸
  const fox = makeFox();
  fox.position.set(-1.5, h(-1.5, 0.95) + 0.07, 0.95);
  fox.rotation.y = 1.1;
  g.add(fox);

  return g;
}

/* ------------------------------------------------------------------ *
 *  总装
 * ------------------------------------------------------------------ */
export function populateCharacters(ctx) {
  const g = new THREE.Group();

  // 大厅里的国王
  const king = makeKing();
  king.position.set(1.1, 3.43, -3.0);
  king.rotation.y = 0.28;
  g.add(king);

  // 国王身边的侍从（小王子里的“虚荣的人”改作侍从）
  const attendant = makePerson({
    skin: 0xf0c8a8,
    hair: 0x6f5a46,
    coat: 0x8a7fa8,
    pants: 0x6f5a6a,
    boot: 0x5a4a3a,
    hat: 'cap',
    hatColor: 0x7a6f98,
    scale: 0.95,
  });
  attendant.position.set(-1.9, 3.16, -3.2);
  attendant.rotation.y = -0.4;
  g.add(attendant);

  // 厨房厨娘
  const cook = makeCook();
  cook.position.set(-2.2, 3.16, -5.2);
  cook.rotation.y = 1.9;
  g.add(cook);

  // 书房学者
  const scholar = makeScholar();
  scholar.position.set(-0.85, 7.46, 0.0);
  scholar.rotation.y = -1.6;
  g.add(scholar);

  // 卧房熟睡的女主人？改成一个女仆整理床铺
  const maid = makePerson({
    skin: 0xf2cfae,
    hair: 0x9a6f4f,
    coat: 0x8f9f8a,
    pants: 0x7f8a78,
    boot: 0x5f5448,
    hat: 'cap',
    hatColor: PAL.cream,
    scale: 0.93,
  });
  maid.position.set(1.4, 7.46, -3.3);
  maid.rotation.y = 2.6;
  g.add(maid);

  // 观星台：观星的孩子
  const stargazer = makePerson({
    skin: 0xf0c9a6,
    hair: 0xd9b07a,
    coat: 0x6f7f9a,
    pants: 0x5f5a6a,
    boot: 0x4f4238,
    hat: 'cap',
    hatColor: 0x5f6f8a,
    scale: 0.92,
  });
  stargazer.position.set(1.0, 8.76, 1.0);
  stargazer.rotation.y = 0.3;
  g.add(stargazer);

  // 城墙上点灯的灯夫
  const lamplighter = makeLamplighter();
  lamplighter.position.set(4.9, 8.22, 7.55);
  lamplighter.rotation.y = 0.2;
  g.add(lamplighter);

  // 城门守卫
  const knight = makeKnight();
  knight.position.set(2.0, 3.16, 6.9);
  knight.rotation.y = -0.2;
  g.add(knight);

  // 铁匠
  const smith = makeBlacksmith();
  smith.position.set(-7.6, 3.16, 3.9);
  smith.rotation.y = 1.3;
  g.add(smith);

  // 庭院里的孩子
  const child1 = makeChild(PAL.rose, 0.68);
  child1.position.set(-3.9, 3.14, 5.9);
  child1.rotation.y = 2.1;
  g.add(child1);
  const child2 = makeChild(PAL.blue, 0.62);
  child2.position.set(-3.2, 3.14, 6.3);
  child2.rotation.y = -0.7;
  g.add(child2);

  // 狗（壁炉边）
  const dog = makeDog();
  dog.position.set(-3.2, 3.16, 0.35);
  dog.rotation.y = 1.4;
  g.add(dog);

  // 猫（厨房）
  const cat = makeCat();
  cat.position.set(3.3, 3.16, -4.5);
  cat.rotation.y = -0.8;
  g.add(cat);

  // 鸡
  for (let i = 0; i < 3; i++) {
    const chicken = makeChicken();
    chicken.position.set(4.6 + i * 0.5, 3.14, 4.9 + Math.sin(i * 2) * 0.5);
    chicken.rotation.y = i * 2.1;
    g.add(chicken);
  }

  // 马
  const horse = makeHorse();
  horse.position.set(8.0, 3.12, 5.6);
  horse.rotation.y = 1.7;
  g.add(horse);

  // 羊圈里的羊
  const sheepSpots = [
    [-13.4, 15.0],
    [-12.4, 15.8],
    [-13.6, 16.2],
    [-12.8, 14.4],
  ];
  for (let i = 0; i < sheepSpots.length; i++) {
    const [x, z] = sheepSpots[i];
    const sheep = makeSheep();
    sheep.position.set(x, islandHeight(x, z) + 0.04, z);
    sheep.rotation.y = i * 1.7;
    g.add(sheep);
  }

  // 玫瑰园（小王子、狐狸、玻璃罩玫瑰）
  g.add(makeGarden(ctx, 19, 6.8));

  // 观星台露台上的小王子（夜晚场景的主角）—— 站在女儿墙边
  const roofPrince = makeLittlePrince();
  roofPrince.position.set(3.6, 15.98, -1.4);
  roofPrince.rotation.y = 0.9;
  roofPrince.scale.setScalar(0.95);
  g.add(roofPrince);
  ctx.banners.push(roofPrince.userData.scarf);

  shadowAll(g, true, true);
  return g;
}