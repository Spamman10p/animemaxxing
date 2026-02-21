/* ============================================
   ANIMEMAXXING — Interactive Scripts
   ============================================ */

// === COPY CONTRACT ADDRESS ===
function copyContract() {
  const address = document.getElementById('contractAddress').textContent;
  const copyBtn = document.getElementById('copyBtn');
  const copyText = document.getElementById('copyText');

  navigator.clipboard.writeText(address).then(() => {
    copyBtn.classList.add('copied');
    copyText.textContent = 'COPIED!';

    setTimeout(() => {
      copyBtn.classList.remove('copied');
      copyText.textContent = 'COPY';
    }, 2000);
  }).catch(() => {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = address;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    copyBtn.classList.add('copied');
    copyText.textContent = 'COPIED!';

    setTimeout(() => {
      copyBtn.classList.remove('copied');
      copyText.textContent = 'COPY';
    }, 2000);
  });
}

// === SCROLL REVEAL ANIMATION (IntersectionObserver) ===
function initRevealAnimations() {
  const reveals = document.querySelectorAll('.reveal');

  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

// === FLOATING PARTICLES ===
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const particleCount = 30;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    const size = Math.random() * 3 + 1;
    const left = Math.random() * 100;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 15;
    const opacity = Math.random() * 0.3 + 0.05;

    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      opacity: ${opacity};
    `;

    // Random color tints
    const colors = [
      'rgba(0, 200, 255, 0.3)',
      'rgba(255, 60, 80, 0.2)',
      'rgba(255, 200, 50, 0.2)',
      'rgba(255, 255, 255, 0.15)',
      'rgba(150, 80, 255, 0.2)'
    ];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];

    container.appendChild(particle);
  }
}

// === PARALLAX & MOUSE NOISE ===
function initParallax() {
  const hero = document.querySelector('.hero');
  const orbs = document.querySelectorAll('.hero__orb');
  const particles = document.getElementById('particles');

  if (!hero) return;

  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5);
    const y = (e.clientY / window.innerHeight - 0.5);

    // Orb parallax
    orbs.forEach((orb, i) => {
      const speed = (i + 1) * 30;
      orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });

    // Suble noise/particle parallax
    if (particles) {
      particles.style.transform = `translate(${x * 15}px, ${y * 15}px)`;
    }

    // Global mouse-move for glow trails
    document.querySelectorAll('.glow-trail').forEach(trail => {
      const speed = 20;
      trail.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
  });
}

// === SMOOTH SCROLL FOR ANCHOR LINKS ===
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// === TYPING EFFECT FOR HERO BADGE ===
function initTypingEffect() {
  const badge = document.querySelector('.hero__badge');
  if (!badge) return;

  const texts = ['LIVE ON SOLANA', 'THE GLOW-UP ERA', 'ANIMEMAXXING', 'BECOME THE MAIN CHARACTER'];
  let currentIndex = 0;

  setInterval(() => {
    currentIndex = (currentIndex + 1) % texts.length;
    badge.style.opacity = '0';
    badge.style.transform = 'translateY(-10px)';

    setTimeout(() => {
      badge.childNodes[badge.childNodes.length - 1].textContent = '\n          ' + texts[currentIndex] + '\n        ';
      badge.style.opacity = '1';
      badge.style.transform = 'translateY(0)';
    }, 300);
  }, 3000);
}

// === NAVBAR SCROLL BEHAVIOR (subtle) ===
function initScrollEffects() {
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const scrollIndicator = document.querySelector('.hero__scroll');

    // Hide scroll indicator after scrolling a bit
    if (scrollIndicator) {
      if (window.scrollY > 100) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.pointerEvents = 'none';
      } else {
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.pointerEvents = 'auto';
      }
    }

    lastScroll = window.scrollY;
  });
}

// === ANIMATED COUNTERS ===
function initCounters() {
  const values = document.querySelectorAll('.statsbar__value');
  if (!values.length) return;

  const formatNumber = (num, suffix) => {
    if (num >= 1000000000) return (num / 1000000000).toFixed(0) + 'B' + suffix;
    if (num >= 1000000) return (num / 1000000).toFixed(0) + 'M' + suffix;
    return num.toLocaleString() + suffix;
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      const duration = 2000;
      const start = performance.now();

      const tick = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(target * ease);
        el.textContent = formatNumber(current, suffix);
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  values.forEach(el => observer.observe(el));
}

// === NAVBAR SCROLL BEHAVIOR ===
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// === ENHANCED 3D TILT WITH SHINE ===
function initTilt() {
  const cards = document.querySelectorAll('[data-tilt]');

  cards.forEach(card => {
    const glow = card.querySelector('.transform-card__glow');

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 8; // More aggressive tilt
      const rotateY = (centerX - x) / 8;

      card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;

      // Control shine position
      if (glow) {
        glow.style.transform = `translate(${x - 50}px, ${y - 50}px)`;
        glow.style.opacity = '1';
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0)`;
      if (glow) glow.style.opacity = '0';
    });
  });
}

