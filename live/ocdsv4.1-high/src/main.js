import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { buildMaterials, M, reg, env, clamp, lerp, smoothstep, TAU, R, groundY, label } from './core.js';
import { createSky } from './sky.js';
import { buildIsland } from './island.js';
import { buildTerrain, setEnvNight, PLAT } from './terrain.js';
import { buildCastle } from './castle.js';
import { makeFigure, Actor, addFigure, makeBeast, BeastActor } from './characters.js';
import { setNightRef } from './props.js';

const container = document.getElementById('app');
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.04;
container.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.fog = new THREE.Fog('#e3eff7', 150, 760);

const camera = new THREE.PerspectiveCamera(46, window.innerWidth / window.innerHeight, 0.4, 4000);
camera.position.set(64, 44, 86);

const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.className = 'labels';
document.body.appendChild(labelRenderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.minDistance = 1.2;
controls.maxDistance = 340;
controls.maxPolarAngle = Math.PI * 0.96;
controls.autoRotateSpeed = 0.35;
controls.target.set(0, 6, 0);

buildMaterials();
const sky = createSky(scene, renderer);
const island = buildIsland(scene);
const terrain = buildTerrain(scene);
const castle = buildCastle(scene);

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.24, 0.7, 0.9);
composer.addPass(bloom);
composer.addPass(new OutputPass());

function wallWalkers() {
  const fig = makeFigure({ coat: 'clothBlue', pants: 'ink', hat: 'helmet', collarKey: 'iron' });
  addFigure(scene, '巡墙卫兵', '沿着城墙步道走一圈，正好是一首歌的长度。', fig, { pos: [0, 0, 0] });
  const a = new Actor(fig, { speed: 1.0, u0: 0.1 });
  a.walkOn(new THREE.CatmullRomCurve3([
    new THREE.Vector3(11.5, PLAT + 4.9, 2.4),
    new THREE.Vector3(2.4, PLAT + 4.9, 11.5),
    new THREE.Vector3(-11.5, PLAT + 4.9, 2.4),
    new THREE.Vector3(-2.4, PLAT + 4.9, -11.5),
    new THREE.Vector3(11.5, PLAT + 4.9, 2.4)
  ]), { speed: 1.0 });
  return a;
}

function villagerWalkers() {
  const curve = terrain.ringCurve;
  const defs = [
    { coat: 'clothBlue', hat: 'feather', speed: 0.95, u0: 0.02, name: '赶集的村民', desc: '背着空篮子去市集，回来时篮子比人还满。' },
    { coat: 'clothRose', hat: 'straw', speed: 0.8, u0: 0.3, name: '采药的姑娘', desc: '沿路认草，袖口里藏着晒干的薰衣草。' },
    { coat: 'clothGreen', pants: 'ink', speed: 1.15, u0: 0.62, name: '信使', desc: '一天绕岛三圈，只为送一封写着"你好"的短信。' },
    { coat: 'clothPlum', hat: 'hood', speed: 0.7, u0: 0.81, name: '吟游诗人', desc: '边走边哼，把湖水、麦浪和铁匠的锤声编成同一支曲子。' },
    { coat: 'cream', pants: 'woodDark', speed: 1.3, u0: 0.47, name: '追蝴蝶的孩子', desc: '脚步比风快，帽子总是拿在手里。' }
  ];
  const out = [];
  defs.forEach((d, i) => {
    const fig = makeFigure({
      scale: d.name === '追蝴蝶的孩子' ? 0.7 : 1.0,
      coat: d.coat, pants: d.pants || 'woodDark', hat: d.hat,
      carry: i === 0, scarf: i === 1, scarfColor: '#cd8f99', broom: i === 3
    });
    addFigure(scene, d.name, d.desc, fig, { pos: [0, 0, 0] });
    const a = new Actor(fig, { speed: d.speed, u0: d.u0, armAmp: 0.3 });
    a.walkOn(curve, { u0: d.u0, speed: d.speed, back: false });
    a.curve = curve;
    out.push(a);
  });
  return out;
}

