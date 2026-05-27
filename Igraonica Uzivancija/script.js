/* ============================================
   IGRAONICA UŽIVANCIJA - JAVASCRIPT
   Animations, interactions, and fun!
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ===== NAVBAR SCROLL EFFECT =====
  const navbar = document.getElementById('navbar');
  const scrollTop = document.getElementById('scroll-top');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Navbar background change
    if (currentScroll > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll to top button
    if (currentScroll > 500) {
      scrollTop.classList.add('visible');
    } else {
      scrollTop.classList.remove('visible');
    }

    lastScroll = currentScroll;
  });

  // Scroll to top click
  scrollTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ===== HAMBURGER MENU =====
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });

  // Close mobile menu when link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // ===== ACTIVE NAV LINK HIGHLIGHT =====
  const sections = document.querySelectorAll('section[id]');
  const navLinksAll = navLinks.querySelectorAll('a[href^="#"]');

  function updateActiveNav() {
    const scrollY = window.pageYOffset + 150;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinksAll.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);

  // ===== SCROLL REVEAL ANIMATION =====
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ===== GALLERY LIGHTBOX =====
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
      lightboxImg.src = '';
    }, 400);
  }

  lightboxClose.addEventListener('click', (e) => {
    e.stopPropagation();
    closeLightbox();
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  // ===== CONFETTI BURST ON HERO CTA CLICK =====
  const confettiContainer = document.getElementById('confetti-container');
  const heroCta = document.getElementById('hero-cta-call');
  const confettiColors = ['#FF6B9D', '#FFD93D', '#6BCB77', '#4ECDC4', '#A78BFA', '#FF8C42', '#67E8F9', '#FF6B6B'];

  function createConfetti(x, y) {
    const count = 40;
    for (let i = 0; i < count; i++) {
      const piece = document.createElement('div');
      piece.classList.add('confetti-piece');
      piece.style.left = x + 'px';
      piece.style.top = y + 'px';
      piece.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
      piece.style.width = (Math.random() * 10 + 5) + 'px';
      piece.style.height = (Math.random() * 10 + 5) + 'px';
      piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '3px';
      
      const angle = (Math.random() * 360) * (Math.PI / 180);
      const velocity = Math.random() * 200 + 100;
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity;
      
      piece.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
      piece.style.setProperty('--vx', vx + 'px');
      
      piece.animate([
        { 
          transform: `translate(0, 0) rotate(0deg)`, 
          opacity: 1 
        },
        { 
          transform: `translate(${vx}px, ${vy + 400}px) rotate(${Math.random() * 720}deg)`, 
          opacity: 0 
        }
      ], {
        duration: (Math.random() * 1500) + 1000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        fill: 'forwards'
      });

      confettiContainer.appendChild(piece);

      setTimeout(() => {
        piece.remove();
      }, 3000);
    }
  }

  // Burst confetti on hero CTA click
  if (heroCta) {
    heroCta.addEventListener('click', (e) => {
      createConfetti(e.clientX, e.clientY);
    });
  }

  // Initial confetti burst on page load (after slight delay)
  setTimeout(() => {
    createConfetti(window.innerWidth / 2, window.innerHeight / 3);
  }, 1200);

  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== SERVICE CARD TILT EFFECT =====
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ===== EMOJI BOUNCE ON HOVER =====
  document.querySelectorAll('.service-icon, .menu-item-emoji, .benefit-emoji').forEach(el => {
    el.addEventListener('mouseenter', () => {
      el.style.animation = 'none';
      el.offsetHeight; // trigger reflow
      el.style.animation = 'bounce-soft 0.5s ease-out';
    });
  });

  // ===== PACKAGE CARD HOVER EFFECTS =====
  const packageCards = document.querySelectorAll('.package-card');
  packageCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const emoji = card.querySelector('.package-emoji');
      if (emoji) {
        emoji.style.transform = 'scale(1.3) rotate(15deg)';
        emoji.style.transition = 'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
      }
    });

    card.addEventListener('mouseleave', () => {
      const emoji = card.querySelector('.package-emoji');
      if (emoji) {
        emoji.style.transform = '';
      }
    });
  });

  // ===== CURSOR TRAIL (Fun decoration) =====
  let trailThrottle = 0;
  document.addEventListener('mousemove', (e) => {
    trailThrottle++;
    if (trailThrottle % 5 !== 0) return;

    const trail = document.createElement('div');
    trail.style.cssText = `
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: ${confettiColors[Math.floor(Math.random() * confettiColors.length)]};
      pointer-events: none;
      z-index: 9998;
      opacity: 0.6;
      transition: all 0.8s ease-out;
    `;
    document.body.appendChild(trail);

    requestAnimationFrame(() => {
      trail.style.transform = `translate(${(Math.random() - 0.5) * 30}px, ${(Math.random() - 0.5) * 30}px) scale(0)`;
      trail.style.opacity = '0';
    });

    setTimeout(() => trail.remove(), 1000);
  });

  // ===== TYPING EFFECT for hero subtitle (subtle) =====
  const heroSubtitle = document.querySelector('.hero-subtitle');
  if (heroSubtitle) {
    heroSubtitle.style.opacity = '0';
    setTimeout(() => {
      heroSubtitle.style.opacity = '';
    }, 600);
  }

  // ===== COUNTER ANIMATION for prices =====
  const priceElements = document.querySelectorAll('.package-price');
  const priceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const finalValue = parseInt(el.textContent);
        if (isNaN(finalValue)) return;
        
        const suffix = el.innerHTML.match(/<span>.*?<\/span>/)?.[0] || '';
        let current = 0;
        const increment = finalValue / 30;
        const timer = setInterval(() => {
          current += increment;
          if (current >= finalValue) {
            current = finalValue;
            clearInterval(timer);
          }
          el.innerHTML = Math.floor(current) + suffix;
        }, 30);
        
        priceObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  priceElements.forEach(el => priceObserver.observe(el));

  // ===== PARALLAX HERO =====
  window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
      const scrolled = window.pageYOffset;
      const heroContent = document.querySelector('.hero-content');
      if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
        heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));
      }
    }
  });

  // ===== RANDOM FUN FACT TOOLTIP ON LOGO =====
  const logo = document.getElementById('nav-logo');
  const funFacts = [
    '🎉 Zabava bez granica!',
    '🫧 Igraj, uživaj, ponavljaj!',
    '🎂 Najbolji rođendani ikada!',
    '☕ Opustite se, mi brinemo!',
    '💖 Srce uz srce!',
    '🎈 Dečija radost na delu!'
  ];

  if (logo) {
    logo.addEventListener('mouseenter', () => {
      const fact = funFacts[Math.floor(Math.random() * funFacts.length)];
      logo.title = fact;
    });
  }

});
