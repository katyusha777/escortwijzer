import { getCollection, type CollectionEntry } from 'astro:content';
import { LOCALES, PILLARS, SITE_URL, type Locale } from './site';

export type Article = CollectionEntry<'articles'>;

export async function allArticles(): Promise<Article[]> {
  const entries = await getCollection('articles', ({ data }) => !data.draft);
  assertTranslationPairs(entries);
  return entries;
}

// Definition of done: build fails on missing translationKey pairs.
// Every translationKey must exist in every launch locale (nl + en).
function assertTranslationPairs(entries: Article[]) {
  const byKey = new Map<string, Set<string>>();
  for (const e of entries) {
    const set = byKey.get(e.data.translationKey) ?? new Set();
    set.add(e.data.locale);
    byKey.set(e.data.translationKey, set);
  }
  const broken = [...byKey.entries()].filter(([, locales]) =>
    LOCALES.some((l) => !locales.has(l))
  );
  if (broken.length) {
    throw new Error(
      `translationKey missing locale sibling(s): ${broken
        .map(([k, l]) => `${k} (has: ${[...l].join(',')})`)
        .join('; ')}`
    );
  }
}

export function slugOf(article: Article): string {
  // entry.id is "{locale}/{slug}"
  return article.id.split('/')[1];
}

export function pathOf(article: Article): string {
  const { locale, pillar } = article.data;
  return `/${locale}/${PILLARS[pillar].slug[locale as Locale]}/${slugOf(article)}/`;
}

export function urlOf(article: Article): string {
  return SITE_URL + pathOf(article);
}

export function siblingsOf(article: Article, entries: Article[]): Partial<Record<Locale, string>> {
  const out: Partial<Record<Locale, string>> = {};
  for (const e of entries) {
    if (e.data.translationKey === article.data.translationKey) {
      out[e.data.locale as Locale] = pathOf(e);
    }
  }
  return out;
}

export function readingMinutes(article: Article): number {
  const words = (article.body ?? '').split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

export function relatedOf(article: Article, entries: Article[]): Article[] {
  return article.data.related
    .map((key) =>
      entries.find((e) => e.data.translationKey === key && e.data.locale === article.data.locale)
    )
    .filter((e): e is Article => Boolean(e));
}
