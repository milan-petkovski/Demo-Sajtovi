/**
 * MB SHOP - Valjevo | Interactive Boutique Experience
 * Features:
 * - Dynamic Category Filtering (Kindershop-inspired)
 * - Realtime Live Search
 * - Interactive Shopping Drawer / Cart
 * - One-Click WhatsApp & Phone Order Generation
 * - Quick-view Modal Dialog
 * - Custom SVG product art rendering (No missing images, crisp on Retina)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Product Catalog Dataset
  const products = [
    {
      id: 'mb-01',
      name: 'Eugen Luxury Čokoladni Poklon Box',
      category: 'pokloni',
      categoryName: 'Poklon Setovi',
      price: 2450,
      oldPrice: 2890,
      badge: 'Bestseller',
      badgeClass: 'badge-top',
      desc: 'Ekskluzivna selekcija ručno pravljenih Eugen čokolada sa suvim voćem, lešnikom i unikatnom posvetom. Idealan poklon za svaku priliku.',
      inStock: true,
      svgType: 'chocolate'
    },
    {
      id: 'mb-02',
      name: 'Plišani Meda & Sweet Romance Korpa',
      category: 'pokloni',
      categoryName: 'Poklon Setovi',
      price: 3200,
      oldPrice: 3800,
      badge: 'Poklon Ideja',
      badgeClass: 'badge-gift',
      desc: 'Meki plišani meda vrhunskog kvaliteta sa setom poslastica i satenskom mašnom. Moguća personalizovana poruka.',
      inStock: true,
      svgType: 'giftbox'
    },
    {
      id: 'mb-03',
      name: 'Edukativna Drvena Igračka - Montessori Kocka',
      category: 'decije',
      categoryName: 'Dečiji & Bebi Kutak',
      price: 1850,
      oldPrice: null,
      badge: 'Novo',
      badgeClass: 'badge-new',
      desc: 'Prirodno fino brušeno drvo i netoksične boje. Razvija motoriku, logiku i pažnju kod mališana (1-4 god).',
      inStock: true,
      svgType: 'toy'
    },
    {
      id: 'mb-04',
      name: 'Muzička Vrteska za Bebe "Zvezdano Nebo"',
      category: 'decije',
      categoryName: 'Dečiji & Bebi Kutak',
      price: 2790,
      oldPrice: 3200,
      badge: 'Preporuka',
      badgeClass: 'badge-top',
      desc: 'Umirujuće melodije i rotirajuće plišane figure za krevetac. Pomaže mirnom i lagodnom snu bebe.',
      inStock: true,
      svgType: 'crib'
    },
    {
      id: 'mb-05',
      name: 'Boutique Aranžman: Crveno Vino & Praline',
      category: 'delikatesi',
      categoryName: 'Delikatesi & Pića',
      price: 3600,
      oldPrice: 4100,
      badge: 'Premium',
      badgeClass: 'badge-top',
      desc: 'Selekcija vrhunskog domaćeg vina uparena sa zanatskim belgijskim pralinama i svežim aranžmanom u drvenoj kutiji.',
      inStock: true,
      svgType: 'wine'
    },
    {
      id: 'mb-06',
      name: 'Mirisne Sveće & Spa Wellness Poklon Paket',
      category: 'pokloni',
      categoryName: 'Poklon Setovi',
      price: 2100,
      oldPrice: null,
      badge: 'Popularno',
      badgeClass: 'badge-gift',
      desc: 'Prirodni sojin vosak, esencijalna ulja lavande i vanile, drveni fitilj koji prijatno pucketa i ručno pravljeni sapuni.',
      inStock: true,
      svgType: 'candle'
    },
    {
      id: 'mb-07',
      name: 'Silikonski Set za Hranjenje Beba (BPA Free)',
      category: 'decije',
      categoryName: 'Dečiji & Bebi Kutak',
      price: 1650,
      oldPrice: 1950,
      badge: 'Praktično',
      badgeClass: 'badge-new',
      desc: 'Kompletan set: tanjirić sa vakuum dnom, portikla sa džepom, čašica sa slamčicom i meka ergonomska kašičica.',
      inStock: true,
      svgType: 'baby'
    },
    {
      id: 'mb-08',
      name: 'Zanatski Čokoladni Liker & Truffle Kugle',
      category: 'delikatesi',
      categoryName: 'Delikatesi & Pića',
      price: 2300,
      oldPrice: null,
      badge: 'Lokalni Ukus',
      badgeClass: 'badge-top',
      desc: 'Kremasti domaći čokoladni liker i ručno valjane tartuf kugle u kakau. Pakovano sa pečatnim voskom.',
      inStock: true,
      svgType: 'liqueur'
    }
  ];

  // Cart State (stored in memory & localStorage)
  let cart = JSON.parse(localStorage.getItem('mb_shop_cart') || '[]');
  let activeCategory = 'all';
  let searchQuery = '';

  // DOM Elements
  const productsContainer = document.getElementById('products-grid');
  const catalogCountEl = document.getElementById('catalog-count');
  const categoryChips = document.querySelectorAll('.cat-chip');
  const searchInput = document.getElementById('search-input');
  const clearSearchBtn = document.getElementById('clear-search-btn');
  
  const cartToggleBtn = document.getElementById('cart-toggle-btn');
  const cartDrawer = document.getElementById('cart-drawer');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const btnCloseDrawer = document.getElementById('btn-close-drawer');
  const cartBadge = document.getElementById('cart-badge');
  const cartItemsContainer = document.getElementById('cart-items-container');
  const cartEmptyState = document.getElementById('cart-empty-state');
  const cartSubtotalEl = document.getElementById('cart-subtotal-val');
  const btnCheckoutWhatsapp = document.getElementById('btn-checkout-whatsapp');
  const btnCheckoutCall = document.getElementById('btn-checkout-call');

  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalCategory = document.getElementById('modal-category');
  const modalDesc = document.getElementById('modal-desc');
  const modalPrice = document.getElementById('modal-price');
  const modalVisual = document.getElementById('modal-visual');
  const modalAddToCartBtn = document.getElementById('modal-add-to-cart');
  const modalWhatsappBtn = document.getElementById('modal-whatsapp-btn');
  let currentModalProduct = null;

  const toastNotice = document.getElementById('toast-notice');
  const toastText = document.getElementById('toast-text');

  // Contact Info
  const WHATSAPP_PHONE = '381641234567'; // Format without '+' for WhatsApp API
  const DISPLAY_PHONE = '064 / 123-4567';

  // SVG Artwork Generators for Crisp Displays
  function getProductSVG(type, name) {
    switch (type) {
      case 'chocolate':
        return `
          <svg class="product-svg-art" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="300" height="300" fill="#FFFBEB"/>
            <rect x="50" y="55" width="200" height="190" rx="16" fill="#78350F" stroke="#92400E" stroke-width="4"/>
            <rect x="70" y="75" width="160" height="42" rx="8" fill="#92400E"/>
            <rect x="70" y="125" width="160" height="42" rx="8" fill="#92400E"/>
            <rect x="70" y="175" width="160" height="42" rx="8" fill="#92400E"/>
            <path d="M150 40 V 260" stroke="#FBBF24" stroke-width="16" stroke-dasharray="8 8"/>
            <path d="M30 150 H 270" stroke="#FBBF24" stroke-width="16" stroke-dasharray="8 8"/>
            <circle cx="150" cy="150" r="28" fill="#F59E0B" stroke="#B45309" stroke-width="4"/>
            <path d="M140 142 L 160 158 M 160 142 L 140 158" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round"/>
          </svg>
        `;
      case 'giftbox':
        return `
          <svg class="product-svg-art" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="300" height="300" fill="#FFF7ED"/>
            <rect x="65" y="105" width="170" height="140" rx="14" fill="#EA580C"/>
            <rect x="55" y="85" width="190" height="36" rx="8" fill="#C2410C"/>
            <rect x="135" y="85" width="30" height="160" fill="#FED7AA"/>
            <!-- Bow -->
            <path d="M150 85 C 120 40, 75 55, 105 85 Z" fill="#FED7AA" stroke="#FDBA74" stroke-width="2"/>
            <path d="M150 85 C 180 40, 225 55, 195 85 Z" fill="#FED7AA" stroke="#FDBA74" stroke-width="2"/>
            <circle cx="150" cy="85" r="10" fill="#FB923C"/>
          </svg>
        `;
      case 'toy':
        return `
          <svg class="product-svg-art" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="300" height="300" fill="#F0FDF4"/>
            <!-- Wooden Shape Sorter Box -->
            <polygon points="150,50 240,105 150,160 60,105" fill="#FDE68A" stroke="#D97706" stroke-width="4"/>
            <polygon points="60,105 150,160 150,250 60,195" fill="#D97706"/>
            <polygon points="240,105 150,160 150,250 240,195" fill="#B45309"/>
            <circle cx="105" cy="180" r="16" fill="#3B82F6"/>
            <rect x="180" y="165" width="30" height="30" rx="4" fill="#EF4444"/>
            <polygon points="150,85 165,115 135,115" fill="#10B981"/>
          </svg>
        `;
      case 'crib':
        return `
          <svg class="product-svg-art" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="300" height="300" fill="#F0F9FF"/>
            <path d="M150 40 V 100" stroke="#0284C7" stroke-width="6" stroke-linecap="round"/>
            <circle cx="150" cy="100" r="14" fill="#38BDF8"/>
            <path d="M100 130 Q 150 100 200 130" stroke="#0284C7" stroke-width="4" fill="none"/>
            <circle cx="95" cy="180" r="18" fill="#F43F5E"/>
            <polygon points="150,160 160,185 140,185" fill="#FBBF24"/>
            <circle cx="205" cy="180" r="18" fill="#8B5CF6"/>
            <path d="M95 130 V 162 M 150 114 V 160 M 205 130 V 162" stroke="#94A3B8" stroke-width="2"/>
          </svg>
        `;
      case 'wine':
        return `
          <svg class="product-svg-art" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="300" height="300" fill="#FEF2F2"/>
            <path d="M135 60 H 165 V 100 L 180 130 V 240 H 120 V 130 L 135 100 Z" fill="#881337" stroke="#4C0519" stroke-width="4"/>
            <rect x="132" y="50" width="36" height="12" rx="3" fill="#BE123C"/>
            <rect x="126" y="145" width="48" height="60" rx="4" fill="#FFF1F2" stroke="#E11D48" stroke-width="2"/>
            <line x1="134" y1="165" x2="166" y2="165" stroke="#9F1239" stroke-width="3"/>
            <line x1="138" y1="175" x2="162" y2="175" stroke="#9F1239" stroke-width="2"/>
          </svg>
        `;
      case 'candle':
        return `
          <svg class="product-svg-art" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="300" height="300" fill="#FAF5FF"/>
            <rect x="95" y="120" width="110" height="120" rx="12" fill="#E9D5FF" stroke="#A855F7" stroke-width="4"/>
            <ellipse cx="150" cy="120" rx="55" ry="16" fill="#F3E8FF" stroke="#A855F7" stroke-width="3"/>
            <path d="M150 116 V 95" stroke="#6B21A8" stroke-width="4" stroke-linecap="round"/>
            <path d="M150 95 C 140 80, 140 65, 150 50 C 160 65, 160 80, 150 95 Z" fill="#F59E0B" stroke="#D97706" stroke-width="2"/>
          </svg>
        `;
      case 'baby':
        return `
          <svg class="product-svg-art" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="300" height="300" fill="#ECFDF5"/>
            <!-- Silicone Baby Plate & Spoon -->
            <ellipse cx="150" cy="170" rx="85" ry="50" fill="#A7F3D0" stroke="#059669" stroke-width="4"/>
            <ellipse cx="150" cy="165" rx="65" ry="35" fill="#D1FAE5"/>
            <path d="M195 80 L 230 190" stroke="#F59E0B" stroke-width="12" stroke-linecap="round"/>
            <circle cx="195" cy="80" r="14" fill="#D97706"/>
          </svg>
        `;
      case 'liqueur':
      default:
        return `
          <svg class="product-svg-art" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="300" height="300" fill="#FFFBEB"/>
            <circle cx="150" cy="170" r="65" fill="#78350F" stroke="#451A03" stroke-width="4"/>
            <rect x="140" y="70" width="20" height="45" fill="#92400E" stroke="#451A03" stroke-width="3"/>
            <rect x="135" y="60" width="30" height="14" rx="3" fill="#D97706"/>
            <circle cx="150" cy="170" r="28" fill="#FEF3C7"/>
            <text x="150" y="176" font-family="sans-serif" font-weight="bold" font-size="14" fill="#78350F" text-anchor="middle">MB</text>
          </svg>
        `;
    }
  }

  // Format RSD currency
  function formatRSD(amount) {
    return new Intl.NumberFormat('sr-RS').format(amount) + ' RSD';
  }

  // Render Product Catalog
  function renderProducts() {
    const filtered = products.filter(item => {
      const matchCat = activeCategory === 'all' || item.category === activeCategory;
      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });

    catalogCountEl.textContent = `Prikazano: ${filtered.length} artikala`;

    if (filtered.length === 0) {
      productsContainer.innerHTML = `
        <div class="no-results-box">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <h3>Nema rezultata za "${searchQuery}"</h3>
          <p>Pokušajte sa drugom kategorijom ili očistite pretragu.</p>
        </div>
      `;
      return;
    }

    productsContainer.innerHTML = filtered.map(item => `
      <article class="product-card" data-id="${item.id}">
        <div class="product-thumb-wrap">
          <span class="product-badge-flag ${item.badgeClass}">${item.badge}</span>
          ${getProductSVG(item.svgType, item.name)}
          <button class="quick-view-btn" data-id="${item.id}" aria-label="Brzi pregled">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </button>
        </div>

        <div class="product-details">
          <div class="product-meta-row">
            <span class="product-category-label">${item.categoryName}</span>
            <span class="product-stock-tag">
              <span class="product-stock-dot"></span>
              Dostupno
            </span>
          </div>

          <h3 class="product-name">${item.name}</h3>
          <p class="product-short-desc">${item.desc}</p>

          <div class="product-pricing-actions">
            <div class="product-price-box">
              ${item.oldPrice ? `<span class="prod-original-price">${formatRSD(item.oldPrice)}</span>` : ''}
              <span class="prod-active-price">${formatRSD(item.price)}</span>
            </div>

            <div class="prod-actions-group">
              <button class="btn-whatsapp-order" data-id="${item.id}" title="Naruči direktno na WhatsApp">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
                <span>Poruči</span>
              </button>

              <button class="btn-add-cart" data-id="${item.id}" aria-label="Dodaj u korpu">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </article>
    `).join('');

    bindProductCardEvents();
  }

  // Bind Actions on Cards
  function bindProductCardEvents() {
    // Quick View
    document.querySelectorAll('.quick-view-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        openQuickView(id);
      });
    });

    // Add to Cart
    document.querySelectorAll('.btn-add-cart').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        addToCart(id);
      });
    });

    // 1-Click WhatsApp Order
    document.querySelectorAll('.btn-whatsapp-order').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        const prod = products.find(p => p.id === id);
        if (prod) {
          orderSingleViaWhatsApp(prod);
        }
      });
    });
  }

  // Open Quick View Modal
  function openQuickView(id) {
    const prod = products.find(p => p.id === id);
    if (!prod) return;

    currentModalProduct = prod;
    modalTitle.textContent = prod.name;
    modalCategory.textContent = prod.categoryName;
    modalDesc.textContent = prod.desc;
    modalPrice.textContent = formatRSD(prod.price);
    modalVisual.innerHTML = getProductSVG(prod.svgType, prod.name);

    modalBackdrop.classList.add('active');
    document.body.classList.add('drawer-open');
  }

  function closeQuickView() {
    modalBackdrop.classList.remove('active');
    document.body.classList.remove('drawer-open');
    currentModalProduct = null;
  }

  modalCloseBtn.addEventListener('click', closeQuickView);
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeQuickView();
  });

  if (modalAddToCartBtn) {
    modalAddToCartBtn.addEventListener('click', () => {
      if (currentModalProduct) {
        addToCart(currentModalProduct.id);
        closeQuickView();
      }
    });
  }

  if (modalWhatsappBtn) {
    modalWhatsappBtn.addEventListener('click', () => {
      if (currentModalProduct) {
        orderSingleViaWhatsApp(currentModalProduct);
      }
    });
  }

  // Cart Logic
  function addToCart(productId) {
    const prod = products.find(p => p.id === productId);
    if (!prod) return;

    const existing = cart.find(i => i.id === productId);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        id: prod.id,
        name: prod.name,
        price: prod.price,
        svgType: prod.svgType,
        qty: 1
      });
    }

    saveCart();
    updateCartUI();
    showToast(`Dodato u korpu: ${prod.name}`);
  }

  function removeFromCart(productId) {
    cart = cart.filter(i => i.id !== productId);
    saveCart();
    updateCartUI();
  }

  function changeQty(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
      removeFromCart(productId);
    } else {
      saveCart();
      updateCartUI();
    }
  }

  function saveCart() {
    localStorage.setItem('mb_shop_cart', JSON.stringify(cart));
  }

  function updateCartUI() {
    const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
    const totalPrice = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);

    cartBadge.textContent = totalItems;
    cartSubtotalEl.textContent = formatRSD(totalPrice);

    if (cart.length === 0) {
      cartEmptyState.style.display = 'flex';
      cartItemsContainer.innerHTML = '';
      btnCheckoutWhatsapp.disabled = true;
      btnCheckoutWhatsapp.style.opacity = '0.5';
      btnCheckoutCall.disabled = true;
      btnCheckoutCall.style.opacity = '0.5';
    } else {
      cartEmptyState.style.display = 'none';
      btnCheckoutWhatsapp.disabled = false;
      btnCheckoutWhatsapp.style.opacity = '1';
      btnCheckoutCall.disabled = false;
      btnCheckoutCall.style.opacity = '1';

      cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item-row" data-id="${item.id}">
          <div class="cart-item-img">
            ${getProductSVG(item.svgType, item.name)}
          </div>
          <div class="cart-item-info">
            <h4 class="cart-item-name">${item.name}</h4>
            <div class="cart-item-price">${formatRSD(item.price)}</div>
          </div>
          <div class="cart-item-qty">
            <button class="qty-btn btn-minus" data-id="${item.id}">-</button>
            <span class="qty-val">${item.qty}</span>
            <button class="qty-btn btn-plus" data-id="${item.id}">+</button>
          </div>
          <button class="cart-item-remove" data-id="${item.id}" aria-label="Ukloni artikal">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      `).join('');

      // Bind Cart Item Buttons
      cartItemsContainer.querySelectorAll('.btn-minus').forEach(b => {
        b.addEventListener('click', () => changeQty(b.getAttribute('data-id'), -1));
      });
      cartItemsContainer.querySelectorAll('.btn-plus').forEach(b => {
        b.addEventListener('click', () => changeQty(b.getAttribute('data-id'), 1));
      });
      cartItemsContainer.querySelectorAll('.cart-item-remove').forEach(b => {
        b.addEventListener('click', () => removeFromCart(b.getAttribute('data-id')));
      });
    }
  }

  // Drawer Toggle
  function openCartDrawer() {
    cartDrawer.classList.add('active');
    drawerBackdrop.classList.add('active');
    document.body.classList.add('drawer-open');
  }

  function closeCartDrawer() {
    cartDrawer.classList.remove('active');
    drawerBackdrop.classList.remove('active');
    document.body.classList.remove('drawer-open');
  }

  cartToggleBtn.addEventListener('click', openCartDrawer);
  btnCloseDrawer.addEventListener('click', closeCartDrawer);
  drawerBackdrop.addEventListener('click', closeCartDrawer);

  // WhatsApp Order Functions
  function orderSingleViaWhatsApp(product) {
    const text = encodeURIComponent(
      `Pozdrav MB SHOP! Želim da poručim sledeći artikal:\n\n` +
      `▪ Artikal: ${product.name}\n` +
      `▪ Cena: ${formatRSD(product.price)}\n\n` +
      `Molim Vas za informaciju o preuzimanju u Valjevu ili slanju na adresu.`
    );
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${text}`, '_blank');
  }

  btnCheckoutWhatsapp.addEventListener('click', () => {
    if (cart.length === 0) return;

    let itemsList = '';
    let total = 0;
    cart.forEach(item => {
      itemsList += `▪ ${item.name} (${item.qty}x) = ${formatRSD(item.price * item.qty)}\n`;
      total += item.price * item.qty;
    });

    const msg = encodeURIComponent(
      `Pozdrav MB SHOP! Želim da poručim sledeće artikle iz korpe:\n\n` +
      itemsList +
      `\nUkupno: ${formatRSD(total)}\n\n` +
      `Moje ime i adresa za dostavu / dogovor:`
    );

    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${msg}`, '_blank');
  });

  btnCheckoutCall.addEventListener('click', () => {
    window.location.href = `tel:+${WHATSAPP_PHONE}`;
  });

  // Filter Categories
  categoryChips.forEach(chip => {
    chip.addEventListener('click', () => {
      categoryChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeCategory = chip.getAttribute('data-category');
      renderProducts();
    });
  });

  // Live Search
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim();
    if (searchQuery.length > 0) {
      clearSearchBtn.classList.add('active');
    } else {
      clearSearchBtn.classList.remove('active');
    }
    renderProducts();
  });

  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    clearSearchBtn.classList.remove('active');
    renderProducts();
    searchInput.focus();
  });

  // Toast Notification
  function showToast(msg) {
    toastText.textContent = msg;
    toastNotice.classList.add('show');
    setTimeout(() => {
      toastNotice.classList.remove('show');
    }, 2800);
  }

  // Initial Load
  renderProducts();
  updateCartUI();
});
