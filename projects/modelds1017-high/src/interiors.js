import * as THREE from 'three';
import {
  PAL,
  mat,
  mesh,
  box,
  cyl,
  cone,
  sph,
  ico,
  torus,
  capsule,
  roundedBox,
  canvasTexture,
  glowSprite,
  shadowAll,
  makeWindow,
  makeBanner,
  archWall,
  flat,
} from './utils.js';

/* 主堡内部可用范围（本地坐标） */
const IX = 4.55;
const IZ = 4.05;
export const LEVELS = { hall: 0, lib: 4.3, obs: 8.6, roof: 12.9 };

const BOOK_COLORS = [0xc7786f, 0x7f9c8a, 0xd8b36a, 0x8a7fa8, 0xb98a6a, 0x6f8fa8, 0xcf9aa2];

function at(obj, x, y, z, ry = 0) {
  obj.position.set(x, y, z);
  obj.rotation.y = ry;
  return obj;
}

/* ------------------------------------------------------------------ *
 *  家具零件
 * ------------------------------------------------------------------ */
export function table(w, d, h, color = PAL.wood, opts = {}) {
  const g = new THREE.Group();
  const top = box(w, 0.12, d, color);
  top.position.y = h;
  g.add(top);
  const legT = 0.12;
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      const leg = box(legT, h, legT, PAL.woodDark);
      leg.position.set(sx * (w / 2 - 0.15), h / 2, sz * (d / 2 - 0.15));
      g.add(leg);
    }
  }
  if (opts.cloth) {
    const cloth = box(w * 0.98, 0.04, d * 0.98, opts.cloth, { castShadow: false });
    cloth.position.y = h + 0.08;
    g.add(cloth);
  }
  shadowAll(g);
  return g;
}

export function bench(w, h = 0.45, color = PAL.wood) {
  const g = new THREE.Group();
  const seat = box(w, 0.1, 0.42, color);
  seat.position.y = h;
  g.add(seat);
  for (const sx of [-1, 1]) {
    const leg = box(0.1, h, 0.38, PAL.woodDark);
    leg.position.set(sx * (w / 2 - 0.18), h / 2, 0);
    g.add(leg);
  }
  shadowAll(g);
  return g;
}

export function chair(color = PAL.wood) {
  const g = new THREE.Group();
  const seat = box(0.5, 0.1, 0.5, color);
  seat.position.y = 0.48;
  g.add(seat);
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      const leg = box(0.07, 0.48, 0.07, PAL.woodDark);
      leg.position.set(sx * 0.19, 0.24, sz * 0.19);
      g.add(leg);
    }
  }
  const back = box(0.5, 0.65, 0.07, color);
  back.position.set(0, 0.82, -0.22);
  g.add(back);
  shadowAll(g);
  return g;
}

function candle(x, y, z, h = 0.26, parent) {
  const g = new THREE.Group();
  const stick = cyl(0.035, 0.045, h, PAL.cream, 6, { castShadow: false });
  stick.position.y = h / 2;
  g.add(stick);
  const flame = cone(0.05, 0.2, 0xffb45e, 5, { castShadow: false });
  flame.position.y = h + 0.1;
  flame.material = new THREE.MeshBasicMaterial({ color: 0xffb45e });
  g.add(flame);
  const glow = glowSprite(0.55, 0xffca82, 0.6);
  glow.position.y = h + 0.1;
  g.add(glow);
  g.position.set(x, y, z);
  if (parent) parent.add(g);
  return g;
}

function plate(x, y, z, color = PAL.cream) {
  const p = cyl(0.16, 0.14, 0.03, color, 12, { castShadow: false });
  p.position.set(x, y, z);
  return p;
}
function goblet(x, y, z) {
  const g = new THREE.Group();
  const cup = cyl(0.055, 0.035, 0.13, PAL.gold, 8, { castShadow: false });
  cup.position.y = 0.07;
  g.add(cup);
  const stem = cyl(0.012, 0.012, 0.09, PAL.gold, 5, { castShadow: false });
  stem.position.y = -0.02;
  g.add(stem);
  const base = cyl(0.05, 0.05, 0.015, PAL.gold, 8, { castShadow: false });
  base.position.y = -0.06;
  g.add(base);
  g.position.set(x, y, z);
  return g;
}

function barrel(x, y, z, s = 1) {
  const g = new THREE.Group();
  const body = cyl(0.28 * s, 0.24 * s, 0.7 * s, PAL.wood, 12);
  body.position.y = 0.35 * s;
  g.add(body);
  for (const yy of [0.15, 0.35, 0.55]) {
    const hoop = cyl(0.285 * s, 0.285 * s, 0.04, 0x6f5a46, 12, { castShadow: false });
    hoop.position.y = yy * s;
    g.add(hoop);
  }
  g.position.set(x, y, z);
  shadowAll(g);
  return g;
}

function crate(x, y, z, s = 0.6) {
  const g = new THREE.Group();
  const b = box(s, s * 0.8, s * 0.8, PAL.woodPale);
  b.position.y = s * 0.4;
  g.add(b);
  for (const sx of [-1, 1]) {
    const slat = box(0.05, s * 0.8, s * 0.82, PAL.woodDark, { castShadow: false });
    slat.position.set(sx * s * 0.32, s * 0.4, 0);
    g.add(slat);
  }
  g.position.set(x, y, z);
  return g;
}

function sack(x, y, z, s = 1, color = 0xd9c9a8) {
  const g = new THREE.Group();
  const body = sph(0.3 * s, color, { seg: 10, seg2: 8 });
  body.scale.set(1, 1.15, 0.9);
  body.position.y = 0.3 * s;
  g.add(body);
  const tie = torus(0.11 * s, 0.03, PAL.woodDark, { tubular: 10 });
  tie.position.y = 0.56 * s;
  tie.rotation.x = Math.PI / 2;
  g.add(tie);
  g.position.set(x, y, z);
  return g;
}

function rug(w, d, color, border, x, y, z, ry = 0) {
  const g = new THREE.Group();
  const base = new THREE.Mesh(new THREE.PlaneGeometry(w, d), mat(color));
  base.rotation.x = -Math.PI / 2;
  base.receiveShadow = true;
  g.add(base);
  const frame = new THREE.Mesh(new THREE.PlaneGeometry(w, d), mat(border));
  frame.rotation.x = -Math.PI / 2;
  frame.position.y = 0.005;
  frame.scale.set(0.9, 0.86, 1);
  // 用四条边代替整块遮挡
  g.remove(frame);
  const strip = (ww, dd, ox, oz) => {
    const s = new THREE.Mesh(new THREE.PlaneGeometry(ww, dd), mat(border));
    s.rotation.x = -Math.PI / 2;
    s.position.set(ox, 0.006, oz);
    g.add(s);
  };
  strip(w, 0.12, 0, d / 2 - 0.06);
  strip(w, 0.12, 0, -d / 2 + 0.06);
  strip(0.12, d, w / 2 - 0.06, 0);
  strip(0.12, d, -w / 2 + 0.06, 0);
  g.position.set(x, y, z);
  g.rotation.y = ry;
  return g;
}

function tapestryTexture() {
  return canvasTexture(256, 300, (c, w, h) => {
    c.fillStyle = '#b98a76';
    c.fillRect(0, 0, w, h);
    c.fillStyle = '#cfae8e';
    c.fillRect(12, 12, w - 24, h - 24);
    c.fillStyle = '#8fa6b8';
    for (let i = 0; i < 3; i++) {
      c.beginPath();
      c.arc(60 + i * 65, 220, 55, Math.PI, 0);
      c.fill();
    }
    c.fillStyle = '#7f9c7f';
    for (let i = 0; i < 3; i++) {
      c.beginPath();
      c.arc(55 + i * 70, 240, 45, Math.PI, 0);
      c.fill();
    }
    c.fillStyle = '#e8d18a';
    c.beginPath();
    c.arc(180, 80, 26, 0, Math.PI * 2);
    c.fill();
    c.strokeStyle = '#8f6f5f';
    c.lineWidth = 3;
    c.strokeRect(24, 24, w - 48, h - 48);
    // 小城堡剪影
    c.fillStyle = '#9b7f86';
    c.fillRect(70, 130, 18, 60);
    c.fillRect(100, 145, 14, 45);
    c.beginPath();
    c.moveTo(64, 130);
    c.lineTo(79, 108);
    c.lineTo(94, 130);
    c.fill();
  });
}

function tapestry(w, h, x, y, z, ry = 0, color = 0xb98a76) {
  const g = new THREE.Group();
  const tex = tapestryTexture();
  const cloth = new THREE.Mesh(
    new THREE.PlaneGeometry(w, h),
    new THREE.MeshToonMaterial({ map: tex, color })
  );
  cloth.castShadow = false;
  g.add(cloth);
  const rod = cyl(0.035, 0.035, w + 0.2, PAL.woodDark, 6, { castShadow: false });
  rod.rotation.z = Math.PI / 2;
  rod.position.y = h / 2 + 0.05;
  g.add(rod);
  g.position.set(x, y, z);
  g.rotation.y = ry;
  return g;
}

