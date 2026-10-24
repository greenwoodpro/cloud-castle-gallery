import * as THREE from 'three';
import {
  P, rnd, LAYOUT, gradientMap,
  box, sphere, cone, cyl, disc, toon,
  archShape, archedWindow, archedDoorway, glowSprite, clothBanner,
  bannerTexture, roseWindowTexture, cobbleTexture, pennant, addMesh,
  makeStar,
} from './utils.js';
import { terrainHeight } from './terrain.js';

function buildPlatform(parent) {
  const g = new THREE.Group();
  g.position.set(LAYOUT.platform.x, LAYOUT.platform.y, LAYOUT.platform.z);
  parent.add(g);

  const profile = [
    [8.95, 0.0], [8.9, -0.35], [8.75, -0.8], [8.55, -1.35],
    [8.25, -2.0], [7.8, -2.7], [7.2, -3.4], [6.6, -3.9], [6.1, -4.2],
  ];
  const geo = new THREE.LatheGeometry(profile.map(([r, y]) => new THREE.Vector2(r, y)), 88);
  const pos = geo.attributes.position;
  const palette = [new THREE.Color(P.stoneDim), new THREE.Color(P.stoneDark), new THREE.Color(0xcdb396)];
  const colors = [];
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    const y = pos.getY(i);
    const a = Math.atan2(z, x);
    const wob = 1 + 0.012 * Math.sin(a * 5 + 1.2) + 0.007 * Math.sin(a * 11 + 0.3);
    pos.setX(i, x * wob);
    pos.setZ(i, z * wob);
    const c = palette[Math.abs(Math.floor((-y) / 0.9 + Math.sin(a * 3))) % palette.length].clone();
    c.offsetHSL(0, 0, (Math.sin(a * 7 + y) * 0.5) * 0.02);
    colors.push(c.r, c.g, c.b);
  }
  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  const rg = geo.toNonIndexed();
  rg.computeVertexNormals();
  const rockMat = new THREE.MeshToonMaterial({ vertexColors: true, gradientMap: gradientMap() });
  const rock = new THREE.Mesh(rg, rockMat);
  rock.castShadow = true;
  rock.receiveShadow = true;
  g.add(rock);

  const cobbleTex = cobbleTexture();
  const top = disc(g, 8.92, 0xffffff, 0, 0.04, 0, {
    matOpts: { map: cobbleTex, color: 0xffffff },
    receive: true,
    cast: false,
  });
  const rim = new THREE.Mesh(
    new THREE.RingGeometry(8.86, 9.05, 80),
    toon(P.stoneLight)
  );
  rim.rotation.x = -Math.PI / 2;
  rim.position.y = 0.06;
  rim.receiveShadow = true;
  g.add(rim);
  cyl(g, 9.02, 8.96, 0.24, P.stone, 0, -0.07, 0, { segments: 80, open: true });

  for (let i = 0; i < 14; i++) {
    const a = rnd(0, Math.PI * 2);
    const r = rnd(5.6, 8.5);
    const x = Math.cos(a) * r;
    const z = Math.sin(a) * r;
    const p = addMesh(
      g,
      new THREE.CircleGeometry(rnd(0.4, 1.2), 12),
      toon(P.grassDeep, { transparent: true, opacity: 0.55 }),
      [x, 0.055, z],
      { rot: [-Math.PI / 2, 0, rnd(0, 6)], cast: false, receive: false }
    );
    p.scale.set(1, rnd(0.4, 0.9), 1);
  }

  buildStairs(g);
  buildBalustrade(g);
  return g;
}

function lanternPost(parent, x, z, baseY, scale = 1) {
  const g = new THREE.Group();
  g.position.set(x, baseY, z);
  parent.add(g);
  cyl(g, 0.07 * scale, 0.1 * scale, 1.45 * scale, P.iron, 0, 0.72 * scale, 0, { segments: 6 });
  box(g, 0.42 * scale, 0.06 * scale, 0.42 * scale, P.iron, 0, 1.43 * scale, 0);
  const lamp = new THREE.Group();
  lamp.position.y = 1.6 * scale;
  g.add(lamp);
  box(lamp, 0.3 * scale, 0.38 * scale, 0.3 * scale, 0xffe0a2, 0, 0, 0, {
    matOpts: { transparent: true, opacity: 0.85, toneMapped: false },
    cast: false,
  });
  box(lamp, 0.34 * scale, 0.04 * scale, 0.34 * scale, P.iron, 0, 0.21 * scale, 0);
  box(lamp, 0.34 * scale, 0.04 * scale, 0.34 * scale, P.iron, 0, -0.21 * scale, 0);
  for (const sx of [-1, 1]) {
    box(lamp, 0.035 * scale, 0.4 * scale, 0.035 * scale, P.iron, sx * 0.15 * scale, 0, 0.15 * scale);
    box(lamp, 0.035 * scale, 0.4 * scale, 0.035 * scale, P.iron, sx * 0.15 * scale, 0, -0.15 * scale);
  }
  glowSprite(lamp, 0xffc37a, 2.1 * scale, 0, 0, 0, 0.55);
  return g;
}

