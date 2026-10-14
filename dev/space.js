// Development harness for the space modules (not part of the site build).
// URL params: focus=<body id> dist=<units> az=<deg> el=<deg> time=<scale>
//             coarse=1 (phone budgets) fx=0 (skip belts/ships/effects; fx=sky,sun = only those)
//             reduced=1 (prefers-reduced-motion) stars=1 (add the original twinkling starfield)
//             bake=now (bake every texture before the first frame) profile=1 (time bakes)
// Keys: 0 home, 1-9 bodies, +/- zoom. window.__space exposes internals for QA:
//   view({ focus, dist, az, el }) places the camera, stats() reads renderer.info
//   after the last frame, frames counts rendered frames, dispose() tears it all down.
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { SolarSystem } from '../src/space/solarSystem.js'

const params = new URLSearchParams(location.search)
const coarse = params.get('coarse') === '1' || matchMedia('(pointer: coarse)').matches
const reduced = params.get('reduced') === '1' || matchMedia('(prefers-reduced-motion: reduce)').matches
const canvas = document.getElementById('c')
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' })
renderer.setClearColor(0x04060d, 1)
renderer.setPixelRatio(Math.min(devicePixelRatio || 1, coarse ? 1.75 : 2))
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 24000)

// Stand-in for the photo globe at the origin.
const globe = new THREE.Group()
globe.add(new THREE.Mesh(new THREE.SphereGeometry(5, 48, 24), new THREE.MeshBasicMaterial({ color: '#16305e' })))
globe.add(new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.SphereGeometry(5.05, 24, 12)), new THREE.LineBasicMaterial({ color: '#2f7bff', transparent: true, opacity: 0.6 })))
scene.add(globe)

async function optional(path, name) {
  try {
    return (await import(/* @vite-ignore */ path))[name]
  } catch (e) {
    console.info(`[harness] ${path} not loaded: ${e.message}`)
    return null
  }
}

const createVisuals = await optional('../src/space/planets.js', 'createPlanetVisuals')
const visuals = createVisuals ? await createVisuals({ renderer, scene, coarse, profile: params.get('profile') === '1' }) : null
const system = new SolarSystem({ scene, renderer, camera, coarse, reduced, visuals })
system.setTimeScale(Number(params.get('time') ?? 1))

// fx=0 skips every optional subsystem, fx=sky,sun loads only those
const fx = params.get('fx')
if (fx !== '0') {
  for (const [path, name] of [
    ['../src/space/sky.js', 'Sky'],
    ['../src/space/sun.js', 'SunCorona'],
    ['../src/space/belts.js', 'Belts'],
    ['../src/space/ships.js', 'Ships'],
    ['../src/space/effects.js', 'SpaceEffects'],
  ]) {
    if (fx && !fx.split(',').some((key) => path.includes(`/${key}.js`))) continue
    const Ctor = await optional(path, name)
    if (Ctor) {
      try {
        system.addSystem(new Ctor(system))
      } catch (e) {
        console.error(`[harness] ${name} failed`, e)
      }
    }
  }
}

// The original twinkling starfield, on a minimal stand-in for core/stage.js.
const frameCallbacks = []
let starfield = null
if (params.get('stars') === '1') {
  const Starfield = await optional('../src/space/starfield.js', 'Starfield')
  if (Starfield) {
    starfield = new Starfield({
      coarse,
      scene,
      pixelRatio: renderer.getPixelRatio(),
      onResize: () => {},
      onFrame: (callback) => frameCallbacks.push(callback),
    })
  }
}

// bake=now bakes everything up front, bake=moon,sky only those textures
const bakeNow = params.get('bake')
if (bakeNow) visuals?.baker.flush(bakeNow === 'now' ? null : (job) => bakeNow.split(',').includes(job.name))
if (bakeNow && visuals) visuals.baker.paused = true

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.maxDistance = 8000
let focus = system.bodyById(params.get('focus') ?? 'home') ?? system.home
const lastFocus = new THREE.Vector3()
function focusOn(body, distance, azDeg = Number(params.get('az') ?? 30), elDeg = Number(params.get('el') ?? 14)) {
  focus = body
  system.focus = body
  system.worldPosition(body, lastFocus)
  const d = distance ?? body.radius * 3.2 + 8
  const az = azDeg * (Math.PI / 180)
  const el = elDeg * (Math.PI / 180)
  camera.position.set(Math.sin(az) * Math.cos(el), Math.sin(el), Math.cos(az) * Math.cos(el)).multiplyScalar(d).add(lastFocus)
  controls.target.copy(lastFocus)
  controls.update()
}
focusOn(focus, params.has('dist') ? Number(params.get('dist')) : undefined)

