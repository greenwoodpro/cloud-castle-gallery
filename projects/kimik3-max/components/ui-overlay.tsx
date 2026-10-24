'use client'

import { Download, MousePointer2, Rotate3d, X, ZoomIn } from 'lucide-react'
import { SCENE_INFOS } from '@/lib/scene-data'

interface UIOverlayProps {
  selectedId: string | null
  onSelect: (id: string) => void
  onClose: () => void
}

export function UIOverlay({ selectedId, onSelect, onClose }: UIOverlayProps) {
  const info = SCENE_INFOS.find((i) => i.id === selectedId) ?? null

  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex flex-col">
      {/* 顶部栏 */}
      <header className="flex items-start justify-between gap-3 p-4 md:p-6">
        <div className="pointer-events-auto rounded-2xl border border-border bg-card/85 px-4 py-3 shadow-lg backdrop-blur-md">
          <h1 className="font-serif text-xl font-black text-card-foreground md:text-2xl">
            浮空岛城堡
          </h1>
          <p className="mt-0.5 text-xs text-muted-foreground md:text-sm">
            Le Château sur l&apos;Île Volante · 小王子画风 · Three.js
          </p>
        </div>
        <a
          href="/floating-castle-source.zip"
          download="floating-castle-source.zip"
          className="pointer-events-auto flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground shadow-lg transition-transform hover:scale-105 active:scale-95"
        >
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">下载源码 ZIP</span>
          <span className="sm:hidden">源码</span>
        </a>
      </header>

      {/* 中部：信息面板 */}
      <div className="flex flex-1 items-start justify-end overflow-hidden px-4 md:px-6">
        {info ? (
          <aside
            key={info.id}
            className="pointer-events-auto w-full max-w-sm rounded-2xl border border-border bg-card/90 shadow-xl backdrop-blur-md"
          >
            <div className="flex items-start justify-between gap-2 border-b border-border px-5 pt-4 pb-3">
              <div>
                <p className="text-[11px] font-bold tracking-widest text-accent uppercase">
                  {info.subtitle}
                </p>
                <h2 className="mt-0.5 font-serif text-xl font-black text-card-foreground">
                  {info.title}
                </h2>
              </div>
              <button
                onClick={onClose}
                aria-label="关闭"
                className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="max-h-[42vh] overflow-y-auto px-5 py-4">
              <p className="text-sm leading-relaxed text-card-foreground/90">{info.description}</p>
              <ul className="mt-3 space-y-2">
                {info.details.map((d, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" />
                    <span className="leading-relaxed">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        ) : (
          <aside className="pointer-events-auto hidden w-72 rounded-2xl border border-border bg-card/80 px-5 py-4 shadow-lg backdrop-blur-md md:block">
            <h2 className="font-serif text-base font-bold text-card-foreground">漫游指南</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              这座城堡建在漂浮的巨岩之上。点击场景中发光的金色标记，可以阅读主堡大厅、观星书房、礼拜堂、玫瑰园、麦田与人物的故事。
            </p>
          </aside>
        )}
      </div>

      {/* 底部：操作提示 + 热点导航 */}
      <footer className="flex flex-col gap-2.5 p-4 md:p-6">
        <div className="pointer-events-auto flex w-fit items-center gap-4 rounded-full border border-border bg-card/80 px-4 py-2 text-xs text-muted-foreground shadow backdrop-blur-md">
          <span className="flex items-center gap-1.5">
            <Rotate3d className="h-3.5 w-3.5" />
            拖拽旋转
          </span>
          <span className="flex items-center gap-1.5">
            <ZoomIn className="h-3.5 w-3.5" />
            滚轮缩放
          </span>
          <span className="flex items-center gap-1.5">
            <MousePointer2 className="h-3.5 w-3.5" />
            点击金色标记
          </span>
        </div>
        <nav className="scrollbar-none pointer-events-auto flex gap-2 overflow-x-auto pb-1">
          {SCENE_INFOS.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-bold whitespace-nowrap shadow-sm transition-all ${
                selectedId === item.id
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card/85 text-card-foreground hover:bg-secondary'
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  selectedId === item.id ? 'bg-primary-foreground' : 'bg-accent'
                }`}
              />
              {item.label}
            </button>
          ))}
        </nav>
      </footer>
    </div>
  )
}
