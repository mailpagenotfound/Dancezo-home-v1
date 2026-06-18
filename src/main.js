import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initFluidSplashCursor } from './SplashCursor.js';

// Register GreenSock plugins
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  
  // --- 1. INITIALIZE LENIS SMOOTH INERTIA SCROLLING ---
  const lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    infinite: false,
    smoothWheel: true
  });

  // Connect Lenis to ScrollTrigger and header updates
  const header = document.querySelector('.main-header');
  lenis.on('scroll', (e) => {
    ScrollTrigger.update();
    if (header) {
      if (e.scroll > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  });

  // Bind Lenis animation frame loop to GSAP ticker
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000); // Convert time to milliseconds
  });

  // Disable GSAP lag smoothing to keep scrolling perfectly synchronized
  gsap.ticker.lagSmoothing(0);

  // --- 2. GLOBAL PAGE LOADING SCREEN FADE ---
  const loader = document.getElementById('page-loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
          loader.style.display = 'none';
        }, 850);
      }, 500); // Graceful delay
    });

    // Fallback if load event already fired or delayed
    if (document.readyState === 'complete') {
      setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
          loader.style.display = 'none';
        }, 850);
      }, 500);
    }
  }

  // --- 3. DYNAMIC HEADER LINK ACTIVE HIGHLIGHTER ---
  const currentPath = window.location.pathname;
  const navItems = document.querySelectorAll('.nav-item');
  
  navItems.forEach(item => {
    item.classList.remove('active');
    const link = item.querySelector('a');
    if (link) {
      const href = link.getAttribute('href');
      // Exact match or contains for multi-pages
      if (currentPath === href || (href !== '/' && currentPath.includes(href))) {
        item.classList.add('active');
      }
    }
  });

  // --- 4. INITIALIZE PREMIUM SPLASH CURSOR ---
  initSplashCursor();

});

function initSplashCursor() {
  // Disable custom cursor elements on mobile/touch screens for best performance
  if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768) {
    return;
  }

  // 1. Initialize the WebGL Fluid Splash Cursor
  initFluidSplashCursor({
    SIM_RESOLUTION: 128,
    DYE_RESOLUTION: 1152,
    DENSITY_DISSIPATION: 3.5,
    VELOCITY_DISSIPATION: 2,
    PRESSURE: 0.1,
    CURL: 3,
    SPLAT_RADIUS: 0.2,
    SPLAT_FORCE: 6000,
    COLOR_UPDATE_SPEED: 9,
    RAINBOW_MODE: true
  });

  // 2. Setup the custom HTML/CSS cursor pointer dot
  const style = document.createElement('style');
  style.innerHTML = `
    * {
      cursor: none !important;
    }
    .custom-cursor-dot {
      width: 8px;
      height: 8px;
      background-color: #D4AF37; /* Luxury Gold */
      border-radius: 50%;
      position: fixed;
      top: 0;
      left: 0;
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 100000;
      transition: width 0.2s cubic-bezier(0.25, 1, 0.5, 1), 
                  height 0.2s cubic-bezier(0.25, 1, 0.5, 1), 
                  background-color 0.2s, 
                  border-color 0.2s;
      box-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
    }
    .custom-cursor-dot.hover {
      width: 28px;
      height: 28px;
      background-color: rgba(212, 175, 55, 0.1);
      border: 1.5px solid #D4AF37;
      box-shadow: 0 0 15px rgba(212, 175, 55, 0.8);
    }
  `;
  document.head.appendChild(style);

  const dot = document.createElement('div');
  dot.className = 'custom-cursor-dot';
  document.body.appendChild(dot);

  window.addEventListener('mousemove', (e) => {
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
  });

  // Check if cursor is hovering over interactive elements for expanding feedback
  window.addEventListener('mouseover', (e) => {
    const target = e.target;
    if (!target) return;
    if (
      target.tagName === 'A' ||
      target.tagName === 'BUTTON' ||
      target.closest('a') ||
      target.closest('button') ||
      target.closest('.style-card') ||
      target.closest('.play-btn') ||
      target.closest('.glass-panel') ||
      target.closest('.nav-item') ||
      target.closest('.interactive-card') ||
      target.classList.contains('interactive-element') ||
      window.getComputedStyle(target).cursor === 'pointer'
    ) {
      dot.classList.add('hover');
    } else {
      dot.classList.remove('hover');
    }
  });
}

