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
  roundedBox,
  plane,
  makeWindow,
  makeBanner,
  archWall,
  glowSprite,
  shadowAll,
  clamp,
  canvasTexture,
} from './utils.js';
import {
  buildGreatHall,
  buildKitchen,
  buildLibrary,
  buildSolar,
  buildObservatory,
  buildChapelInterior,
  buildCourtyard,
  buildArmory,
} from './interiors.js';

/* 主堡尺寸 */
export const KEEP = {
  w: 10,
  d: 9,
  floorH: 4.3,
  levels: 3,
  x: 0,
  z: -2.5,
  height: 12.9,
};

const STONE = PAL.stone;
const STONE_DARK = PAL.stoneDark;
const TRIM = PAL.stoneLine;

/* ------------------------------------------------------------------ *
 *  剖切工具：给整组克隆材质，便于淡出
 * ------------------------------------------------------------------ */
export function tagCut(ctx, group, nx, ny, nz) {
  const mats = [];
  group.traverse((o) => {
    if (o.isMesh && o.material) {
      const arr = Array.isArray(o.material) ? o.material : [o.material];
      const cloned = arr.map((m) => {
        const c = m.clone();
        c.transparent = true;
        c.opacity = 1;
        // 窗光材质被克隆后也要继续参与昼夜变化
        if (ctx.windowMats.includes(m)) ctx.windowMats.push(c);
        return c;
      });
      o.material = Array.isArray(o.material) ? cloned : cloned[0];
      mats.push(...cloned);
    }
  });
  ctx.cutWalls.push({
    obj: group,
    normal: new THREE.Vector3(nx, ny, nz).normalize(),
    mats,
    opacity: 1,
  });
  return group;
}

/* 城垛：沿线段排一圈小方块 */
function crenellate(parent, x1, z1, x2, z2, y, thick, color, step = 1.12, mh = 0.62) {
  const len = Math.hypot(x2 - x1, z2 - z1);
  const n = Math.max(1, Math.round(len / step));
  for (let i = 0; i < n; i++) {
    const t = (i + 0.5) / n;
    const x = x1 + (x2 - x1) * t;
    const z = z1 + (z2 - z1) * t;
    const m = box(thick * 0.55, mh, thick * 0.55, color, { castShadow: false });
    m.position.set(x, y + mh / 2, z);
    m.rotation.y = -Math.atan2(z2 - z1, x2 - x1);
    parent.add(m);
  }
}

function bannerOn(parent, x, y, z, rotY, color, w = 1.0, h = 2.4) {
  const b = makeBanner(w, h, color);
  b.position.set(x, y, z);
  b.rotation.y = rotY;
  b.userData.wave = 0.8;
  parent.add(b);
  return b;
}

/* 爬墙常春藤 */
const ivyLeafGeo = new THREE.IcosahedronGeometry(0.085, 0);
const ivyMats = [
  new THREE.MeshToonMaterial({ color: 0x6f9c62 }),
  new THREE.MeshToonMaterial({ color: 0x87ac74 }),
  new THREE.MeshToonMaterial({ color: 0x5f8c58 }),
];
const ivyStemMat = new THREE.MeshToonMaterial({ color: 0x6f5a44 });

function addIvy(parent, x, y, z, w, h, ry) {
  const g = new THREE.Group();
  for (let i = 0; i < 54; i++) {
    const lx = (Math.random() - 0.5) * w;
    const ly = Math.random() * h;
    const leaf = new THREE.Mesh(ivyLeafGeo, ivyMats[i % 3]);
    leaf.position.set(lx, ly, (Math.random() - 0.5) * 0.07);
    leaf.scale.set(0.9 + Math.random() * 0.7, 0.75, 0.24);
    leaf.rotation.set(0, Math.random() * 3, Math.random() * 3);
    leaf.castShadow = false;
    g.add(leaf);
  }
  for (let s = 0; s < 4; s++) {
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.013, 0.022, h * 0.95, 4), ivyStemMat);
    stem.position.set((Math.random() - 0.5) * w * 0.7, h * 0.47, 0.02);
    stem.rotation.z = (Math.random() - 0.5) * 0.3;
    stem.castShadow = false;
    g.add(stem);
  }
  g.position.set(x, y, z);
  g.rotation.y = ry;
  parent.add(g);
  return g;
}

/* ------------------------------------------------------------------ *
 *  一座圆形角楼
 * ------------------------------------------------------------------ */
