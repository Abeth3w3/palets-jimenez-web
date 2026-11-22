/**
 * CATÁLOGO DE PRODUCTOS
 * ------------------------------------------------------------------
 * Para añadir un producto, copie un objeto y modifique sus campos.
 * Para eliminarlo, borre su objeto. El catálogo y los filtros se
 * regeneran automáticamente: no hay que tocar HTML ni CSS.
 *
 * Campos:
 *  id          Código único (se usa el código de la web actual: "COD").
 *  name        Nombre comercial.
 *  material    'madera' | 'plastico'
 *  line        'transporte' | 'decoracion'
 *  condition   'nuevo' | 'seminuevo' | 'recuperado' | 'usado' | null (sin especificar)
 *  size        { w, l } en cm, o null si son medidas variables.
 *  sizeLabel   Texto de medidas tal y como lo publica la empresa.
 *  loadKg      Capacidad de carga aproximada en kg ("para unos X kg"), o null.
 *  weightKg    PESO DEL PROPIO PALET en kg, o null. (No es la capacidad de carga.)
 *  price       Precio en euros (número), o null → se muestra "Consultar precio".
 *  priceUnit   Texto de unidad del precio (ej. 'unidad', '+ IVA / unidad').
 *  image       Ruta de la fotografía.
 *  features    Características publicadas (array de textos).
 *  notes       Observaciones.
 *
 * Fuente: páginas "Palets de Madera", "Palets de Plástico" y "Decoración con
 * palets" de paletsjimenez.com. Ningún precio ni peso está publicado: se dejan
 * en null hasta que la empresa los facilite.
 */
