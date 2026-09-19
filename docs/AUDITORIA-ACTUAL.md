# 03 — Landing Site Audit: Feribarra-landing

**Audited:** `/Users/fernandoibarra/Documents/Development/Feribarra-landing`
**Date:** 2026-09-18
**Scope:** every file in `src/`, plus `index.html`, `package.json`, `components.json`, `vite.config.ts`, `tsconfig.app.json`
**Method:** full source read; `pnpm install` + `tsc -b` + `eslint .` + `vite build` all executed against the real tree; emitted CSS inspected to confirm which utility classes actually produce output; WCAG contrast ratios computed from the oklch tokens; i18n dictionaries diffed programmatically.

## Verdict up front

The stack is modern and the bones are fine. What holds this site back is not the framework — it is that **the content is a year out of date, the hero is an emoji, and roughly a third of the visual effort is spent on decoration that reads as "template" rather than "senior engineer."**

Three things are true at once:

1. **The site undersells the owner.** The CV's headline is *Senior Backend / Full Stack Developer* with current employment at Rocket Code on a multi-tenant NestJS microservice fleet. The site says "React developer with 4+ years" and lists INOWU as the current job — a job the CV says ended in Nov 2025. A recruiter reading only the site would conclude he is a mid-level React dev who is still at his previous employer.
2. **The code is healthier than it looks.** `tsc -b` passes clean. There are no unused imports, no type errors, no broken build. The debt is concentrated, not diffuse: 13 ESLint errors, one dead file, one dead asset, ~60 lines of commented-out markup, and 8 `any` casts that all trace back to one design decision in the i18n provider.
3. **The "premium" gap is a decoration problem, not a budget problem.** Emoji avatar, infinite glow on the logo, mouse-parallax blobs, three floating icon squares, `animate-bounce` on a CTA arrow, a fake 5-dot skill rating. Removing these and adding real content signals is most of the work.

**Verified build facts:** `tsc -b` exit 0 · `eslint .` = 13 errors, 2 warnings · `vite build` succeeds, emitting a **447 kB JS bundle (139 kB gzip)** and **6.3 MB of images** (7.4 MB in `src/assets`).

---

## Critical

### C1. The current job is missing and the previous one is mislabelled as current
**Files:** `src/i18n/es.ts:229-254`, `src/i18n/en.ts:229-254`

`experiences` contains exactly two entries: INOWU Development and IGRTEC. The authoritative CV (`/tmp/cv_en.txt:27-28`, `/tmp/cv_es.txt`) shows **Rocket Code — Senior Backend Developer — Nov 2025 – Present** as the current role, and INOWU as **Dec 2023 – Nov 2025**.

The site therefore:
- omits the most senior and most recent role entirely;
- claims `period: "Dic 2023 – Presente"` / `"Dec 2023 – Present"` for INOWU, which is factually wrong by ~10 months.

**Why it matters:** This is the single most damaging defect on the site. A portfolio's job is to establish current seniority in the first screen. Right now it establishes the wrong employer and understates the level. Any recruiter who cross-checks against LinkedIn finds a contradiction. This is a correctness bug, not a content nit.

### C2. The hero avatar is a 🚀 emoji
**File:** `src/components/hero-section.tsx:69`

```tsx
<span className="text-9xl font-bold">🚀</span>
```

Rendered at `text-9xl` inside a `w-50 h-50` gradient circle, with a `blur-2xl scale-150` glow behind it and an `animate-float` on the container. The commented-out logo `<img>` sits directly above it at lines 66-68.

**Why it matters:** An emoji as the primary identity mark is the clearest single "this was generated from a template" signal a landing page can carry. It is the first thing above the fold, it renders differently on every OS (Apple/Google/Microsoft emoji fonts are visually unrelated), and it carries no brand. For a "premium" redesign this is the first thing to replace — with a real portrait, a monogram, or a designed mark.

### C3. The contact form's spam protection does not work, and the honeypot shares state with a real field
**File:** `src/components/contact-section.tsx:41-45, 164, 203`

The honeypot is registered **twice under the same name**:

```tsx
// line 164 — hidden decoy
<input type="text" autoComplete="off" tabIndex={-1} className="hidden" {...register("company")} />
// line 203 — the real, visible "Empresa" field
<Input placeholder={t("contactSection.companyPlaceholder")} ... {...register("company")} />
```

And the guard that would use it is commented out at lines 41-45:

```tsx
// if (values.company) {
//     toast.success(t("contactSection.toastSuccess"));
//     reset();
//     return;
// }
```

Two consequences: (a) the honeypot cannot distinguish a bot from a human, because a human filling in "Empresa" sets the exact same form value the bot would; (b) the guard is disabled, so nothing rejects anything. The form is effectively unprotected, and the two same-named inputs are invalid HTML.

**Why it matters:** The form is the site's only conversion path. It is silently unguarded, and the code reads as if it is guarded — which is worse than no honeypot, because nobody will go looking.

### C4. `max-w-8xl` does not exist — the skills grid is unconstrained
**File:** `src/components/skills-section.tsx:23`

```tsx
<div className="max-w-8xl mx-auto">
```

Tailwind v4's named max-width scale stops at `7xl`. I confirmed against the shipped 4.1.12 build: **`max-w-8xl` emits no CSS at all** (grepped the emitted stylesheet — zero matches). Every other section constrains itself (`max-w-4xl`, `max-w-6xl`, `max-w-7xl`); the skills section alone does not.

