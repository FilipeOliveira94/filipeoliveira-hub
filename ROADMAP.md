# Roadmap

Issue-level plan for filipeoliveira-hub. This file is the source of truth for **scope, dependencies, status and acceptance criteria**. `PROJECT_STATUS.md` is the operational ledger of the current phase. History is in `docs/status-log.md`. Settled decisions are in `DECISIONS.md`.

The phases and issues I-01 to I-28 come from the PO's final plan (`filipeoliveira-hub-final.md`).

| Roadmap | Current |
| --- | --- |
| Last updated | 2026-11-25 |

**Expected/Seen Risk and Size:** each cell is `expected/seen`. Risk is `Lo`, `Med` or `Hi`; Size is `Sm`, `Md` or `Lg` (scale in `~/.agents/claude/workflow.md`, repo `FilipeOliveira94/agent-config`; Hi risk here is listed in `AGENTS.md` §3). An open issue has only the expected half (`Med/-`, `Md/-`); the seen half is filled when it closes. These columns replace the old Size column (P/M/G in days).

**Status:** `not started` · `in progress` · `delivered` · `verified` · `blocked`

- **delivered:** the change exists on the issue branch and the PR is open.
- **verified:** the acceptance criterion was checked and the result is in `docs/status-log.md`.
- Do not start an issue before its dependencies are verified.
- Do not create empty directories for phases that have not started.
- Each issue is done on its own branch, with a PR. Rules in `AGENTS.md`.

---

## Scope

**MVP:**

- Site on GitHub Pages at `FilipeOliveira94/filipeoliveira-hub`, with PT at the root and EN under `/en/`. Every page and every content item has a PT/EN pair; CI fails if one is missing. The texts derived from the CV (today only in Portuguese) are translated, and Filipe reviews the English before the release (I-18).
- A new visual identity (palette, typography, tokens), created from scratch.
- Home page with the title "Engenheiro de Dados Sênior", photo, e-mail, LinkedIn, GitHub, the location "São José dos Campos, SP, Brasil" (EN: "São José dos Campos, SP, Brazil"), a dynamic counter since September 2019, skills, education, certifications, languages, an experience summary and highlights.
- The full open-data-platform case study, with diagrams.
- Project gallery, with engineering in focus and analysis in a separate group.
- Basic SEO, and accessibility and performance checks in CI.

**Outside the MVP:**

- Detailed professional experience page and client project sheets (including the professional numbers from the CV).
- Case studies of A Conta and PedsLetter, new projects, in a future issue.
- Blog, custom domain, analytics, per-page Open Graph images and dark theme.
- Microsoft Fabric Data Engineer certification, only after it is issued.

**Removed from the plan:**

- HTML résumé and downloadable PDF.
- `opendatasus_flu_analysis`, `agent-config` and the old portfolio as gallery items.
- The phone number, and the Hadoop/Spark and Django courses listed with the certifications in the CV, stay off the site by default.

---

## Phases

| Phase | Scope | Issues | Exit criteria | Status |
| --- | --- | --- | --- | --- |
| 0. Foundation | Repo, Astro structure, CI and deploy | I-01 to I-04, I-29 | The Pages URL serves the home page and CI is green | In progress |
| 1. Identity and structure | Design, layout, i18n, collections, counter, experience, home | I-05 to I-11 | PT/EN home page live with the approved identity, photo, experience from the CV and a correct counter | Not started |
| 2. Content and MVP release | Case study, gallery, skills/education/certifications/languages, SEO, quality | I-12 to I-18 | MVP items live, English reviewed by Filipe and the release issue closed | Not started |
| 3. Future content | Detailed experience, client sheets, A Conta, PedsLetter, blog | I-19 to I-22 | Each issue closes on its own | Not started |
| 4. Domain and measurement | Domain, HTTPS, analytics, Search Console | I-23 to I-25 | Domain with HTTPS and the sitemap submitted | Not started |
| 5. Polish | Per-page OG, dark theme, archive the old portfolio | I-26 to I-28 | Each issue closes on its own | Not started |

---

## Phase 0 — Foundation

**Scope:** repo, Astro structure, CI and deploy. No content blocks the start of this phase.

**Exit criteria:**

- [ ] The Pages URL serves the home page.
- [ ] CI is green.

The final plan left the push and the creation of the GitHub repository to Filipe. Under the instruction of 2026-11-15 (D-019), Claude in T3 only pushes the issue branch; the merge into `main` is Filipe's.

