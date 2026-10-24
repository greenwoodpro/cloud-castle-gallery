import * as THREE from 'three';
import { OrbitControls } from '../vendor/OrbitControls.js';
import { createSky, createStars, createIsland, createWater, createClouds, createMiniPlanet, createRoad, heightAt, ISLAND_R } from './world.js';
import { buildCastle, box, cyl } from './castle.js';
import { populate } from './scenery.js';
import { makeLittlePrince, makeRose, makeFox, makePerson, makeLamplighter, makeCast } from './people.js';
import { matte, TAU, clamp, lerp, easeInOut } from './util.js';
import { fabricTexture, glowTexture } from './textures.js';

/* ================================================================
   渲染器 / 场景
   ================================================================ */
const canvas = document.getElementById('scene');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(new THREE.Color('#e8ddc8'), 0.0022);

const camera = new THREE.PerspectiveCamera(46, innerWidth / innerHeight, 0.5, 1400);
camera.position.set(86, 52, 96);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.055;
controls.minDistance = 8;
controls.maxDistance = 320;
controls.maxPolarAngle = Math.PI * 0.92;
controls.target.set(0, 6, 0);

/* ================================================================
   光照
   ================================================================ */
const sun = new THREE.DirectionalLight('#fff0cf', 2.1);
sun.position.set(70, 95, 50);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.near = 1;
sun.shadow.camera.far = 400;
const SH = 110;
sun.shadow.camera.left = -SH; sun.shadow.camera.right = SH;
sun.shadow.camera.top = SH; sun.shadow.camera.bottom = -SH;
sun.shadow.bias = -0.0006;
sun.shadow.normalBias = 0.035;
scene.add(sun);
scene.add(sun.target);

const hemi = new THREE.HemisphereLight('#cfe4f2', '#8a7a5c', 0.85);
scene.add(hemi);
const fill = new THREE.DirectionalLight('#bcd4e8', 0.5);
fill.position.set(-60, 40, -50);
scene.add(fill);
const ambient = new THREE.AmbientLight('#fff4e2', 0.28);
scene.add(ambient);

/* ================================================================
   天空 / 星 / 云
   ================================================================ */
const sky = createSky();
scene.add(sky.mesh);
const stars = createStars(1500);
scene.add(stars);
const clouds = createClouds(10);
scene.add(clouds);

// 太阳 & 月亮
const sunDisc = new THREE.Mesh(
  new THREE.SphereGeometry(7, 20, 16),
  new THREE.MeshBasicMaterial({ color: '#fff6d8' })
);
scene.add(sunDisc);
const sunGlow = new THREE.Mesh(
  new THREE.PlaneGeometry(46, 46),
  new THREE.MeshBasicMaterial({ map: glowTexture('rgba(255,244,206,1)'), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.7 })
);
scene.add(sunGlow);

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(5.2, 20, 16),
  new THREE.MeshStandardMaterial({ color: '#f6f2e4', emissive: '#dfe6f2', emissiveIntensity: 0.5, roughness: 1 })
);
scene.add(moon);
const moonGlow = new THREE.Mesh(
  new THREE.PlaneGeometry(34, 34),
  new THREE.MeshBasicMaterial({ map: glowTexture('rgba(226,236,255,1)'), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0 })
);
scene.add(moonGlow);

/* ================================================================
   浮空岛
   ================================================================ */
const island = createIsland();
scene.add(island.group);

const water = createWater();
scene.add(water.group);

/* ================================================================
   城堡
   ================================================================ */
const castle = buildCastle();
scene.add(castle.root);

/* 道路：从城门通往村庄、麦田、湖边 */
const roads = new THREE.Group();
const roadDefs = [
  [[0, 20], [0, 28], [-5, 36], [-16, 40], [-30, 36], [-38, 26]],
  [[0, 21], [5, 30], [18, 35], [30, 39], [36, 40]],
  [[-5, 36], [-18, 30], [-30, 18], [-36, 4], [-40, -14], [-41, -24]],
  [[-16, 40], [-24, 48], [-30, 56]],
  [[30, 39], [40, 48], [46, 56]],
  [[0, 20], [9, 19], [20, 20], [28, 25]],
];
roadDefs.forEach((d) => roads.add(createRoad(d, 2.4)));
scene.add(roads);

