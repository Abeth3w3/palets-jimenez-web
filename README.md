# Palets Jiménez: web

Rediseño de paletsjimenez.com en tres páginas:

- **index.html**: página única con scroll y las secciones Inicio, Empresa, Procesos, Palets, Decoración y Ubicaciones.
- **catalogo.html**: catálogo con filtros y fichas de producto.
- **contacto.html**: datos de contacto y formulario.

Cabecera y pie se generan desde `js/modules/layout.js` (un solo sitio para editar el menú). Es HTML, CSS y JavaScript sin dependencias ni paso de compilación, así que funciona en cualquier alojamiento estático (el mismo IONOS actual, Netlify, etc.).

## Ver en local

```powershell
powershell -ExecutionPolicy Bypass -File tools/serve.ps1 -Port 8080
```

Abrir http://localhost:8080. La web usa módulos ES, así que necesita servirse por HTTP: abrir `index.html` con doble clic no basta.

## Estructura

```
index.html                 Inicio con scroll (6 secciones + cierre), SEO y JSON-LD
catalogo.html              Página del catálogo
contacto.html              Página de contacto
css/tokens.css             Paleta, tipografías y espaciados (colores medidos en la web actual)
css/base.css               Reset, estilos base y animaciones de aparición
css/components.css         Botones, campos, chips, estados, modal
css/sections.css           Estilos de cada sección
js/main.js                 Arranque y conexión entre secciones
js/data/                   ← DATOS EDITABLES
  products.js              Catálogo (productos, etiquetas)
  locations.js             Ubicaciones
  gallery.js               Galería de decoración
  company.js               Teléfonos, correo, horario, datos legales, formulario
js/modules/                Lógica de cada sección (nav, catálogo, tipos, galería, ubicaciones, contacto, legal)
assets/img/                Fotos de la web actual (productos/ y decoracion/)
assets/fonts/              Archivo + Fraunces alojadas localmente (no se llama a Google Fonts)
```

## Cómo gestionar el contenido

- **Añadir, editar o quitar un producto:** edite `js/data/products.js`, donde cada producto es un objeto. El catálogo, los filtros con sus recuentos y los resúmenes de "Tipos de palets" se recalculan solos.
  - `price: null` muestra **"Consultar precio"**. Para publicar un precio, escriba un número (`price: 4.5`).
  - `weightKg` es el **peso del propio palet**, y `loadKg` es la **capacidad de carga**. Son datos distintos.
- **Ubicaciones:** edite `js/data/locations.js`. Los campos que valen `null` aparecen como "Pendiente de confirmar".
- **Galería:** edite `js/data/gallery.js`. Con `placeholder: true` se reserva un hueco sin foto.

## Enlaces con parámetros

- `catalogo.html?material=madera`, `?linea=decoracion`, `?carga=mas1000`, `?estado=seminuevo`, `?medida=…`, `?precio=…`, `?orden=…`: abren el catálogo ya filtrado. Al cambiar filtros, la URL se actualiza y se puede compartir.
- `catalogo.html?producto=013`: abre directamente la ficha de un producto.
- `contacto.html?producto=013`: rellena la consulta con ese producto.
- `contacto.html?tipo=Transporte%20y%20entregas`: preselecciona el tipo de consulta (tiene que ser uno de los de `company.js`).

## Formulario de contacto

En `js/data/company.js`, `contactConfig.endpoint`:

- **Vacío (configuración actual):** el formulario valida los datos y abre el programa de correo del visitante con el mensaje ya redactado para paletsjimenez2016@gmail.com. No se envían datos a terceros.
- **Con URL:** se envía un POST en JSON (`name, email, phone, type, message`) a un script propio (por ejemplo, PHP en el hosting) o a un servicio de formularios. En ese caso, revise la política de privacidad para nombrar al encargado del tratamiento.

Medidas incluidas: validación en cliente, campo trampa antispam, tiempo mínimo antes de enviar, casilla de privacidad obligatoria y ningún dato en la URL. **Importante:** la validación del servidor la tiene que hacer el endpoint, y la web tiene que publicarse con HTTPS (la actual va por HTTP).

## Mapas

Google Maps se carga solo cuando el usuario pulsa "Cargar mapa interactivo" (así no se instalan cookies de terceros sin consentimiento). "Cómo llegar" abre Google Maps con el destino ya puesto.

## Datos PENDIENTES que tiene que facilitar la empresa

Todo lo de esta lista aparece en la web marcado en ámbar como "Pendiente":

| Dato | Dónde |
|---|---|
| Año de fundación e hitos con fecha | Sección Historia (`index.html`, línea temporal) |
| Horario con horas concretas | `company.js`, `locations.js` |
| Código postal del almacén de Toledo | `locations.js` |
| Dirección, teléfono y horario del almacén de Villaverde Alto (Madrid) | `locations.js` |
| Precios | `products.js` (`price`) |
| Peso de cada palet | `products.js` (`weightKg`) |
| Carga del palet nuevo 210×120 | `products.js` |
| Estado (nuevo, recuperado o usado) de las referencias que no lo indican | `products.js` (`condition`) |
| Si los palets nuevos se fabrican o se distribuyen | Sección Procesos |
| Detalle de reparación y control de calidad | Sección Procesos |
| Razón social, CIF y domicilio social | `company.js` → textos legales |
| Fotos de estanterías y fotos de mayor resolución (la del hero mide 960 px) | `assets/img/` |

## Origen de la información

Todo el contenido comercial sale de http://www.paletsjimenez.com/ (consultada el 22/11/2026): textos de Inicio, referencias COD de *Palets de Madera* y *Palets de Plástico*, fotos de *Decoración con palets*, contacto y coordenadas de *Cómo llegar*. Los usos y ventajas generales de cada material están marcados en la web como información orientativa.
