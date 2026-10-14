// The photo globe: curved photo panels in latitude rows over a blueprint core,
// with an atmosphere glow, orbit rings, two satellites and polar emblem caps.
// With Blueprint off it morphs into a seamless photo sphere (photoSphere.js).
// Handles its own drag/pinch/wheel/keyboard input and, when `cameraControl`
// is on, drives the camera.
import {
  AdditiveBlending,
  BackSide,
  BufferGeometry,
  CanvasTexture,
  Color,
  DataTexture,
  Euler,
  Float32BufferAttribute,
  Group,
  LineBasicMaterial,
  LineDashedMaterial,
  LineLoop,
  LineSegments,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  Points,
  PointsMaterial,
  Quaternion,
  Raycaster,
  SRGBColorSpace,
  ShaderMaterial,
  SphereGeometry,
  Vector2,
  Vector3,
} from 'three'
import { gsap } from 'gsap'
import { clamp, damp, lerp, seededRandom, wrap } from '../core/math.js'
import { fitLayout, latLonToXYZ, spreadIndices, viewFor } from './rowLayout.js'
import { PhotoSphere } from './photoSphere.js'
import {
  CORE_FRAGMENT,
  CORE_VERTEX,
  GLOW_FRAGMENT,
  GLOW_VERTEX,
  PANEL_FRAGMENT,
  PANEL_VERTEX,
} from './globeShaders.js'

const RADIUS = 5
const SIGNAL = new Color('#2f7bff')
const SIGNAL_HI = new Color('#9cc7ff')
// 1×1 hull-coloured texture for panels whose photo hasn't loaded yet.
const PLACEHOLDER = new DataTexture(new Uint8Array([10, 18, 36, 255]), 1, 1)
PLACEHOLDER.needsUpdate = true

// Resting tilt: the globe leans towards the viewer a little.
const REST_PITCH = 0.22
const PITCH_LIMIT = 1.25
const UP = new Vector3(0, 1, 0)

const scratch = new Vector3()
const satelliteA = new Vector3()
const satelliteB = new Vector3()
const morphEuler = new Euler()
// the blueprint panels' slide into their sphere cells, and its easing
const easeSlide = gsap.parseEase('power3.inOut')
const smooth = (t, a, b) => MathUtils.smoothstep(t, a, b)

// UV scale that cover-fits an image into a panel (crops the longer side).
function coverScale(panelAspect, imageAspect) {
  return imageAspect > panelAspect
    ? new Vector2(panelAspect / imageAspect, 1)
    : new Vector2(1, imageAspect / panelAspect)
}

function panelMaterial({ texture, tone, panelAspect, imageAspect, shared }) {
  const material = new ShaderMaterial({
    uniforms: {
      uMap: { value: texture ?? PLACEHOLDER },
      uHasMap: { value: texture ? 1 : 0 },
      uCover: { value: coverScale(panelAspect, imageAspect) },
      uAspect: { value: panelAspect },
      uTone: { value: new Color(tone) },
      uSignal: { value: SIGNAL_HI.clone() },
      uHover: { value: 0 },
      uReveal: { value: 1 },
      uDim: { value: 0 },
      uOpacity: { value: 1 },
      uFade: shared.uFade,
    },
    vertexShader: PANEL_VERTEX,
    fragmentShader: PANEL_FRAGMENT,
  })
  material.alphaToCoverage = true
  return material
}

function coreMaterial(shared) {
  return new ShaderMaterial({
    uniforms: {
      uBase: { value: new Color('#060c1c') },
      uLine: { value: new Color('#2f7bff') },
      uRim: { value: new Color('#3f86ff') },
      uFade: shared.uFade,
      uGrid: { value: 1 },
    },
    vertexShader: CORE_VERTEX,
    fragmentShader: CORE_FRAGMENT,
    transparent: true,
  })
}

function glowMaterial(shared) {
  return new ShaderMaterial({
    uniforms: {
      uColor: { value: SIGNAL.clone() },
      uStrength: { value: 1 },
      uFade: shared.uFade,
    },
    vertexShader: GLOW_VERTEX,
    fragmentShader: GLOW_FRAGMENT,
    side: BackSide,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  })
}

// Radial tick marks around a circle in the XY plane; every sixth is longer.
function tickRing(radius, count, length, material) {
  const points = []
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2
    const tick = i % 6 == 0 ? length * 2.2 : length
    points.push(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius,
      0,
      Math.cos(angle) * (radius + tick),
      Math.sin(angle) * (radius + tick),
      0,
    )
  }
  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new Float32BufferAttribute(points, 3))
  return new LineSegments(geometry, material)
}

// Circle in the XY plane, with line distances so dashed materials work.
function ringLine(radius, material) {
  const points = []
  for (let i = 0; i < 256; i++) {
    const angle = (i / 256) * Math.PI * 2
    points.push(new Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0))
  }
  const line = new LineLoop(new BufferGeometry().setFromPoints(points), material)
  line.computeLineDistances()
  return line
}

