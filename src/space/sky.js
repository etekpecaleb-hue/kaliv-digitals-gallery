// Background sky: an inverted dome that follows the camera (stars at infinity)
// with a milky-way band, dust lanes and a few soft nebulae baked once into an
// equirectangular texture, plus a per-pixel haze of tiny stars. One draw call,
// drawn first, writes no depth, faint enough for the twinkling starfield.
import { AdditiveBlending, BackSide, Mesh, ShaderMaterial, SphereGeometry, Vector2 } from 'three'
import { HASH_GLSL } from './noise.glsl.js'
import { TextureBaker } from './textures.js'

// Directions are scene coordinates (ecliptic plane = XZ, ecliptic north = +Y).
// The galactic plane sits ~60° to the ecliptic, its centre towards Sagittarius.
const GALACTIC_POLE = [-0.8677, 0.4972, 0.0003]
const GALACTIC_CENTER = [-0.0549, -0.0965, 0.9938]
// Stored values are sqrt(colour * GAIN): dark gradients keep their precision.
const GAIN = 9

const vec3 = ([x, y, z]) => `vec3(${x.toFixed(4)}, ${y.toFixed(4)}, ${z.toFixed(4)})`

const SKY_RECIPE = {
  name: 'sky',
  kind: 'data',
  glsl: /* glsl */ `
    float nebula(vec3 d, vec3 center, float size, float seed) {
      float a = angleTo(d, normalize(center)) / size;
      if (a > 2.4) return 0.0;
      vec3 q = warp3(d * 2.2 + seed, 1.1, 0.5);
      float cloud = sstep(-0.25, 0.65, fbm(q * 1.3, 5));
      float wisps = ridged(q * 1.8 + seed, 4);
      return cloud * (0.45 + 0.7 * wisps * wisps) * exp(-a * a * 1.3);
    }

    vec4 bake(vec3 d) {
      vec3 pole = ${vec3(GALACTIC_POLE)};
      vec3 center = ${vec3(GALACTIC_CENTER)};
      vec3 side = cross(pole, center);
      float b = asin(clamp(dot(d, pole), -1.0, 1.0));
      float l = atan(dot(d, side), dot(d, center));

      // star clouds at three scales: big clouds, knots and a fine grain
      float clouds = 0.5 + 0.5 * fbm(d * 4.0 + 2.0, 6);
      float knots = 0.5 + 0.5 * fbm(d * 11.0 + 5.0, 5);
      float grain = 0.5 + 0.5 * fbm(d * 34.0, 3);
      float bw = b + 0.03 * fbm(d * 3.0 + 7.0, 4);
      float core = exp(-pow(bw / 0.11, 2.0));
      float wide = exp(-pow(bw / 0.3, 2.0));
      float bulge = exp(-(l * l) / 0.16 - (bw * bw) / 0.03);
      float toCenter = 0.5 + 0.5 * cos(l);
      float density = core * pow(clouds, 1.6) * 1.8 * (0.6 + 0.8 * knots) + wide * 0.12 * clouds;
      density *= 0.4 + 0.6 * toCenter;
      density += bulge * (0.8 + 0.6 * knots);
      density *= 0.75 + 0.5 * grain;

      // dust lanes, and the Great Rift splitting the band towards the centre
      float lanes = sstep(0.5, 0.85, ridged(d * 3.6 + 2.0, 5)) * exp(-pow(bw / 0.08, 2.0));
      float rift = exp(-pow((bw + 0.012 + 0.02 * sin(l * 3.0)) / 0.028, 2.0)) * band(l, -0.9, 1.2, 0.35);
      float dust = clamp(lanes * 0.7 + rift * (0.55 + 0.35 * knots), 0.0, 0.9);
      float stars = density;
      density *= 1.0 - dust;

      vec3 cool = vec3(0.62, 0.72, 1.0);
      vec3 warm = vec3(1.0, 0.86, 0.7);
      // kept dim and cool so the band sits behind the twinkling stars and the FUI blues
      vec3 color = mix(cool, warm, clamp(bulge * 1.2 + core * toCenter * 0.15, 0.0, 1.0)) * density * 0.018;
      // a few soft nebulae in signal blues, violet and teal
      color += vec3(0.14, 0.3, 1.0) * nebula(d, vec3(0.62, 0.28, 0.73), 0.32, 1.0) * 0.018;
      color += vec3(0.42, 0.22, 0.95) * nebula(d, vec3(-0.75, -0.35, 0.56), 0.26, 4.0) * 0.016;
      color += vec3(0.08, 0.55, 0.62) * nebula(d, vec3(0.2, -0.62, -0.75), 0.3, 7.0) * 0.013;
      color += vec3(0.25, 0.32, 0.95) * nebula(d, vec3(-0.35, 0.82, -0.45), 0.24, 9.0) * 0.01;
      // unresolved stars: a faint grain that follows the band
      color += cool * pow(0.5 + 0.5 * snoise(d * 90.0), 6.0) * (0.002 + 0.01 * stars);
      return vec4(sqrt(color * ${GAIN.toFixed(1)}), clamp(0.18 + stars * 0.8, 0.0, 1.0));
    }
  `,
}

