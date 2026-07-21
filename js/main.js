/* main.js: minimal, progressive-enhancement only.
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

/* Desktop "More" dropdown: hamburger holding the secondary nav pages. */
(function () {
  "use strict";
  var more = document.querySelector(".nav__more");
  if (!more) return;
  var moreToggle = more.querySelector(".nav__more-toggle");
  if (!moreToggle) return;

  function setOpen(open) {
    more.setAttribute("data-open", String(open));
    moreToggle.setAttribute("aria-expanded", String(open));
  }

  moreToggle.addEventListener("click", function () {
    setOpen(more.getAttribute("data-open") !== "true");
  });
  document.addEventListener("click", function (e) {
    if (!more.contains(e.target) && more.getAttribute("data-open") === "true") setOpen(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && more.getAttribute("data-open") === "true") setOpen(false);
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

/* Sticky credential line (VBI): reveal "BSPH, BSN, RN · Trauma Recovery
   Coach" under the name once the reader scrolls past the hero's edge. */
(function () {
  "use strict";
  var header = document.querySelector(".site-header");
  if (!header || !header.querySelector(".brand-stack__cred--scroll")) return;

  var update = function () {
    header.classList.toggle("is-scrolled", window.scrollY > 120);
  };
  window.addEventListener("scroll", update, { passive: true });
  update();
})();

/* Analytics loader: measurement lives in its own file and no-ops until a
   GA4 measurement ID is set there. Kept out of main.js so site behavior
   and measurement stay separate concerns. */
(function () {
  "use strict";
  var s = document.createElement("script");
  s.src = "/js/analytics.js";
  s.defer = true;
  document.head.appendChild(s);
})();

/* Announcement bar: show unless dismissed this session. Appended for
   the mockup restyle; does not touch existing behaviors above. */
(function () {
  "use strict";
  var bar = document.querySelector("[data-announce]");
  if (!bar) return;
  var KEY = "ccc-announce-dismissed";
  try { if (sessionStorage.getItem(KEY) === "1") return; } catch (e) {}
  window.setTimeout(function () { bar.hidden = false; }, 1200);
  var close = bar.querySelector("[data-announce-close]");
  if (!close) return;
  close.addEventListener("click", function () {
    bar.hidden = true;
    try { sessionStorage.setItem(KEY, "1"); } catch (e) {}
  });
})();