addEventListener('keydown', (e) => {
  const ids = ['home', 'sun', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto']
  const i = '0123456789'.indexOf(e.key)
  if (i >= 0) focusOn(system.bodyById(ids[i]))
})

function resize() {
  const w = innerWidth, h = innerHeight
  renderer.setSize(w, h, false)
  camera.aspect = w / h
  camera.updateProjectionMatrix()
}
addEventListener('resize', resize)
resize()

// A ship (or the comet) can be the focus too: anything with object3D + radius.
function focusTarget(id) {
  const ship = system.ships?.list.find((craft) => craft.id === id)
  if (ship) return ship
  if (id === 'comet' && system.effects) return { id: 'comet', radius: 1, object3D: system.effects.comet }
  return system.bodyById(id)
}

const info = document.getElementById('info')
let last = performance.now()
const tmp = new THREE.Vector3()
const delta = new THREE.Vector3()
let time = 0
let frames = 0
renderer.setAnimationLoop(() => {
  const now = performance.now()
  const dt = Math.min((now - last) / 1000, 0.05)
  last = now
  time += dt
  system.update(time, dt)
  for (const callback of frameCallbacks) callback(time, dt)
  // Follow the focused body as it orbits.
  focus.object3D.getWorldPosition(tmp)
  delta.subVectors(tmp, lastFocus)
  camera.position.add(delta)
  controls.target.add(delta)
  lastFocus.copy(tmp)
  controls.update()
  if (starfield) starfield.group.position.copy(camera.position)
  const surface = Math.max(0.1, camera.position.distanceTo(controls.target) - focus.radius)
  camera.near = Math.min(20, Math.max(0.02, surface * 0.02))
  camera.updateProjectionMatrix()
  renderer.render(scene, camera)
  if (++frames % 20 === 0) {
    const r = renderer.info.render
    const pending = visuals?.baker.pending ?? 0
    info.textContent = `focus ${focus.id}  calls ${r.calls}  tris ${r.triangles}  geo ${renderer.info.memory.geometries}  tex ${renderer.info.memory.textures}${pending ? `  baking ${pending}` : ''}`
  }
})

// renderer.info after the last frame, plus the baked texture memory (RGBA8,
// a third more with mipmaps) in MB.
function stats() {
  const { render, memory } = renderer.info
  let bytes = 0
  for (const job of visuals?.baker.jobs ?? []) {
    const { width, height, texture } = job.target
    bytes += width * height * 4 * (texture.generateMipmaps ? 4 / 3 : 1)
  }
  return {
    calls: render.calls,
    triangles: render.triangles,
    points: render.points,
    lines: render.lines,
    geometries: memory.geometries,
    textures: memory.textures,
    bakedMB: Math.round(bytes / 1e5) / 10,
  }
}

// Tears the whole space scene down; afterwards renderer.info.memory should
// only count the stand-in globe (2 geometries, 0 textures).
function dispose() {
  renderer.setAnimationLoop(null)
  system.dispose()
  if (starfield) starfield.group.removeFromParent()
  renderer.render(scene, camera)
  return stats()
}

window.__space = {
  THREE,
  system,
  visuals,
  renderer,
  camera,
  controls,
  scene,
  stats,
  dispose,
  get frames() {
    return frames
  },
  get time() {
    return time
  },
  focusOn: (id, d) => focusOn(focusTarget(id), d),
  view,
}

// Places the camera for a QA shot. az/el are world angles unless `phase` is
// given: then az is measured from the body's direction to the Sun (0 = fully
// lit face, 90 = half lit, 160 = thin crescent) and el is relative to the
// body's equator (`pole` puts the camera over its north pole). `toward` uses
// the direction to another body instead of the Sun; `look` aims the camera at
// another body.
function view({ focus: id = 'home', dist, az, el = 14, phase, pole = false, look, toward } = {}) {
  const target = focusTarget(id)
  if (phase === undefined && !pole && !toward) {
    focusOn(target, dist, az, el)
  } else {
    focusOn(target, dist, 0, 0)
    const centre = target.object3D.getWorldPosition(new THREE.Vector3())
    const reference = toward ? focusTarget(toward).object3D.getWorldPosition(new THREE.Vector3()) : system.sunPosition.clone()
    const toSun = reference.sub(centre).normalize()
    const north = new THREE.Vector3(0, 1, 0)
    if (target.tilt) north.applyQuaternion(target.tilt.getWorldQuaternion(new THREE.Quaternion()))
    toSun.addScaledVector(north, -toSun.dot(north)).normalize()
    const side = new THREE.Vector3().crossVectors(north, toSun)
    const a = (phase ?? 0) * (Math.PI / 180)
    const e = (pole ? 89 : el) * (Math.PI / 180)
    const direction = toSun.multiplyScalar(Math.cos(a)).addScaledVector(side, Math.sin(a)).multiplyScalar(Math.cos(e)).addScaledVector(north, Math.sin(e))
    const d = dist ?? target.radius * 3.2 + 8
    camera.position.copy(centre).addScaledVector(direction, d)
    controls.target.copy(centre)
  }
  if (look) focusTarget(look).object3D.getWorldPosition(controls.target)
  camera.lookAt(controls.target)
  controls.update()
}
