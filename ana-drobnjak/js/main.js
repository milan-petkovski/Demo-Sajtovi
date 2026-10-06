/**
 * Ana Drobnjak – Nutricionista
 * js/main.js
 *
 * CONSTANTS (replace before going live):
 *   INSTAGRAM_URL   – pravi URL Instagram profila
 *   PAYMENT_PROVIDER – hosted checkout URL provajdera
 */

/* ----------------------------------------------------------
   CONSTANTS
---------------------------------------------------------- */

/** @constant {string} INSTAGRAM_URL – URL Instagram profila @anadrobnjak */
// PLACEHOLDER: zameniti pravim Instagram URL-om
const INSTAGRAM_URL = 'https://www.instagram.com/anadrobnjak/';

/**
 * @constant {string} PAYMENT_PROVIDER
 * Placeholder za pravi hosted checkout (Stripe, PayU, Monri, itd.)
 * Kada se integriše pravi gateway, zaменити ovaj string i prosleđivati
 * paket + cenu kroz redirect ili API poziv.
 */
// PLACEHOLDER: zameniti pravim payment provajderom
const PAYMENT_PROVIDER = 'https://checkout.stripe.com/'; // primer – nije aktivan

/* Package data */
const PACKAGES = {
  start: {
    name: 'Start',
    price: '2.990',
    features: [
      'Jelovnik za 7 dana',
      'Osnovna lista namirnica',
      'Isporuka za 48h',
    ],
  },
  standard: {
    name: 'Standard',
    price: '5.490',
    features: [
      'Jelovnik za 30 dana',
      'Recepti za svaki obrok',
      'Kompletna lista namirnica',
      'Jedna korekcija plana',
      'Isporuka za 48h',
    ],
  },
  premium: {
    name: 'Premium',
    price: '9.490',
    features: [
      'Jelovnik za 90 dana',
      'Recepti i opcije zamene',
      'Tri korekcije plana',
      'Email podrška 30 dana',
      'Isporuka za 48h',
    ],
  },
};

/* ----------------------------------------------------------
   DOM READY
---------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initStickyCtaBar();
  initRevealObserver();
  initPricingButtons();
  initCheckout();
  initFaq();
  initInstagramLinks();
  initCardFormatting();
});

/* ----------------------------------------------------------
   1. HEADER – scroll shadow
---------------------------------------------------------- */
function initHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 8) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ----------------------------------------------------------
   2. MOBILE MENU
---------------------------------------------------------- */
function initMobileMenu() {
  const toggle  = document.getElementById('navToggle');
  const overlay = document.getElementById('mobileOverlay');
  if (!toggle || !overlay) return;

  const mobileLinks = overlay.querySelectorAll('.mobile-nav-link, .mobile-nav-cta');

  const open = () => {
    toggle.setAttribute('aria-expanded', 'true');
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // Move focus to first link
    const first = overlay.querySelector('a, button');
    if (first) first.focus();
  };

  const close = () => {
    toggle.setAttribute('aria-expanded', 'false');
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    toggle.focus();
  };

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    isOpen ? close() : open();
  });

  // Close on link click
  mobileLinks.forEach(link => {
    link.addEventListener('click', close);
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      close();
    }
  });
}

/* ----------------------------------------------------------
   3. STICKY CTA BAR (mobile only, after first scroll)
---------------------------------------------------------- */
function initStickyCtaBar() {
  const bar = document.getElementById('stickyCtaBar');
  if (!bar) return;

  let shown = false;

  const onScroll = () => {
    const heroH = document.getElementById('pocetna')?.offsetHeight || 400;
    if (window.scrollY > heroH * 0.6 && !shown) {
      shown = true;
      bar.classList.add('visible');
      bar.setAttribute('aria-hidden', 'false');
    } else if (window.scrollY <= heroH * 0.3 && shown) {
      shown = false;
      bar.classList.remove('visible');
      bar.setAttribute('aria-hidden', 'true');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ----------------------------------------------------------
   4. REVEAL ON SCROLL (IntersectionObserver)
---------------------------------------------------------- */
function initRevealObserver() {
  if (!('IntersectionObserver' in window)) {
    // Fallback: show all
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    return;
  }

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

/* ----------------------------------------------------------
   5. PRICING BUTTONS – open checkout modal
---------------------------------------------------------- */
function initPricingButtons() {
  document.querySelectorAll('.pricing-cta').forEach(btn => {
    btn.addEventListener('click', () => {
      const packageKey = btn.closest('[data-package]')?.dataset.package || 'standard';
      openCheckout(packageKey);
    });
  });

  // Also all "Naruči jelovnik" buttons in nav / hero / sticky / final CTA
  // They open Standard by default
  ['navCtaBtn', 'heroPrimaryBtn', 'finalCtaBtn'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('click', (e) => {
        // If href is #paketi, let it scroll; don't intercept
        // We only intercept the nav CTA
        if (id === 'navCtaBtn') {
          e.preventDefault();
          openCheckout('standard');
        }
      });
    }
  });
}

/* ----------------------------------------------------------
   6. CHECKOUT MODAL
---------------------------------------------------------- */
let currentStep = 1;
let selectedPackage = 'standard';

function initCheckout() {
  const backdrop  = document.getElementById('checkoutBackdrop');
  const closeBtn  = document.getElementById('modalCloseBtn');
  const step1Cancel = document.getElementById('step1CancelBtn');
  const step1Next = document.getElementById('step1NextBtn');
  const step2Next = document.getElementById('step2NextBtn');
  const step2Back = document.getElementById('step2BackBtn');
  const step3Back = document.getElementById('step3BackBtn');
  const payNow    = document.getElementById('payNowBtn');
  const successClose = document.getElementById('successCloseBtn');

  if (!backdrop) return;

  // Close modal
  const closeModal = () => {
    backdrop.setAttribute('aria-hidden', 'true');
    backdrop.style.display = 'none';
    document.body.style.overflow = '';
    // Reset to step 1
    goToStep(1);
    currentStep = 1;
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (step1Cancel) step1Cancel.addEventListener('click', closeModal);

  // Close on backdrop click
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && backdrop.getAttribute('aria-hidden') !== 'true') {
      closeModal();
    }
  });

  // Step 1 → 2
  if (step1Next) {
    step1Next.addEventListener('click', () => goToStep(2));
  }

  // Step 2 → 3 (with validation)
  if (step2Next) {
    step2Next.addEventListener('click', () => {
      if (validateStep2()) goToStep(3);
    });
  }

  // Step 2 ← 1
  if (step2Back) {
    step2Back.addEventListener('click', () => goToStep(1));
  }

  // Step 3 ← 2
  if (step3Back) {
    step3Back.addEventListener('click', () => goToStep(2));
  }

  // Pay now (DEMO only)
  if (payNow) {
    payNow.addEventListener('click', () => {
      // DEMO: Simulate payment success
      // In production: redirect to PAYMENT_PROVIDER or call API
      simulatePayment();
    });
  }

  // Success close
  if (successClose) {
    successClose.addEventListener('click', closeModal);
  }

  // Sticky CTA bar link
  const stickyBar = document.getElementById('stickyCtaBar');
  if (stickyBar) {
    const link = stickyBar.querySelector('a');
    if (link) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        openCheckout('standard');
      });
    }
  }
}

