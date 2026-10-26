import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { buildCastle } from './castle.js';
import { buildLandscape } from './landscape.js';
import { buildLife } from './life.js';
import './style.css';

const $ = (s) => document.querySelector(s);
const icons = {
  sound:'<path d="m9 5-4 4H2v6h3l4 4Z"/><path d="M13 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/>',
  mute:'<path d="m9 5-4 4H2v6h3l4 4Z"/><path d="m14 9 6 6m0-6-6 6"/>',
  help:'<circle cx="12" cy="12" r="9"/><path d="M9.4 8.5a2.7 2.7 0 0 1 5.2 1c0 1.8-2.6 2.1-2.6 4M12 17h.01"/>',
  fullscreen:'<path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/>',
  sun:'<circle cx="12" cy="12" r="3.7"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',
  sunset:'<path d="M3 16h18M5 20h14M6 16a6 6 0 0 1 12 0M12 2v3M3 6l2 2m16-2-2 2"/>',
  moon:'<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"/><path d="m18 2 .7 2.3L21 5l-2.3.7L18 8l-.7-2.3L15 5l2.3-.7Z"/>',
  plus:'<path d="M5 12h14M12 5v14"/>', minus:'<path d="M5 12h14"/>',
  home:'<path d="m3 11 9-8 9 8M6 9v11h12V9m-9 11v-7h6v7"/>',
  camera:'<path d="M8 5 6 8H3v12h18V8h-3l-2-3Z"/><circle cx="12" cy="13" r="3.5"/>',
  orbit:'<ellipse cx="12" cy="12" rx="10" ry="5" transform="rotate(-35 12 12)"/><circle cx="12" cy="12" r="3"/><path d="m17 3 2 1 1 2"/>',
  castle:'<path d="M3 21V9h4v3h3V5h4v7h3V9h4v12ZM3 9V5h4v4m10 0V5h4v4m-11-4V2h4v3M10 21v-5h4v5"/>',
  house:'<path d="m2 11 10-9 10 9M5 9v12h14V9m-9 12v-7h4v7M7 11h1m8 0h1"/>',
  leaf:'<path d="M20 3C9 2 2 7 4 14c2 8 15 6 16-11ZM5 20 16 8M9 16v-5m0 5h5"/>',
  layers:'<path d="m12 3 10 6-10 6L2 9Zm-10 11 10 6 10-6M2 19l10 6 10-6" transform="translate(0 -2)"/>',
  rotate:'<path d="M20 8a8 8 0 1 0 0 8M20 3v5h-5"/>',
  pause:'<path d="M8 5v14M16 5v14"/>', close:'<path d="m6 6 12 12M18 6 6 18"/>',
};
const svg = (name) => `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[name] || icons.orbit}</svg>`;
for (const [id, icon] of Object.entries({sound:'mute','help-button':'help',fullscreen:'fullscreen','day-icon':'sun','zoom-in':'plus','zoom-out':'minus',home:'home',capture:'camera','close-journal':'close','rotate-icon':'rotate'})) $(`#${id}`).innerHTML=svg(icon);
document.querySelectorAll('[data-icon]').forEach(el=>el.innerHTML=svg(el.dataset.icon));

