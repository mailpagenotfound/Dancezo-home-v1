import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  // Check if we are on the workshops page
  const list = document.querySelector('.workshops-list');
  if (!list) return;

  // --- 1. CURTAIN STYLE REVEAL FOR UPCOMING CARDS ---
  const cards = document.querySelectorAll('.upcoming-workshop-card');
  cards.forEach(card => {
    const curtain = card.querySelector('.curtain-bg-overlay');
    if (curtain) {
      // Set initial state: curtain covers the card (translateY: 0)
      gsap.set(curtain, { yPercent: 0 });
      
      // Animate: pull the curtain up (translateY: -100%) when visible
      gsap.to(curtain, {
        yPercent: -100,
        duration: 1.6,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
    }

    // Hover card offset
    card.addEventListener('mouseenter', () => {
      gsap.to(card, { y: -8, duration: 0.4, ease: 'power2.out' });
      card.style.borderColor = 'rgba(245, 196, 107, 0.25)';
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { y: 0, duration: 0.4, ease: 'power2.out' });
      card.style.borderColor = 'rgba(212, 175, 55, 0.08)';
    });
  });

  // --- 2. INFINITE CINEMATIC HORIZONTAL GALLERY LOOP ---
  const gallery = document.getElementById('horizontal-gallery');
  if (gallery) {
    // Linear infinite translation
    const loop = gsap.to(gallery, {
      xPercent: -50, // Slides are duplicated, so translate by half of width
      duration: 35,
      ease: 'none',
      repeat: -1
    });

    // Pause on hover
    gallery.addEventListener('mouseenter', () => {
      gsap.to(loop, { timeScale: 0.15, duration: 0.8 }); // Slow down
    });
    gallery.addEventListener('mouseleave', () => {
      gsap.to(loop, { timeScale: 1, duration: 0.8 }); // Resume normal speed
    });
  }
});
