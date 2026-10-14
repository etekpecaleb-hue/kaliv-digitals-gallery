// A panel that slides in from the right on desktop and up from the bottom on
// phones (≤ 640 px wide), with a drag handle there and swipe-down to close.
// Modal by default: backdrop, focus moved in and trapped, Esc or a backdrop
// click closes it, focus returns to whatever opened it. Only one sheet is
// open at a time.
//
//   const sheet = new Sheet({ id: 'worlds', title: 'Worlds', reduced })
//   sheet.body.append(...)      // scrolling content
//   sheet.foot.append(...)      // pinned actions (hidden while empty)
//   sheet.open(button)          // or toggle(button); close()
//   sheet.setTitle('Photos', '· 32')
//
// Options: { id, title, meta, reduced, modal = true, className,
//   initialFocus() -> element, onOpen(), onClose() }.
import { gsap } from 'gsap'

const PHONE = matchMedia('(max-width: 640px)')
const FOCUSABLE = 'button:not([disabled]), a[href], input:not([disabled]):not([tabindex="-1"]), [tabindex="0"]'

const CLOSE_ICON = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 3l10 10M13 3L3 13" /></svg>'

export class Sheet {
  static current = null
  isOpen = false
  options
  root
  panel
  backdrop
  head
  titleEl
  body
  foot
  returnFocus = null
  trigger = null
  anim = null
  drag = null

  constructor(options) {
    this.options = { modal: true, ...options }
    const { id, modal, className } = this.options
    this.root = document.createElement('div')
    this.root.className = `sheet${modal ? '' : ' sheet--modeless'}${className ? ` ${className}` : ''}`
    this.root.id = id
    this.root.hidden = true
    this.root.innerHTML = `
      <div class="sheet__backdrop"></div>
      <section class="sheet__panel" role="dialog" aria-labelledby="${id}-title" tabindex="-1">
        <div class="sheet__grab" aria-hidden="true"><span class="sheet__handle"></span></div>
        <header class="sheet__head">
          <h2 class="sheet__title" id="${id}-title"></h2>
          <button class="lb-btn sheet__close" type="button" aria-label="Close">${CLOSE_ICON}</button>
        </header>
        <div class="sheet__body"></div>
        <footer class="sheet__foot"></footer>
      </section>`
    this.backdrop = this.root.querySelector('.sheet__backdrop')
    this.panel = this.root.querySelector('.sheet__panel')
    this.head = this.root.querySelector('.sheet__head')
    this.titleEl = this.root.querySelector('.sheet__title')
    this.body = this.root.querySelector('.sheet__body')
    this.foot = this.root.querySelector('.sheet__foot')
    if (modal) this.panel.setAttribute('aria-modal', 'true')
    this.setTitle(this.options.title ?? '', this.options.meta)
    document.body.append(this.root)

    this.root.querySelector('.sheet__close').addEventListener('click', () => this.close())
    this.backdrop.addEventListener('click', () => this.close())
    addEventListener('keydown', this.onKey)
    for (const el of [this.root.querySelector('.sheet__grab'), this.head]) {
      el.addEventListener('pointerdown', this.onDragStart)
    }
    this.panel.addEventListener('pointermove', this.onDragMove)
    this.panel.addEventListener('pointerup', this.onDragEnd)
    this.panel.addEventListener('pointercancel', this.onDragEnd)
  }

  // Title text, plus an optional mono suffix (e.g. a live count).
  setTitle(title, meta) {
    this.titleEl.replaceChildren(title)
    if (meta) {
      const span = document.createElement('span')
      span.className = 'sheet__meta mono'
      span.textContent = meta
      this.titleEl.append(' ', span)
    }
  }

  get phone() {
    return PHONE.matches
  }

  toggle(trigger) {
    if (this.isOpen) this.close()
    else this.open(trigger)
  }

