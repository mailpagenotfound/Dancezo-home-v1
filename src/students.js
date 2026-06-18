import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  // Check if we are on the students page
  const achievements = document.getElementById('achievements-section');
  if (!achievements) return;

  // --- 1. ANIMATED COUNTER STATS ---
  const counters = document.querySelectorAll('.counter-val');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'), 10);
    const counterObj = { value: 0 };

    gsap.to(counterObj, {
      value: target,
      duration: 2.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: achievements,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      onUpdate: () => {
        counter.textContent = Math.floor(counterObj.value);
      },
      onComplete: () => {
        counter.textContent = target; // Ensure exact final value
      }
    });
  });

  // --- 2. PINTEREST ASYMMETRIC MASONRY GRIDS REVEALS ---
  const galleryItems = document.querySelectorAll('.gallery-item-wrapper');
  galleryItems.forEach((item, index) => {
    gsap.set(item, { opacity: 0, y: 35, rotate: index % 2 === 0 ? -1 : 1 });
    
    gsap.to(item, {
      opacity: 1,
      y: 0,
      rotate: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });

    item.addEventListener('mouseenter', () => {
      gsap.to(item, { scale: 1.02, duration: 0.4, ease: 'power2.out' });
      item.style.borderColor = 'rgba(245, 196, 107, 0.2)';
    });

    item.addEventListener('mouseleave', () => {
      gsap.to(item, { scale: 1, duration: 0.4, ease: 'power2.out' });
      item.style.borderColor = 'rgba(212, 175, 55, 0.08)';
    });
  });

  // --- 3. 3D ROTATING TESTIMONIAL CARDS TILT PHYSICS ---
  const rotateCards = document.querySelectorAll('.rotate-card');
  rotateCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const percentX = (x / rect.width) - 0.5;
      const percentY = (y / rect.height) - 0.5;
      
      const tiltX = percentY * -15; // Max X tilt
      const tiltY = percentX * 15;  // Max Y tilt
      
      card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.03)`;
      card.style.borderColor = 'rgba(245, 196, 107, 0.3)';
    });

    card.style.transformOrigin = 'center center';

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
      card.style.borderColor = 'rgba(212, 175, 55, 0.08)';
    });
  });
});
