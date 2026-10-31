/* ===== Konstante (POTVRDITI SA KLIJENTOM) ===== */
const BRAND = "3D Stolarski Šabloni"; // PLACEHOLDER: naziv profila na Instagramu je 3d_stolarski_sabloni_
const PHONE = ""; // PLACEHOLDER: broj telefona, npr. "+381 6x xxx xxxx"
const WHATSAPP = ""; // PLACEHOLDER: samo cifre sa pozivnim brojem, npr. "3816xxxxxxx"
const EMAIL = "nikola032milutinovic@gmail.com";
const INSTAGRAM_URL = "https://www.instagram.com/3d_stolarski_sabloni_/";
const MAPS_URL = "https://www.google.com/maps"; // PLACEHOLDER: pravi link ka lokaciji radionice
const ADDRESS = "Adresa radionice (PLACEHOLDER)";
const WORK_HOURS = "Radno vreme (PLACEHOLDER)";
const CURRENCY = "RSD";
const FREE_DELIVERY_THRESHOLD = 6000; // PLACEHOLDER
const DELIVERY_FEE = 390; // PLACEHOLDER
const PAYMENT_PROVIDER = ""; // Za kasnije: link hostovanog checkout-a. Podaci kartice se nikad ne prikupljaju na sajtu.

/* ===== Pomoćne funkcije ===== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const fmt = (n) => new Intl.NumberFormat("sr-RS").format(n) + " " + CURRENCY;
const page = document.body.dataset.page;
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const svg = (d, extra = "") => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${d}</svg>`;
const ICON = {
  cart: svg('<path d="M6 6h15l-1.6 9H8z"/><path d="M6 6 5 3H2"/><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/>'),
  menu: svg('<path d="M4 7h16M4 12h16M4 17h16"/>'),
  close: svg('<path d="M6 6l12 12M18 6 6 18"/>'),
  plus: svg('<path d="M12 5v14M5 12h14"/>'),
  check: svg('<path d="M5 12.5l4.5 4.5L19 7.5"/>'),
  phone: svg('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>'),
  chat: svg('<path d="M4 5h16v11H9l-5 4z"/>'),
  mail: svg('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'),
  pin: svg('<path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>'),
  ruler: svg('<path d="M3 17 17 3l4 4L7 21z"/><path d="M7 13l2 2M10 10l2 2M13 7l2 2"/>'),
  repeat: svg('<path d="M17 2l4 4-4 4"/><path d="M3 11V9a3 3 0 0 1 3-3h15"/><path d="M7 22l-4-4 4-4"/><path d="M21 13v2a3 3 0 0 1-3 3H3"/>'),
  layers: svg('<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>'),
  box: svg('<path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="m3 8 9 5 9-5M12 13v8"/>'),
  truck: svg('<path d="M2 6h11v10H2zM13 10h4l4 3v3h-8"/><circle cx="7" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/>'),
  insta: svg('<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/>'),
};

/* ===== Vizuali proizvoda (inline SVG, mesto za prave fotografije: polje slike u products.js) ===== */
function productArt(p) {
  const L = "#c8ff3d", V = "#6c4dff", W = "#f7f7f4";
  const shapes = {
    radijus: `<rect x="70" y="70" width="260" height="170" rx="6" fill="none" stroke="${W}" stroke-opacity=".25" stroke-width="2" stroke-dasharray="6 6"/><path d="M70 240V110q0-40 40-40h220" fill="none" stroke="${L}" stroke-width="5"/><path d="M70 110q0-40 40-40" fill="none" stroke="${V}" stroke-width="9"/><circle cx="110" cy="110" r="3" fill="${L}"/>`,
    sarka: `<rect x="90" y="60" width="220" height="180" rx="10" fill="none" stroke="${W}" stroke-opacity=".3" stroke-width="2"/><circle cx="200" cy="150" r="52" fill="${V}"/><circle cx="200" cy="150" r="52" fill="none" stroke="${L}" stroke-width="4"/><circle cx="200" cy="150" r="9" fill="${L}"/><path d="M90 150h46M264 150h46" stroke="${L}" stroke-width="3"/>`,
    rucka: `<rect x="60" y="100" width="280" height="100" rx="10" fill="none" stroke="${W}" stroke-opacity=".3" stroke-width="2"/><circle cx="120" cy="150" r="14" fill="${L}"/><circle cx="280" cy="150" r="14" fill="${L}"/><path d="M134 150h132" stroke="${V}" stroke-width="6"/><path d="M120 190v30M280 190v30M120 205h160" stroke="${W}" stroke-opacity=".5" stroke-width="2"/>`,
    leptir: `<path d="M200 150 120 90v120zM200 150l80-60v120z" fill="${V}" stroke="${L}" stroke-width="4" stroke-linejoin="round"/><path d="M40 150h80M280 150h80" stroke="${W}" stroke-opacity=".35" stroke-width="2" stroke-dasharray="5 5"/>`,
    cep: `<path d="M70 190h110v-40h60v-40h90v120H70z" fill="none" stroke="${L}" stroke-width="5" stroke-linejoin="round"/><path d="M180 190v-40h60v-40" stroke="${V}" stroke-width="8" fill="none"/>`,
    prsten: `<circle cx="200" cy="150" r="88" fill="none" stroke="${W}" stroke-opacity=".3" stroke-width="2"/><circle cx="200" cy="150" r="62" fill="none" stroke="${V}" stroke-width="12"/><circle cx="200" cy="150" r="30" fill="none" stroke="${L}" stroke-width="6"/><path d="M200 50v200M100 150h200" stroke="${W}" stroke-opacity=".25" stroke-width="1.5"/>`,
    usisivac: `<rect x="70" y="170" width="150" height="60" rx="10" fill="${V}"/><path d="M220 200h70q50 0 50-60" fill="none" stroke="${L}" stroke-width="14" stroke-linecap="round"/><circle cx="110" cy="200" r="10" fill="${L}"/>`,
    slova: `<text x="200" y="190" text-anchor="middle" font-family="Sora, system-ui, sans-serif" font-weight="800" font-size="130" fill="none" stroke="${L}" stroke-width="3">ABC</text><text x="204" y="194" text-anchor="middle" font-family="Sora, system-ui, sans-serif" font-weight="800" font-size="130" fill="${V}" fill-opacity=".55">ABC</text>`,
  };
  return `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${esc(p.naziv)}"><defs><pattern id="g-${p.id}" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="#fff" stroke-opacity=".06"/></pattern></defs><rect width="400" height="300" fill="#0b0b12"/><rect width="400" height="300" fill="url(#g-${p.id})"/>${shapes[p.oblik] || ""}</svg>`;
}
function productVisual(p) {
  return p.slike && p.slike[0] ? `<img src="${esc(p.slike[0])}" alt="${esc(p.naziv)}" loading="lazy">` : productArt(p);
}

