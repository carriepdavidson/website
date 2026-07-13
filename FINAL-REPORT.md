# Final Verification Report: carriepdavidson.com authority upgrade

*Prepared 2026-07-13 as the final QA gate (accessibility, performance, technical SEO). Static HTML site on GitHub Pages, live at carriepdavidson.com. No em-dashes appear anywhere in the site or this report.*

---

## 1. What the program did (the arc)

The site began as 9 pages of pure static HTML with a coherent design system, strong contrast, and honest copy, but with real gaps: dead newsletter forms that could not subscribe anyone, three broken image sources, live placeholder praise on the book page, an over-long homepage meta description, no sitemap, no branded 404, no topic architecture, and thin authority framing. Six phases closed those gaps:

- **Phase 1 (audit + foundations):** produced SITE-AUDIT, the content and lead-magnet roadmaps, the analytics plan, and `checks/site-check.sh`. Fixed all P0 issues: dead forms replaced with working Substack links, broken images replaced, placeholder praise removed, og:image + Twitter card + favicon set added sitewide, JSON-LD identity corrected.
- **Phase 2 (homepage + navigation + Start Here):** simplified nav to six primary items, focused the hero on one dominant CTA, and added `/start-here` with five keyboard-accessible doorway cards.
- **Phase 3 (publication architecture):** three topic hubs (nervous-system, adhd, trauma-patterns) with breadcrumbs + BreadcrumbList JSON-LD, and a noindexed editorial article template.
- **Phase 4 (resources + pathways):** eight resource detail pages, the library regrouped by need, `sitemap.xml`, `robots.txt`, a branded `404.html`, and per-type "read next" pathways on the quiz.
- **Phase 5 / 5.4 (authority + messaging):** credibility strips, restructured About, the ARC Program / Conscious Creation Circle naming, canonical five-step method, Bio-1 alignment, and a banned-word sweep.
- **Phase 5.5 (immersive redesign):** a full visual system on Carrie's lavender/blush/ivory/paper palette with Cormorant Garamond + DM Sans, arch doorway cards, wave dividers, a working Substack embed, and the stacked brand header with the Sunday Letter pill, propagated to all interior pages.
- **Phase 6 (this pass):** full mechanical, accessibility, performance, and SEO verification with the fixes listed in section 5 and the CHANGELOG.

The result is 24 indexable pages with consistent structure, verified contrast, complete metadata, a symmetric sitemap, and a self-enforcing check suite.

---

## 2. Files changed (program range)

- `git diff --stat 8972467..HEAD`: **80 files changed, 8850 insertions, 1010 deletions** (Phase 1 through Phase 5.5, committed).
- `git log --oneline 8972467..HEAD`: **27 commits**.
- Phase 6 (this pass, staged in the working tree, one further commit): 12 files touched: `index.html`, `about.html`, `start-here.html`, `404.html`, `method.html`, `writing/adhd.html`, `writing/nervous-system.html`, `writing/trauma-patterns.html`, `css/style.css`, `llms.txt`, `checks/site-check.sh`, plus this report and `CHANGELOG.md`.

---

## 3. Routes added / changed over the program

Added (all indexable and in the sitemap): `/start-here`, `/for-nurses`, `/writing/nervous-system`, `/writing/adhd`, `/writing/trauma-patterns`, and eight resource detail pages under `/resources/` (`trauma-tree-worksheet`, `youre-not-broken`, `befriending-your-nervous-system`, `adhd-affirmation-cards`, `conscious-creation-workbook`, `small-leavings-workbook`, `small-leavings-journal`, `addicted-to-trauma-workbook`).

Added but intentionally noindex and out of the sitemap: `/404`, `/media`, `templates/article.html`.

Changed: `/` (recomposed homepage), `/writing` (browse-by-topic), `/resources` (regrouped by need), `/about`, `/book`, `/coaching` (authority + scope treatments), `/quiz` (read-next pathways). No routes were renamed or removed, so no server redirects are required (GitHub Pages has none).

---

## 4. Integrations preserved

- **Substack:** newsletter/waitlist links (`/subscribe`), the live embed iframe on the homepage (loading="lazy" + title), and 12 essay permalinks. All resolve; no on-site capture.
- **Calendly:** `https://calendly.com/coaching-carriepdavidson` for coaching calls, consistent sitewide.
- **PDFs:** all eight downloadable resources link directly to existing files in `assets/`; no email gates.
- **Quiz:** self-contained inline engine, custom radiogroup with `role="radiogroup"`, `role="progressbar"`, and `aria-live`; keyboard flow unchanged; no answer storage or tracking.

---

## 5. Tests run

