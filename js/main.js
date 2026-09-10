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

  /* ---------- Header: sombra + ocultar al bajar / mostrar al subir (móvil) + menú móvil ---------- */
  var header = document.querySelector('.site-header');
  if (header) {
    var hideHeaderMq = window.matchMedia('(max-width: 1140px)');
    var reduceMotionHeader = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var lastScrollY = window.scrollY;
    var onScroll = function () {
      var y = window.scrollY;
      header.classList.toggle('is-scrolled', y > 12);

      if (!reduceMotionHeader && hideHeaderMq.matches && !header.classList.contains('nav-open')) {
        if (y > lastScrollY && y > 120) {
          header.classList.add('is-hidden');
        } else {
          header.classList.remove('is-hidden');
        }
      } else {
        header.classList.remove('is-hidden');
      }
      lastScrollY = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    var toggle = header.querySelector('.nav-toggle');
    if (toggle) {
      toggle.addEventListener('click', function () {
        var open = header.classList.toggle('nav-open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (open) header.classList.remove('is-hidden');
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
  var heroParallaxMq = window.matchMedia('(min-width: 981px)');

  var scrollTicking = false;
  function updateOnScroll() {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = (docHeight > 0 ? Math.min(scrollTop / docHeight, 1) * 100 : 0) + '%';

    if (!reduceMotion && heroSection) {
      var heroHeight = heroSection.offsetHeight;
      var progress = Math.min(scrollTop / heroHeight, 1);
      if (heroParallaxMq.matches) {
        if (heroBgEl) heroBgEl.style.transform = 'translateY(' + (scrollTop * 0.16) + 'px)';
        if (heroSceneEl) heroSceneEl.style.transform = 'translateY(' + (scrollTop * 0.1) + 'px)';
      } else {
        if (heroBgEl) heroBgEl.style.transform = '';
        if (heroSceneEl) heroSceneEl.style.transform = '';
      }
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
      '.hotspot-photo',
      '.hotspot-detail',
      '.events-photo',
      '.events-facts li',
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


  /* ---------- Foto anotada: cambia según la hora, y al tocar un número se actualiza el panel ---------- */
  (function () {
    var root = document.querySelector('[data-hotspot-root]');
    if (!root) return;
    var imgEl = root.querySelector('[data-hotspot-img]');
    var sourceEl = root.querySelector('[data-hotspot-source]');
    var buttonsWrap = root.querySelector('[data-hotspot-buttons]');
    var detail = root.querySelector('[data-hotspot-detail]');
    var numEl = detail.querySelector('[data-hotspot-detail-num]');
    var titleEl = detail.querySelector('[data-hotspot-detail-title]');
    var descEl = detail.querySelector('[data-hotspot-detail-desc]');

    var sets = {
      manana: {
        base: 'hero-mediterranea-annotated',
        alt: 'Tabla mediterránea ALMA con los ingredientes numerados del 1 al 8',
        points: [
          { top: 19, left: 51, label: 'Salami enrollado a mano', desc: 'Cortado fino y enrollado en el momento, para picar sin necesidad de cubiertos.' },
          { top: 27, left: 68, label: 'Brie y queso curado', desc: 'Dos texturas distintas en la misma tabla: cremoso por un lado, curado por otro.' },
          { top: 42, left: 87, label: 'Uvas de temporada', desc: 'Elegidas cada semana según lo que esté en su mejor momento.' },
          { top: 48, left: 59, label: 'Jamón cortado a mano', desc: 'A cuchillo, justo antes de servir — nada de bandejas precortadas.' },
          { top: 54, left: 66, label: 'Miel de flores', desc: 'El contrapunto dulce que rompe con lo salado en el momento justo.' },
          { top: 70, left: 53, label: 'Pan artesano del día', desc: 'Horneado la misma mañana, nunca el día anterior.' },
          { top: 58, left: 10, label: 'Higos frescos', desc: 'De temporada, partidos al momento para que no pierdan su punto.' },
          { top: 72, left: 27, label: 'Aceitunas aliñadas', desc: 'Con receta propia, no de bote genérico.' }
        ]
      },
      mediodia: {
        base: 'tabla-mixta-annotated',
        alt: 'Tabla Mixta ALMA con los ingredientes numerados del 1 al 6',
        points: [
          { top: 20, left: 47, label: 'Rosa de queso', desc: 'Cortado y enrollado a mano — la pieza más fotografiada de la mesa.' },
          { top: 62, left: 18, label: 'Bola de queso especiada', desc: 'Con finas hierbas, para untar en pan o cracker.' },
          { top: 60, left: 47, label: 'Miel de flores', desc: 'El contrapunto dulce que rompe con lo salado en el momento justo.' },
          { top: 38, left: 12, label: 'Aceitunas aliñadas', desc: 'Con receta propia, no de bote genérico.' },
          { top: 78, left: 65, label: 'Rosetones en pincho', desc: 'Salami y queso en el mismo bocado, listos para picar sin cubiertos.' },
          { top: 15, left: 82, label: 'Mermelada casera', desc: 'De temporada, hecha en casa sin conservantes.' }
        ]
      },
      noche: {
        base: 'hero-mesa-flores-annotated',
        alt: 'Tablas individuales ALMA con flores comestibles, ingredientes numerados del 1 al 6',
        points: [
          { top: 20, left: 57, label: 'Rosetón con flores', desc: 'Cada tabla individual lleva su propia flor comestible de temporada.' },
          { top: 38, left: 38, label: 'Tabla individual', desc: 'Una por invitado — nadie tiene que estirar el brazo para servirse.' },
          { top: 78, left: 45, label: 'Abanico de quesos', desc: 'Cortados finos, para que se sirvan solos sin necesidad de cuchillo.' },
          { top: 63, left: 20, label: 'Higos y moras', desc: 'De temporada, combinados con queso curado y pistachos.' },
          { top: 30, left: 80, label: 'Flores comestibles', desc: 'Elegidas para combinar con la paleta de color de tu boda o evento.' },
          { top: 88, left: 78, label: 'Uvas y conos de salami', desc: 'El cierre perfecto de cada tabla individual.' }
        ]
      },
      madrugada: {
        base: 'hero-torre-annotated',
        alt: 'Torre ALMA de 3 pisos con los ingredientes numerados del 1 al 6',
        points: [
          { top: 12, left: 50, label: 'Jamón cocido enrollado', desc: 'El piso de arriba, pensado para servirse primero y sin esperas.' },
          { top: 44, left: 50, label: 'Rosetón de salami', desc: 'Repetido en cada piso para que nunca te quede lejos.' },
          { top: 32, left: 22, label: 'Uvas de temporada', desc: 'Verdes y moradas, elegidas cada semana.' },
          { top: 80, left: 48, label: 'Mozzarella fresca', desc: 'En bolitas, para picar de un solo bocado.' },
          { top: 85, left: 20, label: 'Rosas de salami', desc: 'El piso de abajo, pensado para servir a más gente a la vez.' },
          { top: 53, left: 38, label: 'Galletas saladas', desc: 'La base perfecta para el queso curado.' }
        ]
      }
    };

    var hour = new Date().getHours();
    var key = (hour >= 6 && hour < 12) ? 'manana'
      : (hour >= 12 && hour < 18) ? 'mediodia'
      : (hour >= 18 && hour < 23) ? 'noche'
      : 'madrugada';
    var data = sets[key];

    imgEl.src = 'assets/img/' + data.base + '.jpg';
    if (sourceEl) sourceEl.srcset = 'assets/img/' + data.base + '.webp';
    imgEl.alt = data.alt;

    buttonsWrap.innerHTML = '';
    var hotspots = [];
    data.points.forEach(function (pt, i) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'hotspot';
      btn.style.top = pt.top + '%';
      btn.style.left = pt.left + '%';
      btn.setAttribute('data-hotspot-num', i + 1);
      btn.setAttribute('data-hotspot-label', pt.label);
      btn.setAttribute('data-hotspot-desc', pt.desc);
      btn.setAttribute('aria-label', (i + 1) + '. ' + pt.label);
      buttonsWrap.appendChild(btn);
      hotspots.push(btn);
    });

    var activeHotspot = null;

    function selectHotspot(btn) {
      if (activeHotspot === btn) return;
      if (activeHotspot) activeHotspot.classList.remove('is-active');
      activeHotspot = btn;
      btn.classList.add('is-active');

      detail.classList.add('is-changing');
      setTimeout(function () {
        numEl.textContent = btn.getAttribute('data-hotspot-num') || '';
        titleEl.textContent = btn.getAttribute('data-hotspot-label') || '';
        descEl.textContent = btn.getAttribute('data-hotspot-desc') || '';
        detail.classList.remove('is-changing');
      }, 140);
    }

    hotspots.forEach(function (btn) {
      btn.addEventListener('mouseenter', function () { selectHotspot(btn); });
      btn.addEventListener('focus', function () { selectHotspot(btn); });
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        selectHotspot(btn);
      });
    });

    /* Empieza mostrando el primero como activo, para que el panel nunca esté vacío */
    if (hotspots[0]) {
      hotspots[0].classList.add('is-active');
      activeHotspot = hotspots[0];
      numEl.textContent = '1';
      titleEl.textContent = data.points[0].label;
      descEl.textContent = data.points[0].desc;
    }
  })();

  /* ---------- Botón magnético (se deja atraer sutilmente por el cursor) ---------- */
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('[data-magnetic]').forEach(function (btn) {
      btn.addEventListener('pointermove', function (e) {
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = 'translate(' + (x * 0.25) + 'px,' + (y * 0.35) + 'px)';
      });
      btn.addEventListener('pointerleave', function () {
        btn.style.transform = 'translate(0,0)';
      });
    });
  }

  /* ---------- Foto del hero: cambia según la hora real de quien visita ---------- */
  (function () {
    var imgEl = document.querySelector('[data-hero-photo-img]');
    var sourceEl = document.querySelector('[data-hero-photo-source]');
    if (!imgEl) return;

    var hour = new Date().getHours();
    var photo;

    if (hour >= 6 && hour < 12) {
      /* Mañana: pan recién hecho, fruta fresca */
      photo = {
        base: 'hero-mediterranea-square',
        alt: 'Tabla mediterránea ALMA con pan artesano, jamón, quesos, higos y fruta fresca'
      };
    } else if (hour >= 12 && hour < 18) {
      /* Mediodía / tarde: la tabla mixta, la más pedida */
      photo = {
        base: 'tabla-mixta-square',
        alt: 'Tabla Mixta ALMA con rosetones de embutido y queso en pinchos, brie, encurtidos y miel'
      };
    } else if (hour >= 18 && hour < 23) {
      /* Noche: mesa preparada para un evento */
      photo = {
        base: 'hero-mesa-flores-square',
        alt: 'Varias tablas individuales decoradas con flores comestibles, servidas para un evento'
      };
    } else {
      /* Madrugada: la torre, para planes de última hora con mucha gente */
      photo = {
        base: 'hero-torre-square',
        alt: 'Torre de tres pisos de embutidos, quesos y fruta para grupos grandes'
      };
    }

    var jpg = 'assets/img/' + photo.base + '.jpg';
    var webp = 'assets/img/' + photo.base + '.webp';

    /* Si ya es la que está precargada, no hace falta tocar nada */
    if (imgEl.getAttribute('src') === jpg) return;

    imgEl.style.transition = 'opacity .4s ease';
    imgEl.style.opacity = '0';
    var swap = function () {
      if (sourceEl) sourceEl.srcset = webp;
      imgEl.src = jpg;
      imgEl.alt = photo.alt;
      imgEl.style.opacity = '1';
    };
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      swap();
    } else {
      setTimeout(swap, 120);
    }
  })();

  /* ---------- Foco de luz que sigue al ratón en el hero ---------- */
  var heroSectionGlow = document.querySelector('.hero');
  if (heroSectionGlow && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    heroSectionGlow.addEventListener('pointermove', function (e) {
      var rect = heroSectionGlow.getBoundingClientRect();
      var mx = ((e.clientX - rect.left) / rect.width) * 100;
      var my = ((e.clientY - rect.top) / rect.height) * 100;
      heroSectionGlow.style.setProperty('--mx', mx + '%');
      heroSectionGlow.style.setProperty('--my', my + '%');
    });
  }

  /* ---------- Contadores animados (estadísticas del hero) ---------- */
  (function () {
    var counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;
    var reduceMotionCounters = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function animateCounter(el) {
      var target = parseFloat(el.getAttribute('data-counter'));
      var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
      var suffix = el.getAttribute('data-suffix') || '';
      var useComma = el.hasAttribute('data-decimal-comma');
      if (reduceMotionCounters) {
        var finalVal = target.toFixed(decimals);
        if (useComma) finalVal = finalVal.replace('.', ',');
        el.textContent = finalVal + suffix;
        return;
      }
      var start = null;
      var duration = 1400;
      function step(ts) {
        if (!start) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var current = (target * eased).toFixed(decimals);
        if (useComma) current = current.replace('.', ',');
        el.textContent = current + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    if (!('IntersectionObserver' in window)) {
      counters.forEach(animateCounter);
      return;
    }
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { counterObserver.observe(el); });
  })();

  /* ---------- Tilt 3D del escenario del hero (solo escritorio/tablet) ---------- */
  var scene = document.querySelector('.hero-scene');
  var stage = document.querySelector('.scene-stage');
  var tiltMq = window.matchMedia('(min-width: 981px)');
  if (scene && stage && tiltMq.matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
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
     Lightbox: detalle de tabla al hacer clic en "Lo más solicitado"
     ============================================================ */
  (function () {
    var lightbox = document.querySelector('[data-lightbox]');
    if (!lightbox) return;
    var imgEl = lightbox.querySelector('[data-lightbox-img]');
    var tagEl = lightbox.querySelector('[data-lightbox-tag]');
    var titleEl = lightbox.querySelector('[data-lightbox-title]');
    var descEl = lightbox.querySelector('[data-lightbox-desc]');
    var ctaEl = lightbox.querySelector('[data-lightbox-cta]');
    var lastTrigger = null;

    function openLightbox(trigger) {
      var img = trigger.querySelector('img');
      imgEl.src = img.currentSrc || img.src;
      imgEl.alt = img.alt || '';
      tagEl.textContent = trigger.getAttribute('data-tag') || '';
      titleEl.textContent = trigger.getAttribute('data-title') || '';
      descEl.textContent = trigger.getAttribute('data-desc') || '';
      var tablaValue = trigger.getAttribute('data-tabla-value');
      if (tablaValue) {
        ctaEl.setAttribute('data-tabla-value', tablaValue);
      } else {
        ctaEl.removeAttribute('data-tabla-value');
      }
      lastTrigger = trigger;
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      lightbox.querySelector('.lightbox-close').focus();
    }

    function closeLightbox() {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastTrigger) lastTrigger.focus();
    }

    document.querySelectorAll('[data-lightbox-trigger]').forEach(function (trigger) {
      trigger.addEventListener('click', function () { openLightbox(trigger); });
    });
    lightbox.querySelectorAll('[data-lightbox-close]').forEach(function (el) {
      el.addEventListener('click', closeLightbox);
    });
    ctaEl.addEventListener('click', function () {
      var val = ctaEl.getAttribute('data-tabla-value');
      var select = document.getElementById('reserva-tabla');
      if (val && select) select.value = val;
      closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
    });
  })();

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
     Formulario de bodas y eventos → validación + envío por WhatsApp
     ============================================================ */
  (function () {
    var eventsForm = document.querySelector('#events-form');
    if (!eventsForm) return;

    var fechaInput = eventsForm.querySelector('#events-fecha');
    if (fechaInput) {
      var today = new Date();
      fechaInput.min = today.toISOString().slice(0, 10);
    }

    var MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    function formatFechaEs(iso) {
      if (!iso) return '';
      var d = new Date(iso + 'T00:00:00');
      if (isNaN(d.getTime())) return iso;
      return d.getDate() + ' de ' + MESES[d.getMonth()] + ' de ' + d.getFullYear();
    }

    var eFields = {
      nombre: { el: eventsForm.querySelector('#events-nombre'), validate: function (v) { return v.trim().length >= 2; } },
      tipo: { el: eventsForm.querySelector('#events-tipo'), validate: function (v) { return !!v; } },
      email: { el: eventsForm.querySelector('#events-email'), validate: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); } },
      telefono: { el: eventsForm.querySelector('#events-telefono'), validate: function (v) { return /^[+\d][\d\s]{7,}$/.test(v.trim()); } },
      fecha: { el: eventsForm.querySelector('#events-fecha'), validate: function (v) { return !!v; } },
      invitados: { el: eventsForm.querySelector('#events-invitados'), validate: function (v) { return v && parseInt(v, 10) >= 10; } },
      ubicacion: { el: eventsForm.querySelector('#events-ubicacion'), validate: function (v) { return v.trim().length >= 2; } }
    };

    function eFieldWrap(el) { return el ? el.closest('.field') : null; }
    function eShowError(key) { var w = eFieldWrap(eFields[key].el); if (w) w.classList.add('has-error'); }
    function eClearError(key) { var w = eFieldWrap(eFields[key].el); if (w) w.classList.remove('has-error'); }

    Object.keys(eFields).forEach(function (key) {
      var f = eFields[key];
      if (!f.el) return;
      f.el.addEventListener('input', function () { if (f.validate(f.el.value)) eClearError(key); });
      f.el.addEventListener('blur', function () { if (!f.validate(f.el.value)) eShowError(key); else eClearError(key); });
    });

    eventsForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      var firstInvalid = null;
      Object.keys(eFields).forEach(function (key) {
        var f = eFields[key];
        if (!f.el) return;
        if (!f.validate(f.el.value)) {
          eShowError(key);
          valid = false;
          if (!firstInvalid) firstInvalid = f.el;
        } else {
          eClearError(key);
        }
      });
      if (!valid) {
        if (firstInvalid && firstInvalid.focus) firstInvalid.focus();
        return;
      }

      var nombre = eFields.nombre.el.value.trim();
      var tipoSel = eFields.tipo.el;
      var tipo = tipoSel.options[tipoSel.selectedIndex].text;
      var telefono = eFields.telefono.el.value.trim();
      var fechaLegible = formatFechaEs(eFields.fecha.el.value);
      var invitados = eFields.invitados.el.value.trim();
      var ubicacion = eFields.ubicacion.el.value.trim();
      var mensaje = (eventsForm.querySelector('#events-mensaje') || {}).value || '';

      var texto = 'Hola ALMA! Quiero pedir presupuesto para un evento:\n' +
        '- Nombre: ' + nombre + '\n' +
        '- Tipo de evento: ' + tipo + '\n' +
        '- Fecha aproximada: ' + fechaLegible + '\n' +
        '- Invitados: ' + invitados + '\n' +
        '- Ubicación: ' + ubicacion + '\n' +
        '- Teléfono: ' + telefono +
        (mensaje.trim() ? ('\n- Comentario: ' + mensaje.trim()) : '');

      var url = 'https://wa.me/34607864393?text=' + encodeURIComponent(texto);
      window.open(url, '_blank', 'noopener');

      var successBox = document.querySelector('[data-events-success]');
      if (successBox) successBox.classList.add('is-visible');

      var params = new URLSearchParams({ nombre: nombre, fecha: fechaLegible, tabla: tipo + ' — ' + invitados + ' invitados' });
      setTimeout(function () {
        window.location.href = 'gracias.html?' + params.toString();
      }, 1300);
    });
  })();

  /* ============================================================
     Botón "Volver arriba"
     ============================================================ */
  (function () {
    var backToTop = document.querySelector('[data-back-to-top]');
    if (!backToTop) return;
    var ticking = false;
    function toggle() {
      backToTop.classList.toggle('is-visible', window.scrollY > 500);
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(toggle);
        ticking = true;
      }
    }, { passive: true });
    toggle();
    backToTop.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
      });
    });
  })();

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
