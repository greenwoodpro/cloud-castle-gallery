import * as THREE from 'three'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'

/**
 * 静态几何合并。
 *
 * 这个场景有数千个小构件（雉堞、书本、餐具、石块……），逐个绘制会产生
 * 数千次 draw call。这里把「材质相同、且不参与动画」的网格按材质合并成
 * 单个 Mesh，draw call 从数千降到几十，同时保持透视模式与昼夜光照不变。
 */

interface Bucket {
  material: THREE.Material
  castShadow: boolean
  receiveShadow: boolean
  /** 属于哪个「透视模式下要隐藏」的子树；null 表示常驻可见 */
  hideRoot: THREE.Object3D | null
  sources: THREE.Mesh[]
  geometries: THREE.BufferGeometry[]
}

const ANIM_FLAGS = [
  'wave',
  'flame',
  'lamp',
  'forge',
  'anim',
  'sway',
  'bob',
  'smoke',
  'water',
  'flow',
  'mist',
  'speeds',
  'crystal',
  'crystalHalo',
  'windmill',
  'globe',
  'armillary',
  'rose',
  'orbitCenter',
]

function isAnimated(obj: THREE.Object3D): boolean {
  return ANIM_FLAGS.some((f) => obj.userData[f] !== undefined)
}

function findAnimatedAncestor(obj: THREE.Object3D, stop: THREE.Object3D): THREE.Object3D | null {
  let cur: THREE.Object3D | null = obj.parent
  while (cur && cur !== stop) {
    if (isAnimated(cur)) return cur
    cur = cur.parent
  }
  return null
}

function findHideRoot(obj: THREE.Object3D, root: THREE.Object3D, hideSet: Set<THREE.Object3D>): THREE.Object3D | null {
  let cur: THREE.Object3D | null = obj
  while (cur && cur !== root) {
    if (hideSet.has(cur)) return cur
    cur = cur.parent
  }
  return null
}

/** 克隆几何体、烘焙世界矩阵，并统一属性集合，使其可被合并。 */
function prepareGeometry(
  src: THREE.BufferGeometry,
  matrix: THREE.Matrix4,
  bakeColor?: THREE.Color | null,
): THREE.BufferGeometry | null {
  const geo = src.clone()
  geo.applyMatrix4(matrix)
  geo.clearGroups()
  geo.deleteAttribute('color')
  if (bakeColor) {
    const count = geo.attributes.position.count
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = bakeColor.r
      arr[i * 3 + 1] = bakeColor.g
      arr[i * 3 + 2] = bakeColor.b
    }
    geo.setAttribute('color', new THREE.BufferAttribute(arr, 3))
  }
  geo.deleteAttribute('tangent')
  geo.deleteAttribute('skinIndex')
  geo.deleteAttribute('skinWeight')
  if (!geo.attributes.position || !geo.attributes.normal) {
    geo.dispose()
    return null
  }
  if (!geo.attributes.uv) {
    const count = geo.attributes.position.count
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array(count * 2), 2))
  }
  if (!geo.index) {
    const count = geo.attributes.position.count
    const indices = count > 65535 ? new Uint32Array(count) : new Uint16Array(count)
    for (let i = 0; i < count; i++) indices[i] = i
    geo.setIndex(new THREE.BufferAttribute(indices, 1))
  }
  return geo
}

let bakedMaterialInstance: THREE.MeshLambertMaterial | null = null
/** 顶点着色合并结果共用的白色 Lambert 材质。 */
function bakedMaterial(): THREE.MeshLambertMaterial {
  if (!bakedMaterialInstance) bakedMaterialInstance = new THREE.MeshLambertMaterial({ vertexColors: true })
  return bakedMaterialInstance
}

function safeMerge(geometries: THREE.BufferGeometry[]): THREE.BufferGeometry | null {
  try {
    return mergeGeometries(geometries, false)
  } catch {
    return null
  }
}

/** 从 userData 里找出被动画循环直接驱动的部件（头、手臂、翅膀……），它们是本组合并的「枢轴」。 */
function collectPivots(obj: THREE.Object3D): THREE.Object3D[] {
  const pivots: THREE.Object3D[] = []
  const visit = (v: unknown): void => {
    if (Array.isArray(v)) {
      v.forEach(visit)
      return
    }
    if (v && (v as THREE.Object3D).isObject3D) pivots.push(v as THREE.Object3D)
    if (v && typeof v === 'object' && !(v as THREE.Object3D).isObject3D) {
      for (const inner of Object.values(v as Record<string, unknown>)) visit(inner)
    }
  }
  for (const val of Object.values(obj.userData)) visit(val)
  return pivots
}

/**
 * 组内局部合并：服务于「整体动画」的对象（村民、树、云、玫瑰丛）。
 * 这些对象不能进全局合并（会丢失变换枢轴），但组内的静态零件可以先按材质
 * 合并到本组坐标系下——动画仍然驱动整个组或枢轴部件，draw call 却从几十降到几。
 */