function firePlace(parent, x, y, z, ry = 0, size = 1) {
  const g = new THREE.Group();
  const surround = box(2.9 * size, 3.2 * size, 0.5, PAL.stone);
  surround.position.set(0, 1.6 * size, 0);
  g.add(surround);
  const opening = box(1.9 * size, 1.85 * size, 0.6, 0x3d3238, { castShadow: false });
  opening.position.set(0, 0.95 * size, 0.06);
  g.add(opening);
  const hearth = box(3.1 * size, 0.18, 0.9, PAL.stoneDark, { castShadow: false });
  hearth.position.set(0, 0.09, 0.42);
  g.add(hearth);
  const mantel = box(3.3 * size, 0.2, 0.7, PAL.stoneDark);
  mantel.position.set(0, 3.25 * size, 0.1);
  g.add(mantel);
  const chimney = box(2.4 * size, 1.4, 0.55, PAL.stoneWarm, { castShadow: false });
  chimney.position.set(0, 3.9, -0.02);
  g.add(chimney);

  // 柴火
  for (let i = 0; i < 4; i++) {
    const log = cyl(0.1, 0.1, 1.1 * size, PAL.woodDark, 6);
    log.rotation.z = Math.PI / 2;
    log.rotation.y = (Math.random() - 0.5) * 0.6;
    log.position.set((Math.random() - 0.5) * 0.5, 0.25 + i * 0.13, 0.12);
    g.add(log);
  }
  // 火焰
  const flames = new THREE.Group();
  for (let i = 0; i < 5; i++) {
    const f = cone(0.14 + Math.random() * 0.12, 0.45 + Math.random() * 0.35, 0xffb066, 6, {
      castShadow: false,
    });
    f.material = new THREE.MeshBasicMaterial({
      color: i % 2 ? 0xffb257 : 0xffd484,
      transparent: true,
      opacity: 0.92,
    });
    f.position.set((Math.random() - 0.5) * 0.9, 0.42 + Math.random() * 0.1, 0.12);
    f.userData.phase = Math.random() * 6;
    f.userData.baseY = f.position.y;
    flames.add(f);
  }
  flames.position.y = 0.2;
  g.add(flames);
  g.userData.flames = flames;

  const light = new THREE.PointLight(0xffab5e, 12, 9, 2);
  light.position.set(0, 1.3, 0.8);
  g.add(light);

  const glow = glowSprite(2.4, 0xffb46a, 0.5);
  glow.position.set(0, 1.0, 0.5);
  g.add(glow);

  g.position.set(x, y, z);
  g.rotation.y = ry;
  return { group: g, light, flames };
}

/* ------------------------------------------------------------------ *
 *  大厅（L1 前部）
 * ------------------------------------------------------------------ */
export function buildGreatHall(ctx) {
  const g = new THREE.Group();
  const y0 = LEVELS.hall;

  // 分隔墙（大厅 / 厨房）
  const part = new THREE.Group();
  const partL = box(3.5, 4.2, 0.32, PAL.stoneCool);
  partL.position.set(-2.9, 2.1, -1.25);
  part.add(partL);
  const partR = box(2.6, 4.2, 0.32, PAL.stoneCool);
  partR.position.set(3.3, 2.1, -1.25);
  part.add(partR);
  const lintel = box(2.1, 1.0, 0.32, PAL.stoneCool);
  lintel.position.set(0, 3.7, -1.25);
  part.add(lintel);
  const archTrim = new THREE.Mesh(new THREE.TorusGeometry(1.0, 0.07, 6, 18, Math.PI), mat(PAL.stoneDark));
  archTrim.position.set(0, 2.7, -1.08);
  part.add(archTrim);
  g.add(part);
  {
    const mats = [];
    part.traverse((o) => {
      if (o.isMesh) {
        const m = o.material.clone();
        m.transparent = true;
        o.material = m;
        mats.push(m);
      }
    });
    ctx.cutWalls.push({ obj: part, normal: new THREE.Vector3(0, 0, 1), mats, opacity: 1 });
  }

  // 长桌
  const t = table(5.0, 1.35, 0.86, PAL.wood);
  t.position.set(-0.2, y0 + 0.14, 1.55);
  g.add(t);
  g.add(at(bench(4.4, 0.45, PAL.woodPale), -0.2, y0 + 0.14, 2.45));
  g.add(at(bench(4.4, 0.45, PAL.woodPale), -0.2, y0 + 0.14, 0.65));
  g.add(at(chair(PAL.woodDark), -3.05, y0 + 0.14, 1.55, Math.PI / 2));
  g.add(at(chair(PAL.woodDark), 2.65, y0 + 0.14, 1.55, -Math.PI / 2));

  // 桌布与餐具
  const runner = new THREE.Mesh(new THREE.PlaneGeometry(4.6, 0.42), mat(PAL.wine));
  runner.rotation.x = -Math.PI / 2;
  runner.position.set(-0.2, y0 + 1.06, 1.55);
  g.add(runner);
  for (let i = 0; i < 4; i++) {
    const x = -2.0 + i * 1.2;
    g.add(at(plate(x, y0 + 1.07, 1.24), 0, 0, 0));
    g.add(at(plate(x, y0 + 1.07, 1.86), 0, 0, 0));
    g.add(goblet(x + 0.35, y0 + 1.1, 1.55));
    const bread = sph(0.12, 0xd9b47c, { seg: 8, seg2: 6, castShadow: false });
    bread.scale.set(1.3, 0.7, 0.9);
    bread.position.set(x - 0.2, y0 + 1.14, 1.55);
    g.add(bread);
  }
  // 烤鸡 + 水果盘
  const roast = sph(0.22, 0xc98a5e, { seg: 10, seg2: 8 });
  roast.scale.set(1.5, 0.8, 1);
  roast.position.set(0, y0 + 1.18, 1.55);
  g.add(roast);
  const bowl = cyl(0.34, 0.24, 0.14, PAL.woodPale, 12, { castShadow: false });
  bowl.position.set(1.6, y0 + 1.12, 1.55);
  g.add(bowl);
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    const fruit = sph(0.08, i % 2 ? PAL.red : 0xd8b45e, { seg: 8, seg2: 6, castShadow: false });
    fruit.position.set(1.6 + Math.cos(a) * 0.15, y0 + 1.22, 1.55 + Math.sin(a) * 0.15);
    g.add(fruit);
  }
  candle(-0.2, y0 + 1.06, 1.55, 0.3, g).position.y = y0 + 1.13;

  // 吊灯
  const chand = new THREE.Group();
  const ring = torus(0.72, 0.05, 0x6f5a46, { radial: 6, tubular: 20 });
  ring.rotation.x = Math.PI / 2;
  chand.add(ring);
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    candle(Math.cos(a) * 0.72, 0.05, Math.sin(a) * 0.72, 0.22, chand);
  }
  for (let i = 0; i < 4; i++) {
    const chain = box(0.02, 0.85, 0.02, 0x6f5a46, { castShadow: false });
    chain.position.set(Math.cos((i / 4) * 6.28) * 0.36, 0.5, Math.sin((i / 4) * 6.28) * 0.36);
    chand.add(chain);
  }
  chand.position.set(-0.2, y0 + 3.35, 1.4);
  g.add(chand);

  // 壁炉（西墙）
  const fp = firePlace(ctx, -IX + 0.1, y0 + 0.1, 2.7, Math.PI / 2, 0.92);
  g.add(fp.group);
  ctx.fireLights.push(fp.light);
  ctx.fires.push(fp.flames);

  // 王座
  const dais = box(3.6, 0.26, 1.5, PAL.stoneDark);
  dais.position.set(0, y0 + 0.27, -0.55);
  g.add(dais);
  const daisCarpet = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 1.2), mat(PAL.wine));
  daisCarpet.rotation.x = -Math.PI / 2;
  daisCarpet.position.set(0, y0 + 0.41, -0.55);
  g.add(daisCarpet);
  const throne = new THREE.Group();
  const seat = box(1.1, 0.18, 0.9, PAL.woodDark);
  seat.position.y = 0.55;
  throne.add(seat);
  const cushion = box(0.95, 0.12, 0.8, PAL.red);
  cushion.position.y = 0.68;
  throne.add(cushion);
  const back = box(1.15, 1.6, 0.16, PAL.woodDark);
  back.position.set(0, 1.35, -0.42);
  throne.add(back);
  const backPad = box(0.95, 1.3, 0.08, PAL.red);
  backPad.position.set(0, 1.32, -0.32);
  throne.add(backPad);
  for (const sx of [-1, 1]) {
    const arm = box(0.16, 0.16, 0.85, PAL.woodDark);
    arm.position.set(sx * 0.55, 0.95, 0);
    throne.add(arm);
    const finial = sph(0.1, PAL.gold, { seg: 8, seg2: 6, castShadow: false });
    finial.position.set(sx * 0.55, 1.6, -0.42);
    throne.add(finial);
    const leg = box(0.16, 0.55, 0.16, PAL.woodDark);
    leg.position.set(sx * 0.45, 0.27, 0.3);
    throne.add(leg);
  }
  const crownTop = sph(0.12, PAL.gold, { seg: 8, seg2: 6, castShadow: false });
  crownTop.position.set(0, 2.2, -0.42);
  throne.add(crownTop);
  throne.position.set(0, y0 + 0.4, -0.55);
  g.add(throne);

  // 王座两侧旗帜
  for (const sx of [-1.55, 1.55]) {
    const pole = cyl(0.04, 0.04, 2.9, PAL.woodDark, 6, { castShadow: false });
    pole.position.set(sx, y0 + 1.5, -0.75);
    g.add(pole);
    const flag = makeBanner(0.62, 1.5, PAL.wine);
    flag.geometry.translate(0.31, 0, 0);
    flag.position.set(sx, y0 + 2.1, -0.75);
    g.add(flag);
    ctx.banners.push(flag);
  }

  // 东墙挂毯
  g.add(tapestry(2.4, 2.7, IX - 0.06, y0 + 2.4, 2.4, -Math.PI / 2));

  // 地板与地毯
  g.add(rug(5.6, 3.4, 0x9a6c68, 0xd8b98e, -0.2, y0 + 0.16, 1.55));

  // 靠墙的长凳与木箱
  g.add(at(bench(1.6, 0.42, PAL.woodPale), 3.6, y0 + 0.14, 3.5, Math.PI / 2));
  g.add(at(crate(3.9, y0 + 0.14, 3.75, 0.5), 0, 0, 0));

  // 窗边的暖光（用柔和的点光代替体积光锥）

  return g;
}

