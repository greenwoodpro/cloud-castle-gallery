import * as THREE from 'three';

/* 把静态的小物件按材质颜色合并成大网格，显著减少 draw call。
   会跳过：剖切墙、屋顶、旗帜、火焰、旋转件、瀑布、水雾、精灵、带贴图/透明的材质。 */
export function mergeStaticWorld(root, ctx) {
  root.updateMatrixWorld(true);

  const noMerge = new Set();
  const mark = (obj) => obj && obj.traverse((o) => noMerge.add(o));
  ctx.cutWalls.forEach((w) => mark(w.obj));
  ctx.cutRoofs.forEach(mark);
  ctx.fires.forEach(mark);
  ctx.spinners.forEach(mark);
  ctx.banners.forEach((b) => b && noMerge.add(b));
  ctx.mist.forEach((s) => noMerge.add(s));
  if (ctx.waterfall) mark(ctx.waterfall);

  const buckets = new Map();
  const candidates = [];

  root.traverse((o) => {
    if (!o.isMesh || o.isInstancedMesh) return;
    if (noMerge.has(o)) return;
    if (o.children.length) return; // 保留带子节点（描边等）的对象
    if (o.isSkinnedMesh) return;
    const m = o.material;
    if (!m || !m.isMeshToonMaterial) return;
    if (m.map || m.transparent || m.vertexColors) return;
    const g = o.geometry;
    if (!g || !g.attributes || !g.attributes.position) return;
    const key = [
      m.color.getHexString(),
      m.emissive ? m.emissive.getHexString() : '000000',
      m.emissiveIntensity ?? 1,
      m.side,
      m.opacity,
    ].join('|');
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key).push(o);
    candidates.push(o);
  });

  let mergedCount = 0;
  let groupsMade = 0;

  for (const [key, list] of buckets) {
    if (list.length < 2) continue;
    const posChunks = [];
    const normChunks = [];
    const uvChunks = [];
    let total = 0;
    for (const mesh of list) {
      let g = mesh.geometry.clone();
      g.applyMatrix4(mesh.matrixWorld);
      if (g.index) g = g.toNonIndexed();
      const p = g.attributes.position;
      if (!p) continue;
      total += p.count;
      posChunks.push(p.array);
      const n = g.attributes.normal;
      normChunks.push(n ? n.array : new Float32Array(p.count * 3));
      const uv = g.attributes.uv;
      uvChunks.push(uv ? uv.array : new Float32Array(p.count * 2));
    }
    if (!total) continue;

    const pos = new Float32Array(total * 3);
    const norm = new Float32Array(total * 3);
    const uv = new Float32Array(total * 2);
    let o3 = 0, o2 = 0;
    for (let i = 0; i < posChunks.length; i++) {
      pos.set(posChunks[i], o3);
      norm.set(normChunks[i], o3);
      uv.set(uvChunks[i], o2);
      const count = posChunks[i].length / 3;
      o3 += count * 3;
      o2 += count * 2;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('normal', new THREE.BufferAttribute(norm, 3));
    geo.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    geo.computeBoundingSphere();
    geo.computeBoundingBox();

    const base = list[0].material;
    const mat = base.clone();
    mat.transparent = false;
    mat.opacity = 1;
    mat.map = null;

    const merged = new THREE.Mesh(geo, mat);
    merged.castShadow = true;
    merged.receiveShadow = true;
    merged.matrixAutoUpdate = false;
    merged.name = 'merged_' + key;
    root.add(merged);
    groupsMade++;
    mergedCount += list.length;
    for (const mesh of list) {
      if (mesh.parent) mesh.parent.remove(mesh);
    }
  }

  return { mergedCount, groupsMade };
}
/* 合并一个「整体淡出」的组（如某一面墙）内部的静态网格。
   组内所有网格共享同一套淡出状态，因此可以安全合并。 */
