# PIMCO Celtics — Local Recreation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Recreate https://celtics.pimco.com as a static local site using plain HTML, CSS, and JavaScript — no build tools, no frameworks — viewable by opening `index.html` in a browser.

**Architecture:** Single `index.html` file with all markup. `style.css` for all styles (no Tailwind dependency). `script.js` for the carousel interaction. All binary assets (video, image, font, favicon) downloaded to `assets/`.

**Tech Stack:** Vanilla HTML5 / CSS3 / JavaScript (ES6). Google Fonts (Roboto via CDN). Brightcove Player embed (via CDN script tag). Custom font Senhan loaded via `@font-face`.

---

## Visual Reference

Sections (top to bottom, total page height ~4,979px at 1440px):

1. **Hero** — fullscreen video bg, gradient overlays, nav bar, "Two legacies built over decades", subtitle, Scroll button
2. **Partners in Performance** — 2-col: text left, Brightcove video right
3. **Performance Leaderboard** — green→navy gradient bg, "A performance leaderboard" title, 5-slide carousel (Celtics vs PIMCO stats)
4. **The Full Force of PIMCO** — full-bleed bg image with overlays, "The full force of PIMCO behind you", 2×2 feature card grid
5. **ETFs + Learn More** — 2-col: dark blue left (ETF list), light right (PIMCO links)
6. **Footer** — legal disclosures text

---

## Color & Typography

```
--green:        #007A33    (Celtics green)
--navy:         #022D5E    (deep navy)
--blue:         #0057B8    (PIMCO blue, rgba(0,87,184,0.98))
--accent:       #000BCC    (bright blue, links/strokes)
--surface:      hsl(204,22%,95%)   (light blue-gray bg)
--text-secondary: hsl(212,96%,19%) (dark navy text, ~#022D5E)
--separator:    #B7B9BB

Fonts:
  Senhan (font-family: 'Senhan', serif)  → headings/display text
  Roboto (via Google Fonts CDN)          → body text

Breakpoints: 600px (sm), 900px (md), 1200px (lg), 1536px (xl)
```

---

## Task 1: Project structure & asset downloads

**Files:**
- Create: `assets/` directory
- Download: all binary assets from live site

**Step 1: Create directory structure**
```bash
mkdir -p /Users/jtr/Projects/pimco-celtics/assets
```

**Step 2: Download all assets**
```bash
cd /Users/jtr/Projects/pimco-celtics/assets

curl -s "https://celtics.pimco.com/assets/favicon.ico" -o favicon.ico
curl -s "https://celtics.pimco.com/assets/Senhan-Regular-Bc1TB81J.otf" -o Senhan-Regular.otf
curl -s "https://celtics.pimco.com/assets/full-force--abRLgEW.png" -o full-force.png
curl -s "https://celtics.pimco.com/assets/hero_video-euq1i65f.mp4" -o hero_video.mp4 --limit-rate 5m
```

(The video is large — expected ~50-100MB. `--limit-rate` prevents hammering the CDN.)

**Step 3: Verify downloads**
```bash
ls -lh /Users/jtr/Projects/pimco-celtics/assets/
```
Expected: favicon.ico, Senhan-Regular.otf, full-force.png, hero_video.mp4 — all non-zero size.

---

## Task 2: Create `style.css`

**File:** Create: `style.css`

Write the complete stylesheet. Key sections:

```css
/* ── Reset & base ── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { font-family: 'Roboto', sans-serif; overflow-x: hidden; color: #022D5E; }

/* ── @font-face ── */
@font-face {
  font-family: 'Senhan';
  src: url('assets/Senhan-Regular.otf') format('opentype');
  font-weight: normal;
  font-style: normal;
}

/* ── Google Fonts import ── */
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');

/* ── CSS custom properties ── */
:root {
  --green: #007A33;
  --navy: #022D5E;
  --blue: rgba(0, 87, 184, 0.98);
  --accent: #000BCC;
  --surface: hsl(204, 22%, 95%);
  --text-secondary: hsl(212, 96%, 19%);
  --separator: #B7B9BB;
  --max-w: 1200px;
}

/* ── Typography scale (matches Tailwind config) ── */
.text-2xl  { font-size: 64px; line-height: 1.13; }
.text-3xl  { font-size: 80px; }
.text-xl   { font-size: 44px; }
.text-large{ font-size: 32px; line-height: 1.41; }
.text-base { font-size: 24px; line-height: 1.32; }

/* ── Section styles (hero, intro, leaderboard, full-force, etfs, footer) ── */
/* ... full rules for each section as detailed below ... */
```

The complete CSS covers all sections with responsive rules at 600px, 900px, 1200px breakpoints.

---

## Task 3: Create `index.html` — skeleton & head

**File:** Create: `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>PIMCO Celtics Sponsorship | PIMCO</title>
  <meta name="title" content="PIMCO Boston Celtics Sponsorship | PIMCO">
  <meta name="description" content="Discover PIMCO's Boston Celtics sponsorship and our shared commitment to performance, teamwork, and excellence in fixed income investing.">
  <link rel="icon" href="assets/favicon.ico">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <!-- sections go here -->
  <script src="script.js"></script>
</body>
</html>
```