// The emblem printed on both polar caps: a dashed ring, a thin ring and the
// KD mark drawn at stroke 9, white on transparent (the cap material tints it).
export function drawPolarEmblem() {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = 512
  const ctx = canvas.getContext('2d')
  // draw in the emblem's 130-unit viewBox, centred
  const unit = 512 / 130
  ctx.translate(256, 256)
  ctx.scale(unit, unit)
  ctx.lineCap = 'butt'
  ctx.strokeStyle = '#ffffff'

  ctx.lineWidth = 1.6
  ctx.setLineDash([2, 4])
  ctx.beginPath()
  ctx.arc(0, 0, 60, 0, Math.PI * 2)
  ctx.stroke()
  ctx.setLineDash([])
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.arc(0, 0, 52, 0, Math.PI * 2)
  ctx.stroke()

  ctx.lineWidth = 9
  ctx.lineJoin = 'miter'
  ctx.beginPath()
  // K: stem, arm, and the leg springing from the arm
  ctx.moveTo(-34.8, -28)
  ctx.lineTo(-34.8, 28)
  ctx.moveTo(-34.8, 5)
  ctx.lineTo(-7.8, -25)
  ctx.moveTo(-22.6, -8.5)
  ctx.lineTo(-6.8, 26.1)
  // D: stem and a half-disc bowl
  ctx.moveTo(10.3, -28)
  ctx.lineTo(10.3, 28)
  ctx.moveTo(10.3, -23.5)
  ctx.lineTo(13.3, -23.5)
  ctx.arc(13.3, 0, 23.5, -Math.PI / 2, Math.PI / 2)
  ctx.lineTo(10.3, 23.5)
  ctx.stroke()

  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  return texture
}

export class PhotoGlobe {
  root = new Group()
  spin = new Group()
  panelGroup = new Group()
  shared = {
    uFade: { value: 1 },
    uTime: { value: 0 },
    // optional day/night on the photo sphere: world-space sun direction
    uSunDir: { value: new Vector3(1, 0, 0) },
    uDayNight: { value: 0 },
  }
  view = { pitch: REST_PITCH, yaw: 0, distance: 18 }
  goal = { pitch: REST_PITCH, yaw: 0, distance: 18 }
  // the blueprint's panels; `panels` is whichever set the current mode shows
  blueprintPanels = []
  sphere
  // 'blueprint' | 'sphere', and the morph between them (t: 0 = blueprint, 1 = sphere)
  mode = 'blueprint'
  morph = { t: 0, applied: -1, tween: null, extras: 1 }
  modeListeners = new Set()
  core
  glow
  extras = new Group()
  layout
  hovered = null
  front = null
  interactive = false
  cameraControl = false
  fitDistance = 18
  stage
  store
  reduced
  onSelect
  rowGeometries = new Map()
  rings = new Group()
  ringMaterials = []
  polar = []
  polarMaterials = []
  satellites
  raycaster = new Raycaster()
  pointer = new Vector2()
  velocity = { pitch: 0, yaw: 0 }
  pointers = new Map()
  drag = {
    active: false,
    moved: false,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    lastT: 0,
    downT: 0,
  }
  pinch = { distance: 0, goal: 0 }
  hoverPoint = null
  parallax = { x: 0, y: 0, tx: 0, ty: 0 }
  lastInput = 0
  focusing = false
  assembling = false
  minDistance = 8
  maxDistance = 30

  constructor(stage, store, options) {
    this.stage = stage
    this.store = store
    this.reduced = options.reduced
    this.onSelect = options.onSelect
    this.root.add(this.spin)
    this.spin.add(this.panelGroup)
    this.spin.rotation.order = 'XYZ'
    this.sphere = new PhotoSphere({ radius: RADIUS, shared: this.shared })
    this.spin.add(this.sphere.group)
    if (options.blueprint === false) {
      this.mode = 'sphere'
      this.morph.t = 1
    }

    const core = new Mesh(new SphereGeometry(4.825, 96, 64), coreMaterial(this.shared))
    this.spin.add(core)
    const glow = new Mesh(new SphereGeometry(6.1, 64, 48), glowMaterial(this.shared))
    this.root.add(glow)
    this.core = core
    this.glow = glow

    const solid = new LineBasicMaterial({ color: SIGNAL_HI, transparent: true, opacity: 0.32, depthWrite: false })
    const dashed = new LineDashedMaterial({
      color: SIGNAL,
      transparent: true,
      opacity: 0.55,
      dashSize: 0.18,
      gapSize: 0.22,
      depthWrite: false,
    })
    const faint = new LineBasicMaterial({ color: SIGNAL_HI, transparent: true, opacity: 0.2, depthWrite: false })
    this.ringMaterials.push(solid, dashed, faint)
    const mainOrbit = new Group()
    mainOrbit.add(ringLine(7.25, solid), ringLine(7.6, dashed), tickRing(RADIUS * 1.62, 120, 0.09, faint))
    mainOrbit.rotation.set(1.22, 0, -0.32)
    const sideOrbit = new Group()
    sideOrbit.add(ringLine(6.5, faint))
    sideOrbit.rotation.set(1.62, 0.5, 0.42)
    this.rings.add(mainOrbit, sideOrbit)

    const satelliteMaterial = new PointsMaterial({
      color: SIGNAL_HI,
      size: 5,
      sizeAttenuation: false,
      transparent: true,
      depthWrite: false,
    })
    this.ringMaterials.push(satelliteMaterial)
    const satelliteGeometry = new BufferGeometry()
    satelliteGeometry.setAttribute('position', new Float32BufferAttribute(new Float32Array(6), 3))
    this.satellites = new Points(satelliteGeometry, satelliteMaterial)
    this.satellites.userData.orbits = [mainOrbit, sideOrbit]
    // rings and satellites belong to the blueprint look and fade with it
    this.extras.add(this.rings, this.satellites)
    this.root.add(this.extras)

    stage.scene.add(this.root)
    this.root.visible = false
    stage.onResize(() => this.updateFit())
    stage.onFrame((time, dt) => this.update(time, dt))
    this.bindInput()
  }

