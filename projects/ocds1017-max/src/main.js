import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {
  rnd, onFrame, tickUpdaters, easeInOutCubic, glowTexture, glowSprite, LAYOUT,
} from './utils.js';
import { buildSky, SUN_DIR } from './sky.js';
import { buildIsland, terrainHeight } from './terrain.js';
import { buildCastle } from './castle.js';
import { buildInterior } from './interior.js';
import { buildCourtyard } from './courtyard.js';
import { buildNature } from './nature.js';
import { buildCharacters } from './characters.js';

const VIEWS = [
  {
    id: 'overview',
    index: 'I',
    label: '浮空岛全景',
    short: '全景',
    title: '云海之上，一座会呼吸的城堡',
    tags: ['倒悬岩岛', '十二座塔楼', '云海与草坡'],
    text:
      '整座城堡栖在一座倒悬的岩岛上。草坡向四面铺开，砂岩城墙被夕照染成蜜色，塔尖的金球接住最后一缕光。岛底层层叠叠的岩脉像一本被翻旧的书，三大瀑布从书页间垂落，落进望不到底的云海。风把玫瑰香、干草味和烤面包的暖甜一起吹上露台——这里是故事开始的地方。',
    pos: [27.5, 20.5, 36.5],
    target: [-1.5, 4.7, -2.0],
    fov: 42,
  },
  {
    id: 'throne',
    index: 'II',
    label: '橡木王座厅',
    short: '王座厅',
    title: '烛光里的大厅，国王更关心天气',
    tags: ['长桌与烛台', '壁炉', '主堡剖视'],
    cutaway: true,
    text:
      '大厅是城堡的心脏：橡木长桌从门口一直延伸到壁炉前，烛泪沿着铜烛台淌成小小的金色瀑布。北墙的挂毯绣着初升的星球与一朵玫瑰，壁炉里的火不分昼夜地讲着古老的故事。螺旋石梯贴着右墙盘旋而上，扶手被几百年的手掌磨得发亮。国王坐在三级石阶之上的橡木王座里，王冠有点歪；比起疆土，他更关心窗外的天气。',
    pos: [3.4, 7.4, 6.4],
    target: [-2.2, 5.5, -7.6],
    fov: 45,
  },
  {
    id: 'bedroom',
    index: 'III',
    label: '主堡卧房',
    short: '卧房',
    title: '星星底下，王后把云写进信里',
    tags: ['四柱床', '星象仪', '剖视视角'],
    cutaway: true,
    text:
      '沿着窄窄的螺旋石梯上到二层，是王后的卧房：四柱床的帷幔被风轻轻鼓起，床脚摆着一只旧皮箱。写字台上摊着写到一半的信，纸上只有一句“今天的云很像一群羊”。角落里的黄铜望远镜对准玫瑰园，床头挂着一串会旋转的小星星。王后喜欢在傍晚站到栏杆边，看牧羊人赶着羊群回家；她的猫睡在床尾，像一团温暖的云。',
    pos: [-0.2, 10.4, 4.4],
    target: [-2.2, 8.3, -7.2],
    fov: 42,
  },
  {
    id: 'gate',
    index: 'IV',
    label: '门楼与城墙',
    short: '城门',
    title: '半悬的闸门，和一只不讲规矩的麻雀',
    tags: ['吊桥与闸门', '守卫骑士', '蓝金旗帜'],
    text:
      '门楼是城堡唯一向世界敞开的缺口。闸门半悬，石阶被岁月磨出浅浅的凹槽；两座圆塔的雉堞之间，守卫骑士的盔甲擦得能照见云，长矛上却停着一只不在乎规矩的麻雀。城墙内侧有一条巡逻小径，孩子们把它当赛跑的跑道；外墙上还晾着一条蓝色床单，风一来，就像另一面旗。',
    pos: [15.5, 10.2, 16.5],
    target: [-1.8, 5.2, 0.2],
    fov: 38,
  },
  {
    id: 'chapel',
    index: 'V',
    label: '城堡礼拜堂',
    short: '礼拜堂',
    title: '十二把木椅，一扇把光切成糖的窗',
    tags: ['玫瑰窗', '许愿钟', '长明烛'],
    text:
      '礼拜堂藏在主堡东侧，小得只能坐下十二个人。玫瑰窗把光切成糖果一样的碎片，落在石地和旧木椅上；祭坛上点着一支永远烧不完的蜡烛，旁边放着一小瓶从云海边缘采来的露水。钟楼里那口钟只在两种时候响：日落，和有人许愿的时候。今天傍晚，它已经轻轻响过一次了。',
    pos: [-0.8, 6.0, -2.0],
    target: [2.0, 4.7, -7.3],
    fov: 46,
  },
  {
    id: 'garden',
    index: 'VI',
    label: '小王子玫瑰园',
    short: '玫瑰园',
    title: '玻璃罩下的玫瑰，和每天来两次的小王子',
    tags: ['玻璃罩玫瑰', '小王子', '狐狸与羊群'],
    text:
      '南坡的玫瑰园用白石子围出一个小小的圆。玻璃罩里那朵玫瑰每周只浇一次水，罩子上凝结的水珠会把晨光折成七种颜色。小王子每天来两次：一次在日出，一次在星星出现之前。狐狸坐在旁边的石头上，尾巴盖住爪子；羊群在更远的草坡上，把云影当成会移动的草。',
    pos: [12.6, 4.7, 15.6],
    target: [6.4, 1.8, 9.3],
    fov: 36,
  },
  {
    id: 'waterfall',
    index: 'VII',
    label: '云海瀑布',
    short: '云瀑',
    title: '水在岛缘失去依靠，落成一道银帘',
    tags: ['岛缘瀑布', '睡莲池', '浮石与鸽子'],
    text:
      '池塘在岛西侧安静得像一枚别在草地上的蓝宝石。溪水绕过芦苇与睡莲，在岛缘忽然失去依靠，化作一道银白的帘子坠入云海。水雾升起来，会在傍晚变成一小段彩虹；浮石绕着小岛慢慢打转，像不肯离开的听众。偶尔有鱼跃出水面——据说它们也在练习飞行。',
    pos: [-26.5, 6.5, 17.5],
    target: [-13.8, -2.6, 7.0],
    fov: 40,
  },
];

