import * as THREE from 'three';
import {
  GROUND_Y, PALETTE, islandHeight, box, sphere, cylinder, cone, addPointedWindow,
  makeFlag,
} from './core.js';
import {
  createCook, createScholar, createKing, createKnight, createCat,
  createChicken, createHorse, createDog, createPage,
} from './characters.js';

export const castleAnimators = [];

const rand = (a, b) => a + Math.random() * (b - a);

function flicker(light, base, phase = 0, speed = 5) {
  castleAnimators.push((t) => {
    light.intensity = base * (0.82 + Math.sin(t * speed + phase) * 0.08 + Math.sin(t * speed * 2.7 + phase * 1.7) * 0.05);
  });
}

function ringWall(innerR, outerR, y0, y1, a0, a1, material, segments = 46) {
  const pos = [];
  const uv = [];
  const idx = [];
  for (let i = 0; i <= segments; i++) {
    const a = a0 + (a1 - a0) * (i / segments);
    const c = Math.cos(a), s = Math.sin(a);
    pos.push(outerR * c, y0, outerR * s);
    pos.push(outerR * c, y1, outerR * s);
    pos.push(innerR * c, y0, innerR * s);
    pos.push(innerR * c, y1, innerR * s);
    const u = (a * outerR) / 4;
    uv.push(u, y0 / 4, u, y1 / 4, u, y0 / 4, u, y1 / 4);
  }
  for (let i = 0; i < segments; i++) {
    const a = i * 4, b = (i + 1) * 4;
    idx.push(a, b, a + 1, a + 1, b, b + 1);
    idx.push(a + 2, a + 3, b + 2, a + 3, b + 3, b + 2);
    idx.push(a + 1, b + 1, a + 3, a + 3, b + 1, b + 3);
    idx.push(a, a + 2, b, a + 2, b + 2, b);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  const mesh = new THREE.Mesh(geo, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function archCurve(width, rise, y, segments = 18) {
  const half = width / 2;
  const pts = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const x = -half + width * t;
    const k = Math.abs(x) / half;
    const py = y + rise * (1 - Math.pow(k, 1.55));
    pts.push(new THREE.Vector3(x, py, 0));
  }
  return new THREE.CatmullRomCurve3(pts);
}

function addArch(parent, materials, x, z, width, rise, baseY, mat = materials.stoneLight, ry = 0) {
  const curve = archCurve(width, rise, baseY);
  const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 22, 0.18, 6, false), mat);
  tube.position.set(x, 0, z);
  tube.rotation.y = ry;
  tube.castShadow = true;
  parent.add(tube);
  return tube;
}

export function createTower(materials, opts) {
  const {
    x, z, radius = 2.2, height = 16, roofHeight = 4.8,
    roofMat = materials.roof, flag = true, windows = 3,
  } = opts;
  const g = new THREE.Group();
  g.position.set(x, GROUND_Y, z);

  const plinth = cylinder(radius * 1.12, radius * 1.3, 1.1, materials.stoneDark, 0, 0.55, 0, 16);
  g.add(plinth);
  const body = cylinder(radius * 0.9, radius, height, materials.stone, 0, 1 + height / 2, 0, 22);
  g.add(body);

  for (let i = 0; i < 2; i++) {
    const band = cylinder(radius * (0.94 - i * 0.025), radius * (0.97 - i * 0.025), 0.22, materials.stoneLight, 0, 1 + height * (0.42 + i * 0.28), 0, 22);
    g.add(band);
  }

  const crown = cylinder(radius * 1.04, radius * 0.94, 0.9, materials.stoneLight, 0, 1 + height + 0.45, 0, 22);
  g.add(crown);
  const merlons = 12;
  for (let i = 0; i < merlons; i++) {
    const a = (i / merlons) * Math.PI * 2;
    const m = box(radius * 0.34, 0.56, radius * 0.36, materials.stone, Math.cos(a) * radius * 0.9, 1 + height + 1.1, Math.sin(a) * radius * 0.9);
    m.rotation.y = -a;
    g.add(m);
  }

  const roof = cone(radius * 1.16, roofHeight, roofMat, 0, 1 + height + 1.3 + roofHeight / 2, 0, 20);
  g.add(roof);
  const tip = sphere(radius * 0.09, materials.gold, 0, 1 + height + 1.3 + roofHeight + 0.08, 0, 8);
  g.add(tip);

  for (let i = 0; i < windows; i++) {
    const a = (i / windows) * Math.PI * 2 + 0.6;
    const wy = 1 + height * (0.24 + (i % 3) * 0.18);
    addPointedWindow(g, materials, Math.cos(a) * radius * 0.965, wy, Math.sin(a) * radius * 0.965, 0.52, 1.15, Math.PI / 2 - a, true);
  }

  if (flag) {
    const poleY = 1 + height + 1.4 + roofHeight;
    const pole = cylinder(0.035, 0.035, 2.1, materials.woodDark, 0, poleY + 0.6, 0, 5);
    g.add(pole);
    const flagMesh = makeFlag(materials.banner, 1.3, 0.7);
    flagMesh.position.set(0.04, poleY + 1.55, 0);
    flagMesh.rotation.y = 0.3;
    g.add(flagMesh);
    const base = flagMesh.geometry.attributes.position.array.slice();
    castleAnimators.push((t) => {
      const arr = flagMesh.geometry.attributes.position.array;
      for (let i = 0; i < arr.length; i += 3) {
        const bx = base[i];
        arr[i + 2] = Math.sin(t * 2.4 + bx * 4) * 0.11 * (bx / 1.3);
      }
      flagMesh.geometry.attributes.position.needsUpdate = true;
    });
  }
  return g;
}

function addKeepWindows(keep, materials, R, openingCenter, openingHalf) {
  const heights = [5.8, 8.2, 10.8, 13.2, 15.6, 17.8];
  let count = 0;
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2 + 0.18;
    const delta = Math.atan2(Math.sin(a - openingCenter), Math.cos(a - openingCenter));
    if (Math.abs(delta) < openingHalf + 0.25) continue;
    const h = heights[count % heights.length];
    addPointedWindow(keep, materials, Math.cos(a) * R * 1.006, h, Math.sin(a) * R * 1.006, 0.62, 1.45, Math.PI / 2 - a, true);
    count++;
  }
}

function makeKeep(materials, anchors) {
  const keep = new THREE.Group();
  keep.position.set(0, 0, -3);

  const outerR = 6.8;
  const innerR = 6.0;
  const openingCenter = Math.PI / 2;
  const openingHalf = 0.84;
  const aStart = openingCenter + openingHalf;
  const aEnd = openingCenter - openingHalf + Math.PI * 2;

  const plinth = cylinder(outerR * 1.1, outerR * 1.22, 1.1, materials.stoneDark, 0, GROUND_Y + 0.55, 0, 32);
  keep.add(plinth);

  const porch = box(6.8, 0.38, 2.4, materials.stoneLight, 0, GROUND_Y + 0.94, 7.7);
  porch.receiveShadow = true;
  keep.add(porch);
  const carpet = box(2.6, 0.025, 4.3, materials.rugRed, 0, GROUND_Y + 1.15, 8.2);
  keep.add(carpet);
  for (let i = 0; i < 4; i++) {
    const step = box(6.0 - i * 0.28, 0.18, 0.7, i % 2 ? materials.stone : materials.stoneLight, 0, GROUND_Y + 0.75 - i * 0.18, 9.1 + i * 0.62);
    step.receiveShadow = true;
    keep.add(step);
  }

  const wall = ringWall(innerR, outerR, GROUND_Y + 1.0, GROUND_Y + 18.2, aStart, aEnd, materials.stone, 58);
  keep.add(wall);

  const frontButtressAngles = [aStart, aEnd];
  for (const a of frontButtressAngles) {
    const b = box(0.65, 17.2, 1.15, materials.stoneLight, Math.cos(a) * (outerR + 0.1), GROUND_Y + 9.7, Math.sin(a) * (outerR + 0.1));
    b.rotation.y = Math.PI / 2 - a;
    keep.add(b);
    const cap = box(0.9, 0.32, 1.45, materials.stone, b.position.x, GROUND_Y + 18.35, b.position.z);
    cap.rotation.y = Math.PI / 2 - a;
    keep.add(cap);
  }

  for (let i = 0; i < 14; i++) {
    const a = aStart + (aEnd - aStart) * (i / 14);
    if (i === 0) continue;
    const m = box(0.78, 0.72, 0.98, materials.stone, Math.cos(a) * (outerR - 0.32), GROUND_Y + 18.5, Math.sin(a) * (outerR - 0.32));
    m.rotation.y = Math.PI / 2 - a;
    keep.add(m);
  }

  for (let i = 0; i < 3; i++) {
    const band = ringWall(innerR - 0.05, outerR + 0.06, GROUND_Y + 1.0 + i * 5.05, GROUND_Y + 1.26 + i * 5.05, aStart, aEnd, materials.stoneLight, 48);
    keep.add(band);
  }

  addKeepWindows(keep, materials, outerR, openingCenter, openingHalf);

  const floors = [
    { y: GROUND_Y + 1.0, mat: materials.stoneDark, name: 'kitchen' },
    { y: GROUND_Y + 5.7, mat: materials.woodPale, name: 'library' },
    { y: GROUND_Y + 10.4, mat: materials.woodPale, name: 'bedroom' },
    { y: GROUND_Y + 15.1, mat: materials.stoneLight, name: 'observatory' },
  ];
  for (const f of floors) {
    const slab = cylinder(innerR + 0.06, innerR + 0.06, 0.30, f.mat, 0, f.y, 0, 40);
    slab.receiveShadow = true;
    keep.add(slab);
    const rim = new THREE.Mesh(new THREE.TorusGeometry(innerR + 0.06, 0.12, 5, 40), materials.woodDark);
    rim.rotation.x = Math.PI / 2;
    rim.position.y = f.y + 0.01;
    keep.add(rim);
  }

  const kitchenFloor = GROUND_Y + 1.0;
  const libraryFloor = GROUND_Y + 5.7;
  const bedroomFloor = GROUND_Y + 10.4;
  const observatoryFloor = GROUND_Y + 15.1;

  anchors.kitchen = new THREE.Object3D();
  anchors.kitchen.position.set(0, kitchenFloor + 0.16, 0);
  keep.add(anchors.kitchen);

  anchors.library = new THREE.Object3D();
  anchors.library.position.set(0, libraryFloor + 0.16, 0);
  keep.add(anchors.library);

  anchors.bedroom = new THREE.Object3D();
  anchors.bedroom.position.set(0, bedroomFloor + 0.16, 0);
  keep.add(anchors.bedroom);

  anchors.observatory = new THREE.Object3D();
  anchors.observatory.position.set(0, observatoryFloor + 0.16, 0);
  keep.add(anchors.observatory);

  buildKitchen(keep, materials, kitchenFloor, anchors);
  buildLibrary(keep, materials, libraryFloor);
  buildBedroom(keep, materials, bedroomFloor);
  buildObservatory(keep, materials, observatoryFloor);

  const stairTurret = createTower(materials, {
    x: -4.4, z: -3.2, radius: 1.55, height: 23.2, roofHeight: 3.6,
    roofMat: materials.roofLight, flag: false, windows: 4,
  });
  keep.add(stairTurret);

  const door = addPointedWindow(keep, materials, Math.cos(aEnd) * (outerR + 0.02), GROUND_Y + 1.0, Math.sin(aEnd) * (outerR + 0.02), 1.5, 2.9, Math.PI / 2 - aEnd, true);
  door.scale.set(1, 1, 1);

  return keep;
}

