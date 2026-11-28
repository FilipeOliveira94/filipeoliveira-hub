import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// The site URL and base path come only from the environment (AGENTS.md §7).
// The published build gets SITE_URL from actions/configure-pages. Any other
// build (local, and the CI check builds) uses the local preview origin, so
// absolute URLs such as the hreflang links (I-07) stay valid there.
const site = process.env.SITE_URL || 'http://localhost:4321';
const base = process.env.BASE_PATH || '/';

if (!base.startsWith('/')) {
  throw new Error(`BASE_PATH must start with "/", got "${base}".`);
}

export default defineConfig({
  site,
  base,
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [mdx()],
});