/* ===== Korpa ===== */
const CART_KEY = "mwp-3d-cart";
const Cart = {
  get() { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { return []; } },
  set(c) { localStorage.setItem(CART_KEY, JSON.stringify(c)); Cart.render(); },
  add(id, velicina, boja, qty = 1) {
    const c = Cart.get();
    const f = c.find((i) => i.id === id && i.velicina === velicina && i.boja === boja);
    if (f) f.qty += qty; else c.push({ id, velicina, boja, qty });
    Cart.set(c);
  },
  change(idx, d) { const c = Cart.get(); if (!c[idx]) return; c[idx].qty = Math.max(1, c[idx].qty + d); Cart.set(c); },
  remove(idx) { const c = Cart.get(); c.splice(idx, 1); Cart.set(c); },
  clear() { Cart.set([]); },
  lines() { return Cart.get().map((i, idx) => ({ ...i, idx, p: PRODUCTS.find((p) => p.id === i.id) })).filter((l) => l.p); },
  subtotal() { return Cart.lines().reduce((s, l) => s + l.p.cena * l.qty, 0); },
  count() { return Cart.lines().reduce((s, l) => s + l.qty, 0); },
  delivery(sub) { return sub === 0 || sub >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE; },
  render() {
    const n = Cart.count();
    $$(".cart-count").forEach((el) => { el.textContent = n; el.hidden = n === 0; });
    const body = $("#drawer-body"), foot = $("#drawer-foot");
    if (!body) return;
    const lines = Cart.lines();
    if (!lines.length) {
      body.innerHTML = `<p class="empty">Korpa je prazna.<br>Dodaj šablon i vrati se ovde.</p>`;
      foot.innerHTML = `<a class="btn btn-violet btn-block" href="prodavnica.html">Pogledaj prodavnicu</a>`;
      return;
    }
    body.innerHTML = lines.map((l) => `
      <div class="line-item">
        <div class="th">${productArt(l.p)}</div>
        <div>
          <h4>${esc(l.p.naziv)}</h4>
          <div class="meta">${esc(l.velicina)} / ${esc(l.boja)}</div>
          <div class="qty" role="group" aria-label="Količina">
            <button type="button" data-dec="${l.idx}" aria-label="Smanji količinu">-</button>
            <output>${l.qty}</output>
            <button type="button" data-inc="${l.idx}" aria-label="Povećaj količinu">+</button>
          </div>
        </div>
        <div style="text-align:right"><strong>${fmt(l.p.cena * l.qty)}</strong><br><button type="button" class="rm" data-rm="${l.idx}">Ukloni</button></div>
      </div>`).join("");
    const sub = Cart.subtotal();
    const left = Math.max(0, FREE_DELIVERY_THRESHOLD - sub);
    foot.innerHTML = `
      <p class="note" style="margin:0">${left > 0 ? `Još ${fmt(left)} do besplatne dostave.` : "Dostava je besplatna."}</p>
      <div class="progress" aria-hidden="true"><span style="width:${Math.min(100, (sub / FREE_DELIVERY_THRESHOLD) * 100)}%"></span></div>
      <div class="totals"><div><span>Proizvodi</span><span>${fmt(sub)}</span></div><div><span>Dostava</span><span>${Cart.delivery(sub) ? fmt(Cart.delivery(sub)) : "Besplatna"}</span></div><div class="grand"><span>Ukupno</span><span>${fmt(sub + Cart.delivery(sub))}</span></div></div>
      <a class="btn btn-lime btn-block" href="checkout.html" style="background:var(--violet);color:#fff">Završi porudžbinu</a>`;
  },
};

