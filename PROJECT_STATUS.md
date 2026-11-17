# Project Status

Ledger operacional da **fase corrente**. O backlog de issues e o texto de aceite ficam em [`ROADMAP.md`](ROADMAP.md). Índice das decisões: [`DECISIONS.md`](DECISIONS.md). Histórico: [`docs/status-log.md`](docs/status-log.md).

| | |
| --- | --- |
| Repositório | [FilipeOliveira94/filipeoliveira-hub](https://github.com/FilipeOliveira94/filipeoliveira-hub) |
| Last updated | 2026-11-17 (America/Sao_Paulo). D-021 registrada (fotos no repositório privado de assets); nenhuma issue iniciada |
| Fase corrente | Fase 0 — Fundação |
| Status da fase | Not started |

**Status:** not started · in progress · delivered · verified · blocked

**Verified** significa que o critério de aceite foi conferido, que a evidência está em `docs/status-log.md` e que a entrega teve aprovação dupla, PO e Reviewer. Não trate o que está planejado como pronto.

**O que entra aqui:** objetivo atual, progresso das issues da fase corrente, aceite da fase, última validação, decisões que travam este trabalho, riscos ativos, bloqueios e próximo trabalho.

**O que não entra:** inventário de todas as issues (use `ROADMAP.md`), tabela completa de decisões (use `DECISIONS.md`) e histórico longo (use `docs/status-log.md`).

---

## Objetivo atual

**Fase 0 — Fundação.** Não iniciada.

O repositório tem só a estrutura documental: instruções para agentes, roadmap, decisões, este ledger, licença e um Makefile com alvos que ainda não fazem nada. O projeto Astro não foi gerado. Não há `package.json`, `src/`, `public/` nem workflow de CI.

## Next work

1. **I-01** — Criar repositório e estrutura Astro (P). Astro com TypeScript, MDX e lint. Aceite: `npm run build` gera `dist/` sem erros e `astro check` passa. Feita em branch própria, com PR. Detalhe: `ROADMAP.md` → Fase 0.

---

## Progresso da fase 0

| ID | Título | Status | Evidência |
| --- | --- | --- | --- |
| I-01 | Criar repositório e estrutura Astro | Not started | — |
| I-02 | Caminho base configurável | Not started | — |
| I-03 | Deploy no GitHub Pages | Not started | — |
| I-04 | Verificações de PR | Not started | — |

Texto de aceite de cada issue: `ROADMAP.md` → Fase 0.

### Aceite da fase 0

- [ ] A URL do Pages responde com a página inicial.
- [ ] O CI está verde.

---

## Última validação

| | |
| --- | --- |
| Data | 2026-11-15 |
| Ambiente | Checkout local em WSL2 |
| Verificações | `make help`; `make build` sem `package.json` |
| Resultado | `make help` lista os alvos. `make build` sai com código 2 e a mensagem de que o projeto Astro ainda não existe. Não há build, teste nem CI para rodar nesta etapa |

---

## Decisões ativas para esta fase

Índice completo: [`DECISIONS.md`](DECISIONS.md). Aqui só as que travam o trabalho corrente.

| ID | Relevância | Estado |
| --- | --- | --- |
| D-001 | A I-01 gera o projeto em Astro, com TypeScript e MDX | `approved` |
| D-002 | A I-03 publica no GitHub Pages com Source = GitHub Actions | `approved` |
| D-008 | A I-02 lê `SITE_URL` e `BASE_PATH` e cria o helper de links e assets | `approved` |
| D-015 | A I-04 roda `astro check`, build, links, axe e Lighthouse CI no PR | `approved` |
| D-019 | Branch + PR por issue; o dev não dá push na `main` nem faz merge | `approved` |

---

## Programa

| Fase | Escopo | Status |
| --- | --- | --- |
| 0 | Repo, estrutura Astro, CI e deploy | Not started |
| 1 | Identidade visual, layout, i18n, collections, contador, experiências, home | Not started |
| 2 | Case, galeria, skills, SEO e release do MVP | Not started |
| 3 | Conteúdo futuro: experiência detalhada, fichas de cliente, novos cases, blog | Not started |
| 4 | Domínio, HTTPS, analytics, Search Console | Not started |
| 5 | OG por página, tema escuro, arquivar o portfólio antigo | Not started |

---

## Riscos e limitações

- O Makefile tem alvos que dependem de `package.json`. Até a I-01, `install`, `dev`, `build` e `check` falham com uma mensagem clara. Os comandos de cada alvo são uma previsão e a I-01 ajusta aos scripts reais.
- Um link interno escrito sem o helper do caminho base quebra só em produção. A I-02 cobre isso com build nos dois valores de `BASE_PATH`.
- O repositório é público. Rascunhos ficam visíveis nele, mesmo com `draft: true`.
- A foto e o CV foram recebidos na thread do T3 e não estão no repositório. A I-11 e a I-16 dependem deles. A foto nunca entra neste repositório: vai para o repositório privado `filipeoliveira-hub-assets`, que o Filipe cria com a deploy key e o secret antes da I-11 (D-021).
- O plano final deixava o push e a criação do repositório com o Filipe. A instrução de 2026-11-15 põe o push da `main` com o Reviewer (D-019).

## Bloqueios

Nenhum.

---

## Log

Só as entradas recentes. Histórico completo: [`docs/status-log.md`](docs/status-log.md).

### 2026-11-17 — Fotos em repositório privado (D-021)

Decisão registrada em `DECISIONS.md` e aceite da I-03, I-04 e I-11 ajustado em `ROADMAP.md`. Nenhum código escrito. Verificado: nenhuma imagem rastreada nem no histórico.

### 2026-11-15 — Estrutura inicial do projeto

Um commit na `main` local, `chore: estrutura inicial do projeto`, cria `AGENTS.md`, `CLAUDE.md`, `DECISIONS.md`, `ROADMAP.md`, `PROJECT_STATUS.md`, `LICENSE`, `Makefile`, `docs/status-log.md` e `docs/agent-workflow.md`, e atualiza o `README.md`. Foi a exceção autorizada pelo Filipe ao fluxo de branch + PR. Não houve push. A fase 0 não foi iniciada; a próxima issue é a I-01.