const places = [
  {id:'castle',title:'云端城堡',number:'01',subtitle:'石头记得风，窗户收集星光。',position:[0,11,-2],camera:[25,19,29],target:[0,5,-2],type:'城堡 · 岛屿中央',text:'奶油色的石灰岩城墙沿着岛屿的高地展开。尖塔、垛口与狭长的拱窗来自中世纪欧洲城堡的建筑语言；蓝灰色和陶红色的高屋顶，则像几顶被风轻轻吹歪的帽子。',details:[['从城门开始','穿过双塔守望的拱形门洞，是一座小庭院。低矮的石栏围住喷泉，旗帜在塔尖迎风；城墙上的女儿墙和垛口，把庭院与外面的云海分开。'],['一座有生活的城堡','城堡的下层安排宴会厅和厨房，中层收纳藏书，上层是安静的寝室。木楼梯连起楼层，壁炉、长桌、书架、床帐与地毯，让坚固的外壳里面有了温度。'],['把城堡轻轻打开','点击下方「打开城堡」，屋顶与朝向庭院的外墙会隐去。再切换到「城堡里面」，就能逐间飞近，观察家具和楼层。']]},
  {id:'village',title:'风铃村落',number:'02',subtitle:'面包的香气，比钟声醒得早。',position:[-13,3,7],camera:[-23,12,24],target:[-12,1.5,7],type:'村落 · 岛屿西南',text:'几间半木构小屋挤在石径两边。浅色灰泥填在深色木梁之间，斜屋顶下藏着小阁楼，烟囱把厨房的暖意送到风里。村落虽小，也有水井、柴堆和等人回家的灯。',details:[['沿着石径散步','弯曲的小路把城门、村舍与田野连在一起。井水供给日常生活，门前的盆栽与木栅栏，划出每户人家柔软的边界。'],['住在这里的人','面包师玛尔塔天亮前就开始揉面；园丁艾拉带着水壶照看花圃。他们并不急着抵达什么地方，今天的工作本身，就是好日子的一部分。']]},
  {id:'nature',title:'林间与溪流',number:'03',subtitle:'河流在岛的边缘，学会了飞翔。',position:[15,3,11],camera:[29,14,29],target:[13,0,9],type:'水系 · 岛屿东岸',text:'一条蓝绿色的溪流从松林旁流过，绕开草坡和卵石，穿过木桥，在浮空岛的边缘跌落成一束长长的瀑布。水汽散进云海，仿佛下一场雨正在这里开始。',details:[['从高地到云海','地面不是一块平板：草地、微微起伏的丘陵、裸露的岩缘与下方层叠的岩体，构成完整的悬浮地貌。溪岸的石块和花丛，让水流有了可以停留的边缘。'],['一片会呼吸的林地','针叶树留在较高的坡地，阔叶树伸向村落。林间有狐狸和蝴蝶，抬头还能见到盘旋的飞鸟。请把视角转到岛屿下方，看看根须与岩石怎样拥抱。']]},
  {id:'fields',title:'金色麦田',number:'04',subtitle:'风翻过麦浪，也翻过日历。',position:[10,1.5,12],camera:[20,9,25],target:[10,1,10],type:'田野 · 岛屿东南',text:'暖金色的麦田沿着缓坡铺开，木栅栏留下整齐而不生硬的边界。田边的风车慢慢转动，远处是草地上的羊群和牧羊人。这里把丰收画得很小，把午后的时间留得很长。',details:[['风车与田埂','高处的风被帆叶接住；木桥和土路连接两岸。金黄的麦穗、淡紫色的野花与蓝绿的溪流，组成岛上最温暖的一页。'],['抬头看天','这座小王国不遵循现实的地图。它是一幅以中世纪乡野为灵感的原创童话，漂浮的岩体、永远流动的水和看得见的星光，都属于它自己的想象。']]},
];
const roomInfo = {
 hall:{title:'烛光宴会厅',floor:'一层',function:'会客与共同用餐',subtitle:'长桌的尽头，总为晚到的人留着位置。',text:'宴会厅是城堡最公共的房间。厚石墙和木梁支撑起宽阔空间，长桌、座椅、暖色地毯与壁炉安排出清晰的生活中心。白天的光穿过拱窗，夜晚则由烛火接过照明。',detail:'桌边的座位面向彼此，而不是全都面向王座。节庆时，村里的面包师和牧羊人也会来这里吃饭；在这个小王国里，城堡的门一直留着。',camera:[15,10,19],position:[0,2,0]},
 library:{title:'风的藏书室',floor:'二层',function:'阅读与星图收藏',subtitle:'书页上的海，比云海还要辽阔。',text:'书架贴着房间周边排列，把中央留给阅览桌和走道。木质层板上收着颜色不同的书册；低矮的桌面和窗边的暖光，让这间房间保持安静的尺度。',detail:'守书人塞西尔收藏着从未见过的大陆、鸟类的迁徙和旧星图。通向上层的楼梯靠墙布置，楼板与木梁之间，能看到城堡内部真实的层次。',camera:[13,11,16],position:[2,5,0]},
 bedroom:{title:'星光寝室',floor:'三层',function:'休憩与远眺',subtitle:'睡着以后，梦还可以再高一点。',text:'寝室位于更安静的上层。床、枕被和床边的小柜子围合出私密的角落；高窗既带来光线，也让人在醒来的第一眼看见云。柔和的织物颜色与厚实石墙形成温暖的搭配。',detail:'这里没有金碧辉煌的装饰，只有刚刚整理好的床铺、安静的家具和一盏留给夜读的灯。塔楼在外侧守望，房间在内侧陪伴。',camera:[13,14,17],position:[0,8,-2]},
 kitchen:{title:'暖炉厨房',floor:'一层侧翼',function:'烹饪与储存',subtitle:'一个王国的温柔，常常从厨房开始。',text:'厨房靠近宴会厅，把烹饪、储物和上菜的距离缩短。炉灶、工作台、器皿与木桶让这里有了忙碌的秩序，低处的储藏容器也让食材有地方安放。',detail:'面包、浓汤和刚摘下的香草，会经过这张工作台。厚石炉墙保存热度，木梁与石板把空间分成实用而细小的区域。',camera:[15,8,17],position:[4,1.5,-2]},
};

