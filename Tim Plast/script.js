/**
 * ==========================================================================
 * TIM PLAST - Glavna Logika Konfiguratora i Kalkulatora Upita (script.js)
 * 
 * Brz, čist Vanilla JS bez spoljnih zavisnosti.
 * Omogućava trenutni proračun zapremine, formatiranje gotovog upita i slanje
 * putem WhatsApp-a (wa.me) i Email-a (mailto:).
 * ==========================================================================
 */

/* ==========================================================================
   ZA IZMENU – uneti stvarne cene, kontakt podatke i specifikacije kasnije
   ========================================================================== */
const CLIENT_CONFIG = {
  // Broj telefona za WhatsApp upite (format bez + ili nula, sa pozivnim brojem države 381)
  whatsappNumber: '381641234567',

  // Glavna email adresa za prijem ponuda
  inquiryEmail: 'info@timplast.rs',

  // Proizvodne kategorije i njihovi tipovi konstrukcija
  categories: {
    rezervoar: {
      name: 'Plastični rezervoari za vodu',
      types: [
        { id: 'rez-vertikalni', name: 'Vertikalni nadzemni rezervoar', desc: 'Samostojeći, idealan za podrume i dvorišta' },
        { id: 'rez-horizontalni', name: 'Horizontalni rezervoar (cisterna)', desc: 'Za montažu na prikolice ili plitko ukopavanje' },
        { id: 'rez-ukopavajuci', name: 'Ukopavajući rezervoar za kišnicu', desc: 'Sa ojačanim rebrima protiv pritiska zemlje' },
        { id: 'rez-pravougaoni', name: 'Pravougaoni rezervoar po meri', desc: 'Maksimalno iskorišćenje uskih prostora' }
      ],
      // ZA IZMENU: Okvirne cene po litru za informativni prikaz (min/max eur/L)
      pricePerLiter: { min: 0.22, max: 0.28 },
      basePrice: 160
    },
    septicka: {
      name: 'Ekološka septička jama',
      types: [
        { id: 'sep-jednokomorna', name: 'Jednokomorna sabirna jama', desc: 'Hermetički zatvorena, periodično se prazni cisternom' },
        { id: 'sep-dvokomorna', name: 'Dvokomorna prelivna jama', desc: 'Sa taložnikom i prelivom tehničke vode' },
        { id: 'sep-trokomorna', name: 'Trokomorna biološka jama', desc: 'Najviši stepen anaerobnog prečišćavanja' }
      ],
      // ZA IZMENU: Okvirne cene po litru za septičke jame
      pricePerLiter: { min: 0.26, max: 0.35 },
      basePrice: 280
    },
    kaca: {
      name: 'Plastična kaca za kominu i vino',
      types: [
        { id: 'kaca-otvorena', name: 'Standardna otvorena kaca', desc: 'Za skladištenje voća i čvrstih materijala' },
        { id: 'kaca-dihtung', name: 'Kaca sa vodenim dihtovanjem', desc: 'Specijalan obod sa vodom za vrenje bez kvarenja' },
        { id: 'kaca-konus', name: 'Kaca sa konusnim dnom i slavinom', desc: 'Za brzo istakanje bistrog vina i taloga' }
      ],
      // ZA IZMENU: Okvirne cene po litru za kace
      pricePerLiter: { min: 0.18, max: 0.24 },
      basePrice: 110
    },
    bazen: {
      name: 'Plastični bazen / Kaca za kupanje',
      types: [
        { id: 'bazen-pravougaoni', name: 'Pravougaoni porodični bazen', desc: 'Izrada po tačnim dimenzijama za ukopavanje' },
        { id: 'bazen-kruzni', name: 'Kružni nadzemni / ukopni bazen', desc: 'Jednostavno postavljanje na betonsku ploču' },
        { id: 'bazen-hottub', name: 'Kaca za kupanje (Hot-tub / Ledena kupka)', desc: 'Sa klupama i termo-poklopcem' }
      ],
      // ZA IZMENU: Okvirne cene po litru za bazene
      pricePerLiter: { min: 0.35, max: 0.48 },
      basePrice: 650
    }
  }
};

