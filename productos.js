/* =========================================================
   THYME — CARTA DE PRODUCTOS A DOMICILIO
   ---------------------------------------------------------
   Aquí se edita TODO lo que aparece en "Pedir a domicilio".
   Campos de cada producto:
     nombre      Nombre visible
     cat         salados | tablas | dulces | cajas | servicios
     formato     Unidades o tamaño ("12 unidades", "Para 2 personas")
     raciones    Personas que alimenta (número) — sirve para el precio por persona
     precio      Euros (ej. 38.5) · null = "Consultar precio"
     provisional true = PRECIO DE EJEMPLO → cámbialo por el real y pon false
     foto        Nombre de la foto en assets/img (sin .jpg/.webp) · null = sin foto
     resumen     Una línea para la tarjeta
     historia    Párrafos del texto largo de la ficha
     ingredientes Lista de ingredientes
     alergenos   De los 14 oficiales: gluten, crustaceos, huevo, pescado, cacahuete,
                 soja, lacteos, frutos-secos, apio, mostaza, sesamo, sulfitos,
                 altramuces, moluscos   ⚠️ REVISAR CON VUESTRAS RECETAS REALES
     servir      Cómo servir y conservar
     marida      Con qué acompañarlo
     veg         true si es vegetariano
     etiqueta    Sello destacado opcional
   ========================================================= */
