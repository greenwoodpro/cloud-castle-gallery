import * as THREE from 'three';
import { matte, MAT, TAU, mulberry32, outlineAll } from './util.js';
import { fabricTexture } from './textures.js';
import { heightAt } from './world.js';

/* 本地圆柱构件（避免与 castle.js 形成循环依赖） */
function cyl(rt, rb, h, mat, seg = 12, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), mat);
  m.position.set(x, y, z);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

/* ------------------------------------------------------------------ */
/*  通用：造一个人形（绘本风格：圆头、简笔大衣、无面部细节）              */
/* ------------------------------------------------------------------ */
export function makePerson(opts = {}) {
  const {
    coat = '#4a6fa5', trim = '#f2e6cf', hair = '#c8912f', hat = null,
    height = 1.75, hatColor = '#8c3b34', scarf = null, skin = '#e8c9a0',
  } = opts;

  const g = new THREE.Group();
  const coatMat = matte(coat);
  const trimMat = matte(trim);
  const skinMat = matte(skin);

  // 腿
  const legL = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.1, height * 0.36, 8), matte('#3b4a63'));
  const legR = legL.clone();
  legL.position.set(-0.13, height * 0.18, 0);
  legR.position.set(0.13, height * 0.18, 0);
  g.add(legL, legR);
  // 鞋
  [-0.13, 0.13].forEach((x) => {
    const s = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.12, 0.34), matte('#5a3a24'));
    s.position.set(x, 0.06, 0.05); g.add(s);
  });

  // 大衣（圆锥截面的袍子）
  const body = new THREE.Mesh(new THREE.CylinderGeometry(height * 0.19, height * 0.28, height * 0.42, 12), coatMat);
  body.position.y = height * 0.53;
  g.add(body);
  // 衣领
  const collar = new THREE.Mesh(new THREE.CylinderGeometry(height * 0.2, height * 0.2, height * 0.06, 12), trimMat);
  collar.position.y = height * 0.73;
  g.add(collar);
  // 手臂
  const armL = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.06, height * 0.32, 8), coatMat);
  const armR = armL.clone();
  armL.position.set(-height * 0.21, height * 0.53, 0.02);
  armR.position.set(height * 0.21, height * 0.53, 0.02);
  armL.rotation.z = 0.2; armR.rotation.z = -0.2;
  g.add(armL, armR);
  // 手
  [-1, 1].forEach((s) => {
    const h = new THREE.Mesh(new THREE.SphereGeometry(0.075, 8, 8), skinMat);
    h.position.set(s * height * 0.245, height * 0.36, 0.05);
    g.add(h);
  });

  // 头
  const head = new THREE.Mesh(new THREE.SphereGeometry(height * 0.135, 14, 12), skinMat);
  head.position.y = height * 0.85;
  head.scale.set(1, 1.08, 0.96);
  g.add(head);
  // 脖子
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.07, 0.08, 8), skinMat);
  neck.position.y = height * 0.75; g.add(neck);

  // 头发
  if (hair) {
    const cap = new THREE.Mesh(new THREE.SphereGeometry(height * 0.142, 14, 10, 0, TAU, 0, Math.PI * 0.58), matte(hair));
    cap.position.y = height * 0.855;
    cap.scale.set(1, 1.05, 1);
    g.add(cap);
  }
  // 帽子
  if (hat === 'straw') {
    const brim = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.46, 0.06, 14), matte('#d9bd7d'));
    brim.position.y = height * 0.93; g.add(brim);
    const top = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.26, 0.28, 12), matte('#d9bd7d'));
    top.position.y = height * 1.03; g.add(top);
  } else if (hat === 'crown') {
    const crown = new THREE.Group();
    const band = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.21, 0.12, 12), matte(hatColor, { metalness: 0.5, roughness: 0.35 }));
    crown.add(band);
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * TAU;
      const pt = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.16, 4), matte(hatColor, { metalness: 0.5, roughness: 0.35 }));
      pt.position.set(Math.cos(a) * 0.19, 0.14, Math.sin(a) * 0.19);
      crown.add(pt);
    }
    crown.position.y = height * 0.96;
    g.add(crown);
  } else if (hat === 'hood') {
    const hd = new THREE.Mesh(new THREE.SphereGeometry(height * 0.16, 12, 10, 0, TAU, 0, Math.PI * 0.6), matte(hatColor));
    hd.position.y = height * 0.86; g.add(hd);
  }

  // 围巾
  if (scarf) {
    const sc = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.05, 6, 14), matte(scarf));
    sc.position.y = height * 0.74; sc.rotation.x = Math.PI / 2;
    g.add(sc);
    const tail = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.5, 0.05), matte(scarf));
    tail.position.set(0.13, height * 0.53, 0.1);
    tail.rotation.z = 0.2;
    g.add(tail);
  }

  g.userData.height = height;
  g.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  return g;
}