/* ===== Zajednički delovi ===== */
function mountShell() {
  const links = [["index.html", "Početna"], ["prodavnica.html", "Prodavnica"], ["index.html#kako", "Kako radi"], ["index.html#kontakt", "Kontakt"]];
  const cur = page === "shop" || page === "product" ? "prodavnica.html" : page === "home" ? "index.html" : "";
  const nav = links.map(([h, t]) => `<a href="${h}" ${h === cur ? 'aria-current="page"' : ""}>${t}</a>`).join("");
  const brand = `<a class="brand" href="index.html" aria-label="${esc(BRAND)} početna"><svg class="brand-mark" viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="8" fill="#c8ff3d"/><path d="M8 24V12q0-4 4-4h12" fill="none" stroke="#0b0b12" stroke-width="4" stroke-linecap="round"/><circle cx="21" cy="21" r="3" fill="#6c4dff"/></svg><span>${esc(BRAND)}<small>Šabloni za stolare</small></span></a>`;
  $("#site-header").outerHTML = `
  <a class="skip" href="#main">Preskoči na sadržaj</a>
  <header class="site-header on-dark"><div class="wrap head-row">
    ${brand}
    <nav class="nav" aria-label="Glavna navigacija">${nav}</nav>
    <div class="head-actions">
      <button class="icon-btn" type="button" id="open-cart" aria-label="Otvori korpu">${ICON.cart}<span class="cart-count" hidden>0</span></button>
      <button class="icon-btn menu-btn" type="button" id="open-menu" aria-label="Otvori meni" aria-expanded="false" aria-controls="mobile-menu">${ICON.menu}</button>
    </div>
  </div></header>
  <div class="mobile-menu" id="mobile-menu" role="dialog" aria-modal="true" aria-label="Meni">
    <div class="top">${brand}<button class="icon-btn" type="button" id="close-menu" aria-label="Zatvori meni">${ICON.close}</button></div>
    <nav aria-label="Mobilna navigacija">${nav}</nav>
    <a class="btn btn-lime btn-block" href="prodavnica.html">Naruči šablon</a>
  </div>
  <div class="overlay" id="overlay"></div>
  <aside class="drawer" id="drawer" role="dialog" aria-modal="true" aria-label="Korpa">
    <div class="drawer-head"><h2>Tvoja korpa</h2><button class="icon-btn" type="button" id="close-cart" aria-label="Zatvori korpu">${ICON.close}</button></div>
    <div class="drawer-body" id="drawer-body"></div>
    <div class="drawer-foot" id="drawer-foot"></div>
  </aside>`;

  const contactBtns = contactButtons();
  $("#site-footer").outerHTML = `
  <footer class="site-footer"><div class="wrap">
    <div class="foot-grid">
      <div>${brand}<p style="margin-top:12px;max-width:34ch">3D štampani šabloni za stolare i majstore. Brže, preciznije, bez merenja iznova.</p></div>
      <div><h4>Prodavnica</h4><ul><li><a href="prodavnica.html">Svi šabloni</a></li><li><a href="prodavnica.html?k=Okov">Okov</a></li><li><a href="prodavnica.html?k=Ivice%20i%20uglovi">Ivice i uglovi</a></li></ul></div>
      <div><h4>Informacije</h4><ul><li><a href="index.html#kako">Kako radi</a></li><li><a href="index.html#faq">Česta pitanja</a></li><li><a href="index.html#kontakt">Kontakt</a></li></ul></div>
      <div><h4>Kontakt</h4><ul><li><a href="mailto:${EMAIL}">${EMAIL}</a></li><li><a href="${INSTAGRAM_URL}" target="_blank" rel="noopener">Instagram profil</a></li></ul></div>
    </div>
    <p class="legal">Demo sajt (primer dizajna). Svi proizvodi, cene i tekstovi su primeri do potvrde klijenta.</p>
  </div></footer>
  <div class="sticky-bar" id="sticky-bar"><a class="btn btn-lime" href="prodavnica.html">Prodavnica</a><button class="btn btn-ghost on-dark" type="button" data-open-cart style="color:#f7f7f4">Korpa</button></div>
  <div class="toast" id="toast" role="status" aria-live="polite"></div>`;
}
function contactButtons() {
  const out = [];
  if (WHATSAPP) out.push(`<a class="btn btn-lime" href="https://wa.me/${WHATSAPP}">${ICON.chat}WhatsApp</a>`);
  if (PHONE) out.push(`<a class="btn btn-ghost" href="tel:${PHONE.replace(/\s/g, "")}">${ICON.phone}Pozovi</a>`);
  out.push(`<a class="btn btn-ghost" href="mailto:${EMAIL}">${ICON.mail}Email</a>`);
  out.push(`<a class="btn btn-ghost" href="${INSTAGRAM_URL}" target="_blank" rel="noopener">${ICON.insta}Instagram</a>`);
  return out.join("");
}
function toast(msg) { const t = $("#toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove("show"), 2200); }

function wireShell() {
  const menu = $("#mobile-menu"), openM = $("#open-menu"), drawer = $("#drawer"), ov = $("#overlay");
  const setMenu = (o) => { menu.classList.toggle("open", o); openM.setAttribute("aria-expanded", o); document.body.style.overflow = o ? "hidden" : ""; if (o) $("#close-menu").focus(); else openM.focus(); };
  openM.addEventListener("click", () => setMenu(true));
  $("#close-menu").addEventListener("click", () => setMenu(false));
  $$("#mobile-menu nav a, #mobile-menu .btn").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  const setCart = (o) => { drawer.classList.toggle("open", o); ov.classList.toggle("open", o); document.body.style.overflow = o ? "hidden" : ""; if (o) $("#close-cart").focus(); };
  $("#open-cart").addEventListener("click", () => setCart(true));
  $$("[data-open-cart]").forEach((b) => b.addEventListener("click", () => setCart(true)));
  $("#close-cart").addEventListener("click", () => setCart(false));
  ov.addEventListener("click", () => setCart(false));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") { setMenu(false); setCart(false); } });
  drawer.addEventListener("click", (e) => {
    const t = e.target.closest("button"); if (!t) return;
    if (t.dataset.inc) Cart.change(+t.dataset.inc, 1);
    if (t.dataset.dec) Cart.change(+t.dataset.dec, -1);
    if (t.dataset.rm) Cart.remove(+t.dataset.rm);
  });
  window.openCart = () => setCart(true);

  const bar = $("#sticky-bar");
  const onScroll = () => bar.classList.toggle("show", window.scrollY > 320 && page !== "checkout" && page !== "thanks");
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12 });
    window.revealObserve = (root = document) => $$(".reveal:not(.in)", root).forEach((el) => io.observe(el));
  } else window.revealObserve = (root = document) => $$(".reveal", root).forEach((el) => el.classList.add("in"));
  window.revealObserve();
}

