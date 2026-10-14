// The intro wordmark: a big title line and an optional small, widely tracked
// second line are rasterised together, sampled into a few thousand points that
// spiral into the letters, then overlaid by a glowing text plane.
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
import { clamp, seededRandom } from '../core/math.js'
import { PARTICLE_FRAGMENT, PARTICLE_VERTEX, TEXT_FRAGMENT, TEXT_VERTEX } from './wordShaders.js'

// Letter spacing of the title, in ems.
const TITLE_TRACKING = 0.08
// The second line's size relative to the title, and the range its letter
// spacing (in its own ems) may take while it is tracked out to the title's width.
const SUB_SCALE = 0.38
const SUB_TRACKING = [0.42, 1.3]
// Gap from the title's baseline to the second line's cap height, × title size.
const LINE_GAP = 0.32

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
  lines
  family
  probe = document.createElement('canvas').getContext('2d')
  points = null
  plane = null
  stopFrame = null

  // `text` is the title, or [title, second line].
  constructor(stage, text, family) {
    this.stage = stage
    this.lines = (Array.isArray(text) ? text : [text]).filter(Boolean)
    this.family = family
    this.stopFrame = stage.onFrame((time) => {
      this.uniforms.uTime.value = time
      this.textUniforms.uTime.value = time
    })
  }

  // Title size at which the wordmark spans `width` px, within [18, maxSize].
  fitFontSize(width, maxSize) {
    const width100 = this.layout(100).width
    return Math.max(18, Math.min(maxSize, (width / width100) * 100))
  }

  // Ink size of the whole wordmark at a title size.
  measure(fontSize) {
    const { width, height } = this.layout(fontSize)
    return { width, height }
  }

  // Builds the wordmark centred on the viewport point (x, y).
  build({ x, y, fontSize }) {
    this.clear()
    const layout = this.layout(fontSize)
    const padX = Math.ceil(fontSize * 0.5)
    const padY = Math.ceil(fontSize * 0.44)
    const width = Math.ceil(layout.width + padX * 2)
    const height = Math.ceil(layout.height + padY * 2)
    // rows below this belong to the second line
    const split = padY + layout.split

    // Rasterise a coverage mask and sample it on a grid sized to the budget.
    const mask = document.createElement('canvas')
    mask.width = width
    mask.height = height
    const maskCtx = mask.getContext('2d', { willReadFrequently: true })
    maskCtx.fillStyle = '#fff'
    this.draw(maskCtx, layout, padX, padY)
    const pixels = maskCtx.getImageData(0, 0, width, height).data
    let covered = 0
    for (let i = 3; i < pixels.length; i += 4) if (pixels[i] > 128) covered++
    const budget = this.stage.coarse ? 5000 : 11000
    const step = Math.max(1, Math.floor(Math.sqrt(covered / budget)))
    // thin the grid at random so the count lands near the budget
    const keep = Math.min(1, (budget * step * step) / covered)

    const random = seededRandom(5)
    const targets = []
    const starts = []
    const seeds = []
    const left = x - this.stage.width / 2 - width / 2
    const top = this.stage.height / 2 - y + height / 2
    const spread = Math.max(this.stage.width, this.stage.height) * 0.62
    for (let row = 0; row < height; row += step) {
      const second = layout.lines.length > 1 && row > split
      for (let col = 0; col < width; col += step) {
        if (pixels[(row * width + col) * 4 + 3] <= 128 || random() > keep) continue
        const tx = left + col + (random() - 0.5) * step * 0.8
        const ty = top - row + (random() - 0.5) * step * 0.8
        const angle = random() * Math.PI * 2
        const radius = spread * (0.45 + random() * 0.9)
        targets.push(tx, ty)
        // aStart is an offset from the target to a point on a wide ring.
        starts.push(Math.cos(angle) * radius - tx, Math.sin(angle) * radius - ty)
        // delay (left-to-right bias; the second line settles a beat later),
        // size, phase, swirl
        const delay = second
          ? 0.2 + random() * 0.45 + (col / width) * 0.35
          : random() * 0.6 + (col / width) * 0.4
        seeds.push(delay, random(), random(), random())
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
    ctx.fillStyle = '#eef4ff'
    this.draw(ctx, layout, padX, padY, true)
    ctx.shadowBlur = 0
    this.draw(ctx, layout, padX, padY)
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

  // Places the lines for a title size. The second line is centred under the
  // title and tracked out so its ink spans the title's width. Positions are
  // relative to the top-left of the ink box.
  layout(fontSize) {
    const [titleText, subText] = this.lines
    const title = this.measureLine(titleText, fontSize, TITLE_TRACKING * fontSize)
    const lines = [title]
    let width = title.width
    let height = title.cap
    title.baseline = title.cap
    if (subText) {
      const size = fontSize * SUB_SCALE
      const natural = this.measureLine(subText, size, 0)
      const gaps = Math.max(1, [...subText].length - 1)
      const tracking = clamp(
        (title.width - natural.width) / gaps,
        SUB_TRACKING[0] * size,
        SUB_TRACKING[1] * size,
      )
      const sub = this.measureLine(subText, size, tracking)
      sub.baseline = title.cap + LINE_GAP * fontSize + sub.cap
      lines.push(sub)
      width = Math.max(width, sub.width)
      height = sub.baseline
    }
    for (const line of lines) line.x = (width - line.width) / 2 - line.inkLeft
    return { lines, width, height, split: title.cap + (LINE_GAP * fontSize) / 2 }
  }

  // Advance offsets and ink extents of one line drawn char by char.
  measureLine(text, size, tracking) {
    const ctx = this.probe
    ctx.font = `600 ${size}px "${this.family}"`
    const offsets = []
    let cursor = 0
    let inkLeft = Infinity
    let inkRight = -Infinity
    for (const char of text) {
      const metrics = ctx.measureText(char)
      offsets.push(cursor)
      inkLeft = Math.min(inkLeft, cursor - metrics.actualBoundingBoxLeft)
      inkRight = Math.max(inkRight, cursor + metrics.actualBoundingBoxRight)
      cursor += metrics.width + tracking
    }
    const cap = ctx.measureText('H').actualBoundingBoxAscent || size * 0.72
    return { text, size, offsets, inkLeft, width: inkRight - inkLeft, cap }
  }

  // Draws every line with its ink box's top-left at (x, y); `glow` sets a
  // shadow blur scaled to each line's size.
  draw(ctx, layout, x, y, glow = false) {
    ctx.textBaseline = 'alphabetic'
    for (const line of layout.lines) {
      ctx.font = `600 ${line.size}px "${this.family}"`
      if (glow) ctx.shadowBlur = line.size * (line === layout.lines[0] ? 0.28 : 0.36)
      const chars = [...line.text]
      chars.forEach((char, i) => ctx.fillText(char, x + line.x + line.offsets[i], y + line.baseline))
    }
  }
}
