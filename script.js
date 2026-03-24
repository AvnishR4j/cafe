/**
 * =============================================================
 * URBAN BREW CAFÉ — script.js
 * Vanilla JS: Navigation, Scroll Reveal (IntersectionObserver),
 * Parallax Hero, Mobile Menu, Menu Filter, Back-to-Top, Footer Year
 * =============================================================
 */

'use strict';

/* ---------------------------------------------------------------
   UTILITY: DOM selector helpers
   --------------------------------------------------------------- */
const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];


/* ---------------------------------------------------------------
   1. DYNAMIC FOOTER YEAR
   --------------------------------------------------------------- */
const yearEl = $('#year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}


/* ---------------------------------------------------------------
   2. STICKY NAVIGATION + Scroll Class
   --------------------------------------------------------------- */
const siteHeader = $('#site-header');

/**
 * Adds the `.scrolled` class to the header once the user has
 * scrolled past 60px, enabling the blur + dark background.
 */
function handleHeaderScroll() {
  if (!siteHeader) return;
  if (window.scrollY > 60) {
    siteHeader.classList.add('scrolled');
  } else {
    siteHeader.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleHeaderScroll, { passive: true });

// Run on load in case page is reloaded mid-scroll
handleHeaderScroll();


/* ---------------------------------------------------------------
   3. MOBILE MENU TOGGLE
   --------------------------------------------------------------- */
const hamburger  = $('#hamburger');
const mobileMenu = $('#mobile-menu');
const mobileLinks = $$('.mobile-nav-link', mobileMenu);

/**
 * Toggles the mobile menu open/closed.
 * Manages: aria-expanded, hidden attr, body scroll lock.
 */
function openMenu() {
  if (!hamburger || !mobileMenu) return;
  hamburger.setAttribute('aria-expanded', 'true');
  mobileMenu.removeAttribute('hidden');
  document.body.style.overflow = 'hidden';

  // Trap focus within menu
  mobileLinks[0]?.focus();
}

function closeMenu() {
  if (!hamburger || !mobileMenu) return;
  hamburger.setAttribute('aria-expanded', 'false');
  // Keep element in DOM for CSS transition, then hide
  mobileMenu.style.transform = 'translateX(100%)';
  setTimeout(() => {
    mobileMenu.setAttribute('hidden', '');
    mobileMenu.style.transform = '';
    document.body.style.overflow = '';
    hamburger.focus();
  }, 600); // match --dur-slow
}

function toggleMenu() {
  const isOpen = hamburger?.getAttribute('aria-expanded') === 'true';
  isOpen ? closeMenu() : openMenu();
}

hamburger?.addEventListener('click', toggleMenu);

// Close on any mobile nav link click
mobileLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && hamburger?.getAttribute('aria-expanded') === 'true') {
    closeMenu();
  }
});

// Close if clicking the semi-transparent backdrop area (outside links)
mobileMenu?.addEventListener('click', (e) => {
  if (e.target === mobileMenu) closeMenu();
});


/* ---------------------------------------------------------------
   4. SMOOTH SCROLLING (anchor links)
   --------------------------------------------------------------- */
/**
 * Intercepts clicks on all internal `#` anchor links and
 * performs smooth scrolling with offset to account for the
 * fixed header height.
 */
function getStickyOffset() {
  return siteHeader ? siteHeader.offsetHeight + 16 : 80;
}

document.addEventListener('click', (e) => {
  const anchor = e.target.closest('a[href^="#"]');
  if (!anchor) return;

  const targetId = anchor.getAttribute('href');
  if (targetId === '#') return;

  const target = $(targetId);
  if (!target) return;

  e.preventDefault();
  const top = target.getBoundingClientRect().top + window.scrollY - getStickyOffset();

  window.scrollTo({ top, behavior: 'smooth' });
});


/* ---------------------------------------------------------------
   5. SCROLL REVEAL — IntersectionObserver
   --------------------------------------------------------------- */
/**
 * Uses the IntersectionObserver API to add the `.visible` class
 * to elements when they enter the viewport, triggering the CSS
 * fade-in + translate animations defined in style.css.
 *
 * Once observed and triggered, the element is unobserved for
 * performance (one-time trigger).
 */
const revealObserverOptions = {
  root: null,          // viewport
  rootMargin: '0px 0px -80px 0px', // trigger 80px before bottom of viewport
  threshold: 0.08,     // element must be 8% visible
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    revealObserver.unobserve(entry.target); // stop watching once revealed
  });
}, revealObserverOptions);

// Observe all elements with a reveal class
$$('.reveal-up, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
  revealObserver.observe(el);
});

// Special case: Hero elements reveal immediately on DOMContentLoaded
// because they're above the fold and won't intersect normally
window.addEventListener('DOMContentLoaded', () => {
  const heroRevealEls = $$('.hero .reveal-up');
  heroRevealEls.forEach(el => {
    // Small delay to let browser paint first, then animate
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.classList.add('visible');
      });
    });
  });
});


/* ---------------------------------------------------------------
   6. PARALLAX HERO BACKGROUND
   --------------------------------------------------------------- */
const heroBgImg = $('.hero-bg-img');

/**
 * Subtle CSS-driven parallax on the hero background image.
 * The image is scaled 1.08x in CSS; we shift it by ~30% of
 * scroll offset to create a layered depth effect.
 * Uses requestAnimationFrame for buttery-smooth 60fps performance.
 */
