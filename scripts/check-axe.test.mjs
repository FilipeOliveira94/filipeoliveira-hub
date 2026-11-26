import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { checkAxe, serveDist } from './check-axe.mjs';

async function site(files) {
  const dir = await mkdtemp(path.join(tmpdir(), 'check-axe-'));
  for (const [name, body] of Object.entries(files)) {
    const file = path.join(dir, name);
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, body);
  }
  return dir;
}

const page = (lang, body, style = '') =>
  `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><title>t</title>` +
  `<style>:root{color-scheme:light dark}${style}</style></head><body><main><h1>Title</h1>${body}</main></body></html>`;

// The browser tests need Chrome: CHROME_PATH or the system Google Chrome.
const hasChrome = Boolean(process.env.CHROME_PATH) || existsSync('/opt/google/chrome/chrome');

test('the server maps the base path like GitHub Pages', async () => {
  const dir = await site({ 'index.html': 'home', 'en/index.html': 'en', '404.html': 'missing' });
  const server = await serveDist(dir, '/filipeoliveira-hub');
  const get = async (p) => {
    const res = await fetch(`${server.origin}${p}`);
    return `${res.status} ${await res.text()}`;
  };
  assert.equal(await get('/filipeoliveira-hub/'), '200 home');
  assert.equal(await get('/filipeoliveira-hub'), '200 home');
  assert.equal(await get('/filipeoliveira-hub/en'), '200 en');
  assert.equal(await get('/filipeoliveira-hub/en/index.html'), '200 en');
  assert.equal(await get('/en/'), '404 missing');
  assert.equal(await get('/filipeoliveira-hub/nope'), '404 missing');
  await server.close();
  await rm(dir, { recursive: true });
});

test('an accessible page passes in light and dark', { skip: !hasChrome && 'no Chrome' }, async () => {
  const dir = await site({ 'index.html': page('pt-BR', '<p>Texto</p>') });
  assert.deepEqual(await checkAxe(dir, '/'), []);
  await rm(dir, { recursive: true });
});

test('violations fail, including one that appears only in dark', { skip: !hasChrome && 'no Chrome' }, async () => {
  const dir = await site({
    'index.html': page('pt-BR', '<img src="x.svg">'),
    'en/index.html': page(
      'en',
      '<p class="low">Low contrast in dark</p>',
      '.low{color:#000}@media (prefers-color-scheme:dark){body{background:#000;color:#fff}.low{color:#111}}',
    ),
    'x.svg': '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"/>',
  });
  const errors = await checkAxe(dir, '/');
  assert.ok(errors.some((e) => e.startsWith('index.html [light] image-alt')), errors.join('\n'));
  assert.ok(errors.some((e) => e.startsWith('index.html [dark] image-alt')), errors.join('\n'));
  assert.ok(errors.some((e) => e.startsWith('en/index.html [dark] color-contrast')), errors.join('\n'));
  assert.ok(!errors.some((e) => e.startsWith('en/index.html [light]')), errors.join('\n'));
  await rm(dir, { recursive: true });
});
