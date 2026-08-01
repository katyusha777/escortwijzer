import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';
import { CRITERIA_IDS } from './lib/site';

// Frontmatter contract for every article. Build fails on violations.
// File layout: src/content/articles/{locale}/{localized-slug}.md
const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string().min(10).max(75),
    description: z.string().min(50).max(155), // CONTENT.md §6: ≤155, contains the key fact
    locale: z.enum(['nl', 'en', 'de']),
    // Links locale siblings for hreflang. Every key must exist in nl AND en
    // (enforced in getStaticPaths — build fails on missing pairs) unless solo.
    translationKey: z.string().regex(/^[a-z0-9-]+$/),
    // CONTENT.md §8 allows locale-specific pieces (#4, #8, #21): solo opts out
    // of the pairing requirement.
    solo: z.boolean().default(false),
    pillar: z.enum(['law', 'guides', 'platforms', 'cities', 'meta']),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    // CONTENT.md §6: 3–8 target queries incl. AI-phrased variants
    targetQueries: z.array(z.string()).min(3).max(8),
    // CONTENT.md §11: every refresh gets a visible one-line changelog entry
    changelog: z.array(z.object({ date: z.coerce.date(), note: z.string() })).default([]),
    sources: z
      .array(z.object({ title: z.string(), url: z.url(), publisher: z.string().optional() }))
      .default([]),
    // q/a pairs → rendered FAQ block + FAQPage JSON-LD
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    // translationKeys of related articles (resolved per locale)
    related: z.array(z.string()).default([]),
    // Platform reviews only: criteria scores 0–10 → Review JSON-LD
    review: z
      .object({
        platform: z.string(),
        url: z.url(),
        scores: z.record(z.enum(CRITERIA_IDS), z.number().min(0).max(10)),
        verdict: z.string(),
      })
      .optional(),
    // Ranking articles only → ItemList JSON-LD
    ranking: z
      .array(
        z.object({
          position: z.number().int().positive(),
          name: z.string(),
          url: z.url(),
          summary: z.string(),
        })
      )
      .optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles };
