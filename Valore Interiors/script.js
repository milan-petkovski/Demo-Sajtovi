/**
 * VALORÉ Interiors - Interactive Scripts
 * Mobile navigation, category filtering, interactive quote form with instant feedback
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Drawer Navigation
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openDrawer() {
    mobileDrawer.classList.add('is-open');
    drawerOverlay.classList.add('is-open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('is-open');
    drawerOverlay.classList.remove('is-open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', openDrawer);
    drawerCloseBtn.addEventListener('click', closeDrawer);
    drawerOverlay.addEventListener('click', closeDrawer);

    drawerLinks.forEach(link => {
      link.addEventListener('click', closeDrawer);
    });
  }

  // 2. Portfolio Category Tabs Filter
  const tabButtons = document.querySelectorAll('.tab-btn');
  const projectCards = document.querySelectorAll('.project-card');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            if (btn.getAttribute('data-filter') !== 'all' && card.getAttribute('data-category') !== filter) {
              card.style.display = 'none';
            }
          }, 200);
        }
      });
    });
  });

  // 3. Interactive Lead / Fast Quote Form
  const quoteForm = document.getElementById('quoteForm');
  const formFeedback = document.getElementById('formFeedback');
  const submitBtn = document.getElementById('submitBtn');

  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('clientName').value.trim();
      const phone = document.getElementById('clientPhone').value.trim();
      const city = document.getElementById('clientCity').value.trim();
      const message = document.getElementById('clientMessage').value.trim();

      const selectedServices = Array.from(document.querySelectorAll('input[name="services"]:checked'))
        .map(el => el.value);

      if (!name || !phone || !city) {
        alert('Molimo Vas popunite obavezna polja (Ime, telefon i grad).');
        return;
      }

      // Visual submission state
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="icon animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
          <circle cx="12" cy="12" r="10" stroke-dasharray="30" stroke-dashoffset="10"/>
        </svg>
        <span>Slanje zahteva...</span>
      `;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        quoteForm.reset();

        formFeedback.className = 'form-feedback success';
        formFeedback.innerHTML = `
          <strong>Hvala Vam, ${name}!</strong><br>
          Vaš upit za procenu je uspešno prosleđen. Stefan i VALORÉ tim će Vas kontaktirati na broj <strong>${phone}</strong> u najkraćem roku sa detaljima.
        `;

        // Smooth scroll to feedback message
        formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 750);
    });
  }

  // 4. Header shrink on scroll
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.padding = '0.7rem 0';
      header.style.borderBottomColor = 'rgba(201, 169, 110, 0.2)';
    } else {
      header.style.padding = '1rem 0';
      header.style.borderBottomColor = 'rgba(245, 242, 235, 0.08)';
    }
  }, { passive: true });
});