/* ------------------------------------------------------------------ */
/*  小王子：金色头发 + 蓝衣 + 红围巾                                     */
/* ------------------------------------------------------------------ */
export function makeLittlePrince() {
  const g = new THREE.Group();
  const p = makePerson({
    coat: '#3f6fb5', trim: '#f4ead6', hair: '#f0c64a', skin: '#f2d3a8',
    height: 1.62, scarf: '#d2493f',
  });
  g.add(p);
  // 一撮呆毛
  const ahoge = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.03, 0.28, 6), matte('#f0c64a'));
  ahoge.position.set(0, 1.72, 0);
  ahoge.rotation.z = -0.35;
  g.add(ahoge);
  g.userData.anim = 'prince';
  return g;
}

/* ------------------------------------------------------------------ */
/*  狐狸                                                               */
/* ------------------------------------------------------------------ */
export function makeFox() {
  const g = new THREE.Group();
  const fur = matte('#d9863f');
  const light = matte('#f2e0c4');
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.36, 14, 12), fur);
  body.scale.set(1.25, 0.82, 0.8);
  body.position.y = 0.42;
  g.add(body);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.25, 14, 12), fur);
  head.position.set(0.42, 0.62, 0);
  g.add(head);
  // 吻
  const snout = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.3, 10), fur);
  snout.rotation.z = -Math.PI / 2;
  snout.position.set(0.66, 0.56, 0);
  g.add(snout);
  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 8), matte('#3a2a20'));
  nose.position.set(0.8, 0.55, 0);
  g.add(nose);
  // 耳
  [-1, 1].forEach((s) => {
    const e = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.26, 5), fur);
    e.position.set(0.3, 0.85, s * 0.1);
    e.rotation.z = 0.2;
    g.add(e);
  });
  // 胸毛
  const chest = new THREE.Mesh(new THREE.SphereGeometry(0.2, 10, 8), light);
  chest.scale.set(0.7, 1, 0.9);
  chest.position.set(0.42, 0.42, 0);
  g.add(chest);
  // 腿
  [[0.2, -0.16], [0.2, 0.16], [-0.2, -0.16], [-0.2, 0.16]].forEach(([x, z]) => {
    const l = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.05, 0.4, 6), fur);
    l.position.set(x, 0.2, z);
    g.add(l);
  });
  // 大尾巴
  const tail = new THREE.Group();
  const t1 = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.7, 10), fur);
  t1.rotation.z = Math.PI / 2.3;
  t1.position.set(-0.5, 0.42, 0);
  tail.add(t1);
  const t2 = new THREE.Mesh(new THREE.SphereGeometry(0.17, 10, 8), light);
  t2.position.set(-0.82, 0.62, 0);
  tail.add(t2);
  g.add(tail);
  g.userData.tail = tail;
  g.traverse((o) => { if (o.isMesh) o.castShadow = true; });
  return g;
}

/* ------------------------------------------------------------------ */
/*  玫瑰（罩在玻璃钟罩下）                                               */
/* ------------------------------------------------------------------ */
export function makeRose() {
  const g = new THREE.Group();
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.035, 0.62, 6), matte('#4d7a34'));
  stem.position.y = 0.31; g.add(stem);
  // 叶
  for (let i = 0; i < 3; i++) {
    const l = new THREE.Mesh(new THREE.SphereGeometry(0.11, 8, 6), matte('#5f8f45'));
    l.scale.set(1.5, 0.18, 0.9);
    l.position.set(0.09, 0.2 + i * 0.12, 0);
    l.rotation.z = 0.4;
    g.add(l);
  }
  // 花瓣
  const petalMat = matte('#d2493f');
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * TAU;
    const p = new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 8, 0, TAU, 0, Math.PI * 0.55), petalMat);
    p.scale.set(0.7, 1.5, 1.3);
    p.position.set(Math.cos(a) * 0.09, 0.64 + (i % 2) * 0.03, Math.sin(a) * 0.09);
    p.rotation.set(Math.sin(a) * 0.5, a, Math.cos(a) * 0.5);
    g.add(p);
  }
  const core = new THREE.Mesh(new THREE.SphereGeometry(0.07, 10, 8), matte('#e8a04a'));
  core.position.y = 0.68; core.scale.y = 0.7;
  g.add(core);
  g.userData.bloom = true;
  g.traverse((o) => { if (o.isMesh) o.castShadow = true; });
  return g;
}

