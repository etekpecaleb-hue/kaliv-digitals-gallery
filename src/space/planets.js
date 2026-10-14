// Planet, moon and dwarf-planet visuals for SolarSystem (its `visuals` hook):
// lit surfaces with baked procedural maps, atmosphere halos, Saturn's and
// Uranus' rings, orbit lines and far-away glints.
//
//   const visuals = await createPlanetVisuals({ renderer, scene, coarse })
//   const system = new SolarSystem({ ..., visuals })
//   visuals.baker          shared TextureBaker (sky.js queues on it too)
//   visuals.lighting       { sunPosition, sunColor, ambient } shared uniforms
//   visuals.setOrbitsVisible(bool), visuals.setGlintsVisible(bool)
import {
  AdditiveBlending,
  BackSide,
  BufferAttribute,
  BufferGeometry,
  ClampToEdgeWrapping,
  Color,
  DataTexture,
  DoubleSide,
  LineSegments,
  LinearFilter,
  LinearMipmapLinearFilter,
  Matrix3,
  Mesh,
  Points,
  RingGeometry,
  SRGBColorSpace,
  ShaderMaterial,
  SphereGeometry,
  Vector2,
  Vector3,
} from 'three'
import { clamp, damp, seededRandom } from '../core/math.js'
import { orbitPosition } from './orbits.js'
import { RECIPES, TextureBaker } from './textures.js'
import { createSunSurface } from './sun.js'
import {
  ATMOSPHERE_FRAGMENT,
  ATMOSPHERE_VERTEX,
  GLINT_FRAGMENT,
  GLINT_VERTEX,
  ORBIT_FRAGMENT,
  ORBIT_VERTEX,
  PLANET_FRAGMENT,
  PLANET_VERTEX,
  RING_FRAGMENT,
  RING_VERTEX,
} from './planetShaders.js'

const TAU = Math.PI * 2
const DEG = Math.PI / 180
const MAX_ORBITS = 16

// Linear sun colour and the bluish ambient that keeps night sides readable.
// Both follow SolarSystem's sunLight / ambient (intensity / PI, like three's
// physically based lights), so standard materials and these shaders agree.
export const SUN_COLOR = new Color('#fff4e0').multiplyScalar(1.02)
export const AMBIENT_COLOR = new Color(0.018, 0.024, 0.042)

// Per-body look: wrap softens the terminator of thick atmospheres; rim is the
// haze tint on the disc, halo the glow outside the limb (shell = its radius).
const LOOKS = {
  venus: { wrap: 0.1, atmosphere: { rim: 0.38, halo: 0.9, shell: 1.045 } },
  mars: { wrap: 0.02, atmosphere: { rim: 0.3, halo: 0.7, shell: 1.035 } },
  jupiter: { wrap: 0.05, atmosphere: { rim: 0.26, halo: 0.55, shell: 1.028 } },
  saturn: { wrap: 0.05, atmosphere: { rim: 0.24, halo: 0.5, shell: 1.028 } },
  uranus: { wrap: 0.08, specular: 0.04, atmosphere: { rim: 0.36, halo: 0.75, shell: 1.05 } },
  neptune: { wrap: 0.08, specular: 0.05, atmosphere: { rim: 0.4, halo: 0.85, shell: 1.05 } },
  haumea: { specular: 0.32 },
  eris: { specular: 0.16 },
  pluto: { specular: 0.05 },
  makemake: { specular: 0.05 },
}

// Orbit-line tint strength (additive) per kind of body.
const ORBIT_TINT = { 'Home world': 0.85, Planet: 0.55, 'Dwarf planet': 0.42, Moon: 0.5 }

function solveKepler(meanAnomaly, e) {
  let E = e < 0.8 ? meanAnomaly : Math.PI
  for (let i = 0; i < 8; i++) {
    const delta = (E - e * Math.sin(E) - meanAnomaly) / (1 - e * Math.cos(E))
    E -= delta
    if (Math.abs(delta) < 1e-7) break
  }
  return E
}

