/**
 * ORA BOOKS — Izdavačka Kuća | Bespoke Interactive JavaScript Engine
 * "Vi pišete priču, mi je pretvaramo u knjigu."
 * 
 * Features:
 * - Realtime Live Publishing Estimator & Cost Calculator
 * - Book Excerpt Reader Modal with authentic literary excerpts
 * - 1-Click Fast Book Order Modal with instant calculation
 * - Dynamic Category Filtering for Book Catalog
 * - Video Reels Preview Modal with simulated play
 * - Interactive Consultation & Manuscript Submission with WhatsApp integration
 * - Drag-and-drop Manuscript file upload simulator
 * - FAQ Smooth Accordion
 * - Sticky Header & Mobile Drawer
 * - Toast Notification System
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. DATASETS & EXCERPTS
  // ==========================================================================
  const bookExcerpts = {
    'izmedju-bola': {
      title: 'Između Bola i Nade',
      author: 'Aleksandar Jocić',
      genre: 'Autobiografija / Svedočanstvo',
      cover: 'book-izmedju-bola-i-nade.jpg',
      content: `
        <h4 style="font-family: var(--font-serif); font-size: 1.4rem; color: var(--ink-950); margin-bottom: 0.5rem;">Odlomak iz knjige: Poglavlje III — Prvi zrak svetlosti</h4>
        <p style="font-style: italic; color: var(--gold-600); margin-bottom: 1.25rem;">„Postoje trenuci u životu kada se sve što ste gradili sruši u deliću sekunde. Ali baš u toj tišini ruševina, čovek otkriva od čega je zaista satkan.“</p>
        
        <p style="margin-bottom: 1rem; line-height: 1.7; color: var(--ink-800);">
          Beli bolnički plafon bio je jedino nebo koje sam video nedeljama. Miris antiseptika i jednoličan ritam aparata bili su jedina muzika. U trenucima kada je bol postajao nepodnošljiv, a misli bežale ka pitanju „zašto baš ja?“, shvatio sam nešto što mi je promenilo život: nesreća mi je oduzela mnogo toga, ali mi nije mogla oduzeti glas. Nije mi mogla oduzeti reči.
        </p>
        <p style="margin-bottom: 1rem; line-height: 1.7; color: var(--ink-800);">
          Tražio sam parče papira i hemijsku olovku. Ruka je drhtala, slova su bila iskrivljena, ali sa svakom napisanom rečenicom osećao sam kako se vraćam. Pisao sam o strahu, o veri, o ljudima koji su stajali pored mog kreveta i držali me za ruku kada sam gubio snagu.
        </p>
        <p style="line-height: 1.7; color: var(--ink-800);">
          Ova knjiga nije spomenik bolu. Ona je dokaz da posle najmračnije noći uvek sviće jutro. Ako ove stranice pruže snagu makar jednom čoveku koji se danas bori sa svojom tišinom, moja misija je ispunjena.
        </p>
      `
    },
    'ruze-i-stihovi': {
      title: 'Ruže i Stihovi 2026',
      author: 'ORA BOOKS Zbornik Regionalnih Autora',
      genre: 'Književni Zbornik / Poezija',
      cover: 'book-ruze-i-stihovi.jpg',
      content: `
        <h4 style="font-family: var(--font-serif); font-size: 1.4rem; color: var(--ink-950); margin-bottom: 0.5rem;">Odlomak iz zbornika: Uvodna reč uredništva</h4>
        <p style="font-style: italic; color: var(--gold-600); margin-bottom: 1.25rem;">„Gde god reč ponestane, stih nastavlja da diše.“</p>
        
        <p style="margin-bottom: 1rem; line-height: 1.7; color: var(--ink-800);">
          Zbornik „Ruže i stihovi 2026“ okupio je preko stotinu pesnika i pisaca kratke forme iz cele Srbije, regiona i dijaspore. Svaka pesma u ovoj knjizi prošla je pažljivu selekciju našeg uredničkog kolegijuma.
        </p>
        <div style="background-color: var(--paper-100); padding: 1.25rem; border-left: 3px solid var(--gold-500); border-radius: var(--radius-sm); margin: 1.25rem 0;">
          <p style="font-family: var(--font-serif); font-size: 1.05rem; line-height: 1.6; color: var(--ink-900);">
            <em>„Na stolu bela hartija i senka mirnog sumraka,<br>
            dok kap mastila traži put kroz lavirinte sećanja.<br>
            I nije važno koliko je vetar bio jak,<br>
            ako je stih ostavio neizbrisiv trag...“</em>
          </p>
        </div>
        <p style="line-height: 1.7; color: var(--ink-800);">
          Štampano na posebnom 90g krem papiru sa luksuznim reljefnim detaljima ruža i zlatotiskom.
        </p>
      `
    },
    'srce-na-papiru': {
      title: 'Srce na Papiru',
      author: 'Aleksandar Jocić',
      genre: 'Lirska Poezija',
      cover: 'book-srce-na-papiru.jpg',
      content: `
        <h4 style="font-family: var(--font-serif); font-size: 1.4rem; color: var(--ink-950); margin-bottom: 0.5rem;">Odlomak iz zbirke: Pesma „Otisak Duše“</h4>
        <p style="font-style: italic; color: var(--gold-600); margin-bottom: 1.25rem;">„Kada reči postanu tihe, srce progovori najglasnije.“</p>
        
        <div style="background-color: var(--paper-100); padding: 1.25rem; border-left: 3px solid var(--gold-500); border-radius: var(--radius-sm); margin: 1.25rem 0;">
          <p style="font-family: var(--font-serif); font-size: 1.1rem; line-height: 1.8; color: var(--ink-900);">
            <em>Ne pišem da bih se dopao svetu,<br>
            već da ne zaboravim ko sam kad ostanem sam.<br>
            U svakom slovu ostavljam kap svog disanja,<br>
            u svakom stihu poneki oproštaj i poneki san.<br><br>
            Ako dotakneš ovu hartiju u noći,<br>
            osetićeš kako kuca ono što se okom ne vidi —<br>
            jer srce na papiru nikada ne ume da laže.</em>
          </p>
        </div>
        <p style="line-height: 1.7; color: var(--ink-800);">
          Zbirka pesama u tamnoplavom platnenom povezu sa zlatnim ornamentalnim perom i satenskom trakom.
        </p>
      `
    }
  };

  // ==========================================================================
  // 2. STICKY HEADER & MOBILE DRAWER
  // ==========================================================================
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  const menuToggleBtn = document.getElementById('menu-toggle-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileDrawerOverlay = document.getElementById('mobile-drawer-overlay');
  const closeMobileNavBtn = document.getElementById('close-mobile-nav');
  const drawerLinks = document.querySelectorAll('.drawer-nav-link, .drawer-cta-btn');

  function openMobileDrawer() {
    if (mobileDrawer && mobileDrawerOverlay) {
      mobileDrawer.classList.add('active');
      mobileDrawerOverlay.classList.add('active');
      mobileDrawer.setAttribute('aria-hidden', 'false');
      if (menuToggleBtn) menuToggleBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileDrawer() {
    if (mobileDrawer && mobileDrawerOverlay) {
      mobileDrawer.classList.remove('active');
      mobileDrawerOverlay.classList.remove('active');
      mobileDrawer.setAttribute('aria-hidden', 'true');
      if (menuToggleBtn) menuToggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }

  if (menuToggleBtn) menuToggleBtn.addEventListener('click', openMobileDrawer);
  if (closeMobileNavBtn) closeMobileNavBtn.addEventListener('click', closeMobileDrawer);
  if (mobileDrawerOverlay) mobileDrawerOverlay.addEventListener('click', closeMobileDrawer);
  drawerLinks.forEach(link => link.addEventListener('click', closeMobileDrawer));

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('active')) {
      closeMobileDrawer();
    }
  });

  // ==========================================================================
  // 3. BOOK CATALOG CATEGORY FILTER
  // ==========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const bookCards = document.querySelectorAll('.book-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.getAttribute('data-category');
      bookCards.forEach(card => {
        if (cat === 'all' || card.getAttribute('data-category') === cat) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ==========================================================================
  // 4. EXCERPT READER MODAL
  // ==========================================================================
  const excerptModal = document.getElementById('excerpt-modal');
  const closeExcerptBtn = document.getElementById('close-excerpt-modal');
  const excerptContentDiv = document.getElementById('excerpt-modal-content');
  const openExcerptBtns = document.querySelectorAll('.open-excerpt-btn');

  openExcerptBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const bookId = btn.getAttribute('data-book-id');
      const data = bookExcerpts[bookId];
      if (!data) return;

      excerptContentDiv.innerHTML = `
        <div style="display: flex; gap: 1.5rem; align-items: center; margin-bottom: 1.5rem; padding-bottom: 1.25rem; border-bottom: 1px solid var(--paper-200);">
          <img src="${data.cover}" alt="${data.title}" style="width: 75px; height: 110px; object-fit: cover; border-radius: 6px; box-shadow: var(--shadow-card);">
          <div>
            <span style="font-size: 0.8rem; font-weight: 700; color: var(--gold-600); text-transform: uppercase;">${data.genre}</span>
            <h3 class="font-serif" style="font-size: 1.6rem; color: var(--ink-950); line-height: 1.2; margin: 0.2rem 0;">${data.title}</h3>
            <span style="font-size: 0.9rem; color: var(--ink-600); font-weight: 600;">Autor: ${data.author}</span>
          </div>
        </div>
        <div>
          ${data.content}
        </div>
        <div style="margin-top: 2rem; display: flex; gap: 1rem; justify-content: flex-end;">
          <button class="btn btn-outline btn-sm close-modal-action">Zatvori Čitanje</button>
          <a href="#zakazivanje" class="btn btn-gold btn-sm close-modal-action">Zakažite Svoju Knjigu</a>
        </div>
      `;

      excerptModal.classList.add('open');
      document.body.style.overflow = 'hidden';

      const closeActionBtns = excerptContentDiv.querySelectorAll('.close-modal-action');
      closeActionBtns.forEach(b => b.addEventListener('click', () => {
        excerptModal.classList.remove('open');
        document.body.style.overflow = '';
      }));
    });
  });

  if (closeExcerptBtn) {
    closeExcerptBtn.addEventListener('click', () => {
      excerptModal.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  // ==========================================================================
  // 5. QUICK BOOK ORDER MODAL
  // ==========================================================================
  const orderModal = document.getElementById('order-modal');
  const closeOrderBtn = document.getElementById('close-order-modal');
  const openOrderBtns = document.querySelectorAll('.open-order-btn');
  const orderForm = document.getElementById('order-book-form');
  const orderModalTitle = document.getElementById('order-book-modal-title');
  const orderHiddenTitle = document.getElementById('order-hidden-title');
  const orderHiddenPrice = document.getElementById('order-hidden-price');
  const orderQtyInput = document.getElementById('order-qty');
  const orderSummaryPrice = document.getElementById('order-summary-price');

  function updateOrderPrice() {
    const unitPrice = parseInt(orderHiddenPrice.value, 10) || 1200;
    const qty = parseInt(orderQtyInput.value, 10) || 1;
    const total = unitPrice * qty;
    orderSummaryPrice.textContent = `${total.toLocaleString('sr-RS')} RSD + trošak dostave`;
  }

  openOrderBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.getAttribute('data-book-title');
      const price = parseInt(btn.getAttribute('data-book-price'), 10) || 1200;

      orderModalTitle.textContent = `Naručite: ${title}`;
      orderHiddenTitle.value = title;
      orderHiddenPrice.value = price;
      orderQtyInput.value = 1;
      updateOrderPrice();

      orderModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  if (orderQtyInput) {
    orderQtyInput.addEventListener('input', updateOrderPrice);
  }

  if (closeOrderBtn) {
    closeOrderBtn.addEventListener('click', () => {
      orderModal.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const bookTitle = orderHiddenTitle.value;
      const name = document.getElementById('order-name').value;
      const phone = document.getElementById('order-phone').value;
      const qty = orderQtyInput.value;
      const address = document.getElementById('order-address').value;
      const city = document.getElementById('order-city').value;

      orderModal.classList.remove('open');
      document.body.style.overflow = '';

      showToast(`Hvala ${name}! Narudžbina za "${bookTitle}" (${qty} primeraka) je primljena.`, 'check');

      // Also trigger WhatsApp option if customer prefers
      const waText = encodeURIComponent(`Pozdrav ORA BOOKS! Želim da naručim knjigu "${bookTitle}". Količina: ${qty} kom. Ime: ${name}, Telefon: ${phone}, Adresa: ${address}, ${city}.`);
      console.log('Order generated:', waText);
    });
  }

  // ==========================================================================
  // 6. REALTIME PUBLISHING ESTIMATOR & CALCULATOR
  // ==========================================================================
  const sliderPages = document.getElementById('slider-pages');
  const sliderCopies = document.getElementById('slider-copies');
  const badgePageCount = document.getElementById('badge-page-count');
  const badgeCopiesCount = document.getElementById('badge-copies-count');

  const summaryPagesVal = document.getElementById('summary-pages-val');
  const summaryCopiesVal = document.getElementById('summary-copies-val');
  const summaryCoverVal = document.getElementById('summary-cover-val');
  const summaryTotalVal = document.getElementById('summary-total-val');
  const summaryPerCopyVal = document.getElementById('summary-per-copy-val');

  const coverOptionButtons = document.querySelectorAll('.option-chip[data-cover]');
  let selectedCover = 'hard'; // default hard cover

  const addonIsbn = document.getElementById('addon-isbn');
  const addonProofreading = document.getElementById('addon-proofreading');
  const addonFoil = document.getElementById('addon-foil');
  const addonVideo = document.getElementById('addon-video');

  function calculateEstimate() {
    const pages = parseInt(sliderPages.value, 10);
    const copies = parseInt(sliderCopies.value, 10);

    // Update badges
    badgePageCount.textContent = `${pages} strana`;
    badgeCopiesCount.textContent = `${copies} primeraka`;

    summaryPagesVal.textContent = `${pages} strana (A5)`;
    summaryCopiesVal.textContent = `${copies} knjiga`;
    summaryCoverVal.textContent = selectedCover === 'hard' ? 'Luksuzni Tvrd Povez (2.5mm)' : 'Meki Broširani Povez (300g)';

    // Formula calculation:
    // Base setup & DTP cost (fixed layout cost):
    let baseSetup = 12000 + (pages * 60);

    // Printing cost per copy based on page count and cover:
    let costPerCopyBase = (pages * 1.8);
    if (selectedCover === 'hard') {
      costPerCopyBase += 220; // Hardcover cardboard, stitching, binding
    } else {
      costPerCopyBase += 90;  // Softcover binding
    }

    let totalPrint = copies * costPerCopyBase;

    // Addons
    let addonsTotal = 0;
    if (addonIsbn && addonIsbn.checked) addonsTotal += 4000; // CIP + ISBN + barcode
    if (addonProofreading && addonProofreading.checked) addonsTotal += (pages * 90); // Lektorisanje
    if (addonFoil && addonFoil.checked) addonsTotal += 6500; // Gold foil matrix setup
    if (addonVideo && addonVideo.checked) addonsTotal += 8000; // Reels video package

    let totalInvest = Math.round(baseSetup + totalPrint + addonsTotal);

    // Round to nearest 500 RSD for clean presentation
    totalInvest = Math.round(totalInvest / 500) * 500;

    let perCopy = Math.round(totalInvest / copies);

    summaryTotalVal.textContent = `${totalInvest.toLocaleString('sr-RS')} RSD`;
    summaryPerCopyVal.textContent = `(cca ${perCopy.toLocaleString('sr-RS')} RSD po primerku)`;
  }

  if (sliderPages && sliderCopies) {
    sliderPages.addEventListener('input', calculateEstimate);
    sliderCopies.addEventListener('input', calculateEstimate);

    coverOptionButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        coverOptionButtons.forEach(b => {
          b.classList.remove('selected');
          const icon = b.querySelector('svg');
          if (icon) icon.innerHTML = '<circle cx="12" cy="12" r="10"/>';
        });
        btn.classList.add('selected');
        const activeIcon = btn.querySelector('svg');
        if (activeIcon) activeIcon.innerHTML = '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>';

        selectedCover = btn.getAttribute('data-cover');
        calculateEstimate();
      });
    });

    [addonIsbn, addonProofreading, addonFoil, addonVideo].forEach(chk => {
      if (chk) chk.addEventListener('change', calculateEstimate);
    });

    calculateEstimate();
  }

  // Pre-fill form when user clicks "Pošaljite mi ovu ponudu"
  const btnRequestCalcQuote = document.getElementById('btn-request-calc-quote');
  if (btnRequestCalcQuote) {
    btnRequestCalcQuote.addEventListener('click', () => {
      const pages = sliderPages.value;
      const copies = sliderCopies.value;
      const cover = selectedCover === 'hard' ? 'Tvrd povez' : 'Meki povez';
      const total = summaryTotalVal.textContent;

      const messageBox = document.getElementById('form-message');
      if (messageBox) {
        messageBox.value = `Zainteresovan sam za kalkulaciju: ${copies} primeraka, ${pages} strana, ${cover}. Procenjen iznos: ${total}.`;
      }

      const purposeSelect = document.getElementById('form-purpose');
      if (purposeSelect) {
        purposeSelect.value = 'izdavanje-knjige';
      }

      const bookingSec = document.getElementById('zakazivanje');
      if (bookingSec) {
        bookingSec.scrollIntoView({ behavior: 'smooth' });
      }

      showToast('Kalkulacija je prenesena u formular ispod!', 'check');
    });
  }

  // ==========================================================================
  // 7. DRAG-AND-DROP FILE UPLOAD SIMULATOR
  // ==========================================================================
  const dropZone = document.getElementById('file-drop-zone');
  const fileInput = document.getElementById('file-input');
  const fileNameDisplay = document.getElementById('file-name-display');

  if (dropZone && fileInput) {
    dropZone.addEventListener('click', () => fileInput.click());

    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.style.borderColor = 'var(--gold-500)';
      dropZone.style.backgroundColor = 'rgba(197, 155, 39, 0.08)';
    });

    dropZone.addEventListener('dragleave', () => {
      dropZone.style.borderColor = 'var(--paper-300)';
      dropZone.style.backgroundColor = 'var(--paper-50)';
    });

    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.style.borderColor = 'var(--paper-300)';
      dropZone.style.backgroundColor = 'var(--paper-50)';

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFileSelect(e.dataTransfer.files[0]);
      }
    });

    fileInput.addEventListener('change', () => {
      if (fileInput.files && fileInput.files.length > 0) {
        handleFileSelect(fileInput.files[0]);
      }
    });
  }

  function handleFileSelect(file) {
    if (fileNameDisplay) {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
      fileNameDisplay.textContent = `Priložen fajl: ${file.name} (${sizeMb} MB)`;
      fileNameDisplay.style.display = 'block';
      showToast(`Priložen dokument: ${file.name}`, 'check');
    }
  }

  // ==========================================================================
  // 8. CONSULTATION FORM & WHATSAPP GENERATOR
  // ==========================================================================
  const consultationForm = document.getElementById('consultation-form');
  const successModal = document.getElementById('success-modal');
  const closeSuccessModalBtn = document.getElementById('close-success-modal-btn');
  const btnWhatsappFollowup = document.getElementById('btn-whatsapp-followup');

  if (consultationForm) {
    consultationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name').value;
      const email = document.getElementById('form-email').value;
      const phone = document.getElementById('form-phone').value;
      const city = document.getElementById('form-city').value || 'Srbija';
      const purpose = document.getElementById('form-purpose').value;
      const genre = document.getElementById('form-genre').value;
      const status = document.getElementById('form-status').value;
      const callType = document.getElementById('form-call-type').value;
      const timePref = document.getElementById('form-time-pref').value;
      const message = document.getElementById('form-message').value || 'Bez dodatne poruke';

      // WhatsApp text generation
      const waMessage = `Pozdrav Aleksandre! Ja sam ${name} (${city}). Želim da zakažem konsultacije za ${purpose}. Žanr: ${genre}, Stanje rukopisa: ${status}. Kontakt: ${phone}, ${email}. Željeni termin: ${timePref} (${callType}). Poruka: ${message}`;
      const waUrl = `https://wa.me/381601234567?text=${encodeURIComponent(waMessage)}`;

      if (btnWhatsappFollowup) {
        btnWhatsappFollowup.href = waUrl;
      }

      // Show Success Modal
      if (successModal) {
        document.getElementById('success-modal-desc').innerHTML = `
          Hvala vam, <strong>${name}</strong>! Vaša prijava za <em>${purpose}</em> je zabeležena.<br>
          Kontaktiraćemo vas putem telefona (<strong>${phone}</strong>) ili emaila radi potvrde termina u periodu <strong>${timePref}</strong>.
        `;
        successModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }

      consultationForm.reset();
      if (fileNameDisplay) fileNameDisplay.style.display = 'none';

      showToast('Prijava uspešno poslata! Očekujte poziv.', 'check');
    });
  }

  if (closeSuccessModalBtn) {
    closeSuccessModalBtn.addEventListener('click', () => {
      successModal.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  // ==========================================================================
  // 9. VIDEO REELS PREVIEW MODAL
  // ==========================================================================
  const reelModal = document.getElementById('reel-modal');
  const closeReelBtn = document.getElementById('close-reel-modal');
  const reelCards = document.querySelectorAll('.open-reel-modal');
  const reelModalBody = document.getElementById('reel-modal-body');

  reelCards.forEach(card => {
    card.addEventListener('click', () => {
      const title = card.getAttribute('data-reel-title');
      const views = card.getAttribute('data-views');
      const likes = card.getAttribute('data-likes');
      const img = card.querySelector('img').src;

      reelModalBody.innerHTML = `
        <div style="position: relative; border-radius: var(--radius-md); overflow: hidden; background: #000; margin-bottom: 1.25rem;">
          <img src="${img}" alt="${title}" style="width: 100%; aspect-ratio: 9/12; object-fit: cover; filter: brightness(0.9);">
          
          <div style="position: absolute; top: 12px; left: 12px; right: 12px; display: flex; justify-content: space-between; align-items: center; color: #fff; z-index: 2;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span class="brand-logo-icon" style="width: 28px; height: 28px; border-radius: 50%;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 16px; height: 16px;"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/></svg>
              </span>
              <strong style="font-size: 0.85rem;">@orabooks</strong>
            </div>
            <span style="font-size: 0.75rem; background: rgba(0,0,0,0.5); padding: 0.2rem 0.5rem; border-radius: 999px;">${views} pregleda</span>
          </div>

          <!-- Video Progress Bar Animation -->
          <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 3px; background: rgba(255,255,255,0.2);">
            <div style="height: 100%; width: 68%; background: var(--gold-400);"></div>
          </div>
        </div>

        <h4 class="font-serif" style="font-size: 1.25rem; color: var(--ink-950); margin-bottom: 0.5rem; line-height: 1.35;">${title}</h4>
        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem; color: var(--ink-600); margin-bottom: 1.25rem;">
          <span>${likes} lajkova &bull; ORA BOOKS Izdavaštvo</span>
          <a href="https://instagram.com" target="_blank" rel="noopener" style="color: var(--gold-600); font-weight: 700; display: inline-flex; align-items: center; gap: 0.25rem;">
            Pogledaj na Instagramu &rarr;
          </a>
        </div>
      `;

      reelModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  if (closeReelBtn) {
    closeReelBtn.addEventListener('click', () => {
      reelModal.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  // Close modals on clicking backdrop
  [excerptModal, orderModal, reelModal, successModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    }
  });

  // ==========================================================================
  // 10. FAQ ACCORDION
  // ==========================================================================
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close other items
      faqItems.forEach(other => {
        other.classList.remove('active');
        const otherTrigger = other.querySelector('.faq-trigger');
        if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ==========================================================================
  // 11. TOAST NOTIFICATION UTILITY
  // ==========================================================================
  function showToast(message, iconType = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';

    let iconSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>';
    if (iconType === 'check') {
      iconSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>';
    }

    toast.innerHTML = `${iconSvg}<span>${message}</span>`;
    container.appendChild(toast);

    // Animate in
    setTimeout(() => toast.classList.add('show'), 20);

    // Auto remove after 4.5 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 4500);
  }

  // Log readiness
  console.log('ORA BOOKS interactive engine initialized successfully.');
});
