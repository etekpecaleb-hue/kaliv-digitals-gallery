// Sky effects: shooting stars streaking across the view, a comet on a long
// ellipse round the Sun (coma, straight blue ion tail, curved dust tail) and
// space dust that only shows while the camera is moving.
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  Group,
  Mesh,
  MeshStandardMaterial,
  ShaderMaterial,
  Vector3,
} from 'three'
import { clamp, seededRandom } from '../core/math.js'
import { orbitPosition } from './orbits.js'
import { createRockGeometry } from './belts-rocks.js'
import { GlowPoints, Ribbon, SCREEN, updateScreen } from './effects-ribbon.js'

const DEG = Math.PI / 180

// Position of a body relative to system.group (its frame chain only translates).
function bodyPosition(body, root, target) {
  target.set(0, 0, 0)
  for (let o = body.object3D; o && o !== root; o = o.parent) target.add(o.position)
  return target
}

const smoothstep = (edge0, edge1, x) => {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1)
  return t * t * (3 - 2 * t)
}

// ---------------------------------------------------------------- streaks

// A screen-space quad from a tail point to a head point, both given as
// offsets from the camera (so the streak sits on the sky), with a tapered
// glowing body and a bright round head.
const STREAK_VERTEX = /* glsl */ `
  uniform vec3 uHead;
  uniform vec3 uTail;
  uniform float uWidth;
  uniform float uGlow;
  uniform vec2 uViewport;
  attribute vec2 aCorner;
  varying vec2 vPx;
  varying float vLength;
  varying float vVisible;
  void main() {
    vec4 head = projectionMatrix * viewMatrix * vec4(cameraPosition + uHead, 1.0);
    vec4 tail = projectionMatrix * viewMatrix * vec4(cameraPosition + uTail, 1.0);
    vVisible = step(0.0, head.w) * step(0.0, tail.w);
    vec2 halfView = uViewport * 0.5;
    vec2 hs = head.xy / head.w * halfView;
    vec2 ts = tail.xy / tail.w * halfView;
    vec2 dir = hs - ts;
    float len = length(dir);
    dir = len > 1e-3 ? dir / len : vec2(1.0, 0.0);
    vec2 normal = vec2(-dir.y, dir.x);
    vec4 base = aCorner.x > 0.5 ? head : tail;
    float along = aCorner.x > 0.5 ? uGlow : -uGlow * 0.2;
    vec2 offset = dir * along + normal * aCorner.y * uGlow;
    base.xy += offset / halfView * base.w;
    vPx = vec2(aCorner.x > 0.5 ? along : -len + along, aCorner.y * uGlow);
    vLength = len;
    gl_Position = base;
  }
`

const STREAK_FRAGMENT = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uHeadColor;
  uniform float uAlpha;
  uniform float uWidth;
  uniform float uGlow;
  varying vec2 vPx;
  varying float vLength;
  varying float vVisible;
  void main() {
    float t = clamp(1.0 + vPx.x / max(vLength, 1.0), 0.0, 1.0);
    float width = mix(uWidth * 0.25, uWidth, t);
    float across = clamp(1.0 - abs(vPx.y) / width, 0.0, 1.0);
    float body = pow(t, 2.4) * across * across * step(vPx.x, 0.0);
    float d = length(vPx) / uGlow;
    float head = exp(-d * d * 9.0) + 0.35 * exp(-d * d * 2.5);
    float alpha = (body * 0.85 + head) * uAlpha * vVisible;
    if (alpha < 0.003) discard;
    gl_FragColor = vec4(mix(uColor, uHeadColor, clamp(head * 1.4, 0.0, 1.0)), alpha);
    #include <colorspace_fragment>
  }
