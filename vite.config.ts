import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
// import { rtlcssPlugin } from './vite-rtlcss-plugin';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // rtlcssPlugin(),
  ],
  base: '/', // react/template/demo1/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['mixed-decls', 'color-functions', 'global-builtin', 'import'],
      },
    },
  },
});
