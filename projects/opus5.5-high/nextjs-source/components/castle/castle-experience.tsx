'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { BookOpen } from 'lucide-react'
import { GuidePanel, type GuideItem } from './guide-panel'
import { ControlBar, type TimeOfDay } from './control-bar'

type CastleApi = {
  flyTo: (key: string) => void
  setCutaway: (on: boolean) => void
  setTimeOfDay: (name: TimeOfDay) => void
  setAutoRotate: (on: boolean) => void
  dispose: () => void
}


export function CastleExperience() {
  const mountRef = useRef<HTMLDivElement>(null)
  const apiRef = useRef<CastleApi | null>(null)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const [time, setTime] = useState<TimeOfDay>('day')
  const [cutaway, setCutaway] = useState(false)
  const [autoRotate, setAutoRotate] = useState(true)
  const [activeKey, setActiveKey] = useState<string | null>(null)
  const [panelOpen, setPanelOpen] = useState(true)

  useEffect(() => {
    const el = mountRef.current
    if (!el) return
    let cancelled = false
    let api: CastleApi | null = null
    import('@/lib/castle/scene')
      .then(({ createFloatingCastle }) => {
        if (cancelled) return
        api = createFloatingCastle(el, { onReady: () => !cancelled && setReady(true) }) as CastleApi
        apiRef.current = api
      })
      .catch((err) => {
        console.error('[v0] Failed to start castle scene:', err)
        setFailed(true)
      })
    return () => {
      cancelled = true
      api?.dispose()
      apiRef.current = null
    }
  }, [])

  useEffect(() => {
    apiRef.current?.setTimeOfDay(time)
  }, [time, ready])

  useEffect(() => {
    apiRef.current?.setCutaway(cutaway)
  }, [cutaway, ready])

  useEffect(() => {
    apiRef.current?.setAutoRotate(autoRotate)
  }, [autoRotate, ready])

  const handleSelect = useCallback((item: GuideItem) => {
    setActiveKey((prev) => (prev === item.key ? null : item.key))
    setAutoRotate(false)
    if (item.interior) setCutaway(true)
    if (item.time) setTime(item.time as TimeOfDay)
    apiRef.current?.flyTo(item.key)
  }, [])

  const handleReset = useCallback(() => {
    setActiveKey(null)
    apiRef.current?.flyTo('overview')
  }, [])

  return (
    <main className="relative h-dvh w-full overflow-hidden bg-background">
      <h1 className="sr-only">星屿城堡：浮空岛上的中世纪城堡 3D 模型</h1>
      <div
        ref={mountRef}
        className="absolute inset-0"
        role="img"
        aria-label="可自由旋转查看的浮空岛城堡三维场景"
      />

      {!ready && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-4 bg-background">
          <div className="size-10 animate-spin rounded-full border-2 border-border border-t-accent" aria-hidden="true" />
          <p className="font-serif text-lg text-foreground">
            {failed ? '场景加载失败，请刷新页面重试' : '正在把小岛托上云端…'}
          </p>
        </div>
      )}

      <GuidePanel
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
        activeKey={activeKey}
        onSelect={handleSelect}
      />

      {!panelOpen && (
        <button
          type="button"
          onClick={() => setPanelOpen(true)}
          className="paper absolute left-4 top-4 z-20 flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
        >
          <BookOpen className="size-4" aria-hidden="true" />
          打开图鉴
        </button>
      )}

      <ControlBar
        time={time}
        onTimeChange={setTime}
        cutaway={cutaway}
        onCutawayChange={setCutaway}
        autoRotate={autoRotate}
        onAutoRotateChange={setAutoRotate}
        onReset={handleReset}
      />
    </main>
  )
}
