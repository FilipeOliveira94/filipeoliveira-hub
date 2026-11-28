// Fails when a page or a content item lacks its PT/EN pair (I-04, D-003).
// Usage: node scripts/check-pairs.mjs [distDir] [contentDir]
// Pages: PT lives at the root of dist/ and EN under dist/en/ with the same
// path, so every HTML page needs its mirror. 404.html is exempt: GitHub Pages
// serves a single root 404 for every path. If I-07 translates the slugs, this
// mapping changes with it.
// hreflang (I-07): every page with a pair lists pt-BR and x-default pointing
// to the PT page and en pointing to the EN page. Both pages of a pair are
// checked, so the links are reciprocal. An href may be absolute (published
// build) or root-relative; BASE_PATH is stripped before it is resolved.
// Content items: a file under src/content/<collection>/pt/ needs the same path
// under en/, and the reverse (Astro's i18n layout); messages show paths
// relative to src/content/. A file that holds both languages, outside pt/ and
// en/, is checked by its collection schema (I-08).
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { htmlPages, normalizeBase, resolveFile, walk } from './lib/dist.mjs';

const EXEMPT_PAGES = new Set(['404.html']);
const LANGS = { pt: 'en', en: 'pt' };

/** The hreflang → href map of the <link rel="alternate"> tags of an HTML page. */
export function hreflangLinks(html) {
  const links = {};
  for (const [tag] of html.matchAll(/<link\b[^>]*>/gi)) {
    const attr = (name) => tag.match(new RegExp(`\\s${name}=(?:"([^"]*)"|'([^']*)')`, 'i'))?.slice(1).find((v) => v !== undefined);
    if (attr('rel')?.toLowerCase() !== 'alternate') continue;
    const lang = attr('hreflang');
    if (lang) links[lang] = attr('href') ?? '';
  }
  return links;
}

/** The dist/ page an href resolves to, relative to distDir; null when none. */
async function pageOf(distDir, href, base) {
  let pathname;
  try {
    pathname = new URL(href, 'http://site.invalid').pathname;
  } catch {
    return null;
  }
  const prefix = base.replace(/\/$/, '');
  if (prefix && !(pathname === prefix || pathname.startsWith(`${prefix}/`))) return null;
  const file = await resolveFile(distDir, pathname.slice(prefix.length) || '/');
  return file && path.relative(distDir, file).split(path.sep).join('/');
}

async function exists(dir) {
  try {
    return (await stat(dir)).isDirectory();
  } catch {
    return false;
  }
}

/** Returns one message per page or content item whose pair is missing. */
export async function checkPairs(distDir, contentDir, basePath = '/') {
  const errors = [];
  const base = normalizeBase(basePath);

  const pages = new Set((await htmlPages(distDir)).filter((p) => !EXEMPT_PAGES.has(p)));
  for (const page of pages) {
    const isEn = page.startsWith('en/');
    const pair = isEn ? page.slice(3) : `en/${page}`;
    if (!pages.has(pair)) {
      errors.push(`page ${page} has no ${isEn ? 'PT' : 'EN'} pair (${pair})`);
      continue;
    }
    const pt = isEn ? pair : page;
    const expected = { 'pt-BR': pt, en: isEn ? page : pair, 'x-default': pt };
    const links = hreflangLinks(await readFile(path.join(distDir, page), 'utf8'));
    for (const [lang, want] of Object.entries(expected)) {
      if (!(lang in links)) {
        errors.push(`page ${page} has no hreflang ${lang} link`);
        continue;
      }
      const got = await pageOf(distDir, links[lang], base);
      if (got !== want) errors.push(`page ${page}: hreflang ${lang} (${links[lang]}) should point to ${want}`);
    }
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
  const errors = await checkPairs(distDir, contentDir, process.env.BASE_PATH);
  if (errors.length) {
    console.error('Missing PT/EN pairs or hreflang links (D-003, I-07):');
    for (const e of errors) console.error(`  ${e}`);
    process.exit(1);
  }
  console.log(`PT/EN pair check passed for ${path.relative(process.cwd(), distDir) || '.'} and ${path.relative(process.cwd(), contentDir)}.`);
}