---

## Task 4: Hero section HTML

Add inside `<body>`, before `<script>`:

```html
<header class="hero">
  <video class="hero__video" autoplay muted loop playsinline>
    <source src="assets/hero_video.mp4" type="video/mp4">
  </video>
  <!-- Gradient overlays -->
  <div class="hero__gradient-blue"></div>
  <div class="hero__gradient-green"></div>

  <!-- Nav bar -->
  <nav class="hero__nav">
    <a href="https://pimco.com" class="hero__logo" aria-label="PIMCO x Celtics logo">
      <!-- PIMCO x Celtics inline SVG (334×51) -->
      <svg width="334" height="51" viewBox="0 0 334 51" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- X symbol path -->
        <path d="M250.471 34L250.345 33.478L250.777 33.406C250.885 33.388 251.353 33.046 251.443 32.956L254.935 28.15L251.281 22.534C251.155 22.408 250.795 22.12 250.705 22.102L250.381 22.048L250.507 21.508H253.999L254.125 22.048L254.017 22.084C253.855 22.156 253.819 22.354 253.927 22.534L256.321 26.278L258.985 22.57C259.129 22.336 259.075 22.12 258.877 22.084L258.679 22.048L258.805 21.508H260.821L260.947 22.048L260.515 22.12C260.407 22.138 260.029 22.39 259.885 22.534L256.717 26.89L260.803 32.974C260.929 33.1 261.343 33.424 261.433 33.442L261.649 33.478L261.523 34H258.031L257.905 33.478L258.013 33.442C258.229 33.37 258.301 33.154 258.157 32.938L255.331 28.762L252.379 32.848C252.181 33.154 252.253 33.424 252.541 33.46L252.667 33.478L252.541 34H250.471Z" fill="white"/>
        <!-- Celtics ball path -->
        <path d="M309.67 1.00914C295.87 0.639603 284.38 11.5294 284.009 25.3298C283.64 39.1302 294.529 50.6213 308.33 50.9908C322.13 51.3613 333.621 40.4706 333.991 26.6702C334.361 12.8698 323.471 1.37965 309.67 1.00914Z..." fill="white"/>
        <!-- PIMCO wordmark (clipped group) -->
        <g clip-path="url(#logo-clip)">
          <path d="M160.829 48C148.911 48 140.64 39.411 140.64 27.0887..." fill="white"/>
        </g>
        <defs>
          <clipPath id="logo-clip">
            <rect width="77" height="108"/>
          </clipPath>
        </defs>
      </svg>
    </a>
    <div class="hero__nav-tagline">
      <span class="font-black">PARTNERS</span> IN<br>
      <span class="tracking-wide">PERFORMANCE</span>
    </div>
    <div></div><!-- spacer for 3-col grid -->
  </nav>

  <!-- Hero content -->
  <div class="hero__content">
    <h1 class="hero__title">Two legacies built<br>over decades</h1>
    <p class="hero__subtitle">PIMCO is the Official Investment Management Partner of the Boston Celtics</p>
    <a href="#content" class="hero__scroll">
      <span>Scroll</span>
      <!-- chevron SVG -->
      <svg width="46" height="22" viewBox="0 0 46 21" fill="none">
        <path d="M1 1L23.6932 21L46 1" stroke="white" stroke-width="2"/>
      </svg>
    </a>
  </div>
</header>
```

Hero CSS:
```css
.hero {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #000;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hero__video {
  position: absolute;
  top: 0;
  width: 100vw;
  min-width: 1728px;
  z-index: 0;
}
.hero__gradient-blue {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 50%;
  background: linear-gradient(to bottom,
    rgba(0,87,184,0.98) 0%,
    rgba(0,39,82,0) 100%);
  z-index: 10;
}
.hero__gradient-green {
  position: absolute;
  top: 0; left: 0;
  width: 33.333%;
  height: 100%;
  background: linear-gradient(90deg,
    rgba(0,122,51,0.7) -12.23%,
    rgba(0,122,51,0) 100%);
  z-index: 10;
}
.hero__nav {
  position: absolute;
  top: 0; left: 0; right: 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  padding: 20px 40px;
  z-index: 20;
}
.hero__nav-tagline {
  text-align: center;
  color: white;
  font-size: 15px;
  letter-spacing: 4.8px;
  line-height: 1.4;
  text-transform: uppercase;
}
.hero__content {
  position: relative;
  z-index: 20;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  text-align: center;
  margin: 0 32px;
  padding-top: 180px; /* account for nav */
}
@media (min-width: 600px) {
  .hero__content { padding-top: 0; margin-top: 0; }
}
.hero__title {
  font-family: 'Senhan', serif;
  font-size: 40px;
  line-height: 1.25;
  color: white;
}
@media (min-width: 900px) {
  .hero__title { font-size: 64px; line-height: 1.13; }
}
.hero__subtitle {
  font-size: 18px;
  font-weight: 300;
  color: white;
  max-width: 480px;
  line-height: 1.4;
}
.hero__scroll {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: white;
  text-decoration: none;
  font-size: 15px;
  letter-spacing: 4.8px;
  font-weight: 900;
  margin-top: 20px;
}
```

