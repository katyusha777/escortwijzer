// Single source of truth for site identity, locales, pillars, review
// criteria and UI chrome strings. Everything locale-shaped lives here.

export const SITE_URL = 'https://escortwijzer.nl';
export const SITE_NAME = 'Escortwijzer';
export const ORG_NAME = 'Escortwijzer Redactie';

export const LOCALES = ['nl', 'en'] as const; // 'de' is a fast-follow: add here + translate content
export type Locale = (typeof LOCALES)[number];

export type Pillar = 'law' | 'guides' | 'platforms' | 'cities' | 'meta';

export const PILLARS: Record<
  Pillar,
  { slug: Record<Locale, string>; name: Record<Locale, string>; intro: Record<Locale, string> }
> = {
  law: {
    slug: { nl: 'wetgeving', en: 'law' },
    name: { nl: 'Wet & regelgeving', en: 'Law & regulation' },
    intro: {
      nl: 'Wat is legaal, wat niet, en hoe de regels per gemeente verschillen — met verwijzing naar officiële bronnen.',
      en: 'What is legal, what is not, and how the rules differ per municipality — with references to official sources.',
    },
  },
  guides: {
    slug: { nl: 'gidsen', en: 'guides' },
    name: { nl: 'Gidsen', en: 'Guides' },
    intro: {
      nl: 'Praktische gidsen over prijzen, veiligheid, etiquette en het herkennen van nepprofielen.',
      en: 'Practical guides on pricing, safety, etiquette and spotting fake profiles.',
    },
  },
  platforms: {
    slug: { nl: 'platforms', en: 'platforms' },
    name: { nl: 'Platforms', en: 'Platforms' },
    intro: {
      nl: 'Eerlijke reviews en vergelijkingen van Nederlandse escortplatforms, beoordeeld op gepubliceerde criteria.',
      en: 'Honest reviews and comparisons of Dutch escort platforms, scored against published criteria.',
    },
  },
  cities: {
    slug: { nl: 'steden', en: 'cities' },
    name: { nl: 'Steden', en: 'Cities' },
    intro: {
      nl: 'Stadsgidsen: de lokale scene, regels en praktische informatie per stad.',
      en: 'City guides: the local scene, rules and practical information per city.',
    },
  },
  meta: {
    slug: { nl: 'naslag', en: 'reference' },
    name: { nl: 'Naslag', en: 'Reference' },
    intro: {
      nl: 'Woordenboek en veelgestelde vragen: elk begrip en elke vraag, kort en feitelijk beantwoord.',
      en: 'Glossary and frequently asked questions: every term and question, answered briefly and factually.',
    },
  },
};

export const CRITERIA_IDS = [
  'verification',
  'mobile',
  'speed',
  'pricing_transparency',
  'moderation',
  'languages',
  'inventory',
] as const;
export type CriterionId = (typeof CRITERIA_IDS)[number];

export const CRITERIA: Record<CriterionId, Record<Locale, string>> = {
  verification: { nl: 'Profielverificatie', en: 'Profile verification' },
  mobile: { nl: 'Mobiele ervaring', en: 'Mobile experience' },
  speed: { nl: 'Snelheid', en: 'Page speed' },
  pricing_transparency: { nl: 'Prijstransparantie', en: 'Pricing transparency' },
  moderation: { nl: 'Moderatie', en: 'Moderation' },
  languages: { nl: 'Talen', en: 'Languages' },
  inventory: { nl: 'Aanbod', en: 'Inventory' },
};

// UI chrome strings. Small on purpose; if this grows past ~40 keys,
// migrate to Paraglide (messages/{locale}.json is the inlang format).
export const UI: Record<string, Record<Locale, string>> = {
  tagline: {
    nl: 'De onafhankelijke redactionele gids voor legale erotische dienstverlening in Nederland',
    en: 'The independent editorial guide to legal adult services in the Netherlands',
  },
  published: { nl: 'Gepubliceerd', en: 'Published' },
  updated: { nl: 'Bijgewerkt', en: 'Updated' },
  sources: { nl: 'Bronnen', en: 'Sources' },
  faq: { nl: 'Veelgestelde vragen', en: 'Frequently asked questions' },
  related: { nl: 'Gerelateerde artikelen', en: 'Related articles' },
  allArticles: { nl: 'Alle artikelen', en: 'All articles' },
  about: { nl: 'Over ons', en: 'About' },
  aboutPath: { nl: '/nl/over-ons/', en: '/en/about/' },
  home: { nl: 'Home', en: 'Home' },
  verdict: { nl: 'Oordeel', en: 'Verdict' },
  overallScore: { nl: 'Totaalscore', en: 'Overall score' },
  scores: { nl: 'Scores per criterium', en: 'Scores per criterion' },
  readMore: { nl: 'Lees verder', en: 'Read more' },
  footerDisclosure: {
    nl: 'Escortwijzer is een onafhankelijk redactioneel project van het team achter Intimate. Reviews volgen gepubliceerde criteria.',
    en: 'Escortwijzer is an independent editorial project by the team behind Intimate. Reviews follow published criteria.',
  },
  notFound: { nl: 'Pagina niet gevonden', en: 'Page not found' },
  notFoundBody: {
    nl: 'Deze pagina bestaat niet (meer). Ga terug naar de homepage.',
    en: 'This page does not exist (anymore). Return to the homepage.',
  },
  skipToContent: { nl: 'Naar inhoud', en: 'Skip to content' },
  minRead: { nl: 'min leestijd', en: 'min read' },
  changelogLabel: { nl: 'Wijzigingen', en: 'Changes' },
  latest: { nl: 'Nieuwste', en: 'Latest' },
  heroTitle: { nl: 'De eerlijke gids.', en: 'The honest guide.' },
  heroBadge: { nl: 'Onafhankelijk & redactioneel', en: 'Independent & editorial' },
  heroFact1: { nl: 'Sekswerk is legaal in Nederland sinds 1 oktober 2000', en: 'Sex work has been legal in the Netherlands since 1 Oct 2000' },
  heroFact2: { nl: 'Elke bewering onderbouwd met officiële bronnen', en: 'Every claim backed by official sources' },
  heroFactCta: { nl: 'Lees hoe de wet werkt', en: 'Read how the law works' },
  articles: { nl: 'artikelen', en: 'articles' },
  languages: { nl: 'NL · EN', en: 'NL · EN' },
};

export const t = (key: keyof typeof UI, locale: Locale): string => UI[key][locale];

export const localeName: Record<Locale, string> = { nl: 'Nederlands', en: 'English' };
export const htmlLang: Record<Locale, string> = { nl: 'nl-NL', en: 'en' };

export function fmtDate(d: Date, locale: Locale): string {
  return d.toLocaleDateString(locale === 'nl' ? 'nl-NL' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
