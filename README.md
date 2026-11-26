# filipeoliveira-hub

Site of Filipe Oliveira, Data & Software Engineer. It brings together case studies with architecture diagrams, current and earlier projects and an experience summary, in Portuguese and English.

> The site is a placeholder page until the MVP release. It is published from `main` to GitHub Pages by `.github/workflows/deploy.yml`.

---

## Status

| Field | Now |
| --- | --- |
| Current phase | Phase 0 — Foundation is verified: the site is live at `https://filipeoliveira-hub.com.br` and CI is green. Phase 1 — Identity and home is next |
| Next issue | I-05 — Brand tokens and component sample |
| Ledger | [`PROJECT_STATUS.md`](PROJECT_STATUS.md) · scope in [`ROADMAP.md`](ROADMAP.md) |

---

## Stack

| Item | Choice |
| --- | --- |
| Generator | Astro, with TypeScript and MDX |
| Content | Content Collections with a Zod schema |
| Languages | Portuguese at the root and English under `/en/` |
| Hosting | GitHub Pages, published by GitHub Actions |
| URL | `https://filipeoliveira-hub.com.br` (the `github.io` URL redirects to it) |
| Identity | The Fi brand from the private assets repository, in light and dark themes |
| Diagrams | Branded SVG files, committed in light and dark versions |

The reason for each choice is in [`DECISIONS.md`](DECISIONS.md).

---

## Documents

- [`ROADMAP.md`](ROADMAP.md): phases, issues I-01 to I-32, dependencies and acceptance criteria.
- [`DECISIONS.md`](DECISIONS.md): settled decisions and what is in and out of the MVP.
- [`PROJECT_STATUS.md`](PROJECT_STATUS.md): state of the current phase and next work.
- [`AGENTS.md`](AGENTS.md): rules for contributors, people or agents.
- [`docs/status-log.md`](docs/status-log.md): history.
- [`docs/agent-workflow.md`](docs/agent-workflow.md): prompts to plan, implement and close an issue.

---

## Makefile

Node 22.23.4 or newer (`.nvmrc`).

```bash
make help      # lists the targets
make install   # npm ci from the lockfile
make dev       # development server
make build     # static build into dist/ (BASE_PATH=/ by default)
make check     # astro check
make lint      # ESLint
make test      # unit tests (Node's built-in test runner)
make links     # link and asset check on dist/ for BASE_PATH
make photos    # no image outside the D-027 places, tracked or added since origin/main
make pairs     # every page in dist/ and every content item has its PT/EN pair
make axe       # axe on every page of dist/, in light and dark (needs Chrome)
make lighthouse # Lighthouse CI on dist/ built with BASE_PATH=/ (needs Chrome)
make verify    # everything CI runs, in both base path modes
make docs-lint # checks the Markdown tables
make clean     # removes dist/, .astro/ and .lighthouseci/
```

`SITE_URL` and `BASE_PATH` set Astro's `site` and `base`. Locally both may be left unset. In CI they come from `actions/configure-pages`. Every internal link and asset goes through `withBase` in `src/lib/paths.ts`; a link written without it fails `make links` under `BASE_PATH=/filipeoliveira-hub`.

`make axe` and `make lighthouse` need Chrome. The Makefile uses the newest Playwright Chromium in `~/.cache/ms-playwright` when there is one; otherwise set `CHROME_PATH` or install Google Chrome. In CI, accessibility, best practices or SEO below 95 fail the PR and the performance score is reported in the job summary (D-014). The site is `noindex` until the release, so the Lighthouse `is-crawlable` audit is skipped until I-18.

The private assets (D-021) are fetched into `.assets/` only by CI, with the `ASSETS_DEPLOY_KEY` secret. The build passes without them.

---

## Contributing

Each issue is done on its own branch, with a PR. Claude in T3 opens the PR, and only Filipe merges into `main`. The full rules are in [`AGENTS.md`](AGENTS.md).

## License

[MIT](LICENSE).