function roundTower(ctx, r, h, roofH, color, roofColor, opts = {}) {
  const g = new THREE.Group();
  const body = cyl(r, r * 1.03, h, color, 18);
  body.position.y = h / 2;
  g.add(body);

  const plinth = cyl(r * 1.12, r * 1.18, 0.7, STONE_DARK, 18);
  plinth.position.y = 0.35;
  g.add(plinth);

  for (let i = 1; i <= Math.floor(h / 3.2); i++) {
    const band = cyl(r * 1.02, r * 1.02, 0.16, TRIM, 18);
    band.position.y = i * 3.2;
    g.add(band);
  }

  const corbel = cyl(r * 1.22, r * 1.02, 0.5, STONE_DARK, 18);
  corbel.position.y = h - 0.25;
  g.add(corbel);

  if (roofH > 0) {
    const roof = cone(r * 1.35, roofH, roofColor, 18);
    roof.position.y = h + roofH / 2 - 0.05;
    g.add(roof);
    const finial = sph(0.12, PAL.gold, { seg: 8, seg2: 6, castShadow: false });
    finial.position.y = h + roofH;
    g.add(finial);
    // 旗杆与旗
    if (opts.flag !== false) {
      const pole = cyl(0.035, 0.045, 1.6, PAL.woodDark, 6, { castShadow: false });
      pole.position.y = h + roofH + 0.7;
      g.add(pole);
      const flag = makeBanner(1.15, 0.62, opts.flagColor ?? PAL.red);
      flag.geometry.translate(0.575, 0, 0);
      flag.position.set(0, h + roofH + 1.15, 0);
      flag.rotation.y = Math.PI / 2;
      g.add(flag);
      ctx.banners.push(flag);
    }
  } else {
    // 齿状女儿墙
    const n = 10;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      const m = box(r * 0.42, 0.7, r * 0.38, color, { castShadow: false });
      m.position.set(Math.cos(a) * r * 0.86, h + 0.35, Math.sin(a) * r * 0.86);
      m.rotation.y = -a;
      g.add(m);
    }
  }

  // 细长窗
  const winMat = new THREE.MeshBasicMaterial({ color: 0xffd8a2, transparent: true, opacity: 0.9 });
  ctx.windowMats.push(winMat);
  const rows = Math.max(2, Math.floor(h / 3.4));
  for (let row = 0; row < rows; row++) {
    const count = 3;
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2 + (opts.winPhase ?? 0.4) + row * 0.5;
      const win = new THREE.Mesh(new THREE.PlaneGeometry(0.24, 0.95), winMat);
      win.position.set(Math.cos(a) * (r * 1.02), 1.9 + row * 3.1, Math.sin(a) * (r * 1.02));
      win.rotation.y = -a + Math.PI / 2;
      g.add(win);
      const lintel = box(0.36, 0.1, 0.08, STONE_DARK, { castShadow: false });
      lintel.position.set(Math.cos(a) * (r * 1.045), 1.9 + row * 3.1 + 0.55, Math.sin(a) * (r * 1.045));
      lintel.rotation.y = -a + Math.PI / 2;
      g.add(lintel);
    }
  }

  // 门口暖光
  if (opts.door) {
    const door = box(0.6, 1.3, 0.1, PAL.woodDark, { castShadow: false });
    door.position.set(opts.door[0], 0.65, opts.door[1]);
    door.rotation.y = opts.doorRot || 0;
    g.add(door);
  }

  shadowAll(g);
  return g;
}

/* ------------------------------------------------------------------ *
 *  幕墙
 * ------------------------------------------------------------------ */
function curtainWall(ctx, x1, z1, x2, z2, height, thick, color) {
  const len = Math.hypot(x2 - x1, z2 - z1);
  const angle = -Math.atan2(z2 - z1, x2 - x1);
  const g = new THREE.Group();
  const wall = box(len, height, thick, color);
  wall.position.set((x1 + x2) / 2, height / 2, (z1 + z2) / 2);
  wall.rotation.y = angle;
  g.add(wall);

  const plinth = box(len, 0.75, thick + 0.3, STONE_DARK);
  plinth.position.set((x1 + x2) / 2, 0.37, (z1 + z2) / 2);
  plinth.rotation.y = angle;
  g.add(plinth);

  const band = box(len, 0.2, thick + 0.14, TRIM);
  band.position.set((x1 + x2) / 2, height - 0.8, (z1 + z2) / 2);
  band.rotation.y = angle;
  g.add(band);

  // 走道外沿的护墙
  const parapet = box(len, 0.55, 0.24, color);
  parapet.position.set((x1 + x2) / 2, height + 0.27, (z1 + z2) / 2);
  parapet.rotation.y = angle;
  g.add(parapet);

  crenellate(g, x1, z1, x2, z2, height + 0.55, thick, color);

  // 外墙面上的箭孔
  const n = Math.floor(len / 3.4);
  for (let i = 0; i < n; i++) {
    const t = (i + 0.5) / n;
    const x = x1 + (x2 - x1) * t;
    const z = z1 + (z2 - z1) * t;
    const slit = box(0.12, 0.8, 0.2, 0x6b6270, { castShadow: false });
    slit.position.set(x, height * 0.55, z);
    slit.rotation.y = angle;
    g.add(slit);
  }

  return g;
}

/* ------------------------------------------------------------------ *
 *  主堡墙体（含窗、剖切标记）
 * ------------------------------------------------------------------ */
