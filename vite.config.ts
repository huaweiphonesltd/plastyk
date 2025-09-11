import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src',
  publicDir: '../src/assets', // Copy assets to dist root
  build: {
    outDir: '../dist',
    sourcemap: true
  },
  server: {
    port: 3000,
    open: true
  }
})