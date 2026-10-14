// The explorer camera. It orbits whatever it is focused on (the photo globe
// at home, any world, a ship), flies between focuses, rides along with them
// as they orbit, and free-flies. It owns the canvas's pointer, wheel and
// flight-key input and drives the stage camera; taps are handed to `onTap`
// so the app can route them (globe panels first near home, then worlds).
//
// Orbit pose, the convention the globe relies on: the camera sits at
//   focus + R·(swayX, swayY, distance), up R·(0, 1, 0), R = Ry(-yaw)·Rx(-pitch),
// looking at the focus. With the globe unrotated that is exactly the old
// view of a globe spun by (pitch, yaw), so rowLayout.viewFor(lat, lon) still
// brings lat/lon to the front (pitch = lat, yaw = -lon).
//
//   const explorer = new Explorer({ stage, system, globe, reduced, isBlocked, onTap })
//   explorer.update(time, dt)            every frame, after system.update()
//   explorer.flyTo(target) / goHome()    -> Promise<boolean> (false if interrupted)
//   explorer.lookAtLatLon(lat, lon, { distance, duration }) -> Promise (home only)
//   explorer.enterFly() / exitFly() / toggleFly()
//   explorer.pick(x, y) -> body | ship | null, explorer.toScreen(position, out)
//   explorer.onFocusChange(fn), onTravel(fn(phase, target)), onModeChange(fn)
// A target is a body from system.bodies or a ships.list entry: anything with
// { id, name, object3D, radius }.
import { Euler, MathUtils, Quaternion, Vector3 } from 'three'
import { gsap } from 'gsap'
import { clamp, damp, lerp } from '../core/math.js'
import { viewFor } from '../gallery/rowLayout.js'

export const REST_PITCH = 0.22
export const PITCH_LIMIT = 1.25
// Inside this range of home the gallery's panels can be hovered and picked
// and the HUD reads like the globe's.
export const HOME_NEAR = 45
export const MAX_DISTANCE = 6000
const DRAG_SPEED = 0.0052
const LOOK_SPEED = 0.0036
const FLY_PITCH_LIMIT = 1.45
const TAP_MS = 600
const TAP_SLOP = 6
const NEAR_MIN = 0.02
const NEAR_MAX = 20
const FAR = 24000
const FLY_SPEED_MIN = 1.5
const FLY_SPEED_MAX = 900
const BOOST = 4
// how far free flight may stray from home
const FLY_BOUND = 9000
// Arrival on the lit side: this far round from the Sun direction (40°) and
// this far above the orbit plane (14°), so worlds read as lit gibbous discs.
const LIT_YAW = 0.7
const LIT_PITCH = 0.24
const TAU = Math.PI * 2

const easeTravel = gsap.parseEase('power2.inOut')
const easeBlend = gsap.parseEase('power2.inOut')
const smooth = (t) => t * t * (3 - 2 * t)

const euler = new Euler(0, 0, 0, 'YXZ')
const offset = new Vector3()
const start = new Vector3()
const end = new Vector3()
const move = new Vector3()
const toBody = new Vector3()
const inView = new Vector3()
const blendTo = new Quaternion()
const angles = { yaw: 0, pitch: 0 }

// Orbit angles of a camera placed along the unit vector `direction`.
function anglesOf(direction, out) {
  out.pitch = Math.asin(clamp(direction.y, -1, 1))
  out.yaw = Math.atan2(-direction.x, direction.z)
  return out
}

// `angle` shifted by whole turns to lie nearest `reference`.
function nearestAngle(angle, reference) {
  return angle + Math.round((reference - angle) / TAU) * TAU
}

export class Explorer {
  // 'orbit' | 'fly'
  mode = 'orbit'
  focus
  // the intro parks the camera at z = 60 along the resting tilt
  view = { yaw: 0, pitch: REST_PITCH, distance: 60 }
  goal = { yaw: 0, pitch: REST_PITCH, distance: 60 }
  velocity = { yaw: 0, pitch: 0 }
  // the focus's live world position: the orbit pivot
  center = new Vector3()
  // R, the orbit rotation (the globe's blueprint rings ride on it)
  orbitQuaternion = new Quaternion()
  parallax = { x: 0, y: 0, tx: 0, ty: 0 }
  sway = 1
  // camera input is off until the intro hands over
  enabled = false
  focusing = false
  idleDrift = true
  lastInput = 0
  travel = null
  // orientation blend after leaving free flight or an interrupted flight
  blend = { active: false, t: 0, duration: 0.9, from: new Quaternion() }
  fly = { yaw: 0, pitch: 0, goalYaw: 0, goalPitch: 0, velocity: new Vector3(), speed: 0 }
  // flight input: keys (0/1) and the touch joystick / lift buttons (-1..1)
  keys = { forward: 0, back: 0, left: 0, right: 0, up: 0, down: 0, boost: 0 }
  input = { x: 0, y: 0, lift: 0 }
  pointers = new Map()
  drag = { active: false, moved: false, startX: 0, startY: 0, lastX: 0, lastY: 0, lastT: 0, downT: 0 }
  pinch = { distance: 0, goal: 0, power: 1 }
  // the mouse position over the canvas (for hover), valid while `hovering`
  hoverPoint = { x: 0, y: 0 }
  hovering = false
  // nearest solid surface to the camera, refreshed every frame
  nearest = { body: null, surface: Infinity }
  // CSS px the focus is lifted by (camera view offset), e.g. above a bottom card
  viewShift = 0
  viewShiftGoal = 0
  listeners = { focus: new Set(), travel: new Set(), mode: new Set() }
  centerOut = { lat: 0, lon: 0 }
  homeFit = 18

