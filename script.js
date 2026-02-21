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
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
  reveals.forEach(el => observer.observe(el));
}

function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    const size = Math.random() * 3 + 1;
    const left = Math.random() * 100;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 15;
    const opacity = Math.random() * 0.3 + 0.05;
    particle.style.cssText = `width: ${size}px; height: ${size}px; left: ${left}%; animation-duration: ${duration}s; animation-delay: ${delay}s; opacity: ${opacity};`;
    const colors = ['rgba(0, 200, 255, 0.3)', 'rgba(255, 60, 80, 0.2)', 'rgba(255, 200, 50, 0.2)', 'rgba(255, 255, 255, 0.15)', 'rgba(150, 80, 255, 0.2)'];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    container.appendChild(particle);
  }
}

function initParallax() {
  const hero = document.querySelector('.hero');
  const orbs = document.querySelectorAll('.hero__orb');
  const particles = document.getElementById('particles');
  if (!hero) return;
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5);
    const y = (e.clientY / window.innerHeight - 0.5);
    orbs.forEach((orb, i) => {
      const speed = (i + 1) * 30;
      orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
    if (particles) particles.style.transform = `translate(${x * 15}px, ${y * 15}px)`;
    document.querySelectorAll('.glow-trail').forEach(trail => {
      trail.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
    });
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

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

function initScrollEffects() {
  window.addEventListener('scroll', () => {
    const scrollIndicator = document.querySelector('.hero__scroll');
    if (scrollIndicator) {
      if (window.scrollY > 100) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.pointerEvents = 'none';
      } else {
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.pointerEvents = 'auto';
      }
    }
  });
}

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

function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  });
}

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
      const rotateX = (y - centerY) / 8;
      const rotateY = (centerX - x) / 8;
      card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
      if (glow) { glow.style.transform = `translate(${x - 50}px, ${y - 50}px)`; glow.style.opacity = '1'; }
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0)`;
      if (glow) glow.style.opacity = '0';
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCounters();
  initRevealAnimations();
  initParticles();
  initParallax();
  initSmoothScroll();
  initTypingEffect();
  initScrollEffects();
  initTilt();
});