// Position along the orbit as a 0..1 phase of the eccentric anomaly.
function orbitPhase(orbit, years) {
  const M = (orbit.L0 + (360 * years) / orbit.period - orbit.peri) * DEG
  const E = solveKepler(Math.atan2(Math.sin(M), Math.cos(M)), orbit.e)
  return (((E / TAU) % 1) + 1) % 1
}

function smoothNoise1D(seed, size = 512) {
  const random = seededRandom(seed)
  const lattice = Float32Array.from({ length: size }, () => random())
  return (x) => {
    const i = Math.floor(x)
    const f = x - i
    const a = lattice[((i % size) + size) % size]
    const b = lattice[(((i + 1) % size) + size) % size]
    return a + (b - a) * f * f * (3 - 2 * f)
  }
}

const smooth = (a, b, x) => {
  const t = clamp((x - a) / (b - a), 0, 1)
  return t * t * (3 - 2 * t)
}

// Saturn's rings by radius in planet radii: C, B, Cassini division, A (with
// the Encke and Keeler gaps) and the thin F ring. Returns [r, g, b, opacity].
function saturnRing(x, noise) {
  const fine = noise(x * 520)
  const mid = noise(x * 110 + 40)
  const coarse = noise(x * 24 + 90)
  // radial banding in brightness, so even the opaque B ring reads as ringlets
  const shade = 0.8 + 0.22 * fine + 0.14 * mid + 0.06 * coarse
  if (x < 1.239) return [0, 0, 0, 0]
  if (x < 1.527) {
    const plateaus = smooth(0.62, 0.7, noise(x * 60 + 7)) * 0.16
    return [0.5 * shade, 0.46 * shade, 0.41 * shade, 0.07 + 0.08 * mid + plateaus + 0.04 * fine]
  }
  if (x < 1.951) {
    const t = (x - 1.527) / 0.424
    const opacity = 0.5 + 0.42 * smooth(0, 0.3, t) + 0.12 * (fine - 0.5) + 0.06 * (mid - 0.5)
    return [(0.84 + 0.05 * t) * shade, (0.76 + 0.06 * t) * shade, (0.62 + 0.07 * t) * shade, clamp(opacity, 0, 0.96)]
  }
  if (x < 2.025) return [0.44, 0.41, 0.37, 0.03 + 0.07 * fine * smooth(1.96, 2.0, x)]
  if (x < 2.27) {
    const encke = 1 - smooth(0.0, 0.004, Math.abs(x - 2.214))
    const keeler = 1 - smooth(0.0, 0.0015, Math.abs(x - 2.262))
    const opacity = (0.48 + 0.12 * mid + 0.08 * (fine - 0.5)) * (1 - encke * 0.92) * (1 - keeler * 0.8)
    return [0.77 * shade, 0.73 * shade, 0.66 * shade, opacity * (1 - smooth(2.255, 2.27, x) * 0.4)]
  }
  const f = Math.exp(-(((x - 2.281) / 0.0022) ** 2))
  return [0.8, 0.77, 0.72, 0.38 * f]
}

// Uranus' narrow dark rings (6, 5, 4, alpha, beta, eta, gamma, delta, lambda,
// epsilon) as [radius in planet radii, width, opacity].
const URANUS_RINGLETS = [
  [1.637, 0.004, 0.28],
  [1.652, 0.004, 0.28],
  [1.666, 0.004, 0.3],
  [1.75, 0.006, 0.36],
  [1.786, 0.006, 0.36],
  [1.846, 0.004, 0.22],
  [1.863, 0.004, 0.3],
  [1.89, 0.005, 0.34],
  [1.957, 0.003, 0.2],
  [2.001, 0.013, 0.62],
]

// Coal-dark and narrow: they should only just show.
function uranusRing(x) {
  let opacity = 0.006
  for (const [radius, width, strength] of URANUS_RINGLETS) {
    opacity += strength * 0.5 * Math.exp(-(((x - radius) / width) ** 2))
  }
  return [0.34, 0.36, 0.38, clamp(opacity, 0, 0.5)]
}