let toastTimer;
function toast(message){ $('#toast').textContent=message;$('#toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),3000); }

let renderer;
try { renderer = new THREE.WebGLRenderer({antialias:true,alpha:true,preserveDrawingBuffer:true,powerPreference:'high-performance'}); }
catch(error){ $('#loading').innerHTML='<div class="loading-star">✧</div><p>这幅小小世界需要浏览器开启 WebGL 2。</p><span>请使用支持硬件加速的新版 Edge、Chrome 或 Safari。</span>';throw error; }
renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.8));
renderer.setSize(innerWidth,innerHeight);
renderer.shadowMap.enabled=true;
renderer.shadowMap.type=THREE.PCFSoftShadowMap;
renderer.outputColorSpace=THREE.SRGBColorSpace;
renderer.toneMapping=THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure=1.28;
$('#scene').appendChild(renderer.domElement);
const scene = new THREE.Scene();
scene.fog=new THREE.Fog(0xeeeae1,100,200);
const camera=new THREE.PerspectiveCamera(38,innerWidth/innerHeight,.15,400);
const controls=new OrbitControls(camera,renderer.domElement);
controls.enableDamping=true;controls.dampingFactor=.055;controls.minDistance=4;controls.maxDistance=230;
controls.minPolarAngle=.06;controls.maxPolarAngle=Math.PI*.83;controls.autoRotateSpeed=.24;controls.panSpeed=.65;
const mobile=()=>innerWidth<760;
const overview={camera:[54,36,58],target:[-3,1.5,0]};
const overviewPose=()=>({camera:overview.camera.map(v=>v*(mobile()?Math.max(1,.98/camera.aspect):1)),target:mobile()?[0,2,0]:overview.target});
camera.position.fromArray(overviewPose().camera);controls.target.fromArray(overviewPose().target);
const hemi=new THREE.HemisphereLight(0xf6f3e4,0x96a384,2.65);scene.add(hemi);
const sun=new THREE.DirectionalLight(0xffe8c3,3.5);sun.position.set(-24,45,25);sun.castShadow=true;
sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-36,right:36,top:40,bottom:-30,near:1,far:125});sun.shadow.normalBias=.055;sun.shadow.bias=-.00025;sun.shadow.radius=4;scene.add(sun);
const fill=new THREE.DirectionalLight(0xc4d4df,.7);fill.position.set(30,18,-25);scene.add(fill);

let landscape,castle,life;
try {landscape=buildLandscape(scene);castle=buildCastle(scene);life=buildLife(scene);}
catch(error){$('#loading').innerHTML='<div class="loading-star">✧</div><p>小王国暂时没有完成装配。</p><span>请刷新页面重试，或查看开发者控制台。</span>';throw error;}
for(const room of castle.rooms || [])if(roomInfo[room.id])roomInfo[room.id].position=room.position;

