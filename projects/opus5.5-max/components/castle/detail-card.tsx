'use client'

import { ChevronLeft, ChevronRight, Layers, X } from 'lucide-react'
import { CATEGORIES, LOCATIONS, type Location } from '@/lib/castle/locations'
import { cn } from '@/lib/utils'

interface DetailCardProps {
  location: Location
  onClose: () => void
  onNavigate: (id: string) => void
  cutaway: boolean
  onCutawayChange: (value: boolean) => void
}

export function DetailCard({ location, onClose, onNavigate, cutaway, onCutawayChange }: DetailCardProps) {
  const siblings = LOCATIONS.filter((l) => l.category === location.category)
  const index = siblings.findIndex((l) => l.id === location.id)
  const prev = siblings[(index - 1 + siblings.length) % siblings.length]
  const next = siblings[(index + 1) % siblings.length]
  const categoryLabel = CATEGORIES.find((c) => c.id === location.category)?.label

  return (
    <aside
      aria-live="polite"
      aria-label={`${location.name}介绍`}
      className="paper-card absolute inset-x-3 bottom-[8.5rem] z-30 flex max-h-[46dvh] flex-col rounded-2xl border border-border md:inset-x-auto md:bottom-24 md:right-6 md:top-20 md:max-h-none md:w-[23rem]"
    >
      <div className="flex items-start justify-between gap-3 border-b border-border px-5 pb-3 pt-4">
        <div className="min-w-0">
          <p className="text-xs tracking-[0.2em] text-primary">
            {categoryLabel}
            <span className="text-muted-foreground">{` · ${index + 1} / ${siblings.length}`}</span>
          </p>
          <h2 className="mt-0.5 font-serif text-2xl leading-tight text-foreground text-balance md:text-[1.7rem]">{location.name}</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">{location.subtitle}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="-mr-2 shrink-0 rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="关闭介绍"
        >
          <X className="size-4" />
        </button>
      </div>

      <div className="scrollbar-thin flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-5 py-4">
        {location.paragraphs.map((p, i) => (
          <p key={i} className="text-[15px] leading-relaxed text-foreground text-pretty">
            {p}
          </p>
        ))}
        <dl className="grid grid-cols-1 gap-2 rounded-xl bg-secondary/70 p-3">
          {location.facts.map((f) => (
            <div key={f.label} className="flex gap-3 text-sm">
              <dt className="w-16 shrink-0 text-muted-foreground">{f.label}</dt>
              <dd className="leading-relaxed text-foreground">{f.value}</dd>
            </div>
          ))}
        </dl>
        {location.cutaway && (
          <button
            type="button"
            onClick={() => onCutawayChange(!cutaway)}
            aria-pressed={cutaway}
            className={cn(
              'inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors',
              cutaway
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-card text-foreground hover:bg-secondary',
            )}
          >
            <Layers className="size-4" aria-hidden="true" />
            {cutaway ? '剖面视图：已打开' : '打开剖面视图看内部'}
          </button>
        )}
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-border px-3 py-2">
        <button
          type="button"
          onClick={() => onNavigate(prev.id)}
          className="inline-flex min-w-0 items-center gap-1 rounded-full px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-secondary"
        >
          <ChevronLeft className="size-4 shrink-0" aria-hidden="true" />
          <span className="truncate">{prev.name}</span>
        </button>
        <button
          type="button"
          onClick={() => onNavigate(next.id)}
          className="inline-flex min-w-0 items-center gap-1 rounded-full px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-secondary"
        >
          <span className="truncate">{next.name}</span>
          <ChevronRight className="size-4 shrink-0" aria-hidden="true" />
        </button>
      </div>
    </aside>
  )
}