/* ------------------------------------------------------------------ *
 *  厨房（L1 后部）
 * ------------------------------------------------------------------ */
export function buildKitchen(ctx) {
  const g = new THREE.Group();
  const y0 = LEVELS.hall;

  // 灶台（西墙）
  const hearth = new THREE.Group();
  const base = box(2.6, 1.1, 1.3, PAL.stoneDark);
  base.position.set(0, 0.55, 0);
  hearth.add(base);
  const arch = archWall(2.2, 2.4, 0.9, 1.3, 1.7, 0x6b5a52);
  arch.position.set(0, 0.05, 0);
  hearth.add(arch);
  const cauldron = sph(0.42, 0x4f4a4d, { seg: 12, seg2: 9 });
  cauldron.scale.set(1, 0.8, 1);
  cauldron.position.set(0, 0.85, 0);
  hearth.add(cauldron);
  const rim = torus(0.4, 0.06, 0x3f3a3d, { tubular: 14 });
  rim.rotation.x = Math.PI / 2;
  rim.position.set(0, 0.98, 0);
  hearth.add(rim);
  const soup = cyl(0.35, 0.35, 0.04, 0xd8b26a, 12, { castShadow: false });
  soup.position.set(0, 1.0, 0);
  hearth.add(soup);

  const fireGlow = glowSprite(1.5, 0xff9d4a, 0.4);
  fireGlow.position.set(0, 0.45, 0.2);
  hearth.add(fireGlow);
  const fire = new THREE.PointLight(0xff9f52, 9, 8, 2);
  fire.position.set(0, 0.9, 0.6);
  hearth.add(fire);
  ctx.fireLights.push(fire);
  const smallFlames = new THREE.Group();
  for (let i = 0; i < 4; i++) {
    const f = cone(0.1, 0.3 + Math.random() * 0.2, 0xffb066, 5, { castShadow: false });
    f.material = new THREE.MeshBasicMaterial({ color: 0xffb868, transparent: true, opacity: 0.9 });
    f.position.set((Math.random() - 0.5) * 0.7, 0.22, 0.1);
    smallFlames.add(f);
  }
  hearth.add(smallFlames);
  ctx.fires.push(smallFlames);
  hearth.position.set(-IX + 0.55, y0 + 0.1, -2.9);
  hearth.rotation.y = Math.PI / 2;
  g.add(hearth);

  // 吊挂的锅
  for (let i = 0; i < 3; i++) {
    const pot = cone(0.16, 0.24, 0x54504f, 8);
    pot.rotation.x = Math.PI;
    pot.position.set(0.5, 1.9 - i * 0.06, -0.5 + i * 0.22);
    g.add(pot);
  }

  // 备菜桌
  const prep = table(2.6, 1.0, 0.82, PAL.woodPale);
  prep.position.set(1.6, y0 + 0.14, -2.9);
  g.add(prep);
  // 蔬菜
  for (let i = 0; i < 7; i++) {
    const veg = sph(0.075, [0xd97f5e, 0x7fa06a, 0xe0b55e][i % 3], { seg: 7, seg2: 6, castShadow: false });
    veg.position.set(1.1 + Math.random() * 1.4, y0 + 1.03, -3.2 + Math.random() * 0.6);
    g.add(veg);
  }
  const board = box(0.7, 0.05, 0.42, PAL.woodDark, { castShadow: false });
  board.position.set(2.0, y0 + 1.0, -2.9);
  g.add(board);
  const knife = box(0.04, 0.02, 0.35, 0xb9b9c4, { castShadow: false });
  knife.position.set(2.1, y0 + 1.04, -2.85);
  knife.rotation.y = 0.3;
  g.add(knife);

  // 挂架与草药
  const rack = box(2.6, 0.07, 0.1, PAL.woodDark, { castShadow: false });
  rack.position.set(0.4, y0 + 3.1, -IZ - 0.1);
  g.add(rack);
  for (let i = 0; i < 6; i++) {
    const herb = new THREE.Group();
    for (let k = 0; k < 5; k++) {
      const leaf = box(0.05, 0.35, 0.02, k % 2 ? 0x7f9c6f : 0x93ab7f, { castShadow: false });
      leaf.position.set((k - 2) * 0.05, -0.2, 0);
      leaf.rotation.z = (k - 2) * 0.12;
      herb.add(leaf);
    }
    herb.position.set(-0.7 + i * 0.42, y0 + 3.0, -IZ - 0.1);
    g.add(herb);
  }

  // 碗架（北墙）
  const shelf = new THREE.Group();
  for (let row = 0; row < 2; row++) {
    const plank = box(2.8, 0.08, 0.4, PAL.woodPale);
    plank.position.set(0, 1.4 + row * 0.8, 0);
    shelf.add(plank);
    for (let i = 0; i < 6; i++) {
      const pot = cyl(0.11, 0.09, 0.18, i % 2 ? 0xcfc6b2 : 0xb98a6a, 8, { castShadow: false });
      pot.position.set(-1.05 + i * 0.42, 1.54 + row * 0.8, 0);
      shelf.add(pot);
    }
  }
  shelf.position.set(1.5, y0 + 0.2, -IZ + 0.15);
  g.add(shelf);

  // 木桶、麻袋、柴堆
  g.add(at(barrel(3.9, y0 + 0.14, -3.75, 0.9), 0, 0, 0));
  g.add(at(barrel(3.7, y0 + 0.14, -2.95, 0.7), 0, 0, 0));
  g.add(at(sack(3.0, y0 + 0.14, -3.8, 0.9), 0, 0, 0));
  g.add(at(sack(3.4, y0 + 0.14, -3.55, 0.7, 0xcbb894), 0, 0, 0));
  for (let i = 0; i < 5; i++) {
    const log = cyl(0.11, 0.11, 0.9, PAL.woodDark, 6);
    log.rotation.z = Math.PI / 2;
    log.rotation.y = Math.PI / 2;
    log.position.set(4.2, y0 + 0.2 + (i % 3) * 0.16, -1.6 + Math.floor(i / 3) * 0.24);
    g.add(log);
  }
  // 鸡蛋篮
  const basket = cyl(0.3, 0.24, 0.22, 0xcaa77a, 12, { castShadow: false });
  basket.position.set(2.9, y0 + 0.25, -2.0);
  g.add(basket);
  for (let i = 0; i < 5; i++) {
    const egg = sph(0.075, 0xf2e5c8, { seg: 7, seg2: 5, castShadow: false });
    egg.scale.set(1, 1.2, 1);
    egg.position.set(2.75 + (i % 3) * 0.13, y0 + 0.36, -2.05 + Math.floor(i / 3) * 0.12);
    g.add(egg);
  }

  // 桌上的烛台
  candle(0.6, y0 + 1.1, -2.9, 0.3, g);

  // 地毯（编织草席）
  g.add(rug(4.4, 2.8, 0xc6a97c, 0x9b7c58, 0.6, y0 + 0.16, -2.7));

  // 挂在梁上的干辣椒串
  for (let i = 0; i < 7; i++) {
    const chili = cone(0.05, 0.16, 0xb85f4f, 5, { castShadow: false });
    chili.rotation.x = Math.PI;
    chili.position.set(-1.4 - i * 0.06, y0 + 2.5 - i * 0.16, -1.7);
    g.add(chili);
  }

  return g;
}

/* ------------------------------------------------------------------ *
 *  书房（L2 前部）
 * ------------------------------------------------------------------ */
function bookshelf(w, h, d, parent) {
  const g = new THREE.Group();
  const back = box(w, h, 0.12, PAL.woodDark);
  back.position.set(0, h / 2, -d / 2);
  g.add(back);
  const rows = Math.max(2, Math.floor(h / 0.55));
  for (let r = 0; r <= rows; r++) {
    const shelf = box(w, 0.08, d, PAL.wood);
    shelf.position.set(0, (r / rows) * h, 0);
    g.add(shelf);
    if (r < rows) {
      let x = -w / 2 + 0.1;
      while (x < w / 2 - 0.12) {
        const bw = 0.06 + Math.random() * 0.06;
        const bh = 0.24 + Math.random() * 0.22;
        const book = box(bw, bh, d * 0.65, BOOK_COLORS[Math.floor(Math.random() * BOOK_COLORS.length)], {
          castShadow: false,
        });
        book.position.set(x + bw / 2, (r / rows) * h + 0.04 + bh / 2, 0.02);
        if (Math.random() > 0.92) {
          book.rotation.z = 0.15;
          book.position.y -= 0.02;
        }
        g.add(book);
        x += bw + 0.012;
      }
    }
  }
  for (const sx of [-1, 1]) {
    const side = box(0.1, h, d, PAL.wood);
    side.position.set(sx * w / 2, h / 2, 0);
    g.add(side);
  }
  parent.add(g);
  return g;
}

