# 06 — Completeness Critique

The brief had five researchers and a four-direction design panel answer a single owner prompt that bundles four distinct asks: (1) analyze the project; (2) produce a premium redesign; (3) update content from the supplied CVs and certificates; (4) make the CV downloadable "without a backend, using shadcn if needed." They produced 27 documents and ~340 KB of verification-grade analysis, including reproducible contrast math, an honest accounting of every NOVA contributor's commit share, and a recon of two distinct legacy systems instead of the one the brief assumed. Almost everything they were asked to do was done, and done with rare honesty about its own gaps.

What follows is the gap-finding pass — the things the panel did *not* do, did *not* verify, did *not* notice, or did *not* answer directly enough. Each gap is actionable; each is something a single competent engineer can finish in under a day and that a critical reviewer will look for.

The gaps fall into six buckets: (I) modalities the panel did not run that should be on the table; (II) questions the owner asked that no document answers with the specificity the answer requires; (III) factual errors the panel repeated that contradict its own evidence; (IV) cross-document contradictions; (V) workflow and dependency gaps the panel treats as content problems but are actually operational; (VI) items that no plan has any chance of being complete without.

---

## I. Modalities the panel did not run

### 1. No design rendered the site, and the panel admits it; nothing was rendered against a real build for *any* of the four directions

Five documents independently state they could not render the site. `design-cinematic-scroll.md` §R7: *"I did not render the site — no browser tooling in this session — so the visual judgments are reasoned from source, tokens and computed contrast, not from a screenshot."* `design-editorial-swiss.md` §10.3 repeats the admission. `design-quiet-luxury.md` says *"The audit could not render the site… the visual hierarchy claims should be confirmed against a real render."* `design-systems-engineer.md` §R8 says the same. `judge-editorial-swiss-craft.md` proves it matters: it found that the spec's own ASCII mock contradicts its own type table by **3×** because the document was written without checking itself against a render.

The implications for a hiring decision are concrete. `judgment-cinematic-scroll-outcome.md` and `judge-editorial-swiss-craft.md` both note that *cinematic-scroll's* `useInView` threshold of 0.4 will never fire on the certifications section (~2,800 px tall vs an 812 px viewport) — a content-permanently-invisible defect that **only a render can catch**. Every direction has at least one claim that will not survive the first browser pass.

**What is missing:** one screenshot pass per direction, against an actual `pnpm build` of each variant, on a mid-range laptop viewport (1366×768) and a phone viewport (390×844), at 1× and 2× DPR. This is a half-day job for each of the four directions, with screenshots checked against the spec's failure lists. It must happen before a direction is committed.

### 2. The CV "PDF download" question was answered, but the modality of *producing* the PDFs was not

Every design doc answers the download question with `public/cv/*.pdf` and an `<a download>` link. That is correct as a serving question. But the owner's full sentence was *"I don't know if that's possible without a backend; use shadcn if needed."* The unspoken corollary — *"and the CVs I'm sending are PDFs of uncertain quality"* — was answered by Research 4 (the CV lists 12 DevTalles certs vs the 18 in `05-certificates.md`, and the Microsoft wording differs) and by `design-cinematic-scroll.md` §R4 ("a CV PDF to regenerate"). No document addresses the **operational chain**: where do the PDFs come from, in what tool are they authored, and at what point in the plan do they get generated?

The PDFs themselves do not exist as inputs to the workflow — the CVs at `/tmp/cv_es.txt` and `/tmp/cv_en.txt` are *plain-text extractions*, not the source PDFs. The site contains *no* PDF today (verified: `find . -name "*.pdf"` returns nothing; `public/` contains only `favicon.ico`). The decision the owner must make is:

- **Option A — Author in a tool.** Canva, Google Docs, or LaTeX → export PDF. Best for visual polish; matches the design specs' "premium" brief. One-time effort.
- **Option B — Generate at build time.** Render a hidden React route to a print-friendly HTML and use `@react-pdf/renderer` or `playwright`'s `page.pdf()` at build. Most controllable, but no design doc references this approach and the Vite/React 19 toolchain for it is not installed.
- **Option C — Use the existing extractions as source-of-truth.** Build the PDFs from the same plain-text source the recon used; render the typography from the design's chosen type system. Avoids drift between site and PDF.