function buildStairs(g) {
  const stepW = 3.0;
  const nSteps = 13;
  const rise = 0.18;
  const run = 0.36;
  const startZ = 8.85;
  for (let i = 0; i < nSteps; i++) {
    const topY = -0.02 - (i + 1) * rise;
    const z = startZ + i * run + run / 2;
    const h = topY + 4.4;
    box(g, stepW, h, run + 0.025, i % 2 ? P.stoneDim : P.stone, 0, topY - h / 2, z);
    box(g, stepW + 0.06, 0.035, run + 0.07, P.stoneLight, 0, topY + 0.018, z, { cast: false });
  }
  const slope = Math.atan2(rise, run);
  for (const sx of [-1, 1]) {
    const cheek = box(g, 0.34, 0.82, 5.6, P.stone, sx * 1.68, -1.24, 11.1, {
      rot: [slope, 0, 0],
    });
    box(g, 0.46, 0.12, 5.7, P.stoneLight, sx * 1.68, -0.78, 11.1, { rot: [slope, 0, 0] });
  }
  const bottomZ = startZ + nSteps * run;
  const gw = new THREE.Group();
  gw.position.set(0, 0, 0);
  g.add(gw);
  const wx = LAYOUT.platform.x;
  const wz = LAYOUT.platform.z + bottomZ;
  const groundY = terrainHeight(wx + 1.95, wz + 0.4) - LAYOUT.platform.y;
  lanternPost(g, 1.95, bottomZ + 0.45, groundY, 1.0);
  lanternPost(g, -1.95, bottomZ + 0.45, groundY, 1.0);
  const landing = box(g, 3.6, 0.28, 0.9, P.stoneDim, 0, (terrainHeight(wx, wz + 0.5) - LAYOUT.platform.y) + 0.02, bottomZ + 0.35);
  box(g, 3.9, 0.32, 0.32, P.stoneLight, 0, (terrainHeight(wx, wz + 0.5) - LAYOUT.platform.y) + 0.21, bottomZ + 0.78);
}

function buildBalustrade(g) {
  const R = 8.34;
  const postColor = P.stoneLight;
  const angles = [];
  for (let a = -1.36; a <= 1.361; a += 0.108) {
    if (Math.abs(a) < 0.205) continue;
    angles.push(a);
  }
  for (const a of angles) {
    const x = Math.sin(a) * R;
    const z = Math.cos(a) * R;
    box(g, 0.19, 0.72, 0.19, postColor, x, 0.46, z, { rot: [0, -a, 0] });
    sphere(g, 0.115, P.stone, x, 0.86, z, { low: true });
  }
  const railPairs = [];
  for (let i = 0; i < angles.length - 1; i++) {
    if (angles[i + 1] - angles[i] > 0.15) continue;
    railPairs.push([angles[i], angles[i + 1]]);
  }
  for (const [a1, a2] of railPairs) {
    const mid = (a1 + a2) / 2;
    const x1 = Math.sin(a1) * R;
    const z1 = Math.cos(a1) * R;
    const x2 = Math.sin(a2) * R;
    const z2 = Math.cos(a2) * R;
    const len = Math.hypot(x2 - x1, z2 - z1);
    const x = Math.sin(mid) * R;
    const z = Math.cos(mid) * R;
    box(g, 0.16, 0.09, len, P.stone, x, 0.8, z, { rot: [0, Math.atan2(x2 - x1, z2 - z1), 0] });
    box(g, 0.1, 0.06, len * 0.94, P.stoneDim, x, 0.28, z, { rot: [0, Math.atan2(x2 - x1, z2 - z1), 0] });
  }
  for (const a of [-1.4, 1.4]) {
    const x = Math.sin(a) * 8.45;
    const z = Math.cos(a) * 8.45;
    box(g, 0.52, 1.05, 0.52, P.stone, x, 0.55, z, { rot: [0, -a, 0] });
    box(g, 0.66, 0.12, 0.66, P.stoneLight, x, 1.09, z, { rot: [0, -a, 0] });
    sphere(g, 0.2, P.stoneLight, x, 1.26, z);
  }
  for (const sx of [-1, 1]) {
    const x = sx * 2.35;
    const z = 8.09;
    cyl(g, 0.34, 0.26, 0.5, P.stoneDim, x, 0.29, z, { segments: 10 });
    box(g, 0.7, 0.08, 0.7, P.stoneLight, x, 0.54, z);
    const topiary = sphere(g, 0.42, P.leafDeep, x, 1.0, z, { scale: [1, 1.15, 1] });
    sphere(g, 0.22, P.leafLight, x + 0.2, 1.18, z + 0.15, { low: true });
    for (let i = 0; i < 5; i++) {
      sphere(g, 0.035, i % 2 ? P.rose : P.butter, x + rnd(-0.3, 0.3), 1.05 + rnd(0, 0.3), z + rnd(-0.3, 0.3), { low: true });
    }
  }
}

