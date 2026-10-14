// Adaptive quality: when the frame rate stays low, the pixel ratio drops a
// step (1.75 → 1.4 → 1.15 on phones) and comes back once frames recover. A
// step back up that makes things slow again locks that level for the visit,
// so it never see-saws.
//
//   const quality = new AdaptiveQuality(stage)
//   quality.update()   once per frame (it times frames itself)

const STEPS = [Infinity, 1.4, 1.15]
// frames per second below which a level is "slow", above which it is "fast"
const SLOW_FPS = 40
const FAST_FPS = 55
// seconds a level must stay slow / fast before stepping
const DROP_AFTER = 2.5
const RAISE_AFTER = 8
// a raise followed by a drop this soon locks the lower level
const SETTLE = 12
const WINDOW = 0.5

export class AdaptiveQuality {
  level = 0
  frames = 0
  windowStart = 0
  slowFor = 0
  fastFor = 0
  lastRaise = -Infinity
  ceiling = 0

  constructor(stage, { enabled = true } = {}) {
    this.stage = stage
    this.enabled = enabled
  }

  get pixelRatio() {
    return this.stage.pixelRatio
  }

  // the steps that actually lower this device's pixel ratio
  get usableSteps() {
    let count = 1
    while (count < STEPS.length && STEPS[count] < this.stage.maxPixelRatio) count++
    return count
  }

  update() {
    if (!this.enabled) return
    const now = performance.now() / 1000
    if (this.windowStart === 0) this.windowStart = now
    this.frames++
    const elapsed = now - this.windowStart
    if (elapsed < WINDOW) return
    const fps = this.frames / elapsed
    this.frames = 0
    this.windowStart = now
    // a hidden tab or a long hitch says nothing about the steady frame rate
    if (elapsed > 1.5) return
    this.slowFor = fps < SLOW_FPS ? this.slowFor + elapsed : 0
    this.fastFor = fps > FAST_FPS ? this.fastFor + elapsed : 0
    if (this.slowFor >= DROP_AFTER && this.level < this.usableSteps - 1) {
      // raised a moment ago and slow again: stay down here from now on
      if (now - this.lastRaise < SETTLE) this.ceiling = this.level + 1
      this.setLevel(this.level + 1)
    } else if (this.fastFor >= RAISE_AFTER && this.level > this.ceiling) {
      this.lastRaise = now
      this.setLevel(this.level - 1)
    }
  }

  setLevel(level) {
    this.level = level
    this.slowFor = this.fastFor = 0
    this.stage.setPixelRatioCap(STEPS[level])
  }
}
