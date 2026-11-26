# Project Status

Operational ledger of the **current phase**. The issue backlog and the acceptance text are in [`ROADMAP.md`](ROADMAP.md). Decision index: [`DECISIONS.md`](DECISIONS.md). History: [`docs/status-log.md`](docs/status-log.md).

| Project | Current |
| --- | --- |
| Repository | [FilipeOliveira94/filipeoliveira-hub](https://github.com/FilipeOliveira94/filipeoliveira-hub) |
| Last updated | 2026-11-26 (America/Sao_Paulo). I-01 verified (the Pages URL serves the placeholder); I-04 delivered (image, PT/EN pair, axe and Lighthouse checks) |
| Current phase | Phase 0 — Foundation |
| Phase status | In progress |

**Status:** not started · in progress · delivered · verified · blocked

**Verified** means the acceptance criterion was checked and the evidence is in `docs/status-log.md`. Do not treat what is planned as done.

**What goes here:** current objective, progress of the current phase's issues, phase acceptance, latest validation, decisions that block this work, active risks, blockers and next work.

**What does not:** the inventory of every issue (use `ROADMAP.md`), the full decision table (use `DECISIONS.md`) and long history (use `docs/status-log.md`).

---

## Current objective

**Phase 0 — Foundation.** I-29 and I-01 are verified: the first deploy from `main` serves the placeholder at `https://filipeoliveira94.github.io/filipeoliveira-hub/`. I-04 is delivered: the `build` job of `deploy.yml` now fails on an image file outside the D-027 places (tracked or added by any commit of the PR), on a missing PT/EN pair, on an axe violation in light or dark, and on Lighthouse accessibility, best practices or SEO below 95; performance goes to the job summary.

## Next work

1. **I-04 after the PR's CI** — read the PR run (axe and Lighthouse with the runner's Chrome, the job summary table, the reports artifact). Once it is green and merged, I-04 moves to verified.
2. **I-23** — Custom domain and HTTPS (Hi, Sm). The DNS and the Pages settings are Filipe's manual steps.
3. **I-05** — Brand tokens and component sample (Lo, Sm); its favicons also remove the `favicon.ico` 404 that keeps best practices at 96.
4. **I-32 questions** — the short professional case studies start with questions to Filipe; they can be answered while phases 0 and 1 are built.

---

## Phase 0 progress

| ID | Title | Status | Evidence |
| --- | --- | --- | --- |
| I-01 | Astro structure, base path and deploy to GitHub Pages | Verified | `docs/status-log.md` (2026-11-26) |
| I-02 | Configurable base path | Withdrawn | Merged into I-01 |
| I-03 | Deploy to GitHub Pages | Withdrawn | Merged into I-01 |
| I-04 | PR checks | Delivered | `docs/status-log.md` (2026-11-26); CI of the PR pending |
| I-23 | Custom domain and HTTPS | Not started | — |
| I-29 | Translate the repository docs to English | Verified | `docs/status-log.md` (2026-11-25) |

Acceptance text of each issue: `ROADMAP.md` → Phase 0.

### Phase 0 acceptance

- [ ] `https://filipeoliveira-hub.com.br` serves the home page over HTTPS.
- [ ] CI is green.

---

## Latest validation

| Validation | Detail |
| --- | --- |
| Date | 2026-11-26 |
| Environment | Local checkout in WSL2, Node 22.23.4, Playwright Chromium 1255 as `CHROME_PATH`; GitHub Actions on the I-04 PR |
| Checks | `make verify`: ESLint, `astro check`, 32 unit tests (axe tests in a real browser included), docs-lint, image check, both base path builds with the link check, PT/EN pairs, axe in light and dark, Lighthouse CI |
| Result | All pass locally. Lighthouse on both placeholder pages: performance 100, accessibility 100, best practices 96 (`favicon.ico` 404), SEO 100 with `is-crawlable` skipped. A throwaway bad page fails axe and Lighthouse (accessibility 71, SEO 71) |

---

## Active decisions for this phase

Full index: [`DECISIONS.md`](DECISIONS.md). Only the ones that block the current work are listed here.

