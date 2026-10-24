'use client'

import dynamic from 'next/dynamic'
import { SceneProvider } from '@/lib/scene-store'
import { Catalog, ControlBar } from './info-panel'

const CastleScene = dynamic(() => import('./scene').then((m) => m.CastleScene), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center font-serif text-muted-foreground">正在搭建浮空岛……</div>
  ),
})

export function CastleExperience() {
  return (
    <SceneProvider>
      <div className="absolute inset-0">
        <CastleScene />
      </div>
      <div className="pointer-events-none absolute inset-0 flex flex-col gap-3 p-3 sm:p-5">
        <ControlBar />
        <div className="flex min-h-0 flex-1 items-start">
          <Catalog />
        </div>
      </div>
    </SceneProvider>
  )
}
