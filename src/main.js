// Bootstrap: builds the stage, starfield, photo store, globe, HUD, lightbox,
// Photos panel and intro, and wires them together.
import './styles/main.css'
import { gsap } from 'gsap'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { loadFonts } from './core/fonts.js'
import { Stage } from './core/stage.js'
import { PHOTOS } from './data/photos.js'
import { MAX_FILES, PhotoStore, toPhoto } from './gallery/photoStore.js'
import { PhotoGlobe } from './gallery/globe.js'
import { Intro } from './intro/intro.js'
import { Starfield } from './space/starfield.js'
import { setupFileDrop } from './ui/fileDrop.js'
import { Hud } from './ui/hud.js'
import { Lightbox } from './ui/lightbox.js'
import { PhotosPanel } from './ui/photosPanel.js'

gsap.registerPlugin(ScrambleTextPlugin, DrawSVGPlugin)

const byId = (id) => document.getElementById(id)
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
const canvas = byId('scene')
const photos = PHOTOS.map((entry) => toPhoto(entry, './'))
const fonts = loadFonts()
const BLUEPRINT_KEY = 'kaliv.blueprint'

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

function boot() {
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
      globe.interactive = true
      shownPanel = null
    },
  })

  let selecting = false
  async function select(panel) {
    if (!panel || selecting || lightbox.isOpen) return
    selecting = true
    globe.interactive = false
    hud.trackTarget(null)
    shownPanel = panel
    globe.spotlight(panel)
    await globe.focus(panel)
    openLightbox(panel.photo, globe.screenRect(panel))
    selecting = false
  }

  // Intro exit: the camera dives in from z = 60 while the globe assembles.
  function handOver() {
    const tl = gsap.timeline()
    const camera = stage.camera
    const rest = globe.restDistance
    globe.refreshTextures()
    globe.view.distance = globe.goal.distance = rest
    globe.cameraControl = false
    tl.to(camera.position, {
      z: rest,
      duration: reduced ? 0.01 : 2,
      ease: 'expo.inOut',
      onUpdate: () => camera.lookAt(0, 0, 0),
    })
    tl.add(globe.assemble(1.5), reduced ? 0 : 0.35)
    tl.add(hud.reveal(), reduced ? 0 : 0.95)
    tl.call(() => void (globe.interactive = true), [], reduced ? 0.4 : 1.9)
    tl.call(() => void (globe.cameraControl = true), [], reduced ? 0.02 : 2)
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
    },
    handOver,
  })

  stage.onFrame((time) => {
    if (!intro.active) hud.update(time, stage.fps, globe)
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
    onPick: (photo) => {
      photosPanel.close()
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
    // B and P work from anywhere on the page (P also closes the panel)
    if (key === 'p' && !event.repeat) {
      event.preventDefault()
      photosPanel.toggle(hud.buttons.photos)
      return
    }
    if (photosPanel.isOpen) return
    if (key === 'b' && !event.repeat) {
      event.preventDefault()
      setBlueprint(!globe.blueprint)
      return
    }
    const onPage = target === document.body || target === document.documentElement || target === canvas
    if (!onPage || !globe.interactive) return
    const rotations = {
      ArrowLeft: [0.32, 0],
      ArrowRight: [-0.32, 0],
      ArrowUp: [0, 0.22],
      ArrowDown: [0, -0.22],
    }
    if (rotations[event.key]) {
      event.preventDefault()
      globe.rotateBy(...rotations[event.key])
    } else if (event.key === 'Enter' && globe.front) {
      event.preventDefault()
      select(globe.front)
    }
  })

  // ?debug=1: a handle for QA scripts (renderer stats, mode switches)
  if (new URLSearchParams(location.search).has('debug')) {
    window.gallery = { stage, globe, store, hud, lightbox, photosPanel, setBlueprint, replacePhotos }
  }

  intro.start()
}

boot()
