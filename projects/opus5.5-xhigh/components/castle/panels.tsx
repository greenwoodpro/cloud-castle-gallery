'use client'

import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { CATEGORIES, PLACES, type Place } from './data'
import { cn } from '@/lib/utils'

export function GuideList({
  selectedId,
  onSelect,
  onClose,
}: {
  selectedId: string | null
  onSelect: (id: string) => void
  onClose: () => void
}) {
  return (
    <nav aria-label="城堡导览" className="paper-card flex max-h-full flex-col overflow-hidden rounded-2xl">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <h2 className="font-heading text-lg text-foreground">导览目录</h2>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="关闭导览目录"
        >
          <X className="size-4" />
        </button>
      </div>
      <div className="flex flex-col gap-4 overflow-y-auto px-4 py-3">
        {CATEGORIES.map((cat) => (
          <section key={cat} className="flex flex-col gap-1.5">
            <h3 className="text-xs tracking-widest text-muted-foreground">{cat}</h3>
            <ul className="flex flex-wrap gap-1.5">
              {PLACES.filter((p) => p.category === cat).map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => onSelect(p.id)}
                    className={cn(
                      'rounded-full border px-2.5 py-1 text-sm transition-colors',
                      selectedId === p.id
                        ? 'border-foreground bg-foreground text-background'
                        : 'border-border bg-background/60 text-foreground hover:border-foreground/40 hover:bg-muted',
                    )}
                  >
                    {p.name}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </nav>
  )
}

export function InfoPanel({
  place,
  onClose,
  onStep,
}: {
  place: Place
  onClose: () => void
  onStep: (dir: 1 | -1) => void
}) {
  return (
    <article className="paper-card flex max-h-full flex-col overflow-hidden rounded-2xl" aria-live="polite">
      <header className="flex items-start justify-between gap-3 border-b border-border px-5 pb-3 pt-4">
        <div className="flex flex-col gap-1">
          <span className="text-xs tracking-widest text-primary">{place.category}</span>
          <h2 className="font-heading text-2xl leading-tight text-foreground text-balance">{place.name}</h2>
          <p className="text-xs italic text-muted-foreground">{place.latin}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="关闭介绍"
        >
          <X className="size-4" />
        </button>
      </header>
      <div className="flex flex-col gap-3 overflow-y-auto px-5 py-4">
        <p className="text-[15px] leading-relaxed text-foreground text-pretty">{place.summary}</p>
        {place.details.map((d, i) => (
          <p key={i} className="text-sm leading-relaxed text-muted-foreground text-pretty">
            {d}
          </p>
        ))}
      </div>
      <footer className="flex items-center justify-between border-t border-border px-3 py-2">
        <button
          type="button"
          onClick={() => onStep(-1)}
          className="flex items-center gap-1 rounded-full px-2 py-1 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <ChevronLeft className="size-4" />
          上一处
        </button>
        <button
          type="button"
          onClick={() => onStep(1)}
          className="flex items-center gap-1 rounded-full px-2 py-1 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          下一处
          <ChevronRight className="size-4" />
        </button>
      </footer>
    </article>
  )
}

export function ToolButton({
  active,
  onClick,
  label,
  children,
}: {
  active?: boolean
  onClick: () => void
  label: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'flex items-center gap-1.5 rounded-full px-3 py-2 text-sm transition-colors',
        active ? 'bg-foreground text-background' : 'text-foreground hover:bg-muted',
      )}
    >
      {children}
      <span className="hidden sm:inline">{label}</span>
      <span className="sr-only sm:hidden">{label}</span>
    </button>
  )
}