`design-cinematic-scroll.md` §R4 lists CV regeneration as scope but assumes an external tool. No design doc commits to a tool, a date, or an owner for the CV PDFs. The owner's brief literally named "shadcn if needed" — meaning they expected a code-level answer — and the panel gave them only the serving side.

**What is missing:** an explicit "CV production" step in the plan that names the tool, the source content (use the reconciliations in `04-content-gap.md` and `05-certificates.md`, not the CVs as supplied), the typography (must match the site), and the link wiring (two files, `<a download>` swaps `href` based on `lang`). Two hours of work and a real artifact.

### 3. The site has 6.3 MB of un-optimized images and no asset pipeline; no plan provides one

The audit (`03-landing-audit.md`) and four design docs flag this: PNGs totaling 6.3 MB, all in `src/assets/`, all rendered eager, no `loading="lazy"`, no `width`/`height`, no AVIF/WebP. The hero uses a 1.38 MB PNG at 48×48. `FILogo2.png` (1.45 MB) is never imported. The cert thumbnails are hotlinked from i.imgur.com — a third-party runtime dependency that no plan replaces with a deterministic static asset.

`design-quiet-luxury.md` §6 and `design-cinematic-scroll.md` mention self-hosting certs and converting with `sharp`. `judge-systems-engineer-engineering.md` notes the contradiction in `design-quiet-luxury.md`: it says "CI/deploy needs no sharp at all" because assets are committed — but that means every contributor ships 6.3 MB of PNG in the repo forever, with no script to re-optimize when a new cert is added. None of the four design docs names a **build-time asset step** with the shape of "drop new image in `src/assets/certs/raw/`, run `pnpm build:assets`, get WebP + AVIF in `public/certifications/`, with `<source>` srcset plumbing in the component."

**What is missing:** a concrete asset pipeline (`scripts/build-assets.mjs` with `sharp` or `sharp-cli`), a `public/certifications/` directory the build writes to (gitignored), and an `<picture>` wrapper for the cert grid. One day including the cert PNG re-export. Until this ships, every diagram about Lighthouse 90+ on mobile is aspirational.

### 4. No plan has a Lighthouse / axe / Playwright verification step

`design-editorial-swiss.md` §2.4 is the only place in the entire recon that ships a *computed* verification (the 23 contrast pairs reproduce to two decimals — I confirmed). But the four design docs and the craft reviews each treat verification as a one-time check on a single attribute (contrast, bundle size, one specific React rendering). There is no plan for:

- Lighthouse on the deployed URL with the budget documented (LCP, CLS, INP, perf, a11y, best-practices, SEO).
- `axe-core` run against the rendered DOM at three breakpoints.
- Playwright snapshot regression on the three primary screens (hero, project detail if added, contact).
- Visual diff between Fernando's actual CV PDFs and what the site claims his skills/employers to be — a *content* regression, not a *visual* one, and equally important.

`judge-editorial-swiss-engineering.md` says: *"No automated safety net for a full rewrite. The plan replaces 9 components, adds 3 sections, restructures `App.tsx`, replaces the token layer, and reverts 2 primitives — with no test suite, no CI, and no visual regression in the repo… the plan should say the only verification is a manual pass, and it does not."* That is correct as a critique of one direction, and it applies to all four.

**What is missing:** an explicit verification plan with three artifacts — a `pnpm verify` script that runs `lighthouse` + `axe-core` against `pnpm preview`, a screenshot baseline captured in `tests/baselines/`, and a content regression test that diffs the hero/experience/skills sections against the canonical CV reconciliation in `04-content-gap.md` §"Verified correct".

---

## II. Questions the owner asked that the panel did not answer with sufficient specificity

### 5. *"Apple-style animations"* — the panel defaulted to either minimal or maximal; the owner likely meant something in between

The owner's brief: *"the best Apple-style animations."* `design-cinematic-scroll.md` reads this as a *scroll-driven film* with a `200vh` pinned hero, a 1-px progress line, a self-drawing SVG fan-out, and a horizontal cert filmstrip. `design-systems-engineer.md` adds a packet-animating topology in the hero. `design-quiet-luxury.md` keeps it minimal — a `useInView` fade-up per section. `design-editorial-swiss.md` adds the View Transitions API for cross-page morphs.

There is no design doc that anchors what "Apple-style" usually means in 2025–2026:

- **Micro-interactions on every interactive element** (button press states, hover transitions on links with an underline that grows from left to right, magnetic-feeling cards on the projects section).
- **Page transitions** through the View Transitions API where supported.
- **Spring physics on numeric counters** (years of experience, certificate count) — `useReducedMotion()` must gate them, but the animation itself should have a small overshoot for character.
- **A persistent theme transition** that crossfades between light and dark over 280–340 ms, not the snap-cut the audit noted (`03-landing-audit.md` §Medium: theme-flash on load).

None of the four designs combines all of these at the right restraint. Cinematic-scroll has the scroll story but uses `motion` at 52 kB gzip (`judge-cinematic-scroll-engineering.md` measured, not the "~12 kB" claimed by the spec) to drive a film that may not render at all on a mid-range phone. Editorial-swiss ships the View Transitions plan but pairs it with `Fraunces` at `opsz 144` (a soft-serif at its most wonky) — i.e., the design's "premium" reading and the "Apple" reading are at odds.

**What is missing:** the design brief should have asked the owner "what does Apple-style mean to you" before generating four directions. A 30-minute conversation would have collapsed the design space by ~50%.

### 6. *"Update my information from my CV (both Spanish and English PDFs are provided)"* — the panel took the plain-text extraction at face value and missed that the extracted text is stale

The CV files at `/tmp/cv_es.txt` and `/tmp/cv_en.txt` are the source of truth the panel used. But `04-content-gap.md` and `05-certificates.md` independently proved the CVs are stale on at least three axes:

