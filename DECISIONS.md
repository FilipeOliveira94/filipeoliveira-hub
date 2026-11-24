# Registro de decisões

Índice curto das decisões já fechadas para o filipeoliveira-hub. A fonte é o plano final do PO (`filipeoliveira-hub-final.md`, seções citadas na coluna Fonte) e as instruções do Filipe para a estrutura do repositório, de 2026-11-15.

| Registro | Referência |
| --- | --- |
| Este arquivo | Índice das decisões e do estado de cada uma |
| Relacionados | `ROADMAP.md`, `PROJECT_STATUS.md`, `AGENTS.md`, `docs/status-log.md` |

**Como usar:** a coluna Decisão diz o que foi escolhido. A coluna Implementado diz o que já existe e foi verificado no repositório; só muda com evidência de uma issue verificada, registrada em `docs/status-log.md`.

## Estados

| Estado | Significado |
| --- | --- |
| `proposed` | Preferida para o planejamento; ainda não fechada |
| `approved` | Fechada pelo Filipe ou pelo plano final |
| `superseded` | Substituída por uma decisão posterior |
| `rejected` | Recusada; mantida para consulta |

## Índice

| ID | Tema | Decisão | Implementado | Estado | Fonte |
| --- | --- | --- | --- | --- | --- |
| D-001 | Stack | Astro, e não Next com `output: 'export'`. O site é de conteúdo: zero JS por padrão, Content Collections com schema Zod e MDX nativos, i18n nativo em build estático, imagens otimizadas no build e `base` trocável por variável | — | `approved` | Plano §3 |
| D-002 | Hospedagem | GitHub Pages no repositório público `FilipeOliveira94/filipeoliveira-hub`, com Source = GitHub Actions. URL do MVP: `https://filipeoliveira94.github.io/filipeoliveira-hub/` | — | `approved` | Plano §6 |
| D-003 | Idiomas e rotas | PT na raiz e EN em `/en/`. Toda página e todo item de conteúdo têm par PT/EN, e o CI falha se faltar um. O inglês derivado do CV é tradução, revisada pelo Filipe antes do release (I-18) | — | `approved` | Plano §2, §4 |
| D-004 | Título da home | "Engenheiro de Dados Sênior", independentemente do cargo atual | — | `approved` | Plano §1 |
| D-005 | Identidade visual | Nova, criada do zero na I-05: paleta, tipografia e tokens como variáveis CSS. O MVP sai só com tema claro; o tema escuro é a I-27 | — | `approved` | Plano §2, §5 |
| D-006 | Currículo | Sem PDF de CV, sem currículo para baixar e sem página de currículo em HTML. Quem pede PDF usa o LinkedIn, que fica na primeira tela | — | `approved` | Plano §2, §4, §10 |
| D-007 | Fonte do conteúdo | Experiências, skills, formação, certificações, idiomas e métricas só do CV, do portfólio antigo quando o CV não cobrir o ponto, ou de resposta registrada do Filipe. Nada inventado. Lacuna fica registrada na issue | — | `approved` | Plano §4 |
| D-008 | Caminho base | `site` e `base` do Astro vêm de `SITE_URL` e `BASE_PATH`, preenchidas no workflow pela saída de `actions/configure-pages`. Todo link interno e asset passa por um helper único | — | `approved` | Plano §6 |
| D-009 | Contador de anos | Função pura `yearsSince('2019-09-01', hoje)`, em anos completos. Calculado no build e corrigido no cliente por um script inline mínimo. O número não é escrito em arquivo de conteúdo | — | `approved` | Plano §4 |
| D-010 | Diagramas | Mermaid no MDX vira SVG no build (`rehype-mermaid` com Playwright), sem JS no cliente. Se o Playwright pesar no build, a alternativa é versionar os SVG gerados com `mmdc` | — | `approved` | Plano §4 |
| D-011 | Contato e dados pessoais | A home mostra e-mail, LinkedIn, GitHub e a localização "São José dos Campos, SP, Brasil" (EN: "São José dos Campos, SP, Brazil"). Sem telefone | — | `approved` | Plano §2, §5 |
| D-012 | Certificações e cursos | As quatro certificações do CV aparecem só com o ano de obtenção, sem validade. Os cursos Hadoop/Spark e Django, listados junto das certificações no CV, ficam fora do site. A certificação Microsoft Fabric Data Engineer entra só depois de emitida | — | `approved` | Plano §2, §4 |
| D-013 | Galeria de projetos | Dois grupos: "Engenharia de dados" em destaque e "Análise e ML" abaixo. Descrição só com fonte (galeria antiga ou descrição do repositório no GitHub). Onde o link antigo diverge do repositório atual, `links` aponta para o atual e `legacyLinks` guarda o antigo. A galeria mantém o aviso de que os dados dos projetos são fictícios | — | `approved` | Plano §4, I-15 |
| D-014 | Qualidade | Lighthouse ≥ 95 nas quatro categorias, Core Web Vitals "bom" em mobile, zero violações axe e zero links internos quebrados no CI. Acessibilidade WCAG 2.2 AA. Orçamento: LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1, JS ≤ 50 KB por página | — | `approved` | Plano §1, §5 |
| D-015 | Verificações de PR e deploy | O PR roda `astro check`, build, verificação de links, axe e Lighthouse CI. A `main` publica com `actions/deploy-pages` | — | `approved` | Plano §6 |
| D-016 | Analytics | GoatCounter, na fase 4 (I-24). Gratuito para uso pessoal, sem cookies, código aberto, e mede cliques de saída. Plausible é pago; Cloudflare Web Analytics não mede esses cliques. Fora do MVP | — | `approved` | Plano §6 |
| D-017 | Domínio | `filipeoliveira-hub.com.br` só na fase 4 (I-23), depois da compra. Até lá o site fica na URL do GitHub Pages. Fora do MVP | — | `approved` | Plano §6 |
| D-018 | Escopo do MVP | Ver a seção "Escopo" abaixo | — | `approved` | Plano §2 |
| D-019 | Fluxo de trabalho | Branch + PR por issue a partir da fase 0. O Claude no T3 Code planeja, implementa numa branch nova a partir da `main` atualizada, roda as verificações, commita, dá push da branch e abre o PR com resumo; nunca faz merge. O Filipe revisa o PR, faz o merge e apaga a branch. Sem aprovação dupla. Sem bots de PO ou Reviewer; perfil `solo` do fluxo de agentes (sem subagentes de revisão). Tamanho e risco de cada issue decidem se o plano para para aprovação. Respostas, código e docs em inglês. Conventional Commits | Regras em `AGENTS.md` | `approved` | Instrução do Filipe, 2026-11-15; revisada em 2026-11-19, em 2026-11-20 (fluxo simplificado) e em 2026-11-24 (bots removidos) |
| D-020 | Licença | MIT, Copyright (c) 2026 Filipe Oliveira, o mesmo tipo do open-data-platform | `LICENSE` | `approved` | Instrução do Filipe, 2026-11-15 |
| D-021 | Fotos originais | Originais fora deste repositório, no repositório privado `filipeoliveira-hub-assets`, buscado no build do Actions por deploy key somente leitura. Detalhes em [ADR-0001](docs/decisions/0001-private-assets-repository.md) | — | `approved` | Instrução do Filipe, 2026-11-17 |

