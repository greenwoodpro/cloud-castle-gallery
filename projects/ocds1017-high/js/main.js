import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {
  PALETTE, GROUND_Y, islandHeight, createMaterials,
} from './core.js';
import {
  createSky, createIsland, createClouds, createFloatingIslets, createVegetation,
  createPath, createPondAndWaterfall, createBridge, createGarden, createWindmill,
  createFence, createSparkles, createBirds, createBalloon, createVillage,
  createWheatField, createRuins, createHangingVines, animators,
} from './scenery.js';
import { createCastle, castleAnimators } from './castle.js';
import {
  createPrince, createFox, createRoseDome, createLamplighter, createVillager,
  createSheep, createButterfly, characterAnimators,
} from './characters.js';

const canvas = document.querySelector('#scene');
const renderer = new THREE.WebGLRenderer({
  canvas, antialias: true, powerPreference: 'high-performance',
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.02;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xe7d6d3);
scene.fog = new THREE.Fog(0xe5d2d0, 155, 330);

const camera = new THREE.PerspectiveCamera(36, window.innerWidth / window.innerHeight, 0.1, 900);
camera.position.set(90, 56, 120);

const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 7, 0);
controls.enableDamping = true;
controls.dampingFactor = 0.055;
controls.rotateSpeed = 0.55;
controls.zoomSpeed = 0.8;
controls.panSpeed = 0.7;
controls.minDistance = 12;
controls.maxDistance = 180;
controls.maxPolarAngle = Math.PI * 0.495;
controls.minPolarAngle = 0.08;
controls.screenSpacePanning = false;
controls.update();

const hemi = new THREE.HemisphereLight(0xfff2df, 0x73806b, 0.96);
scene.add(hemi);

const sun = new THREE.DirectionalLight(0xffdfb0, 3.35);
sun.position.set(-44, 62, 38);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.left = -54;
sun.shadow.camera.right = 54;
sun.shadow.camera.top = 54;
sun.shadow.camera.bottom = -54;
sun.shadow.camera.near = 1;
sun.shadow.camera.far = 180;
sun.shadow.bias = -0.00035;
sun.shadow.normalBias = 0.035;
scene.add(sun);

const fill = new THREE.DirectionalLight(0xacc8e5, 0.58);
fill.position.set(38, 26, -42);
scene.add(fill);

const rim = new THREE.DirectionalLight(0xffcfb4, 0.44);
rim.position.set(18, 12, 55);
scene.add(rim);

const ambient = new THREE.AmbientLight(0xfff4e8, 0.2);
scene.add(ambient);

const materials = createMaterials();

createSky(scene);
const island = createIsland(materials);
scene.add(island);
scene.add(createClouds());
scene.add(createFloatingIslets(materials));
scene.add(createVegetation(materials));
scene.add(createPath(materials));
scene.add(createPondAndWaterfall(materials));
scene.add(createBridge(materials));
scene.add(createGarden(materials));
scene.add(createWindmill(materials));
scene.add(createVillage(materials));
scene.add(createWheatField(materials));
scene.add(createRuins(materials));
scene.add(createHangingVines(materials));
scene.add(createFence(materials));
scene.add(createSparkles(materials));
scene.add(createBirds());
scene.add(createBalloon(materials));

const castleResult = createCastle(materials);
scene.add(castleResult.group);
const anchors = castleResult.anchors;

const gardenX = 12.2;
const gardenZ = 18.8;
const gardenY = islandHeight(gardenX, gardenZ);

const roseDome = createRoseDome();
roseDome.position.set(gardenX, gardenY + 1.62, gardenZ);
scene.add(roseDome);

const prince = createPrince();
prince.position.set(14.5, islandHeight(14.5, 17.5) + 0.05, 17.5);
prince.rotation.y = -1.05;
scene.add(prince);

const fox = createFox();
fox.position.set(12.9, islandHeight(12.9, 20.6) + 0.05, 20.6);
fox.rotation.y = 2.1;
scene.add(fox);

const lamplighter = createLamplighter();
lamplighter.position.set(-7.1, islandHeight(-7.1, 25.5) + 0.06, 25.5);
lamplighter.rotation.y = 2.3;
scene.add(lamplighter);

