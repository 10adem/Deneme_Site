import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import { visualizer } from 'rollup-plugin-visualizer';
import history from 'connect-history-api-fallback'
import type { Connect } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react', '@supabase/realtime-js'],
  },
  server: {
    port: 5173,
    strictPort: true,
    // historyApiFallback: true

    middlewareMode: false,
    open: true,
    hmr: true,

    proxy: {
      '/login': {
        target: 'http://localhost:5173', // Vite'ın varsayılan portu
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/login/, '/')
      }
    }
  },
  build: {
    assetsInlineLimit: 0,
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        format: 'iife',
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    },
    assetsDir: 'assets',
    emptyOutDir: true,
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true
      }
    },
  },
  preview: {
    // historyApiFallback: true
    port: 4173,
    open: true,
    host: true
  },
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg', '**/*.gif', '**/*.ico'],
  base: '/',
});