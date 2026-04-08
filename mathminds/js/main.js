// MathMinds — Main JavaScript

document.addEventListener('DOMContentLoaded', () => {

    // ===== Nav: auto-hide on scroll =====
    const navbar = document.querySelector('.navbar');
    let lastScrollY = 0;
    let ticking = false;

    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > 80 && currentScrollY > lastScrollY) {
            navbar.classList.add('navbar--hidden');
        } else {
            navbar.classList.remove('navbar--hidden');
        }
        lastScrollY = currentScrollY;
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(handleScroll);
            ticking = true;
        }
    }, { passive: true });

    // ===== Mobile nav =====
    const hamburger = document.querySelector('.nav-hamburger');
    const overlay = document.querySelector('.nav-overlay');

    if (hamburger && overlay) {
        hamburger.addEventListener('click', () => {
            const isOpen = overlay.classList.contains('is-open');
            overlay.classList.toggle('is-open');
            hamburger.classList.toggle('is-active');
            document.body.style.overflow = isOpen ? '' : 'hidden';
        });

        overlay.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                overlay.classList.remove('is-open');
                hamburger.classList.remove('is-active');
                document.body.style.overflow = '';
            });
        });
    }

    // ===== Hero word reveal =====
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const words = heroTitle.querySelectorAll('.word-inner');
        words.forEach((word, i) => {
            setTimeout(() => {
                word.classList.add('revealed');
            }, 100 + i * 80);
        });

        // Reveal subtitle and buttons after words
        const delay = 100 + words.length * 80 + 200;
        setTimeout(() => {
            document.querySelector('.hero-subtitle')?.classList.add('revealed');
            document.querySelector('.hero-buttons')?.classList.add('revealed');
        }, delay);
    }

    // ===== Glow card mouse tracking =====
    document.querySelectorAll('.glow-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
            card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        });
    });

    // ===== Stat counter animation =====
    const statValues = document.querySelectorAll('[data-count]');
    let statsAnimated = false;

    const animateCounters = () => {
        if (statsAnimated) return;
        statsAnimated = true;

        statValues.forEach(el => {
            const target = parseInt(el.getAttribute('data-count'), 10);
            const duration = 2000;
            const start = performance.now();

            const update = (now) => {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.round(eased * target);
                if (progress < 1) requestAnimationFrame(update);
            };

            requestAnimationFrame(update);
        });
    };

    const statsSection = document.getElementById('stats-section');
    if (statsSection) {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                animateCounters();
                observer.disconnect();
            }
        }, { threshold: 0.3 });
        observer.observe(statsSection);
    }

    // ===== Scroll reveal =====
    const revealElements = document.querySelectorAll('.reveal-up');

    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Stagger siblings that are visible at the same time
                    const delay = entry.target.dataset.delay || 0;
                    setTimeout(() => {
                        entry.target.classList.add('is-visible');
                    }, delay);
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach((el, i) => {
            revealObserver.observe(el);
        });
    }

    // ===== Active nav link =====
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a, .nav-overlay-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
});
