// Simple reveal-on-scroll
(function() {
    'use strict';

    const targets = [
        '.section__head',
        '.about__text',
        '.timeline__item',
        '.role',
        '.military__meta-item',
        '.edu-list__item',
        '.skill-block',
        '.contact__btn'
    ];

    targets.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => el.classList.add('reveal'));
    });

    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();
