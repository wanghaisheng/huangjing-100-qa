import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        'cross-fetch': path.resolve(__dirname, './src/polyfills/fetch.ts'),
        '@heytcm/core': path.resolve(__dirname, './packages/core/src/index.ts'),
        '@heytcm/config': path.resolve(__dirname, './packages/config/src/index.ts'),
        '@heytcm/api': path.resolve(__dirname, './packages/api/src/index.ts'),
        '@heytcm/i18n': path.resolve(__dirname, './packages/i18n/src/index.ts'),
        '@heytcm/ui': path.resolve(__dirname, './packages/ui/src/index.ts'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
