    // vitest.config.js
    import { defineConfig } from 'vitest/config';
    import react from '@vitejs/plugin-react';

    export default defineConfig({
      plugins: [react()],
      test: {
        environment: 'jsdom', // Use JSDOM for browser-like environment
        setupFiles: ['./vitest-setup.js'], // Path to your setup file
        globals: true, // Optional: makes test functions globally available
      },
    });