**Why it matters:** The 5-column skills grid stretches to the full `.container` width at every breakpoint, so it is the one section whose content edge does not line up with the rest of the page. On a wide monitor this is immediately visible as a misaligned section. One-class fix, but it is a real layout break.

---

## High

### H1. SEO is effectively absent
**File:** `index.html:1-13`

Present: `<title>`, charset, viewport, fonts. **Absent:** `meta description`, Open Graph (`og:title/description/image/url/type`), Twitter card, `canonical`, JSON-LD (`Person` / `schema.org`), `robots.txt`, `sitemap.xml`.

Also two concrete bugs in the head:
- **line 7:** `<link rel="logo" type="image/x-icon" href="/favicon.ico" />` — `logo` is not a valid link relation for a favicon. Should be `rel="icon"`. Browsers currently recover only because they probe `/favicon.ico` by convention.
- **line 1:** `<html lang="en">` is hardcoded, while the i18n provider defaults to **Spanish** (`src/i18n/index.tsx:27`). Every default-language visitor gets a document declared as English, and the attribute is never updated when the toggle flips.

**Why it matters:** A portfolio is a link people paste into Slack, email, and LinkedIn. With no OG tags, every share renders as a bare URL with no preview card — which measurably reduces click-through. The `lang` mismatch is both an SEO and a screen-reader defect (Spanish content read with an English voice).

### H2. 6.3 MB of unoptimized images, served eagerly
**Files:** `src/assets/*` (7.4 MB total), `src/components/navigation.tsx:41`, `src/components/projects-section.tsx:60,142`, `src/components/certifications-section.tsx:34`

Build output:

| Asset | Size |
|---|---|
| `ProyectoVR.png` | 1,438 kB |
| `FILogo.png` | 1,378 kB |
| `ProyectoEntrify.png` | 1,213 kB |
| `ProyectoWFacturas.png` | 1,042 kB |
| `ProyectoVotometrica.png` | 758 kB |
| `ProyectoRealDeal.png` | 485 kB |

No `loading="lazy"`, no `decoding="async"`, no `width`/`height` attributes, no `srcset`, no WebP/AVIF anywhere (grepped: zero matches for all of these across `src/components/*.tsx`).

Two specific wastes:
- **`FILogo.png` is 1.38 MB and is rendered at `h-12 w-12` (48×48 px)** in the nav. That is roughly a 600× over-fetch for a logo.
- **`FILogo2.png` (1.45 MB) is never imported anywhere** — pure dead weight in the repo.

Additionally, `certifications-section.tsx:34` hotlinks all 17 certificate images from `https://i.imgur.com/...`. These are third-party, unversioned, un-lazy-loaded, and will 404 or rate-limit without warning — for the section that is already the longest on the page.

**Why it matters:** Missing `width`/`height` on every `<img>` means cumulative layout shift on load — the page visibly jumps. Eager-loading 6 MB on a mobile connection is a multi-second blank screen. This is the largest measurable performance defect on the site and it is entirely mechanical to fix.

### H3. The fake 5-dot skill rating is misleading and invisible
**File:** `src/components/skills-section.tsx:48-58`

```tsx
{[...Array(5)].map((_, i) => (
  <div className={`... ${hoveredSkill === `${cIdx}-${sIdx}`
      ? i < 4 ? "bg-primary" : "bg-muted"
      : "bg-muted"}`} />
))}
```

Every single skill in every category resolves to **4 of 5 dots** on hover. The value is hardcoded (`i < 4`); it is not derived from any data in the dictionaries. It is also invisible until hover, so it communicates nothing at rest, and it is mouse-only — no keyboard path, no screen-reader text.

**Why it matters:** A self-assigned proficiency score that is identical for "React.js" and "NPM" is not information, it is decoration that looks like information. Worse, it invites the reader to *disbelieve* the rest of the section. Either make it real (per-skill level in the dictionary, rendered as a visible labelled meter with an accessible name) or delete it.

### H4. The "Featured Project" duplicates the grid
**File:** `src/components/projects-section.tsx:38-111` (grid) and `114-176` (featured)

The grid renders all 5 projects, then `projects[0]` is rendered **a second time** in full — same image, same title, same description, same tech pills, same button — under a second heading (`projectsSection.title2` = "Proyecto Destacado" / "Featured Project").

**Why it matters:** Votométrica appears twice on one page. The reader scrolls past it, then meets it again and has to work out whether this is a different project. Duplicating the first grid item is not "featuring" it — featuring means *excluding* it from the grid and giving it a distinct, larger treatment. As built, it is redundant content plus a second `<h2>`-level heading competing with the first.

### H5. Anchor elements nested inside `<button>`
**File:** `src/components/hero-section.tsx:96-116`

```tsx
<Button size="lg" className="...">
    <a href="#proyectos" className="flex items-center gap-3 relative z-10">
        {t("hero.ctaProjects")}
        <ArrowDown ... />
    </a>
    ...
</Button>
```

`Button` renders a real `<button>` (no `asChild`), so the DOM is `<button><a>…</a></button>`. Interactive content nested inside a button is invalid HTML, and the two elements fight over focus and activation. The sibling component `projects-section.tsx:96-105` does this correctly with `asChild` — so the correct pattern already exists in the codebase.