/* ==========================================================================
   STANJE KONFIGURATORA (State)
   ========================================================================== */
const state = {
  category: 'rezervoar',
  typeId: 'rez-vertikalni',
  typeName: 'Vertikalni nadzemni rezervoar',
  inputMode: 'volume', // 'volume' ili 'dimensions'
  volumeLiters: 1000,
  dimensions: {
    diameter: 1000,
    length: 1300,
    width: 1200
  },
  addons: ['Revizioni otvor sa navojnim poklopcem'],
  customer: {
    name: '',
    phone: '',
    location: '',
    notes: ''
  }
};

/* ==========================================================================
   DOM ELEMENTI
   ========================================================================== */
const DOM = {
  categoryRadios: document.querySelectorAll('input[name="product_category"]'),
  typeContainer: document.getElementById('type-options-list'),
  typeSectionTitle: document.getElementById('type-section-title'),
  typeSectionSubtitle: document.getElementById('type-section-subtitle'),
  
  tabVolumeMode: document.getElementById('tab-volume-mode'),
  tabDimMode: document.getElementById('tab-dim-mode'),
  panelVolume: document.getElementById('panel-volume'),
  panelDimensions: document.getElementById('panel-dimensions'),
  
  volumeChips: document.querySelectorAll('#volume-chips .chip-btn'),
  customVolumeInput: document.getElementById('custom-volume-field'),
  
  dimDiameter: document.getElementById('dim-diameter'),
  dimLength: document.getElementById('dim-length'),
  dimWidth: document.getElementById('dim-width'),
  fieldWrapWidth: document.getElementById('field-wrap-width'),
  lblLength: document.getElementById('lbl-length'),
  autoVolumeDisplay: document.getElementById('auto-volume-display'),
  
  addonCheckboxes: document.querySelectorAll('input[name="extra_options"]'),
  
  custName: document.getElementById('cust-name'),
  custPhone: document.getElementById('cust-phone'),
  custLocation: document.getElementById('cust-location'),
  custNotes: document.getElementById('cust-notes'),
  
  // Sažetak kartica
  sumProductTitle: document.getElementById('summary-product-title'),
  sumCategory: document.getElementById('sum-category'),
  sumType: document.getElementById('sum-type'),
  sumVolume: document.getElementById('sum-volume'),
  sumDimensions: document.getElementById('sum-dimensions'),
  sumAddons: document.getElementById('sum-addons'),
  estimatedPriceDisplay: document.getElementById('estimated-price-display'),
  
  // Dugmad akcija
  btnSendWhatsapp: document.getElementById('btn-send-whatsapp'),
  btnSendEmail: document.getElementById('btn-send-email'),
  btnCopySummary: document.getElementById('btn-copy-summary'),
  copyBtnText: document.getElementById('copy-btn-text'),
  stickyWhatsappTrigger: document.getElementById('sticky-whatsapp-trigger'),
  
  // Mobilni plutajući tracker
  mobCalcTracker: document.getElementById('mobile-calc-tracker'),
  mobTrackerText: document.getElementById('mob-tracker-text'),
  mobTrackerPrice: document.getElementById('mob-tracker-price'),
  mobTrackerBtn: document.getElementById('mob-tracker-btn'),
  
  // Trigeri iz kataloga proizvoda
  categoryTriggers: document.querySelectorAll('.select-category-trigger')
};

/* ==========================================================================
   INICIJALIZACIJA
   ========================================================================== */
function init() {
  renderTypeOptions();
  attachEventListeners();
  updateCalculations();
  setupMobileTracker();
}

/**
 * Prikaz odgovarajućih opcija modela u Koraku 2 na osnovu izabrane kategorije
 */
