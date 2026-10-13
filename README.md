# CachiCloud C3 gallery showcase

An interactive photo gallery for CachiCloud C3. It has two views:

- **Globe**: 32 photos laid out on a 3D globe. Drag to rotate, scroll or pinch to zoom, and select a photo to open it.
- **Stream**: the same photos in an endlessly scrolling grid.

**Live site:** https://etekpecaleb-hue.github.io/cachicloud-c3-gallery/

## How it is hosted

This is a ready-built static site served by GitHub Pages from the `gh-pages` branch. It has no build step: whatever is on this branch is what the site shows, usually a minute or two after each change.

| Path | What it is |
| --- | --- |
| `index.html` | The page |
| `assets/` | The gallery's compiled script and stylesheet (fonts are embedded) |
| `photos/` | Each photo in two sizes: `-sm` for the globe and grid, `-lg` for the full view |
| `.nojekyll` | Tells GitHub Pages to serve the files as they are |

All paths are relative, so the site also works from a custom domain or another folder.

## Adding photos

The **Add photos** button lets a visitor drop their own photos into the gallery. Those photos stay in the visitor's browser tab and are not uploaded anywhere.

The 32 built-in photos are listed inside the compiled script in `assets/`. Changing that list means rebuilding the gallery from its source project, not just adding files to `photos/`.

## Credits

The photos come from [Unsplash](https://unsplash.com) and are used under the Unsplash License. Each photo's photographer is credited in its full view.