- **Certifications:** the CV names 12 DevTalles certs; the owner's `05-certificates.md` (which the panel treats as canonical) names **18**.
- **Microsoft wording:** the CV says "Software Development Fundamentals, Generative AI Fundamentals, Systems Administration Career Fundamentals"; `05-certificates.md` lists *"AdminSis de aplicaciones, Desarrollo de software (Microsoft and LinkedIn), IA Generativa"* — the order and wording differ.
- **Employment dates and titles:** the CV lists INOWU as ending Dec 2024 in some places, Nov 2025 in others (the *Periodo* field is "Dic 2023 – Dic 2024" but the role's bullet list is dated through 2025 per recon); Rocket Code is absent from the CV entirely.

So when the brief said *"update my information from my CV,"* the correct interpretation is *reconcile the site against the actual source-of-truth (the GitHub cert list and the verified NOVA/INOWU dates from the recon), and treat the supplied CV as a baseline to be regenerated, not as the final word.* `04-content-gap.md` does most of this correctly. None of the four designs explicitly addresses the regeneration order: when does the new CV PDF come into existence relative to the site launch? Without an explicit "the new PDF is what ships, not the supplied one" statement, an executor could ship the site with the supplied CV still as the download — exactly the inconsistency the owner is trying to fix.

**What is missing:** one paragraph in the master plan that says *the CV PDFs will be regenerated from `04-content-gap.md` §"Verified correct" + `05-certificates.md` master table before the site launches; the supplied CVs at `/tmp/cv_*.txt` are the **starting point**, not the final document.*

### 7. *"Passing all my certificates in case one is missing"* — the panel did inventory all 18, but did not ask the owner to confirm a single link

`05-certificates.md` correctly finds the 17/18 mismatch (site renders 17, list has 18), the TanStack id typo (`irg3nsjnzjl` vs `irg3nsjnzj`), the missing `c_react_actualizado`, and the `?trk=` query-string inconsistency on two LinkedIn URLs. It also flags, correctly, that none of the 18 verify URLs was actually fetched — they were format-checked only. The next step is the owner's confirmation, not the panel's further analysis.

The panel does not name *who* confirms the TanStack id. If the 10-char id (`irg3nsjnzj`) is correct, the site fixes one character. If the 11-char id is correct, the site's own master table is wrong. The same applies to the `c_react_actualizado` cert: the title was inferred from the README key, not read off the image. The title might be "React 19: De cero a experto" or "React PRO actualizado" or something else entirely — `05-certificates.md` says *"must be read off the certificate image before publishing,"* but no plan sets a time or owner for this.

**What is missing:** a one-page action list for the owner with five "open this URL and tell me which version is right" items, in the order the panel needs them resolved. The owner already volunteered to do this work ("in case one is missing so you can add it"). The panel did not collect the answer.

---

## III. Factual errors the panel repeated that contradict its own evidence

### 8. The CV's *"PostgreSQL"* claim is repeated without flagging in the master plan

The CV says Fernando used PostgreSQL; the recon proves NOVA is **SQL Server + Prisma + `@prisma/adapter-mssql`** throughout (12 service-wide Prisma schemas all on `@prisma/adapter-mssql`). `04-content-gap.md` correctly notes the contradiction. `design-quiet-luxury.md` §5 correctly recommends listing `Prisma · SQL Server` on the Rocket Code entry and keeping PostgreSQL where it is true (Votométrica, WFacturas, VideoRemixes per the existing dictionary). `design-editorial-swiss.md` §3 mirrors the same advice.

But none of the four designs updated the `skillsSection.databases` array in the i18n dictionaries. Reading the recon: the dictionaries still say `["PostgreSQL", "MongoDB", "Prisma", "TypeORM"]` (`04-content-gap.md` §"Skills" — see also the `"DevOps & Tools"` category which the CV omits but the recon confirms is real). If the redesigned site says "Prisma · SQL Server" in the Rocket Code entry but "PostgreSQL" in the skills section, the contradiction is preserved at the page level — and a technical interviewer will catch it in 10 seconds.

**What is missing:** an explicit edit to `src/i18n/es.ts` §`skillsSection.backend` / `databases` to add SQL Server (or rename the section to reflect the verified stack), with the source-of-truth being `01-nova-architecture.md` §"Verified stack" — *not* the CV.

### 9. The CV's *"WebSockets"* claim is treated as defensible; it is half-true

Same issue. NOVA's real-time layer is **Pusher** (managed WebSockets); raw `socket.io-client@2.3.1` is pinned only because the legacy Sails monolith needs it (`01-nova-architecture.md` and `02-legacy-migration.md`). Saying "WebSockets" on the site is *not false* — Fernando shipped against the Sails socket protocol during the legacy phase, and Pusher is WebSockets under the hood. But claiming he did "WebSocket architecture work" on Rocket Code overstates what the recon supports. `04-content-gap.md` and `design-quiet-luxury.md` §5 both flag this; neither updates the skills section's wording.

**What is missing:** the skills section should say **"WebSockets (Sails.io legacy + Pusher-managed realtime)"** or similar — not just "WebSockets." Same rule: source-of-truth is the recon, not the CV.

### 10. The hero uses `FILogo.png` (1.38 MB) at 48×48; two designs remove it from the nav, but the design docs disagree on whether the mark survives anywhere

`design-editorial-swiss.md` says: *"The logo moves to the colophon at a properly-sized 32×32 WebP."* `design-quiet-luxury.md` §6.5 says: *"Default: remove it from the nav and use a wordmark… The mark survives in the footer at 32px, optimized."* `design-cinematic-scroll.md` does not address the logo specifically — it leaves the nav unchanged. `design-systems-engineer.md` is silent.

There is no **agreement across designs** on what to do with the logomark. If the owner picks a direction and the executor doesn't see this, the hero still loads the 1.38 MB file and the LCP budget blows. The right answer is obvious (WebP at 32 px, in the footer or as a wordmark), but the panel should have aligned on it.

**What is missing:** a single line in the master plan: *"The nav wordmark is `Fernando Ibarra` in Inter 15/600. `FILogo.png` is converted to WebP ≤ 8 KB and placed in the footer at 32 px."*

---

## IV. Cross-document contradictions the panel did not reconcile

### 11. The four design directions disagree on the section order; no master plan picks one

Each of the four designs moves the certifications / education / CV / contact sections around:

- **Cinematic-scroll:** Hero → Experience → Skills → Topology → Strategy matrix → Projects → Certs (filmstrip) → CV → Contact.
- **Editorial-swiss:** Hero → Impact band → Experience → Skills → Projects → Education → Certs → CV → Contact.
- **Quiet-luxury:** Hero → Metrics → Experience → Stack → Case study → Projects → Certs → Education → CV → Contact → Footer.
- **Systems-engineer:** Hero (topology) → Impact band → Capabilities → Experience → Strategy matrix → Stack → Capabilities (re-shown) → Projects → Certs → Resume band → Contact → Footer.

Three of the four move the CV band above Certifications; one buries it. One keeps the certifications *section* and adds the CV *band*; one replaces certs with a filmstrip; one cuts to 6 default certs with a "SHOW ALL 15" toggle; one shows all 18 full-size. There is no decision matrix for which works best for a recruiter who is going to spend ~30 seconds on the page.

The critical missing piece is **what the recruiter does in the first 30 seconds**. The owner is a Senior Backend Developer; his audience is technical recruiters and hiring managers. The most-likely action sequence is: name → role → current employer → one proof of seniority → contact. Three of the four designs front-load that correctly; systems-engineer's *strategy matrix in the hero* front-loads it with a *diagram* — slower to read than a number.

**What is missing:** a single canonical section order, derived from one stated reader-flow assumption, that the final plan uses regardless of which aesthetic wins. My recommendation (and the panel did not converge on one): `Hero → Metrics band (4 verified counts) → Experience (3 entries, Rocket Code first) → Skills (5 + Integrations strip) → Selected Projects (3–4 with backend emphasis) → CV band (primary action) → Certifications (collapsible) → Contact`. CV is the action; Certifications are evidence. CV above Certifications.

### 12. The metrics band is invented in three directions without anchoring to a single number set

The metrics the hero / impact band should display are repeated with subtle differences across the four designs:

- **`design-cinematic-scroll.md`** Scene 02: a metric band whose values are not enumerated; defers to R2 (NDA exposure).
- **`design-editorial-swiss.md`** §5.1: claims **"11 microservices, 738 tests"** as the two visible figures; **judge-engineering-editorial-swiss-outcome.md** says these are *process* counts, not outcomes, and flags them as "padding" — the editorial-swiss spec admits 53 and 18 are unconfirmed.
- **`design-quiet-luxury.md`** §6.1: also claims 11 + 738.
- **`design-systems-engineer.md`** §4.3: implies the same set.
- **`judgment-cinematic-scroll-outcome.md`** rows 137–145: rejects "11 MICROSERVICES" and "738 TESTS" as too narrow / unverified for Fernando specifically, recommends "53 PAYMENT STRATEGIES" and "3 PRODUCTION SYSTEMS SHIPPED" instead.

This is a real disagreement that did not get resolved. The recon says NOVA has **11 verified-in-this-workspace services** and **738 frontend test files** (`*.test.ts(x)` files counted, not test cases). The numbers are accurate as counts, but `738 tests of what?` is the right question a technical interviewer will ask. The answer is "the React 19 SPA's Vitest test files, not the backend's e2e suites, and not a count of cases." That nuance does not survive the compression into a 2-character hero figure.

**What is missing:** a single answer the master plan commits to. Based on the recon, the strongest non-NDA-exposing counts are:
1. **53 payment strategies** — Fernando's verified-built feature in `nova-microservicio-pagos` (his commit count: 41/268).
2. **3 production systems** — Rocket Code (NOVA), INOWU (legacy modernization), IGRTEC (React Native lead).
3. **4+ years** — the CV's own claim, defensible.
4. **18 certifications** — verified count, can be presented as "18 verified certs" without naming each one.

That is the canonical set. Anything else needs to be defended or dropped.

### 13. The honesty footnote ("team project, I contributed to the payment services…") appears in two designs and is dropped in two — but it is the most defensible thing in the recon

`design-quiet-luxury.md` §5.1 includes a one-line footnote under the metrics band: *"Team project. I contributed to the payment services and the SPA; I did not build this alone. Numbers are counts from the codebase, not claims of authorship."* `design-cinematic-scroll.md` §R2 echoes it. `design-editorial-swiss.md` and `design-systems-engineer.md` omit it.

This is **the single most important line of copy on the page** because it converts the recon's biggest credibility risk (Fernando's 41/268 commit share in payments) into the most senior-looking element on the page. It should ship regardless of which aesthetic wins. The fact that two of the four designs dropped it is a copy oversight that needs explicit reconciliation.

