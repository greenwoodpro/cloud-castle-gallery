# 浮空岛上的中世纪城堡（Three.js / React Three Fiber）

小王子画风的 3D 城堡展示：浮空岛、城堡外部与剖面内部、人物、不同地形与昼夜环境。

## 运行

```bash
pnpm install
pnpm dev
```

打开 http://localhost:3000。

## 结构

- `components/castle/scene.tsx` – Canvas、相机与轨道控制
- `components/castle/castle.tsx` – 城墙、角楼、门楼、主楼（含剖面内部）、大厅、礼拜堂、马厩、水井、玫瑰园
- `components/castle/island.tsx` – 浮空岛岛体、草原、猴面包树林、湖泊与瀑布、麦田、小岛屿与绳桥
- `components/castle/environment.tsx` – 渐变天空、昼夜光照、太阳/月亮、小行星、云朵、候鸟
- `components/castle/characters.tsx` – 小王子、狐狸、国王、骑士、羊群、马等
- `components/castle/primitives.tsx` – 塔楼、山形屋顶、雉堞、树木等可复用几何
- `lib/castle-data.ts` – 每个元素的中文说明文字
- `app/api/download/route.ts` – 将源码打包为 ZIP 下载

## 操作

- 左键拖拽旋转，滚轮缩放，右键平移
- 点击场景元素或侧边目录查看说明
- 「剖面视图」切开主楼展示四层内部与地牢
- 「夜晚」切换到星空与窗灯模式
