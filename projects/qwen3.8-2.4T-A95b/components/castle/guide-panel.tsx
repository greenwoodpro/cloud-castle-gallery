'use client'

import { useState } from 'react'
import { GUIDE } from './guide-data'
import { ChevronIcon, CloseIcon, StarIcon } from './icons'

interface GuidePanelProps {
  open: boolean
  onClose: () => void
}

/** 城堡图鉴：构造、内部、人物、地形与环境四卷。 */
export function GuidePanel({ open, onClose }: GuidePanelProps) {
  const [activeSection, setActiveSection] = useState(GUIDE[0].id)
  const section = GUIDE.find((s) => s.id === activeSection) ?? GUIDE[0]

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="城堡图鉴"
      className="pointer-events-auto absolute inset-0 z-30 flex items-stretch justify-center bg-foreground/25 p-3 backdrop-blur-[2px] sm:p-6"
      onClick={onClose}
    >
      <div
        className="flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-panel"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-start justify-between gap-3 border-b border-border/70 px-5 py-4">
          <div>
            <div className="flex items-center gap-2 text-accent">
              <StarIcon className="size-3.5" />
              <span className="font-sans text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                Le Château
              </span>
            </div>
            <h2 className="mt-1 font-serif text-2xl font-semibold text-foreground">城堡图鉴</h2>
            <p className="mt-1 font-sans text-xs text-muted-foreground">
              构造、内部、人物、地形与环境——这座岛上一切被画出来的东西。
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="关闭图鉴"
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <CloseIcon className="size-4" />
          </button>
        </header>

        <nav aria-label="图鉴分卷" className="scroll-thin flex gap-1 overflow-x-auto border-b border-border/60 px-3 py-2">
          {GUIDE.map((s) => {
            const active = s.id === activeSection
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveSection(s.id)}
                aria-current={active ? 'true' : undefined}
                className={`shrink-0 rounded-lg px-3 py-1.5 font-sans text-xs whitespace-nowrap transition-colors ${
                  active ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
              >
                {s.title}
              </button>
            )
          })}
        </nav>

        <div className="scroll-thin flex-1 overflow-y-auto overscroll-contain px-5 py-4">
          <p className="mb-4 font-serif text-sm text-muted-foreground italic">{section.subtitle}</p>
          <dl className="flex flex-col gap-4">
            {section.entries.map((entry) => (
              <div key={entry.name} className="border-l-2 border-accent/40 pl-3.5">
                <dt className="font-serif text-[15px] font-semibold text-foreground">{entry.name}</dt>
                <dd className="mt-1 font-sans text-[13px] leading-relaxed text-pretty text-foreground/75">
                  {entry.detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <footer className="flex items-center justify-between gap-2 border-t border-border/60 px-5 py-3">
          <span className="font-sans text-[11px] text-muted-foreground">
            共 {GUIDE.reduce((n, s) => n + s.entries.length, 0)} 条
          </span>
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 font-sans text-xs text-foreground transition-colors hover:bg-secondary/70"
          >
            <ChevronIcon className="size-3.5 rotate-180" />
            <span>回到岛上</span>
          </button>
        </footer>
      </div>
    </div>
  )
}
