# Status log (archive)

Chronological history of the project, newest entry first. The operational ledger is [`PROJECT_STATUS.md`](../PROJECT_STATUS.md), which covers only the current phase and is rewritten each phase. Each issue's evidence lives here.

---

### 2026-11-26 — Base layout (I-06), I-05 verified

Branch `feat/i-06-base-layout`. Plan approved by Filipe with his answers: navigation links only to pages that exist; footer with e-mail, LinkedIn and GitHub; the language switcher as a globe button that shows the current language and opens a menu with both; `/brand/` stays as the component sample.

- `src/layouts/BaseLayout.astro` wraps every page: `lang` from the path, `BaseHead`, a skip link (hidden until focused) to `<main id="main">`, the header and the footer. The placeholder pages and `/brand/` use it.
- `SiteHeader.astro`: the logo (light or dark file by system setting) linking to the home page of the current language, and a `<nav>` built from `NAV` in `src/lib/lang.ts`, which holds only Home for now, with `aria-current="page"`.
- `LangSwitcher.astro`: a `<details>` button with a globe icon and `PT` or `EN`; its accessible name is "Idioma: Português" or "Language: English". The menu marks the current language and links the other one, with `lang` and `hreflang`, to the mirrored page. It works without JS; a 300-byte inline script closes it with Esc (focus back on the button) or a click outside.
- `SiteFooter.astro`: the year, then e-mail, LinkedIn and GitHub (Filipe's answer in I-06).
- `src/lib/lang.ts`: `langOf()`, `alternatePath()` (`/x` ↔ `/en/x`, so `/english/` is not taken for EN) and `sitePathOf()` with unit tests, plus the layout's interface strings, which I-07 moves into its dictionary.

Checked: `astro check` 0 errors, ESLint, 66 unit tests pass (2 axe tests skipped without `CHROME_PATH`), link check with `BASE_PATH=/` and `/filipeoliveira-hub`, PT/EN pairs, axe on 4 pages in light and dark, docs-lint and the image check pass. Lighthouse CI: 100 in all four categories on the 4 pages. Browser proof (Chromium, `astro preview`, 34 statements passed): header and footer on every page in light and dark at 1440 and 390 px with no horizontal scroll and no console error; Tab order skip link → logo → Início → language button, each with the 3px outline; Enter on the skip link focuses `main`; Enter or Space opens the menu, Tab reaches the other language, Esc closes it and returns focus, a click outside closes it; the links reach `/en/brand/` and back; axe finds no violation with the menu open, in light and dark, at both widths. Seen rating: Lo risk, Md size.

I-05 verified: Filipe approved the sample and asked for the rounded box favicons, and PR #11 merged. Implemented filled for D-023.

---

### 2026-11-26 — Brand tokens and component sample (I-05)

Branch `feat/i-05-brand-tokens`. The brand comes from the private assets repository at commit `358a354` (D-023), copied unchanged into the D-027 places and listed in `src/assets/brand/README.md`: `tokens.css`, the four logo SVGs, Urbanist 500 and 700 (woff2, with `OFL.txt`), and `favicon.ico`, `icon-192-rounded.png` and `apple-touch-icon-rounded.png` at the root of `public/`. Filipe preferred the rounded dark box icons to the transparent `favicon.svg`, so the pages link those. No photo was copied.

- `src/styles/global.css` imports the tokens and adds the local `@font-face` rules, color roles (`--color-*` over `--fi-*`), a 1.25 type scale, a nine-step spacing scale, radii, visible focus (3px accent outline), reduced motion, and the base components (button, secondary button, tag, card). `--fi-dot` is decorative only: 3.78:1 on the light background.
- `src/components/BaseHead.astro` holds the shared meta, the favicon links and the global styles; the placeholder pages use it, so they show the brand font and colors in both themes.
- `src/lib/contrast.mjs` lists every text/background pair the roles use; its test parses `tokens.css` and fails below 4.5:1 in light or dark, and checks that the `prefers-color-scheme` block matches `[data-theme="dark"]`. Lowest pair: `--fi-muted` on `--fi-b1`, 5.17:1 light and 6.75:1 dark.
- `/brand/` and `/en/brand/` show the logo, colors with the contrast table, type and spacing scales and the components, `noindex` like every page.
- `scripts/check-links.mjs` now parses `srcset` as the HTML spec does: Vite inlines the small Fi mark as a `data:` URL, whose commas the old split broke into a false broken link.

Checked: `astro check` 0 errors, ESLint, 62 unit tests pass (2 axe tests skipped without `CHROME_PATH`), link check with `BASE_PATH=/` and `/filipeoliveira-hub`, PT/EN pairs, axe on 4 pages in light and dark, docs-lint and the image check pass. Lighthouse CI on the 4 pages: 100 in all four categories; best practices was 96 before, from the `favicon.ico` 404. Browser proof on the preview build (Chromium, 1440 and 390 px, light and dark, PT and EN): Urbanist 500 and 700 load from the site, no third-party request, no console error or failed request, no horizontal scroll, the logo switches to its dark file in dark, and Tab shows the 3px focus outline on each link and button. Seen rating: Lo risk, Md size (about 700 hand-written lines). Filipe approved the sample on 2026-11-26.

---

### 2026-11-26 — Custom domain (I-23), I-04 verified, phase 0 verified

Branch `feat/i-23-custom-domain`. Filipe verified `filipeoliveira-hub.com.br` on the GitHub account (TXT `_github-pages-challenge-FilipeOliveira94`), created the four A and four AAAA apex records and the `www` CNAME to `filipeoliveira94.github.io` in the Registro.br DNS, set the domain in Settings → Pages and ticked Enforce HTTPS. No `public/CNAME`: GitHub ignores it when an Actions workflow publishes the site. No code change for `SITE_URL` and `BASE_PATH`: `configure-pages` now reports the domain and an empty base path.

- `scripts/check-domain.mjs` (`make domain SITE_URL=… PAGES_URL=…`) follows each redirect by hand and fails unless the PT and EN home pages answer 200 over HTTPS (Node rejects an invalid certificate) and `http://`, `https://www.` and the `github.io` URL (PT and EN) end on the matching page of the domain. It reads the network, so it is not in CI. Ten unit tests with a stubbed `fetch` cover the passing case, a redirect chain, a certificate error, HTTP served without a redirect, `www` without DNS, `github.io` still serving, a redirect that drops the path, a 404, a redirect loop and an invalid `--site`.
- The domain steps in `ROADMAP.md` gain the AAAA values and the order (DNS before the Pages setting), and drop `public/CNAME`.

Checked: the Pages API reports `cname: filipeoliveira-hub.com.br`, `protected_domain_state: verified`, `https_enforced: true` and an approved certificate for the apex and `www`. Public DNS (dns.google) returns the four A and four AAAA records and the `www` CNAME. Run 45849859303 on `main`, re-run after the setting, succeeds in all three jobs; its published build logs `SITE_URL: https://filipeoliveira-hub.com.br` and `BASE_PATH: /`, and its link check passes. `make domain` passes; before the DNS records it failed on `ENOTFOUND` and on the `github.io` URL still serving the site. `https://filipeoliveira-hub.com.br/` serves the placeholder (`lang="pt-BR"`, its link at `/`) with a Let's Encrypt certificate (CN `filipeoliveira-hub.com.br`, expires 2027-02-24). Locally: ESLint, 40 unit tests pass (2 axe tests skipped without `CHROME_PATH`), docs-lint and the image check pass. Seen rating: Hi risk, Sm size.

I-04 verified: the same run on `main` (first run 2026-11-26 15:30, the merge of PR #9) passes the image, pair, axe and Lighthouse checks on GitHub's runner. Implemented filled for D-014, D-015 and D-027. With I-01, I-04, I-23 and I-29 verified, phase 0 meets its exit criteria.

---

### 2026-11-26 — PR checks (I-04) and I-01 verified

Branch `feat/i-04-pr-checks`. Rating raised from Med/Md to Hi/Md in the plan, approved by Filipe: the change edits the deploy workflow and builds the guard for the no-photos rule.

- `scripts/check-no-photos.mjs` fails on an image file outside the D-027 places (`src/assets/{brand,diagrams,projects}/` and the 12 favicon names of the assets repository's `brand/favicon/` at the root of `public/`). It checks the index and, with `--range`, every file each commit adds or changes, including what a merge commit brings in, so an image deleted by a later commit still fails. An image is found by its extension or by its first bytes (JPEG, PNG, GIF, WebP, AVIF/HEIF, TIFF and RAW, JPEG XL, JPEG 2000, PSD, BMP). Only git objects are read, so `.assets/` is never looked at. CI passes the PR's `base..head`, or the pushed range on `main`.
- `scripts/check-pairs.mjs` fails when a page in `dist/` lacks its mirror under `en/` (or the reverse; `404.html` exempt) or when a file under `src/content/<collection>/pt/` lacks its `en/` pair (or the reverse).
- `scripts/check-axe.mjs` serves `dist/` under `BASE_PATH` and runs axe-core 4.14.0 (every non-experimental rule) through `puppeteer-core` 25.18.0 on every page, in light and dark.
- `lighthouserc.cjs` runs Lighthouse CI (`@lhci/cli` 0.16.1, Lighthouse 13.6.0) on every page of the root build: accessibility, best practices or SEO below 0.95 fail; `is-crawlable` is skipped while the site is `noindex` (I-18 removes both). `scripts/lighthouse-summary.mjs` writes the four scores to the job summary; the reports are an Actions artifact for 14 days. Nothing is uploaded to a public host.
- `deploy.yml`: the image check runs right after checkout, before `npm ci`; pairs, axe and Lighthouse run after the root build and also gate the deploy of `main`. The `deploy` job, the permissions and the assets key step are unchanged.
- `scripts/lib/dist.mjs` holds the `dist/` helpers that `check-links.mjs`, axe and the pair check share. New placeholder component; `src/pages/en/index.astro` is the EN pair with the D-022 English title, and both pages have a meta description made of the name and that title. The axe run found the placeholder link below 3:1 in dark, because `body` had no background and axe measured against white; `body` now uses `Canvas` and `CanvasText`.

Checked locally with Playwright Chromium 1255 as `CHROME_PATH`: `make verify` passes (ESLint, `astro check` 0 errors, 32 unit tests, docs-lint, image check, both base path builds and link checks, pairs, axe, Lighthouse). The image check over the whole history (`--range HEAD`, 27 commits) passes. Lighthouse on both pages: performance 100, accessibility 100, best practices 96 (`favicon.ico` 404 in the console), SEO 100. Before the fixes, `npm run pairs` failed on `index.html` without an EN pair, and SEO scored 50 (`noindex`, no meta description). A throwaway page outside the repository with an image without `alt`, no `lang` and no `main` fails axe (10 violations across light and dark) and Lighthouse (accessibility 71, SEO 71, exit 1). Unit tests cover the failing cases of the image check (renamed JPEG, image added then deleted, image moved out of an allowed directory, text overwritten with image bytes, merge commit) with bytes generated in temporary repositories. Not verified yet: the run on GitHub's runner with its Google Chrome; that is read on the PR. Seen rating: Hi risk, Md size.

I-01 verified: run 45817084985 on `main` built and deployed; the Pages API reports `build_type: workflow`; `https://filipeoliveira94.github.io/filipeoliveira-hub/` answers 200 with the placeholder, its link under `/filipeoliveira-hub/` and its inline CSS.

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
