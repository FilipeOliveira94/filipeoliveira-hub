# filipeoliveira-hub

Portfólio do Filipe Oliveira, Engenheiro de Dados. O site reúne um case técnico com diagramas de arquitetura, uma galeria de projetos e o recorte de experiências, em português e inglês, para apoiar a busca por vagas de Engenharia de Dados de nível sênior em diante.

> A estrutura Astro ainda não foi gerada. Este repositório tem hoje só a documentação do projeto. O site ainda não está no ar.

---

## Status

| Campo | Agora |
| --- | --- |
| Fase corrente | Fase 0 — Fundação. Não iniciada |
| Próxima issue | I-01 — Criar repositório e estrutura Astro |
| Ledger | [`PROJECT_STATUS.md`](PROJECT_STATUS.md) · escopo em [`ROADMAP.md`](ROADMAP.md) |

---

## Stack prevista

| Item | Escolha |
| --- | --- |
| Gerador | Astro, com TypeScript e MDX |
| Conteúdo | Content Collections com schema Zod |
| Idiomas | Português na raiz e inglês em `/en/` |
| Hospedagem | GitHub Pages, publicado por GitHub Actions |
| URL prevista | `https://filipeoliveira94.github.io/filipeoliveira-hub/` |

O motivo de cada escolha está em [`DECISIONS.md`](DECISIONS.md).

---

## Documentos

- [`ROADMAP.md`](ROADMAP.md): fases, issues I-01 a I-28, dependências e critério de aceite.
- [`DECISIONS.md`](DECISIONS.md): decisões fechadas e o que ficou dentro e fora do MVP.
- [`PROJECT_STATUS.md`](PROJECT_STATUS.md): estado da fase corrente e próximo trabalho.
- [`AGENTS.md`](AGENTS.md): regras para quem contribui, pessoa ou agente.
- [`docs/status-log.md`](docs/status-log.md): histórico.
- [`docs/agent-workflow.md`](docs/agent-workflow.md): prompts de planejar, implementar e fechar uma issue.

---

## Makefile

Os alvos abaixo passam a funcionar quando o projeto Astro existir (I-01). Antes disso, `install`, `dev`, `build` e `check` param com uma mensagem dizendo que falta o `package.json`.

```bash
make help      # lista os alvos
make install   # instala as dependências
make dev       # servidor de desenvolvimento
make build     # build estático em dist/
make check     # astro check
make clean     # remove dist/ e .astro/
```

---

## Como contribuir

Cada issue é feita em branch própria, com PR. Ninguém além do Reviewer dá push na `main`. As regras completas estão em [`AGENTS.md`](AGENTS.md).

## Licença

[MIT](LICENSE).
