# Site Audit: carriepdavidson.com

Audited 2026-07-12. Scope: static site in `C:\Users\keked\website`, live at https://carriepdavidson.com (GitHub Pages, `main`, custom domain, HTTPS). Audit only. No site files were changed; this document is the sole deliverable.

Every file path below is absolute. Line references use `file.html:NN`.

---

## Current Stack

- Pure static HTML. 9 HTML pages, no framework, no build step, no CMS, no analytics, no on-site form backend.
- One stylesheet: `css/style.css` (22.4 KB) with a full custom-property design system (color, fluid type scale, spacing, radii, shadows).
- One script: `js/main.js` (881 B), mobile nav toggle only, progressive enhancement. `quiz.html` carries its own self-contained inline JS quiz engine.
- Typography is a system font stack (serif + sans). Zero web-font network requests.
- Root config: `CNAME` (carriepdavidson.com), `.gitattributes` (binary/text normalization), `llms.txt` (AEO summary for LLMs).
- Assets: 4 raster photos/covers (JPG), 5 SVG PDF-cover thumbnails, 8 downloadable PDFs, in `assets/`.
- Docs (not shipped to users): `docs/` holds brand-brief, redesign-spec, research-seo, research-aeo, copy-rubric, design-system, copy drafts, quiz source, goodreads submission.
- JSON-LD: Person (index, about), Book (book), Service (coaching), FAQPage (faq, 17 Q&As), WebPage (quiz), Organization (every footer).

---

## Existing Routes

| Route (clean URL) | File | Title (length) | Meta desc length | Canonical | OG type | H1 | Page JSON-LD |
|---|---|---|---|---|---|---|---|
| `/` | index.html | Why Can't I Break My Patterns? \| Carrie Davidson, RN: Trauma Recovery Coach (74) | 294 (too long) | https://carriepdavidson.com/ | website | "Why can't I break my patterns, even when I understand them?" | Person + Organization |
| `/about` | about.html | Carrie Davidson, RN: Trauma Recovery Coach & Author (51) | 152 | /about | profile | "Carrie Davidson, RN: trauma recovery coach and author" | Person + Organization |
| `/book` | book.html | Addicted to Trauma: Memoir on Trauma & Addiction (48) | 152 | /book | book | "Addicted to Trauma: a memoir about trauma and addiction" | Book + Organization |
| `/coaching` | coaching.html | Trauma Recovery Coach (vs Therapist) \| Carrie Davidson (54) | 152 | /coaching | website | "Trauma recovery coaching for the insight-rich and transformation-poor" | Service + Organization |
| `/method` | method.html | How to Break Trauma Patterns \| Conscious Creation Method (55) | 150 | /method | website | "How to break a trauma pattern: when insight isn't enough" | Organization only |
| `/resources` | resources.html | Free Trauma Recovery Workbook & Worksheets \| Carrie Davidson (59) | 155 | /resources | website | "Free trauma recovery worksheets, a quiz, and a weekly letter" | Organization only |
| `/faq` | faq.html | Trauma Recovery Coaching FAQ \| Carrie Davidson, RN (50) | 154 | /faq | website | "Trauma recovery coaching questions, answered" | FAQPage + Organization |
| `/writing` | writing.html | Essays on Trauma, ADHD & the Nervous System \| Carrie Davidson (60) | 155 | /writing | website | "Essays on trauma, ADHD, and nervous system regulation" | Organization only |
| `/quiz` | quiz.html | Fight Flight Freeze Fawn Quiz \| Trauma Response Test (51) | 154 | /quiz | website | "Which F Response Is Running Your Life?" | WebPage + Organization |

Titles: all 9 unique. Meta descriptions: all 9 unique; 8 are 150 to 155 chars (ideal); `index.html:7` is 294 chars and will be truncated in search results. Each page has exactly one H1. OG title/description/url/site_name present on all pages. `lang="en"` on every `<html>`. No page has a meta robots tag (defaults to index,follow, which is correct here).

---

## Existing Integrations

All integrations are outbound links or link-style forms. No server, no API keys, no on-site data capture.

- **Calendly** (coaching application / booking): `https://calendly.com/coaching-carriepdavidson`. Used consistently on every page (nav "Work with me", hero CTAs, footer, coaching offer buttons). URL identical everywhere. Verified consistent.
- **Substack** (`carriepdavidson.substack.com`):
  - `/subscribe` used for Sunday Letter signup and book waitlist across all pages. Consistent.
  - `/archive` linked once (`writing.html:64`).
  - 12 essay permalinks `/p/...` on `writing.html:81-155`.
