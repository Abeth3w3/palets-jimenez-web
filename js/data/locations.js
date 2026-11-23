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
    name: 'Numancia de la Sagra (Toledo)',
    tag: 'Oficina y almacén',
    address: 'Avda. de la Industria, 173 A — Polígono Industrial Villa de Azaña',
    postalCode: null, // PENDIENTE de confirmar por la empresa
    town: 'Numancia de la Sagra',
    province: 'Toledo',
    phone: '925 52 17 87',
    mobile: '667 30 94 23',
    mobile2: '600 80 97 44',
    schedule: 'Lunes a viernes', // horas PENDIENTES
    access: 'Salida 40 de la A-42, dirección Yuncos.',
    pickup: 'Almacén cerrado: los palets se conservan a cubierto. Recogida y entregas a convenir con la empresa.',
    mapQuery: '40.087979,-3.860104', // coordenadas del mapa publicado en "Cómo llegar"
    approximate: false,
  },
  // El almacén de Villaverde Alto (Madrid) ya no está operativo (confirmado por la empresa, 23/11/2026).
];
