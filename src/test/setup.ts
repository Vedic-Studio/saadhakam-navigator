import "@testing-library/jest-dom";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// jsdom does not implement IntersectionObserver but framer-motion's `viewport`
// feature (used by `ScrollReveal`) calls into it on mount. A minimal no-op
// shim lets components that animate on scroll render under test.
class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [] as IntersectionObserverEntry[];
  }
}

if (typeof globalThis.IntersectionObserver === "undefined") {
  // @ts-expect-error -- assigning a minimal mock onto the global namespace.
  globalThis.IntersectionObserver = MockIntersectionObserver;
}
if (typeof window !== "undefined" && !window.IntersectionObserver) {
  // @ts-expect-error -- mirror on window for libraries that read it there.
  window.IntersectionObserver = MockIntersectionObserver;
}