// === LOADING SCREEN ===
function initLoadingScreen() {
  const screen = document.getElementById('loadingScreen');
  const fill = document.getElementById('loadingFill');
  if (!screen || !fill) return;

  // Animate progress bar
  requestAnimationFrame(() => {
    fill.style.width = '100%';
  });

  // Reveal site after animation
  setTimeout(() => {
    screen.classList.add('hidden');
    // Remove from DOM after fade-out
    setTimeout(() => {
      screen.remove();
    }, 800);
  }, 1600);
}

// === MOBILE NAV ===
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  if (!hamburger || !mobileNav) return;

  const toggle = () => {
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.classList.toggle('active');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  hamburger.addEventListener('click', toggle);

  // Close menu on link click
  mobileNav.querySelectorAll('.mobile-nav__link, .mobile-nav__cta').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

// === CUSTOM CURSOR GLOW ===
function initCustomCursor() {
  // Skip on touch devices
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

  const cursor = document.getElementById('customCursor');
  const trail = document.getElementById('customCursorTrail');
  if (!cursor || !trail) return;

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let trailX = 0, trailY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.classList.add('active');
    trail.classList.add('active');
  });

  document.addEventListener('mouseleave', () => {
    cursor.classList.remove('active');
    trail.classList.remove('active');
  });

  // Hover detection for interactive elements
  const hoverTargets = 'a, button, [data-tilt], .btn--hero-ape, input, .navbar__link, .mobile-nav__link';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverTargets)) {
      cursor.classList.add('hovering');
      trail.classList.add('hovering');
    }
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverTargets)) {
      cursor.classList.remove('hovering');
      trail.classList.remove('hovering');
    }
  });

  // Smooth follow loop (lerp)
  function animate() {
    cursorX += (mouseX - cursorX) * 0.25;
    cursorY += (mouseY - cursorY) * 0.25;
    trailX += (mouseX - trailX) * 0.12;
    trailY += (mouseY - trailY) * 0.12;

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    trail.style.left = trailX + 'px';
    trail.style.top = trailY + 'px';

    requestAnimationFrame(animate);
  }
  animate();
}

// === GALLERY FILTER ===
function initGallery() {
  const filters = document.querySelectorAll('.gallery__filter');
  const items = document.querySelectorAll('.gallery__item');
  if (!filters.length || !items.length) return;

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(f => f.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;

      items.forEach(item => {
        if (cat === 'all' || item.dataset.category === cat) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
}

// === LIGHTBOX ===
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightboxImg');
  const lbTitle = document.getElementById('lightboxTitle');
  const lbDesc = document.getElementById('lightboxDesc');
  const lbClose = document.getElementById('lightboxClose');
  if (!lightbox || !lbImg) return;

  document.querySelectorAll('.gallery__item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const caption = item.querySelector('.gallery__caption');
      const sub = item.querySelector('.gallery__sub');
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      if (lbTitle) lbTitle.textContent = caption ? caption.textContent : '';
      if (lbDesc) lbDesc.textContent = sub ? sub.textContent : '';
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  const close = () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  };

  lbClose.addEventListener('click', close);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) close();
  });
}

// === COUNTDOWN TIMER ===
function initCountdown() {
  const hEl = document.getElementById('hours');
  const mEl = document.getElementById('minutes');
  const sEl = document.getElementById('seconds');
  if (!hEl || !mEl || !sEl) return;

  // Persist start time in localStorage to feel like a real 24h event
  let startTime = localStorage.getItem('anime_countdown_start');
  if (!startTime) {
    startTime = Date.now();
    localStorage.setItem('anime_countdown_start', startTime);
  }

  const targetTime = parseInt(startTime) + (24 * 60 * 60 * 1000);

  function update() {
    const now = Date.now();
    const diff = targetTime - now;

    if (diff <= 0) {
      hEl.textContent = '00';
      mEl.textContent = '00';
      sEl.textContent = '00';
      return;
    }

    const h = Math.floor(diff / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    hEl.textContent = String(h).padStart(2, '0');
    mEl.textContent = String(m).padStart(2, '0');
    sEl.textContent = String(s).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

// === INIT ===
document.addEventListener('DOMContentLoaded', () => {
  initLoadingScreen();
  initNavbar();
  initCounters();
  initRevealAnimations();
  initParticles();
  initParallax();
  initSmoothScroll();
  initTypingEffect();
  initScrollEffects();
  initTilt();
  initMobileNav();
  initCustomCursor();
  initGallery();
  initLightbox();
  initCountdown();
});
