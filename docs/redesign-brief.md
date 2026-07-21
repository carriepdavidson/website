# Redesign Brief — carriepdavidson.com
*Consolidates: designer mockups (docs/mockups/*.jpeg) + friend's feedback (July 2026) + audit constraints. When sources conflict, this file wins.*

## Non-negotiables (do not change or break)
- Page URLs, `<title>` tags, meta descriptions, og:titles, JSON-LD (SEO pass just completed)
- llms.txt
- Crisis-resources block + scope disclaimer in every footer
- `js/analytics.js` + its loader in `main.js` (GA4 live: G-0E8DLJF1H3)
- The photoreal mirror section (`.gold-mirror` + `mirror.js`) — Carrie loves it; keep on the homepage
- Coach-vs-therapist table on /coaching
- Facts override mockup text everywhere: book releases **August 8, 2026** (mockups say "Fall 2025" — wrong); ARC = Awareness, Regulation, **Creation** (one mockup card says "Choice" — wrong; choice language belongs in body copy)

## LAYOUT SYSTEM — three page types (Carrie's structure; build these first, then apply)
Every page on the site uses exactly one of these three templates. Shared across all types: header/nav, announcement bar, footer (with crisis block + disclaimer), newsletter band.

**Type A — Home (index.html only)**
Full-bleed hero with photo + credential badge → alternating cream/lavender content bands → signature interactive sections (mirror, ARC flow, shapeline animation) → offers ("Three ways to begin") → memoir band → newsletter band → final CTA.

**Type B — General Subpage** (about, coaching, arc-program, method, book, for-nurses, faq, contact, discovery-call, media, and the blog-post template in /writing)
Consistent page hero: eyebrow + serif H1 + short intro, optional photo with dark gradient overlay for legibility → content sections in alternating bands → FAQ block near the bottom where the page has one → plum full-width CTA band ("Healing is possible." style) → footer.

**Type C — Resources & Events** (resources, writing listing, quiz, gathering, workshop, subscribe)
Page hero (same as Type B but shorter) → card grid: white cards with circular line-icon badges or cover images (per mockup 3's card style), each card = icon/cover + title + one-liner + single CTA → newsletter band → footer.

Rule: if a change is needed on one page of a type, make it in the shared pattern so every page of that type stays identical. No page gets a bespoke layout.

## HIGH PRIORITY

### Navigation (all pages, keep identical across site)
- No "Home" link — logo/name goes home
- Structure: **My Story** [dropdown: About, The Memoir] · **Coaching** [dropdown: Work with Me, The LIVE Workshop, Monthly Gathering] · **Resources** · **Blog** · **Contact** · **Book a Call** (plum pill, right)
- Resources stays top-level (it's the primary content CTA), not buried under Coaching
- Hamburger on MOBILE ONLY. The desktop "more" hamburger is what reads as broken — remove it; everything fits with dropdowns
- Add the CD logo mark upper-left next to the name; name ~20% smaller; letterspaced per mockup 1

### Homepage hero (mockup 1 + feedback)
- H1 "You are not broken. You are patterned." larger; hero goes full page width
- Flip the sub-copy to lead with the question: "**Are you done surviving the same story, and ready to build a different one?** Trauma recovery coaching through nervous system regulation and deliberate creation."
- Primary hero CTA = **Explore Resources →** (lavender button, leaf icon). Book a Call lives in the header only — don't duplicate it in the hero
- Credentials as a badge block, bottom-right of the hero near the brick wall, three stacked lines: BSPH, BSN, RN / CERTIFIED TRAUMA RECOVERY COACH / AUTHOR OF ADDICTED TO TRAUMA (style per mockup 1's white card)
- Pre-order announcement bar (plum, per mockup 1, date Aug 8 2026): appears after ~10 seconds on page, dismissible, remembers dismissal for the session

## MEDIUM PRIORITY

### Mirror section (homepage §2)
- Keep the mirror and reveal interaction exactly as built
- Optional copy refresh for the surrounding text (Carrie to approve wording before it ships):
  "You have done the work. So why does the same pattern keep returning? You can predict your triggers... you are not broken, you are patterned. Insight can help you understand the pattern, but understanding alone does not always interrupt it. Lasting change requires a new experience in the body."
- FUTURE idea (do not build yet): words appearing across the glass like steam

### ARC section (homepage §3, per mockup 3 + feedback)
- New header: **"Healing happens in an ARC."**
- Replace arch cards with a left-to-right process treatment (chevron/arrow flow): Awareness → Regulation → Creation
- "How the Method works →" link directly under the ARC flow
- Replace the ARC/Pattern-Pause-Choice-Creation explainer with:
  "The ARC method helps you move from automatic reactions to intentional choices. Awareness reveals the pattern. Regulation creates enough space to pause. In that pause, you can choose a different response. Over time, those choices become the intentional life."

### Shapeline animation (homepage §4)
- Trigger the draw earlier: it currently starts too late in the scroll — begin when the section is ~25-30% into the viewport (adjust the is-visible threshold / rootMargin). Verify on mobile.

### Quote section (homepage §5)
- Make it a proper attributed pull-quote from Carrie; darken the photo (gradient overlay) so text pops

### Method page
- Add the trauma-loop infographic (docs/mockups/redesign-2) as a real asset

## ABOUT PAGE (mockup 4 + feedback)
- Same nav as everywhere else (consistency was called out)
- Hero: lifestyle image (prefer a "walking away" shot from /assets if one exists), darker gradient overlay for text legibility
- Move the "about Carrie" content UP — "The nurse who became her own patient." is the hero, not section 3
- "Why I do this work" split section, four-values row (I see the whole picture / I honor the body / I believe in choice / I walk with you), plum "Healing is possible." CTA band per mockup 4

## Process
- Use existing photos in /assets; never reference images that don't exist
- One page at a time: homepage → about → propagate nav/header everywhere
- Screenshot desktop AND mobile after each page; compare against mockups
- Commit per page; push when homepage + about match
