// Fails when an internal link or asset in dist/ does not resolve (I-01).
// Usage: BASE_PATH=/filipeoliveira-hub node scripts/check-links.mjs [distDir]
// Checks href, src and srcset in every HTML file and url() in every CSS file.
// An absolute internal URL must start with the base path and point to a file
// in dist/; a #fragment must match an id on the target page.
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { normalizeBase, resolveFile, walk } from './lib/dist.mjs';

const EXTERNAL = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;

function htmlRefs(html) {
  const refs = [];
  for (const m of html.matchAll(/\s(?:href|src)\s*=\s*(?:"([^"]*)"|'([^']*)')/gi)) {
    refs.push(m[1] ?? m[2]);
  }
  for (const m of html.matchAll(/\ssrcset\s*=\s*(?:"([^"]*)"|'([^']*)')/gi)) {
    refs.push(...srcsetUrls(m[1] ?? m[2]));
  }
  return refs;
}

/**
 * The URLs of a srcset, parsed as the HTML spec does: a URL runs to the next
 * whitespace, so a data: URL with commas inside stays whole; a trailing comma
 * ends a candidate without descriptors.
 */
export function srcsetUrls(srcset) {
  const urls = [];
  let rest = srcset;
  for (;;) {
    rest = rest.replace(/^[\s,]+/, '');
    if (!rest) return urls;
    let url = rest.match(/^\S+/)[0];
    rest = rest.slice(url.length);
    if (url.endsWith(',')) {
      url = url.replace(/,+$/, '');
    } else {
      // Skip the descriptors, up to the comma that ends the candidate.
      const end = rest.indexOf(',');
      rest = end === -1 ? '' : rest.slice(end + 1);
    }
    if (url) urls.push(url);
  }
}

function cssRefs(css) {
  return [...css.matchAll(/url\(\s*(?:"([^"]*)"|'([^']*)'|([^)'"\s]+))\s*\)/gi)].map(
    (m) => m[1] ?? m[2] ?? m[3],
  );
}

function ids(html) {
  return new Set([...html.matchAll(/\sid\s*=\s*(?:"([^"]*)"|'([^']*)')/gi)].map((m) => m[1] ?? m[2]));
}

/**
 * Returns the list of broken references in distDir for the given base path.
 * Each item is "<file>: <reference> (<reason>)".
 */
export async function checkLinks(distDir, basePath = '/') {
  const base = normalizeBase(basePath);
  const files = await walk(distDir);
  const errors = [];
  const idCache = new Map();
  const pageIds = async (file) => {
    if (!idCache.has(file)) idCache.set(file, ids(await readFile(file, 'utf8')));
    return idCache.get(file);
  };

  for (const file of files) {
    const ext = path.extname(file);
    if (ext !== '.html' && ext !== '.css') continue;
    const text = await readFile(file, 'utf8');
    const refs = ext === '.html' ? htmlRefs(text) : cssRefs(text);
    const shown = path.relative(distDir, file);
    // URL path of this file, to resolve relative references against.
    const selfPath = base + path.relative(distDir, file).split(path.sep).join('/');

    for (const ref of refs) {
      if (!ref || EXTERNAL.test(ref) || ref.startsWith('data:')) continue;
      const url = new URL(ref, `http://site.invalid${selfPath}`);
      if (ref.startsWith('#')) {
        const id = decodeURIComponent(url.hash.slice(1));
        if (id && !(await pageIds(file)).has(id)) errors.push(`${shown}: ${ref} (no element with this id)`);
        continue;
      }
      const pathname = url.pathname;
      if (pathname !== base.replace(/\/$/, '') && !pathname.startsWith(base)) {
        errors.push(`${shown}: ${ref} (outside the base path ${base})`);
        continue;
      }
      const target = await resolveFile(distDir, pathname.slice(base.length));
      if (!target) {
        errors.push(`${shown}: ${ref} (no file in ${path.basename(distDir)}/)`);
        continue;
      }
      const id = decodeURIComponent(url.hash.slice(1));
      if (id && target.endsWith('.html') && !(await pageIds(target)).has(id)) {
        errors.push(`${shown}: ${ref} (no element with id "${id}" on the target page)`);
      }
    }
  }
  return errors;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const distDir = path.resolve(process.argv[2] ?? 'dist');
  const basePath = process.env.BASE_PATH || '/';
  const errors = await checkLinks(distDir, basePath);
  if (errors.length) {
    console.error(`Broken internal references (BASE_PATH=${basePath}):`);
    for (const e of errors) console.error(`  ${e}`);
    process.exit(1);
  }
  console.log(`Link check passed for ${distDir} (BASE_PATH=${basePath}).`);
}