export function buildLibrary(ctx) {
  const g = new THREE.Group();
  const y0 = LEVELS.lib;

  // 隔墙（书房 / 卧房）
  const part = new THREE.Group();
  const segL = box(3.1, 4.2, 0.3, PAL.wood);
  segL.position.set(-3.0, 2.1, -0.45);
  part.add(segL);
  const segR = box(2.4, 4.2, 0.3, PAL.wood);
  segR.position.set(3.2, 2.1, -0.45);
  part.add(segR);
  const arch = archWall(2.3, 2.8, 0.3, 1.5, 2.1, PAL.woodDark);
  arch.position.set(0, 0, -0.45);
  part.add(arch);
  const shelfTop = box(2.9, 1.3, 0.3, PAL.wood);
  shelfTop.position.set(0, 3.55, -0.45);
  part.add(shelfTop);
  g.add(part);
  {
    const mats = [];
    part.traverse((o) => {
      if (o.isMesh) {
        const m = o.material.clone();
        m.transparent = true;
        o.material = m;
        mats.push(m);
      }
    });
    ctx.cutWalls.push({ obj: part, normal: new THREE.Vector3(0, 0, 1), mats, opacity: 1 });
  }

  // 书架：南墙、东墙、西墙
  const s1 = bookshelf(7.6, 3.4, 0.5, g);
  s1.position.set(0, y0 + 0.12, IZ - 0.28);
  const s2 = bookshelf(5.4, 3.4, 0.5, g);
  s2.position.set(IX - 0.3, y0 + 0.12, 1.4);
  s2.rotation.y = -Math.PI / 2;
  const s3 = bookshelf(3.4, 3.0, 0.4, g);
  s3.position.set(-IX + 0.3, y0 + 0.12, 2.5);
  s3.rotation.y = Math.PI / 2;

  // 阅读桌
  const desk = table(2.4, 1.15, 0.8, PAL.wood);
  desk.position.set(0.4, y0 + 0.14, 1.7);
  g.add(desk);
  // 打开的书
  const bookG = new THREE.Group();
  for (const sx of [-1, 1]) {
    const page = box(0.42, 0.03, 0.6, PAL.cream, { castShadow: false });
    page.position.set(sx * 0.22, 0.015, 0);
    page.rotation.z = sx * 0.06;
    bookG.add(page);
  }
  const spine = box(0.04, 0.05, 0.6, PAL.wine, { castShadow: false });
  bookG.add(spine);
  bookG.position.set(0.35, y0 + 0.96, 1.7);
  g.add(bookG);
  // 墨水瓶与羽毛笔
  const ink = cyl(0.06, 0.07, 0.1, 0x4b4a5a, 8, { castShadow: false });
  ink.position.set(1.05, y0 + 1.0, 1.55);
  g.add(ink);
  const quill = box(0.02, 0.42, 0.02, PAL.cream, { castShadow: false });
  quill.position.set(1.05, y0 + 1.22, 1.55);
  quill.rotation.z = 0.35;
  g.add(quill);
  candle(-0.4, y0 + 0.96, 1.55, 0.3, g);
  // 椅子
  g.add(at(chair(PAL.woodDark), 0.4, y0 + 0.14, 2.55, Math.PI));

  // 地球仪
  const globe = new THREE.Group();
  const stand = cyl(0.06, 0.16, 0.65, PAL.woodDark, 8);
  stand.position.y = 0.33;
  globe.add(stand);
  const ball = sph(0.36, 0x9fc2b6, { seg: 16, seg2: 12 });
  ball.position.y = 0.95;
  globe.add(ball);
  const meridian = torus(0.38, 0.02, PAL.gold, { radial: 6, tubular: 20 });
  meridian.position.y = 0.95;
  meridian.rotation.y = 0.4;
  globe.add(meridian);
  // 大陆
  for (let i = 0; i < 5; i++) {
    const land = ico(0.12 + Math.random() * 0.12, 0xb7c9a0, { detail: 0, castShadow: false });
    const a = Math.random() * 6.28, b = (Math.random() - 0.5) * 2;
    land.position.set(Math.cos(a) * 0.33, 0.95 + b * 0.3, Math.sin(a) * 0.33);
    land.scale.set(1, 0.7, 1);
    globe.add(land);
  }
  globe.position.set(-2.9, y0 + 0.14, 2.2);
  g.add(globe);

  // 梯子
  const ladder = new THREE.Group();
  for (const sx of [-0.25, 0.25]) {
    const rail = box(0.06, 3.2, 0.06, PAL.woodDark);
    rail.position.set(sx, 1.6, 0);
    ladder.add(rail);
  }
  for (let i = 0; i < 8; i++) {
    const rung = box(0.55, 0.045, 0.045, PAL.wood);
    rung.position.set(0, 0.35 + i * 0.38, 0);
    ladder.add(rung);
  }
  ladder.position.set(-2.2, y0 + 0.14, IZ - 0.85);
  ladder.rotation.z = -0.12;
  g.add(ladder);

  // 星图桌
  const mapTable = table(1.6, 1.0, 0.75, PAL.wood);
  mapTable.position.set(-2.6, y0 + 0.14, 0.6);
  g.add(mapTable);
  const starMap = new THREE.Mesh(
    new THREE.PlaneGeometry(1.3, 0.85),
    new THREE.MeshBasicMaterial({ color: 0x37456b })
  );
  starMap.rotation.x = -Math.PI / 2;
  starMap.rotation.z = 0.12;
  starMap.position.set(-2.6, y0 + 0.91, 0.6);
  g.add(starMap);
  for (let i = 0; i < 26; i++) {
    const star = new THREE.Mesh(
      new THREE.CircleGeometry(0.012, 4),
      new THREE.MeshBasicMaterial({ color: 0xfff2c8 })
    );
    star.rotation.x = -Math.PI / 2;
    star.position.set(
      -2.6 + (Math.random() - 0.5) * 1.2,
      y0 + 0.92,
      0.6 + (Math.random() - 0.5) * 0.75
    );
    g.add(star);
  }

  // 猫头鹰
  const owl = new THREE.Group();
  const body = sph(0.16, 0xb59a7c, { seg: 10, seg2: 8 });
  body.scale.set(1, 1.25, 0.9);
  owl.add(body);
  const eye1 = sph(0.04, 0xfff2d0, { seg: 6, seg2: 5, castShadow: false });
  eye1.position.set(-0.06, 0.05, 0.14);
  owl.add(eye1);
  const eye2 = eye1.clone();
  eye2.position.x = 0.06;
  owl.add(eye2);
  owl.position.set(-1.6, y0 + 3.2, IZ - 0.5);
  g.add(owl);

  // 书堆与散落的卷轴
  for (let i = 0; i < 6; i++) {
    const b = box(0.42, 0.07, 0.3, BOOK_COLORS[i % BOOK_COLORS.length], { castShadow: false });
    b.position.set(-1.2 + Math.random() * 0.2, y0 + 0.25 + i * 0.075, 3.2 + Math.random() * 0.2);
    b.rotation.y = Math.random() * 0.5;
    g.add(b);
  }
  const scroll = cyl(0.06, 0.06, 0.5, 0xe5d6b4, 8, { castShadow: false });
  scroll.rotation.z = Math.PI / 2;
  scroll.position.set(1.8, y0 + 0.25, 3.4);
  g.add(scroll);

  // 窗边坐垫
  const seat = box(1.8, 0.35, 0.7, PAL.wood);
  seat.position.set(2.8, y0 + 0.32, IZ - 0.55);
  g.add(seat);
  const cushion = box(1.6, 0.16, 0.6, PAL.lavender);
  cushion.position.set(2.8, y0 + 0.55, IZ - 0.55);
  g.add(cushion);

  // 台灯
  candle(-2.1, y0 + 0.9, 0.75, 0.26, g);

  // 书房暖光
  const lamp = new THREE.PointLight(0xffc98a, 6, 8, 2);
  lamp.position.set(0.3, y0 + 2.9, 1.8);
  g.add(lamp);

  return g;
}

/* ------------------------------------------------------------------ *
 *  卧房（L2 后部）
 * ------------------------------------------------------------------ */