// The sky is deliberately made from geometry, keeping every asset local.
let seed=1893;
const random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
const cloudGroup=new THREE.Group();cloudGroup.name='会缓缓经过的云';scene.add(cloudGroup);
const cloudGeo=new THREE.SphereGeometry(1,12,9);
const cloudMaterials=[new THREE.MeshStandardMaterial({color:0xfffcf1,roughness:1,transparent:true,opacity:.74,depthWrite:false}),new THREE.MeshStandardMaterial({color:0xe5e8df,roughness:1,transparent:true,opacity:.5,depthWrite:false})];
const clouds=[];
for(let i=0;i<22;i++){
 const c=new THREE.Group();const angle=i/22*Math.PI*2;const radius=31+random()*26;
 c.position.set(Math.cos(angle)*radius,-8+random()*21,Math.sin(angle)*radius);c.userData.origin=c.position.clone();
 const size=1.9+random()*2.9;
 for(let j=0;j<5;j++){const b=new THREE.Mesh(cloudGeo,cloudMaterials[j%4===0?1:0]);b.scale.set(size*(.8+random()*.7),size*(.3+random()*.23),size*(.45+random()*.4));b.position.set((j-2)*size*.8,Math.sin(j*1.6)*size*.14,(random()-.5)*size*.7);c.add(b);}
 cloudGroup.add(c);clouds.push(c);
}
const satellite=new THREE.Group();satellite.position.set(-39,-2,-25);satellite.rotation.z=-.06;scene.add(satellite);
const satelliteRock=new THREE.Mesh(new THREE.ConeGeometry(4,8,7),new THREE.MeshStandardMaterial({color:0xc0baa3,roughness:1,flatShading:true}));satelliteRock.rotation.z=Math.PI;satelliteRock.position.y=-4;satellite.add(satelliteRock);
const satelliteGrass=new THREE.Mesh(new THREE.CylinderGeometry(4,3.5,.6,14),new THREE.MeshStandardMaterial({color:0xb1be94,roughness:1}));satellite.add(satelliteGrass);
const littleTree=new THREE.Mesh(new THREE.CylinderGeometry(.2,.35,2.3,6),new THREE.MeshStandardMaterial({color:0xa29277}));littleTree.position.y=1.3;satellite.add(littleTree);
const crown=new THREE.Mesh(new THREE.IcosahedronGeometry(1.7,1),new THREE.MeshStandardMaterial({color:0x9cae83,roughness:1}));crown.scale.set(1,1.35,1);crown.position.y=3.2;satellite.add(crown);
const planet=new THREE.Group();planet.position.set(29,24,-37);scene.add(planet);
const planetSphere=new THREE.Mesh(new THREE.SphereGeometry(1.6,24,16),new THREE.MeshStandardMaterial({color:0xe1c5a0,roughness:1}));planet.add(planetSphere);
const ring=new THREE.Mesh(new THREE.TorusGeometry(2.6,.035,6,64),new THREE.MeshStandardMaterial({color:0xc1aa7c}));ring.rotation.set(1.1,.25,.45);planet.add(ring);
const starPositions=[];for(let i=0;i<170;i++){const a=random()*Math.PI*2;const r=65+random()*70;starPositions.push(Math.cos(a)*r,18+random()*70,Math.sin(a)*r);}
const stars=new THREE.Points(new THREE.BufferGeometry().setAttribute('position',new THREE.Float32BufferAttribute(starPositions,3)),new THREE.PointsMaterial({color:0xffebba,size:.22,transparent:true,opacity:0,depthWrite:false}));scene.add(stars);

