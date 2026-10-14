// The FUI intro: beam, grid, corner brackets, scrambled meta text, clock,
// spinning reticle with the KD emblem drawing itself, the two-line particle
// wordmark, a boot log with live values, and the warp-streak exit into the gallery.
import { gsap } from 'gsap'
import { FONT_DISPLAY } from '../core/fonts.js'
import { WordParticles } from './wordParticles.js'
import { Warp } from './warp.js'

const byId = (id) => document.getElementById(id)

// The main timeline pauses here until fonts and textures are ready.
const HOLD_AT = 4.1
// Give up waiting for assets after this long (ms) and enter anyway.
const READY_TIMEOUT = 9000
// The particle wordmark: title and the tracked line beneath it.
const WORDMARK = ['KALIV', 'DIGITALS']
// Seconds between boot log rows.
const LOG_STAGGER = 0.28

export class Intro {
  active = true
  finished
  options
  el = byId('intro')
  word
  warp
  tl = null
  spins = []
  exiting = false
  ready = false
  fonts = null
  wordBuilt = false
  readyPromise
  resolveFinished
  clockTimer = 0
  live = []
  stopFrame = null
  stopResize = null

  // options: { stage, space, reduced, fonts, textures, photosLoaded(),
  //   photoCount, facts: { gpu, panels, rows, stars, worlds }, handOver() -> timeline }
  constructor(options) {
    this.options = options
    this.word = new WordParticles(options.stage, WORDMARK, FONT_DISPLAY)
    this.warp = new Warp(byId('intro-warp'), options.stage.coarse ? 140 : 220)
    this.finished = new Promise((resolve) => (this.resolveFinished = resolve))
  }

  start() {
    this.tickClock()
    this.clockTimer = window.setInterval(this.tickClock, 1000)
    const fonts = this.options.fonts.then((result) => void (this.fonts = result))
    const assets = Promise.all([fonts, this.options.textures])
    this.readyPromise = Promise.race([
      assets,
      new Promise((resolve) => setTimeout(resolve, READY_TIMEOUT)),
    ]).then(() => {
      this.ready = true
    })
    byId('intro-skip').addEventListener('click', () => this.skip())
    this.stopFrame = this.options.stage.onFrame(() => this.updateProgress())
    this.stopResize = this.options.stage.onResize(() => {
      if (this.wordBuilt && !this.exiting) this.layoutWord()
    })
    if (this.options.reduced) this.playReduced()
    else this.play()
    return this.finished
  }

  skip() {
    if (this.exiting) return
    this.tl?.pause()
    this.exit(true)
  }

