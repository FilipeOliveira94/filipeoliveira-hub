// Prints the Lighthouse scores of every page as a Markdown table (I-04, D-014).
// CI appends it to the job summary, which is where the performance score is
// reported. Usage: node scripts/lighthouse-summary.mjs [lhciDir]
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const CATEGORIES = [
  ['performance', 'Performance', false],
  ['accessibility', 'Accessibility', true],
  ['best-practices', 'Best practices', true],
  ['seo', 'SEO', true],
];
export const MIN_SCORE = 0.95;

const cell = (score, gated) => {
  if (typeof score !== 'number') return 'n/a';
  const shown = String(Math.round(score * 100));
  return gated && score < MIN_SCORE ? `${shown} (below ${MIN_SCORE * 100})` : shown;
};

/** Builds the Markdown summary from the Lighthouse reports (lhr-*.json) in lhciDir. */
export async function summarize(lhciDir) {
  let files = [];
  try {
    files = (await readdir(lhciDir)).filter((f) => /^lhr-.*\.json$/.test(f));
  } catch {
    // No reports: Lighthouse did not run.
  }
  if (!files.length) return '### Lighthouse\n\nNo Lighthouse report was found.\n';

  const rows = [];
  for (const file of files) {
    const lhr = JSON.parse(await readFile(path.join(lhciDir, file), 'utf8'));
    const page = new URL(lhr.finalDisplayedUrl ?? lhr.requestedUrl).pathname;
    rows.push([page, ...CATEGORIES.map(([id, , gated]) => cell(lhr.categories[id]?.score, gated))]);
  }
  rows.sort((a, b) => a[0].localeCompare(b[0]));

  return [
    '### Lighthouse',
    '',
    `| Page | ${CATEGORIES.map(([, name]) => name).join(' | ')} |`,
    `| --- | ${CATEGORIES.map(() => '---').join(' | ')} |`,
    ...rows.map((r) => `| \`${r[0]}\` | ${r.slice(1).join(' | ')} |`),
    '',
    `Accessibility, best practices and SEO below ${MIN_SCORE * 100} fail the check; performance is reported only (D-014).`,
    '',
  ].join('\n');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  process.stdout.write(await summarize(path.resolve(process.argv[2] ?? '.lighthouseci')));
}
