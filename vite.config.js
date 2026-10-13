import { defineConfig } from 'vite'

// Relative base so the build works from any folder: GitHub Pages project
// sites, Netlify, Cloudflare Pages or a custom domain.
export default defineConfig({
  base: './',
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 1500,
  },
})
