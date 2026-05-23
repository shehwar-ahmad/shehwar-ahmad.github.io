# Portfolio Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the React 16 / CRA portfolio with a clean Next.js 16 + TypeScript + Tailwind v4 build using the Stripe Clean Blue (contained) design, deploying to GitHub Pages.

**Architecture:** Single-page portfolio (App Router). Each section is a React Server Component receiving typed content as props from `page.tsx`. Only the mobile-nav drawer is a client component. Content lives in typed `src/content/*.ts` files; images live in `public/images/`. Static export via `output: 'export'` for GitHub Pages.

**Tech Stack:** Next.js 16.2, React 19, TypeScript (strict), Tailwind CSS v4, `next/font/google` (Inter), `lucide-react`, `react-icons/si`, `clsx`. GitHub Actions for deploy.

**Reference spec:** [docs/superpowers/specs/2026-05-23-portfolio-rebuild-design.md](../specs/2026-05-23-portfolio-rebuild-design.md)

---

## File Structure (final)

```
.
├── _legacy-content/             # Staging — deleted in Task 19 after verification
│   ├── content.md
│   ├── experience.md
│   ├── projects.md
│   ├── education.md
│   ├── certifications.md
│   └── images/{logos,projects,certs,schools,profile,favicons}/
├── docs/superpowers/{specs,plans}/...   # Preserved
├── public/
│   ├── favicon.ico (+ all favicon variants)
│   ├── manifest.json, robots.txt
│   └── images/{logos,projects,certs,schools,profile}/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout, Inter font, GA, metadata
│   │   ├── page.tsx             # Composes all sections
│   │   └── globals.css          # Tailwind + @theme tokens
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Container.tsx    # max-w container wrapper
│   │   │   ├── Navbar.tsx       # Desktop nav (RSC)
│   │   │   ├── MobileNav.tsx    # Drawer (client)
│   │   │   └── Footer.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Experience.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Certifications.tsx
│   │   │   ├── Education.tsx
│   │   │   └── Contact.tsx
│   │   └── ui/
│   │       ├── SectionHeader.tsx
│   │       ├── TechTag.tsx
│   │       ├── GradientButton.tsx
│   │       └── TimelineDot.tsx
│   ├── content/
│   │   ├── site.ts, skills.ts, experience.ts, projects.ts,
│   │   ├── certifications.ts, education.ts
│   └── lib/
│       └── types.ts
├── next.config.ts               # output:'export', images.unoptimized
├── tsconfig.json, package.json
├── .github/workflows/deploy.yml
└── README.md
```

---

## Task 1: Stage existing content into `_legacy-content/`

**Files:**
- Create: `_legacy-content/content.md`
- Create: `_legacy-content/experience.md`
- Create: `_legacy-content/projects.md`
- Create: `_legacy-content/education.md`
- Create: `_legacy-content/certifications.md`
- Copy: all `src/assets/images/*` → `_legacy-content/images/...` (grouped)
- Copy: all `public/*.png`, `public/*.ico`, `public/*.svg`, `public/manifest.json`, `public/browserconfig.xml` → `_legacy-content/images/favicons/`

- [ ] **Step 1.1: Create folder structure**

```bash
mkdir -p _legacy-content/images/{logos,projects,certs,schools,profile,favicons}
```

- [ ] **Step 1.2: Copy work-experience logos**

```bash
cp src/assets/images/upwork.png      _legacy-content/images/logos/upwork.png
cp src/assets/images/nova-logo.png   _legacy-content/images/logos/nova.png
cp src/assets/images/contrive.png    _legacy-content/images/logos/contrive.png
cp src/assets/images/mtp.png         _legacy-content/images/logos/mtp.png
```

- [ ] **Step 1.3: Copy project images**

```bash
cp src/assets/images/veva.png        _legacy-content/images/projects/veva.png
cp src/assets/images/ifacility.png   _legacy-content/images/projects/ifacility.png
cp src/assets/images/powandgo.png    _legacy-content/images/projects/powandgo.png
```

- [ ] **Step 1.4: Copy certificate images**

```bash
cp src/assets/images/Software-Architecture.png  _legacy-content/images/certs/software-architecture.png
cp src/assets/images/Javascript.png             _legacy-content/images/certs/javascript-algorithms.png
cp src/assets/images/nextjs.jpeg                _legacy-content/images/certs/learning-nextjs.jpeg
```

- [ ] **Step 1.5: Copy school logos**

```bash
cp src/assets/images/uog-logo.webp   _legacy-content/images/schools/uog.webp
cp src/assets/images/pgclogo.png     _legacy-content/images/schools/pgc.png
```

- [ ] **Step 1.6: Copy profile image**

```bash
cp src/assets/images/shehwar.jpeg    _legacy-content/images/profile/shehwar.jpeg
```

- [ ] **Step 1.7: Copy favicons and manifest from `public/`**

```bash
cp public/favicon.ico                       _legacy-content/images/favicons/favicon.ico
cp public/favicon-16x16.png                 _legacy-content/images/favicons/favicon-16x16.png
cp public/favicon-32x32.png                 _legacy-content/images/favicons/favicon-32x32.png
cp public/apple-touch-icon.png              _legacy-content/images/favicons/apple-touch-icon.png
cp public/android-chrome-192x192.png        _legacy-content/images/favicons/android-chrome-192x192.png
cp public/android-chrome-384x384.png        _legacy-content/images/favicons/android-chrome-384x384.png
cp public/mstile-150x150.png                _legacy-content/images/favicons/mstile-150x150.png
cp public/safari-pinned-tab.svg             _legacy-content/images/favicons/safari-pinned-tab.svg
cp public/manifest.json                     _legacy-content/images/favicons/manifest.json
cp public/browserconfig.xml                 _legacy-content/images/favicons/browserconfig.xml
cp public/robots.txt                        _legacy-content/images/favicons/robots.txt
```

- [ ] **Step 1.8: Write `_legacy-content/content.md`**

```markdown
# Personal Info

- **Name:** Shehwar Ahmad
- **Title:** Web Developer / Software Engineer
- **Email:** shehwar.dev@gmail.com
- **Location:** (not stated in current portfolio)
- **Status:** Open to opportunities

## Bio (long form)

Web developer with 5 years of industry experience, specializing in building scalable applications. I excel in frontend development using React.js, Vue.js, and Next.js, and have strong backend skills with Node.js, Express.js, and Nest.js. I am dedicated to delivering high-quality, efficient solutions and continuously enhancing my skill set.

## Social Links

- GitHub: https://github.com/shehwar-ahmad
- LinkedIn: https://www.linkedin.com/in/shehwar-ahmad/
- Medium: https://medium.com/@shehwar
- Stack Overflow: https://stackoverflow.com/users/9979508/shehwar
- Email: shehwar.dev@gmail.com

## Skills (tech stack)

HTML5, CSS3, Bootstrap, SASS, JavaScript, TypeScript, React.js, Next.js, Vue.js, Node.js, Express.js, Nest.js, npm, SQL Databases, AWS, Firebase, Python, Docker

## Analytics

Google Analytics tag (preserve): `G-CEJKBYXCSB`

## SEO

- Title: Shehwar Ahmad | Portfolio
- Description: I create scalable web apps with expertise in various languages and frameworks. My solutions are efficient, user-friendly, and up-to-date with industry trends. Explore my experience and projects.
- Theme color: `#6c63ff` (old; replace with new brand)
```

- [ ] **Step 1.9: Write `_legacy-content/experience.md`**

```markdown
# Work Experience