/* ------------------------------------------------------------------ */
/*  羊                                                                 */
/* ------------------------------------------------------------------ */
export function makeSheep() {
  const g = new THREE.Group();
  const wool = matte('#f4efe2');
  const dark = matte('#4a4038');
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.34, 12, 10), wool);
  body.scale.set(1.15, 0.9, 0.85);
  body.position.y = 0.42;
  g.add(body);
  // 羊毛卷
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * TAU;
    const w = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 6), wool);
    w.position.set(Math.cos(a) * 0.24, 0.5 + Math.sin(i) * 0.1, Math.sin(a) * 0.2);
    g.add(w);
  }
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.17, 10, 8), dark);
  head.position.set(0.4, 0.55, 0);
  g.add(head);
  const ear = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 6), dark);
  ear.scale.set(1.4, 0.4, 0.7);
  ear.position.set(0.34, 0.64, 0.14); g.add(ear);
  const ear2 = ear.clone(); ear2.position.z = -0.14; g.add(ear2);
  [-0.16, 0.16].forEach((z) => {
    const l = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.04, 0.36, 6), dark);
    l.position.set(0.18, 0.18, z); g.add(l);
  });
  g.traverse((o) => { if (o.isMesh) o.castShadow = true; });
  return g;
}

/* ------------------------------------------------------------------ */
/*  马                                                                 */
/* ------------------------------------------------------------------ */
export function makeHorse() {
  const g = new THREE.Group();
  const coat = matte('#8a5f3c');
  const mane = matte('#4a3324');
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.5, 14, 12), coat);
  body.scale.set(1.5, 0.85, 0.8);
  body.position.y = 1.05;
  g.add(body);
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.26, 0.8, 10), coat);
  neck.position.set(0.62, 1.5, 0);
  neck.rotation.z = -0.5;
  g.add(neck);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 10), coat);
  head.scale.set(1.5, 1, 0.9);
  head.position.set(0.94, 1.78, 0);
  g.add(head);
  const ear = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.16, 5), coat);
  ear.position.set(0.8, 1.98, 0.09); g.add(ear);
  const ear2 = ear.clone(); ear2.position.z = -0.09; g.add(ear2);
  const maneM = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.22, 0.12), mane);
  maneM.position.set(0.68, 1.72, 0); maneM.rotation.z = -0.5; g.add(maneM);
  // 四腿
  [[0.4, -0.2], [0.4, 0.2], [-0.4, -0.2], [-0.4, 0.2]].forEach(([x, z]) => {
    const l = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.06, 1.05, 6), coat);
    l.position.set(x, 0.52, z); g.add(l);
  });
  const tail = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.7, 7), mane);
  tail.position.set(-0.78, 1.05, 0); tail.rotation.z = 0.9; g.add(tail);
  g.traverse((o) => { if (o.isMesh) o.castShadow = true; });
  return g;
}

/* ------------------------------------------------------------------ */
/*  点灯人：杆 + 灯                                                     */
/* ------------------------------------------------------------------ */
export function makeLamplighter() {
  const g = new THREE.Group();
  const p = makePerson({ coat: '#4d7a34', trim: '#e8dcc0', hair: '#3a2a20', hat: 'hood', hatColor: '#3a4a2a', height: 1.72 });
  g.add(p);
  // 灯杆
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 2.6, 6), matte('#6a4a30'));
  pole.position.set(0.34, 1.3, 0.1);
  g.add(pole);
  // 灯
  const lamp = new THREE.Group();
  lamp.add(cyl(0.12, 0.14, 0.26, matte('#4a4a52', { metalness: 0.4 }), 8, 0, 0, 0));
  const glassL = new THREE.Mesh(new THREE.SphereGeometry(0.11, 10, 8),
    new THREE.MeshBasicMaterial({ color: '#ffe08a' }));
  glassL.position.y = 0.1; lamp.add(glassL);
  const light = new THREE.PointLight('#ffcf7a', 0, 7, 2);
  light.position.y = 0.1;
  lamp.add(light);
  lamp.position.set(0.34, 2.5, 0.1);
  g.add(lamp);
  g.userData.lamp = lamp;
  g.userData.light = light;
  g.userData.anim = 'lamplighter';
  return g;
}

