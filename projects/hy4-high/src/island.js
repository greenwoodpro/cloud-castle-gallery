/* 浮空岛与地形：顶面、岩层、水体、植被、小径、花园、观星丘 */
import * as T from '../vendor/three.module.js';
import { L } from './content.js';
import {
  COL, GEO, M, B, TAU, rand, lerp, smooth, clamp,
  put, box, cyl, cone, ball, quad, instances, group, halo,
} from './palette.js';

const c = (hex) => new T.Color(hex);

/* 岛面高度：全场景共用的地形函数 */
export function groundY(x, z) {
  const r = Math.hypot(x, z);
  let y = 0.40 * Math.sin(x * 0.19) * Math.cos(z * 0.17)
        + 0.25 * Math.sin(x * 0.41 + z * 0.23)
        + 0.16 * Math.cos(z * 0.52 - x * 0.11);

  // 城堡台地：削平并抬到 1.35
  const dx = Math.max(0, Math.abs(x) - 11.0) / 3.4;
  const dz = Math.max(0, Math.abs(z + 5) - 10.6) / 3.4;
  const plateau = 1 - smooth(0, 1, Math.max(dx, dz));
  y = lerp(y, 1.35 + 0.04 * Math.sin(x * 0.6) * Math.cos(z * 0.6), plateau * 0.97);

  // 池塘洼地
  const pd = Math.hypot(x - L.pond.x, z - L.pond.z);
  y -= (1 - smooth(3.2, 6.4, pd)) * 0.95;
  // 观星丘
  const hd = Math.hypot(x - L.hill.x, z - L.hill.z);
  y += (1 - smooth(1.2, 7.2, hd)) * 2.5;
  // 小王子坐的崖边小丘
  const qd = Math.hypot(x - L.prince.x, z - L.prince.z);
  y += (1 - smooth(0.8, 5.5, qd)) * 0.72;
  // 岛缘向下卷
  y -= smooth(21.5, L.R, r) * 1.35;
  return y;
}

function groundColor(x, z, y, out) {
  out.setHex(COL.grass);
  const n = 0.5 + 0.5 * Math.sin(x * 0.73 + z * 0.51) * Math.cos(z * 0.37);
  out.lerp(c(COL.grassLt), 0.10 + n * 0.20);

  const dx = Math.max(0, Math.abs(x) - 11.0) / 3.4;
  const dz = Math.max(0, Math.abs(z + 5) - 10.6) / 3.4;
  const plateau = 1 - smooth(0, 1, Math.max(dx, dz));
  out.lerp(c(COL.stone2), plateau * 0.90);

  // 麦田
  const w = (1 - smooth(0, 2.5, Math.max(0, Math.abs(x + 8) - 5.5)))
          * (1 - smooth(0, 2.5, Math.max(0, Math.abs(z - 13) - 4.5)));
  out.lerp(c(COL.wheat), clamp(w, 0, 1) * 0.88);
  // 花园
  const gd = Math.hypot(x - L.garden.x, z - L.garden.z);
  out.lerp(c(0x93b183), (1 - smooth(4.0, 6.4, gd)) * 0.5);
  // 池塘湿岸
  const pd = Math.hypot(x - L.pond.x, z - L.pond.z);
  out.lerp(c(0x8fae9b), (1 - smooth(4.2, 6.6, pd)) * 0.75);
  out.lerp(c(0x9db4a0), (1 - smooth(3.4, 4.4, pd)) * 0.5);
  // 沙岸
  const sd = Math.hypot(x - L.shore.x, z - L.shore.z);
  out.lerp(c(COL.sand), (1 - smooth(2.0, 7.0, sd)) * 0.92);
  // 高处泛白
  out.lerp(c(COL.grassLt), smooth(1.8, 4.2, y) * 0.45);
  // 水彩洇色
  out.offsetHSL(0, 0, (rand() - 0.5) * 0.035);
  return out;
}

