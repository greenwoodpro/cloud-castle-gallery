import { useCallback, useEffect, useRef, useState } from 'react'
import IslandUI from './components/IslandUI'
import { LOCATIONS } from './world/data'
import { WorldEngine, type EngineStatus, type WorldSettings } from './world/WorldEngine'

const initialStatus: EngineStatus = {
  hour: 9.15,
  weather: 'clear',
  rain: 0,
  fps: 0,
  quality: '细腻',
  residents: [],
}

export default function App() {
  const sceneHost = useRef<HTMLDivElement>(null)
  const engine = useRef<WorldEngine | null>(null)
  const [ready, setReady] = useState(false)
  const [error, setError] = useState('')
  const [status, setStatus] = useState<EngineStatus>(initialStatus)
  const [selectedLocationId, setSelectedLocationId] = useState('overview')
  const [selectedResidentId, setSelectedResidentId] = useState<string | null>(null)
  const [audioEnabled, setAudioEnabled] = useState(false)
  const [settings, setSettings] = useState<WorldSettings>(() => ({
    timeScale: 1,
    wind: 0.35,
    weather: 'auto',
    season: '春',
    cutaway: false,
    autoRotate: false,
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    paused: false,
  }))

  useEffect(() => {
    if (!sceneHost.current) return
    try {
      const world = new WorldEngine(sceneHost.current, {
        onLocation: (id) => {
          setSelectedLocationId(id)
          setSelectedResidentId(null)
          engine.current?.focusLocation(id)
          const location = LOCATIONS.find((item) => item.id === id)
          if (location?.interior) setSettings((previous) => ({ ...previous, cutaway: true }))
        },
        onResident: (id) => setSelectedResidentId(id),
        onStatus: setStatus,
      })
      engine.current = world
      world.updateSettings(settings)
      setReady(true)
    } catch (reason) {
      console.error(reason)
      setError('当前浏览器未能启动 WebGL。请开启硬件加速后重新造访这座岛屿。')
      setReady(true)
    }
    return () => {
      engine.current?.dispose()
      engine.current = null
    }
    // The world is deliberately created once; all later changes are live settings.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    engine.current?.updateSettings(settings)
  }, [settings])

  const updateSettings = useCallback((patch: Partial<WorldSettings>) => {
    setSettings((previous) => ({ ...previous, ...patch }))
  }, [])

  const selectLocation = useCallback((id: string) => {
    setSelectedLocationId(id)
    setSelectedResidentId(null)
    engine.current?.focusLocation(id)
    const location = LOCATIONS.find((item) => item.id === id)
    if (location?.interior) setSettings((previous) => ({ ...previous, cutaway: true }))
  }, [])

  const toggleAudio = useCallback(async () => {
    const next = !audioEnabled
    setAudioEnabled(next)
    try {
      await engine.current?.setAudio(next)
    } catch {
      setAudioEnabled(false)
    }
  }, [audioEnabled])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement
      if (target.matches('input, textarea, select, button') || target.isContentEditable) return
      if (event.code === 'Space') {
        event.preventDefault()
        setSettings((previous) => ({ ...previous, paused: !previous.paused }))
      } else if (event.key.toLowerCase() === 'm') {
        void toggleAudio()
      } else if (event.key.toLowerCase() === 'c') {
        setSettings((previous) => ({ ...previous, cutaway: !previous.cutaway }))
      } else if (event.key.toLowerCase() === 'r') {
        selectLocation('overview')
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selectLocation, toggleAudio])

  return (
    <main className="app-shell">
      <div ref={sceneHost} className="scene-host" />
      <div className="scene-vignette" aria-hidden="true" />
      <IslandUI
        ready={ready}
        status={status}
        settings={settings}
        audioEnabled={audioEnabled}
        selectedLocationId={selectedLocationId}
        selectedResidentId={selectedResidentId}
        onLocation={selectLocation}
        onResident={setSelectedResidentId}
        onSettings={updateSettings}
        onHour={(hour) => engine.current?.setHour(hour)}
        onAudio={() => { void toggleAudio() }}
        onFocusResident={(id) => engine.current?.focusResident(id)}
        onGreetResident={(id) => engine.current?.greetResident(id)}
      />
      {error && <div className="webgl-error" role="alert">{error}</div>}
    </main>
  )
}
