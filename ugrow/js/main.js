/* ============================================================
   UGROW — js/main.js
   ============================================================ */

// ── Calendly Integration ─────────────────────────────────────
// Replace with your real Calendly URL when ready.
// e.g. 'https://calendly.com/yourname/strategy-call'
const CALENDLY_URL = '';

// ── Utility: Debounce ────────────────────────────────────────
function debounce(fn, ms) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), ms);
  };
}

// ============================================================
// HEADER — Scroll-based styling
// ============================================================
(function initHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  function onScroll() {
    if (window.scrollY > 40) {
      header.style.background = 'rgba(11, 11, 18, 0.97)';
    } else {
      header.style.background = '';
    }
  }

  window.addEventListener('scroll', debounce(onScroll, 10), { passive: true });
})();

// ============================================================
// MOBILE MENU
// ============================================================
(function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const menu   = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;

  function openMenu() {
    menu.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menu.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    isOpen ? closeMenu() : openMenu();
  });

  // Close on link click
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      toggle.focus();
    }
  });
})();

// ============================================================
// REVEAL ON SCROLL (Intersection Observer)
// ============================================================
(function initReveal() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (prefersReduced) {
    items.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -48px 0px'
  });

  items.forEach(el => observer.observe(el));
})();

// ============================================================
// STICKY MOBILE CTA BAR
// ============================================================
(function initStickyBar() {
  const bar = document.getElementById('sticky-cta');
  if (!bar) return;

  let appeared = false;

  function onScroll() {
    const heroH = document.querySelector('.hero')?.offsetHeight || window.innerHeight;
    if (!appeared && window.scrollY > heroH * 0.6) {
      appeared = true;
      bar.classList.add('visible');
      bar.removeAttribute('aria-hidden');
    }
  }

  window.addEventListener('scroll', debounce(onScroll, 60), { passive: true });
})();

// ============================================================
// FAQ ACCORDION
// ============================================================
(function initFaq() {
  const faqList = document.getElementById('faq-list');
  if (!faqList) return;

  faqList.addEventListener('click', e => {
    const btn = e.target.closest('.faq-question');
    if (!btn) return;

    const isExpanded = btn.getAttribute('aria-expanded') === 'true';
    const answerId = btn.getAttribute('aria-controls');
    const answer   = document.getElementById(answerId);
    if (!answer) return;

    // Close all others
    faqList.querySelectorAll('.faq-question').forEach(otherBtn => {
      if (otherBtn !== btn) {
        otherBtn.setAttribute('aria-expanded', 'false');
        const otherAnswer = document.getElementById(otherBtn.getAttribute('aria-controls'));
        if (otherAnswer) otherAnswer.hidden = true;
      }
    });

    // Toggle current
    btn.setAttribute('aria-expanded', String(!isExpanded));
    answer.hidden = isExpanded;
  });

  // Keyboard support
  faqList.addEventListener('keydown', e => {
    const btn = e.target.closest('.faq-question');
    if (!btn) return;

    const buttons = [...faqList.querySelectorAll('.faq-question')];
    const idx = buttons.indexOf(btn);

    if (e.key === 'ArrowDown' && idx < buttons.length - 1) {
      e.preventDefault();
      buttons[idx + 1].focus();
    } else if (e.key === 'ArrowUp' && idx > 0) {
      e.preventDefault();
      buttons[idx - 1].focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      buttons[0].focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      buttons[buttons.length - 1].focus();
    }
  });
})();

// ============================================================
// BOOKING FORM
// ============================================================
(function initBookingForm() {
  const form        = document.getElementById('booking-form');
  const formSuccess = document.getElementById('form-success');
  const submitBtn   = document.getElementById('form-submit-btn');
  if (!form) return;

  function validateField(input) {
    const errorEl = document.getElementById('error-' + input.name);
    let message = '';

    if (input.required && !input.value.trim()) {
      message = 'This field is required.';
    } else if (input.type === 'email' && input.value.trim()) {
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(input.value.trim())) {
        message = 'Please enter a valid email address.';
      }
    }

    input.classList.toggle('invalid', !!message);
    if (errorEl) errorEl.textContent = message;
    return !message;
  }

  // Live validation on blur
  form.querySelectorAll('input[required], input[type="email"]').forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('invalid')) validateField(input);
    });
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();

    // Validate all required fields
    const requiredInputs = form.querySelectorAll('input[required]');
    let valid = true;
    requiredInputs.forEach(input => {
      if (!validateField(input)) valid = false;
    });

    if (!valid) return;

    // Show loading state
    const btnText    = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    submitBtn.disabled = true;
    btnText.hidden    = true;
    btnLoading.hidden = false;

    // Simulate async submission (no backend)
    await new Promise(resolve => setTimeout(resolve, 1200));

    form.hidden     = true;
    formSuccess.hidden = false;

    // If Calendly URL set, open it
    if (CALENDLY_URL) {
      window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer');
    }
  });
})();

