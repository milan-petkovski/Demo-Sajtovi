/**
 * MASTER APPLICATION CONTROLLER (app.js)
 * -------------------------------------------------------------
 * Upravlja stanjima aplikacije, profilima (Selena / Luka),
 * inicijalizacijom zvuka, kalibracijom mikrofona, animacijama
 * i slavljeničkim ekranom.
 */

import { CONFIG } from './config.js';
import { AudioEngine } from './audio.js';
import { FlameEngine } from './flame.js';
import { ConfettiEngine } from './confetti.js';

class BirthdayApp {
  constructor() {
    this.profile = this._resolveProfile();
    this.audioEngine = null;
    this.flameEngine = null;
    this.confettiEngine = null;

    this.isCalibrated = false;
    this.isCelebrationActive = false;
    this.isGlitched = false;
    this.glitchTimer = null;
    this.currentLitCount = this.profile.age;
    this._isGlitchingNow = false;
    this.isVip = false;

    // Keširani DOM elementi
    this.elements = {};

    this.init();
  }

  /**
   * Određuje profil: URL parametar (?user=luka ili ?user=selena) ima prioritet,
   * a ako nije postavljen, koristi se CONFIG.activeProfile
   */
  _resolveProfile() {
    const params = new URLSearchParams(window.location.search);
    const queryUser = (params.get('user') || params.get('profile') || '').toLowerCase();

    if (queryUser && CONFIG.profiles[queryUser]) {
      return CONFIG.profiles[queryUser];
    }

    const defaultId = CONFIG.activeProfile || 'selena';
    return CONFIG.profiles[defaultId] || CONFIG.profiles.selena;
  }

  init() {
    this._cacheElements();
    this._applyTheme();
    this._populateContent();
    this._createAmbientStars();
    this._initConfetti();
    this._initGlitchEffect();
    this._initPhotoLightbox();
    this._bindUserEvents();
  }

  _cacheElements() {
    this.elements = {
      appRoot: document.documentElement,
      introScreen: document.getElementById('intro-screen'),
      cakeScreen: document.getElementById('cake-screen'),
      celebrationScreen: document.getElementById('celebration-screen'),
      flameCanvas: document.getElementById('flame-canvas'),
      confettiCanvas: document.getElementById('confetti-canvas'),
      ambientStars: document.getElementById('ambient-stars'),

      // Dugmad
      btnStart: document.getElementById('btn-start'),
      btnRelight: document.getElementById('btn-relight'),
      btnShare: document.getElementById('btn-share'),
      btnTouchBlow: document.getElementById('btn-touch-blow'),
      btnSwitchProfile: document.getElementById('btn-switch-profile'),
      btnCloseCelebration: document.getElementById('btn-close-celebration'),
      btnReopenCelebration: document.getElementById('btn-reopen-celebration'),

      // Tekstualni elementi
      tagline: document.getElementById('profile-tagline'),
      heroTitle: document.getElementById('hero-title'),
      heroSubtitle: document.getElementById('hero-subtitle'),
      wishTitle: document.getElementById('wish-title'),
      wishInstruction: document.getElementById('wish-instruction'),
      fallbackInstruction: document.getElementById('fallback-instruction'),
      celebrationTitle: document.getElementById('celebration-title'),
      celebrationSubtitle: document.getElementById('celebration-subtitle'),
      messageTitle: document.getElementById('message-title'),
      personalMessage: document.getElementById('personal-message'),
      messageSignature: document.getElementById('message-signature'),
      photoGallery: document.getElementById('photo-gallery'),

      // Indikatori i HUD
      blowMeterProgress: document.getElementById('blow-meter-progress'),
      blowIntensityVal: document.getElementById('blow-intensity-val'),
      blowAura: document.getElementById('blow-aura'),
      calibrationModal: document.getElementById('calibration-modal'),
      calibrationBar: document.getElementById('calibration-bar'),
      stepLoading: document.getElementById('calibration-step-loading'),
      stepTroll: document.getElementById('calibration-step-troll'),
      stepVip: document.getElementById('calibration-step-vip'),
      stepForgive: document.getElementById('calibration-step-forgive'),
      trollCandlesCount: document.getElementById('troll-candles-count'),
      trollVipText: document.getElementById('troll-vip-text'),
      trollForgiveText: document.getElementById('troll-forgive-text'),
      btnTrollPaypal: document.getElementById('btn-troll-paypal'),
      btnTrollBegMilan: document.getElementById('btn-troll-beg-milan'),
      btnTrollVipFinish: document.getElementById('btn-troll-vip-finish'),
      btnTrollFinish: document.getElementById('btn-troll-finish'),
      btnTrollHud: document.getElementById('btn-troll-hud'),
      btnTrollHudText: document.getElementById('btn-troll-hud-text'),
      userStatusBadge: document.getElementById('user-status-badge'),
      cakeStand: document.getElementById('cake-stand'),
      toastNotice: document.getElementById('toast-notice'),
      toastMessage: document.getElementById('toast-message'),
      litCounterBadge: document.getElementById('lit-counter-badge'),
      litCounterText: document.getElementById('lit-counter-text')
    };
  }

