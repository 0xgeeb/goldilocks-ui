import { expect, vi, afterEach } from "vitest";
import "@testing-library/jest-dom";

// Silence React 18 adapter warnings
// See https://github.com/testing-library/react-testing-library/issues/1051
// This is a temporary workaround for React 18 with React Hooks Testing Library
const originalConsoleError = console.error;
console.error = (...args) => {
  if (
    args[0]?.includes?.(
      "Warning: ReactDOM.render is no longer supported in React 18",
    ) ||
    args[0]?.includes?.(
      "Warning: The current testing environment is not configured to support act",
    ) ||
    args[0]?.includes?.("useLayoutEffect does nothing on the server")
  ) {
    return;
  }
  originalConsoleError(...args);
};

// Global cleanup after tests
afterEach(() => {
  vi.clearAllMocks();
});
