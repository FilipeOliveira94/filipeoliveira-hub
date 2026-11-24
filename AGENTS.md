# filipeoliveira-hub — Agent instructions

## 1. Project goal

Filipe Oliveira's portfolio site. It is proof of seniority for Senior, Staff, Principal and Specialist Data Engineering roles, in Brazil and remote, showing decisions, trade-offs and results.

The site is static, built with Astro and published on GitHub Pages at `FilipeOliveira94/filipeoliveira-hub`, with Portuguese at the root and English under `/en/`. Scope, phases and issues are in `ROADMAP.md`. Settled decisions are in `DECISIONS.md`.

## 2. Language

- Reply to Filipe in English; he may write in Portuguese.
- Code identifiers (variables, functions, files, schema keys), repository docs and commit messages are in English. Conventional Commits.
- Site content always has a PT and an EN pair.
- Docs written in Portuguese before 2026-11-24 stay in Portuguese until I-29 translates them. Until then, edit each file in its current language.

## 3. Roles

| Role | Responsibility |
| --- | --- |
| Filipe | Project owner. Picks the issue, decides scope and content, answers the issues' questions, approves plans, reviews the PR, merges it and deletes the branch. |
| Claude in T3 Code (Claude Opus 5.5) | Per issue: checks the rating, plans, implements on a new branch from an up-to-date `main`, runs the checks, commits, pushes the branch and opens the PR with a summary. Never merges. |

There are no PO or Reviewer bots and no review subagents in this project (see "Agent workflow" below). An issue is delivered as an open PR with a summary; Filipe approves and merges it.

### Agent workflow

Language, size and risk, and model policy: `~/.agents/claude/workflow.md` (repo `FilipeOliveira94/agent-config`).

- **Profile:** solo. Claude Opus 5.5 plans and implements; no review subagents.
- **Language:** English for everything; site content always in a PT and EN pair (§6).
- **High risk here:** the deploy workflow and the assets deploy key (D-021); content claims without a source (§6); anything that could publish a photo, a phone number or a CV file.
- **Model exceptions:** none

## 4. Required workflow

For each issue:

1. Read `PROJECT_STATUS.md`, the issue in `ROADMAP.md` and the related decisions in `DECISIONS.md`.
2. Check dependencies, assumptions, risks and the issue's acceptance criterion.
3. Check the issue's Size and Risk (section 4.1) and plan it. Above S + Low, present the plan and wait for Filipe's approval before editing files.
4. Create a branch for the issue from an up-to-date `main` (section 5).
5. Implement the smallest coherent increment that meets the acceptance.
6. Run the issue's checks (`make check`, `make build` and whatever the acceptance asks for) and read the result.
7. Fix regressions caused by the change.
8. Apply the closing checklist (section 10) on the same branch.
9. Commit, push **only the issue branch**, open the PR with the summary and read the CI.
10. Deliver the completion report (section 9). Filipe reviews the PR; requested changes become new commits on the same branch.

Do not mark an issue as done without verifying its acceptance criterion.

Do not silently change the stack, dependencies, scope or acceptance criterion. If the issue asks for such a change, record the proposal and wait for Filipe's decision.

An entry point of the issue that was not run is not verified. Say which one and why before treating the issue as done.

### 4.1 Size and risk

- Every issue carries a Size (S, M, L) and a Risk (Low, Med, High) on the scale in `~/.agents/claude/workflow.md`. Ratings go in the roadmap's Expected and Seen columns (format in the same file); until an issue has one, Claude rates it in the plan.
- **S + Low:** Claude plans and implements straight through to the PR.
- **Anything else:** Claude plans and **stops**: it presents the plan in the thread and waits for Filipe's approval before touching code. Approval arrives in the same thread, sometimes with adjustments; apply them before implementing.
- **High risk or L size:** the thread runs at Opus high effort, set when it starts; Claude never switches its own model or effort. An L plan says whether to split the issue.
- Claude may raise a rating while planning and says why; it never lowers one without Filipe.

## 5. Git and delivery

