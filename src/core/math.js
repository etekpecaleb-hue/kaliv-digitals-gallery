// Small numeric and formatting helpers shared across the app.

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

export function lerp(a, b, t) {
  return a + (b - a) * t
}

// Frame-rate independent exponential smoothing towards `target`.
export function damp(current, target, lambda, dt) {
  return lerp(current, target, 1 - Math.exp(-lambda * dt))
}

// Wraps `value` into the range [min, max).
export function wrap(value, min, max) {
  const range = max - min
  return range <= 0 ? min : min + ((((value - min) % range) + range) % range)
}

// "12.6°N 000.0°E" style readout for a latitude/longitude in radians.
export function formatLatLon(lat, lon) {
  const latDeg = (lat * 180) / Math.PI
  const lonDeg = (wrap(lon, -Math.PI, Math.PI) * 180) / Math.PI
  const latText = `${Math.abs(latDeg).toFixed(1).padStart(4, '0')}°${latDeg < 0 ? 'S' : 'N'}`
  const lonText = `${Math.abs(lonDeg).toFixed(1).padStart(5, '0')}°${lonDeg < 0 ? 'W' : 'E'}`
  return `${latText} ${lonText}`
}

const RATIOS = [
  [1, '1:1'],
  [5 / 4, '5:4'],
  [4 / 3, '4:3'],
  [3 / 2, '3:2'],
  [16 / 10, '16:10'],
  [16 / 9, '16:9'],
  [2, '2:1'],
  [21 / 9, '21:9'],
]

// Nearest common aspect ratio label, e.g. "3:2", or "1.83:1" when none fits.
export function formatRatio(width, height) {
  if (width <= 0 || height <= 0) return '—'
  const portrait = height > width
  const ratio = portrait ? height / width : width / height
  for (const [value, label] of RATIOS) {
    if (Math.abs(ratio - value) / value < 0.012) {
      if (!portrait) return label
      const [a, b] = label.split(':')
      return `${b}:${a}`
    }
  }
  return portrait ? `1:${ratio.toFixed(2)}` : `${ratio.toFixed(2)}:1`
}

// Deterministic PRNG (returns floats in [0, 1)) so layouts are stable per seed.
export function seededRandom(seed) {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) >>> 0
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Zero-pads an index to the width of `total` (at least two digits).
export function padIndex(value, total) {
  return String(value).padStart(Math.max(2, String(total).length), '0')
}