const els = {
  journal: document.getElementById('journal'),
  chapterIndex: document.getElementById('chapterIndex'),
  chapterTitle: document.getElementById('chapterTitle'),
  chapterTags: document.getElementById('chapterTags'),
  chapterText: document.getElementById('chapterText'),
  views: document.getElementById('views'),
  collapse: document.getElementById('collapse'),
  reopen: document.getElementById('reopen'),
  auto: document.getElementById('auto'),
  hotspots: document.getElementById('hotspots'),
  loader: document.getElementById('loader'),
  fatal: document.getElementById('fatal'),
};

let renderer, scene, camera, controls, sky, castleInfo, island;
let camTween = null;
let activeView = 'overview';
let journalOpen = true;

function showFatal(msg) {
  if (!els.fatal) return;
  els.fatal.style.display = 'flex';
  const detail = els.fatal.querySelector('.fatal-detail');
  if (detail) detail.textContent = String(msg);
  if (els.loader) els.loader.classList.add('done');
}

window.addEventListener('error', (e) => showFatal(e.message || '未知错误'));
window.addEventListener('unhandledrejection', (e) => showFatal(e.reason?.message || e.reason || '未知错误'));

function init() {
  const container = document.getElementById('app');
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0xf2d6bd, 0.0048);

  camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.4, 900);
  const start = VIEWS[0];
  camera.position.set(...start.pos);

  renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.02;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  container.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(...start.target);
  controls.enableDamping = true;
  controls.dampingFactor = 0.055;
  controls.rotateSpeed = 0.62;
  controls.zoomSpeed = 0.8;
  controls.panSpeed = 0.7;
  controls.minDistance = 2.2;
  controls.maxDistance = 105;
  controls.minPolarAngle = 0.08;
  controls.maxPolarAngle = Math.PI * 0.955;
  const still = new URLSearchParams(location.search).has('still');
  controls.autoRotate = !still;
  controls.autoRotateSpeed = 0.42;
  controls.update();

  const hemi = new THREE.HemisphereLight(0xffefd9, 0x8fa6b2, 0.72);
  scene.add(hemi);
  const ambient = new THREE.AmbientLight(0xfff3e6, 0.1);
  scene.add(ambient);

  const sun = new THREE.DirectionalLight(0xffe8c2, 1.65);
  sun.position.copy(SUN_DIR).multiplyScalar(68);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -27;
  sun.shadow.camera.right = 27;
  sun.shadow.camera.top = 27;
  sun.shadow.camera.bottom = -27;
  sun.shadow.camera.near = 5;
  sun.shadow.camera.far = 150;
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.035;
  sun.target.position.set(-2, 3, -3);
  scene.add(sun);
  scene.add(sun.target);

  const fill = new THREE.DirectionalLight(0xc4dcf0, 0.3);
  fill.position.set(-35, 24, -28);
  scene.add(fill);

  const rim = new THREE.DirectionalLight(0xffd4ae, 0.2);
  rim.position.set(-10, 14, 40);
  scene.add(rim);

  island = new THREE.Group();
  scene.add(island);
  buildIsland(island);
  castleInfo = buildCastle(island);
  buildInterior(castleInfo.keep);
  buildCourtyard(castleInfo.castle, island);
  buildNature(island);
  buildCharacters(island, castleInfo.castle, castleInfo.keep);
  const skyInfo = buildSky(scene);
  sky = skyInfo.sky;

  addSmoke(castleInfo.smokeOrigin);
  addDust();

  onFrame((t) => {
    island.position.y = Math.sin(t * 0.32) * 0.16;
    island.rotation.z = Math.sin(t * 0.21) * 0.0016;
  });

  buildUI();
  buildHotspots();
  onResize();
  window.addEventListener('resize', onResize);

  controls.addEventListener('start', () => {
    if (camTween) camTween = null;
    if (controls.autoRotate) {
      controls.autoRotate = false;
      updateAutoLabel();
    }
  });
  renderer.domElement.addEventListener('dblclick', () => {
    selectView('overview', true);
  });

  window.__castle = { scene, camera, renderer, controls, selectView, VIEWS };

  const clock = new THREE.Clock();
  let firstFrame = true;
  renderer.setAnimationLoop(() => {
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;
    tickUpdaters(t, dt);
    if (camTween) {
      camTween.t += dt / camTween.duration;
      const k = Math.min(1, camTween.t);
      const e = easeInOutCubic(k);
      camera.position.lerpVectors(camTween.fromPos, camTween.toPos, e);
      controls.target.lerpVectors(camTween.fromTarget, camTween.toTarget, e);
      camera.fov = camTween.fromFov + (camTween.toFov - camTween.fromFov) * e;
      camera.updateProjectionMatrix();
      if (k >= 1) camTween = null;
    }
    controls.update();
    if (sky) sky.position.copy(camera.position);
    updateHotspots();
    renderer.render(scene, camera);
    if (firstFrame) {
      firstFrame = false;
      setTimeout(() => els.loader.classList.add('done'), 260);
    }
  });
}

