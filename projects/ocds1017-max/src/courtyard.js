import * as THREE from 'three';
import {
  P, rnd, onFrame, gradientMap, box, sphere, cyl, cone, toon, basic,
  disc, glowSprite, makeStar, starShape, clothBanner, bannerTexture,
} from './utils.js';
import { terrainHeight } from './terrain.js';

function lantern(parent, x, y, z, s = 1) {
  const g = new THREE.Group();
  g.position.set(x, y, z);
  parent.add(g);
  cyl(g, 0.07 * s, 0.1 * s, 1.45 * s, P.iron, 0, 0.72 * s, 0, { segments: 6 });
  box(g, 0.42 * s, 0.06 * s, 0.42 * s, P.iron, 0, 1.43 * s, 0);
  const lamp = new THREE.Group();
  lamp.position.y = 1.6 * s;
  g.add(lamp);
  box(lamp, 0.3 * s, 0.38 * s, 0.3 * s, 0xffe0a2, 0, 0, 0, {
    matOpts: { transparent: true, opacity: 0.85, toneMapped: false },
    cast: false,
  });
  box(lamp, 0.34 * s, 0.04 * s, 0.34 * s, P.iron, 0, 0.21 * s, 0);
  box(lamp, 0.34 * s, 0.04 * s, 0.34 * s, P.iron, 0, -0.21 * s, 0);
  for (const sx of [-1, 1]) {
    box(lamp, 0.035 * s, 0.4 * s, 0.035 * s, P.iron, sx * 0.15 * s, 0, 0.15 * s);
    box(lamp, 0.035 * s, 0.4 * s, 0.035 * s, P.iron, sx * 0.15 * s, 0, -0.15 * s);
  }
  glowSprite(lamp, 0xffc37a, 2.2 * s, 0, 0, 0, 0.5);
  return g;
}

function waterDisc(parent, r, y) {
  const mat = new THREE.MeshPhysicalMaterial({
    color: 0x88c7d3, transparent: true, opacity: 0.8, roughness: 0.12,
    metalness: 0.0, clearcoat: 1, clearcoatRoughness: 0.18,
  });
  const m = new THREE.Mesh(new THREE.CircleGeometry(r, 32), mat);
  m.rotation.x = -Math.PI / 2;
  m.position.y = y;
  m.receiveShadow = true;
  parent.add(m);
  return m;
}

