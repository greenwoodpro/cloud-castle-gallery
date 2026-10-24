import { readdir, readFile, mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { zipSync } from 'fflate'

const root = process.cwd()
const excluded = new Set(['node_modules', '.next', '.git', '.vercel', '.turbo', 'downloads', 'v0_memories', 'user_read_only_context'])
const files = {}

async function collect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (excluded.has(entry.name) || entry.name.startsWith('.env') || entry.name.endsWith('.tsbuildinfo') || entry.name.endsWith('.zip')) continue
    const absolute = path.join(directory, entry.name)
    const relative = path.relative(root, absolute).split(path.sep).join('/')
    if (entry.isDirectory()) await collect(absolute)
    else if (entry.isFile()) files[`cloud-castle/${relative}`] = new Uint8Array(await readFile(absolute))
  }
}

await collect(root)
const archive = zipSync(files, { level: 6 })
await mkdir(path.join(root, 'public/downloads'), { recursive: true })
await writeFile(path.join(root, 'public/downloads/cloud-castle.zip'), archive)
console.log(`Packaged ${Object.keys(files).length} files (${(archive.length / 1024).toFixed(0)} KB) into public/downloads/cloud-castle.zip`)
