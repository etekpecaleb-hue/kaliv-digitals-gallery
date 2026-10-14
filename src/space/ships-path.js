// A closed centripetal Catmull-Rom loop through control points that may move
// every frame (they follow planets). The loop is re-sampled into fixed
// buffers on each rebuild(), so nothing is allocated per frame. A craft's
// place on it is kept as segment index + fraction of that segment, which stays
// continuous while the control points drift.
import { Matrix4, Quaternion, Vector3 } from 'three'

function hermite(x0, x1, x2, x3, d0, d1, d2, t) {
  let m1 = (x1 - x0) / d0 - (x2 - x0) / (d0 + d1) + (x2 - x1) / d1
  let m2 = (x2 - x1) / d1 - (x3 - x1) / (d1 + d2) + (x3 - x2) / d2
  m1 *= d1
  m2 *= d1
  const c2 = -3 * x1 + 3 * x2 - 2 * m1 - m2
  const c3 = 2 * x1 - 2 * x2 + m1 + m2
  return x1 + t * (m1 + t * (c2 + t * c3))
}

function knot(a, b) {
  return Math.max(Math.pow(a.distanceToSquared(b), 0.25), 1e-4)
}

export class LoopPath {
  // speedAt(x, y, z) -> relative speed at a point (called during rebuild).
  constructor(points, { samples = 16, speedAt = () => 1 } = {}) {
    this.points = points
    this.samples = samples
    this.speedAt = speedAt
    const total = points.length * samples + 1
    this.xyz = new Float32Array(total * 3)
    this.length = new Float32Array(total)
    this.speed = new Float32Array(total)
    this.segmentLength = new Float32Array(points.length)
    this.lapLength = 0
    this.lapTime = 0
  }

  rebuild() {
    const { points, samples, xyz, length, speed } = this
    const n = points.length
    let index = 0
    let travelled = 0
    let time = 0
    for (let i = 0; i < n; i++) {
      const p0 = points[(i - 1 + n) % n]
      const p1 = points[i]
      const p2 = points[(i + 1) % n]
      const p3 = points[(i + 2) % n]
      const d0 = knot(p0, p1)
      const d1 = knot(p1, p2)
      const d2 = knot(p2, p3)
      for (let s = 0; s < samples; s++) {
        const t = s / samples
        const o = index * 3
        xyz[o] = hermite(p0.x, p1.x, p2.x, p3.x, d0, d1, d2, t)
        xyz[o + 1] = hermite(p0.y, p1.y, p2.y, p3.y, d0, d1, d2, t)
        xyz[o + 2] = hermite(p0.z, p1.z, p2.z, p3.z, d0, d1, d2, t)
        speed[index] = this.speedAt(xyz[o], xyz[o + 1], xyz[o + 2])
        if (index > 0) {
          const step = Math.hypot(xyz[o] - xyz[o - 3], xyz[o + 1] - xyz[o - 2], xyz[o + 2] - xyz[o - 1])
          travelled += step
          time += step / Math.max(1e-3, (speed[index - 1] + speed[index]) / 2)
        }
        length[index] = travelled
        index++
      }
    }
    // Close the loop on the first sample.
    const o = index * 3
    xyz[o] = xyz[0]
    xyz[o + 1] = xyz[1]
    xyz[o + 2] = xyz[2]
    const step = Math.hypot(xyz[o] - xyz[o - 3], xyz[o + 1] - xyz[o - 2], xyz[o + 2] - xyz[o - 1])
    travelled += step
    time += step / Math.max(1e-3, (speed[index - 1] + speed[0]) / 2)
    length[index] = travelled
    speed[index] = speed[0]
    for (let i = 0; i < n; i++) this.segmentLength[i] = length[(i + 1) * samples] - length[i * samples]
    this.lapLength = travelled
    // Lap duration at relative speed 1.
    this.lapTime = time
  }

  // Locates `place` (segment + fraction) on the samples: writes the position
  // into `target` and returns the relative speed there.
  locate(place, target) {
    const { samples, xyz, length, speed } = this
    const n = this.points.length
    const segment = Math.floor(place) % n
    const fraction = place - Math.floor(place)
    const first = segment * samples
    const goal = length[first] + fraction * this.segmentLength[segment]
    let k = first
    while (k < first + samples - 1 && length[k + 1] < goal) k++
    const span = Math.max(1e-6, length[k + 1] - length[k])
    const t = Math.min(1, Math.max(0, (goal - length[k]) / span))
    const a = k * 3
    const b = a + 3
    target.set(xyz[a] + (xyz[b] - xyz[a]) * t, xyz[a + 1] + (xyz[b + 1] - xyz[a + 1]) * t, xyz[a + 2] + (xyz[b + 2] - xyz[a + 2]) * t)
    return speed[k] + (speed[k + 1] - speed[k]) * t
  }

  // Moves `place` on by `distance` units, returning the new place.
  advance(place, distance) {
    const n = this.points.length
    let p = place
    let left = distance
    for (let guard = 0; guard < n * 2 && left > 0; guard++) {
      const segment = Math.floor(p) % n
      const segLength = Math.max(1e-6, this.segmentLength[segment])
      const room = (1 - (p - Math.floor(p))) * segLength
      if (left < room) {
        p += left / segLength
        left = 0
      } else {
        p = Math.floor(p) + 1
        left -= room
      }
    }
    return p % n
  }
}

// Orientation looking along `forward` (unit) with `up` as the reference,
// rolled by `bank` radians about the nose, written into `quaternion`.
const basisX = new Vector3()
const basisY = new Vector3()
const basis = new Matrix4()
const roll = new Quaternion()
const AXIS_Z = new Vector3(0, 0, 1)
export function orient(quaternion, forward, up, bank) {
  basisX.crossVectors(up, forward)
  if (basisX.lengthSq() < 1e-8) basisX.set(1, 0, 0)
  basisX.normalize()
  basisY.crossVectors(forward, basisX).normalize()
  basis.makeBasis(basisX, basisY, forward)
  quaternion.setFromRotationMatrix(basis)
  if (bank) quaternion.multiply(roll.setFromAxisAngle(AXIS_Z, bank))
  return quaternion
}