| ID | Title | Expected/Seen Risk | Expected/Seen Size | Depends on | Status | Acceptance |
| --- | --- | --- | --- | --- | --- | --- |
| I-01 | Create the repository and the Astro structure | Lo/- | Sm/- | — | Not started | Public repo `FilipeOliveira94/filipeoliveira-hub`, Astro with TypeScript, MDX and lint. `npm run build` produces `dist/` without errors and `astro check` passes |
| I-02 | Configurable base path | Lo/- | Sm/- | I-01 | Not started | `site` and `base` read from variables, and a single helper for links and assets. Given `BASE_PATH=/filipeoliveira-hub` or `BASE_PATH=/`, when the build runs, then the link check on `dist/` passes in both cases |
| I-03 | Deploy to GitHub Pages | Hi/- | Sm/- | I-02 | Not started | Publishing workflow on `main` with `configure-pages` and `deploy-pages`. Given a push to `main`, when the workflow finishes, then the Pages URL serves the new version with CSS and assets loading. The workflow also runs on `pull_request` (without deploying) and, when the `ASSETS_DEPLOY_KEY` secret exists, checks out `FilipeOliveira94/filipeoliveira-hub-assets` into `.assets/` with `persist-credentials: false` (D-021); without the secret, the build passes. The main checkout uses `fetch-depth: 0` for the photo check of I-04 |
| I-04 | PR checks | Med/- | Md/- | I-01 | Not started | `astro check`, build, link check, axe and Lighthouse CI. A PR with a broken internal link, an axe violation or a score below 95 fails. CI also fails if a page or content item lacks its PT/EN pair, and if an image file is tracked or added by a commit of the PR (`scripts/check-no-photos.mjs`, D-021) |
| I-29 | Translate the repository docs to English | Lo/Lo | Md/Sm | — | Verified | ROADMAP, PROJECT_STATUS, DECISIONS, `docs/` and README in English (Filipe's decision, 2026-11-24; `AGENTS.md` and the prompts were already in English). The site content does not change: it keeps its PT and EN pair. Issue and decision IDs do not change |

---

## Phase 1 — Identity and structure

**Scope:** design, layout, i18n, collections, counter, experience and home page.

**Exit criteria:**

- [ ] PT/EN home page live with the approved identity.
- [ ] Photo and experience from the CV on the home page.
- [ ] Correct counter.

| ID | Title | Expected/Seen Risk | Expected/Seen Size | Depends on | Status | Acceptance |
| --- | --- | --- | --- | --- | --- | --- |
| I-05 | Visual identity | Lo/- | Md/- | I-01 | Not started | Palette, typography, spacing scale and tokens as CSS variables, with a component sample page for approval. Every text and background pair in the palette has contrast ≥ 4.5:1; fonts are served locally; Filipe approves the sample before I-06 closes |
| I-06 | Base layout | Lo/- | Md/- | I-05 | Not started | Header, footer, navigation, language switcher and a skip-to-content link, using the tokens. Full keyboard navigation with visible focus and zero axe violations |
| I-07 | PT/EN routing | Med/- | Md/- | I-02 | Not started | PT at the root, EN under `/en/`, a language switcher and interface strings in a dictionary. Given I am on a page that has a pair, when I use the switcher, then I reach the equivalent page; `hreflang` is reciprocal |
| I-08 | Collections and schemas | Med/- | Md/- | I-01 | Not started | `cases`, `projects`, `experience` and `skills` (including education, certifications and languages) with Zod. Invalid frontmatter, a case study without a PT/EN pair or a metric without `source` breaks the build |
| I-09 | Dynamic years counter in data | Lo/- | Sm/- | I-01 | Not started | `yearsSince` function from 2019-09-01, used on the home page. Unit tests cover 2026-08-31 → 6, 2026-09-01 → 7 and 2026-11-15 → 7; a search of the repo does not find the number written by hand in content |
| I-10 | Experience summary | Hi/- | Md/- | I-07, I-08 | Not started | `experience.yaml` with the six experiences from the CV, dates in month and year, in PT and EN. The six entries appear with the periods and job titles from the CV; no sentence outside the source; Filipe reviews the English at the release |
| I-11 | Home page | Hi/- | Md/- | I-06, I-08, I-09, I-10 | Not started | Title "Engenheiro de Dados Sênior", photo, counter, location, experience, skills, the case study highlight and contact (e-mail, LinkedIn, GitHub). The photo does not enter this repository (D-021): `scripts/prepare-assets.mjs` reads `photos/portrait.jpg` from `.assets/` (or from `ASSETS_DIR`), crops it with `sharp` into `src/assets/generated/`, and Astro generates AVIF/WebP with alt text; without `.assets/`, the script exits with code 0 and the home page shows a neutral placeholder. With the secret, CI checks that the real photo is in `dist/`. Depends on Filipe's manual steps in ADR-0001 (D-021). On a mobile viewport, name, photo, title, counter, city and contact links appear without scrolling; there is no phone number |

---

## Phase 2 — Content and MVP release

**Scope:** case study, gallery, skills/education/certifications/languages, SEO and quality.

**Exit criteria:**

- [ ] MVP items live.
- [ ] English reviewed by Filipe.
- [ ] Release issue (I-18) closed.

| ID | Title | Expected/Seen Risk | Expected/Seen Size | Depends on | Status | Acceptance |
| --- | --- | --- | --- | --- | --- | --- |
| I-12 | Mermaid as SVG at build time | Med/- | Md/- | I-08 | Not started | `rehype-mermaid` with Playwright in CI. A page with a diagram loads no Mermaid JS and the SVG has a title and a description |
| I-13 | Case study template | Lo/- | Md/- | I-07, I-08 | Not started | A page with the eight sections of the template and a summary block. A sample case study renders every section in PT and EN |
| I-14 | open-data-platform case study | Hi/- | Lg/- | I-12, I-13 | Not started | Reading the repo, questions to Filipe, writing in PT and EN, and at least two diagrams. Every technical claim points to a file or document in the repo or to Filipe's answer; every number has a source; gaps are recorded in the issue, not filled |
| I-15 | Project gallery | Med/- | Md/- | I-07, I-08 | Not started | `projects.yaml` and a page with two groups: data engineering ("Engenharia de dados") featured and analysis and ML ("Análise e ML") below. The ten projects in the table below appear with the links given; the four whose old link diverges keep the old one in `legacyLinks`; each URL was tested and the broken ones are listed in the issue; `dra-victoria-laufer` exists with `kind: client` and `draft: true` and is not published; `opendatasus_flu_analysis`, `agent-config` and `filipe-portfolio` do not appear |
| I-16 | Skills, certifications, education and languages on the home page | Hi/- | Md/- | I-08, I-11 | Not started | Fills `skills.yaml` with the content already decided in the plan. It is not conditional and blocks the release (I-18). The home page shows the skill groups, the four certifications with only the year obtained, education and languages, in PT and EN; nothing invented beyond the CV |
| I-17 | Basic SEO | Med/- | Md/- | I-07, I-11 | Not started | Metadata, canonical, `hreflang`, static Open Graph, sitemap, `robots.txt` and JSON-LD. The sitemap lists every route with the correct base path and the structured-data validator reports no errors |
| I-18 | MVP release | Hi/- | Sm/- | I-03, I-04, I-11, I-14, I-15, I-16, I-17 | Not started | Final checklist and Filipe's review, including the English texts translated from the CV. Lighthouse ≥ 95 on the home page, the case study and the gallery; zero axe violations; every internal link valid; Filipe approves the PT and EN texts |

### I-15 projects

| Group | Project | Main link |
| --- | --- | --- |
| Data engineering | open-data-platform | Case study page and repo |
| Data engineering | airflow-covid-vaccines-etl | Repo |
| Analysis and ML | NPS Commentaries NLP Analysis | Repo `nps-nlp-script` and report |
| Analysis and ML | TalkingData Ad Fraud Detection | Repo `kaggle-talking-data-ad-fraud` |
| Analysis and ML | Grupo Bimbo Inventory Demand | Repo `kaggle-grupo-bimbo-inventory-demand` |
| Analysis and ML | Santander Customer Satisfaction | Repo `kaggle-santander-customer-satisfaction` and report |
| Analysis and ML | Telecom Company Churn Rate | Repo `telecom-company-churn` |
| Analysis and ML | Refund Analysis | Google Sheets (checked live) |
| Analysis and ML | Course Sales Dashboard | Data Studio (checked live) |
| Analysis and ML | IT Management Dashboard | Data Studio, the name from the old gallery; in Data Studio it appears as "TI Management" (checked live) |

"Checked live" is the check recorded in the final plan (HTTP 200, no login). I-15 tests each URL again.

---

## Phase 3 — Future content

**Scope:** detailed experience, client sheets, A Conta, PedsLetter and blog.

**Exit criteria:** each issue closes on its own.

| ID | Title | Expected/Seen Risk | Expected/Seen Size | Depends on | Status | Acceptance |
| --- | --- | --- | --- | --- | --- | --- |
| I-19 | Detailed professional experience page | Hi/- | Lg/- | I-18 and Filipe's answers | Not started | The issue starts with questions to Filipe about each experience (scope, decisions, results, what is confidential) and only then writes. The professional numbers from the CV go here, not in the MVP. All content comes from the answers recorded in the issue |
| I-20 | Professional and client project sheets | Hi/- | Md/- | I-19 | Not started | Includes `dra-victoria-laufer`, today reserved with only its public GitHub description. A sheet is published only with text Filipe approved |
| I-21 | Case studies of A Conta and PedsLetter | Hi/- | Lg/- | I-13 and Filipe's inputs | Not started | New projects; they depend on links and material from Filipe. Same criteria as I-14 |
| I-22 | Blog with RSS | Lo/- | Md/- | I-18 | Not started | List, post, tags and feed, published once there are two or three posts. Valid feed, and drafts absent in production |

---

## Phase 4 — Domain and measurement

**Scope:** domain, HTTPS, analytics and Search Console.

**Exit criteria:**

- [ ] Domain with HTTPS.
- [ ] Sitemap submitted.

| ID | Title | Expected/Seen Risk | Expected/Seen Size | Depends on | Status | Acceptance |
| --- | --- | --- | --- | --- | --- | --- |
| I-23 | Custom domain and HTTPS | Hi/- | Sm/- | Domain purchase and I-02 | Not started | Domain steps listed below. Given the DNS has propagated, when I open `https://filipeoliveira-hub.com.br`, then the site loads with a valid certificate, `www` and the `github.io` URL redirect, and canonical and sitemap use the domain |
| I-24 | Analytics with GoatCounter | Med/- | Sm/- | I-18 | Not started | The GoatCounter script and click events on the LinkedIn, GitHub, e-mail and repository links. A click on an outbound link creates an event in the dashboard and no cookie is set |
| I-25 | Search Console | Lo/- | Sm/- | I-23 | Not started | Property verified and sitemap accepted |

### Domain steps (I-23)

Only after buying `filipeoliveira-hub.com.br`:

1. Verify the domain in the GitHub account (TXT record).
2. In the Registro.br DNS, create the apex A records for `185.199.108.153`, `185.199.109.153`, `185.199.110.153` and `185.199.111.153`, plus GitHub's AAAA records.
3. Create the `www` CNAME pointing to `filipeoliveira94.github.io`.
4. Enter the domain in Settings → Pages and add `public/CNAME`.
5. Tick Enforce HTTPS once the certificate is issued.
6. Change `SITE_URL` to the domain and `BASE_PATH` to `/`.

---

## Phase 5 — Polish

**Scope:** per-page OG, dark theme and archiving the old portfolio.

**Exit criteria:** each issue closes on its own.

| ID | Title | Expected/Seen Risk | Expected/Seen Size | Depends on | Status | Acceptance |
| --- | --- | --- | --- | --- | --- | --- |
| I-26 | Per-page Open Graph image | Lo/- | Md/- | I-17 | Not started | The case study and the gallery have their own 1200×630 image |
| I-27 | Dark theme | Lo/- | Md/- | I-05 | Not started | AA contrast in both themes, diagrams included |
| I-28 | Archive the old portfolio | Med/- | Sm/- | I-18 | Not started | After the release: unpublish the GitHub Pages site of `filipe-portfolio` and archive the repository. Archiving alone does not take the old site down. The old Pages site is no longer served and the repository is archived |

---

## Plan risks

- **Base path.** A link written without the helper breaks only in production; I-02 covers this with a build in both modes.
- **CV dates.** The most recent entry reads May 2024 to May 2026; if the period has changed, Filipe corrects it in I-10.
- **Translation.** The CV is only in Portuguese; the English needs Filipe's review in I-18.
- **No downloadable résumé.** Recruiters who ask for a PDF rely on LinkedIn, so its link must be on the first screen.
- **Public repo.** Drafts are visible in the repository, even with `draft: true`.
- **Photo and CV.** They were received in the T3 thread; I-11 and I-16 use them. The photo does not enter this repository: it goes to the private `filipeoliveira-hub-assets` repository (D-021).
- **Private assets.** I-11 with the real photo depends on Filipe creating the assets repository, the read-only deploy key and the `ASSETS_DEPLOY_KEY` secret (steps in ADR-0001, D-021). Fork PRs build with the placeholder.

**Open items already mapped to future issues:** the Microsoft Fabric certification once it is issued; professional details (I-19 and I-20); A Conta and PedsLetter (I-21); domain and analytics (phase 4). None of them blocks phase 0.

---

## Changelog

| Date | Change |
| --- | --- |
| 2026-11-25 | I-29 verified: the repository docs are in English. Scope, acceptance and IDs unchanged |
| 2026-11-24 | New I-29: translate the docs to English. `verified` no longer needs double approval. Size and risk replace small/large in the flow (`AGENTS.md` §4.1); every issue gained the Expected/Seen Risk and Size columns |
| 2026-11-20 | Simplified development flow (D-019): Filipe merges into `main` |
| 2026-11-17 | D-021 (photos in the private assets repository): acceptance of I-03, I-04 and I-11 adjusted; private assets risk added |
| 2026-11-15 | Initial roadmap: phases 0 to 5 and issues I-01 to I-28 from the final plan, all `not started` |