---

## Task 5: Partners in Performance section HTML

This section: white/light bg, 2-col (text | Brightcove video player).

The Brightcove embed uses an `<iframe>` or player script. Use the standard Brightcove iframe embed:

```html
<section id="content" class="partners">
  <div class="partners__inner">
    <!-- Left: text -->
    <div class="partners__text">
      <h2 class="partners__heading">
        <span class="font-black">PARTNERS</span> IN<br>
        <span class="tracking-wide">PERFORMANCE</span>
      </h2>
      <p class="partners__body">
        A legendary basketball franchise. A global leader in fixed income.
        Two teams that excel in very different arenas, yet share the same
        commitment to high performance.
      </p>
    </div>
    <!-- Right: Brightcove video player -->
    <div class="partners__video">
      <div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;">
        <iframe
          src="https://players.brightcove.net/3895904614001/default_default/index.html?videoId=6383535875112"
          allowfullscreen
          style="position:absolute;top:0;left:0;width:100%;height:100%;border:none;"
        ></iframe>
      </div>
    </div>
  </div>
</section>
```

CSS:
```css
.partners {
  display: flex;
  justify-content: center;
  padding: 40px 20px;
}
.partners__inner {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 1536px; /* xl:container */
  align-items: center;
}
@media (min-width: 900px) {
  .partners__inner {
    flex-direction: row;
    justify-content: space-between;
    padding: 80px 0;
    gap: 0;
  }
}
.partners__text {
  display: flex;
  flex-direction: column;
  gap: 40px;
  max-width: 490px;
  padding: 48px 40px;
}
.partners__heading {
  display: none; /* hidden on mobile per original */
  font-size: 36px;
  font-weight: 300;
  letter-spacing: 6.4px;
  color: var(--text-secondary);
  line-height: 1.11;
  text-transform: uppercase;
}
@media (min-width: 600px) {
  .partners__heading { display: block; font-size: 48px; letter-spacing: 9.6px; line-height: 54px; }
}
.partners__body {
  font-size: 21px;
  font-weight: 300;
  color: inherit;
  line-height: 1.5;
}
@media (min-width: 600px) {
  .partners__body { font-size: 32px; line-height: 45px; }
}
.partners__video {
  width: 100%;
  max-width: 765px;
}
```

---

## Task 6: Performance Leaderboard section HTML

Green-to-navy gradient bg, title, 5-slide carousel.

```html
<section class="leaderboard">
  <p class="leaderboard__title">A performance leaderboard</p>

  <div class="carousel" role="region" aria-label="Performance leaderboard carousel">
    <p class="sr-only">This is a carousel. Use Next and Previous buttons to navigate, or jump to a slide with the slide dots.</p>

    <!-- Slides wrapper -->
    <div class="carousel__viewport">
      <div class="carousel__track" id="carouselTrack">

        <!-- Slide 1 -->
        <div class="carousel__slide">
          <div class="carousel__col">
            <span class="carousel__label">CELTICS</span>
            <p class="carousel__stat">The most successful team in <strong>basketball history</strong></p>
          </div>
          <div class="carousel__divider"></div>
          <div class="carousel__col">
            <span class="carousel__label">PIMCO</span>
            <p class="carousel__stat">A global powerhouse in <strong>fixed income</strong></p>
          </div>
        </div>

        <!-- Slide 2 -->
        <div class="carousel__slide">
          <div class="carousel__col">
            <span class="carousel__label">CELTICS</span>
            <p class="carousel__stat">A record <strong>18</strong> championships</p>
          </div>
          <div class="carousel__divider"></div>
          <div class="carousel__col">
            <span class="carousel__label">PIMCO</span>
            <p class="carousel__stat">Shaped the <strong>history</strong> of modern bond investing</p>
          </div>
        </div>

        <!-- Slide 3 -->
        <div class="carousel__slide">
          <div class="carousel__col">
            <span class="carousel__label">CELTICS</span>
            <p class="carousel__stat">The only team to win <strong>8</strong> consecutive titles</p>
          </div>
          <div class="carousel__divider"></div>
          <div class="carousel__col">
            <span class="carousel__label">PIMCO</span>
            <p class="carousel__stat">A driving force behind fixed income <strong>innovations</strong></p>
          </div>
        </div>

        <!-- Slide 4 -->
        <div class="carousel__slide">
          <div class="carousel__col">
            <span class="carousel__label">CELTICS</span>
            <p class="carousel__stat">The <strong>most recorded</strong> wins of any basketball franchise</p>
          </div>
          <div class="carousel__divider"></div>
          <div class="carousel__col">
            <span class="carousel__label">PIMCO</span>
            <p class="carousel__stat">An <strong>acclaimed lineup</strong> of financial thought leaders</p>
          </div>
        </div>

        <!-- Slide 5 -->
        <div class="carousel__slide">
          <div class="carousel__col">
            <span class="carousel__label">CELTICS</span>
            <p class="carousel__stat"><strong>41</strong> Celtics in the Basketball Hall of Fame</p>
          </div>
          <div class="carousel__divider"></div>
          <div class="carousel__col">
            <span class="carousel__label">PIMCO</span>
            <p class="carousel__stat">A <strong>front row</strong> seat in the world's financial market</p>
          </div>
        </div>

      </div><!-- /carousel__track -->
    </div><!-- /carousel__viewport -->

    <!-- Prev/Next buttons -->
    <button class="carousel__btn carousel__btn--prev" aria-label="Previous slide">
      <svg width="35" height="66" viewBox="0 0 35 66" fill="none">
        <path d="M32 63L5 32.7403L32 3" stroke="white" stroke-width="2"/>
      </svg>
    </button>
    <button class="carousel__btn carousel__btn--next" aria-label="Next slide">
      <svg width="35" height="66" viewBox="0 0 35 66" fill="none">
        <path d="M3 63L30 32.7403L3 3" stroke="white" stroke-width="2"/>
      </svg>
    </button>

    <!-- Dot navigation -->
    <div class="carousel__dots" role="tablist">
      <button class="carousel__dot carousel__dot--active" aria-label="Go to slide 1" aria-current="true"></button>
      <button class="carousel__dot" aria-label="Go to slide 2"></button>
      <button class="carousel__dot" aria-label="Go to slide 3"></button>
      <button class="carousel__dot" aria-label="Go to slide 4"></button>
      <button class="carousel__dot" aria-label="Go to slide 5"></button>
    </div>
  </div>
</section>
```

