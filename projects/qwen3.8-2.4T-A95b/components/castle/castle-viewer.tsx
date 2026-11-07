'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { CastleSceneHandle, SceneStats, TimeKey } from '@/lib/three/scene-types'
import { findPreset } from '@/lib/three/views'
import { ControlBar } from './control-bar'
import { GuidePanel } from './guide-panel'
import { InfoCard } from './info-card'
import { TitleCard } from './title-card'
import { ViewMenu } from './view-menu'
import { DownloadIcon, DragIcon, PanIcon, ScrollIcon, ZoomIcon } from './icons'

const DOWNLOAD_HREF = '/downloads/little-prince-castle.zip'

export function CastleViewer() {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<CastleSceneHandle | null>(null)

  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const [time, setTime] = useState<TimeKey>('day')
  const [xray, setXray] = useState(false)
  const [autoRotate, setAutoRotate] = useState(false)
  const [activePreset, setActivePreset] = useState<string | null>('panorama')
  const [stats, setStats] = useState<SceneStats>({ drawCalls: 0, triangles: 0, fps: 0 })
  const [menuOpen, setMenuOpen] = useState(true)
  const [guideOpen, setGuideOpen] = useState(false)

  // 场景只在客户端创建；动态 import 让 three.js 不进入首屏 bundle
  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return
    let cancelled = false
    let handle: CastleSceneHandle | null = null

    import('@/lib/three/scene')
      .then(({ createCastleScene }) => {
        if (cancelled || !mountRef.current) return
        handle = createCastleScene(mountRef.current, {
          initialTime: 'day',
          initialPreset: 'panorama',
          onReady: () => setReady(true),
          onPresetChange: (id) => setActivePreset(id),
          onStats: (s) => setStats(s),
        })
        sceneRef.current = handle
      })
      .catch((error) => {
        console.error('[v0] 场景初始化失败:', error)
        if (!cancelled) setFailed(true)
      })

    return () => {
      cancelled = true
      handle?.dispose()
      sceneRef.current = null
    }
  }, [])

  const handleTime = useCallback((key: TimeKey) => {
    setTime(key)
    sceneRef.current?.setTime(key)
  }, [])

  const handleXRay = useCallback((on: boolean) => {
    setXray(on)
    sceneRef.current?.setXRay(on)
  }, [])

  const handleAutoRotate = useCallback((on: boolean) => {
    setAutoRotate(on)
    sceneRef.current?.setAutoRotate(on)
  }, [])

  const handleSelect = useCallback((id: string) => {
    setActivePreset(id)
    sceneRef.current?.flyTo(id)
  }, [])

  const preset = findPreset(activePreset)

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-background">
      {/* 3D 画布 */}
      <div
        ref={mountRef}
        role="application"
        aria-label="浮空岛城堡的三维场景，可用鼠标拖拽旋转、滚轮缩放、右键平移"
        className="absolute inset-0"
      />

      {/* 纸张颗粒与暗角，让画面更像绘本插图 */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 grain-overlay" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 vignette-overlay" />

      {/* 载入状态 */}
      {!ready && !failed && (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-4 bg-background">
          <div className="size-10 animate-spin rounded-full border-2 border-border border-t-accent" />
          <p className="font-serif text-sm text-muted-foreground">正在搭建这座岛……</p>
          <p className="max-w-xs text-center font-sans text-xs leading-relaxed text-muted-foreground/70">
            要砌城墙、种一千五百株麦子、给每一扇窗装上玻璃，请稍等片刻。
          </p>
        </div>
      )}

      {failed && (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-3 bg-background px-6">
          <p className="font-serif text-lg text-foreground">这个浏览器没能启动 WebGL</p>
          <p className="max-w-sm text-center font-sans text-xs leading-relaxed text-muted-foreground">
            场景需要 WebGL 支持。请换一个现代浏览器，或在设置里开启硬件加速后重试。
          </p>
        </div>
      )}

      {/* 顶部：标题 + 操作 */}
      <header className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between gap-3 p-4 sm:p-5">
        <div className="pointer-events-auto rounded-xl border border-border/70 bg-card/92 px-4 py-3 shadow-panel backdrop-blur-md">
          <TitleCard />
        </div>

        <div className="pointer-events-auto flex flex-col items-end gap-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setGuideOpen(true)}
              className="flex items-center gap-1.5 rounded-lg border border-border/70 bg-card/92 px-3 py-2 font-sans text-xs text-foreground shadow-panel backdrop-blur-md transition-colors hover:bg-secondary"
            >
              <ScrollIcon className="size-3.5 text-accent" />
              <span>图鉴</span>
            </button>
            <a
              href={DOWNLOAD_HREF}
              download
              className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 font-sans text-xs text-primary-foreground shadow-panel transition-colors hover:bg-primary/85"
            >
              <DownloadIcon className="size-3.5" />
              <span>下载 ZIP</span>
            </a>
          </div>

          <p className="rounded-lg border border-border/60 bg-card/85 px-2.5 py-1.5 font-mono text-[10px] text-muted-foreground backdrop-blur-md">
            {stats.fps} fps · {stats.drawCalls} draws · {(stats.triangles / 1000).toFixed(0)}k tris
          </p>
        </div>
      </header>

      {/* 左侧：视角列表 */}
      <div className="pointer-events-none absolute top-32 bottom-28 left-4 z-20 flex sm:top-40 sm:bottom-24 sm:left-5">
        <ViewMenu
          activeId={activePreset}
          onSelect={handleSelect}
          open={menuOpen}
          onToggle={() => setMenuOpen((v) => !v)}
        />
      </div>

      {/* 右侧：当前视角说明 */}
      <div className="pointer-events-none absolute top-32 right-4 z-20 hidden sm:top-40 sm:right-5 sm:block">
        <InfoCard presetId={activePreset} onClose={() => setActivePreset(null)} />
      </div>

      {/* 底部：控制条 + 操作提示 */}
      <footer className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex flex-col items-center gap-2.5 p-4 sm:p-5">
        <ControlBar
          time={time}
          onTimeChange={handleTime}
          xray={xray}
          onXRayChange={handleXRay}
          autoRotate={autoRotate}
          onAutoRotateChange={handleAutoRotate}
        />

        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 font-sans text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <DragIcon className="size-3.5" />
            拖拽旋转
          </span>
          <span className="flex items-center gap-1.5">
            <ZoomIcon className="size-3.5" />
            滚轮缩放
          </span>
          <span className="flex items-center gap-1.5">
            <PanIcon className="size-3.5" />
            右键平移
          </span>
          {preset && (
            <span className="hidden text-muted-foreground/70 sm:inline">当前 · {preset.label}</span>
          )}
        </div>
      </footer>

      <GuidePanel open={guideOpen} onClose={() => setGuideOpen(false)} />
    </div>
  )
}
