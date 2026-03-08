import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['3d04-203-192-204-75.ngrok-free.app', '.ngrok-free.app'],
  },
})