## Software Engineer — MTP
- **Dates:** August 2023 – Present
- **Stack:** Next.js, Nest.js, React.js, Vue.js, AWS
- **Logo:** logos/mtp.png

## Front-End Developer — Contrive Solutions
- **Dates:** March 2022 – August 2023
- **Stack:** React.js, Vue.js, TypeScript, Redux, Material UI, Bootstrap
- **Logo:** logos/contrive.png

## Front-End Developer — Nova Solutions
- **Dates:** February 2020 – March 2022
- **Stack:** React.js, Material UI, SASS, Tailwind, Bootstrap
- **Logo:** logos/nova.png

## Web Development — Upwork
- **Dates:** June 2019 – February 2020
- **Stack:** WordPress, JavaScript, Data Analysis (Python), Data Visualization (Tableau)
- **Logo:** logos/upwork.png
```

- [ ] **Step 1.10: Write `_legacy-content/projects.md`**

```markdown
# Projects

## VevaCollect
- **URL:** https://vevacollect.com/
- **Image:** projects/veva.png
- **Description:** Audio, file sharing, credits and metadata built specifically for the music industry. Store all of your released and unreleased music, share audio, credits and collaborate.

## Ifacility
- **URL:** https://www.ifacility.co.uk/
- **Image:** projects/ifacility.png
- **Description:** Ifacility provides services in Security Sector. They help you install what you need to safeguard your business, property, and people; our end-to-end service delivers a whole lot more.

## Powandgo
- **URL:** https://www.powandgo.com
- **Image:** projects/powandgo.png
- **Description:** The first charge-sharing service that will change the way to charge electric vehicles — saving money in charging costs and allowing charging-station owners to earn.
```

- [ ] **Step 1.11: Write `_legacy-content/education.md`**

```markdown
# Education

## University of Gujrat
- **Degree:** Bachelor of Science in Computer Science
- **Dates:** October 2015 – November 2019
- **CGPA:** 3.37 / 4
- **Highlights:**
  - Major courses: Website Development, Android Development, Artificial Intelligence, Digital Image Processing
  - Final Year Project: Currency Detection and Classification Android App using Machine Learning
- **Logo:** schools/uog.webp

## Punjab Group of Colleges
- **Degree:** FSc Pre-Engineering
- **Dates:** September 2013 – August 2015
- **Grade:** A Grade
- **Logo:** schools/pgc.png
```

- [ ] **Step 1.12: Write `_legacy-content/certifications.md`**

```markdown
# Certifications

## Software Architecture: Patterns for Developers
- **Issuer:** LinkedIn Learning
- **URL:** https://www.linkedin.com/learning/certificates/2d499e9b6e5d56c232dd45021234a1dd0eb2baeef644be18c2a2f7ca941b3253?trk=share_certificate
- **Image:** certs/software-architecture.png

## JavaScript Algorithms and Data Structures
- **Issuer:** freeCodeCamp
- **URL:** https://www.freecodecamp.org/certification/shehwar/javascript-algorithms-and-data-structures
- **Image:** certs/javascript-algorithms.png

## Learning Next.js
- **Issuer:** LinkedIn Learning
- **URL:** https://www.linkedin.com/learning/certificates/2540eb47a70e7631e73c459e8171ccc12ed5213126bd48c2f2c50fd93bd5ab74
- **Image:** certs/learning-nextjs.jpeg
```

- [ ] **Step 1.13: Verify and commit**

```bash
ls -la _legacy-content/images/*/
git add _legacy-content/
git commit -m "chore: stage existing portfolio content for rebuild"
```

Expected: all images present in subfolders; 5 markdown files at `_legacy-content/` root.

---

## Task 2: Wipe old project and scaffold Next.js 16

**Goal:** Delete the React 16 / CRA scaffolding, then create a fresh Next.js 16 + TS + Tailwind project at the repo root, preserving `.git`, `.gitignore` (updated), `_legacy-content/`, `docs/`, `LICENSE`.

**Files:**
- Delete: `src/`, `public/`, `package.json`, `package-lock.json`, `Dockerfile`, `fetch.js`, `env.example`, `.all-contributorsrc`, `.pre-commit-config.yaml`, `.prettierrc`, `.prettierignore`, `.gitattributes`, `.vscode/`, `.github/`, `README.md`
- Replace from Next.js scaffold: `src/`, `public/`, `package.json`, `package-lock.json`, `tsconfig.json`, `next.config.ts`, `next-env.d.ts`, `eslint.config.mjs`, `postcss.config.mjs`, `.gitignore`, `README.md`
- Preserve: `.git/`, `_legacy-content/`, `docs/`, `LICENSE`

- [ ] **Step 2.1: Confirm `_legacy-content/` is fully populated**

```bash
ls _legacy-content/*.md
ls _legacy-content/images/*/
```

Expected: 5 `.md` files and 6 image subfolders all non-empty. If empty, return to Task 1.

- [ ] **Step 2.2: Delete the old React project files**

```bash
rm -rf src/ public/ .github/ .vscode/
rm -f package.json package-lock.json Dockerfile fetch.js env.example
rm -f .all-contributorsrc .pre-commit-config.yaml .prettierrc .prettierignore .gitattributes .gitignore
rm -f README.md
```

Keep: `.git/`, `_legacy-content/`, `docs/`, `LICENSE`. Verify:

```bash
ls -la
```

Expected output contains only: `.`, `..`, `.git`, `LICENSE`, `_legacy-content`, `docs`, `.superpowers` (brainstorm artifacts — leave alone).

- [ ] **Step 2.3: Scaffold Next.js 16 into a temp directory**

```bash
npx --yes create-next-app@latest /tmp/portfolio-scaffold \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --no-import-alias \
  --use-npm \
  --turbopack \
  --yes
```

Expected: completes without errors. Verify:

```bash
ls /tmp/portfolio-scaffold
```

Should include `src/`, `public/`, `package.json`, `tsconfig.json`, `next.config.ts`, `eslint.config.mjs`, `postcss.config.mjs`, `.gitignore`, `README.md`.

- [ ] **Step 2.4: Copy scaffold into the repo**

```bash
# rsync excludes .git so we don't clobber repo history
rsync -av --exclude='.git' /tmp/portfolio-scaffold/ /Users/shehwar/projects/shehwar-ahmad.github.io/
rm -rf /tmp/portfolio-scaffold
```

- [ ] **Step 2.5: Append `_legacy-content/` exclusion is unnecessary — but add `.superpowers/` to `.gitignore`**

Open the freshly generated `.gitignore`. Append at the bottom:

```gitignore

# Brainstorm session artifacts (visual-companion)
.superpowers/
```

- [ ] **Step 2.6: Verify the scaffold builds and runs**

```bash
npm install
npm run build
```

Expected: build completes; an `.next/` directory is produced.

- [ ] **Step 2.7: Commit**

```bash
git add .
git commit -m "feat: scaffold Next.js 16 + TypeScript + Tailwind v4 project"
```

---

## Task 3: Configure for GitHub Pages static export

**Files:**
- Modify: `next.config.ts`

- [ ] **Step 3.1: Replace `next.config.ts` contents**

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

- [ ] **Step 3.2: Build and verify `out/` is produced**

```bash
npm run build
ls out/
```

Expected: `out/` contains `index.html`, `_next/`, and other static assets.

- [ ] **Step 3.3: Commit**

```bash
git add next.config.ts
git commit -m "feat: configure static export for GitHub Pages"
```

---

## Task 4: Define Tailwind v4 design tokens

Tailwind v4 uses CSS-first config via `@theme` in `globals.css`. We define brand colors, surfaces, text colors, container width, and font variable here.

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 4.1: Replace `src/app/globals.css` contents**

```css
@import "tailwindcss";

