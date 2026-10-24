'use client'

import dynamic from 'next/dynamic'
import { useCallback, useState } from 'react'
import { BookOpen, Download, House, Layers, Moon, RotateCw, Sun, Tag } from 'lucide-react'
import { PLACES, placeById } from './data'
import { GuideList, InfoPanel, ToolButton } from './panels'
import { HotspotLayer } from './hotspot-layer'
import { cn } from '@/lib/utils'
import { HOME_VIEW, cameraForPlace, type FocusRequest } from './camera'

const CastleScene = dynamic(() => import('./scene').then((m) => m.CastleScene), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <p className="font-heading text-lg text-muted-foreground">正在把小岛托上云端……</p>
    </div>
  ),
})

export function CastleExperience() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [cutaway, setCutaway] = useState(false)
  const [night, setNight] = useState(false)
  const [autoRotate, setAutoRotate] = useState(true)
  const [showLabels, setShowLabels] = useState(true)
  const [guideOpen, setGuideOpen] = useState(false)
  const [focus, setFocus] = useState<FocusRequest>(null)

  const selected = selectedId ? placeById[selectedId] : null

  const select = useCallback((id: string) => {
    const place = placeById[id]
    if (!place) return
    setSelectedId(id)
    setAutoRotate(false)
    if (place.interior) setCutaway(true)
    const view = cameraForPlace(place)
    setFocus({ ...view, id: Date.now() })
  }, [])

  const step = useCallback(
    (dir: 1 | -1) => {
      const idx = PLACES.findIndex((p) => p.id === selectedId)
      const next = PLACES[(idx + dir + PLACES.length) % PLACES.length]
      select(next.id)
    },
    [selectedId, select],
  )

  const goHome = () => {
    setSelectedId(null)
    setFocus({ position: HOME_VIEW.position.clone(), target: HOME_VIEW.target.clone(), id: Date.now() })
  }

  const toggleCutaway = () => {
    const next = !cutaway
    setCutaway(next)
    if (next) select('hall')
  }

  return (
    <main className="relative h-dvh w-full overflow-hidden bg-background">
      <h1 className="sr-only">云上城堡：漂浮在云海之上的中世纪城堡三维模型</h1>

      <div className="absolute inset-0">
        <CastleScene
          night={night}
          cutaway={cutaway}
          autoRotate={autoRotate}
          showLabels={showLabels}
          selectedId={selectedId}
          focus={focus}
        />
      </div>

      <div className={cn('paper-grain pointer-events-none absolute inset-0', night && 'opacity-30')} aria-hidden="true" />

      {showLabels && <HotspotLayer cutaway={cutaway} selectedId={selectedId} onSelect={select} />}

      <header
        className={cn(
          'pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4 transition-colors md:p-6',
          night ? 'text-background' : 'text-foreground',
        )}
      >
        <div className="pointer-events-auto flex flex-col gap-1">
          <p className="text-xs tracking-[0.3em] opacity-70">LE CHÂTEAU DANS LES NUAGES</p>
          <p className="font-heading text-3xl leading-none md:text-5xl">云上城堡</p>
          <p className="max-w-xs text-sm leading-relaxed opacity-80 text-pretty">
            一座漂浮在云海之上的中世纪城堡，和它的岛、它的人、它的星星。
          </p>
        </div>
        <div className="pointer-events-auto flex flex-col items-end gap-2">
          <a
            href="/floating-castle.zip"
            download
            className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground shadow-md transition-opacity hover:opacity-90"
          >
            <Download className="size-4" />
            下载项目 ZIP
          </a>
          <button
            type="button"
            onClick={() => setGuideOpen((v) => !v)}
            aria-expanded={guideOpen}
            className="paper-card flex items-center gap-2 rounded-full px-4 py-2 text-sm text-foreground transition-colors hover:bg-muted"
          >
            <BookOpen className="size-4" />
            导览目录
          </button>
        </div>
      </header>

      {guideOpen && (
        <div className="absolute right-4 top-36 bottom-24 z-10 flex w-[min(20rem,calc(100%-2rem))] md:right-6">
          <GuideList
            selectedId={selectedId}
            onSelect={(id) => {
              select(id)
              if (window.innerWidth < 768) setGuideOpen(false)
            }}
            onClose={() => setGuideOpen(false)}
          />
        </div>
      )}

      {selected && (
        <div className="absolute inset-x-4 bottom-24 z-20 flex max-h-[45dvh] md:inset-x-auto md:bottom-24 md:left-6 md:top-44 md:max-h-none md:w-96">
          <div className="flex max-h-full w-full flex-col justify-end md:justify-start">
            <InfoPanel place={selected} onClose={() => setSelectedId(null)} onStep={step} />
          </div>
        </div>
      )}

      <footer className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 p-4 md:p-6">
        <div className="paper-card pointer-events-auto flex items-center gap-1 rounded-full p-1">
          <ToolButton onClick={goHome} label="全景">
            <House className="size-4" />
          </ToolButton>
          <ToolButton active={cutaway} onClick={toggleCutaway} label="剖视内部">
            <Layers className="size-4" />
          </ToolButton>
          <ToolButton active={night} onClick={() => setNight((v) => !v)} label={night ? '夜晚' : '白昼'}>
            {night ? <Moon className="size-4" /> : <Sun className="size-4" />}
          </ToolButton>
          <ToolButton active={autoRotate} onClick={() => setAutoRotate((v) => !v)} label="自动环绕">
            <RotateCw className="size-4" />
          </ToolButton>
          <ToolButton active={showLabels} onClick={() => setShowLabels((v) => !v)} label="标注">
            <Tag className="size-4" />
          </ToolButton>
        </div>
        <p className={cn('text-xs transition-colors', night ? 'text-background/70' : 'text-foreground/70')}>
          拖拽旋转 · 滚轮缩放 · 右键平移 · 点击标注查看介绍
        </p>
      </footer>
    </main>
  )
}