const villagerSpots = [
  [-21.0, 22.6, 0, 1.5],
  [-17.4, 24.6, 1, -2.1],
  [-24.5, 20.2, 3, 0.4],
];
for (const [x, z, variant, ry] of villagerSpots) {
  const v = createVillager(variant);
  v.position.set(x, islandHeight(x, z) + 0.04, z);
  v.rotation.y = ry;
  scene.add(v);
}

const sheepSpots = [
  [-14.4, 21.2, 0.6],
  [-12.4, 23.6, -1.2],
  [-16.0, 25.3, 2.5],
  [24.8, -5.4, 0.4],
  [23.1, -2.8, -1.5],
];
for (const [x, z, ry] of sheepSpots) {
  const sheep = createSheep();
  sheep.position.set(x, islandHeight(x, z) + 0.04, z);
  sheep.rotation.y = ry;
  sheep.scale.setScalar(0.85);
  scene.add(sheep);
}

for (let i = 0; i < 6; i++) {
  const b = createButterfly([0xf1c9c9, 0xf3e0a7, 0xd9c5e3][i % 3]);
  const a = i * 1.6;
  b.position.set(gardenX - 3 + Math.cos(a) * 2.4, gardenY + 1.4 + (i % 3) * 0.5, gardenZ + Math.sin(a) * 2.0);
  b.userData.phase = a;
  scene.add(b);
}

const butterflyAnchors = [];
for (let i = 0; i < 5; i++) {
  const b = createButterfly([0xf3c6c6, 0xf2dda5, 0xd6c3e5][i % 3]);
  butterflyAnchors.push({ mesh: b, phase: i * 1.3, radius: 2.2 + i * 0.45 });
  scene.add(b);
}

const views = {
  overview: {
    pos: new THREE.Vector3(41, 45, 86),
    target: new THREE.Vector3(0, 5.8, 0),
    title: '云海上的星尘城堡',
    kicker: '全景 · 浮空岛',
    text: '一座被遗忘在云层之上的小城堡。石墙沿山脊生长，蓝灰色的尖顶接住晚风；厨房的烟、图书馆的烛火和观星台未熄的灯，在暮色里一层层亮起来。',
  },
  keep: {
    pos: new THREE.Vector3(23, 23, 44),
    target: new THREE.Vector3(0, 8.6, -0.6),
    title: '被月光剖开的城堡',
    kicker: '主堡剖面 · 四层生活',
    text: '主堡向小王子敞开了一面墙。底层厨房煨着洋葱汤，二层是塞满星图与旧书的藏书室，三层卧室挂着玫瑰色的帷幔，最上层则留给望远镜和整片夜空。木梯与烛火把四层生活串成一盏灯。',
  },
  hall: {
    pos: new THREE.Vector3(-2.0, 15.2, 23.5),
    target: new THREE.Vector3(-10.4, 8.1, 5.2),
    title: '王座大厅',
    kicker: '长桌 · 炉火 · 月亮纹章',
    text: '十三米长的橡木桌铺着奶油色桌布，黄铜烛台把影子拉得很长。老国王守着壁炉与月亮纹章，面包、葡萄和热汤永远留着位置。横梁下挂着一圈蜡烛，像把一小片星空搬进了屋里。',
  },
  library: {
    pos: new THREE.Vector3(4.5, 15.2, 25),
    target: new THREE.Vector3(0, 11.8, -1.2),
    title: '藏书室',
    kicker: '旧书 · 地球仪 · 深夜灯火',
    text: '弧形书架顺着塔壁围成一圈，书脊有玫瑰红、湖水蓝和蜂蜜金。学者把放大镜压在星图上，手边那支蜡烛已经烧短了一截；地球仪在阴影里缓慢转动，替城堡记住远方的海。',
  },
  bedroom: {
    pos: new THREE.Vector3(4.5, 19.2, 25),
    target: new THREE.Vector3(0, 15.6, -2.2),
    title: '小王子的卧室',
    kicker: '四柱床 · 玫瑰 · 一封未写完的信',
    text: '四柱床的帷幔像一朵倒扣的红花，虎斑猫在床尾打盹。书桌上放着一支玫瑰、半杯凉掉的茶，还有写给远方朋友的信。窗外的星子落进来，停在墨水瓶旁边。',
  },
  observatory: {
    pos: new THREE.Vector3(24, 32, 35),
    target: new THREE.Vector3(0, 21.3, -1.0),
    title: '观星台',
    kicker: '黄铜望远镜 · 星图 · 晚风',
    text: '主堡顶端的观星台没有屋顶，只有一圈雉堞与一整片天空。黄铜望远镜指向天秤座，浑天仪在风里轻轻转动。小王子常在这里替玫瑰找一颗不会落下的星。',
  },
  chapel: {
    pos: new THREE.Vector3(33, 17, 30),
    target: new THREE.Vector3(11.0, 8.0, 5.0),
    title: '玫瑰窗礼拜堂',
    kicker: '彩窗 · 长椅 · 烛光',
    text: '侧墙被整面剖开，彩色玻璃把午后切成一块块糖纸。长椅一排排朝向祭坛，烛焰在石墙间没有风也轻轻摇。钟楼的铜钟只在云海翻涌时响，声音很远，像另一座岛的回信。',
  },
  garden: {
    pos: new THREE.Vector3(25, 10.5, 32),
    target: new THREE.Vector3(12.0, 6.2, 19.0),
    title: '玫瑰园',
    kicker: '玻璃罩 · 小王子 · 狐狸',
    text: '环形绿篱围着一座小小的玫瑰园。唯一的那朵玫瑰住在玻璃罩里，花瓣被晚霞染成蜜桃色。小王子蹲在罩子旁边，狐狸坐在他身后，尾巴扫过柔软的草，像在等一句只属于彼此的话。',
  },
  waterfall: {
    pos: new THREE.Vector3(45, 14, 62),
    target: new THREE.Vector3(20.5, -3.5, 33),
    title: '浮岛瀑布',
    kicker: '池塘 · 石桥 · 云海',
    text: '山泉在草地上绕了一个弯，汇进开满睡莲的池塘，然后从岛缘一跃而下，落进看不见底的云海。石桥、芦苇和几块会发光的浮石，是去往花园的必经之路。',
  },
  stable: {
    pos: new THREE.Vector3(-9, 10, 28),
    target: new THREE.Vector3(-22.4, 5.2, 11.2),
    title: '苹果树马厩',
    kicker: '栗色马 · 干草 · 果园',
    text: '马厩藏在果园背后，栗色马把下巴搁在木栏上，等一位口袋里装着苹果的访客。屋顶压着旧干草，风一吹，整座马厩都有一股晒过太阳的味道。',
  },
};

