import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import autoprefixer from 'autoprefixer';

// https://vite.dev/config/
export default defineConfig({
  content: [
    "./src/**/*.{html,js,jsx}", // Ensure your JSX files are included here
  ],
  plugins: [react(),
    tailwindcss()
  ],
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  
})
