import * as THREE from 'three';
import { matte, TAU, mulberry32, fbm, clamp } from './util.js';
import { heightAt, createTree, ISLAND_R } from './world.js';
import { box, cyl } from './castle.js';
import { makeSheep, makeHorse, makePerson, makeFox, makeRose } from './people.js';
import { fabricTexture } from './textures.js';

/* ------------------------------------------------------------------ */
/*  农作物：麦田（实例化）                                              */
/* ------------------------------------------------------------------ */
export function createWheatField(cx, cz, r, count = 900) {
  const rand = mulberry32(202);
  const g = new THREE.Group();
  const geo = new THREE.ConeGeometry(0.075, 0.9, 4);
  geo.translate(0, 0.45, 0);
  const mat = matte('#d9b45e');
  const mesh = new THREE.InstancedMesh(geo, mat, count);
  mesh.castShadow = true;
  const dummy = new THREE.Object3D();
  let n = 0;
  for (let i = 0; i < count; i++) {
    const a = rand() * TAU, rr = Math.sqrt(rand()) * r;
    const x = cx + Math.cos(a) * rr, z = cz + Math.sin(a) * rr;
    if (Math.hypot(x - 33, z - 17) < 11) continue; // 让开湖泊
    dummy.position.set(x, heightAt(x, z), z);
    dummy.rotation.set(0, rand() * TAU, (rand() - 0.5) * 0.14);
    const s = 0.8 + rand() * 0.5;
    dummy.scale.set(s, s, s);
    dummy.updateMatrix();
    mesh.setMatrixAt(n++, dummy.matrix);
  }
  mesh.count = n;
  g.add(mesh);
  return g;
}

/* ------------------------------------------------------------------ */
/*  菜园：整齐的垄 + 蔬菜                                               */
/* ------------------------------------------------------------------ */
export function createGarden(cx, cz) {
  const g = new THREE.Group();
  const rand = mulberry32(88);
  const soil = box(9, 0.3, 6, matte('#7a5a3c'), cx, heightAt(cx, cz) + 0.1, cz);
  g.add(soil);
  for (let r = 0; r < 4; r++) {
    const z = cz - 2.25 + r * 1.5;
    const ridge = box(8.4, 0.28, 0.75, matte('#8a6845'), cx, heightAt(cx, cz) + 0.3, z);
    g.add(ridge);
    for (let i = 0; i < 9; i++) {
      const x = cx - 3.8 + i * 0.95;
      const kind = (i + r) % 3;
      let v;
      if (kind === 0) {
        v = new THREE.Mesh(new THREE.SphereGeometry(0.19, 8, 7), matte('#c9563f'));
        v.position.set(x, heightAt(cx, cz) + 0.52, z);
      } else if (kind === 1) {
        v = new THREE.Mesh(new THREE.SphereGeometry(0.17, 8, 7), matte('#6f9a4a'));
        v.scale.y = 1.4;
        v.position.set(x, heightAt(cx, cz) + 0.55, z);
      } else {
        v = new THREE.Mesh(new THREE.ConeGeometry(0.15, 0.55, 6), matte('#d9c06a'));
        v.position.set(x, heightAt(cx, cz) + 0.62, z);
      }
      v.castShadow = true;
      g.add(v);
    }
  }
  // 篱笆
  for (let i = 0; i < 16; i++) {
    const t = i / 16 * TAU;
    const x = cx + Math.cos(t) * 5.2, z = cz + Math.sin(t) * 3.6;
    g.add(box(0.12, 0.9, 0.12, matte('#7a5a3c'), x, heightAt(x, z) + 0.45, z));
  }
  return g;
}