function meadowStory() {
  const x = 17.6, z = 12.6;
  const prince = makeFigure({ scale: 0.86, coat: 'clothGreen', pants: 'clothGreen', scarf: true, scarfColor: '#f2c14e', hairKey: 'hair', spikyHair: true, shoes: 'ink' });
  addFigure(scene, '小王子', '他坐在湖边，等那朵花说"其实我也喜欢你"。', prince, { pos: [x, groundY(x, z), z], ry: 2.3 });
  new Actor(prince, { mode: 'sit', bob: 0.05 });
  const fox = makeBeast({ scale: 0.95, body: 'fur', chest: 'furWhite', tail: 'bushy', tailTip: 'furWhite', ears: 'pointy', legLen: 0.3, bw: 0.2, bl: 0.44, bh: 0.24, headR: 0.15, headUp: 1.35, headF: 0.88, muzzleKey: 'furWhite', hoofKey: 'ink' });
  addFigure(scene, '狐狸', '它说：如果你驯养我，我们就会彼此需要。', fox, { pos: [x + 1.7, groundY(x + 1.7, z + 0.6), z + 0.6], ry: -1.1 });
  const fa = new BeastActor(fox, { mode: 'idle' });
  fa.setBase(groundY(x + 1.7, z + 0.6));
  const sheep = makeBeast({ scale: 0.72, body: 'wool', wool: 'wool', legKey: 'ink', legR: 0.03, legLen: 0.2, bw: 0.15, bl: 0.28, bh: 0.19, ears: 'flop', earKey: 'ink', tail: 'thin', tailKey: 'wool', headR: 0.1, muzzleKey: 'ink', headUp: 1.15, headF: 0.7 });
  addFigure(scene, '小羊', '"请给我画一只羊。"——于是盒子上真的有一只。', sheep, { pos: [x + 2.8, groundY(x + 2.8, z - 1.4), z - 1.4], ry: 0.4 });
  const sa = new BeastActor(sheep, { mode: 'idle' });
  sa.setBase(groundY(x + 2.8, z - 1.4));
  label('小王子与狐狸', new THREE.Vector3(x, 2.4, z), '湖边的午后：一个戴围巾的孩子、一只要求被驯养的狐狸，和一只装在盒子里的羊。', 'place');
}

const labelEls = [];
const labelObjs = [];
const KEEP_LABELS = ['城门与箭塔', '内院与市集', '礼拜堂', '王座大厅', '厨房与储藏', '图书室 · 观星台', '卧房 · 玫瑰', '钟楼与屋顶', '镜湖与瀑布', '葡萄梯田', '牧场与羊圈', '松林丘 · 古塔废墟', '花海草坪', '湿沼与萤火', '玫瑰园', '小王子与狐狸', '大瀑布'];
function buildLabels() {
  reg.labels.forEach((L) => {
    if (!KEEP_LABELS.includes(L.name)) return;
    const el = document.createElement('div');
    el.className = L.kind === 'floor' ? 'lbl floor' : 'lbl place';
    el.textContent = L.name;
    el.title = L.desc || '';
    const o = new CSS2DObject(el);
    o.position.copy(L.pos);
    o.center.set(0.5, 0.5);
    scene.add(o);
    labelEls.push(el);
    labelObjs.push({ el, kind: L.kind === 'floor' ? 'floor' : 'place', max: 78, p: L.pos.clone() });
  });
  reg.figures.forEach((F) => {
    const el = document.createElement('div');
    el.className = 'lbl fig';
    el.textContent = F.name;
    const o = new CSS2DObject(el);
    o.center.set(0.5, 1);
    o.position.set(0, 2.05, 0);
    F.group.add(o);
    labelEls.push(el);
    const tmp = new THREE.Vector3();
    labelObjs.push({
      el, kind: 'fig', max: 26,
      get: (v) => F.group.getWorldPosition(tmp).clone().add(new THREE.Vector3(0, 1.9, 0))
    });
  });
}
buildLabels();
const labelTmp = new THREE.Vector3();
function updateLabelVisibility() {
  const camR = Math.hypot(camera.position.x, camera.position.z);
  const inside = camR < 24 && camera.position.y > 2;
  for (const L of labelObjs) {
    const on = L.kind === 'fig' ? labelState >= 2 : labelState >= 1;
    if (!on) {
      L.el.classList.add('hide');
      continue;
    }
    const p = L.get ? L.get() : L.p;
    const d = p.distanceTo(camera.position);
    let vis = false;
    if (L.kind === 'fig') vis = d < 26;
    else if (L.kind === 'floor') vis = d < 72 && Math.abs(p.y - camera.position.y) < 4.6;
    else vis = d < 140 && !(inside && Math.hypot(p.x, p.z) > 17.5);
    L.el.classList.toggle('hide', !vis);
  }
}

villagerWalkers();
wallWalkers();
meadowStory();

