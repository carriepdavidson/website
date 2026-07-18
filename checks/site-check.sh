#!/usr/bin/env bash
# site-check.sh: static-site test suite for carriepdavidson.com
# Run from repo root: bash checks/site-check.sh
# Exit code 0 = all checks pass.

cd "$(dirname "$0")/.." || exit 1
FAIL=0
note() { echo "  $1"; }
fail() { echo "✗ $1"; FAIL=1; }
pass() { echo "✓ $1"; }

# Pages under the gate: root + topic hubs + resource detail pages.
# (templates/ is intentionally excluded: noindex, TODO-marked scaffolding.)
PAGES=$(ls *.html writing/*.html resources/*.html 2>/dev/null)

# 1. Em-dash ban (visible files)
if grep -l '&mdash;\|—' $PAGES llms.txt 2>/dev/null | grep -q .; then
  fail "em-dashes found:"; grep -c '&mdash;\|—' $PAGES llms.txt | grep -v ':0'
else pass "no em-dashes site-wide"; fi

# 2. Exactly one H1 per page
H1OK=1
for f in $PAGES; do
  n=$(grep -c '<h1' "$f")
  [ "$n" -ne 1 ] && { fail "$f has $n <h1> elements"; H1OK=0; }
done
[ "$H1OK" -eq 1 ] && pass "one <h1> per page"

# 3. Unique <title> per page
DUP=$(for f in $PAGES; do grep -h -o '<title>[^<]*</title>' "$f"; done | sort | uniq -d)
if [ -n "$DUP" ]; then fail "duplicate titles: $DUP"; else pass "unique titles"; fi

# 4. Meta description present per page
DESCOK=1
for f in $PAGES; do
  grep -q 'name="description"' "$f" || { fail "$f missing meta description"; DESCOK=0; }
done
[ "$DESCOK" -eq 1 ] && pass "meta descriptions present"

# 5. Canonical present and extensionless
CANOK=1
for f in $PAGES; do
  grep -q 'rel="canonical"' "$f" || { fail "$f missing canonical"; CANOK=0; }
  grep -q 'rel="canonical" href="[^"]*\.html"' "$f" && { fail "$f canonical uses .html extension"; CANOK=0; }
done
[ "$CANOK" -eq 1 ] && pass "canonicals present and clean"

# 6. Internal links + assets resolve (root-relative and per-page relative).
LINKOK=1
for f in $PAGES; do
  d=$(dirname "$f")
  for l in $(grep -hoE '(href|src)="[^"]*"' "$f" | sed -E 's/^(href|src)="//; s/"$//' | sort -u); do
    case "$l" in
      http*|mailto:*|tel:*|\#*|data:*|"") continue ;;
    esac
    p="${l%%#*}"; p="${p%%\?*}"
    [ -z "$p" ] && continue
    [ "$p" = "/" ] && continue
    if [ "${p#/}" != "$p" ]; then
      { [ -f ".$p" ] || [ -f ".$p.html" ]; } || { fail "$f: broken internal link $l"; LINKOK=0; }
    else
      { [ -f "$d/$p" ] || [ -f "$d/$p.html" ]; } || { fail "$f: broken internal link $l"; LINKOK=0; }
    fi
  done
done
[ "$LINKOK" -eq 1 ] && pass "internal links + assets resolve"

# 7. JSON-LD parses (via PowerShell ConvertFrom-Json)
if command -v powershell.exe >/dev/null 2>&1; then
  BROKEN=$(powershell.exe -NoProfile -Command "\$files=Get-ChildItem *.html, writing\*.html, resources\*.html; \$bad=0; foreach(\$f in \$files){ \$raw=Get-Content \$f.FullName -Raw; \$m=[regex]::Matches(\$raw,'(?s)<script type=\"application/ld\+json\">(.*?)</script>'); foreach(\$x in \$m){ try{ \$null=\$x.Groups[1].Value|ConvertFrom-Json }catch{ Write-Output \"\$(\$f.Name)\"; \$bad=1 } } }" 2>/dev/null)
  if [ -n "$BROKEN" ]; then fail "JSON-LD broken in: $BROKEN"; else pass "all JSON-LD blocks parse"; fi
else note "(skipped JSON-LD parse: powershell unavailable)"
fi

# 8. Alt attribute on every img
ALTOK=1
for f in $PAGES; do
  imgs=$(grep -o '<img [^>]*>' "$f" | grep -vc 'alt=')
  [ "$imgs" -gt 0 ] && { fail "$f has $imgs <img> without alt"; ALTOK=0; }
done
[ "$ALTOK" -eq 1 ] && pass "all images have alt attributes"

# 9. No literal placeholder tokens
if grep -l '{{[A-Z_]*}}' $PAGES llms.txt 2>/dev/null | grep -q .; then
  fail "unresolved {{TOKENS}} present"
else pass "no unresolved tokens"; fi

# 10. Sitemap references only existing pages (if sitemap exists)
if [ -f sitemap.xml ]; then
  SMOK=1
  for u in $(grep -o '<loc>[^<]*</loc>' sitemap.xml | sed 's|</\?loc>||g; s|https://carriepdavidson.com/||; s|/$||'); do
    if [ -z "$u" ]; then continue; fi
    [ -f "$u.html" ] || { fail "sitemap references missing page: $u"; SMOK=0; }
  done
  [ "$SMOK" -eq 1 ] && pass "sitemap entries resolve"
else note "(sitemap.xml not present yet)"
fi

# 11. No leftover old-palette hex in any html/css/svg
OLDHEX='#4B2D73|#7A5C10|#1C4A44|#9A4632|#F4EEE4'
if grep -rniE "$OLDHEX" $PAGES css/*.css assets/*.svg 2>/dev/null | grep -q .; then
  fail "old-palette hex found:"; grep -rniE "$OLDHEX" $PAGES css/*.css assets/*.svg
else pass "no old-palette hex (html/css/svg)"; fi

# 12. Banned words (brand voice) in SITE COPY. Exemptions: her coined
#     phrase "transformation-poor"; and the native article pages under
#     writing/ (except the 3 hub pages), which reproduce Carrie's authored
#     essays verbatim and are not subject to the marketing-voice rule.
HUBS="writing/adhd.html writing/nervous-system.html writing/trauma-patterns.html"
BANNED=0
for f in $PAGES; do
  case "$f" in writing/*) case " $HUBS " in *" $f "*) ;; *) continue;; esac;; course/*) continue;; esac
  m=$(grep -niE "journey|empower|transformation|holistic|thrive|trauma-informed" "$f" | grep -viE "transformation-poor|conscious creation journey|claims to be trauma-informed")
  [ -n "$m" ] && { fail "banned word in $f:"; echo "$m"; BANNED=1; }
done
[ "$BANNED" -eq 0 ] && pass "no banned words (transformation-poor, Conscious Creation Journey + article/course pages exempt)"

echo
if [ "$FAIL" -eq 0 ]; then echo "ALL CHECKS PASSED"; else echo "CHECKS FAILED"; fi
exit $FAIL