var PRODUCTOS = [

  /* ===================== TABLAS ===================== */
  {
    id: 'tabla-mixta', cat: 'tablas', nombre: 'Tabla Mixta THYME', formato: 'Para 2 personas', raciones: 2,
    precio: 42, foto: 'tabla-mixta-card', etiqueta: 'La más pedida',
    resumen: 'Embutido, queso, encurtidos y frutos: la firma de la casa.',
    historia: [
      'Si solo pudiéramos llevar una tabla a tu casa, sería esta. Es la que montamos para nosotros cuando nos juntamos: rosetones de embutido pinchados para picar sin cubiertos, un brie que se funde a temperatura ambiente, encurtidos caseros que limpian el paladar y un hilo de miel que aparece justo cuando hace falta.',
      'La montamos a mano el mismo día de la entrega, pieza a pieza, para que llegue como sale de nuestra cocina: lista para poner en el centro de la mesa y empezar.'
    ],
    ingredientes: ['Salami y chorizo curado en rosetón', 'Jamón curado', 'Queso brie', 'Queso curado de oveja', 'Encurtidos caseros', 'Aceitunas', 'Miel de flores', 'Mermelada casera', 'Picos y crackers'],
    alergenos: ['lacteos', 'gluten', 'sulfitos'],
    servir: 'Sácala de la nevera 20 minutos antes para que los quesos cojan temperatura. Consumir en el día.',
    marida: 'Un tinto joven o un cava brut.'
  },
  {
    id: 'tabla-iberica', cat: 'tablas', nombre: 'Tabla Ibérica', formato: 'Para 2 personas', raciones: 2,
    precio: 38, foto: null, etiqueta: 'Favorita de la casa',
    resumen: 'Jamón 100% ibérico de bellota cortado a cuchillo y embutidos de bellota.',
    historia: [
      'El jamón no se corta: se lonchea. Lo hacemos a cuchillo, fino y con su punto de grasa, porque es ahí donde está el sabor de la bellota. Lo acompañamos de lomo, chorizo y salchichón ibéricos, de los que se deshacen al contacto con el paladar.',
      'Una tabla sin artificios para quien sabe lo que busca. Viaja protegida para que el corte llegue intacto.'
    ],
    ingredientes: ['Jamón 100% ibérico de bellota cortado a cuchillo', 'Lomo ibérico de bellota', 'Chorizo ibérico de bellota', 'Salchichón ibérico de bellota', 'Picos de pan'],
    alergenos: ['gluten', 'lacteos'],
    servir: 'Deja la tabla tapada a temperatura ambiente 15–20 minutos antes de servir: el jamón gana brillo y aroma.',
    marida: 'Fino o manzanilla bien fríos, o un tinto de crianza.'
  },
  {
    id: 'tabla-quesos', cat: 'tablas', nombre: 'Tabla de Quesos', formato: 'Para 2 personas', raciones: 2,
    precio: 32, foto: null, veg: true,
    resumen: 'Quesos artesanos, crackers, mermelada casera y frutos secos tostados.',
    historia: [
      'Una selección que va de lo suave a lo intenso, pensada para recorrerla en orden: un queso tierno para empezar, uno curado de oveja, uno con carácter y un azul para los valientes.',
      'La completamos con crackers, frutos secos recién tostados y una mermelada casera que equilibra cada bocado.'
    ],
    ingredientes: ['Selección de 4 quesos artesanos', 'Crackers', 'Frutos secos tostados', 'Mermelada casera', 'Uva y fruta de temporada'],
    alergenos: ['lacteos', 'gluten', 'frutos-secos'],
    servir: 'Sácala 30 minutos antes. Empieza por el queso más suave y termina con el azul.',
    marida: 'Blanco con cuerpo o un tinto suave.'
  },
  {
    id: 'tabla-gourmet', cat: 'tablas', nombre: 'Tabla selección gourmet de ibéricos', formato: 'Para 4 personas', raciones: 4,
    precio: 68, provisional: true, foto: null,
    resumen: 'Nuestra selección premium de ibéricos de bellota, para compartir.',
    historia: [
      'La versión generosa de nuestra tabla ibérica: más variedad, más cantidad y las piezas que reservamos para las ocasiones que se lo merecen.',
      'Perfecta como centro de una cena en casa o como punto fuerte de un cóctel.'
    ],
    ingredientes: ['Jamón ibérico de bellota', 'Lomo ibérico', 'Chorizo y salchichón ibéricos', 'Queso curado', 'Picos y regañás'],
    alergenos: ['gluten', 'lacteos'],
    servir: 'A temperatura ambiente, 15–20 minutos antes de servir.',
    marida: 'Cava brut nature o tinto de crianza.'
  },
  {
    id: 'tabla-mediterranea', cat: 'tablas', nombre: 'Tabla Mediterránea', formato: 'Para 4 personas', raciones: 4,
    precio: 58, provisional: true, foto: 'card-mediterranea',
    resumen: 'Pan artesano del día, jamón, quesos, higos y fruta fresca.',
    historia: [
      'Es la tabla que mejor nos explica: producto de mercado, pan horneado esa misma mañana y un aceite de oliva que se nota desde el primer bocado.',
      'Jamón, quesos, higos y fruta de temporada, montados como una sobremesa de domingo que no quieres que termine.'
    ],
    ingredientes: ['Pan artesano del día', 'Jamón curado', 'Quesos variados', 'Higos', 'Fruta de temporada', 'Aceite de oliva virgen extra', 'Frutos secos'],
    alergenos: ['gluten', 'lacteos', 'frutos-secos'],
    servir: 'Consumir en el día. El pan, mejor ligeramente tostado.',
    marida: 'Un rosado o un blanco mediterráneo.'
  },
  {
    id: 'tabla-dulce', cat: 'tablas', nombre: 'Tabla Dulce', formato: 'Para 2 personas', raciones: 2,
    precio: 26, foto: null, veg: true,
    resumen: 'Quesos azules, miel, higos, chocolate negro y frutos rojos.',
    historia: [
      'Para cerrar la noche. El contraste de un queso azul con miel de flores, higos, chocolate negro y frutos rojos es de esos que se recuerdan.',
      'Funciona igual de bien como postre que como final de una tabla salada.'
    ],
    ingredientes: ['Queso azul', 'Miel de flores', 'Higos', 'Chocolate negro', 'Frutos rojos', 'Frutos secos'],
    alergenos: ['lacteos', 'frutos-secos'],
    servir: 'Sacar 20 minutos antes. Guardar en frío hasta entonces.',
    marida: 'Un vino dulce o un moscatel.'
  },
  {
    id: 'tabla-vegetal', cat: 'tablas', nombre: 'Tabla Vegetal', formato: 'Para 2 personas', raciones: 2,
    precio: 28, foto: null, veg: true, etiqueta: 'Sin lácteos disponible',
    resumen: 'Hummus casero, encurtidos, vegetales de temporada y quesos veganos.',
    historia: [
      'Una tabla para que nadie se quede mirando. Hummus casero, vegetales crujientes de temporada, encurtidos y quesos veganos, con el mismo cuidado que ponemos en las demás.',
      'Si la necesitas sin lácteos, indícalo al pedir y la adaptamos.'
    ],
    ingredientes: ['Hummus casero', 'Crudités de temporada', 'Encurtidos', 'Quesos veganos', 'Aceitunas', 'Pan de pita o crackers'],
    alergenos: ['sesamo', 'gluten'],
    servir: 'Mantener en frío hasta el momento de servir.',
    marida: 'Un blanco fresco o un vermut.'
  },
  {
    id: 'torre', cat: 'tablas', nombre: 'Torre THYME de 3 pisos', formato: 'De 15 a 30 personas', raciones: 20,
    precio: null, foto: 'card-torre', etiqueta: 'Pieza central',
    resumen: 'Tres niveles de embutidos, quesos y fruta: la pieza central de tu celebración.',
    historia: [
      'Cuando ya no cabe ni un plato más en la mesa, se construye hacia arriba. Tres pisos con jamón cortado a cuchillo, quesos curados, fruta de temporada y algo salado en cada nivel.',
      'Pensada para grupos de 15 a 30 personas. Cuéntanos cuántos sois y la ajustamos.'
    ],
    ingredientes: ['Jamón curado', 'Embutidos variados', 'Quesos curados y tiernos', 'Fruta de temporada', 'Crackers y picos', 'Frutos secos'],
    alergenos: ['gluten', 'lacteos', 'frutos-secos'],
    servir: 'Te la entregamos montada. Colócala en una superficie estable y lejos del sol.',
    marida: 'Cava para brindar.'
  },
  {
    id: 'tablas-individuales', cat: 'tablas', nombre: 'Tablas individuales con flores', formato: 'Por invitado', raciones: 1,
    precio: null, foto: 'card-mesa-flores',
    resumen: 'Una tabla por invitado, con flores comestibles de temporada.',
    historia: [
      'Para bodas, comuniones y eventos donde cada invitado merece su propio momento. Cada tabla se monta a mano con quesos madurados, embutido cortado fino y flores comestibles que cambian según la época del año.',
      'Es el detalle del que tus invitados seguirán hablando días después.'
    ],
    ingredientes: ['Quesos madurados', 'Embutido cortado fino', 'Fruta de temporada', 'Flores comestibles', 'Crackers'],
    alergenos: ['lacteos', 'gluten'],
    servir: 'Mantener en fresco hasta servir.',
    marida: 'Cava o vino blanco.'
  },

  /* ===================== SALADOS ===================== */
  {
    id: 'mini-burgers', cat: 'salados', nombre: 'Mini burgers gourmet', formato: '12 unidades', raciones: 6,
    precio: 36, provisional: true, foto: 'mini-burgers',
    resumen: 'Pan brioche, ternera, queso curado y cebolla caramelizada.',
    historia: [
      'Dos bocados de hamburguesa de verdad. Carne de ternera jugosa, queso curado fundido y cebolla caramelizada a fuego lento, en un pan brioche tierno que aguanta sin deshacerse.',
      'Son las primeras en desaparecer de cualquier cóctel.'
    ],
    ingredientes: ['Pan brioche', 'Carne de ternera', 'Queso curado', 'Cebolla caramelizada', 'Salsa de la casa'],
    alergenos: ['gluten', 'lacteos', 'huevo', 'mostaza', 'sesamo'],
    servir: 'Calentar 5 minutos en horno a 160 °C. Conservar en nevera y consumir en 24 h.',
    marida: 'Cerveza artesana o un tinto joven.'
  },
  {
    id: 'croquetas', cat: 'salados', nombre: 'Surtido de croquetas caseras', formato: '24 unidades', raciones: 8,
    precio: 30, provisional: true, foto: null,
    resumen: 'Cremosas por dentro, crujientes por fuera. Receta de siempre.',
    historia: [
      'Bechamel hecha a fuego lento, rebozado fino y fritura en el punto justo. Así de sencillo y así de difícil.',
      'Un surtido de nuestros sabores de temporada para que haya para todos los gustos.'
    ],
    ingredientes: ['Bechamel casera', 'Jamón ibérico', 'Pollo asado', 'Setas de temporada', 'Pan rallado', 'Huevo'],
    alergenos: ['gluten', 'lacteos', 'huevo'],
    servir: 'Calentar 6–8 minutos en horno a 180 °C para que recuperen el crujiente.',
    marida: 'Vermut o cerveza bien fría.'
  },
  {
    id: 'pulgas-jamon', cat: 'salados', nombre: 'Mini pulgas de jamón', formato: '12 unidades', raciones: 6,
    precio: 32, provisional: true, foto: null,
    resumen: 'Pan de cristal, tomate y jamón curado cortado fino.',
    historia: [
      'El clásico que nunca falla: pan crujiente, tomate restregado, un hilo de aceite y jamón cortado fino.',
      'Formato de un bocado, para picar de pie sin mancharse.'
    ],
    ingredientes: ['Pan de cristal', 'Tomate', 'Aceite de oliva virgen extra', 'Jamón curado'],
    alergenos: ['gluten'],
    servir: 'Listo para servir. Mejor consumir en el día.',
    marida: 'Cava o un tinto joven.'
  },
  {
    id: 'pulgas-queso', cat: 'salados', nombre: 'Mini pulgas de queso', formato: '12 unidades', raciones: 6,
    precio: 28, provisional: true, foto: null, veg: true,
    resumen: 'Queso curado de oveja, aceite de oliva y un toque de membrillo.',
    historia: [
      'Queso curado de oveja con su punto de membrillo, sobre un pan crujiente.',
      'La versión vegetariana de nuestras pulgas, igual de adictiva.'
    ],
    ingredientes: ['Pan', 'Queso curado de oveja', 'Membrillo', 'Aceite de oliva virgen extra'],
    alergenos: ['gluten', 'lacteos'],
    servir: 'Listo para servir. Consumir en el día.',
    marida: 'Un blanco con cuerpo.'
  },

  /* ===================== DULCES ===================== */
  {
    id: 'donuts', cat: 'dulces', nombre: 'Mini donuts de chocolate', formato: '12 unidades', raciones: 6,
    precio: 18, provisional: true, foto: 'donuts', veg: true,
    resumen: 'Esponjosos y bañados en chocolate.',
    historia: ['Masa esponjosa y un baño de chocolate que cruje al morder. Los favoritos de las pausas de media mañana.'],
    ingredientes: ['Harina de trigo', 'Huevo', 'Leche', 'Mantequilla', 'Chocolate'],
    alergenos: ['gluten', 'huevo', 'lacteos', 'soja'],
    servir: 'Temperatura ambiente. Consumir en 24 h.', marida: 'Café o chocolate caliente.'
  },
  {
    id: 'napolitanas', cat: 'dulces', nombre: 'Mini napolitanas', formato: '12 unidades', raciones: 6,
    precio: 18, provisional: true, foto: null, veg: true,
    resumen: 'Hojaldre de mantequilla relleno de chocolate.',
    historia: ['Hojaldre de mantequilla con capas que se deshacen y un corazón de chocolate. Horneadas el mismo día.'],
    ingredientes: ['Hojaldre de mantequilla', 'Chocolate', 'Huevo'],
    alergenos: ['gluten', 'lacteos', 'huevo', 'soja'],
    servir: '3 minutos en horno a 160 °C y parecerán recién hechas.', marida: 'Café con leche.'
  },
  {
    id: 'gofres', cat: 'dulces', nombre: 'Mini gofres con Nutella', formato: '12 unidades', raciones: 6,
    precio: 20, provisional: true, foto: 'gofres', veg: true,
    resumen: 'Gofre recién hecho con crema de avellanas y fruta.',
    historia: ['Gofre dorado, crema de avellanas y fruta fresca por encima. Un capricho en dos bocados.'],
    ingredientes: ['Masa de gofre', 'Crema de cacao y avellanas', 'Fruta fresca'],
    alergenos: ['gluten', 'lacteos', 'huevo', 'frutos-secos', 'soja'],
    servir: 'Temperatura ambiente. Consumir en el día.', marida: 'Café o zumo natural.'
  },
  {
    id: 'croissants', cat: 'dulces', nombre: 'Mini croissants', formato: '12 unidades', raciones: 6,
    precio: 16, provisional: true, foto: 'croissants', veg: true,
    resumen: 'De mantequilla, dorados y crujientes.',
    historia: ['Croissants de mantequilla en formato mini: crujientes por fuera, tiernos por dentro.'],
    ingredientes: ['Harina de trigo', 'Mantequilla', 'Huevo', 'Azúcar'],
    alergenos: ['gluten', 'lacteos', 'huevo'],
    servir: '3 minutos en horno a 160 °C.', marida: 'Café o zumo natural.'
  },
  {
    id: 'magdalenas', cat: 'dulces', nombre: 'Mini magdalenas', formato: '12 unidades', raciones: 6,
    precio: 14, provisional: true, foto: null, veg: true,
    resumen: 'Receta casera con un toque de limón.',
    historia: ['Las de toda la vida, con su copete y un aroma a limón que llena la sala.'],
    ingredientes: ['Harina de trigo', 'Huevo', 'Aceite de oliva', 'Azúcar', 'Limón'],
    alergenos: ['gluten', 'huevo', 'lacteos'],
    servir: 'Temperatura ambiente. Consumir en 48 h.', marida: 'Café o leche.'
  },

  /* ===================== CAJAS ===================== */
  {
    id: 'coffee-break-box', cat: 'cajas', nombre: 'Coffee Break Box', formato: 'Según asistentes', raciones: 10,
    precio: null, foto: null, etiqueta: 'Para jornadas y reuniones',
    resumen: 'Dulce y salado para pausas, formaciones y reuniones.',
    historia: [
      'Todo lo necesario para una pausa que se note: bollería mini recién horneada y pulgas saladas para quien prefiere algo salado.',
      'Dinos cuántos asistentes sois y la dimensionamos para que no sobre ni falte.'
    ],
    ingredientes: ['Mini donuts de chocolate', 'Mini napolitanas', 'Mini gofres con Nutella', 'Mini croissants', 'Mini magdalenas', 'Mini pulgas de queso', 'Mini pulgas de jamón'],
    alergenos: ['gluten', 'lacteos', 'huevo', 'frutos-secos', 'soja'],
    servir: 'Se entrega lista para servir.', marida: 'Café, zumos y agua.'
  },
  {
    id: 'cocktail-box', cat: 'cajas', nombre: 'Cocktail Box', formato: 'Según asistentes', raciones: 10,
    precio: null, foto: null, etiqueta: 'Para cócteles y eventos',
    resumen: 'Picoteo y tablas para eventos de pie.',
    historia: [
      'Pensada para eventos con formato cóctel: piezas para picar de pie combinadas con tablas para compartir.',
      'Puedes sumar servicios en directo (bartender, cortador de jamón o show cooking) para darle espectáculo.'
    ],
    ingredientes: ['Mini burgers', 'Tabla de quesos variados con crackers y frutos secos', 'Tabla mixta de quesos y embutidos', 'Tabla selección gourmet de ibéricos', 'Surtido de croquetas caseras'],
    alergenos: ['gluten', 'lacteos', 'huevo', 'frutos-secos', 'mostaza', 'sesamo'],
    servir: 'Se entrega lista para servir. Las croquetas y burgers, mejor calentadas.', marida: 'Cava, vino y cerveza.'
  },

  /* ===================== SERVICIOS ===================== */
  {
    id: 'maridaje', cat: 'servicios', nombre: 'Maridaje de vinos', formato: 'Por persona', raciones: 1,
    precio: 18, foto: null,
    resumen: 'Tres copas seleccionadas para acompañar tus tablas.',
    historia: ['Tres vinos elegidos para acompañar lo que pidas. Todas nuestras tablas se pueden acompañar con cava o vino.'],
    ingredientes: ['3 vinos seleccionados'], alergenos: ['sulfitos'],
    servir: 'Blancos y cava, entre 6 y 8 °C. Tintos, a 16 °C.', marida: '—'
  },
  {
    id: 'barra-bartender', cat: 'servicios', nombre: 'Barra de bebidas con bartender', formato: 'Servicio en directo', raciones: 1,
    precio: null, foto: null, etiqueta: 'En directo',
    resumen: 'Coctelería clásica y de autor, con y sin alcohol.',
    historia: ['Un bartender profesional con barra propia en tu evento: cócteles clásicos, de autor y sin alcohol.'],
    ingredientes: [], alergenos: [], servir: 'Confirmamos disponibilidad y coste según tu evento.', marida: '—'
  },
  {
    id: 'cortador', cat: 'servicios', nombre: 'Cortador de jamón', formato: 'Servicio en directo', raciones: 1,
    precio: null, foto: null, etiqueta: 'En directo',
    resumen: 'Jamón cortado a cuchillo delante de tus invitados.',
    historia: ['Un maestro cortador en tu evento. El espectáculo es verlo; el premio, probarlo.'],
    ingredientes: [], alergenos: [], servir: 'Confirmamos disponibilidad y coste según tu evento.', marida: '—'
  },
  {
    id: 'show-cooking', cat: 'servicios', nombre: 'Show cooking de risotto de ceps', formato: 'Servicio en directo', raciones: 1,
    precio: null, foto: null, etiqueta: 'En directo',
    resumen: 'Risotto cremoso preparado al momento en tu evento.',
    historia: ['Arroz, caldo, ceps y paciencia, removido delante de tus invitados hasta el punto exacto.'],
    ingredientes: ['Arroz', 'Ceps', 'Caldo', 'Parmesano', 'Mantequilla'], alergenos: ['lacteos'],
    servir: 'Confirmamos disponibilidad y coste según tu evento.', marida: 'Un blanco con cuerpo.'
  },
  {
    id: 'chef-camareros', cat: 'servicios', nombre: 'Chef y camareros a domicilio', formato: 'Cenas privadas', raciones: 1,
    precio: null, foto: null,
    resumen: 'Cenas privadas para grupos reducidos, con menú a medida.',
    historia: ['Consulta menús y disponibilidad para tu grupo. Cocinamos y servimos en tu casa; tú solo disfrutas.'],
    ingredientes: [], alergenos: [], servir: 'Menú y precio a medida.', marida: '—'
  }
];

