# feribarra.dev

Personal landing page — Senior Backend / Full Stack Developer. React 19, Vite 7,
Tailwind 4, TypeScript. Bilingual (ES/EN), light/dark, no backend.

## Setup

```bash
pnpm install
cp .env.example .env.local   # fill in the EmailJS values
pnpm dev
```

The contact form posts through [EmailJS](https://www.emailjs.com/), so no server
is involved. `.env.local` is gitignored; `.env.example` documents the three keys:

| Variable | Where to find it |
|---|---|
| `VITE_EMAILJS_SERVICE_ID` | EmailJS dashboard → Email Services |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS dashboard → Email Templates |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS dashboard → Account → API Keys |

Without these the form renders and validates but `emailjs.send` rejects; the
failure surfaces as an error toast.

## Scripts

| Command | What it does |
|---|---|
| `pnpm dev` | Vite dev server with HMR |
| `pnpm build` | `tsc -b` then `vite build` into `dist/` |
| `pnpm preview` | Serve the built output locally |
| `pnpm lint` | ESLint over the whole tree |

## Structure

```
src/
  components/        one file per section, plus ui/ (shadcn primitives)
  i18n/              es.ts + en.ts dictionaries, provider, useI18n hook
  globals.css        the design system: tokens, @theme scale, utilities
public/
  cv/                the two CV PDFs, served as static files
```

**The design system lives in `src/globals.css`.** Tailwind v4 has no config file,
so the type scale, easings, and `container-page` are declared in `@theme` and
`@utility` blocks there. Adding a `tailwind.config.js` will silently do nothing.

**Content is not in components.** Every user-visible string lives in the `es`/`en`
dictionaries; `Dict` is typed from `es`, so adding a key to one dictionary and not
the other is a type error.

## Deployment

Static output — `dist/` can be served by any host. `index.html` carries the meta
tags, Open Graph card, JSON-LD `Person`, and an inline pre-hydration theme script
that prevents the dark-mode flash.
