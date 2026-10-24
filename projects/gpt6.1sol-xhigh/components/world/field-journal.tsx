'use client'

import { BookOpen, ChevronRight, Eye, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { places, type PlaceId } from '@/lib/world-data'

export function FieldJournal({ selected, onClose, onCutaway, onSelect }: { selected: PlaceId; onClose: () => void; onCutaway: () => void; onSelect: (id: PlaceId) => void }) {
  const place = places.find(p => p.id === selected)!
  return <aside className="field-journal" aria-label="岛屿探索手记">
    <div className="journal-topline"><span><BookOpen size={16} /> 岛屿手记</span><Button variant="ghost" size="icon" onClick={onClose} aria-label="收起岛屿手记"><X /></Button></div>
    <div className="journal-scroll">
      <p className="journal-category">{place.category}</p>
      <h2 className="font-serif text-balance">{place.title}</h2>
      <p className="journal-intro">{place.description}</p>
      {place.id === 'castle' && <button className="cutaway-link" onClick={onCutaway}><Eye size={16} /> 打开内部剖面，看看城堡里面 <ChevronRight size={16} /></button>}
      <div className="journal-chapters">{place.details.map(detail => <section key={detail.title}><h3>{detail.title}</h3><p>{detail.text}</p></section>)}</div>
      <div className="journal-next"><span>继续往前走</span>{places.filter(p => p.id !== selected).map(p => <button key={p.id} onClick={() => onSelect(p.id)}>{p.title}<ChevronRight size={16} /></button>)}</div>
    </div>
    <p className="journal-footer">重要的东西，要慢慢才能看见。</p>
  </aside>
}
