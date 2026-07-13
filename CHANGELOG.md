# Changelog: authority upgrade program
*All changes verified by checks/site-check.sh before commit. Live at carriepdavidson.com.*

## Phase 1: Audit + foundations (2026-07-12, commit 295ac96)
- Added SITE-AUDIT.md, IMPLEMENTATION-PLAN.md, CONTENT-ROADMAP.md (32 concepts, 12 existing essays mapped to clusters), LEAD-MAGNET-ROADMAP.md (8 concepts), ANALYTICS-PLAN.md (Plausible recommended; requires Carrie's account).
- Added checks/site-check.sh (static-site test suite: em-dash ban, H1 uniqueness, titles, descriptions, canonicals, link + asset integrity, JSON-LD parsing, alt attributes, token leftovers, sitemap resolution).
- P0 fixes: dead newsletter forms on 3 pages replaced with working Substack links; broken memoir-cover and healing-circle images replaced with branded placeholders; live placeholder praise blurbs removed from /book (TODO for real quotes); og:image + Twitter card + favicon set added to all pages; Person/Organization sameAs corrected to real profiles (bare goodreads removed until her page exists); CSS comment hygiene.
- New brand assets: og-default.jpg (1200x630 share card), favicon.svg, apple-touch-icon.png, placeholder memoir cover, healing-circle art (SVG sources kept in assets/).

## Phase 2: Homepage, navigation, Start Here (2026-07-12)
- New /start-here: five keyboard-accessible doorway cards (patterns, CPTSD, recovery, practice, her story) with inline line icons, one CTA each, scope-safe recovery language, Sunday Letter fallback.
- Navigation simplified on all 10 pages: Start Here / Writing / Resources / The Memoir / Coaching / About + Work with me. Home, The Method, FAQ removed from primary nav (Method + FAQ remain in footer Explore; brand mark links home).
- Homepage hero: credential eyebrow (Registered Nurse, Author, Trauma Recovery Coach); ONE dominant CTA (Start here) + quiet ghost secondary (Read her story); H1, signature lede, body, and trust pills unchanged. Three-doors section retitled "Where do you want to begin?" and demoted to secondary actions linking /start-here.
- CSS: new commented Phase 2 section only (.path-card system, .btn min-height 44px). robots.txt added.
- QA note: headless-Edge screenshots on this machine clip below ~500px window width (verified with a control page); mobile layout verified by CSS inspection (no fixed widths; only .table-compare exceeds 375px and it sits inside .table-wrap overflow-x). Real-device check recommended.

## Phase 3: Publication architecture (2026-07-12)
- Three topic hubs (guide format, breadcrumbs + BreadcrumbList): /writing/nervous-system (3 essays), /writing/adhd (2), /writing/trauma-patterns (4, merged with cptsd cluster). Clusters below the 2-essay threshold got no page (no empty indexable hubs).
- writing.html gains a Browse-by-topic section; essays and Sunday Letter CTA untouched.
- templates/article.html: full editorial article template (noindexed, TODO-marked) with Article + BreadcrumbList schema, TOC, author box, clinical-vs-lived perspective pattern, related-content endcap.
- Dead-end audit: method/book/coaching/about already end in a single primary next step; no changes needed.
- CSS: additive PHASE 3 block only (.breadcrumb, .topic-links, hub + article components).

## Phase 4: Resource architecture, sitemap, quiz pathways (2026-07-13)
- 8 resource detail pages under /resources/ (what it is, who it may help, format + size, open direct download, related hub, inline scope disclaimer, breadcrumbs + schema). No email gates; page counts stated only where verifiable.
- resources.html library regrouped by need (Grounding and Regulation; Understanding Patterns; ADHD and Executive Functioning; Reflection and Creativity); card titles link to detail pages with direct-download links preserved; companion workbook cross-linked, not duplicated.
- sitemap.xml (21 clean URLs), branded 404.html (noindex, calm voice, four doors), robots.txt already pointing at sitemap.
- Quiz result screens gain a per-type "read next" pathway (fight/flight to nervous-system hub; freeze/fawn to trauma-patterns hub); language stays non-diagnostic.
- CSS: additive PHASE 4 block only.

## Phase 5: Authority pages (2026-07-13)
- Reusable credibility strip (.cred-strip) on about, coaching, book, media.
- About restructured: In brief facts, current work links, coaching philosophy + scope/ethics block; her story prose preserved byte-for-byte; media section as TODO placeholder.
- Book: waitlist benefit line under hero CTA; author cred-strip. Coaching: cred-strip + FAQ link near apply CTA.
- media.html: complete noindexed template, unlinked, every unverifiable fact behind TODO(CARRIE) comments.

## Phase 5.4: BrandStory messaging alignment (2026-07-13)
- Offers renamed sitewide: The ARC Program (12-week flagship, Phase 1 Breaking the Loop / Phase 2 Building Forward) and The Conscious Creation Circle (graduates' group); The Healing Circle kept distinct as the community.
- Method steps canonical everywhere: Witness / Understand / Interrupt / Find Creative Flow / Build the Intentional Life, with ARC stage labels and the "Creativity is the opposite of stuck" premise.
- About aligned to official Bio 1: Duke BSPH+BSN, both-sides-of-the-chart, verified story specifics, LGBTQ+ affirming statement, alumniOf schema.
- Official taglines placed (home, coaching, memoir, writing). Science claim verified as real but youth-population; published as "emerging research" without figures + citation TODO.
- Banned-word sweep: one violation fixed ("trauma-informed"); "insight-rich and transformation-poor" exempt as her coined phrase.
- Real memoir cover replaced the placeholder (committed separately).

## Phase 5.5: Immersive visual redesign (2026-07-13)
- Design system transformed to the ImmersiveExample mockup: Carrie's lavender/blush/ivory/paper tokens (all contrast pairs computed, AA/AAA), Cormorant Garamond + DM Sans, arch doorway cards, copper wave dividers, botanical lavender SVGs, photo-fade hero masking, method thread diagram, editorial cards, working Substack embed, stacked brand header with Sunday Letter pill, deep-plum footer.
- Homepage recomposed to the emotional sequence (arrival, recognition, orientation, understanding, trust, exploration, invitation) with all-real copy and the search-language layer preserved. Reveal animation hardened with a visibility failsafe.
- Skin propagated to all 23 interior pages with restrained per-page treatments (arch portraits, session photo on coaching, tinted memoir sections, script-line prologue signature). All 9 brand SVGs recolored; og-image and touch icon re-rendered.
- BrandStory compliance: governance docs (BRAND-CONTENT-MAP, RESEARCH-VERIFICATION, EDITORIAL-BRAND-ROADMAP, content/brand.json), /for-nurses page, method boundaries section, about editorial headings with the approved opening line, kicker "Interrupt the pattern", persona names and pricing kept out of the public repo.

## Phase 6: Final QA (2026-07-13)
Full-site mechanical, accessibility, performance, and technical-SEO verification across all 24 indexable pages (root + 3 hubs + 8 resource detail pages). Fixes applied:
- Footer parity: added the missing "For Nurses & Caregivers" link to the footer Explore column on index.html and start-here.html (the only two pages that lacked it).
- Heading order: the "Start with this essay" featured pick on the three topic hubs was an `<h3>` following the page `<h1>` (an h1 to h3 skip) and its section's `aria-labelledby="start-title"` pointed at a non-existent id. Promoted to `<h2 id="start-title">` on all three hubs; extended the `.hub-featured` CSS selector so the visual weight is unchanged. Both the heading skip and the dangling aria reference are resolved.
- Share metadata: added og:image, og:image dimensions, and twitter:card to 404.html for consistent link previews (page stays noindex).
- Images: added width/height to the four decorative botanical SVGs (index x2, about, start-here) using their viewBox ratios; added loading="lazy" to the below-the-fold signup botanical on index. Every img now has src that resolves, alt, and explicit width+height.
- Meta descriptions trimmed under 160: index 294 to 160 (the long-standing SITE-AUDIT flag), method 181 to 154.
- llms.txt: added /start-here and /for-nurses to Core pages in the existing bullet format.
- checks/site-check.sh: PAGES glob now spans root + writing/*.html + resources/*.html; the internal-link and JSON-LD checks resolve subdirectory pages (per-page relative resolver); added an old-palette-hex check and a banned-words check (her coined "transformation-poor" exempt). All 12 checks pass.
Verified with no change required: 5 documented contrast pairs recomputed and confirmed (11.96, 7.02, 7.69, 5.95, 9.23), all JSON-LD parses, zero em-dashes, zero banned words, zero old-palette hex, all internal links resolve, sitemap symmetric (22 indexable pages in and out), noindex correct on media/404/article template, the single Substack iframe carries loading="lazy" + title, no render-blocking scripts (main.js is end-of-body), fonts load display=swap with only Cormorant Garamond + DM Sans, focus-visible + reduced-motion + reveal failsafe intact, per-page weights all under 500KB, no single image over 450KB.

## Phase 6.5: Brand-story fidelity review (2026-07-13)
Final editorial pass reading every indexable page (root, 3 writing hubs, 8 resource detail pages) plus the article template against docs/brand-story-canon.md, docs/brand-brief.md, and content/brand.json. A pruning-and-sharpening pass, not an adding pass. The 6-beat BrandStory spine is present and distributed (recognition on home/quiz/start-here; positioning on home-intro/coaching/book; personal story on about/book; method on method/coaching; invitation in every ending). Visitor stays the hero, Carrie the guide who has been there. Nursing appears as credential/trust, never spectacle, outside about/book (chart and floor references are 0 on home, coaching, method, resources). Endings all point forward (choice, creativity, home), never at trauma-analysis.
- Only real issue found: the assertion "creation is the central mechanism / not a side tool / not a decorative extra" repeated until numb. Pruned to keep the positioning strong while removing the dead repeats.
  - method.html, five-steps-at-a-glance Step 4: "Create your way through it: creation is the central mechanism, not a side tool. Build new, felt evidence that safety is possible." to "Create your way through it: build new, felt evidence that safety is possible." (the Creation-phase detail below already carries the full claim). Reason: the central-mechanism claim was stated in 4 separate sentences on one page.
  - method.html, "What it is" list: "A creative practice: creation as the mechanism, not a decorative extra." to "A creative practice: creation is where the change actually happens." Reason: removed a back-to-back repeat of "not a decorative extra" (Step 4 detail states it directly above) and varied the phrasing.
  - coaching.html, five-steps Step 4: "Create your way through it: creation is the central mechanism, not a side tool. Build new, felt evidence that safety is possible." to "Create your way through it: build new, felt evidence that safety is possible." Reason: the same section's intro paragraph already states "creation is the central mechanism here, not a side tool"; two identical claims within one section.
- Net vocabulary effect on touched pages: method.html creation-family word count 36 to 35, the central-mechanism assertion cut from 4 sentences to 2 (creativity remains explicitly central in the Creation-phase intro and Step 4 detail); coaching.html creation-family 22 to 21, assertion cut from 2 sentences to 1. loop and pattern counts left unchanged (load-bearing on the method page and distributed across FAQ's 18 self-contained answers).
- Left alone deliberately: the national coaching price range ($100 to $250 per session) on /coaching and /faq is public market context framed with the exact figure confirmed only on the first call, not her private pricing, and pricing-absence is a do-not-touch item; the twice-placed "loop is not a character flaw" signature on /method (verbatim canon signature, do-not-touch); the citation-caveat TODO HTML comments on /coaching and /method (consistent with the repo's TODO-comment workflow; the visible copy is already figure-free "emerging research"); about/book deep story and the approved About opening line (correct depth for their layer).
- No savior/guru drift, no gratuitous trauma detail outside about/book, no visible internal strategy (persona names, do/don't lists, agency info), no unverified figures. FAQ JSON-LD untouched (no FAQ answers edited). All 12 site-check.sh checks pass.

## Phase 6.5: Brand-story fidelity review + credential rule (2026-07-13)
- Distributed six-beat narrative spine verified across the site; all fourteen fidelity questions pass. Three repetition prunes ("central mechanism" over-assertion on method/coaching). Endings confirmed forward-aimed at choice, creativity, and life.
- Duke removed from all credentials per Carrie: visible text, credential cards, media template, brand.json, and alumniOf schema on both pages. Rule recorded in the brand canon: degrees public, institution never named.
