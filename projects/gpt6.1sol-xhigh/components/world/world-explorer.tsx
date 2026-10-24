'use client'

import dynamic from 'next/dynamic'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowDownToLine, ArrowRight, BookOpen, Castle, Check, ChevronDown, Compass, Expand, Flower2, HelpCircle, ImageDown, Layers2, LoaderCircle, MapPin, Maximize, Minus, Moon, Mouse, Move, Orbit, Pause, Play, Plus, RotateCcw, Sparkles, Sun, Sunset, Waves, Wind, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { places, type PlaceId, type TimeOfDay } from '@/lib/world-data'
import type { SceneAPI } from './castle-scene'
import { FieldJournal } from './field-journal'

const CastleScene = dynamic(() => import('./castle-scene'), { ssr: false, loading: () => <div className="scene-loader"><LoaderCircle className="animate-spin" size={24} /><span>正在把一座小岛放上云端…</span></div> })
const placeIcons = { castle: Castle, garden: Flower2, village: Wind, waterfall: Waves }
const timeOptions = [{ id: 'day' as const, label: '柔和晴昼', icon: Sun }, { id: 'sunset' as const, label: '金色日暮', icon: Sunset }, { id: 'night' as const, label: '静谧星夜', icon: Moon }]

export function WorldExplorer() {
  const [cutaway, setCutaway] = useState(false)
  const [time, setTime] = useState<TimeOfDay>('day')
  const [autoRotate, setAutoRotate] = useState(false)
  const [labels, setLabels] = useState(false)
  const [selected, setSelected] = useState<PlaceId | null>(null)
  const [journal, setJournal] = useState(false)
  const [focus, setFocus] = useState<{ id: PlaceId | null; key: number }>({ id: null, key: 0 })
  const [ready, setReady] = useState(false)
  const [exporting, setExporting] = useState(false)
  const [packing, setPacking] = useState(false)
  const [notice, setNotice] = useState('')
  const api = useRef<SceneAPI | null>(null)
  const root = useRef<HTMLElement>(null)
  const about = useRef<HTMLDialogElement>(null)
  const help = useRef<HTMLDialogElement>(null)
  const download = useRef<HTMLDetailsElement>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const currentTime = timeOptions.find(t => t.id === time)!
  const TimeIcon = currentTime.icon

  const onReady = useCallback((value: SceneAPI) => { api.current = value; setReady(true) }, [])
  const notify = (message: string) => { setNotice(message); if (timer.current) clearTimeout(timer.current); timer.current = setTimeout(() => setNotice(''), 4500) }
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])

  const selectPlace = (id: PlaceId) => { setSelected(id); setFocus(v => ({ id, key: v.key + 1 })); setJournal(true); setAutoRotate(false) }
  const reset = () => { setSelected(null); setJournal(false); setFocus(v => ({ id: null, key: v.key + 1 })); setAutoRotate(false) }
  const exportModel = async () => {
    setExporting(true)
    if (download.current) download.current.open = false
    try { await api.current?.exportModel(); notify('GLB 模型已导出，带着这座小岛出发吧。') } catch { notify('模型导出暂未完成，请稍后重试。') } finally { setExporting(false) }
  }
  const downloadProject = async () => {
    if (!api.current || packing || exporting) return
    setPacking(true)
    if (download.current) download.current.open = false
    try {
      const [{ unzipSync, zipSync }, response, model] = await Promise.all([import('fflate'), fetch('/downloads/cloud-castle.zip'), api.current.modelData()])
      if (!response.ok) throw new Error('源码压缩包暂不可用')
      const files = unzipSync(new Uint8Array(await response.arrayBuffer()))
      files['cloud-castle/models/cloud-castle.glb'] = new Uint8Array(model)
      const archive = zipSync(files, { level: 6 })
      const url = URL.createObjectURL(new Blob([archive.buffer as ArrayBuffer], { type: 'application/zip' }))
      const link = document.createElement('a')
      link.href = url
      link.download = '云上来信-完整作品.zip'
      link.click()
      setTimeout(() => URL.revokeObjectURL(url), 1000)
      notify('完整作品已打包：3D 模型与项目源码。')
    } catch { notify('打包暂未完成，请重试或在菜单中仅下载源码。') } finally { setPacking(false) }
  }
  const fullscreen = async () => {
    try { if (document.fullscreenElement) await document.exitFullscreen(); else if (root.current?.requestFullscreen) await root.current.requestFullscreen(); else notify('这个浏览器暂不支持全屏，横屏也能自在探索。') } catch { notify('当前预览暂不支持全屏，可以在独立页面中体验。') }
  }

  return <main ref={root} className="world-explorer font-sans" data-time={time}>
    <header className="site-header">
      <a className="brand" href="/" aria-label="云上来信首页"><span className="brand-symbol"><Orbit strokeWidth={1.3} /></span><span className="brand-name">云上来信<span>让想象，有处可去</span></span></a>
      <nav className="main-nav" aria-label="主导航"><button className={cn('nav-item', !journal && 'active')} onClick={reset}>自由探索</button><button className={cn('nav-item', journal && 'active')} onClick={() => { if (!selected) setSelected('castle'); setJournal(v => !v) }}>岛屿手记</button><button className="nav-item" onClick={() => about.current?.showModal()}>关于这个世界</button></nav>
      <div className="header-actions"><Button variant="ghost" size="icon" aria-label="查看操作指南" onClick={() => help.current?.showModal()}><HelpCircle /></Button><details className="download-menu" ref={download}><summary><ArrowDownToLine size={16} /><span>带走这座小岛</span><ChevronDown size={14} /></summary><div className="download-popover"><p>把想象装进行囊</p><a href="/downloads/cloud-castle.zip" download="云上来信-完整项目.zip" aria-disabled={packing || exporting} onClick={event => { if (ready) { event.preventDefault(); void downloadProject() } }}><span className="download-icon"><Layers2 size={20} /></span><span><strong>{packing ? '正在打包作品…' : '完整作品 ZIP'}</strong><small>GLB 模型、交互界面与完整源码</small></span><ArrowDownToLine size={16} /></a><button onClick={exportModel} disabled={!ready || exporting || packing}><span className="download-icon"><Castle size={20} /></span><span><strong>{exporting ? '正在打包模型…' : '3D 模型 GLB'}</strong><small>可导入 Blender 等三维软件</small></span><ArrowDownToLine size={16} /></button><span className="download-note">模型导出当前可见场景 · <a href="/downloads/cloud-castle.zip" download>仅下载源码</a></span></div></details></div>
    </header>

    <section className="world-stage" aria-label="浮空岛自由探索">
      <div className="intro-copy"><p className="eyebrow"><span /> 一座浮在云上的小小世界</p><h1 className="font-serif text-balance">风住的地方<span className="title-period">。</span></h1><p className="intro-description">把世界放轻一点，<br />让想象飞得远一点。</p><div className="intro-rule" /><p className="intro-footnote">献给每一个<br />心里还住着小孩的人。</p></div>
      <div className="canvas-container"><CastleScene cutaway={cutaway} time={time} autoRotate={autoRotate} labels={labels} selected={selected} focus={focus} onSelect={selectPlace} onReady={onReady} /></div>
      <div className="compass-rose" aria-hidden="true"><span>北</span><Compass strokeWidth={0.9} size={52} /><small>随心而行</small></div>
      <div className="scene-caption"><span className="status-dot" /> {cutaway ? '城堡里面，也藏着一个小世界' : '星语浮岛 · 在云海中，缓缓漂流'}</div>
      <div className="scene-tools" aria-label="视角工具"><Button variant="ghost" size="icon-lg" onClick={() => api.current?.zoom(1)} disabled={!ready} aria-label="放大视角"><Plus /></Button><Button variant="ghost" size="icon-lg" onClick={() => api.current?.zoom(-1)} disabled={!ready} aria-label="缩小视角"><Minus /></Button><span className="tool-separator" /><Button variant="ghost" size="icon-lg" onClick={reset} disabled={!ready} aria-label="重置视角"><RotateCcw /></Button><Button variant="ghost" size="icon-lg" onClick={fullscreen} aria-label="全屏探索"><Expand /></Button></div>
      <div className="gesture-hint"><Mouse size={17} strokeWidth={1.4} /><span>拖动旋转</span><i>·</i><span>滚轮缩放</span><i>·</i><span>右键平移</span></div>
      {journal && selected && <FieldJournal selected={selected} onClose={() => setJournal(false)} onSelect={selectPlace} onCutaway={() => { setCutaway(true); setFocus(v => ({ id: 'castle', key: v.key + 1 })) }} />}
    </section>

    <div className="view-settings">
      <Tabs value={cutaway ? 'inside' : 'outside'} onValueChange={value => { setCutaway(value === 'inside'); if (value === 'inside') { setFocus(v => ({ id: 'castle', key: v.key + 1 })); setAutoRotate(false) } }} className="view-tabs"><TabsList><TabsTrigger value="outside"><Castle size={16} />外观全景</TabsTrigger><TabsTrigger value="inside"><Layers2 size={16} />内部剖面</TabsTrigger></TabsList><TabsContent value="outside" className="sr-only">完整城堡、庭院与浮岛外观</TabsContent><TabsContent value="inside" className="sr-only">展示宴会厅、图书室与寝居的三层内部结构</TabsContent></Tabs>
      <span className="settings-divider" />
      <button className="setting-button" onClick={() => setTime(timeOptions[(timeOptions.findIndex(t => t.id === time) + 1) % 3].id)} aria-label={`当前${currentTime.label}，点击切换时光`}><TimeIcon size={17} strokeWidth={1.5} /><span>{currentTime.label}</span><ChevronDown size={13} /></button>
      <span className="settings-divider" />
      <button className={cn('setting-icon', autoRotate && 'is-on')} aria-label={autoRotate ? '暂停自动环游' : '开启自动环游'} aria-pressed={autoRotate} onClick={() => setAutoRotate(v => !v)}>{autoRotate ? <Pause size={17} /> : <Play size={17} />}<span className="setting-tooltip">自动环游</span></button>
      <button className={cn('setting-icon', labels && 'is-on')} aria-label={labels ? '隐藏地点标记' : '显示地点标记'} aria-pressed={labels} onClick={() => setLabels(v => !v)}><MapPin size={17} /><span className="setting-tooltip">地点标记</span></button>
      <button className="setting-icon" aria-label="保存场景截图" disabled={!ready} onClick={() => { api.current?.screenshot(); notify('这一刻的风景，已保存为 PNG。') }}><ImageDown size={17} /><span className="setting-tooltip">留住风景</span></button>
    </div>

    <section className="discovery-section" aria-labelledby="discovery-title"><div className="discovery-heading"><span className="discovery-icon"><Compass size={21} strokeWidth={1.2} /></span><div><h2 id="discovery-title">每个角落，都有故事</h2><p>选一处，走近一点</p></div></div><div className="destination-list">{places.map(place => { const Icon = placeIcons[place.id]; return <button key={place.id} className={cn('destination', selected === place.id && 'selected')} onClick={() => selectPlace(place.id)}><span className={`destination-art art-${place.id}`}><Icon strokeWidth={1.15} /></span><span className="destination-copy"><strong>{place.title}</strong><small>{place.subtitle}</small></span><ArrowRight className="destination-arrow" size={16} /></button> })}</div></section>

    <footer className="world-footer"><p><Sparkles size={13} /> 用一点童心，造一个世界。</p><span>Three.js 交互世界<span className="footer-dot">·</span>灵感来自《小王子》</span><button onClick={() => about.current?.showModal()}>关于这次创作 <ArrowRight size={13} /></button></footer>
    {notice && <div className="world-toast" role="status"><Check size={17} />{notice}</div>}
    {(exporting || packing) && <div className="export-status" role="status"><LoaderCircle size={16} className="animate-spin" />{packing ? '正在打包模型与完整源码…' : '正在导出 3D 模型…'}</div>}

    <dialog className="world-dialog" ref={about} aria-labelledby="about-title"><button className="dialog-close" onClick={() => about.current?.close()} aria-label="关闭创作说明"><X size={20} /></button><span className="dialog-illustration"><Orbit size={44} strokeWidth={1} /></span><p className="eyebrow">给大人的一封童话来信</p><h2 id="about-title" className="font-serif">世界很大，心可以很轻。</h2><p>这是一座用 Three.js 与想象力搭起的微型世界。中世纪的塔楼、轻轻转动的风车、玻璃罩里的玫瑰，都在一座浮空岛上相遇。</p><p>我们借用了《小王子》温柔、质朴的童话气质，以低多边形造型、纸色石墙、鼠尾草绿屋顶和麦金色细节点亮这个世界。这里的建筑与场景均为程序化构建，而不是一张无法走近的图片。</p><p>下载 ZIP 可以获得完整源码；导出 GLB，可以把当前可见的浮岛模型带入自己的三维创作。无需账号，所有漫游与导出都在浏览器中完成。</p><button className="dialog-primary" onClick={() => about.current?.close()}>回到这片小小世界 <ArrowRight size={16} /></button></dialog>
    <dialog className="world-dialog help-dialog" ref={help} aria-labelledby="help-title"><button className="dialog-close" onClick={() => help.current?.close()} aria-label="关闭操作指南"><X size={20} /></button><span className="dialog-illustration"><Compass size={44} strokeWidth={1} /></span><h2 id="help-title" className="font-serif">不必赶路，随心探索。</h2><div className="help-row"><Mouse /><span><strong>环绕观察</strong>鼠标左键拖动；触屏单指拖动。</span></div><div className="help-row"><Maximize /><span><strong>走近或退远</strong>滚动鼠标滚轮；触屏双指捏合。</span></div><div className="help-row"><Move /><span><strong>自由平移</strong>鼠标右键拖动；触屏双指移动。也可以转到岛屿下方，看看悬浮的岩层。</span></div><div className="help-row"><BookOpen /><span><strong>发现隐藏的故事</strong>点击底部地点卡片，或打开地图标记。切换内部剖面，可以看见城堡中的三层生活。</span></div><button className="dialog-primary" onClick={() => help.current?.close()}>我准备好了 <ArrowRight size={16} /></button></dialog>
  </main>
}