export const products = [
  // ---------------------------- MADERA ----------------------------
  {
    id: '210x120',
    name: 'Palet nuevo 210 × 120 cm',
    material: 'madera', line: 'transporte', condition: 'nuevo',
    size: { w: 120, l: 210 }, sizeLabel: '210 × 120 cm',
    loadKg: null, weightKg: null, price: null, priceUnit: 'unidad',
    image: 'assets/img/productos/m-210x120.jpg',
    features: ['Medida especial de gran formato', 'Anunciado como novedad: "Nuevos palets medida de 210×120 cm"'],
    notes: '',
  },
  {
    id: '007',
    name: 'Palet 60 × 80 cm',
    material: 'madera', line: 'transporte', condition: null,
    size: { w: 60, l: 80 }, sizeLabel: '60 × 80 cm',
    loadKg: 300, weightKg: null, price: null, priceUnit: 'unidad',
    image: 'assets/img/productos/m-007.jpg',
    features: ['Formato medio palet'],
    notes: '',
  },
  {
    id: '009',
    name: 'Paletas de medidas varias',
    material: 'madera', line: 'transporte', condition: null,
    size: null, sizeLabel: 'Varias, entre 45 × 70 y 100 × 90 cm',
    loadKg: 300, weightKg: null, price: null, priceUnit: 'unidad',
    image: 'assets/img/productos/m-009.jpg',
    features: ['Surtido de medidas no estándar'],
    notes: 'Consulte disponibilidad de la medida concreta que necesita.',
  },
  {
    id: '011',
    name: 'Palet 100 × 120 flojo abierto',
    material: 'madera', line: 'transporte', condition: null,
    size: { w: 100, l: 120 }, sizeLabel: '100 × 120 cm',
    loadKg: 300, weightKg: null, price: null, priceUnit: 'unidad',
    image: 'assets/img/productos/m-011.jpg',
    features: ['Gama "flojo" (carga ligera)', 'Base abierta'],
    notes: '',
  },
  {
    id: '012',
    name: 'Palet 100 × 120 flojo cerrado',
    material: 'madera', line: 'transporte', condition: null,
    size: { w: 100, l: 120 }, sizeLabel: '100 × 120 cm',
    loadKg: 300, weightKg: null, price: null, priceUnit: 'unidad',
    image: 'assets/img/productos/m-012.jpg',
    features: ['Gama "flojo" (carga ligera)', 'Base cerrada'],
    notes: '',
  },
  {
    id: '013',
    name: 'Europeo homologado reciclado 80 × 120',
    material: 'madera', line: 'transporte', condition: 'recuperado',
    size: { w: 80, l: 120 }, sizeLabel: '80 × 120 cm',
    loadKg: 1000, weightKg: null, price: null, priceUnit: 'unidad',
    image: 'assets/img/productos/m-013.jpg',
    features: ['Palet europeo homologado', 'Reciclado'],
    notes: '',
  },
  {
    id: '016',
    name: 'Europeo homologado seminuevo 80 × 120',
    material: 'madera', line: 'transporte', condition: 'seminuevo',
    size: { w: 80, l: 120 }, sizeLabel: '80 × 120 cm',
    loadKg: 1500, weightKg: null, price: null, priceUnit: 'unidad',
    image: 'assets/img/productos/m-016.jpg',
    features: ['Palet europeo homologado', 'Seminuevo'],
    notes: '',
  },
  {
    id: '017',
    name: 'Palet 80 × 120 fuerte de 1ª',
    material: 'madera', line: 'transporte', condition: null,
    size: { w: 80, l: 120 }, sizeLabel: '80 × 120 cm',
    loadKg: 600, weightKg: null, price: null, priceUnit: 'unidad',
    image: 'assets/img/productos/m-017.jpg',
    features: ['Gama "fuerte" de primera'],
    notes: '',
  },
  {
    id: '019',
    name: 'Palet 80 × 120 fuerte de 1ª seminuevo',
    material: 'madera', line: 'transporte', condition: 'seminuevo',
    size: { w: 80, l: 120 }, sizeLabel: '80 × 120 cm',
    loadKg: 600, weightKg: null, price: null, priceUnit: 'unidad',
    image: 'assets/img/productos/m-019.jpg',
    features: ['Gama "fuerte" de primera', 'Seminuevo'],
    notes: '',
  },
  {
    id: '020',
    name: 'Palet 80 × 120 flojo',
    material: 'madera', line: 'transporte', condition: null,
    size: { w: 80, l: 120 }, sizeLabel: '80 × 120 cm',
    loadKg: 300, weightKg: null, price: null, priceUnit: 'unidad',
    image: 'assets/img/productos/m-020.jpg',
    features: ['Gama "flojo" (carga ligera)'],
    notes: '',
  },
  {
    id: '021',
    name: 'Palet 100 × 120 fuerte abierto',
    material: 'madera', line: 'transporte', condition: null,
    size: { w: 100, l: 120 }, sizeLabel: '100 × 120 cm',
    loadKg: 1000, weightKg: null, price: null, priceUnit: 'unidad',
    image: 'assets/img/productos/m-021.jpg',
    features: ['Gama "fuerte"', 'Base abierta'],
    notes: '',
  },
  {
    id: '022',
    name: 'Palet 100 × 120 fuerte cerrado',
    material: 'madera', line: 'transporte', condition: null,
    size: { w: 100, l: 120 }, sizeLabel: '100 × 120 cm',
    loadKg: 1500, weightKg: null, price: null, priceUnit: 'unidad',
    image: 'assets/img/productos/m-022.jpg',
    features: ['Gama "fuerte"', 'Base cerrada'],
    notes: '',
  },
  {
    id: '024',
    name: 'Palet CP3 115 × 115',
    material: 'madera', line: 'transporte', condition: null,
    size: { w: 115, l: 115 }, sizeLabel: '115 × 115 cm',
    loadKg: 1000, weightKg: null, price: null, priceUnit: 'unidad',
    image: 'assets/img/productos/m-024.jpg',
    features: ['Tipo CP3'],
    notes: '',
  },
  // ------------------------ LÍNEA DECORACIÓN ------------------------
  {
    id: 'DEC-HUERTO',
    name: 'Huerto urbano de palet',
    material: 'madera', line: 'decoracion', condition: null,
    size: { w: 56, l: 80 }, sizeLabel: '80 × 56 × 48 cm',
    loadKg: null, weightKg: null, price: null, priceUnit: 'unidad',
    image: 'assets/img/decoracion/huerto-urbano.jpg',
    features: ['"Hazte tu huerto urbano de 80×56×48 cm"'],
    notes: '',
  },
  {
    id: 'DEC-TAPA',
    name: 'Tapa de palet 80 × 120 tratada',
    material: 'madera', line: 'decoracion', condition: 'seminuevo',
    size: { w: 80, l: 120 }, sizeLabel: '80 × 120 cm',
    loadKg: null, weightKg: null, price: null, priceUnit: 'unidad',
    image: 'assets/img/decoracion/tapa-80x120.png',
    features: ['Seminueva', 'Tratada', 'Especial para cabeceros, zapateros, recibidores, etc.'],
    notes: '',
  },
  // ---------------------------- PLÁSTICO ----------------------------
  {
    id: '001',
    name: 'Palet de plástico nuevo 80 × 120 (1000 kg)',
    material: 'plastico', line: 'transporte', condition: 'nuevo',
    size: { w: 80, l: 120 }, sizeLabel: '80 × 120 cm',
    loadKg: 1000, weightKg: null, price: null, priceUnit: 'unidad',
    image: 'assets/img/productos/p-001.jpg',
    features: ['Plástico', 'Nuevo'],
    notes: '',
  },
  {
    id: '002',
    name: 'Palet de plástico nuevo 80 × 120 (600 kg)',
    material: 'plastico', line: 'transporte', condition: 'nuevo',
    size: { w: 80, l: 120 }, sizeLabel: '80 × 120 cm',
    loadKg: 600, weightKg: null, price: null, priceUnit: 'unidad',
    image: 'assets/img/productos/p-002.jpg',
    features: ['Plástico', 'Nuevo'],
    notes: '',
  },
  {
    id: '003',
    name: 'Palet de plástico usado 80 × 120',
    material: 'plastico', line: 'transporte', condition: 'usado',
    size: { w: 80, l: 120 }, sizeLabel: '80 × 120 cm',
    loadKg: 600, weightKg: null, price: null, priceUnit: 'unidad',
    image: 'assets/img/productos/p-003.jpg',
    features: ['Plástico', 'Usado'],
    notes: '',
  },
];

/** Etiquetas legibles. Añada aquí nuevos valores si amplía el catálogo. */
export const labels = {
  material: { madera: 'Madera', plastico: 'Plástico' },
  line: { transporte: 'Transporte y almacenaje', decoracion: 'Decoración' },
  condition: { nuevo: 'Nuevo', seminuevo: 'Seminuevo', recuperado: 'Recuperado', usado: 'Usado' },
};
