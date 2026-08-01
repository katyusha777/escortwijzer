# Content calendar

Pipeline per CONTENT.md §11. Launch inventory (§8): **complete as of 2026-08-01** — 21 NL +
20 EN articles across all five pillars, every §8 brief in `briefs/`. What follows is the
post-launch cadence: 2–4 pieces/month, every piece through the §9 edit gate.

## Next up (priority order)

1. **Redlights.nl review** (platforms, nl/en) — Bible #15. Verified active NL/BE
   classifieds platform with a "geverifieerde advertenties" filter; named by sekswerk.info.
2. **Boys4u.nl review** (platforms, nl/en) — Bible #16. The male-sex-work platform;
   widens the comparison set beyond the hetero big three. Site is Cloudflare-gated:
   research via sekswerk.info + third parties, mark observations "at time of review".
3. **DE locale launch batch** — translationKey-complete German rewrites (du-form, border
   traffic framing per §5): start with is-escort-legal, escort-prices, spot-fakes,
   best-escort-sites, escort-amsterdam, amsterdam-tourist, faq-hub, glossary. Add 'de' to
   `LOCALES` in src/lib/site.ts (pairing check then enforces completeness).
4. **Screenshots pass** (Bible §8 #10–12: "real screenshots each") — capture
   intimate.nl directly; kinky/sexjobs need a real browser session (bot walls). Add
   `<figure>` images with descriptive alt to the three reviews + ranking.
5. **Seasonal: ADE piece** (cities/guides, en/nl) — Amsterdam Dance Event demand queries
   (mid-October; publish September).
6. **Eindhoven city guide** (nl/en) — the municipal table already carries its
   Baekelandplein research; spin out the guide.
7. **Groningen city guide** (nl/en) — same, incl. the mandatory intake interview quirk.
8. **Seasonal: F1 Zandvoort + Koningsdag** briefs (en/de-leaning) — event-demand queries.

## Blocked on Intimate deploys

- **Stats-page citation swap-in**: intimate.nl/{locale}/stats/ 404s as of 2026-08-01 (page
  exists in the intimate repo but is not deployed). Once live: cite its per-city numbers in
  `escort-prijzen`/`escort-prices-netherlands` (the caveat paragraph already anticipates
  this), the city guides' pricing sections, and wire the §11 monthly pricing refresh to it.
  This is the data-citation loop — do it the week the page ships.

## Refresh schedule (§11 — every refresh gets a `changelog:` entry)

- **Monthly**: pricing pair (once the stats feed exists; until then quarterly sanity pass).
- **Quarterly**: ranking + all platform reviews (re-score, re-screenshot, update "Last
  reviewed"), municipal table re-check (leges change every January — the Jan pass is
  mandatory: all CVDR sources are pinned in briefs/regels-per-gemeente.md).
- **On news, within days**: Wgts bill submission (18→21 plan announced 13 May 2026 — first
  mover on the updated answer wins the citations), Den Haag windows decision (dossier with
  the post-March-2026 coalition), Utrecht Paardenveld realisation (clarity expected after
  summer 2026), Amsterdam small-scale-locations exploration.
