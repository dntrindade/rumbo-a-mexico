import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
  base: './', // paths relativos, permite abrir dist/index.html direto no navegador
})
