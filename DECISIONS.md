# Decision log

Short index of the settled decisions for filipeoliveira-hub. The sources are the PO's final plan (`filipeoliveira-hub-final.md`, sections cited in the Source column) and Filipe's instructions for the repository structure, from 2026-11-15.

| Record | Reference |
| --- | --- |
| This file | Index of the decisions and the state of each one |
| Related | `ROADMAP.md`, `PROJECT_STATUS.md`, `AGENTS.md`, `docs/status-log.md` |

**How to use it:** the Decision column says what was chosen. The Implemented column says what already exists and was verified in the repository; it changes only with evidence from a verified issue, recorded in `docs/status-log.md`.

## States

| State | Meaning |
| --- | --- |
| `proposed` | Preferred for planning; not settled yet |
| `approved` | Settled by Filipe or by the final plan |
| `superseded` | Replaced by a later decision |
| `rejected` | Turned down; kept for reference |

## Index

| ID | Topic | Decision | Implemented | State | Source |
| --- | --- | --- | --- | --- | --- |
| D-001 | Stack | Astro, not Next with `output: 'export'`. The site is content: zero JS by default, built-in Content Collections with a Zod schema and MDX, built-in i18n in a static build, images optimized at build time and a `base` that a variable can change | — | `approved` | Plan §3 |
| D-002 | Hosting | GitHub Pages on the public repository `FilipeOliveira94/filipeoliveira-hub`, with Source = GitHub Actions. MVP URL: `https://filipeoliveira94.github.io/filipeoliveira-hub/` | — | `approved` | Plan §6 |
| D-003 | Languages and routes | PT at the root and EN under `/en/`. Every page and every content item has a PT/EN pair, and CI fails if one is missing. The English derived from the CV is a translation, reviewed by Filipe before the release (I-18) | — | `approved` | Plan §2, §4 |
| D-004 | Home page title | "Engenheiro de Dados Sênior", whatever the current job title | — | `approved` | Plan §1 |
| D-005 | Visual identity | New, created from scratch in I-05: palette, typography and tokens as CSS variables. The MVP ships with a light theme only; the dark theme is I-27 | — | `approved` | Plan §2, §5 |
| D-006 | Résumé | No CV PDF, no downloadable résumé and no HTML résumé page. Whoever asks for a PDF uses LinkedIn, which is on the first screen | — | `approved` | Plan §2, §4, §10 |
| D-007 | Content sources | Experience, skills, education, certifications, languages and metrics come only from the CV, from the old portfolio when the CV does not cover the point, or from Filipe's recorded answer. Nothing invented. A gap is recorded in the issue | — | `approved` | Plan §4 |
| D-008 | Base path | Astro's `site` and `base` come from `SITE_URL` and `BASE_PATH`, filled in the workflow from the output of `actions/configure-pages`. Every internal link and asset goes through a single helper | — | `approved` | Plan §6 |
| D-009 | Years counter | Pure function `yearsSince('2019-09-01', today)`, in full years. Computed at build time and corrected in the browser by a minimal inline script. The number is not written in any content file | — | `approved` | Plan §4 |
| D-010 | Diagrams | Mermaid in MDX becomes SVG at build time (`rehype-mermaid` with Playwright), with no JS in the browser. If Playwright makes the build too heavy, the alternative is to commit the SVGs generated with `mmdc` | — | `approved` | Plan §4 |
| D-011 | Contact and personal data | The home page shows e-mail, LinkedIn, GitHub and the location "São José dos Campos, SP, Brasil" (EN: "São José dos Campos, SP, Brazil"). No phone number | — | `approved` | Plan §2, §5 |
| D-012 | Certifications and courses | The four certifications from the CV appear with only the year obtained, no expiry. The Hadoop/Spark and Django courses, listed with the certifications in the CV, stay off the site. The Microsoft Fabric Data Engineer certification goes in only after it is issued | — | `approved` | Plan §2, §4 |
| D-013 | Project gallery | Two groups: data engineering ("Engenharia de dados") featured and analysis and ML ("Análise e ML") below. A description only with a source (the old gallery or the repository description on GitHub). Where the old link diverges from the current repository, `links` points to the current one and `legacyLinks` keeps the old one. The gallery keeps the notice that the projects' data is fictitious | — | `approved` | Plan §4, I-15 |
| D-014 | Quality | Lighthouse ≥ 95 in all four categories, Core Web Vitals "good" on mobile, zero axe violations and zero broken internal links in CI. Accessibility WCAG 2.2 AA. Budget: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1, JS ≤ 50 KB per page | — | `approved` | Plan §1, §5 |
| D-015 | PR checks and deploy | The PR runs `astro check`, build, link check, axe and Lighthouse CI. `main` publishes with `actions/deploy-pages` | — | `approved` | Plan §6 |
| D-016 | Analytics | GoatCounter, in phase 4 (I-24). Free for personal use, no cookies, open source, and it measures outbound clicks. Plausible is paid; Cloudflare Web Analytics does not measure those clicks. Outside the MVP | — | `approved` | Plan §6 |
| D-017 | Domain | `filipeoliveira-hub.com.br` only in phase 4 (I-23), after the purchase. Until then the site stays on the GitHub Pages URL. Outside the MVP | — | `approved` | Plan §6 |
| D-018 | MVP scope | See the "Scope" section below | — | `approved` | Plan §2 |
| D-019 | Workflow | Branch + PR per issue from phase 0. Claude in T3 Code plans, implements on a new branch from an up-to-date `main`, runs the checks, commits, pushes the branch and opens the PR with a summary; it never merges. Filipe reviews the PR, merges it and deletes the branch. No double approval. No PO or Reviewer bots; agent workflow profile `solo` (no review subagents). Each issue's size and risk decide whether the plan stops for approval. Replies, code and docs in English. Conventional Commits | Rules in `AGENTS.md` | `approved` | Filipe's instruction, 2026-11-15; revised on 2026-11-19, on 2026-11-20 (simplified flow) and on 2026-11-24 (bots removed) |
| D-020 | License | MIT, Copyright (c) 2026 Filipe Oliveira, the same license as open-data-platform | `LICENSE` | `approved` | Filipe's instruction, 2026-11-15 |
| D-021 | Original photos | Originals outside this repository, in the private `filipeoliveira-hub-assets` repository, fetched in the Actions build with a read-only deploy key. Details in [ADR-0001](docs/decisions/0001-private-assets-repository.md) | — | `approved` | Filipe's instruction, 2026-11-17 |

