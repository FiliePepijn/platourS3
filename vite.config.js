import { isAbsolute, resolve } from 'path';
import { defineConfig } from 'vite';
import SitemapGenerator from 'sitemap-generator'; // Properly import sitemap-generator

const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');

// Create generator
const generator = SitemapGenerator('http://platour.net', {
  stripQuerystring: false, // Keep query strings if present
  filepath: resolve(outDir, 'sitemap.xml'), // Ensure the sitemap is written to the build output directory
});

// Register event listeners
generator.on('done', () => {
  console.log('Sitemap generated successfully!');
});

// Register error listeners (optional)
generator.on('error', (error) => {
  console.error('Error during sitemap generation:', error);
});

// Start the crawler
generator.start();

// Export the Vite configuration
export default defineConfig({
  server: {
    port: 5173,
  },
  root,
  build: {
    outDir,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      input: {
        // Projects
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

        // CSS
        style: resolve(root, 'assets/css/style.css'),
        aboutcss: resolve(root, 'assets/css/about.css'),
        projectscss: resolve(root, 'assets/css/projects.css'),
        transitions: resolve(root, 'assets/css/transitions.css'),

        // JS
        loadFBX: resolve(root, 'assets/js/loadFBX.js'),
      },
      external: [
        '/src/assets/js/loadFBX.js',
        // Add other external modules if needed
      ],
    },
  },
});
