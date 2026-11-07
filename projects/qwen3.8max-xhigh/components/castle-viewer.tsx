'use client'

import * as React from 'react'
import { MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'
import { HOTSPOTS, type Hotspot } from '@/lib/scene/hotspots'
import type { CharacterInfo } from '@/lib/scene/characters'
import type { SceneHandle } from '@/lib/scene/scene'
import {
  CharacterCard,
  ControlPanel,
  DownloadCard,
  FloorList,
  HintBar,
  HotspotCard,
  LoadingVeil,
  LocationList,
  TitleCard,
  type ControlState,
} from './scene-panels'

const INITIAL: ControlState = {
  cutaway: false,
  timeOfDay: 0.2,
  autoRotate: false,
  autoCycle: false,
  showPeople: true,
  showHotspots: true,
  gateOpen: false,
  highQuality: true,
}

export function CastleViewer({ zipHref, zipSize }: { zipHref: string; zipSize: string }) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const overlayRef = React.useRef<HTMLDivElement>(null)
  const handleRef = React.useRef<SceneHandle | null>(null)

  const [state, setState] = React.useState<ControlState>(INITIAL)
  const [ready, setReady] = React.useState(false)
  const [stats, setStats] = React.useState<{ drawCalls: number; triangles: number } | null>(null)
  const [hotspot, setHotspot] = React.useState<Hotspot | null>(null)
  const [character, setCharacter] = React.useState<CharacterInfo | null>(null)
  const [drawer, setDrawer] = React.useState(false)

  const patch = React.useCallback((p: Partial<ControlState>) => setState((s) => ({ ...s, ...p })), [])

  /* 挂载场景 */
  React.useEffect(() => {
    const container = containerRef.current
    const overlay = overlayRef.current
    if (!container || !overlay) return

    let cancelled = false
    let handle: SceneHandle | null = null

    void (async () => {
      const { createCastleScene } = await import('@/lib/scene/scene')
      if (cancelled || !containerRef.current || !overlayRef.current) return
      handle = createCastleScene(container, overlay)
      handleRef.current = handle

      handle.setTimeOfDay(INITIAL.timeOfDay)
      handle.setPeople(INITIAL.showPeople)
      handle.setHotspots(INITIAL.showHotspots)
      handle.setQuality(INITIAL.highQuality)
      handle.onHotspot((id) => setHotspot(id ? (HOTSPOTS.find((h) => h.id === id) ?? null) : null))
      handle.onCharacter((info) => setCharacter(info))
      handle.onReady((s) => {
        setStats(s)
        setReady(true)
      })
    })()

    return () => {
      cancelled = true
      handle?.dispose()
      handleRef.current = null
    }
  }, [])

  /* 状态同步 */
  React.useEffect(() => handleRef.current?.setCutaway(state.cutaway), [state.cutaway])
  React.useEffect(() => handleRef.current?.setTimeOfDay(state.timeOfDay), [state.timeOfDay])
  React.useEffect(() => handleRef.current?.setAutoRotate(state.autoRotate), [state.autoRotate])
  React.useEffect(() => handleRef.current?.setAutoCycle(state.autoCycle), [state.autoCycle])
  React.useEffect(() => handleRef.current?.setPeople(state.showPeople), [state.showPeople])
  React.useEffect(() => handleRef.current?.setHotspots(state.showHotspots), [state.showHotspots])
  React.useEffect(() => handleRef.current?.setGateOpen(state.gateOpen), [state.gateOpen])
  React.useEffect(() => handleRef.current?.setQuality(state.highQuality), [state.highQuality])

  const pickHotspot = React.useCallback((id: string) => {
    handleRef.current?.focusHotspot(id)
    setDrawer(false)
  }, [])

  const pickFloor = React.useCallback((level: number) => {
    handleRef.current?.focusFloor(level)
    patch({ cutaway: true })
    setDrawer(false)
  }, [patch])

  const reset = React.useCallback(() => {
    handleRef.current?.resetView()
    setHotspot(null)
    setCharacter(null)
  }, [])

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-background">
      <div ref={containerRef} className="absolute inset-0" />
      <div ref={overlayRef} className="pointer-events-none absolute inset-0 z-10 overflow-hidden" />

      <LoadingVeil done={ready} />

      <div className="pointer-events-none absolute inset-0 z-20 flex flex-col gap-3 p-3 sm:p-4">
        {/* 顶栏 */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-col gap-3">
            <TitleCard stats={stats} />
            <button
              type="button"
              onClick={() => setDrawer((v) => !v)}
              className="watercolor-surface ink-edge pointer-events-auto flex w-fit items-center gap-1.5 rounded-lg border border-border/70 bg-card/92 px-3 py-1.5 text-[12px] text-foreground shadow-lg backdrop-blur-[2px] md:hidden"
            >
              <MapPin className="h-3.5 w-3.5 text-primary" />
              岛上的地点
            </button>
          </div>
          <ControlPanel state={state} onChange={patch} onReset={reset} />
        </div>

        {/* 中部 */}
        <div className="flex min-h-0 flex-1 items-start justify-between gap-3">
          <div className={cn('flex flex-col gap-3', !drawer && 'hidden md:flex')}>
            <LocationList
              hotspots={HOTSPOTS}
              activeId={hotspot?.id ?? null}
              cutaway={state.cutaway}
              onPick={pickHotspot}
            />
            <div className="hidden lg:block">
              <FloorList onPick={pickFloor} />
            </div>
          </div>
        </div>

        {/* 底栏 */}
        <div className="flex items-end justify-between gap-3">
          <div className="flex min-w-0 flex-col gap-2">
            {character && <CharacterCard info={character} onClose={() => setCharacter(null)} />}
            {hotspot && !character && <HotspotCard hotspot={hotspot} onClose={() => setHotspot(null)} />}
          </div>
          <div className="flex shrink-0 flex-col items-end gap-2">
            <HintBar />
            <DownloadCard href={zipHref} size={zipSize} />
          </div>
        </div>
      </div>
    </div>
  )
}
