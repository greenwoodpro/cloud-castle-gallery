'use client'

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

interface SceneState {
  selected: string | null
  setSelected: (id: string | null) => void
  cutaway: boolean
  setCutaway: (v: boolean) => void
  night: boolean
  setNight: (v: boolean) => void
  autoRotate: boolean
  setAutoRotate: (v: boolean) => void
}

const SceneContext = createContext<SceneState | null>(null)

export function SceneProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<string | null>(null)
  const [cutaway, setCutaway] = useState(false)
  const [night, setNight] = useState(false)
  const [autoRotate, setAutoRotate] = useState(true)

  const value = useMemo(
    () => ({ selected, setSelected, cutaway, setCutaway, night, setNight, autoRotate, setAutoRotate }),
    [selected, cutaway, night, autoRotate],
  )

  return <SceneContext.Provider value={value}>{children}</SceneContext.Provider>
}

export function useScene() {
  const ctx = useContext(SceneContext)
  if (!ctx) throw new Error('useScene must be used within SceneProvider')
  return ctx
}
