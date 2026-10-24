import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import * as BGU from 'three/addons/utils/BufferGeometryUtils.js';

export const reg = {
  tickers: [],
  labels: [],
  figures: [],
  walkers: [],
  lampMats: [],
  lampLights: [],
  cutaway: [],
  interior: []
};

export const env = {
  time: 0.42,
  auto: false,
  night: 0,
  cut: true,
  stars: 1,
  bloom: true
};

export const PAL = {
  grass: '#a9c98d',
  grassDeep: '#8db073',
  grassLight: '#c8dfa6',
  moss: '#b8cf9b',
  stone: '#f1e7d3',
  stoneShade: '#ded0b2',
  rock: '#d5c1a0',
  rockDeep: '#b9a17c',
  rockViolet: '#b9a9a2',
  roofSlate: '#7d88ae',
  roofRose: '#d79a94',
  roofGreen: '#9fb8a2',
  wood: '#c9a078',
  woodDark: '#9d7852',
  woodPale: '#e0c49c',
  dirt: '#dcc49c',
  sand: '#ebdcb8',
  water: '#a9d4e0',
  waterDeep: '#79b3c9',
  thatch: '#dcbe86',
  gold: '#e6c179',
  rose: '#e8a0ac',
  cream: '#fbf5e7',
  skin: '#f4d6b8',
  hair: '#f0d98a',
  fox: '#e39a5d',
  clothBlue: '#8ea9c9',
  clothRose: '#cd8f99',
  clothGreen: '#8dbda3',
  clothPlum: '#a98fb0',
  iron: '#8b8b96',
  ink: '#4a4356'
};

