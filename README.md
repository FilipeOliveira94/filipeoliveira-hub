# filipeoliveira-hub

Site of Filipe Oliveira, Data & Software Engineer. It brings together case studies with architecture diagrams, current and earlier projects and an experience summary, in Portuguese and English.

> The Astro structure has not been generated yet. Today this repository holds only the project documentation. The site is not live yet.

---

## Status

| Field | Now |
| --- | --- |
| Current phase | Phase 0 — Foundation. I-29 (docs in English) is verified; the site issues have not started |
| Next issue | I-01 — Astro structure, base path and deploy to GitHub Pages |
| Ledger | [`PROJECT_STATUS.md`](PROJECT_STATUS.md) · scope in [`ROADMAP.md`](ROADMAP.md) |

---

## Planned stack

| Item | Choice |
| --- | --- |
| Generator | Astro, with TypeScript and MDX |
| Content | Content Collections with a Zod schema |
| Languages | Portuguese at the root and English under `/en/` |
| Hosting | GitHub Pages, published by GitHub Actions |
| Planned URL | `https://filipeoliveira-hub.com.br` |
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

The targets below start working once the Astro project exists (I-01). Until then, `install`, `dev`, `build` and `check` stop with a message saying that `package.json` is missing.

```bash
make help      # lists the targets
make install   # installs the dependencies
make dev       # development server
make build     # static build into dist/
make check     # astro check
make docs-lint # checks the Markdown tables
make clean     # removes dist/ and .astro/
```

---

## Contributing

Each issue is done on its own branch, with a PR. Claude in T3 opens the PR, and only Filipe merges into `main`. The full rules are in [`AGENTS.md`](AGENTS.md).

## License

[MIT](LICENSE).
