import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(),react()],
  server: {
    proxy: {
      // All requests that start with '/api' will be forwarded
      '/api': {
        // to your backend server running on port 5000
        target: 'http://localhost:5000',
        // This is necessary for the server to receive the correct host header
        changeOrigin: true, 
      }
    }
  }
})
