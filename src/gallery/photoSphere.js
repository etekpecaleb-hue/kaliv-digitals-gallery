// The seamless photo sphere: the globe with Blueprint off. The sphere is cut
// into equal-area cells (sphereLayout.js) and every cell is a curved,
// cover-cropped photo, edge to edge, with a hairline seam between cells.
// Each cell is a "panel-shaped" record ({ mesh, photo, lat, lon, normal,
// corners, ... }) so the globe's hover, focus, lightbox and HUD code treat
// cells and blueprint panels alike.
import { Color, DataTexture, Group, Mesh, ShaderMaterial, Vector2, Vector3 } from 'three'
import { clamp, damp } from '../core/math.js'
import { spreadIndices } from './rowLayout.js'
import { cellGeometry, partitionSphere } from './sphereLayout.js'
import { CELL_FRAGMENT, CELL_VERTEX } from './globeShaders.js'

export const MIN_CELLS = 24
export const MAX_CELLS = 240
// Morph timing (t: 0 = blueprint, 1 = photo sphere): each cell grows over
// GROW_SPAN, starting later the further it is from the equator.
export const GROW_SPAN = 0.5
const growStart = (lat) => 0.12 + 0.34 * (Math.abs(lat) / (Math.PI / 2))
const TAU = Math.PI * 2
const SIGNAL_HI = new Color('#9cc7ff')
const RIM = new Color('#3f86ff')
const SEAM = new Color('#03060e')
// hull-coloured stand-in until a photo's texture has loaded
const PLACEHOLDER = new DataTexture(new Uint8Array([10, 18, 36, 255]), 1, 1)
PLACEHOLDER.needsUpdate = true

// Median width / height of the photos, so band cells match most of them.
function typicalAspect(photos) {
  const aspects = photos.map((photo) => photo.width / photo.height).sort((a, b) => a - b)
  return clamp(aspects[Math.floor(aspects.length / 2)] ?? 1.5, 0.8, 1.8)
}

function direction(theta, phi, out = new Vector3()) {
  const s = Math.sin(theta)
  return out.set(s * Math.sin(phi), Math.cos(theta), s * Math.cos(phi))
}

// Longitude ranges overlap (or touch) once wrapped onto the circle.
function arcsMeet(a0, a1, b0, b1, touch) {
  for (const shift of [-TAU, 0, TAU]) {
    const lo = Math.max(a0, b0 + shift)
    const hi = Math.min(a1, b1 + shift)
    if (touch ? hi >= lo - 1e-6 : hi > lo + 1e-6) return true
  }
  return false
}

// For each cell, the indices of the cells that share an edge with it.
export function cellNeighbours(cells) {
  const same = (a, b) => Math.abs(a - b) < 1e-7
  return cells.map((a) =>
    cells
      .filter((b) => {
        if (a === b) return false
        if (same(a.theta1, b.theta0) || same(a.theta0, b.theta1)) return arcsMeet(a.phi0, a.phi1, b.phi0, b.phi1, false)
        return same(a.theta0, b.theta0) && arcsMeet(a.phi0, a.phi1, b.phi0, b.phi1, true)
      })
      .map((b) => b.index),
  )
}

// Photo index for every cell. With a photo per cell they are dealt out
// equator first with the panel layout's stride (spreadIndices); with fewer
// photos they repeat, and a greedy pass keeps repeats off neighbouring cells
// and as far apart as it can.
export function assignPhotos(cells, photoCount) {
  const order = [...cells].sort((a, b) => Math.abs(a.lat) - Math.abs(b.lat) || b.lat - a.lat || a.lon - b.lon)
  const preferred = spreadIndices(cells.length, photoCount)
  const assigned = new Array(cells.length).fill(-1)
  if (photoCount >= cells.length) {
    order.forEach((cell, i) => (assigned[cell.index] = preferred[i]))
    return assigned
  }
  const neighbours = cellNeighbours(cells)
  const normals = cells.map((cell) => direction(Math.PI / 2 - cell.lat, cell.lon))
  const uses = new Array(photoCount).fill(0)
  order.forEach((cell, i) => {
    let best = 0
    let bestScore = Infinity
    for (let photo = 0; photo < photoCount; photo++) {
      let score = uses[photo] * 4 + (photo === preferred[i] ? -0.5 : 0)
      for (const j of neighbours[cell.index]) if (assigned[j] === photo) score += 100
      // repeats further than a neighbour away still push apart, gently
      for (let j = 0; j < cells.length; j++) {
        if (assigned[j] === photo) score += Math.max(0, normals[cell.index].dot(normals[j]) - 0.2) * 6
      }
      if (score < bestScore) {
        bestScore = score
        best = photo
      }
    }
    assigned[cell.index] = best
    uses[best] += 1
  })
  return assigned
}

