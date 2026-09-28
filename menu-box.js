/* =========================================================
   THYME — Páginas de cada menú (coffee-break.html, cocktail-box.html)
   Muestra todos los boxes de un menú con foto, ingredientes,
   alérgenos y precio. Los datos salen de productos.js.
   ========================================================= */
(function () {
  'use strict';
  var MENUS = {
    coffee: {
      nombre: 'Coffee Break Box',
      productos: ['donuts', 'napolitanas', 'gofres', 'croissants', 'magdalenas', 'pulgas-queso', 'pulgas-jamon'],
      mensaje: '¡Hola THYME! Me interesa la Coffee Break Box completa.'
    },
    cocktail: {
      nombre: 'Cocktail Box',
      productos: ['mini-burgers', 'tabla-quesos', 'tabla-mixta', 'tabla-gourmet', 'croquetas', 'barra-bartender', 'cortador', 'show-cooking'],
      mensaje: '¡Hola THYME! Me interesa la Cocktail Box completa.'
    }
  };
  var root = document.querySelector('[data-menu-box]');
  if (!root || typeof PRODUCTOS === 'undefined') return;
  var menu = MENUS[root.getAttribute('data-menu-box')];
  var byId = {};
  PRODUCTOS.forEach(function (p) { byId[p.id] = p; });

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function euros(n) { return n.toLocaleString('es-ES', { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 }) + ' €'; }
  var ICONOS = {
    salados: '<path d="M4 13h16M5 13c0-4 3-7 7-7s7 3 7 7M5 16h14l-1.5 3h-11z"/>',
    tablas: '<rect x="3" y="8" width="18" height="10" rx="3"/><path d="M21 13h2"/><circle cx="8" cy="13" r="1.6"/><circle cx="13" cy="12" r="1.2"/><circle cx="16.5" cy="14" r="1.4"/>',
    dulces: '<circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2.5"/>',
    servicios: '<path d="M7 3c0 5 1 8 5 8s5-3 5-8z"/><path d="M12 11v7M8 21h8"/>'
  };
  function media(p) {
    if (p.foto) return '<picture><source srcset="assets/img/' + p.foto + '.webp" type="image/webp"><img src="assets/img/' + p.foto + '.jpg" alt="' + esc(p.nombre) + '" loading="lazy" width="800" height="800"></picture>';
    return '<div class="producto-placeholder" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round">' + (ICONOS[p.cat] || '') + '</svg><span>Próximamente</span><small>' + esc(p.nombre) + '</small></div>';
  }

  var lista = menu.productos.map(function (id) { return byId[id]; }).filter(Boolean);
  var grid = root.querySelector('[data-box-grid]');
  grid.innerHTML = lista.map(function (p, i) {
    var aler = (p.alergenos || []).map(function (a) { return '<li>' + esc(ALERGENOS[a] || a) + '</li>'; }).join('');
    return '' +
      '<article class="box-card" id="' + p.id + '">' +
        '<div class="box-media">' + media(p) +
          (p.etiqueta ? '<span class="producto-tag box-tag">' + esc(p.etiqueta) + '</span>' : '') +
          '<span class="box-num">' + String(i + 1).padStart(2, '0') + '</span>' +
        '</div>' +
        '<div class="box-body">' +
          '<p class="producto-formato">' + esc(p.formato) + (p.veg ? ' · Vegetariano' : '') + '</p>' +
          '<h2>' + esc(p.nombre) + '</h2>' +
          '<p class="box-texto">' + esc((p.historia && p.historia[0]) || p.resumen) + '</p>' +
          (p.ingredientes && p.ingredientes.length ? '<details class="box-det"><summary>Ingredientes</summary><ul class="ficha-ingredientes">' + p.ingredientes.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></details>' : '') +
          (aler ? '<div class="box-aler"><span>Alérgenos</span><ul class="ficha-alergenos">' + aler + '</ul></div>' : '') +
          '<div class="box-pie">' +
            '<div class="producto-precio">' + (p.precio != null ? '<strong>' + euros(p.precio) + '</strong>' : '<strong class="producto-consultar">Consultar precio</strong>') + '</div>' +
            '<div class="box-botones">' +
              '<button type="button" class="btn btn-primary" data-box-anadir="' + p.id + '">' + (p.precio != null ? 'Añadir al pedido' : 'Añadir para consultar') + '</button>' +
              '<a class="box-ficha" href="pedidos.html#' + p.id + '">Ficha completa</a>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</article>';
  }).join('');

  /* Carrito compartido con la tienda (pedidos.html) */
  var KEY = 'thyme-carrito-v1';
  function leer() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function contar() {
    var c = leer(), n = 0; Object.keys(c).forEach(function (k) { n += c[k]; });
    var b = document.querySelector('[data-cart-count]');
    if (b) { b.textContent = n; b.hidden = !n; }
    var bar = document.querySelector('[data-box-barra]');
    if (bar) bar.hidden = !n;
    var txt = document.querySelector('[data-box-barra-txt]');
    if (txt) txt.textContent = n + (n === 1 ? ' producto en tu pedido' : ' productos en tu pedido');
  }
  var toast = document.querySelector('[data-toast]'), tt;
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-box-anadir]');
    if (!b) return;
    var id = b.getAttribute('data-box-anadir');
    var c = leer(); c[id] = Math.min(99, (c[id] || 0) + 1);
    try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (err) {}
    contar();
    b.textContent = '✓ Añadido';
    setTimeout(function () { b.textContent = 'Añadir otro'; }, 1400);
    if (toast) {
      toast.innerHTML = '<span>' + esc(byId[id].nombre) + ' añadido</span><a href="pedidos.html#pedido">Ver pedido</a>';
      toast.classList.add('is-visible');
      clearTimeout(tt); tt = setTimeout(function () { toast.classList.remove('is-visible'); }, 3200);
    }
  });

  var wa = root.querySelector('[data-box-wa]');
  var pers = root.querySelector('[data-box-personas]');
  function actualizarWa() {
    var n = parseInt(pers && pers.value, 10);
    var t = menu.mensaje + (n ? '\nSomos ' + n + ' personas.' : '') + '\nFecha del evento: \n¿Me pasáis precio y disponibilidad?';
    wa.href = 'https://wa.me/34607864393?text=' + encodeURIComponent(t);
  }
  if (wa) { actualizarWa(); if (pers) pers.addEventListener('input', actualizarWa); }
  contar();
})();