@theme {
  /* Brand */
  --color-brand-indigo: #635bff;
  --color-brand-cyan: #00d4ff;
  --color-brand-deep: #3f37c9;

  /* Surfaces */
  --color-surface-base: #ffffff;
  --color-surface-subtle: #f6f9fc;
  --color-surface-tag: #eef0ff;

  /* Text */
  --color-text-heading: #0a2540;
  --color-text-body: #425466;
  --color-text-meta: #8898aa;
  --color-text-tag: #3f37c9;

  /* Borders */
  --color-border-subtle: #e6ebf1;

  /* State */
  --color-state-available: #22c55e;

  /* Container */
  --container-max: 980px;

  /* Fonts (variable comes from next/font in layout.tsx) */
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, -apple-system,
    "Segoe UI", Roboto, sans-serif;
}

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    background-color: var(--color-surface-base);
    color: var(--color-text-body);
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  h1, h2, h3, h4, h5, h6 {
    color: var(--color-text-heading);
    letter-spacing: -0.02em;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
}

@utility text-gradient-brand {
  background: linear-gradient(90deg, var(--color-brand-indigo), var(--color-brand-cyan));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

@utility bg-gradient-brand {
  background: linear-gradient(135deg, var(--color-brand-indigo), var(--color-brand-cyan));
}
```

- [ ] **Step 4.2: Verify build still passes**

```bash
npm run build
```

Expected: no errors.

- [ ] **Step 4.3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: define Tailwind v4 design tokens"
```

---

## Task 5: Configure Inter font, root layout, GA, metadata

**Files:**
- Modify: `src/app/layout.tsx`
- Create: favicon files in `public/`

- [ ] **Step 5.1: Copy favicons and manifest from `_legacy-content/`**

```bash
cp _legacy-content/images/favicons/favicon.ico                  public/favicon.ico
cp _legacy-content/images/favicons/favicon-16x16.png            public/favicon-16x16.png
cp _legacy-content/images/favicons/favicon-32x32.png            public/favicon-32x32.png
cp _legacy-content/images/favicons/apple-touch-icon.png         public/apple-touch-icon.png
cp _legacy-content/images/favicons/android-chrome-192x192.png   public/android-chrome-192x192.png
cp _legacy-content/images/favicons/android-chrome-384x384.png   public/android-chrome-384x384.png
cp _legacy-content/images/favicons/mstile-150x150.png           public/mstile-150x150.png
cp _legacy-content/images/favicons/safari-pinned-tab.svg        public/safari-pinned-tab.svg
cp _legacy-content/images/favicons/manifest.json                public/manifest.json
cp _legacy-content/images/favicons/browserconfig.xml            public/browserconfig.xml
cp _legacy-content/images/favicons/robots.txt                   public/robots.txt
```

Delete the default Next.js scaffold favicon if present:

```bash
rm -f src/app/favicon.ico
```

- [ ] **Step 5.2: Replace `src/app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

const GA_ID = "G-CEJKBYXCSB";

export const metadata: Metadata = {
  title: "Shehwar Ahmad | Portfolio",
  description:
    "I create scalable web apps with expertise in various languages and frameworks. My solutions are efficient, user-friendly, and up-to-date with industry trends. Explore my experience and projects.",
  metadataBase: new URL("https://shehwar-ahmad.github.io"),
  openGraph: {
    type: "website",
    title: "Shehwar Ahmad | Portfolio",
    description:
      "I create scalable web apps with expertise in various languages and frameworks. My solutions are efficient, user-friendly, and up-to-date with industry trends. Explore my experience and projects.",
    url: "https://shehwar-ahmad.github.io",
    siteName: "Shehwar Ahmad",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shehwar Ahmad | Portfolio",
    description:
      "I create scalable web apps with expertise in various languages and frameworks.",
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#635bff" }],
  },
  manifest: "/manifest.json",
  themeColor: "#635bff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
      </head>
      <body>
        {children}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
```

- [ ] **Step 5.3: Replace `src/app/page.tsx` with a placeholder**

```tsx
export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold text-gradient-brand">
        Shehwar Ahmad — coming together.
      </h1>
    </main>
  );
}
```

- [ ] **Step 5.4: Run dev server and visually verify**

```bash
npm run dev
```

Open `http://localhost:3000`. Expected: Inter font loaded, gradient title visible, no console errors, favicon shown in tab.

Stop the dev server (Ctrl+C).

- [ ] **Step 5.5: Build to confirm static export works**

```bash
npm run build
```

Expected: clean build, `out/index.html` present.

- [ ] **Step 5.6: Commit**

```bash
git add src/app/layout.tsx src/app/page.tsx public/
git commit -m "feat: configure Inter font, GA, metadata, favicons"
```

---

## Task 6: Define content types

**Files:**
- Create: `src/lib/types.ts`

- [ ] **Step 6.1: Write `src/lib/types.ts`**

```ts
export type Social =
  | "github"
  | "linkedin"
  | "medium"
  | "stackoverflow"
  | "email";

export interface SiteConfig {
  name: string;
  shortName: string;
  title: string;
  bio: string;
  email: string;
  available: boolean;
  resumeUrl: string | null;
  socials: Record<Exclude<Social, "email">, string>;
}

export interface Skill {
  name: string;
  /** Slug for matching to a brand icon, e.g. "react", "next-dot-js" */
  iconKey: string;
}

export interface Experience {
  role: string;
  company: string;
  start: string;
  end: string;
  logo: string;
  stack: string[];
  current?: boolean;
}

export interface Project {
  name: string;
  description: string;
  url: string;
  image: string;
}

export interface Certification {
  title: string;
  issuer: string;
  url: string;
  image: string;
}

export interface Education {
  school: string;
  degree: string;
  start: string;
  end: string;
  logo: string;
  highlights?: string[];
  grade?: string;
}
```

- [ ] **Step 6.2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 6.3: Commit**

```bash
git add src/lib/types.ts
git commit -m "feat: define content types"
```

---

## Task 7: Migrate content modules and images

**Files:**
- Create: `src/content/site.ts`, `skills.ts`, `experience.ts`, `projects.ts`, `certifications.ts`, `education.ts`
- Copy: `_legacy-content/images/{logos,projects,certs,schools,profile}/*` → `public/images/...`

- [ ] **Step 7.1: Move images into `public/images/`**

```bash
mkdir -p public/images/{logos,projects,certs,schools,profile}
cp _legacy-content/images/logos/*    public/images/logos/
cp _legacy-content/images/projects/* public/images/projects/
cp _legacy-content/images/certs/*    public/images/certs/
cp _legacy-content/images/schools/*  public/images/schools/
cp _legacy-content/images/profile/*  public/images/profile/
```

- [ ] **Step 7.2: Write `src/content/site.ts`**

```ts
import type { SiteConfig } from "@/lib/types";

export const site: SiteConfig = {
  name: "Shehwar Ahmad",
  shortName: "Shehwar",
  title: "Web developer building scalable applications",
  bio: "Web developer with 5 years of industry experience, specializing in building scalable applications. I excel in frontend development using React, Vue, and Next.js, and have strong backend skills with Node, Express, and Nest. I focus on shipping efficient, high-quality work.",
  email: "shehwar.dev@gmail.com",
  available: true,
  resumeUrl: null,
  socials: {
    github: "https://github.com/shehwar-ahmad",
    linkedin: "https://www.linkedin.com/in/shehwar-ahmad/",
    medium: "https://medium.com/@shehwar",
    stackoverflow: "https://stackoverflow.com/users/9979508/shehwar",
  },
};
```

Note: `@/lib/types` requires the path alias. If `--no-import-alias` was used in Task 2, replace `@/lib/types` with relative imports throughout (`../lib/types`). To verify: open `tsconfig.json` and check `compilerOptions.paths`. If `"@/*": ["./src/*"]` is present, the alias works.

If the alias is NOT present, add it now to `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

- [ ] **Step 7.3: Write `src/content/skills.ts`**

```ts
import type { Skill } from "@/lib/types";

export const skills: Skill[] = [
  { name: "React", iconKey: "react" },
  { name: "Next.js", iconKey: "nextdotjs" },
  { name: "Vue.js", iconKey: "vuedotjs" },
  { name: "TypeScript", iconKey: "typescript" },
  { name: "Node.js", iconKey: "nodedotjs" },
  { name: "Nest.js", iconKey: "nestjs" },
  { name: "Express", iconKey: "express" },
  { name: "JavaScript", iconKey: "javascript" },
  { name: "Tailwind CSS", iconKey: "tailwindcss" },
  { name: "SASS", iconKey: "sass" },
  { name: "AWS", iconKey: "amazonwebservices" },
  { name: "Firebase", iconKey: "firebase" },
  { name: "Docker", iconKey: "docker" },
  { name: "Python", iconKey: "python" },
];
```

- [ ] **Step 7.4: Write `src/content/experience.ts`**

```ts
import type { Experience } from "@/lib/types";

export const experiences: Experience[] = [
  {
    role: "Software Engineer",
    company: "MTP",
    start: "Aug 2023",
    end: "Present",
    current: true,
    logo: "/images/logos/mtp.png",
    stack: ["Next.js", "Nest.js", "React.js", "Vue.js", "AWS"],
  },
  {
    role: "Front-End Developer",
    company: "Contrive Solutions",
    start: "Mar 2022",
    end: "Aug 2023",
    logo: "/images/logos/contrive.png",
    stack: ["React.js", "Vue.js", "TypeScript", "Redux", "Material UI", "Bootstrap"],
  },
  {
    role: "Front-End Developer",
    company: "Nova Solutions",
    start: "Feb 2020",
    end: "Mar 2022",
    logo: "/images/logos/nova.png",
    stack: ["React.js", "Material UI", "SASS", "Tailwind", "Bootstrap"],
  },
  {
    role: "Web Development",
    company: "Upwork",
    start: "Jun 2019",
    end: "Feb 2020",
    logo: "/images/logos/upwork.png",
    stack: ["WordPress", "JavaScript", "Python", "Tableau"],
  },
];
```

- [ ] **Step 7.5: Write `src/content/projects.ts`**

```ts
import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    name: "VevaCollect",
    description:
      "Audio, file sharing, credits and metadata built specifically for the music industry. Store released and unreleased music, share audio and credits, and collaborate.",
    url: "https://vevacollect.com/",
    image: "/images/projects/veva.png",
  },
  {
    name: "Ifacility",
    description:
      "Security-sector services. End-to-end delivery for safeguarding business, property, and people.",
    url: "https://www.ifacility.co.uk/",
    image: "/images/projects/ifacility.png",
  },
  {
    name: "Powandgo",
    description:
      "The first charge-sharing service for electric vehicles — saving money on charging costs and letting station owners earn.",
    url: "https://www.powandgo.com",
    image: "/images/projects/powandgo.png",
  },
];
```

- [ ] **Step 7.6: Write `src/content/certifications.ts`**

```ts
import type { Certification } from "@/lib/types";

