// Procedural low-poly spacecraft. Every model is built nose along +Z, up +Y
// (so port, the red light, is +X) and merged into one geometry carrying a
// vertex colour plus aMat = (glow, roughness, metalness), which the shared
// hull material reads per vertex: one draw call per craft for hull, glass,
// engines and lit windows.
import {
  BoxGeometry,
  BufferAttribute,
  CircleGeometry,
  Color,
  ConeGeometry,
  CylinderGeometry,
  Euler,
  ExtrudeGeometry,
  Matrix4,
  MeshStandardMaterial,
  OctahedronGeometry,
  Quaternion,
  Shape,
  SphereGeometry,
  TorusGeometry,
  Vector3,
} from 'three'
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'

const HALF_PI = Math.PI / 2
const matrix = new Matrix4()
const position = new Vector3()
const quaternion = new Quaternion()
const euler = new Euler()
const scaleVector = new Vector3()
const tint = new Color()

const HULL = '#dde2ea'
const HULL_DARK = '#2b3039'
const METAL = '#7c8592'
const GLASS = '#18294f'
const SIGNAL = '#2f7bff'
const SIGNAL_HI = '#9cc7ff'
const WINDOW = '#ffdca0'
const NAV = { red: '#ff3b3b', green: '#3dff7a', white: '#ffffff' }
const NAV_BLINK = { red: [1.1, 0, 0.5, 0.25], green: [1.1, 0, 0.5, 0.25], white: [1.6, 0.3, 0.05, 0] }

class Kit {
  parts = []
  lights = []

  // style: { color, glow, rough, metal, at: [x,y,z], rot: [x,y,z], scale }
  add(geometry, { color = HULL, glow = 0, rough = 0.5, metal = 0.25, at = [0, 0, 0], rot = [0, 0, 0], scale = 1 } = {}) {
    const part = geometry.index ? geometry.toNonIndexed() : geometry
    if (part !== geometry) geometry.dispose()
    for (const name of Object.keys(part.attributes)) if (name !== 'position' && name !== 'normal') part.deleteAttribute(name)
    const s = typeof scale === 'number' ? [scale, scale, scale] : scale
    matrix.compose(position.set(...at), quaternion.setFromEuler(euler.set(...rot)), scaleVector.set(...s))
    part.applyMatrix4(matrix)
    const count = part.attributes.position.count
    const colors = new Float32Array(count * 3)
    const surface = new Float32Array(count * 3)
    tint.set(color)
    for (let i = 0; i < count; i++) {
      colors.set([tint.r, tint.g, tint.b], i * 3)
      surface.set([glow, rough, metal], i * 3)
    }
    part.setAttribute('color', new BufferAttribute(colors, 3))
    part.setAttribute('aMat', new BufferAttribute(surface, 3))
    this.parts.push(part)
    return this
  }

  // Mirrored copy across the YZ plane (port/starboard), with positions and
  // rotations flipped instead of a negative scale so the winding stays valid.
  pair(makeGeometry, style) {
    const at = style.at ?? [0, 0, 0]
    const rot = style.rot ?? [0, 0, 0]
    this.add(makeGeometry(1), style)
    this.add(makeGeometry(-1), { ...style, at: [-at[0], at[1], at[2]], rot: [rot[0], -rot[1], -rot[2]] })
    return this
  }

  nav(at, kind) {
    this.lights.push({ offset: new Vector3(...at), color: NAV[kind], size: 0, blink: NAV_BLINK[kind], engine: false })
    return this
  }

  engine(at, color, size) {
    this.lights.push({ offset: new Vector3(...at), color, size, blink: [0, 0, 1, 1], engine: true })
    return this
  }

  build(scale, navSize) {
    const geometry = mergeGeometries(this.parts, false)
    for (const part of this.parts) part.dispose()
    geometry.scale(scale, scale, scale)
    geometry.computeBoundingSphere()
    for (const light of this.lights) {
      light.offset.multiplyScalar(scale)
      light.size = light.engine ? light.size * scale : navSize
    }
    return { geometry, lights: this.lights, radius: geometry.boundingSphere.radius }
  }
}

// Flat plate from a 2D outline (x = sideways, y = forward), `thickness` deep,
// lying in the XZ plane just below y = 0.
function plate(outline, thickness, mirror = 1) {
  const shape = new Shape()
  outline.forEach(([x, y], i) => (i ? shape.lineTo(x * mirror, y) : shape.moveTo(x * mirror, y)))
  const geometry = new ExtrudeGeometry(shape, { depth: thickness, bevelEnabled: false })
  geometry.rotateX(HALF_PI)
  geometry.translate(0, thickness / 2, 0)
  return geometry
}

