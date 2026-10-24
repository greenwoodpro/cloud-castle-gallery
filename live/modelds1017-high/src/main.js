import * as THREE from 'three';
import { OrbitControls } from 'three/addons/OrbitControls.js';
import { createIsland } from './island.js';
import { createCastle } from './castle.js';
import { populateCharacters } from './characters.js';
import { createEnvironment, updateEnvironment } from './environment.js';
import { SPOTS, INTRO, GROUPS } from './content.js';
import { waveBanner } from './utils.js';
import { mergeStaticWorld, mergeCutGroup, mergeOutlines, trimShadowCasters, mergeGroupLocal } from './optimize.js';

/* ------------------------------------------------------------------ *
 *  渲染器 / 场景 / 相机
 * ------------------------------------------------------------------ */
const canvas = document.getElementById('scene');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.08;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.shadowMap.autoUpdate = false;
renderer.shadowMap.needsUpdate = true;

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xdfe8ef, 130, 520);

const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 900);
camera.position.set(...SPOTS[0].cam);

const controls = new OrbitControls(camera, canvas);
controls.target.set(...SPOTS[0].target);
controls.enableDamping = true;
controls.dampingFactor = 0.055;
controls.rotateSpeed = 0.55;
controls.zoomSpeed = 0.85;
controls.panSpeed = 0.6;
controls.minDistance = 5;
controls.maxDistance = 150;
controls.minPolarAngle = 0.12;
controls.maxPolarAngle = Math.PI * 0.62;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.28;
controls.update();

/* ------------------------------------------------------------------ *
 *  灯光
 * ------------------------------------------------------------------ */
const hemi = new THREE.HemisphereLight(0xd6e8f2, 0xd9c4a6, 0.9);
scene.add(hemi);

const ambient = new THREE.AmbientLight(0xfff0da, 0.26);
scene.add(ambient);

const sun = new THREE.DirectionalLight(0xffe2b4, 2.7);
sun.position.set(-36, 50, 34);
sun.castShadow = true;
sun.shadow.mapSize.set(1024, 1024);
sun.shadow.camera.left = -44;
sun.shadow.camera.right = 44;
sun.shadow.camera.top = 44;
sun.shadow.camera.bottom = -44;
sun.shadow.camera.near = 1;
sun.shadow.camera.far = 190;
sun.shadow.bias = -0.0005;
sun.shadow.normalBias = 0.035;
scene.add(sun);

const fill = new THREE.DirectionalLight(0xa8c6e0, 0.5);
fill.position.set(50, 26, 40);
scene.add(fill);


/* ------------------------------------------------------------------ *
 *  构建场景
 * ------------------------------------------------------------------ */
const ctx = {
  cutWalls: [],
  cutRoofs: [],
  banners: [],
  windowMats: [],
  fireLights: [],
  fireGlows: [],
  fires: [],
  spinners: [],
  mist: [],
  smokePoints: [],
};

const world = new THREE.Group();
world.name = 'world';
scene.add(world);

const island = createIsland(ctx);
world.add(island);

const castle = createCastle(ctx);
world.add(castle);

const characters = populateCharacters(ctx);
world.add(characters);

const mergeStats = mergeStaticWorld(world, ctx);
for (const w of ctx.cutWalls) w.mats = mergeCutGroup(w.obj);
ctx.cutRoofs.forEach((r) => mergeCutGroup(r));
const outlineMerged = mergeOutlines(world);
const shadowTrimmed = trimShadowCasters(scene);
console.log('[castle] outlines merged', outlineMerged, 'shadow casters trimmed', shadowTrimmed);
console.log('[castle] static merge', mergeStats);

const env = createEnvironment(ctx);
env.clouds.children.forEach((c) => mergeGroupLocal(c, true));
env.distant.children.forEach((c) => mergeGroupLocal(c, false));
scene.add(env.group);

/* 记录初始亮度 / 颜色，用于昼夜过渡 */
const windowBase = ctx.windowMats.map((m) => m.color.clone());
const windowNight = windowBase.map((c) => c.clone().lerp(new THREE.Color(0xffcf84), 0.72).multiplyScalar(1.12));
const fireGlowBase = ctx.fireGlows.map((g) => g.material.opacity);
const fireLightBase = ctx.fireLights.map((l) => l.intensity);
ctx.fireLights.forEach((l) => (l.userData.base = l.intensity));
ctx.fireGlows.forEach((g, i) => (g.userData.baseOpacity = fireGlowBase[i]));

