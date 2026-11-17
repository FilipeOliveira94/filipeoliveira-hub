# filipeoliveira-hub — comandos comuns de desenvolvimento
#
# O projeto Astro ainda não foi gerado (I-01). Até lá, os alvos que dependem
# de package.json param com uma mensagem e não instalam nem criam nada.
# Os comandos são a previsão para o Astro; a I-01 ajusta aos scripts reais.

NPM ?= npm
NPX ?= npx

.PHONY: docs-lint help install dev build check clean

# Para a receita se o projeto Astro ainda não existir.
define require_package
	@if [ ! -f package.json ]; then \
		echo "package.json não encontrado: o projeto Astro ainda não foi gerado (I-01, ver ROADMAP.md)." >&2; \
		exit 1; \
	fi
endef

help: ## Lista os alvos disponíveis
	@awk 'BEGIN {FS = ":.*##"; printf "Alvos:\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  %-10s %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

install: ## Instala as dependências (npm ci se houver lockfile)
	$(require_package)
	@if [ -f package-lock.json ]; then $(NPM) ci; else $(NPM) install; fi

dev: ## Sobe o servidor de desenvolvimento do Astro
	$(require_package)
	$(NPM) run dev

build: ## Gera o site estático em dist/
	$(require_package)
	$(NPM) run build

check: ## Roda o astro check
	$(require_package)
	$(NPX) astro check

docs-lint: ## Verifica as tabelas Markdown (nenhum cabeçalho vazio)
	python3 scripts/check_markdown_tables.py

clean: ## Remove dist/ e .astro/ (não remove node_modules)
	rm -rf dist .astro
