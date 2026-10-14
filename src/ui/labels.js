// HTML labels for the worlds: a dot in the body's colour and its name, set
// beside each body every frame. A label hides behind the camera, off screen,
// when its body is already big on screen (> 60 px radius), when a nearer
// body covers it, and fades with distance (planets first, the Moon, dwarf
// planets and ships only closer in). Labels that would overlap give way to
// the more important one. Tapping a label calls onSelect(target).
//
//   const labels = new Labels({ explorer, system, onSelect })
//   labels.update(dt)          every frame, after the camera has moved
//   labels.setVisible(bool)    the Labels toggle; labels.setActive(bool) the app's gate
import { Vector3 } from 'three'
import { clamp } from '../core/math.js'

const BIG_PX = 60
const EDGE = 8

// how far from the camera each kind still gets a label (it fades out over
// the last quarter), and how important it is when labels overlap
const RULES = {
  Star: { priority: 0, range: Infinity },
  'Home world': { priority: 1, range: Infinity },
  Planet: { priority: 2, range: Infinity },
  Moon: { priority: 3, range: 420 },
  'Dwarf planet': { priority: 4, range: 1900 },
  Ship: { priority: 5, range: 140 },
}

const screen = { x: 0, y: 0 }
const toTarget = new Vector3()
const toOther = new Vector3()

// most important first, then nearest
const byImportance = (a, b) => b.focused - a.focused || a.priority - b.priority || a.depth - b.depth

const smooth = (a, b, x) => {
  const t = clamp((x - a) / (b - a), 0, 1)
  return t * t * (3 - 2 * t)
}

export class Labels {
  root = document.createElement('div')
  entries = []
  // drawn order for decluttering (reused every frame)
  order = []
  placed = []
  enabled = true
  active = false
  shown = false
  // what the camera follows (its label shows at any range and wins overlaps)
  focus = null

  // options: { explorer, system, coarse, onSelect(target) }
  constructor({ explorer, system, coarse = false, onSelect }) {
    this.explorer = explorer
    this.system = system
    // matches .label's CSS height (taller touch targets on phones)
    this.height = coarse ? 26 : 20
    this.root.className = 'labels'
    this.root.setAttribute('aria-label', 'Worlds in view')
    this.root.hidden = true
    document.body.append(this.root)
    for (const body of system.bodies) this.add(body, body.kind, body.id === 'home' ? '#9cc7ff' : body.color)
    for (const ship of system.ships?.list ?? []) this.add(ship, 'Ship', '#cfe0ff')
    this.root.addEventListener('click', (event) => {
      const el = event.target.closest('.label')
      const entry = el && this.entries.find((candidate) => candidate.el === el)
      if (entry) onSelect(entry.target)
    })
    for (const entry of this.entries) this.order.push(entry)
  }

  add(target, kind, color) {
    const rule = RULES[kind] ?? RULES.Planet
    const el = document.createElement('button')
    el.type = 'button'
    el.className = `label label--${kind.toLowerCase().replace(/\s+/g, '-')}`
    el.tabIndex = -1
    el.setAttribute('aria-label', `Fly to ${target.name}`)
    el.innerHTML = '<i class="label__dot"></i><span class="label__name"></span>'
    el.querySelector('.label__name').textContent = target.name
    el.style.setProperty('--dot', color)
    this.root.append(el)
    this.entries.push({
      target,
      el,
      priority: rule.priority,
      range: rule.range,
      index: this.explorer.bodyIndex.get(target),
      position: new Vector3(),
      width: 0,
      x: 0,
      y: 0,
      depth: 0,
      radiusPx: 0,
      opacity: 0,
      focused: 0,
      // what the DOM shows (far off, so the first write always happens)
      shownX: -1e9,
      shownY: -1e9,
      shownOpacity: -1,
      on: false,
    })
  }

  // The visitor's Labels toggle.
  setVisible(visible) {
    this.enabled = visible
  }

  // The app's gate (off at home, close in, and during the intro).
  setActive(active) {
    this.active = active
  }

  update() {
    const show = this.enabled && this.active
    if (show !== this.shown) {
      this.shown = show
      this.root.hidden = !show
      if (!show) for (const entry of this.entries) this.hide(entry)
    }
    if (!show) return
    this.measure()
    this.declutter()
    const entries = this.entries
    for (let i = 0; i < entries.length; i++) this.write(entries[i])
  }

