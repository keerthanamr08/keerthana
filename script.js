// ============================================================
//  KEERTHANA M R — PORTFOLIO SCRIPT
//  Pure Vanilla JS — No dependencies
// ============================================================

// ---------- NAVBAR: scroll class + active link ----------
(function () {
  const nav = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function onScroll() {
    // Scrolled class for border
    if (window.scrollY > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    // Active nav link based on scroll position
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 100;
      if (window.scrollY >= top) {
        current = sec.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });

    // Back-to-top button
    const btt = document.getElementById('back-to-top');
    if (btt) {
      btt.classList.toggle('visible', window.scrollY > 400);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// ---------- HAMBURGER MENU ----------
(function () {
  const btn = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Close on nav link click
  links.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
})();

// ---------- BACK TO TOP ----------
(function () {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// ---------- INTERSECTION OBSERVER — reveal animations ----------
(function () {
  const targets = document.querySelectorAll(
    '.timeline-item, .skill-card, .project-card, .achievement-card, .stat-card'
  );

  if (!('IntersectionObserver' in window)) {
    targets.forEach(el => {
      el.classList.add('visible');
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Stagger siblings
          const siblings = Array.from(entry.target.parentElement.children);
          const idx = siblings.indexOf(entry.target);
          entry.target.style.transitionDelay = (idx * 60) + 'ms';
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach(el => observer.observe(el));
})();

// ---------- PROJECT DETAIL TOGGLE ----------
(function () {
  document.querySelectorAll('.toggle-detail-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const detailId = btn.getAttribute('data-target');
      const detail = document.getElementById(detailId);
      if (!detail) return;

      const isOpen = detail.classList.toggle('open');
      btn.textContent = isOpen ? '↑ Read Less' : '↓ Read More';
      btn.setAttribute('aria-expanded', isOpen);
    });
  });
})();

// ---------- CONTACT FORM ----------
(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const statusEl = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitBtn');
  const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
  const btnSpinner = submitBtn ? submitBtn.querySelector('.btn-spinner') : null;

  function setLoading(loading) {
    if (!submitBtn) return;
    submitBtn.disabled = loading;
    if (btnText) btnText.classList.toggle('hidden', loading);
    if (btnSpinner) btnSpinner.classList.toggle('hidden', !loading);
  }

  function setStatus(message, type) {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.className = 'form-status ' + type;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Basic validation
    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();

    if (!name || !email || !message) {
      setStatus('Please fill in all fields.', 'error');
      return;
    }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
      setStatus('Please enter a valid email address.', 'error');
      return;
    }

    setLoading(true);
    setStatus('', '');

    // Simulate async send (replace with real endpoint / EmailJS / Formspree)
    setTimeout(() => {
      setLoading(false);
      setStatus('✓ Message sent! I\'ll get back to you soon.', 'success');
      form.reset();

      // Clear status after 6s
      setTimeout(() => setStatus('', ''), 6000);
    }, 1600);
  });
})();

// ---------- SMOOTH SCROLL OFFSET (for fixed nav) ----------
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 68;
      const top = target.getBoundingClientRect().top + window.scrollY - navH - 12;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();
