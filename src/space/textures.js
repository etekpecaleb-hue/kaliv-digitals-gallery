// GPU procedural texture baker. Each recipe (textureRecipes.js) is evaluated
// per texel on the unit-sphere direction and rendered into an equirectangular
// render target that matches SphereGeometry's UVs, so maps are seamless.
//
// Bakes are lazy: one job at a time, its shader compiled asynchronously
// (KHR_parallel_shader_compile when available), then rendered a strip of rows
// per frame so start-up never stalls. Textures are usable immediately; the
// job's `done` flag flips (and onDone fires) when the last strip lands.
import {
  ClampToEdgeWrapping,
  LinearFilter,
  LinearMipmapLinearFilter,
  LinearSRGBColorSpace,
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  RepeatWrapping,
  SRGBColorSpace,
  Scene,
  ShaderMaterial,
  WebGLRenderTarget,
} from 'three'
import { NOISE_GLSL } from './noise.glsl.js'
import { RECIPES, SPHERE_GLSL } from './textureRecipes.js'

export { RECIPES }

const VERTEX = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

const COMMON = /* glsl */ `
  varying vec2 vUv;
  uniform float uBump;
  uniform float uEps;
  ${NOISE_GLSL}
  ${SPHERE_GLSL}

  vec3 srgbToLinear(vec3 c) {
    return mix(c / 12.92, pow((c + 0.055) / 1.055, vec3(2.4)), step(0.04045, c));
  }

  // Inverse of SphereGeometry's mapping: u = longitude, v = 1 - colatitude / PI.
  vec3 uvToDir(vec2 uv) {
    float phi = uv.x * TAU;
    float theta = (1.0 - uv.y) * PI;
    return vec3(-cos(phi) * sin(theta), cos(theta), sin(phi) * sin(theta));
  }
`

const MAINS = {
  albedo: /* glsl */ `
    void main() {
      vec3 col;
      float h;
      surface(uvToDir(vUv), col, h);
      gl_FragColor = vec4(srgbToLinear(clamp(col, 0.0, 1.0)), 1.0);
    }
  `,
  // Tangent-space normal: x along increasing u (east), y along increasing v (north).
  normal: /* glsl */ `
    void main() {
      vec3 p = uvToDir(vUv);
      vec3 east = vec3(p.z, 0.0, -p.x);
      float len = length(east);
      east = len > 1e-5 ? east / len : vec3(1.0, 0.0, 0.0);
      vec3 north = cross(p, east);
      vec3 col;
      float h0;
      float he;
      float hn;
      surface(p, col, h0);
      surface(normalize(p + east * uEps), col, he);
      surface(normalize(p + north * uEps), col, hn);
      vec2 slope = vec2(he - h0, hn - h0) / uEps * uBump;
      gl_FragColor = vec4(normalize(vec3(-slope, 1.0)) * 0.5 + 0.5, 1.0);
    }
  `,
  data: /* glsl */ `
    void main() {
      gl_FragColor = bake(uvToDir(vUv));
    }
  `,
}

// Relative per-texel cost of a pass, used to size the strips.
const PASS_COST = { albedo: 1, normal: 3, data: 1 }

export class TextureBaker {
  jobs = []
  active = null
  stats = []
  paused = false