const DOME_VERTEX = /* glsl */ `
  varying vec3 vDir;
  void main() {
    vDir = position;
    gl_Position = projectionMatrix * viewMatrix * vec4(cameraPosition + position * 100.0, 1.0);
  }
`

const DOME_FRAGMENT = /* glsl */ `
  #define PI 3.141592653589793
  uniform sampler2D uSky;
  uniform float uReady;
  uniform float uStarScale;
  uniform float uStarPixel;
  uniform float uOpacity;
  varying vec3 vDir;
  ${HASH_GLSL}

  void main() {
    vec3 d = normalize(vDir);
    vec2 uv = vec2(fract(atan(d.z, -d.x) / (2.0 * PI)), 1.0 - acos(clamp(d.y, -1.0, 1.0)) / PI);
    vec4 sky = texture2D(uSky, uv);
    vec3 color = sky.rgb * sky.rgb * (uReady / ${GAIN.toFixed(1)});
    float density = mix(0.3, sky.a, uReady);

    // tiny stars: one candidate per cell of a 3D grid, kept near the sphere
    vec3 q = d * uStarScale;
    vec3 cell = floor(q);
    vec3 h = hash33(cell);
    vec3 star = cell + 0.25 + 0.5 * h;
    float shell = abs(length(star) - uStarScale);
    float present = step(shell, 0.22) * step(hash13(cell + 17.0), 0.06 + 0.5 * density * density);
    float dist = length(cross(d, normalize(star))) * uStarScale / uStarPixel;
    float bright = 0.1 + 0.9 * pow(h.z, 8.0);
    vec3 tint = mix(vec3(0.72, 0.8, 1.0), vec3(1.0, 0.9, 0.78), h.x);
    color += tint * present * bright * exp(-dist * dist * 2.2) * 0.32;

    // dither so the faint gradients don't band in 8 bits
    gl_FragColor = vec4(color * uOpacity, 1.0);
    #include <colorspace_fragment>
    gl_FragColor.rgb += (hash13(vec3(gl_FragCoord.xy, 3.0)) - 0.5) / 255.0;
  }
`

export class Sky {
  uniforms = {
    uSky: { value: null },
    uReady: { value: 0 },
    uStarScale: { value: 300 },
    uStarPixel: { value: 0.2 },
    uOpacity: { value: 1 },
  }
  viewport = new Vector2()

  constructor(system) {
    this.system = system
    this.renderer = system.renderer
    const shared = system.visuals?.baker
    this.baker = shared ?? new TextureBaker(system.renderer, { coarse: system.coarse })
    this.ownsBaker = !shared
    const width = system.coarse ? 1024 : 2048
    this.job = this.baker.bake(SKY_RECIPE, 'data', { width, height: width / 2, mipmaps: false, priority: () => -1 })
    this.uniforms.uSky.value = this.job.texture

    const material = new ShaderMaterial({
      name: 'sky-dome',
      uniforms: this.uniforms,
      vertexShader: DOME_VERTEX,
      fragmentShader: DOME_FRAGMENT,
      side: BackSide,
      depthTest: false,
      depthWrite: false,
      blending: AdditiveBlending,
    })
    this.mesh = new Mesh(new SphereGeometry(1, 32, 16), material)
    this.mesh.name = 'sky-dome'
    this.mesh.frustumCulled = false
    this.mesh.renderOrder = -1000
    system.group.add(this.mesh)
  }

  update(time, dt, ctx) {
    if (this.ownsBaker) this.baker.update()
    const u = this.uniforms
    if (this.job.done && u.uReady.value < 1) u.uReady.value = Math.min(1, u.uReady.value + dt / 1.2)
    // size the star grid so a cell spans ~5 device pixels on this screen
    this.renderer.getDrawingBufferSize(this.viewport)
    const camera = ctx.camera
    const pixelAngle = (2 * Math.tan(((camera.fov ?? 40) * Math.PI) / 360)) / Math.max(this.viewport.y, 1)
    const scale = Math.round(1 / (pixelAngle * 5) / 16) * 16
    u.uStarScale.value = scale
    u.uStarPixel.value = pixelAngle * scale
  }

  dispose() {
    this.mesh.removeFromParent()
    this.mesh.geometry.dispose()
    this.mesh.material.dispose()
    if (this.ownsBaker) this.baker.dispose()
    else this.baker.release(this.job)
  }
}
