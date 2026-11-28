// Plain JS so astro check needs no @types/node; Node strips the types of lang.ts.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { alternatePath, langOf, sitePathOf } from './lang.ts';

test('alternatePath mirrors PT and EN paths', () => {
  assert.equal(alternatePath('/'), '/en/');
  assert.equal(alternatePath('/en/'), '/');
  assert.equal(alternatePath('/en'), '/');
  assert.equal(alternatePath('/brand/'), '/en/brand/');
  assert.equal(alternatePath('/en/brand/'), '/brand/');
  assert.equal(alternatePath('brand/'), '/en/brand/');
});

test('alternatePath does not treat /english or /en-x as EN', () => {
  assert.equal(alternatePath('/english/'), '/en/english/');
  assert.equal(alternatePath('/en-x/'), '/en/en-x/');
});

test('langOf', () => {
  assert.equal(langOf('/'), 'pt-BR');
  assert.equal(langOf('/brand/'), 'pt-BR');
  assert.equal(langOf('/en'), 'en');
  assert.equal(langOf('/en/brand/'), 'en');
  assert.equal(langOf('/english/'), 'pt-BR');
});

test('sitePathOf strips the base path', () => {
  assert.equal(sitePathOf('/brand/', '/'), '/brand/');
  assert.equal(sitePathOf('/filipeoliveira-hub/en/brand/', '/filipeoliveira-hub'), '/en/brand/');
  assert.equal(sitePathOf('/filipeoliveira-hub/en/brand/', '/filipeoliveira-hub/'), '/en/brand/');
  assert.equal(sitePathOf('/filipeoliveira-hub', '/filipeoliveira-hub'), '/');
});
