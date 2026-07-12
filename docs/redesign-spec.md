# carriepdavidson.com — Redesign Spec
*Synthesized 2026-07-12 from brand-brief.md + research-seo.md + research-aeo.md. Build agents: read all three docs before writing a line.*

## Goal
One coherent brand surface under **carriepdavidson.com** that (a) converts the two priority visitors — *therapy veterans shopping for help* and *future book readers* — (b) ranks for the search language customers actually use, and (c) is structured so AI answer engines cite Carrie as THE entity for trauma-addiction recovery coaching.

## Tech
- Static site in this repo: semantic HTML5 pages + one shared `css/style.css` + minimal vanilla JS. No frameworks, no build step (hostable on GitHub Pages/Netlify; easy to edit).
- Kajabi handles commerce/community — CTAs link out to Kajabi checkout/forms (use placeholder hrefs `{{KAJABI_*}}` where the real URL isn't known).
- Mobile-first responsive. Lighthouse-friendly: system font stack or one hosted font, no heavy JS.

## Site Architecture (7 pages, v1)
| Page | File | Primary keyword target (H1 layer) | Poetic payoff layer |
|---|---|---|---|
| Home | `index.html` | why can't I break my patterns / nervous system regulation | "You are not broken. You are patterned." |
| Book | `book.html` | Addicted to Trauma — memoir about trauma and addiction | "The same wound, telling itself in two different languages." |
| Coaching | `coaching.html` | trauma recovery coach (vs therapist) | "Finally feel at home in your body." |
| Method | `method.html` | the Conscious Creation Method / how to break trauma patterns | "The loop runs faster than thought." |
| About | `about.html` | Carrie Davidson RN trauma recovery coach | "The nurse who became her own patient." |
| Resources | `resources.html` | free trauma recovery workbook/worksheets | "Start where you are." |
| FAQ | `faq.html` | trauma coach questions (10+ Q&A units) | — |

## Two-Layer Copy Rule (core SEO/voice bridge)
Every page: **literal, symptom-first search language** in `<title>`, meta description, H1, and first 40–60 words (AI extracts these) → **Carrie's poetic signature voice** immediately beneath as the emotional payoff. Never sacrifice one for the other. Signature lines in brand-brief.md are canon — use verbatim.

## Conversion Pathways (fixes "too many doors")
Primary CTA per visitor intent, consistent everywhere:
1. **"Fix the pattern"** → Coaching application (book a call)
2. **"Read the story"** → Book waitlist
3. **"Start free"** → Trauma Tree Worksheet + quiz → The Sunday Letter
Homepage presents exactly these three doors, in this order. Every page ends with one primary CTA + newsletter fallback.

## AEO Requirements (from research-aeo.md)
- JSON-LD on every page: `Person` (Carrie, `hasCredential`: RN, BSN, BSPH; sameAs → Instagram, Substack, Goodreads placeholder), `Book` on book.html (ISBN placeholder, comps), `FAQPage` on faq.html, `Service` on coaching.html, `Organization` (Conscious Coaching Collective PLLC) in footer scope.
- **No MedicalWebPage schema** — she's a coach, not a clinician.
- Answer-first structure: each H2 phrased as the question users ask; first 40–60 words after it are a direct standalone answer.
- Scope disclaimer in footer, in her voice: coaching is not therapy or medical treatment (builds YMYL trust).
- FAQ page: ≥10 Q&A units from research-seo.md question list (coach vs therapist, cost, "can you heal trauma without therapy", "why do I keep repeating patterns", etc.).
- book.html richer than Amazon: themes, comps (*What My Bones Know*, *In the Realm of Hungry Ghosts*, *The Body Keeps the Score*, *High Achiever*), prologue excerpt block, waitlist CTA.
- Minimal `llms.txt` at root (30-min version, don't over-invest).
- Crisis-resources block in footer (present on current site — keep; it's both ethical and a trust signal).

## SEO Requirements (from research-seo.md)
- Target clusters per page as in table above; long-tail blog comes in v2 (leave `writing.html` stub or nav link to Substack for now).
- Differentiators to press on every page: (1) trauma+addiction unified thesis, (2) RN + lived experience, (3) the named 5-step Method, (4) creative/Conscious Creation layer.
- Do NOT chase generic "high-achieving women trauma" head terms (Annie Wright owns them) — win addiction-overlap and book long-tails.
- Semantic HTML: one H1/page, descriptive alt text, internal links between book ↔ method ↔ coaching (they cross-sell).

## Design Direction
- Mood: warm clinical-calm. Feels like an exhale, not a sales page. Think: linen, dusk, warm neutrals + one deep accent (e.g., deep teal or oxblood) — NOT pastel-wellness clichés, NOT corporate medical blue.
- Generous whitespace, large readable serif for headlines (literary, book-adjacent), humanist sans for body.
- Typography does the emotional work; imagery minimal (CSS/SVG textures fine, placeholder `<img>` slots where photos of Carrie belong, with descriptive alts).
- Accessible: WCAG AA contrast, focus states, reduced-motion respect.
- Light + dark not required; single warm light theme is fine for v1.

## Voice Guardrails (Phase 4 will refine copy further)
Copy in v1 should be strong but flagged sections (`<!-- COPY-PASS -->` comment) mark hero/offer copy that goes through the Sonnet-draft → Fable-eval loop afterward. Never: hype, scarcity theater, toxic positivity, shame-based urgency. Always: companionship, clinical grounding, agency.