const PRESETS = [
  {
    g: '总览', items: [
      ['环形全景', [64, 44, 86], [0, 7, 0]],
      ['云海之上', [10, 88, 118], [0, -8, 0]],
      ['岛底浮岩', [6, -38, 104], [0, -12, 0]],
      ['正门与阶梯', [40, 22, 62], [10, 8, 12]]
    ]
  },
  {
    g: '城堡', items: [
      ['城堡正面 · 剖切', [32, 30, 50], [0, 13, 0], 46],
      ['塔楼与城墙', [-34, 22, 34], [0, 10, 0], 40],
      ['内院与市集', [0, PLAT + 20, 26], [0, PLAT + 2, 6], 32],
      ['王座大厅', [0, PLAT + 2.7, 6.6], [0, PLAT + 1.9, -3], 44],
      ['厨房与储藏', [0, PLAT + 7.7, 6.6], [0, PLAT + 6.9, -3], 44],
      ['图书室 · 观星台', [0, PLAT + 12.7, 6.6], [0, PLAT + 11.9, -3], 44],
      ['卧房 · 玫瑰', [0, PLAT + 17.7, 6.6], [0, PLAT + 16.9, -3], 44],
      ['钟楼与屋顶', [0, PLAT + 22, 16], [0, PLAT + 21, 0], 40]
    ]
  },
  {
    g: '地形', items: [
      ['镜湖 · 瀑布', [30, 11, 36], [21, 0, 17.5]],
      ['麦田 · 风车', [41, 13, -7], [27, 2, -2]],
      ['葡萄梯田', [-37, 12, -5], [-27, 1, -1]],
      ['苹果园', [-31, 11, 27], [-21, 1, 17]],
      ['牧场 · 羊圈', [17, 9, -37], [7, 1, -26]],
      ['松林丘 · 废墟', [-8, 15, -31], [-19, 2, -19]],
      ['花海草坪', [32, 10, -5], [19, 0, -16]],
      ['湿沼与萤火', [-2, 9, -33], [-9, 0, -25]],
      ['菜园 · 狐狸洞', [-5, 8, 34], [-11, 0, 23]],
      ['玫瑰园', [19, 8, 33], [12, 1, 22]],
      ['小王子与狐狸', [25, 6, 21], [17.6, 1, 12.6]]
    ]
  }
];

let tween = null;
function flyTo(pos, target, dur = 1.7, fov = 46) {
  tween = {
    t: 0, dur,
    p0: camera.position.clone(), p1: new THREE.Vector3(pos[0], pos[1], pos[2]),
    t0: controls.target.clone(), t1: new THREE.Vector3(target[0], target[1], target[2]),
    f0: camera.fov, f1: fov
  };
}
function updateTween(dt) {
  if (!tween) return;
  tween.t += dt;
  const k = clamp(tween.t / tween.dur, 0, 1);
  const e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
  const arc = Math.sin(Math.PI * k) * 6;
  camera.position.lerpVectors(tween.p0, tween.p1, e);
  camera.position.y += arc * 0.5;
  camera.fov = lerp(tween.f0, tween.f1, e);
  camera.updateProjectionMatrix();
  controls.target.lerpVectors(tween.t0, tween.t1, e);
  if (k >= 1) tween = null;
}

const ui = document.getElementById('ui');
const cardEl = document.getElementById('card');
const clockEl = document.getElementById('clock');
function buildUI() {
  const views = document.getElementById('views');
  PRESETS.forEach((group) => {
    const h = document.createElement('div');
    h.className = 'grp';
    h.innerHTML = `<span>${group.g}</span>`;
    const row = document.createElement('div');
    row.className = 'row';
    group.items.forEach(([name, pos, target, fov]) => {
      const b = document.createElement('button');
      b.textContent = name;
      b.onclick = () => {
        flyTo(pos, target, 1.7, fov || 46);
        if (/大厅|厨房|图书室|卧房/.test(name)) setCut(true);
      };
      row.appendChild(b);
    });
    h.appendChild(row);
    views.appendChild(h);
  });
  const figs = document.getElementById('figs');
  reg.figures.forEach((F) => {
    const b = document.createElement('button');
    b.className = 'chip';
    b.textContent = F.name;
    b.onclick = () => {
      const p = new THREE.Vector3();
      F.group.getWorldPosition(p);
      if (F.view) {
        flyTo(F.view[0], F.view[1], 1.5, F.view[2] || 36);
      } else {
        const flat = new THREE.Vector3(p.x, 0, p.z);
        let dir = flat.length() > 7.5 ? flat.clone().normalize() : new THREE.Vector3(0, 0, 1);
        const camPos = p.clone().addScaledVector(new THREE.Vector3(dir.x, 0, dir.z), 4.6).add(new THREE.Vector3(0, 2.4, 0));
        flyTo([camPos.x, camPos.y, camPos.z], [p.x, p.y + 0.85, p.z], 1.5, 34);
      }
      showCard(F.name, F.desc);
    };
    figs.appendChild(b);
  });
}
function showCard(name, desc) {
  cardEl.innerHTML = `<b>${name}</b><p>${desc || ''}</p>`;
  cardEl.classList.add('on');
  clearTimeout(showCard._t);
  showCard._t = setTimeout(() => cardEl.classList.remove('on'), 7000);
}
buildUI();