let _seed = 20261018;
export function rng() {
  _seed |= 0;
  _seed = (_seed + 0x6d2b79f5) | 0;
  let t = Math.imul(_seed ^ (_seed >>> 15), 1 | _seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}
export const R = (a = 0, b = 1) => a + (b - a) * rng();
export const RI = (a, b) => Math.floor(a + (b - a + 1) * rng());
export const RS = (a, b) => (rng() < 0.5 ? a : b);
export const pick = (a) => a[Math.floor(rng() * a.length)];
export const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
export const lerp = (a, b, t) => a + (b - a) * t;
export function smoothstep(e0, e1, x) {
  const t = clamp((x - e0) / (e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
}
export const TAU = Math.PI * 2;

export function groundY(x, z) {
  const r = Math.hypot(x, z);
  let h =
    0.62 * Math.sin(x * 0.085 + 1.2) * Math.cos(z * 0.104 - 0.4) +
    0.34 * Math.sin(x * 0.205 + z * 0.171 + 2.0) +
    0.15 * Math.sin(x * 0.47) * Math.cos(z * 0.44 + 1.1);
  const lake = Math.exp(-(((x - 21) ** 2 + (z - 19) ** 2) / (2 * 7.6 * 7.6)));
  h -= lake * 1.7;
  const marsh = Math.exp(-(((x + 27) ** 2 + (z + 13) ** 2) / (2 * 5.5 * 5.5)));
  h -= marsh * 0.75;
  const plat = smoothstep(25.5, 18.5, r);
  h *= 1 - plat * 0.94;
  const knoll = Math.exp(-(((x + 19) ** 2 + (z + 18) ** 2) / (2 * 8.5 * 8.5)));
  h += knoll * 2.6;
  const rim = smoothstep(30.0, 33.6, r);
  h -= rim * 2.4;
  return h;
}

export function hexRgb(hex) {
  if (hex.startsWith('rgb')) {
    const m = hex.match(/[\d.]+/g);
    return [parseInt(m[0]), parseInt(m[1]), parseInt(m[2])];
  }
  const h = hex.replace('#', '');
  const v = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  return [parseInt(v.slice(0, 2), 16), parseInt(v.slice(2, 4), 16), parseInt(v.slice(4, 6), 16)];
}
export function rgba(hex, a) {
  const [r, g, b] = hexRgb(hex);
  return `rgba(${r},${g},${b},${a})`;
}
export function mixHex(a, b, t) {
  const A = hexRgb(a), B = hexRgb(b);
  const c = A.map((v, i) => Math.round(lerp(v, B[i], t)));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}
export function shade(hex, amt) {
  return amt >= 0 ? mixHex(hex, '#ffffff', amt) : mixHex(hex, '#2a2438', -amt);
}

function cv(size = 256) {
  const c = document.createElement('canvas');
  c.width = size;
  c.height = size;
  return { c, x: c.getContext('2d') };
}
function blob(x, px, py, r, color, a) {
  const g = x.createRadialGradient(px, py, 0, px, py, r);
  g.addColorStop(0, rgba(color, a));
  g.addColorStop(0.6, rgba(color, a * 0.45));
  g.addColorStop(1, rgba(color, 0));
  x.fillStyle = g;
  x.beginPath();
  x.arc(px, py, r, 0, TAU);
  x.fill();
}
function strokes(x, n, colors, len, w, a0, a1, size = 256) {
  x.lineCap = 'round';
  for (let i = 0; i < n; i++) {
    const px = R(0, size), py = R(0, size), an = R(0, TAU), l = R(len * 0.4, len);
    x.strokeStyle = rgba(pick(colors), R(a0, a1));
    x.lineWidth = R(w * 0.5, w);
    x.beginPath();
    x.moveTo(px, py);
    x.lineTo(px + Math.cos(an) * l, py + Math.sin(an) * l);
    x.stroke();
  }
}
function texFrom(c, rx = 1, ry = 1) {
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(rx, ry);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}
export function paper(x) {
  const g = x.createRadialGradient(128, 128, 20, 128, 128, 190);
  g.addColorStop(0, 'rgba(255,255,255,0.05)');
  g.addColorStop(1, 'rgba(90,80,70,0.07)');
  x.fillStyle = g;
  x.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 900; i++) {
    x.fillStyle = rgba('#5d5245', R(0.01, 0.045));
    x.fillRect(R(0, 256), R(0, 256), 1, 1);
  }
}

export function texGrass(rep = 9) {
  const { c, x } = cv();
  x.fillStyle = '#9cc97c';
  x.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 80; i++) blob(x, R(0, 256), R(0, 256), R(18, 74), pick(['#bce09a', '#a8d086', '#8ab870', '#c9e6ab', '#96c477']), 0.34);
  strokes(x, 1100, ['#7fae66', '#c4e0a0', '#97bd7c', '#6f9c5c', '#d6e9b6'], 10, 1.6, 0.1, 0.3);
  paper(x);
  return texFrom(c, rep, rep);
}
export function texRock(rep = 5) {
  const { c, x } = cv();
  x.fillStyle = '#c2a886';
  x.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 60; i++) blob(x, R(0, 256), R(0, 256), R(24, 90), pick(['#ab8f6a', '#d9c6a2', '#b39b8c', '#cbb391', '#9c8465']), 0.32);
  x.lineWidth = 1;
  for (let i = 0; i < 26; i++) {
    const y = R(0, 256);
    x.strokeStyle = rgba(pick(['#9c8465', '#7d6a52', '#e0d0b2']), R(0.08, 0.2));
    x.beginPath();
    x.moveTo(0, y);
    for (let px = 0; px <= 256; px += 16) x.lineTo(px, y + Math.sin(px * 0.05 + i) * 3.4);
    x.stroke();
  }
  strokes(x, 420, ['#a08c6c', '#e2d3b4', '#8d7a5d'], 6, 1.4, 0.05, 0.16);
  paper(x);
  return texFrom(c, rep, rep);
}
export function texStone(rep = 4) {
  const { c, x } = cv();
  x.fillStyle = PAL.stone;
  x.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 46; i++) blob(x, R(0, 256), R(0, 256), R(8, 26), pick(['#fbf4e6', PAL.stoneShade, '#e6d8bc']), 0.13);
  const rows = 12, rh = 256 / rows;
  for (let ry = 0; ry < rows; ry++) {
    const y = ry * rh;
    x.strokeStyle = rgba('#8d7a5e', 0.3);
    x.lineWidth = 2;
    x.beginPath();
    x.moveTo(0, y);
    x.lineTo(256, y);
    x.stroke();
    const off = (ry % 2) * 26;
    for (let px = off; px < 256 + 40; px += 52) {
      x.strokeStyle = rgba('#9c8668', 0.26);
      x.beginPath();
      x.moveTo(px, y);
      x.lineTo(px, y + rh);
      x.stroke();
    }
    x.fillStyle = rgba('#7b6a52', 0.06);
    x.fillRect(0, y + rh - 4, 256, 4);
  }
  strokes(x, 320, ['#cbb99c', '#ffffff', '#cdbb9e', '#d8c6a8'], 5, 1.2, 0.05, 0.16);
  paper(x);
  return texFrom(c, rep, rep);
}
export function texCobble(rep = 6) {
  const { c, x } = cv();
  x.fillStyle = '#c9b795';
  x.fillRect(0, 0, 256, 256);
  const step = 22;
  for (let ry = 0; ry * step < 256 + step; ry++) {
    for (let cx0 = -1; cx0 * step < 256 + step; cx0++) {
      const px = cx0 * step + (ry % 2) * step * 0.5 + R(-1.5, 1.5);
      const py = ry * step + R(-1.5, 1.5);
      const w = step * R(0.76, 0.92), h = step * R(0.68, 0.88);
      const col = pick(['#e3d6b8', '#d4c3a0', '#ecdfc4', '#c6b490', '#ded2b4', '#cdbb9c']);
      x.fillStyle = col;
      x.beginPath();
      x.ellipse(px + w / 2, py + h / 2, w / 2, h / 2, R(-0.2, 0.2), 0, TAU);
      x.fill();
      x.fillStyle = rgba('#6f6552', R(0.05, 0.13));
      x.beginPath();
      x.ellipse(px + w / 2, py + h / 2 + h * 0.42, w / 2.2, h / 6.5, 0, 0, TAU);
      x.fill();
      x.fillStyle = rgba('#ffffff', 0.16);
      x.beginPath();
      x.ellipse(px + w / 2, py + h / 2 - h * 0.18, w / 2.6, h / 3.4, 0, 0, TAU);
      x.fill();
    }
  }
  strokes(x, 260, ['#a8946f', '#f2e8d2', '#9c8a6a'], 5, 1.1, 0.05, 0.12);
  paper(x);
  return texFrom(c, rep, rep);
}
export function texRoof(base = PAL.roofSlate, rep = 7) {
  const { c, x } = cv();
  x.fillStyle = base;
  x.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 30; i++) blob(x, R(0, 256), R(0, 256), R(20, 60), pick([shade(base, 0.18), shade(base, -0.18), shade(base, 0.08)]), 0.32);
  const rows = 9, rh = 256 / rows, tw = 26;
  for (let ry = 0; ry < rows; ry++) {
    const y = ry * rh + rh;
    for (let px = -tw + ((ry % 2) * tw) / 2; px < 256 + tw; px += tw) {
      x.fillStyle = rgba(pick([shade(base, 0.16), shade(base, -0.1), shade(base, 0.05)]), 0.5);
      x.beginPath();
      x.moveTo(px, y - rh);
      x.quadraticCurveTo(px + tw / 2, y - rh * 0.2, px + tw, y - rh);
      x.closePath();
      x.fill();
      x.strokeStyle = rgba('#3c3a4e', 0.13);
      x.lineWidth = 1;
      x.stroke();
    }
  }
  paper(x);
  return texFrom(c, rep, rep);
}
export function texWood(base = PAL.wood, rep = 3) {
  const { c, x } = cv();
  x.fillStyle = base;
  x.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 42; i++) blob(x, R(0, 256), R(0, 256), R(18, 60), pick([shade(base, 0.14), shade(base, -0.16)]), 0.28);
  for (let i = 0; i < 60; i++) {
    const px = R(0, 256);
    x.strokeStyle = rgba(pick([shade(base, -0.25), shade(base, 0.18)]), R(0.06, 0.22));
    x.lineWidth = R(0.8, 2.2);
    x.beginPath();
    x.moveTo(px, 0);
    for (let py = 0; py <= 256; py += 24) x.lineTo(px + Math.sin(py * 0.05 + i) * 3, py);
    x.stroke();
  }
  for (let i = 0; i < 5; i++) {
    const px = R(0, 256), py = R(0, 256);
    blob(x, px, py, R(9, 16), shade(base, -0.35), 0.5);
    x.strokeStyle = rgba(shade(base, -0.3), 0.3);
    x.lineWidth = 1.4;
    x.beginPath();
    x.ellipse(px, py, 11, 7, R(0, 3), 0, TAU);
    x.stroke();
  }
  paper(x);
  return texFrom(c, rep, rep);
}
export function texThatch(rep = 4) {
  const { c, x } = cv();
  x.fillStyle = PAL.thatch;
  x.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 30; i++) blob(x, R(0, 256), R(0, 256), R(20, 60), pick([shade(PAL.thatch, 0.2), shade(PAL.thatch, -0.2)]), 0.3);
  strokes(x, 1800, [shade(PAL.thatch, 0.24), shade(PAL.thatch, -0.22), PAL.thatch, '#f0dba4'], 12, 1.3, 0.07, 0.24);
  paper(x);
  return texFrom(c, rep, rep);
}
export function texWater(rep = 4) {
  const { c, x } = cv();
  x.fillStyle = PAL.water;
  x.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 60; i++) blob(x, R(0, 256), R(0, 256), R(16, 56), pick(['#d5edf3', '#bfe0ea', PAL.waterDeep, '#eaf6f8']), 0.26);
  x.strokeStyle = rgba('#ffffff', 0.22);
  x.lineWidth = 2;
  for (let i = 0; i < 26; i++) {
    const py = R(0, 256);
    x.beginPath();
    x.moveTo(R(0, 100), py);
    x.bezierCurveTo(R(100, 160), py - 10, R(160, 220), py + 10, 256, py + R(-6, 6));
    x.stroke();
  }
  return texFrom(c, rep, rep);
}
export function texDirt(rep = 5) {
  const { c, x } = cv();
  x.fillStyle = PAL.dirt;
  x.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 50; i++) blob(x, R(0, 256), R(0, 256), R(16, 60), pick([shade(PAL.dirt, 0.16), shade(PAL.dirt, -0.18), PAL.sand]), 0.3);
  strokes(x, 700, [shade(PAL.dirt, -0.2), shade(PAL.dirt, 0.2)], 4, 1.2, 0.05, 0.18);
  for (let i = 0; i < 34; i++) {
    x.fillStyle = rgba(pick(['#b6a488', '#c3b193', '#e7dcc0']), R(0.18, 0.4));
    x.beginPath();
    x.ellipse(R(0, 256), R(0, 256), R(1.6, 3.6), R(1.2, 2.8), R(0, 3), 0, TAU);
    x.fill();
  }
  paper(x);
  return texFrom(c, rep, rep);
}
export function texPlaster(rep = 2) {
  const { c, x } = cv();
  x.fillStyle = '#f4e7cf';
  x.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 55; i++) blob(x, R(0, 256), R(0, 256), R(20, 80), pick(['#fdf6e6', '#eaddc0', '#e8d6b4']), 0.28);
  strokes(x, 300, ['#ded0b0', '#ffffff'], 5, 1.2, 0.03, 0.1);
  paper(x);
  return texFrom(c, rep, rep);
}
export function texMarble(rep = 2) {
  const { c, x } = cv();
  x.fillStyle = '#f6f0e4';
  x.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 22; i++) {
    x.strokeStyle = rgba(pick(['#b9b2a8', '#d9d0c0', '#8f8898']), R(0.05, 0.14));
    x.lineWidth = R(1, 3.4);
    x.beginPath();
    const px = R(0, 256), py = R(0, 256);
    x.moveTo(px, py);
    x.bezierCurveTo(px + R(-90, 90), py + R(-70, 70), px + R(-90, 90), py + R(-70, 70), px + R(-120, 120), py + R(-120, 120));
    x.stroke();
  }
  paper(x);
  return texFrom(c, rep, rep);
}
export function texRug(rep = 1, a = '#cd8f99', b = '#8ea9c9') {
  const { c, x } = cv();
  x.fillStyle = shade(a, 0.45);
  x.fillRect(0, 0, 256, 256);
  x.fillStyle = a;
  x.fillRect(18, 18, 220, 220);
  x.fillStyle = shade(a, 0.32);
  x.fillRect(30, 30, 196, 196);
  x.strokeStyle = b;
  x.lineWidth = 5;
  for (let i = 0; i < 7; i++) {
    const s = 30 + i * 15;
    x.globalAlpha = 0.35;
    x.strokeRect(128 - s, 128 - s, s * 2, s * 2);
  }
  x.globalAlpha = 1;
  x.fillStyle = b;
  for (let i = 0; i < 8; i++) {
    const an = (i / 8) * TAU;
    x.beginPath();
    x.ellipse(128 + Math.cos(an) * 96, 128 + Math.sin(an) * 96, 9, 5, an, 0, TAU);
    x.fill();
  }
  x.fillStyle = shade(b, 0.35);
  x.beginPath();
  x.arc(128, 128, 22, 0, TAU);
  x.fill();
  for (let i = 0; i < 10; i++) {
    x.fillStyle = shade(a, 0.55);
    x.fillRect(0, i * 25.6, 256, 3);
  }
  paper(x);
  return texFrom(c, 1, 1);
}
export function texHerald(bg = PAL.clothBlue, fg = '#f3e6c8', symbol = 'star') {
  const { c, x } = cv(128);
  x.fillStyle = bg;
  x.fillRect(0, 0, 128, 128);
  for (let i = 0; i < 16; i++) blob(x, R(0, 128), R(0, 128), R(12, 44), pick([shade(bg, 0.16), shade(bg, -0.16)]), 0.3);
  x.fillStyle = fg;
  if (symbol === 'star') {
    x.beginPath();
    for (let i = 0; i < 10; i++) {
      const an = -Math.PI / 2 + (i * Math.PI) / 5;
      const r = i % 2 === 0 ? 34 : 14;
      const px = 64 + Math.cos(an) * r, py = 66 + Math.sin(an) * r;
      i ? x.lineTo(px, py) : x.moveTo(px, py);
    }
    x.closePath();
    x.fill();
  } else if (symbol === 'rose') {
    for (let i = 5; i > 0; i--) {
      x.fillStyle = i % 2 ? fg : shade(fg, -0.12);
      x.beginPath();
      x.ellipse(64, 66, i * 6.4, i * 6.4, 0, 0, TAU);
      x.fill();
    }
    x.fillStyle = shade(bg, -0.2);
    x.beginPath();
    x.arc(64, 66, 9, 0, TAU);
    x.fill();
  } else if (symbol === 'cross') {
    x.fillRect(52, 24, 24, 88);
    x.fillRect(28, 48, 72, 24);
  } else if (symbol === 'tower') {
    x.fillRect(40, 52, 48, 58);
    x.beginPath();
    x.moveTo(34, 52);
    x.lineTo(64, 20);
    x.lineTo(94, 52);
    x.closePath();
    x.fill();
    x.fillStyle = bg;
    x.fillRect(56, 74, 16, 36);
  } else if (symbol === 'moon') {
    x.beginPath();
    x.arc(58, 62, 32, 0, TAU);
    x.fill();
    x.fillStyle = bg;
    x.beginPath();
    x.arc(74, 54, 30, 0, TAU);
    x.fill();
  }
  x.strokeStyle = rgba('#5b5348', 0.35);
  x.lineWidth = 3;
  x.strokeRect(4, 4, 120, 120);
  paper(x);
  return texFrom(c, 1, 1);
}
export function texQuilt(a = PAL.clothRose, b = PAL.cream) {
  const { c, x } = cv(128);
  x.fillStyle = a;
  x.fillRect(0, 0, 128, 128);
  for (let ry = 0; ry < 8; ry++)
    for (let cx0 = 0; cx0 < 8; cx0++) {
      x.fillStyle = (ry + cx0) % 2 ? shade(a, 0.28) : b;
      x.fillRect(cx0 * 16 + 1, ry * 16 + 1, 14, 14);
    }
  for (let i = 0; i < 12; i++) blob(x, R(0, 128), R(0, 128), R(10, 34), '#ffffff', 0.12);
  paper(x);
  return texFrom(c, 3, 3);
}
export function texGlow(color = '#ffd9a0', size = 128) {
  const { c, x } = cv(size);
  const g = x.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, rgba(color, 1));
  g.addColorStop(0.25, rgba(color, 0.5));
  g.addColorStop(0.6, rgba(color, 0.13));
  g.addColorStop(1, rgba(color, 0));
  x.fillStyle = g;
  x.fillRect(0, 0, size, size);
  return texFrom(c, 1, 1);
}
export function texSoft(color = '#ffffff', size = 128) {
  const { c, x } = cv(size);
  const g = x.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, rgba(color, 0.95));
  g.addColorStop(0.5, rgba(color, 0.35));
  g.addColorStop(1, rgba(color, 0));
  x.fillStyle = g;
  x.fillRect(0, 0, size, size);
  return texFrom(c, 1, 1);
}
export function texFlower() {
  const { c, x } = cv(64);
  x.translate(32, 34);
  x.fillStyle = '#ffffff';
  for (let i = 0; i < 5; i++) {
    x.save();
    x.rotate((i / 5) * TAU);
    x.beginPath();
    x.ellipse(0, -12, 8, 13, 0, 0, TAU);
    x.fill();
    x.restore();
  }
  x.fillStyle = '#f6dfa6';
  x.beginPath();
  x.arc(0, 0, 7, 0, TAU);
  x.fill();
  x.setTransform(1, 0, 0, 1, 0, 0);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export const TEX = {};
export const M = {};
export function buildMaterials(quality = 'high') {
  TEX.grass = texGrass(9);
  TEX.grassBig = texGrass(22);
  TEX.rock = texRock(5);
  TEX.stone = texStone(4);
  TEX.stoneFine = texStone(3);
  TEX.cobble = texCobble(6);
  TEX.cobbleFine = texCobble(2);
  TEX.slate = texRoof(PAL.roofSlate);
  TEX.rose = texRoof(PAL.roofRose);
  TEX.green = texRoof(PAL.roofGreen);
  TEX.wood = texWood(PAL.wood, 3);
  TEX.woodDark = texWood(PAL.woodDark, 2);
  TEX.woodPale = texWood(PAL.woodPale, 2);
  TEX.thatch = texThatch();
  TEX.water = texWater();
  TEX.dirt = texDirt();
  TEX.plaster = texPlaster();
  TEX.marble = texMarble();
  TEX.iron = texRock(3);
  TEX.glow = texGlow('#ffd9a0');
  TEX.glowBlue = texGlow('#cfe3f5');
  TEX.soft = texSoft('#ffffff');
  TEX.flower = texFlower();

  const std = (o) => new THREE.MeshStandardMaterial(o);
  M.grass = std({ map: TEX.grass, roughness: 1, color: '#ffffff' });
  M.grassBig = std({ map: TEX.grassBig, roughness: 1 });
  M.rock = std({ map: TEX.rock, roughness: 1, vertexColors: true });
  M.rockPlain = std({ map: TEX.rock, roughness: 1, color: PAL.rock });
  M.stone = std({ map: TEX.stone, roughness: 0.95, color: '#ffffff' });
  M.stoneWarm = std({ map: TEX.stoneFine, roughness: 0.95, color: '#f6ecd8' });
  M.cobble = std({ map: TEX.cobble, roughness: 0.9 });
  M.plaster = std({ map: TEX.plaster, roughness: 1 });
  M.marble = std({ map: TEX.marble, roughness: 0.55 });
  M.slate = std({ map: TEX.slate, roughness: 0.85, side: THREE.DoubleSide });
  M.roofRose = std({ map: TEX.rose, roughness: 0.85, side: THREE.DoubleSide });
  M.roofGreen = std({ map: TEX.green, roughness: 0.85, side: THREE.DoubleSide });
  M.thatch = std({ map: TEX.thatch, roughness: 1, side: THREE.DoubleSide });
  M.wood = std({ map: TEX.wood, roughness: 0.9 });
  M.woodDark = std({ map: TEX.woodDark, roughness: 0.9 });
  M.woodPale = std({ map: TEX.woodPale, roughness: 0.9 });
  M.dirt = std({ map: TEX.dirt, roughness: 1 });
  M.iron = std({ color: PAL.iron, roughness: 0.45, metalness: 0.55 });
  M.ironDark = std({ color: '#5f5f6b', roughness: 0.5, metalness: 0.5 });
  M.gold = std({ color: PAL.gold, roughness: 0.34, metalness: 0.7 });
  M.silver = std({ color: '#d7d3c8', roughness: 0.35, metalness: 0.6 });
  M.glass = new THREE.MeshPhysicalMaterial({
    color: '#dcecf4',
    roughness: 0.08,
    metalness: 0,
    transmission: 0.92,
    thickness: 0.4,
    transparent: true,
    opacity: 0.5,
    side: THREE.DoubleSide
  });
  M.water = new THREE.MeshStandardMaterial({
    map: TEX.water,
    color: '#cbe9f1',
    roughness: 0.22,
    metalness: 0.05,
    transparent: true,
    opacity: 0.86,
    side: THREE.DoubleSide
  });
  M.candle = std({ color: '#f7f0e0', roughness: 0.7, emissive: '#ffcf8a', emissiveIntensity: 0 });
  M.flame = new THREE.MeshBasicMaterial({ color: '#ffd08a', transparent: true, opacity: 0.9 });
  M.wick = std({ color: '#8a8069', roughness: 1 });
  M.foliage1 = std({ map: TEX.grass, color: '#93b478', roughness: 1 });
  M.foliage2 = std({ map: TEX.grass, color: '#7ea36a', roughness: 1 });
  M.foliage3 = std({ map: TEX.grass, color: '#c2c98a', roughness: 1 });
  M.foliage4 = std({ map: TEX.grass, color: '#d09a7e', roughness: 1 });
  M.pine = std({ map: TEX.grass, color: '#7b9b8f', roughness: 1 });
  M.hedge = std({ map: TEX.grass, color: '#84a878', roughness: 1 });
  M.sand = std({ map: TEX.dirt, color: '#f2e6c4', roughness: 1 });
  M.snow = std({ color: '#f7f5f0', roughness: 0.9 });
  M.cloth = {};
  ['clothBlue', 'clothRose', 'clothGreen', 'clothPlum', 'cream', 'gold'].forEach((k) => {
    M.cloth[k] = std({ color: PAL[k], roughness: 0.92, side: THREE.DoubleSide });
  });
  M.leather = std({ color: '#a9805c', roughness: 0.85 });
  M.hair = std({ color: PAL.hair, roughness: 1 });
  M.skin = std({ color: PAL.skin, roughness: 0.95 });
  M.ink = std({ color: PAL.ink, roughness: 0.9 });
  M.wool = std({ color: '#f6f2e6', roughness: 1 });
  M.fur = std({ color: PAL.fox, roughness: 1 });
  M.furWhite = std({ color: '#fbf6ec', roughness: 1 });
  M.horse = std({ color: '#c19a6f', roughness: 1 });
  M.horseDark = std({ color: '#6b5847', roughness: 1 });
  M.paper = std({ color: '#f7f1df', roughness: 1, side: THREE.DoubleSide });
  M.book1 = std({ color: '#b46b6b', roughness: 1 });
  M.book2 = std({ color: '#6f8bb0', roughness: 1 });
  M.book3 = std({ color: '#c8a765', roughness: 1 });
  M.book4 = std({ color: '#7fa07f', roughness: 1 });
  M.book5 = std({ color: '#a882b0', roughness: 1 });
  M.flowerPetal = std({ color: PAL.rose, roughness: 0.85 });
  M.rosePetal = std({ color: '#ea9db0', roughness: 0.8 });
  M.glassDome = new THREE.MeshPhysicalMaterial({
    color: '#e8f2f6',
    roughness: 0.05,
    transparent: true,
    opacity: 0.22,
    transmission: 0.85,
    thickness: 0.3,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  M.emitWarm = std({ color: '#ffdca6', emissive: '#ffc98a', emissiveIntensity: 0.6, roughness: 1 });
  M.clothBlue = M.cloth.clothBlue;
  M.clothRose = M.cloth.clothRose;
  M.clothGreen = M.cloth.clothGreen;
  M.clothPlum = M.cloth.clothPlum;
  M.clothCream = M.cloth.cream;
  M.cream = M.cloth.cream;
  M.clothGold = M.cloth.gold;
  M.clay = std({ color: '#c39a72', roughness: 0.9 });
  M.moss = std({ map: TEX.grass, color: '#8fb277', roughness: 1 });
  M.snow = std({ color: '#f7f5f0', roughness: 0.9 });
  M.emitBlue = std({ color: '#dceafa', emissive: '#bcd6f5', emissiveIntensity: 0.5, roughness: 1 });
  M.windowGlow = std({ color: '#ffcf8f', emissive: '#ffb861', emissiveIntensity: 0.2, roughness: 1 });
  M.puddle = new THREE.MeshStandardMaterial({ color: '#bcdae6', roughness: 0.12, metalness: 0.15, transparent: true, opacity: 0.72 });
  reg.lampMats.push(M.candle, M.emitWarm, M.emitBlue, M.windowGlow, M.flame);
  Object.entries(M).forEach(([k, v]) => {
    if (v && v.isMaterial) v.name = k;
  });
  return M;
}

export const gBox = (w, h, d) => new THREE.BoxGeometry(w, h, d);
export const gRBox = (w, h, d, r = 0.07, s = 3) => new RoundedBoxGeometry(w, h, d, s, Math.min(r, Math.min(w, h, d) * 0.45));
export const gCyl = (rt, rb, h, s = 12, open = false) => new THREE.CylinderGeometry(rt, rb, h, s, 1, open);
export const gCone = (r, h, s = 12) => new THREE.ConeGeometry(r, h, s);
export const gSph = (r, s = 14) => new THREE.SphereGeometry(r, s, Math.max(6, Math.round(s * 0.6)));
export const gLathe = (pts, s = 14) => new THREE.LatheGeometry(pts.map((p) => new THREE.Vector2(p[0], p[1])), s);
export const gTor = (r, t, s = 20, rs = 8) => new THREE.TorusGeometry(r, t, rs, s);
export const gPlane = (w, h, ws = 1, hs = 1) => new THREE.PlaneGeometry(w, h, ws, hs);
export const gIco = (r, d = 0) => new THREE.IcosahedronGeometry(r, d);

export function jitterGeo(geo, amt = 0.06, seed = 1, radial = 1) {
  const p = geo.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    const n = Math.sin(v.x * 3.1 + seed) * Math.cos(v.y * 2.7 + seed * 1.7) + Math.sin(v.z * 2.3 + seed * 2.3) * 0.6;
    v.multiplyScalar(1 + n * amt * radial);
    v.y += Math.sin(v.x * 1.7 + seed) * amt * 0.6;
    p.setXYZ(i, v.x, v.y, v.z);
  }
  geo.computeVertexNormals();
  return geo;
}

export function normalizeGeo(geo) {
  let g = geo.index ? geo.toNonIndexed() : geo;
  const keep = ['position', 'normal', 'uv'];
  Object.keys(g.attributes).forEach((k) => {
    if (!keep.includes(k)) g.deleteAttribute(k);
  });
  const n = g.attributes.position.count;
  if (!g.attributes.uv) g.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array(n * 2), 2));
  if (!g.attributes.normal) g.computeVertexNormals();
  return g;
}
export function mergeAll(arr) {
  const list = arr.map(normalizeGeo);
  if (list.length === 1) return list[0];
  return BGU.mergeGeometries(list, false);
}

