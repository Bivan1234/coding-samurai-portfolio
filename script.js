/* ================================================
   BIVAN JENA — Portfolio JavaScript
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ==================== AOS INITIALIZATION ====================
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 80,
    disable: 'mobile'
  });

  // ==================== TYPED.JS INITIALIZATION ====================
  if (document.getElementById('typed-output')) {
    new Typed('#typed-output', {
      strings: [
        'Full Stack Developer',
        'Computer Science Engineer',
        'React &amp; Next.js Developer',
        'Problem Solver'
      ],
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 2000,
      startDelay: 500,
      loop: true,
      cursorChar: '|'
    });
  }

  // ==================== DARK MODE TOGGLE ====================
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  const themeIcon = themeToggle.querySelector('i');

  // Load saved theme
  const savedTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(next);
  });

  function updateThemeIcon(theme) {
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }

  // ==================== NAVBAR SCROLL EFFECT ====================
  const navbar = document.getElementById('navbar');

  function handleNavScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // ==================== HAMBURGER MENU ====================
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navOverlay = document.getElementById('navOverlay');
  const navLinks = document.querySelectorAll('.nav-link');

  function toggleMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    navOverlay.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', toggleMenu);
  navOverlay.addEventListener('click', closeMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // ==================== ACTIVE NAV LINK ON SCROLL ====================
  const sections = document.querySelectorAll('section[id]');

  function highlightNavLink() {
    const scrollY = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavLink, { passive: true });

  // ==================== SMOOTH SCROLL ====================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ==================== SKILL BAR ANIMATION ====================
  const skillBars = document.querySelectorAll('.skill-fill');
  let skillsAnimated = false;

  function animateSkills() {
    if (skillsAnimated) return;

    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;

    const rect = skillsSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight * 0.8 && rect.bottom > 0) {
      skillsAnimated = true;
      skillBars.forEach((bar, index) => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
          bar.style.width = `${width}%`;
        }, index * 100);
      });
    }
  }

  window.addEventListener('scroll', animateSkills, { passive: true });
  animateSkills();

  // ==================== BACK TO TOP BUTTON ====================
  const backToTop = document.getElementById('backToTop');

  function handleBackToTop() {
    if (window.scrollY > 400) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  }

  window.addEventListener('scroll', handleBackToTop, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ==================== CONTACT FORM VALIDATION ====================
  const contactForm = document.getElementById('contactForm');
  const toast = document.getElementById('toast');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Name
      const name = document.getElementById('name-input');
      const nameError = document.getElementById('nameError');
      if (!name.value.trim()) {
        name.classList.add('error');
        nameError.classList.add('show');
        isValid = false;
      } else {
        name.classList.remove('error');
        nameError.classList.remove('show');
      }

      // Email
      const email = document.getElementById('email');
      const emailError = document.getElementById('emailError');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
        email.classList.add('error');
        emailError.classList.add('show');
        isValid = false;
      } else {
        email.classList.remove('error');
        emailError.classList.remove('show');
      }

      // Subject
      const subject = document.getElementById('subject');
      const subjectError = document.getElementById('subjectError');
      if (!subject.value.trim()) {
        subject.classList.add('error');
        subjectError.classList.add('show');
        isValid = false;
      } else {
        subject.classList.remove('error');
        subjectError.classList.remove('show');
      }

      // Message
      const message = document.getElementById('message');
      const messageError = document.getElementById('messageError');
      if (!message.value.trim()) {
        message.classList.add('error');
        messageError.classList.add('show');
        isValid = false;
      } else {
        message.classList.remove('error');
        messageError.classList.remove('show');
      }

      if (isValid) {
        const submitBtn = contactForm.querySelector('.form-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        const formData = new FormData(contactForm);

        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            showToast('Message sent successfully!');
            contactForm.reset();
          } else {
            showToast('Something went wrong. Please try again.');
          }
        })
        .catch(() => {
          showToast('Network error. Please try again.');
        })
        .finally(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;

          document.querySelectorAll('.form-group input, .form-group textarea').forEach(el => {
            el.classList.remove('error');
          });
          document.querySelectorAll('.form-error').forEach(el => {
            el.classList.remove('show');
          });
        });
      }
    });

    // Remove error state on input
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
      input.addEventListener('input', () => {
        input.classList.remove('error');
        const errorEl = input.parentElement.querySelector('.form-error');
        if (errorEl) errorEl.classList.remove('show');
      });
    });
  }

  function showToast(message) {
    const toastText = toast.querySelector('span');
    if (toastText) toastText.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }

  // ==================== STAT COUNTER ANIMATION ====================
  const statCards = document.querySelectorAll('.stat-card h4');
  let statsAnimated = false;

  function animateCounters() {
    if (statsAnimated) return;

    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;

    const rect = aboutSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight * 0.8 && rect.bottom > 0) {
      statsAnimated = true;

      statCards.forEach(card => {
        const target = parseFloat(card.getAttribute('data-target'));
        const suffix = card.getAttribute('data-suffix') || '';
        const isDecimal = card.getAttribute('data-decimal') === 'true';

        if (isDecimal) {
          // Animate decimal value (e.g., CGPA 8.55)
          let current = 0;
          const duration = 1500;
          const startTime = performance.now();

          function animateDecimal(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            current = eased * target;

            card.textContent = current.toFixed(2) + suffix;

            if (progress < 1) {
              requestAnimationFrame(animateDecimal);
            } else {
              card.textContent = target.toFixed(2) + suffix;
            }
          }

          requestAnimationFrame(animateDecimal);
        } else {
          // Animate integer value
          let current = 0;
          const increment = Math.ceil(target / 40);
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            card.textContent = current + suffix;
          }, 30);
        }
      });
    }
  }

  window.addEventListener('scroll', animateCounters, { passive: true });
  animateCounters();

});
