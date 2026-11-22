/**
 * Navegación: barra fija, menú móvil y, en el inicio, resaltado de la sección visible.
 * En las páginas interiores (catálogo, contacto) la cabecera es siempre sólida y el
 * enlace activo lo marca layout.js.
 */
import { currentPage } from './layout.js';

export function initNav() {
  const header = document.querySelector('[data-header]');
  const nav = document.querySelector('[data-nav]');
  const toggle = document.querySelector('[data-nav-toggle]');
  const isHome = currentPage() === 'home';
  const anchorLinks = [...nav.querySelectorAll('a[href^="#"]')];

  // Fondo sólido al desplazarse (siempre sólido en páginas interiores)
  const onScroll = () => header.classList.toggle('is-scrolled', !isHome || window.scrollY > 24);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Menú móvil
  const setOpen = (open) => {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('.visually-hidden').textContent = open ? 'Cerrar menú' : 'Abrir menú';
  };
  toggle.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) { setOpen(false); toggle.focus(); }
  });
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('is-open') && !header.contains(e.target)) setOpen(false);
  });

  if (!isHome) return;

  // Inicio: la sección activa es la última cuyo inicio ha pasado bajo la cabecera
  const sections = anchorLinks.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const setActive = () => {
    const offset = header.offsetHeight + window.innerHeight * 0.25;
    let current = sections[0];
    for (const s of sections) if (s.getBoundingClientRect().top - offset <= 0) current = s;
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = sections.at(-1);
    anchorLinks.forEach((a) => {
      const on = a.getAttribute('href') === `#${current.id}`;
      a.classList.toggle('is-active', on);
      if (on) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
    });
  };
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(() => { setActive(); ticking = false; }); ticking = true; }
  }, { passive: true });
  window.addEventListener('resize', setActive);
  setActive();
}
