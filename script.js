// Scroll-triggered reveal animations
(function() {
    'use strict';

    // Add .reveal class to scroll-animated elements
    const targets = [
        '.hero__kicker',
        '.hero__title-line',
        '.hero__lede',
        '.hero__meta',
        '.hero__portrait-frame',
        '.section__head',
        '.about__pullquote',
        '.about__text',
        '.about__dream',
        '.timeline__item',
        '.role-card',
        '.military__meta-item',
        '.edu-item',
        '.skill-block',
        '.contact__kicker',
        '.contact__title',
        '.contact__sub',
        '.cta-btn'
    ];

    targets.forEach(sel => {
        document.querySelectorAll(sel).forEach((el, i) => {
            el.classList.add('reveal');
            if (i % 3 === 1) el.classList.add('reveal--delay-1');
            if (i % 3 === 2) el.classList.add('reveal--delay-2');
        });
    });

    // Hero elements appear immediately (no scroll needed)
    const heroEls = document.querySelectorAll(
        '.hero__kicker, .hero__title-line, .hero__lede, .hero__meta, .hero__portrait-frame'
    );
    heroEls.forEach((el, i) => {
        setTimeout(() => el.classList.add('is-visible'), 100 + i * 120);
    });

    // IntersectionObserver for other elements
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                io.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -60px 0px'
    });

    document.querySelectorAll('.reveal').forEach(el => {
        if (!el.classList.contains('is-visible')) io.observe(el);
    });

    // Subtle parallax on hero portrait
    const portrait = document.querySelector('.hero__portrait-img');
    if (portrait && window.matchMedia('(min-width: 900px)').matches) {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const y = window.scrollY;
                    if (y < 800) {
                        portrait.style.transform = `translateY(${y * 0.08}px) scale(1.02)`;
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // Top bar shadow on scroll
    const topBar = document.querySelector('.top-bar');
    if (topBar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                topBar.style.boxShadow = '0 8px 24px -16px rgba(20, 17, 15, 0.25)';
            } else {
                topBar.style.boxShadow = 'none';
            }
        }, { passive: true });
    }
})();
