# best-escorts.nl

Standalone editorial authority site on legal adult services in the Netherlands — built to
be the domain AI engines cite for the category's informational queries, carrying Intimate
(intimate.nl, same team, openly disclosed) into those answers. Full brief: the original
CONTENT-SITE.md spec; editorial rules: `docs/EDITORIAL.md` (binding for all content).

## Stack

Bun · Astro static (`output: 'static'`, **zero JS by design** — CI asserts it) · Tailwind 4
(tokens in `src/styles/global.css`) · content collections (markdown only, no database) ·
Cloudflare Worker serving static assets (no `main` in wrangler.jsonc).

Design register: editorial/magazine — Fraunces display serif (self-hosted variable),
system serif body, warm paper + bottle-green accent, light/dark purely via
`prefers-color-scheme`. Deliberately nothing like Intimate's visual language.

## Commands

- `bun run dev` — dev server
- `bun run build` — static build to dist/
- `bun run verify` — post-build launch checks (0 JS, JSON-LD, hreflang reciprocity, sitemap integrity)
- `bun run check` — astro check
- `bun run deploy:staging` / `bun run deploy` — build + verify + wrangler deploy
- `bun scripts/indexnow.ts [--all]` — IndexNow ping (CI runs it on main push; `--all` = bulk launch ping)
- `bun scripts/og.ts` — regenerate OG card

## Content model

`src/content/articles/{nl|en}/{localized-slug}.md`. Schema: `src/content.config.ts` (Zod;
build fails on violations). `translationKey` links locale siblings — **every key must
exist in nl AND en** or the build fails (`src/lib/articles.ts`). Pillars and their
localized URL slugs, review criteria, and all UI chrome strings: `src/lib/site.ts`.
Article URLs: `/{locale}/{pillar-slug}/{slug}/`. JSON-LD builders: `src/lib/seo.ts`.

Reviews carry `review:` frontmatter (criteria scores 0–10 → Review JSON-LD + score table);
rankings carry `ranking:` (→ ItemList JSON-LD + ranked cards). FAQ frontmatter → visible
block + FAQPage JSON-LD.

Adding `de` (planned fast-follow): add to `LOCALES` in site.ts, add slugs/strings there,
translate all articles (pairing check will enforce completeness).

## Non-negotiables

- Affiliation with Intimate is disclosed (About page, footer, every review/ranking body).
- Reviews score published criteria; competitors get credit where strong. No paid placements.
- `updatedAt` changes only on real content changes.
- No sitewide links to Intimate; contextual editorial links only.
- Zero JS on pages. If a feature seems to need JS, it probably doesn't belong on this site.

## Manual ops (dashboard/registrations — cannot be done from the repo)

- [ ] Register best-escorts.nl domain; point at the Worker (prod + staging routes)
- [ ] Bing Webmaster Tools + Google Search Console + Brave registration (the 4–8 week clock)
- [ ] Cloudflare: AI-crawler blocking OFF; Web Analytics via automatic setup (edge-injected, keeps repo 0-JS)
- [ ] GitHub secrets: CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID
- [ ] After first prod deploy: `bun scripts/indexnow.ts --all` (bulk launch ping)
- [ ] Run prompt-audit baseline (docs/PROMPT-AUDIT.md), log results

## Ops cadence

Weekly: prompt audit (docs/PROMPT-AUDIT.md). Monthly: 2–4 new pieces from
CONTENT-CALENDAR.md. Quarterly: refresh comparisons + law pieces (honest `updatedAt`).
