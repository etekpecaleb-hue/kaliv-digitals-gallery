// Seamless "photo sphere" layout: an equal-area partition of the sphere
// (Leopardi's recursive zonal EQSP algorithm, specialised to S²). Every cell
// has the same area, the two poles are single round caps, and the collars in
// between are split into longitude slices, so any number of photos tiles the
// whole globe edge to edge.
import { BufferAttribute, BufferGeometry } from 'three'

const TAU = Math.PI * 2

// Colatitude of a polar cap holding `regions` of `n` equal-area cells.
function capColatitude(regions, n) {
  return Math.acos(Math.max(-1, Math.min(1, 1 - (2 * regions) / n)))
}

// Splits the sphere into `n` equal-area cells. Each cell: { index, kind
// ('cap' | 'band'), theta0, theta1 (colatitude, 0 = north pole), phi0, phi1
// (longitude), lat, lon (centre, radians), area }. `aspect` is the preferred
// width / height of band cells (photos are mostly 3:2 landscape).
export function partitionSphere(n, { aspect = 1.35 } = {}) {
  n = Math.max(1, Math.floor(n))
  const area = (2 * TAU) / n
  if (n === 1) return [{ index: 0, kind: 'cap', theta0: 0, theta1: Math.PI, phi0: 0, phi1: TAU, lat: Math.PI / 2, lon: 0, area }]
  if (n === 2) {
    return [
      { index: 0, kind: 'cap', theta0: 0, theta1: Math.PI / 2, phi0: 0, phi1: TAU, lat: Math.PI / 2, lon: 0, area },
      { index: 1, kind: 'cap', theta0: Math.PI / 2, theta1: Math.PI, phi0: 0, phi1: TAU, lat: -Math.PI / 2, lon: 0, area },
    ]
  }

  const polar = capColatitude(1, n)
  const ideal = Math.sqrt(area / aspect)
  const collars = Math.max(1, Math.round((Math.PI - 2 * polar) / ideal))
  const fit = (Math.PI - 2 * polar) / collars

  // Ideal (fractional) cell counts per collar, rounded with error carry so
  // the total is exact.
  const counts = []
  let carry = 0
  for (let c = 0; c < collars; c++) {
    const top = polar + c * fit
    const bottom = top + fit
    const ideal = (TAU * (Math.cos(top) - Math.cos(bottom))) / area
    const count = Math.max(1, Math.round(ideal + carry))
    carry += ideal - count
    counts.push(count)
  }

  const cells = [{ index: 0, kind: 'cap', theta0: 0, theta1: polar, phi0: 0, phi1: TAU, lat: Math.PI / 2, lon: 0, area }]
  let before = 1
  let theta0 = polar
  let offset = 0
  for (const count of counts) {
    // Recompute the boundary so the collar holds exactly `count` cells.
    const theta1 = capColatitude(before + count, n)
    const slice = TAU / count
    for (let k = 0; k < count; k++) {
      const phi0 = offset + k * slice
      cells.push({
        index: cells.length,
        kind: 'band',
        theta0,
        theta1,
        phi0,
        phi1: phi0 + slice,
        lat: Math.PI / 2 - (theta0 + theta1) / 2,
        lon: phi0 + slice / 2,
        area,
      })
    }
    // Stagger the next collar by half a slice so seams don't line up.
    offset += slice / 2
    before += count
    theta0 = theta1
  }
  cells.push({ index: cells.length, kind: 'cap', theta0, theta1: Math.PI, phi0: 0, phi1: TAU, lat: -Math.PI / 2, lon: 0, area })
  return cells
}

// Same convention as the row layout: lat/lon in radians to scene XYZ.
function spherePoint(theta, phi, radius, out, i) {
  const s = Math.sin(theta)
  out[i] = radius * s * Math.sin(phi)
  out[i + 1] = radius * Math.cos(theta)
  out[i + 2] = radius * s * Math.cos(phi)
}

// Fraction of the photo to show so it covers a cell of aspect `cell`
// (width / height) without stretching: [uSpan, vSpan] in 0..1.
export function coverSpan(photoAspect, cellAspect) {
  return photoAspect > cellAspect ? [cellAspect / photoAspect, 1] : [1, photoAspect / cellAspect]
}

