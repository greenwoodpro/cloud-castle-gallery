'use client'

import * as THREE from 'three'
import { Outlines } from '@react-three/drei'
import type { ThreeElements } from '@react-three/fiber'
import { createContext, useContext, useMemo, type ReactNode } from 'react'

export const PALETTE = {
  ink: '#5b4636',
  stone: '#efe3cf',
  stoneShade: '#d9c7ab',
  stoneWarm: '#e8d2b0',
  roofBlue: '#7f9fc4',
  roofRose: '#d98b7e',
  roofSlate: '#8b8fa8',
  thatch: '#d9b26a',
  wood: '#9a6b4a',
  woodDark: '#6e4a33',
  grass: '#a9cf8f',
  grassDeep: '#86b878',
  meadow: '#bfdc9a',
  soil: '#c79a6d',
  rock: '#b9a48e',
  rockDark: '#8f7a68',
  water: '#8fc3d9',
  waterDeep: '#6aa6c4',
  wheat: '#f0cd6e',
  lavender: '#b8a6d9',
  leaf: '#8cc084',
  leafDark: '#6fa36f',
  pine: '#6f9e7e',
  gold: '#e8b84a',
  cloth: '#c96f6a',
  clothBlue: '#5f86b8',
  skin: '#f6d6bd',
  snow: '#fbf6ec',
  glass: '#cfe8f2',
  fire: '#ffb35c',
} as const

let gradientMap: THREE.DataTexture | null = null

export function getGradientMap() {
  if (gradientMap) return gradientMap
  const tones = new Uint8Array([120, 170, 215, 255])
  const tex = new THREE.DataTexture(tones, tones.length, 1, THREE.RedFormat)
  tex.minFilter = THREE.NearestFilter
  tex.magFilter = THREE.NearestFilter
  tex.generateMipmaps = false
  tex.needsUpdate = true
  gradientMap = tex
  return tex
}

export const NightContext = createContext(false)
export const useNight = () => useContext(NightContext)

type ToonProps = {
  color: string
  emissive?: string
  emissiveIntensity?: number
  transparent?: boolean
  opacity?: number
  side?: THREE.Side
  vertexColors?: boolean
}

export function Toon({
  color,
  emissive,
  emissiveIntensity = 0,
  transparent,
  opacity = 1,
  side,
  vertexColors,
}: ToonProps) {
  const map = useMemo(() => getGradientMap(), [])
  return (
    <meshToonMaterial
      color={color}
      gradientMap={map}
      emissive={emissive ?? '#000000'}
      emissiveIntensity={emissiveIntensity}
      transparent={transparent}
      opacity={opacity}
      side={side}
      vertexColors={vertexColors}
    />
  )
}

type PartProps = Omit<ThreeElements['mesh'], 'children'> & {
  color: string
  outline?: boolean
  outlineThickness?: number
  emissive?: string
  emissiveIntensity?: number
  transparent?: boolean
  opacity?: number
  children: ReactNode
}

export function Part({
  color,
  outline = false,
  outlineThickness = 0.025,
  emissive,
  emissiveIntensity,
  transparent,
  opacity,
  children,
  ...rest
}: PartProps) {
  return (
    <mesh castShadow receiveShadow {...rest}>
      {children}
      <Toon
        color={color}
        emissive={emissive}
        emissiveIntensity={emissiveIntensity}
        transparent={transparent}
        opacity={opacity}
      />
      {outline && <Outlines thickness={outlineThickness} color={PALETTE.ink} />}
    </mesh>
  )
}

export function seeded(seed: number) {
  let s = seed % 2147483647
  if (s <= 0) s += 2147483646
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

export function softNoise(x: number, z: number) {
  return (
    Math.sin(x * 0.9 + z * 0.4) * 0.5 +
    Math.sin(x * 0.3 - z * 1.3) * 0.35 +
    Math.sin(x * 2.1 + z * 1.7) * 0.15
  )
}