export function mergeCutGroup(group) {
  group.updateWorldMatrix(true, true);
  const inv = new THREE.Matrix4().copy(group.matrixWorld).invert();
  const buckets = new Map();

  group.traverse((o) => {
    if (!o.isMesh || o.isInstancedMesh) return;
    if (o.children.length) return;
    const m = o.material;
    if (!m || !m.isMeshToonMaterial) return;
    if (m.map || m.vertexColors || m.opacity < 0.99) return;
    const g = o.geometry;
    if (!g || !g.attributes || !g.attributes.position) return;
    const key = [m.color.getHexString(), m.emissive ? m.emissive.getHexString() : '000000', m.side].join('|');
    if (!buckets.has(key)) buckets.set(key, []);
    const local = new THREE.Matrix4().multiplyMatrices(inv, o.matrixWorld);
    buckets.get(key).push({ o, local });
  });

  for (const [, list] of buckets) {
    if (list.length < 2) continue;
    const posChunks = [], normChunks = [], uvChunks = [];
    let total = 0;
    for (const { o, local } of list) {
      let g = o.geometry.clone();
      g.applyMatrix4(local);
      if (g.index) g = g.toNonIndexed();
      const p = g.attributes.position;
      if (!p) continue;
      total += p.count;
      posChunks.push(p.array);
      const n = g.attributes.normal;
      normChunks.push(n ? n.array : new Float32Array(p.count * 3));
      const uv = g.attributes.uv;
      uvChunks.push(uv ? uv.array : new Float32Array(p.count * 2));
    }
    if (!total) continue;
    const pos = new Float32Array(total * 3);
    const norm = new Float32Array(total * 3);
    const uv = new Float32Array(total * 2);
    let o3 = 0, o2 = 0;
    for (let i = 0; i < posChunks.length; i++) {
      pos.set(posChunks[i], o3);
      norm.set(normChunks[i], o3);
      uv.set(uvChunks[i], o2);
      const count = posChunks[i].length / 3;
      o3 += count * 3;
      o2 += count * 2;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('normal', new THREE.BufferAttribute(norm, 3));
    geo.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    geo.computeBoundingSphere();
    geo.computeBoundingBox();

    const mat = list[0].o.material.clone();
    mat.transparent = true;
    mat.opacity = 1;
    const merged = new THREE.Mesh(geo, mat);
    merged.castShadow = true;
    merged.receiveShadow = true;
    group.add(merged);
    for (const { o } of list) if (o.parent) o.parent.remove(o);
  }

  // 重新收集该组需要参与淡出的材质
  const mats = new Set();
  group.traverse((o) => {
    if (o.isMesh && o.material) {
      const arr = Array.isArray(o.material) ? o.material : [o.material];
      arr.forEach((m) => mats.add(m));
    }
  });
  return [...mats];
}

/* 合并所有描边网格（Basic/BackSide/透明），它们完全静态 */
export function mergeOutlines(root) {
  root.updateMatrixWorld(true);
  const buckets = new Map();
  root.traverse((o) => {
    if (!o.isMesh || o.isInstancedMesh) return;
    const m = o.material;
    if (!m || !m.isMeshBasicMaterial) return;
    if (m.side !== THREE.BackSide || !m.transparent || m.map) return;
    if (o.children.length) return;
    const key = [m.color.getHexString(), m.opacity, m.side].join('|');
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key).push(o);
  });
  let n = 0;
  for (const [, list] of buckets) {
    if (list.length < 2) continue;
    const posChunks = [], normChunks = [], uvChunks = [];
    let total = 0;
    for (const mesh of list) {
      let g = mesh.geometry.clone();
      g.applyMatrix4(mesh.matrixWorld);
      if (g.index) g = g.toNonIndexed();
      const p = g.attributes.position;
      if (!p) continue;
      total += p.count;
      posChunks.push(p.array);
      const nn = g.attributes.normal;
      normChunks.push(nn ? nn.array : new Float32Array(p.count * 3));
      const uv = g.attributes.uv;
      uvChunks.push(uv ? uv.array : new Float32Array(p.count * 2));
    }
    if (!total) continue;
    const pos = new Float32Array(total * 3);
    const norm = new Float32Array(total * 3);
    const uv = new Float32Array(total * 2);
    let o3 = 0, o2 = 0;
    for (let i = 0; i < posChunks.length; i++) {
      pos.set(posChunks[i], o3);
      norm.set(normChunks[i], o3);
      uv.set(uvChunks[i], o2);
      o3 += posChunks[i].length;
      o2 += uvChunks[i].length;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('normal', new THREE.BufferAttribute(norm, 3));
    geo.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    geo.computeBoundingSphere();
    const mat = list[0].material.clone();
    const merged = new THREE.Mesh(geo, mat);
    merged.castShadow = false;
    merged.receiveShadow = false;
    merged.renderOrder = -1;
    root.add(merged);
    for (const mesh of list) if (mesh.parent) mesh.parent.remove(mesh);
    n += list.length;
  }
  return n;
}

/* 去掉小物件与透明物体的投影，减轻阴影 pass */
export function trimShadowCasters(root) {
  const v = new THREE.Vector3();
  let removed = 0;
  root.traverse((o) => {
    if (!o.isMesh || !o.castShadow) return;
    if (o.material && o.material.transparent) {
      o.castShadow = false;
      removed++;
      return;
    }
    const g = o.geometry;
    if (!g) return;
    if (!g.boundingSphere) g.computeBoundingSphere();
    if (!g.boundingSphere) return;
    o.getWorldScale(v);
    const r = g.boundingSphere.radius * Math.max(v.x, v.y, v.z);
    if (r < 0.42) {
      o.castShadow = false;
      removed++;
    }
  });
  return removed;
}

/* 合并某个组内部的静态网格（用于云团、远岛），保留组变换 */
export function mergeGroupLocal(group, allowTransparent = false) {
  group.updateWorldMatrix(true, true);
  const inv = new THREE.Matrix4().copy(group.matrixWorld).invert();
  const buckets = new Map();
  group.traverse((o) => {
    if (!o.isMesh || o.isInstancedMesh) return;
    if (o.children.length) return;
    const m = o.material;
    if (!m || !m.isMeshToonMaterial) return;
    if (m.map || m.vertexColors) return;
    if (!allowTransparent && (m.transparent || m.opacity < 0.99)) return;
    const g = o.geometry;
    if (!g || !g.attributes || !g.attributes.position) return;
    const key = [m.color.getHexString(), m.opacity, m.side, m.transparent ? 1 : 0].join('|');
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key).push({ o, local: new THREE.Matrix4().multiplyMatrices(inv, o.matrixWorld) });
  });
  let n = 0;
  for (const [, list] of buckets) {
    if (list.length < 2) continue;
    const posChunks = [], normChunks = [], uvChunks = [];
    let total = 0;
    for (const { o, local } of list) {
      let g = o.geometry.clone();
      g.applyMatrix4(local);
      if (g.index) g = g.toNonIndexed();
      const p = g.attributes.position;
      if (!p) continue;
      total += p.count;
      posChunks.push(p.array);
      const nn = g.attributes.normal;
      normChunks.push(nn ? nn.array : new Float32Array(p.count * 3));
      const uv = g.attributes.uv;
      uvChunks.push(uv ? uv.array : new Float32Array(p.count * 2));
    }
    if (!total) continue;
    const pos = new Float32Array(total * 3);
    const norm = new Float32Array(total * 3);
    const uv = new Float32Array(total * 2);
    let o3 = 0, o2 = 0;
    for (let i = 0; i < posChunks.length; i++) {
      pos.set(posChunks[i], o3);
      norm.set(normChunks[i], o3);
      uv.set(uvChunks[i], o2);
      o3 += posChunks[i].length;
      o2 += uvChunks[i].length;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('normal', new THREE.BufferAttribute(norm, 3));
    geo.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    geo.computeBoundingSphere();
    const mat = list[0].o.material.clone();
    const merged = new THREE.Mesh(geo, mat);
    merged.castShadow = false;
    merged.receiveShadow = false;
    group.add(merged);
    for (const { o } of list) if (o.parent) o.parent.remove(o);
    n += list.length;
  }
  return n;
}
