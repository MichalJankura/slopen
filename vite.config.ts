import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5176,
    strictPort: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 4181,
    strictPort: true,
  },
  build: {
    target: 'es2019',
    cssMinify: true,
    sourcemap: false,
  },
});