  // (Re)creates every panel for the store's current photos.
  build() {
    for (const panel of this.blueprintPanels) {
      panel.mesh.removeFromParent()
      panel.mesh.material.dispose()
    }
    for (const row of this.rowGeometries.values()) row.geometry.dispose()
    this.rowGeometries.clear()
    for (const cap of this.polar) cap.removeFromParent()
    this.polar[0]?.geometry.dispose()
    this.polar.length = 0
    this.polarMaterials[0]?.map?.dispose()
    for (const material of this.polarMaterials) material.dispose()
    this.polarMaterials = []
    this.hovered = null
    this.front = null

    this.layout = fitLayout(this.baseOptions(), this.store.count)
    const order = spreadIndices(this.layout.slots.length, this.store.count)
    const { panelWidth, panelHeight } = this.layout.options
    const panelAspect = panelWidth / panelHeight
    this.blueprintPanels = this.layout.slots.map((slot, index) => {
      const row = this.rowGeometry(slot.row, slot.lat)
      const photo = this.store.photos[order[index]]
      const material = panelMaterial({
        texture: this.store.texture(photo),
        tone: photo.tone,
        panelAspect,
        imageAspect: photo.width / photo.height,
        shared: this.shared,
      })
      const mesh = new Mesh(row.geometry, material)
      const position = row.center.clone().applyAxisAngle(UP, slot.lon)
      mesh.position.copy(position)
      mesh.rotation.y = slot.lon
      mesh.userData.panel = index
      this.panelGroup.add(mesh)
      return {
        index,
        mesh,
        photo,
        lat: slot.lat,
        lon: slot.lon,
        basePosition: position,
        baseQuaternion: mesh.quaternion.clone(),
        normal: new Vector3(...latLonToXYZ(slot.lat, slot.lon, 1)),
        corners: row.corners,
        hover: 0,
      }
    })
    this.buildPolarBadges()
    this.sphere.build(this.store)
    this.planMorph()
    this.applyMorph()
    this.updateFit()
  }

  // The panels (or sphere cells) the current mode shows and picks.
  get panels() {
    return this.mode === 'sphere' ? this.sphere.cells : this.blueprintPanels
  }

  // Panels fly in from a scattered cloud, nearest-to-camera first, and scan
  // their photos in. Returns the gsap timeline.
  assemble(duration = 1.5) {
    const tl = gsap.timeline()
    this.root.visible = true
    if (this.reduced) {
      this.shared.uFade.value = 0
      tl.to(this.shared.uFade, { value: 1, duration: 0.6, ease: 'power1.out' })
      return tl
    }
    if (this.mode === 'sphere') return this.assembleSphere(tl, duration)
    this.assembling = true
    const random = seededRandom(17)
    // direction from the globe centre to the camera, in globe space
    const toCamera = new Vector3(0, 0, 1).applyEuler(new Euler(-this.view.pitch, -this.view.yaw, 0, 'ZYX'))
    for (const panel of this.blueprintPanels) {
      const { mesh, basePosition, baseQuaternion } = panel
      const from = panel.normal
        .clone()
        .multiplyScalar(20 + random() * 34)
        .add(new Vector3((random() - 0.5) * 16, (random() - 0.5) * 16, (random() - 0.5) * 16))
      const fromQuaternion = new Quaternion().setFromEuler(
        new Euler(random() * Math.PI, random() * Math.PI, random() * Math.PI),
      )
      const progress = { t: 0 }
      mesh.position.copy(from)
      mesh.quaternion.copy(fromQuaternion)
      mesh.material.uniforms.uReveal.value = 0
      const delay = (1 - panel.normal.dot(toCamera)) * 0.5 * 0.75 + random() * 0.12
      tl.to(
        progress,
        {
          t: 1,
          duration,
          ease: 'expo.out',
          onUpdate: () => {
            mesh.position.lerpVectors(from, basePosition, progress.t)
            mesh.quaternion.slerpQuaternions(fromQuaternion, baseQuaternion, progress.t)
          },
        },
        delay,
      )
      tl.to(mesh.material.uniforms.uReveal, { value: 1, duration: 0.8, ease: 'power2.out' }, delay + duration * 0.3)
    }
    tl.fromTo(this.shared.uFade, { value: 0 }, { value: 1, duration: 0.9, ease: 'power2.out' }, 0)
    tl.fromTo(this.rings.scale, { x: 0.6, y: 0.6, z: 0.6 }, { x: 1, y: 1, z: 1, duration: 1.8, ease: 'expo.out' }, 0.2)
    tl.call(() => (this.assembling = false))
    return tl
  }

  // Sweeps the globe away (back and up) and hides it.
  leave() {
    this.interactive = false
    this.setHover(null)
    const tl = gsap.timeline({ onComplete: () => void (this.root.visible = false) })
    const speed = this.reduced ? 0.01 : 1
    tl.to(this.root.position, { z: -26, y: 3, duration: 0.9 * speed, ease: 'power3.in' }, 0)
    tl.to(this.root.rotation, { y: -0.8, duration: 0.9 * speed, ease: 'power3.in' }, 0)
    tl.to(this.shared.uFade, { value: 0, duration: 0.7, ease: 'power2.in' }, 0.1)
    return tl
  }

  // Brings the globe back from behind and makes it interactive again.
  enter() {
    this.root.visible = true
    const tl = gsap.timeline({ onComplete: () => void (this.interactive = true) })
    const speed = this.reduced ? 0.01 : 1
    tl.fromTo(this.root.position, { z: -26, y: -3 }, { z: 0, y: 0, duration: 1.2 * speed, ease: 'expo.out' }, 0)
    tl.fromTo(this.root.rotation, { y: 0.8 }, { y: 0, duration: 1.2 * speed, ease: 'expo.out' }, 0)
    tl.to(this.shared.uFade, { value: 1, duration: 0.8, ease: 'power2.out' }, 0.05)
    return tl
  }

