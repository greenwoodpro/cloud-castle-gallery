'use client'

import { Layers, LocateFixed, MapPin, Moon, PenLine, RotateCw, Sun, Sunrise, Sunset, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export type TimePreset = 'dawn' | 'noon' | 'dusk' | 'night'

export const TIME_PRESETS: Record<TimePreset, { label: string; hour: number; icon: LucideIcon }> = {
  dawn: { label: '清晨', hour: 6.9, icon: Sunrise },
  noon: { label: '正午', hour: 12, icon: Sun },
  dusk: { label: '黄昏', hour: 17.6, icon: Sunset },
  night: { label: '星夜', hour: 22.5, icon: Moon },
}

interface ControlDockProps {
  preset: TimePreset
  onPresetChange: (preset: TimePreset) => void
  cutaway: boolean
  onCutawayChange: (value: boolean) => void
  autoRotate: boolean
  onAutoRotateChange: (value: boolean) => void
  outlines: boolean
  onOutlinesChange: (value: boolean) => void
  showMarkers: boolean
  onShowMarkersChange: (value: boolean) => void
  onReset: () => void
}

function DockButton({
  icon: Icon,
  label,
  active,
  onClick,
  pressed,
}: {
  icon: LucideIcon
  label: string
  active?: boolean
  pressed?: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={pressed}
      aria-label={label}
      title={label}
      className={cn(
        'inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full px-2.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary sm:px-3',
        active ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-secondary',
      )}
    >
      <Icon className="size-4" aria-hidden="true" />
      <span className="hidden lg:inline">{label}</span>
    </button>
  )
}

export function ControlDock(props: ControlDockProps) {
  return (
    <div
      role="toolbar"
      aria-label="场景控制"
      className="paper-card absolute bottom-4 left-1/2 z-20 flex max-w-[calc(100vw-1.5rem)] -translate-x-1/2 items-center gap-0.5 overflow-x-auto rounded-full border border-border p-1.5 md:bottom-6"
    >
      <div role="radiogroup" aria-label="时间" className="flex shrink-0 items-center gap-0.5">
        {(Object.keys(TIME_PRESETS) as TimePreset[]).map((key) => {
          const preset = TIME_PRESETS[key]
          const active = props.preset === key
          return (
            <button
              key={key}
              type="button"
              role="radio"
              aria-checked={active}
              aria-label={preset.label}
              title={preset.label}
              onClick={() => props.onPresetChange(key)}
              className={cn(
                'inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full px-2.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary sm:px-3',
                active ? 'bg-accent text-accent-foreground' : 'text-foreground hover:bg-secondary',
              )}
            >
              <preset.icon className="size-4" aria-hidden="true" />
              <span className="hidden sm:inline">{preset.label}</span>
            </button>
          )
        })}
      </div>
      <span className="mx-1 h-6 w-px shrink-0 bg-border" aria-hidden="true" />
      <DockButton icon={Layers} label="剖面视图" active={props.cutaway} pressed={props.cutaway} onClick={() => props.onCutawayChange(!props.cutaway)} />
      <DockButton icon={RotateCw} label="自动环游" active={props.autoRotate} pressed={props.autoRotate} onClick={() => props.onAutoRotateChange(!props.autoRotate)} />
      <DockButton icon={PenLine} label="墨线描边" active={props.outlines} pressed={props.outlines} onClick={() => props.onOutlinesChange(!props.outlines)} />
      <DockButton icon={MapPin} label="地点标注" active={props.showMarkers} pressed={props.showMarkers} onClick={() => props.onShowMarkersChange(!props.showMarkers)} />
      <DockButton icon={LocateFixed} label="复位视角" onClick={props.onReset} />
    </div>
  )
}