`

function streakGeometry() {
  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new BufferAttribute(new Float32Array(12), 3))
  geometry.setAttribute('aCorner', new BufferAttribute(new Float32Array([0, -1, 0, 1, 1, -1, 1, 1]), 2))
  geometry.setIndex([0, 2, 1, 1, 2, 3])
  return geometry
}

const SKY_DISTANCE = 9000

class ShootingStar {
  active = false
  start = new Vector3()
  axis = new Vector3()

  constructor(geometry) {
    this.uniforms = {
      uHead: { value: new Vector3() },
      uTail: { value: new Vector3() },
      uWidth: { value: 2 },
      uGlow: { value: 7 },
      uAlpha: { value: 0 },
      uColor: { value: new Color('#9cc7ff') },
      uHeadColor: { value: new Color('#ffffff') },
      uViewport: SCREEN.uViewport,
    }
    this.mesh = new Mesh(
      geometry,
      new ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: STREAK_VERTEX,
        fragmentShader: STREAK_FRAGMENT,
        transparent: true,
        depthWrite: false,
        blending: AdditiveBlending,
      }),
    )
    this.mesh.frustumCulled = false
    this.mesh.visible = false
    this.mesh.renderOrder = 1
  }

  launch(camera, random) {
    // Start somewhere in the upper three quarters of the view.
    this.start.set(random() * 1.6 - 0.8, random() * 1.3 - 0.5, 0.5).unproject(camera).sub(camera.position).normalize()
    // Travel diagonally down the screen, to the left or the right.
    const dip = (10 + random() * 45) * DEG
    const screenDir = this.axis.set((random() < 0.5 ? -1 : 1) * Math.cos(dip), -Math.sin(dip), 0)
    screenDir.transformDirection(camera.matrixWorld)
    this.axis.crossVectors(this.start, screenDir).normalize()
    this.life = 0
    this.duration = 0.5 + random() * 0.7
    this.sweep = (7 + random() * 12) * DEG
    this.tailLag = this.duration * (0.25 + random() * 0.2)
    this.brightness = 0.55 + random() * 0.45
    this.uniforms.uWidth.value = (1.3 + random() * 1.4) * SCREEN.uPixelRatio.value
    this.uniforms.uGlow.value = (4 + random() * 4) * SCREEN.uPixelRatio.value
    this.uniforms.uColor.value.set(random() < 0.25 ? '#ffd9a8' : '#9cc7ff')
    this.active = true
    this.mesh.visible = true
  }

  directionAt(time, target) {
    const angle = (clamp(time, 0, this.duration) / this.duration) * this.sweep
    return target.copy(this.start).applyAxisAngle(this.axis, angle).multiplyScalar(SKY_DISTANCE)
  }

  // Accelerating, like a meteor burning in.
  eased(t) {
    return this.duration * (t / this.duration) ** 1.4
  }

  update(dt) {
    if (!this.active) return
    this.life += dt
    const { life, duration } = this
    this.directionAt(this.eased(life), this.uniforms.uHead.value)
    this.directionAt(this.eased(Math.max(0, life - this.tailLag)), this.uniforms.uTail.value)
    const fadeIn = smoothstep(0, 0.12, life)
    const fadeOut = 1 - smoothstep(duration * 0.6, duration, life)
    this.uniforms.uAlpha.value = fadeIn * fadeOut * this.brightness
    if (life >= duration) {
      this.active = false
      this.mesh.visible = false
    }
  }
}

// ---------------------------------------------------------------- dust

// Each particle is a short screen-space streak drawn from where it is to where
// it was a moment ago relative to the moving camera. Three layers with box
// sizes a decade apart keep the effect right from the globe to deep space.
const DUST_VERTEX = /* glsl */ `
  uniform vec3 uBox;
  uniform vec3 uOrigin;
  uniform vec3 uLayerAlpha;
  uniform vec3 uVelocity;
  uniform float uStreak;
  uniform float uWidth;
  uniform vec2 uViewport;
  attribute vec4 aSeed;
  attribute vec3 aCorner;
  varying vec2 vCorner;
  varying float vAlpha;
  void main() {
    float box = aSeed.w < 0.5 ? uBox.x : (aSeed.w < 1.5 ? uBox.y : uBox.z);
    float layer = aSeed.w < 0.5 ? uLayerAlpha.x : (aSeed.w < 1.5 ? uLayerAlpha.y : uLayerAlpha.z);
    vec3 rel = mod(aSeed.xyz * box + uOrigin - cameraPosition + 0.5 * box, box) - 0.5 * box;
    vec3 world = cameraPosition + rel;
    vec3 travel = uVelocity * uStreak;
    float maxTravel = box * 0.18;
    float travelLength = length(travel);
    if (travelLength > maxTravel) travel *= maxTravel / travelLength;
    vec4 head = projectionMatrix * viewMatrix * vec4(world, 1.0);
    vec4 tail = projectionMatrix * viewMatrix * vec4(world + travel, 1.0);
    if (tail.w < 0.01) tail = head;
    vec2 halfView = uViewport * 0.5;
    vec2 dir = head.xy / max(head.w, 1e-3) * halfView - tail.xy / max(tail.w, 1e-3) * halfView;
    float len = length(dir);
    dir = len > 1e-3 ? dir / len : vec2(1.0, 0.0);
    vec2 normal = vec2(-dir.y, dir.x);
    vec4 base = aCorner.x > 0.5 ? head : tail;
    vec2 offset = normal * aCorner.y * uWidth + dir * (aCorner.x > 0.5 ? uWidth : -uWidth);
    base.xy += offset / halfView * base.w;
    float r = length(rel) / box;
    float edge = max(max(abs(rel.x), abs(rel.y)), abs(rel.z)) / box;
    vAlpha = layer * aCorner.z * (1.0 - smoothstep(0.36, 0.5, edge)) * smoothstep(0.015, 0.07, r) * step(0.0, head.w);
    vCorner = aCorner.xy;
    gl_Position = base;
  }