function buildKitchen(keep, materials, floorY, anchors) {
  const g = new THREE.Group();
  g.position.y = floorY + 0.16;

  const rug = new THREE.Mesh(new THREE.CircleGeometry(2.5, 22), materials.rugCream);
  rug.rotation.x = -Math.PI / 2;
  rug.position.set(0.5, 0.01, 1.0);
  rug.scale.set(1.3, 0.85, 1);
  g.add(rug);

  const hearth = new THREE.Group();
  hearth.position.set(-3.4, 0, -2.8);
  hearth.rotation.y = 0.72;
  hearth.add(box(2.9, 0.45, 1.2, materials.stoneDark, 0, 0.22, 0));
  hearth.add(box(0.35, 3.0, 1.3, materials.stone, -1.25, 1.5, 0));
  hearth.add(box(0.35, 3.0, 1.3, materials.stone, 1.25, 1.5, 0));
  hearth.add(box(2.85, 0.42, 1.35, materials.stoneLight, 0, 2.95, 0));
  const fireBack = box(2.25, 2.5, 0.18, new THREE.MeshStandardMaterial({ color: 0x5e4b43, roughness: 1 }), 0, 1.52, -0.45);
  hearth.add(fireBack);
  for (let i = 0; i < 3; i++) {
    const log = cylinder(0.13, 0.15, 1.35, materials.woodDark, -0.45 + i * 0.45, 0.48, 0.18, 6);
    log.rotation.z = Math.PI / 2;
    log.rotation.y = rand(-0.3, 0.3);
    hearth.add(log);
  }
  const flameMat = new THREE.MeshBasicMaterial({ color: 0xffb35f, transparent: true, opacity: 0.86 });
  const flame1 = cone(0.42, 1.0, flameMat, 0, 1.05, 0.15, 7);
  const flame2 = cone(0.26, 0.75, new THREE.MeshBasicMaterial({ color: 0xffdf9a, transparent: true, opacity: 0.9 }), 0.22, 0.92, 0.12, 6);
  hearth.add(flame1, flame2);
  const fireLight = new THREE.PointLight(0xff9f55, 22, 12, 2);
  fireLight.position.set(0, 1.6, 0.6);
  hearth.add(fireLight);
  flicker(fireLight, 22, 0.6, 7);
  castleAnimators.push((t) => {
    flame1.scale.y = 0.8 + Math.sin(t * 7.3) * 0.2;
    flame2.scale.y = 0.8 + Math.sin(t * 9.1 + 2) * 0.25;
    flame1.rotation.y = t * 0.7;
  });
  g.add(hearth);

  const cauldron = sphere(0.55, materials.iron, -1.9, 0.75, -1.3, 12);
  cauldron.scale.y = 0.8;
  g.add(cauldron);
  const cauldronRim = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.05, 5, 16), materials.iron);
  cauldronRim.rotation.x = Math.PI / 2;
  cauldronRim.position.set(-1.9, 1.18, -1.3);
  g.add(cauldronRim);
  const stand = cylinder(0.05, 0.05, 1.3, materials.iron, -1.9, 0.55, -1.3, 5);
  g.add(stand);

  const prep = new THREE.Group();
  prep.position.set(2.15, 0, -0.7);
  prep.rotation.y = -0.2;
  prep.add(box(2.6, 0.16, 1.25, materials.wood, 0, 0.9, 0));
  prep.add(box(0.15, 0.9, 0.15, materials.woodDark, -1.1, 0.45, -0.42));
  prep.add(box(0.15, 0.9, 0.15, materials.woodDark, 1.1, 0.45, -0.42));
  prep.add(box(0.15, 0.9, 0.15, materials.woodDark, -1.1, 0.45, 0.42));
  prep.add(box(0.15, 0.9, 0.15, materials.woodDark, 1.1, 0.45, 0.42));
  const board = box(0.95, 0.08, 0.6, materials.woodPale, -0.4, 1.02, 0);
  prep.add(board);
  prep.add(sphere(0.2, materials.ceramic, 0.72, 1.08, 0.05, 8));
  prep.add(cylinder(0.15, 0.11, 0.24, materials.ceramicBlue, 0.15, 1.09, 0.18, 8));
  for (let i = 0; i < 4; i++) {
    const carrot = cone(0.07, 0.35, new THREE.MeshStandardMaterial({ color: 0xdd9a63, roughness: 0.8 }), -0.55 + i * 0.19, 1.09, 0.1, 6);
    carrot.rotation.z = Math.PI / 2;
    prep.add(carrot);
  }
  g.add(prep);

  const shelf = new THREE.Group();
  shelf.position.set(-1.2, 0, -5.35);
  for (let i = 0; i < 3; i++) {
    shelf.add(box(4.2, 0.1, 0.6, materials.wood, 0, 0.55 + i * 0.85, 0));
  }
  for (let i = 0; i < 8; i++) {
    const jar = cylinder(0.13, 0.16, rand(0.28, 0.48), i % 2 ? materials.ceramic : materials.ceramicBlue, -1.7 + i * 0.46, 0.8 + (i % 2) * 0.85, 0.03, 8);
    shelf.add(jar);
  }
  g.add(shelf);

  const barrels = new THREE.Group();
  barrels.position.set(3.5, 0, 2.2);
  for (let i = 0; i < 3; i++) {
    const b = cylinder(0.42, 0.48, 1.25, materials.woodPale, i * 0.95, 0.63, i % 2 * 0.5, 10);
    barrels.add(b);
    for (let j = 0; j < 2; j++) {
      const hoop = new THREE.Mesh(new THREE.TorusGeometry(0.47, 0.035, 4, 12), materials.iron);
      hoop.rotation.x = Math.PI / 2;
      hoop.position.set(i * 0.95, 0.32 + j * 0.58, i % 2 * 0.5);
      barrels.add(hoop);
    }
  }
  g.add(barrels);

  const herbs = new THREE.Group();
  for (let i = 0; i < 7; i++) {
    const stem = cylinder(0.018, 0.018, 0.75, materials.leafDark, -3.6 + i * 0.36, 3.3, -3.0, 4);
    const leaf = cone(0.12, 0.34, materials.leafDark, -3.6 + i * 0.36, 3.05, -3.0, 5);
    leaf.rotation.z = Math.PI;
    herbs.add(stem, leaf);
  }
  g.add(herbs);

  const cook = createCook();
  cook.position.set(0.1, 0.02, 1.8);
  cook.rotation.y = 2.2;
  g.add(cook);

  const ladder = makeLadder(materials, 3.5);
  ladder.position.set(-4.4, 0.05, -4.6);
  ladder.rotation.y = 0.5;
  ladder.rotation.z = 0.1;
  g.add(ladder);

  const cat = createCat();
  cat.position.set(3.8, 0.12, 0.1);
  cat.rotation.y = -0.7;
  cat.scale.setScalar(0.85);
  g.add(cat);

  keep.add(g);
}

function makeBookcase(materials, width = 2.1, height = 3.1, seed = 0) {
  const g = new THREE.Group();
  g.add(box(width, height, 0.48, materials.woodDark, 0, height / 2, 0));
  const shelfCount = 4;
  for (let i = 0; i < shelfCount; i++) {
    const sy = 0.35 + i * (height - 0.5) / shelfCount;
    g.add(box(width - 0.18, 0.07, 0.52, materials.wood, 0, sy, 0.02));
    let bx = -width / 2 + 0.2;
    while (bx < width / 2 - 0.2) {
      const bw = rand(0.06, 0.13);
      const bh = rand(0.30, 0.47);
      const col = new THREE.Color().setHSL([0.02, 0.09, 0.55, 0.62, 0.00][Math.floor(rand(0, 5))], rand(0.25, 0.5), rand(0.38, 0.62));
      const book = box(bw, bh, 0.29, new THREE.MeshStandardMaterial({ color: col, roughness: 0.9 }), bx, sy + bh / 2 + 0.04, 0.08);
      book.rotation.z = rand(-0.05, 0.05);
      g.add(book);
      bx += bw + rand(0.01, 0.04);
    }
  }
  return g;
}

function makeLadder(materials, height = 3.4) {
  const g = new THREE.Group();
  const sideA = box(0.07, height, 0.07, materials.woodPale, -0.3, height / 2, 0);
  const sideB = box(0.07, height, 0.07, materials.woodPale, 0.3, height / 2, 0);
  g.add(sideA, sideB);
  for (let i = 0; i < 8; i++) {
    g.add(box(0.62, 0.055, 0.055, materials.woodPale, 0, 0.25 + i * (height - 0.3) / 8, 0));
  }
  return g;
}

