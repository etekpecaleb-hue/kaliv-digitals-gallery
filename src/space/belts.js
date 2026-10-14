// Rocks: the main asteroid belt and the Kuiper belt (heliocentric, in
// system.frame), a handful of big tumbling asteroids drifting around home and
// the odd fly-by rock streaking past the gallery.
//
// Belt rocks orbit on the GPU: every instance carries its own Kepler elements
// and the vertex shader places it from the sim clock, so the whole belt has
// true differential rotation (inner rocks lap the outer ones) for the cost of
// one draw call per rock shape and no per-frame CPU work.
import {
  AdditiveBlending,
  Color,
  DynamicDrawUsage,
  InstancedBufferAttribute,
  InstancedBufferGeometry,
  InstancedMesh,
  Matrix4,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  Points,
  BufferGeometry,
  BufferAttribute,
  DoubleSide,
  Quaternion,
  RingGeometry,
  ShaderMaterial,
  Sphere,
  Vector3,
  Vector4,
} from 'three'
import { clamp, seededRandom } from '../core/math.js'
import { WORLDS } from '../data/worlds.js'
import { createRockGeometry } from './belts-rocks.js'
import { SCREEN, updateScreen } from './effects-ribbon.js'

const TAU = Math.PI * 2
const DEG = Math.PI / 180

// Scene distances are compressed but periods are real, so a rock's period
// comes from its distance in AU, interpolated between the known bodies.
const AU_AT = [
  [320, 1],
  [440, 1.52],
  [560, 2.77],
  [820, 5.2],
  [1120, 9.54],
  [1420, 19.2],
  [1700, 30.1],
  [1950, 39.5],
  [2100, 43.1],
  [2250, 45.4],
  [2500, 67.8],
]

function astronomicalUnits(a) {
  for (let i = 1; i < AU_AT.length; i++) {
    const [a1, au1] = AU_AT[i]
    const [a0, au0] = AU_AT[i - 1]
    if (a <= a1 || i === AU_AT.length - 1) return au0 + ((a - a0) / (a1 - a0)) * (au1 - au0)
  }
  return 1
}

// Mean motion in radians per sim year (Kepler's third law in AU / years).
const meanMotion = (a) => TAU / astronomicalUnits(a) ** 1.5

const ORBIT_GLSL = /* glsl */ `
  // orbit = (a, e, n rad/yr, M0), plane = (node, inclination, argument of perihelion)
  vec3 orbitPoint(vec4 orbit, vec3 plane, float years) {
    float M = orbit.w + orbit.z * years;
    float e = orbit.y;
    float E = M + e * sin(M);
    E = M + e * sin(E);
    E = M + e * sin(E);
    float xv = orbit.x * (cos(E) - e);
    float yv = orbit.x * sqrt(1.0 - e * e) * sin(E);
    float cw = cos(plane.z), sw = sin(plane.z);
    float cO = cos(plane.x), sO = sin(plane.x);
    float ci = cos(plane.y), si = sin(plane.y);
    float xp = xv * cw - yv * sw;
    float yp = xv * sw + yv * cw;
    float x = xp * cO - yp * ci * sO;
    float y = xp * sO + yp * ci * cO;
    return vec3(x, yp * si, -y);
  }
`

function gaussian(random) {
  return Math.sqrt(-2 * Math.log(1 - random())) * Math.cos(TAU * random())
}

// Main-belt density over semi-major axis: a soft-edged band with Kirkwood
// gaps where the 3:1, 5:2, 7:3 and 2:1 Jupiter resonances fall (2.50, 2.82,
// 2.95 and 3.27 AU on this scale).
function beltDensity(a) {
  const edge = clamp((a - 500) / 18, 0, 1) * clamp((620 - a) / 10, 0, 1)
  const core = 0.7 + 0.3 * Math.exp(-(((a - 556) / 30) ** 2))
  const gap = (centre, width, depth) => 1 - depth * Math.exp(-(((a - centre) / width) ** 2))
  return edge * core * gap(534, 3.4, 0.92) * gap(565, 2.6, 0.8) * gap(579, 2.2, 0.72) * gap(613, 2.6, 0.85)
}

