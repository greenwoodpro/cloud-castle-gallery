'use client'

import { Compass, Star, X } from 'lucide-react'
import { CATEGORIES, LOCATIONS, type Category } from '@/lib/castle/locations'
import { cn } from '@/lib/utils'

interface GuidePanelProps {
  category: Category
  onCategoryChange: (category: Category) => void
  selectedId: string | null
  onSelect: (id: string) => void
  open: boolean
  onOpenChange: (open: boolean) => void
}

function GuideContent({ category, onCategoryChange, selectedId, onSelect }: Omit<GuidePanelProps, 'open' | 'onOpenChange'>) {
  const items = LOCATIONS.filter((l) => l.category === category)
  const hint = CATEGORIES.find((c) => c.id === category)?.hint

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3">
      <div role="tablist" aria-label="导览分类" className="flex flex-wrap gap-1.5">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            role="tab"
            aria-selected={c.id === category}
            onClick={() => onCategoryChange(c.id)}
            className={cn(
              'rounded-full border px-3 py-1 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
              c.id === category
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-card text-foreground hover:bg-secondary',
            )}
          >
            {c.label}
          </button>
        ))}
      </div>
      <p className="text-xs leading-relaxed text-muted-foreground">{hint}</p>
      <ul className="scrollbar-thin -mr-2 flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto pr-2" role="tabpanel">
        {items.map((l) => {
          const active = l.id === selectedId
          return (
            <li key={l.id}>
              <button
                type="button"
                onClick={() => onSelect(l.id)}
                aria-current={active ? 'true' : undefined}
                className={cn(
                  'group flex w-full items-start gap-2.5 rounded-xl px-3 py-2 text-left transition-colors focus-visible:outline-2 focus-visible:outline-primary',
                  active ? 'bg-secondary' : 'hover:bg-secondary/70',
                )}
              >
                <Star
                  className={cn(
                    'mt-1 size-3.5 shrink-0 transition-colors',
                    active ? 'fill-accent text-accent' : 'text-muted-foreground/60 group-hover:text-accent',
                  )}
                  aria-hidden="true"
                />
                <span className="flex min-w-0 flex-col">
                  <span className="text-[15px] font-semibold leading-snug text-foreground">{l.name}</span>
                  <span className="text-xs leading-relaxed text-muted-foreground">{l.subtitle}</span>
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function GuidePanel(props: GuidePanelProps) {
  const { open, onOpenChange, ...content } = props

  return (
    <>
      <nav
        aria-label="城堡导览"
        className="paper-card absolute left-6 top-[12.25rem] z-20 hidden max-h-[calc(100dvh-19rem)] w-80 flex-col gap-3 rounded-2xl border border-border p-4 md:flex"
      >
        <p className="flex items-center gap-2 font-serif text-xl text-foreground">
          <Compass className="size-4 text-primary" aria-hidden="true" />
          导览手册
        </p>
        <GuideContent {...content} />
      </nav>

      <button
        type="button"
        onClick={() => onOpenChange(true)}
        className="paper-card absolute bottom-20 left-3 z-20 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground md:hidden"
      >
        <Compass className="size-4 text-primary" aria-hidden="true" />
        导览
      </button>

      {open && (
        <div className="absolute inset-0 z-40 flex flex-col justify-end md:hidden" role="dialog" aria-modal="true" aria-label="城堡导览">
          <button type="button" className="absolute inset-0 bg-foreground/30" aria-label="关闭导览" onClick={() => onOpenChange(false)} />
          <div className="relative flex max-h-[70dvh] flex-col gap-3 rounded-t-3xl border-t border-border bg-card p-4 pb-6">
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-2 font-serif text-xl text-foreground">
                <Compass className="size-4 text-primary" aria-hidden="true" />
                导览手册
              </p>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="rounded-full p-2 text-muted-foreground hover:bg-secondary"
                aria-label="关闭导览"
              >
                <X className="size-4" />
              </button>
            </div>
            <GuideContent {...content} />
          </div>
        </div>
      )}
    </>
  )
}