  // Turns `panel` to face the camera (and zooms in on it unless `zoom` is false).
  focus(panel, zoom = true) {
    const { pitch, yaw } = viewFor(panel.lat, panel.lon, this.view.yaw)
    const target = { pitch, yaw, distance: zoom ? this.focusDistance(panel) : this.view.distance }
    this.focusing = true
    this.velocity.pitch = this.velocity.yaw = 0
    return new Promise((resolve) => {
      gsap.to(this.view, {
        ...target,
        duration: this.reduced ? 0.01 : 0.85,
        ease: 'power3.inOut',
        overwrite: true,
        onComplete: () => {
          Object.assign(this.goal, target)
          this.focusing = false
          resolve()
        },
      })
    })
  }

  // After a focus: ease back out to (at least nearly) the resting distance.
  release() {
    const distance = Math.max(this.goal.distance, this.fitDistance * 0.92)
    this.goal.distance = clamp(distance, this.minDistance, this.maxDistance)
    this.lastInput = this.stage.time
  }

  // Dims every panel except `panel` (null clears).
  spotlight(panel) {
    for (const other of [...this.blueprintPanels, ...this.sphere.cells]) {
      const dim = panel && other !== panel ? 0.75 : 0
      const uniform = other.mesh.material.uniforms.uDim
      if (uniform.value !== dim) gsap.to(uniform, { value: dim, duration: 0.5, overwrite: true })
    }
  }

  // Screen-space bounding box of a panel, in CSS pixels.
  screenRect(panel) {
    panel.mesh.updateWorldMatrix(true, false)
    let minX = Infinity
    let minY = Infinity
    let maxX = -Infinity
    let maxY = -Infinity
    const corner = new Vector3()
    const screen = { x: 0, y: 0 }
    for (const local of panel.corners) {
      corner.copy(local).applyMatrix4(panel.mesh.matrixWorld)
      this.stage.project(corner, screen)
      minX = Math.min(minX, screen.x)
      minY = Math.min(minY, screen.y)
      maxX = Math.max(maxX, screen.x)
      maxY = Math.max(maxY, screen.y)
    }
    return { x: minX, y: minY, width: maxX - minX, height: maxY - minY }
  }

  // The panel showing `photo` that faces the camera most (photos can repeat).
  panelFor(photo) {
    let best = null
    let bestFacing = -Infinity
    for (const panel of this.panels) {
      if (panel.photo !== photo) continue
      const facing = panel.normal.clone().applyQuaternion(this.spin.quaternion).z
      if (facing > bestFacing) {
        best = panel
        bestFacing = facing
      }
    }
    return best
  }

  viewCenter() {
    return { lat: this.view.pitch, lon: -this.view.yaw }
  }

  // 1 = facing the camera head-on, -1 = on the far side.
  facing(panel) {
    return panel.normal.clone().applyQuaternion(this.spin.quaternion).z
  }

  // Swaps loaded textures into panels that were still showing their tone.
  refreshTextures() {
    for (const panel of this.blueprintPanels) {
      const texture = this.store.texture(panel.photo)
      const uniforms = panel.mesh.material.uniforms
      if (texture && uniforms.uMap.value !== texture) {
        uniforms.uMap.value = texture
        uniforms.uHasMap.value = 1
      }
    }
    this.sphere.refreshTextures(this.store)
  }

  // Replays the scan-in on every panel showing one of `photos` (in the
  // current mode; the other mode's set is simply shown).
  revealPhotos(photos) {
    const wanted = new Set(photos)
    const hidden = this.mode === 'sphere' ? this.blueprintPanels : this.sphere.cells
    for (const panel of hidden) panel.mesh.material.uniforms.uReveal.value = 1
    // nearest the camera first; the whole wave stays under ~2.5 s
    const spin = this.spin.quaternion
    const facing = (panel) => scratch.copy(panel.normal).applyQuaternion(spin).z
    const shown = this.panels.filter((panel) => wanted.has(panel.photo)).sort((a, b) => facing(b) - facing(a))
    const stagger = Math.min(0.06, 2.4 / Math.max(1, shown.length))
    shown.forEach((panel, i) => {
      gsap.fromTo(
        panel.mesh.material.uniforms.uReveal,
        { value: 0 },
        {
          value: 1,
          duration: this.reduced ? 0.01 : 0.9,
          delay: this.reduced ? 0 : 0.2 + i * stagger,
          ease: 'power2.out',
        },
      )
    })
  }

  // ---------------------------------------------------------------------------
  // Modes: Blueprint (panels in rows over the gridded core) and the photo
  // sphere (seamless cells). Kept apart from the camera/input code above and
  // below: modes only change what is drawn and picked, never the view.

  get blueprint() {
    return this.mode === 'blueprint'
  }

  // True while the morph between the modes runs.
  get morphing() {
    return this.morph.t > 0 && this.morph.t < 1
  }

  // `listener(mode)` after every mode change; returns an unsubscribe function.
  onModeChange(listener) {
    this.modeListeners.add(listener)
    return () => this.modeListeners.delete(listener)
  }

