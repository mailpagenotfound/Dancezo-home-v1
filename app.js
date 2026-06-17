document.addEventListener('DOMContentLoaded', () => {
  // --- STATE VARIABLES ---
  let scrollY = window.scrollY;
  let mouseX = 0;
  let mouseY = 0;
  let targetMouseX = 0;
  let targetMouseY = 0;
  
  // --- DOM ELEMENTS ---
  const hero = document.getElementById('hero');
  const layers = [
    { el: document.querySelector('.layer-bg'), speedY: 0.1, speedX: 0.015 },
    { el: document.querySelector('.layer-collage'), speedY: 0.25, speedX: 0.03 },
    { el: document.querySelector('.layer-decor'), speedY: 0.4, speedX: 0.05 },
    { el: document.querySelector('.layer-dancers'), speedY: 0.65, speedX: 0.08 },
    { el: document.querySelector('.layer-foreground'), speedY: 0.35, speedX: 0.025 }
  ];
  
  const menuBtn = document.getElementById('menu-btn');
  const menuOverlay = document.getElementById('menu-overlay');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // --- 1. LUMA KEY BACKGROUND REMOVAL & VIEWPORT REVEALS ---
  const removeBlackBackground = (imgElement) => {
    return new Promise((resolve) => {
      const filterImage = () => {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = imgElement.naturalWidth;
          canvas.height = imgElement.naturalHeight;
          
          ctx.drawImage(imgElement, 0, 0);
          
          const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imgData.data;
          
          // Per-pixel luma-key calculation to turn pure black into alpha transparency
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i+1];
            const b = data[i+2];
            
            // Calculate perceived brightness (luminance)
            const luma = 0.299 * r + 0.587 * g + 0.114 * b;
            
            // If the pixel is very dark (black background)
            if (luma < 35) {
              // Soft opacity transition to blend outline edges seamlessly
              data[i+3] = Math.max(0, (luma - 5) * (255 / 30));
            }
          }
          
          ctx.putImageData(imgData, 0, 0);
          imgElement.src = canvas.toDataURL();
        } catch (e) {
          console.warn("Unable to process image transparency (likely due to local security restrictions under file:// protocol):", e);
        }
        resolve();
      };

      if (imgElement.complete) {
        filterImage();
      } else {
        imgElement.addEventListener('load', filterImage, { once: true });
      }
    });
  };

  const setupDancersAndAnimations = () => {
    // Process all centerpiece dancer images into transparent cutouts
    const dancerSelectors = [
      '.contemporary-dancer img',
      '.ballet-dancer img',
      '.bharatanatyam-silhouette img',
      '.jazz-dancer img',
      '.hiphop-dancer img'
    ];
    
    dancerSelectors.forEach(selector => {
      const img = document.querySelector(selector);
      if (img) removeBlackBackground(img);
    });

    // Reveal centerpiece dancers on page load in a staggered wave from the center outwards
    const dancersOrder = [
      document.querySelector('.bharatanatyam-silhouette'),
      document.querySelector('.ballet-dancer'),
      document.querySelector('.jazz-dancer'),
      document.querySelector('.contemporary-dancer'),
      document.querySelector('.hiphop-dancer')
    ];
    
    dancersOrder.forEach((dancer, index) => {
      if (dancer) {
        setTimeout(() => {
          dancer.classList.add('revealed');
        }, 400 + index * 180);
      }
    });

    // Intersection Observer for Title & Subtitle scrolls below the torn paper
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Reveal the editorial title (triggers fade, scale-down, and text outline reveal)
          const title = entry.target.querySelector('.hero-title-editorial');
          if (title) {
            title.classList.add('revealed');
          }

          // Subtitle fade and slide reveal
          const subtitleContainer = entry.target.querySelector('.subtitle-container');
          if (subtitleContainer) {
            subtitleContainer.classList.add('revealed');
          }

          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    const titleContainerBelow = document.querySelector('.hero-content-below');
    if (titleContainerBelow) {
      observer.observe(titleContainerBelow);
    }

    // General Observer for card reveals
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          cardObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    const cardsToReveal = document.querySelectorAll('.critique-item, .gallery-item-wrapper, .team-card, .showcase-item');
    cardsToReveal.forEach(card => {
      cardObserver.observe(card);
    });
  };
  
  setupDancersAndAnimations();

  // --- 2. INTERACTIVE MENU TOGGLE ---
  menuBtn.addEventListener('click', () => {
    const isOpen = menuOverlay.classList.contains('open');
    if (isOpen) {
      // Close Menu
      menuOverlay.classList.remove('open');
      menuBtn.classList.remove('active');
      navLinks.forEach(link => {
        link.style.opacity = '0';
        link.style.transform = 'translateX(-20px)';
        link.style.transition = 'none';
      });
    } else {
      // Open Menu
      menuOverlay.classList.add('open');
      menuBtn.classList.add('active');
      
      // Stagger link entrance
      navLinks.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateX(-20px)';
        setTimeout(() => {
          link.style.transition = 'opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1), transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
          link.style.opacity = '1';
          link.style.transform = 'translateX(0)';
        }, 300 + index * 100);
      });
    }
  });

  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuOverlay.classList.remove('open');
      menuBtn.classList.remove('active');
    });
  });

  // --- 3. COMBINED MOUSE & SCROLL PARALLAX LOOP ---
  const handleMouseMove = (e) => {
    // Normalize coordinates around screen center (-1 to 1)
    targetMouseX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
    targetMouseY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
  };

  const handleScroll = () => {
    scrollY = window.scrollY;
  };

  // Bind mouse move only for larger screens to save performance
  if (window.innerWidth > 768) {
    window.addEventListener('mousemove', handleMouseMove);
  }
  window.addEventListener('scroll', handleScroll);

  const parallaxRender = () => {
    // Smooth easing/lerp for mouse coordinates
    mouseX += (targetMouseX - mouseX) * 0.08;
    mouseY += (targetMouseY - mouseY) * 0.08;

    // Apply translations to each layer
    layers.forEach(layer => {
      if (layer.el) {
        // Scroll translation (vertical only)
        const transY = scrollY * layer.speedY;
        
        // Mouse movement translation (horizontal and vertical)
        const mX = mouseX * (window.innerWidth * layer.speedX);
        const mY = mouseY * (window.innerHeight * layer.speedX * 0.5);
        
        // Combine transforms
        layer.el.style.transform = `translate3d(${-mX}px, ${transY - mY}px, 0)`;
      }
    });

    requestAnimationFrame(parallaxRender);
  };

  requestAnimationFrame(parallaxRender);

  // --- 4. HIGH-PERFORMANCE CANVAS PARTICLE SYSTEM ---
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 40;
    
    const colors = [
      'rgba(212, 175, 55, 0.65)',  // Soft Gold
      'rgba(215, 38, 56, 0.45)',  // Crimson Red
      'rgba(247, 242, 234, 0.5)'   // Warm Ivory
    ];

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.size = Math.random() * 3 + 1;
        this.speedY = -(Math.random() * 1.5 + 0.5);
        this.speedX = (Math.random() * 1 - 0.5);
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = Math.random() * 0.5 + 0.2;
        this.fadeSpeed = Math.random() * 0.005 + 0.002;
        this.angle = Math.random() * Math.PI * 2;
        this.spin = Math.random() * 0.02 - 0.01;
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.angle) * 0.3;
        this.angle += this.spin;
        
        // Fade out as it floats up
        if (this.y < canvas.height * 0.2) {
          this.alpha -= 0.01;
        }

        // Reset if offscreen or faded out
        if (this.y < -20 || this.alpha <= 0 || this.x < -20 || this.x > canvas.width + 20) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        
        // Add subtle glow
        ctx.shadowBlur = this.size * 2;
        ctx.shadowColor = this.color;
        
        ctx.fill();
        ctx.restore();
      }
    }

    const initParticles = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        const p = new Particle();
        // Distribute them vertically on load so they don't all rise from the bottom together
        p.y = Math.random() * canvas.height;
        particles.push(p);
      }
    };

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      
      requestAnimationFrame(animateParticles);
    };

    // Initialize & Listen to resize
    initParticles();
    animateParticles();

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Re-enable mouse bounds if size changes
      if (window.innerWidth <= 768) {
        window.removeEventListener('mousemove', handleMouseMove);
        targetMouseX = 0;
        targetMouseY = 0;
      } else {
        window.addEventListener('mousemove', handleMouseMove);
      }
    });
  }
});
