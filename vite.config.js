import { defineConfig } from 'vite';
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  base: '/',
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/partials'),
    }),
    createHtmlPlugin({
      minify: true,
    }),
  ],
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        'yoshop-restaurant': resolve(__dirname, 'yoshop-restaurant-case.html'),
        'yoshop-kiosk': resolve(__dirname, 'yoshop-kiosk.html'),
        'creatego': resolve(__dirname, 'creatego-case.html'),
        'ronto-tech': resolve(__dirname, 'ronto-tech-case.html'),
        'unitradex': resolve(__dirname, 'unitradex-case.html'),
        'handmade': resolve(__dirname, 'handmade-page.html'),
      },
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/variables.scss";`
      }
    }
  },
  optimizeDeps: {
    include: ['i18next'],
  },
});


