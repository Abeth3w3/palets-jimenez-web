/** Utilidades compartidas. */

/** Escapa texto para insertarlo de forma segura en HTML. */
export function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

export const PENDING = 'Pendiente de confirmar';

/** Devuelve el valor o un marcador "Pendiente de confirmar" con estilo. */
export function orPending(value, format = (v) => esc(v)) {
  return value === null || value === undefined || value === ''
    ? `<span class="pending">${PENDING}</span>`
    : format(value);
}

export const fmtKg = (n) => `${new Intl.NumberFormat('es-ES').format(n)} kg`;
export const fmtEUR = (n) => new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(n);

/** Abre un <dialog> modal bloqueando el scroll del fondo y devolviendo el foco al cerrar. */
export function openDialog(dialog) {
  const opener = document.activeElement;
  dialog.showModal();
  document.body.classList.add('modal-open');
  const onClose = () => {
    document.body.classList.remove('modal-open');
    if (opener && opener.isConnected && typeof opener.focus === 'function') opener.focus({ preventScroll: true });
  };
  // Registrado antes que cualquier otro oyente 'close' añadido después, para liberar el scroll primero
  dialog.addEventListener('close', onClose, { once: true });
}

/** Cierre al pulsar fuera del contenido o en cualquier [data-close]. */
export function wireDialog(dialog) {
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog || e.target.closest('[data-close]')) dialog.close();
  });
}

/** Lleva a una sección respetando la preferencia de movimiento reducido. */
export function goTo(hash) {
  const target = document.querySelector(hash);
  if (!target) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  history.replaceState(null, '', hash);
}