CSS:
```css
.leaderboard {
  background: linear-gradient(180deg, #007A33 0%, #022D5E 100%);
  padding: 70px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  min-height: 600px;
}
.leaderboard__title {
  font-family: 'Senhan', serif;
  font-size: 40px;
  color: white;
  text-align: center;
}
@media (min-width: 900px) {
  .leaderboard__title { font-size: 64px; }
}
/* Carousel */
.carousel { position: relative; width: 100%; max-width: 1200px; overflow: hidden; }
.carousel__viewport { overflow: hidden; }
.carousel__track {
  display: flex;
  transition: transform 0.4s ease;
}
.carousel__slide {
  flex: 0 0 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 16px;
  padding: 40px 60px;
  min-height: 220px;
}
.carousel__col {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  text-align: center;
}
.carousel__label {
  font-size: 15px;
  letter-spacing: 4.8px;
  color: white;
  font-weight: 900;
}
.carousel__stat {
  font-size: 21px;
  font-weight: 300;
  color: white;
  line-height: 1.4;
}
@media (min-width: 600px) {
  .carousel__stat { font-size: 32px; line-height: 45px; }
}
.carousel__stat strong { font-weight: 700; }
.carousel__divider {
  width: 1px;
  height: 120px;
  background: rgba(183,185,187,0.4);
  flex-shrink: 0;
}
.carousel__btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
}
.carousel__btn--prev { left: 10px; }
.carousel__btn--next { right: 10px; }
@media (min-width: 600px) {
  .carousel__btn--prev { left: 0; }
  .carousel__btn--next { right: 0; }
}
.carousel__dots {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 24px;
}
.carousel__dot {
  width: 10px; height: 10px;
  border-radius: 50%;
  border: 2px solid white;
  background: transparent;
  cursor: pointer;
  padding: 0;
}
.carousel__dot--active { background: white; }
```

---

## Task 7: "The Full Force of PIMCO" section HTML

Background image + overlays, heading, 2×2 feature card grid.

