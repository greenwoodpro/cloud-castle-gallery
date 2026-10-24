import * as THREE from 'three'
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js'
import { createWorld, setInterior } from '../lib/world/build-world'
import { PLACES } from '../lib/world/config'

export async function exportModels() {
  const world = createWorld()
  const exporter = new GLTFExporter()
  let triangles = 0
  let meshes = 0
  world.traverse((object) => {
    if (object instanceof THREE.Mesh) {
      meshes++
      triangles += (object.geometry.index?.count ?? object.geometry.getAttribute('position').count) / 3
    }
  })
  const complete = await exporter.parseAsync(world, { binary: true, onlyVisible: false }) as ArrayBuffer
  setInterior(world, true)
  const interior = await exporter.parseAsync(world, { binary: true, onlyVisible: true }) as ArrayBuffer
  return { complete: new Uint8Array(complete), interior: new Uint8Array(interior), triangles, meshes, places: PLACES }
}
