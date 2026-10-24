'use client'

import { useState, type ReactNode } from 'react'
import { ChevronDown, Download, Moon, RotateCw, Scissors, Sun, X } from 'lucide-react'
import { categories, findItem, itemsByCategory, type CategoryId } from '@/lib/castle-data'
import { useScene } from '@/lib/scene-store'
import { cn } from '@/lib/utils'

function Toggle({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: ReactNode; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors',
        active ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card/80 text-card-foreground hover:bg-accent',
      )}
    >
      {icon}
      {label}
    </button>
  )
}

export function ControlBar() {
  const { cutaway, setCutaway, night, setNight, autoRotate, setAutoRotate } = useScene()
  return (
    <div className="pointer-events-auto flex flex-wrap items-center gap-2">
      <Toggle active={cutaway} onClick={() => setCutaway(!cutaway)} icon={<Scissors className="size-4" />} label="剖面视图" />
      <Toggle
        active={night}
        onClick={() => setNight(!night)}
        icon={night ? <Moon className="size-4" /> : <Sun className="size-4" />}
        label={night ? '夜晚' : '黄昏'}
      />
      <Toggle active={autoRotate} onClick={() => setAutoRotate(!autoRotate)} icon={<RotateCw className="size-4" />} label="自动旋转" />
      <a
        href="/api/download"
        download
        className="flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1.5 text-sm text-card-foreground transition-colors hover:bg-accent"
      >
        <Download className="size-4" />
        下载源码 ZIP
      </a>
    </div>
  )
}

export function Catalog() {
  const { selected, setSelected, setCutaway } = useScene()
  const [open, setOpen] = useState<CategoryId>('architecture')
  const current = findItem(selected)

  const choose = (id: string, category: CategoryId) => {
    setSelected(id)
    if (category === 'interior') setCutaway(true)
  }

  return (
    <aside className="pointer-events-auto flex max-h-full w-full flex-col gap-3 overflow-hidden rounded-2xl border border-border bg-card/85 p-4 text-card-foreground shadow-lg backdrop-blur-md sm:w-80">
      <header className="flex flex-col gap-1">
        <h1 className="font-serif text-xl font-semibold text-balance">浮空岛上的中世纪城堡</h1>
        <p className="text-xs leading-relaxed text-muted-foreground">
          拖拽旋转、滚轮缩放、右键平移。点击场景中的任何东西，或从下面的目录中选择，阅读它的故事。
        </p>
      </header>

      {current ? (
        <section className="flex flex-col gap-2 rounded-xl bg-accent/70 p-3" aria-live="polite">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                {categories.find((c) => c.id === current.category)?.label}
              </p>
              <h2 className="font-serif text-base font-semibold">{current.name}</h2>
            </div>
            <button type="button" onClick={() => setSelected(null)} aria-label="关闭详情" className="rounded-full p-1 hover:bg-card">
              <X className="size-4" />
            </button>
          </div>
          <p className="text-sm leading-relaxed text-pretty">{current.detail}</p>
        </section>
      ) : (
        <p className="rounded-xl bg-accent/50 p-3 text-sm leading-relaxed text-muted-foreground">
          「只有用心才能看得清楚，本质的东西用眼睛是看不见的。」
        </p>
      )}

      <nav className="flex min-h-0 flex-col gap-1 overflow-y-auto" aria-label="场景目录">
        {categories.map((cat) => {
          const items = itemsByCategory(cat.id)
          const isOpen = open === cat.id
          return (
            <div key={cat.id} className="flex flex-col">
              <button
                type="button"
                onClick={() => setOpen(cat.id)}
                aria-expanded={isOpen}
                className="flex items-center justify-between rounded-lg px-2 py-1.5 text-left text-sm font-medium hover:bg-accent"
              >
                <span>
                  {cat.label}
                  <span className="ml-2 text-xs text-muted-foreground">{items.length}</span>
                </span>
                <ChevronDown className={cn('size-4 transition-transform', isOpen && 'rotate-180')} />
              </button>
              {isOpen && (
                <ul className="flex flex-col gap-0.5 pb-2 pl-2">
                  <li className="px-2 py-1 text-xs leading-relaxed text-muted-foreground">{cat.description}</li>
                  {items.map((item) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => choose(item.id, cat.id)}
                        className={cn(
                          'flex w-full flex-col rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-accent',
                          selected === item.id && 'bg-primary/10 ring-1 ring-primary/40',
                        )}
                      >
                        <span className="text-sm">{item.name}</span>
                        <span className="text-xs leading-relaxed text-muted-foreground">{item.summary}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}