  open(trigger = null) {
    if (this.isOpen) return
    if (Sheet.current && Sheet.current !== this) Sheet.current.close({ restoreFocus: false, instant: true })
    Sheet.current = this
    this.isOpen = true
    this.trigger = trigger
    this.trigger?.setAttribute('aria-expanded', 'true')
    this.returnFocus = trigger ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null)
    this.foot.hidden = this.foot.childElementCount === 0
    this.root.hidden = false
    this.anim?.kill()
    const reduced = this.options.reduced
    const tl = gsap.timeline()
    this.anim = tl
    tl.fromTo(this.backdrop, { opacity: 0 }, { opacity: 1, duration: reduced ? 0.15 : 0.35, ease: 'power2.out' }, 0)
    if (reduced) {
      tl.fromTo(this.panel, { opacity: 0, x: 0, y: 0 }, { opacity: 1, duration: 0.18 }, 0)
    } else {
      const from = this.phone ? { yPercent: 100, xPercent: 0 } : { xPercent: 100, yPercent: 0 }
      tl.fromTo(
        this.panel,
        { ...from, x: 0, y: 0, opacity: 1 },
        { xPercent: 0, yPercent: 0, duration: 0.55, ease: 'expo.out' },
        0,
      )
      tl.fromTo(
        this.body.children,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.04, ease: 'power2.out', clearProps: 'transform' },
        0.12,
      )
    }
    const focus = this.options.initialFocus?.() ?? this.panel
    focus.focus({ preventScroll: true })
    this.options.onOpen?.()
  }

  // `restoreFocus: false` when something else takes focus next (e.g. the
  // lightbox); `instant` skips the animation.
  close({ restoreFocus = true, instant = false } = {}) {
    if (!this.isOpen) return
    this.isOpen = false
    if (Sheet.current === this) Sheet.current = null
    this.trigger?.setAttribute('aria-expanded', 'false')
    this.drag = null
    this.anim?.kill()
    const done = () => {
      this.root.hidden = true
      gsap.set(this.panel, { clearProps: 'transform,opacity' })
    }
    if (instant) done()
    else {
      const reduced = this.options.reduced
      const tl = gsap.timeline({ onComplete: done })
      this.anim = tl
      tl.to(this.backdrop, { opacity: 0, duration: reduced ? 0.12 : 0.3, ease: 'power2.inOut' }, 0)
      if (reduced) tl.to(this.panel, { opacity: 0, duration: 0.15 }, 0)
      else {
        const to = this.phone ? { yPercent: 100, y: 0 } : { xPercent: 100 }
        tl.to(this.panel, { ...to, duration: 0.38, ease: 'power3.in' }, 0)
      }
    }
    if (restoreFocus) this.returnFocus?.focus({ preventScroll: true })
    this.returnFocus = null
    this.options.onClose?.()
  }

  onKey = (event) => {
    if (!this.isOpen || event.defaultPrevented) return
    if (event.key === 'Escape') {
      event.preventDefault()
      this.close()
    } else if (event.key === 'Tab' && this.options.modal) {
      // keep keyboard focus inside the sheet
      const focusable = [...this.panel.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null)
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const inside = this.panel.contains(document.activeElement)
      if (event.shiftKey && (document.activeElement === first || !inside)) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && (document.activeElement === last || !inside)) {
        event.preventDefault()
        first.focus()
      }
    }
  }

  // Swipe down on the handle or header to close (bottom sheet only).
  onDragStart = (event) => {
    if (!this.phone || !this.isOpen || event.target.closest('button')) return
    this.drag = { id: event.pointerId, y0: event.clientY, y: 0, lastY: event.clientY, lastT: performance.now(), v: 0 }
    this.panel.setPointerCapture(event.pointerId)
    this.anim?.progress(1)
  }

  onDragMove = (event) => {
    const drag = this.drag
    if (!drag || event.pointerId !== drag.id) return
    const now = performance.now()
    const dy = event.clientY - drag.y0
    // follows the finger down, resists upwards
    drag.y = dy > 0 ? dy : dy * 0.2
    drag.v = (event.clientY - drag.lastY) / Math.max(1, now - drag.lastT)
    drag.lastY = event.clientY
    drag.lastT = now
    gsap.set(this.panel, { y: drag.y })
    gsap.set(this.backdrop, { opacity: 1 - Math.max(0, drag.y) / (this.panel.offsetHeight * 1.4) })
  }

  onDragEnd = (event) => {
    const drag = this.drag
    if (!drag || event.pointerId !== drag.id) return
    this.drag = null
    if (event.type === 'pointerup' && (drag.y > this.panel.offsetHeight * 0.28 || (drag.v > 0.5 && drag.y > 24))) {
      this.close()
    } else {
      gsap.to(this.panel, { y: 0, duration: 0.45, ease: 'expo.out' })
      gsap.to(this.backdrop, { opacity: 1, duration: 0.3 })
    }
  }
}
