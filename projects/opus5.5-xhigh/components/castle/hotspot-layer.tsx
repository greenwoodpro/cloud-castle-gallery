'use client'

import { PLACES } from './data'
import { hotspotRegistry } from './hotspot-registry'
import { cn } from '@/lib/utils'

export function HotspotLayer({
  cutaway,
  selectedId,
  onSelect,
}: {
  cutaway: boolean
  selectedId: string | null
  onSelect: (id: string) => void
}) {
  const visible = PLACES.filter((p) => (p.interior ? cutaway : true))
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {visible.map((p) => {
        const active = p.id === selectedId
        return (
          <div
            key={p.id}
            ref={(el) => {
              if (el) hotspotRegistry.set(p.id, el)
              else hotspotRegistry.delete(p.id)
            }}
            className="absolute left-0 top-0"
            style={{ visibility: 'hidden' }}
          >
            <button
              type="button"
              onClick={() => onSelect(p.id)}
              className="group pointer-events-auto -ml-1.5 -mt-1.5 flex items-center gap-1.5 whitespace-nowrap font-serif text-xs outline-none"
              aria-label={`查看${p.name}`}
            >
              <span
                className={cn(
                  'flex size-3 items-center justify-center rounded-full border border-foreground/50 bg-background/80 opacity-80 shadow-sm transition-all group-hover:scale-125 group-hover:opacity-100 group-focus-visible:ring-2 group-focus-visible:ring-ring',
                  active && 'scale-150 bg-accent opacity-100',
                )}
              >
                <span className={cn('size-1 rounded-full bg-primary', active && 'bg-foreground')} />
              </span>
              <span
                className={cn(
                  'rounded-full border border-foreground/20 bg-background/90 px-2 py-0.5 text-foreground opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100',
                  active && 'opacity-100',
                )}
              >
                {p.name}
              </span>
            </button>
          </div>
        )
      })}
    </div>
  )
}
