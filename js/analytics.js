/* analytics.js: privacy-light measurement (GA4).
   This file NO-OPS entirely until GA_MEASUREMENT_ID is set below.
   Principles, matching the rest of this site:
   - No PII. No form values. No quiz answers or scores. Ever.
   - Events record that an action happened, never its content.
   - The quiz page's promise ("your answers never leave the page") holds:
     we only note that a visitor reached their results screen. */
(function () {
  "use strict";

  /* GA4 Measurement ID for carriepdavidson.com (stream: carriepdavidson.com). */
  var GA_MEASUREMENT_ID = "G-0E8DLJF1H3";

  if (!GA_MEASUREMENT_ID) return;

  /* Load gtag.js */
  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_MEASUREMENT_ID;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID, { anonymize_ip: true });

  function track(name, params) {
    try { gtag("event", name, params || {}); } catch (e) { /* never break the page */ }
  }

  var page = window.location.pathname;

  /* Clicks: book-a-call CTAs, workbook downloads, Calendly links. */
  document.addEventListener("click", function (e) {
    var a = e.target.closest ? e.target.closest("a") : null;
    if (!a) return;
    var href = a.getAttribute("href") || "";
    if (href.indexOf("discovery-call") !== -1) {
      track("cta_book_call_clicked", {
        page_path: page,
        cta_text: (a.textContent || "").trim().slice(0, 60)
      });
    } else if (/\.pdf($|\?)/i.test(href)) {
      track("workbook_downloaded", {
        file: href.split("/").pop(),
        page_path: page
      });
    } else if (href.indexOf("calendly.com") !== -1) {
      track("calendly_opened", { page_path: page });
    }
  }, true);

  /* Form submits: newsletter/waitlist (MailerLite) and call/contact
     requests (Web3Forms). Only the fact of submission is recorded. */
  document.addEventListener("submit", function (e) {
    var f = e.target;
    if (!f || !f.getAttribute) return;
    var action = (f.getAttribute("action") || "").toLowerCase();
    if (action.indexOf("mailerlite") !== -1) {
      track(page.indexOf("/book") === 0
        ? "preorder_waitlist_joined"
        : "sunday_letter_signup", { page_path: page });
    } else if (action.indexOf("web3forms") !== -1) {
      track(page.indexOf("/discovery-call") === 0
        ? "discovery_call_requested"
        : "contact_form_submitted", { page_path: page });
    }
  }, true);

  /* Quiz completion: fires once when the results screen is revealed.
     No answers, no scores, no profile — just "someone finished". */
  var result = document.getElementById("screen-result");
  if (result && "MutationObserver" in window) {
    var mo = new MutationObserver(function () {
      if (!result.hidden) {
        track("quiz_completed", { page_path: page });
        mo.disconnect();
      }
    });
    mo.observe(result, { attributes: true, attributeFilter: ["hidden"] });
  }
})();