  // Projects every label and decides which could show at all.
  measure() {
    const { explorer } = this
    const camera = explorer.camera
    const focal = explorer.focalPx
    const width = explorer.stage.width
    const height = explorer.stage.height
    const entries = this.entries
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i]
      const position = entry.index === undefined ? entry.target.object3D.getWorldPosition(entry.position) : entry.position.copy(explorer.bodyPositions[entry.index])
      const depth = explorer.toScreen(position, screen)
      entry.opacity = 0
      if (depth <= camera.near) continue
      const radiusPx = (entry.target.radius * focal) / depth
      if (radiusPx > BIG_PX) continue
      const distance = camera.position.distanceTo(position)
      // the camera's own focus keeps its label at any range
      const far = entry.range === Infinity || entry.target === this.focus
      const fade = far ? 1 : 1 - smooth(entry.range * 0.75, entry.range, distance)
      if (fade <= 0.02) continue
      // beside the body's limb, vertically centred on it; on its left when
      // the right edge of the screen would cut it off
      if (!entry.width) entry.width = entry.el.offsetWidth || 90
      const limb = Math.max(radiusPx, 3) + 4
      let x = screen.x + limb
      if (x + entry.width > width - EDGE) x = screen.x - limb - entry.width
      const y = screen.y - this.height / 2
      // only for bodies on screen (a label flipped left of one just past the
      // right edge would otherwise still show)
      if (screen.x < -EDGE || screen.x > width + EDGE || y < -this.height || y > height) continue
      if (this.covered(entry, position, distance)) continue
      entry.x = x
      entry.y = y
      entry.depth = depth
      entry.radiusPx = radiusPx
      entry.opacity = fade
      entry.focused = entry.target === this.focus ? 1 : 0
    }
  }

  // Is a body nearer the camera in the way of `entry`'s centre?
  covered(entry, position, distance) {
    const { explorer } = this
    const camera = explorer.camera.position
    toTarget.subVectors(position, camera).divideScalar(distance)
    const bodies = this.system.bodies
    for (let i = 0; i < bodies.length; i++) {
      if (bodies[i] === entry.target) continue
      toOther.subVectors(explorer.bodyPositions[i], camera)
      const along = toOther.dot(toTarget)
      if (along <= 0 || along >= distance) continue
      const radius = explorer.solidRadii[i]
      if (toOther.lengthSq() - along * along < radius * radius) return true
    }
    return false
  }

  // Greedy: the most important (then nearest) labels claim their space first.
  declutter() {
    const order = this.order
    // insertion sort in place: the order barely changes between frames, and
    // Array.prototype.sort may allocate a scratch copy every call
    for (let i = 1; i < order.length; i++) {
      const entry = order[i]
      let j = i - 1
      while (j >= 0 && byImportance(order[j], entry) > 0) {
        order[j + 1] = order[j]
        j--
      }
      order[j + 1] = entry
    }
    const placed = this.placed
    const tall = this.height
    placed.length = 0
    for (let i = 0; i < order.length; i++) {
      const entry = order[i]
      if (entry.opacity <= 0) continue
      // the focus always gets its label; then by importance
      const left = entry.x
      const right = entry.x + entry.width
      const top = entry.y
      const bottom = entry.y + tall
      let clear = true
      for (let j = 0; j < placed.length; j++) {
        const other = placed[j]
        if (left < other.x + other.width && right > other.x && top < other.y + tall && bottom > other.y) {
          clear = false
          break
        }
      }
      if (clear) placed.push(entry)
      else entry.opacity = 0
    }
  }

  // Minimal DOM writes: only what changed, transforms only (no layout).
  write(entry) {
    if (entry.opacity <= 0) return this.hide(entry)
    const el = entry.el
    if (!entry.on) {
      entry.on = true
      el.classList.add('is-on')
    }
    if (Math.abs(entry.x - entry.shownX) > 0.3 || Math.abs(entry.y - entry.shownY) > 0.3) {
      entry.shownX = entry.x
      entry.shownY = entry.y
      el.style.transform = `translate3d(${entry.x.toFixed(1)}px, ${entry.y.toFixed(1)}px, 0)`
    }
    if (Math.abs(entry.opacity - entry.shownOpacity) > 0.03) {
      entry.shownOpacity = entry.opacity
      el.style.opacity = entry.opacity.toFixed(2)
    }
  }

  hide(entry) {
    if (!entry.on) return
    entry.on = false
    entry.shownOpacity = -1
    entry.el.classList.remove('is-on')
    entry.el.style.opacity = '0'
  }
}
