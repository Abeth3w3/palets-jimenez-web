/**
 * Datos generales de la empresa.
 * Fuente: http://www.paletsjimenez.com/ (consultada el 22/11/2026).
 * Los valores `null` son datos NO publicados en la web actual: deben facilitarse
 * por la empresa. La interfaz los muestra como "Pendiente de confirmar".
 */
export const company = {
  name: 'Palets Jiménez',
  yearsExperience: 35, // "desde hace más de 35 años"
  phone: '925 52 17 87',
  mobile: '667 30 94 23',
  // WhatsApp: número con prefijo de país, sin espacios ni "+". Mensaje inicial editable.
  whatsapp: {
    number: '34667309423',
    message: 'Hola, quería información sobre palets.',
  },
  email: 'paletsjimenez2016@gmail.com',
  schedule: {
    days: 'Lunes a viernes',
    hours: null, // PENDIENTE: horario concreto (ej. 8:00–14:00 / 15:30–18:30)
  },
  legal: {
    razonSocial: null, // PENDIENTE
    cif: null, // PENDIENTE
    domicilioSocial: null, // PENDIENTE
  },
};

/**
 * Configuración del formulario de contacto.
 * - Si `endpoint` está vacío, el formulario valida los datos y abre el cliente de
 *   correo del usuario con el mensaje ya redactado (no se envía nada a terceros).
 * - Para envío directo, indicar la URL de un servicio de formularios o de un
 *   script propio en el servidor (POST, JSON). Ver README.
 */
export const contactConfig = {
  endpoint: '',
  queryTypes: [
    'Compra de palets',
    'Venta de mis palets (valoración)',
    'Palets de plástico',
    'Decoración y mobiliario',
    'Transporte y entregas',
    'Otra consulta',
  ],
};
