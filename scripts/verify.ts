// Post-build launch checks (Definition of done). Run: bun scripts/verify.ts
// Fails the build/CI on: any JS on pages, invalid/missing JSON-LD,
// hreflang non-reciprocity, sitemap URLs that don't resolve to built files.

import { Glob } from 'bun';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const DIST = join(import.meta.dir, '..', 'dist');
const SITE = 'https://best-escorts.nl';
const errors: string[] = [];

const htmlFiles = [...new Glob('**/*.html').scanSync(DIST)];
if (htmlFiles.length < 10) errors.push(`Suspiciously few HTML files: ${htmlFiles.length}`);

// dist path → canonical URL path
const urlPath = (f: string) => '/' + f.replace(/index\.html$/, '').replace(/\.html$/, '/');
const builtPaths = new Set(htmlFiles.map(urlPath));

const alternatesByPath = new Map<string, { hreflang: string; href: string }[]>();

for (const file of htmlFiles) {
  const html = readFileSync(join(DIST, file), 'utf8');
  const page = urlPath(file);

  // 1. Zero JS: every <script> must be JSON-LD; no external scripts at all.
  for (const m of html.matchAll(/<script\b[^>]*>/g)) {
    if (!m[0].includes('application/ld+json')) {
      errors.push(`${page}: non-JSON-LD script tag: ${m[0]}`);
    }
  }

  // 2. JSON-LD parses; collect types.
  const types = new Set<string>();
  for (const m of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
    try {
      const obj = JSON.parse(m[1]);
      types.add(obj['@type']);
    } catch {
      errors.push(`${page}: JSON-LD does not parse`);
    }
  }

  // Article pages live at /{locale}/{pillar}/{slug}/ (depth 3).
  const depth = page.split('/').filter(Boolean).length;
  const isArticle = depth === 3 && /^\/(nl|en|de)\//.test(page);
  if (isArticle && (!types.has('Article') || !types.has('BreadcrumbList'))) {
    errors.push(`${page}: article missing Article/BreadcrumbList JSON-LD (has: ${[...types]})`);
  }
  if (/^\/(nl|en|de)\/$/.test(page) && (!types.has('Organization') || !types.has('WebSite'))) {
    errors.push(`${page}: home missing Organization/WebSite JSON-LD`);
  }

  // 3. Internal links must resolve to built pages.
  for (const m of html.matchAll(/<a[^>]+href="(\/[^"#?]*)"/g)) {
    const target = m[1];
    if (/\.(txt|xml|png|svg|webmanifest)$/.test(target)) continue;
    if (!builtPaths.has(target)) errors.push(`${page}: internal link → ${target} not built`);
  }

  // 4. Collect hreflang alternates.
  const alts = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map(
    (m) => ({ hreflang: m[1], href: m[2] })
  );
  alternatesByPath.set(page, alts);
}

// 3b. hreflang reciprocity: each alternate target must exist and point back.
for (const [page, alts] of alternatesByPath) {
  for (const { hreflang, href } of alts) {
    if (hreflang === 'x-default') continue;
    const target = href.replace(SITE, '');
    if (!builtPaths.has(target)) {
      errors.push(`${page}: hreflang ${hreflang} → ${target} not built`);
      continue;
    }
    const back = alternatesByPath.get(target) ?? [];
    if (target !== page && !back.some((a) => a.href === SITE + page)) {
      errors.push(`${page}: hreflang not reciprocal — ${target} does not link back`);
    }
  }
}

// 4. At least one page carries ItemList (the ranking) once real content is in.
const hasRanking = htmlFiles.some((f) =>
  readFileSync(join(DIST, f), 'utf8').includes('"@type":"ItemList"')
);
if (!hasRanking) console.warn('⚠ no ItemList JSON-LD found (ranking article not yet published?)');

// 5. Sitemap URLs must resolve to built files.
for (const sm of new Glob('sitemap-*.xml').scanSync(DIST)) {
  const xml = readFileSync(join(DIST, sm), 'utf8');
  for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const p = m[1].replace(SITE, '');
    if (!builtPaths.has(p)) errors.push(`${sm}: ${p} in sitemap but not built`);
  }
}

// 6. No JS assets emitted at all.
const jsAssets = [...new Glob('**/*.js').scanSync(DIST)];
if (jsAssets.length) errors.push(`JS assets in dist: ${jsAssets.join(', ')}`);

if (errors.length) {
  console.error(`✗ verify failed (${errors.length}):\n` + errors.map((e) => `  - ${e}`).join('\n'));
  process.exit(1);
}
console.log(`✓ verify passed: ${htmlFiles.length} pages, 0 JS, JSON-LD valid, hreflang reciprocal`);