function keepWall(ctx, side) {
  const { w, d, height, floorH } = KEEP;
  const g = new THREE.Group();
  const T = 0.62;
  const wallColor = PAL.stoneWarm;

  let size, pos, normal, rotY;
  if (side === 's') {
    size = [w, height, T];
    pos = [0, height / 2, d / 2];
    normal = [0, 0, 1];
    rotY = 0;
  } else if (side === 'n') {
    size = [w, height, T];
    pos = [0, height / 2, -d / 2];
    normal = [0, 0, -1];
    rotY = Math.PI;
  } else if (side === 'w') {
    size = [T, height, d];
    pos = [-w / 2, height / 2, 0];
    normal = [-1, 0, 0];
    rotY = -Math.PI / 2;
  } else {
    size = [T, height, d];
    pos = [w / 2, height / 2, 0];
    normal = [1, 0, 0];
    rotY = Math.PI / 2;
  }

  const wall = box(size[0], size[1], size[2], wallColor);
  wall.position.set(...pos);
  g.add(wall);

  // 底部墙裙与腰线
  const base = box(size[0] + 0.1, 0.9, size[2] + 0.28, STONE_DARK);
  base.position.set(pos[0], 0.45, pos[2]);
  g.add(base);
  for (const y of [floorH, floorH * 2, floorH * 3]) {
    const line = box(size[0] + 0.08, 0.14, size[2] + 0.16, TRIM, { castShadow: false });
    line.position.set(pos[0], y, pos[2]);
    g.add(line);
  }

  // 每层窗
  const horizontal = side === 's' || side === 'n';
  const winCount = horizontal ? 3 : 2;
  const span = horizontal ? w : d;
  const glowMats = [];
  for (let lvl = 0; lvl < 3; lvl++) {
    for (let i = 0; i < winCount; i++) {
      const t = (i + 0.5) / winCount;
      const u = (t - 0.5) * span * 0.74;
      const y = 2.15 + lvl * floorH;
      const big = lvl === 2;
      const ww = big ? 1.15 : 0.85;
      const wh = big ? 1.9 : 1.25;
      const winGroup = new THREE.Group();
      const glowMat = new THREE.MeshBasicMaterial({
        color: 0x9fb6bd,
        transparent: true,
        opacity: 0.92,
      });
      glowMats.push(glowMat);
      const glass = new THREE.Mesh(new THREE.PlaneGeometry(ww, wh), glowMat);
      winGroup.add(glass);
      const frameMat = mat(PAL.stoneLine);
      const fr = new THREE.Mesh(new THREE.BoxGeometry(ww + 0.18, 0.1, 0.12), frameMat);
      fr.position.y = wh / 2 + 0.05;
      winGroup.add(fr);
      const fr2 = fr.clone();
      fr2.position.y = -wh / 2 - 0.05;
      winGroup.add(fr2);
      const fr3 = new THREE.Mesh(new THREE.BoxGeometry(0.09, wh + 0.2, 0.12), frameMat);
      fr3.position.x = -ww / 2 - 0.045;
      winGroup.add(fr3);
      const fr4 = fr3.clone();
      fr4.position.x = ww / 2 + 0.045;
      winGroup.add(fr4);
      const mull = new THREE.Mesh(new THREE.BoxGeometry(0.06, wh, 0.1), frameMat);
      winGroup.add(mull);
      // 窗台
      const sill = new THREE.Mesh(new THREE.BoxGeometry(ww + 0.4, 0.1, 0.3), frameMat);
      sill.position.y = -wh / 2 - 0.12;
      sill.position.z = 0.1;
      winGroup.add(sill);

      if (horizontal) {
        winGroup.position.set(u, y, pos[2] + (side === 's' ? T / 2 + 0.01 : -T / 2 - 0.01));
        winGroup.rotation.y = side === 's' ? 0 : Math.PI;
      } else {
        winGroup.position.set(pos[0] + (side === 'e' ? T / 2 + 0.01 : -T / 2 - 0.01), y, u);
        winGroup.rotation.y = side === 'e' ? Math.PI / 2 : -Math.PI / 2;
      }
      g.add(winGroup);
      ctx.windowMats.push(glowMat);

      // 内墙面的窗（让室内也能看见天光）
      const inner = winGroup.clone(true);
      if (horizontal) {
        inner.position.set(u, y, pos[2] + (side === 's' ? -T / 2 - 0.01 : T / 2 + 0.01));
        inner.rotation.y = side === 's' ? Math.PI : 0;
      } else {
        inner.position.set(pos[0] + (side === 'e' ? -T / 2 - 0.01 : T / 2 + 0.01), y, u);
        inner.rotation.y = side === 'e' ? -Math.PI / 2 : Math.PI / 2;
      }
      g.add(inner);
    }
  }

  // 南门
  if (side === 's') {
    const doorG = new THREE.Group();
    const frame = archWall(2.5, 3.4, 0.2, 1.5, 2.6, PAL.stoneDark);
    doorG.add(frame);
    const leafMat = mat(PAL.woodDark);
    const leaf = new THREE.Mesh(new THREE.BoxGeometry(1.42, 2.55, 0.12), leafMat);
    leaf.position.set(0, 1.27, 0.12);
    doorG.add(leaf);
    for (let i = 0; i < 4; i++) {
      const plankLine = new THREE.Mesh(new THREE.BoxGeometry(0.03, 2.45, 0.02), mat(PAL.wood));
      plankLine.position.set(-0.5 + i * 0.33, 1.27, 0.19);
      doorG.add(plankLine);
    }
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.025, 6, 12), mat(PAL.gold));
    ring.position.set(0.35, 1.25, 0.2);
    doorG.add(ring);
    doorG.position.set(0, 0.05, d / 2 + T / 2 + 0.04);
    g.add(doorG);
    // 门口石阶
    for (let i = 0; i < 3; i++) {
      const s = box(3.2 - i * 0.35, 0.22, 0.5, PAL.stoneCool, { castShadow: false });
      s.position.set(0, 0.11 + i * 0.02, d / 2 + 0.75 + i * 0.5);
      g.add(s);
    }
    // 门两侧壁灯
    for (const sx of [-1.9, 1.9]) {
      const bracket = box(0.08, 0.5, 0.08, PAL.stoneDark, { castShadow: false });
      bracket.position.set(sx, 2.6, d / 2 + 0.42);
      g.add(bracket);
      const torch = cyl(0.09, 0.11, 0.26, PAL.woodDark, 6, { castShadow: false });
      torch.position.set(sx, 2.85, d / 2 + 0.6);
      g.add(torch);
      const flameGlow = glowSprite(1.2, 0xffcf8a, 0.5);
      flameGlow.position.set(sx, 2.95, d / 2 + 0.62);
      g.add(flameGlow);
      ctx.fireGlows.push(flameGlow);
    }
  }

  // 北墙外挂一道旗
  if (side === 'n') {
    const b = bannerOn(g, 2.6, 8.4, -d / 2 - 0.38, Math.PI, PAL.wine, 1.1, 2.6);
    ctx.banners.push(b);
  }

  tagCut(ctx, g, normal[0], normal[1], normal[2]);
  return g;
}

/* ------------------------------------------------------------------ *
 *  主堡外壳 + 露台
 * ------------------------------------------------------------------ */
