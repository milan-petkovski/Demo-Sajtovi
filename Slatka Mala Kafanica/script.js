/**
 * Slatka Mala Kafanica
 * Interactive Script: Menu Tabs, Table Reservation, WhatsApp Dispatcher, Drawer
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Drawer Navigation
  const burgerBtn = document.getElementById('burgerBtn');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerLinks = document.querySelectorAll('.drawer-link, .drawer-footer .btn');

  function openDrawer() {
    mobileDrawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (burgerBtn && mobileDrawer) {
    burgerBtn.addEventListener('click', openDrawer);
  }

  if (closeDrawerBtn) {
    closeDrawerBtn.addEventListener('click', closeDrawer);
  }

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  // 2. Menu Category Tabs
  const tabButtons = document.querySelectorAll('.menu-tab-btn');
  const contentPanels = document.querySelectorAll('.menu-content-panel');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetCategory = btn.getAttribute('data-tab');

      // Update button states
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update panel states
      contentPanels.forEach(panel => {
        if (panel.id === `tab-${targetCategory}`) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });

  // 3. Date input minimum set to today
  const resDateInput = document.getElementById('resDate');
  if (resDateInput) {
    const today = new Date().toISOString().split('T')[0];
    resDateInput.min = today;
    resDateInput.value = today;
  }

  // 4. Reservation Form Logic
  const reservationForm = document.getElementById('reservationForm');
  const resWhatsAppBtn = document.getElementById('resWhatsAppBtn');
  const resSuccessMsg = document.getElementById('resSuccessMsg');

  function getReservationData() {
    const date = document.getElementById('resDate').value;
    const time = document.getElementById('resTime').value;
    const guests = document.getElementById('resGuests').value;
    const seating = document.getElementById('resSeating').value;
    const name = document.getElementById('resName').value.trim();
    const phone = document.getElementById('resPhone').value.trim();
    const notes = document.getElementById('resNotes').value.trim();

    return { date, time, guests, seating, name, phone, notes };
  }

  // WhatsApp Reservation Dispatcher
  if (resWhatsAppBtn) {
    resWhatsAppBtn.addEventListener('click', () => {
      const data = getReservationData();

      if (!data.date || !data.time) {
        alert('Molimo izaberite datum i vreme dolaska.');
        document.getElementById('resTime').focus();
        return;
      }
      if (!data.name) {
        alert('Molimo unesite Vaše ime.');
        document.getElementById('resName').focus();
        return;
      }
      if (!data.phone) {
        alert('Molimo unesite kontakt telefon.');
        document.getElementById('resPhone').focus();
        return;
      }

      // Format clean message without emojis
      const message = 
        `Poštovani, želeo/la bih da rezervišem sto u Slatkoj Maloj Kafanici:\n\n` +
        `Datum: ${data.date}\n` +
        `Vreme: ${data.time}\n` +
        `Broj gostiju: ${data.guests}\n` +
        `Deo kafane: ${data.seating}\n` +
        `Ime i prezime: ${data.name}\n` +
        `Kontakt telefon: ${data.phone}\n` +
        (data.notes ? `Posebna napomena: ${data.notes}\n` : '') +
        `\nMolim vas za potvrdu rezervacije. Hvala!`;

      const kafanaPhone = '381603190906';
      const encodedMsg = encodeURIComponent(message);
      window.open(`https://wa.me/${kafanaPhone}?text=${encodedMsg}`, '_blank');
    });
  }

  // Direct On-Site Submission
  if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = getReservationData();

      if (!data.date || !data.time || !data.name || !data.phone) {
        alert('Molimo popunite sva obavezna polja za rezervaciju.');
        return;
      }

      if (resSuccessMsg) {
        resSuccessMsg.classList.remove('hidden');
        resSuccessMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      const submitBtn = document.getElementById('resSubmitBtn');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Zahtev je poslat';
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Pošalji novi zahtev';
        }, 5000);
      }
    });
  }

  // 5. Sticky header shadow on scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.08)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });
});
