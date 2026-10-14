// The photo list plus one GPU texture per photo. Visitors can replace the
// gallery with their own images and restore the originals later; their
// files are decoded in the browser, kept as object URLs and never uploaded.
//
// Events (it is an EventTarget): 'change' after a replace or a restore, with
// event.detail = { reason: 'replace' | 'restore', photos }.
import { CanvasTexture, LinearFilter, LinearMipmapLinearFilter, SRGBColorSpace, Texture } from 'three'
import { clamp } from '../core/math.js'

// At most this many files replace the gallery (the rest are ignored).
export const MAX_FILES = 200
const IMAGE_EXTENSIONS = /\.(jpe?g|jfif|png|webp|gif|avif|heic|heif)$/i
// Pixels shared by all of a custom gallery's globe textures, so 200 photos
// cost no more GPU memory than a handful (each texture is ≤ 1024 px long).
const TEXTURE_BUDGET = { coarse: 12e6, fine: 32e6 }
const THUMB_EDGE = 360

// Catalog entry -> runtime photo, with image URLs resolved against `base`.
export function toPhoto(entry, base) {
  return {
    id: entry.id,
    title: entry.title,
    category: entry.category,
    place: entry.place,
    src: `${base}photos/${entry.file}-sm.webp`,
    full: `${base}photos/${entry.file}-lg.webp`,
    width: entry.width,
    height: entry.height,
    tone: entry.tone,
    accent: entry.accent,
    credit: entry.credit,
  }
}

function loadImage(url) {
  const image = new Image()
  image.decoding = 'async'
  image.src = url
  return image.decode().then(() => image)
}

// Image files only: any image type (decoding decides), or a known extension
// when the browser reports no type (HEIC often has none).
export function isImageFile(file) {
  return file.type.startsWith('image/') || (!file.type && IMAGE_EXTENSIONS.test(file.name))
}

// Decodes a file, upright (EXIF orientation applied). Falls back to an
// <img> for formats createImageBitmap can't read (e.g. HEIC in Safari).
async function decodeFile(file) {
  if (typeof createImageBitmap === 'function') {
    try {
      const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' })
      return { source: bitmap, width: bitmap.width, height: bitmap.height, release: () => bitmap.close() }
    } catch {}
  }
  const url = URL.createObjectURL(file)
  try {
    const image = await loadImage(url)
    return { source: image, width: image.naturalWidth, height: image.naturalHeight, release: () => {} }
  } finally {
    URL.revokeObjectURL(url)
  }
}

function drawScaled(source, width, height, edge) {
  const scale = Math.min(1, edge / Math.max(width, height))
  const canvas = document.createElement('canvas')
  canvas.width = Math.max(1, Math.round(width * scale))
  canvas.height = Math.max(1, Math.round(height * scale))
  const ctx = canvas.getContext('2d')
  ctx.imageSmoothingQuality = 'high'
  ctx.drawImage(source, 0, 0, canvas.width, canvas.height)
  return canvas
}

function canvasUrl(canvas) {
  return new Promise((resolve) =>
    canvas.toBlob((blob) => resolve(blob ? URL.createObjectURL(blob) : null), 'image/jpeg', 0.82),
  )
}

// Average colour (tone) and the most vivid mid-lightness pixel (accent) of a
// 24×24 downsample, as hex strings.
function extractColors(source) {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = 24
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  ctx.drawImage(source, 0, 0, 24, 24)
  const data = ctx.getImageData(0, 0, 24, 24).data
  let red = 0
  let green = 0
  let blue = 0
  let best = { score: -1, rgb: [0, 0, 0] }
  for (let i = 0; i < data.length; i += 4) {
    red += data[i]
    green += data[i + 1]
    blue += data[i + 2]
    const max = Math.max(data[i], data[i + 1], data[i + 2])
    const min = Math.min(data[i], data[i + 1], data[i + 2])
    const lightness = (max + min) / 510
    const score = ((max - min) / 255) * (1 - Math.abs(lightness - 0.5) * 1.6)
    if (score > best.score) best = { score, rgb: [data[i], data[i + 1], data[i + 2]] }
  }
  const pixels = data.length / 4
  const hex = (rgb) => `#${rgb.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')}`
  return { tone: hex([red / pixels, green / pixels, blue / pixels]), accent: hex(best.rgb) }
}

