# Portfolio Rebuild — Design Spec

**Date:** 2026-05-23
**Owner:** Shehwar Ahmad
**Status:** Draft (awaiting review)

## Goal

Replace the existing React 16 / Create-React-App portfolio at `shehwar-ahmad.github.io` with a clean Next.js 15 + TypeScript build. Preserve all existing content (personal info, work, projects, education, certifications, images, social links) and deploy to GitHub Pages on the same URL.

## Why now

The current repo is a 2019-era Developer Folio fork with stale dependencies, SCSS, splash screens, Lottie animations, and content scattered across `portfolio.js`, `_globalColor.scss`, and JSX containers. Maintenance is friction. A clean Next.js rebuild gives a modern, type-safe foundation that will be easier to evolve.

## Non-goals

- No CMS, no headless backend — content stays in TypeScript files.
- No blog, talks, podcast, or Twitter sections (currently hidden anyway).
- No splash screen, no Lottie animations, no `react-easy-emoji`.
- No tech-proficiency progress bars.
- No multi-page routing — single-page portfolio.
- No i18n, no analytics swap (keep Google Analytics G-CEJKBYXCSB).

## Tech stack

| Concern | Choice | Why |
|---|---|---|
| Framework | Next.js 16.2 (App Router) | Latest stable; React Server Components by default |
| Runtime | React 19 | Bundled with Next 16 |
| Language | TypeScript (strict) | Type safety for content models |
| Styling | Tailwind CSS v4 | JIT, atomic CSS, tiny production bundle |
| Fonts | Inter (display + body) via `next/font/google` | Locked: professional sans, no editorial serif |
| UI icons | `lucide-react` | Lightweight; for arrows, mail, external-link, social glyphs |
| Brand/tech logos | `react-icons/si` (Simple Icons set) | For React, Next, Vue, Node brand marks in the skills row |
| Linting | ESLint (Next.js preset) + Prettier | Consistent formatting |
| Deployment | GitHub Pages via `output: 'export'` | Same URL, free hosting |
| CI | GitHub Actions (build + deploy on push to `master`) | Replace the old `gh-pages` npm script |
| Analytics | Google Analytics 4 (G-CEJKBYXCSB) | Preserve existing tracking |

## Visual design (locked)

**Direction:** Stripe Clean Blue — contained layout.

### Palette
- Background: `#ffffff` (primary), `#f6f9fc` (alternating section bg)
- Text: `#0a2540` (headings), `#425466` (body), `#8898aa` (meta)
- Accent: `#635bff` → `#00d4ff` gradient (primary), `#635bff` solid (links, single-color uses)
- Borders/dividers: `#e6ebf1`
- Tag bg: `#eef0ff`, tag text: `#3f37c9`
- Success/availability indicator: `#22c55e`

### Typography
- Family: **Inter** (weights 400, 500, 600, 700, 800) loaded via `next/font/google`
- Hero headline: 40–48px, weight 800, letter-spacing -0.03em, line-height 1.05
- Section eyebrow: 11px, uppercase, letter-spacing 0.15em, weight 600, color `#635bff`
- Section H2: 22–24px, weight 700, letter-spacing -0.02em
- Body: 13–14px, line-height 1.65, color `#425466`
- Meta: 11px, color `#8898aa`

### Layout
- Centered container: `max-w-[980px]` with `px-6` (responsive: `px-4` on mobile)
- Section backgrounds span full width; content stays in the container
- Alternating section backgrounds (white / `#f6f9fc`) for rhythm
- Sticky nav with blurred translucent white background

### Accents
- Primary CTA: gradient `linear-gradient(135deg,#635bff,#00d4ff)` with subtle box-shadow
- Secondary CTA: white, `#e6ebf1` border
- Logo mark: 24×24 rounded gradient square with "S"
- Gradient text used sparingly on hero accent words and contact CTA

### Dark mode
- **Not in v1.** Keep scope tight. Can add later via Tailwind `dark:` variants and CSS vars if needed.

## Sections (in order)

1. **Sticky Navbar** — logo + name, nav links (About, Work, Projects, Contact), Resume button
2. **Hero** — availability pill, headline with gradient accent, subtitle, CTA pair, social icons
3. **About / Skills** — eyebrow "About", short paragraph, pill-style tech tags
4. **Experience** — vertical timeline with gradient line, role + company + dates + tag chips
5. **Projects** — 3-card grid with gradient cover banners, name, description, visit link
6. **Certifications** — 3-card grid with issuer badge, title, view link
7. **Education** — single card row with monogram, school, degree, dates
8. **Contact** — centered CTA with gradient text + email button
9. **Footer** — copyright + social links row

