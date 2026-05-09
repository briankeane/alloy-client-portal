import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

declare const process: { cwd(): string };

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      port: 3000,
      hmr: {
        port: parseInt(env.VITE_HMR_PORT || '3010'),
      },
    },
  };
});
