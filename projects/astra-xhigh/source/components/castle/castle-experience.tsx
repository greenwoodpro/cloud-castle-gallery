'use client'

import dynamic from 'next/dynamic'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowDownToLine, ArrowRight, ArrowUpRight, BookOpen, Box, Castle, Check, ChevronLeft, ChevronRight, CircleHelp, Compass, Expand, Eye, Hand, Layers2, Leaf, LoaderCircle, Moon, Mouse, Move, Pause, Play, Plus, Minus, RotateCcw, ScanLine, Sparkles, Sun, Sunrise, Users, X, Camera } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { StoryDialog } from './story-dialog'
import { chapters, type TimeOfDay, type WorldView } from '@/lib/world-data'
import { cn } from '@/lib/utils'
import type { WorldApi } from './world-canvas'

const WorldCanvas = dynamic(() => import('./world-canvas'), { ssr: false })
const navigation = [
  { id: 'island' as const, label: '浮岛全景', Icon: Compass },
  { id: 'castle' as const, label: '城堡内部', Icon: Castle },
  { id: 'residents' as const, label: '岛上居民', Icon: Users },
  { id: 'nature' as const, label: '自然秘境', Icon: Leaf },
]

function ToolButton({ label, children, onClick, active = false, disabled = false }: { label: string; children: React.ReactNode; onClick: () => void; active?: boolean; disabled?: boolean }) {
  return <Tooltip><TooltipTrigger render={<Button variant={active ? 'secondary' : 'ghost'} size="icon-lg" aria-label={label} onClick={onClick} disabled={disabled} />}>{children}</TooltipTrigger><TooltipContent side="top">{label}</TooltipContent></Tooltip>
}

