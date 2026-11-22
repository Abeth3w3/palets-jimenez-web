/**
 * Catálogo dinámico: filtros sin recarga, orden, recuento, estado vacío y modal de detalle.
 * Todo se genera a partir de js/data/products.js.
 */
import { products, labels } from '../data/products.js';
import { esc, fmtKg, fmtEUR, orPending, openDialog, wireDialog, PENDING } from './utils.js';

const LOAD_BUCKETS = [
  { value: 'hasta300', label: 'Hasta 300 kg', test: (n) => n !== null && n <= 300 },
  { value: '301-600', label: '301 – 600 kg', test: (n) => n !== null && n > 300 && n <= 600 },
  { value: '601-1000', label: '601 – 1000 kg', test: (n) => n !== null && n > 600 && n <= 1000 },
  { value: 'mas1000', label: 'Más de 1000 kg', test: (n) => n !== null && n > 1000 },
  { value: 'na', label: 'Sin especificar', test: (n) => n === null },
];

const DEFAULTS = { material: 'todos', size: 'todos', load: 'todos', condition: 'todos', line: 'todos', price: 'todos', sort: 'ref' };

const sizeKey = (p) => (p.size ? p.sizeLabel : 'varias');

const FILTERS = {
  material: (p, v) => p.material === v,
  size: (p, v) => sizeKey(p) === v,
  load: (p, v) => LOAD_BUCKETS.find((b) => b.value === v).test(p.loadKg),
  condition: (p, v) => (v === 'na' ? !p.condition : p.condition === v),
  line: (p, v) => p.line === v,
  price: (p, v) => (v === 'con' ? typeof p.price === 'number' : p.price === null),
};

const SORTS = {
  ref: (a, b) => 0, // orden del archivo de datos
  'load-desc': (a, b) => (b.loadKg ?? -1) - (a.loadKg ?? -1),
  'load-asc': (a, b) => (a.loadKg ?? Infinity) - (b.loadKg ?? Infinity),
  'price-asc': (a, b) => (a.price ?? Infinity) - (b.price ?? Infinity),
};

function priceHTML(p) {
  return typeof p.price === 'number'
    ? `<div class="price"><small>Precio</small><strong>${fmtEUR(p.price)}</strong><small>${esc(p.priceUnit || '')}</small></div>`
    : '<div class="price price--ask"><small>Precio</small><strong>Consultar precio</strong></div>';
}

function badgesHTML(p) {
  return [
    `<span class="badge badge--${p.material}">${esc(labels.material[p.material])}</span>`,
    p.condition ? `<span class="badge badge--${p.condition}">${esc(labels.condition[p.condition])}</span>` : '',
    p.line === 'decoracion' ? '<span class="badge badge--deco">Decoración</span>' : '',
  ].join('');
}

function cardHTML(p, i) {
  return `
  <li class="product" style="animation-delay:${Math.min(i, 8) * 40}ms">
    <div class="product__media">
      <img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy" decoding="async" width="900" height="560">
      <div class="product__badges">${badgesHTML(p)}</div>
    </div>
    <div class="product__body">
      <span class="product__ref">Ref. ${esc(p.id)}</span>
      <h3 class="product__name">${esc(p.name)}</h3>
      <dl class="product__specs">
        <div><dt>Material</dt><dd>${esc(labels.material[p.material])}</dd></div>
        <div><dt>Dimensiones</dt><dd>${esc(p.sizeLabel)}</dd></div>
        <div><dt>Peso del palet</dt><dd${p.weightKg == null ? ' class="pending"' : ''}>${p.weightKg == null ? PENDING : fmtKg(p.weightKg)}</dd></div>
        <div class="is-load"><dt>Carga soportada</dt><dd${p.loadKg == null ? ' class="pending"' : ''}>${p.loadKg == null ? 'No indicada' : `≈ ${fmtKg(p.loadKg)}`}</dd></div>
        <div><dt>Estado</dt><dd>${p.condition ? esc(labels.condition[p.condition]) : '<span class="pending">Sin especificar</span>'}</dd></div>
        <div><dt>Línea</dt><dd>${esc(labels.line[p.line])}</dd></div>
      </dl>
      <div class="product__foot">
        ${priceHTML(p)}
        <button type="button" class="btn btn--outline btn--sm" data-product="${esc(p.id)}" aria-label="Ver detalles de ${esc(p.name)}">Ver detalles</button>
      </div>
    </div>
  </li>`;
}

