// CONTENT.md §4 style law — the banned-list grep, zero tolerance.
// Run: bun run lint:content  (also runs in CI; fails build on any hit)
// Scans article BODIES (frontmatter excluded: titles may legitimately say
// "complete gids"; body copy may not smell like a machine).

import { Glob } from 'bun';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = join(import.meta.dir, '..', 'src', 'content', 'articles');

// [pattern, label] — case-insensitive; \b where word-boundary matters.
const BANNED: [RegExp, string][] = [
  // — EN vocabulary
  [/\bdelve/i, 'delve'],
  [/\btapestry\b/i, 'tapestry'],
  [/\bunlock(s|ed|ing)?\b/i, 'unlock'],
  [/\bunleash/i, 'unleash'],
  [/\belevate\b|\belevating\b|\belevate your\b/i, 'elevate'],
  [/\bseamless(ly)?\b/i, 'seamless'],
  [/\brobust\b/i, 'robust'],
  [/\bcrucial(ly)?\b/i, 'crucial'],
  [/\bvital(ly)?\b/i, 'vital'],
  [/\bcomprehensive\b/i, 'comprehensive (body copy)'],
  [/it['’]s important to note/i, "it's important to note"],
  [/it['’]s worth noting/i, "it's worth noting"],
  [/\bin today['’]s\b/i, "in today's…"],
  [/whether you['’]re a .{1,40}? or a /i, "whether you're a … or a …"],
  [/look no further/i, 'look no further'],
  [/\bin conclusion\b/i, 'in conclusion'],
  [/^\s*Ultimately,/im, 'Ultimately, (paragraph opener)'],
  [/game[- ]chang(er|ing)/i, 'game-changer'],
  [/\bdive into\b|\bdiving into\b/i, 'dive into'],
  [/when it comes to/i, 'when it comes to'],
  [/at the end of the day/i, 'at the end of the day'],
  [/a wide (range|variety) of/i, 'a wide range of'],
  [/plays? a key role/i, 'plays a key role'],
  [/\bnavigat(e|ing) the\b/i, 'navigate the (metaphorical)'],
  [/\bthe landscape of\b|\blandscape\b.{0,20}\b(digital|adult|online)\b/i, 'landscape (metaphorical)'],
  [/\bthe realm of\b/i, 'realm'],
  [/not just \w[^.\n]{0,50}—\s*it['’]?s?\b/i, 'not just X — it\'s Y'],
  // — NL vocabulary
  [/in het huidige digitale landschap/i, 'huidige digitale landschap'],
  [/het is belangrijk (om )?te (weten|noteren|vermelden)/i, 'het is belangrijk om te weten'],
  [/of je nu .{1,40}? of .{1,40}? bent/i, 'of je nu … of … bent'],
  [/\bduik(en)? (in|we)\b/i, 'duik in'],
  [/\bnaadlo(os|ze)\b/i, 'naadloos'],
  [/\bcruciaal\b|\bcruciale\b/i, 'cruciaal'],
  [/een breed scala/i, 'een breed scala'],
  [/speelt een (belangrijke|sleutel)rol/i, 'speelt een belangrijke rol'],
  [/als het (gaat om|aankomt op)/i, 'als het gaat om'],
  [/in de wereld van/i, 'in de wereld van'],
];

const hits: string[] = [];
for (const file of new Glob('**/*.md').scanSync(ROOT)) {
  const raw = readFileSync(join(ROOT, file), 'utf8');
  // strip frontmatter — style law targets body copy
  const body = raw.replace(/^---\n[\s\S]*?\n---\n/, '');
  const bodyOffset = raw.length - body.length;
  for (const [re, label] of BANNED) {
    const m = body.match(re);
    if (m && m.index !== undefined) {
      const line = raw.slice(0, bodyOffset + m.index).split('\n').length;
      hits.push(`${file}:${line} — "${m[0].trim().slice(0, 40)}" (${label})`);
    }
  }
}

if (hits.length) {
  console.error(`✗ CONTENT.md §4 banned-list violations (${hits.length}):`);
  for (const h of hits) console.error(`  ${h}`);
  process.exit(1);
}
console.log('✓ lint:content passed — zero §4 banned-list hits');
