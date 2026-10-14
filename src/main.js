// Bootstrap: builds the stage, starfield, photo store, globe, the solar
// system round it, the explorer camera, HUD, lightbox, panels and intro, and
// wires them together.
//
// Frame order (stage.onFrame priorities): the solar system moves (-30), the
// explorer places the camera (-20), the app routes globe input (-15), then
// everything that reads the camera (globe, starfield, labels, HUD).
import './styles/main.css'
import { gsap } from 'gsap'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { loadFonts } from './core/fonts.js'
import { clamp } from './core/math.js'
import { AdaptiveQuality } from './core/quality.js'
import { Stage } from './core/stage.js'
import { PHOTOS } from './data/photos.js'
import { TIME_SCALES } from './data/worlds.js'
import { MAX_FILES, PhotoStore, toPhoto } from './gallery/photoStore.js'
import { PhotoGlobe } from './gallery/globe.js'
import { Intro } from './intro/intro.js'
import { Explorer, HOME_NEAR } from './nav/explorer.js'
import { FlightControls } from './nav/joystick.js'
import { Belts } from './space/belts.js'
import { SpaceEffects } from './space/effects.js'
import { createPlanetVisuals } from './space/planets.js'
import { Ships } from './space/ships.js'
import { Sky } from './space/sky.js'
import { SolarSystem } from './space/solarSystem.js'
import { Starfield } from './space/starfield.js'
import { SunCorona } from './space/sun.js'
import { setupFileDrop } from './ui/fileDrop.js'
import { Hud } from './ui/hud.js'
import { InfoCard } from './ui/infoCard.js'
import { Labels } from './ui/labels.js'
import { Lightbox } from './ui/lightbox.js'
import { PhotosPanel } from './ui/photosPanel.js'
import { Sheet } from './ui/sheet.js'
import { WorldsPanel } from './ui/worldsPanel.js'

gsap.registerPlugin(ScrambleTextPlugin, DrawSVGPlugin)

const byId = (id) => document.getElementById(id)
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
const canvas = byId('scene')
const photos = PHOTOS.map((entry) => toPhoto(entry, './'))
const fonts = loadFonts()
const params = new URLSearchParams(location.search)
const BLUEPRINT_KEY = 'kaliv.blueprint'
const PHONE = matchMedia('(max-width: 640px)')

const WORLDS_ICON =
  '<svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="2.5" /><ellipse cx="8" cy="8" rx="6.6" ry="2.7" transform="rotate(-24 8 8)" /><circle cx="13.4" cy="4.9" r="0.9" /></svg>'
const FLY_ICON = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.6l4.8 12.2L8 11l-4.8 2.8z" /><path d="M8 11v3.4" /></svg>'

// The visitor's Blueprint choice (on unless they turned it off); storage may
// be unavailable, so both directions are wrapped.
function storedBlueprint() {
  try {
    return localStorage.getItem(BLUEPRINT_KEY) !== 'off'
  } catch {
    return true
  }
}

function storeBlueprint(on) {
  try {
    localStorage.setItem(BLUEPRINT_KEY, on ? 'on' : 'off')
  } catch {}
}

// A stored on/off preference (orbits, labels); storage may be unavailable.
function storedFlag(key, fallback) {
  try {
    const value = localStorage.getItem(key)
    return value === null ? fallback : value === 'on'
  } catch {
    return fallback
  }
}

function storeFlag(key, on) {
  try {
    localStorage.setItem(key, on ? 'on' : 'off')
  } catch {}
}

function plural(count, noun) {
  return `${count} ${noun}${count === 1 ? '' : 's'}`
}

// Without WebGL there is no globe to show: explain instead of a blank page.
function showNoWebGL() {
  byId('intro').hidden = true
  canvas.hidden = true
  for (const el of document.querySelectorAll('.hud')) el.hidden = true
  const message = document.createElement('p')
  message.className = 'noscript'
  message.setAttribute('role', 'alert')
  message.textContent =
    "The 3D gallery needs WebGL, which this browser has turned off or doesn't support."
  document.body.append(message)
}

