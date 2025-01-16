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
        '/assets/pages/projects/CBR.html',
        '/assets/pages/projects/Holo-sports.html',
        '/assets/pages/projects/passion-project.html',
        '/assets/pages/projects/portfolio.html',
        '/assets/pages/projects/solaria.html',
        '/assets/pages/404.html',
      ]
    }),
  ],
  build: {
    chunkSizeWarningLimit: 1000,
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {


        // pages
        main: resolve(root, 'index.html'),
        lo: resolve(root, 'assets/pages/lo.html'),
        404: resolve(root, 'assets/pages/404.html'),
        projects: resolve(root, 'assets/pages/projects.html'),
        about: resolve(root, 'assets/pages/about.html'),


        // projects
        CBR: resolve(root, 'assets/pages/CBR.html'),
        HoloSports : resolve(root, 'assets/pages/Holo-sports.html'),
        passionproject: resolve(root, 'assets/pages/passion-project.html'),
        portfolio: resolve(root, 'assets/pages/portfolio.html'),
        solaria: resolve(root, 'assets/pages/solaria.html'),
        
        // LO
        LO1: resolve(root, 'assets/pages/LO1.html'),
        LO2: resolve(root, 'assets/pages/LO2.html'),
        LO3: resolve(root, 'assets/pages/LO3.html'),
        LO4: resolve(root, 'assets/pages/LO4.html'),
        LO5: resolve(root, 'assets/pages/LO5.html'),

        // css
        style: resolve(root, 'assets/css/style.css'),
        projectscss: resolve(root, 'assets/css/projects.css'),
        transitions: resolve(root, 'assets/css/transitions.css'),
        aboutcss: resolve(root, 'assets/css/about.css'),


      }
    }
  }
});
