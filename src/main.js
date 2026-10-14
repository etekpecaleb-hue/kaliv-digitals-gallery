// Bootstrap: builds the stage, starfield, photo store, globe, HUD, lightbox
// and intro, and wires them together.
import './styles/main.css'
import { gsap } from 'gsap'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { loadFonts } from './core/fonts.js'
import { Stage } from './core/stage.js'
import { PHOTOS } from './data/photos.js'
import { PhotoStore, toPhoto } from './gallery/photoStore.js'
import { PhotoGlobe } from './gallery/globe.js'
import { Intro } from './intro/intro.js'
import { Starfield } from './space/starfield.js'
import { setupFileDrop } from './ui/fileDrop.js'
import { Hud } from './ui/hud.js'
import { Lightbox } from './ui/lightbox.js'

gsap.registerPlugin(ScrambleTextPlugin, DrawSVGPlugin)

const byId = (id) => document.getElementById(id)
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
const canvas = byId('scene')
const photos = PHOTOS.map((entry) => toPhoto(entry, './'))
const fonts = loadFonts()

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
  const store = new PhotoStore(photos, stage.renderer)
  let photosLoaded = 0
  const textures = store.loadTextures((loaded) => (photosLoaded = loaded))
  // The panel the lightbox is showing, so it can fly back to that exact panel.
  let shownPanel = null
  const hud = new Hud(store, stage.coarse)
  const globe = new PhotoGlobe(stage, store, { reduced, onSelect: (panel) => void select(panel) })
  globe.build()
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
    if (selecting || lightbox.isOpen) return
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
    },
    handOver,
  })

  stage.onFrame((time) => {
    if (!intro.active) hud.update(time, stage.fps, globe)
  })

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
    const onPage = target === document.body || target === document.documentElement
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

  setupFileDrop(
    async (files) => {
      const { added, skipped } = await store.addFiles(files)
      if (added.length > 0) {
        globe.build()
        globe.refreshTextures()
        globe.revealPhotos(added)
        const panel = globe.panelFor(added[0])
        if (panel && globe.interactive) globe.focus(panel, false)
      }
      const messages = []
      if (added.length > 0) {
        messages.push(`Added ${plural(added.length, 'photo')}. They stay in this tab and are not uploaded.`)
      }
      if (skipped.length > 0) {
        const what = skipped.length === 1 ? skipped[0] : plural(skipped.length, 'file')
        messages.push(`Couldn't read ${what}. Use JPG, PNG or WebP images.`)
      }
      if (messages.length > 0) hud.toast(messages.join(' '), added.length === 0)
    },
    () => intro.active || lightbox.isOpen,
  )

  intro.start()
}

boot()
