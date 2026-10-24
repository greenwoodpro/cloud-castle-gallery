import * as THREE from 'three';
import { PAL, R, RI, pick, env, reg, tick, clamp, lerp, smoothstep, TAU, texSoft, gSph, shadowed, Merge } from './core.js';

const SKY_VS = `
varying vec3 vDir;
void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }
`;
const SKY_FS = `
uniform vec3 uTop; uniform vec3 uMid; uniform vec3 uBot; uniform vec3 uSunColor; uniform vec3 uSunDir;
uniform float uSunPow; uniform float uNoise;
varying vec3 vDir;
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
void main(){
  vec3 d = normalize(vDir);
  float h = clamp(d.y*0.5+0.5, 0.0, 1.0);
  vec3 col = mix(uBot, uMid, smoothstep(0.30, 0.53, h));
  col = mix(col, uTop, smoothstep(0.50, 0.96, h));
  float sd = max(dot(d, normalize(uSunDir)), 0.0);
  col += uSunColor * pow(sd, 200.0) * 2.4 * uSunPow;
  col += uSunColor * pow(sd, 9.0) * 0.26 * uSunPow;
  col += uSunColor * pow(sd, 2.2) * 0.07 * uSunPow;
  float m = hash(d.xy*19.0 + d.z*7.0);
  col *= 0.975 + 0.055*m;
  col += vec3(0.015) * sin(d.y*24.0 + m*4.0) * uNoise;
  gl_FragColor = vec4(col, 1.0);
}
`;

const KEYS = [
  { t: 0.0, top: '#171d38', mid: '#232c52', bot: '#3f4a78', sunC: '#c9d8ff', fog: '#26305a', hemiSky: '#33406f', hemiGnd: '#3a3548', sunI: 0.16, amb: 0.15 },
  { t: 0.19, top: '#1d2444', mid: '#2e3a68', bot: '#5a6390', sunC: '#c9d8ff', fog: '#33406e', hemiSky: '#3d4a7c', hemiGnd: '#413b4e', sunI: 0.18, amb: 0.15 },
  { t: 0.25, top: '#4e5a93', mid: '#9d7f9f', bot: '#f0c291', sunC: '#ffb877', fog: '#c99f97', hemiSky: '#8f7fa0', hemiGnd: '#7d6d64', sunI: 0.6, amb: 0.2 },
  { t: 0.30, top: '#6f9fd6', mid: '#c3d9ef', bot: '#f6dcb8', sunC: '#ffdfae', fog: '#d8c6b6', hemiSky: '#c9d2e2', hemiGnd: '#b0a086', sunI: 1.2, amb: 0.22 },
  { t: 0.50, top: '#79aede', mid: '#bfdcf2', bot: '#e6f2fa', sunC: '#fff6dd', fog: '#dceaf6', hemiSky: '#cde3f6', hemiGnd: '#c9bd9c', sunI: 1.62, amb: 0.24 },
  { t: 0.63, top: '#84acd8', mid: '#d6dce6', bot: '#f7e5c4', sunC: '#ffeec3', fog: '#e2dccc', hemiSky: '#cfdcea', hemiGnd: '#c8b898', sunI: 1.45, amb: 0.24 },
  { t: 0.71, top: '#7c86b8', mid: '#e9b191', bot: '#ffd9a8', sunC: '#ff9d63', fog: '#eec3a2', hemiSky: '#d7bbaa', hemiGnd: '#9d8c76', sunI: 1.05, amb: 0.26 },
  { t: 0.78, top: '#4f5590', mid: '#c98d93', bot: '#efb98c', sunC: '#ff8b5c', fog: '#b9908c', hemiSky: '#a98fa0', hemiGnd: '#847478', sunI: 0.55, amb: 0.21 },
  { t: 0.86, top: '#262e52', mid: '#3b4a77', bot: '#6c7aa6', sunC: '#c9d8ff', fog: '#3a456f', hemiSky: '#4b5788', hemiGnd: '#453f52', sunI: 0.22, amb: 0.17 },
  { t: 1.0, top: '#171d38', mid: '#232c52', bot: '#3f4a78', sunC: '#c9d8ff', fog: '#26305a', hemiSky: '#33406f', hemiGnd: '#3a3548', sunI: 0.16, amb: 0.15 }
];

function keyLerp(t) {
  let i = 0;
  while (i < KEYS.length - 2 && t > KEYS[i + 1].t) i++;
  const a = KEYS[i], b = KEYS[i + 1];
  const k = clamp((t - a.t) / (b.t - a.t), 0, 1);
  const e = k * k * (3 - 2 * k);
  return { a, b, e };
}

