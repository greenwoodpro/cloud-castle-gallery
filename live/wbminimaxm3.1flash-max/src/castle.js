import * as THREE from 'three';
import { matte, MAT, TAU, mulberry32, fbm, outlineAll, addOutline } from './util.js';
import { stoneTexture, roofTexture, woodTexture, fabricTexture, glowTexture } from './textures.js';
import { heightAt } from './world.js';

/* ============================ 基础构件 ============================ */

/**
 * 长方体。按世界尺寸重算 UV，使砖块/木纹在所有构件上保持同一物理大小，
 * 避免大墙面把贴图拉伸成巨大色块。
 * uvScale: 每个世界单位对应多少个贴图周期
 */
export function box(w, h, d, mat, x = 0, y = 0, z = 0, uvScale = 0.25) {
  const geo = new THREE.BoxGeometry(w, h, d);
  scaleBoxUV(geo, w, h, d, uvScale);
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

/**
 * 对 BoxGeometry 的 UV 做三平面式缩放：
 * X 面用 (d,h)，Y 面用 (w,d)，Z 面用 (w,h)
 */
export function scaleBoxUV(geo, w, h, d, s) {
  const uv = geo.attributes.uv;
  const nor = geo.attributes.normal;
  if (!uv || !nor) return geo;
  for (let i = 0; i < uv.count; i++) {
    const nx = Math.abs(nor.getX(i));
    const ny = Math.abs(nor.getY(i));
    const nz = Math.abs(nor.getZ(i));
    let su, sv;
    if (nx > 0.5) { su = d; sv = h; }
    else if (ny > 0.5) { su = w; sv = d; }
    else { su = w; sv = h; }
    uv.setXY(i, uv.getX(i) * su * s, uv.getY(i) * sv * s);
  }
  uv.needsUpdate = true;
  return geo;
}

export function cyl(rt, rb, h, mat, seg = 14, x = 0, y = 0, z = 0) {
  const geo = new THREE.CylinderGeometry(rt, rb, h, seg);
  // 圆柱侧面按周长展开 UV，使砖块物理大小一致
  const uv = geo.attributes.uv;
  const circumference = Math.PI * (rt + rb);
  for (let i = 0; i < uv.count; i++) {
    uv.setXY(i, uv.getX(i) * circumference * 0.25, uv.getY(i) * h * 0.25);
  }
  uv.needsUpdate = true;
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

/** 锥形塔顶（带轻微悬挑檐口） */
export function coneRoof(r, h, mat, seg = 16, overhang = 0.45) {
  const g = new THREE.Group();
  const eave = cyl(r + overhang, r + overhang, 0.3, mat, seg, 0, 0.15, 0);
  g.add(eave);
  const coneGeo = new THREE.ConeGeometry(r + overhang, h, seg);
  // 锥面按周长展开 UV，瓦片密度与墙面一致
  const uv = coneGeo.attributes.uv;
  const circ = Math.PI * 2 * (r + overhang);
  for (let i = 0; i < uv.count; i++) {
    uv.setXY(i, uv.getX(i) * circ * 0.25, uv.getY(i) * h * 0.25);
  }
  uv.needsUpdate = true;
  const cone = new THREE.Mesh(coneGeo, mat);
  cone.position.y = 0.3 + h / 2;
  cone.castShadow = true;
  g.add(cone);
  return g;
}

/** 双坡山墙屋顶 */
export function gableRoof(w, d, h, mat, overhang = 0.4) {
  const g = new THREE.Group();
  const shape = new THREE.Shape();
  shape.moveTo(-d / 2 - overhang, 0);
  shape.lineTo(d / 2 + overhang, 0);
  shape.lineTo(0, h);
  shape.closePath();
  const geo = new THREE.ExtrudeGeometry(shape, { depth: w + overhang * 2, bevelEnabled: false });
  geo.rotateY(Math.PI / 2);
  geo.translate(-(w + overhang * 2) / 2, 0, 0);
  // ExtrudeGeometry 的 UV 是形状空间坐标，需按世界尺寸重建
  {
    const pos = geo.attributes.position;
    const uv = geo.attributes.uv;
    for (let i = 0; i < uv.count; i++) {
      uv.setXY(i, pos.getX(i) * 0.25, pos.getZ(i) * 0.25 + pos.getY(i) * 0.25);
    }
    uv.needsUpdate = true;
  }
  const m = new THREE.Mesh(geo, mat);
  m.position.y = 0;
  m.castShadow = true;
  m.receiveShadow = true;
  g.add(m);
  // 山墙两端的三角墙（石头）
  return g;
}

/** 城垛（一圈可复用的齿状墙） */
export function battlement(len, mat, merlon = 0.9, gap = 0.7, h = 1.5, t = 0.85) {
  const g = new THREE.Group();
  const n = Math.max(1, Math.floor(len / (merlon + gap)));
  const step = len / n;
  for (let i = 0; i < n; i++) {
    const x = -len / 2 + step * (i + 0.5);
    const m = box(merlon, h, t, mat, x, h / 2, 0);
    g.add(m);
  }
  return g;
}

/** 窗户（带窗框 + 玻璃，夜里有光） */
export function window3(w, h, frameMat, glassMat, arch = true) {
  const g = new THREE.Group();
  const t = 0.16;
  g.add(box(w + t * 2, t, 0.3, frameMat, 0, h / 2 + t, 0));
  g.add(box(t, h, 0.3, frameMat, -w / 2 - t / 2, h / 2, 0));
  g.add(box(t, h, 0.3, frameMat, w / 2 + t / 2, h / 2, 0));
  if (arch) {
    const a = new THREE.Mesh(
      new THREE.CylinderGeometry(w / 2 + t, w / 2 + t, 0.3, 12, 1, false, 0, Math.PI),
      frameMat
    );
    a.rotation.z = Math.PI / 2;
    a.rotation.y = Math.PI / 2;
    a.position.y = h;
    a.castShadow = true;
    g.add(a);
  }
  const glass = new THREE.Mesh(new THREE.PlaneGeometry(w, h + (arch ? w / 2 : 0)), glassMat);
  glass.position.set(0, h / 2 + (arch ? w / 4 : 0), -0.02);
  glass.rotation.y = Math.PI;
  g.add(glass);
  g.userData.glass = glass;
  return g;
}

/** 旗帜（会飘） */
export function flag(w, h, tex) {
  const g = new THREE.Group();
  const geo = new THREE.PlaneGeometry(w, h, 12, 6);
  geo.translate(w / 2, 0, 0);
  const mat = new THREE.MeshStandardMaterial({
    map: tex, side: THREE.DoubleSide, roughness: 0.95, metalness: 0,
  });
  const m = new THREE.Mesh(geo, mat);
  m.position.y = -h / 2;
  m.castShadow = true;
  g.add(m);
  g.userData.cloth = m;
  return g;
}

/* ============================ 材质集 ============================ */

export function makeMaterials() {
  const stoneMap = stoneTexture([1, 1]);
  const stone = new THREE.MeshStandardMaterial({ map: stoneMap, color: '#ffffff', roughness: 0.95, metalness: 0 });
  const stoneDark = new THREE.MeshStandardMaterial({ map: stoneMap, color: '#c8b89c', roughness: 0.95, metalness: 0 });
  const roofMap = roofTexture([1, 1]);
  const roof = new THREE.MeshStandardMaterial({ map: roofMap, color: '#ffffff', roughness: 0.92, metalness: 0 });
  const wood = new THREE.MeshStandardMaterial({ map: woodTexture([1, 1]), color: '#ffffff', roughness: 0.95, metalness: 0 });
  const woodDark = matte('#5f4029');
  const iron = matte('#4d4a52', { metalness: 0.35, roughness: 0.6 });
  const gold = matte('#e0b25a', { metalness: 0.5, roughness: 0.35 });
  const glass = new THREE.MeshStandardMaterial({
    color: '#f5d79a', emissive: '#ffca63', emissiveIntensity: 0.0,
    roughness: 0.3, metalness: 0.1, transparent: true, opacity: 0.92,
  });
  const bannerTex = fabricTexture([1, 1], '#b8433c', '#e8c46a');
  const banner = new THREE.MeshStandardMaterial({ map: bannerTex, roughness: 0.95, side: THREE.DoubleSide });
  const bannerBlue = new THREE.MeshStandardMaterial({ map: fabricTexture([1, 1], '#3f6fb5', '#e8d9a8'), roughness: 0.95, side: THREE.DoubleSide });
  const thatch = matte('#c8a45f', { flatShading: true });
  return { stone, stoneDark, roof, wood, woodDark, iron, gold, glass, banner, bannerBlue, thatch };
}

/* ============================ 城堡 ============================ */

export function buildCastle() {
  const M = makeMaterials();
  const root = new THREE.Group();
  root.name = 'castle';
  const baseY = heightAt(0, 0);

  /* ---- 城堡台基（把地形整平） ---- */
  const podium = new THREE.Mesh(
    new THREE.CylinderGeometry(26.5, 28.5, 1.6, 40),
    new THREE.MeshStandardMaterial({ map: stoneTexture([1, 1]), color: '#f0e6d0', roughness: 1 })
  );
  podium.position.set(0, baseY - 1.0, 0);
  podium.receiveShadow = true;
  podium.castShadow = true;
  root.add(podium);

  // 台基边缘的草皮过渡环，避免与周边草地硬接
  {
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(26.4, 30.5, 48, 1),
      new THREE.MeshStandardMaterial({ color: '#9cbc6a', roughness: 1, side: THREE.DoubleSide })
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(0, baseY + 0.02, 0);
    ring.receiveShadow = true;
    root.add(ring);
  }

  const roofs = [];      // 剖视时隐藏
  const cutWalls = [];   // 剖视时隐藏（朝相机方向的墙）
  const winGlass = [];   // 夜间发光
  const flags = [];
  const keepSlabs = [];  // 主堡楼板（剖视时半透，露出各层）
  // 每个屋顶一份独立材质，剖视淡出时互不影响
  const roofMat = () => new THREE.MeshStandardMaterial({
    map: M.roof.map, color: '#ffffff', roughness: 0.92, metalness: 0,
  });

  const WX = 23, WZ = 16.5, WH = 9.2, WT = 2.2;

  /* ---- 外城墙（四段） ---- */
  const mkWall = (len, x, z, rotY, optOwn = false) => {
    const g = new THREE.Group();
    // 独立材质实例：剖视淡出时不影响其他墙体
    const wMat = optOwn ? new THREE.MeshStandardMaterial({
      map: M.stone.map, color: '#ffffff', roughness: 0.95, metalness: 0,
    }) : M.stone;
    const wdMat = optOwn ? new THREE.MeshStandardMaterial({
      map: M.stone.map, color: '#cdbfa6', roughness: 0.95, metalness: 0,
    }) : M.stoneDark;
    const body = box(len, WH, WT, wMat, 0, WH / 2, 0);
    g.add(body);
    // 墙垛
    const mer = battlement(len, wMat, 0.78, 0.52, 1.25, WT);
    mer.position.set(0, WH, 0);
    g.add(mer);
    // 扶壁
    const nb = Math.max(2, Math.round(len / 9));
    for (let i = 0; i <= nb; i++) {
      const px = -len / 2 + (len / nb) * i;
      const but = box(1.5, WH * 0.85, 1.3, wdMat, px, WH * 0.42, WT / 2 + 0.4);
      g.add(but);
      const cap = box(1.9, 0.5, 1.7, wdMat, px, WH * 0.85 + 0.25, WT / 2 + 0.4);
      g.add(cap);
    }
    // 箭窗
    for (let i = 0; i < Math.max(1, Math.round(len / 5.5)); i++) {
      const px = -len / 2 + (len / (Math.max(1, Math.round(len / 5.5)))) * (i + 0.5);
      const w = window3(0.55, 1.3, wdMat, M.glass, false);
      w.position.set(px, WH * 0.5, WT / 2 + 0.02);
      g.add(w);
      winGlass.push(w.userData.glass);
    }
    g.position.set(x, baseY, z);
    g.rotation.y = rotY;
    root.add(g);
    return g;
  };

  const wallN = mkWall(WX * 2, 0, -WZ, 0);
  const wallS = mkWall(WX * 2, 0, WZ, 0, true);
  const wallE = mkWall(WZ * 2, WX, 0, Math.PI / 2, true);
  const wallW = mkWall(WZ * 2, -WX, 0, Math.PI / 2);
  cutWalls.push(wallS, wallE);

  /* ---- 角楼 ---- */
  const tower = (x, z, r = 3.3, h = 14.5) => {
    const g = new THREE.Group();
    const body = cyl(r, r * 1.06, h, M.stone, 18, 0, h / 2, 0);
    g.add(body);
    // 底部加厚
    g.add(cyl(r * 1.18, r * 1.3, 2.2, M.stoneDark, 18, 0, 1.1, 0));
    // 城垛环
    const mer = battlement(r * 2 * 1.02, M.stone, 0.7, 0.48, 1.25, 0.7);
    mer.position.y = h;
    g.add(mer);
    // 箭窗
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * TAU + 0.4;
      const w = window3(0.5, 1.5, M.stoneDark, M.glass, true);
      w.position.set(Math.cos(a) * (r + 0.02), h * 0.55, Math.sin(a) * (r + 0.02));
      w.lookAt(Math.cos(a) * (r + 3), h * 0.55, Math.sin(a) * (r + 3));
      g.add(w);
      winGlass.push(w.userData.glass);
    }
    // 锥顶
    const roof = coneRoof(r, r * 1.5, roofMat(), 16, 0.4);
    roof.position.y = h + 1.6;
    g.add(roof);
    roofs.push(roof);
    // 旗杆
    const pole = cyl(0.09, 0.09, 4.2, M.woodDark, 6, 0, h + 1.6 + r * 1.5 + 2.1, 0);
    g.add(pole);
    const f = flag(1.9, 1.1, fabricTexture([1, 1], '#c0392b', '#f0d79a'));
    f.position.set(0.1, h + 1.6 + r * 1.5 + 3.6, 0);
    g.add(f);
    flags.push(f);
    g.position.set(x, baseY, z);
    root.add(g);
    return g;
  };

  tower(WX, -WZ); tower(-WX, -WZ); tower(WX, WZ); tower(-WX, WZ);
  tower(0, -WZ, 2.9, 13); // 北门塔
  tower(0, WZ, 2.9, 13); // 南门塔

  /* ---- 大门（南侧） ---- */
  const gate = new THREE.Group();
  const gx = 0, gz = WZ;
  // 门洞两侧墩
  gate.add(box(4.2, 12, WT + 1.2, M.stone, -4.2, 6, 0));
  gate.add(box(4.2, 12, WT + 1.2, M.stone, 4.2, 6, 0));
  // 门楣
  gate.add(box(13, 2.6, WT + 1.2, M.stone, 0, 10.7, 0));
  // 拱
  const arch = new THREE.Mesh(
    new THREE.CylinderGeometry(2.6, 2.6, WT + 1.2, 16, 1, false, 0, Math.PI),
    M.stone
  );
  arch.rotation.z = Math.PI / 2;
  arch.rotation.y = Math.PI / 2;
  arch.position.set(0, 5.2, 0);
  arch.castShadow = true;
  gate.add(arch);
  // 闸门
  const port = new THREE.Group();
  for (let i = 0; i < 6; i++) port.add(cyl(0.08, 0.08, 4.4, M.iron, 6, -1.4 + i * 0.56, 2.2, 0));
  for (let i = 0; i < 3; i++) port.add(box(2.9, 0.1, 0.1, M.iron, 0, 0.6 + i * 1.6, 0));
  port.position.set(0, 0.2, 0.4);
  gate.add(port);
  // 闸门上方房间
  gate.add(box(9, 3.4, WT + 1.4, M.stoneDark, 0, 13.7, 0));
  const gw = window3(0.7, 1.2, M.stone, M.glass, true);
  gw.position.set(-2.4, 12.4, (WT + 1.4) / 2);
  gate.add(gw); winGlass.push(gw.userData.glass);
  const gw2 = gw.clone(); gw2.position.x = 2.4; gate.add(gw2); winGlass.push(gw2.userData.glass);
  const gRoof = gableRoof(9.6, WT + 1.8, 2.4, roofMat(), 0.5);
  gRoof.position.set(0, 15.4, 0);
  gRoof.rotation.y = Math.PI / 2;
  gate.add(gRoof);
  roofs.push(gRoof);
  // 吊桥（已放下，贴着门前的石桥墩）
  const bridge = new THREE.Group();
  const deck = box(6.4, 0.45, 6.5, M.wood, 0, 0, 3.2);
  bridge.add(deck);
  for (let i = 0; i < 5; i++) bridge.add(box(6.4, 0.14, 0.3, M.woodDark, 0, 0.28, 0.7 + i * 1.35));
  for (let i = 0; i < 4; i++) {
    bridge.add(cyl(0.1, 0.1, 1.1, M.woodDark, 6, -2.9, 0.75, 1.2 + i * 1.6));
    bridge.add(cyl(0.1, 0.1, 1.1, M.woodDark, 6, 2.9, 0.75, 1.2 + i * 1.6));
  }
  bridge.position.set(0, 0.55, WT / 2 + 0.4);
  gate.add(bridge);
  // 桥链
  const chain = cyl(0.07, 0.07, 5.5, M.iron, 6, -2.4, 4.2, 2.2);
  gate.add(chain);

  // 门外石引桥（跨过护城壕沟的桥墩与台阶）
  const gateApproach = new THREE.Group();
  gateApproach.add(box(9.5, 1.0, 9.0, M.stone, 0, -0.3, 5.6));
  gateApproach.add(box(8.0, 0.5, 1.2, M.stone, 0, 0.3, 10.4));
  for (let i = 0; i < 3; i++) {
    gateApproach.add(box(6.2 - i * 0.5, 0.34, 0.9, M.stoneDark, 0, 0.05 - i * 0.34, 10.9 + i * 0.95));
  }
  // 桥墩石狮（简易）
  [-3.4, 3.4].forEach((x) => {
    gateApproach.add(box(1.1, 1.6, 1.1, M.stoneDark, x, 0.9, 9.6));
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.44, 10, 8), M.stoneDark);
    head.position.set(x, 1.9, 9.6);
    head.scale.set(1, 1.15, 1);
    gateApproach.add(head);
  });
  gate.add(gateApproach);

  gate.position.set(gx, baseY, gz);
  root.add(gate);

  /* ================= 主堡（Donjon） ================= */
  const keep = new THREE.Group();
  const KX = 0, KZ = -5.5, KW = 7.6, KH = 24, KT = 1.5;
  const FLOOR = 7.2;
  keep.position.set(KX, baseY, KZ);

  // 地板（剖视时半透，露出各层内部）—— 使用独立材质实例，避免与墙体互相影响
  const slabMat = new THREE.MeshStandardMaterial({
    map: M.stone.map, color: '#cdbfa6', roughness: 0.95, metalness: 0,
  });
  for (let f = 0; f <= 3; f++) {
    const slab = box(KW * 2, 0.5, KW * 2, slabMat, 0, f * FLOOR + 0.25, 0);
    keep.add(slab);
    keepSlabs.push(slab);
  }
  // 四面墙（分件，便于剖视）
  const mkKeepWall = (w, h, x, z, rotY, optOwn = false) => {
    const g = new THREE.Group();
    // 每面墙使用独立材质实例，剖视淡出时互不影响
    const wMat = optOwn ? new THREE.MeshStandardMaterial({
      map: M.stone.map, color: '#ffffff', roughness: 0.95, metalness: 0,
    }) : M.stone;
    const wdMat = optOwn ? new THREE.MeshStandardMaterial({
      map: M.stone.map, color: '#cdbfa6', roughness: 0.95, metalness: 0,
    }) : M.stoneDark;
    const body = box(w, h, KT, wMat, 0, h / 2, 0);
    g.add(body);
    // 窗
    const nw = Math.max(1, Math.floor(w / 3.2));
    for (let i = 0; i < nw; i++) {
      const px = -w / 2 + (w / nw) * (i + 0.5);
      for (let f = 1; f <= 3; f++) {
        const win = window3(0.85, 1.7, wdMat, M.glass, true);
        win.position.set(px, f * FLOOR + 1.6, KT / 2 + 0.02);
        g.add(win);
        winGlass.push(win.userData.glass);
      }
    }
    // 角柱
    g.add(box(1.1, h, KT + 0.5, wdMat, -w / 2 + 0.4, h / 2, 0));
    g.add(box(1.1, h, KT + 0.5, wdMat, w / 2 - 0.4, h / 2, 0));
    g.position.set(x, 0, z);
    g.rotation.y = rotY;
    keep.add(g);
    return g;
  };
  const kWallS = mkKeepWall(KW * 2, KH, 0, KW, 0, true);
  const kWallN = mkKeepWall(KW * 2, KH, 0, -KW, 0);
  const kWallE = mkKeepWall(KW * 2, KH, KW, 0, Math.PI / 2, true);
  const kWallW = mkKeepWall(KW * 2, KH, -KW, 0, Math.PI / 2);
  cutWalls.push(kWallS, kWallE);

  // 顶部城垛
  const keepMer = battlement(KW * 2 + 1.4, M.stone, 0.8, 0.55, 1.5, 1.0);
  keepMer.position.y = KH;
  keep.add(keepMer);
  const keepMer2 = battlement(KW * 2 + 1.4, M.stone, 0.8, 0.55, 1.5, 1.0);
  keepMer2.position.y = KH; keepMer2.rotation.y = Math.PI / 2;
  keep.add(keepMer2);

  // 屋顶小楼
  const keepRoof = coneRoof(4.6, 6.2, roofMat(), 4, 0.5);
  keepRoof.position.y = KH + 1.7;
  keepRoof.rotation.y = Math.PI / 4;
  keep.add(keepRoof);
  roofs.push(keepRoof);
  const kPole = cyl(0.1, 0.1, 4.6, M.woodDark, 6, 0, KH + 1.7 + 6.2 + 2.3, 0);
  keep.add(kPole);
  const kFlag = flag(2.4, 1.4, fabricTexture([1, 1], '#2f5fa8', '#f2e0ae'));
  kFlag.position.set(0.1, KH + 1.7 + 6.2 + 4.0, 0);
  keep.add(kFlag);
  flags.push(kFlag);

  root.add(keep);

  /* ================= 主堡内部 ================= */
  const interior = new THREE.Group();
  interior.name = 'keepInterior';
  const IW = KW * 2 - KT * 2;

  /* --- 地牢层 (f0) --- */
  const dungeon = new THREE.Group();
  dungeon.position.set(KX, baseY, KZ);
  // 牢房隔断 + 铁栏
  for (let i = 0; i < 3; i++) {
    const cx = -4.4 + i * 4.4;
    const cell = new THREE.Group();
    cell.add(box(0.5, 2.6, 5, M.stoneDark, 0, 1.3, 0));
    for (let k = 0; k < 6; k++) cell.add(cyl(0.07, 0.07, 2.4, M.iron, 6, 0, 1.2, -2.2 + k * 0.88));
    cell.add(box(0.6, 0.2, 4.6, M.iron, 0, 2.45, 0));
    cell.position.set(cx, 0, -1.2);
    dungeon.add(cell);
  }
  // 刑具与锁链
  dungeon.add(box(0.9, 0.9, 0.9, M.woodDark, 4.2, 0.45, 2.2));
  for (let i = 0; i < 4; i++) dungeon.add(cyl(0.05, 0.05, 0.9, M.iron, 5, 3.6 + i * 0.4, 1.6, 2.2));
  // 火把
  const torch = new THREE.Group();
  torch.add(cyl(0.07, 0.07, 1.2, M.woodDark, 5, 0, 0.6, 0));
  const flame = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 8),
    new THREE.MeshBasicMaterial({ color: '#ffb347' }));
  flame.position.y = 1.3; flame.scale.y = 1.4;
  torch.add(flame);
  torch.position.set(-6.2, 2.2, 4.4);
  dungeon.add(torch);
  interior.add(dungeon);

  /* --- 大厅层 (f1)：长桌 + 王座 + 壁炉 --- */
  const hall = new THREE.Group();
  hall.position.set(KX, baseY + FLOOR + 0.5, KZ);
  // 地毯
  const rug = box(4.2, 0.08, 8.5, M.banner, 0, 0.04, 0.4);
  hall.add(rug);
  // 长桌
  const table = box(2.1, 0.22, 7.2, M.wood, 0, 1.35, 0.4);
  hall.add(table);
  for (let i = 0; i < 4; i++) {
    hall.add(box(0.35, 1.3, 0.35, M.woodDark, -0.8, 0.65, -2.6 + i * 2.0));
    hall.add(box(0.35, 1.3, 0.35, M.woodDark, 0.8, 0.65, -2.6 + i * 2.0));
  }
  // 长凳
  for (let i = 0; i < 4; i++) {
    hall.add(box(0.6, 0.15, 1.6, M.wood, -1.7, 0.85, -2.4 + i * 1.7));
    hall.add(box(0.6, 0.15, 1.6, M.wood, 1.7, 0.85, -2.4 + i * 1.7));
  }
  // 王座
  const throne = new THREE.Group();
  throne.add(box(1.7, 0.25, 1.6, M.wood, 0, 0.5, 0));
  throne.add(box(1.7, 2.6, 0.3, M.wood, 0, 1.9, -0.65));
  throne.add(box(0.3, 0.9, 1.6, M.wood, -0.7, 0.95, 0));
  throne.add(box(0.3, 0.9, 1.6, M.wood, 0.7, 0.95, 0));
  const cush = box(1.3, 0.2, 1.3, M.bannerBlue, 0, 0.72, 0);
  throne.add(cush);
  const crest = new THREE.Mesh(new THREE.ConeGeometry(0.35, 0.9, 5), M.gold);
  crest.position.set(0, 3.5, -0.6); throne.add(crest);
  throne.position.set(0, 0, -5.2);
  hall.add(throne);
  // 壁炉
  const fp = new THREE.Group();
  fp.add(box(2.6, 2.4, 0.9, M.stoneDark, 0, 1.2, 0));
  fp.add(box(1.5, 1.4, 0.7, new THREE.MeshBasicMaterial({ color: '#ff9d3c' }), 0, 0.75, 0.2));
  fp.add(box(3.0, 0.35, 1.2, M.stone, 0, 2.5, 0));
  fp.position.set(-5.6, 0, 0);
  hall.add(fp);
  // 烛台
  for (let i = 0; i < 3; i++) {
    const c = new THREE.Group();
    c.add(cyl(0.06, 0.1, 1.0, M.gold, 8, 0, 0.5, 0));
    c.add(cyl(0.09, 0.09, 0.35, '#f6ecd0', 8, 0, 1.15, 0));
    const fl = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), new THREE.MeshBasicMaterial({ color: '#ffd27a' }));
    fl.position.y = 1.42; c.add(fl);
    c.position.set(-1.8 + i * 1.8, 1.45, 2.2);
    hall.add(c);
  }
  // 挂毯
  const tap = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 4.2), M.banner);
  tap.position.set(4.9, 3.0, 1.0); tap.rotation.y = -Math.PI / 2;
  hall.add(tap);
  const tap2 = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 4.2), M.bannerBlue);
  tap2.position.set(0, 3.2, -KW + 0.8);
  hall.add(tap2);
  interior.add(hall);

  /* --- 寝宫层 (f2) --- */
  const chamber = new THREE.Group();
  chamber.position.set(KX, baseY + FLOOR * 2 + 1.0, KZ);
  // 四柱床
  const bed = new THREE.Group();
  bed.add(box(2.6, 0.5, 4.2, M.wood, 0, 0.55, 0));
  bed.add(box(2.4, 0.35, 3.9, new THREE.MeshStandardMaterial({ color: '#f4ece0', roughness: 1 }), 0, 0.95, 0));
  bed.add(box(2.45, 0.16, 2.6, M.bannerBlue, 0, 1.15, 0.4));
  bed.add(box(1.2, 0.3, 0.8, '#f7f1e4', 0, 1.18, -1.5));
  [[-1.2, -2], [1.2, -2], [-1.2, 2], [1.2, 2]].forEach(([x, z]) => {
    bed.add(cyl(0.14, 0.14, 3.4, M.woodDark, 8, x, 1.7, z));
  });
  bed.add(box(2.9, 0.2, 4.6, M.banner, 0, 3.5, 0));
  bed.position.set(-3.4, 0, 1.5);
  chamber.add(bed);
  // 书桌 + 书架
  chamber.add(box(2.4, 0.16, 1.2, M.wood, 3.8, 1.1, -1.2));
  chamber.add(box(0.2, 1.1, 0.2, M.woodDark, 2.9, 0.55, -1.7));
  chamber.add(box(0.2, 1.1, 0.2, M.woodDark, 4.7, 0.55, -1.7));
  const shelf = new THREE.Group();
  shelf.add(box(3.4, 3.4, 0.7, M.woodDark, 0, 1.7, 0));
  for (let r = 0; r < 3; r++) {
    shelf.add(box(3.1, 0.12, 0.6, M.wood, 0, 0.6 + r * 1.1, 0.06));
    for (let b = 0; b < 9; b++) {
      const h = 0.55 + (b % 3) * 0.12;
      const bk = box(0.2, h, 0.45, matte(['#a8433c', '#3f6fb5', '#6f8f45', '#c8a45f'][(b + r) % 4]),
        -1.4 + b * 0.34, 0.66 + r * 1.1 + h / 2, 0.08);
      shelf.add(bk);
    }
  }
  shelf.position.set(4.6, 0, 2.6);
  chamber.add(shelf);
  // 地毯 + 火盆
  chamber.add(box(4.5, 0.07, 5.0, M.banner, 0, 0.04, 0.6));
  const brazier = new THREE.Group();
  brazier.add(cyl(0.4, 0.25, 0.6, M.iron, 10, 0, 0.3, 0));
  brazier.add(cyl(0.08, 0.08, 1.0, M.iron, 6, 0, 0.5, 0));
  const bfl = new THREE.Mesh(new THREE.SphereGeometry(0.28, 8, 8), new THREE.MeshBasicMaterial({ color: '#ffa93c' }));
  bfl.position.y = 1.05; brazier.add(bfl);
  brazier.position.set(0, 0, 3.2);
  chamber.add(brazier);
  interior.add(chamber);

  /* --- 屋顶层 (f3)：瞭望台 --- */
  const roofDeck = new THREE.Group();
  roofDeck.position.set(KX, baseY + FLOOR * 3 + 0.5, KZ);
  roofDeck.add(box(4.2, 0.9, 4.2, M.stoneDark, 0, 0.45, 0));
  // 火盆 + 望远镜
  const rBraz = new THREE.Group();
  rBraz.add(cyl(0.45, 0.3, 0.7, M.iron, 10, 0, 0.35, 0));
  const rf = new THREE.Mesh(new THREE.SphereGeometry(0.3, 8, 8), new THREE.MeshBasicMaterial({ color: '#ffb347' }));
  rf.position.y = 0.9; rBraz.add(rf);
  rBraz.position.set(-2.6, 0.9, 2.2);
  roofDeck.add(rBraz);
  const tele = new THREE.Group();
  tele.add(cyl(0.16, 0.2, 1.0, M.wood, 8, 0, 0.5, 0));
  tele.add(cyl(0.1, 0.16, 1.8, M.gold, 10, 0, 1.5, 0));
  tele.rotation.z = 0.7;
  tele.position.set(2.4, 0.9, -1.2);
  roofDeck.add(tele);
  interior.add(roofDeck);

  root.add(interior);

  /* ================= 大礼堂（西侧建筑） ================= */
  const hallB = new THREE.Group();
  hallB.position.set(-14.5, baseY, 3.5);
  const HL = 13, HW = 7.5, HH = 8.4;
  const hallWalls = new THREE.Group();
  const hb = (w, h, x, z, ry, optOwn = false) => {
    const g = new THREE.Group();
    const wMat = optOwn ? new THREE.MeshStandardMaterial({
      map: M.stone.map, color: '#ffffff', roughness: 0.95, metalness: 0,
    }) : M.stone;
    g.add(box(w, h, 0.9, wMat, 0, h / 2, 0));
    g.position.set(x, 0, z); g.rotation.y = ry;
    return g;
  };
  hallWalls.add(hb(HL, HH, 0, HW / 2, 0, true));
  hallWalls.add(hb(HL, HH, 0, -HW / 2, 0));
  hallWalls.add(hb(HW, HH, -HL / 2, 0, Math.PI / 2));
  hallWalls.add(hb(HW, HH, HL / 2, 0, Math.PI / 2, true));
  hallB.add(hallWalls);
  cutWalls.push(hallWalls.children[0], hallWalls.children[3]);
  // 窗
  for (let i = 0; i < 3; i++) {
    const w = window3(1.1, 2.2, M.stoneDark, M.glass, true);
    w.position.set(-4 + i * 4, 3.4, HW / 2 + 0.05);
    hallB.add(w); winGlass.push(w.userData.glass);
  }
  const hRoof = gableRoof(HL, HW, 4.2, roofMat(), 0.5);
  hRoof.position.set(0, HH, 0);
  hRoof.rotation.y = Math.PI / 2;
  hallB.add(hRoof);
  roofs.push(hRoof);
  root.add(hallB);

  /* ================= 礼拜堂（东侧） ================= */
  const chapel = new THREE.Group();
  chapel.position.set(14.5, baseY, -4);
  const CW = 6, CD = 10, CH = 7;
  const cw = (w, h, x, z, ry) => {
    const g = new THREE.Group();
    g.add(box(w, h, 0.8, M.stone, 0, h / 2, 0));
    g.position.set(x, 0, z); g.rotation.y = ry;
    return g;
  };
  chapel.add(cw(CW, CH, 0, CD / 2, 0));
  chapel.add(cw(CW, CH, 0, -CD / 2, 0));
  chapel.add(cw(CD, CH, -CW / 2, 0, Math.PI / 2));
  chapel.add(cw(CD, CH, CW / 2, 0, Math.PI / 2));
  // 彩色玻璃（独立材质，夜晚发光更亮）
  const stainedMats = [];
  for (let i = 0; i < 2; i++) {
    const hue = ['#4f7fc4', '#c44a6f'][(i + 1) % 2];
    const stMat = new THREE.MeshStandardMaterial({
      color: hue, emissive: hue, emissiveIntensity: 0.15,
      roughness: 0.4, transparent: true, opacity: 0.92, side: THREE.DoubleSide,
    });
    const st = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 2.6), stMat);
    st.position.set(-CW / 2 - 0.05, 3.2, -2.5 + i * 5);
    st.rotation.y = -Math.PI / 2;
    chapel.add(st);
    stainedMats.push(stMat);
  }
  // 尖顶
  const cSpire = new THREE.Mesh(new THREE.ConeGeometry(3.6, 7.5, 8), roofMat());
  cSpire.position.set(0, CH + 3.75, 0);
  cSpire.castShadow = true;
  chapel.add(cSpire); roofs.push(cSpire);
  const cCross = new THREE.Group();
  cCross.add(box(0.14, 1.6, 0.14, M.gold, 0, 0.8, 0));
  cCross.add(box(0.9, 0.14, 0.14, M.gold, 0, 1.15, 0));
  cCross.position.set(0, CH + 7.5, 0);
  chapel.add(cCross);
  root.add(chapel);

  /* ================= 厨房 / 铁匠铺 ================= */
  const forge = new THREE.Group();
  forge.position.set(15.5, baseY, 6.5);
  forge.add(box(7, 5.2, 6, M.stone, 0, 2.6, 0));
  const fRoof = gableRoof(7.6, 6.6, 2.6, roofMat(), 0.4);
  fRoof.position.y = 5.2; fRoof.rotation.y = Math.PI / 2;
  forge.add(fRoof); roofs.push(fRoof);
  // 烟囱
  const chim = box(1.3, 4.2, 1.3, M.stoneDark, -2.2, 7.3, 0);
  forge.add(chim);
  const chimTop = box(1.7, 0.4, 1.7, M.stoneDark, -2.2, 9.5, 0);
  forge.add(chimTop);
  root.add(forge);

  /* ================= 马厩 ================= */
  const stable = new THREE.Group();
  stable.position.set(-15, baseY, 9.5);
  stable.add(box(9, 3.6, 5.5, M.wood, 0, 1.8, 0));
  const sRoof = gableRoof(9.6, 6.1, 2.2, M.thatch, 0.5);
  sRoof.position.y = 3.6; sRoof.rotation.y = Math.PI / 2;
  stable.add(sRoof); roofs.push(sRoof);
  root.add(stable);

  /* ================= 庭院细节 ================= */
  // 井
  const well = new THREE.Group();
  well.add(cyl(1.1, 1.2, 1.4, M.stone, 14, 0, 0.7, 0));
  well.add(cyl(1.0, 1.0, 0.1, new THREE.MeshBasicMaterial({ color: '#3d6a72' }), 14, 0, 1.42, 0));
  [-1, 1].forEach((s) => well.add(box(0.18, 2.4, 0.18, M.woodDark, s * 1.0, 2.5, 0)));
  well.add(box(2.6, 0.2, 0.2, M.woodDark, 0, 3.6, 0));
  well.add(cyl(0.3, 0.3, 0.35, M.wood, 10, 0, 3.2, 0));
  well.position.set(0, baseY, 7.5);
  root.add(well);

  // 劈柴堆
  for (let i = 0; i < 16; i++) {
    const log = cyl(0.16, 0.16, 1.2, M.wood, 6,
      17.5 + (i % 4) * 0.36, baseY + 0.2 + Math.floor(i / 4) * 0.34, 9.5 + (i % 3) * 0.1);
    log.rotation.z = Math.PI / 2;
    root.add(log);
  }

  // 干草垛
  const hay = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.9, 2.2, 12), M.thatch);
  hay.position.set(-17, baseY + 1.1, 11.5);
  hay.castShadow = true;
  root.add(hay);
  const hayTop = new THREE.Mesh(new THREE.ConeGeometry(1.9, 1.2, 12), M.thatch);
  hayTop.position.set(-17, baseY + 2.8, 11.5);
  root.add(hayTop);

  // 训练假人
  const dummy = new THREE.Group();
  dummy.add(cyl(0.18, 0.22, 1.9, M.wood, 8, 0, 0.95, 0));
  dummy.add(box(1.5, 0.22, 0.22, M.wood, 0, 1.4, 0));
  const sack = new THREE.Mesh(new THREE.SphereGeometry(0.42, 10, 8), matte('#c9b48a'));
  sack.position.y = 2.05; sack.scale.y = 1.2;
  dummy.add(sack);
  dummy.position.set(-8, baseY, 10.5);
  root.add(dummy);

  // 市集摊位
  const stall = (x, z, cloth) => {
    const g = new THREE.Group();
    [-1.5, 1.5].forEach((dx) => [-1, 1].forEach((dz) => g.add(cyl(0.08, 0.08, 2.2, M.wood, 6, dx, 1.1, dz))));
    const top = box(3.6, 0.15, 2.4, cloth, 0, 2.2, 0);
    g.add(top);
    g.add(box(3.2, 0.16, 1.0, M.wood, 0, 1.05, 0.9));
    for (let i = 0; i < 5; i++) {
      const f = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 8), matte(['#d2574e', '#e0b25a', '#6f9a4a', '#c9607f', '#e8dcc0'][i]));
      f.position.set(-1.2 + i * 0.6, 1.28, 0.9);
      g.add(f);
    }
    g.position.set(x, baseY, z);
    g.rotation.y = (x % 3) * 0.3;
    root.add(g);
  };
  stall(7.5, 10.5, M.banner);
  stall(11.5, 11.5, M.bannerBlue);
  stall(4.0, 12.5, M.thatch);

  return {
    root, materials: M, roofs, cutWalls, winGlass, flags, baseY, stainedMats, keepSlabs,
    keep, interior, gate, towerR: 3.3,
  };
}
