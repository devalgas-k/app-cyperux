import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  build: {
    outDir: '../../../target/classes/static',
  },
  root: 'src/main/webapp',
  server: {
    port: 9000,
    hmr: { overlay: false },
    proxy: {
      '/style': {
        ws: true,
        changeOrigin: true,
        rewrite: path => path.replace('/style', ''),
        target: 'http://localhost:9005',
      },
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/oauth2': {
        target: 'http://localhost:8080',
        changeOrigin: false,
        xfwd: true,
      },
      '/login': {
        target: 'http://localhost:8080',
        changeOrigin: false,
        xfwd: true,
      },
      '/logout': {
        target: 'http://localhost:8080',
        changeOrigin: false,
        xfwd: true,
      },
    },
  },
  define: {
    'process.env': {},
  },
});
