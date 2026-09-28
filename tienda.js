/* =========================================================
   THYME — Tienda a domicilio (pedidos.html)
   Carrito guardado en el navegador + pedido final por WhatsApp.
   Los productos se editan en productos.js
   ========================================================= */
(function () {
  'use strict';
  if (typeof PRODUCTOS === 'undefined') return;
  var grid = document.querySelector('[data-catalogo-grid]');
  if (!grid) return;

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var byId = {};
  PRODUCTOS.forEach(function (p) { byId[p.id] = p; });

  function euros(n) {
    return n.toLocaleString('es-ES', { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 }) + ' €';
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
  }
  var ICONOS = {
    salados: '<path d="M4 13h16M5 13c0-4 3-7 7-7s7 3 7 7M5 16h14l-1.5 3h-11z"/>',
    tablas: '<rect x="3" y="8" width="18" height="10" rx="3"/><path d="M21 13h2"/><circle cx="8" cy="13" r="1.6"/><circle cx="13" cy="12" r="1.2"/><circle cx="16.5" cy="14" r="1.4"/>',
    dulces: '<circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2.5"/>',
    cajas: '<path d="M3 8l9-4 9 4v9l-9 4-9-4z"/><path d="M3 8l9 4 9-4M12 12v9"/>',
    servicios: '<path d="M7 3c0 5 1 8 5 8s5-3 5-8z"/><path d="M12 11v7M8 21h8"/>'
  };
  function media(p, cls) {
    if (p.foto) {
      return '<picture><source srcset="assets/img/' + p.foto + '.webp" type="image/webp"><img src="assets/img/' + p.foto + '.jpg" alt="' + esc(p.nombre) + '" loading="lazy" width="800" height="800"></picture>';
    }
    return '<div class="producto-placeholder ' + (cls || '') + '" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round">' + (ICONOS[p.cat] || '') + '</svg><span>' + esc(p.nombre) + '</span></div>';
  }
  function precioPersona(p) {
    if (p.precio == null || !p.raciones || p.raciones < 2) return '';
    return euros(Math.round(p.precio / p.raciones * 100) / 100) + ' / persona';
  }

  /* ---------------- CARRITO (persistente) ---------------- */
  var KEY = 'thyme-carrito-v1';
  var carrito = {};
  try { carrito = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { carrito = {}; }
  Object.keys(carrito).forEach(function (id) { if (!byId[id]) delete carrito[id]; });
  function guardar() { try { localStorage.setItem(KEY, JSON.stringify(carrito)); } catch (e) {} }
  function totales() {
    var t = { unidades: 0, total: 0, consultar: 0 };
    Object.keys(carrito).forEach(function (id) {
      var p = byId[id], n = carrito[id];
      t.unidades += n;
      if (p.precio != null) t.total += p.precio * n; else t.consultar++;
    });
    return t;
  }
  function anadir(id, n) {
    carrito[id] = Math.min(99, (carrito[id] || 0) + (n || 1));
    guardar(); pintarCarrito(); aviso(byId[id].nombre + ' añadido a tu pedido');
    var badge = $('[data-cart-count]');
    if (badge) { badge.classList.remove('bump'); void badge.offsetWidth; badge.classList.add('bump'); }
  }
  function fijar(id, n) {
    if (n <= 0) delete carrito[id]; else carrito[id] = Math.min(99, n);
    guardar(); pintarCarrito();
  }

  /* ---------------- CATÁLOGO ---------------- */
  var estado = { cat: 'todos', veg: false, singluten: false, orden: 'recomendado', q: '' };

  function tarjeta(p) {
    var tags = '';
    if (p.etiqueta) tags += '<span class="producto-tag">' + esc(p.etiqueta) + '</span>';
    if (p.veg) tags += '<span class="producto-tag producto-tag-veg">Vegetariano</span>';
    var enCarrito = carrito[p.id] ? '<span class="producto-en-carrito">' + carrito[p.id] + ' en tu pedido</span>' : '';
    return '' +
      '<article class="producto" data-id="' + p.id + '">' +
        '<button type="button" class="producto-media" data-abrir="' + p.id + '" aria-label="Ver detalles de ' + esc(p.nombre) + '">' +
          media(p) + (tags ? '<div class="producto-tags">' + tags + '</div>' : '') +
          '<span class="producto-ver">Ver ingredientes</span>' +
        '</button>' +
        '<div class="producto-body">' +
          '<p class="producto-formato">' + esc(p.formato) + '</p>' +
          '<h3><button type="button" data-abrir="' + p.id + '">' + esc(p.nombre) + '</button></h3>' +
          '<p class="producto-desc">' + esc(p.resumen) + '</p>' +
          '<div class="producto-precio">' +
            (p.precio != null ? '<strong>' + euros(p.precio) + '</strong><span>' + precioPersona(p) + '</span>' : '<strong class="producto-consultar">Consultar precio</strong>') +
          '</div>' +
          '<div class="producto-acciones">' +
            '<button type="button" class="btn btn-primary producto-btn" data-anadir="' + p.id + '">' + (p.precio != null ? 'Añadir al pedido' : 'Añadir para consultar') + '</button>' +
          '</div>' + enCarrito +
        '</div>' +
      '</article>';
  }

  function filtrados() {
    var q = estado.q.trim().toLowerCase();
    var lista = PRODUCTOS.filter(function (p) {
      if (estado.cat !== 'todos' && p.cat !== estado.cat) return false;
      if (estado.veg && !p.veg) return false;
      if (estado.singluten && (p.alergenos || []).indexOf('gluten') !== -1) return false;
      if (q) {
        var txt = (p.nombre + ' ' + p.resumen + ' ' + (p.ingredientes || []).join(' ')).toLowerCase();
        if (txt.indexOf(q) === -1) return false;
      }
      return true;
    });
    if (estado.orden !== 'recomendado') {
      lista = lista.slice().sort(function (a, b) {
        var pa = a.precio == null ? Infinity : a.precio, pb = b.precio == null ? Infinity : b.precio;
        return estado.orden === 'asc' ? pa - pb : (pb === Infinity ? -1 : pa === Infinity ? 1 : pb - pa);
      });
    }
    return lista;
  }

  function render() {
    var lista = filtrados();
    grid.innerHTML = lista.length ? lista.map(tarjeta).join('') :
      '<div class="catalogo-vacio"><p>No hay productos con estos filtros.</p><button type="button" class="btn btn-glass" data-reset>Quitar filtros</button></div>';
    var c = CATEGORIAS[estado.cat];
    $('[data-catalogo-titulo]').textContent = c.titulo;
    $('[data-catalogo-intro]').textContent = c.intro;
    $('[data-catalogo-count]').textContent = lista.length + (lista.length === 1 ? ' producto' : ' productos');
    $$('[data-cat]').forEach(function (b) {
      var on = b.getAttribute('data-cat') === estado.cat;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  /* ---------------- FICHA DE PRODUCTO ---------------- */
  var ficha = $('[data-ficha]');
  var fichaCont = $('[data-ficha-contenido]');
  var ultimoFoco = null;

  function abrirFicha(id) {
    var p = byId[id]; if (!p) return;
    ultimoFoco = document.activeElement;
    var alergenos = (p.alergenos || []).map(function (a) { return '<li>' + esc(ALERGENOS[a] || a) + '</li>'; }).join('');
    var relacionados = PRODUCTOS.filter(function (x) { return x.cat === p.cat && x.id !== p.id; }).slice(0, 3);
    fichaCont.innerHTML = '' +
      '<div class="ficha-media">' + media(p, 'placeholder-lg') + '</div>' +
      '<div class="ficha-info">' +
        '<p class="kicker">' + esc(CATEGORIAS[p.cat].titulo) + '</p>' +
        '<h2 id="ficha-titulo">' + esc(p.nombre) + '</h2>' +
        '<p class="ficha-formato">' + esc(p.formato) + (p.veg ? ' · Vegetariano' : '') + '</p>' +
        '<div class="ficha-precio">' + (p.precio != null ? '<strong>' + euros(p.precio) + '</strong><span>' + precioPersona(p) + '</span>' : '<strong class="producto-consultar">Consultar precio</strong><span>Te lo confirmamos por WhatsApp</span>') + '</div>' +
        '<div class="ficha-texto">' + (p.historia || []).map(function (t) { return '<p>' + esc(t) + '</p>'; }).join('') + '</div>' +
        (p.ingredientes && p.ingredientes.length ? '<h3>Ingredientes</h3><ul class="ficha-ingredientes">' + p.ingredientes.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul>' : '') +
        (alergenos ? '<h3>Alérgenos</h3><ul class="ficha-alergenos">' + alergenos + '</ul><p class="ficha-nota">¿Alguna alergia o intolerancia? Indícalo en el pedido y adaptamos lo posible. No podemos garantizar la ausencia total de trazas.</p>' : '') +
        '<dl class="ficha-datos">' +
          (p.servir ? '<div><dt>Cómo servir</dt><dd>' + esc(p.servir) + '</dd></div>' : '') +
          (p.marida && p.marida !== '—' ? '<div><dt>Marida con</dt><dd>' + esc(p.marida) + '</dd></div>' : '') +
          '<div><dt>Entrega</dt><dd>Lo preparamos por encargo con ' + TIENDA.diasAntelacion + ' días hábiles de antelación.</dd></div>' +
        '</dl>' +
        '<div class="ficha-comprar">' +
          '<div class="qty" role="group" aria-label="Cantidad"><button type="button" data-ficha-qty="-1" aria-label="Quitar uno">−</button><input type="number" min="1" max="99" value="1" inputmode="numeric" aria-label="Cantidad" data-ficha-n><button type="button" data-ficha-qty="1" aria-label="Añadir uno">+</button></div>' +
          '<button type="button" class="btn btn-primary" data-ficha-anadir="' + p.id + '">' + (p.precio != null ? 'Añadir al pedido' : 'Añadir para consultar') + '</button>' +
        '</div>' +
        (relacionados.length ? '<h3 class="ficha-rel-titulo">También te puede gustar</h3><div class="ficha-rel">' + relacionados.map(function (r) {
          return '<button type="button" class="ficha-rel-item" data-abrir="' + r.id + '">' + media(r) + '<span>' + esc(r.nombre) + '</span><small>' + (r.precio != null ? euros(r.precio) : 'Consultar') + '</small></button>';
        }).join('') + '</div>' : '') +
      '</div>';
    ficha.hidden = false;
    requestAnimationFrame(function () { ficha.classList.add('is-open'); });
    document.documentElement.classList.add('no-scroll');
    $('.ficha-panel', ficha).scrollTop = 0;
    $('[data-ficha-cerrar]', ficha).focus();
    if (history.replaceState) history.replaceState(null, '', '#' + p.id);
  }
  function cerrarFicha() {
    ficha.classList.remove('is-open');
    document.documentElement.classList.remove('no-scroll');
    setTimeout(function () { ficha.hidden = true; }, 250);
    if (history.replaceState) history.replaceState(null, '', location.pathname + location.search);
    if (ultimoFoco) ultimoFoco.focus();
  }

  /* ---------------- CESTA (panel lateral) ---------------- */
  var cesta = $('[data-cesta]');
  function abrirCesta() {
    cesta.hidden = false;
    requestAnimationFrame(function () { cesta.classList.add('is-open'); });
    document.documentElement.classList.add('no-scroll');
    $('[data-cesta-cerrar]', cesta).focus();
  }
  function cerrarCesta() {
    cesta.classList.remove('is-open');
    document.documentElement.classList.remove('no-scroll');
    setTimeout(function () { cesta.hidden = true; }, 250);
  }

  function pintarCarrito() {
    var t = totales();
    $$('[data-cart-count]').forEach(function (b) { b.textContent = t.unidades; b.hidden = !t.unidades; });
    var bar = $('[data-cart-bar]');
    if (bar) {
      bar.hidden = !t.unidades;
      $('[data-cart-bar-text]').textContent = t.unidades + (t.unidades === 1 ? ' producto' : ' productos') + ' · ' + (t.total ? euros(t.total) : 'a consultar');
    }
    var items = $('[data-cesta-items]');
    var ids = Object.keys(carrito);
    if (!ids.length) {
      items.innerHTML = '<div class="cesta-vacia"><p>Tu pedido está vacío.</p><p>Añade tablas, bocados o cajas y te lo preparamos con ' + TIENDA.diasAntelacion + ' días de antelación.</p></div>';
    } else {
      items.innerHTML = ids.map(function (id) {
        var p = byId[id], n = carrito[id];
        return '<div class="cesta-item">' +
          '<div class="cesta-thumb">' + media(p) + '</div>' +
          '<div class="cesta-item-info"><strong>' + esc(p.nombre) + '</strong><span>' + esc(p.formato) + '</span>' +
            '<div class="qty qty-sm"><button type="button" data-cesta-qty="' + id + '" data-d="-1" aria-label="Quitar uno">−</button><span>' + n + '</span><button type="button" data-cesta-qty="' + id + '" data-d="1" aria-label="Añadir uno">+</button></div>' +
          '</div>' +
          '<div class="cesta-item-precio">' + (p.precio != null ? euros(p.precio * n) : '<em>Consultar</em>') +
            '<button type="button" class="cesta-quitar" data-cesta-quitar="' + id + '">Quitar</button></div>' +
        '</div>';
      }).join('');
    }
    var min = TIENDA.pedidoMinimo;
    var pct = Math.min(100, Math.round(t.total / min * 100));
    $('[data-cesta-total]').textContent = t.total ? euros(t.total) : '0 €';
    $('[data-cesta-consultar]').hidden = !t.consultar;
    var prog = $('[data-cesta-progreso]');
    prog.style.setProperty('--p', pct + '%');
    $('[data-cesta-progreso-texto]').innerHTML = t.total >= min
      ? '<strong>Pedido mínimo alcanzado.</strong> ¡Ya puedes confirmar tu pedido!'
      : (t.consultar && !t.total ? 'Pedido mínimo de catering: ' + euros(min) + '. Te confirmamos el precio de lo que has añadido.'
        : 'Te faltan <strong>' + euros(min - t.total) + '</strong> para el pedido mínimo de ' + euros(min) + '.');
    $('[data-cesta-form]').hidden = !ids.length;
    if (grid) $$('.producto', grid).forEach(function (card) {
      var id = card.getAttribute('data-id');
      var e = $('.producto-en-carrito', card);
      if (carrito[id]) {
        if (!e) { e = document.createElement('span'); e.className = 'producto-en-carrito'; $('.producto-body', card).appendChild(e); }
        e.textContent = carrito[id] + ' en tu pedido';
      } else if (e) e.remove();
    });
  }

  /* Fecha mínima: N días hábiles (lunes–viernes) desde hoy */
  function fechaMinima() {
    var d = new Date(); d.setHours(12, 0, 0, 0);
    var n = 0;
    while (n < TIENDA.diasAntelacion) {
      d.setDate(d.getDate() + 1);
      var w = d.getDay();
      if (w !== 0 && w !== 6) n++;
    }
    return d;
  }
  function iso(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function bonita(isoStr) {
    var p = isoStr.split('-');
    var d = new Date(+p[0], +p[1] - 1, +p[2]);
    return d.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
  }

  function zona(cp) {
    cp = String(cp || '').trim();
    if (!/^\d{5}$/.test(cp)) return null;
    var n = parseInt(cp, 10);
    if (n >= TIENDA.cpBarcelona[0] && n <= TIENDA.cpBarcelona[1]) return { ok: true, txt: 'Entregamos en tu zona (Barcelona ciudad).' };
    if (cp.slice(0, 2) === '08') return { ok: 'consultar', txt: 'Provincia de Barcelona: entregamos en muchas zonas; te confirmamos coste y disponibilidad.' };
    return { ok: false, txt: 'De momento no llegamos a este código postal. Escríbenos y buscamos una solución.' };
  }

  function mostrarZona(input, out) {
    var z = zona(input.value);
    out.className = 'cp-result' + (z ? (z.ok === true ? ' is-ok' : z.ok === 'consultar' ? ' is-maybe' : ' is-no') : '');
    out.textContent = z ? z.txt : (input.value ? 'Introduce un código postal de 5 cifras.' : '');
  }

  function enviarPedido(form) {
    var ok = true;
    $$('.field', form).forEach(function (f) { f.classList.remove('has-error'); });
    function err(name) { var el = form.elements[name]; var f = el && el.closest('.field'); if (f) f.classList.add('has-error'); ok = false; }
    var modo = form.elements.modo.value;
    var nombre = form.elements.nombre.value.trim();
    var tel = form.elements.telefono.value.trim();
    var fecha = form.elements.fecha.value;
    var franja = form.elements.franja.value;
    var dir = form.elements.direccion.value.trim();
    var cp = form.elements.cp.value.trim();
    if (!nombre) err('nombre');
    if (!/^[+\d][\d\s]{8,}$/.test(tel)) err('telefono');
    if (!fecha || fecha < iso(fechaMinima())) err('fecha');
    if (!franja) err('franja');
    if (modo === 'domicilio') { if (!dir) err('direccion'); if (!/^\d{5}$/.test(cp)) err('cp'); }
    if (!form.elements.consent.checked) err('consent');
    if (!ok) { var first = $('.has-error input, .has-error select', form); if (first) first.focus(); return; }

    var t = totales();
    var lineas = Object.keys(carrito).map(function (id) {
      var p = byId[id], n = carrito[id];
      return '• ' + n + ' × ' + p.nombre + ' (' + p.formato + ')' + (p.precio != null ? ' — ' + euros(p.precio * n) : ' — a consultar');
    });
    var txt = '¡Hola THYME! Quiero hacer este pedido:\n\n' + lineas.join('\n') +
      '\n\nSubtotal: ' + euros(t.total) + (t.consultar ? ' (+ productos a consultar)' : '') +
      '\n\n' + (modo === 'domicilio' ? '🚚 Entrega a domicilio' : '🏠 Recogida en vuestro espacio') +
      '\n📅 ' + bonita(fecha) + ', ' + franja +
      (modo === 'domicilio' ? '\n📍 ' + dir + ', ' + cp : '') +
      '\n👤 ' + nombre + ' · ' + tel +
      (form.elements.notas.value.trim() ? '\n📝 ' + form.elements.notas.value.trim() : '') +
      '\n\n¿Me confirmáis disponibilidad' + (modo === 'domicilio' ? ' y coste de envío' : '') + '?';
    window.open('https://wa.me/' + TIENDA.whatsapp + '?text=' + encodeURIComponent(txt), '_blank', 'noopener');
    $('[data-cesta-ok]').hidden = false;
    form.hidden = true;
  }

  /* ---------------- AVISO FLOTANTE ---------------- */
  var toast = $('[data-toast]'), toastT;
  function aviso(txt) {
    if (!toast) return;
    toast.innerHTML = '<span>' + esc(txt) + '</span><button type="button" data-abrir-cesta>Ver pedido</button>';
    toast.classList.add('is-visible');
    clearTimeout(toastT);
    toastT = setTimeout(function () { toast.classList.remove('is-visible'); }, 3200);
  }

  /* ---------------- EVENTOS ---------------- */
  document.addEventListener('click', function (e) {
    var t = e.target, el;
    if ((el = t.closest('[data-cat]'))) {
      estado.cat = el.getAttribute('data-cat'); render();
      var m = $('.catalogo-main');
      if (m && m.getBoundingClientRect().top < 0) m.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    if ((el = t.closest('[data-reset]'))) {
      estado = { cat: 'todos', veg: false, singluten: false, orden: 'recomendado', q: '' };
      $$('[data-filtro]').forEach(function (i) { i.checked = false; });
      var s = $('[data-buscar]'); if (s) s.value = '';
      var o = $('[data-orden]'); if (o) o.value = 'recomendado';
      render(); return;
    }
    if ((el = t.closest('[data-anadir]'))) { anadir(el.getAttribute('data-anadir'), 1); return; }
    if ((el = t.closest('[data-abrir]'))) { e.preventDefault(); abrirFicha(el.getAttribute('data-abrir')); return; }
    if ((el = t.closest('[data-ficha-qty]'))) {
      var i = $('[data-ficha-n]'); i.value = Math.min(99, Math.max(1, (parseInt(i.value, 10) || 1) + parseInt(el.getAttribute('data-ficha-qty'), 10))); return;
    }
    if ((el = t.closest('[data-ficha-anadir]'))) {
      anadir(el.getAttribute('data-ficha-anadir'), parseInt($('[data-ficha-n]').value, 10) || 1);
      el.textContent = '✓ Añadido'; setTimeout(function () { el.textContent = 'Añadir más'; }, 1400); return;
    }
    if (t.closest('[data-ficha-cerrar]')) { cerrarFicha(); return; }
    if (t.closest('[data-abrir-cesta]')) { if (!ficha.hidden) cerrarFicha(); abrirCesta(); return; }
    if (t.closest('[data-cesta-cerrar]')) { cerrarCesta(); return; }
    if ((el = t.closest('[data-cesta-qty]'))) { var id = el.getAttribute('data-cesta-qty'); fijar(id, (carrito[id] || 0) + parseInt(el.getAttribute('data-d'), 10)); return; }
    if ((el = t.closest('[data-cesta-quitar]'))) { fijar(el.getAttribute('data-cesta-quitar'), 0); return; }
    if (t.closest('[data-cesta-nuevo]')) { $('[data-cesta-ok]').hidden = true; $('[data-cesta-form]').hidden = false; return; }
    if (t.closest('[data-cesta-vaciar]')) { carrito = {}; guardar(); pintarCarrito(); $('[data-cesta-ok]').hidden = true; render(); return; }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (ficha && !ficha.hidden) cerrarFicha();
    else if (cesta && !cesta.hidden) cerrarCesta();
  });

  $$('[data-filtro]').forEach(function (i) {
    i.addEventListener('change', function () { estado[i.getAttribute('data-filtro')] = i.checked; render(); });
  });
  var orden = $('[data-orden]');
  if (orden) orden.addEventListener('change', function () { estado.orden = orden.value; render(); });
  var buscar = $('[data-buscar]');
  if (buscar) buscar.addEventListener('input', function () { estado.q = buscar.value; render(); });

  /* Comprobador de código postal (barra superior y cesta) */
  $$('[data-cp-check]').forEach(function (box) {
    var inp = $('input', box), out = $('[data-cp-out]', box);
    inp.addEventListener('input', function () { mostrarZona(inp, out); });
  });

  /* Formulario de pedido */
  var form = $('[data-cesta-form]');
  if (form) {
    var fmin = fechaMinima();
    form.elements.fecha.min = iso(fmin);
    form.elements.fecha.value = iso(fmin);
    $('[data-fecha-hint]').textContent = 'Primera fecha disponible: ' + bonita(iso(fmin)) + '.';
    form.elements.franja.innerHTML = '<option value="">Elige una franja</option>' + TIENDA.franjas.map(function (f) { return '<option>' + f + '</option>'; }).join('');
    $$('input[name="modo"]', form).forEach(function (r) {
      r.addEventListener('change', function () { form.classList.toggle('is-recogida', form.elements.modo.value === 'recogida'); });
    });
    var cpIn = form.elements.cp;
    cpIn.addEventListener('input', function () { mostrarZona(cpIn, $('[data-cesta-cp-out]')); });
    form.addEventListener('submit', function (e) { e.preventDefault(); enviarPedido(form); });
  }

  /* Calculadora de cantidades */
  var calc = $('[data-calc]');
  if (calc) {
    var personas = $('[name="calc-personas"]', calc), salida = $('[data-calc-result]', calc);
    var calcular = function () {
      var tipo = $('[name="calc-tipo"]:checked', calc);
      var n = parseInt(personas.value, 10);
      if (!tipo || !n || n < 1) { salida.innerHTML = 'Elige el tipo de cóctel e indica cuántas personas sois.'; return; }
      var min = tipo.value === 'comida' ? 12 : 6, max = tipo.value === 'comida' ? 15 : 8;
      var tablas = Math.ceil(n / (tipo.value === 'comida' ? 2 : 4));
      salida.innerHTML = 'Para <strong>' + n + ' personas</strong>: entre <strong>' + (min * n) + ' y ' + (max * n) + ' piezas</strong> (' + min + '–' + max + ' por persona), o unas <strong>' + tablas + ' tablas para compartir</strong> de 2 personas.';
    };
    calc.addEventListener('input', calcular);
    calc.addEventListener('change', calcular);
  }

  /* Estado inicial */
  var h = (location.hash || '').replace('#', '');
  if (CATEGORIAS[h]) estado.cat = h;
  render();
  pintarCarrito();
  if (byId[h]) abrirFicha(h);
})();
