/* PGfy Extended Design System - JavaScript */
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const isExpanded = navMenu.classList.contains('active');
      mobileToggle.setAttribute('aria-expanded', isExpanded);
    });
  }
  // Active Link Highlighting
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href && currentPath.endsWith(href)) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
  // Accordion Component (Used in Settlement Policy)
  const accordions = document.querySelectorAll('.accordion-header');
  accordions.forEach((header) => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const content = header.nextElementSibling;
      const isAlreadyActive = item.classList.contains('active');
      const siblingItems = item.parentElement.querySelectorAll('.accordion-item');
      siblingItems.forEach((sibling) => {
        sibling.classList.remove('active');
        const siblingContent = sibling.querySelector('.accordion-content');
        if (siblingContent) {
          siblingContent.style.maxHeight = null;
        }
      });
      if (!isAlreadyActive) {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
  // Fade-in Animation on Scroll (Intersection Observer)
  const fadeSections = document.querySelectorAll('.fade-in-section');
  if ('IntersectionObserver' in window && fadeSections.length > 0) {
    const observerOptions = {
      root: null,
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px',
    };
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    fadeSections.forEach((section) => {
      observer.observe(section);
    });
  } else {
    fadeSections.forEach((section) => {
      section.classList.add('is-visible');
    });
  }
  // Flow Step Animation Sequence
  const flowSteps = document.querySelectorAll('.flow-step');
  if ('IntersectionObserver' in window && flowSteps.length > 0) {
    const stepObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
          }
        });
      },
      { threshold: 0.5 }
    );
    flowSteps.forEach((step) => {
      stepObserver.observe(step);
    });
  }
});