**What is missing:** a paragraph in the master plan: *"The honesty footnote MUST appear under any quantified metric band or engineer-style project card. Variants allowed by direction, but presence is non-negotiable."*

### 14. The mobile nav is described as "fixed" in three designs and "sticky" in the fourth — and the actual implementation today (`src/components/navigation.tsx`) is neither

`design-cinematic-scroll.md` §3 says: *"Fixed, `z-50`, height 88 → 64 px on scroll."* `design-quiet-luxury.md` §5.1 says: *"Fixed, `z-50`, height 88 → 64 px on scroll."* `design-editorial-swiss.md` §5.2 says the same. `design-systems-engineer.md` §4.3 says: *"The nav is sticky."* None of them has read `src/components/navigation.tsx`, which (per `03-landing-audit.md`) has no `position: fixed` and no `position: sticky` — it scrolls with the page.

This is minor but it is exactly the kind of detail that breaks a build: the executor reads the design doc, writes `position: fixed; z-index: 50`, and the hero layout shifts because the nav was *not* fixed before. Three out of four designers agreed on the same wrong assumption because none of them read the file.

**What is missing:** one master plan line: *"The nav uses `position: fixed; top: 0; height: 88 → 64 px on scroll; z-index: 50; backdrop-filter: blur(12px)` for translucent glass effect. Implemented in `src/components/navigation.tsx` (replacing current unscrolled, un-fixed behavior)."*

