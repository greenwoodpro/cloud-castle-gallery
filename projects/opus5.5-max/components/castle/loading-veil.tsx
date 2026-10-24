'use client'

import { Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export function LoadingVeil({ ready, error }: { ready: boolean; error: string | null }) {
  const [mounted, setMounted] = useState(true)

  useEffect(() => {
    if (!ready) return
    const timer = window.setTimeout(() => setMounted(false), 900)
    return () => window.clearTimeout(timer)
  }, [ready])

  if (!mounted) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'absolute inset-0 z-50 flex flex-col items-center justify-center gap-5 bg-primary px-6 text-center text-primary-foreground transition-opacity duration-700',
        ready ? 'pointer-events-none opacity-0' : 'opacity-100',
      )}
    >
      <Star className={cn('size-10 fill-accent text-accent', !error && 'animate-pulse')} aria-hidden="true" />
      <p className="font-serif text-3xl">星辰城堡</p>
      <p className="max-w-sm text-sm leading-relaxed text-primary-foreground/80 text-pretty">
        {error ?? '正在把城堡、麦田和星星一笔一笔画出来……'}
      </p>
    </div>
  )
}
