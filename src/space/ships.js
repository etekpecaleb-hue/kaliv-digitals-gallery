// Spacecraft around home: a shuttle in low orbit, a courier running loops to
// the Moon, a cruiser on a long haul home → Mars → Jupiter → home and a ring
// station orbiting the Moon. All of them move on real time (not the sim
// clock), carry blinking nav lights and engine glows (one shared Points draw)
// and, except the station, leave a fading trail.
//
// ships.list = [{ id, name, object3D, radius }] for a camera to follow.
import { Group, Matrix4, Mesh, Vector3 } from 'three'
import { clamp, damp } from '../core/math.js'
import { GlowPoints, Trail, updateScreen } from './effects-ribbon.js'
import { buildCourier, buildCruiser, buildShuttle, buildStation, createHullMaterial } from './ships-models.js'
import { LoopPath, orient } from './ships-path.js'

const TAU = Math.PI * 2
const DEG = Math.PI / 180
const UP = new Vector3(0, 1, 0)

const smoothstep = (edge0, edge1, x) => {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1)
  return t * t * (3 - 2 * t)
}

// Position of a body relative to system.group. The frame chain only ever
// translates, so summing positions is exact and never a frame stale.
function bodyPosition(body, root, target) {
  target.set(0, 0, 0)
  for (let o = body.object3D; o && o !== root; o = o.parent) target.add(o.position)
  return target
}

class Craft {
  throttle = 1
  forward = new Vector3(0, 0, 1)
  bank = 0

  constructor(id, name, model, material, parent) {
    this.id = id
    this.name = name
    this.object3D = new Group()
    this.object3D.name = id
    this.mesh = new Mesh(model.geometry, material)
    this.object3D.add(this.mesh)
    this.radius = model.radius
    this.anchors = [{ object: this.mesh, lights: model.lights }]
    parent.add(this.object3D)
  }
}

// Steers a craft's nose along `tangent`, banking into turns.
const turnAxis = new Vector3()
function steer(craft, tangent, up, dt, { rate = 5, bankGain = 0.9, maxBank = 0.6 } = {}) {
  const previous = turnAxis.copy(craft.forward)
  craft.forward.lerp(tangent, 1 - Math.exp(-rate * dt)).normalize()
  const yaw = dt > 0 ? previous.cross(craft.forward).dot(up) / dt : 0
  craft.bank = damp(craft.bank, clamp(-yaw * bankGain, -maxBank, maxBank), 2.5, dt)
  orient(craft.object3D.quaternion, craft.forward, up, craft.bank)
}

export class Ships {
  list = []

  constructor(system) {
    this.system = system
    system.ships = this
    this.group = new Group()
    this.group.name = 'spacecraft'
    system.group.add(this.group)
    this.material = createHullMaterial()
    this.tmp = new Vector3()
    this.tmp2 = new Vector3()
    this.tangent = new Vector3()

    this.buildShuttle()
    this.buildCourier()
    this.buildCruiser()
    this.buildStation()
    this.buildLights()
    this.update(0, 0, system.ctx)
  }

  add(craft) {
    this.list.push(craft)
    return craft
  }

  // ---------------------------------------------------------------- shuttle

  buildShuttle() {
    this.shuttle = this.add(new Craft('shuttle', 'Shuttle', buildShuttle(), this.material, this.group))
    this.shuttle.orbit = { a: 12.5, e: 0.12, inc: 28 * DEG, node: 35 * DEG, period: 70, phase: 1.1 }
    this.shuttle.trail = new Trail({
      count: 44,
      duration: 5.5,
      color: '#b9d6ff',
      colorTail: '#2f7bff',
      opacity: 0.45,
      widthHead: 0.018,
      widthTail: 0.007,
      minPx: 1.1,
      fade: 1.2,
      headFade: 0.12,
    })
    this.group.add(this.shuttle.trail.mesh)
  }

  shuttleAt(time, target) {
    const { a, e, inc, node, period, phase } = this.shuttle.orbit
    const M = phase + (TAU * time) / period
    const theta = M + 2 * e * Math.sin(M)
    const r = (a * (1 - e * e)) / (1 + e * Math.cos(theta))
    const x = r * Math.cos(theta)
    const z = r * Math.sin(theta)
    const y = z * Math.sin(inc)
    const flat = z * Math.cos(inc)
    return target.set(x * Math.cos(node) - flat * Math.sin(node), y, x * Math.sin(node) + flat * Math.cos(node))
  }

