// Development harness for the space modules (not part of the site build).
// URL params: focus=<body id> dist=<units> az=<deg> el=<deg> time=<scale>
//             coarse=1 (phone budgets) fx=0 (skip belts/ships/effects)
// Keys: 0 home, 1-9 bodies, +/- zoom. window.__space exposes internals for QA.
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { SolarSystem } from '../src/space/solarSystem.js'

const params = new URLSearchParams(location.search)
const coarse = params.get('coarse') === '1' || matchMedia('(pointer: coarse)').matches
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
const visuals = createVisuals ? await createVisuals({ renderer, scene, coarse }) : null
const system = new SolarSystem({ scene, renderer, camera, coarse, visuals })
system.setTimeScale(Number(params.get('time') ?? 1))

if (params.get('fx') !== '0') {
  for (const [path, name] of [
    ['../src/space/sky.js', 'Sky'],
    ['../src/space/sun.js', 'SunCorona'],
    ['../src/space/belts.js', 'Belts'],
    ['../src/space/ships.js', 'Ships'],
    ['../src/space/effects.js', 'SpaceEffects'],
  ]) {
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

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.maxDistance = 8000
let focus = system.bodyById(params.get('focus') ?? 'home') ?? system.home
const lastFocus = new THREE.Vector3()
function focusOn(body, distance) {
  focus = body
  system.worldPosition(body, lastFocus)
  const d = distance ?? body.radius * 3.2 + 8
  const az = Number(params.get('az') ?? 30) * (Math.PI / 180)
  const el = Number(params.get('el') ?? 14) * (Math.PI / 180)
  camera.position.set(Math.sin(az) * Math.cos(el), Math.sin(el), Math.cos(az) * Math.cos(el)).multiplyScalar(d).add(lastFocus)
  controls.target.copy(lastFocus)
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

const info = document.getElementById('info')
let last = performance.now()
const tmp = new THREE.Vector3()
let time = 0
let frames = 0
renderer.setAnimationLoop(() => {
  const now = performance.now()
  const dt = Math.min((now - last) / 1000, 0.05)
  last = now
  time += dt
  system.update(time, dt)
  // Follow the focused body as it orbits.
  system.worldPosition(focus, tmp)
  const delta = tmp.clone().sub(lastFocus)
  camera.position.add(delta)
  controls.target.add(delta)
  lastFocus.copy(tmp)
  controls.update()
  const surface = Math.max(0.1, camera.position.distanceTo(controls.target) - focus.radius)
  camera.near = Math.min(20, Math.max(0.02, surface * 0.02))
  camera.updateProjectionMatrix()
  renderer.render(scene, camera)
  if (++frames % 20 === 0) {
    const r = renderer.info.render
    info.textContent = `focus ${focus.id}  calls ${r.calls}  tris ${r.triangles}  geo ${renderer.info.memory.geometries}  tex ${renderer.info.memory.textures}`
  }
})

window.__space = { THREE, system, renderer, camera, controls, scene, focusOn: (id, d) => focusOn(system.bodyById(id), d) }