`

const DUST_FRAGMENT = /* glsl */ `
  uniform vec3 uColor;
  varying vec2 vCorner;
  varying float vAlpha;
  void main() {
    float across = 1.0 - abs(vCorner.y);
    float alpha = vAlpha * across * mix(0.25, 1.0, vCorner.x);
    if (alpha < 0.003) discard;
    gl_FragColor = vec4(uColor, alpha);
    #include <colorspace_fragment>
  }
`

const DUST_LAYERS = [
  { box: 26, share: 0.42 },
  { box: 260, share: 0.33 },
  { box: 2600, share: 0.25 },
]

// A layer shows while the camera crosses a fair share of its box per second.
function dustLayerAlpha(speed, box) {
  const ratio = speed / box
  return smoothstep(0.05, 0.45, ratio) * (1 - smoothstep(4, 12, ratio)) * 0.8
}

function dustMesh(count, random, uniforms) {
  // aSeed = (x, y, z in the unit box, layer); aCorner = (head?, side, brightness)
  const seeds = new Float32Array(count * 4 * 4)
  const corners = new Float32Array(count * 4 * 3)
  const index = new Uint16Array(count * 6)
  let layer = 0
  let layerEnd = Math.round(count * DUST_LAYERS[0].share)
  for (let i = 0; i < count; i++) {
    if (i >= layerEnd && layer < DUST_LAYERS.length - 1) {
      layer++
      layerEnd += Math.round(count * DUST_LAYERS[layer].share)
    }
    const x = random()
    const y = random()
    const z = random()
    const brightness = 0.35 + random() * 0.65
    for (let k = 0; k < 4; k++) {
      seeds.set([x, y, z, layer], (i * 4 + k) * 4)
      corners.set([k >> 1, k & 1 ? 1 : -1, brightness], (i * 4 + k) * 3)
    }
    const v = i * 4
    index.set([v, v + 2, v + 1, v + 1, v + 2, v + 3], i * 6)
  }
  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new BufferAttribute(new Float32Array(count * 4 * 3), 3))
  geometry.setAttribute('aSeed', new BufferAttribute(seeds, 4))
  geometry.setAttribute('aCorner', new BufferAttribute(corners, 3))
  geometry.setIndex(new BufferAttribute(index, 1))
  const material = new ShaderMaterial({
    uniforms,
    vertexShader: DUST_VERTEX,
    fragmentShader: DUST_FRAGMENT,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  })
  const mesh = new Mesh(geometry, material)
  mesh.frustumCulled = false
  mesh.renderOrder = 4
  return mesh
}

// ---------------------------------------------------------------- comet

const COMET_A = 900
const COMET_E = 0.86
const COMET_PERIOD = 16

export class SpaceEffects {
  group = new Group()

  constructor(system) {
    this.system = system
    this.reduced = system.reduced
    system.effects = this
    this.random = seededRandom((Date.now() & 0xffff) + 99)
    this.tmp = new Vector3()
    this.tmp2 = new Vector3()
    this.group.name = 'space-effects'
    system.group.add(this.group)

    this.buildShootingStars()
    this.buildDust(system.coarse ? 420 : 520)
    this.buildComet(system)
  }

  buildShootingStars() {
    this.streakGeometry = streakGeometry()
    this.stars = [0, 1, 2].map(() => new ShootingStar(this.streakGeometry))
    for (const star of this.stars) this.group.add(star.mesh)
    this.nextStar = 2 + this.random() * 3
    this.cameraRest = 0
  }

  buildDust(count) {
    this.dustUniforms = {
      uBox: { value: new Vector3(...DUST_LAYERS.map((l) => l.box)) },
      uOrigin: { value: new Vector3() },
      uLayerAlpha: { value: new Vector3() },
      uVelocity: { value: new Vector3() },
      uStreak: { value: 0.07 },
      uWidth: { value: 1 },
      uColor: { value: new Color('#cfe0ff') },
      uViewport: SCREEN.uViewport,
    }
    this.dust = dustMesh(count, seededRandom(4242), this.dustUniforms)
    this.dust.name = 'space-dust'
    this.group.add(this.dust)
    this.cameraVelocity = new Vector3()
    this.lastCamera = null
    this.cameraSpeed = 0
    this.reference = { body: null, position: new Vector3(), last: new Vector3() }
  }

  // The comet's orbit is laid out from home's position at start-up so it is
  // always inbound, ~420 u from the Sun and ~70° round from home, its tail
  // lit side-on from the gallery; it reaches perihelion ~10 minutes later at 1×.
  buildComet(system) {
    const home = this.tmp.copy(system.frame.position).negate()
    const homeLongitude = Math.atan2(-home.z, home.x) / DEG
    const rStart = 420
    const E = -Math.acos((1 - rStart / COMET_A) / COMET_E)
    const M = E - COMET_E * Math.sin(E)
    const nu = 2 * Math.atan(Math.sqrt((1 + COMET_E) / (1 - COMET_E)) * Math.tan(E / 2))
    const peri = homeLongitude + 70 - nu / DEG
    this.cometOrbit = {
      a: COMET_A,
      e: COMET_E,
      i: 24,
      node: peri - 60,
      peri,
      L0: M / DEG + peri - (360 * system.years) / COMET_PERIOD,
      period: COMET_PERIOD,
    }

    this.comet = new Group()
    this.comet.name = 'comet'
    system.frame.add(this.comet)
    this.nucleusGeometry = createRockGeometry({ seed: 2025, detail: 4, smooth: true, lumps: 0.5, craters: 4 })
    this.nucleus = new Mesh(this.nucleusGeometry, new MeshStandardMaterial({ color: '#6d665e', vertexColors: true, roughness: 1 }))
    this.nucleus.scale.set(0.7, 0.45, 0.5)
    this.comet.add(this.nucleus)

    this.ionTail = new Ribbon(14, {
      color: '#a9d2ff',
      colorTail: '#2f6bff',
      opacity: 0.75,
      widthHead: 1.5,
      widthTail: 14,
      minPx: 1.4,
      energyFloor: 0.2,
      fade: 1.25,
      headFade: 0.02,
      streaks: 0.9,
    })
    this.dustTail = new Ribbon(22, {
      color: '#fff3dc',
      colorTail: '#ffcf8a',
      opacity: 0.5,
      widthHead: 3,
      widthTail: 60,
      minPx: 2,
      energyFloor: 0.2,
      fade: 1.6,
      headFade: 0.03,
      streaks: 0.35,
    })
    this.comet.add(this.ionTail.mesh, this.dustTail.mesh)
    this.coma = new GlowPoints(3, { minPx: 2.5, maxPx: 420, lift: 1.2 })
    this.coma.define(0, { color: '#7fc4ff', size: 18, intensity: 0.5 })
    this.coma.define(1, { color: '#d9f1ff', size: 5, intensity: 0.9 })
    this.coma.define(2, { color: '#ffffff', size: 1.2, intensity: 1 })
    this.comet.add(this.coma.points)
    this.cometPosition = new Vector3()
    this.cometVelocity = new Vector3()
    this.antiSun = new Vector3()
  }

  updateComet(years, time) {
    const position = orbitPosition(this.cometOrbit, years, this.cometPosition)
    orbitPosition(this.cometOrbit, years + 0.002, this.cometVelocity).sub(position).normalize()
    const r = position.length()
    const antiSun = this.antiSun.copy(position).divideScalar(r)
    // Activity: nothing beyond ~950 u, full near perihelion (~126 u).
    const activity = smoothstep(950, 170, r)
    this.comet.position.copy(position)
    this.nucleus.rotation.set(time * 0.11, time * 0.07, 0)

    // Straight ion tail directly away from the Sun.
    const ion = this.ionTail
    const ionLength = 12 + 320 * activity
    for (let i = 0; i < ion.count; i++) {
      const s = (i / (ion.count - 1)) * ionLength
      ion.points[i * 3] = antiSun.x * s
      ion.points[i * 3 + 1] = antiSun.y * s
      ion.points[i * 3 + 2] = antiSun.z * s
    }
    ion.commit()
    ion.material.uniforms.uOpacity.value = 0.15 + 0.7 * activity
    ion.material.uniforms.uWidthTail.value = 6 + 18 * activity
    ion.material.uniforms.uTime.value = time

    // Curved dust tail: away from the Sun, bending back along the orbit.
    const dust = this.dustTail
    const dustLength = 10 + 210 * activity
    const v = this.cometVelocity
    for (let i = 0; i < dust.count; i++) {
      const f = i / (dust.count - 1)
      const s = f * dustLength
      const bend = 0.42 * dustLength * f * f
      dust.points[i * 3] = antiSun.x * s - v.x * bend
      dust.points[i * 3 + 1] = antiSun.y * s - v.y * bend
      dust.points[i * 3 + 2] = antiSun.z * s - v.z * bend
    }
    dust.commit()
    dust.material.uniforms.uOpacity.value = 0.12 + 0.45 * activity
    dust.material.uniforms.uWidthTail.value = 12 + 60 * activity
    dust.material.uniforms.uTime.value = time

    const coma = this.coma
    coma.sizes[0] = 7 + 30 * activity
    coma.sizes[1] = 2.5 + 6 * activity
    coma.intensities[0] = 0.25 + 0.5 * activity
    coma.intensities[1] = 0.5 + 0.5 * activity
    coma.points.geometry.attributes.aSize.needsUpdate = true
    coma.commit()
  }

  // Dust rests in the frame of the body the camera is near (the one it is
  // probably following), so it only streaks when the camera really flies.
  updateReference(camera) {
    const { system } = this
    const ref = this.reference
    let best = system.sun
    let bestScore = Infinity
    for (const body of system.bodies) {
      const d = bodyPosition(body, system.group, this.tmp2).distanceTo(camera) - body.radius
      const score = d / Math.max(body.radius, 1.5)
      if (score < bestScore) {
        bestScore = score
        best = body
      }
    }
    if (bestScore > 40) best = system.sun
    bodyPosition(best, system.group, ref.position)
    if (best !== ref.body) {
      ref.body = best
      ref.last.copy(ref.position)
    }
  }

  updateDust(dt, camera) {
    const position = this.tmp.setFromMatrixPosition(camera.matrixWorld)
    this.updateReference(position)
    const ref = this.reference
    const moved = this.tmp2.subVectors(ref.position, ref.last)
    ref.last.copy(ref.position)
    const origin = this.dustUniforms.uOrigin.value
    origin.add(moved)
    const wrap = DUST_LAYERS[DUST_LAYERS.length - 1].box
    origin.set(origin.x % wrap, origin.y % wrap, origin.z % wrap)
    if (this.lastCamera && dt > 0) {
      // Camera motion relative to that body; a jump (focus change) is not flight.
      const velocity = this.tmp2.subVectors(position, this.lastCamera).sub(moved).divideScalar(dt)
      if (velocity.length() > 60000) velocity.set(0, 0, 0)
      this.cameraVelocity.lerp(velocity, 1 - Math.exp(-10 * dt))
    }
    this.lastCamera = (this.lastCamera ?? new Vector3()).copy(position)
    const speed = this.cameraVelocity.length()
    this.cameraSpeed = speed
    const alpha = this.dustUniforms.uLayerAlpha.value
    alpha.set(dustLayerAlpha(speed, DUST_LAYERS[0].box), dustLayerAlpha(speed, DUST_LAYERS[1].box), dustLayerAlpha(speed, DUST_LAYERS[2].box))
    this.dust.visible = alpha.x + alpha.y + alpha.z > 0.01
    this.dustUniforms.uVelocity.value.copy(this.cameraVelocity)
    this.dustUniforms.uWidth.value = 0.9 * SCREEN.uPixelRatio.value
  }

  updateShootingStars(dt, camera) {
    for (const star of this.stars) star.update(dt)
    if (this.reduced) return
    // "Idle on the globe": close to home and the camera has settled.
    const nearHome = camera.position.length() < 60
    this.cameraRest = this.cameraSpeed < 0.3 ? this.cameraRest + dt : 0
    const idle = nearHome && this.cameraRest > 2
    this.nextStar -= dt
    if (this.nextStar > 0) return
    let star = null
    for (const candidate of this.stars) if (!candidate.active) star = candidate
    if (star) {
      camera.updateMatrixWorld()
      star.launch(camera, this.random)
    }
    this.nextStar = idle ? 1.5 + this.random() * 2 : 3 + this.random() * 3
  }

  update(time, dt, ctx) {
    const camera = ctx.camera
    if (camera) updateScreen(this.system.renderer, camera)
    this.updateComet(ctx.years, time)
    if (!camera) return
    this.updateDust(dt, camera)
    this.updateShootingStars(dt, camera)
  }

  dispose() {
    this.group.removeFromParent()
    this.comet.removeFromParent()
    for (const star of this.stars) star.mesh.material.dispose()
    this.streakGeometry.dispose()
    this.dust.geometry.dispose()
    this.dust.material.dispose()
    this.nucleusGeometry.dispose()
    this.nucleus.material.dispose()
    this.ionTail.dispose()
    this.dustTail.dispose()
    this.coma.dispose()
    if (this.system.effects === this) this.system.effects = null
  }
}
