import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Vite will serve index.html from the root
  root: '.',
  // Enable React JSX support
  plugins: [react()],
  // Build configuration
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  // Server configuration
  server: {
    port: 3000,
    open: true,
  },
});