  /**
   * Generiše suptilne svetlucave zvezdice u pozadini
   */
  _createAmbientStars() {
    if (!this.elements.ambientStars) return;
    const count = 40;
    let html = '';
    for (let i = 0; i < count; i++) {
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const size = 1.2 + Math.random() * 2.2;
      const delay = Math.random() * 6;
      const duration = 2.5 + Math.random() * 4;
      const opacity = 0.25 + Math.random() * 0.65;
      html += `<div class="ambient-star" style="top:${top}%; left:${left}%; width:${size}px; height:${size}px; animation-delay:${delay}s; animation-duration:${duration}s; opacity:${opacity};"></div>`;
    }
    this.elements.ambientStars.innerHTML = html;
  }

  /**
   * Postavlja dinamičke CSS promenljive prema temi izabranog profila
   */
  _applyTheme() {
    const t = this.profile.theme;
    const root = document.documentElement;

    root.style.setProperty('--color-primary', t.primary);
    root.style.setProperty('--color-primary-glow', t.primaryGlow);
    root.style.setProperty('--color-secondary', t.secondary);
    root.style.setProperty('--color-secondary-glow', t.secondaryGlow);
    root.style.setProperty('--color-accent', t.accent);
    root.style.setProperty('--bg-dark', t.bgDark);
    root.style.setProperty('--bg-surface', t.bgSurface);
    root.style.setProperty('--bg-card', t.bgCard);
    root.style.setProperty('--text-main', t.textMain);
    root.style.setProperty('--text-muted', t.textMuted);
    root.style.setProperty('--cake-icing', t.cakeIcing);
    root.style.setProperty('--cake-frosting', t.cakeFrosting);
    root.style.setProperty('--cake-base', t.cakeBase);
    root.style.setProperty('--candle-wax', t.candleWax);
    root.style.setProperty('--candle-stripe', t.candleStripe);
  }

