import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5174,
    allowedHosts: [
      '5173-im44v8hzokemz3ay6okih-5185f4aa.sandbox.novita.ai',
      '5174-im44v8hzokemz3ay6okih-5185f4aa.sandbox.novita.ai'
    ],
    hmr: {
      clientPort: 5174
    }
  }
})