let heroTicking = false;

function updateHeroParallax() {
  if (!heroBgImg) return;
  const scrolled = window.scrollY;
  const heroEl = heroBgImg.closest('.hero');
  if (!heroEl) return;

  const heroBottom = heroEl.offsetTop + heroEl.offsetHeight;
  if (scrolled > heroBottom) return; // skip if hero is out of view

  const parallaxOffset = scrolled * 0.30;
  heroBgImg.style.transform = `scale(1.08) translateY(${parallaxOffset}px)`;
  heroTicking = false;
}

window.addEventListener('scroll', () => {
  if (!heroTicking) {
    requestAnimationFrame(updateHeroParallax);
    heroTicking = true;
  }
}, { passive: true });


/* ---------------------------------------------------------------
   7. MENU FILTER TABS
   --------------------------------------------------------------- */
const tabButtons  = $$('.tab-btn');
const menuCards   = $$('.menu-card', $('#menu-grid'));

/**
 * Filters menu cards by their `data-category` attribute.
 * Animates the hide/show with a CSS opacity + scale transition.
 */
function filterMenu(filter) {
  menuCards.forEach((card, index) => {
    const category = card.dataset.category;
    const shouldShow = filter === 'all' || category === filter;

    if (shouldShow) {
      // Remove hidden and re-trigger the reveal animation
      card.classList.remove('hidden');
      // Stagger the reveal
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 40);
    } else {
      card.style.opacity = '0';
      card.style.transform = 'translateY(16px)';
      setTimeout(() => card.classList.add('hidden'), 240);
    }
  });
}

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active tab state
    tabButtons.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');

    filterMenu(btn.dataset.filter);
  });
});


/* ---------------------------------------------------------------
   8. BACK TO TOP BUTTON
   --------------------------------------------------------------- */
const backToTopBtn = $('#back-to-top');

/**
 * Shows the Back-to-Top button once the user has scrolled
 * more than one viewport height down the page.
 */
const backToTopObserverOptions = {
  root: null,
  threshold: 0,
};

// Use IntersectionObserver on the hero section as a trigger
const heroSection = $('#hero');

if (heroSection && backToTopBtn) {
  const backTopObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        // Hero left viewport — show button
        backToTopBtn.removeAttribute('hidden');
      } else {
        // Hero is visible — hide button
        backToTopBtn.setAttribute('hidden', '');
      }
    });
  }, backToTopObserverOptions);

  backTopObserver.observe(heroSection);
}

backToTopBtn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ---------------------------------------------------------------
   9. ACTIVE NAV LINK HIGHLIGHTING
   --------------------------------------------------------------- */
/**
 * Highlights the active navigation link based on the currently
 * visible section. Uses IntersectionObserver for performance.
 */
const navLinks = $$('.nav-link');
const sections = $$('section[id]');

const activeNavObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const id = entry.target.id;
    navLinks.forEach(link => {
      const linkHref = link.getAttribute('href');
      link.classList.toggle('active-link', linkHref === `#${id}`);
    });
  });
}, {
  root: null,
  rootMargin: '-40% 0px -40% 0px',
  threshold: 0,
});

sections.forEach(section => activeNavObserver.observe(section));


/* ---------------------------------------------------------------
   10. CONTACT FORM — Client-side feedback (UI only)
   --------------------------------------------------------------- */
const contactForm = $('.contact-form');

/**
 * Provides basic client-side validation feedback and a
 * success state for the contact form (UI demonstration only —
 * no backend is wired up).
 */
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('[type="submit"]');
    if (!submitBtn) return;

    // Validate all required fields
    const requiredFields = $$('[required]', contactForm);
    let isValid = true;

    requiredFields.forEach(field => {
      field.style.borderColor = '';
      if (!field.value.trim()) {
        isValid = false;
        field.style.borderColor = '#e07b7b';
        field.focus();
      }
    });

    if (!isValid) return;

    // Simulate sending state
    const originalContent = submitBtn.innerHTML;
    submitBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"
        style="animation: spin 0.8s linear infinite;">
        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
      </svg>
      <span>Sending…</span>
    `;
    submitBtn.disabled = true;

    // Inject spinner keyframes if not already present
    if (!document.querySelector('#spin-kf')) {
      const style = document.createElement('style');
      style.id = 'spin-kf';
      style.textContent = '@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }';
      document.head.appendChild(style);
    }

    setTimeout(() => {
      submitBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        <span>Message Sent!</span>
      `;
      submitBtn.style.background = '#4caf82';

      contactForm.reset();

      // Reset after 3s
      setTimeout(() => {
        submitBtn.innerHTML = originalContent;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
      }, 3000);
    }, 1600);
  });
}


/* ---------------------------------------------------------------
   11. REDUCED MOTION CHECK
   --------------------------------------------------------------- */
/**
 * If the user prefers reduced motion, disable the parallax
 * and marquee animations programmatically in addition to the
 * CSS media query, to be thorough.
 */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
  // Disable parallax
  window.removeEventListener('scroll', updateHeroParallax);
  if (heroBgImg) heroBgImg.style.transform = 'scale(1.08)';
}


/* ---------------------------------------------------------------
   END OF script.js
   --------------------------------------------------------------- */
