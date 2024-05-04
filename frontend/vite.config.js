import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {  // Tutte le richieste che iniziano con '/api' verranno proxyate
        target: 'http://localhost:4000',  // URL del server
        changeOrigin: true,  // Necessario per i virtual host
        secure: false,  // Se il backend è in https, impostare su true
      }
    }
  }
});