var CATEGORIAS = {
  todos:     { titulo: 'Catering a domicilio', intro: 'Lo preparamos por encargo con 2 días de antelación y te lo llevamos a casa, a la oficina o al lugar de tu evento. Elige, añade a tu pedido y confírmalo por WhatsApp.' },
  tablas:    { titulo: 'Tablas para compartir', intro: 'Jamón cortado a cuchillo, quesos artesanos y embutidos de bellota, montados a mano el mismo día de la entrega.' },
  salados:   { titulo: 'Bocados salados', intro: 'Mini burgers, croquetas caseras y pulgas para picar de pie. Para cócteles, reuniones y celebraciones.' },
  dulces:    { titulo: 'Dulces', intro: 'Bollería mini horneada el mismo día, para coffee breaks, desayunos de empresa y el final de cualquier celebración.' },
  cajas:     { titulo: 'Cajas para eventos', intro: 'Formatos cerrados para tu evento. Dinos cuántos asistentes sois y ajustamos cantidades y precio.' },
  servicios: { titulo: 'Bebidas y servicios', intro: 'Maridaje de vinos y servicios en directo que convierten tu evento en una experiencia.' }
};

var ALERGENOS = {
  gluten: 'Gluten', crustaceos: 'Crustáceos', huevo: 'Huevo', pescado: 'Pescado', cacahuete: 'Cacahuete',
  soja: 'Soja', lacteos: 'Lácteos', 'frutos-secos': 'Frutos secos', apio: 'Apio', mostaza: 'Mostaza',
  sesamo: 'Sésamo', sulfitos: 'Sulfitos', altramuces: 'Altramuces', moluscos: 'Moluscos'
};

/* Condiciones de pedido y entrega */
var TIENDA = {
  whatsapp: '34607864393',
  pedidoMinimo: 100,          // €
  diasAntelacion: 2,          // días hábiles
  franjas: ['09:00 – 11:00', '11:00 – 13:00', '13:00 – 15:00', '18:00 – 20:00'],
  cpBarcelona: [8001, 8042]   // Códigos postales de Barcelona ciudad (08001–08042)
};
