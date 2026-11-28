// Interface strings, one dictionary per language (I-07, D-003). The EN
// dictionary is typed against the PT one, so a key missing in either
// language fails `astro check`; ui.test.mjs checks the same at runtime.
// Page content (case studies, projects, the /brand/ sample) is not here.
import type { Lang } from '../lib/lang';

const pt = {
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
} as const;

export type UiKey = keyof typeof pt;

const en: Record<UiKey, string> = {
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
};

export const ui: Record<Lang, Record<UiKey, string>> = { 'pt-BR': pt, en };

/** The interface strings of a language. */
export function t(lang: Lang): Record<UiKey, string> {
  return ui[lang];
}