/* ================================================================
   环境（森林 / 农庄 / 羊群 / 狐狸…）
   ================================================================ */
const env = populate(scene, castle.materials);

/* ================================================================
   人物群
   ================================================================ */
const people = new THREE.Group();
people.name = 'people';
scene.add(people);

const cast = makeCast();
const by = castle.baseY;

// 小王子 —— 站在东墙垛口上，望向远方的浮空岛
const prince = makeLittlePrince();
prince.position.set(23, by + 10.6, 6.5);
prince.rotation.y = -1.2;
prince.scale.setScalar(1.05);
people.add(prince);

// 玫瑰 —— 城堡花园玻璃罩下
const rose = makeRose();
rose.position.set(8.5, by + 0.35, 8.5);
people.add(rose);
const cloche = new THREE.Mesh(
  new THREE.SphereGeometry(0.85, 20, 16, 0, TAU, 0, Math.PI / 2),
  new THREE.MeshStandardMaterial({
    color: '#dff0f2', transparent: true, opacity: 0.22, roughness: 0.05,
    metalness: 0.1, side: THREE.DoubleSide,
  })
);
cloche.position.set(8.5, by + 0.35, 8.5);
people.add(cloche);
const clocheBase = cyl(0.5, 0.58, 0.16, matte('#c8b48a'), 16, 8.5, by + 0.3, 8.5);
people.add(clocheBase);

// 狐狸 —— 在城墙外的草地上（与 scenery.js 中的狐狸为同一处，此处仅做摆位）
const fox = makeFox();
fox.position.set(12, heightAt(12, 26), 26);
fox.rotation.y = 0.6;
people.add(fox);

// 国王 —— 大厅王座
const king = cast.king;
king.position.set(0, by + 3.9, -10.7);
king.rotation.y = Math.PI;
people.add(king);

// 商人 —— 市集
const merchant = cast.merchant;
merchant.position.set(7.5, by, 11.9);
merchant.rotation.y = 0.5;
people.add(merchant);

// 农夫 —— 麦田
const farmer = cast.farmer;
farmer.position.set(24, heightAt(24, -30), -30);
farmer.rotation.y = 2.2;
people.add(farmer);

// 士兵 —— 城门
const soldier = cast.soldier;
soldier.position.set(3.2, by, 18.6);
soldier.rotation.y = 0.2;
people.add(soldier);

// 女孩 —— 井边
const girl = cast.girl;
girl.position.set(-1.8, by, 6.2);
girl.rotation.y = 1.1;
people.add(girl);

// 学者 —— 城堡平台上
const scholar = cast.scholar;
scholar.position.set(-2.6, by, 2.4);
scholar.rotation.y = 0.6;
people.add(scholar);

// 点灯人 —— 城墙巡夜
const lamplighter = makeLamplighter();
lamplighter.position.set(-20, by + 9.2, -16.5);
lamplighter.rotation.y = 1.5;
people.add(lamplighter);

// 门卫
const guard2 = makePerson({ coat: '#5a6a7a', trim: '#c0c6d0', hair: null, hat: 'hood', hatColor: '#6a7a8a', height: 1.76 });
guard2.position.set(-3.4, by, 18.6);
guard2.rotation.y = 0.2;
people.add(guard2);

// 塔顶小王子位置另放一个举着望远镜的守卫
const lookout = makePerson({ coat: '#6b5a8f', trim: '#e8dcc0', hair: '#3a2a20', hat: 'hood', hatColor: '#5a4a70', height: 1.7 });
lookout.position.set(0, by + 25.6, -5.5);
people.add(lookout);

/* 玻璃罩里的玫瑰需要放在地面上 —— 修正到庭院地面 */
rose.position.set(8.5, by + 0.0, 8.5);
cloche.position.set(8.5, by + 0.02, 8.5);
clocheBase.position.set(8.5, by + 0.08, 8.5);

/* ================================================================
   小星球 & 飞鸟
   ================================================================ */
const planets = new THREE.Group();
const planetDefs = [
  { p: [140, 62, -110], s: 1.0 },
  { p: [-190, 40, 60], s: 1.4 },
  { p: [60, 95, 190], s: 0.8 },
];
planetDefs.forEach((d, i) => {
  const mp = createMiniPlanet();
  mp.position.set(...d.p);
  mp.scale.setScalar(d.s);
  mp.userData = { base: mp.position.clone(), ph: i * 2.1, amp: 4 + i * 2 };
  planets.add(mp);
});
scene.add(planets);

