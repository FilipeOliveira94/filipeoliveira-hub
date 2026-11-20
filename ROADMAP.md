# Roadmap

Plano por issue do filipeoliveira-hub. Este arquivo é a fonte de **escopo, dependências, status e critério de aceite**. `PROJECT_STATUS.md` é o ledger operacional da fase corrente. O histórico fica em `docs/status-log.md`. As decisões fechadas ficam em `DECISIONS.md`.

As fases e as issues I-01 a I-28 vêm do plano final do PO (`filipeoliveira-hub-final.md`).

| Roadmap | Current |
| --- | --- |
| Last updated | 2026-11-20 |

**Tamanhos:** P até meio dia · M de um a dois dias · G de três a cinco dias.

**Status:** `not started` · `in progress` · `delivered` · `verified` · `blocked`

- **delivered:** a mudança existe na branch da issue e o PR está aberto.
- **verified:** o critério de aceite foi conferido, o resultado está em `docs/status-log.md` e a entrega teve aprovação dupla, PO e Reviewer.
- Não comece uma issue antes de as dependências dela estarem verificadas.
- Não crie diretórios vazios para fases que ainda não começaram.
- Cada issue é feita em branch própria, com PR. Regras em `AGENTS.md`.

---

## Escopo

**MVP:**

- Site no GitHub Pages em `FilipeOliveira94/filipeoliveira-hub`, com PT na raiz e EN em `/en/`. Toda página e todo item de conteúdo têm par PT/EN; o CI falha se faltar um. Os textos derivados do CV (hoje só em português) são traduzidos, e o Filipe revisa o inglês antes do release (I-18).
- Identidade visual nova (paleta, tipografia, tokens), criada do zero.
- Home com o título "Engenheiro de Dados Sênior", foto, e-mail, LinkedIn, GitHub, localização "São José dos Campos, SP, Brasil" (EN: "São José dos Campos, SP, Brazil"), contador dinâmico desde setembro de 2019, skills, formação, certificações, idiomas, recorte de experiências e destaques.
- Case completo do open-data-platform, com diagramas.
- Galeria de projetos, com engenharia em foco e análise em grupo separado.
- SEO básico e verificações de acessibilidade e performance no CI.

**Fora do MVP:**

- Página detalhada de experiência profissional e fichas de projetos de cliente (inclui os números profissionais do CV).
- Cases de A Conta e PedsLetter, projetos novos, em issue futura.
- Blog, domínio customizado, analytics, imagens Open Graph por página e tema escuro.
- Certificação Microsoft Fabric Data Engineer, só depois de emitida.

**Removido do plano:**

- Currículo em HTML e PDF para baixar.
- `opendatasus_flu_analysis`, `agent-skills` e o portfólio antigo como item da galeria.
- Telefone, e os cursos Hadoop/Spark e Django listados junto das certificações no CV, ficam fora do site por padrão.

---

## Visão das fases

| Fase | Escopo | Issues | Critério de saída | Status |
| --- | --- | --- | --- | --- |
| 0. Fundação | Repo, estrutura Astro, CI e deploy | I-01 a I-04 | URL do Pages responde com página inicial e CI verde | Not started |
| 1. Identidade e estrutura | Design, layout, i18n, collections, contador, experiências, home | I-05 a I-11 | Home PT/EN no ar com identidade aprovada, foto, experiências do CV e contador correto | Not started |
| 2. Conteúdo e release do MVP | Case, galeria, skills/formação/certificações/idiomas, SEO, qualidade | I-12 a I-18 | Itens do MVP no ar, inglês revisado pelo Filipe e issue de release fechada | Not started |
| 3. Conteúdo futuro | Experiência detalhada, fichas de cliente, A Conta, PedsLetter, blog | I-19 a I-22 | Cada issue fecha de forma independente | Not started |
| 4. Domínio e medição | Domínio, HTTPS, analytics, Search Console | I-23 a I-25 | Domínio com HTTPS e sitemap enviado | Not started |
| 5. Polimento | OG por página, tema escuro, arquivar o portfólio antigo | I-26 a I-28 | Cada issue fecha de forma independente | Not started |

---

## Fase 0 — Fundação

**Escopo:** repo, estrutura Astro, CI e deploy. Não há bloqueio de conteúdo para começar esta fase.

**Critério de saída:**

- [ ] A URL do Pages responde com a página inicial.
- [ ] O CI está verde.

O plano final deixava o push e a criação do repositório no GitHub com o Filipe. Pela instrução de 2026-11-15 (D-019), o Claude no T3 só dá push da branch da issue; o merge na `main` é do Filipe.

