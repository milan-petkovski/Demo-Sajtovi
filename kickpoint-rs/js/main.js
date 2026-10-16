/**
 * Kickpoint.rs - Glavni JavaScript (main.js)
 * Upravljanje korpom (localStorage), drawer, modal, forme, mobilna navigacija
 */

// Ključ u localStorage za korpu
const CART_STORAGE_KEY = 'kickpoint_cart_v1';

// Pomoćna funkcija za renderovanje SVG ikona iz spritesheet-a
function renderIcon(iconName, className = '') {
  return `<svg class="icon ${className}" aria-hidden="true"><use href="assets/icons.svg#icon-${iconName}"></use></svg>`;
}

// -------------------------------------------------------------
// 1. FUNKCIJE ZA KORPU (LOCALSTORAGE)
// -------------------------------------------------------------

function getCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Greška pri čitanju korpe iz localStorage:', e);
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartUI();
  } catch (e) {
    console.error('Greška pri čuvanju korpe u localStorage:', e);
  }
}

function addToCart(productId, size, colorName, quantity = 1, openDrawer = true) {
  if (!productId || !size) {
    alert('Molimo izaberite veličinu patika pre dodavanja u korpu.');
    return false;
  }

  const cart = getCart();
  const existingIndex = cart.findIndex(item => item.productId === productId && item.size === size);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({
      productId,
      size,
      color: colorName || 'Standardna',
      quantity
    });
  }

  saveCart(cart);

  if (openDrawer) {
    openCartDrawer();
  }
  return true;
}

function removeFromCart(productId, size) {
  let cart = getCart();
  cart = cart.filter(item => !(item.productId === productId && item.size === size));
  saveCart(cart);
}

function updateCartQuantity(productId, size, delta) {
  const cart = getCart();
  const item = cart.find(i => i.productId === productId && i.size === size);

  if (!item) return;

  const newQty = item.quantity + delta;
  if (newQty <= 0) {
    removeFromCart(productId, size);
  } else {
    item.quantity = newQty;
    saveCart(cart);
  }
}

function clearCart() {
  localStorage.removeItem(CART_STORAGE_KEY);
  updateCartUI();
}

function getCartTotals() {
  const cart = getCart();
  let subtotal = 0;
  let itemsCount = 0;

  cart.forEach(item => {
    const product = getProductById(item.productId);
    if (product) {
      subtotal += product.price * item.quantity;
      itemsCount += item.quantity;
    }
  });

  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingFee = (subtotal === 0 || isFreeShipping) ? 0 : STANDARD_SHIPPING_FEE;
  const total = subtotal + shippingFee;

  return {
    itemsCount,
    subtotal,
    shippingFee,
    isFreeShipping,
    total,
    amountNeededForFreeShipping: Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)
  };
}

// -------------------------------------------------------------
// 2. KORPA DRAWER I UI AŽURIRANJE
// -------------------------------------------------------------

function updateCartUI() {
  const totals = getCartTotals();

  // Ažuriraj brojač na svim dugmićima korpe u zaglavlju
  const badges = document.querySelectorAll('.cart-count-badge');
  badges.forEach(badge => {
    badge.textContent = totals.itemsCount;
    badge.style.display = totals.itemsCount > 0 ? 'flex' : 'none';
  });

  // Renderuj sadržaj drawer-a ako postoji na stranici
  renderCartDrawerContent(totals);

  // Ako smo na checkout stranici, ažuriraj rezime
  if (typeof renderCheckoutSummary === 'function') {
    renderCheckoutSummary(totals);
  }
}

