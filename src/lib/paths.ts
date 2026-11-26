// The single helper for internal links and assets (I-01). Every href and src
// that points inside the site goes through withBase, so the same build works
// at the domain root and under the GitHub Pages project path.

const EXTERNAL = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;

/**
 * Joins a base path and a site path. External URLs (with a scheme, or
 * protocol-relative) and bare anchors are returned unchanged. The trailing
 * slash, query and anchor of `path` are kept.
 */
export function joinBase(base: string, path: string): string {
  if (EXTERNAL.test(path) || path.startsWith('#')) return path;
  const prefix = base.replace(/\/+$/, '');
  const rest = path.replace(/^\/+/, '');
  return `${prefix}/${rest}`;
}

/** Prefixes a site path with the base path the build was configured with. */
export function withBase(path: string): string {
  return joinBase(import.meta.env.BASE_URL, path);
}
