'use client'

import type { RefObject } from 'react'
import type { Location } from '@/lib/castle/locations'
import { cn } from '@/lib/utils'

interface SceneMarkersProps {
  locations: Location[]
  selectedId: string | null
  refs: RefObject<Map<string, HTMLButtonElement>>
  onSelect: (id: string) => void
}

export function SceneMarkers({ locations, selectedId, refs, onSelect }: SceneMarkersProps) {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {locations.map((l) => {
        const active = l.id === selectedId
        return (
          <button
            key={l.id}
            type="button"
            ref={(el) => {
              if (el) refs.current.set(l.id, el)
              else refs.current.delete(l.id)
            }}
            onClick={() => onSelect(l.id)}
            aria-label={`前往：${l.name}`}
            className="group pointer-events-auto invisible absolute left-0 top-0 size-0 focus-visible:outline-none"
            style={{ willChange: 'transform' }}
          >
            <span
              className={cn(
                'absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-card shadow-md ring-2 transition-transform group-hover:scale-125 group-focus-visible:scale-125',
                active ? 'scale-125 bg-primary ring-accent' : 'bg-accent ring-foreground/40',
              )}
            />
            <span
              className={cn(
                'paper-card absolute left-3 -translate-y-1/2 whitespace-nowrap rounded-full border border-border px-2.5 py-0.5 text-xs font-semibold text-foreground transition-opacity',
                active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100',
              )}
            >
              {l.name}
            </span>
          </button>
        )
      })}
    </div>
  )
}
