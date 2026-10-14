// Full-size photo view. The frame flies out of the globe panel's screen
// rectangle on open and back into it on close. On touch the photo follows
// the finger: swipe left/right for the next/previous photo, down to close.
// A slideshow (play/pause button or Space) advances every 4.5 s.
import { gsap } from 'gsap'
import { clamp, formatRatio, padIndex } from '../core/math.js'

const SLIDE_SECONDS = 4.5

const byId = (id) => document.getElementById(id)

// DOMRect or {x, y, width, height} -> the box gsap animates the frame with.
function toBox(rect) {
  return {
    x: 'left' in rect ? rect.left : rect.x,
    y: 'top' in rect ? rect.top : rect.y,
    width: rect.width,
    height: rect.height,
  }
}

export class Lightbox {
  isOpen = false
  photo = null
  store
  options
  root = byId('lightbox')
  backdrop = byId('lb-backdrop')
  area = byId('lb-area')
  frame = byId('lb-frame')
  img = byId('lb-img')
  scan = byId('lb-scan')
  meta = byId('lb-meta')
  closeButton = byId('lb-close')
  returnFocus = null
  loadToken = 0
  closing = false
  anim = null
  playButton = byId('lb-play')
  progress = byId('lb-progress')
  progressBar = byId('lb-progress').firstElementChild
  // the touch drag in progress, and the frame's offset from its fitted box
  drag = null
  slide = { x: 0, y: 0, scale: 1 }
  suppressClick = false
  slideshow = { playing: false, timer: null }

  // options: { reduced, rectFor(photo) -> rect|null, onStep(photo), onClosed(photo) }
  constructor(store, options) {
    this.store = store
    this.options = options
    this.closeButton.addEventListener('click', () => void this.close())
    this.backdrop.addEventListener('click', () => {
      if (!this.suppressClick) void this.close()
    })
    byId('lb-prev').addEventListener('click', () => this.userStep(-1))
    byId('lb-next').addEventListener('click', () => this.userStep(1))
    this.playButton.addEventListener('click', () => this.toggleSlideshow())
    addEventListener('keydown', this.onKey)
    // Space toggles the slideshow, so it must not also press a focused button
    addEventListener('keyup', (event) => {
      if (this.isOpen && event.key === ' ') event.preventDefault()
    })
    addEventListener('resize', () => {
      if (this.isOpen && this.photo) gsap.set(this.frame, this.fit(this.photo))
    })
    document.addEventListener('visibilitychange', () => {
      const timer = this.slideshow.timer
      if (!timer) return
      if (document.hidden) timer.pause()
      else timer.resume()
    })
    this.root.addEventListener('pointerdown', this.onDragStart)
    this.root.addEventListener('pointermove', this.onDragMove)
    this.root.addEventListener('pointerup', this.onDragEnd)
    this.root.addEventListener('pointercancel', this.onDragEnd)
  }

  open(photo, fromRect) {
    if (this.isOpen) return
    this.isOpen = true
    this.closing = false
    this.returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    this.root.hidden = false
    this.setSlide(0, 0, 1)
    this.fill(photo)
    this.playButton.disabled = this.store.count < 2

    const box = this.fit(photo)
    const reduced = this.options.reduced
    const tl = gsap.timeline()
    this.anim = tl
    tl.fromTo(
      this.backdrop,
      { opacity: 0 },
      { opacity: 1, duration: reduced ? 0.15 : 0.45, ease: 'power2.out' },
      0,
    )
    if (fromRect && !reduced) {
      tl.fromTo(
        this.frame,
        { ...toBox(fromRect), opacity: 1, scale: 1 },
        { ...box, duration: 0.85, ease: 'expo.inOut' },
        0,
      )
    } else {
      gsap.set(this.frame, box)
      tl.fromTo(
        this.frame,
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out' },
        0,
      )
    }
    tl.add(this.revealMeta(), reduced ? 0.05 : 0.45)
    if (!reduced) tl.add(this.sweep(), 0.7)
    this.closeButton.focus({ preventScroll: true })
  }