const btns = {
  cut: document.getElementById('b-cut'),
  night: document.getElementById('b-night'),
  labels: document.getElementById('b-labels'),
  bloom: document.getElementById('b-bloom'),
  rotate: document.getElementById('b-rotate'),
  ui: document.getElementById('b-ui')
};
function setCut(v) {
  env.cut = v;
  reg.cutaway.forEach((o) => (o.visible = !v));
  btns.cut.classList.toggle('on', v);
}
function setLabels(state) {
  labelState = state;
  btns.labels.classList.toggle('on', state > 0);
}
let labelState = 1;
btns.cut.onclick = () => setCut(!env.cut);
btns.night.onclick = () => {
  env.time = env.night > 0.4 ? 0.4 : 0.78;
  env.auto = false;
  document.getElementById('time').value = String(env.time);
  btns.night.classList.toggle('on', env.time > 0.7);
};
btns.labels.onclick = () => setLabels((labelState + 1) % 3);
btns.bloom.onclick = () => {
  env.bloom = !env.bloom;
  btns.bloom.classList.toggle('on', env.bloom);
};
btns.rotate.onclick = () => {
  controls.autoRotate = !controls.autoRotate;
  btns.rotate.classList.toggle('on', controls.autoRotate);
};
btns.ui.onclick = () => ui.classList.toggle('fold');
document.getElementById('time').oninput = (e) => {
  env.time = parseFloat(e.target.value);
  env.auto = false;
};
document.getElementById('b-auto').onclick = (e) => {
  env.auto = !env.auto;
  e.target.classList.toggle('on', env.auto);
};
setLabels(1);
btns.bloom.classList.add('on');
setCut(true);

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let hoverT = 0;
const tooltip = document.getElementById('tip');
function pickAt(cx, cy) {
  pointer.x = (cx / window.innerWidth) * 2 - 1;
  pointer.y = -(cy / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  let best = null, bd = 1e9;
  reg.figures.forEach((F) => {
    const hits = raycaster.intersectObject(F.group, true);
    if (hits.length && hits[0].distance < bd) {
      bd = hits[0].distance;
      best = F;
    }
  });
  return best;
}
renderer.domElement.addEventListener('pointermove', (e) => {
  hoverT += 1;
  if (hoverT % 4) return;
  const F = pickAt(e.clientX, e.clientY);
  if (F) {
    tooltip.innerHTML = `<b>${F.name}</b>`;
    tooltip.style.left = e.clientX + 14 + 'px';
    tooltip.style.top = e.clientY + 10 + 'px';
    tooltip.classList.add('on');
    renderer.domElement.style.cursor = 'pointer';
  } else {
    tooltip.classList.remove('on');
    renderer.domElement.style.cursor = 'grab';
  }
});
renderer.domElement.addEventListener('pointerdown', (e) => {
  const F = pickAt(e.clientX, e.clientY);
  if (F) showCard(F.name, F.desc);
});
renderer.domElement.addEventListener('dblclick', (e) => {
  pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(scene.children, true).filter((h) => h.object.isMesh);
  if (hits.length) {
    const p = hits[0].point;
    controls.target.lerp(new THREE.Vector3(p.x, p.y, p.z), 0.7);
  }
});
window.addEventListener('keydown', (e) => {
  const k = e.key.toLowerCase();
  if (k === 'c') btns.cut.onclick();
  if (k === 'l') btns.night.onclick();
  if (k === 't') btns.labels.onclick();
  if (k === 'b') btns.bloom.onclick();
  if (k === 'a') btns.rotate.onclick();
  if (k === 'h') btns.ui.onclick();
  if (k === 'r') flyTo([64, 44, 86], [0, 7, 0]);
});
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  labelRenderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
  bloom.setSize(window.innerWidth, window.innerHeight);
});