  updateShuttle(time, dt) {
    const craft = this.shuttle
    const position = this.shuttleAt(time, craft.object3D.position)
    this.shuttleAt(time + 0.05, this.tangent).sub(position).normalize()
    const up = this.tmp.copy(position).normalize()
    steer(craft, this.tangent, up, dt || 1, { rate: 50, bankGain: 0 })
    craft.throttle = 0.8
    this.trailFrom(craft, craft.trail, dt)
  }

  // ---------------------------------------------------------------- courier

  // The loop lives in a frame centred on home whose +X points at the Moon
  // and whose +Y is the Moon's orbit normal, so it swings round with it.
  buildCourier() {
    this.courierFrame = new Group()
    this.courierFrame.name = 'courier-frame'
    this.group.add(this.courierFrame)
    this.courier = this.add(new Craft('courier', 'Courier', buildCourier(), this.material, this.courierFrame))
    // [x as fraction of the Moon distance or offset beyond it, y, z]
    this.courierShape = [
      [0, 4, 0.8, 7.4],
      [1, -4.6, 0.6, 3.8],
      [1, 2.2, 0.3, 4.4],
      [1, 4.8, 0, 0],
      [1, 2.2, -0.3, -4.4],
      [1, -4.6, -0.6, -3.8],
      [0, 4, -0.8, -7.4],
      [0, -5.2, -0.5, -6.6],
      [0, -8.6, 0, 0],
      [0, -5.2, 0.5, 6.6],
    ]
    this.courierPoints = this.courierShape.map(() => new Vector3())
    this.moonDistance = 22
    this.courierPath = new LoopPath(this.courierPoints, {
      samples: 14,
      speedAt: (x, y, z) => {
        const home = Math.hypot(x, y, z) - 5
        const moon = Math.hypot(x - this.moonDistance, y, z) - 1.4
        return 0.45 + 1.1 * smoothstep(1.5, 8, Math.min(home, moon))
      },
    })
    this.courier.place = 0.3
    this.courier.pace = 1
    this.courier.trail = new Trail({
      count: 40,
      duration: 3.2,
      color: '#9ff6ff',
      colorTail: '#2f7bff',
      opacity: 0.42,
      widthHead: 0.02,
      widthTail: 0.007,
      minPx: 1.1,
      fade: 1.2,
      headFade: 0.16,
    })
    this.courierFrame.add(this.courier.trail.mesh)

    // The Moon's orbit normal: ecliptic (sin i sin node, -sin i cos node, cos i)
    // in the scene's (x, z, -y) mapping.
    const { i, node } = this.system.moon.def.orbit
    this.moonNormal = new Vector3(
      Math.sin(i * DEG) * Math.sin(node * DEG),
      Math.cos(i * DEG),
      Math.sin(i * DEG) * Math.cos(node * DEG),
    ).normalize()
    this.basis = new Matrix4()
  }

  updateCourier(time, dt) {
    const moon = bodyPosition(this.system.moon, this.system.group, this.tmp)
    const distance = moon.length()
    this.moonDistance = distance
    const x = moon.divideScalar(distance)
    const y = this.tmp2.copy(this.moonNormal)
    y.addScaledVector(x, -y.dot(x)).normalize()
    const z = this.tangent.crossVectors(x, y)
    this.courierFrame.quaternion.setFromRotationMatrix(this.basis.makeBasis(x, y, z))
    this.courierShape.forEach(([anchor, px, py, pz], i) => {
      this.courierPoints[i].set(anchor * distance + px, py, pz)
    })
    this.courierPath.rebuild()
    this.moveAlong(this.courier, this.courierPath, 60, dt, UP, { rate: 4, bankGain: 0.8, maxBank: 0.7 })
    this.trailFrom(this.courier, this.courier.trail, dt)
  }

  // ---------------------------------------------------------------- cruiser

