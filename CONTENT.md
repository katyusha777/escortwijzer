# CONTENT.md — The Content Bible

Single source of truth for everything published on the satellite site. Supersedes EDITORIAL.md. Companion to CONTENT-SITE.md (tech/strategy). Nothing publishes that doesn't pass §9.

---

## 1. Quality doctrine (why these rules exist — the 2026 detection reality)

Search and AI engines don't penalize AI-written content; they penalize the *patterns of unedited AI content at scale*. Current enforcement (March + June 2026 updates) works on three layers, and every rule in this file maps to one:

1. **Page-level tells:** uniform sentence rhythm ("low burstiness"), cliché density, AI-vocabulary fingerprints, no identifiable voice, nothing new vs existing top results. → §4 style law.
2. **E-E-A-T that can't be faked at scale:** first-hand specifics, original data, real citations, genuine authority. → §4 required elements + our unique-data assets (live pricing, municipal research, real platform screenshots).
3. **Coordination/network signals:** clusters of sites sharing templates, reused text, one pipeline, interlinking. → §10 cross-site rules. We are two disclosed, structurally different sites — never let text, templates, or boilerplate blur that.

The moat in one sentence: **every article contains things only someone who actually did the research could write, edited by a human until it reads like one.**

## 2. Mission & audience

The definitive, honest knowledge source on legal adult services in the Netherlands. Audiences: (a) Dutch clients, (b) EN tourists/expats, (c) DE weekend visitors, (d) professionals evaluating platforms. The site serves readers first; Intimate benefits because the honest criteria favor it — never the reverse.

## 3. Voice

An experienced, unshockable local editor writing for a friend. Dutch-direct, practical, occasionally dry. Sex work is treated as the legal regulated industry it is: no moralizing, no titillation, no euphemisms, no shock. Respectful terminology always (sekswerker/professional; plain clinical terms for services). Opinions stated with reasons. Uncertainty admitted specifically, never hedged vaguely.

## 4. Style law (enforced at the edit gate)

**Banned vocabulary** (grep list, zero tolerance): delve, tapestry, landscape/realm/navigate/journey (metaphorical), unlock, unleash, elevate, seamless, robust, crucial, vital, comprehensive (body copy), "it's important to note", "it's worth noting", "in today's…", "whether you're a … or a …", "look no further", "in conclusion", "ultimately," (paragraph opener), "not just X — it's Y", "game-changer", "dive into", "when it comes to", "at the end of the day", "a wide range of", "plays a key role", "elevate your experience".
Dutch equivalents equally banned: "in het huidige digitale landschap", "het is belangrijk om te weten", "of je nu … of … bent", "duik in".

