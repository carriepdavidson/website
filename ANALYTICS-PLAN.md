# Analytics Plan: carriepdavidson.com

*Compiled 2026-07-12. For Carrie Davidson, BSPH, BSN, RN. A privacy-first measurement plan for a static site (GitHub Pages) serving a trauma-sensitive audience. No em-dashes. Guiding value: measure the funnel without ever tracking a person's healing, answers, or sensitive behavior.*

## Current reality

- **No analytics are installed.** There is no measurement of any kind on the site today.
- **Hosting:** GitHub Pages, static HTML/CSS/JS. No server, no backend, no database. Any analytics must be a client-side script or beacon.
- **Audience:** people arriving in trauma, often at 11pm, often in acute distress. Privacy is not a nice-to-have here. It is an ethical baseline and a trust signal. Over-tracking this audience would betray the brand's entire premise.
- **Off-site conversions:** the newsletter and book waitlist live on Substack; coaching booking is on Calendly; some products are on Kajabi. The most important conversions complete on domains we do not control, which shapes what is and is not measurable (see the honest proxy note under `newsletter_signup_clicked`).

---

## Recommendation: privacy-first analytics tool

### The three candidates

| Tool | Cost | Script weight | Cookies | GDPR / privacy posture | Custom events |
|---|---|---|---|---|---|
| **Plausible** | Paid, from ~$9/mo (10k pageviews); open-source, self-hostable | ~1 KB | Cookieless | GDPR/CCPA/PECR compliant, EU-hosted, no personal data collected, no consent banner required | Yes, first-class custom events + props (needed for our schema) |
| **Cloudflare Web Analytics** | Free | Light JS beacon | Cookieless | Privacy-first, no personal data, no cross-site tracking; usable on any host via the JS beacon (no need to proxy DNS through Cloudflare) | Limited. Automatic page metrics are strong; custom-event support is weak/immature compared to Plausible |
| **GoatCounter** | Free for non-commercial (donation-supported); open-source, self-hostable | ~3.5 KB | Cookieless | No personal data, GDPR-friendly, no consent banner needed | Basic custom "events," but ergonomics and reporting are thinner |

### Recommendation: Plausible

Recommend **Plausible**, with **Cloudflare Web Analytics as the zero-cost fallback** if budget is the deciding factor.

**Why Plausible:**
- This plan lives or dies on **custom events** (hero_cta_clicked, resource_downloaded, etc.). Plausible has the cleanest first-class custom-event and custom-property support of the three; Cloudflare's is weak and GoatCounter's is basic.
- Cookieless by default, so **no cookie-consent banner is required**, which keeps a distressed visitor's first experience calm and uncluttered. This matters more for this audience than for most.
- No personal data, no cross-site tracking, GDPR/CCPA/PECR aligned, EU-hosted. Strong posture for a YMYL, privacy-sensitive brand.
- ~1 KB script, so it does not slow the site or the 11pm visitor on a phone.
- Open-source and self-hostable if she ever wants full data ownership.

**Trade-off honestly stated:** Plausible costs roughly $9/month. If Carrie prefers zero cost, **Cloudflare Web Analytics** is the fallback: free, cookieless, privacy-first, works on GitHub Pages via the JS beacon. The cost is weaker custom-event support, meaning several events in the schema below would degrade to manual link-tag workarounds or simply not be trackable. GoatCounter is the free-and-open-source middle option but with thinner event ergonomics and reporting.

### This requires Carrie to create the account

**Action required by Carrie, not automatable from the repo:** she must create the Plausible (or Cloudflare) account herself, add `carriepdavidson.com` as a site/property, and obtain the site-specific script snippet. No analytics can be installed until that account exists and the snippet is in hand. Only then does a developer add the one script tag to the shared `<head>` and wire the events below. Nothing here should be installed silently.

---

## Event schema (define now, install after the account exists)

Naming: lowercase snake_case, verb-object. Keep the set small and legible. **Rule for every event: measure intent and navigation, never content of a person's responses.** No event below captures a quiz answer, a form field value, an email address, or any free-text a visitor writes.

