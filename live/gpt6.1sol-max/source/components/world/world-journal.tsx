'use client'

import { ArrowUpRight, BookOpen, Box, Download, Mouse, Move, ZoomIn } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button, buttonVariants } from '@/components/ui/button'
import { PLACES, type PlaceId } from '@/lib/world/config'
import { PLACE_ICONS } from './explorer-sidebar'
import { cn } from '@/lib/utils'

export function WorldJournal({ open, onOpenChange, selected, onInterior }: { open: boolean; onOpenChange: (open: boolean) => void; selected: PlaceId; onInterior: () => void }) {
  const place = PLACES.find((item) => item.id === selected)!
  const Icon = PLACE_ICONS[selected]
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="journal-dialog">
        <DialogHeader>
          <div className="journal-eyebrow"><BookOpen size={16} /> 云间手记 · 世界的一角</div>
          <div className="journal-heading"><span className="journal-icon"><Icon size={28} strokeWidth={1.4} /></span><div><DialogTitle className="font-serif">{place.name}</DialogTitle><DialogDescription>{place.subtitle}</DialogDescription></div></div>
        </DialogHeader>
        <p className="journal-intro">{place.description}</p>
        <div className="journal-sections">
          {place.details.map((detail) => <section key={detail.title}><h3>{detail.title}</h3><p>{detail.text}</p></section>)}
        </div>
        {selected === 'castle' && <Button className="journal-interior-button" onClick={() => { onInterior(); onOpenChange(false) }}><Box data-icon="inline-start" />打开城堡剖面，看看里面<ArrowUpRight data-icon="inline-end" /></Button>}
        <div className="journal-help"><span><Mouse size={15} /> 拖动旋转</span><span><ZoomIn size={15} /> 滚轮缩放</span><span><Move size={15} /> 右键平移</span></div>
        <a className={cn(buttonVariants({ variant: 'outline' }), 'journal-download')} href="/downloads/cloud-castle.zip" download="云间之境-浮空城堡.zip"><Download data-icon="inline-start" />将完整世界打包带走 <span>ZIP · 离线展示 / GLB / 源码</span></a>
      </DialogContent>
    </Dialog>
  )
}
