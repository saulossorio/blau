/* ============================================================
   BLAU — Utilities
   System-level interactivity: accordion, mobile nav, scroll,
   and active sidebar highlighting.

   BEM class names used:
     .blau-accordion__trigger.is-open
     .blau-accordion__body.is-open
     .blau-burger.is-open
     .blau-docs-mobile-nav.is-open / .blau-mobile-nav.is-open
     .blau-sidebar__nav a.is-active
   ============================================================ */

'use strict';


/* ── ACCORDION ──────────────────────────────────────────── */
function toggleAcc(btn) {
  const body   = btn.nextElementSibling;
  const isOpen = btn.classList.contains('is-open');
  btn.classList.toggle('is-open', !isOpen);
  btn.setAttribute('aria-expanded', String(!isOpen));
  body.classList.toggle('is-open', !isOpen);
}


/* ── MOBILE NAV ─────────────────────────────────────────── */
function toggleDsBurger() {
  const btn    = document.getElementById('dsBurgerBtn');
  const nav    = document.getElementById('dsMobNav');
  const isOpen = nav.classList.contains('is-open');
  btn.classList.toggle('is-open', !isOpen);
  nav.classList.toggle('is-open', !isOpen);
  btn.setAttribute('aria-expanded', String(!isOpen));
  nav.setAttribute('aria-hidden', String(isOpen));
  document.body.style.overflow = isOpen ? '' : 'hidden';
}

function closeDsNav() {
  const btn = document.getElementById('dsBurgerBtn');
  const nav = document.getElementById('dsMobNav');
  if (!btn || !nav) return;
  btn.classList.remove('is-open');
  nav.classList.remove('is-open');
  btn.setAttribute('aria-expanded', 'false');
  nav.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

/* Close mobile nav on Escape */
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDsNav(); });


/* ── SCROLL + ACTIVE NAV ─────────────────────────────────── */
function scrollDS(id) {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({
    top: el.getBoundingClientRect().top + window.scrollY - 80,
    behavior: 'smooth',
  });
}

const DS_IDS = [
  'foundation', 'type-scale', 'atomic', 'brand',
  'navigation', 'social', 'interactive', 'lists',
  'layout', 'motion', 'accessibility',
];

function updateDsNav() {
  const links = document.querySelectorAll('.blau-sidebar__nav a');
  let current = DS_IDS[0];
  DS_IDS.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 140) current = id;
  });
  links.forEach(a =>
    a.classList.toggle('is-active', a.getAttribute('href') === '#' + current)
  );
}

window.addEventListener('scroll', updateDsNav, { passive: true });
updateDsNav();
