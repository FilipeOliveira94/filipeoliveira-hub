import { test } from 'node:test';
import assert from 'node:assert/strict';
import { t, ui } from './ui.ts';

test('PT and EN dictionaries have the same keys, none empty', () => {
  const keys = Object.keys(ui['pt-BR']).sort();
  assert.deepEqual(Object.keys(ui.en).sort(), keys);
  for (const lang of ['pt-BR', 'en']) {
    for (const key of keys) assert.ok(ui[lang][key].trim(), `${lang}.${key} is empty`);
  }
});

test('t returns the dictionary of the language', () => {
  assert.equal(t('pt-BR').skip, 'Pular para o conteúdo');
  assert.equal(t('en').skip, 'Skip to content');
});