function renderTypeOptions() {
  const currentCategoryData = CLIENT_CONFIG.categories[state.category];
  if (!currentCategoryData) return;

  DOM.typeContainer.innerHTML = '';

  currentCategoryData.types.forEach((type, index) => {
    const isChecked = index === 0;
    if (isChecked) {
      state.typeId = type.id;
      state.typeName = type.name;
    }

    const label = document.createElement('label');
    label.className = 'type-radio-label';
    label.innerHTML = `
      <input type="radio" name="product_type" value="${type.id}" data-name="${type.name}" ${isChecked ? 'checked' : ''}>
      <div class="type-tile-ui">
        <span class="type-name">${type.name}</span>
        <span class="type-desc">${type.desc}</span>
      </div>
    `;

    DOM.typeContainer.appendChild(label);
  });

  // Prilagođavanje naziva dimenzija po kategoriji
  adjustDimensionLabels();
}

/**
 * Prilagođavanje polja za dimenzije u zavisnosti od izabranog tipa proizvoda
 */
function adjustDimensionLabels() {
  if (state.category === 'bazen') {
    DOM.lblLength.textContent = 'Dužina bazena (L):';
    DOM.fieldWrapWidth.classList.remove('hidden');
  } else if (state.category === 'rezervoar') {
    DOM.lblLength.textContent = state.typeId.includes('horizontalni') ? 'Dužina cisterne (L):' : 'Visina rezervoara (H):';
    DOM.fieldWrapWidth.classList.add('hidden');
  } else {
    DOM.lblLength.textContent = 'Visina (H):';
    DOM.fieldWrapWidth.classList.add('hidden');
  }
}

/**
 * Povezivanje svih osluškivača događaja (Event Listeners)
 */
