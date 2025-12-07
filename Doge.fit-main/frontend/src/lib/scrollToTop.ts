/**
 * Scrolls the window to the top smoothly
 */
export function scrollToTop() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}

/**
 * Navigate and scroll to top
 */
export function navigateWithScroll(location: string, setLocation: (path: string) => void) {
  setLocation(location);
  // Use setTimeout to ensure scroll happens after route change
  setTimeout(() => {
    scrollToTop();
  }, 0);
}