---

## V. Workflow and dependency gaps the panel treats as content problems

### 15. Where the site will be deployed is not addressed in any plan

`judge-systems-engineer-engineering.md` mentions "CI/deploy needs no sharp at all" in passing. None of the four designs, none of the judgments, none of the craft reviews names **where this site goes when it's done**. The repo is on GitHub (`git remote -v` returns `https://github.com/FerIbarra1/Feribarra-landing.git`); the project has no `netlify.toml`, no `vercel.json`, no `cloudflare-pages.yml`, no `.github/workflows/`, no `.gitlab-ci.yml`. There is no CI.

This matters because:

- The site's primary asset is the design quality, which needs an HTTPS origin to look right (the `<a download>` for the CV, the `og:image`, the `mailto:` form).
- The CV file at `/tmp/cv_es.txt` is plain text — the owner needs an authenticated origin to serve the actual PDF.
- The i18n language toggle writes to `localStorage`, which behaves differently on `file://` than on `https://` — `index.html` opens as `file://` only works on Chrome with `--allow-file-access-from-files`.

Three plausible options, in order of friction:
1. **Vercel** — free, zero-config for Vite + React 19, supports the `<a download>` pattern natively, has preview deploys per branch. Recommended.
2. **Cloudflare Pages** — also free, faster CDN, slightly more setup, supports the same.
3. **GitHub Pages** — free but HTTPS-on-custom-domain is a pain, no preview URLs, no env management for the contact form's `VITE_EMAILJS_*` keys.

The contact form's EmailJS keys are *not* in `.env.example` (the file does not exist; `03-landing-audit.md` flagged this). Whoever deploys will need to add `.env.example` with `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY` placeholders, and document the EmailJS dashboard setup.

**What is missing:** an explicit deploy section: pick Vercel, document the three env vars, add `.env.example`, add a deploy script (`"deploy": "vercel --prod"`), and confirm `vercel.json` doesn't need overrides (it shouldn't, for this stack).

### 16. The contact form's spam protection is broken today, and no design fixes it as a deliverable

`03-landing-audit.md` C3: the honeypot is registered twice under `"company"`, the human fill and the bot fill are indistinguishable, the guard at lines 41–45 is commented out. The form has *no working spam protection*. EmailJS rate-limits spam accounts to 200 emails/day on the free tier; one bot can blow the budget overnight and silently break the contact form for a real recruiter.

None of the four designs addresses this as a problem to solve. They all keep EmailJS as the transport. The fix is one of:

- **Cloudflare Turnstile** — free, accessible, one component import. Most idiomatic for a static site in 2025–2026.
- **Honeypot done right** — change the form so the `company` field is hidden with CSS + tabindex=-1 + autocomplete="off", and the bot-bait is a separate name like `website_url`.
- **reCAPTCHA v3** — works but Google-tracked, breaks the "premium privacy" pitch.

