import * as THREE from 'three';
import {
  PAL,
  mat,
  box,
  cyl,
  cone,
  sph,
  ico,
  glowSprite,
  canvasTexture,
} from './utils.js';
import { vnoise } from './utils.js';

/* ------------------------------------------------------------------ *
 *  天空穹顶（渐变 + 太阳辉光）
 * ------------------------------------------------------------------ */
function makeSky() {
  const uniforms = {
    topColor: { value: new THREE.Color(0x7ba6cd) },
    midColor: { value: new THREE.Color(0xd2e1e6) },
    lowColor: { value: new THREE.Color(0xf6cfa4) },
    sunColor: { value: new THREE.Color(0xffdfae) },
    sunDir: { value: new THREE.Vector3(-0.5, 0.68, 0.46).normalize() },
    sunAmount: { value: 1.0 },
    nightAmount: { value: 0.0 },
  };
  const skyMat = new THREE.ShaderMaterial({
    uniforms,
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    vertexShader: `
      varying vec3 vDir;
      void main() {
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vDir = normalize(wp.xyz - cameraPosition);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 topColor;
      uniform vec3 midColor;
      uniform vec3 lowColor;
      uniform vec3 sunColor;
      uniform vec3 sunDir;
      uniform float sunAmount;
      uniform float nightAmount;
      varying vec3 vDir;
      void main() {
        vec3 d = normalize(vDir);
        float h = clamp(d.y * 0.5 + 0.5, 0.0, 1.0);
        vec3 col = mix(lowColor, midColor, smoothstep(0.30, 0.58, h));
        col = mix(col, topColor, smoothstep(0.5, 0.95, h));
        float s = max(dot(d, normalize(sunDir)), 0.0);
        col += sunColor * pow(s, 26.0) * 0.55 * sunAmount;
        col += sunColor * pow(s, 5.0) * 0.12 * sunAmount;
        // 夜里的地平线微光
        col += vec3(0.10, 0.08, 0.14) * pow(1.0 - abs(d.y), 6.0) * nightAmount;
        gl_FragColor = vec4(col, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
  });
  const sky = new THREE.Mesh(new THREE.SphereGeometry(420, 40, 24), skyMat);
  sky.frustumCulled = false;
  return { sky, uniforms };
}

/* ------------------------------------------------------------------ *
 *  星空
 * ------------------------------------------------------------------ */
function makeStars() {
  const N = 2100;
  const pos = new Float32Array(N * 3);
  const col = new Float32Array(N * 3);
  const size = new Float32Array(N);
  const c = new THREE.Color();
  for (let i = 0; i < N; i++) {
    const a = Math.random() * Math.PI * 2;
    const y = Math.pow(Math.random(), 0.7);
    const r = Math.sqrt(1 - y * y);
    const R = 380;
    pos[i * 3] = Math.cos(a) * r * R;
    pos[i * 3 + 1] = y * R * 0.9 - 20;
    pos[i * 3 + 2] = Math.sin(a) * r * R;
    c.setHSL(0.1 + Math.random() * 0.08, 0.35, 0.82 + Math.random() * 0.15);
    col[i * 3] = c.r;
    col[i * 3 + 1] = c.g;
    col[i * 3 + 2] = c.b;
    size[i] = 1.2 + Math.random() * 2.4;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  const m = new THREE.PointsMaterial({
    size: 2.7,
    vertexColors: true,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
    fog: false,
  });
  const stars = new THREE.Points(geo, m);
  stars.frustumCulled = false;
  return stars;
}

/* ------------------------------------------------------------------ *
 *  月亮
 * ------------------------------------------------------------------ */
function makeMoon() {
  const g = new THREE.Group();
  const disc = new THREE.Mesh(
    new THREE.SphereGeometry(9, 24, 16),
    new THREE.MeshBasicMaterial({ color: 0xfff4da, fog: false })
  );
  g.add(disc);
  const halo = glowSprite(48, 0xfff0c8, 0.28);
  halo.material.fog = false;
  g.add(halo);
  // 环形山
  for (let i = 0; i < 5; i++) {
    const crater = new THREE.Mesh(
      new THREE.CircleGeometry(1.2 + Math.random() * 1.6, 12),
      new THREE.MeshBasicMaterial({ color: 0xf0e2c4 })
    );
    const a = Math.random() * Math.PI * 2;
    const b = (Math.random() - 0.5) * 1.2;
    crater.position.set(Math.cos(a) * 8.6, b * 6, Math.sin(a) * 8.6);
    crater.lookAt(0, 0, 0);
    g.add(crater);
  }
  g.position.set(-150, 45, -175);
  return g;
}

/* ------------------------------------------------------------------ *
 *  云海
 * ------------------------------------------------------------------ */
function makeCloud(scale = 1, color = 0xfff4e8) {
  const g = new THREE.Group();
  const n = 4 + Math.floor(Math.random() * 4);
  for (let i = 0; i < n; i++) {
    const puff = ico((0.7 + Math.random() * 0.8) * scale, color, { detail: 1, castShadow: false });
    puff.position.set((Math.random() - 0.5) * 4.2 * scale, (Math.random() - 0.5) * 0.7 * scale, (Math.random() - 0.5) * 2.4 * scale);
    puff.scale.y = 0.55;
    puff.material = new THREE.MeshToonMaterial({
      color,
      transparent: true,
      opacity: 0.9,
      fog: true,
    });
    puff.castShadow = false;
    g.add(puff);
  }
  g.userData.baseY = 0;
  return g;
}

function makeCloudSea() {
  const g = new THREE.Group();
  const cols = [0xfff2e4, 0xf6e0e4, 0xe9e4f2, 0xfff6ea];
  for (let i = 0; i < 20; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = 24 + Math.random() * 60;
    const c = makeCloud(2.4 + Math.random() * 3.2, cols[Math.floor(Math.random() * cols.length)]);
    c.position.set(Math.cos(a) * r, -14 - Math.random() * 14, Math.sin(a) * r);
    c.userData.baseY = c.position.y;
    c.userData.drift = 0.3 + Math.random() * 0.5;
    c.userData.phase = Math.random() * 6;
    g.add(c);
  }
  // 远处高空的小云
  for (let i = 0; i < 8; i++) {
    const c = makeCloud(1.8 + Math.random() * 2.4, 0xfff6ec);
    const a = Math.random() * Math.PI * 2;
    const r = 70 + Math.random() * 60;
    c.position.set(Math.cos(a) * r, 10 + Math.random() * 30, Math.sin(a) * r);
    c.userData.baseY = c.position.y;
    c.userData.drift = 0.15 + Math.random() * 0.2;
    c.userData.phase = Math.random() * 6;
    c.userData.high = true;
    g.add(c);
  }
  return g;
}

/* ------------------------------------------------------------------ *
 *  远处的浮空岛
 * ------------------------------------------------------------------ */
function makeDistantIsland(scale = 1) {
  const g = new THREE.Group();
  const top = cyl(3.2 * scale, 3.4 * scale, 0.7 * scale, PAL.grass, 14);
  top.position.y = 0;
  g.add(top);
  const underside = cone(3.3 * scale, 6.2 * scale, PAL.rock, 12);
  underside.rotation.x = Math.PI;
  underside.position.y = -3.2 * scale;
  g.add(underside);
  const rock2 = cone(2.2 * scale, 3.0 * scale, PAL.rockPink, 10);
  rock2.rotation.x = Math.PI;
  rock2.position.y = -4.4 * scale;
  g.add(rock2);
  for (let i = 0; i < 3; i++) {
    const t = new THREE.Group();
    const trunk = cyl(0.08 * scale, 0.1 * scale, 0.8 * scale, PAL.woodDark, 5);
    trunk.position.y = 0.4 * scale;
    t.add(trunk);
    const crown = ico(0.6 * scale, PAL.leaf, { detail: 0 });
    crown.position.y = 1.0 * scale;
    t.add(crown);
    t.position.set((Math.random() - 0.5) * 3.6 * scale, 0.3 * scale, (Math.random() - 0.5) * 3.6 * scale);
    g.add(t);
  }
  // 小小城堡剪影
  if (scale > 0.8) {
    const keep = box(0.5 * scale, 1.2 * scale, 0.5 * scale, PAL.stoneWarm);
    keep.position.set(0.4 * scale, 1.0 * scale, -0.3 * scale);
    g.add(keep);
    const roof = cone(0.42 * scale, 0.7 * scale, PAL.roof, 4);
    roof.position.set(0.4 * scale, 1.95 * scale, -0.3 * scale);
    g.add(roof);
  }
  g.traverse((o) => {
    if (o.isMesh) {
      o.castShadow = false;
      o.receiveShadow = false;
    }
  });
  g.userData.floatPhase = Math.random() * 6;
  g.userData.baseY = 0;
  return g;
}

/* ------------------------------------------------------------------ *
 *  小鸟
 * ------------------------------------------------------------------ */
function makeBird(color = 0x5f5a6a) {
  const g = new THREE.Group();
  const body = sph(0.16, color, { seg: 8, seg2: 6, castShadow: false });
  body.scale.set(0.7, 0.7, 1.4);
  g.add(body);
  const wingL = new THREE.Mesh(
    new THREE.PlaneGeometry(0.55, 0.2),
    new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide })
  );
  wingL.position.set(-0.32, 0, 0);
  g.add(wingL);
  const wingR = wingL.clone();
  wingR.position.x = 0.32;
  g.add(wingR);
  g.userData.wings = [wingL, wingR];
  const beak = cone(0.04, 0.14, 0xd8a45e, 4);
  beak.rotation.x = Math.PI / 2;
  beak.position.set(0, 0, 0.24);
  g.add(beak);
  return g;
}

/* ------------------------------------------------------------------ *
 *  热气球
 * ------------------------------------------------------------------ */
function makeBalloon() {
  const g = new THREE.Group();
  const envelope = new THREE.Group();
  const colors = [0xf2c6ce, 0xfff2e2, 0xd9c2ea, 0xf7e0a3];
  const sphere = new THREE.SphereGeometry(2.2, 20, 16);
  const base = new THREE.Mesh(sphere, new THREE.MeshToonMaterial({ color: colors[0] }));
  base.scale.set(1, 1.18, 1);
  base.position.y = 3.4;
  envelope.add(base);
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    const stripe = new THREE.Mesh(
      new THREE.CylinderGeometry(0.35, 0.55, 4.4, 6, 1, true, -0.18, 0.36),
      new THREE.MeshToonMaterial({ color: colors[(i + 1) % colors.length], side: THREE.DoubleSide })
    );
    stripe.position.set(Math.cos(a) * 1.85, 3.4, Math.sin(a) * 1.85);
    stripe.rotation.y = -a;
    envelope.add(stripe);
  }
  g.add(envelope);
  const basket = box(0.9, 0.6, 0.9, PAL.wood);
  basket.position.y = 0.65;
  g.add(basket);
  for (const sx of [-0.35, 0.35]) {
    for (const sz of [-0.35, 0.35]) {
      const rope = cyl(0.012, 0.012, 1.6, 0x6f5a46, 4, { castShadow: false });
      rope.position.set(sx, 1.7, sz);
      rope.rotation.z = sx * 0.16;
      rope.rotation.x = -sz * 0.16;
      g.add(rope);
    }
  }
  // 小灯笼
  const lamp = new THREE.Mesh(
    new THREE.BoxGeometry(0.22, 0.28, 0.22),
    new THREE.MeshBasicMaterial({ color: 0xffd79a })
  );
  lamp.position.set(0, 1.3, 0.46);
  g.add(lamp);
  const glow = glowSprite(1.4, 0xffc983, 0.5);
  glow.position.copy(lamp.position);
  g.add(glow);
  g.userData.baseY = 18;
  g.userData.phase = Math.random() * 6;
  return g;
}

/* ------------------------------------------------------------------ *
 *  烟囱的炊烟
 * ------------------------------------------------------------------ */
function makeSmoke(ctx) {
  const g = new THREE.Group();
  const pool = [];
  for (let i = 0; i < 26; i++) {
    const s = glowSprite(0.9, 0xf2ece4, 0.22);
    s.material.blending = THREE.NormalBlending;
    s.material.color = new THREE.Color(0xe8e2d8);
    s.visible = false;
    g.add(s);
    pool.push({ sprite: s, life: 0, max: 0, x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0 });
  }
  g.userData.pool = pool;
  g.userData.spawnAcc = 0;
  return g;
}

export function updateSmoke(smoke, dt, points) {
  const pool = smoke.userData.pool;
  smoke.userData.spawnAcc += dt;
  if (smoke.userData.spawnAcc > 0.28 && points.length) {
    smoke.userData.spawnAcc = 0;
    const p = points[Math.floor(Math.random() * points.length)];
    for (const s of pool) {
      if (!s.sprite.visible) {
        s.sprite.visible = true;
        s.life = 0;
        s.max = 4 + Math.random() * 2.5;
        s.x = p.x + (Math.random() - 0.5) * 0.2;
        s.y = p.y;
        s.z = p.z + (Math.random() - 0.5) * 0.2;
        s.vx = (Math.random() - 0.5) * 0.22;
        s.vy = 0.55 + Math.random() * 0.3;
        s.vz = (Math.random() - 0.5) * 0.22;
        break;
      }
    }
  }
  for (const s of pool) {
    if (!s.sprite.visible) continue;
    s.life += dt;
    const t = s.life / s.max;
    if (t >= 1) {
      s.sprite.visible = false;
      continue;
    }
    s.x += (s.vx + 0.12) * dt;
    s.y += s.vy * dt;
    s.z += s.vz * dt;
    s.sprite.position.set(s.x, s.y, s.z);
    const sc = 0.7 + t * 2.2;
    s.sprite.scale.set(sc, sc, 1);
    s.sprite.material.opacity = 0.28 * (1 - t) * Math.min(1, t * 5);
  }
}

/* ------------------------------------------------------------------ *
 *  光尘
 * ------------------------------------------------------------------ */
function makeMotes() {
  const N = 260;
  const pos = new Float32Array(N * 3);
  const phase = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = 6 + Math.random() * 26;
    pos[i * 3] = Math.cos(a) * r;
    pos[i * 3 + 1] = 2 + Math.random() * 22;
    pos[i * 3 + 2] = Math.sin(a) * r;
    phase[i] = Math.random() * 6;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const m = new THREE.PointsMaterial({
    color: 0xffe6b0,
    size: 0.16,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const points = new THREE.Points(geo, m);
  points.userData.phase = phase;
  points.frustumCulled = false;
  return points;
}

/* ------------------------------------------------------------------ *
 *  组装
 * ------------------------------------------------------------------ */
export function createEnvironment(ctx) {
  const group = new THREE.Group();
  group.name = 'environment';

  const { sky, uniforms } = makeSky();
  group.add(sky);

  const stars = makeStars();
  group.add(stars);

  const moon = makeMoon();
  moon.visible = false;
  group.add(moon);

  const sunGlow = glowSprite(46, 0xffe0a8, 0.5);
  sunGlow.material.fog = false;
  sunGlow.position.set(-150, 130, 95);
  group.add(sunGlow);

  const clouds = makeCloudSea();
  group.add(clouds);

  const distant = new THREE.Group();
  const islandSpecs = [
    [-78, 24, -58, 1.6],
    [70, 34, -78, 1.1],
    [96, 16, 44, 1.3],
    [-96, 10, 50, 0.9],
  ];
  for (const [x, y, z, s] of islandSpecs) {
    const isl = makeDistantIsland(s);
    isl.position.set(x, y, z);
    isl.userData.baseY = y;
    distant.add(isl);
  }
  group.add(distant);

  // 鸟群
  const birds = new THREE.Group();
  const birdData = [];
  for (let i = 0; i < 9; i++) {
    const b = makeBird(i % 3 === 0 ? 0x7f7a8a : 0x5f5a6a);
    const radius = 18 + Math.random() * 22;
    b.userData.orbit = {
      radius,
      speed: 0.09 + Math.random() * 0.12,
      phase: Math.random() * 6,
      height: 12 + Math.random() * 12,
      tilt: (Math.random() - 0.5) * 0.4,
    };
    birds.add(b);
    birdData.push(b);
  }
  group.add(birds);

  // 热气球
  const balloon = makeBalloon();
  balloon.position.set(24, 20, -26);
  group.add(balloon);

  // 炊烟
  const smoke = makeSmoke(ctx);
  group.add(smoke);

  // 光尘
  const motes = makeMotes();
  group.add(motes);

  return {
    group,
    uniforms,
    stars,
    moon,
    sunGlow,
    clouds,
    distant,
    birds,
    balloon,
    smoke,
    motes,
  };
}

/* ------------------------------------------------------------------ *
 *  逐帧更新
 * ------------------------------------------------------------------ */
export function updateEnvironment(env, ctx, t, dt, night) {
  env.stars.material.opacity = THREE.MathUtils.lerp(env.stars.material.opacity, night, 0.04);
  env.moon.visible = night > 0.05;
  env.moon.material && 0;
  env.sunGlow.material.opacity = THREE.MathUtils.lerp(env.sunGlow.material.opacity, 0.5 * (1 - night), 0.04);

  // 云漂移
  env.clouds.children.forEach((c, i) => {
    const d = c.userData;
    c.position.x += d.drift * dt * 0.35;
    if (c.position.x > 110) c.position.x = -110;
    c.position.y = d.baseY + Math.sin(t * 0.12 + d.phase) * 0.9;
  });

  // 远岛浮动
  env.distant.children.forEach((isl) => {
    isl.position.y = isl.userData.baseY + Math.sin(t * 0.22 + isl.userData.floatPhase) * 1.1;
    isl.rotation.y += dt * 0.004;
  });

  // 鸟：绕岛飞行 + 振翅
  for (const b of env.birds.children) {
    const o = b.userData.orbit;
    const a = t * o.speed + o.phase;
    b.position.set(
      Math.cos(a) * o.radius,
      o.height + Math.sin(t * 0.7 + o.phase) * 1.6 + Math.sin(a * 2) * 1.2,
      Math.sin(a) * o.radius
    );
    b.rotation.y = -a + Math.PI / 2;
    b.rotation.z = Math.sin(a) * 0.2 + o.tilt;
    const flap = Math.sin(t * 7 + o.phase) * 0.5;
    b.userData.wings[0].rotation.z = flap;
    b.userData.wings[1].rotation.z = -flap;
  }

  // 热气球
  env.balloon.position.y = 20 + Math.sin(t * 0.35) * 1.4;
  env.balloon.position.x = 24 + Math.cos(t * 0.06) * 6;
  env.balloon.position.z = -26 + Math.sin(t * 0.05) * 5;
  env.balloon.rotation.y = Math.sin(t * 0.1) * 0.15;

  // 炊烟
  updateSmoke(env.smoke, dt, ctx.smokePoints);

  // 光尘
  const pos = env.motes.geometry.attributes.position;
  const ph = env.motes.userData.phase;
  for (let i = 0; i < pos.count; i++) {
    pos.setX(i, pos.getX(i) + Math.sin(t * 0.4 + ph[i]) * 0.004);
    pos.setY(i, pos.getY(i) + Math.sin(t * 0.6 + ph[i] * 2) * 0.004 + 0.0035);
    pos.setZ(i, pos.getZ(i) + Math.cos(t * 0.35 + ph[i]) * 0.004);
    if (pos.getY(i) > 26) pos.setY(i, 2);
  }
  pos.needsUpdate = true;
  env.motes.material.opacity = 0.35 + night * 0.25;
}