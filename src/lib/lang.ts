// Languages and the PT/EN path mirror (D-003): PT at the root, EN under /en/
// with the same path. Interface strings live in src/i18n/ui.ts (I-07).

export type Lang = 'pt-BR' | 'en';

const EN_PREFIX = /^\/en(?=\/|$)/;

/** The language of a site path (without the base path). */
export function langOf(sitePath: string): Lang {
  return EN_PREFIX.test(sitePath) ? 'en' : 'pt-BR';
}

/** The site path of the same page in the other language: /x ↔ /en/x. */
export function alternatePath(sitePath: string): string {
  const path = sitePath.startsWith('/') ? sitePath : `/${sitePath}`;
  if (EN_PREFIX.test(path)) return path.replace(EN_PREFIX, '') || '/';
  return path === '/' ? '/en/' : `/en${path}`;
}

/** The site path of a page in the given language. */
export function pathIn(lang: Lang, sitePath: string): string {
  const path = sitePath.startsWith('/') ? sitePath : `/${sitePath}`;
  return langOf(path) === lang ? path : alternatePath(path);
}

/**
 * The hreflang alternates of a page (I-07): its PT and EN versions, and PT as
 * x-default. Every page lists both, itself included, so the links are
 * reciprocal; scripts/check-pairs.mjs checks that in dist/.
 */
export function alternates(sitePath: string): { hreflang: Lang | 'x-default'; path: string }[] {
  const pt = pathIn('pt-BR', sitePath);
  return [
    { hreflang: 'pt-BR', path: pt },
    { hreflang: 'en', path: pathIn('en', sitePath) },
    { hreflang: 'x-default', path: pt },
  ];
}

/** Strips the base path from a URL pathname, keeping a leading slash. */
export function sitePathOf(pathname: string, base: string): string {
  const prefix = base.replace(/\/+$/, '');
  const rest = prefix && pathname.startsWith(prefix) ? pathname.slice(prefix.length) : pathname;
  return rest.startsWith('/') ? rest : `/${rest}`;
}

export const HOME: Record<Lang, string> = { 'pt-BR': '/', en: '/en/' };

/**
 * Header links, only to pages that exist (Filipe, I-06). Cases and Projects
 * join when I-13 and I-15 add their pages.
 */
export const NAV: { key: 'home'; path: Record<Lang, string> }[] = [{ key: 'home', path: HOME }];