function sampleBeltA(random) {
  for (;;) {
    const a = 500 + random() * 120
    if (random() < beltDensity(a)) return a
  }
}

function kuiperDensity(a) {
  const classical = Math.exp(-(((a - 2120) / 150) ** 2))
  const scattered = 0.25 * clamp((2400 - a) / 300, 0, 1)
  return clamp(classical + scattered, 0, 1)
}

function sampleKuiperA(random) {
  for (;;) {
    const a = 1850 + random() * 550
    if (random() < kuiperDensity(a)) return a
  }
}

// Orbital-element arrays for `count` bodies, filled by `pick(random, out)`
// where out = { a, e, inc, node, peri, M0, n } in radians.
function buildOrbits(count, random, pick) {
  const orbit = new Float32Array(count * 4)
  const plane = new Float32Array(count * 4)
  const out = {}
  for (let i = 0; i < count; i++) {
    pick(random, out, i)
    const n = out.n ?? meanMotion(out.a)
    orbit.set([out.a, out.e, n, out.M0], i * 4)
    plane.set([out.node, out.inc, out.peri, random()], i * 4)
  }
  return { orbit, plane }
}

// ---------------------------------------------------------------- belt rocks

const SPIN_GLSL = /* glsl */ `
  vec3 spinAround(vec3 p, vec3 axis, float angle) {
    return mix(dot(axis, p) * axis, p, cos(angle)) + cross(axis, p) * sin(angle);
  }
  // Dark carbon-grey to dusty grey-tan, picked per rock.
  vec3 rockTint(float pick) {
    return mix(vec3(0.5, 0.49, 0.48), vec3(0.74, 0.66, 0.56), pick * pick) * (0.78 + 0.3 * fract(pick * 7.31));
  }
`

// Kepler mode: each instance follows its own orbit (aOrbit, aPlane).
const ORBIT_VERTEX = /* glsl */ `
  vec3 transformed = spinAround(position * aScale, aSpin.xyz, aSpin.w * uTime + aOrbit.w * 7.0);
  transformed += orbitPoint(aOrbit, aPlane.xyz, uYears);
  vTint = rockTint(aPlane.w);
`

// Field mode: rocks fill a box that wraps around the camera (frame-local),
// shrinking away at the box edge, right next to the camera and around Ceres.
const FIELD_VERTEX = /* glsl */ `
  vec3 rel = mod(aSeed.xyz * uBox + uDrift - uCameraLocal + 0.5 * uBox, uBox) - 0.5 * uBox;
  vec3 centre = uCameraLocal + rel;
  float edge = max(max(abs(rel.x), abs(rel.y)), abs(rel.z)) / uBox;
  float grow = uPresence * (1.0 - smoothstep(0.32, 0.5, edge)) * smoothstep(0.02, 0.06, length(rel) / uBox);
  grow *= smoothstep(uAvoid.w + 0.6, uAvoid.w + 3.0, distance(centre, uAvoid.xyz));
  vec3 transformed = spinAround(position * aScale * grow, aSpin.xyz, aSpin.w * uTime + aSeed.w * 40.0) + centre;
  vTint = rockTint(fract(aSeed.w * 13.7));
`

function rockShaderMaterial(uniforms, mode) {
  const material = new MeshStandardMaterial({
    color: '#ffffff',
    vertexColors: true,
    flatShading: true,
    roughness: 0.95,
    metalness: 0,
  })
  const field = mode === 'field'
  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms)
    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        `#include <common>
        uniform float uYears;
        uniform float uTime;
        attribute vec4 aSpin;
        attribute vec3 aScale;
        varying vec3 vTint;
        ${field
          ? 'uniform vec3 uCameraLocal; uniform vec3 uDrift; uniform float uBox; uniform float uPresence; uniform vec4 uAvoid; attribute vec4 aSeed;'
          : `attribute vec4 aOrbit; attribute vec4 aPlane; ${ORBIT_GLSL}`}
        ${SPIN_GLSL}`,
      )
      .replace('#include <begin_vertex>', field ? FIELD_VERTEX : ORBIT_VERTEX)
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vTint;')
      .replace('#include <color_fragment>', '#include <color_fragment>\ndiffuseColor.rgb *= vTint;')
  }
  material.customProgramCacheKey = () => `belt-rock-${mode}`
  return material
}

