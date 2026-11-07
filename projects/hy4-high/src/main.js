/* 渲染器、自由视角、图鉴交互、热点、昼夜与剖面 */
import * as T from '../vendor/three.module.js';
import { OrbitControls } from '../vendor/OrbitControls.js';
import { buildWorld } from './world.js';
import { ENTRIES, CATS, byId, VIEWS } from './content.js';

const $ = (id) => document.getElementById(id);
const canvas = $('scene');

let renderer, scene, camera, controls, world;
let hemi, keyLight, fillLight, ambient;
const dayFog = new T.Color(0xe9dfcd), nightFog = new T.Color(0x38405f);
const dayLightPos = new T.Vector3(-58, 74, 52), nightLightPos = new T.Vector3(-72, 62, -96);
const dayKeyColor = new T.Color(0xffe1b8), nightKeyColor = new T.Color(0xaebfe2);
const daySkyColor = new T.Color(0xdfeaf4), nightSkyColor = new T.Color(0x8b9cc4);

const ui = { cat: 'structure', id: null, view: 'list', pins: true, auto: false, night: false, cut: false, cam: 'overview' };
let pinEls = [], tween = null, lastTime = performance.now(), elapsed = 0;
const tmpV = new T.Vector3(), tmpV2 = new T.Vector3();

/* ── 相机 ─────────────────────────────────────── */
function viewPos(v) {
  const h = v.d * Math.cos(v.el);
  return new T.Vector3(
    v.at[0] + Math.sin(v.az) * h,
    v.at[1] + v.d * Math.sin(v.el),
    v.at[2] + Math.cos(v.az) * h
  );
}
const ease = (x) => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
function flyTo(v, dur = 1.35) {
  if (!v) return;
  controls.autoRotate = false;
  tween = {
    p0: camera.position.clone(), p1: viewPos(v),
    t0: controls.target.clone(), t1: new T.Vector3(...v.at),
    k: 0, dur,
  };
}

/* ── 图鉴 UI ───────────────────────────────────── */
function renderTabs() {
  $('tabs').innerHTML = CATS.map(c =>
    `<button class="tab ${c.id === ui.cat ? 'on' : ''}" data-cat="${c.id}"><span>${c.n}</span><em>${c.en}</em></button>`
  ).join('');
  const c = CATS.find(x => x.id === ui.cat);
  $('cat-title').textContent = c.n;
  $('cat-en').textContent = c.en;
  $('cat-desc').textContent = c.d;
  $('cat-count').textContent = String(ENTRIES.filter(e => e.cat === ui.cat).length).padStart(2, '0');
}
function renderList() {
  const items = ENTRIES.filter(e => e.cat === ui.cat);
  $('list-items').innerHTML = items.map((e, i) => `
    <button class="item ${e.id === ui.id ? 'on' : ''}" data-id="${e.id}">
      <span class="item-n">${String(i + 1).padStart(2, '0')}</span>
      <span class="item-tx"><b>${e.n}</b><em>${e.k}</em></span>
      <span class="item-ar">›</span>
    </button>`).join('');
}
function renderDetail(e) {
  if (!e) return;
  const all = ENTRIES.filter(x => x.cat === e.cat);
  const i = all.findIndex(x => x.id === e.id) + 1;
  $('d-kicker').textContent = e.k;
  $('d-title').textContent = e.n;
  $('d-text').textContent = e.t;
  $('d-facts').innerHTML = e.f.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('');
  $('d-index').textContent = `${CATS.find(c => c.id === e.cat).en} · ${String(i).padStart(2, '0')} / ${String(all.length).padStart(2, '0')}`;
  const prev = all[(i - 2 + all.length) % all.length], next = all[i % all.length];
  $('d-neighbors').innerHTML = `
    <button data-id="${prev.id}">← ${prev.n}</button>
    <button data-id="${next.id}">${next.n} →</button>`;
}
function showView(v) {
  ui.view = v;
  $('list-view').classList.toggle('hide', v !== 'list');
  $('detail-view').classList.toggle('hide', v !== 'detail');
  $('guide').classList.toggle('detail', v === 'detail');
}

/* ── 热点 ─────────────────────────────────────── */
function renderPins() {
  const items = ENTRIES.filter(e => e.p && e.cat === ui.cat && byId[e.id]);
  $('pin-layer').innerHTML = items.map(e =>
    `<button class="pin ${e.id === ui.id ? 'on' : ''}" data-id="${e.id}"><i></i><span>${e.n}</span></button>`
  ).join('');
  pinEls = Array.from($('pin-layer').children).map((el, i) => ({ el, at: items[i].at }));
  $('pin-layer').style.display = ui.pins ? '' : 'none';
}
function updatePins() {
  if (!ui.pins || !pinEls.length) return;
  const w = window.innerWidth, h = window.innerHeight;
  const far = camera.position.distanceTo(controls.target) > 58;
  pinEls.forEach(({ el, at }, idx) => {
    if (far && idx % 2 === 1) {
      el.style.opacity = '0'; el.style.pointerEvents = 'none'; return;
    }
    tmpV.set(at[0], at[1], at[2]);
    const d = camera.position.distanceTo(tmpV);
    tmpV.project(camera);
    if (tmpV.z > 1 || tmpV.z < -1 || Math.abs(tmpV.x) > 1.05 || Math.abs(tmpV.y) > 1.05 || d > 165) {
      el.style.opacity = '0'; el.style.pointerEvents = 'none'; return;
    }
    el.style.opacity = String(Math.max(.25, Math.min(1, 1.5 - d / 190)));
    el.style.pointerEvents = 'auto';
    el.style.transform = `translate(-50%,-50%) translate(${((tmpV.x * .5 + .5) * w).toFixed(1)}px,${((-tmpV.y * .5 + .5) * h).toFixed(1)}px)`;
  });
}