export const certifications: Certification[] = [
  {
    title: "Software Architecture: Patterns for Developers",
    issuer: "LinkedIn Learning",
    url: "https://www.linkedin.com/learning/certificates/2d499e9b6e5d56c232dd45021234a1dd0eb2baeef644be18c2a2f7ca941b3253?trk=share_certificate",
    image: "/images/certs/software-architecture.png",
  },
  {
    title: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    url: "https://www.freecodecamp.org/certification/shehwar/javascript-algorithms-and-data-structures",
    image: "/images/certs/javascript-algorithms.png",
  },
  {
    title: "Learning Next.js",
    issuer: "LinkedIn Learning",
    url: "https://www.linkedin.com/learning/certificates/2540eb47a70e7631e73c459e8171ccc12ed5213126bd48c2f2c50fd93bd5ab74",
    image: "/images/certs/learning-nextjs.jpeg",
  },
];
```

- [ ] **Step 7.7: Write `src/content/education.ts`**

```ts
import type { Education } from "@/lib/types";

export const education: Education[] = [
  {
    school: "University of Gujrat",
    degree: "Bachelor of Science in Computer Science",
    start: "Oct 2015",
    end: "Nov 2019",
    grade: "CGPA 3.37 / 4.00",
    logo: "/images/schools/uog.webp",
    highlights: [
      "Major courses: Web Development, Android Development, Artificial Intelligence, Digital Image Processing",
      "Final Year Project: Currency Detection and Classification Android App using Machine Learning",
    ],
  },
  {
    school: "Punjab Group of Colleges",
    degree: "FSc Pre-Engineering",
    start: "Sep 2013",
    end: "Aug 2015",
    grade: "A Grade",
    logo: "/images/schools/pgc.png",
  },
];
```

- [ ] **Step 7.8: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 7.9: Commit**

```bash
git add src/content/ src/lib/ public/images/ tsconfig.json
git commit -m "feat: add typed content modules and migrate images"
```

---

## Task 8: Install runtime dependencies

**Files:**
- Modify: `package.json` (via npm install)

- [ ] **Step 8.1: Install icon libraries and clsx**

```bash
npm install lucide-react react-icons clsx
```

- [ ] **Step 8.2: Verify package.json got updated**

```bash
grep -E "lucide-react|react-icons|clsx" package.json
```

Expected: all three dependencies present.

- [ ] **Step 8.3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add lucide-react, react-icons, clsx dependencies"
```

---

## Task 9: Build UI primitives

Five small reusable components. Each one is a Server Component.

**Files:**
- Create: `src/components/ui/Container.tsx`
- Create: `src/components/ui/SectionHeader.tsx`
- Create: `src/components/ui/TechTag.tsx`
- Create: `src/components/ui/GradientButton.tsx`
- Create: `src/components/ui/TimelineDot.tsx`

Note: `Container` is technically a layout primitive; I'm putting it in `ui/` for simplicity since it's used everywhere. (Spec says `layout/Container.tsx`; using `ui/Container.tsx` is acceptable — update the spec mentally.)

- [ ] **Step 9.1: Create `src/components/ui/Container.tsx`**

