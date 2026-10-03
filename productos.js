/* =========================================================
   THYME — CARTA DE PRODUCTOS A DOMICILIO
   ---------------------------------------------------------
   Aquí se edita TODO lo que aparece en "Pedir a domicilio".
   Campos de cada producto:
     nombre      Nombre visible
     cat         coffee | cocktail | croquetas | tablas | bebidas | servicios
     formato     Unidades o tamaño ("12 unidades", "Para 2 personas")
          precio      Euros (ej. 38.5) · null = "Consultar precio"
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
  /* ===================== COFFEE BREAK BOX ===================== */
  {
    id: "donuts-chocolate",
    cat: "coffee",
    nombre: "Donuts de chocolate",
    formato: "15 unidades",
    precio: 18,
    foto: "donuts",
    veg: true,
    resumen: "Esponjosos y bañados en chocolate.",
    historia: ["Esponjosos y bañados en chocolate."],
    ingredientes: ["Masa de donut", "Cobertura de chocolate"],
    alergenos: ["gluten", "huevo", "lacteos", "soja"],
    servir: "Se entrega listo para servir.",
    marida: "—"
  },
  {
    id: "napolitanas",
    cat: "coffee",
    nombre: "Napolitanas de chocolate",
    formato: "15 unidades",
    precio: 15,
    foto: "napolitanas",
    veg: true,
    resumen: "Hojaldre de mantequilla relleno de chocolate.",
    historia: ["Hojaldre de mantequilla relleno de chocolate."],
    ingredientes: ["Hojaldre de mantequilla", "Chocolate"],
    alergenos: ["gluten", "lacteos", "huevo", "soja"],
    servir: "Se entrega listo para servir.",
    marida: "—"
  },
  {
    id: "gofres",
    cat: "coffee",
    nombre: "Gofres con Nutella",
    formato: "15 unidades",
    precio: 22,
    foto: "gofres",
    veg: true,
    resumen: "Gofre dorado con crema de cacao y avellanas.",
    historia: ["Gofre dorado con crema de cacao y avellanas."],
    ingredientes: ["Masa de gofre", "Nutella"],
    alergenos: ["gluten", "lacteos", "huevo", "frutos-secos", "soja"],
    servir: "Se entrega listo para servir.",
    marida: "—"
  },
  {
    id: "croissants",
    cat: "coffee",
    nombre: "Croissants",
    formato: "15 unidades",
    precio: 18,
    foto: "croissants",
    veg: true,
    resumen: "De mantequilla, dorados y crujientes.",
    historia: ["De mantequilla, dorados y crujientes."],
    ingredientes: ["Masa de croissant", "Mantequilla"],
    alergenos: ["gluten", "lacteos", "huevo"],
    servir: "Se entrega listo para servir.",
    marida: "—"
  },
  {
    id: "magdalenas",
    cat: "coffee",
    nombre: "Magdalenas",
    formato: "15 unidades",
    precio: 18,
    foto: "magdalenas",
    veg: true,
    resumen: "Receta casera, tiernas y esponjosas.",
    historia: ["Receta casera, tiernas y esponjosas."],
    ingredientes: ["Harina de trigo", "Huevo", "Azúcar", "Aceite"],
    alergenos: ["gluten", "huevo", "lacteos"],
    servir: "Se entrega listo para servir.",
    marida: "—"
  },
  {
    id: "bolleria-variada",
    cat: "coffee",
    nombre: "Bollería variada",
    formato: "20 unidades",
    precio: 23,
    foto: "menu-coffeebreak-card",
    veg: true,
    resumen: "Un surtido de nuestra bollería para que haya de todo.",
    historia: ["Un surtido de nuestra bollería para que haya de todo."],
    ingredientes: ["Surtido de bollería"],
    alergenos: ["gluten", "lacteos", "huevo", "soja", "frutos-secos"],
    servir: "Se entrega listo para servir.",
    marida: "—"
  },
  {
    id: "donuts-glace",
    cat: "coffee",
    nombre: "Donuts glacé",
    formato: "15 unidades",
    precio: 18,
    foto: null,
    veg: true,
    resumen: "El donut clásico con su glaseado de azúcar.",
    historia: ["El donut clásico con su glaseado de azúcar."],
    ingredientes: ["Masa de donut", "Glaseado de azúcar"],
    alergenos: ["gluten", "huevo", "lacteos", "soja"],
    servir: "Se entrega listo para servir.",
    marida: "—"
  },

  /* ===================== COCKTAIL BOX ===================== */
  {
    id: "bocadillo-manchego",
    cat: "cocktail",
    nombre: "Mini bocadillo de queso manchego",
    formato: "15 unidades",
    precio: 22.5,
    foto: null,
    veg: true,
    resumen: "Pan crujiente y queso manchego.",
    historia: ["Pan crujiente y queso manchego."],
    ingredientes: ["Pan", "Queso manchego"],
    alergenos: ["gluten", "lacteos"],
    servir: "Se entrega listo para servir.",
    marida: "—"
  },
  {
    id: "bocadillo-jamon",
    cat: "cocktail",
    nombre: "Mini bocadillo de jamón ibérico",
    formato: "15 unidades",
    precio: 31,
    foto: null,
    resumen: "Pan crujiente y jamón ibérico.",
    historia: ["Pan crujiente y jamón ibérico."],
    ingredientes: ["Pan", "Jamón ibérico"],
    alergenos: ["gluten"],
    servir: "Se entrega listo para servir.",
    marida: "—"
  },
  {
    id: "bocadillo-vegetal",
    cat: "cocktail",
    nombre: "Mini bocadillo vegetal",
    formato: "15 unidades",
    precio: 25,
    foto: null,
    veg: true,
    resumen: "Pan crujiente con verduras frescas.",
    historia: ["Pan crujiente con verduras frescas."],
    ingredientes: ["Pan", "Verduras frescas"],
    alergenos: ["gluten"],
    servir: "Se entrega listo para servir.",
    marida: "—"
  },
  {
    id: "bocadillos-variados",
    cat: "cocktail",
    nombre: "Mini bocadillos variados",
    formato: "20 unidades",
    precio: 38,
    foto: null,
    resumen: "Un surtido de nuestros mini bocadillos.",
    historia: ["Un surtido de nuestros mini bocadillos."],
    ingredientes: ["Pan", "Queso manchego", "Jamón ibérico", "Verduras frescas"],
    alergenos: ["gluten", "lacteos"],
    servir: "Se entrega listo para servir.",
    marida: "—"
  },
  {
    id: "burger-ternera",
    cat: "cocktail",
    nombre: "Burger de ternera y queso",
    formato: "15 unidades",
    precio: 22,
    foto: "mini-burgers",
    etiqueta: "La más pedida",
    resumen: "Mini burger de ternera con queso fundido.",
    historia: ["Mini burger de ternera con queso fundido."],
    ingredientes: ["Pan de burger", "Carne de ternera", "Queso"],
    alergenos: ["gluten", "lacteos", "huevo", "sesamo"],
    servir: "Se entrega listo para servir.",
    marida: "—"
  },
  {
    id: "burger-pollo",
    cat: "cocktail",
    nombre: "Burger de pollo y queso",
    formato: "15 unidades",
    precio: 22,
    foto: null,
    resumen: "Mini burger de pollo con queso fundido.",
    historia: ["Mini burger de pollo con queso fundido."],
    ingredientes: ["Pan de burger", "Pollo", "Queso"],
    alergenos: ["gluten", "lacteos", "huevo", "sesamo"],
    servir: "Se entrega listo para servir.",
    marida: "—"
  },
  {
    id: "burger-heura",
    cat: "cocktail",
    nombre: "Burger de Heura con pesto",
    formato: "15 unidades",
    precio: 22,
    foto: null,
    veg: true,
    resumen: "Mini burger vegetal de Heura con pesto.",
    historia: ["Mini burger vegetal de Heura con pesto."],
    ingredientes: ["Pan de burger", "Heura", "Pesto"],
    alergenos: ["gluten", "soja", "frutos-secos", "lacteos"],
    servir: "Se entrega listo para servir.",
    marida: "—"
  },
  {
    id: "focaccia-jamon-brie",
    cat: "cocktail",
    nombre: "Focaccia de jamón y queso brie con trufa",
    formato: "15 unidades",
    precio: 35,
    foto: null,
    resumen: "Focaccia con jamón, brie y un toque de trufa.",
    historia: ["Focaccia con jamón, brie y un toque de trufa."],
    ingredientes: ["Focaccia", "Jamón", "Queso brie", "Trufa"],
    alergenos: ["gluten", "lacteos"],
    servir: "Se entrega listo para servir.",
    marida: "—"
  },
  {
    id: "focaccia-bacon",
    cat: "cocktail",
    nombre: "Focaccia de bacon y queso",
    formato: "15 unidades",
    precio: 30,
    foto: null,
    resumen: "Focaccia con bacon y queso.",
    historia: ["Focaccia con bacon y queso."],
    ingredientes: ["Focaccia", "Bacon", "Queso"],
    alergenos: ["gluten", "lacteos"],
    servir: "Se entrega listo para servir.",
    marida: "—"
  },
  {
    id: "focaccia-vegetal",
    cat: "cocktail",
    nombre: "Focaccia vegetal",
    formato: "20 unidades",
    precio: 28,
    foto: null,
    veg: true,
    resumen: "Focaccia con verduras.",
    historia: ["Focaccia con verduras."],
    ingredientes: ["Focaccia", "Verduras"],
    alergenos: ["gluten"],
    servir: "Se entrega listo para servir.",
    marida: "—"
  },
  {
    id: "mini-pizza",
    cat: "cocktail",
    nombre: "Mini pizza de champiñones y mozzarella",
    formato: "20 unidades",
    precio: 26,
    foto: null,
    veg: true,
    resumen: "Mini pizza con champiñones y mozzarella.",
    historia: ["Mini pizza con champiñones y mozzarella."],
    ingredientes: ["Masa de pizza", "Champiñones", "Mozzarella", "Tomate"],
    alergenos: ["gluten", "lacteos"],
    servir: "Se entrega listo para servir.",
    marida: "—"
  },
  {
    id: "sandwich-pollo",
    cat: "cocktail",
    nombre: "Sandwich de pollo asado",
    formato: "15 unidades",
    precio: 27,
    foto: null,
    resumen: "Sandwich de pollo asado.",
    historia: ["Sandwich de pollo asado."],
    ingredientes: ["Pan de molde", "Pollo asado"],
    alergenos: ["gluten"],
    servir: "Se entrega listo para servir.",
    marida: "—"
  },
  {
    id: "sandwich-salmon",
    cat: "cocktail",
    nombre: "Sandwich de salmón y queso fresco con pepino",
    formato: "15 unidades",
    precio: 35,
    foto: null,
    resumen: "Sandwich de salmón, queso fresco y pepino.",
    historia: ["Sandwich de salmón, queso fresco y pepino."],
    ingredientes: ["Pan de molde", "Salmón", "Queso fresco", "Pepino"],
    alergenos: ["gluten", "pescado", "lacteos"],
    servir: "Se entrega listo para servir.",
    marida: "—"
  },

  /* ===================== COCKTAIL BOX 2 · CROQUETAS ===================== */
  {
    id: "croquetas-jamon",
    cat: "croquetas",
    nombre: "Croquetas de jamón ibérico",
    formato: "20 unidades",
    precio: 20,
    foto: "croquetas-caja-card",
    resumen: "Cremosas por dentro y crujientes por fuera.",
    historia: ["Cremosas por dentro y crujientes por fuera."],
    ingredientes: ["Bechamel", "Jamón ibérico", "Pan rallado", "Huevo"],
    alergenos: ["gluten", "lacteos", "huevo"],
    servir: "Se entrega listo para servir.",
    marida: "—"
  },
  {
    id: "croquetas-marisco",
    cat: "croquetas",
    nombre: "Croquetas de marisco",
    formato: "20 unidades",
    precio: 20,
    foto: "croquetas-caja-b-card",
    resumen: "Cremosas por dentro y crujientes por fuera.",
    historia: ["Cremosas por dentro y crujientes por fuera."],
    ingredientes: ["Bechamel", "Marisco", "Pan rallado", "Huevo"],
    alergenos: ["gluten", "lacteos", "huevo", "crustaceos", "moluscos"],
    servir: "Se entrega listo para servir.",
    marida: "—"
  },
  {
    id: "croquetas-ceps",
    cat: "croquetas",
    nombre: "Croquetas de ceps",
    formato: "20 unidades",
    precio: 20,
    foto: "croquetas-caja",
    veg: true,
    resumen: "Cremosas por dentro y crujientes por fuera.",
    historia: ["Cremosas por dentro y crujientes por fuera."],
    ingredientes: ["Bechamel", "Ceps", "Pan rallado", "Huevo"],
    alergenos: ["gluten", "lacteos", "huevo"],
    servir: "Se entrega listo para servir.",
    marida: "—"
  },
  {
    id: "croquetas-variadas",
    cat: "croquetas",
    nombre: "Croquetas variadas",
    formato: "20 unidades",
    precio: 20,
    foto: "croquetas-caja-b",
    resumen: "Un surtido de nuestras croquetas.",
    historia: ["Un surtido de nuestras croquetas."],
    ingredientes: ["Bechamel", "Jamón ibérico", "Marisco", "Ceps", "Pan rallado", "Huevo"],
    alergenos: ["gluten", "lacteos", "huevo", "crustaceos", "moluscos"],
    servir: "Se entrega listo para servir.",
    marida: "—"
  },

  /* ===================== TABLA BOX ===================== */
  {
    id: "tabla-quesos",
    cat: "tablas",
    nombre: "Tabla de quesos variados",
    formato: "700 g",
    precio: 48,
    foto: "tabla-quesos-card",
    veg: true,
    resumen: "Quesos de suaves a intensos, con crackers, frutos secos y fruta.",
    historia: ["Quesos de suaves a intensos, con crackers, frutos secos y fruta."],
    ingredientes: ["Quesos variados", "Crackers", "Frutos secos", "Fruta fresca"],
    alergenos: ["lacteos", "gluten", "frutos-secos"],
    servir: "Se entrega lista para poner en el centro de la mesa.",
    marida: "—"
  },
  {
    id: "tabla-mixta",
    cat: "tablas",
    nombre: "Tabla mixta de quesos y embutidos",
    formato: "700 g",
    precio: 50,
    foto: "tabla-mixta-box-card",
    etiqueta: "La más pedida",
    resumen: "Quesos y embutidos con encurtidos, frutos secos y fruta.",
    historia: ["Quesos y embutidos con encurtidos, frutos secos y fruta."],
    ingredientes: ["Quesos variados", "Embutidos", "Encurtidos", "Frutos secos", "Fruta fresca"],
    alergenos: ["lacteos", "gluten", "frutos-secos"],
    servir: "Se entrega lista para poner en el centro de la mesa.",
    marida: "—"
  },
  {
    id: "tabla-gourmet",
    cat: "tablas",
    nombre: "Tabla selección gourmet de ibéricos",
    formato: "500 g",
    precio: 58,
    foto: "tabla-ibericos-gourmet-card",
    resumen: "Jamón, lomo y embutidos ibéricos con queso, frutos secos y fruta.",
    historia: ["Jamón, lomo y embutidos ibéricos con queso, frutos secos y fruta."],
    ingredientes: ["Jamón ibérico", "Lomo ibérico", "Embutidos ibéricos", "Queso", "Frutos secos", "Fruta fresca"],
    alergenos: ["lacteos", "frutos-secos"],
    servir: "Se entrega lista para poner en el centro de la mesa.",
    marida: "—"
  },

  /* ===================== BARRA DE BEBIDAS ===================== */
  {
    id: "zumos",
    cat: "bebidas",
    nombre: "Zumos (naranja, piña, melocotón)",
    formato: "Unidad",
    precio: 1.9,
    foto: "bebida-zumos",
    resumen: "Zumo de naranja, piña o melocotón.",
    historia: ["Zumo de naranja, piña o melocotón."],
    ingredientes: [],
    alergenos: [],
    servir: "Se entrega frío si nos lo indicas al hacer el pedido.",
    marida: "—"
  },
  {
    id: "coca-cola",
    cat: "bebidas",
    nombre: "Coca-Cola / Zero",
    formato: "Unidad",
    precio: 2,
    foto: "bebida-cocacola",
    resumen: "Coca-Cola o Coca-Cola Zero.",
    historia: ["Coca-Cola o Coca-Cola Zero."],
    ingredientes: [],
    alergenos: [],
    servir: "Se entrega frío si nos lo indicas al hacer el pedido.",
    marida: "—"
  },
  {
    id: "fanta",
    cat: "bebidas",
    nombre: "Fanta naranja / limón / Sprite",
    formato: "Unidad",
    precio: 2,
    foto: "bebida-fanta",
    resumen: "Fanta de naranja, Fanta de limón o Sprite.",
    historia: ["Fanta de naranja, Fanta de limón o Sprite."],
    ingredientes: [],
    alergenos: [],
    servir: "Se entrega frío si nos lo indicas al hacer el pedido.",
    marida: "—"
  },
  {
    id: "agua",
    cat: "bebidas",
    nombre: "Agua mineral / con gas",
    formato: "Unidad",
    precio: 1.5,
    foto: "bebida-agua",
    resumen: "Agua mineral natural o con gas.",
    historia: ["Agua mineral natural o con gas."],
    ingredientes: [],
    alergenos: [],
    servir: "Se entrega frío si nos lo indicas al hacer el pedido.",
    marida: "—"
  },
  {
    id: "cerveza",
    cat: "bebidas",
    nombre: "Cerveza Estrella",
    formato: "Unidad",
    precio: 2.3,
    foto: "bebida-cerveza",
    resumen: "Cerveza Estrella Galicia.",
    historia: ["Cerveza Estrella Galicia."],
    ingredientes: [],
    alergenos: ["gluten"],
    servir: "Se entrega frío si nos lo indicas al hacer el pedido.",
    marida: "—"
  },
  {
    id: "vino-tinto",
    cat: "bebidas",
    nombre: "Vino tinto reserva",
    formato: "Botella",
    precio: 18,
    foto: "bebida-vino-tinto",
    resumen: "Vino tinto reserva.",
    historia: ["Vino tinto reserva."],
    ingredientes: [],
    alergenos: ["sulfitos"],
    servir: "Se entrega frío si nos lo indicas al hacer el pedido.",
    marida: "—"
  },
  {
    id: "vino-blanco",
    cat: "bebidas",
    nombre: "Vino blanco Viña Regajo",
    formato: "Botella",
    precio: 20,
    foto: "bebida-vino-blanco",
    resumen: "Vino blanco seco.",
    historia: ["Vino blanco seco."],
    ingredientes: [],
    alergenos: ["sulfitos"],
    servir: "Se entrega frío si nos lo indicas al hacer el pedido.",
    marida: "—"
  },
  {
    id: "cava-codorniu",
    cat: "bebidas",
    nombre: "Cava Codorníu Non Plus Ultra",
    formato: "Botella",
    precio: 18,
    foto: "bebida-cava-codorniu",
    resumen: "Cava brut reserva.",
    historia: ["Cava brut reserva."],
    ingredientes: [],
    alergenos: ["sulfitos"],
    servir: "Se entrega frío si nos lo indicas al hacer el pedido.",
    marida: "—"
  },
  {
    id: "cava-juve",
    cat: "bebidas",
    nombre: "Cava Juvé & Camps Reserva",
    formato: "Botella",
    precio: 20,
    foto: "bebida-cava-juve",
    resumen: "Cava brut reserva.",
    historia: ["Cava brut reserva."],
    ingredientes: [],
    alergenos: ["sulfitos"],
    servir: "Se entrega frío si nos lo indicas al hacer el pedido.",
    marida: "—"
  },

  /* ===================== SERVICE PREMIUM ===================== */
  {
    id: "barra-bartender",
    cat: "servicios",
    nombre: "Barra de bebidas con bartender",
    formato: "Servicio en directo",
    precio: null,
    foto: "servicio-bartender",
    etiqueta: "En directo",
    resumen: "Un bartender profesional con barra propia en tu evento.",
    historia: ["Un bartender profesional con barra propia en tu evento: cócteles clásicos, de autor y sin alcohol."],
    ingredientes: [],
    alergenos: [],
    servir: "Confirmamos disponibilidad y coste según tu evento.",
    marida: "—"
  },
  {
    id: "cortador",
    cat: "servicios",
    nombre: "Estación de cortador de jamón",
    formato: "Servicio en directo",
    precio: null,
    foto: "servicio-cortador",
    etiqueta: "En directo",
    resumen: "Jamón cortado a cuchillo delante de tus invitados.",
    historia: ["Un maestro cortador en tu evento. El espectáculo es verlo; el premio, probarlo."],
    ingredientes: [],
    alergenos: [],
    servir: "Confirmamos disponibilidad y coste según tu evento.",
    marida: "—"
  },
  {
    id: "show-cooking",
    cat: "servicios",
    nombre: "Show cooking con chef",
    formato: "Servicio en directo",
    precio: null,
    foto: null,
    etiqueta: "En directo",
    resumen: "Un chef cocinando en directo durante tu evento.",
    historia: ["Un chef cocinando en directo durante tu evento, con el plato terminado y servido al momento."],
    ingredientes: [],
    alergenos: [],
    servir: "Confirmamos disponibilidad y coste según tu evento.",
    marida: "—"
  },
  {
    id: "cenas-privadas",
    cat: "servicios",
    nombre: "Cenas privadas para grupos reducidos",
    formato: "A medida",
    precio: null,
    foto: null,
    resumen: "Una cena a tu medida con chef y camareros.",
    historia: ["Una cena a tu medida, en tu casa o en el espacio que elijas, con chef y camareros a domicilio."],
    ingredientes: [],
    alergenos: [],
    servir: "Menú y precio a medida.",
    marida: "—"
  },
  {
    id: "cafeteria",
    cat: "servicios",
    nombre: "Servicio de cafetería",
    formato: "Servicio en directo",
    precio: null,
    foto: null,
    resumen: "Café e infusiones preparados al momento.",
    historia: ["Café e infusiones preparados al momento, para cerrar una comida o sostener una jornada de trabajo."],
    ingredientes: [],
    alergenos: [],
    servir: "Confirmamos disponibilidad y coste según tu evento.",
    marida: "—"
  }
];