// Vertical fin from an outline of (z, y) points, centred on x = 0.
function fin(outline, thickness) {
  const shape = new Shape()
  outline.forEach(([z, y], i) => (i ? shape.lineTo(z, y) : shape.moveTo(z, y)))
  const geometry = new ExtrudeGeometry(shape, { depth: thickness, bevelEnabled: false })
  geometry.rotateY(-HALF_PI)
  geometry.translate(thickness / 2, 0, 0)
  return geometry
}

// Cylinder lying along Z (radiusFront at +Z).
function tube(radiusFront, radiusBack, length, segments = 10) {
  const geometry = new CylinderGeometry(radiusFront, radiusBack, length, segments, 1)
  geometry.rotateX(HALF_PI)
  return geometry
}

// Disc facing backwards (-Z), for glowing nozzles. Placed a few thousandths
// behind the nozzle's end cap so the two never z-fight.
function nozzleDisc(radius) {
  const geometry = new CircleGeometry(radius, 12)
  geometry.rotateY(Math.PI)
  return geometry
}

// ~0.35 u: a white orbiter with delta wings, a tail fin and three engines.
export function buildShuttle() {
  const kit = new Kit()
  const flat = [1, 1, 0.78]
  kit
    .add(tube(0.075, 0.092, 0.62, 12), { scale: flat })
    .add(new ConeGeometry(0.075, 0.2, 12).rotateX(HALF_PI), { at: [0, 0, 0.41], scale: flat })
    .add(new ConeGeometry(0.024, 0.062, 12).rotateX(HALF_PI), { color: HULL_DARK, rough: 0.8, at: [0, 0, 0.48], scale: flat })
    .add(new BoxGeometry(0.15, 0.022, 0.62), { color: HULL_DARK, rough: 0.8, at: [0, -0.062, 0.0] })
    .pair(() => tube(0.026, 0.03, 0.13, 8), { at: [0.052, 0.05, -0.25] })
    .add(new SphereGeometry(0.06, 12, 6), { color: GLASS, glow: 0.35, rough: 0.12, metal: 0.6, at: [0, 0.043, 0.3], scale: [0.95, 0.55, 1.7] })
    .pair((m) => plate([[0.02, 0.12], [0.37, -0.2], [0.37, -0.29], [0.02, -0.3]], 0.022, m), { at: [0, -0.035, 0] })
    .pair((m) => plate([[0.02, 0.125], [0.372, -0.198], [0.372, -0.225], [0.02, 0.085]], 0.025, m), { color: HULL_DARK, rough: 0.8, at: [0, -0.035, 0] })
    .pair((m) => plate([[0.25, -0.18], [0.37, -0.2], [0.37, -0.29], [0.25, -0.29]], 0.026, m), { color: HULL_DARK, at: [0, -0.035, 0] })
    .add(fin([[-0.31, 0.05], [-0.13, 0.05], [-0.28, 0.25], [-0.34, 0.25]], 0.018), {})
    .add(fin([[-0.33, 0.21], [-0.28, 0.21], [-0.282, 0.25], [-0.34, 0.25]], 0.022), { color: SIGNAL, glow: 0.6 })
    .pair(() => new BoxGeometry(0.006, 0.012, 0.5), { color: SIGNAL, glow: 0.9, at: [0.089, 0.0, 0.03] })
  for (const [x, y] of [[0, 0.028], [0.046, -0.022], [-0.046, -0.022]]) {
    kit.add(tube(0.028, 0.036, 0.07, 10), { color: METAL, metal: 0.7, rough: 0.35, at: [x, y, -0.335] })
    kit.add(nozzleDisc(0.028), { color: SIGNAL_HI, glow: 1.3, at: [x, y, -0.376] })
    kit.engine([x, y, -0.39], '#8fbaff', 0.075)
  }
  kit.nav([0.37, -0.035, -0.25], 'red').nav([-0.37, -0.035, -0.25], 'green').nav([0, 0.255, -0.33], 'white')
  return kit.build(0.35, 0.018)
}

