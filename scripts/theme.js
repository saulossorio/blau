/* ============================================================
   BLAU — Theme Switching
   Manages dark mode and high-contrast mode.
   Both controls work independently.

   Public API:
     blauTheme.toggleDark()          — flip dark mode on/off
     blauTheme.toggleHighContrast()  — flip high-contrast on/off
     blauTheme.isDark()              — returns boolean
     blauTheme.isHighContrast()      — returns boolean

   Persisted to localStorage. Default is always light.
   ============================================================ */

'use strict';

(function () {
  const LS_DARK = 'blau-dark';
  const LS_HC   = 'blau-hc';
  const ROOT    = document.documentElement;

  function isDark()         { return localStorage.getItem(LS_DARK) === 'true'; }
  function isHighContrast() { return localStorage.getItem(LS_HC)   === 'true'; }

  function _apply() {
    const hc   = isHighContrast();
    const dark = isDark();

    if (hc && dark)  ROOT.setAttribute('data-theme', 'dark-high-contrast');
    else if (hc)     ROOT.setAttribute('data-theme', 'high-contrast');
    else if (dark)   ROOT.setAttribute('data-theme', 'dark');
    else             ROOT.removeAttribute('data-theme');

    document.querySelectorAll('.blau-toggle').forEach(el => {
      const label = (el.getAttribute('aria-label') || '').toLowerCase();
      if (label.includes('dark'))          el.setAttribute('aria-checked', String(dark));
      else if (label.includes('contrast')) el.setAttribute('aria-checked', String(hc));
    });

    const mobDark = document.getElementById('mobDarkBtn');
    const mobHc   = document.getElementById('mobHcBtn');
    if (mobDark) mobDark.setAttribute('aria-pressed', String(dark));
    if (mobHc)   mobHc.setAttribute('aria-pressed', String(hc));
  }

  function toggleDark() {
    localStorage.setItem(LS_DARK, String(!isDark()));
    _apply();
  }

  function toggleHighContrast() {
    localStorage.setItem(LS_HC, String(!isHighContrast()));
    _apply();
  }

  window.blauTheme = {
    toggleDark, toggleHighContrast,
    isDark, isHighContrast
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _apply);
  } else {
    _apply();
  }
}());
