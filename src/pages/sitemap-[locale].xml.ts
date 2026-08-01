import type { APIRoute } from 'astro';
import { allArticles, pathOf } from '../lib/articles';
import { LOCALES, PILLARS, SITE_URL, t, type Locale, type Pillar } from '../lib/site';

export function getStaticPaths() {
  return LOCALES.map((locale) => ({ params: { locale } }));
}

const day = (d: Date) => d.toISOString().slice(0, 10);

export const GET: APIRoute = async ({ params }) => {
  const locale = params.locale as Locale;
  const entries = (await allArticles()).filter((e) => e.data.locale === locale);
  const newest = (list: typeof entries) =>
    list.length ? day(new Date(Math.max(...list.map((e) => e.data.updatedAt.getTime())))) : null;

  const urls: { loc: string; lastmod: string | null }[] = [
    { loc: `${SITE_URL}/${locale}/`, lastmod: newest(entries) },
    { loc: SITE_URL + t('aboutPath', locale), lastmod: null },
    ...(Object.keys(PILLARS) as Pillar[]).map((p) => ({
      loc: `${SITE_URL}/${locale}/${PILLARS[p].slug[locale]}/`,
      lastmod: newest(entries.filter((e) => e.data.pillar === p)),
    })),
    ...entries.map((e) => ({ loc: SITE_URL + pathOf(e), lastmod: day(e.data.updatedAt) })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`
  )
  .join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