function attachEventListeners() {
  // 1. Promena kategorije (Korak 1)
  DOM.categoryRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      state.category = e.target.value;
      renderTypeOptions();
      updateCalculations();
    });
  });

  // 2. Promena tipa modela (Korak 2 - delegacija)
  DOM.typeContainer.addEventListener('change', (e) => {
    if (e.target.name === 'product_type') {
      state.typeId = e.target.value;
      state.typeName = e.target.getAttribute('data-name');
      adjustDimensionLabels();
      updateCalculations();
    }
  });

  // 3. Tabovi za izbor režima (Zapremina / Dimenzije)
  DOM.tabVolumeMode.addEventListener('click', () => switchInputMode('volume'));
  DOM.tabDimMode.addEventListener('click', () => switchInputMode('dimensions'));

  // 4. Klik na standardne zapremine (Čipovi)
  DOM.volumeChips.forEach(chip => {
    chip.addEventListener('click', () => {
      DOM.volumeChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const vol = parseInt(chip.getAttribute('data-vol'), 10);
      DOM.customVolumeInput.value = vol;
      state.volumeLiters = vol;
      updateCalculations();
    });
  });

  // 5. Ručni unos u polje zapremine
  DOM.customVolumeInput.addEventListener('input', (e) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val > 0) {
      state.volumeLiters = val;
      // Sinhronizuj aktivni čip ako postoji
      DOM.volumeChips.forEach(chip => {
        if (parseInt(chip.getAttribute('data-vol'), 10) === val) {
          chip.classList.add('active');
        } else {
          chip.classList.remove('active');
        }
      });
      updateCalculations();
    }
  });

  // 6. Unos dimenzija (automatski proračun)
  const dimInputs = [DOM.dimDiameter, DOM.dimLength, DOM.dimWidth];
  dimInputs.forEach(input => {
    input.addEventListener('input', () => {
      state.dimensions.diameter = parseFloat(DOM.dimDiameter.value) || 1000;
      state.dimensions.length = parseFloat(DOM.dimLength.value) || 1300;
      state.dimensions.width = parseFloat(DOM.dimWidth.value) || 1200;

      calculateVolumeFromDimensions();
      updateCalculations();
    });
  });

  // 7. Checkboxevi za dodatnu opremu
  DOM.addonCheckboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      const selected = [];
      DOM.addonCheckboxes.forEach(box => {
        if (box.checked) selected.push(box.value);
      });
      state.addons = selected;
      updateCalculations();
    });
  });

  // 8. Podaci o kupcu
  DOM.custName.addEventListener('input', (e) => { state.customer.name = e.target.value.trim(); });
  DOM.custPhone.addEventListener('input', (e) => { state.customer.phone = e.target.value.trim(); });
  DOM.custLocation.addEventListener('input', (e) => { state.customer.location = e.target.value.trim(); });
  DOM.custNotes.addEventListener('input', (e) => { state.customer.notes = e.target.value.trim(); });

  // 9. Akcije slanja upita
  DOM.btnSendWhatsapp.addEventListener('click', sendViaWhatsApp);
  DOM.btnSendEmail.addEventListener('click', sendViaEmail);
  DOM.btnCopySummary.addEventListener('click', copySummaryToClipboard);
  
  if (DOM.stickyWhatsappTrigger) {
    DOM.stickyWhatsappTrigger.addEventListener('click', sendViaWhatsApp);
  }

  // 10. Dugmad iz sekcije "Proizvodi" (Katalog)
  DOM.categoryTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-category');
      if (cat && CLIENT_CONFIG.categories[cat]) {
        state.category = cat;
        // Selektuj odgovarajući radio taster
        const radio = document.querySelector(`input[name="product_category"][value="${cat}"]`);
        if (radio) radio.checked = true;
        
        renderTypeOptions();
        updateCalculations();

        // Glatki skrol do kalkulatora
        const calcSection = document.getElementById('kalkulator');
        if (calcSection) {
          calcSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}

/**
 * Prebacivanje između unosa zapremine i unosa dimenzija
 */
function switchInputMode(mode) {
  state.inputMode = mode;

  if (mode === 'volume') {
    DOM.tabVolumeMode.classList.add('active');
    DOM.tabVolumeMode.setAttribute('aria-selected', 'true');
    DOM.tabDimMode.classList.remove('active');
    DOM.tabDimMode.setAttribute('aria-selected', 'false');

    DOM.panelVolume.classList.remove('hidden');
    DOM.panelDimensions.classList.add('hidden');

    state.volumeLiters = parseInt(DOM.customVolumeInput.value, 10) || 1000;
  } else {
    DOM.tabDimMode.classList.add('active');
    DOM.tabDimMode.setAttribute('aria-selected', 'true');
    DOM.tabVolumeMode.classList.remove('active');
    DOM.tabVolumeMode.setAttribute('aria-selected', 'false');

    DOM.panelDimensions.classList.remove('hidden');
    DOM.panelVolume.classList.add('hidden');

    calculateVolumeFromDimensions();
  }

  updateCalculations();
}

/**
 * Matematički proračun zapremine na osnovu dimenzija u mm
 */
function calculateVolumeFromDimensions() {
  const dMeters = state.dimensions.diameter / 1000; // prečnik ili širina u metrima
  const lMeters = state.dimensions.length / 1000;   // dužina ili visina u metrima
  let volumeM3 = 0;

  if (state.category === 'bazen' && !DOM.fieldWrapWidth.classList.contains('hidden')) {
    // Pravougaoni bazen: V = Dužina * Širina * Dubina
    const wMeters = state.dimensions.width / 1000;
    volumeM3 = dMeters * lMeters * wMeters;
  } else {
    // Cilindrično telo: V = pi * r^2 * h
    const radius = dMeters / 2;
    volumeM3 = Math.PI * Math.pow(radius, 2) * lMeters;
  }

  const volumeLiters = Math.round(volumeM3 * 1000);
  state.volumeLiters = volumeLiters > 0 ? volumeLiters : 500;

  DOM.autoVolumeDisplay.innerHTML = `cca <strong>${state.volumeLiters.toLocaleString('sr-RS')} Litara</strong> (${(volumeM3).toFixed(2)} m&sup3;)`;
}

/**
 * Glavna funkcija za ažuriranje svih proračuna i prikaza u sažetku
 */
function updateCalculations() {
  const catData = CLIENT_CONFIG.categories[state.category];
  if (!catData) return;

  // 1. Ažuriranje naziva i tipa u sažetku
  DOM.sumProductTitle.textContent = catData.name;
  DOM.sumCategory.textContent = catData.name;
  DOM.sumType.textContent = state.typeName;

  // 2. Zapremina
  const m3 = (state.volumeLiters / 1000).toFixed(2).replace('.', ',');
  DOM.sumVolume.innerHTML = `${state.volumeLiters.toLocaleString('sr-RS')} Litara <span style="font-weight: normal; color: #64748B;">(${m3} m&sup3;)</span>`;

  // 3. Dimenzije
  if (state.inputMode === 'dimensions') {
    if (state.category === 'bazen' && !DOM.fieldWrapWidth.classList.contains('hidden')) {
      DOM.sumDimensions.textContent = `${state.dimensions.diameter} x ${state.dimensions.length} x ${state.dimensions.width} mm`;
    } else {
      DOM.sumDimensions.textContent = `Ø${state.dimensions.diameter} mm x ${state.dimensions.length} mm`;
    }
  } else {
    DOM.sumDimensions.textContent = 'Standardne fabričke dimenzije';
  }

  // 4. Dodatna oprema
  if (state.addons.length === 0) {
    DOM.sumAddons.textContent = 'Osnovni standardni model';
  } else if (state.addons.length === 1) {
    DOM.sumAddons.textContent = state.addons[0];
  } else {
    DOM.sumAddons.textContent = `${state.addons.length} izabrane stavke`;
    DOM.sumAddons.title = state.addons.join(', ');
  }

  // 5. Okvirni informativni proračun cene (Placeholder)
  /* ==========================================================================
     ZA IZMENU – uneti stvarne cene i precizne formule kasnije
     ========================================================================== */
  DOM.estimatedPriceDisplay.innerHTML = `cca ${minPrice.toLocaleString('sr-RS')} &ndash; ${maxPrice.toLocaleString('sr-RS')} &euro;`;

  // 6. Ažuriranje mobilnog plutajućeg trackera
  if (DOM.mobTrackerText) {
    const shortCategory = catData.name.split(' ')[0];
    DOM.mobTrackerText.textContent = `${shortCategory} • ${state.volumeLiters.toLocaleString('sr-RS')} L`;
  }
  if (DOM.mobTrackerPrice) {
    DOM.mobTrackerPrice.innerHTML = `cca ${minPrice.toLocaleString('sr-RS')} &ndash; ${maxPrice.toLocaleString('sr-RS')} &euro;`;
  }
}

/**
 * Validacija kontakt podataka pre slanja upita
 */
function validateCustomerInfo() {
  const name = DOM.custName.value.trim();
  const phone = DOM.custPhone.value.trim();
  const location = DOM.custLocation.value.trim();

  if (!name || !phone || !location) {
    alert('Molimo unesite vaše Ime, Broj telefona i Mesto isporuke kako bismo mogli da formiramo tačnu ponudu.');
    if (!name) DOM.custName.focus();
    else if (!phone) DOM.custPhone.focus();
    else DOM.custLocation.focus();
    return false;
  }
  return true;
}

/**
 * Formiranje tekstualne poruke sa svim specifikacijama
 */
function generateInquiryMessage() {
  const catData = CLIENT_CONFIG.categories[state.category];
  const m3 = (state.volumeLiters / 1000).toFixed(2);
  const addonsText = state.addons.length > 0 ? state.addons.join(', ') : 'Standardna osnovna oprema';
  const dimText = state.inputMode === 'dimensions' 
    ? (state.category === 'bazen' 
        ? `${state.dimensions.diameter} x ${state.dimensions.length} x ${state.dimensions.width} mm` 
        : `Ø${state.dimensions.diameter} mm x ${state.dimensions.length} mm`)
    : 'Standardne fabričke dimenzije';

  const customerName = DOM.custName.value.trim() || 'Nije uneto';
  const customerPhone = DOM.custPhone.value.trim() || 'Nije uneto';
  const customerLocation = DOM.custLocation.value.trim() || 'Nije uneto';
  const customerNotes = DOM.custNotes.value.trim() || 'Nema dodatnih napomena';

  return `Pozdrav TIM PLAST, šaljem upit preko online konfiguratora:

PROIZVOD: ${catData.name}
TIP: ${state.typeName}
ZAPREMINA: ${state.volumeLiters.toLocaleString('sr-RS')} L (${m3} m³)
DIMENZIJE: ${dimText}
DODATNA OPREMA: ${addonsText}

PODACI KUPCA ZA PONUDU:
Ime i prezime: ${customerName}
Kontakt telefon: ${customerPhone}
Mesto isporuke: ${customerLocation}
Napomena / Zahtev: ${customerNotes}

(Upit poslat sa sajta Tim Plast)`;
}

/**
 * Slanje upita putem WhatsApp-a
 */
function sendViaWhatsApp() {
  if (!validateCustomerInfo()) return;

  const text = generateInquiryMessage();
  const encodedText = encodeURIComponent(text);
  const whatsappUrl = `https://wa.me/${CLIENT_CONFIG.whatsappNumber}?text=${encodedText}`;

  window.open(whatsappUrl, '_blank');
}

/**
 * Slanje upita putem Email-a
 */
function sendViaEmail() {
  if (!validateCustomerInfo()) return;

  const catData = CLIENT_CONFIG.categories[state.category];
  const subject = encodeURIComponent(`Upit za ponudu: ${catData.name} - ${state.volumeLiters}L (${DOM.custName.value.trim()})`);
  const body = encodeURIComponent(generateInquiryMessage());
  const mailtoUrl = `mailto:${CLIENT_CONFIG.inquiryEmail}?subject=${subject}&body=${body}`;

  window.location.href = mailtoUrl;
}

/**
 * Kopiranje specifikacije u privremenu memoriju (Clipboard)
 */
function copySummaryToClipboard() {
  const text = generateInquiryMessage();

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showCopySuccess();
    }).catch(() => {
      fallbackCopy(text);
    });
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand('copy');
    showCopySuccess();
  } catch (err) {
    alert('Nije uspelo kopiranje teksta. Molimo koristite dugmad za WhatsApp ili Email.');
  }
  document.body.removeChild(textArea);
}