// 1D radial profile (sRGB colour + opacity) sampled by the ring shader.
function ringProfile(style, inner, outer, planetRadius) {
  const size = 1024
  const data = new Uint8Array(size * 4)
  const noise = smoothNoise1D(style === 'saturn' ? 7 : 9)
  for (let i = 0; i < size; i++) {
    const r = inner + ((i + 0.5) / size) * (outer - inner)
    const sample =
      style === 'saturn' ? saturnRing(r / planetRadius, noise) : uranusRing(1.62 + ((r - inner) / (outer - inner)) * 0.4)
    for (let c = 0; c < 4; c++) data[i * 4 + c] = Math.round(clamp(sample[c], 0, 1) * 255)
  }
  const texture = new DataTexture(data, size, 1)
  texture.colorSpace = SRGBColorSpace
  texture.magFilter = LinearFilter
  texture.minFilter = LinearMipmapLinearFilter
  texture.generateMipmaps = true
  texture.wrapS = ClampToEdgeWrapping
  texture.needsUpdate = true
  return texture
}

function solidTexture(r, g, b) {
  const texture = new DataTexture(new Uint8Array([r, g, b, 255]), 1, 1)
  texture.needsUpdate = true
  return texture
}

class PlanetVisuals {
  baker
  system = null
  sunPosition = new Vector3()
  cameraPosition = new Vector3()
  lighting = {
    sunPosition: { value: this.sunPosition },
    sunColor: { value: SUN_COLOR.clone() },
    ambient: { value: AMBIENT_COLOR.clone() },
  }
  fades = []
  geometries = new Map()
  orbitLines = []
  orbitOpacity = 1
  orbitTarget = 1
  glintTarget = 1
  sunSurface = null
  viewport = new Vector2()
  // everything created here, for dispose()
  objects = []
  textures = []
  scratch = new Vector3()
  cameraLocal = new Vector3()
  zero = new Vector3()

  constructor({ renderer, coarse = false, profile = false }) {
    this.renderer = renderer
    this.coarse = coarse
    this.baker = new TextureBaker(renderer, { coarse, profile })
    this.placeholder = solidTexture(255, 255, 255)
    this.flatNormal = solidTexture(128, 128, 255)
    this.textures.push(this.placeholder, this.flatNormal)
  }

  sphere(widthSegments) {
    if (!this.geometries.has(widthSegments)) {
      this.geometries.set(widthSegments, new SphereGeometry(1, widthSegments, widthSegments / 2))
    }
    return this.geometries.get(widthSegments)
  }

  // Lower = baked sooner: the nearest bodies first.
  distanceTo(mesh, radius) {
    return mesh.getWorldPosition(this.scratch).distanceTo(this.cameraPosition) - radius
  }

  fadeIn(uniform, seconds = 0.8) {
    this.fades.push({ uniform, rate: 1 / seconds })
  }