/* ===== Kartica proizvoda ===== */
function productCard(p) {
  const sale = p.staraCena ? `<span class="badge">Akcija</span>` : "";
  return `<article class="pcard reveal">
    <a class="pimg" href="proizvod.html?id=${p.id}" aria-label="${esc(p.naziv)}">${sale}${productVisual(p)}</a>
    <div class="pbody">
      <span class="pcat">${esc(p.kategorija)}</span>
      <h3><a href="proizvod.html?id=${p.id}">${esc(p.naziv)}</a></h3>
      <div class="price-row"><span class="price">${fmt(p.cena)}</span>${p.staraCena ? `<span class="old">${fmt(p.staraCena)}</span>` : ""}</div>
      <a class="btn btn-violet" href="proizvod.html?id=${p.id}">Izaberi opcije</a>
    </div></article>`;
}

/* ===== Stranice ===== */
function initHome() {
  $("#featured").innerHTML = PRODUCTS.slice(0, 4).map(productCard).join("");
  $("#contact-btns").innerHTML = contactButtons();
  $$(".faq-q").forEach((q) => q.addEventListener("click", () => {
    const open = q.getAttribute("aria-expanded") === "true";
    q.setAttribute("aria-expanded", !open);
    $("#" + q.getAttribute("aria-controls")).classList.toggle("open", !open);
  }));
  const f = $("#inquiry");
  if (f) f.addEventListener("submit", (e) => { e.preventDefault(); if (validate(f)) { f.reset(); $("#inquiry-ok").hidden = false; } });
}

