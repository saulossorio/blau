# Blau — Design System v1.0

Design system behind Saúl Ossorio's portfolio. All tokens, components, and patterns in one place.

---

## Structure

```
blau/
├── index.html              ← live documentation + component examples
│
├── styles/
│   ├── variables.css       ← ALL CSS tokens (light + dark + high-contrast)
│   └── global.css          ← base reset, layout, and all component styles
│
├── scripts/
│   ├── utils.js            ← accordion, mobile nav, scroll, active states
│   ├── animations.js       ← motion demo replays + brand dot easter egg
│   └── theme.js            ← theme switching (light / dark / high-contrast)
│
├── tokens/
│   ├── core/               ← raw values (colors, spacing, typography)
│   ├── semantic/           ← meaning-based aliases (background, text, accent…)
│   └── themes/             ← per-theme overrides (light, dark, high-contrast)
│
├── components/             ← copy-paste ready HTML + CSS for each component
│   ├── button/             ← .pill, .pill-blue
│   ├── accordion/          ← .accordion-section, .accordion-trigger
│   ├── card/               ← .proj-cat-card
│   ├── social-tag/         ← .social-tag
│   ├── pill/               ← .label-tag, .hero-role-tag, .proj-type, .eyebrow
│   └── modal/              ← .img-modal-overlay (lightbox + carousel)
│
├── docs/
│   └── docs.css            ← documentation page chrome (.ds-* classes only)
│
├── examples/               ← real usage pages (to be added)
│
└── design/
    └── figma-link.txt      ← link to Figma source file
```

---

## How to use

### 1. Load the system CSS

```html
<link rel="stylesheet" href="styles/variables.css"/>
<link rel="stylesheet" href="styles/global.css"/>
```

### 2. Use tokens in your CSS

Always use CSS custom properties — never hardcode raw values:

```css
/* ✅ correct */
color: var(--text);
background: var(--blue-tint);
border: 1px solid var(--border);

/* ✗ avoid */
color: #1a1a1a;
background: rgba(0, 113, 197, .08);
```

### 3. Use component classes

Copy the HTML from any `components/*/component.html` and drop it in. All styles are already in `global.css`.

```html
<!-- Button pill -->
<a class="pill pill-blue" href="#">Get in touch</a>

<!-- Accordion -->
<div class="accordion-section">
  <button class="accordion-trigger" onclick="toggleAcc(this)" aria-expanded="false">
    <span class="acc-arrow">›</span>
    <span class="acc-label">Title</span>
  </button>
  <div class="accordion-body">
    <div class="accordion-inner">Content</div>
  </div>
</div>
```

### 4. Theme switching

Add `data-theme-toggle` to any button to wire it up automatically:

```html
<button data-theme-toggle>Toggle theme</button>
<script src="scripts/theme.js"></script>
```

Or call the API directly:

```js
blauTheme.setTheme('dark');          // 'light' | 'dark' | 'high-contrast'
blauTheme.cycleTheme();              // rotate through all three
blauTheme.getCurrentTheme();         // → 'light'
```

---

## Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--blue` | `#0071C5` | Primary accent, links, active states |
| `--blue-tint` | `rgba(0,113,197,.08)` | Backgrounds for selected/highlighted states |
| `--text` | `#1a1a1a` | Primary text |
| `--mid` | `#555555` | Secondary text, descriptions |
| `--light` | `#999999` | Tertiary text, labels, placeholders |
| `--border` | `#e0e0e0` | Dividers, input borders |
| `--bg-subtle` | `#f8f8f7` | Alternate surface, code blocks |
| `--font` | `'Open Sans'` | Body text |
| `--font-title` | `'Raleway'` | Headings, display text |

See `tokens/` for the full structured reference.

---

## Legacy files

`style.css` and `blau.css` at the root are the original pre-reorganization files. They are kept for reference but are no longer loaded by `index.html`. You can delete them once satisfied with the new structure.
