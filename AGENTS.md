# filipeoliveira-hub — Instruções para agentes

## 1. Objetivo do projeto

Site de portfólio do Filipe Oliveira. Serve de prova de senioridade para vagas Senior, Staff, Principal e Especialista em Engenharia de Dados, no Brasil e remotas, mostrando decisões, trade-offs e resultados.

O site é estático, feito em Astro, publicado no GitHub Pages em `FilipeOliveira94/filipeoliveira-hub`, com português na raiz e inglês em `/en/`. O escopo, as fases e as issues estão em `ROADMAP.md`. As decisões fechadas estão em `DECISIONS.md`.

## 2. Linguagem

- Comunique-se com o Filipe em português brasileiro.
- Identificadores de código (variáveis, funções, arquivos, chaves de schema) em inglês.
- Documentação do repositório em português.
- Mensagens de commit no padrão Conventional Commits. A descrição pode ser em português, como em `chore: estrutura inicial do projeto`.
- O conteúdo do site tem sempre par PT e EN.

## 3. Papéis

| Papel | Responsabilidade |
| --- | --- |
| Filipe | Dono do projeto. Escolhe a issue, decide escopo e conteúdo, responde às perguntas das issues, aprova o plano da tarefa grande, revisa o PR, faz o merge e apaga a branch. |
| Claude no T3 Code (Claude Opus 5.5) | Por issue: planeja, implementa numa branch nova a partir da `main` atualizada, roda as verificações, faz o commit, dá push da branch e abre o PR com resumo. Nunca faz merge. Fallback: Grok 4.7 pelo provider Cursor no T3, só quando acabar o limite do Claude Pro. |

Não há bots de PO ou Reviewer nem subagentes de revisão neste projeto (ver "Agent workflow" abaixo). A entrega de uma issue é o PR aberto com o resumo; quem aprova e faz o merge é o Filipe.

### Agent workflow

Gates e política de modelos: `~/.agents/claude/workflow.md` (repositório `FilipeOliveira94/agent-config`).

- **Profile:** solo. O Claude Opus 5.5 planeja e implementa; sem subagentes de revisão.
- **Model exceptions:** nenhuma

## 4. Fluxo de trabalho obrigatório

Para cada issue:

1. Leia `PROJECT_STATUS.md`, o item da issue em `ROADMAP.md` e as decisões relacionadas em `DECISIONS.md`.
2. Confira dependências, premissas, riscos e o critério de aceite da issue.
3. Planeje a tarefa e classifique-a como pequena ou grande (seção 4.1). Na tarefa grande, apresente o plano e espere a aprovação do Filipe antes de editar arquivos.
4. Crie uma branch para a issue a partir da `main` atualizada (seção 5).
5. Implemente o menor incremento coerente que cumpre o aceite.
6. Rode as verificações da issue (`make check`, `make build` e as que o aceite pedir) e leia o resultado.
7. Corrija as regressões causadas pela mudança.
8. Aplique o checklist de fechamento (seção 10) na mesma branch.
9. Faça o commit, dê push **somente da branch da issue**, abra o PR com o resumo e analise o CI.
10. Entregue o relatório de conclusão (seção 9). O Filipe revisa o PR; pedidos de ajuste viram novos commits na mesma branch.

Não marque uma issue como concluída sem ter verificado o critério de aceite.

Não mude em silêncio a stack, as dependências, o escopo ou o critério de aceite. Se a issue pedir uma mudança dessas, registre a proposta e espere a decisão do Filipe.

Um ponto de entrada da issue que não foi executado não está verificado. Diga qual é e por quê antes de tratar a issue como pronta.

### 4.1 Tarefa pequena ou grande

| Modo | Quando | O que o Claude faz |
| --- | --- | --- |
| Pequena | Docs, texto, ajuste de config, bump patch de dependência, ou bugfix contido de até ~50 linhas em até 3 arquivos, sem tocar arquitetura, modelo de dados ou schema, auth ou segurança, infra ou deploy, API pública ou lógica de pipeline. | Planeja e implementa direto até o PR. |
| Grande | Todo o resto, ou na dúvida. | Planeja e **para**: apresenta o plano na thread e espera a aprovação do Filipe antes de mexer em código. |

- O prompt da issue diz qual modo seguir.
- O Claude pode reclassificar a tarefa para grande se, ao planejar, ela se mostrar maior. Nunca reclassifica de grande para pequena.
- A aprovação chega na mesma thread, às vezes com ajustes. Incorpore os ajustes antes de implementar.

## 5. Git e entrega