function buildLibrary(keep, materials, floorY) {
  const g = new THREE.Group();
  g.position.y = floorY + 0.16;

  const rug = new THREE.Mesh(new THREE.CircleGeometry(3.1, 28), materials.rugBlue);
  rug.rotation.x = -Math.PI / 2;
  rug.position.set(0.2, 0.01, 0.7);
  rug.scale.set(1.1, 0.8, 1);
  g.add(rug);

  const shelfAngles = [3.25, 3.7, 4.15, 4.6, 5.05];
  for (let i = 0; i < shelfAngles.length; i++) {
    const a = shelfAngles[i];
    const shelf = makeBookcase(materials, 2.0, rand(2.8, 3.5), i);
    shelf.position.set(Math.cos(a) * 5.25, 0.05, Math.sin(a) * 5.25);
    shelf.rotation.y = Math.PI / 2 - a + Math.PI;
    g.add(shelf);
  }
  const freeShelfA = makeBookcase(materials, 1.7, 2.7, 22);
  freeShelfA.position.set(-3.9, 0.05, -1.4);
  freeShelfA.rotation.y = 0.22;
  g.add(freeShelfA);
  const freeShelfB = makeBookcase(materials, 1.35, 2.2, 33);
  freeShelfB.position.set(4.25, 0.05, -1.7);
  freeShelfB.rotation.y = -0.3;
  g.add(freeShelfB);

  const desk = new THREE.Group();
  desk.position.set(1.2, 0, 1.6);
  desk.rotation.y = -0.45;
  desk.add(box(2.35, 0.16, 1.15, materials.wood, 0, 0.83, 0));
  desk.add(box(0.13, 0.8, 0.13, materials.woodDark, -0.95, 0.4, -0.42));
  desk.add(box(0.13, 0.8, 0.13, materials.woodDark, 0.95, 0.4, -0.42));
  desk.add(box(0.13, 0.8, 0.13, materials.woodDark, -0.95, 0.4, 0.42));
  desk.add(box(0.13, 0.8, 0.13, materials.woodDark, 0.95, 0.4, 0.42));
  const book = box(0.75, 0.07, 0.52, materials.clothCream, -0.25, 0.95, 0.04);
  book.rotation.y = 0.22;
  desk.add(book);
  const page = box(0.66, 0.018, 0.4, materials.paper, -0.25, 1.0, 0.04);
  page.rotation.y = 0.22;
  desk.add(page);
  desk.add(cylinder(0.16, 0.1, 0.16, materials.ceramic, 0.7, 0.99, 0.18, 8));
  const candle = cylinder(0.05, 0.05, 0.42, materials.candle, 0.82, 1.16, -0.22, 6);
  desk.add(candle);
  const flame = cone(0.06, 0.18, materials.flame, 0.82, 1.44, -0.22, 5);
  desk.add(flame);
  const lamp = new THREE.PointLight(0xffc37c, 7, 7, 2);
  lamp.position.set(0.82, 1.55, -0.22);
  desk.add(lamp);
  flicker(lamp, 7, 2.1, 6);
  g.add(desk);

  const chair = new THREE.Group();
  chair.position.set(1.2, 0, 3.0);
  chair.rotation.y = Math.PI - 0.4;
  chair.add(box(0.75, 0.1, 0.75, materials.wood, 0, 0.5, 0));
  chair.add(box(0.75, 0.85, 0.1, materials.wood, 0, 0.95, -0.35));
  for (const [x, z] of [[-0.3, -0.3], [0.3, -0.3], [-0.3, 0.3], [0.3, 0.3]]) {
    chair.add(box(0.08, 0.5, 0.08, materials.woodDark, x, 0.25, z));
  }
  g.add(chair);
  const scholar = createScholar(true);
  scholar.position.set(1.15, 0, 2.85);
  scholar.rotation.y = Math.PI - 0.4;
  g.add(scholar);

  const globeStand = new THREE.Group();
  globeStand.position.set(-2.6, 0, -0.8);
  globeStand.add(cylinder(0.06, 0.08, 1.2, materials.gold, 0, 0.6, 0, 8));
  const globe = sphere(0.52, new THREE.MeshStandardMaterial({ color: 0x8caeb2, roughness: 0.65 }), 0, 1.5, 0, 12);
  globeStand.add(globe);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.035, 5, 20), materials.gold);
  ring.position.y = 1.5;
  ring.rotation.x = 0.5;
  globeStand.add(ring);
  g.add(globeStand);
  castleAnimators.push((t) => {
    globe.rotation.y = t * 0.18;
    ring.rotation.z = t * 0.13;
  });

  const ladder = makeLadder(materials, 3.3);
  ladder.position.set(4.6, 0.05, -4.2);
  ladder.rotation.y = -0.45;
  ladder.rotation.z = -0.09;
  g.add(ladder);

  const roll = cylinder(0.18, 0.18, 1.2, materials.paper, -3.9, 0.2, 2.6, 8);
  roll.rotation.z = Math.PI / 2;
  g.add(roll);

  const scrolls = new THREE.Group();
  for (let i = 0; i < 4; i++) {
    const s = cylinder(0.07, 0.07, rand(0.4, 0.8), materials.paper, -3.7 + i * 0.25, 0.15, 2.6 + rand(-0.2, 0.2), 6);
    s.rotation.z = Math.PI / 2;
    scrolls.add(s);
  }
  g.add(scrolls);

  keep.add(g);
}

function buildBedroom(keep, materials, floorY) {
  const g = new THREE.Group();
  g.position.y = floorY + 0.16;

  const rug = new THREE.Mesh(new THREE.CircleGeometry(3.2, 30), materials.rugCream);
  rug.rotation.x = -Math.PI / 2;
  rug.position.set(0.5, 0.02, 0.6);
  rug.scale.set(1.15, 0.8, 1);
  g.add(rug);
  const rugRing = new THREE.Mesh(new THREE.TorusGeometry(2.7, 0.12, 4, 30), materials.rugRed);
  rugRing.rotation.x = -Math.PI / 2;
  rugRing.scale.set(1.15, 0.8, 1);
  rugRing.position.set(0.5, 0.03, 0.6);
  g.add(rugRing);

  const bed = new THREE.Group();
  bed.position.set(-1.9, 0, -2.3);
  bed.rotation.y = 0.12;
  bed.add(box(2.7, 0.35, 1.9, materials.woodDark, 0, 0.62, 0));
  bed.add(box(2.55, 0.32, 1.75, new THREE.MeshStandardMaterial({ color: 0xf2e1c7, roughness: 1 }), 0, 0.9, 0));
  bed.add(box(2.45, 0.12, 1.68, materials.clothCream, 0, 1.08, 0));
  bed.add(box(1.95, 0.14, 1.65, materials.rugRed, 0.22, 1.16, 0));
  const pillow1 = box(0.72, 0.22, 0.55, materials.clothCream, -0.72, 1.25, -0.42);
  const pillow2 = box(0.62, 0.20, 0.5, materials.rosePale, -0.65, 1.25, 0.22);
  pillow1.rotation.y = 0.1;
  pillow2.rotation.y = -0.1;
  bed.add(pillow1, pillow2);
  bed.add(box(2.9, 1.45, 0.16, materials.woodDark, 0, 1.5, -1.0));
  for (const x of [-1.28, 1.28]) {
    for (const z of [-0.9, 0.9]) {
      bed.add(cylinder(0.07, 0.07, 3.15, materials.woodDark, x, 1.65, z, 6));
    }
  }
  const canopy = box(2.9, 0.12, 2.0, materials.clothRed, 0, 3.18, 0);
  bed.add(canopy);
  const drapeL = box(0.22, 2.4, 1.8, materials.clothRed, -1.38, 2.2, 0.0);
  const drapeR = box(0.22, 2.4, 1.8, materials.clothRed, 1.38, 2.2, 0.0);
  bed.add(drapeL, drapeR);
  const valance = box(2.9, 0.32, 0.1, materials.clothRed, 0, 2.85, 1.02);
  bed.add(valance);
  g.add(bed);

  const cat = createCat();
  cat.position.set(-0.9, 1.24, -2.1);
  cat.rotation.y = 2.4;
  cat.scale.setScalar(0.8);
  g.add(cat);

  const chest = new THREE.Group();
  chest.position.set(1.3, 0, -3.7);
  chest.add(box(1.5, 0.8, 0.9, materials.wood, 0, 0.4, 0));
  chest.add(box(1.5, 0.16, 0.95, materials.woodDark, 0, 0.84, 0));
  chest.add(box(0.26, 0.1, 0.06, materials.gold, 0, 0.56, 0.48));
  g.add(chest);

  const desk = new THREE.Group();
  desk.position.set(2.9, 0, 1.7);
  desk.rotation.y = -0.75;
  desk.add(box(1.9, 0.14, 1.0, materials.wood, 0, 0.82, 0));
  desk.add(box(0.12, 0.8, 0.12, materials.woodDark, -0.78, 0.4, -0.36));
  desk.add(box(0.12, 0.8, 0.12, materials.woodDark, 0.78, 0.4, -0.36));
  desk.add(box(0.12, 0.8, 0.12, materials.woodDark, -0.78, 0.4, 0.36));
  desk.add(box(0.12, 0.8, 0.12, materials.woodDark, 0.78, 0.4, 0.36));
  const letter = box(0.62, 0.02, 0.45, materials.paper, -0.3, 0.92, 0);
  letter.rotation.y = 0.2;
  desk.add(letter);
  const pot = cylinder(0.14, 0.1, 0.28, materials.ceramicBlue, 0.55, 1.02, 0.1, 8);
  desk.add(pot);
  const roseStem = cylinder(0.025, 0.03, 0.65, materials.leafDark, 0.55, 1.45, 0.1, 5);
  desk.add(roseStem);
  const rose = sphere(0.15, materials.rose, 0.55, 1.82, 0.1, 8);
  desk.add(rose);
  const stool = new THREE.Group();
  stool.position.set(2.9, 0, 2.8);
  stool.rotation.y = -0.7;
  stool.add(box(0.6, 0.08, 0.6, materials.woodDark, 0, 0.5, 0));
  stool.add(cylinder(0.07, 0.09, 0.5, materials.wood, 0, 0.25, 0, 6));
  g.add(desk, stool);

  const wardrobe = new THREE.Group();
  wardrobe.position.set(4.7, 0, -1.2);
  wardrobe.rotation.y = -0.85;
  wardrobe.add(box(1.5, 2.7, 0.7, materials.woodDark, 0, 1.35, 0));
  wardrobe.add(box(1.4, 2.5, 0.05, materials.wood, 0, 1.35, 0.37));
  wardrobe.add(sphere(0.05, materials.gold, -0.12, 1.35, 0.41, 6));
  wardrobe.add(sphere(0.05, materials.gold, 0.12, 1.35, 0.41, 6));
  g.add(wardrobe);

  const painting = new THREE.Group();
  painting.position.set(-4.8, 2.4, 0.1);
  painting.rotation.y = 0.2;
  painting.add(box(1.25, 1.0, 0.08, materials.gold, 0, 0, 0));
  painting.add(box(1.1, 0.86, 0.03, materials.paper, 0, 0, 0.06));
  for (let i = 0; i < 6; i++) {
    painting.add(sphere(0.035, materials.gold, rand(-0.4, 0.4), rand(-0.3, 0.3), 0.09, 4));
  }
  const paintedRose = sphere(0.18, materials.rose, 0.1, -0.1, 0.09, 8);
  paintedRose.scale.set(1, 1.2, 0.3);
  painting.add(paintedRose);
  g.add(painting);

  const curtains = new THREE.Group();
  for (const [x, z, ry] of [[-5.2, 0.3, 0.8], [0.2, -5.4, 0.1], [5.1, 2.5, -0.9]]) {
    const curtain = box(0.9, 2.5, 0.09, materials.clothBlue, x, 1.8, z);
    curtain.rotation.y = ry;
    curtains.add(curtain);
  }
  g.add(curtains);

  const toySheep = new THREE.Group();
  toySheep.position.set(-3.9, 0.08, 2.7);
  toySheep.add(sphere(0.18, materials.clothCream, 0, 0.18, 0, 6));
  toySheep.add(sphere(0.1, materials.black, 0.14, 0.15, 0, 5));
  for (const [x, z] of [[-0.1, -0.1], [0.1, -0.1], [-0.1, 0.1], [0.1, 0.1]]) {
    toySheep.add(cylinder(0.025, 0.025, 0.16, materials.black, x, 0.08, z, 4));
  }
  g.add(toySheep);

  const ladder = makeLadder(materials, 3.4);
  ladder.position.set(-4.7, 0.05, -4.0);
  ladder.rotation.y = 0.45;
  ladder.rotation.z = 0.1;
  g.add(ladder);

  const lamp = new THREE.PointLight(0xffc985, 9, 9, 2);
  lamp.position.set(-0.5, 3.1, 2.0);
  g.add(lamp);
  flicker(lamp, 9, 1.1, 3.2);

  keep.add(g);
}

