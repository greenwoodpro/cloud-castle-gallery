'use client'

import React from 'react'
import {
  INTERIOR_SECTIONS,
  CASTLE_CHARACTERS,
  TERRAIN_ZONES,
  ENVIRONMENT_ASPECTS,
  InteriorSection,
  CastleCharacter,
  TerrainZone,
} from '@/lib/castle-data'
import {
  Building2,
  Users,
  Mountain,
  Sparkles,
  Eye,
  Compass,
  Layers,
  MapPin,
  Quote,
} from 'lucide-react'

export type EncyclopediaTab = 'interior' | 'characters' | 'terrain' | 'environment'

interface EncyclopediaDrawerProps {
  activeTab: EncyclopediaTab
  onTabChange: (tab: EncyclopediaTab) => void
  selectedId: string | null
  onSelectInterior: (section: InteriorSection) => void
  onSelectCharacter: (character: CastleCharacter) => void
  onSelectTerrain: (zone: TerrainZone) => void
  isOpen: boolean
  onToggleOpen: () => void
}

export default function EncyclopediaDrawer({
  activeTab,
  onTabChange,
  selectedId,
  onSelectInterior,
  onSelectCharacter,
  onSelectTerrain,
  isOpen,
  onToggleOpen,
}: EncyclopediaDrawerProps) {
  return (
    <aside
      aria-label="城堡内部构造、人物与地形绘本图鉴"
      className={`fixed right-3 top-20 bottom-3 z-20 flex flex-col transition-all duration-300 ${
        isOpen
          ? 'w-[calc(100vw-24px)] sm:w-[400px] lg:w-[430px]'
          : 'w-auto h-auto bottom-auto'
      }`}
    >
      {/* Collapsed toggle button */}
      {!isOpen && (
        <button
          type="button"
          onClick={onToggleOpen}
          className="flex items-center gap-2 rounded-2xl bg-stone-900/85 hover:bg-stone-900 text-amber-100 border border-amber-300/35 px-4 py-2.5 text-sm font-medium shadow-xl backdrop-blur-md transition"
        >
          <Compass className="w-4 h-4 text-amber-300" />
          <span>展开城堡构造 · 人物 · 地形图鉴</span>
        </button>
      )}

      {isOpen && (
        <div className="flex flex-col h-full rounded-2xl bg-[#1F1A2C]/88 text-amber-50 border border-amber-200/30 shadow-2xl backdrop-blur-xl overflow-hidden">
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-amber-200/15 bg-gradient-to-r from-amber-500/15 via-rose-500/10 to-transparent">
            <div>
              <h2 className="font-serif text-base font-bold tracking-wide text-amber-200">
                B-612 星屿城堡 · 绘本设定全书
              </h2>
              <p className="text-[11px] text-amber-100/70">
                点击任意词条，镜头将自动飞往该处并开启对应剖面
              </p>
            </div>
            <button
              type="button"
              onClick={onToggleOpen}
              className="rounded-lg px-2.5 py-1 text-xs text-amber-200/80 hover:text-amber-100 hover:bg-amber-100/10 border border-amber-200/20 transition"
            >
              收起面板
            </button>
          </div>

          {/* 4 Category Tabs */}
          <div className="grid grid-cols-4 gap-1 p-2 bg-stone-950/40 border-b border-amber-200/15">
            <button
              type="button"
              onClick={() => onTabChange('interior')}
              className={`flex flex-col items-center justify-center gap-1 rounded-xl py-2 px-1 text-xs font-medium transition ${
                activeTab === 'interior'
                  ? 'bg-amber-400/25 text-amber-200 border border-amber-300/45 shadow-sm'
                  : 'text-amber-100/65 hover:text-amber-100 hover:bg-white/5'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>内部构造 (5层)</span>
            </button>

            <button
              type="button"
              onClick={() => onTabChange('characters')}
              className={`flex flex-col items-center justify-center gap-1 rounded-xl py-2 px-1 text-xs font-medium transition ${
                activeTab === 'characters'
                  ? 'bg-amber-400/25 text-amber-200 border border-amber-300/45 shadow-sm'
                  : 'text-amber-100/65 hover:text-amber-100 hover:bg-white/5'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>人物志 (6位)</span>
            </button>

            <button
              type="button"
              onClick={() => onTabChange('terrain')}
              className={`flex flex-col items-center justify-center gap-1 rounded-xl py-2 px-1 text-xs font-medium transition ${
                activeTab === 'terrain'
                  ? 'bg-amber-400/25 text-amber-200 border border-amber-300/45 shadow-sm'
                  : 'text-amber-100/65 hover:text-amber-100 hover:bg-white/5'
              }`}
            >
              <Mountain className="w-4 h-4" />
              <span>浮岛地形 (6区)</span>
            </button>

            <button
              type="button"
              onClick={() => onTabChange('environment')}
              className={`flex flex-col items-center justify-center gap-1 rounded-xl py-2 px-1 text-xs font-medium transition ${
                activeTab === 'environment'
                  ? 'bg-amber-400/25 text-amber-200 border border-amber-300/45 shadow-sm'
                  : 'text-amber-100/65 hover:text-amber-100 hover:bg-white/5'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>小王子环境</span>
            </button>
          </div>

          {/* Scrollable Content List */}
          <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3">
            {/* TAB 1: INTERIOR SECTIONS */}
            {activeTab === 'interior' &&
              INTERIOR_SECTIONS.map((sec) => {
                const isSelected = selectedId === sec.id
                return (
                  <div
                    key={sec.id}
                    onClick={() => onSelectInterior(sec)}
                    className={`cursor-pointer rounded-xl p-3.5 transition-all border ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-300/70 shadow-lg'
                        : 'bg-white/[0.04] border-amber-100/15 hover:bg-white/[0.08] hover:border-amber-200/35'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="inline-flex items-center justify-center rounded-lg px-2 py-0.5 text-xs font-bold text-stone-950"
                          style={{ backgroundColor: sec.colorAccent }}
                        >
                          {sec.floor}
                        </span>
                        <div>
                          <h3 className="font-serif text-sm font-bold text-amber-100">
                            {sec.name}
                          </h3>
                          <p className="text-[11px] text-amber-200/65">
                            {sec.architecturalStyle} · {sec.heightRange}
                          </p>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-300/15 px-2 py-0.5 text-[11px] text-amber-200 border border-amber-300/30">
                        <Eye className="w-3 h-3" />
                        剖面巡礼
                      </span>
                    </div>

                    <p className="mt-2.5 text-xs leading-relaxed text-amber-50/90">
                      {sec.summary}
                    </p>

                    <div className="mt-2.5 pt-2.5 border-t border-amber-100/10 flex flex-col gap-1.5">
                      <div className="text-[11px] text-amber-200/85 font-medium flex items-center gap-1">
                        <Layers className="w-3 h-3" />
                        <span>建筑構造细部：</span>
                      </div>
                      <ul className="text-[11px] text-amber-100/75 list-disc list-inside flex flex-col gap-0.5">
                        {sec.structuralDetails.map((detail, idx) => (
                          <li key={idx} className="leading-relaxed">
                            {detail}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {sec.furnishings.map((f, i) => (
                          <span
                            key={i}
                            className="rounded-md bg-stone-950/60 px-2 py-0.5 text-[10px] text-amber-200/80 border border-amber-200/15"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}

            {/* TAB 2: CASTLE CHARACTERS */}
            {activeTab === 'characters' &&
              CASTLE_CHARACTERS.map((char) => {
                const isSelected = selectedId === char.id
                return (
                  <div
                    key={char.id}
                    onClick={() => onSelectCharacter(char)}
                    className={`cursor-pointer rounded-xl p-3.5 transition-all border ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-300/70 shadow-lg'
                        : 'bg-white/[0.04] border-amber-100/15 hover:bg-white/[0.08] hover:border-amber-200/35'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className="inline-block w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: char.badgeColor }}
                          />
                          <h3 className="font-serif text-sm font-bold text-amber-100">
                            {char.name}
                          </h3>
                          <span className="text-xs text-amber-300/85">
                            · {char.title}
                          </span>
                        </div>
                        <p className="mt-0.5 text-[11px] text-amber-200/65 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          常驻位置：{char.locationName}
                        </p>
                      </div>
                      <span className="rounded-full bg-amber-300/15 px-2 py-0.5 text-[11px] text-amber-200 border border-amber-300/30">
                        定位寻访
                      </span>
                    </div>

                    <blockquote className="mt-2.5 rounded-lg bg-amber-950/40 border-l-2 border-amber-400 px-2.5 py-1.5 text-xs italic text-amber-100/95 flex gap-1.5">
                      <Quote className="w-3.5 h-3.5 shrink-0 text-amber-300 mt-0.5" />
                      <span>{char.quote}</span>
                    </blockquote>

                    <div className="mt-2.5 flex flex-col gap-1.5 text-xs leading-relaxed text-amber-50/85">
                      <p>
                        <strong className="text-amber-200">外貌衣着：</strong>
                        {char.appearance}
                      </p>
                      <p>
                        <strong className="text-amber-200">日常作息：</strong>
                        {char.dailyRoutine}
                      </p>
                      <p>
                        <strong className="text-amber-200">性格特质：</strong>
                        {char.personality}
                      </p>
                    </div>
                  </div>
                )
              })}

            {/* TAB 3: FLOATING ISLAND TERRAINS */}
            {activeTab === 'terrain' &&
              TERRAIN_ZONES.map((zone) => {
                const isSelected = selectedId === zone.id
                return (
                  <div
                    key={zone.id}
                    onClick={() => onSelectTerrain(zone)}
                    className={`cursor-pointer rounded-xl p-3.5 transition-all border ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-300/70 shadow-lg'
                        : 'bg-white/[0.04] border-amber-100/15 hover:bg-white/[0.08] hover:border-amber-200/35'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-serif text-sm font-bold text-amber-100">
                          {zone.name}
                        </h3>
                        <p className="text-[11px] text-amber-200/70">
                          {zone.elevation}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        {zone.palette.map((hex, i) => (
                          <span
                            key={i}
                            className="w-3.5 h-3.5 rounded-full border border-white/30"
                            style={{ backgroundColor: hex }}
                            title={hex}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="mt-2 text-xs leading-relaxed text-amber-50/90">
                      {zone.description}
                    </p>

                    <div className="mt-2.5 pt-2 border-t border-amber-100/10 flex flex-col gap-1 text-[11px] text-amber-100/80">
                      <p>
                        <strong className="text-amber-200">地质岩层：</strong>
                        {zone.geology}
                      </p>
                      <p>
                        <strong className="text-amber-200">植被与生态：</strong>
                        {zone.floraAndFauna}
                      </p>
                      <p>
                        <strong className="text-amber-200">浮岛生态职能：</strong>
                        {zone.ecologicalRole}
                      </p>
                    </div>
                  </div>
                )
              })}

            {/* TAB 4: LITTLE PRINCE ENVIRONMENT & ATMOSPHERE */}
            {activeTab === 'environment' &&
              ENVIRONMENT_ASPECTS.map((env) => (
                <div
                  key={env.id}
                  className="rounded-xl p-3.5 bg-white/[0.05] border border-amber-100/20 flex flex-col gap-2"
                >
                  <div>
                    <h3 className="font-serif text-sm font-bold text-amber-200">
                      {env.title}
                    </h3>
                    <p className="text-[11px] text-amber-100/60">
                      {env.subtitle}
                    </p>
                  </div>
                  <p className="text-xs leading-relaxed text-amber-50/90">
                    {env.description}
                  </p>
                  <ul className="text-[11px] text-amber-100/80 list-disc list-inside flex flex-col gap-1">
                    {env.visualFeatures.map((feat, i) => (
                      <li key={i}>{feat}</li>
                    ))}
                  </ul>
                  <div className="mt-1 rounded-lg bg-amber-500/10 border border-amber-300/25 p-2 text-[11px] text-amber-200">
                    ✦ 绘本隐喻：{env.symbolism}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </aside>
  )
}