function makeTop(root) {
  const RINGS = 34, SEGS = 108, Rr = L.R;
  const pos = [], col = [], idx = [];
  const tmp = new T.Color();
  for (let i = 0; i <= RINGS; i++) {
    const r = Rr * (i / RINGS);
    for (let j = 0; j <= SEGS; j++) {
      const a = (j / SEGS) * TAU;
      const x = Math.cos(a) * r, z = Math.sin(a) * r;
      const y = groundY(x, z);
      pos.push(x, y, z);
      groundColor(x, z, y, tmp);
      col.push(tmp.r, tmp.g, tmp.b);
      if (i < RINGS && j < SEGS) {
        const A = i * (SEGS + 1) + j, B = A + 1, C = A + SEGS + 1, D = C + 1;
        idx.push(A, B, C, B, D, C);
      }
    }
  }
  const g = new T.BufferGeometry();
  g.setAttribute('position', new T.Float32BufferAttribute(pos, 3));
  g.setAttribute('color', new T.Float32BufferAttribute(col, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  const m = new T.Mesh(g, new T.MeshLambertMaterial({ vertexColors: true, side: T.DoubleSide }));
  m.receiveShadow = true;
  root.add(m);
  return m;
}

function makeRock(root) {
  const Rr = L.R;
  // 上缘一圈土黄色断崖
  const rim = new T.Mesh(
    new T.CylinderGeometry(Rr * 1.012, Rr * 0.99, 3.2, 24, 1, true),
    M(COL.rock, { flatShading: true, side: T.DoubleSide })
  );
  rim.position.y = -1.7; rim.castShadow = true; rim.receiveShadow = true;
  root.add(rim);

  // 倒锥岩体：扰动顶点 + 按高度渐变着色
  const geo = new T.CylinderGeometry(Rr * 0.99, 2.0, 21, 26, 12, true);
  const p = geo.attributes.position;
  const colors = [];
  const top = c(COL.rock), mid = c(COL.rock2), deep = c(COL.rockDeep), light = c(COL.rockLt);
  const tcol = new T.Color();
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
    const a = Math.atan2(z, x);
    const k = (y + 10) / 20; // 1 顶 0 底
    const wob = Math.sin(a * 7 + k * 9) * 0.75 + Math.sin(a * 13 - k * 5) * 0.45;
    const rr = 1 + wob * 0.045 * (0.4 + k * 0.6);
    p.setX(i, x * rr); p.setZ(i, z * rr);
    p.setY(i, y + Math.sin(a * 5 + k * 11) * 0.55);
    const band = 0.5 + 0.5 * Math.sin(k * 34 + a * 3);
    tcol.copy(deep).lerp(mid, smooth(0, 0.65, k)).lerp(top, smooth(0.55, 1, k));
    tcol.lerp(light, band * 0.12);
    colors.push(tcol.r, tcol.g, tcol.b);
  }
  geo.setAttribute('color', new T.Float32BufferAttribute(colors, 3));
  geo.computeVertexNormals();
  const rock = new T.Mesh(geo, new T.MeshLambertMaterial({ vertexColors: true, flatShading: true, side: T.DoubleSide }));
  rock.position.y = -13.4; rock.castShadow = true; rock.receiveShadow = true;
  root.add(rock);

  cone(root, 2.1, 5.2, M(COL.rockDeep, { flatShading: true }), 0, -25.4, 0, 8);

  // 崖边草皮卷边
  const turf = new T.Mesh(new T.TorusGeometry(L.R - 0.25, 0.72, 8, 110), M(COL.grass2, { flatShading: true }));
  turf.rotation.x = -Math.PI / 2; turf.position.y = -0.45;
  turf.castShadow = true; turf.receiveShadow = true;
  root.add(turf);

  // 悬垂根须
  const rootMat = M(0xa08d6c);
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * TAU + 0.3;
    const rr = 3.5 + rand() * 9;
    const x = Math.cos(a) * rr, z = Math.sin(a) * rr;
    const len = 1.8 + rand() * 2.8;
    const g = group(root, x, -21 - rand() * 2, z);
    const seg = 5;
    for (let s = 0; s < seg; s++) {
      const m = cyl(g, 0.16 * (1 - s / seg) + 0.03, len / seg, rootMat,
        Math.sin(s * 0.9 + i) * 0.22, -s * len / seg, Math.cos(s * 0.7 + i) * 0.2, 8);
      m.rotation.z = Math.sin(s + i) * 0.18;
    }
  }

  // 岛底漂浮碎石
  const stones = [];
  const stoneMat = M(COL.rock2, { flatShading: true });
  for (let i = 0; i < 16; i++) {
    const a = rand() * TAU, rr = 6 + rand() * 19;
    const s = 0.35 + rand() * 1.05;
    const m = put(root, GEO.sphere8, stoneMat,
      Math.cos(a) * rr, -16 - rand() * 14, Math.sin(a) * rr,
      s, s * (0.7 + rand() * 0.6), s * (0.7 + rand() * 0.6),
      rand() * 3, rand() * 3, rand() * 3);
    m.userData.spin = (rand() - 0.5) * 0.18;
    m.userData.baseY = m.position.y;
    m.userData.phase = rand() * TAU;
    stones.push(m);
  }
  return stones;
}

