// The photo list plus one GPU texture per photo. Visitors can add their own
// images; those stay local (object URLs) and are never uploaded.
import { CanvasTexture, LinearFilter, LinearMipmapLinearFilter, SRGBColorSpace, Texture } from 'three'

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
    .trim()
  return title ? title.charAt(0).toUpperCase() + title.slice(1) : 'Untitled photo'
}

export class PhotoStore {
  photos
  renderer
  textures = new Map()

  constructor(photos, renderer) {
    this.photos = photos
    this.renderer = renderer
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

  // Loads every photo's globe image; `onProgress(loaded, total)` after each one.
  // A photo that fails to load simply keeps its tone placeholder.
  async loadTextures(onProgress) {
    if (!this.renderer) return
    let loaded = 0
    const total = this.photos.length
    await Promise.all(
      this.photos.map(async (photo) => {
        try {
          const image = await loadImage(photo.src)
          this.textures.set(photo.id, this.makeTexture(image))
        } catch {}
        loaded += 1
        onProgress?.(loaded, total)
      }),
    )
  }

  // Adds image files to the gallery. Resolves with the photos that were added
  // and the names of the files that could not be read.
  async addFiles(files) {
    const added = []
    const skipped = []
    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        skipped.push(file.name)
        continue
      }
      const url = URL.createObjectURL(file)
      try {
        const image = await loadImage(url)
        const width = image.naturalWidth
        const height = image.naturalHeight
        // downscale to roughly the size of the bundled -sm images (never upscale)
        const scale = Math.min(1, Math.max(704 / width, 512 / height))
        const canvas = document.createElement('canvas')
        canvas.width = Math.max(1, Math.round(width * scale))
        canvas.height = Math.max(1, Math.round(height * scale))
        canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height)
        const { tone, accent } = extractColors(canvas)
        const texture = this.renderer ? this.makeTexture(canvas) : null
        const photo = {
          id: `local-${Date.now().toString(36)}-${added.length}`,
          title: titleFromFileName(file.name),
          category: 'Your photos',
          src: url,
          full: url,
          width,
          height,
          tone,
          accent,
          local: true,
        }
        if (texture) this.textures.set(photo.id, texture)
        this.photos.push(photo)
        added.push(photo)
      } catch {
        URL.revokeObjectURL(url)
        skipped.push(file.name)
      }
    }
    return { added, skipped }
  }

  makeTexture(source) {
    const texture = source instanceof HTMLCanvasElement ? new CanvasTexture(source) : new Texture(source)
    texture.colorSpace = SRGBColorSpace
    texture.minFilter = LinearMipmapLinearFilter
    texture.magFilter = LinearFilter
    texture.generateMipmaps = true
    texture.needsUpdate = true
    if (this.renderer) {
      texture.anisotropy = Math.min(4, this.renderer.capabilities.getMaxAnisotropy())
      this.renderer.initTexture(texture)
    }
    return texture
  }
}