export function mergeGroupLocal(
  root: THREE.Object3D,
  opts: { allowTransparent?: boolean; min?: number; bakeColors?: boolean } = {},
): number {
  const min = opts.min ?? 2
  root.updateMatrixWorld(true)

  const pivots = collectPivots(root)
  let removed = 0
  for (const p of pivots) removed += mergeGroupLocal(p, opts)
  const pivotSet = new Set(pivots)

  const inPivot = (o: THREE.Object3D) => {
    let cur: THREE.Object3D | null = o.parent
    while (cur && cur !== root) {
      if (pivotSet.has(cur)) return true
      cur = cur.parent
    }
    return false
  }

  const inv = new THREE.Matrix4().copy(root.matrixWorld).invert()
  const rel = new THREE.Matrix4()
  const buckets = new Map<string, Bucket>()

  root.traverse((obj) => {
    if (obj === root) return
    const mesh = obj as THREE.Mesh
    if (!mesh.isMesh) return
    if ((mesh as unknown as { isInstancedMesh?: boolean }).isInstancedMesh) return
    if (isAnimated(mesh)) return
    if (inPivot(mesh)) return
    const material = mesh.material as THREE.Material | THREE.Material[]
    if (Array.isArray(material)) return
    if (material.transparent && !opts.allowTransparent) return
    if (mesh.geometry.attributes.color) return
    const lambert = material as THREE.MeshLambertMaterial
    // 自发光/灯罩参与昼夜变化，不能烘进顶点色
    if (opts.bakeColors && (mesh.userData.lamp !== undefined || (lambert.emissive && lambert.emissive.getHex() !== 0))) return
    const key = opts.bakeColors
      ? `bake|${mesh.castShadow ? 1 : 0}|${mesh.receiveShadow ? 1 : 0}`
      : `${material.uuid}|${mesh.castShadow ? 1 : 0}|${mesh.receiveShadow ? 1 : 0}`
    let bucket = buckets.get(key)
    if (!bucket) {
      bucket = { material, castShadow: mesh.castShadow, receiveShadow: mesh.receiveShadow, hideRoot: null, sources: [], geometries: [] }
      buckets.set(key, bucket)
    }
    rel.multiplyMatrices(inv, mesh.matrixWorld)
    const prepared = prepareGeometry(mesh.geometry, rel, opts.bakeColors ? material.color : null)
    if (!prepared) return
    bucket.sources.push(mesh)
    bucket.geometries.push(prepared)
  })

  for (const bucket of buckets.values()) {
    if (bucket.sources.length < min) {
      bucket.geometries.forEach((g) => g.dispose())
      continue
    }
    const merged = safeMerge(bucket.geometries)
    bucket.geometries.forEach((g) => g.dispose())
    if (!merged) continue
    merged.computeBoundingSphere()
    const mesh = new THREE.Mesh(merged, opts.bakeColors ? bakedMaterial() : bucket.material)
    mesh.castShadow = bucket.castShadow
    mesh.receiveShadow = bucket.receiveShadow
    mesh.name = 'merged-local'
    root.add(mesh)
    for (const src of bucket.sources) {
      src.parent?.remove(src)
      src.geometry.dispose()
      removed++
    }
  }
  return removed
}

export interface MergeResult {
  /** 新增的合并网格 */
  meshes: THREE.Mesh[]
  /** 被移除的原始网格数量 */
  removed: number
  /** 需要加入 xray.hide 的合并网格（原本属于会被隐藏的屋顶等子树） */
  hideMeshes: THREE.Mesh[]
}

/**
 * 合并 root 子树里的静态网格。
 * @param root 场景根
 * @param hideRoots 透视模式下会被整体隐藏的对象列表
 */
export function mergeStaticGeometry(root: THREE.Object3D, hideRoots: THREE.Object3D[]): MergeResult {
  const hideSet = new Set(hideRoots)
  const buckets = new Map<string, Bucket>()

  root.updateMatrixWorld(true)

  root.traverse((obj) => {
    const mesh = obj as THREE.Mesh
    if (!mesh.isMesh) return
    if ((mesh as unknown as { isInstancedMesh?: boolean }).isInstancedMesh) return
    if (isAnimated(mesh)) return
    if (findAnimatedAncestor(mesh, root)) return

    const material = mesh.material as THREE.Material | THREE.Material[]
    if (Array.isArray(material)) return
    if (material.transparent) return
    // 顶点着色的网格（岛面、岩层）各自独立，合并会丢掉颜色属性
    if (mesh.geometry.attributes.color) return

    const hideRoot = findHideRoot(mesh, root, hideSet)
    const key = `${material.uuid}|${mesh.castShadow ? 1 : 0}|${mesh.receiveShadow ? 1 : 0}|${hideRoot ? hideRoot.uuid : 'none'}`

    let bucket = buckets.get(key)
    if (!bucket) {
      bucket = { material, castShadow: mesh.castShadow, receiveShadow: mesh.receiveShadow, hideRoot, sources: [], geometries: [] }
      buckets.set(key, bucket)
    }
    const prepared = prepareGeometry(mesh.geometry, mesh.matrixWorld)
    if (!prepared) return
    bucket.sources.push(mesh)
    bucket.geometries.push(prepared)
  })

  const meshes: THREE.Mesh[] = []
  const hideMeshes: THREE.Mesh[] = []
  const container = new THREE.Group()
  container.name = 'merged-static'
  let removed = 0

  for (const bucket of buckets.values()) {
    if (bucket.sources.length < 4) {
      bucket.geometries.forEach((g) => g.dispose())
      continue
    }

    const merged = safeMerge(bucket.geometries)
    bucket.geometries.forEach((g) => g.dispose())
    if (!merged) continue

    merged.computeBoundingSphere()
    const mesh = new THREE.Mesh(merged, bucket.material)
    mesh.castShadow = bucket.castShadow
    mesh.receiveShadow = bucket.receiveShadow
    mesh.name = 'merged'
    container.add(mesh)
    meshes.push(mesh)
    if (bucket.hideRoot) hideMeshes.push(mesh)

    // 原始网格已被烘焙进合并结果，可以安全移除
    for (const src of bucket.sources) {
      src.parent?.remove(src)
      src.geometry.dispose()
      removed++
    }
  }

  if (meshes.length > 0) root.add(container)

  return { meshes, removed, hideMeshes }
}