  createBody(def) {
    if (def.id === 'sun') return this.createSun(def)
    const look = LOOKS[def.id] ?? {}
    const recipe = RECIPES[def.texture]
    const rocky = recipe?.kind === 'surface'
    const big = def.radius >= 4
    const segments = big ? (this.coarse ? 64 : 96) : this.coarse ? 48 : 64
    const lighting = this.lighting
    const uniforms = {
      uMap: { value: this.placeholder },
      uNormalMap: { value: this.flatNormal },
      uMapMix: { value: 0 },
      uNormalMix: { value: 0 },
      uNormalScale: { value: look.normalScale ?? 1 },
      uBaseColor: { value: new Color(def.color) },
      uNormalWorld: { value: new Matrix3() },
      uSunPos: lighting.sunPosition,
      uSunColor: lighting.sunColor,
      uAmbient: lighting.ambient,
      uAtmosphere: {
        value: def.atmosphere ? new Color(def.atmosphere).multiplyScalar(look.atmosphere?.rim ?? 0.3) : new Color(0, 0, 0),
      },
      uWrap: { value: look.wrap ?? 0 },
      uSpecular: { value: look.specular ?? 0 },
    }
    const defines = {}
    if (rocky) defines.USE_NORMALMAP = ''
    const extras = []
    let profile = null
    if (def.rings) {
      const { inner, outer, style } = def.rings
      profile = ringProfile(style, inner, outer, def.radius)
      this.textures.push(profile)
      if (style === 'saturn') {
        defines.RING_SHADOW = ''
        uniforms.uRingProfile = { value: profile }
        uniforms.uRingRange = { value: new Vector2(inner, outer) }
      }
    }

    const material = new ShaderMaterial({
      name: `planet-${def.id}`,
      uniforms,
      defines,
      vertexShader: PLANET_VERTEX,
      fragmentShader: PLANET_FRAGMENT,
    })
    const mesh = new Mesh(this.sphere(segments), material)
    mesh.name = `${def.id}-surface`
    this.objects.push(mesh)
    // Haumea spins about its shortest axis, like the real one
    if (def.shape) mesh.scale.set(def.shape[0], def.shape[2], def.shape[1]).multiplyScalar(def.radius)
    else mesh.scale.setScalar(def.radius)
    mesh.onBeforeRender = () => uniforms.uNormalWorld.value.getNormalMatrix(mesh.matrixWorld)

    if (recipe) {
      const priority = () => this.distanceTo(mesh, def.radius)
      // dwarf planets never fill much of the screen: half-size maps on desktop
      const size = !this.coarse && def.radius < 1.2 ? { width: this.baker.width / 2, height: this.baker.height / 2 } : {}
      this.baker.bake(def.texture, 'albedo', {
        ...size,
        priority,
        onDone: (job) => {
          uniforms.uMap.value = job.texture
          this.fadeIn(uniforms.uMapMix)
        },
      })
      if (rocky) {
        this.baker.bake(def.texture, 'normal', {
          ...size,
          priority: () => 1e6 + priority(),
          onDone: (job) => {
            uniforms.uNormalMap.value = job.texture
            this.fadeIn(uniforms.uNormalMix)
          },
        })
      }
    }

    if (def.atmosphere && look.atmosphere) extras.push(this.createAtmosphere(def, look.atmosphere))
    if (def.rings) extras.push(this.createRings(def, profile))
    return { mesh, extras, uniforms }
  }

  createSun(def) {
    const surface = createSunSurface(def, { coarse: this.coarse })
    this.sunSurface = surface
    this.objects.push(surface.mesh)
    this.baker.bake('sun', 'data', {
      priority: () => this.distanceTo(surface.mesh, def.radius) * 0.5,
      onDone: (job) => {
        surface.uniforms.uMap.value = job.texture
        this.fadeIn(surface.uniforms.uMapMix, 1.2)
      },
    })
    surface.uniforms.uMap.value = this.placeholder
    return { mesh: surface.mesh, extras: [], uniforms: surface.uniforms }
  }

  createAtmosphere(def, look) {
    const material = new ShaderMaterial({
      name: `atmosphere-${def.id}`,
      uniforms: {
        uColor: { value: new Color(def.atmosphere).multiplyScalar(look.halo) },
        uRadius: { value: def.radius },
        uShell: { value: def.radius * look.shell },
        uSunPos: this.lighting.sunPosition,
      },
      vertexShader: ATMOSPHERE_VERTEX,
      fragmentShader: ATMOSPHERE_FRAGMENT,
      side: BackSide,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
    })
    const shell = new Mesh(this.sphere(this.coarse ? 48 : 64), material)
    shell.name = `${def.id}-atmosphere`
    this.objects.push(shell)
    shell.scale.setScalar(def.radius * look.shell)
    return shell
  }

