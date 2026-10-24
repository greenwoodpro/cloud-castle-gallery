# 云端城堡 · Cloud Castle Gallery

> 一条提示词 × 6 个平台 × 12 个模型 × 25 座浮空城堡

**在线浏览 → [greenwoodpro.github.io/cloud-castle-gallery](https://greenwoodpro.github.io/cloud-castle-gallery)**

用同一句提示词，让 25 个模型各用 three.js 造一座中世纪欧洲城堡，摆在浮空岛上。
这里是全部作品的**可运行版本**与**完整工程源码**，按平台 / 模型 / 思考强度分类，页面上可以直接搜索筛选。

---

## 提示词

> 使用 three.js 画一个中世纪欧洲城堡（广义）的 3D 模型，放在浮空岛上展示，视角自由、
> 使用小王子模式的画风，温和细腻、详细描述城堡的内部构造和人物、不同地形，环境。

所有作品都由这一句生成，没有人工调参。同一个模型在不同平台/不同思考档下会给出很不一样的方案——
有的走单文件全内联，有的拆成 20 个组件，有的直接导出了 GLB。

---

## 目录结构

```
.
├── index.html          # 画廊：搜索 / 按平台·模型·强度筛选
├── data.json           # 25 个工程的结构化元数据
├── projects/           # 原始工程（源码、说明、截图、构建脚本）
│   └── <工程名>/
├── live/               # 可直接打开的静态版本（GitHub Pages 用这一份）
│   └── <工程名>/index.html
└── assets/thumbs/      # 统一的 1200×675 预览图（本仓库实拍）
```

- 想读代码 → `projects/<工程名>/`
- 想看效果 → `https://greenwoodpro.github.io/cloud-castle-gallery/live/<工程名>/`
- 想拿数据 → `data.json`（含平台、模型、强度、体积、标签、备注）

---

## 命名规则

工程目录名 = **模型** + **思考强度**，前缀表示测试平台：

| 前缀 | 平台 | 说明 |
| --- | --- | --- |
| `oc` | opencode | 终端里的开源编码代理 |
| `wb` | WorkBuddy | 腾讯的 Agent IDE |
| `model` | ModelScope 魔搭 | AMD 云端 notebook |
| `trae` | Trae Code | 字节的 AI IDE |
| `arena` | Arena · Kibitz | 竞技场里的匿名模型（疑似 Kimi K3.1） |
| 无前缀 | v0.app | Vercel 的生成式 UI 平台 |

后缀表示思考强度：`-high` / `-xhigh` / `-max`，**没有后缀就是默认档**。
`1017` 指 DeepSeek V4.1 Flash 的 1017 版本号。

> ⚠️ `wbds1017-xhigh` 与 `wbglm5.3flash-xhigh` 两个目录后缀写成了 xhigh，实际跑的是 **max** 档，
> 表格里已按 max 标注（带 \* 号）。保留原文件夹名是为了和本地存档一致。

---

## 全部工程

| # | 目录 | 平台 | 模型 | 强度 | 作品 | 技术栈 | 预览 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | [`astra-max`](projects/astra-max) | v0.app | astra（GPT 系） | max | 云屿 · 风栖城堡 | Next.js · R3F · Drei | [▶](https://greenwoodpro.github.io/cloud-castle-gallery/live/astra-max/) |
| 2 | [`astra-xhigh`](projects/astra-xhigh) | v0.app | astra（GPT 系） | xhigh | 星屿 STAR ISLE | 单文件 HTML · R3F | [▶](https://greenwoodpro.github.io/cloud-castle-gallery/live/astra-xhigh/) |
| 3 | [`argon-high`](projects/argon-high) | v0.app | argon（Gemini 4） | high | B-612 浮空星屿 | Next.js · Three.js | [▶](https://greenwoodpro.github.io/cloud-castle-gallery/live/argon-high/) |
| 4 | [`fable5.1-max`](projects/fable5.1-max) | v0.app | Fable 5.1 | max | 浮空岛上的中世纪城堡 | Next.js · R3F | [▶](https://greenwoodpro.github.io/cloud-castle-gallery/live/fable5.1-max/) |
| 5 | [`gpt6.1sol-max`](projects/gpt6.1sol-max) | v0.app | GPT-6.1 Sol | max | 云间之境 | Next.js · R3F · GLB | [▶](https://greenwoodpro.github.io/cloud-castle-gallery/live/gpt6.1sol-max/) |
| 6 | [`gpt6.1sol-xhigh`](projects/gpt6.1sol-xhigh) | v0.app | GPT-6.1 Sol | xhigh | 风住的地方 | Next.js · R3F · GLB | [▶](https://greenwoodpro.github.io/cloud-castle-gallery/live/gpt6.1sol-xhigh/) |
| 7 | [`kimik3-max`](projects/kimik3-max) | v0.app | Kimi K3 | max | 浮空岛城堡 | Next.js · R3F | [▶](https://greenwoodpro.github.io/cloud-castle-gallery/live/kimik3-max/) |
| 8 | [`opus5.5-max`](projects/opus5.5-max) | v0.app | Claude Opus 5.5 | max | 星辰城堡 | Next.js · Three.js | [▶](https://greenwoodpro.github.io/cloud-castle-gallery/live/opus5.5-max/) |
| 9 | [`opus5.5-xhigh`](projects/opus5.5-xhigh) | v0.app | Claude Opus 5.5 | xhigh | 云上城堡 | Next.js · R3F | [▶](https://greenwoodpro.github.io/cloud-castle-gallery/live/opus5.5-xhigh/) |
| 10 | [`opus5.5-high`](projects/opus5.5-high) | v0.app | Claude Opus 5.5 | high | 星屿城堡 | 单文件 HTML · Three.js | [▶](https://greenwoodpro.github.io/cloud-castle-gallery/live/opus5.5-high/) |
| 11 | [`sonnet5.5-max`](projects/sonnet5.5-max) | v0.app | Claude Sonnet 5.5 | max | 小王子的浮空城堡 | TypeScript · esbuild | [▶](https://greenwoodpro.github.io/cloud-castle-gallery/live/sonnet5.5-max/) |
| 12 | [`modelds1017-high`](projects/modelds1017-high) | ModelScope 魔搭 | DeepSeek V4.1 Flash 1017 | high | 星海上的城堡 | 原生 ES Module · Three.js | [▶](https://greenwoodpro.github.io/cloud-castle-gallery/live/modelds1017-high/) |
| 13 | [`modelqwen3.8flash-high`](projects/modelqwen3.8flash-high) | ModelScope 魔搭 | Qwen 3.8 Flash | high | 小王子的石头王国 | 单文件 HTML | [▶](https://greenwoodpro.github.io/cloud-castle-gallery/live/modelqwen3.8flash-high/) |
| 14 | [`ocdsv4.1-high`](projects/ocdsv4.1-high) | opencode | DeepSeek V4.1 | high | 浮空岛 · 中世纪城堡 | 原生 JS · Three.js | [▶](https://greenwoodpro.github.io/cloud-castle-gallery/live/ocdsv4.1-high/) |
| 15 | [`ocdsv4.1f-max`](projects/ocdsv4.1f-max) | opencode | DeepSeek V4.1 Flash | max | 小王子与浮空城堡 | 单文件 HTML | [▶](https://greenwoodpro.github.io/cloud-castle-gallery/live/ocdsv4.1f-max/) |
| 16 | [`ocds1017-high`](projects/ocds1017-high) | opencode | DeepSeek V4.1 Flash 1017 | high | 星尘城堡 | 原生 JS · Three.js | [▶](https://greenwoodpro.github.io/cloud-castle-gallery/live/ocds1017-high/) |
| 17 | [`ocds1017-max`](projects/ocds1017-max) | opencode | DeepSeek V4.1 Flash 1017 | max | 云上城堡 | 原生 JS · Three.js | [▶](https://greenwoodpro.github.io/cloud-castle-gallery/live/ocds1017-max/) |
| 18 | [`traeqwen3.8f-xhigh`](projects/traeqwen3.8f-xhigh) | Trae Code | Qwen 3.8 Flash | xhigh | 浮空岛 · 中世纪城堡 | 单文件 HTML | [▶](https://greenwoodpro.github.io/cloud-castle-gallery/live/traeqwen3.8f-xhigh/) |
| 19 | [`wbds1017-xhigh`](projects/wbds1017-xhigh) | WorkBuddy | DeepSeek V4.1 Flash 1017 | max * | 浮空岛上的城堡 | 单文件 HTML · Three.js | [▶](https://greenwoodpro.github.io/cloud-castle-gallery/live/wbds1017-xhigh/) |
| 20 | [`wbglm5.3flash-xhigh`](projects/wbglm5.3flash-xhigh) | WorkBuddy | GLM 5.3 Flash | max * | 小王子的浮空城堡 | 单文件 HTML · Three.js | [▶](https://greenwoodpro.github.io/cloud-castle-gallery/live/wbglm5.3flash-xhigh/) |
| 21 | [`wbhy4preview-high`](projects/wbhy4preview-high) | WorkBuddy | Hunyuan 4 Preview | high | 云端城堡 | 单文件 HTML · Three.js | [▶](https://greenwoodpro.github.io/cloud-castle-gallery/live/wbhy4preview-high/) |
| 22 | [`wbminimaxm3.1flash-max`](projects/wbminimaxm3.1flash-max) | WorkBuddy | MiniMax M3.1 Flash | max | 浮空岛上的城堡 | 原生 JS · Three.js | [▶](https://greenwoodpro.github.io/cloud-castle-gallery/live/wbminimaxm3.1flash-max/) |
| 23 | [`wbmimo2.6fp`](projects/wbmimo2.6fp) | WorkBuddy | MiMo 2.6 FP | 默认 | 小王子的浮空城堡 | 单文件 HTML · Three.js | [▶](https://greenwoodpro.github.io/cloud-castle-gallery/live/wbmimo2.6fp/) |
| 24 | [`wbstep5preview-high`](projects/wbstep5preview-high) | WorkBuddy | Step 5 Preview | high | 云端城堡 | 单文件 HTML · Three.js | [▶](https://greenwoodpro.github.io/cloud-castle-gallery/live/wbstep5preview-high/) |
| 25 | [`arenakibitz`](projects/arenakibitz) | Arena · Kibitz | Kibitz（疑似 Kimi K3.1） | 默认 | 云上玫瑰堡 | Vite · React · Three.js | [▶](https://greenwoodpro.github.io/cloud-castle-gallery/live/arenakibitz/) |

---

## 统计

**按平台**：v0.app 11 · WorkBuddy 6 · opencode 4 · ModelScope 魔搭 2 · Trae Code 1 · Arena · Kibitz 1

**按模型**：DeepSeek 6 · GPT 4 · Claude 4 · Kimi 2 · Qwen 2 · Gemini 1 · Fable 1 · GLM 1 · Hunyuan 1 · MiniMax 1 · MiMo 1 · Step 1

**按强度**：max 11 · xhigh 4 · high 8 · 默认 2

**工程源码合计**：61 MB / 489 个文件

---

## 工程形态观察（哪些需要编译）

这 25 个工程的技术形态差异很大，大致分三类：

| 形态 | 数量 | 怎么跑 |
| --- | --- | --- |
| 静态 HTML / 原生 ES Module | 15 | 丢进任意静态服务器即可（`live/` 里已经是可直接跑的版本） |
| Vite + React | 1 | `npm i && npm run build`（`vite-plugin-singlefile` 打成单文件） |
| Next.js + React Three Fiber | 9 | `npm i && npm run build`，其中 4 个还额外带了作者自己打的 standalone 产物 |

几个具体发现：

- **体积不是水平指标。** 最小的 `traeqwen3.8f-xhigh` 只有 32 KB 单文件；最大的 `gpt6.1sol-max` 17 MB，
  因为它同时导出了 `castle-interior.glb` 与 `cloud-castle.glb` 两套模型。但两者的场景密度差得没那么多。
- **Next.js 工程的构建产物会膨胀到 10 MB 上下**，绝大部分是 `next/font` 把 Noto Sans/Serif SC 的中文子集
  一起内联进来的 woff2——字体比场景代码大一个数量级。
- **`argon-high` 自带的 standalone 版是坏的**：脚本要 `document.getElementById('encyclopedia-list')`，
  但那个节点在 HTML 里不存在，页面直接抛异常白屏。本仓库的预览改用它的 Next 源码重新构建，
  原 standalone 文件仍保留在 `projects/argon-high/standalone/` 里作为证据。
- **`fable5.1-max` 带了一个 `app/api/download/route.ts`**，这在 `output: 'export'` 下无法静态导出，
  构建时临时移出（原文件在 `projects/fable5.1-max/app/api/` 完好无损）。
- **只有 3 个 Next.js 工程留了成品页**（`astra-xhigh/index.html`、`gpt6.1sol-max/离线展示.html`、
  `opus5.5-max/standalone/`），另外 6 个必须 `npm install` 才能看到效果。
  换句话说：**大部分参赛作品是「一次性页面」，工程化程度更多取决于平台而不是模型**——
  v0 出来的清一色 Next.js 组件树，opencode / 魔搭出来的清一色「一个 HTML 拆几个 ES Module」。

---

## 关于在线预览

GitHub Pages 只能托管静态文件，所以：

1. 单文件 / ES Module 类工程，原样搬进 `live/`，相对路径不变。
2. Next.js / Vite 工程，构建时加了三行配置：`output: 'export'`、`basePath`、`assetPrefix`
   指向 `/cloud-castle-gallery/live/<工程名>`，除此之外**没有改动任何场景代码**。
3. `live/gpt6.1sol-max/` 用的是作者自己导出的 `离线展示.html`（GLB 已 base64 内联），
   所以目录里没有 `models/`——原模型在 `projects/gpt6.1sol-max/models/`。

本地跑整套：

```bash
cd cloud-castle-gallery
python -m http.server 8080
# 打开 http://localhost:8080/   ← 画廊
# 打开 http://localhost:8080/live/<工程名>/  ← 单个作品
```

> Next.js 构建出的那几份页面，`basePath` 写死了 `/cloud-castle-gallery`，
> 所以本地要在**上级目录**起服务、并让仓库目录名保持 `cloud-castle-gallery`，否则资源会 404。

---

## 声明

- 所有场景由各模型生成，未做人工修改；构建配置的改动仅限于上面第 2 条。
- 截图（`assets/thumbs/`）是本仓库用无头 Chromium 统一拍的 1200×675，不是各工程自带的那几张。
- 作品里的第三方库（three.js、React Three Fiber、字体等）版权归各自作者；
  引用了第三方字体的工程在 `projects/<工程名>/` 里保留了自己的 LICENSE 文件。
- 这个仓库是一次横向测评的存档，不是产品。

---

<sub>Generated 2026-10-24 · 25 件作品 · 61 MB 源码</sub>
