# src/nav

The camera and the controls that make the space explorable, plus the UI
around them (in `src/ui/`). `src/main.js` wires everything together.

## Modules

| File | What it does |
| --- | --- |
| `nav/explorer.js` | `Explorer`: the only owner of the camera. Orbits a focus (home, any body, a ship), flies between focuses, follows them as they orbit, free-flies. Owns the canvas pointer, wheel and flight-key input; hands taps to the app. |
| `nav/joystick.js` | `FlightControls`: the free-flight overlay. Thumb stick bottom-left, ▲ / ▼, a "Free flight · Exit" bar. Writes `explorer.input`. |
| `ui/worldsPanel.js` | `WorldsPanel` (a `Sheet`): Home, Moon, Sun, planets, dwarf planets, ships; time scale; Orbits and Labels toggles. |
| `ui/infoCard.js` | `InfoCard`: facts for the focus whenever it is not home, with Home (G) and Next. Modeless. |
| `ui/labels.js` | `Labels`: HTML name tags beside the bodies; tap one to fly there. |
| `core/quality.js` | `AdaptiveQuality`: lowers the pixel ratio a step while frames stay slow, restores it when they recover. |

## Frame order

`stage.onFrame(callback, priority)`, lower first: the system moves (−30),
the explorer places the camera (−20), main routes globe hover (−15),
everything that reads the camera (0: HUD, …; 5: labels; 10: starfield;
20: adaptive quality).

## Camera conventions

- Orbit pose: camera = focus + R·(swayX, swayY, distance), up = R·(0, 1, 0),
  R = Ry(−yaw)·Rx(−pitch). The globe never rotates, so at home this is the
  old spun-globe view: `rowLayout.viewFor(lat, lon)` gives pitch = lat,
  yaw = −lon, and `explorer.viewCenter()` returns `{ lat, lon }`.
- `view` is what is shown, `goal` what it eases to (the globe's damping,
  inertia, pinch and wheel constants). Zoom is exponential from the focus's
  minimum (home 7.4) out to 6000.
- Flights (`flyTo`, `goHome`) interpolate between the live positions of
  both focuses, pull back in log space mid-way and arrive at the resting
  distance on the lit side (Sun: from above the orbit plane). 1.6–3.5 s,
  instant with reduced motion. A drag or wheel interrupts and orbits the
  destination from where the camera is.
- Free flight: speed = clamp(0.8 × nearest surface distance, 1.5, 900) u/s,
  Shift ×4. Bodies push the camera out (1.05 × radius; home 1.2 ×, above the
  photos). Leaving flight orbits the nearest body from the exact pose.
- Each frame: `system.focus` = what is followed (null in flight), near plane
  = clamp(0.02 × nearest surface, 0.02, 20), far 24000.
- `setViewShift(x, y)` offsets the picture (camera view offset) so the focus
  clears the info card; `toScreen()` and `pick()` account for it.

## API (explorer)

```js
const explorer = new Explorer({ stage, system, globe, reduced, isBlocked, onTap })
explorer.flyTo(target, { distance, duration }) / goHome() -> Promise<boolean>
explorer.settleHome()                // already home: back to the resting view
explorer.lookAtLatLon(lat, lon, { distance, duration }) / release(distance) / dive()
explorer.enterFly() / exitFly() / toggleFly()
explorer.pick(x, y) -> body | ship | null, toScreen(position, out) -> depth
explorer.rotateBy(yaw, pitch), zoomBy(factor)
explorer.onFocusChange(fn), onTravel(fn(phase, target)), onModeChange(fn)
// state: mode ('orbit' | 'fly'), focus, travel, atHome, dragging, hovering,
// hoverPoint, nearest { body, surface }, view, goal, fly.speed, input
```

## Input routing

- `isBlocked()` (intro, lightbox, an open sheet, a photo being opened) stops
  all camera input; `enabled` is false until the intro hands over.
- A tap is a press that moved ≤ 6 px and lasted < 600 ms (+ two slow frames).
  Main's `routeTap`: the globe's panels first when `atHome` (focus home,
  closer than 45 u, orbiting), otherwise worlds and ships.
- Esc: the lightbox, then an open sheet, then free flight.
- Keys: G home, B blueprint, M worlds, P photos, F fly, [ ] time scale,
  arrows rotate, + / − zoom (canvas focused); in flight WASD / arrows,
  Q / E, Shift.

## QA

`?debug=1` exposes `window.gallery` (stage, globe, system, explorer, labels,
quality, `flyTo(id)`, `setTimeScale(n)`, `stats()` with draw calls,
triangles and pixel ratio). `?aq=0` turns adaptive quality off so
screenshots keep the full pixel ratio.
