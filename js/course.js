/* course.js: interactive practices for Rooted & Rising course pages.
   Progressive enhancement only; every widget degrades to its written
   instructions. Respects prefers-reduced-motion. */

/* Breath pacer: in for four, out for six, five rounds. */
(function () {
  "use strict";
  var pacer = document.querySelector('[data-widget="pacer"]');
  if (!pacer) return;
  var circle = pacer.querySelector(".pacer__circle");
  var cue = pacer.querySelector(".pacer__cue");
  var btn = pacer.querySelector("[data-pacer-toggle]");
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var running = false, timers = [];

  function clearTimers() { timers.forEach(clearTimeout); timers = []; }
  function stop(message) {
    running = false; clearTimers();
    circle.classList.remove("is-in", "is-out");
    cue.textContent = message || "Press begin";
    btn.textContent = "Begin";
  }
  function round(n) {
    if (!running) return;
    if (n > 5) { stop("Settled is allowed. Notice how you feel."); return; }
    cue.textContent = "Breathe in... (round " + n + " of 5)";
    if (!reduced) { circle.classList.remove("is-out"); circle.classList.add("is-in"); }
    timers.push(setTimeout(function () {
      if (!running) return;
      cue.textContent = "...and out, long and slow";
      if (!reduced) { circle.classList.remove("is-in"); circle.classList.add("is-out"); }
      timers.push(setTimeout(function () { round(n + 1); }, 6000));
    }, 4000));
  }
  btn.addEventListener("click", function () {
    if (running) { stop(); return; }
    running = true; btn.textContent = "Stop";
    round(1);
  });
})();

/* State check-in: name it, get met with kindness. */
(function () {
  "use strict";
  var widget = document.querySelector('[data-widget="state"]');
  if (!widget) return;
  var response = widget.querySelector(".widget__response");
  var messages = {
    settled: "Beautiful. This is your creating state. Take a second to notice what it feels like, so your body learns the way back.",
    revved: "Thank you for the honesty. Nothing to fix. If you like, take three low breaths before you read on. The list can wait sixty seconds.",
    shutdown: "That is protection, not laziness. Be extra gentle with yourself today. Maybe orient: name five things you can see, and let your eyes rest on the kindest one."
  };
  widget.addEventListener("click", function (e) {
    var b = e.target.closest("[data-state]");
    if (!b) return;
    widget.querySelectorAll("[data-state]").forEach(function (x) { x.classList.remove("is-chosen"); });
    b.classList.add("is-chosen");
    response.textContent = messages[b.getAttribute("data-state")] || "";
  });
})();

/* Felt-values picker: choose up to five words that hum. Private to this
   browser (localStorage); nothing is sent anywhere. */
(function () {
  "use strict";
  var widget = document.querySelector('[data-widget="values"]');
  if (!widget) return;
  var out = widget.querySelector(".widget__response");
  var KEY = "rr-felt-values";
  var chosen = [];
  try { chosen = JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (e) {}

  function paint() {
    widget.querySelectorAll("[data-value]").forEach(function (chip) {
      chip.classList.toggle("is-chosen", chosen.indexOf(chip.getAttribute("data-value")) !== -1);
    });
    if (chosen.length) {
      out.textContent = "Your felt-values so far: " + chosen.join(", ") +
        (chosen.length >= 5 ? ". Five is plenty. Carry them into the Tuesday letter." : ".");
    } else {
      out.textContent = "";
    }
    try { localStorage.setItem(KEY, JSON.stringify(chosen)); } catch (e) {}
  }
  widget.addEventListener("click", function (e) {
    var chip = e.target.closest("[data-value]");
    if (!chip) return;
    var v = chip.getAttribute("data-value");
    var i = chosen.indexOf(v);
    if (i !== -1) { chosen.splice(i, 1); }
    else { if (chosen.length >= 5) { out.textContent = "Five is the container. Release one before choosing another."; return; } chosen.push(v); }
    paint();
  });
  paint();
})();

/* The journey line: draws itself when it enters view (Week 6). */
(function () {
  "use strict";
  var line = document.querySelector('[data-widget="journey-line"]');
  if (!line) return;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || !("IntersectionObserver" in window)) { line.classList.add("is-drawn"); return; }
  var io = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) { line.classList.add("is-drawing"); obs.unobserve(entry.target); }
    });
  }, { threshold: 0.4 });
  io.observe(line);
})();