function buildObservatory(keep, materials, floorY) {
  const g = new THREE.Group();
  g.position.y = floorY + 0.16;

  const rug = new THREE.Mesh(new THREE.CircleGeometry(2.2, 24), materials.rugBlue);
  rug.rotation.x = -Math.PI / 2;
  rug.position.set(-0.8, 0.02, 2.1);
  g.add(rug);

  const telescope = new THREE.Group();
  telescope.position.set(1.0, 0, 1.9);
  telescope.rotation.y = -0.4;
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2;
    const leg = cylinder(0.045, 0.055, 1.7, materials.woodDark, Math.cos(a) * 0.45, 0.82, Math.sin(a) * 0.45, 5);
    leg.rotation.z = Math.cos(a) * 0.24;
    leg.rotation.x = -Math.sin(a) * 0.24;
    telescope.add(leg);
  }
  const tube = cylinder(0.19, 0.28, 2.9, new THREE.MeshStandardMaterial({ color: 0x8a6b55, roughness: 0.6 }), 0, 1.65, 0, 12);
  tube.rotation.x = -0.72;
  tube.rotation.z = 0.2;
  telescope.add(tube);
  const lens = cylinder(0.31, 0.31, 0.12, materials.gold, 0, 2.58, 0.32, 12);
  lens.rotation.x = -0.72;
  lens.rotation.z = 0.2;
  telescope.add(lens);
  const eye = cylinder(0.07, 0.07, 0.3, materials.iron, 0.05, 0.65, -0.35, 8);
  eye.rotation.x = -0.72;
  telescope.add(eye);
  g.add(telescope);

  const armillary = new THREE.Group();
  armillary.position.set(-2.4, 0, -0.9);
  armillary.add(cylinder(0.08, 0.12, 1.2, materials.gold, 0, 0.6, 0, 8));
  armillary.add(cylinder(0.42, 0.5, 0.14, materials.woodDark, 0, 0.06, 0, 10));
  for (let i = 0; i < 3; i++) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.65 + i * 0.1, 0.028, 5, 28), materials.gold);
    ring.position.y = 1.55;
    ring.rotation.x = Math.PI / 2 + i * 0.65;
    ring.rotation.y = i * 0.7;
    armillary.add(ring);
  }
  const star = sphere(0.09, materials.gold, 0, 1.55, 0, 8);
  armillary.add(star);
  g.add(armillary);
  castleAnimators.push((t) => {
    armillary.rotation.y = t * 0.1;
    star.rotation.y = t * 0.4;
  });

  const table = new THREE.Group();
  table.position.set(-1.2, 0, 3.6);
  table.rotation.y = 0.25;
  table.add(box(1.6, 0.1, 1.0, materials.wood, 0, 0.72, 0));
  table.add(box(0.1, 0.7, 0.1, materials.woodDark, -0.6, 0.36, -0.35));
  table.add(box(0.1, 0.7, 0.1, materials.woodDark, 0.6, 0.36, -0.35));
  table.add(box(0.1, 0.7, 0.1, materials.woodDark, -0.6, 0.36, 0.35));
  table.add(box(0.1, 0.7, 0.1, materials.woodDark, 0.6, 0.36, 0.35));
  const chart = box(0.95, 0.01, 0.7, materials.clothBlue, 0, 0.79, 0);
  table.add(chart);
  for (let i = 0; i < 7; i++) {
    table.add(sphere(0.025, materials.gold, rand(-0.35, 0.35), 0.81, rand(-0.25, 0.25), 4));
  }
  const lantern = cylinder(0.12, 0.16, 0.34, materials.ceramic, 0.45, 0.94, 0.2, 8);
  table.add(lantern);
  const lanternGlow = sphere(0.12, materials.emissiveWarm, 0.45, 1.12, 0.2, 8);
  table.add(lanternGlow);
  const lLight = new THREE.PointLight(0xffbf7a, 8, 7, 2);
  lLight.position.set(-1.2, 1.35, 3.6);
  table.add(lLight);
  flicker(lLight, 8, 3.1, 5);
  g.add(table);

  const cushions = new THREE.Group();
  for (let i = 0; i < 3; i++) {
    const c = box(0.85, 0.18, 0.85, i === 0 ? materials.clothRed : materials.clothCream, -2.7 + i * 0.95, 0.15, 1.9);
    c.rotation.y = rand(-0.4, 0.4);
    cushions.add(c);
  }
  g.add(cushions);

  const pot = cylinder(0.26, 0.2, 0.5, materials.ceramicBlue, -1.8, 0.25, 4.3, 8);
  g.add(pot);
  const bush = sphere(0.45, materials.leafDark, -1.8, 0.75, 4.3, 8);
  g.add(bush);
  for (let i = 0; i < 4; i++) {
    g.add(sphere(0.1, materials.rose, -1.8 + rand(-0.3, 0.3), 1.1 + rand(-0.1, 0.2), 4.3 + rand(-0.2, 0.2), 5));
  }

  const bannerPole = cylinder(0.03, 0.03, 2.7, materials.woodDark, 4.6, 1.4, 2.6, 5);
  g.add(bannerPole);
  const banner = box(1.0, 1.8, 0.03, materials.clothBlue, 4.1, 1.9, 2.6);
  g.add(banner);
  for (let i = 0; i < 6; i++) {
    g.add(sphere(0.03, materials.gold, 4.1 + rand(-0.35, 0.35), 1.9 + rand(-0.6, 0.6), 2.63, 4));
  }

  const stargazer = createScholar(false);
  stargazer.position.set(2.4, 0.02, 2.8);
  stargazer.rotation.y = -1.9;
  stargazer.scale.setScalar(0.92);
  g.add(stargazer);

  const bookStack = new THREE.Group();
  bookStack.position.set(3.0, 0.06, 0.9);
  for (let i = 0; i < 4; i++) {
    const b = box(0.55 + i * 0.04, 0.07, 0.4, i % 2 ? materials.clothBlue : materials.clothCream, rand(-0.05, 0.05), 0.05 + i * 0.075, rand(-0.04, 0.04));
    b.rotation.y = rand(-0.2, 0.2);
    bookStack.add(b);
  }
  g.add(bookStack);

  keep.add(g);
}

