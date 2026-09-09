/* ============================================================
   ALMA CATERING & EXPERIENCES — main.js
   Nav, tilt 3D del hero, selector de disponibilidad, validación
   de formulario y banner de cookies. Sin dependencias externas.
   ============================================================ */
(function () {
  'use strict';

  var WHATSAPP_NUMBER = '34607864393';

  /* ---------- Año en el footer ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Header: sombra al hacer scroll + menú móvil ---------- */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    var toggle = header.querySelector('.nav-toggle');
    if (toggle) {
      toggle.addEventListener('click', function () {
        var open = header.classList.toggle('nav-open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      header.querySelectorAll('.nav-links a').forEach(function (a) {
        a.addEventListener('click', function () {
          header.classList.remove('nav-open');
          toggle.setAttribute('aria-expanded', 'false');
        });
      });
    }
  }

  /* ============================================================
     Scroll: barra de progreso + parallax del hero
     ============================================================ */
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  progressBar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(progressBar);

  var heroSection = document.querySelector('.hero');
  var heroBgEl = document.querySelector('.hero-bg');
  var heroSceneEl = document.querySelector('.hero-scene');
  var heroCopyEl = document.querySelector('.hero-copy');

  var scrollTicking = false;
  function updateOnScroll() {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = (docHeight > 0 ? Math.min(scrollTop / docHeight, 1) * 100 : 0) + '%';

    if (!reduceMotion && heroSection) {
      var heroHeight = heroSection.offsetHeight;
      var progress = Math.min(scrollTop / heroHeight, 1);
      if (heroBgEl) heroBgEl.style.transform = 'translateY(' + (scrollTop * 0.16) + 'px)';
      if (heroSceneEl) heroSceneEl.style.transform = 'translateY(' + (scrollTop * 0.1) + 'px)';
      if (heroCopyEl) {
        heroCopyEl.style.opacity = String(1 - progress * 0.85);
        heroCopyEl.style.transform = 'translateY(' + (progress * 34) + 'px)';
      }
    }
    scrollTicking = false;
  }
  window.addEventListener('scroll', function () {
    if (!scrollTicking) {
      requestAnimationFrame(updateOnScroll);
      scrollTicking = true;
    }
  }, { passive: true });
  updateOnScroll();

  /* ============================================================
     Scroll reveal: las secciones aparecen al bajar por la página
     ============================================================ */
  (function () {
    var groups = [
      '.section-head',
      '.experience-visual',
      '.experience-facts li',
      '.tabla-card',
      '.showcase-card',
      '.step',
      '.testi-card',
      '.faq-item',
      '.insta-card',
      '.reserva-wrap',
      '.thanks-card'
    ];
    groups.forEach(function (selector) {
      document.querySelectorAll(selector).forEach(function (el, i) {
        el.classList.add('reveal');
        el.style.transitionDelay = Math.min(i * 70, 350) + 'ms';
      });
    });

    var revealTargets = document.querySelectorAll('.reveal');
    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    revealTargets.forEach(function (el) { observer.observe(el); });
  })();

  /* ---------- Tilt 3D del escenario del hero ---------- */
  var scene = document.querySelector('.hero-scene');
  var stage = document.querySelector('.scene-stage');
  if (scene && stage && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var rect, raf = null;
    var targetX = 0, targetY = 0, curX = 0, curY = 0;

    var animate = function () {
      curX += (targetX - curX) * 0.08;
      curY += (targetY - curY) * 0.08;
      stage.style.transform =
        'rotateX(' + curY + 'deg) rotateY(' + curX + 'deg)';
      raf = requestAnimationFrame(animate);
    };
    animate();

    scene.addEventListener('pointermove', function (e) {
      rect = scene.getBoundingClientRect();
      var px = (e.clientX - rect.left) / rect.width - 0.5;
      var py = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = px * 22;
      targetY = -py * 16;
    });
    scene.addEventListener('pointerleave', function () {
      targetX = 0;
      targetY = 0;
    });

    /* Ligero giro de entrada orquestado al cargar */
    stage.style.transform = 'rotateX(8deg) rotateY(-14deg)';
    window.addEventListener('load', function () {
      setTimeout(function () {
        targetX = 0;
        targetY = 0;
      }, 200);
    });
  }

  /* ============================================================
     Preguntas frecuentes — acordeón
     ============================================================ */
  (function () {
    var items = document.querySelectorAll('[data-faq-item]');
    items.forEach(function (item) {
      var btn = item.querySelector('[data-faq-toggle]');
      if (!btn) return;
      btn.addEventListener('click', function () {
        var wasOpen = item.classList.contains('is-open');
        items.forEach(function (i) {
          i.classList.remove('is-open');
          var b = i.querySelector('[data-faq-toggle]');
          if (b) b.setAttribute('aria-expanded', 'false');
        });
        if (!wasOpen) {
          item.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  })();

  /* ============================================================
     Inmersión tipo Apple: recorrido de las tablas fijado al scroll
     ============================================================ */
  (function () {
    var immersive = document.querySelector('[data-immersive]');
    if (!immersive) return;
    var panels = Array.prototype.slice.call(immersive.querySelectorAll('[data-panel]'));
    var dots = Array.prototype.slice.call(immersive.querySelectorAll('[data-dot-index]'));
    var introEl = immersive.querySelector('.immersive-intro');
    var hintEl = immersive.querySelector('[data-scroll-hint]');
    if (!panels.length) return;

    var mq = window.matchMedia('(min-width: 880px)');
    var reduceMotionImmersive = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function sizeSection() {
      if (!mq.matches) {
        immersive.style.height = '';
        return;
      }
      immersive.style.height = (panels.length * window.innerHeight) + 'px';
    }

    function setStatic() {
      panels.forEach(function (panel, i) {
        panel.style.opacity = i === 0 ? '1' : '0';
        panel.style.transform = 'none';
        panel.style.pointerEvents = i === 0 ? 'auto' : 'none';
      });
      if (dots.length) dots.forEach(function (d, i) { d.classList.toggle('is-active', i === 0); });
    }

    function update() {
      if (!mq.matches) { setStatic(); return; }
      var rect = immersive.getBoundingClientRect();
      var scrollable = immersive.offsetHeight - window.innerHeight;
      var raw = scrollable > 0 ? (-rect.top) / scrollable : 0;
      raw = Math.max(0, Math.min(1, raw));
      var activeFloat = raw * panels.length;
      var activeIndex = Math.min(panels.length - 1, Math.floor(activeFloat));

      panels.forEach(function (panel, i) {
        var dist = activeFloat - (i + 0.5);
        var opacity = Math.max(0, 1 - Math.abs(dist) * 1.5);
        var scale = 1 - Math.min(Math.abs(dist), 1) * 0.14;
        var translateY = dist * 46;
        panel.style.opacity = String(opacity);
        panel.style.transform = 'translateY(' + translateY + 'px) scale(' + scale + ')';
        panel.style.pointerEvents = opacity > 0.55 ? 'auto' : 'none';
      });

      dots.forEach(function (dot, i) { dot.classList.toggle('is-active', i === activeIndex); });
      if (introEl) introEl.style.opacity = String(Math.max(0, 1 - activeFloat * 2.4));
      if (hintEl) hintEl.style.opacity = raw < 0.06 ? '1' : '0';
    }

    sizeSection();

    if (reduceMotionImmersive) {
      panels.forEach(function (panel) {
        panel.style.opacity = '1';
        panel.style.transform = 'none';
        panel.style.pointerEvents = 'auto';
      });
      immersive.style.height = '';
    } else {
      var immersiveTicking = false;
      window.addEventListener('scroll', function () {
        if (!immersiveTicking) {
          requestAnimationFrame(function () { update(); immersiveTicking = false; });
          immersiveTicking = true;
        }
      }, { passive: true });
      window.addEventListener('resize', function () { sizeSection(); update(); });
      update();
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        var target = immersive.offsetTop + (i + 0.5) * window.innerHeight;
        window.scrollTo({ top: target, behavior: 'smooth' });
      });
    });

    immersive.querySelectorAll('[data-tabla-value]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var val = btn.getAttribute('data-tabla-value');
        var select = document.getElementById('reserva-tabla');
        if (val && select) select.value = val;
      });
    });
  })();

  /* ============================================================
     Selector de disponibilidad (día + hora)
     ============================================================ */
  var dayPicker = document.querySelector('[data-day-picker]');
  var timePicker = document.querySelector('[data-time-picker]');
  var dateHidden = document.querySelector('#reserva-fecha');
  var timeHidden = document.querySelector('#reserva-hora');
  var summaryEl = document.querySelector('[data-avail-summary]');

  var DOW = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  var MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

  /* Abierto todos los días, con turnos aproximadamente de 14:00 a 23:00. */
  var HORARIO_TURNOS = ['14:00', '16:00', '18:00', '20:00', '21:30', '23:00'];
  var SLOTS_BY_DOW = {
    0: HORARIO_TURNOS, // domingo
    1: HORARIO_TURNOS, // lunes
    2: HORARIO_TURNOS, // martes
    3: HORARIO_TURNOS, // miércoles
    4: HORARIO_TURNOS, // jueves
    5: HORARIO_TURNOS, // viernes
    6: HORARIO_TURNOS  // sábado
  };

  var selectedDate = null;
  var selectedTime = null;

  function buildDayPicker() {
    if (!dayPicker) return;
    var today = new Date();
    for (var i = 0; i < 15; i++) {
      var d = new Date(today);
      d.setDate(today.getDate() + i);
      var dow = d.getDay();
      var open = SLOTS_BY_DOW.hasOwnProperty(dow);

      var chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'day-chip' + (open ? '' : ' is-closed');
      chip.setAttribute('data-iso', d.toISOString().slice(0, 10));
      chip.setAttribute('data-dow', dow);
      chip.disabled = !open;
      chip.setAttribute('aria-pressed', 'false');
      chip.innerHTML =
        '<span class="dow">' + DOW[dow] + '</span>' +
        '<span class="num">' + d.getDate() + '</span>';

      if (open) {
        chip.addEventListener('click', function () {
          dayPicker.querySelectorAll('.day-chip').forEach(function (c) {
            c.classList.remove('is-selected');
            c.setAttribute('aria-pressed', 'false');
          });
          this.classList.add('is-selected');
          this.setAttribute('aria-pressed', 'true');
          selectedDate = this.getAttribute('data-iso');
          selectedTime = null;
          renderTimeSlots(parseInt(this.getAttribute('data-dow'), 10));
          updateAvailField();
        });
      }
      dayPicker.appendChild(chip);
    }
  }

  function renderTimeSlots(dow) {
    if (!timePicker) return;
    timePicker.innerHTML = '';
    var slots = SLOTS_BY_DOW[dow] || [];
    if (!slots.length) {
      timePicker.innerHTML = '<p class="time-picker-empty">Ese día no abrimos — prueba jueves a domingo.</p>';
      return;
    }
    slots.forEach(function (t) {
      var chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'time-chip';
      chip.textContent = t;
      chip.setAttribute('aria-pressed', 'false');
      chip.addEventListener('click', function () {
        timePicker.querySelectorAll('.time-chip').forEach(function (c) {
          c.classList.remove('is-selected');
          c.setAttribute('aria-pressed', 'false');
        });
        this.classList.add('is-selected');
        this.setAttribute('aria-pressed', 'true');
        selectedTime = t;
        updateAvailField();
      });
      timePicker.appendChild(chip);
    });
  }

  function formatDateEs(iso) {
    var d = new Date(iso + 'T00:00:00');
    return d.getDate() + ' de ' + MONTHS[d.getMonth()];
  }

  function updateAvailField() {
    if (dateHidden) dateHidden.value = selectedDate || '';
    if (timeHidden) timeHidden.value = selectedTime || '';
    var availField = document.querySelector('[data-field="disponibilidad"]');
    if (availField) availField.classList.remove('has-error');
    if (summaryEl) {
      summaryEl.textContent = (selectedDate && selectedTime)
        ? ('Seleccionado: ' + formatDateEs(selectedDate) + ' · ' + selectedTime + 'h')
        : 'Elige día y turno disponibles';
    }
  }

  buildDayPicker();
  if (timePicker) timePicker.innerHTML = '<p class="time-picker-empty">Primero elige un día</p>';

  /* ============================================================
     Formulario de reserva → validación + envío por WhatsApp
     ============================================================ */
  var form = document.querySelector('#reserva-form');
  if (form) {
    var fields = {
      nombre: { el: form.querySelector('#reserva-nombre'), validate: function (v) { return v.trim().length >= 2; }, msg: 'Escribe tu nombre.' },
      email: { el: form.querySelector('#reserva-email'), validate: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); }, msg: 'Introduce un email válido.' },
      telefono: { el: form.querySelector('#reserva-telefono'), validate: function (v) { return /^[+\d][\d\s]{7,}$/.test(v.trim()); }, msg: 'Introduce un teléfono válido.' },
      personas: { el: form.querySelector('#reserva-personas'), validate: function (v) { return v && parseInt(v, 10) >= 2; }, msg: 'Indica cuántos comensales sois (mín. 2).' },
      tabla: { el: form.querySelector('#reserva-tabla'), validate: function (v) { return !!v; }, msg: 'Elige una tabla.' }
    };

    function fieldWrap(el) {
      return el ? el.closest('.field') : null;
    }
    function showError(key) {
      var wrap = fieldWrap(fields[key].el);
      if (wrap) wrap.classList.add('has-error');
    }
    function clearError(key) {
      var wrap = fieldWrap(fields[key].el);
      if (wrap) wrap.classList.remove('has-error');
    }

    Object.keys(fields).forEach(function (key) {
      var f = fields[key];
      if (!f.el) return;
      f.el.addEventListener('input', function () {
        if (f.validate(f.el.value)) clearError(key);
      });
      f.el.addEventListener('blur', function () {
        if (!f.validate(f.el.value)) showError(key); else clearError(key);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      var firstInvalid = null;

      Object.keys(fields).forEach(function (key) {
        var f = fields[key];
        if (!f.el) return;
        if (!f.validate(f.el.value)) {
          showError(key);
          valid = false;
          if (!firstInvalid) firstInvalid = f.el;
        } else {
          clearError(key);
        }
      });

      var availField = document.querySelector('[data-field="disponibilidad"]');
      if (!selectedDate || !selectedTime) {
        if (availField) availField.classList.add('has-error');
        valid = false;
        if (!firstInvalid && availField) firstInvalid = availField;
      } else if (availField) {
        availField.classList.remove('has-error');
      }

      if (!valid) {
        if (firstInvalid && firstInvalid.focus) firstInvalid.focus();
        else if (firstInvalid) firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      var nombre = fields.nombre.el.value.trim();
      var email = fields.email.el.value.trim();
      var telefono = fields.telefono.el.value.trim();
      var personas = fields.personas.el.value.trim();
      var tablaSel = fields.tabla.el;
      var tablaTexto = tablaSel.options[tablaSel.selectedIndex].text;
      var mensaje = (form.querySelector('#reserva-mensaje') || {}).value || '';
      var fechaLegible = formatDateEs(selectedDate);

      var texto = 'Hola ALMA! Quiero reservar:\n' +
        '- Nombre: ' + nombre + '\n' +
        '- Día: ' + fechaLegible + ' a las ' + selectedTime + 'h\n' +
        '- Personas: ' + personas + '\n' +
        '- Tabla preferida: ' + tablaTexto + '\n' +
        '- Teléfono: ' + telefono +
        (mensaje.trim() ? ('\n- Comentario: ' + mensaje.trim()) : '');

      var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(texto);

      /* Abrir WhatsApp de forma síncrona con el clic, para que el navegador no lo bloquee */
      window.open(url, '_blank', 'noopener');

      var successBox = document.querySelector('.form-success');
      if (successBox) successBox.classList.add('is-visible');

      var params = new URLSearchParams({
        nombre: nombre,
        fecha: fechaLegible,
        hora: selectedTime,
        personas: personas,
        tabla: tablaTexto
      });

      /* Dejamos que se vea la animación de confirmación antes de navegar */
      setTimeout(function () {
        window.location.href = 'gracias.html?' + params.toString();
      }, 1300);
    });
  }

  /* ============================================================
     Banner de cookies
     ============================================================ */
  var cookieBanner = document.querySelector('[data-cookie-banner]');
  if (cookieBanner) {
    var KEY = 'bt_cookie_consent';
    var stored = null;
    try { stored = localStorage.getItem(KEY); } catch (err) { /* Safari privado, etc. */ }

    if (!stored) {
      setTimeout(function () { cookieBanner.classList.add('is-visible'); }, 900);
    }
    cookieBanner.querySelectorAll('[data-cookie-action]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var action = btn.getAttribute('data-cookie-action');
        try { localStorage.setItem(KEY, action); } catch (err) {}
        cookieBanner.classList.remove('is-visible');
      });
    });
  }
})();