```html
<section class="full-force" style="background-image: url('assets/full-force.png')">
  <div class="full-force__gradient-blue"></div>
  <div class="full-force__gradient-green"></div>

  <h2 class="full-force__title">The full force of PIMCO behind you</h2>

  <div class="full-force__grid">

    <!-- Card 1 -->
    <div class="feature-card">
      <div class="feature-card__icon">
        <!-- Scoreboard/document icon SVG (104×104) -->
        <svg viewBox="0 0 104 104" fill="none" xmlns="http://www.w3.org/2000/svg" width="70" height="70">
          <path d="M84.045 15.133H60.9L45.76.893a3.3 3.3 0 0 0-4.52 0l-15.132 14.24H2.955c-1.63 0-2.955 1.335-2.955 2.98v82.967c0 1.645 1.325 2.98 2.955 2.98h81.09c1.63 0 2.955-1.335 2.955-2.98V18.113c0-1.645-1.325-2.98-2.955-2.98z" fill="white" fill-opacity="0.2" stroke="white" stroke-width="1.5"/>
          <line x1="52.861" y1="41.416" x2="73.06" y2="41.416" stroke="white" stroke-width="1.5"/>
          <line x1="52.861" y1="48.244" x2="66.296" y2="48.244" stroke="white" stroke-width="1.5"/>
          <line x1="52.861" y1="55.072" x2="73.06" y2="55.072" stroke="white" stroke-width="1.5"/>
          <line x1="52.861" y1="61.899" x2="68.548" y2="61.899" stroke="white" stroke-width="1.5"/>
          <circle cx="29" cy="55" r="20" stroke="white" stroke-width="1.5"/>
        </svg>
      </div>
      <div class="feature-card__text">
        <h3 class="feature-card__title">Helping bond investors play offense and defense</h3>
        <p class="feature-card__body">PIMCO pioneered active bond management. Today, investors rely on our decades of expertise to navigate even the toughest markets.</p>
      </div>
    </div>

    <!-- Card 2 -->
    <div class="feature-card">
      <div class="feature-card__icon">
        <!-- Globe/person icon (108×108) -->
        <svg viewBox="0 0 108 108" fill="none" xmlns="http://www.w3.org/2000/svg" width="70" height="70">
          <circle cx="54" cy="30" r="18" stroke="white" stroke-width="1.5"/>
          <path d="M10 98c0-24.3 19.7-44 44-44s44 19.7 44 44" stroke="white" stroke-width="1.5"/>
        </svg>
      </div>
      <div class="feature-card__text">
        <h3 class="feature-card__title">Partnering with investors on their game plan</h3>
        <p class="feature-card__body">Our presence across the Americas, Europe and Asia brings the power of a single unified platform to our client partnerships.</p>
      </div>
    </div>

    <!-- Card 3 -->
    <div class="feature-card">
      <div class="feature-card__icon">
        <!-- Upward arrow/chart icon (90×90) -->
        <svg viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg" width="70" height="70">
          <circle cx="45" cy="45" r="40" stroke="white" stroke-width="1.5"/>
          <path d="M25 55 L45 30 L65 55" stroke="white" stroke-width="2"/>
        </svg>
      </div>
      <div class="feature-card__text">
        <h3 class="feature-card__title">Taking fixed income further</h3>
        <p class="feature-card__body">The assets entrusted to us by our clients have helped make us a world leader in traditional and cutting-edge investment strategies.</p>
      </div>
    </div>

    <!-- Card 4 -->
    <div class="feature-card">
      <div class="feature-card__icon">
        <!-- Binoculars/wide-angle icon (95×95) -->
        <svg viewBox="0 0 95 95" fill="none" xmlns="http://www.w3.org/2000/svg" width="70" height="70">
          <circle cx="25" cy="55" r="20" stroke="white" stroke-width="1.5"/>
          <circle cx="70" cy="55" r="20" stroke="white" stroke-width="1.5"/>
          <path d="M45 55 L47.5 20 L50 55" stroke="white" stroke-width="1.5"/>
        </svg>
      </div>
      <div class="feature-card__text">
        <h3 class="feature-card__title">A wide-angle view of opportunities</h3>
        <p class="feature-card__body">Our scale and reach give us a unique vantage point – seeing and comparing opportunities across public and private markets to benefit clients.</p>
      </div>
    </div>

  </div><!-- /full-force__grid -->
</section>
```

**Note on icons:** The actual icon SVG paths from the JS bundle are very complex (100+ point paths). The above uses simplified placeholder shapes. During implementation, extract the exact paths from `/tmp/page_chunk.js` for pixel-perfect accuracy. The full paths are embedded at offset ~175367 in the JS file.

CSS:
```css
.full-force {
  position: relative;
  min-height: 110vh;
  background-size: cover;
  background-position: center;
  background-color: rgba(0,0,0,0.65);
  background-blend-mode: overlay;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  padding: 40px 20px;
}
.full-force__gradient-blue {
  position: absolute; top: 0; left: 0; right: 0; height: 50%;
  background: linear-gradient(to bottom, rgba(0,87,184,0.98) 0%, rgba(0,39,82,0) 100%);
  z-index: 0;
}
.full-force__gradient-green {
  position: absolute; top: 0; left: 0; width: 33.333%; height: 100%;
  background: linear-gradient(90deg, rgba(0,122,51,0.7) -12.23%, rgba(0,122,51,0) 100%);
  z-index: 0;
}
.full-force__title {
  position: relative; z-index: 1;
  font-family: 'Senhan', serif;
  font-size: 40px;
  color: white;
  text-align: center;
  max-width: 680px;
}
@media (min-width: 1200px) {
  .full-force__title { font-size: 64px; }
}
.full-force__grid {
  position: relative; z-index: 1;
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  width: 100%;
  max-width: 1200px;
}
@media (min-width: 900px) {
  .full-force__grid { grid-template-columns: 1fr 1fr; }
}
.feature-card { display: flex; flex-direction: column; gap: 16px; }
.feature-card__title {
  font-size: 21px; font-weight: 700; color: white;
}
@media (min-width: 600px) {
  .feature-card__title { font-size: 32px; }
}
.feature-card__body {
  font-size: 18px; font-weight: 300; color: white; line-height: 1.5;
}
@media (min-width: 600px) {
  .feature-card__body { font-size: 24px; line-height: 1.44; }
}
```

