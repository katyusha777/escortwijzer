// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Static editorial site: no adapter, no SSR, no islands. 0 KB JS is a launch
// requirement asserted in CI (scripts/verify.ts) — do not add prefetch or
// view transitions without revisiting that assert.
export default defineConfig({
  site: 'https://best-escorts.nl',
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  vite: {
    plugins: [tailwindcss()],
  },
});
