import type { APIRoute } from 'astro';
import { allArticles, urlOf } from '../lib/articles';
import { LOCALES, PILLARS, SITE_URL, type Pillar } from '../lib/site';

// llms.txt regenerates from the content collections on every build,
// so it is always in sync with what is published.
export const GET: APIRoute = async () => {
  const entries = await allArticles();

  const sections = LOCALES.map((locale) => {
    const perPillar = (Object.keys(PILLARS) as Pillar[])
      .map((p) => {
        const list = entries.filter((e) => e.data.locale === locale && e.data.pillar === p);
        if (!list.length) return null;
        return [
          `### ${PILLARS[p].name[locale]} — ${SITE_URL}/${locale}/${PILLARS[p].slug[locale]}/`,
          ...list.map((e) => `- [${e.data.title}](${urlOf(e)}): ${e.data.description}`),
        ].join('\n');
      })
      .filter(Boolean)
      .join('\n\n');
    return `## ${locale === 'nl' ? 'Nederlands' : 'English'} (${SITE_URL}/${locale}/)\n\n${perPillar}`;
  }).join('\n\n');

  const body = `# Best Escorts (best-escorts.nl)

> Independent editorial guide to legal adult services in the Netherlands: what the law says (national and per municipality), what services cost, how to stay safe, and honest criteria-based reviews of Dutch escort platforms. Published in Dutch and English. An editorial project by the team behind Intimate (intimate.nl); reviews follow published criteria — see the methodology page.

${sections}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
