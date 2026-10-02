/* =========================================================
   THYME — Repertorio de fotos
   ---------------------------------------------------------
   Cada hueco de fotos coge una seleccion al azar de su
   repertorio, asi la web no se ve igual dos visitas seguidas.

   Dos reglas que respeta siempre:
     1. Cada pagina solo usa fotos de SU tema. En Coffee Break
        no van a salir ibericos.
     2. Nunca repite la misma foto en el mismo bloque, aunque
        el archivo se llame distinto (hay fotos iguales
        guardadas con varios nombres).

   Para anadir fotos nuevas basta con meterlas en la lista de
   abajo: nombre de archivo (sin extension) y su descripcion.
   ========================================================= */
(function () {
  'use strict';

  /* --- El catalogo: archivo + texto alternativo real --- */
  var F = {
    donuts:        ['donuts',        'Caja THYME de mini donuts de chocolate'],
    gofres:        ['gofres',        'Mini gofres con Nutella y fresa de THYME'],
    croissants:    ['croissants',    'Mini croissants rellenos de THYME'],
    magdalenas:    ['magdalenas',    'Mini magdalenas caseras de THYME'],
    napolitanas:   ['napolitanas',   'Mini napolitanas de chocolate de THYME'],
    mdonuts:       ['menu-donuts-card',      'Bandeja de mini donuts de THYME'],
    mgofres:       ['menu-gofres-card',      'Bandeja de mini gofres de THYME'],
    mcroissants:   ['menu-croissants-card',  'Bandeja de mini croissants de THYME'],
    mcoffee:       ['menu-coffeebreak-card', 'Coffee Break Box de THYME lista para servir'],
    pulgasJamon:   ['pulgas-jamon',  'Mini pulgas de jamon de THYME'],
    pulgasQueso:   ['pulgas-queso',  'Mini pulgas de queso de THYME'],

    burgers:       ['mini-burgers',           'Caja de mini burgers gourmet de THYME'],
    mburgers:      ['menu-miniburgers-card',  'Mini burgers gourmet de THYME en bandeja'],
    croquetasA:    ['croquetas-caja-card',    'Caja de croquetas artesanales de THYME'],
    croquetasB:    ['croquetas-caja-b-card',  'Caja de croquetas artesanales de THYME'],
    mcocktail:     ['menu-cocktail-card',     'Cocktail Box de THYME lista para servir'],

    tablaQuesos:   ['tabla-quesos-card',            'Tabla de quesos variados de THYME'],
    tablaMixtaBox: ['tabla-mixta-box-card',         'Tabla mixta de quesos y embutidos de THYME'],
    tablaIbericos: ['tabla-ibericos-gourmet-card',  'Tabla seleccion gourmet de ibericos de THYME'],
    tablaMixta:    ['tabla-mixta-card',             'Tabla Mixta THYME con rosetones de embutido y queso'],
    mediterranea:  ['card-mediterranea',            'Tabla mediterranea de THYME con pan artesano'],
    instaMixta:    ['insta-tabla-mixta',            'Tabla de THYME servida en un evento'],
    torre:         ['card-torre',                   'Torre de tres pisos de embutidos, quesos y fruta'],
    mesaFlores:    ['card-mesa-flores',             'Tablas individuales decoradas con flores comestibles']
  };

  /* --- Repertorio por pagina. Cada bloque coge 4 de los suyos --- */
  var REPERTORIOS = {
    dulce:    ['donuts','gofres','croissants','magdalenas','napolitanas',
               'mdonuts','mgofres','mcroissants','mcoffee','pulgasJamon','pulgasQueso'],
    cocktail: ['burgers','mburgers','croquetasA','croquetasB','mcocktail',
               'pulgasJamon','pulgasQueso','tablaMixta','instaMixta'],
    tablas:   ['tablaQuesos','tablaMixtaBox','tablaIbericos','tablaMixta',
               'mediterranea','instaMixta','torre','mesaFlores'],
    todo:     ['croissants','gofres','donuts','magdalenas','burgers','croquetasA',
               'tablaMixta','mediterranea','tablaQuesos','instaMixta','torre','mesaFlores']
  };

  /* Fotos que son la misma imagen con otro nombre: nunca juntas. */
  var MISMAS = [
    ['instaMixta', 'tablaMixta'],
    ['croquetasA', 'croquetasB'],
    ['donuts', 'mdonuts'],
    ['gofres', 'mgofres'],
    ['croissants', 'mcroissants']
  ];
  function grupoDe(clave) {
    for (var i = 0; i < MISMAS.length; i++) {
      if (MISMAS[i].indexOf(clave) !== -1) return 'g' + i;
    }
    return clave;
  }

  function barajar(lista) {
    var a = lista.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /* --- 1. Bloques de fotos (los 2x2 de las paginas de menu) --- */
  document.querySelectorAll('[data-repertorio]').forEach(function (bloque) {
    var lista = REPERTORIOS[bloque.getAttribute('data-repertorio')];
    if (!lista) return;
    var huecos = bloque.querySelectorAll('.banner-photo');
    if (!huecos.length) return;

    var elegidas = [], vistos = {};
    barajar(lista).forEach(function (clave) {
      if (elegidas.length >= huecos.length) return;
      var g = grupoDe(clave);
      if (vistos[g]) return;          /* esa foto ya esta puesta */
      vistos[g] = true;
      elegidas.push(clave);
    });

    for (var i = 0; i < huecos.length && i < elegidas.length; i++) {
      var dato = F[elegidas[i]];
      if (!dato) continue;
      var img = huecos[i].querySelector('img');
      var src = huecos[i].querySelector('source');
      if (src) src.srcset = 'assets/img/' + dato[0] + '.webp';
      if (img) { img.src = 'assets/img/' + dato[0] + '.jpg'; img.alt = dato[1]; }
    }
  });

  /* --- 2. El escaparate de la portada ---
     Aqui NO se cambian las fotos: cada tarjeta lleva su titulo y su
     ficha, y separarlos seria ensenar una foto con el nombre de otra.
     Lo que cambia es el ORDEN, asi que cada visita abre con una
     distinta y la foto sigue correspondiendo a su texto. */
  var escaparate = document.querySelector('[data-escaparate-aleatorio]');
  if (escaparate) {
    barajar(Array.prototype.slice.call(escaparate.children))
      .forEach(function (tarjeta) { escaparate.appendChild(tarjeta); });
  }
})();
