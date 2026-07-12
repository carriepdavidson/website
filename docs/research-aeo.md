# AEO Research — carriepdavidson.com

*Compiled 2026-07-12. Answer Engine Optimization (AEO) / Generative Engine Optimization (GEO) research for Carrie Davidson — RN + certified trauma recovery coach, memoir *Addicted to Trauma* (Summer 2026). Goal: get cited/recommended by ChatGPT, Claude, Perplexity, Google AI Overviews, and Gemini when her target customer (high-achieving women, therapy veterans stuck in trauma loops) asks for help.*

> **What AEO actually is:** When someone asks an AI assistant a question, the model retrieves a handful of source pages, extracts specific facts/quotes, rewrites them in natural language, and attributes claims to the sources it trusts. AEO is the practice of making Carrie's site one of those trusted, extractable sources. It is not a ranking trick — it is being the clearest, most credible, most-corroborated answer to the exact questions her customers type.

---

## A. AEO Principles Ranked by Impact for Her Site

Ranked for a *small health/wellness coaching + author site* — not enterprise. This ordering reflects effort-to-payoff for her specific situation (YMYL topic, personal brand, pre-launch book).

### 1. Off-site corroboration / multi-source authority — HIGHEST impact, hardest to fake
Brands are **~6.5x more likely to be cited via third-party sources than their own domain**, and for mental-health queries AI draws from a specific outlet set (Psychology Today, Verywell Mind, Choosing Therapy, NAMI, BetterHelp editorial). For a *coach*, "earning credible third-party mentions is the single most powerful AEO move" — podcast guesting, expert commentary, guest essays, being quoted for her niche. AI wants to see the same person/claim echoed across independent sources ("multi-source consensus"). Her RN + lived-experience angle is unusually quotable — pitch it.
- Sources: [Frase AEO Guide](https://www.frase.io/blog/what-is-answer-engine-optimization-the-complete-guide-to-getting-cited-by-ai), [InstantPress AEO for Coaches](https://www.instantpress.co/blog/aeo-for-coaches), [5W Mental Health AI Visibility Index](https://www.5wpr.com/research/mental-health-ai-visibility-index/)

### 2. E-E-A-T / clinical-credibility signals (YMYL gate) — near-mandatory for her topic
Trauma/addiction is **YMYL ("Your Money or Your Life")**. AI systems apply higher scrutiny and *disproportionately cite domains with named clinical authors, credentials, and disclosure standards*. "A healthcare site that lacks verifiable expertise signals, clear author credentials, and cited information will not be cited in AI Overviews regardless of SEO." Her **RN (BSPH, BSN) is a genuine competitive moat** vs. the many uncredentialed trauma coaches — it must be surfaced everywhere (see Section D). Notably, **Claude weights clinical authority more heavily than other engines** — her credential advantage plays especially well there.
- Sources: [MedElite Healthcare AI Overviews](https://www.medelite.agency/post/google-ai-overviews-healthcare-seo), [upGrowth YMYL Playbook](https://upgrowth.in/ymyl-playbook-healthcare-brands-win-ai-search-trust/), [5W Index](https://www.5wpr.com/research/mental-health-ai-visibility-index/)

### 3. Content structured for extraction (answer-first + Q&A) — highest DIY payoff
AI looks for a **direct answer in the first 40–60 words after a header**. Pages built as question-headers + immediate answers + FAQ blocks get pulled far more often. One FAQ page with 10 entries = **10 independently citable units**. This is the single most controllable, cheapest win she owns outright.
- Sources: [Stackmatix Question-Based Headers](https://www.stackmatix.com/blog/question-based-headers-aeo), [HubSpot AEO Page Structure](https://blog.hubspot.com/marketing/aeo-page-structure), [AI Advantage FAQ Pages for AEO](https://aiadvantageagency.com/faq-pages-for-aeo/)

### 4. Schema.org structured data — moderate effort, real lift
Valid structured data → pages appear **20–30% more often in AI summaries**; FAQPage schema showed a **41% citation rate vs. 15% without** in one 50-site study. Establishes entity identity so AI knows *who* she is and *what* her book is. See Section B for exact types.
- Sources: [AI Labs Audit Schema Guide](https://ailabsaudit.com/blog/en/schema-markup-ai-visibility-guide), [Averi Schema for AI Citations](https://www.averi.ai/blog/schema-markup-for-ai-citations-the-technical-implementation-guide)

### 5. Entity building — Wikidata, consistent naming, sameAs — compounding, slow
A named expert with consistent cross-platform presence and external identifiers is "significantly more likely to be cited." **Wikidata is the strongest single entity signal** (one `sameAs` to Wikidata "does more than five social links combined") and its notability bar is *low enough that she likely qualifies now*. This also fixes her fragmented-naming problem (brand brief weakness #1) — pick ONE canonical name and repeat it everywhere.
- Sources: [SchemaValidator Entity SEO](https://schemavalidator.org/guides/entity-seo-schema-markup), [LSEO Wikidata/Knowledge Panels](https://lseo.com/answer-engine-optimization-services/the-aeo-role-of-wikidata-knowledge-panels-and-entity-ids/)

### 6. Freshness signals — low effort
For evaluation-stage queries, **83% of AI citations came from pages updated within 12 months** (60%+ within 6 months). Add visible "Last updated" dates and refresh cornerstone pages.
- Sources: [Frase AEO Guide](https://www.frase.io/blog/what-is-answer-engine-optimization-the-complete-guide-to-getting-cited-by-ai), [We Are Grizzly Small Business AEO](https://www.wearegrizzly.com/blog/aeo-for-small-businesses-how-to-get-cited-by-ai-search-in-2026/)

### 7. llms.txt — LOWEST priority (do it, but don't expect citations from it)
Honest verdict from 2026 data: **an Ahrefs study found 97% of llms.txt files got zero traffic**, and major AI answer bots barely touch the file. Treat it as a cheap, 30-minute "forward-compatibility" nicety and a site-index for AI-assisted tools — **not** a citation driver. Do not spend real time here. See Section B for a minimal version.
- Sources: [Limy llms.txt 2026](https://limy.ai/blog/llms.txt-in-2026-the-full-guide), [Codersera llms.txt Guide](https://codersera.com/blog/llms-txt-complete-guide-2026/), [Webyes / John Mueller](https://www.webyes.com/blogs/does-llms-txt-improve-rankings/)

---

## B. Concrete Technical Checklist

### Schema types to implement (JSON-LD, in `<head>` or before `</body>`)

**Rule that overrides everything: content parity.** Every schema value must be visible on the rendered page. Google flags invisible schema data as spam. Don't mark up claims the page doesn't actually show.

| Priority | Schema type | Where | Key properties |
|---|---|---|---|
| 1 | **Person** (Carrie) | Homepage + About/bio page | `name`, `jobTitle` ("Registered Nurse; Trauma Recovery Coach"), `hasCredential` (RN, BSN, BSPH, trauma-recovery-coach cert), `knowsAbout` (["complex trauma","CPTSD","addiction recovery","nervous system regulation"]), `worksFor` (Conscious Coaching Collective PLLC), `alumniOf`, `author` (→ the book), `sameAs` (all her profiles + Wikidata) |
| 2 | **Organization** | Homepage/footer sitewide | `name` (Conscious Coaching Collective, PLLC — ONE canonical name), `founder` (→ Person), `email`, `sameAs`, `logo` |
| 3 | **Book** | Dedicated book page | `name` ("Addicted to Trauma"), `author` (→ Person), `isbn` (assign/reserve pre-launch — the primary ID AI uses to disambiguate books), `datePublished`, `publisher`, `bookFormat`, `genre`, `about`, `description`, `workExample`/`Edition` |
| 4 | **FAQPage** | On any page with genuine Q&A (coaching page, coach-vs-therapy page) | Each `Question` → `acceptedAnswer`; make each question a real H3 on the page |
| 5 | **Service** | Coaching offer pages | `serviceType`, `provider` (→ Person/Org), `areaServed`, `audience`, `offers` (name price/duration — fixes brand-brief weakness #2) |
| 6 | **Article / BlogPosting** | Every blog essay | `author` (→ Person, NOT just a string), `datePublished`, `dateModified`, `headline` |

**Deliberately AVOID `MedicalWebPage` / medical-specialty schema.** She is a *coach, not a licensed clinician providing treatment.* MedicalWebPage implies medical authorship/treatment claims and invites the strictest YMYL medical scrutiny (which expects licensed-physician review). Use `Person` + `hasCredential` (RN) to earn credibility, and keep the framing "trauma recovery coaching / education," not "medical treatment." This is the honest and safer positioning — matches her actual scope of practice.

**Credential markup pattern** (the part most coaches miss):
```
"hasCredential": [{
  "@type": "EducationalOccupationalCredential",
  "credentialCategory": "degree",
  "name": "Bachelor of Science in Nursing (BSN), Registered Nurse (RN)"
}]
```

### Page structure rules (apply to every important page)
- **Answer-first:** first 40–60 words after each header directly answer the header's question. No throat-clearing wind-up.
- **Headers as questions** for explanatory/definitional content ("What is a trauma recovery coach?", "Trauma coach vs. therapist — what's the difference?"); declarative headers for action sections.
- **One self-contained Q&A per H3** — each answer must stand alone (AI extracts single units, never the whole page).
- **Add hard specifics:** pages with concrete data points see 30–40% higher AI visibility. Name durations, session counts, prices, cited stats — don't stay abstract (fixes brand-brief weaknesses #2, #4, #5).
- **Visible "Last updated" date** on cornerstone pages.
- **Link claims to primary sources** (research, studies) — AI trusts pages that cite their own sources.

### Minimal llms.txt (30 min, then forget it)
Place at `/llms.txt`. A markdown file: H1 site name, one-line description, then curated links (About/credentials, Book page, each coaching service, cornerstone FAQ/essays) with one-line descriptions each. Low cost; do not over-invest.

### Housekeeping that also matters
- **Consolidate to one domain/brand name.** Three surfaces + three names (carriepdavidson.com vs. "Warm Embrace" lovable.app vs. Kajabi subdomain) actively dilutes the entity. AI can't build a confident entity from fragmented, inconsistently-named surfaces. Canonical everything under carriepdavidson.com.
- Ensure content is server-rendered / crawlable (not JS-only) so AI bots can read it.
- Allow AI crawler user-agents in robots.txt (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) if she wants citations.

---

## C. Content Patterns That Get AI Citations in Health/Wellness

**The winning shape for her niche:** a definitional/comparison page that opens with a crisp direct definition, is authored by a named credentialed person, cites primary sources, and carries a trust-building disclaimer.

**High-value pages to build** (these mirror the exact queries her customers ask, and the competing pages that currently win are uncredentialed coaching sites — her RN gives her an edge):
1. **"What is a trauma recovery coach?"** — direct 2-sentence definition first. (Current AI answers pull from certifiedtraumarecoverycoaching.com and small coaching blogs — beatable.)
2. **"Trauma recovery coach vs. therapist — what's the difference?"** — this is a *heavily* asked comparison. AI currently synthesizes a medical-model vs. support-model / past vs. present-future / diagnosis vs. no-diagnosis framing. Publish a clean comparison table + FAQ; be scrupulously accurate about scope (coaches don't diagnose/treat) — accuracy here IS the credibility.
3. **"How do you break a trauma pattern / loop?"** — her signature territory. AI's current answer leans on "you can't think your way out," nervous-system regulation, safety-not-speed. Her verbatim voice ("You do not have to think your way out. You have to feel your way home." / "You are not broken. You are patterned.") is *more* quotable than the generic clinical blogs — lean into distinctive, quotable lines. Quotable phrasing gets extracted.
4. **"Books about trauma and addiction"** — see Section E; positions the memoir alongside *In the Realm of Hungry Ghosts*, *The Body Keeps the Score*, *Drinking: A Love Story*, *High Achiever*.
5. **"Why does therapy not fully work for trauma / insight but no change?"** — targets "insight-rich and transformation-poor," her exact customer frustration. Low competition, high resonance.

**Format tactics that earn citations (health/wellness specifically):**
- Named clinical author byline on every piece (AI over-indexes on this for YMYL).
- Step-by-step / checklist formats and specific examples get cited for practical value.
- Cite research and link to primary sources (vet-reviewed / peer-reviewed signals lift non-commercial citation share — visible in Claude especially).
- Statistics with a source — but bridge each stat to *how her method addresses it* (fixes brand-brief weakness #4).
- FAQ block on every cornerstone page.

Sources: [WSI Structure for Answer Engines](https://www.wsiworld.com/blog/how-to-structure-content-for-ai-answer-engines-a-geo-and-aeo-guide), [AI Advantage FAQ for AEO](https://aiadvantageagency.com/faq-pages-for-aeo/), [5W Mental Health AI Index](https://www.5wpr.com/research/mental-health-ai-visibility-index/), [ContentWriters YMYL Tips](https://contentwriters.com/blog/google-your-money-your-life-content-tips-ymyl-niches/)

---

## D. Surfacing RN + Lived-Experience as E-E-A-T Signals

Her positioning — **"The Nurse Who Became Her Own Patient"** — is an E-E-A-T goldmine: it hits **Experience** (lived trauma/addiction recovery) AND **Expertise** (RN clinical training) simultaneously. Most trauma coaches have only one. Make both machine-readable and human-obvious.

**Experience (the "extra E" AI now weighs heavily):**
- First-person lived-recovery narrative on the About/book pages — genuine first-hand experience is a distinct, cited signal for YMYL.
- The memoir itself is proof-of-experience; cross-link it as evidence.

**Expertise / Authoritativeness / Trust — concrete moves:**
- **Named author byline + credentials on every page and post** ("Carrie Davidson, BSPH, BSN, RN"). Not a generic "admin" author. This is the #1 YMYL citation differentiator.
- **Dedicated bio/About page** stating credentials, licensing body, certification (trauma recovery coach cert), years of experience, and *scope* — with `Person` + `hasCredential` + `knowsAbout` schema mirroring it.
- **`sameAs` everywhere** linking her profiles to build one entity: LinkedIn, Instagram, Goodreads author page, Amazon Author Central, publisher page, Wikidata. Consistency of name/title across all of these is what lets AI merge them into one confident entity.
- **Trust-building disclaimer that helps rather than hurts:** a clear, calm line — *"Coaching is not therapy, diagnosis, or medical treatment, and is not a substitute for care from a licensed mental-health professional."* Counterintuitively this **increases** trust and citation-worthiness on YMYL topics (transparency signal), and it accurately scopes her practice. Frame it as companionship-alongside-care, not a liability wall — consistent with her voice. (Note: AI systems themselves have *reduced* their own disclaimers, which makes credentialed human sources that DO disclose more valuable, not less.)
- **Disclosure/editorial standards note** (who wrote it, how it's reviewed, when updated) on cornerstone pages.

Sources: [RankVed YMYL Checklist](https://rankved.com/ymyl-compliance-checklist-healthcare/), [AI Rank Lab Author Authority](https://www.airanklab.com/blog/how-to-build-author-authority-ai-search-eeat-strategies), [Paperbell Coaching Disclaimers](https://paperbell.com/blog/coaching-disclaimer-template/), [Co-Active Coaching Disclaimer](https://coactive.com/blog/coaching-disclaimer/), [Schema.org Person](https://schema.org/Person)

---

## E. Book-Specific Entity Strategy (Pre-Launch)

**Book discovery is one of the top "ask the AI" use cases** — people constantly ask AI "what's a good book about X." AI learns books from metadata, sales pages, and **Goodreads reviews/lists (critical — its schema.org metadata is bot-friendly and it feeds AI directly)**, plus "cultural relevance" and *associations* to similar books.

**Pre-launch checklist (starting now, ~11 months out):**
1. **Own the canonical book page on carriepdavidson.com** — the single most important asset for training AI about the book. Make it *richer than Amazon will be*: full description, themes/tropes (e.g., "trauma-addiction overlap," "high-achieving woman," "nurse memoir," "CPTSD recovery"), publication year, publisher, ISBN, comps, an excerpt, and `Book` schema. Tropes/themes matter because that's how AI matches "books about X."
2. **Reserve/assign the ISBN early** — it's the primary identifier AI uses to disambiguate the book entity; put it in schema and metadata.
3. **Goodreads author + book profile** — claim Goodreads Author Program, list the book, seed the metadata, gather early reviews/ARC reviews. This is a high-weight AI source for books.
4. **Amazon Author Central + a complete pre-order/detail page** with keyword-rich, theme-rich description.
5. **Author entity = book entity.** Link `Person.author → Book` and `Book.author → Person` bidirectionally in schema so AI builds a coherent author-book knowledge graph.
6. **Wikidata entries** — create a Wikidata item for Carrie (occupation, affiliation, works) and, once the ISBN/publisher exist, for the book (work + edition model). Notability bar is low; each claim needs a source (publisher page + ISBN qualifies). This meaningfully raises Knowledge-Panel and citation probability, and it's free.
7. **Build "cultural relevance" by association** — publish the "books about trauma and addiction" content (Section C) that places *Addicted to Trauma* in the same set as *In the Realm of Hungry Ghosts*, *The Body Keeps the Score*, *High Achiever*, *Strung Out*. Being mentioned alongside established comps is how a new title gets pulled into recommendations.
8. **Pre-launch conversion bridge** (fixes brand-brief weakness #6): since the book is months out, the AEO-visible pages should route book-curious visitors to the waitlist / Sunday Letter / free workbook — so AI-driven discovery converts *now*, not only at launch.

Sources: [Author Media — Does ChatGPT Recommend Your Book](https://www.authormedia.com/does-chatgpt-recommend-your-book/), [WritePublishSell AEO for Authors](https://writepublishsell.com/aeo-for-authors/), [SchemaValidator Book Schema](https://schemavalidator.org/guides/book-schema-markup), [Wikidata WikiProject Books](https://www.wikidata.org/wiki/Wikidata:WikiProject_Books), [The Bookseller — SEO to AEO](https://www.thebookseller.com/comment/from-seo-to-aeo)

---

## Quick-Start Sequence (what to actually do first)

1. **Consolidate brand/name/domain** — one surface, one canonical name. (Foundational; blocks entity-building until fixed.)
2. **Person + Organization + Book schema** with credentials; consistent `sameAs`. (1 week)
3. **Rewrite/build the 5 cornerstone pages** answer-first with FAQ blocks + named credentialed byline + disclaimer. (weeks 2–6)
4. **Claim Goodreads + Amazon Author Central; build the rich book page; reserve ISBN.** (weeks 2–6)
5. **Create Wikidata items** for Carrie and the book. (week 4+)
6. **Start the off-site corroboration engine** — pitch 1–2 podcasts/guest essays per month on the nurse-who-became-her-own-patient / trauma-addiction-same-wound angle. (ongoing — highest long-run payoff)
7. **llms.txt + last-updated dates.** (afternoon; low priority)

*Expect first movement in AI citations in ~4–8 weeks after schema+content ship; meaningful gains in 6–12 months as off-site corroboration accumulates.*
