// The Worlds panel: the navigator. Home (the gallery) first, then the Moon
// and the Sun, the seven planets and five dwarf planets in order from the
// Sun, and the ships to follow; a time-scale control (pause / 1× / 10× /
// 100×) and the Orbits and Labels toggles. Built on Sheet.
//
//   const panel = new WorldsPanel(system, { reduced, timeScales, onPick(target),
//     onTimeScale(scale), onOrbits(on), onLabels(on) })
//   panel.open(trigger) / close() / toggle(trigger), panel.isOpen
//   panel.setFocus(target), setTimeScale(scale), setOrbits(on), setLabels(on)
import { SHIP_INFO } from '../data/worlds.js'
import { Sheet } from './sheet.js'

const PLANETS = ['mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune']
const DWARFS = ['ceres', 'pluto', 'haumea', 'makemake', 'eris']
const PAUSE_ICON = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5.5 3.5v9M10.5 3.5v9" /></svg>'

function el(tag, className, text) {
  const node = document.createElement(tag)
  if (className) node.className = className
  if (text !== undefined) node.textContent = text
  return node
}

export class WorldsPanel {
  sheet
  rows = new Map()
  scaleButtons = []
  toggles = {}
  current = null

  // options: { reduced, timeScales, onPick(target), onTimeScale(scale), onOrbits(on), onLabels(on) }
  constructor(system, options) {
    this.system = system
    this.options = options
    this.sheet = new Sheet({
      id: 'worlds-sheet',
      title: 'Worlds',
      meta: '· 12 + Sun + Moon',
      className: 'sheet--worlds',
      reduced: options.reduced,
      initialFocus: () => this.rows.get(this.current)?.button ?? this.rows.values().next().value?.button,
    })
    this.sheet.body.append(this.buildControls(), this.buildList())
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

  buildControls() {
    const controls = el('div', 'worlds__controls')
    const timeLabel = el('p', 'worlds__label mono', 'Time')
    timeLabel.id = 'worlds-time-label'
    const segments = el('div', 'seg')
    segments.setAttribute('role', 'radiogroup')
    segments.setAttribute('aria-labelledby', 'worlds-time-label')
    for (const scale of this.options.timeScales) {
      const button = el('button', 'seg__btn mono')
      button.type = 'button'
      button.setAttribute('role', 'radio')
      button.setAttribute('aria-checked', 'false')
      button.dataset.scale = String(scale)
      if (scale === 0) {
        button.innerHTML = `${PAUSE_ICON}<span class="sr-only">Pause</span>`
      } else button.textContent = `${scale}×`
      // reduced motion keeps the clocks at 1× at most
      if (this.options.reduced && scale > 1) {
        button.disabled = true
        button.title = 'Off with reduced motion'
      }
      button.addEventListener('click', () => this.options.onTimeScale(scale))
      segments.append(button)
      this.scaleButtons.push(button)
    }
    // arrow keys move along the radio group
    segments.addEventListener('keydown', (event) => {
      const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key]
      if (!step) return
      event.preventDefault()
      const enabled = this.scaleButtons.filter((button) => !button.disabled)
      const index = enabled.findIndex((button) => button.getAttribute('aria-checked') === 'true')
      const next = enabled[Math.min(enabled.length - 1, Math.max(0, index + step))]
      this.options.onTimeScale(Number(next.dataset.scale))
      next.focus()
    })
    const keys = el('p', 'worlds__keys mono', '[ ] slower · faster')
    const toggles = el('div', 'worlds__toggles')
    for (const [key, label, handler] of [
      ['orbits', 'Orbits', this.options.onOrbits],
      ['labels', 'Labels', this.options.onLabels],
    ]) {
      const button = el('button', 'switch mono')
      button.type = 'button'
      button.setAttribute('aria-pressed', 'true')
      button.innerHTML = `<span class="switch__track" aria-hidden="true"><i></i></span><span>${label}</span>`
      button.addEventListener('click', () => handler(button.getAttribute('aria-pressed') !== 'true'))
      toggles.append(button)
      this.toggles[key] = button
    }
    controls.append(timeLabel, segments, keys, toggles)
    return controls
  }

  buildList() {
    const system = this.system
    const list = el('div', 'worlds__list')
    const group = (title, targets) => {
      const section = el('section', 'worlds__group')
      const heading = el('h3', 'worlds__heading mono', title)
      const items = el('ul', 'worlds__rows')
      for (const target of targets) items.append(this.row(target))
      section.append(heading, items)
      list.append(section)
    }
    group('Nearby', [system.home, system.moon, system.sun])
    group(`Planets · ${PLANETS.length}`, PLANETS.map((id) => system.bodyById(id)))
    group(`Dwarf planets · ${DWARFS.length}`, DWARFS.map((id) => system.bodyById(id)))
    const ships = system.ships?.list ?? []
    if (ships.length) group(`Ships · ${ships.length}`, ships)
    return list
  }

  row(target) {
    const item = el('li')
    const button = el('button', 'world')
    button.type = 'button'
    const ship = SHIP_INFO[target.id]
    const color = target.id === 'home' ? '#9cc7ff' : (target.color ?? '#cfe0ff')
    const kind = ship ? 'Ship' : target.kind
    const fact = ship ? ship.short : target.id === 'sun' ? 'Centre' : (target.facts?.fromSun ?? '')
    const dot = el('i', `world__dot${ship ? ' world__dot--ship' : ''}`)
    dot.style.setProperty('--dot', color)
    const text = el('span', 'world__text')
    text.append(el('span', 'world__name', target.name), el('span', 'world__kind mono', kind))
    button.append(dot, text, el('span', 'world__fact mono', fact))
    button.setAttribute('aria-label', `${target.name}, ${kind}${fact ? `, ${fact}` : ''}`)
    button.addEventListener('click', () => this.options.onPick(target))
    item.append(button)
    this.rows.set(target, { button })
    return item
  }

  // Marks the row the camera is on.
  setFocus(target) {
    if (target === this.current) return
    this.rows.get(this.current)?.button.removeAttribute('aria-current')
    this.current = target
    this.rows.get(target)?.button.setAttribute('aria-current', 'true')
  }

  setTimeScale(scale) {
    for (const button of this.scaleButtons) {
      const on = Number(button.dataset.scale) === scale
      button.setAttribute('aria-checked', String(on))
      button.tabIndex = on ? 0 : -1
    }
  }

  setOrbits(on) {
    this.toggles.orbits.setAttribute('aria-pressed', String(on))
  }

  setLabels(on) {
    this.toggles.labels.setAttribute('aria-pressed', String(on))
  }
}