// Instanced copy of `base` with per-instance spin axis/rate and stretched size.
function rockInstances(base, count, random, sizeOf, extra, material, radius) {
  const geometry = new InstancedBufferGeometry()
  geometry.index = base.index
  for (const name of Object.keys(base.attributes)) geometry.setAttribute(name, base.attributes[name])
  const spin = new Float32Array(count * 4)
  const scale = new Float32Array(count * 3)
  const axis = new Vector3()
  for (let i = 0; i < count; i++) {
    axis.set(gaussian(random), gaussian(random), gaussian(random)).normalize()
    spin.set([axis.x, axis.y, axis.z, (0.08 + random() * 0.6) * (random() < 0.5 ? -1 : 1)], i * 4)
    const s = sizeOf(random, i)
    scale.set([s * (0.8 + random() * 0.5), s * (0.65 + random() * 0.35), s * (0.75 + random() * 0.4)], i * 3)
  }
  for (const [name, [array, size]] of Object.entries(extra)) geometry.setAttribute(name, new InstancedBufferAttribute(array, size))
  geometry.setAttribute('aSpin', new InstancedBufferAttribute(spin, 4))
  geometry.setAttribute('aScale', new InstancedBufferAttribute(scale, 3))
  geometry.instanceCount = count
  geometry.boundingSphere = new Sphere(new Vector3(), radius)
  const mesh = new Mesh(geometry, material)
  mesh.matrixAutoUpdate = false
  return mesh
}

// ---------------------------------------------------------------- belt haze

// A faint flat glow over the belt's footprint (same gap profile), so it reads
// as a band from far away; it fades out edge-on and close up, where the
// rocks and dust take over.
const HAZE_VERTEX = /* glsl */ `
  varying vec3 vWorld;
  varying vec3 vLocal;
  void main() {
    vLocal = position;
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorld = world.xyz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`

const HAZE_FRAGMENT = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying vec3 vWorld;
  varying vec3 vLocal;
  float gap(float a, float centre, float width, float depth) {
    float d = (a - centre) / width;
    return 1.0 - depth * exp(-d * d);
  }
  void main() {
    float a = length(vLocal.xz);
    float band = smoothstep(498.0, 540.0, a) * (1.0 - smoothstep(585.0, 624.0, a));
    band *= 0.6 + 0.4 * exp(-pow((a - 556.0) / 28.0, 2.0));
    band *= gap(a, 534.0, 3.4, 0.55) * gap(a, 565.0, 2.6, 0.45) * gap(a, 579.0, 2.2, 0.4) * gap(a, 613.0, 2.6, 0.5);
    vec3 toCamera = cameraPosition - vWorld;
    float distance = length(toCamera);
    float faceOn = abs(toCamera.y) / distance;
    float far = smoothstep(120.0, 700.0, distance);
    float angle = atan(vLocal.z, vLocal.x);
    float clumps = 0.75 + 0.25 * sin(angle * 23.0 + sin(angle * 7.0) * 2.0) * sin(angle * 11.0 + a * 0.08);
    float alpha = uOpacity * band * clumps * pow(faceOn, 0.6) * far;
    if (alpha < 0.002) discard;
    gl_FragColor = vec4(uColor, alpha);
    #include <colorspace_fragment>
  }