function addSmoke(origin) {
  const tex = glowTexture();
  const puffs = [];
  for (let i = 0; i < 7; i++) {
    const mat = new THREE.SpriteMaterial({
      map: tex, color: 0xd9cec4, transparent: true, opacity: 0,
      depthWrite: false, toneMapped: true,
    });
    const s = new THREE.Sprite(mat);
    s.scale.setScalar(0.4);
    origin.add(s);
    puffs.push({ sprite: s, offset: i / 7, phase: rnd(0, 6.3) });
  }
  onFrame((t) => {
    for (const p of puffs) {
      const ph = (t * 0.085 + p.offset) % 1;
      p.sprite.position.set(
        Math.sin(ph * 4.5 + p.phase) * 0.5 * ph,
        ph * 3.2,
        Math.cos(ph * 3.7 + p.phase) * 0.4 * ph
      );
      const sc = 0.35 + ph * 1.5;
      p.sprite.scale.set(sc, sc * 0.85, 1);
      p.sprite.material.opacity = Math.sin(ph * Math.PI) * 0.22;
      p.sprite.material.rotation = ph * 0.8 + p.phase;
    }
  });
}

function addDust() {
  const N = 130;
  const positions = new Float32Array(N * 3);
  const seeds = [];
  for (let i = 0; i < N; i++) {
    const a = rnd(0, Math.PI * 2);
    const r = rnd(2, 22);
    const x = Math.cos(a) * r;
    const z = Math.sin(a) * r;
    const y = rnd(-3, 16);
    positions.set([x, y, z], i * 3);
    seeds.push({ baseY: y, phase: rnd(0, 6), speed: rnd(0.1, 0.3) });
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({
    color: 0xfff2cf, size: 0.07, transparent: true, opacity: 0.55,
    depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false,
  });
  const pts = new THREE.Points(geo, mat);
  island.add(pts);
  onFrame((t) => {
    const arr = geo.attributes.position.array;
    for (let i = 0; i < N; i++) {
      const s = seeds[i];
      arr[i * 3 + 1] = s.baseY + Math.sin(t * s.speed + s.phase) * 0.8;
      arr[i * 3] += Math.sin(t * s.speed * 0.6 + s.phase) * 0.0015;
    }
    geo.attributes.position.needsUpdate = true;
  });
}

function buildUI() {
  els.views.innerHTML = '';
  for (const v of VIEWS) {
    const b = document.createElement('button');
    b.className = 'view-btn';
    b.dataset.id = v.id;
    b.innerHTML = `<span>${v.index}</span>${v.short}`;
    b.addEventListener('click', () => selectView(v.id, true));
    els.views.appendChild(b);
  }
  els.collapse.addEventListener('click', () => {
    journalOpen = false;
    els.journal.classList.add('closed');
    els.reopen.classList.add('visible');
  });
  els.reopen.addEventListener('click', () => {
    journalOpen = true;
    els.journal.classList.remove('closed');
    els.reopen.classList.remove('visible');
  });
  els.auto.addEventListener('click', () => {
    if (camTween) camTween = null;
    controls.autoRotate = !controls.autoRotate;
    updateAutoLabel();
  });
  updateAutoLabel();
  setJournal(VIEWS[0]);
}

function updateAutoLabel() {
  els.auto.innerHTML = `<span class="status-dot ${controls.autoRotate ? 'on' : ''}"></span>自动环游 · ${controls.autoRotate ? '开' : '关'}`;
}

function setJournal(v) {
  activeView = v.id;
  els.chapterIndex.textContent = v.index;
  els.chapterTitle.textContent = v.title;
  els.chapterTags.innerHTML = v.tags.map((t) => `<span>${t}</span>`).join('');
  els.chapterText.textContent = v.text;
  for (const b of els.views.querySelectorAll('.view-btn')) {
    b.classList.toggle('active', b.dataset.id === v.id);
  }
  els.chapterTitle.style.animation = 'none';
  els.chapterText.style.animation = 'none';
  void els.chapterTitle.offsetWidth;
  els.chapterTitle.style.animation = '';
  els.chapterText.style.animation = '';
}

function selectView(id, fly) {
  const v = VIEWS.find((x) => x.id === id);
  if (!v) return;
  setJournal(v);
  if (!journalOpen) {
    journalOpen = true;
    els.journal.classList.remove('closed');
    els.reopen.classList.remove('visible');
  }
  applyCutaway(!!v.cutaway);
  if (fly) {
    camTween = {
      t: 0,
      duration: 1.85,
      fromPos: camera.position.clone(),
      fromTarget: controls.target.clone(),
      toPos: new THREE.Vector3(...v.pos),
      toTarget: new THREE.Vector3(...v.target),
      fromFov: camera.fov,
      toFov: v.fov,
    };
    controls.autoRotate = false;
    updateAutoLabel();
  }
}

function applyCutaway(on) {
  if (!castleInfo?.frontShell) return;
  for (const obj of castleInfo.frontShell) obj.visible = !on;
}

const HOTSPOTS = [
  { id: 'throne', label: '王座厅', pos: [-2.0, 9.2, -4.4] },
  { id: 'gate', label: '城门', pos: [-2.0, 8.05, -1.1] },
  { id: 'garden', label: '玫瑰园', pos: [6.8, 3.0, 9.5] },
  { id: 'waterfall', label: '云瀑', pos: [-15.6, 1.1, 9.4] },
];
const hotspotItems = [];

function buildHotspots() {
  for (const h of HOTSPOTS) {
    const anchor = new THREE.Object3D();
    anchor.position.set(...h.pos);
    island.add(anchor);
    const el = document.createElement('button');
    el.className = 'hotspot';
    el.innerHTML = `<span class="dot"></span>${h.label}`;
    el.addEventListener('click', () => selectView(h.id, true));
    els.hotspots.appendChild(el);
    hotspotItems.push({ ...h, anchor, el });
  }
}

const _v = new THREE.Vector3();
function updateHotspots() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const narrow = w <= 900;
  const rightSafe = narrow ? w : (journalOpen ? w - 390 : w - 90);
  for (const item of hotspotItems) {
    item.anchor.getWorldPosition(_v);
    const dist = camera.position.distanceTo(_v);
    _v.project(camera);
    if (
      _v.z > 1 || _v.x < -1 || _v.x > 1 || _v.y < -1 || _v.y > 1 ||
      dist > 90 || narrow
    ) {
      item.el.style.opacity = 0;
      item.el.style.pointerEvents = 'none';
      continue;
    }
    const x = (_v.x * 0.5 + 0.5) * w;
    const y = (-_v.y * 0.5 + 0.5) * h;
    if (x > rightSafe - 30 || y < 80) {
      item.el.style.opacity = 0;
      item.el.style.pointerEvents = 'none';
      continue;
    }
    item.el.style.left = `${x}px`;
    item.el.style.top = `${y}px`;
    item.el.style.opacity = String(0.32 + Math.min(0.68, Math.max(0, (90 - dist) / 45)));
    item.el.style.pointerEvents = 'auto';
  }
}

function onResize() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
}

try {
  init();
} catch (err) {
  console.error(err);
  showFatal(err?.message || err);
}
