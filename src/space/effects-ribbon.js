// Shared additive looks: camera-facing ribbons (ship trails, comet tails) and
// soft glow points (engine glows, nav lights, the comet's coma). Both keep a
// minimum on-screen size, so a distant trail still reads as a hairline and a
// distant light as a dot, with their brightness scaled down to match.
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  Mesh,
  Points,
  ShaderMaterial,
  Vector2,
} from 'three'

// Screen metrics shared by every material here; refresh once per frame.
export const SCREEN = {
  uViewport: { value: new Vector2(1280, 800) },
  uViewHeight: { value: 800 },
  uPixelRatio: { value: 1 },
  // Pixels covered by one world unit at a view depth of one unit.
  uPxScale: { value: 1100 },
}

export function updateScreen(renderer, camera) {
  const viewport = renderer.getDrawingBufferSize(SCREEN.uViewport.value)
  SCREEN.uViewHeight.value = viewport.y
  SCREEN.uPixelRatio.value = renderer.getPixelRatio()
  SCREEN.uPxScale.value = (viewport.y * camera.projectionMatrix.elements[5]) / 2
}

const RIBBON_VERTEX = /* glsl */ `
  uniform float uWidthHead;
  uniform float uWidthTail;
  uniform float uMinPx;
  uniform float uMaxPx;
  uniform float uEnergyFloor;
  uniform float uViewHeight;
  attribute vec3 aTangent;
  attribute vec2 aStrip;
  varying vec2 vStrip;
  varying float vEnergy;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vec3 tangent = (modelViewMatrix * vec4(aTangent, 0.0)).xyz;
    vec3 side = cross(tangent, mv.xyz);
    float len = length(side);
    side = len > 1e-9 ? side / len : vec3(0.0, 1.0, 0.0);
    float width = mix(uWidthHead, uWidthTail, aStrip.y);
    float pixel = -mv.z * 2.0 / (projectionMatrix[1][1] * uViewHeight);
    float shown = max(width, uMinPx * pixel);
    vEnergy = max(width / shown, uEnergyFloor);
    // hairline trails: fade out where the camera is so close they turn into beams
    if (uMaxPx > 0.0) vEnergy *= 1.0 - smoothstep(uMaxPx, uMaxPx * 3.0, shown / pixel);
    mv.xyz += side * (aStrip.x * shown * 0.5);
    vStrip = aStrip;
    gl_Position = projectionMatrix * mv;
  }
`

const RIBBON_FRAGMENT = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uColorTail;
  uniform float uOpacity;
  uniform float uFade;
  uniform float uHeadFade;
  uniform float uStreaks;
  uniform float uTime;
  varying vec2 vStrip;
  varying float vEnergy;
  void main() {
    float across = 1.0 - vStrip.x * vStrip.x;
    float along = pow(1.0 - vStrip.y, uFade) * smoothstep(0.0, uHeadFade, vStrip.y);
    float streak = 1.0;
    if (uStreaks > 0.0) {
      // filaments run along the ribbon (lines of constant x fan out from the
      // head as it widens) and shimmer slowly
      float bendA = 0.5 * sin(vStrip.y * 2.2 - uTime * 0.21);
      float bendB = 0.35 * sin(vStrip.y * 1.3 + uTime * 0.13 + 2.0);
      float s = sin(vStrip.x * 10.5 + bendA) * sin(vStrip.x * 4.3 + 1.7 + bendB);
      streak = mix(1.0, 0.5 + 0.5 * s * s * 1.7, uStreaks);
      across = mix(across, across * across, 0.5);
    }
    float alpha = along * across * streak * uOpacity * vEnergy;
    if (alpha < 0.002) discard;
    gl_FragColor = vec4(mix(uColor, uColorTail, vStrip.y), alpha);
    #include <colorspace_fragment>
  }
