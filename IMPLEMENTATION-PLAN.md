# Implementation Plan: carriepdavidson.com authority upgrade
*Started 2026-07-12. Static HTML site on GitHub Pages. Six phases; each phase lands as one reviewed commit. Companion docs: SITE-AUDIT.md, CONTENT-ROADMAP.md, LEAD-MAGNET-ROADMAP.md, ANALYTICS-PLAN.md, CHANGELOG.md.*

## Architecture reality (constraints all phases respect)
- No framework, no build step, no CMS: plain HTML + one CSS design system + vanilla JS. This is a feature (Lighthouse-friendly, easy to edit); we do not introduce tooling.
- Email/commerce integrations are external and must not break: Substack (newsletter + book waitlist), Calendly (coaching calls). There are no on-site form handlers; "form states" live on those platforms.
- "Tests" = `checks/site-check.sh`: link integrity, one-H1-per-page, unique titles/descriptions, JSON-LD parse, em-dash ban, token drift. "Production build" = the check script passing + GitHub Pages deploy.
- Analytics: none installed. ANALYTICS-PLAN.md defines the schema; installation requires Carrie's account (privacy-first provider). Events wired only after she opts in.
- Content honesty: no invented credentials, testimonials, media claims, stats, or biography. Substack remains the canonical home of essays; hubs index them.

## Phase 1: Audit + foundations (in progress)
- SITE-AUDIT.md (agent): routes, links, a11y, SEO, perf, placeholders, integrations.
- CONTENT-ROADMAP.md, LEAD-MAGNET-ROADMAP.md, ANALYTICS-PLAN.md (agent).
- This plan. Fix any P0 audit findings before Phase 2.

## Phase 2: Homepage + navigation + Start Here
- Hero: keep H1 "Why can't I break my patterns..." (search layer) + signature lede (it already is the brief's suggested line). Add credential eyebrow REGISTERED NURSE · AUTHOR · TRAUMA RECOVERY COACH; ONE dominant CTA (Start Here) + one quiet secondary (Read her story); pills remain as the trust line.
- Nav (8 → 7): Start Here / Writing / Resources / The Memoir / Coaching / About; FAQ moves to footer Explore. "The Method" folds under Coaching journey + footer (method page stays live; de-emphasized in primary nav).
- New /start-here: heading "You do not have to figure it all out at once." + five path cards (patterns → quiz+essay+worksheet+letter; CPTSD → hub+resources+workbook; recovery → story+memoir waitlist+essays; practice → coaching+scope+FAQ; story → memoir+prologue). Keyboard-accessible cards, one CTA each.
- Homepage three-doors section becomes a compact Start Here teaser (avoids duplicate journeys).

## Phase 3: Publication architecture
- /writing stays the index; add topic hubs ONLY where ≥2 real essays exist. Mapping of the 12 Substack essays (from CONTENT-ROADMAP): expected hubs: nervous-system, adhd-neurodivergence, trauma-patterns/cptsd, addiction-recovery or the-memoir, personal-essays. Hubs are guides (intro, who it's for, start-with essay, list, resource, neighboring topics), not card grids.
- templates/article.html: full editorial article template (title/subtitle/author/dates/reading time/TOC/refs/disclaimer/related/author box/Article JSON-LD), excluded from sitemap + noindex until first native article publishes.
- Breadcrumbs (visible + BreadcrumbList JSON-LD) on hubs, resource detail pages, article template. Not on homepage.
- Related-content endcap pattern: 2-3 related links + one resource + ONE primary next step; varies by page context.

## Phase 4: Resources + lead pathways
- /resources: group by need (Grounding & Regulation / Understanding Patterns / ADHD & Executive Functioning / Reflection & Creativity / Workbooks).
- Detail page per resource (8): what it is / who it helps / what's inside / format+pages / disclaimer / open download / related essay / Sunday Letter invite. Direct PDF links preserved where already published.
- sitemap.xml (clean URLs only), robots.txt, 404.html (branded, helpful). Redirect note: GitHub Pages lacks server redirects; keep old .html URLs canonicalized (done) and avoid renames.
- Quiz: result screens gain "what to read next" per F-type (maps to hubs/essays) + retained non-diagnostic language + disclaimer. No answer storage, no tracking.
- Thank-you experiences: quiz completion is on-site (result = the thank-you); Substack/Calendly confirmations are platform-side; document recommended Substack welcome-email copy in LEAD-MAGNET-ROADMAP TODO for Carrie.

## Phase 5: Authority pages
- About: restructure into intro / current work / clinical background / lived experience / writing + memoir / coaching philosophy / scope + ethics / (media when verified) / next step, with a short "In brief" block up top before the deep story.
- Credibility strip component (CSS class + HTML pattern): BSN, RN · Certified Trauma Recovery Coach · Author of Addicted to Trauma; used on home, about, coaching, book, media(later); never every credential everywhere.
- Memoir journey: prologue excerpt → waitlist single-focus end; companion workbook stays; comps block retained.
- Coaching journey: scope/boundaries block near CTA; application → what-happens-next steps retained.
- /media: TODO(CARRIE): "Green Light - Carrie Davidson x Inside Success TV.pdf" exists in her files but is unverifiable by tooling; media page ships as template with placeholder markers, NOT linked in nav, noindex until Carrie confirms bios/appearances/headshots.
- Testimonials: currently only placeholder early-praise blurbs on book page; they remain clearly marked placeholders (audit will confirm) and are excluded from any "testimonial" treatment until real quotes exist. TODO(CARRIE): supply real early-reader quotes with attribution context.

## Phase 6: Motion + accessibility + performance + verification
- Motion (CSS only): fade/rise on section entry via IntersectionObserver progressive enhancement OR pure CSS; link underline animation; article/long-page quiet progress indicator (quiz already has one); all inside @media (prefers-reduced-motion: no-preference). No parallax (CLS risk on static tooling), no libraries.
- A11y: fix all audit findings; verify heading order, 44px targets, focus-visible, nav toggle aria state, contrast AA.
- Performance: og:image (create branded default SVG→raster? GitHub Pages serves static; generate 1200x630 JPG via headless Edge), favicon set, width/height on all imgs, loading=lazy below fold, font stack already system (no webfonts).
- checks/site-check.sh + CHANGELOG.md + final verification checklist from the brief.

## Deferred / requires Carrie
- Analytics account (provider choice in ANALYTICS-PLAN.md).
- Real memoir cover, ISBN, publisher name, release date.
- Real early-reader praise with context.
- Media page facts (Inside Success TV et al.), approved headshots for press use.
- Substack welcome-email copy + whether to enable its "what subscribers get" page.
- Native on-site articles (CONTENT-ROADMAP.md priorities) if/when she wants search traffic on-domain.