- **Email**: `mailto:coaching@carriepdavidson.com` (footer every page, about.html:252).
- **Newsletter forms** on index, coaching, resources: `<form action="https://carriepdavidson.substack.com/subscribe" method="post">` with an email input. See "SEO/Integration" note: this form will not actually subscribe anyone (Substack does not accept this POST). The inline comment (`index.html:268`, `coaching.html:396`, `resources.html:255`) confirms it is a placeholder awaiting a real provider.

### Link audit result

- Internal clean URLs used: `/`, `/coaching`, `/method`, `/book`, `/about`, `/writing`, `/resources`, `/faq`, `/quiz`. Every one maps to an existing `.html` file. GitHub Pages resolves the extensionless form. PASS.
- In-page anchors: `#main` (skip link, target exists on all pages), `#excerpt` (`book.html:103` to `book.html:266`), `#offers` (`coaching.html:120` to `coaching.html:194`). All resolve. PASS.
- Asset links: `assets/trauma-tree-worksheet.pdf` and the 6 library PDFs plus workbook PDF all exist. PASS.
- **Broken image sources (3), see Content Debt**: `assets/addicted-to-trauma-cover.jpg` (`index.html:210`, `book.html:109`) and `assets/healing-circle.jpg` (`resources.html:226`) do not exist in `assets/`.
- External URLs are listed above and were NOT fetched.

---

## Design Strengths

