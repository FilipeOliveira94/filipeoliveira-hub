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
| D-001 | Stack | Astro, not Next with `output: 'export'`. The site is content: zero JS by default, built-in Content Collections with a Zod schema and MDX, built-in i18n in a static build, images optimized at build time and a `base` that a variable can change | Astro 7.4.13 with TypeScript and MDX (I-01) | `approved` | Plan §3 |
| D-002 | Hosting | GitHub Pages on the public repository `FilipeOliveira94/filipeoliveira-hub`, with Source = GitHub Actions. The site answers at `https://filipeoliveira-hub.com.br` (D-026); `https://filipeoliveira94.github.io/filipeoliveira-hub/` serves it until the domain is set (I-23) | Source = GitHub Actions; `deploy.yml` publishes `main` to the `github.io` URL (I-01). Domain pending (I-23) | `approved` | Plan §6 |
| D-003 | Languages and routes | PT at the root and EN under `/en/`. Every page and every content item has a PT/EN pair, and CI fails if one is missing. The English derived from the CV is a translation, reviewed by Filipe before the release (I-18) | — | `approved` | Plan §2, §4 |
| D-004 | Home page title | "Engenheiro de Dados Sênior", whatever the current job title. Superseded by D-022 | — | `superseded` | Plan §1 |
| D-005 | Visual identity | New, created from scratch in I-05: palette, typography and tokens as CSS variables. The MVP ships with a light theme only; the dark theme is I-27. Superseded by D-023 | — | `superseded` | Plan §2, §5 |
| D-006 | Résumé | No CV PDF, no downloadable résumé and no HTML résumé page. Whoever asks for a PDF uses LinkedIn, which is on the first screen | — | `approved` | Plan §2, §4, §10 |
| D-007 | Content sources | Experience, skills, education, certifications, languages and metrics come only from the CV, from the old portfolio when the CV does not cover the point, or from Filipe's recorded answer. Nothing invented. A gap is recorded in the issue | — | `approved` | Plan §4 |
| D-008 | Base path | Astro's `site` and `base` come from `SITE_URL` and `BASE_PATH`, filled in the workflow from the output of `actions/configure-pages`. Every internal link and asset goes through a single helper | `astro.config.mjs` and `withBase` in `src/lib/paths.ts`, link check in both modes (I-01) | `approved` | Plan §6 |
| D-009 | Years counter | Pure function `yearsSince('2019-09-01', today)`, in full years. Computed at build time and corrected in the browser by a minimal inline script. The number is not written in any content file | — | `approved` | Plan §4 |
| D-010 | Diagrams | Mermaid in MDX becomes SVG at build time (`rehype-mermaid` with Playwright), with no JS in the browser. If Playwright makes the build too heavy, the alternative is to commit the SVGs generated with `mmdc`. Superseded by D-024 | — | `superseded` | Plan §4 |
| D-011 | Contact and personal data | The home page shows e-mail, LinkedIn, GitHub and the location "São José dos Campos, SP, Brasil" (EN: "São José dos Campos, SP, Brazil"). No phone number | — | `approved` | Plan §2, §5 |
| D-012 | Certifications and courses | The four certifications from the CV appear with only the year obtained, no expiry. The Hadoop/Spark and Django courses, listed with the certifications in the CV, stay off the site. The Microsoft Fabric Data Engineer certification goes in only after it is issued | — | `approved` | Plan §2, §4 |
| D-013 | Project gallery | Two groups: data engineering ("Engenharia de dados") featured and analysis and ML ("Análise e ML") below. A description only with a source (the old gallery or the repository description on GitHub). Where the old link diverges from the current repository, `links` points to the current one and `legacyLinks` keeps the old one. The gallery keeps the notice that the projects' data is fictitious. Superseded by D-029 | — | `superseded` | Plan §4, I-15 |
| D-014 | Quality | Lighthouse ≥ 95 in accessibility, best practices and SEO, zero axe violations and zero broken internal links in CI. The Lighthouse performance score is reported and does not fail a PR (revised 2026-11-25: the score varies between CI runs and the first fold has a video); Core Web Vitals "good" on mobile stays the target, checked at the release (I-18). Accessibility WCAG 2.2 AA. Budget: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1, JS ≤ 50 KB per page | — | `approved` | Plan §1, §5 |
| D-015 | PR checks and deploy | The PR runs `astro check`, build, link check, axe and Lighthouse CI. `main` publishes with `actions/deploy-pages` | — | `approved` | Plan §6 |
| D-016 | Analytics | GoatCounter, in phase 4 (I-24). Free for personal use, no cookies, open source, and it measures outbound clicks. Plausible is paid; Cloudflare Web Analytics does not measure those clicks. Outside the MVP | — | `approved` | Plan §6 |
| D-017 | Domain | `filipeoliveira-hub.com.br` only in phase 4 (I-23), after the purchase. Until then the site stays on the GitHub Pages URL. Outside the MVP. Superseded by D-026 | — | `superseded` | Plan §6 |
| D-018 | MVP scope | See the "Scope" section below | — | `approved` | Plan §2 |
| D-019 | Workflow | Branch + PR per issue from phase 0. Claude in T3 Code plans, implements on a new branch from an up-to-date `main`, runs the checks, commits, pushes the branch and opens the PR with a summary; it never merges. Filipe reviews the PR, merges it and deletes the branch. No double approval. No PO or Reviewer bots; agent workflow profile `solo` (no review subagents). Each issue's size and risk decide whether the plan stops for approval. Replies, code and docs in English. Conventional Commits | Rules in `AGENTS.md` | `approved` | Filipe's instruction, 2026-11-15; revised on 2026-11-19, on 2026-11-20 (simplified flow) and on 2026-11-24 (bots removed) |
| D-020 | License | MIT, Copyright (c) 2026 Filipe Oliveira, the same license as open-data-platform | `LICENSE` | `approved` | Filipe's instruction, 2026-11-15 |
| D-021 | Original photos | Originals outside this repository, in the private `filipeoliveira-hub-assets` repository, fetched in the Actions build with a read-only deploy key. Details in [ADR-0001](docs/decisions/0001-private-assets-repository.md) | — | `approved` | Filipe's instruction, 2026-11-17 |

