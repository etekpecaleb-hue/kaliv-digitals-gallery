# src/space

The solar system around the photo globe. Everything is procedural (no image
files), plain ES modules on three.js.

## Modules

| File | What it does |
| --- | --- |
| `solarSystem.js` | `SolarSystem`: the body hierarchy, the clocks and the subsystem hook. Its header comment is the contract. |
| `orbits.js` | Kepler maths (`orbitPosition`, `yearsSinceJ2000`, `rotationSeconds`). |
| `planets.js` | `createPlanetVisuals()`: lit planet/moon/dwarf meshes, atmospheres, Saturn's and Uranus' rings, orbit lines, far-away glints. The `visuals` hook of `SolarSystem`. |
| `planetShaders.js` | GLSL for the above. |
| `textures.js` | `TextureBaker`: GPU equirectangular bakes (seamless), lazy, a strip of rows per frame, nearest body first. |
| `textureRecipes.js` | One GLSL recipe per world, plus the Sun's surface data. |
| `noise.glsl.js` | Simplex, Worley, fbm and hash GLSL shared by the bakes, the sky and the Sun. |
| `sun.js` | The Sun's animated surface (`createSunSurface`) and `SunCorona` (corona, lens glare, flare streaks on one camera-facing quad). |
| `sky.js` | `Sky`: the camera-following dome, with the milky way, dust lanes, nebulae and faint stars baked once. |
| `belts.js`, `belts-rocks.js` | `Belts`: the asteroid and Kuiper belts (orbiting on the GPU), the rock field round the camera inside the belt, the rocks drifting round home and the fly-by rock. |
| `ships.js`, `ships-models.js`, `ships-path.js` | `Ships`: shuttle, courier, cruiser and Moon station, with nav lights, engine glows and trails. |
| `effects.js`, `effects-ribbon.js` | `SpaceEffects`: shooting stars, the comet, space dust. Ribbons (trails, tails) and glow points shared with ships. |
| `starfield.js` | The original twinkling starfield (phase 1 port). |

## Using it

```js
const visuals = await createPlanetVisuals({ renderer, scene, coarse })
const system = new SolarSystem({ scene, renderer, camera, coarse, reduced, visuals })
for (const Sub of [Sky, SunCorona, Belts, Ships, SpaceEffects]) system.addSystem(new Sub(system))
// every frame, before rendering:
system.update(time, dt)
```

- The globe stays at the origin. `system.frame` holds everything heliocentric
  and is shifted by −H(t) each update, so the Sun sits at `system.sunPosition`.
- Subsystems get `update(time, dt, ctx)` every frame and `dispose()` on
  `system.dispose()`. `ctx` = `{ years, dtYears, timeScale, spinDt, sunPosition,
  camera, coarse, reduced, time, dt }`.
- `system.focus` should be set to whatever the camera follows (a body or a
  `ships.list` entry): space dust rests in its frame.
- `system.setTimeScale(0 | 1 | 10 | 100)`; spins are capped at 0.2 turns/s and
  the Moon at one lap per 12 s, so nothing strobes. `reduced` clamps the scale
  to 1 and stops shooting stars, fly-bys, the Sun's churn and engine flicker.
- `system.ships.list` = `[{ id, name, object3D, radius }]`, `body.pickRadius`
  for picking, `system.setOrbitsVisible(bool)`.
- The camera owner sets `camera.near` (≈ 0.02 × distance to the nearest
  surface, clamped to [0.02, 20]) and a far plane of ~24000.

## Budgets

Phone (`coarse`): ≤ 170 draw calls, ≤ 700k triangles, bakes 512×256 per body
(1024×512 on desktop, half that for dwarf planets), no full-screen passes, no
per-frame allocations. Measured in the harness, coarse, 1280×800:

| View | Calls | Triangles | Baked textures |
| --- | --- | --- | --- |
| Home, dist 18 | 34 | 95k | 18 MB |
| Whole system, dist 2600 | 53 | 134k | 18 MB |

Desktop (not coarse) home view: 32 calls, 206k triangles, 49 MB of bakes.

## Harness

`npx vite --port <port>` then open `/dev/space.html`. URL parameters:
`focus=<body or ship id or comet>`, `dist`, `az`, `el` (degrees), `time=0|1|10|100`,
`coarse=1`, `reduced=1`, `stars=1` (adds the original starfield),
`fx=0` (no subsystems) or `fx=sky,sun,...`, `bake=now`, `profile=1`.
`window.__space` exposes `system`, `visuals`, `camera`, `stats()` (renderer
info plus baked MB), `view({ focus, dist, az, el, phase, pole, toward, look })`
for QA shots (`phase` = degrees from the Sun direction, so lighting is
predictable), `frames` and `dispose()`.
