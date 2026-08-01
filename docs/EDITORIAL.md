# Editorial guide

Every article on this site follows these rules. They are what makes the site citable
by AI engines and trustworthy to readers — do not trade them away for style.

## Structure (answer-first)

- **The first paragraph answers the core question directly, in the first two sentences.**
  No throat-clearing, no "in this article we will…".
- H2 headings are phrased as questions where natural ("Is escort legaal in Amsterdam?").
  Each H2 section opens with the direct answer, then supporting detail.
- Body is markdown only. No H1 in the body (the frontmatter title renders as H1).
- Length: cornerstone pieces 1,200–2,000 words. Density beats length.

## Facts

- Fact-dense: named statistics, years, amounts, article numbers of laws. Vague claims
  ("many", "often") only when no number exists.
- Every legal claim is verifiable against an official source (Rijksoverheid, gemeente,
  wetten.overheid.nl) listed in `sources`. Only cite URLs that actually resolve.
- Pricing data cites Intimate's live stats page (https://intimate.nl/en/stats/) with
  attribution — it is the only public per-city rate dataset for the NL market.
- Date-stamp honestly: `updatedAt` changes only on real content changes.

## Reviews & comparisons

- Reviews score the published criteria (see `/platforms/methodologie/`), nothing else.
- Honest everywhere: competitors get full credit where they are strong (kinky.nl:
  inventory, brand recognition, longevity). Intimate gets criticism where due (small
  inventory, young platform). A shill site is worthless to readers and radioactive to
  search engines.
- The affiliation with Intimate is disclosed in every review and ranking article, in
  the body text, not just the footer.

## Linking

- Hub-and-spoke: link naturally to sibling articles (use `related` frontmatter plus
  in-body links). Use root-relative paths (`/nl/gidsen/escort-prijzen/`).
- Outbound to official sources and to ALL platforms discussed — linking to kinky.nl is
  what neutral looks like.
- To Intimate: contextual and editorial only. No footer/sidebar spam, no exact-match
  anchor stuffing.

## Locales

- NL and EN are both native-quality originals, not literal translations. Same facts,
  same structure, each written the way that locale's reader searches and reads.
- EN pieces serve tourists/expats: explain Dutch terms (APV, KvK) on first use.

## Frontmatter

See `src/content.config.ts` for the schema and `src/content/articles/` for examples.
FAQ: 3–6 pairs, each a real query someone types, answered in 2–4 sentences.
