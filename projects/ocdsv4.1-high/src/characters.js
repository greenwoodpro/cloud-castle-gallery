import * as THREE from 'three';
import {
  M, Merge, R, RI, pick, TAU, reg, tick, holder, gBox, gRBox, gCyl, gCone, gSph, gTor, gLathe, gPlane,
  shadowed, registerFigure, texSoft, label, PAL, clamp, lerp
} from './core.js';
import { WaveCloth } from './props.js';

const COATS = ['clothBlue', 'clothRose', 'clothGreen', 'clothPlum', 'cream', 'gold'];
const PANTS = ['clothPlum', 'ink', 'clothGreen', 'woodDark'];

function limb(key, len, r, footKey, footScale = 1) {
  const g = new THREE.Group();
  const Mg = new Merge();
  Mg.cyl(key, r, r * 0.92, len, [0, -len / 2, 0], [0, 0, 0], 8);
  if (footKey) Mg.rbox(footKey, r * 2.5 * footScale, 0.12, r * 3.6 * footScale, [0, -len + 0.05, 0.07 * footScale], [0, 0, 0], 0.04);
  g.add(Mg.build(M));
  return g;
}

export function makeFigure(o = {}) {
  const s = o.scale || 1;
  const coatKey = o.coat || pick(COATS);
  const pantKey = o.pants || pick(PANTS);
  const skinKey = o.skin || 'skin';
  const g = new THREE.Group();
  const hipY = 0.62;
  const shoulderY = 1.24;
  const parts = {};

  const torso = new THREE.Group();
  const Mg = new Merge();
  Mg.lathe(coatKey, [[0.02, 0], [0.31, 0.04], [0.35, 0.32], [0.31, 0.62], [0.23, 0.78], [0.21, 0.84], [0.02, 0.86]], [0, hipY - 0.34, 0], [0, 0, 0], 12);
  Mg.lathe(coatKey, [[0.02, 0], [0.21, 0.02], [0.22, 0.2], [0.16, 0.34], [0.02, 0.36]], [0, shoulderY - 0.2, 0], [0, 0, 0], 12);
  Mg.tor(o.belt || 'leather', 0.31, 0.035, [0, hipY + 0.32, 0], [Math.PI / 2, 0, 0], 14);
  if (o.buttons !== false) {
    for (let i = 0; i < 3; i++) Mg.sph(o.buttonKey || 'gold', 0.022, [0, hipY + 0.1 + i * 0.13, 0.29], 6);
  }
  if (o.collar !== false) Mg.tor(o.collarKey || 'cream', 0.19, 0.055, [0, shoulderY + 0.1, 0], [Math.PI / 2 - 0.25, 0, 0], 12);
  if (o.apron) {
    Mg.box(o.apron, 0.4, 0.62, 0.03, [0, hipY + 0.06, 0.32]);
    Mg.box(o.apron, 0.34, 0.1, 0.03, [0, shoulderY + 0.02, 0.26]);
  }
  if (o.robe) {
    Mg.lathe(o.robe, [[0.02, 0], [0.5, 0.02], [0.52, 0.8], [0.3, 1.2], [0.02, 1.24]], [0, 0, 0], [0, 0, 0], 14);
    if (o.ermine) for (let i = 0; i < 14; i++) {
      const a = R(0, TAU);
      Mg.sph('ink', 0.05, [Math.cos(a) * 0.46, R(0.12, 1.1), Math.sin(a) * 0.46], 6);
    }
  }
  torso.add(Mg.build(M));
  g.add(torso);
  parts.torso = torso;

  const headGrp = new THREE.Group();
  headGrp.position.set(0, shoulderY + 0.34, 0);
  const Hm = new Merge();
  Hm.sph(skinKey, 0.2, [0, 0, 0], 16);
  Hm.sph(skinKey, 0.185, [0, -0.12, 0.03], 12);
  if (o.beard) Hm.lathe(o.beard, [[0.02, 0], [0.15, 0.03], [0.17, 0.2], [0.1, 0.42], [0.02, 0.46]], [0, -0.26, 0.06], [0.16, 0, 0], 12);
  Hm.sph('clothRose', 0.045, [-0.13, -0.02, 0.13], 8);
  Hm.sph('clothRose', 0.045, [0.13, -0.02, 0.13], 8);
  Hm.sph('ink', 0.03, [-0.075, 0.045, 0.165], 8);
  Hm.sph('ink', 0.03, [0.075, 0.045, 0.165], 8);
  Hm.sph(skinKey, 0.035, [0, -0.02, 0.19], 8);
  if (o.hair !== false) {
    const hairKey = o.hairKey || 'hair';
    Hm.sph(hairKey, 0.215, [0, 0.03, -0.02], 16);
    Hm.lathe(hairKey, [[0.02, 0], [0.21, 0.02], [0.2, 0.13], [0.06, 0.17]], [0, 0.06, 0], [0, 0, 0], 16);
  }
  headGrp.add(Hm.build(M));
  if (o.spikyHair) {
    const sp = new Merge();
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * TAU;
      sp.cone(o.hairKey || 'hair', 0.06, 0.22, [Math.cos(a) * 0.14, 0.22, Math.sin(a) * 0.14 - 0.02], [R(-0.3, 0.3), a, R(-0.3, 0.3)], 6);
    }
    const m = sp.build(M);
    m.castShadow = true;
    headGrp.add(m);
  }
  if (o.hat === 'crown') {
    const c = new Merge();
    c.cyl('gold', 0.2, 0.2, 0.12, [0, 0.2, 0], [0, 0, 0], 12);
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * TAU;
      c.cone('gold', 0.05, 0.16, [Math.cos(a) * 0.18, 0.32, Math.sin(a) * 0.18], [0, 0, 0], 6);
    }
    c.sph('clothRose', 0.035, [0, 0.22, 0.2], 8);
    headGrp.add(c.build(M));
  } else if (o.hat === 'wizard') {
    const c = new Merge();
    c.cone(o.hatKey || 'clothPlum', 0.3, 0.9, [0, 0.42, 0], [0, 0, 0], 14);
    c.tor(o.hatKey || 'clothPlum', 0.3, 0.06, [0, 0.04, 0], [Math.PI / 2, 0, 0], 14);
    c.sph('gold', 0.05, [0, 0.9, 0], 8);
    headGrp.add(c.build(M));
  } else if (o.hat === 'hood') {
    const c = new Merge();
    c.lathe(o.hatKey || 'clothGreen', [[0.02, 0], [0.26, 0.02], [0.28, 0.3], [0.12, 0.5], [0.02, 0.54]], [0, -0.05, -0.02], [0, 0, 0], 12);
    c.sph(o.hatKey || 'clothGreen', 0.24, [0, 0.06, -0.08], 12);
    headGrp.add(c.build(M));
  } else if (o.hat === 'helmet') {
    const c = new Merge();
    c.lathe('iron', [[0.02, 0], [0.22, 0.01], [0.235, 0.16], [0.2, 0.22]], [0, 0.03, 0], [0, 0, 0], 14);
    c.box('iron', 0.5, 0.1, 0.12, [0, -0.1, 0.14], [0, 0, 0]);
    c.cone('clothRose', 0.07, 0.2, [0, 0.34, 0], [0, 0, 0], 8);
    headGrp.add(c.build(M));
  } else if (o.hat === 'feather') {
    const c = new Merge();
    c.lathe('leather', [[0.02, 0], [0.24, 0.02], [0.26, 0.12], [0.3, 0.14]], [0, 0.1, 0], [0, 0, 0], 14);
    c.box('clothRose', 0.5, 0.04, 0.18, [0, 0.04, 0.06], [0, 0, 0.12]);
    c.cone('cream', 0.06, 0.34, [0.2, 0.34, 0.02], [0, 0, -0.4], 6);
    headGrp.add(c.build(M));
  } else if (o.hat === 'straw') {
    const c = new Merge();
    c.lathe('thatch', [[0.02, 0], [0.34, 0.02], [0.3, 0.12], [0.15, 0.16], [0.02, 0.17]], [0, 0.06, 0], [0, 0, 0], 14);
    headGrp.add(c.build(M));
  }
  g.add(headGrp);
  parts.head = headGrp;

  const arms = [];
  [-1, 1].forEach((sd) => {
    const a = new THREE.Group();
    a.position.set(sd * 0.24, shoulderY + 0.12, 0);
    const Am = new Merge();
    Am.cyl(coatKey, 0.075, 0.065, 0.5, [0, -0.25, 0], [0, 0, 0], 8);
    Am.tor(o.cuffKey || 'cream', 0.075, 0.028, [0, -0.46, 0], [Math.PI / 2, 0, 0], 10);
    Am.sph(skinKey, 0.075, [0, -0.55, 0], 10);
    a.add(Am.build(M));
    a.rotation.z = sd * 0.14;
    g.add(a);
    arms.push(a);
  });
  parts.armL = arms[0];
  parts.armR = arms[1];

  const legs = [];
  [-1, 1].forEach((sd) => {
    const l = limb(pantKey, hipY, 0.085, o.shoes || 'woodDark', o.footScale || 1);
    l.position.set(sd * 0.12, hipY, 0);
    g.add(l);
    legs.push(l);
  });
  parts.legL = legs[0];
  parts.legR = legs[1];

  if (o.scarf) {
    const mat = new THREE.MeshStandardMaterial({ color: o.scarfColor || '#f2c14e', roughness: 0.9, side: THREE.DoubleSide });
    const neck = new THREE.Mesh(gTor(0.19, 0.075, 12, 6), mat);
    neck.rotation.x = Math.PI / 2 - 0.2;
    neck.position.y = shoulderY + 0.12;
    g.add(neck);
    const geo = gPlane(0.3, 2.0, 4, 22);
    geo.rotateX(-Math.PI / 2);
    geo.translate(0, 0, -1.0);
    const cloth = new WaveCloth(g, geo, mat, {
      pos: [0.1, shoulderY + 0.12, -0.16],
      rot: [0.12, 0, 0],
      amp: 0.26,
      freq: 2.6,
      speed: 3.2,
      dir: 'y'
    });
    parts.scarf = cloth;
  }
  if (o.cape) {
    const mat = new THREE.MeshStandardMaterial({ color: o.capeColor || PAL.clothPlum, roughness: 0.95, side: THREE.DoubleSide });
    const geo = gPlane(0.62, 1.1, 8, 12);
    geo.translate(0, -0.55, 0);
    const cloth = new WaveCloth(g, geo, mat, { pos: [0, shoulderY + 0.24, -0.2], rot: [0.06, 0, 0], amp: 0.07, freq: 1.5, speed: 1.6, dir: 'y' });
    parts.cape = cloth;
  }
  if (o.carry) {
    const h = arms[1];
    const c = new Merge();
    c.lathe('thatch', [[0.02, 0], [0.18, 0.02], [0.2, 0.16], [0.02, 0.17]], [0, 0, 0], [0, 0, 0], 10);
    const basket = c.build(M);
    basket.position.set(0, -0.6, 0.06);
    h.add(basket);
  }
  if (o.broom) {
    const c = new Merge();
    c.cyl('woodDark', 0.03, 0.03, 1.2, [0, 0, 0], [0, 0, 0], 6);
    c.cone('thatch', 0.14, 0.4, [0, -0.75, 0], [Math.PI, 0, 0], 8);
    const br = c.build(M);
    br.position.set(0, -0.4, 0.1);
    arms[1].add(br);
    arms[1].rotation.z = 0.5;
  }
  g.scale.setScalar(s);
  g.userData.height = 1.86 * s;
  tag(g);
  return { group: g, parts, h: 1.86 * s, s };
}

