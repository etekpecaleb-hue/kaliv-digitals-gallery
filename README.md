# Kaliv Digitals · Space Gallery

An explorable 3D space gallery by Kaliv Digitals. Photos make up a globe that sits in Earth's orbit. Around it are the Sun, the Moon, 12 worlds, asteroid belts, ships, a comet and shooting stars, and you can fly to any of them.

**Live:** https://kaliv-digitals-gallery.vercel.app · https://etekpecaleb-hue.github.io/kaliv-digitals-gallery/

## What you can do

- **Explore the photo globe.** Drag to rotate, and select a photo to open it full screen. Swipe or use ← → to browse, swipe down or press Esc to close, and press ▶ or Space for a slideshow.
- **Turn Blueprint on or off.** On, the photos float on a blueprint globe; off, they curve together into a seamless photo sphere.
- **Browse in the Photos panel.** It shows every photo as a thumbnail grid.
- **Use your own photos.** "Use my photos" in the Photos panel, or dropping files on the page, replaces the gallery with up to 200 of yours. They stay on your device and are never uploaded. "Restore originals" brings the built-in photos back.
- **Zoom out into space.** Zoom continues past the globe out to the whole solar system. Planets sit where they really are today.
- **Visit the worlds.** Tap a world or its label, or use the Worlds panel, to fly there and see its facts. There are 7 planets (Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune), 5 dwarf planets (Ceres, Pluto, Haumea, Makemake, Eris), the Sun and the Moon. You can also follow one of the ships.
- **Fly freely.** Use the touch joystick, or WASD (Q/E for down/up, Shift to boost). Speed scales with how close you are to things.
- **Control time.** Pause, or run at 1×, 10× or 100×. Orbits and labels can be turned on or off.

Keyboard shortcuts: **G** home · **B** blueprint · **P** photos · **M** worlds · **F** free flight · **[ ]** time · **Esc** close.

The page respects your system's reduced-motion setting, and adapts its rendering quality to keep phones smooth.

## Development

```bash
npm install
npm run dev       # local dev server
npm run build     # production build in dist/
npm run preview   # serve the production build
```

The project uses Vite, three.js and GSAP, written in plain JavaScript ES modules. Planet textures, the Sun, the sky, rocks and ships are all generated in code; the only image files are the gallery photos.

| Folder | What it holds |
| --- | --- |
| `src/intro/` | The opening sequence and the particle wordmark |
| `src/gallery/` | The photo globe (Blueprint and photo-sphere modes), its layouts, and the photo store |
| `src/space/` | The solar system, procedural textures, Sun, sky, belts, ships and effects. See `src/space/README.md` |
| `src/nav/` | The explorer camera (orbit, fly-to, follow, free flight) and the joystick. See `src/nav/README.md` |
| `src/ui/` | HUD, panels (Photos, Worlds), info card, labels, lightbox and file drop |
| `src/data/` | The photo catalogue, and world data with real orbits and facts |
| `public/photos/` | Gallery photos in two sizes (`-sm` and `-lg`) |
| `dev/space.html` | A development page for the space scene on its own |

## Deployment

- **Vercel** builds the `main` branch automatically.
- **GitHub Pages** serves the built site from the `gh-pages` branch.
- Work in progress lives on `dev`.

## Credits

The gallery photos come from [Unsplash](https://unsplash.com) and are used under the Unsplash License. Each photographer is credited in the photo's full view. Fonts: Unbounded, Instrument Sans and Martian Mono (SIL Open Font License).
