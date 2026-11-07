import { statSync } from 'node:fs'
import { join } from 'node:path'
import { CastleViewer } from '@/components/castle-viewer'

const ZIP_PATH = 'downloads/floating-castle.zip'

function zipSize(): string {
  try {
    const bytes = statSync(join(process.cwd(), 'public', ZIP_PATH)).size
    if (bytes > 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`
    return `${Math.max(1, Math.round(bytes / 1024))} KB`
  } catch {
    return '—'
  }
}

export default function Page() {
  return <CastleViewer zipHref={`/${ZIP_PATH}`} zipSize={zipSize()} />
}
