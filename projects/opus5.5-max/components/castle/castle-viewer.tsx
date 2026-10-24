'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { CastleEngine } from '@/lib/castle/engine'
import { LOCATIONS, LOCATION_MAP, type Category } from '@/lib/castle/locations'
import { ControlDock, TIME_PRESETS, type TimePreset } from './control-dock'
import { DetailCard } from './detail-card'
import { GuidePanel } from './guide-panel'
import { LoadingVeil } from './loading-veil'
import { SceneMarkers } from './scene-markers'
import { TitleCard } from './title-card'

export function CastleViewer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const engineRef = useRef<CastleEngine | null>(null)
  const markerRefs = useRef(new Map<string, HTMLButtonElement>())
  const [ready, setReady] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [category, setCategory] = useState<Category>('architecture')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [preset, setPreset] = useState<TimePreset>('dusk')
  const [cutaway, setCutaway] = useState(false)
  const [autoRotate, setAutoRotate] = useState(true)
  const [outlines, setOutlines] = useState(true)
  const [showMarkers, setShowMarkers] = useState(true)
  const [guideOpen, setGuideOpen] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    let disposed = false
    let engine: CastleEngine | null = null

    import('@/lib/castle/engine')
      .then(({ CastleEngine }) => {
        if (disposed) return
        requestAnimationFrame(() => {
          if (disposed) return
          try {
            engine = new CastleEngine(container)
            engineRef.current = engine
            setReady(true)
          } catch (err) {
            console.error('[v0] Failed to start castle engine:', err)
            setError('你的浏览器似乎无法运行 WebGL，请换用最新版的 Chrome、Edge 或 Safari 再试一次。')
          }
        })
      })
      .catch((err) => {
        console.error('[v0] Failed to load castle engine:', err)
        setError('场景资源加载失败，请刷新页面重试。')
      })

    return () => {
      disposed = true
      engine?.dispose()
      engineRef.current = null
    }
  }, [])

  useEffect(() => {
    engineRef.current?.setTimeOfDay(TIME_PRESETS[preset].hour)
  }, [preset, ready])

  useEffect(() => {
    engineRef.current?.setCutaway(cutaway)
  }, [cutaway, ready])

  useEffect(() => {
    engineRef.current?.setAutoRotate(autoRotate)
  }, [autoRotate, ready])

  useEffect(() => {
    engineRef.current?.setOutlines(outlines)
  }, [outlines, ready])

  const markerLocations = useMemo(
    () => LOCATIONS.filter((l) => l.category === category && l.marker),
    [category],
  )

  useEffect(() => {
    const engine = engineRef.current
    if (!engine) return
    if (!showMarkers) {
      engine.setMarkers([])
      return
    }
    engine.setMarkers(
      markerLocations.flatMap((l) => {
        const element = markerRefs.current.get(l.id)
        return element && l.marker ? [{ id: l.id, position: l.marker, element }] : []
      }),
    )
  }, [markerLocations, showMarkers, ready])

  const focus = useCallback((id: string) => {
    const location = LOCATION_MAP.get(id)
    if (!location) return
    setSelectedId(id)
    setCategory(location.category)
    if (location.cutaway) setCutaway(true)
    setAutoRotate(false)
    setGuideOpen(false)
    engineRef.current?.focusLocation(location)
  }, [])

  const resetView = useCallback(() => {
    setSelectedId(null)
    engineRef.current?.resetView()
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedId(null)
        setGuideOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const selected = selectedId ? (LOCATION_MAP.get(selectedId) ?? null) : null

  return (
    <div className="absolute inset-0">
      <div ref={containerRef} className="absolute inset-0" />
      <div className="paper-grain pointer-events-none absolute inset-0 z-[1]" aria-hidden="true" />
      <div className="watercolor-vignette pointer-events-none absolute inset-0 z-[1]" aria-hidden="true" />

      {ready && showMarkers && (
        <SceneMarkers
          locations={markerLocations}
          selectedId={selectedId}
          refs={markerRefs}
          onSelect={focus}
        />
      )}

      <TitleCard />

      <GuidePanel
        category={category}
        onCategoryChange={setCategory}
        selectedId={selectedId}
        onSelect={focus}
        open={guideOpen}
        onOpenChange={setGuideOpen}
      />

      {selected && (
        <DetailCard
          location={selected}
          onClose={() => setSelectedId(null)}
          onNavigate={focus}
          cutaway={cutaway}
          onCutawayChange={setCutaway}
        />
      )}

      <ControlDock
        preset={preset}
        onPresetChange={setPreset}
        cutaway={cutaway}
        onCutawayChange={setCutaway}
        autoRotate={autoRotate}
        onAutoRotateChange={setAutoRotate}
        outlines={outlines}
        onOutlinesChange={setOutlines}
        showMarkers={showMarkers}
        onShowMarkersChange={setShowMarkers}
        onReset={resetView}
      />

      <LoadingVeil ready={ready} error={error} />
    </div>
  )
}