  async close() {
    if (!this.isOpen || this.closing || !this.photo) return
    this.closing = true
    this.stopSlideshow()
    this.drag = null
    this.anim?.kill()
    gsap.killTweensOf([this.frame, this.img, this.scan, this.backdrop, this.slide, ...this.meta.children])
    // fold a swipe-down offset into the frame's box so it flies home from there
    if (this.slide.x || this.slide.y || this.slide.scale !== 1) {
      const box = this.frame.getBoundingClientRect()
      gsap.set(this.frame, { x: box.left, y: box.top, width: box.width, height: box.height, scale: 1 })
      this.setSlide(0, 0, 1)
    }

    const photo = this.photo
    const toRect = this.options.reduced ? null : this.options.rectFor(photo)
    const tl = gsap.timeline()
    this.anim = tl
    tl.to(
      this.meta.children,
      { opacity: 0, y: 12, duration: 0.25, stagger: 0.02, ease: 'power2.in' },
      0,
    )
    tl.to(this.scan, { opacity: 0, duration: 0.1 }, 0)
    if (toRect && toRect.width > 4) {
      tl.to(this.frame, { ...toRect, opacity: 1, scale: 1, duration: 0.7, ease: 'expo.inOut' }, 0.05)
      tl.to(this.frame, { opacity: 0, duration: 0.2 }, 0.6)
    } else {
      tl.to(this.frame, { opacity: 0, scale: 0.96, duration: 0.3, ease: 'power2.in' }, 0)
    }
    tl.to(this.backdrop, { opacity: 0, duration: 0.5, ease: 'power2.inOut' }, 0.15)
    await tl.then()

    this.root.hidden = true
    gsap.set(this.frame, { clearProps: 'opacity,scale' })
    gsap.set(this.backdrop, { clearProps: 'opacity' })
    gsap.set(this.meta.children, { clearProps: 'opacity,transform' })
    gsap.set(this.img, { clearProps: 'opacity,transform' })
    this.isOpen = false
    this.closing = false
    this.anim = null
    // onClosed brings the HUD back first, so focus can return to a HUD button
    this.options.onClosed(photo)
    this.returnFocus?.focus({ preventScroll: true })
  }

  // A step the visitor asked for (buttons, arrow keys) pauses the slideshow.
  userStep(direction) {
    this.stopSlideshow()
    this.step(direction)
  }

  // `swiped`: the old photo already left with the finger, so the new one
  // slides in from the opposite edge.
  step(direction, { swiped = false } = {}) {
    if (!this.isOpen || this.closing || !this.photo) return
    this.anim?.progress(1)
    const total = this.store.count
    const index = (this.store.indexOf(this.photo) + direction + total) % total
    const photo = this.store.photos[index]
    this.fill(photo)
    this.options.onStep(photo)

    const box = this.fit(photo)
    if (this.options.reduced) {
      gsap.killTweensOf(this.slide)
      this.setSlide(0, 0, 1)
      gsap.set(this.frame, box)
      gsap.fromTo(this.img, { opacity: 0.4 }, { opacity: 1, duration: 0.25 })
      return
    }
    if (swiped) {
      gsap.set(this.frame, box)
      this.setSlide(direction * Math.min(innerWidth * 0.45, 320), 0, 1)
      gsap.to(this.slide, { x: 0, duration: 0.6, ease: 'expo.out', onUpdate: this.applySlide })
      gsap.fromTo(this.img, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' })
    } else {
      gsap.to(this.frame, { ...box, duration: 0.6, ease: 'expo.out', overwrite: true })
      gsap.fromTo(
        this.img,
        { opacity: 0.25, x: direction * 24 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'expo.out' },
      )
    }
    this.sweep()
    gsap.fromTo(
      this.meta.children,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.03, ease: 'power2.out' },
    )
  }

  // Largest box with the photo's aspect ratio that fits the image area, centred.
  fit(photo) {
    const area = this.area.getBoundingClientRect()
    const aspect = photo.width / photo.height
    let width = area.width
    let height = width / aspect
    if (height > area.height) {
      height = area.height
      width = height * aspect
    }
    return {
      x: area.left + (area.width - width) / 2,
      y: area.top + (area.height - height) / 2,
      width,
      height,
    }
  }

