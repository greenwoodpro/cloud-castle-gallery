'use client'

import dynamic from 'next/dynamic'
import { Component, useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Camera, Check, ChevronRight, Compass, Download, Eye, EyeOff, Layers3, LoaderCircle, Maximize, Minimize, Minus, Moon, Mouse, Move, Origami, Pause, Play, Plus, RotateCcw, Sparkles, Sun, Sunset, Volume2, VolumeX, Wind } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { PLACES, type PlaceId, type TimeOfDay } from '@/lib/world-data'
import { WorldDialogs, type DialogKind } from './world-dialogs'
import { useAmbientAudio } from './use-ambient-audio'
import type { WorldApi } from './world-canvas'

const WorldCanvas = dynamic(() => import('./world-canvas'), { ssr: false })

class SceneBoundary extends Component<{ children: ReactNode; onError: (message: string) => void }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch() { this.props.onError('暂时无法建立 3D 场景。请开启浏览器硬件加速，或重新载入。') }
  render() { return this.state.failed ? null : this.props.children }
}

function ToolButton({ label, children, onClick, active = false, disabled = false }: { label: string; children: ReactNode; onClick: () => void; active?: boolean; disabled?: boolean }) {
  return <Tooltip><TooltipTrigger render={<Button size="icon-lg" variant={active ? 'secondary' : 'ghost'} aria-label={label} aria-pressed={active} disabled={disabled} onClick={onClick} />}>{children}</TooltipTrigger><TooltipContent side="left">{label}</TooltipContent></Tooltip>
}