**Why it matters:** Keyboard users hit two tab stops for one control; some browsers swallow the inner click; screen readers announce a button containing a link. Also, the two hero CTAs are the primary conversion path.

### H6. Social links are buttons, not links
**File:** `src/components/hero-section.tsx:125-138`

```tsx
<Button ... onClick={() => (window.location.href = url)}>
```

GitHub, LinkedIn, and the `mailto:` are all `<button>` elements driven by a JS navigation. They are not anchors, so there is no "open in new tab", no right-click → copy link, no middle-click, and crawlers cannot follow them.

**Why it matters:** These are the highest-intent links on the page (a recruiter clicking through to GitHub). Making them buttons removes standard browser affordances for no benefit.

### H7. Every contact form label is unassociated with its input
**File:** `src/components/contact-section.tsx:168-216`

All five `<label>` elements have no `htmlFor`; all five inputs have no `id`. The label text is also a duplicate of the placeholder (`t("contactSection.namePlaceholder")` is used for both, lines 168 and 170).

Error messages (lines 174, 184, 195, 205, 216) are plain `<p className="text-sm text-red-500">` — no `aria-describedby` linking them to the field, no `role="alert"`, no `aria-live`, and `aria-invalid` is never set as an attribute (it is only styled in `ui/input.tsx:13`).

**Why it matters:** A screen-reader user tabbing into the form hears the placeholder, then loses it the moment they type. When validation fails, the error is announced to nobody — sighted users see red text, non-sighted users get silence and a form that will not submit. This is a WCAG 3.3.1/3.3.2 failure on the site's only conversion path.

### H8. `theme-toggle` reads localStorage unguarded and has a logic bug in "system"
**File:** `src/components/theme-toggle.tsx:19-21, 24-34`

```tsx
const [theme, setThemeState] = useState<string>(() => {
    return localStorage.getItem("theme") || "system";   // no try/catch
});
```

`i18n/index.tsx:31` wraps its localStorage access in `try { } catch {}`; this does not. In a private window or with site data blocked, `localStorage.getItem` throws and takes the whole nav down.

The "system" branch is also wrong:

```tsx
setHtmlTheme("system");                                  // removes the "theme" key
const listener = (e) => setHtmlTheme(e.matches ? "dark" : "light");  // WRITES the key
```

`setHtmlTheme("dark"|"light")` calls `localStorage.setItem("theme", …)` (line 14). So the first time the OS theme changes while the user is on "system", the preference is silently pinned to an explicit light/dark value and the user is no longer following the system. "System" quietly un-selects itself.

**Why it matters:** The first is a crash path; the second is a state bug that is invisible until the user notices their theme stopped following their OS — at which point they will blame the site, not the code. There is also a **theme flash**: the theme is applied in a `useEffect` after mount, so dark-mode users see a white flash on every load. The standard fix is a small blocking inline script in `index.html`.

### H9. Content does not reflect the actual seniority or the Nova work
**Files:** `src/i18n/es.ts` / `en.ts` — `hero`, `experienceSection`, `skillsSection`

Beyond C1, the site omits essentially all of the recent, differentiating work documented in the CV and in `Nova Microservicios`:

- **Nova platform** — multi-tenant insurance platform serving **Walmart, Liverpool, and Suburbia**; NestJS 11 microservice fleet; Clean Architecture (Ports & Adapters); Strategy + Factory for payment method × product domain; RabbitMQ RPC and async messaging; Redis; Prisma across 6 clients; SQL Server; Keycloak; a centralized payment engine.
- **Skills section** (`es.ts:42-52`) omits: RabbitMQ, Redis, Microservices, REST APIs, Keycloak, PNPM, SQL Server, Clean Architecture, Docker Compose. These are exactly the terms a backend-focused recruiter greps for.
- **Education** is absent entirely: Tecnológico Nacional de México, Campus Hermosillo — Bachelor's Degree in Software Development, Aug 2017 – Dec 2024.
- **Languages** are absent: Spanish (native), English (basic professional proficiency).
- **Positioning:** `hero.role` is "Desarrollador Full Stack" / "Full Stack Developer" and `hero.description` opens "Desarrollador React con más de 4 años…" — the CV headline is "Senior Backend / Full Stack Developer."

**Why it matters:** The Nova work is the strongest material available and none of it is on the site. The skills list currently reads as a frontend-leaning generalist, which is the opposite of the backend-senior story the CV tells. This is a content problem, not a design problem, and no amount of visual polish fixes it.

### H10. No CV/resume download anywhere
**Files:** all components

There is no link to a PDF resume, no "Download CV" CTA, no `public/` asset for it (`public/` contains only `favicon.ico`).

**Why it matters:** For the primary audience — a recruiter or hiring manager — downloading the CV is the single highest-value action on the page, and it is the one action the page does not offer. It is also the natural bridge between the site and the ATS pipeline.

---

## Medium

### M1. Nested `<section>` with doubled vertical padding on every section
**Files:** `src/App.tsx:14-36` + every `*-section.tsx`

`App.tsx` wraps each component in `<section id="…" className="py-20">`, and each component renders its **own** `<section className="py-20">` inside that. Confirmed: `App.tsx` has 6 `<section>` elements; `hero-section.tsx` adds a 7th.

The hero compounds it three ways: `App.tsx:14` `py-20` → `hero-section.tsx:22` `min-h-screen … py-5`, and the hero's own content wrapper adds `mb-12`/`mb-16` on top.