function makeTable(materials) {
  const g = new THREE.Group();
  g.add(box(7.8, 0.18, 1.9, materials.wood, 0, 1.0, 0));
  g.add(box(5.4, 0.02, 0.78, materials.clothCream, 0, 1.1, 0));
  for (const x of [-3.3, 3.3]) {
    for (const z of [-0.75, 0.75]) {
      g.add(box(0.18, 0.9, 0.18, materials.woodDark, x, 0.55, z));
    }
  }
  for (const x of [-2.3, 0, 2.3]) {
    const plate = cylinder(0.22, 0.24, 0.04, materials.ceramic, x, 1.14, rand(-0.35, 0.35), 12);
    g.add(plate);
    const cup = cylinder(0.07, 0.08, 0.18, materials.goldSoft, x + 0.42, 1.2, -0.2, 8);
    g.add(cup);
  }
  const candle1 = cylinder(0.055, 0.055, 0.55, materials.candle, -1.2, 1.36, 0.1, 6);
  const candle2 = cylinder(0.055, 0.055, 0.55, materials.candle, 1.2, 1.36, 0.1, 6);
  g.add(candle1, candle2);
  const fl1 = cone(0.07, 0.2, materials.flame, -1.2, 1.75, 0.1, 5);
  const fl2 = cone(0.07, 0.2, materials.flame, 1.2, 1.75, 0.1, 5);
  g.add(fl1, fl2);
  const platter = cylinder(0.42, 0.42, 0.05, materials.goldSoft, 0, 1.15, 0, 14);
  g.add(platter);
  g.add(sphere(0.18, new THREE.MeshStandardMaterial({ color: 0xb06f54, roughness: 0.8 }), 0, 1.25, 0, 8));
  for (let i = 0; i < 8; i++) {
    const grape = sphere(0.055, new THREE.MeshStandardMaterial({ color: 0x7b5f8f, roughness: 0.6 }), -0.7 + (i % 4) * 0.08, 1.18 + Math.floor(i / 4) * 0.08, 0.25, 5);
    g.add(grape);
  }
  return g;
}

function makeChair(materials, x, z, ry) {
  const g = new THREE.Group();
  g.position.set(x, 0, z);
  g.rotation.y = ry;
  g.add(box(0.7, 0.12, 0.7, materials.wood, 0, 0.55, 0));
  g.add(box(0.68, 1.15, 0.1, materials.woodDark, 0, 1.05, -0.31));
  g.add(box(0.52, 0.1, 0.08, materials.wood, 0, 0.8, -0.31));
  for (const [dx, dz] of [[-0.27, -0.27], [0.27, -0.27], [-0.27, 0.27], [0.27, 0.27]]) {
    g.add(box(0.08, 0.55, 0.08, materials.woodDark, dx, 0.28, dz));
  }
  return g;
}

function makeThrone(materials) {
  const g = new THREE.Group();
  g.add(box(2.7, 0.28, 2.1, materials.stoneLight, 0, 0.14, 0));
  g.add(box(2.2, 0.26, 1.7, materials.stone, 0, 0.4, 0));
  g.add(box(1.7, 0.62, 1.15, materials.woodDark, 0, 0.82, 0.1));
  const back = box(1.7, 2.2, 0.25, materials.woodDark, 0, 1.85, -0.4);
  back.rotation.x = -0.05;
  g.add(back);
  g.add(box(1.5, 0.55, 0.16, materials.clothRed, 0, 1.6, -0.24));
  g.add(box(1.3, 0.02, 0.9, materials.clothRed, 0, 1.15, 0.15));
  for (let i = 0; i < 7; i++) {
    const a = -0.55 + i * 0.18;
    const finial = sphere(0.07, materials.gold, Math.cos(a) * 0.78, 2.95, -0.4 + Math.sin(a) * 0.2, 6);
    g.add(finial);
  }
  const crown = cone(0.09, 0.3, materials.gold, 0, 3.12, -0.4, 6);
  g.add(crown);
  for (let i = -1; i <= 1; i++) {
    g.add(box(0.2, 0.04, 1.15, materials.rugRed, i * 0.45, 0.58, 0.95));
  }
  return g;
}

function makeHallFireplace(materials) {
  const g = new THREE.Group();
  g.position.set(-4.95, 0, 0.0);
  g.rotation.y = Math.PI / 2;
  g.add(box(3.1, 0.55, 1.3, materials.stoneDark, 0, 0.27, 0));
  g.add(box(0.45, 3.4, 1.4, materials.stone, -1.35, 1.7, 0));
  g.add(box(0.45, 3.4, 1.4, materials.stone, 1.35, 1.7, 0));
  g.add(box(3.15, 0.5, 1.5, materials.stoneLight, 0, 3.35, 0));
  g.add(box(2.25, 2.75, 0.2, new THREE.MeshStandardMaterial({ color: 0x4f4139, roughness: 1 }), 0, 1.7, -0.55));
  for (let i = 0; i < 4; i++) {
    const log = cylinder(0.16, 0.18, 1.5, materials.woodDark, -0.55 + i * 0.35, 0.55, 0.15, 6);
    log.rotation.z = Math.PI / 2;
    log.rotation.y = rand(-0.3, 0.3);
    g.add(log);
  }
  const flameMat = new THREE.MeshBasicMaterial({ color: 0xffb35f, transparent: true, opacity: 0.9 });
  const flame = cone(0.55, 1.3, flameMat, 0, 1.15, 0.12, 7);
  const flame2 = cone(0.32, 0.9, new THREE.MeshBasicMaterial({ color: 0xffe4a8, transparent: true, opacity: 0.9 }), 0.28, 1.0, 0.12, 6);
  g.add(flame, flame2);
  const light = new THREE.PointLight(0xff9a4e, 26, 13, 2);
  light.position.set(0, 1.8, 0.8);
  g.add(light);
  flicker(light, 26, 0.9, 6);
  castleAnimators.push((t) => {
    flame.scale.y = 0.84 + Math.sin(t * 6.7) * 0.17;
    flame2.scale.y = 0.82 + Math.sin(t * 8.3 + 2) * 0.2;
  });
  const mantelClutter = new THREE.Group();
  for (let i = 0; i < 3; i++) {
    const candle = cylinder(0.04, 0.04, 0.3, materials.candle, -0.8 + i * 0.8, 3.72, 0.12, 5);
    mantelClutter.add(candle);
    mantelClutter.add(cone(0.05, 0.14, materials.flame, -0.8 + i * 0.8, 3.93, 0.12, 4));
  }
  g.add(mantelClutter);
  return g;
}

