'use client'

import * as React from 'react'
import {
  Box,
  ChevronDown,
  Clock,
  Compass,
  Download,
  Eye,
  Layers,
  MapPin,
  Moon,
  Pause,
  Play,
  RotateCw,
  Sparkles,
  Star,
  Sun,
  Users,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Hotspot } from '@/lib/scene/hotspots'
import type { CharacterInfo } from '@/lib/scene/characters'

/* ------------------------------------------------------------------ */
/* 基础控件                                                            */
/* ------------------------------------------------------------------ */

function Toggle({
  checked,
  onChange,
  label,
  icon,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
  icon?: React.ReactNode
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-3 rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-accent/60"
    >
      <span className="flex items-center gap-2 text-[13px] text-foreground/85">
        {icon}
        {label}
      </span>
      <span
        className={cn(
          'relative h-5 w-9 shrink-0 rounded-full border transition-colors',
          checked ? 'border-primary/50 bg-primary/70' : 'border-border bg-muted',
        )}
      >
        <span
          className={cn(
            'absolute top-0.5 h-3.5 w-3.5 rounded-full bg-card shadow-sm transition-all',
            checked ? 'left-[18px]' : 'left-0.5',
          )}
        />
      </span>
    </button>
  )
}

function PanelShell({
  title,
  icon,
  children,
  className,
  collapsible = true,
  defaultOpen = true,
  align = 'left',
}: {
  title: string
  icon?: React.ReactNode
  children: React.ReactNode
  className?: string
  collapsible?: boolean
  defaultOpen?: boolean
  align?: 'left' | 'right'
}) {
  const [open, setOpen] = React.useState(defaultOpen)
  return (
    <section
      className={cn(
        'watercolor-surface ink-edge pointer-events-auto rounded-xl border border-border/70 bg-card/92 shadow-lg backdrop-blur-[2px]',
        className,
      )}
    >
      <header className="flex items-center gap-2 px-3 py-2">
        {icon}
        <h2 className="font-serif text-[13px] font-semibold tracking-wide text-foreground">{title}</h2>
        {collapsible && (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? '收起' : '展开'}
            className={cn(
              'ml-auto rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground',
              align === 'right' && 'ml-auto',
            )}
          >
            <ChevronDown className={cn('h-4 w-4 transition-transform', !open && '-rotate-90')} />
          </button>
        )}
      </header>
      {open && <div className="border-t border-border/60 px-3 py-2.5">{children}</div>}
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 标题卡                                                              */
/* ------------------------------------------------------------------ */

export function TitleCard({ stats }: { stats: { drawCalls: number; triangles: number } | null }) {
  return (
    <section className="watercolor-surface ink-edge pointer-events-auto max-w-[19rem] rounded-xl border border-border/70 bg-card/92 px-4 py-3 shadow-lg backdrop-blur-[2px]">
      <p className="font-mono text-[10px] tracking-[0.22em] text-primary/80 uppercase">three.js · 浮空岛</p>
      <h1 className="mt-1 font-serif text-xl leading-tight font-semibold text-balance text-foreground">
        云上的城堡
      </h1>
      <p className="mt-1.5 text-[12px] leading-relaxed text-muted-foreground">
        一座中世纪城堡被搬到浮空岛上。五层主堡可以剖开来看，里面住着国王、厨师、天文学家，
        还有一位从 B-612 来的客人。
      </p>
      {stats && (
        <p className="mt-2 font-mono text-[10px] text-muted-foreground/80">
          {stats.drawCalls} 次绘制 · {(stats.triangles / 1000).toFixed(0)}k 三角面
        </p>
      )}
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 控制面板                                                            */
/* ------------------------------------------------------------------ */

const PHASES: Array<[number, string]> = [
  [0.0, '黎明'],
  [0.14, '清晨'],
  [0.25, '正午'],
  [0.38, '午后'],
  [0.5, '黄昏'],
  [0.62, '入夜'],
  [0.75, '深夜'],
  [0.9, '凌晨'],
]

function phaseLabel(t: number) {
  let label = PHASES[0][1]
  for (const [v, name] of PHASES) if (t >= v) label = name
  return label
}

export type ControlState = {
  cutaway: boolean
  timeOfDay: number
  autoRotate: boolean
  autoCycle: boolean
  showPeople: boolean
  showHotspots: boolean
  gateOpen: boolean
  highQuality: boolean
}

export function ControlPanel({
  state,
  onChange,
  onReset,
}: {
  state: ControlState
  onChange: (patch: Partial<ControlState>) => void
  onReset: () => void
}) {
  return (
    <PanelShell title="观看方式" icon={<Compass className="h-4 w-4 text-primary" />} align="right" className="w-[15.5rem]">
      <div className="space-y-1">
        <Toggle
          checked={state.cutaway}
          onChange={(v) => onChange({ cutaway: v })}
          label="剖视主堡"
          icon={<Layers className="h-3.5 w-3.5 text-muted-foreground" />}
        />
        <Toggle
          checked={state.gateOpen}
          onChange={(v) => onChange({ gateOpen: v })}
          label="放下吊桥"
          icon={<Box className="h-3.5 w-3.5 text-muted-foreground" />}
        />
        <Toggle
          checked={state.showPeople}
          onChange={(v) => onChange({ showPeople: v })}
          label="显示人物"
          icon={<Users className="h-3.5 w-3.5 text-muted-foreground" />}
        />
        <Toggle
          checked={state.showHotspots}
          onChange={(v) => onChange({ showHotspots: v })}
          label="显示标注"
          icon={<MapPin className="h-3.5 w-3.5 text-muted-foreground" />}
        />
        <Toggle
          checked={state.autoRotate}
          onChange={(v) => onChange({ autoRotate: v })}
          label="自动环绕"
          icon={<RotateCw className="h-3.5 w-3.5 text-muted-foreground" />}
        />
        <Toggle
          checked={state.autoCycle}
          onChange={(v) => onChange({ autoCycle: v })}
          label="昼夜流转"
          icon={state.autoCycle ? <Play className="h-3.5 w-3.5 text-muted-foreground" /> : <Pause className="h-3.5 w-3.5 text-muted-foreground" />}
        />
        <Toggle
          checked={state.highQuality}
          onChange={(v) => onChange({ highQuality: v })}
          label="高画质"
          icon={<Sparkles className="h-3.5 w-3.5 text-muted-foreground" />}
        />
      </div>

      <div className="mt-3 border-t border-border/60 pt-2.5">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[12px] text-foreground/85">
            {state.timeOfDay > 0.55 && state.timeOfDay < 0.95 ? (
              <Moon className="h-3.5 w-3.5 text-muted-foreground" />
            ) : (
              <Sun className="h-3.5 w-3.5 text-muted-foreground" />
            )}
            时刻
          </span>
          <span className="font-mono text-[11px] text-primary">{phaseLabel(state.timeOfDay)}</span>
        </div>
        <input
          type="range"
          min={0}
          max={1}
          step={0.005}
          value={state.timeOfDay}
          onChange={(e) => onChange({ timeOfDay: Number(e.target.value), autoCycle: false })}
          aria-label="一天中的时刻"
          className="mt-2 w-full accent-[var(--primary)]"
        />
        <div className="mt-1 flex justify-between font-mono text-[9px] text-muted-foreground/70">
          <span>黎明</span>
          <span>正午</span>
          <span>黄昏</span>
          <span>深夜</span>
        </div>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg border border-border bg-secondary/70 px-3 py-1.5 text-[12px] text-secondary-foreground transition-colors hover:bg-secondary"
      >
        <RotateCw className="h-3.5 w-3.5" />
        回到全景
      </button>
    </PanelShell>
  )
}

/* ------------------------------------------------------------------ */
/* 楼层快捷                                                            */
/* ------------------------------------------------------------------ */

const FLOORS: Array<[string, number]> = [
  ['屋顶平台', 24.43],
  ['寝室与玫瑰室', 20.08],
  ['书房与星象室', 15.73],
  ['厨房与面包房', 11.38],
  ['大厅', 7.03],
  ['地牢与储藏室', 2.68],
]

export function FloorList({ onPick }: { onPick: (level: number) => void }) {
  return (
    <PanelShell title="主堡楼层" icon={<Layers className="h-4 w-4 text-primary" />} className="w-[13.5rem]">
      <ul className="space-y-0.5">
        {FLOORS.map(([name, level]) => (
          <li key={name}>
            <button
              type="button"
              onClick={() => onPick(level)}
              className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[12px] text-foreground/85 transition-colors hover:bg-accent/70 hover:text-foreground"
            >
              <span className="font-mono text-[10px] text-muted-foreground">{level.toFixed(1)}</span>
              {name}
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
        点击任意一层会自动开启剖视并飞到那一层。
      </p>
    </PanelShell>
  )
}

/* ------------------------------------------------------------------ */
/* 地点列表                                                            */
/* ------------------------------------------------------------------ */

export function LocationList({
  hotspots,
  activeId,
  cutaway,
  onPick,
}: {
  hotspots: Hotspot[]
  activeId: string | null
  cutaway: boolean
  onPick: (id: string) => void
}) {
  const exterior = hotspots.filter((h) => !h.interior)
  const inside = hotspots.filter((h) => h.interior)
  return (
    <PanelShell
      title="岛上的地点"
      icon={<MapPin className="h-4 w-4 text-primary" />}
      className="max-h-[min(28rem,52vh)] w-[15rem] overflow-hidden"
    >
      <div className="max-h-[min(23rem,44vh)] space-y-3 overflow-y-auto pr-1">
        <div>
          <p className="mb-1 font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">外部</p>
          <ul className="space-y-0.5">
            {exterior.map((h) => (
              <li key={h.id}>
                <button
                  type="button"
                  onClick={() => onPick(h.id)}
                  className={cn(
                    'flex w-full items-baseline gap-2 rounded-lg px-2 py-1 text-left text-[12px] transition-colors',
                    activeId === h.id
                      ? 'bg-primary/15 text-foreground'
                      : 'text-foreground/80 hover:bg-accent/70 hover:text-foreground',
                  )}
                >
                  <span className="font-mono text-[10px] text-muted-foreground">{h.index}</span>
                  <span className="truncate">{h.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-1 font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
            内部 · 需剖视
          </p>
          <ul className="space-y-0.5">
            {inside.map((h) => (
              <li key={h.id}>
                <button
                  type="button"
                  onClick={() => onPick(h.id)}
                  className={cn(
                    'flex w-full items-baseline gap-2 rounded-lg px-2 py-1 text-left text-[12px] transition-colors',
                    activeId === h.id
                      ? 'bg-primary/15 text-foreground'
                      : 'text-foreground/80 hover:bg-accent/70 hover:text-foreground',
                  )}
                >
                  <span className="font-mono text-[10px] text-muted-foreground">{h.index}</span>
                  <span className="truncate">{h.title}</span>
                </button>
              </li>
            ))}
          </ul>
          {!cutaway && (
            <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">
              这些地点在主堡内部，点击后会自动开启剖视。
            </p>
          )}
        </div>
      </div>
    </PanelShell>
  )
}

/* ------------------------------------------------------------------ */
/* 地点详情                                                            */
/* ------------------------------------------------------------------ */

export function HotspotCard({ hotspot, onClose }: { hotspot: Hotspot; onClose: () => void }) {
  return (
    <section className="watercolor-surface ink-edge pointer-events-auto w-[min(23rem,86vw)] rounded-xl border border-border/70 bg-card/94 p-4 shadow-lg backdrop-blur-[2px]">
      <div className="flex items-start gap-2">
        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/12 font-mono text-[11px] text-primary">
          {hotspot.index}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-serif text-base leading-tight font-semibold text-foreground">{hotspot.title}</h3>
          <p className="mt-0.5 text-[11px] text-primary/85">{hotspot.subtitle}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="关闭"
          className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <p className="mt-2.5 text-[12.5px] leading-relaxed text-pretty text-foreground/85">{hotspot.desc}</p>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 人物卡                                                              */
/* ------------------------------------------------------------------ */

export function CharacterCard({ info, onClose }: { info: CharacterInfo; onClose: () => void }) {
  return (
    <section className="watercolor-surface ink-edge pointer-events-auto w-[min(21rem,86vw)] rounded-xl border border-border/70 bg-card/94 p-4 shadow-lg backdrop-blur-[2px]">
      <div className="flex items-start gap-2">
        <Star className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <div className="min-w-0 flex-1">
          <h3 className="font-serif text-base leading-tight font-semibold text-foreground">{info.name}</h3>
          <p className="mt-0.5 text-[11px] text-muted-foreground">{info.role}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="关闭"
          className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <blockquote className="mt-2.5 border-l-2 border-primary/40 pl-3 font-serif text-[13px] leading-relaxed text-pretty text-foreground/90 italic">
        “{info.quote}”
      </blockquote>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 下载卡                                                              */
/* ------------------------------------------------------------------ */

export function DownloadCard({ href, size }: { href: string; size: string }) {
  return (
    <section className="watercolor-surface ink-edge pointer-events-auto rounded-xl border border-border/70 bg-card/92 px-3.5 py-3 shadow-lg backdrop-blur-[2px]">
      <p className="flex items-center gap-1.5 font-serif text-[12.5px] font-semibold text-foreground">
        <Clock className="h-3.5 w-3.5 text-primary" />
        带走这座岛
      </p>
      <p className="mt-1 max-w-[15rem] text-[11px] leading-relaxed text-muted-foreground">
        完整源码打包（含全部 three.js 场景模块），解压后 <code className="font-mono text-[10px]">pnpm i &amp;&amp; pnpm dev</code> 即可运行。
      </p>
      <a
        href={href}
        download
        className="mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-[12.5px] font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        <Download className="h-4 w-4" />
        下载 ZIP · {size}
      </a>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 提示条                                                              */
/* ------------------------------------------------------------------ */

export function HintBar() {
  return (
    <div className="pointer-events-none rounded-full border border-border/60 bg-card/80 px-3.5 py-1.5 text-[11px] text-muted-foreground shadow-sm backdrop-blur-[2px]">
      <span className="hidden sm:inline">拖拽旋转 · 滚轮缩放 · 右键平移 · </span>
      点击编号看说明 · 点击人物听他们说话
    </div>
  )
}

export function LoadingVeil({ done }: { done: boolean }) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 z-30 flex items-center justify-center bg-background transition-opacity duration-700',
        done ? 'opacity-0' : 'opacity-100',
      )}
    >
      <div className="text-center">
        <Eye className="mx-auto h-6 w-6 animate-pulse text-primary" />
        <p className="mt-3 font-serif text-sm text-foreground">正在把城堡搬到云上……</p>
        <p className="mt-1 font-mono text-[10px] text-muted-foreground">生成地形 · 砌筑城墙 · 点亮灯火</p>
      </div>
    </div>
  )
}