| D-022 | Home page title | "Engenheiro de Dados & Software", the support line of the brand lockup. EN: "Data & Software Engineer", reviewed by Filipe with the other English texts (I-18). Supersedes D-004 | — | `approved` | Filipe's answer, 2026-11-25 |
| D-023 | Visual identity | The site uses the brand approved on 2026-11-18 in the assets repository (`DESIGN.md`, `brand/`): the `--fi-*` tokens, Urbanist 500 and 700, the Fi logo and the favicons. Light and dark themes ship from the first page and follow the system setting (`prefers-color-scheme`), with no switch. Supersedes D-005 | — | `approved` | Filipe's answer, 2026-11-25; assets repository `DESIGN.md` |
| D-024 | Diagrams | Branded SVG files made with the `diagram-design` skill and the `filipe` profile, committed in a light and a dark version, each with a title, a description and a text summary on the page. No Mermaid and no Playwright in the build. Supersedes D-010 | — | `approved` | Filipe's answer, 2026-11-25 |
| D-025 | Hero | Hero video version 4 as the first-fold background, in the theme of the system setting, with the poster as the LCP image and as the still for reduced motion; the if/fi moment; the Fi grid fed by Filipe's public commits and PRs, with the fixed logo frame as fallback. I-30 settles how the build gets the videos, which are in private Releases of the assets repository | — | `approved` | Filipe's answer, 2026-11-25; assets repository `brand/README.md` |
| D-026 | Domain | `filipeoliveira-hub.com.br` is bought and is set in phase 0 (I-23), on GitHub Pages. `SITE_URL` is the domain and `BASE_PATH` is `/`; D-008 stays, because the `github.io` URL serves the site until the DNS is set. Supersedes D-017 | — | `approved` | Filipe's answer, 2026-11-25 |
| D-027 | Work images | Diagrams, project images (screenshots, covers) and the brand files (logo, favicons) are public work and are committed in this repository, only in `src/assets/brand/`, `src/assets/diagrams/`, `src/assets/projects/` and the favicon files of `public/`. The I-04 check fails for an image file anywhere else. They stay in this repository because the site publishes them anyway, an SVG is reviewed in the PR with the text it illustrates, and a fork or local build needs no secret. What is not approved for publication stays out: the drafts of a professional case study diagram and any screenshot that still needs redaction are kept in the private assets repository until Filipe approves them. Photos still never enter this repository (D-021) | — | `approved` | Filipe's answer, 2026-11-25 |
| D-028 | Professional case studies | The MVP has two or three short professional case studies (I-32): context, role, one architecture diagram redrawn without confidential detail, and results. Each number says how it was measured and comes from the CV or from Filipe's answer recorded in the issue. Filipe approves each case before it is published. The deeper version (detailed experience page, client sheets) stays after the MVP (I-19, I-20) | — | `approved` | Filipe's answer, 2026-11-25 |
| D-029 | Projects page | Two groups: current ("Atuais": open-data-platform, A Conta, PedsLetter, shown as in progress) and earlier ("Anteriores": the other projects of the old gallery). Each card has an image from the project's repository, report or published page, or the brand placeholder. The rest of D-013 stays: a description only with a source, `links` and `legacyLinks`, and the notice that the projects' data is fictitious. Supersedes D-013 | — | `approved` | Filipe's answer, 2026-11-25 |

`—` means not yet implemented or verified in the repository.

## Scope (D-018)

**In the MVP:**

- Site on GitHub Pages at `filipeoliveira-hub.com.br`, with PT at the root and EN under `/en/`.
- The approved brand, in light and dark themes that follow the system setting.
- Home page with title, hero (video, if/fi moment, Fi grid), photo, e-mail, LinkedIn, GitHub, location, a dynamic counter since September 2019, skills, education, certifications, languages, an experience summary and highlights.
- The full open-data-platform case study, with branded diagrams.
- Two or three short professional case studies, each with a diagram.
- Projects page with current and earlier projects, with an image on each card.
- Basic SEO, and accessibility and performance checks in CI.

**Outside the MVP (later):**

- Detailed professional experience page and client project sheets.
- Full case studies of A Conta and PedsLetter.
- Blog, analytics and per-page Open Graph images.
- Microsoft Fabric Data Engineer certification, only after it is issued.

**Removed from the plan:**

- HTML résumé and downloadable PDF.
- `opendatasus_flu_analysis`, `agent-config` and the old portfolio as gallery items.
- The phone number, and the Hadoop/Spark and Django courses listed with the certifications in the CV.
- Mermaid with Playwright in the build, and the dark theme as a later issue.

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
| 2026-11-25 | Roadmap revision with Filipe. New D-022 (title), D-023 (brand, light and dark), D-024 (SVG diagrams), D-025 (hero), D-026 (domain in phase 0), D-027 (work images), D-028 (short professional case studies) and D-029 (projects page). D-004, D-005, D-010, D-013 and D-017 superseded. D-002 gains the domain URL. D-014 revised: the Lighthouse performance score no longer fails a PR. Previous text: "Lighthouse ≥ 95 in all four categories, Core Web Vitals \"good\" on mobile". D-018 scope rewritten |
| 2026-11-26 | I-01 verified: Implemented filled for D-001, D-002 and D-008 |
