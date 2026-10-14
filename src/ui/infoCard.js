// The info card: facts about whatever the camera is focused on, whenever
// that is not home. Modeless (the scene stays live behind it): a card at the
// left on desktop, a compact card above the readout on phones. "Home" (G)
// flies back to the gallery, "Next world →" on to the next one.
//
//   const card = new InfoCard({ reduced, onHome(), onNext() })
//   card.show(target) / card.hide(), card.visible, card.height
import { gsap } from 'gsap'
import { SHIP_INFO } from '../data/worlds.js'

const HOME_ICON =
  '<svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="5.6" /><path d="M2.4 8h11.2M8 2.4c2 2.2 2 9 0 11.2M8 2.4c-2 2.2-2 9 0 11.2" /></svg>'
const NEXT_ICON = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2.5 8h10M9 4.5L12.5 8 9 11.5" /></svg>'

function factsFor(target) {
  const ship = SHIP_INFO[target.id]
  if (ship) {
    return {
      kind: ship.kind,
      blurb: ship.blurb,
      rows: [
        ['Route', ship.facts.route],
        ['Lap', ship.facts.lap],
        ['Class', ship.facts.crew],
      ],
    }
  }
  const facts = target.facts ?? {}
  const star = target.kind === 'Star'
  return {
    kind: target.kind,
    blurb: facts.blurb ?? '',
    rows: [
      ['Diameter', facts.diameter],
      [star ? 'Place' : 'From Sun', star ? 'The centre' : facts.fromSun],
      ['Day', facts.day],
      ['Year', facts.year],
      [star ? 'Family' : 'Moons', facts.moons],
    ].filter(([, value]) => value),
  }
}

export class InfoCard {
  root = document.createElement('aside')
  target = null
  visible = false
  anim = null

  // options: { reduced, onHome(), onNext() }
  constructor(options) {
    this.options = options
    const root = this.root
    root.className = 'info-card'
    root.hidden = true
    root.setAttribute('aria-labelledby', 'info-title')
    root.innerHTML = `
      <div class="info-card__inner">
        <header class="info-card__head">
          <i class="info-card__dot" aria-hidden="true"></i>
          <h2 class="info-card__title" id="info-title" aria-live="polite"></h2>
          <span class="chip info-card__kind"></span>
        </header>
        <p class="info-card__blurb"></p>
        <dl class="info-card__facts mono"></dl>
        <div class="info-card__actions">
          <button class="sheet-btn info-card__home" type="button">${HOME_ICON}<span>Home</span><kbd class="info-card__key">G</kbd></button>
          <button class="sheet-btn sheet-btn--primary info-card__next" type="button"><span class="info-card__next-label">Next world</span>${NEXT_ICON}</button>
        </div>
      </div>`
    this.inner = root.querySelector('.info-card__inner')
    this.dot = root.querySelector('.info-card__dot')
    this.title = root.querySelector('.info-card__title')
    this.kind = root.querySelector('.info-card__kind')
    this.blurb = root.querySelector('.info-card__blurb')
    this.facts = root.querySelector('.info-card__facts')
    this.nextLabel = root.querySelector('.info-card__next-label')
    root.querySelector('.info-card__home').addEventListener('click', () => options.onHome())
    root.querySelector('.info-card__next').addEventListener('click', () => options.onNext())
    document.body.append(root)
  }

  // Card height in CSS px (reads layout, so only call after content changes).
  get height() {
    return this.visible ? this.root.offsetHeight : 0
  }

  show(target) {
    const changed = target !== this.target
    this.target = target
    if (changed) this.fill(target)
    if (this.visible) {
      if (changed && !this.options.reduced) {
        gsap.fromTo(this.inner, { opacity: 0.25 }, { opacity: 1, duration: 0.45, ease: 'power2.out', overwrite: true })
      }
      return
    }
    this.visible = true
    this.root.hidden = false
    this.anim?.kill()
    this.anim = this.options.reduced
      ? gsap.fromTo(this.root, { opacity: 0 }, { opacity: 1, duration: 0.2 })
      : gsap.fromTo(this.root, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
  }

  hide() {
    if (!this.visible) return
    this.visible = false
    this.anim?.kill()
    // keep focus on the page if it was on one of the card's buttons
    if (this.root.contains(document.activeElement)) document.activeElement.blur()
    this.anim = gsap.to(this.root, {
      opacity: 0,
      y: this.options.reduced ? 0 : 10,
      duration: this.options.reduced ? 0.15 : 0.3,
      ease: 'power2.in',
      onComplete: () => void (this.root.hidden = true),
    })
  }

  fill(target) {
    const { kind, blurb, rows } = factsFor(target)
    this.dot.style.setProperty('--dot', target.color ?? '#cfe0ff')
    this.title.textContent = target.name
    this.kind.textContent = kind
    this.blurb.textContent = blurb
    const items = rows.map(([label, value]) => {
      const row = document.createElement('div')
      const dt = document.createElement('dt')
      const dd = document.createElement('dd')
      dt.textContent = label
      dd.textContent = value
      row.append(dt, dd)
      return row
    })
    this.facts.replaceChildren(...items)
    this.nextLabel.textContent = SHIP_INFO[target.id] ? 'Next ship' : 'Next world'
  }
}