Contact is the outlier: `App.tsx:34` uses `pt-20` (no bottom padding) while `contact-section.tsx:74` uses `py-20`.

**Why it matters:** Every section carries ~80px of vertical padding instead of ~40px, so the page is roughly twice as long as its content warrants, and the rhythm is inconsistent at the top and bottom of the page. It also produces invalid-ish nesting (a landmark `<section>` inside another landmark `<section>`).

### M2. The hero re-renders the entire subtree on every mousemove
**File:** `src/components/hero-section.tsx:11-19, 27-40`

```tsx
const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
useEffect(() => {
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY })
    window.addEventListener("mousemove", handleMouseMove)
    ...
}, [])
```

Every mouse movement triggers a React state update, which re-renders the hero — including the avatar, both CTAs, and the three social buttons — at mousemove frequency (often 60-120×/second). The two consumers are inline `style` offsets on decorative blurs.

**Why it matters:** This is a self-inflicted main-thread cost on the first screen, on the page's most expensive subtree, for a purely decorative parallax. A ref plus `requestAnimationFrame`, or writing CSS custom properties directly to the DOM node, removes the re-render entirely.

### M3. `navigation` scroll listener is unthrottled and not passive
**File:** `src/components/navigation.tsx:14-20`

```tsx
window.addEventListener("scroll", handleScroll)   // no { passive: true }, no rAF/throttle
```

`handleScroll` calls `setScrolled` on every scroll event. React bails out when the value is unchanged, so this is not catastrophic, but the listener still fires synchronously on the scroll thread without `passive: true`.

**Why it matters:** Scroll-linked jank on mobile is one of the most noticeable quality signals, and both fixes are one-liners.

### M4. `useMemo` in `projects-section` is both broken and pointless
**File:** `src/components/projects-section.tsx:16-20`

```tsx
const images = { ProyectoVotometrica, ... } as const          // recreated every render
const projects = useMemo(() =>
    dict.projects.map((p) => ({ ...p, image: (images as any)[p.imageKey] })),
    [dict.projects]                                        // missing dep: images
)
```

ESLint flags the missing dependency (`react-hooks/exhaustive-deps`). More fundamentally, `images` is constructed inside the component body on every render, so the memo's dependency is never stable — it cannot do its job. It also hides a real type hole behind `as any`.

**Why it matters:** The memo costs a dependency-array comparison and a lint warning while providing zero memoization. Either hoist `images` to module scope and type it properly, or drop the memo.

### M5. The `dict` union type forces `any` at every call site
**Files:** `src/i18n/index.tsx:6`, and `: any` at `experience-section.tsx:19`, `skills-section.tsx:25`, `certifications-section.tsx:19,27`, `projects-section.tsx:18`

```tsx
type Dict = typeof es | typeof en
```

Because `Dict` is a **union of two concrete object types**, TypeScript cannot resolve `.map` over a union of array types without narrowing, so every consumer degrades to `(exp: any, index: number)`. That is the root cause of 5 of the 8 `any` casts in the codebase.

**Why it matters:** The dictionaries are structurally identical, so the union buys nothing and costs type safety everywhere it is consumed. A single shared `Dict` interface (or `satisfies Dict` on each dictionary) would let every `.map` infer correctly and delete all five casts.

### M6. `t()` silently renders the key path on a missing key
**File:** `src/i18n/index.tsx:20-22, 38`

```tsx
function get(obj: any, path: string, fallback = ""): string { ... }
const t = (path: string) => get(dict, path, path)   // fallback = the path itself
```

A typo'd or missing key renders the literal string `hero.ctaProject` into the page rather than failing loudly or falling back to the other language.

**Why it matters:** i18n bugs become visual bugs that ship. Combined with the fact that the dictionaries are structurally perfect today (see the parity section), this is latent rather than active — but it means the *next* key added is a coin flip.

### M7. `ui/input.tsx` and `ui/textarea.tsx` have been hand-edited away from shadcn defaults and fight the theme
**Files:** `src/components/ui/input.tsx:11-14`, `src/components/ui/textarea.tsx:10-11`

Four separate problems in the input:

1. **`h-9 … py-5`** (line 11) — a 36px-tall box with 40px of vertical padding. The padding is clamped, so the declared height and the declared padding contradict each other. Likely intended as a taller field.
2. **`font-semibold`** (line 14) — semibold is wrong for form input text; it makes typed values look like labels.
3. **Hardcoded `bg-white text-black dark:text-white`** (line 14) — bypasses the `--background`/`--foreground` tokens entirely, so the fields do not participate in the theme.
4. **`dark:dark:bg-neutral-800/30` and `dark:dark:aria-invalid:…`** (lines 11, 13) — a doubled `dark:` variant. I confirmed this emits as `.dark\:dark\:bg-neutral-800\/30:is(.dark *):is(.dark *)` in the built CSS. It happens to match, but it is a copy-paste artifact and the intent is unreadable.

`contact-section.tsx:171,181,192,202,213` then re-overrides all of this per-field with `bg-background/50 border-border focus:border-primary/50 focus:ring-primary/20`, so the component's own styling is dead weight at every call site.

**Why it matters:** These are the only two form primitives on the site, and they are the ones a redesign will lean on hardest. They should be restored to token-driven shadcn defaults before anything is built on top of them.

### M8. Contrast failures in the theme tokens
**File:** `src/globals.css:6-76`

