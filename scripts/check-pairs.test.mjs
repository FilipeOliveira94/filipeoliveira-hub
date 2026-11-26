import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { checkPairs } from './check-pairs.mjs';

async function tree(files) {
  const dir = await mkdtemp(path.join(tmpdir(), 'check-pairs-'));
  for (const name of files) {
    const file = path.join(dir, name);
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, '');
  }
  return dir;
}

test('pages and content items with both languages pass', async () => {
  const root = await tree([
    'dist/index.html',
    'dist/en/index.html',
    'dist/projetos/index.html',
    'dist/en/projetos/index.html',
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
  const root = await tree(['dist/index.html', 'dist/projetos/index.html', 'dist/en/index.html', 'dist/en/blog.html']);
  const errors = await checkPairs(path.join(root, 'dist'), path.join(root, 'src/content'));
  assert.deepEqual(errors, [
    'page en/blog.html has no PT pair (blog.html)',
    'page projetos/index.html has no EN pair (en/projetos/index.html)',
  ]);
  await rm(root, { recursive: true });
});

test('a content item without its pair fails in both directions', async () => {
  const root = await tree([
    'dist/index.html',
    'dist/en/index.html',
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
  const root = await tree(['dist/index.html', 'dist/en/index.html']);
  assert.deepEqual(await checkPairs(path.join(root, 'dist'), path.join(root, 'src/content')), []);
  await assert.rejects(checkPairs(path.join(root, 'nothing'), path.join(root, 'src/content')));
  await rm(root, { recursive: true });
});
