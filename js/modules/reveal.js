/** Animaciones sutiles de aparición al hacer scroll. */
export function initReveal(root = document) {
  const items = root.querySelectorAll('.reveal:not(.is-visible)');
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  items.forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i % 5, 4) * 70}ms`;
    io.observe(el);
  });
}