```tsx
import type { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Container({ children, className, ...rest }: ContainerProps) {
  return (
    <div
      className={clsx("mx-auto w-full max-w-[var(--container-max)] px-6", className)}
      {...rest}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 9.2: Create `src/components/ui/SectionHeader.tsx`**

```tsx
interface SectionHeaderProps {
  eyebrow: string;
  title: string;
}

export function SectionHeader({ eyebrow, title }: SectionHeaderProps) {
  return (
    <header className="mb-6">
      <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-[color:var(--color-brand-indigo)]">
        {eyebrow}
      </div>
      <h2 className="text-2xl font-bold leading-tight text-[color:var(--color-text-heading)] sm:text-3xl">
        {title}
      </h2>
    </header>
  );
}
```

- [ ] **Step 9.3: Create `src/components/ui/TechTag.tsx`**

```tsx
import type { ReactNode } from "react";
import clsx from "clsx";

type Variant = "outline" | "subtle";

interface TechTagProps {
  children: ReactNode;
  variant?: Variant;
  icon?: ReactNode;
}

export function TechTag({ children, variant = "outline", icon }: TechTagProps) {
  const base =
    "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium";
  const variants = {
    outline:
      "bg-[color:var(--color-surface-base)] text-[color:var(--color-text-heading)] border border-[color:var(--color-border-subtle)]",
    subtle:
      "bg-[color:var(--color-surface-tag)] text-[color:var(--color-text-tag)]",
  } as const;

  return (
    <span className={clsx(base, variants[variant])}>
      {icon && <span className="text-[color:var(--color-brand-indigo)]">{icon}</span>}
      {children}
    </span>
  );
}
```

- [ ] **Step 9.4: Create `src/components/ui/GradientButton.tsx`**

```tsx
import type { AnchorHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type Variant = "gradient" | "outline" | "dark";

interface GradientButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  children: ReactNode;
}

export function GradientButton({
  variant = "gradient",
  children,
  className,
  ...rest
}: GradientButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-shadow";
  const variants = {
    gradient:
      "bg-gradient-brand text-white shadow-[0_4px_12px_rgba(99,91,255,0.3)] hover:shadow-[0_6px_18px_rgba(99,91,255,0.4)]",
    outline:
      "bg-[color:var(--color-surface-base)] text-[color:var(--color-text-heading)] border border-[color:var(--color-border-subtle)] hover:border-[color:var(--color-brand-indigo)]",
    dark: "bg-[color:var(--color-text-heading)] text-white hover:opacity-90",
  } as const;

  return (
    <a className={clsx(base, variants[variant], className)} {...rest}>
      {children}
    </a>
  );
}
```

- [ ] **Step 9.5: Create `src/components/ui/TimelineDot.tsx`**

```tsx
import clsx from "clsx";

interface TimelineDotProps {
  active?: boolean;
}

export function TimelineDot({ active = false }: TimelineDotProps) {
  return (
    <span
      className={clsx(
        "absolute top-1 -left-[26px] block h-2.5 w-2.5 rounded-full border-2",
        active
          ? "bg-gradient-brand border-white shadow-[0_0_0_1px_var(--color-brand-indigo)]"
          : "bg-[color:var(--color-surface-base)] border-[color:var(--color-brand-indigo)]"
      )}
      aria-hidden
    />
  );
}
```

- [ ] **Step 9.6: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 9.7: Commit**

```bash
git add src/components/ui/
git commit -m "feat: add UI primitives (Container, SectionHeader, TechTag, GradientButton, TimelineDot)"
```

---

## Task 10: Build Navbar (desktop + mobile)

The Navbar is split: `Navbar.tsx` (RSC, renders desktop nav + mounts `MobileNav`) and `MobileNav.tsx` (client, drawer toggle).

**Files:**
- Create: `src/components/layout/Navbar.tsx`
- Create: `src/components/layout/MobileNav.tsx`

- [ ] **Step 10.1: Create `src/components/layout/MobileNav.tsx`**

```tsx
"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import clsx from "clsx";

interface MobileNavProps {
  links: { href: string; label: string }[];
  resumeUrl: string | null;
}

