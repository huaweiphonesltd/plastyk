import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src',
  publicDir: './src/assets',
  build: {
    outDir: '../dist',
    assetsDir: './src/assets',
    sourcemap: true
  },
  server: {
    port: 3000,
    open: true
  }
})