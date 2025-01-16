import { resolve } from 'path';
import { defineConfig } from 'vite';
import Sitemap from 'vite-plugin-sitemap';

const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');

export default defineConfig({
  server: {
    port: 5173,
  },
  root,
  plugins: [
    Sitemap({
      hostname: 'https://platour.net/',
      outDir: outDir,
      routes: [
        '/',
        '/lo.html',
        '/about.html',
        '/LO1.html',
        '/LO2.html',
        '/LO3.html',
        '/LO4.html',
        '/LO5.html',
        '/projects.html',
        '/CBR.html',
        '/portfolio.html',
        '/Holo-sports.html',
        '/solaria.html',
      ],
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        // projects
        projects: resolve(root, 'projects.html'),
        about: resolve(root, 'about.html'),
        CBR: resolve(root, 'CBR.html'),
        portfolio: resolve(root, 'portfolio.html'),
        Holosports: resolve(root, 'Holo-sports.html'),
        Solaria: resolve(root, 'solaria.html'),

        // Learning outcomes
        lo1: resolve(root, 'LO1.html'),
        lo2: resolve(root, 'LO2.html'),
        lo3: resolve(root, 'LO3.html'),
        lo4: resolve(root, 'LO4.html'),
        lo5: resolve(root, 'LO5.html'),

        // css
        style: resolve(root, 'assets/css/style.css'),
        aboutcss: resolve(root, 'assets/css/about.css'),
        projectscss: resolve(root, 'assets/css/projects.css'),
        transitions: resolve(root, 'assets/css/transitions.css'),

        // js
        loadFBX: resolve(root, 'assets/js/loadFBX.js'),
      },
    },
  },
});