`—` significa que ainda não foi implementado ou verificado no repositório.

## Escopo (D-018)

**No MVP:**

- Site no GitHub Pages, com PT na raiz e EN em `/en/`.
- Identidade visual nova.
- Home com título, foto, e-mail, LinkedIn, GitHub, localização, contador dinâmico desde setembro de 2019, skills, formação, certificações, idiomas, recorte de experiências e destaques.
- Case completo do open-data-platform, com diagramas.
- Galeria de projetos, com engenharia em foco e análise em grupo separado.
- SEO básico e verificações de acessibilidade e performance no CI.

**Fora do MVP (fica para depois):**

- Página detalhada de experiência profissional e fichas de projetos de cliente, incluindo os números profissionais do CV.
- Cases de A Conta e PedsLetter.
- Blog, domínio customizado, analytics, imagens Open Graph por página e tema escuro.
- Certificação Microsoft Fabric Data Engineer, só depois de emitida.

**Removido do plano:**

- Currículo em HTML e PDF para baixar.
- `opendatasus_flu_analysis`, `agent-skills` e o portfólio antigo como item da galeria.
- Telefone, e os cursos Hadoop/Spark e Django listados junto das certificações no CV.

## Como registrar uma nova decisão

1. Acrescente uma linha ao índice, com o próximo ID, a decisão, o estado e a fonte (issue, resposta do Filipe ou documento).
2. Uma decisão que muda escopo, stack ou critério de aceite precisa do OK do Filipe antes de virar `approved`.
3. Quando a escolha estiver construída e verificada, preencha Implementado com o que existe de fato.
4. Acrescente uma linha ao Changelog.

## Changelog

| Data | Mudança |
| --- | --- |
| 2026-11-15 | Registro inicial: D-001 a D-018 a partir do plano final; D-019 e D-020 a partir das instruções do Filipe para a estrutura do repositório |
| 2026-11-17 | D-021 (ADR-0001): fotos originais no repositório privado `filipeoliveira-hub-assets`, buscado no build por deploy key somente leitura |
| 2026-11-19 | D-019 revisada pela adoção da skill fluxo-dev: o dev passa a analisar o CI e sinalizar ao PO e ao Reviewer; aprovação dupla no mesmo head, com exceção de mudança pequena só com o PO; rodadas, com decisão do Filipe após duas de divergência; merge, exclusão de branch e CD com o Reviewer após o sim do Filipe. Texto anterior: "Branch + PR por issue a partir da fase 0. O dev nunca faz push na `main` nem merge. O Reviewer faz o merge e o push da `main` depois do OK do Filipe. Entrega com aprovação dupla, PO e Reviewer. Conventional Commits" |
| 2026-11-20 | D-019 revisada pelo fluxo de desenvolvimento simplificado: o Claude no T3 abre o PR e nunca faz merge; o Filipe revisa, faz o merge e apaga a branch; sem aprovação dupla; PO de Projetos e Reviewer de Projetos só sob pedido do Filipe, sem merge nem push da `main` |
| 2026-11-24 | D-019 revisada: bots PO de Projetos e Reviewer de Projetos removidos. Texto anterior: "PO de Projetos e Reviewer de Projetos (bots) só agem quando o Filipe pede e nunca fazem merge nem push da `main`". O projeto tem perfil `solo` no fluxo de agentes (`AGENTS.md` §3, "Agent workflow"). Tamanho e risco substituem pequena/grande; respostas, código e docs em inglês (`AGENTS.md` traduzido; o resto na I-29) |