`

export function createRibbonMaterial({
  color = '#9cc7ff',
  colorTail = color,
  opacity = 0.6,
  widthHead = 0.1,
  widthTail = 0.02,
  minPx = 1.2,
  maxPx = 0,
  energyFloor = 0,
  fade = 1.6,
  headFade = 0.0001,
  streaks = 0,
} = {}) {
  return new ShaderMaterial({
    uniforms: {
      uColor: { value: new Color(color) },
      uColorTail: { value: new Color(colorTail) },
      uOpacity: { value: opacity },
      uWidthHead: { value: widthHead },
      uWidthTail: { value: widthTail },
      uMinPx: { value: minPx },
      uMaxPx: { value: maxPx },
      uEnergyFloor: { value: energyFloor },
      uFade: { value: fade },
      uHeadFade: { value: headFade },
      uStreaks: { value: streaks },
      uTime: { value: 0 },
      uViewHeight: SCREEN.uViewHeight,
    },
    vertexShader: RIBBON_VERTEX,
    fragmentShader: RIBBON_FRAGMENT,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  })
}

// A strip of `count` centre points (index 0 = head), each drawn as a pair of
// vertices pushed sideways in the shader.
export class Ribbon {
  constructor(count, look) {
    this.count = count
    this.points = new Float32Array(count * 3)
    this.positions = new Float32Array(count * 6)
    this.tangents = new Float32Array(count * 6)
    const strip = new Float32Array(count * 4)
    const index = []
    for (let i = 0; i < count; i++) {
      const u = i / (count - 1)
      strip.set([-1, u, 1, u], i * 4)
      if (i < count - 1) {
        const a = i * 2
        index.push(a, a + 1, a + 2, a + 1, a + 3, a + 2)
      }
    }
    const geometry = new BufferGeometry()
    geometry.setAttribute('position', new BufferAttribute(this.positions, 3))
    geometry.setAttribute('aTangent', new BufferAttribute(this.tangents, 3))
    geometry.setAttribute('aStrip', new BufferAttribute(strip, 2))
    geometry.setIndex(index)
    this.material = createRibbonMaterial(look)
    this.mesh = new Mesh(geometry, this.material)
    this.mesh.frustumCulled = false
    this.mesh.renderOrder = 2
  }

  // Copies this.points (head first) into the vertex buffers.
  commit() {
    const { count, points, positions, tangents } = this
    for (let i = 0; i < count; i++) {
      const prev = Math.max(0, i - 1) * 3
      const next = Math.min(count - 1, i + 1) * 3
      const p = i * 3
      const tx = points[prev] - points[next]
      const ty = points[prev + 1] - points[next + 1]
      const tz = points[prev + 2] - points[next + 2]
      for (let k = 0; k < 2; k++) {
        const o = i * 6 + k * 3
        positions[o] = points[p]
        positions[o + 1] = points[p + 1]
        positions[o + 2] = points[p + 2]
        tangents[o] = tx
        tangents[o + 1] = ty
        tangents[o + 2] = tz
      }
    }
    const { attributes } = this.mesh.geometry
    attributes.position.needsUpdate = true
    attributes.aTangent.needsUpdate = true
  }

  dispose() {
    this.mesh.removeFromParent()
    this.mesh.geometry.dispose()
    this.material.dispose()
  }
}

// A fading trail: a fixed ring buffer of past positions sampled every
// duration / count seconds, with the head pinned to the current position.
export class Trail extends Ribbon {
  constructor({ count = 48, duration = 4, ...look } = {}) {
    super(count, look)
    this.interval = duration / (count - 1)
    this.ring = new Float32Array(count * 3)
    this.head = 0
    this.clock = 0
    this.primed = false
  }

  reset(position) {
    for (let i = 0; i < this.count; i++) {
      this.ring[i * 3] = position.x
      this.ring[i * 3 + 1] = position.y
      this.ring[i * 3 + 2] = position.z
    }
    this.clock = 0
    this.primed = true
  }

  update(position, dt) {
    if (!this.primed) this.reset(position)
    this.clock += dt
    if (this.clock >= this.interval) {
      this.clock %= this.interval
      this.head = (this.head + 1) % this.count
      const o = this.head * 3
      this.ring[o] = position.x
      this.ring[o + 1] = position.y
      this.ring[o + 2] = position.z
    }
    const { points, ring, count } = this
    points[0] = position.x
    points[1] = position.y
    points[2] = position.z
    for (let i = 1; i < count; i++) {
      const j = ((this.head - i + 1 + count) % count) * 3
      points[i * 3] = ring[j]
      points[i * 3 + 1] = ring[j + 1]
      points[i * 3 + 2] = ring[j + 2]
    }
    this.commit()
  }
}

const GLOW_VERTEX = /* glsl */ `
  uniform float uTime;
  uniform float uPxScale;
  uniform float uMinPx;
  uniform float uMaxPx;
  uniform float uLift;
  attribute vec3 aColor;
  attribute float aSize;
  attribute float aIntensity;
  attribute vec4 aBlink;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    // pulled towards the camera so a glow is never cut by the body it sits on
    mv.xyz += normalize(-mv.xyz) * min(uLift, -mv.z * 0.5);
    float px = aSize * uPxScale / max(-mv.z, 1e-3);
    float size = clamp(px, uMinPx, uMaxPx);
    float energy = clamp(px / uMinPx, 0.0, 1.0);
    float blink = 1.0;
    if (aBlink.x > 0.0) {
      float phase = fract(uTime / aBlink.x + aBlink.y);
      float on = smoothstep(0.0, 0.02, phase) * (1.0 - smoothstep(aBlink.z, aBlink.z + 0.04, phase));
      blink = mix(aBlink.w, 1.0, on);
    }
    vColor = aColor;
    vAlpha = aIntensity * blink * mix(0.35, 1.0, sqrt(energy));
    gl_PointSize = size;
    gl_Position = projectionMatrix * mv;
  }