let flight=null;let cutaway=false;let labelsOn=true;let selectedTab='places',selectedPlace='castle',selectedRoom='hall',selectedPerson=0;
const raycaster=new THREE.Raycaster();const pointer=new THREE.Vector2();
function flyTo(pos,target,duration=1550){flight={start:performance.now(),duration,from:camera.position.clone(),to:new THREE.Vector3(...pos),fromTarget:controls.target.clone(),toTarget:new THREE.Vector3(...target)};controls.autoRotate=false;syncRotate();}
controls.addEventListener('start',()=>{flight=null;controls.autoRotate=false;syncRotate();});
function syncRotate(){ $('#auto-rotate').setAttribute('aria-pressed',String(controls.autoRotate));$('#rotate-icon').innerHTML=svg(controls.autoRotate?'pause':'rotate');$('#auto-rotate').lastElementChild.textContent=controls.autoRotate?'暂停环游':'缓缓环游';}
function setActiveView(id){document.querySelectorAll('[data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===id));}
function setCutaway(value){cutaway=value;[...new Set([...(castle.cutawayObjects||[]),...(castle.roofs||[])])].forEach(o=>o.visible=!cutaway);$('#cutaway').classList.toggle('active',value);$('#cutaway').setAttribute('aria-pressed',String(value));$('#cutaway').lastElementChild.textContent=value?'合上城堡':'打开城堡';}
function closeJournal(){$('#journal').hidden=true;document.body.classList.remove('journal-open');}
function openJournal(tab='places'){selectedTab=tab;$('#journal').hidden=false;document.body.classList.add('journal-open');document.querySelectorAll('[data-tab]').forEach(b=>b.setAttribute('aria-selected',String(b.dataset.tab===tab)));renderJournal();}
function visitPlace(id,showNotes=true){const place=places.find(p=>p.id===id);if(!place)return;selectedPlace=id;setActiveView(id==='fields'?'nature':id);if(cutaway)setCutaway(false);flyTo(place.camera,place.target);if(showNotes)openJournal('places');}
function visitRoom(id){const room=roomInfo[id];if(!room)return;setCutaway(true);selectedRoom=id;const p=room.position;flyTo([p[0]+12,p[1]+6.5,p[2]+16],[p[0],p[1],p[2]],1750);openJournal('rooms');setActiveView('castle');}
function renderJournal(){
 const content=$('#journal-content');
 if(selectedTab==='places'){
  const p=places.find(p=>p.id===selectedPlace)||places[0];
  content.innerHTML=`<div class="note-selector">${places.map(p=>`<button data-place="${p.id}" class="${p.id===selectedPlace?'selected':''}">${p.title}</button>`).join('')}</div><span class="chapter-number">CHAPTER ${p.number}</span><h2>${p.title}</h2><p class="lead">${p.subtitle}</p><p>${p.text}</p>${p.details.map(([h,t])=>`<h3>${h}</h3><p>${t}</p>`).join('')}<p class="caption">${p.type}</p><button class="visit-button" id="visit-place">向这里飞近 ↗</button>`;
  content.querySelectorAll('[data-place]').forEach(b=>b.onclick=()=>{selectedPlace=b.dataset.place;renderJournal();});
  $('#visit-place').onclick=()=>visitPlace(selectedPlace);
 }else if(selectedTab==='rooms'){
  const r=roomInfo[selectedRoom];
  content.innerHTML=`<div class="note-selector">${Object.entries(roomInfo).map(([id,r])=>`<button data-room="${id}" class="${id===selectedRoom?'selected':''}">${r.title}</button>`).join('')}</div><span class="chapter-number">INSIDE THE CASTLE</span><h2>${r.title}</h2><p class="lead">${r.subtitle}</p><div class="room-facts"><div><span>所在楼层</span><strong>${r.floor}</strong></div><div><span>房间用途</span><strong>${r.function}</strong></div></div><p>${r.text}</p><h3>房间里的小日子</h3><p>${r.detail}</p><p class="caption">剖视模式会揭开屋顶与外墙，保留楼板和室内家具。</p><button class="visit-button" id="visit-room">打开城堡，看看这里 ↗</button>`;
  content.querySelectorAll('[data-room]').forEach(b=>b.onclick=()=>{selectedRoom=b.dataset.room;renderJournal();});$('#visit-room').onclick=()=>visitRoom(selectedRoom);
 }else{
  const people=life.characters||[];const p=people[selectedPerson]||people[0];if(!p){content.innerHTML='<p>居民们正在回家的路上。</p>';return;}
  content.innerHTML=`<div class="note-selector">${people.map((p,i)=>`<button data-person="${i}" class="${i===selectedPerson?'selected':''}">${p.name}</button>`).join('')}</div><span class="chapter-number">PEOPLE OF THE CLOUDS</span><h2>${p.name}</h2><p class="lead">${p.role}</p><p>${p.description}</p><h3>在小小王国里遇见</h3><p>他们有的留在窗边，有的走在田埂上。转动视角，留意小小的帽子、围巾、工具和脚边的伙伴。点击场景里的居民，也可以翻开他们的这一页。</p><p class="caption">原创童话人物 · ${selectedPerson+1} / ${people.length}</p><button class="visit-button" id="visit-person">去和 ${p.name} 打个招呼 ↗</button>`;
  content.querySelectorAll('[data-person]').forEach(b=>b.onclick=()=>{selectedPerson=Number(b.dataset.person);renderJournal();});$('#visit-person').onclick=()=>{const pos=p.position;if(pos[1]>3)setCutaway(true);flyTo([pos[0]+6,pos[1]+4,pos[2]+8],[pos[0],pos[1]+.7,pos[2]],1500);};
 }
 content.scrollTop=0;
}
document.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>openJournal(b.dataset.tab));
$('#close-journal').onclick=closeJournal;$('#explore').onclick=()=>openJournal('places');
document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>{if(b.dataset.view==='overview'){setActiveView('overview');closeJournal();setCutaway(false);flyTo(overviewPose().camera,overviewPose().target);}else visitPlace(b.dataset.view);});
$('#cutaway').onclick=()=>{setCutaway(!cutaway);if(cutaway){setActiveView('castle');openJournal('rooms');flyTo([24,20,29],[0,4,-2]);toast('屋顶已经打开，选择一个房间走近看看。');}else toast('城堡又披上了它的屋顶。');};
$('#home').onclick=()=>{$('[data-view="overview"]').click();toast('回到云端，重新出发。');};
for(const [id,scale] of [['zoom-in',.8],['zoom-out',1.25]])$(`#${id}`).onclick=()=>{const delta=camera.position.clone().sub(controls.target).multiplyScalar(scale);const dist=delta.length();if(dist<controls.minDistance)delta.setLength(controls.minDistance);if(dist>controls.maxDistance)delta.setLength(controls.maxDistance);flyTo(delta.add(controls.target).toArray(),controls.target.toArray(),450);};
$('#auto-rotate').onclick=()=>{flight=null;controls.autoRotate=!controls.autoRotate;syncRotate();};
$('#labels').onclick=()=>{labelsOn=!labelsOn;$('#labels').setAttribute('aria-pressed',String(labelsOn));$('#labels .toggle').classList.toggle('on',labelsOn);$('#landmark-labels').style.display=labelsOn?'':'none';};
$('#help-button').onclick=()=>$('#help').showModal();$('#close-help').onclick=()=>$('#help').close();$('#start-exploring').onclick=()=>$('#help').close();
$('#help').addEventListener('click',e=>{if(e.target===$('#help')){const r=$('#help').getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)$('#help').close();}});
async function fullscreen(){try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch{toast('当前预览不支持全屏，可在独立浏览器中打开。');}}
$('#fullscreen').onclick=fullscreen;
window.addEventListener('keydown',e=>{if(e.target.matches('button,input,textarea')||$('#help').open)return;if(e.key==='Escape')closeJournal();if(e.code==='Space'){e.preventDefault();$('#auto-rotate').click();}if(e.key.toLowerCase()==='f')fullscreen();});