function initShop() {
  const grid = $("#shop-grid"), chips = $("#chips"), sortEl = $("#sort");
  const cats = ["Sve", ...new Set(PRODUCTS.map((p) => p.kategorija))];
  let cat = new URLSearchParams(location.search).get("k");
  if (!cats.includes(cat)) cat = "Sve";
  chips.innerHTML = cats.map((c) => `<button type="button" class="chip" data-c="${esc(c)}" aria-pressed="${c === cat}">${esc(c)}</button>`).join("");
  const draw = () => {
    let list = PRODUCTS.filter((p) => cat === "Sve" || p.kategorija === cat);
    if (sortEl.value === "asc") list = [...list].sort((a, b) => a.cena - b.cena);
    if (sortEl.value === "desc") list = [...list].sort((a, b) => b.cena - a.cena);
    grid.innerHTML = list.map(productCard).join("");
    $("#count").textContent = list.length + (list.length === 1 ? " proizvod" : " proizvoda");
    window.revealObserve(grid);
  };
  chips.addEventListener("click", (e) => { const b = e.target.closest(".chip"); if (!b) return; cat = b.dataset.c; $$(".chip", chips).forEach((x) => x.setAttribute("aria-pressed", x === b)); draw(); });
  sortEl.addEventListener("change", draw);
  draw();
}