| ID | Título | Tam. | Depende de | Status | Aceite |
| --- | --- | --- | --- | --- | --- |
| I-01 | Criar repositório e estrutura Astro | P | — | Not started | Repo público `FilipeOliveira94/filipeoliveira-hub`, Astro com TypeScript, MDX e lint. `npm run build` gera `dist/` sem erros e `astro check` passa |
| I-02 | Caminho base configurável | P | I-01 | Not started | `site` e `base` lidos de variáveis e helper único para links e assets. Dado `BASE_PATH=/filipeoliveira-hub` ou `BASE_PATH=/`, quando o build roda, então a verificação de links em `dist/` passa nos dois casos |
| I-03 | Deploy no GitHub Pages | P | I-02 | Not started | Workflow de publicação em `main` com `configure-pages` e `deploy-pages`. Dado um push em `main`, quando o workflow termina, então a URL do Pages serve a nova versão com CSS e assets carregando. O workflow roda também em `pull_request` (sem deploy) e, quando o secret `ASSETS_DEPLOY_KEY` existe, faz o checkout de `FilipeOliveira94/filipeoliveira-hub-assets` em `.assets/` com `persist-credentials: false` (D-021); sem o secret, o build passa. O checkout principal usa `fetch-depth: 0` para a verificação de fotos da I-04 |
| I-04 | Verificações de PR | M | I-01 | Not started | `astro check`, build, verificação de links, axe e Lighthouse CI. Um PR com link interno quebrado, violação axe ou nota abaixo de 95 falha. O CI também falha se faltar o par PT/EN de uma página ou item de conteúdo, e se um arquivo de imagem estiver rastreado ou for adicionado por um commit do PR (`scripts/check-no-photos.mjs`, D-021) |

---

## Fase 1 — Identidade e estrutura

**Escopo:** design, layout, i18n, collections, contador, experiências e home.

**Critério de saída:**

- [ ] Home PT/EN no ar com a identidade aprovada.
- [ ] Foto e experiências do CV na home.
- [ ] Contador correto.

| ID | Título | Tam. | Depende de | Status | Aceite |
| --- | --- | --- | --- | --- | --- |
| I-05 | Identidade visual | M | I-01 | Not started | Paleta, tipografia, escala de espaçamento e tokens como variáveis CSS, com uma página de amostra dos componentes para aprovação. Todo par de texto e fundo da paleta tem contraste ≥ 4,5:1; as fontes são servidas localmente; o Filipe aprova a amostra antes de a I-06 fechar |
| I-06 | Layout base | M | I-05 | Not started | Cabeçalho, rodapé, navegação, seletor de idioma e link de pular para o conteúdo, usando os tokens. Navegação completa por teclado com foco visível e zero violações axe |
| I-07 | Roteamento PT/EN | M | I-02 | Not started | PT na raiz, EN em `/en/`, seletor de idioma e textos de interface em dicionário. Dado que estou numa página com par, quando uso o seletor, então chego à página equivalente; o `hreflang` é recíproco |
| I-08 | Collections e schemas | M | I-01 | Not started | `cases`, `projects`, `experience` e `skills` (inclui formação, certificações e idiomas) com Zod. Frontmatter inválido, case sem par PT/EN ou métrica sem `source` quebra o build |
| I-09 | Contador dinâmico de anos em dados | P | I-01 | Not started | Função `yearsSince` a partir de 2019-09-01, usada na home. Testes unitários cobrem 2026-08-31 → 6, 2026-09-01 → 7 e 2026-11-15 → 7; busca no repo não encontra o número escrito à mão em conteúdo |
| I-10 | Recorte de experiências | M | I-07, I-08 | Not started | `experience.yaml` com as seis experiências do CV, datas em mês e ano, em PT e EN. As seis entradas aparecem com os períodos e cargos do CV; nenhuma frase fora da fonte; o inglês é revisão do Filipe no release |
| I-11 | Home | M | I-06, I-08, I-09, I-10 | Not started | Título "Engenheiro de Dados Sênior", foto, contador, localização, experiências, skills, destaque do case e contato (e-mail, LinkedIn, GitHub). A foto não entra neste repositório (D-021): `scripts/prepare-assets.mjs` lê `photos/portrait.jpg` de `.assets/` (ou de `ASSETS_DIR`), recorta com `sharp` para `src/assets/generated/` e o Astro gera AVIF/WebP com texto alternativo; sem `.assets/`, o script sai com código 0 e a home mostra um placeholder neutro. Com o secret, o CI confere que a foto real está em `dist/`. Depende dos passos manuais do Filipe na ADR-0001 (D-021). Em viewport mobile, nome, foto, título, contador, cidade e links de contato aparecem sem rolagem; não há telefone |

---

## Fase 2 — Conteúdo e release do MVP

**Escopo:** case, galeria, skills/formação/certificações/idiomas, SEO e qualidade.