  createRings(def, profile) {
    const { inner, outer, style } = def.rings
    const material = new ShaderMaterial({
      name: `rings-${def.id}`,
      uniforms: {
        uProfile: { value: profile },
        uRange: { value: new Vector2(inner, outer) },
        uPlanetRadius: { value: def.radius },
        uSunPos: this.lighting.sunPosition,
        uSunColor: this.lighting.sunColor,
        uAmbient: this.lighting.ambient,
        uBrightness: { value: style === 'saturn' ? 1.05 : 0.45 },
      },
      vertexShader: RING_VERTEX,
      fragmentShader: RING_FRAGMENT,
      side: DoubleSide,
      transparent: true,
      depthWrite: false,
    })
    const ring = new Mesh(new RingGeometry(inner * 0.995, outer * 1.005, this.coarse ? 128 : 192, 1), material)
    ring.name = `${def.id}-rings`
    this.objects.push(ring)
    ring.rotation.x = -Math.PI / 2
    return ring
  }

  // Runs on the first update, once the system's bodies and frames exist.
  init(system) {
    this.system = system
    for (const body of system.bodies) body.pickRadius = pickRadius(body)
    const heliocentric = [system.home, ...system.worlds]
    // fade an orbit while the camera is deep inside it (distance to its centre / a)
    this.orbitLines.push(this.createOrbitLines(heliocentric, system.frame, [0.3, 0.75]))
    this.orbitLines.push(this.createOrbitLines([system.moon], system.group, [1.3, 2.6]))
    this.createGlints(system)
    this.setOrbitsVisible(this.orbitTarget > 0)
  }

  createOrbitLines(bodies, parent, insideFade) {
    const positions = []
    const colors = []
    const orbits = []
    const index = []
    const starts = []
    const point = new Vector3()
    const color = new Color()
    const white = new Color('#ffffff')
    bodies.forEach((body, slot) => {
      const { orbit } = body.def
      starts.push(positions.length / 3)
      const segments = clamp(Math.round(orbit.a * 0.5), 192, 768)
      const dwarf = body.kind === 'Dwarf planet'
      color.set(body.id === 'home' ? '#5f9dff' : body.color).lerp(white, 0.18)
      color.multiplyScalar(ORBIT_TINT[body.kind] ?? 0.5)
      const base = positions.length / 3
      // sample evenly in eccentric anomaly so perihelion stays smooth
      for (let k = 0; k <= segments; k++) {
        const E = (k / segments) * TAU
        const M = E - orbit.e * Math.sin(E)
        const years = ((M / DEG + orbit.peri - orbit.L0) / 360) * orbit.period
        orbitPosition(orbit, years, point)
        positions.push(point.x, point.y, point.z)
        colors.push(color.r, color.g, color.b)
        orbits.push(k / segments, slot, dwarf ? 1 : 0)
        if (k > 0) index.push(base + k - 1, base + k)
      }
    })
    const geometry = new BufferGeometry()
    geometry.setAttribute('position', new BufferAttribute(new Float32Array(positions), 3))
    geometry.setAttribute('aColor', new BufferAttribute(new Float32Array(colors), 3))
    geometry.setAttribute('aOrbit', new BufferAttribute(new Float32Array(orbits), 3))
    geometry.setIndex(index)
    const uniforms = {
      uBodyPos: { value: Array.from({ length: MAX_ORBITS }, () => new Vector3()) },
      uBodyPhase: { value: new Float32Array(MAX_ORBITS) },
      uBodyRadius: { value: new Float32Array(MAX_ORBITS) },
      uOrbitSize: { value: new Float32Array(MAX_ORBITS).fill(1) },
      uOwnFade: { value: new Float32Array(MAX_ORBITS).fill(1) },
      uDashLevel: { value: new Float32Array(MAX_ORBITS).fill(5) },
      uInsideFade: { value: new Vector2(...insideFade) },
      uOpacity: { value: 1 },
    }
    bodies.forEach((body, slot) => {
      uniforms.uBodyRadius.value[slot] = body.radius
      uniforms.uOrbitSize.value[slot] = body.def.orbit.a
    })
    const material = new ShaderMaterial({
      name: 'orbit-lines',
      uniforms,
      vertexShader: ORBIT_VERTEX,
      fragmentShader: ORBIT_FRAGMENT,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
    })
    const lines = new LineSegments(geometry, material)
    lines.name = 'orbit-lines'
    parent.add(lines)
    this.objects.push(lines)
    // every 8th vertex of each orbit, for the camera's distance to the line
    const probes = bodies.map((body, slot) => {
      const first = starts[slot]
      const last = slot + 1 < bodies.length ? starts[slot + 1] : positions.length / 3
      const picked = []
      for (let k = first; k < last; k += 8) picked.push(positions[k * 3], positions[k * 3 + 1], positions[k * 3 + 2])
      return Float32Array.from(picked)
    })
    return { lines, bodies, uniforms, probes }
  }

