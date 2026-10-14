// The hidden multi-file picker + drag and drop anywhere on the page. Both
// hand the chosen File list to `onFiles` (which replaces the gallery);
// `isBlocked()` suspends drops (intro, lightbox open). Returns
// { openPicker() } — call it from a click handler (browsers only open the
// picker for a user gesture).
import { gsap } from 'gsap'

export function setupFileDrop(onFiles, isBlocked) {
  const input = document.getElementById('file-input')
  const overlay = document.getElementById('drop')

  input.addEventListener('change', () => {
    const files = [...(input.files ?? [])]
    input.value = ''
    if (files.length > 0) onFiles(files)
  })

  const hasFiles = (event) => [...(event.dataTransfer?.types ?? [])].includes('Files')
  // dragenter/dragleave fire for every child element crossed, so count depth.
  let depth = 0
  const showOverlay = (show) => {
    if (show === !overlay.hidden) return
    if (show) {
      overlay.hidden = false
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.2 })
    } else {
      gsap.to(overlay, { opacity: 0, duration: 0.2, onComplete: () => void (overlay.hidden = true) })
    }
  }

  addEventListener('dragenter', (event) => {
    if (!hasFiles(event) || isBlocked()) return
    event.preventDefault()
    depth += 1
    showOverlay(true)
  })
  addEventListener('dragover', (event) => {
    if (!hasFiles(event) || isBlocked()) return
    event.preventDefault()
    if (event.dataTransfer) event.dataTransfer.dropEffect = 'copy'
  })
  addEventListener('dragleave', (event) => {
    if (!hasFiles(event)) return
    depth = Math.max(0, depth - 1)
    if (depth === 0) showOverlay(false)
  })
  addEventListener('drop', (event) => {
    if (!hasFiles(event)) return
    event.preventDefault()
    depth = 0
    showOverlay(false)
    if (isBlocked()) return
    const files = [...(event.dataTransfer?.files ?? [])]
    if (files.length > 0) onFiles(files)
  })

  return { openPicker: () => input.click() }
}