/* ------------------------------------------------------------------ */
/*  农舍                                                                */
/* ------------------------------------------------------------------ */
export function createCottage(x, z, rot = 0) {
  const g = new THREE.Group();
  const y = heightAt(x, z);
  const w = 5.2, d = 4.2, h = 3.0;
  g.add(box(w, h, d, matte('#e2d6bd'), 0, h / 2, 0));
  // 木架结构
  [-w / 2 + 0.2, 0, w / 2 - 0.2].forEach((dx) => {
    g.add(box(0.26, h, 0.2, matte('#7a5a3c'), dx, h / 2, d / 2 + 0.03));
    g.add(box(0.26, h, 0.2, matte('#7a5a3c'), dx, h / 2, -d / 2 - 0.03));
  });
  // 屋顶
  const roofShape = new THREE.Shape();
  roofShape.moveTo(-d / 2 - 0.35, 0); roofShape.lineTo(d / 2 + 0.35, 0); roofShape.lineTo(0, 2.1); roofShape.closePath();
  const rg = new THREE.ExtrudeGeometry(roofShape, { depth: w + 0.7, bevelEnabled: false });
  rg.rotateY(Math.PI / 2); rg.translate(-(w + 0.7) / 2, 0, 0);
  {
    const pos = rg.attributes.position;
    const uv = rg.attributes.uv;
    for (let i = 0; i < uv.count; i++) {
      uv.setXY(i, pos.getX(i) * 0.3, pos.getZ(i) * 0.3 + pos.getY(i) * 0.3);
    }
    uv.needsUpdate = true;
  }
  const roofM = new THREE.Mesh(rg, matte('#a8714a'));
  roofM.position.y = h; roofM.castShadow = true;
  g.add(roofM);
  // 门窗
  g.add(box(0.9, 1.8, 0.14, matte('#7a5a3c'), -1.2, 0.9, d / 2 + 0.02));
  const win = box(0.85, 0.75, 0.14, matte('#8fbcd8'), 1.3, 1.9, d / 2 + 0.02);
  g.add(win);
  g.add(box(0.16, 0.16, 0.16, matte('#7a5a3c'), 1.3, 1.9, d / 2 + 0.1));
  // 烟囱
  g.add(box(0.6, 1.8, 0.6, matte('#9a8a72'), w / 2 - 1.0, h + 1.3, 0));
  g.position.set(x, y, z);
  g.rotation.y = rot;
  g.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  return g;
}

/* ------------------------------------------------------------------ */
/*  风车                                                                */
/* ------------------------------------------------------------------ */
export function createWindmill(x, z) {
  const g = new THREE.Group();
  const y = heightAt(x, z);
  const tower = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.9, 5.2, 12), matte('#e2d6bd'));
  tower.position.y = 2.6; tower.castShadow = true;
  g.add(tower);
  const cap = new THREE.Mesh(new THREE.ConeGeometry(1.4, 1.5, 12), matte('#8c3b34'));
  cap.position.y = 5.9; cap.castShadow = true;
  g.add(cap);
  // 风叶
  const blades = new THREE.Group();
  blades.position.set(0, 4.4, 1.1);
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * TAU;
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.18, 3.4, 0.12), matte('#7a5a3c'));
    arm.position.y = 1.7;
    const holder = new THREE.Group();
    holder.add(arm);
    const sail = new THREE.Mesh(new THREE.BoxGeometry(0.85, 2.2, 0.06), matte('#f0e6cf'));
    sail.position.set(0.45, 2.1, 0.06);
    holder.add(sail);
    holder.rotation.z = a;
    blades.add(holder);
  }
  g.add(blades);
  g.userData.blades = blades;
  g.position.set(x, y, z);
  g.rotation.y = 0.5;
  return g;
}

