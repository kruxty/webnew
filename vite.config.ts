import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

export default defineConfig({
  root: 'app',                    // ← AÑADIDO: le dice a Vite que todo está en app/
  base: '/webnew/',
  plugins: [inspectAttr(), react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "app/src"),  // ← CORREGIDO
    },
  },
});
