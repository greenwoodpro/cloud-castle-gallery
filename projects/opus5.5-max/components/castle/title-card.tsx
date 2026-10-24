import { Download } from 'lucide-react'

export function TitleCard() {
  return (
    <>
      <header className="pointer-events-none absolute left-3 top-3 z-20 md:left-6 md:top-6">
        <div className="paper-card pointer-events-auto max-w-[15rem] rounded-2xl border border-border px-4 py-3 md:max-w-xs md:px-5 md:py-4">
          <p className="text-[11px] tracking-[0.32em] text-muted-foreground">{'B-612 · 浮空岛'}</p>
          <h1 className="font-serif text-2xl leading-tight text-foreground md:text-3xl">星辰城堡</h1>
          <p className="mt-1 hidden text-sm leading-relaxed text-muted-foreground text-pretty md:block">
            一座漂浮在云海之上的中世纪城堡。拖拽旋转、滚轮缩放、右键平移，或从导览中选择一处地方。
          </p>
        </div>
      </header>

      <a
        href="/downloads/floating-castle.zip"
        download
        title="包含完整的 Next.js 源码，以及可直接双击打开的离线版 standalone/index.html"
        className="absolute right-3 top-3 z-20 inline-flex items-center gap-2 rounded-full border border-primary bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:right-6 md:top-6"
      >
        <Download className="size-4" aria-hidden="true" />
        <span>
          下载项目<span className="hidden sm:inline"> ZIP</span>
        </span>
      </a>
    </>
  )
}