  // Switches Blueprint on (the panel globe) or off (the photo sphere) with a
  // ~1.2 s morph that can be reversed at any point. Resolves when it settles.
  setBlueprint(on, { animate = true } = {}) {
    const mode = on ? 'blueprint' : 'sphere'
    const target = on ? 0 : 1
    if (mode !== this.mode) {
      this.mode = mode
      this.setHover(null)
      this.front = null
      for (const listener of this.modeListeners) listener(mode)
    }
    this.morph.tween?.kill()
    this.morph.tween = null
    const distance = Math.abs(this.morph.t - target)
    if (!animate || distance === 0 || !this.root.visible) {
      this.morph.t = target
      this.applyMorph()
      return Promise.resolve()
    }
    return new Promise((resolve) => {
      this.morph.tween = gsap.to(this.morph, {
        t: target,
        duration: (this.reduced ? 0.4 : 1.25) * Math.max(0.35, distance),
        // a reversal mid-way starts at speed instead of easing in again
        ease: distance < 0.98 ? 'power2.out' : 'power2.inOut',
        onUpdate: () => this.applyMorph(),
        onComplete: () => {
          this.morph.tween = null
          resolve()
        },
        onInterrupt: resolve,
      })
    })
  }

  // Optional day/night on the photo sphere: `direction` is the world-space
  // direction towards the sun (null turns it off). Never darker than ~0.72.
  setSun(direction, strength = 1) {
    if (direction) this.shared.uSunDir.value.copy(direction).normalize()
    gsap.to(this.shared.uDayNight, { value: direction ? strength : 0, duration: 0.6, overwrite: true })
  }

  // Where every blueprint panel slides to: the sphere cell under its centre,
  // with the scale that makes it that cell's size.
  planMorph() {
    for (const panel of this.blueprintPanels) {
      const cell = this.sphere.cellAt(panel.normal)
      if (!cell) {
        panel.target = null
        continue
      }
      const { panelWidth, panelHeight } = this.layout.options
      const cap = cell.kind === 'cap'
      panel.target = {
        lat: cap ? Math.sign(cell.lat) * (Math.PI / 2 - 0.02) : cell.lat,
        dLon: cap ? 0 : wrap(cell.lon - panel.lon, -Math.PI, Math.PI),
        scaleX: clamp(cell.width / panelWidth, 0.6, 2.4),
        scaleY: clamp(cell.height / panelHeight, 0.6, 2.4),
      }
    }
  }

  // Draws the morph at `this.morph.t`. Everything is a pure function of t,
  // so the morph can stop or reverse at any frame.
  applyMorph() {
    const t = this.morph.t
    const reduced = this.reduced
    this.morph.applied = t
    this.morph.extras = 1 - smooth(t, 0, 0.45)
    this.core.material.uniforms.uGrid.value = this.morph.extras
    this.core.visible = t < 1
    this.glow.material.uniforms.uStrength.value = lerp(1, 0.58, smooth(t, 0.1, 0.9))
    this.extras.visible = this.morph.extras > 0.001
    if (!reduced) this.extras.scale.setScalar(1 + 0.12 * (1 - this.morph.extras))
    for (const cap of this.polar) cap.visible = this.extras.visible
    this.panelGroup.visible = t < 1
    this.sphere.group.visible = t > 0
    // the intro's assembly animates the meshes itself
    if (this.assembling) return
    this.sphere.applyMorph(t, reduced)
    for (const panel of this.blueprintPanels) this.morphPanel(panel, t, reduced)
  }

  morphPanel(panel, t, reduced) {
    const { mesh } = panel
    const material = mesh.material
    // equator rows move first, the rows nearest the poles last
    const p = reduced ? t : clamp((t - 0.3 * Math.min(1, Math.abs(panel.lat))) / 0.6, 0, 1)
    const opacity = reduced ? 1 - t : 1 - smooth(p, 0.45, 0.95)
    material.uniforms.uOpacity.value = opacity
    material.transparent = opacity < 1
    material.alphaToCoverage = !material.transparent
    mesh.visible = opacity > 0.002
    if (p === 0 || !panel.target) {
      mesh.position.copy(panel.basePosition)
      mesh.quaternion.copy(panel.baseQuaternion)
      mesh.scale.setScalar(1)
      return
    }
    if (reduced) {
      // crossfade only: lift a hair so it never z-fights the cells
      mesh.position.copy(panel.basePosition).multiplyScalar(1.006)
      return
    }
    const e = easeSlide(p)
    const target = panel.target
    const lat = lerp(panel.lat, target.lat, e)
    const lon = panel.lon + target.dLon * e
    // arcs up off the surface on the way, then settles just above the cell
    const lift = 1.012 + 0.05 * Math.sin(Math.PI * e)
    mesh.position.set(...latLonToXYZ(lat, lon, RADIUS * lift))
    mesh.quaternion.setFromEuler(morphEuler.set(panel.lat - lat, lon, 0, 'YXZ'))
    mesh.scale.set(lerp(1, target.scaleX, e), lerp(1, target.scaleY, e), 1)
  }

  // Intro hand-over in photo-sphere mode: cells fall onto the sphere from
  // further out, nearest the camera first, and scan their photos in.
  assembleSphere(tl, duration) {
    this.assembling = true
    const random = seededRandom(23)
    const toCamera = new Vector3(0, 0, 1).applyEuler(new Euler(-this.view.pitch, -this.view.yaw, 0, 'ZYX'))
    for (const cell of this.sphere.cells) {
      const { mesh, normal } = cell
      const from = 9 + random() * 16
      const progress = { t: 0 }
      mesh.position.copy(normal).multiplyScalar(from)
      mesh.material.uniforms.uReveal.value = 0
      mesh.material.uniforms.uGrow.value = 0.25
      const delay = (1 - normal.dot(toCamera)) * 0.5 * 0.75 + random() * 0.12
      tl.to(
        progress,
        {
          t: 1,
          duration,
          ease: 'expo.out',
          onUpdate: () => {
            mesh.position.copy(normal).multiplyScalar(from * (1 - progress.t))
            mesh.material.uniforms.uGrow.value = 0.25 + 0.75 * progress.t
          },
        },
        delay,
      )
      tl.to(mesh.material.uniforms.uReveal, { value: 1, duration: 0.8, ease: 'power2.out' }, delay + duration * 0.3)
    }
    tl.fromTo(this.shared.uFade, { value: 0 }, { value: 1, duration: 0.9, ease: 'power2.out' }, 0)
    tl.call(() => {
      this.assembling = false
      for (const cell of this.sphere.cells) cell.mesh.position.set(0, 0, 0)
    })
    return tl
  }
  // ---------------------------------------------------------------------------

