// The Sun: an animated surface (baked granulation drifting in two crossfaded
// layers, limb darkening, a white-hot core) and SunCorona, one camera-facing
// additive quad that draws the inner glow, the streamer corona and soft flare
// streaks. Glow and streaks are sized in screen pixels, so the Sun reads as a
// blinding star from far away and as a sensible ball of fire up close.
import { AdditiveBlending, Color, Mesh, PlaneGeometry, ShaderMaterial, SphereGeometry, Vector2 } from 'three'
import { SIMPLEX_GLSL } from './noise.glsl.js'
import { clamp } from '../core/math.js'

const SURFACE_VERTEX = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vWorldPos;
  void main() {
    vUv = uv;
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorldPos = world.xyz;
    vNormalW = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`

const SURFACE_FRAGMENT = /* glsl */ `
  uniform sampler2D uMap;
  uniform float uMapMix;
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vWorldPos;

  vec3 heatColor(float heat) {
    vec3 c = mix(vec3(0.82, 0.24, 0.04), vec3(1.0, 0.56, 0.16), smoothstep(0.12, 0.42, heat));
    c = mix(c, vec3(1.0, 0.82, 0.5), smoothstep(0.4, 0.68, heat));
    return mix(c, vec3(1.0, 0.97, 0.9), smoothstep(0.66, 0.95, heat));
  }

  void main() {
    vec3 N = normalize(vNormalW);
    float mu = clamp(dot(N, normalize(cameraPosition - vWorldPos)), 0.0, 1.0);
    // two drifting granulation layers, crossfaded so the drift never resets visibly
    float cycle = uTime * 0.035;
    float phaseA = fract(cycle);
    float phaseB = fract(cycle + 0.5);
    vec4 base = texture2D(uMap, vUv);
    vec2 flow = (base.ga - 0.5) * vec2(0.03, 0.012);
    float a = texture2D(uMap, vUv + flow * phaseA).r;
    float b = texture2D(uMap, vUv + vec2(0.5, 0.0) - flow * phaseB).r;
    float granules = mix(0.5, mix(a, b, abs(phaseA * 2.0 - 1.0)), uMapMix);
    float mottle = mix(0.5, base.g, uMapMix);
    float spots = base.b * uMapMix;
    float faculae = base.a * uMapMix;

    // limb darkening (Eddington-like), then granulation, mottling and spots
    float limb = 1.0 - 0.56 * (1.0 - mu) - 0.24 * (1.0 - mu) * (1.0 - mu);
    float heat = limb * (0.86 + 0.36 * (granules - 0.5) + 0.18 * (mottle - 0.5));
    heat = heat * (1.0 - 0.66 * spots) + faculae * 0.18 * (1.0 - mu);
    // the centre peaks just under white so granulation stays visible up close
    vec3 color = heatColor(heat) * (0.32 + 0.78 * heat);
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`

// Builds the Sun's mesh (unit sphere scaled to the radius) for planets.js.
export function createSunSurface(def, { coarse = false } = {}) {
  const uniforms = {
    uMap: { value: null },
    uMapMix: { value: 0 },
    uTime: { value: 0 },
  }
  const material = new ShaderMaterial({
    name: 'sun-surface',
    uniforms,
    vertexShader: SURFACE_VERTEX,
    fragmentShader: SURFACE_FRAGMENT,
  })
  const mesh = new Mesh(new SphereGeometry(1, coarse ? 64 : 96, coarse ? 32 : 48), material)
  mesh.scale.setScalar(def.radius)
  mesh.name = 'sun-surface'
  return { mesh, uniforms }
}

const CORONA_VERTEX = /* glsl */ `
  uniform float uRadius;
  uniform float uViewportHeight;
  uniform float uStreakPx;
  varying vec2 vPx;
  varying vec2 vQuad;
  varying float vSunPx;
  void main() {
    vec4 center = modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0);
    float dist = length(center.xyz);
    float focal = projectionMatrix[1][1] * 0.5 * uViewportHeight;
    float sunPx = uRadius / sqrt(max(dist * dist - uRadius * uRadius, 1.0)) * focal;
    // sit just in front of the Sun so the sphere never hides the glow
    vec3 anchor = center.xyz - center.xyz / dist * uRadius * 1.04;
    // big enough for the corona and for the streak to fade out completely
    float halfPx = min(max(sunPx * 5.0, uStreakPx * 2.3), uViewportHeight * 4.0);
    vec3 offset = vec3(position.xy * halfPx * (-anchor.z / focal), 0.0);
    vPx = position.xy * halfPx;
    vQuad = position.xy;
    vSunPx = sunPx;
    gl_Position = anchor.z < -0.01 ? projectionMatrix * vec4(anchor + offset, 1.0) : vec4(2.0, 2.0, 2.0, 1.0);
  }
`

// Three layers: the corona itself (sized in solar radii, so it grows as you
// approach), lens glare round the disc (sized in pixels and capped, so a Sun
// that fills the view never washes the whole frame) and flare streaks (a
// soft anamorphic line plus six faint rays) that matter most from afar.
const CORONA_FRAGMENT = /* glsl */ `
  uniform float uTime;
  uniform float uFlare;
  uniform float uGlow;
  uniform float uStreakPx;
  uniform float uViewportHeight;
  uniform float uPixelRatio;
  uniform vec3 uStreakColor;
  varying vec2 vPx;
  varying vec2 vQuad;
  varying float vSunPx;
  ${SIMPLEX_GLSL}

  void main() {
    float len = length(vPx);
    float r = len / vSunPx;
    float outside = max(r - 1.0, 0.0);
    float outsidePx = max(len - vSunPx, 0.0);
    float overDisc = 1.0 - smoothstep(0.92, 1.0, r);

    vec3 glow = vec3(0.0);
    if (outside < 4.0) {
      // streamers: noise around the rim, slowly evolving
      vec2 dir = vPx / max(len, 1e-3);
      float s = 0.5 + 0.5 * snoise(vec3(dir * 1.7, uTime * 0.02));
      s = 0.6 * s + 0.4 * (0.5 + 0.5 * snoise(vec3(dir * 4.5, uTime * 0.035 + 3.0)));
      float inner = exp(-outside * 7.0);
      float corona = exp(-outside / (0.12 + 0.5 * s * s)) * (0.4 + 0.6 * s);
      glow = vec3(1.0, 0.93, 0.8) * inner * 0.7 + vec3(1.0, 0.76, 0.45) * corona * 0.36;
    }
    float glareRadius = min(0.035 * uViewportHeight + 0.22 * vSunPx, 0.09 * uViewportHeight);
    float glare = exp(-outsidePx / glareRadius) * 0.3 + exp(-outsidePx / (glareRadius * 3.5)) * 0.035;
    glow += vec3(1.0, 0.84, 0.62) * glare;
    glow *= mix(1.0, 0.05, overDisc);

    // flare streaks, in pixels
    float px = uPixelRatio;
    float streakLength = uStreakPx + vSunPx;
    float streak = exp(-abs(vPx.y) / (1.2 * px + vSunPx * 0.02)) * exp(-pow(abs(vPx.x) / streakLength, 1.5) * 2.6);
    float rays = 0.0;
    float rayLength = 0.35 * uStreakPx + 0.6 * vSunPx;
    for (int i = 0; i < 3; i++) {
      float a = 0.35 + float(i) * 1.0471976;
      vec2 axis = vec2(cos(a), sin(a));
      float across = abs(dot(vPx, vec2(-axis.y, axis.x)));
      float along = abs(dot(vPx, axis));
      rays += exp(-across / (0.8 * px + vSunPx * 0.006)) * exp(-along / rayLength);
    }
    vec3 flare = uStreakColor * streak * 0.3 + vec3(1.0, 0.93, 0.82) * rays * 0.1;
    // everything fades out before the quad's edge
    float edge = 1.0 - smoothstep(0.8, 1.0, max(abs(vQuad.x), abs(vQuad.y)));
    vec3 color = (glow + flare * uFlare * (1.0 - overDisc * 0.85)) * uGlow * edge;
    gl_FragColor = vec4(color, 1.0);
    #include <colorspace_fragment>
  }
`

export class SunCorona {
  uniforms = {
    uRadius: { value: 48 },
    uViewportHeight: { value: 800 },
    uStreakPx: { value: 400 },
    uPixelRatio: { value: 1 },
    uTime: { value: 0 },
    uFlare: { value: 1 },
    uGlow: { value: 1 },
    uStreakColor: { value: new Color('#9cc7ff') },
  }
  viewport = new Vector2()

  constructor(system) {
    this.system = system
    this.renderer = system.renderer
    this.uniforms.uRadius.value = system.sun.radius
    const material = new ShaderMaterial({
      name: 'sun-corona',
      uniforms: this.uniforms,
      vertexShader: CORONA_VERTEX,
      fragmentShader: CORONA_FRAGMENT,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
    })
    this.mesh = new Mesh(new PlaneGeometry(2, 2), material)
    this.mesh.name = 'sun-corona'
    this.mesh.frustumCulled = false
    this.mesh.renderOrder = 2
    system.sun.object3D.add(this.mesh)
  }

  update(time, dt, ctx) {
    const u = this.uniforms
    this.renderer.getDrawingBufferSize(this.viewport)
    u.uViewportHeight.value = this.viewport.y
    u.uPixelRatio.value = this.renderer.getPixelRatio()
    u.uStreakPx.value = Math.max(this.viewport.x, this.viewport.y) * 0.16
    if (!ctx.reduced) u.uTime.value += dt
    // the closer we get, the less the lens flare matters
    const distance = ctx.camera.position.distanceTo(ctx.sunPosition)
    const angular = this.system.sun.radius / Math.max(distance, 1)
    u.uFlare.value = clamp(1.15 - angular * 2.6, 0.3, 1)
  }

  dispose() {
    this.mesh.removeFromParent()
    this.mesh.geometry.dispose()
    this.mesh.material.dispose()
  }
}