export function WorldExplorer() {
  const [place, setPlace] = useState<PlaceId>('overview')
  const [viewVersion, setViewVersion] = useState(0)
  const [cutaway, setCutaway] = useState(false)
  const [time, setTime] = useState<TimeOfDay>('day')
  const [autoRotate, setAutoRotate] = useState(false)
  const [showLabels, setShowLabels] = useState(true)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [ready, setReady] = useState(false)
  const [sceneError, setSceneError] = useState('')
  const [thumbnails, setThumbnails] = useState<Record<string, string>>({})
  const [dialog, setDialog] = useState<DialogKind>(null)
  const [downloading, setDownloading] = useState(false)
  const [downloaded, setDownloaded] = useState(false)
  const [downloadStatus, setDownloadStatus] = useState('')
  const [downloadError, setDownloadError] = useState('')
  const [fullScreen, setFullScreen] = useState(false)
  const [notice, setNotice] = useState('')
  const worldApi = useRef<WorldApi | null>(null)
  const appRef = useRef<HTMLElement>(null)
  const busy = useRef(false)
  const audio = useAmbientAudio()
  const selected = PLACES.find((item) => item.id === place)

  const onReady = useCallback((api: WorldApi) => { worldApi.current = api; setReady(true) }, [])
  const onThumbnails = useCallback((images: Record<string, string>) => setThumbnails(images), [])
  const onError = useCallback((message: string) => { setSceneError(message); setReady(false) }, [])

  const visit = useCallback((id: PlaceId, interior = false) => {
    setPlace(id)
    setViewVersion((value) => value + 1)
    setCutaway(interior)
    setAutoRotate(false)
    setDialog(null)
  }, [])

  const toggleCutaway = useCallback((value: boolean) => {
    setCutaway(value)
    if (value) { setPlace('castle'); setViewVersion((version) => version + 1); setAutoRotate(false) }
  }, [])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduceMotion(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (dialog || event.altKey || event.ctrlKey || event.metaKey || event.isComposing) return
      if (event.target instanceof HTMLElement && (event.target.matches('input, textarea, select') || event.target.isContentEditable)) return
      if (event.key.toLowerCase() === 'r') visit('overview')
      if (event.key.toLowerCase() === 'c') toggleCutaway(!cutaway)
      if (event.key.toLowerCase() === 'l') setShowLabels((value) => !value)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [dialog, cutaway, visit, toggleCutaway])

  useEffect(() => {
    const changed = () => setFullScreen(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', changed)
    return () => document.removeEventListener('fullscreenchange', changed)
  }, [])

  useEffect(() => {
    if (!notice) return
    const timeout = setTimeout(() => setNotice(''), 4000)
    return () => clearTimeout(timeout)
  }, [notice])

  async function download() {
    if (!worldApi.current || busy.current) return
    busy.current = true
    setDownloading(true)
    setDownloadError('')
    setDownloaded(false)
    try {
      const { downloadWorld } = await import('@/lib/download-world')
      await downloadWorld(worldApi.current, setDownloadStatus)
      setDownloaded(true)
      setDownloadStatus('ZIP 已生成，浏览器已开始下载。愿这座岛陪你继续想象。')
    } catch (error) {
      setDownloadError(error instanceof Error ? error.message : '打包未完成，请重试。')
      setDownloadStatus('')
    } finally {
      busy.current = false
      setDownloading(false)
    }
  }

  async function screenshot() {
    if (!worldApi.current) return
    try {
      const { saveBlob } = await import('@/lib/download-world')
      const response = await fetch(worldApi.current.screenshot())
      saveBlob(await response.blob(), '云屿-此刻的风景.png')
      setNotice('这一刻的风景，已经为你留住。')
    } catch { setNotice('截图暂时无法保存，请稍后重试。') }
  }

  async function toggleFullScreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen()
      else if (appRef.current?.requestFullscreen) await appRef.current.requestFullscreen()
      else setNotice('当前浏览器暂不支持全屏，可以放大预览窗口继续探索。')
    } catch { setNotice('此预览窗口限制了全屏。独立打开页面即可使用。') }
  }

  return (
    <main ref={appRef} className="world-app font-sans" data-time={time} data-ready={ready}>
      <header className="world-header">
        <a href="/" className="world-brand" aria-label="云屿首页">
          <span className="brand-mark"><Origami size={27} strokeWidth={1.25} /></span>
          <span><strong>云屿<span className="brand-dot">.</span></strong><small>让想象，有处可栖</small></span>
        </a>
        <nav className="world-nav" aria-label="主导航">
          <button className="nav-active" onClick={() => visit('overview')}>漫游世界<span /></button>
          <button onClick={() => setDialog('journal')}>岛屿手记</button>
          <button onClick={() => setDialog('guide')}>漫游指南</button>
        </nav>
        <div className="header-actions">
          <Tooltip><TooltipTrigger render={<Button variant="ghost" size="icon-lg" aria-label={audio.playing ? '关闭自然风声' : '开启自然风声'} aria-pressed={audio.playing} onClick={() => { void audio.toggle().catch(() => setNotice('浏览器暂时无法播放音频。')) }} />}>{audio.playing ? <Volume2 /> : <VolumeX />}</TooltipTrigger><TooltipContent>{audio.playing ? '听见云间的风 · 点击关闭' : '听听云间的风'}</TooltipContent></Tooltip>
          <span className="header-action-divider" />
          <Button size="lg" className="download-button" disabled={!ready} onClick={() => setDialog('download')}><Download data-icon="inline-start" /><span>下载世界</span><span className="download-format">.ZIP</span></Button>
        </div>
      </header>

      <section className="world-stage" aria-label="浮空岛漫游">
        <div className="scene-container">
          <SceneBoundary onError={onError}>
            <WorldCanvas place={place} viewVersion={viewVersion} cutaway={cutaway} time={time} autoRotate={autoRotate} showLabels={showLabels} reduceMotion={reduceMotion} onSelect={visit} onReady={onReady} onThumbnails={onThumbnails} onError={onError} />
          </SceneBoundary>
          {!ready && !sceneError && <div className="scene-loading" role="status"><Origami size={38} strokeWidth={1} /><span>正在把想象，轻轻托起…</span><LoaderCircle size={16} className="animate-spin" /></div>}
          {sceneError && <div className="scene-loading" role="alert"><Origami size={38} /><p>{sceneError}</p><Button variant="outline" onClick={() => window.location.reload()}>重新载入</Button><a href="/downloads/cloud-island-source.zip" download>下载源码，在本地探索</a></div>}
        </div>

        <aside className="world-introduction">
          <div className="chapter-label"><span /><span>一座岛屿 · 一个小小宇宙</span></div>
          <div className="intro-heading" key={place}>
            {selected && <button className="back-overview" onClick={() => visit('overview')}><ArrowLeft size={14} />回到整个世界</button>}
            <h1>{selected ? selected.title : <>风住过的地方，<br /><span>有一座城堡。</span></>}</h1>
            <p className="intro-description">{selected ? selected.description : <>把童话放在云上，把日子过得慢一些。<br />穿过石拱门、玫瑰园和低语的森林，<br />去遇见一个温柔的小小世界。</>}</p>
          </div>
          <div className="world-atmosphere"><Wind size={16} strokeWidth={1.5} /><span>{time === 'day' ? '微风轻拂' : time === 'sunset' ? '日落之前' : '星光正好'}<i>·</i>云海之上</span></div>
          <div className="intro-actions">
            <Button size="lg" variant="outline" className="explore-button" disabled={!ready} onClick={() => selected ? setDialog('journal') : visit('castle')}><span>{selected ? '读一页岛屿手记' : '走进这个小世界'}</span><ArrowUpRight data-icon="inline-end" /></Button>
            <button className="text-link" onClick={() => setDialog('journal')}><BookOpen size={15} strokeWidth={1.5} />每一扇窗，都有故事<ChevronRight size={13} /></button>
          </div>
          <div className="cutaway-control">
            <div><span><Layers3 size={17} strokeWidth={1.5} /><label htmlFor="cutaway-switch">城堡剖面</label></span><Switch id="cutaway-switch" checked={cutaway} onCheckedChange={toggleCutaway} disabled={!ready} /></div>
            <p>{cutaway ? '屋顶已掀开，三层日常等你发现。' : '轻轻掀开屋顶，看看里面的日常。'}</p>
          </div>
          {cutaway && <div className="cutaway-legend"><span>三层 · 卧房与星图</span><span>二层 · 书房与藏书</span><span>一层 · 宴会厅与炉火</span></div>}
        </aside>

        <div className="scene-caption"><span className="live-dot" /><span>{cutaway ? '城堡内部 · 三层剖面' : selected ? selected.tag : '风栖城堡 · 浮空岛'}</span></div>
        <div className="scene-tools" aria-label="视角控制">
          <div className="tool-cluster"><ToolButton label="放大视角" disabled={!ready} onClick={() => worldApi.current?.zoom(1)}><Plus /></ToolButton><ToolButton label="缩小视角" disabled={!ready} onClick={() => worldApi.current?.zoom(-1)}><Minus /></ToolButton><span className="tool-divider" /><ToolButton label="回到全景 · R" onClick={() => visit('overview')}><RotateCcw /></ToolButton></div>
          <div className="tool-cluster"><ToolButton label={showLabels ? '隐藏地点标签 · L' : '显示地点标签 · L'} active={!showLabels} onClick={() => setShowLabels(!showLabels)}>{showLabels ? <Eye /> : <EyeOff />}</ToolButton><ToolButton label={fullScreen ? '退出全屏' : '全屏漫游'} onClick={() => void toggleFullScreen()}>{fullScreen ? <Minimize /> : <Maximize />}</ToolButton><ToolButton label="把此刻存成照片" disabled={!ready} onClick={() => void screenshot()}><Camera /></ToolButton></div>
        </div>
        <div className="scene-bottom">
          <span className="scene-orbit-hint"><RotateCcw size={15} strokeWidth={1.2} />世界很小，换个角度看看</span>
          <button className={cn('auto-orbit', autoRotate && 'is-active')} aria-pressed={autoRotate} disabled={reduceMotion || !ready} onClick={() => setAutoRotate(!autoRotate)}>{autoRotate ? <Pause size={13} /> : <Play size={13} />}<span>{reduceMotion ? '已减少动态效果' : autoRotate ? '暂停环绕' : '自动环绕'}</span></button>
        </div>
        {notice && <div className="world-notice" role="status"><Check size={16} />{notice}</div>}
      </section>

      <section className="exploration-dock" aria-labelledby="exploration-heading">
        <div className="dock-heading-row">
          <div className="dock-heading"><Compass size={18} strokeWidth={1.4} /><h2 id="exploration-heading">随心停靠</h2><span>不赶路，只看风景。</span></div>
          <div className="time-control"><span>让时间慢下来</span><Tabs value={time} onValueChange={(value) => setTime(value as TimeOfDay)}><TabsList aria-label="一天中的时光"><TabsTrigger value="day"><Sun data-icon="inline-start" />晴日</TabsTrigger><TabsTrigger value="sunset"><Sunset data-icon="inline-start" />黄昏</TabsTrigger><TabsTrigger value="night"><Moon data-icon="inline-start" />星夜</TabsTrigger></TabsList><TabsContent value="day" className="sr-only">晴日：柔和的自然光与薄云。</TabsContent><TabsContent value="sunset" className="sr-only">黄昏：金色夕阳照亮城堡。</TabsContent><TabsContent value="night" className="sr-only">星夜：满天星光与温暖的窗灯。</TabsContent></Tabs></div>
        </div>
        <div className="place-cards">
          {PLACES.map((item) => (
            <button key={item.id} className={cn('place-card', place === item.id && 'is-selected')} aria-pressed={place === item.id} disabled={!ready} onClick={() => visit(item.id)}>
              <div className={`place-thumbnail thumb-${item.id}`}>{thumbnails[item.id] ? <img src={thumbnails[item.id]} alt="" /> : <Origami size={26} strokeWidth={1} />}</div>
              <span className="place-copy"><strong>{item.title}</strong><span>{item.id === 'castle' ? '高塔、拱门与温暖的窗' : item.id === 'garden' ? '一朵玫瑰，一位小旅人' : item.id === 'forest' ? '听见溪流，望见云海' : '有烟火气的慢慢日常'}</span></span>
              <ArrowUpRight className="place-arrow" size={16} strokeWidth={1.4} />
            </button>
          ))}
        </div>
      </section>
      <footer className="world-footer"><span><Sparkles size={14} strokeWidth={1.3} />用 Three.js 编织的温柔想象</span><div><span><Mouse size={14} />拖动旋转</span><i /><span>滚轮缩放</span><i /><span><Move size={14} />右键平移</span><button onClick={() => setDialog('guide')}>操作指南<ArrowRight size={13} /></button></div><span className="mobile-gesture">单指旋转 · 双指缩放</span></footer>
      <WorldDialogs open={dialog} onClose={() => setDialog(null)} onVisit={visit} thumbnails={thumbnails} downloading={downloading} downloaded={downloaded} downloadStatus={downloadStatus} downloadError={downloadError} onDownload={() => void download()} />
    </main>
  )
}