function showCopySuccess() {
  const originalText = DOM.copyBtnText.textContent;
  DOM.copyBtnText.textContent = 'Tekst uspešno kopiran!';
  DOM.btnCopySummary.style.borderColor = '#16A34A';
  DOM.btnCopySummary.style.color = '#16A34A';

  setTimeout(() => {
    DOM.copyBtnText.textContent = originalText;
    DOM.btnCopySummary.style.borderColor = '';
    DOM.btnCopySummary.style.color = '';
  }, 2500);
}

/**
 * Kontrola prikaza mobilnog plutajućeg trackera tokom skrolovanja
 */
function setupMobileTracker() {
  const calcSection = document.getElementById('kalkulator');
  const summaryCard = document.getElementById('summary-card');
  const tracker = DOM.mobCalcTracker;

  if (!calcSection || !summaryCard || !tracker) return;

  function handleTrackerVisibility() {
    // Na desktopu (>960px) kartica je već sticky sa desne strane, pa tracker nije potreban
    if (window.innerWidth > 960) {
      tracker.classList.remove('visible');
      return;
    }

    const calcRect = calcSection.getBoundingClientRect();
    const summaryRect = summaryCard.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    // Korisnik se nalazi u zoni koraka konfiguratora
    const inCalculatorArea = calcRect.top < windowHeight * 0.5 && calcRect.bottom > 220;
    // Sama kartica sažetka je već vidljiva na ekranu
    const summaryIsVisible = summaryRect.top < windowHeight * 0.85;

    if (inCalculatorArea && !summaryIsVisible) {
      tracker.classList.add('visible');
    } else {
      tracker.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', handleTrackerVisibility, { passive: true });
  window.addEventListener('resize', handleTrackerVisibility, { passive: true });
  handleTrackerVisibility();
}

// Pokretanje pri učitavanju DOM-a
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