function tag(g) {
  g.traverse((o) => {
    if (o.isMesh) o.userData.fig = g;
  });
  return g;
}

export class Actor {
  constructor(fig, o = {}) {
    this.fig = fig;
    this.g = fig.group;
    this.ph = R(0, TAU);
    this.mode = o.mode || 'idle';
    this.speed = o.speed || 1.1;
    this.armAmp = o.armAmp ?? 0.34;
    this.legAmp = o.legAmp ?? 0.5;
    this.bob = o.bob ?? 0.03;
    this.tilt = o.tilt ?? 0;
    this.pause = o.pause || 0;
    this.curve = null;
    this.u = o.u0 || 0;
    this.loop = o.loop !== false;
    this.swing = 0;
    this.hammer = o.hammer || false;
    tick((dt, t) => this.tick(dt, t));
  }
  walkOn(curve, opt = {}) {
    this.mode = 'walk';
    this.curve = curve;
    this.u = opt.u0 ?? this.u;
    this.speed = opt.speed || this.speed;
    this.dirSign = opt.back ? -1 : 1;
    this.pauseT = 0;
    return this;
  }
  sit(o = {}) {
    this.mode = 'sit';
    const p = this.fig.parts;
    p.legL.rotation.x = -1.42;
    p.legR.rotation.x = -1.35;
    this.g.position.y -= 0.3 * (o.drop ?? 1);
    return this;
  }
  tick(dt, t) {
    const p = this.fig.parts;
    const s = this.fig.s;
    if (this.mode === 'walk' && this.curve) {
      if (this.pauseT > 0) {
        this.pauseT -= dt;
      } else {
        const len = this.curve.getLength();
        this.u += (this.speed * dt) / len;
        if (this.u > 1) this.u = this.loop ? 0 : 1;
        if (this.u < 0) this.u = 1;
      }
      const pos = this.curve.getPointAt(clamp(this.u, 0, 1));
      const tan = this.curve.getTangentAt(clamp(this.u, 0, 1));
      this.g.position.set(pos.x, pos.y, pos.z);
      this.g.rotation.y = Math.atan2(tan.x, tan.z);
      const moving = this.pauseT <= 0 ? 1 : 0;
      this.swing += dt * this.speed * 6.2 * moving;
      const sw = Math.sin(this.swing);
      p.legL.rotation.x = sw * this.legAmp;
      p.legR.rotation.x = -sw * this.legAmp;
      p.armL.rotation.x = -sw * this.armAmp;
      p.armR.rotation.x = sw * this.armAmp;
      p.torso.position.y = Math.abs(Math.cos(this.swing)) * this.bob * s;
      p.head.rotation.z = sw * 0.05;
      p.head.rotation.y = Math.sin(t * 0.6 + this.ph) * 0.16;
      this.g.position.y += Math.abs(Math.sin(this.swing)) * this.bob * s * 0.6;
    } else if (this.mode === 'sit') {
      const br = Math.sin(t * 1.1 + this.ph) * 0.02;
      p.torso.rotation.x = 0.06 + br * 0.4;
      p.head.rotation.y = Math.sin(t * 0.5 + this.ph) * 0.3;
      p.head.rotation.x = Math.sin(t * 0.9 + this.ph) * 0.05;
      p.armL.rotation.x = -0.55 + br;
      p.armR.rotation.x = -0.55 - br;
      p.armL.rotation.z = 0.34;
      p.armR.rotation.z = -0.34;
    } else if (this.mode === 'work') {
      const sw = Math.sin(t * (this.hammer ? 4.6 : 2.4) + this.ph);
      p.armR.rotation.x = this.hammer ? -1.2 + sw * 0.9 : -0.5 + sw * 0.3;
      p.armL.rotation.x = -0.4 + sw * 0.15 * (this.hammer ? 0.2 : 1);
      p.armL.rotation.z = 0.3;
      p.torso.rotation.x = 0.16 + sw * (this.hammer ? 0.16 : 0.07);
      p.head.rotation.x = 0.3;
      p.head.rotation.y = Math.sin(t * 0.7) * 0.14;
      p.legL.rotation.x = 0.1;
      p.legR.rotation.x = -0.1;
    } else if (this.mode === 'freeze') {
      return;
    } else {
      const br = Math.sin(t * 1.3 + this.ph);
      p.torso.position.y = br * 0.012 * s;
      p.torso.rotation.z = Math.sin(t * 0.7 + this.ph) * 0.02;
      p.head.rotation.y = Math.sin(t * 0.32 + this.ph) * 0.34 + Math.sin(t * 0.9 + this.ph) * 0.08;
      p.head.rotation.z = Math.sin(t * 0.5 + this.ph * 2) * 0.03;
      p.armL.rotation.x = br * 0.05;
      p.armR.rotation.x = -br * 0.05;
      p.armL.rotation.z = 0.14 + Math.sin(t * 0.6 + this.ph) * 0.05;
      p.armR.rotation.z = -0.14 - Math.sin(t * 0.6 + this.ph + 1) * 0.05;
      if (this.fig.parts.hatBob) this.fig.parts.hatBob.rotation.z = br * 0.04;
    }
  }
}

