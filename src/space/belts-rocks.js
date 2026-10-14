// Procedural rock geometry: a displaced icosahedron with lumps, craters and a
// mottled grey vertex colour, shared by the belts, the drifting rocks and the
// comet nucleus.
import { BufferAttribute, IcosahedronGeometry, Vector3 } from 'three'
import { mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js'
import { seededRandom } from '../core/math.js'

// Seeded 3D gradient noise in roughly [-1, 1].
export function createNoise3(seed) {
  const random = seededRandom(seed)
  const perm = new Uint8Array(512)
  const order = Array.from({ length: 256 }, (_, i) => i)
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[order[i], order[j]] = [order[j], order[i]]
  }
  for (let i = 0; i < 512; i++) perm[i] = order[i & 255]
  const grads = new Float32Array(256 * 3)
  for (let i = 0; i < 256; i++) {
    const y = random() * 2 - 1
    const theta = random() * Math.PI * 2
    const ring = Math.sqrt(1 - y * y)
    grads.set([ring * Math.cos(theta), y, ring * Math.sin(theta)], i * 3)
  }
  const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10)
  const dot = (h, x, y, z) => grads[h * 3] * x + grads[h * 3 + 1] * y + grads[h * 3 + 2] * z
  return (x, y, z) => {
    const ix = Math.floor(x)
    const iy = Math.floor(y)
    const iz = Math.floor(z)
    const fx = x - ix
    const fy = y - iy
    const fz = z - iz
    const X = ix & 255
    const Y = iy & 255
    const Z = iz & 255
    const u = fade(fx)
    const v = fade(fy)
    const w = fade(fz)
    const h = (a, b, c) => perm[perm[perm[X + a] + Y + b] + Z + c]
    const lerp = (a, b, t) => a + (b - a) * t
    const x00 = lerp(dot(h(0, 0, 0), fx, fy, fz), dot(h(1, 0, 0), fx - 1, fy, fz), u)
    const x10 = lerp(dot(h(0, 1, 0), fx, fy - 1, fz), dot(h(1, 1, 0), fx - 1, fy - 1, fz), u)
    const x01 = lerp(dot(h(0, 0, 1), fx, fy, fz - 1), dot(h(1, 0, 1), fx - 1, fy, fz - 1), u)
    const x11 = lerp(dot(h(0, 1, 1), fx, fy - 1, fz - 1), dot(h(1, 1, 1), fx - 1, fy - 1, fz - 1), u)
    return lerp(lerp(x00, x10, v), lerp(x01, x11, v), w) * 1.6
  }
}

export function fbm3(noise, x, y, z, octaves) {
  let sum = 0
  let amplitude = 0.5
  let frequency = 1
  for (let i = 0; i < octaves; i++) {
    sum += amplitude * noise(x * frequency, y * frequency, z * frequency)
    frequency *= 2.07
    amplitude *= 0.5
  }
  return sum
}

function randomDirection(random, target) {
  const y = random() * 2 - 1
  const theta = random() * Math.PI * 2
  const ring = Math.sqrt(1 - y * y)
  return target.set(ring * Math.cos(theta), y, ring * Math.sin(theta))
}

// Options: seed, detail (icosahedron subdivision), smooth (shared vertices and
// smooth normals; otherwise faceted), lumps (shape noise amplitude), craters.
export function createRockGeometry({ seed = 1, detail = 1, smooth = false, lumps = 0.34, craters = 6 } = {}) {
  let geometry = new IcosahedronGeometry(1, detail)
  geometry.deleteAttribute('uv')
  geometry.deleteAttribute('normal')
  if (smooth) geometry = mergeVertices(geometry)

  const noise = createNoise3(seed)
  const random = seededRandom(seed * 7919 + 17)
  const offset = [random() * 50, random() * 50, random() * 50]
  const pits = []
  for (let i = 0; i < craters; i++) {
    pits.push({
      dir: randomDirection(random, new Vector3()),
      radius: 0.16 + random() ** 1.6 * 0.5,
      depth: 0.5 + random() * 0.6,
    })
  }

  const position = geometry.attributes.position
  const colors = new Float32Array(position.count * 3)
  const v = new Vector3()
  for (let i = 0; i < position.count; i++) {
    v.fromBufferAttribute(position, i).normalize()
    const [ox, oy, oz] = offset
    let radius = 1 + lumps * fbm3(noise, v.x * 0.85 + ox, v.y * 0.85 + oy, v.z * 0.85 + oz, 3)
    radius += 0.06 * fbm3(noise, v.x * 3.3 - oy, v.y * 3.3 + oz, v.z * 3.3 - ox, 3)
    let floor = 0
    let rim = 0
    for (const pit of pits) {
      const angle = Math.acos(Math.min(1, Math.max(-1, v.dot(pit.dir))))
      const t = angle / pit.radius
      if (t > 1.5) continue
      const bowl = t < 1 ? t * t - 1 : 0
      const lip = Math.exp(-(((t - 1) / 0.28) ** 2))
      radius += pit.radius * 0.22 * pit.depth * (bowl + 0.45 * lip)
      floor = Math.max(floor, t < 1 ? 1 - t : 0)
      rim = Math.max(rim, lip)
    }
    position.setXYZ(i, v.x * radius, v.y * radius, v.z * radius)
    const mottle = fbm3(noise, v.x * 5.1 + 9, v.y * 5.1 - 3, v.z * 5.1 + 1, 2)
    const shade = Math.min(1, Math.max(0.35, 0.78 + 0.32 * mottle - 0.16 * floor + 0.1 * rim))
    colors[i * 3] = shade
    colors[i * 3 + 1] = shade * 0.97
    colors[i * 3 + 2] = shade * 0.93
  }
  geometry.setAttribute('color', new BufferAttribute(colors, 3))
  geometry.computeVertexNormals()
  geometry.computeBoundingSphere()
  return geometry
}