- A partir da fase 0, todo trabalho é feito em **branch + PR por issue**. Uma branch por issue, um PR por issue.
- A ordem do Filipe para implementar autoriza o Claude no T3 a commitar, dar push **somente da branch da issue**, abrir o PR e ler o CI. Ninguém além do Filipe faz push na `main`.
- Merge e exclusão de branch são do Filipe. Nenhum agente ou bot faz merge, apaga branch ou dá push na `main`.
- Use Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`, `test:`, `ci:`, `refactor:`).
- Não use `--force` em branch compartilhada, não reescreva o histórico da `main` e não pule hooks sem motivo registrado.
- O commit `chore: estrutura inicial do projeto` foi feito direto na `main` local. Foi uma exceção única, autorizada pelo Filipe. Não repita.

## 6. Regras de conteúdo

- **Nada inventado.** Experiências, skills, formação, certificações, idiomas e métricas só entram quando vêm de uma destas fontes:
  1. o CV do Filipe;
  2. o portfólio antigo, só quando o CV não cobrir o ponto;
  3. resposta do Filipe registrada na issue.
- Afirmação técnica de um case aponta para um arquivo ou documento do repositório do projeto, ou para resposta do Filipe. Todo número tem fonte.
- Lacuna de informação fica registrada na issue. Não preencha com suposição.
- Descrição de projeto na galeria só entra se vier da galeria antiga ou da descrição do repositório no GitHub. Sem fonte, o cartão mostra só título, tag e link.
- **Sem PDF de CV e sem currículo para baixar no site.** Também não há página de currículo em HTML.
- Sem telefone no site.
- Todo item de conteúdo e toda página têm par PT e EN. O inglês derivado do CV é tradução e precisa da revisão do Filipe antes do release (I-18).
- O número de anos de experiência não é escrito à mão em nenhum arquivo de conteúdo. Ele vem da função `yearsSince` (I-09).
- Fotos e imagens de origem não entram neste repositório, nem em commit intermediário. Os originais ficam no repositório privado `filipeoliveira-hub-assets` e o build os busca (D-021).
- Não versione segredos, tokens nem arquivos `.env` com valores reais. O repositório é público, e um rascunho com `draft: true` também fica visível nele.

## 7. Princípios técnicos

- Prefira a solução simples. O site é de conteúdo e envia o mínimo de JavaScript ao cliente.
- Todo link interno e todo asset passam pelo helper do caminho base (I-02). Um link escrito sem o helper quebra só em produção.
- `site` e `base` do Astro vêm das variáveis `SITE_URL` e `BASE_PATH`. Não escreva a URL do site no código.
- Conteúdo fica em collections com schema Zod. Frontmatter inválido quebra o build.
- Acessibilidade: WCAG 2.2 AA, contraste ≥ 4,5:1, foco visível, navegação por teclado, `lang` por página e resumo textual para cada diagrama.
- Performance: LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1, JS ≤ 50 KB por página, fontes locais e imagens em AVIF/WebP com dimensões explícitas.
- Fixe as versões das dependências e versione o lockfile.
- Não adicione dependência, serviço ou ferramenta sem explicar para que serve e quanto custa manter.

## 8. Testes, verificação e escopo

- Rode primeiro a verificação mais estreita e depois as mais amplas.
- Não diga que um teste passou se ele não foi executado.
- Se uma dependência ou um serviço externo estiver indisponível, relate a limitação. Não invente um resultado.
- Não invente notas de Lighthouse, métricas de performance nem resultados de acessibilidade. Registre o que a ferramenta mostrou.
- Trabalhe em uma issue por vez. Não implemente fases futuras na mesma mudança.
- Não crie diretórios vazios para fases que ainda não começaram.
- Prefira um TODO explícito ou um bloqueio documentado a uma implementação especulativa.
- Markdown: toda tabela tem uma linha de cabeçalho que nomeia as colunas, tirada do contexto (`Issue P1-02 | Detalhe`, `Validação | Detalhe`). Nunca um cabeçalho vazio `| | |`, que o GFM mostra como linha em branco no topo. `make docs-lint` verifica.

## 9. Relatório de conclusão

Ao fim de cada tarefa, informe:

- Objetivo e resumo do que foi implementado.
- Arquivos criados ou modificados.
- Comandos executados.
- Verificações que passaram e que falharam.
- Critérios de aceite cumpridos e pendentes.
- Limitações e riscos conhecidos.
- Branch, hash do commit e link do PR.
- Próxima issue sugerida.

O Filipe toma as decisões finais e aprova as mudanças relevantes.

## 10. Checklist de fechamento de issue

Antes do commit de fechamento, na branch da issue, confira cada item e atualize só o que a evidência verificada sustenta:

- `ROADMAP.md`: o status da issue, uma linha no Changelog e a data de Last updated.
- `PROJECT_STATUS.md`: a tabela da fase, o Next work coerente com o aceite e a data de Last updated.
- `docs/status-log.md`: uma entrada nova, com o que foi feito e o que as verificações mostraram.
- `DECISIONS.md`: uma decisão só muda de estado, ou ganha a coluna Implementado, com evidência de uma issue verificada.
- `README.md`: muda só no fechamento de fase, ou quando a issue altera a forma de usar o repositório.

`PROJECT_STATUS.md` acompanha a **fase corrente** e é reescrito a cada fase. Não o use como arquivo de evidência. O inventário de issues fica em `ROADMAP.md`, as decisões em `DECISIONS.md` e o histórico em `docs/status-log.md`.

Registre o que foi implementado e o que as verificações mostraram. Não registre pausas, novas tentativas nem passos de recuperação que não mudam a forma de operar o resultado.

Os prompts de planejar, implementar e fechar uma issue estão em `docs/agent-workflow.md`.

AGENTS.md é a fonte única; CLAUDE.md importa este arquivo.
