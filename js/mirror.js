/* The mirror reveals the pattern. A single line already exists beneath
   the glass; moving the pointer softly uncovers it (SVG mask painted
   with soft dots). The visitor reveals, never draws. After enough of
   the glass has been explored, the whole line quietly surfaces.
   Touch devices, reduced motion, and no-JS all see the line revealed:
   no meaning is gated behind the interaction. */
(function () {
  "use strict";

  var glass = document.querySelector("[data-mirror]");
  if (!glass) return;
  var svg = glass.querySelector("svg.mirror-line");
  if (!svg) return;
  var paint = svg.querySelector("[data-paint]");

  function seen() { glass.classList.add("is-seen"); }

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  var coarse = window.matchMedia("(pointer: coarse)");
  if (reduce.matches || coarse.matches) { seen(); return; }
  if (reduce.addEventListener) {
    reduce.addEventListener("change", function (e) { if (e.matches) seen(); });
  }

  var NS = "http://www.w3.org/2000/svg";
  var count = 0;
  var lx = -999, ly = -999;

  glass.addEventListener("pointermove", function (e) {
    if (count > 320) return; /* plenty revealed; stop adding nodes */
    var r = glass.getBoundingClientRect();
    if (!r.width || !r.height) return;
    var x = (e.clientX - r.left) / r.width * 300;
    var y = (e.clientY - r.top) / r.height * 410;
    var dx = x - lx, dy = y - ly;
    if (dx * dx + dy * dy < 130) return; /* space the dots out */
    lx = x; ly = y;
    var c = document.createElementNS(NS, "circle");
    c.setAttribute("cx", x.toFixed(1));
    c.setAttribute("cy", y.toFixed(1));
    c.setAttribute("r", "38");
    c.setAttribute("fill", "url(#mirrorDot)");
    paint.appendChild(c);
    count++;
    if (count === 56) seen(); /* recognition: the whole line surfaces */
  }, { passive: true });
})();
