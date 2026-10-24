# 小王子的浮空城堡

一座绘本风格的 3D 浮空岛：剖开的四层城堡内部（厨房、王座大厅、图书馆、玫瑰房、天文台）、庭院、村庄、风车、农田、湖泊、雪山与洞穴里的小龙。

## 直接查看
双击 index.html 即可（需要支持 WebGL 的浏览器，无需联网、无需服务器）。

## 操作
- 左键拖动：旋转　滚轮 / 双指：缩放　右键 / 双指拖动：平移
- 底部按钮：切换视角（含城堡内部各房间）、白昼 / 黄昏 / 星夜、自动环绕

## 修改并重新构建
```bash
npm install
npm run build   # 由 src/ 重新生成 castle.js
```
源码位于 src/（TypeScript + three.js）：layout.ts 布局、terrain.ts 地形、buildings.ts 建筑、characters.ts 人物与动物、nature.ts 自然景观、sky.ts 天空、scene.ts 渲染与视角。