function buildWallSegment(parent, x1, z1, x2, z2, opts = {}) {
  const dx = x2 - x1;
  const dz = z2 - z1;
  const len = Math.hypot(dx, dz);
  const cx = (x1 + x2) / 2;
  const cz = (z1 + z2) / 2;
  const g = new THREE.Group();
  g.position.set(cx, 0, cz);
  g.rotation.y = -Math.atan2(dz, dx);
  parent.add(g);
  const H = opts.height ?? 3.0;
  box(g, len, H, 0.58, P.stone, 0, H / 2, 0);
  box(g, len, 0.85, 0.74, P.stoneDim, 0, 0.43, 0);
  box(g, len + 0.04, 0.16, 0.72, P.stoneLight, 0, H - 0.1, 0);
  box(g, len, 0.14, 0.66, P.stoneDim, 0, 1.7, 0.01);
  const merlonCount = Math.max(2, Math.floor(len / 0.92));
  const spacing = len / merlonCount;
  for (let i = 0; i < merlonCount; i++) {
    const lx = -len / 2 + spacing * (i + 0.5);
    box(g, spacing * 0.52, 0.52, 0.6, i % 2 ? P.stone : P.stoneLight, lx, H + 0.26, 0);
    box(g, spacing * 0.6, 0.08, 0.7, P.stoneDim, lx, H + 0.54, 0);
  }
  for (let i = 0; i < 5; i++) {
    if (len < 4) break;
    const lx = -len / 2 + (i + 0.5) * (len / 5);
    if (i % 2 === 0) {
      const shield = makeShield(g, lx, 1.72, 0.34, P.stoneDim, i % 4 === 0 ? P.roof : P.roofRose);
      shield.scale.setScalar(0.9);
    }
  }
  return g;
}

function makeShield(parent, x, y, z, frame, face) {
  const s = new THREE.Shape();
  s.moveTo(-0.28, 0.32);
  s.lineTo(0.28, 0.32);
  s.lineTo(0.28, 0.02);
  s.quadraticCurveTo(0.28, -0.3, 0, -0.44);
  s.quadraticCurveTo(-0.28, -0.3, -0.28, 0.02);
  s.closePath();
  const g = new THREE.Group();
  g.position.set(x, y, z);
  parent.add(g);
  const back = new THREE.Mesh(new THREE.ShapeGeometry(s), toon(frame));
  back.position.z = 0.005;
  g.add(back);
  const inner = new THREE.Mesh(new THREE.ShapeGeometry(s), toon(face));
  inner.scale.setScalar(0.84);
  inner.position.z = 0.02;
  g.add(inner);
  sphere(g, 0.06, P.gold, 0, 0.03, 0.05, { low: true });
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    sphere(g, 0.022, P.gold, Math.cos(a) * 0.14, 0.03 + Math.sin(a) * 0.14, 0.045, { low: true });
  }
  return g;
}

function buildTower(parent, x, z, radius, shaftH, roofH, roofColor, opts = {}) {
  const g = new THREE.Group();
  g.position.set(x, 0, z);
  parent.add(g);
  cyl(g, radius * 1.22, radius * 1.36, 0.55, P.stoneDim, 0, 0.275, 0, { segments: 18 });
  cyl(g, radius, radius * 1.03, shaftH, P.stone, 0, 0.5 + shaftH / 2, 0, { segments: 18 });
  for (let i = 0; i < 5; i++) {
    cyl(g, radius * 1.015, radius * 1.015, 0.06, P.stoneDim, 0, 1.1 + i * (shaftH / 5.5), 0, {
      segments: 18, open: true, cast: false,
    });
  }
  cyl(g, radius * 1.14, radius * 1.1, 0.18, P.stoneLight, 0, shaftH + 0.5, 0, { segments: 18 });
  const corbels = 10;
  for (let i = 0; i < corbels; i++) {
    const a = (i / corbels) * Math.PI * 2;
    box(g, 0.16, 0.36, 0.28, P.stoneDim, Math.cos(a) * radius * 1.12, shaftH + 0.35, Math.sin(a) * radius * 1.12, {
      rot: [0, -a, 0],
    });
  }
  const roofBase = shaftH + 0.58;
  cone(g, radius * 1.36, roofH, roofColor, 0, roofBase + roofH / 2, 0, { segments: 14 });
  cyl(g, radius * 1.18, radius * 1.18, 0.08, P.stoneDim, 0, roofBase + 0.04, 0, { segments: 18 });
  const finialY = roofBase + roofH + 0.05;
  sphere(g, 0.11, P.gold, 0, finialY, 0);
  cyl(g, 0.02, 0.02, 0.55, P.goldDeep, 0, finialY + 0.28, 0, { segments: 5 });
  pennant(g, opts.pennantColor ?? (roofColor === P.roofRose ? P.roof : P.roofRose), [0, finialY + 0.78, 0], rnd(0, 6));
  const winY = opts.winY ?? [shaftH * 0.45 + 0.5, shaftH * 0.74 + 0.5];
  for (let i = 0; i < 2; i++) {
    const a = (opts.winAngle ?? 0) + i * 1.35;
    const wx = Math.sin(a) * radius * 0.995;
    const wz = Math.cos(a) * radius * 0.995;
    archedWindow(g, 0.32, 0.68, [wx, winY[i % winY.length], wz], a, {
      color: 0xffcf8e, frame: P.stoneDim, bars: true,
    });
  }
  for (let i = 0; i < 3; i++) {
    const a = (opts.winAngle ?? 0) + 0.7 + i * 1.7;
    box(g, 0.07, 0.34, 0.06, 0x3c3530, Math.sin(a) * radius * 1.006, shaftH * 0.33, Math.cos(a) * radius * 1.006, {
      rot: [0, a, 0],
    });
  }
  if (opts.door) {
    archedDoorway(g, 0.7, 1.4, [Math.sin(opts.door) * radius * 0.995, 0.5, Math.cos(opts.door) * radius * 0.995], opts.door, 0x362e28);
  }
  return g;
}

