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
