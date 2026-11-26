import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import globals from 'globals';

export default [
  { ignores: ['dist/', '.astro/', '.assets/', '.lighthouseci/', 'node_modules/'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    files: ['**/*.{js,mjs}'],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['**/*.cjs'],
    languageOptions: { sourceType: 'commonjs', globals: globals.node },
  },
];
