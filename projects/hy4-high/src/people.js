/* 岛上的人：简笔小偶，大头、圆身、柔和的颜色 */
import * as T from '../vendor/three.module.js';
import { L } from './content.js';
import { groundY } from './island.js';
import {
  COL, GEO, M, B, MU, TAU, rand, put, box, cyl, cone, ball, quad,
  instances, group, halo, rod,
} from './palette.js';

export function buildPeople(root) {
  const G = group(root);
  const anims = [];
  const lanterns = [];
  const mark = (o, k) => { o.userData.key = k; return o; };

  /* 通用小人 */
  function person(x, z, key, o = {}) {
    const y = o.y !== undefined ? o.y : groundY(x, z) + .12;
    const g = group(G, x, y, z); mark(g, key);
    g.rotation.y = o.ry ?? 0;
    const s = o.s ?? 1;
    const skin = M(o.skin || 0xf4ddc2);
    const coat = M(o.coat || 0x8fa88c);
    const pants = M(o.pants || 0xece2cf);
    const hair = M(o.hair || 0xb58a5e);
    // 腿与鞋
    for (const sx of [-.17, .17]) {
      box(g, .22 * s, .62 * s, .22 * s, pants, sx * s, .33 * s, 0);
      ball(g, .15 * s, M(0x7c6550), sx * s, .1 * s, .09 * s, .55, 1.3);
    }
    // 身体
    if (o.skirt) cone(g, .56 * s, 1.1 * s, coat, 0, .78 * s, 0, 12);
    else cyl(g, .43 * s, .96 * s, coat, 0, 1.08 * s, 0, 12);
    if (o.belly) ball(g, .45 * s, coat, 0, 1.0 * s, .16 * s, .95, .9);
    // 围裙 / 披风
    if (o.apron) quad(g, .55 * s, .8 * s, M(o.apron), 0, .92 * s, .44 * s);
    if (o.cape) {
      const cape = quad(g, 1.0 * s, 1.3 * s, M(o.cape, { side: T.DoubleSide }), 0, 1.05 * s, -.46 * s);
      cape.rotation.x = -.14;
    }
    // 手臂
    for (const side of [-1, 1]) {
      const up = o.wave && side === 1;
      rod(g, [side * .42 * s, 1.42 * s, 0],
        [side * (up ? .72 : .54) * s, (up ? 1.95 : .82) * s, .08 * s], .105 * s, coat);
      ball(g, .12 * s, skin, side * (up ? .72 : .54) * s, (up ? 1.95 : .82) * s, .08 * s);
    }
    // 头
    ball(g, .38 * s, skin, 0, 1.94 * s, 0);
    ball(g, .40 * s, hair, 0, 2.12 * s, -.02 * s, .52, 1);
    for (const sx of [-.14, .14]) ball(g, .045 * s, M(0x4a4038), sx * s, 1.96 * s, .35 * s);
    // 腮红
    for (const sx of [-.25, .25]) ball(g, .07 * s, M(0xe8aaa0), sx * s, 1.86 * s, .3 * s, .45, .3);
    // 帽
    if (o.hat === 'straw') {
      cyl(g, .66 * s, .06 * s, M(0xd8bd83), 0, 2.3 * s, 0, 16);
      cyl(g, .32 * s, .34 * s, M(0xc9ab74), 0, 2.47 * s, 0, 12);
    } else if (o.hat === 'white') {
      ball(g, .36 * s, M(0xfaf3e6), 0, 2.42 * s, 0, .75, 1);
      cyl(g, .34 * s, .18 * s, M(0xfaf3e6), 0, 2.24 * s, 0, 12);
    } else if (o.hat === 'helmet') {
      ball(g, .42 * s, M(0x9aa7ac), 0, 2.12 * s, 0, .6, 1);
      box(g, .1 * s, .35 * s, .1 * s, M(0x7c8c93), 0, 2.3 * s, .32 * s);
    } else if (o.hat === 'hood') {
      ball(g, .44 * s, M(o.coat || 0x8a755d), 0, 2.08 * s, -.12 * s, .9, 1);
    }
    // 辫子
    if (o.braids) for (const sx of [-1, 1]) {
      const b = cyl(g, .09 * s, .55 * s, hair, sx * .38 * s, 1.72 * s, -.12 * s, 8);
      b.rotation.z = sx * .28;
    }
    // 围巾
    if (o.scarf) {
      const sm = M(o.scarf);
      cyl(g, .45 * s, .2 * s, sm, 0, 1.55 * s, 0, 12);
      const curve = new T.CatmullRomCurve3([
        new T.Vector3(.2 * s, 1.55 * s, .3 * s),
        new T.Vector3(.55 * s, 1.5 * s, -.2 * s),
        new T.Vector3(.9 * s, 1.62 * s, -.55 * s),
        new T.Vector3(1.35 * s, 1.9 * s, -.75 * s),
      ]);
      const tube = new T.Mesh(new T.TubeGeometry(curve, 14, .095 * s, 6, false), sm);
      g.add(tube); anims.push({ o: tube, k: 'scarf', p: rand() * 6 });
    }
    anims.push({ o: g, k: 'breathe', p: rand() * 6 });
    return { g, s };
  }

  /* ── 小王子 ───────────────────────────────────── */
  const prince = person(L.prince.x, L.prince.z, 'prince', {
    coat: 0x7fa88a, pants: 0xf2e8d6, hair: 0xe3c882, scarf: 0xe8c56a,
    ry: -2.5, s: 1.05,
  });
  // 一缕翘起的头发
  cone(prince.g, .07, .32, M(0xe3c882), .12, 2.42, -.05, 8).rotation.z = -.5;
  // 坐着的平石
  const py = groundY(L.prince.x, L.prince.z);
  put(G, GEO.sphere8, M(0xd8ccb2), L.prince.x + .55, py + .16, L.prince.z + .35, .85, .3, .65, .1, .4, 0);

  /* ── 狐狸 ─────────────────────────────────────── */
  const fx = L.fox.x, fz = L.fox.z, fy = groundY(fx, fz) + .12;
  const fox = group(G, fx, fy, fz); mark(fox, 'fox'); fox.rotation.y = -2.2;
  const fur = M(0xd9905a), cream = M(0xf6e7cf);
  ball(fox, .52, fur, 0, .55, 0, .9, 1.35);
  ball(fox, .34, cream, 0, .48, .42, .8, .8);
  ball(fox, .38, fur, 0, 1.02, .5, 1, .9);
  for (const sx of [-.22, .22]) {
    cone(fox, .16, .42, fur, sx, 1.42, .42, 8);
    cone(fox, .09, .24, M(0xe8b894), sx, 1.4, .55, 8);
  }
  ball(fox, .16, cream, 0, .92, .85, .7, 1.1);
  ball(fox, .07, M(0x4a4038), 0, .96, .98);
  for (const sx of [-.17, .17]) ball(fox, .045, M(0x4a4038), sx, 1.12, .78);
  for (const sx of [-.3, .3]) for (const sz of [-.35, .38])
    cyl(fox, .11, .4, fur, sx, .2, sz, 8);
  const tail = group(fox, 0, .6, -.6);
  const tailParts = [];
  for (let i = 0; i < 5; i++) {
    const t = ball(tail, .3 - i * .035, i === 4 ? cream : fur, 0, i * .18, -i * .22, .9, 1.1);
    tailParts.push(t);
  }
  anims.push({ o: tail, k: 'tail', p: 1.2 });

  /* ── 玫瑰与玻璃罩 ─────────────────────────────── */
  const rx = L.rose.x, rz = L.rose.z;
  const ry0 = groundY(rx, rz) + .72;
  const rose = group(G, rx, ry0, rz); mark(rose, 'rose');
  cyl(rose, .045, 1.0, M(0x7d9c6a), 0, .5, 0, 8);
  for (let i = 0; i < 3; i++) {
    const lf = ball(rose, .22, M(i % 2 ? 0x89aa79 : 0x78a06e), (i - 1) * .22, .42 + i * .12, .06, .28, .7);
    lf.rotation.z = (i - 1) * .7;
  }
  const petalMat = M(COL.rose);
  for (let i = 0; i < 8; i++) {
    const a = i / 8 * TAU;
    const p = ball(rose, .26, i % 2 ? petalMat : M(COL.roseDk),
      Math.cos(a) * .2, 1.12 + (i % 3) * .06, Math.sin(a) * .2, .45, .9);
    p.rotation.y = a;
  }
  ball(rose, .19, M(0xefaaa0), 0, 1.24, 0, .7, 1);
  for (let i = 0; i < 4; i++) cone(rose, .045, .18, M(0x6d8a60), .05 + (i % 2) * .08, .55 + i * .17, .06, 8).rotation.z = 1.1;
  // 玻璃罩
  const dome = new T.Mesh(new T.SphereGeometry(.9, 20, 14, 0, TAU, 0, Math.PI / 2),
    new T.MeshPhongMaterial({ color: 0xdceff0, transparent: true, opacity: .17, shininess: 90, side: T.DoubleSide, depthWrite: false }));
  dome.position.y = .08; dome.scale.y = 1.75; rose.add(dome);
  const rim = new T.Mesh(new T.TorusGeometry(.9, .035, 6, 28), M(0xc8d9d8));
  rim.rotation.x = -Math.PI / 2; rim.position.y = .1; rose.add(rim);
  ball(rose, .09, M(0xd8e6e4), 0, 1.65, 0);

  /* ── 箱子里的羊 ───────────────────────────────── */
  const shx = L.sheep.x, shz = L.sheep.z, shy = groundY(shx, shz) + .12;
  const sheep = group(G, shx, shy, shz); mark(sheep, 'sheep'); sheep.rotation.y = -.4;
  const crate = M(0xc09a6c), crateDk = M(0x9c7a51);
  box(sheep, 1.5, .1, 1.2, crateDk, 0, .06, 0);
  for (const sx of [-.74, .74]) box(sheep, .09, .78, 1.25, crateDk, sx, .42, 0);
  for (const sz of [-.62, .62]) box(sheep, 1.55, .78, .09, crate, 0, .42, sz);
  const lid = box(sheep, 1.55, .1, 1.25, crate, 0, 1.1, -.9);
  lid.rotation.x = -1.0;
  for (let i = 0; i < 4; i++) ball(sheep, .075, M(0x5e513f), -.45 + i * .3, .55, .63, 1, .35);
  const wool = M(0xf6f0e4);
  ball(sheep, .42, wool, 0, .78, 0, .85, 1.05);
  for (let i = 0; i < 7; i++) {
    const a = i / 7 * TAU;
    ball(sheep, .19, wool, Math.cos(a) * .32, .92 + Math.sin(a * 2) * .12, Math.sin(a) * .3);
  }
  ball(sheep, .24, M(0xe6dcca), 0, .95, .5, .9, .8);
  for (const sx of [-.1, .1]) ball(sheep, .035, M(0x4a4038), sx, 1.0, .7);
  for (const sx of [-.2, .2]) cyl(sheep, .07, .35, M(0xd8cbb6), sx, .3, .25, 8);

  /* ── 点灯人（东北塔外挑木台） ─────────────────── */
  const lx = 9.6, lz = -12.2, ly = L.ground + 6.5;
  const lampPlatform = group(G, lx, 0, lz);
  box(lampPlatform, 1.9, .16, 1.4, M(COL.wood), 0, ly - .08, 0);
  for (let i = 0; i < 5; i++) box(lampPlatform, 1.5, .09, .1, M(COL.woodDk), 0, ly - .6 - i * .45, -.55 + i * .28);
  rod(lampPlatform, [-.75, ly - .08, -.55], [-.75, ly - 2.6, .6], .06, M(COL.woodDk));
  rod(lampPlatform, [.75, ly - .08, -.55], [.75, ly - 2.6, .6], .06, M(COL.woodDk));
  const lighter = person(0, 0, 'lamplighter', {
    x: 0, z: 0, y: ly, s: .8, coat: 0x6f7f96, pants: 0x5b6572, hair: 0x9c8b76, ry: 2.4,
  });
  lighter.g.position.set(lx, ly, lz);
  const lantern = group(G, lx + .75, ly + 1.15, lz + .35); mark(lantern, 'lamplighter');
  box(lantern, .34, .44, .34, B(0xffd9a0), 0, 0, 0);
  box(lantern, .4, .06, .4, M(0x5d5144), 0, .25, 0);
  box(lantern, .4, .06, .4, M(0x5d5144), 0, -.25, 0);
  const lglow = halo(lantern, 0xffcf8c, 4.2, 0, 0, 0, .65);
  lanterns.push(lglow);

  /* ── 守门卫兵 ─────────────────────────────────── */
  const guard = person(0, 6.6, 'guard', {
    coat: 0x8a9aa8, pants: 0x6a7681, hair: 0x8a7358, hat: 'helmet', s: 1.0, ry: .1,
  });
  rod(guard.g, [.55, .7, .15], [.62, 3.5, .15], .045, M(COL.woodDk));
  cone(guard.g, .12, .4, M(0xaeb8bd), .62, 3.65, .15, 8);
  const shield = cyl(guard.g, .42, .09, M(0x9c7f92), -.55, 1.05, .38, 16);
  shield.rotation.x = Math.PI / 2;
  ball(guard.g, .12, M(COL.gold), -.55, 1.05, .45);

  /* ── 骑士与马 ─────────────────────────────────── */
  const knight = person(-2.5, 1, 'knight', {
    coat: 0xaab4b9, pants: 0x7d878e, hair: 0x9a7d5c, hat: 'helmet',
    cape: 0xc98a86, s: 1.05, ry: .8,
  });
  rod(knight.g, [.5, 1.3, 0], [.75, .25, .3], .06, M(0xc9c2b0));
  const hx = -4.4, hz = 1.6, hy = groundY(hx, hz) + .12;
  const horse = group(G, hx, hy, hz); mark(horse, 'knight'); horse.rotation.y = .55;
  const hide = M(0xa87a52), mane = M(0x6f5138);
  ball(horse, .78, hide, 0, 1.18, 0, .85, 1.5);
  rod(horse, [0, 1.35, .85], [0, 2.0, 1.3], .27, hide);
  ball(horse, .38, hide, 0, 2.05, 1.42, .85, 1.2);
  ball(horse, .16, M(0xe8d7c0), 0, 1.95, 1.72, .6, .8);
  for (const sx of [-.2, .2]) cone(horse, .12, .35, hide, sx, 2.4, 1.28, 8);
  for (const sx of [-.48, .48]) for (const sz of [-.72, .72])
    cyl(horse, .12, 1.0, hide, sx, .5, sz, 8);
  for (let i = 0; i < 5; i++) box(horse, .1, .5, .16, mane, 0, 1.75 + i * .1, .65 + i * .12);
  rod(horse, [0, 1.4, -1.0], [.15, .55, -1.6], .12, mane);
  ball(horse, .1, M(0x4a4038), -.2, 2.14, 1.6);

  /* ── 面包师 / 井边少女 / 园丁 / 修士 / 孩子 ───── */
  const baker = person(-5, 3.6, 'baker', {
    coat: 0xf0e6d4, pants: 0x9c8a72, hair: 0xa88b68, hat: 'white', apron: 0xfaf3e6, belly: 1, s: 1.02, ry: .25,
  });
  cyl(baker.g, .32, .22, M(0xc7a276), .6, 1.0, .35, 12);
  for (let i = 0; i < 3; i++) ball(baker.g, .13, M(0xd9b274), .5 + i * .12, 1.15, .35, .6, .7);

  const girl = person(1.6, .4, 'girl', {
    coat: 0x8fa9c4, pants: 0xd8c8ae, hair: 0x9a7a52, skirt: 1, braids: 1, s: .9, ry: -1.2,
  });
  cyl(girl.g, .22, .3, M(0xa98a63), .6, .55, .2, 12);
  rod(girl.g, [.6, .7, .2], [.6, 1.5, .2], .025, M(0x8a7a62));

  const gardener = person(11, 8, 'gardener', {
    coat: 0x9c8a6c, pants: 0x7d725e, hair: 0xb0966f, hat: 'straw', s: .98, ry: 1.5,
  });
  cyl(gardener.g, .22, .34, M(0xb9a17e), .62, .75, .15, 12);
  rod(gardener.g, [.62, .9, .15], [1.15, 1.0, .35], .045, M(0xb9a17e));
  ball(gardener.g, .07, M(0xb9a17e), 1.18, 1.0, .35);

  const monk = person(-6.6, 1.4, 'monk', {
    coat: 0x8a755d, pants: 0x6f5f4c, hair: 0x9a8b76, hat: 'hood', s: .95, ry: .4,
  });
  for (let i = 0; i < 8; i++) {
    const a = i / 8 * TAU;
    ball(monk.g, .045, M(0xc4a878), Math.cos(a) * .42, 1.05, Math.sin(a) * .42);
  }

  const kids = [];
  [[3, -1, 0xe0a06f], [4.2, -1.8, 0x8fa9c4]].forEach(([kx, kz, col], i) => {
    const kid = person(kx, kz, 'children', {
      coat: col, pants: 0xece2cf, hair: 0xb58a5e, s: .62, wave: i === 0, ry: i ? -1.4 : 1.2,
    });
    kids.push({ g: kid.g, x: kx, z: kz, p: i * 2.1 });
  });

  /* ── 书房抄书人（剖面可见） ───────────────────── */
  const scribe = group(G, 1.35, L.ground + 6.95, -8.0); mark(scribe, 'scribe');
  scribe.rotation.y = -2.5;
  const robe = M(0x8f7f8e);
  cone(scribe, .52, 1.05, robe, 0, .55, 0, 12);
  ball(scribe, .34, M(0xf4ddc2), 0, 1.32, 0);
  ball(scribe, .36, M(0x9a8b76), 0, 1.5, -.04, .5, 1);
  for (const sx of [-.12, .12]) ball(scribe, .04, M(0x4a4038), sx, 1.33, .3);
  for (const sx of [-.45, .45]) rod(scribe, [sx, .9, .05], [sx * 1.15, .62, .45], .09, robe);
  box(scribe, .7, .05, .5, M(0xf0e6d0), 0, .64, .5);
  rod(scribe, [.2, .7, .5], [.35, 1.0, .35], .025, M(0x5d5144));
  const sl = halo(scribe, 0xffd9a0, 2.2, -.5, 1.1, .5, .35);
  lanterns.push(sl);

  return {
    update(t) {
      anims.forEach(a => {
        if (a.k === 'breathe') a.o.scale.y = 1 + Math.sin(t * 1.5 + a.p) * .012;
        else if (a.k === 'scarf') a.o.rotation.z = Math.sin(t * 1.9 + a.p) * .12;
        else if (a.k === 'tail') a.o.rotation.y = Math.sin(t * 1.1 + a.p) * .35;
      });
      kids.forEach((k, i) => {
        const a = t * .28 + k.p;
        k.g.position.x = 3.1 + Math.cos(a) * 1.05;
        k.g.position.z = -1.4 + Math.sin(a) * .75;
        k.g.rotation.y = -a + Math.PI / 2;
        k.g.position.y = groundY(k.g.position.x, k.g.position.z) + .12 + Math.abs(Math.sin(t * 4 + i)) * .12;
      });
      lanterns.forEach((h, i) => { h.material.opacity = .5 + Math.sin(t * 2.3 + i * 1.7) * .16; });
    },
    setNight(n) { lanterns.forEach(h => { h.userData.n = n; }); },
  };
}
