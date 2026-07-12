# Design System — Quick Reference (build agents)

Shared stylesheet: `css/style.css`. Mood: warm clinical-calm. One H1 per page. Link to it with `<link rel="stylesheet" href="css/style.css">` (adjust relative path if nested). Mobile nav needs `<script src="js/main.js"></script>` before `</body>`.

## Color tokens (CSS custom properties, all AA)
| Token | Hex | Use |
|---|---|---|
| `--color-bg` | `#F7F5FB` | page background (lavender-white) |
| `--color-bg-deep` | `#EFEBF7` | `.section--alt` band + footer |
| `--color-surface` | `#FCFBFE` | cards, inputs |
| `--color-ink` | `#2B2333` | body + headlines |
| `--color-ink-soft` | `#5B4F6B` | muted text / captions |
| `--color-accent` | `#4B2D73` | deep purple — links, primary buttons |
| `--color-accent-deep` | `#3A2159` | hover/active |
| `--color-accent-soft` | `#E9E2F5` | pale lavender fills, `.pill` |
| `--color-clay` | `#7A5C10` | gold — eyebrows, pull-quotes, rules |
| `--color-border` | `#E2DBEE` | hairlines |

## Type scale
Fluid `clamp()` steps: `--step--1`…`--step-5` (small → hero). Serif = `--font-serif` (headlines, .lede, .signature, .pullquote); humanist sans = `--font-sans` (body/UI). Spacing: `--space-1`(.25rem)…`--space-9`(6rem).

## Two-layer copy rule
Every page: search-language in `<title>`, meta description, H1, first 40–60 words → poetic signature line as `.lede` right beneath. Signature lines in brand-brief.md are canon; use verbatim. Wrap hero/offer copy in `<!-- COPY-PASS -->`.

## Components (class → one-line use)
- `.container` / `.container-narrow` — max-width wrappers (72rem / 46rem).
- `.section`, `.section--tight`, `.section--alt` (deep band), `.section--accent` (teal, inverts text/buttons).
- `.section-head` (+`--center`) — eyebrow + heading + intro block.
- `.eyebrow` — uppercase clay kicker. `.lede` — italic serif payoff. `.signature` — canon voice line. `.pullquote` — big clay quote. `.meta` — byline / last-updated.
- `.btn` + `.btn--primary` / `--secondary` / `--ghost`, `.btn--full`, `.btn-row`. One primary CTA per page.
- `.grid .grid--2|--3` — auto-fit card grids. `.split` (+`--media-first`) — text/media two-col.
- `.card`; `.door` (+`--fix`/`--read`/`--start`) — the 3 homepage pathway cards.
- `.pill-row`>`.pill` — credential chips. `.steps`>`.step` — auto-numbered Method steps.
- `.table-wrap`>`.table-compare` — scrollable comparison table (coach vs therapist).
- `.stat` — big serif data point. `.img-placeholder` (+`--wide`) — CSS photo slot; always give real `alt`.
- Forms: `.form`, `.field`, `.input`/`.textarea`/`.select`, `.form__hint`; `.signup`/`.signup__form` newsletter.
- FAQ: `<details class="faq__item"><summary>Q…</summary><div class="faq__answer">A…</div></details>` inside `.faq`. Native, no JS, keyboard-accessible. Phrase each `<summary>` as the question users search; first 40–60 words of the answer stand alone (AEO). Add `FAQPage` JSON-LD mirroring it.
- Utilities: `.text-center`, `.mx-auto`, `.stack`/`.stack-lg` (vertical rhythm), `.visually-hidden`.

## Header & footer
Copy the `<!-- SITE HEADER -->` and `<!-- SITE FOOTER -->` blocks from `index.html` verbatim into every page. In the header nav, move `aria-current="page"` to the current page's link. Footer already contains the crisis-resources block, scope disclaimer, and Organization JSON-LD — do not duplicate Organization schema elsewhere. Keep the `{{KAJABI_*}}` placeholder hrefs; internal links are real relative paths.

## Per-page JSON-LD
- Reuse the **Person** block from `index.html` `<head>` verbatim on `about.html` (it defines `@id` `#carrie`, referenced by Organization + Book).
- Add page-specific schema per redesign-spec: `Book` on book.html (bidirectional `author` ↔ `#carrie`), `Service` on coaching.html, `FAQPage` on faq.html. NO `MedicalWebPage` anywhere — she is a coach, not a clinician.

## Placeholder hrefs (commerce → Kajabi)
`{{KAJABI_COACHING_APPLICATION}}`, `{{KAJABI_BOOK_WAITLIST}}`, `{{KAJABI_WORKBOOK}}`, `{{KAJABI_QUIZ}}`, `{{KAJABI_NEWSLETTER}}`. Reuse these exact tokens so a single find-replace wires the whole site.

## Accessibility
One H1/page; `:focus-visible` ring is global; reduced-motion handled. Descriptive `alt` on every `.img-placeholder`. Don't hard-code colors — use the tokens.