function buildFountain(parent) {
  const g = new THREE.Group();
  g.position.set(1.35, 0.05, 2.45);
  parent.add(g);
  cyl(g, 1.02, 1.08, 0.3, P.stoneDim, 0, 0.15, 0, { segments: 8 });
  const rim = new THREE.Mesh(new THREE.TorusGeometry(0.98, 0.14, 6, 28), toon(P.stoneLight));
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.32;
  rim.castShadow = true;
  g.add(rim);
  waterDisc(g, 0.9, 0.36);
  cyl(g, 0.18, 0.28, 0.8, P.stone, 0, 0.72, 0, { segments: 10 });
  cyl(g, 0.48, 0.36, 0.14, P.stoneLight, 0, 1.13, 0, { segments: 12 });
  cyl(g, 0.95, 0.86, 0.045, P.stoneDim, 0, 1.03, 0, { segments: 24 });
  cyl(g, 0.13, 0.16, 0.4, P.stone, 0, 1.38, 0, { segments: 8 });
  cyl(g, 0.28, 0.2, 0.1, P.stoneLight, 0, 1.62, 0, { segments: 12 });
  waterDisc(g, 0.24, 1.68);
  sphere(g, 0.11, P.gold, 0, 1.79, 0);
  cone(g, 0.045, 0.26, P.stoneLight, 0, 1.9, 0, { segments: 6 });
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    const petals = rnd(0, 3);
    for (let k = 0; k < 2; k++) {
      const pr = rnd(0.4, 0.82);
      const pa = a + rnd(-0.2, 0.2);
      disc(g, rnd(0.045, 0.08), k ? P.cream : P.rose, Math.cos(pa) * pr, 0.375, Math.sin(pa) * pr, {
        segments: 6, cast: false, receive: false,
      });
    }
  }
  const drops = new THREE.Group();
  g.add(drops);
  const N = 44;
  const seeds = [];
  const positions = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    seeds.push({ a: rnd(0, Math.PI * 2), off: rnd(0, 1), speed: rnd(0.5, 0.9) });
  }
  const pointsGeo = new THREE.BufferGeometry();
  pointsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const pointsMat = new THREE.PointsMaterial({
    color: 0xdff9fb, size: 0.045, transparent: true, opacity: 0.8,
    depthWrite: false, sizeAttenuation: true, toneMapped: false,
  });
  const points = new THREE.Points(pointsGeo, pointsMat);
  drops.add(points);
  const rippleMats = [];
  const ripples = [];
  for (let i = 0; i < 3; i++) {
    const mat = new THREE.MeshBasicMaterial({ color: 0xd9f5f7, transparent: true, opacity: 0.25, side: THREE.DoubleSide, depthWrite: false });
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.94, 0.98, 32), mat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.375;
    g.add(ring);
    ripples.push(ring);
    rippleMats.push(mat);
  }
  onFrame((t) => {
    const arr = pointsGeo.attributes.position.array;
    for (let i = 0; i < N; i++) {
      const s = seeds[i];
      const ph = (t * s.speed + s.off) % 1;
      const a = s.a + ph * 0.35;
      const r = 0.12 + ph * 0.72;
      arr[i * 3] = Math.cos(a) * r;
      arr[i * 3 + 1] = 1.63 + Math.sin(ph * Math.PI) * 0.28 - ph * 1.24;
      arr[i * 3 + 2] = Math.sin(a) * r;
    }
    pointsGeo.attributes.position.needsUpdate = true;
    for (let i = 0; i < 3; i++) {
      const ph = (t * 0.24 + i / 3) % 1;
      ripples[i].scale.setScalar(0.35 + ph * 0.9);
      rippleMats[i].opacity = (1 - ph) * 0.2;
    }
  });
  glowSprite(g, 0xc8f2f4, 2.2, 0, 1.0, 0, 0.22);
  return g;
}

function buildWell(parent) {
  const g = new THREE.Group();
  g.position.set(-3.55, 0, 2.65);
  parent.add(g);
  const stone = new THREE.Mesh(
    new THREE.CylinderGeometry(0.62, 0.68, 0.8, 14, 1, true),
    new THREE.MeshToonMaterial({ color: P.stoneDim, gradientMap: gradientMap(), side: THREE.DoubleSide })
  );
  stone.position.y = 0.4;
  stone.castShadow = true;
  stone.receiveShadow = true;
  g.add(stone);
  const rim = new THREE.Mesh(new THREE.TorusGeometry(0.61, 0.09, 6, 20), toon(P.stoneLight));
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.8;
  g.add(rim);
  disc(g, 0.56, 0x36575e, 0, 0.58, 0, { cast: false });
  for (const sx of [-1, 1]) {
    box(g, 0.1, 1.7, 0.1, P.woodDark, sx * 0.65, 1.35, 0);
  }
  box(g, 1.6, 0.1, 0.12, P.woodDark, 0, 2.17, 0);
  const roof = cone(g, 1.15, 0.65, P.roofRose, 0, 2.5, 0, { segments: 4, rot: [0, Math.PI / 4, 0] });
  roof.scale.z = 0.5;
  cyl(g, 0.06, 0.06, 0.95, P.wood, 0, 1.72, 0, { segments: 6, rot: [0, 0, Math.PI / 2] });
  cyl(g, 0.012, 0.012, 0.9, P.wood, 0.15, 1.3, 0, { segments: 4, cast: false });
  cyl(g, 0.13, 0.1, 0.2, P.woodLight, 0.15, 0.9, 0, { segments: 8 });
  cyl(g, 0.045, 0.045, 0.22, P.iron, 0.65, 1.85, 0.08, { segments: 6, rot: [Math.PI / 2, 0, 0] });
  box(g, 0.35, 0.05, 0.05, P.iron, 0.8, 1.85, 0.08);
  return g;
}

