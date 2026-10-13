// Keplerian orbit maths. Ecliptic coordinates map onto the scene with the
// ecliptic plane as XZ and ecliptic north as +Y.
import { Vector3 } from 'three'
import { clamp } from '../core/math.js'
import { SECONDS_PER_DAY } from '../data/worlds.js'

const DEG = Math.PI / 180
const J2000 = Date.UTC(2000, 0, 1, 12)
const MS_PER_YEAR = 365.25 * 86400 * 1000

// Years since J2000 for a JS timestamp, so orbits start at today's positions.
export function yearsSinceJ2000(timestamp) {
  return (timestamp - J2000) / MS_PER_YEAR
}

function solveKepler(meanAnomaly, e) {
  let E = e < 0.8 ? meanAnomaly : Math.PI
  for (let i = 0; i < 8; i++) {
    const delta = (E - e * Math.sin(E) - meanAnomaly) / (1 - e * Math.cos(E))
    E -= delta
    if (Math.abs(delta) < 1e-7) break
  }
  return E
}

// Position on `orbit` after `years`, relative to the body it orbits, written
// into `target` (a THREE.Vector3).
export function orbitPosition(orbit, years, target) {
  const { a, e, i, node, peri, L0, period } = orbit
  const meanLongitude = (L0 + (360 * years) / period) * DEG
  const M = meanLongitude - peri * DEG
  const E = solveKepler(Math.atan2(Math.sin(M), Math.cos(M)), e)
  const xv = a * (Math.cos(E) - e)
  const yv = a * Math.sqrt(1 - e * e) * Math.sin(E)
  const w = (peri - node) * DEG
  const O = node * DEG
  const inc = i * DEG
  const cw = Math.cos(w), sw = Math.sin(w)
  const cO = Math.cos(O), sO = Math.sin(O)
  const ci = Math.cos(inc), si = Math.sin(inc)
  const xp = xv * cw - yv * sw
  const yp = xv * sw + yv * cw
  const x = xp * cO - yp * ci * sO
  const y = xp * sO + yp * ci * cO
  const z = yp * si
  return target.set(x, z, -y)
}

// Points along the full ellipse, for drawing orbit lines.
export function orbitPath(orbit, segments) {
  const step = orbit.period / segments
  const points = []
  for (let s = 0; s < segments; s++) points.push(orbitPosition(orbit, s * step, new Vector3()))
  return points
}

// Visual seconds per full turn of a body (negative = retrograde).
export function rotationSeconds(rotationHours) {
  if (!rotationHours) return 0
  const seconds = (Math.abs(rotationHours) / 24) * SECONDS_PER_DAY
  return Math.sign(rotationHours) * clamp(seconds, 8, 600)
}