// 飞鸟（简单的两片翅膀）
const birds = new THREE.Group();
const birdMat = new THREE.MeshStandardMaterial({ color: '#4a4a55', roughness: 1, side: THREE.DoubleSide });
for (let i = 0; i < 9; i++) {
  const b = new THREE.Group();
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.11, 0.34, 4, 8), birdMat);
  b.add(body);
  const wl = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.2), birdMat);
  const wr = wl.clone();
  wl.position.set(0, 0.12, 0.26); wl.rotation.x = 0.4;
  wr.position.set(0, 0.12, -0.26); wr.rotation.x = -0.4;
  b.add(wl, wr);
  b.userData = { wl, wr, r: 30 + Math.random() * 40, y: 30 + Math.random() * 26, sp: 0.12 + Math.random() * 0.1, ph: Math.random() * 10 };
  birds.add(b);
}
scene.add(birds);

/* ================================================================
   萤火虫 / 尘埃粒子
   ================================================================ */
const fireflies = (() => {
  const n = 220;
  const pos = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const a = Math.random() * TAU, r = Math.random() * 55;
    pos[i * 3] = Math.cos(a) * r;
    pos[i * 3 + 1] = 4 + Math.random() * 18;
    pos[i * 3 + 2] = Math.sin(a) * r;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const mat = new THREE.PointsMaterial({
    size: 1.4, map: glowTexture('rgba(255,240,170,1)'), color: '#ffe9a8',
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0,
  });
  const p = new THREE.Points(geo, mat);
  p.userData = { base: pos.slice() };
  scene.add(p);
  return p;
})();

/* ================================================================
   昼夜状态
   ================================================================ */
const DAY = {
  skyTop: new THREE.Color('#3d86cf'), skyMid: new THREE.Color('#9ecbe4'), skyBot: new THREE.Color('#f7e0b4'),
  sun: new THREE.Color('#fff2d2'), sunI: 2.05, hemiI: 0.95, ambI: 0.32,
  fog: new THREE.Color('#e8dcc4'), fogD: 0.0018, exposure: 1.08,
  stars: 0, firefly: 0, winGlow: 0.0, sunPos: new THREE.Vector3(70, 95, 50),
};
const NIGHT = {
  skyTop: new THREE.Color('#0e1738'), skyMid: new THREE.Color('#28365e'), skyBot: new THREE.Color('#6b5a72'),
  sun: new THREE.Color('#a8bce8'), sunI: 0.42, hemiI: 0.52, ambI: 0.22,
  fog: new THREE.Color('#2f3960'), fogD: 0.0030, exposure: 1.0,
  stars: 1, firefly: 1, winGlow: 1.6, sunPos: new THREE.Vector3(-50, 60, -60),
};

const state = {
  night: 0,          // 0 白天 → 1 夜晚
  targetNight: 0,
  cutaway: false,
  autoRotate: false,
  paused: false,
  showLabels: true,
};