  buildCruiser() {
    this.cruiser = this.add(new Craft('cruiser', 'Cruiser', buildCruiser(), this.material, this.group))
    const { system } = this
    this.route = [system.home, system.bodyById('mars'), system.bodyById('jupiter')]
    // How far out the cruiser swings round each stop.
    this.routeClearance = [34, 13, 60]
    this.routeAt = this.route.map(() => new Vector3())
    this.cruiserPoints = Array.from({ length: this.route.length * 4 }, () => new Vector3())
    this.cruiserPath = new LoopPath(this.cruiserPoints, {
      samples: 16,
      speedAt: (x, y, z) => {
        let clearance = Infinity
        for (let i = 0; i < this.route.length; i++) {
          const p = this.routeAt[i]
          const d = Math.hypot(x - p.x, y - p.y, z - p.z) - this.route[i].radius
          clearance = Math.min(clearance, d)
        }
        // Crawl near worlds, open the throttle in deep space.
        return 0.12 + 1.9 * smoothstep(10, 260, clearance)
      },
    })
    this.cruiser.place = 2.6
    this.cruiser.pace = 1
    this.cruiser.trail = new Trail({
      count: 64,
      duration: 7,
      color: '#cfe0ff',
      colorTail: '#3d6dff',
      opacity: 0.5,
      widthHead: 0.16,
      widthTail: 0.05,
      minPx: 1.3,
      energyFloor: 0.35,
      fade: 1.2,
      headFade: 0.1,
    })
    this.group.add(this.cruiser.trail.mesh)
    this.legDir = [new Vector3(), new Vector3()]
    this.swing = { u: new Vector3(), w: new Vector3(), n: new Vector3() }
  }

  // Around each stop B (arriving from A, leaving for C): entry, apex and exit
  // points on a circle of radius r, like a gravity-assist swing-by; then a
  // lifted mid-course point towards the next stop.
  layCruiserRoute() {
    const { route, routeAt, routeClearance, cruiserPoints } = this
    const n = route.length
    for (let i = 0; i < n; i++) bodyPosition(route[i], this.system.group, routeAt[i])
    const [into, out] = this.legDir
    const { u, w, n: normal } = this.swing
    for (let i = 0; i < n; i++) {
      const a = routeAt[(i - 1 + n) % n]
      const b = routeAt[i]
      const c = routeAt[(i + 1) % n]
      const r = routeClearance[i]
      into.subVectors(b, a).normalize()
      out.subVectors(c, b).normalize()
      normal.crossVectors(into, out)
      if (normal.lengthSq() < 1e-6) normal.copy(UP)
      normal.normalize()
      u.subVectors(into, out)
      if (u.lengthSq() < 1e-4) u.crossVectors(into, normal)
      u.normalize()
      w.addVectors(into, out)
      if (w.lengthSq() < 1e-4) w.crossVectors(normal, u)
      w.normalize()
      const turn = (1 - into.dot(out)) / 2
      const alpha = (50 + 50 * turn) * DEG
      const base = i * 4
      cruiserPoints[base].copy(b).addScaledVector(u, r * Math.cos(alpha)).addScaledVector(w, -r * Math.sin(alpha))
      cruiserPoints[base + 1].copy(b).addScaledVector(u, r)
      cruiserPoints[base + 2].copy(b).addScaledVector(u, r * Math.cos(alpha)).addScaledVector(w, r * Math.sin(alpha))
      const mid = cruiserPoints[base + 3]
      mid.addVectors(b, c).multiplyScalar(0.5)
      mid.y += (i % 2 ? -1 : 1) * 0.07 * b.distanceTo(c)
    }
  }

  updateCruiser(dt) {
    this.layCruiserRoute()
    this.cruiserPath.rebuild()
    this.moveAlong(this.cruiser, this.cruiserPath, 360, dt, UP, { rate: 2.5, bankGain: 2.5, maxBank: 0.5 })
    this.trailFrom(this.cruiser, this.cruiser.trail, dt)
  }

  // Advances a craft along a loop so one lap takes about `lapSeconds`.
  moveAlong(craft, path, lapSeconds, dt, up, steering) {
    const pace = path.lapTime / lapSeconds
    craft.pace = dt > 0 ? damp(craft.pace, pace, 1.5, dt) : pace
    const relative = path.locate(craft.place, craft.object3D.position)
    craft.throttle = clamp(relative / 1.2, 0.3, 1)
    craft.place = path.advance(craft.place, relative * craft.pace * dt)
    path.locate(path.advance(craft.place, craft.radius * 1.5), this.tangent)
    this.tangent.sub(craft.object3D.position)
    if (this.tangent.lengthSq() > 1e-10) this.tangent.normalize()
    else this.tangent.copy(craft.forward)
    steer(craft, this.tangent, up, dt || 1, steering)
  }