function pathPoints(pts) {
  return new T.CatmullRomCurve3(pts.map(p => new T.Vector3(p[0], 0, p[1])));
}
function makePaths(root) {
  const slabs = [];
  const paths = [
    [[0, 8.9], [2.6, 10.3], [6.5, 9.8], [9.8, 8.2], [12, 7]],
    [[0, 8.9], [-3.5, 10.5], [-8, 11], [-12.5, 10.2], [-15.2, 9]],
    [[0.6, 8.9], [7, 6.5], [10.5, -2], [12.5, -8], [14, -14]],
    [[-9, -13], [-13, -15], [-17, -12], [-19, -7]],
  ];
  paths.forEach((pts, pi) => {
    const curve = pathPoints(pts);
    const n = 48 + pi * 6;
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      const v = curve.getPoint(t);
      const y = groundY(v.x, v.z) + 0.055;
      const off = (rand() - 0.5) * 0.42;
      const tan = curve.getTangent(t);
      slabs.push({
        x: v.x - tan.z * off, y, z: v.z + tan.x * off,
        sx: 0.42 + rand() * 0.26, sy: 0.075, sz: 0.32 + rand() * 0.22,
        ry: Math.atan2(tan.x, tan.z) + (rand() - 0.5) * 0.3,
        color: [0xe4d8be, 0xd8c9ad, 0xeee2c9, 0xcdbda1][Math.floor(rand() * 4)],
      });
    }
  });
  instances(root, GEO.cyl8, M(0xffffff), slabs, false);
}

function inCastle(x, z, pad = 1) {
  return Math.abs(x) < 11.4 + pad && z < 7.2 + pad && z > -16.6 - pad;
}
function inPond(x, z) { return Math.hypot(x - L.pond.x, z - L.pond.z) < 5.0; }

function makeVegetation(root) {
  // 草丛
  const grass = [], wheat = [], flowers = [], stems = [], pebbles = [], crowns = [];
  for (let i = 0; i < 1500; i++) {
    const a = rand() * TAU, rr = Math.sqrt(rand()) * (L.R - 1.2);
    const x = Math.cos(a) * rr, z = Math.sin(a) * rr;
    if (inCastle(x, z, 0.2) || inPond(x, z)) continue;
    const y = groundY(x, z);
    const wx = (1 - smooth(0, 2.5, Math.max(0, Math.abs(x + 8) - 5.5)))
             * (1 - smooth(0, 2.5, Math.max(0, Math.abs(z - 13) - 4.5)));
    if (wx > 0.55) {
      wheat.push({ x: x + (rand() - .5) * .3, y: y + 0.42, z: z + (rand() - .5) * .3,
        sx: .055, sy: .8 + rand() * .35, sz: .055, rz: (rand() - .5) * .22,
        color: [0xdfc07e, 0xe8cd8c, 0xd3b06d, 0xeed79b][Math.floor(rand() * 4)] });
    } else if (rand() < 0.62) {
      grass.push({ x, y: y + 0.16, z, sx: .055 + rand() * .04, sy: .30 + rand() * .34, sz: .055,
        rz: (rand() - .5) * .5, ry: rand() * TAU,
        color: [0x9fbd86, 0x8faf78, 0xb4c99a, 0xa8c291, 0xc0cf9e][Math.floor(rand() * 5)] });
    }
    // 野花
    if (rand() < 0.075 && Math.hypot(x - L.shore.x, z - L.shore.z) > 5) {
      const h = .26 + rand() * .22;
      stems.push({ x, y: y + h / 2, z, sx: .025, sy: h, sz: .025, color: 0x7f9c6c });
      crowns.push({ x, y: y + h, z, sx: .095, sy: .07, sz: .095,
        color: [0xe8c56a, 0xd97b78, 0xc7a3c4, 0xf2e6c8, 0x9fb8d8][Math.floor(rand() * 5)] });
    }
    if (rand() < 0.035) {
      pebbles.push({ x, y: y + .1, z, sx: .18 + rand() * .3, sy: .1 + rand() * .14, sz: .18 + rand() * .3,
        ry: rand() * TAU, color: [0xd6c4a8, 0xbfae96, 0xe4d6bd][Math.floor(rand() * 3)] });
    }
  }
  instances(root, GEO.cone8, M(0xffffff), grass);
  instances(root, GEO.box, M(0xffffff), wheat);
  instances(root, GEO.box, M(0xffffff), stems);
  instances(root, GEO.sphere8, M(0xffffff), crowns);
  instances(root, GEO.sphere8, M(0xffffff), pebbles);
}