async function boot() {
  let stage
  try {
    stage = new Stage(canvas)
  } catch {
    showNoWebGL()
    return
  }

  const space = new Starfield(stage)
  const store = new PhotoStore(photos, stage.renderer, { coarse: stage.coarse })
  let photosLoaded = 0
  const textures = store.loadTextures((loaded) => (photosLoaded = loaded))
  // The panel the lightbox is showing, so it can fly back to that exact panel.
  let shownPanel = null
  const hud = new Hud(store, stage.coarse)
  const globe = new PhotoGlobe(stage, store, {
    reduced,
    blueprint: storedBlueprint(),
    onSelect: (panel) => void select(panel),
  })
  globe.build()
  hud.setBlueprint(globe.blueprint)
  textures.then(() => globe.refreshTextures())

  // The solar system round the gallery. Planet maps bake lazily on the GPU,
  // a strip per frame, nearest first; the system stays hidden until the
  // intro hands over, so the intro looks exactly as before.
  const { renderer, scene, camera, coarse } = stage
  const buildStart = performance.now()
  const visuals = await createPlanetVisuals({ renderer, coarse })
  const system = new SolarSystem({ scene, renderer, camera, coarse, reduced, visuals })
  const sky = system.addSystem(new Sky(system))
  const corona = system.addSystem(new SunCorona(system))
  for (const Subsystem of [Belts, Ships, SpaceEffects]) system.addSystem(new Subsystem(system))
  system.group.visible = false
  const buildMs = performance.now() - buildStart
  // Where the driver compiles shaders in the background, prepare the
  // system's programs during the intro so the hand-over doesn't hitch.
  if (renderer.extensions.has('KHR_parallel_shader_compile')) {
    setTimeout(() => {
      if (!intro.active) return
      system.group.visible = true
      renderer.compileAsync(scene, camera).catch(() => {})
      system.group.visible = false
    }, 600)
  }
  stage.onFrame((time, dt) => {
    // while the intro plays, bakes only run on frames with time to spare, so
    // they never slow the intro down (its timeline stretches on slow frames)
    visuals.baker.paused = intro.active && dt > 1 / 40
    system.update(time, dt)
  }, -30)

  // the planet maps baked so far, for the intro's Worlds line
  function worldsStatus() {
    const jobs = visuals.baker.jobs
    const done = jobs.reduce((count, job) => count + (job.done ? 1 : 0), 0)
    return done < jobs.length ? `12 + sun + moon · ${done}/${jobs.length}` : '12 + sun + moon · mapped'
  }

  function showSpace() {
    system.group.visible = true
    gsap.fromTo(sky.uniforms.uOpacity, { value: 0 }, { value: 1, duration: reduced ? 0.3 : 1.8, ease: 'power1.inOut' })
    gsap.fromTo(corona.uniforms.uGlow, { value: 0 }, { value: 1, duration: reduced ? 0.3 : 1.6, ease: 'power1.inOut' })
  }

  // panels can be picked once the globe has assembled
  let panelsReady = false
  let selecting = false

  const explorer = new Explorer({
    stage,
    system,
    globe,
    reduced,
    // the intro, the lightbox, an open sheet or a photo being opened hold the input
    isBlocked: () => intro.active || lightbox.isOpen || selecting || Sheet.current !== null,
    onTap: (x, y) => routeTap(x, y),
  })
  globe.attachCamera(explorer)
  stage.onFrame((time, dt) => explorer.update(time, dt), -20)

  // Taps: the globe's panels first when at home and close, then worlds/ships.
  function routeTap(x, y) {
    if (panelsReady && explorer.atHome) {
      const panel = globe.pick(x, y)
      if (panel) return void select(panel)
    }
    const target = explorer.pick(x, y)
    if (target && (target !== explorer.focus || explorer.mode === 'fly' || !explorer.atHome)) flyTo(target)
  }

  function flyTo(target) {
    if (!target || !explorer.enabled || selecting) return
    // home and close in already: just settle back to the resting view
    if (target === system.home) {
      if (explorer.atHome) explorer.settleHome()
      else void explorer.goHome()
    } else void explorer.flyTo(target)
  }

  // Globe hover/picking only at home, close in, when nothing else has the input.
  let hoverTarget = null
  let lastHoverPick = 0
  stage.onFrame((time) => {
    const home = explorer.atHome
    globe.interactive = panelsReady && home && !lightbox.isOpen && !selecting
    globe.suppressHover = explorer.dragging
    globe.hoverPoint = explorer.hovering ? explorer.hoverPoint : null
    // the photo sphere's mild day/night follows the Sun
    globe.shared.uSunDir.value.copy(system.sunPosition).normalize()
    // worlds under the mouse (≤ 30 Hz) show the pointer cursor
    if (explorer.enabled && !home && explorer.hovering && !explorer.dragging && !intro.active) {
      if (time - lastHoverPick > 1 / 30) {
        lastHoverPick = time
        hoverTarget = explorer.pick(explorer.hoverPoint.x, explorer.hoverPoint.y)
      }
    } else hoverTarget = null
    canvas.classList.toggle('is-pointing', Boolean(globe.hovered || hoverTarget))
  }, -15)

  function openLightbox(photo, rect) {
    hud.setDimmed(true)
    lightbox.open(photo, rect)
  }

  const lightbox = new Lightbox(store, {
    reduced,
    rectFor: (photo) => {
      const panel = shownPanel && shownPanel.photo === photo ? shownPanel : globe.panelFor(photo)
      return panel && globe.facing(panel) > 0.55 ? globe.screenRect(panel) : null
    },
    onStep: (photo) => {
      const panel = globe.panelFor(photo)
      if (!panel) return
      shownPanel = panel
      globe.spotlight(panel)
      globe.focus(panel)
    },
    onClosed: () => {
      hud.setDimmed(false)
      globe.spotlight(null)
      globe.release()
      shownPanel = null
    },
  })

  async function select(panel) {
    if (!panel || selecting || lightbox.isOpen) return
    selecting = true
    hud.trackTarget(null)
    shownPanel = panel
    globe.spotlight(panel)
    await globe.focus(panel)
    openLightbox(panel.photo, globe.screenRect(panel))
    selecting = false
  }

  // Intro exit: the explorer dives in from z = 60 while the globe assembles
  // and space fades in around it.
  function handOver() {
    const tl = gsap.timeline()
    globe.refreshTextures()
    showSpace()
    tl.add(explorer.dive({ duration: reduced ? 0.01 : 2, ease: 'expo.inOut' }), 0)
    tl.add(globe.assemble(1.5), reduced ? 0 : 0.35)
    tl.add(hud.reveal(), reduced ? 0 : 0.95)
    tl.call(() => void (panelsReady = true), [], reduced ? 0.4 : 1.9)
    tl.call(
      () => {
        explorer.enabled = true
        explorer.lastInput = stage.time
        globe.setSun(system.sunPosition, 1)
      },
      [],
      reduced ? 0.02 : 2,
    )
    return tl
  }

  const intro = new Intro({
    stage,
    space,
    reduced,
    fonts,
    textures,
    photosLoaded: () => photosLoaded,
    photoCount: store.count,
    facts: {
      gpu: stage.gpuLabel(),
      panels: globe.panels.length,
      rows: globe.layout.rows.length,
      stars: space.starCount,
      // the solar system around the gallery: planets and dwarf planets
      worlds: 12,
      worldsStatus,
    },
    handOver,
  })

  // what the HUD shows about the camera (reused, not reallocated)
  const nav = { mode: 'home', range: 0, focusName: '', timeScale: 1, speed: 0, nearestName: '' }
  stage.onFrame((time) => {
    if (intro.active) return
    const focus = explorer.travel?.to ?? explorer.focus
    // the globe's readout once the camera is really near home (the gallery
    // sits at the origin), not merely aimed at it mid-flight
    const nearHome = focus === system.home && camera.position.lengthSq() < HOME_NEAR * HOME_NEAR
    nav.mode = explorer.mode === 'fly' ? 'fly' : explorer.atHome || nearHome ? 'home' : 'space'
    nav.range = explorer.mode === 'fly' ? explorer.nearest.surface : explorer.view.distance
    nav.focusName = focus.name
    nav.timeScale = system.ctx.timeScale
    nav.speed = explorer.fly.speed
    nav.nearestName = explorer.nearest.body?.name ?? '—'
    hud.update(time, stage.fps, globe, nav)
  })

  // Blueprint on = the panel globe; off = the seamless photo sphere.
  function setBlueprint(on) {
    globe.setBlueprint(on)
    hud.setBlueprint(on)
    storeBlueprint(on)
  }
  hud.buttons.blueprint.addEventListener('click', () => setBlueprint(!globe.blueprint))

  const photosPanel = new PhotosPanel(store, {
    reduced,
    // a thumbnail: close the panel, then the same flow as tapping the globe
    // away from home (or flying), it flies home first
    onPick: async (photo) => {
      photosPanel.close()
      if (!explorer.atHome && !(await explorer.goHome())) return
      void select(globe.panelFor(photo))
    },
    onUseMine: () => picker.openPicker(),
    onRestore: () => void restoreOriginals(),
  })
  hud.buttons.photos.addEventListener('click', () => photosPanel.toggle(hud.buttons.photos))

  // After a replace or a restore: rebuild both modes, scan the photos in,
  // and refresh the panel (the HUD and lightbox read the store directly).
  store.addEventListener('change', () => {
    shownPanel = null
    hud.trackTarget(null)
    globe.build()
    globe.refreshTextures()
    globe.revealPhotos(store.photos)
    photosPanel.render()
  })

  async function replacePhotos(files) {
    if (store.busy) return
    const many = files.length > 8
    if (many) hud.toast(`Reading ${plural(files.length, 'file')}…`, false, Infinity)
    const { added, skipped, ignored } = await store.replaceWith(files, {
      onProgress: (done, total) => many && hud.toast(`Reading photos · ${done} / ${total}`, false, Infinity),
    })
    if (added.length === 0) {
      hud.toast("Couldn't read those files, so the gallery is unchanged. Use JPG, PNG or WebP images.", true)
      return
    }
    photosPanel.close()
    const stays = added.length === 1 ? 'It stays on this device and is never uploaded.' : 'They stay on this device and are never uploaded.'
    const messages = [`Showing your ${plural(added.length, 'photo')}. ${stays}`]
    if (ignored > 0) messages.push(`Only the first ${MAX_FILES} images were used.`)
    if (skipped.length > 0) {
      const what = skipped.length === 1 ? skipped[0] : plural(skipped.length, 'file')
      messages.push(`Skipped ${what} (couldn't read).`)
    }
    hud.toast(messages.join(' '), false, skipped.length > 0 ? 6500 : 4800)
  }

  async function restoreOriginals() {
    if (await store.restoreOriginals()) hud.toast(`Showing the original ${plural(store.count, 'photo')}.`)
  }

  const picker = setupFileDrop(
    (files) => void replacePhotos(files),
    () => intro.active || lightbox.isOpen,
  )

  // ---------------------------------------------------------------------------
  // Space navigation: the Worlds and Fly header buttons, the Worlds panel, the
  // info card, the labels and the free-flight controls.
  const worldsButton = hud.addAction({ id: 'btn-worlds', label: 'Worlds', icon: WORLDS_ICON, tip: 'Worlds · M' })
  worldsButton.setAttribute('aria-haspopup', 'dialog')
  worldsButton.setAttribute('aria-controls', 'worlds-sheet')
  worldsButton.setAttribute('aria-expanded', 'false')
  const flyButton = hud.addAction({ id: 'btn-fly', label: 'Fly', icon: FLY_ICON, tip: 'Fly · F', pressed: false })

  const worldsPanel = new WorldsPanel(system, {
    reduced,
    timeScales: TIME_SCALES,
    onPick: (target) => {
      worldsPanel.close({ restoreFocus: false })
      flyTo(target)
    },
    onTimeScale: (scale) => setTimeScale(scale),
    onOrbits: (on) => setOrbits(on),
    onLabels: (on) => setLabels(on),
  })
  worldsButton.addEventListener('click', () => worldsPanel.toggle(worldsButton))

  // reduced motion runs the clocks at 1× at most (the system clamps them)
  const timeScales = reduced ? TIME_SCALES.filter((scale) => scale <= 1) : TIME_SCALES
  function setTimeScale(scale) {
    if (!timeScales.includes(scale)) return
    system.setTimeScale(scale)
    worldsPanel.setTimeScale(scale)
  }
  function stepTimeScale(direction) {
    const index = timeScales.indexOf(system.timeScale)
    setTimeScale(timeScales[clamp(index + direction, 0, timeScales.length - 1)])
  }
  setTimeScale(1)

  const labels = new Labels({ explorer, system, coarse, onSelect: (target) => flyTo(target) })
  function setOrbits(on) {
    system.setOrbitsVisible(on)
    worldsPanel.setOrbits(on)
    storeFlag('kaliv.orbits', on)
  }
  function setLabels(on) {
    labels.setVisible(on)
    worldsPanel.setLabels(on)
    storeFlag('kaliv.labels', on)
  }
  setOrbits(storedFlag('kaliv.orbits', true))
  setLabels(storedFlag('kaliv.labels', true))
  // labels show out in space (never over the photos at home, close in)
  stage.onFrame(() => {
    const out = explorer.mode === 'fly' || explorer.traveling || explorer.focus !== system.home || explorer.view.distance >= HOME_NEAR
    labels.setActive(!intro.active && explorer.enabled && out && !lightbox.isOpen)
    labels.focus = explorer.mode === 'fly' ? null : currentFocus()
    labels.update()
  }, 5)

  // "Next world" runs out from the Sun; ships cycle among themselves
  const nextOrder = ['sun', 'mercury', 'venus', 'moon', 'mars', 'ceres', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto', 'haumea', 'makemake', 'eris'].map((id) => system.bodyById(id))
  const ships = system.ships?.list ?? []
  function nextAfter(target) {
    const list = ships.includes(target) ? ships : nextOrder
    return list[(list.indexOf(target) + 1) % list.length]
  }
  const currentFocus = () => explorer.travel?.to ?? explorer.focus

  const infoCard = new InfoCard({
    reduced,
    onHome: () => flyTo(system.home),
    onNext: () => flyTo(nextAfter(currentFocus())),
  })

  // The info card shows whenever the focus is not home; on phones the focus
  // is lifted above it, on desktop moved right of it.
  function syncFocusUI() {
    const focus = currentFocus()
    worldsPanel.setFocus(focus)
    const show = explorer.mode === 'orbit' && focus !== system.home && !lightbox.isOpen
    if (show) infoCard.show(focus)
    else infoCard.hide()
    if (!show) explorer.setViewShift(0, 0)
    else if (PHONE.matches) {
      const header = 72
      const cardTop = infoCard.root.offsetTop
      explorer.setViewShift(0, Math.max(0, Math.round(stage.height / 2 - (header + cardTop) / 2)))
    } else {
      const right = infoCard.root.offsetLeft + infoCard.root.offsetWidth
      explorer.setViewShift(-Math.round(right / 2), 0)
    }
  }
  explorer.onFocusChange(syncFocusUI)
  explorer.onTravel(syncFocusUI)
  PHONE.addEventListener('change', syncFocusUI)
  stage.onResize(() => syncFocusUI())

  const flight = new FlightControls({ input: explorer.input, coarse, onExit: () => explorer.exitFly() })
  function toggleFly() {
    if (!explorer.enabled || selecting) return
    if (Sheet.current) Sheet.current.close({ restoreFocus: false })
    explorer.toggleFly()
  }
  flyButton.addEventListener('click', () => toggleFly())
  explorer.onModeChange((mode) => {
    flyButton.setAttribute('aria-pressed', String(mode === 'fly'))
    if (mode === 'fly') flight.show()
    else flight.hide()
    syncFocusUI()
  })

  // the brand mark flies home
  byId('brand').addEventListener('click', (event) => {
    event.preventDefault()
    if (Sheet.current) Sheet.current.close()
    flyTo(system.home)
  })

  // Adaptive quality: a lower pixel ratio while the frame rate stays low
  // (?aq=0 turns it off for QA screenshots).
  const quality = new AdaptiveQuality(stage, { enabled: params.get('aq') !== '0' })
  stage.onFrame(() => {
    if (!intro.active) quality.update()
  }, 20)

  addEventListener('keydown', (event) => {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return
    if (intro.active) {
      if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        intro.skip()
      }
      return
    }
    if (lightbox.isOpen) return
    const target = event.target
    if (target.closest('input, textarea, select')) return
    const key = event.key.toLowerCase()
    // P and M work from anywhere on the page (and close their own panel)
    if (key === 'p' && !event.repeat) {
      event.preventDefault()
      photosPanel.toggle(hud.buttons.photos)
      return
    }
    if (key === 'm' && !event.repeat) {
      event.preventDefault()
      worldsPanel.toggle(worldsButton)
      return
    }
    // [ and ] step the time scale, even with the Worlds panel open
    if ((event.key === '[' || event.key === ']') && !photosPanel.isOpen) {
      event.preventDefault()
      stepTimeScale(event.key === ']' ? 1 : -1)
      return
    }
    if (Sheet.current) return
    // Esc (after the lightbox and the sheets have had it) leaves free flight
    if (event.key === 'Escape' && explorer.mode === 'fly') {
      event.preventDefault()
      explorer.exitFly()
      return
    }
    if (key === 'b' && !event.repeat) {
      event.preventDefault()
      setBlueprint(!globe.blueprint)
      return
    }
    if (key === 'f' && !event.repeat) {
      event.preventDefault()
      toggleFly()
      return
    }
    if (key === 'g' && !event.repeat) {
      event.preventDefault()
      flyTo(system.home)
      return
    }
    const onPage = target === document.body || target === document.documentElement || target === canvas
    if (!onPage || !explorer.enabled || selecting || explorer.mode !== 'orbit') return
    const rotations = {
      ArrowLeft: [0.32, 0],
      ArrowRight: [-0.32, 0],
      ArrowUp: [0, 0.22],
      ArrowDown: [0, -0.22],
    }
    const zooms = { '+': 0.85, '=': 0.85, '-': 1.18, _: 1.18 }
    if (rotations[event.key]) {
      event.preventDefault()
      explorer.rotateBy(...rotations[event.key])
    } else if (zooms[event.key] && target === canvas) {
      event.preventDefault()
      explorer.zoomBy(zooms[event.key])
    } else if ((event.key === 'Enter' || (event.key === ' ' && target === canvas)) && globe.front && globe.interactive) {
      event.preventDefault()
      select(globe.front)
    }
  })

  // ?debug=1: a handle for QA scripts (renderer stats, mode switches)
  if (params.has('debug')) {
    const stats = () => {
      const { render, memory } = stage.renderer.info
      return { calls: render.calls, triangles: render.triangles, geometries: memory.geometries, textures: memory.textures, pixelRatio: stage.pixelRatio, near: stage.camera.near, buildMs: Math.round(buildMs), pendingBakes: visuals.baker.pending }
    }
    window.gallery = {
      stage,
      globe,
      store,
      hud,
      lightbox,
      photosPanel,
      setBlueprint,
      replacePhotos,
      system,
      explorer,
      visuals,
      worldsPanel,
      infoCard,
      labels,
      quality,
      flyTo: (id) => flyTo(system.bodyById(id) ?? ships.find((ship) => ship.id === id)),
      setTimeScale,
      stats,
    }
  }

  intro.start()
}

boot()
