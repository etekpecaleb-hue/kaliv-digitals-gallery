// Owns the renderer, the main scene/camera and a screen-space overlay scene,
// and drives every frame from gsap's ticker so tweens and rendering share a clock.
import { OrthographicCamera, PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import { gsap } from 'gsap'
import { lerp } from './math.js'

const CLEAR_COLOR = 0x04060d
// Longest step a frame may advance, so a backgrounded tab doesn't jump on return.
const MAX_STEP = 1 / 20

export class Stage {
  canvas
  renderer
  scene = new Scene()
  camera
  overlay = new Scene()
  overlayCamera
  coarse
  width = 1
  height = 1
  pixelRatio = 1
  fps = 60
  time = 0
  frameCallbacks = new Set()
  resizeCallbacks = new Set()

  constructor(canvas) {
    this.canvas = canvas
    this.renderer = new WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' })
    this.renderer.setClearColor(CLEAR_COLOR, 1)
    this.camera = new PerspectiveCamera(40, 1, 0.1, 4000)
    this.camera.position.set(0, 0, 60)
    this.overlayCamera = new OrthographicCamera(-1, 1, 1, -1, -10, 10)
    this.coarse = matchMedia('(pointer: coarse)').matches
    this.resize()
    addEventListener('resize', this.resize)
    gsap.ticker.add(this.tick)
  }

  // Both return an unsubscribe function.
  onFrame(callback) {
    this.frameCallbacks.add(callback)
    return () => this.frameCallbacks.delete(callback)
  }

  onResize(callback) {
    this.resizeCallbacks.add(callback)
    return () => this.resizeCallbacks.delete(callback)
  }

  // World position -> CSS pixel coordinates, written into `out`.
  project(position, out) {
    const ndc = position.clone().project(this.camera)
    out.x = (ndc.x * 0.5 + 0.5) * this.width
    out.y = (-ndc.y * 0.5 + 0.5) * this.height
    return out
  }

  // Short, human-readable GPU name for the intro readout.
  gpuLabel() {
    const gl = this.renderer.getContext()
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
    let label = String(
      (debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER)) ?? '',
    )
    const angle = label.match(/^ANGLE \((.*)\)$/)
    if (angle) label = angle[1].split(',')[1] ?? angle[1]
    label = label
      .replace(/ANGLE \w+ Renderer:\s*/i, '')
      .replace(/\(0x[0-9a-f]+\)/gi, '')
      .replace(/\s(Direct3D|vs_|ps_|OpenGL|Vulkan \d).*$/i, '')
      .trim()
    if (!label) return 'WebGL'
    return label.length > 28 ? `${label.slice(0, 27)}…` : label
  }

  resize = () => {
    const width = window.innerWidth
    const height = window.innerHeight
    this.width = width
    this.height = height
    this.pixelRatio = Math.min(window.devicePixelRatio || 1, this.coarse ? 1.75 : 2)
    this.renderer.setPixelRatio(this.pixelRatio)
    this.renderer.setSize(width, height, false)
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    Object.assign(this.overlayCamera, {
      left: -width / 2,
      right: width / 2,
      top: height / 2,
      bottom: -height / 2,
    })
    this.overlayCamera.updateProjectionMatrix()
    for (const callback of this.resizeCallbacks) callback(width, height)
  }

  tick = (_time, deltaMs) => {
    const dt = Math.min(deltaMs / 1000, MAX_STEP)
    this.time += dt
    if (dt > 0) this.fps = lerp(this.fps, 1 / dt, 0.05)
    for (const callback of this.frameCallbacks) callback(this.time, dt)
    this.renderer.autoClear = true
    this.renderer.render(this.scene, this.camera)
    if (this.overlay.children.length > 0) {
      this.renderer.autoClear = false
      this.renderer.clearDepth()
      this.renderer.render(this.overlay, this.overlayCamera)
    }
  }
}
