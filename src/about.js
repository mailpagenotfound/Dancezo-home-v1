import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  // Check if we are on the about page
  const timeline = document.querySelector('.timeline-container');
  if (!timeline) return;

  // --- 1. MEMORY TIMELINE SCROLL STAGGER REVEAL ---
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach((item, index) => {
    // Starts invisible
    gsap.set(item, { opacity: 0, x: -30 });
    
    // Observer triggers reveal
    gsap.to(item, {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 80%',
        end: 'top 50%',
        toggleActions: 'play none none none'
      }
    });
  });

  // --- 2. MOUSE-TRACKING SPOTLIGHT OVERLAY (VISION & MISSION) ---
  const container = document.getElementById('vision-mission');
  const spotlight = document.getElementById('cursor-spotlight');

  if (container && spotlight) {
    container.addEventListener('mouseenter', () => {
      spotlight.style.opacity = '0.12';
    });

    container.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      spotlight.style.left = `${x}px`;
      spotlight.style.top = `${y}px`;
    });

    container.addEventListener('mouseleave', () => {
      spotlight.style.opacity = '0';
    });
  }

  // --- 3. INSTRUCTORS HOVER SPOTLIGHTS ---
  const instructorCards = document.querySelectorAll('.instructor-card');
  instructorCards.forEach(card => {
    const spot = card.querySelector('.instructor-spotlight');

    card.addEventListener('mouseenter', () => {
      if (spot) spot.style.opacity = '1';
    });

    card.addEventListener('mouseleave', () => {
      if (spot) spot.style.opacity = '0';
    });
  });
});