export function addFigure(parent, name, desc, fig, opts = {}) {
  parent.add(fig.group);
  registerFigure(fig.group, name, desc, opts);
  if (opts.pos) fig.group.position.set(opts.pos[0], opts.pos[1], opts.pos[2]);
  if (opts.ry !== undefined) fig.group.rotation.y = opts.ry;
  fig.group.traverse((o) => {
    if (o.isMesh) {
      o.castShadow = true;
      o.receiveShadow = true;
    }
  });
  return fig;
}

export function makeBeast(o = {}) {
  const s = o.scale || 1;
  const g = new THREE.Group();
  const bodyKey = o.body || 'fur';
  const parts = {};
  const Mg = new Merge();
  const bw = o.bw || 0.3, bl = o.bl || 0.62, bh = o.bh || 0.32;
  const bodyY = o.legLen || 0.34;
  Mg.add(bodyKey, new THREE.SphereGeometry(1, 14, 10), [0, bodyY + bh * 0.5, 0], [0, 0, 0], [bw, bh, bl]);
  const legLen = bodyY;
  const legR = o.legR || 0.05;
  [[-bw * 0.62, -bl * 0.62], [bw * 0.62, -bl * 0.62], [-bw * 0.62, bl * 0.6], [bw * 0.62, bl * 0.6]].forEach(([px, pz], i) => {
    Mg.cyl(o.legKey || bodyKey, legR, legR * 0.85, legLen, [px, legLen / 2, pz], [0, 0, 0], 8);
    Mg.sph(o.hoofKey || o.legKey || bodyKey, legR * 1.15, [px, 0.04, pz], 8);
  });
  if (o.wool) {
    for (let i = 0; i < 12; i++) {
      Mg.sph(o.wool, R(0.12, 0.2), [R(-bw, bw) * 0.9, bodyY + bh * R(0.4, 1.1), R(-bl, bl) * 0.85], 8);
    }
  }
  Mg.add(bodyKey, new THREE.SphereGeometry(1, 12, 9), [0, bodyY + bh * (o.neckUp || 0.85), bl * (o.neckF || 0.62)], [0, 0, 0], [bw * 0.62, bh * 0.8, bl * 0.34]);
  const headY = bodyY + bh * (o.headUp || 1.35);
  const headZ = bl * (o.headF || 0.86);
  Mg.add(bodyKey, new THREE.SphereGeometry(o.headR || 0.17, 12, 9), [0, headY, headZ], [0, 0, 0], [1, 0.92, 1.14]);
  Mg.sph(o.muzzleKey || o.headKey || bodyKey, (o.headR || 0.17) * 0.55, [0, headY - 0.02, headZ + (o.headR || 0.17) * 0.95], 8);
  Mg.sph('ink', 0.025, [-0.06, headY + 0.03, headZ + 0.15], 6);
  Mg.sph('ink', 0.025, [0.06, headY + 0.03, headZ + 0.15], 6);
  if (o.ears === 'pointy') {
    [-1, 1].forEach((sd) => {
      Mg.cone(o.earKey || bodyKey, 0.09, 0.26, [sd * 0.11, headY + 0.16, headZ - 0.02], [0.1, 0, sd * 0.28], 6);
      Mg.cone('clothRose', 0.05, 0.14, [sd * 0.11, headY + 0.15, headZ + 0.01], [0.1, 0, sd * 0.28], 6);
    });
  } else if (o.ears === 'flop') {
    [-1, 1].forEach((sd) => {
      Mg.cyl(o.earKey || bodyKey, 0.06, 0.045, 0.2, [sd * 0.15, headY + 0.06, headZ], [0.4, 0, sd * 1.2], 6);
    });
  } else if (o.ears === 'tiny') {
    [-1, 1].forEach((sd) => Mg.sph(o.earKey || bodyKey, 0.05, [sd * 0.13, headY + 0.11, headZ - 0.02], 6));
  }
  if (o.chest) Mg.add(o.chest, new THREE.SphereGeometry(1, 10, 8), [0, bodyY + bh * 0.35, bl * 0.6], [0, 0, 0], [bw * 0.45, bh * 0.5, bl * 0.2]);
  if (o.horns) {
    [-1, 1].forEach((sd) => Mg.cone('cream', 0.05, 0.18, [sd * 0.1, headY + 0.16, headZ - 0.06], [0, 0, sd * 0.5], 6));
  }
  g.add(Mg.build(M));
  if (o.tail === 'bushy') {
    const tm = new Merge();
    for (let i = 0; i < 4; i++) tm.sph(o.tailKey || o.body || 'fur', 0.14 - i * 0.012, [0, bodyY + bh * 0.5 + i * 0.03, -(bl + 0.1 + i * 0.13)], 8);
    if (o.tailTip) tm.sph(o.tailTip, 0.1, [0, bodyY + bh * 0.62, -(bl + 0.56)], 8);
    parts.tail = tm.build(M);
    g.add(parts.tail);
  } else if (o.tail === 'thin') {
    const tm = new Merge();
    tm.cyl(o.tailKey || o.body || 'fur', 0.03, 0.02, 0.4, [0, bodyY + bh * 0.6, -(bl + 0.18)], [-0.5, 0, 0], 6);
    tm.sph(o.body || 'fur', 0.06, [0, bodyY + bh * 0.78, -(bl + 0.36)], 6);
    parts.tail = tm.build(M);
    g.add(parts.tail);
  } else if (o.tail === 'mane') {
    const tm = new Merge();
    for (let i = 0; i < 7; i++) tm.sph(o.tailKey || 'horseDark', R(0.07, 0.1), [R(-0.03, 0.03), bodyY + bh * (0.5 + i * 0.06), -(bl * (0.9 - i * 0.1))], 6);
    parts.tail = tm.build(M);
    g.add(parts.tail);
    const mane = new Merge();
    for (let i = 0; i < 6; i++) mane.sph(o.tailKey || 'horseDark', 0.09, [0, bodyY + bh * (0.95 + i * 0.11), bl * (0.6 - i * 0.06)], 6);
    g.add(mane.build(M));
  }
  g.scale.setScalar(s);
  g.traverse((o) => {
    if (o.isMesh) {
      o.castShadow = true;
      o.receiveShadow = true;
    }
  });
  tag(g);
  parts.legs = g;
  return { group: g, parts, h: (bodyY + bh) * s, s };
}

