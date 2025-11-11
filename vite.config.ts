import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5175,
    allowedHosts: [
      '5173-im44v8hzokemz3ay6okih-5185f4aa.sandbox.novita.ai',
      '5174-im44v8hzokemz3ay6okih-5185f4aa.sandbox.novita.ai',
      '5175-im44v8hzokemz3ay6okih-5185f4aa.sandbox.novita.ai'
    ],
    hmr: {
      clientPort: 5175
    }
  },
  build: {
    chunkSizeWarningLimit: 1000, // Augmente la limite à 1000 kB pour Firebase
    rollupOptions: {
      output: {
        manualChunks: {
          'firebase': ['firebase/app', 'firebase/firestore', 'firebase/auth']
        }
      }
    }
  }
})