function applyDayNight(k) {
  const L = (a, b) => new THREE.Color(a).lerp(b, k);
  sky.uniforms.topColor.value.copy(L(DAY.skyTop, NIGHT.skyTop));
  sky.uniforms.midColor.value.copy(L(DAY.skyMid, NIGHT.skyMid));
  sky.uniforms.botColor.value.copy(L(DAY.skyBot, NIGHT.skyBot));
  sky.uniforms.sunColor.value.copy(L(DAY.sun, NIGHT.sun));
  sky.uniforms.haze.value = lerp(1.0, 0.42, k);
  sky.uniforms.sunDir.value.copy(DAY.sunPos).lerp(NIGHT.sunPos, k).normalize();

  sun.position.copy(DAY.sunPos).lerp(NIGHT.sunPos, k);
  sun.color.copy(L(DAY.sun, NIGHT.sun));
  sun.intensity = lerp(DAY.sunI, NIGHT.sunI, k);
  hemi.intensity = lerp(DAY.hemiI, NIGHT.hemiI, k);
  hemi.color.copy(L(new THREE.Color('#cfe4f2'), new THREE.Color('#3a4a7a')));
  hemi.groundColor.copy(L(new THREE.Color('#8a7a5c'), new THREE.Color('#2a2a3a')));
  ambient.intensity = lerp(DAY.ambI, NIGHT.ambI, k);
  ambient.color.copy(L(new THREE.Color('#fff4e2'), new THREE.Color('#8fa0d0')));
  fill.intensity = lerp(0.5, 0.18, k);

  scene.fog.color.copy(L(DAY.fog, NIGHT.fog));
  scene.fog.density = lerp(DAY.fogD, NIGHT.fogD, k);
  renderer.toneMappingExposure = lerp(DAY.exposure, NIGHT.exposure, k);

  stars.material.opacity = lerp(DAY.stars, NIGHT.stars, k) * 0.95;
  fireflies.material.opacity = lerp(DAY.firefly, NIGHT.firefly, k) * 0.9;

  // 窗玻璃：按材质去重（多个窗共用同一材质实例），并做存在性防御
  const seenMats = new Set();
  castle.winGlass.forEach((g) => {
    if (!g || !g.material) return;
    if (seenMats.has(g.material)) return;
    seenMats.add(g.material);
    g.material.emissiveIntensity = lerp(DAY.winGlow, NIGHT.winGlow, k);
  });
  // 彩色玻璃单独控制：白天微亮，夜晚通亮
  (castle.stainedMats || []).forEach((m) => {
    m.emissiveIntensity = lerp(0.12, 1.5, k);
  });

  const l = lamplighter.userData.light;
  if (l) l.intensity = lerp(0, 5.5, k);
  const cl = lamplighter.userData.lamp.children[1];
  if (cl) cl.material.color.copy(L(new THREE.Color('#ffe08a'), new THREE.Color('#ffd36a')));

  // 太阳/月亮位置与可见性
  const dir = sky.uniforms.sunDir.value;
  sunDisc.position.copy(dir).multiplyScalar(360);
  sunGlow.position.copy(dir).multiplyScalar(355);
  sunGlow.lookAt(camera.position);
  const sunVis = 1 - k;
  sunDisc.material.opacity = sunVis;
  sunDisc.material.transparent = true;
  sunGlow.material.opacity = 0.7 * sunVis;
  moon.position.copy(dir).multiplyScalar(-380);
  moon.material.emissiveIntensity = 0.35 + k * 0.85;
  moonGlow.position.copy(moon.position);
  moonGlow.lookAt(camera.position);
  moonGlow.material.opacity = 0.55 * k;
  sunDisc.visible = k < 0.98;
  moon.visible = k > 0.05;
}

/* ================================================================
   剖视模式（内部构造）
   ================================================================ */
const cutState = { active: false, alpha: 1 };
function setCutaway(on) {
  state.cutaway = on;
  castle.roofs.forEach((r) => { r.userData.targetVis = on ? 0 : 1; });
  castle.cutWalls.forEach((w) => { w.userData.targetVis = on ? 0 : 1; });
  document.getElementById('btn-cutaway').classList.toggle('active', on);
  document.getElementById('cut-hint').style.opacity = on ? '1' : '0';
}

/** 统一设置一组物体的透明度 */
function fadeGroup(list, alpha, minAlpha = 0) {
  const vis = alpha > 0.02;
  list.forEach((root) => {
    root.visible = vis;
    root.traverse((o) => {
      if (o.isMesh && o.material) {
        const a = Math.max(alpha, minAlpha);
        o.material.transparent = a < 0.995;
        o.material.opacity = a;
        o.material.depthWrite = a > 0.9;
      }
    });
  });
}

function applyCutawayOpacity(a) {
  cutState.alpha = a;
  fadeGroup(castle.roofs, a);
  fadeGroup(castle.cutWalls, a);
  // 楼板保留 35% 不透明，既能分层又能看穿
  fadeGroup(castle.keepSlabs || [], a > 0.02 ? 0.35 * a + 0.05 : 1, 0.05);
}

/* ================================================================
   信息点 / 标签
   ================================================================ */
