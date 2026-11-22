/**
 * UBICACIONES
 * Añada o edite objetos para gestionar las ubicaciones; la sección se genera sola.
 * Los campos `null` se muestran como "Pendiente de confirmar".
 *
 * mapQuery: texto o "lat,lng" que se usa para el mapa y para "Cómo llegar".
 * approximate: true si la ubicación del mapa es solo una zona aproximada.
 *
 * Fuente: paletsjimenez.com (página de inicio, bloque de contacto y "Cómo llegar").
 */
export const locations = [
  {
    id: 'toledo',
    name: 'Almacén de Toledo — Numancia de la Sagra',
    tag: 'Oficina y almacén',
    address: 'Avda. de la Industria, 173 A — Polígono Industrial Villa de Azaña',
    postalCode: null, // PENDIENTE de confirmar por la empresa
    town: 'Numancia de la Sagra',
    province: 'Toledo',
    phone: '925 52 17 87',
    mobile: '667 30 94 23',
    schedule: 'Lunes a viernes', // horas PENDIENTES
    access: 'Salida 40 de la A-42, dirección Yuncos.',
    pickup: 'Almacén cerrado: los palets se conservan a cubierto. Recogida y entregas a convenir con la empresa.',
    mapQuery: '40.087979,-3.860104', // coordenadas del mapa publicado en "Cómo llegar"
    approximate: false,
  },
  {
    id: 'madrid',
    name: 'Almacén de Madrid — Villaverde Alto',
    tag: 'Almacén',
    address: null, // PENDIENTE: la web actual solo indica "polígono industrial de Villaverde Alto"
    postalCode: null,
    town: 'Villaverde Alto',
    province: 'Madrid',
    phone: null,
    mobile: null,
    schedule: null,
    access: null,
    pickup: 'Almacén cerrado: los palets se conservan a cubierto. Condiciones de recogida pendientes de confirmar.',
    mapQuery: 'Polígono Industrial Villaverde Alto, Madrid',
    approximate: true,
  },
];
