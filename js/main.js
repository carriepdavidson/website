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

/* Sunday Letter signup (MailerLite): submits in place and confirms inline.
   Progressive enhancement: without JS the form still posts to MailerLite,
   which replies with a plain confirmation. Double opt-in is on, so the real
   confirmation always happens in the subscriber's inbox. */
(function () {
  "use strict";
  var forms = document.querySelectorAll("form[data-ml-form]");
  if (!forms.length) return;

  forms.forEach(function (form) {
    var status = form.querySelector(".signup__status");
    var button = form.querySelector('button[type="submit"]');

    function say(message) {
      if (status) status.textContent = message;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (button) button.disabled = true;
      say("Sending…");

      fetch(form.action, { method: "POST", body: new FormData(form) })
        .then(function (response) { return response.json(); })
        .then(function (data) {
          if (data && data.success) {
            form.querySelectorAll(".input, button").forEach(function (el) { el.hidden = true; });
            say("Almost in. Check your inbox for a confirmation email, click it, and the next letter finds you on Sunday.");
          } else {
            if (button) button.disabled = false;
            say("That did not go through. Please check the address and try again.");
          }
        })
        .catch(function () {
          if (button) button.disabled = false;
          say("Something interrupted the connection. Please try again in a moment.");
        });
    });
  });
})();