const POINTS = [
  { id: 'prince', name: '小王子', pos: [23, by + 12.0, 6.5], text: '金发的孩子站在城垛上，披着红围巾。他每天傍晚都要在这里看日落——"一天只看一次，那才是最值钱的。"' },
  { id: 'rose', name: '玫瑰', pos: [8.5, by + 1.5, 8.5], text: '玻璃罩下的那朵玫瑰。她有点矫情、爱虚荣，但正是这份"怕被风吹坏"让她成了独一无二的。' },
  { id: 'fox', name: '狐狸', pos: [12, heightAt(12, 26) + 1.2, 26], text: '"驯服就是建立联系。"狐狸蜷在城墙外的草地上，它要的是能准时回来的人。"下午四点我就在老地方。"' },
  { id: 'keep', name: '主堡（Donjon）', pos: [0, by + 30, -5.5], text: '城堡的核心，三层石砌主楼。底层地牢、中层大厅、上层寝宫与瞭望台，屋顶挂着一面蓝底金纹旗。' },
  { id: 'gate', name: '大���与吊桥', pos: [0, by + 17, 16.5], text: '双塔夹峙的拱形门洞，上方是守备室，设有铁闸门。吊桥用铁链悬起，桥下是悬空的深渊。' },
  { id: 'wall', name: '城墙与垛口', pos: [23, by + 10.6, 0], text: '环绕全堡的厚重石墙，墙高九米，墙顶步道设有雉堞。守军可在垛口间来回巡逻，抵御所有来敌。' },
  { id: 'tower', name: '角楼', pos: [23, by + 24, -16.5], text: '六座圆角塔楼，顶部覆以陶红锥顶，高约十五米。塔基外扩以增加稳定性，夜间塔顶会点起篝火。' },
  { id: 'hall', name: '大礼堂', pos: [-14.5, by + 12, 3.5], text: '西侧的长厅建筑，屋顶高挑，是宴饮与议事之所。厅内有长桌、高窗与彩色玻璃。' },
  { id: 'chapel', name: '礼拜堂', pos: [14.5, by + 14, -4], text: '东侧的小教堂，彩色玻璃窗透出紫与玫红的光。尖顶之上有一枚小小的金十字。' },
  { id: 'well', name: '水井', pos: [0, by + 4, 7.5], text: '庭院中央的石井，辘轳吊着一只木桶。日常用水与马厩的饮马都取自此处。' },
  { id: 'dungeon', name: '地牢', pos: [0, by + 2.4, -6.7], text: '主堡底层的牢房，三间铁栏隔间挂着锈链。守备在此关押犯人，也有存放旧刑具与锁链的地方。' },
  { id: 'throne', name: '王座厅', pos: [0, by + 11, -10.7], text: '大厅尽头的高台上放着王座，红色软垫、鎏金冠饰。两侧垂挂织锦挂毯，壁炉的火焰终年不熄。' },
  { id: 'chamber', name: '国王寝宫', pos: [3.5, by + 16, -4], text: '二层。四柱大床、书墙、书桌与火盆。阳光从尖拱窗斜斜照进来，正适合读一本旧地图。' },
  { id: 'roofdeck', name: '瞭望台', pos: [0, by + 23, -5.5], text: '主堡顶层，绕屋顶一周可俯瞰全岛。火盆终夜燃烧，望远镜能望见远处的小星球。' },
  { id: 'forge', name: '铁匠铺', pos: [15.5, by + 11, 6.5], text: '东侧的矮屋，烟囱冒出细烟。里面备有砧台与铁匠，城墙的活儿都在这儿修。' },
  { id: 'stable', name: '马厩', pos: [-15, by + 6, 9.5], text: '西南角的木棚茅草顶，两匹马在里面。草料堆在墙边，缰绳挂在横木上。' },
  { id: 'market', name: '市集', pos: [7.5, by + 2.6, 11.9], text: '庭院东南角的三顶摊位，商人正在数他的钱。货物从麻袋里倒出来：苹果、盐、还有来自远方的小玩意。' },
  { id: 'flock', name: '羊群', pos: [-30, heightAt(-30, 28) + 1.4, 28], text: '西侧草坡上的十一只羊，围着牧羊人。原著里的小王子也有一只羊——"我为你的羊画了画，画框上写着我的名字。"' },
  { id: 'wheat', name: '麦田', pos: [24, heightAt(24, -30) + 1.4, -30], text: '城堡南面的大片麦田，风一过就翻起金色的浪。农夫说："麦子是靠风吹才干净的。"' },
  { id: 'garden', name: '菜园', pos: [36, heightAt(36, 40) + 1, 40], text: '湖边整齐的菜畦，番茄、胡萝卜与生菜分行栽种，篱笆围成半圆。' },
  { id: 'cottage', name: '农舍', pos: [-40, heightAt(-40, -26) + 4, -26], text: '三间茅顶小屋聚在谷口，炊烟从烟囱升起。门前晾着衣服，屋后是关羊的栅栏。' },
  { id: 'windmill', name: '风车', pos: [-50, heightAt(-50, -13) + 8, -13], text: '村庄西北的风车，四片叶轮在黄昏的风里慢慢转。这是岛上唯一还在转动的东西。' },
  { id: 'lake', name: '湖泊与瀑布', pos: [36, heightAt(36, 20) + 1.2, 20], text: '岛的东侧有一汪碧水，西缘的缺口处水从崖顶倾泻而下，化成雾散在虚空里。' },
  { id: 'island', name: '浮空岛', pos: [0, -18, 0], text: '整座城堡坐在一块浮空的巨岩上。草皮之下是层层叠叠的岩体，越往下越尖，末端悬在无尽的夜空里。' },
  { id: 'planets', name: '小星球', pos: [140, 66, -110], text: '远处有几颗小小的星球在缓缓转动，其中一颗种着一棵小树和一朵玫瑰——像极了另一个 B-612。' },
  { id: 'clouds', name: '云海', pos: [-60, 62, 120], text: '絮状的白云绕着岛屿打转，有的落在山腰下缘，被风一吹又散开去。' },
];