  rotateBy(yaw, pitch) {
    this.goal.yaw += yaw
    this.goal.pitch = clamp(this.goal.pitch + pitch, -PITCH_LIMIT, PITCH_LIMIT)
    this.lastInput = this.stage.time
  }

  zoomBy(factor) {
    this.goal.distance = clamp(this.goal.distance * factor, this.minDistance, this.maxDistance)
    this.lastInput = this.stage.time
  }

  // Bigger panels on small screens so they stay legible.
  baseOptions() {
    return Math.min(this.stage.width, this.stage.height) < 600
      ? { radius: RADIUS, panelWidth: 2.3, panelHeight: 1.67, gap: 0.24, maxLatitude: 1 }
      : { radius: RADIUS, panelWidth: 1.9, panelHeight: 1.38, gap: 0.2, maxLatitude: 1 }
  }

  // One curved panel geometry per row (every panel in a row is identical),
  // bent onto the sphere and centred on its own middle. Cached per row.
  rowGeometry(row, lat) {
    const cached = this.rowGeometries.get(row)
    if (cached) return cached
    const { panelWidth, panelHeight } = this.layout.options
    const geometry = new PlaneGeometry(panelWidth, panelHeight, 12, 8)
    const position = geometry.attributes.position
    const normal = geometry.attributes.normal
    const center = new Vector3(...latLonToXYZ(lat, 0, RADIUS))
    for (let i = 0; i < position.count; i++) {
      const vertexLat = lat + position.getY(i) / RADIUS
      const [x, y, z] = latLonToXYZ(vertexLat, position.getX(i) / (RADIUS * Math.cos(vertexLat)), RADIUS)
      normal.setXYZ(i, x / RADIUS, y / RADIUS, z / RADIUS)
      position.setXYZ(i, x - center.x, y - center.y, z - center.z)
    }
    position.needsUpdate = true
    normal.needsUpdate = true
    geometry.computeBoundingSphere()
    // PlaneGeometry(…, 12, 8) has 13 vertices per row: corners are 0, 12, last-12, last
    const last = position.count - 1
    const entry = {
      geometry,
      center,
      corners: [0, 12, last - 12, last].map((i) => new Vector3().fromBufferAttribute(position, i)),
    }
    this.rowGeometries.set(row, entry)
    return entry
  }

  // Emblem caps over the poles, sized to fill the space above the top row.
  buildPolarBadges() {
    const topLat = Math.max(...this.layout.rows.map((row) => row.lat))
    const capAngle = Math.PI / 2 - topLat - this.layout.options.panelHeight / 2 / RADIUS - 0.08
    if (capAngle < 0.12) return
    const capRadius = 4.925
    const geometry = new SphereGeometry(capRadius, 64, 12, 0, Math.PI * 2, 0, capAngle)
    const position = geometry.attributes.position
    const uv = geometry.attributes.uv
    // project the cap straight down onto the emblem, so it reads flat from above
    const extent = capRadius * Math.sin(capAngle)
    for (let i = 0; i < position.count; i++) {
      uv.setXY(i, 0.5 + position.getX(i) / (2 * extent), 0.5 - position.getZ(i) / (2 * extent))
    }
    uv.needsUpdate = true
    const emblem = drawPolarEmblem()
    const material = () =>
      new MeshBasicMaterial({
        map: emblem,
        color: SIGNAL_HI,
        transparent: true,
        opacity: 0,
        blending: AdditiveBlending,
        depthWrite: false,
      })
    this.polarMaterials = [material(), material()]
    const north = new Mesh(geometry, this.polarMaterials[0])
    const south = new Mesh(geometry, this.polarMaterials[1])
    south.rotation.x = Math.PI
    this.polar.push(north, south)
    this.spin.add(north, south)
  }

  // Camera distance at which one panel (or sphere cell) fills most of the view.
  focusDistance(panel) {
    const tanHalf = Math.tan(MathUtils.degToRad(this.stage.camera.fov / 2))
    const aspect = this.stage.camera.aspect
    const { panelWidth, panelHeight } = panel?.width
      ? { panelWidth: panel.width, panelHeight: panel.height }
      : this.layout.options
    return clamp(
      RADIUS + Math.max(panelHeight / (0.9 * tanHalf), panelWidth / (1.5 * tanHalf * aspect)),
      this.minDistance,
      this.maxDistance,
    )
  }

  // Resting distance at which the whole globe fits the viewport (with margin),
  // plus the zoom limits derived from it.
  updateFit() {
    const tanHalf = Math.tan(MathUtils.degToRad(this.stage.camera.fov / 2))
    const aspect = this.stage.width / this.stage.height
    const fill = aspect < 1 ? 1 : 0.84
    const previous = this.fitDistance
    const atRest = Math.abs(this.goal.distance - previous) < 0.6
    this.fitDistance = (RADIUS * 1.12) / (fill * tanHalf * Math.min(1, aspect))
    this.minDistance = 7.4
    this.maxDistance = this.fitDistance * 1.7
    if (atRest && !this.focusing) this.goal.distance = this.fitDistance
    this.goal.distance = clamp(this.goal.distance, this.minDistance, this.maxDistance)
  }