const labelNodes=places.map(p=>{const el=document.createElement('button');el.className='landmark';el.setAttribute('aria-label',`探索${p.title}`);el.innerHTML=`<span class="label-text">${p.title}</span><span class="stem"></span><span class="dot"></span>`;el.onclick=()=>visitPlace(p.id);$('#landmark-labels').appendChild(el);return {el,position:new THREE.Vector3(...p.position),projected:new THREE.Vector3()};});
$('#landmark-labels').removeAttribute('aria-hidden');
let pointerStart=null;
renderer.domElement.addEventListener('pointerdown',e=>{pointerStart=[e.clientX,e.clientY];});
renderer.domElement.addEventListener('pointerup',e=>{
 if(!pointerStart||Math.hypot(e.clientX-pointerStart[0],e.clientY-pointerStart[1])>5)return;
 pointer.set(e.clientX/innerWidth*2-1,-e.clientY/innerHeight*2+1);raycaster.setFromCamera(pointer,camera);
 const hits=raycaster.intersectObjects([castle.group,landscape.group,life.group],true).filter(h=>h.object.visible&&h.object.material?.visible!==false&&(()=>{let p=h.object.parent;while(p){if(!p.visible)return false;p=p.parent;}return true;})());let chosen;
 if(hits.length){let o=hits[0].object;while(o){if(o.userData.characterId){chosen=o.userData.characterId;break;}o=o.parent;}}
 if(chosen){const index=life.characters.findIndex(p=>p.id===chosen);if(index>=0){selectedPerson=index;openJournal('people');}}
});

