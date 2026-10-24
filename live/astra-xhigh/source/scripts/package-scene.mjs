import { build } from 'esbuild'
import { zipSync, strToU8 } from 'fflate'
import { readFile, readdir, mkdir, writeFile, copyFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const artifacts = path.resolve(root, '../artifacts')
const output = path.join(root, 'public/downloads')
await mkdir(artifacts, { recursive: true })
await mkdir(output, { recursive: true })
const result = await build({
  entryPoints: [path.join(root, 'standalone/main.ts')],
  bundle: true,
  format: 'iife',
  platform: 'browser',
  target: ['es2020'],
  minify: true,
  legalComments: 'inline',
  write: false,
})
const template = await readFile(path.join(root, 'standalone/template.html'), 'utf8')
const script = result.outputFiles[0].text.replaceAll('</script', '<\\/script')
const fonts = await readFile(path.join(root, 'standalone/fonts.css'), 'utf8')
const html = template.replace('/*__FONTS__*/', () => fonts).replace('/*__BUNDLE__*/', () => script)
await writeFile(path.join(artifacts, 'star-isle-offline.html'), html)

const files = {
  'star-isle/index.html': strToU8(html),
  'star-isle/开始探索.txt': strToU8('星屿 STAR ISLE · 离线浮空城堡\n\n解压后双击 index.html 即可打开，无需联网，也无需安装任何依赖。\n需要支持 WebGL 的现代浏览器及硬件加速。\n\n左键拖动：旋转；右键拖动：平移；滚轮：缩放。\n手机：单指旋转，双指缩放和平移。\n选择城堡内部可打开剖视，查看宴会厅、藏书室、卧房与观星室。\n场景包含完整地形、溪流瀑布、树木花园、村舍、人物与动物。\n可切换晨光、落日、星夜，自动环游，保存 PNG 明信片，导出完整 GLB 模型。\n浮岛手记中有建筑、人物与环境的详细说明。\n\nsource 文件夹保存完整 Next.js / React Three Fiber / Three.js 项目源码。\n推荐通过 GitHub 或 v0 的 shadcn CLI 安装源码。\n独立入口源码：source/standalone/main.ts\n程序化模型源码：source/lib/world-builder.ts、castle-builder.ts、model-kit.ts\n重新打包脚本：source/scripts/package-scene.mjs\n\n这是原创幻想城堡，建筑兼具不同欧洲中世纪风格，不是历史复原。\n项目不收集数据，离线版本不使用外部字体、纹理或网络服务。\n'),
}
const folders = ['app', 'components', 'lib', 'standalone', 'scripts']
async function collect(folder) {
  for (const item of await readdir(path.join(root, folder), { withFileTypes: true })) {
    const relative = path.join(folder, item.name)
    if (item.isDirectory()) await collect(relative)
    else if (/\.(tsx?|css|mjs|json|html|txt)$/.test(item.name)) files[`star-isle/source/${relative}`] = new Uint8Array(await readFile(path.join(root, relative)))
  }
}
for (const folder of folders) await collect(folder)
for (const name of ['package.json', 'pnpm-lock.yaml', 'pnpm-workspace.yaml', 'next.config.mjs', 'postcss.config.mjs', 'tsconfig.json', 'components.json', 'next-env.d.ts', '.gitignore']) {
  files[`star-isle/source/${name}`] = new Uint8Array(await readFile(path.join(root, name)))
}
files['star-isle/THIRD-PARTY-LICENSES.txt'] = strToU8(await readFile(path.join(root, 'node_modules/three/LICENSE'), 'utf8') + '\n\n' + await readFile(path.join(root, 'standalone/FONT-LICENSES.txt'), 'utf8'))
const archive = zipSync(files, { level: 6 })
const archivePath = path.join(artifacts, 'star-isle.zip')
await writeFile(archivePath, archive)
await copyFile(archivePath, path.join(output, 'star-isle.zip'))
await copyFile(path.join(artifacts, 'star-isle-offline.html'), path.join(output, 'star-isle-offline.html'))
console.log(`Created star-isle.zip: ${(archive.byteLength / 1024 / 1024).toFixed(2)} MB, ${Object.keys(files).length} files; self-contained HTML included.`)