  constructor(renderer, { coarse = false, profile = false } = {}) {
    this.renderer = renderer
    this.coarse = coarse
    this.profile = profile
    this.width = coarse ? 512 : 1024
    this.height = coarse ? 256 : 512
    // texels per frame; phones get a quarter of the desktop budget
    this.budget = coarse ? 65536 : 262144
    this.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy())
    this.parallelCompile = Boolean(renderer.compileAsync) && renderer.extensions.has('KHR_parallel_shader_compile')
    this.scene = new Scene()
    this.camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1)
    this.quad = new Mesh(new PlaneGeometry(2, 2))
    this.quad.frustumCulled = false
    this.scene.add(this.quad)
  }

  get pending() {
    let count = 0
    for (const job of this.jobs) if (!job.done) count++
    return count
  }

  // Queues `pass` ('albedo' | 'normal' | 'data') of `recipe` (a key of RECIPES or
  // a recipe object) and returns the job; job.texture is valid right away.
  // options: { width, height, mipmaps, colorSpace, priority() → lower first, onDone }
  bake(recipe, pass, options = {}) {
    const def = typeof recipe === 'string' ? RECIPES[recipe] : recipe
    const name = typeof recipe === 'string' ? recipe : (def.name ?? 'custom')
    const width = options.width ?? this.width
    const height = options.height ?? this.height
    const mipmaps = options.mipmaps ?? true
    const colorSpace = options.colorSpace ?? (pass === 'albedo' ? SRGBColorSpace : LinearSRGBColorSpace)
    const target = new WebGLRenderTarget(width, height, {
      depthBuffer: false,
      generateMipmaps: mipmaps,
      minFilter: mipmaps ? LinearMipmapLinearFilter : LinearFilter,
      magFilter: LinearFilter,
      wrapS: RepeatWrapping,
      wrapT: ClampToEdgeWrapping,
      colorSpace,
      anisotropy: mipmaps ? this.anisotropy : 1,
    })
    target.texture.name = `${name}-${pass}`
    const job = {
      name,
      pass,
      def,
      target,
      texture: target.texture,
      rowsPerStep: Math.max(8, Math.min(height, Math.round(this.budget / (width * PASS_COST[pass])))),
      row: 0,
      state: 'queued',
      done: false,
      priority: options.priority ?? (() => 0),
      onDone: options.onDone ?? null,
      material: null,
      startedAt: 0,
      gpuMs: 0,
      steps: 0,
    }
    this.jobs.push(job)
    return job
  }

  // Advances the bake queue by one step; call once per frame.
  update() {
    if (this.paused) return
    if (!this.active) this.active = this.nextJob()
    const job = this.active
    if (!job) return
    if (job.state === 'queued') this.compile(job)
    if (job.state === 'ready') this.renderStrip(job)
  }

  // Bakes everything (or the jobs `filter` accepts) right now. Blocks; QA only.
  flush(filter = null) {
    for (const job of this.jobs) {
      if (job.done || (filter && !filter(job))) continue
      if (!job.material) job.material = this.createMaterial(job)
      if (!job.startedAt) job.startedAt = performance.now()
      job.state = 'ready'
      while (!job.done) this.renderStrip(job)
    }
    if (this.active?.done) this.active = null
  }

  nextJob() {
    let best = null
    let bestPriority = Infinity
    for (const job of this.jobs) {
      if (job.state !== 'queued') continue
      const priority = job.priority()
      if (priority < bestPriority) {
        best = job
        bestPriority = priority
      }
    }
    return best
  }

  createMaterial(job) {
    return new ShaderMaterial({
      name: `bake-${job.name}-${job.pass}`,
      uniforms: {
        uBump: { value: job.def.bump ?? 1 },
        uEps: { value: (Math.PI * 2) / job.target.width },
      },
      vertexShader: VERTEX,
      fragmentShader: `${COMMON}\n${job.def.glsl}\n${MAINS[job.pass]}`,
      depthTest: false,
      depthWrite: false,
    })
  }

  compile(job) {
    job.material = this.createMaterial(job)
    job.state = 'compiling'
    job.startedAt = performance.now()
    this.quad.material = job.material
    const ready = () => {
      job.compileMs = performance.now() - job.startedAt
      if (job.state === 'compiling') job.state = 'ready'
    }
    // without the extension compileAsync only polls (and warns): compile now
    if (this.parallelCompile) this.renderer.compileAsync(this.quad, this.camera, this.scene).then(ready, ready)
    else ready()
  }

  renderStrip(job) {
    const { renderer, quad } = this
    const target = job.target
    const rows = Math.min(job.rowsPerStep, target.height - job.row)
    const started = this.profile ? performance.now() : 0
    target.scissor.set(0, job.row, target.width, rows)
    target.scissorTest = true
    quad.material = job.material
    const previousTarget = renderer.getRenderTarget()
    const previousAutoClear = renderer.autoClear
    renderer.autoClear = false
    renderer.setRenderTarget(target)
    renderer.render(this.scene, this.camera)
    renderer.setRenderTarget(previousTarget)
    renderer.autoClear = previousAutoClear
    if (this.profile) {
      renderer.getContext().finish()
      job.gpuMs += performance.now() - started
    }
    job.row += rows
    job.steps++
    if (job.row >= target.height) this.finish(job)
  }

  finish(job) {
    job.state = 'done'
    job.done = true
    job.target.scissorTest = false
    job.material.dispose()
    job.material = null
    if (this.active === job) this.active = null
    this.stats.push({
      texture: `${job.name}-${job.pass}`,
      size: `${job.target.width}x${job.target.height}`,
      steps: job.steps,
      compileMs: Math.round(job.compileMs ?? 0),
      bakeMs: this.profile ? Math.round(job.gpuMs) : undefined,
      totalMs: Math.round(performance.now() - job.startedAt),
    })
    job.onDone?.(job)
  }

  // Drops a job (queued or done) and frees its texture.
  release(job) {
    const index = this.jobs.indexOf(job)
    if (index < 0) return
    this.jobs.splice(index, 1)
    if (this.active === job) this.active = null
    job.material?.dispose()
    job.material = null
    job.state = 'released'
    job.done = true
    job.target.dispose()
  }

  dispose() {
    for (const job of this.jobs) {
      job.material?.dispose()
      job.target.dispose()
    }
    this.jobs.length = 0
    this.quad.geometry.dispose()
  }
}
