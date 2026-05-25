document.addEventListener('DOMContentLoaded', () => {

    // --- Header Scroll Effect ---
    const header = document.getElementById('mainHeader');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const burger = document.getElementById('menuBurger');
    const mobileMenu = document.getElementById('mobileMenu');
    
    function toggleMobileMenu() {
        mobileMenu.classList.toggle('active');
        burger.classList.toggle('active');
        // Toggle body scroll to prevent scrolling when menu is open
        if (mobileMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
            burger.children[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            burger.children[1].style.opacity = '0';
            burger.children[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            document.body.style.overflow = '';
            burger.children[0].style.transform = '';
            burger.children[1].style.opacity = '1';
            burger.children[2].style.transform = '';
        }
    }

    burger.addEventListener('click', toggleMobileMenu);

    // Close mobile menu when clicking any nav link
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    // --- Active Link on Scroll ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // --- Menu Tab Switching ---
    const tabButtons = document.querySelectorAll('.menu-tab-btn');
    const menuContainers = document.querySelectorAll('.menu-container');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from buttons
            tabButtons.forEach(b => b.classList.remove('active'));
            // Add active to clicked button
            btn.classList.add('active');

            // Hide all containers
            menuContainers.forEach(container => container.classList.remove('active'));
            // Show corresponding container
            const tabId = btn.getAttribute('data-tab');
            const targetContainer = document.getElementById(`menu-${tabId}`);
            if (targetContainer) {
                targetContainer.classList.add('active');
            }
        });
    });

    // --- Locations and Interactive Maps ---
    const locationCards = document.querySelectorAll('.location-card');
    const mapIframes = document.querySelectorAll('.map-iframe-container');

    locationCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove active classes
            locationCards.forEach(c => c.classList.remove('active'));
            mapIframes.forEach(iframe => iframe.classList.remove('active'));

            // Add active to clicked card
            card.classList.add('active');

            // Show corresponding map iframe
            const locationId = card.getAttribute('data-location');
            const targetMap = document.getElementById(`map-${locationId}`);
            if (targetMap) {
                targetMap.classList.add('active');
            }
        });
    });

    // --- Instagram Gallery Lightbox ---
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('instagramLightbox');
    const lightboxImg = document.getElementById('lightboxImage');
    const lightboxLikes = document.getElementById('lightboxLikes');
    const lightboxComments = document.getElementById('lightboxComments');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');

    // Instagram feed mock database corresponding to gallery items
    const instaPostsData = {
        '1': {
            imgSrc: 'images/626817811_18193173385349452_6357842395490520308_n.webp',
            likes: '254',
            comments: '12',
            caption: 'The Cups kafeterija. Mesto za opuštanje, rad i vrhunski espresso u Zemunu. Otkrijte bogatstvo aroma u našoj šoljici kafe. ☕️✨ #specialtycoffee #thecups #kafa #zemun'
        },
        '2': {
            imgSrc: 'images/621814526_18095001296502693_6399491967812910853_n.webp',
            likes: '198',
            comments: '8',
            caption: 'Savršen septembarski dan počinje uz našu svežu specialty kafu. Dođite u Cvijićevu i osigurajte svoju dozu dnevne inspiracije. 💻☕️ #coffeelovers #laptopfriendly #beograd'
        },
        '3': {
            imgSrc: 'images/620831197_18040499486724817_7115376563292380548_n.webp',
            likes: '312',
            comments: '15',
            caption: 'Umetnost u šoljici. Naši baristi posvećuju pažnju svakom detalju, od mlevenja zrna do završnog latte arta. Uživajte u remek-delu! 🎨🥛 #latteart #cappuccino #baristalife'
        },
        '4': {
            imgSrc: 'images/623294691_18038352626746036_29952235356771380_n.webp',
            likes: '210',
            comments: '6',
            caption: 'The Cups Zemun. Savršen miran kutak za laptop, čitanje knjige ili opušten razgovor uz najfiniju kafu. Dobrodošli! 💻🐶 #petfriendly #specialtycoffee #remotework'
        },
        '5': {
            imgSrc: 'images/622490960_18095121289745948_8134343041945735180_n.webp',
            likes: '175',
            comments: '4',
            caption: 'U žurbi ste? Coffee-to-go u prepoznatljivim šoljama za brz i dinamičan početak radnog dana u gradu. 🏃‍♂️☕️ #coffeetogo #espresso #onthego'
        },
        '6': {
            imgSrc: 'images/620992489_18053923109417923_6972068999538557706_n.webp',
            likes: '220',
            comments: '9',
            caption: 'Naš pet friendly kutak je uvek otvoren za vas i vaše najdraže krznene drugare. Čekamo vas u Robocafe-u! 🐕❤️ #petfriendly #robocafe #dogsofinstagram'
        },
        '7': {
            imgSrc: 'images/620808637_18077925191364013_8805922565864350266_n.webp',
            likes: '245',
            comments: '11',
            caption: 'Sveže pečeni kroasani sa otopljenom čokoladom i kremasti kapućino – naša jutarnja tradicija i vaš omiljeni ritual. 🥐☕️ #breakfast #cappuccino #croissant'
        },
        '8': {
            imgSrc: 'images/622123982_18056461400361267_4461055886552737008_n.webp',
            likes: '189',
            comments: '5',
            caption: 'Spremamo svaku šolju specialty kafe sa puno ljubavi i strasti za vas. Hvala Vam na poverenju i svakom zajedničkom osmehu! ❤️☕️ #thecupsfamily #coffeetime'
        }
    };

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const itemId = item.getAttribute('data-id');
            const data = instaPostsData[itemId];
            if (data) {
                lightboxImg.src = data.imgSrc;
                lightboxLikes.textContent = data.likes;
                lightboxComments.textContent = data.comments;
                lightboxCaption.textContent = data.caption;
                
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        if (!mobileMenu.classList.contains('active')) {
            document.body.style.overflow = '';
        }
    }

    lightboxClose.addEventListener('click', closeLightbox);

    // Close lightbox on click outside the image container/details area (on the black background)
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close lightbox on Esc key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // --- Booking / Reservation Form ---
    const reservationForm = document.getElementById('reservationForm');
    const submitBtn = document.getElementById('submitBtn');
    const successModalOverlay = document.getElementById('successModalOverlay');
    const successModalCloseBtn = document.getElementById('successModalCloseBtn');

    // Date restrictions: Disable past dates in date picker
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
        dateInput.value = today;
    }

    // Default time set to nearest hour or reasonable slot (10:00)
    const timeInput = document.getElementById('time');
    if (timeInput) {
        timeInput.value = "10:00";
    }

    if (reservationForm) {
        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Form data retrieval
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const location = document.getElementById('location').value;
            const guests = document.getElementById('guests').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const purpose = document.getElementById('purpose').value;
            const notes = document.getElementById('notes').value;

            // Change button state to loading
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            submitBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spinner" style="animation: spin 1s linear infinite; margin-right: 8px;">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 2v4"/>
                </svg>
                Slanje u toku...
            `;

            // CSS spin animation injector for the loader inside JS
            if (!document.getElementById('spinStyle')) {
                const style = document.createElement('style');
                style.id = 'spinStyle';
                style.innerHTML = `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`;
                document.head.appendChild(style);
            }

            // Simulate server network response
            setTimeout(() => {
                // Reset button state
                submitBtn.disabled = false;
                submitBtn.style.opacity = '';
                submitBtn.textContent = originalBtnText;

                // Open confirmation success modal overlay
                successModalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';

                // Reset form fields
                reservationForm.reset();
                if (dateInput) {
                    const today = new Date().toISOString().split('T')[0];
                    dateInput.value = today;
                }
                if (timeInput) {
                    timeInput.value = "10:00";
                }
            }, 1500);
        });
    }

    // Close Success Modal
    if (successModalCloseBtn && successModalOverlay) {
        successModalCloseBtn.addEventListener('click', () => {
            successModalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        successModalOverlay.addEventListener('click', (e) => {
            if (e.target === successModalOverlay) {
                successModalOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});