function modalHTML(p) {
  return `
  <button class="modal__close" type="button" data-close aria-label="Cerrar">×</button>
  <div class="pm">
    <div class="pm__media"><img src="${esc(p.image)}" alt="${esc(p.name)}"></div>
    <div>
      <div class="pm__badges">${badgesHTML(p)}</div>
      <span class="product__ref">Ref. ${esc(p.id)}</span>
      <h2 id="pm-title">${esc(p.name)}</h2>
      <dl class="spec-list">
        <div><dt>Material</dt><dd>${esc(labels.material[p.material])}</dd></div>
        <div><dt>Dimensiones</dt><dd>${esc(p.sizeLabel)}</dd></div>
        <div><dt>Peso del palet</dt><dd>${orPending(p.weightKg, fmtKg)} <br><small class="muted">Lo que pesa el propio palet vacío.</small></dd></div>
        <div><dt>Capacidad de carga</dt><dd>${p.loadKg == null ? '<span class="pending">No indicada</span>' : `Para unos ${fmtKg(p.loadKg)}`}<br><small class="muted">Peso de mercancía que soporta (orientativo).</small></dd></div>
        <div><dt>Estado</dt><dd>${p.condition ? esc(labels.condition[p.condition]) : '<span class="pending">Sin especificar</span>'}</dd></div>
        <div><dt>Línea</dt><dd>${esc(labels.line[p.line])}</dd></div>
        ${p.features?.length ? `<div><dt>Características</dt><dd>${p.features.map(esc).join('<br>')}</dd></div>` : ''}
        ${p.notes ? `<div><dt>Observaciones</dt><dd>${esc(p.notes)}</dd></div>` : ''}
      </dl>
      ${priceHTML(p)}
      <div class="pm__actions">
        <a class="btn btn--primary" href="contacto.html?producto=${encodeURIComponent(p.id)}">Solicitar información</a>
        <a class="btn btn--outline" href="tel:+34925521787">Llamar</a>
      </div>
    </div>
  </div>`;
}

/** Parámetros de URL (en español) ↔ campos del formulario de filtros. */
const PARAMS = { material: 'material', size: 'medida', load: 'carga', condition: 'estado', line: 'linea', price: 'precio', sort: 'orden' };