  createGlints(system) {
    const bodies = [system.home, system.moon, ...system.worlds]
    const geometry = new BufferGeometry()
    const colors = new Float32Array(bodies.length * 3)
    const radii = new Float32Array(bodies.length)
    const color = new Color()
    bodies.forEach((body, i) => {
      color.set(body.id === 'home' ? '#9cc7ff' : body.color)
      color.toArray(colors, i * 3)
      radii[i] = body.def.rings ? body.radius * 1.6 : body.radius
    })
    this.glintPositions = new BufferAttribute(new Float32Array(bodies.length * 3), 3)
    geometry.setAttribute('position', this.glintPositions)
    geometry.setAttribute('aColor', new BufferAttribute(colors, 3))
    geometry.setAttribute('aRadius', new BufferAttribute(radii, 1))
    this.glintUniforms = {
      uViewportHeight: { value: 800 },
      uPixelRatio: { value: 1 },
      uOpacity: { value: 1 },
      uSunPos: this.lighting.sunPosition,
    }
    const material = new ShaderMaterial({
      name: 'planet-glints',
      uniforms: this.glintUniforms,
      vertexShader: GLINT_VERTEX,
      fragmentShader: GLINT_FRAGMENT,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
    })
    this.glints = new Points(geometry, material)
    this.glints.name = 'planet-glints'
    this.objects.push(this.glints)
    this.glints.frustumCulled = false
    this.glintBodies = bodies
    system.group.add(this.glints)
  }

  setOrbitsVisible(visible) {
    this.orbitTarget = visible ? 1 : 0
  }

  setGlintsVisible(visible) {
    this.glintTarget = visible ? 1 : 0
  }

  update(time, dt, ctx, system) {
    if (!this.system) this.init(system)
    this.syncLights(system)
    this.sunPosition.copy(ctx.sunPosition)
    this.cameraPosition.copy(ctx.camera.position)
    this.baker.update()

    for (let i = this.fades.length - 1; i >= 0; i--) {
      const fade = this.fades[i]
      fade.uniform.value = Math.min(1, fade.uniform.value + dt * fade.rate)
      if (fade.uniform.value >= 1) this.fades.splice(i, 1)
    }
    if (this.sunSurface && !ctx.reduced) this.sunSurface.uniforms.uTime.value += dt

    this.updateOrbits(ctx, dt)
    this.updateGlints(dt)
  }

  syncLights(system) {
    const { sunLight, ambient } = system
    if (sunLight) this.lighting.sunColor.value.copy(sunLight.color).multiplyScalar(sunLight.intensity / Math.PI)
    if (ambient) this.lighting.ambient.value.copy(ambient.color).multiplyScalar(ambient.intensity / Math.PI)
  }

