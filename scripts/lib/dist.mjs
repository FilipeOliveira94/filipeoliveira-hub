// Helpers shared by the checks that read the built site in dist/ (I-01, I-04).
import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';

/** Lists every file under dir, recursively. */
export async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

/** Lists the HTML pages under distDir as paths relative to it, with "/" separators, sorted. */
export async function htmlPages(distDir) {
  return (await walk(distDir))
    .filter((f) => f.endsWith('.html'))
    .map((f) => path.relative(distDir, f).split(path.sep).join('/'))
    .sort();
}

async function isFile(file) {
  try {
    return (await stat(file)).isFile();
  } catch {
    return false;
  }
}

/** Turns a BASE_PATH value into "/" or "/<path>/". */
export function normalizeBase(basePath = '/') {
  return `/${basePath.replace(/^\/+|\/+$/g, '')}/`.replace(/^\/\/$/, '/');
}

/** Resolves a URL path inside dist/ to a file, the way GitHub Pages does; null when none. */
export async function resolveFile(distDir, sitePath) {
  const rel = decodeURIComponent(sitePath).replace(/^\/+/, '');
  const candidates = rel === '' || rel.endsWith('/')
    ? [path.join(distDir, rel, 'index.html')]
    : [path.join(distDir, rel), path.join(distDir, rel, 'index.html'), path.join(distDir, `${rel}.html`)];
  for (const c of candidates) if (await isFile(c)) return c;
  return null;
}
