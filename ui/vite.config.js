import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import preload from 'vite-plugin-preload';
import { analyzer } from 'vite-bundle-analyzer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), preload(), analyzer()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
