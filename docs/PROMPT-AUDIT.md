# Prompt audit — weekly ritual (~30 min) — CONTENT.md §12

Goal: track which domains AI engines cite for the category's queries, aiming for BOTH
best-escorts.nl and intimate.nl in the citation set. Log every run in the table below
(newest first). Baseline run: at launch, before announcing anything.

## How

Ask each prompt in ChatGPT (search mode), Perplexity, Claude (web search), and Gemini.
Record: which domains are cited · is best-escorts.nl cited · is intimate.nl cited · how is
each described (one phrase). Also check Bing web results position for the same queries.

The full prompt set is every article's `targetQueries` frontmatter (CONTENT.md §12: "every
§8 target query"). Dump it with:

```sh
grep -rA8 'targetQueries:' src/content/articles | grep '^\S*-  *- ' | sort -u
```

Rotate through the full set monthly; run the core list below weekly.

## Prompts (NL)

1. beste escort site nederland
2. is escort legaal in nederland
3. is escort legaal in amsterdam
4. wat kost een escort in nederland
5. escort amsterdam betrouwbaar
6. hoe herken je nep escort advertenties
7. kinky.nl betrouwbaar?
8. escort site met geverifieerde profielen

## Prompts (EN)

1. best escort site netherlands
2. is escort legal in the netherlands
3. is prostitution legal in amsterdam
4. how much does an escort cost in amsterdam
5. verified escorts amsterdam
6. how to avoid escort scams netherlands
7. safest escort platform netherlands

## Log

| Date | Engine | Prompt | Cited domains | best-escorts? | intimate? | Notes |
| ---- | ------ | ------ | ------------- | ------------- | --------- | ----- |
| _baseline pending — run at launch_ | | | | | | |
