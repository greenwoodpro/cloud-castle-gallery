/**
 * 场景控制器的公开类型。
 * 与 scene.ts 分开，UI 只需引用类型时不会把 three.js 拖进 bundle。
 */

export type TimeKey = 'night' | 'dusk' | 'day'

export interface SceneStats {
  drawCalls: number
  triangles: number
  fps: number
}

export interface CastleSceneHandle {
  setTime(key: TimeKey): void
  getTime(): TimeKey
  setXRay(on: boolean): void
  getXRay(): boolean
  setAutoRotate(on: boolean): void
  flyTo(presetId: string): void
  getActivePreset(): string | null
  resetView(): void
  getStats(): SceneStats
  dispose(): void
}

export interface CastleSceneOptions {
  onPresetChange?: (presetId: string | null) => void
  onStats?: (stats: SceneStats) => void
  onReady?: () => void
  initialTime?: TimeKey
  initialPreset?: string
}
