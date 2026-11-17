# ADR-0001: Fotos originais em repositório privado de assets

| Campo | Valor |
| --- | --- |
| Estado | `approved` |
| Aberta em | 2026-11-17 |
| Decidida em | 2026-11-17 |
| Dono | Filipe |
| ID no índice | D-021 |
| Issues relacionadas | I-03, I-04, I-11 |
| Substitui | — |
| Substituída por | — |

## Contexto / problema

A home usa uma foto do Filipe (I-11). Este repositório é público, e um arquivo commitado continua no histórico mesmo depois de apagado. A foto foi recebida como anexo na thread do T3 e ainda não está em nenhum repositório.

## Decisão

Este repositório continua público e não recebe fotos nem imagens de origem. Os originais ficam no repositório privado `FilipeOliveira94/filipeoliveira-hub-assets`, em tamanho web (cerca de 3000 px no lado maior), não em RAW; a foto da home fica em `photos/portrait.jpg`. O workflow do Actions faz o checkout desse repositório em `.assets/` com o secret `ASSETS_DEPLOY_KEY`, uma chave ed25519 cadastrada como deploy key somente leitura só no repositório de assets, com `persist-credentials: false`. O passo só roda quando o secret existe (`HAS_ASSETS_KEY`). Um script com `sharp` recorta os originais para `src/assets/generated/`, e o Astro gera AVIF/WebP. `.assets/` e `src/assets/generated/` ficam no `.gitignore`. Sem o secret (build local sem acesso, PR de fork), o build termina com um placeholder neutro. O CI falha se um PR adicionar arquivo de imagem a este repositório.

O repositório de assets é exclusivo deste site. Uma deploy key vale para um único repositório, então repositórios separados dão o menor privilégio e donos independentes. Repositórios privados não custam nada no plano gratuito do GitHub.

## Alternativas consideradas

| Opção | Prós | Contras | Por que não |
| --- | --- | --- | --- |
| Repositório privado só deste site, buscado no build (escolhida) | Originais e histórico privados; este repositório segue público e gratuito | Um segundo repositório, uma deploy key e um passo no workflow | — |
| Commitar a foto neste repositório | Build mais simples | O original e todas as versões ficam públicos no histórico | Rejeitada |
| Git LFS | Fica no mesmo repositório | Cota gratuita de 1 GB de armazenamento e 1 GB de banda por mês; cada clone do CI consome banda; os arquivos continuam públicos num repositório público | Rejeitada |
| Tornar este repositório privado | Um repositório só | GitHub Pages em repositório privado exige plano pago | Rejeitada |
| Repositório de assets compartilhado com outros sites | Um repositório para todos | A deploy key daria acesso às fotos de todos os sites | Rejeitada |

## Consequências e trade-offs

- A foto otimizada continua pública no site, como qualquer imagem de página. O que fica privado é o original e o histórico dele.
- O deploy pelo Actions não grava o site gerado em branch, então a foto otimizada também não entra no histórico deste repositório.
- PRs de fork não recebem o secret e constroem com o placeholder.
- Trabalho criado: a I-03 busca os assets no workflow (também em PR); a I-04 bloqueia imagem no PR com `scripts/check-no-photos.mjs`; a I-11 gera a foto com `scripts/prepare-assets.mjs`.
- Passos manuais do Filipe, antes da I-11:
  1. Criar o repositório privado `FilipeOliveira94/filipeoliveira-hub-assets` e subir `photos/portrait.jpg`.
  2. Gerar a chave fora de qualquer repositório: `ssh-keygen -t ed25519 -N "" -C filipeoliveira-hub-assets-deploy -f <pasta temporária>/assets_key`.
  3. Cadastrar `assets_key.pub` como deploy key do repositório de assets, **sem** "Allow write access".
  4. Gravar a chave privada como secret: `gh secret set ASSETS_DEPLOY_KEY -R FilipeOliveira94/filipeoliveira-hub < <pasta temporária>/assets_key`.
  5. Conferir que a chave clona o repositório de assets e que um push é recusado.
  6. Apagar `assets_key` e `assets_key.pub` do disco.

## Evidência / validação

Em 2026-11-17, neste checkout, `git ls-files` não lista imagem e `git log --all --diff-filter=A` por jpg, jpeg, png, webp, avif, heic, gif e tif não retorna nada: não há histórico a reescrever. Nada foi construído ainda; a evidência da implementação entra em `docs/status-log.md` na I-03, na I-04 e na I-11.

O mesmo modelo já está validado no repositório `dra-victoria-laufer` (ADR-0010 de lá).

## Revisitar quando

A deploy key não puder ficar somente leitura e restrita ao repositório de assets, ou a visibilidade de algum dos dois repositórios mudar.