/* ------------------------------------------------------------------ */
/*  整体环境装配：森林、羊群、马、栅栏、石块                              */
/* ------------------------------------------------------------------ */
export function populate(scene, materials) {
  const rand = mulberry32(31415);
  const group = new THREE.Group();
  group.name = 'environment';

  /* ---- 森林：西侧与北侧 ---- */
  const forest = new THREE.Group();
  for (let i = 0; i < 46; i++) {
    const a = rand() * TAU;
    const r = 40 + rand() * 32;
    const x = Math.cos(a) * r, z = Math.sin(a) * r;
    if (Math.hypot(x - 33, z - 17) < 13) continue;
    if (Math.abs(x) < 30 && Math.abs(z) < 22) continue;
    const kind = rand() > 0.68 ? 'pine' : (rand() > 0.92 ? 'dead' : 'round');
    const t = createTree(kind, 0.85 + rand() * 0.75);
    t.position.set(x, heightAt(x, z) - 0.15, z);
    t.rotation.y = rand() * TAU;
    forest.add(t);
  }
  group.add(forest);

  /* ---- 羊群 + 牧羊人 ---- */
  const flock = new THREE.Group();
  for (let i = 0; i < 11; i++) {
    const a = rand() * TAU, r = rand() * 6;
    const x = -30 + Math.cos(a) * r, z = 28 + Math.sin(a) * r;
    const s = makeSheep();
    s.position.set(x, heightAt(x, z), z);
    s.rotation.y = rand() * TAU;
    s.scale.setScalar(0.85 + rand() * 0.3);
    flock.add(s);
  }
  group.add(flock);

  const shepherd = makePerson({ coat: '#6a7a4a', trim: '#e0d3b4', hair: '#5a4a3a', hat: 'straw', height: 1.7 });
  shepherd.position.set(-28, heightAt(-28, 28.5), 28.5);
  shepherd.rotation.y = -0.8;
  group.add(shepherd);

  /* ---- 马 ---- */
  const horse = makeHorse();
  horse.position.set(-15.5, heightAt(-15.5, 12.5), 12.5);
  horse.rotation.y = 1.2;
  group.add(horse);
  const horse2 = makeHorse();
  horse2.position.set(-17.5, heightAt(-17.5, 12.0), 12.0);
  horse2.rotation.y = 1.9;
  horse2.scale.setScalar(0.92);
  horse2.children[0].material = matte('#3a3a42');
  group.add(horse2);

  /* ---- 农舍群 ---- */
  const c1 = createCottage(-40, -26, 0.4); group.add(c1);
  const c2 = createCottage(-45, -20, 1.1); group.add(c2);
  const c3 = createCottage(-36, -33, -0.5); group.add(c3);
  const windmill = createWindmill(-50, -13); group.add(windmill);

  /* ---- 麦田 ---- */
  group.add(createWheatField(24, -30, 13, 1300));
  group.add(createWheatField(-10, 42, 10, 800));

  /* ---- 菜园 ---- */
  group.add(createGarden(36, 40));

  /* ---- 玫瑰园（城堡旁） ---- */
  const roseGarden = new THREE.Group();
  for (let i = 0; i < 14; i++) {
    const a = (i / 14) * TAU;
    const x = 8.5 + Math.cos(a) * 5.2, z = 8.5 + Math.sin(a) * 5.2;
    const bush = new THREE.Mesh(new THREE.SphereGeometry(0.55, 10, 8), matte('#5f8f45'));
    bush.scale.y = 0.8; bush.position.set(x, heightAt(x, z) + 0.4, z);
    roseGarden.add(bush);
    const fl = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 7), matte(['#d2493f', '#e07a9a', '#e8c46a'][i % 3]));
    fl.position.set(x + 0.2, heightAt(x, z) + 0.75, z + 0.15);
    roseGarden.add(fl);
  }
  group.add(roseGarden);

  /* ---- 狐狸由 main.js 统一放置（避免重复） ---- */

  /* ---- 石块 / 灌木 散布 ---- */
  const stoneMat = matte('#a4907a', { flatShading: true });
  for (let i = 0; i < 40; i++) {
    const a = rand() * TAU, r = 30 + rand() * 42;
    const x = Math.cos(a) * r, z = Math.sin(a) * r;
    if (Math.hypot(x - 33, z - 17) < 11) continue;
    const s = new THREE.Mesh(new THREE.DodecahedronGeometry(0.4 + rand() * 1.1, 0), stoneMat);
    s.position.set(x, heightAt(x, z) + 0.1, z);
    s.rotation.set(rand() * 3, rand() * 3, rand() * 3);
    s.castShadow = true; s.receiveShadow = true;
    group.add(s);
  }
  const bushMat = matte('#7fb357');
  for (let i = 0; i < 46; i++) {
    const a = rand() * TAU, r = 26 + rand() * 46;
    const x = Math.cos(a) * r, z = Math.sin(a) * r;
    if (Math.hypot(x - 33, z - 17) < 11) continue;
    if (Math.abs(x) < 27 && Math.abs(z) < 19) continue;
    const b = new THREE.Mesh(new THREE.IcosahedronGeometry(0.5 + rand() * 0.7, 0), bushMat);
    b.position.set(x, heightAt(x, z) + 0.2, z);
    b.scale.set(1, 0.75, 1);
    b.castShadow = true;
    group.add(b);
  }

  /* ---- 栅栏（围羊场） ---- */
  const fence = new THREE.Group();
  for (let i = 0; i <= 18; i++) {
    const a = (i / 18) * TAU;
    const x = -30 + Math.cos(a) * 8, z = 28 + Math.sin(a) * 8;
    fence.add(box(0.16, 1.2, 0.16, matte('#8a6a48'), x, heightAt(x, z) + 0.6, z));
  }
  group.add(fence);

  scene.add(group);
  return { group, windmill, flock, shepherd };
}
