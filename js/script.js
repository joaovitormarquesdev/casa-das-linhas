(function () {
  'use strict';

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const header = document.getElementById('header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 24);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuIcon = document.getElementById('menuIcon');
  const iconOpen = '<path d="M4 7h16M4 12h16M4 17h16"/>';
  const iconClose = '<path d="M6 6l12 12M18 6L6 18"/>';

  const closeMenu = () => {
    mobileMenu.classList.add('hidden');
    menuIcon.innerHTML = iconOpen;
  };

  menuBtn.addEventListener('click', () => {
    const isHidden = mobileMenu.classList.toggle('hidden');
    menuIcon.innerHTML = isHidden ? iconOpen : iconClose;
  });

  mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('is-visible'), i * 80);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  const form = document.getElementById('contactForm');
  if (form) {
    const success = document.getElementById('formSuccess');

    const validateField = (field) => {
      const value = field.value.trim();
      const isValid =
        field.type === 'email'
          ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          : value.length > 0;
      field.classList.toggle('error', !isValid);
      return isValid;
    };

    form.querySelectorAll('.field').forEach((field) => {
      field.addEventListener('input', () => {
        if (field.classList.contains('error')) validateField(field);
      });
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const fields = form.querySelectorAll('.field');
      let valid = true;
      fields.forEach((field) => {
        if (!validateField(field)) valid = false;
      });

      if (valid) {
        form.reset();
        success.classList.remove('hidden');
        setTimeout(() => success.classList.add('hidden'), 6000);
      } else {
        const firstError = form.querySelector('.field.error');
        if (firstError) firstError.focus();
      }
    });
  }
})();