// ============================================================
// DEMO CALENDAR (shown when CALENDLY_URL is empty)
// ============================================================
(function initDemoCalendar() {
  const calendarContainer = document.getElementById('demo-calendar');
  if (!calendarContainer) return;

  // If Calendly URL exists, swap calendar for an iframe/link
  if (CALENDLY_URL) {
    calendarContainer.innerHTML = `
      <h3 class="form-title calendar-title">Or pick a time directly</h3>
      <a href="${CALENDLY_URL}" target="_blank" rel="noopener noreferrer"
         class="btn btn-ghost btn-block" style="margin-top:8px;">
        Open Calendly to pick a time
      </a>
    `;
    return;
  }

  // Demo calendar state
  let currentDate   = new Date(2026, 9, 1); // October 2026
  let selectedDay   = null;
  let selectedSlot  = null;

  const monthLabel  = document.getElementById('cal-month-label');
  const calGrid     = document.getElementById('calendar-grid');
  const prevBtn     = document.getElementById('cal-prev');
  const nextBtn     = document.getElementById('cal-next');
  const timeSlotsEl = document.getElementById('time-slots');
  const slotLabel   = document.getElementById('time-slots-label');
  const slotsGrid   = document.getElementById('time-slots-grid');
  const calSuccess  = document.getElementById('calendar-success');

  const MONTHS = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
  ];

  // Available slots per weekday (Mon-Fri)
  const SLOTS = ['9:00 AM','10:30 AM','12:00 PM','2:00 PM','3:30 PM','5:00 PM'];

  function isAvailable(date) {
    const day  = date.getDay(); // 0 = Sun, 6 = Sat
    const now  = new Date();
    if (date < new Date(now.getFullYear(), now.getMonth(), now.getDate())) return false;
    if (day === 0 || day === 6) return false;
    // Make some days "unavailable" for demo realism
    const d = date.getDate();
    if (d % 7 === 3 || d % 11 === 0) return false;
    return true;
  }

  function renderCalendar() {
    const year  = currentDate.getFullYear();
    const month = currentDate.getMonth();

    monthLabel.textContent = `${MONTHS[month]} ${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Shift: week starts Monday (0=Mon, 6=Sun)
    const offset = (firstDay + 6) % 7;

    calGrid.innerHTML = '';
    calGrid.setAttribute('aria-label', `${MONTHS[month]} ${year}`);

    // Empty cells before first day
    for (let i = 0; i < offset; i++) {
      const empty = document.createElement('div');
      empty.className = 'cal-day empty';
      empty.setAttribute('aria-hidden', 'true');
      calGrid.appendChild(empty);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const dayDate   = new Date(year, month, d);
      const avail     = isAvailable(dayDate);
      const isSelected = selectedDay &&
        selectedDay.getFullYear() === year &&
        selectedDay.getMonth()    === month &&
        selectedDay.getDate()     === d;

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `cal-day${!avail ? ' disabled' : ''}${isSelected ? ' selected' : ''}`;
      btn.textContent = d;
      btn.setAttribute('aria-label', `${d} ${MONTHS[month]} ${year}${!avail ? ' (unavailable)' : ''}`);
      btn.setAttribute('role', 'gridcell');
      if (!avail) btn.setAttribute('aria-disabled', 'true');

      if (avail) {
        btn.addEventListener('click', () => selectDay(dayDate));
      }

      calGrid.appendChild(btn);
    }
  }

  function selectDay(date) {
    selectedDay  = date;
    selectedSlot = null;
    renderCalendar();
    renderSlots(date);
  }

  function renderSlots(date) {
    const d = date.getDate();
    // Randomly vary available slots for realism (deterministic by date)
    const availableSlots = SLOTS.filter((_, i) => (d + i) % 3 !== 0);

    slotLabel.textContent = `Available times — ${date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}`;
    slotsGrid.innerHTML   = '';

    availableSlots.forEach(slot => {
      const btn = document.createElement('button');
      btn.type       = 'button';
      btn.className  = 'time-slot';
      btn.textContent = slot;
      btn.setAttribute('role', 'listitem');
      btn.setAttribute('aria-label', `Book ${slot}`);

      btn.addEventListener('click', () => {
        selectedSlot = slot;
        slotsGrid.querySelectorAll('.time-slot').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        // Wait briefly then show success
        setTimeout(() => {
          timeSlotsEl.hidden = true;
          calSuccess.hidden  = false;
        }, 600);
      });

      slotsGrid.appendChild(btn);
    });

    timeSlotsEl.hidden = false;
    calSuccess.hidden  = true;
  }

  prevBtn.addEventListener('click', () => {
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    selectedDay = null;
    timeSlotsEl.hidden = true;
    calSuccess.hidden  = true;
    renderCalendar();
  });

  nextBtn.addEventListener('click', () => {
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    selectedDay = null;
    timeSlotsEl.hidden = true;
    calSuccess.hidden  = true;
    renderCalendar();
  });

  renderCalendar();
})();

// ============================================================
// SMOOTH SCROLL — close mobile menu on anchor click
// ============================================================
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        target.focus({ preventScroll: true });
      }
    });
  });
})();

// ============================================================
// ACTIVE NAV LINK on scroll
// ============================================================
(function initActiveNav() {
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          const matches = link.getAttribute('href') === '#' + id;
          link.style.color = matches ? 'var(--clr-lime)' : '';
        });
      }
    });
  }, {
    rootMargin: '-40% 0px -55% 0px',
    threshold: 0
  });

  sections.forEach(section => observer.observe(section));
})();
