/**
 * Aleksa Barber & Hair Studio
 * Interactive Script: Drawer, Booking, WhatsApp Dispatcher, Smooth Scroll
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Drawer Navigation
  const burgerBtn = document.getElementById('burgerBtn');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.m-link, .m-book-btn');

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

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  // 2. Set min date for booking to today
  const bookingDateInput = document.getElementById('bookingDate');
  if (bookingDateInput) {
    const today = new Date().toISOString().split('T')[0];
    bookingDateInput.min = today;
    bookingDateInput.value = today;
  }

  // 3. Pre-select service from service cards
  const selectServiceBtns = document.querySelectorAll('.select-service-btn');
  const bookingServiceSelect = document.getElementById('bookingService');

  selectServiceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const serviceName = btn.getAttribute('data-service');
      if (bookingServiceSelect && serviceName) {
        // Find matching option
        for (let i = 0; i < bookingServiceSelect.options.length; i++) {
          if (bookingServiceSelect.options[i].value === serviceName) {
            bookingServiceSelect.selectedIndex = i;
            break;
          }
        }
      }

      // Scroll to booking section smoothly
      const bookingSection = document.getElementById('zakazivanje');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
        // Highlight form card briefly
        const formCard = document.querySelector('.booking-form-card');
        if (formCard) {
          formCard.style.boxShadow = '0 0 35px rgba(212, 175, 55, 0.4)';
          setTimeout(() => {
            formCard.style.boxShadow = '';
          }, 1500);
        }
      }
    });
  });

  // 4. WhatsApp Dispatcher
  const sendWhatsappBtn = document.getElementById('sendWhatsappBtn');
  const bookingForm = document.getElementById('bookingForm');
  const bookingSuccessNotice = document.getElementById('bookingSuccessNotice');

  function getBookingData() {
    const service = document.getElementById('bookingService').value;
    const date = document.getElementById('bookingDate').value;
    const time = document.getElementById('bookingTime').value;
    const name = document.getElementById('clientName').value.trim();
    const phone = document.getElementById('clientPhone').value.trim();
    const notes = document.getElementById('clientNotes').value.trim();

    return { service, date, time, name, phone, notes };
  }

  if (sendWhatsappBtn) {
    sendWhatsappBtn.addEventListener('click', () => {
      const data = getBookingData();

      if (!data.service) {
        alert('Molimo izaberite uslugu.');
        document.getElementById('bookingService').focus();
        return;
      }
      if (!data.name) {
        alert('Molimo unesite Vaše ime.');
        document.getElementById('clientName').focus();
        return;
      }
      if (!data.phone) {
        alert('Molimo unesite broj telefona.');
        document.getElementById('clientPhone').focus();
        return;
      }

      // Format WhatsApp message cleanly without emojis
      const message = 
        `Pozdrav Aleksa, želim da zakažem termin preko sajta:\n\n` +
        `Usluga: ${data.service}\n` +
        `Datum: ${data.date || 'Po dogovoru'}\n` +
        `Period: ${data.time || 'Po dogovoru'}\n` +
        `Ime klijenta: ${data.name}\n` +
        `Kontakt telefon: ${data.phone}\n` +
        (data.notes ? `Napomena: ${data.notes}\n` : '') +
        `\nDa li je ovaj termin slobodan?`;

      const barberPhone = '381601234567';
      const encodedMsg = encodeURIComponent(message);
      window.open(`https://wa.me/${barberPhone}?text=${encodedMsg}`, '_blank');
    });
  }

  // 5. Direct Form Submission (Simulated Instant Confirmation)
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = getBookingData();

      if (!data.service || !data.name || !data.phone) {
        alert('Molimo popunite obavezna polja.');
        return;
      }

      if (bookingSuccessNotice) {
        bookingSuccessNotice.classList.remove('hidden');
        bookingSuccessNotice.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      // Disable button briefly
      const submitBtn = document.getElementById('directConfirmBtn');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Termin evidentiran';
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Potvrdi novi termin';
        }, 5000);
      }
    });
  }

  // 6. Header background shrink on scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(7, 8, 9, 0.96)';
      navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.7)';
    } else {
      navbar.style.background = 'rgba(7, 8, 9, 0.85)';
      navbar.style.boxShadow = 'none';
    }
  });
});