  // options: { stage, system, globe, reduced, isBlocked() -> bool, onTap(x, y, event) }
  constructor({ stage, system, globe, reduced = false, isBlocked = () => false, onTap = null }) {
    this.stage = stage
    this.camera = stage.camera
    this.canvas = stage.canvas
    this.system = system
    this.globe = globe
    this.reduced = reduced
    this.isBlocked = isBlocked
    this.onTap = onTap
    this.focus = system.home
    this.bodyIndex = new Map(system.bodies.map((body, index) => [body, index]))
    this.bodyPositions = system.bodies.map(() => new Vector3())
    // radius nothing may enter (Haumea is an ellipsoid; Saturn's rings are not solid)
    this.solidRadii = system.bodies.map((body) => body.radius * Math.max(1, ...(body.def?.shape ?? [1])))
    this.homeFit = globe.restDistance
    this.camera.far = FAR
    this.bindInput()
    stage.onResize(() => this.onResize())
  }

  // ------------------------------------------------------------------ events

  onFocusChange(listener) {
    this.listeners.focus.add(listener)
    return () => this.listeners.focus.delete(listener)
  }

  onTravel(listener) {
    this.listeners.travel.add(listener)
    return () => this.listeners.travel.delete(listener)
  }

  onModeChange(listener) {
    this.listeners.mode.add(listener)
    return () => this.listeners.mode.delete(listener)
  }

  emit(type, ...args) {
    for (const listener of this.listeners[type]) listener(...args)
  }

  setFocus(target) {
    if (target === this.focus) return
    this.focus = target
    this.emit('focus', target)
  }

  // ------------------------------------------------------------------ queries

  get home() {
    return this.system.home
  }

  get traveling() {
    return this.travel !== null
  }

  // True at home, in orbit mode, close enough to work with the photo panels.
  get atHome() {
    return this.mode === 'orbit' && !this.travel && this.focus === this.system.home && this.view.distance < HOME_NEAR
  }

  // Did the last pointer interaction move (a drag rather than a tap)?
  get dragging() {
    return this.drag.active && this.drag.moved
  }

  // World position of a body or ship, written into `out` (bodies come from
  // this frame's cache).
  positionOf(target, out) {
    const index = this.bodyIndex.get(target)
    if (index !== undefined) return out.copy(this.bodyPositions[index])
    return target.object3D.getWorldPosition(out)
  }

  solidRadius(target) {
    const index = this.bodyIndex.get(target)
    return index === undefined ? target.radius : this.solidRadii[index]
  }

  // How big a target looks from its resting distance (Saturn with its rings).
  extentOf(target) {
    if (target.def?.rings?.style === 'saturn') return target.def.rings.outer * 0.86
    if (!target.def) return target.radius * 1.6
    return this.solidRadius(target)
  }

  // Resting distance for a target: like the globe's fit (the body fills the
  // narrow side of the screen with a margin), a little closer for worlds.
  restDistanceOf(target) {
    if (target === this.system.home) return this.globe.restDistance
    const camera = this.camera
    const tanHalf = Math.tan(MathUtils.degToRad(camera.fov / 2))
    const aspect = camera.aspect
    const fill = aspect < 1 ? 1 : 0.84
    const fit = (this.extentOf(target) * 1.12) / (fill * tanHalf * Math.min(1, aspect))
    const scale = target === this.system.sun ? 1.3 : 0.88
    return Math.max(fit * scale, this.minDistanceOf(target) * 1.4)
  }

  minDistanceOf(target) {
    if (target === this.system.home) return this.globe.minDistance
    if (!target.def) return Math.max(target.radius * 2.2, 0.6)
    if (target.def.rings?.style === 'saturn') return target.radius * 1.35
    return this.solidRadius(target) * 1.25
  }