/* 指向为正：让窗光在白昼也有一点空气感 */
windowBase.forEach((c) => c.lerp(new THREE.Color(0xffffff), 0.08));

/* ------------------------------------------------------------------ *
 *  昼夜
 * ------------------------------------------------------------------ */
const DAY = {
  top: new THREE.Color(0x7ba6cd),
  mid: new THREE.Color(0xd2e1e6),
  low: new THREE.Color(0xf6cfa4),
  sun: new THREE.Color(0xffdfae),
  fog: new THREE.Color(0xdfe8ef),
  hemiSky: new THREE.Color(0xd6e8f2),
  hemiGround: new THREE.Color(0xd9c4a6),
  dir: new THREE.Color(0xffe2b4),
  amb: new THREE.Color(0xfff0da),
};
const NIGHT = {
  top: new THREE.Color(0x1b2643),
  mid: new THREE.Color(0x3b4162),
  low: new THREE.Color(0x7d6884),
  sun: new THREE.Color(0xffcf9e),
  fog: new THREE.Color(0x4a4a63),
  hemiSky: new THREE.Color(0x7686ad),
  hemiGround: new THREE.Color(0x56505f),
  dir: new THREE.Color(0x9fb4d8),
  amb: new THREE.Color(0x6a6480),
};

let night = 0;
let nightTarget = 0;
const nightColor = new THREE.Color();
function mixColor(target, a, b, t) {
  target.copy(a).lerp(b, t);
  return target;
}

/* ------------------------------------------------------------------ *
 *  剖切
 * ------------------------------------------------------------------ */
let cutaway = false;
const _v1 = new THREE.Vector3();
const _v2 = new THREE.Vector3();
const _q = new THREE.Quaternion();

let shadowDirty = true;

function setCutaway(on) {
  cutaway = on;
  shadowDirty = true;
  ctx.cutRoofs.forEach((r) => (r.visible = !on));
  document.getElementById('btnCut').classList.toggle('on', on);
}

function updateCutaway(dt) {
  const camPos = camera.position;
  for (const w of ctx.cutWalls) {
    w.obj.getWorldPosition(_v1);
    w.obj.getWorldQuaternion(_q);
    _v2.copy(w.normal).applyQuaternion(_q).normalize();
    const view = new THREE.Vector3().subVectors(camPos, _v1).normalize();
    const facing = _v2.dot(view);
    const target = cutaway && facing > 0.12 ? 0.045 : 1;
    w.opacity += (target - w.opacity) * Math.min(1, dt * 8);
    const ghost = w.opacity < 0.995;
    for (const m of w.mats) {
      if (m.isMeshToonMaterial) m.transparent = ghost;
      m.opacity = ghost ? w.opacity : 1;
    }
    w.obj.visible = w.opacity > 0.02;
  }
}

/* ------------------------------------------------------------------ *
 *  相机飞行
 * ------------------------------------------------------------------ */
let tween = null;
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function flyTo(spot) {
  const from = camera.position.clone();
  const to = new THREE.Vector3(...spot.cam);
  const ft = controls.target.clone();
  const tt = new THREE.Vector3(...spot.target);
  tween = { from, to, ft, tt, t: 0, dur: 1.65, fromFov: camera.fov, toFov: spot.fov ?? 40 };
  controls.enabled = false;
  controls.autoRotate = false;
  document.getElementById('btnRotate').classList.remove('on');
}

function updateTween(dt) {
  if (!tween) return;
  tween.t += dt / tween.dur;
  const k = easeInOut(Math.min(1, tween.t));
  camera.position.lerpVectors(tween.from, tween.to, k);
  controls.target.lerpVectors(tween.ft, tween.tt, k);
  camera.fov = THREE.MathUtils.lerp(tween.fromFov, tween.toFov, k);
  camera.updateProjectionMatrix();
  camera.lookAt(controls.target);
  if (tween.t >= 1) {
    tween = null;
    controls.enabled = true;
    controls.update();
  }
}

/* ------------------------------------------------------------------ *
 *  UI
 * ------------------------------------------------------------------ */
const listEl = document.getElementById('spotList');
const spotEls = [];
let current = -1;

