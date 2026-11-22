/** Galería de decoración con filtros por categoría y visor ampliado. */
import { gallery, galleryCategories } from '../data/gallery.js';
import { esc, openDialog, wireDialog } from './utils.js';

export function initGallery() {
  const grid = document.querySelector('[data-gallery]');
  const filters = document.querySelector('[data-gallery-filters]');

  const used = Object.keys(galleryCategories).filter((c) => gallery.some((g) => g.category === c));
  filters.innerHTML = [['todos', 'Todas las ideas'], ...used.map((c) => [c, galleryCategories[c]])]
    .map(([v, l], i) => `<button type="button" class="chip" data-cat="${v}" aria-pressed="${i === 0}">${esc(l)}</button>`)
    .join('');

  // Visor (lightbox)
  const box = document.createElement('dialog');
  box.className = 'modal lightbox';
  box.setAttribute('aria-label', 'Imagen ampliada');
  box.innerHTML = '<div class="modal__inner"><button class="modal__close" type="button" data-close aria-label="Cerrar">×</button><img alt=""><p></p></div>';
  document.body.append(box);
  wireDialog(box);

  const render = (cat) => {
    const items = gallery.filter((g) => cat === 'todos' || g.category === cat);
    grid.innerHTML = items.map((g, i) => {
      if (g.placeholder) {
        return `<li class="gallery__item gallery__item--placeholder"><strong>${esc(g.title)}</strong><span>${esc(g.text)}</span><span>Foto pendiente</span></li>`;
      }
      const cls = ['gallery__item', g.wide && cat === 'todos' ? 'gallery__item--wide' : '', g.tall && cat === 'todos' ? 'gallery__item--tall' : ''].join(' ');
      return `<li class="${cls}">
        <figure style="margin:0;height:100%">
          <button type="button" data-zoom="${i}" aria-label="Ampliar: ${esc(g.title)}">
            <img src="${esc(g.src)}" alt="${esc(g.title)}: ${esc(g.text)}" loading="lazy" decoding="async">
          </button>
          <figcaption><strong>${esc(g.title)}</strong><span>${esc(galleryCategories[g.category])} · ${esc(g.text)}</span></figcaption>
        </figure>
      </li>`;
    }).join('');
    grid._items = items;
  };

  filters.addEventListener('click', (e) => {
    const b = e.target.closest('[data-cat]');
    if (!b) return;
    filters.querySelectorAll('[data-cat]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    render(b.dataset.cat);
  });

  grid.addEventListener('click', (e) => {
    const b = e.target.closest('[data-zoom]');
    if (!b) return;
    const g = grid._items[Number(b.dataset.zoom)];
    box.querySelector('img').src = g.src;
    box.querySelector('img').alt = `${g.title}: ${g.text}`;
    box.querySelector('p').innerHTML = `<strong>${esc(g.title)}</strong> — ${esc(g.text)} <span class="muted" style="color:var(--tan-300)">(Trabajo de cliente)</span>`;
    openDialog(box);
  });

  render('todos');
}
