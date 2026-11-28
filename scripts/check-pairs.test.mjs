import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { checkPairs } from './check-pairs.mjs';

// Each entry is a file name, or [name, contents].
async function tree(files) {
  const dir = await mkdtemp(path.join(tmpdir(), 'check-pairs-'));
  for (const entry of files) {
    const [name, contents] = Array.isArray(entry) ? entry : [entry, ''];
    const file = path.join(dir, name);
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, contents);
  }
  return dir;
}

/** The head of a page with the hreflang links BaseHead writes. */
function head(pt, en, xDefault = pt) {
  return [
    `<link rel="alternate" hreflang="pt-BR" href="${pt}">`,
    `<link rel="alternate" hreflang="en" href="${en}">`,
    `<link rel="alternate" hreflang="x-default" href="${xDefault}">`,
  ].join('');
}

test('pages and content items with both languages pass', async () => {
  const root = await tree([
    ['dist/index.html', head('/', '/en/')],
    ['dist/en/index.html', head('/', '/en/')],
    ['dist/projetos/index.html', head('https://example.com/projetos/', 'https://example.com/en/projetos/')],
    ['dist/en/projetos/index.html', head('/projetos', '/en/projetos/')],
    'dist/404.html',
    'dist/_astro/a.css',
    'src/content/cases/pt/open-data-platform.mdx',
    'src/content/cases/en/open-data-platform.mdx',
    'src/content/experience.yaml',
  ]);
  const errors = await checkPairs(path.join(root, 'dist'), path.join(root, 'src/content'));
  assert.deepEqual(errors, []);
  await rm(root, { recursive: true });
});

test('a page without its pair fails in both directions', async () => {
  const root = await tree([
    ['dist/index.html', head('/', '/en/')],
    'dist/projetos/index.html',
    ['dist/en/index.html', head('/', '/en/')],
    'dist/en/blog.html',
  ]);
  const errors = await checkPairs(path.join(root, 'dist'), path.join(root, 'src/content'));
  assert.deepEqual(errors, [
    'page en/blog.html has no PT pair (blog.html)',
    'page projetos/index.html has no EN pair (en/projetos/index.html)',
  ]);
  await rm(root, { recursive: true });
});

test('a content item without its pair fails in both directions', async () => {
  const root = await tree([
    ['dist/index.html', head('/', '/en/')],
    ['dist/en/index.html', head('/', '/en/')],
    'src/content/cases/pt/a.mdx',
    'src/content/cases/en/b.mdx',
    'src/content/projects/pt/nested/c.yaml',
    'src/content/projects/en/nested/c.yaml',
  ]);
  const errors = await checkPairs(path.join(root, 'dist'), path.join(root, 'src/content'));
  assert.deepEqual(errors, [
    'content cases/en/b.mdx has no PT pair (cases/pt/b.mdx)',
    'content cases/pt/a.mdx has no EN pair (cases/en/a.mdx)',
  ]);
  await rm(root, { recursive: true });
});

test('a missing content directory passes and a missing dist fails', async () => {
  const root = await tree([
    ['dist/index.html', head('/', '/en/')],
    ['dist/en/index.html', head('/', '/en/')],
  ]);
  assert.deepEqual(await checkPairs(path.join(root, 'dist'), path.join(root, 'src/content')), []);
  await assert.rejects(checkPairs(path.join(root, 'nothing'), path.join(root, 'src/content')));
  await rm(root, { recursive: true });
});

test('missing or wrong hreflang links fail', async () => {
  const root = await tree([
    ['dist/index.html', head('/', '/en/')],
    ['dist/en/index.html', '<link rel="alternate" hreflang="pt-BR" href="/">'],
    ['dist/a/index.html', head('/a/', '/en/b/', '/en/a/')],
    ['dist/en/a/index.html', head('/a/', '/en/a/')],
    ['dist/en/b/index.html', head('/b/', '/en/b/')],
    ['dist/b/index.html', head('/b/', '/en/b/')],
  ]);
  const errors = await checkPairs(path.join(root, 'dist'), path.join(root, 'src/content'));
  assert.deepEqual(errors, [
    'page a/index.html: hreflang en (/en/b/) should point to en/a/index.html',
    'page a/index.html: hreflang x-default (/en/a/) should point to a/index.html',
    'page en/index.html has no hreflang en link',
    'page en/index.html has no hreflang x-default link',
  ]);
  await rm(root, { recursive: true });
});

test('hreflang links are resolved under the base path', async () => {
  const root = await tree([
    ['dist/index.html', head('/hub/', '/hub/en/')],
    ['dist/en/index.html', head('/', '/en/')],
  ]);
  const errors = await checkPairs(path.join(root, 'dist'), path.join(root, 'src/content'), '/hub');
  assert.deepEqual(errors, [
    'page en/index.html: hreflang en (/en/) should point to en/index.html',
    'page en/index.html: hreflang pt-BR (/) should point to index.html',
    'page en/index.html: hreflang x-default (/) should point to index.html',
  ]);
  await rm(root, { recursive: true });
});
