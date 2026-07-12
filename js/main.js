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
