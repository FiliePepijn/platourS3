import { isAbsolute, resolve } from 'path';
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
        '/assets/pages/lo.html',
        '/assets/pages/about.html',
        '/assets/pages/LO1.html',
        '/assets/pages/LO2.html',
        '/assets/pages/LO3.html',
        '/assets/pages/LO4.html',
        '/assets/pages/LO5.html',
        '/assets/pages/projects.html',
        '/assets/pages/CBR.html',
        '/assets/pages/portfolio.html',
        '/assets/pages/Holo-sports.html',
        '/assets/pages/solaria.html',
        
      ]
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        // projects
        projects: resolve(root, 'assets/pages/projects.html'),
        about: resolve(root, 'assets/pages/about.html'),
        CBR: resolve(root, 'assets/pages/CBR.html'),
        portfolio: resolve(root, 'assets/pages/portfolio.html'),
        Holosports: resolve(root, 'assets/pages/Holo-sports.html'),
        Solaria: resolve(root, 'assets/pages/solaria.html'),

        // Learning outcomes
        lo1: resolve(root, 'assets/pages/LO1.html'),
        lo2: resolve(root, 'assets/pages/LO2.html'),
        lo3: resolve(root, 'assets/pages/LO3.html'),
        lo4: resolve(root, 'assets/pages/LO4.html'),
        lo5: resolve(root, 'assets/pages/LO5.html'),

        // css
        style: resolve(root, 'assets/css/style.css'),
        aboutcss: resolve(root, 'assets/css/about.css'),
        projectscss: resolve(root, 'assets/css/projects.css'),
        transitions: resolve(root, 'assets/css/transitions.css'),

        // js
        loadFBX: resolve(root, 'assets/js/loadFBX.js'),
      },
      external: [
        '/src/assets/js/loadFBX.js',
        // Add other external modules if needed
      ],
    },
  },
});