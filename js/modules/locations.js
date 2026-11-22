/**
 * Ubicaciones: tarjetas generadas desde js/data/locations.js.
 * El mapa de Google solo se carga tras el clic del usuario (privacidad / cookies de terceros).
 */
import { locations } from '../data/locations.js';
import { esc, orPending } from './utils.js';

const mapsDir = (q) => `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(q)}`;
const mapsEmbed = (q, zoom) => `https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=${zoom}&hl=es&output=embed`;
const tel = (n) => `<a href="tel:+34${n.replace(/\D/g, '')}">${esc(n)}</a>`;

function cardHTML(l) {
  const phones = [l.phone && tel(l.phone), l.mobile && `${tel(l.mobile)} (móvil)`].filter(Boolean).join('<br>');
  return `
  <article class="loc reveal" aria-labelledby="loc-${esc(l.id)}">
    <div class="loc__map" data-map="${esc(l.mapQuery)}" data-zoom="${l.approximate ? 13 : 15}" data-title="${esc(l.name)}">
      <div class="loc__map-consent">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/></svg>
        <button type="button" class="btn btn--light btn--sm" data-load-map>Cargar mapa interactivo</button>
        <p>Al cargar el mapa se conectará con Google Maps, que puede usar cookies propias.</p>
      </div>
    </div>
    <div class="loc__body">
      <span class="loc__tag">${esc(l.tag)}</span>
      <h3 id="loc-${esc(l.id)}">${esc(l.name)}</h3>
      <dl>
        <div><dt>Dirección</dt><dd>${orPending(l.address)}</dd></div>
        <div><dt>Código postal</dt><dd>${orPending(l.postalCode)}</dd></div>
        <div><dt>Localidad</dt><dd>${esc(l.town)} (${esc(l.province)})</dd></div>
        <div><dt>Teléfono</dt><dd>${phones || orPending(null)}</dd></div>
        <div><dt>Horario</dt><dd>${l.schedule ? `${esc(l.schedule)} <span class="pending-inline">horas pendientes</span>` : orPending(null)}</dd></div>
        ${l.access ? `<div><dt>Acceso</dt><dd>${esc(l.access)}</dd></div>` : ''}
        <div><dt>Recogida y entrega</dt><dd>${esc(l.pickup)}</dd></div>
      </dl>
      ${l.approximate ? '<p class="status status--pending">Mapa aproximado: dirección exacta pendiente de confirmar.</p>' : ''}
      <div class="loc__actions">
        <a class="btn btn--navy" href="${mapsDir(l.mapQuery)}" target="_blank" rel="noopener noreferrer">Cómo llegar<span class="visually-hidden"> a ${esc(l.name)} (abre Google Maps)</span></a>
        ${l.phone ? `<a class="btn btn--outline" href="tel:+34${l.phone.replace(/\D/g, '')}">Llamar</a>` : ''}
      </div>
    </div>
  </article>`;
}

export function initLocations() {
  const root = document.querySelector('[data-locations]');
  root.innerHTML = locations.map(cardHTML).join('');
  root.addEventListener('click', (e) => {
    const b = e.target.closest('[data-load-map]');
    if (!b) return;
    const box = b.closest('[data-map]');
    const iframe = document.createElement('iframe');
    iframe.src = mapsEmbed(box.dataset.map, box.dataset.zoom);
    iframe.title = `Mapa: ${box.dataset.title}`;
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    box.replaceChildren(iframe);
  });
}
