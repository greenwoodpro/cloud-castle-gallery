import * as THREE from 'three';
import {
  PALETTE, GROUND_Y, islandHeight, edgeRadius, terrainNormal, seedNoise,
  makeCanvasTexture, box, sphere, cylinder, cone, makeRibbon, makeFlag,
} from './core.js';

export const animators = [];
const rand = (a, b) => a + Math.random() * (b - a);

function placeOnGround(obj, x, z, offset = 0) {
  obj.position.set(x, islandHeight(x, z) + offset, z);
  return obj;
}

export function createSky(scene) {
  const sunDir = new THREE.Vector3(-0.52, 0.30, 0.80).normalize();
  const uniforms = {
    topColor: { value: new THREE.Color(0x719dc7) },
    midColor: { value: new THREE.Color(0xe9b8c6) },
    lowColor: { value: new THREE.Color(0xffdfc4) },
    sunColor: { value: new THREE.Color(0xffd09a) },
    sunDir: { value: sunDir },
  };
  const skyMat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    uniforms,
    vertexShader: `
      varying vec3 vDir;
      void main() {
        vDir = normalize(position);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 topColor;
      uniform vec3 midColor;
      uniform vec3 lowColor;
      uniform vec3 sunColor;
      uniform vec3 sunDir;
      varying vec3 vDir;
      void main() {
        float h = vDir.y;
        vec3 col = mix(lowColor, midColor, smoothstep(-0.13, 0.0, h));
        col = mix(col, topColor, smoothstep(0.0, 0.115, h));
        float sunAmount = max(dot(normalize(vDir), sunDir), 0.0);
        col += sunColor * pow(sunAmount, 18.0) * 0.34;
        col += sunColor * pow(sunAmount, 3.0) * 0.09;
        float band = sin(vDir.y * 46.0 + vDir.x * 9.0) * 0.006;
        col += band;
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
  const sky = new THREE.Mesh(new THREE.SphereGeometry(430, 40, 28), skyMat);
  scene.add(sky);

  const sunCanvas = document.createElement('canvas');
  sunCanvas.width = sunCanvas.height = 256;
  const sctx = sunCanvas.getContext('2d');
  const grad = sctx.createRadialGradient(128, 128, 8, 128, 128, 128);
  grad.addColorStop(0, 'rgba(255,244,215,1)');
  grad.addColorStop(0.18, 'rgba(255,220,165,0.95)');
  grad.addColorStop(0.42, 'rgba(255,195,140,0.35)');
  grad.addColorStop(1, 'rgba(255,180,130,0)');
  sctx.fillStyle = grad;
  sctx.fillRect(0, 0, 256, 256);
  const sunTex = new THREE.CanvasTexture(sunCanvas);
  const sunMat = new THREE.SpriteMaterial({
    map: sunTex, color: 0xffffff, transparent: true, opacity: 0.95,
    blending: THREE.AdditiveBlending, depthWrite: false,
  });
  const sun = new THREE.Sprite(sunMat);
  sun.scale.set(90, 90, 1);
  sun.position.copy(sunDir).multiplyScalar(340);
  scene.add(sun);

  const moonCanvas = document.createElement('canvas');
  moonCanvas.width = moonCanvas.height = 256;
  const mctx = moonCanvas.getContext('2d');
  const mglow = mctx.createRadialGradient(128, 128, 4, 128, 128, 120);
  mglow.addColorStop(0, 'rgba(255,247,225,0.78)');
  mglow.addColorStop(0.35, 'rgba(255,238,210,0.20)');
  mglow.addColorStop(1, 'rgba(255,230,200,0)');
  mctx.fillStyle = mglow;
  mctx.fillRect(0, 0, 256, 256);
  mctx.fillStyle = 'rgba(255,248,231,0.95)';
  mctx.beginPath();
  mctx.arc(120, 120, 34, 0, Math.PI * 2);
  mctx.fill();
  mctx.globalCompositeOperation = 'destination-out';
  mctx.beginPath();
  mctx.arc(138, 105, 32, 0, Math.PI * 2);
  mctx.fill();
  mctx.globalCompositeOperation = 'source-over';
  const moonTex = new THREE.CanvasTexture(moonCanvas);
  const moonMat = new THREE.SpriteMaterial({
    map: moonTex, transparent: true, opacity: 0.82, depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const moon = new THREE.Sprite(moonMat);
  moon.scale.set(34, 34, 1);
  moon.position.set(-190, 35, -280);
  scene.add(moon);

  const starCount = 520;
  const positions = new Float32Array(starCount * 3);
  const colors = new Float32Array(starCount * 3);
  const phases = new Float32Array(starCount);
  const c = new THREE.Color();
  for (let i = 0; i < starCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const y = Math.pow(Math.random(), 0.7) * 0.9 + 0.08;
    const r = Math.sqrt(1 - y * y);
    const radius = 300 + Math.random() * 80;
    positions[i * 3] = Math.cos(theta) * r * radius;
    positions[i * 3 + 1] = y * radius;
    positions[i * 3 + 2] = Math.sin(theta) * r * radius;
    c.setHSL(0.09 + Math.random() * 0.18, 0.25, 0.82 + Math.random() * 0.12);
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
    phases[i] = Math.random() * Math.PI * 2;
  }
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  starGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const starMat = new THREE.PointsMaterial({
    size: 2.0, sizeAttenuation: true, vertexColors: true,
    transparent: true, opacity: 0.9, depthWrite: false,
  });
  const stars = new THREE.Points(starGeo, starMat);
  scene.add(stars);
  animators.push((t) => {
    starMat.opacity = 0.68 + Math.sin(t * 0.9) * 0.08;
    stars.rotation.y = t * 0.0025;
  });

  return { sky, sun };
}

function terrainColor(x, z, h, normalY, target) {
  const n = seedNoise(x * 0.35, z * 0.35);
  const n2 = seedNoise(x * 0.09 + 4, z * 0.09 - 2);
  let col;
  if (normalY < 0.74) {
    col = new THREE.Color(0xa9a083);
  } else if (h > 4.1) {
    col = new THREE.Color(PALETTE.grass[1]).lerp(new THREE.Color(0xd6cfa0), n * 0.45);
  } else {
    const a = new THREE.Color(PALETTE.grass[0]);
    const b = new THREE.Color(PALETTE.grass[2]);
    col = a.lerp(b, n2 * 0.75 + n * 0.2);
  }
  if (n > 0.82 && h < 3.8) col.lerp(new THREE.Color(0xc8c795), 0.35);
  target.copy(col);
}

export function createIsland(materials) {
  const group = new THREE.Group();
  const segments = 132;
  const rings = 34;

  const positions = [];
  const colors = [];
  const uvs = [];
  const indices = [];

  const centerH = islandHeight(0, 0);
  positions.push(0, centerH, 0);
  colors.push(0.65, 0.73, 0.53);
  uvs.push(0.5, 0.5);

  for (let i = 1; i <= rings; i++) {
    const t = i / rings;
    for (let j = 0; j < segments; j++) {
      const th = (j / segments) * Math.PI * 2;
      const R = edgeRadius(th);
      const r = R * Math.pow(t, 0.92);
      const x = Math.cos(th) * r;
      const z = Math.sin(th) * r;
      const y = islandHeight(x, z);
      positions.push(x, y, z);
      const n = new THREE.Vector3().copy(terrainNormal(x, z));
      const col = new THREE.Color();
      terrainColor(x, z, y, n.y, col);
      colors.push(col.r, col.g, col.b);
      uvs.push(x / 12, z / 12);
    }
  }

  for (let j = 0; j < segments; j++) {
    const a = 1 + j;
    const b = 1 + (j + 1) % segments;
    indices.push(0, a, b);
  }
  for (let i = 0; i < rings - 1; i++) {
    const row0 = 1 + i * segments;
    const row1 = row0 + segments;
    for (let j = 0; j < segments; j++) {
      const j1 = (j + 1) % segments;
      indices.push(row0 + j, row1 + j, row0 + j1);
      indices.push(row0 + j1, row1 + j, row1 + j1);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  const top = new THREE.Mesh(geo, materials.grass);
  top.receiveShadow = true;
  top.castShadow = false;
  group.add(top);

  const cliffPositions = [];
  const cliffColors = [];
  const cliffIndices = [];
  const layers = [
    { y: 0, f: 1.0, c: 0xcbb78f },
    { y: -1.2, f: 1.014, c: 0xb49f7f },
    { y: -2.9, f: 0.99, c: 0x9f8a6f },
    { y: -4.9, f: 0.945, c: 0xb7a085 },
    { y: -7.2, f: 0.885, c: 0x867570 },
    { y: -9.8, f: 0.815, c: 0xa18a80 },
    { y: -12.5, f: 0.735, c: 0x786a68 },
    { y: -15.3, f: 0.645, c: 0x96817a },
    { y: -18.1, f: 0.545, c: 0x6f6361 },
    { y: -20.8, f: 0.43, c: 0x8a7a71 },
    { y: -23.2, f: 0.29, c: 0x655c5b },
    { y: -25.4, f: 0.1, c: 0x776b67 },
  ];

  for (let b = 0; b < layers.length; b++) {
    for (let j = 0; j < segments; j++) {
      const th = (j / segments) * Math.PI * 2;
      const R = edgeRadius(th);
      const topH = b === 0 ? islandHeight(Math.cos(th) * R * 0.997, Math.sin(th) * R * 0.997) : layers[b].y;
      let y = topH;
      if (b > 0) {
        y = layers[b - 1].y + (layers[b].y - layers[b - 1].y) * 0.92;
      }
      const jitter = b === 0 ? 0 : (seedNoise(j * 1.7, b * 2.3) - 0.5) * 2.1;
      const rf = layers[b].f * (1 + (seedNoise(j * 2.1, b * 4.1) - 0.5) * 0.075);
      const x = Math.cos(th) * R * rf;
      const z = Math.sin(th) * R * rf;
      cliffPositions.push(x, y + jitter * (b === 0 ? 0 : 1), z);
      const c = new THREE.Color(layers[b].c);
      c.offsetHSL(0, 0, (seedNoise(j * 0.7, b) - 0.5) * 0.06);
      cliffColors.push(c.r, c.g, c.b);
    }
  }
  for (let b = 0; b < layers.length - 1; b++) {
    for (let j = 0; j < segments; j++) {
      const j1 = (j + 1) % segments;
      const a = b * segments + j;
      const bb = b * segments + j1;
      const cRow = (b + 1) * segments + j;
      const d = (b + 1) * segments + j1;
      cliffIndices.push(a, cRow, bb, bb, cRow, d);
    }
  }
  const cliffGeo = new THREE.BufferGeometry();
  cliffGeo.setAttribute('position', new THREE.Float32BufferAttribute(cliffPositions, 3));
  cliffGeo.setAttribute('color', new THREE.Float32BufferAttribute(cliffColors, 3));
  cliffGeo.setIndex(cliffIndices);
  cliffGeo.computeVertexNormals();
  const cliffMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1, flatShading: true });
  const cliff = new THREE.Mesh(cliffGeo, cliffMat);
  cliff.castShadow = true;
  cliff.receiveShadow = true;
  group.add(cliff);

  const ribGroup = new THREE.Group();
  for (let i = 0; i < 22; i++) {
    const a = (i / 22) * Math.PI * 2 + seedNoise(i, 9) * 0.16;
    const R = edgeRadius(a);
    const topY = -1.5 - seedNoise(i, 3) * 4.0;
    const h = rand(6, 15);
    const ribMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color().setHSL(0.06, 0.10, 0.36 + seedNoise(i, 5) * 0.18),
      roughness: 1, flatShading: true,
    });
    const rib = new THREE.Mesh(new THREE.ConeGeometry(rand(1.3, 3.2), h, 5, 1), ribMat);
    rib.rotation.x = Math.PI + rand(-0.16, 0.16);
    rib.rotation.z = rand(-0.16, 0.16);
    const rf = 0.88 + seedNoise(i, 8) * 0.069;
    rib.position.set(Math.cos(a) * R * rf, topY - h * 0.45, Math.sin(a) * R * rf);
    rib.scale.set(1.0, 1.0, rand(0.55, 1.1));
    rib.castShadow = true;
    rib.receiveShadow = true;
    ribGroup.add(rib);
  }
  group.add(ribGroup);

  const underGeo = new THREE.IcosahedronGeometry(1, 2);
  const p = underGeo.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
    const n = 0.78 + seedNoise(x * 4 + 2, z * 3) * 0.35;
    p.setXYZ(i, x * n, y * n, z * n);
  }
  underGeo.computeVertexNormals();
  const underMat = new THREE.MeshStandardMaterial({ color: 0x9a8980, roughness: 1, flatShading: true });
  const underside = new THREE.Mesh(underGeo, underMat);
  underside.scale.set(20, 8.5, 20);
  underside.position.y = -18.4;
  underside.castShadow = true;
  underside.receiveShadow = true;
  group.add(underside);

  for (let i = 0; i < 15; i++) {
    const th = (i / 15) * Math.PI * 2 + 0.3;
    const rr = 5 + seedNoise(i, 2) * 14;
    const spike = cone(rand(2.0, 4.2), rand(6, 12), new THREE.MeshStandardMaterial({
      color: new THREE.Color().setHSL(0.06, 0.1, 0.38 + seedNoise(i, 4) * 0.1),
      roughness: 1, flatShading: true,
    }), Math.cos(th) * rr, rand(-27, -19), Math.sin(th) * rr, 7);
    spike.rotation.x = Math.PI + rand(-0.22, 0.22);
    spike.rotation.z = rand(-0.22, 0.22);
    group.add(spike);
  }

  const rockMat = new THREE.MeshStandardMaterial({ color: 0xb2a192, roughness: 1, flatShading: true });
  const rocks = [
    [26, 8, 1.2], [-27, 20, 1.5], [-30, 6, 1.0], [18, -25, 1.3], [-16, -28, 1.1],
    [29, 22, 0.9], [-8, 31, 1.0], [8, 32, 0.7],
  ];
  for (let i = 0; i < rocks.length; i++) {
    const [x, z, s] = rocks[i];
    const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(1, 0), rockMat);
    rock.scale.set(s * 1.2, s * 0.7, s);
    rock.position.set(x, islandHeight(x, z) + s * 0.3, z);
    rock.rotation.set(rand(0, 3), rand(0, 3), rand(0, 3));
    rock.castShadow = true;
    rock.receiveShadow = true;
    group.add(rock);
  }

  return group;
}

export function createClouds() {
  const group = new THREE.Group();
  const cloudMat = new THREE.MeshStandardMaterial({
    color: 0xfff4ec, roughness: 1, flatShading: true,
    transparent: true, opacity: 0.92, depthWrite: false,
  });
  const geo = new THREE.IcosahedronGeometry(1, 1);
  const clusters = [];
  for (let i = 0; i < 26; i++) {
    const th = (i / 26) * Math.PI * 2 + rand(-0.2, 0.2);
    const rad = rand(40, 115);
    clusters.push({
      x: Math.cos(th) * rad,
      z: Math.sin(th) * rad,
      y: rand(-34, -12),
      s: rand(0.8, 1.9),
    });
  }
  let count = 0;
  const per = 6;
  const inst = new THREE.InstancedMesh(geo, cloudMat, clusters.length * per);
  const dummy = new THREE.Object3D();
  const color = new THREE.Color();
  for (const cl of clusters) {
    for (let i = 0; i < per; i++) {
      const a = (i / per) * Math.PI * 2;
      dummy.position.set(
        cl.x + Math.cos(a) * rand(1.5, 5) * cl.s,
        cl.y + rand(-0.8, 1.4) * cl.s,
        cl.z + Math.sin(a) * rand(1.5, 5) * cl.s,
      );
      const sc = rand(2.8, 6.5) * cl.s;
      dummy.scale.set(sc * rand(1.2, 1.7), sc * rand(0.45, 0.7), sc);
      dummy.rotation.set(rand(0, 3), rand(0, 3), rand(0, 3));
      dummy.updateMatrix();
      inst.setMatrixAt(count, dummy.matrix);
      color.setHSL(0.07, 0.12, rand(0.92, 1));
      inst.setColorAt(count, color);
      count++;
    }
  }
  inst.instanceMatrix.needsUpdate = true;
  if (inst.instanceColor) inst.instanceColor.needsUpdate = true;
  group.add(inst);

  const highMat = cloudMat.clone();
  highMat.opacity = 0.28;
  const highGeo = new THREE.IcosahedronGeometry(1, 1);
  for (let i = 0; i < 8; i++) {
    const cl = new THREE.Group();
    const th = rand(0, Math.PI * 2);
    const rad = rand(165, 240);
    cl.position.set(Math.cos(th) * rad, rand(58, 92), Math.sin(th) * rad);
    const n = 3 + Math.floor(rand(0, 3));
    for (let j = 0; j < n; j++) {
      const m = new THREE.Mesh(highGeo, highMat);
      const s = rand(6, 13);
      m.position.set(rand(-12, 12), rand(-2, 2), rand(-7, 7));
      m.scale.set(s * 1.9, s * 0.24, s);
      cl.add(m);
    }
    group.add(cl);
  }

  animators.push((t) => {
    group.rotation.y = t * 0.004;
    group.position.y = Math.sin(t * 0.09) * 0.6;
  });
  return group;
}

function createMiniIsland(scale = 1) {
  const g = new THREE.Group();
  const greens = [
    new THREE.MeshStandardMaterial({ color: 0x9cb68a, roughness: 1, flatShading: true }),
    new THREE.MeshStandardMaterial({ color: 0xafc494, roughness: 1, flatShading: true }),
  ];
  const rock = new THREE.MeshStandardMaterial({ color: 0xa69084, roughness: 1, flatShading: true });
  const top = new THREE.Mesh(new THREE.CylinderGeometry(2.3, 2.55, 0.7, 11), greens[0]);
  top.scale.set(1.4, 1, 1);
  top.position.y = 0;
  top.castShadow = true;
  g.add(top);
  const rockMesh = new THREE.Mesh(new THREE.ConeGeometry(2.45, 5.4, 9), rock);
  rockMesh.rotation.x = Math.PI;
  rockMesh.position.y = -3.0;
  rockMesh.scale.set(1.4, 1, 1);
  rockMesh.castShadow = true;
  g.add(rockMesh);
  for (let i = 0; i < 3; i++) {
    const x = rand(-1.9, 1.9);
    const z = rand(-1.1, 1.1);
    const trunk = cylinder(0.09, 0.13, 1.1, new THREE.MeshStandardMaterial({ color: 0x8a6b50, roughness: 1 }), x, 0.8, z, 6);
    const crown = sphere(rand(0.55, 0.85), greens[i % 2], x, rand(1.45, 1.8), z, 8);
    crown.scale.y = rand(0.9, 1.2);
    g.add(trunk, crown);
  }
  if (scale > 1.2) {
    const tower = cylinder(0.32, 0.4, 3.2, new THREE.MeshStandardMaterial({ color: 0xead9c1, roughness: 1 }), -1.3, 1.9, 0.2, 8);
    const roof = cone(0.8, 1.5, new THREE.MeshStandardMaterial({ color: 0x8e9ab6, roughness: 1 }), -1.3, 4.2, 0.2, 8);
    g.add(tower, roof);
  }
  g.scale.setScalar(scale);
  return g;
}

export function createFloatingIslets(materials) {
  const group = new THREE.Group();
  const specs = [
    { p: [-55, 17, -8], s: 1.5, ph: 0.3 },
    { p: [53, 4, -24], s: 1.2, ph: 1.4 },
    { p: [-48, -5, 33], s: 0.95, ph: 2.2 },
    { p: [45, 31, 30], s: 0.8, ph: 3.1 },
    { p: [62, -13, 15], s: 1.0, ph: 4.0 },
    { p: [-61, 40, 24], s: 0.7, ph: 5.2 },
  ];
  for (const spec of specs) {
    const islet = createMiniIsland(spec.s);
    islet.position.set(...spec.p);
    islet.rotation.y = rand(0, Math.PI * 2);
    islet.userData.baseY = spec.p[1];
    islet.userData.phase = spec.ph;
    group.add(islet);
  }
  animators.push((t) => {
    for (const islet of group.children) {
      islet.position.y = islet.userData.baseY + Math.sin(t * 0.32 + islet.userData.phase) * 0.8;
      islet.rotation.y += 0.0006;
    }
  });
  return group;
}

function createDeciduousTree(materials, variant = 0) {
  const g = new THREE.Group();
  const h = rand(1.6, 3.2);
  const trunk = cylinder(0.12, 0.2, h, materials.trunk, 0, h / 2, 0, 7);
  trunk.rotation.z = rand(-0.08, 0.08);
  g.add(trunk);
  const leafMats = [materials.leaf, materials.leafPale, materials.leafDark, materials.pink];
  const chosen = variant === 2 ? materials.pink : leafMats[Math.floor(rand(0, 3))];
  const blobs = 3 + Math.floor(rand(0, 3));
  for (let i = 0; i < blobs; i++) {
    const s = rand(0.6, 1.05);
    const b = sphere(s, chosen, rand(-0.55, 0.55), h + rand(0.1, 0.9), rand(-0.55, 0.55), 8);
    b.scale.y = rand(0.85, 1.25);
    g.add(b);
  }
  if (variant === 2) {
    for (let i = 0; i < 8; i++) {
      const petal = sphere(0.07, materials.rosePale, rand(-0.7, 0.7), h + rand(0.2, 1.2), rand(-0.7, 0.7), 5);
      petal.castShadow = false;
      g.add(petal);
    }
  }
  return g;
}

function createConifer(materials) {
  const g = new THREE.Group();
  const h = rand(2.2, 4.2);
  const trunk = cylinder(0.1, 0.18, h * 0.7, materials.trunk, 0, h * 0.35, 0, 6);
  g.add(trunk);
  const layers = 3;
  for (let i = 0; i < layers; i++) {
    const c = cone(1.05 - i * 0.22, h * 0.45, materials.leafDark, 0, h * 0.48 + i * h * 0.22, 0, 8);
    g.add(c);
  }
  return g;
}

export function createVegetation(materials) {
  const group = new THREE.Group();
  const zones = [
    { cx: -24, cz: 12, rx: 11, rz: 8, n: 16, conifer: 0.25 },
    { cx: 25, cz: -10, rx: 10, rz: 8, n: 14, conifer: 0.5 },
    { cx: -9, cz: 30, rx: 9, rz: 6, n: 9, conifer: 0.1 },
    { cx: 29, cz: 26, rx: 6, rz: 5, n: 5, conifer: 0.0 },
    { cx: -33, cz: -7, rx: 5, rz: 7, n: 6, conifer: 0.4 },
    { cx: 33, cz: 7, rx: 4, rz: 6, n: 5, conifer: 0.2 },
    { cx: 2, cz: 34, rx: 7, rz: 3, n: 4, conifer: 0.0 },
  ];
  for (const zone of zones) {
    for (let i = 0; i < zone.n; i++) {
      const a = rand(0, Math.PI * 2);
      const rr = Math.sqrt(Math.random());
      const x = zone.cx + Math.cos(a) * zone.rx * rr;
      const z = zone.cz + Math.sin(a) * zone.rz * rr;
      const r = Math.hypot(x, z);
      if (r > 37.8) continue;
      if (Math.hypot(x - 20, z - 14) < 6.0) continue;
      if (Math.hypot(x - 12, z - 19) < 6.2) continue;
      const tree = Math.random() < zone.conifer ? createConifer(materials) : createDeciduousTree(materials, Math.random() < 0.12 ? 2 : 0);
      placeOnGround(tree, x, z, -0.05);
      tree.rotation.y = rand(0, Math.PI * 2);
      tree.scale.setScalar(rand(0.8, 1.25));
      group.add(tree);
    }
  }

  const orchard = new THREE.Group();
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 4; col++) {
      const x = -23 + col * 2.6;
      const z = 22 + row * 2.4;
      const t = createDeciduousTree(materials, 2);
      placeOnGround(t, x, z, -0.05);
      t.scale.setScalar(0.78);
      orchard.add(t);
    }
  }
  group.add(orchard);

  const grassGeo = new THREE.ConeGeometry(0.09, 0.32, 3);
  const grassMat = new THREE.MeshStandardMaterial({ color: 0x92ac79, roughness: 1 });
  const grassInst = new THREE.InstancedMesh(grassGeo, grassMat, 520);
  const dummy = new THREE.Object3D();
  const color = new THREE.Color();
  let gi = 0;
  for (let i = 0; i < 520; i++) {
    const th = rand(0, Math.PI * 2);
    const rr = rand(17, 37.5);
    const x = Math.cos(th) * rr;
    const z = Math.sin(th) * rr;
    if (Math.hypot(x - 20, z - 14) < 5) continue;
    dummy.position.set(x, islandHeight(x, z) + 0.14, z);
    dummy.rotation.set(rand(-0.15, 0.15), rand(0, 3), rand(-0.15, 0.15));
    dummy.scale.set(rand(0.7, 1.5), rand(0.7, 1.4), rand(0.7, 1.5));
    dummy.updateMatrix();
    grassInst.setMatrixAt(gi, dummy.matrix);
    color.setHSL(0.21, 0.25, rand(0.52, 0.68));
    grassInst.setColorAt(gi, color);
    gi++;
  }
  grassInst.count = gi;
  if (grassInst.instanceColor) grassInst.instanceColor.needsUpdate = true;
  group.add(grassInst);

  const flowerGeo = new THREE.SphereGeometry(0.09, 5, 4);
  const flowerMat = new THREE.MeshStandardMaterial({ roughness: 0.8 });
  const flowerInst = new THREE.InstancedMesh(flowerGeo, flowerMat, 360);
  const flowerCols = [0xf3c2c2, 0xf4e4a8, 0xd5bde2, 0xf3f0e2, 0xe4a7a3];
  let fi = 0;
  for (let i = 0; i < 360; i++) {
    const th = rand(0, Math.PI * 2);
    const rr = rand(18, 37);
    const x = Math.cos(th) * rr + rand(-1, 1);
    const z = Math.sin(th) * rr + rand(-1, 1);
    if (Math.hypot(x - 20, z - 14) < 5.5) continue;
    dummy.position.set(x, islandHeight(x, z) + rand(0.12, 0.28), z);
    const s = rand(0.7, 1.4);
    dummy.scale.set(s, s, s);
    dummy.rotation.set(0, rand(0, 3), 0);
    dummy.updateMatrix();
    flowerInst.setMatrixAt(fi, dummy.matrix);
    color.setHex(flowerCols[Math.floor(rand(0, flowerCols.length))]);
    flowerInst.setColorAt(fi, color);
    fi++;
  }
  flowerInst.count = fi;
  if (flowerInst.instanceColor) flowerInst.instanceColor.needsUpdate = true;
  group.add(flowerInst);

  return group;
}

export function createPath(materials) {
  const group = new THREE.Group();
  const pts = [
    new THREE.Vector3(0, 0, 11),
    new THREE.Vector3(1.2, 0, 15),
    new THREE.Vector3(0.4, 0, 20),
    new THREE.Vector3(-3, 0, 24),
    new THREE.Vector3(-9, 0, 26.5),
    new THREE.Vector3(-16, 0, 27.5),
    new THREE.Vector3(-22, 0, 25.5),
    new THREE.Vector3(-27, 0, 21.5),
  ];
  for (const p of pts) p.y = islandHeight(p.x, p.z);
  const path = makeRibbon(pts, 2.05, new THREE.MeshStandardMaterial({
    color: 0xe7d5b8, roughness: 1, polygonOffset: true, polygonOffsetFactor: -1,
  }), 0.08);
  group.add(path);

  const branch = [
    new THREE.Vector3(0.4, 0, 20.5),
    new THREE.Vector3(4.2, 0, 20),
    new THREE.Vector3(7.6, 0, 19.2),
    new THREE.Vector3(9.2, 0, 19.0),
  ];
  for (const p of branch) p.y = islandHeight(p.x, p.z);
  group.add(makeRibbon(branch, 1.35, new THREE.MeshStandardMaterial({
    color: 0xe7d5b8, roughness: 1, polygonOffset: true, polygonOffsetFactor: -1,
  }), 0.09));

  for (let i = 0; i < 48; i++) {
    const t = i / 48;
    const p = new THREE.CatmullRomCurve3(pts).getPoint(t);
    const side = i % 2 ? 1 : -1;
    const off = 1.15;
    const x = p.x + side * off * 0.7;
    const z = p.z + side * off * 0.2;
    const stone = new THREE.Mesh(new THREE.SphereGeometry(rand(0.08, 0.14), 5, 4), new THREE.MeshStandardMaterial({
      color: 0xd8c5a9, roughness: 1,
    }));
    stone.scale.y = 0.55;
    stone.position.set(x, islandHeight(x, z) + 0.1, z);
    group.add(stone);
  }
  return group;
}

export function createPondAndWaterfall(materials) {
  const group = new THREE.Group();
  const pondX = 20;
  const pondZ = 14;
  const waterY = 1.22;
  const pondGeo = new THREE.CircleGeometry(5.2, 40);
  const pond = new THREE.Mesh(pondGeo, new THREE.MeshPhysicalMaterial({
    color: 0x91bccb, roughness: 0.12, metalness: 0.15,
    transparent: true, opacity: 0.84, clearcoat: 1, clearcoatRoughness: 0.1,
  }));
  pond.rotation.x = -Math.PI / 2;
  pond.scale.set(1.25, 1, 0.82);
  pond.position.set(pondX, waterY, pondZ);
  pond.receiveShadow = true;
  group.add(pond);

  const bankMat = new THREE.MeshStandardMaterial({ color: 0xc5b397, roughness: 1, flatShading: true });
  for (let i = 0; i < 24; i++) {
    const a = (i / 24) * Math.PI * 2;
    const x = pondX + Math.cos(a) * 6.1;
    const z = pondZ + Math.sin(a) * 4.1;
    const stone = new THREE.Mesh(new THREE.DodecahedronGeometry(rand(0.24, 0.48), 0), bankMat);
    stone.position.set(x, islandHeight(x, z) + 0.1, z);
    stone.rotation.set(rand(0, 3), rand(0, 3), rand(0, 3));
    group.add(stone);
  }

  const lilyMat = new THREE.MeshStandardMaterial({ color: 0x87a67b, roughness: 0.8, side: THREE.DoubleSide });
  for (let i = 0; i < 8; i++) {
    const a = rand(0, Math.PI * 2);
    const rr = rand(1.0, 4.0);
    const lily = new THREE.Mesh(new THREE.CircleGeometry(rand(0.25, 0.5), 8), lilyMat);
    lily.rotation.x = -Math.PI / 2;
    lily.position.set(pondX + Math.cos(a) * rr, waterY + 0.02, pondZ + Math.sin(a) * rr * 0.65);
    group.add(lily);
    if (i % 3 === 0) {
      const flower = sphere(0.09, materials.rosePale, lily.position.x, waterY + 0.1, lily.position.z, 6);
      flower.castShadow = false;
      group.add(flower);
    }
  }

  const streamPts = [
    new THREE.Vector3(20, waterY, 18.4),
    new THREE.Vector3(20.3, 0, 20.5),
    new THREE.Vector3(21.5, 0, 22.3),
    new THREE.Vector3(23.2, 0, 23.5),
    new THREE.Vector3(24.2, 0, 25.2),
    new THREE.Vector3(23.2, 0, 27.4),
    new THREE.Vector3(21.8, 0, 29.6),
    new THREE.Vector3(20.7, 0, 31.8),
    new THREE.Vector3(20.5, 0, 33.1),
  ];
  for (let i = 1; i < streamPts.length; i++) {
    streamPts[i].y = Math.max(waterY - (i * 0.20), islandHeight(streamPts[i].x, streamPts[i].z) + 0.18);
  }
  const streamMat = new THREE.MeshStandardMaterial({
    color: 0x9ac3ce, roughness: 0.15, metalness: 0.1, transparent: true, opacity: 0.85,
  });
  const stream = makeRibbon(streamPts, 1.15, streamMat, 0.1);
  group.add(stream);

  const fallTex = makeCanvasTexture(256, (ctx, size) => {
    ctx.clearRect(0, 0, size, size);
    ctx.fillStyle = 'rgba(214,242,246,0.26)';
    ctx.fillRect(0, 0, size, size);
    for (let i = 0; i < 260; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const w = 0.9 + Math.random() * 3.4;
      const h = 24 + Math.random() * 160;
      ctx.strokeStyle = `rgba(245,255,255,${0.18 + Math.random() * 0.52})`;
      ctx.lineWidth = w;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + Math.sin(y * 0.03) * 3, y + h);
      ctx.stroke();
    }
    for (let i = 0; i < 85; i++) {
      ctx.fillStyle = `rgba(255,255,255,${0.2 + Math.random() * 0.4})`;
      ctx.beginPath();
      ctx.arc(Math.random() * size, Math.random() * size, 0.6 + Math.random() * 2.2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalCompositeOperation = 'destination-in';
    ctx.filter = 'blur(7px)';
    const leftAt = (y) => size * 0.09 + Math.sin(y * 0.019) * 13 + Math.sin(y * 0.055) * 7;
    const rightAt = (y) => size * 0.91 - Math.sin(y * 0.016 + 1.3) * 14 - Math.sin(y * 0.048 + 0.4) * 7;
    ctx.beginPath();
    ctx.moveTo(leftAt(0), 0);
    for (let y = 8; y <= size; y += 8) ctx.lineTo(leftAt(y), y);
    for (let y = size; y >= 0; y -= 8) ctx.lineTo(rightAt(y), y);
    ctx.closePath();
    const gy = ctx.createLinearGradient(0, 0, 0, size);
    gy.addColorStop(0, 'rgba(255,255,255,0.95)');
    gy.addColorStop(0.16, 'rgba(255,255,255,1)');
    gy.addColorStop(0.78, 'rgba(255,255,255,0.85)');
    gy.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gy;
    ctx.fill();
    ctx.filter = 'none';
    ctx.globalCompositeOperation = 'source-over';
  }, 1, 1);
  const fallMat = new THREE.MeshBasicMaterial({
    color: 0xe2f8fb, map: fallTex, transparent: true, opacity: 0.82,
    side: THREE.DoubleSide, depthWrite: false, toneMapped: false,
  });
  const fall = new THREE.Mesh(new THREE.PlaneGeometry(4.1, 24, 1, 16), fallMat);
  fall.position.set(20.7, -11.0, 33.45);
  fall.rotation.y = Math.PI / 2 - 1.0;
  fall.rotation.z = 0.02;
  group.add(fall);
  const fall2 = fall.clone();
  fall2.material = fallMat.clone();
  fall2.material.opacity = 0.26;
  fall2.scale.set(1.55, 1.03, 1);
  fall2.position.set(20.4, -11.7, 32.95);
  fall2.rotation.y = Math.PI / 2 - 1.0;
  group.add(fall2);

  const foamMat = new THREE.MeshBasicMaterial({ color: 0xfbffff, transparent: true, opacity: 0.42, depthWrite: false });
  for (let i = 0; i < 9; i++) {
    const foam = sphere(rand(0.14, 0.30), foamMat, 20.5 + rand(-1.8, 1.8), 1.18 + rand(-0.08, 0.14), 33.2 + rand(-0.2, 0.2), 6);
    foam.castShadow = false;
    foam.scale.y = 0.5;
    group.add(foam);
  }
  animators.push((t) => {
    fallTex.offset.y = -t * 0.62;
    streamMat.color.setHSL(0.53, 0.22, 0.68 + Math.sin(t * 1.2) * 0.02);
  });

  const mistMat = new THREE.MeshBasicMaterial({
    color: 0xfff4eb, transparent: true, opacity: 0.25, depthWrite: false,
  });
  for (let i = 0; i < 5; i++) {
    const mist = new THREE.Mesh(new THREE.SphereGeometry(rand(2, 4.2), 8, 6), mistMat);
    mist.position.set(20.6 + rand(-2.2, 2.2), -21 + rand(-2, 2), 33.2 + rand(-2.2, 2.2));
    mist.scale.y = 0.5;
    group.add(mist);
    animators.push((t) => {
      mist.position.y += Math.sin(t * 0.2 + i) * 0.002;
      mist.scale.x = 1 + Math.sin(t * 0.15 + i) * 0.08;
    });
  }

  return group;
}

export function createBridge(materials) {
  const g = new THREE.Group();
  const x = 22.0;
  const z = 23.4;
  const y = Math.min(
    islandHeight(x - 1.2, z),
    islandHeight(x + 1.2, z),
  ) + 0.22;
  g.position.set(x, y, z);
  const woodMat = materials.wood;
  const arch = new THREE.Mesh(
    new THREE.TorusGeometry(2.0, 0.18, 6, 16, Math.PI),
    woodMat,
  );
  arch.rotation.z = Math.PI / 2;
  arch.rotation.y = Math.PI / 2;
  arch.position.y = 0.1;
  g.add(arch);
  const deck = box(1.5, 0.18, 4.4, woodMat, 0, 1.25, 0);
  g.add(deck);
  for (let i = -2; i <= 2; i++) {
    const railL = box(0.12, 0.6, 0.12, materials.woodDark, -0.7, 1.62, i * 0.95);
    const railR = railL.clone();
    railR.position.x = 0.7;
    g.add(railL, railR);
  }
  const topL = box(0.08, 0.08, 4.4, materials.woodDark, -0.7, 1.9, 0);
  const topR = topL.clone();
  topR.position.x = 0.7;
  g.add(topL, topR);
  return g;
}

export function createGarden(materials) {
  const group = new THREE.Group();
  const gx = 12.2;
  const gz = 18.8;
  const gy = islandHeight(gx, gz);

  const hedgeMat = new THREE.MeshStandardMaterial({ color: 0x809b79, roughness: 1, flatShading: true });
  const gravelMat = new THREE.MeshStandardMaterial({ color: 0xead9bd, roughness: 1 });

  const center = new THREE.Mesh(new THREE.CircleGeometry(4.8, 32), gravelMat);
  center.rotation.x = -Math.PI / 2;
  center.position.set(gx, gy + 0.12, gz);
  group.add(center);

  const ring = new THREE.Mesh(new THREE.TorusGeometry(4.9, 0.26, 6, 32), hedgeMat);
  ring.rotation.x = -Math.PI / 2;
  ring.position.set(gx, gy + 0.34, gz);
  group.add(ring);

  const middleRing = new THREE.Mesh(new THREE.TorusGeometry(3.1, 0.20, 6, 32), hedgeMat);
  middleRing.rotation.x = -Math.PI / 2;
  middleRing.position.set(gx, gy + 0.3, gz);
  group.add(middleRing);

  const roseBushGeo = new THREE.IcosahedronGeometry(0.42, 1);
  for (let i = 0; i < 14; i++) {
    const a = (i / 14) * Math.PI * 2;
    const rr = i % 2 ? 3.7 : 4.45;
    const x = gx + Math.cos(a) * rr;
    const z = gz + Math.sin(a) * rr;
    const bush = new THREE.Mesh(roseBushGeo, hedgeMat);
    bush.scale.set(1.2, 0.85, 1.2);
    bush.position.set(x, gy + 0.45, z);
    group.add(bush);
    const flower = sphere(0.12, i % 3 ? materials.rose : materials.rosePale, x + rand(-0.2, 0.2), gy + 0.9, z + rand(-0.2, 0.2), 6);
    flower.castShadow = false;
    group.add(flower);
  }

  const archMat = materials.woodPale;
  const arch = new THREE.Group();
  arch.position.set(gx - 5.3, gy, gz + 1.2);
  const left = box(0.18, 3.4, 0.18, archMat, 0, 1.7, 0);
  const right = left.clone();
  right.position.x = 2.3;
  const top = new THREE.Mesh(new THREE.TorusGeometry(1.15, 0.13, 6, 14, Math.PI), archMat);
  top.position.set(1.15, 3.35, 0);
  arch.add(left, right, top);
  for (let i = 0; i < 16; i++) {
    const s = sphere(0.10, materials.rosePale, rand(-0.1, 2.4), rand(0.5, 3.7), rand(-0.2, 0.2), 5);
    s.castShadow = false;
    arch.add(s);
  }
  group.add(arch);

  const bench = new THREE.Group();
  bench.position.set(gx + 1.2, gy + 0.05, gz + 5.1);
  bench.rotation.y = Math.PI;
  bench.add(box(2.0, 0.14, 0.55, materials.wood, 0, 0.6, 0));
  bench.add(box(2.0, 0.55, 0.12, materials.wood, 0, 1.0, -0.3));
  bench.add(box(0.12, 0.6, 0.5, materials.woodDark, -0.85, 0.3, 0));
  bench.add(box(0.12, 0.6, 0.5, materials.woodDark, 0.85, 0.3, 0));
  group.add(bench);

  const pedestal = cylinder(0.9, 1.1, 1.2, materials.stoneLight, gx, gy + 0.72, gz, 8);
  group.add(pedestal);
  const pedestalTop = cylinder(1.05, 0.92, 0.22, materials.stone, gx, gy + 1.4, gz, 8);
  group.add(pedestalTop);

  return group;
}

export function createWindmill(materials) {
  const g = new THREE.Group();
  const x = -27.5;
  const z = 19.0;
  const y = islandHeight(x, z);
  g.position.set(x, y, z);
  g.rotation.y = 0.7;

  const base = cylinder(1.6, 2.2, 4.4, materials.stone, 0, 2.2, 0, 12);
  g.add(base);
  const band = cylinder(1.64, 1.7, 0.22, materials.woodDark, 0, 3.2, 0, 12);
  g.add(band);
  const roof = cone(2.15, 2.6, materials.roof, 0, 5.7, 0, 12);
  g.add(roof);
  const cap = cone(0.3, 0.5, materials.gold, 0, 7.1, 0, 8);
  g.add(cap);

  const door = box(0.9, 1.6, 0.2, materials.woodDark, 0, 0.8, 1.95);
  g.add(door);
  addWindowTo(g, materials, 0, 3.1, 1.58, 0.6, 0.8, 0);
  addWindowTo(g, materials, 1.35, 2.4, 0.62, 0.5, 0.7, 0.9);

  const blades = new THREE.Group();
  blades.position.set(0, 5.2, 2.25);
  for (let i = 0; i < 4; i++) {
    const arm = new THREE.Group();
    arm.rotation.z = (i / 4) * Math.PI * 2;
    const spar = box(0.12, 3.9, 0.12, materials.woodDark, 0, 2.0, 0);
    const sail = box(0.75, 3.0, 0.06, materials.clothCream, 0.45, 2.18, 0.09);
    sail.castShadow = true;
    arm.add(spar, sail);
    blades.add(arm);
  }
  g.add(blades);
  animators.push((t) => {
    blades.rotation.z = t * 0.22;
  });
  return g;
}

function addWindowTo(parent, materials, x, y, z, w, h, ry) {
  const win = new THREE.Group();
  win.position.set(x, y, z);
  win.rotation.y = ry;
  const frame = box(w + 0.16, h + 0.16, 0.12, materials.stoneLight, 0, 0, 0);
  const glass = box(w, h, 0.06, new THREE.MeshStandardMaterial({
    color: 0xffdda8, emissive: 0xcf8a4e, emissiveIntensity: 0.45, roughness: 0.4,
  }), 0, 0, 0.07);
  win.add(frame, glass);
  parent.add(win);
}

function createCottage(materials, x, z, rotation, scale = 1) {
  const g = new THREE.Group();
  g.position.set(x, islandHeight(x, z), z);
  g.rotation.y = rotation;
  g.scale.setScalar(scale);
  const thatch = new THREE.MeshStandardMaterial({ color: 0xc8a471, roughness: 1, flatShading: true });
  const plaster = new THREE.MeshStandardMaterial({ color: 0xf0e1c7, roughness: 0.98 });
  const body = cylinder(1.6, 1.9, 2.3, plaster, 0, 1.15, 0, 12);
  g.add(body);
  const ring = cylinder(1.94, 1.96, 1.0, materials.stoneDark, 0, 0.5, 0, 12);
  g.add(ring);
  const roof = cone(2.25, 2.35, thatch, 0, 3.25, 0, 12);
  g.add(roof);
  const roofBrim = cylinder(2.15, 2.28, 0.180, thatch, 0, 2.2, 0, 12);
  g.add(roofBrim);
  const door = box(0.8, 1.4, 0.18, materials.woodDark, 0, 0.82, 1.82);
  g.add(door);
  const doorArch = new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.06, 4, 10, Math.PI), materials.woodDark);
  doorArch.position.set(0, 1.52, 1.85);
  g.add(doorArch);
  const windowMat = new THREE.MeshStandardMaterial({
    color: 0xffd9a3, emissive: 0xd9904e, emissiveIntensity: 0.75, roughness: 0.4,
  });
  const win = box(0.55, 0.48, 0.07, windowMat, 0, 1.45, 1.72);
  g.add(win);
  const crossV = box(0.05, 0.48, 0.04, materials.woodDark, 0, 1.45, 1.77);
  const crossH = box(0.55, 0.05, 0.04, materials.woodDark, 0, 1.45, 1.77);
  g.add(crossV, crossH);
  const boxFlowers = new THREE.Group();
  boxFlowers.position.set(0, 1.2, 1.88);
  boxFlowers.add(box(0.65, 0.16, 0.2, materials.wood, 0, 0, 0));
  for (let i = 0; i < 4; i++) {
    boxFlowers.add(sphere(0.055, i % 2 ? materials.rose : materials.rosePale, -0.22 + i * 0.15, 0.14, 0.03, 4));
  }
  g.add(boxFlowers);

  const chimney = box(0.42, 1.6, 0.42, materials.stoneDark, 0.85, 3.2, -0.4);
  g.add(chimney);
  const chimneyTop = box(0.56, 0.18, 0.56, materials.stone, 0.85, 4.0, -0.4);
  g.add(chimneyTop);

  const smoke = [];
  const smokeMat = new THREE.MeshStandardMaterial({
    color: 0xeee6dc, roughness: 1, transparent: true, opacity: 0.22, depthWrite: false,
  });
  for (let i = 0; i < 4; i++) {
    const puff = sphere(0.22 + i * 0.04, smokeMat, 0.85, 4.15, -0.4, 7);
    puff.userData.phase = i / 4;
    g.add(puff);
    smoke.push(puff);
  }
  animators.push((t) => {
    for (const puff of smoke) {
      const p = (t * 0.12 + puff.userData.phase) % 1;
      puff.position.y = 4.1 + p * 2.2;
      puff.position.x = 0.85 + Math.sin(t * 0.5 + puff.userData.phase * 8) * 0.25 + p * 0.35;
      puff.position.z = -0.4 + p * 0.3;
      const s = 0.7 + p * 1.6;
      puff.scale.set(s, s, s);
      puff.material.opacity = 0.18 * (1 - p);
    }
  });

  const fence = new THREE.Group();
  for (let i = 0; i < 8; i++) {
    const a = 0.15 + i * 0.23;
    const fx = Math.cos(a) * 2.7;
    const fz = Math.sin(a) * 2.7 + 0.3;
    fence.add(box(0.08, 0.7, 0.08, materials.woodPale, fx, 0.35, fz));
  }
  g.add(fence);

  return g;
}

export function createVillage(materials) {
  const group = new THREE.Group();
  const specs = [
    [-32.5, 21.5, 1.1, 0.95],
    [32.6, 24.0, -2.2, 1.0],
    [-31.0, 0.5, 0.5, 0.8],
  ];
  for (const [x, z, ry, s] of specs) group.add(createCottage(materials, x, z, ry, s));

  const hutch = new THREE.Group();
  hutch.position.set(-28.4, islandHeight(-28.4, 23.8), 23.8);
  hutch.rotation.y = 0.4;
  hutch.add(box(1.2, 0.7, 0.8, materials.woodPale, 0, 0.35, 0));
  hutch.add(box(1.3, 0.12, 0.9, materials.woodDark, 0, 1.1, 0));
  hutch.add(box(0.08, 0.8, 0.08, materials.woodDark, -0.5, 0.6, -0.3));
  hutch.add(box(0.08, 0.8, 0.08, materials.woodDark, 0.5, 0.6, -0.3));
  group.add(hutch);

  return group;
}

export function createWheatField(materials) {
  const group = new THREE.Group();
  const cx = 31.5;
  const cz = 33.0;
  const geo = new THREE.ConeGeometry(0.045, 0.7, 3);
  geo.translate(0, 0.35, 0);
  const mat = new THREE.MeshStandardMaterial({ color: 0xd7be7c, roughness: 1 });
  const count = 420;
  const inst = new THREE.InstancedMesh(geo, mat, count);
  const dummy = new THREE.Object3D();
  const color = new THREE.Color();
  let n = 0;
  for (let i = 0; i < count; i++) {
    const x = cx + rand(-4.0, 4.0);
    const z = cz + rand(-3.2, 3.2);
    if (Math.hypot(x, z) > 38) continue;
    dummy.position.set(x, islandHeight(x, z), z);
    dummy.rotation.set(rand(-0.08, 0.08), rand(0, 3), rand(-0.08, 0.08));
    const s = rand(0.75, 1.25);
    dummy.scale.set(s, s, s);
    dummy.updateMatrix();
    inst.setMatrixAt(n, dummy.matrix);
    color.setHSL(0.12, 0.35, rand(0.53, 0.67));
    inst.setColorAt(n, color);
    n++;
  }
  inst.count = n;
  if (inst.instanceColor) inst.instanceColor.needsUpdate = true;
  group.add(inst);

  const scarecrow = new THREE.Group();
  scarecrow.position.set(cx, islandHeight(cx, cz), cz);
  scarecrow.add(cylinder(0.06, 0.08, 2.1, materials.woodDark, 0, 1.05, 0, 6));
  scarecrow.add(box(1.5, 0.09, 0.09, materials.woodDark, 0, 1.6, 0));
  const shirt = cone(0.32, 0.9, materials.clothCream, 0, 1.45, 0, 8);
  scarecrow.add(shirt);
  const head = sphere(0.24, materials.woodPale, 0, 2.15, 0, 8);
  scarecrow.add(head);
  const hat = cone(0.4, 0.4, materials.woodPale, 0, 2.45, 0, 10);
  scarecrow.add(hat);
  group.add(scarecrow);

  return group;
}

export function createRuins(materials) {
  const g = new THREE.Group();
  const cx = -25.5;
  const cz = -11.5;
  g.position.set(cx, islandHeight(cx, cz), cz);
  g.rotation.y = 0.5;
  const pillarPositions = [[-2.2, 0, -0.8, 3.2], [2.2, 0, -0.8, 4.2], [0, 0, 1.8, 2.4]];
  for (const [x, , z, h] of pillarPositions) {
    g.add(box(1.0, 0.45, 1.0, materials.stoneDark, x, 0.22, z));
    g.add(cylinder(0.42, 0.48, h, materials.stone, x, h / 2 + 0.4, z, 8));
    g.add(box(1.0, 0.3, 1.0, materials.stoneLight, x, h + 0.55, z));
  }
  const ruinArch = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.4, 6, 16, Math.PI), materials.stone);
  ruinArch.position.set(0, 4.4, -0.8);
  ruinArch.scale.set(1, 0.75, 1);
  g.add(ruinArch);
  const fallen = box(0.65, 0.65, 3.4, materials.stone, 3.8, 0.35, 1.4);
  fallen.rotation.y = 0.7;
  g.add(fallen);
  const ivy = new THREE.Group();
  for (let i = 0; i < 20; i++) {
    const leaf = sphere(rand(0.12, 0.24), i % 2 ? materials.leaf : materials.leafDark, rand(-2.5, 2.5), rand(0.3, 4.5), rand(-1.4, 1.4), 5);
    leaf.scale.set(0.6, 1.1, 0.4);
    ivy.add(leaf);
  }
  g.add(ivy);
  return g;
}

export function createHangingVines(materials) {
  const group = new THREE.Group();
  const vineMat = new THREE.MeshStandardMaterial({ color: 0x708b67, roughness: 1, flatShading: true });
  const mossGeo = new THREE.IcosahedronGeometry(1, 1);
  const mossMat = new THREE.MeshStandardMaterial({ color: 0x839a6a, roughness: 1, flatShading: true });
  const moss = new THREE.InstancedMesh(mossGeo, mossMat, 120);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < 120; i++) {
    const a = (i / 120) * Math.PI * 2;
    const R = edgeRadius(a);
    const y = islandHeight(Math.cos(a) * R * 0.99, Math.sin(a) * R * 0.99);
    dummy.position.set(Math.cos(a) * R * 1.002, y + 0.03, Math.sin(a) * R * 1.002);
    dummy.scale.set(rand(0.7, 1.7), rand(0.2, 0.5), rand(0.7, 1.4));
    dummy.rotation.set(rand(-0.2, 0.2), rand(0, 3), rand(-0.2, 0.2));
    dummy.updateMatrix();
    moss.setMatrixAt(i, dummy.matrix);
  }
  group.add(moss);
  for (let i = 0; i < 26; i++) {
    const a = (i / 26) * Math.PI * 2 + seedNoise(i, 7) * 0.18;
    const R = edgeRadius(a);
    const topY = islandHeight(Math.cos(a) * R * 0.985, Math.sin(a) * R * 0.985) + 0.1;
    const len = rand(2.5, 7.5);
    const vine = new THREE.Group();
    vine.position.set(Math.cos(a) * R * 1.005, topY, Math.sin(a) * R * 1.005);
    vine.rotation.y = Math.PI / 2 - a;
    const stem = cylinder(0.035, 0.05, len, vineMat, 0, -len / 2, 0, 4);
    stem.rotation.z = rand(-0.15, 0.15);
    stem.castShadow = false;
    vine.add(stem);
    for (let j = 0; j < Math.floor(len * 1.4); j++) {
      const leaf = sphere(rand(0.12, 0.22), j % 2 ? materials.leaf : vineMat, rand(-0.3, 0.3), -0.4 - j * 0.5, rand(-0.12, 0.12), 5);
      leaf.scale.set(1.4, 0.28, 0.55);
      leaf.rotation.y = rand(0, 3);
      leaf.castShadow = false;
      vine.add(leaf);
    }
    group.add(vine);
  }
  return group;
}

export function createFence(materials) {
  const group = new THREE.Group();
  const pts = [
    [3.5, 10.8], [3.0, 15.2], [2.2, 18.8], [3.8, 22.8],
  ];
  for (let i = 0; i < pts.length - 1; i++) {
    const [x1, z1] = pts[i];
    const [x2, z2] = pts[i + 1];
    const steps = 5;
    for (let s = 0; s < steps; s++) {
      const t = s / steps;
      const x = x1 + (x2 - x1) * t;
      const z = z1 + (z2 - z1) * t;
      const post = box(0.12, 0.9, 0.12, materials.woodPale, x, islandHeight(x, z) + 0.45, z);
      group.add(post);
    }
  }
  return group;
}

export function createSparkles(materials) {
  const count = 160;
  const positions = new Float32Array(count * 3);
  const phases = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    const th = rand(0, Math.PI * 2);
    const rr = rand(8, 34);
    positions[i * 3] = Math.cos(th) * rr;
    positions[i * 3 + 1] = rand(1, 14);
    positions[i * 3 + 2] = Math.sin(th) * rr;
    phases[i] = rand(0, Math.PI * 2);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({
    color: 0xffe4b0, size: 0.28, transparent: true, opacity: 0.8,
    blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true,
  });
  const points = new THREE.Points(geo, mat);
  animators.push((t) => {
    const pos = geo.attributes.position.array;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += Math.sin(t * 0.6 + phases[i]) * 0.0012;
    }
    geo.attributes.position.needsUpdate = true;
    points.rotation.y = t * 0.015;
    mat.opacity = 0.55 + Math.sin(t * 1.3) * 0.2;
  });
  return points;
}

export function createBirds() {
  const group = new THREE.Group();
  const birdMat = new THREE.MeshStandardMaterial({ color: 0xf5ede0, roughness: 1, side: THREE.DoubleSide });
  const birds = [];
  for (let i = 0; i < 9; i++) {
    const b = new THREE.Group();
    const body = sphere(0.16, birdMat, 0, 0, 0, 6);
    body.scale.set(1.0, 0.75, 2.2);
    const wingGeo = new THREE.BufferGeometry();
    wingGeo.setAttribute('position', new THREE.Float32BufferAttribute([
      0, 0, 0, 1.0, 0.1, -0.2, 0.15, 0, 0.55,
    ], 3));
    wingGeo.computeVertexNormals();
    const wingL = new THREE.Mesh(wingGeo, birdMat);
    const wingR = new THREE.Mesh(wingGeo, birdMat);
    wingR.scale.x = -1;
    b.add(body, wingL, wingR);
    b.userData = {
      wingL, wingR,
      radius: rand(26, 46),
      height: rand(18, 32),
      speed: rand(0.10, 0.18),
      phase: rand(0, Math.PI * 2),
      flap: rand(2.5, 4.5),
    };
    group.add(b);
    birds.push(b);
  }
  animators.push((t) => {
    for (const b of birds) {
      const d = b.userData;
      const a = d.phase + t * d.speed;
      b.position.set(Math.cos(a) * d.radius, d.height + Math.sin(t * 0.6 + d.phase) * 1.5, Math.sin(a) * d.radius * 0.8);
      b.rotation.y = -a + Math.PI / 2;
      const f = Math.sin(t * d.flap + d.phase) * 0.6;
      d.wingL.rotation.z = f;
      d.wingR.rotation.z = -f;
    }
  });
  return group;
}

export function createBalloon(materials) {
  const g = new THREE.Group();
  const balloon = new THREE.Group();
  const colors = [materials.clothCream, materials.rosePale, materials.clothBlue, materials.goldSoft];
  for (let i = 0; i < 8; i++) {
    const a0 = (i / 8) * Math.PI * 2;
    const a1 = ((i + 1) / 8) * Math.PI * 2;
    const geo = new THREE.SphereGeometry(4.2, 8, 12, a0, a1 - a0, 0, Math.PI * 0.72);
    const m = new THREE.Mesh(geo, colors[i % colors.length]);
    m.castShadow = true;
    balloon.add(m);
  }
  balloon.position.y = 4.0;
  g.add(balloon);
  const basket = box(1.5, 1.1, 1.5, materials.wood, 0, -0.9, 0);
  g.add(basket);
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
    const rope = cylinder(0.025, 0.025, 3.2, materials.woodDark, Math.cos(a) * 0.6, 0.7, Math.sin(a) * 0.6, 4);
    rope.rotation.z = -Math.cos(a) * 0.15;
    rope.rotation.x = Math.sin(a) * 0.15;
    g.add(rope);
  }
  const flame = new THREE.Mesh(new THREE.SphereGeometry(0.20, 6, 5), materials.flame);
  flame.position.y = -0.1;
  g.add(flame);
  g.position.set(-38, 24, -27);
  g.scale.setScalar(0.9);
  animators.push((t) => {
    g.position.y = 24 + Math.sin(t * 0.28) * 1.1;
    g.rotation.y = t * 0.03;
  });
  return g;
}

export function placeBirdsByIsland() {
  return createBirds();
}
