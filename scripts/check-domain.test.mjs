import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkDomain } from './check-domain.mjs';

const SITE = 'https://example.com.br';
const PAGES = 'https://user.github.io/repo/';
const HOME = '<!doctype html><html lang="pt-BR"><body>home</body></html>';

/**
 * A fetch stub: each URL maps to a page (a string), a redirect ({ to }), a
 * status ({ status }) or a network error ({ error: code }). Unknown URLs fail
 * the way an unresolved host does.
 */
function stub(routes) {
  return async (url, init) => {
    assert.equal(init?.redirect, 'manual', 'redirects must be read, not followed');
    const r = routes[url];
    if (r === undefined || r.error) {
      throw new TypeError('fetch failed', { cause: { code: r?.error ?? 'ENOTFOUND' } });
    }
    if (typeof r === 'string') return new Response(r, { status: 200, headers: { 'content-type': 'text/html' } });
    if (r.to) return new Response(null, { status: r.status ?? 301, headers: { location: r.to } });
    return new Response('', { status: r.status });
  };
}

// What GitHub Pages serves once the domain, its DNS and Enforce HTTPS are set.
const live = {
  [`${SITE}/`]: HOME,
  [`${SITE}/en/`]: HOME,
  'http://example.com.br/': { to: `${SITE}/` },
  'https://www.example.com.br/': { to: `${SITE}/` },
  [PAGES]: { to: `${SITE}/` },
  'https://user.github.io/repo/en/': { to: `${SITE}/en/` },
};

test('a live domain with every redirect passes', async () => {
  assert.deepEqual(await checkDomain({ site: SITE, pages: PAGES, fetch: stub(live) }), []);
});

test('a redirect chain that ends on the domain passes', async () => {
  const routes = {
    ...live,
    'https://www.example.com.br/': { to: 'http://example.com.br/' },
  };
  assert.deepEqual(await checkDomain({ site: SITE, pages: PAGES, fetch: stub(routes) }), []);
});

test('an invalid certificate fails with its code', async () => {
  const routes = { ...live, [`${SITE}/`]: { error: 'ERR_TLS_CERT_ALTNAME_INVALID' } };
  const errors = await checkDomain({ site: SITE, pages: PAGES, fetch: stub(routes) });
  assert.ok(errors.some((e) => e.includes(`${SITE}/`) && e.includes('ERR_TLS_CERT_ALTNAME_INVALID')), errors.join('\n'));
});

test('HTTP that is served instead of redirected fails', async () => {
  const routes = { ...live, 'http://example.com.br/': HOME };
  const errors = await checkDomain({ site: SITE, pages: PAGES, fetch: stub(routes) });
  assert.deepEqual(errors, ['http://example.com.br/ ends at http://example.com.br/, expected https://example.com.br/']);
});

test('a www host without DNS fails', async () => {
  const routes = { ...live };
  delete routes['https://www.example.com.br/'];
  const errors = await checkDomain({ site: SITE, pages: PAGES, fetch: stub(routes) });
  assert.deepEqual(errors, ['https://www.example.com.br/ failed: ENOTFOUND']);
});

test('a github.io URL that still serves the site fails', async () => {
  const routes = { ...live, [PAGES]: HOME };
  const errors = await checkDomain({ site: SITE, pages: PAGES, fetch: stub(routes) });
  assert.deepEqual(errors, [`${PAGES} ends at ${PAGES}, expected ${SITE}/`]);
});

test('a github.io redirect that drops the path fails', async () => {
  const routes = { ...live, 'https://user.github.io/repo/en/': { to: `${SITE}/` } };
  const errors = await checkDomain({ site: SITE, pages: PAGES, fetch: stub(routes) });
  assert.deepEqual(errors, [`https://user.github.io/repo/en/ ends at ${SITE}/, expected ${SITE}/en/`]);
});

test('a page that is not 200 fails', async () => {
  const routes = { ...live, [`${SITE}/en/`]: { status: 404 } };
  const errors = await checkDomain({ site: SITE, pages: PAGES, fetch: stub(routes) });
  assert.ok(errors.includes(`${SITE}/en/ returned 404`), errors.join('\n'));
});

test('a redirect loop fails', async () => {
  const routes = {
    ...live,
    'https://www.example.com.br/': { to: 'https://www.example.com.br/a' },
    'https://www.example.com.br/a': { to: 'https://www.example.com.br/' },
  };
  const errors = await checkDomain({ site: SITE, pages: PAGES, fetch: stub(routes) });
  assert.deepEqual(errors, ['https://www.example.com.br/ has more than 10 redirects']);
});

test('a site URL that is not https or has a path is rejected', async () => {
  await assert.rejects(checkDomain({ site: 'http://example.com.br', pages: PAGES, fetch: stub(live) }), /https origin/);
  await assert.rejects(checkDomain({ site: `${SITE}/repo`, pages: PAGES, fetch: stub(live) }), /https origin/);
});
