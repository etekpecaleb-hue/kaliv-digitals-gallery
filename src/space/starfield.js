// Twinkling star shell plus three soft nebula sprites behind the globe. The
// group follows the camera, so the stars sit at infinity; like the sky dome
// they draw first and test no depth, so every body covers them.
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  Group,
  Points,
  SRGBColorSpace,
  ShaderMaterial,
  Sprite,
  SpriteMaterial,
} from 'three'
import { seededRandom } from '../core/math.js'

// Star tints and how likely each one is (weights sum to 1).
const STAR_COLORS = [
  ['#9db4ff', 0.12],
  ['#cad8ff', 0.2],
  ['#f6f4ff', 0.38],
  ['#fff1df', 0.18],
  ['#ffd2a1', 0.12],
]

const STAR_VERTEX = `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uSize;
  attribute float aSize;
  attribute float aPhase;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vTwinkle;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vTwinkle = 0.62 + 0.38 * sin(uTime * (0.6 + aPhase * 2.2) + aPhase * 31.0);
    vColor = aColor;
    gl_PointSize = clamp(aSize * uSize * uPixelRatio * (260.0 / -mv.z), 0.0, 9.0 * uPixelRatio);
    gl_Position = projectionMatrix * mv;
  }
`

const STAR_FRAGMENT = `
  uniform float uOpacity;
  varying vec3 vColor;
  varying float vTwinkle;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = 1.0 - smoothstep(0.0, 0.5, d);
    a = a * a * vTwinkle * uOpacity;
    if (a < 0.004) discard;
    gl_FragColor = vec4(vColor, a);
    #include <colorspace_fragment>
  }
`

// [color, opacity, position, scale, rotation]
const NEBULAE = [
  ['#1d4bd8', 0.34, [-260, 120, -700], 900, 0.4],
  ['#3b2a9e', 0.26, [320, -160, -820], 1100, 2.1],
  ['#0f6f8f', 0.18, [80, 260, -600], 700, 4],
]

// White cloud mask (domain-warped value-noise fbm, faded to a soft disc) as
// an alpha texture; the sprites tint it.
function makeNebulaTexture(size, seed) {
  const random = seededRandom(seed)
  const lattice = new Float32Array(4096).map(() => random())
  const noise = (x, y) => {
    const ix = Math.floor(x)
    const iy = Math.floor(y)
    const fx = x - ix
    const fy = y - iy
    const sx = fx * fx * (3 - 2 * fx)
    const sy = fy * fy * (3 - 2 * fy)
    const at = (cx, cy) => lattice[((cy & 63) * 64 + (cx & 63)) | 0]
    const a = at(ix, iy)
    const b = at(ix + 1, iy)
    const c = at(ix, iy + 1)
    const d = at(ix + 1, iy + 1)
    return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy
  }
  const fbm = (x, y) => {
    let sum = 0
    let amplitude = 0.5
    let frequency = 1
    for (let octave = 0; octave < 5; octave++) {
      sum += amplitude * noise(x * frequency, y * frequency)
      frequency *= 2.03
      amplitude *= 0.5
    }
    return sum
  }

  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')
  const image = ctx.createImageData(size, size)
  const step = 4 / size
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const nx = x * step
      const ny = y * step
      const warp = fbm(nx + 5.2, ny + 1.3) * 2.2
      let density = fbm(nx + warp, ny + warp * 0.8)
      const dx = x / size - 0.5
      const dy = y / size - 0.5
      const falloff = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) * 2)
      density = Math.max(0, density - 0.32) * 2.1 * falloff * falloff
      const i = (y * size + x) * 4
      image.data[i] = image.data[i + 1] = image.data[i + 2] = 255
      image.data[i + 3] = Math.min(255, density * 255)
    }
  }
  ctx.putImageData(image, 0, 0)

  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  return texture
}

export class Starfield {
  group = new Group()
  uniforms = {
    uTime: { value: 0 },
    uPixelRatio: { value: 1 },
    uSize: { value: 1 },
    uOpacity: { value: 1 },
  }
  starCount

  constructor(stage) {
    const random = seededRandom(3)
    const count = stage.coarse ? 2600 : 4200
    this.starCount = count

    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const phases = new Float32Array(count)
    const color = new Color()
    for (let i = 0; i < count; i++) {
      // uniform direction on the sphere, radius biased towards the inner shell
      const y = random() * 2 - 1
      const theta = random() * Math.PI * 2
      const radius = 140 + random() ** 0.7 * 760
      const ring = Math.sqrt(1 - y * y)
      positions.set([radius * ring * Math.cos(theta), radius * y, radius * ring * Math.sin(theta)], i * 3)
      sizes[i] = 0.55 + random() ** 7 * 4.2
      phases[i] = random()

      let pick = random()
      let tint = STAR_COLORS[0][0]
      for (const [hex, weight] of STAR_COLORS) {
        if (pick < weight) {
          tint = hex
          break
        }
        pick -= weight
      }
      color.set(tint)
      colors.set([color.r, color.g, color.b], i * 3)
    }

    const geometry = new BufferGeometry()
    geometry.setAttribute('position', new BufferAttribute(positions, 3))
    geometry.setAttribute('aColor', new BufferAttribute(colors, 3))
    geometry.setAttribute('aSize', new BufferAttribute(sizes, 1))
    geometry.setAttribute('aPhase', new BufferAttribute(phases, 1))
    const stars = new Points(
      geometry,
      new ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: STAR_VERTEX,
        fragmentShader: STAR_FRAGMENT,
        depthTest: false,
        depthWrite: false,
        blending: AdditiveBlending,
      }),
    )
    stars.frustumCulled = false
    stars.renderOrder = -999
    this.group.add(stars)

    const cloud = makeNebulaTexture(stage.coarse ? 192 : 256, 11)
    for (const [hex, opacity, [x, y, z], scale, rotation] of NEBULAE) {
      const sprite = new Sprite(
        new SpriteMaterial({
          map: cloud,
          color: new Color(hex),
          opacity,
          depthTest: false,
          depthWrite: false,
          blending: AdditiveBlending,
          rotation,
        }),
      )
      sprite.renderOrder = -998
      sprite.position.set(x, y, z)
      sprite.scale.setScalar(scale)
      this.group.add(sprite)
    }

    stage.scene.add(this.group)
    stage.onResize(() => (this.uniforms.uPixelRatio.value = stage.pixelRatio))
    this.uniforms.uPixelRatio.value = stage.pixelRatio
    // runs after the camera has moved this frame (the explorer's priority is lower)
    stage.onFrame((time, dt) => {
      this.uniforms.uTime.value = time
      this.group.rotation.y += dt * 0.004
      this.group.position.copy(stage.camera.position)
    }, 10)
  }
}