const moods=[
 {label:'暖午',icon:'sun',bg:'#eeeae1',sky:0xf6f3e4,ground:0x96a384,sun:0xffe8c3,sunPower:3.5,hemiPower:2.65,exposure:1.28,star:0},
 {label:'黄昏',icon:'sunset',bg:'#e6cfbe',sky:0xf4d4bc,ground:0x9c8e96,sun:0xffbf87,sunPower:2.7,hemiPower:1.9,exposure:1.22,star:.12},
 {label:'星夜',icon:'moon',bg:'#354956',sky:0x91a8c3,ground:0x4e5e68,sun:0xc3daee,sunPower:.7,hemiPower:.95,exposure:1.05,star:.95},
];
let moodIndex=0;let moodTransition=null;const bg=new THREE.Color(moods[0].bg);
scene.background=bg;
$('#daytime').onclick=()=>{moodIndex=(moodIndex+1)%moods.length;const m=moods[moodIndex];$('#day-label').textContent=m.label;$('#day-icon').innerHTML=svg(m.icon);document.body.classList.toggle('night',moodIndex===2);moodTransition={start:performance.now(),fromBg:bg.clone(),fromSky:hemi.color.clone(),fromGround:hemi.groundColor.clone(),fromSun:sun.color.clone(),fromSP:sun.intensity,fromHP:hemi.intensity,fromExposure:renderer.toneMappingExposure,fromStar:stars.material.opacity,to:m};};

let audio=null;
async function toggleSound(){
 if(!audio){
  const ctx=new (window.AudioContext||window.webkitAudioContext)();const master=ctx.createGain();master.gain.value=.1;master.connect(ctx.destination);
  const buffer=ctx.createBuffer(1,ctx.sampleRate*3,ctx.sampleRate);const data=buffer.getChannelData(0);let last=0;for(let i=0;i<data.length;i++){last=(last+(Math.random()*2-1)*.025)/1.025;data[i]=last;}
  const noise=ctx.createBufferSource();noise.buffer=buffer;noise.loop=true;const filter=ctx.createBiquadFilter();filter.type='lowpass';filter.frequency.value=550;noise.connect(filter);filter.connect(master);noise.start();
  const chime=()=>{if(ctx.state!=='running')return;const frequencies=[261.63,293.66,329.63,392,440,523.25];const t=ctx.currentTime;const osc=ctx.createOscillator();const gain=ctx.createGain();osc.type='sine';osc.frequency.value=frequencies[Math.floor(Math.random()*frequencies.length)];gain.gain.setValueAtTime(0,t);gain.gain.linearRampToValueAtTime(.12,t+.08);gain.gain.exponentialRampToValueAtTime(.0001,t+3.6);osc.connect(gain);gain.connect(master);osc.start(t);osc.stop(t+4);};
  audio={ctx,master,timer:setInterval(chime,3500),on:true};await ctx.resume();chime();
 }else{audio.on=!audio.on;if(audio.on)await audio.ctx.resume();else await audio.ctx.suspend();}
 $('#sound').innerHTML=svg(audio.on?'sound':'mute');$('#sound').setAttribute('aria-pressed',String(audio.on));$('#sound').setAttribute('aria-label',audio.on?'关闭环境音':'开启环境音');$('#sound').title=audio.on?'关闭环境音':'开启环境音';toast(audio.on?'风声和远处的风铃，正在轻轻响。':'让小王国安静一会儿。');
}
$('#sound').onclick=()=>toggleSound().catch(()=>toast('当前浏览器暂时无法播放环境音。'));
document.addEventListener('visibilitychange',()=>{if(audio?.on){if(document.hidden)audio.ctx.suspend();else audio.ctx.resume();}});