  play() {
    const { space } = this.options
    const word = this.word
    const scrambled = [...this.el.querySelectorAll('[data-scramble]')]
    const texts = scrambled.map((el) => el.textContent ?? '')
    for (const el of scrambled) el.textContent = ' '
    space.uniforms.uOpacity.value = 0

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    this.tl = tl
    tl.fromTo('.intro__beam', { scaleX: 0, opacity: 1 }, { scaleX: 1, duration: 0.45, ease: 'expo.out' }, 0.05)
      .to('.intro__beam', { scaleY: 26, opacity: 0, duration: 0.4, ease: 'power2.in' }, 0.5)
      .fromTo('.intro__grid', { opacity: 0 }, { opacity: 1, duration: 1.2 }, 0.5)
      .to(space.uniforms.uOpacity, { value: 1, duration: 1.8, ease: 'power1.inOut' }, 0.4)
      .fromTo(
        '.intro__corner path',
        { drawSVG: '0%' },
        { drawSVG: '100%', duration: 0.8, stagger: 0.07, ease: 'power3.inOut' },
        0.55,
      )
    scrambled.forEach((el, i) => {
      tl.to(
        el,
        {
          duration: 0.9,
          scrambleText: { text: texts[i], chars: 'upperCase', speed: 0.5, revealDelay: 0.2 },
        },
        0.8 + i * 0.12,
      )
    })
    tl.fromTo(
      '#reticle .ring',
      { drawSVG: '50% 50%' },
      { drawSVG: '0% 100%', duration: 1.2, stagger: 0.08, ease: 'expo.inOut' },
      0.7,
    )
      .fromTo(
        '#reticle .reticle__ticks',
        { opacity: 0, scale: 0.85, svgOrigin: '0 0' },
        { opacity: 1, scale: 1, duration: 1.4, ease: 'expo.out' },
        0.75,
      )
      .fromTo('#reticle .reticle__labels text', { opacity: 0 }, { opacity: 1, duration: 0.3, stagger: 0.12 }, 1.3)
      .fromTo(
        '#emblem .emblem__stroke',
        { drawSVG: '0%' },
        { drawSVG: '100%', duration: 1.1, stagger: 0.12, ease: 'power2.inOut' },
        1.5,
      )
      .fromTo('#emblem', { scale: 1.14, svgOrigin: '0 0' }, { scale: 1, duration: 1.6, ease: 'expo.out' }, 1.5)

    this.spins = [
      gsap.to('#reticle .reticle__ticks', { rotation: 360, svgOrigin: '0 0', duration: 60, repeat: -1, ease: 'none' }),
      gsap.to('#reticle .reticle__spin-b', { rotation: -360, svgOrigin: '0 0', duration: 26, repeat: -1, ease: 'none' }),
      gsap.to('#reticle .reticle__spin-c', { rotation: 360, svgOrigin: '0 0', duration: 5.5, repeat: -1, ease: 'none' }),
    ]
    this.logLines().forEach((line, i) => tl.call(() => this.addLog(line), [], 1 + i * LOG_STAGGER))

    // The wordmark is laid out with the display font, so wait for it.
    tl.addPause(0.95, () => {
      this.options.fonts.then(() => {
        if (this.exiting) return
        this.layoutWord()
        tl.resume()
      })
    })
    tl.to(word.uniforms.uProgress, { value: 1, duration: 2.5, ease: 'power2.inOut' }, 1)
      .to(word.textUniforms.uOpacity, { value: 1, duration: 0.5, ease: 'power2.out' }, 3.05)
      .fromTo(word.textUniforms.uGlitch, { value: 1 }, { value: 0, duration: 0.9, ease: 'steps(9)' }, 3.05)
      .to(word.uniforms.uOpacity, { value: 0.5, duration: 0.8 }, 3.3)
      .to(
        '#intro-sub',
        {
          duration: 1.2,
          scrambleText: {
            text: this.subText(),
            chars: '01<>/#',
            speed: 0.45,
          },
        },
        3,
      )
      .fromTo(word.uniforms.uScan, { value: 0 }, { value: 1, duration: 1.1, ease: 'power1.inOut' }, 3.35)
    tl.addPause(HOLD_AT, () => {
      this.readyPromise.then(() => this.exit(false))
    })
  }

  async playReduced() {
    const { space } = this.options
    space.uniforms.uOpacity.value = 1
    gsap.set('.intro__grid', { opacity: 1 })
    gsap.set('.intro__beam', { opacity: 0 })
    byId('intro-sub').textContent = this.subText()
    this.logLines().forEach((line) => this.addLog(line, false))
    await this.options.fonts
    this.layoutWord()
    this.word.uniforms.uOpacity.value = 0
    this.word.textUniforms.uOpacity.value = 1
    await Promise.all([this.readyPromise, new Promise((resolve) => setTimeout(resolve, 1200))])
    this.exit(false)
  }

  subText() {
    const { photoCount, facts } = this.options
    return `Space gallery · ${photoCount} frames · ${facts.worlds} worlds`
  }

  // Sizes the wordmark to the #intro-word box and (re)builds it there. The
  // title is capped by the viewport height so both lines, the reticle and the
  // log keep clear of each other; the box is resized to the ink height.
  layoutWord() {
    const host = byId('intro-word')
    const maxWidth = Math.min(host.clientWidth, 1240) * (this.options.stage.coarse ? 0.88 : 0.94)
    const maxSize = Math.min(this.options.stage.coarse ? 96 : 150, window.innerHeight * 0.14)
    const fontSize = this.word.fitFontSize(maxWidth, maxSize)
    const { height } = this.word.measure(fontSize)
    this.el.style.setProperty('--word-h', `${Math.round(height + fontSize * 0.36)}px`)
    const rect = host.getBoundingClientRect()
    this.word.build({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      fontSize,
    })
    this.wordBuilt = true
  }

