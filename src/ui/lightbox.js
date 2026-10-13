// Full-size photo view. The frame flies out of the globe panel's screen
// rectangle on open and back into it on close.
import { gsap } from 'gsap'
import { formatRatio, padIndex } from '../core/math.js'

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
  swipe = { id: -1, x: 0, y: 0 }

  // options: { reduced, rectFor(photo) -> rect|null, onStep(photo), onClosed(photo) }
  constructor(store, options) {
    this.store = store
    this.options = options
    this.closeButton.addEventListener('click', () => void this.close())
    this.backdrop.addEventListener('click', () => void this.close())
    byId('lb-prev').addEventListener('click', () => this.step(-1))
    byId('lb-next').addEventListener('click', () => this.step(1))
    addEventListener('keydown', this.onKey)
    addEventListener('resize', () => {
      if (this.isOpen && this.photo) gsap.set(this.frame, this.fit(this.photo))
    })
    this.frame.addEventListener('pointerdown', (event) => {
      this.swipe = { id: event.pointerId, x: event.clientX, y: event.clientY }
    })
    this.frame.addEventListener('pointerup', (event) => {
      if (event.pointerId !== this.swipe.id) return
      const dx = event.clientX - this.swipe.x
      const dy = event.clientY - this.swipe.y
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.4) this.step(dx < 0 ? 1 : -1)
    })
  }

  open(photo, fromRect) {
    if (this.isOpen) return
    this.isOpen = true
    this.closing = false
    this.returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    this.root.hidden = false
    this.fill(photo)

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
    this.anim?.kill()
    gsap.killTweensOf([this.frame, this.img, this.scan, this.backdrop, ...this.meta.children])

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
    gsap.set(this.meta.children, { clearProps: 'opacity,transform' })
    gsap.set(this.img, { clearProps: 'opacity,transform' })
    this.isOpen = false
    this.closing = false
    this.anim = null
    this.returnFocus?.focus({ preventScroll: true })
    this.options.onClosed(photo)
  }

  step(direction) {
    if (!this.isOpen || this.closing || !this.photo) return
    this.anim?.progress(1)
    const total = this.store.count
    const index = (this.store.indexOf(this.photo) + direction + total) % total
    const photo = this.store.photos[index]
    this.fill(photo)
    this.options.onStep(photo)

    const box = this.fit(photo)
    if (this.options.reduced) {
      gsap.set(this.frame, box)
      return
    }
    gsap.to(this.frame, { ...box, duration: 0.6, ease: 'expo.out', overwrite: true })
    gsap.fromTo(
      this.img,
      { opacity: 0.25, x: direction * 24 },
      { opacity: 1, x: 0, duration: 0.6, ease: 'expo.out' },
    )
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
      credit.textContent = 'Added from your device. It stays in this browser tab.'
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
      this.step(1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      this.step(-1)
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
}
