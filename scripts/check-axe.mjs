// Fails when axe-core finds an accessibility violation on any page of dist/
// (I-04, D-014). Every HTML page is checked with prefers-color-scheme light and
// dark (D-023), with all of axe's rules except the experimental ones.
// Usage: BASE_PATH=/ node scripts/check-axe.mjs [distDir]
// Chrome: CHROME_PATH, or the installed Google Chrome (as on GitHub runners).
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import axe from 'axe-core';
import puppeteer from 'puppeteer-core';
import { htmlPages, normalizeBase, resolveFile } from './lib/dist.mjs';

export const SCHEMES = ['light', 'dark'];

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
};

/** Serves distDir under the base path on 127.0.0.1, the way GitHub Pages does. */
export async function serveDist(distDir, basePath = '/') {
  const base = normalizeBase(basePath);
  const server = createServer(async (req, res) => {
    const pathname = new URL(req.url, 'http://localhost').pathname;
    const inBase = pathname === base.replace(/\/$/, '') ? '' : pathname.startsWith(base) && pathname.slice(base.length);
    const file = inBase === false ? null : await resolveFile(distDir, inBase);
    if (file) {
      res.writeHead(200, { 'content-type': TYPES[path.extname(file)] ?? 'application/octet-stream' });
      res.end(await readFile(file));
      return;
    }
    const notFound = path.join(distDir, '404.html');
    res.writeHead(404, { 'content-type': 'text/html; charset=utf-8' });
    res.end(existsSync(notFound) ? await readFile(notFound) : 'Not found');
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  return { origin, base, close: () => new Promise((resolve) => server.close(resolve)) };
}

/** Options to launch Chrome: CHROME_PATH, else the system Google Chrome. */
export function chromeOptions() {
  const executablePath = process.env.CHROME_PATH;
  return {
    ...(executablePath ? { executablePath } : { channel: 'chrome' }),
    headless: true,
    args: process.env.CHROME_NO_SANDBOX ? ['--no-sandbox'] : [],
  };
}

/** Returns one message per axe violation, for every page of distDir in light and dark. */
export async function checkAxe(distDir, basePath = '/') {
  const pages = await htmlPages(distDir);
  if (!pages.length) throw new Error(`No HTML page in ${distDir}.`);
  const server = await serveDist(distDir, basePath);
  const browser = await puppeteer.launch(chromeOptions());
  const errors = [];
  try {
    for (const page of pages) {
      for (const scheme of SCHEMES) {
        const tab = await browser.newPage();
        await tab.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: scheme }]);
        await tab.goto(`${server.origin}${server.base}${page}`, { waitUntil: 'load' });
        await tab.addScriptTag({ content: axe.source });
        const violations = await tab.evaluate(async () => {
          // eslint-disable-next-line no-undef -- axe is injected into the page above.
          const result = await window.axe.run(document, { resultTypes: ['violations'] });
          return result.violations.map((v) => ({
            id: v.id,
            impact: v.impact,
            help: v.help,
            targets: v.nodes.map((n) => n.target.join(' ')),
          }));
        });
        for (const v of violations) {
          errors.push(`${page} [${scheme}] ${v.id} (${v.impact}): ${v.help} — ${v.targets.slice(0, 3).join(', ')}`);
        }
        await tab.close();
      }
    }
  } finally {
    await browser.close();
    await server.close();
  }
  return errors;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const distDir = path.resolve(process.argv[2] ?? 'dist');
  const basePath = process.env.BASE_PATH || '/';
  const errors = await checkAxe(distDir, basePath);
  if (errors.length) {
    console.error(`axe violations (BASE_PATH=${basePath}):`);
    for (const e of errors) console.error(`  ${e}`);
    process.exit(1);
  }
  const count = (await htmlPages(distDir)).length;
  console.log(`axe check passed: ${count} page(s) in ${SCHEMES.join(' and ')} (BASE_PATH=${basePath}).`);
}
