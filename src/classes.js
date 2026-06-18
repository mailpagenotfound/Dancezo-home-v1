import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  // Check if we are on the classes page
  const cardGrid = document.querySelector('.cards-grid');
  if (!cardGrid) return;

  // --- 1. CLASS STAGE CARDS STAGGER ENTRANCE ---
  const stageCards = document.querySelectorAll('.class-stage-card');
  stageCards.forEach((card, index) => {
    gsap.set(card, { opacity: 0, y: 40 });
    
    gsap.to(card, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      delay: index * 0.15,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: cardGrid,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });

    // Subtly float cards on hover
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px)';
      card.style.borderColor = 'rgba(245, 196, 107, 0.3)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
      card.style.borderColor = 'rgba(212, 175, 55, 0.08)';
    });
  });

  // --- 2. SCHEDULE TABLE ROW HOVER HIGHLIGHTS ---
  const rows = document.querySelectorAll('.schedule-row');
  rows.forEach(row => {
    row.addEventListener('mouseenter', () => {
      // Highlight hovered row and dim all other sibling rows
      rows.forEach(r => {
        if (r !== row) {
          r.style.opacity = '0.35';
        } else {
          r.style.backgroundColor = 'rgba(212, 175, 55, 0.04)';
        }
      });
    });

    row.addEventListener('mouseleave', () => {
      // Restore default states
      rows.forEach(r => {
        r.style.opacity = '1';
        r.style.backgroundColor = 'transparent';
      });
    });
  });

  // --- 3. BENEFITS COUNTERS/ICONS FADE IN ---
  const benefits = document.querySelectorAll('#why-train .glass-panel');
  benefits.forEach((item, index) => {
    gsap.set(item, { opacity: 0, scale: 0.95 });
    gsap.to(item, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      delay: index * 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#why-train',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
  });
});
