// The solar system around the photo globe.
//
// The globe never moves: everything is computed heliocentrically and then
// shifted by -H(t), the home slot's heliocentric position, so the Sun circles
// the gallery once a year instead of the other way round. `frame` holds every
// heliocentric object and is moved each update; the Moon and anything else
// that orbits home lives directly in `group`.
//
// Contract used by belts.js, ships.js, effects.js, the explorer camera and the UI:
//   system.group / system.frame        THREE.Group roots
//   system.bodies, sun, home, moon, worlds   Body records (see makeBody)
//   system.bodyById(id), worldPosition(body, target)
//   system.sunPosition                 Vector3, world space, updated each frame
//   system.timeScale, setTimeScale(s), years (sim years since J2000)
//   system.addSystem(sub)              sub.update(time, dt, ctx) runs every frame
//   system.ctx                         { years, dtYears, timeScale, spinDt, sunPosition,
//                                        camera, coarse, reduced, time, dt }
//   system.setOrbitsVisible(visible)
import { Group, Mesh, MeshStandardMaterial, PointLight, AmbientLight, SphereGeometry, Vector3 } from 'three'
import { SUN, HOME, MOON, WORLDS, SECONDS_PER_YEAR } from '../data/worlds.js'
import { orbitPosition, rotationSeconds, yearsSinceJ2000 } from './orbits.js'

const TAU = Math.PI * 2
const DEG = Math.PI / 180

function makeBody(def, object3D, extra = {}) {
  return {
    id: def.id,
    name: def.name,
    kind: def.kind,
    def,
    radius: def.radius,
    facts: def.facts,
    color: def.color,
    object3D,
    spin: null,
    mesh: null,
    pickRadius: Math.max(def.radius * 1.15, 1.6),
    spinSeconds: rotationSeconds(def.rotationHours),
    ...extra,
  }
}

// Placeholder look until planets.js provides the real one.
function placeholderMesh(def) {
  const geometry = new SphereGeometry(def.radius, 48, 24)
  const material = new MeshStandardMaterial({ color: def.color, roughness: 1, metalness: 0 })
  const mesh = new Mesh(geometry, material)
  if (def.shape) mesh.scale.set(...def.shape)
  return mesh
}

export class SolarSystem {
  group = new Group()
  frame = new Group()
  bodies = []
  worlds = []
  systems = []
  sunPosition = new Vector3()
  timeScale = 1
  years
  ctx

  constructor({ scene, renderer, camera, coarse = false, reduced = false, now = Date.now(), visuals = null }) {
    this.renderer = renderer
    this.camera = camera
    this.coarse = coarse
    this.reduced = reduced
    this.years = yearsSinceJ2000(now)
    this.visuals = visuals
    this.group.name = 'solar-system'
    this.frame.name = 'heliocentric-frame'
    this.group.add(this.frame)
    scene.add(this.group)

    this.sunLight = new PointLight('#fff4e0', 3.2, 0, 0)
    this.ambient = new AmbientLight('#6f86b8', 0.08)
    this.group.add(this.ambient)

    this.sun = this.addBody(SUN, this.frame)
    this.sun.object3D.add(this.sunLight)
    this.home = makeBody(HOME, new Group())
    this.home.pickRadius = HOME.radius
    this.group.add(this.home.object3D)
    this.bodies.push(this.home)
    this.moon = this.addBody(MOON, this.group)
    for (const def of WORLDS) this.worlds.push(this.addBody(def, this.frame))

    this.ctx = {
      years: this.years,
      dtYears: 0,
      timeScale: this.timeScale,
      spinDt: 0,
      sunPosition: this.sunPosition,
      camera,
      coarse,
      reduced,
      time: 0,
      dt: 0,
    }
    this.update(0, 0)
  }

  // Creates the object hierarchy for one body: root (orbit position) > tilt > spin > mesh.
  addBody(def, parent) {
    const root = new Group()
    root.name = def.id
    const tilt = new Group()
    tilt.rotation.z = (def.tilt ?? 0) * DEG
    const spin = new Group()
    tilt.add(spin)
    root.add(tilt)
    parent.add(root)
    const body = makeBody(def, root)
    body.tilt = tilt
    body.spin = spin
    const visual = this.visuals?.createBody?.(def, { coarse: this.coarse, renderer: this.renderer }) ?? {
      mesh: placeholderMesh(def),
    }
    spin.add(visual.mesh)
    if (visual.extras) for (const extra of visual.extras) tilt.add(extra)
    body.mesh = visual.mesh
    body.visual = visual
    this.bodies.push(body)
    return body
  }

  bodyById(id) {
    return this.bodies.find((b) => b.id === id) ?? null
  }

  worldPosition(body, target) {
    return body.object3D.getWorldPosition(target)
  }

  setTimeScale(scale) {
    this.timeScale = scale
  }

  addSystem(system) {
    this.systems.push(system)
    return system
  }

  setOrbitsVisible(visible) {
    this.visuals?.setOrbitsVisible?.(visible)
  }

  update(time, dt) {
    const scale = this.reduced ? Math.min(this.timeScale, 1) : this.timeScale
    const dtYears = (dt * scale) / SECONDS_PER_YEAR
    this.years += dtYears
    // Rotations speed up with time scale too, but gently so nothing strobes.
    const spinDt = dt * (scale <= 1 ? scale : Math.sqrt(scale) * 2)

    const home = orbitPosition(HOME.orbit, this.years, this.frame.position)
    home.multiplyScalar(-1)
    this.sunPosition.copy(this.frame.position)

    for (const body of this.bodies) {
      const { def } = body
      if (def.orbit && body !== this.home) orbitPosition(def.orbit, this.years, body.object3D.position)
      if (body.spin && body.spinSeconds) body.spin.rotation.y += (spinDt / body.spinSeconds) * TAU
    }
    // The Moon is tidally locked: keep its spin facing home.
    if (this.moon.spin) this.moon.spin.rotation.y = Math.atan2(this.moon.object3D.position.x, this.moon.object3D.position.z) + Math.PI

    const ctx = this.ctx
    ctx.years = this.years
    ctx.dtYears = dtYears
    ctx.timeScale = scale
    ctx.spinDt = spinDt
    ctx.time = time
    ctx.dt = dt
    this.visuals?.update?.(time, dt, ctx, this)
    for (const system of this.systems) system.update(time, dt, ctx)
  }
}
