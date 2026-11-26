# Roadmap

Issue-level plan for filipeoliveira-hub. This file is the source of truth for **scope, dependencies, status and acceptance criteria**. `PROJECT_STATUS.md` is the operational ledger of the current phase. History is in `docs/status-log.md`. Settled decisions are in `DECISIONS.md`.

The phases and issues I-01 to I-28 come from the PO's final plan (`filipeoliveira-hub-final.md`). The revision of 2026-11-25 (D-022 to D-029) reordered them around the approved brand, the purchased domain and the professional case studies, and added I-30 to I-32.

| Roadmap | Current |
| --- | --- |
| Last updated | 2026-11-25 |

**Expected/Seen Risk and Size:** each cell is `expected/seen`. Risk is `Lo`, `Med` or `Hi`; Size is `Sm`, `Md` or `Lg` (scale in `~/.agents/claude/workflow.md`, repo `FilipeOliveira94/agent-config`; Hi risk here is listed in `AGENTS.md` §3). An open issue has only the expected half (`Med/-`, `Md/-`); the seen half is filled when it closes. These columns replace the old Size column (P/M/G in days).

**Status:** `not started` · `in progress` · `delivered` · `verified` · `blocked` · `withdrawn`

- **delivered:** the change exists on the issue branch and the PR is open.
- **verified:** the acceptance criterion was checked and the result is in `docs/status-log.md`.
- **withdrawn:** the issue left the plan or was merged into another one; the ID is not reused.
- Do not start an issue before its dependencies are verified.
- Do not create empty directories for phases that have not started.
- Each issue is done on its own branch, with a PR. Rules in `AGENTS.md`.

---

## Scope

**MVP:**

- Site on GitHub Pages at the domain `filipeoliveira-hub.com.br` (D-026), with PT at the root and EN under `/en/`. Every page and every content item has a PT/EN pair; CI fails if one is missing. The texts derived from the CV (today only in Portuguese) are translated, and Filipe reviews the English before the release (I-18).
- The approved brand from the assets repository (D-023): tokens, Urbanist, logo and favicons, in light and dark themes that follow the system setting.
- Home page with the title "Engenheiro de Dados & Software" (D-022), the hero (video version 4, the if/fi moment and the Fi grid, D-025), photo, e-mail, LinkedIn, GitHub, the location "São José dos Campos, SP, Brasil" (EN: "São José dos Campos, SP, Brazil"), a dynamic counter since September 2019, skills, education, certifications, languages, an experience summary and highlights.
- The full open-data-platform case study, with branded diagrams (D-024).
- Two or three short professional case studies, written from Filipe's answers, each with a diagram (D-028).
- Projects page with two groups, current and earlier, and an image on each card (D-029).
- Basic SEO, and accessibility and performance checks in CI.

**Outside the MVP:**

- The deeper version of the professional experience: a detailed experience page and client project sheets (I-19, I-20).
- Full case studies of A Conta and PedsLetter (I-21). In the MVP they are cards on the projects page.
- Blog, analytics and per-page Open Graph images.
- Microsoft Fabric Data Engineer certification, only after it is issued.

**Removed from the plan:**

- HTML résumé and downloadable PDF.
- `opendatasus_flu_analysis`, `agent-config` and the old portfolio as gallery items.
- The phone number, and the Hadoop/Spark and Django courses listed with the certifications in the CV, stay off the site by default.
- Mermaid rendered with Playwright (D-010, superseded by D-024) and a separate dark theme issue (I-27, now part of I-05 and I-06).

---

## Phases

