import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import {
  Activity,
  BookOpen,
  Castle,
  ChevronRight,
  Clock3,
  Cloud,
  CloudRain,
  Compass,
  Eye,
  Layers3,
  Leaf,
  MapPin,
  MousePointer2,
  Pause,
  Play,
  Rotate3D,
  RotateCcw,
  Settings2,
  Sun,
  Users,
  Volume2,
  VolumeX,
  Wind,
  X,
} from 'lucide-react'
import { LOCATIONS, RESIDENTS, WEATHER_LABELS } from '../world/data'
import type { EngineStatus, WorldSettings } from '../world/WorldEngine'

interface IslandUIProps {
  ready: boolean
  status: EngineStatus
  settings: WorldSettings
  audioEnabled: boolean
  selectedLocationId: string
  selectedResidentId: string | null
  onLocation: (id: string) => void
  onResident: (id: string | null) => void
  onSettings: (settings: Partial<WorldSettings>) => void
  onHour: (hour: number) => void
  onAudio: () => void
  onFocusResident: (id: string) => void
  onGreetResident: (id: string) => void
}

function formatTime(hour: number) {
  const h = Math.floor(hour) % 24
  const m = Math.floor((hour - Math.floor(hour)) * 60)
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <button type="button" className={`toggle ${checked ? 'is-on' : ''}`} role="switch" aria-checked={checked} aria-label={label} onClick={onChange}>
      <span />
    </button>
  )
}

function WeatherIcon({ weather }: { weather: EngineStatus['weather'] }) {
  if (weather === 'rain') return <CloudRain size={15} />
  if (weather === 'cloudy') return <Cloud size={15} />
  return <Sun size={15} />
}

