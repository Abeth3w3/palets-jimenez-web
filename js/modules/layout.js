/**
 * Cabecera y pie de página compartidos por todas las páginas.
 * Para añadir o quitar un apartado del menú, edite NAV: los enlaces se adaptan
 * solos según la página (anclas en el inicio, "index.html#..." en el resto).
 *
 * Cada página indica cuál es en <body data-page="home|catalogo|contacto">.
 */
import { company } from '../data/company.js';
import { locations } from '../data/locations.js';
import { esc } from './utils.js';

export const NAV = [
  { label: 'Inicio', section: 'inicio' },
  { label: 'Empresa', section: 'empresa' },
  { label: 'Procesos', section: 'procesos' },
  { label: 'Palets', section: 'palets' },
  { label: 'Decoración', section: 'decoracion' },
  { label: 'Ubicaciones', section: 'ubicaciones' },
  { label: 'Catálogo', page: 'catalogo', href: 'catalogo.html' },
  { label: 'Contacto', page: 'contacto', href: 'contacto.html', cta: true },
];

const LOGO = '<svg class="brand__mark" viewBox="0 0 40 40" aria-hidden="true"><rect x="2" y="6" width="36" height="5" rx="1"/><rect x="2" y="14" width="36" height="5" rx="1"/><rect x="2" y="22" width="36" height="5" rx="1"/><rect x="4" y="29" width="7" height="6" rx="1"/><rect x="16.5" y="29" width="7" height="6" rx="1"/><rect x="29" y="29" width="7" height="6" rx="1"/></svg>';
const telHref = (n) => `tel:+34${n.replace(/\D/g, '')}`;

export function currentPage() {
  return document.body.dataset.page || 'home';
}

function hrefFor(item, page) {
  if (item.href) return item.href;
  return page === 'home' ? `#${item.section}` : `index.html#${item.section}`;
}

export function renderLayout() {
  const page = currentPage();
  const header = document.querySelector('[data-header]');
  const footer = document.querySelector('[data-footer]');

  if (header) {
    header.innerHTML = `
      <div class="container site-header__inner">
        <a class="brand" href="${page === 'home' ? '#inicio' : 'index.html'}" aria-label="Palets Jiménez, ir al inicio">
          ${LOGO}<span class="brand__text">Palets <strong>Jiménez</strong></span>
        </a>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" data-nav-toggle>
          <span class="nav-toggle__bars" aria-hidden="true"></span>
          <span class="visually-hidden">Abrir menú</span>
        </button>
        <nav id="site-nav" class="site-nav" aria-label="Principal" data-nav>
          <ul>
            ${NAV.map((item) => {
              const active = item.page && item.page === page;
              const cls = [item.cta ? 'site-nav__cta' : '', item.page ? 'site-nav__page' : '', active ? 'is-active' : ''].filter(Boolean).join(' ');
              return `<li><a href="${hrefFor(item, page)}"${cls ? ` class="${cls}"` : ''}${active ? ' aria-current="page"' : ''}>${esc(item.label)}</a></li>`;
            }).join('')}
          </ul>
        </nav>
      </div>`;
  }

  if (footer) {
    footer.innerHTML = `
      <div class="container site-footer__grid">
        <div>
          <a class="brand brand--light" href="${page === 'home' ? '#inicio' : 'index.html'}">${LOGO}<span class="brand__text">Palets <strong>Jiménez</strong></span></a>
          <p>Compra-venta y reciclaje de palets de madera y plástico desde hace más de ${company.yearsExperience} años.</p>
        </div>
        <nav aria-label="Secciones">
          <h2 class="footer-title">Navegación</h2>
          <ul>${NAV.filter((i) => i.section !== 'inicio').map((i) => `<li><a href="${hrefFor(i, page)}">${esc(i.label)}</a></li>`).join('')}</ul>
        </nav>
        <div>
          <h2 class="footer-title">Contacto</h2>
          <ul>
            <li><a href="${telHref(company.phone)}">Tel. ${esc(company.phone)}</a></li>
            <li><a href="${telHref(company.mobile)}">Móvil ${esc(company.mobile)}</a></li>
            <li><a href="mailto:${esc(company.email)}">${esc(company.email)}</a></li>
            <li>${esc(company.schedule.days)}</li>
          </ul>
        </div>
        <div>
          <h2 class="footer-title">Ubicaciones</h2>
          <ul>${locations.map((l) => `<li>${esc(l.town)} (${esc(l.province)})</li>`).join('')}</ul>
        </div>
      </div>
      <div class="container site-footer__bottom">
        <p>© ${new Date().getFullYear()} ${esc(company.name)}</p>
        <ul class="legal-links">
          <li><button type="button" class="link" data-legal="privacidad">Política de privacidad</button></li>
          <li><button type="button" class="link" data-legal="aviso">Aviso legal</button></li>
          <li><button type="button" class="link" data-legal="cookies">Política de cookies</button></li>
        </ul>
      </div>`;
  }
}
