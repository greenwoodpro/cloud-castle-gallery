/* 城堡：幕墙、门楼、主堡三层 + 地窖、礼拜堂、灶房、厩、井、市集 */
import * as T from '../vendor/three.module.js';
import { L } from './content.js';
import {
  COL, GEO, M, B, MU, TAU, rand, put, box, cyl, cone, ball, quad,
  instances, group, halo, rod,
} from './palette.js';

export function buildCastle(root) {
  const G = group(root);
  const Y = L.ground;                       // 台地表面 1.35
  const cutFades = [];                      // 剖面时要淡出的材质
  const winMats = [];                       // 窗光材质
  const halos = [];                         // 窗光晕
  const flags = [];                         // 旗
  const lamps = [];                         // 点光源
  const smokes = [];                        // 炊烟
  const roof = group(G);                    // 主堡屋顶（整体上掀）
  const mark = (o, k) => { o.userData.key = k; return o; };
  const cutMat = (color, opts = {}) => {
    const m = MU(color, { transparent: true, opacity: 1, depthWrite: true, ...opts });
    cutFades.push(m); return m;
  };
  const cutBasic = (color) => {
    const m = new T.MeshBasicMaterial({ color, transparent: true, opacity: 1, depthWrite: true, fog: false });
    cutFades.push(m); return m;
  };
  const glowMat = (cut = false) => {
    const m = cut ? cutBasic(0xffd9a0) : B(0xffd9a0, { fog: false });
    winMats.push(m); return m;
  };

  /* 一面带暖光的深洞拱窗 */
  function windowAt(parent, x, y, z, ry = 0, s = 1, isCut = false) {
    const g = group(parent, x, y, z); g.rotation.y = ry;
    const frame = isCut ? cutMat(0x8d7c67) : M(0x8d7c67);
    box(g, .80 * s, 1.02 * s, .14, frame, 0, 0, 0);
    box(g, .58 * s, .80 * s, .17, glowMat(isCut), 0, .01, .02);
    const mull = isCut ? cutMat(COL.stone) : M(COL.stone);
    box(g, .055 * s, .80 * s, .20, mull, 0, .01, .11);
    box(g, .58 * s, .055 * s, .20, mull, 0, .01, .11);
    const arch = new T.Mesh(new T.TorusGeometry(.29 * s, .07 * s, 6, 16, Math.PI), frame);
    arch.position.set(0, .51 * s, .09); g.add(arch);
    if (!isCut) halos.push(halo(g, 0xffd9a0, 2.4 * s, 0, .04, .38, .42));
    return g;
  }

  function pennant(parent, x, y, z, color, s = 1, key) {
    const g = group(parent, x, y, z);
    if (key) mark(g, key);
    cyl(g, .05, 2.3 * s, M(COL.woodDk), 0, 1.15 * s, 0, 8);
    const sh = new T.Shape();
    sh.moveTo(0, 0); sh.lineTo(1.15 * s, .30 * s); sh.lineTo(0, .64 * s); sh.closePath();
    const f = new T.Mesh(new T.ShapeGeometry(sh), MU(color, { side: T.DoubleSide }));
    f.position.set(.04, 1.78 * s, 0); g.add(f); flags.push(f);
    ball(g, .11, M(COL.gold), 0, 2.34 * s, 0);
    return g;
  }

  /* ── 石台地与护坡 ─────────────────────────────── */
  const plateau = group(G, 0, 0, -5); mark(plateau, 'plateau');
  box(plateau, 22.6, .14, 22.6, M(COL.stone2), 0, Y - .02, 0);
  const edging = [];
  for (let i = 0; i < 96; i++) {
    const a = i / 96 * TAU;
    const x = Math.cos(a) * 11.4, z = Math.sin(a) * 11.4;
    edging.push({ x, y: Y + .06, z, sx: .68, sy: .28, sz: .52, ry: a,
      color: i % 3 ? COL.stoneDk : COL.stoneShade });
  }
  // 护坡用小方石沿方形边缘
  const slope = [];
  for (let i = 0; i < 92; i++) {
    const t = i / 92, side = Math.floor(t * 4), u = (t * 4) % 1 * 22.6 - 11.3;
    const p = [[u, -11.3], [11.3, u], [-u, 11.3], [-11.3, -u]][side];
    slope.push({ x: p[0], y: Y - .28, z: p[1], sx: .8, sy: .5, sz: .7,
      ry: rand() * .4, color: i % 3 ? COL.stoneDk : COL.rockLt });
  }
  instances(plateau, GEO.box, M(0xffffff), slope);

  /* ── 幕墙与垛口 ───────────────────────────────── */
  const walls = group(G); mark(walls, 'wall');
  const WH = 3.75, WT = .9, wy = Y + WH / 2;
  const stone = M(COL.stone), stone2 = M(COL.stone2);
  // 背墙与侧墙
  box(walls, 21.2, WH, WT, stone, 0, wy, -15.1);
  box(walls, WT, WH, 20.2, stone, -10.6, wy, -5);
  box(walls, WT, WH, 20.2, stone, 10.6, wy, -5);
  // 正面墙：门楼两侧
  box(walls, 7.6, WH, WT, stone, -6.8, wy, 5.1);
  box(walls, 7.6, WH, WT, stone, 6.8, wy, 5.1);
  // 石带
  box(walls, 21.2, .18, 1.02, stone2, 0, Y + WH - .55, -15.1);
  // 垛口
  const merlons = [];
  const pushMerlon = (x, z, ry, n) => {
    for (let i = 0; i < n; i++) {
      const u = (i + .5) / n - .5;
      merlons.push({ x: x + (ry ? 0 : u * 20.4), y: Y + WH + .34, z: z + (ry ? u * 20.4 : 0),
        sx: .78, sy: .68, sz: .82, color: i % 5 ? COL.stone : COL.stoneShade });
    }
  };
  pushMerlon(0, -15.1, 0, 16); pushMerlon(0, 5.1, 0, 12);
  const merlonSide = [];
  for (let i = 0; i < 30; i++) {
    const u = (i + .5) / 30 - .5;
    for (const sx of [-10.6, 10.6]) merlonSide.push({ x: sx, y: Y + WH + .34, z: -5 + u * 20.0,
      sx: .82, sy: .68, sz: .78, color: i % 4 ? COL.stone : COL.stoneShade });
  }
  instances(walls, GEO.box, M(0xffffff), merlons.concat(merlonSide));
  // 内侧木巡道
  box(walls, 19.8, .12, 1.1, M(COL.wood), 0, Y + 2.6, -14.2);
  box(walls, 1.1, .12, 19, M(COL.wood), -9.8, Y + 2.6, -5);
  box(walls, 1.1, .12, 19, M(COL.wood), 9.8, Y + 2.6, -5);
  for (let i = 0; i < 26; i++) {
    const u = i / 26 * 19.8 - 9.9;
    box(walls, .08, .8, .08, M(COL.woodDk), u, Y + 3.0, -13.7);
  }
  // 箭孔
  for (let i = 0; i < 12; i++) {
    const u = i / 12 * 18.8 - 9.4;
    box(walls, .2, .78, .12, M(0x6f6354), u, Y + 2.2, -14.6);
  }

  /* ── 四角圆塔 ─────────────────────────────────── */
  const towers = group(G); mark(towers, 'towers');
  const towerSpots = [[-9.6, 4.6], [9.6, 4.6], [-9.6, -14.6], [9.6, -14.6]];
  towerSpots.forEach(([x, z], i) => {
    const g = group(towers, x, 0, z);
    cyl(g, 2.05, 8.6, stone, 0, Y + 4.3, 0, 24);
    cyl(g, 2.22, .55, M(COL.stoneDk), 0, Y + 6.6, 0, 24);
    cyl(g, 2.3, .4, M(COL.stone2), 0, Y + 8.5, 0, 24);
    cone(g, 2.72, 4.1, M(i % 2 ? COL.roofBlue : COL.roofDark), 0, Y + 10.7, 0, 16);
    ball(g, .16, M(COL.gold), 0, Y + 12.85, 0);
    // 塔身箭窗（四面）
    for (let k = 0; k < 4; k++) {
      const a = k * Math.PI / 2;
      const wx = Math.sin(a) * 2.03, wz = Math.cos(a) * 2.03;
      windowAt(g, wx, Y + 4.4, wz, a, .62);
    }
    if (i === 3) pennant(g, 0, Y + 12.8, 0, COL.roofRed, 1);
    else if (i === 1) pennant(g, 0, Y + 12.8, 0, COL.roofBlue, .9);
  });

  /* ── 门楼与吊桥 ───────────────────────────────── */
  const gate = group(G); mark(gate, 'gate');
  // 双塔
  for (const sx of [-2.9, 2.9]) {
    const g = group(gate, sx, 0, 5.1);
    cyl(g, 1.62, 7.6, stone, 0, Y + 3.8, 0, 16);
    cyl(g, 1.78, .38, M(COL.stoneDk), 0, Y + 6.2, 0, 16);
    cone(g, 2.05, 3.2, M(COL.roofRed), 0, Y + 9.2, 0, 16);
    windowAt(g, 0, Y + 4.6, 1.6, 0, .7);
    ball(g, .12, M(COL.gold), 0, Y + 10.9, 0);
  }
  // 带拱洞的门墙
  const sh = new T.Shape();
  sh.moveTo(-2.9, 0); sh.lineTo(2.9, 0); sh.lineTo(2.9, 6.4); sh.lineTo(-2.9, 6.4); sh.closePath();
  const hole = new T.Path();
  hole.moveTo(-1.3, 0); hole.lineTo(1.3, 0); hole.lineTo(1.3, 2.35);
  hole.absarc(0, 2.35, 1.3, 0, Math.PI, false);
  hole.lineTo(-1.3, 0); hole.closePath();
  sh.holes.push(hole);
  const gateWall = new T.Mesh(new T.ExtrudeGeometry(sh, { depth: 1.6, bevelEnabled: false, curveSegments: 18 }), stone);
  gateWall.position.set(0, Y, 4.55); gateWall.castShadow = true; gateWall.receiveShadow = true;
  gate.add(gateWall);
  // 拱券石圈
  const arch = new T.Mesh(new T.TorusGeometry(1.34, .17, 8, 24, Math.PI), M(COL.stoneShade));
  arch.position.set(0, Y + 2.35, 6.2); gate.add(arch);
  // 星纹门楣
  const star = group(gate, 0, Y + 4.5, 6.22);
  for (let i = 0; i < 6; i++) {
    const a = i / 6 * TAU;
    const r = box(star, .12, .5, .08, M(COL.gold), Math.sin(a) * .28, Math.cos(a) * .28, 0);
    r.rotation.z = -a;
  }
  ball(star, .16, M(COL.gold), 0, 0, 0);
  // 吊闸
  const port = group(gate, 0, 0, 5.75);
  for (let i = -3; i <= 3; i++) box(port, .11, 1.7, .11, M(COL.woodDk), i * .36, Y + 4.35, 0);
  for (let k = 0; k < 3; k++) box(port, 2.6, .1, .13, M(0x59534b), 0, Y + 3.65 + k * .68, 0);
  box(port, 2.6, .16, .2, M(0x59534b), 0, Y + 5.25, 0);
  // 浅壕与吊桥
  box(gate, 5.2, .08, 3.6, M(0x9a987f), 0, Y - .14, 7.4);
  const bridge = group(gate); mark(bridge, 'gate');
  for (let i = 0; i < 12; i++) {
    const z = 5.85 + i * .26;
    box(bridge, 3.0, .13, .24, M(i % 2 ? COL.wood : COL.woodLt), 0, Y + .07 - i * .006, z);
  }
  for (const sx of [-1.62, 1.62]) {
    rod(bridge, [sx, Y + 6.1, 5.9], [sx, Y + .35, 8.95], .035, M(0x5d564c));
    for (let i = 0; i < 4; i++) box(bridge, .1, .55, .1, M(COL.woodDk), sx, Y + .35, 6.1 + i * .9);
  }
  // 门灯
  for (const sx of [-3.9, 3.9]) {
    const h = halo(gate, 0xffcf8c, 2.6, sx, Y + 3.2, 6.4, .55); halos.push(h);
    box(gate, .26, .4, .26, glowMat(), sx, Y + 3.2, 6.25);
  }

  /* ── 主堡 ─────────────────────────────────────── */
  const keep = group(G, 0, 0, L.keep.z); mark(keep, 'keep');
  const KX = 0, KZ = 0; // 局部坐标，中心在 L.keep.z
  const W = L.keep.w, D = L.keep.d;
  // 台基（边框 + 地窖空间）
  box(keep, W + 1.2, .8, D + 1.2, M(COL.stoneDk), 0, Y - .45, 0);
  box(keep, W - .2, .12, D - .2, M(COL.stoneShade), 0, Y + .04, 0);
  // 四角扶壁
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
    box(keep, .85, 10.4, .85, M(COL.stone2), sx * (W / 2 + .1), Y + 5.2, sz * (D / 2 + .1));
    cone(keep, .62, 1.05, M(COL.roofBlue), sx * (W / 2 + .1), Y + 11.0, sz * (D / 2 + .1), 4);
  }
  // 墙体：北、西常驻；南、东剖面时淡出
  const solidWall = M(COL.stone);
  box(keep, W, 10.1, .55, solidWall, 0, Y + 5.05, -D / 2);          // 北
  box(keep, .55, 10.1, D, solidWall, -W / 2, Y + 5.05, 0);           // 西
  const southMat = cutMat(COL.stone);
  const eastMat = cutMat(COL.stone);
  box(keep, W, 10.1, .55, southMat, 0, Y + 5.05, D / 2);             // 南（掀）
  box(keep, .55, 10.1, D, eastMat, W / 2, Y + 5.05, 0);              // 东（掀）
  // 腰线
  for (const fy of [Y + 3.3, Y + 6.7, Y + 10.1]) {
    box(keep, W + .5, .22, .7, M(COL.stone2), 0, fy, -D / 2);
    box(keep, .7, .22, D + .5, M(COL.stone2), -W / 2, fy, 0);
    box(keep, W + .5, .22, .7, cutMat(COL.stone2), 0, fy, D / 2);
    box(keep, .7, .22, D + .5, cutMat(COL.stone2), W / 2, fy, 0);
  }
  // 外窗
  for (const fy of [Y + 2.0, Y + 5.4, Y + 8.8]) {
    windowAt(keep, -2.4, fy, -D / 2 - .28, Math.PI, .9);
    windowAt(keep, 2.4, fy, -D / 2 - .28, Math.PI, .9);
    windowAt(keep, -W / 2 - .28, fy, -1.6, -Math.PI / 2, .9);
    windowAt(keep, -W / 2 - .28, fy, 1.6, -Math.PI / 2, .9);
    windowAt(keep, -2.4, fy, D / 2 + .28, 0, .9, true);
    windowAt(keep, 2.4, fy, D / 2 + .28, 0, .9, true);
    windowAt(keep, W / 2 + .28, fy, -1.6, Math.PI / 2, .9, true);
    windowAt(keep, W / 2 + .28, fy, 1.6, Math.PI / 2, .9, true);
  }

  /* 楼板：北半保留，南半剖面时淡出，好让三层同时可见 */
  for (const fy of [Y + 3.3, Y + 6.7, Y + 10.1]) {
    box(keep, W - .5, .26, D * .44, M(COL.wood), 0, fy, -D * .28);
    box(keep, W - .5, .26, D * .44, cutMat(COL.woodLt), 0, fy, D * .28);
    box(keep, W - .5, .1, .18, M(COL.woodDk), 0, fy - .18, -D * .06);
  }

  /* 一层：大宴厅 */
  const hall = group(keep, 0, 0, 0); mark(hall, 'hall');
  box(hall, W - .8, .08, D - .8, M(0xd9cbb2), 0, Y + .1, 0);
  box(hall, 4.6, .18, 1.35, M(COL.wood), 0, Y + 1.05, .5);
  for (const sx of [-2.0, 2.0]) for (const sz of [-.05, 1.05])
    box(hall, .22, 1.0, .22, M(COL.woodDk), sx, Y + .52, sz);
  for (let i = 0; i < 3; i++) for (const sz of [-.35, 1.35]) {
    const x = -1.6 + i * 1.6;
    box(hall, .55, .1, .5, M(COL.woodLt), x, Y + .68, sz);
    box(hall, .55, .85, .1, M(COL.woodDk), x, Y + 1.1, sz + (sz < 0 ? -.24 : .24));
  }
  // 餐具
  for (let i = 0; i < 4; i++) {
    cyl(hall, .17, .12, M(0xe8ddc8), -1.6 + i * 1.05, Y + 1.2, .5, 12);
    cyl(hall, .075, .2, M(0xb9a98d), -1.6 + i * 1.05, Y + 1.3, .82, 8);
  }
  ball(hall, .28, M(0xd9b274), 1.2, Y + 1.28, .2, .6, .8);
  // 壁炉
  box(hall, 2.4, 2.0, .42, M(COL.stoneDk), 0, Y + 1.15, -D / 2 + .38);
  box(hall, 1.5, 1.05, .12, M(0x4a4038), 0, Y + .85, -D / 2 + .62);
  for (let i = 0; i < 4; i++) cone(hall, .16, .55 + rand() * .3, M(COL.flame), -.45 + i * .3, Y + .75, -D / 2 + .68, 8);
  const fire = halo(hall, 0xffae63, 3.6, 0, Y + 1.0, -D / 2 + 1.0, .6); halos.push(fire);
  box(hall, 2.8, .2, .7, M(COL.stone2), 0, Y + 2.2, -D / 2 + .5);
  // 织毯
  for (const sx of [-3.0, 3.0]) {
    quad(hall, 1.5, 2.1, M(sx < 0 ? 0x9c7f92 : 0x7f96a3), sx, Y + 2.3, -D / 2 + .31);
    for (let i = 0; i < 4; i++) box(hall, 1.5, .1, .04, M(COL.gold), sx, Y + 1.6 + i * .45, -D / 2 + .34);
  }
  // 吊灯
  const chand = new T.Mesh(new T.TorusGeometry(1.0, .055, 6, 20), M(0x6d604f));
  chand.rotation.x = Math.PI / 2; chand.position.set(0, Y + 2.85, .4); hall.add(chand);
  for (let i = 0; i < 6; i++) {
    const a = i / 6 * TAU;
    cyl(hall, .05, .3, M(0xf3e6cf), Math.cos(a), Y + 2.95, .4 + Math.sin(a), 8);
    cone(hall, .07, .18, M(COL.flame), Math.cos(a), Y + 3.18, .4 + Math.sin(a), 8);
  }
  rod(hall, [0, Y + 2.85, .4], [0, Y + 3.35, .4], .035, M(0x6d604f));

  /* 二层：王座与起居室 */
  const chamber = group(keep, 0, 0, 0); mark(chamber, 'chamber');
  const F2 = Y + 3.3;
  for (let i = 0; i < 2; i++) box(chamber, 2.4 - i * .4, .18, 1.7 - i * .3, M(COL.stone2), 0, F2 + .15 + i * .18, -2.2);
  box(chamber, 1.25, .18, 1.1, M(COL.wood), 0, F2 + .72, -2.2);
  box(chamber, 1.25, 1.7, .18, M(0xa9605e), 0, F2 + 1.5, -2.62);
  box(chamber, .16, 1.2, 1.1, M(COL.wood), -.6, F2 + 1.1, -2.2);
  box(chamber, .16, 1.2, 1.1, M(COL.wood), .6, F2 + 1.1, -2.2);
  ball(chamber, .17, M(COL.gold), 0, F2 + 2.45, -2.62);
  cyl(chamber, .9, .14, M(COL.woodLt), 1.6, F2 + .85, 1.0, 16);
  for (const sx of [-.85, .85]) cyl(chamber, .09, .8, M(COL.woodDk), 1.6 + sx * .55, F2 + .45, 1.0, 8);
  const board = [];
  for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++)
    board.push({ x: 1.25 + i * .09, y: F2 + .95, z: .65 + j * .09, sx: .09, sy: .02, sz: .09,
      color: (i + j) % 2 ? 0xf1e6d0 : 0x77685a });
  instances(chamber, GEO.box, M(0xffffff), board);
  // 窗洞坐台、画像、盆栽
  box(chamber, 1.4, .3, .6, M(COL.stone2), -W / 2 + .55, F2 + .6, 1.2);
  for (let i = 0; i < 3; i++) quad(chamber, .9, 1.2, M([0x8b7a6a, 0x9a8b78, 0x7d8a8c][i]), -W / 2 + .32, F2 + 2.0, -1.6 + i * 1.5, 0, Math.PI / 2);
  cyl(chamber, .3, .4, M(0xb98a60), 2.6, F2 + .35, 2.6, 12);
  for (let i = 0; i < 5; i++) ball(chamber, .18, M(0x8fae7c), 2.6 + (rand() - .5) * .5, F2 + .65 + rand() * .25, 2.6 + (rand() - .5) * .5);
  for (let i = 0; i < 3; i++) ball(chamber, .1, M(COL.rose), 2.6 + (rand() - .5) * .4, F2 + .9, 2.6 + (rand() - .5) * .4);

  /* 三层：藏书室 + 卧室 */
  const library = group(keep, 0, 0, 0); mark(library, 'library');
  const F3 = Y + 6.7;
  for (let s = 0; s < 3; s++) {
    const sx = -3.1 + s * 2.6;
    box(library, 1.9, 2.6, .42, M(COL.woodDk), sx, F3 + 1.4, -D / 2 + .45);
    const books = [];
    for (let row = 0; row < 3; row++) {
      box(library, 1.9, .09, .5, M(COL.wood), sx, F3 + .45 + row * .85, -D / 2 + .68);
      for (let b = 0; b < 11; b++) {
        const h = .42 + rand() * .22;
        books.push({ x: sx - .82 + b * .16, y: F3 + .5 + row * .85 + h / 2, z: -D / 2 + .72,
          sx: .12, sy: h, sz: .16,
          color: [0x9c7f76, 0x7d8f9b, 0xb9a074, 0x8a7d95, 0xc0a98c, 0x7f9c88][Math.floor(rand() * 6)] });
      }
    }
    instances(library, GEO.box, M(0xffffff), books);
  }
  // 斜面书桌与仪器
  const desk = box(library, 2.0, .12, 1.0, M(COL.woodLt), 1.7, F3 + 1.05, 1.4, 0);
  desk.rotation.x = -.18;
  for (const sx of [.9, 2.5]) box(library, .12, 1.0, .8, M(COL.woodDk), sx, F3 + .55, 1.4);
  ball(library, .3, M(0xb6a07a), 1.35, F3 + 1.35, 1.1);
  const ring = new T.Mesh(new T.TorusGeometry(.36, .035, 6, 20), M(COL.gold));
  ring.rotation.x = .5; ring.position.set(1.35, F3 + 1.35, 1.1); library.add(ring);
  const scope = cyl(library, .1, 1.5, M(0xb99256), 2.2, F3 + 1.6, .9, 12);
  scope.rotation.z = -.65; scope.rotation.x = .3;
  cyl(library, .06, .9, M(COL.woodDk), 1.95, F3 + 1.05, .9, 8);
  // 天窗与木梯
  box(library, 1.2, .06, 1.0, glowMat(), .3, Y + 10.1, -.4);
  for (let i = 0; i < 6; i++) box(library, 1.0, .07, .1, M(COL.woodDk), -3.0, F3 + .35 + i * .55, -2.2 + i * .18);

  const bedroom = group(keep, 0, 0, 0); mark(bedroom, 'bedroom');
  box(bedroom, 2.5, .45, 1.9, M(COL.wood), 2.5, F3 + .45, 2.1);
  box(bedroom, 2.3, .2, 1.7, M(0xece1cf), 2.5, F3 + .78, 2.1);
  box(bedroom, 2.4, .16, .7, M(0x9fb0c4), 2.5, F3 + .88, 2.6);
  for (const sx of [1.3, 3.7]) for (const sz of [1.3, 2.9]) {
    cyl(bedroom, .075, 2.1, M(COL.woodDk), sx, F3 + 1.2, sz, 8);
  }
  for (const sx of [1.35, 3.65]) quad(bedroom, .07, 1.4, M(0xf3ead8, { transparent: true, opacity: .55, side: T.DoubleSide }), sx, F3 + 1.3, 2.1, 0, 0);
  box(bedroom, .7, .65, .7, M(COL.wood), -2.9, F3 + .5, 2.7);
  cyl(bedroom, .16, .28, M(0xd6c9ae), -2.9, F3 + .96, 2.7, 12);
  ball(bedroom, .14, M(COL.rock), -2.55, F3 + 1.0, 2.7);

  /* 螺旋楼梯（贴西墙内侧） */
  const stair = group(keep, -3.25, 0, -.4); mark(stair, 'stair');
  cyl(stair, .22, 10.0, M(COL.stone2), 0, Y + 5.0, 0, 12);
  const steps = [];
  for (let i = 0; i < 64; i++) {
    const a = i * .31, yy = Y + .25 + i * .155;
    steps.push({ x: Math.cos(a) * .95, y: yy, z: Math.sin(a) * .95,
      sx: .85, sy: .11, sz: .34, ry: -a, color: i % 4 ? COL.stone : COL.stoneShade });
  }
  instances(stair, GEO.box, M(0xffffff), steps);
  for (let i = 0; i < 5; i++) halos.push(halo(stair, 0xffcf8c, 1.5, -1.5, Y + 1.2 + i * 2.1, .9, .3));

  /* 屋顶（可整体掀开） */
  const roofTop = group(roof, 0, 0, L.keep.z);
  const roofMesh = cone(roofTop, 7.4, 4.3, M(COL.roofBlue, { flatShading: true }), 0, Y + 12.25, 0, 4);
  roofMesh.rotation.y = Math.PI / 4; roofMesh.scale.z = .86;
  roofMesh.material = cutMat(COL.roofBlue, { flatShading: true });
  // 屋脊与星形风向标
  cyl(roofTop, .06, 2.4, M(COL.woodDk), 0, Y + 15.0, 0, 8);
  for (let i = 0; i < 4; i++) {
    const a = i / 4 * TAU;
    rod(roofTop, [0, Y + 15.7, 0], [Math.cos(a) * .55, Y + 15.7, Math.sin(a) * .55], .045, M(COL.gold));
  }
  ball(roofTop, .2, M(COL.gold), 0, Y + 15.7, 0);
  // 老虎窗
  for (const sx of [-2.2, 0, 2.2]) {
    const wg = group(roofTop, sx, Y + 11.1, 3.0);
    box(wg, .9, 1.0, .8, cutMat(COL.stone2), 0, 0, 0);
    box(wg, .55, .7, .1, glowMat(), 0, 0, .45);
    cone(wg, .75, .7, cutMat(COL.roofRed), 0, .82, 0, 4).rotation.y = Math.PI / 4;
  }
  // 烟囱与炊烟
  box(roofTop, .85, 2.3, .85, cutMat(COL.stoneDk), 2.9, Y + 12.6, -2.4);
  box(roofTop, 1.05, .2, 1.05, cutMat(COL.stone2), 2.9, Y + 13.8, -2.4);
  for (let i = 0; i < 6; i++) {
    const s = halo(roofTop, 0xf0e6d8, 1.0 + i * .42,
      2.9 + (rand() - .5) * 1.3 + i * .1, Y + 14.4 + i * .82,
      -2.4 + (rand() - .5) * 1.2, .085);
    s.userData.baseY = s.position.y; s.userData.range = 4.2;
    smokes.push(s);
  }
  pennant(roofTop, -3.9, Y + 13.6, -2.7, COL.roofRed, .8);

  /* ── 地窖储藏（主堡东侧的半地下石屋） ─────────── */
  const cellar = group(G, 7.8, 0, -8.2); mark(cellar, 'cellar');
  box(cellar, 3.8, 2.1, 3.4, M(COL.stoneDk), 0, Y + 1.0, 0);
  box(cellar, 4.2, .25, 3.8, M(COL.roofRed), 0, Y + 2.2, 0);
  box(cellar, 1.3, 1.5, .12, M(0x3f3830), 1.92, Y + .82, 0);
  box(cellar, 1.5, .16, .2, M(COL.stoneShade), 1.92, Y + 1.62, 0);
  for (let i = 0; i < 3; i++) box(cellar, 1.5, .12, .5, M(COL.wood), 1.6 - i * .35, Y - .05 + i * .18, .3);
  halos.push(halo(cellar, 0xffcf8c, 2.8, 2.2, Y + 1.0, .3, .5));
  for (let i = 0; i < 4; i++) {
    const b = cyl(cellar, .42, 1.0, M(0x9d754c), -1.1 + (i % 2) * 1.1, Y + .55 + Math.floor(i / 2) * .95, -.7, 12);
    b.rotation.z = Math.PI / 2;
    box(cellar, .92, .08, .5, M(0x5a5148), -1.1 + (i % 2) * 1.1, Y + .55 + Math.floor(i / 2) * .95, -.7);
  }
  for (let i = 0; i < 3; i++) ball(cellar, .36, M(0xd6c39c), .3 + i * .7, Y + .45, 1.1, .8, .8);
  cyl(cellar, .3, .5, M(0xb9a17e), 1.2, Y + .4, 1.1, 12);

  /* ── 小礼拜堂 ─────────────────────────────────── */
  const chapel = group(G, L.chapel.x, 0, L.chapel.z); mark(chapel, 'chapel');
  box(chapel, 4.4, 4.2, 6.2, M(COL.stone), 0, Y + 2.1, 0);
  for (const s of [-1, 1]) {
    const r = box(chapel, 2.9, .2, 6.8, M(COL.roofRed), s * 1.15, Y + 5.0, 0);
    r.rotation.z = s * .62;
  }
  // 钟楼
  const belfry = group(chapel, 0, 0, 2.4);
  box(belfry, 1.5, 2.3, 1.5, M(COL.stone2), 0, Y + 5.4, 0);
  cone(belfry, 1.35, 1.9, M(COL.roofDark), 0, Y + 7.4, 0, 4).rotation.y = Math.PI / 4;
  ball(belfry, .22, M(0xc9a15e), 0, Y + 6.0, .8);
  for (const s of [-1, 1]) box(belfry, .18, 1.2, .18, M(COL.woodDk), s * .48, Y + 5.7, .78);
  // 玫瑰窗
  const roseW = new T.Mesh(new T.CircleGeometry(.85, 24), B(0xb7c9d8, { side: T.DoubleSide }));
  roseW.position.set(2.22, Y + 2.7, 0); roseW.rotation.y = Math.PI / 2; chapel.add(roseW);
  for (let i = 0; i < 8; i++) {
    const a = i / 8 * TAU;
    const petal = new T.Mesh(new T.CircleGeometry(.3, 3), B([0x8fa9c4, 0xd8b57c, 0xb9a6c4, 0xa8c2b3][i % 4], { side: T.DoubleSide }));
    petal.position.set(2.24, Y + 2.7 + Math.sin(a) * .48, Math.cos(a) * .48);
    petal.rotation.y = Math.PI / 2; chapel.add(petal);
  }
  halos.push(halo(chapel, 0xffe6bd, 3.0, 2.5, Y + 2.7, 0, .35));
  // 门、长凳、祭坛
  box(chapel, 1.1, 1.9, .14, M(0x6b5a49), 0, Y + .95, 3.15);
  box(chapel, 1.5, .2, .4, M(COL.stone2), 0, Y + 2.0, 3.18);
  for (let i = 0; i < 2; i++) for (const s of [-1, 1]) {
    box(chapel, 1.3, .12, .4, M(COL.wood), s * .95, Y + .55, -1.0 + i * 1.2);
    box(chapel, 1.3, .6, .1, M(COL.woodDk), s * .95, Y + .9, -1.25 + i * 1.2);
  }
  box(chapel, 1.8, .9, .7, M(COL.stone2), 0, Y + .45, -2.5);
  for (const s of [-1, 1]) {
    cyl(chapel, .055, .35, M(0xf2e4c9), s * .5, Y + 1.08, -2.5, 8);
    cone(chapel, .07, .18, M(COL.flame), s * .5, Y + 1.34, -2.5, 8);
  }
  for (const s of [-1, 1]) windowAt(chapel, s * 2.4, Y + 2.4, 1.4, Math.PI / 2, .8);

  /* ── 厨房 ─────────────────────────────────────── */
  const kitchen = group(G, L.kitchen.x, 0, L.kitchen.z); mark(kitchen, 'kitchen');
  box(kitchen, 3.6, 2.7, 3.4, M(COL.stone2), 0, Y + 1.35, 0);
  for (const s of [-1, 1]) box(kitchen, 2.4, .18, 3.9, M(COL.roofRed), s * .95, Y + 3.1, 0).rotation.z = s * .55;
  box(kitchen, .9, 1.6, .9, M(COL.stoneDk), -1.2, Y + 3.7, -1.0);
  box(kitchen, 1.1, .16, 1.1, M(COL.stone2), -1.2, Y + 4.5, -1.0);
  for (let i = 0; i < 5; i++) {
    const s = halo(kitchen, 0xf0e6d8, 1.0 + i * .38,
      -1.2 + (rand() - .5) * .8 + i * .12, Y + 4.9 + i * .72,
      -1.0 + (rand() - .5) * .8, .085);
    s.userData.baseY = s.position.y; s.userData.range = 3.6;
    smokes.push(s);
  }
  box(kitchen, 1.0, 1.0, .12, M(0x4a4038), 0, Y + .6, 1.74);
  halos.push(halo(kitchen, 0xffb871, 2.4, 0, Y + .7, 1.9, .5));
  box(kitchen, 1.8, .12, .7, M(COL.wood), 0, Y + 1.0, 1.3);
  for (let i = 0; i < 4; i++) ball(kitchen, .18, M(0xd9b274), -.6 + i * .4, Y + 1.15, 1.3, .6, .7);
  windowAt(kitchen, 1.82, Y + 1.7, .4, Math.PI / 2, .7);
  for (let i = 0; i < 4; i++) {
    const herb = cyl(kitchen, .1, .6, M(0x8b9c74), -1.2 + i * .45, Y + 2.5, .5, 8);
    herb.rotation.z = .1;
  }

  /* ── 马厩与铁匠角 ─────────────────────────────── */
  const stable = group(G, L.stable.x, 0, L.stable.z); mark(stable, 'stable');
  box(stable, 4.4, 2.4, 3.2, M(COL.wood), 0, Y + 1.2, -1.0);
  for (const s of [-1, 1]) box(stable, 2.8, .18, 3.7, M(0xa88b68), s * 1.15, Y + 2.7, -1.0).rotation.z = s * .5;
  for (let i = 0; i < 4; i++) {
    box(stable, .14, 1.3, .14, M(COL.woodDk), -1.6 + i * 1.05, Y + .7, .75);
  }
  box(stable, 4.4, .12, .12, M(COL.woodDk), 0, Y + 1.25, .75);
  for (let i = 0; i < 5; i++) ball(stable, .4, M(0xd8c187), -1.6 + i * .8, Y + .25, -.4 + rand() * .8, .55, .8);
  box(stable, 1.2, .5, .8, M(0x5b5650), 3.0, Y + .9, 1.2);
  box(stable, .35, 1.0, .35, M(COL.woodDk), 3.0, Y + .4, 1.2);
  box(stable, .7, .45, .6, M(0x8a6444), 3.9, Y + .35, 1.0);
  cyl(stable, .35, .1, M(0x717f88), 3.9, Y + .65, 1.0, 8);
  halos.push(halo(stable, 0xffb871, 2.0, 3.0, Y + 1.3, 1.2, .35));

  /* ── 水井 ─────────────────────────────────────── */
  const well = group(G, L.well.x, 0, L.well.z); mark(well, 'well');
  const wellRing = new T.Mesh(new T.TorusGeometry(1.0, .28, 10, 24), M(COL.stone2));
  wellRing.rotation.x = -Math.PI / 2; wellRing.position.y = Y + .35; well.add(wellRing);
  cyl(well, 1.02, .55, M(COL.stoneDk), 0, Y + .2, 0, 24);
  const dark = new T.Mesh(new T.CircleGeometry(.87, 24), B(0x39433f, { side: T.DoubleSide }));
  dark.rotation.x = -Math.PI / 2; dark.position.y = Y + .5; well.add(dark);
  for (let i = 0; i < 6; i++) {
    const a = i / 6 * TAU;
    box(well, .22, .18, .5, M(COL.stoneShade), Math.cos(a) * .98, Y + .62, Math.sin(a) * .98, a);
  }
  for (const s of [-1, 1]) box(well, .16, 2.3, .16, M(COL.woodDk), s * 1.05, Y + 1.35, 0);
  box(well, 2.4, .17, .2, M(COL.wood), 0, Y + 2.5, 0);
  const roller = cyl(well, .16, 1.2, M(COL.woodLt), 0, Y + 2.1, 0, 12);
  roller.rotation.z = Math.PI / 2;
  rod(well, [0, Y + 2.1, 0], [0, Y + 1.1, 0], .02, M(0x8a7a62));
  cyl(well, .26, .36, M(0x9d754c), 0, Y + .95, 0, 12);
  cyl(well, .28, .06, M(0x5d5144), 0, Y + 1.13, 0, 12);

  /* ── 市集三顶篷 ───────────────────────────────── */
  const market = group(G); mark(market, 'market');
  [[-6.4, 3.2, 0xc27c72], [-4.4, 3.6, 0x7f9db4], [-6.0, 1.4, 0xd8b47c]].forEach(([x, z, col], k) => {
    const s = group(market, x, 0, z);
    for (const sx of [-1, 1]) for (const sz of [-1, 1])
      box(s, .1, 2.2, .1, M(COL.woodDk), sx * 1.0, Y + 1.1, sz * .75);
    for (let i = 0; i < 8; i++) {
      const stripe = box(s, .25, .08, 1.8, M(i % 2 ? col : 0xf5ead6), -.875 + i * .25, Y + 2.25, 0);
      stripe.rotation.z = (i - 3.5) * -.02;
    }
    box(s, 2.0, .12, 1.1, M(COL.woodLt), 0, Y + .95, 0);
    for (let i = 0; i < 5; i++) {
      const gx = -.7 + i * .35;
      if (k === 0) ball(s, .16, M(0xd9b274), gx, Y + 1.1, 0, .7, .8);
      else if (k === 1) cyl(s, .13, .28, M(0xc3a17f), gx, Y + 1.15, 0, 10);
      else ball(s, .12, M([0xd97b78, 0xe8c56a, 0xc7a3c4][i % 3]), gx, Y + 1.1, 0);
    }
  });

  /* ── 灯火与藤蔓 ───────────────────────────────── */
  for (const [x, z] of [[-9.0, 3.5], [9.0, 3.5], [-8.5, -13.5], [8.5, -13.5]]) {
    box(G, .24, .38, .24, glowMat(), x, Y + 2.6, z);
    halos.push(halo(G, 0xffcf8c, 2.2, x, Y + 2.6, z + .2, .45));
  }
  const lamp1 = new T.PointLight(0xffc98a, .55, 26, 2);
  lamp1.position.set(0, Y + 3.2, 2.0); G.add(lamp1); lamps.push(lamp1);
  const lamp2 = new T.PointLight(0xffc98a, .45, 20, 2);
  lamp2.position.set(1.5, Y + 8.6, -8.0); G.add(lamp2); lamps.push(lamp2);

  return {
    setCutaway(t) {
      cutFades.forEach(m => {
        m.opacity = 1 - t * .94;
        m.depthWrite = t < .45;
      });
      roof.position.y = t * 4.6;
      roof.rotation.z = t * .035;
    },
    setNight(n) {
      winMats.forEach(m => m.color.setHex(n > .5 ? 0xffe6b6 : 0xffd9a0));
      halos.forEach(h => { h.material.opacity = .36 + n * .5; });
      lamps.forEach(l => { l.intensity = .35 + n * 1.15; });
    },
    update(t) {
      flags.forEach((f, i) => {
        f.rotation.y = Math.sin(t * 1.6 + i * 1.3) * .35;
        f.scale.x = .92 + Math.sin(t * 2.2 + i) * .08;
      });
      smokes.forEach((s, i) => {
        s.position.y += .0024 + Math.sin(t * .7 + i) * .0035;
        s.position.x += Math.sin(t * .5 + i * 2) * .0016;
        s.material.opacity = .07 + Math.sin(t * .9 + i * 1.7) * .025;
        if (s.position.y > s.userData.baseY + s.userData.range) {
          s.position.y = s.userData.baseY;
        }
      });
      halos.forEach((h, i) => { if (i % 3 === 0) h.material.opacity += Math.sin(t * 2.1 + i) * .0009; });
    },
  };
}
