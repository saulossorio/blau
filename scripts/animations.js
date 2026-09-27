/* ============================================================
   BLAU — Motion Demos
   Replay functions for the documentation page motion section.
   Also contains the brand dot easter egg (section: Brand).

   Functions:
     replayFadeUp()      — replay ds-fadeUp animation
     replayDotPop()      — replay ds-dotPop animation
     replayLine()        — replay ds-growLine animation
     replayBounce()      — replay bounce via Web Animations API
     replayNameReveal()  — replay mobile name-reveal transition
   ============================================================ */

'use strict';


/* ── MOTION REPLAYS ──────────────────────────────────────── */
function replayFadeUp() {
  const el = document.getElementById('demo-fadeup');
  if (!el) return;
  el.style.animation = 'none';
  el.offsetHeight; // force reflow
  el.style.animation = 'ds-fadeUp .65s ease both';
}

function replayDotPop() {
  const el = document.getElementById('demo-dotpop');
  if (!el) return;
  el.style.animation = 'none';
  el.offsetHeight; // force reflow
  el.style.animation = 'ds-dotPop .9s cubic-bezier(.22,.61,.36,1) both';
}

function replayLine() {
  const el = document.getElementById('demo-line');
  if (!el) return;
  el.style.animation = 'none';
  el.style.width     = '0';
  el.style.opacity   = '0';
  el.offsetHeight; // force reflow
  el.style.animation = 'ds-growLine 2.5s cubic-bezier(.05,0,.15,1) forwards';
}

function replayBounce() {
  const el = document.getElementById('demo-bounce');
  if (!el) return;
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
  if (!el) return;
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


/* ── BRAND DOT EASTER EGG ──────────────────────────────────── */

/* 10 clicks → rage shake + fast fade back to blue */
(function () {
  const dots = document.querySelectorAll('#dsDot, .blau-dot--nav');
  if (!dots.length) return;

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

  /* Apply color only to the clicked dot */
  function applyColor(dot, t) {
    dot.style.backgroundColor = lerp(BASE, RAGE, t);
  }

  /* Reset to blue with a fast fade (no abrupt jump) */
  function snapColorToBase(dot) {
    dot.style.transition = 'background-color 0.25s ease';
    dot.style.backgroundColor = BASE;

    setTimeout(() => {
      dot.style.transition = 'background-color 1s ease';
    }, 250);
  }

  /* Click feedback animation */
  function triggerPulse(dot) {
    dot.animate(
      [
        { transform: 'scale(1)' },
        { transform: 'scale(0.82)' },
        { transform: 'scale(1.08)' },
        { transform: 'scale(0.97)' },
        { transform: 'scale(1)' },
      ],
      { duration: 350, easing: 'cubic-bezier(.22,.61,.36,1)', fill: 'forwards' }
    );
  }

  /* Rage shake when max clicks reached */
  function triggerShake(dot, onDone) {
    const anim = dot.animate(
      [
        { transform: 'scale(1) rotate(0)' },
        { transform: 'scale(1.18) rotate(-14deg)' },
        { transform: 'scale(0.88) rotate(12deg)' },
        { transform: 'scale(1.14) rotate(-10deg)' },
        { transform: 'scale(0.92) rotate(8deg)' },
        { transform: 'scale(1.07) rotate(-5deg)' },
        { transform: 'scale(0.97) rotate(3deg)' },
        { transform: 'scale(1.02) rotate(-1deg)' },
        { transform: 'scale(1) rotate(0)' },
      ],
      { duration: 650, easing: 'cubic-bezier(.22,.61,.36,1)', fill: 'forwards' }
    );

    anim.finished.then(onDone).catch(() => {});
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      if (isCooling) return;

      anger = Math.min(anger + 1, 10);
      applyColor(dot, anger / 10);

      triggerPulse(dot);

      clearTimeout(coolTimer);
      coolTimer = setTimeout(() => {
        isCooling = true;

        if (anger >= 10) {
          triggerShake(dot, () => {
            anger = 0;
            snapColorToBase(dot);
            isCooling = false;
          });
        } else {
          anger = 0;
          applyColor(dot, 0);
          isCooling = false;
        }
      }, 2000);
    });
  });

}());