`

function beltHaze(segments) {
  const geometry = new RingGeometry(496, 626, segments, 3)
  geometry.rotateX(-Math.PI / 2)
  const material = new ShaderMaterial({
    uniforms: { uColor: { value: new Color('#cdb48e') }, uOpacity: { value: 0.07 } },
    vertexShader: HAZE_VERTEX,
    fragmentShader: HAZE_FRAGMENT,
    transparent: true,
    depthWrite: false,
    side: DoubleSide,
    blending: AdditiveBlending,
  })
  const mesh = new Mesh(geometry, material)
  mesh.name = 'belt-haze'
  mesh.matrixAutoUpdate = false
  return mesh
}

// ---------------------------------------------------------------- belt dust

const DUST_VERTEX = /* glsl */ `
  uniform float uYears;
  uniform float uPxScale;
  uniform float uMinPx;
  uniform float uMaxPx;
  uniform float uOpacity;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  attribute vec4 aOrbit;
  attribute vec4 aPlane;
  attribute float aSize;
  varying vec3 vColor;
  varying float vAlpha;
  ${ORBIT_GLSL}
  void main() {
    vec3 p = orbitPoint(aOrbit, aPlane.xyz, uYears);
    vec4 world = modelMatrix * vec4(p, 1.0);
    vec4 mv = viewMatrix * world;
    float px = aSize * uPxScale / max(-mv.z, 1e-3);
    float energy = clamp(px / uMinPx, 0.0, 1.0);
    // Rocks look brightest with the Sun behind the viewer (full phase).
    vec3 sun = modelMatrix[3].xyz;
    float phase = dot(normalize(sun - world.xyz), normalize(cameraPosition - world.xyz));
    float light = 0.3 + 0.7 * (0.5 + 0.5 * phase);
    vColor = mix(uColorA, uColorB, aPlane.w);
    vAlpha = uOpacity * sqrt(energy) * light;
    gl_PointSize = clamp(px, uMinPx, uMaxPx);
    gl_Position = projectionMatrix * mv;
  }
`

const DUST_FRAGMENT = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec2 p = gl_PointCoord * 2.0 - 1.0;
    float d2 = dot(p, p);
    if (d2 > 1.0) discard;
    gl_FragColor = vec4(vColor, vAlpha * (1.0 - d2) * (1.0 - d2));
    #include <colorspace_fragment>
  }
`

function orbitingPoints(count, orbits, random, sizeOf, uniforms, look) {
  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new BufferAttribute(new Float32Array(count * 3), 3))
  geometry.setAttribute('aOrbit', new BufferAttribute(orbits.orbit, 4))
  geometry.setAttribute('aPlane', new BufferAttribute(orbits.plane, 4))
  const sizes = new Float32Array(count)
  for (let i = 0; i < count; i++) sizes[i] = sizeOf(random, i)
  geometry.setAttribute('aSize', new BufferAttribute(sizes, 1))
  geometry.boundingSphere = new Sphere(new Vector3(), look.radius)
  const material = new ShaderMaterial({
    uniforms: {
      uYears: uniforms.uYears,
      uPxScale: SCREEN.uPxScale,
      uMinPx: { value: look.minPx },
      uMaxPx: { value: look.maxPx },
      uOpacity: { value: look.opacity },
      uColorA: { value: new Color(look.colorA) },
      uColorB: { value: new Color(look.colorB) },
    },
    vertexShader: DUST_VERTEX,
    fragmentShader: DUST_FRAGMENT,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  })
  const points = new Points(geometry, material)
  points.matrixAutoUpdate = false
  return points
}

// ---------------------------------------------------------------- near rocks

const NEAR_MIN = 30
const NEAR_MAX = 95
const HOME_RADIUS = 5
// Largest radius a drifting rock may show, in radians as seen from the camera.
const MAX_ANGULAR_SIZE = 0.035

const smoothstep = (edge0, edge1, x) => {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1)
  return t * t * (3 - 2 * t)
}

class DriftingRock {
  constructor(random) {
    this.radius = NEAR_MIN + random() * (NEAR_MAX - NEAR_MIN)
    // Slightly elliptical, but the closest pass stays outside 26 u.
    this.e = random() * Math.min(0.12, 1 - 27 / this.radius)
    this.inc = (random() * 2 - 1) * 38 * DEG
    this.node = random() * TAU
    this.phase = random() * TAU
    // Period grows with distance: ~4 minutes at 30 u, ~13 at 95 u (real time).
    this.rate = (TAU / (240 * (this.radius / NEAR_MIN) ** 1.5)) * (random() < 0.85 ? 1 : -1)
    this.size = 0.4 + random() ** 2.2 * 1.8
    this.stretch = new Vector3(0.85 + random() * 0.4, 0.7 + random() * 0.3, 0.8 + random() * 0.35)
    this.axis = new Vector3(gaussian(random), gaussian(random), gaussian(random)).normalize()
    this.spinRate = (0.05 + random() * 0.22) * (random() < 0.5 ? -1 : 1)
    this.spinPhase = random() * TAU
  }

