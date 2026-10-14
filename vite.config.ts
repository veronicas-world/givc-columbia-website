import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 3100,
    strictPort: true,
  },
  preview: {
    host: '127.0.0.1',
    port: 3100,
    strictPort: true,
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    exclude: ['node_modules/**', 'dist/**', 'design-preview/**'],
    maxWorkers: 1,
    fileParallelism: false,
    watch: false,
  },
});
