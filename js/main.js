/* ==========================================================================
   PERUMATTY SERVICE CO-OPERATIVE BANK LTD. - CORE SCRIPTS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initStickyNavbar();
    initMobileMenu();
    initHeroCarousel();
    initScrollReveal();
    initStatsCounter();
    initEnquiryModal();
    initLightbox();
});

/* --------------------------------------------------------------------------
   1. STICKY NAVBAR LOGIC
   -------------------------------------------------------------------------- */
function initStickyNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const checkScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Run once on load
}

/* --------------------------------------------------------------------------
   2. MOBILE HAMBURGER MENU & DROPDOWN TOGGLES
   -------------------------------------------------------------------------- */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const dropdownItems = document.querySelectorAll('.nav-item.dropdown');

    if (!hamburger || !navMenu) return;

    // Toggle menu
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Hamburger animation helper
        const spans = hamburger.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Mobile dropdown toggle
    dropdownItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault(); // Prevent navigation on mobile tap
                item.classList.toggle('dropdown-active');
            }
        });
    });

    // Close mobile menu on clicking any normal nav link
    const navLinks = document.querySelectorAll('.nav-link:not(.dropdown > .nav-link), .dropdown-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
                dropdownItems.forEach(item => item.classList.remove('dropdown-active'));
            }
        });
    });
}

/* --------------------------------------------------------------------------
   3. AUTOMATIC HERO CAROUSEL
   -------------------------------------------------------------------------- */
function initHeroCarousel() {
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length <= 1) return;

    let currentSlide = 0;
    const slideInterval = 4500; // 4.5 seconds per slide
    let intervalId;

    const nextSlide = () => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    };

    const startCarousel = () => {
        intervalId = setInterval(nextSlide, slideInterval);
    };

    const pauseCarousel = () => {
        clearInterval(intervalId);
    };

    // Auto start
    startCarousel();

    // Pause on hover for premium user experience
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mouseenter', pauseCarousel);
        hero.addEventListener('mouseleave', startCarousel);
    }
}

/* --------------------------------------------------------------------------
   4. SCROLL REVEAL (FADE-IN ANIMATION)
   -------------------------------------------------------------------------- */
function initScrollReveal() {
    const revealItems = document.querySelectorAll('.reveal');
    if (revealItems.length === 0) return;

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Unobserve after showing to maintain performance
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealItems.forEach(item => {
        revealObserver.observe(item);
    });
}

/* --------------------------------------------------------------------------
   5. STATS NUMBER COUNT-UP ANIMATION
   -------------------------------------------------------------------------- */
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length === 0) return;

    const countUp = (el) => {
        const target = parseFloat(el.getAttribute('data-target'));
        const decimals = parseInt(el.getAttribute('data-decimals') || '0');
        const duration = 2000; // 2 seconds animation
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            // Ease out quad function
            const easeProgress = progress * (2 - progress);
            const currentVal = easeProgress * target;
            
            if (decimals > 0) {
                el.textContent = currentVal.toFixed(decimals);
            } else {
                el.textContent = Math.floor(currentVal).toLocaleString('en-IN');
            }

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Formatting clean final values
                if (decimals > 0) {
                    el.textContent = target.toFixed(decimals);
                } else {
                    el.textContent = target.toLocaleString('en-IN');
                }
            }
        };

        requestAnimationFrame(animate);
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                countUp(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    statNumbers.forEach(num => {
        statsObserver.observe(num);
    });
}

/* --------------------------------------------------------------------------
   6. FLOATING ENQUIRY MODAL / SIDEBAR PANEL
   -------------------------------------------------------------------------- */
function initEnquiryModal() {
    const openBtns = document.querySelectorAll('.trigger-enquiry');
    const modal = document.getElementById('enquiryModal');
    const closeBtn = document.querySelector('.enquiry-close');
    const form = document.getElementById('enquiryForm');

    if (!modal) return;

    const openModal = (e) => {
        if (e) e.preventDefault();
        
        // Pre-select service dropdown if a context service was passed
        const serviceDropdown = document.getElementById('enquiryService');
        if (serviceDropdown && e && e.currentTarget.getAttribute('data-service')) {
            serviceDropdown.value = e.currentTarget.getAttribute('data-service');
        }
        
        modal.style.display = 'block';
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        document.body.style.overflow = 'hidden'; // Disable background scrolling
    };

    const closeModal = () => {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 400);
        document.body.style.overflow = ''; // Enable background scrolling
    };

    openBtns.forEach(btn => btn.addEventListener('click', openModal));
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Form submission simulation
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get values
            const name = document.getElementById('enquiryName').value;
            const phone = document.getElementById('enquiryPhone').value;
            const service = document.getElementById('enquiryService').value;
            
            // Show premium success feedback
            alert(`Thank you, ${name}! Your enquiry about "${service}" has been simulated successfully. In production, this can be integrated with your email gateway or backend API. We will contact you at ${phone}.`);
            
            form.reset();
            closeModal();
        });
    }
}

/* --------------------------------------------------------------------------
   7. GALLERY LIGHTBOX
   -------------------------------------------------------------------------- */
function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    
    if (!lightbox) return;

    const img = lightbox.querySelector('img');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const caption = lightbox.querySelector('.lightbox-caption');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const itemImg = item.querySelector('img');
            const itemCaption = item.querySelector('.gallery-item-hover').textContent;
            
            if (itemImg) {
                img.src = itemImg.src;
                caption.textContent = itemCaption || 'Perumatty Bank Gallery';
                
                lightbox.style.display = 'flex';
                setTimeout(() => {
                    lightbox.classList.add('active');
                }, 10);
                document.body.style.overflow = 'hidden';
            }
        });
    });

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        setTimeout(() => {
            lightbox.style.display = 'none';
            img.src = ''; // Clear image src
        }, 300);
        document.body.style.overflow = '';
    };

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
            closeLightbox();
        }
    });
}