const labelDefs = [
  { id: 'hall', title: '王座大厅', sub: '炉火与长桌', pos: new THREE.Vector3(-13.8, 10.8, 9.2), view: 'hall', dx: -104, dy: -8 },
  { id: 'chapel', title: '玫瑰窗礼拜堂', sub: '彩窗与烛光', pos: new THREE.Vector3(11.2, 12.2, 9.6), view: 'chapel', dx: 18, dy: -4 },
  { id: 'garden', title: '玫瑰园', sub: '小王子与狐狸', pos: new THREE.Vector3(12.2, 6.4, 19.0), view: 'garden', dx: 22, dy: 26 },
  { id: 'keep', title: '主堡剖面', sub: '四层生活', pos: new THREE.Vector3(0, 16.3, 4.1), view: 'keep', dx: 34, dy: 12 },
  { id: 'observatory', title: '观星台', sub: '望远镜与星图', pos: new THREE.Vector3(0.2, 23.4, -1.8), view: 'observatory', dx: -114, dy: -44 },
  { id: 'waterfall', title: '浮岛瀑布', sub: '落进云海', pos: new THREE.Vector3(16.2, 4.0, 30.0), view: 'waterfall', dx: 22, dy: 22 },
];

const labelsEl = document.querySelector('#labels');
const labels = [];
for (const def of labelDefs) {
  const el = document.createElement('button');
  el.className = 'world-label';
  el.type = 'button';
  el.innerHTML = `<span class="label-dot"></span><span class="label-copy"><b>${def.title}</b><i>${def.sub}</i></span>`;
  el.addEventListener('click', () => focusView(def.view));
  labelsEl.appendChild(el);
  labels.push({ el, pos: def.pos, view: def.view, dx: def.dx || 0, dy: def.dy || 0 });
}

const storyEl = document.querySelector('#story');
const storyKicker = document.querySelector('#story-kicker');
const storyTitle = document.querySelector('#story-title');
const storyText = document.querySelector('#story-text');
let activeView = 'overview';