function buildGreatHall(materials, anchors) {
  const hall = new THREE.Group();
  const cx = -10.6;
  const cz = 4.8;
  const floorY = GROUND_Y + 0.98;

  const foundation = box(13.9, 1.0, 10.1, materials.stoneDark, cx, GROUND_Y + 0.48, cz);
  hall.add(foundation);
  const floor = box(13.7, 0.22, 9.9, materials.stoneLight, cx, floorY - 0.02, cz);
  floor.receiveShadow = true;
  hall.add(floor);

  const wallH = 6.6;
  hall.add(box(13.7, wallH, 0.5, materials.stone, cx, floorY + wallH / 2, cz - 4.8));
  hall.add(box(0.5, wallH, 9.8, materials.stone, cx - 6.85, floorY + wallH / 2, cz));
  const sideCols = [cz - 4.4, cz - 1.6, cz + 1.2, cz + 4.4];
  for (const z of sideCols) {
    hall.add(cylinder(0.25, 0.33, 4.7, materials.stoneLight, cx + 6.85, floorY + 2.35, z, 10));
    hall.add(box(0.78, 0.16, 0.78, materials.stone, cx + 6.85, floorY + 4.78, z));
  }
  for (let i = 0; i < sideCols.length - 1; i++) {
    addArch(hall, materials, cx + 6.85, (sideCols[i] + sideCols[i + 1]) / 2, sideCols[i + 1] - sideCols[i], 0.95, floorY + 4.8, materials.stone, Math.PI / 2);
  }

  for (let i = 0; i < 4; i++) {
    const z = cz - 4.2 + i * 2.8;
    const buttress = box(0.8, 5.2, 0.9, materials.stoneLight, cx - 7.25, floorY + 2.6, z);
    hall.add(buttress);
    const cap = cone(0.65, 1.1, materials.stoneDark, cx - 7.25, floorY + 5.7, z, 4);
    cap.rotation.y = Math.PI / 4;
    hall.add(cap);
  }

  for (let i = 0; i < 3; i++) {
    addPointedWindow(hall, materials, cx - 3.6 + i * 3.6, floorY + 2.1, cz - 4.55, 1.0, 2.3, 0, true);
  }
  addPointedWindow(hall, materials, cx - 6.84, floorY + 2.0, cz - 1.4, 0.8, 1.9, Math.PI / 2, true);
  addPointedWindow(hall, materials, cx - 6.84, floorY + 2.0, cz + 2.4, 0.8, 1.9, Math.PI / 2, true);

  const beamMat = materials.woodDark;
  const ridgeY = floorY + 7.8;
  const ridge = box(14.0, 0.24, 0.3, beamMat, cx, ridgeY, cz + 0.1);
  hall.add(ridge);
  for (let i = 0; i < 7; i++) {
    const x = cx - 6.2 + i * 2.05;
    const len = 5.4;
    const rafter = box(0.16, 0.18, len, beamMat, x, ridgeY - 1.3, cz + 0.2);
    rafter.rotation.x = 0.62;
    hall.add(rafter);
    hall.add(box(0.14, 0.6, 0.14, beamMat, x, ridgeY - 0.55, cz + 0.2));
  }
  const backRoof = box(14.1, 0.24, 4.9, materials.roof, cx, floorY + 7.15, cz - 2.75);
  backRoof.rotation.x = -0.63;
  hall.add(backRoof);
  for (let i = 0; i < 9; i++) {
    const tile = box(14.15, 0.07, 0.32, materials.roofLight, cx, floorY + 7.2 - i * 0.32, cz - 5.2 + i * 0.5);
    tile.rotation.x = -0.63;
    hall.add(tile);
  }

  const colXs = [cx - 6.6, cx - 3.3, cx, cx + 3.3, cx + 6.6];
  for (const x of colXs) {
    hall.add(cylinder(0.28, 0.36, 4.7, materials.stoneLight, x, floorY + 2.35, cz + 4.85, 10));
    hall.add(box(0.9, 0.18, 0.9, materials.stone, x, floorY + 4.78, cz + 4.85));
  }
  for (let i = 0; i < 4; i++) {
    const x0 = colXs[i];
    const x1 = colXs[i + 1];
    addArch(hall, materials, (x0 + x1) / 2, cz + 4.85, x1 - x0, 1.55, floorY + 4.85, materials.stone, 0);
  }

  const frontParapet = box(13.7, 0.7, 0.3, materials.stone, cx, floorY + 7.0, cz + 4.82);
  hall.add(frontParapet);

  for (const x of colXs) {
    const planter = box(0.92, 0.26, 0.36, materials.woodPale, x, floorY + 3.15, cz + 5.08);
    hall.add(planter);
    for (let i = 0; i < 5; i++) {
      const flower = sphere(0.08, i % 2 ? materials.rose : materials.rosePale, x - 0.32 + i * 0.16, floorY + 3.38, cz + 5.1 + rand(-0.06, 0.06), 5);
      flower.castShadow = false;
      hall.add(flower);
    }
    const ivy = new THREE.Group();
    for (let i = 0; i < 5; i++) {
      const leaf = sphere(0.12, i % 2 ? materials.leaf : materials.leafDark, x + rand(-0.25, 0.25), floorY + 2.4 + i * 0.12, cz + 5.02, 5);
      leaf.scale.set(1.3, 0.4, 0.4);
      leaf.castShadow = false;
      ivy.add(leaf);
    }
    hall.add(ivy);
  }
  for (const side of [-1, 1]) {
    const banner = box(1.0, 2.0, 0.04, side < 0 ? materials.clothBlue : materials.clothRed, cx + side * 4.85, floorY + 5.9, cz + 4.94);
    hall.add(banner);
    const moon = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.04, 4, 14, Math.PI * 1.35), materials.gold);
    moon.position.set(banner.position.x, floorY + 6.0, cz + 4.98);
    hall.add(moon);
  }

  const rug = box(8.6, 0.03, 5.4, materials.rugRed, cx, floorY + 0.14, cz + 0.1);
  hall.add(rug);
  const rugBorder = box(8.9, 0.02, 5.7, materials.rugCream, cx, floorY + 0.13, cz + 0.1);
  hall.add(rugBorder);

  const table = makeTable(materials);
  table.position.set(cx + 0.1, floorY, cz + 0.6);
  hall.add(table);
  const chairPositions = [
    [cx - 2.2, cz + 2.25, Math.PI], [cx + 0.2, cz + 2.25, Math.PI], [cx + 2.6, cz + 2.25, Math.PI],
    [cx - 2.2, cz - 1.05, 0], [cx + 0.2, cz - 1.05, 0], [cx + 2.6, cz - 1.05, 0],
  ];
  for (const [x, z, ry] of chairPositions) {
    hall.add(makeChair(materials, x, floorY, z, ry));
  }

  const throne = makeThrone(materials);
  throne.position.set(cx - 3.1, floorY, cz - 3.85);
  throne.rotation.y = 0.04;
  hall.add(throne);
  const king = createKing();
  king.position.set(cx - 3.1, floorY + 0.58, cz - 3.85);
  king.rotation.y = 0.0;
  hall.add(king);

  const fireplace = makeHallFireplace(materials);
  fireplace.position.set(cx - 5.4, floorY, cz + 0.3);
  hall.add(fireplace);

  const chandelier = new THREE.Group();
  chandelier.position.set(cx + 0.1, floorY + 6.6, cz + 0.2);
  const chain = cylinder(0.03, 0.03, 2.0, materials.iron, 0, 1.0, 0, 5);
  chandelier.add(chain);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(1.3, 0.07, 6, 24), materials.iron);
  ring.rotation.x = Math.PI / 2;
  chandelier.add(ring);
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    const candle = cylinder(0.045, 0.045, 0.42, materials.candle, Math.cos(a) * 1.28, 0.2, Math.sin(a) * 1.28, 5);
    chandelier.add(candle);
    const flame = cone(0.055, 0.16, materials.flame, Math.cos(a) * 1.28, 0.48, Math.sin(a) * 1.28, 4);
    chandelier.add(flame);
  }
  const chanLight = new THREE.PointLight(0xffbd78, 26, 14, 2);
  chanLight.position.set(0, 0.2, 0);
  chandelier.add(chanLight);
  flicker(chanLight, 26, 0.3, 4.5);
  castleAnimators.push((t) => {
    chandelier.rotation.y = Math.sin(t * 0.3) * 0.03;
  });
  hall.add(chandelier);

  for (let i = 0; i < 3; i++) {
    const banner = box(1.35, 2.9, 0.04, i === 1 ? materials.clothBlue : materials.clothRed, cx - 3 + i * 3, floorY + 4.1, cz - 4.54);
    hall.add(banner);
    const emblem = sphere(0.22, materials.gold, banner.position.x, floorY + 4.4, cz - 4.5, 8);
    emblem.scale.z = 0.2;
    hall.add(emblem);
    for (let j = 0; j < 3; j++) {
      const star = sphere(0.05, materials.gold, banner.position.x + rand(-0.4, 0.4), floorY + 3.3 + rand(-0.3, 0.5), cz - 4.5, 4);
      hall.add(star);
    }
  }

  const tapestry = new THREE.Group();
  tapestry.position.set(cx + 0.1, floorY + 4.35, cz - 4.45);
  tapestry.add(box(3.5, 2.55, 0.06, materials.gold, 0, 0, 0));
  tapestry.add(box(3.2, 2.25, 0.04, materials.clothBlue, 0, 0, 0.05));
  const moonT = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.1, 4, 20, Math.PI * 1.45), materials.gold);
  moonT.position.set(0.25, 0.25, 0.1);
  moonT.rotation.z = 0.45;
  tapestry.add(moonT);
  for (let i = 0; i < 10; i++) {
    const star = sphere(0.035, materials.gold, rand(-1.25, 1.25), rand(-0.85, 0.85), 0.1, 4);
    star.castShadow = false;
    tapestry.add(star);
  }
  for (let i = 0; i < 5; i++) {
    const tree = cone(0.12, 0.38, materials.clothGreen, -1.2 + i * 0.6, -0.55, 0.1, 5);
    tapestry.add(tree);
  }
  hall.add(tapestry);

  const page = createPage();
  page.position.set(cx + 4.7, floorY, cz + 3.0);
  page.rotation.y = -1.2;
  hall.add(page);
  const dog = createDog();
  dog.position.set(cx + 4.9, floorY, cz + 0.8);
  dog.rotation.y = 2.4;
  hall.add(dog);

  const sideboard = new THREE.Group();
  sideboard.position.set(cx + 5.5, floorY, cz - 3.9);
  sideboard.add(box(2.0, 0.85, 0.8, materials.woodDark, 0, 0.5, 0));
  for (let i = 0; i < 4; i++) {
    const cup = cylinder(0.08, 0.09, 0.2, materials.goldSoft, -0.7 + i * 0.45, 1.0, 0, 6);
    sideboard.add(cup);
  }
  hall.add(sideboard);

  anchors.greatHall = new THREE.Object3D();
  anchors.greatHall.position.set(cx, floorY, cz + 3.6);
  hall.add(anchors.greatHall);

  return hall;
}