**What is missing:** the master plan should say *"Replace the broken honeypot with Cloudflare Turnstile, add `VITE_TURNSTILE_SITE_KEY` and `VITE_TURNSTILE_SECRET_KEY` env vars, gate the EmailJS send on `turnstile.getResponse()` being non-empty."* The panel should have caught this; the audit did and no design picked it up.

### 17. Secrets are committed in the legacy repos and not addressed in any plan

`02-legacy-migration.md` §"Gaps" and `design-systems-engineer.md` R10 both flag that the legacy repos contain `.env` files with live-looking DB passwords, JWT secrets, and OAuth consumer secrets. This is *not* a site issue — those files are not in the landing repo, and `git log --all -- '*.env'` in the landing repo returns nothing. But the panel does not distinguish *the landing site* from *the broader Git workspace* clearly enough. A future contributor cloning the landing repo and then cloning the legacy repos for context will see those `.env` files in their filesystem; if they ever commit anything across both, those secrets propagate.

**What is missing:** a paragraph in the master plan: *"The landing site itself contains no committed secrets (`git log -p | grep -E 'password|secret|token'` returns nothing). However, the legacy repos in `/Users/fernandoibarra/Documents/Development/Nova Legacy/` contain committed `.env` files with DB passwords and JWT secrets. Rotate those credentials and `git filter-branch` (or BFG) the history before exposing the legacy repos anywhere. Not a site-blocking issue but a security hygiene issue worth a side-quest."*

---

## VI. Items that no plan has any chance of being complete without

### 18. The site omits Education and Languages today; both are mandatory for a senior dev portfolio in MX/US

`04-content-gap.md` flags this as a P0 gap. None of the four designs *removes* Education or Languages; three of them add a section. But the section is a structural change to `App.tsx`, requires new i18n keys in both `es.ts` and `en.ts`, and adds an i18n-parity verification step. The current `i18n/index.tsx` §20 uses a loose `get(obj, path, fallback)` that *returns the path string itself* on missing key — so a forgotten key renders literally as `"education.title"` in the page. The audit confirmed this happens for `contactSection.infoTitle`, `projectsSection.prev`, `projectsSection.next` already.

**What is missing:** a pre-build check that fails if any key in `es.ts` is missing from `en.ts` (or vice versa). 15 lines of code:

```ts
// scripts/check-i18n.ts
import { es } from "../src/i18n/es"
import { en } from "../src/i18n/en"
const collectKeys = (o: any, p = ""): string[] =>
  Object.entries(o).flatMap(([k, v]) =>
    typeof v === "object" ? collectKeys(v, `${p}${k}.`) : [`${p}${k}`]
  )
const esKeys = new Set(collectKeys(es)), enKeys = new Set(collectKeys(en))
const missing = [...esKeys].filter(k => !enKeys.has(k))
if (missing.length) { console.error("i18n missing in en:", missing); process.exit(1) }
```

Add it to `"scripts"` in `package.json` and to the pre-build step. This was not in any plan.

### 19. The site has no Open Graph, no Twitter card, no JSON-LD, no sitemap, no robots.txt — and no plan has them as deliverables in the master checklist

`03-landing-audit.md` flagged this as a HIGH. `design-cinematic-scroll.md` and `design-editorial-swiss.md` list `public/og-image.png`, `robots.txt`, `sitemap.xml` as "new" files in their scope tables. But:

- No design says *what* the OG image should depict (a hero portrait? a stylized "Fernando Ibarra — Senior Backend Developer" mark? a code-snippet graphic?).
- No design says *who* writes the SEO meta description (the Spanish and English versions need to be human-curated, not auto-translated — "Fernando Ibarra — Ingeniero Backend Senior" vs "Senior Backend Developer").
- No design names the JSON-LD `@type` — should it be `Person`, `ProfilePage`, or `WebSite`? `Person` with `jobTitle`, `alumniOf`, `knowsLanguage`, `sameAs` (GitHub, LinkedIn) is correct.

**What is missing:** an explicit SEO section in the master plan that names: (a) `og:title`, `og:description`, `og:image` (1200×630) for both languages; (b) `twitter:card` `summary_large_image`; (c) `<link rel="canonical">` for `/es` and `/en`; (d) JSON-LD `Person` block with `name`, `jobTitle`, `alumniOf`, `knowsLanguage`, `url`, `sameAs`; (e) `robots.txt` allowing all, pointing to `/sitemap.xml`; (f) `sitemap.xml` generated at build time from `react-router-dom`'s static routes (or hand-written, since there are no routes here).