function buildKeep(ctx) {
  const { w, d, height, floorH } = KEEP;
  const g = new THREE.Group();
  g.position.set(KEEP.x, 0, KEEP.z);

  for (const side of ['s', 'n', 'w', 'e']) g.add(keepWall(ctx, side));

  // 楼层板
  for (let lvl = 1; lvl <= 3; lvl++) {
    const y = lvl * floorH;
    const slab = box(w - 0.9, 0.22, d - 0.9, PAL.stoneCool, { castShadow: false });
    slab.position.y = y;
    g.add(slab);
    // 板下木梁
    for (let i = 0; i < 3; i++) {
      const beam = box(w - 1.1, 0.12, 0.16, PAL.woodDark, { castShadow: false });
      beam.position.set(0, y - 0.17, -2.4 + i * 2.4);
      g.add(beam);
    }
    // 楼层边缘的木质封边，让剖面更清晰
    for (const sz of [1, -1]) {
      const fascia = box(w - 0.2, 0.34, 0.16, PAL.wood, { castShadow: false });
      fascia.position.set(0, y - 0.1, sz * (d / 2 - 0.12));
      g.add(fascia);
    }
    for (const sx of [1, -1]) {
      const fascia = box(0.16, 0.34, d - 0.2, PAL.wood, { castShadow: false });
      fascia.position.set(sx * (w / 2 - 0.12), y - 0.1, 0);
      g.add(fascia);
    }
  }

  // 地面
  const ground = box(w - 0.9, 0.12, d - 0.9, 0xb8a891, { castShadow: false });
  ground.position.y = 0.02;
  g.add(ground);

  // 露台女儿墙
  const terraceY = height;
  const pT = 0.34;
  const parapets = [
    [w + 0.4, 0.9, pT, 0, terraceY + 0.45, d / 2 - pT / 2],
    [w + 0.4, 0.9, pT, 0, terraceY + 0.45, -d / 2 + pT / 2],
    [pT, 0.9, d + 0.4, -w / 2 + pT / 2, terraceY + 0.45, 0],
    [pT, 0.9, d + 0.4, w / 2 - pT / 2, terraceY + 0.45, 0],
  ];
  for (const [ww, hh, dd, x, y, z] of parapets) {
    const p = box(ww, hh, dd, PAL.stoneWarm);
    p.position.set(x, y, z);
    g.add(p);
  }
  crenellate(g, -w / 2, d / 2 - pT / 2, w / 2, d / 2 - pT / 2, terraceY + 0.9, 0.42, PAL.stoneWarm, 1.1, 0.55);
  crenellate(g, -w / 2, -d / 2 + pT / 2, w / 2, -d / 2 + pT / 2, terraceY + 0.9, 0.42, PAL.stoneWarm, 1.1, 0.55);
  crenellate(g, -w / 2 + pT / 2, -d / 2, -w / 2 + pT / 2, d / 2, terraceY + 0.9, 0.42, PAL.stoneWarm, 1.1, 0.55);
  crenellate(g, w / 2 - pT / 2, -d / 2, w / 2 - pT / 2, d / 2, terraceY + 0.9, 0.42, PAL.stoneWarm, 1.1, 0.55);

  // 露台旗杆
  const pole = cyl(0.06, 0.08, 5.2, PAL.woodDark, 8);
  pole.position.set(w / 2 - 1.2, terraceY + 2.6, -d / 2 + 1.2);
  g.add(pole);
  const bigFlag = makeBanner(1.9, 1.15, PAL.wine);
  bigFlag.geometry.translate(0.95, 0, 0);
  bigFlag.position.set(w / 2 - 1.2, terraceY + 4.5, -d / 2 + 1.2);
  g.add(bigFlag);
  ctx.banners.push(bigFlag);
  const finial = sph(0.16, PAL.gold, { seg: 10, seg2: 8 });
  finial.position.set(w / 2 - 1.2, terraceY + 5.25, -d / 2 + 1.2);
  g.add(finial);

  // 四角小塔
  const turretSpots = [
    [-w / 2 - 0.1, -d / 2 - 0.1],
    [w / 2 + 0.1, -d / 2 - 0.1],
    [-w / 2 - 0.1, d / 2 + 0.1],
    [w / 2 + 0.1, d / 2 + 0.1],
  ];
  for (const [x, z] of turretSpots) {
    const t = roundTower(ctx, 1.12, height + 3.2, 2.6, PAL.stoneWarm, PAL.roof, { flag: false });
    t.position.set(x, 0, z);
    g.add(t);
  }

  // 楼梯塔（西侧）
  const stair = new THREE.Group();
  const tower = cyl(1.28, 1.34, height + 2.2, PAL.stone, 16);
  tower.position.y = (height + 2.2) / 2;
  stair.add(tower);
  const ring = cyl(1.34, 1.34, 0.18, TRIM, 16);
  ring.position.y = floorH * 2;
  stair.add(ring);
  const roof = cone(1.62, 2.5, PAL.roofTeal, 16);
  roof.position.y = height + 2.2 + 1.25;
  stair.add(roof);
  const pole2 = cyl(0.03, 0.04, 1.2, PAL.woodDark, 6, { castShadow: false });
  pole2.position.y = height + 4.7;
  stair.add(pole2);
  // 每层门洞
  for (let lvl = 0; lvl < 3; lvl++) {
    const dg = new THREE.Group();
    const arch = archWall(1.15, 2.2, 0.18, 0.72, 1.7, PAL.stoneDark);
    dg.add(arch);
    const light = new THREE.Mesh(
      new THREE.PlaneGeometry(0.68, 1.55),
      new THREE.MeshBasicMaterial({ color: 0xffce8e, transparent: true, opacity: 0.75 })
    );
    light.position.set(0, 0.8, 0.1);
    dg.add(light);
    ctx.windowMats.push(light.material);
    dg.position.set(1.06, lvl * floorH + 0.02, 0);
    dg.rotation.y = Math.PI / 2;
    stair.add(dg);
  }
  // 楼梯塔里的螺旋梯（隐约可见）
  for (let i = 0; i < 30; i++) {
    const step = box(0.5, 0.09, 0.3, PAL.stoneCool, { castShadow: false });
    const a = i * 0.7;
    step.position.set(Math.cos(a) * 0.62, 0.4 + i * 0.4, Math.sin(a) * 0.62);
    step.rotation.y = -a + Math.PI / 2;
    stair.add(step);
  }
  stair.position.set(-w / 2 - 0.85, 0, 3);
  shadowAll(stair);
  g.add(stair);
  ctx.stairTower = stair;

  // 门廊（剖切时一并淡出，避免挡住大厅）
  const porch = new THREE.Group();
  const porchRoof = cone(1.9, 1.0, PAL.roofWarm, 4);
  porchRoof.rotation.y = Math.PI / 4;
  porchRoof.position.set(0, 3.9, d / 2 + 0.9);
  porchRoof.scale.set(1, 1, 0.65);
  porch.add(porchRoof);
  for (const sx of [-1.25, 1.25]) {
    const col = cyl(0.13, 0.15, 3.1, PAL.stoneCool, 8);
    col.position.set(sx, 1.55, d / 2 + 1.15);
    porch.add(col);
  }
  tagCut(ctx, porch, 0, 0, 1);
  g.add(porch);

  // 剖面：内部
  g.add(buildGreatHall(ctx));
  g.add(buildKitchen(ctx));
  g.add(buildLibrary(ctx));
  g.add(buildSolar(ctx));
  g.add(buildObservatory(ctx));

  return g;
}

