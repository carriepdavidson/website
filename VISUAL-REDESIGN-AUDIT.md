# Visual Redesign Audit: translating carriepdavidson.com to the ImmersiveExample system
*2026-07-13. Reference: docs/immersive-example-mockup.png (Carrie's supplied homepage mockup). This phase runs after Phase 5 (authority pages) and before Phase 6 (final QA), so QA validates the new skin.*

## Current framework and system
- Pure static HTML (24 pages: 11 root incl. 404 + 3 writing/ hubs + 8 resources/ + templates/article.html), one token-based css/style.css (~13 sections, additive phase blocks), vanilla JS (js/main.js nav toggle + quiz inline). GitHub Pages, clean URLs, no build step, no CMS.
- Tokens: lavender-white bg (#F7F5FB), deep purple accent (#4B2D73), deep gold (#7A5C10), plum ink (#2B2333). System font stacks (Iowan/Palatino serif + system sans). No webfonts currently.
- Integrations that MUST survive untouched: Substack subscribe links (newsletter + waitlist), Calendly (coaching), open PDF downloads, client-side quiz, all JSON-LD, sitemap/robots/404.

## What the mockup asks for (analysis)
- Atmosphere: light/airy lavender + blush + ivory + paper; watercolor washes; soft morning-light photography blended into backgrounds (CSS mask gradients over HER real photos); botanical lavender line/watercolor illustrations; thin gold thread + sparse sparkle accents; generous whitespace.
- Typography: literary display serif (Cormorant Garamond: authentic to her old site) + script accent face for single emotional lines + letterspaced small caps for eyebrows/CTAs/credentials.
- Shapes: ARCH (doorway) card motif (rounded-top cards) for the five doorways; arch-framed portrait; soft wavy section dividers with a gold thread line.
- Homepage emotional sequence: arrival (hero) → recognition (headline + supporting line) → orientation (five doorway cards) → understanding (framework diagram: THE REAL five steps Witness/Understand/Interrupt/Create/Sustain as connected nodes on a gold thread; NOT the mockup's invented labels) → trust (Hi, I'm Carrie: arch portrait + Registered nurse. Trauma recovery coach. Writer. Survivor. + real bio line + Read my story) → exploration (Explore the latest: one real essay + one real resource + the prologue + the Sunday Letter as editorial cards) → invitation (Sunday Letter band with working Substack embed).
- Header per mockup: stacked brand (CARRIE DAVIDSON / RN · AUTHOR · TRAUMA RECOVERY COACH) + same 6-item nav + "The Sunday Letter" pill as header CTA (replaces "Work with me"; Calendly CTA remains prominent on coaching pages and homepage doors).

## Reusable as-is (restyle via tokens only)
Header/footer structure, nav toggle JS, .container/.section rhythm, grid systems, cards (gain arch variant), buttons (recolor + letterspaced label option), breadcrumbs, FAQ accordions, quiz flow, resource detail layout, footer crisis/disclaimer blocks, all JSON-LD.

## Needs redesign (visual only, content preserved)
- Token palette swap to Carrie's supplied values: --background-main #FBF7FC, --background-soft-lavender #F4ECF8, --background-blush #FAF1F3, --background-ivory #FFFDF8, --background-paper #F8F2EB, --background-mist #EEE8F4; text/accent derived from mockup with AA verification: deep plum ink (~#3A2A4D), mid lavender accent (~#7B5EA7 buttons/links, darkened until AA), soft lavender fills, gold thread (~#B8912E decorative only; AA-checked darker gold for small text), script accent color lavender.
- Homepage recomposed per emotional sequence (real copy: existing H1 stays as the two-layer rule's search headline OR mockup order: signature lines as headline with search-language kept in title/meta: DECISION: mockup headline IS her signature line: use "You are not broken. You are patterned." + script line "And patterns can change." (canon wording, NOT the mockup's "can be changed"); move the current search-language H1 into the supporting paragraph/SEO title to preserve rankings intent).
- Hero photography: Me_Laughing or Me_Fence with CSS mask-image fade; lavender sprig SVGs.
- Five doorway cards: arch-top, watercolor tint fills, gold line icons (exist from start-here), letterspaced CTAs; homepage + /start-here share the component.
- Method diagram: five connected nodes on a winding gold path (SVG), real step names + one-line descriptions from method.html.
- Wavy dividers: SVG section separators (aria-hidden, no layout shift).
- Explore-the-latest: 4 editorial cards using real items (latest essay, Emotional Flashback guide does NOT exist: use a real resource e.g. Befriending Your Nervous System; From the memoir: the prologue excerpt anchor; Sunday Letter card).
- Newsletter band: Substack embed iframe (https://carriepdavidson.substack.com/embed) = a WORKING inline email capture, styled container; link fallback beneath for no-iframe contexts.
- Botanical assets: hand-drawn-style SVG lavender sprigs + gold florals (2-3 reusable, sparingly placed, aria-hidden).
- All interior pages: inherit new tokens/typography/dividers automatically; heroes get soft wash backgrounds; arch portrait on about.

## Accessibility watchpoints for the new palette
Light lavender backgrounds compress contrast: every text token must be re-verified (target: ink on all six backgrounds ≥7:1; accent-on-light ≥4.5:1 for text/links; gold NEVER small text unless the dark #7A5C10-class variant passes; script face only for decorative lines ≥1.5rem with AA). Focus states must survive recolor. prefers-reduced-motion continues to gate any new transitions.

## Mobile watchpoints
Arch cards stack single-column; hero photo mask switches to bottom-fade under text; framework diagram becomes vertical thread; header brand stack must not collide with toggle; Substack iframe max-width 100%.

## Performance watchpoints
2 Google Fonts max (Cormorant Garamond + one script), preconnect + font-display: swap, subsets; SVG decorations inline or cached files (no PNG textures); hero photos already compressed; no animation libraries (CSS only); iframe lazy-loaded (loading="lazy").

## Integrations preserved (verified list)
Substack subscribe links + new embed, Calendly links, 8 PDF downloads, quiz JS, sitemap/robots/404, schema, llms.txt. No content rewrites; no em-dashes; signature lines verbatim; nothing fabricated (mockup's invented framework labels, bio text, article titles, and model photography are explicitly NOT copied).

NOTE for Phase 5.5 agent: final cover subtitle reads 'A story of CPTSD, Addiction, and the Patterns that almost killed me' (not 'A Memoir of...'). Update Book JSON-LD alternateName and any subtitle text to match the printed cover.
