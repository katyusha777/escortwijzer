// One-time OG card generation → public/og/default.png (committed).
// Re-run after brand changes: bun scripts/og.ts
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#1c1a17"/>
  <rect x="60" y="60" width="1080" height="510" fill="none" stroke="#3a4a40" stroke-width="2"/>
  <text x="110" y="300" font-family="Georgia, serif" font-size="92" font-weight="600" fill="#f2ede2">Best Escorts<tspan fill="#7fb59a">.nl</tspan></text>
  <text x="112" y="370" font-family="Georgia, serif" font-size="30" fill="#a89f92">De onafhankelijke gids voor legale erotische</text>
  <text x="112" y="412" font-family="Georgia, serif" font-size="30" fill="#a89f92">dienstverlening in Nederland</text>
  <text x="112" y="510" font-family="Helvetica, sans-serif" font-size="22" letter-spacing="4" fill="#6e675c">WET · PRIJZEN · VEILIGHEID · PLATFORMS</text>
</svg>`;

const out = join(import.meta.dir, '..', 'public', 'og');
mkdirSync(out, { recursive: true });
await sharp(Buffer.from(svg)).png().toFile(join(out, 'default.png'));
console.log('wrote public/og/default.png');