// One cell per photo (photos >= cells), each as close as possible to where
// the blueprint shows that photo, so the morph can slide a panel into the
// cell that shows the same photo. Greedy matching on the angular distance
// between each cell and the nearest blueprint panel of each photo.
// `anchors`: [{ normal (unit Vector3), photo (index) }].
export function assignNearAnchors(cells, photoCount, anchors) {
  const normals = cells.map((cell) => direction(Math.PI / 2 - cell.lat, cell.lon))
  const closest = new Float32Array(cells.length * photoCount).fill(-2)
  for (const anchor of anchors) {
    for (let c = 0; c < cells.length; c++) {
      const k = c * photoCount + anchor.photo
      const dot = normals[c].dot(anchor.normal)
      if (dot > closest[k]) closest[k] = dot
    }
  }
  const pairs = []
  for (let k = 0; k < closest.length; k++) if (closest[k] > -2) pairs.push(k)
  pairs.sort((a, b) => closest[b] - closest[a])
  const assigned = new Array(cells.length).fill(-1)
  const used = new Uint8Array(photoCount)
  let free = cells.length
  for (const k of pairs) {
    const c = Math.floor(k / photoCount)
    const photo = k % photoCount
    if (assigned[c] !== -1 || used[photo]) continue
    assigned[c] = photo
    used[photo] = 1
    if (--free === 0) break
  }
  // photos the blueprint doesn't show fill whatever is left
  let next = 0
  for (let c = 0; c < cells.length; c++) {
    if (assigned[c] !== -1) continue
    while (used[next]) next++
    assigned[c] = next
    used[next] = 1
  }
  return assigned
}

function cellMaterial(cell, photo, texture, radius, shared) {
  const band = cell.kind === 'band'
  return new ShaderMaterial({
    uniforms: {
      uMap: { value: texture ?? PLACEHOLDER },
      uHasMap: { value: texture ? 1 : 0 },
      uTone: { value: new Color(photo.tone) },
      uSignal: { value: SIGNAL_HI.clone() },
      uRim: { value: RIM.clone() },
      uSeamColor: { value: SEAM.clone() },
      uHover: { value: 0 },
      uReveal: { value: 1 },
      uDim: { value: 0 },
      uOpacity: { value: 1 },
      uGrow: { value: 1 },
      uCenter: { value: new Vector3() },
      uRadius: { value: radius },
      uKind: { value: band ? 0 : 1 },
      uSpan: { value: new Vector2(cell.phi1 - cell.phi0, cell.theta1 - cell.theta0) },
      // half the seam width, in world units (about a pixel at rest distance)
      uSeam: { value: 0.011 },
      uFade: shared.uFade,
      uSunDir: shared.uSunDir,
      uDayNight: shared.uDayNight,
    },
    vertexShader: CELL_VERTEX,
    fragmentShader: CELL_FRAGMENT,
  })
}

// Points on the cell's outline (in globe space) for its screen rectangle.
function outline(cell, radius) {
  const points = []
  if (cell.kind === 'cap') {
    const rim = cell.theta0 === 0 ? cell.theta1 : cell.theta0
    for (let i = 0; i < 12; i++) points.push(direction(rim, (i / 12) * TAU).multiplyScalar(radius))
    points.push(new Vector3(0, cell.theta0 === 0 ? radius : -radius, 0))
    return points
  }
  const thetas = [cell.theta0, (cell.theta0 + cell.theta1) / 2, cell.theta1]
  const phis = [cell.phi0, (cell.phi0 + cell.phi1) / 2, cell.phi1]
  for (const theta of thetas) {
    for (const phi of phis) points.push(direction(theta, phi).multiplyScalar(radius))
  }
  return points
}

export class PhotoSphere {
  group = new Group()
  cells = []
  partition = []
  radius
  shared

  // shared: the globe's shared uniforms ({ uFade, uSunDir, uDayNight })
  constructor({ radius, shared }) {
    this.radius = radius
    this.shared = shared
    this.group.visible = false
  }