| Phase | Scope | Issues | Exit criteria | Status |
| --- | --- | --- | --- | --- |
| 0. Foundation | Astro structure, deploy, domain and PR checks | I-01, I-04, I-23, I-29 | The domain serves the home page over HTTPS and CI is green | In progress |
| 1. Identity and home | Brand, layout in both themes, i18n, collections, counter, experience, hero, home | I-05 to I-11, I-30, I-31 | PT/EN home page live with the brand, the hero, the photo, experience from the CV and a correct counter | Not started |
| 2. Cases, projects and MVP release | Diagrams, case studies, projects page, skills/education/certifications/languages, SEO, quality | I-12 to I-18, I-32 | MVP items live, English reviewed by Filipe and the release issue closed | Not started |
| 3. Future content | Detailed experience, client sheets, A Conta, PedsLetter, blog | I-19 to I-22 | Each issue closes on its own | Not started |
| 4. Measurement | Analytics, Search Console | I-24, I-25 | Sitemap submitted | Not started |
| 5. Polish | Per-page OG, archive the old portfolio | I-26, I-28 | Each issue closes on its own | Not started |

---

## Phase 0 — Foundation

**Scope:** Astro structure, deploy, domain and PR checks. No content blocks the start of this phase.

**Exit criteria:**

- [ ] `https://filipeoliveira-hub.com.br` serves the home page over HTTPS.
- [ ] CI is green.

Claude in T3 only pushes the issue branch; the merge into `main` is Filipe's (D-019). I-01 now carries the base path and the deploy, so the first merged PR puts a page online.