`

const GLOW_FRAGMENT = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec2 p = gl_PointCoord * 2.0 - 1.0;
    float d2 = dot(p, p);
    if (d2 > 1.0) discard;
    float core = exp(-d2 * 14.0);
    float halo = exp(-d2 * 4.0) * 0.45 * (1.0 - d2);
    float alpha = (core + halo) * vAlpha;
    gl_FragColor = vec4(mix(vColor, vec3(1.0), core * 0.55), alpha);
    #include <colorspace_fragment>
  }
`

export function createGlowMaterial({ minPx = 2, maxPx = 160, lift = 0 } = {}) {
  return new ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uMinPx: { value: minPx },
      uMaxPx: { value: maxPx },
      uLift: { value: lift },
      uPxScale: SCREEN.uPxScale,
    },
    vertexShader: GLOW_VERTEX,
    fragmentShader: GLOW_FRAGMENT,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  })
}

const STEADY = [0, 0, 1, 1]

// A fixed set of glow points whose positions and intensities are rewritten
// in place every frame.
export class GlowPoints {
  constructor(count, look) {
    this.count = count
    this.positions = new Float32Array(count * 3)
    this.colors = new Float32Array(count * 3)
    this.sizes = new Float32Array(count)
    this.intensities = new Float32Array(count)
    this.blinks = new Float32Array(count * 4)
    const geometry = new BufferGeometry()
    geometry.setAttribute('position', new BufferAttribute(this.positions, 3))
    geometry.setAttribute('aColor', new BufferAttribute(this.colors, 3))
    geometry.setAttribute('aSize', new BufferAttribute(this.sizes, 1))
    geometry.setAttribute('aIntensity', new BufferAttribute(this.intensities, 1))
    geometry.setAttribute('aBlink', new BufferAttribute(this.blinks, 4))
    this.material = createGlowMaterial(look)
    this.points = new Points(geometry, this.material)
    this.points.frustumCulled = false
    this.points.renderOrder = 3
  }

  // blink = [period s (0 = steady), phase 0..1, duty 0..1, off level 0..1]
  define(i, { color, size, intensity = 1, blink = STEADY }) {
    const c = new Color(color)
    this.colors.set([c.r, c.g, c.b], i * 3)
    this.sizes[i] = size
    this.intensities[i] = intensity
    this.blinks.set(blink, i * 4)
    const { attributes } = this.points.geometry
    attributes.aColor.needsUpdate = true
    attributes.aSize.needsUpdate = true
    attributes.aBlink.needsUpdate = true
    attributes.aIntensity.needsUpdate = true
  }

  setPosition(i, v) {
    this.positions[i * 3] = v.x
    this.positions[i * 3 + 1] = v.y
    this.positions[i * 3 + 2] = v.z
  }

  commit() {
    this.points.geometry.attributes.position.needsUpdate = true
    this.points.geometry.attributes.aIntensity.needsUpdate = true
  }

  dispose() {
    this.points.removeFromParent()
    this.points.geometry.dispose()
    this.material.dispose()
  }
}
