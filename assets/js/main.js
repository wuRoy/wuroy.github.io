/**
 * Main JavaScript for personal website
 * Handles navigation, scroll effects, and carousel
 */

(function() {
  'use strict';

  const header = document.getElementById('site-header');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  // Header scroll effect
  function handleScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  // Mobile navigation toggle
  function toggleNav() {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
  }

  // Close mobile nav when clicking a link
  function handleNavClick(e) {
    if (e.target.classList.contains('nav-link')) {
      navLinks.classList.remove('active');
      navToggle.classList.remove('active');
    }
  }

  // Carousel
  function setupCarousel() {
    const track = document.getElementById('carousel-track');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const dotsContainer = document.getElementById('carousel-dots');
    if (!track || !dotsContainer) return;

    const slides = track.querySelectorAll('.carousel-slide');
    const total = slides.length;
    if (total === 0) return;

    let current = 0;
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    let startTransform = 0;

    // Create dots
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.carousel-dot');

    function goTo(index) {
      if (index < 0) index = total - 1;
      if (index >= total) index = 0;
      current = index;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    if (prevBtn) prevBtn.addEventListener('click', prev);
    if (nextBtn) nextBtn.addEventListener('click', next);

    // Touch / mouse drag
    function onStart(x) {
      isDragging = true;
      startX = x;
      currentX = x;
      startTransform = -(current * 100);
      track.style.transition = 'none';
    }

    function onMove(x) {
      if (!isDragging) return;
      currentX = x;
      const delta = ((currentX - startX) / track.offsetWidth) * 100;
      track.style.transform = 'translateX(' + (startTransform + delta) + '%)';
    }

    function onEnd() {
      if (!isDragging) return;
      isDragging = false;
      track.style.transition = '';
      const delta = currentX - startX;
      const threshold = track.offsetWidth * 0.2;
      if (delta < -threshold) {
        next();
      } else if (delta > threshold) {
        prev();
      } else {
        goTo(current);
      }
    }

    track.addEventListener('touchstart', e => onStart(e.touches[0].clientX), { passive: true });
    track.addEventListener('touchmove', e => onMove(e.touches[0].clientX), { passive: true });
    track.addEventListener('touchend', onEnd);

    track.addEventListener('mousedown', e => {
      onStart(e.clientX);
      e.preventDefault();
    });
    window.addEventListener('mousemove', e => onMove(e.clientX));
    window.addEventListener('mouseup', onEnd);
  }

  // Initialize
  function init() {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    if (navToggle) {
      navToggle.addEventListener('click', toggleNav);
    }
    if (navLinks) {
      navLinks.addEventListener('click', handleNavClick);
    }

    setupCarousel();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
