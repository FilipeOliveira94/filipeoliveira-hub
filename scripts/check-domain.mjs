// Checks the custom domain on the live site (I-23, D-026).
// Usage: node scripts/check-domain.mjs --site <https origin> --pages <github.io URL>
//   e.g. --site https://filipeoliveira-hub.com.br
//        --pages https://filipeoliveira94.github.io/filipeoliveira-hub/
// Passes when:
// - the site's home pages (PT and EN) answer 200 over HTTPS. Node's fetch
//   rejects an invalid or mismatched certificate, so a 200 also proves it;
// - http:// on the apex, https://www. and the github.io URL (PT and EN) all
//   redirect to the same page on the site.
// It reads the network and DNS, so it is not part of CI; run it after the
// DNS changes have propagated and after each change to the Pages settings.
import { parseArgs } from 'node:util';
import { fileURLToPath } from 'node:url';

const MAX_REDIRECTS = 10;
const PATHS = ['/', '/en/'];

/** Follows redirects one hop at a time; returns the last URL and status, or an error. */
async function resolve(url, fetchImpl) {
  let current = url;
  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    let res;
    try {
      res = await fetchImpl(current, { redirect: 'manual' });
    } catch (err) {
      const code = err?.cause?.code ?? err?.cause?.message ?? err?.message ?? String(err);
      return { error: current === url ? `${url} failed: ${code}` : `${url} failed at ${current}: ${code}` };
    }
    const location = res.headers.get('location');
    if (res.status >= 300 && res.status < 400 && location) {
      current = new URL(location, current).href;
      continue;
    }
    return { url: current, status: res.status };
  }
  return { error: `${url} has more than ${MAX_REDIRECTS} redirects` };
}

/** Returns one message per check that fails; an empty list means the domain is live. */
export async function checkDomain({ site, pages, fetch: fetchImpl = globalThis.fetch }) {
  const origin = new URL(site);
  if (origin.protocol !== 'https:' || origin.pathname !== '/' || origin.search || origin.hash) {
    throw new Error(`--site must be an https origin with no path, got "${site}".`);
  }
  const pagesBase = new URL(pages.endsWith('/') ? pages : `${pages}/`);
  const target = (p) => new URL(p, origin).href;

  const checks = [];
  for (const p of PATHS) checks.push({ from: target(p), to: target(p) });
  const http = new URL(origin);
  http.protocol = 'http:';
  checks.push({ from: http.href, to: target('/') });
  checks.push({ from: `https://www.${origin.host}/`, to: target('/') });
  for (const p of PATHS) checks.push({ from: new URL(`.${p}`, pagesBase).href, to: target(p) });

  const errors = [];
  for (const { from, to } of checks) {
    const r = await resolve(from, fetchImpl);
    if (r.error) errors.push(r.error);
    else if (r.url !== to) errors.push(`${from} ends at ${r.url}, expected ${to}`);
    else if (r.status !== 200) errors.push(`${from === to ? from : `${from} → ${to}`} returned ${r.status}`);
  }
  return errors;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const { values } = parseArgs({ options: { site: { type: 'string' }, pages: { type: 'string' } } });
  if (!values.site || !values.pages) {
    console.error('Usage: node scripts/check-domain.mjs --site <https origin> --pages <github.io URL>');
    process.exit(2);
  }
  const errors = await checkDomain(values);
  if (errors.length) {
    console.error('Custom domain check failed (I-23):');
    for (const e of errors) console.error(`  ${e}`);
    process.exit(1);
  }
  console.log(`Custom domain check passed: ${values.site} serves PT and EN over HTTPS; http, www and ${values.pages} redirect to it.`);
}