  // (Re)creates every cell for the store's photos: as many cells as photos,
  // but at least MIN_CELLS (photos repeat) and at most MAX_CELLS. With
  // `anchors` (the blueprint panels as { normal, photo index }) and a photo
  // per cell, photos land near where the blueprint shows them.
  build(store, anchors = null) {
    this.dispose()
    const photos = store.photos
    if (photos.length === 0) return
    const count = clamp(photos.length, MIN_CELLS, MAX_CELLS)
    this.partition = partitionSphere(count, { aspect: typicalAspect(photos) })
    const assigned =
      anchors && photos.length >= count
        ? assignNearAnchors(this.partition, photos.length, anchors)
        : assignPhotos(this.partition, photos.length)
    const segments = count <= 60 ? 12 : count <= 140 ? 10 : 8
    const radius = this.radius
    this.cells = this.partition.map((cell, index) => {
      const photo = photos[assigned[index]]
      const geometry = cellGeometry(cell, { radius, photoAspect: photo.width / photo.height, segments })
      geometry.computeBoundingSphere()
      const material = cellMaterial(cell, photo, store.texture(photo), radius, this.shared)
      const cap = cell.kind === 'cap'
      const normal = cap ? new Vector3(0, cell.lat > 0 ? 1 : -1, 0) : direction(Math.PI / 2 - cell.lat, cell.lon)
      material.uniforms.uCenter.value.copy(normal).multiplyScalar(radius)
      const mesh = new Mesh(geometry, material)
      mesh.userData.panel = index
      this.group.add(mesh)
      const midTheta = (cell.theta0 + cell.theta1) / 2
      const span = cell.theta1 - cell.theta0
      return {
        index,
        kind: cell.kind,
        mesh,
        photo,
        cell,
        lat: cell.lat,
        lon: cell.lon,
        normal,
        basePosition: normal.clone().multiplyScalar(radius),
        baseQuaternion: mesh.quaternion.clone(),
        corners: outline(cell, radius),
        // world-unit size, for the morph and the focus distance
        width: cap ? span * radius * 2 : (cell.phi1 - cell.phi0) * Math.sin(midTheta) * radius,
        height: cap ? span * radius * 2 : span * radius,
        // when this cell starts growing in the morph
        start: growStart(cell.lat),
        hover: 0,
      }
    })
  }

  dispose() {
    for (const cell of this.cells) {
      cell.mesh.removeFromParent()
      cell.mesh.geometry.dispose()
      cell.mesh.material.dispose()
    }
    this.cells = []
  }

  refreshTextures(store) {
    for (const cell of this.cells) {
      const texture = store.texture(cell.photo)
      const uniforms = cell.mesh.material.uniforms
      if (texture && uniforms.uMap.value !== texture) {
        uniforms.uMap.value = texture
        uniforms.uHasMap.value = 1
      }
    }
  }

  // The cell under a direction (unit vector in globe space).
  cellAt(dir) {
    let best = null
    let bestDot = -Infinity
    for (const cell of this.cells) {
      const dot = cell.normal.dot(dir)
      if (dot > bestDot) {
        best = cell
        bestDot = dot
      }
    }
    return best
  }

  // Hover easing and lift; `lift` is off while the globe assembles.
  update(dt, hovered, lift) {
    for (const cell of this.cells) {
      cell.hover = damp(cell.hover, cell === hovered ? 1 : 0, 10, dt)
      cell.mesh.material.uniforms.uHover.value = cell.hover
      // a hovered cell rises off the surface (scaling about the globe centre)
      if (lift) cell.mesh.scale.setScalar(1 + 0.022 * cell.hover)
    }
  }

  // Grows (0..1) and fades (0..1) every cell; `start` / `span` give each
  // cell its own window of the morph so they grow in a wave from the equator.
  applyMorph(t, reduced) {
    for (const cell of this.cells) {
      const uniforms = cell.mesh.material.uniforms
      let grow = 1
      let opacity = 1
      if (reduced) opacity = t
      else {
        const p = clamp((t - cell.start) / GROW_SPAN, 0, 1)
        grow = 1 - Math.pow(1 - p, 3)
      }
      uniforms.uGrow.value = grow
      uniforms.uOpacity.value = opacity
      const transparent = opacity < 1
      if (cell.mesh.material.transparent !== transparent) cell.mesh.material.transparent = transparent
      cell.mesh.visible = grow > 0.001 && opacity > 0.001
    }
  }
}
