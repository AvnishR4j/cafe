# ☕ Urban Brew Café — Premium Café Website

> A production-ready, client-grade café website built with semantic HTML5, modern CSS, and Vanilla JavaScript. No frameworks, no dependencies — just clean, performant code.

---

## 🖼 Preview

| Hero | Menu | Contact |
|---|---|---|
| Full-screen parallax hero with animated CTA | Filterable 8-item grid with hover effects | Split-layout contact form with live map |

---

## 📁 Project Structure

```
urban-brew-cafe/
├── index.html       ← Semantic HTML5 with ARIA accessibility
├── style.css        ← CSS Custom Properties + Grid/Flex + Animations
├── script.js        ← Vanilla JS (IntersectionObserver, Parallax, etc.)
└── README.md        ← This file
```

---

## ✨ Features

### Design
- **Premium dark theme** — Deep espresso blacks, warm cream tones, gold accents
- **High-end typography** — Cinzel (display) + Cormorant Garamond (editorial) + DM Sans (body)
- **High-quality photography** — Curated Unsplash images matching the café aesthetic
- **Animated marquee strip** — Scrolling values banner between hero and content

### UX & Interactions
- **Scroll-based reveal animations** — Powered by `IntersectionObserver` for peak performance
- **Parallax hero background** — Smooth, rAF-throttled depth effect
- **Filterable menu grid** — Tab-based category filtering with animated transitions
- **Sticky navigation** — Glassmorphism blur effect on scroll
- **Mobile-first hamburger menu** — Full-screen overlay with focus management
- **Back-to-top button** — Appears via IntersectionObserver, smooth scroll on click
- **Active nav highlighting** — Tracks currently visible section via IntersectionObserver
- **Contact form feedback** — Animated sending/success state (UI demo)

### Technical
- **Zero dependencies** — Pure HTML, CSS, and vanilla JavaScript
- **CSS Custom Properties** — Full design token system for easy theming
- **CSS Grid + Flexbox** — Responsive layout at every breakpoint
- **Semantic HTML5** — `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`, etc.
- **ARIA accessibility** — `aria-label`, `aria-expanded`, `role`, `aria-selected` throughout
- **Performance optimised** — `loading="lazy"` images, `fetchpriority="high"` on hero, rAF-throttled scroll
- **Reduced motion support** — CSS `prefers-reduced-motion` + JS check

---

## 🚀 Getting Started

No build step required. Simply open `index.html` in any modern browser.

```bash
# Clone or download the project
cd urban-brew-cafe

# Serve locally (recommended to avoid CORS issues with map embed)
npx serve .
# or
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

---

## 🎨 Customisation Guide

### Colours
All colours are defined as CSS Custom Properties in `:root` at the top of `style.css`:

```css
:root {
  --clr-espresso:  #b5874a;   /* Primary brand accent */
  --clr-cream:     #f2e8d9;   /* Primary text */
  --clr-bg:        #0d0b09;   /* Page background */
  /* ... */
}
```

Change `--clr-espresso` and `--clr-espresso-lt` to rebrand the entire site instantly.

### Fonts
Replace the Google Fonts `<link>` in `index.html` and update the font variables:

```css
:root {
  --font-display:   'Your Display Font', serif;
  --font-editorial: 'Your Editorial Font', serif;
  --font-body:      'Your Body Font', sans-serif;
}
```

### Menu Items
Add or edit menu cards in `index.html` inside `#menu-grid`. Each card uses:
- `data-category="coffee|food|cold"` — for the filter tabs
- `aria-label="Item Name"` — for accessibility

### Contact Info
Update the `contact-info` div in the Contact section and replace the Google Maps embed `src` with your location.

---

## 🧩 Sections

| # | Section | Description |
|---|---------|-------------|
| 1 | **Hero** | Full-screen parallax with tagline + CTAs |
| 2 | **Marquee** | Animated values strip |
| 3 | **About** | Image + story + stats |
| 4 | **Menu** | Filterable 8-card grid |
| 5 | **Values** | 4-column features grid |
| 6 | **Testimonials** | 3 customer review cards |
| 7 | **Contact** | Info + map + styled form |
| 8 | **Footer** | Brand + links + hours |

---

## ♿ Accessibility

- All interactive elements are keyboard-navigable
- Mobile menu uses `aria-controls`, `aria-expanded`, `aria-modal`
- Decorative images use `alt=""`, meaningful images have descriptive alt text
- Menu tabs use `role="tablist"` and `aria-selected`
- Testimonial ratings use `role="img"` with `aria-label`
- Google Maps iframe has a `title` attribute
- `prefers-reduced-motion` disables all animations for affected users
- Sufficient colour contrast ratios maintained throughout

---

## 🌿 Sustainability Theme

The site's content intentionally reflects real-world sustainable café values:
- Direct farm partnerships with above-fair-trade pricing
- Zero single-use plastic policy
- Reclaimed materials in interior design
- Composting and rainwater harvesting
- Community initiatives (pay-it-forward wall, free workspace)

---

## 📄 License

This project was created as a freelance client deliverable and portfolio piece. You are free to use it as a template or reference. Attribution appreciated but not required.

---

## 👤 Author

Built with precision and care by a senior frontend developer passionate about craft — both in code and in coffee.

---

*"Where every cup tells a story."* ☕