function tree(root, x, z, kind, s = 1) {
  const y = groundY(x, z);
  const g = group(root, x, y, z);
  const trunk = M(0x9b7a58), leafA = M(0x9fbe8b), leafB = M(0x8bac7c), leafC = M(0xbcd09b);
  if (kind === 'round') {
    cyl(g, 0.26 * s, 1.7 * s, trunk, 0, 0.85 * s, 0, 8);
    ball(g, 1.25 * s, leafA, 0, 2.35 * s, 0, 0.82, 1);
    ball(g, 0.86 * s, leafB, -0.85 * s, 1.95 * s, 0.25 * s, 0.9, 1);
    ball(g, 0.9 * s, leafC, 0.8 * s, 2.05 * s, -0.3 * s, 0.88, 1);
    ball(g, 0.7 * s, leafA, 0.1 * s, 3.05 * s, -0.1 * s, 0.8, 1);
  } else if (kind === 'baobab') {
    cyl(g, 1.05 * s, 3.4 * s, M(0xa88862), 0, 1.7 * s, 0, 10).scale.set(0.72 * s, 3.4 * s, 0.72 * s);
    const crown = ball(g, 2.5 * s, leafB, 0, 3.9 * s, 0, 0.42, 1);
    for (let i = 0; i < 5; i++) {
      const a = i / 5 * TAU;
      const br = cyl(g, 0.12 * s, 1.8 * s, trunk, Math.cos(a) * 1.2 * s, 3.4 * s, Math.sin(a) * 1.2 * s, 8);
      br.rotation.z = Math.cos(a) * 0.55; br.rotation.x = -Math.sin(a) * 0.55;
      ball(g, 0.9 * s, i % 2 ? leafA : leafC, Math.cos(a) * 2.0 * s, 4.0 * s, Math.sin(a) * 2.0 * s, 0.6, 1);
    }
    crown.scale.set(2.5 * s, 1.05 * s, 2.2 * s);
  } else {
    cyl(g, 0.18 * s, 1.1 * s, trunk, 0, 0.55 * s, 0, 8);
    cone(g, 1.0 * s, 1.6 * s, leafB, 0, 1.5 * s, 0, 8);
    cone(g, 0.78 * s, 1.4 * s, leafA, 0, 2.25 * s, 0, 8);
    cone(g, 0.52 * s, 1.1 * s, leafC, 0, 2.9 * s, 0, 8);
  }
  return g;
}

