/* Pre-order link config: ONE place to set the Empire URL.
   When it arrives, set PREORDER_URL below; every <a data-preorder>
   on the site updates automatically. Until then those links go to
   their placeholder href (the memoir page). */
window.PREORDER_URL = "";

document.addEventListener("DOMContentLoaded", function () {
  if (!window.PREORDER_URL) return;
  document.querySelectorAll("a[data-preorder]").forEach(function (a) {
    a.href = window.PREORDER_URL;
    a.setAttribute("rel", "noopener");
    a.setAttribute("target", "_blank");
  });
});