function initProduct() {
  const id = new URLSearchParams(location.search).get("id");
  const p = PRODUCTS.find((x) => x.id === id);
  const root = $("#product");
  if (!p) { root.innerHTML = `<div class="card"><h1>Proizvod nije pronađen</h1><p><a class="btn btn-violet" href="prodavnica.html">Nazad na prodavnicu</a></p></div>`; return; }
  document.title = p.naziv + " | " + BRAND;
  $("#crumb-name").textContent = p.naziv;
  let vel = p.velicine[0], boja = p.boje[0], qty = 1;
  const opts = (arr, key, cur) => arr.map((v) => `<button type="button" class="opt" data-${key}="${esc(v)}" aria-pressed="${v === cur}">${esc(v)}</button>`).join("");
  root.innerHTML = `
    <div class="prod-grid">
      <div class="prod-visual">${productVisual(p)}</div>
      <div>
        <span class="eyebrow">${esc(p.kategorija)}</span>
        <h1 style="font-size:clamp(1.8rem,5vw,2.8rem)">${esc(p.naziv)}</h1>
        <div class="price-row" style="padding:0"><span class="price" style="font-size:1.8rem">${fmt(p.cena)}</span>${p.staraCena ? `<span class="old">${fmt(p.staraCena)}</span>` : ""}</div>
        <p class="lead" style="margin-top:16px">${esc(p.opis)}</p>
        <div class="opt-group"><span id="l-vel">Veličina / varijanta</span><div class="opts" id="o-vel" role="group" aria-labelledby="l-vel">${opts(p.velicine, "v", vel)}</div></div>
        <div class="opt-group"><span id="l-boja">Boja</span><div class="opts" id="o-boja" role="group" aria-labelledby="l-boja">${opts(p.boje, "b", boja)}</div></div>
        <div class="opt-group"><span>Količina</span><div class="qty"><button type="button" id="q-dec" aria-label="Smanji količinu">-</button><output id="q-val">1</output><button type="button" id="q-inc" aria-label="Povećaj količinu">+</button></div></div>
        <div class="buy-row"><button type="button" class="btn btn-violet" id="add">${ICON.cart}Dodaj u korpu</button><button type="button" class="btn btn-ghost" id="buy-now">Kupi odmah</button></div>
        <p class="note" style="margin-top:14px">Plaćanje pouzećem je podrazumevano. Dostava besplatna preko ${fmt(FREE_DELIVERY_THRESHOLD)}. <!-- POTVRDITI SA KLIJENTOM --></p>
        <ul class="spec">
          <li>${ICON.check}<span>3D štampano, izrađeno po porudžbini <!-- POTVRDITI SA KLIJENTOM --></span></li>
          <li>${ICON.check}<span>Materijal i dimenzije potvrđuju se pre štampe <!-- POTVRDITI SA KLIJENTOM --></span></li>
          <li>${ICON.check}<span>Treba ti drugačija mera? Piši nam, radimo i šablone po meri.</span></li>
        </ul>
      </div>
    </div>`;
  $("#o-vel").addEventListener("click", (e) => { const b = e.target.closest("[data-v]"); if (!b) return; vel = b.dataset.v; $$("[data-v]").forEach((x) => x.setAttribute("aria-pressed", x === b)); });
  $("#o-boja").addEventListener("click", (e) => { const b = e.target.closest("[data-b]"); if (!b) return; boja = b.dataset.b; $$("[data-b]").forEach((x) => x.setAttribute("aria-pressed", x === b)); });
  $("#q-dec").addEventListener("click", () => { qty = Math.max(1, qty - 1); $("#q-val").textContent = qty; });
  $("#q-inc").addEventListener("click", () => { qty = Math.min(20, qty + 1); $("#q-val").textContent = qty; });
  $("#add").addEventListener("click", () => { Cart.add(p.id, vel, boja, qty); toast("Dodato u korpu"); window.openCart(); });
  $("#buy-now").addEventListener("click", () => { Cart.add(p.id, vel, boja, qty); location.href = "checkout.html"; });
  const rel = PRODUCTS.filter((x) => x.id !== p.id && x.kategorija === p.kategorija).concat(PRODUCTS.filter((x) => x.id !== p.id && x.kategorija !== p.kategorija)).slice(0, 4);
  $("#related").innerHTML = rel.map(productCard).join("");
  window.revealObserve($("#related"));
}

function validate(form) {
  let ok = true, first = null;
  $$("[data-req]", form).forEach((inp) => {
    const field = inp.closest(".field");
    let valid = inp.value.trim() !== "";
    if (valid && inp.type === "email") valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value);
    if (valid && inp.dataset.req === "phone") valid = inp.value.replace(/\D/g, "").length >= 7;
    field.classList.toggle("invalid", !valid);
    inp.setAttribute("aria-invalid", !valid);
    if (!valid) { ok = false; first = first || inp; }
  });
  if (first) first.focus();
  return ok;
}

