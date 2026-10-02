/* =========================================================
   THYME — Analítica sin cookies
   ---------------------------------------------------------
   QUÉ HACE
   Cuenta visitas y las cuatro cosas que de verdad importan en
   este negocio: cuánta gente reserva mesa, cuánta pide
   presupuesto de evento, cuánta termina un pedido y cuánta
   pulsa WhatsApp.

   QUÉ NO HACE
   No pone cookies, no guarda nada en el navegador y no manda
   datos personales. No sabe quién es nadie: solo cuántos.

   CÓMO SE ENCIENDE
   Está APAGADA. Para encenderla:
     1. Crea una cuenta en uno de los servicios de abajo.
     2. Escribe aquí el proveedor y tu identificador.
     3. Cambia el texto de la política de cookies (te lo paso
        aparte: ahora dice que NO usas analítica, y dejaría de
        ser cierto).
   Mientras SITIO esté vacío, este archivo no hace nada: no
   carga nada y no envía nada.
   ========================================================= */
(function () {
  'use strict';

  /* ---------- CONFIGURACIÓN ---------- */
  var PROVEEDOR = 'cloudflare';   /* 'cloudflare' | 'plausible' | 'goatcounter' */
  var SITIO     = '';             /* <-- tu identificador. Vacío = apagada. */
  var DOMINIO   = 'andreuufl.github.io';   /* solo lo usa plausible */

  if (!SITIO) return;             /* apagada: no carga nada */

  /* Si el visitante ha pedido no ser rastreado, se respeta. */
  if (navigator.doNotTrack === '1' || window.doNotTrack === '1') return;

  /* ---------- CARGA DEL MEDIDOR ---------- */
  var s = document.createElement('script');
  s.defer = true;

  if (PROVEEDOR === 'cloudflare') {
    s.src = 'https://static.cloudflareinsights.com/beacon.min.js';
    s.setAttribute('data-cf-beacon', '{"token":"' + SITIO + '"}');
  } else if (PROVEEDOR === 'plausible') {
    s.src = 'https://plausible.io/js/script.tagged-events.js';
    s.setAttribute('data-domain', DOMINIO);
  } else if (PROVEEDOR === 'goatcounter') {
    s.src = 'https://gc.zgo.at/count.js';
    s.setAttribute('data-goatcounter', 'https://' + SITIO + '.goatcounter.com/count');
  } else {
    return;
  }
  document.head.appendChild(s);

  /* ---------- LOS CUATRO MOMENTOS QUE IMPORTAN ---------- */
  function anotar(nombre) {
    try {
      if (window.plausible) { window.plausible(nombre); return; }
      if (window.goatcounter && window.goatcounter.count) {
        window.goatcounter.count({ path: 'evento/' + nombre, title: nombre, event: true });
      }
      /* Cloudflare no admite eventos propios: se queda con las visitas. */
    } catch (err) {}
  }
  window.THYME = window.THYME || {};
  window.THYME.anotar = anotar;

  document.addEventListener('submit', function (e) {
    var f = e.target;
    if (!f || f.tagName !== 'FORM') return;
    if (f.id === 'reserva-form') anotar('reserva-mesa');
    else if (f.id === 'events-form') anotar('presupuesto-evento');
    else if (f.hasAttribute('data-cesta-form')) anotar('pedido-domicilio');
  }, true);

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href*="wa.me"]');
    if (a) anotar('whatsapp');
  }, true);
})();