// ~0.5 u: an angular dart with twin engine pods, cyan drives.
export function buildCourier() {
  const kit = new Kit()
  kit
    .add(new OctahedronGeometry(0.5, 0), { color: '#c7cdd8', at: [0, 0, 0.06], scale: [0.15, 0.09, 1.02] })
    .add(new OctahedronGeometry(0.5, 0), { color: GLASS, glow: 0.4, rough: 0.1, metal: 0.5, at: [0, 0.04, 0.2], scale: [0.075, 0.06, 0.32] })
    .pair((m) => plate([[0.05, 0.02], [0.38, -0.2], [0.4, -0.28], [0.06, -0.22]], 0.02, m), { color: '#a9b1be', at: [0, -0.01, 0] })
    .pair((m) => plate([[0.33, -0.17], [0.38, -0.2], [0.4, -0.28], [0.34, -0.25]], 0.024, m), { color: '#ff9a3c', glow: 0.5, at: [0, -0.01, 0] })
    .pair(() => tube(0.045, 0.056, 0.44, 8), { color: '#565f6d', metal: 0.55, rough: 0.4, at: [0.16, 0, -0.17] })
    .pair(() => new BoxGeometry(0.008, 0.01, 0.3), { color: '#5ff0ff', glow: 1.2, at: [0.205, 0.0, -0.14] })
    .pair(() => nozzleDisc(0.045), { color: '#5fd8f0', glow: 1.4, at: [0.16, 0, -0.397] })
    .add(fin([[-0.3, 0.02], [-0.12, 0.02], [-0.26, 0.13], [-0.31, 0.13]], 0.014), { color: '#a9b1be' })
  kit.engine([0.16, 0, -0.41], '#7ff2ff', 0.095).engine([-0.16, 0, -0.41], '#7ff2ff', 0.095)
  kit.nav([0.4, -0.01, -0.27], 'red').nav([-0.4, -0.01, -0.27], 'green').nav([0, 0.135, -0.3], 'white')
  return kit.build(0.5, 0.022)
}

// ~2.5 u: a long-haul cruiser with a command section, fuel tanks, glowing
// radiators and a four-nozzle drive block.
export function buildCruiser() {
  const kit = new Kit()
  kit
    .add(new BoxGeometry(0.06, 0.05, 0.72), { color: METAL, at: [0, 0, 0.0] })
    .add(tube(0.04, 0.09, 0.24, 6), { color: HULL, at: [0, 0, 0.43], scale: [1.15, 1, 0.75], rot: [0, 0, Math.PI / 6] })
    .add(new BoxGeometry(0.07, 0.045, 0.1), { color: HULL, at: [0, 0.07, 0.37] })
    .add(new BoxGeometry(0.072, 0.01, 0.022), { color: WINDOW, glow: 2.2, at: [0, 0.078, 0.418] })
    .add(new BoxGeometry(0.012, 0.004, 0.52), { color: SIGNAL_HI, glow: 1.1, at: [0, 0.027, 0.02] })
    .add(new CylinderGeometry(0.004, 0.004, 0.07, 4), { color: METAL, at: [0, 0.12, 0.34] })
    .add(new SphereGeometry(0.045, 10, 4, 0, Math.PI * 2, 0, 0.7), { color: HULL, at: [0, 0.1, 0.06], rot: [0.5, 0, 0] })
  // Lit windows along the command section's flanks.
  for (let i = 0; i < 7; i++) {
    const z = 0.34 + i * 0.024
    const r = 0.09 - ((z - 0.31) / 0.24) * 0.05
    kit.pair(() => new BoxGeometry(0.004, 0.008, 0.012), { color: WINDOW, glow: 2, at: [r * 1.0 + 0.004, 0.012, z] })
  }
  // Fuel tanks in two rings of four.
  for (const z of [0.15, -0.04]) {
    for (const [x, y] of [[0.066, 0.05], [-0.066, 0.05], [0.066, -0.05], [-0.066, -0.05]]) {
      kit.add(tube(0.036, 0.036, 0.17, 10), { color: z > 0 ? '#c4cad3' : '#9aa3af', at: [x, y, z] })
      kit.add(tube(0.038, 0.038, 0.012, 10), { color: HULL_DARK, at: [x, y, z + 0.06] })
    }
  }
  // Radiator wings with hot stripes.
  kit.pair(() => new BoxGeometry(0.26, 0.005, 0.15), { color: '#2a2e35', rough: 0.7, at: [0.165, 0, -0.22] })
  for (const dz of [-0.05, 0, 0.05]) {
    kit.pair(() => new BoxGeometry(0.24, 0.006, 0.008), { color: '#ff7a3a', glow: 0.8, at: [0.165, 0, -0.22 + dz] })
  }
  kit.add(new BoxGeometry(0.17, 0.13, 0.13), { color: '#6c7480', at: [0, 0, -0.34] })
  kit.add(new BoxGeometry(0.175, 0.02, 0.135), { color: HULL_DARK, at: [0, 0.04, -0.34] })
  for (const [x, y] of [[0.045, 0.036], [-0.045, 0.036], [0.045, -0.036], [-0.045, -0.036]]) {
    kit.add(tube(0.032, 0.048, 0.075, 12), { color: '#2f343c', metal: 0.75, rough: 0.3, at: [x, y, -0.442] })
    kit.add(nozzleDisc(0.044), { color: '#7fa9ff', glow: 1.1, at: [x, y, -0.486] })
    kit.engine([x, y, -0.5], '#9cc7ff', 0.07)
  }
  kit.engine([0, 0, -0.58], '#5d8cff', 0.2)
  kit.nav([0.295, 0, -0.22], 'red').nav([-0.295, 0, -0.22], 'green').nav([0, 0.13, 0.34], 'white').nav([0, 0.07, -0.34], 'white')
  return kit.build(2.5, 0.05)
}