const labelLayer = document.getElementById('labels');
const labelEls = [];
POINTS.forEach((p) => {
  const el = document.createElement('button');
  el.className = 'plabel';
  el.innerHTML = `<span class="dot"></span><span class="txt">${p.name}</span>`;
  el.addEventListener('click', (e) => { e.stopPropagation(); showInfo(p); focusPoint(p); });
  labelLayer.appendChild(el);
  labelEls.push({ el, p, v: new THREE.Vector3(...p.pos) });
});

const infoCard = document.getElementById('info');
const infoName = document.getElementById('info-name');
const infoText = document.getElementById('info-text');
const infoCardTitle = document.getElementById('info-title');
function showInfo(p) {
  infoCardTitle.textContent = '场景注释';
  infoName.textContent = p.name;
  infoText.textContent = p.text;
  infoCard.classList.add('show');
}

const v3 = new THREE.Vector3();
const _scr = [];
function updateLabels() {
  const show = state.showLabels;
  if (!show) { labelEls.forEach(({ el }) => { el.style.display = 'none'; }); return; }

  // 1) 投影 + 背面剔除
  _scr.length = 0;
  for (const { el, p, v } of labelEls) {
    v3.copy(v).project(camera);
    if (v3.z < 1 && v3.z > -1) {
      const x = (v3.x * 0.5 + 0.5) * innerWidth;
      const y = (-v3.y * 0.5 + 0.5) * innerHeight;
      if (x > -40 && x < innerWidth + 40 && y > -30 && y < innerHeight + 30) {
        const dist = camera.position.distanceTo(v);
        _scr.push({ el, p, x, y, dist });
      } else {
        el.style.display = 'none';
      }
    } else {
      el.style.display = 'none';
    }
  }

  // 2) 屏幕空间去重叠：按屏幕 Y 排序，与已显示标签间距过近的隐藏
  _scr.sort((a, b) => a.y - b.y);
  const shown = [];
  for (const s of _scr) {
    let blocked = false;
    for (const k of shown) {
      const dy = Math.abs(s.y - k.y);
      const dx = Math.abs(s.x - k.x);
      // 垂直距离小且水平也近 → 遮挡；垂直完全重合 → 必挡
      if ((dy < 30 && dx < 120) || (dy < 16 && dx < 220)) { blocked = true; break; }
    }
    if (blocked) { s.el.style.display = 'none'; continue; }
    shown.push(s);
  }

  // 3) 写回位置
  for (const s of shown) {
    s.el.style.display = 'flex';
    s.el.style.transform = `translate(-50%,-50%) translate(${s.x.toFixed(1)}px, ${s.y.toFixed(1)}px)`;
    // 远处淡出，近处不透明
    s.el.style.opacity = String(clamp(1.35 - s.dist / 210, 0.3, 1));
  }
}

/* ================================================================
   视角预设
   ================================================================ */