function buildLaundry(parent) {
  const g = new THREE.Group();
  parent.add(g);
  const p1 = new THREE.Vector3(2.3, 2.6, 1.0);
  const p2 = new THREE.Vector3(5.25, 2.6, 2.8);
  const mid = new THREE.Vector3((p1.x + p2.x) / 2, 2.35, (p1.z + p2.z) / 2);
  const curve = new THREE.CatmullRomCurve3([p1, mid, p2]);
  const line = new THREE.Mesh(new THREE.TubeGeometry(curve, 16, 0.012, 4, false), toon(0xd7cdb9));
  g.add(line);
  const clothData = [
    { t: 0.24, w: 0.55, h: 0.7, color: 0xf4e6d2, rot: 0.1 },
    { t: 0.45, w: 0.42, h: 0.55, color: 0xb9cede, rot: -0.05 },
    { t: 0.66, w: 0.6, h: 0.62, color: 0xf0d7d3, rot: 0.08 },
  ];
  for (const c of clothData) {
    const pt = curve.getPoint(c.t);
    const geo = new THREE.PlaneGeometry(c.w, c.h, 4, 6);
    geo.translate(0, -c.h / 2, 0);
    const mat = new THREE.MeshToonMaterial({
      color: c.color, gradientMap: gradientMap(), side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.copy(pt);
    mesh.rotation.y = 0.6 + c.rot;
    mesh.castShadow = true;
    g.add(mesh);
    const base = geo.attributes.position.array.slice();
    const phase = rnd(0, 6);
    onFrame((t) => {
      const arr = geo.attributes.position.array;
      for (let i = 0; i < arr.length; i += 3) {
        const y = base[i + 1];
        arr[i + 2] = Math.sin(t * 1.8 + phase + y * 4) * 0.035 * Math.min(1, -y / c.h + 0.2);
      }
      geo.attributes.position.needsUpdate = true;
    });
    for (const sx of [-1, 1]) {
      box(g, 0.015, 0.05, 0.015, P.woodDark, pt.x + sx * c.w * 0.3, pt.y + 0.025, pt.z, { cast: false });
    }
  }
}

function buildCourtyardProps(castle) {
  const props = new THREE.Group();
  castle.add(props);

  const drum = cyl(props, 0.34, 0.34, 0.55, P.woodLight, -4.55, 0.28, 0.35, { segments: 12 });
  for (const sy of [-0.18, 0.18]) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.03, 5, 16), toon(P.iron));
    ring.rotation.x = Math.PI / 2;
    ring.position.set(-4.55, 0.28 + sy, 0.35);
    props.add(ring);
  }
  const drum2 = cyl(props, 0.28, 0.28, 0.45, P.wood, -4.1, 0.23, -0.25, { segments: 12 });
  for (const sy of [-0.14, 0.14]) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.025, 5, 14), toon(P.iron));
    ring.rotation.x = Math.PI / 2;
    ring.position.set(-4.1, 0.23 + sy, -0.25);
    props.add(ring);
  }
  const crate = box(props, 0.7, 0.7, 0.7, P.woodLight, 4.2, 0.35, 1.2);
  for (const s of [-1, 1]) {
    box(props, 0.75, 0.08, 0.06, P.woodDark, 4.2, 0.35 + s * 0.28, 1.56);
    box(props, 0.06, 0.08, 0.75, P.woodDark, 4.2 + s * 0.32, 0.35, 1.2);
  }
  box(props, 0.55, 0.55, 0.55, P.wood, 4.35, 0.28, 0.5);
  const sack = sphere(props, 0.32, 0xd9c7a8, 4.0, 0.32, 2.0, { scale: [1, 0.8, 0.8] });
  sphere(props, 0.25, 0xd4c2a2, 4.35, 0.26, 2.15, { scale: [1, 0.8, 0.8] });
  for (const [x, z] of [[-4.7, 1.4], [-4.1, 1.5], [4.9, 2.9]]) {
    sphere(props, 0.14, 0xb7a17c, x, 0.16, z, { scale: [1.2, 0.8, 1], low: true });
  }

  lantern(props, -2.5, 0.05, 3.35, 1.0);
  lantern(props, 3.55, 0.05, 3.35, 1.0);
  lantern(props, 4.85, 0.05, -0.9, 0.9);

  box(props, 1.7, 0.1, 0.42, P.wood, -4.35, 0.5, -2.1);
  box(props, 0.4, 0.5, 0.36, P.stoneDim, -5.05, 0.25, -2.1);
  box(props, 0.4, 0.5, 0.36, P.stoneDim, -3.65, 0.25, -2.1);

  const banner = clothBanner(props, bannerTexture('rose'), 0.52, 1.2, [5.18, 2.6, 3.1], -Math.PI / 2, { amp: 0.04 });
  box(props, 0.04, 0.04, 0.55, P.woodDark, 5.18, 2.61, 3.1);

  for (let i = 0; i < 3; i++) {
    const x = 3.4 + i * 0.62;
    sphere(props, 0.13, i % 2 ? P.leaf : P.leafLight, x, 0.16, 3.55, { low: true });
    sphere(props, 0.05, P.rose, x + 0.05, 0.26, 3.6, { low: true });
  }

  return props;
}

