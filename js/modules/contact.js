/**
 * Formulario de contacto: validación accesible, antispam (honeypot + tiempo mínimo)
 * y envío a un endpoint configurable o, si no hay, apertura del cliente de correo.
 */
import { company, contactConfig } from '../data/company.js';
import { products } from '../data/products.js';
import { esc } from './utils.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\d\s.-]{9,20}$/;

const RULES = {
  name: (v) => (v.trim().length < 2 ? 'Indique su nombre (mínimo 2 caracteres).' : ''),
  email: (v) => (!v.trim() ? 'Indique su correo electrónico.' : !EMAIL_RE.test(v.trim()) ? 'El correo no tiene un formato válido (ej. nombre@empresa.es).' : ''),
  phone: (v) => (v.trim() && !PHONE_RE.test(v.trim()) ? 'El teléfono no es válido. Use solo números, espacios y el prefijo +.' : ''),
  type: (v) => (!v ? 'Seleccione el tipo de consulta.' : ''),
  message: (v) => (v.trim().length < 10 ? 'Escriba un mensaje de al menos 10 caracteres.' : ''),
  privacy: (_, el) => (!el.checked ? 'Debe aceptar la política de privacidad.' : ''),
};

export function initContact() {
  const form = document.querySelector('[data-contact-form]');
  const status = form.querySelector('[data-form-status]');
  const submit = form.querySelector('button[type="submit"]');
  const msg = form.elements.message;
  const counter = form.querySelector('#cf-msg-count');
  const startedAt = Date.now();

  form.elements.type.innerHTML = ['<option value="">Seleccione una opción…</option>',
    ...contactConfig.queryTypes.map((t) => `<option>${t}</option>`)].join('');

  const updateCounter = () => { counter.textContent = `${msg.value.length} / ${msg.maxLength}`; };
  msg.addEventListener('input', updateCounter);
  updateCounter();

  const validateField = (name) => {
    const el = form.elements[name];
    const error = RULES[name](el.value ?? '', el);
    const out = form.querySelector(`#cf-${name === 'message' ? 'msg' : name}-err`);
    el.setAttribute('aria-invalid', error ? 'true' : 'false');
    if (out) out.textContent = error;
    return !error;
  };

  // Validación al salir de cada campo y en vivo cuando ya hay un error mostrado
  Object.keys(RULES).forEach((name) => {
    const el = form.elements[name];
    el.addEventListener('blur', () => { if (el.value || el.type === 'checkbox') validateField(name); });
    el.addEventListener('input', () => { if (el.getAttribute('aria-invalid') === 'true') validateField(name); });
    el.addEventListener('change', () => { if (el.getAttribute('aria-invalid') === 'true') validateField(name); });
  });

  const show = (text, kind) => {
    status.className = `form-status ${kind === 'ok' ? 'is-ok' : 'is-error'}`;
    status.textContent = text;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = '';
    const results = Object.keys(RULES).map((name) => [name, validateField(name)]);
    const firstBad = results.find(([, ok]) => !ok);
    if (firstBad) {
      show('Revise los campos marcados en rojo.', 'error');
      form.elements[firstBad[0]].focus();
      return;
    }
    // Antispam: campo trampa relleno o envío demasiado rápido → se descarta en silencio
    if (form.elements.website.value || Date.now() - startedAt < 2500) {
      show('Gracias. Hemos recibido su consulta.', 'ok');
      form.reset(); updateCounter();
      return;
    }

    const data = {
      name: form.elements.name.value.trim(),
      email: form.elements.email.value.trim(),
      phone: form.elements.phone.value.trim(),
      type: form.elements.type.value,
      message: form.elements.message.value.trim(),
    };

    submit.disabled = true;
    submit.textContent = 'Enviando…';
    try {
      if (contactConfig.endpoint) {
        const res = await fetch(contactConfig.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        show('¡Gracias! Hemos recibido su consulta y le responderemos lo antes posible.', 'ok');
      } else {
        // Sin servidor configurado: se prepara el correo en el cliente del usuario.
        const body = `Nombre: ${data.name}\nCorreo: ${data.email}\nTeléfono: ${data.phone || '-'}\nTipo de consulta: ${data.type}\n\n${data.message}`;
        window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(`[Web] ${data.type} — ${data.name}`)}&body=${encodeURIComponent(body)}`;
        show('Hemos preparado su mensaje en su programa de correo: solo tiene que pulsar «Enviar». Si no se abre, escríbanos a ' + company.email + ' o llámenos al ' + company.phone + '.', 'ok');
      }
      form.reset(); updateCounter();
      form.querySelectorAll('[aria-invalid]').forEach((el) => el.removeAttribute('aria-invalid'));
    } catch {
      show(`No se ha podido enviar la consulta. Inténtelo de nuevo o llámenos al ${company.phone}.`, 'error');
    } finally {
      submit.disabled = false;
      submit.textContent = 'Enviar consulta';
      status.focus({ preventScroll: true });
    }
  });

  // Rellenado desde otras páginas mediante la URL:
  //   contacto.html?producto=013           → consulta sobre ese producto del catálogo
  //   contacto.html?tipo=Transporte y entregas → tipo de consulta preseleccionado
  const params = new URLSearchParams(location.search);
  const product = products.find((p) => p.id === params.get('producto'));
  const type = params.get('tipo');
  if (product) {
    form.elements.type.value = product.line === 'decoracion' ? 'Decoración y mobiliario'
      : product.material === 'plastico' ? 'Palets de plástico' : 'Compra de palets';
    msg.value = `Hola, me interesa el producto «${product.name}» (Ref. ${product.id}). ¿Podrían indicarme precio y disponibilidad?\nCantidad aproximada: \nLugar de entrega: `;
    updateCounter();
    form.querySelector('[data-form-context]').innerHTML =
      `Consulta sobre: <strong>${esc(product.name)}</strong> (Ref. ${esc(product.id)}) · <a href="catalogo.html?producto=${encodeURIComponent(product.id)}">ver ficha</a>`;
  } else if (type && contactConfig.queryTypes.includes(type)) {
    form.elements.type.value = type;
  }

  // Botones de WhatsApp: el mensaje inicial menciona el producto o el tipo de consulta si vienen en la URL
  const waText = product
    ? `Hola, me interesa el producto «${product.name}» (Ref. ${product.id}). ¿Podrían indicarme precio y disponibilidad?`
    : type && contactConfig.queryTypes.includes(type)
      ? `Hola, quería información sobre: ${type}.`
      : company.whatsapp.message;
  document.querySelectorAll('[data-whatsapp]').forEach((a) => {
    a.href = `https://wa.me/${company.whatsapp.number}?text=${encodeURIComponent(waText)}`;
  });
}