export class Merge {
  constructor() {
    this.buckets = new Map();
    this.order = [];
    this.base = new THREE.Matrix4();
  }
  frame(pos = [0, 0, 0], rot = [0, 0, 0]) {
    this.base = new THREE.Matrix4().compose(
      new THREE.Vector3(pos[0], pos[1], pos[2]),
      new THREE.Quaternion().setFromEuler(new THREE.Euler(rot[0], rot[1], rot[2])),
      new THREE.Vector3(1, 1, 1)
    );
    return this;
  }
  reset() {
    this.base = new THREE.Matrix4();
    return this;
  }
  add(key, geo, pos = [0, 0, 0], rot = [0, 0, 0], scl = [1, 1, 1]) {
    if (!this.buckets.has(key)) {
      this.buckets.set(key, []);
      this.order.push(key);
    }
    const g = geo.clone();
    const local = new THREE.Matrix4().compose(
      new THREE.Vector3(pos[0], pos[1], pos[2]),
      new THREE.Quaternion().setFromEuler(new THREE.Euler(rot[0], rot[1], rot[2])),
      new THREE.Vector3(scl[0], scl[1], scl[2])
    );
    g.applyMatrix4(new THREE.Matrix4().multiplyMatrices(this.base, local));
    this.buckets.get(key).push(g);
    return this;
  }
  box(key, w, h, d, pos, rot) { return this.add(key, gBox(w, h, d), pos, rot); }
  rbox(key, w, h, d, pos, rot, r = 0.07) { return this.add(key, gRBox(w, h, d, r), pos, rot); }
  cyl(key, rt, rb, h, pos, rot, s = 12) { return this.add(key, gCyl(rt, rb, h, s), pos, rot); }
  cone(key, r, h, pos, rot, s = 12) { return this.add(key, gCone(r, h, s), pos, rot); }
  sph(key, r, pos, s = 14) { return this.add(key, gSph(r, s), pos); }
  tor(key, r, t, pos, rot, s = 20) { return this.add(key, gTor(r, t, s), pos, rot); }
  lathe(key, pts, pos, rot, s = 14) { return this.add(key, gLathe(pts, s), pos, rot); }
  ico(key, r, pos, rot, det = 0) { return this.add(key, gIco(r, det), pos, rot); }
  geo(key, geo, pos, rot, scl) { return this.add(key, geo, pos, rot, scl); }
  mirrorX(key) {
    const list = this.buckets.get(key);
    if (list) list.forEach((g) => {
      const m = g.clone();
      m.applyMatrix4(new THREE.Matrix4().makeScale(-1, 1, 1));
      list.push(m);
    });
    return this;
  }
  build(mats, opts = {}) {
    const geos = [], mlist = [];
    for (const k of this.order) {
      const arr = this.buckets.get(k).filter((g) => g.attributes && g.attributes.position);
      if (!arr.length) continue;
      const merged = mergeAll(arr);
      if (!merged) continue;
      geos.push(merged);
      mlist.push(mats[k] || M.stone);
      if (!mats[k]) (globalThis.__mm || (globalThis.__mm = new Set())).add(k);
    }
    if (!geos.length) return null;
    let g = geos.length === 1 ? geos[0] : BGU.mergeGeometries(geos, true);
    if (!g) {
      g = geos[0];
      mlist.length = 1;
    }
    const mesh = new THREE.Mesh(g, mlist.length === 1 ? mlist[0] : mlist);
    mesh.castShadow = opts.cast !== false;
    mesh.receiveShadow = opts.receive !== false;
    return mesh;
  }
}
export function mergeTo(parent, build, opts = {}) {
  const m = build.build(opts.mats || M, opts);
  if (m && parent) parent.add(m);
  return m;
}
export function shadowed(m, cast = true, rec = true) {
  m.traverse((o) => {
    if (o.isMesh) {
      o.castShadow = cast;
      o.receiveShadow = rec;
    }
  });
  return m;
}
export function holder(parent, name) {
  const g = new THREE.Group();
  g.name = name;
  if (parent) parent.add(g);
  return g;
}
export function tick(fn) {
  reg.tickers.push(fn);
  return fn;
}
export function label(name, pos, desc = '', kind = 'place') {
  reg.labels.push({ name, pos, desc, kind });
}
export function registerFigure(group, name, desc, opts = {}) {
  group.userData.pickable = true;
  group.userData.name = name;
  group.userData.desc = desc;
  reg.figures.push({ name, desc, group, ...opts });
  return group;
}

