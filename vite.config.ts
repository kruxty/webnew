import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

export default defineConfig({
  root: 'app',
  base: '/webnew/',
  plugins: [inspectAttr(), react()],
  build: {
    outDir: '../dist',   // ← AÑADE ESTO: sale de app/ y crea dist/ en raíz
    emptyOutDir: true,
  },
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "app/src"),
    },
  },
});
