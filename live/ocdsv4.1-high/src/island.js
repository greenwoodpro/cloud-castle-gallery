import * as THREE from 'three';
import {
  M, Merge, R, RI, pick, TAU, reg, tick, holder, gBox, gRBox, gCyl, gCone, gSph, gTor, gLathe, gPlane,
  shadowed, label, texSoft, groundY, PAL, clamp, lerp, smoothstep, jitterGeo
} from './core.js';

export const RIM = 33.6;
const BANDS = ['#b08c62', '#c9a878', '#dcc69c', '#c2a690', '#b1947f', '#cbae88', '#ab9478'];

function rimR(a) {
  return RIM + (Math.sin(a * 3.1 + 0.6) * 0.7 + Math.sin(a * 7.3 + 1.7) * 0.42 + Math.sin(a * 13.4 + 2.4) * 0.2);
}

export function rockShell(RINGS, A = 72, opts = {}) {
  const pos = [], col = [], uv = [], idx = [];
  const cA = new THREE.Color(), cB = new THREE.Color(), out = new THREE.Color();
  const tear = opts.tear;
  for (let ri = 0; ri < RINGS.length; ri++) {
    const ring = RINGS[ri];
    for (let ai = 0; ai <= A; ai++) {
      const a = (ai / A) * TAU;
      const nz = Math.sin(a * 3.0 + 0.7) * 0.5 + Math.sin(a * 7.0 + 1.9) * 0.28 + Math.sin(a * 13.0 + 2.4) * 0.15;
      const nz2 = Math.sin(a * 5.3 + 2.1) * 0.4 + Math.sin(a * 11.0 + 0.4) * 0.25;
      let r = ring.r * (1 + nz * (ring.jag ?? 0.05));
      const y = ring.y + (ring.bump ?? 0) * nz2;
      if (tear) {
        let da = Math.abs((((a - tear.ang) % TAU) + TAU * 1.5) % TAU - Math.PI);
        const w = tear.w;
        const fall = clamp(1 - da / w, 0, 1);
        const depth = clamp((0 - ring.y) / tear.depth, 0, 1) * clamp(ring.y / -1.5, 0, 1);
        r *= 1 - tear.amt * fall * depth;
      }
      pos.push(Math.cos(a) * r, y, Math.sin(a) * r);
      uv.push((ai / A) * 7, y * 0.09);
      const bandY = y * 0.14 + nz * 0.35;
      const i0 = Math.floor(bandY);
      const f = bandY - i0;
      cA.set(BANDS[((i0 % BANDS.length) + BANDS.length) % BANDS.length]);
      cB.set(BANDS[(((i0 + 1) % BANDS.length) + BANDS.length) % BANDS.length]);
      out.copy(cA).lerp(cB, smoothstep(0.55, 1.0, f));
      const v = 0.9 + nz * 0.12 + nz2 * 0.06;
      col.push(out.r * v, out.g * v, out.b * v);
    }
  }
  for (let ri = 0; ri < RINGS.length - 1; ri++) {
    for (let ai = 0; ai < A; ai++) {
      const a0 = ri * (A + 1) + ai;
      const a1 = a0 + 1;
      const b0 = (ri + 1) * (A + 1) + ai;
      const b1 = b0 + 1;
      idx.push(a0, a1, b0, a1, b1, b0);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  return geo;
}

function grassCap(A = 84, opts = {}) {
  const rings = [0.0, 0.1, 0.2, 0.32, 0.45, 0.58, 0.7, 0.8, 0.88, 0.94, 0.98, 1.0, 1.045, 1.085];
  const droop = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1.1, -2.3];
  const pos = [], uv = [], idx = [];
  const size = opts.size || RIM;
  for (let ri = 0; ri < rings.length; ri++) {
    for (let ai = 0; ai <= A; ai++) {
      const a = (ai / A) * TAU;
      const rr = rimR(a) * (size / RIM) * rings[ri];
      const x = Math.cos(a) * rr, z = Math.sin(a) * rr;
      const y = groundY(x, z) + 0.06 + droop[ri];
      pos.push(x, y, z);
      uv.push(x / 64 + 0.5, z / 64 + 0.5);
    }
  }
  for (let ri = 0; ri < rings.length - 1; ri++) {
    for (let ai = 0; ai < A; ai++) {
      const a0 = ri * (A + 1) + ai, a1 = a0 + 1, b0 = (ri + 1) * (A + 1) + ai, b1 = b0 + 1;
      if (ri === 0) idx.push(a0, a1, b0);
      else idx.push(a0, a1, b0, a1, b1, b0);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  return geo;
}

const FALL_VS = `
varying vec2 vUv; uniform float uT;
void main(){
  vUv = uv;
  vec3 p = position;
  float k = vUv.y;
  p.x += sin(vUv.y*9.0 + uT*4.5 + position.y*0.3)*0.07*k;
  p.z += cos(vUv.y*7.0 + uT*3.5)*0.05*k;
  p.x *= 1.0 + (1.0-k)*0.06;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p,1.0);
}`;
const FALL_FS = `
uniform vec3 uColor; uniform float uOpacity; uniform float uT;
varying vec2 vUv;
void main(){
  float col1 = 0.5 + 0.5*sin(vUv.x*26.0 + uT*3.0);
  float col2 = 0.5 + 0.5*sin(vUv.x*13.0 - uT*1.7 + 1.7);
  float streak = 0.35 + 0.65*(0.6*col1 + 0.4*col2);
  float fall = 0.5 + 0.5*sin(vUv.y*30.0 - uT*9.0 + sin(vUv.x*9.0)*1.6);
  float edge = smoothstep(0.0,0.3,vUv.x)*smoothstep(1.0,0.7,vUv.x);
  float fade = smoothstep(0.02,0.5,vUv.y);
  float foam = 1.0 - smoothstep(0.0,0.34,vUv.y);
  float a = uOpacity*(0.25 + 0.75*streak*fall)*edge*fade + foam*edge*0.26;
  vec3 c = mix(uColor, vec3(1.0), clamp(foam*0.7 + streak*0.25, 0.0, 1.0));
  gl_FragColor = vec4(c, a*0.92);
}`;

export function makeWaterfall(width, height, scene, opts = {}) {
  const mat = new THREE.ShaderMaterial({
    uniforms: { uT: { value: 0 }, uColor: { value: new THREE.Color(opts.color || '#cfe8f2') }, uOpacity: { value: opts.opacity || 0.9 } },
    vertexShader: FALL_VS,
    fragmentShader: FALL_FS,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide
  });
  const geo = gPlane(width, height, 8, 44);
  const m = new THREE.Mesh(geo, mat);
  if (opts.pos) m.position.set(opts.pos[0], opts.pos[1], opts.pos[2]);
  if (opts.rot) m.rotation.set(opts.rot[0], opts.rot[1], opts.rot[2]);
  m.renderOrder = 2;
  scene.add(m);
  tick((dt, t) => {
    mat.uniforms.uT.value = t;
  });
  return m;
}

function mistPuff(parent, x, y, z, scale, opacity = 0.3) {
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: texSoft('#ffffff'), transparent: true, opacity, depthWrite: false, blending: THREE.AdditiveBlending }));
  s.scale.set(scale, scale * 0.7, 1);
  s.position.set(x, y, z);
  parent.add(s);
  return s;
}

