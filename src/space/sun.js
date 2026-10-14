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

    float limb = 1.0 - 0.6 * (1.0 - mu) - 0.2 * (1.0 - mu) * (1.0 - mu);
    float heat = limb * (0.9 + 0.3 * (granules - 0.5) + 0.16 * (mottle - 0.5));
    heat = heat * (1.0 - 0.62 * spots) + faculae * 0.16 * (1.0 - mu);
    vec3 color = heatColor(heat) * (0.55 + 1.05 * heat);
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
  varying float vSunPx;
  void main() {
    vec4 center = modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0);
    float dist = length(center.xyz);
    float focal = projectionMatrix[1][1] * 0.5 * uViewportHeight;
    float sunPx = uRadius / sqrt(max(dist * dist - uRadius * uRadius, 1.0)) * focal;
    // sit just in front of the Sun so the sphere never hides the glow
    vec3 anchor = center.xyz - center.xyz / dist * uRadius * 1.04;
    float halfPx = min(max(sunPx * 7.0, uStreakPx), uViewportHeight * 4.0);
    vec3 offset = vec3(position.xy * halfPx * (-anchor.z / focal), 0.0);
    vPx = position.xy * halfPx;
    vSunPx = sunPx;
    gl_Position = anchor.z < -0.01 ? projectionMatrix * vec4(anchor + offset, 1.0) : vec4(2.0, 2.0, 2.0, 1.0);
  }
`

const CORONA_FRAGMENT = /* glsl */ `
  uniform float uTime;
  uniform float uFlare;
  uniform float uGlow;
  uniform float uStreakPx;
  uniform float uPixelRatio;
  uniform vec3 uStreakColor;
  varying vec2 vPx;
  varying float vSunPx;
  ${SIMPLEX_GLSL}

  void main() {
    float len = length(vPx);
    float r = len / vSunPx;
    float outside = max(r - 1.0, 0.0);
    vec2 dir = vPx / max(len, 1e-3);
    // streamers: noise around the rim, slowly evolving
    float s = 0.5 + 0.5 * snoise(vec3(dir * 1.7, uTime * 0.02));
    s = 0.6 * s + 0.4 * (0.5 + 0.5 * snoise(vec3(dir * 4.5, uTime * 0.035 + 3.0)));
    float inner = exp(-outside * 6.0);
    float corona = exp(-outside / (0.18 + 0.6 * s * s)) * (0.45 + 0.55 * s);
    float halo = 1.0 / (1.0 + outside * outside * 3.0);
    float overDisc = 1.0 - smoothstep(0.9, 1.0, r);
    vec3 glow = vec3(1.0, 0.95, 0.85) * inner * 0.8 + vec3(1.0, 0.78, 0.48) * corona * 0.42 + vec3(1.0, 0.62, 0.32) * halo * 0.09;
    glow *= mix(1.0, 0.18, overDisc);

    // flare: a soft anamorphic streak plus six faint diffraction rays (pixels)
    float px = uPixelRatio;
    float streak = exp(-abs(vPx.y) / (1.4 * px + vSunPx * 0.035)) * exp(-pow(abs(vPx.x) / uStreakPx, 1.3) * 2.2);
    float rays = 0.0;
    for (int i = 0; i < 3; i++) {
      float a = 0.35 + float(i) * 1.0471976;
      vec2 axis = vec2(cos(a), sin(a));
      float across = abs(dot(vPx, vec2(-axis.y, axis.x)));
      float along = abs(dot(vPx, axis));
      rays += exp(-across / (0.9 * px + vSunPx * 0.01)) * exp(-along / (uStreakPx * 0.22 + vSunPx));
    }
    float core = exp(-outside * 1.6) * 0.25;
    vec3 flare = uStreakColor * streak * 0.6 + vec3(1.0, 0.93, 0.82) * (rays * 0.22 + core);
    vec3 color = (glow + flare * uFlare * (1.0 - overDisc * 0.6)) * uGlow;
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
    u.uStreakPx.value = Math.max(this.viewport.x, this.viewport.y) * 0.42
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
