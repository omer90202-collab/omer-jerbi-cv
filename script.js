// ============================================
// REVEAL ON SCROLL
// ============================================
(function() {
    'use strict';

    const targets = [
        { sel: '.hero__portrait', extra: ['reveal--scale'] },
        { sel: '.hero__label', extra: ['reveal--delay-1'] },
        { sel: '.hero__title', extra: ['reveal--delay-2'] },
        { sel: '.hero__role', extra: ['reveal--delay-3'] },
        { sel: '.hero__meta', extra: ['reveal--delay-4'] },
        { sel: '.section__head' },
        { sel: '.about__text' },
        { sel: '.timeline__item' },
        { sel: '.role' },
        { sel: '.military__meta' },
        { sel: '.edu-list__item' },
        { sel: '.skill-block' },
        { sel: '.contact__btn' }
    ];

    targets.forEach(({ sel, extra = [] }) => {
        document.querySelectorAll(sel).forEach((el, i) => {
            el.classList.add('reveal', ...extra);
            // small auto-stagger within groups of similar siblings
            if (sel === '.timeline__item' || sel === '.role' || sel === '.edu-list__item' ||
                sel === '.skill-block' || sel === '.contact__btn') {
                const delayIdx = (i % 3) + 1;
                el.classList.add(`reveal--delay-${delayIdx}`);
            }
        });
    });

    // Hero loads immediately
    const heroEls = document.querySelectorAll(
        '.hero__portrait, .hero__label, .hero__title, .hero__role, .hero__meta'
    );
    heroEls.forEach((el) => {
        requestAnimationFrame(() => el.classList.add('is-visible'));
    });

    // Observer for the rest
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.14, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.reveal').forEach(el => {
        if (!el.classList.contains('is-visible')) io.observe(el);
    });
})();

// ============================================
// TOP BAR SHADOW
// ============================================
(function() {
    const topBar = document.querySelector('.top-bar');
    if (!topBar) return;
    const onScroll = () => {
        topBar.classList.toggle('is-scrolled', window.scrollY > 12);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
})();

// ============================================
// SUBTLE PORTRAIT PARALLAX
// ============================================
(function() {
    const img = document.querySelector('.hero__portrait-img');
    if (!img || !window.matchMedia('(min-width: 800px)').matches) return;
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const y = window.scrollY;
                if (y < 700) {
                    img.style.transform = `translateY(${y * 0.04}px) scale(1.01)`;
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
})();
