import { build } from 'esbuild'
import { zipSync, unzipSync, strToU8 } from 'fflate'
import { readFile, writeFile, readdir, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Script } from 'node:vm'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

// GLTFExporter uses FileReader for binary Blobs, which Node does not provide.
class NodeFileReader {
  result = null
  onloadend = null
  onerror = null
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((result) => {
      this.result = result
      this.onloadend?.({ target: this })
    }).catch((error) => this.onerror?.(error))
  }
  readAsDataURL(blob) {
    blob.arrayBuffer().then((result) => {
      this.result = `data:${blob.type};base64,${Buffer.from(result).toString('base64')}`
      this.onloadend?.({ target: this })
    }).catch((error) => this.onerror?.(error))
  }
}
globalThis.FileReader = NodeFileReader

const [viewer, exporter] = await Promise.all([
  build({ absWorkingDir: root, entryPoints: ['offline/viewer.ts'], bundle: true, minify: true, format: 'iife', platform: 'browser', target: 'es2020', write: false, legalComments: 'none' }),
  build({ absWorkingDir: root, entryPoints: ['scripts/model-export.ts'], bundle: true, minify: true, format: 'esm', platform: 'node', target: 'es2022', write: false, legalComments: 'none' }),
])
const modelModule = await import(`data:text/javascript;base64,${Buffer.from(exporter.outputFiles[0].text).toString('base64')}`)
const models = await modelModule.exportModels()
const template = await readFile(path.join(root, 'offline/template.html'), 'utf8')
const fontDirectory = path.join(root, 'node_modules/@fontsource/noto-sans-sc')
const [fontStylesheet, viewerSource] = await Promise.all([
  readFile(path.join(fontDirectory, '400.css'), 'utf8'),
  readFile(path.join(root, 'offline/viewer.ts'), 'utf8'),
])
const usedCodePoints = [...new Set(Array.from(template + viewerSource + JSON.stringify(models.places), (character) => character.codePointAt(0)))]
const fontFaces = (fontStylesheet.match(/@font-face\s*\{[^}]*\}/g) ?? []).filter((face) => {
  const ranges = face.match(/unicode-range:\s*([^;]+);/)?.[1].split(',') ?? []
  return ranges.some((range) => {
    const [start, end = start] = range.trim().replace(/^U\+/i, '').split('-')
    const first = parseInt(start.replace(/\?/g, '0'), 16)
    const last = parseInt(end.replace(/\?/g, 'f'), 16)
    return usedCodePoints.some((codePoint) => codePoint >= first && codePoint <= last)
  })
})
if (!fontFaces.length) throw new Error('没有找到离线页面所需的中文字体分片')
const embeddedFont = (await Promise.all(fontFaces.map(async (face) => {
  const file = face.match(/url\(\.\/([^)]+\.woff2)\)/)?.[1]
  if (!file) throw new Error('字体分片缺少 WOFF2 文件')
  const bytes = await readFile(path.join(fontDirectory, file))
  return face.replace(/font-family:[^;]+;/, "font-family: 'World Sans';").replace(/src:[^;]+;/, `src: url(data:font/woff2;base64,${bytes.toString('base64')}) format('woff2');`)
}))).join('\n')
const standalone = template.replace('/*__WORLD_FONT__*/', () => embeddedFont).replace('/*__WORLD_BUNDLE__*/', () => viewer.outputFiles[0].text.replace(/<\/script/gi, '<\\/script'))
const inlineScript = standalone.match(/<script>([\s\S]*)<\/script>/)?.[1]
if (!inlineScript) throw new Error('离线展示缺少内嵌脚本')
new Script(inlineScript, { filename: 'cloud-castle-inline.js' })
const files = {
  '云间之境/离线展示.html': strToU8(standalone),
  '云间之境/models/cloud-castle.glb': models.complete,
  '云间之境/models/castle-interior.glb': models.interior,
  '云间之境/世界手记.txt': strToU8(models.places.map((place) => `${place.name}\n${place.subtitle}\n\n${place.description}\n\n${place.details.map((detail) => `${detail.title}\n${detail.text}`).join('\n\n')}`).join('\n\n────────────────────────\n\n')),
  '云间之境/使用说明.txt': strToU8(`云间之境 · 浮空城堡\n\n一、直接欣赏\n解压后，用 Chrome、Edge、Firefox 或 Safari 打开「离线展示.html」。\nThree.js、全部几何数据与所需中文字体已经打包到 HTML 中，不需要联网、不需要安装依赖、不需要本地服务器。浏览器需要支持 WebGL 并启用硬件加速。\n\n二、自由探索\n左键拖动旋转，滚轮缩放，右键拖动平移。触屏单指旋转，双指缩放与平移。\n切换「城堡内部」查看三层真实建模的房间；切换晴日、黄昏和星夜；通过下拉菜单飞往五个地点。\n空格键切换自动环游，R 键重置视角。「世界手记」记录了建筑、人物、地形与环境。\n\n三、模型文件\nmodels/cloud-castle.glb：完整浮空岛、城堡外观、内部房间、人物、植被、小镇、瀑布和云。内部房间位于外墙后，在建模软件中隐藏 castle-cutaway 和 castle-towers 即可查看。\nmodels/castle-interior.glb：已经移除遮挡外墙、屋顶和外塔的剖面版本。\n两个模型均可导入 Blender、Three.js 及支持 glTF 2.0 的软件。GLB 是静态模型；风车、旗帜、云朵的动态效果由展示程序实时驱动。\n\n四、项目源码\nsource 包含完整 Next.js + React Three Fiber 项目，以及 offline 独立 Three.js 展示源码和打包脚本。建议通过 GitHub 导入 Vercel，或在本地使用 pnpm 安装依赖后运行。\n构建命令会重新生成离线 HTML、GLB 与 ZIP；不含任何密钥或私人数据。\n\n本作品为程序化创作的童话微缩世界，并非历史建筑的测绘复原。\n`),
  '云间之境/licenses/three-MIT.txt': new Uint8Array(await readFile(path.join(root, 'node_modules/three/LICENSE'))),
  '云间之境/licenses/noto-sans-sc-OFL.txt': new Uint8Array(await readFile(path.join(fontDirectory, 'LICENSE'))),
}

