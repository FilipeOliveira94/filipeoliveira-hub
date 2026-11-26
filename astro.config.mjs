import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// The site URL and base path come only from the environment (AGENTS.md §7).
// CI sets them from actions/configure-pages; locally both may be left unset.
const site = process.env.SITE_URL || undefined;
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
