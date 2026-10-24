'use client'

import { useState } from 'react'
import { ChevronDown, X } from 'lucide-react'
import { INTRO, SECTIONS } from '@/lib/castle/content'
import { cn } from '@/lib/utils'

export type GuideItem = {
  key: string
  title: string
  tag: string
  body: string
  interior?: boolean
  time?: string
}

type Item = GuideItem

type GuidePanelProps = {
  open: boolean
  onClose: () => void
  activeKey: string | null
  onSelect: (item: Item) => void
}

export function GuidePanel({ open, onClose, activeKey, onSelect }: GuidePanelProps) {
  const [sectionId, setSectionId] = useState(SECTIONS[0].id)
  const section = SECTIONS.find((s) => s.id === sectionId) ?? SECTIONS[0]

  if (!open) return null

  return (
    <aside
      aria-label="城堡图鉴"
      className="paper absolute inset-x-3 bottom-24 z-20 flex max-h-[46dvh] flex-col overflow-hidden rounded-2xl border md:inset-x-auto md:bottom-28 md:left-5 md:top-5 md:max-h-none md:w-[380px]"
    >
      <header className="flex items-start justify-between gap-3 px-5 pb-3 pt-5">
        <div className="flex flex-col gap-1">
          <p className="text-xs font-medium tracking-[0.3em] text-muted-foreground">FLOATING CASTLE</p>
          <h2 className="font-serif text-2xl font-bold text-balance text-foreground">{INTRO.title}</h2>
          <p className="text-sm text-muted-foreground">{INTRO.subtitle}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="收起图鉴"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      </header>

      <p className="hidden px-5 pb-4 text-sm leading-relaxed text-pretty text-foreground/80 md:block">{INTRO.body}</p>

      <div role="tablist" aria-label="图鉴分类" className="mx-5 flex gap-1 rounded-full bg-secondary p-1">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            role="tab"
            type="button"
            aria-selected={s.id === sectionId}
            onClick={() => setSectionId(s.id)}
            className={cn(
              'flex-1 rounded-full px-2 py-1.5 text-sm font-medium transition-colors',
              s.id === sectionId ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      <ul role="tabpanel" className="scrollbar-soft mt-3 flex flex-1 flex-col overflow-y-auto px-3 pb-4">
        {(section.items as GuideItem[]).map((item) => {
          const active = item.key === activeKey
          return (
            <li key={item.key} className="border-b border-border/70 last:border-b-0">
              <button
                type="button"
                onClick={() => onSelect(item)}
                aria-expanded={active}
                className={cn(
                  'flex w-full items-center gap-3 rounded-xl px-2 py-3 text-left transition-colors hover:bg-secondary/70',
                  active && 'bg-secondary/70',
                )}
              >
                <span
                  className={cn('size-2 shrink-0 rounded-full', active ? 'bg-accent' : 'bg-border')}
                  aria-hidden="true"
                />
                <span className="flex-1 font-serif text-base font-medium text-foreground">{item.title}</span>
                <span className="rounded-full border px-2 py-0.5 text-xs text-muted-foreground">{item.tag}</span>
                <ChevronDown
                  className={cn('size-4 text-muted-foreground transition-transform', active && 'rotate-180')}
                  aria-hidden="true"
                />
              </button>
              {active && (
                <p className="px-2 pb-4 pl-7 text-sm leading-relaxed text-pretty text-foreground/85 animate-in fade-in slide-in-from-top-1">
                  {item.body}
                </p>
              )}
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