async function addSource(relative) {
  const full = path.join(root, relative)
  const entries = await readdir(full, { withFileTypes: true }).catch((error) => {
    if (error.code === 'ENOTDIR') return null
    throw error
  })
  if (entries) {
    for (const entry of entries) {
      if (entry.name.startsWith('.') || entry.name === 'node_modules') continue
      await addSource(`${relative}/${entry.name}`)
    }
  } else {
    files[`云间之境/source/${relative}`] = new Uint8Array(await readFile(full))
  }
}
for (const source of ['app', 'components', 'lib', 'offline', 'scripts', 'package.json', 'pnpm-lock.yaml', 'pnpm-workspace.yaml', 'next.config.mjs', 'postcss.config.mjs', 'tsconfig.json', 'components.json', 'next-env.d.ts', 'public/icon.svg']) await addSource(source)
const zip = zipSync(files, { level: 6 })
const unpacked = unzipSync(zip)
for (const name of ['云间之境/离线展示.html', '云间之境/models/cloud-castle.glb', '云间之境/models/castle-interior.glb']) {
  if (!unpacked[name]?.length) throw new Error(`归档缺少文件：${name}`)
}
for (const bytes of [models.complete, models.interior]) {
  if (new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength).getUint32(0, true) !== 0x46546c67) throw new Error('模型不是有效的 GLB 文件')
}
const output = path.join(root, 'public/downloads')
await mkdir(output, { recursive: true })
await Promise.all([
  writeFile(path.join(output, 'cloud-castle.zip'), zip),
  writeFile(path.join(output, 'cloud-castle.html'), standalone),
  writeFile(path.join(output, 'manifest.json'), JSON.stringify({ name: '云间之境 · 浮空城堡', bytes: zip.length, files: Object.keys(files).length, meshes: models.meshes, triangles: Math.round(models.triangles), standalone: true, embeddedFont: true, fontSubsets: fontFaces.length, models: ['cloud-castle.glb', 'castle-interior.glb'] }, null, 2)),
])
console.log(`完整作品已打包：${(zip.length / 1024 / 1024).toFixed(2)} MB · ${Object.keys(files).length} 个文件 · ${models.meshes} 个合并网格 · ${Math.round(models.triangles).toLocaleString()} 个三角面`)
console.log('已验证 ZIP 解压、离线 JavaScript 语法与两个 GLB 文件头。')