export function buildSolar(ctx) {
  const g = new THREE.Group();
  const y0 = LEVELS.lib;

  // 四柱床
  const bed = new THREE.Group();
  const frame = box(2.3, 0.42, 2.1, PAL.woodDark);
  frame.position.y = 0.42;
  bed.add(frame);
  const mattress = box(2.1, 0.3, 1.9, PAL.cream);
  mattress.position.y = 0.78;
  bed.add(mattress);
  // 拼布被
  const quiltColors = [0xb9a6cb, 0xd9a0a8, 0xe4c983, 0x9fc2b6];
  for (let i = 0; i < 4; i++) {
    const patch = box(1.0, 0.1, 0.46, quiltColors[i], { castShadow: false });
    patch.position.set(-0.52 + (i % 2) * 1.03, 0.96, -0.45 + Math.floor(i / 2) * 0.48);
    bed.add(patch);
  }
  const pillow = box(1.2, 0.24, 0.42, PAL.white);
  pillow.position.set(0, 1.0, -0.72);
  bed.add(pillow);
  const pillow2 = box(0.9, 0.2, 0.36, 0xead9c4);
  pillow2.position.set(0, 1.16, -0.75);
  bed.add(pillow2);
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      const post = cyl(0.07, 0.09, 2.7, PAL.woodDark, 8);
      post.position.set(sx * 1.05, 1.35, sz * 0.95);
      bed.add(post);
      const knob = sph(0.1, PAL.gold, { seg: 8, seg2: 6, castShadow: false });
      knob.position.set(sx * 1.05, 2.75, sz * 0.95);
      bed.add(knob);
    }
  }
  // 顶篷
  const canopy = box(2.45, 0.1, 2.25, PAL.wine);
  canopy.position.y = 2.65;
  bed.add(canopy);
  const drapeL = box(0.05, 2.0, 2.15, 0xb9848c, { castShadow: false });
  drapeL.position.set(-1.18, 1.65, 0);
  bed.add(drapeL);
  const drapeR = drapeL.clone();
  drapeR.position.x = 1.18;
  bed.add(drapeR);
  bed.position.set(2.2, y0 + 0.14, -2.7);
  bed.rotation.y = -Math.PI / 2;
  g.add(bed);

  // 壁炉（西墙）
  const fp = firePlace(ctx, -IX + 0.12, y0 + 0.12, -2.6, Math.PI / 2, 0.75);
  g.add(fp.group);
  ctx.fireLights.push(fp.light);
  ctx.fires.push(fp.flames);

  // 挂毯（北墙）
  g.add(tapestry(2.6, 2.4, 0.4, y0 + 2.2, -IZ + 0.07, 0, 0xa88f9c));

  // 木箱
  const chest = new THREE.Group();
  const cbody = box(1.2, 0.7, 0.6, PAL.wood);
  cbody.position.y = 0.35;
  chest.add(cbody);
  const lid = box(1.24, 0.16, 0.64, PAL.woodDark);
  lid.position.y = 0.78;
  chest.add(lid);
  for (const sx of [-0.4, 0.4]) {
    const band = box(0.08, 0.72, 0.64, 0x6f5a46, { castShadow: false });
    band.position.set(sx, 0.36, 0);
    chest.add(band);
  }
  chest.position.set(0.2, y0 + 0.14, -3.6);
  g.add(chest);

  // 洗脸台
  const stand = table(1.0, 0.6, 0.8, PAL.woodPale);
  stand.position.set(-3.3, y0 + 0.14, -3.4);
  g.add(stand);
  const basin = cyl(0.26, 0.2, 0.16, 0xcfd6d8, 12, { castShadow: false });
  basin.position.set(-3.3, y0 + 1.02, -3.4);
  g.add(basin);
  const pitcher = cyl(0.1, 0.14, 0.3, 0xbfc9cc, 8, { castShadow: false });
  pitcher.position.set(-3.0, y0 + 1.1, -3.5);
  g.add(pitcher);
  const towel = box(0.3, 0.5, 0.04, PAL.cream, { castShadow: false });
  towel.position.set(-3.6, y0 + 0.85, -3.25);
  g.add(towel);

  // 衣柜
  const wardrobe = box(1.4, 2.4, 0.6, PAL.woodDark);
  wardrobe.position.set(3.9, y0 + 1.3, -3.7);
  g.add(wardrobe);
  const doorLine = box(0.03, 2.2, 0.02, 0x5f4a38, { castShadow: false });
  doorLine.position.set(3.9, y0 + 1.3, -3.38);
  g.add(doorLine);
  for (const sx of [-0.18, 0.18]) {
    const knob = sph(0.04, PAL.gold, { seg: 6, seg2: 5, castShadow: false });
    knob.position.set(3.9 + sx, y0 + 1.3, -3.36);
    g.add(knob);
  }

  // 小桌 + 梳妆镜
  const vanity = table(0.9, 0.5, 0.75, PAL.wood);
  vanity.position.set(-2.6, y0 + 0.14, 2.9);
  g.add(vanity);
  const mirror = new THREE.Mesh(
    new THREE.CircleGeometry(0.3, 16),
    new THREE.MeshBasicMaterial({ color: 0xbcd0d8 })
  );
  mirror.position.set(-2.6, y0 + 1.4, 3.05);
  g.add(mirror);
  const mirrorFrame = torus(0.32, 0.035, PAL.gold, { tubular: 20 });
  mirrorFrame.position.set(-2.6, y0 + 1.4, 3.03);
  g.add(mirrorFrame);
  candle(-2.4, y0 + 0.9, 2.85, 0.22, g);

  // 地毯
  g.add(rug(3.4, 2.6, 0x8f7fa8, 0xd9c89a, 0.6, y0 + 0.16, -2.2));
  // 拖鞋
  for (const sx of [-0.2, 0.15]) {
    const slip = box(0.16, 0.07, 0.3, PAL.rose, { castShadow: false });
    slip.position.set(0.9 + sx, y0 + 0.2, -1.35);
    slip.rotation.y = 0.2;
    g.add(slip);
  }


  return g;
}

/* ------------------------------------------------------------------ *
 *  观星台（L3）+ 露台
 * ------------------------------------------------------------------ */
function starChart() {
  return canvasTexture(256, 256, (c, w, h) => {
    c.fillStyle = '#39456b';
    c.fillRect(0, 0, w, h);
    c.strokeStyle = 'rgba(255,240,200,0.35)';
    c.lineWidth = 1;
    for (let i = 0; i < 8; i++) {
      c.beginPath();
      c.arc(w / 2, h / 2, 20 + i * 14, 0, Math.PI * 2);
      c.stroke();
    }
    for (let i = 0; i < 70; i++) {
      const x = Math.random() * w, y = Math.random() * h;
      const r = Math.random() * 1.8 + 0.4;
      c.fillStyle = 'rgba(255,244,210,0.9)';
      c.beginPath();
      c.arc(x, y, r, 0, Math.PI * 2);
      c.fill();
    }
    c.strokeStyle = 'rgba(255,220,150,0.5)';
    c.beginPath();
    c.moveTo(50, 190);
    c.lineTo(100, 120);
    c.lineTo(150, 150);
    c.lineTo(210, 70);
    c.stroke();
  });
}

