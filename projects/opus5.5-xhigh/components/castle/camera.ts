import * as THREE from 'three'
import type { Place } from './data'

export const HOME_VIEW = {
  position: new THREE.Vector3(27, 15, 29),
  target: new THREE.Vector3(0, 1.5, 0),
}

export type FocusRequest = { position: THREE.Vector3; target: THREE.Vector3; id: number } | null

export function cameraForPlace(place: Place) {
  const az = THREE.MathUtils.degToRad(place.azimuth)
  const el = THREE.MathUtils.degToRad(place.elevation)
  const target = new THREE.Vector3(...place.target)
  const offset = new THREE.Vector3(
    Math.sin(az) * Math.cos(el),
    Math.sin(el),
    Math.cos(az) * Math.cos(el),
  ).multiplyScalar(place.distance)
  return { position: target.clone().add(offset), target }
}
