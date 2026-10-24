import * as THREE from 'three';
import { canvasTexture, mulberry32, fbm } from './util.js';

/**
 * 石砌墙：贴图即最终奶油石色（含砖缝、斑驳、裂纹），
 * 材质 color 用于整体色调微调（不要叠加重色）。
 */
export function stoneTexture(repeat = [6, 3]) {
  return canvasTexture(512, (ctx, S) => {
    const rand = mulberry32(7);
    ctx.fillStyle = '#f2ecdd';
    ctx.fillRect(0, 0, S, S);
    // 底色斑驳
    for (let i = 0; i < 900; i++) {
      const x = rand() * S, y = rand() * S, r = 2 + rand() * 16;
      const v = 214 + rand() * 41;
      ctx.fillStyle = `rgba(${v},${v - 4},${v - 12},0.16)`;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    // 砖块
    const rows = 8;
    const bh = S / rows;
    for (let row = 0; row < rows; row++) {
      const offset = (row % 2) * (S / 10);
      let x = -offset;
      while (x < S) {
        const bw = S / 5 + (rand() - 0.5) * 14;
        const y = row * bh;
        const tone = 226 + Math.floor(rand() * 29);
        ctx.fillStyle = `rgb(${tone},${tone - 8},${tone - 20})`;
        ctx.fillRect(x + 1.5, y + 1.5, bw - 3, bh - 3);
        ctx.fillStyle = 'rgba(255,255,255,0.22)';
        ctx.fillRect(x + 1.5, y + 1.5, bw - 3, 2.5);
        ctx.fillStyle = 'rgba(150,132,108,0.18)';
        ctx.fillRect(x + 1.5, y + bh - 5, bw - 3, 3.5);
        x += bw;
      }
    }
    // 灰缝
    ctx.strokeStyle = 'rgba(166,152,130,0.6)';
    ctx.lineWidth = 2.4;
    for (let row = 0; row <= rows; row++) {
      ctx.beginPath();
      ctx.moveTo(0, row * bh);
      ctx.lineTo(S, row * bh);
      ctx.stroke();
    }
    // 细裂纹
    ctx.strokeStyle = 'rgba(146,130,108,0.42)';
    ctx.lineWidth = 1.1;
    for (let i = 0; i < 26; i++) {
      ctx.beginPath();
      let x = rand() * S, y = rand() * S;
      ctx.moveTo(x, y);
      for (let k = 0; k < 4; k++) {
        x += (rand() - 0.5) * 40;
        y += (rand() - 0.5) * 40;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  }, { repeat });
}

/** 陶土瓦屋顶（贴图即最终陶土色） */
export function roofTexture(repeat = [8, 5]) {
  return canvasTexture(512, (ctx, S) => {
    const rand = mulberry32(23);
    ctx.fillStyle = '#c06038';
    ctx.fillRect(0, 0, S, S);
    const rows = 10, cols = 10;
    const th = S / rows, tw = S / cols;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * tw + (r % 2) * tw * 0.5, y = r * th;
        const tone = 176 + Math.floor(rand() * 42);
        ctx.fillStyle = `rgb(${tone},${Math.floor(tone * 0.62)},${Math.floor(tone * 0.44)})`;
        ctx.beginPath();
        ctx.moveTo(x, y + th);
        ctx.lineTo(x, y + th * 0.35);
        ctx.quadraticCurveTo(x + tw * 0.5, y - th * 0.12, x + tw, y + th * 0.35);
        ctx.lineTo(x + tw, y + th);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = 'rgba(108,52,32,0.4)';
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
    }
    for (let i = 0; i < 500; i++) {
      ctx.fillStyle = `rgba(255,226,200,${0.04 + rand() * 0.1})`;
      ctx.beginPath();
      ctx.arc(rand() * S, rand() * S, 1 + rand() * 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }, { repeat });
}

/**
 * 草地：贴图本身即最终颜色（已含草绿），材质 color 保持白色。
 * 避免 map × vertexColor 双重着色造成发暗。
 */
export function grassTexture(repeat = [14, 14]) {
  return canvasTexture(512, (ctx, S) => {
    const rand = mulberry32(91);
    ctx.fillStyle = '#8fb45c';
    ctx.fillRect(0, 0, S, S);
    // 大块柔和明暗（模拟草皮起伏）
    for (let i = 0; i < 130; i++) {
      const x = rand() * S, y = rand() * S, r = 20 + rand() * 70;
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      const light = rand() > 0.5;
      g.addColorStop(0, light ? 'rgba(190,222,140,0.40)' : 'rgba(104,136,66,0.30)');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    }
    // 草叶笔触
    for (let i = 0; i < 2200; i++) {
      const x = rand() * S, y = rand() * S;
      const h = 3 + rand() * 9;
      const v = rand();
      ctx.strokeStyle = v > 0.5
        ? `rgba(168,204,112,0.45)`
        : `rgba(102,132,62,0.42)`;
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + (rand() - 0.5) * 4, y - h);
      ctx.stroke();
    }
    // 零星小花
    for (let i = 0; i < 70; i++) {
      ctx.fillStyle = rand() > 0.5 ? 'rgba(252,246,214,0.8)' : 'rgba(250,224,160,0.7)';
      ctx.beginPath();
      ctx.arc(rand() * S, rand() * S, 1.2 + rand() * 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }, { repeat });
}

/**
 * 岩石：贴图本身即最终颜色（暖灰褐岩层），材质 color 保持白色。
 */
export function rockTexture(repeat = [6, 6]) {
  return canvasTexture(512, (ctx, S) => {
    const rand = mulberry32(313);
    ctx.fillStyle = '#b8a68c';
    ctx.fillRect(0, 0, S, S);
    for (let i = 0; i < 2600; i++) {
      const x = rand() * S, y = rand() * S, r = 1 + rand() * 9;
      const v = rand();
      ctx.fillStyle = v > 0.5
        ? `rgba(214,199,176,${0.08 + rand() * 0.2})`
        : `rgba(112,98,80,${0.06 + rand() * 0.18})`;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    // 层理
    for (let y = 0; y < S; y += 3) {
      ctx.strokeStyle = `rgba(104,90,72,${0.06 + rand() * 0.1})`;
      ctx.lineWidth = 1 + rand() * 2;
      ctx.beginPath();
      ctx.moveTo(0, y + rand() * 2);
      for (let x = 0; x <= S; x += 32) ctx.lineTo(x, y + Math.sin(x * 0.02 + y) * 3);
      ctx.stroke();
    }
  }, { repeat });
}

/** 木板（贴图即最终木色） */
export function woodTexture(repeat = [3, 2], base = '#9c6c44') {
  return canvasTexture(256, (ctx, S) => {
    const rand = mulberry32(55);
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, S, S);
    const planks = 6, ph = S / planks;
    for (let i = 0; i < planks; i++) {
      const tone = 0.86 + rand() * 0.26;
      ctx.fillStyle = `rgba(${Math.floor(160 * tone)},${Math.floor(112 * tone)},${Math.floor(72 * tone)},1)`;
      ctx.fillRect(0, i * ph, S, ph - 1.5);
      ctx.strokeStyle = 'rgba(84,58,38,0.42)';
      ctx.lineWidth = 1.2;
      for (let k = 0; k < 7; k++) {
        ctx.beginPath();
        const y = i * ph + rand() * ph;
        ctx.moveTo(0, y);
        for (let x = 0; x <= S; x += 20) ctx.lineTo(x, y + Math.sin(x * 0.06 + k) * 1.8);
        ctx.stroke();
      }
    }
  }, { repeat });
}

/** 泥土小路 */
export function pathTexture(repeat = [2, 10]) {
  return canvasTexture(256, (ctx, S) => {
    const rand = mulberry32(404);
    ctx.fillStyle = '#c8ab86';
    ctx.fillRect(0, 0, S, S);
    for (let i = 0; i < 2200; i++) {
      const v = rand();
      ctx.fillStyle = v > 0.5 ? `rgba(160,132,98,${0.2 + rand() * 0.3})` : `rgba(226,206,175,${0.2 + rand() * 0.3})`;
      ctx.beginPath();
      ctx.arc(rand() * S, rand() * S, 1 + rand() * 4, 0, Math.PI * 2);
      ctx.fill();
    }
  }, { repeat });
}

/** 水面：波纹条带（配合 offset 动画） */
export function waterTexture(repeat = [4, 4]) {
  return canvasTexture(256, (ctx, S) => {
    const rand = mulberry32(88);
    const g = ctx.createLinearGradient(0, 0, 0, S);
    g.addColorStop(0, '#4f9fb4');
    g.addColorStop(0.5, '#6fbccb');
    g.addColorStop(1, '#59a9bd');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, S, S);
    for (let i = 0; i < 70; i++) {
      const y = rand() * S;
      ctx.strokeStyle = `rgba(255,255,255,${0.08 + rand() * 0.2})`;
      ctx.lineWidth = 1 + rand() * 2.5;
      ctx.beginPath();
      ctx.moveTo(0, y);
      for (let x = 0; x <= S; x += 16) ctx.lineTo(x, y + Math.sin(x * 0.05 + i) * 2.4);
      ctx.stroke();
    }
  }, { repeat });
}

/** 织物（挂毯/旗帜） */
export function fabricTexture(repeat = [1, 1], base = '#b8433c', motif = '#e8c46a') {
  return canvasTexture(256, (ctx, S) => {
    const rand = mulberry32(122);
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, S, S);
    ctx.fillStyle = motif;
    for (let i = 0; i < 6; i++) {
      const y = (i + 0.5) * (S / 6);
      ctx.beginPath();
      ctx.arc(S / 2, y, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = base;
      ctx.beginPath();
      ctx.arc(S / 2, y, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = motif;
    }
    for (let i = 0; i < 1500; i++) {
      ctx.fillStyle = `rgba(0,0,0,${rand() * 0.06})`;
      ctx.fillRect(rand() * S, rand() * S, 2, 2);
    }
  }, { repeat });
}

/** 圆形柔光贴图（星星/光点/萤火虫） */
export function glowTexture(inner = 'rgba(255,255,255,1)', outer = 'rgba(255,255,255,0)') {
  return canvasTexture(64, (ctx, S) => {
    const g = ctx.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
    g.addColorStop(0, inner);
    g.addColorStop(0.35, 'rgba(255,255,255,0.55)');
    g.addColorStop(1, outer);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, S, S);
  }, { srgb: false, repeat: [1, 1] });
}

/** 柔和云朵贴图 */
export function cloudTexture() {
  return canvasTexture(256, (ctx, S) => {
    const rand = mulberry32(999);
    ctx.clearRect(0, 0, S, S);
    for (let i = 0; i < 22; i++) {
      const x = S * 0.5 + (rand() - 0.5) * S * 0.62;
      const y = S * 0.55 + (rand() - 0.5) * S * 0.3;
      const r = S * (0.1 + rand() * 0.16);
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, 'rgba(255,252,244,0.85)');
      g.addColorStop(0.6, 'rgba(248,238,222,0.42)');
      g.addColorStop(1, 'rgba(240,228,208,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }, { srgb: false });
}

/** 天空渐变（作为 skybox 贴图） */
export function skyGradient(top, mid, bottom) {
  return canvasTexture(64, (ctx, S) => {
    const g = ctx.createLinearGradient(0, 0, 0, S);
    g.addColorStop(0, top);
    g.addColorStop(0.55, mid);
    g.addColorStop(1, bottom);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, S, S);
  }, { srgb: false });
}

/** 通用噪声贴图（用作 roughnessMap/bumpMap） */
export function noiseBump(repeat = [4, 4], scale = 1) {
  return canvasTexture(256, (ctx, S) => {
    const img = ctx.createImageData(S, S);
    for (let y = 0; y < S; y++) {
      for (let x = 0; x < S; x++) {
        const v = fbm(x / 22, y / 22, 3, 4);
        const c = Math.floor(v * 255 * scale);
        const i = (y * S + x) * 4;
        img.data[i] = c; img.data[i + 1] = c; img.data[i + 2] = c; img.data[i + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
  }, { srgb: false, repeat });
}
