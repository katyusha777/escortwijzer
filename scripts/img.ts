// Process editorial stock photos → public/img/{name}.webp (720w, q74).
// Originals live in ./stock-originals/ (not deployed). Re-run: bun scripts/img.ts
import sharp from 'sharp';
import { mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = join(import.meta.dir, '..');
const SRC = join(root, 'stock-originals');
const OUT = join(root, 'public', 'img');

// Curated picks: role → original filename prefix
const PICKS: Record<string, string> = {
  hero: 'babi-JztG86OFVKo',
  law: 'siednji-leon',
  prices: 'brian-lawson-GHFQL3sLfyQ',
  fakes: 'andrey-zvyagintsev',
  etiquette: 'joshua-rawson-harris',
  amsterdam: 'brian-wangenheim',
  ranking: 'martin-martz',
  methodology: 'ernest-tarasov',
  kinky: 'jeferson-gomes-9crthglc2ZE',
  intimate: 'caique-nascimento',
  forms: 'anil-sharma',
  'client-rules': 'cucu-marius-daniel',
  municipalities: 'vadim-yefremov',
  'worker-safety': 'mihaela-claudia-puscas',
  verification: 'viktor-hesse',
  versus: 'logan-weaver',
  sexjobs: 'mukul-kumar',
  rotterdam: 'marlon-alves',
  'den-haag': 'ayo-ogunseinde',
  utrecht: 'gold-touch-nutrition',
  tourist: 'garin-chadwick',
  glossary: 'ph-m-duy-quang',
  faq: 'vasi',
  redlights: 'agung-setiawan',
  boys4u: 'babi-Lf9JpqXS--0',
  eurogirlsescort: 'brian-lawson-MRRgFUt3V0Q',
  escortnews: 'brian-lawson-P0w6oSpzYv0',
  tryst: 'felix-uresti',
  escorthub: 'jeferson-gomes-GYaEMfwk5pM',
  'all-sites': 'josh-pereira',
};

mkdirSync(OUT, { recursive: true });
const files = readdirSync(SRC).filter((f) => f.endsWith('.jpg'));

for (const [name, prefix] of Object.entries(PICKS)) {
  const file = files.find((f) => f.startsWith(prefix));
  if (!file) {
    console.error(`✗ no original matches ${prefix}`);
    continue;
  }
  await sharp(join(SRC, file))
    .resize(720, 1080, { fit: 'cover' })
    .webp({ quality: 74 })
    .toFile(join(OUT, `${name}.webp`));
  console.log(`✓ ${name}.webp ← ${file}`);
}