function buildTerrace(castle) {
  const g = new THREE.Group();
  castle.add(g);
  const gy = 0.02;

  const plate = disc(g, 2.55, P.stoneDim, 0, gy + 0.005, 5.7, { segments: 40, cast: false });
  const ring1 = new THREE.Mesh(new THREE.RingGeometry(2.32, 2.48, 48), toon(P.stoneLight));
  ring1.rotation.x = -Math.PI / 2;
  ring1.position.set(0, gy + 0.02, 5.7);
  g.add(ring1);
  const ring2 = new THREE.Mesh(new THREE.RingGeometry(1.42, 1.48, 48), toon(P.stoneLight));
  ring2.rotation.x = -Math.PI / 2;
  ring2.position.set(0, gy + 0.02, 5.7);
  g.add(ring2);
  const star = makeStar(g, 0.9, 0xdfc9a7, 0, gy + 0.025, 5.7, 0, { rotZ: 0 });
  star.rotation.x = -Math.PI / 2;
  star.rotation.z = 0.2;

  for (const sx of [-1, 1]) {
    const pole = new THREE.Group();
    pole.position.set(sx * 3.0, 0, 7.28);
    g.add(pole);
    cyl(pole, 0.045, 0.06, 4.8, P.woodDark, 0, 2.4, 0, { segments: 6 });
    sphere(pole, 0.09, P.gold, 0, 4.84, 0);
    const flag = clothBanner(pole, bannerTexture(sx < 0 ? 'blue' : 'rose'), 0.62, 1.5, [0, 4.72, 0.02], 0.5, { amp: 0.04 });
  }

  const stall = new THREE.Group();
  stall.position.set(3.55, 0, 6.15);
  stall.rotation.y = -0.25;
  g.add(stall);
  box(stall, 1.7, 0.09, 0.78, P.woodLight, 0, 0.86, 0);
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      box(stall, 0.08, 0.86, 0.08, P.woodDark, sx * 0.76, 0.43, sz * 0.31);
      cyl(stall, 0.04, 0.05, 1.75, P.woodDark, sx * 0.76, 1.72, sz * 0.31, { segments: 5 });
    }
  }
  for (let i = 0; i < 5; i++) {
    const stripe = box(stall, 0.34, 0.04, 1.0, i % 2 ? P.cream : P.roofRose, -0.68 + i * 0.34, 2.58, 0, {
      rot: [0.13, 0, 0],
    });
  }
  for (const sx of [-1, 1]) {
    box(stall, 0.02, 0.55, 1.0, P.cream, sx * 0.86, 2.26, 0, { rot: [0.13, 0, 0], cast: false });
  }
  for (let i = 0; i < 3; i++) {
    box(stall, 0.46, 0.3, 0.36, P.woodLight, -0.5 + i * 0.52, 1.05, -0.02);
    for (let k = 0; k < 4; k++) {
      const colors = [P.rose, P.butter, P.lavender, P.cream];
      sphere(stall, 0.06, colors[(i + k) % 4], -0.5 + i * 0.52 + rnd(-0.12, 0.12), 1.25, rnd(-0.08, 0.08), { low: true });
      cyl(stall, 0.01, 0.01, 0.22, P.leafDeep, -0.5 + i * 0.52, 1.13, 0, { segments: 3, cast: false });
    }
  }
  cyl(stall, 0.11, 0.13, 0.25, P.stoneDark, 0.68, 0.98, 0.18, { segments: 8 });
  const flowers = [P.rose, P.butter, P.lavender];
  for (let i = 0; i < 6; i++) {
    sphere(stall, 0.055, flowers[i % 3], 0.68 + rnd(-0.1, 0.1), 1.18, 0.18 + rnd(-0.1, 0.1), { low: true });
  }
  const awningPole = cyl(stall, 0.03, 0.04, 1.1, P.wood, 0.9, 2.05, 0.42, { segments: 5 });

  const bench = new THREE.Group();
  bench.position.set(-4.85, 0, 6.35);
  bench.rotation.y = Math.PI / 2;
  g.add(bench);
  box(bench, 1.55, 0.12, 0.5, P.wood, 0, 0.55, 0);
  box(bench, 1.55, 0.55, 0.1, P.wood, 0, 0.85, -0.2, { rot: [-0.12, 0, 0] });
  for (const sx of [-1, 1]) {
    box(bench, 0.12, 0.55, 0.45, P.woodDark, sx * 0.65, 0.27, 0);
    box(bench, 0.08, 0.6, 0.4, P.stoneDim, sx * 0.65, 0.85, -0.22);
  }

  for (const sx of [-1, 1]) {
    const pot = new THREE.Group();
    pot.position.set(sx * 3.55, 0, 8.25);
    g.add(pot);
    cyl(pot, 0.44, 0.33, 0.55, P.stone, 0, 0.275, 0, { segments: 12 });
    box(pot, 0.9, 0.1, 0.9, P.stoneLight, 0, 0.56, 0);
    sphere(pot, 0.48, P.leafDeep, 0, 1.02, 0, { scale: [1, 1.1, 1] });
    sphere(pot, 0.3, P.leaf, 0.18, 1.28, 0.1, { low: true });
    sphere(pot, 0.22, P.leafLight, -0.25, 1.17, -0.15, { low: true });
    for (let i = 0; i < 4; i++) {
      sphere(pot, 0.04, P.rose, rnd(-0.35, 0.35), rnd(1.05, 1.3), rnd(-0.35, 0.35), { low: true });
    }
  }

  const cart = new THREE.Group();
  cart.position.set(-6.5, 0, 4.65);
  cart.rotation.y = 0.8;
  g.add(cart);
  box(cart, 1.1, 0.18, 0.65, P.woodLight, 0, 0.55, 0);
  for (const sx of [-1, 1]) {
    box(cart, 0.06, 0.35, 0.65, P.wood, sx * 0.52, 0.78, 0);
    const wheel = new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.055, 6, 16), toon(P.woodDark));
    wheel.position.set(sx * 0.62, 0.38, 0.12);
    wheel.rotation.y = Math.PI / 2;
    wheel.castShadow = true;
    cart.add(wheel);
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI;
      box(cart, 0.02, 0.02, 0.65, P.wood, sx * 0.62, 0.38, 0.12, { rot: [a, 0, 0], cast: false });
    }
  }
  box(cart, 0.06, 0.06, 1.1, P.wood, 0.42, 0.62, 0.82, { rot: [-0.25, 0, 0] });
  box(cart, 0.22, 0.52, 0.42, P.woodLight, -0.22, 0.86, 0.08);
  box(cart, 0.22, 0.52, 0.42, P.wood, 0.28, 0.86, -0.1);

  for (let i = 0; i < 5; i++) {
    const x = -1.1 + i * 0.55;
    const flowerBox = box(g, 0.5, 0.34, 0.32, P.wood, x, 0.47, 8.6);
    for (let k = 0; k < 3; k++) {
      sphere(g, 0.05, [P.rose, P.butter, P.lavender][k], x - 0.15 + k * 0.15, 0.66, 8.6 + rnd(-0.06, 0.06), { low: true });
    }
  }
  return g;
}