var CATEGORIAS = {
  todos:     { titulo: 'Catering a domicilio', intro: 'Lo preparamos por encargo con 2 días de antelación y te lo llevamos a casa, a la oficina o al lugar de tu evento. Elige, añade a tu pedido y confírmalo por WhatsApp.' },
  coffee:    { titulo: 'Coffee Break Box', intro: 'Bollería para pausas, jornadas de trabajo y reuniones. Bandejas de 15 y 20 unidades.' },
  cocktail:  { titulo: 'Cocktail Box', intro: 'Mini bocadillos, burgers, focaccias, mini pizzas y sandwiches para cócteles y celebraciones de pie.' },
  croquetas: { titulo: 'Cocktail Box 2 · Croquetas', intro: 'Croquetas caseras en bandejas de 20 unidades.' },
  tablas:    { titulo: 'Tabla Box', intro: 'Tablas de quesos, mixta y selección gourmet de ibéricos, montadas a mano el mismo día.' },
  bebidas:   { titulo: 'Barra de bebidas', intro: 'Refrescos, zumos, agua y cerveza por unidad; vinos y cavas por botella.' },
  servicios: { titulo: 'Service Premium', intro: 'Servicios en directo y a medida para tu evento. Te confirmamos disponibilidad y precio.' }
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
