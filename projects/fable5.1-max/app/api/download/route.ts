import { readdir, readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import JSZip from 'jszip'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const INCLUDE_DIRS = ['app', 'components', 'lib', 'public']
const INCLUDE_FILES = ['package.json', 'tsconfig.json', 'next.config.mjs', 'postcss.config.mjs', 'components.json', 'README.md']
const SKIP = new Set(['node_modules', '.next', '.git', 'v0_memories', 'user_read_only_context'])

async function addDir(zip: JSZip, root: string, rel: string) {
  const abs = path.join(root, rel)
  const entries = await readdir(abs, { withFileTypes: true })
  for (const entry of entries) {
    if (SKIP.has(entry.name)) continue
    const entryRel = path.join(rel, entry.name)
    if (entry.isDirectory()) {
      await addDir(zip, root, entryRel)
    } else {
      zip.file(entryRel.split(path.sep).join('/'), await readFile(path.join(root, entryRel)))
    }
  }
}

export async function GET() {
  const root = process.cwd()
  const zip = new JSZip()

  for (const dir of INCLUDE_DIRS) {
    try {
      if ((await stat(path.join(root, dir))).isDirectory()) await addDir(zip, root, dir)
    } catch {
      // 目录不存在时跳过
    }
  }
  for (const file of INCLUDE_FILES) {
    try {
      zip.file(file, await readFile(path.join(root, file)))
    } catch {
      // 文件不存在时跳过
    }
  }

  const buffer = await zip.generateAsync({ type: 'uint8array', compression: 'DEFLATE', compressionOptions: { level: 6 } })

  return new Response(buffer, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': 'attachment; filename="floating-castle-threejs.zip"',
      'Cache-Control': 'no-store',
    },
  })
}
