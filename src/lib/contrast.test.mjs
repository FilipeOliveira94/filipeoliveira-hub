import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { TEXT_PAIRS, contrast, parseTokens } from './contrast.mjs';

const css = await readFile(new URL('../assets/brand/tokens.css', import.meta.url), 'utf8');
const themes = parseTokens(css);

test('contrast() matches known WCAG ratios', () => {
  assert.equal(contrast('#000000', '#FFFFFF').toFixed(2), '21.00');
  assert.equal(contrast('#777777', '#FFFFFF').toFixed(2), '4.48');
});

test('both themes define every token the pairs use', () => {
  for (const [name, tokens] of Object.entries(themes)) {
    for (const token of TEXT_PAIRS.flat()) assert.ok(tokens[token], `${name} lacks --fi-${token}`);
  }
});

for (const [name, tokens] of Object.entries(themes)) {
  for (const [fg, bg] of TEXT_PAIRS) {
    test(`${name}: --fi-${fg} on --fi-${bg} is at least 4.5:1`, () => {
      const ratio = contrast(tokens[fg], tokens[bg]);
      assert.ok(ratio >= 4.5, `${ratio.toFixed(2)}:1`);
    });
  }
}

test('the dark block under prefers-color-scheme matches [data-theme="dark"]', () => {
  const media = css.match(/@media \(prefers-color-scheme: dark\)\s*\{\s*:root[^{]*\{([^}]*)\}/);
  assert.ok(media, 'prefers-color-scheme block not found');
  const fromMedia = Object.fromEntries(
    [...media[1].matchAll(/--fi-([\w-]+):\s*(#[0-9a-f]{6})/gi)].map(([, n, h]) => [n, h]),
  );
  assert.deepEqual(fromMedia, themes.dark);
});
