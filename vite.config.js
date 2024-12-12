import { resolve } from 'path';
import { defineConfig } from 'vite';
import Sitemap from 'vite-plugin-sitemap';

const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');

export default defineConfig({
  root,
  plugins: [
    Sitemap({
      hostname: 'https://platour.net/',
      outDir: outDir,
      routes: [
        '/',
        '/assets/pages/lo.html',
        '/assets/pages/about.html',
        '/assets/pages/LO1.html',
        '/assets/pages/LO2.html',
        '/assets/pages/LO3.html',
        '/assets/pages/LO4.html',
        '/assets/pages/LO5.html'
      ]
    }),
  ],
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        projects: resolve(root, 'assets/pages/lo.html'),
        lo1: resolve(root, 'assets/pages/LO1.html'),
        lo2: resolve(root, 'assets/pages/LO2.html'),
        lo3: resolve(root, 'assets/pages/LO3.html'),
        lo4: resolve(root, 'assets/pages/LO4.html'),
        lo5: resolve(root, 'assets/pages/LO5.html')
      }
    }
  }
});