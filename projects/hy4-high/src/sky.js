/* 环境：星空、日月、云海、邻近小行星、萤火、飞鸟、岛底星尘 */
import * as T from '../vendor/three.module.js';
import {
  COL, GEO, M, B, MU, TAU, rand, put, box, cyl, cone, ball, quad,
  group, halo, glowTexture, rod,
} from './palette.js';

export function buildSky(scene) {
  const G = group(scene);
  const state = { night: 0 };
  const clouds = [], planets = [], birds = [];

  /* 星空：两层点，夜色里缓慢明灭 */
  function starLayer(count, size, opacity, radiusMin, radiusMax) {
    const pos = [], col = [];
    const tint = [0xfff6dc, 0xdfe8ff, 0xffe3c4, 0xffffff];
    for (let i = 0; i < count; i++) {
      const a = rand() * TAU;
      const u = rand() * 1.7 - .35;
      const r = radiusMin + rand() * (radiusMax - radiusMin);
      const s = Math.sqrt(Math.max(0, 1 - u * u));
      pos.push(Math.cos(a) * s * r, u * r + 30, Math.sin(a) * s * r);
      const cc = new T.Color(tint[Math.floor(rand() * tint.length)]);
      col.push(cc.r, cc.g, cc.b);
    }
    const g = new T.BufferGeometry();
    g.setAttribute('position', new T.Float32BufferAttribute(pos, 3));
    g.setAttribute('color', new T.Float32BufferAttribute(col, 3));
    const m = new T.PointsMaterial({
      size, sizeAttenuation: false, map: glowTexture(), vertexColors: true,
      transparent: true, opacity, depthWrite: false, blending: T.AdditiveBlending, fog: false,
    });
    const p = new T.Points(g, m); p.frustumCulled = false;
    G.add(p);
    return p;
  }
  const smallStars = starLayer(760, 2.0, .1, 130, 300);
  const brightStars = starLayer(110, 4.6, .12, 120, 260);

  /* 日月 */
  const moon = group(G, -78, 66, -128);
  const moonMat = B(0xfff2cc, { transparent: true, opacity: 0, fog: false });
  ball(moon, 4.3, moonMat, 0, 0, 0);
  const moonHalo = halo(moon, 0xffefc4, 44, 0, 0, 0, 0);
  const moonHalo2 = halo(moon, 0xffe6b8, 18, 0, 0, 0, 0);
  const sun = group(G, -118, 15, -92);
  const sunMat = B(0xffd9a0, { transparent: true, opacity: 1, fog: false });
  ball(sun, 6.6, sunMat, 0, 0, 0);
  const sunHalo = halo(sun, 0xffcb8c, 78, 0, 0, 0, .55);
  const sunHalo2 = halo(sun, 0xffe1ae, 30, 0, 0, 0, .4);

  /* 云：近处几团厚些，岛底一圈薄云海 */
  const cloudMat = MU(0xfffaf0, { transparent: true, opacity: .58, depthWrite: false });
  function cloud(x, y, z, s, seed) {
    const g = group(G, x, y, z);
    for (let i = 0; i < 5; i++) {
      const r = (1.4 + rand() * 1.5) * s;
      ball(g, r, cloudMat, (i - 2) * 1.6 * s + (rand() - .5) * s, (rand() - .5) * .8 * s,
        (rand() - .5) * 1.4 * s, .42 + rand() * .18, .75);
    }
    g.userData = { x0: x, y0: y, z, s, phase: seed, speed: .22 + rand() * .22 };
    clouds.push(g);
    return g;
  }
  for (let i = 0; i < 9; i++) {
    const a = i / 9 * TAU + .3;
    cloud(Math.cos(a) * (36 + rand() * 22), -2 + rand() * 6, Math.sin(a) * (36 + rand() * 22),
      .8 + rand() * .85, i * 1.7);
  }
  for (let i = 0; i < 12; i++) {
    const a = i / 12 * TAU;
    cloud(Math.cos(a) * (14 + rand() * 14), -20 - rand() * 8, Math.sin(a) * (14 + rand() * 14),
      .7 + rand() * .8, i * 2.3);
  }

  /* 邻近的小行星 */
  function planet(x, y, z, r, color, ring) {
    const g = group(G, x, y, z);
    ball(g, r, MU(color, { flatShading: true, fog: false }), 0, 0, 0);
    if (ring) {
      const rr = new T.Mesh(new T.TorusGeometry(r * 1.8, r * .09, 6, 40), MU(0xe3cfae, { side: T.DoubleSide, fog: false }));
      rr.rotation.x = 1.15; rr.rotation.y = .3; g.add(rr);
    }
    // 其中一颗上有一棵迷你猴面包树
    if (ring) {
      cyl(g, .12, 1.0, MU(0x8a7257, { fog: false }), 0, r + .4, 0, 8);
      ball(g, .7, MU(0x8ba87e, { fog: false }), 0, r + 1.0, 0, .4, 1);
    }
    g.userData.spin = .04 + rand() * .05;
    planets.push(g);
  }
  planet(-64, 40, -96, 3.2, 0xc78b7b, false);
  planet(58, 52, -112, 4.0, 0xb9a6c4, true);
  planet(96, 24, -70, 2.2, 0xd8bd8c, false);

  /* 萤火：贴着岛面游动 */
  const ffN = 110, ffPos = new Float32Array(ffN * 3), ffBase = [];
  for (let i = 0; i < ffN; i++) {
    const a = rand() * TAU, r = 5 + Math.sqrt(rand()) * 19;
    const x = Math.cos(a) * r, z = Math.sin(a) * r, y = 1.5 + rand() * 3.6;
    ffBase.push({ x, y, z, p: rand() * TAU, sp: .4 + rand() * .8 });
    ffPos[i * 3] = x; ffPos[i * 3 + 1] = y; ffPos[i * 3 + 2] = z;
  }
  const ffGeo = new T.BufferGeometry();
  ffGeo.setAttribute('position', new T.BufferAttribute(ffPos, 3));
  const ffMat = new T.PointsMaterial({
    size: 5.5, sizeAttenuation: false, map: glowTexture(), color: 0xffe6a4,
    transparent: true, opacity: .1, depthWrite: false, blending: T.AdditiveBlending, fog: false,
  });
  const fireflies = new T.Points(ffGeo, ffMat); fireflies.frustumCulled = false; G.add(fireflies);

  /* 岛底星尘：缓慢绕圈上升 */
  const dustN = 170, dustPos = new Float32Array(dustN * 3), dustBase = [];
  for (let i = 0; i < dustN; i++) {
    const a = rand() * TAU, r = 6 + rand() * 24, y = -30 + rand() * 24;
    dustBase.push({ a, r, y, sp: .06 + rand() * .12, p: rand() * TAU });
    dustPos[i * 3] = Math.cos(a) * r; dustPos[i * 3 + 1] = y; dustPos[i * 3 + 2] = Math.sin(a) * r;
  }
  const dustGeo = new T.BufferGeometry();
  dustGeo.setAttribute('position', new T.BufferAttribute(dustPos, 3));
  const dustMat = new T.PointsMaterial({
    size: 2.6, sizeAttenuation: false, map: glowTexture(), color: 0xffe4b8,
    transparent: true, opacity: .5, depthWrite: false, blending: T.AdditiveBlending, fog: false,
  });
  const dust = new T.Points(dustGeo, dustMat); dust.frustumCulled = false; G.add(dust);

  /* 飞鸟：三只，绕塔盘旋 */
  for (let i = 0; i < 3; i++) {
    const b = group(G);
    const wingMat = M(0x6b5a49);
    for (const s of [-1, 1]) {
      const w = box(b, .85, .055, .14, wingMat, s * .42, 0, 0);
      w.rotation.z = s * .28;
      b.userData['w' + s] = w;
    }
    b.userData.p = i * 2.1;
    birds.push(b);
  }

  /* 岛底一圈淡金光环 */
  const ringGeo = new T.BufferGeometry();
  const ringPos = [];
  for (let i = 0; i < 260; i++) {
    const a = i / 260 * TAU;
    ringPos.push(Math.cos(a) * (27 + rand() * 2.5), -13 + (rand() - .5) * 3, Math.sin(a) * (27 + rand() * 2.5));
  }
  ringGeo.setAttribute('position', new T.Float32BufferAttribute(ringPos, 3));
  const ringMat = new T.PointsMaterial({
    size: 2.4, sizeAttenuation: false, map: glowTexture(), color: 0xffe0ae,
    transparent: true, opacity: .38, depthWrite: false, blending: T.AdditiveBlending, fog: false,
  });
  const ring = new T.Points(ringGeo, ringMat); G.add(ring);

  return {
    setNight(n) {
      state.night = n;
      smallStars.material.opacity = .06 + n * .82;
      brightStars.material.opacity = .04 + n * .92;
      moonMat.opacity = n * .95;
      moonHalo.material.opacity = n * .5;
      moonHalo2.material.opacity = n * .45;
      sunMat.opacity = 1 - n * .92;
      sunHalo.material.opacity = (1 - n) * .5;
      sunHalo2.material.opacity = (1 - n) * .45;
      ffMat.opacity = .06 + n * .8;
      cloudMat.opacity = .58 - n * .16;
      cloudMat.color.setHex(n > .5 ? 0xe6e6f2 : 0xfffaf0);
      dustMat.opacity = .28 + n * .35;
    },
    update(t, dt) {
      smallStars.material.opacity = (.06 + state.night * .82) * (.9 + Math.sin(t * .7) * .1);
      brightStars.rotation.y = t * .0015;
      clouds.forEach(g => {
        const u = g.userData;
        g.position.x = u.x0 + Math.sin(t * u.speed * .18 + u.phase) * 7;
        g.position.y = u.y0 + Math.sin(t * .32 + u.phase) * .5;
      });
      planets.forEach((g, i) => { g.rotation.y += g.userData.spin * dt; g.position.y += Math.sin(t * .3 + i) * .004; });
      // 萤火
      const fp = ffGeo.attributes.position.array;
      ffBase.forEach((f, i) => {
        fp[i * 3] = f.x + Math.sin(t * f.sp + f.p) * 1.5;
        fp[i * 3 + 1] = f.y + Math.sin(t * f.sp * 1.4 + f.p) * .65;
        fp[i * 3 + 2] = f.z + Math.cos(t * f.sp * .8 + f.p) * 1.5;
      });
      ffGeo.attributes.position.needsUpdate = true;
      // 星尘
      const dp = dustGeo.attributes.position.array;
      dustBase.forEach((d, i) => {
        const a = d.a + t * d.sp;
        dp[i * 3] = Math.cos(a) * d.r;
        dp[i * 3 + 1] = d.y + Math.sin(t * .35 + d.p) * 1.2;
        dp[i * 3 + 2] = Math.sin(a) * d.r;
      });
      dustGeo.attributes.position.needsUpdate = true;
      ring.rotation.y = t * .02;
      // 飞鸟
      birds.forEach((b, i) => {
        const a = t * .13 + b.userData.p;
        b.position.set(Math.cos(a) * 19, 13 + Math.sin(t * .5 + i) * 1.6, Math.sin(a) * 19 - 5);
        b.rotation.y = -a + Math.PI / 2;
        const flap = Math.sin(t * 3.2 + i) * .3;
        b.userData.w1.rotation.z = .28 + flap;
        b.userData['w-1'].rotation.z = -.28 - flap;
        b.scale.setScalar(.85 + i * .1);
      });
    },
  };
}
