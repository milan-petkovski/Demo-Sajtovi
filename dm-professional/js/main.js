(function () {
  "use strict";

  /* ===== Konstante (menjati ovde) ===== */
  var BRAND_NAME = "Dm Professional"; // u mejlovima se javlja i "Dm Profesional"
  var OWNER = "Dragana Marić";
  var PHONE_DISPLAY = "069/1983-013";
  var PHONE_INTL = "+381691983013";
  var EMAIL = "maricdragana.mns@gmail.com";
  var ADDRESS = "Ulica i broj, Grad"; // POTVRDITI SA KLIJENTOM
  var MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Dm+Professional"; // POTVRDITI SA KLIJENTOM
  var SOCIAL = { facebook: "#", instagram: "#", linkedin: "#" }; // placeholder linkovi

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ===== Primena konstanti ===== */
  document.title = "Knjigovodstvene usluge | " + BRAND_NAME + " - " + OWNER;
  $$("[data-brand]").forEach(function (el) { el.textContent = BRAND_NAME; });
  $$("[data-address]").forEach(function (el) { el.textContent = ADDRESS; });
  $$("[data-tel]").forEach(function (el) { el.href = "tel:" + PHONE_INTL; });
  $$("[data-mail]").forEach(function (el) { el.href = "mailto:" + EMAIL; });
  $$("[data-viber]").forEach(function (el) { el.href = "viber://chat?number=" + encodeURIComponent(PHONE_INTL); });
  $$("[data-wa]").forEach(function (el) { el.href = "https://wa.me/" + PHONE_INTL.replace("+", ""); });
  $$("[data-maps]").forEach(function (el) { el.href = MAPS_URL; });
  $$("[data-social]").forEach(function (el) { el.href = SOCIAL[el.getAttribute("data-social")] || "#"; });
  var yr = $("#year"); if (yr) yr.textContent = new Date().getFullYear();

  /* ===== Mobilni meni ===== */
  var btn = $("#menuBtn"), menu = $("#mobileMenu");
  function setMenu(open) {
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", open ? "Zatvori meni" : "Otvori meni");
    menu.classList.toggle("open", open);
    document.body.classList.toggle("lock", open);
    $$("a", menu).forEach(function (a) { a.tabIndex = open ? 0 : -1; });
  }
  setMenu(false);
  btn.addEventListener("click", function () { setMenu(btn.getAttribute("aria-expanded") !== "true"); });
  $$("a", menu).forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && menu.classList.contains("open")) { setMenu(false); btn.focus(); }
  });
  window.addEventListener("resize", function () { if (window.innerWidth >= 1024) setMenu(false); });

  /* ===== FAQ accordion ===== */
  $$(".faq-q").forEach(function (q) {
    q.addEventListener("click", function () {
      var open = q.getAttribute("aria-expanded") === "true";
      $$(".faq-q").forEach(function (o) {
        o.setAttribute("aria-expanded", "false");
        document.getElementById(o.getAttribute("aria-controls")).classList.remove("open");
      });
      if (!open) {
        q.setAttribute("aria-expanded", "true");
        document.getElementById(q.getAttribute("aria-controls")).classList.add("open");
      }
    });
  });

  /* ===== Reveal on scroll ===== */
  var items = $$(".reveal");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ===== Forma ===== */
  var form = $("#form");
  var rules = {
    ime: function (v) { return v.trim().length < 2 ? "Unesite ime i prezime." : ""; },
    tel: function (v) { return v.replace(/[^\d]/g, "").length < 8 || !/^[\d\s+\-\/()]+$/.test(v) ? "Unesite ispravan broj telefona." : ""; },
    email: function (v) { return !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "Unesite ispravnu email adresu." : ""; },
    oporezivanje: function (v) { return !v ? "Izaberite način oporezivanja." : ""; }
  };
  var errIds = { ime: "e-ime", tel: "e-tel", email: "e-email", oporezivanje: "e-opor" };

  function setErr(input, msgEl, text) {
    var field = input.closest(".field");
    msgEl.textContent = text;
    field.classList.toggle("err", !!text);
    if (text) input.setAttribute("aria-invalid", "true"); else input.removeAttribute("aria-invalid");
  }
  function check(name) {
    var el = form.elements[name];
    var m = rules[name](el.value);
    setErr(el, document.getElementById(errIds[name]), m);
    return !m;
  }
  function checkDel() {
    var ok = !!form.querySelector('input[name="delatnost"]:checked');
    document.getElementById("e-del").textContent = ok ? "" : "Izaberite delatnost.";
    return ok;
  }
  function checkConsent() {
    var el = form.elements.saglasnost, ok = el.checked;
    document.getElementById("e-sag").textContent = ok ? "" : "Potrebna je saglasnost za obradu podataka.";
    if (ok) el.removeAttribute("aria-invalid"); else el.setAttribute("aria-invalid", "true");
    return ok;
  }

  Object.keys(rules).forEach(function (n) {
    var el = form.elements[n];
    el.addEventListener("blur", function () { check(n); });
    el.addEventListener("input", function () { if (el.closest(".field").classList.contains("err")) check(n); });
    el.addEventListener("change", function () { if (el.closest(".field").classList.contains("err")) check(n); });
  });
  $$('input[name="delatnost"]').forEach(function (r) { r.addEventListener("change", checkDel); });
  form.elements.saglasnost.addEventListener("change", checkConsent);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (form.elements.web.value) return; // honeypot
    var results = Object.keys(rules).map(check);
    results.push(checkDel(), checkConsent());
    var formErr = $("#formErr");
    if (results.indexOf(false) !== -1) {
      formErr.textContent = "Proverite označena polja i pokušajte ponovo.";
      var first = form.querySelector('[aria-invalid="true"], .field.err input, .field.err select') ||
        (!checkDel() ? form.querySelector('input[name="delatnost"]') : null);
      if (first) first.focus();
      return;
    }
    formErr.textContent = "";
    /* Demo: bez backenda. Ovde ide slanje (npr. Formspree/EmailJS) */
    $("#formWrap").style.display = "none";
    var s = $("#success"); s.classList.add("show"); s.focus();
    s.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
  });
})();