export function buildObservatory(ctx) {
  const g = new THREE.Group();
  const y0 = LEVELS.obs;

  // 望远镜
  const scope = new THREE.Group();
  const tube = cyl(0.16, 0.22, 2.6, 0xb08a5e, 12);
  tube.rotation.z = Math.PI / 2;
  tube.position.y = 1.55;
  scope.add(tube);
  const lens = cyl(0.24, 0.24, 0.06, PAL.gold, 12, { castShadow: false });
  lens.rotation.z = Math.PI / 2;
  lens.position.set(1.32, 1.55, 0);
  scope.add(lens);
  const eyepiece = cyl(0.07, 0.09, 0.2, 0x6f5a46, 8);
  eyepiece.rotation.z = Math.PI / 2;
  eyepiece.position.set(-1.36, 1.55, 0);
  scope.add(eyepiece);
  // 三脚架
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2;
    const leg = cyl(0.035, 0.05, 1.6, PAL.woodDark, 6);
    leg.position.set(Math.cos(a) * 0.35, 0.75, Math.sin(a) * 0.35);
    leg.rotation.z = Math.cos(a) * 0.35;
    leg.rotation.x = -Math.sin(a) * 0.35;
    scope.add(leg);
  }
  scope.position.set(0.6, y0 + 0.15, -3.4);
  scope.rotation.y = 1.3;
  scope.rotation.z = 0.32;
  g.add(scope);

  // 星图桌
  const tableG = table(2.2, 1.2, 0.78, PAL.woodDark);
  tableG.position.set(-1.9, y0 + 0.15, 2.4);
  g.add(tableG);
  const chart = new THREE.Mesh(
    new THREE.PlaneGeometry(1.7, 1.0),
    new THREE.MeshBasicMaterial({ map: starChart() })
  );
  chart.rotation.x = -Math.PI / 2;
  chart.position.set(-1.9, y0 + 0.95, 2.4);
  g.add(chart);
  candle(-0.95, y0 + 0.95, 2.4, 0.3, g);
  g.add(at(chair(PAL.woodDark), -1.9, y0 + 0.15, 3.45, Math.PI));

  // 浑天仪
  const armillary = new THREE.Group();
  const stand = cyl(0.08, 0.2, 0.5, PAL.woodDark, 8);
  stand.position.y = 0.25;
  armillary.add(stand);
  for (let i = 0; i < 3; i++) {
    const ring = torus(0.55, 0.025, PAL.gold, { radial: 6, tubular: 28 });
    ring.rotation.x = (i / 3) * Math.PI;
    ring.rotation.z = (i / 5) * Math.PI;
    ring.position.y = 1.05;
    armillary.add(ring);
  }
  const orb = sph(0.16, 0x7d9fbf, { seg: 12, seg2: 9 });
  orb.position.y = 1.05;
  armillary.add(orb);
  armillary.position.set(3.35, y0 + 0.15, -2.5);
  g.add(armillary);

  // 太阳系仪（悬挂，旋转）
  const orrery = new THREE.Group();
  const sun = sph(0.17, 0xffd27a, { seg: 10, seg2: 8, castShadow: false });
  sun.material = new THREE.MeshBasicMaterial({ color: 0xffd27a });
  orrery.add(sun);
  const ring1 = torus(0.65, 0.015, PAL.gold, { radial: 4, tubular: 32 });
  ring1.rotation.x = Math.PI / 2;
  orrery.add(ring1);
  const ring2 = torus(0.95, 0.012, PAL.gold, { radial: 4, tubular: 32 });
  ring2.rotation.x = Math.PI / 2;
  orrery.add(ring2);
  const planets = [];
  for (let i = 0; i < 4; i++) {
    const pivot = new THREE.Group();
    pivot.rotation.y = (i / 4) * Math.PI * 2;
    const arm = box(0.8 + i * 0.18, 0.015, 0.015, PAL.gold, { castShadow: false });
    arm.position.x = (0.8 + i * 0.18) / 2;
    pivot.add(arm);
    const p = sph(0.06 + i * 0.02, [0x9fc2b6, 0xd9a0a8, 0xb9a6cb, 0xe4c983][i], {
      seg: 8,
      seg2: 6,
      castShadow: false,
    });
    p.position.x = 0.8 + i * 0.18;
    pivot.add(p);
    orrery.add(pivot);
    planets.push(pivot);
  }
  orrery.position.set(0, y0 + 3.4, 0.6);
  orrery.userData.spin = 0.18;
  ctx.spinners.push(orrery);
  g.add(orrery);
  const chain = cyl(0.015, 0.015, 1.1, PAL.gold, 4, { castShadow: false });
  chain.position.set(0, y0 + 4.35, 0.6);
  g.add(chain);

  // 书架 / 长椅
  const shelf = bookshelf(3.0, 2.4, 0.45, g);
  shelf.position.set(-IX + 0.45, y0 + 0.15, -1.4);
  shelf.rotation.y = Math.PI / 2;
  const benchSeat = bench(2.0, 0.45, PAL.wood);
  benchSeat.position.set(0.2, y0 + 0.15, -IZ + 0.7);
  g.add(benchSeat);

  // 通往露台的梯子与活板门
  const ladder = new THREE.Group();
  for (const sx of [-0.28, 0.28]) {
    const rail = box(0.06, 2.2, 0.06, PAL.woodDark);
    rail.position.set(sx, 1.1, 0);
    ladder.add(rail);
  }
  for (let i = 0; i < 6; i++) {
    const rung = box(0.6, 0.04, 0.04, PAL.wood);
    rung.position.set(0, 0.3 + i * 0.36, 0);
    ladder.add(rung);
  }
  ladder.position.set(3.9, y0 + 0.15, -1.3);
  g.add(ladder);

  // 毯子
  g.add(rug(3.0, 2.2, 0x7a7098, 0xd9c89a, 0.6, y0 + 0.17, 0.9));

  // 暖光
  const lamp = new THREE.PointLight(0xffc98a, 7, 9, 2);
  lamp.position.set(-0.4, y0 + 3.1, 1.8);
  g.add(lamp);

  // --- 露台（y = 12.9） ---
  const roof = new THREE.Group();
  const yT = LEVELS.roof;
  // 小圆桌 + 椅子
  const rt = table(1.1, 1.1, 0.7, PAL.woodPale);
  rt.position.set(-2.2, yT + 0.15, 1.0);
  roof.add(rt);
  const wine = cyl(0.08, 0.1, 0.3, 0x9c6f7a, 8, { castShadow: false });
  wine.position.set(-2.2, yT + 0.92, 1.0);
  roof.add(wine);
  roof.add(at(chair(PAL.woodPale), -3.3, yT + 0.15, 1.0, Math.PI / 2));
  roof.add(at(chair(PAL.woodPale), -1.1, yT + 0.15, 1.0, -Math.PI / 2));
  // 盆栽
  for (const [x, z] of [[3.4, 2.0], [3.4, -2.4], [-3.4, -2.4]]) {
    const pot = cyl(0.22, 0.16, 0.3, 0xc08a6a, 10);
    pot.position.set(x, yT + 0.3, z);
    roof.add(pot);
    const bush = ico(0.3, PAL.leaf, { detail: 0 });
    bush.position.set(x, yT + 0.62, z);
    roof.add(bush);
  }
  // 灯塔火盆
  const brazier = new THREE.Group();
  const stem = cyl(0.1, 0.2, 0.7, 0x5f5a55, 8);
  stem.position.y = 0.35;
  brazier.add(stem);
  const bowl = cyl(0.4, 0.25, 0.3, 0x6b6060, 10);
  bowl.position.y = 0.8;
  brazier.add(bowl);
  const ember = cyl(0.33, 0.33, 0.05, 0xffa45e, 10, { castShadow: false });
  ember.material = new THREE.MeshBasicMaterial({ color: 0xffa45e });
  ember.position.y = 0.93;
  brazier.add(ember);
  brazier.position.set(0.4, yT + 0.15, -2.9);
  roof.add(brazier);
  const bGlow = glowSprite(2.2, 0xffb066, 0.4);
  bGlow.position.set(0.4, yT + 1.2, -2.9);
  roof.add(bGlow);
  ctx.fireGlows.push(bGlow);
  // 望远镜小模型 / 天文笔记
  const bookOnTable = box(0.3, 0.05, 0.22, PAL.cream, { castShadow: false });
  bookOnTable.position.set(-2.2, yT + 0.9, 1.0);
  roof.add(bookOnTable);
  // 露台地毯
  const rugT = rug(2.2, 1.8, 0xa88f9c, 0xe4c983, 0.5, yT + 0.17, 1.0);
  roof.add(rugT);

  g.add(roof);
  return g;
}

/* ------------------------------------------------------------------ *
 *  礼拜堂内部
 * ------------------------------------------------------------------ */
export function buildChapelInterior(ctx) {
  const g = new THREE.Group();
  const y0 = 0.12;

  // 祭坛
  const altar = table(2.2, 0.8, 0.85, PAL.woodDark);
  altar.position.set(0, y0, -2.15);
  g.add(altar);
  const cloth = box(2.3, 0.5, 0.86, PAL.cream, { castShadow: false });
  cloth.position.set(0, y0 + 0.62, -2.15);
  g.add(cloth);
  const trim = box(2.32, 0.08, 0.88, PAL.gold, { castShadow: false });
  trim.position.set(0, y0 + 0.4, -2.15);
  g.add(trim);
  // 十字架
  const crossV = box(0.1, 0.7, 0.06, PAL.gold);
  crossV.position.set(0, y0 + 1.35, -2.2);
  g.add(crossV);
  const crossH = box(0.42, 0.09, 0.06, PAL.gold);
  crossH.position.set(0, y0 + 1.5, -2.2);
  g.add(crossH);
  candle(-0.8, y0 + 0.88, -2.15, 0.4, g);
  candle(0.8, y0 + 0.88, -2.15, 0.4, g);
  // 祭坛画（三联）
  for (let i = 0; i < 3; i++) {
    const panel = box(0.62, 1.1, 0.06, i === 1 ? 0xd8c58a : 0xc9b2a0);
    panel.position.set(-0.72 + i * 0.72, y0 + 2.3, -2.9);
    g.add(panel);
    const fig = box(0.16, 0.5, 0.02, 0x7f6f8a, { castShadow: false });
    fig.position.set(-0.72 + i * 0.72, y0 + 2.2, -2.86);
    g.add(fig);
  }

  // 长椅
  for (let r = 0; r < 4; r++) {
    for (const sx of [-0.85, 0.85]) {
      const pew = new THREE.Group();
      const seat = box(1.4, 0.1, 0.42, PAL.wood);
      seat.position.y = 0.5;
      pew.add(seat);
      const back = box(1.4, 0.7, 0.08, PAL.wood);
      back.position.set(0, 0.85, -0.22);
      pew.add(back);
      for (const ex of [-0.6, 0.6]) {
        const leg = box(0.08, 0.5, 0.4, PAL.woodDark);
        leg.position.set(ex, 0.25, 0);
        pew.add(leg);
      }
      pew.position.set(sx, y0, -0.5 + r * 1.05);
      g.add(pew);
    }
  }
  // 中央走道地毯
  g.add(rug(0.9, 4.2, 0x9c5560, 0xe4c983, 0, y0 - 0.02, 0.3));

  // 圣水盆
  const font = new THREE.Group();
  const stem = cyl(0.14, 0.24, 0.7, PAL.stone);
  stem.position.y = 0.35;
  font.add(stem);
  const basin = cyl(0.42, 0.28, 0.25, PAL.stoneCool);
  basin.position.y = 0.78;
  font.add(basin);
  const water = cyl(0.34, 0.34, 0.03, PAL.water, 12, { castShadow: false });
  water.material = new THREE.MeshBasicMaterial({ color: 0x9fcbd8, transparent: true, opacity: 0.8 });
  water.position.y = 0.87;
  font.add(water);
  font.position.set(-1.85, y0, 2.3);
  g.add(font);

  // 烛台
  for (const sx of [-1.7, 1.7]) {
    const stand = cyl(0.05, 0.2, 1.3, PAL.gold, 8);
    stand.position.set(sx, y0 + 0.65, -1.5);
    g.add(stand);
    candle(sx, y0 + 1.3, -1.5, 0.28, g);
  }

  // 圣人像（小壁龛）
  const statue = new THREE.Group();
  const halo = torus(0.16, 0.03, PAL.gold, { tubular: 16 });
  halo.position.y = 1.35;
  statue.add(halo);
  const head = sph(0.14, PAL.skin, { seg: 10, seg2: 8 });
  head.position.y = 1.15;
  statue.add(head);
  const body = cone(0.25, 0.8, 0xd8c58a, 8);
  body.position.y = 0.6;
  statue.add(body);
  statue.position.set(1.9, y0, 2.3);
  g.add(statue);

  // 暖光
  const light = new THREE.PointLight(0xffc07a, 8, 8, 2);
  light.position.set(0, 3.0, 0);
  g.add(light);

  // 玫瑰窗投下的彩光（贴地）
  const roseLight = new THREE.Mesh(
    new THREE.CircleGeometry(1.4, 24),
    new THREE.MeshBasicMaterial({ color: 0xd9a0c0, transparent: true, opacity: 0.13 })
  );
  roseLight.rotation.x = -Math.PI / 2;
  roseLight.position.set(0, y0 + 0.01, 1.4);
  g.add(roseLight);

  return g;
}

