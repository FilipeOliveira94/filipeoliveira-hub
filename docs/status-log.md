# Status log (archive)

Chronological history of the project, newest entry first. The operational ledger is [`PROJECT_STATUS.md`](../PROJECT_STATUS.md), which covers only the current phase and is rewritten each phase. Each issue's evidence lives here.

---

### 2026-11-26 — Astro structure, base path and deploy (I-01)

Branch `feat/i-01-astro-deploy`. New Astro 7.4.13 project with `@astrojs/mdx` 8.1.6, strict TypeScript 6.0.3 (the newest `@astrojs/check` 0.9.12 accepts), ESLint 10 with `eslint-plugin-astro` and `typescript-eslint`, all pinned, on Node 22.23.4 (`.nvmrc`). `astro.config.mjs` reads `site` from `SITE_URL` and `base` from `BASE_PATH`; the URL is not written in code. `src/lib/paths.ts` holds the single helper, `withBase`, over a pure `joinBase` that the unit tests cover. `src/pages/index.astro` is a placeholder with the name and the D-022 title, `lang="pt-BR"` and `noindex` until I-18. `scripts/check-links.mjs` fails on any `href`, `src`, `srcset` or CSS `url()` in `dist/` that is outside the base path, has no file, or names a missing `#id`.

`.github/workflows/deploy.yml` runs on pushes to `main` and on PRs. A `pages-config` job (only `pages: read`) reads the Pages origin and base path with `configure-pages`. The `build` job (`contents: read`) checks out with `fetch-depth: 0`, fetches `filipeoliveira-hub-assets` into `.assets/` with `ASSETS_DEPLOY_KEY` and `persist-credentials: false` only when the secret exists, runs lint, `astro check` and the unit tests, then builds and checks links with `BASE_PATH=/`, with `BASE_PATH=/filipeoliveira-hub`, and with the Pages values. Only a push to `main` uploads the artifact and runs the `deploy` job, the only one with `pages: write` and `id-token: write`.

Checked locally: `make verify` passes (ESLint, `astro check` with 0 errors, 11 unit tests, `make docs-lint`, build and link check in both modes). A root build checked with `BASE_PATH=/filipeoliveira-hub` fails the link check. No image file was added. Not verified yet: the deploy itself and the Pages URL serving the new version, which need the merge; on 2026-11-26 the Pages API reported `build_type: legacy`, so Filipe sets Source = GitHub Actions first. Seen rating: Hi risk, Md size.

---

### 2026-11-25 — Roadmap revision

Branch `docs/roadmap-revision`, docs only. A review of the roadmap found that the MVP left out most of what the site is for: the professional work was in phase 3, the plan asked for two diagrams, the project cards had no images, and the identity was still "created from scratch" although the brand was approved on 2026-11-18 in the assets repository. Filipe answered five questions in the thread and agreed with the rest of the review.

Decisions D-022 to D-029: the home page title is "Engenheiro de Dados & Software"; the site uses the approved brand in light and dark by system setting; diagrams are branded SVG files, not Mermaid; the hero uses video version 4, the if/fi moment and the Fi grid; the domain is bought and is set in phase 0; work images are allowed in listed directories; the MVP has two or three short professional case studies; the projects page groups current and earlier projects, with images. D-004, D-005, D-010, D-013 and D-017 are superseded. D-014 no longer fails a PR on the Lighthouse performance score.

Roadmap: I-02 and I-03 are merged into I-01, and I-27 into I-05, I-06 and I-12. I-23 moves to phase 0. New issues I-30 (hero), I-31 (Fi grid) and I-32 (short professional case studies). `AGENTS.md` §1 and the README no longer say the site supports a job search, and `AGENTS.md` §6 points to D-027 for images.

Checked: `make docs-lint` passes. No site code was written. Hosting stays on GitHub Pages (D-002).

---

### 2026-11-25 — Agent workflow, ratings and English docs (I-29)

