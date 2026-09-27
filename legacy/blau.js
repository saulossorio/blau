/* ============================================================
   BLAU.JS — Design System page scripts
   Loaded by: blau/index.html

   Functions:
     toggleAcc(btn)       — accordion open/close
     toggleDsBurger()     — mobile nav open/close
     closeDsNav()         — close mobile nav
     scrollDS(id)         — smooth scroll to section
     updateDsNav()        — highlight active sidebar link on scroll
     replayFadeUp()       — replay fadeUp motion demo
     replayDotPop()       — replay dotPop motion demo
     replayLine()         — replay growLine motion demo
     replayBounce()       — replay dot bounce demo
     replayNameReveal()   — replay mobile name-reveal demo
     IIFE: dot rage easter egg (section 4 Brand)
   ============================================================ */

'use strict';


/* ── ACCORDION ──────────────────────────────────────────── */
function toggleAcc(btn) {
  const body  = btn.nextElementSibling;
  const isOpen = btn.classList.contains('open');
  btn.classList.toggle('open', !isOpen);
  btn.setAttribute('aria-expanded', String(!isOpen));
  body.classList.toggle('open', !isOpen);
}


/* ── MOBILE NAV ─────────────────────────────────────────── */
function toggleDsBurger() {
  const btn    = document.getElementById('dsBurgerBtn');
  const nav    = document.getElementById('dsMobNav');
  const isOpen = nav.classList.contains('open');
  btn.classList.toggle('open', !isOpen);
  nav.classList.toggle('open', !isOpen);
  btn.setAttribute('aria-expanded', String(!isOpen));
  nav.setAttribute('aria-hidden', String(isOpen));
  document.body.style.overflow = isOpen ? '' : 'hidden';
}

function closeDsNav() {
  const btn = document.getElementById('dsBurgerBtn');
  const nav = document.getElementById('dsMobNav');
  btn.classList.remove('open');
  nav.classList.remove('open');
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
  const links = document.querySelectorAll('.sidebar-nav a');
  let current = DS_IDS[0];
  DS_IDS.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 140) current = id;
  });
  links.forEach(a =>
    a.classList.toggle('active', a.getAttribute('href') === '#' + current)
  );
}

window.addEventListener('scroll', updateDsNav, { passive: true });
updateDsNav();


/* ── MOTION REPLAYS ──────────────────────────────────────── */
function replayFadeUp() {
  const el = document.getElementById('demo-fadeup');
  el.style.animation = 'none';
  el.offsetHeight; // force reflow
  el.style.animation = 'ds-fadeUp .65s ease both';
}

function replayDotPop() {
  const el = document.getElementById('demo-dotpop');
  el.style.animation = 'none';
  el.offsetHeight; // force reflow
  el.style.animation = 'ds-dotPop .9s cubic-bezier(.22,.61,.36,1) both';
}

function replayLine() {
  const el = document.getElementById('demo-line');
  el.style.animation = 'none';
  el.style.width     = '0';
  el.style.opacity   = '0';
  el.offsetHeight; // force reflow
  el.style.animation = 'ds-growLine 2.5s cubic-bezier(.05,0,.15,1) forwards';
}

function replayBounce() {
  const el = document.getElementById('demo-bounce');
  if (el._a) el._a.cancel();
  el._a = el.animate(
    [
      { transform: 'scale(1)'    },
      { transform: 'scale(0.82)' },
      { transform: 'scale(1.06)' },
      { transform: 'scale(1)'    },
    ],
    { duration: 380, easing: 'cubic-bezier(.22,.61,.36,1)', fill: 'forwards' }
  );
}

function replayNameReveal() {
  const el = document.getElementById('demo-namereveal');
  el.style.transition = 'none';
  el.style.opacity    = '0';
  el.style.transform  = 'translateY(8px)';
  el.offsetHeight; // force reflow
  el.style.transition = 'opacity .4s ease, transform .4s ease';
  el.style.opacity    = '1';
  el.style.transform  = 'translateY(0)';
}

/* Auto-play motion demos on load */
window.addEventListener('load', () => {
  replayFadeUp();
  replayLine();
  replayNameReveal();
});


/* ── BRAND DOT DEMO — section 4 ──────────────────────────
   10 clicks = rage shake + snap back to blue.            */
(function () {
  const dot = document.getElementById('dsDot');
  if (!dot) return;

  const BASE = '#0071C5';
  const RAGE = '#EF5958';
  let anger     = 0;
  let coolTimer = null;
  let isCooling = false;

  /* Linear colour interpolation between two hex values */
  function lerp(a, b, t) {
    const p = (h, i) => parseInt(h.slice(i, i + 2), 16);
    const r  = Math.round(p(a, 1) + (p(b, 1) - p(a, 1)) * t);
    const g  = Math.round(p(a, 3) + (p(b, 3) - p(a, 3)) * t);
    const bl = Math.round(p(a, 5) + (p(b, 5) - p(a, 5)) * t);
    return '#' + [r, g, bl].map(v => v.toString(16).padStart(2, '0')).join('');
  }

  function applyColor(t) {
    dot.style.backgroundColor = lerp(BASE, RAGE, t);
  }

  function snapColorToBase() {
    dot.style.transition      = 'none';
    dot.style.backgroundColor = BASE;
    setTimeout(() => { dot.style.transition = 'background-color 1s ease'; }, 50);
  }

  function triggerPulse() {
    dot.animate(
      [
        { transform: 'scale(1)'    },
        { transform: 'scale(0.82)' },
        { transform: 'scale(1.08)' },
        { transform: 'scale(0.97)' },
        { transform: 'scale(1)'    },
      ],
      { duration: 350, easing: 'cubic-bezier(.22,.61,.36,1)', fill: 'forwards' }
    );
  }

  function triggerShake(onDone) {
    const anim = dot.animate(
      [
        { transform: 'scale(1)    rotate(0)'     },
        { transform: 'scale(1.18) rotate(-14deg)' },
        { transform: 'scale(0.88) rotate(12deg)'  },
        { transform: 'scale(1.14) rotate(-10deg)' },
        { transform: 'scale(0.92) rotate(8deg)'   },
        { transform: 'scale(1.07) rotate(-5deg)'  },
        { transform: 'scale(0.97) rotate(3deg)'   },
        { transform: 'scale(1.02) rotate(-1deg)'  },
        { transform: 'scale(1)    rotate(0)'      },
      ],
      { duration: 650, easing: 'cubic-bezier(.22,.61,.36,1)', fill: 'forwards' }
    );
    anim.finished.then(onDone).catch(() => {});
  }

  dot.addEventListener('click', () => {
    if (isCooling) return;
    anger = Math.min(anger + 1, 10);
    applyColor(anger / 10);
    triggerPulse();
    clearTimeout(coolTimer);
    coolTimer = setTimeout(() => {
      isCooling = true;
      if (anger >= 10) {
        triggerShake(() => {
          anger = 0;
          snapColorToBase();
          isCooling = false;
        });
      } else {
        anger     = 0;
        applyColor(0);
        isCooling = false;
      }
    }, 2000);
  });
}());
