# Portfolio — Faiz Aflah Hafizuddin

Next.js 16 (App Router) + next-intl + GSAP 3.15 + Tailwind CSS 4. Indonesian at `/`, English at `/en`.
Every page is statically generated, so all text is in the HTML search engines receive; GSAP only animates on top.

The site is written for **clients**: it sells a way of thinking (how problems are taken apart and decisions made),
not a list of past domains.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint       # ESLint 9 + eslint-config-next
npm run build && npm start
```

TypeScript: `typescript` is aliased to the TS 6 API package (typescript-eslint and Next need it) and TS 7 is installed as
`@typescript/native`, so `npx tsc --noEmit` still runs the TS 7 compiler.

## Where things live

| What | File |
|---|---|
| Hero copy, the five principles ("Cara saya berpikir"), home service cards, experience, standard bio | `src/content/profile.ts` |
| Service pages, Palembang page, all FAQ answers | `src/content/services.ts` |
| Articles (Markdown, one file per language, paired by `key`) | `content/articles/{id,en}/<slug>.md`, read by `src/lib/articles.ts` |
| Case studies and archive projects (problem, decisions, diagrams, screenshots) | `src/content/work.ts` |
| Buttons, headings and other UI text | `messages/id.json`, `messages/en.json` |
| Page sections | `src/app/[locale]/page.tsx`, `src/components/{hero,approach-section,case-gallery,archive-section}.tsx` |
| Case-study page and its side index | `src/app/[locale]/work/[slug]/page.tsx`, `src/components/case-index.tsx` |
| Motion (smooth scroll, horizontal sections, reveals) | `src/components/motion/*` |
| Colour tokens, layout grid, dark theme | `src/app/globals.css` |
| Canonical URLs, hreflang, page metadata | `src/lib/seo.ts` |
| Structured data (Person, ProfessionalService, Service, FAQPage, BlogPosting…) | `src/lib/structured-data.ts` |
| Sitemap, robots (incl. AI crawlers), llms.txt | `src/app/sitemap.ts`, `src/app/robots.ts`, `src/lib/llms.ts` |

**Adding a project:** add an entry to `projects` in `src/content/work.ts`. With a `caseStudy` block it becomes a case study
(horizontal gallery + its own page); without one it goes to the archive, where its `diagram` is drawn by
`src/components/entity-diagram.tsx`. Use descriptive titles for client work, never repo names. Projects do not link to
their repositories.

**Pages and URLs:** public URLs are localised by `pathnames` in `src/i18n/routing.ts`, while the folders under
`src/app/[locale]` keep English names.

| Page | Indonesian | English |
|---|---|---|
| Home | `/` | `/en` |
| Service (4) | `/layanan/<slug>` | `/en/services/<slug>` |
| Palembang | `/jasa-pembuatan-aplikasi-palembang` | `/en/software-developer-palembang` |
| FAQ | `/tanya-jawab` | `/en/faq` |
| Articles | `/artikel`, `/artikel/<slug>` | `/en/articles`, `/en/articles/<slug>` |
| Case study | `/work/<slug>` | `/en/work/<slug>` |

Always link with typed hrefs (`{ pathname: '/services/[slug]', params: { slug } }`), never hand-written strings, so
every link follows the localised URL.

**FAQ answers** that describe how Faiz works with clients start as `confirmed: false` (hidden from the page and the
structured data) and are switched on only after he approves them.

**Articles:** add `content/articles/id/<slug>.md` and `content/articles/en/<slug>.md` with the same `key` and
`draft: true`. Preview with `SHOW_DRAFTS=1 npm run build && SHOW_DRAFTS=1 npm start` (drafts are marked and noindex).
Set `draft: false` once approved. Drafts never reach the sitemap or llms files. The build fails if an article is missing
a language or a required field.

**Screenshots:** capture at 1440×900 with device scale 2 (2880×1800, 16:10) or phones at 1170×2532, using dummy data
("Karyawan 01", "Klien A"). Every image is shown in a fixed-ratio frame, so sizes stay consistent either way.

## Layout rules

- One horizontal system: `.wrap` (max 80rem, gutter `clamp(1.25rem, 4vw, 3rem)`) and `.grid-12`. Full-bleed tracks use the
  same inset, so every section starts on the same left edge at every width.
- Two text widths only: `.measure` and `.measure-wide`.
- Colours are semantic tokens on `:root` (`--bg`, `--ink`, `--accent`…); the Tailwind names (`kertas`, `tinta`, `stempel`…)
  map onto them. Paper fragments in the hero keep fixed light colours in both themes on purpose.

## Motion and accessibility

- An inline script adds `motion` to `<html>` only when the visitor has not asked for reduced motion; all animation is keyed
  on it. Without JS or with reduced motion the page is fully readable, and horizontal sections become swipe carousels.
- ScrollSmoother runs on desktop only (touch devices scroll natively). `position: sticky` does not work inside it, so pinned
  things use ScrollTrigger `pin`.
- Horizontal sections (`HorizontalScroller`) pin on screens ≥768px; a `short:` Tailwind variant tightens them on short
  laptop screens so header, cards and progress always fit.
- Page-level motion is driven by data attributes (`data-split`, `data-reveal`, `data-count`, `data-draw`, `data-magnetic`,
  `data-cursor`) handled by `PageMotion`, so content stays in server components.
- Theme: follows the system until the visitor chooses; the choice is stored in `localStorage` and applied before paint.
- The hero has a failsafe: if its script never reports ready, it is tidied after 3.5 s.

## Search engines and AI assistants

- Every page has a keyword-first title (≤70 characters with the name suffix), a unique description (≤160), one H1,
  canonical and hreflang (x-default is English), and structured data linked by `@id`.
- `robots.txt` allows all crawlers and names the search and AI bots explicitly (Googlebot, Bingbot, OAI-SearchBot,
  GPTBot, Claude-SearchBot, ClaudeBot, PerplexityBot, Google-Extended…).
- `/llms.txt` and `/llms-full.txt` are generated from the same content as the pages.
- IndexNow tells Bing, which feeds ChatGPT search, about every URL. Run it after each deploy.
- Off-site steps (Search Console, Bing, Google Business Profile, profiles, the standard bio, what to measure) are in
  `docs/seo-offsite.md`.

## Deploy (Netlify)

The site runs on Netlify's free plan, which allows commercial use (Vercel's free Hobby plan does not, and this site
advertises services). Netlify builds every push to `main` of
[github.com/Itsnotf/portfolio-faiz](https://github.com/Itsnotf/portfolio-faiz); settings are in `netlify.toml`.

1. Environment variables live in Netlify under *Project configuration → Environment variables* (see `.env.example`).
   `NEXT_PUBLIC_SITE_URL` is required, because canonical URLs, hreflang, the sitemap, structured data and llms.txt use
   it. `GOOGLE_SITE_VERIFICATION` and `BING_SITE_VERIFICATION` are the ownership codes. Never set `SHOW_DRAFTS` there.
   Changing a variable needs a new deploy.
2. When the domain is connected, set `NEXT_PUBLIC_SITE_URL` to it (Netlify then redirects `faizaflah.netlify.app` to
   the domain), redeploy, and follow `docs/seo-offsite.md`, starting with the sitemap in Search Console and Bing, then
   `NEXT_PUBLIC_SITE_URL=https://your-domain npm run indexnow`.

Things to know:

- Do not deploy with `netlify deploy --build` from Windows. Netlify's Next.js adapter mangles Windows paths when it
  packages the middleware. Push to GitHub and let Netlify build on Linux.
- Netlify injects an HTML comment into `<head>`. The inline script in `src/app/[locale]/layout.tsx` removes it
  before hydration. Without that, React re-rendered every page and the animations switched off.
- `@vercel/analytics` only runs on Vercel, so there is no analytics on Netlify yet. Search Console covers search
  queries. For AI referrers (chatgpt.com, perplexity.ai, gemini.google.com), add a free tool such as Cloudflare Web
  Analytics.

## Still to do

- [ ] Put an up-to-date CV at `public/cv/cv-faiz-aflah-hafizuddin.pdf` and set `profile.cv` (the one in Documents is outdated).
- [ ] Add a photo in `src/content/profile.ts` (and a LinkedIn URL if you create one).
- [ ] Buy the domain (.com or .dev), connect it in Netlify, and work through `docs/seo-offsite.md`.
- [ ] Confirm the reasoning for the 0.65 recognition threshold (`TODO(Faiz)` in `src/content/work.ts`).
- [ ] Add a reflection to the SIPEG case study: what triggered the September 2026 rebuild?
- [ ] Confirm roles and status of the client projects in the archive and the procurement case study (`TODO(Faiz)`).
- [ ] ALBATROS screenshots still show a first name ("Nadia"); recapturing needs PostgreSQL + pgvector running locally.