// Curved geometry for one cell, lying on the sphere of `radius`, with UVs that
// cover-crop a photo of aspect `photoAspect` (width / height). Also writes an
// `aLocal` attribute: the vertex's 0..1 position inside the cell (x across,
// y down for bands; centred polar coordinates for caps), handy for seams,
// gaps and morphing in the shader.
export function cellGeometry(cell, { radius = 5, photoAspect = 1.5, segments = 12 } = {}) {
  const geometry = new BufferGeometry()
  if (cell.kind === 'cap') return capGeometry(geometry, cell, radius, photoAspect, segments)

  const cols = segments
  const rows = Math.max(2, Math.round(segments * 0.75))
  const count = (cols + 1) * (rows + 1)
  const position = new Float32Array(count * 3)
  const normal = new Float32Array(count * 3)
  const uv = new Float32Array(count * 2)
  const local = new Float32Array(count * 2)

  const midTheta = (cell.theta0 + cell.theta1) / 2
  const width = (cell.phi1 - cell.phi0) * Math.sin(midTheta)
  const height = cell.theta1 - cell.theta0
  const [uSpan, vSpan] = coverSpan(photoAspect, width / height)

  let v = 0
  for (let r = 0; r <= rows; r++) {
    const y = r / rows
    const theta = cell.theta0 + (cell.theta1 - cell.theta0) * y
    for (let c = 0; c <= cols; c++) {
      const x = c / cols
      const phi = cell.phi0 + (cell.phi1 - cell.phi0) * x
      spherePoint(theta, phi, radius, position, v * 3)
      spherePoint(theta, phi, 1, normal, v * 3)
      uv[v * 2] = 0.5 + (x - 0.5) * uSpan
      uv[v * 2 + 1] = 0.5 - (y - 0.5) * vSpan
      local[v * 2] = x
      local[v * 2 + 1] = y
      v++
    }
  }
  const index = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const a = r * (cols + 1) + c
      const b = a + cols + 1
      index.push(a, b, a + 1, a + 1, b, b + 1)
    }
  }
  geometry.setAttribute('position', new BufferAttribute(position, 3))
  geometry.setAttribute('normal', new BufferAttribute(normal, 3))
  geometry.setAttribute('uv', new BufferAttribute(uv, 2))
  geometry.setAttribute('aLocal', new BufferAttribute(local, 2))
  geometry.setIndex(index)
  return geometry
}

// A round polar cap: the photo is mapped with an azimuthal projection and
// cover-cropped to a circle on its shorter side.
function capGeometry(geometry, cell, radius, photoAspect, segments) {
  const north = cell.theta0 === 0
  const span = cell.theta1 - cell.theta0
  const rings = Math.max(3, Math.round(segments * 0.6))
  const around = Math.max(16, segments * 3)
  const count = 1 + rings * (around + 1)
  const position = new Float32Array(count * 3)
  const normal = new Float32Array(count * 3)
  const uv = new Float32Array(count * 2)
  const local = new Float32Array(count * 2)
  const [uScale, vScale] = photoAspect >= 1 ? [1 / photoAspect, 1] : [1, photoAspect]

  const pole = north ? 0 : Math.PI
  spherePoint(pole, 0, radius, position, 0)
  spherePoint(pole, 0, 1, normal, 0)
  uv[0] = uv[1] = 0.5
  local[0] = 0.5
  local[1] = 0
  let v = 1
  for (let r = 1; r <= rings; r++) {
    const t = r / rings
    const theta = north ? span * t : Math.PI - span * t
    for (let a = 0; a <= around; a++) {
      const phi = (a / around) * TAU
      spherePoint(theta, phi, radius, position, v * 3)
      spherePoint(theta, phi, 1, normal, v * 3)
      // Mirror the south cap so photos aren't flipped when seen from outside.
      const x = Math.sin(phi) * t
      const y = Math.cos(phi) * t * (north ? -1 : 1)
      uv[v * 2] = 0.5 + 0.5 * x * uScale
      uv[v * 2 + 1] = 0.5 + 0.5 * y * vScale
      local[v * 2] = a / around
      local[v * 2 + 1] = t
      v++
    }
  }
  const index = []
  for (let a = 0; a < around; a++) index.push(0, 1 + a, 1 + a + 1)
  for (let r = 1; r < rings; r++) {
    const ring = 1 + (r - 1) * (around + 1)
    const next = ring + around + 1
    for (let a = 0; a < around; a++) index.push(ring + a, next + a, ring + a + 1, ring + a + 1, next + a, next + a + 1)
  }
  if (!north) for (let i = 0; i < index.length; i += 3) [index[i + 1], index[i + 2]] = [index[i + 2], index[i + 1]]
  geometry.setAttribute('position', new BufferAttribute(position, 3))
  geometry.setAttribute('normal', new BufferAttribute(normal, 3))
  geometry.setAttribute('uv', new BufferAttribute(uv, 2))
  geometry.setAttribute('aLocal', new BufferAttribute(local, 2))
  geometry.setIndex(index)
  return geometry
}
