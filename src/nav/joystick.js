// Free-flight controls: a thumb joystick bottom-left (forward/back and
// strafe), ▲ / ▼ buttons for up and down, and an exit button. Dragging
// anywhere else on the canvas looks around (the explorer handles that).
// On a mouse-only screen the stick and buttons stay hidden and a key hint
// shows instead; the first touch brings them in.
//
//   const controls = new FlightControls({ input: explorer.input, coarse, onExit })
//   controls.show() / controls.hide()
// `input` ({ x, y, lift }, each -1..1) is written here and read by the explorer.

const RADIUS = 46
const DEAD_ZONE = 0.12

const UP_ICON = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 10.5L8 5.5l5 5" /></svg>'
const DOWN_ICON = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 5.5l5 5 5-5" /></svg>'
const EXIT_ICON = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 3l10 10M13 3L3 13" /></svg>'

// -1..1 with a dead zone in the middle, rescaled so the edge still reads 1.
function shape(value) {
  const magnitude = Math.abs(value)
  if (magnitude < DEAD_ZONE) return 0
  return (Math.sign(value) * (magnitude - DEAD_ZONE)) / (1 - DEAD_ZONE)
}

export class FlightControls {
  root = document.createElement('div')
  visible = false
  stickPointer = null
  center = { x: 0, y: 0 }

  // options: { input, coarse, onExit() }
  constructor({ input, coarse, onExit }) {
    this.input = input
    const root = this.root
    root.className = `flight${coarse ? ' has-touch' : ''}`
    root.hidden = true
    root.innerHTML = `
      <div class="flight__stick" aria-hidden="true">
        <span class="flight__ring"></span>
        <span class="flight__cross"></span>
        <span class="flight__knob"></span>
      </div>
      <div class="flight__lift" role="group" aria-label="Up and down">
        <button class="flight__btn" type="button" data-lift="1" aria-label="Up">${UP_ICON}</button>
        <button class="flight__btn" type="button" data-lift="-1" aria-label="Down">${DOWN_ICON}</button>
      </div>
      <div class="flight__bar">
        <p class="flight__title mono"><i></i>Free flight</p>
        <button class="flight__exit mono" type="button">${EXIT_ICON}<span>Exit</span><kbd>Esc</kbd></button>
      </div>
      <p class="flight__keys mono">W A S D move · Q E down / up · Shift boost · drag to look</p>`
    this.stick = root.querySelector('.flight__stick')
    this.knob = root.querySelector('.flight__knob')
    root.querySelector('.flight__exit').addEventListener('click', () => onExit())

    this.stick.addEventListener('pointerdown', this.onStickDown)
    this.stick.addEventListener('pointermove', this.onStickMove)
    this.stick.addEventListener('pointerup', this.onStickUp)
    this.stick.addEventListener('pointercancel', this.onStickUp)
    for (const button of root.querySelectorAll('.flight__btn')) {
      const lift = Number(button.dataset.lift)
      button.addEventListener('pointerdown', (event) => {
        event.preventDefault()
        button.setPointerCapture(event.pointerId)
        button.classList.add('is-held')
        this.input.lift = lift
      })
      const release = () => {
        button.classList.remove('is-held')
        if (this.input.lift === lift) this.input.lift = 0
      }
      button.addEventListener('pointerup', release)
      button.addEventListener('pointercancel', release)
      button.addEventListener('lostpointercapture', release)
      // the context menu a long press opens on some phones
      button.addEventListener('contextmenu', (event) => event.preventDefault())
    }
    // a touch on a mouse-first screen brings the stick in
    addEventListener('touchstart', () => this.root.classList.add('has-touch'), { passive: true, once: true })
    document.body.append(root)
  }

  show() {
    if (this.visible) return
    this.visible = true
    this.root.hidden = false
  }

  hide() {
    if (!this.visible) return
    this.visible = false
    this.root.hidden = true
    this.reset()
    this.input.lift = 0
  }

  reset() {
    this.stickPointer = null
    this.input.x = this.input.y = 0
    this.knob.style.transform = ''
    this.stick.classList.remove('is-held')
  }

  onStickDown = (event) => {
    if (this.stickPointer !== null) return
    event.preventDefault()
    this.stickPointer = event.pointerId
    this.stick.setPointerCapture(event.pointerId)
    this.stick.classList.add('is-held')
    const rect = this.stick.getBoundingClientRect()
    this.center.x = rect.left + rect.width / 2
    this.center.y = rect.top + rect.height / 2
    this.onStickMove(event)
  }

  onStickMove = (event) => {
    if (event.pointerId !== this.stickPointer) return
    let dx = event.clientX - this.center.x
    let dy = event.clientY - this.center.y
    const length = Math.hypot(dx, dy)
    if (length > RADIUS) {
      dx *= RADIUS / length
      dy *= RADIUS / length
    }
    this.knob.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`
    this.input.x = shape(dx / RADIUS)
    // up on the stick is forward
    this.input.y = shape(-dy / RADIUS)
  }

  onStickUp = (event) => {
    if (event.pointerId !== this.stickPointer) return
    this.reset()
  }
}