  get restDistance() {
    return this.fitDistance
  }

  bindInput() {
    const canvas = this.stage.canvas
    canvas.addEventListener('pointerdown', (event) => {
      if (!this.interactive) return
      canvas.setPointerCapture(event.pointerId)
      this.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY })
      this.lastInput = this.stage.time
      if (this.pointers.size === 1) {
        Object.assign(this.drag, {
          active: true,
          moved: false,
          startX: event.clientX,
          startY: event.clientY,
          lastX: event.clientX,
          lastY: event.clientY,
          lastT: performance.now(),
          downT: performance.now(),
        })
        this.velocity.yaw = this.velocity.pitch = 0
      } else if (this.pointers.size === 2) {
        const [a, b] = [...this.pointers.values()]
        this.pinch = { distance: Math.hypot(a.x - b.x, a.y - b.y), goal: this.goal.distance }
        this.drag.moved = true
      }
    })

    canvas.addEventListener('pointermove', (event) => {
      if (event.pointerType === 'mouse') {
        this.hoverPoint = { x: event.clientX, y: event.clientY }
        this.parallax.tx = (event.clientX / this.stage.width - 0.5) * 2
        this.parallax.ty = (event.clientY / this.stage.height - 0.5) * 2
      }
      const pointer = this.pointers.get(event.pointerId)
      if (!pointer || !this.interactive) return
      pointer.x = event.clientX
      pointer.y = event.clientY
      this.lastInput = this.stage.time

      if (this.pointers.size === 2) {
        const [a, b] = [...this.pointers.values()]
        const distance = Math.hypot(a.x - b.x, a.y - b.y)
        if (this.pinch.distance > 0) {
          this.goal.distance = clamp(
            (this.pinch.goal * this.pinch.distance) / distance,
            this.minDistance,
            this.maxDistance,
          )
        }
        return
      }

      if (!this.drag.active) return
      const now = performance.now()
      const dx = event.clientX - this.drag.lastX
      const dy = event.clientY - this.drag.lastY
      if (Math.hypot(event.clientX - this.drag.startX, event.clientY - this.drag.startY) > 6) {
        this.drag.moved = true
        canvas.classList.add('is-dragging')
      }
      // drag feels the same at any zoom: slower when closer in
      const speed = 0.0052 * (this.view.distance / this.fitDistance)
      this.goal.yaw += dx * speed
      this.goal.pitch = clamp(this.goal.pitch + dy * speed, -PITCH_LIMIT, PITCH_LIMIT)
      const dt = Math.max(1, now - this.drag.lastT) / 1000
      this.velocity.yaw = damp(this.velocity.yaw, (dx * speed) / dt, 18, dt)
      this.velocity.pitch = damp(this.velocity.pitch, (dy * speed) / dt, 18, dt)
      this.drag.lastX = event.clientX
      this.drag.lastY = event.clientY
      this.drag.lastT = now
    })

    const end = (event) => {
      if (!this.pointers.has(event.pointerId)) return
      this.pointers.delete(event.pointerId)
      if (this.pointers.size > 0) {
        // pinch ended: keep dragging with the remaining finger without a jump
        const [remaining] = [...this.pointers.values()]
        this.drag.lastX = remaining.x
        this.drag.lastY = remaining.y
        return
      }
      canvas.classList.remove('is-dragging')
      const tap = !this.drag.moved && performance.now() - this.drag.downT < 600
      this.drag.active = false
      this.drag.moved = false
      // a drag that stopped before release shouldn't fling
      if (performance.now() - this.drag.lastT > 90) this.velocity.yaw = this.velocity.pitch = 0
      if (this.reduced) this.velocity.yaw = this.velocity.pitch = 0
      if (tap && event.type === 'pointerup' && this.interactive) {
        const panel = this.pick(event.clientX, event.clientY)
        if (panel) this.onSelect(panel)
      }
    }
    canvas.addEventListener('pointerup', end)
    canvas.addEventListener('pointercancel', end)
    canvas.addEventListener('pointerleave', (event) => {
      if (event.pointerType === 'mouse') {
        this.hoverPoint = null
        this.parallax.tx = this.parallax.ty = 0
      }
    })

    addEventListener(
      'wheel',
      (event) => {
        if (!this.interactive || event.target?.closest?.('.lightbox, .intro, .sheet')) return
        event.preventDefault()
        const delta = event.deltaMode === 1 ? event.deltaY * 32 : event.deltaY
        this.zoomBy(Math.exp(clamp(delta, -200, 200) * 0.0012))
      },
      { passive: false },
    )

    canvas.addEventListener('keydown', (event) => {
      if (!this.interactive) return
      const step = 0.32
      const handled = (() => {
        switch (event.key) {
          case 'ArrowLeft':
            this.rotateBy(step, 0)
            return true
          case 'ArrowRight':
            this.rotateBy(-step, 0)
            return true
          case 'ArrowUp':
            this.rotateBy(0, step * 0.7)
            return true
          case 'ArrowDown':
            this.rotateBy(0, -step * 0.7)
            return true
          case '+':
          case '=':
            this.zoomBy(0.85)
            return true
          case '-':
          case '_':
            this.zoomBy(1.18)
            return true
          case 'Enter':
          case ' ':
            if (this.front) this.onSelect(this.front)
            return true
          default:
            return false
        }
      })()
      if (handled) event.preventDefault()
    })
  }

  // The front-facing panel under a screen point, or null.
  pick(x, y) {
    if (!this.root.visible || this.morphing) return null
    this.pointer.set((x / this.stage.width) * 2 - 1, -(y / this.stage.height) * 2 + 1)
    this.raycaster.setFromCamera(this.pointer, this.stage.camera)
    const group = this.mode === 'sphere' ? this.sphere.group : this.panelGroup
    const hit = this.raycaster.intersectObjects(group.children, false)[0]
    if (!hit) return null
    const panel = this.panels[hit.object.userData.panel]
    return panel.normal.clone().applyQuaternion(this.spin.quaternion).z > 0.15 ? panel : null
  }

  setHover(panel) {
    if (panel === this.hovered) return
    this.hovered = panel
    this.stage.canvas.classList.toggle('is-pointing', panel !== null)
  }

  update(time, dt) {
    this.shared.uTime.value = time
    if (!this.root.visible) return

    if (!this.drag.active && !this.focusing) {
      // inertia after a fling
      this.goal.yaw += this.velocity.yaw * dt
      this.goal.pitch = clamp(this.goal.pitch + this.velocity.pitch * dt, -PITCH_LIMIT, PITCH_LIMIT)
      const decay = Math.exp(-dt * 2.6)
      this.velocity.yaw *= decay
      this.velocity.pitch *= decay
      // idle drift after 3.5 s without input
      if (this.interactive && !this.reduced && time - this.lastInput > 3.5) {
        this.goal.yaw -= dt * 0.06
        this.goal.pitch = damp(this.goal.pitch, REST_PITCH, 0.5, dt)
      }
    }
    if (!this.focusing) {
      this.view.yaw = damp(this.view.yaw, this.goal.yaw, 7, dt)
      this.view.pitch = damp(this.view.pitch, this.goal.pitch, 7, dt)
      this.view.distance = damp(this.view.distance, this.goal.distance, 5, dt)
    }
    this.spin.rotation.set(this.view.pitch, this.view.yaw, 0)

    if (this.cameraControl) {
      const camera = this.stage.camera
      this.parallax.x = damp(this.parallax.x, this.parallax.tx, 2.5, dt)
      this.parallax.y = damp(this.parallax.y, this.parallax.ty, 2.5, dt)
      const sway = this.reduced ? 0 : 0.5
      camera.position.set(this.parallax.x * sway, -this.parallax.y * sway, this.view.distance)
      camera.lookAt(0, 0, 0)
    }

    if (this.interactive && !this.drag.moved && this.hoverPoint) {
      this.setHover(this.pick(this.hoverPoint.x, this.hoverPoint.y))
    } else if (!this.interactive || this.drag.moved) {
      this.setHover(null)
    }

    if (this.morph.applied !== this.morph.t) this.applyMorph()
    if (this.morph.t < 1) {
      for (const panel of this.blueprintPanels) {
        panel.hover = damp(panel.hover, panel === this.hovered ? 1 : 0, 10, dt)
        const uniforms = panel.mesh.material.uniforms
        uniforms.uHover.value = panel.hover
        if (!this.assembling && this.morph.t === 0) {
          // hovered panels lift off the surface and grow slightly
          panel.mesh.position.copy(panel.basePosition).multiplyScalar(1 + 0.035 * panel.hover)
          panel.mesh.scale.setScalar(1 + 0.05 * panel.hover)
        }
      }
    }
    if (this.morph.t > 0) this.sphere.update(dt, this.hovered, !this.assembling)

    let frontFacing = -Infinity
    const spin = this.spin.quaternion
    for (const panel of this.panels) {
      const facing = scratch.copy(panel.normal).applyQuaternion(spin).z
      if (facing > frontFacing) {
        frontFacing = facing
        this.front = panel
      }
    }

    const [mainOrbit, sideOrbit] = this.satellites.userData.orbits
    if (!this.reduced) {
      mainOrbit.rotation.z += dt * 0.05
      sideOrbit.rotation.z -= dt * 0.03
    }
    const satellitePositions = this.satellites.geometry.attributes.position
    satelliteA
      .set(Math.cos(time * 0.35) * RADIUS * 1.45, Math.sin(time * 0.35) * RADIUS * 1.45, 0)
      .applyEuler(mainOrbit.rotation)
    satelliteB
      .set(Math.cos(-time * 0.22) * RADIUS * 1.3, Math.sin(-time * 0.22) * RADIUS * 1.3, 0)
      .applyEuler(sideOrbit.rotation)
    satellitePositions.setXYZ(0, satelliteA.x, satelliteA.y, satelliteA.z)
    satellitePositions.setXYZ(1, satelliteB.x, satelliteB.y, satelliteB.z)
    satellitePositions.needsUpdate = true

    // the blueprint extras fade out with the morph to the photo sphere
    const fade = this.shared.uFade.value * this.morph.extras
    for (const material of this.ringMaterials) material.opacity = (material.userData.base ??= material.opacity) * fade

    if (this.polarMaterials.length === 2) {
      // each cap shows only while its pole tips towards the camera
      const poleFacing = scratch.set(0, 1, 0).applyQuaternion(spin).z
      this.polarMaterials[0].opacity = 0.85 * fade * MathUtils.smoothstep(poleFacing, 0.3, 0.75)
      this.polarMaterials[1].opacity = 0.85 * fade * MathUtils.smoothstep(-poleFacing, 0.3, 0.75)
    }
  }
}
