import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { summarize } from './lighthouse-summary.mjs';

const lhr = (url, scores) => ({
  finalDisplayedUrl: url,
  categories: Object.fromEntries(Object.entries(scores).map(([id, score]) => [id, { score }])),
});

test('the summary lists every page with its four scores', async () => {
  const dir = await mkdtemp(path.join(tmpdir(), 'lh-summary-'));
  await writeFile(
    path.join(dir, 'lhr-2.json'),
    JSON.stringify(lhr('http://localhost:4000/index.html', { performance: 0.871, accessibility: 1, 'best-practices': 0.96, seo: 0.9 })),
  );
  await writeFile(
    path.join(dir, 'lhr-1.json'),
    JSON.stringify(lhr('http://localhost:4000/en/index.html', { performance: 1, accessibility: 0.94, 'best-practices': 1, seo: 1 })),
  );
  await writeFile(path.join(dir, 'assertion-results.json'), '[]');
  assert.equal(
    await summarize(dir),
    [
      '### Lighthouse',
      '',
      '| Page | Performance | Accessibility | Best practices | SEO |',
      '| --- | --- | --- | --- | --- |',
      '| `/en/index.html` | 100 | 94 (below 95) | 100 | 100 |',
      '| `/index.html` | 87 | 100 | 96 | 90 (below 95) |',
      '',
      'Accessibility, best practices and SEO below 95 fail the check; performance is reported only (D-014).',
      '',
    ].join('\n'),
  );
  await rm(dir, { recursive: true });
});

test('a missing report directory gives a short note', async () => {
  assert.match(await summarize(path.join(tmpdir(), 'no-such-lhci-dir')), /No Lighthouse report was found/);
});
