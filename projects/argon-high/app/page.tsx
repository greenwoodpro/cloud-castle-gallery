'use client'

import React, { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import {
  TimeMode,
  CAMERA_PRESETS,
  InteriorSection,
  CastleCharacter,
  TerrainZone,
} from '@/lib/castle-data'
import type { HotspotItem } from '@/components/castle-scene'
import EncyclopediaDrawer, {
  EncyclopediaTab,
} from '@/components/encyclopedia-drawer'
import { createCastleProjectZipBlob } from '@/lib/zip-exporter'
import {
  Download,
  Sunset,
  Sun,
  Moon,
  Scissors,
  RotateCw,
  Tag,
  Camera,
  CheckCircle2,
  Loader2,
} from 'lucide-react'

const CastleScene = dynamic(() => import('@/components/castle-scene'), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-[#231B30] text-amber-100">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-amber-300 border-t-transparent" />
      <p className="mt-4 font-serif text-base tracking-wider text-amber-200">
        正在绘制 B-612 浮空星屿与中世纪欧洲城堡...
      </p>
    </div>
  ),
})

export default function FloatingCastlePage() {
  const [timeMode, setTimeMode] = useState<TimeMode>('sunset')
  const [sunsetIndex, setSunsetIndex] = useState<number>(44)
  const [cutawayMode, setCutawayMode] = useState<boolean>(false)
  const [showHotspots, setShowHotspots] = useState<boolean>(true)
  const [autoRotate, setAutoRotate] = useState<boolean>(true)
  const [drawerOpen, setDrawerOpen] = useState<boolean>(true)
  const [activeTab, setActiveTab] = useState<EncyclopediaTab>('interior')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [cameraCommand, setCameraCommand] = useState<{
    position: [number, number, number]
    target: [number, number, number]
    timestamp: number
  } | null>(null)

  // ZIP packaging & download states
  const [isZipping, setIsZipping] = useState(false)
  const [zipDownloadUrl, setZipDownloadUrl] = useState<string | null>(null)
  const [zipSizeKB, setZipSizeKB] = useState<number | null>(null)
  const [zipFileName] = useState('little-prince-floating-castle-3d.zip')

  // Pre-build full project ZIP from /api/download-zip (with client-side fallback) on mount
  React.useEffect(() => {
    let active = true
    let createdUrl: string | null = null

    fetch('/api/download-zip')
      .then((res) => {
        if (!res.ok) throw new Error('API zip fallback')
        return res.blob()
      })
      .catch(() => createCastleProjectZipBlob())
      .then((blob) => {
        if (!active) return
        createdUrl = URL.createObjectURL(blob)
        setZipDownloadUrl(createdUrl)
        setZipSizeKB(Math.max(1, Math.round(blob.size / 1024)))
      })
      .catch((err) => {
        console.error('Failed to pre-build zip:', err)
      })
    return () => {
      active = false
      if (createdUrl) URL.revokeObjectURL(createdUrl)
    }
  }, [])

  const flyCameraTo = useCallback(
    (
      position: [number, number, number],
      target: [number, number, number],
      shouldCutaway?: boolean
    ) => {
      setAutoRotate(false)
      if (typeof shouldCutaway === 'boolean') {
        setCutawayMode(shouldCutaway)
      }
      setCameraCommand({
        position,
        target,
        timestamp: Date.now(),
      })
    },
    []
  )

  const handleSelectHotspot = useCallback(
    (item: HotspotItem) => {
      setSelectedId(item.id)
      setDrawerOpen(true)
      if (item.category === 'interior') setActiveTab('interior')
      else if (item.category === 'character') setActiveTab('characters')
      else setActiveTab('terrain')

      flyCameraTo(
        item.cameraPosition,
        item.cameraTarget,
        item.cutawayRequired
      )
    },
    [flyCameraTo]
  )

  const handleSelectInterior = useCallback(
    (sec: InteriorSection) => {
      setSelectedId(sec.id)
      flyCameraTo(sec.cameraPosition, sec.cameraTarget, sec.cutawayRequired)
    },
    [flyCameraTo]
  )

  const handleSelectCharacter = useCallback(
    (char: CastleCharacter) => {
      setSelectedId(char.id)
      flyCameraTo(
        char.cameraPosition,
        char.cameraTarget,
        Boolean(char.cutawayRequired)
      )
    },
    [flyCameraTo]
  )

  const handleSelectTerrain = useCallback(
    (zone: TerrainZone) => {
      setSelectedId(zone.id)
      flyCameraTo(zone.cameraPosition, zone.cameraTarget, false)
    },
    [flyCameraTo]
  )

  const handleGenerateAndDownloadZip = async () => {
    try {
      setIsZipping(true)
      const blob = await createCastleProjectZipBlob()
      if (zipDownloadUrl) {
        URL.revokeObjectURL(zipDownloadUrl)
      }
      const url = URL.createObjectURL(blob)
      setZipDownloadUrl(url)
      setZipSizeKB(Math.max(1, Math.round(blob.size / 1024)))

      // Trigger immediate browser download
      const anchor = document.createElement('a')
      anchor.href = url
      anchor.download = zipFileName
      document.body.appendChild(anchor)
      anchor.click()
      document.body.removeChild(anchor)
    } finally {
      setIsZipping(false)
    }
  }

  return (
    <main className="relative h-screen w-full overflow-hidden bg-[#1E182B] font-sans text-amber-50">
      {/* Full-Screen 3D Scene */}
      <CastleScene
        timeMode={timeMode}
        sunsetIndex={sunsetIndex}
        cutawayMode={cutawayMode}
        showHotspots={showHotspots}
        activeHotspotCategory={
          activeTab === 'interior'
            ? 'interior'
            : activeTab === 'characters'
              ? 'character'
              : activeTab === 'terrain'
                ? 'terrain'
                : 'all'
        }
        autoRotate={autoRotate}
        activeSelectionId={selectedId}
        cameraCommand={cameraCommand}
        onSelectHotspot={handleSelectHotspot}
      />

      {/* Top Header & Primary Controls Bar */}
      <header className="pointer-events-none fixed top-3 left-3 right-3 z-20 flex flex-wrap items-start justify-between gap-3">
        {/* Title & Story Badge */}
        <div className="pointer-events-auto flex flex-col gap-1 rounded-2xl bg-[#1F1A2C]/85 border border-amber-200/30 px-4 py-2.5 shadow-xl backdrop-blur-xl max-w-md">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24]" />
            <h1 className="font-serif text-base sm:text-lg font-bold tracking-wide text-amber-200">
              B-612 浮空星屿 · 中世纪欧洲城堡
            </h1>
          </div>
          <p className="text-xs text-amber-100/75 leading-relaxed">
            小王子温和细腻水彩画风 · 左键自由旋转 / 右键平移 / 滚轮缩放（可俯视岛底星晶矿脉）
          </p>
        </div>

        {/* Action Toolbar: Cutaway, Time Mode, 44th Sunset Slider & ZIP Download */}
        <div className="pointer-events-auto flex flex-wrap items-center gap-2 rounded-2xl bg-[#1F1A2C]/85 border border-amber-200/30 p-2 shadow-xl backdrop-blur-xl">
          {/* Cutaway Mode Toggle */}
          <button
            type="button"
            onClick={() => setCutawayMode((v) => !v)}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
              cutawayMode
                ? 'bg-amber-400 text-stone-950 shadow-md'
                : 'bg-white/10 text-amber-100 hover:bg-white/15 border border-amber-200/25'
            }`}
          >
            <Scissors className="w-3.5 h-3.5" />
            <span>{cutawayMode ? '已开启城堡内部剖面' : '剖开城堡内部构造'}</span>
          </button>

          {/* 3 Time-of-Day Modes */}
          <div className="flex items-center rounded-xl bg-stone-950/50 p-0.5 border border-amber-200/15">
            <button
              type="button"
              onClick={() => setTimeMode('sunset')}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs transition ${
                timeMode === 'sunset'
                  ? 'bg-amber-500/30 text-amber-200 font-semibold border border-amber-300/40'
                  : 'text-amber-100/70 hover:text-amber-100'
              }`}
            >
              <Sunset className="w-3.5 h-3.5 text-amber-300" />
              <span>四十四次日落</span>
            </button>
            <button
              type="button"
              onClick={() => setTimeMode('morning')}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs transition ${
                timeMode === 'morning'
                  ? 'bg-sky-400/30 text-sky-100 font-semibold border border-sky-300/40'
                  : 'text-amber-100/70 hover:text-amber-100'
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-sky-200" />
              <span>晨曦水彩</span>
            </button>
            <button
              type="button"
              onClick={() => setTimeMode('night')}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs transition ${
                timeMode === 'night'
                  ? 'bg-indigo-500/40 text-indigo-100 font-semibold border border-indigo-300/40'
                  : 'text-amber-100/70 hover:text-amber-100'
              }`}
            >
              <Moon className="w-3.5 h-3.5 text-indigo-200" />
              <span>B-612星夜</span>
            </button>
          </div>

          {/* 3D Pins & Auto-Rotate Toggles */}
          <button
            type="button"
            onClick={() => setShowHotspots((v) => !v)}
            className={`flex items-center gap-1 rounded-xl px-2.5 py-1.5 text-xs transition border ${
              showHotspots
                ? 'bg-amber-400/20 text-amber-200 border-amber-300/40'
                : 'bg-white/5 text-amber-100/60 border-transparent'
            }`}
            title="显示或隐藏 3D 空间悬浮标注"
          >
            <Tag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">3D标注</span>
          </button>

          <button
            type="button"
            onClick={() => setAutoRotate((v) => !v)}
            className={`flex items-center gap-1 rounded-xl px-2.5 py-1.5 text-xs transition border ${
              autoRotate
                ? 'bg-amber-400/20 text-amber-200 border-amber-300/40'
                : 'bg-white/5 text-amber-100/60 border-transparent'
            }`}
            title="开启或暂停环绕巡航"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">环绕</span>
          </button>

          {/* Direct ZIP Download Link */}
          <a
            href={zipDownloadUrl || '/api/download-zip'}
            download={zipFileName}
            onClick={(e) => {
              if (!zipDownloadUrl) {
                e.preventDefault()
                handleGenerateAndDownloadZip()
              }
            }}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-orange-300 text-stone-950 font-semibold px-3.5 py-1.5 text-xs shadow-lg hover:brightness-105 active:scale-95 transition"
          >
            {isZipping ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Download className="w-3.5 h-3.5" />
            )}
            <span>
              {zipSizeKB
                ? `下载完整 ZIP 源码包 (${zipSizeKB} KB)`
                : '打包下载完整 ZIP 源码包'}
            </span>
          </a>
        </div>
      </header>

      {/* Bottom Left Camera Preset Bar & 44th Sunset Slider */}
      <section
        aria-label="快捷镜头视角与日落调节"
        className="pointer-events-none fixed bottom-3 left-3 z-20 flex flex-col gap-2 max-w-[calc(100vw-24px)] sm:max-w-[540px]"
      >
        {/* 44th Sunset Slider (visible when in sunset mode) */}
        {timeMode === 'sunset' && (
          <div className="pointer-events-auto flex items-center gap-3 rounded-2xl bg-[#1F1A2C]/85 border border-amber-200/25 px-3.5 py-2 backdrop-blur-xl shadow-lg">
            <span className="text-xs font-serif text-amber-200 whitespace-nowrap">
              小王子的第 <strong>{sunsetIndex}</strong> / 44 次日落
            </span>
            <input
              type="range"
              min={1}
              max={44}
              value={sunsetIndex}
              onChange={(e) => setSunsetIndex(Number(e.target.value))}
              className="w-36 sm:w-48 accent-amber-400 cursor-pointer"
              aria-label="调节第1到第44次日落天色"
            />
            <span className="text-[11px] text-amber-100/65 hidden sm:inline">
              拖动改变暮色高度
            </span>
          </div>
        )}

        {/* Camera Presets */}
        <div className="pointer-events-auto flex items-center gap-1.5 overflow-x-auto rounded-2xl bg-[#1F1A2C]/85 border border-amber-200/25 p-2 backdrop-blur-xl shadow-lg">
          <span className="flex items-center gap-1 px-2 text-xs font-medium text-amber-200/90 shrink-0">
            <Camera className="w-3.5 h-3.5" />
            <span>镜头导览：</span>
          </span>
          {CAMERA_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() =>
                flyCameraTo(
                  preset.position,
                  preset.target,
                  preset.cutawayRecommended
                )
              }
              className="shrink-0 rounded-xl bg-white/8 hover:bg-amber-400/25 text-amber-100 hover:text-amber-200 border border-amber-200/20 px-2.5 py-1 text-xs transition"
              title={preset.subtitle}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </section>

      {/* Right Encyclopedia Drawer (Interiors, Characters, Terrains, Environment) */}
      <EncyclopediaDrawer
        activeTab={activeTab}
        onTabChange={setActiveTab}
        selectedId={selectedId}
        onSelectInterior={handleSelectInterior}
        onSelectCharacter={handleSelectCharacter}
        onSelectTerrain={handleSelectTerrain}
        isOpen={drawerOpen}
        onToggleOpen={() => setDrawerOpen((o) => !o)}
      />
    </main>
  )
}