/* ------------------------------------------------------------------ */
/*  人物群像：国王、商人、农夫、士兵、女孩                                 */
/* ------------------------------------------------------------------ */
export function makeCast() {
  const cast = {};

  // 国王：紫袍 + 金冠
  const king = makePerson({ coat: '#6b4a8f', trim: '#e8c46a', hair: '#d9d2c4', hat: 'crown', hatColor: '#e0b25a', height: 1.8, skin: '#e8c9a0' });
  const scepter = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 1.1, 6), matte('#e0b25a', { metalness: 0.5, roughness: 0.3 }));
  scepter.position.set(0.42, 0.95, 0.1);
  king.add(scepter);
  cast.king = king;

  // 商人：胖、绿衣、背包
  const merchant = makePerson({ coat: '#4a7d5c', trim: '#e8dcc0', hair: '#5a3a24', hat: 'straw', height: 1.7 });
  merchant.scale.set(1.15, 1, 1.15);
  const pack = new THREE.Mesh(new THREE.SphereGeometry(0.3, 10, 8), matte('#a8714a'));
  pack.scale.set(0.8, 1, 0.7);
  pack.position.set(0, 1.0, -0.32);
  merchant.add(pack);
  cast.merchant = merchant;

  // 农夫：草帽 + 锄头
  const farmer = makePerson({ coat: '#8a7a4a', trim: '#e0d3b4', hair: '#3a2a20', hat: 'straw', height: 1.72 });
  const hoe = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.5, 6), matte('#6a4a30'));
  hoe.position.set(0.4, 0.75, 0.1); hoe.rotation.z = 0.35;
  farmer.add(hoe);
  const blade = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.24, 0.05), matte('#8a8a92', { metalness: 0.4 }));
  blade.position.set(0.63, 0.1, 0.1);
  farmer.add(blade);
  cast.farmer = farmer;

  // 士兵：盔甲 + 长矛
  const soldier = makePerson({ coat: '#8a93a0', trim: '#c8ccd4', hair: null, hat: 'hood', hatColor: '#9aa3b0', height: 1.78, skin: '#e0bd94' });
  const helm = new THREE.Mesh(new THREE.SphereGeometry(0.26, 12, 10, 0, TAU, 0, Math.PI * 0.55), matte('#a8b0bc', { metalness: 0.45, roughness: 0.4 }));
  helm.position.set(0, 1.52, 0);
  soldier.add(helm);
  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.22, 6), matte('#a8b0bc', { metalness: 0.45, roughness: 0.4 }));
  nose.position.set(0.26, 1.5, 0); nose.rotation.z = -Math.PI / 2;
  soldier.add(nose);
  const spear = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 2.6, 6), matte('#6a4a30'));
  spear.position.set(0.42, 1.3, 0.1);
  soldier.add(spear);
  const tip = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.3, 6), matte('#b8bec8', { metalness: 0.6, roughness: 0.3 }));
  tip.position.set(0.42, 2.7, 0.1);
  soldier.add(tip);
  cast.soldier = soldier;

  // 女孩：红裙
  const girl = makePerson({ coat: '#c9566f', trim: '#f6e6d0', hair: '#4a2a1a', height: 1.5, skin: '#f0d0aa' });
  const braid = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.04, 0.6, 6), matte('#4a2a1a'));
  braid.position.set(0, 1.0, -0.2);
  girl.add(braid);
  cast.girl = girl;

  // 老学者：长袍 + 书
  const scholar = makePerson({ coat: '#3f4a6b', trim: '#c8b48a', hair: '#d9d2c4', height: 1.72 });
  const book = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.06, 0.26), matte('#8a3f36'));
  book.position.set(0.28, 1.0, 0.2);
  scholar.add(book);
  cast.scholar = scholar;

  Object.values(cast).forEach((c) => { c.traverse((o) => { if (o.isMesh) o.castShadow = true; }); });
  return cast;
}