  // Drag speed and parallax scale with the focus: 1 at its resting distance.
  scaleOf(target) {
    return this.restDistanceOf(target) / this.homeFit
  }

  // { lat, lon } of the globe point facing the camera (home only).
  viewCenter() {
    this.centerOut.lat = this.view.pitch
    this.centerOut.lon = -this.view.yaw
    return this.centerOut
  }

  // Distance from the camera to the focus's centre.
  get focusDistance() {
    return this.camera.position.distanceTo(this.center)
  }

  // Projects a world position to CSS pixels into `out` ({ x, y }); returns
  // the view depth (≤ 0 when it is behind the camera).
  toScreen(position, out) {
    const camera = this.camera
    inView.copy(position).applyMatrix4(camera.matrixWorldInverse)
    const depth = -inView.z
    const halfHeight = this.stage.height / 2
    const focal = halfHeight / Math.tan(MathUtils.degToRad(camera.fov / 2))
    if (depth > 1e-6) {
      out.x = (inView.x / depth) * focal + this.stage.width / 2
      out.y = (-inView.y / depth) * focal + halfHeight - this.viewShift
    }
    return depth
  }

  // Pixels per world unit at view depth 1 (for projected radii).
  get focalPx() {
    return this.stage.height / 2 / Math.tan(MathUtils.degToRad(this.camera.fov / 2))
  }

  // The body or ship under a screen point: centres projected, hit radius =
  // max(projected pick radius, 22 px), nearest to the camera wins.
  pick(x, y) {
    const camera = this.camera
    const focal = this.focalPx
    const screen = this.pickScreen
    let best = null
    let bestDepth = Infinity
    const bodies = this.system.bodies
    for (let i = 0; i < bodies.length; i++) {
      const depth = this.toScreen(this.bodyPositions[i], screen)
      if (depth <= camera.near) continue
      const radius = Math.max((bodies[i].pickRadius / depth) * focal, 22)
      const dx = screen.x - x
      const dy = screen.y - y
      if (dx * dx + dy * dy <= radius * radius && depth < bestDepth) {
        best = bodies[i]
        bestDepth = depth
      }
    }
    const ships = this.system.ships?.list ?? []
    for (let i = 0; i < ships.length; i++) {
      const depth = this.toScreen(ships[i].object3D.getWorldPosition(start), screen)
      if (depth <= camera.near) continue
      const radius = Math.max((ships[i].radius * 3 * focal) / depth, 22)
      const dx = screen.x - x
      const dy = screen.y - y
      if (dx * dx + dy * dy <= radius * radius && depth < bestDepth) {
        best = ships[i]
        bestDepth = depth
      }
    }
    return best
  }

  pickScreen = { x: 0, y: 0 }

  // Nearest solid surface to `position` (bodies and ships), into this.nearest.
  updateNearest(position) {
    let best = null
    let surface = Infinity
    const bodies = this.system.bodies
    for (let i = 0; i < bodies.length; i++) {
      const d = position.distanceTo(this.bodyPositions[i]) - this.solidRadii[i]
      if (d < surface) {
        surface = d
        best = bodies[i]
      }
    }
    const ships = this.system.ships?.list ?? []
    for (let i = 0; i < ships.length; i++) {
      const d = position.distanceTo(ships[i].object3D.getWorldPosition(start)) - ships[i].radius
      if (d < surface) surface = d
    }
    this.nearest.body = best
    this.nearest.surface = Math.max(surface, 0)
    return this.nearest
  }

  // ------------------------------------------------------------------ input

  bindInput() {
    const canvas = this.canvas
    canvas.addEventListener('pointerdown', this.onPointerDown)
    canvas.addEventListener('pointermove', this.onPointerMove)
    canvas.addEventListener('pointerup', this.onPointerEnd)
    canvas.addEventListener('pointercancel', this.onPointerEnd)
    canvas.addEventListener('pointerleave', (event) => {
      if (event.pointerType !== 'mouse') return
      this.hovering = false
      this.parallax.tx = this.parallax.ty = 0
    })
    addEventListener('wheel', this.onWheel, { passive: false })
    addEventListener('keydown', this.onKey)
    addEventListener('keyup', this.onKey)
    addEventListener('blur', () => this.releaseKeys())
  }

  get inputBlocked() {
    return !this.enabled || this.isBlocked()
  }

