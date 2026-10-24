'use client'

import { ArrowUpRight, Castle, Flower2, Leaf, Sparkles, Trees, Waves, Wind } from 'lucide-react'
import { PLACES, type PlaceId } from '@/lib/world/config'
import { cn } from '@/lib/utils'

export const PLACE_ICONS = { castle: Castle, garden: Flower2, village: Wind, forest: Trees, waterfall: Waves }
const descriptions: Record<PlaceId, string> = {
  castle: '高塔、庭院与窗后的故事',
  garden: '一朵被认真照料的玫瑰',
  village: '风车转动，日子慢慢',
  forest: '树影里藏着小小的秘密',
  waterfall: '在世界尽头，汇入云海',
}

export function ExplorerSidebar({ selected, onSelect, onRead }: { selected: PlaceId; onSelect: (id: PlaceId) => void; onRead: () => void }) {
  return (
    <aside className="explorer-sidebar" aria-label="小岛探索导览">
      <div className="intro-copy">
        <div className="eyebrow"><Sparkles className="tiny-star" size={15} strokeWidth={1.3} /> 献给心里还住着孩子的你</div>
        <h1 className="font-serif text-balance">把童话，<br />安放在云端。</h1>
        <p className="intro-description">有一座城堡，漂浮在云海之上。<br />不必赶路，随心去看看。</p>
      </div>
      <div className="places-section">
        <div className="section-label"><span>小岛漫游指南</span><span className="place-count">5 处小小的美好</span></div>
        <nav className="place-list" aria-label="选择探索地点">
          {PLACES.map((place) => {
            const Icon = PLACE_ICONS[place.id]
            return (
              <button key={place.id} className={cn('place-button', selected === place.id && 'place-active')} onClick={() => onSelect(place.id)} aria-current={selected === place.id ? 'location' : undefined}>
                <span className="place-icon"><Icon size={20} strokeWidth={1.5} /></span>
                <span className="place-copy"><span>{place.name}</span><span className="place-description">{descriptions[place.id]}</span></span>
                <ArrowUpRight size={16} strokeWidth={1.5} className="place-arrow" />
              </button>
            )
          })}
        </nav>
      </div>
      <button className="sidebar-note" onClick={onRead}>
        <Leaf size={20} strokeWidth={1.4} />
        <span><span className="note-title font-serif">用心看，才能看得清。</span><span className="note-caption">翻开这座小岛的故事 <ArrowUpRight size={14} /></span></span>
      </button>
      <div className="sidebar-colophon"><span className="status-dot" />一个可以慢慢探索的 3D 世界</div>
    </aside>
  )
}