export default function CastleExperience() {
  const [view, setView] = useState<WorldView>('island')
  const [time, setTime] = useState<TimeOfDay>('morning')
  const [cutaway, setCutaway] = useState(false)
  const [autoRotate, setAutoRotate] = useState(false)
  const [labels, setLabels] = useState(false)
  const [ready, setReady] = useState(false)
  const [chapter, setChapter] = useState(0)
  const [openChapter, setOpenChapter] = useState<number | null>(null)
  const [downloadOpen, setDownloadOpen] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)
  const [exporting, setExporting] = useState(false)
  const [notice, setNotice] = useState('')
  const [immersive, setImmersive] = useState(false)
  const api = useRef<WorldApi>(null)
  const root = useRef<HTMLDivElement>(null)
  const onReady = useCallback(() => setReady(true), [])
  const story = chapters[chapter]
  const StoryIcon = [Castle, Users, Leaf][chapter]

  const visit = useCallback((next: WorldView) => {
    setView(next)
    setCutaway(next === 'castle')
    setAutoRotate(false)
    if (next !== 'island') setChapter(next === 'castle' ? 0 : next === 'residents' ? 1 : 2)
  }, [])

  useEffect(() => {
    if (!notice) return
    const id = setTimeout(() => setNotice(''), 4200)
    return () => clearTimeout(id)
  }, [notice])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setImmersive(false)
    }
    const onFullscreen = () => { if (!document.fullscreenElement) setImmersive(false) }
    document.addEventListener('keydown', onKey)
    document.addEventListener('fullscreenchange', onFullscreen)
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('fullscreenchange', onFullscreen) }
  }, [])

  async function fullscreen() {
    if (immersive) {
      setImmersive(false)
      if (document.fullscreenElement) await document.exitFullscreen().catch(() => {})
    } else {
      setImmersive(true)
      await root.current?.requestFullscreen?.().catch(() => {})
    }
  }

  async function exportModel() {
    if (!api.current) return
    setExporting(true)
    try { await api.current.exportModel(); setNotice('完整城堡模型已导出为 GLB') }
    catch { setNotice('模型导出未完成，请重试或下载 ZIP 场景包。') }
    finally { setExporting(false) }
  }

  return <TooltipProvider delay={250}>
    <div ref={root} className={cn('experience font-sans', time === 'night' && 'night-scene', time === 'sunset' && 'sunset-scene', immersive && 'is-immersive')}>
      <header className="site-header">
        <a href="/" className="brand" aria-label="星屿首页"><span className="brand-symbol"><Sparkles size={24} strokeWidth={1.4} /></span><span className="brand-wordmark">星屿<span>STAR ISLE</span></span></a>
        <nav aria-label="探索场景" className="main-nav">
          <ToggleGroup value={[view]} onValueChange={values => { if (values[0]) visit(values[0] as WorldView) }} spacing={1}>
            {navigation.map(({ id, label, Icon }) => <ToggleGroupItem key={id} value={id} aria-label={label}><Icon data-icon="inline-start" /><span>{label}</span></ToggleGroupItem>)}
          </ToggleGroup>
        </nav>
        <Button variant="outline" onClick={() => setDownloadOpen(true)} className="header-download"><ArrowDownToLine data-icon="inline-start" /><span>带走这座岛</span></Button>
      </header>

      <main className="world-stage" aria-label="星屿互动体验">
        <div className="world-canvas" data-ready={ready}>
          <WorldCanvas view={view} time={time} cutaway={cutaway} autoRotate={autoRotate} labels={labels} apiRef={api} onReady={onReady} onExplore={setOpenChapter} />
        </div>
        {!ready && <div className="loading-island" role="status"><LoaderCircle className="animate-spin" size={20} /><span>正在为你托起一座小岛…</span></div>}

        <section className="intro-panel">
          <div className="eyebrow"><span className="small-line" />一座漂浮在想象里的城堡</div>
          <h1 className="font-serif">在云的上面，<br />住一会儿。</h1>
          <p>离世界远一点，离童话近一点。<br />在这座小小的浮岛上，<br />每一处风景，都值得慢慢发现。</p>
          <button className="explore-link" onClick={() => { setLabels(true); setOpenChapter(0) }}><span>开启一场小小的漫游</span><ArrowRight size={17} /></button>
          <div className="intro-caption"><Sparkles size={14} className="text-gold" /><span>献给每一个，心里还住着孩子的人。</span></div>
        </section>

        <aside className="atmosphere-panel" aria-label="场景设置">
          <div className="panel-heading"><Sun size={17} strokeWidth={1.5} /><span>此刻的天空</span><span className="live-dot" /></div>
          <ToggleGroup value={[time]} onValueChange={values => { if (values[0]) setTime(values[0] as TimeOfDay) }} spacing={1} className="time-options">
            <ToggleGroupItem value="morning" aria-label="晨光"><Sunrise /><span>晨光</span></ToggleGroupItem>
            <ToggleGroupItem value="sunset" aria-label="落日"><Sun /><span>落日</span></ToggleGroupItem>
            <ToggleGroupItem value="night" aria-label="星夜"><Moon /><span>星夜</span></ToggleGroupItem>
          </ToggleGroup>
          <div className="panel-divider" />
          <div className="setting-row"><label htmlFor="auto-rotate"><RotateCcw size={15} />缓缓环游</label><Switch id="auto-rotate" aria-label="缓缓环游" checked={autoRotate} onCheckedChange={setAutoRotate} /></div>
          <div className="setting-row"><label htmlFor="scene-labels"><Eye size={15} />地点标记</label><Switch id="scene-labels" aria-label="地点标记" checked={labels} onCheckedChange={setLabels} /></div>
        </aside>

        <div className="scene-location"><span /><span>{cutaway ? '城堡剖视 · 看见里面的小世界' : view === 'island' ? '云端城堡 · 无名星系 B-612' : view === 'residents' ? '花园小径 · 居民的日常' : '溪谷林地 · 风经过的地方'}</span></div>

        <aside className="story-preview">
          <div className="story-preview-top"><span><BookOpen size={15} />浮岛手记</span><div><button aria-label="上一章" onClick={() => setChapter((chapter + 2) % 3)}><ChevronLeft size={16} /></button><span>{story.number} / 03</span><button aria-label="下一章" onClick={() => setChapter((chapter + 1) % 3)}><ChevronRight size={16} /></button></div></div>
          <button className="story-preview-body" onClick={() => setOpenChapter(chapter)}><span className="story-illustration"><StoryIcon size={34} strokeWidth={1.2} /></span><span><span className="story-preview-title font-serif">{story.title}</span><span className="story-preview-subtitle">{story.subtitle}</span></span><ArrowUpRight size={17} /></button>
        </aside>

        <div className="world-tools" aria-label="场景工具">
          <ToolButton label="放大" onClick={() => api.current?.zoom(1)} disabled={!ready}><Plus /></ToolButton>
          <ToolButton label="缩小" onClick={() => api.current?.zoom(-1)} disabled={!ready}><Minus /></ToolButton>
          <span className="tool-divider" />
          <ToolButton label="重置视角" onClick={() => api.current?.reset()} disabled={!ready}><RotateCcw /></ToolButton>
          <ToolButton label={autoRotate ? '暂停环游' : '自动环游'} onClick={() => setAutoRotate(!autoRotate)} active={autoRotate}>{autoRotate ? <Pause /> : <Play />}</ToolButton>
          <span className="tool-divider" />
          <ToolButton label={cutaway ? '还原城堡外观' : '打开内部剖视'} active={cutaway} onClick={() => { if (!cutaway) visit('castle'); else { setCutaway(false); setView('island') } }} disabled={!ready}><Layers2 /></ToolButton>
          <ToolButton label="保存明信片" onClick={() => { api.current?.capture(); setNotice('已保存一张来自云端的明信片') }} disabled={!ready}><Camera /></ToolButton>
          <ToolButton label={immersive ? '退出沉浸模式' : '沉浸模式'} onClick={fullscreen}><Expand /></ToolButton>
        </div>
        {immersive && <button className="exit-immersive" onClick={fullscreen}><X size={18} />退出沉浸模式</button>}
        <div className="compass-rose" aria-hidden="true"><span>N</span><Compass size={45} strokeWidth={0.75} /><small>跟着风的方向</small></div>
      </main>

      <footer className="site-footer">
        <span className="footer-note"><span />一个可以慢下来的小世界</span>
        <div className="gesture-hints"><span><Mouse size={15} />拖动旋转</span><span><Move size={15} />右键平移</span><span><ScanLine size={15} />滚轮缩放</span></div>
        <button onClick={() => setHelpOpen(true)}><CircleHelp size={16} /><span>探索指南</span></button>
      </footer>
      {notice && <div className="notice" role="status"><Check size={16} />{notice}</div>}

      <StoryDialog chapter={openChapter} onClose={() => setOpenChapter(null)} onVisit={visit} />
      <Dialog open={downloadOpen} onOpenChange={setDownloadOpen}>
        <DialogContent className="download-dialog sm:max-w-lg">
          <DialogHeader><span className="dialog-emblem"><Box size={28} strokeWidth={1.25} /></span><DialogTitle className="font-serif">把这片小小的天空带走</DialogTitle><DialogDescription>完整场景属于你。下载后，就可以在自己的世界里继续漫游。</DialogDescription></DialogHeader>
          <div className="download-features"><span><Check size={15} />离线 HTML，解压双击即可打开</span><span><Check size={15} />完整 Three.js 模型与 Next.js 源码</span><span><Check size={15} />包含内部构造、人物与昼夜切换</span></div>
          <a className={cn(buttonVariants({ size: 'lg' }), 'zip-download')} href="/downloads/star-isle.zip" download="star-isle.zip"><ArrowDownToLine data-icon="inline-start" />下载完整场景 ZIP<ArrowUpRight data-icon="inline-end" /></a>
          <Button variant="outline" onClick={exportModel} disabled={!ready || exporting}>{exporting ? <LoaderCircle className="animate-spin" data-icon="inline-start" /> : <Box data-icon="inline-start" />}{exporting ? '正在整理模型…' : '只下载 3D 模型 · GLB'}</Button>
          <p className="download-footnote">离线版不需要联网或安装。GLB 可导入 Blender 等 3D 软件；源码建议通过 GitHub 或 v0 的 shadcn CLI 安装。</p>
        </DialogContent>
      </Dialog>
      <Dialog open={helpOpen} onOpenChange={setHelpOpen}>
        <DialogContent className="sm:max-w-lg"><DialogHeader><DialogTitle className="font-serif">像风一样，自由探索</DialogTitle><DialogDescription>这里没有固定的路线，按你喜欢的方式靠近这个世界。</DialogDescription></DialogHeader><div className="help-list"><p><Mouse /><span><strong>旋转与缩放</strong>按住鼠标左键拖动，滚动滚轮靠近或远离。手机上单指旋转，双指缩放和平移。</span></p><p><Hand /><span><strong>换一个角度</strong>右键拖动可以平移视角，底部重置按钮可以回到当前区域的最佳视角。</span></p><p><Layers2 /><span><strong>看看城堡里面</strong>选择「城堡内部」或底部剖视按钮，屋顶与前墙会移开，露出房间、家具和楼梯。</span></p><p><BookOpen /><span><strong>读一段小故事</strong>右下角的手记介绍建筑、居民与地形。打开地点标记，也可以直接点击场景中的地点。</span></p></div></DialogContent>
      </Dialog>
    </div>
  </TooltipProvider>
}