---

## Task 8: ETFs + Learn More section HTML

2-col layout: dark blue left (ETF tickers + links), light right (PIMCO nav links).

```html
<section class="etfs-links">
  <!-- Left col: ETFs -->
  <div class="etfs">
    <div class="etfs__text">
      <h2 class="etfs__title">ETFs tested<br>by time and<br>markets</h2>
      <p class="etfs__subtitle">PIMCO has been the defining standard in bond ETFs for over a decade.</p>
    </div>
    <ul class="etfs__list">
      <li class="etf-item">
        <a href="https://www.pimco.com/us/en/investments/etf/pimco-enhanced-short-maturity-active-exchange-traded-fund/usetf-usd" class="etf-item__link">
          <span class="etf-item__ticker">MINT</span>
          <svg class="etf-item__arrow" width="30" height="30" viewBox="0 0 35 66" fill="none">
            <path d="M3 63L30 32.7403L3 3" stroke="white" stroke-width="2"/>
          </svg>
        </a>
      </li>
      <li class="etf-item">
        <a href="https://www.pimco.com/us/en/investments/etf/pimco-active-bond-exchange-traded-fund/usetf-usd" class="etf-item__link">
          <span class="etf-item__ticker">BOND</span>
          <svg class="etf-item__arrow" width="30" height="30" viewBox="0 0 35 66" fill="none">
            <path d="M3 63L30 32.7403L3 3" stroke="white" stroke-width="2"/>
          </svg>
        </a>
      </li>
      <li class="etf-item">
        <a href="https://www.pimco.com/us/en/investments/etf/pimco-multisector-bond-active-exchange-traded-fund/usetf-usd" class="etf-item__link">
          <span class="etf-item__ticker">PYLD</span>
          <svg class="etf-item__arrow" width="30" height="30" viewBox="0 0 35 66" fill="none">
            <path d="M3 63L30 32.7403L3 3" stroke="white" stroke-width="2"/>
          </svg>
        </a>
      </li>
    </ul>
  </div>

  <!-- Right col: PIMCO links -->
  <div class="pimco-links">
    <p class="pimco-links__title">Learn more<br>about PIMCO</p>
    <ul class="pimco-links__list">
      <li class="pimco-link-item">
        <a href="https://www.pimco.com/us/en/about-us" class="pimco-link-item__link">
          About Us
          <svg width="30" height="30" viewBox="0 0 35 66" fill="none">
            <path d="M3 63L30 32.7403L3 3" stroke="#000BCC" stroke-width="2"/>
          </svg>
        </a>
      </li>
      <li class="pimco-link-item">
        <a href="https://www.pimco.com/us/en/investment-strategies/investment-strategies" class="pimco-link-item__link">
          Strategies
          <svg width="30" height="30" viewBox="0 0 35 66" fill="none">
            <path d="M3 63L30 32.7403L3 3" stroke="#000BCC" stroke-width="2"/>
          </svg>
        </a>
      </li>
      <li class="pimco-link-item">
        <a href="https://www.pimco.com/us/en/about-us/our-process" class="pimco-link-item__link">
          Investment Process
          <svg width="30" height="30" viewBox="0 0 35 66" fill="none">
            <path d="M3 63L30 32.7403L3 3" stroke="#000BCC" stroke-width="2"/>
          </svg>
        </a>
      </li>
    </ul>
  </div>
</section>
```

CSS:
```css
.etfs-links {
  display: flex;
  flex-direction: column;
  min-height: 820px;
}
@media (min-width: 900px) {
  .etfs-links { flex-direction: row; }
}
.etfs {
  background: var(--navy); /* bg-accented = dark blue #022D5E */
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 40px;
  padding: 40px 48px;
  flex: 1;
}
.etfs__title {
  font-family: 'Senhan', serif;
  font-size: 40px;
  color: white;
  line-height: 1.25;
}
@media (min-width: 900px) {
  .etfs__title { font-size: 64px; }
}
.etfs__subtitle {
  font-size: 18px;
  color: white;
  font-weight: 300;
}
.etfs__list { list-style: none; display: flex; flex-direction: column; gap: 0; }
.etf-item { border-bottom: 1px solid rgba(183,185,187,0.4); }
.etf-item:last-child { border-bottom: none; }
.etf-item__link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  text-decoration: none;
  color: white;
  font-size: 20px;
  font-weight: 700;
}
@media (min-width: 600px) {
  .etf-item__link { font-size: 24px; }
}
.pimco-links {
  background: var(--surface);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 40px;
  padding: 40px 48px;
  flex: 1;
}
.pimco-links__title {
  font-family: 'Senhan', serif;
  font-size: 40px;
  color: var(--text-secondary);
  line-height: 1.25;
}
@media (min-width: 900px) {
  .pimco-links__title { font-size: 64px; }
}
.pimco-links__list { list-style: none; display: flex; flex-direction: column; }
.pimco-link-item {
  border-bottom: 1px solid var(--separator);
}
.pimco-link-item:last-child { border-bottom: none; }
.pimco-link-item__link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  text-decoration: none;
  color: var(--text-secondary);
  font-size: 20px;
  font-weight: 700;
}
@media (min-width: 600px) {
  .pimco-link-item__link { font-size: 24px; }
}
```

