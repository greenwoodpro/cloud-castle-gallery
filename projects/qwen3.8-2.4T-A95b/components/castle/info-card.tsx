'use client'

import { findPreset } from '@/lib/three/views'
import { CloseIcon, ScrollIcon } from './icons'

interface InfoCardProps {
  presetId: string | null
  onClose: () => void
}

export function InfoCard({ presetId, onClose }: InfoCardProps) {
  const preset = findPreset(presetId)
  if (!preset) return null

  return (
    <aside
      aria-label={`${preset.label}的说明`}
      className="pointer-events-auto w-full overflow-hidden rounded-xl border border-border/70 bg-card/92 shadow-panel backdrop-blur-md sm:w-72"
    >
      <div className="flex items-start justify-between gap-2 border-b border-border/60 px-3.5 py-2.5">
        <span className="flex items-center gap-2">
          <ScrollIcon className="size-4 shrink-0 text-accent" />
          <span className="font-serif text-base leading-tight font-semibold text-foreground">{preset.label}</span>
          <span className="rounded-full bg-secondary px-1.5 py-0.5 font-sans text-[10px] text-muted-foreground">
            {preset.category}
          </span>
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="关闭说明"
          className="-mr-1 rounded-md p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <CloseIcon className="size-3.5" />
        </button>
      </div>
      <p className="px-3.5 py-3 font-sans text-[13px] leading-relaxed text-pretty text-foreground/85">
        {preset.note}
      </p>
    </aside>
  )
}
