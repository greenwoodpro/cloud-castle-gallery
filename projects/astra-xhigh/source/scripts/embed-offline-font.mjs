import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const text = await readFile(path.join(root, 'standalone/template.html'), 'utf8') + await readFile(path.join(root, 'lib/world-data.ts'), 'utf8') + await readFile(path.join(root, 'standalone/main.ts'), 'utf8')
const characters = [...new Set(text.match(/[\u3000-\u9fff\uff00-\uffef]/gu))].join('') + ' ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789·→↗＋－/…'
const fonts = [
  { family: 'Noto Sans SC', name: 'Star Isle Sans', text: characters, license: 'notosanssc' },
  { family: 'Noto Serif SC', name: 'Star Isle Serif', text: '在云的上面，住一会儿。云端的城堡住在星星旁的人风经过的地方', license: 'notoserifsc' },
]
const userAgent = 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'
const faces = [], licenses = []
for (const font of fonts) {
  const url = new URL('https://fonts.googleapis.com/css2')
  url.searchParams.set('family', `${font.family}:wght@400`)
  url.searchParams.set('text', font.text)
  const response = await fetch(url, { headers: { 'User-Agent': userAgent }, signal: AbortSignal.timeout(15000) })
  if (!response.ok) throw new Error(`Font CSS: ${response.status}`)
  const css = await response.text()
  const match = css.match(/src:\s*url\(([^)]+)\)\s*format\(['"]([^'"]+)/)
  if (!match) throw new Error(`Font asset URL missing: ${font.family}`)
  const asset = await fetch(match[1], { signal: AbortSignal.timeout(15000) })
  if (!asset.ok) throw new Error(`Font asset: ${asset.status}`)
  const bytes = Buffer.from(await asset.arrayBuffer())
  const format = match[2]
  faces.push(`@font-face{font-family:'${font.name}';font-style:normal;font-weight:400 500;font-display:swap;src:url(data:font/${format};base64,${bytes.toString('base64')}) format('${format}');}`)
  const license = await fetch(`https://raw.githubusercontent.com/google/fonts/main/ofl/${font.license}/OFL.txt`, { signal: AbortSignal.timeout(15000) })
  if (!license.ok) throw new Error(`Font license: ${license.status}`)
  licenses.push(`${font.family}\n\n${await license.text()}`)
  console.log(`${font.family}: ${font.text.length} characters, ${bytes.length} bytes embedded`)
}
await writeFile(path.join(root, 'standalone/fonts.css'), faces.join('\n'))
await writeFile(path.join(root, 'standalone/FONT-LICENSES.txt'), licenses.join('\n\n---\n\n'))