Mobile: container shrinks, grids collapse to 1 column at `<640px`, nav collapses to a hamburger drawer.

## Content preservation

### Strategy
Before wiping the old code, all preserved content moves to a single staging folder at the repo root: `_legacy-content/`. This folder is the source of truth during rebuild and will be deleted once the new app is verified.

### `_legacy-content/` structure
```
_legacy-content/
├── content.md         # Personal info, bio, contact, social URLs
├── experience.md      # Work history with company, role, dates, stack
├── projects.md        # Project descriptions, URLs
├── education.md       # Schools, degrees, dates
├── certifications.md  # Cert titles, issuers, URLs
└── images/
    ├── logos/         # mtp.png, contrive.png, nova-logo.png, upwork.png
    ├── projects/      # veva.png, ifacility.png, powandgo.png
    ├── certs/         # Software-Architecture.png, Javascript.png, nextjs.jpeg
    ├── schools/       # uog-logo.webp, pgclogo.png
    └── profile/       # shehwar.jpeg
```

Favicons and apple-touch-icons from `public/` will be reused directly in the new `public/`.

### Final content lives in
```
src/content/
├── site.ts            # Name, title, bio, email, socials
├── experience.ts      # Typed array of work entries
├── projects.ts        # Typed array of projects
├── education.ts       # Typed array of schools
├── certifications.ts  # Typed array of certs
└── skills.ts          # Tech stack list
```
Each file exports a typed const. Images live in `public/images/{logos,projects,certs,schools,profile}/`.

## Project structure (post-rebuild)

```
.
├── _legacy-content/         # Staging (deleted after verification)
├── docs/superpowers/specs/  # Design spec (this file)
├── public/
│   ├── favicon.ico, *.png   # Existing favicons preserved
│   ├── manifest.json, robots.txt
│   └── images/              # All content images, organized
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout, fonts, GA, metadata
│   │   ├── page.tsx         # Single-page composition
│   │   └── globals.css      # Tailwind imports, CSS vars
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Container.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Experience.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Certifications.tsx
│   │   │   ├── Education.tsx
│   │   │   └── Contact.tsx
│   │   └── ui/
│   │       ├── SectionHeader.tsx   # Eyebrow + H2 pattern
│   │       ├── TechTag.tsx         # Pill tag
│   │       ├── TimelineDot.tsx
│   │       └── GradientButton.tsx
│   ├── content/             # Typed content (see above)
│   ├── lib/
│   │   └── types.ts         # Shared TS types
│   └── styles/              # If any shared CSS beyond Tailwind
├── next.config.ts           # output: 'export', basePath, images.unoptimized
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── .github/workflows/deploy.yml  # CI deploy to GH Pages
└── README.md
```

## Tailwind conventions

- **Design tokens in `tailwind.config.ts`** — every color (`brand.indigo`, `brand.cyan`, `surface.subtle`, `text.heading`, `text.body`, `text.meta`, `border.subtle`), font family, and key spacing value is defined as a theme token. Components reference tokens (`text-text-heading`), not raw hex values.
- **No inline `style={{}}` for design values.** Inline styles allowed only for runtime-computed values (none expected in v1).
- **No arbitrary values** (`text-[#635bff]`, `max-w-[980px]`) once a token exists for the value. The container width `max-w-[980px]` is the one exception and gets a token: `max-w-container`.
- **Utility classes over `@apply`.** Use `@apply` only inside `globals.css` for resets/base styles, never for component styling.
- **Class order** follows the Prettier Tailwind plugin (auto-formatted on save).
- **Responsive prefixes** (`sm:`, `md:`, `lg:`) always used mobile-first.
- **Variants** (`hover:`, `focus-visible:`) used for all interactive elements; never JS-driven hover states.
- **`clsx`** (lightweight) used for conditional class composition where needed.

## Component contracts

- **`<Container>`** — `max-w-[980px] mx-auto px-6` wrapper. All section content goes inside.
- **`<SectionHeader eyebrow="About" title="Transforming coffee into code." />`** — handles the eyebrow + H2 pattern consistently.
- **`<TechTag>`** — pill chip. Variant prop for light (white bg, border) vs subtle (indigo bg).
- **Sections** receive content as props from `page.tsx`, which imports from `src/content/`. Sections do not import content directly — keeps them reusable and props-driven.