---

## Task 9: Footer HTML

```html
<footer class="footer">
  <span class="footer__badge">DISCLOSURES</span>

  <p class="footer__italic">Investors should consider the investment objectives, risks, charges and expenses of the funds carefully before investing. This and other information are contained in the fund's prospectus and summary prospectus, if available, which may be obtained by contacting your investment professional or PIMCO representative. Click <a class="footer__link" href="https://www.pimco.com/us/en/product-finder">here</a> for a complete list of the PIMCO Funds prospectuses and summary prospectuses. Please read them carefully before you invest.</p>

  <p><strong>Past performance is not a guarantee or a reliable indicator of future results.</strong></p>

  <p>Investments made by a Fund and the results achieved by a Fund are not expected to be the same as those made by any other PIMCO-advised Fund, including those with a similar name, investment objective or policies. A new or smaller Fund's performance may not represent how the Fund is expected to or may perform in the long-term. New Funds have limited operating histories for investors to evaluate and new and smaller Funds may not attract sufficient assets to achieve investment and trading efficiencies. A Fund may be forced to sell a comparatively large portion of its portfolio to meet significant shareholder redemptions for cash, or hold a comparatively large portion of its portfolio in cash due to significant share purchases for cash, in each case when the Fund otherwise would not seek to do so, which may adversely affect performance.</p>

  <p>Exchange Traded Funds ("ETF") are afforded certain exemptions from the Investment Company Act. The exemptions allow, among other things, for individual shares to trade on the secondary market. Individual shares cannot be directly purchased from or redeemed by the ETF. Purchases and redemptions directly with ETFs are only accomplished through creation unit aggregations or "baskets" of shares. Shares of an ETF, traded on the secondary market, are bought and sold at market price (not NAV). Brokerage commissions will reduce returns. Investment policies, management fees and other information can be found in the individual ETF's prospectus. Buying or selling ETF shares on an exchange may require the payment of fees, such as brokerage commissions, and other fees to financial intermediaries. In addition, an investor may incur costs attributed to the difference between the highest price a buyer is willing to pay to purchase shares of the Fund (bid) and the lowest price a seller is willing to accept for shares of the Fund (ask) when buying or selling shares in the secondary market (the bid-ask spread). Due to the costs inherent in buying or selling Fund shares, frequent trading may detract significantly from investment returns. Investment in Fund shares may not be advisable for investors who expect to engage in frequent trading. Current holdings are subject to risk. Holdings are subject to change at any time. An investment in an ETF involves risk, including the loss of principal. Investment return, price, yield and Net Asset Value (NAV) will fluctuate with changes in market conditions. Investments may be worth more or less than the original cost when redeemed. ETF shares may be bought or sold throughout the day at their market price on the exchange on which they are listed. However, there can be no guarantee that an active trading market for PIMCO ETF shares will develop or be maintained, or that their listing will continue or remain unchanged. Premium/Discount is the difference between the market price and NAV expressed as a percentage of NAV.</p>

  <p>A word about risk: Investing in the bond market is subject to certain risks including the risk that fixed income securities will decline in value because of changes in interest rates; the risk that fund shares could trade at prices other than the net asset value; and the risk that the manager's investment decisions might not produce the desired results. Investing in foreign denominated and/or domiciled securities may involve heightened risk due to currency fluctuations, and economic and political risks, which may be enhanced in emerging markets. Mortgage and asset-backed securities may be sensitive to changes in interest rates, subject to early repayment risk, and their value may fluctuate in response to the market's perception of issuer creditworthiness; while generally supported by some form of government or private guarantee there is no assurance that private guarantors will meet their obligations. High-yield, lower-rated, securities involve greater risk than higher-rated securities; portfolios that invest in them may be subject to greater levels of credit and liquidity risk than portfolios that do not. Derivatives may involve certain costs and risks such as liquidity, interest rate, market, credit, management and the risk that a position could not be closed when most advantageous. Investing in derivatives could lose more than the amount invested. Diversification does not ensure against loss. Please refer to the Fund's prospectus for a complete overview of the primary risks associated with the Fund.</p>

  <p>There is no guarantee that these investment strategies will work under all market conditions or are appropriate for all investors and each investor should evaluate their ability to invest long-term, especially during periods of downturn in the market. Investors should consult their investment professional prior to making an investment decision.</p>

  <p>PIMCO as a general matter provides services to qualified institutions, financial intermediaries and institutional investors. Individual investors should contact their own financial professional to determine the most appropriate investment options for their financial situation. This material contains the current opinions of the manager and such opinions are subject to change without notice. This material has been distributed for information purposes only and should not be considered as investment advice or a recommendation of any particular security, strategy or investment product. Information contained herein has been obtained from sources believed to be reliable, but not guaranteed. No part of this material may be reproduced in any form, or referred to in any other publication, without express written permission. PIMCO is a trademark of Allianz Asset Management of America LLC in the United States and throughout the world.</p>

  <p>PIMCO Investments LLC, distributor, 1633 Broadway, New York, NY 10019, is a company of PIMCO. ©2025 PIMCO.</p>
  <p>CMR2025-0729-4705075</p>

  <div class="footer__links">
    <a href="https://www.pimco.com/gbl/en/general/legal-pages/privacy-policy" class="footer__link">Privacy Policy</a>
    <button class="footer__link footer__cookie-btn" onclick="Optanon && Optanon.ToggleInfoDisplay()">Cookie Settings</button>
  </div>
</footer>
```

