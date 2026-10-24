'use client'

import { Compass, Download, Layers, Moon, RotateCw, Sun, Sunset } from 'lucide-react'
import { cn } from '@/lib/utils'

export type TimeOfDay = 'day' | 'dusk' | 'night'

const TIME_OPTIONS: { id: TimeOfDay; label: string; Icon: typeof Sun }[] = [
  { id: 'day', label: '白昼', Icon: Sun },
  { id: 'dusk', label: '黄昏', Icon: Sunset },
  { id: 'night', label: '星夜', Icon: Moon },
]

type ControlBarProps = {
  time: TimeOfDay
  onTimeChange: (t: TimeOfDay) => void
  cutaway: boolean
  onCutawayChange: (on: boolean) => void
  autoRotate: boolean
  onAutoRotateChange: (on: boolean) => void
  onReset: () => void
}

export function ControlBar({
  time,
  onTimeChange,
  cutaway,
  onCutawayChange,
  autoRotate,
  onAutoRotateChange,
  onReset,
}: ControlBarProps) {
  return (
    <nav
      aria-label="场景控制"
      className="paper absolute bottom-4 left-1/2 z-20 flex max-w-[calc(100%-1.5rem)] -translate-x-1/2 items-center gap-1 overflow-x-auto rounded-full border p-1.5 md:bottom-6"
    >
      <div role="radiogroup" aria-label="时间" className="flex items-center gap-1 rounded-full bg-secondary p-1">
        {TIME_OPTIONS.map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={time === id}
            onClick={() => onTimeChange(id)}
            className={cn(
              'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
              time === id ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            <Icon className="size-4" aria-hidden="true" />
            <span className="hidden sm:inline">{label}</span>
            <span className="sr-only sm:hidden">{label}</span>
          </button>
        ))}
      </div>

      <ToggleButton active={cutaway} onClick={() => onCutawayChange(!cutaway)} label="剖视主堡">
        <Layers className="size-4" aria-hidden="true" />
      </ToggleButton>
      <ToggleButton active={autoRotate} onClick={() => onAutoRotateChange(!autoRotate)} label="自动环绕">
        <RotateCw className="size-4" aria-hidden="true" />
      </ToggleButton>
      <button
        type="button"
        onClick={onReset}
        className="flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
      >
        <Compass className="size-4" aria-hidden="true" />
        <span className="hidden md:inline">全景</span>
        <span className="sr-only md:hidden">回到全景</span>
      </button>

      <a
        href="/downloads/floating-castle.zip"
        download
        className="ml-1 flex shrink-0 items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-bold text-accent-foreground transition-opacity hover:opacity-90"
      >
        <Download className="size-4" aria-hidden="true" />
        <span>
          下载<span className="hidden sm:inline"> ZIP</span>
        </span>
      </a>
    </nav>
  )
}

function ToggleButton({
  active,
  onClick,
  label,
  children,
}: {
  active: boolean
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
        'flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition-colors',
        active ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground',
      )}
    >
      {children}
      <span className="hidden md:inline">{label}</span>
      <span className="sr-only md:hidden">{label}</span>
    </button>
  )
}