Computed WCAG ratios from the oklch values (sRGB conversion, relative luminance):

**Light mode**
| Pair | Ratio | Verdict |
|---|---|---|
| `muted-foreground` on `bg-muted/30` (composited `#f2f6f9`) | **4.45:1** | fails AA normal (needs 4.5) |
| white on `secondary` | **4.43:1** | fails AA normal |
| `secondary` on `background` | **4.18:1** | AA large text only |
| `muted-foreground` on `background` | 4.57:1 | passes, thin margin |

**Dark mode**
| Pair | Ratio | Verdict |
|---|---|---|
| white on `secondary` | **2.88:1** | fails AA badly |

The dark-mode failure has a concrete manifestation: `certifications-section.tsx:36` renders `<Badge variant="secondary" className="text-xs text-white">`, and `secondary` in dark mode is `oklch(0.65 0.15 200)`. That is white text at **2.88:1** on all 17 certification cards.

Separately, `bg-muted/30` in light mode composites to `#f2f6f9` against a `#f6f9fb` background — a difference of roughly 1.5% luminance. The intended "alternating section background" is invisible in light mode, so the Skills and Certifications sections do not actually alternate.

**Why it matters:** Contrast is the most objective accessibility measure available and two of these are outright failures. The `bg-muted/30` finding is a design finding as much as an a11y one: a section rhythm that only exists in dark mode is not a rhythm.

### M9. Infinite animations ignore `prefers-reduced-motion`
**Files:** `src/globals.css:171-185`, `hero-section.tsx:43-57,102`, `navigation.tsx:39`

`animate-float` (6s infinite), `animate-glow` (2s infinite), `animate-bounce` on the hero CTA arrow, plus `animate-slide-up` / `animate-fade-scale` entrance animations. The **only** `prefers-reduced-motion` block in the repo is in `src/App.css:30` — a file that is never imported.

**Why it matters:** WCAG 2.3.3. Infinite motion is a genuine problem for vestibular-sensitive users, and this site has five simultaneous infinite animations above the fold.

### M10. The nav cannot be closed by keyboard and exposes no state
**File:** `src/components/navigation.tsx:65-72, 76-92`

The mobile menu trigger is an icon-only `<Button>` with no `aria-label`, no `aria-expanded`, and no `aria-controls`. The open panel (lines 76-92) does not close on `Escape`, does not close on outside click, does not lock body scroll, and does not move focus into itself.

**Why it matters:** The button is announced to a screen reader as an unlabelled button — the user cannot tell what it does or whether the menu is open. Escape-to-close is a baseline expectation for any overlay.

### M11. `theme-toggle` menu items are hardcoded Spanish
**File:** `src/components/theme-toggle.tsx:47-49`

```tsx
<DropdownMenuItem onClick={() => setThemeState("light")}>Claro</DropdownMenuItem>
<DropdownMenuItem onClick={() => setThemeState("dark")}>Oscuro</DropdownMenuItem>
<DropdownMenuItem onClick={() => setThemeState("system")}>Sistema</DropdownMenuItem>
```

These strings live in the component, not in the dictionaries, so an English visitor gets a Spanish theme menu.

**Why it matters:** Worth calling out because a dictionary-to-dictionary diff (which is how i18n gaps are normally found) **cannot see this**. The parity check passes while the UI is still untranslated. This is the exact class of bug the parity section below would otherwise miss.

### M12. Dead-end CTA at the end of the contact section
**File:** `src/components/contact-section.tsx:236-245`

```tsx
<h3>{t("contactSection.footerTitle")}</h3>      // "¿Listo para comenzar tu próximo proyecto?"
<p>{t("contactSection.footerSubtitle")}</p>     // "Conversemos sobre cómo puedo…"
```

A heading and a subtitle, with **no button, no link, no action**. It is the last thing on the page.

**Why it matters:** The page's final impression is a call to action with nothing to click. There is also no real footer — no copyright, no social links, no secondary nav.

### M13. `bg-gradient-to-*` is fine; `font-geist-sans` is not
**Files:** `src/components/theme-toggle.tsx:40,46`

I checked this carefully because it is widely reported as a Tailwind v4 breaking change. It is not one, and I verified it against the shipped compiler rather than blog posts:

- **`bg-gradient-to-*` still works.** Tailwind 4.1.12 registers it as a static utility (`r.utilities.static("bg-gradient-to-${t}", …)` in `chunk-G2G5QLSU.mjs`), and the emitted stylesheet contains live `.bg-gradient-to-r` and `.bg-gradient-to-br` rules. The 14 usages in this codebase render correctly. **No action needed** — though migrating to `bg-linear-to-*` is still the forward-looking choice.
- **`font-geist-sans` is genuinely dead.** Geist is not installed and not loaded in `index.html` (which loads Inter and JetBrains Mono). Grepping the emitted CSS for `font-geist-sans` returns **zero matches**. The class emits nothing.

**Why it matters:** Only the second is a real bug, and it is cosmetic — but it is a good example of a class that looks plausible, lints clean, builds clean, and silently does nothing.

### M14. `App.tsx` mixes import styles
**File:** `src/App.tsx:7`

```tsx
import { ProjectsSection } from "./components/projects-section"   // relative
```

Every other import in the file (lines 1-6) uses the `@/` alias.

**Why it matters:** Trivial on its own, but it is the kind of inconsistency that signals the file was edited by different hands without a convention.

---

## Low