  fill(photo) {
    this.photo = photo
    const total = this.store.count
    const index = this.store.indexOf(photo)
    this.root.style.setProperty('--tone', photo.tone)
    byId('lb-index').textContent = `Frame ${padIndex(index + 1, total)} / ${padIndex(total, total)}`
    byId('lb-category').textContent = photo.category
    byId('lb-title').textContent = photo.title
    byId('lb-place').textContent = photo.place ?? ''
    byId('lb-size').textContent = `${photo.width} × ${photo.height} px`
    byId('lb-ratio').textContent = formatRatio(photo.width, photo.height)
    byId('lb-tone').textContent = photo.tone
    byId('lb-accent').textContent = photo.accent
    byId('lb-tone-swatch').style.setProperty('--c', photo.tone)
    byId('lb-accent-swatch').style.setProperty('--c', photo.accent)

    const credit = byId('lb-credit')
    credit.replaceChildren()
    if (photo.local) {
      credit.textContent = 'Your photo · stays on this device'
    } else if (photo.credit) {
      const name = document.createElement(photo.credit.url ? 'a' : 'span')
      name.textContent = photo.credit.name
      if (name instanceof HTMLAnchorElement && photo.credit.url) {
        name.href = photo.credit.url
        name.target = '_blank'
        name.rel = 'noopener noreferrer'
      }
      credit.append('Photo by ', name, ' on Unsplash')
    }

    // Show the small preview straight away, then swap in the full size once
    // it has decoded (unless the user has moved on to another photo).
    const token = ++this.loadToken
    const resolution = byId('lb-res')
    this.img.alt = photo.title
    this.img.src = photo.src
    if (photo.full === photo.src) {
      resolution.textContent = 'Original'
      return
    }
    resolution.textContent = 'Preview · loading full size'
    const full = new Image()
    full.decoding = 'async'
    full.src = photo.full
    full
      .decode()
      .then(() => {
        if (token !== this.loadToken) return
        this.img.src = photo.full
        resolution.textContent = `Full · ${Math.max(photo.width, photo.height)} px`
      })
      .catch(() => {
        if (token === this.loadToken) resolution.textContent = 'Preview · full size unavailable'
      })
  }