export function initCatalog() {
  const form = document.querySelector('[data-catalog-filters]');
  const grid = document.querySelector('[data-catalog-grid]');
  const empty = document.querySelector('[data-catalog-empty]');
  const count = document.querySelector('[data-catalog-count]');
  const modal = document.querySelector('[data-product-modal]');
  const modalBody = modal.querySelector('[data-product-modal-body]');
  wireDialog(modal);

  // --- Opciones de los selectores, con recuento y desactivadas si no hay datos ---
  const n = (fn) => products.filter(fn).length;
  const opt = (value, label, c) => `<option value="${esc(value)}"${c === 0 ? ' disabled' : ''}>${esc(label)} (${c})</option>`;
  const sizes = [...new Set(products.map(sizeKey))].sort((a, b) => n((p) => sizeKey(p) === b) - n((p) => sizeKey(p) === a));
  const options = {
    size: [`<option value="todos">Todas las medidas</option>`, ...sizes.map((s) => opt(s, s === 'varias' ? 'Medidas varias' : s, n((p) => sizeKey(p) === s)))],
    load: ['<option value="todos">Cualquier carga</option>', ...LOAD_BUCKETS.map((b) => opt(b.value, b.label, n((p) => b.test(p.loadKg))))],
    condition: ['<option value="todos">Cualquier estado</option>',
      ...Object.entries(labels.condition).map(([k, l]) => opt(k, l, n((p) => p.condition === k))),
      opt('na', 'Sin especificar', n((p) => !p.condition))],
    line: ['<option value="todos">Todas</option>', ...Object.entries(labels.line).map(([k, l]) => opt(k, l, n((p) => p.line === k)))],
    price: ['<option value="todos">Todos</option>', opt('con', 'Con precio publicado', n((p) => typeof p.price === 'number')), opt('consultar', 'Consultar precio', n((p) => p.price === null))],
  };
  form.querySelectorAll('[data-options]').forEach((sel) => { sel.innerHTML = options[sel.dataset.options].join(''); });

  const read = () => Object.fromEntries(new FormData(form));

  const render = () => {
    const state = read();
    const list = products
      .filter((p) => Object.entries(FILTERS).every(([k, test]) => state[k] === 'todos' || test(p, state[k])))
      .sort(SORTS[state.sort] || SORTS.ref);
    grid.innerHTML = list.map(cardHTML).join('');
    empty.hidden = list.length > 0;
    grid.hidden = list.length === 0;
    const active = Object.keys(FILTERS).filter((k) => state[k] !== 'todos').length;
    count.textContent = `${list.length} ${list.length === 1 ? 'producto' : 'productos'} de ${products.length}${active ? ` · ${active} ${active === 1 ? 'filtro activo' : 'filtros activos'}` : ''}`;
    const extra = active - (state.material !== 'todos' ? 1 : 0);
    moreBadge.textContent = extra > 0 ? String(extra) : '';
    syncURL(state);
  };

  // Filtros adicionales: desplegados en escritorio, plegados en móvil
  const more = form.querySelector('[data-filters-more]');
  const moreBadge = form.querySelector('[data-filters-active]');
  const wide = matchMedia('(min-width: 760px)');
  const syncMore = () => { if (wide.matches) more.open = true; };
  more.open = wide.matches;
  wide.addEventListener('change', syncMore);

  const set = (values) => {
    const v = { ...DEFAULTS, ...values };
    Object.entries(v).forEach(([k, val]) => {
      const field = form.elements[k];
      if (!field) return;
      if (field instanceof RadioNodeList) {
        const valid = [...field].some((r) => r.value === val);
        [...field].forEach((r) => { r.checked = r.value === (valid ? val : DEFAULTS[k]); });
      } else {
        field.value = val;
        if (field.value !== val) field.value = DEFAULTS[k]; // valor de URL no válido → por defecto
      }
    });
    render();
  };

  form.addEventListener('change', render);
  document.querySelectorAll('[data-catalog-reset]').forEach((b) => b.addEventListener('click', () => set({})));

  // Detalle de producto
  grid.addEventListener('click', (e) => {
    const b = e.target.closest('[data-product]');
    if (!b) return;
    const p = products.find((x) => x.id === b.dataset.product);
    modalBody.innerHTML = modalHTML(p);
    openDialog(modal);
  });
  // Estado inicial desde la URL (p. ej. catalogo.html?material=madera o ?linea=decoracion)
  const params = new URLSearchParams(location.search);
  const initial = {};
  Object.entries(PARAMS).forEach(([field, param]) => { if (params.has(param)) initial[field] = params.get(param); });
  set(initial);
  if (Object.keys(initial).some((k) => k !== 'material' && k !== 'sort')) more.open = true;

  // Enlace directo a la ficha de un producto: catalogo.html?producto=013
  const direct = products.find((x) => x.id === params.get('producto'));
  if (direct) { modalBody.innerHTML = modalHTML(direct); openDialog(modal); }
}

/** Refleja los filtros activos en la URL para poder compartir o volver a una búsqueda. */
function syncURL(state) {
  const params = new URLSearchParams();
  Object.entries(PARAMS).forEach(([field, param]) => {
    if (state[field] && state[field] !== DEFAULTS[field]) params.set(param, state[field]);
  });
  const qs = params.toString();
  history.replaceState(null, '', `${location.pathname}${qs ? `?${qs}` : ''}`);
}