function buildChapel(materials, anchors) {
  const chapel = new THREE.Group();
  const cx = 11.0;
  const cz = 4.9;
  const floorY = GROUND_Y + 1.0;

  chapel.add(box(8.3, 0.9, 9.4, materials.stoneDark, cx, GROUND_Y + 0.45, cz));
  const floor = box(8.1, 0.22, 9.2, materials.stoneLight, cx, floorY, cz);
  floor.receiveShadow = true;
  chapel.add(floor);

  const wallH = 6.2;
  chapel.add(box(0.5, wallH, 9.2, materials.stone, cx - 4.05, floorY + wallH / 2, cz));
  chapel.add(box(8.3, wallH, 0.5, materials.stone, cx, floorY + wallH / 2, cz - 4.6));

  const frontZ = cz + 4.6;
  chapel.add(box(2.55, wallH, 0.5, materials.stone, cx - 2.85, floorY + wallH / 2, frontZ));
  chapel.add(box(2.55, wallH, 0.5, materials.stone, cx + 2.85, floorY + wallH / 2, frontZ));
  chapel.add(box(3.2, wallH - 3.2, 0.5, materials.stone, cx, floorY + 3.2 + (wallH - 3.2) / 2, frontZ));
  const doorArch = addPointedWindow(chapel, materials, cx, floorY, frontZ + 0.26, 2.0, 3.15, 0, true);
  doorArch.scale.set(1.2, 1.2, 1);
  doorArch.position.y = floorY;
  if (doorArch.children[0]) doorArch.children[0].material = materials.woodDark;
  for (let i = 0; i < 2; i++) {
    const band = box(2.08, 0.13, 0.06, materials.iron, cx, floorY + 1.15 + i * 1.02, frontZ + 0.36);
    chapel.add(band);
  }
  const handle = sphere(0.07, materials.gold, cx + 0.55, floorY + 1.35, frontZ + 0.42, 6);
  chapel.add(handle);

  const gableShape = new THREE.Shape();
  gableShape.moveTo(-4.15, 0);
  gableShape.lineTo(4.15, 0);
  gableShape.lineTo(0, 2.4);
  gableShape.closePath();
  const gableGeo = new THREE.ExtrudeGeometry(gableShape, { depth: 0.5, bevelEnabled: false });
  const gableFront = new THREE.Mesh(gableGeo, materials.stone);
  gableFront.position.set(cx, floorY + wallH, frontZ + 0.0);
  gableFront.castShadow = true;
  chapel.add(gableFront);
  const gableBack = gableFront.clone();
  gableBack.position.z = cz - 4.6;
  chapel.add(gableBack);

  const roofAngle = 0.61;
  const roofL = box(4.75, 0.26, 9.6, materials.roof, cx - 2.0, floorY + 7.55, cz);
  roofL.rotation.z = -roofAngle;
  const roofR = box(4.75, 0.26, 9.6, materials.roof, cx + 2.0, floorY + 7.55, cz);
  roofR.rotation.z = roofAngle;
  chapel.add(roofL, roofR);
  const ridge = box(0.24, 0.3, 9.7, materials.roofLight, cx, floorY + 8.6, cz);
  chapel.add(ridge);

  const rose = new THREE.Group();
  rose.position.set(cx, floorY + 6.0, frontZ + 0.29);
  const roseRing = new THREE.Mesh(new THREE.TorusGeometry(1.05, 0.13, 6, 28), materials.stoneLight);
  rose.add(roseRing);
  const roseGlass = new THREE.Mesh(new THREE.CircleGeometry(0.98, 28), materials.stained);
  roseGlass.position.z = 0.02;
  rose.add(roseGlass);
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    const spoke = box(0.05, 0.98, 0.04, materials.stoneLight, Math.cos(a) * 0.49, Math.sin(a) * 0.49, 0.05);
    spoke.rotation.z = -a;
    rose.add(spoke);
  }
  chapel.add(rose);
  const roseLight = new THREE.PointLight(0xffc79a, 6, 6, 2);
  roseLight.position.set(cx, floorY + 5.5, frontZ - 1.2);
  chapel.add(roseLight);
  flicker(roseLight, 6, 0.8, 2);

  for (let i = 0; i < 4; i++) {
    const step = box(4.8 - i * 0.34, 0.18, 0.8, i % 2 ? materials.stone : materials.stoneLight, cx, floorY - 0.1 - i * 0.17, frontZ + 0.6 + i * 0.65);
    step.receiveShadow = true;
    chapel.add(step);
  }
  for (const side of [-1, 1]) {
    const bx = cx + side * 3.72;
    const buttress = box(0.55, 5.1, 0.7, materials.stone, bx, floorY + 2.5, frontZ + 0.12);
    chapel.add(buttress);
    const cap = cone(0.5, 0.9, materials.stoneDark, bx, floorY + 5.5, frontZ + 0.12, 4);
    cap.rotation.y = Math.PI / 4;
    chapel.add(cap);

    const niche = addPointedWindow(chapel, materials, cx + side * 2.7, floorY + 1.05, frontZ + 0.27, 0.86, 1.85, 0, false);
    if (niche.children[0]) {
      niche.children[0].material = new THREE.MeshStandardMaterial({ color: 0x6c5b54, roughness: 1 });
    }
    const statue = new THREE.Group();
    statue.position.set(cx + side * 2.7, floorY + 1.28, frontZ + 0.43);
    statue.add(cone(0.19, 0.75, materials.stoneLight, 0, 0.38, 0, 8));
    statue.add(sphere(0.13, materials.stoneLight, 0, 0.9, 0, 8));
    chapel.add(statue);

    const banner = box(0.55, 1.9, 0.04, side < 0 ? materials.clothBlue : materials.clothRed, cx + side * 1.32, floorY + 3.2, frontZ + 0.3);
    chapel.add(banner);
    for (let j = 0; j < 3; j++) {
      const star = sphere(0.035, materials.gold, banner.position.x + rand(-0.16, 0.16), floorY + 2.7 + j * 0.36, frontZ + 0.34, 4);
      chapel.add(star);
    }
    const holder = box(0.03, 0.9, 0.03, materials.iron, cx + side * 1.32, floorY + 3.95, frontZ + 0.3);
    chapel.add(holder);
  }
  chapel.add(box(8.2, 0.14, 0.2, materials.stoneLight, cx, floorY + 4.45, frontZ + 0.29));

  const chapelIvy = new THREE.Group();
  for (let i = 0; i < 24; i++) {
    const side = i % 2 ? 1 : -1;
    const leaf = sphere(rand(0.1, 0.2), i % 3 ? materials.leaf : materials.leafDark, cx + side * (3.62 + rand(-0.18, 0.18)), floorY + rand(0.3, 4.6), frontZ + 0.34 + rand(-0.08, 0.08), 5);
    leaf.scale.set(1.3, 0.45, 0.4);
    leaf.castShadow = false;
    chapelIvy.add(leaf);
  }
  chapel.add(chapelIvy);

  const backGlass = addPointedWindow(chapel, materials, cx, floorY + 2.4, cz - 4.32, 1.45, 3.0, 0, false);
  if (backGlass.children[0]) backGlass.children[0].material = materials.stained;
  const backGlow = new THREE.PointLight(0xffc188, 8, 8, 2);
  backGlow.position.set(cx, floorY + 3.2, cz - 3.1);
  chapel.add(backGlow);
  flicker(backGlow, 8, 2.4, 1.8);

  for (let i = 0; i < 5; i++) {
    const z = cz - 3.2 + i * 1.65;
    const rafter = box(8.0, 0.16, 0.18, materials.woodDark, cx, floorY + 6.2, z);
    chapel.add(rafter);
  }

  const altar = new THREE.Group();
  altar.position.set(cx, floorY, cz - 3.45);
  altar.add(box(3.0, 0.3, 1.2, materials.stoneLight, 0, 0.15, 0));
  altar.add(box(2.6, 1.05, 1.0, materials.stone, 0, 0.68, 0));
  altar.add(box(2.9, 0.14, 1.2, materials.clothCream, 0, 1.27, 0));
  const altarCandleL = cylinder(0.06, 0.06, 0.65, materials.candle, -0.9, 1.65, 0.1, 6);
  const altarCandleR = altarCandleL.clone();
  altarCandleR.position.x = 0.9;
  altar.add(altarCandleL, altarCandleR);
  altar.add(cone(0.08, 0.22, materials.flame, -0.9, 2.07, 0.1, 5));
  altar.add(cone(0.08, 0.22, materials.flame, 0.9, 2.07, 0.1, 5));
  const crossV = box(0.12, 0.9, 0.08, materials.goldSoft, 0, 2.1, -0.1);
  const crossH = box(0.55, 0.11, 0.08, materials.goldSoft, 0, 2.2, -0.1);
  altar.add(crossV, crossH);
  const altarLight = new THREE.PointLight(0xffc07e, 11, 8, 2);
  altarLight.position.set(0, 2.2, 0.6);
  altar.add(altarLight);
  flicker(altarLight, 11, 1.7, 3.5);
  chapel.add(altar);

  const statue = new THREE.Group();
  statue.position.set(cx, 0, cz - 2.7);
  statue.add(cylinder(0.55, 0.7, 0.35, materials.stoneLight, 0, 0.17, 0, 10));
  const body = cone(0.34, 1.3, materials.stoneLight, 0, 0.95, 0, 10);
  statue.add(body);
  const head = sphere(0.24, materials.stoneLight, 0, 1.72, 0, 10);
  statue.add(head);
  const halo = new THREE.Mesh(new THREE.TorusGeometry(0.31, 0.035, 4, 16), materials.gold);
  halo.position.set(0, 1.8, -0.18);
  statue.add(halo);
  chapel.add(statue);

  for (let row = 0; row < 4; row++) {
    for (const side of [-1, 1]) {
      const pew = new THREE.Group();
      pew.position.set(cx + side * 1.75, floorY, cz - 1.0 + row * 1.25);
      pew.add(box(2.6, 0.12, 0.45, materials.wood, 0, 0.52, 0));
      pew.add(box(2.6, 0.85, 0.1, materials.woodDark, 0, 0.95, -0.24));
      pew.add(box(0.12, 0.52, 0.42, materials.woodDark, -1.15, 0.26, 0));
      pew.add(box(0.12, 0.52, 0.42, materials.woodDark, 1.15, 0.26, 0));
      chapel.add(pew);
    }
  }

  const sideWindows = [2.4, 0.3, -1.8];
  for (const z of sideWindows) {
    addPointedWindow(chapel, materials, cx - 4.04, floorY + 2.5, cz + z, 0.8, 2.1, -Math.PI / 2, false).traverse((o) => {
      if (o.isMesh) o.material = materials.stained;
    });
  }

  const censer = new THREE.Group();
  censer.position.set(cx + 1.4, floorY + 5.5, cz + 0.3);
  censer.add(cylinder(0.02, 0.02, 2.4, materials.iron, 0, 1.2, 0, 4));
  const bowl = sphere(0.2, materials.gold, 0, 0, 0, 8);
  bowl.scale.y = 0.7;
  censer.add(bowl);
  chapel.add(censer);
  castleAnimators.push((t) => {
    censer.rotation.z = Math.sin(t * 0.5) * 0.05;
  });

  const bellTower = createTower(materials, {
    x: 15.4, z: 0.5, radius: 1.45, height: 13.4, roofHeight: 3.6,
    roofMat: materials.roof, flag: true, windows: 2,
  });
  chapel.add(bellTower);

  anchors.chapel = new THREE.Object3D();
  anchors.chapel.position.set(cx + 1.0, floorY, cz + 1.8);
  chapel.add(anchors.chapel);

  return chapel;
}

