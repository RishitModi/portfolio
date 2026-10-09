export function scrollToId(id: string) {
  const element = document.getElementById(id);
  if (!element) return;

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  element.scrollIntoView({
    behavior: prefersReduced ? 'auto' : 'smooth',
  });
}

export function scrollToTop() {
  if (typeof window === 'undefined') return;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({
    top: 0,
    behavior: prefersReduced ? 'auto' : 'smooth',
  });
}
