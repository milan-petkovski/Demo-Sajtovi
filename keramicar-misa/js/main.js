/* Keramičar Miša - demo
   Sve vrednosti koje treba potvrditi sa klijentom nalaze se u konstantama ispod. */

// POTVRDITI SA KLIJENTOM
const CITY = "Beograd";
const SERVICE_AREA = "Beograd i okolina";
const PHONE_DISPLAY = "+381 60 000 0000";
const PHONE_INTL = "+381600000000";            // samo cifre sa +, bez razmaka
const WORKING_HOURS = "Pon-Sub, 8-18h";
const INSTAGRAM_URL = "https://instagram.com/keramicar_misa";
const INSTAGRAM_DM_URL = "https://ig.me/m/keramicar_misa";
const DEFAULT_MESSAGE = "Zdravo, interesuje me ugradnja pločica. ";

// Radovi: zameniti src pravim fotografijama (npr. "assets/radovi/kupatilo-1.jpg").
// Dok je src prazan, prikazuje se placeholder pločica.
const CATEGORIES = ["Sve", "Kupatila", "Kuhinje", "Podovi", "Terase"];
const WORKS = [
  { src: "", alt: "Kupatilo sa svetlim zidnim pločicama i ravnim fugama", cat: "Kupatila", title: "Kupatilo, svetle pločice", pattern: "grid", tone: 0 },
  { src: "", alt: "Kupatilo sa heksagonalnim pločicama na podu", cat: "Kupatila", title: "Kupatilo, heksagoni", pattern: "hex", tone: 1 },
  { src: "", alt: "Tuš kabina obložena krupnim formatom pločica", cat: "Kupatila", title: "Tuš kabina, veliki format", pattern: "large", tone: 2 },
  { src: "", alt: "Kuhinjska zidna obloga od pločica u metro rasporedu", cat: "Kuhinje", title: "Kuhinja, zidna obloga", pattern: "brick", tone: 3 },
  { src: "", alt: "Kuhinjski pod od pločica u šahovskom rasporedu", cat: "Kuhinje", title: "Kuhinja, pod", pattern: "check", tone: 4 },
  { src: "", alt: "Hodnik sa podom od pločica u riblje kost rasporedu", cat: "Podovi", title: "Hodnik, riblja kost", pattern: "herring", tone: 0 },
  { src: "", alt: "Dnevna soba sa podom od krupnih pločica", cat: "Podovi", title: "Dnevna soba, veliki format", pattern: "large", tone: 1 },
  { src: "", alt: "Ulaz sa podom od pločica u neutralnim tonovima", cat: "Podovi", title: "Ulaz, neutralni tonovi", pattern: "grid", tone: 3 },
  { src: "", alt: "Terasa sa protivkliznim pločicama", cat: "Terase", title: "Terasa, protivklizne pločice", pattern: "brick", tone: 2 },
  { src: "", alt: "Stepenice obložene pločicama", cat: "Terase", title: "Stepenice, spoljna obloga", pattern: "herring", tone: 4 },
  { src: "", alt: "Terasa sa pločicama u drvenom dezenu", cat: "Terase", title: "Terasa, drveni dezen", pattern: "plank", tone: 1 },
  { src: "", alt: "Kupatilo sa zelenim zidnim pločicama", cat: "Kupatila", title: "Kupatilo, zelena obloga", pattern: "brick", tone: 5 }
];

const IG_POSTS = [
  { pattern: "grid", tone: 0, reel: false }, { pattern: "hex", tone: 1, reel: true },
  { pattern: "brick", tone: 3, reel: false }, { pattern: "herring", tone: 4, reel: false },
  { pattern: "large", tone: 2, reel: true }, { pattern: "check", tone: 5, reel: false }
];

/* ---------- Placeholder pločice (SVG) ---------- */
const TONES = [
  ["#EFE9DF", "#D9CFBF"], ["#E4E9E5", "#BFCCC5"], ["#F1ECE4", "#DCD2C2"],
  ["#E8E4DD", "#C9C2B6"], ["#DDE5E0", "#A9BDB3"], ["#CFDAD4", "#8FA89C"]
];