function makeTrees(root) {
  const spots = [
    [-19, -4, 'round', 1.05], [-17, -12, 'round', .9], [-12, -19, 'pine', 1.1],
    [-4, -21, 'pine', .9], [9, -20, 'round', 1.0], [18, -8, 'round', .85],
    [20, -2, 'pine', 1.0], [-21, 1, 'round', .8], [-11, 19, 'round', .9],
    [2, 19, 'round', 1.0], [7, 15, 'pine', .85], [19, 4, 'round', .75],
  ];
  spots.forEach(s => tree(root, s[0], s[1], s[2], s[3]));
  tree(root, L.baobab.x, L.baobab.z, 'baobab', 1.15);
  tree(root, 0, -21.5, 'baobab', .82);
  tree(root, 8, -20.5, 'baobab', .7);
}

function makeWater(root) {
  const anim = {};
  const py = groundY(L.pond.x, L.pond.z);
  const waterY = py + 0.72;
  // 水面
  const w = new T.Mesh(new T.CircleGeometry(4.3, 48), B(COL.water, {
    transparent: true, opacity: .82, side: T.DoubleSide, depthWrite: false,
  }));
  w.rotation.x = -Math.PI / 2; w.position.set(L.pond.x, waterY, L.pond.z);
  w.scale.set(1, 0.86, 1);
  root.add(w); anim.pond = w;
  // 池底浅色
  const bed = new T.Mesh(new T.CircleGeometry(4.5, 40), B(0x86a99c, { transparent: true, opacity: .75, side: T.DoubleSide }));
  bed.rotation.x = -Math.PI / 2; bed.position.set(L.pond.x, py + 0.06, L.pond.z);
  root.add(bed);
  // 湿岸一圈
  const ring = new T.Mesh(new T.TorusGeometry(4.35, 0.36, 8, 48), M(0x9cae98));
  ring.rotation.x = -Math.PI / 2; ring.position.set(L.pond.x, waterY - 0.06, L.pond.z);
  ring.scale.set(1, 0.88, 1);
  root.add(ring);
  // 睡莲
  const lily = [];
  for (let i = 0; i < 14; i++) {
    const a = rand() * TAU, rr = rand() * 3.4;
    lily.push({ x: L.pond.x + Math.cos(a) * rr, y: waterY + .04, z: L.pond.z + Math.sin(a) * rr * .86,
      sx: .28 + rand() * .22, sy: .035, sz: .28 + rand() * .22, ry: rand() * TAU, color: 0x8bb58a });
  }
  instances(root, GEO.cyl8, M(0xffffff), lily);
  // 芦苇
  const reed = [];
  for (let i = 0; i < 46; i++) {
    const a = rand() * TAU, rr = 3.7 + rand() * 1.5;
    const x = L.pond.x + Math.cos(a) * rr, z = L.pond.z + Math.sin(a) * rr;
    reed.push({ x, y: groundY(x, z) + .5, z, sx: .035, sy: .9 + rand() * .6, sz: .035,
      rz: (rand() - .5) * .4, color: 0x9ab184 });
  }
  instances(root, GEO.cone8, M(0xffffff), reed);

  // 小溪：石槽 + 水面
  const curve = new T.CatmullRomCurve3([
    new T.Vector3(-19.3, waterY - .05, 9.6),
    new T.Vector3(-20.8, waterY - .35, 9.7),
    new T.Vector3(-22.1, waterY - .7, 9.2),
    new T.Vector3(-23.4, waterY - 1.0, 8.9),
  ]);
  const stream = new T.Mesh(new T.TubeGeometry(curve, 24, 0.42, 8, false),
    B(COL.water, { transparent: true, opacity: .8, side: T.DoubleSide, depthWrite: false }));
  root.add(stream);

  // 瀑布：两片随高度摆动的水帘
  const falls = [];
  for (let k = 0; k < 2; k++) {
    const geo = new T.PlaneGeometry(2.5 - k * .9, 19, 6, 30);
    const pa = geo.attributes.position;
    for (let i = 0; i < pa.count; i++) {
      const yy = pa.getY(i);
      const f = (9.5 - yy) / 19;
      pa.setZ(i, Math.sin(yy * .55 + k) * .28 * f + f * f * 1.4);
      pa.setX(i, pa.getX(i) * (1 - f * .55));
    }
    geo.computeVertexNormals();
    const m = new T.Mesh(geo, new T.MeshBasicMaterial({
      color: k ? 0xdff1f3 : COL.water, transparent: true, opacity: k ? .42 : .34,
      side: T.DoubleSide, depthWrite: false,
    }));
    m.position.set(-23.6 - k * .12, -9.6, 8.9 - k * .15);
    m.rotation.y = 0.25 + k * .2;
    root.add(m); falls.push(m);
  }
  anim.falls = falls;
  // 底部水雾
  const mist = [];
  for (let i = 0; i < 14; i++) {
    const s = halo(root, 0xe8f5f4, 3.5 + rand() * 4, -23.5 + (rand() - .5) * 5,
      -17 - rand() * 4, 8.9 + (rand() - .5) * 5, .32);
    mist.push(s);
  }
  anim.mist = mist;
  return anim;
}

