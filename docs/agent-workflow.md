# Workflow prompts

Three prompts drive an issue: plan, implement and close. The rules live in [`AGENTS.md`](../AGENTS.md). Replace the fields between `<>` and run the plan prompt first. Above S + Low, the plan is approved before any file change; an S + Low issue goes straight to the PR (AGENTS.md §4.1).

The flow is **branch + PR per issue**. Claude in T3 commits, pushes only the issue branch, opens the PR with a summary and reads the CI. It never pushes to `main` and never merges (AGENTS.md §5).

---

## 1. Plan (no file edits)

```text
Follow AGENTS.md.

I want to work on issue: <I-NN> — <title>.
Rating: <S|M|L> / <Low|Med|High> (the expected half of the roadmap's Risk and Size columns; estimate it in the plan if missing).

First read the code, the docs, the issue in ROADMAP.md, the acceptance criterion and PROJECT_STATUS.md. Do not edit files yet.

Return:
1. Current state and relevant files.
2. Dependencies and prerequisites.
3. A small, ordered implementation plan.
4. The acceptance criterion and how each item will be verified.
5. Risks and assumptions.
6. The exact commands that will be run.
7. The files to create or change.
8. Which items of the "Issue closing checklist" (AGENTS.md §10) this issue touches.
9. For a content issue: the source of each piece of information (CV, old portfolio or Filipe's answer) and the questions that need an answer before writing.
10. The Size and Risk, and whether planning raises either.

Keep the scope to this issue. Do not implement future phases and do not change the stack silently. If the issue turns out bigger or riskier, raise the rating and say why. Above S + Low: present the plan and wait for my approval before editing. S + Low: go straight on to implement and close.
```

## 2. Implement (straight away for S + Low; after the plan is approved otherwise)

```text
Follow AGENTS.md.

Implement only the plan we just agreed on.
- Create the issue branch from an up-to-date main. Do not work on main.
- Keep the diff focused. Explain any deviation before making it.
- Add or update the tests for the changed behavior.
- Do not implement tasks from future phases.
- Do not add dependencies outside the approved plan.
- Do not invent content: anything without a source is recorded as a gap in the issue.
- Run the issue's checks and report the actual output.
- Update the docs and PROJECT_STATUS.md only for what was actually verified.
- Do not commit; the close step does.

At the end, report the changed files, the checks run, the results, the acceptance criteria met and pending, the limitations and the recommended next task.
```

## 3. Close

```text
Follow AGENTS.md.

Review the current diff against the agreed plan and the acceptance criterion. Do not add features.
- Look for out-of-scope changes, secrets, generated files, weak tests and undocumented behavior.
- Check that there is no content without a source, no CV PDF and no phone number.
- Run the checks and report the actual output.
- Point out acceptance criteria that are not met or not verified.
- Apply the "Issue closing checklist" (AGENTS.md §10).
- Commit with Conventional Commits, on the issue branch.
- Push only the issue branch, open the PR and read the CI. Never push to main (AGENTS.md §5).

Return a short completion report, the branch, the commit hash, the PR link, the CI result and the next task.
```

After the PR, Filipe reviews it, merges it and deletes the branch. For a harder merge, he can open a T3 thread for Claude to review the PR. No agent merges.
