// Heads-up display: top bar (brand + the action button group), bottom
// readout, corner ticks, the target brackets that lock onto the hovered globe
// panel or sphere cell, and toasts.
//
// The action group (#hud-actions) holds square .hud-btn icon buttons:
// [Blueprint] [Photos], then `hud.actionSlot` (#hud-actions-more), where the
// navigation phase appends [Worlds] [Fly] (see addAction()).
import { gsap } from 'gsap'
import { formatLatLon, padIndex } from '../core/math.js'

const byId = (id) => document.getElementById(id)

// Readout labels and hints per camera mode: at home it reads like the globe,
// in space it follows the focus, in free flight the ship.
const MODES = {
  home: {
    labels: ['View', 'Range', 'In view'],
    hint: 'Drag to rotate · Scroll to zoom · B blueprint · P photos',
    coarseHint: 'Drag to rotate · Pinch to zoom · Tap a photo',
  },
  space: {
    labels: ['Focus', 'Range', 'Time'],
    hint: 'Drag to orbit · Scroll to zoom · M worlds · F fly · G home',
    coarseHint: 'Drag to orbit · Pinch to zoom · Tap a world',
  },
  fly: {
    labels: ['Flight', 'Speed', 'Nearest'],
    hint: 'WASD move · Q/E down/up · Shift boost · Drag to look · Esc exit',
    coarseHint: 'Stick to move · Drag to look',
  },
}

function timeLabel(scale) {
  return scale === 0 ? 'Paused' : `×${scale}`
}

// Scene units, short: 18.3, 342, 4.2k.
function formatRange(value) {
  if (value < 1000) return value.toFixed(value < 100 ? 1 : 0).padStart(4, '0')
  return `${(value / 1000).toFixed(1)}k`
}

// Writes text only when it changed (no layout work for equal values).
function write(el, text) {
  if (el.textContent !== text) el.textContent = text
}

export class Hud {
  top = byId('hud-top')
  bottom = byId('hud-bottom')
  frame = document.querySelector('.hud-frame')
  target = byId('target')
  targetLabel = byId('target-label')
  toastEl = byId('toast')
  hint = byId('hint')
  buttons = { blueprint: byId('btn-blueprint'), photos: byId('btn-photos') }
  actionSlot = byId('hud-actions-more')
  fields = {
    frames: byId('ro-frames'),
    aLabel: byId('ro-a-label'),
    a: byId('ro-a'),
    bLabel: byId('ro-b-label'),
    b: byId('ro-b'),
    cLabel: byId('ro-c-label'),
    c: byId('ro-c'),
    fps: byId('ro-fps'),
  }
  coarse
  store
  mode = ''
  lastWrite = 0
  targetPanel = null
  toastTimer = 0
  toastShown = false

  constructor(store, coarse) {
    this.store = store
    this.coarse = coarse
    gsap.set([this.top, this.bottom, this.frame], { autoAlpha: 0 })
    this.framesItem = this.fields.frames.parentElement
    this.setMode('home')
  }

  // 'home' | 'space' | 'fly': relabels the readout and swaps the hint.
  setMode(mode) {
    if (mode === this.mode) return
    this.mode = mode
    const { labels, hint, coarseHint } = MODES[mode]
    this.fields.aLabel.textContent = labels[0]
    this.fields.bLabel.textContent = labels[1]
    this.fields.cLabel.textContent = labels[2]
    this.framesItem.hidden = mode !== 'home'
    this.hint.textContent = this.coarse ? coarseHint : hint
    this.lastWrite = -1
  }

  // Reflects the globe mode on the Blueprint toggle.
  setBlueprint(on) {
    this.buttons.blueprint.setAttribute('aria-pressed', String(on))
  }

  // Appends a header button in the action group's insertion point and
  // returns it: { id, label, icon (svg markup), tip, pressed (toggle) }.
  addAction({ id, label, icon, tip = label, pressed }) {
    const button = document.createElement('button')
    button.type = 'button'
    button.className = 'hud-btn'
    button.id = id
    button.dataset.tip = tip
    button.setAttribute('aria-label', label)
    if (pressed !== undefined) button.setAttribute('aria-pressed', String(pressed))
    button.innerHTML = `${icon}<span class="hud-btn__label">${label}</span>`
    this.actionSlot.append(button)
    return button
  }