function makeGarden(root) {
  const gx = L.garden.x, gz = L.garden.z;
  const y = groundY(gx, gz);
  // 绿篱（留一个缺口给狐狸）
  const hedge = [];
  for (let i = 0; i < 68; i++) {
    const a = i / 68 * TAU;
    if (a > 0.55 && a < 0.85) continue;
    const rr = 4.5;
    const x = gx + Math.cos(a) * rr, z = gz + Math.sin(a) * rr * .9;
    hedge.push({ x, y: groundY(x, z) + .34, z, sx: .62, sy: .72, sz: .62,
      color: [0x89aa80, 0x9bb98c, 0x7f9e76][i % 3] });
  }
  instances(root, GEO.sphere8, M(0xffffff), hedge);
  // 细沙十字小径
  const sand = B(0xe7dcc0, { transparent: true, opacity: .85, side: T.DoubleSide });
  for (let k = 0; k < 2; k++) {
    const q = quad(root, k ? 8.4 : 0.85, k ? 0.85 : 8.4, sand, gx, y + .06, gz, -Math.PI / 2, 0, 0);
    q.rotation.z = 0;
  }
  // 中央方石台
  box(root, 1.5, .55, 1.5, M(COL.stone2), L.rose.x, y + .34, L.rose.z, .2);
  box(root, 1.7, .12, 1.7, M(COL.stone), L.rose.x, y + .66, L.rose.z, .2);
  // 花畦
  const roseStems = [], roseHeads = [];
  for (let i = 0; i < 78; i++) {
    const a = rand() * TAU, rr = 1.0 + rand() * 3.4;
    const x = gx + Math.cos(a) * rr, z = gz + Math.sin(a) * rr * .9;
    if (Math.abs(x - gx) < .5 || Math.abs(z - gz) < .5) continue;
    const h = .34 + rand() * .25;
    const yy = groundY(x, z);
    roseStems.push({ x, y: yy + h / 2, z, sx: .035, sy: h, sz: .035, color: 0x7c9b6b });
    roseHeads.push({ x, y: yy + h + .06, z, sx: .16, sy: .13, sz: .16,
      color: [0xd97b78, 0xe29a94, 0xc76e77, 0xf0b4a4, 0xe8c56a][Math.floor(rand() * 5)] });
  }
  instances(root, GEO.box, M(0xffffff), roseStems);
  instances(root, GEO.sphere8, M(0xffffff), roseHeads);
  // 长椅
  const by = groundY(gx - 5.2, gz + 1.5);
  const bench = group(root, gx - 5.2, by, gz + 1.5);
  bench.rotation.y = -0.5;
  box(bench, 2.2, .12, .6, M(COL.wood), 0, .55, 0);
  box(bench, 2.2, .6, .1, M(COL.wood), 0, .9, -.25);
  box(bench, .14, .5, .5, M(COL.woodDk), -.9, .28, 0);
  box(bench, .14, .5, .5, M(COL.woodDk), .9, .28, 0);
  // 花园小门（缺口处）
  box(root, .12, 1.3, .12, M(COL.woodDk), gx + 3.6, groundY(gx + 3.6, gz + 2.6) + .65, gz + 2.6);
}

