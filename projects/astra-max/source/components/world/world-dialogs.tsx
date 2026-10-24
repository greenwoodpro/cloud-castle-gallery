'use client'

import { ArrowUpRight, BookOpen, Check, ChevronRight, Download, FileArchive, Image as ImageIcon, LoaderCircle, Mouse, Move, Package, Rotate3D, ScrollText, ZoomIn } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { PLACES, RESIDENTS, type PlaceId } from '@/lib/world-data'

export type DialogKind = 'journal' | 'guide' | 'download' | null

type Props = {
  open: DialogKind
  onClose: () => void
  onVisit: (id: PlaceId, interior?: boolean) => void
  thumbnails: Record<string, string>
  downloading: boolean
  downloaded: boolean
  downloadStatus: string
  downloadError: string
  onDownload: () => void
}

export function WorldDialogs(props: Props) {
  return (
    <>
      <Dialog open={props.open === 'journal'} onOpenChange={(open) => { if (!open) props.onClose() }}>
        <DialogContent className="story-dialog max-h-[88dvh] overflow-y-auto sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>云屿 · 岛屿手记</DialogTitle>
            <DialogDescription>每一扇窗后面，都藏着一个小小的世界。</DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="castle">
            <TabsList variant="line" className="w-full">
              <TabsTrigger value="castle">城堡构造</TabsTrigger>
              <TabsTrigger value="people">岛上居民</TabsTrigger>
              <TabsTrigger value="nature">地形与环境</TabsTrigger>
            </TabsList>
            <TabsContent value="castle">
              <div className="journal-scene">
                {props.thumbnails.castle && <img src={props.thumbnails.castle} alt="风栖城堡的实时 3D 模型预览" />}
                <div><p className="journal-eyebrow">一座为日常而建的城堡</p><h3>石墙很厚，生活很轻。</h3><p>{PLACES[0].description}</p></div>
              </div>
              <div className="floor-notes">
                <section><span>一层</span><div><h4>炉火与长桌</h4><p>木制长桌、六把椅子与烛台构成宴会厅。右侧的石砌炉灶旁摆着陶罐，地面的木板纹理通向连接二层的侧梯。这里也是访客与居民一起吃晚饭的地方。</p></div></section>
                <section><span>二层</span><div><h4>藏书与午后</h4><p>三组木书架沿后墙排开，彩色书脊按层排列。窗前的阅读桌上放着展开的书，旁边是一盏烛灯。窄木阶继续通向更安静的上层。</p></div></section>
                <section><span>三层</span><div><h4>星图与好梦</h4><p>四柱床铺着浅色枕被与玫瑰色毯子，床边留一块金色地毯。小书桌上的地球仪提醒旅人：世界很大，而此刻可以安心睡去。</p></div></section>
              </div>
              <div className="journal-action"><p>圆塔、垛口、拱门与石窗，围成完整的欧洲城堡院落。</p><Button onClick={() => props.onVisit('castle', true)}><BookOpen data-icon="inline-start" />掀开屋顶，走进去<ArrowUpRight data-icon="inline-end" /></Button></div>
            </TabsContent>
            <TabsContent value="people">
              <div className="residents-grid">
                {RESIDENTS.map((resident, index) => (
                  <section key={resident.name} className="resident-card">
                    <div className={`resident-portrait portrait-${index}`} aria-hidden="true"><span className="portrait-head" /><span className="portrait-body" /></div>
                    <div><p className="journal-eyebrow">{resident.role}</p><h3>{resident.name}</h3><p>{resident.description}</p><Button variant="link" onClick={() => props.onVisit(resident.location)}>去打个招呼<ChevronRight data-icon="inline-end" /></Button></div>
                  </section>
                ))}
              </div>
              <p className="journal-footnote">还有一只溪边的小狐狸、两只散步的绵羊，以及绕着高塔飞行的白鸟。靠近一点，就能发现它们。</p>
            </TabsContent>
            <TabsContent value="nature">
              <div className="nature-notes">
                {PLACES.slice(1).map((place) => (
                  <section key={place.id}>
                    {props.thumbnails[place.id] && <img src={props.thumbnails[place.id]} alt={`${place.title}的实时场景`} />}
                    <div><p className="journal-eyebrow">{place.tag}</p><h3>{place.title}</h3><p>{place.detail}</p><Button variant="link" onClick={() => props.onVisit(place.id)}>在这里停一会儿<ArrowUpRight data-icon="inline-end" /></Button></div>
                  </section>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
      <Dialog open={props.open === 'guide'} onOpenChange={(open) => { if (!open) props.onClose() }}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader><DialogTitle>没有路线的旅行</DialogTitle><DialogDescription>这个世界很小，你可以慢慢看。</DialogDescription></DialogHeader>
          <div className="guide-list">
            <div><Rotate3D /><span><strong>拖动，换个角度</strong><p>鼠标左键拖动或单指滑动，自由环绕岛屿。</p></span></div>
            <div><ZoomIn /><span><strong>靠近一点</strong><p>滚轮或双指捏合缩放，也可以使用右侧加减按钮。</p></span></div>
            <div><Move /><span><strong>移动你的目光</strong><p>右键拖动或双指同向拖动，可以平移视角。</p></span></div>
            <div><BookOpen /><span><strong>翻开城堡</strong><p>打开剖面模式，观察真实搭建的三层室内与陈设。</p></span></div>
            <div><Mouse /><span><strong>随时找到回来的路</strong><p>点击地点标签或下方卡片前往；按 R 回到全景，C 切换剖面，L 显隐标签。</p></span></div>
          </div>
          <p className="journal-footnote">晴日、黄昏与星夜可以随心切换。自然风声由浏览器实时合成，默认关闭；系统的减少动态效果设置也会被尊重。</p>
        </DialogContent>
      </Dialog>
      <Dialog open={props.open === 'download'} onOpenChange={(open) => { if (!open) props.onClose() }}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader><DialogTitle>把这个小世界，带走吧。</DialogTitle><DialogDescription>不是一张图片，而是一整座可以继续创造的岛屿。</DialogDescription></DialogHeader>
          <div className="download-emblem" aria-hidden="true">{props.downloading ? <LoaderCircle className="animate-spin" /> : props.downloaded ? <Check /> : <Package />}</div>
          <div className="download-contents">
            <div><Package /><span><strong>完整 3D 模型</strong><small>world.glb · 包含全部室内与居民</small></span></div>
            <div><FileArchive /><span><strong>可编辑项目源码</strong><small>Next.js + Three.js · 完整依赖配置</small></span></div>
            <div><ImageIcon /><span><strong>此刻的风景</strong><small>preview.png · 当前视角高清截图</small></span></div>
            <div><ScrollText /><span><strong>岛屿手记与使用说明</strong><small>中文设定 · 操作与部署指引</small></span></div>
          </div>
          <p className="download-status" role="status" aria-live="polite">{props.downloadError || props.downloadStatus || 'GLB 为静态完整模型；风、水流与交互保留在源码中。'}</p>
          <Button size="lg" onClick={props.onDownload} disabled={props.downloading}>
            {props.downloading ? <LoaderCircle className="animate-spin" data-icon="inline-start" /> : <Download data-icon="inline-start" />}
            {props.downloading ? '正在打包小世界…' : props.downloaded ? '再次下载完整 ZIP' : props.downloadError ? '重试下载' : '下载完整世界 ZIP'}
          </Button>
          <a href="/downloads/cloud-island-source.zip" download="云屿-项目源码.zip" className="source-download">只下载项目源码</a>
        </DialogContent>
      </Dialog>
    </>
  )
}
