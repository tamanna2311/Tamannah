document.addEventListener('DOMContentLoaded', () => {

    // 1. Scroll Animations (Fade-in)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));


    // 2. Smooth Scroll for Button
    const scrollBtn = document.getElementById('scroll-btn');
    if (scrollBtn) {
        scrollBtn.addEventListener('click', () => {
            const gallerySection = document.getElementById('gallery');
            gallerySection.scrollIntoView({ behavior: 'smooth' });
        });
    }


    // 3. Floating Particles (Sparkles/Hearts)
    const particleContainer = document.getElementById('floating-particles');
    const particleCount = 20; // Number of particles

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 5 + 2; // Random size between 2px and 7px
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        particle.style.left = `${Math.random() * 100}vw`; // Random horizontal position
        particle.style.animationDuration = `${Math.random() * 10 + 10}s`; // Random duration 10-20s
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


    // 4. Lightbox Functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const galleryItems = document.querySelectorAll('.gallery-item img');

    let currentIndex = 0;

    function openLightbox(index) {
        if (!lightbox) return;
        currentIndex = index;
        lightboxImg.src = galleryItems[currentIndex].src;
        lightbox.style.display = 'flex';
        // Small delay to allow display flex to apply before opacity transition
        setTimeout(() => lightbox.classList.add('show'), 10);
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('show');
        setTimeout(() => {
            lightbox.style.display = 'none';
        }, 300);
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        lightboxImg.src = galleryItems[currentIndex].src;
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        lightboxImg.src = galleryItems[currentIndex].src;
    }

    // Event Listeners for Gallery
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            openLightbox(index);
        });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });
    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });

    // Close on clicking outside image
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox && lightbox.style.display === 'flex') {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
        }
    });

});