function openCheckout(packageKey) {
  selectedPackage = packageKey || 'standard';
  const pkg = PACKAGES[selectedPackage] || PACKAGES.standard;

  // Populate order summary
  const nameEl  = document.getElementById('orderPackageName');
  const priceEl = document.getElementById('orderPackagePrice');
  const listEl  = document.getElementById('orderIncludes');

  if (nameEl)  nameEl.textContent  = pkg.name;
  if (priceEl) priceEl.textContent = `${pkg.price} RSD`;
  if (listEl) {
    listEl.innerHTML = pkg.features
      .map(f => `<li>${escHtml(f)}</li>`)
      .join('');
  }

  // Populate payment summary
  const payName  = document.getElementById('paymentPackageName');
  const payPrice = document.getElementById('paymentPackagePrice');
  const payBtn   = document.getElementById('payBtnAmount');
  if (payName)  payName.textContent  = pkg.name;
  if (payPrice) payPrice.textContent = `${pkg.price} RSD`;
  if (payBtn)   payBtn.textContent   = `${pkg.price} RSD`;

  // Reset to step 1
  goToStep(1);

  // Show modal
  const backdrop = document.getElementById('checkoutBackdrop');
  if (backdrop) {
    backdrop.setAttribute('aria-hidden', 'false');
    backdrop.style.display = '';
    document.body.style.overflow = 'hidden';

    // Focus modal
    const modal = document.getElementById('checkoutModal');
    if (modal) {
      modal.removeAttribute('tabindex');
      modal.setAttribute('tabindex', '-1');
      modal.focus();
    }
  }
}

function goToStep(step) {
  currentStep = step;

  // Show/hide step content
  [1, 2, 3].forEach(n => {
    const el = document.getElementById(`checkoutStep${n}`);
    const indicator = document.getElementById(`stepIndicator${n}`);
    if (!el || !indicator) return;

    if (n === step) {
      el.removeAttribute('hidden');
      el.classList.add('active');
    } else {
      el.setAttribute('hidden', '');
      el.classList.remove('active');
    }

    // Update indicators
    indicator.classList.remove('active', 'completed');
    if (n === step) indicator.classList.add('active');
    if (n < step)  indicator.classList.add('completed');
  });

  // Update lines
  document.querySelectorAll('.modal-step-line').forEach((line, i) => {
    if (i < step - 1) {
      line.classList.add('completed');
    } else {
      line.classList.remove('completed');
    }
  });

  // Hide success if going back
  const successEl = document.getElementById('checkoutSuccess');
  if (successEl) successEl.setAttribute('hidden', '');
}

function validateStep2() {
  let valid = true;

  // Name
  const nameInput = document.getElementById('fieldName');
  const nameError = document.getElementById('fieldNameError');
  if (nameInput && nameError) {
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      nameInput.classList.add('error');
      nameError.removeAttribute('hidden');
      valid = false;
    } else {
      nameInput.classList.remove('error');
      nameError.setAttribute('hidden', '');
    }
  }

  // Email
  const emailInput = document.getElementById('fieldEmail');
  const emailError = document.getElementById('fieldEmailError');
  if (emailInput && emailError) {
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(emailInput.value.trim())) {
      emailInput.classList.add('error');
      emailError.removeAttribute('hidden');
      valid = false;
    } else {
      emailInput.classList.remove('error');
      emailError.setAttribute('hidden', '');
    }
  }

  // Goal
  const goalInput = document.getElementById('fieldGoal');
  const goalError = document.getElementById('fieldGoalError');
  if (goalInput && goalError) {
    if (!goalInput.value) {
      goalInput.classList.add('error');
      goalError.removeAttribute('hidden');
      valid = false;
    } else {
      goalInput.classList.remove('error');
      goalError.setAttribute('hidden', '');
    }
  }

  // Scroll to first error
  if (!valid) {
    const firstError = document.querySelector('.form-input.error');
    if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  return valid;
}

