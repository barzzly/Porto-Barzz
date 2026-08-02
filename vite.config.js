import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    cssCodeSplit: true,
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Check lucide first — it also matches "react"
            if (id.includes('lucide-react')) return 'icons'
            if (id.includes('react')) return 'react-vendor'
            return 'vendor'
          }
        },
      },
    },
  },
})
