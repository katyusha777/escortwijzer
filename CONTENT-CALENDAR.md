# Content calendar

Pipeline per CONTENT.md §11. Launch inventory (§8): **complete as of 2026-08-01** — 21 NL +
20 EN articles across all five pillars, every §8 brief in `briefs/`. What follows is the
post-launch cadence: 2–4 pieces/month, every piece through the §9 edit gate.

## Done since launch plan (2026-08-01, same day)

- ✅ Redlights.nl + Boys4u.nl reviews (Bible #15–16) — scored 6.1 / 5.7
- ✅ International-directory reviews: Tryst 6.7, EuroGirlsEscort 5.4, EscortNews 4.6,
  EscortHub 2.6 — all fetch/browser-researched with operator identification
- ✅ Landscape sweep: 19 verified active sites + rejects — the database lives in
  `briefs/alle-escortsites-nederland.md`; mega-hub pair + verified-sites roundup published
- ✅ Ranking expanded 3 → 9 platforms with changelog entry

## Next up (priority order)

1. **DE locale launch batch** — translationKey-complete German rewrites (du-form, border
   traffic framing per §5): start with is-escort-legal, escort-prices, spot-fakes,
   best-escort-sites, escort-amsterdam, amsterdam-tourist, faq-hub, glossary. Add 'de' to
   `LOCALES` in src/lib/site.ts (pairing check then enforces completeness).
2. **Screenshots pass** (Bible §8 #10–12: "real screenshots each") — capture
   intimate.nl directly; kinky/sexjobs/boys4u need a real browser session (bot walls). Add
   `<figure>` images with descriptive alt to reviews + ranking.
3. **Hunqz review** (platforms, nl/en) — gay-market international leader, run from
   Amsterdam (Romeo); widens niche coverage. EscortDirectory as a follow-up candidate.
4. **Seasonal: ADE piece** (cities/guides, en/nl) — Amsterdam Dance Event demand queries
   (mid-October; publish September).
5. **Eindhoven city guide** (nl/en) — the municipal table already carries its
   Baekelandplein research; spin out the guide.
6. **Groningen city guide** (nl/en) — same, incl. the mandatory intake interview quirk.
7. **Topescort.nl watch** — the ABRvS 21-01-2026 ruling (ECLI:NL:RVS:2026:351) makes it a
   news-reaction candidate if enforcement resumes; possible review later.
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