/* ------------------------------------------------------------------ *
 *  礼拜堂
 * ------------------------------------------------------------------ */
function buildChapel(ctx) {
  const g = new THREE.Group();
  g.position.set(7.4, 0, -3.6);
  const W = 4.6, D = 6.2, H = 6.4;

  // 墙体（可剖切）
  const wallS = new THREE.Group();
  const south = box(W, H, 0.5, PAL.stone);
  south.position.set(0, H / 2, D / 2);
  wallS.add(south);
  // 玫瑰窗
  const rose = new THREE.Group();
  const roseGlass = new THREE.Mesh(
    new THREE.CircleGeometry(1.02, 24),
    new THREE.MeshBasicMaterial({ color: 0xb85f86 })
  );
  roseGlass.position.z = 0.28;
  rose.add(roseGlass);
  ctx.windowMats.push(roseGlass.material);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(1.02, 0.12, 6, 24), mat(PAL.stoneDark));
  rose.add(ring);
  for (let i = 0; i < 8; i++) {
    const bar = new THREE.Mesh(new THREE.BoxGeometry(0.055, 1.9, 0.08), mat(PAL.stoneDark));
    bar.position.z = 0.34;
    bar.rotation.z = (i / 8) * Math.PI;
    rose.add(bar);
  }
  for (let i = 0; i < 6; i++) {
    const seg = new THREE.Mesh(
      new THREE.CircleGeometry(0.34, 12, (i / 6) * Math.PI * 2, 0.5),
      new THREE.MeshBasicMaterial({ color: [0xe0a83e, 0x6fa38a, 0xc85f6a][i % 3] })
    );
    seg.position.z = 0.3;
    rose.add(seg);
  }
  rose.position.set(0, 4.2, D / 2 + 0.27);
  wallS.add(rose);
  const roseIn = rose.clone(true);
  roseIn.position.set(0, 4.2, D / 2 - 0.28);
  roseIn.rotation.y = Math.PI;
  wallS.add(roseIn);
  // 侧窗
  for (const sx of [-1.35, 1.35]) {
    const w = makeWindow(0.5, 1.5, { color: 0xc9b2d6 });
    w.position.set(sx, 2.4, D / 2 + 0.26);
    wallS.add(w);
    const wIn = w.clone(true);
    wIn.position.set(sx, 2.4, D / 2 - 0.27);
    wIn.rotation.y = Math.PI;
    wallS.add(wIn);
  }
  // 门
  const door = archWall(1.5, 2.5, 0.16, 0.95, 1.9, PAL.woodDark);
  door.position.set(0, 0, D / 2 + 0.28);
  wallS.add(door);
  g.add(wallS);
  tagCut(ctx, wallS, 0, 0, 1);

  const wallN = new THREE.Group();
  const north = box(W, H, 0.5, PAL.stone);
  north.position.set(0, H / 2, -D / 2);
  wallN.add(north);
  for (const sx of [-1.2, 1.2]) {
    const w = makeWindow(0.55, 1.4, { color: 0xc9b2d6 });
    w.position.set(sx, 3.6, -D / 2 - 0.26);
    w.rotation.y = Math.PI;
    wallN.add(w);
    const wIn = w.clone(true);
    wIn.position.set(sx, 3.6, -D / 2 + 0.27);
    wIn.rotation.y = 0;
    wallN.add(wIn);
  }
  g.add(wallN);
  tagCut(ctx, wallN, 0, 0, -1);

  const wallE = new THREE.Group();
  const east = box(0.5, H, D, PAL.stone);
  east.position.set(W / 2, H / 2, 0);
  wallE.add(east);
  for (const zz of [-1.6, 0, 1.6]) {
    const w = makeWindow(0.45, 1.5, { color: 0xc9b2d6 });
    w.position.set(W / 2 + 0.26, 3.0, zz);
    w.rotation.y = Math.PI / 2;
    wallE.add(w);
    const wIn = w.clone(true);
    wIn.position.set(W / 2 - 0.27, 3.0, zz);
    wIn.rotation.y = -Math.PI / 2;
    wallE.add(wIn);
  }
  g.add(wallE);
  tagCut(ctx, wallE, 1, 0, 0);

  const wallW = new THREE.Group();
  const west = box(0.5, H, D, PAL.stone);
  west.position.set(-W / 2, H / 2, 0);
  wallW.add(west);
  g.add(wallW);
  tagCut(ctx, wallW, -1, 0, 0);

  // 山墙屋顶：两片斜板 + 屋脊
  const roofG = new THREE.Group();
  const roofRise = 2.0;
  const halfSpan = W / 2 + 0.38;
  const slopeLen = Math.hypot(halfSpan, roofRise);
  const slopeAng = Math.atan2(roofRise, halfSpan);
  for (const s of [-1, 1]) {
    const panel = box(slopeLen, 0.18, D + 0.7, PAL.roofPlum);
    panel.position.set((s * halfSpan) / 2, H + roofRise / 2, 0);
    panel.rotation.z = -s * slopeAng;
    roofG.add(panel);
  }
  const ridge = cyl(0.09, 0.09, D + 0.8, PAL.roofPlum, 6, { castShadow: false });
  ridge.rotation.x = Math.PI / 2;
  ridge.position.y = H + roofRise;
  roofG.add(ridge);
  // 山墙三角
  for (const sz of [-1, 1]) {
    const tri = new THREE.Shape();
    tri.moveTo(-W / 2, 0);
    tri.lineTo(W / 2, 0);
    tri.lineTo(0, roofRise);
    tri.closePath();
    const geo = new THREE.ExtrudeGeometry(tri, { depth: 0.45, bevelEnabled: false });
    geo.translate(0, H, sz * D / 2 - 0.225);
    const gable = new THREE.Mesh(geo, mat(PAL.stone));
    gable.castShadow = true;
    roofG.add(gable);
  }
  ctx.cutRoofs.push(roofG);
  g.add(roofG);

  // 扶壁
  for (const zz of [-2.2, 0, 2.2]) {
    for (const sx of [-1, 1]) {
      const butt = box(0.55, 3.4, 0.5, PAL.stoneCool);
      butt.position.set(sx * (W / 2 + 0.3), 1.7, zz);
      g.add(butt);
      const cap = cone(0.42, 0.7, PAL.stoneCool, 4);
      cap.position.set(sx * (W / 2 + 0.3), 3.65, zz);
      cap.rotation.y = Math.PI / 4;
      g.add(cap);
    }
  }

  // 钟楼
  const bell = new THREE.Group();
  const bt = box(1.5, 8.5, 1.5, PAL.stone);
  bt.position.y = 4.25;
  bell.add(bt);
  const bRoof = cone(1.35, 2.4, PAL.roofTeal, 4);
  bRoof.position.y = 9.6;
  bRoof.rotation.y = Math.PI / 4;
  bell.add(bRoof);
  const bellBody = cone(0.34, 0.55, PAL.gold, 10);
  bellBody.position.set(0, 7.6, 0.78);
  bell.add(bellBody);
  bell.position.set(W / 2 - 0.4, 0, -D / 2 + 0.4);
  g.add(bell);

  g.add(buildChapelInterior(ctx));
  return g;
}