### 20. The fake 5-dot skill rating is `i < 4` and never noticed by three designs

`03-landing-audit.md` flagged it. `design-cinematic-scroll.md` removes it. `design-editorial-swiss.md` removes it. `design-quiet-luxury.md` removes it. `design-systems-engineer.md` *does not mention it*. A senior engineer reviewing the systems-engineer design would land on a portfolio where every skill is "4/5" — and would wonder if the design was audited at all.

This is the smallest gap and the most embarrassing: one paragraph in the systems-engineer design saying *"Delete the fake 5-dot proficiency rating (`skills-section.tsx:48–58`). Replace with a tag list of real skills at appropriate seniority levels (`Senior`, `Working`, `Familiar`)."* None of the four designs aligns on this, and an executor picking systems-engineer could ship the fake rating.

**What is missing:** a master checklist item: *"If the skills section includes any 'X / 5' rating UI, delete it. Replace with a 3-tier tag system: `Senior`, `Working`, `Familiar`."*

---

## Summary of the gaps the panel missed, ranked by impact

| Rank | Gap | Severity | Owner effort to fix |
|---|---|---|---|
| 1 | No design was rendered; multiple claims won't survive a real browser pass | High | 1 day to render all four directions |
| 2 | CV PDF production is unspecified; the input CVs are stale and the PDFs don't exist | High | 2 hours |
| 3 | No Lighthouse / axe / Playwright verification step | High | 1 day |
| 4 | Section order, metrics band, and honesty footnote disagreed across designs; no reconciliation | High | 2 hours (a paragraph) |
| 5 | Deployment target not addressed; no CI, no `.env.example`, no deploy script | High | 2 hours |
| 6 | PostgreSQL and WebSockets claims not corrected in the skills section | Medium | 30 minutes |
| 7 | Honeypot still broken in every design | Medium | 1 hour (Turnstile) |
| 8 | OG image, sitemap, robots, JSON-LD not specified | Medium | 4 hours |
| 9 | i18n parity check is not part of the build | Medium | 1 hour |
| 10 | 6.3 MB images + no asset pipeline | Medium | 1 day (sharp + re-export) |
| 11 | Education + Languages still not in the master plan as deliverables | Medium | 4 hours |
| 12 | Owner has 5 unresolved certificate confirmations | Low (but blocks launch) | 1 day of the owner's time |
| 13 | "Apple-style animations" was not defined; the four designs span minimal → maximal | Low | 30 minutes (a conversation) |
| 14 | Logo treatment disagreed across designs; nav behavior wrong in all four | Low | 1 hour |
| 15 | Secrets in legacy repos not part of the site plan | Low (hygiene) | A side-quest |

The top five gaps are blockers; the rest are polish. None of the gaps requires invention — each is a specific gap in the panel's output that an executor can resolve by following the explicit instruction above. The single biggest takeaway is that **the panel produced four excellent but un-rendered designs**, and the panel's own admission of "I could not render the site" is the highest-priority thing to fix before any direction ships.

---

## Acknowledged gaps in this critique

For honesty: this critique also has gaps.

1. **I did not render any of the four designs against a real build.** I read the spec files and judged against the verification work the panel itself produced. A render pass on each would change at least the impact ranking.
2. **I did not fetch any of the 18 cert URLs.** I am relying on `05-certificates.md`'s format-check, which is the same limitation it acknowledges.
3. **I did not interview the owner.** The "what does Apple-style mean" question and the "TanStack id is 10 or 11 chars" question require the owner's answer, not the panel's analysis.
4. **The deploy-target recommendation is opinion, not evidence.** I have not benchmarked Vercel vs Cloudflare Pages vs GitHub Pages for this stack; the recommendation is based on operational ergonomics, not measured performance.
5. **The Cloudflare Turnstile recommendation is opinion.** reCAPTCHA v3 is the path of least resistance for someone who has used it before; Turnstile is the path of least friction for a static site that wants privacy. The owner should pick.

The panel's work is unusually thorough for a recon of this size. The gaps above are the gaps *above and beyond* an already-strong baseline — not the gaps *within* it.