export default function IslandUI({
  ready,
  status,
  settings,
  audioEnabled,
  selectedLocationId,
  selectedResidentId,
  onLocation,
  onResident,
  onSettings,
  onHour,
  onAudio,
  onFocusResident,
  onGreetResident,
}: IslandUIProps) {
  const [tab, setTab] = useState<'places' | 'people'>('places')
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [guideOpen, setGuideOpen] = useState(false)
  const [storyOpen, setStoryOpen] = useState(true)
  const [scrubbing, setScrubbing] = useState(false)
  const [localHour, setLocalHour] = useState(status.hour)
  const location = LOCATIONS.find((item) => item.id === selectedLocationId) ?? LOCATIONS[0]
  const resident = RESIDENTS.find((item) => item.id === selectedResidentId)
  const residentSnapshot = status.residents.find((item) => item.id === selectedResidentId)
  const awake = status.residents.filter((item) => item.state !== '休息').length

  useEffect(() => {
    if (!scrubbing) setLocalHour(status.hour)
  }, [status.hour, scrubbing])

  useEffect(() => {
    setStoryOpen(true)
    setGuideOpen(false)
  }, [selectedLocationId, selectedResidentId])

  const groupedLocations = useMemo(() => {
    return [
      { label: '城堡内部与城墙', items: LOCATIONS.filter((item) => item.category === '城堡') },
      { label: '岛屿地貌与生态', items: LOCATIONS.filter((item) => item.category !== '城堡') },
    ]
  }, [])

  const selectLocation = (id: string) => {
    onLocation(id)
    setStoryOpen(true)
  }

  const selectResident = (id: string) => {
    onResident(id)
    setStoryOpen(true)
  }

  return (
    <div className="interface-layer">
      <div className={`loading-veil ${ready ? 'is-ready' : ''}`} aria-hidden={ready}>
        <div className="loading-mark"><Castle size={24} /></div>
        <p>正在唤醒云上的岛屿</p>
        <span>铺设道路、点亮窗户、召集居民…</span>
        <div className="loading-line"><i /></div>
      </div>

      <header className="topbar">
        <div className="brand-block">
          <div className="brand-sigil"><Castle size={21} strokeWidth={1.5} /></div>
          <div>
            <h1>云上玫瑰堡</h1>
            <p>ASTERIA · 一座仍在生活的浮岛</p>
          </div>
        </div>
        <div className="world-status" aria-live="polite">
          <span className="status-time"><Clock3 size={14} />{formatTime(status.hour)}</span>
          <span className="status-divider" />
          <span><WeatherIcon weather={status.weather} />{settings.weather === 'auto' ? '自动 · ' : ''}{WEATHER_LABELS[status.weather]}</span>
          <span className="status-divider optional" />
          <span className="optional"><Users size={14} />{awake || RESIDENTS.length} 位居民活动</span>
        </div>
        <nav className="top-actions" aria-label="世界工具">
          <button type="button" className="icon-button mobile-guide-button" onClick={() => setGuideOpen((value) => !value)} aria-label="打开岛屿导览">
            <BookOpen size={18} />
          </button>
          <button type="button" className={`icon-button ${audioEnabled ? 'is-active' : ''}`} onClick={onAudio} aria-label={audioEnabled ? '关闭环境声音' : '开启环境声音'} title={audioEnabled ? '静音（M）' : '开启生成环境音（M）'}>
            {audioEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
          <button type="button" className={`icon-button ${settingsOpen ? 'is-active' : ''}`} onClick={() => setSettingsOpen((value) => !value)} aria-label="世界参数设置" aria-expanded={settingsOpen}>
            <Settings2 size={18} />
          </button>
        </nav>
      </header>

      <aside className={`guide-panel glass-panel ${guideOpen ? 'is-mobile-open' : ''}`} aria-label="岛屿导览">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">FIELD NOTES · 07</span>
            <h2>岛屿导览</h2>
          </div>
          <button type="button" className="panel-close mobile-only" onClick={() => setGuideOpen(false)} aria-label="关闭导览"><X size={17} /></button>
        </div>
        <div className="segmented-tabs" role="tablist" aria-label="导览类别">
          <button type="button" role="tab" aria-selected={tab === 'places'} className={tab === 'places' ? 'is-active' : ''} onClick={() => setTab('places')}><MapPin size={14} />地点</button>
          <button type="button" role="tab" aria-selected={tab === 'people'} className={tab === 'people' ? 'is-active' : ''} onClick={() => setTab('people')}><Users size={14} />居民</button>
        </div>
        <div className="guide-scroll">
          {tab === 'places' ? (
            <div className="tab-content" key="places">
              {groupedLocations.map((group) => (
                <section className="location-group" key={group.label}>
                  <h3>{group.label}<span>{group.items.length}</span></h3>
                  {group.items.map((item) => (
                    <button type="button" key={item.id} className={`location-item ${selectedLocationId === item.id && !resident ? 'is-active' : ''}`} onClick={() => selectLocation(item.id)}>
                      <span className="location-marker">{item.interior ? <Layers3 size={14} /> : item.category === '地下' ? <Compass size={14} /> : <Leaf size={14} />}</span>
                      <span><strong>{item.shortName}</strong><small>{item.eyebrow}</small></span>
                      <ChevronRight size={14} className="item-chevron" />
                    </button>
                  ))}
                </section>
              ))}
            </div>
          ) : (
            <div className="tab-content residents-list" key="people">
              <p className="list-intro">每个人都在按照自己的作息生活。点击姓名查看故事，状态来自正在运行的世界。</p>
              {RESIDENTS.map((person) => {
                const snapshot = status.residents.find((item) => item.id === person.id)
                return (
                  <button type="button" key={person.id} className={`resident-item ${selectedResidentId === person.id ? 'is-active' : ''}`} onClick={() => selectResident(person.id)}>
                    <span className="resident-avatar" style={{ '--person-color': person.color, '--person-accent': person.accent } as CSSProperties}>{person.name.slice(0, 1)}</span>
                    <span className="resident-copy"><strong>{person.name}<small>{person.role}</small></strong><span><i className={snapshot?.state === '休息' ? 'is-resting' : ''} />{snapshot?.activity ?? '正在加入岛屿生活'}</span></span>
                    <ChevronRight size={14} />
                  </button>
                )
              })}
            </div>
          )}
        </div>
        <div className="guide-footer"><Activity size={13} /><span>实时模拟</span><b>{status.fps || '—'} FPS</b><i />{status.quality}画质</div>
      </aside>

      <aside className={`story-panel glass-panel ${storyOpen ? 'is-open' : 'is-closed'}`} aria-label={resident ? '居民故事' : '地点岛志'}>
        <button type="button" className="story-close icon-button" onClick={() => setStoryOpen(false)} aria-label="收起详情"><X size={16} /></button>
        {resident ? (
          <div className="story-content resident-story" key={resident.id}>
            <span className="eyebrow">ISLAND RESIDENT · 居民志</span>
            <div className="resident-title">
              <span className="resident-avatar large" style={{ '--person-color': resident.color, '--person-accent': resident.accent } as CSSProperties}>{resident.name.slice(0, 1)}</span>
              <div><h2>{resident.name}</h2><p>{resident.role}</p></div>
            </div>
            <div className="live-activity"><span><i />{residentSnapshot?.state ?? '漫步'}</span><p>{residentSnapshot?.activity ?? '正在岛上寻找今天的目的地'}</p></div>
            <p className="person-trait">{resident.trait}</p>
            <p className="story-description">{resident.story}</p>
            <blockquote>“{residentSnapshot?.line ?? resident.lines[0]}”</blockquote>
            <div className="energy-row"><span>今日精力</span><div><i style={{ width: `${Math.round((residentSnapshot?.energy ?? 0.7) * 100)}%` }} /></div><b>{Math.round((residentSnapshot?.energy ?? 0.7) * 100)}%</b></div>
            <div className="story-actions">
              <button type="button" className="primary-button" onClick={() => onFocusResident(resident.id)}><Eye size={15} />靠近看看</button>
              <button type="button" className="secondary-button" onClick={() => onGreetResident(resident.id)}><span className="hand-wave">⌒</span>打个招呼</button>
            </div>
            <button type="button" className="text-button" onClick={() => onResident(null)}><BookOpen size={14} />返回当前地点岛志</button>
          </div>
        ) : (
          <div className="story-content" key={location.id}>
            <span className="eyebrow">{location.eyebrow}</span>
            <h2>{location.name}</h2>
            <p className="story-description">{location.description}</p>
            <div className="architecture-note"><Layers3 size={16} /><div><h3>空间与构造</h3><p>{location.architecture}</p></div></div>
            <dl className="location-details">
              {location.details.map((detail) => <div key={detail.label}><dt>{detail.label}</dt><dd>{detail.value}</dd></div>)}
            </dl>
            <p className="ambience-note"><MousePointer2 size={14} />{location.ambience}</p>
            <div className="story-actions">
              {location.interior && <button type="button" className={`primary-button ${settings.cutaway ? 'is-active' : ''}`} onClick={() => onSettings({ cutaway: !settings.cutaway })}><Layers3 size={15} />{settings.cutaway ? '合拢城堡剖面' : '展开城堡剖面'}</button>}
              <button type="button" className="secondary-button" onClick={() => selectLocation('overview')}><RotateCcw size={15} />返回全景</button>
            </div>
          </div>
        )}
      </aside>

      {!storyOpen && <button type="button" className="reopen-story glass-panel" onClick={() => setStoryOpen(true)}><BookOpen size={15} />{resident ? `${resident.name}的居民志` : location.shortName}</button>}

      <section className={`settings-panel glass-panel ${settingsOpen ? 'is-open' : ''}`} aria-label="实时世界参数" aria-hidden={!settingsOpen}>
        <div className="panel-heading"><div><span className="eyebrow">LIVE WORLD</span><h2>岛务与天空</h2></div><button type="button" className="icon-button" onClick={() => setSettingsOpen(false)} aria-label="关闭设置"><X size={16} /></button></div>
        <div className="setting-row slider-row">
          <label><span><Clock3 size={14} />时间流速</span><b>{settings.timeScale.toFixed(1)}×</b></label>
          <input type="range" min="0" max="4" step="0.1" value={settings.timeScale} onChange={(event) => onSettings({ timeScale: Number(event.target.value) })} aria-label="时间流速" />
          <small>只改变昼夜流逝，人物仍按自身步速行动</small>
        </div>
        <div className="setting-row slider-row">
          <label><span><Wind size={14} />世界风场</span><b>{Math.round(settings.wind * 100)}%</b></label>
          <input type="range" min="0" max="1" step="0.01" value={settings.wind} onChange={(event) => onSettings({ wind: Number(event.target.value) })} aria-label="世界风力" />
          <small>同时影响树冠、旗帜、云层、粒子与环境音</small>
        </div>
        <div className="setting-row">
          <label className="setting-label"><CloudRain size={14} />天气系统</label>
          <div className="choice-grid weather-choices">
            {(['auto', 'clear', 'cloudy', 'rain'] as const).map((weather) => <button type="button" key={weather} className={settings.weather === weather ? 'is-active' : ''} onClick={() => onSettings({ weather })}>{weather === 'auto' ? '自动' : weather === 'clear' ? '晴朗' : weather === 'cloudy' ? '多云' : '阵雨'}</button>)}
          </div>
        </div>
        <div className="setting-row">
          <label className="setting-label"><Leaf size={14} />岛上季节</label>
          <div className="choice-grid">
            {(['春', '夏', '秋', '冬'] as const).map((season) => <button type="button" key={season} className={settings.season === season ? 'is-active' : ''} onClick={() => onSettings({ season })}>{season}</button>)}
          </div>
        </div>
        <div className="setting-row switch-row"><span><Layers3 size={14} />城堡剖面<small>淡出屋顶与前墙</small></span><Toggle checked={settings.cutaway} onChange={() => onSettings({ cutaway: !settings.cutaway })} label="切换城堡剖面" /></div>
        <div className="setting-row switch-row"><span><Rotate3D size={14} />缓慢环绕<small>拖动视角会暂时接管镜头</small></span><Toggle checked={settings.autoRotate} onChange={() => onSettings({ autoRotate: !settings.autoRotate })} label="切换自动环绕" /></div>
        <div className="setting-row switch-row"><span><Activity size={14} />减少环境动态<small>保留模拟，减弱装饰运动</small></span><Toggle checked={settings.reducedMotion} onChange={() => onSettings({ reducedMotion: !settings.reducedMotion })} label="切换减少动态" /></div>
        <p className="settings-footnote">画面会根据实际帧率自动调整分辨率与雨量粒子，不改变世界规则。</p>
      </section>

      <div className="camera-hint glass-panel"><MousePointer2 size={14} /><span>拖动环绕</span><i />滚轮缩放<i />右键平移<span className="hint-extra"> · 点击居民或草地互动</span></div>

      <div className="world-dock glass-panel">
        <button type="button" className="dock-icon" onClick={() => onSettings({ paused: !settings.paused })} aria-label={settings.paused ? '继续世界' : '暂停世界'} title="暂停 / 继续（空格）">
          {settings.paused ? <Play size={17} fill="currentColor" /> : <Pause size={17} fill="currentColor" />}
        </button>
        <div className="dock-time">
          <div><span>{settings.paused ? '世界已暂停' : '岛屿时间'}</span><strong>{formatTime(localHour)}</strong></div>
          <input
            type="range" min="0" max="23.99" step="0.02" value={localHour}
            onPointerDown={() => setScrubbing(true)}
            onPointerUp={() => setScrubbing(false)}
            onKeyDown={() => setScrubbing(true)}
            onBlur={() => setScrubbing(false)}
            onChange={(event) => { const value = Number(event.target.value); setLocalHour(value); onHour(value) }}
            aria-label="调整岛屿时间"
            style={{ '--time-progress': `${(localHour / 24) * 100}%` } as CSSProperties}
          />
        </div>
        <span className="dock-separator" />
        <button type="button" className={`dock-icon ${settings.autoRotate ? 'is-active' : ''}`} onClick={() => onSettings({ autoRotate: !settings.autoRotate })} aria-label="自动环绕" title="自动环绕"><Rotate3D size={18} /></button>
        <button type="button" className={`dock-icon ${settings.cutaway ? 'is-active' : ''}`} onClick={() => onSettings({ cutaway: !settings.cutaway })} aria-label="城堡剖面" title="城堡剖面（C）"><Layers3 size={18} /></button>
        <button type="button" className="dock-icon" onClick={() => selectLocation('overview')} aria-label="返回岛屿全景" title="返回全景（R）"><RotateCcw size={17} /></button>
      </div>

      <div className="sound-notice" aria-live="polite">{audioEnabled ? '生成环境音已开启' : '声音已静音'}</div>
    </div>
  )
}
