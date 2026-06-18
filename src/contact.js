import { gsap } from 'gsap';

document.addEventListener('DOMContentLoaded', () => {
  // Check if we are on the contact page
  const form = document.getElementById('enquiry-form');
  if (!form) return;

  // --- 1. PREMIUM FORM SUBMIT GOLD RIPPLE FEEDBACK ---
  const ripple = document.getElementById('submit-ripple');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Disable form fields during anim feedback
    const inputs = form.querySelectorAll('input, select, textarea, button');
    inputs.forEach(i => i.setAttribute('disabled', 'true'));

    // Trigger Gold Ripple expanding effect
    if (ripple) {
      gsap.timeline()
        .set(ripple, { scale: 0, opacity: 0.8 })
        .to(ripple, {
          scale: 2.2,
          opacity: 0,
          duration: 0.9,
          ease: 'power2.out'
        })
        .call(() => {
          // Alert user and reset form
          alert('Thank you! Your dance academy enquiry/audition sign-up has been successfully received by the guild ledger.');
          form.reset();
          
          // Re-enable form
          inputs.forEach(i => i.removeAttribute('disabled'));
        });
    }
  });

  // --- 2. SIMULATED 3D MAP PIN FLOATING ANIM ---
  const pin = document.getElementById('map-pin');
  if (pin) {
    gsap.to(pin, {
      y: -12,
      duration: 1.6,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });
  }

  // --- 3. MAP PANEL HOVER ROTATION EFFECT ---
  const mapContainer = document.getElementById('map-container');
  if (mapContainer) {
    mapContainer.addEventListener('mouseenter', () => {
      gsap.to(mapContainer, {
        scale: 1.015,
        borderColor: 'rgba(245, 196, 107, 0.25)',
        boxShadow: '0 25px 50px rgba(212, 175, 55, 0.15)',
        duration: 0.5,
        ease: 'power2.out'
      });
    });

    mapContainer.addEventListener('mouseleave', () => {
      gsap.to(mapContainer, {
        scale: 1,
        borderColor: 'rgba(212, 175, 55, 0.08)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
        duration: 0.5,
        ease: 'power2.out'
      });
    });
  }

  // --- 4. MINI GALLERY SLIDER IN CONTACT ---
  const galleryTrack = document.getElementById('studio-gallery-track');
  const studioPrev = document.getElementById('studio-prev');
  const studioNext = document.getElementById('studio-next');
  if (galleryTrack && studioPrev && studioNext) {
    let slideIndex = 0;
    const totalSlides = 3;
    
    const updateStudioSlider = () => {
      const offset = slideIndex * -33.33;
      galleryTrack.style.transform = `translateX(${offset}%)`;
    };

    studioPrev.addEventListener('click', () => {
      slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
      updateStudioSlider();
    });

    studioNext.addEventListener('click', () => {
      slideIndex = (slideIndex + 1) % totalSlides;
      updateStudioSlider();
    });
  }
});