let last = performance.now();
let acc = 0;
const clock = { t: 0 };
function frame(now) {
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;
  acc += dt;
  clock.t += dt;
  updateTween(dt);
  controls.update();
  for (let i = 0; i < reg.tickers.length; i++) reg.tickers[i](dt, clock.t);
  setNightRef(env.night);
  setEnvNight(env.night);
  const n = env.night;
  for (const e of reg.lampLights) {
    if (e.light) e.light.intensity = (e.max ?? 1.2) * ((e.interior ? 0.6 : 0.45) + (e.interior ? 0.4 : 0.55) * n) * (e.light.userData?.dim ?? 1);
    if (e.glow) e.glow.emissiveIntensity = 0.06 + 1.7 * n;
  }
  for (const m of reg.lampMats) {
    if (m && m.emissive) m.emissiveIntensity = 0.05 + 1.35 * n;
  }
  const hh = Math.floor((((env.time - 0.25) + 1) * 24 + 6) % 24);
  const mm = Math.floor((((((env.time - 0.25) + 1) * 24 + 6) % 1) * 60));
  clockEl.textContent = `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}  ${n > 0.5 ? '夜' : n > 0.15 ? '昏' : '昼'}`;
  updateLabelVisibility();
  if (env.bloom) composer.render();
  else renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
window.__oc = {
  scene, camera, renderer, controls, reg, env, flyTo, setCut,
  probe: (len = 8) => {
    const dir = new THREE.Vector3();
    camera.getWorldDirection(dir);
    const rc = new THREE.Raycaster(camera.position.clone(), dir, 0.01, len);
    rc.camera = camera;
    return rc.intersectObjects(scene.children, true).filter((h) => h.object.isMesh).slice(0, 6).map((h) => {
      const mats = Array.isArray(h.object.material) ? h.object.material : [h.object.material];
      const mi = h.face && h.face.materialIndex != null ? h.face.materialIndex : 0;
      return {
        mat: (mats[mi] || mats[0])?.name || '?',
        d: +h.distance.toFixed(2),
        p: [+h.point.x.toFixed(2), +h.point.y.toFixed(2), +h.point.z.toFixed(2)]
      };
    });
  },
  labels: () => reg.labels,
  dbg: (name) => {
    const f = reg.figures.find((x) => x.name === name);
    if (!f) return 'no figure';
    f.group.updateWorldMatrix(true, true);
    const out = [];
    const v = new THREE.Vector3();
    f.group.traverse((o) => {
      if (!o.isMesh) return;
      o.getWorldPosition(v);
      if (!o.geometry.boundingSphere) o.geometry.computeBoundingSphere();
      const mats = Array.isArray(o.material) ? o.material.map((x) => x.name).join('+') : o.material.name;
      out.push({ mat: mats.slice(0, 44), verts: o.geometry.attributes.position.count, r: +o.geometry.boundingSphere.radius.toFixed(3), p: [+v.x.toFixed(2), +v.y.toFixed(2), +v.z.toFixed(2)], vis: o.visible, fc: o.frustumCulled });
    });
    return out;
  },
  V: (x, y, z) => new THREE.Vector3(x, y, z),
  findFigure: (name) => reg.figures.find((f) => f.name === name),
  gotoFigure: (name) => {
    const f = reg.figures.find((x) => x.name === name);
    if (!f) return null;
    const p = new THREE.Vector3();
    f.group.getWorldPosition(p);
    if (f.view) {
      flyTo(f.view[0], f.view[1], 0.01, f.view[2] || 36);
      return f.view[0];
    }
    const flat = new THREE.Vector3(p.x, 0, p.z);
    const dir = flat.length() > 7.5 ? flat.clone().normalize() : new THREE.Vector3(0, 0, 1);
    const camPos = p.clone().addScaledVector(new THREE.Vector3(dir.x, 0, dir.z), 4.6).add(new THREE.Vector3(0, 2.4, 0));
    flyTo([camPos.x, camPos.y, camPos.z], [p.x, p.y + 0.85, p.z], 0.01, 34);
    return [camPos.x, camPos.y, camPos.z];
  },
  setTime: (t) => {
    env.time = t;
    document.getElementById('time').value = String(t);
  },
  presets: PRESETS,
  m: M
};
document.body.classList.add('ready');
