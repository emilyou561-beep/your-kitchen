import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// Fixed port so Yoru Kitchen never silently lands on another project's port.
export default defineConfig({
  // GitHub Pages serves the site from /your-kitchen/; local dev stays at /.
  base: process.env.GITHUB_PAGES ? '/your-kitchen/' : '/',
  plugins: [react()],
  server: { port: 5180, strictPort: true },
  preview: { port: 5181, strictPort: true },
})