- Coherent, token-driven design system in `css/style.css`. Color, type scale (`--step--1` to `--step-5` fluid `clamp()`), spacing, radius, shadow all centralized.
- Header and footer are byte-for-byte identical across all 9 pages (verified), with correct `aria-current="page"` per page and none on quiz (quiz is intentionally not in nav).
- Strong color contrast throughout (computed, see Accessibility). No token pair fails WCAG AA.
- System font stack means no font loading, no FOIT/FOUT, no layout shift from fonts.
- Every `<img>` has explicit `width`/`height` (prevents cumulative layout shift) and below-the-fold images use `loading="lazy"`.
- Voice and brand rules are respected in visible content: no em-dashes anywhere in the HTML (verified: 0 occurrences of `—` or `&mdash;` across all pages). En dashes (`&ndash;`) and middots are used deliberately.
- Native `<details>`/`<summary>` FAQ accordion: keyboard-accessible and works with no JS.
- Crisis resources and YMYL scope disclaimer on every page (ethical + trust signal for a mental-health-adjacent site).
- `llms.txt` present and well-formed for AEO/LLM citation.
- JSON-LD entity graph is internally linked by `@id` (Organization founder to Person #carrie; Book author to Person #carrie; Service provider to #carrie).

---

## UX Problems

1. **Broken hero/feature images** on 3 pages (index book teaser, book hero, resources community block). Because the missing files still have `<img src>`, the browser renders a broken-image glyph plus alt text rather than the intended `.img-placeholder` CSS texture. This is the most visible defect on the site. Files: `index.html:210`, `book.html:109`, `resources.html:226`.
2. **Newsletter signup forms do nothing.** Submitting the email field on index/coaching/resources posts to Substack's `/subscribe` and will not enroll the address. A visitor who types their email and clicks "Get the Sunday Letter" gets no subscription. This is a silent conversion leak on the primary "start free" path.
3. **Early-praise section shows placeholder blurbs** to real visitors (`book.html:311,316,321`): three cards reading "Advance praise placeholder..." attributed to "Reviewer name, credential". Looks unfinished on a flagship page.
4. **"Explore the Healing Circle" points to `/coaching`** (`resources.html:238`) but the coaching page has no Healing Circle anchor or section by that name (the offer there is "Small Group Healing Circle"). Mild mismatch between promise and destination.
5. Quiz result "secondary pattern" and dominance copy is solid, but the quiz is not linked from the primary nav; discovery relies on `/resources` and footer only. Intentional, but worth confirming.

---

## SEO Problems

- **No `og:image` on any page** (verified: 0 occurrences sitewide). Social/link shares for an author-and-book brand will render with no image. High impact for a memoir launch. P1.
- **No favicon, no apple-touch-icon, no web manifest, no Twitter Card tags** (verified: 0 occurrences). Browser tabs and shares show a blank/default icon. P1.
- **No `sitemap.xml`.** Recommended for a multi-page site. P1.
- **No `robots.txt`.** Not fatal (default is allow-all), but there is no place to point a sitemap. P2.
- **No `404.html`.** GitHub Pages will serve its generic 404 instead of a branded, on-navigation page. P1.
- **`index.html` meta description is 294 chars** (`index.html:7`), roughly double the useful SERP length; it will truncate. P2.
- **Placeholder `sameAs` social URLs** in the Person schema and every Organization footer: `https://www.instagram.com/`, `https://substack.com/`, `https://www.goodreads.com/` are bare platform homepages, not Carrie's profiles (`index.html:60-64` and `:358-362`, repeated in every page footer). This weakens entity disambiguation and reads as unfinished markup to crawlers. P1.
- **Person schema has an invalid `author` property** (`index.html:55-59`, `about.html:55-59`): `author` is a property of CreativeWork, not Person. The intended "Carrie authored the Book" link is already correctly expressed on the Book node (`book.html:30-34`). The Person.author block is semantically backwards and will be ignored at best. P2.
- **Book schema `isbn: "TBD"`** (`book.html:35`) is an invalid ISBN value. Omit the field until assigned rather than emit "TBD". P2.
- **Duplicate-URL exposure**: both `/about` and `/about.html` resolve on GitHub Pages. Canonical tags point to the clean form, which mitigates duplicate-content risk, so this is low priority. P2.
- Positive: canonical, OG core tags, `lang`, unique titles/descriptions, JSON-LD, and `llms.txt` are all present and largely correct.

---

## Accessibility Problems

Overall accessibility is strong. Landmarks (`header`, `nav[aria-label="Primary"]`, `main#main`, `footer`, `nav[aria-label="Footer"]`, crisis `section[aria-label]`), skip links to `#main`, `aria-current`, visible `:focus-visible` outlines (`style.css:466`), `prefers-reduced-motion` handling (`style.css:472`), labeled newsletter input (visually-hidden `<label for="email">`), accessible nav toggle (`aria-expanded` + `aria-controls` + visible "Menu" text), quiz radiogroup semantics (`role="radiogroup"`, `aria-labelledby`, per-radio `aria-label`), progressbar ARIA, comparison table `<caption>` + `scope`, and alt text on every image.

### Contrast (computed, WCAG 2.1)

| Pair | Ratio | Verdict |
|---|---|---|
| ink `#2B2333` on bg `#F7F5FB` | 13.95:1 | AAA |
| ink-soft `#5B4F6B` on bg | 6.99:1 | AAA (normal text) |
| accent `#4B2D73` on bg (links, buttons) | 10.10:1 | AAA |
| on-accent `#F8F5FC` on accent | 10.12:1 | AAA |
| clay `#7A5C10` on bg (eyebrow labels) | 5.77:1 | AA |
| clay on clay-soft `#F5EDCF` (crisis h2) | 5.32:1 | AA |
| accent-soft `#E9E2F5` on accent (lede on CTA) | 8.67:1 | AAA |
| accent-deep `#3A2159` on accent-soft (pill) | 10.81:1 | AAA |
| ink-soft on surface `#FCFBFE` (door text) | 7.34:1 | AAA |
| clay on bg-deep `#EFEBF7` (eyebrow, alt band) | 5.32:1 | AA |

No key token pair fails. This is a genuine strength; the palette was tuned for AA.

### Issues found

1. **Broken images degrade the accessible experience**: the 3 missing images render as broken-image glyphs. Alt text is present and good, so screen-reader users are unaffected, but sighted users see a broken icon. (See UX/Content Debt.)
2. **Quiz `ArrowLeft` is hijacked for "Back"** (`quiz.html:853`). Inside a native radio group, Left arrow normally moves selection to the previous option; here it jumps to the previous question. This can surprise keyboard and screen-reader users mid-question. Minor.
3. **Quiz scale anchor labels do not match the radio labels.** The visible end anchors say "1 Not like me at all" / "5 Very much like me" (`quiz.html:291-292`), while each radio's `aria-label` and visible descriptor say "Not at all / Rarely / Sometimes / Often / Always" (`quiz.html:507-513`). Two different scales describing the same control. Cosmetic, but worth unifying.
4. **Desktop nav link tap target is small**: `.nav__link` vertical padding is `--space-1` (0.25rem) on desktop (`style.css:225`). Fine for mouse, and the mobile menu uses larger `--space-3` padding, so this is low priority.
5. `.faq__item[open] summary::after` uses an en dash via CSS `content: "\2013"` (`style.css:422`); this is an en dash, not an em dash, so the brand rule is not violated in output.

---

## Performance Problems

Baseline is excellent: no framework, no web fonts, one small render-blocking stylesheet, deferred JS at end of body, explicit image dimensions, and lazy-loading. CSS + JS are shared and cached after the first page.

Approx. initial-load weight per page (HTML + shared CSS/JS + above-and-below-fold images actually referenced):

| Page | Approx weight | Notes |
|---|---|---|
| `/about` | ~746 KB | Two large photos: `carrie-davidson.jpg` (306 KB) + `carrie-davidson-working.jpg` (380 KB). Heaviest page. |
| `/book` | ~489 KB | Workbook cover (122 KB) + carrie photo (306 KB) + 1 broken cover (0). |
| `/` | ~356 KB | `carrie-davidson.jpg` (306 KB) + 1 broken cover (0). |
| `/resources` | ~103 KB | 5 SVG covers (~7 KB total) + `pdf-youre-not-broken.jpg` (52 KB) + 1 broken image. Light. |
| `/quiz` | ~70 KB | Self-contained; no images. |
| `/faq` | ~58 KB | No images; large HTML (long content + FAQ JSON-LD). |
| `/coaching` | ~51 KB | No images. |
| `/method` | ~45 KB | No images. |
| `/writing` | ~37 KB | No images. |

Issues:

1. **Unoptimized raster photos.** `carrie-davidson.jpg` (306 KB), `carrie-davidson-working.jpg` (380 KB), `addicted-to-trauma-workbook-cover.jpg` (122 KB) are full-size JPEGs served at ~640 px display width with no `srcset`/`sizes` and no WebP/AVIF. About-page delivers ~690 KB of photos. P2.
2. **Very large PDF downloads.** `adhd-affirmation-cards.pdf` 6.03 MB, `trauma-tree-worksheet.pdf` 4.04 MB, `befriending-nervous-system-workbook.pdf` 3.88 MB, `youre-not-broken-adhd-ebook.pdf` 3.30 MB. The Trauma Tree Worksheet is the primary free CTA sitewide and is a 4 MB download; worth compressing. (Smaller: small-leavings-workbook 279 KB, addicted-to-trauma-workbook 209 KB, conscious-creation 84 KB, small-leavings-journal 48 KB.) P2.
3. No other render-blocking resources. `main.js` loads at end of body on every page.

---

## Content Debt & Placeholders

1. **Missing memoir cover image** `assets/addicted-to-trauma-cover.jpg`, referenced twice (`index.html:210`, `book.html:109`). The cover art does not exist yet. Requires design/Carrie.
2. **Missing community image** `assets/healing-circle.jpg` (`resources.html:226`). Requires an asset.
3. **Three placeholder early-praise blurbs** on the book page (`book.html:311,316,321`), text "Advance praise placeholder..." with byline "Reviewer name, credential". Section intro (`book.html:306`) already hedges "Advance blurbs are being gathered," but the placeholder cards themselves are visible to users. Requires real blurbs (Carrie).
4. **`isbn: "TBD"`** in Book JSON-LD (`book.html:35`). Requires publisher ISBN.
5. **Bare `sameAs` social URLs** in Person schema and every footer Organization block (instagram.com/, substack.com/, goodreads.com/). Requires Carrie's actual profile URLs.
6. **Newsletter form action is a stated placeholder** (`index.html:268`, `coaching.html:396`, `resources.html:255`: "replace action + hidden fields at integration"). Requires a real email provider embed.
7. No lorem-ipsum found; all body copy is real, on-voice, and complete. The excerpt on `book.html:274-290` is marked approved manuscript text, not placeholder.
8. Product catalog note (from `docs/brand-brief.md`): brand brief lists the Trauma Tree Worksheet as a sellable product, but the site offers it as a free download. The book page comment (`book.html:386`) confirms Carrie chose free-for-now; treat as intentional, not a defect.

---

## Consistency Notes

- Header and footer identical across all pages; `aria-current` correct on all 8 nav pages and correctly absent on quiz. Strong.
- **Stale palette comments (token drift in comments, not values).** `css/style.css:3` describes the accent as "teal" and the mood as "Linen, dusk"; button comments say "deep teal" (`style.css:270`). The actual tokens are purple/lavender/gold. Comments are misleading for future maintainers. Values themselves are consistent.
- **Hardcoded colors outside the token system**: `.door--start` border `#B98A2E` (`style.css:310`), `.crisis` border `#E4D6A4` (`style.css:440`), and the `.img-placeholder` gradient uses teal/rust `rgba()` values (`style.css:337-339`) that predate the purple/gold palette. These should be tokens or removed.
- **Repeated inline styles that should be a component/class**:
  - `style="color: var(--color-accent-soft)"` on the eyebrow in every `.section--accent` block (index, about, book, coaching, method, faq, writing; ~7 repeats). A single rule `.section--accent .eyebrow { color: var(--color-accent-soft); }` would replace all of them and prevent the default clay eyebrow from ever landing low-contrast on the purple band.
  - `style="justify-content:center; max-width: 34rem;"` repeated on the 3 signup forms.
  - Numerous `style="margin-top: var(--space-N)"` one-offs; acceptable but a small set of spacing utilities would reduce them.
- **CSS comments contain 23 em-dashes** (`css/style.css`). Not user-visible, but the brand rule is "no em-dashes anywhere." If the rule is enforced literally, the CSS comments violate it. Cosmetic.

### Integration verification (static)

- All Calendly hrefs identical and correct. All Substack `/subscribe` hrefs identical and correct.
- **Quiz JS**: every `document.getElementById(...)` target exists in the markup (29 IDs checked: screen-intro/quiz/result, qz-count, qz-typelabel, qz-progressbar, qz-progress-fill, qz-sectionintro, qz-legend, qz-scale, qz-form, qz-back, qz-next, qz-result-title/badge/tagline, qz-bars, qz-dominance, qz-what, qz-quote, qz-intensity-summary, qz-tiers, qz-patterns, qz-cost, qz-nextstep, qz-secondary-name/summary, start-btn, qz-retake). No missing-node errors. Scoring logic (`sum/20` thresholds, primary/secondary sort) is coherent. Results use non-diagnostic, de-shaming language ("not a character flaw," "response profile," educational disclaimer on the intro screen at `quiz.html:264`). One dead assignment: `qz-typelabel` is always set to empty string (`quiz.html:616`); harmless.

---

## Recommended Changes (prioritized)

### P0 (visible defects / broken functionality, fix first)
1. Resolve the **3 broken images**. Either supply `assets/addicted-to-trauma-cover.jpg` and `assets/healing-circle.jpg`, or replace those `<img>` elements with the intended pure-CSS `.img-placeholder` block (a `<div>`, no `src`) so nothing renders broken. Files: `index.html:210`, `book.html:109`, `resources.html:226`.
2. Fix or remove the **non-functional newsletter forms** so the primary "start free" CTA actually subscribes people (real Substack embed, or make it a plain link to `/subscribe` with no fake email field). `index.html:269`, `coaching.html:397`, `resources.html:256`.
3. Replace the **three placeholder praise blurbs** on the book page with real ones, or hide the section until blurbs exist. `book.html:308-323`.

### P1 (launch-quality SEO / brand)
4. Add **`og:image`** (and a Twitter Card) to every page, ideally a branded default plus the memoir cover on `/book`.
5. Add a **favicon + apple-touch-icon** and reference them in every `<head>`.
6. Add **`sitemap.xml`**, **`robots.txt`** (pointing at the sitemap), and a branded **`404.html`** (GitHub Pages custom 404).
7. Replace the **bare `sameAs` URLs** with Carrie's real Instagram/Substack/Goodreads profile URLs in the Person schema and all footer Organization blocks.

### P2 (polish / correctness)
8. Trim `index.html` meta description to ~155 chars (`index.html:7`).
9. Remove the invalid `author` block from the Person schema (`index.html:55-59`, `about.html:55-59`); the Book already links back to Carrie correctly.
10. Remove `isbn: "TBD"` from Book schema until an ISBN exists (`book.html:35`).
11. Compress the large PDFs (especially the 4 MB Trauma Tree Worksheet, the primary CTA) and serve responsive/WebP versions of the large photos.
12. Extract the repeated accent-eyebrow and signup-form inline styles into CSS classes; move hardcoded colors (`#B98A2E`, `#E4D6A4`, the img-placeholder teal/rust gradient) into tokens; update the stale "teal" comments in `css/style.css` to "purple."
13. Unify the quiz scale labels (`quiz.html:291-292` vs `507-513`) and reconsider hijacking `ArrowLeft` for Back inside the radio group (`quiz.html:853`).

---

## Changes Requiring Carrie (content, accounts, credentials)

- **Memoir cover art** (`assets/addicted-to-trauma-cover.jpg`) and a **community/Healing Circle image** (`assets/healing-circle.jpg`).
- **Real advance-praise blurbs** (name + credential) for the book page, or approval to hide the section.
- **Book ISBN** once the publisher assigns it.
- **Actual social profile URLs** (Instagram, Substack, Goodreads) to replace the bare `sameAs` placeholders.
- **Email-provider decision and account** (Substack embed, Kajabi, or other) so the newsletter form captures addresses; the current form is a stub.
- **Confirmation of the Calendly account/handle** `coaching-carriepdavidson` is live and correct (not verifiable statically here).
- **OG/social share image** artwork (a branded default, plus optionally per-page images).
- **Favicon artwork.**
- Confirmation that free-vs-paid status of the Trauma Tree Worksheet and companion workbook (free on the site, "sellable" in the brand brief) is intended.