function buildGatehouse(parent) {
  const g = new THREE.Group();
  g.position.set(0, 0, 4.4);
  parent.add(g);

  const shape = new THREE.Shape();
  shape.moveTo(-2.1, 0);
  shape.lineTo(2.1, 0);
  shape.lineTo(2.1, 4.3);
  shape.lineTo(-2.1, 4.3);
  shape.closePath();
  const hole = new THREE.Path();
  hole.moveTo(-0.92, 0);
  hole.lineTo(-0.92, 1.6);
  hole.absarc(0, 1.6, 0.92, Math.PI, 0, true);
  hole.lineTo(0.92, 0);
  hole.closePath();
  shape.holes.push(hole);
  const geo = new THREE.ExtrudeGeometry(shape, { depth: 1.15, bevelEnabled: false, curveSegments: 16 });
  geo.translate(0, 0, -0.575);
  const wall = new THREE.Mesh(geo, toon(P.stone));
  wall.castShadow = true;
  wall.receiveShadow = true;
  g.add(wall);
  box(g, 4.5, 0.2, 1.3, P.stoneLight, 0, 4.28, 0);
  for (let i = 0; i < 5; i++) {
    const x = -1.8 + i * 0.9;
    box(g, 0.5, 0.55, 0.8, i % 2 ? P.stoneLight : P.stone, x, 4.62, 0);
    box(g, 0.58, 0.08, 0.86, P.stoneDim, x, 4.93, 0);
  }
  for (let i = 0; i < 6; i++) {
    const x = -1.85 + i * 0.74;
    box(g, 0.18, 0.26, 1.5, P.stoneDim, x, 4.05, 0.02);
    const corbel = cone(g, 0.09, 0.25, P.stoneDark, x, 3.85, 0.72, { segments: 4, rot: [Math.PI, 0, 0] });
  }
  box(g, 1.9, 0.18, 1.5, P.stoneLight, 0, 0.09, 0);
  const portcullis = new THREE.Group();
  portcullis.position.set(0, 0, 0.1);
  g.add(portcullis);
  for (let i = 0; i < 5; i++) {
    const x = -0.7 + i * 0.35;
    box(portcullis, 0.055, 2.1, 0.06, P.iron, x, 2.35, 0.52);
    cone(portcullis, 0.045, 0.14, P.iron, x, 1.25, 0.52, { segments: 4, rot: [Math.PI, 0, 0] });
  }
  for (let i = 0; i < 2; i++) {
    box(portcullis, 1.55, 0.06, 0.06, P.iron, 0, 1.85 + i * 0.6, 0.52);
  }
  const doorMat = toon(P.woodDark);
  const dl = box(g, 0.86, 2.0, 0.1, doorMat, -0.43, 1.05, -0.2, { cast: true });
  dl.rotation.y = -0.75;
  const dr = box(g, 0.86, 2.0, 0.1, doorMat, 0.43, 1.05, -0.2, { cast: true });
  dr.rotation.y = 0.75;
  for (const side of [-1, 1]) {
    for (let i = 0; i < 3; i++) {
      sphere(g, 0.035, P.iron, side * 0.72, 0.55 + i * 0.55, -0.02, { low: true });
    }
  }
  const pendant = clothBanner(g, bannerTexture('blue'), 0.5, 1.25, [0, 4.15, 0.95], 0, { amp: 0.035 });
  for (const sx of [-1, 1]) {
    lanternPost(g, sx * 1.35, 0.95, 0, 0.8);
    const torch = new THREE.Group();
    torch.position.set(sx * 1.1, 2.15, 0.62);
    g.add(torch);
    box(torch, 0.06, 0.55, 0.06, P.iron, 0, 0, 0);
    box(torch, 0.16, 0.24, 0.16, 0xffd18c, 0, 0.32, 0, { matOpts: { toneMapped: false }, cast: false });
    glowSprite(torch, 0xffb86a, 1.1, 0, 0.32, 0.08, 0.5);
  }
  makeStar(g, 0.16, 0xe9c97f, 0, 3.62, 0.64, 0, {});
  return g;
}