// "my_holiday-02.jpg" -> "My holiday 02"
function titleFromFileName(name) {
  const title = name
    .replace(/\.[^.]+$/, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  return title ? title.charAt(0).toUpperCase() + title.slice(1) : 'Untitled photo'
}

export class PhotoStore extends EventTarget {
  photos
  originals
  renderer
  coarse
  textures = new Map()
  isCustom = false
  busy = false
  // object URLs owned by the current custom gallery
  urls = []
  batch = 0

  constructor(photos, renderer, { coarse = false } = {}) {
    super()
    this.photos = photos
    this.originals = photos
    this.renderer = renderer
    this.coarse = coarse
  }

  get count() {
    return this.photos.length
  }

  indexOf(photo) {
    return this.photos.indexOf(photo)
  }

  texture(photo) {
    return this.textures.get(photo.id)
  }

  // Loads the globe image of every photo in `photos` (the current ones by
  // default); `onProgress(loaded, total)` after each one. A photo that fails
  // to load simply keeps its tone placeholder.
  async loadTextures(onProgress, photos = this.photos) {
    if (!this.renderer) return
    let loaded = 0
    const total = photos.length
    await Promise.all(
      photos.map(async (photo) => {
        try {
          if (!this.textures.has(photo.id)) {
            const image = await loadImage(photo.src)
            this.textures.set(photo.id, this.makeTexture(image))
          }
        } catch {}
        loaded += 1
        onProgress?.(loaded, total)
      }),
    )
  }

  // Replaces the gallery with image files (up to MAX_FILES). Unreadable
  // files are skipped; if none can be read the gallery stays as it is.
  // Resolves with { added, skipped (file names), ignored (over the cap) }.
  // `onProgress(done, total)` after each file.
  async replaceWith(files, { onProgress } = {}) {
    const list = [...files]
    if (this.busy) return { added: [], skipped: [], ignored: 0, busy: true }
    this.busy = true
    const images = list.filter(isImageFile)
    const skipped = list.filter((file) => !isImageFile(file)).map((file) => file.name)
    const ignored = Math.max(0, images.length - MAX_FILES)
    const chosen = images.slice(0, MAX_FILES)
    const budget = this.coarse ? TEXTURE_BUDGET.coarse : TEXTURE_BUDGET.fine
    // longest texture edge, for photos of about 3:2
    const edge = clamp(Math.round(Math.sqrt((budget / Math.max(1, chosen.length)) * 1.5)), 256, 1024)
    const batch = ++this.batch
    const added = []
    const urls = []
    try {
      // a few files at a time: decoding runs off the main thread, so this
      // overlaps it with the canvas work, without holding every image at once
      const read = new Array(chosen.length)
      let next = 0
      let done = 0
      const worker = async () => {
        while (next < chosen.length) {
          const i = next++
          read[i] = await this.readFile(chosen[i], `mine-${batch}-${i}`, edge, urls)
          onProgress?.(++done, chosen.length)
        }
      }
      await Promise.all(Array.from({ length: Math.min(this.coarse ? 3 : 4, chosen.length) }, worker))
      chosen.forEach((file, i) => (read[i] ? added.push(read[i]) : skipped.push(file.name)))
      if (added.length === 0) return { added, skipped, ignored }
      const previous = this.photos
      const previousUrls = this.urls
      this.photos = added
      this.urls = urls
      this.isCustom = true
      this.emit('replace')
      this.release(previous, previousUrls)
      return { added, skipped, ignored }
    } finally {
      this.busy = false
    }
  }

  // Brings the original gallery back (their textures are reloaded first, so
  // nothing shows a placeholder in between).
  async restoreOriginals() {
    if (!this.isCustom || this.busy) return false
    this.busy = true
    try {
      await this.loadTextures(null, this.originals)
      const previous = this.photos
      const previousUrls = this.urls
      this.photos = this.originals
      this.urls = []
      this.isCustom = false
      this.emit('restore')
      this.release(previous, previousUrls)
      return true
    } finally {
      this.busy = false
    }
  }

  // One file -> a photo with a downscaled globe texture, a small preview URL
  // and the full-size file URL for the lightbox. Null if it can't be read.
  async readFile(file, id, edge, urls) {
    let decoded = null
    try {
      decoded = await decodeFile(file)
      const { source, width, height } = decoded
      if (!width || !height) return null
      const canvas = drawScaled(source, width, height, edge)
      const preview = drawScaled(canvas, canvas.width, canvas.height, THUMB_EDGE)
      decoded.release()
      decoded = null
      const { tone, accent } = extractColors(preview)
      const src = await canvasUrl(preview)
      const full = URL.createObjectURL(file)
      urls.push(full)
      if (src) urls.push(src)
      if (this.renderer) {
        // once the GPU has its copy, drop the canvas pixels
        const texture = this.makeTexture(canvas, () => (canvas.width = canvas.height = 1))
        this.textures.set(id, texture)
      }
      return {
        id,
        title: titleFromFileName(file.name),
        category: 'Your photos',
        src: src ?? full,
        full,
        width,
        height,
        tone,
        accent,
        local: true,
      }
    } catch {
      return null
    } finally {
      decoded?.release()
    }
  }

  // Frees the textures and object URLs of a gallery that is no longer shown.
  release(photos, urls) {
    for (const photo of photos) {
      this.textures.get(photo.id)?.dispose()
      this.textures.delete(photo.id)
    }
    for (const url of urls) URL.revokeObjectURL(url)
  }

  emit(reason) {
    this.dispatchEvent(new CustomEvent('change', { detail: { reason, photos: this.photos } }))
  }

  // `onUploaded()` runs once the texture is on the GPU.
  makeTexture(source, onUploaded) {
    const texture = source instanceof HTMLCanvasElement ? new CanvasTexture(source) : new Texture(source)
    texture.colorSpace = SRGBColorSpace
    texture.minFilter = LinearMipmapLinearFilter
    texture.magFilter = LinearFilter
    texture.generateMipmaps = true
    texture.needsUpdate = true
    if (onUploaded) {
      texture.onUpdate = () => {
        texture.onUpdate = null
        onUploaded()
      }
    }
    if (this.renderer) {
      texture.anisotropy = Math.min(4, this.renderer.capabilities.getMaxAnisotropy())
      this.renderer.initTexture(texture)
    }
    return texture
  }
}
