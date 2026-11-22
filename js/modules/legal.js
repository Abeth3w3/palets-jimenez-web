/**
 * Textos legales mostrados en ventana modal (sin salir de la One Page).
 * IMPORTANTE: son plantillas provisionales. Deben revisarse y completarse con los
 * datos fiscales reales (razón social, CIF, domicilio) antes de publicar.
 */
import { company } from '../data/company.js';
import { openDialog, wireDialog, esc } from './utils.js';

const P = (v) => (v ? esc(v) : '<span class="pending-inline">[pendiente]</span>');
const draft = '<p class="pending-banner"><strong>Texto provisional.</strong> Debe ser revisado por la empresa o su asesoría antes de publicar la web.</p>';

const TEXTS = {
  privacidad: () => `
    <h2 id="lm-title">Política de privacidad</h2>${draft}
    <h3>Responsable del tratamiento</h3>
    <p>${esc(company.name)} · Razón social: ${P(company.legal.razonSocial)} · CIF: ${P(company.legal.cif)} · Domicilio: ${P(company.legal.domicilioSocial)} · Correo: ${esc(company.email)} · Tel.: ${esc(company.phone)}.</p>
    <h3>Finalidad</h3>
    <p>Atender las consultas y solicitudes de información o presupuesto enviadas a través del formulario de contacto, por teléfono o por correo electrónico.</p>
    <h3>Legitimación</h3>
    <p>Consentimiento del interesado al enviar el formulario y, en su caso, aplicación de medidas precontractuales.</p>
    <h3>Conservación</h3>
    <p>Los datos se conservarán el tiempo necesario para responder a la consulta y, en su caso, durante la relación comercial y los plazos legales aplicables.</p>
    <h3>Destinatarios</h3>
    <p>No se cederán datos a terceros salvo obligación legal.</p>
    <h3>Derechos</h3>
    <p>Puede ejercer sus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a ${esc(company.email)}, así como reclamar ante la Agencia Española de Protección de Datos (aepd.es).</p>`,
  aviso: () => `
    <h2 id="lm-title">Aviso legal</h2>${draft}
    <h3>Datos identificativos</h3>
    <p>En cumplimiento de la Ley 34/2002 (LSSI-CE): titular ${P(company.legal.razonSocial)}, CIF ${P(company.legal.cif)}, domicilio ${P(company.legal.domicilioSocial)}, correo ${esc(company.email)}, teléfono ${esc(company.phone)}.</p>
    <h3>Condiciones de uso</h3>
    <p>El acceso a esta web atribuye la condición de usuario e implica la aceptación de estas condiciones. Los contenidos tienen carácter informativo; precios, disponibilidad y características deben confirmarse con la empresa.</p>
    <h3>Propiedad intelectual</h3>
    <p>Los textos, imágenes y elementos gráficos de esta web pertenecen a ${esc(company.name)} o se usan con autorización.</p>`,
  cookies: () => `
    <h2 id="lm-title">Política de cookies</h2>${draft}
    <p>Esta web no utiliza cookies propias de análisis ni de publicidad.</p>
    <p>Los mapas de Google Maps solo se cargan si usted pulsa «Cargar mapa interactivo». En ese momento Google puede instalar sus propias cookies, sujetas a su política de privacidad. El botón «Cómo llegar» abre Google Maps en una pestaña nueva.</p>
    <p>Si en el futuro se incorporan herramientas de analítica, se deberá añadir un aviso de consentimiento previo.</p>`,
};

export function initLegal() {
  // Ventana compartida por todas las páginas: se crea aquí para no repetirla en cada HTML
  const modal = document.createElement('dialog');
  modal.className = 'modal modal--legal';
  modal.setAttribute('aria-labelledby', 'lm-title');
  modal.innerHTML = '<div class="modal__inner"><button class="modal__close" type="button" data-close aria-label="Cerrar">×</button><div data-legal-body></div></div>';
  document.body.append(modal);
  const body = modal.querySelector('[data-legal-body]');
  wireDialog(modal);
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-legal]');
    if (!b) return;
    e.preventDefault();
    body.innerHTML = TEXTS[b.dataset.legal]();
    openDialog(modal);
  });
}