  /**
   * Puni HTML tekstualnim podacima i slikama iz config.js
   */
  _populateContent() {
    const p = this.profile;

    document.title = `${p.name} - Srećan rođendan!`;

    if (this.elements.tagline) {
      const span = this.elements.tagline.querySelector('span');
      if (span) {
        span.textContent = p.tagline;
      } else {
        this.elements.tagline.textContent = p.tagline;
      }
    }
    const heroTagline = document.querySelector('.hero-tagline');
    if (heroTagline) heroTagline.textContent = p.tagline;

    if (this.elements.heroTitle) this.elements.heroTitle.textContent = p.heroTitle;
    if (this.elements.heroSubtitle) this.elements.heroSubtitle.textContent = p.heroSubtitle;
    if (this.elements.wishTitle) this.elements.wishTitle.textContent = p.wishTitle;
    if (this.elements.wishInstruction) this.elements.wishInstruction.textContent = p.wishInstruction;
    if (this.elements.fallbackInstruction) this.elements.fallbackInstruction.textContent = p.fallbackInstruction;
    if (this.elements.trollCandlesCount) this.elements.trollCandlesCount.textContent = p.age;

    if (this.elements.celebrationTitle) this.elements.celebrationTitle.textContent = p.celebration.title;
    if (this.elements.celebrationSubtitle) this.elements.celebrationSubtitle.textContent = p.celebration.subtitle;
    if (this.elements.messageTitle) this.elements.messageTitle.textContent = p.celebration.messageTitle;
    if (this.elements.personalMessage) this.elements.personalMessage.textContent = p.celebration.personalMessage;
    if (this.elements.messageSignature) this.elements.messageSignature.textContent = p.celebration.signature;

    // Tekst dugmeta za brzu promenu profila (u zaglavlju)
    if (this.elements.btnSwitchProfile) {
      const otherUser = p.id === 'selena' ? 'Luku' : 'Selenu';
      this.elements.btnSwitchProfile.innerHTML = `
        <span class="btn-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <polyline points="16 11 18 13 22 9"></polyline>
          </svg>
        </span>
        <span>Pogledaj verziju za ${otherUser}</span>
      `;
    }

    // Galerija fotografija i videa (moderne, čiste i luksuzne kartice sa pravim uspomenama)
    if (this.elements.photoGallery && p.photos) {
      this.elements.photoGallery.innerHTML = p.photos.map(photo => {
        const isVideo = photo.type === 'video' || photo.url.endsWith('.mp4');
        return `
          <div class="luxury-photo-card ${isVideo ? 'luxury-video-card' : ''}" data-url="${photo.url}" data-type="${isVideo ? 'video' : 'image'}" data-caption="${photo.caption}" title="Klikni za pregled">
            <div class="photo-media-wrapper">
              ${isVideo ? `
                <video src="${photo.url}" class="photo-image" playsinline muted loop autoplay preload="metadata" style="object-position: ${photo.position || 'center'};"></video>
                <div class="photo-video-badge">
                  <svg viewBox="0 0 24 24" fill="currentColor" class="svg-icon">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </div>
              ` : `
                <img src="${photo.url}" alt="${p.name}" class="photo-image" style="object-position: ${photo.position || 'center'};" loading="lazy" />
              `}
            </div>
            <div class="photo-caption-bar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              <span>${photo.caption}</span>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  /**
   * Lightbox modal za uvećan prikaz fotografija i videa na klik
   */
  _initPhotoLightbox() {
    const lightbox = document.getElementById('photo-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxVideo = document.getElementById('lightbox-video');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const btnClose = document.getElementById('btn-close-lightbox');

    if (!lightbox || !this.elements.photoGallery) return;

    this.elements.photoGallery.addEventListener('click', (e) => {
      const card = e.target.closest('.luxury-photo-card');
      if (!card) return;
      const url = card.getAttribute('data-url');
      const type = card.getAttribute('data-type');
      const caption = card.getAttribute('data-caption') || '';

      if (url) {
        if (type === 'video' || url.endsWith('.mp4')) {
          if (lightboxImg) lightboxImg.style.display = 'none';
          if (lightboxVideo) {
            lightboxVideo.style.display = 'block';
            lightboxVideo.src = url;
            lightboxVideo.currentTime = 0;
            lightboxVideo.play().catch(() => {});
          }
        } else {
          if (lightboxVideo) {
            lightboxVideo.pause();
            lightboxVideo.src = '';
            lightboxVideo.style.display = 'none';
          }
          if (lightboxImg) {
            lightboxImg.style.display = 'block';
            lightboxImg.src = url;
          }
        }

        if (lightboxCaption) lightboxCaption.textContent = caption;
        lightbox.classList.remove('modal-hidden');
      }
    });

    const closeLightbox = () => {
      lightbox.classList.add('modal-hidden');
      if (lightboxVideo) {
        lightboxVideo.pause();
        lightboxVideo.src = '';
      }
      if (lightboxImg) lightboxImg.src = '';
    };

    if (btnClose) btnClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !lightbox.classList.contains('modal-hidden')) {
        closeLightbox();
      }
    });
  }

  /**
   * Cyber Glitch efekat za Luku (Luka <-> Deda, 25 <-> 67 godina)
   */
  _initGlitchEffect() {
    if (!this.profile.glitch || !this.profile.glitch.enabled) return;

    // Klik na naslove omogućava slavljeniku da sam aktivira glitch kao Easter egg
    if (this.elements.heroTitle) {
      this.elements.heroTitle.style.cursor = 'pointer';
      this.elements.heroTitle.title = 'Klikni za promenu identiteta!';
      this.elements.heroTitle.addEventListener('click', () => {
        this._triggerGlitchBurst();
      });
    }

    if (this.elements.celebrationTitle) {
      this.elements.celebrationTitle.style.cursor = 'pointer';
      this.elements.celebrationTitle.title = 'Klikni za promenu identiteta!';
      this.elements.celebrationTitle.addEventListener('click', () => {
        this._triggerGlitchBurst();
      });
    }

    if (this.elements.litCounterBadge) {
      this.elements.litCounterBadge.style.cursor = 'pointer';
      this.elements.litCounterBadge.addEventListener('click', () => {
        this._triggerGlitchBurst();
      });
    }

    // Automatsko pokretanje glitch-a svakih nekoliko sekundi
    const scheduleNext = () => {
      const delay = 3600 + Math.random() * 2600;
      this.glitchTimer = setTimeout(() => {
        this._triggerGlitchBurst(() => {
          scheduleNext();
        });
      }, delay);
    };

    scheduleNext();
  }

  _triggerGlitchBurst(callback) {
    if (this._isGlitchingNow) return;
    this._isGlitchingNow = true;

    const g = this.profile.glitch;
    if (!g) {
      this._isGlitchingNow = false;
      return;
    }

    // 1. FAZA: Šum i digitalni jitter (160ms)
    this._setGlitchVisualClasses(true);
    this._scrambleTextNoise();

    setTimeout(() => {
      // 2. FAZA: Prebacivanje na DEDA / 67 godina (drži 2.2 sekunde)
      this.isGlitched = true;
      this._applyGlitchedContent();
      this._setGlitchVisualClasses(false);

      setTimeout(() => {
        // 3. FAZA: Povratni digitalni jitter (160ms)
        this._setGlitchVisualClasses(true);
        this._scrambleTextNoise();

        setTimeout(() => {
          // 4. FAZA: Povratak u regularno stanje (Luka / 25 godina)
          this.isGlitched = false;
          this._populateContent();
          this._updateLitCounter(this.currentLitCount);
          this._setGlitchVisualClasses(false);
          this._isGlitchingNow = false;
          if (callback) callback();
        }, 160);

      }, 2200);

    }, 160);
  }

  _applyGlitchedContent() {
    const p = this.profile;
    const g = p.glitch;
    if (!g) return;

    if (this.elements.heroTitle) {
      this.elements.heroTitle.innerHTML = `Srećan <span class="glitch-text glitch-active">${g.altAge}.</span> rođendan, <span class="glitch-text glitch-active">${g.altName}!</span>`;
    }
    if (this.elements.tagline) {
      this.elements.tagline.innerHTML = `<span class="glitch-text glitch-active">${g.altTagline}</span>`;
    }
    const heroTagline = document.querySelector('.hero-tagline');
    if (heroTagline) {
      heroTagline.innerHTML = `<span class="glitch-text glitch-active">${g.altTagline}</span>`;
    }
    if (this.elements.celebrationTitle) {
      this.elements.celebrationTitle.innerHTML = `Srećan <span class="glitch-text glitch-active">${g.altAge}.</span> rođendan, <span class="glitch-text glitch-active">${g.altName}!</span>`;
    }
    if (this.elements.celebrationSubtitle) {
      this.elements.celebrationSubtitle.innerHTML = `<span class="glitch-text glitch-active">${g.altCelebrationSubtitle}</span>`;
    }
    if (this.elements.messageTitle) {
      this.elements.messageTitle.innerHTML = `Pismo za <span class="glitch-text glitch-active">Dedu</span>`;
    }
    if (this.elements.personalMessage) {
      this.elements.personalMessage.innerHTML = g.altPersonalMessage.replace(
        /(Deda Luka|67\. godinu|Penzija|reumu pod kontrolom|partija šaha)/g,
        '<span class="glitch-text glitch-active">$1</span>'
      );
    }
    if (this.elements.litCounterText && this.currentLitCount > 0) {
      this.elements.litCounterText.innerHTML = `Svećice: ${this.currentLitCount} od <span class="glitch-text glitch-active">${g.altAge}${g.altCounterSuffix}</span>`;
    }
  }

  _scrambleTextNoise() {
    const chars = '!@#$%^&*<>[]{}0123456789ABCDEF';
    const glitchables = [
      this.elements.heroTitle,
      this.elements.tagline,
      this.elements.celebrationTitle,
      this.elements.litCounterText
    ];

    glitchables.forEach(el => {
      if (!el) return;
      const original = el.textContent || '';
      let scrambled = '';
      const len = Math.min(26, original.length);
      for (let i = 0; i < len; i++) {
        scrambled += chars[Math.floor(Math.random() * chars.length)];
      }
      el.textContent = scrambled;
    });
  }

  _setGlitchVisualClasses(isAnimating) {
    const targets = [
      this.elements.heroTitle,
      this.elements.tagline,
      this.elements.celebrationTitle,
      this.elements.litCounterBadge
    ];

    targets.forEach(el => {
      if (!el) return;
      if (isAnimating) {
        el.classList.add('glitch-animating');
      } else {
        el.classList.remove('glitch-animating');
      }
    });
  }

  _initConfetti() {
    this.confettiEngine = new ConfettiEngine(this.elements.confettiCanvas);
    const t = this.profile.theme;
    this.confettiEngine.setColors([
      t.primary,
      t.secondary,
      t.accent,
      '#ffffff',
      '#fcd34d'
    ]);
  }

  _bindUserEvents() {
    // 1. Klik na "Započni" (korisnička akcija za pokretanje Web Audio API i mikrofona)
    if (this.elements.btnStart) {
      this.elements.btnStart.addEventListener('click', () => this.handleStartFlow());
    }

    // 2. Dugme za ponovno paljenje svećica
    if (this.elements.btnRelight) {
      this.elements.btnRelight.addEventListener('click', () => this.handleRelightFlow());
    }

    // 3. Dugme za deljenje
    if (this.elements.btnShare) {
      this.elements.btnShare.addEventListener('click', () => this.handleShare());
    }

    // 4. Dugme za gašenje dodirom / simulacija daha (fallback)
    if (this.elements.btnTouchBlow) {
      this.elements.btnTouchBlow.addEventListener('click', () => this.handleSimulateBlow());
    }

    // 5. Prebacivanje između Selene i Luke
    if (this.elements.btnSwitchProfile) {
      this.elements.btnSwitchProfile.addEventListener('click', () => {
        const target = this.profile.id === 'selena' ? 'luka' : 'selena';
        window.location.search = `?user=${target}`;
      });
    }

    // 6. Zatvaranje slavljeničkog popup-a (X) da se vidi torta i vatromet
    if (this.elements.btnCloseCelebration) {
      this.elements.btnCloseCelebration.addEventListener('click', () => {
        this.elements.celebrationScreen.classList.add('modal-hidden');
        if (this.elements.btnReopenCelebration) {
          this.elements.btnReopenCelebration.classList.remove('btn-reopen-hidden');
        }
      });
    }

    // 7. Ponovno otvaranje čestitke kada je popup zatvoren
    if (this.elements.btnReopenCelebration) {
      this.elements.btnReopenCelebration.addEventListener('click', () => {
        this.elements.celebrationScreen.classList.remove('modal-hidden');
        this.elements.btnReopenCelebration.classList.add('btn-reopen-hidden');
      });
    }

    // 8. Troll akcije: Molba Milanu za popust (Švorc / Socijalna pomoć)
    if (this.elements.btnTrollBegMilan) {
      this.elements.btnTrollBegMilan.addEventListener('click', () => {
        this.isVip = false;
        if (this.audioEngine) this.audioEngine.playSadTrombone();
        if (this.elements.stepTroll) this.elements.stepTroll.classList.add('troll-step-hidden');
        if (this.elements.stepForgive) {
          const forgiveText = this.profile.id === 'selena'
            ? `Menadžer Milan: <em>„Draga Selena, pošto ti je ${this.profile.age}. rođendan, ovaj put ti odobravam socijalni vazduh! Dug od 10€ ti pišem u crnu svesku sa 20% kamate za sledeću godinu!“</em>`
            : `Menadžer Milan: <em>„Brate Tutz, ${this.profile.age} godina je ozbiljan jubilej, ali džep prazan! Oprostio bih ti rado, ali serveri koštaju. Dug od 10€ ti pišem u crnu svesku sa 20% zelenaške kamate!“</em>`;
          if (this.elements.trollForgiveText) {
            this.elements.trollForgiveText.innerHTML = forgiveText;
          }
          this.elements.stepForgive.classList.remove('troll-step-hidden');
        }
      });
    }

    // 9. Troll akcije: Klik na PayPal link (VIP Gospodski tretman)
    if (this.elements.btnTrollPaypal) {
      this.elements.btnTrollPaypal.addEventListener('click', () => {
        this.isVip = true;
        if (this.audioEngine) this.audioEngine.playVipSound();
        if (this.confettiEngine) {
          this.confettiEngine.launchCannons(35, 35, 20);
        }
        if (this.elements.stepTroll) this.elements.stepTroll.classList.add('troll-step-hidden');
        if (this.elements.stepVip) {
          const vipText = this.profile.id === 'selena'
            ? `Menadžer Milan: <em>„Gospodski gest draga Selena! Pravi VIP donator! Za tebe stiže uvozni švajcarski planinski kiseonik. Svećice nemaju nikakve šanse!“</em>`
            : `Menadžer Milan: <em>„To se traži brate Tutz! Uplata je legla, pravi gospodski potez! Milanov kompresor je spreman, svećice se gase na pogled!“</em>`;
          if (this.elements.trollVipText) {
            this.elements.trollVipText.innerHTML = vipText;
          }
          this.elements.stepVip.classList.remove('troll-step-hidden');
        }
      });
    }

    // 10A. Troll akcije: VIP Završetak i ulazak na slavlje
    if (this.elements.btnTrollVipFinish) {
      this.elements.btnTrollVipFinish.addEventListener('click', () => {
        if (this.audioEngine) this.audioEngine.playSuccessFanfare();
        this.elements.calibrationModal.classList.add('modal-hidden');
        if (this.elements.userStatusBadge) {
          this.elements.userStatusBadge.className = 'user-status-badge badge-vip';
          this.elements.userStatusBadge.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="svg-icon">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            <span>VIP GOSPODIN (10€ UPLAĆENO)</span>
          `;
          this.elements.userStatusBadge.classList.remove('status-hidden');
        }
        if (this.elements.btnTrollHud) {
          this.elements.btnTrollHud.classList.add('hud-vip-active');
        }
        if (this.elements.btnTrollHudText) {
          this.elements.btnTrollHudText.textContent = 'Turbo dah (Aktiviran)';
        }
        this.showToast('VIP status aktiviran! Milanov industrijski kompresor je spreman.', 4500);
      });
    }

