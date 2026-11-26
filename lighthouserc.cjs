// Lighthouse CI (I-04, D-014). Runs on every page of a build at the root
// (BASE_PATH=/): the static server of LHCI serves dist/ at "/".
// Accessibility, best practices and SEO below 0.95 fail; performance is only
// reported (scripts/lighthouse-summary.mjs), since it varies between runs.
// Reports stay on disk in .lighthouseci/; nothing is uploaded to a public host.
module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
      maxAutodiscoverUrls: 0,
      numberOfRuns: 1,
      settings: {
        // The site is noindex until the release, which fails this audit by
        // design. I-18 removes noindex and this skip together.
        skipAudits: ['is-crawlable'],
      },
    },
    assert: {
      assertions: {
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 0.95 }],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: '.lighthouseci/reports',
    },
  },
};
