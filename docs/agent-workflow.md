# Prompts do fluxo de trabalho

Três prompts conduzem uma issue: planejar, implementar e fechar. Eles não dependem de ferramenta; as regras ficam em [`AGENTS.md`](../AGENTS.md). Troque os campos entre `<>`, rode o prompt de plano primeiro e aprove o plano antes de qualquer mudança em arquivo.

O fluxo é **branch + PR por issue**. O dev commita, dá push somente da branch da issue, abre o PR, analisa o CI e sinaliza ao PO e ao Reviewer. O dev nunca dá push na `main` (AGENTS.md §5).

---

## 1. Planejar (sem editar arquivos)

```text
Siga o AGENTS.md.

Quero trabalhar na issue: <I-NN> — <título>.

Primeiro leia o código, a documentação, o item da issue no ROADMAP.md, o critério de aceite e o PROJECT_STATUS.md. Não edite arquivos ainda.

Devolva:
1. Estado atual e arquivos relevantes.
2. Dependências e pré-requisitos.
3. Um plano de implementação pequeno e ordenado.
4. O critério de aceite e como cada item será verificado.
5. Riscos e premissas.
6. Os comandos exatos que serão executados.
7. Os arquivos que devem ser criados ou modificados.
8. Quais itens do "Checklist de fechamento de issue" (AGENTS.md §10) esta issue toca.
9. Para issue de conteúdo: a fonte de cada informação (CV, portfólio antigo ou resposta do Filipe) e as perguntas que precisam de resposta antes de escrever.

Mantenha o escopo nesta issue. Não implemente fases futuras e não mude a stack em silêncio. Espere a minha aprovação antes de editar.
```

## 2. Implementar (depois do plano aprovado)

```text
Siga o AGENTS.md.

Implemente só o plano que acabamos de combinar.
- Crie a branch da issue a partir da main atualizada. Não trabalhe na main.
- Mantenha o diff focado. Explique qualquer desvio antes de fazê-lo.
- Adicione ou atualize os testes do comportamento alterado.
- Não implemente tarefas de fases futuras.
- Não adicione dependências fora do plano aprovado.
- Não invente conteúdo: o que não tiver fonte fica registrado como lacuna na issue.
- Rode as verificações da issue e relate a saída real.
- Atualize a documentação e o PROJECT_STATUS.md só para o que foi de fato verificado.
- Não faça commit; o fechamento faz.

Ao final, informe os arquivos alterados, as verificações executadas, os resultados, os critérios de aceite cumpridos e pendentes, as limitações e a próxima tarefa recomendada.
```

## 3. Fechar

```text
Siga o AGENTS.md.

Revise o diff atual contra o plano combinado e o critério de aceite. Não adicione funcionalidades.
- Procure mudanças fora do escopo, segredos, arquivos gerados, testes fracos e comportamento não documentado.
- Confira que não há conteúdo sem fonte, PDF de currículo nem telefone.
- Rode as verificações e relate a saída real.
- Aponte os critérios de aceite não cumpridos ou não verificados.
- Aplique o "Checklist de fechamento de issue" (AGENTS.md §10).
- Faça o commit no padrão Conventional Commits, na branch da issue.
- Dê push somente da branch da issue, abra o PR e analise o CI. Nunca dê push na main (AGENTS.md §5).
- Com o CI analisado, sinalize ao PO e ao Reviewer que está pronto e classifique a mudança como pequena ou grande (AGENTS.md §3).

Devolva um relatório de conclusão curto, a branch, o hash do commit, o link do PR, o resultado do CI e a próxima tarefa.
```

Depois do PR, a entrega precisa da aprovação do PO e do Reviewer no mesmo head do PR. Mudança pequena (critério em AGENTS.md §3) precisa só do PO. Qualquer objeção bloqueia; cada correção (novos commits, CI analisado, novo sinal) é uma rodada e, após duas rodadas de divergência, o Filipe decide. Merge, exclusão de branch e CD são do Reviewer, sempre após o sim explícito do Filipe.
