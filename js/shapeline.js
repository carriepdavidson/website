/* Pattern -> Pause -> Choice -> Creation: scroll-drawn signature section.
   Progressive enhancement: without JS (or with reduced motion) the SVG is
   fully drawn and every label is visible, so this file only ADDS motion.
   No libraries. One rAF-throttled scroll handler, no scroll hijacking. */
(function () {
  "use strict";

  var root = document.querySelector("[data-shapeline]");
  if (!root || !("getBoundingClientRect" in root)) return;

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* Segments drawn by scroll. data-seg="start,end" in 0..1 page progress. */
  var segs = [];
  var beats = []; /* words / dots / ghost lines that fade in at a threshold */

  function arm() {
    segs = [];
    beats = [];
    root.querySelectorAll("path[data-seg]").forEach(function (el) {
      var range = (el.getAttribute("data-seg") || "0,1").split(",");
      var len = el.getTotalLength();
      el.style.strokeDasharray = len + " " + len;
      el.style.strokeDashoffset = String(len);
      segs.push({ el: el, len: len, a: +range[0], b: +range[1] });
    });
    root.querySelectorAll("[data-at]").forEach(function (el) {
      beats.push({ el: el, at: +el.getAttribute("data-at") });
    });
    root.classList.add("is-armed");
  }

  function disarm() {
    segs.forEach(function (s) {
      s.el.style.strokeDasharray = "";
      s.el.style.strokeDashoffset = "";
    });
    beats.forEach(function (b) { b.el.classList.add("is-on"); });
    root.classList.remove("is-armed");
  }

  function clamp(n) { return n < 0 ? 0 : n > 1 ? 1 : n; }

  function paint() {
    var rect = root.getBoundingClientRect();
    var span = rect.height - window.innerHeight;
    if (span <= 0) {
      /* Section fits in the viewport: show the finished drawing but stay
         armed, so normal painting resumes if the section grows again. */
      segs.forEach(function (s) { s.el.style.strokeDashoffset = "0"; });
      beats.forEach(function (b) { b.el.classList.add("is-on"); });
      return;
    }
    var p = clamp(-rect.top / span);
    segs.forEach(function (s) {
      var sp = clamp((p - s.a) / (s.b - s.a));
      s.el.style.strokeDashoffset = String(s.len * (1 - sp));
    });
    beats.forEach(function (b) {
      b.el.classList.toggle("is-on", p >= b.at);
    });
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      ticking = false;
      paint();
    });
  }

  function start() {
    arm();
    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
  }

  function stop() {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    disarm();
  }

  if (!reduce.matches) start();
  if (reduce.addEventListener) {
    reduce.addEventListener("change", function (e) {
      if (e.matches) { stop(); } else { start(); }
    });
  }
})();