  updateOrbits(ctx, dt) {
    this.orbitOpacity = damp(this.orbitOpacity, this.orbitTarget, 6, dt)
    const frame = this.system.frame
    const camera = this.cameraPosition
    this.renderer.getDrawingBufferSize(this.viewport)
    // device pixels per world unit at a distance of one unit, and the wanted
    // dash period on screen
    const pxScale = (this.viewport.y * ctx.camera.projectionMatrix.elements[5]) / 2
    const dashPeriod = 26 * this.renderer.getPixelRatio()
    for (const orbit of this.orbitLines) {
      const { lines, bodies, uniforms, probes } = orbit
      lines.visible = this.orbitOpacity > 0.01
      if (!lines.visible) continue
      uniforms.uOpacity.value = this.orbitOpacity
      const parent = lines.parent
      const local = this.cameraLocal.copy(camera).sub(parent === frame ? frame.position : this.zero)
      for (let slot = 0; slot < bodies.length; slot++) {
        const body = bodies[slot]
        const position = uniforms.uBodyPos.value[slot]
        if (body.id === 'home') position.copy(frame.position).negate()
        else position.copy(body.object3D.position)
        uniforms.uBodyPhase.value[slot] = orbitPhase(body.def.orbit, body.years ?? ctx.years)
        const a = body.def.orbit.a
        uniforms.uOwnFade.value[slot] = smooth(a * 0.35, a * 1.2, local.distanceTo(position))
        if (body.kind === 'Dwarf planet') {
          const nearest = Math.max(nearestDistance(probes[slot], local), body.radius * 4)
          const count = (TAU * a * pxScale) / (nearest * dashPeriod)
          uniforms.uDashLevel.value[slot] = clamp(Math.log2(count), 5, 15)
        }
      }
    }
  }

  updateGlints(dt) {
    const u = this.glintUniforms
    u.uOpacity.value = damp(u.uOpacity.value, this.glintTarget, 6, dt)
    this.glints.visible = u.uOpacity.value > 0.01
    if (!this.glints.visible) return
    this.renderer.getDrawingBufferSize(this.viewport)
    u.uViewportHeight.value = this.viewport.y
    u.uPixelRatio.value = this.renderer.getPixelRatio()
    // world = frame offset + heliocentric position (the Moon and home live in group space)
    const frame = this.system.frame
    const array = this.glintPositions.array
    const bodies = this.glintBodies
    for (let i = 0; i < bodies.length; i++) {
      const object = bodies[i].object3D
      const offset = object.parent === frame ? frame.position : null
      array[i * 3] = object.position.x + (offset?.x ?? 0)
      array[i * 3 + 1] = object.position.y + (offset?.y ?? 0)
      array[i * 3 + 2] = object.position.z + (offset?.z ?? 0)
    }
    this.glintPositions.needsUpdate = true
  }

  // Frees every geometry, material and texture created here (and the bakes).
  dispose() {
    const geometries = new Set()
    for (const object of this.objects) {
      object.removeFromParent()
      geometries.add(object.geometry)
      object.material.dispose()
    }
    for (const geometry of geometries) geometry.dispose()
    for (const geometry of this.geometries.values()) geometry.dispose()
    for (const texture of this.textures) texture.dispose()
    this.objects.length = 0
    this.textures.length = 0
    this.geometries.clear()
    this.fades.length = 0
    this.orbitLines.length = 0
    this.baker.dispose()
  }

  // Bake timings, texture sizes and the queue length, for QA.
  stats() {
    return { pending: this.baker.pending, bakes: this.baker.stats }
  }
}

// Distance from `point` to the nearest of a flat list of xyz positions.
function nearestDistance(xyz, point) {
  let best = Infinity
  for (let i = 0; i < xyz.length; i += 3) {
    const dx = xyz[i] - point.x
    const dy = xyz[i + 1] - point.y
    const dz = xyz[i + 2] - point.z
    best = Math.min(best, dx * dx + dy * dy + dz * dz)
  }
  return Math.sqrt(best)
}

// Small worlds get a generous target so they can still be tapped.
function pickRadius(body) {
  if (body.id === 'home') return body.radius
  if (body.id === 'sun') return body.radius * 1.08
  if (body.def.rings?.style === 'saturn') return body.def.rings.outer * 0.85
  if (body.radius < 3) return Math.max(body.radius * 2.4, body.radius + 1.6)
  return body.radius * 1.15
}

export async function createPlanetVisuals({ renderer, coarse = false, profile = false }) {
  return new PlanetVisuals({ renderer, coarse, profile })
}
