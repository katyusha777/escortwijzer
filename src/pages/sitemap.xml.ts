import type { APIRoute } from 'astro';
import { LOCALES, SITE_URL } from '../lib/site';

export const GET: APIRoute = () => {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${LOCALES.map((l) => `  <sitemap><loc>${SITE_URL}/sitemap-${l}.xml</loc></sitemap>`).join('\n')}
</sitemapindex>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