export class BeastActor {
  constructor(fig, o = {}) {
    this.fig = fig;
    this.g = fig.group;
    this.ph = R(0, TAU);
    this.mode = o.mode || 'idle';
    this.speed = o.speed || 0.7;
    this.curve = null;
    this.u = o.u0 || 0;
    this.baseY = 0;
    if (fig.parts.tail) this.tail = fig.parts.tail;
    tick((dt, t) => this.tick(dt, t));
  }
  walkOn(curve, opt = {}) {
    this.mode = 'walk';
    this.curve = curve;
    this.u = opt.u0 ?? 0;
    this.speed = opt.speed || 1;
    return this;
  }
  tick(dt, t) {
    const g = this.g;
    if (this.mode === 'walk' && this.curve) {
      const len = this.curve.getLength();
      this.u += (this.speed * dt) / len;
      if (this.u > 1) this.u = 0;
      const p = this.curve.getPointAt(this.u);
      const tg = this.curve.getTangentAt(this.u);
      g.position.set(p.x, p.y + Math.abs(Math.sin(t * 6)) * 0.05, p.z);
      g.rotation.y = Math.atan2(tg.x, tg.z);
      g.rotation.z = Math.sin(t * 6) * 0.04;
    } else {
      g.position.y = (this.baseY || g.position.y) + Math.sin(t * 1.4 + this.ph) * 0.02;
      g.rotation.y += Math.sin(t * 0.4 + this.ph) * 0.0016;
    }
    if (this.tail) this.tail.rotation.y = Math.sin(t * 3 + this.ph) * 0.3;
  }
  setBase(y) {
    this.baseY = y;
    this.g.position.y = y;
    return this;
  }
}

