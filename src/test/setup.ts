import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// jsdom does not implement scrolling and logs an error for every call.
if (typeof window !== 'undefined') {
  window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;
}

afterEach(() => {
  cleanup();
});