function vine(parent, x, y, z, len, thick = 0.07, key = 'foliage2') {
  const pts = [];
  const n = 5;
  const sway = R(0.4, 1.4);
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    pts.push(new THREE.Vector3(x + sway * t * t, y - len * t, z + sway * 0.4 * t * t));
  }
  const curve = new THREE.CatmullRomCurve3(pts);
  const m = new THREE.Mesh(new THREE.TubeGeometry(curve, 12, thick, 6, false), M[key]);
  m.castShadow = true;
  parent.add(m);
  const leaf = new Merge();
  for (let i = 0; i < 7; i++) {
    const t = R(0.1, 1);
    const p = curve.getPointAt(t);
    leaf.add(key, new THREE.SphereGeometry(R(0.16, 0.34), 8, 6), [p.x + R(-0.3, 0.3), p.y, p.z + R(-0.3, 0.3)], [R(-0.4, 0.4), R(0, TAU), R(-0.4, 0.4)], [1, 0.4, 1.6]);
  }
  const lm = leaf.build(M);
  lm.castShadow = true;
  parent.add(lm);
  const ph = R(0, TAU);
  tick((dt, t) => {
    m.rotation.z = Math.sin(t * 0.6 + ph) * 0.03;
  });
  return m;
}

function islet(scene, r, a, y, s, opts = {}) {
  const g = new THREE.Group();
  const x = Math.cos(a) * r, z = Math.sin(a) * r;
  g.position.set(x, y, z);
  g.scale.setScalar(s);
  scene.add(g);
  const Mg = new THREE.Group();
  g.add(Mg);
  const rings = [
    { r: 3.7, y: 0.0, jag: 0.07, bump: 0.3 },
    { r: 4.0, y: -0.6, jag: 0.09, bump: 0.4 },
    { r: 3.6, y: -2.0, jag: 0.1, bump: 0.5 },
    { r: 2.7, y: -4.0, jag: 0.12, bump: 0.6 },
    { r: 1.7, y: -6.2, jag: 0.14, bump: 0.5 },
    { r: 0.75, y: -8.4, jag: 0.14, bump: 0.3 },
    { r: 0.12, y: -9.6, jag: 0.1, bump: 0.1 }
  ];
  const rock = new THREE.Mesh(rockShell(rings, 40), M.rock);
  rock.castShadow = rock.receiveShadow = true;
  Mg.add(rock);
  const cap = new THREE.Mesh(grassCap(34, { size: 3.8 }), M.grass);
  cap.position.y = 0;
  cap.castShadow = cap.receiveShadow = true;
  Mg.add(cap);
  if (opts.trees !== 0) {
    const Tm = new Merge();
    const n = opts.trees ?? RI(1, 2);
    for (let i = 0; i < n; i++) {
      const tx = R(-1.6, 1.6), tz = R(-1.6, 1.6);
      const ty = groundY(tx * (RIM / 3.8), tz * (RIM / 3.8)) * 0.2 + 0.05;
      Tm.cyl('woodDark', 0.1, 0.14, 1.6, [tx, ty + 0.8, tz], [0, 0, 0], 6);
      for (let k = 0; k < 3; k++) Tm.cone('pine', 1.0 - k * 0.24, 1.2 - k * 0.16, [tx, ty + 1.7 + k * 0.62, tz], [0, R(0, 1), 0], 8);
    }
    Mg.add(Tm.build(M));
  }
  if (opts.boulders !== false) {
    const Bm = new Merge();
    for (let i = 0; i < 5; i++) {
      const bx = R(-3, 3), bz = R(-3, 3);
      Bm.add('rockPlain', jitterGeo(new THREE.IcosahedronGeometry(R(0.3, 0.8), 0), 0.22, i), [bx, 0.2, bz], [R(0, 3), R(0, 3), R(0, 3)], [1, 0.8, 1]);
    }
    Mg.add(Bm.build(M));
  }
  if (opts.fall) {
    const w = makeWaterfall(1.3, 7.5, g, { pos: [2.9, -3.4, 0.6], rot: [0, 0.5, 0], color: '#cfe6f2', opacity: 0.5 });
    w.material.uniforms.uOpacity.value = 0.42;
  }
  const ph = R(0, TAU), sp = R(0.3, 0.7), amp = R(0.5, 1.1);
  const spin = R(-0.06, 0.06);
  const orbit = opts.orbit || 0;
  tick((dt, t) => {
    g.position.y = y + Math.sin(t * sp + ph) * amp;
    g.rotation.y += spin * dt;
    g.rotation.z = Math.sin(t * sp * 0.7 + ph) * 0.02;
    if (orbit) g.rotation.y = -orbit;
  });
  return g;
}

