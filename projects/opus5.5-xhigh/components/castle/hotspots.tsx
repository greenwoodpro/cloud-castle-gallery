'use client'

import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { useMemo } from 'react'
import { PLACES } from './data'
import { hotspotRegistry } from './hotspot-registry'

export function HotspotProjector() {
  const { camera, size } = useThree()
  const targets = useMemo(() => new Map(PLACES.map((p) => [p.id, new THREE.Vector3(...p.target)])), [])
  const v = useMemo(() => new THREE.Vector3(), [])

  useFrame(() => {
    hotspotRegistry.forEach((el, id) => {
      const target = targets.get(id)
      if (!target) return
      v.copy(target).project(camera)
      const visible = v.z < 1 && Math.abs(v.x) < 1.1 && Math.abs(v.y) < 1.1
      if (!visible) {
        el.style.visibility = 'hidden'
        return
      }
      const x = (v.x * 0.5 + 0.5) * size.width
      const y = (-v.y * 0.5 + 0.5) * size.height
      el.style.visibility = 'visible'
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`
    })
  })

  return null
}
