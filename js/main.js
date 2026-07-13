/* main.js — minimal, progressive-enhancement only.
   Mobile nav toggle. Site works without JS (nav is visible on desktop;
   on mobile the menu simply defaults to hidden and this reveals it). */
(function () {
  "use strict";
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("primary-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", function () {
    var open = nav.getAttribute("data-open") === "true";
    nav.setAttribute("data-open", String(!open));
    toggle.setAttribute("aria-expanded", String(!open));
  });

  // Close the menu when a link is chosen (mobile).
  nav.addEventListener("click", function (e) {
    if (e.target.closest("a") && nav.getAttribute("data-open") === "true") {
      nav.setAttribute("data-open", "false");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
})();

/* Reveal-on-scroll: gentle fade-rise for sections (progressive enhancement).
   Marks <html> with .js so CSS can hide .reveal elements only when JS runs;
   without JS or without IntersectionObserver, everything stays visible. */
(function () {
  "use strict";
  var root = document.documentElement;
  root.classList.add("js");

  var items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  function showAll() {
    for (var i = 0; i < items.length; i++) items[i].classList.add("is-visible");
  }

  if (!("IntersectionObserver" in window)) { showAll(); return; }

  var io = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

  items.forEach(function (el) { io.observe(el); });

  /* Safety net: content must never stay hidden. If the observer is slow,
     throttled, or silently broken, reveal everything shortly after load. */
  var failsafe = function () { showAll(); };
  if (document.readyState === "complete") {
    setTimeout(failsafe, 1500);
  } else {
    window.addEventListener("load", function () { setTimeout(failsafe, 1500); });
  }
})();
