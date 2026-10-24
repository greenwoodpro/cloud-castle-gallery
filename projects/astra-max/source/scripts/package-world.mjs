import { readdir, readFile, mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { zipSync, strToU8 } from 'fflate'

const root = process.cwd()
const files = {}
const permittedRoots = ['app', 'components', 'lib', 'scripts']
const permittedFiles = ['package.json', 'pnpm-lock.yaml', 'pnpm-workspace.yaml', 'tsconfig.json', 'next-env.d.ts', 'next.config.mjs', 'postcss.config.mjs', 'components.json', '.gitignore']

async function collect(directory) {
  for (const entry of await readdir(path.join(root, directory), { withFileTypes: true })) {
    if (entry.name.startsWith('.') || entry.isSymbolicLink()) continue
    const relative = path.join(directory, entry.name)
    if (entry.isDirectory()) await collect(relative)
    else if (/\.(tsx?|jsx?|mjs|css|json|svg)$/.test(entry.name)) files[`source/${relative}`] = new Uint8Array(await readFile(path.join(root, relative)))
  }
}

for (const directory of permittedRoots) await collect(directory)
for (const file of permittedFiles) files[`source/${file}`] = new Uint8Array(await readFile(path.join(root, file)))
for (const file of ['icon.svg', 'icon-light-32x32.png', 'icon-dark-32x32.png', 'apple-icon.png']) {
  try { files[`source/public/${file}`] = new Uint8Array(await readFile(path.join(root, 'public', file))) } catch {}
}
files['使用说明.txt'] = strToU8(`云屿 · 风栖城堡\n\n完整项目源码位于 source 文件夹。\n技术栈：Next.js、React、Three.js、React Three Fiber、Drei。\n\n推荐通过 GitHub 导入 source 文件夹，并连接 Vercel 部署。也可使用 v0 提供的 shadcn CLI 导出流程安装。开发环境支持 pnpm，开发脚本为 dev，生产构建脚本为 build。\n\n页面顶部「下载世界」会把完整场景 world.glb、当前视角 preview.png、中文岛屿手记与全部源码一起打包。GLB 可以在 Blender、支持 glTF 的建模软件和在线查看器中打开。GLB 是静态完整模型，交互与动态效果保存在源码中。\n\n预设模型不依赖外部贴图、模型或数据库。第一次安装依赖和构建字体需要网络。\n\n操作：鼠标左键拖动旋转，滚轮缩放，右键拖动平移。触摸屏单指旋转，双指缩放与平移。使用剖面开关查看真实的三层室内。\n`)
const destination = path.join(root, 'public', 'downloads')
await mkdir(destination, { recursive: true })
const archive = zipSync(files, { level: 6 })
await writeFile(path.join(destination, 'cloud-island-source.zip'), archive)
console.log(`World source archive: ${Object.keys(files).length} files, ${(archive.byteLength / 1024).toFixed(0)} KB`)