let camTween = null;
function tweenCamera(pos, target, dur = 1500) {
  camTween = {
    t0: performance.now(), dur,
    fromP: camera.position.clone(), toP: new THREE.Vector3(...pos),
    fromT: controls.target.clone(), toT: new THREE.Vector3(...target),
  };
}
function focusPoint(p) {
  const pos = new THREE.Vector3(...p.pos);
  const dir = camera.position.clone().sub(controls.target).normalize();
  const d = Math.max(12, Math.min(46, pos.distanceTo(controls.target) * 0.55 + 10));
  tweenCamera(pos.clone().add(dir.multiplyScalar(d)), pos.clone().add(new THREE.Vector3(0, 1.5, 0)));
}

const VIEWS = {
  overview: { pos: [86, 52, 96], target: [0, 6, 0] },
  keep: { pos: [40, 30, 40], target: [0, 14, -4] },
  gate: { pos: [12, 15, 58], target: [0, 9, 18] },
  island: { pos: [112, -6, 98], target: [0, -16, 0] },
  inside: { pos: [15, 16, 40], target: [-2, 6, 2] },
  garden: { pos: [30, 12, 34], target: [8, 3, 8] },
  lake: { pos: [64, 18, 52], target: [34, 0, 20] },
  sky: { pos: [20, 76, 128], target: [0, 18, 0] },
};
document.querySelectorAll('[data-view]').forEach((b) => {
  b.addEventListener('click', () => {
    const v = VIEWS[b.dataset.view];
    if (v) tweenCamera(v.pos, v.target);
    document.querySelectorAll('[data-view]').forEach((x) => x.classList.remove('active'));
    b.classList.add('active');
  });
});

/* ================================================================
   UI 绑定
   ================================================================ */
const btnNight = document.getElementById('btn-night');
btnNight.addEventListener('click', () => {
  state.targetNight = state.targetNight > 0.5 ? 0 : 1;
  btnNight.innerHTML = state.targetNight > 0.5
    ? '☀️ <span>白天</span>' : '🌙 <span>夜晚</span>';
  btnNight.classList.toggle('active', state.targetNight > 0.5);
});
document.getElementById('btn-cutaway').addEventListener('click', () => setCutaway(!state.cutaway));
document.getElementById('btn-rotate').addEventListener('click', (e) => {
  state.autoRotate = !state.autoRotate;
  controls.autoRotate = state.autoRotate;
  e.currentTarget.classList.toggle('active', state.autoRotate);
});
document.getElementById('btn-labels').addEventListener('click', (e) => {
  state.showLabels = !state.showLabels;
  e.currentTarget.classList.toggle('active', state.showLabels);
});
document.getElementById('info-close').addEventListener('click', () => infoCard.classList.remove('show'));
document.getElementById('panel-toggle').addEventListener('click', () => {
  document.getElementById('panel').classList.toggle('collapsed');
});
document.getElementById('btn-tour').addEventListener('click', () => {
  const keys = Object.keys(VIEWS);
  let i = 0;
  const step = () => {
    const k = keys[i % keys.length];
    const v = VIEWS[k];
    tweenCamera(v.pos, v.target, 2200);
    const label = document.querySelector(`[data-view="${k}"]`);
    if (label) { document.querySelectorAll('[data-view]').forEach((x) => x.classList.remove('active')); label.classList.add('active'); }
    i++;
    tourTimer = setTimeout(step, 4200);
  };
  window.clearTimeout(tourTimer);
  step();
});
let tourTimer = null;

addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

/* ================================================================
   动画循环
   ================================================================ */
const clock = new THREE.Clock();
let t = 0;
const tmpV = new THREE.Vector3();