  reveal() {
    const tl = gsap.timeline()
    tl.set([this.top, this.bottom, this.frame], { autoAlpha: 1 })
    tl.fromTo(
      this.top.children,
      { opacity: 0, y: -14 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out' },
      0,
    )
    tl.fromTo(
      this.bottom.children,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out' },
      0.1,
    )
    tl.fromTo(
      this.frame.children,
      { opacity: 0, scale: 1.8 },
      { opacity: 1, scale: 1, duration: 0.9, stagger: 0.05, ease: 'expo.out' },
      0,
    )
    ;[...this.bottom.querySelectorAll('dt')].forEach((label, i) => {
      tl.to(
        label,
        {
          duration: 0.6,
          scrambleText: { text: label.textContent ?? '', chars: 'upperCase', speed: 0.6 },
        },
        0.2 + i * 0.06,
      )
    })
    return tl
  }

  setDimmed(dimmed) {
    // visible (if still transparent) straight away, so its buttons can take focus
    if (!dimmed) gsap.set([this.top, this.bottom, this.frame], { visibility: 'inherit' })
    gsap.to([this.top, this.bottom, this.frame], {
      autoAlpha: dimmed ? 0 : 1,
      duration: dimmed ? 0.3 : 0.5,
      overwrite: 'auto',
    })
  }

  // Called every frame; the text readouts are throttled to 10 Hz. `nav` is
  // { mode: 'home' | 'space' | 'fly', range, focusName, timeScale, speed,
  // nearestName } from the camera; at home the readout is the globe's.
  update(time, fps, globe, nav) {
    const mode = nav?.mode ?? 'home'
    this.setMode(mode)
    if (globe) this.trackTarget(mode === 'home' ? globe.hovered : null, globe)
    if (time - this.lastWrite < 0.1) return
    this.lastWrite = time

    const total = this.store.count
    const fields = this.fields
    write(fields.frames, padIndex(total, total))
    write(fields.fps, String(Math.round(fps)).padStart(2, '0'))
    if (mode === 'fly') {
      write(fields.a, 'Free')
      write(fields.b, `${formatRange(nav.speed)} u/s`)
      write(fields.c, nav.nearestName ?? '—')
    } else if (mode === 'space') {
      write(fields.a, nav.focusName)
      write(fields.b, formatRange(nav.range))
      write(fields.c, timeLabel(nav.timeScale))
    } else if (globe) {
      const { lat, lon } = globe.viewCenter()
      write(fields.a, formatLatLon(lat, lon))
      write(fields.b, formatRange(nav?.range ?? 0))
      const front = globe.front
      write(fields.c, front ? `${padIndex(this.store.indexOf(front.photo) + 1, total)} ${front.photo.title}` : '—')
    }
  }

  // Locks the target brackets onto `panel` (or hides them for null).
  trackTarget(panel, globe) {
    if (panel !== this.targetPanel) {
      this.targetPanel = panel
      gsap.to(this.target, { opacity: panel ? 1 : 0, duration: panel ? 0.25 : 0.2, overwrite: 'auto' })
      if (panel) {
        const total = this.store.count
        const index = padIndex(this.store.indexOf(panel.photo) + 1, total)
        this.targetLabel.textContent = `${index} · ${panel.photo.title} · ${panel.photo.category}`
        if (globe) {
          const rect = globe.screenRect(panel)
          gsap.fromTo(this.target, { scale: 1.25 }, { scale: 1, duration: 0.35, ease: 'expo.out' })
          gsap.set(this.target, { x: rect.x, y: rect.y, width: rect.width, height: rect.height })
        }
      }
    }
    if (panel && globe) {
      const rect = globe.screenRect(panel)
      gsap.set(this.target, { x: rect.x, y: rect.y, width: rect.width, height: rect.height })
    }
  }

  // `hold`: ms on screen (Infinity keeps it up until the next toast). A toast
  // that is already showing just changes its text, so progress updates
  // don't flicker.
  toast(message, isError = false, hold = isError ? 6000 : 4200) {
    this.toastEl.textContent = message
    this.toastEl.classList.toggle('is-error', isError)
    if (!this.toastShown) {
      gsap.killTweensOf(this.toastEl)
      gsap.fromTo(
        this.toastEl,
        { autoAlpha: 0, y: 10 },
        { autoAlpha: 1, y: 0, duration: 0.35, ease: 'power2.out' },
      )
    }
    this.toastShown = true
    window.clearTimeout(this.toastTimer)
    if (hold === Infinity) return
    this.toastTimer = window.setTimeout(() => {
      this.toastShown = false
      gsap.to(this.toastEl, { autoAlpha: 0, duration: 0.4 })
    }, hold)
  }
}
