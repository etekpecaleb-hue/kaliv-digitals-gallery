// Lays photo panels out on the globe in latitude rows: each row holds as many
// panels as fit around its circumference, odd rows are offset by half a step.

// Rows from -maxLatitude to +maxLatitude for `options`
// ({radius, panelWidth, panelHeight, gap, maxLatitude}).
export function layoutRows(options) {
  const latStep = (options.panelHeight + options.gap) / options.radius
  const half = Math.floor(options.maxLatitude / latStep + 1e-9)
  const rows = []
  for (let index = -half; index <= half; index++) {
    const lat = index * latStep
    // measure the circumference at the panel edge nearest the pole, so panels never overlap
    const edgeLat = Math.min(Math.abs(lat) + options.panelHeight / 2 / options.radius, Math.PI / 2 - 0.001)
    const circumference = 2 * Math.PI * options.radius * Math.cos(edgeLat)
    const count = Math.max(1, Math.floor(circumference / (options.panelWidth + options.gap)))
    const lonStep = (2 * Math.PI) / count
    rows.push({
      index,
      lat,
      count,
      lonStep,
      lonOffset: Math.abs(index) % 2 == 1 ? lonStep / 2 : 0,
    })
  }
  return rows
}

// Flattens rows into panel slots, equator first, then alternating north/south
// outwards, so the first slots are the most visible ones.
export function orderSlots(rows) {
  const sorted = [...rows].sort((a, b) => Math.abs(a.index) - Math.abs(b.index) || b.index - a.index)
  const slots = []
  for (const row of sorted) {
    for (let column = 0; column < row.count; column++) {
      slots.push({
        row: row.index,
        column,
        lat: row.lat,
        lon: row.lonOffset + column * row.lonStep,
      })
    }
  }
  return slots
}

// Shrinks the panels in 6% steps (down to `minScale`) until there is a slot
// for every photo.
export function fitLayout(options, photoCount, minScale = 0.4) {
  let scale = 1
  let fitted = options
  let rows = layoutRows(fitted)
  let slots = orderSlots(rows)
  while (slots.length < photoCount && scale * 0.94 >= minScale) {
    scale *= 0.94
    fitted = {
      ...options,
      panelWidth: options.panelWidth * scale,
      panelHeight: options.panelHeight * scale,
      gap: options.gap * scale,
    }
    rows = layoutRows(fitted)
    slots = orderSlots(rows)
  }
  return { options: fitted, rows, slots, scale }
}

function gcd(a, b) {
  while (b) [a, b] = [b, a % b]
  return a
}

// Photo index for each of `slotCount` slots. Steps through the photos with a
// stride coprime to `photoCount` (near count / golden ratio), so every photo
// appears and repeats land far apart.
export function spreadIndices(slotCount, photoCount) {
  if (photoCount <= 0 || slotCount <= 0) return []
  let stride = Math.max(1, Math.round(photoCount / 1.618))
  while (gcd(stride, photoCount) !== 1) stride++
  return Array.from({ length: slotCount }, (_, slot) => (slot * stride) % photoCount)
}

// Latitude/longitude (radians) -> [x, y, z]; lon 0 faces +z.
export function latLonToXYZ(lat, lon, radius) {
  const ring = Math.cos(lat)
  return [radius * ring * Math.sin(lon), radius * Math.sin(lat), radius * ring * Math.cos(lon)]
}

// Globe pitch/yaw that bring (lat, lon) to the front, choosing the yaw nearest
// to `currentYaw` so the globe never spins the long way round.
export function viewFor(lat, lon, currentYaw) {
  const yaw = -lon
  return {
    pitch: lat,
    yaw: yaw + Math.round((currentYaw - yaw) / (2 * Math.PI)) * 2 * Math.PI,
  }
}
