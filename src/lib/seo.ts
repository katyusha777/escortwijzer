import type { CollectionEntry } from 'astro:content';
import { CRITERIA_IDS, ORG_NAME, SITE_NAME, SITE_URL, type Locale } from './site';

type Article = CollectionEntry<'articles'>;

const iso = (d: Date) => d.toISOString().slice(0, 10);

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/og/default.png`,
  };
}

export function websiteJsonLd(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: `${SITE_URL}/${locale}/`,
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: locale,
  };
}

export function articleJsonLd(article: Article, url: string) {
  const { title, description, publishedAt, updatedAt, locale } = article.data;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    inLanguage: locale,
    datePublished: iso(publishedAt),
    dateModified: iso(updatedAt),
    author: { '@type': 'Organization', name: ORG_NAME, url: `${SITE_URL}/` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    mainEntityOfPage: url,
    image: `${SITE_URL}/og/default.png`,
  };
}

export function faqJsonLd(faq: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function itemListJsonLd(ranking: { position: number; name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: ranking.length,
    itemListElement: ranking.map((r) => ({
      '@type': 'ListItem',
      position: r.position,
      name: r.name,
      url: r.url,
    })),
  };
}

export function reviewJsonLd(article: Article, url: string) {
  const review = article.data.review!;
  const scores = Object.values(review.scores) as number[];
  const overall = scores.reduce((a, b) => a + b, 0) / scores.length;
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: { '@type': 'WebSite', name: review.platform, url: review.url },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: Math.round(overall * 10) / 10,
      bestRating: 10,
      worstRating: 0,
    },
    name: article.data.title,
    reviewBody: review.verdict,
    datePublished: iso(article.data.publishedAt),
    author: { '@type': 'Organization', name: ORG_NAME, url: `${SITE_URL}/` },
    url,
  };
}

export function overallScore(scores: Partial<Record<(typeof CRITERIA_IDS)[number], number>>): number {
  const vals = Object.values(scores) as number[];
  return Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10;
}