  exit(skipped) {
    if (this.exiting) return
    this.exiting = true
    const word = this.word
    byId('intro-status').textContent = 'Ready'
    const tl = gsap.timeline({ onComplete: () => this.finish() })
    if (this.options.reduced) {
      tl.to(this.el, { opacity: 0, duration: 0.45, ease: 'power1.out' }, 0)
      tl.add(this.options.handOver(), 0)
      return
    }
    if (skipped) tl.timeScale(1.5)
    tl.to(word.textUniforms.uGlitch, { value: 1, duration: 0.2, ease: 'steps(3)' }, 0)
      .to(
        ['.intro__meta', '.intro__log', '.intro__progress', '.intro__corner'],
        { opacity: 0, duration: 0.35, ease: 'power2.in' },
        0.05,
      )
      .to(
        '#reticle',
        { scale: 2.6, opacity: 0, duration: 0.95, ease: 'power3.in', transformOrigin: '50% 50%' },
        0.05,
      )
      .to('#intro-sub', { opacity: 0, duration: 0.3 }, 0.1)
      .to(word.uniforms.uOpacity, { value: 1, duration: 0.2 }, 0.12)
      .to(word.textUniforms.uOpacity, { value: 0, duration: 0.25 }, 0.22)
      .to(word.uniforms.uExplode, { value: 1, duration: 1.15, ease: 'power2.in' }, 0.2)
      .to('.intro__grid', { opacity: 0, duration: 0.6 }, 0.25)
      .add(this.warp.play(1.35), 0.35)
      .add(this.options.handOver(), 0.55)
      .to(this.el, { opacity: 0, duration: 0.5, ease: 'power1.out' }, 1.3)
  }

  finish() {
    this.el.hidden = true
    this.active = false
    this.tl?.kill()
    for (const spin of this.spins) spin.kill()
    this.word.dispose()
    window.clearInterval(this.clockTimer)
    this.stopFrame?.()
    this.stopResize?.()
    this.resolveFinished()
  }

  // Boot log rows; values are functions so they can update live.
  logLines() {
    const { facts, photoCount } = this.options
    const digits = String(photoCount).length
    const pad = (value) => String(value).padStart(digits, '0')
    return [
      { label: 'Renderer', value: () => facts.gpu },
      {
        label: 'Fonts',
        value: () => (this.fonts ? `${this.fonts.loaded}/${this.fonts.total}` : 'loading'),
      },
      { label: 'Frames', value: () => `${pad(this.options.photosLoaded())}/${pad(photoCount)}` },
      { label: 'Globe', value: () => `${facts.panels} panels · ${facts.rows} rows` },
      { label: 'Worlds', value: () => `${facts.worlds} + sun + moon` },
      { label: 'Starfield', value: () => `${facts.stars} stars` },
      { label: 'Status', value: () => (this.ready ? 'ready' : 'loading') },
    ]
  }

  addLog(line, animate = true) {
    const row = document.createElement('div')
    const label = document.createElement('b')
    const dots = document.createElement('span')
    const value = document.createElement('em')
    label.textContent = animate ? '' : line.label
    dots.textContent = ` ${'.'.repeat(Math.max(2, 12 - line.label.length))} `
    value.textContent = line.value()
    row.append('› ', label, dots, value)
    byId('intro-log').append(row)
    this.live.push({ el: value, line })
    if (!animate) return
    gsap.to(label, {
      duration: 0.5,
      scrambleText: { text: line.label, chars: 'upperCase', speed: 0.6 },
    })
    gsap.from([dots, value], { opacity: 0, duration: 0.3, delay: 0.25 })
  }

  updateProgress() {
    const total = this.options.photoCount || 1
    const loaded = (this.fonts ? 0.15 : 0) + 0.85 * (this.options.photosLoaded() / total)
    // Never run ahead of the timeline, and never claim 100% before ready.
    const timeline = this.tl ? Math.min(1, this.tl.time() / HOLD_AT) : 1
    const progress = this.ready ? timeline : Math.min(loaded, timeline)
    byId('intro-pct').textContent = String(Math.round(progress * 100)).padStart(3, '0')
    gsap.set('#intro-bar', { scaleX: progress })
    for (const { el, line } of this.live) {
      const text = line.value()
      if (el.textContent !== text) el.textContent = text
    }
  }

  tickClock = () => {
    const now = new Date()
    byId('intro-clock').textContent = now.toLocaleTimeString('en-GB', { hour12: false })
    const offset = -now.getTimezoneOffset()
    const minutes = Math.abs(offset)
    const hh = String(Math.floor(minutes / 60)).padStart(2, '0')
    const mm = String(minutes % 60).padStart(2, '0')
    byId('intro-zone').textContent = `UTC${offset >= 0 ? '+' : '-'}${hh}:${mm}`
  }
}