/* ── 状态开关 ─────────────────────────────────── */
function setNight(v) {
  ui.night = !!v; world.setNight(ui.night);
  document.body.classList.toggle('night', ui.night);
  document.querySelector('[data-toggle="night"]').classList.toggle('on', ui.night);
  document.querySelector('[data-toggle="night"]').textContent = ui.night ? '黄昏' : '星夜';
}
function setCut(v) {
  ui.cut = !!v; world.setCutaway(ui.cut);
  document.querySelector('[data-toggle="cut"]').classList.toggle('on', ui.cut);
}
function setAuto(v) {
  ui.auto = !!v;
  if (!tween) controls.autoRotate = ui.auto;
  document.querySelector('[data-toggle="auto"]').classList.toggle('on', ui.auto);
}
function setPins(v) {
  ui.pins = !!v;
  $('pin-layer').style.display = ui.pins ? '' : 'none';
  document.querySelector('[data-toggle="pins"]').classList.toggle('on', ui.pins);
}
function setCam(name, v, opts = {}) {
  ui.cam = name;
  document.querySelectorAll('[data-view]').forEach(b => b.classList.toggle('on', b.dataset.view === name));
  if (opts.cut !== undefined) setCut(opts.cut);
  if (opts.night !== undefined) setNight(opts.night);
  flyTo(v);
}

/* ── 选中条目 ─────────────────────────────────── */
function select(id, fly = true) {
  const e = byId[id];
  if (!e) return;
  ui.id = id; ui.cat = e.cat;
  renderTabs(); renderList(); renderDetail(e); showView('detail'); renderPins();
  if (fly) flyTo({ at: e.at, d: e.d, az: e.az, el: e.el });
  setCut(!!e.cut);
  if (e.night) setNight(true);
  else if (e.day) setNight(false);
  document.querySelectorAll('[data-view]').forEach(b => b.classList.remove('on'));
}

