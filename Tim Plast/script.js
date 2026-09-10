/**
 * TIM PLAST - Interactive Engineering Logic & Configurator
 * Realtime price calculation, modal popup, lead capture & mobile drawer
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
    drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));
  }

  // 2. Real-time Stolarija Price Estimator
  const configurator = document.getElementById('stolarijaConfigurator');
  const estimatedPriceEl = document.getElementById('estimatedPrice');
  const widthInput = document.getElementById('calcWidth');
  const heightInput = document.getElementById('calcHeight');
  const quantityInput = document.getElementById('calcQuantity');
  const addShutters = document.getElementById('addShutters');
  const addScreens = document.getElementById('addScreens');

  function calculateEstimate() {
    const width = parseFloat(widthInput.value) || 120;
    const height = parseFloat(heightInput.value) || 140;
    const qty = parseInt(quantityInput.value) || 1;

    const selectedTypeEl = document.querySelector('input[name="element_type"]:checked');
    const selectedType = selectedTypeEl ? selectedTypeEl.value : 'Jednokrilni prozor';

    const selectedGradeEl = document.querySelector('input[name="profile_grade"]:checked');
    const isPremium = selectedGradeEl && selectedGradeEl.value.includes('PREMIUM');

    // Square meters
    const m2 = (width * height) / 10000;

    // Base price per m2 in EUR
    let baseRate = 95;
    if (selectedType.includes('Dvokrilni')) baseRate = 115;
    if (selectedType.includes('Balkonska')) baseRate = 125;
    if (selectedType.includes('Ulazna')) baseRate = 260; // doors have higher panel/lock costs

    if (isPremium) {
      baseRate += 35;
    }

    let itemTotal = m2 * baseRate;

    // Minimum baseline protection
    if (itemTotal < 90 && !selectedType.includes('Ulazna')) itemTotal = 95;
    if (selectedType.includes('Ulazna') && itemTotal < 350) itemTotal = 380;

    // Addons
    if (addShutters && addShutters.checked) {
      itemTotal += (m2 * 45); // shutters per m2
    }
    if (addScreens && addScreens.checked) {
      itemTotal += (m2 * 25); // screens per m2
    }

    const grandTotal = Math.round(itemTotal * qty);
    const lowRange = Math.round(grandTotal * 0.92);
    const highRange = Math.round(grandTotal * 1.08);

    estimatedPriceEl.innerText = `~ ${lowRange} - ${highRange} €`;
    return { lowRange, highRange, grandTotal, selectedType, width, height, qty, isPremium };
  }

  if (configurator) {
    configurator.addEventListener('input', calculateEstimate);
    configurator.addEventListener('change', calculateEstimate);
    calculateEstimate(); // initial calculation
  }

  // 3. Modal Summary & Submission
  const openModalBtn = document.getElementById('openEstimateModal');
  const calcModal = document.getElementById('calcModal');
  const modalClose = document.getElementById('closeEstimateModal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalSummaryBox = document.getElementById('modalConfigSummary');
  const modalFinalForm = document.getElementById('modalFinalForm');
  const modalFeedback = document.getElementById('modalFeedback');
  const modalSubmitBtn = document.getElementById('modalSubmitBtn');

  function openEstimateModal() {
    const data = calculateEstimate();
    const shuttersText = addShutters && addShutters.checked ? 'Da' : 'Ne';
    const screensText = addScreens && addScreens.checked ? 'Da' : 'Ne';

    modalSummaryBox.innerHTML = `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-bottom: 0.5rem;">
        <div><strong>Pozicija:</strong> ${data.selectedType}</div>
        <div><strong>Količina:</strong> ${data.qty} kom.</div>
        <div><strong>Dimenzije:</strong> ${data.width} x ${data.height} cm</div>
        <div><strong>Profil:</strong> ${data.isPremium ? '7-komorni Troslojni' : '6-komorni Niskoemisioni'}</div>
        <div><strong>Roletne:</strong> ${shuttersText}</div>
        <div><strong>Komarnici:</strong> ${screensText}</div>
      </div>
      <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 0.5rem; font-size: 0.9rem; color: #ff9447;">
        <strong>Okvirni iznos:</strong> ~ ${data.lowRange} - ${data.highRange} €
      </div>
    `;

    calcModal.classList.add('is-open');
    modalBackdrop.classList.add('is-open');
    calcModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeEstimateModal() {
    calcModal.classList.remove('is-open');
    modalBackdrop.classList.remove('is-open');
    calcModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (openModalBtn && calcModal) {
    openModalBtn.addEventListener('click', openEstimateModal);
    modalClose.addEventListener('click', closeEstimateModal);
    modalBackdrop.addEventListener('click', closeEstimateModal);
  }

  if (modalFinalForm) {
    modalFinalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('modalClientName').value.trim();
      const phone = document.getElementById('modalClientPhone').value.trim();
      const location = document.getElementById('modalClientLocation').value.trim();

      const origText = modalSubmitBtn.innerHTML;
      modalSubmitBtn.disabled = true;
      modalSubmitBtn.innerHTML = '<span>Prosleđivanje inženjerima...</span>';

      setTimeout(() => {
        modalSubmitBtn.disabled = false;
        modalSubmitBtn.innerHTML = origText;
        modalFinalForm.reset();

        modalFeedback.className = 'form-feedback-alert success';
        modalFeedback.innerHTML = `
          <strong>Uspešno poslato, ${name}!</strong><br>
          Vaša specifikacija je prosleđena proizvodnom timu TIM PLAST. Kontaktiraćemo Vas na <strong>${phone}</strong> sa tačnom ponudom i predlogom termina za besplatno merenje u mestu ${location}.
        `;

        setTimeout(() => {
          closeEstimateModal();
          modalFeedback.className = 'form-feedback-alert';
          modalFeedback.innerHTML = '';
        }, 4000);
      }, 700);
    });
  }

  // 4. Direct Contact Form (Fast Inquiry)
  const directForm = document.getElementById('directContactForm');
  const directFeedback = document.getElementById('directFormFeedback');
  const directSubmitBtn = document.getElementById('sendInquiryBtn');

  if (directForm) {
    directForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('nameInput').value.trim();
      const phone = document.getElementById('phoneInput').value.trim();

      const origText = directSubmitBtn.innerHTML;
      directSubmitBtn.disabled = true;
      directSubmitBtn.innerHTML = '<span>Slanje zahteva...</span>';

      setTimeout(() => {
        directSubmitBtn.disabled = false;
        directSubmitBtn.innerHTML = origText;
        directForm.reset();

        directFeedback.className = 'form-feedback-alert success';
        directFeedback.innerHTML = `
          <strong>Hvala Vam, ${name}!</strong><br>
          Zahtev je uspešno zabeležen. Naš tim će Vas pozvati na <strong>${phone}</strong> u najkraćem roku radi dogovora o merenju.
        `;
      }, 650);
    });
  }
});
