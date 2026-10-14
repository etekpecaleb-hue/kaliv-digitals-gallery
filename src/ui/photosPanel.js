// The Photos panel: a finite thumbnail grid of the gallery, "Use my photos"
// (replaces the gallery with the visitor's own files) and "Restore
// originals". Built on Sheet; re-renders when the store changes.
import { padIndex } from '../core/math.js'
import { MAX_FILES } from '../gallery/photoStore.js'
import { Sheet } from './sheet.js'

const UPLOAD_ICON =
  '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 11V2.5M4.5 6L8 2.5 11.5 6M2.5 10.5v3h11v-3" /></svg>'
const RESTORE_ICON =
  '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8a5 5 0 1 0 1.6-3.7M3 2.5v2.8h2.8" /></svg>'

function button(className, html, label) {
  const el = document.createElement('button')
  el.type = 'button'
  el.className = className
  el.innerHTML = `${html}<span>${label}</span>`
  return el
}

export class PhotosPanel {
  store
  options
  sheet
  status = document.createElement('p')
  grid = document.createElement('ul')
  useButton
  restoreButton
  note = document.createElement('p')
  // index of the thumbnail that takes focus (roving tabindex)
  current = 0

  // options: { reduced, onPick(photo), onUseMine(), onRestore() }
  constructor(store, options) {
    this.store = store
    this.options = options
    this.sheet = new Sheet({
      id: 'photos-sheet',
      title: 'Photos',
      className: 'sheet--photos',
      reduced: options.reduced,
      initialFocus: () => this.grid.querySelector('[tabindex="0"]'),
    })
    this.status.className = 'photos__status mono'
    this.grid.className = 'photos__grid'
    this.grid.setAttribute('aria-label', 'Photos in the gallery')
    this.grid.addEventListener('keydown', this.onGridKey)
    this.grid.addEventListener('click', (event) => {
      const thumb = event.target.closest('.thumb')
      if (!thumb) return
      const photo = this.store.photos[Number(thumb.dataset.index)]
      if (photo) this.options.onPick(photo)
    })
    this.sheet.body.append(this.status, this.grid)

    this.useButton = button('sheet-btn sheet-btn--primary', UPLOAD_ICON, 'Use my photos')
    this.restoreButton = button('sheet-btn', RESTORE_ICON, 'Restore originals')
    this.useButton.addEventListener('click', () => this.options.onUseMine())
    this.restoreButton.addEventListener('click', () => this.options.onRestore())
    this.note.className = 'sheet__note mono'
    this.note.textContent = `JPG · PNG · WebP · AVIF · GIF · up to ${MAX_FILES} · stays on this device`
    const actions = document.createElement('div')
    actions.className = 'sheet__actions'
    actions.append(this.useButton, this.restoreButton)
    this.sheet.foot.append(actions, this.note)
    this.render()
  }

  get isOpen() {
    return this.sheet.isOpen
  }

  open(trigger) {
    this.sheet.open(trigger)
  }

  close(options) {
    this.sheet.close(options)
  }

  toggle(trigger) {
    this.sheet.toggle(trigger)
  }

  // Rebuilds the grid, title and actions for the store's current photos.
  render() {
    const { photos, isCustom } = this.store
    const total = photos.length
    this.sheet.setTitle('Photos', `· ${total}`)
    this.status.textContent = isCustom
      ? `Your photos · ${total} · never uploaded`
      : `Original gallery · ${total} frames`
    this.restoreButton.hidden = !isCustom
    this.useButton.querySelector('span').textContent = isCustom ? 'Choose other photos' : 'Use my photos'
    this.grid.classList.toggle('is-dense', total > 48)
    this.current = Math.min(this.current, Math.max(0, total - 1))
    const items = photos.map((photo, index) => {
      const item = document.createElement('li')
      const thumb = document.createElement('button')
      thumb.type = 'button'
      thumb.className = 'thumb'
      thumb.dataset.index = String(index)
      thumb.tabIndex = index === this.current ? 0 : -1
      const number = padIndex(index + 1, total)
      thumb.setAttribute('aria-label', `${number} · ${photo.title}`)
      thumb.style.setProperty('--tone', photo.tone)
      const img = document.createElement('img')
      img.alt = ''
      img.loading = 'lazy'
      img.decoding = 'async'
      img.draggable = false
      img.src = photo.src
      const index_ = document.createElement('span')
      index_.className = 'thumb__index mono'
      index_.textContent = number
      const title = document.createElement('span')
      title.className = 'thumb__title'
      title.textContent = photo.title
      thumb.append(img, index_, title)
      item.append(thumb)
      return item
    })
    this.grid.replaceChildren(...items)
  }

  columns() {
    return getComputedStyle(this.grid).gridTemplateColumns.split(' ').filter(Boolean).length || 3
  }

  // Arrow keys / Home / End move between thumbnails.
  onGridKey = (event) => {
    const thumb = event.target.closest('.thumb')
    if (!thumb) return
    const total = this.store.count
    const index = Number(thumb.dataset.index)
    const columns = this.columns()
    const moves = {
      ArrowRight: 1,
      ArrowLeft: -1,
      ArrowDown: columns,
      ArrowUp: -columns,
      Home: -index,
      End: total - 1 - index,
    }
    if (!(event.key in moves)) return
    event.preventDefault()
    const next = Math.min(total - 1, Math.max(0, index + moves[event.key]))
    const thumbs = this.grid.querySelectorAll('.thumb')
    thumbs[this.current]?.setAttribute('tabindex', '-1')
    this.current = next
    thumbs[next].setAttribute('tabindex', '0')
    thumbs[next].focus()
  }
}
