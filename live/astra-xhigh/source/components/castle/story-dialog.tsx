'use client'

import { ArrowUpRight, BookOpen, Castle, Leaf, Users } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { chapters, type WorldView } from '@/lib/world-data'

export function StoryDialog({ chapter, onClose, onVisit }: { chapter: number | null; onClose: () => void; onVisit: (view: WorldView) => void }) {
  const story = chapters[chapter ?? 0]
  const Icon = [Castle, Users, Leaf][chapter ?? 0]
  return <Dialog open={chapter !== null} onOpenChange={open => { if (!open) onClose() }}>
    <DialogContent className="story-dialog sm:max-w-xl">
      <DialogHeader>
        <div className="story-eyebrow"><BookOpen size={16} /><span>星屿手记 / 第 {story.number} 章</span></div>
        <DialogTitle className="story-title font-serif">{story.title}</DialogTitle>
        <DialogDescription>{story.description}</DialogDescription>
      </DialogHeader>
      <div className="story-sections">
        {story.sections.map((section, index) => <section key={section.title}>
          <span className="story-section-marker">{index === 0 ? <Icon size={17} /> : <span />}</span>
          <div><h3>{section.title}</h3><p>{section.text}</p></div>
        </section>)}
      </div>
      <div className="story-dialog-footer"><span>慢慢看，世界会告诉你更多。</span><Button onClick={() => { onVisit(story.view); onClose() }}>前往探索<ArrowUpRight data-icon="inline-end" /></Button></div>
    </DialogContent>
  </Dialog>
}
