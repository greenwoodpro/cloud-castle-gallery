'use client'

import { useState } from 'react'
import { VIEW_CATEGORIES, presetsByCategory, type ViewCategory } from '@/lib/three/views'
import { ChevronIcon, CompassIcon, IslandIcon, TowerIcon } from './icons'

const CATEGORY_ICON: Record<ViewCategory, typeof TowerIcon> = {
  外观: TowerIcon,
  内部: CompassIcon,
  岛上: IslandIcon,
}

interface ViewMenuProps {
  activeId: string | null
  onSelect: (id: string) => void
  open: boolean
  onToggle: () => void
}

export function ViewMenu({ activeId, onSelect, open, onToggle }: ViewMenuProps) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

  return (
    <section
      aria-label="视角列表"
      className="pointer-events-auto flex max-h-full w-full flex-col overflow-hidden rounded-xl border border-border/70 bg-card/92 shadow-panel backdrop-blur-md sm:w-60"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex items-center justify-between gap-2 border-b border-border/60 px-3.5 py-2.5 text-left transition-colors hover:bg-secondary/50"
      >
        <span className="flex items-center gap-2">
          <CompassIcon className="size-4 text-accent" />
          <span className="font-sans text-[11px] font-medium tracking-[0.2em] text-foreground uppercase">
            视角
          </span>
        </span>
        <ChevronIcon
          className={`size-3.5 text-muted-foreground transition-transform duration-300 ${open ? 'rotate-90' : ''}`}
        />
      </button>

      {open && (
        <div className="scroll-thin overflow-y-auto overscroll-contain px-2 py-2">
          {VIEW_CATEGORIES.map((category) => {
            const Icon = CATEGORY_ICON[category]
            const presets = presetsByCategory(category)
            const isCollapsed = collapsed[category]
            return (
              <div key={category} className="mb-1 last:mb-0">
                <button
                  type="button"
                  onClick={() => setCollapsed((c) => ({ ...c, [category]: !c[category] }))}
                  aria-expanded={!isCollapsed}
                  className="flex w-full items-center gap-1.5 rounded-md px-1.5 py-1.5 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Icon className="size-3.5 shrink-0" />
                  <span className="font-sans text-[10px] tracking-[0.24em] uppercase">{category}</span>
                  <span className="ml-auto font-mono text-[10px] text-muted-foreground/70">{presets.length}</span>
                </button>

                {!isCollapsed && (
                  <ul className="mt-0.5 flex flex-col gap-0.5">
                    {presets.map((preset) => {
                      const active = preset.id === activeId
                      return (
                        <li key={preset.id}>
                          <button
                            type="button"
                            onClick={() => onSelect(preset.id)}
                            aria-current={active ? 'true' : undefined}
                            className={`flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-left font-sans text-[13px] transition-colors ${
                              active
                                ? 'bg-primary text-primary-foreground'
                                : 'text-foreground/80 hover:bg-secondary hover:text-foreground'
                            }`}
                          >
                            <span
                              className={`size-1.5 shrink-0 rounded-full ${active ? 'bg-primary-foreground/80' : 'bg-border'}`}
                            />
                            <span className="truncate">{preset.label}</span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
