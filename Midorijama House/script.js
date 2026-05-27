/* ============================================
   MIDORIJAMA HOUSE — JavaScript
   Interactions, animations & functionality
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ─── Navigation Scroll Effect ───
    const navbar = document.getElementById('navbar');

    const handleNavScroll = () => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();

    // ─── Mobile Navigation Toggle ───
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile nav on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ─── Scroll Reveal Animations ───
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ─── Active Navigation Highlight ───
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = navLinks.querySelectorAll('a:not(.nav-cta)');

    const highlightNav = () => {
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinksAll.forEach(link => {
                    link.style.color = '';
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.style.color = 'var(--color-accent)';
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', highlightNav, { passive: true });

    // ─── Gallery Lightbox ───
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    const galleryImages = [
        'images/midorijama-6.jpg',
        'images/midorijama-2.jpg',
        'images/midorijama-4.jpg',
        'images/midorijama-5.jpg',
        'images/midorijama-10.jpg',
        'images/midorijama-11.jpg'
    ];

    let currentGalleryIndex = 0;

    const openLightbox = (index) => {
        currentGalleryIndex = index;
        lightboxImg.src = galleryImages[index];
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };

    const navigateGallery = (direction) => {
        currentGalleryIndex = (currentGalleryIndex + direction + galleryImages.length) % galleryImages.length;
        lightboxImg.style.opacity = '0';
        setTimeout(() => {
            lightboxImg.src = galleryImages[currentGalleryIndex];
            lightboxImg.style.opacity = '1';
        }, 200);
    };

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const index = parseInt(item.getAttribute('data-gallery'));
            openLightbox(index);
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', () => navigateGallery(-1));
    lightboxNext.addEventListener('click', () => navigateGallery(1));

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateGallery(-1);
        if (e.key === 'ArrowRight') navigateGallery(1);
    });

    // Add smooth transition to lightbox img
    lightboxImg.style.transition = 'opacity 0.2s ease';

    // ─── FAQ Accordion ───
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all FAQ items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
                otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });

            // Open clicked item if it was closed
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // ─── Testimonials Slider ───
    const testimonials = [
        {
            text: "Midorijama je bila savršen izbor za rođendan našeg sina! Deca su uživala u trampolini i toboganu, a mi smo mirno sedeli na terasi. Sve je bilo organizovano do poslednjeg detalja.",
            author: "Jelena M.",
            event: "Dečiji rođendan — Jun 2025"
        },
        {
            text: "Organizovali smo žurku za 30. rođendan i bilo je fenomenalno. Bioskop na otvorenom uveče je bio highlight — kao privatni bioskop pod zvezdama!",
            author: "Marko S.",
            event: "Žurka — Avgust 2025"
        },
        {
            text: "Preporučujemo svima! Prostor je prelep, dvorište ogromno, a lampioni želja su učinili veče potpuno magičnim. Domaćini su fantastični i veoma fleksibilni.",
            author: "Ana & Stefan",
            event: "Proslava godišnjice — Septembar 2025"
        },
        {
            text: "Koristili smo Midorijamu za team building i ceo tim je bio oduševljen. Roštilj, igre na travi i filmsko veče — sve na jednom mestu. Definitivno se vraćamo!",
            author: "IT kompanija Nova",
            event: "Team building — Oktobar 2025"
        }
    ];

    const testimonialText = document.getElementById('testimonialText');
    const testimonialAuthor = document.getElementById('testimonialAuthor');
    const testimonialEvent = document.getElementById('testimonialEvent');
    const testimonialDots = document.getElementById('testimonialDots');

    let currentTestimonial = 0;

    // Create dots
    testimonials.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.classList.add('testimonial-dot');
        if (i === 0) dot.classList.add('active');
        dot.setAttribute('aria-label', `Utisak ${i + 1}`);
        dot.addEventListener('click', () => goToTestimonial(i));
        testimonialDots.appendChild(dot);
    });

    const updateTestimonial = (index) => {
        const t = testimonials[index];
        testimonialText.textContent = t.text;
        testimonialAuthor.textContent = t.author;
        testimonialEvent.textContent = t.event;

        // Update dots
        testimonialDots.querySelectorAll('.testimonial-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    };

    const goToTestimonial = (index) => {
        currentTestimonial = index;
        const slide = document.getElementById('testimonialSlide');
        slide.style.opacity = '0';
        slide.style.transform = 'translateY(10px)';

        setTimeout(() => {
            updateTestimonial(index);
            slide.style.opacity = '1';
            slide.style.transform = 'translateY(0)';
        }, 300);
    };

    // Add transition to testimonial slide
    const testimonialSlide = document.getElementById('testimonialSlide');
    testimonialSlide.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

    // Initialize first testimonial
    updateTestimonial(0);

    // Auto-rotate testimonials
    let testimonialInterval = setInterval(() => {
        const nextIndex = (currentTestimonial + 1) % testimonials.length;
        goToTestimonial(nextIndex);
    }, 6000);

    // Pause auto-rotation on hover
    const sliderEl = document.querySelector('.testimonials-slider');
    sliderEl.addEventListener('mouseenter', () => clearInterval(testimonialInterval));
    sliderEl.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(() => {
            const nextIndex = (currentTestimonial + 1) % testimonials.length;
            goToTestimonial(nextIndex);
        }, 6000);
    });

    // ─── Smooth Scroll for Anchor Links ───
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ─── Parallax on Hero Background ───
    const heroBg = document.querySelector('.hero-bg img');

    if (heroBg && window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY;
            if (scrollPos < window.innerHeight) {
                heroBg.style.transform = `scale(${1.05 + scrollPos * 0.0002}) translateY(${scrollPos * 0.15}px)`;
            }
        }, { passive: true });
    }

});

// ─── Contact Form Handler ───
function handleFormSubmit(e) {
    e.preventDefault();

    const btn = document.getElementById('formSubmitBtn');
    const originalText = btn.textContent;

    // Simulate form submission
    btn.textContent = 'Šalje se...';
    btn.style.opacity = '0.7';
    btn.disabled = true;

    setTimeout(() => {
        btn.textContent = '✓ Upit je poslat!';
        btn.style.opacity = '1';
        btn.style.background = '#31A24C';

        // Construct mailto link
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const date = document.getElementById('date').value;
        const packageType = document.getElementById('package').value;
        const guests = document.getElementById('guests').value;
        const eventType = document.getElementById('eventType').value;
        const message = document.getElementById('message').value;

        const subject = encodeURIComponent(`Upit za rezervaciju — ${name}`);
        const body = encodeURIComponent(
            `Ime: ${name}\n` +
            `Email: ${email}\n` +
            `Telefon: ${phone}\n` +
            `Željeni datum: ${date}\n` +
            `Paket: ${packageType}\n` +
            `Broj gostiju: ${guests}\n` +
            `Vrsta proslave: ${eventType}\n` +
            `\nPoruka:\n${message}`
        );

        window.location.href = `mailto:midorijamahouse@gmail.com?subject=${subject}&body=${body}`;

        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.disabled = false;
            e.target.reset();
        }, 3000);
    }, 1200);
}