/* ------------------------------------------------------------------ *
 *  城门楼
 * ------------------------------------------------------------------ */
function buildGatehouse(ctx) {
  const g = new THREE.Group();
  const z = 8.0;
  const H = 8.4;

  // 拱门墙
  const wallGroup = new THREE.Group();
  const gateWall = archWall(7.2, H, 2.2, 3.0, 4.3, PAL.stoneWarm);
  gateWall.position.set(0, 0, z);
  wallGroup.add(gateWall);
  // 拱券装饰
  const archRing = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.14, 6, 24, Math.PI), mat(PAL.stoneDark));
  archRing.position.set(0, 4.3 - 1.5, z + 1.12);
  wallGroup.add(archRing);
  const archRing2 = new THREE.Mesh(new THREE.TorusGeometry(1.75, 0.1, 6, 24, Math.PI), mat(PAL.stoneLine));
  archRing2.position.set(0, 4.3 - 1.5, z + 1.1);
  wallGroup.add(archRing2);
  // 门楣横带
  const lintel = box(7.4, 0.3, 2.4, TRIM);
  lintel.position.set(0, 5.4, z);
  wallGroup.add(lintel);
  crenellate(wallGroup, -3.6, z + 0.9, 3.6, z + 0.9, H, 0.9, PAL.stoneWarm, 1.05, 0.6);
  crenellate(wallGroup, -3.6, z - 0.9, 3.6, z - 0.9, H, 0.9, PAL.stoneWarm, 1.05, 0.6);
  g.add(wallGroup);
  // 城门楼保持完整，不参与剖切

  // 两侧塔
  for (const sx of [-3.7, 3.7]) {
    const t = roundTower(ctx, 1.7, 10.6, 3.0, PAL.stoneWarm, PAL.roof, {
      flag: true,
      flagColor: PAL.red,
      winPhase: 0.2,
      door: sx > 0 ? [-1.5, -0.5] : [1.5, -0.5],
    });
    t.position.set(sx, 0, z);
    g.add(t);
  }

  // 闸门（半升起的铁栅）
  const port = new THREE.Group();
  for (let i = 0; i < 8; i++) {
    const bar = box(0.07, 2.4, 0.07, 0x585264, { castShadow: false });
    bar.position.set(-1.25 + i * 0.36, 2.1, 0);
    port.add(bar);
  }
  for (let i = 0; i < 4; i++) {
    const bar = box(2.9, 0.07, 0.07, 0x585264, { castShadow: false });
    bar.position.set(0, 1.2 + i * 0.7, 0);
    port.add(bar);
  }
  port.position.set(0, 0.3, z + 0.3);
  g.add(port);

  // 敞开的木门
  for (const sx of [-1.45, 1.45]) {
    const doorPivot = new THREE.Group();
    const leaf = box(1.42, 2.9, 0.16, PAL.woodDark);
    leaf.position.x = sx > 0 ? 0.7 : -0.7;
    doorPivot.add(leaf);
    for (let i = 0; i < 3; i++) {
      const band = box(1.3, 0.08, 0.19, 0x6b5a44, { castShadow: false });
      band.position.set(sx > 0 ? 0.7 : -0.7, -0.9 + i * 0.9, 0.02);
      doorPivot.add(band);
    }
    doorPivot.position.set(sx * 1.5, 1.5, z + 1.15);
    doorPivot.rotation.y = sx > 0 ? -1.15 : 1.15;
    g.add(doorPivot);
  }

  // 门道暖光
  const gateGlow = new THREE.Mesh(
    new THREE.PlaneGeometry(2.8, 3.6),
    new THREE.MeshBasicMaterial({ color: 0xffc987, transparent: true, opacity: 0.35 })
  );
  gateGlow.position.set(0, 2.1, z - 0.2);
  g.add(gateGlow);
  ctx.windowMats.push(gateGlow.material);

  // 桥：石砌拱桥 + 木吊桥段
  const bridge = new THREE.Group();
  const deck = box(3.6, 0.3, 4.0, PAL.stoneCool);
  deck.position.set(0, 0.15, z + 3.4);
  bridge.add(deck);
  for (const sx of [-1.75, 1.75]) {
    const rail = box(0.18, 0.85, 4.0, PAL.stone);
    rail.position.set(sx, 0.65, z + 3.4);
    bridge.add(rail);
    for (let i = 0; i < 4; i++) {
      const post = box(0.3, 1.25, 0.3, PAL.stoneWarm);
      post.position.set(sx, 0.55, z + 1.7 + i * 1.15);
      bridge.add(post);
    }
  }
  // 木吊桥
  const woodDeck = new THREE.Group();
  for (let i = 0; i < 7; i++) {
    const plank = box(3.2, 0.1, 0.42, i % 2 ? PAL.wood : PAL.woodPale);
    plank.position.set(0, 0.22, 0.3 + i * 0.44);
    woodDeck.add(plank);
  }
  for (const sx of [-1.5, 1.5]) {
    const chain = box(0.05, 0.05, 2.6, 0x5f5a55, { castShadow: false });
    chain.position.set(sx, 0.62, 1.4);
    chain.rotation.x = -0.5;
    woodDeck.add(chain);
  }
  woodDeck.position.set(0, 0, z + 0.15);
  bridge.add(woodDeck);
  g.add(bridge);

  // 城门上的纹章旗帜
  const heraldTex = canvasTexture(256, 200, (c, w, h) => {
    c.fillStyle = '#9c5560';
    c.fillRect(0, 0, w, h);
    c.strokeStyle = '#ecc06a';
    c.lineWidth = 6;
    c.strokeRect(12, 12, w - 24, h - 24);
    // 星
    c.save();
    c.translate(w / 2, h / 2);
    c.fillStyle = '#ecc06a';
    c.beginPath();
    for (let i = 0; i < 10; i++) {
      const r = i % 2 ? 34 : 78;
      const a = -Math.PI / 2 + (i * Math.PI) / 5;
      c.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    }
    c.closePath();
    c.fill();
    // 小王冠
    c.fillStyle = '#f7e7c4';
    for (let i = -2; i <= 2; i++) {
      c.beginPath();
      c.moveTo(w / 2 + i * 22 - 9, 26);
      c.lineTo(w / 2 + i * 22, 4);
      c.lineTo(w / 2 + i * 22 + 9, 26);
      c.closePath();
      c.fill();
    }
    c.restore();
  });
  const herald = new THREE.Mesh(
    new THREE.PlaneGeometry(2.0, 1.55, 1, 1),
    new THREE.MeshToonMaterial({ map: heraldTex, side: THREE.DoubleSide })
  );
  herald.position.set(0, 6.55, z + 1.16);
  herald.castShadow = false;
  g.add(herald);
  const heraldRod = cyl(0.05, 0.05, 2.2, PAL.woodDark, 6, { castShadow: false });
  heraldRod.rotation.z = Math.PI / 2;
  heraldRod.position.set(0, 7.35, z + 1.16);
  g.add(heraldRod);

  // 拱门两侧的盾牌
  for (const sx of [-2.75, 2.75]) {
    const shield = new THREE.Group();
    const face = cyl(0.34, 0.34, 0.07, sx < 0 ? PAL.wine : PAL.blue, 12);
    face.rotation.x = Math.PI / 2;
    shield.add(face);
    const rim = torus(0.33, 0.035, PAL.gold, { tubular: 20 });
    shield.add(rim);
    const starS = new THREE.Mesh(
      new THREE.CircleGeometry(0.17, 5),
      new THREE.MeshBasicMaterial({ color: 0xecc06a })
    );
    starS.position.z = 0.055;
    shield.add(starS);
    shield.position.set(sx, 6.35, z + 1.14);
    g.add(shield);
  }

  // 桥头灯柱
  for (const sx of [-2.3, 2.3]) {
    const lampPost = cyl(0.07, 0.09, 1.8, PAL.woodDark, 6);
    lampPost.position.set(sx, 0.9, z + 4.7);
    g.add(lampPost);
    const lamp = new THREE.Mesh(
      new THREE.BoxGeometry(0.32, 0.42, 0.32),
      new THREE.MeshBasicMaterial({ color: 0xffd79a })
    );
    lamp.position.set(sx, 1.95, z + 4.7);
    g.add(lamp);
    ctx.windowMats.push(lamp.material);
    const glow = glowSprite(1.5, 0xffcf90, 0.55);
    glow.position.set(sx, 1.95, z + 4.7);
    g.add(glow);
    ctx.fireGlows.push(glow);
  }

  return g;
}

