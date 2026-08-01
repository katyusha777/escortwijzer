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
    description: z.string().min(50).max(170),
    locale: z.enum(['nl', 'en', 'de']),
    // Links locale siblings for hreflang. Every key must exist in nl AND en
    // (enforced in getStaticPaths — build fails on missing pairs).
    translationKey: z.string().regex(/^[a-z0-9-]+$/),
    pillar: z.enum(['law', 'guides', 'platforms', 'cities']),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
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