function initCheckout() {
  const lines = Cart.lines();
  const root = $("#checkout");
  if (!lines.length) { root.innerHTML = `<div class="card" style="text-align:center"><h2>Korpa je prazna</h2><p>Dodaj bar jedan šablon pre završetka porudžbine.</p><a class="btn btn-violet" href="prodavnica.html">Idi u prodavnicu</a></div>`; return; }
  const sub = Cart.subtotal(), del = Cart.delivery(sub);
  $("#sum-lines").innerHTML = lines.map((l) => `<div class="line-item" style="grid-template-columns:56px minmax(0,1fr) auto"><div class="th" style="width:56px;height:56px">${productArt(l.p)}</div><div><h4>${esc(l.p.naziv)}</h4><div class="meta">${esc(l.velicina)} / ${esc(l.boja)} x ${l.qty}</div></div><strong>${fmt(l.p.cena * l.qty)}</strong></div>`).join("");
  $("#sum-totals").innerHTML = `<div><span>Proizvodi</span><span>${fmt(sub)}</span></div><div><span>Dostava</span><span>${del ? fmt(del) : "Besplatna"}</span></div><div class="grand"><span>Ukupno</span><span>${fmt(sub + del)}</span></div>`;
  const form = $("#checkout-form"), card = $("#card-box");
  $$("input[name=pay]").forEach((r) => r.addEventListener("change", () => { card.hidden = r.value !== "kartica" || !r.checked; }));
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validate(form)) return;
    const data = Object.fromEntries(new FormData(form).entries());
    const order = { broj: "DEMO-" + Date.now().toString().slice(-6), ime: data.ime, adresa: data.adresa + ", " + data.grad, pay: data.pay, ukupno: sub + del, stavke: lines.map((l) => ({ naziv: l.p.naziv, velicina: l.velicina, boja: l.boja, qty: l.qty })) };
    sessionStorage.setItem("mwp-3d-order", JSON.stringify(order));
    /* PAYMENT_PROVIDER: ovde ide preusmeravanje na hostovani checkout. Podaci kartice se ne prikupljaju. */
    Cart.clear();
    location.href = "hvala.html";
  });
}

function initThanks() {
  let o = null; try { o = JSON.parse(sessionStorage.getItem("mwp-3d-order")); } catch (e) {}
  const box = $("#thanks");
  if (!o) { box.innerHTML = `<h1>Hvala ti</h1><p class="lead">Nema aktivne porudžbine.</p><a class="btn btn-violet" href="prodavnica.html">Nazad u prodavnicu</a>`; return; }
  box.innerHTML = `<div class="feat-ico" style="margin-inline:auto;width:64px;height:64px">${ICON.check}</div>
    <h1 style="font-size:clamp(2rem,6vw,3rem)">Porudžbina je primljena</h1>
    <p class="lead" style="margin-inline:auto">Broj porudžbine: <strong>${esc(o.broj)}</strong>. Ovo je demo, nijedna porudžbina nije stvarno poslata.</p>
    <div class="card" style="text-align:left;max-width:520px;margin:24px auto">
      ${o.stavke.map((s) => `<p style="color:var(--ink)">${esc(s.naziv)} (${esc(s.velicina)}, ${esc(s.boja)}) x ${s.qty}</p>`).join("")}
      <p style="margin:0"><strong>Ukupno: ${fmt(o.ukupno)}</strong><br>Plaćanje: ${o.pay === "kartica" ? "Kartica (DEMO)" : "Pouzećem"}<br>Isporuka: ${esc(o.adresa)}</p>
    </div>
    <a class="btn btn-violet" href="prodavnica.html">Nastavi kupovinu</a>`;
}

/* ===== Start ===== */
document.addEventListener("DOMContentLoaded", () => {
  mountShell();
  wireShell();
  Cart.render();
  ({ home: initHome, shop: initShop, product: initProduct, checkout: initCheckout, thanks: initThanks }[page] || (() => {}))();
  if (window.revealObserve) window.revealObserve();
});
