import { resolve } from 'path';
import { defineConfig } from 'vite';

const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');

// https://vitejs.dev/config/
export default defineConfig({
  root,
  plugins: [],
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        projects: resolve(root, 'assets/pages/projects.html'),
        lo1:resolve(root, 'assets/pages/LO1.html'),
        lo2:resolve(root, 'assets/pages/LO2.html'),
        lo3:resolve(root, 'assets/pages/LO3.html'),
        lo4:resolve(root, 'assets/pages/LO4.html'),
        lo5:resolve(root, 'assets/pages/LO5.html')

      }
    }
  }
});