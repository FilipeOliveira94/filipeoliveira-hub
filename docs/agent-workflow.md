# Prompts do fluxo de trabalho

Três prompts conduzem uma issue: planejar, implementar e fechar. Eles não dependem de ferramenta; as regras ficam em [`AGENTS.md`](../AGENTS.md). Troque os campos entre `<>` e rode o prompt de plano primeiro. Na tarefa grande, o plano é aprovado antes de qualquer mudança em arquivo; na pequena, o Claude segue direto até o PR (AGENTS.md §4.1).

O fluxo é **branch + PR por issue**. O Claude no T3 commita, dá push somente da branch da issue, abre o PR com resumo e analisa o CI. Nunca dá push na `main` nem faz merge (AGENTS.md §5).

---

## 1. Planejar (sem editar arquivos)

```text
Siga o AGENTS.md.

Quero trabalhar na issue: <I-NN> — <título>.
Modo: <pequena | grande> (AGENTS.md §4.1).

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

Mantenha o escopo nesta issue. Não implemente fases futuras e não mude a stack em silêncio. Se, ao planejar, a tarefa se mostrar maior, reclassifique-a para grande. Tarefa grande: apresente o plano e espere a minha aprovação antes de editar. Tarefa pequena: siga direto para implementar e fechar.
```

## 2. Implementar (direto na tarefa pequena; depois do plano aprovado na grande)

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

Devolva um relatório de conclusão curto, a branch, o hash do commit, o link do PR, o resultado do CI e a próxima tarefa.
```

Depois do PR, o Filipe revisa, faz o merge e apaga a branch. Para um merge mais complicado, ele pode pedir ao Reviewer de Projetos (bot) que abra uma thread no T3 para o Claude revisar o PR e resumir o veredito. Nenhum agente ou bot faz merge.
