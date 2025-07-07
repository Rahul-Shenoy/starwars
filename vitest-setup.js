    // vitest-setup.js
    import { afterEach } from 'vitest';
    import { cleanup } from '@testing-library/react';
    import '@testing-library/jest-dom/vitest'; // This imports the jest-dom matchers for Vitest

    // Optional: runs a cleanup after each test case to clear JSDOM
    afterEach(() => {
      cleanup();
    });