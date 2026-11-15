# Status log (arquivo)

Histórico cronológico do projeto, com a entrada mais recente no topo. O ledger operacional é o [`PROJECT_STATUS.md`](../PROJECT_STATUS.md), que cobre só a fase corrente e é reescrito a cada fase. A evidência de cada issue fica aqui.

---

### 2026-11-15 — Estrutura inicial do projeto

Um commit na `main` local, `chore: estrutura inicial do projeto`, em cima de `45de9b0` (`docs: add README`). Foi a exceção autorizada pelo Filipe ao fluxo de branch + PR, que vale a partir da fase 0. Não houve push; o push da `main` é do Reviewer.

O commit cria `AGENTS.md`, `CLAUDE.md` (só `@AGENTS.md`), `DECISIONS.md`, `ROADMAP.md`, `PROJECT_STATUS.md`, `LICENSE` (MIT), `Makefile`, `docs/status-log.md` e `docs/agent-workflow.md`, e reescreve o `README.md`. O formato segue o do open-data-platform, adaptado ao site. As fases, as issues I-01 a I-28 e as decisões D-001 a D-018 vêm do plano final do PO. D-019 (fluxo de trabalho) e D-020 (licença) vêm das instruções do Filipe para esta estrutura.

O README anterior citava blog técnico e currículo PT/EN. O currículo foi removido do plano (D-006) e o blog é a I-22, na fase 3; o README novo não promete nenhum dos dois para o MVP.

Nenhum código do site foi escrito. Não há `package.json`, `src/`, `public/`, workflow de CI nem dependência Node. O Makefile tem os alvos `help`, `install`, `dev`, `build`, `check` e `clean`. Verificado neste checkout: `make help` lista os seis alvos; `make build` sem `package.json` imprime a mensagem de que o projeto Astro ainda não foi gerado e sai com código 2.

A fase 0 não foi iniciada. Todas as issues estão `not started`. A próxima é a I-01.
