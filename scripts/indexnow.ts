// IndexNow ping, wired into CI on every publish/update.
//   bun scripts/indexnow.ts          → ping URLs of content files changed in HEAD
//   bun scripts/indexnow.ts --all    → bulk ping every URL in the built sitemaps (launch)
// Key file lives at public/{KEY}.txt (deployed to the site root, as IndexNow requires).

import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { Glob } from 'bun';
import { PILLARS, SITE_URL, type Locale, type Pillar } from '../src/lib/site';

const KEY = '989e82a9102740f9b256e48aefd1d320';
const HOST = 'best-escorts.nl';
const root = join(import.meta.dir, '..');

function changedUrls(): string[] {
  const out = execSync('git diff --name-only HEAD^ HEAD -- src/content/articles', {
    cwd: root,
    encoding: 'utf8',
  });
  const urls = new Set<string>();
  for (const file of out.split('\n').filter(Boolean)) {
    const m = file.match(/^src\/content\/articles\/(nl|en|de)\/(.+)\.md$/);
    if (!m) continue;
    const [, locale, slug] = m as unknown as [string, Locale, string];
    // pillar comes from frontmatter; for deleted files read the pre-delete blob
    let src = '';
    try {
      src = readFileSync(join(root, file), 'utf8');
    } catch {
      src = execSync(`git show HEAD^:${file}`, { cwd: root, encoding: 'utf8' });
    }
    const pillar = src.match(/^pillar:\s*(law|guides|platforms|cities)\s*$/m)?.[1] as
      | Pillar
      | undefined;
    if (!pillar) continue;
    urls.add(`${SITE_URL}/${locale}/${PILLARS[pillar].slug[locale]}/${slug}/`);
    urls.add(`${SITE_URL}/${locale}/${PILLARS[pillar].slug[locale]}/`);
    urls.add(`${SITE_URL}/${locale}/`);
  }
  return [...urls];
}

function allUrls(): string[] {
  const urls = new Set<string>();
  for (const sm of new Glob('sitemap-*.xml').scanSync(join(root, 'dist'))) {
    const xml = readFileSync(join(root, 'dist', sm), 'utf8');
    for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) urls.add(m[1]);
  }
  return [...urls];
}

const urlList = process.argv.includes('--all') ? allUrls() : changedUrls();
if (!urlList.length) {
  console.log('IndexNow: no content URLs changed, nothing to ping');
  process.exit(0);
}

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `${SITE_URL}/${KEY}.txt`,
    urlList,
  }),
});
// 200/202 = accepted. Log proof for CI (Definition of done).
console.log(`IndexNow: ${res.status} for ${urlList.length} URL(s):`);
for (const u of urlList) console.log(`  ${u}`);
if (res.status >= 300) process.exit(1);
