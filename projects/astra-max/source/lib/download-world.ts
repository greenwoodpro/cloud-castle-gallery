import { WORLD_NOTES } from './world-data'
import type { WorldApi } from '@/components/world/world-canvas'

export function saveBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  setTimeout(() => URL.revokeObjectURL(url), 30_000)
}

export async function downloadWorld(api: WorldApi, onProgress: (message: string) => void) {
  onProgress('正在收集岛屿源码…')
  const [{ zipSync, unzipSync, strToU8 }, response] = await Promise.all([
    import('fflate'),
    fetch('/downloads/cloud-island-source.zip'),
  ])
  if (!response.ok) throw new Error('源码包暂时无法读取，请稍后重试。')
  const files = unzipSync(new Uint8Array(await response.arrayBuffer()))
  onProgress('正在导出完整 3D 模型…')
  const model = await api.exportModel()
  files['world.glb'] = new Uint8Array(model)
  files['岛屿手记.txt'] = strToU8(WORLD_NOTES)
  onProgress('正在保存此刻的风景…')
  const imageResponse = await fetch(api.screenshot())
  files['preview.png'] = new Uint8Array(await imageResponse.arrayBuffer())
  onProgress('正在把世界装进行囊…')
  const archive = zipSync(files, { level: 5 })
  saveBlob(new Blob([new Uint8Array(archive)], { type: 'application/zip' }), '云屿-风栖城堡-完整世界.zip')
}
