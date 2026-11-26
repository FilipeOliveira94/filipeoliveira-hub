# Project Status

Operational ledger of the **current phase**. The issue backlog and the acceptance text are in [`ROADMAP.md`](ROADMAP.md). Decision index: [`DECISIONS.md`](DECISIONS.md). History: [`docs/status-log.md`](docs/status-log.md).

| Project | Current |
| --- | --- |
| Repository | [FilipeOliveira94/filipeoliveira-hub](https://github.com/FilipeOliveira94/filipeoliveira-hub) |
| Last updated | 2026-11-25 (America/Sao_Paulo). Roadmap revised with Filipe (D-022 to D-029); I-29 verified (docs in English); no site issue started |
| Current phase | Phase 0 — Foundation |
| Phase status | In progress |

**Status:** not started · in progress · delivered · verified · blocked

**Verified** means the acceptance criterion was checked and the evidence is in `docs/status-log.md`. Do not treat what is planned as done.

**What goes here:** current objective, progress of the current phase's issues, phase acceptance, latest validation, decisions that block this work, active risks, blockers and next work.

**What does not:** the inventory of every issue (use `ROADMAP.md`), the full decision table (use `DECISIONS.md`) and long history (use `docs/status-log.md`).

---

## Current objective

**Phase 0 — Foundation.** I-29 (docs in English) is verified; the site issues have not started.

The repository has only the documentation structure: agent instructions, roadmap, decisions, this ledger, the license and a Makefile whose targets do nothing yet. The Astro project has not been generated. There is no `package.json`, `src/`, `public/` or CI workflow.

## Next work

1. **I-01** — Astro structure, base path and deploy to GitHub Pages (Hi, Md). Astro with TypeScript, MDX and lint, `SITE_URL` and `BASE_PATH` with the link helper, and the publishing workflow. Hi risk because of the deploy workflow: the plan stops for Filipe's approval. Detail: `ROADMAP.md` → Phase 0.
2. **I-23** — Custom domain and HTTPS (Hi, Sm), once I-01 is merged. The DNS and the Pages settings are Filipe's manual steps.
3. **I-32 questions** — the short professional case studies start with questions to Filipe; they can be answered while phases 0 and 1 are built.

---

## Phase 0 progress

| ID | Title | Status | Evidence |
| --- | --- | --- | --- |
| I-01 | Astro structure, base path and deploy to GitHub Pages | Not started | — |
| I-02 | Configurable base path | Withdrawn | Merged into I-01 |
| I-03 | Deploy to GitHub Pages | Withdrawn | Merged into I-01 |
| I-04 | PR checks | Not started | — |
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
| Date | 2026-11-25 |
| Environment | Local checkout in WSL2 |
| Checks | `make docs-lint`; a search for Portuguese words in the docs; issue and decision IDs compared with the Portuguese version |
| Result | `make docs-lint` passes. The Portuguese left is quoted site content, proper names, branch names and commit messages. The issue IDs (I-01 to I-29) and decision IDs (D-001 to D-021) match the Portuguese version. There is no build, test or CI to run yet |

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

- The Makefile has targets that depend on `package.json`. Until I-01, `install`, `dev`, `build` and `check` fail with a clear message. Each target's commands are a forecast, and I-01 adjusts them to the real scripts.
- An internal link written without the base path helper breaks only under the `github.io` path. I-01 covers this with a build for both values of `BASE_PATH`.
- The repository is public. Drafts are visible in it, even with `draft: true`.
- The photo and the CV were received in the T3 thread and are not in the repository. I-11 and I-16 depend on them. The photo never enters this repository: it goes to the private `filipeoliveira-hub-assets` repository, which needs the deploy key and the secret before I-11 (D-021).
- The hero videos are in private Releases of the assets repository, which the deploy key cannot download. I-30 settles the access.
- The final plan left the push and the creation of the repository to Filipe. Under the current flow, the merge into `main` is Filipe's (D-019).

## Blockers

None.

---

## Log

Recent entries only. Full history: [`docs/status-log.md`](docs/status-log.md).

### 2026-11-25 — Roadmap revision

Branch `docs/roadmap-revision`, docs only. Review of the roadmap against the approved brand and Filipe's goals; decisions D-022 to D-029. Detail in `docs/status-log.md`.

### 2026-11-25 — Agent workflow, ratings and English docs (I-29)

Branch `chore/agent-workflow` (PR #6), docs only. The project follows the agent workflow with profile `solo`; every issue in `ROADMAP.md` has Expected/Seen Risk and Size; I-29 rewrote the repository docs in English. Evidence in `docs/status-log.md`.

### 2026-11-17 — Photos in a private repository (D-021)

Decision recorded in `DECISIONS.md`, and the acceptance of I-03, I-04 and I-11 adjusted in `ROADMAP.md`. No code written. Verified: no image is tracked or in the history.

### 2026-11-15 — Initial project structure

One commit on local `main`, `chore: estrutura inicial do projeto`, creates `AGENTS.md`, `CLAUDE.md`, `DECISIONS.md`, `ROADMAP.md`, `PROJECT_STATUS.md`, `LICENSE`, `Makefile`, `docs/status-log.md` and `docs/agent-workflow.md`, and updates `README.md`. It was the exception Filipe authorized to the branch + PR flow. There was no push. Phase 0 had not started; the next issue was I-01.
