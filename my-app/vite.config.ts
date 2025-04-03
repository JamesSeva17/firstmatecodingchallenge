import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API requests to the backend during development
      '/api': 'http://localhost:3000', // Change this if your local server is different
    },
  },
  build: {
    outDir: 'build', // Output directory for production build
  },
});