- From phase 0 on, all work is **branch + PR per issue**. One branch per issue, one PR per issue.
- Filipe's order to implement authorizes Claude in T3 to commit, push **only the issue branch**, open the PR and read the CI. Nobody but Filipe pushes to `main`.
- Merge and branch deletion are Filipe's. No agent or bot merges, deletes a branch or pushes to `main`.
- Use Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`, `test:`, `ci:`, `refactor:`).
- Do not use `--force` on a shared branch, do not rewrite `main`'s history and do not skip hooks without a recorded reason.
- The `chore: estrutura inicial do projeto` commit was made straight on local `main`. It was a one-time exception authorized by Filipe. Do not repeat it.

## 6. Content rules

- **Nothing invented.** Experience, skills, education, certifications, languages and metrics go in only when they come from one of these sources:
  1. Filipe's CV;
  2. the old portfolio, only when the CV does not cover the point;
  3. Filipe's answer recorded in the issue.
- A technical claim in a case points to a file or document in the project's repository, or to Filipe's answer. Every number has a source.
- A gap in information is recorded in the issue. Do not fill it with a guess.
- A project description in the gallery goes in only if it comes from the old gallery or from the repository description on GitHub. Without a source, the card shows only title, tag and link.
- **No CV PDF and no downloadable résumé on the site.** There is no HTML résumé page either.
- No phone number on the site.
- Every content item and every page has a PT and EN pair. English derived from the CV is a translation and needs Filipe's review before the release (I-18).
- The number of years of experience is never written by hand in any content file. It comes from the `yearsSince` function (I-09).
- Photos and source images do not go into this repository, not even in an intermediate commit. The originals live in the private `filipeoliveira-hub-assets` repository and the build fetches them (D-021).
- Do not version secrets, tokens or `.env` files with real values. The repository is public, and a draft with `draft: true` is visible in it too.

## 7. Technical principles

- Prefer the simple solution. The site is content and ships the minimum JavaScript to the client.
- Every internal link and every asset goes through the base path helper (I-02). A link written without the helper breaks only in production.
- Astro's `site` and `base` come from the `SITE_URL` and `BASE_PATH` variables. Do not write the site URL in code.
- Content lives in collections with a Zod schema. Invalid frontmatter breaks the build.
- Accessibility: WCAG 2.2 AA, contrast ≥ 4.5:1, visible focus, keyboard navigation, `lang` per page and a text summary for each diagram.
- Performance: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1, JS ≤ 50 KB per page, local fonts and AVIF/WebP images with explicit dimensions.
- Pin dependency versions and version the lockfile.
- Do not add a dependency, service or tool without explaining what it is for and what it costs to maintain.

## 8. Tests, verification and scope

- Run the narrowest check first, then the broader ones.
- Do not say a test passed if it was not run.
- If a dependency or external service is unavailable, report the limitation. Do not invent a result.
- Do not invent Lighthouse scores, performance metrics or accessibility results. Record what the tool showed.
- Work on one issue at a time. Do not implement future phases in the same change.
- Do not create empty directories for phases that have not started.
- Prefer an explicit TODO or a documented blocker over a speculative implementation.
- Markdown: every table has a header row that names its columns, drawn from context (`Issue P1-02 | Detail`, `Validation | Detail`). Never an empty `| | |` header, which GFM renders as a blank row on top. `make docs-lint` checks it.

## 9. Completion report

At the end of each task, report:

- Goal and summary of what was implemented.
- Files created or changed.
- Commands run.
- Checks that passed and failed.
- Acceptance criteria met and pending.
- Known limitations and risks.
- Branch, commit hash and PR link.
- Suggested next issue.

Filipe makes the final decisions and approves significant changes.

## 10. Issue closing checklist

Before the closing commit, on the issue branch, check each item and update only what the verified evidence supports:

- `ROADMAP.md`: the issue status, a Changelog line, the Last updated date, and the Seen rating once the roadmap has the rating columns.
- `PROJECT_STATUS.md`: the phase table, Next work consistent with the acceptance, and the Last updated date.
- `docs/status-log.md`: a new entry with what was done and what the checks showed.
- `DECISIONS.md`: a decision changes state, or gains the Implementado column, only with evidence from a verified issue.
- `README.md`: changes only when a phase closes, or when the issue changes how the repository is used.

`PROJECT_STATUS.md` tracks the **current phase** and is rewritten each phase. Do not use it as an evidence file. The issue inventory lives in `ROADMAP.md`, decisions in `DECISIONS.md` and history in `docs/status-log.md`.

Record what was implemented and what the checks showed. Do not record pauses, retries or recovery steps that do not change how to operate the result.

The prompts to plan, implement and close an issue are in `docs/agent-workflow.md`.

AGENTS.md is the single source; CLAUDE.md imports this file.
