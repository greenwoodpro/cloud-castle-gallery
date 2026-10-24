import * as THREE from 'three';
import { fbm, noise2, mulberry32, TAU, matte, MAT, clamp, smoothstep } from './util.js';
import { grassTexture, rockTexture, roofTexture, woodTexture, pathTexture, waterTexture, cloudTexture, glowTexture, fabricTexture } from './textures.js';

export const ISLAND_R = 76;

/* ------------------------------------------------------------------ */
/*  地形高度场：全岛共用，保证所有物件都贴地                              */
/* ------------------------------------------------------------------ */
export function heightAt(x, z) {
  const r = Math.hypot(x, z);
  // 城堡台地：中心压平
  const plateau = smoothstep(30, 16, r); // 0..1，中心为 1
  let h = 0;
  h += (fbm(x * 0.035, z * 0.035, 11, 4) - 0.5) * 7.5;
  h += (fbm(x * 0.11, z * 0.11, 27, 3) - 0.5) * 1.9;
  h += Math.sin(x * 0.08 + 1.2) * Math.cos(z * 0.075) * 0.9;
  // 湖泊洼地（东侧）
  const lake = Math.hypot(x - 36, z - 20);
  h -= smoothstep(16, 4, lake) * 4.6;
  // 边缘缓降
  h -= smoothstep(ISLAND_R * 0.72, ISLAND_R, r) * 3.2;
  // 台地压平
  h = h * (1 - plateau * 0.86) + plateau * 0.35;
  return h;
}

/* ------------------------------------------------------------------ */
/*  天空穹顶                                                           */
/* ------------------------------------------------------------------ */
const SKY_VERT = /* glsl */`
  varying vec3 vDir;
  void main() {
    vDir = normalize(position);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const SKY_FRAG = /* glsl */`
  uniform vec3 topColor;
  uniform vec3 midColor;
  uniform vec3 botColor;
  uniform vec3 sunDir;
  uniform vec3 sunColor;
  uniform float sunSize;
  uniform float haze;
  varying vec3 vDir;
  void main() {
    vec3 d = normalize(vDir);
    float y = d.y;
    vec3 c;
    if (y > 0.0) {
      // 天顶深、天际浅的三段渐变，接近水彩晕染
      c = mix(midColor, topColor, pow(clamp(y, 0.0, 1.0), 0.52));
    } else {
      c = mix(midColor, botColor, pow(clamp(-y, 0.0, 1.0), 0.42));
    }
    // 地平线附近的暖色薄雾带
    float horizon = exp(-abs(y) * 9.0);
    c = mix(c, botColor * 1.06, horizon * 0.34 * haze);
    // 太阳辉光
    float sd = max(dot(d, normalize(sunDir)), 0.0);
    c += sunColor * pow(sd, 6.0) * 0.42 * haze;
    c += sunColor * pow(sd, 1.8) * 0.10 * haze;
    c += sunColor * smoothstep(1.0 - sunSize, 1.0, sd) * 1.2 * haze;
    // 轻微颗粒，模拟水彩纸纹
    float g = fract(sin(dot(d.xy, vec2(12.9898, 78.233))) * 43758.5453);
    c += (g - 0.5) * 0.018;
    gl_FragColor = vec4(c, 1.0);
  }