let currentGroup = '';
SPOTS.forEach((spot, i) => {
  if (spot.group !== currentGroup) {
    currentGroup = spot.group;
    const label = document.createElement('div');
    label.className = 'group-label';
    label.textContent = spot.group;
    listEl.appendChild(label);
  }
  const el = document.createElement('div');
  el.className = 'spot';
  el.dataset.id = spot.id;
  el.innerHTML = `
    <button class="spot-head">
      <span class="idx">${String(i + 1).padStart(2, '0')}</span>
      <span class="name">${spot.name}</span>
      <span class="rule"></span>
      <span class="arrow">▸</span>
    </button>
    <div class="spot-body"><div class="spot-body-inner">
      <h4>${spot.title}</h4>
      <p>${spot.text}</p>
    </div></div>`;
  el.querySelector('.spot-head').addEventListener('click', () => activate(i, true));
  listEl.appendChild(el);
  spotEls.push(el);
});

const captionTitle = document.getElementById('captionTitle');
const captionText = document.getElementById('captionText');

function activate(i, fly = true) {
  current = i;
  const spot = SPOTS[i];
  spotEls.forEach((el, k) => el.classList.toggle('active', k === i));

  captionTitle.textContent = spot.title;
  captionText.textContent = spot.text;

  // 剖切与夜色由导览点决定
  setCutaway(!!spot.cut);
  nightTarget = spot.night ? 1 : 0;
  document.getElementById('btnNight').classList.toggle('on', !!spot.night);

  if (fly) {
    flyTo(spot);
  } else {
    camera.position.set(...spot.cam);
    controls.target.set(...spot.target);
    camera.fov = spot.fov ?? 40;
    camera.updateProjectionMatrix();
    controls.update();
  }

  const active = spotEls[i];
  if (active && listEl.scrollHeight > listEl.clientHeight) {
    setTimeout(() => {
      active.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 120);
  }
}

/* 工具条 */
const btnRotate = document.getElementById('btnRotate');
const btnCut = document.getElementById('btnCut');
const btnNight = document.getElementById('btnNight');
const btnHome = document.getElementById('btnHome');
const btnPanel = document.getElementById('btnPanel');
const panel = document.getElementById('panel');
const closePanel = document.getElementById('closePanel');

btnRotate.addEventListener('click', () => {
  controls.autoRotate = !controls.autoRotate;
  btnRotate.classList.toggle('on', controls.autoRotate);
});
btnCut.addEventListener('click', () => setCutaway(!cutaway));
btnNight.addEventListener('click', () => {
  nightTarget = nightTarget > 0.5 ? 0 : 1;
  btnNight.classList.toggle('on', nightTarget > 0.5);
});
btnHome.addEventListener('click', () => activate(0, true));
btnPanel.addEventListener('click', () => panel.classList.toggle('hidden'));
closePanel.addEventListener('click', () => panel.classList.add('hidden'));

canvas.addEventListener('pointerdown', () => {
  if (tween) {
    tween = null;
    controls.enabled = true;
  }
});

/* 初始状态 */
btnRotate.classList.add('on');
activate(0, false);
// 初始视角稍微高一点，先看全貌
camera.position.set(...SPOTS[0].cam);
controls.target.set(...SPOTS[0].target);
controls.update();

/* URL 参数（便于截图与分享） */
const params = new URLSearchParams(location.search);
if (params.has('spot')) {
  const idx = SPOTS.findIndex((s) => s.id === params.get('spot'));
  if (idx >= 0) activate(idx, false);
}
if (params.get('night') === '1') {
  nightTarget = 1;
  night = 1;
  btnNight.classList.add('on');
}
if (params.get('cut') === '1') setCutaway(true);
if (params.get('norotate') === '1') {
  controls.autoRotate = false;
  btnRotate.classList.remove('on');
}

/* ------------------------------------------------------------------ *
 *  动画循环
 * ------------------------------------------------------------------ */
const clock = new THREE.Clock();
let t = 0;
let frames = 0;

const tmpColor = new THREE.Color();

function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), 0.05);
  t += dt;

  updateTween(dt);
  updateCutaway(dt);
  controls.update();

  // 昼夜插值
  night += (nightTarget - night) * Math.min(1, dt * 1.8);
  const n = night;
  document.body.classList.toggle('night', n > 0.45);

  mixColor(env.uniforms.topColor.value, DAY.top, NIGHT.top, n);
  mixColor(env.uniforms.midColor.value, DAY.mid, NIGHT.mid, n);
  mixColor(env.uniforms.lowColor.value, DAY.low, NIGHT.low, n);
  mixColor(env.uniforms.sunColor.value, DAY.sun, NIGHT.sun, n);
  env.uniforms.sunAmount.value = 1 - n * 0.75;
  env.uniforms.nightAmount.value = n;

  mixColor(scene.fog.color, DAY.fog, NIGHT.fog, n);
  scene.fog.near = 130 - n * 20;
  scene.fog.far = 520 - n * 100;

  mixColor(hemi.color, DAY.hemiSky, NIGHT.hemiSky, n);
  mixColor(hemi.groundColor, DAY.hemiGround, NIGHT.hemiGround, n);
  hemi.intensity = 0.9 - n * 0.5;
  mixColor(ambient.color, DAY.amb, NIGHT.amb, n);
  ambient.intensity = 0.26 - n * 0.13;
  mixColor(sun.color, DAY.dir, NIGHT.dir, n);
  sun.intensity = 2.7 - n * 2.2;
  fill.intensity = 0.5 - n * 0.35;
  renderer.toneMappingExposure = 1.08 - n * 0.16;

  // 窗光
  for (let i = 0; i < ctx.windowMats.length; i++) {
    const m = ctx.windowMats[i];
    m.color.copy(windowBase[i]).lerp(windowNight[i], n);
  }

  // 火光
  ctx.fireLights.forEach((l) => {
    const base = l.userData.base;
    const flicker = 0.88 + Math.sin(t * 9 + l.position.x) * 0.06 + Math.sin(t * 17 + l.position.z) * 0.04;
    l.intensity = base * flicker * (1 + n * 0.55);
  });
  ctx.fires.forEach((fire, i) => {
    fire.children.forEach((f, k) => {
      const s = 0.9 + Math.sin(t * 8 + k * 1.7 + i) * 0.12 + Math.sin(t * 13 + k) * 0.06;
      f.scale.y = s;
      f.scale.x = 0.95 + Math.sin(t * 6 + k) * 0.08;
    });
  });
  ctx.fireGlows.forEach((g, i) => {
    const base = g.userData.baseOpacity ?? 0.5;
    g.material.opacity = base * (0.85 + Math.sin(t * 5 + i) * 0.12) * (1 + n * 0.6);
  });

  // 旗子飘动
  for (const b of ctx.banners) {
    if (!b || !b.userData || !b.userData.base) continue;
    waveBanner(b, t);
    b.userData.phase += 0; // 相位固定
  }

  // 瀑布
  if (ctx.waterfall) {
    const tex = ctx.waterfall.userData.tex;
    if (tex) tex.offset.y -= dt * 0.55;
  }
  // 水雾
  ctx.mist.forEach((s, i) => {
    s.position.y -= dt * 0.25;
    s.material.opacity = 0.25 + Math.sin(t * 0.8 + i) * 0.08;
    if (s.position.y < -19) s.position.y = -15;
  });

  // 风车 / 太阳系仪
  ctx.spinners.forEach((s) => {
    s.rotation.y += dt * (s.userData.spin ?? 0.3);
  });


  updateEnvironment(env, ctx, t, dt, n);

  if (frames % 4 === 0 || shadowDirty) {
    renderer.shadowMap.needsUpdate = true;
    shadowDirty = false;
  }

  renderer.render(scene, camera);

  frames++;
  if (frames === 2) {
    document.getElementById('loading').classList.add('done');
    window.__ready = true;
  }
}
animate();

/* ------------------------------------------------------------------ *
 *  尺寸
 * ------------------------------------------------------------------ */
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

/* ------------------------------------------------------------------ *
 *  对外接口（调试 / 截图）
 * ------------------------------------------------------------------ */
window.__THREE = THREE;
window.__castle = {
  scene,
  camera,
  controls,
  renderer,
  ctx,
  setSpot: (id) => {
    const i = SPOTS.findIndex((s) => s.id === id);
    if (i >= 0) activate(i, false);
  },
  setNight: (v) => {
    nightTarget = v ? 1 : 0;
    if (!v) night = 0;
    document.getElementById('btnNight').classList.toggle('on', !!v);
  },
  setCut: (v) => setCutaway(!!v),
  setCamera: (pos, target) => {
    camera.position.set(...pos);
    controls.target.set(...target);
    controls.update();
  },
  waveTime: (time) => {
    // 让截图里的旗子处于某个固定相位
    ctx.banners.forEach((b) => waveBanner(b, time));
  },
  spots: SPOTS,
};