function buildStable(island) {
  const x = -8.7;
  const z = 3.0;
  const baseY = terrainHeight(x, z) + 0.02;
  const g = new THREE.Group();
  g.position.set(x, baseY, z);
  g.rotation.y = 0.72;
  island.add(g);
  box(g, 3.0, 0.18, 2.1, P.stoneDim, 0, 0.09, 0);
  box(g, 3.0, 2.1, 0.18, P.wood, 0, 1.05, -1.0);
  for (const sx of [-1, 1]) {
    box(g, 0.18, 2.2, 2.1, P.wood, sx * 1.48, 1.1, 0);
  }
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      box(g, 0.16, 2.3, 0.16, P.woodDark, sx * 1.42, 1.15, sz * 0.92);
    }
  }
  box(g, 2.9, 0.18, 0.18, P.woodDark, 0, 2.2, 0.98);
  const slope = 0.6;
  for (const sx of [-1, 1]) {
    box(g, 1.8, 0.12, 2.5, P.stoneLight, sx * 0.7, 2.58, 0, {
      rot: [0, 0, -sx * slope],
    });
  }
  for (let i = 0; i < 6; i++) {
    box(g, 0.24, 0.08, 2.45, i % 2 ? P.butter : 0xd8bd87, -1.35 + i * 0.55, 2.35, 0.02, {
      rot: [0, 0, 0],
    });
  }
  box(g, 0.2, 0.2, 2.5, P.woodDark, 0, 2.95, 0);
  box(g, 0.5, 0.5, 0.8, P.woodLight, -0.55, 0.45, 0.35);
  box(g, 0.5, 0.45, 0.8, P.wood, 0.25, 0.42, 0.2);
  for (let i = 0; i < 8; i++) {
    box(g, 0.6, 0.04, 0.08, P.butter, rnd(-1.2, 1.2), 0.18, rnd(-0.7, 0.85), { rot: [rnd(-0.2, 0.2), rnd(0, 3), 0], cast: false });
  }
  const trough = box(g, 0.85, 0.28, 0.34, P.woodDark, 0.95, 0.28, 0.3);
  waterDisc(g, 0.3, 0.36).position.set(0.95, 0.36, 0.3);
  for (let i = 0; i < 7; i++) {
    const px = -2.4 + i * 0.7;
    box(g, 0.09, 0.9, 0.09, P.wood, px, 0.45, 1.55);
    box(g, 0.09, 0.9, 0.09, P.wood, px, 0.7, 0.85);
    if (i < 6) {
      box(g, 0.7, 0.08, 0.07, P.woodLight, px + 0.35, 0.62, 1.55);
      box(g, 0.7, 0.07, 0.06, P.woodLight, px + 0.35, 0.9, 0.85);
    }
  }
  return g;
}

export function buildCourtyard(castle, island) {
  buildFountain(castle);
  buildWell(castle);
  buildLaundry(castle);
  buildCourtyardProps(castle);
  buildTerrace(castle);
  buildStable(island);
  return {};
}
