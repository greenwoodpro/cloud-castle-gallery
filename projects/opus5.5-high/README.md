# 星屿城堡 · 浮空岛上的中世纪城堡

使用 three.js (r0.186.1) 绘制，小王子风格的卡通渲染（MeshToonMaterial + 柔和渐变天空）。

## 快速打开

直接双击 `index.html` 即可在浏览器中打开（需要联网，从 jsDelivr CDN 加载 three.js 与字体）。

- 左键拖动：环绕观看
- 滚轮：缩放（可以一直推进到城堡里面）
- 右键拖动：平移
- 左侧图鉴：点击条目，镜头会飞到对应位置；内部条目会自动开启「剖视主堡」
- 底部控制栏：白昼 / 黄昏 / 星夜、剖视主堡、自动环绕、回到全景

## 目录

| 路径 | 说明 |
| --- | --- |
| `index.html` | 单文件版本，所有代码已内联，双击即可运行 |
| `src/scene.js` | three.js 场景：地形、城堡、内部陈设、人物、动物、天空、昼夜系统 |
| `src/content.js` | 城堡构造、人物、地形、环境的中文图鉴文字 |
| `src/app.js` | 原生 JS 的界面逻辑 |
| `src/index.html` | 模块化开发版本，需要用本地静态服务器打开，例如 `npx serve src` |
| `nextjs-source/` | 预览页面使用的 Next.js + React 版本源码（需安装 `three`、`lucide-react`） |

## 在自己的项目中使用

```js
import { createFloatingCastle } from './scene.js'

const api = createFloatingCastle(document.getElementById('scene'), { onReady() {} })
api.flyTo('great-hall')      // 飞到某个视角，key 见 content.js
api.setCutaway(true)         // 剖视主堡与楼梯塔
api.setTimeOfDay('dusk')     // 'day' | 'dusk' | 'night'
api.setAutoRotate(false)
api.dispose()                // 释放所有 WebGL 资源
```