function setStory(key) {
  const v = views[key];
  if (!v) return;
  activeView = key;
  storyKicker.textContent = v.kicker;
  storyTitle.textContent = v.title;
  storyText.textContent = v.text;
  document.querySelectorAll('.view-btn').forEach((b) => {
    b.classList.toggle('active', b.dataset.view === key);
  });
  for (const label of labels) {
    label.el.classList.toggle('active', label.view === key);
  }
}

let cameraTween = null;
const clock = new THREE.Clock();

function focusView(key, duration = 1700) {
  const v = views[key];
  if (!v) return;
  setStory(key);
  cameraTween = {
    start: performance.now(),
    duration,
    fromPos: camera.position.clone(),
    fromTarget: controls.target.clone(),
    toPos: v.pos.clone(),
    toTarget: v.target.clone(),
  };
}

controls.addEventListener('start', () => {
  cameraTween = null;
});

document.querySelectorAll('.view-btn').forEach((btn) => {
  btn.addEventListener('click', () => focusView(btn.dataset.view));
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

setStory('overview');

const loader = document.querySelector('#loader');
setTimeout(() => {
  loader.classList.add('hidden');
  focusView('overview', 4200);
}, 500);

setTimeout(() => {
  renderer.shadowMap.autoUpdate = false;
  renderer.shadowMap.needsUpdate = true;
}, 1800);

window.__castle = {
  scene, renderer, camera, controls, views, focusView,
  setCamera: (pos, target) => {
    cameraTween = null;
    camera.position.set(pos[0], pos[1], pos[2]);
    controls.target.set(target[0], target[1], target[2]);
    controls.update();
  },
};

function updateLabels() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const temp = new THREE.Vector3();
  for (const label of labels) {
    if (label.view === activeView) {
      label.el.style.opacity = '0';
      label.el.style.pointerEvents = 'none';
      continue;
    }
    temp.copy(label.pos).project(camera);
    const visible = temp.z < 1 && temp.x > -1.1 && temp.x < 1.1 && temp.y > -1.05 && temp.y < 1.05;
    if (!visible) {
      label.el.style.opacity = '0';
      label.el.style.pointerEvents = 'none';
      continue;
    }
    const x = (temp.x * 0.5 + 0.5) * w + label.dx;
    const y = (-temp.y * 0.5 + 0.5) * h + label.dy;
    label.el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    const dist = camera.position.distanceTo(label.pos);
    const fade = dist > 185 ? 0 : dist > 150 ? (185 - dist) / 35 : 1;
    label.el.style.opacity = String(0.35 + fade * 0.62);
    label.el.style.pointerEvents = fade > 0.1 ? 'auto' : 'none';
  }
}

let elapsed = 0;

function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), 0.05);
  elapsed += dt;

  if (cameraTween) {
    const now = performance.now();
    const t = Math.min(1, (now - cameraTween.start) / cameraTween.duration);
    const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    camera.position.lerpVectors(cameraTween.fromPos, cameraTween.toPos, e);
    controls.target.lerpVectors(cameraTween.fromTarget, cameraTween.toTarget, e);
    if (t >= 1) cameraTween = null;
  }

  for (const fn of animators) fn(elapsed, dt);
  for (const fn of castleAnimators) fn(elapsed, dt);
  for (const fn of characterAnimators) fn(elapsed, dt);

  for (const b of butterflyAnchors) {
    const a = b.phase + elapsed * 0.25;
    b.mesh.position.set(
      10.5 + Math.cos(a) * b.radius,
      islandHeight(10.5, 18.8) + 2.3 + Math.sin(elapsed * 0.7 + b.phase) * 0.5,
      18.8 + Math.sin(a * 1.1) * b.radius,
    );
    b.mesh.rotation.y = -a + 1.4;
  }

  const princeBreathe = 1 + Math.sin(elapsed * 1.1) * 0.004;
  prince.scale.set(1.05, 1.05 * princeBreathe, 1.05);
  fox.rotation.y = 1.1 + Math.sin(elapsed * 0.45) * 0.04;

  controls.update();
  updateLabels();
  renderer.render(scene, camera);
}

animate();

window.addEventListener('keydown', (e) => {
  if (e.key === '1') focusView('overview');
  if (e.key === '2') focusView('hall');
  if (e.key === '3') focusView('keep');
  if (e.key === '4') focusView('garden');
  if (e.key === '5') focusView('observatory');
  if (e.key === '6') focusView('library');
  if (e.key === '7') focusView('bedroom');
});
