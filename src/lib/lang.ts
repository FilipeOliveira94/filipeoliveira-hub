// Languages and the PT/EN path mirror (D-003): PT at the root, EN under /en/
// with the same path. I-07 extends this with the dictionary and hreflang.

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

/** Strips the base path from a URL pathname, keeping a leading slash. */
export function sitePathOf(pathname: string, base: string): string {
  const prefix = base.replace(/\/+$/, '');
  const rest = prefix && pathname.startsWith(prefix) ? pathname.slice(prefix.length) : pathname;
  return rest.startsWith('/') ? rest : `/${rest}`;
}

/** Interface strings of the layout. I-07 moves them into its dictionary. */
export const UI = {
  'pt-BR': {
    skip: 'Pular para o conteúdo',
    home: 'Início',
    nav: 'Principal',
    logoAlt: 'Filipe Oliveira, Engenheiro de Dados & Software',
    logoLink: 'Filipe Oliveira, página inicial',
    language: 'Idioma',
    short: 'PT',
    name: 'Português',
    contact: 'Contato',
    email: 'E-mail',
  },
  en: {
    skip: 'Skip to content',
    home: 'Home',
    nav: 'Main',
    logoAlt: 'Filipe Oliveira, Data & Software Engineer',
    logoLink: 'Filipe Oliveira, home page',
    language: 'Language',
    short: 'EN',
    name: 'English',
    contact: 'Contact',
    email: 'E-mail',
  },
} as const;

export const HOME: Record<Lang, string> = { 'pt-BR': '/', en: '/en/' };

/**
 * Header links, only to pages that exist (Filipe, I-06). Cases and Projects
 * join when I-13 and I-15 add their pages.
 */
export const NAV: { key: 'home'; path: Record<Lang, string> }[] = [{ key: 'home', path: HOME }];

/** Footer contact links (Filipe's answer in I-06). */
export const CONTACT = {
  email: 'filipeoliveira94@hotmail.com',
  linkedin: 'https://www.linkedin.com/in/filipe-oliveira94/',
  github: 'https://github.com/FilipeOliveira94',
} as const;
