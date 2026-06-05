/* ===========================
   certified swim coach
   script.js
=========================== */

document.addEventListener('DOMContentLoaded', function () {

  /* 1. NAVBAR SCROLL */
  const mainNav = document.getElementById('mainNav');
  function handleNavScroll() {
    mainNav.classList.toggle('scrolled', window.scrollY > 60);
  }
  window.addEventListener('scroll', handleNavScroll);
  handleNavScroll();

  /* 2. ACTIVE NAV LINK ON SCROLL */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop, height = section.offsetHeight, id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) link.classList.add('active');
        });
      }
    });
  });

  /* 3. CLOSE MOBILE NAV ON LINK CLICK */
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const collapse = document.getElementById('navContent');
      if (collapse && collapse.classList.contains('show')) {
        bootstrap.Collapse.getOrCreateInstance(collapse).hide();
      }
    });
  });

  /* 4. BACK TO TOP */
  const backBtn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => backBtn.classList.toggle('visible', window.scrollY > 400));
  backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* 5. GALLERY FILTER */
  const filterBtns   = document.querySelectorAll('.gal-btn');
  const galleryItems = document.querySelectorAll('.gal-item');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      galleryItems.forEach(item => {
        const show = filter === 'all' || item.dataset.cat === filter;
        item.classList.toggle('hidden', !show);
        if (show) item.style.animation = 'fadeInUp 0.4s ease both';
      });
    });
  });

  /* 6. GALLERY LIGHTBOX */
  const modalImg     = document.getElementById('modalImg');
  const galleryModal = new bootstrap.Modal(document.getElementById('galleryModal'));
  document.querySelectorAll('.gal-img-wrap').forEach(wrap => {
    wrap.addEventListener('click', () => {
      modalImg.src = wrap.querySelector('img').src;
      modalImg.alt = wrap.querySelector('img').alt;
      galleryModal.show();
    });
  });

  /* 7. CONTACT FORM */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;
      this.querySelectorAll('input[required]').forEach(input => {
        if (!input.value.trim()) {
          valid = false;
          input.classList.add('is-invalid');
          input.addEventListener('input', () => input.classList.remove('is-invalid'), { once: true });
        }
      });
      if (!valid) return;
      const btn = this.querySelector('.btn-submit');
      btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
      btn.disabled = true;
      setTimeout(() => {
        contactForm.classList.add('d-none');
        formSuccess.classList.remove('d-none');
      }, 1200);
    });
  }

  /* 8. NEWSLETTER */
  const newsletterBtn = document.querySelector('.btn-newsletter');
  if (newsletterBtn) {
    newsletterBtn.addEventListener('click', () => {
      const input = newsletterBtn.closest('.newsletter-form').querySelector('input');
      if (input.value.trim()) {
        newsletterBtn.innerHTML = '<i class="bi bi-check-lg"></i>';
        newsletterBtn.style.background = '#00b894';
        input.value = '';
        setTimeout(() => {
          newsletterBtn.innerHTML = '<i class="bi bi-send-fill"></i>';
          newsletterBtn.style.background = '';
        }, 3000);
      }
    });
  }

  /* 9. SCROLL REVEAL */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.6s ease both';
        entry.target.style.opacity   = '1';
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.program-card, .why-card, .testi-card, .about-stat, .stat-item, .cert-features li')
    .forEach((el, i) => {
      el.style.opacity = '0';
      el.style.animationDelay = (i % 4) * 0.08 + 's';
      revealObserver.observe(el);
    });

  /* 10. ANIMATED COUNTERS */
  function animateCounter(el, target, suffix) {
    let start = 0;
    const steps = 100, inc = target / steps;
    const timer = setInterval(() => {
      start += inc;
      if (start >= target) { start = target; clearInterval(timer); }
      el.textContent = Math.floor(start) + (suffix || '');
    }, 16);
  }

  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.about-stat strong').forEach(el => {
          const text = el.textContent.trim(), num = parseInt(text), suffix = text.replace(num.toString(), '');
          if (!isNaN(num)) animateCounter(el, num, suffix);
        });
        counterObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  const about = document.getElementById('about');
  if (about) counterObs.observe(about);

  /* 11. HERO PARALLAX */
  const heroContent = document.querySelector('.hero-content');
  const heroSection = document.querySelector('.hero-section');
  if (heroContent && window.innerWidth > 991) {
    window.addEventListener('scroll', () => {
      const s = window.scrollY;
      if (s < heroSection.offsetHeight) {
        heroContent.style.transform = `translateY(${s * 0.15}px)`;
        heroContent.style.opacity   = String(1 - s / (heroSection.offsetHeight * 0.8));
      }
    });
  }

  /* 12. RIPPLE KEYFRAME INJECT */
  const style = document.createElement('style');
  style.textContent = `@keyframes ripple { to { transform: scale(40); opacity: 0; } }`;
  document.head.appendChild(style);

});