**Critério de saída:**

- [ ] Itens do MVP no ar.
- [ ] Inglês revisado pelo Filipe.
- [ ] Issue de release (I-18) fechada.

| ID | Título | Tam. | Depende de | Status | Aceite |
| --- | --- | --- | --- | --- | --- |
| I-12 | Mermaid em SVG no build | M | I-08 | Not started | `rehype-mermaid` com Playwright no CI. A página com diagrama não carrega JS de Mermaid e o SVG tem título e descrição |
| I-13 | Template de case | M | I-07, I-08 | Not started | Página com as oito seções do modelo e bloco de resumo. Um case de exemplo renderiza todas as seções em PT e EN |
| I-14 | Case open-data-platform | G | I-12, I-13 | Not started | Leitura do repo, perguntas ao Filipe, redação em PT e EN e pelo menos dois diagramas. Toda afirmação técnica aponta para arquivo ou documento do repo ou para resposta do Filipe; todo número tem fonte; lacunas ficam registradas na issue, não preenchidas |
| I-15 | Galeria de projetos | M | I-07, I-08 | Not started | `projects.yaml` e página com dois grupos, "Engenharia de dados" em destaque e "Análise e ML" abaixo. Os dez projetos da tabela abaixo aparecem com os links indicados; os quatro com link antigo divergente guardam o antigo em `legacyLinks`; cada URL foi testada e as quebradas estão listadas na issue; `dra-victoria-laufer` existe com `kind: client` e `draft: true` e não é publicado; `opendatasus_flu_analysis`, `agent-skills` e `filipe-portfolio` não aparecem |
| I-16 | Skills, certificações, formação e idiomas na home | M | I-08, I-11 | Not started | Preenche `skills.yaml` com o conteúdo já decidido no plano. Não é condicional e bloqueia o release (I-18). A home mostra os grupos de skills, as quatro certificações só com o ano de obtenção, a formação e os idiomas, em PT e EN; nada inventado fora do CV |
| I-17 | SEO básico | M | I-07, I-11 | Not started | Metadados, canonical, `hreflang`, Open Graph estático, sitemap, `robots.txt` e JSON-LD. O sitemap lista todas as rotas com o caminho base correto e o validador de dados estruturados não aponta erros |
| I-18 | Release do MVP | P | I-03, I-04, I-11, I-14, I-15, I-16, I-17 | Not started | Checklist final e revisão do Filipe, inclusive dos textos em inglês traduzidos a partir do CV. Lighthouse ≥ 95 em home, case e galeria; zero violações axe; todos os links internos válidos; Filipe aprova os textos PT e EN |

### Projetos da I-15

| Grupo | Projeto | Link principal |
| --- | --- | --- |
| Engenharia de dados | open-data-platform | Página do case e repo |
| Engenharia de dados | airflow-covid-vaccines-etl | Repo |
| Análise e ML | NPS Commentaries NLP Analysis | Repo `nps-nlp-script` e relatório |
| Análise e ML | TalkingData Ad Fraud Detection | Repo `kaggle-talking-data-ad-fraud` |
| Análise e ML | Grupo Bimbo Inventory Demand | Repo `kaggle-grupo-bimbo-inventory-demand` |
| Análise e ML | Santander Customer Satisfaction | Repo `kaggle-santander-customer-satisfaction` e relatório |
| Análise e ML | Telecom Company Churn Rate | Repo `telecom-company-churn` |
| Análise e ML | Refund Analysis | Google Sheets (conferido no ar) |
| Análise e ML | Course Sales Dashboard | Data Studio (conferido no ar) |
| Análise e ML | IT Management Dashboard | Data Studio, nome da galeria antiga; no Data Studio aparece como "TI Management" (conferido no ar) |

"Conferido no ar" é a verificação registrada no plano final (HTTP 200, sem login). A I-15 testa cada URL de novo.

---

## Fase 3 — Conteúdo futuro

**Escopo:** experiência detalhada, fichas de cliente, A Conta, PedsLetter e blog.

**Critério de saída:** cada issue fecha de forma independente.

| ID | Título | Tam. | Depende de | Status | Aceite |
| --- | --- | --- | --- | --- | --- |
| I-19 | Página detalhada de experiência profissional | G | I-18 e respostas do Filipe | Not started | A issue começa com perguntas ao Filipe sobre cada experiência (escopo, decisões, resultados, o que é confidencial) e só então escreve. Números profissionais do CV entram aqui, não no MVP. Todo conteúdo vem das respostas registradas na issue |
| I-20 | Fichas de projetos profissionais e de cliente | M | I-19 | Not started | Inclui `dra-victoria-laufer`, hoje reservado só com a descrição pública do GitHub. A ficha só é publicada com texto aprovado pelo Filipe |
| I-21 | Cases de A Conta e PedsLetter | G cada | I-13 e insumos do Filipe | Not started | Projetos novos; dependem de links e material do Filipe. Mesmo critério da I-14 |
| I-22 | Blog com RSS | M | I-18 | Not started | Lista, post, tags e feed, publicado quando houver dois ou três posts. Feed válido e rascunho ausente em produção |

