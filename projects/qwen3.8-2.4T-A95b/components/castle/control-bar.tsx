'use client'

import type { TimeKey } from '@/lib/three/scene-types'
import { DuskIcon, MoonIcon, OrbitIcon, SunIcon, XRayIcon } from './icons'

const TIMES: { key: TimeKey; label: string; Icon: typeof SunIcon }[] = [
  { key: 'day', label: '白昼', Icon: SunIcon },
  { key: 'dusk', label: '黄昏', Icon: DuskIcon },
  { key: 'night', label: '星夜', Icon: MoonIcon },
]

interface ControlBarProps {
  time: TimeKey
  onTimeChange: (key: TimeKey) => void
  xray: boolean
  onXRayChange: (on: boolean) => void
  autoRotate: boolean
  onAutoRotateChange: (on: boolean) => void
}

export function ControlBar({
  time,
  onTimeChange,
  xray,
  onXRayChange,
  autoRotate,
  onAutoRotateChange,
}: ControlBarProps) {
  return (
    <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-2 rounded-xl border border-border/70 bg-card/92 px-2.5 py-2 shadow-panel backdrop-blur-md">
      <div
        role="group"
        aria-label="时间"
        className="flex items-center gap-0.5 rounded-lg bg-secondary/70 p-0.5"
      >
        {TIMES.map(({ key, label, Icon }) => {
          const active = key === time
          return (
            <button
              key={key}
              type="button"
              onClick={() => onTimeChange(key)}
              aria-pressed={active}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 font-sans text-xs transition-colors ${
                active
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="size-3.5" />
              <span>{label}</span>
            </button>
          )
        })}
      </div>

      <span aria-hidden="true" className="hidden h-6 w-px bg-border sm:block" />

      <button
        type="button"
        onClick={() => onXRayChange(!xray)}
        aria-pressed={xray}
        className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-sans text-xs transition-colors ${
          xray ? 'bg-accent text-accent-foreground' : 'bg-secondary/70 text-muted-foreground hover:text-foreground'
        }`}
      >
        <XRayIcon className="size-3.5" />
        <span>透视</span>
      </button>

      <button
        type="button"
        onClick={() => onAutoRotateChange(!autoRotate)}
        aria-pressed={autoRotate}
        className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-sans text-xs transition-colors ${
          autoRotate
            ? 'bg-accent text-accent-foreground'
            : 'bg-secondary/70 text-muted-foreground hover:text-foreground'
        }`}
      >
        <OrbitIcon className="size-3.5" />
        <span>环绕</span>
      </button>
    </div>
  )
}