export function wallRects(W, H, openings = []) {
  const xs = new Set([-W / 2, W / 2]);
  openings.forEach((o) => {
    xs.add(clamp(o.x - o.w / 2, -W / 2, W / 2));
    xs.add(clamp(o.x + o.w / 2, -W / 2, W / 2));
  });
  const arr = [...xs].sort((a, b) => a - b);
  const out = [];
  for (let i = 0; i < arr.length - 1; i++) {
    const x0 = arr[i], x1 = arr[i + 1], w = x1 - x0;
    if (w < 1e-4) continue;
    const mid = (x0 + x1) / 2;
    const hit = openings.filter((o) => mid > o.x - o.w / 2 - 1e-4 && mid < o.x + o.w / 2 + 1e-4);
    if (!hit.length) {
      out.push({ x: mid, y: 0, w, h: H });
      continue;
    }
    const spans = hit.map((o) => [clamp(o.y - o.h / 2, -H / 2, H / 2), clamp(o.y + o.h / 2, -H / 2, H / 2)]).sort((a, b) => a[0] - b[0]);
    let cur = -H / 2;
    for (const [y0, y1] of spans) {
      if (y0 - cur > 1e-4) out.push({ x: mid, y: (cur + y0) / 2, w, h: y0 - cur });
      cur = Math.max(cur, y1);
    }
    if (H / 2 - cur > 1e-4) out.push({ x: mid, y: (cur + H / 2) / 2, w, h: H / 2 - cur });
  }
  return out;
}
export function wallInto(Mg, key, W, H, T, openings = [], pos = [0, 0, 0], rot = [0, 0, 0]) {
  const rects = wallRects(W, H, openings);
  Mg.frame(pos, rot);
  rects.forEach((r) => Mg.box(key, r.w, r.h, T, [r.x, r.y, 0]));
  Mg.reset();
  return Mg;
}
export function slabWithHole(Mg, key, w, d, t, y, hole = null, pos = [0, 0, 0], rot = [0, 0, 0]) {
  Mg.frame([pos[0], y, pos[2]], rot);
  if (!hole) Mg.box(key, w, t, d, [0, 0, 0]);
  else {
    const { x, z, s } = hole;
    const hw = s / 2, hd = s / 2;
    const leftW = w / 2 + x - hw;
    if (leftW > 0.01) Mg.box(key, leftW, t, d, [-(w / 2 - leftW / 2), 0, 0]);
    const rightW = x + hw + w / 2;
    if (w - rightW > 0.01) Mg.box(key, w - rightW, t, d, [w / 2 - (w - rightW) / 2, 0, 0]);
    const midW = hw * 2;
    const backD = d / 2 + z - hd;
    if (backD > 0.01) Mg.box(key, midW, t, backD, [x, 0, -(d / 2 - backD / 2)]);
    const frontD = d - (backD > 0.01 ? backD : 0) - hd * 2;
    if (frontD > 0.01) Mg.box(key, midW, t, frontD, [x, 0, d / 2 - frontD / 2]);
  }
  Mg.reset();
  return Mg;
}
export function hipRoofParts(w, d, h, over = 0.35) {
  const W = w / 2 + over, D = d / 2 + over;
  const L = Math.max(0.15, (w - d) / 2);
  const b1 = [-W, 0, -D], b2 = [W, 0, -D], b3 = [W, 0, D], b4 = [-W, 0, D];
  const r1 = [-L, h, 0], r2 = [L, h, 0];
  const mk = (name, tris) => {
    const pos = [], uv = [];
    tris.forEach(([a, b, c]) => {
      [...a, ...b, ...c].forEach((v, i) => pos.push(v));
      [[a[0], a[2]], [b[0], b[2]], [c[0], c[2]]].forEach((p) => uv.push(p[0] * 0.22, p[1] * 0.22));
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    g.computeVertexNormals();
    g.name = name;
    return g;
  };
  return {
    back: mk('back', [[b1, b2, r2], [b1, r2, r1]]),
    front: mk('front', [[b4, b3, r2], [b4, r2, r1]]),
    left: mk('left', [[b1, b4, r1]]),
    right: mk('right', [[b3, b2, r2]])
  };
}
export function roofMesh(parent, w, d, h, mat, over = 0.35, y = 0, pos = [0, 0, 0], ry = 0) {
  const parts = hipRoofParts(w, d, h, over);
  const g = new THREE.Group();
  g.rotation.y = ry;
  g.position.set(pos[0], y, pos[2]);
  parent.add(g);
  const meshes = {};
  Object.entries(parts).forEach(([k, geo]) => {
    const m = new THREE.Mesh(geo, mat);
    m.castShadow = true;
    m.receiveShadow = true;
    g.add(m);
    meshes[k] = m;
  });
  return { group: g, meshes };
}
export function tubeAlong(parent, curve, radius, mat, seg = 60, radial = 6) {
  const geo = new THREE.TubeGeometry(curve, seg, radius, radial, false);
  const m = new THREE.Mesh(geo, mat);
  m.castShadow = true;
  m.receiveShadow = true;
  parent.add(m);
  return m;
}
export function ribbon(parent, pts, width, mat, opts = {}) {
  const curve = new THREE.CatmullRomCurve3(pts.map((p) => new THREE.Vector3(p[0], p[1], p[2])));
  const N = opts.seg || Math.max(24, pts.length * 8);
  const pos = [], uv = [], idx = [];
  const up = new THREE.Vector3(0, 1, 0);
  const tangent = new THREE.Vector3(), side = new THREE.Vector3(), p = new THREE.Vector3();
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    curve.getPointAt(t, p);
    curve.getTangentAt(t, tangent);
    side.crossVectors(tangent, up).normalize().multiplyScalar((width * (opts.taper ? opts.taper(t) : 1)) / 2);
    pos.push(p.x - side.x, p.y - side.y, p.z - side.z);
    pos.push(p.x + side.x, p.y + side.y, p.z + side.z);
    uv.push(0, t * (opts.uvRep || 6), 1, t * (opts.uvRep || 6));
  }
  for (let i = 0; i < N; i++) {
    const a = i * 2;
    idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  g.computeVertexNormals();
  const m = new THREE.Mesh(g, mat);
  m.receiveShadow = true;
  m.castShadow = false;
  m.renderOrder = opts.order || 0;
  parent.add(m);
  return m;
}
export function placeAlong(pts, count) {
  const c = new THREE.CatmullRomCurve3(pts.map((p) => new THREE.Vector3(p[0], p[1], p[2])));
  return Array.from({ length: count }, (_, i) => c.getPointAt(i / (count - 1)));
}
export function aroundRing(cx, cz, radius, n, y = 0, rot = 0, ry = 0) {
  return Array.from({ length: n }, (_, i) => {
    const a = rot + (i / n) * TAU;
    return [cx + Math.cos(a) * radius, y, cz + Math.sin(a) * radius, ry];
  });
}
export function labelSprite(txt, color = '#f6ead2') {
  const { c, x } = cv(256);
  x.clearRect(0, 0, 256, 256);
  const g = x.createRadialGradient(128, 128, 0, 128, 128, 118);
  g.addColorStop(0, rgba(color, 0.85));
  g.addColorStop(0.6, rgba(color, 0.25));
  g.addColorStop(1, rgba(color, 0));
  x.fillStyle = g;
  x.fillRect(0, 0, 256, 256);
  const t = texFrom(c);
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
  return s;
}