export function makeRose(parent, x, y, z, s = 1, opts = {}) {
  const g = new THREE.Group();
  g.position.set(x, y, z);
  parent.add(g);
  const Mg = new Merge();
  Mg.lathe('dirt', [[0.005, 0], [0.3 * s, 0.0], [0.34 * s, 0.26 * s], [0.3 * s, 0.4 * s], [0.35 * s, 0.44 * s], [0.28 * s, 0.44 * s]], [0, 0, 0], [0, 0, 0], 12);
  Mg.cyl('foliage2', 0.022 * s, 0.026 * s, 1.2 * s, [0, 0.9 * s, 0], [0.04, 0, 0.03], 8);
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * TAU + 0.4;
    const yy = 0.5 * s + i * 0.16 * s;
    Mg.add('foliage2', new THREE.SphereGeometry(0.13 * s, 8, 6), [Math.cos(a) * 0.16 * s, yy, Math.sin(a) * 0.16 * s], [R(-0.4, 0.4), a, R(-0.4, 0.4)], [1, 0.42, 1.5]);
    Mg.cone('clothRose', 0.02 * s, 0.07 * s, [Math.cos(a) * 0.2 * s, yy + 0.05 * s, Math.sin(a) * 0.2 * s], [0, 0, 0], 5);
  }
  const m = Mg.build(M);
  g.add(m);
  const petals = new Merge();
  const layer = (r, h, off, key, n) => {
    for (let i = 0; i < n; i++) {
      const a = (i / n) * TAU + off;
      petals.add(key, new THREE.SphereGeometry(r, 10, 8), [Math.cos(a) * r * 0.72, h, Math.sin(a) * r * 0.72], [0, a, R(-0.2, 0.2)], [1, 0.6, 1.25]);
    }
  };
  layer(0.19 * s, 1.44 * s, 0, 'rosePetal', 6);
  layer(0.14 * s, 1.6 * s, 0.5, 'rosePetal', 5);
  layer(0.09 * s, 1.74 * s, 0.2, 'clothRose', 4);
  petals.sph('gold', 0.06 * s, [0, 1.87 * s, 0], 8);
  const pm = petals.build(M);
  g.add(pm);
  if (opts.dome !== false) {
    const dome = new THREE.Mesh(new THREE.SphereGeometry(0.62 * s, 24, 16, 0, TAU, 0, Math.PI / 2), M.glassDome);
    dome.position.set(0, 1.45 * s, 0);
    dome.castShadow = false;
    g.add(dome);
    const base = new THREE.Mesh(gTor(0.6 * s, 0.05 * s, 24, 8), M.woodDark);
    base.rotation.x = Math.PI / 2;
    base.position.set(0, 1.45 * s, 0);
    g.add(base);
    const knob = new THREE.Mesh(gSph(0.09 * s, 10), M.gold);
    knob.position.set(0, 2.07 * s, 0);
    g.add(knob);
  }
  const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: texSoft('#ffd9e0'), transparent: true, opacity: 0.22, blending: THREE.AdditiveBlending, depthWrite: false }));
  halo.scale.setScalar(2.6 * s);
  halo.position.set(0, 1.6 * s, 0);
  g.add(halo);
  tick((dt, t) => {
    pm.rotation.y = Math.sin(t * 0.4) * 0.08;
    halo.material.opacity = 0.14 + Math.sin(t * 0.9) * 0.04;
  });
  tag(g);
  return { group: g, parts: {}, h: 2 * s, s };
}