Branch `chore/agent-workflow` (PR #6), docs only. The project adopts the agent workflow in `~/.agents/claude/workflow.md` (repo `FilipeOliveira94/agent-config`) with profile `solo`: Claude Opus 5.5 plans and implements, with no PO or Reviewer bots and no review subagents. Size and risk replace the small or large task rule (`AGENTS.md` §4.1). Every issue in `ROADMAP.md` has Expected/Seen Risk and Size columns; all of them were open, so they have only the expected half. `verified` no longer needs double approval. D-019 revised. New issue I-29.

I-29: `ROADMAP.md`, `PROJECT_STATUS.md`, `DECISIONS.md`, `README.md`, ADR-0001, this log and the Makefile messages are rewritten in English; `AGENTS.md` and `docs/agent-workflow.md` already were. Site content quoted in the docs (the home page title, the location, the gallery group names) keeps its Portuguese text, as do proper names, branch names and commit messages. Checked: `make docs-lint` passes; a search for Portuguese words finds only those exceptions; the issue IDs (I-01 to I-29) and decision IDs (D-001 to D-021) match the Portuguese version. Seen rating: Lo risk, Sm size (docs only, one session).

---

### 2026-11-20 — Small or large task

Branch `chore/fluxo-pequena-grande`, docs only. New rule from Filipe: for a small task (docs, text, config, a patch bump, or a contained bugfix of up to ~50 lines in up to 3 files, without touching architecture, schema, security, infra, public API or pipeline), Claude plans and implements straight through to the PR; for a large task, or when in doubt, Claude plans and waits for Filipe's approval in the thread. The issue prompt states the mode; Claude may reclassify a task as large. Updated `AGENTS.md` (§4 step 3 and a new §4.1) and `docs/agent-workflow.md`. `make docs-lint` passed.

---

### 2026-11-20 — Simplified development flow

Branch `chore/fluxo-dev-simplificado`, docs only. Claude in T3 Code plans, implements on a new branch, runs the checks, pushes the branch and opens the PR with a summary, without merging. Filipe reviews, merges and deletes the branch. The PO de Projetos and Reviewer de Projetos bots act only when Filipe asks and never merge. The PO and Reviewer double approval is dropped. Updated `AGENTS.md` (§3 to §5), `docs/agent-workflow.md`, D-019 in `DECISIONS.md`, `ROADMAP.md`, `PROJECT_STATUS.md` and `README.md`. The older entries of this log stay as they were.

---

### 2026-11-17 — Markdown tables with named headers

Four key-value tables had an empty header row (`| | |`), which GFM shows as a blank row at the top. The pattern came from another project's planning documents, used as a template, and spread by copying. Each table now has a header taken from its context (today `Project | Current`, `Validation | Detail`, `Roadmap | Current` and `Record | Reference`). `scripts/check_markdown_tables.py` fails if any tracked Markdown file has an empty header outside code blocks; it runs with `make docs-lint`. The rule is in `AGENTS.md` §8.

---

### 2026-11-17 — Original photos in a private repository (D-021)

Branch `docs/private-assets`, docs only. At Filipe's request, the home page photo follows the model already validated in `dra-victoria-laufer` (its ADR-0010): originals in the private repository `FilipeOliveira94/filipeoliveira-hub-assets`, fetched in the Actions build with a read-only deploy key (`ASSETS_DEPLOY_KEY`), without Git LFS, at web size.

`docs/decisions/0001-private-assets-repository.md` (ADR-0001) records the context, the alternatives and Filipe's manual steps; `DECISIONS.md` gains the D-021 row pointing to it. `ROADMAP.md` adjusts the acceptance of I-03 (assets checkout in the workflow, on PRs too), I-04 (`check-no-photos`) and I-11 (the photo comes from `.assets/` and is not copied into the repository). `AGENTS.md` §6 gains the rule against committing photos.

Verified in this checkout: `git ls-files` lists no image, and `git log --all --diff-filter=A` for jpg, jpeg, png, webp, avif, heic, gif and tif returns nothing. There is no history to rewrite. No code, workflow or dependency was created; that is left to I-03, I-04 and I-11.

### 2026-11-15 — Initial project structure

One commit on local `main`, `chore: estrutura inicial do projeto`, on top of `45de9b0` (`docs: add README`). It was the exception Filipe authorized to the branch + PR flow, which applies from phase 0. There was no push; pushing `main` was the Reviewer's job.

The commit creates `AGENTS.md`, `CLAUDE.md` (only `@AGENTS.md`), `DECISIONS.md`, `ROADMAP.md`, `PROJECT_STATUS.md`, `LICENSE` (MIT), `Makefile`, `docs/status-log.md` and `docs/agent-workflow.md`, and rewrites `README.md`. The format follows open-data-platform's, adapted to the site. The phases, issues I-01 to I-28 and decisions D-001 to D-018 come from the PO's final plan. D-019 (workflow) and D-020 (license) come from Filipe's instructions for this structure.

The previous README mentioned a technical blog and a PT/EN résumé. The résumé was removed from the plan (D-006) and the blog is I-22, in phase 3; the new README promises neither for the MVP.

No site code was written. There is no `package.json`, `src/`, `public/`, CI workflow or Node dependency. The Makefile has the targets `help`, `install`, `dev`, `build`, `check` and `clean`. Verified in this checkout: `make help` lists the six targets; `make build` without `package.json` prints the message that the Astro project has not been generated and exits with code 2.

Phase 0 has not started. Every issue is `not started`. The next one is I-01.
