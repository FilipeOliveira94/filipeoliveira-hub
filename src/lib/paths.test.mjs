// Plain JS so astro check needs no @types/node; Node strips the types of paths.ts.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { joinBase } from './paths.ts';

const ROOT = '/';
const PAGES = '/filipeoliveira-hub';

test('home page', () => {
  assert.equal(joinBase(ROOT, '/'), '/');
  assert.equal(joinBase(ROOT, ''), '/');
  assert.equal(joinBase(PAGES, '/'), '/filipeoliveira-hub/');
  assert.equal(joinBase(PAGES, ''), '/filipeoliveira-hub/');
});

test('page paths with and without leading and trailing slashes', () => {
  assert.equal(joinBase(ROOT, '/en/'), '/en/');
  assert.equal(joinBase(ROOT, 'en/'), '/en/');
  assert.equal(joinBase(ROOT, 'en'), '/en');
  assert.equal(joinBase(PAGES, '/en/'), '/filipeoliveira-hub/en/');
  assert.equal(joinBase(PAGES, 'en'), '/filipeoliveira-hub/en');
});

test('base path with a trailing slash or repeated slashes', () => {
  assert.equal(joinBase('/filipeoliveira-hub/', '/en/'), '/filipeoliveira-hub/en/');
  assert.equal(joinBase('/filipeoliveira-hub/', '//en'), '//en'); // protocol-relative: external
  assert.equal(joinBase('/filipeoliveira-hub//', 'en'), '/filipeoliveira-hub/en');
});

test('assets', () => {
  assert.equal(joinBase(ROOT, '/favicon.svg'), '/favicon.svg');
  assert.equal(joinBase(PAGES, '/favicon.svg'), '/filipeoliveira-hub/favicon.svg');
  assert.equal(joinBase(PAGES, 'fonts/urbanist.woff2'), '/filipeoliveira-hub/fonts/urbanist.woff2');
});

test('anchors and queries', () => {
  assert.equal(joinBase(PAGES, '#main'), '#main');
  assert.equal(joinBase(ROOT, '#main'), '#main');
  assert.equal(joinBase(PAGES, '/cases/#diagram'), '/filipeoliveira-hub/cases/#diagram');
  assert.equal(joinBase(ROOT, '/cases/?lang=en#top'), '/cases/?lang=en#top');
});

test('external URLs are unchanged', () => {
  for (const url of [
    'https://github.com/FilipeOliveira94',
    'mailto:someone@example.com',
    '//cdn.example.com/x.js',
  ]) {
    assert.equal(joinBase(PAGES, url), url);
    assert.equal(joinBase(ROOT, url), url);
  }
});