### L1. Dead file: `src/App.css` (42 lines)
Never imported (grepped `src/` and `index.html` — zero references). It is the unmodified Vite template stylesheet, including `.logo-spin`, `.read-the-docs`, and `#root { text-align: center }`. It is also the only `prefers-reduced-motion` block in the repo, which makes it actively misleading. Delete it.

### L2. Dead asset: `src/assets/FILogo2.png` (1.45 MB)
Never imported anywhere. Delete it (and reclaim 1.45 MB from the repo).

### L3. ~60 lines of commented-out markup across 5 components
| File | Lines | What it is |
|---|---|---|
| `projects-section.tsx` | 14, 22-25 | carousel state + `nextProject`/`prevProject` |
| `projects-section.tsx` | 46-59, 125-140 | gradient-placeholder card visuals (superseded by real images) |
| `skills-section.tsx` | 69-94 | "Additional Technologies" block |
| `contact-section.tsx` | 41-45 | the honeypot guard (see **C3**) |
| `hero-section.tsx` | 66-68 | the logo/avatar markup (see **C2**) |
| `navigation.tsx` | 40 | the "FI" text fallback |

Two of these are worse than dead code:
- **`skills-section.tsx:69-94`** references `additional` (never defined) and `<Badge>` (never imported). It would not compile if uncommented — it is not a parked feature, it is a broken fragment.
- **`contact-section.tsx:41-45`** is the disabled spam guard, which makes the live honeypot look functional.

### L4. Unused i18n keys
`contactSection.infoTitle`, `projectsSection.prev`, `projectsSection.next` — all three are defined in **both** dictionaries and referenced nowhere in `src/` (verified by grepping for each key literal). `prev`/`next` are leftovers from the commented-out carousel.

### L5. Dead data: the `colors` object on every project
**Files:** `es.ts:265,276,287,298,309` and the identical lines in `en.ts`

```tsx
colors: { primary: "#0a97b0", secondary: "#0a97b080", accent: "#0a97b0", shadow: "14 165 233" },
```

Consumed only by the commented-out gradient blocks in `projects-section.tsx:46-59,125-140`. Five dead objects × 2 dictionaries = 10 dead entries, plus they are the only hardcoded hex values in the codebase, which quietly undermines the token system.

### L6. Unused exports in `ui/card.tsx`
`CardDescription` (line 41), `CardAction` (line 51), `CardFooter` (line 74) are exported but never imported. Normal for shadcn primitives — noting it only so the redesign does not assume they are in use.

### L7. No unused imports — confirmed
Worth stating explicitly because the task asked. `tsc -b` with `noUnusedLocals: true` passes clean, and I verified with a standalone repro that TypeScript **does** flag an import used only inside a JSX comment (`{/* <Badge /> */}`) — so the passing build is real evidence, not a blind spot. The unused things here are **files, assets, exports, i18n keys, and dictionary fields** — not imports.

### L8. `@keyframes` declared inside `@layer base`
**File:** `src/globals.css:129-169`

Keyframes are not subject to the cascade, so the layer wrapper is meaningless. It works (verified: `@keyframes float` and `.animate-float{animation:6s … float}` both emit), but it is unusual and the four keyframe blocks would read better at the top level.

### L9. `key={index}` on every list
`experience-section.tsx:20`, `skills-section.tsx:26,37`, `projects-section.tsx:41`, `certifications-section.tsx:20,28`. Acceptable for fully static lists, but it is the default that gets copy-pasted into dynamic lists later.

### L10. `contact-section.tsx:66` — unused `catch (err)`
ESLint error (`@typescript-eslint/no-unused-vars`). Also, the fallback string at line 67 duplicates the dictionary value: `toast.error(t("contactSection.toastError") || "No se pudo enviar el mensaje")` — the `||` is unreachable because `t()` falls back to the key path (see **M6**), so a missing key would toast the literal text `contactSection.toastError`.

### L11. No `.env.example`; EmailJS config fails silently
**File:** `src/components/contact-section.tsx:51-61`

`VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, and `VITE_EMAILJS_PUBLIC_KEY` are read from `import.meta.env` with no validation and no `.env.example` in the repo. If any is unset, `emailjs.send(undefined, undefined, …)` rejects and the user sees the generic error toast — indistinguishable from a network failure.

### L12. `README.md` is the unmodified Vite template
Still says "React + TypeScript + Vite" with the default ESLint expansion guidance. No setup instructions, no env var documentation.

### L13. No tests, no CI
No test runner in `package.json`, no test files, no CI config. `pnpm lint` currently **fails** (13 errors), so the lint script is not a usable gate as-is.

---

## i18n parity

**Structural parity is perfect.** I diffed both dictionaries programmatically by flattening to dotted key paths and comparing key sets, array lengths, and values.

### Keys in `es.ts` missing from `en.ts`: **none**
### Keys in `en.ts` missing from `es.ts`: **none**
### Array-length mismatches: **none**

| Collection | es | en |
|---|---|---|
| `experiences` | 2 | 2 |
| `projects` | 5 | 5 |
| `certificationsSection.providers` | 2 | 2 |
| `…providers[0].certifications` (Microsoft) | 3 | 3 |
| `…providers[1].certifications` (DevTalles) | 14 | 14 |
| `skillsSection.categories` | 5 | 5 |
| per-category skill counts | 10/3/4/5/5 | 10/3/4/5/5 |

### Values still in the wrong language

Only one, and it is wrong in **both** files:

| Key | File:line | Value | Problem |
|---|---|---|---|
| `certificationsSection.providers[0].certifications[0].technologies[0]` | `es.ts:66` **and** `en.ts:66` | `"Inteligence Artificial"` | Misspelled, and Spanish — sitting inside the English dictionary. Should be `"Artificial Intelligence"` (en) / `"Inteligencia Artificial"` (es). |

All other cross-language-identical strings are correct as-is: `hero.name` ("Fernando Ibarra"), `hero.socialGithub`/`socialLinkedin`/`socialEmail` ("GitHub"/"LinkedIn"/"Email"), and `contactSection.emailLabel`/`emailPlaceholder` ("Email" is correct Spanish).

### The parity check's blind spot

Two real i18n defects are **invisible to a dictionary diff** and must be tracked separately:

1. **`theme-toggle.tsx:47-49`** — "Claro" / "Oscuro" / "Sistema" are hardcoded in the component. An English visitor gets a Spanish theme menu. See **M11**.
2. **`index.html:1`** — `<html lang="en">` is hardcoded and never synced to the active language, which defaults to Spanish. See **H1**.

### Structural i18n observations

- **`lang` key is dead.** Both dictionaries define `lang: "es"` / `lang: "en"` (line 2), but `useI18n()` exposes the live `lang` state and nothing reads `dict.lang`. The commented-out `skills-section.tsx:73` block was the last consumer (`t("lang") === "es" ? … : …`). Remove it, or it will get used again as a language check that silently breaks when the dictionaries drift.
- **`Dict` as a union is the root of the `any` problem** — see **M5**.
- **`t()`'s fallback is the key path** — see **M6**.
- **Content is stale in both languages equally.** `es.ts:233` and `en.ts:233` both say INOWU is current. Parity does not mean correctness.

---

## Accessibility

Consolidated. `aria-*` attribute count across all of `src/`: **4**, and all four are `aria-invalid` **styling hooks** inside `ui/{badge,button,input,textarea}.tsx` — none is ever set as an actual attribute on a rendered element. There is no `role=` anywhere in the codebase.

### Blocking

| # | Issue | Location |
|---|---|---|
| A1 | 5 `<label>`s with no `htmlFor`; 5 inputs with no `id` | `contact-section.tsx:168-216` |
| A2 | Validation errors not linked (`aria-describedby`), not announced (`role="alert"`/`aria-live`), `aria-invalid` never set | `contact-section.tsx:174,184,195,205,216` |
| A3 | `<html lang="en">` hardcoded while content defaults to Spanish | `index.html:1`, `i18n/index.tsx:27` |
| A4 | Mobile menu button: no `aria-label`, no `aria-expanded`, no `aria-controls` | `navigation.tsx:65-72` |
| A5 | `<a>` nested inside `<button>` — invalid, double tab stop | `hero-section.tsx:96-116` |
| A6 | White on `secondary` in dark mode = **2.88:1** on 17 cert badges | `certifications-section.tsx:36`, `globals.css:52` |
| A7 | `muted-foreground` on `bg-muted/30` = **4.45:1** (light) | `globals.css:17-18`, `skills-section.tsx:12` |

### Significant

| # | Issue | Location |
|---|---|---|
| A8 | No skip-to-content link; 6 nav items precede the hero for keyboard users | `App.tsx:12` |
| A9 | No `<nav aria-label>`; no `aria-current` on the active section | `navigation.tsx:32` |
| A10 | Mobile menu: no Escape-to-close, no focus trap, no scroll lock, no outside-click close | `navigation.tsx:76-92` |
| A11 | No `prefers-reduced-motion` handling for 5 infinite animations | `globals.css:171-185`, `hero-section.tsx:43,102` |
| A12 | Social links are `<button>`+`onClick`, not `<a>` — no new-tab, no copy-link, not crawlable | `hero-section.tsx:125-138` |
| A13 | Decorative floating icons and gradient blobs not `aria-hidden="true"` | `hero-section.tsx:43-57`, `contact-section.tsx:80-88` |
| A14 | Fake 5-dot rating is mouse-only (`onMouseEnter`), no keyboard path, no accessible name | `skills-section.tsx:39-58` |
| A15 | Nav links have no `focus-visible` styling (inconsistent with buttons, which do) | `navigation.tsx:51` |

### Minor

| # | Issue | Location |
|---|---|---|
| A16 | Logo `alt="Logo"` — non-descriptive | `navigation.tsx:41` |
| A17 | `scroll-behavior: smooth` with a fixed 80px nav and **no `scroll-margin-top`** — every in-page link lands with the heading hidden under the nav. | `globals.css:226-228`, `navigation.tsx:37` |
| A18 | Project/cert images have no `width`/`height` → layout shift | `projects-section.tsx:60,142`, `certifications-section.tsx:34` |
| A19 | No `aria-hidden` on the emoji avatar | `hero-section.tsx:69` |
| A20 | Decorative `<div>`s used for meaning (`w-1.5 h-1.5 bg-primary rounded-full` bullets) with no list semantics preserved | `experience-section.tsx:43` |

Positive notes, for fairness: `text-balance`/`text-pretty` are used well; the theme toggle *does* have an `<span className="sr-only">Toggle theme</span>` (line 43); project and certificate images have meaningful `alt` text; `Button`/`Badge`/`Input`/`Textarea` all carry shadcn's `focus-visible:ring-[3px]` treatment; the `Toaster` is mounted.

---

## Design assessment: what makes it read "template" rather than "premium"

The task asks for a harsh read. Here it is, separated from the defects above.

**The decoration cluster.** Emoji avatar + mouse-parallax gradient blobs + three floating rounded-square icon tiles + `animate-float` + `animate-glow` on the logo + `animate-bounce` on the CTA arrow. Individually defensible; together they are the recognizable signature of a generated landing page. A premium portfolio in 2026 signals confidence through *restraint* — one strong idea per screen, generous whitespace, and typography doing the work. This hero has five competing focal points (emoji, name, role, two CTAs, three social buttons) and no single one dominates.

**No typographic scale.** Section headings are `text-4xl md:text-5xl` in Experience/Skills/Projects/Certifications but `text-4xl md:text-5xl lg:text-6xl` in Contact. The hero is `text-5xl md:text-7xl lg:text-8xl`. There is no modular ratio — these are ad-hoc values. `globals.css:230-239` sets `font-weight: 700` and `letter-spacing: -0.025em` on all `h1`–`h6` uniformly, which flattens the hierarchy further: an `h3` inside a card and the page `h1` share weight and tracking.

**Two competing gradient treatments.** `.gradient-text` is applied to the hero name (`hero-section.tsx:76`) and the contact title (`contact-section.tsx:93`) but to no other section title. So two sections have gradient headings and four do not, with no evident rule.

**Three different pill treatments for the same concept.** Technology tags are `rounded-full` in Experience (`experience-section.tsx:50`) and the featured project (`projects-section.tsx:156`), but `rounded-xl` in the project grid (`projects-section.tsx:82,87`). `Badge` (used in Certifications) is `rounded-md`. Same semantic object, three shapes.

**Two different card languages.** Project cards use `border-0 bg-card/50 backdrop-blur-sm` (`projects-section.tsx:42`); experience cards use the default `border` + `shadow-sm` (`experience-section.tsx:20`). The `border-0` variant loses the card edge entirely, so project cards float and experience cards are outlined.

**Four different button treatments.** Gradient hero CTA, `gradient-border` outline CTA, flat `bg-primary` project buttons, gradient form submit. The gradient buttons also hardcode `text-white` (`hero-section.tsx:98`, `contact-section.tsx:221`) instead of `text-primary-foreground`, so they do not respond to theme changes.

**The background rhythm does not exist in light mode.** Skills and Certifications use `bg-muted/30`, which composites to `#f2f6f9` against a `#f6f9fb` background — a ~1.5% luminance delta. The alternation is real in dark mode and invisible in light mode, which is the default for most visitors.