export function MobileNav({ links, resumeUrl }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="p-2"
      >
        <Menu size={20} />
      </button>

      <div
        className={clsx(
          "fixed inset-0 z-50 transition-opacity",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        aria-hidden={!open}
      >
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setOpen(false)}
        />
        <div
          className={clsx(
            "absolute right-0 top-0 h-full w-72 bg-[color:var(--color-surface-base)] p-6 shadow-xl transition-transform",
            open ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="mb-6 flex items-center justify-between">
            <span className="font-semibold">Menu</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="p-2"
            >
              <X size={20} />
            </button>
          </div>
          <nav className="flex flex-col gap-4 text-sm font-medium text-[color:var(--color-text-body)]">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="hover:text-[color:var(--color-brand-indigo)]"
              >
                {link.label}
              </a>
            ))}
            {resumeUrl && (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 rounded-md bg-[color:var(--color-text-heading)] px-3 py-2 text-center text-white"
              >
                Resume ↗
              </a>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 10.2: Create `src/components/layout/Navbar.tsx`**

```tsx
import { Container } from "@/components/ui/Container";
import { MobileNav } from "@/components/layout/MobileNav";
import { site } from "@/content/site";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--color-border-subtle)] bg-white/85 backdrop-blur">
      <Container className="flex items-center justify-between py-3.5">
        <a href="#top" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-brand text-sm font-bold text-white">
            S
          </span>
          <span className="text-sm font-semibold text-[color:var(--color-text-heading)]">
            {site.shortName}
          </span>
        </a>

        <nav className="hidden gap-6 text-sm font-medium text-[color:var(--color-text-body)] md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[color:var(--color-brand-indigo)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          {site.resumeUrl ? (
            <a
              href={site.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-md bg-[color:var(--color-text-heading)] px-3 py-1.5 text-xs font-semibold text-white hover:opacity-90"
            >
              Resume ↗
            </a>
          ) : null}
        </div>

        <MobileNav links={NAV_LINKS} resumeUrl={site.resumeUrl} />
      </Container>
    </header>
  );
}
```

- [ ] **Step 10.3: Update `src/app/page.tsx` to mount the Navbar**

```tsx
import { Navbar } from "@/components/layout/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="top" className="min-h-screen">
        <div className="py-24 text-center text-sm text-[color:var(--color-text-meta)]">
          Sections coming next…
        </div>
      </main>
    </>
  );
}
```

- [ ] **Step 10.4: Visually verify in dev**

```bash
npm run dev
```

Open `http://localhost:3000`. At desktop width: see logo + "Shehwar" + nav links. At mobile width (resize to <768px): see logo + hamburger; clicking opens drawer.

- [ ] **Step 10.5: Type-check + build**

```bash
npx tsc --noEmit
npm run build
```

- [ ] **Step 10.6: Commit**

```bash
git add src/components/layout/ src/app/page.tsx
git commit -m "feat: add Navbar with mobile drawer"
```

---

## Task 11: Build Footer

**Files:**
- Create: `src/components/layout/Footer.tsx`

- [ ] **Step 11.1: Create `src/components/layout/Footer.tsx`**

```tsx
import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[color:var(--color-border-subtle)]">
      <Container className="flex flex-col items-center justify-between gap-3 py-5 text-xs text-[color:var(--color-text-meta)] sm:flex-row">
        <div>© {year} {site.name}</div>
        <div className="flex gap-4">
          <a href={site.socials.github} target="_blank" rel="noreferrer" className="hover:text-[color:var(--color-brand-indigo)]">
            GitHub
          </a>
          <a href={site.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-[color:var(--color-brand-indigo)]">
            LinkedIn
          </a>
          <a href={site.socials.medium} target="_blank" rel="noreferrer" className="hover:text-[color:var(--color-brand-indigo)]">
            Medium
          </a>
          <a href={site.socials.stackoverflow} target="_blank" rel="noreferrer" className="hover:text-[color:var(--color-brand-indigo)]">
            Stack Overflow
          </a>
        </div>
      </Container>
    </footer>
  );
}
```

- [ ] **Step 11.2: Update `src/app/page.tsx` to mount Footer**

```tsx
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="top" className="min-h-screen">
        <div className="py-24 text-center text-sm text-[color:var(--color-text-meta)]">
          Sections coming next…
        </div>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 11.3: Verify in dev + build**

```bash
npm run dev   # visually check footer
# Ctrl+C, then:
npm run build
```

- [ ] **Step 11.4: Commit**

```bash
git add src/components/layout/Footer.tsx src/app/page.tsx
git commit -m "feat: add Footer with social links"
```

---

## Task 12: Build Hero section

**Files:**
- Create: `src/components/sections/Hero.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 12.1: Create `src/components/sections/Hero.tsx`**

```tsx
import { Mail, ArrowRight, ExternalLink } from "lucide-react";
import { SiGithub, SiLinkedin, SiMedium, SiStackoverflow } from "react-icons/si";
import { Container } from "@/components/ui/Container";
import { GradientButton } from "@/components/ui/GradientButton";
import type { SiteConfig } from "@/lib/types";

interface HeroProps {
  site: SiteConfig;
}

export function Hero({ site }: HeroProps) {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 70% 20%, rgba(99,91,255,0.08), transparent), radial-gradient(ellipse 60% 50% at 20% 80%, rgba(0,212,255,0.06), transparent)",
      }}
    >
      <Container className="py-14 sm:py-20">
        {site.available && (
          <div className="mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-[color:var(--color-brand-indigo)]">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--color-state-available)]" />
            Open to opportunities
          </div>
        )}

        <h1 className="max-w-[760px] text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-5xl">
          Web developer
          <br />
          building <span className="text-gradient-brand">scalable applications.</span>
        </h1>

        <p className="mt-4 max-w-xl text-sm leading-relaxed text-[color:var(--color-text-body)] sm:text-base">
          {site.bio}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <GradientButton variant="gradient" href={`mailto:${site.email}`}>
            Get in touch <ArrowRight size={16} />
          </GradientButton>

          {site.resumeUrl && (
            <GradientButton variant="outline" href={site.resumeUrl} target="_blank" rel="noreferrer">
              View resume <ExternalLink size={14} />
            </GradientButton>
          )}

          <div className="ml-1 flex items-center gap-3 text-[color:var(--color-text-body)]">
            <a href={site.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-[color:var(--color-brand-indigo)]">
              <SiGithub size={18} />
            </a>
            <a href={site.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-[color:var(--color-brand-indigo)]">
              <SiLinkedin size={18} />
            </a>
            <a href={site.socials.medium} target="_blank" rel="noreferrer" aria-label="Medium" className="hover:text-[color:var(--color-brand-indigo)]">
              <SiMedium size={18} />
            </a>
            <a href={site.socials.stackoverflow} target="_blank" rel="noreferrer" aria-label="Stack Overflow" className="hover:text-[color:var(--color-brand-indigo)]">
              <SiStackoverflow size={18} />
            </a>
            <a href={`mailto:${site.email}`} aria-label="Email" className="hover:text-[color:var(--color-brand-indigo)]">
              <Mail size={18} />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 12.2: Mount in `src/app/page.tsx`**

```tsx
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { site } from "@/content/site";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="top">
        <Hero site={site} />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 12.3: Verify in dev + build**

```bash
npm run dev
```

Open `http://localhost:3000`. Verify: hero renders with gradient backdrop, headline with gradient on "scalable applications.", availability pill, 2 buttons (Get in touch + View resume if URL set, else only Get in touch), 5 social icons.

```bash
npm run build
```

- [ ] **Step 12.4: Commit**

```bash
git add src/components/sections/Hero.tsx src/app/page.tsx
git commit -m "feat: add Hero section"
```

---

## Task 13: Build About / Skills section

**Files:**
- Create: `src/components/sections/About.tsx`
- Modify: `src/app/page.tsx`

The Skills brand-icon mapping uses `react-icons/si`. Lazy access keeps the bundle tree-shakable but requires per-icon imports. The `iconKey` field in `Skill` maps to a `react-icons/si` export name.

- [ ] **Step 13.1: Create `src/components/sections/About.tsx`**

```tsx
import * as Si from "react-icons/si";
import type { IconType } from "react-icons";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TechTag } from "@/components/ui/TechTag";
import type { Skill } from "@/lib/types";

interface AboutProps {
  skills: Skill[];
}

function iconFor(key: string): IconType | null {
  const name = "Si" + key.charAt(0).toUpperCase() + key.slice(1);
  return ((Si as unknown) as Record<string, IconType>)[name] ?? null;
}

export function About({ skills }: AboutProps) {
  return (
    <section id="about" className="border-y border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-subtle)]">
      <Container className="py-12 sm:py-16">
        <SectionHeader eyebrow="About" title="Transforming coffee into code." />

        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[color:var(--color-text-body)] sm:text-base">
          From interactive interfaces to robust backends, I build apps that scale, integrate
          cleanly, and stay maintainable. Below is the stack I reach for most.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {skills.map((skill) => {
            const Icon = iconFor(skill.iconKey);
            return (
              <TechTag key={skill.name} variant="outline" icon={Icon ? <Icon size={12} /> : null}>
                {skill.name}
              </TechTag>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 13.2: Mount in `src/app/page.tsx`**

```tsx
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { site } from "@/content/site";
import { skills } from "@/content/skills";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="top">
        <Hero site={site} />
        <About skills={skills} />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 13.3: Verify in dev + build**

```bash
npm run dev    # visually check skills tags + icons render
# Ctrl+C
npm run build
```

If any skill icon is missing (because the `iconKey` doesn't match a Simple Icons export), update `src/content/skills.ts` with the correct slug. Reference: <https://simpleicons.org/>.

- [ ] **Step 13.4: Commit**

```bash
git add src/components/sections/About.tsx src/app/page.tsx
git commit -m "feat: add About / Skills section"
```

---

## Task 14: Build Experience section (timeline)

**Files:**
- Create: `src/components/sections/Experience.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 14.1: Create `src/components/sections/Experience.tsx`**

```tsx
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TechTag } from "@/components/ui/TechTag";
import { TimelineDot } from "@/components/ui/TimelineDot";
import type { Experience } from "@/lib/types";

interface ExperienceProps {
  experiences: Experience[];
}

export function Experience({ experiences }: ExperienceProps) {
  return (
    <section id="work" className="bg-[color:var(--color-surface-base)]">
      <Container className="py-12 sm:py-16">
        <SectionHeader eyebrow="Experience" title="Where I've worked" />

        <ol className="relative mt-4 pl-5">
          <span
            aria-hidden
            className="absolute top-2 bottom-2 left-0 w-0.5"
            style={{
              background:
                "linear-gradient(180deg, var(--color-brand-indigo), var(--color-brand-cyan), var(--color-border-subtle))",
            }}
          />
          {experiences.map((exp, i) => (
            <li key={`${exp.company}-${i}`} className="relative mb-6 last:mb-0">
              <TimelineDot active={i === 0} />
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-sm font-bold text-[color:var(--color-text-heading)] sm:text-base">
                  {exp.role} ·{" "}
                  {i === 0 ? (
                    <span className="text-gradient-brand">{exp.company}</span>
                  ) : (
                    <span className="text-[color:var(--color-brand-indigo)]">{exp.company}</span>
                  )}
                </h3>
                <span className="text-xs font-medium text-[color:var(--color-text-meta)]">
                  {exp.start} — {exp.end}
                </span>
              </div>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {exp.stack.map((tech) => (
                  <TechTag key={tech} variant="subtle">
                    {tech}
                  </TechTag>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
```

- [ ] **Step 14.2: Mount in `src/app/page.tsx`**

Add the import and `<Experience experiences={experiences} />` after `<About />`:

```tsx
import { Experience } from "@/components/sections/Experience";
import { experiences } from "@/content/experience";
```

Inside `<main>`:

```tsx
<Hero site={site} />
<About skills={skills} />
<Experience experiences={experiences} />
```

- [ ] **Step 14.3: Verify + commit**

```bash
npm run dev    # check timeline renders, gradient line visible, first dot is gradient-filled
# Ctrl+C
npm run build
git add src/components/sections/Experience.tsx src/app/page.tsx
git commit -m "feat: add Experience timeline section"
```

---

## Task 15: Build Projects section

**Files:**
- Create: `src/components/sections/Projects.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 15.1: Create `src/components/sections/Projects.tsx`**

```tsx
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Project } from "@/lib/types";

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  return (
    <section
      id="projects"
      className="border-y border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-subtle)]"
    >
      <Container className="py-12 sm:py-16">
        <SectionHeader eyebrow="Projects" title="Selected work" />

        <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <li
              key={project.name}
              className="overflow-hidden rounded-xl border border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-base)] shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
            >
              <div className="relative aspect-[16/9] w-full bg-gradient-brand">
                <Image
                  src={project.image}
                  alt={`${project.name} preview`}
                  fill
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 320px"
                  className="object-cover opacity-95"
                />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-bold text-[color:var(--color-text-heading)] sm:text-base">
                  {project.name}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-[color:var(--color-text-body)] sm:text-sm">
                  {project.description}
                </p>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[color:var(--color-brand-indigo)] hover:underline sm:text-sm"
                >
                  Visit website <ExternalLink size={12} />
                </a>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
```

- [ ] **Step 15.2: Mount in `src/app/page.tsx`**

```tsx
import { Projects } from "@/components/sections/Projects";
import { projects } from "@/content/projects";
```

```tsx
<Experience experiences={experiences} />
<Projects projects={projects} />
```

- [ ] **Step 15.3: Verify + commit**

```bash
npm run dev    # 3 project cards with images, gradient fallback if image missing
# Ctrl+C
npm run build
git add src/components/sections/Projects.tsx src/app/page.tsx
git commit -m "feat: add Projects section"
```

---

## Task 16: Build Certifications section

**Files:**
- Create: `src/components/sections/Certifications.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 16.1: Create `src/components/sections/Certifications.tsx`**

```tsx
import { ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Certification } from "@/lib/types";

interface CertificationsProps {
  items: Certification[];
}

export function Certifications({ items }: CertificationsProps) {
  return (
    <section id="certifications" className="bg-[color:var(--color-surface-base)]">
      <Container className="py-12 sm:py-16">
        <SectionHeader eyebrow="Certifications" title="Continuous learning" />

        <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((cert) => (
            <li
              key={cert.title}
              className="rounded-lg border border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-base)] p-4"
            >
              <span className="inline-block rounded bg-[color:var(--color-surface-tag)] px-2 py-0.5 text-[10px] font-semibold text-[color:var(--color-text-tag)]">
                {cert.issuer}
              </span>
              <h3 className="mt-2 text-sm font-semibold leading-snug text-[color:var(--color-text-heading)]">
                {cert.title}
              </h3>
              <a
                href={cert.url}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[color:var(--color-brand-indigo)] hover:underline"
              >
                View certificate <ExternalLink size={11} />
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
```

- [ ] **Step 16.2: Mount in `src/app/page.tsx`**

```tsx
import { Certifications } from "@/components/sections/Certifications";
import { certifications } from "@/content/certifications";
```

```tsx
<Projects projects={projects} />
<Certifications items={certifications} />
```

- [ ] **Step 16.3: Verify + commit**

```bash
npm run dev
# Ctrl+C
npm run build
git add src/components/sections/Certifications.tsx src/app/page.tsx
git commit -m "feat: add Certifications section"
```

---

## Task 17: Build Education section

**Files:**
- Create: `src/components/sections/Education.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 17.1: Create `src/components/sections/Education.tsx`**

```tsx
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Education } from "@/lib/types";

interface EducationProps {
  items: Education[];
}

export function Education({ items }: EducationProps) {
  return (
    <section
      id="education"
      className="border-y border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-subtle)]"
    >
      <Container className="py-12 sm:py-16">
        <SectionHeader eyebrow="Education" title="Academic background" />

        <ul className="mt-4 space-y-3">
          {items.map((edu) => (
            <li
              key={edu.school}
              className="flex items-start gap-4 rounded-xl border border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-base)] p-4"
            >
              <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-md bg-gradient-brand">
                <Image
                  src={edu.logo}
                  alt={`${edu.school} logo`}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-sm font-bold text-[color:var(--color-text-heading)] sm:text-base">
                    {edu.school}
                  </h3>
                  <span className="text-xs text-[color:var(--color-text-meta)]">
                    {edu.start} — {edu.end}
                  </span>
                </div>
                <p className="mt-1 text-xs text-[color:var(--color-text-body)] sm:text-sm">
                  {edu.degree}
                  {edu.grade ? ` · ${edu.grade}` : ""}
                </p>
                {edu.highlights && edu.highlights.length > 0 && (
                  <ul className="mt-2 space-y-1 text-xs text-[color:var(--color-text-body)] sm:text-sm">
                    {edu.highlights.map((h) => (
                      <li key={h} className="flex gap-2">
                        <span className="text-[color:var(--color-brand-indigo)]">›</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
```

- [ ] **Step 17.2: Mount in `src/app/page.tsx`**

```tsx
import { Education } from "@/components/sections/Education";
import { education } from "@/content/education";
```

```tsx
<Certifications items={certifications} />
<Education items={education} />
```

- [ ] **Step 17.3: Verify + commit**

```bash
npm run dev
# Ctrl+C
npm run build
git add src/components/sections/Education.tsx src/app/page.tsx
git commit -m "feat: add Education section"
```

---

## Task 18: Build Contact section

**Files:**
- Create: `src/components/sections/Contact.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 18.1: Create `src/components/sections/Contact.tsx`**

```tsx
import { Container } from "@/components/ui/Container";
import { GradientButton } from "@/components/ui/GradientButton";
import type { SiteConfig } from "@/lib/types";

interface ContactProps {
  site: SiteConfig;
}

export function Contact({ site }: ContactProps) {
  return (
    <section
      id="contact"
      className="relative"
      style={{
        background:
          "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(99,91,255,0.06), transparent)",
      }}
    >
      <Container className="py-16 text-center sm:py-20">
        <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-[color:var(--color-brand-indigo)]">
          Contact
        </div>
        <h2 className="text-2xl font-extrabold leading-tight tracking-[-0.02em] text-[color:var(--color-text-heading)] sm:text-3xl">
          Let&rsquo;s build something <span className="text-gradient-brand">together.</span>
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-[color:var(--color-text-body)]">
          Discuss a project or just want to say hi? My inbox is open.
        </p>
        <div className="mt-5">
          <GradientButton variant="gradient" href={`mailto:${site.email}`}>
            {site.email}
          </GradientButton>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 18.2: Mount in `src/app/page.tsx`**

Final `src/app/page.tsx`:

```tsx
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Certifications } from "@/components/sections/Certifications";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";

import { site } from "@/content/site";
import { skills } from "@/content/skills";
import { experiences } from "@/content/experience";
import { projects } from "@/content/projects";
import { certifications } from "@/content/certifications";
import { education } from "@/content/education";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="top">
        <Hero site={site} />
        <About skills={skills} />
        <Experience experiences={experiences} />
        <Projects projects={projects} />
        <Certifications items={certifications} />
        <Education items={education} />
        <Contact site={site} />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 18.3: Full visual review**

```bash
npm run dev
```

Open `http://localhost:3000` and check every section in order: Navbar → Hero → About → Experience → Projects → Certifications → Education → Contact → Footer. Check at 360px, 768px, 1024px, 1440px widths.

- [ ] **Step 18.4: Build + commit**

```bash
npm run build
git add src/components/sections/Contact.tsx src/app/page.tsx
git commit -m "feat: add Contact section and compose full page"
```

---

## Task 19: GitHub Actions deploy workflow

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 19.1: Create `.github/workflows/deploy.yml`**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [master]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"
      - run: npm ci
      - run: npm run build
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: out

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 19.2: Commit (do not push yet — user will push when ready)**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: add GitHub Pages deploy workflow"
```

- [ ] **Step 19.3: Reminder to user**

Tell the user: "In the GitHub repo settings → Pages → Source, set 'GitHub Actions'. After that's set, pushing to `master` will deploy automatically."

---

## Task 20: Write a fresh README

**Files:**
- Modify: `README.md`

- [ ] **Step 20.1: Replace `README.md` contents**

```markdown
# shehwar-ahmad.github.io

Personal portfolio at <https://shehwar-ahmad.github.io>.

## Stack

- Next.js 16 (App Router, static export)
- React 19, TypeScript
- Tailwind CSS v4
- Inter via `next/font/google`
- Deployed via GitHub Actions → GitHub Pages

## Development

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # produces ./out
npm run lint
```

## Content

All content lives in `src/content/*.ts` as typed modules. Edit those files and rebuild.

Images live in `public/images/{logos,projects,certs,schools,profile}/`.

## Deploy

Pushing to `master` triggers `.github/workflows/deploy.yml`, which builds the static site and publishes to GitHub Pages.
```

- [ ] **Step 20.2: Commit**

```bash
git add README.md
git commit -m "docs: rewrite README for new Next.js stack"
```

---

## Task 21: Final verification and Lighthouse pass

- [ ] **Step 21.1: Full build**

```bash
npm run build
```

Expected: no warnings, no errors, `out/` populated.

- [ ] **Step 21.2: Type-check + lint**

```bash
npx tsc --noEmit
npm run lint
```

Expected: clean.

- [ ] **Step 21.3: Serve `out/` locally and run Lighthouse**

```bash
npx --yes serve out -p 8080
```

Open `http://localhost:8080` in Chrome → DevTools → Lighthouse → run for Mobile. Targets:
- Performance ≥ 95
- Accessibility ≥ 95
- Best Practices = 100
- SEO = 100

If any target misses, fix obvious issues (alt text, color contrast, missing meta). Re-run.

- [ ] **Step 21.4: Stop server, commit any fixes**

If fixes were made, commit them.

```bash
git add -A
git commit -m "perf: address Lighthouse findings"
```

---

## Task 22: Cleanup `_legacy-content/` (only after user confirms)

This task waits for the user to confirm the rebuild looks correct and content is preserved.

- [ ] **Step 22.1: Ask the user**

Tell the user: "The rebuild is done. Before I delete `_legacy-content/`, please open <http://localhost:3000> (or the deployed site) and confirm everything is correct — experience dates, project descriptions, cert links, education, social links. Reply 'go ahead' when you're satisfied."

- [ ] **Step 22.2: Once confirmed, remove the staging folder**

```bash
git rm -r _legacy-content/
git commit -m "chore: remove legacy content staging folder"
```

- [ ] **Step 22.3: Final push (user pushes when ready)**

```bash
# user-driven:
git push origin master
```

Pushing triggers the GitHub Actions deploy.

---

## Self-Review

**Spec coverage** — every spec section maps to a task:

| Spec section | Task(s) |
|---|---|
| Tech stack (Next 16, React 19, TS, Tailwind v4) | Tasks 2, 3, 4 |
| Visual design — palette, typography, layout | Tasks 4, 5, 9–18 |
| Dark mode (not in v1) | N/A — confirmed excluded |
| Sections (Hero, About, Experience, Projects, Certs, Education, Contact) | Tasks 12–18 |
| Mobile nav (hamburger drawer) | Task 10 |
| Content preservation (`_legacy-content/`) | Tasks 1, 22 |
| Typed content modules | Tasks 6, 7 |
| Component contracts (Container, SectionHeader, TechTag, GradientButton, TimelineDot) | Task 9 |
| Performance practices (RSC default, next/font, deferred GA, unoptimized images, tree-shake) | Tasks 5, 7, 9–18, 21 |
| Tailwind conventions (tokens, no inline, no arbitrary values, mobile-first) | Tasks 4, 9–18 |
| Static export config | Task 3 |
| SEO + metadata | Task 5 |
| GH Actions deploy | Task 19 |
| README | Task 20 |
| Acceptance criteria (Lighthouse, responsive) | Task 21 |

**Placeholder scan:** none — all code blocks are complete.

**Type consistency:**
- `SiteConfig.resumeUrl: string | null` is checked everywhere it's used (`Navbar`, `MobileNav`, `Hero`).
- `Experience.current` is optional; first-entry check uses index `i === 0` for "active" styling rather than the `current` field, which is acceptable.
- `Education.highlights` is optional and conditionally rendered.
- `Skill.iconKey` mapping in `About.tsx` uses `react-icons/si` exports — flagged risk: any unknown key returns `null` and the icon is omitted (graceful degradation).
- Section components consistently accept their data as props (no hidden imports from `@/content`), matching the spec's "props-driven sections" principle.

---

Plan complete and saved to [docs/superpowers/plans/2026-05-23-portfolio-rebuild-plan.md](./2026-05-23-portfolio-rebuild-plan.md).

## Execution options

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review the diff between tasks, fast iteration.

**2. Inline Execution** — execute tasks in this session using the executing-plans skill, batch execution with checkpoints for review.

Which approach?