function simulatePayment() {
  /**
   * DEMO ONLY – ovo nije pravo plaćanje.
   * Kada se integriše pravi PAYMENT_PROVIDER:
   *   1. Pošalji podatke na backend (POST /api/create-checkout-session)
   *   2. Redirektuj na hosted checkout: window.location.href = sessionUrl;
   *   3. Provajder šalje webhook potvrdu
   *   4. Backend upisuje narudžbinu u bazu
   *
   * PAYMENT_PROVIDER konstanta je definisana na vrhu fajla.
   */
  const payBtn = document.getElementById('payNowBtn');
  if (payBtn) {
    payBtn.disabled = true;
    payBtn.textContent = 'Obrađuje se...';
  }

  setTimeout(() => {
    // Show success screen
    [1, 2, 3].forEach(n => {
      const el = document.getElementById(`checkoutStep${n}`);
      if (el) { el.setAttribute('hidden', ''); el.classList.remove('active'); }
    });

    const successEl = document.getElementById('checkoutSuccess');
    if (successEl) successEl.removeAttribute('hidden');

    // Show email confirmation
    const emailInput = document.getElementById('fieldEmail');
    const successEmail = document.getElementById('successEmail');
    if (successEmail && emailInput) {
      successEmail.textContent = emailInput.value.trim() || '';
    }

    // Mark all steps completed
    document.querySelectorAll('.modal-step').forEach(s => {
      s.classList.add('completed');
      s.classList.remove('active');
    });
    document.querySelectorAll('.modal-step-line').forEach(l => l.classList.add('completed'));

    if (payBtn) {
      payBtn.disabled = false;
    }
  }, 1400);
}

/* ----------------------------------------------------------
   7. FAQ ACCORDION
---------------------------------------------------------- */
function initFaq() {
  const items = document.querySelectorAll('.faq-item');

  items.forEach(item => {
    const btn    = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!btn || !answer) return;

    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      // Close all others
      items.forEach(other => {
        const otherBtn    = other.querySelector('.faq-question');
        const otherAnswer = other.querySelector('.faq-answer');
        if (otherBtn && otherAnswer && other !== item) {
          otherBtn.setAttribute('aria-expanded', 'false');
          otherAnswer.setAttribute('hidden', '');
        }
      });

      // Toggle current
      btn.setAttribute('aria-expanded', String(!isOpen));
      if (isOpen) {
        answer.setAttribute('hidden', '');
      } else {
        answer.removeAttribute('hidden');
      }
    });

    // Keyboard: Enter/Space already fire click on buttons
  });
}

/* ----------------------------------------------------------
   8. INSTAGRAM LINKS
---------------------------------------------------------- */
function initInstagramLinks() {
  // Update all Instagram hrefs to the constant URL
  const followBtn = document.getElementById('instagramFollowBtn');
  if (followBtn) followBtn.href = INSTAGRAM_URL;

  // IG post links currently point to '#'; in production replace with real URLs
  const igCards = document.querySelectorAll('.ig-card');
  igCards.forEach(card => {
    if (card.getAttribute('href') === '#') {
      card.setAttribute('href', INSTAGRAM_URL);
      card.setAttribute('target', '_blank');
      card.setAttribute('rel', 'noopener noreferrer');
    }
  });

  // Footer Instagram link
  const footerIg = document.querySelector('.footer-ig-link');
  if (footerIg) footerIg.href = INSTAGRAM_URL;
}

/* ----------------------------------------------------------
   9. CARD INPUT FORMATTING (DEMO)
---------------------------------------------------------- */
function initCardFormatting() {
  const cardInput = document.getElementById('fieldCardNumber');
  if (cardInput) {
    cardInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '').substring(0, 16);
      val = val.replace(/(.{4})/g, '$1 ').trim();
      e.target.value = val;
    });
  }

  const expiryInput = document.getElementById('fieldExpiry');
  if (expiryInput) {
    expiryInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '').substring(0, 4);
      if (val.length >= 3) val = val.substring(0, 2) + '/' + val.substring(2);
      e.target.value = val;
    });
  }

  const cvvInput = document.getElementById('fieldCvv');
  if (cvvInput) {
    cvvInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '').substring(0, 3);
    });
  }
}

/* ----------------------------------------------------------
   UTILS
---------------------------------------------------------- */
function escHtml(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}
