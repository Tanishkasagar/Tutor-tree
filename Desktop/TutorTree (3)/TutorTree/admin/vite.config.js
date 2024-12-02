import { defineConfig } from 'vite'  // Imports Vite's configuration definition function
import react from '@vitejs/plugin-react'  // Imports the Vite plugin for React

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],  // Specifies the React plugin for Vite to enable React support
  server: {
    port: 5174  // Configures the development server to run on port 5174
  }
})