// Ring station, axis +Y: the spinning ring (with spokes and windows) and the
// static core (hub, docking module, truss and sun-tracking solar wings,
// panels facing +Z) are separate meshes so the ring can turn.
export function buildStation() {
  const ring = new Kit()
  ring
    .add(new TorusGeometry(0.4, 0.045, 8, 40).rotateX(HALF_PI), { color: '#cfd5de', rough: 0.55 })
    .add(new TorusGeometry(0.4, 0.047, 3, 40, Math.PI * 2).rotateX(HALF_PI), { color: HULL_DARK, scale: [1.0, 0.25, 1.0] })
  for (let i = 0; i < 4; i++) {
    const angle = (i / 4) * Math.PI * 2
    ring.add(new CylinderGeometry(0.012, 0.012, 0.3, 6), {
      color: '#99a1ad',
      at: [Math.cos(angle) * 0.205, 0, Math.sin(angle) * 0.205],
      rot: [0, -angle, HALF_PI],
    })
  }
  for (let i = 0; i < 28; i++) {
    const angle = (i / 28) * Math.PI * 2
    ring.add(new BoxGeometry(0.004, 0.014, 0.024), {
      color: WINDOW,
      glow: 2,
      at: [Math.cos(angle) * 0.446, 0.012, Math.sin(angle) * 0.446],
      rot: [0, -angle, 0],
    })
  }
  for (let i = 0; i < 4; i++) {
    const angle = (i / 4) * Math.PI * 2 + Math.PI / 4
    ring.nav([Math.cos(angle) * 0.4, 0.05, Math.sin(angle) * 0.4], i % 2 ? 'green' : 'red')
  }

  const core = new Kit()
  core
    .add(new CylinderGeometry(0.075, 0.075, 0.22, 12), { color: '#b9c0cb' })
    .add(new CylinderGeometry(0.09, 0.09, 0.03, 12), { color: HULL_DARK, at: [0, 0.06, 0] })
    .add(new CylinderGeometry(0.042, 0.042, 0.13, 10), { color: HULL, at: [0, 0.17, 0] })
    .add(new TorusGeometry(0.036, 0.008, 4, 16).rotateX(HALF_PI), { color: SIGNAL_HI, glow: 1.6, at: [0, 0.24, 0] })
    .add(new BoxGeometry(0.024, 0.62, 0.024), { color: METAL, at: [0, -0.4, 0] })
    .add(new CylinderGeometry(0.05, 0.05, 0.08, 8), { color: '#aeb5c0', at: [0, -0.2, 0] })
  for (const y of [-0.44, -0.62]) {
    core.add(new BoxGeometry(0.62, 0.012, 0.012), { color: METAL, at: [0, y, 0] })
    core.pair(() => new BoxGeometry(0.24, 0.14, 0.006), {
      color: '#1b2c63',
      glow: 0.08,
      rough: 0.3,
      metal: 0.5,
      at: [0.19, y, 0],
    })
    for (const dx of [-0.06, 0.0, 0.06]) {
      core.pair(() => new BoxGeometry(0.004, 0.14, 0.008), { color: '#8a97b5', at: [0.19 + dx, y, 0] })
    }
  }
  core.engine([0, 0.25, 0], SIGNAL_HI, 0.05)
  core.nav([0, -0.72, 0], 'white').nav([0.31, -0.53, 0], 'red').nav([-0.31, -0.53, 0], 'green')
  const scale = 0.85
  return { ring: ring.build(scale, 0.02), core: core.build(scale, 0.02) }
}

// One material for every hull: per-vertex glow, roughness and metalness.
export function createHullMaterial() {
  const material = new MeshStandardMaterial({ vertexColors: true, flatShading: true, roughness: 0.5, metalness: 0.2 })
  material.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nattribute vec3 aMat;\nvarying vec3 vMat;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvMat = aMat;')
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vMat;')
      .replace('#include <roughnessmap_fragment>', '#include <roughnessmap_fragment>\nroughnessFactor = vMat.y;')
      .replace('#include <metalnessmap_fragment>', '#include <metalnessmap_fragment>\nmetalnessFactor = vMat.z;')
      .replace(
        '#include <emissivemap_fragment>',
        `#include <emissivemap_fragment>
        totalEmissiveRadiance += diffuseColor.rgb * vMat.x;
        // A faint signal-blue rim keeps night-side silhouettes readable.
        float rim = 1.0 - clamp(dot(normal, normalize(vViewPosition)), 0.0, 1.0);
        totalEmissiveRadiance += vec3(0.16, 0.3, 0.62) * (rim * rim * rim) * 0.32 + diffuseColor.rgb * 0.018;`,
      )
  }
  material.customProgramCacheKey = () => 'ship-hull'
  return material
}