  positionAt(time, target) {
    const angle = this.phase + this.rate * time
    const r = (this.radius * (1 - this.e * this.e)) / (1 + this.e * Math.cos(angle))
    const x = Math.cos(angle) * r
    const z = Math.sin(angle) * r
    const y = z * Math.sin(this.inc)
    const flatZ = z * Math.cos(this.inc)
    const cn = Math.cos(this.node)
    const sn = Math.sin(this.node)
    return target.set(x * cn - flatZ * sn, y, x * sn + flatZ * cn)
  }
}

function rockMaterial(color) {
  return new MeshStandardMaterial({ color, vertexColors: true, roughness: 0.97, metalness: 0, flatShading: false })
}

// ---------------------------------------------------------------- Belts

export class Belts {
  group = new Object3D()
  uniforms = { uYears: { value: 0 }, uTime: { value: 0 } }

  constructor(system) {
    this.system = system
    const coarse = system.coarse
    this.reduced = system.reduced
    this.epoch = system.years
    system.belts = this
    this.disposables = []

    this.beltGroup = new Object3D()
    this.beltGroup.name = 'asteroid-belts'
    system.frame.add(this.beltGroup)
    this.nearGroup = new Object3D()
    this.nearGroup.name = 'drifting-rocks'
    system.group.add(this.nearGroup)

    this.buildMainBelt(coarse ? 600 : 1400, coarse ? 2200 : 5200)
    this.buildBeltField(coarse ? 150 : 260, coarse ? 2 : 3)
    this.buildKuiperBelt(coarse ? 600 : 1500)
    this.buildDriftingRocks(24, coarse)
    this.buildFlyBy(coarse)
  }

  track(...items) {
    this.disposables.push(...items)
    return items[0]
  }

  buildMainBelt(rockCount, dustCount) {
    const random = seededRandom(5101)
    const ceres = WORLDS.find((w) => w.id === 'ceres').orbit
    const ceresN = TAU / ceres.period
    // Ceres's mean anomaly at the epoch the shaders count from.
    const ceresM = (ceres.L0 - ceres.peri) * DEG + ceresN * this.epoch

    // A loose swarm shares Ceres's orbit and mean motion, so the dwarf planet
    // always sits inside a visibly rocky patch of the belt.
    const ceresSwarm = (r, out, spread) => {
      out.a = ceres.a + gaussian(r) * 9 * spread
      out.e = clamp(ceres.e + gaussian(r) * 0.01, 0, 0.2)
      out.inc = (ceres.i + gaussian(r) * 1.1 * spread) * DEG
      out.node = (ceres.node + gaussian(r) * 2.5) * DEG
      out.peri = (ceres.peri - ceres.node) * DEG
      out.n = ceresN
      out.M0 = ceresM + gaussian(r) * 0.2 * spread
    }
    const beltMember = (r, out, maxE, sigmaInc) => {
      out.n = undefined
      out.a = sampleBeltA(r)
      out.e = r() ** 1.5 * maxE
      out.inc = clamp(Math.abs(gaussian(r)) * sigmaInc, 0, 14) * DEG
      out.node = r() * TAU
      out.peri = r() * TAU
      out.M0 = r() * TAU
    }

    const material = this.track(rockShaderMaterial(this.uniforms, 'orbit'))
    const pareto = (r, min) => min * (1 - r()) ** (-1 / 2.1)
    // Three faceted shapes for the many small rocks, one finer shape for the
    // few big ones (they are the only ones ever seen up close).
    const bigCount = Math.round(rockCount * 0.04)
    const variants = [
      { count: Math.ceil((rockCount - bigCount) / 3), detail: 1, size: (r) => clamp(pareto(r, 0.07), 0.07, 0.3) },
      { count: Math.ceil((rockCount - bigCount) / 3), detail: 1, size: (r) => clamp(pareto(r, 0.07), 0.07, 0.3) },
      { count: Math.floor((rockCount - bigCount) / 3), detail: 1, size: (r) => clamp(pareto(r, 0.07), 0.07, 0.3) },
      { count: bigCount, detail: 3, size: (r) => clamp(pareto(r, 0.3), 0.3, 0.8) },
    ]
    variants.forEach(({ count, detail, size }, v) => {
      const swarm = Math.round(count * 0.16)
      const orbits = buildOrbits(count, random, (r, out, i) =>
        i < swarm ? ceresSwarm(r, out, 1) : beltMember(r, out, 0.1, 3.6),
      )
      const base = this.track(createRockGeometry({ seed: 31 + v * 13, detail, lumps: 0.42, craters: detail > 1 ? 6 : 3 }))
      const mesh = rockInstances(base, count, random, size, { aOrbit: [orbits.orbit, 4], aPlane: [orbits.plane, 4] }, material, 640)
      this.track(mesh.geometry)
      mesh.name = `belt-rocks-${v}`
      this.beltGroup.add(mesh)
    })

    this.haze = beltHaze(this.system.coarse ? 160 : 256)
    this.track(this.haze.geometry, this.haze.material)
    this.beltGroup.add(this.haze)

    const dustOrbits = buildOrbits(dustCount, random, (r, out, i) =>
      i < dustCount * 0.1 ? ceresSwarm(r, out, 1.4) : beltMember(r, out, 0.008, 3.2),
    )
    const dust = orbitingPoints(dustCount, dustOrbits, random, (r) => 0.12 + r() ** 3 * 0.5, this.uniforms, {
      radius: 640,
      minPx: 1.3,
      maxPx: 2.6,
      opacity: 0.7,
      colorA: '#a89c8c',
      colorB: '#dcc4a0',
    })
    this.track(dust.geometry, dust.material)
    dust.name = 'belt-dust'
    this.beltGroup.add(dust)
    this.beltDust = dust
  }

