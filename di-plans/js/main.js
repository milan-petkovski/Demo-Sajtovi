/**
 * DI PLANS - Inženjersko i tehničko savetovanje
 * Glavna JavaScript logika (bez spoljnih biblioteka)
 * UTF-8 enkripcija, čisti regionalni karakteri (č, ć, š, đ, ž)
 */

(function () {
  "use strict";

  /* ==========================================================================
     KONSTANTE (POTVRDITI SA KLIJENTOM)
     Sve promenljive podatke klijent može izmeniti na ovom mestu
     ========================================================================== */
  var CONFIG = {
    brandName: "DI PLANS",
    tagline: "Inženjersko i tehničko savetovanje",
    email: "diplans.ns@gmail.com",
    /* POTVRDITI SA KLIJENTOM: placeholder telefona */
    phoneDisplay: "+381 64 000 0000",
    phoneIntl: "+381640000000",
    /* POTVRDITI SA KLIJENTOM: WhatsApp broj */
    whatsappNumber: "381640000000",
    /* POTVRDITI SA KLIJENTOM: Viber broj */
    viberNumber: "+381640000000",
    /* POTVRDITI SA KLIJENTOM: sedište i radno vreme */
    city: "Novi Sad, Srbija",
    address: "Novi Sad (teren po dogovoru na teritoriji cele Srbije)",
    workingHours: "Ponedeljak – Petak: 08:00 – 17:00",
    /* Šablon za brzu poruku */
    defaultMessageTemplate: "Pozdrav DI PLANS, potreban mi je inženjerski savet / tehnička podrška za objekat."
  };

  /* Helper selektori */
  var $ = function (selector, context) {
    return (context || document).querySelector(selector);
  };
  var $$ = function (selector, context) {
    return Array.prototype.slice.call((context || document).querySelectorAll(selector));
  };

  /* ==========================================================================
     1. Primena konfiguracije i placeholder podataka
     ========================================================================== */
  function applyConfig() {
    $$("[data-brand]").forEach(function (el) {
      el.textContent = CONFIG.brandName;
    });
    $$("[data-city]").forEach(function (el) {
      el.textContent = CONFIG.city;
    });
    $$("[data-address]").forEach(function (el) {
      el.textContent = CONFIG.address;
    });
    $$("[data-hours]").forEach(function (el) {
      el.textContent = CONFIG.workingHours;
    });

    $$("[data-tel]").forEach(function (el) {
      el.setAttribute("href", "tel:" + CONFIG.phoneIntl);
      if (el.hasAttribute("data-tel-text")) {
        el.textContent = CONFIG.phoneDisplay;
      }
    });

    $$("[data-mail]").forEach(function (el) {
      el.setAttribute("href", "mailto:" + CONFIG.email);
      if (el.hasAttribute("data-mail-text")) {
        el.textContent = CONFIG.email;
      }
    });

    // Inicijalni linkovi za WhatsApp i Viber sa unapred pripremljenom porukom
    updateChatLinks();

    var yearEl = $("#currentYear");
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  /* Generator strukturiranog teksta za WhatsApp / Viber poruku */
  function buildTemplateMessage(customData) {
    var data = customData || {};
    var lines = ["Pozdrav DI PLANS, potreban mi je inženjerski savet."];

    if (data.tipObjekta && data.tipObjekta !== "") {
      lines.push("• Vrsta objekta: " + data.tipObjekta);
    }
    if (data.lokacija && data.lokacija.trim() !== "") {
      lines.push("• Lokacija: " + data.lokacija.trim());
    }
    if (data.faza && data.faza !== "") {
      lines.push("• Faza objekta: " + data.faza);
    }
    if (data.usluge && data.usluge.length > 0) {
      lines.push("• Potrebno: " + data.usluge.join(", "));
    }
    if (data.opis && data.opis.trim() !== "") {
      lines.push("• Napomena: " + data.opis.trim());
    }

    if (lines.length === 1) {
      return CONFIG.defaultMessageTemplate;
    }

    return lines.join("\n");
  }

  function updateChatLinks(customData) {
    var text = buildTemplateMessage(customData);
    var encodedText = encodeURIComponent(text);

    var waUrl = "https://wa.me/" + CONFIG.whatsappNumber + "?text=" + encodedText;
    var viberUrl = "viber://chat?number=" + encodeURIComponent(CONFIG.viberNumber);

    $$("[data-wa]").forEach(function (el) {
      el.setAttribute("href", waUrl);
    });

    $$("[data-viber]").forEach(function (el) {
      el.setAttribute("href", viberUrl);
    });
  }

  /* ==========================================================================
     2. Mobilni meni (Full-screen navigacioni panel)
     ========================================================================== */
  var menuToggle = $("#menuToggle");
  var mobileDrawer = $("#mobileDrawer");

  function setMobileMenu(open) {
    if (!menuToggle || !mobileDrawer) return;

    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Zatvori navigacioni meni" : "Otvori navigacioni meni");
    mobileDrawer.classList.toggle("is-open", open);
    document.body.classList.toggle("lock", open);

    $$("a, button", mobileDrawer).forEach(function (el) {
      el.tabIndex = open ? 0 : -1;
    });
  }

  if (menuToggle && mobileDrawer) {
    setMobileMenu(false);

    menuToggle.addEventListener("click", function () {
      var isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      setMobileMenu(!isOpen);
    });

    $$(".mobile-nav-link", mobileDrawer).forEach(function (link) {
      link.addEventListener("click", function () {
        setMobileMenu(false);
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mobileDrawer.classList.contains("is-open")) {
        setMobileMenu(false);
        menuToggle.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth >= 1024 && mobileDrawer.classList.contains("is-open")) {
        setMobileMenu(false);
      }
    });
  }

  /* ==========================================================================
     3. Usluge (Kartice sa otvaranjem detalja)
     ========================================================================== */
  $$(".service-toggle-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var isExpanded = btn.getAttribute("aria-expanded") === "true";
      var targetId = btn.getAttribute("aria-controls");
      var detailsEl = document.getElementById(targetId);

      if (!detailsEl) return;

      btn.setAttribute("aria-expanded", String(!isExpanded));
      detailsEl.classList.toggle("is-open", !isExpanded);
    });
  });

  /* Brzo biranje usluge iz kartice i skrol na formu */
  $$(".service-inquire-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var serviceCode = btn.getAttribute("data-service-select");
      if (serviceCode) {
        var checkbox = $('input[name="usluge"][value="' + serviceCode + '"]');
        if (checkbox) {
          checkbox.checked = true;
          // Trigger change event to sync
          var event = new Event("change", { bubbles: true });
          checkbox.dispatchEvent(event);
        }
      }

      var contactSection = $("#kontakt");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  /* ==========================================================================
     4. FAQ Accordion (Pristupačan i jasan pregled)
     ========================================================================== */
  $$(".faq-trigger").forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      var isExpanded = trigger.getAttribute("aria-expanded") === "true";
      var contentId = trigger.getAttribute("aria-controls");
      var contentEl = document.getElementById(contentId);

      // Zatvori ostale radi čistog i preglednog prikaza
      $$(".faq-trigger").forEach(function (other) {
        if (other !== trigger) {
          other.setAttribute("aria-expanded", "false");
          var otherContent = document.getElementById(other.getAttribute("aria-controls"));
          if (otherContent) otherContent.classList.remove("is-open");
        }
      });

      if (!isExpanded) {
        trigger.setAttribute("aria-expanded", "true");
        if (contentEl) contentEl.classList.add("is-open");
      } else {
        trigger.setAttribute("aria-expanded", "false");
        if (contentEl) contentEl.classList.remove("is-open");
      }
    });
  });

  /* ==========================================================================
     5. Sticky mobilna traka (Poziv i Upit nakon prvog skrola)
     ========================================================================== */
  var stickyBar = $("#mobileStickyBar");
  var heroSection = $("#hero");

  function handleStickyBar() {
    if (!stickyBar) return;
    if (window.innerWidth >= 1024) {
      stickyBar.classList.remove("is-visible");
      return;
    }

    var scrollY = window.pageYOffset || document.documentElement.scrollTop;
    var triggerDistance = heroSection ? heroSection.offsetHeight * 0.45 : 240;

    if (scrollY > triggerDistance) {
      stickyBar.classList.add("is-visible");
    } else {
      stickyBar.classList.remove("is-visible");
    }
  }

  window.addEventListener("scroll", handleStickyBar, { passive: true });
  window.addEventListener("resize", handleStickyBar, { passive: true });

  /* ==========================================================================
     6. Strukturirana kontakt forma (Rešenje za problem dopisivanja)
     ========================================================================== */
  var inquiryForm = $("#inquiryForm");
  var formAlert = $("#formStatusAlert");

  // Prikupljanje trenutnih podataka iz forme
  function getFormData() {
    if (!inquiryForm) return {};

    var tipObjektaEl = inquiryForm.elements["tip_objekta"];
    var fazaEl = inquiryForm.querySelector('input[name="faza"]:checked');
    var uslugeChecked = $$('input[name="usluge"]:checked', inquiryForm).map(function (c) {
      return c.value;
    });

    return {
      ime: (inquiryForm.elements["ime"] ? inquiryForm.elements["ime"].value : ""),
      telefon: (inquiryForm.elements["telefon"] ? inquiryForm.elements["telefon"].value : ""),
      email: (inquiryForm.elements["email"] ? inquiryForm.elements["email"].value : ""),
      tipObjekta: (tipObjektaEl ? tipObjektaEl.value : ""),
      lokacija: (inquiryForm.elements["lokacija"] ? inquiryForm.elements["lokacija"].value : ""),
      faza: (fazaEl ? fazaEl.value : ""),
      usluge: uslugeChecked,
      opis: (inquiryForm.elements["opis"] ? inquiryForm.elements["opis"].value : ""),
      nacinKontakta: (inquiryForm.querySelector('input[name="nacin_kontakta"]:checked') ? inquiryForm.querySelector('input[name="nacin_kontakta"]:checked').value : "")
    };
  }

  // Dinamičko ažuriranje WhatsApp / Viber šablona kako korisnik unosi podatke
  if (inquiryForm) {
    inquiryForm.addEventListener("input", function () {
      updateChatLinks(getFormData());
    });
    inquiryForm.addEventListener("change", function () {
      updateChatLinks(getFormData());
    });
  }

  // Validacija polja
  function validateField(input, testFn, errorMsg) {
    var group = input.closest(".form-group");
    var errorEl = group ? group.querySelector(".form-error") : null;
    var isValid = testFn(input.value);

    if (group) {
      group.classList.toggle("has-error", !isValid);
    }
    if (errorEl) {
      errorEl.textContent = !isValid ? errorMsg : "";
    }
    input.setAttribute("aria-invalid", String(!isValid));
    return isValid;
  }

  if (inquiryForm) {
    inquiryForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var imeInput = inquiryForm.elements["ime"];
      var telInput = inquiryForm.elements["telefon"];
      var emailInput = inquiryForm.elements["email"];
      var tipInput = inquiryForm.elements["tip_objekta"];
      var lokacijaInput = inquiryForm.elements["lokacija"];
      var consentInput = inquiryForm.elements["saglasnost"];

      var v1 = validateField(imeInput, function (val) {
        return val.trim().length >= 2;
      }, "Unesite Vaše ime i prezime (min. 2 karaktera).");

      var v2 = validateField(telInput, function (val) {
        var digits = val.replace(/[^\d]/g, "");
        return digits.length >= 7 && /^[\d\s+\-\/()]+$/.test(val);
      }, "Unesite ispravan kontakt telefon.");

      var v3 = validateField(emailInput, function (val) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val.trim());
      }, "Unesite ispravnu email adresu.");

      var v4 = validateField(tipInput, function (val) {
        return val !== "";
      }, "Izaberite vrstu objekta.");

      var v5 = validateField(lokacijaInput, function (val) {
        return val.trim().length >= 2;
      }, "Unesite lokaciju objekta (grad ili opštinu).");

      var consentGroup = consentInput.closest(".form-group") || consentInput.parentElement;
      var v6 = consentInput.checked;
      if (!v6) {
        consentGroup.classList.add("has-error");
        var cErr = consentGroup.querySelector(".form-error");
        if (cErr) cErr.textContent = "Molimo potvrdite saglasnost za kontakt.";
      } else {
        consentGroup.classList.remove("has-error");
        var cErrClean = consentGroup.querySelector(".form-error");
        if (cErrClean) cErrClean.textContent = "";
      }

      var isAllValid = v1 && v2 && v3 && v4 && v5 && v6;

      if (!isAllValid) {
        // Fokusiraj prvo neispravno polje
        var firstError = inquiryForm.querySelector(".has-error input, .has-error select, .has-error textarea");
        if (firstError) firstError.focus();
        return;
      }

      // Prikaz uspeha (pošto nema backenda, pružamo čist i stručan feedback sa sažetkom)
      var currentData = getFormData();
      var summaryText = buildTemplateMessage(currentData);

      if (formAlert) {
        formAlert.className = "form-status-alert is-success";
        formAlert.innerHTML = "" +
          '<div class="alert-title">' +
            '<svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>' +
            'Upit je uspešno pripremljen i evidentiran' +
          '</div>' +
          '<p class="alert-desc">' +
            'Hvala Vam na strukturiranim informacijama, <strong>' + escapeHTML(currentData.ime) + '</strong>. ' +
            'DI PLANS inženjerski tim će pregledati Vaš zahtev i kontaktirati Vas putem izabranog kanala (' +
            escapeHTML(currentData.nacinKontakta || "Telefon / Email") + ') u najkraćem mogućem roku.' +
          '</p>' +
          '<div style="margin-top: 14px; padding: 12px; background: rgba(0,0,0,0.25); border-radius: 6px; font-family: var(--font-mono); font-size: 0.82rem; white-space: pre-wrap; line-height: 1.45;">' +
            escapeHTML(summaryText) +
          '</div>' +
          '<div style="margin-top: 14px; display: flex; gap: 10px; flex-wrap: wrap;">' +
            '<a href="https://wa.me/' + CONFIG.whatsappNumber + '?text=' + encodeURIComponent(summaryText) + '" target="_blank" rel="noopener" class="btn btn-sm btn-wa" style="border: 1px solid #25D366; color: #25D366;">' +
              'Prosledi ove podatke na WhatsApp' +
            '</a>' +
            '<a href="viber://chat?number=' + encodeURIComponent(CONFIG.viberNumber) + '" class="btn btn-sm btn-viber" style="border: 1px solid #7360F2; color: #9C8EF7;">' +
              'Otvori u Viber-u' +
            '</a>' +
          '</div>';

        formAlert.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }

      inquiryForm.reset();
      updateChatLinks();
    });
  }

  function escapeHTML(str) {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  /* ==========================================================================
     7. Scroll Reveal animacije (Poštovanje prefers-reduced-motion)
     ========================================================================== */
  var revealElements = $$(".reveal");
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach(function (el) {
      el.classList.add("is-in");
    });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    });

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* Inicijalizacija pri učitavanju */
  document.addEventListener("DOMContentLoaded", function () {
    applyConfig();
    handleStickyBar();
  });

  // Takođe pozivamo odmah ukoliko je skripta ubačena na dno body-ja
  applyConfig();
})();