function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), 0.05);
  t += dt;

  // 昼夜过渡
  if (Math.abs(state.night - state.targetNight) > 0.0005) {
    state.night += (state.targetNight - state.night) * Math.min(1, dt * 1.6);
    applyDayNight(state.night);
  }

  // 剖视透明度过渡
  const targetA = state.cutaway ? 0.06 : 1;
  if (Math.abs(cutState.alpha - targetA) > 0.002) {
    applyCutawayOpacity(cutState.alpha + (targetA - cutState.alpha) * Math.min(1, dt * 4.5));
  }

  // 相机补间
  if (camTween) {
    const k = clamp((performance.now() - camTween.t0) / camTween.dur, 0, 1);
    const e = easeInOut(k);
    camera.position.lerpVectors(camTween.fromP, camTween.toP, e);
    controls.target.lerpVectors(camTween.fromT, camTween.toT, e);
    if (k >= 1) camTween = null;
  }

  // 云漂移
  clouds.children.forEach((c) => {
    c.userData.a += c.userData.sp * dt;
    c.position.x = Math.cos(c.userData.a) * c.userData.r;
    c.position.z = Math.sin(c.userData.a) * c.userData.r;
    c.position.y = c.userData.y + Math.sin(t * 0.2 + c.userData.a) * 2;
    c.rotation.y = c.userData.a;
  });

  // 旗帜飘动
  castle.flags.forEach((f) => {
    const cloth = f.userData.cloth;
    if (!cloth) return;
    const pos = cloth.geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      pos.setZ(i, Math.sin(x * 3.2 - t * 4.5) * 0.16 * (x / 2.4 + 0.25));
    }
    pos.needsUpdate = true;
    cloth.geometry.computeVertexNormals();
  });

  // 漂浮岩块环绕
  island.floaters.children.forEach((m) => {
    const u = m.userData;
    u.a += u.sp * dt;
    m.position.x = Math.cos(u.a) * u.r;
    m.position.z = Math.sin(u.a) * u.r;
    m.position.y = u.y + Math.sin(t * 0.5 + u.a) * 1.6;
    m.rotation.y += dt * 0.3;
  });

  // 小星球漂浮
  planets.children.forEach((p) => {
    p.rotation.y += dt * 0.12;
    p.position.y = p.userData.base.y + Math.sin(t * 0.35 + p.userData.ph) * p.userData.amp * 0.3;
  });

  // 飞鸟
  birds.children.forEach((b) => {
    const u = b.userData;
    const a = u.ph + t * u.sp;
    b.position.set(Math.cos(a) * u.r, u.y + Math.sin(t * 0.6 + u.ph) * 2.4, Math.sin(a) * u.r);
    b.rotation.y = -a + Math.PI / 2;
    const flap = Math.sin(t * 9 + u.ph) * 0.6;
    u.wl.rotation.x = 0.4 + flap;
    u.wr.rotation.x = -0.4 - flap;
  });

  // 风车叶片
  if (env.windmill) env.windmill.userData.blades.rotation.z += dt * 0.55;

  // 水面 UV 滚动
  water.lake.material.map.offset.x = t * 0.012;
  water.lake.material.map.offset.y = t * 0.008;
  water.fallTex.offset.y -= dt * 0.9;

  // 萤火虫
  if (fireflies.material.opacity > 0.01) {
    const pos = fireflies.geometry.attributes.position;
    const base = fireflies.userData.base;
    for (let i = 0; i < pos.count; i++) {
      pos.setX(i, base[i * 3] + Math.sin(t * 0.6 + i) * 1.6);
      pos.setY(i, base[i * 3 + 1] + Math.sin(t * 0.9 + i * 0.7) * 1.1);
      pos.setZ(i, base[i * 3 + 2] + Math.cos(t * 0.5 + i * 1.3) * 1.6);
    }
    pos.needsUpdate = true;
  }

  // 人物小动作
  // 小王子：轻微呼吸 + 偶尔转头
  prince.rotation.y = -1.2 + Math.sin(t * 0.4) * 0.16;
  prince.position.y = by + 10.6 + Math.sin(t * 1.4) * 0.02;
  // 狐狸尾巴摆动
  if (fox.userData.tail) fox.userData.tail.rotation.y = Math.sin(t * 2.2) * 0.3;
  // 点灯人沿北墙来回
  const lp = lamplighter.position;
  lp.x = -20 + Math.sin(t * 0.12) * 6;
  lamplighter.rotation.y = Math.cos(t * 0.12) > 0 ? 1.5 : -1.5;
  // 玫瑰轻轻摇
  rose.rotation.z = Math.sin(t * 0.8) * 0.05;

  controls.update();
  updateLabels();
  renderer.render(scene, camera);
}
animate();

/* 首次进入：镜头缓入 */
camera.position.set(150, 110, 165);
tweenCamera(VIEWS.overview.pos, VIEWS.overview.target, 2600);

document.getElementById('loading').classList.add('hidden');
window.__scene = { scene, camera, renderer, controls, castle, state, setCutaway, tweenCamera, VIEWS };