---

## Fase 4 — Domínio e medição

**Escopo:** domínio, HTTPS, analytics e Search Console.

**Critério de saída:**

- [ ] Domínio com HTTPS.
- [ ] Sitemap enviado.

| ID | Título | Tam. | Depende de | Status | Aceite |
| --- | --- | --- | --- | --- | --- |
| I-23 | Domínio customizado e HTTPS | P | Compra do domínio e I-02 | Not started | Passos do domínio listados abaixo. Dado o DNS propagado, quando acesso `https://filipeoliveira-hub.com.br`, então o site carrega com certificado válido, `www` e a URL `github.io` redirecionam, e canonical e sitemap usam o domínio |
| I-24 | Analytics com GoatCounter | P | I-18 | Not started | Script do GoatCounter e eventos de clique nos links de LinkedIn, GitHub, e-mail e repositórios. Um clique em link de saída gera evento no painel e nenhum cookie é criado |
| I-25 | Search Console | P | I-23 | Not started | Propriedade verificada e sitemap aceito |

### Passos do domínio (I-23)

Só depois da compra de `filipeoliveira-hub.com.br`:

1. Verificar o domínio na conta do GitHub (registro TXT).
2. No DNS do Registro.br, criar os registros A do apex para `185.199.108.153`, `185.199.109.153`, `185.199.110.153` e `185.199.111.153`, mais os AAAA do GitHub.
3. Criar o CNAME de `www` para `filipeoliveira94.github.io`.
4. Informar o domínio em Settings → Pages e adicionar `public/CNAME`.
5. Marcar Enforce HTTPS quando o certificado sair.
6. Trocar `SITE_URL` para o domínio e `BASE_PATH` para `/`.

---

## Fase 5 — Polimento

**Escopo:** OG por página, tema escuro e arquivamento do portfólio antigo.

**Critério de saída:** cada issue fecha de forma independente.

| ID | Título | Tam. | Depende de | Status | Aceite |
| --- | --- | --- | --- | --- | --- |
| I-26 | Imagem Open Graph por página | M | I-17 | Not started | Case e galeria têm imagem própria de 1200×630 |
| I-27 | Tema escuro | M | I-05 | Not started | Contraste AA nos dois temas, inclusive nos diagramas |
| I-28 | Arquivar o portfólio antigo | P | I-18 | Not started | Depois do release: despublicar o GitHub Pages de `filipe-portfolio` e arquivar o repositório. Arquivar sozinho não tira o site antigo do ar. O Pages antigo deixa de ser servido e o repositório fica arquivado |

---

## Riscos do plano

- **Caminho base.** Um link escrito sem o helper quebra só em produção; a I-02 cobre isso com build nos dois modos.
- **Datas do CV.** A entrada mais recente está como mai/2024–mai/2026; se o período tiver mudado, o Filipe corrige na I-10.
- **Tradução.** O CV está só em português; o inglês precisa da revisão do Filipe na I-18.
- **Sem currículo para baixar.** Recrutadores que pedem PDF dependem do LinkedIn, então o link para ele precisa estar na primeira tela.
- **Repo público.** Rascunhos ficam visíveis no repositório, mesmo com `draft: true`.
- **Foto e CV.** Foram recebidos na thread do T3; a I-11 e a I-16 usam esses insumos. A foto não entra neste repositório: vai para o repositório privado `filipeoliveira-hub-assets` (D-021).
- **Assets privados.** A I-11 com a foto real depende de o Filipe criar o repositório de assets, a deploy key somente leitura e o secret `ASSETS_DEPLOY_KEY` (passos na ADR-0001, D-021). PRs de fork constroem com o placeholder.

**Pendências já mapeadas em issues futuras:** certificação Microsoft Fabric quando for emitida; detalhes profissionais (I-19 e I-20); A Conta e PedsLetter (I-21); domínio e analytics (fase 4). Nenhuma bloqueia a fase 0.

---

## Changelog

| Data | Mudança |
| --- | --- |
| 2026-11-20 | Fluxo de desenvolvimento simplificado (D-019): merge na `main` com o Filipe |
| 2026-11-17 | D-021 (fotos no repositório privado de assets): aceite da I-03, I-04 e I-11 ajustado; risco de assets privados adicionado |
| 2026-11-15 | Roadmap inicial: fases 0 a 5 e issues I-01 a I-28 do plano final, todas `not started` |