  // Rocks wrapped round the camera whenever it is inside the main belt, so
  // flying through it feels like being in it anywhere, not only near Ceres.
  buildBeltField(count, detail) {
    const random = seededRandom(3301)
    const box = 96
    this.field = {
      uniforms: {
        uCameraLocal: { value: new Vector3() },
        uDrift: { value: new Vector3() },
        uBox: { value: box },
        uPresence: { value: 0 },
        uAvoid: { value: new Vector4(0, 0, 0, 0.9) },
      },
      ceres: this.system.bodyById('ceres'),
      camera: new Vector3(),
      tangent: new Vector3(),
    }
    const seeds = new Float32Array(count * 4)
    for (let i = 0; i < count; i++) seeds.set([random(), random(), random(), random()], i * 4)
    const material = this.track(rockShaderMaterial({ ...this.uniforms, ...this.field.uniforms }, 'field'))
    const base = this.track(createRockGeometry({ seed: 77, detail, lumps: 0.44, craters: 5 }))
    const size = (r) => clamp(0.08 * (1 - r()) ** (-1 / 1.9), 0.08, 1.1)
    const mesh = rockInstances(base, count, random, size, { aSeed: [seeds, 4] }, material, 1)
    mesh.frustumCulled = false
    mesh.visible = false
    mesh.name = 'belt-field'
    this.track(mesh.geometry)
    this.beltGroup.add(mesh)
    this.field.mesh = mesh
  }

  updateBeltField(ctx) {
    const field = this.field
    const { uniforms } = field
    const local = field.camera.setFromMatrixPosition(ctx.camera.matrixWorld).sub(this.system.frame.position)
    const r = Math.hypot(local.x, local.z)
    const height = Math.abs(local.y)
    const presence = clamp((r - 485) / 30, 0, 1) * clamp((640 - r) / 30, 0, 1) * clamp((130 - height) / 60, 0, 1)
    uniforms.uPresence.value = presence
    field.mesh.visible = presence > 0.01
    if (!field.mesh.visible) return
    uniforms.uCameraLocal.value.copy(local)
    // Drift with the local orbital flow (prograde = +Y-up counter-clockwise).
    if (r > 1) {
      const speed = r * meanMotion(r) * ctx.dtYears
      const drift = uniforms.uDrift.value
      drift.x += (local.z / r) * speed
      drift.z -= (local.x / r) * speed
      const box = uniforms.uBox.value
      drift.set(drift.x % box, 0, drift.z % box)
    }
    if (field.ceres) {
      const ceres = field.ceres.object3D.position
      uniforms.uAvoid.value.set(ceres.x, ceres.y, ceres.z, field.ceres.radius)
    }
  }