function patternSVG(kind, tone) {
  const [a, b] = TONES[tone % TONES.length];
  const ln = `stroke="${b}" stroke-width="1.2" fill="none"`;
  let body = "";
  if (kind === "grid") {
    for (let i = 0; i <= 5; i++) body += `<path d="M${i * 20} 0V125M0 ${i * 25}H100" ${ln}/>`;
  } else if (kind === "large") {
    body = `<path d="M50 0V125M0 62.500H100" ${ln}/><path d="M0 0L100 125" stroke="${b}" stroke-opacity=".25" fill="none"/>`;
  } else if (kind === "brick") {
    for (let r = 0; r < 8; r++) {
      const y = r * 16, off = r % 2 ? 10 : 0;
      body += `<path d="M0 ${y}H100" ${ln}/>`;
      for (let x = off; x <= 100; x += 20) body += `<path d="M${x} ${y}v16" ${ln}/>`;
    }
  } else if (kind === "check") {
    for (let r = 0; r < 5; r++) for (let c = 0; c < 5; c++)
      if ((r + c) % 2) body += `<rect x="${c * 20}" y="${r * 25}" width="20" height="25" fill="${b}" fill-opacity=".35"/>`;
  } else if (kind === "hex") {
    for (let r = -1; r < 9; r++) for (let c = -1; c < 5; c++) {
      const x = c * 26 + (r % 2 ? 13 : 0), y = r * 16;
      body += `<path d="M${x} ${y + 8}l13 -8l13 8v16l-13 8l-13 -8z" ${ln}/>`;
    }
  } else if (kind === "herring") {
    for (let r = -1; r < 9; r++) for (let c = -1; c < 6; c++) {
      const x = c * 20, y = r * 16;
      body += `<path d="M${x} ${y}l10 10l-10 10M${x + 10} ${y + 10}l10 -10" ${ln}/>`;
    }
  } else {
    for (let r = 0; r < 12; r++) {
      const y = r * 11;
      body += `<path d="M0 ${y}H100" ${ln}/>`;
      for (let x = (r * 37) % 45; x <= 100; x += 45) body += `<path d="M${x} ${y}v11" ${ln}/>`;
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125" preserveAspectRatio="xMidYMid slice" class="ph" role="img" aria-hidden="true"><defs><linearGradient id="g${tone}${kind}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}" stop-opacity=".55"/></linearGradient></defs><rect width="100" height="125" fill="url(#g${tone}${kind})"/>${body}</svg>`;
}

function visual(item) {
  if (item.src) return `<img src="${item.src}" alt="${item.alt}" loading="lazy" decoding="async">`;
  return patternSVG(item.pattern, item.tone);
}

/* ---------- Kontakt linkovi ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const msgText = encodeURIComponent(DEFAULT_MESSAGE);
const digits = PHONE_INTL.replace(/\D/g, "");
const LINKS = {
  call: `tel:${PHONE_INTL}`,
  viber: `viber://chat?number=%2B${digits}`,
  whatsapp: `https://wa.me/${digits}?text=${msgText}`,
  instagram: INSTAGRAM_URL,
  dm: INSTAGRAM_DM_URL
};
LINKS.message = LINKS.whatsapp;

document.documentElement.classList.add("js");
$$("[data-action]").forEach(a => {
  const act = a.dataset.action;
  a.setAttribute("href", LINKS[act]);
  if (act === "message") { a.setAttribute("target", "_blank"); a.setAttribute("rel", "noopener"); }
});
$$("[data-city]").forEach(e => (e.textContent = CITY));
$$("[data-phone-text]").forEach(e => (e.textContent = PHONE_DISPLAY));
$$("[data-hours]").forEach(e => (e.textContent = WORKING_HOURS));
$("#year").textContent = new Date().getFullYear();

/* ---------- Galerija ---------- */
let active = "Sve";
let visible = [];
const gallery = $("#gallery");
const filters = $("#filters");

filters.innerHTML = CATEGORIES.map(c => `<button class="chip" type="button" aria-pressed="${c === "Sve"}" data-cat="${c}">${c}</button>`).join("");
gallery.innerHTML = WORKS.map((w, i) => `
  <li data-cat="${w.cat}" class="reveal">
    <button class="tile" type="button" data-i="${i}" aria-label="Otvori: ${w.title}">
      ${visual(w)}
      <span class="tile__cap">${w.title}<small>${w.cat}</small></span>
    </button>
  </li>`).join("");

function applyFilter(cat) {
  active = cat;
  $$(".chip").forEach(c => c.setAttribute("aria-pressed", c.dataset.cat === cat));
  $$("li", gallery).forEach(li => {
    const show = cat === "Sve" || li.dataset.cat === cat;
    li.classList.toggle("is-hidden", !show);
    if (show) li.classList.add("in");
  });
  visible = WORKS.map((w, i) => i).filter(i => cat === "Sve" || WORKS[i].cat === cat);
}
filters.addEventListener("click", e => {
  const b = e.target.closest(".chip");
  if (b) applyFilter(b.dataset.cat);
});
applyFilter("Sve");

/* ---------- Lightbox ---------- */
const lb = $("#lb"), lbFig = $("#lbFig");
let pos = 0, lastFocus = null;

function showLb() {
  const w = WORKS[visible[pos]];
  lbFig.innerHTML = `${visual(w)}<figcaption>${w.title} <span aria-hidden="true">·</span> ${w.cat} (${pos + 1}/${visible.length})</figcaption>`;
  lbFig.setAttribute("aria-label", w.alt);
}
function openLb(index) {
  lastFocus = document.activeElement;
  pos = Math.max(0, visible.indexOf(index));
  showLb();
  lb.hidden = false;
  document.body.classList.add("lock");
  $("#lbClose").focus();
}
function closeLb() {
  lb.hidden = true;
  document.body.classList.remove("lock");
  if (lastFocus) lastFocus.focus();
}
function step(d) {
  pos = (pos + d + visible.length) % visible.length;
  showLb();
}
gallery.addEventListener("click", e => {
  const t = e.target.closest(".tile");
  if (t) openLb(+t.dataset.i);
});
$("#lbClose").addEventListener("click", closeLb);
$("#lbPrev").addEventListener("click", () => step(-1));
$("#lbNext").addEventListener("click", () => step(1));
lb.addEventListener("click", e => { if (e.target === lb) closeLb(); });
document.addEventListener("keydown", e => {
  if (lb.hidden) return;
  if (e.key === "Escape") closeLb();
  else if (e.key === "ArrowLeft") step(-1);
  else if (e.key === "ArrowRight") step(1);
  else if (e.key === "Tab") {
    const f = $$("button", lb);
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});
let tx = null;
lb.addEventListener("touchstart", e => { tx = e.touches[0].clientX; }, { passive: true });
lb.addEventListener("touchend", e => {
  if (tx === null) return;
  const dx = e.changedTouches[0].clientX - tx;
  if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
  tx = null;
}, { passive: true });

/* ---------- Instagram ---------- */
$("#igGrid").innerHTML = IG_POSTS.map((p, i) => `
  <li><a href="${INSTAGRAM_URL}" target="_blank" rel="noopener" aria-label="${p.reel ? "Pogledajte reels na Instagramu" : "Pogledajte objavu na Instagramu"}">
    ${patternSVG(p.pattern, p.tone)}
    <span class="badge" aria-hidden="true"><svg class="ic"><use href="${p.reel ? "#i-play" : "#i-insta"}"/></svg></span>
  </a></li>`).join("");

/* ---------- Meni ---------- */
const burger = $("#burger"), menu = $("#menu");
function setMenu(open) {
  burger.setAttribute("aria-expanded", open);
  burger.setAttribute("aria-label", open ? "Zatvori meni" : "Otvori meni");
  menu.hidden = !open;
  document.body.classList.toggle("lock", open);
}
burger.addEventListener("click", () => setMenu(burger.getAttribute("aria-expanded") !== "true"));
menu.addEventListener("click", e => { if (e.target.closest("a")) setMenu(false); });
document.addEventListener("keydown", e => { if (e.key === "Escape" && !menu.hidden) { setMenu(false); burger.focus(); } });
matchMedia("(min-width:1024px)").addEventListener("change", e => { if (e.matches) setMenu(false); });

/* ---------- Scroll: header, sticky traka, reveal ---------- */
const header = $("#header"), sticky = $("#sticky");
function onScroll() {
  const y = window.scrollY;
  header.classList.toggle("is-scrolled", y > 8);
  const on = y > 320;
  sticky.classList.toggle("is-on", on);
  sticky.setAttribute("aria-hidden", !on);
  $$("a", sticky).forEach(a => a.tabIndex = on ? 0 : -1);
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(es => es.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
  }), { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  $$(".reveal").forEach(el => io.observe(el));
} else {
  $$(".reveal").forEach(el => el.classList.add("in"));
}

/* ---------- Forma ---------- */
const form = $("#form"), ok = $("#formOk");
const rules = {
  name: v => v.trim().length < 2 ? "Unesite ime." : "",
  phone: v => /^\+?[0-9 ()\/-]{8,18}$/.test(v.trim()) ? "" : "Unesite ispravan broj telefona.",
  type: v => v ? "" : "Izaberite vrstu posla.",
  area: v => v === "" || (+v > 0 && +v <= 1000) ? "" : "Unesite kvadraturu između 1 i 1000."
};
function check(name) {
  const input = form.elements[name], msg = rules[name](input.value);
  $("#e-" + name).textContent = msg;
  input.closest(".field").classList.toggle("has-err", !!msg);
  input.setAttribute("aria-invalid", !!msg);
  if (msg) input.setAttribute("aria-describedby", "e-" + name); else input.removeAttribute("aria-describedby");
  return !msg;
}
Object.keys(rules).forEach(n => form.elements[n].addEventListener("blur", () => check(n)));
form.addEventListener("submit", e => {
  e.preventDefault();
  const results = Object.keys(rules).map(check);
  if (results.includes(false)) {
    form.elements[Object.keys(rules)[results.indexOf(false)]].focus();
    ok.hidden = true;
    return;
  }
  // Demo: bez backenda. Ovde ide slanje (npr. Formspree) kada sajt bude postavljen.
  form.reset();
  ok.hidden = false;
  ok.focus();
});
