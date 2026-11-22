/**
 * Sección "Tipos de palets": pestañas accesibles (madera / plástico).
 * Medidas, capacidades y estados se CALCULAN a partir de products.js, de modo que
 * siempre coinciden con el catálogo. Usos y ventajas son información general
 * del material y se marcan como orientativos.
 */
import { products, labels } from '../data/products.js';
import { esc, fmtKg } from './utils.js';

const MATERIAL_INFO = {
  madera: {
    title: 'Palets de madera',
    intro: 'Nuestra gama principal: desde el palet europeo homologado 80 × 120 hasta medidas especiales, en distintas gamas de resistencia y estados.',
    material: 'Madera',
    resistance: 'Gamas publicadas: «flojo» (carga ligera), «fuerte», «fuerte de 1ª» y europeo homologado.',
    uses: ['Transporte y almacenaje de mercancía', 'Envíos con palet europeo homologado', 'Medidas especiales para cargas concretas', 'Decoración y mobiliario (tapas, huertos urbanos…)'],
    advantages: ['Reparable y reciclable', 'Opción económica en estado recuperado o seminuevo', 'Gran variedad de medidas', 'Material natural, reutilizable en decoración'],
  },
  plastico: {
    title: 'Palets de plástico',
    intro: 'Palets 80 × 120 de plástico, nuevos y usados, con distintas capacidades de carga.',
    material: 'Plástico',
    resistance: 'Referencias publicadas para cargas de unos 600 kg y de unos 1000 kg.',
    uses: ['Almacenaje y logística', 'Entornos que requieren limpieza frecuente', 'Circuitos de uso repetido'],
    advantages: ['Superficie lavable', 'No absorbe humedad como la madera', 'Peso y medidas homogéneos entre unidades'],
  },
};

function summarize(material) {
  const list = products.filter((p) => p.material === material);
  const loads = list.map((p) => p.loadKg).filter((n) => typeof n === 'number');
  const sizes = [...new Set(list.map((p) => p.sizeLabel))];
  const states = [...new Set(list.map((p) => p.condition).filter(Boolean))].map((c) => labels.condition[c]);
  return {
    count: list.length,
    someWithoutState: list.some((p) => !p.condition),
    load: loads.length ? (Math.min(...loads) === Math.max(...loads) ? `Para unos ${fmtKg(loads[0])}` : `Entre unos ${fmtKg(Math.min(...loads))} y ${fmtKg(Math.max(...loads))}, según referencia`) : null,
    sizes,
    states,
  };
}

function panelHTML(material) {
  const info = MATERIAL_INFO[material];
  const s = summarize(material);
  return `
    <div class="type-panel" role="tabpanel" id="panel-${material}" aria-labelledby="tab-${material}" tabindex="0">
      <div>
        <h3>${esc(info.title)}</h3>
        <p class="muted">${esc(info.intro)}</p>
        <dl class="spec-list">
          <div><dt>Material</dt><dd>${esc(info.material)}</dd></div>
          <div><dt>Resistencia</dt><dd>${esc(info.resistance)}</dd></div>
          <div><dt>Capacidad de carga</dt><dd>${s.load ? esc(s.load) : '<span class="pending">Pendiente de confirmar</span>'}</dd></div>
          <div><dt>Dimensiones</dt><dd>${s.sizes.map(esc).join(' · ')}</dd></div>
          <div><dt>Estados</dt><dd>${s.states.length ? s.states.map(esc).join(', ') : '—'}${s.states.length && s.someWithoutState ? '. Algunas referencias no indican estado.' : ''}</dd></div>
          <div><dt>Peso del palet</dt><dd><span class="pending">Pendiente de confirmar por referencia</span></dd></div>
        </dl>
        <p class="source-note">Carga, medidas y estados extraídos de las ${s.count} referencias publicadas por la empresa.</p>
      </div>
      <div class="type-panel__side">
        <h4>Usos habituales</h4>
        <ul class="check-list">${info.uses.map((u) => `<li>${esc(u)}</li>`).join('')}</ul>
        <h4>Ventajas del material</h4>
        <ul class="check-list">${info.advantages.map((u) => `<li>${esc(u)}</li>`).join('')}</ul>
        <p class="source-note">Usos y ventajas: información general orientativa sobre el material.</p>
        <a class="btn btn--primary" href="catalogo.html?material=${material}">Ver ${s.count} referencias de ${esc(info.material.toLowerCase())}</a>
      </div>
    </div>`;
}

export function initTypes() {
  const tablist = document.querySelector('[data-types-tabs]');
  const panels = document.querySelector('[data-types-panels]');
  const tabs = [...tablist.querySelectorAll('[role="tab"]')];

  tabs.forEach((t) => {
    const n = products.filter((p) => p.material === t.dataset.material).length;
    t.querySelector('[data-count]').textContent = `${n} referencias`;
  });

  const select = (tab, focus = false) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
    });
    panels.innerHTML = panelHTML(tab.dataset.material);
    if (focus) tab.focus();
  };

  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(t));
    t.addEventListener('keydown', (e) => {
      const dir = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
      if (dir) { e.preventDefault(); select(tabs[(i + dir + tabs.length) % tabs.length], true); }
    });
  });

  select(tabs[0]);
}
