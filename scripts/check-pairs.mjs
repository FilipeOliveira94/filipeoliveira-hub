// Fails when a page or a content item lacks its PT/EN pair (I-04, D-003).
// Usage: node scripts/check-pairs.mjs [distDir] [contentDir]
// Pages: PT lives at the root of dist/ and EN under dist/en/ with the same
// path, so every HTML page needs its mirror. 404.html is exempt: GitHub Pages
// serves a single root 404 for every path. If I-07 translates the slugs, this
// mapping changes with it.
// Content items: a file under src/content/<collection>/pt/ needs the same path
// under en/, and the reverse (Astro's i18n layout); messages show paths
// relative to src/content/. A file that holds both languages, outside pt/ and
// en/, is checked by its collection schema (I-08).
import { stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { htmlPages, walk } from './lib/dist.mjs';

const EXEMPT_PAGES = new Set(['404.html']);
const LANGS = { pt: 'en', en: 'pt' };

async function exists(dir) {
  try {
    return (await stat(dir)).isDirectory();
  } catch {
    return false;
  }
}

/** Returns one message per page or content item whose pair is missing. */
export async function checkPairs(distDir, contentDir) {
  const errors = [];

  const pages = new Set((await htmlPages(distDir)).filter((p) => !EXEMPT_PAGES.has(p)));
  for (const page of pages) {
    const isEn = page.startsWith('en/');
    const pair = isEn ? page.slice(3) : `en/${page}`;
    if (!pages.has(pair)) errors.push(`page ${page} has no ${isEn ? 'PT' : 'EN'} pair (${pair})`);
  }

  if (await exists(contentDir)) {
    const shown = (f) => path.relative(contentDir, f).split(path.sep).join('/');
    const items = new Set(await walk(contentDir));
    for (const item of items) {
      const parts = path.relative(contentDir, item).split(path.sep);
      // <collection>/<lang>/<rest>
      if (parts.length < 3 || !LANGS[parts[1]]) continue;
      const pair = path.join(contentDir, parts[0], LANGS[parts[1]], ...parts.slice(2));
      if (!items.has(pair)) {
        errors.push(`content ${shown(item)} has no ${LANGS[parts[1]].toUpperCase()} pair (${shown(pair)})`);
      }
    }
  }
  return errors.sort();
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const distDir = path.resolve(process.argv[2] ?? 'dist');
  const contentDir = path.resolve(process.argv[3] ?? 'src/content');
  const errors = await checkPairs(distDir, contentDir);
  if (errors.length) {
    console.error('Missing PT/EN pairs (D-003):');
    for (const e of errors) console.error(`  ${e}`);
    process.exit(1);
  }
  console.log(`PT/EN pair check passed for ${path.relative(process.cwd(), distDir) || '.'} and ${path.relative(process.cwd(), contentDir)}.`);
}