`;

export function createSky() {
  const uniforms = {
    topColor: { value: new THREE.Color('#5c9fd6') },
    midColor: { value: new THREE.Color('#bcd9e8') },
    botColor: { value: new THREE.Color('#f4e3c8') },
    sunDir: { value: new THREE.Vector3(0.5, 0.6, 0.4) },
    sunColor: { value: new THREE.Color('#fff3d0') },
    sunSize: { value: 0.995 },
    haze: { value: 1.0 },
  };
  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(600, 48, 32),
    new THREE.ShaderMaterial({
      uniforms,
      vertexShader: SKY_VERT,
      fragmentShader: SKY_FRAG,
      side: THREE.BackSide,
      depthWrite: false,
      fog: false,
    })
  );
  mesh.renderOrder = -1000;
  mesh.frustumCulled = false;
  return { mesh, uniforms };
}

/* ------------------------------------------------------------------ */
/*  星星                                                               */
/* ------------------------------------------------------------------ */
export function createStars(count = 1400) {
  const rand = mulberry32(2024);
  const pos = new Float32Array(count * 3);
  const size = new Float32Array(count);
  const col = new Float32Array(count * 3);
  const c = new THREE.Color();
  for (let i = 0; i < count; i++) {
    const u = rand() * 2 - 1;
    const th = rand() * TAU;
    const s = Math.sqrt(1 - u * u);
    const R = 480;
    pos[i * 3] = R * s * Math.cos(th);
    pos[i * 3 + 1] = Math.abs(R * u) * 0.92 + 18;
    pos[i * 3 + 2] = R * s * Math.sin(th);
    size[i] = 1.2 + rand() * 5.2;
    c.setHSL(0.08 + rand() * 0.12, 0.35 + rand() * 0.3, 0.72 + rand() * 0.28);
    col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('aSize', new THREE.BufferAttribute(size, 1));
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  const mat = new THREE.PointsMaterial({
    size: 3.2,
    map: glowTexture('rgba(255,255,255,1)'),
    vertexColors: true,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: false,
    opacity: 0,
  });
  const points = new THREE.Points(geo, mat);
  points.frustumCulled = false;
  points.renderOrder = -999;
  return points;
}

/* ------------------------------------------------------------------ */
/*  浮空岛主体：草皮顶面 + 岩石底锥 + 垂落石柱                            */
/* ------------------------------------------------------------------ */
export function createIsland() {
  const group = new THREE.Group();
  group.name = 'island';

  /* --- 顶面网格 --- */
  const RAD = 128, RINGS = 56;
  const verts = [], cols = [], uvs = [], idx = [];
  const cGrass = new THREE.Color('#93b95f');
  const cGrass2 = new THREE.Color('#b3d183');
  const cRock = new THREE.Color('#c2ac90');
  const tmp = new THREE.Color();

  for (let i = 0; i <= RINGS; i++) {
    const rt = i / RINGS;
    const r = rt * ISLAND_R;
    for (let j = 0; j <= RAD; j++) {
      const a = (j / RAD) * TAU;
      const x = Math.cos(a) * r, z = Math.sin(a) * r;
      let y = heightAt(x, z);
      // 边缘做一点随机碎裂
      if (rt > 0.9) y += (noise2(x * 0.5, z * 0.5, 5) - 0.5) * 1.6;
      verts.push(x, y, z);
      // UV 以世界坐标铺开（每 4 个单位一个贴图周期），避免高频拉伸
      uvs.push(x * 0.25, z * 0.25);

      const n = fbm(x * 0.07, z * 0.07, 41, 3);
      tmp.copy(cGrass).lerp(cGrass2, n);
      // 湖边与陡坡转岩石色
      const lake = smoothstep(16, 6, Math.hypot(x - 36, z - 20));
      tmp.lerp(cRock, clamp(lake * 0.75 + smoothstep(0.86, 1.0, rt) * 0.85, 0, 1));
      cols.push(tmp.r, tmp.g, tmp.b);
    }
  }
  for (let i = 0; i < RINGS; i++) {
    for (let j = 0; j < RAD; j++) {
      // 逆时针绕向 → 法线朝上，俯视可见
      const a = i * (RAD + 1) + j, b = a + 1, c = a + RAD + 1, d = c + 1;
      idx.push(a, b, c, b, d, c);
    }
  }
  const topGeo = new THREE.BufferGeometry();
  topGeo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
  topGeo.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3));
  topGeo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  topGeo.setIndex(idx);
  topGeo.computeVertexNormals();

  // 贴图已含最终颜色，材质保持白色；UV 每 4 世界单位一个周期
  const grassMat = new THREE.MeshStandardMaterial({
    map: grassTexture([1, 1]),
    color: '#ffffff',
    roughness: 1.0,
    metalness: 0,
  });
  const top = new THREE.Mesh(topGeo, grassMat);
  top.receiveShadow = true;
  group.add(top);

  /* --- 边缘岩裙：草皮断面，露出下方岩层 --- */
  {
    const SKIRT = 90, SDROP = 7.5;
    const sv = [], sc = [], su = [], si = [];
    const cRockEdge = new THREE.Color('#f2ece0');
    for (let j = 0; j <= 1; j++) {
      for (let i = 0; i <= SKIRT; i++) {
        const a = (i / SKIRT) * TAU;
        const x = Math.cos(a) * ISLAND_R, z = Math.sin(a) * ISLAND_R;
        const topY = heightAt(x, z);
        const n = noise2(x * 0.35, z * 0.35, 77);
        if (j === 0) {
          sv.push(x, topY + 0.1, z);
          su.push(i / 3, 0);
          cRockEdge.clone().offsetHSL(0, 0, 0.02);
          sc.push(cRockEdge.r, cRockEdge.g, cRockEdge.b);
        } else {
          const drop = SDROP * (0.55 + n * 0.9);
          sv.push(x * 0.985, topY - drop, z * 0.985);
          su.push(i / 3, 1.6);
          const c2 = cRockEdge.clone().multiplyScalar(0.82);
          sc.push(c2.r, c2.g, c2.b);
        }
      }
    }
    for (let i = 0; i < SKIRT; i++) {
      const a = i, b = i + 1, c = i + SKIRT + 1, d = c + 1;
      si.push(a, c, b, b, c, d);
    }
    const sg = new THREE.BufferGeometry();
    sg.setAttribute('position', new THREE.Float32BufferAttribute(sv, 3));
    sg.setAttribute('color', new THREE.Float32BufferAttribute(sc, 3));
    sg.setAttribute('uv', new THREE.Float32BufferAttribute(su, 2));
    sg.setIndex(si);
    sg.computeVertexNormals();
    const skirt = new THREE.Mesh(sg, new THREE.MeshStandardMaterial({
      map: rockTexture([1, 1]), color: '#ffffff', vertexColors: true, roughness: 1, metalness: 0,
      flatShading: true, side: THREE.DoubleSide,
    }));
    skirt.castShadow = true;
    skirt.receiveShadow = true;
    group.add(skirt);
  }

  /* --- 底部岩体：倒悬水滴轮廓（非直锥），层层收窄 --- */
  const rockMat = new THREE.MeshStandardMaterial({
    map: rockTexture([1, 1]),
    color: '#ffffff',
    roughness: 1,
    metalness: 0,
    flatShading: true,
    vertexColors: true,
    emissive: '#6b5a48',
    emissiveIntensity: 0.55,
  });
  {
    // 轮廓（半径, 高度）：起始点在草皮顶面之下，避免与顶面穿插
    const profile = [
      [ISLAND_R * 0.985, -4.5], [ISLAND_R * 0.955, -9], [ISLAND_R * 0.895, -14],
      [ISLAND_R * 0.79, -19.5], [ISLAND_R * 0.645, -25.5], [ISLAND_R * 0.50, -31],
      [ISLAND_R * 0.355, -36], [ISLAND_R * 0.225, -41], [ISLAND_R * 0.115, -45.5],
      [ISLAND_R * 0.045, -49], [0, -52],
    ];
    const SEG = 44, RINGS = profile.length;
    const rv = [], rc = [], ru = [], ri = [];
    const cBase = new THREE.Color('#f6f0e4');
    const cDeep = new THREE.Color('#c2b39c');
    for (let r = 0; r < RINGS; r++) {
      const [rad, yy] = profile[r];
      for (let i = 0; i <= SEG; i++) {
        const a = (i / SEG) * TAU;
        const t = r / (RINGS - 1);
        // 角度方向的岩层起伏
        const wob = 1 + (noise2(a * 3.2, t * 9, 3) - 0.5) * 0.30 * (1 - t * 0.55);
        const wob2 = 1 + (noise2(a * 7.5, t * 16, 21) - 0.5) * 0.13;
        const rr = rad * wob * wob2;
        rv.push(Math.cos(a) * rr, yy + (noise2(a * 4, t * 12, 9) - 0.5) * 2.4 * (1 - t * 0.4), Math.sin(a) * rr);
        ru.push(i * 3.2, t * 11);
        const cc = cBase.clone().lerp(cDeep, Math.pow(t, 0.72));
        rc.push(cc.r, cc.g, cc.b);
      }
    }
    for (let r = 0; r < RINGS - 1; r++) {
      for (let i = 0; i < SEG; i++) {
        const a = r * (SEG + 1) + i, b = a + 1, c = a + SEG + 1, d = c + 1;
        ri.push(a, c, b, b, c, d);
      }
    }
    const rg = new THREE.BufferGeometry();
    rg.setAttribute('position', new THREE.Float32BufferAttribute(rv, 3));
    rg.setAttribute('color', new THREE.Float32BufferAttribute(rc, 3));
    rg.setAttribute('uv', new THREE.Float32BufferAttribute(ru, 2));
    rg.setIndex(ri);
    rg.computeVertexNormals();
    const body = new THREE.Mesh(rg, rockMat);
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);

    // 底部垂挂的细石柱
    const rand0 = mulberry32(66);
    const spurMat = matte('#8a7660', { flatShading: true });
    for (let i = 0; i < 9; i++) {
      const a = rand0() * TAU;
      const r = rand0() * 0.42;
      const len = 5 + rand0() * 11;
      const sp = new THREE.Mesh(new THREE.ConeGeometry(1.2 + rand0() * 1.9, len, 6), spurMat);
      sp.position.set(Math.cos(a) * r * ISLAND_R, -46 - len * 0.4 + rand0() * 6, Math.sin(a) * r * ISLAND_R);
      sp.rotation.x = Math.PI;
      sp.rotation.y = rand0() * 3;
      sp.castShadow = true;
      group.add(sp);
    }
  }

  /* --- 底部碎裂岩块 --- */
  const rand = mulberry32(555);
  const rubbleMat = matte('#9c866c', { flatShading: true });
  for (let i = 0; i < 26; i++) {
    const g = new THREE.IcosahedronGeometry(1 + rand() * 3.4, 0);
    const m = new THREE.Mesh(g, rubbleMat);
    const a = rand() * TAU;
    const r = 6 + rand() * 30;
    m.position.set(Math.cos(a) * r, -6 - rand() * 34, Math.sin(a) * r);
    m.rotation.set(rand() * 3, rand() * 3, rand() * 3);
    m.scale.y = 0.6 + rand() * 0.8;
    m.castShadow = true;
    group.add(m);
  }

  /* --- 漂浮的小岩块（环绕） --- */
  const floaters = new THREE.Group();
  for (let i = 0; i < 9; i++) {
    const g = new THREE.IcosahedronGeometry(0.7 + rand() * 1.6, 0);
    const m = new THREE.Mesh(g, rubbleMat);
    const a = rand() * TAU;
    m.userData = { r: 72 + rand() * 26, a, y: -6 + rand() * 22, sp: 0.02 + rand() * 0.05 };
    m.castShadow = true;
    floaters.add(m);
  }
  group.add(floaters);

  return { group, floaters };
}

/* ------------------------------------------------------------------ */
/*  湖泊 + 瀑布                                                        */
/* ------------------------------------------------------------------ */
export function createWater() {
  const group = new THREE.Group();
  const tex = waterTexture([5, 5]);
  const mat = new THREE.MeshStandardMaterial({
    map: tex,
    color: '#8fd0d8',
    roughness: 0.18,
    metalness: 0.05,
    transparent: true,
    opacity: 0.88,
  });
  const lake = new THREE.Mesh(new THREE.CircleGeometry(10.5, 48), mat);
  lake.rotation.x = -Math.PI / 2;
  lake.position.set(36, heightAt(36, 20) + 0.55, 20);
  group.add(lake);

  // 湖岸石圈
  const rockMat = matte('#a4907a', { flatShading: true });
  const rand = mulberry32(31);
  for (let i = 0; i < 34; i++) {
    const a = (i / 34) * TAU;
    const r = 10.6 + rand() * 1.3;
    const s = 0.5 + rand() * 0.85;
    const m = new THREE.Mesh(new THREE.DodecahedronGeometry(s, 0), rockMat);
    m.position.set(36 + Math.cos(a) * r, heightAt(36 + Math.cos(a) * r, 20 + Math.sin(a) * r) + 0.2, 20 + Math.sin(a) * r);
    m.rotation.set(rand() * 3, rand() * 3, rand() * 3);
    m.castShadow = true;
    group.add(m);
  }

  // 瀑布：从湖西侧断崖落下
  const fallTex = waterTexture([1, 4]);
  const fallMat = new THREE.MeshStandardMaterial({
    map: fallTex, color: '#cdeef2', transparent: true, opacity: 0.7,
    roughness: 0.2, side: THREE.DoubleSide, emissive: '#5fa8b8', emissiveIntensity: 0.25,
  });
  const fall = new THREE.Mesh(new THREE.PlaneGeometry(4.0, 28), fallMat);
  fall.position.set(26.0, -6, 20.5);
  fall.rotation.y = Math.PI * 0.5;
  group.add(fall);

  // 瀑布顶端小水花
  const mistMat = new THREE.MeshBasicMaterial({
    map: glowTexture('rgba(230,250,255,0.9)'), transparent: true, depthWrite: false,
    blending: THREE.AdditiveBlending, opacity: 0.5,
  });
  for (let i = 0; i < 10; i++) {
    const s = 1.2 + rand() * 2.4;
    const m = new THREE.Mesh(new THREE.PlaneGeometry(s, s), mistMat);
    m.position.set(26.0 + (rand() - 0.5) * 3, 3.6 + rand() * 2.4, 20.5 + (rand() - 0.5) * 3);
    m.userData = { ph: rand() * 10, sp: 0.4 + rand() * 0.5 };
    group.add(m);
  }

  return { group, lake, fallTex, mist: group.children.filter((c) => c.userData.ph !== undefined) };
}

/* ------------------------------------------------------------------ */
/*  树木                                                               */
/* ------------------------------------------------------------------ */
export function createTree(kind = 'round', scale = 1) {
  const g = new THREE.Group();
  const trunkMat = matte('#8a6446');
  const leafA = matte('#7fb356');
  const leafB = matte('#9cca6e');
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.16 * scale, 0.26 * scale, 1.7 * scale, 7), trunkMat);
  trunk.position.y = 0.85 * scale;
  trunk.castShadow = true;
  g.add(trunk);

  if (kind === 'round') {
    const blobs = [[0, 2.35, 0, 1.25], [-0.7, 2.05, 0.3, 0.85], [0.65, 2.1, -0.35, 0.8], [0.1, 3.0, 0.2, 0.75]];
    blobs.forEach((b, i) => {
      const m = new THREE.Mesh(new THREE.SphereGeometry(b[3] * scale, 10, 8), i % 2 ? leafA : leafB);
      m.position.set(b[0] * scale, b[1] * scale, b[2] * scale);
      m.scale.y = 0.88;
      m.castShadow = true;
      g.add(m);
    });
  } else if (kind === 'pine') {
    for (let i = 0; i < 3; i++) {
      const m = new THREE.Mesh(new THREE.ConeGeometry((1.15 - i * 0.28) * scale, (1.5 - i * 0.2) * scale, 9), i % 2 ? leafA : leafB);
      m.position.y = (1.85 + i * 0.72) * scale;
      m.castShadow = true;
      g.add(m);
    }
  } else { // 枯树
    const rand = mulberry32(12);
    for (let i = 0; i < 4; i++) {
      const b = new THREE.Mesh(new THREE.CylinderGeometry(0.05 * scale, 0.1 * scale, 1.2 * scale, 5), trunkMat);
      b.position.set((rand() - 0.5) * 0.7 * scale, (1.9 + rand() * 0.7) * scale, (rand() - 0.5) * 0.7 * scale);
      b.rotation.z = (rand() - 0.5) * 1.1;
      b.rotation.x = (rand() - 0.5) * 0.8;
      g.add(b);
    }
  }
  return g;
}

/* ------------------------------------------------------------------ */
/*  云                                                                 */
/* ------------------------------------------------------------------ */
export function createClouds(count = 9) {
  const group = new THREE.Group();
  const rand = mulberry32(77);
  const tex = cloudTexture();
  for (let i = 0; i < count; i++) {
    const c = new THREE.Group();
    const n = 4 + Math.floor(rand() * 4);
    for (let k = 0; k < n; k++) {
      const s = 8 + rand() * 12;
      const m = new THREE.Mesh(
        new THREE.SphereGeometry(s, 12, 10),
        new THREE.MeshStandardMaterial({ color: '#fffdf7', roughness: 1, metalness: 0, transparent: true, opacity: 0.96, flatShading: true })
      );
      m.position.set((rand() - 0.5) * 18, (rand() - 0.5) * 3.2, (rand() - 0.5) * 12);
      m.scale.set(1, 0.55, 0.85);
      c.add(m);
    }
    const a = rand() * TAU;
    const r = 95 + rand() * 120;
    c.position.set(Math.cos(a) * r, 42 + rand() * 40, Math.sin(a) * r);
    c.userData = { a, r, sp: 0.006 + rand() * 0.012, y: c.position.y };
    group.add(c);
  }
  return group;
}

/* ------------------------------------------------------------------ */
/*  小星球（ inspirations: B-612）                                      */
/* ------------------------------------------------------------------ */
export function createMiniPlanet() {
  const g = new THREE.Group();
  const rock = new THREE.Mesh(new THREE.ConeGeometry(2.2, 4.4, 10, 3),
    matte('#a89177', { flatShading: true }));
  rock.position.y = -2.2;
  rock.rotation.x = Math.PI;
  g.add(rock);
  const cap = new THREE.Mesh(new THREE.SphereGeometry(2.2, 16, 10, 0, TAU, 0, Math.PI / 2), matte('#7fa548'));
  g.add(cap);
  // 迷你树
  const t = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.07, 0.6, 6), matte('#8a6446'));
  t.position.set(0.5, 0.3, 0.2);
  g.add(t);
  const l = new THREE.Mesh(new THREE.SphereGeometry(0.34, 10, 8), matte('#5f8f45'));
  l.position.set(0.5, 0.75, 0.2);
  g.add(l);
  // 迷你玫瑰
  const rose = new THREE.Mesh(new THREE.SphereGeometry(0.17, 10, 8), matte('#d24a44'));
  rose.position.set(-0.45, 0.22, 0.3);
  g.add(rose);
  const st = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.3, 5), matte('#4d7a34'));
  st.position.set(-0.45, 0.06, 0.3);
  g.add(st);
  return g;
}

/* ------------------------------------------------------------------ */
/*  道路                                                               */
/* ------------------------------------------------------------------ */
export function createRoad(points, width = 2.6) {
  const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(p[0], 0, p[1])));
  const seg = 160;
  const verts = [], uvs = [], idx = [];
  for (let i = 0; i <= seg; i++) {
    const t = i / seg;
    const p = curve.getPoint(t);
    const tan = curve.getTangent(t);
    const nrm = new THREE.Vector3(-tan.z, 0, tan.x).normalize();
    const w = width * (0.8 + 0.4 * Math.sin(t * 9 + 1));
    const l = p.clone().addScaledVector(nrm, w / 2);
    const r = p.clone().addScaledVector(nrm, -w / 2);
    const yl = heightAt(l.x, l.z) + 0.06, yr = heightAt(r.x, r.z) + 0.06;
    verts.push(l.x, yl, l.z, r.x, yr, r.z);
    uvs.push(0, t * 14, 1, t * 14);
  }
  for (let i = 0; i < seg; i++) {
    const a = i * 2, b = a + 1, c = a + 2, d = a + 3;
    idx.push(a, c, b, b, c, d);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  const mat = new THREE.MeshStandardMaterial({ map: pathTexture([1, 1]), roughness: 1, metalness: 0 });
  const m = new THREE.Mesh(geo, mat);
  m.receiveShadow = true;
  return m;
}