/* ------------------------------------------------------------------ *
 *  庭院陈设
 * ------------------------------------------------------------------ */
function makeWell(ctx) {
  const g = new THREE.Group();
  const ring = cyl(1.0, 1.1, 0.85, PAL.stone, 16);
  ring.position.y = 0.42;
  g.add(ring);
  const inner = cyl(0.86, 0.86, 0.9, 0x3f4a52, 16, { castShadow: false });
  inner.position.y = 0.4;
  g.add(inner);
  const water = cyl(0.8, 0.8, 0.05, 0x6fa8bf, 16, { castShadow: false });
  water.position.y = 0.55;
  water.material = new THREE.MeshBasicMaterial({ color: 0x76aec4, transparent: true, opacity: 0.9 });
  g.add(water);
  for (const sx of [-0.9, 0.9]) {
    const post = box(0.14, 2.1, 0.14, PAL.woodDark);
    post.position.set(sx, 1.4, 0);
    g.add(post);
  }
  const beam = box(2.1, 0.14, 0.14, PAL.woodDark);
  beam.position.y = 2.4;
  g.add(beam);
  const roofGeo = new THREE.ConeGeometry(1.4, 0.8, 4);
  roofGeo.rotateY(Math.PI / 4);
  const roof = new THREE.Mesh(roofGeo, mat(PAL.roofWarm));
  roof.position.y = 2.95;
  roof.scale.set(1, 1, 0.7);
  roof.castShadow = true;
  g.add(roof);
  const rope = cyl(0.02, 0.02, 1.4, 0x6f5a46, 4, { castShadow: false });
  rope.position.set(0, 1.6, 0);
  g.add(rope);
  const bucket = cyl(0.16, 0.12, 0.24, PAL.wood, 8);
  bucket.position.set(0, 0.85, 0);
  g.add(bucket);
  shadowAll(g);
  return g;
}

function makeForge(ctx) {
  const g = new THREE.Group();
  const base = box(2.0, 1.0, 1.4, PAL.stoneDark);
  base.position.y = 0.5;
  g.add(base);
  const hood = box(1.6, 1.8, 1.2, PAL.stoneCool);
  hood.position.set(0, 2.0, -0.1);
  g.add(hood);
  const hoodTop = cone(0.9, 0.7, PAL.stoneDark, 4);
  hoodTop.position.set(0, 3.2, -0.1);
  hoodTop.rotation.y = Math.PI / 4;
  g.add(hoodTop);
  const coals = box(1.2, 0.12, 0.8, 0xff8f4a, { castShadow: false });
  coals.material = new THREE.MeshBasicMaterial({ color: 0xff9150 });
  coals.position.set(0, 1.02, 0.15);
  g.add(coals);
  const glow = glowSprite(2.0, 0xff8a45, 0.55);
  glow.position.set(0, 1.2, 0.2);
  g.add(glow);
  ctx.fireGlows.push(glow);
  const light = new THREE.PointLight(0xff8f4a, 10, 7, 2);
  light.position.set(0, 1.5, 0.4);
  g.add(light);
  ctx.fireLights.push(light);

  // 铁砧
  const anvil = new THREE.Group();
  const abase = box(0.5, 0.4, 0.5, PAL.woodDark);
  abase.position.y = 0.2;
  anvil.add(abase);
  const body = box(0.72, 0.28, 0.34, 0x55525a);
  body.position.y = 0.54;
  anvil.add(body);
  const horn = cone(0.12, 0.36, 0x55525a, 6);
  horn.rotation.z = -Math.PI / 2;
  horn.position.set(0.5, 0.54, 0);
  anvil.add(horn);
  anvil.position.set(1.6, 0, 0.6);
  g.add(anvil);
  // 锤子
  const hammer = new THREE.Group();
  const handle = box(0.05, 0.5, 0.05, PAL.wood);
  handle.position.y = 0.25;
  hammer.add(handle);
  const head = box(0.22, 0.12, 0.12, 0x4f4d55);
  head.position.y = 0.5;
  hammer.add(head);
  hammer.position.set(1.85, 0.65, 0.8);
  hammer.rotation.z = 0.5;
  g.add(hammer);

  // 水桶
  const bucket = cyl(0.2, 0.16, 0.32, PAL.wood, 10);
  bucket.position.set(1.3, 0.16, -0.4);
  g.add(bucket);
  shadowAll(g);
  return g;
}

function makeStall() {
  const g = new THREE.Group();
  for (const sx of [-1.3, 1.3]) {
    for (const sz of [-0.8, 0.8]) {
      const post = box(0.1, 2.1, 0.1, PAL.woodDark);
      post.position.set(sx, 1.05, sz);
      g.add(post);
    }
  }
  const counter = box(2.7, 0.12, 1.7, PAL.woodPale);
  counter.position.y = 0.9;
  g.add(counter);
  // 条纹遮阳篷
  for (let i = 0; i < 7; i++) {
    const stripe = box(2.9, 0.06, 0.26, i % 2 ? PAL.cream : PAL.rose, { castShadow: false });
    stripe.position.set(0, 2.3, -0.85 + i * 0.29);
    g.add(stripe);
  }
  // 货物
  const goods = [
    [PAL.red, -0.9, -0.4],
    [0xd8b45e, -0.3, -0.35],
    [0x9fc2b6, 0.4, -0.4],
    [0xc98a5e, 1.0, -0.3],
  ];
  for (const [color, x, z] of goods) {
    for (let i = 0; i < 4; i++) {
      const fruit = sph(0.09, color, { seg: 7, seg2: 6, castShadow: false });
      fruit.position.set(x + (i % 2) * 0.16, 1.05, z + Math.floor(i / 2) * 0.16);
      g.add(fruit);
    }
  }
  const basket = cyl(0.3, 0.24, 0.2, 0xcaa77a, 12, { castShadow: false });
  basket.position.set(-0.9, 1.0, 0.35);
  g.add(basket);
  shadowAll(g);
  return g;
}

function makeStable() {
  const g = new THREE.Group();
  for (const [x, z] of [[-1.6, -1.2], [1.6, -1.2], [-1.6, 1.2], [1.6, 1.2]]) {
    const post = box(0.16, 2.6, 0.16, PAL.woodDark);
    post.position.set(x, 1.3, z);
    g.add(post);
  }
  const roof = box(3.8, 0.14, 2.9, PAL.wood);
  roof.position.y = 2.6;
  roof.rotation.x = 0.1;
  g.add(roof);
  // 草顶
  const thatch = box(3.9, 0.16, 2.6, 0xd8bd85, { castShadow: false });
  thatch.position.y = 2.72;
  thatch.rotation.x = 0.1;
  g.add(thatch);
  // 后墙
  const back = box(3.6, 2.4, 0.12, PAL.woodPale);
  back.position.set(0, 1.2, -1.2);
  g.add(back);
  // 隔栏
  for (let i = -1; i <= 1; i++) {
    const bar = box(0.08, 1.1, 0.08, PAL.woodDark);
    bar.position.set(i * 1.1, 0.55, 1.2);
    g.add(bar);
  }
  const rail = box(3.2, 0.08, 0.08, PAL.woodDark);
  rail.position.set(0, 1.05, 1.2);
  g.add(rail);
  // 干草
  const hay = box(1.2, 0.5, 0.8, 0xd9c07a);
  hay.position.set(-1.1, 0.25, -0.5);
  g.add(hay);
  shadowAll(g);
  return g;
}

