// Photo slider switching
let currentSlide = 0;
let slideInterval;
let autoSlidePaused = false;
let autoSlideTimeout;

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    currentSlide = index;
  }
  
  function prevSlide() {
    showSlide(currentSlide - 1);
    pauseAutoSlide();
  }
  
  function nextSlide() {
    showSlide(currentSlide + 1);
    pauseAutoSlide();
  }
  
  function startAutoSlide() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
      if (isSliderInView() && !autoSlidePaused) {
        showSlide(currentSlide + 1);
      }
    }, 3500);
  }
  
  function pauseAutoSlide() {
    autoSlidePaused = true;
    clearTimeout(autoSlideTimeout);
    clearInterval(slideInterval);
    autoSlideTimeout = setTimeout(() => {
      autoSlidePaused = false;
      if (isSliderInView()) {
        startAutoSlide();
      }
    }, 5000);
  }
  
  function isSliderInView() {
    const slider = document.querySelector('.slider');
    if (!slider) return false;
    const rect = slider.getBoundingClientRect();
    return (
      rect.top < window.innerHeight &&
      rect.bottom > 0
    );
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    showSlide(0);
    startAutoSlide();
    // Reveal effects (expand if needed)
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
  
    reveals.forEach(reveal => observer.observe(reveal));
  });
  
  window.addEventListener('scroll', () => {
    if (isSliderInView() && !autoSlidePaused) {
      startAutoSlide();
    } else {
      clearInterval(slideInterval);
    }
  });
  
  // Sticky nav on scroll
  function handleStickyNav() {
    const nav = document.querySelector('.main-nav');
    const navOffset = nav.offsetTop;
    if (window.scrollY > navOffset) {
      nav.classList.add('sticky-nav');
    } else {
      nav.classList.remove('sticky-nav');
    }
  }
  window.addEventListener('scroll', handleStickyNav);
  window.addEventListener('DOMContentLoaded', handleStickyNav);
  