export function createSky(scene, renderer) {
  const group = new THREE.Group();
  scene.add(group);

  const uniforms = {
    uTop: { value: new THREE.Color('#8ab9e8') },
    uMid: { value: new THREE.Color('#cfe7f7') },
    uBot: { value: new THREE.Color('#eef7fb') },
    uSunColor: { value: new THREE.Color('#fff6dd') },
    uSunDir: { value: new THREE.Vector3(0.4, 0.8, 0.3) },
    uSunPow: { value: 1 },
    uNoise: { value: 1 }
  };
  const sky = new THREE.Mesh(
    new THREE.SphereGeometry(1400, 64, 40),
    new THREE.ShaderMaterial({ uniforms, vertexShader: SKY_VS, fragmentShader: SKY_FS, side: THREE.BackSide, depthWrite: false, fog: false })
  );
  sky.frustumCulled = false;
  group.add(sky);

  const starGeo = new THREE.BufferGeometry();
  const starN = 1500;
  const sp = new Float32Array(starN * 3);
  const ss = new Float32Array(starN);
  for (let i = 0; i < starN; i++) {
    const u = R(0, TAU), v = R(0.02, 1);
    const r = 1180;
    sp[i * 3] = Math.cos(u) * Math.sqrt(1 - v * v) * r;
    sp[i * 3 + 1] = v * r;
    sp[i * 3 + 2] = Math.sin(u) * Math.sqrt(1 - v * v) * r;
    ss[i] = R(1.1, 3.4);
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(sp, 3));
  starGeo.setAttribute('asize', new THREE.BufferAttribute(ss, 1));
  const starMat = new THREE.ShaderMaterial({
    uniforms: { uOpacity: { value: 0 }, uTex: { value: texSoft('#ffffff') }, uScale: { value: Math.min(2, window.devicePixelRatio || 1) } },
    vertexShader: `
      attribute float asize; uniform float uScale; varying float vS;
      void main(){ vS = asize; vec4 mv = modelViewMatrix * vec4(position,1.0);
        gl_PointSize = asize * uScale; gl_Position = projectionMatrix * mv; }`,
    fragmentShader: `
      uniform float uOpacity; uniform sampler2D uTex; varying float vS;
      void main(){ vec4 t = texture2D(uTex, gl_PointCoord); gl_FragColor = vec4(vec3(1.0,0.97,0.92), t.a*uOpacity); }`,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    fog: false
  });
  const stars = new THREE.Points(starGeo, starMat);
  stars.frustumCulled = false;
  group.add(stars);

  const moon = new THREE.Group();
  const moonBall = new THREE.Mesh(gSph(26, 24), new THREE.MeshBasicMaterial({ color: '#f8f3e2', fog: false, transparent: true, opacity: 0 }));
  const moonGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map: texSoft('#e9eeff'), transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending, fog: false }));
  moonGlow.scale.setScalar(220);
  moon.add(moonBall, moonGlow);
  moon.position.set(0, 600, 0);
  group.add(moon);

  const cloudMat = new THREE.MeshStandardMaterial({ color: '#fdf7f0', roughness: 1, emissive: '#cfd8ee', emissiveIntensity: 0.35, transparent: true, opacity: 0.95 });
  const cloudMatSoft = new THREE.MeshStandardMaterial({ color: '#f6f1ea', roughness: 1, emissive: '#d6d9ee', emissiveIntensity: 0.3, transparent: true, opacity: 0.7 });
  const cloudSea = new THREE.Group();
  group.add(cloudSea);
  const clouds = [];
  const mkCloud = (parent, y, radius, scale) => {
    const g = new THREE.Group();
    const blob = new Merge();
    const n = RI(5, 9);
    for (let i = 0; i < n; i++) {
      const r = R(6, 15) * scale;
      blob.add('c', gSph(r, 12), [R(-14, 14) * scale, R(-1.6, 1.6) * scale, R(-11, 11) * scale], [0, 0, 0], [1, 0.55, 0.9]);
    }
    const m = blob.build({ c: Math.random() < 0.4 ? cloudMatSoft : cloudMat }, { cast: false, receive: false });
    g.add(m);
    const a = R(0, TAU);
    g.position.set(Math.cos(a) * radius, y + R(-6, 6), Math.sin(a) * radius);
    g.rotation.y = R(0, TAU);
    g.userData.spin = R(0.0009, 0.0026) * (Math.random() < 0.5 ? 1 : -1);
    parent.add(g);
    clouds.push(g);
    return g;
  };
  for (let i = 0; i < 34; i++) mkCloud(cloudSea, R(-58, -32), R(120, 520), R(1.5, 3.4));
  for (let i = 0; i < 14; i++) mkCloud(cloudSea, R(-34, -26), R(150, 260), R(1.0, 1.8));
  const upper = new THREE.Group();
  group.add(upper);
  for (let i = 0; i < 14; i++) mkCloud(upper, R(74, 132), R(210, 540), R(1.6, 3.4));

  const birds = [];
  const birdMat = new THREE.MeshBasicMaterial({ color: '#4b4a5e', fog: false, side: THREE.DoubleSide, transparent: true, opacity: 0.85 });
  for (let f = 0; f < 3; f++) {
    const flock = new THREE.Group();
    group.add(flock);
    const members = [];
    for (let i = 0; i < RI(3, 5); i++) {
      const b = new THREE.Group();
      const wingGeo = new THREE.PlaneGeometry(1.5, 0.42);
      const L = new THREE.Mesh(wingGeo, birdMat);
      const Rr = new THREE.Mesh(wingGeo, birdMat);
      L.position.x = -0.72;
      Rr.position.x = 0.72;
      b.add(L, Rr);
      const body = new THREE.Mesh(gSph(0.16, 6), birdMat);
      body.scale.set(1, 0.7, 2.2);
      b.add(body);
      b.userData = { L, Rr, ph: R(0, TAU), sp: R(7, 11) };
      b.position.set(R(-6, 6), R(-3, 3), R(-6, 6));
      flock.add(b);
      members.push(b);
    }
    flock.userData = { members, r: R(20, 34), y: R(19, 30), a: R(0, TAU), sp: R(0.05, 0.12), cx: R(-5, 5), cz: R(-5, 5), flap: R(7, 11) };
    flock.scale.setScalar(R(0.45, 0.75));
    birds.push(flock);
  }

  const hemi = new THREE.HemisphereLight('#d6eaf8', '#b9ad8e', 0.68);
  scene.add(hemi);
  const amb = new THREE.AmbientLight('#ffe9d0', 0.22);
  scene.add(amb);
  const sun = new THREE.DirectionalLight('#fff6dd', 1.7);
  sun.castShadow = true;
  sun.shadow.mapSize.set(qualityShadow(), qualityShadow());
  sun.shadow.camera.left = -68;
  sun.shadow.camera.right = 68;
  sun.shadow.camera.top = 68;
  sun.shadow.camera.bottom = -68;
  sun.shadow.camera.near = 20;
  sun.shadow.camera.far = 400;
  sun.shadow.bias = -0.0007;
  sun.shadow.normalBias = 0.03;
  sun.shadow.radius = 2.4;
  scene.add(sun);
  scene.add(sun.target);
  sun.target.position.set(0, 6, 0);
  const rim = new THREE.DirectionalLight('#cfe3f5', 0.32);
  rim.position.set(-1, 0.6, -0.7).multiplyScalar(90);
  scene.add(rim);
  const under = new THREE.PointLight('#cfe2ef', 0.42, 220, 1.5);
  under.position.set(0, -46, 0);
  scene.add(under);

  const dust = (() => {
    const N = 700;
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(N * 3);
    const sz = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      const a = R(0, TAU), r = R(12, 95), y = R(-32, 34);
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(a) * r;
      sz[i] = R(0.6, 1.9);
    }
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('asize', new THREE.BufferAttribute(sz, 1));
    const m = new THREE.ShaderMaterial({
      uniforms: { uT: { value: 0 }, uTex: { value: texSoft('#fff3d8') }, uOpacity: { value: 0.5 } },
      vertexShader: `attribute float asize; uniform float uT; varying float vA;
        void main(){ vec3 p = position; p.y += sin(uT*0.4 + p.x*0.1)*2.0; p.x += sin(uT*0.23 + p.z*0.08)*2.6;
        vA = asize; vec4 mv = modelViewMatrix*vec4(p,1.0); gl_PointSize = asize*3.0; gl_Position = projectionMatrix*mv; }`,
      fragmentShader: `uniform float uOpacity; uniform sampler2D uTex; varying float vA;
        void main(){ vec4 t = texture2D(uTex, gl_PointCoord); gl_FragColor = vec4(vec3(1.0,0.94,0.82), t.a*uOpacity*0.9); }`,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    const pts = new THREE.Points(g, m);
    pts.frustumCulled = false;
    scene.add(pts);
    return { pts, m };
  })();

  function qualityShadow() {
    return 2048;
  }

  const tmpA = new THREE.Color(), tmpB = new THREE.Color(), moonTint = new THREE.Color();
  const cTop = new THREE.Color(), cMid = new THREE.Color(), cBot = new THREE.Color(), cSun = new THREE.Color(), cFog = new THREE.Color();
  const hemiSky = new THREE.Color(), hemiGnd = new THREE.Color();
  const sunDir = new THREE.Vector3();

  function update(t) {
    const { a, b, e } = keyLerp(t);
    cTop.set(a.top).lerp(tmpA.set(b.top), e);
    cMid.set(a.mid).lerp(tmpA.set(b.mid), e);
    cBot.set(a.bot).lerp(tmpA.set(b.bot), e);
    cSun.set(a.sunC).lerp(tmpA.set(b.sunC), e);
    cFog.set(a.fog).lerp(tmpA.set(b.fog), e);
    hemiSky.set(a.hemiSky).lerp(tmpA.set(b.hemiSky), e);
    hemiGnd.set(a.hemiGnd).lerp(tmpA.set(b.hemiGnd), e);
    const sunI = lerp(a.sunI, b.sunI, e);
    const ambI = lerp(a.amb, b.amb, e);

    const ang = (t - 0.25) * TAU;
    sunDir.set(Math.cos(ang) * 0.92, Math.sin(ang), 0.34 + Math.cos(ang) * 0.12).normalize();
    const elev = sunDir.y;
    const night = smoothstep(0.16, -0.10, elev);
    env.night = night;

    uniforms.uTop.value.copy(cTop);
    uniforms.uMid.value.copy(cMid);
    uniforms.uBot.value.copy(cBot);
    uniforms.uSunColor.value.copy(cSun);
    uniforms.uSunDir.value.copy(sunDir);
    uniforms.uSunPow.value = smoothstep(-0.22, 0.06, elev) * 1.25 + 0.14;
    uniforms.uNoise.value = 0.6 + night * 0.8;

    sun.position.copy(sunDir).multiplyScalar(150);
    sun.target.position.set(0, 6, 0);
    const daylight = elev > -0.02;
    if (!daylight) sun.position.copy(sunDir).multiplyScalar(-150);
    sun.color.copy(daylight ? cSun : moonTint.set('#b9c9f0'));
    sun.intensity = daylight ? sunI * (1 - night * 0.5) : 0.5 * night;
    sun.visible = true;

    hemi.color.copy(hemiSky);
    hemi.groundColor.copy(hemiGnd);
    hemi.intensity = lerp(0.7, 0.5, night);
    amb.color.copy(cMid).lerp(tmpB.set('#8fa4d8'), night * 0.7);
    amb.intensity = ambI;

    rim.color.copy(cMid).lerp(tmpB.set('#b7c8ea'), 0.4);
  rim.intensity = 0.22 + night * 0.25;
  under.intensity = 0.42 + night * 0.28;

    starMat.uniforms.uOpacity.value = clamp(night * 1.5 - 0.25, 0, 1) * env.stars;
    moon.position.copy(sunDir).multiplyScalar(-1150).setY(Math.max(-sunDir.y, 0.06) * 1050);
    const moonUp = sunDir.y < 0.1 ? 1 : 0;
    moonBall.material.opacity = moonUp * clamp(night * 1.4, 0, 1);
    moonGlow.material.opacity = moonBall.material.opacity * 0.5;
    moonBall.visible = moonGlow.visible = moonBall.material.opacity > 0.01;

    if (scene.fog) scene.fog.color.copy(cFog);
    const skyBlend = cloudMat.emissive;
    skyBlend.copy(cMid).lerp(tmpB.set(cSun).multiplyScalar(1), 0.35);
    cloudMat.emissiveIntensity = lerp(0.42, 0.2, night);
    cloudMatSoft.emissiveIntensity = lerp(0.34, 0.14, night);
    cloudMat.color.copy(cTop).lerp(tmpB.set('#fbf3ea'), 0.62);
    cloudMatSoft.color.copy(cloudMat.color).lerp(tmpB.set(cMid), 0.35);
    renderer.toneMappingExposure = lerp(0.98, 0.9, night);
    dust.m.uniforms.uOpacity.value = 0.34 + night * 0.4;
  }
  function botCloud() {
    return '#fdf7f0';
  }

  tick((dt, t) => {
    if (env.auto) env.time = (env.time + dt * 0.0055) % 1;
    update(env.time);
    clouds.forEach((c) => {
      c.rotation.y += c.userData.spin * dt * 30;
    });
    dust.m.uniforms.uT.value = t;
    birds.forEach((f) => {
      const u = f.userData;
      u.a += u.sp * dt;
      f.position.set(u.cx + Math.cos(u.a) * u.r, u.y + Math.sin(u.a * 2.3) * 2.2, u.cz + Math.sin(u.a) * u.r);
      f.rotation.y = -u.a + Math.PI / 2;
      u.members.forEach((b, i) => {
        const fl = Math.sin(t * b.userData.sp) * 0.7;
        b.userData.L.rotation.z = -0.35 - fl;
        b.userData.Rr.rotation.z = 0.35 + fl;
        b.position.y += Math.sin(t * 3 + i * 1.7) * 0.006;
      });
    });
  });

  update(env.time);
  return { update, group, sky, sun, stars, moon, cloudSea, upper, dust };
}
