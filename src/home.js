import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. HERO LOAD INTRO & PARALLAX ANIMATIONS ---
  const animateHeroElements = () => {
    const bg = document.querySelector('.hero-stage-bg');
    const text = document.querySelector('.hero-giant-text');
    const dancer = document.querySelector('.hero-dancer-img');
    const taglineBar = document.querySelector('.hero-tagline-bar');

    if (!bg || !text || !dancer || !taglineBar) return;

    // Set initial states
    gsap.set(bg, { scale: 1.12 });
    gsap.set(text, { opacity: 0, scale: 0.88, y: 30 });
    gsap.set(dancer, { opacity: 0, scale: 0.92, y: 50 });
    gsap.set(taglineBar, { opacity: 0, y: 20 });

    // Intro timeline
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to(bg, { scale: 1.02, duration: 3.5, ease: 'sine.out' })
      .to(text, { opacity: 0.95, scale: 1, y: 0, duration: 1.6 }, '-=3.0')
      .to(dancer, { opacity: 1, scale: 1, y: 0, duration: 1.8 }, '-=2.0')
      .to(taglineBar, { opacity: 1, y: 0, duration: 1.2 }, '-=1.2');

    // Scroll-driven Parallax timelines
    gsap.to(bg, {
      y: '10%',
      scrollTrigger: {
        trigger: '#home-hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    gsap.to(text, {
      y: '6%',
      scrollTrigger: {
        trigger: '#home-hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    gsap.to(dancer, {
      y: '-6%',
      scrollTrigger: {
        trigger: '#home-hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  };

  // --- 2. FLOATING LIGHT PARTICLES SIMULATOR ---
  const initLightParticles = () => {
    const container = document.getElementById('light-particles');
    if (!container) return;

    const particleCount = 20;
    for (let i = 0; i < particleCount; i++) {
      const p = document.createElement('div');
      p.className = 'hero-particle';
      
      const size = Math.random() * 4 + 2; // 2px to 6px
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const opacity = Math.random() * 0.35 + 0.1;
      
      p.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background-color: rgba(255, 255, 255, 0.65);
        border-radius: 50%;
        left: ${left}%;
        top: ${top}%;
        opacity: ${opacity};
        pointer-events: none;
        box-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
      `;
      container.appendChild(p);

      // Float animation loop
      gsap.to(p, {
        y: -Math.random() * 120 - 40,
        x: (Math.random() - 0.5) * 40,
        opacity: 0,
        duration: Math.random() * 5 + 4,
        ease: 'power1.out',
        repeat: -1,
        delay: Math.random() * 4
      });
    }
  };

  // --- 3. INTERACTIVE COLLAGE WITH PARALLAX & HOVER EFFECT (Section 2) ---
  const initArtOfDanceCollage = () => {
    const bg = document.getElementById('collage-bg');
    const dancer = document.getElementById('collage-dancer');
    const wrapper = document.querySelector('.collage-wrapper');
    if (!bg || !dancer || !wrapper) return;

    // A. Parallax scroll effect
    gsap.to(bg, {
      scale: 1.15,
      y: '5%',
      scrollTrigger: {
        trigger: '#art-of-dance',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

    gsap.to(dancer, {
      y: '-8%',
      scale: 1.05,
      scrollTrigger: {
        trigger: '#art-of-dance',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

    // B. Subtle interactive mouse-float effect on the cutout dancer
    wrapper.addEventListener('mousemove', (e) => {
      const rect = wrapper.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Translate coordinates to percentage offset (-10 to 10 pixels range)
      const moveX = (x / rect.width) * 25;
      const moveY = (y / rect.height) * 20;

      gsap.to(dancer, {
        x: moveX,
        y: moveY - 10, // keep its bottom alignment offset
        rotation: moveX * 0.05,
        duration: 0.6,
        ease: 'power2.out'
      });
    });

    wrapper.addEventListener('mouseleave', () => {
      gsap.to(dancer, {
        x: 0,
        y: -10,
        rotation: 0,
        duration: 0.8,
        ease: 'power2.out'
      });
    });
  };

  // --- 4. STYLE CARDS 3D PERSPECTIVE TILT ---
  const initStyleCardsTilt = () => {
    const cards = document.querySelectorAll('.style-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // x coordinate inside the element
        const y = e.clientY - rect.top;  // y coordinate inside the element
        
        // Compute percentage positions
        const percentX = (x / rect.width) - 0.5; // -0.5 to 0.5
        const percentY = (y / rect.height) - 0.5; // -0.5 to 0.5
        
        const tiltX = percentY * -20; // Max tilt vertical 20 deg
        const tiltY = percentX * 20;  // Max tilt horizontal 20 deg
        
        card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.03)`;
        card.style.borderColor = 'rgba(245, 196, 107, 0.4)';
        card.style.boxShadow = '0 30px 60px rgba(212, 175, 55, 0.25)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
        card.style.borderColor = 'rgba(212, 175, 55, 0.08)';
        card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.5)';
      });
    });
  };

  // --- 5. STATS ANIMATED COUNTERS ---
  const initStatsCounters = () => {
    const statsSection = document.getElementById('stats-showcase');
    if (!statsSection) return;

    const counters = statsSection.querySelectorAll('.counter-val');
    
    const countUp = (counter) => {
      const target = +counter.getAttribute('data-target');
      const duration = 2000; // ms
      const startTime = performance.now();

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out quad
        const easeProgress = progress * (2 - progress);
        const currentValue = Math.floor(easeProgress * target);
        
        counter.textContent = currentValue;

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          counter.textContent = target;
        }
      };

      requestAnimationFrame(animate);
    };

    // Trigger countUp on ScrollTrigger intersection
    ScrollTrigger.create({
      trigger: statsSection,
      start: 'top 80%',
      onEnter: () => {
        counters.forEach(counter => countUp(counter));
      },
      once: true
    });
  };

  // --- 6. TESTIMONIALS SLIDER ---
  const initTestimonialsSlider = () => {
    const track = document.getElementById('testimonials-track');
    const prevBtn = document.getElementById('testi-prev');
    const nextBtn = document.getElementById('testi-next');
    if (!track || !prevBtn || !nextBtn) return;

    const slides = Array.from(track.children);
    let currentIndex = 0;

    const updateSlider = (index) => {
      // Deactivate all slides
      slides.forEach(slide => slide.classList.remove('active'));
      
      // Update index boundary
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      currentIndex = index;

      // Translate track
      const amountToMove = currentIndex * -100;
      track.style.transform = `translateX(${amountToMove}%)`;
      
      // Activate new slide
      slides[currentIndex].classList.add('active');
    };

    prevBtn.addEventListener('click', () => {
      updateSlider(currentIndex - 1);
    });

    nextBtn.addEventListener('click', () => {
      updateSlider(currentIndex + 1);
    });

    // Auto play testimonials every 6 seconds
    let testimonialsInterval = setInterval(() => {
      updateSlider(currentIndex + 1);
    }, 6000);

    const resetInterval = () => {
      clearInterval(testimonialsInterval);
      testimonialsInterval = setInterval(() => {
        updateSlider(currentIndex + 1);
      }, 6000);
    };

    prevBtn.addEventListener('click', resetInterval);
    nextBtn.addEventListener('click', resetInterval);
  };

  // Run initializations
  animateHeroElements();
  initLightParticles();
  initArtOfDanceCollage();
  initStyleCardsTilt();
  initStatsCounters();
  initTestimonialsSlider();
});