/* ------------------------------------------------------------------ *
 *  雕塑 / 庭院小景
 * ------------------------------------------------------------------ */
function makeLionStatue() {
  const g = new THREE.Group();
  const base = box(0.9, 0.55, 1.3, PAL.stoneDark);
  base.position.y = 0.27;
  g.add(base);
  const body = box(0.5, 0.55, 0.95, PAL.stoneCool);
  body.position.set(0, 0.82, 0);
  g.add(body);
  const head = sph(0.3, PAL.stoneCool, { seg: 12, seg2: 10 });
  head.position.set(0, 1.22, 0.38);
  g.add(head);
  const mane = torus(0.31, 0.09, PAL.stone, { radial: 6, tubular: 12 });
  mane.position.set(0, 1.22, 0.36);
  mane.rotation.y = 0;
  g.add(mane);
  const tail = box(0.08, 0.08, 0.5, PAL.stoneCool);
  tail.position.set(0, 0.85, -0.55);
  g.add(tail);
  shadowAll(g);
  return g;
}

/* ------------------------------------------------------------------ *
 *  入口
 * ------------------------------------------------------------------ */
export function createCastle(ctx) {
  const castle = new THREE.Group();
  castle.name = 'castle';
  castle.position.y = 3.0;

  // 台基
  const plinth = box(23.5, 1.1, 20.5, PAL.stoneDark);
  plinth.position.y = -0.45;
  castle.add(plinth);
  const plinth2 = box(22.8, 0.6, 19.8, PAL.stoneCool);
  plinth2.position.y = -1.0;
  castle.add(plinth2);

  // 外墙（参与剖切，靠近相机的一面会淡出）
  const W = 22, D = 17.5;
  const wallH = 5.2, thick = 1.1;
  const wallSegs = [
    [curtainWall(ctx, -W / 2, -D / 2, W / 2, -D / 2, wallH, thick, PAL.stone), 0, 0, -1],
    [curtainWall(ctx, -W / 2, -D / 2, -W / 2, D / 2, wallH, thick, PAL.stone), -1, 0, 0],
    [curtainWall(ctx, W / 2, -D / 2, W / 2, D / 2, wallH, thick, PAL.stone), 1, 0, 0],
    [curtainWall(ctx, -W / 2, D / 2, -3.7, D / 2, wallH, thick, PAL.stone), 0, 0, 1],
    [curtainWall(ctx, 3.7, D / 2, W / 2, D / 2, wallH, thick, PAL.stone), 0, 0, 1],
  ];
  for (const [seg, nx, ny, nz] of wallSegs) {
    tagCut(ctx, seg, nx, ny, nz);
    castle.add(seg);
  }

  // 墙面的常春藤（南墙、东墙、西墙）
  addIvy(castle, -7.4, 2.6, 8.62, 4.4, 4.0, 0);
  addIvy(castle, 8.3, 2.4, 8.62, 3.0, 4.4, 0);
  addIvy(castle, 11.62, 2.3, -1.0, 4.2, 3.6, Math.PI / 2);
  addIvy(castle, 11.62, 2.0, 5.7, 2.6, 3.2, Math.PI / 2);
  addIvy(castle, -11.62, 2.2, -5.6, 3.6, 3.4, -Math.PI / 2);

  // 外墙上的旗帜
  for (const [x, z, ry] of [
    [-6.8, 8.8, 0],
    [6.8, 8.8, 0],
    [-6.0, -9.3, Math.PI],
    [6.5, -9.3, Math.PI],
  ]) {
    const pole = cyl(0.035, 0.04, 1.5, PAL.woodDark, 6, { castShadow: false });
    pole.position.set(x, 5.85, z);
    castle.add(pole);
    const flag = makeBanner(1.15, 0.62, Math.random() > 0.5 ? PAL.blue : PAL.red);
    flag.geometry.translate(0.575, 0, 0);
    flag.position.set(x, 6.4, z);
    flag.rotation.y = ry;
    castle.add(flag);
    ctx.banners.push(flag);
  }

  // 四角塔
  const corners = [
    [-W / 2, -D / 2],
    [W / 2, -D / 2],
    [-W / 2, D / 2],
    [W / 2, D / 2],
  ];
  for (const [x, z] of corners) {
    const t = roundTower(ctx, 1.85, 10.4, 3.4, PAL.stoneWarm, PAL.roofWarm, {
      flag: true,
      flagColor: PAL.red,
      winPhase: Math.random() * 2,
    });
    t.position.set(x, 0, z);
    castle.add(t);
    const b = bannerOn(castle, x, 4.8, z + (z > 0 ? 1.9 : -1.9), z > 0 ? 0 : Math.PI, PAL.wine, 0.9, 2.2);
    ctx.banners.push(b);
  }

  const gatehouse = buildGatehouse(ctx);
  tagCut(ctx, gatehouse, 0, 0, 1);
  castle.add(gatehouse);
  castle.add(buildKeep(ctx));
  castle.add(buildChapel(ctx));

  // 庭院铺地
  const court = new THREE.Mesh(
    new THREE.PlaneGeometry(20.4, 5.4),
    new THREE.MeshToonMaterial({ color: 0xcfc0a6 })
  );
  court.rotation.x = -Math.PI / 2;
  court.position.set(0, 0.03, 5.2);
  court.receiveShadow = true;
  castle.add(court);
  // 石板缝
  for (let i = -9; i <= 9; i++) {
    const line = new THREE.Mesh(
      new THREE.PlaneGeometry(0.05, 5.2),
      new THREE.MeshBasicMaterial({ color: 0xb8a78c, transparent: true, opacity: 0.55 })
    );
    line.rotation.x = -Math.PI / 2;
    line.position.set(i * 1.05, 0.045, 5.2);
    castle.add(line);
  }

  castle.add(buildCourtyard(ctx));

  // 门前的石狮
  for (const sx of [-2.6, 2.6]) {
    const lion = makeLionStatue();
    lion.position.set(sx, 0, 9.4);
    lion.rotation.y = sx > 0 ? -0.2 : 0.2;
    castle.add(lion);
  }

  // 城墙走道的旗帜
  const flagSpots = [
    [-8.5, 5.2, 8.78],
    [8.5, 5.2, 8.78],
    [-11.02, 5.2, 0],
    [11.02, 5.2, 0],
  ];
  for (const [x, y, z] of flagSpots) {
    const pole = cyl(0.035, 0.04, 1.5, PAL.woodDark, 6, { castShadow: false });
    pole.position.set(x, y + 0.75, z);
    castle.add(pole);
    const flag = makeBanner(1.1, 0.6, PAL.gold);
    flag.geometry.translate(0.55, 0, 0);
    flag.position.set(x, y + 1.25, z);
    flag.rotation.y = z > 0 ? 0.2 : Math.PI / 2;
    castle.add(flag);
    ctx.banners.push(flag);
  }

  // 主堡的旗
  const keepFlag = makeBanner(1.7, 1.0, PAL.blue);
  keepFlag.geometry.translate(0.85, 0, 0);
  keepFlag.position.set(0.0, 12.9 + 4.9, -3.3);
  castle.add(keepFlag);
  ctx.banners.push(keepFlag);
  const keepPole = cyl(0.04, 0.05, 4.6, PAL.woodDark, 6, { castShadow: false });
  keepPole.position.set(0.0, 12.9 + 2.3, -3.3);
  castle.add(keepPole);

  // 军械库放在门楼内侧
  castle.add(buildArmory(ctx));

  shadowAll(castle);
  return castle;
}