| ID | Title | Expected/Seen Risk | Expected/Seen Size | Depends on | Status | Acceptance |
| --- | --- | --- | --- | --- | --- | --- |
| I-01 | Astro structure, base path and deploy to GitHub Pages | Hi/- | Md/- | — | Not started | Astro with TypeScript, MDX and lint; `npm run build` produces `dist/` without errors and `astro check` passes. `site` and `base` read from `SITE_URL` and `BASE_PATH`, with a single helper for links and assets; the link check on `dist/` passes with `BASE_PATH=/` and with `BASE_PATH=/filipeoliveira-hub`. Publishing workflow on `main` with `configure-pages` and `deploy-pages`: given a push to `main`, when the workflow finishes, then the Pages URL serves the new version with CSS and assets loading. The workflow also runs on `pull_request` (without deploying) and, when the `ASSETS_DEPLOY_KEY` secret exists, checks out `FilipeOliveira94/filipeoliveira-hub-assets` into `.assets/` with `persist-credentials: false` (D-021); without the secret, the build passes. The main checkout uses `fetch-depth: 0` for the photo check of I-04 |
| I-02 | Configurable base path | -/- | -/- | — | Withdrawn | Merged into I-01 (2026-11-25) |
| I-03 | Deploy to GitHub Pages | -/- | -/- | — | Withdrawn | Merged into I-01 (2026-11-25) |
| I-04 | PR checks | Med/- | Md/- | I-01 | Not started | `astro check`, build, link check, axe and Lighthouse CI. A PR with a broken internal link, an axe violation, or a Lighthouse accessibility, best-practices or SEO score below 95 fails; the performance score is reported and does not fail the PR (D-014). CI also fails if a page or content item lacks its PT/EN pair, and if an image file outside the allowed directories of D-027 is tracked or added by a commit of the PR (`scripts/check-no-photos.mjs`, D-021) |
| I-23 | Custom domain and HTTPS | Hi/- | Sm/- | I-01 | Not started | The domain is bought (Filipe, 2026-11-25). Domain steps listed below. Given the DNS has propagated, when I open `https://filipeoliveira-hub.com.br`, then the site loads with a valid certificate, `www` and the `github.io` URL redirect, and the build uses the domain as `SITE_URL` with `BASE_PATH=/` |
| I-29 | Translate the repository docs to English | Lo/Lo | Md/Sm | — | Verified | ROADMAP, PROJECT_STATUS, DECISIONS, `docs/` and README in English (Filipe's decision, 2026-11-24; `AGENTS.md` and the prompts were already in English). The site content does not change: it keeps its PT and EN pair. Issue and decision IDs do not change |

### Domain steps (I-23)

The DNS and the GitHub settings are Filipe's manual steps:

1. Verify the domain in the GitHub account (TXT record).
2. In the Registro.br DNS, create the apex A records for `185.199.108.153`, `185.199.109.153`, `185.199.110.153` and `185.199.111.153`, plus GitHub's AAAA records.
3. Create the `www` CNAME pointing to `filipeoliveira94.github.io`.
4. Enter the domain in Settings → Pages and add `public/CNAME`.
5. Tick Enforce HTTPS once the certificate is issued.
6. Change `SITE_URL` to the domain and `BASE_PATH` to `/`.

---

## Phase 1 — Identity and home

**Scope:** brand, layout in both themes, i18n, collections, counter, experience, hero and home page.

**Exit criteria:**

- [ ] PT/EN home page live with the brand, in light and dark.
- [ ] Hero, photo and experience from the CV on the home page.
- [ ] Correct counter.

| ID | Title | Expected/Seen Risk | Expected/Seen Size | Depends on | Status | Acceptance |
| --- | --- | --- | --- | --- | --- | --- |
| I-05 | Brand tokens and component sample | Lo/- | Sm/- | I-01 | Not started | Brings the approved brand from the assets repository (D-023): the `--fi-*` colors of `brand/tokens.css`, the Urbanist 500 and 700 files, the logo SVGs and the favicons, copied into the allowed directories of D-027. Adds the spacing and type scales and a component sample page. Light and dark follow `prefers-color-scheme`, with no switch. Every text and background pair has contrast ≥ 4.5:1 in both themes; fonts are served locally; Filipe approves the sample before I-06 closes |
| I-06 | Base layout | Lo/- | Md/- | I-05 | Not started | Header with the logo, footer, navigation, language switcher and a skip-to-content link, using the tokens, in light and dark. Full keyboard navigation with visible focus and zero axe violations in both themes |
| I-07 | PT/EN routing | Med/- | Md/- | I-01 | Not started | PT at the root, EN under `/en/`, a language switcher and interface strings in a dictionary. Given I am on a page that has a pair, when I use the switcher, then I reach the equivalent page; `hreflang` is reciprocal |
| I-08 | Collections and schemas | Med/- | Md/- | I-01 | Not started | `cases`, `projects`, `experience` and `skills` (including education, certifications and languages) with Zod. Invalid frontmatter, a case study without a PT/EN pair or a metric without `source` breaks the build |
| I-09 | Dynamic years counter in data | Lo/- | Sm/- | I-01 | Not started | `yearsSince` function from 2019-09-01, used on the home page. Unit tests cover 2026-08-31 → 6, 2026-09-01 → 7 and 2026-11-15 → 7; a search of the repo does not find the number written by hand in content |
| I-10 | Experience summary | Hi/- | Md/- | I-07, I-08 | Not started | `experience.yaml` with the six experiences from the CV, dates in month and year, in PT and EN. The six entries appear with the periods and job titles from the CV; no sentence outside the source; Filipe reviews the English at the release |
| I-30 | Hero: video and if/fi moment | Hi/- | Md/- | I-06 | Not started | Hero video version 4 as the first-fold background (D-025), with the markup of the assets repository's `brand/hero/flow/4/preview.html`: AV1, HEVC and H.264 sources, landscape and portrait, light and dark by system setting. The poster is the LCP image and the still shown with reduced motion. The if/fi moment follows `brand/hero/if-fi.html` and pauses off screen. The plan settles how the build gets the videos: they are in the private Release `hero-flow-v4`, which the read-only deploy key cannot download. Hero text keeps contrast ≥ 4.5:1 over the video in both themes; without the assets, the build passes with the poster or a neutral background |
| I-31 | Fi grid with real activity | Med/- | Md/- | I-06 | Not started | The Fi grid shows Filipe's public commits and PRs of the last six weeks, with `levelsFromCounts()` from the assets repository's `brand/fi-grid.mjs`. The plan settles where the data is read (build time with a scheduled rebuild, or in the browser) inside the JS budget. With no activity or an API failure, the grid shows the fixed logo frame; the grid has a text alternative |
| I-11 | Home page | Hi/- | Md/- | I-06, I-08, I-09, I-10, I-30 | Not started | Title "Engenheiro de Dados & Software" (D-022), hero, photo, counter, location, experience, skills, the case study highlight and contact (e-mail, LinkedIn, GitHub). The photo does not enter this repository (D-021): `scripts/prepare-assets.mjs` reads `photos/portrait.jpg` from `.assets/` (or from `ASSETS_DIR`), crops it with `sharp` into `src/assets/generated/`, and Astro generates AVIF/WebP with alt text; without `.assets/`, the script exits with code 0 and the home page shows a neutral placeholder. With the secret, CI checks that the real photo is in `dist/`. On a mobile viewport, name, photo, title, counter, city and contact links appear without scrolling; there is no phone number and no sentence about looking for a job |

---

## Phase 2 — Cases, projects and MVP release

**Scope:** diagrams, case studies, projects page, skills/education/certifications/languages, SEO and quality.

**Exit criteria:**

- [ ] MVP items live.
- [ ] English reviewed by Filipe.
- [ ] Release issue (I-18) closed.

| ID | Title | Expected/Seen Risk | Expected/Seen Size | Depends on | Status | Acceptance |
| --- | --- | --- | --- | --- | --- | --- |
| I-12 | Branded diagram component | Lo/- | Sm/- | I-06, I-08 | Not started | Diagrams are SVG files made with the `diagram-design` skill and the `filipe` profile, committed in a light and a dark version (D-024). A component shows the version of the current theme, with a title, a description and a text summary next to it. A page with a diagram loads no diagram JS; a diagram without a summary or without one of the two versions breaks the build |
| I-13 | Case study template | Lo/- | Md/- | I-07, I-08 | Not started | A page with the eight sections of the template and a summary block. A short variant serves the professional case studies (I-32). A sample case study renders every section in PT and EN |
| I-14 | open-data-platform case study | Hi/- | Lg/- | I-12, I-13 | Not started | Reading the repo, questions to Filipe, writing in PT and EN, and at least four diagrams or images (architecture, data flow and two more from the repo). Every technical claim points to a file or document in the repo or to Filipe's answer; every number has a source; gaps are recorded in the issue, not filled |
| I-32 | Short professional case studies | Hi/- | Md/- | I-12, I-13 and Filipe's answers | Not started | The issue starts with questions to Filipe: which two or three engagements, the context, his role, the decisions, the results and what is confidential. Each case has the context, the role, one architecture diagram redrawn without confidential detail, and the results. Each number says how it was measured and comes from the CV or from Filipe's answer recorded in the issue. Each case links to something public when there is one (the role on LinkedIn, a credential, a public product). All content comes from the answers recorded in the issue; Filipe approves each case before it is published. The deeper version is I-19 (D-028) |
| I-15 | Projects page | Med/- | Md/- | I-07, I-08 | Not started | `projects.yaml` and a page with two groups (D-029): current ("Atuais") and earlier ("Anteriores"). The projects in the table below appear with the links given; a current project shows that it is in progress; a link to a private repository is not published. Each card has an image that comes from the project's repository, report or published page; a project with no image is listed in the issue and shows the brand placeholder. The four whose old link diverges keep the old one in `legacyLinks`; each URL was tested and the broken ones are listed in the issue; `dra-victoria-laufer` exists with `kind: client` and `draft: true` and is not published; `opendatasus_flu_analysis`, `agent-config` and `filipe-portfolio` do not appear |
| I-16 | Skills, certifications, education and languages on the home page | Hi/- | Md/- | I-08, I-11 | Not started | Fills `skills.yaml` with the content already decided in the plan. It is not conditional and blocks the release (I-18). The home page shows the skill groups, the four certifications with only the year obtained, education and languages, in PT and EN; nothing invented beyond the CV |
| I-17 | Basic SEO | Med/- | Md/- | I-07, I-11, I-23 | Not started | Metadata, canonical, `hreflang`, static Open Graph, sitemap, `robots.txt` and JSON-LD. Canonical and sitemap use the domain; the sitemap lists every route and the structured-data validator reports no errors |
| I-18 | MVP release | Hi/- | Sm/- | I-04, I-11, I-14, I-15, I-16, I-17, I-23, I-31, I-32 | Not started | Final checklist and Filipe's review, including the English texts translated from the CV. Lighthouse accessibility, best practices and SEO ≥ 95 on the home page, a case study and the projects page, with the performance score and the Core Web Vitals recorded; zero axe violations; every internal link valid; Filipe approves the PT and EN texts |

### I-15 projects

| Group | Project | Main link |
| --- | --- | --- |
| Current | open-data-platform | Case study page and repo |
| Current | A Conta | No link while the repo is private |
| Current | PedsLetter | Repo `pedsletter` |
| Earlier | airflow-covid-vaccines-etl | Repo |
| Earlier | NPS Commentaries NLP Analysis | Repo `nps-nlp-script` and report |
| Earlier | TalkingData Ad Fraud Detection | Repo `kaggle-talking-data-ad-fraud` |
| Earlier | Grupo Bimbo Inventory Demand | Repo `kaggle-grupo-bimbo-inventory-demand` |
| Earlier | Santander Customer Satisfaction | Repo `kaggle-santander-customer-satisfaction` and report |
| Earlier | Telecom Company Churn Rate | Repo `telecom-company-churn` |
| Earlier | Refund Analysis | Google Sheets (checked live) |
| Earlier | Course Sales Dashboard | Data Studio (checked live) |
| Earlier | IT Management Dashboard | Data Studio, the name from the old gallery; in Data Studio it appears as "TI Management" (checked live) |

"Checked live" is the check recorded in the final plan (HTTP 200, no login). I-15 tests each URL again.

---

## Phase 3 — Future content

**Scope:** detailed experience, client sheets, A Conta, PedsLetter and blog.

**Exit criteria:** each issue closes on its own.

| ID | Title | Expected/Seen Risk | Expected/Seen Size | Depends on | Status | Acceptance |
| --- | --- | --- | --- | --- | --- | --- |
| I-19 | Detailed professional experience page | Hi/- | Lg/- | I-18, I-32 and Filipe's answers | Not started | The deeper version of the short case studies of I-32. The issue starts with questions to Filipe about each experience (scope, decisions, results, what is confidential) and only then writes. All content comes from the answers recorded in the issue |
| I-20 | Professional and client project sheets | Hi/- | Md/- | I-19 | Not started | Includes `dra-victoria-laufer`, today reserved with only its public GitHub description. A sheet is published only with text Filipe approved |
| I-21 | Case studies of A Conta and PedsLetter | Hi/- | Lg/- | I-12, I-13 and Filipe's inputs | Not started | Full case studies; in the MVP both are cards on the projects page (I-15). They depend on links and material from Filipe. Same criteria as I-14 |
| I-22 | Blog with RSS | Lo/- | Md/- | I-18 | Not started | List, post, tags and feed, published once there are two or three posts. Valid feed, and drafts absent in production |

---

## Phase 4 — Measurement

**Scope:** analytics and Search Console. The domain (I-23) moved to phase 0.

**Exit criteria:**

- [ ] Sitemap submitted.

| ID | Title | Expected/Seen Risk | Expected/Seen Size | Depends on | Status | Acceptance |
| --- | --- | --- | --- | --- | --- | --- |
| I-24 | Analytics with GoatCounter | Med/- | Sm/- | I-18 | Not started | The GoatCounter script and click events on the LinkedIn, GitHub, e-mail and repository links. A click on an outbound link creates an event in the dashboard and no cookie is set |
| I-25 | Search Console | Lo/- | Sm/- | I-17, I-23 | Not started | Property verified and sitemap accepted |

---

## Phase 5 — Polish

**Scope:** per-page OG and archiving the old portfolio.

**Exit criteria:** each issue closes on its own.

| ID | Title | Expected/Seen Risk | Expected/Seen Size | Depends on | Status | Acceptance |
| --- | --- | --- | --- | --- | --- | --- |
| I-26 | Per-page Open Graph image | Lo/- | Md/- | I-17 | Not started | The case study and the gallery have their own 1200×630 image |
| I-27 | Dark theme | -/- | -/- | — | Withdrawn | Merged into I-05, I-06 and I-12: the site ships light and dark from the first page (D-023) |
| I-28 | Archive the old portfolio | Med/- | Sm/- | I-18 | Not started | After the release: unpublish the GitHub Pages site of `filipe-portfolio` and archive the repository. Archiving alone does not take the old site down. The old Pages site is no longer served and the repository is archived |

---

## Plan risks

- **Base path.** Until the domain answers (I-23), the site is served under `/filipeoliveira-hub`. A link written without the helper breaks only there; I-01 covers this with a build in both modes.
- **CV dates.** The most recent entry reads May 2024 to May 2026; if the period has changed, Filipe corrects it in I-10.
- **Translation.** The CV is only in Portuguese; the English needs Filipe's review in I-18.
- **No downloadable résumé.** Recruiters who ask for a PDF rely on LinkedIn, so its link must be on the first screen.
- **Public repo.** Drafts are visible in the repository, even with `draft: true`. The same holds for the answers recorded in I-32: confidential detail stays out of the issue and the repository.
- **Photo and CV.** They were received in the T3 thread; I-11 and I-16 use them. The photo does not enter this repository: it is in the private `filipeoliveira-hub-assets` repository (D-021).
- **Private assets.** I-11 with the real photo depends on the read-only deploy key and the `ASSETS_DEPLOY_KEY` secret (steps in ADR-0001, D-021). Fork PRs build with the placeholder.
- **Hero video.** The video files are in private Releases of the assets repository, outside the reach of the deploy key. I-30 settles the access before it writes the hero. A video in the first fold also weighs on the performance score, which is why the poster is the LCP image and the score does not fail a PR (D-014).
- **Professional cases.** I-32 depends on Filipe's answers and on what each employer allows. A case with no approved text is not published, and the release goes with the ones that are.
- **Projects in progress.** A Conta and PedsLetter are in their first phases, and A Conta's repository is private. Their cards say only what the repository description or Filipe's answer supports.

**Open items already mapped to future issues:** the Microsoft Fabric certification once it is issued; the deeper professional detail (I-19 and I-20); the case studies of A Conta and PedsLetter (I-21); analytics (phase 4). None of them blocks phase 0.

---

## Changelog

| Date | Change |
| --- | --- |
| 2026-11-25 | Roadmap revised with Filipe (D-022 to D-029). I-02 and I-03 merged into I-01; I-23 (domain, already bought) moved to phase 0; I-27 (dark theme) merged into I-05, I-06 and I-12. New I-30 (hero), I-31 (Fi grid) and I-32 (short professional case studies). I-05 imports the approved brand; I-12 uses branded SVG diagrams, not Mermaid; I-15 groups projects as current and earlier, with images; the Lighthouse performance score no longer fails a PR |
| 2026-11-25 | I-29 verified: the repository docs are in English. Scope, acceptance and IDs unchanged |
| 2026-11-24 | New I-29: translate the docs to English. `verified` no longer needs double approval. Size and risk replace small/large in the flow (`AGENTS.md` §4.1); every issue gained the Expected/Seen Risk and Size columns |
| 2026-11-20 | Simplified development flow (D-019): Filipe merges into `main` |
| 2026-11-17 | D-021 (photos in the private assets repository): acceptance of I-03, I-04 and I-11 adjusted; private assets risk added |
| 2026-11-15 | Initial roadmap: phases 0 to 5 and issues I-01 to I-28 from the final plan, all `not started` |
