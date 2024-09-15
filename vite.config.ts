// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@lyket/react': 'node_modules/@lyket/react/dist/index.js', // Ajusta el path si es necesario
    },
  },
});
