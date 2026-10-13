// The intro wordmark: the text is rasterised, sampled into a few thousand
// points that spiral into the letters, then overlaid by a glowing text plane.
// Both live in the stage's screen-space overlay scene (1 unit = 1 CSS pixel).
import {
  AdditiveBlending,
  BufferGeometry,
  CanvasTexture,
  Color,
  Float32BufferAttribute,
  LinearFilter,
  Mesh,
  PlaneGeometry,
  Points,
  SRGBColorSpace,
  ShaderMaterial,
} from 'three'
import { seededRandom } from '../core/math.js'
import { PARTICLE_FRAGMENT, PARTICLE_VERTEX, TEXT_FRAGMENT, TEXT_VERTEX } from './wordShaders.js'

export class WordParticles {
  uniforms = {
    uProgress: { value: 0 },
    uExplode: { value: 0 },
    uTime: { value: 0 },
    uPixelRatio: { value: 1 },
    uScan: { value: 0 },
    uSpan: { value: 400 },
    uOpacity: { value: 1 },
    uColorA: { value: new Color('#5b9bff') },
    uColorB: { value: new Color('#ffffff') },
  }
  textUniforms = {
    uMap: { value: null },
    uOpacity: { value: 0 },
    uGlitch: { value: 0 },
    uTime: { value: 0 },
  }
  stage
  text
  family
  letterSpacing = 0.08
  points = null
  plane = null
  stopFrame = null

  constructor(stage, text, family) {
    this.stage = stage
    this.text = text
    this.family = family
    this.stopFrame = stage.onFrame((time) => {
      this.uniforms.uTime.value = time
      this.textUniforms.uTime.value = time
    })
  }

  // Font size at which the word spans `width` px, within [18, maxSize].
  fitFontSize(width, maxSize) {
    const ctx = document.createElement('canvas').getContext('2d')
    ctx.font = `600 100px "${this.family}"`
    const width100 = this.measure(ctx, 100)
    return Math.max(18, Math.min(maxSize, (width / width100) * 100))
  }

  // Builds the word centred on the viewport point (x, y).
  build({ x, y, fontSize }) {
    this.clear()
    const pad = Math.ceil(fontSize * 0.5)
    const probe = document.createElement('canvas').getContext('2d')
    probe.font = `600 ${fontSize}px "${this.family}"`
    const textWidth = this.measure(probe, fontSize)
    const capHeight = probe.measureText('H').actualBoundingBoxAscent || fontSize * 0.72
    const width = Math.ceil(textWidth + pad * 2)
    const height = Math.ceil(fontSize * 1.6)
    const baseline = height / 2 + capHeight / 2

    // Rasterise a coverage mask and sample it on a grid sized to the budget.
    const mask = document.createElement('canvas')
    mask.width = width
    mask.height = height
    const maskCtx = mask.getContext('2d', { willReadFrequently: true })
    maskCtx.fillStyle = '#fff'
    this.draw(maskCtx, fontSize, pad, baseline)
    const pixels = maskCtx.getImageData(0, 0, width, height).data
    let covered = 0
    for (let i = 3; i < pixels.length; i += 4) if (pixels[i] > 128) covered++
    const budget = this.stage.coarse ? 5000 : 11000
    const step = Math.max(1, Math.round(Math.sqrt(covered / budget)))

    const random = seededRandom(5)
    const targets = []
    const starts = []
    const seeds = []
    const left = x - this.stage.width / 2 - width / 2
    const top = this.stage.height / 2 - y + height / 2
    const spread = Math.max(this.stage.width, this.stage.height) * 0.62
    for (let row = 0; row < height; row += step) {
      for (let col = 0; col < width; col += step) {
        if (pixels[(row * width + col) * 4 + 3] <= 128) continue
        const tx = left + col + (random() - 0.5) * step * 0.8
        const ty = top - row + (random() - 0.5) * step * 0.8
        const angle = random() * Math.PI * 2
        const radius = spread * (0.45 + random() * 0.9)
        targets.push(tx, ty)
        // aStart is an offset from the target to a point on a wide ring.
        starts.push(Math.cos(angle) * radius - tx, Math.sin(angle) * radius - ty)
        // delay (left-to-right bias), size, phase, swirl
        seeds.push(random() * 0.6 + (col / width) * 0.4, random(), random(), random())
      }
    }

    const count = targets.length / 2
    const geometry = new BufferGeometry()
    geometry.setAttribute('position', new Float32BufferAttribute(new Float32Array(count * 3), 3))
    geometry.setAttribute('aTarget', new Float32BufferAttribute(targets, 2))
    geometry.setAttribute('aStart', new Float32BufferAttribute(starts, 2))
    geometry.setAttribute('aSeed', new Float32BufferAttribute(seeds, 4))
    const points = new Points(
      geometry,
      new ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: PARTICLE_VERTEX,
        fragmentShader: PARTICLE_FRAGMENT,
        transparent: true,
        depthTest: false,
        depthWrite: false,
        blending: AdditiveBlending,
      }),
    )
    points.frustumCulled = false
    points.renderOrder = 2
    this.uniforms.uSpan.value = width / 2
    this.uniforms.uPixelRatio.value = this.stage.pixelRatio

    // The solid text with a blue glow, drawn at device resolution.
    const ratio = this.stage.pixelRatio
    const canvas = document.createElement('canvas')
    canvas.width = Math.ceil(width * ratio)
    canvas.height = Math.ceil(height * ratio)
    const ctx = canvas.getContext('2d')
    ctx.scale(ratio, ratio)
    ctx.shadowColor = 'rgba(47, 123, 255, 0.95)'
    ctx.shadowBlur = fontSize * 0.28
    ctx.fillStyle = '#eef4ff'
    this.draw(ctx, fontSize, pad, baseline)
    ctx.shadowBlur = 0
    this.draw(ctx, fontSize, pad, baseline)
    const texture = new CanvasTexture(canvas)
    texture.colorSpace = SRGBColorSpace
    texture.minFilter = LinearFilter
    texture.generateMipmaps = false
    this.textUniforms.uMap.value = texture

    const plane = new Mesh(
      new PlaneGeometry(width, height),
      new ShaderMaterial({
        uniforms: this.textUniforms,
        vertexShader: TEXT_VERTEX,
        fragmentShader: TEXT_FRAGMENT,
        transparent: true,
        depthTest: false,
        depthWrite: false,
      }),
    )
    plane.position.set(x - this.stage.width / 2, this.stage.height / 2 - y, 0)
    plane.renderOrder = 1
    this.points = points
    this.plane = plane
    this.stage.overlay.add(plane, points)
  }

  dispose() {
    this.clear()
    this.stopFrame?.()
    this.stopFrame = null
  }

  clear() {
    for (const object of [this.points, this.plane]) {
      if (!object) continue
      object.removeFromParent()
      object.geometry.dispose()
      object.material.dispose()
    }
    this.textUniforms.uMap.value?.dispose()
    this.points = null
    this.plane = null
  }

  // Width of the text with the extra letter spacing.
  measure(ctx, fontSize) {
    let width = 0
    for (const char of this.text) width += ctx.measureText(char).width
    return width + this.letterSpacing * fontSize * (this.text.length - 1)
  }

  draw(ctx, fontSize, x, baseline) {
    ctx.font = `600 ${fontSize}px "${this.family}"`
    ctx.textBaseline = 'alphabetic'
    let cursor = x
    for (const char of this.text) {
      ctx.fillText(char, cursor, baseline)
      cursor += ctx.measureText(char).width + this.letterSpacing * fontSize
    }
  }
}