`—` means not yet implemented or verified in the repository.

## Scope (D-018)

**In the MVP:**

- Site on GitHub Pages, with PT at the root and EN under `/en/`.
- New visual identity.
- Home page with title, photo, e-mail, LinkedIn, GitHub, location, a dynamic counter since September 2019, skills, education, certifications, languages, an experience summary and highlights.
- The full open-data-platform case study, with diagrams.
- Project gallery, with engineering in focus and analysis in a separate group.
- Basic SEO, and accessibility and performance checks in CI.

**Outside the MVP (later):**

- Detailed professional experience page and client project sheets, including the professional numbers from the CV.
- Case studies of A Conta and PedsLetter.
- Blog, custom domain, analytics, per-page Open Graph images and dark theme.
- Microsoft Fabric Data Engineer certification, only after it is issued.

**Removed from the plan:**

- HTML résumé and downloadable PDF.
- `opendatasus_flu_analysis`, `agent-config` and the old portfolio as gallery items.
- The phone number, and the Hadoop/Spark and Django courses listed with the certifications in the CV.

## How to record a new decision

1. Add a row to the index, with the next ID, the decision, the state and the source (issue, Filipe's answer or document).
2. A decision that changes scope, stack or acceptance criteria needs Filipe's OK before it becomes `approved`.
3. Once the choice is built and verified, fill in Implemented with what actually exists.
4. Add a row to the Changelog.

## Changelog

| Date | Change |
| --- | --- |
| 2026-11-15 | Initial record: D-001 to D-018 from the final plan; D-019 and D-020 from Filipe's instructions for the repository structure |
| 2026-11-17 | D-021 (ADR-0001): original photos in the private `filipeoliveira-hub-assets` repository, fetched at build time with a read-only deploy key |
| 2026-11-19 | D-019 revised with the adoption of the fluxo-dev skill: the dev now reads the CI and signals the PO and the Reviewer; double approval on the same head, except a small change with the PO only; review rounds, with Filipe deciding after two rounds of disagreement; merge, branch deletion and CD by the Reviewer after Filipe's yes. Previous text: "Branch + PR per issue from phase 0. The dev never pushes to `main` and never merges. The Reviewer merges and pushes `main` after Filipe's OK. Delivery with double approval, PO and Reviewer. Conventional Commits" |
| 2026-11-20 | D-019 revised by the simplified development flow: Claude in T3 opens the PR and never merges; Filipe reviews, merges and deletes the branch; no double approval; the PO de Projetos and Reviewer de Projetos bots act only at Filipe's request, with no merge and no push to `main` |
| 2026-11-24 | D-019 revised: the PO de Projetos and Reviewer de Projetos bots are removed. Previous text: "PO de Projetos and Reviewer de Projetos (bots) act only when Filipe asks and never merge or push `main`". The project has profile `solo` in the agent workflow (`AGENTS.md` §3, "Agent workflow"). Size and risk replace small/large; replies, code and docs in English (`AGENTS.md` translated; the rest in I-29) |
| 2026-11-25 | Translated to English (I-29); decisions unchanged |