  buildKuiperBelt(count) {
    const random = seededRandom(7207)
    const orbits = buildOrbits(count, random, (r, out) => {
      out.a = sampleKuiperA(r)
      out.e = r() ** 1.4 * 0.14
      const hot = r() < 0.22
      out.inc = clamp(Math.abs(gaussian(r)) * (hot ? 13 : 4), 0, 34) * DEG
      out.node = r() * TAU
      out.peri = r() * TAU
      out.M0 = r() * TAU
    })
    const points = orbitingPoints(count, orbits, random, (r) => 0.35 + r() ** 4 * 1.6, this.uniforms, {
      radius: 2700,
      minPx: 1.2,
      maxPx: 4,
      opacity: 0.75,
      colorA: '#bcd0f0',
      colorB: '#efe2d0',
    })
    this.track(points.geometry, points.material)
    points.name = 'kuiper-belt'
    this.beltGroup.add(points)
    this.kuiper = points
  }

  buildDriftingRocks(count, coarse) {
    const random = seededRandom(913)
    this.drifters = Array.from({ length: count }, () => new DriftingRock(random))
    const variants = 3
    this.nearMeshes = []
    // grey carbon to dusty grey-brown, like C- and S-type asteroids
    const tints = ['#8e8983', '#7a7772', '#948576']
    for (let v = 0; v < variants; v++) {
      const geometry = this.track(
        createRockGeometry({ seed: 401 + v * 29, detail: coarse ? 6 : 9, smooth: true, lumps: 0.38, craters: 9 }),
      )
      const material = this.track(rockMaterial(tints[v]))
      const mesh = new InstancedMesh(geometry, material, Math.ceil(count / variants))
      mesh.instanceMatrix.setUsage(DynamicDrawUsage)
      mesh.name = `drifting-rocks-${v}`
      mesh.frustumCulled = false
      this.nearGroup.add(mesh)
      this.nearMeshes.push(mesh)
    }
    this.drifters.forEach((rock, i) => {
      rock.mesh = this.nearMeshes[i % variants]
      rock.slot = Math.floor(i / variants)
    })
    this.tmpMatrix = new Matrix4()
    this.tmpPosition = new Vector3()
    this.tmpQuaternion = new Quaternion()
    this.tmpScale = new Vector3()
    this.tmpView = new Vector3()
    this.tmpAcross = new Vector3()
    this.tmpClosest = new Vector3()
    this.cameraPosition = new Vector3()
    this.updateDrifters(0)
  }

  buildFlyBy(coarse) {
    const geometry = this.track(
      createRockGeometry({ seed: 1777, detail: coarse ? 5 : 8, smooth: true, lumps: 0.45, craters: 7 }),
    )
    const material = this.track(rockMaterial('#a89a8c'))
    this.flyBy = new Mesh(geometry, material)
    this.flyBy.name = 'fly-by-rock'
    this.flyBy.visible = false
    this.nearGroup.add(this.flyBy)
    this.flyState = {
      active: false,
      wait: 8 + Math.random() * 10,
      start: new Vector3(),
      velocity: new Vector3(),
      axis: new Vector3(0, 1, 0),
      spin: 0,
      life: 0,
      duration: 0,
    }
  }