**Spacing is uniform where it should vary.** Every section is `py-20` (doubled to ~80px by the nesting in **M1**). Premium pages vary vertical rhythm — tighter within a group, much larger between major movements. Uniform `py-20` is the single strongest "template" tell in the layout.

**The Certifications section is a wall.** 17 certificates, each with a full image, a title, a 2-line description, tech pills, and a button. It is by far the longest section on the page and it sits *after* Projects and *before* Contact — so it is the last thing between a recruiter and the contact form. The signal-to-noise ratio is poor: 17 credentials from two providers, undifferentiated by relevance.

**What is already good.** `text-balance`/`text-pretty` on headings and paragraphs. Inter + JetBrains Mono is a sound pairing (though JetBrains Mono is loaded and never used — no `font-mono` anywhere). The oklch token architecture in `globals.css` is genuinely well-built and is the right foundation for a redesign. The dark palette is strong (foreground/background at 18:1, primary at 10.6:1). Scroll-blur on the nav is a good instinct.

---

## Recommended order of work

**Fix before any redesign** (these are correctness, not polish):
1. **C1** — add Rocket Code, correct the INOWU end date.
2. **C2** — replace the emoji avatar.
3. **C3** — fix or remove the honeypot.
4. **C4** — `max-w-8xl` → `max-w-7xl`.
5. **H1** — meta description, OG tags, `rel="icon"`, dynamic `lang`.
6. **H8** — guard localStorage, fix the "system" branch, add the anti-flash script.

**Cheap, high-impact** (hours, not days):
7. **H2** — convert images to WebP, add `loading="lazy"` + `width`/`height`, delete `FILogo2.png`, resize the logo.
8. **H7 / A1-A2** — wire `htmlFor`/`id`/`aria-describedby`/`aria-invalid` on the form.
9. **H4** — remove the duplicate featured project.
10. **H5 / H6** — `asChild` on the hero CTAs; make social links real anchors.
11. **H3** — delete the fake skill dots.
12. **M1** — collapse the double `<section>` nesting; vary the vertical rhythm.

**Redesign-defining** (needs decisions, not just edits):
13. **H9** — rewrite the content around the Senior Backend positioning and the Nova work.
14. **H10** — add a CV download.
15. **M5 / M7 / M8** — fix the `Dict` union, restore the form primitives to token-driven defaults, and repair the contrast failures. Do these *before* building new UI on top of them.

**Cleanup:**
16. Delete `App.css`, `FILogo2.png`, the ~60 commented lines, the 3 unused i18n keys, the 10 dead `colors` objects, and the dead `lang` key. Fix the `Inteligence Artificial` typo in both dictionaries. Get `pnpm lint` to green so it can act as a gate.