- **`checks/site-check.sh` (extended this pass):** 12 checks, all green: em-dash ban, one H1 per page, unique titles, meta descriptions present, canonicals present and extensionless, internal links + assets resolve (now including subdirectories via a per-page relative resolver), JSON-LD parses (all 24 pages), img alt attributes, no unresolved tokens, sitemap entries resolve, no old-palette hex, no banned words.
- **This QA pass (scripted audits):** heading order (h1 to h2 to h3, no skips), title/description lengths, canonical-matches-path, og/twitter/favicon/fonts presence, brand header + Sunday Letter pill, footer parity (For Nurses + crisis + disclaimer + Organization JSON-LD), image src/alt/width/height/lazy, decorative-SVG aria-hidden, sitemap symmetry (22 in and 22 out), noindex on the three excluded pages, iframe attributes, script placement, font strategy, and per-page weight.

**Fixes applied:** footer For Nurses link on index + start-here; hub heading-skip and dangling `aria-labelledby` fixed on three hubs; og:image/twitter:card added to 404; width/height on four botanical SVGs; lazy on the below-fold signup botanical; two over-length meta descriptions trimmed; llms.txt Core pages extended; site-check.sh extended. See CHANGELOG Phase 6.

---

## 6. Build result

N/A. This is a static site with no build step. "Build passing" is defined as the check suite passing plus a GitHub Pages deploy. The check suite is green (`bash checks/site-check.sh` prints ALL CHECKS PASSED). Deploy happens on push to `main`.

---

## 7. Lighthouse

**Lighthouse was not run.** This machine has no headless Chrome/Lighthouse runner available, and headless-Edge screenshots on it clip below roughly 500px width (documented in Phase 2), so a real Lighthouse score and visual mobile QA could not be produced here honestly. Instead of guessing a score, the following proxy metrics were verified directly and support a strong performance and best-practices profile:

- **Per-page weight (html + css + js + above-the-fold images):**

| Page | HTML | Above-fold images | Page total | Under 1.5MB? |
|---|---|---|---|---|
| index | 28 KB | carrie-pond.jpg 407 KB + botanical 1 KB | 485 KB | Yes |
| about | 26 KB | carrie-davidson.jpg 306 KB + botanical 1 KB | 382 KB | Yes |
| coaching | 30 KB | none (only image is below-fold, lazy) | 79 KB | Yes |
| book | 29 KB | addicted-to-trauma-cover.jpg 197 KB | 275 KB | Yes |

Shared per page: `style.css` 47 KB, `main.js` 2.1 KB. Fonts load from Google Fonts (external, not counted in the table).

- **No single referenced image exceeds 450KB** (largest is carrie-pond.jpg at 407KB; next are 380KB and 365KB).
- **Font strategy:** one Google Fonts request, `display=swap`, exactly two declared families (Cormorant Garamond, DM Sans) with only the weights in use; identical URL on every page.
- **Image dimensions:** every `<img>` has explicit width + height (verified against actual pixel dimensions of the asset files), preventing layout shift.
- **Lazy loading:** below-the-fold images carry `loading="lazy"`; hero images are exempt (the homepage hero also uses `fetchpriority="high"`).
- **No render-blocking scripts:** `main.js` is end-of-body on every page; no scripts in `<head>` other than JSON-LD data blocks.
- **Contrast:** five documented token pairs recomputed from CSS values and confirmed accurate (ink 11.96, accent 7.02, ink-soft 7.69, bronze 5.95, footer-text 9.23), all at or above their WCAG thresholds.

---

## 8. Remaining content needed from Carrie

1. **Real early-reader praise** for the book page, with attribution context (placeholders were removed; the page currently carries none rather than fake ones).
2. **Memoir specifics:** confirmed release date (currently "Summer 2026"), ISBN, and publisher name.
3. **Analytics account decision:** ANALYTICS-PLAN.md recommends a privacy-first provider; nothing is installed until she opts in and supplies the account.
4. **Client-photo consent confirmation** for the coaching session photo used publicly.
5. **Media page facts verification** (appearances, bios, headshots for press use); `media.html` stays noindex and unlinked until confirmed.
6. **Goodreads URL** for her author/book page, to add to `sameAs` once it exists.

---

## 9. Remaining technical risks

- **Substack embed is a third-party dependency.** The homepage iframe renders from `carriepdavidson.substack.com`; if Substack changes its embed or is unavailable, the visible fallback link still works, but the inline signup would not.
- **GitHub Pages has no server-side redirects.** Clean URLs work because each maps to a real `.html` file; any future page rename would break inbound links, so renames should be avoided (or handled with a client-side 404 fallback).
- **No headless-screenshot QA on this machine.** Mobile layout and visual regressions were verified by CSS inspection and computed metrics, not by rendered device screenshots. A real-device or cloud Lighthouse/screenshot pass is recommended before major future changes.

---

## 10. Recommended next three actions

1. **Commit and deploy Phase 6**, then run one cloud Lighthouse pass (mobile + desktop) and a real-device check to confirm the proxy metrics against actual scores.
2. **Collect the book-launch content from Carrie** (real praise, release date, ISBN, publisher, Goodreads URL) and swap it into `/book` and the Book JSON-LD; this is the highest-value blocked item.
3. **Make the analytics decision** and, once the account exists, wire the privacy-first events defined in ANALYTICS-PLAN.md so future content and funnel work can be measured.