function buildKeep(parent) {
  const keep = new THREE.Group();
  keep.position.set(0, 0, -1.4);
  parent.add(keep);

  const halfW = 2.7;
  const halfD = 2.3;
  const H = 7.5;
  const wallT = 0.45;

  box(keep, halfW * 2 + wallT, 0.34, halfD * 2 + wallT, P.stoneDim, 0, -0.03, 0);
  box(keep, wallT, H, halfD * 2, P.stone, -halfW + wallT / 2, H / 2, 0);
  box(keep, wallT, H, halfD * 2, P.stone, halfW - wallT / 2, H / 2, 0);
  box(keep, halfW * 2 - wallT * 2, H, wallT, P.stone, 0, H / 2, -halfD + wallT / 2);
  box(keep, halfW * 2 - wallT * 2, 0.55, wallT, P.stone, 0, 0.275, halfD - wallT / 2);

  box(keep, halfW * 2 + 0.16, 0.34, halfD * 2 + 0.16, P.stoneLight, 0, 4.16, 0);
  box(keep, halfW * 2 + 0.32, 0.18, halfD * 2 + 0.32, P.stone, 0, 3.94, 0);
  box(keep, halfW * 2 + 0.24, 0.3, 0.24, P.woodDark, 0, 4.02, halfD + 0.06);
  for (let i = 0; i < 6; i++) {
    const x = -2.2 + i * 0.88;
    const c = box(keep, 0.16, 0.34, 0.3, P.stoneDim, x, 3.83, halfD + 0.02);
    cone(keep, 0.1, 0.28, P.stoneDim, x, 3.6, halfD + 0.12, { segments: 4, rot: [Math.PI, 0, 0] });
  }
  box(keep, halfW * 2 + 0.04, 0.18, halfD * 2 + 0.04, P.stoneLight, 0, H - 0.09, 0);
  box(keep, halfW * 2 + 0.2, 0.2, halfD * 2 + 0.2, P.stoneDim, 0, H - 0.28, 0);
  for (let i = 0; i < 4; i++) {
    const y = 0.7 + i * 1.72;
    for (const sx of [-1, 1]) {
      box(keep, 0.28, 0.34, 0.62, i % 2 ? P.stoneLight : P.stoneDim, sx * (halfW + 0.03), y, halfD - 0.28, {
        rot: [0, 0, 0],
      });
    }
  }
  const wallBand = new THREE.MeshToonMaterial({ color: P.stoneDim, gradientMap: gradientMap() });
  for (const sx of [-1, 1]) {
    box(keep, 0.02, H - 0.5, 0.03, P.stoneDim, sx * (halfW - wallT - 0.01), (H - 0.5) / 2 + 0.2, 0.9, { cast: false });
  }

  const roofH = 3.35;
  const roofBase = H + 0.04;
  const roof = cone(keep, 4.25, roofH, P.roof, 0, roofBase + roofH / 2, 0, { segments: 4, rot: [0, Math.PI / 4, 0] });
  roof.scale.z = 4.25 * 0.92;
  const roofShadow = cone(keep, 4.26, 0.05, P.roofDeep, 0, roofBase + 0.05, 0, { segments: 4, rot: [0, Math.PI / 4, 0] });
  roofShadow.scale.z = 4.26 * 0.92;
  for (let i = 0; i < 4; i++) {
    const a = Math.PI / 4 + (i * Math.PI) / 2;
    const ridge = box(keep, 0.06, 3.4, 0.06, P.roofDeep, Math.sin(a) * 2.1, roofBase + 1.62, Math.cos(a) * 2.1, { rot: [0, -a, 0], cast: false });
    ridge.rotation.z = -0.17;
  }
  const sphereTopY = roofBase + roofH;
  sphere(keep, 0.14, P.gold, 0, sphereTopY + 0.05, 0);
  cyl(keep, 0.02, 0.02, 0.9, P.goldDeep, 0, sphereTopY + 0.5, 0, { segments: 5 });
  pennant(keep, P.roofRose, [0, sphereTopY + 1.0, 0], 0);

  const chimney = new THREE.Group();
  chimney.position.set(-3.02, 0, 0.82);
  keep.add(chimney);
  box(chimney, 0.88, 10.6, 0.9, P.stone, 0, 5.3, 0);
  box(chimney, 1.03, 0.18, 1.05, P.stoneLight, 0, 10.58, 0);
  box(chimney, 0.7, 0.25, 0.7, P.stoneDark, 0, 10.78, 0);

  const turret = new THREE.Group();
  turret.position.set(2.95, 0, 1.85);
  keep.add(turret);
  cyl(turret, 1.0, 1.06, 9.0, P.stone, 0, 4.55, 0, { segments: 16 });
  cyl(turret, 1.16, 1.1, 0.2, P.stoneLight, 0, 9.0, 0, { segments: 16 });
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    box(turret, 0.14, 0.3, 0.22, P.stoneDim, Math.cos(a) * 1.08, 8.86, Math.sin(a) * 1.08, { rot: [0, -a, 0] });
  }
  cone(turret, 1.3, 2.25, P.roofRose, 0, 11.12, 0, { segments: 12 });
  sphere(turret, 0.09, P.gold, 0, 12.3, 0);
  pennant(turret, P.roof, [0, 13.0, 0], 1.2);
  for (let i = 0; i < 3; i++) {
    const a = 0.2 + i * 1.6;
    archedWindow(turret, 0.26, 0.54, [Math.sin(a) * 1.0, 1.8 + i * 2.15, Math.cos(a) * 1.0], a, {
      color: 0xffd49b, frame: P.stoneDim,
    });
  }
  archedDoorway(turret, 0.66, 1.35, [0.35, 0.25, 0.92], 0.25, 0x3a2f27);

  const dormer = new THREE.Group();
  dormer.position.set(0, 8.18, 1.34);
  keep.add(dormer);
  box(dormer, 1.12, 1.35, 0.85, P.stone, 0, 0.1, 0);
  archedWindow(dormer, 0.42, 0.8, [0, 0.28, 0.44], 0, { color: 0xffd594, frame: P.stoneDim, bars: true });
  box(dormer, 1.4, 0.1, 1.1, P.roofDeep, 0, 0.9, 0, { rot: [0.42, 0, 0] });
  box(dormer, 1.4, 0.1, 1.1, P.roofDeep, 0, 0.9, 0.04, { rot: [-0.42, 0, 0] });
  cone(dormer, 0.78, 0.7, P.roofDeep, 0, 1.26, 0.02, { segments: 4 });

  for (const side of [-1, 1]) {
    const x = side * (halfW + 0.012);
    archedWindow(keep, 0.55, 1.4, [x, 1.4, -0.55], side * Math.PI / 2, {
      color: 0xffd39a, frame: P.stoneDim, bars: true,
    });
    archedWindow(keep, 0.5, 1.2, [x, 5.1, -0.7], side * Math.PI / 2, {
      color: 0xffd9a4, frame: P.stoneDim, bars: true,
    });
    archedWindow(keep, 0.4, 0.9, [x, 5.2, 0.8], side * Math.PI / 2, {
      color: 0xffd9a4, frame: P.stoneDim, bars: true,
    });
  }
  archedWindow(keep, 0.6, 1.5, [0, 5.3, -halfD - 0.012], Math.PI, {
    color: 0xffd39a, frame: P.stoneDim, bars: true,
  });
  archedDoorway(keep, 0.72, 1.5, [2.45, 0.2, 1.9], -Math.PI / 2, 0x3a2e26);

  const bannerTex = bannerTexture('blue');
  const bannerTex2 = bannerTexture('rose');
  clothBanner(keep, bannerTex, 0.72, 1.55, [-2.735, 6.85, 0.85], -Math.PI / 2, { amp: 0.055 });
  clothBanner(keep, bannerTex2, 0.72, 1.55, [2.735, 6.85, 0.85], Math.PI / 2, { amp: 0.055 });
  box(keep, 0.06, 0.06, 0.95, P.woodDark, -2.76, 6.87, 0.85);
  box(keep, 0.06, 0.06, 0.95, P.woodDark, 2.76, 6.87, 0.85);

  for (let i = 0; i < 16; i++) {
    const y = 1.0 + i * 0.4;
    const x = -halfW - 0.04;
    const z = -1.7 + Math.sin(i * 0.9) * 0.65;
    sphere(keep, rnd(0.08, 0.17), i % 3 ? P.leaf : P.leafLight, x - Math.sin(i * 1.3) * 0.12, y, z, {
      low: true, scale: [0.5, 0.45, 0.28], cast: false,
    });
  }
  for (let i = 0; i < 8; i++) {
    sphere(keep, 0.13, i % 2 ? P.pink : P.butter, -2.9 + i * 0.8, 0.45, 2.5, { low: true, scale: [1, 0.7, 1] });
  }
  for (let i = 0; i < 5; i++) {
    const x = -2.2 + i * 1.1;
    box(keep, 0.65, 0.22, 0.28, P.woodDark, x, 0.38, 2.44);
    for (let k = 0; k < 3; k++) {
      sphere(keep, 0.06, k % 2 ? P.rose : P.butter, x - 0.2 + k * 0.2, 0.56, 2.5, { low: true });
    }
  }

  return keep;
}