export function buildCourtyard(ctx) {
  const g = new THREE.Group();

  // 水井
  const well = makeWell(ctx);
  well.position.set(-5.8, 0.05, 6.4);
  g.add(well);

  // 铁匠铺
  const forge = makeForge(ctx);
  forge.position.set(-9.2, 0.08, 3.2);
  forge.rotation.y = 0.3;
  g.add(forge);

  // 市集摊位
  const stall = makeStall();
  stall.position.set(3.3, 0.08, 6.3);
  stall.rotation.y = -0.08;
  g.add(stall);

  // 马厩
  const stable = makeStable();
  stable.position.set(8.4, 0.08, 6.1);
  stable.rotation.y = -0.12;
  g.add(stable);

  // 小树
  const tree = makeCourtyardTree();
  tree.position.set(-4.4, 0.08, 4.2);
  tree.scale.setScalar(0.85);
  g.add(tree);

  // 菜园（东墙下）
  const garden = new THREE.Group();
  const bed = box(3.0, 0.16, 2.2, 0x8f7350);
  bed.position.y = 0.08;
  garden.add(bed);
  for (let r = 0; r < 3; r++) {
    for (let i = 0; i < 6; i++) {
      const veg = ico(0.1, r === 0 ? 0x86b07c : r === 1 ? 0x9fc2b6 : 0xd98b6a, { detail: 0, castShadow: false });
      veg.position.set(-1.1 + i * 0.44, 0.22, -0.65 + r * 0.6);
      garden.add(veg);
    }
  }
  for (let i = 0; i < 3; i++) {
    const stick = cyl(0.02, 0.02, 1.0, PAL.woodPale, 4, { castShadow: false });
    stick.position.set(-1.2 + i * 1.2, 0.5, 0.85);
    garden.add(stick);
  }
  garden.position.set(7.7, 0.06, 3.4);
  g.add(garden);

  // 木桶与箱子堆
  g.add(at(barrel(6.4, 0.08, 3.0, 1), 0, 0, 0));
  g.add(at(barrel(6.9, 0.08, 3.5, 0.8), 0, 0, 0));
  g.add(at(crate(5.6, 0.08, 3.2, 0.6), 0, 0, 0.3));
  g.add(at(crate(5.9, 0.6, 3.25, 0.5), 0, 0, 0));
  // 干草堆
  const haystack = ico(0.7, 0xd9c07a, { detail: 1 });
  haystack.scale.set(1.2, 0.8, 1.1);
  haystack.position.set(4.7, 0.55, 3.3);
  g.add(haystack);

  // 训练假人
  const dummy = new THREE.Group();
  const post = cyl(0.1, 0.14, 2.2, PAL.woodDark, 8);
  post.position.y = 1.1;
  dummy.add(post);
  const body = cyl(0.28, 0.32, 0.8, 0xc9a878, 10);
  body.position.y = 1.5;
  dummy.add(body);
  const head = sph(0.22, 0xd8bd95, { seg: 10, seg2: 8 });
  head.position.y = 2.1;
  dummy.add(head);
  const arm = box(1.5, 0.12, 0.12, PAL.woodPale);
  arm.position.y = 1.7;
  dummy.add(arm);
  dummy.position.set(-6.4, 0.08, 2.4);
  g.add(dummy);

  // 通往城墙的石阶（东墙）
  const stairs = new THREE.Group();
  for (let i = 0; i < 10; i++) {
    const step = box(1.6, 0.5, 0.42, PAL.stoneCool);
    step.position.set(9.9, 0.25 + i * 0.5, 2.6 + i * 0.42);
    stairs.add(step);
  }
  stairs.position.y = 0.08;
  g.add(stairs);

  // 墙上的火把
  for (const [x, z, ry] of [
    [9.9, 5.2, -Math.PI / 2],
    [-6.0, 7.7, 0],
    [6.0, 2.3, 0.4],
  ]) {
    const torch = new THREE.Group();
    const bracket = box(0.1, 0.5, 0.1, PAL.woodDark, { castShadow: false });
    bracket.position.y = 0.25;
    torch.add(bracket);
    const flame = cone(0.1, 0.3, 0xffc477, 6, { castShadow: false });
    flame.material = new THREE.MeshBasicMaterial({ color: 0xffc477 });
    flame.position.y = 0.62;
    torch.add(flame);
    const glow = glowSprite(1.1, 0xffb46a, 0.5);
    glow.position.y = 0.65;
    torch.add(glow);
    torch.position.set(x, 2.3, z);
    torch.rotation.y = ry;
    g.add(torch);
  }

  // 晾衣绳
  const rope = box(0.02, 0.02, 4.5, 0x9a8b76, { castShadow: false });
  rope.rotation.x = Math.PI / 2;
  rope.position.set(-2.0, 3.2, 4.9);
  g.add(rope);
  for (let i = 0; i < 3; i++) {
    const cloth = box(0.6, 0.7, 0.03, [PAL.cream, PAL.lavender, PAL.rose][i], { castShadow: false });
    cloth.position.set(-2.0, 2.85, 3.4 + i * 1.1);
    g.add(cloth);
  }

  // 花盆
  for (const [x, z] of [[-8.9, 6.9], [2.2, 2.4], [9.0, 6.9]]) {
    const pot = cyl(0.22, 0.16, 0.3, 0xc08a6a, 10);
    pot.position.set(x, 0.23, z);
    g.add(pot);
    const flower = ico(0.24, PAL.leafPale, { detail: 0, castShadow: false });
    flower.position.set(x, 0.5, z);
    g.add(flower);
    const bloom = sph(0.08, PAL.rose, { seg: 6, seg2: 5, castShadow: false });
    bloom.position.set(x, 0.68, z);
    g.add(bloom);
  }

  // 木制手推车
  const cart = new THREE.Group();
  const bed2 = box(1.4, 0.3, 0.8, PAL.wood);
  bed2.position.y = 0.45;
  cart.add(bed2);
  for (const sx of [-0.5, 0.5]) {
    const wheel = torus(0.28, 0.06, PAL.woodDark, { radial: 6, tubular: 12 });
    wheel.position.set(sx, 0.3, 0.45);
    wheel.rotation.y = Math.PI / 2;
    cart.add(wheel);
  }
  const handle = box(0.08, 0.08, 0.9, PAL.woodDark);
  handle.position.set(0, 0.5, -0.7);
  handle.rotation.x = 0.3;
  cart.add(handle);
  cart.position.set(-3.6, 0.08, 3.6);
  cart.rotation.y = 0.5;
  g.add(cart);

  return g;
}

function makeCourtyardTree() {
  const g = new THREE.Group();
  const trunk = cyl(0.16, 0.24, 1.6, PAL.woodDark, 8);
  trunk.position.y = 0.8;
  g.add(trunk);
  const crown = ico(1.0, PAL.leaf, { detail: 1 });
  crown.position.y = 2.3;
  g.add(crown);
  const crown2 = ico(0.7, PAL.leafPale, { detail: 1 });
  crown2.position.set(0.4, 2.8, 0.2);
  g.add(crown2);
  shadowAll(g);
  return g;
}

/* ------------------------------------------------------------------ *
 *  军械库（庭院西侧棚屋）
 * ------------------------------------------------------------------ */
export function buildArmory(ctx) {
  const g = new THREE.Group();
  g.position.set(-9.3, 0.08, 6.8);

  // 棚子
  for (const [x, z] of [[-1.4, -0.9], [1.4, -0.9], [-1.4, 0.9], [1.4, 0.9]]) {
    const post = box(0.14, 2.5, 0.14, PAL.woodDark);
    post.position.set(x, 1.25, z);
    g.add(post);
  }
  const roof = box(3.4, 0.16, 2.3, PAL.roofWarm);
  roof.position.y = 2.55;
  g.add(roof);
  const back = box(3.0, 2.2, 0.12, PAL.woodPale);
  back.position.set(0, 1.1, -0.95);
  g.add(back);

  // 武器架：长矛
  for (let i = 0; i < 5; i++) {
    const shaft = cyl(0.025, 0.025, 2.1, PAL.woodDark, 5);
    shaft.position.set(-1.1 + i * 0.22, 1.15, -0.72);
    shaft.rotation.z = 0.06;
    g.add(shaft);
    const tip = cone(0.05, 0.22, 0xc9c6d0, 5);
    tip.position.set(-1.1 + i * 0.22 + 0.07, 2.3, -0.72);
    g.add(tip);
  }
  // 盾牌
  const shieldColors = [PAL.wine, PAL.blue, PAL.gold, PAL.red];
  for (let i = 0; i < 4; i++) {
    const shield = new THREE.Group();
    const body = cyl(0.28, 0.28, 0.06, shieldColors[i], 12);
    body.rotation.x = Math.PI / 2;
    shield.add(body);
    const boss = sph(0.09, PAL.gold, { seg: 8, seg2: 6 });
    boss.position.z = 0.06;
    shield.add(boss);
    shield.position.set(-0.9 + i * 0.6, 1.55, -0.65);
    shield.rotation.x = 0.08;
    g.add(shield);
  }
  // 剑架
  for (let i = 0; i < 3; i++) {
    const sword = new THREE.Group();
    const blade = box(0.07, 1.0, 0.02, 0xc9c6d0);
    blade.position.y = 0.62;
    sword.add(blade);
    const guard = box(0.26, 0.05, 0.04, PAL.gold);
    guard.position.y = 0.12;
    sword.add(guard);
    const grip = cyl(0.03, 0.03, 0.22, PAL.woodDark, 6);
    grip.position.y = -0.02;
    sword.add(grip);
    sword.position.set(0.35 + i * 0.26, 0.55, 0.55);
    sword.rotation.z = -0.1;
    g.add(sword);
  }
  // 盔甲架
  const armor = new THREE.Group();
  const torso = cyl(0.3, 0.26, 0.8, 0xb9b9c4, 10);
  torso.position.y = 1.2;
  armor.add(torso);
  const helm = sph(0.24, 0xb9b9c4, { seg: 10, seg2: 8 });
  helm.position.y = 1.85;
  armor.add(helm);
  const visor = box(0.3, 0.06, 0.04, 0x5f5a55);
  visor.position.set(0, 1.82, 0.22);
  armor.add(visor);
  const plume = cone(0.1, 0.4, PAL.red, 6);
  plume.position.y = 2.16;
  armor.add(plume);
  const stand = cyl(0.2, 0.32, 1.0, PAL.woodDark, 8);
  stand.position.y = 0.5;
  armor.add(stand);
  armor.position.set(0.9, 0.08, 0.3);
  armor.rotation.y = 0.3;
  g.add(armor);

  shadowAll(g);
  return g;
}