/* ── 事件 ─────────────────────────────────────── */
function bind() {
  document.addEventListener('click', (ev) => {
    const cat = ev.target.closest('[data-cat]');
    if (cat) {
      ui.cat = cat.dataset.cat; ui.view = 'list';
      renderTabs(); renderList(); showView('list'); renderPins();
      return;
    }
    const item = ev.target.closest('[data-id]');
    if (item) { select(item.dataset.id); return; }
    const view = ev.target.closest('[data-view]');
    if (view) {
      const n = view.dataset.view;
      const opts = n === 'cutaway' ? { cut: true }
        : n === 'starry' ? { cut: false, night: true }
          : { cut: false };
      setCam(n, VIEWS[n], opts);
      return;
    }
    const tg = ev.target.closest('[data-toggle]');
    if (tg) {
      const k = tg.dataset.toggle;
      if (k === 'cut') setCut(!ui.cut);
      else if (k === 'night') setNight(!ui.night);
      else if (k === 'auto') setAuto(!ui.auto);
      else if (k === 'pins') setPins(!ui.pins);
      return;
    }
    if (ev.target.closest('#d-back')) { showView('list'); return; }
    if (ev.target.closest('#guide-close')) {
      $('guide').classList.remove('open');
      $('guide').classList.add('hidden');
      $('guide-open').classList.add('show');
      return;
    }
    if (ev.target.closest('#guide-open')) {
      $('guide').classList.remove('hidden');
      $('guide').classList.add('open');
      $('guide-open').classList.remove('show');
      return;
    }
  });

  // 点 3D 物体 → 选中对应条目
  let dx = 0, dy = 0;
  canvas.addEventListener('pointerdown', e => { dx = e.clientX; dy = e.clientY; });
  canvas.addEventListener('pointerup', e => {
    if (Math.hypot(e.clientX - dx, e.clientY - dy) > 6) return;
    const ray = new T.Raycaster();
    ray.setFromCamera(new T.Vector2(
      (e.clientX / window.innerWidth) * 2 - 1,
      -(e.clientY / window.innerHeight) * 2 + 1
    ), camera);
    const hits = ray.intersectObjects(scene.children, true);
    for (const h of hits) {
      if (!h.object.isMesh) continue;
      let o = h.object;
      while (o && !o.userData.key) o = o.parent;
      if (o && byId[o.userData.key]) { select(o.userData.key); return; }
    }
  });
  controls.addEventListener('start', () => { tween = null; });

  window.addEventListener('keydown', e => {
    const views = ['overview', 'castle', 'cutaway', 'garden', 'starry', 'under'];
    if (/^[1-6]$/.test(e.key)) {
      const n = views[+e.key - 1];
      const opts = n === 'cutaway' ? { cut: true }
        : n === 'starry' ? { cut: false, night: true }
          : { cut: false };
      setCam(n, VIEWS[n], opts);
    } else if (e.key.toLowerCase() === 'c') setCut(!ui.cut);
    else if (e.key.toLowerCase() === 'n') setNight(!ui.night);
    else if (e.key.toLowerCase() === 'r') setAuto(!ui.auto);
    else if (e.key === 'Escape') showView('list');
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      const all = ENTRIES.filter(x => x.cat === ui.cat);
      let i = all.findIndex(x => x.id === ui.id);
      if (i < 0) i = 0;
      i = (i + (e.key === 'ArrowRight' ? 1 : -1) + all.length) % all.length;
      select(all[i].id);
    }
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

/* ── 初始化 ───────────────────────────────────── */
function init() {
  renderer = new T.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = T.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = T.PCFSoftShadowMap;
  renderer.toneMapping = T.NoToneMapping;
  renderer.setClearColor(0x000000, 0);

  scene = new T.Scene();
  scene.fog = new T.FogExp2(dayFog.clone(), .0040);

  camera = new T.PerspectiveCamera(42, window.innerWidth / window.innerHeight, .5, 1000);
  camera.position.copy(viewPos(VIEWS.overview));

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = .065;
  controls.rotateSpeed = .62;
  controls.zoomSpeed = .85;
  controls.panSpeed = .7;
  controls.minDistance = 5;
  controls.maxDistance = 210;
  controls.minPolarAngle = .04;
  controls.maxPolarAngle = Math.PI * .94;
  controls.target.set(...VIEWS.overview.at);
  controls.autoRotateSpeed = .32;
  controls.update();

  hemi = new T.HemisphereLight(daySkyColor.clone(), 0xd9c4a4, 1.05);
  scene.add(hemi);
  keyLight = new T.DirectionalLight(dayKeyColor.clone(), 1.45);
  keyLight.position.copy(dayLightPos);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(2048, 2048);
  const sc = keyLight.shadow.camera;
  sc.left = -46; sc.right = 46; sc.top = 46; sc.bottom = -46; sc.near = 1; sc.far = 260;
  keyLight.shadow.bias = -.0006;
  keyLight.shadow.normalBias = .025;
  scene.add(keyLight);
  fillLight = new T.DirectionalLight(0xbdd2e2, .48);
  fillLight.position.set(60, 26, -50);
  scene.add(fillLight);
  ambient = new T.AmbientLight(0xffffff, .20);
  scene.add(ambient);

  world = buildWorld(scene);

  renderTabs(); renderList(); renderPins(); showView('list');
  setCam('overview', VIEWS.overview, { cut: false });
  tween = null;                                  // 开场不飞行，直接全景
  camera.position.copy(viewPos(VIEWS.overview));
  controls.target.set(...VIEWS.overview.at);
  controls.update();
  bind();

  setTimeout(() => $('loading').classList.add('done'), 500);
  requestAnimationFrame(loop);
}

function loop(now) {
  requestAnimationFrame(loop);
  const rawDt = Math.max(0, (now - lastTime) / 1000);
  const dt = Math.min(.1, rawDt);
  lastTime = now; elapsed += dt;

  if (tween) {
    tween.k += Math.min(.5, rawDt) / tween.dur;
    const e = ease(Math.min(1, tween.k));
    camera.position.lerpVectors(tween.p0, tween.p1, e);
    controls.target.lerpVectors(tween.t0, tween.t1, e);
    if (tween.k >= 1) { tween = null; controls.autoRotate = ui.auto; }
  }

  const n = world.update(elapsed, Math.min(.5, rawDt));

  // 天光 / 雾 / 背景随昼夜插值
  hemi.intensity = 1.05 - n * .48;
  hemi.color.copy(daySkyColor).lerp(nightSkyColor, n);
  keyLight.intensity = 1.45 - n * .86;
  keyLight.color.copy(dayKeyColor).lerp(nightKeyColor, n);
  keyLight.position.copy(dayLightPos).lerp(nightLightPos, n);
  fillLight.intensity = .48 - n * .18;
  ambient.intensity = .20 + n * .04;
  scene.fog.color.copy(dayFog).lerp(nightFog, n);
  scene.fog.density = .0040 + n * .0007;
  $('sky-night').style.opacity = n.toFixed(3);
  $('sky-day').style.opacity = (1 - n).toFixed(3);

  controls.update();
  updatePins();
  renderer.render(scene, camera);
}

try {
  init();
} catch (err) {
  console.error(err);
  const l = $('loading');
  if (l) l.innerHTML = `<div class="ld-title">场景没能点亮</div><p class="ld-note">${String(err && err.message || err)}</p>`;
}
