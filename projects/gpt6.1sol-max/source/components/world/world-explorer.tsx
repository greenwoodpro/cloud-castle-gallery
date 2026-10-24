'use client'

import dynamic from 'next/dynamic'
import { useCallback, useEffect, useRef, useState, type ReactElement } from 'react'
import { ArrowUpRight, BookOpen, Box, Castle, ChevronDown, Compass, Download, Expand, MapPin, Minus, Moon, MousePointer2, Navigation2, Orbit, Pause, Plus, RotateCcw, Sparkles, Sun, Sunset, Tags } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { PLACES, type PlaceId, type TimeOfDay, type ViewMode } from '@/lib/world/config'
import { cn } from '@/lib/utils'
import { ExplorerSidebar } from './explorer-sidebar'
import { WorldJournal } from './world-journal'
import type { CameraAction } from './world-canvas'

const WorldCanvas = dynamic(() => import('./world-canvas'), { ssr: false })

function ToolTip({ label, children, side = 'top' }: { label: string; children: ReactElement; side?: 'left' | 'top' | 'bottom' }) {
  return <Tooltip><TooltipTrigger render={children} /><TooltipContent side={side}>{label}</TooltipContent></Tooltip>
}

export default function WorldExplorer() {
  const [selected, setSelected] = useState<PlaceId>('castle')
  const [mode, setMode] = useState<ViewMode>('overview')
  const [time, setTime] = useState<TimeOfDay>('day')
  const [rotating, setRotating] = useState(false)
  const [labels, setLabels] = useState(true)
  const [ready, setReady] = useState(false)
  const [journal, setJournal] = useState(false)
  const [action, setAction] = useState<CameraAction>({ kind: 'reset', tick: 0 })
  const [fullscreenError, setFullscreenError] = useState('')
  const stage = useRef<HTMLDivElement>(null)
  const compass = useRef<SVGSVGElement>(null)
  const place = PLACES.find((item) => item.id === selected)!

  const cameraAction = useCallback((kind: CameraAction['kind']) => setAction((previous) => ({ kind, tick: previous.tick + 1 })), [])
  const selectPlace = useCallback((id: PlaceId) => {
    setSelected(id)
    setMode('overview')
    setRotating(false)
    cameraAction('focus')
  }, [cameraAction])
  const changeMode = useCallback((value: ViewMode) => {
    setMode(value)
    setSelected('castle')
    setRotating(false)
    cameraAction(value === 'overview' ? 'reset' : 'focus')
  }, [cameraAction])
  const onReady = useCallback(() => setReady(true), [])
  const onHeading = useCallback((angle: number) => {
    if (compass.current) compass.current.style.transform = `rotate(${-angle * 180 / Math.PI}deg)`
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLElement && (event.target.matches('input,textarea,button,a') || event.target.isContentEditable)) return
      if (journal || event.metaKey || event.ctrlKey || event.altKey) return
      if (event.code === 'Space') { event.preventDefault(); setRotating((value) => !value) }
      if (event.key.toLowerCase() === 'r') { changeMode('overview'); cameraAction('reset') }
      if (event.key === '+' || event.key === '=') cameraAction('zoomIn')
      if (event.key === '-') cameraAction('zoomOut')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [cameraAction, changeMode, journal])

  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen()
      else if (stage.current?.requestFullscreen) await stage.current.requestFullscreen()
      else setFullscreenError('当前浏览器不支持全屏，可直接缩放与旋转探索。')
    } catch { setFullscreenError('当前预览不允许全屏，可发布后使用全屏模式。') }
  }

  return (
    <TooltipProvider delay={250}>
      <div className={cn('world-app font-sans', `world-${time}`)}>
        <header className="world-header">
          <a className="brand" href="/" aria-label="云间之境首页"><span className="brand-mark"><Castle size={25} strokeWidth={1.3} /></span><span className="brand-name font-serif">云间之境<span className="brand-subtitle font-sans">一座属于你的童话岛</span></span></a>
          <div className="header-message"><span className="status-dot" />让想象，暂时不着陆。</div>
          <div className="header-actions">
            <Button variant="ghost" className="journal-trigger" aria-label="世界手记" onClick={() => setJournal(true)}><BookOpen data-icon="inline-start" /><span>世界手记</span></Button>
            <a className={cn(buttonVariants(), 'download-button')} href="/downloads/cloud-castle.zip" download="云间之境-浮空城堡.zip"><Download data-icon="inline-start" /><span>下载完整作品</span><span className="download-type">ZIP</span></a>
          </div>
        </header>
        <main className="world-main">
          <ExplorerSidebar selected={selected} onSelect={selectPlace} onRead={() => setJournal(true)} />
          <div className="world-stage" ref={stage} data-scene-ready={ready ? 'true' : 'false'}>
            <div className="stage-topline"><span><Compass size={16} strokeWidth={1.4} /> B-612 <span className="topline-dot">·</span> 云间之境</span><span className="handmade-label">用一点想象，和很多温柔。</span></div>
            <div className="scene-view-toggle">
              <ToggleGroup value={[mode]} onValueChange={(values) => { if (values[0]) changeMode(values[0] as ViewMode) }} spacing={0} aria-label="场景查看模式">
                <ToggleGroupItem value="overview"><Orbit data-icon="inline-start" />小岛全景</ToggleGroupItem>
                <ToggleGroupItem value="interior"><Box data-icon="inline-start" />城堡内部</ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div className="canvas-wrap"><WorldCanvas selected={selected} mode={mode} time={time} rotating={rotating} labels={labels} action={action} onSelect={selectPlace} onReady={onReady} onHeading={onHeading} /></div>
            {!ready && <div className="world-loading" role="status"><span className="loading-castle"><Castle size={42} strokeWidth={1} /></span><span>正在为你安放一座小小的世界…</span></div>}
            <div className="scene-toolbar" aria-label="视角工具">
              <ToolTip label="放大（+）" side="left"><Button variant="ghost" size="icon-lg" onClick={() => cameraAction('zoomIn')} aria-label="放大"><Plus /></Button></ToolTip>
              <ToolTip label="缩小（−）" side="left"><Button variant="ghost" size="icon-lg" onClick={() => cameraAction('zoomOut')} aria-label="缩小"><Minus /></Button></ToolTip>
              <span className="toolbar-rule" />
              <ToolTip label="回到初始视角（R）" side="left"><Button variant="ghost" size="icon-lg" onClick={() => { setMode('overview'); cameraAction('reset') }} aria-label="重置视角"><RotateCcw /></Button></ToolTip>
              <ToolTip label={labels ? '隐藏地标' : '显示地标'} side="left"><Button variant="ghost" size="icon-lg" onClick={() => setLabels((value) => !value)} aria-label={labels ? '隐藏地标' : '显示地标'} aria-pressed={labels}><Tags /></Button></ToolTip>
              <ToolTip label="全屏探索" side="left"><Button variant="ghost" size="icon-lg" onClick={toggleFullscreen} aria-label="全屏探索"><Expand /></Button></ToolTip>
            </div>
            <button className="place-story" onClick={() => setJournal(true)}><span className="story-pin"><MapPin size={17} strokeWidth={1.5} /></span><span><span className="story-name">{mode === 'interior' ? '窗后的温柔日常' : place.name}</span><span className="story-subtitle">{mode === 'interior' ? '三层小天地，藏着生活与星光' : place.subtitle}</span></span><ArrowUpRight size={17} strokeWidth={1.5} /></button>
            <div className="scene-bottom">
              <div className="interaction-hint"><MousePointer2 size={14} strokeWidth={1.5} /><span>拖动旋转</span><span className="hint-dot">·</span><span>滚轮缩放</span><span className="hint-dot">·</span><span>右键平移</span></div>
              <div className="atmosphere-controls">
                <ToolTip label="空格键开启 / 暂停"><Button variant="ghost" className="auto-orbit" onClick={() => setRotating((value) => !value)} aria-pressed={rotating}>{rotating ? <Pause data-icon="inline-start" /> : <Orbit data-icon="inline-start" />}{rotating ? '暂停环游' : '自动环游'}</Button></ToolTip>
                <span className="controls-divider" />
                <ToggleGroup value={[time]} onValueChange={(values) => { if (values[0]) setTime(values[0] as TimeOfDay) }} spacing={1} aria-label="选择时间氛围">
                  <ToggleGroupItem value="day" aria-label="晴日" title="晴日"><Sun /><span className="time-label">晴日</span></ToggleGroupItem>
                  <ToggleGroupItem value="sunset" aria-label="黄昏" title="黄昏"><Sunset /><span className="time-label">黄昏</span></ToggleGroupItem>
                  <ToggleGroupItem value="night" aria-label="星夜" title="星夜"><Moon /><span className="time-label">星夜</span></ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>
            <div className="scene-coordinate"><span className="status-dot" />{mode === 'interior' ? '剖面已打开 · 自由探索' : '想象力，不设边界'}</div>
            <div className="scene-compass" aria-label="视角指南针"><span className="compass-north">北</span><Navigation2 ref={compass} size={24} strokeWidth={1.2} /><span className="compass-caption">随心而行</span></div>
            {fullscreenError && <button className="fullscreen-notice" onClick={() => setFullscreenError('')} role="status">{fullscreenError}<span>关闭</span></button>}
          </div>
        </main>
        <footer className="world-footer"><span><Sparkles size={14} strokeWidth={1.4} /> 世界很大，也可以很小。</span><span>以 Three.js 构建 <span className="footer-dot">·</span> 为每一个愿意仰望的人</span><span>愿你永远，保有童心 <ArrowUpRight size={14} /></span></footer>
        <WorldJournal open={journal} onOpenChange={setJournal} selected={selected} onInterior={() => changeMode('interior')} />
      </div>
    </TooltipProvider>
  )
}
