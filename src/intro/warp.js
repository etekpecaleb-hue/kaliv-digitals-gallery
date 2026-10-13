// Radial light streaks drawn on a 2D canvas for the intro's jump to space.
import { gsap } from 'gsap'
import { seededRandom } from '../core/math.js'

export class Warp {
  canvas
  ctx
  streaks

  constructor(canvas, count = 220) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    const random = seededRandom(23)
    this.streaks = Array.from({ length: count }, () => ({
      angle: random() * Math.PI * 2,
      start: 0.02 + random() * 0.45,
      speed: 0.5 + random() * 1.6,
      width: 0.6 + random() * 1.6,
      alpha: 0.35 + random() * 0.65,
      white: random() > 0.6,
    }))
  }

  // Returns the tween so the intro can place it on its exit timeline.
  play(duration) {
    const ratio = Math.min(window.devicePixelRatio || 1, 2)
    const width = this.canvas.clientWidth
    const height = this.canvas.clientHeight
    this.canvas.width = Math.round(width * ratio)
    this.canvas.height = Math.round(height * ratio)
    this.ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
    const state = { p: 0 }
    return gsap.to(state, {
      p: 1,
      duration,
      ease: 'power1.in',
      onUpdate: () => this.draw(state.p, width, height),
      onComplete: () => this.ctx.clearRect(0, 0, width, height),
    })
  }

  draw(progress, width, height) {
    const { ctx } = this
    ctx.clearRect(0, 0, width, height)
    const cx = width / 2
    const cy = height / 2
    const reach = Math.hypot(width, height) / 2
    // Fades in and back out over the run.
    const fade = Math.sin(Math.PI * Math.min(1, progress * 1.05))
    ctx.lineCap = 'round'
    for (const streak of this.streaks) {
      const distance = (streak.start + progress ** 2.2 * streak.speed * 1.4) * reach
      const length = (0.015 + progress * progress * 0.45 * streak.speed) * reach
      const dx = Math.cos(streak.angle)
      const dy = Math.sin(streak.angle)
      const x0 = cx + dx * distance
      const y0 = cy + dy * distance
      const x1 = cx + dx * (distance + length)
      const y1 = cy + dy * (distance + length)
      const gradient = ctx.createLinearGradient(x0, y0, x1, y1)
      const rgb = streak.white ? '232, 239, 255' : '156, 199, 255'
      gradient.addColorStop(0, `rgba(${rgb}, 0)`)
      gradient.addColorStop(1, `rgba(${rgb}, ${(streak.alpha * fade).toFixed(3)})`)
      ctx.strokeStyle = gradient
      ctx.lineWidth = streak.width * (1 + progress)
      ctx.beginPath()
      ctx.moveTo(x0, y0)
      ctx.lineTo(x1, y1)
      ctx.stroke()
    }
  }
}
