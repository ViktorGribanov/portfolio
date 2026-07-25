document.addEventListener('DOMContentLoaded', () => {

    // Mobile menu toggle
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('open');
        });
        nav.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', () => nav.classList.remove('open'));
        });
    }

    // Header shadow on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        header.style.boxShadow = window.scrollY > 20
            ? '0 2px 24px rgba(0,0,0,0.06)'
            : 'none';
    }, { passive: true });

    // Animate stats on scroll
    const stats = document.querySelectorAll('.stat__number');
    const animateValue = (el, end) => {
        const duration = 1200;
        const start = 0;
        const startTime = performance.now();
        const isPercent = el.textContent.includes('%');
        const suffix = isPercent ? '%' : '+';
        const numEnd = parseInt(end, 10);

        const step = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(start + (numEnd - start) * eased);
            el.textContent = current + suffix;
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                animateValue(el, el.textContent.replace(/[^0-9]/g, ''));
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(s => observer.observe(s));

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Contact form → mailto
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            if (!name || !email || !message) return;
            const subject = encodeURIComponent('Сообщение с сайта от ' + name);
            const body = encodeURIComponent('Имя: ' + name + '\nEmail: ' + email + '\n\nСообщение:\n' + message);
            window.location.href = 'mailto:gribanoviktor@gmail.com?subject=' + subject + '&body=' + body;
        });
    }

});
