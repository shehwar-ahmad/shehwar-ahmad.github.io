# shehwar-ahmad.github.io

Personal portfolio at <https://shehwar-ahmad.github.io>.

## Stack

- Next.js 16 (App Router, static export)
- React 19 · TypeScript (strict)
- Tailwind CSS v4 (semantic theme tokens in `src/app/globals.css`)
- Inter via `next/font/google`
- ESLint + `eslint-plugin-better-tailwindcss`
- Prettier + `prettier-plugin-tailwindcss`
- Husky + lint-staged pre-commit hook
- Deployed via GitHub Actions → GitHub Pages

## Development

```bash
npm install
npm run dev          # http://localhost:3000
```

### Quality scripts

```bash
npm run typecheck    # tsc --noEmit
npm run lint         # eslint
npm run lint:fix     # eslint --fix
npm run format       # prettier --write .
npm run format:check # prettier --check .
npm run build        # next build → ./out
```

The pre-commit hook (`.husky/pre-commit`) runs `lint-staged` (Prettier + ESLint
on staged files) and then `tsc --noEmit` on the whole project. CI runs all four
quality gates plus the build before deploying.

## Content

All content lives in `src/content/*.ts` as typed modules. Edit those files and
rebuild — no CMS, no fetching, nothing dynamic.

```
src/content/
├── site.ts            Name, bio, email, social links
├── skills.ts          Tech stack
├── experience.ts      Work history
├── projects.ts        Featured projects
├── certifications.ts  Certificates
└── education.ts       Academic history
```

Images go under `public/images/{logos,projects,certs,schools,profile}/`.

## Design system

Tailwind v4 design tokens are defined in `src/app/globals.css` under `@theme`.
Components use the shorthand utilities they generate (`text-foreground`,
`bg-muted`, `border-line`, `text-brand`, `bg-accent`, etc.) — not arbitrary
color-var syntax. The `eslint-plugin-better-tailwindcss` rules guard against
regressions.

## Deploy

Pushing to `master` triggers `.github/workflows/deploy.yml`. The workflow
type-checks, lints, format-checks, builds, and publishes the `out/` directory
to GitHub Pages.

To enable: in the GitHub repo settings → Pages → Source, set **GitHub Actions**.