function makeHill(root) {
  const hx = L.hill.x, hz = L.hill.z;
  const y = groundY(hx, hz);
  const g = group(root, hx, y, hz);
  // 石台
  cyl(g, 3.1, .28, M(COL.stone2), 0, .14, 0, 24);
  // 六柱圆亭
  for (let i = 0; i < 6; i++) {
    const a = i / 6 * TAU;
    cyl(g, .13, 2.5, M(COL.stone), Math.cos(a) * 2.5, 1.35, Math.sin(a) * 2.5, 8);
  }
  const dome = new T.Mesh(new T.SphereGeometry(2.95, 24, 12, 0, TAU, 0, Math.PI / 2),
    M(COL.roofBlue, { side: T.DoubleSide }));
  dome.position.y = 2.55; dome.scale.y = .5; dome.castShadow = true;
  g.add(dome);
  ball(g, .22, M(COL.gold), 0, 3.95, 0);
  // 望远镜
  const scope = group(g, .2, 1.55, 0);
  const tube = cyl(scope, .16, 1.7, M(0xb99256), 0, .35, 0, 12);
  tube.rotation.z = -0.5; tube.rotation.x = 0.35;
  cyl(scope, .19, .22, M(0x8c6c42), .68, .95, .3, 12).rotation.z = -0.5;
  cyl(scope, .06, 1.1, M(COL.woodDk), 0, -.1, 0, 8);
  cyl(scope, .42, .08, M(COL.woodDk), 0, -.62, 0, 12);
  // 九级石阶
  for (let i = 0; i < 9; i++) {
    const x = hx - 5.6 + i * .62, z = hz + 3.4 - i * .38;
    box(root, 1.5, .16, 1.0, M(i % 2 ? COL.stone2 : COL.stone), x, groundY(x, z) + .08, z, .4);
  }
}

function makeShore(root) {
  const sx = L.shore.x, sz = L.shore.z;
  // 平石
  const y = groundY(sx, sz);
  const stone = put(root, GEO.sphere8, M(0xd8ccb2), sx - 1.5, y + .18, sz - .5, 1.5, .35, 1.1, .1, .3, 0);
  stone.castShadow = true;
  const gravel = [];
  for (let i = 0; i < 90; i++) {
    const a = rand() * TAU, rr = rand() * 6;
    const x = sx + Math.cos(a) * rr, z = sz + Math.sin(a) * rr;
    if (Math.hypot(x, z) > L.R - 1) continue;
    gravel.push({ x, y: groundY(x, z) + .05, z, sx: .12 + rand() * .26, sy: .08 + rand() * .1, sz: .12 + rand() * .26,
      ry: rand() * TAU, color: [0xe4d6bd, 0xd2c0a4, 0xf0e4cf][Math.floor(rand() * 3)] });
  }
  instances(root, GEO.sphere8, M(0xffffff), gravel);
  // 稻草人
  const wx = -3.2, wz = 17.6, wy = groundY(wx, wz);
  const s = group(root, wx, wy, wz);
  box(s, .1, 2.3, .1, M(COL.woodDk), 0, 1.15, 0);
  box(s, 1.5, .09, .09, M(COL.woodDk), 0, 1.75, 0);
  ball(s, .32, M(0xd9c18d), 0, 2.35, 0);
  cone(s, .55, .38, M(0xb08b5c), 0, 2.65, 0, 8);
  box(s, .9, 1.0, .28, M(0x9fa9b6), 0, 1.45, 0);
}

export function buildIsland(root) {
  const g = group(root);
  makeTop(g);
  const stones = makeRock(g);
  makePaths(g);
  makeVegetation(g);
  makeTrees(g);
  const water = makeWater(g);
  makeGarden(g);
  makeHill(g);
  makeShore(g);

  return {
    update(t) {
      water.pond.material.opacity = .78 + Math.sin(t * .7) * .05;
      water.falls.forEach((f, i) => { f.position.x = -23.6 - i * .12 + Math.sin(t * .8 + i) * .07; });
      water.mist.forEach((m, i) => {
        m.position.y = -17 - (i % 4) + Math.sin(t * .4 + i) * .6;
        m.material.opacity = .26 + Math.sin(t * .6 + i * 1.7) * .09;
      });
      stones.forEach((s, i) => {
        s.rotation.y += s.userData.spin * .016;
        s.position.y = s.userData.baseY + Math.sin(t * .5 + s.userData.phase) * .55;
      });
    },
  };
}