function buildCourtyard(materials, anchors) {
  const g = new THREE.Group();
  const baseY = GROUND_Y + 0.14;

  const slab = box(34, 0.28, 7.2, materials.stoneLight, 0, baseY, 11.2);
  slab.receiveShadow = true;
  g.add(slab);
  for (let i = 0; i < 40; i++) {
    const x = rand(-16.5, 16.5);
    const z = rand(7.8, 14.4);
    const tone = new THREE.Color(0xd8c8af).offsetHSL(0, 0, rand(-0.05, 0.05));
    const tile = new THREE.Mesh(new THREE.PlaneGeometry(rand(0.7, 1.2), rand(0.45, 0.8)), new THREE.MeshStandardMaterial({ color: tone, roughness: 1 }));
    tile.rotation.x = -Math.PI / 2;
    tile.position.set(x, baseY + 0.15, z);
    g.add(tile);
  }

  const step1 = box(6.4, 0.16, 1.0, materials.stone, 0, baseY - 0.02, 15.1);
  const step2 = box(7.2, 0.12, 0.8, materials.stoneLight, 0, baseY - 0.12, 15.7);
  g.add(step1, step2);

  const well = new THREE.Group();
  well.position.set(2.8, baseY, 11.7);
  well.add(cylinder(1.1, 1.2, 0.9, materials.stone, 0, 0.45, 0, 16));
  well.add(cylinder(0.85, 0.85, 0.05, materials.waterDark, 0, 0.88, 0, 16));
  well.add(cylinder(0.14, 0.18, 2.2, materials.woodDark, -0.8, 2.0, 0, 6));
  well.add(cylinder(0.14, 0.18, 2.2, materials.woodDark, 0.8, 2.0, 0, 6));
  well.add(box(2.0, 0.18, 0.18, materials.woodDark, 0, 3.1, 0));
  const bucket = cylinder(0.24, 0.2, 0.34, materials.woodPale, 0, 1.2, 0, 8);
  well.add(bucket);
  const rope = cylinder(0.018, 0.018, 1.7, materials.woodDark, 0, 2.1, 0, 4);
  well.add(rope);
  g.add(well);

  const stall = new THREE.Group();
  stall.position.set(-14.6, baseY, 12.4);
  stall.rotation.y = 0.35;
  stall.add(box(3.0, 0.18, 1.5, materials.wood, 0, 1.0, 0));
  stall.add(box(0.12, 1.0, 0.12, materials.woodDark, -1.35, 0.5, -0.6));
  stall.add(box(0.12, 1.0, 0.12, materials.woodDark, 1.35, 0.5, -0.6));
  stall.add(box(0.12, 1.0, 0.12, materials.woodDark, -1.35, 0.5, 0.6));
  stall.add(box(0.12, 1.0, 0.12, materials.woodDark, 1.35, 0.5, 0.6));
  for (let i = 0; i < 4; i++) {
    stall.add(box(3.2, 0.06, 0.35, i % 2 ? materials.clothCream : materials.clothRed, 0, 3.25 - i * 0.06, -0.85 + i * 0.5));
  }
  stall.add(box(0.08, 2.3, 0.08, materials.woodDark, -1.5, 2.1, -0.7));
  stall.add(box(0.08, 2.3, 0.08, materials.woodDark, 1.5, 2.1, -0.7));
  for (let i = 0; i < 6; i++) {
    stall.add(sphere(0.13, i % 2 ? materials.rose : materials.ceramicBlue, -1.1 + i * 0.44, 1.18, 0.1, 7));
  }
  g.add(stall);

  const dummy = new THREE.Group();
  dummy.position.set(7.6, baseY, 12.6);
  dummy.add(cylinder(0.08, 0.1, 1.8, materials.woodDark, 0, 0.9, 0, 6));
  dummy.add(cylinder(0.48, 0.38, 0.9, materials.woodPale, 0, 1.65, 0, 8));
  dummy.add(sphere(0.26, materials.woodPale, 0, 2.35, 0, 8));
  dummy.add(box(1.35, 0.12, 0.12, materials.woodDark, 0, 1.95, 0));
  dummy.add(cylinder(0.18, 0.24, 0.5, materials.iron, 0, 2.38, 0, 8));
  g.add(dummy);

  const knight = createKnight();
  knight.position.set(6.2, baseY + 0.15, 13.1);
  knight.rotation.y = -1.5;
  g.add(knight);

  const chicken = createChicken();
  chicken.position.set(-2.0, baseY + 0.16, 13.2);
  chicken.rotation.y = 0.7;
  g.add(chicken);
  const chicken2 = createChicken();
  chicken2.position.set(-1.3, baseY + 0.16, 13.4);
  chicken2.rotation.y = -0.3;
  chicken2.scale.setScalar(0.85);
  g.add(chicken2);

  const crates = new THREE.Group();
  crates.position.set(-10.3, baseY, 13.1);
  for (let i = 0; i < 3; i++) {
    crates.add(box(0.9, 0.8, 0.9, materials.woodPale, i * 0.55, 0.4 + (i === 2 ? 0.8 : 0), i * 0.3));
  }
  g.add(crates);

  const barrels = new THREE.Group();
  barrels.position.set(10.8, baseY, 12.2);
  for (let i = 0; i < 3; i++) {
    barrels.add(cylinder(0.4, 0.46, 1.15, materials.woodPale, i * 0.9, 0.58, 0, 10));
  }
  g.add(barrels);

  for (const x of [-2.7, 2.7]) {
    const post = new THREE.Group();
    post.position.set(x, baseY, 15.4);
    post.add(box(0.38, 2.8, 0.38, materials.stone, 0, 1.4, 0));
    post.add(box(0.7, 0.3, 0.7, materials.stoneLight, 0, 2.9, 0));
    const lantern = box(0.36, 0.48, 0.36, materials.emissiveWarm, 0, 3.25, 0.25);
    post.add(lantern);
    const l = new THREE.PointLight(0xffb96c, 8, 7, 2);
    l.position.set(0, 3.2, 0.5);
    post.add(l);
    flicker(l, 8, x, 3);
    g.add(post);
  }

  const ivy = new THREE.Group();
  for (let i = 0; i < 16; i++) {
    const b = sphere(0.22, i % 2 ? materials.leaf : materials.leafDark, -17.2 + rand(-0.3, 0.4), floorRand(1, 4.2), 9.7 + rand(-0.4, 0.4), 5);
    b.scale.set(0.7, 1.4, 0.35);
    ivy.add(b);
  }
  g.add(ivy);

  return g;
}

function floorRand(a, b) {
  return a + Math.random() * (b - a);
}

function buildStable(materials, anchors) {
  const g = new THREE.Group();
  g.position.set(-22.4, islandHeight(-22.4, 11.2), 11.2);
  g.rotation.y = 0.45;

  const base = box(5.3, 0.3, 4.0, materials.stoneDark, 0, 0.15, 0);
  g.add(base);
  for (let i = 0; i < 4; i++) {
    const x = i < 2 ? -2.4 : 2.4;
    const z = i % 2 ? -1.8 : 1.8;
    g.add(box(0.22, 3.0, 0.22, materials.woodDark, x, 1.6, z));
  }
  g.add(box(5.4, 0.2, 4.2, materials.roof, 0, 3.3, 0).rotateZ(0.16));
  g.add(box(5.1, 0.8, 0.18, materials.woodPale, 0, 3.0, 2.0));
  g.add(box(5.1, 1.0, 0.18, materials.woodPale, 0, 2.0, -2.0));
  for (let i = 0; i < 4; i++) {
    g.add(box(1.0, 2.5, 0.12, materials.wood, -1.8 + i * 1.2, 1.25, 2.0));
  }
  const hay = cylinder(1.2, 1.3, 0.6, new THREE.MeshStandardMaterial({ color: 0xd9c184, roughness: 1 }), 1.2, 0.5, -0.8, 10);
  g.add(hay);
  const horse = createHorse();
  horse.position.set(-0.6, 0.2, 0.1);
  horse.rotation.y = 0.3;
  g.add(horse);
  const bucket = cylinder(0.25, 0.2, 0.3, materials.woodPale, 1.9, 0.2, 1.2, 8);
  g.add(bucket);

  anchors.stable = new THREE.Object3D();
  anchors.stable.position.copy(g.position);
  return g;
}

export function createCastle(materials) {
  const group = new THREE.Group();
  const anchors = {};

  const courtyard = buildCourtyard(materials, anchors);
  group.add(courtyard);
  const stable = buildStable(materials, anchors);
  group.add(stable);

  const keep = makeKeep(materials, anchors);
  group.add(keep);

  const hall = buildGreatHall(materials, anchors);
  group.add(hall);

  const chapel = buildChapel(materials, anchors);
  group.add(chapel);

  const towers = [
    { x: -18.4, z: 6.4, radius: 1.9, height: 13.8, roofHeight: 4.3, flag: true, roofMat: materials.roof },
    { x: -18.9, z: -4.6, radius: 2.35, height: 19.2, roofHeight: 5.2, flag: true, roofMat: materials.roof },
    { x: 16.4, z: -6.3, radius: 2.15, height: 16.4, roofHeight: 4.9, flag: true, roofMat: materials.roofLight },
    { x: -7.2, z: -9.0, radius: 1.7, height: 13.8, roofHeight: 4.0, flag: true, roofMat: materials.roofLight },
  ];
  for (const opts of towers) group.add(createTower(materials, opts));

  const backWall = ringWall(15.6, 16.2, GROUND_Y + 0.4, GROUND_Y + 4.4, Math.PI * 0.55, Math.PI * 1.45, materials.stone, 36);
  group.add(backWall);
  for (let i = 0; i < 16; i++) {
    const a = Math.PI * 0.55 + (Math.PI * 0.9) * (i / 16);
    const m = box(0.75, 0.62, 0.95, materials.stone, Math.cos(a) * 15.9, GROUND_Y + 4.7, Math.sin(a) * 15.9);
    m.rotation.y = Math.PI / 2 - a;
    group.add(m);
  }

  const backDoor = new THREE.Group();
  backDoor.position.set(0, GROUND_Y + 0.4, -14.8);
  group.add(backDoor);

  const gardenLantern = new THREE.Group();
  gardenLantern.position.set(-1.5, GROUND_Y, 14.6);
  gardenLantern.add(box(0.12, 2.4, 0.12, materials.iron, 0, 1.2, 0));
  gardenLantern.add(box(0.5, 0.65, 0.5, materials.emissiveWarm, 0, 2.5, 0));
  const glight = new THREE.PointLight(0xffb36a, 12, 9, 2);
  glight.position.set(0, 2.5, 0.4);
  gardenLantern.add(glight);
  flicker(glight, 12, 0.8, 4);
  group.add(gardenLantern);

  anchors.courtyard = new THREE.Object3D();
  anchors.courtyard.position.set(0, GROUND_Y + 0.3, 11.2);
  group.add(anchors.courtyard);

  anchors.keep = new THREE.Object3D();
  anchors.keep.position.set(0, GROUND_Y + 12, -3);
  group.add(anchors.keep);

  return { group, anchors };
}