  // `camera` (world position) lets rocks get out of the way: they shrink away
  // when they come close to the lens or drift in front of the globe.
  updateDrifters(time, camera = null) {
    const matrix = this.tmpMatrix
    const position = this.tmpPosition
    const quaternion = this.tmpQuaternion
    const scale = this.tmpScale
    const toRock = this.tmpView
    let homeDistance = 0
    let globeAngle = 0
    if (camera) {
      homeDistance = camera.length()
      globeAngle = Math.asin(Math.min(1, (HOME_RADIUS + 1.5) / Math.max(homeDistance, HOME_RADIUS + 1.5)))
    }
    for (let i = 0; i < this.drifters.length; i++) {
      const rock = this.drifters[i]
      rock.positionAt(time, position)
      quaternion.setFromAxisAngle(rock.axis, rock.spinPhase + rock.spinRate * time)
      let size = rock.size
      if (camera) {
        const reach = rock.size * 1.4
        toRock.subVectors(position, camera)
        const distance = toRock.length()
        size *= smoothstep(3, 14, distance - reach)
        // never a boulder filling a corner of the view: cap its angular size
        const cap = distance * MAX_ANGULAR_SIZE
        size = (size * cap) / Math.sqrt(size * size + cap * cap)
        // in front of the globe: compare its direction with the globe's
        if (distance < homeDistance) {
          const cos = -toRock.dot(camera) / (distance * homeDistance)
          const angle = Math.acos(clamp(cos, -1, 1)) - Math.atan(reach / distance)
          size *= smoothstep(globeAngle, globeAngle * 1.35 + 0.02, angle)
        }
      }
      scale.copy(rock.stretch).multiplyScalar(Math.max(size, 1e-4))
      matrix.compose(position, quaternion, scale)
      rock.mesh.setMatrixAt(rock.slot, matrix)
    }
    for (const mesh of this.nearMeshes) mesh.instanceMatrix.needsUpdate = true
  }

  // Picks a pass that crosses the view behind (or beside) the globe and
  // clears home by 25-60 u, at 45-90 u/s.
  launchFlyBy(camera) {
    const s = this.flyState
    const view = this.tmpView
    const across = this.tmpAcross
    const closest = this.tmpClosest
    camera.getWorldDirection(view)
    across.set(gaussian(Math.random), gaussian(Math.random), gaussian(Math.random))
    across.addScaledVector(view, -across.dot(view)).normalize()
    // Closest point: mostly beyond the globe, offset sideways.
    const miss = 25 + Math.random() * 35
    closest.copy(view).multiplyScalar(0.55 + Math.random() * 0.4)
    closest.addScaledVector(across, (Math.random() * 2 - 1) * 0.7).normalize().multiplyScalar(miss)
    // Direction of travel: perpendicular to the line of sight to that point.
    s.velocity.crossVectors(closest, view)
    if (s.velocity.lengthSq() < 1e-6) s.velocity.copy(across)
    s.velocity.normalize()
    const speed = 45 + Math.random() * 45
    const reach = 520
    s.start.copy(closest).addScaledVector(s.velocity, -reach)
    s.velocity.multiplyScalar(speed)
    s.duration = (reach * 2) / speed
    s.life = 0
    s.axis.set(gaussian(Math.random), gaussian(Math.random), gaussian(Math.random)).normalize()
    s.spin = (0.4 + Math.random() * 0.9) * (Math.random() < 0.5 ? -1 : 1)
    const size = 0.9 + Math.random() * 1.6
    this.flyBy.scale.set(size * 1.25, size * 0.8, size)
    s.active = true
    this.flyBy.visible = true
  }

  updateFlyBy(dt, camera) {
    const s = this.flyState
    if (!s.active) {
      if (this.reduced || !camera) return
      s.wait -= dt
      if (s.wait <= 0) this.launchFlyBy(camera)
      return
    }
    s.life += dt
    this.flyBy.position.copy(s.start).addScaledVector(s.velocity, s.life)
    this.flyBy.quaternion.setFromAxisAngle(s.axis, s.spin * s.life)
    if (s.life >= s.duration) {
      s.active = false
      this.flyBy.visible = false
      s.wait = 20 + Math.random() * 20
    }
  }

  update(time, dt, ctx) {
    this.uniforms.uYears.value = ctx.years - this.epoch
    this.uniforms.uTime.value = time
    if (ctx.camera) {
      updateScreen(this.system.renderer, ctx.camera)
      this.updateBeltField(ctx)
    }
    const camera = ctx.camera ? this.cameraPosition.setFromMatrixPosition(ctx.camera.matrixWorld) : null
    this.updateDrifters(time, camera)
    this.updateFlyBy(dt, ctx.camera)
  }

  dispose() {
    this.beltGroup.removeFromParent()
    this.nearGroup.removeFromParent()
    for (const item of this.disposables) item.dispose?.()
    for (const mesh of this.nearMeshes) mesh.dispose()
    if (this.system.belts === this) this.system.belts = null
  }
}
