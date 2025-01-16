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
  build: {
    outDir,
    emptyOutDir: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      input: {
        // Define HTML pages
        index: resolve(root, 'index.html'),
        projects: resolve(root, 'assets/pages/projects.html'),
        about: resolve(root, 'assets/pages/about.html'),
        CBR: resolve(root, 'assets/pages/CBR.html'),
        portfolio: resolve(root, 'assets/pages/portfolio.html'),
        Holosports: resolve(root, 'assets/pages/Holo-sports.html'),
        Solaria: resolve(root, 'assets/pages/solaria.html'),
        lo: resolve(root, 'assets/pages/LO.html'),
        passionproject: resolve(root, 'assets/pages/passion-project.html'),

        // Learning Outcomes
        lo1: resolve(root, 'assets/pages/LO1.html'),
        lo2: resolve(root, 'assets/pages/LO2.html'),
        lo3: resolve(root, 'assets/pages/LO3.html'),
        lo4: resolve(root, 'assets/pages/LO4.html'),
        lo5: resolve(root, 'assets/pages/LO5.html'),

        // CSS
        style: resolve(root, 'assets/css/style.css'),
        aboutcss: resolve(root, 'assets/css/about.css'),
        projectscss: resolve(root, 'assets/css/projects.css'),
        transitions: resolve(root, 'assets/css/transitions.css'),

        // JavaScript
        loadFBX: resolve(root, 'assets/js/loadFBX.js'),
      },
      external: [
        '/src/assets/js/loadFBX.js', // External JS modules
      ],
    },
  },
  plugins: [
    Sitemap({
      hostname: 'https://platour.net', // Replace with your site's URL
      dynamicRoutes: [
        
      ],
      exclude: ['/admin', '/private'], // Exclude specific routes
      outDir: 'dist', // Output directory for the sitemap
      changefreq: 'daily', // Change frequency
      priority: 1.0, // Priority
      lastmod: new Date(), // Last modification date
      readable: true, // Generate a human-readable sitemap
    }),
  ],
});