function buildChapel(parent) {
  const g = new THREE.Group();
  g.position.set(4.05, 0, -2.35);
  parent.add(g);
  const W = 1.95;
  const D = 3.15;
  box(g, W + 0.35, 0.35, D + 0.4, P.stoneDim, 0, 0.175, 0);
  box(g, W, 2.6, D, P.stone, 0, 1.65, 0);
  box(g, W + 0.15, 0.14, D + 0.15, P.stoneLight, 0, 2.88, 0);
  const rise = 1.05;
  const slopeLen = Math.hypot(W / 2 + 0.24, rise) + 0.15;
  const angle = Math.atan2(rise, W / 2 + 0.24);
  for (const sx of [-1, 1]) {
    const roof = box(g, slopeLen, 0.14, D + 0.45, P.roof, sx * (W / 4 + 0.06), 3.42, 0, {
      rot: [0, 0, -sx * angle],
    });
  }
  box(g, 0.16, 0.16, D + 0.5, P.roofDeep, 0, 3.98, 0);
  const gable = new THREE.Shape();
  gable.moveTo(-W / 2, 0);
  gable.lineTo(W / 2, 0);
  gable.lineTo(0, rise);
  gable.closePath();
  const frontGable = new THREE.Mesh(new THREE.ShapeGeometry(gable), toon(P.stone));
  frontGable.position.set(0, 2.86, D / 2 + 0.005);
  frontGable.castShadow = true;
  g.add(frontGable);
  const backGable = new THREE.Mesh(new THREE.ShapeGeometry(gable), toon(P.stone));
  backGable.position.set(0, 2.86, -D / 2 - 0.005);
  backGable.rotation.y = Math.PI;
  backGable.castShadow = true;
  g.add(backGable);
  archedDoorway(g, 0.66, 1.35, [0, 0.35, D / 2 + 0.03], 0, 0x4b3a2c);
  const doorGlow = new THREE.Mesh(
    new THREE.ShapeGeometry(archShape(0.56, 1.15, 0.28), 8),
    new THREE.MeshBasicMaterial({ color: 0xffcf8f, transparent: true, opacity: 0.55, toneMapped: false })
  );
  doorGlow.position.set(0, 0.44, D / 2 + 0.04);
  g.add(doorGlow);
  glowSprite(g, 0xffc684, 2.2, 0, 0.9, D / 2 + 0.12, 0.4);
  const rose = new THREE.Mesh(
    new THREE.CircleGeometry(0.42, 32),
    new THREE.MeshBasicMaterial({ map: roseWindowTexture(), toneMapped: true })
  );
  rose.position.set(0, 2.22, D / 2 + 0.03);
  g.add(rose);
  const roseRing = new THREE.Mesh(new THREE.TorusGeometry(0.45, 0.055, 6, 24), toon(P.stoneDim));
  roseRing.position.set(0, 2.22, D / 2 + 0.05);
  g.add(roseRing);
  glowSprite(g, 0xffb78f, 1.5, 0, 2.22, D / 2 + 0.16, 0.28);
  for (const sx of [-1, 1]) {
    for (const z of [-0.95, 0.35]) {
      const win = new THREE.Mesh(
        new THREE.ShapeGeometry(archShape(0.32, 0.95, 0.16), 10),
        new THREE.MeshBasicMaterial({
          color: sx > 0 ? 0xb9d8d9 : 0xf0c1b5,
          transparent: true,
          opacity: 0.82,
          toneMapped: false,
          side: THREE.DoubleSide,
        })
      );
      win.rotation.y = sx * Math.PI / 2;
      win.position.set(sx * (W / 2 + 0.01), 1.55, z);
      g.add(win);
      box(g, 0.04, 0.03, 0.95, P.iron, sx * (W / 2 + 0.03), 1.55, z, { rot: [0, sx * Math.PI / 2, 0], cast: false });
    }
    for (const z of [-1.15, 0, 1.15]) {
      box(g, 0.39, 2.2, 0.28, P.stoneLight, sx * (W / 2 + 0.14), 1.2, z);
      const buttress = box(g, 0.26, 0.55, 0.3, P.stoneLight, sx * (W / 2 + 0.14), 2.2, z, { rot: [0, 0, sx * 0.5] });
    }
  }
  box(g, 0.34, 0.9, 0.38, P.stoneLight, 0, 3.85, D / 2 - 0.12);
  box(g, 0.24, 0.55, 0.24, P.woodDark, 0, 4.37, D / 2 - 0.12);
  cone(g, 0.19, 0.23, P.gold, 0, 4.53, D / 2 - 0.12, { segments: 8 });
  box(g, 0.06, 0.6, 0.06, P.goldDeep, 0, 4.76, D / 2 - 0.12);
  box(g, 0.36, 0.06, 0.06, P.goldDeep, 0, 4.86, D / 2 - 0.12);
  archedDoorway(g, 0.26, 0.6, [0, 4.0, D / 2 + 0.08], 0, 0x3d342c);
  const bell = sphere(g, 0.1, P.goldDeep, 0, 4.25, D / 2 + 0.02, { scale: [1, 1.2, 1] });
  for (let i = 0; i < 5; i++) {
    sphere(g, 0.025, P.white, sx2(-1, 1) * 0.3, 0.44, D / 2 + 0.34, { low: true });
  }
  for (let i = 0; i < 6; i++) {
    const s = i % 2 ? P.lavender : P.white;
    sphere(g, 0.045, s, (i % 3 - 1) * 0.35 + 0.4, 0.46, D / 2 + 0.4 + Math.floor(i / 3) * 0.25, { low: true });
    cyl(g, 0.012, 0.012, 0.25, P.leafDeep, (i % 3 - 1) * 0.35 + 0.4, 0.32, D / 2 + 0.4 + Math.floor(i / 3) * 0.25, { segments: 4, cast: false });
  }
  return g;
}

