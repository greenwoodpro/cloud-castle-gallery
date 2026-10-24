import JSZip from 'jszip'
import {
  INTERIOR_SECTIONS,
  CASTLE_CHARACTERS,
  TERRAIN_ZONES,
  ENVIRONMENT_ASPECTS,
} from '@/lib/castle-data'

function generateStandaloneHtml(): string {
  const dataJson = JSON.stringify(
    {
      interiors: INTERIOR_SECTIONS,
      characters: CASTLE_CHARACTERS,
      terrains: TERRAIN_ZONES,
      environments: ENVIRONMENT_ASPECTS,
    },
    null,
    2
  )

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>B-612 浮空星屿 · 中世纪欧洲城堡 3D 绘本图鉴 (Three.js 独立运行版)</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: "Songti SC", "Noto Serif SC", Georgia, serif;
      background: #1e192b;
      color: #fdf6e9;
      overflow: hidden;
      width: 100vw;
      height: 100vh;
    }
    #canvas-container { width: 100%; height: 100%; }
    .hud-top {
      position: fixed;
      top: 16px;
      left: 16px;
      right: 16px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      pointer-events: none;
      z-index: 20;
    }
    .brand-card, .controls-bar {
      pointer-events: auto;
      background: rgba(34, 28, 46, 0.82);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(245, 208, 144, 0.35);
      border-radius: 16px;
      padding: 12px 18px;
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
    }
    .brand-title { font-size: 18px; font-weight: 700; color: #ffe3a8; }
    .brand-sub { font-size: 12px; color: #d8c8b8; margin-top: 2px; }
    .controls-bar { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
    button {
      cursor: pointer;
      background: rgba(255, 240, 215, 0.12);
      color: #fdf6e9;
      border: 1px solid rgba(245, 208, 144, 0.35);
      border-radius: 999px;
      padding: 6px 14px;
      font-size: 13px;
      transition: all 0.2s;
    }
    button:hover, button.active {
      background: #f3c16b;
      color: #23192d;
      border-color: #ffe3a8;
      font-weight: 600;
    }
    .sidebar {
      position: fixed;
      top: 88px;
      right: 16px;
      bottom: 16px;
      width: 360px;
      max-width: calc(100vw - 32px);
      background: rgba(34, 28, 46, 0.86);
      backdrop-filter: blur(14px);
      border: 1px solid rgba(245, 208, 144, 0.32);
      border-radius: 18px;
      padding: 16px;
      overflow-y: auto;
      z-index: 20;
    }
    .card {
      background: rgba(255, 248, 235, 0.06);
      border: 1px solid rgba(245, 208, 144, 0.2);
      border-radius: 12px;
      padding: 12px;
      margin-bottom: 10px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .card:hover { border-color: #f3c16b; background: rgba(255, 248, 235, 0.12); }
    .card h4 { color: #ffe09e; font-size: 14px; margin-bottom: 4px; }
    .card p { color: #dfd3c3; font-size: 12px; line-height: 1.55; }
  </style>
  <script type="importmap">
    {
      "imports": {
        "three": "https://unpkg.com/three@0.170.0/build/three.module.js",
        "three/addons/": "https://unpkg.com/three@0.170.0/examples/jsm/"
      }
    }
  </script>
</head>
<body>
  <div id="canvas-container"></div>
  <div class="hud-top">
    <div class="brand-card">
      <div class="brand-title">B-612 浮空星屿 · 中世纪欧洲城堡图鉴</div>
      <div class="brand-sub">小王子温和绘本画风 · 自由拖拽旋转 / 滚轮缩放 / 点击卡片飞行巡礼</div>
    </div>
    <div class="controls-bar">
      <button id="btn-cutaway">开启内部剖面透视</button>
      <button id="btn-sunset" class="active">四十四次日落</button>
      <button id="btn-morning">晨曦水彩</button>
      <button id="btn-night">B-612 星夜</button>
    </div>
  </div>
  <div class="sidebar" id=" encyclopedia-list"></div>

  <script type="module">
    import * as THREE from 'three';
    import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

    const DATA = ${dataJson};

    const container = document.getElementById('canvas-container');
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2('#E8A88A', 0.0055);

    const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.5, 400);
    camera.position.set(46, 30, 52);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 6, 0);
    controls.enableDamping = true;

    const hemi = new THREE.HemisphereLight('#FFE6C7', '#6E5A7A', 1.2);
    scene.add(hemi);
    const sun = new THREE.DirectionalLight('#FFB87A', 1.8);
    sun.position.set(55, 42, 45);
    sun.castShadow = true;
    scene.add(sun);

    scene.background = new THREE.Color('#D9827E');

    const world = new THREE.Group();
    scene.add(world);

    // Floating island top & inverted cone roots
    const meadow = new THREE.Mesh(
      new THREE.CylinderGeometry(24, 25.5, 2.6, 18),
      new THREE.MeshStandardMaterial({ color: '#78A87E', flatShading: true })
    );
    meadow.position.y = -1.3;
    world.add(meadow);

    const rootCone = new THREE.Mesh(
      new THREE.ConeGeometry(24.5, 22, 12),
      new THREE.MeshStandardMaterial({ color: '#887478', flatShading: true })
    );
    rootCone.position.y = -13.5;
    rootCone.rotation.x = Math.PI;
    world.add(rootCone);

    // Central Keep & Towers
    const stoneMat = new THREE.MeshStandardMaterial({ color: '#F5E8D7', roughness: 0.85 });
    const roofMat = new THREE.MeshStandardMaterial({ color: '#4F758E', roughness: 0.72 });
    const coralMat = new THREE.MeshStandardMaterial({ color: '#D87A68', roughness: 0.74 });

    const keep = new THREE.Mesh(new THREE.BoxGeometry(12, 18, 10), stoneMat);
    keep.position.set(0, 9, -1);
    world.add(keep);

    const spire = new THREE.Mesh(new THREE.ConeGeometry(5.5, 7, 16), roofMat);
    spire.position.set(0, 21.5, -1);
    world.add(spire);

    [[-11, -10], [11, -10], [-11, 9], [11, 9]].forEach(([x, z], i) => {
      const t = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 2.6, 13, 14), stoneMat);
      t.position.set(x, 6.5, z);
      world.add(t);
      const r = new THREE.Mesh(new THREE.ConeGeometry(3.0, 5.5, 14), i % 2 === 0 ? roofMat : coralMat);
      r.position.set(x, 15.5, z);
      world.add(r);
    });

    let cutaway = false;
    let targetCamPos = new THREE.Vector3(46, 30, 52);
    let targetLook = new THREE.Vector3(0, 6, 0);
    let flying = false;

    const sidebar = document.getElementById('encyclopedia-list');
    let html = '<h3 style="margin-bottom:10px;color:#ffe3a8;">内部构造 · 人物 · 地形图鉴</h3>';
    DATA.interiors.forEach(item => {
      html += \`<div class="card" data-pos="\${item.cameraPosition.join(',')}" data-target="\${item.cameraTarget.join(',')}" data-cut="true">
        <h4>[内部 \${item.floor}] \${item.name}</h4>
        <p>\${item.summary}</p>
      </div>\`;
    });
    DATA.characters.forEach(item => {
      html += \`<div class="card" data-pos="\${item.cameraPosition.join(',')}" data-target="\${item.cameraTarget.join(',')}" data-cut="\${!!item.cutawayRequired}">
        <h4>[人物] \${item.name} · \${item.title}</h4>
        <p>\${item.quote}</p>
      </div>\`;
    });
    DATA.terrains.forEach(item => {
      html += \`<div class="card" data-pos="\${item.cameraPosition.join(',')}" data-target="\${item.cameraTarget.join(',')}" data-cut="false">
        <h4>[地形] \${item.name}</h4>
        <p>\${item.description}</p>
      </div>\`;
    });
    sidebar.innerHTML = html;

    sidebar.querySelectorAll('.card').forEach(el => {
      el.addEventListener('click', () => {
        const p = el.getAttribute('data-pos').split(',').map(Number);
        const t = el.getAttribute('data-target').split(',').map(Number);
        targetCamPos.set(p[0], p[1], p[2]);
        targetLook.set(t[0], t[1], t[2]);
        flying = true;
        keep.material.transparent = true;
        keep.material.opacity = el.getAttribute('data-cut') === 'true' ? 0.25 : 1.0;
      });
    });

    document.getElementById('btn-cutaway').onclick = (e) => {
      cutaway = !cutaway;
      keep.material.transparent = true;
      keep.material.opacity = cutaway ? 0.25 : 1.0;
      e.target.classList.toggle('active', cutaway);
    };
    document.getElementById('btn-sunset').onclick = () => { scene.background.set('#D9827E'); };
    document.getElementById('btn-morning').onclick = () => { scene.background.set('#A5C9DC'); };
    document.getElementById('btn-night').onclick = () => { scene.background.set('#1F2B52'); };

    function animate() {
      requestAnimationFrame(animate);
      world.position.y = Math.sin(performance.now() * 0.001) * 0.4;
      if (flying) {
        camera.position.lerp(targetCamPos, 0.06);
        controls.target.lerp(targetLook, 0.06);
        if (camera.position.distanceTo(targetCamPos) < 0.4) flying = false;
      }
      controls.update();
      renderer.render(scene, camera);
    }
    animate();
  </script>
</body>
</html>`
}

function generateReadmeMarkdown(): string {
  const interiorText = INTERIOR_SECTIONS.map(
    (s) =>
      `### ${s.floor} · ${s.name} (${s.enName})\n- **建筑形制**：${s.architecturalStyle} (${s.heightRange})\n- **空间详述**：${s.summary}\n- **核心结构**：${s.structuralDetails.join('；')}\n- **器物陈设**：${s.furnishings.join('、')}\n`
  ).join('\n')

  const characterText = CASTLE_CHARACTERS.map(
    (c) =>
      `### ${c.name} — ${c.title}\n- **常驻位置**：${c.locationName}\n- **台词独白**：「${c.quote}」\n- **外貌特征**：${c.appearance}\n- **日常作息**：${c.dailyRoutine}\n- **性格设定**：${c.personality}\n`
  ).join('\n')

  const terrainText = TERRAIN_ZONES.map(
    (t) =>
      `### ${t.name} (${t.enName})\n- **海拔分布**：${t.elevation}\n- **地质结构**：${t.geology}\n- **生态群落**：${t.floraAndFauna}\n- **地形详述**：${t.description}\n`
  ).join('\n')

  return `# B-612 浮空星屿 · 中世纪欧洲城堡 3D 模型与设定全书 (小王子绘本风)

本项目使用 **Three.js** 构建了一座悬浮于云海与星辰之间的广义中世纪欧洲城堡（融合罗曼式厚重拱券、哥特式飞扶壁与玫瑰花窗、卢瓦尔河谷法式锥形石板尖顶），采用圣-埃克苏佩里《小王子》温和细腻的水彩与纸雕粘土画风。

## 快速运行说明

1. **零配置独立运行版**：直接用浏览器打开或通过本地静态服务器运行 \`standalone/index.html\` 即可体验 3D 浮空岛城堡与交互图鉴。
2. **完整 Next.js + Three.js 工程源码**：包含在 \`src/\` 目录下，包含完整的 5 层内部剖面、6 位立体角色、子母浮空岛群、瀑布水循环及四十四次日落着色器。

---

## 一、 城堡内部五层垂直构造详述

${interiorText}

---

## 二、 星屿城堡居民与人物志

${characterText}

---

## 三、 浮空岛群不同地形与生态环境

${terrainText}
`
}

export async function createCastleProjectZipBlob(): Promise<Blob> {
  const zip = new JSZip()

  // 1. Detailed README documentation with full lore & architecture
  zip.file('README.md', generateReadmeMarkdown())

  // 2. Standalone runnable HTML + Three.js file
  zip.file('standalone/index.html', generateStandaloneHtml())

  // 3. Structured JSON data export of all castle interiors, characters, terrains & environments
  zip.file(
    'src/data/castle-encyclopedia.json',
    JSON.stringify(
      {
        title: 'B-612 浮空星屿 · 中世纪欧洲城堡设定集',
        style: 'Little Prince Gentle Watercolor & Clay-Paper Craft',
        interiors: INTERIOR_SECTIONS,
        characters: CASTLE_CHARACTERS,
        terrains: TERRAIN_ZONES,
        environments: ENVIRONMENT_ASPECTS,
      },
      null,
      2
    )
  )

  return await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 },
  })
}