CSS:
```css
.footer {
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-size: 12px;
  color: #333;
  line-height: 1.6;
}
.footer__badge {
  display: inline-block;
  padding: 2px 6px;
  border: 1px solid black;
  border-radius: 6px;
  font-size: 10px;
  color: #1e40af; /* blue-800 */
  margin-bottom: 16px;
  width: fit-content;
}
.footer__italic { font-style: italic; }
.footer__link { color: #1e40af; text-decoration: underline; }
.footer__links { display: flex; gap: 16px; margin-top: 8px; }
.footer__cookie-btn {
  background: none; border: none; cursor: pointer; padding: 0;
}
```

---

## Task 10: Create `script.js` — carousel logic

```javascript
// Carousel: vanilla JS, no dependencies
(function () {
  const track = document.getElementById('carouselTrack');
  if (!track) return;

  const slides = track.querySelectorAll('.carousel__slide');
  const dots = document.querySelectorAll('.carousel__dot');
  const prevBtn = document.querySelector('.carousel__btn--prev');
  const nextBtn = document.querySelector('.carousel__btn--next');
  let current = 0;
  const total = slides.length;

  function goTo(index) {
    current = Math.max(0, Math.min(index, total - 1));
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((dot, i) => {
      dot.classList.toggle('carousel__dot--active', i === current);
      dot.setAttribute('aria-current', i === current ? 'true' : 'false');
    });
    prevBtn.style.opacity = current === 0 ? '0.3' : '1';
    nextBtn.style.opacity = current === total - 1 ? '0.3' : '1';
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  // Touch/swipe support
  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(current + (diff > 0 ? 1 : -1));
  });

  goTo(0); // initialize
})();
```

---

## Task 11: Wire up `index.html` — assemble all sections

Combine all sections in order inside `<body>`:
1. `<header class="hero">` — Hero
2. `<section id="content" class="partners">` — Partners in Performance
3. `<section class="leaderboard">` — Performance Leaderboard
4. `<section class="full-force">` — Full Force of PIMCO
5. `<section class="etfs-links">` — ETFs + Learn More
6. `<footer class="footer">` — Disclosures

Add the Google Fonts `<link>` to `<head>`.

---

## Task 12: Final verification

**Step 1: Open in browser**
```bash
open /Users/jtr/Projects/pimco-celtics/index.html
```

**Step 2: Check each section matches screenshots in `/tmp/celtics-screenshots/`**
- Hero: dark bg, video playing, gradient overlays, PIMCO x Celtics nav, centered heading
- Partners: 2-col text + Brightcove player
- Leaderboard: green-to-navy, carousel navigates on click
- Full Force: bg image with overlays, 2×2 card grid
- ETFs: 2-col, MINT/BOND/PYLD list, About/Strategies/Investment Process links
- Footer: small text, disclosures badge

**Step 3: Check mobile layout at 375px width** using DevTools.

**Step 4: Verify all external links open correctly.**

---

## Notes & Known Simplifications

- **SVG icons:** The 4 feature card icons use simplified placeholder SVGs. The exact paths can be extracted from `/tmp/page_chunk.js` at offset ~175367 if pixel-perfect accuracy is needed.
- **PIMCO wordmark SVG:** The full path string is very long and was truncated during extraction. Full path is at offset 126 in `/tmp/page_chunk.js`. Extract with: `dd if=/tmp/page_chunk.js bs=1 skip=126 count=6000 | grep -oP '"M160[^"]*"'`
- **Brightcove video:** Requires network access to `players.brightcove.net`. Works in browser but not offline.
- **Hero video:** Large file (~50-100MB). Download may take a minute.
- **Framer Motion animations:** The original has fade-in animations on scroll. Not reproduced here (YAGNI — the user asked for "as simply as possible").
- **Google Tag Manager:** Omitted intentionally (analytics only, no visual effect).