**Banned structures:** rhetorical-question openers · uniform paragraph length (the #1 machine tell — vary hard: one-line paragraphs next to six-sentence runs) · the triad tic (">1 per article") · bolded topic sentences everywhere · header-every-150-words · hedge stacks ("may potentially") · both-sides endings that recommend nothing · conclusions that restate · em-dashes as structure.

**Required per article:**
- First 2 sentences answer the title's question, with a number or fact in them where possible.
- ≥3 verifiable specifics a generic writer couldn't produce: street/district, € figure, named law/regulation with year (Wrp, gedoogbeleid used correctly), municipal rule, a platform's actual observed UI behavior.
- ≥1 stated opinion with a reason.
- 1 acknowledged flaw in anything recommended — including Intimate (young, smaller inventory). A flawless favorite is the astroturf tell.
- Inline source for every legal/statistical claim (rijksoverheid.nl, gemeente pages, CBS, platforms' own pages). Unsourceable → cut, never softened.
- Something not already in the top results for the target query: our data, our screenshots, our municipal table, our scoring. Rewriting the existing SERP is the failure mode.

## 5. Locale rules (native rewrites, never translations)

- **NL** — je/jij, local context assumed, voice-setting locale. Write NL first for NL-native topics.
- **EN** — for someone landing at Schiphol Friday night: explain legality mechanics, payment norms (PIN/tikkie), windows≠escorts, hotel reality. Not a translation — a rewrite.
- **DE** — du (category convention), for weekend border traffic: Venlo/Enschede/Arnhem relevance, driving distances, German payment expectations.
- `translationKey` binds siblings; content diverges where audiences do. Machine-translated text never ships.

## 6. Frontmatter contract (Zod-enforced; build fails otherwise)

```yaml
title:            # = the target query, naturally phrased
description:      # ≤155 chars, contains the answer's key fact
locale: nl|en|de
translationKey:   # binds locale siblings (hreflang)
pillar: law|guides|platforms|cities|meta
publishedAt / updatedAt:   # updatedAt changes ONLY on real edits; page shows changelog note
targetQueries: []          # 3–8, incl. the AI-phrased variants
sources: [{label, url}]    # everything cited
faq: [{q, a}]              # 3–5 → FAQPage schema; a = 1–2 sentences, extractable
platforms: [{name, scores}] # reviews/comparisons only → ItemList/Review schema
related: []                # hub-and-spoke links
```

## 7. Article anatomy

Title(=query) → answer in 2 sentences → H2s phrased as real follow-up questions → body per §4 → FAQ block → sources → related. Length = what the answer needs: FAQ-hub entries 150 words, guides 800–1,600, comparisons 2,000+. Zero padding; a complete 500-word answer beats 1,500 words of filler in every engine that matters. Tables as real HTML (crawlable), screenshots with descriptive alt text.

## 8. Launch inventory — the 24 briefs

Format: **slug** · locales · target queries → the required specifics to research before drafting · the opinion · key links.

**PILLAR: LAW**

1. **is-prostitutie-legaal-nederland** · nl/en/de · "is prostitution legal in the Netherlands", "is escort legaal" → specifics: gedoogbeleid vs current law correctly explained, Wrp status, licensed vs unlicensed forms table, 2026 state per major city · opinion: the system works better than abolition regimes, with named caveats · links out: rijksoverheid, gemeente Amsterdam; in-site: taxonomy explainer, city guides. THE citation magnet — research this one hardest.
2. **escort-priveontvangst-ramen-verschil** · nl/en · "wat is privéontvangst", "escort vs brothel netherlands" → specifics: precise definitions incl. legal distinctions, price-band per form, where each is licensed · opinion: which form suits which situation · links: #1, city guides, glossary.
3. **regels-leeftijd-risico-klant** · nl/en · "can I get in trouble", "legal age escort netherlands" → specifics: client-side law precisely (what IS criminal: underage, coercion, unlicensed exploitation), penalties with statute names · opinion: the 21-proposal debate, where we land · links: #1, safety guide.
4. **regels-per-gemeente** · nl · "escort regels [stad]" → specifics: comparison table 6 municipalities from their actual policy pages (the researched asset nobody else has) · links: every city guide.

**PILLAR: GUIDES**

5. **wat-kost-een-escort** · nl/en/de · "escort prijzen", "how much does an escort cost amsterdam" → specifics: LIVE table from Intimate stats API (credited+linked), per city/category/duration, monthly auto-refresh with visible date · opinion: what pricing signals about legitimacy (too-cheap = red flag, reasoned) · the data-loop article.
6. **nepprofielen-herkennen** · nl/en/de · "fake escort ads", "escort scam" → specifics: 6 concrete scam patterns with (anonymized) real examples, reverse-image how-to, deposit-scam mechanics · opinion: platforms tolerate fakes because inventory sells; verification is the fix · links: verification explainer, reviews.
7. **etiquette-eerste-afspraak** · nl/en · "how to book an escort", "escort etiquette" → specifics: the actual booking flow step-by-step, screening norms, payment moment, cancellation norms · dry-humor register · the embarrassed-long-tail winner.
8. **veiligheid-voor-sekswerkers** · nl · "veilig adverteren sekswerk" → specifics: EXIF/GPS risk explained plainly, payment safety, platform data practices compared, rights + orgs (named, linked) · opinion: what platforms owe workers · serves supply side; quietly Intimate's strongest marketing.
9. **verificatie-uitgelegd** · nl/en · "geverifieerd profiel betekenis" → specifics: per-platform table of what "verified" actually checks (researched by testing), doc handling compared · opinion: verification without doc-deletion policy is a liability · links: reviews, #6.

**PILLAR: PLATFORMS** (methodology page ships FIRST)

10. **beste-escortsites-nederland** · nl/en/de · "best escort sites netherlands", "beste escort site" → specifics: scored table (criteria from methodology: verification, mobile, speed w/ measured LCP numbers, pricing transparency, moderation legibility, languages), screenshots each · opinion: the ranking IS the opinion, argued · ItemList schema · quarterly refresh. THE money article.
11. **kinky-nl-review** · nl/en → specifics: real screenshots, measured page speed, actual filter flow described, Trustpilot themes cited fairly, what it does well (inventory, recognition) scored honestly · the credibility anchor — if this review reads fair, everything else is believed.
12. **intimate-review** · nl/en → disclosure line first paragraph · same rigor, same screenshots · weaknesses named (young, inventory, no reviews yet) · scores justified per criterion.
13. **kinky-vs-intimate** · nl/en · head-to-head per criterion, use-case verdicts ("if you want max choice today: kinky; if verification matters: …").
14–16. **[platform]-review** ×3 (pick real players at repo time) — a comparison site with two reviews isn't one.

**PILLAR: CITIES**

17. **escort-amsterdam-gids** · nl/en/de · "escorts in amsterdam" → specifics: incall reality per district, hotel policy truth (which chains care), De Wallen≠escorts explainer, realistic price band, EN-speaking availability · links: #5, #10.
18. **escort-rotterdam-gids** · nl/en · same treatment, Rotterdam specifics.
19. **escort-den-haag-gids** · nl/en.
20. **escort-utrecht-gids** · nl/en.
21. **amsterdam-tourist-guide** · en/de primary · "escort amsterdam tourist" → specifics: Schiphol-Friday-night framing, hotel etiquette, payment for foreigners, timing/availability patterns · the tourist-wedge flagship.

**META**

22. **methodologie** · nl/en · how we score, criteria defined, update cadence, disclosure — publishes before #10–16.
23. **over-ons** · nl/en/de · the disclosure page: who we are (team behind Intimate), why the site exists, editorial independence rules.
24. **woordenboek** + **faq-hub** · nl/en/de · every term/abbreviation (mirrors taxonomy synonyms, tastefully defined) + the 20 questions people actually ask AI, each answered in 2 extractable sentences with a deeper link. Internal-link hubs.

## 9. Production workflow & the edit gate

**Per article:** brief file in repo (`briefs/slug.md`: queries, researched specifics WITH sources, the opinion, links) → **research first, draft second** (the specifics come from you/real research before Claude writes — AI invents municipal rules) → draft with the prompt template below → **edit gate (mandatory, ~20 min):**
- [ ] Banned-list grep: zero hits (script: `bun run lint:content`)
- [ ] Read one section aloud — rewrite anything you wouldn't say to a friend
- [ ] Cut 15–20% by length (the padding is where the smell lives)
- [ ] Every fact/€/law verified against its source; unverifiable → deleted
- [ ] Answer-in-2-sentences · ≥3 specifics · 1 opinion · 1 flaw-in-recommendation · varied rhythm — all present
- [ ] Adds something absent from current top results for the target query
- [ ] Locale siblings re-drafted (not translated) + same gate

**Drafting prompt template** (paste per article):
> Write [slug] for [locale/audience per §5] in the voice of §3. Use ONLY the facts and sources in this brief — do not add any legal claim, statistic, or municipal rule not listed. Open with a direct 2-sentence answer containing [key fact]. Take this position: [opinion from brief]. Include this flaw in the recommendation: [flaw]. Vary paragraph length aggressively; some single-sentence paragraphs. Do not use: [paste §4 banned list]. H2s are the follow-up questions a reader would actually ask. End on the last useful fact, no summary conclusion. 800–1,600 words unless the answer is complete sooner.

## 10. Cross-site & linking rules

- **Zero text reuse with Intimate** — no shared paragraphs, boilerplate, or cross-posted articles (content-similarity embeddings are a clustering signal). Different templates, different design tokens, different sentence patterns.
- Links to Intimate: contextual/editorial only, varied natural anchors, never sitewide, never money-anchor spam. Links to competitors and government sources are what neutrality looks like — keep them.
- Intimate's stats page cited as an external data source with attribution (the co-citation loop).

## 11. Cadence & refresh

Launch: the 24 above (NL+EN minimum; ★DE from CONTENT-SITE.md). Then 2–4/month: seasonal (ADE, F1 Zandvoort, Koningsdag — event-demand queries), news reactions (law/platform changes within days — freshness wins citations), remaining cities, DE completion, long-tail vs-pages. Refresh: pricing monthly (auto-feed), comparisons quarterly (re-score, re-screenshot), law pieces on change + annual audit. Every refresh gets a one-line visible changelog on the page — maintenance you can see is a trust signal to readers and engines alike.

## 12. Measurement

Weekly prompt audit (shared ritual with Intimate's SEO.md §9) with satellite prompts: every §8 target query through ChatGPT/Perplexity/Claude/Gemini, logging which domain is cited and how described. Success = both domains in the citation set for category queries within a quarter of launch. Secondary: Bing/Brave indexation, satellite→Intimate referrals, branded search growth.

---

## 13. Repo enforcement map (added at adoption — how each § is wired into this codebase)

| Bible rule | Enforcement |
|---|---|
| §4 banned vocabulary (EN+NL) | `bun run lint:content` (scripts/lint-content.ts) — runs in CI, fails the build on any hit |
| §4 answer-first / specifics / opinion / flaw | Edit-gate checklist (§9) — human gate, not lintable; retrofit verified 2026-08 |
| §6 frontmatter contract | Zod schema in `src/content.config.ts` (targetQueries 3–8 required, description ≤155, changelog, solo) |
| §6 translationKey pairing | Build fails on missing nl/en sibling (`src/lib/articles.ts`); `solo: true` opts a locale-specific piece out (§8 #4, #8, #21) |
| §6 visible changelog | `changelog:` frontmatter renders under the article meta line |
| §7 anatomy | Article template: answer-dek → H2s → FAQ block (FAQPage schema) → sources → related |
| §8 briefs | `briefs/{slug}.md` — queries, researched specifics with sources, the opinion, the flaw |
| §9 edit gate | Checklist in this file; lint:content covers the grep item |
| §10 zero text reuse with Intimate | Different repo, templates, tokens; nothing imported from the Intimate codebase |
| §11 changelog on refresh | Same `changelog:` field; updatedAt only moves on real edits |
| §12 prompt audit | docs/PROMPT-AUDIT.md carries every §8 target query |