  onPointerDown = (event) => {
    if (this.inputBlocked) return
    this.canvas.setPointerCapture(event.pointerId)
    this.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY })
    this.lastInput = this.stage.time
    if (this.travel) this.interruptTravel()
    if (this.pointers.size === 1) {
      const drag = this.drag
      drag.active = true
      drag.moved = false
      drag.startX = drag.lastX = event.clientX
      drag.startY = drag.lastY = event.clientY
      drag.lastT = drag.downT = performance.now()
      this.velocity.yaw = this.velocity.pitch = 0
    } else if (this.pointers.size === 2 && this.mode === 'orbit') {
      const [a, b] = this.pointers.values()
      this.pinch.distance = Math.hypot(a.x - b.x, a.y - b.y)
      this.pinch.goal = this.goal.distance
      // pinches cover more ground out in space, exactly like the globe's at home
      this.pinch.power = 1 + 0.5 * smooth(clamp((this.goal.distance - 40) / 360, 0, 1))
      this.drag.moved = true
    }
  }

  onPointerMove = (event) => {
    if (event.pointerType === 'mouse') {
      this.hoverPoint.x = event.clientX
      this.hoverPoint.y = event.clientY
      this.hovering = true
      this.parallax.tx = (event.clientX / this.stage.width - 0.5) * 2
      this.parallax.ty = (event.clientY / this.stage.height - 0.5) * 2
    }
    const pointer = this.pointers.get(event.pointerId)
    if (!pointer || this.inputBlocked) return
    pointer.x = event.clientX
    pointer.y = event.clientY
    this.lastInput = this.stage.time

    if (this.pointers.size === 2) {
      if (this.mode !== 'orbit') return
      const [a, b] = this.pointers.values()
      const distance = Math.hypot(a.x - b.x, a.y - b.y)
      if (this.pinch.distance > 0 && distance > 0) {
        const ratio = (this.pinch.distance / distance) ** this.pinch.power
        this.goal.distance = this.clampDistance(this.pinch.goal * ratio)
      }
      return
    }

    const drag = this.drag
    if (!drag.active) return
    const now = performance.now()
    const dx = event.clientX - drag.lastX
    const dy = event.clientY - drag.lastY
    if (Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY) > TAP_SLOP) {
      drag.moved = true
      this.canvas.classList.add('is-dragging')
    }
    if (this.mode === 'fly') {
      this.fly.goalYaw -= dx * LOOK_SPEED
      this.fly.goalPitch = clamp(this.fly.goalPitch - dy * LOOK_SPEED, -FLY_PITCH_LIMIT, FLY_PITCH_LIMIT)
    } else {
      // drag feels the same at any zoom: slower when closer in (the globe's
      // formula), capped so it stays sensible far out in space
      const speed = DRAG_SPEED * clamp(this.view.distance / this.restDistanceOf(this.focus), 0.3, 1.7)
      this.goal.yaw += dx * speed
      this.goal.pitch = clamp(this.goal.pitch + dy * speed, -PITCH_LIMIT, PITCH_LIMIT)
      const dt = Math.max(1, now - drag.lastT) / 1000
      this.velocity.yaw = damp(this.velocity.yaw, (dx * speed) / dt, 18, dt)
      this.velocity.pitch = damp(this.velocity.pitch, (dy * speed) / dt, 18, dt)
    }
    drag.lastX = event.clientX
    drag.lastY = event.clientY
    drag.lastT = now
  }

  onPointerEnd = (event) => {
    if (!this.pointers.has(event.pointerId)) return
    this.pointers.delete(event.pointerId)
    const drag = this.drag
    if (this.pointers.size > 0) {
      // pinch ended: keep dragging with the remaining finger without a jump
      const [remaining] = this.pointers.values()
      drag.lastX = remaining.x
      drag.lastY = remaining.y
      return
    }
    this.canvas.classList.remove('is-dragging')
    const tap = !drag.moved && performance.now() - drag.downT < TAP_MS
    drag.active = false
    drag.moved = false
    // a drag that stopped before release shouldn't fling
    if (performance.now() - drag.lastT > 90 || this.reduced) this.velocity.yaw = this.velocity.pitch = 0
    if (tap && event.type === 'pointerup' && !this.inputBlocked) this.onTap?.(event.clientX, event.clientY, event)
  }

  onWheel = (event) => {
    if (this.inputBlocked || this.mode !== 'orbit') return
    if (event.target?.closest?.('.lightbox, .intro, .sheet, .info-card, .hud-top, .flight')) return
    event.preventDefault()
    if (this.travel) this.interruptTravel()
    const delta = event.deltaMode === 1 ? event.deltaY * 32 : event.deltaY
    this.zoomBy(Math.exp(clamp(delta, -200, 200) * 0.0012))
  }

  // Flight keys (WASD / arrows, Q/E, Shift), tracked on key down and up.
  onKey = (event) => {
    const down = event.type === 'keydown' ? 1 : 0
    if (down && (this.mode !== 'fly' || this.inputBlocked || event.metaKey || event.ctrlKey || event.altKey)) return
    if (down && event.target?.closest?.('input, textarea, select')) return
    const keys = this.keys
    let handled = true
    switch (event.code) {
      case 'KeyW':
      case 'ArrowUp':
        keys.forward = down
        break
      case 'KeyS':
      case 'ArrowDown':
        keys.back = down
        break
      case 'KeyA':
      case 'ArrowLeft':
        keys.left = down
        break
      case 'KeyD':
      case 'ArrowRight':
        keys.right = down
        break
      case 'KeyE':
      case 'PageUp':
        keys.up = down
        break
      case 'KeyQ':
      case 'PageDown':
        keys.down = down
        break
      case 'ShiftLeft':
      case 'ShiftRight':
        keys.boost = down
        break
      default:
        handled = false
    }
    if (handled && down) {
      event.preventDefault()
      this.lastInput = this.stage.time
    }
  }

  releaseKeys() {
    const keys = this.keys
    keys.forward = keys.back = keys.left = keys.right = keys.up = keys.down = keys.boost = 0
  }

  rotateBy(yaw, pitch) {
    if (this.mode !== 'orbit') return
    if (this.travel) this.interruptTravel()
    this.goal.yaw += yaw
    this.goal.pitch = clamp(this.goal.pitch + pitch, -PITCH_LIMIT, PITCH_LIMIT)
    this.lastInput = this.stage.time
  }

  zoomBy(factor) {
    if (this.mode !== 'orbit') return
    if (this.travel) this.interruptTravel()
    this.goal.distance = this.clampDistance(this.goal.distance * factor)
    this.lastInput = this.stage.time
  }

  clampDistance(distance) {
    return clamp(distance, this.minDistanceOf(this.focus), MAX_DISTANCE)
  }

  onResize() {
    // a globe left at rest refits to the new screen (as the globe did)
    const fit = this.globe.restDistance
    if (this.focus === this.system.home && !this.focusing && Math.abs(this.goal.distance - this.homeFit) < 0.6) {
      this.goal.distance = fit
    }
    this.homeFit = fit
    this.goal.distance = this.clampDistance(this.goal.distance)
    if (this.viewShift !== 0) {
      const { width, height } = this.stage
      this.camera.setViewOffset(width, height, 0, this.viewShift, width, height)
    }
  }

  // ------------------------------------------------------------------ home

  // Turns the globe point (lat, lon) to the camera (home only), optionally
  // zooming to `distance`. Resolves when it settles.
  lookAtLatLon(lat, lon, { distance = this.view.distance, duration = 0.85 } = {}) {
    const { pitch, yaw } = viewFor(lat, lon, this.view.yaw)
    const target = { pitch: clamp(pitch, -1.53, 1.53), yaw, distance }
    this.focusing = true
    this.velocity.yaw = this.velocity.pitch = 0
    return new Promise((resolve) => {
      const settle = () => {
        Object.assign(this.goal, target)
        this.goal.pitch = clamp(target.pitch, -PITCH_LIMIT, PITCH_LIMIT)
        this.focusing = false
        resolve()
      }
      gsap.to(this.view, {
        ...target,
        duration: this.reduced ? 0.01 : duration,
        ease: 'power3.inOut',
        overwrite: true,
        onComplete: settle,
        onInterrupt: () => {
          this.focusing = false
          resolve()
        },
      })
    })
  }

  // After a focus: ease back out to (at least nearly) `distance`.
  release(distance) {
    this.goal.distance = this.clampDistance(Math.max(this.goal.distance, distance))
    this.lastInput = this.stage.time
  }

  // The intro's dive: from z = 60 down to the resting distance (a tween the
  // intro timeline can hold).
  dive({ duration = 2, ease = 'expo.inOut' } = {}) {
    const rest = this.globe.restDistance
    this.goal.distance = rest
    return gsap.to(this.view, {
      distance: rest,
      duration,
      ease,
      onStart: () => void (this.focusing = true),
      onComplete: () => {
        this.focusing = false
        this.goal.distance = rest
      },
    })
  }

  // ------------------------------------------------------------------ fly-to

  // Where a flight to `target` ends: its resting distance, on the sunlit side
  // (the side nearer to where the camera comes from); home, the Sun and ships
  // keep the direction the camera arrives from.
  arrivalView(target, distance, out) {
    const at = this.positionOf(target, end)
    out.distance = clamp(distance ?? this.restDistanceOf(target), this.minDistanceOf(target), MAX_DISTANCE)
    const approach = offset.subVectors(this.camera.position, at)
    if (approach.lengthSq() < 1e-8) approach.set(0, 0, 1)
    approach.normalize()
    anglesOf(approach, angles)
    const system = this.system
    if (target === system.home) {
      out.yaw = angles.yaw
      out.pitch = REST_PITCH
    } else if (target === system.sun || !target.def) {
      out.yaw = angles.yaw
      out.pitch = clamp(angles.pitch, -0.45, 0.45)
    } else {
      const toSun = offset.subVectors(system.sunPosition, at)
      toSun.y = 0
      if (toSun.lengthSq() < 1e-8) toSun.set(0, 0, 1)
      anglesOf(toSun.normalize(), out)
      const left = nearestAngle(out.yaw + LIT_YAW, angles.yaw)
      const right = nearestAngle(out.yaw - LIT_YAW, angles.yaw)
      out.yaw = Math.abs(left - angles.yaw) < Math.abs(right - angles.yaw) ? left : right
      out.pitch = LIT_PITCH
    }
    return out
  }

  // Smooth travel to `target`: the pivot slides between the live positions of
  // both focuses (both move), the distance pulls back mid-flight in log space
  // and settles at the target's resting distance on its lit side.
  flyTo(target, { distance, duration } = {}) {
    if (!target) return Promise.resolve(false)
    if (this.mode === 'fly') this.exitFly()
    this.cancelTravel()
    gsap.killTweensOf(this.view)
    this.focusing = false
    const from = this.focus
    const arrival = this.arrivalView(target, distance, { yaw: 0, pitch: 0, distance: 0 })
    const separation = this.positionOf(from, start).distanceTo(this.positionOf(target, end))
    const view = this.view
    const log0 = Math.log(view.distance)
    const log1 = Math.log(arrival.distance)
    const peak = Math.max(view.distance, arrival.distance, separation * 0.55)
    const seconds =
      duration ?? clamp(0.9 + 0.3 * Math.log(1 + separation + Math.abs(arrival.distance - view.distance) * 0.5), 1.6, 3.5)
    this.velocity.yaw = this.velocity.pitch = 0
    return new Promise((resolve) => {
      const travel = {
        from,
        to: target,
        t: 0,
        yaw0: view.yaw,
        pitch0: view.pitch,
        yaw1: nearestAngle(arrival.yaw, view.yaw),
        pitch1: arrival.pitch,
        log0,
        log1,
        logPeak: Math.log(peak),
        resolve,
        tween: null,
      }
      this.travel = travel
      this.emit('travel', 'start', target)
      if (this.reduced || seconds <= 0) {
        travel.t = 1
        this.applyTravel()
        this.arrive()
        return
      }
      travel.tween = gsap.to(travel, { t: 1, duration: seconds, ease: 'none', onComplete: () => this.arrive() })
    })
  }

  goHome(options = {}) {
    return this.flyTo(this.system.home, { distance: this.globe.restDistance, ...options })
  }

  applyTravel() {
    const travel = this.travel
    const e = easeTravel(travel.t)
    this.positionOf(travel.from, start)
    this.positionOf(travel.to, end)
    this.center.lerpVectors(start, end, e)
    const view = this.view
    view.yaw = lerp(travel.yaw0, travel.yaw1, e)
    view.pitch = lerp(travel.pitch0, travel.pitch1, e)
    // out to the peak over the first half, in to the arrival over the second
    const log =
      e < 0.5
        ? lerp(travel.log0, travel.logPeak, smooth(e * 2))
        : lerp(travel.logPeak, travel.log1, smooth(e * 2 - 1))
    view.distance = Math.exp(log)
    this.goal.yaw = view.yaw
    this.goal.pitch = clamp(view.pitch, -PITCH_LIMIT, PITCH_LIMIT)
    this.goal.distance = view.distance
  }

  arrive() {
    const travel = this.travel
    if (!travel) return
    this.travel = null
    this.view.yaw = this.goal.yaw = travel.yaw1
    this.view.pitch = this.goal.pitch = travel.pitch1
    this.view.distance = this.goal.distance = Math.exp(travel.log1)
    this.lastInput = this.stage.time
    this.setFocus(travel.to)
    this.emit('travel', 'end', travel.to)
    travel.resolve(true)
  }

  // A drag or wheel mid-flight: stop where we are and orbit the destination.
  interruptTravel() {
    const travel = this.travel
    if (!travel) return
    travel.tween?.kill()
    this.travel = null
    this.startBlend(0.6)
    this.setFocus(travel.to)
    this.orbitFromCamera(travel.to)
    this.emit('travel', 'end', travel.to)
    travel.resolve(false)
  }

  // Ends a flight without arriving (a new one replaces it).
  cancelTravel() {
    const travel = this.travel
    if (!travel) return
    travel.tween?.kill()
    this.travel = null
    travel.resolve(false)
  }

  // Orbit angles and distance that reproduce the camera's current position
  // around `target` (the pitch may sit beyond the limit; the goal is clamped,
  // so it eases back in without a jump).
  orbitFromCamera(target) {
    const at = this.positionOf(target, end)
    this.center.copy(at)
    const away = offset.subVectors(this.camera.position, at)
    let distance = away.length()
    if (distance < 1e-6) {
      away.set(0, 0, 1)
      distance = 1e-6
    }
    anglesOf(away.divideScalar(distance), angles)
    const view = this.view
    view.yaw = nearestAngle(angles.yaw, view.yaw)
    view.pitch = angles.pitch
    view.distance = distance
    this.goal.yaw = view.yaw
    this.goal.pitch = clamp(view.pitch, -PITCH_LIMIT, PITCH_LIMIT)
    this.goal.distance = this.clampDistance(distance)
    this.velocity.yaw = this.velocity.pitch = 0
    this.parallax.x = this.parallax.y = 0
  }

  startBlend(duration) {
    if (this.reduced) return
    this.blend.from.copy(this.camera.quaternion)
    this.blend.t = 0
    this.blend.duration = duration
    this.blend.active = true
  }

  // ------------------------------------------------------------------ free flight

  enterFly() {
    if (this.mode === 'fly' || !this.enabled) return
    if (this.travel) this.interruptTravel()
    gsap.killTweensOf(this.view)
    this.focusing = false
    this.blend.active = false
    euler.setFromQuaternion(this.camera.quaternion, 'YXZ')
    const fly = this.fly
    fly.yaw = fly.goalYaw = euler.y
    fly.pitch = fly.goalPitch = clamp(euler.x, -FLY_PITCH_LIMIT, FLY_PITCH_LIMIT)
    fly.velocity.set(0, 0, 0)
    this.velocity.yaw = this.velocity.pitch = 0
    this.mode = 'fly'
    this.emit('mode', 'fly')
  }

  // Back to orbiting the nearest world, from exactly where the camera is.
  exitFly() {
    if (this.mode !== 'fly') return
    this.releaseKeys()
    this.input.x = this.input.y = this.input.lift = 0
    const nearest = this.updateNearest(this.camera.position).body ?? this.system.home
    this.mode = 'orbit'
    this.startBlend(0.9)
    this.setFocus(nearest)
    this.orbitFromCamera(nearest)
    this.lastInput = this.stage.time
    this.emit('mode', 'orbit')
  }

  toggleFly() {
    if (this.mode === 'fly') this.exitFly()
    else this.enterFly()
  }

  updateFly(dt) {
    const fly = this.fly
    const camera = this.camera
    fly.yaw = damp(fly.yaw, fly.goalYaw, 12, dt)
    fly.pitch = damp(fly.pitch, fly.goalPitch, 12, dt)
    camera.quaternion.setFromEuler(euler.set(fly.pitch, fly.yaw, 0, 'YXZ'))
    const { keys, input } = this
    const strafe = clamp(keys.right - keys.left + input.x, -1, 1)
    const forward = clamp(keys.forward - keys.back + input.y, -1, 1)
    const lift = clamp(keys.up - keys.down + input.lift, -1, 1)
    const surface = this.updateNearest(camera.position).surface
    // creep round the globe, cross the system in seconds
    const speed = clamp(0.8 * surface, FLY_SPEED_MIN, FLY_SPEED_MAX) * (keys.boost ? BOOST : 1)
    move.set(strafe, lift, -forward)
    const thrust = move.lengthSq()
    if (thrust > 1) move.normalize()
    move.applyQuaternion(camera.quaternion).multiplyScalar(speed)
    const rate = thrust > 0 ? 3 : 2.4
    const k = 1 - Math.exp(-rate * dt)
    fly.velocity.lerp(move, k)
    camera.position.addScaledVector(fly.velocity, dt)
    if (camera.position.length() > FLY_BOUND) camera.position.setLength(FLY_BOUND)
    this.keepOut(camera.position, null, fly.velocity)
    fly.speed = fly.velocity.length()
  }

  // ------------------------------------------------------------------ frame

  update(time, dt) {
    this.refreshBodies()
    if (this.mode === 'fly') this.updateFly(dt)
    else this.updateOrbit(time, dt)
    this.updateViewShift(dt)
    this.updatePlanes()
    this.camera.updateMatrixWorld()
    this.system.focus = this.mode === 'fly' ? null : (this.travel?.to ?? this.focus)
  }

  // World positions of every body for this frame. The system's frames only
  // ever translate, so summing positions up the chain is exact.
  refreshBodies() {
    const bodies = this.system.bodies
    for (let i = 0; i < bodies.length; i++) {
      const out = this.bodyPositions[i].set(0, 0, 0)
      for (let node = bodies[i].object3D; node && !node.isScene; node = node.parent) out.add(node.position)
    }
  }

  updateOrbit(time, dt) {
    const { view, goal, velocity, camera } = this
    if (this.travel) {
      this.applyTravel()
    } else {
      this.positionOf(this.focus, this.center)
      if (!this.drag.active && !this.focusing) {
        // inertia after a fling
        goal.yaw += velocity.yaw * dt
        goal.pitch = clamp(goal.pitch + velocity.pitch * dt, -PITCH_LIMIT, PITCH_LIMIT)
        const decay = Math.exp(-dt * 2.6)
        velocity.yaw *= decay
        velocity.pitch *= decay
        // the globe's idle drift after 3.5 s without input (at home, close in)
        const idle = this.enabled && !this.reduced && this.idleDrift && time - this.lastInput > 3.5
        if (idle && this.focus === this.system.home && view.distance < HOME_NEAR) {
          goal.yaw -= dt * 0.06
          goal.pitch = damp(goal.pitch, REST_PITCH, 0.5, dt)
        }
      }
      if (!this.focusing) {
        view.yaw = damp(view.yaw, goal.yaw, 7, dt)
        view.pitch = damp(view.pitch, goal.pitch, 7, dt)
        view.distance = Math.exp(damp(Math.log(view.distance), Math.log(goal.distance), 5, dt))
      }
    }

    // mouse parallax, once the intro has handed the camera over
    const parallax = this.parallax
    if (this.enabled) {
      parallax.x = damp(parallax.x, parallax.tx, 2.5, dt)
      parallax.y = damp(parallax.y, parallax.ty, 2.5, dt)
    }
    this.sway = damp(this.sway, this.travel ? 0 : this.scaleOf(this.focus), 3, dt)
    const sway = this.reduced ? 0 : 0.5 * this.sway
    const q = this.orbitQuaternion.setFromEuler(euler.set(-view.pitch, -view.yaw, 0, 'YXZ'))
    offset.set(parallax.x * sway, -parallax.y * sway, view.distance).applyQuaternion(q)
    camera.position.copy(this.center).add(offset)
    this.keepOut(camera.position, this.travel ? null : this.focus, null)
    camera.up.set(0, 1, 0).applyQuaternion(q)
    camera.lookAt(this.center)

    const blend = this.blend
    if (blend.active) {
      blend.t += dt / blend.duration
      if (blend.t >= 1) blend.active = false
      else {
        blendTo.copy(camera.quaternion)
        camera.quaternion.slerpQuaternions(blend.from, blendTo, easeBlend(blend.t))
      }
    }
  }

  // Pushes `position` out of every body (but `skip`) to 1.05 × its radius,
  // and cancels any velocity heading inwards.
  keepOut(position, skip, velocity) {
    const bodies = this.system.bodies
    for (let i = 0; i < bodies.length; i++) {
      const body = bodies[i]
      if (body === skip) continue
      const limit = this.solidRadii[i] * 1.05 + this.camera.near
      toBody.subVectors(position, this.bodyPositions[i])
      const d = toBody.length()
      if (d >= limit || d < 1e-6) continue
      toBody.divideScalar(d)
      position.copy(this.bodyPositions[i]).addScaledVector(toBody, limit)
      if (velocity) {
        const inward = velocity.dot(toBody)
        if (inward < 0) velocity.addScaledVector(toBody, -inward)
      }
    }
  }

  // Near plane ≈ 2% of the distance to the nearest surface, for depth
  // precision from the globe out to the whole system.
  updatePlanes() {
    const camera = this.camera
    const surface = this.updateNearest(camera.position).surface
    const near = clamp(surface * 0.02, NEAR_MIN, NEAR_MAX)
    if (Math.abs(near - camera.near) > camera.near * 0.08 || camera.far !== FAR) {
      camera.near = near
      camera.far = FAR
      camera.updateProjectionMatrix()
    }
  }

  // Lifts the focus by `px` CSS pixels (e.g. above a bottom card on phones).
  setViewShift(px) {
    this.viewShiftGoal = px
  }

  updateViewShift(dt) {
    const eased = this.reduced ? this.viewShiftGoal : damp(this.viewShift, this.viewShiftGoal, 4, dt)
    const shift = Math.abs(eased - this.viewShiftGoal) < 0.25 ? this.viewShiftGoal : eased
    if (shift === this.viewShift) return
    this.viewShift = shift
    const { width, height } = this.stage
    if (shift === 0) this.camera.clearViewOffset()
    else this.camera.setViewOffset(width, height, 0, shift, width, height)
  }
}