export function buildIsland(scene) {
  const body = new THREE.Group();
  scene.add(body);

  const rings = [
    { r: 32.3, y: -2.8, jag: 0.035, bump: 0.35 },
    { r: 33.9, y: -4.2, jag: 0.045, bump: 0.45 },
    { r: 33.2, y: -6.4, jag: 0.055, bump: 0.55 },
    { r: 31.4, y: -9.6, jag: 0.055, bump: 0.6 },
    { r: 28.6, y: -13.6, jag: 0.05, bump: 0.65 },
    { r: 25.0, y: -18.4, jag: 0.05, bump: 0.7 },
    { r: 21.0, y: -23.6, jag: 0.05, bump: 0.7 },
    { r: 16.8, y: -29.0, jag: 0.05, bump: 0.7 },
    { r: 12.6, y: -34.4, jag: 0.05, bump: 0.65 },
    { r: 8.6, y: -39.6, jag: 0.05, bump: 0.6 },
    { r: 5.2, y: -44.4, jag: 0.05, bump: 0.5 },
    { r: 2.6, y: -48.6, jag: 0.04, bump: 0.4 },
    { r: 0.9, y: -52.0, jag: 0.03, bump: 0.2 },
    { r: 0.12, y: -54.4, jag: 0.02, bump: 0.1 }
  ];
  const rock = new THREE.Mesh(rockShell(rings, 88, { tear: { ang: 3.95, w: 0.5, amt: 0.34, depth: 22 } }), M.rock);
  rock.castShadow = true;
  rock.receiveShadow = true;
  body.add(rock);

  const cap = new THREE.Mesh(grassCap(96), M.grassBig);
  cap.receiveShadow = true;
  cap.castShadow = false;
  body.add(cap);

  const mossM = new Merge();
  for (let i = 0; i < 26; i++) {
    const a = R(0, TAU);
    const y = R(-3.4, -12);
    const rr = rimR(a) * lerp(1.0, 0.83, clamp((-y - 3) / 9, 0, 1)) + 0.1;
    const sc = R(1.4, 3.6);
    mossM.add(pick(['moss', 'foliage2', 'foliage3']), new THREE.SphereGeometry(sc, 10, 7), [Math.cos(a) * rr, y, Math.sin(a) * rr], [0, -a, 0], [1, 0.34, 1.5]);
  }
  const moss = mossM.build(M);
  moss.castShadow = false;
  moss.receiveShadow = true;
  body.add(moss);

  for (let i = 0; i < 26; i++) {
    const a = R(0, TAU);
    const rr = rimR(a) - R(0.2, 1.6);
    const y = R(-2.6, -7);
    vine(body, Math.cos(a) * rr, y, Math.sin(a) * rr, R(3.5, 14), R(0.05, 0.12), pick(['foliage1', 'foliage2', 'pine']));
  }
  for (let i = 0; i < 4; i++) {
    const a = R(0, TAU);
    vine(body, Math.cos(a) * (rimR(a) - 1), R(-2.4, -5), Math.sin(a) * (rimR(a) - 1), R(16, 24), R(0.22, 0.34), 'woodDark');
  }

  const boulderM = new Merge();
  for (let i = 0; i < 16; i++) {
    const a = R(0, TAU), rr = R(24, 31);
    const x = Math.cos(a) * rr, z = Math.sin(a) * rr;
    const y = groundY(x, z);
    boulderM.add('rockPlain', jitterGeo(new THREE.IcosahedronGeometry(R(0.7, 2.0), 1), 0.2, i), [x, y + R(0.2, 0.6), z], [R(0, 3), R(0, 3), R(0, 3)], [1, R(0.6, 0.9), 1]);
  }
  const bl = boulderM.build(M);
  bl.castShadow = bl.receiveShadow = true;
  body.add(bl);

  const ua = 39.5 * Math.PI / 180;
  const fx = Math.cos(ua) * (RIM - 0.4), fz = Math.sin(ua) * (RIM - 0.4);
  const fall = makeWaterfall(9.5, 34, scene, {
    pos: [fx * 1.03, -18.5, fz * 1.03],
    rot: [0, Math.PI / 2 - ua, 0],
    color: '#c3e0f0',
    opacity: 0.52
  });
  const foam = new THREE.Group();
  scene.add(foam);
  for (let i = 0; i < 16; i++) {
    mistPuff(foam, fx * 1.06 + R(-3.4, 3.4), R(-36, -26), fz * 1.06 + R(-3.4, 3.4), R(7, 16), 0.16);
  }
  tick((dt, t) => {
    foam.children.forEach((s, i) => {
      s.position.y += dt * (0.5 + (i % 3) * 0.3);
      if (s.position.y > -22) s.position.y = -36;
      s.material.opacity = 0.1 + Math.sin(t + i) * 0.05;
    });
  });

  const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: texSoft('#cfe3f5'), transparent: true, opacity: 0.16, depthWrite: false, blending: THREE.AdditiveBlending }));
  glow.scale.setScalar(92);
  glow.position.set(0, -44, 0);
  scene.add(glow);

  const wisps = new THREE.Group();
  scene.add(wisps);
  for (let i = 0; i < 12; i++) {
    const a = R(0, TAU);
    const s = mistPuff(wisps, Math.cos(a) * R(48, 88), R(-30, -12), Math.sin(a) * R(48, 88), R(16, 34), 0.1);
    s.userData = { a, r: Math.hypot(s.position.x, s.position.z), sp: R(0.01, 0.03), y: s.position.y };
  }
  tick((dt, t) => {
    wisps.children.forEach((s) => {
      const u = s.userData;
      u.a += u.sp * dt;
      s.position.set(Math.cos(u.a) * u.r, u.y + Math.sin(t * 0.25 + u.a) * 1.4, Math.sin(u.a) * u.r);
    });
  });

  const isletDefs = [
    { r: 58, a: 0.5, y: 6, s: 1.0, fall: true, trees: 2 },
    { r: 74, a: 2.0, y: -12, s: 1.35, fall: true, trees: 3 },
    { r: 52, a: 3.3, y: 14, s: 0.8, trees: 1 },
    { r: 68, a: 4.4, y: -4, s: 1.15, fall: false, trees: 2 },
    { r: 86, a: 5.5, y: 10, s: 1.5, fall: true, trees: 3 },
    { r: 46, a: 1.3, y: -18, s: 0.7, trees: 1 },
    { r: 96, a: 3.9, y: -22, s: 1.7, fall: true, trees: 4 },
    { r: 62, a: 5.0, y: 22, s: 0.9, trees: 2 }
  ];
  isletDefs.forEach((d, i) => islet(scene, d.r, d.a, d.y, d.s, { fall: d.fall, trees: d.trees, orbit: i === 0 ? 0.0 : 0 }));

  label('浮空岛 · 基座', new THREE.Vector3(0, -30, 20), '岛屿被整块从大地上掀起，岩壁分层、青苔与藤蔓垂挂，底部悬在云海之上。', 'place');
  label('大瀑布', new THREE.Vector3(fx * 1.1, -10, fz * 1.1), '湖水从岛缘倾泻而下，落入云海化作水雾。', 'place');
  return { body, cap, rock, fall };
}