## Deployment

- `next.config.ts` sets `output: 'export'`, `images: { unoptimized: true }`, `trailingSlash: true`.
- Since the repo is `<username>.github.io`, `basePath` stays empty (deployed at root).
- `.github/workflows/deploy.yml`: on push to `master`, run `npm ci && npm run build`, upload `out/` to GH Pages via `actions/deploy-pages`.
- The old `gh-pages` npm script and `homepage` field in `package.json` are removed.

## Performance practices

Goal: fast first paint, near-zero JS on initial load, perfect Lighthouse on a static portfolio.

- **React Server Components by default.** Every section is an RSC. Only interactive bits get `'use client'`:
  - `<MobileNav>` (drawer open/close state)
  - That's it. No other client components anticipated.
- **`next/font/google` for Inter** with `display: 'swap'`, `preload: true`, `subsets: ['latin']`. No external font CSS link; Next inlines and self-hosts the font.
- **Images:** Since static export disables Next's runtime optimizer, we pre-optimize source images.
  - Convert all logos/screenshots to WebP at the right size during the content-staging step.
  - Use `<Image>` from `next/image` with explicit `width`, `height`, and `sizes`; set `unoptimized: true` globally in `next.config.ts`.
  - Hero/above-the-fold images use `priority`; everything else lazy-loads by default.
- **Static export.** `output: 'export'` + `trailingSlash: true`. Every page is pre-rendered HTML; no runtime server.
- **Minimal JS payload.** Tree-shakable icon imports (`import { Mail } from 'lucide-react'`, not the whole pack). No `react-headroom`, `react-reveal`, `react-lottie`, `colorthief` — all of which the old project used.
- **No layout shift.** Reserve dimensions on Image components; use `aspect-ratio` Tailwind utilities on card banners.
- **Analytics deferred.** Load `gtag.js` via `<Script strategy="afterInteractive">` so it doesn't block initial render.
- **CSS:** Tailwind v4 emits a single small stylesheet; no PostCSS plugins beyond the built-in pipeline.
- **No animation libraries.** Use plain CSS transitions (Tailwind utilities) for hovers.
- **Preconnect** to `https://www.googletagmanager.com` in `<head>` so the GA fetch starts early without blocking.

Target Lighthouse: Performance 95+, Accessibility 95+, Best Practices 100, SEO 100.

## SEO & metadata

- Title: `Shehwar Ahmad | Portfolio` (preserved)
- Description: preserved from current `index.html`
- Open Graph + Twitter card meta in `app/layout.tsx` via Next.js `metadata` API
- Existing favicons reused as-is

## Open questions (resolve during implementation, defaults noted)

- **Mobile nav:** hamburger drawer (default) vs horizontal scroll
- **Resume link:** currently empty in old portfolio.js — leave button hidden until URL provided, or link to a placeholder PDF? **Default: hide button if no URL configured.**
- **Project cover images:** old site used real screenshots (`veva.png`, etc.). Keep real images (preferred) or use gradient banners as in mockup? **Default: real images with subtle gradient overlay fallback.**
- **Animations:** subtle fade-in-on-scroll using CSS only, or skip? **Default: minimal — Tailwind transitions on hover/focus only; no scroll animations in v1.**

These are minor and won't block implementation; flag during build if any need a call.

## Acceptance criteria

- [ ] Clean Next.js 15 + TS + Tailwind project at repo root, old code removed
- [ ] All content from old `portfolio.js` represented in typed `src/content/*.ts` files
- [ ] All preserved images moved into `public/images/` with consistent paths
- [ ] All 7 content sections (Hero, About, Experience, Projects, Certifications, Education, Contact) plus Navbar and Footer render with the locked Stripe Clean Blue design
- [ ] Site builds with `next build` and exports static files (`next export` equivalent via `output: 'export'`)
- [ ] Deployed to GitHub Pages via GitHub Actions (existing URL, no Vercel)
- [ ] Lighthouse: Performance ≥ 95, Accessibility ≥ 95
- [ ] Existing favicons + manifest preserved
- [ ] Google Analytics tag (`G-CEJKBYXCSB`) preserved
- [ ] Responsive: works at 360px, 768px, 1024px, 1440px
- [ ] `_legacy-content/` folder ready for deletion (user confirms before delete)
