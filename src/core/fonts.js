// Self-hosted variable fonts, registered through the FontFace API so the intro
// can wait for them before laying out the particle wordmark.
import unboundedUrl from '../assets/fonts/unbounded-variable.woff2?url'
import martianMonoUrl from '../assets/fonts/martian-mono-variable.woff2?url'
import instrumentSansUrl from '../assets/fonts/instrument-sans-variable.woff2?url'

export const FONT_DISPLAY = 'Unbounded Variable'

const FONTS = [
  { family: FONT_DISPLAY, url: unboundedUrl, descriptors: { weight: '200 900', display: 'swap' } },
  {
    family: 'Martian Mono Variable',
    url: martianMonoUrl,
    descriptors: { weight: '100 800', stretch: '75% 112.5%', display: 'swap' },
  },
  { family: 'Instrument Sans Variable', url: instrumentSansUrl, descriptors: { weight: '400 700', display: 'swap' } },
]

// Resolves with {loaded, total} once every font settles, or after `timeout` ms.
export function loadFonts(timeout = 2500) {
  const total = FONTS.length
  const loads = FONTS.map(({ family, url, descriptors }) => {
    const face = new FontFace(family, `url(${url}) format("woff2")`, descriptors)
    document.fonts.add(face)
    return face.load()
  })
  const settled = Promise.allSettled(loads).then((results) => ({
    loaded: results.filter((r) => r.status === 'fulfilled').length,
    total,
  }))
  const timer = new Promise((resolve) => setTimeout(() => resolve({ loaded: 0, total }), timeout))
  return Promise.race([settled, timer])
}
