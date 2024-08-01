import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      // Настройки CSS-модулей (по умолчанию включены)
      localsConvention: 'camelCaseOnly',
    },
  },
});