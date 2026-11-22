/**
 * Punto de entrada común a todas las páginas (index, catalogo, contacto).
 * Cada módulo se inicia solo si su sección existe en la página actual.
 */
import { renderLayout, currentPage } from './modules/layout.js';
import { initNav } from './modules/nav.js';
import { initReveal } from './modules/reveal.js';
import { initTypes } from './modules/types.js';
import { initGallery } from './modules/gallery.js';
import { initCatalog } from './modules/catalog.js';
import { initLocations } from './modules/locations.js';
import { initContact } from './modules/contact.js';
import { initLegal } from './modules/legal.js';
import { goTo } from './modules/utils.js';

document.documentElement.classList.remove('no-js');

renderLayout();

const has = (selector) => document.querySelector(selector) !== null;
if (has('[data-types-tabs]')) initTypes();
if (has('[data-gallery]')) initGallery();
if (has('[data-locations]')) initLocations();
if (has('[data-catalog-grid]')) initCatalog();
if (has('[data-contact-form]')) initContact();
initLegal();
initNav();
initReveal();

// Inicio: anclas internas con scroll suave (respetando movimiento reducido)
if (currentPage() === 'home') {
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (a && a.getAttribute('href').length > 1) { e.preventDefault(); goTo(a.getAttribute('href')); }
  });
}