function sx2(a, b) {
  return rnd() > 0.5 ? a : b;
}

function buildCrenellationsKeep(parent, keep) {
  for (let i = 0; i < 4; i++) {
    const x = -2.4 + i * 1.6;
    box(keep, 0.7, 0.5, 0.55, P.stoneLight, x, 7.0, 2.44);
  }
}

export function buildCastle(root) {
  const castle = new THREE.Group();
  castle.position.set(LAYOUT.platform.x, LAYOUT.platform.y, LAYOUT.platform.z);
  root.add(castle);

  buildPlatform(root);

  const frontShell = [];
  buildWallSegment(castle, -5.5, -4.4, 5.5, -4.4);
  buildWallSegment(castle, -5.5, -4.4, -5.5, 4.4);
  buildWallSegment(castle, 5.5, 4.4, 5.5, -4.4);
  frontShell.push(buildWallSegment(castle, -5.5, 4.4, -2.05, 4.4));
  frontShell.push(buildWallSegment(castle, 2.05, 4.4, 5.5, 4.4));

  buildTower(castle, -5.5, -4.4, 1.25, 4.1, 2.5, P.roof, { winAngle: -2.4, door: 0.9 });
  buildTower(castle, 5.5, -4.4, 1.25, 4.1, 2.5, P.roofRose, { winAngle: 2.4 });
  buildTower(castle, -5.5, 4.4, 1.25, 4.3, 2.6, P.roofRose, { winAngle: -0.6 });
  buildTower(castle, 5.5, 4.4, 1.25, 4.3, 2.6, P.roof, { winAngle: 0.6 });

  frontShell.push(buildGatehouse(castle));
  frontShell.push(buildTower(castle, -2.02, 4.4, 1.16, 5.1, 2.35, P.roof, { winAngle: -0.5, pennantColor: P.roofRose }));
  frontShell.push(buildTower(castle, 2.02, 4.4, 1.16, 5.1, 2.35, P.roofRose, { winAngle: 0.5, pennantColor: P.roof }));

  const keep = buildKeep(castle);
  const chapel = buildChapel(castle);

  for (const sx of [-1, 1]) {
    frontShell.push(clothBanner(castle, bannerTexture(sx < 0 ? 'blue' : 'rose'), 0.62, 1.5, [sx * 3.45, 3.35, 5.28], 0, { amp: 0.05 }));
    frontShell.push(box(castle, 0.72, 0.05, 0.05, P.woodDark, sx * 3.45, 3.36, 5.3));
  }
  for (const sx of [-1, 1]) {
    const tree = new THREE.Group();
    tree.position.set(sx * 6.85, 0.0, 1.1);
    castle.add(tree);
    cyl(tree, 0.25, 0.32, 0.55, P.stoneDim, 0, 0.27, 0, { segments: 10 });
    cyl(tree, 0.06, 0.09, 1.05, P.wood, 0, 1.0, 0, { segments: 6 });
    sphere(tree, 0.72, P.leaf, 0, 1.72, 0, { scale: [1, 0.86, 1] });
    sphere(tree, 0.45, P.leafLight, 0.35, 1.95, 0.2, { low: true });
    sphere(tree, 0.3, P.leafDeep, -0.4, 1.55, -0.25, { low: true });
    for (let i = 0; i < 4; i++) {
      sphere(tree, 0.07, P.butter, rnd(-0.55, 0.55), rnd(1.4, 2.0), rnd(-0.45, 0.55), { low: true });
    }
  }

  const smokeOrigin = new THREE.Object3D();
  smokeOrigin.position.set(-3.02, 11.0, 0.82);
  keep.add(smokeOrigin);

  return { castle, keep, chapel, platform: root, smokeOrigin, frontShell };
}