  revealMeta() {
    const tl = gsap.timeline()
    tl.fromTo(
      this.meta.children,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: 'power3.out' },
    )
    return tl
  }

  // A bright scan line that sweeps down over the photo.
  sweep() {
    const tl = gsap.timeline()
    tl.fromTo(this.scan, { top: '0%', opacity: 1 }, { top: '100%', duration: 0.7, ease: 'power2.inOut' })
    tl.to(this.scan, { opacity: 0, duration: 0.15 }, '>-0.1')
    return tl
  }

  onKey = (event) => {
    if (!this.isOpen) return
    if (event.key === 'Escape') {
      event.preventDefault()
      this.close()
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      this.userStep(1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      this.userStep(-1)
    } else if (event.key === ' ') {
      event.preventDefault()
      if (!event.repeat) this.toggleSlideshow()
    } else if (event.key === 'Tab') {
      // Keep keyboard focus inside the dialog.
      const focusable = [...this.root.querySelectorAll('button, a[href]')].filter(
        (el) => el.offsetParent !== null,
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
  }

  // ---------------------------------------------------------------------------
  // Slideshow: advances every SLIDE_SECONDS while playing, with a thin
  // progress line under the photo. Pauses while the tab is hidden; any
  // step, swipe or close by the visitor stops it.

  toggleSlideshow() {
    if (this.slideshow.playing) this.stopSlideshow()
    else this.playSlideshow()
  }

  playSlideshow() {
    if (!this.isOpen || this.closing || this.store.count < 2) return
    this.slideshow.playing = true
    this.playButton.setAttribute('aria-pressed', 'true')
    this.playButton.setAttribute('aria-label', 'Pause slideshow')
    this.root.classList.add('is-playing')
    this.restartTimer()
  }

  stopSlideshow() {
    const show = this.slideshow
    show.timer?.kill()
    show.timer = null
    if (!show.playing) return
    show.playing = false
    this.playButton.setAttribute('aria-pressed', 'false')
    this.playButton.setAttribute('aria-label', 'Play slideshow')
    this.root.classList.remove('is-playing')
    gsap.to(this.progressBar, { scaleX: 0, duration: 0.25, ease: 'power2.out' })
  }

  restartTimer() {
    const show = this.slideshow
    show.timer?.kill()
    show.timer = gsap.fromTo(
      this.progressBar,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: SLIDE_SECONDS,
        ease: 'none',
        onComplete: () => {
          if (!show.playing || !this.isOpen || this.closing) return
          this.step(1)
          this.restartTimer()
        },
      },
    )
    if (document.hidden) show.timer.pause()
  }

  // ---------------------------------------------------------------------------
  // Touch drag: the frame follows the finger along the first axis it moves
  // on, then either commits (next/previous photo, or close) or snaps back.

  setSlide(x, y, scale) {
    this.slide.x = x
    this.slide.y = y
    this.slide.scale = scale
    this.applySlide()
  }

  applySlide = () => {
    const { x, y, scale } = this.slide
    this.frame.style.translate = x || y ? `${x}px ${y}px` : ''
    this.frame.style.scale = scale !== 1 ? String(scale) : ''
  }

  onDragStart = (event) => {
    if (!this.isOpen || this.closing || event.pointerType === 'mouse' || this.drag) return
    if (event.target.closest('button, a, .lightbox__meta')) return
    this.suppressClick = false
    this.drag = {
      id: event.pointerId,
      x0: event.clientX,
      y0: event.clientY,
      dx: 0,
      dy: 0,
      axis: null,
      vx: 0,
      vy: 0,
      lastX: event.clientX,
      lastY: event.clientY,
      lastT: performance.now(),
    }
  }

  onDragMove = (event) => {
    const drag = this.drag
    if (!drag || event.pointerId !== drag.id) return
    const now = performance.now()
    const dt = Math.max(1, now - drag.lastT)
    drag.vx = (event.clientX - drag.lastX) / dt
    drag.vy = (event.clientY - drag.lastY) / dt
    drag.lastX = event.clientX
    drag.lastY = event.clientY
    drag.lastT = now
    drag.dx = event.clientX - drag.x0
    drag.dy = event.clientY - drag.y0
    if (!drag.axis) {
      if (Math.hypot(drag.dx, drag.dy) < 10) return
      drag.axis = Math.abs(drag.dx) > Math.abs(drag.dy) ? 'x' : 'y'
      this.suppressClick = true
      try {
        this.root.setPointerCapture(event.pointerId)
      } catch {}
      this.stopSlideshow()
      this.anim?.progress(1)
      gsap.killTweensOf(this.slide)
    }
    if (drag.axis === 'x') {
      // resists when there is nothing to swipe to
      const x = this.store.count < 2 ? drag.dx * 0.25 : drag.dx
      this.setSlide(x, 0, 1)
      this.img.style.opacity = String(1 - Math.min(0.5, Math.abs(x) / innerWidth))
    } else {
      const y = drag.dy > 0 ? drag.dy : drag.dy * 0.2
      const pull = clamp(y / innerHeight, 0, 1)
      this.setSlide(drag.dx * 0.3, y, 1 - pull * 0.25)
      this.backdrop.style.opacity = String(1 - pull * 1.2)
    }
  }

  onDragEnd = (event) => {
    const drag = this.drag
    if (!drag || event.pointerId !== drag.id) return
    this.drag = null
    // the click that follows a drag must not close the lightbox
    setTimeout(() => (this.suppressClick = false), 0)
    if (!drag.axis) return
    const cancelled = event.type === 'pointercancel'
    if (drag.axis === 'x') {
      const far = Math.abs(drag.dx) > Math.min(110, innerWidth * 0.22)
      const flung = Math.abs(drag.vx) > 0.45 && Math.abs(drag.dx) > 30 && Math.sign(drag.vx) === Math.sign(drag.dx)
      if (!cancelled && this.store.count > 1 && (far || flung)) {
        const direction = drag.dx < 0 ? 1 : -1
        gsap.to(this.slide, {
          x: -direction * innerWidth * 0.6,
          duration: 0.22,
          ease: 'power2.in',
          onUpdate: this.applySlide,
          onComplete: () => {
            this.img.style.opacity = ''
            this.step(direction, { swiped: true })
          },
        })
        gsap.to(this.img, { opacity: 0, duration: 0.2 })
        return
      }
    } else if (!cancelled && (drag.dy > Math.min(140, innerHeight * 0.18) || (drag.vy > 0.5 && drag.dy > 40))) {
      this.backdrop.style.opacity = ''
      gsap.set(this.backdrop, { opacity: clamp(1 - (drag.dy / innerHeight) * 1.2, 0, 1) })
      void this.close()
      return
    }
    // not far enough: snap back
    gsap.to(this.slide, { x: 0, y: 0, scale: 1, duration: 0.5, ease: 'expo.out', onUpdate: this.applySlide })
    gsap.to(this.img, { opacity: 1, duration: 0.3, onComplete: () => (this.img.style.opacity = '') })
    gsap.to(this.backdrop, { opacity: 1, duration: 0.3, onComplete: () => (this.backdrop.style.opacity = '') })
  }
}