| ID | Relevance | State |
| --- | --- | --- |
| D-001 | I-01 generates the project in Astro, with TypeScript and MDX | `approved` |
| D-002 | I-01 publishes to GitHub Pages with Source = GitHub Actions | `approved` |
| D-008 | I-01 reads `SITE_URL` and `BASE_PATH` and creates the link and asset helper | `approved` |
| D-014 | I-04 fails a PR on accessibility, best practices and SEO below 95; performance is reported | `approved` |
| D-015 | I-04 runs `astro check`, build, links, axe and Lighthouse CI on the PR | `approved` |
| D-026 | I-23 sets the purchased domain on GitHub Pages | `approved` |
| D-027 | I-04 allows image files only in the listed directories | `approved` |
| D-019 | Branch + PR per issue; Claude in T3 opens the PR and Filipe merges | `approved` |

---

## Program

| Phase | Scope | Status |
| --- | --- | --- |
| 0 | Astro structure, deploy, domain and PR checks | In progress |
| 1 | Brand, layout in both themes, i18n, collections, counter, experience, hero, home page | Not started |
| 2 | Diagrams, case studies, projects page, skills, SEO and MVP release | Not started |
| 3 | Future content: detailed experience, client sheets, new case studies, blog | Not started |
| 4 | Analytics, Search Console | Not started |
| 5 | Per-page OG, archive the old portfolio | Not started |

---

## Risks and limitations

- The Lighthouse `is-crawlable` audit is skipped while the site is `noindex`. I-18 removes both; until then a `noindex` left by mistake is not caught by CI.
- Best practices sits at 96 because `favicon.ico` returns 404; one more failing audit would drop it below 95. The favicons of I-05 remove the 404.
- The image check guards paths and file contents, not intent: a photo saved in an allowed directory (for example `src/assets/projects/`) passes it. Review stays the guard there.
- An internal link written without the base path helper breaks only under the `github.io` path. CI builds and runs `scripts/check-links.mjs` for both values of `BASE_PATH`.
- The repository is public. Drafts are visible in it, even with `draft: true`.
- The photo and the CV were received in the T3 thread and are not in the repository. I-11 and I-16 depend on them. The photo never enters this repository: it goes to the private `filipeoliveira-hub-assets` repository, which needs the deploy key and the secret before I-11 (D-021).
- The hero videos are in private Releases of the assets repository, which the deploy key cannot download. I-30 settles the access.
- The final plan left the push and the creation of the repository to Filipe. Under the current flow, the merge into `main` is Filipe's (D-019).

## Blockers

None.

---

## Log

Recent entries only. Full history: [`docs/status-log.md`](docs/status-log.md).

### 2026-11-26 — PR checks (I-04) and I-01 verified

Branch `feat/i-04-pr-checks`. Image, PT/EN pair, axe and Lighthouse checks in the `build` job; EN placeholder at `/en/`. I-01 verified after the first deploy. Detail in `docs/status-log.md`.

### 2026-11-26 — Astro structure, base path and deploy (I-01)

Branch `feat/i-01-astro-deploy`. Astro project, `withBase` helper, link check in both base path modes and the Pages workflow. Delivered; the deploy is checked after the merge. Detail in `docs/status-log.md`.

### 2026-11-25 — Roadmap revision

Branch `docs/roadmap-revision`, docs only. Review of the roadmap against the approved brand and Filipe's goals; decisions D-022 to D-029. Detail in `docs/status-log.md`.

### 2026-11-25 — Agent workflow, ratings and English docs (I-29)

Branch `chore/agent-workflow` (PR #6), docs only. The project follows the agent workflow with profile `solo`; every issue in `ROADMAP.md` has Expected/Seen Risk and Size; I-29 rewrote the repository docs in English. Evidence in `docs/status-log.md`.

### 2026-11-17 — Photos in a private repository (D-021)

Decision recorded in `DECISIONS.md`, and the acceptance of I-03, I-04 and I-11 adjusted in `ROADMAP.md`. No code written. Verified: no image is tracked or in the history.

### 2026-11-15 — Initial project structure

One commit on local `main`, `chore: estrutura inicial do projeto`, creates `AGENTS.md`, `CLAUDE.md`, `DECISIONS.md`, `ROADMAP.md`, `PROJECT_STATUS.md`, `LICENSE`, `Makefile`, `docs/status-log.md` and `docs/agent-workflow.md`, and updates `README.md`. It was the exception Filipe authorized to the branch + PR flow. There was no push. Phase 0 had not started; the next issue was I-01.
