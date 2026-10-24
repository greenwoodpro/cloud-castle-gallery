// 将 three.js 与 OrbitControls 内联进 HTML（离线单文件）
const fs = require('fs');

let three = fs.readFileSync('three.module.min.js', 'utf8');
three = three.replace(/\/\/# sourceMappingURL=.*\r?\n?/g, '');

// 解析末尾的 export{...}，生成 const THREE = {...}
const em = three.match(/export\s*\{([\s\S]*?)\}\s*;?\s*$/);
if (!em) throw new Error('three: export block not found');
const entries = em[1].split(',').map(s => s.trim()).filter(Boolean).map(s => {
  const parts = s.split(/\s+as\s+/);
  const local = parts[0].trim();
  const pub = (parts[1] || parts[0]).trim();
  return pub + ': ' + local;
});
const threeCode = three.slice(0, em.index)
  + '\nconst THREE = {\n' + entries.join(',\n') + '\n};\n';

// OrbitControls：去掉 import 与 export，注入解构
let oc = fs.readFileSync('OrbitControls.js', 'utf8');
const im = oc.match(/import\s*\{([^}]*)\}\s*from\s*['"]three['"];?/);
if (!im) throw new Error('OrbitControls: import not found');
const names = im[1].split(',').map(s => s.trim()).filter(Boolean);
oc = oc.replace(im[0], '// (three.js 已内联，直接解构)\nconst { ' + names.join(', ') + ' } = THREE;');
oc = oc.replace(/export\s*\{\s*OrbitControls\s*\}\s*;?/, '');
oc = oc.replace(/\/\/# sourceMappingURL=.*\r?\n?/g, '');

// 主 HTML
let html = fs.readFileSync('小王子的浮空城堡.html', 'utf8');
const ms = html.match(/<script type="module">([\s\S]*?)<\/script>/);
if (!ms) throw new Error('module script not found');
let user = ms[1]
  .replace("import * as THREE from 'three';", '')
  .replace("import { OrbitControls } from 'three/addons/controls/OrbitControls.js';", '');

// 移除 importmap
html = html.replace(/<script type="importmap">[\s\S]*?<\/script>\s*/m, '');

// 注入错误提示 + 启动遮罩
const bootCss = '  #boot { position:fixed; inset:0; display:flex; align-items:center; justify-content:center;\n' +
  '    background:#8fb0dd; color:#4a3a28; font-size:15px; letter-spacing:2px; z-index:99;\n' +
  '    transition:opacity .6s; }\n';
const bootDiv = '<div id="boot">✦ 正在搭建城堡，请稍候…</div>\n';
const errHandler = '<script>\n' +
  "window.addEventListener('error', function (e) {\n" +
  "  var b = document.getElementById('boot');\n" +
  "  if (b) { b.style.display = 'flex'; b.style.opacity = '1'; b.style.background = '#f3d9c9';\n" +
  "    b.textContent = '\\u26a0 \\u573a\\u666f\\u542f\\u52a8\\u5931\\u8d25\\uff1a' + (e.message || e.type); }\n" +
  "});\n" +
  'requestAnimationFrame(function(){ requestAnimationFrame(function(){\n' +
  "  var b = document.getElementById('boot');\n" +
  "  if (b) { b.style.opacity = '0'; setTimeout(function(){ b.style.display = 'none'; }, 700); }\n" +
  '}); });\n' +
  '</script>\n';

html = html.replace('  #app { position:fixed; inset:0; }', '  #app { position:fixed; inset:0; }\n' + bootCss);
html = html.replace('<div id="app"></div>', bootDiv + '<div id="app"></div>');
html = html.replace('</title>', '</title>\n' + errHandler);

const combined = '<script type="module">\n' +
  '/* ===== three.js r160（已内联，离线可用） ===== */\n' + threeCode + '\n' +
  '/* ===== OrbitControls（已内联） ===== */\n' + oc + '\n' +
  '/* ===== 场景代码 ===== */\n' + user + '\n</script>';
html = html.replace(ms[0], combined);

fs.writeFileSync('小王子的浮空城堡.html', html);
console.log('OK  three entries:', entries.length, ' names:', names.join(','));
console.log('HTML size:', (html.length / 1024).toFixed(0), 'KB');