### 1. `hero_cta_clicked`
- **Trigger:** click on the primary hero call-to-action button on any page's hero section.
- **Purpose:** which top-of-page promise pulls the most action; compare hero variants across pages.
- **Parameters:** `page` (path), `cta_label` (e.g. "get-the-free-workbook", "work-with-me").
- **Privacy:** button label and path only. No user identity.
- **Where implemented:** hero `.btn--primary` in each page's `<section class="hero">` (home, /resources, /writing, /coaching, etc.).

### 2. `start_path_selected`
- **Trigger:** click on one of the "doors" / start-path options (e.g. the read-story / fix-pattern / start-free doors, or the Resources "three free starters").
- **Purpose:** learn which visitor intent (read / fix / start free) is most common, to prioritize the primary pathway (fixes brand-brief weakness #3).
- **Parameters:** `path_choice` (e.g. "quiz", "worksheet", "sunday-letter", "coaching", "book").
- **Privacy:** the door chosen only.
- **Where implemented:** the `.door` cards on /resources and any homepage pathway section.

### 3. `quiz_started`
- **Trigger:** the visitor begins the 3-minute quiz (first question rendered or "start" clicked) on /quiz.
- **Purpose:** measure quiz funnel entry; compare against completions for drop-off.
- **Parameters:** `entry_point` (referring section/page, e.g. "resources-door", "article-f18").
- **Privacy:** entry point only. **Never** send any question or answer.
- **Where implemented:** /quiz start control in the quiz JS.

### 4. `quiz_completed`
- **Trigger:** the visitor reaches the quiz result screen.
- **Purpose:** completion rate; effectiveness of the quiz as an on-ramp.
- **Parameters:** `result_bucket` ONLY as a coarse, non-sensitive category IF product decides it is safe (e.g. "survival", "shutdown", "mixed"). Default: send no result at all and count completion only.
- **Privacy:** **Critical.** Do not transmit individual answers, ever. Sending even the coarse result bucket is optional and off by default; if enabled, it must be a non-identifying category, never a score tied to a session that could profile a person. When in doubt, count completion with no parameters.
- **Where implemented:** result-screen render in the quiz JS.

### 5. `newsletter_signup_clicked`
- **Trigger:** click on any "subscribe / get the Sunday Letter / join the book waitlist" control that hands off to Substack.
- **Purpose:** measure **intent** to subscribe (the click), since the actual signup completes on Substack.
- **Parameters:** `source` (e.g. "resources-cta", "writing-footer", "hero"), `intent` ("newsletter" or "book-waitlist").
- **Privacy:** source and intent only. No email (the email is entered on Substack, off our site and out of our analytics entirely).
- **Where implemented:** every link/button to `carriepdavidson.substack.com/subscribe` and the Resources signup form's submit.
- **HONEST PROXY NOTE (read this):** **Actual newsletter conversions are not directly measurable from this site.** Substack owns the signup completion on its own domain, and this cookieless setup does not (and should not) follow a person across domains. So this event measures **clicks/intent, a proxy, not confirmed subscriptions.** The true subscriber count lives in the Substack dashboard. Report the two numbers side by side and never present click-intent as confirmed signups. A rough conversion sanity-check = Substack's new-subscriber count for a period compared against total `newsletter_signup_clicked` for the same period; treat it as directional only.

### 6. `book_waitlist_clicked`
- **Trigger:** click on a book-waitlist call-to-action specifically on /book or book-related sections.
- **Purpose:** pre-launch demand signal for *Addicted to Trauma* (fixes brand-brief weakness #6: proving the waitlist path works before launch).
- **Parameters:** `source` (e.g. "book-page-hero", "essay-e1", "f19-cta").
- **Privacy:** source only. Same off-site proxy caveat as #5: this is intent, confirmed waitlist joins live in Substack.
- **Where implemented:** waitlist buttons on /book and book-thesis articles (F8, F19, L1, L6).

### 7. `resource_downloaded`
- **Trigger:** click on any free PDF/resource download link.
- **Purpose:** which resources actually get used, to prioritize the resource-led content and future lead magnets.
- **Parameters:** `resource` (per-resource slug: "trauma-tree-worksheet", "befriending-nervous-system", "adhd-affirmation-cards", "youre-not-broken-adhd-ebook", "conscious-creation-workbook", "small-leavings-workbook", "small-leavings-journal").
- **Privacy:** resource identity only. No user identity. (These are open downloads with no email wall; nothing personal exists to capture.)
- **Where implemented:** every `assets/*.pdf` download link in the Resources library and article companions.

### 8. `coaching_application_started`
- **Trigger:** click on the coaching booking / application control that hands off to Calendly (or the application form).
- **Purpose:** bottom-funnel intent; the highest-value action on the site.
- **Parameters:** `source` (e.g. "coaching-page", "f13-cta", "f15-cta").
- **Privacy:** source only. The booking/application itself completes on Calendly; do not capture applicant details here. Same off-site proxy caveat as #5.
- **Where implemented:** every link to `calendly.com/coaching-carriepdavidson` and any on-site coaching CTA.

### 9. `article_depth_milestone`
- **Trigger:** the reader scrolls past a depth threshold on a long article (fire once each at 50% and 90% of article body).
- **Purpose:** are the foundational articles actually being read, or bounced? Distinguishes real engagement from a quick exit.
- **Parameters:** `article` (slug), `milestone` ("50" or "90").
- **Privacy:** anonymous scroll depth only. No reading time tied to identity, no session profiling.
- **Where implemented:** a small scroll-observer in `js/main.js`, scoped to article/essay templates only.

### 10. `related_article_clicked`
- **Trigger:** click on an internal "related reading" / hub cross-link between articles.
- **Purpose:** measure whether the hub-and-cluster internal linking (Part 1 of the content roadmap) actually moves readers deeper.
- **Parameters:** `from_article` (slug), `to_article` (slug).
- **Privacy:** article slugs only. No identity, no journey stitching beyond the single click.
- **Where implemented:** related-links component at the foot of article/essay templates.

---

## Do-not-track list (explicit prohibitions)

These must never be collected, logged, or sent to any analytics tool, now or later. This list is a hard boundary, not a preference.

1. **Quiz answers or per-question responses.** Never. Not in any form, not "anonymized," not "aggregated at the answer level."
2. **Any individual quiz result tied to a session/person.** Coarse completion counts only; the optional result bucket is off by default and, if ever enabled, must be non-identifying.
3. **Email addresses or any form field values.** These are entered on Substack/Calendly and stay there.
4. **Free-text the visitor writes anywhere** (search boxes, notes, form fields).
5. **Cross-site / cross-domain identity stitching.** Do not follow a person from the site to Substack/Calendly/Kajabi and back. Off-site conversions stay measured as on-site *intent* only (see the proxy note).
6. **Cookies or persistent device/user identifiers.** Cookieless by design; do not add fingerprinting.
7. **Full IP addresses or precise geolocation.** The chosen tools do not store these; do not add anything that reintroduces them.
8. **Third-party ad/marketing pixels** (Meta, Google Ads, TikTok, etc.). None. They would break the privacy posture and the trust the brand is built on.
9. **Session recording / heatmap / mouse-movement tools** (Hotjar-style). None; they are far too invasive for a trauma audience.
10. **Anything on the crisis-resources section.** Do not instrument clicks on 988, Crisis Text Line, or SAMHSA links. A person reaching for a crisis line is never a metric.

---

## Rollout sequence

1. **Carrie creates the account** (Plausible recommended, Cloudflare Web Analytics as free fallback) and adds `carriepdavidson.com`. Required first step; nothing installs before this.
2. Add the single script snippet to the shared `<head>` used across pages.
3. Wire events 1, 5, 6, 7, 8 first (the funnel-intent core: CTAs, downloads, off-site handoffs).
4. Add events 2, 3, 4 (start-path and quiz funnel), honoring the quiz privacy rules.
5. Add events 9 and 10 (article depth and related-link) once the content roadmap articles ship.
6. **Document the proxy limitation in any report:** on-site intent numbers and Substack/Calendly confirmed-conversion numbers are two separate columns; never merge them into a single "conversions" figure.
