document.addEventListener('DOMContentLoaded', () => {

    // 1. Scroll Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Watch all diverse animation elements
    const animatedElements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => observer.observe(el));


    // 2. Smooth Scroll for Button
    const scrollBtn = document.getElementById('scroll-btn');
    if (scrollBtn) {
        scrollBtn.addEventListener('click', () => {
            const firstSection = document.getElementById('journey');
            if (firstSection) firstSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // 3. Floating Particles
    const particleContainer = document.getElementById('floating-particles');
    const particleCount = 25;

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 6 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.animationDuration = `${Math.random() * 15 + 10}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;

        if (particleContainer) {
            particleContainer.appendChild(particle);
        }
    }

    if (particleContainer) {
        for (let i = 0; i < particleCount; i++) {
            createParticle();
        }
    }

    // 4. Simple Lightbox (Just for zoom interaction)
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close');
    const images = document.querySelectorAll('.moment-image img');

    function openLightbox(src) {
        if (!lightbox) return;
        lightboxImg.src = src;
        lightbox.style.display = 'flex';
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.style.display = 'none';
    }

    images.forEach(img => {
        img.addEventListener('click', () => openLightbox(img.src));
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display === 'flex') closeLightbox();
    });

});
