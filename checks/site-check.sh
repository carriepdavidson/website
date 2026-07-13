#!/usr/bin/env bash
# site-check.sh: static-site test suite for carriepdavidson.com
# Run from repo root: bash checks/site-check.sh
# Exit code 0 = all checks pass.

cd "$(dirname "$0")/.." || exit 1
FAIL=0
note() { echo "  $1"; }
fail() { echo "✗ $1"; FAIL=1; }
pass() { echo "✓ $1"; }

PAGES=$(ls *.html)

# 1. Em-dash ban (visible files)
if grep -l '&mdash;\|—' *.html llms.txt 2>/dev/null | grep -q .; then
  fail "em-dashes found:"; grep -c '&mdash;\|—' *.html llms.txt | grep -v ':0'
else pass "no em-dashes site-wide"; fi

# 2. Exactly one H1 per page
H1OK=1
for f in $PAGES; do
  n=$(grep -c '<h1' "$f")
  [ "$n" -ne 1 ] && { fail "$f has $n <h1> elements"; H1OK=0; }
done
[ "$H1OK" -eq 1 ] && pass "one <h1> per page"

# 3. Unique <title> per page
DUP=$(grep -h -o '<title>[^<]*</title>' *.html | sort | uniq -d)
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
done
grep -l 'rel="canonical" href="[^"]*\.html"' *.html 2>/dev/null | grep -q . && { fail "canonical uses .html extension"; CANOK=0; }
[ "$CANOK" -eq 1 ] && pass "canonicals present and clean"

# 6. Internal links resolve (clean URLs -> files; asset paths -> files)
LINKOK=1
for l in $(grep -ho 'href="/[a-z-]*"' *.html | sed 's|href="/||; s|"||' | sort -u); do
  [ -z "$l" ] && continue
  [ -f "$l.html" ] || { fail "internal link /$l has no $l.html"; LINKOK=0; }
done
for l in $(grep -ho 'href="assets/[^"]*"\|src="assets/[^"]*"' *.html | sed -E 's/(href|src)="//; s/"//' | sort -u); do
  [ -f "$l" ] || { fail "asset missing: $l"; LINKOK=0; }
done
[ "$LINKOK" -eq 1 ] && pass "internal links + assets resolve"

# 7. JSON-LD parses (via PowerShell ConvertFrom-Json)
if command -v powershell.exe >/dev/null 2>&1; then
  BROKEN=$(powershell.exe -NoProfile -Command "\$files=Get-ChildItem *.html; \$bad=0; foreach(\$f in \$files){ \$raw=Get-Content \$f.FullName -Raw; \$m=[regex]::Matches(\$raw,'(?s)<script type=\"application/ld\+json\">(.*?)</script>'); foreach(\$x in \$m){ try{ \$null=\$x.Groups[1].Value|ConvertFrom-Json }catch{ Write-Output \"\$(\$f.Name)\"; \$bad=1 } } }" 2>/dev/null)
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
if grep -l '{{[A-Z_]*}}' *.html llms.txt 2>/dev/null | grep -q .; then
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

echo
if [ "$FAIL" -eq 0 ]; then echo "ALL CHECKS PASSED"; else echo "CHECKS FAILED"; fi
exit $FAIL
