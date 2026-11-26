import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { checkLinks } from './check-links.mjs';

async function site(files) {
  const dir = await mkdtemp(path.join(tmpdir(), 'check-links-'));
  for (const [name, body] of Object.entries(files)) {
    const file = path.join(dir, name);
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, body);
  }
  return dir;
}

const page = (body) => `<!doctype html><html><head></head><body>${body}</body></html>`;

for (const base of ['/', '/filipeoliveira-hub']) {
  const p = base === '/' ? '' : base;

  test(`valid links, assets and anchors pass (BASE_PATH=${base})`, async () => {
    const dir = await site({
      'index.html': page(
        `<a href="${p}/">home</a><a href="${p}/en/">en</a><a href="${p}/en/#top">top</a>` +
          `<a href="#main">skip</a><main id="main"></main>` +
          `<link rel="stylesheet" href="${p}/_astro/a.css"><img src="${p}/img/x.svg" srcset="${p}/img/x.svg 1x, ${p}/img/x.svg 2x">` +
          `<a href="https://example.com/">ext</a><a href="mailto:a@example.com">mail</a>`,
      ),
      'en/index.html': page('<h1 id="top">EN</h1><a href="../">back</a>'),
      '_astro/a.css': `body{background:url("${p}/img/x.svg")}`,
      'img/x.svg': '<svg xmlns="http://www.w3.org/2000/svg"/>',
    });
    assert.deepEqual(await checkLinks(dir, base), []);
    await rm(dir, { recursive: true });
  });

  test(`broken references fail (BASE_PATH=${base})`, async () => {
    const dir = await site({
      'index.html': page(
        `<a href="${p}/missing/">x</a><img src="${p}/nope.png"><a href="#gone">x</a><a href="${p}/#gone">x</a>`,
      ),
      '_astro/a.css': `body{background:url(${p}/missing.woff2)}`,
    });
    const errors = await checkLinks(dir, base);
    assert.equal(errors.length, 5, errors.join('\n'));
    await rm(dir, { recursive: true });
  });
}

test('a root link fails when the site is under a project path', async () => {
  const dir = await site({ 'index.html': page('<a href="/en/">en</a>'), 'en/index.html': page('') });
  const errors = await checkLinks(dir, '/filipeoliveira-hub');
  assert.equal(errors.length, 1);
  assert.match(errors[0], /outside the base path/);
  await rm(dir, { recursive: true });
});