  // ---------------------------------------------------------------- station

  buildStation() {
    const model = buildStation()
    const craft = this.add(new Craft('station', 'Station', model.core, this.material, this.group))
    craft.ring = new Mesh(model.ring.geometry, this.material)
    craft.object3D.add(craft.ring)
    craft.anchors.push({ object: craft.ring, lights: model.ring.lights })
    craft.radius = Math.max(model.core.radius, model.ring.radius)
    craft.orbit = { radius: 3.1, inc: 58 * DEG, node: 20 * DEG, period: 50, phase: 0.4 }
    craft.axis = new Vector3(0.28, 1, -0.16).normalize()
    this.station = craft
  }

  updateStation(time) {
    const craft = this.station
    const { radius, inc, node, period, phase } = craft.orbit
    const angle = phase + (TAU * time) / period
    const x = radius * Math.cos(angle)
    const z = radius * Math.sin(angle)
    const p = craft.object3D.position
    p.set(x * Math.cos(node) - z * Math.cos(inc) * Math.sin(node), z * Math.sin(inc), x * Math.sin(node) + z * Math.cos(inc) * Math.cos(node))
    p.add(bodyPosition(this.system.moon, this.system.group, this.tmp))
    // Turn about the axis so the solar wings face the Sun.
    const sun = this.tmp.copy(this.system.sunPosition).sub(p).normalize()
    sun.addScaledVector(craft.axis, -sun.dot(craft.axis))
    if (sun.lengthSq() < 1e-8) sun.set(1, 0, 0)
    orient(craft.object3D.quaternion, sun.normalize(), craft.axis, 0)
    craft.ring.rotation.y = (time * TAU) / 34
    craft.throttle = 0.6
  }

  // ---------------------------------------------------------------- lights

  buildLights() {
    let count = 0
    for (const craft of this.list) for (const anchor of craft.anchors) count += anchor.lights.length
    this.glows = new GlowPoints(count, { minPx: 1.6, maxPx: 150 })
    let i = 0
    for (const craft of this.list) {
      for (const anchor of craft.anchors) {
        for (const light of anchor.lights) {
          light.index = i
          // Stagger blink phases a little per craft so they don't pulse in sync.
          const blink = light.blink.slice()
          if (blink[0] > 0) blink[1] = (blink[1] + this.list.indexOf(craft) * 0.37) % 1
          this.glows.define(i, { color: light.color, size: light.size, intensity: light.engine ? 1 : 1.2, blink })
          i++
        }
      }
    }
    this.group.add(this.glows.points)
  }

  updateLights(time) {
    const glows = this.glows
    const p = this.tmp
    for (const craft of this.list) {
      craft.object3D.updateWorldMatrix(true, true)
      for (const anchor of craft.anchors) {
        for (const light of anchor.lights) {
          p.copy(light.offset).applyMatrix4(anchor.object.matrixWorld)
          glows.setPosition(light.index, p)
          if (light.engine) {
            const flicker = 0.88 + 0.12 * Math.sin(time * 41 + light.index * 2.3) * Math.sin(time * 17 + light.index)
            glows.intensities[light.index] = (0.45 + 0.75 * craft.throttle) * flicker
          }
        }
      }
    }
    glows.material.uniforms.uTime.value = time
    glows.commit()
  }

  // Feeds a trail from the craft's tail; every trail shares its craft's
  // parent frame, so the parent-space position is what it needs.
  trailFrom(craft, trail, dt) {
    const tail = this.tmp2.set(0, 0, -craft.radius * 0.85)
    tail.applyQuaternion(craft.object3D.quaternion).add(craft.object3D.position)
    trail.update(tail, dt)
  }

  update(time, dt, ctx) {
    if (ctx?.camera) updateScreen(this.system.renderer, ctx.camera)
    this.updateShuttle(time, dt)
    this.updateCourier(time, dt)
    this.updateCruiser(dt)
    this.updateStation(time)
    this.updateLights(time)
    for (const craft of this.list) if (craft.trail) craft.trail.material.uniforms.uTime.value = time
  }

  dispose() {
    this.group.removeFromParent()
    for (const craft of this.list) {
      for (const anchor of craft.anchors) anchor.object.geometry.dispose()
      craft.trail?.dispose()
    }
    this.glows.dispose()
    this.material.dispose()
    if (this.system.ships === this) this.system.ships = null
  }
}
