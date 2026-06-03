// ============================================
// REVEAL ANIMATIONS
// ============================================
(function() {
    'use strict';

    const targets = [
        '.hero__kicker',
        '.hero__title-line',
        '.hero__rotator',
        '.hero__lede',
        '.hero__meta',
        '.hero__portrait',
        '.section__head',
        '.about__pullquote',
        '.about__text',
        '.about__dream',
        '.timeline__item',
        '.role-card',
        '.military__meta-item',
        '.edu-item',
        '.skill-block',
        '.stat',
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

    // Hero appears immediately
    const heroEls = document.querySelectorAll(
        '.hero__kicker, .hero__title-line, .hero__rotator, .hero__lede, .hero__meta, .hero__portrait'
    );
    heroEls.forEach((el, i) => {
        setTimeout(() => el.classList.add('is-visible'), 80 + i * 110);
    });

    // IntersectionObserver for the rest
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.reveal').forEach(el => {
        if (!el.classList.contains('is-visible')) io.observe(el);
    });
})();

// ============================================
// HERO ROTATOR
// ============================================
(function() {
    const words = document.querySelectorAll('.hero__rotator-word');
    if (words.length < 2) return;
    let idx = 0;
    setInterval(() => {
        words[idx].classList.remove('is-active');
        idx = (idx + 1) % words.length;
        words[idx].classList.add('is-active');
    }, 2200);
})();

// ============================================
// STAT NUMBER COUNT-UP
// ============================================
(function() {
    const stats = document.querySelectorAll('.stat__num[data-count]');
    if (!stats.length) return;

    const animate = (el) => {
        const target = parseInt(el.dataset.count, 10);
        const dur = 1400;
        const start = performance.now();
        const original = el.textContent;
        const suffix = original.includes('+') ? '+' : '';

        const tick = (now) => {
            const t = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            const val = Math.floor(target * eased);
            el.textContent = val.toLocaleString('en-US') + suffix;
            if (t < 1) requestAnimationFrame(tick);
            else el.textContent = original;
        };
        requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animate(entry.target);
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(el => io.observe(el));
})();

// ============================================
// PARALLAX ON PORTRAIT
// ============================================
(function() {
    const portrait = document.querySelector('.hero__portrait-img');
    if (!portrait || !window.matchMedia('(min-width: 900px)').matches) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const y = window.scrollY;
                if (y < 900) {
                    portrait.style.transform = `translateY(${y * 0.06}px) scale(1.02)`;
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
})();

// ============================================
// TOP BAR SHADOW ON SCROLL
// ============================================
(function() {
    const topBar = document.querySelector('.top-bar');
    if (!topBar) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            topBar.style.boxShadow = '0 12px 30px -18px rgba(0, 0, 0, 0.7)';
        } else {
            topBar.style.boxShadow = 'none';
        }
    }, { passive: true });
})();
