# Project Status

Operational ledger of the **current phase**. The issue backlog and the acceptance text are in [`ROADMAP.md`](ROADMAP.md). Decision index: [`DECISIONS.md`](DECISIONS.md). History: [`docs/status-log.md`](docs/status-log.md).

| Project | Current |
| --- | --- |
| Repository | [FilipeOliveira94/filipeoliveira-hub](https://github.com/FilipeOliveira94/filipeoliveira-hub) |
| Last updated | 2026-11-26 (America/Sao_Paulo). Phase 0 verified: I-23 puts the site on `https://filipeoliveira-hub.com.br`; I-04 verified |
| Current phase | Phase 1 — Identity and home |
| Phase status | In progress |

**Status:** not started · in progress · delivered · verified · blocked

**Verified** means the acceptance criterion was checked and the evidence is in `docs/status-log.md`. Do not treat what is planned as done.

**What goes here:** current objective, progress of the current phase's issues, phase acceptance, latest validation, decisions that block this work, active risks, blockers and next work.

**What does not:** the inventory of every issue (use `ROADMAP.md`), the full decision table (use `DECISIONS.md`) and long history (use `docs/status-log.md`).

---

## Current objective

**Phase 1 — Identity and home.** Phase 0 is verified: `https://filipeoliveira-hub.com.br` serves the placeholder over HTTPS (Let's Encrypt), `http`, `www` and the `github.io` URL redirect to it, and the `build` job of `deploy.yml` gates every PR and deploy with the image, link, PT/EN pair, axe and Lighthouse checks.

## Next work

1. **I-07** — PT/EN routing: the dictionary, reciprocal `hreflang`, and the I-06 interface strings and `alternatePath()` moved into it.
2. **I-08, I-09** — collections and the years counter; they depend only on I-01.
3. **I-32 questions** — the short professional case studies start with questions to Filipe; they can be answered while phase 1 is built.

---

## Phase 1 progress

| ID | Title | Status | Evidence |
| --- | --- | --- | --- |
| I-05 | Brand tokens and component sample | Verified | `docs/status-log.md` 2026-11-26; Filipe approved the sample at `/brand/`; PR #11 merged |
| I-06 | Base layout | Delivered | `docs/status-log.md` 2026-11-26 (base layout) |
| I-07 | PT/EN routing | Not started | — |
| I-08 | Collections and schemas | Not started | — |
| I-09 | Dynamic years counter in data | Not started | — |
| I-10 | Experience summary | Not started | — |
| I-30 | Hero: video and if/fi moment | Not started | — |
| I-31 | Fi grid with real activity | Not started | — |
| I-11 | Home page | Not started | — |

Acceptance text of each issue: `ROADMAP.md` → Phase 1. Phase 0 evidence: `docs/status-log.md` (2026-11-25 and 2026-11-26).

### Phase 1 acceptance

- [ ] PT/EN home page live with the brand, in light and dark.
- [ ] Hero, photo and experience from the CV on the home page.

---

## Latest validation

| Validation | Detail |
| --- | --- |
| Date | 2026-11-26 |
| Environment | WSL2, Node 22.23.4; GitHub Actions run 45849859303 on `main` (re-run after the domain was set) |
| Checks | Run 45849859303: `pages-config`, `build` and `deploy` succeed; the published build used `SITE_URL=https://filipeoliveira-hub.com.br` and `BASE_PATH=/`, and its link check passed. `make domain` passes. Locally: ESLint, 40 unit tests (2 axe tests skipped without Chrome), docs-lint and the image check pass |
| Result | The domain serves the PT and EN pages with HTTP 200 and a Let's Encrypt certificate for the apex and `www` (expires 2027-02-24); `http://`, `https://www.` and `https://filipeoliveira94.github.io/filipeoliveira-hub/` (PT and EN) redirect to the matching page |

---

## Active decisions for this phase

Full index: [`DECISIONS.md`](DECISIONS.md). Only the ones that block the current work are listed here.

| ID | Relevance | State |
| --- | --- | --- |
| D-003 | I-07 puts PT at the root and EN under `/en/` | `approved` |
| D-021 | I-30 and I-11 fetch the photo and hero originals from the private assets repository | `approved` |
| D-022 | I-11 uses the approved title | `approved` |
| D-023 | I-05 and I-06 use the approved brand in light and dark | `approved` |
| D-025 | I-30 builds the hero | `approved` |
| D-027 | I-05 copies the brand files only into the allowed directories | `approved` |
| D-019 | Branch + PR per issue; Claude in T3 opens the PR and Filipe merges | `approved` |

---

## Program

| Phase | Scope | Status |
| --- | --- | --- |
| 0 | Astro structure, deploy, domain and PR checks | Verified |
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
- An internal link written without the base path helper would break only under a project path. The site now serves at the root, but CI still builds and runs `scripts/check-links.mjs` for both values of `BASE_PATH` (D-008).
- The domain check (`make domain`) reads the live site and is not in CI. A broken DNS record or a dropped custom domain in Settings → Pages is caught only when someone runs it.
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