$('#capture').onclick=()=>{
 try{
  renderer.render(scene,camera);const image=document.createElement('canvas');image.width=renderer.domElement.width;image.height=renderer.domElement.height;const ctx=image.getContext('2d');ctx.drawImage(renderer.domElement,0,0);
  const w=image.width,h=image.height;ctx.fillStyle=moodIndex===2?'#e2e0c9':'#52634b';ctx.font=`${Math.round(w*.022)}px "Noto Serif SC", "SimSun", serif`;ctx.fillText('云端城堡 · 风住的地方',w*.045,h*.09);ctx.font=`${Math.round(w*.008)}px Georgia`;ctx.fillText('LETTERS FROM ABOVE  /  A LITTLE KINGDOM IN THE SKY',w*.046,h*.12);
  image.toBlob(blob=>{if(!blob){toast('明信片暂时没有保存成功，请再试一次。');return;}const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`云端城堡-${moods[moodIndex].label}.png`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),10000);toast('一张来自云端的明信片，已为你保存。');},'image/png');
 }catch{toast('明信片暂时没有保存成功，请再试一次。');}
};

window.addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);});
const startTime=performance.now();let previous=performance.now();let frame=0;
function animate(now){
 requestAnimationFrame(animate);if(document.hidden)return;
 const t=(now-startTime)/1000;const delta=Math.min((now-previous)/1000,.05);previous=now;
 if(flight){const v=Math.min(1,(now-flight.start)/flight.duration);const ease=v<.5?4*v*v*v:1-Math.pow(-2*v+2,3)/2;camera.position.lerpVectors(flight.from,flight.to,ease);controls.target.lerpVectors(flight.fromTarget,flight.toTarget,ease);if(v===1)flight=null;}
 controls.update(delta);landscape.update?.(t);castle.update?.(t);life.update?.(t);
 clouds.forEach((c,i)=>{c.position.x=c.userData.origin.x+Math.sin(t*.025+i)*1.8;c.position.y=c.userData.origin.y+Math.sin(t*.09+i)*.25;});
 satellite.position.y=-2+Math.sin(t*.16)*.4;planet.rotation.y=t*.03;
 if(moodTransition){const m=moodTransition;const a=THREE.MathUtils.smoothstep((now-m.start)/1800,0,1);bg.lerpColors(m.fromBg,new THREE.Color(m.to.bg),a);hemi.color.lerpColors(m.fromSky,new THREE.Color(m.to.sky),a);hemi.groundColor.lerpColors(m.fromGround,new THREE.Color(m.to.ground),a);sun.color.lerpColors(m.fromSun,new THREE.Color(m.to.sun),a);sun.intensity=THREE.MathUtils.lerp(m.fromSP,m.to.sunPower,a);hemi.intensity=THREE.MathUtils.lerp(m.fromHP,m.to.hemiPower,a);renderer.toneMappingExposure=THREE.MathUtils.lerp(m.fromExposure,m.to.exposure,a);stars.material.opacity=THREE.MathUtils.lerp(m.fromStar,m.to.star,a);scene.fog.color.copy(bg);if(a===1)moodTransition=null;}
 if(labelsOn&&frame%2===0){const occupied=[];for(const l of labelNodes){l.projected.copy(l.position).project(camera);const x=(l.projected.x*.5+.5)*innerWidth,y=(-l.projected.y*.5+.5)*innerHeight;const hidden=l.projected.z>1||l.projected.z<0||x<25||x>innerWidth-85||y<85||y>innerHeight-135||camera.position.distanceTo(l.position)<9||(!$('#journal').hidden&&x<395)||occupied.some(p=>Math.abs(p.x-x)<110&&Math.abs(p.y-y)<34);if(!hidden)occupied.push({x,y});l.el.style.opacity=hidden?'0':'1';l.el.style.pointerEvents=hidden?'none':'auto';l.el.style.transform=`translate(${x}px,${y}px) translate(-50%,-100%)`;}}
 $('#compass-arrow').style.transform=`rotate(${-Math.atan2(camera.position.x-controls.target.x,camera.position.z-controls.target.z)*180/Math.PI}deg)`;
 renderer.render(scene,camera);frame++;
 if(frame===3){$('#loading').classList.add('loaded');setTimeout(()=>$('#loading').remove(),1000);document.documentElement.dataset.sceneReady='true';}
}
requestAnimationFrame(animate);