function renderCartDrawerContent(totals) {
  const container = document.getElementById('cartDrawerItems');
  const footerContainer = document.getElementById('cartDrawerFooter');
  const shippingContainer = document.getElementById('cartShippingBar');

  if (!container || !footerContainer) return;

  const cart = getCart();

  // Progress bar za besplatnu dostavu
  if (shippingContainer) {
    if (cart.length === 0) {
      shippingContainer.style.display = 'none';
    } else {
      shippingContainer.style.display = 'block';
      const pct = Math.min(100, Math.round((totals.subtotal / FREE_SHIPPING_THRESHOLD) * 100));
      
      let msg = '';
      if (totals.isFreeShipping) {
        msg = `${renderIcon('check', 'icon--sm')} Ostvario si <strong>besplatnu dostavu</strong>!`;
      } else {
        msg = `Dodaj još <strong>${formatRSD(totals.amountNeededForFreeShipping)}</strong> za besplatnu dostavu`;
      }

      shippingContainer.innerHTML = `
        <div class="shipping-bar__text">${msg}</div>
        <div class="shipping-bar__progress">
          <div class="shipping-bar__fill" style="width: ${pct}%;"></div>
        </div>
      `;
    }
  }

  // Ako je prazna korpa
  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty__icon">${renderIcon('cart', 'icon--xl')}</div>
        <h3>Tvoja korpa je prazna</h3>
        <p>Istraži našu ponudu i izaberi svoj omiljeni model patika.</p>
        <a href="prodavnica.html" class="btn btn--primary" style="margin-top: 8px;">Pogledaj ponudu</a>
      </div>
    `;
    footerContainer.style.display = 'none';
    return;
  }

  // Lista stavki
  footerContainer.style.display = 'flex';
  let html = '';

  cart.forEach(item => {
    const product = getProductById(item.productId);
    if (!product) return;

    const itemTotal = product.price * item.quantity;
    const thumbImg = product.images[0] || 'assets/favicon.svg';

    html += `
      <div class="cart-item">
        <div class="cart-item__visual">
          <img src="${thumbImg}" alt="${product.name}" loading="lazy">
        </div>
        <div class="cart-item__details">
          <h4 class="cart-item__title">${product.name}</h4>
          <div class="cart-item__meta">Broj: <strong>${item.size}</strong> &bull; Boja: ${item.color}</div>
          <div class="cart-item__price">${formatRSD(itemTotal)}</div>
          
          <div class="qty-control">
            <button type="button" class="qty-control__btn" onclick="updateCartQuantity('${item.productId}', ${item.size}, -1)" aria-label="Smanji količinu">
              ${renderIcon('minus', 'icon--sm')}
            </button>
            <span class="qty-control__val">${item.quantity}</span>
            <button type="button" class="qty-control__btn" onclick="updateCartQuantity('${item.productId}', ${item.size}, 1)" aria-label="Povećaj količinu">
              ${renderIcon('plus', 'icon--sm')}
            </button>
          </div>
        </div>
        <button type="button" class="cart-item__remove" onclick="removeFromCart('${item.productId}', ${item.size})" aria-label="Ukloni artikl">
          ${renderIcon('trash', 'icon--sm')}
        </button>
      </div>
    `;
  });

  container.innerHTML = html;

  // Footer sa sabirkom
  const shippingText = totals.isFreeShipping 
    ? '<span style="color: var(--color-success); font-weight: 700;">Besplatna</span>' 
    : formatRSD(totals.shippingFee);

  footerContainer.innerHTML = `
    <div class="cart-summary-row">
      <span>Međuzbir:</span>
      <strong>${formatRSD(totals.subtotal)}</strong>
    </div>
    <div class="cart-summary-row">
      <span>Dostava (Post Express / BEX):</span>
      <span>${shippingText}</span>
    </div>
    <div class="cart-summary-row cart-summary-row--total">
      <span>Ukupno za uplatu:</span>
      <span class="text-gradient">${formatRSD(totals.total)}</span>
    </div>
    <a href="checkout.html" class="btn btn--primary btn--lg btn--full" style="margin-top: 8px;">
      Nastavi na poručivanje ${renderIcon('chevron-right', 'icon--sm')}
    </a>
    <div class="cart-guarantee-note">
      ${renderIcon('shield', 'icon--sm')} Plaćanje pouzećem pri preuzimanju paketa
    </div>
  `;
}

function openCartDrawer() {
  const overlay = document.getElementById('cartDrawerOverlay');
  if (overlay) {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeCartDrawer() {
  const overlay = document.getElementById('cartDrawerOverlay');
  if (overlay) {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// -------------------------------------------------------------
// 3. TABELA VELIČINA (MODAL)
// -------------------------------------------------------------

function openSizeModal() {
  const modal = document.getElementById('sizeGuideModal');
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeSizeModal() {
  const modal = document.getElementById('sizeGuideModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// -------------------------------------------------------------
// 4. MOBILNA NAVIGACIJA
// -------------------------------------------------------------

function toggleMobileNav() {
  const nav = document.getElementById('mobileNav');
  if (nav) {
    nav.classList.toggle('open');
  }
}

function closeMobileNav() {
  const nav = document.getElementById('mobileNav');
  if (nav) {
    nav.classList.remove('open');
  }
}

// -------------------------------------------------------------
// 5. AKORDEON (FAQ I PROIZVOD DETALJI)
// -------------------------------------------------------------

function initAccordions() {
  const accordionQuestions = document.querySelectorAll('.faq-question, .accordion-header');
  accordionQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.parentElement;
      const isActive = parent.classList.contains('active');

      // Zatvori ostale u istoj grupi ako želimo jedan po jedan
      const group = parent.parentElement;
      if (group) {
        group.querySelectorAll('.faq-item, .accordion-item').forEach(item => {
          if (item !== parent) item.classList.remove('active');
        });
      }

      if (isActive) {
        parent.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
      } else {
        parent.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

// -------------------------------------------------------------
// 6. GLOBALNA INICIJALIZACIJA NA DOMContentLoaded
// -------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  // Ažuriraj stanje korpe
  updateCartUI();

  // Inicijalizuj akordeone
  initAccordions();

  // Zatvaranje na klik van drawera/modala
  const cartOverlay = document.getElementById('cartDrawerOverlay');
  if (cartOverlay) {
    cartOverlay.addEventListener('click', (e) => {
      if (e.target === cartOverlay) closeCartDrawer();
    });
  }

  const sizeModal = document.getElementById('sizeGuideModal');
  if (sizeModal) {
    sizeModal.addEventListener('click', (e) => {
      if (e.target === sizeModal) closeSizeModal();
    });
  }

  // Zatvaranje na ESC taster
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCartDrawer();
      closeSizeModal();
      closeMobileNav();
      
      const filterSheet = document.getElementById('mobileFilterSheet');
      if (filterSheet) filterSheet.classList.remove('open');
    }
  });
});