    // 10B. Troll akcije: Završetak za dužnike / švorc
    if (this.elements.btnTrollFinish) {
      this.elements.btnTrollFinish.addEventListener('click', () => {
        if (this.audioEngine) this.audioEngine.playBuzzerSound();
        this.elements.calibrationModal.classList.add('modal-hidden');
        if (this.elements.userStatusBadge) {
          this.elements.userStatusBadge.className = 'user-status-badge badge-poor';
          this.elements.userStatusBadge.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="svg-icon">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="8" y1="15" x2="16" y2="15"></line>
              <line x1="9" y1="9" x2="9.01" y2="9"></line>
              <line x1="15" y1="9" x2="15.01" y2="9"></line>
            </svg>
            <span>STATUS: ŠVORC (DUG 10€ MILANU)</span>
          `;
          this.elements.userStatusBadge.classList.remove('status-hidden');
        }
        this.showToast('Dozvola odobrena na veresiju! Milan te drži u crnoj svesci.', 5000);
      });
    }

    // 11. Troll HUD dugme (Turbo dah)
    if (this.elements.btnTrollHud) {
      this.elements.btnTrollHud.addEventListener('click', () => {
        if (this.isVip) {
          if (this.flameEngine) {
            this.flameEngine.extinguishAll();
          }
          if (this.audioEngine) {
            this.audioEngine.playVipSound();
          }
          if (this.confettiEngine) {
            this.confettiEngine.launchCannons(50, 50, 25);
          }
          this.showToast('VIP TURBO DAH: Milanov kompresor gasi sve svećice u jednom cugu!', 4500);
        } else {
          if (this.audioEngine) this.audioEngine.playBuzzerSound();
          // Otvara PayPal u novom tabu za uplatu 10€
          window.open('https://paypal.me/milanwebportal/10EUR', '_blank');
          this.showToast('Nema džabe turbo daha! Otvaram PayPal... Uplati 10€ da Milan uključi kompresor!', 5500);
        }
      });
    }
  }

  /**
   * Pokretanje toka nakon klika "Počni"
   */
  async handleStartFlow() {
    // Sakrij uvodni ekran i prikaži ekran sa tortom
    this.elements.introScreen.classList.add('screen-hidden');
    this.elements.cakeScreen.classList.remove('screen-hidden');

    // Prikaži modal za kalibraciju mikrofona
    this.elements.calibrationModal.classList.remove('modal-hidden');

    // Inicijalizuj audio engine
    this.audioEngine = new AudioEngine(CONFIG.audioSettings);

    // Povratni poziv za progres kalibracije
    this.audioEngine.onCalibrationProgress = (progress) => {
      if (this.elements.calibrationBar) {
        this.elements.calibrationBar.style.width = `${Math.round(progress * 100)}%`;
      }
    };

    // Kalibracija završena -> Pokreni šaljivi Troll Paywall
    this.audioEngine.onCalibrationComplete = () => {
      this.isCalibrated = true;
      this._showCalibrationTrollPaywall();
    };

    this._lastTrollToastTime = 0;

    // Povratni poziv za ažuriranje jačine duvanja (60 fps)
    this.audioEngine.onIntensityUpdate = ({ intensity, rawIntensity }) => {
      this.updateBlowFeedback(intensity);
      if (this.flameEngine) {
        this.flameEngine.setBlowIntensity(intensity);
      }

      // Šaljivi povremeni savet ako dah oslabi
      if (intensity > 0.15 && intensity < 0.48 && this.flameEngine && this.flameEngine.candles.filter(c => c.isLit).length > 3) {
        const now = performance.now();
        if (now - this._lastTrollToastTime > 11000) {
          this._lastTrollToastTime = now;
          this.showToast('Detektovan slab dah! Preporučujemo uplatu 10€ na PayPal za jači ventilator.', 4500);
        }
      }
    };

    // Obrada grešaka (npr. odbijena dozvola)
    this.audioEngine.onError = (message) => {
      this.elements.calibrationModal.classList.add('modal-hidden');
      this.showToast(message, 5000);
      // Prikazujemo dugme za gašenje dodirom uočljivije
      if (this.elements.btnTouchBlow) {
        this.elements.btnTouchBlow.classList.add('highlight-fallback');
      }
    };

    // Inicijalizuj plamen i svećice
    this._initFlameEngine();

    // Pokreni audio engine
    await this.audioEngine.start();
  }

  /**
   * Prikazuje šaljivi paywall prozor sa PayPal dugmetom nakon kalibracije
   */
  _showCalibrationTrollPaywall() {
    if (this.audioEngine) {
      this.audioEngine.playBuzzerSound();
    }
    if (this.elements.stepLoading) {
      this.elements.stepLoading.classList.add('troll-step-hidden');
    }
    if (this.elements.stepTroll) {
      this.elements.stepTroll.classList.remove('troll-step-hidden');
    }
  }

  /**
   * Inicijalizuje FlameEngine na canvasu
   */
  _initFlameEngine() {
    const canvas = this.elements.flameCanvas;
    const cakeStand = this.elements.cakeStand;
    const rect = cakeStand.getBoundingClientRect();

    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    this.flameEngine = new FlameEngine(canvas, {
      theme: this.profile.theme,
      playPuffSound: () => {
        if (this.audioEngine) this.audioEngine.playPuffSound();
      },
      onCandleExtinguished: (candle, litCount) => {
        this._updateLitCounter(litCount);
      },
      onAllExtinguished: () => {
        this.handleAllExtinguished();
      }
    });

    // Broj svećica: tačne godine slavljenika (npr. 29 za Selenu, 30 za Luku)
    const candleCount = this.profile.age || 29;
    this.flameEngine.initCandles(candleCount, { width: rect.width, height: rect.height });
    this.flameEngine.start();

    this._updateLitCounter(candleCount);
  }

  _updateLitCounter(litCount) {
    this.currentLitCount = litCount;
    if (this.elements.litCounterText) {
      if (litCount === 0) {
        this.elements.litCounterText.textContent = 'Sve svećice su ugašene!';
      } else {
        if (this.isGlitched && this.profile.glitch && this.profile.glitch.enabled) {
          this.elements.litCounterText.innerHTML = `Svećice: ${litCount} od <span class="glitch-text glitch-active">${this.profile.glitch.altAge}${this.profile.glitch.altCounterSuffix}</span>`;
        } else {
          this.elements.litCounterText.textContent = `Svećice: ${litCount} od ${this.profile.age}`;
        }
      }
    }
  }

  /**
   * Vizuelna reakcija na dah: HUD meter i talasasti aura glow oko torte
   */
  updateBlowFeedback(intensity) {
    const percent = Math.min(100, Math.round(intensity * 100));

    if (this.elements.blowMeterProgress) {
      this.elements.blowMeterProgress.style.width = `${percent}%`;
      if (percent >= 92) {
        this.elements.blowMeterProgress.classList.add('blow-peak');
      } else {
        this.elements.blowMeterProgress.classList.remove('blow-peak');
      }
    }
    if (this.elements.blowIntensityVal) {
      this.elements.blowIntensityVal.textContent = `${percent}%`;
      if (percent >= 92) {
        this.elements.blowIntensityVal.classList.add('blow-value-peak');
      } else {
        this.elements.blowIntensityVal.classList.remove('blow-value-peak');
      }
    }

    if (this.elements.blowAura) {
      // Širenje i pulsiranje svetlosne aure oko torte srazmerno dahu
      const scale = 1 + intensity * 0.45;
      const opacity = 0.2 + intensity * 0.8;
      this.elements.blowAura.style.transform = `scale(${scale})`;
      this.elements.blowAura.style.opacity = opacity;
    }
  }

  /**
   * Poziva se kada se ugasi i poslednja svećica
   */
  handleAllExtinguished() {
    if (this.isCelebrationActive) return;
    this.isCelebrationActive = true;

    // Čista, top-tier pauza (480ms) nakon gašenja poslednje svećice
    // omogućava da se vidi podizanje dima i pruža onaj pravi osećaj trijumfa pre eksplozije slavlja
    setTimeout(() => {
      // Slavljenički zvuk
      if (this.audioEngine) {
        this.audioEngine.playSuccessFanfare();
      }

      // Pokrećemo konfete i vatromet preko cele stranice
      if (this.confettiEngine) {
        this.confettiEngine.startCelebration();
      }

      // Posle kratke pauze (dim se diže) otkrivamo slavljenički POPUP preko svega
      setTimeout(() => {
        this.elements.celebrationScreen.classList.remove('modal-hidden');
        if (this.elements.btnReopenCelebration) {
          this.elements.btnReopenCelebration.classList.add('btn-reopen-hidden');
        }
      }, 1100);
    }, 480);
  }

  /**
   * Ponovno paljenje svećica ("Zapali ponovo")
   */
  handleRelightFlow() {
    this.isCelebrationActive = false;

    // Sakrij popup čestitku
    this.elements.celebrationScreen.classList.add('modal-hidden');
    if (this.elements.btnReopenCelebration) {
      this.elements.btnReopenCelebration.classList.add('btn-reopen-hidden');
    }

    // Zaustavi konfete
    if (this.confettiEngine) {
      this.confettiEngine.stop();
    }

    // Zvuk paljenja
    if (this.audioEngine) {
      this.audioEngine.playRelightSparkle();
    }

    // Upali ponovo sve svećice
    if (this.flameEngine) {
      this.flameEngine.relightAll();
      this._updateLitCounter(this.profile.age);
    }

    this.showToast('Svećice su ponovo upaljene! Možeš ponovo zaželeti želju.');
  }

  /**
   * Deljenje rođendanskog linka
   */
  async handleShare() {
    const shareData = {
      title: `${this.profile.name} - Srećan rođendan!`,
      text: `Pogledaj rođendansko iznenađenje za ${this.profile.name}!`,
      url: window.location.href
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch (e) {
        // Korisnik je otkazao ili fallback
      }
    }

    // Fallback: kopiranje u clipboard
    try {
      await navigator.clipboard.writeText(window.location.href);
      this.showToast('Link je uspešno kopiran u privremenu memoriju (clipboard)!');
    } catch (e) {
      this.showToast('Kopirajte adresu sajta iz adresne linije pretraživača.');
    }
  }


  /**
   * Simulira duvanje (fallback ako korisnik nema mikrofon ili želi brzo testiranje)
   */
  handleSimulateBlow() {
    if (!this.flameEngine) return;

    // Simulira jak udah i duvanje u trajanju od 1.2 sekunde
    let step = 0;
    const interval = setInterval(() => {
      step++;
      const simulatedIntensity = Math.min(0.85, 0.3 + (step * 0.08));
      this.updateBlowFeedback(simulatedIntensity);
      this.flameEngine.setBlowIntensity(simulatedIntensity);

      if (step >= 10) {
        clearInterval(interval);
        setTimeout(() => {
          this.updateBlowFeedback(0);
          this.flameEngine.setBlowIntensity(0);
        }, 300);
      }
    }, 100);
  }

  /**
   * Prikaz obaveštenja (toast notifikacija)
   */
  showToast(text, duration = 3500) {
    if (!this.elements.toastNotice || !this.elements.toastMessage) return;

    this.elements.toastMessage.textContent = text;
    this.elements.toastNotice.classList.remove('toast-hidden');

    if (this._toastTimer) clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => {
      this.elements.toastNotice.classList.add('toast-hidden');
    }, duration);
  }
}

// Inicijalizacija kada se učita DOM
window.addEventListener('DOMContentLoaded', () => {
  window.birthdayApp = new BirthdayApp();
});
