# filipeoliveira-hub — common development commands

NPM ?= npm
BASE_PATH ?= /

.PHONY: help install dev build check lint test links verify docs-lint clean

help: ## Lists the available targets
	@awk 'BEGIN {FS = ":.*##"; printf "Targets:\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  %-10s %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

install: ## Installs the pinned dependencies from the lockfile
	$(NPM) ci

dev: ## Starts the Astro development server
	$(NPM) run dev

build: ## Builds the static site into dist/ (BASE_PATH=/ by default)
	BASE_PATH=$(BASE_PATH) $(NPM) run build

check: ## Runs astro check (types and Astro diagnostics)
	$(NPM) run check

lint: ## Runs ESLint
	$(NPM) run lint

test: ## Runs the unit tests (Node's built-in test runner)
	$(NPM) test

links: ## Checks the internal links and assets in dist/ for BASE_PATH
	BASE_PATH=$(BASE_PATH) $(NPM) run links

verify: lint check test docs-lint ## Everything CI runs: also builds and checks links in both base path modes
	BASE_PATH=/ $(NPM) run build && BASE_PATH=/ $(NPM) run links
	BASE_PATH=/filipeoliveira-hub $(NPM) run build && BASE_PATH=/filipeoliveira-hub $(NPM) run links

docs-lint: ## Checks the Markdown tables (no empty header)
	python3 scripts/check_markdown_tables.py

clean: ## Removes dist/ and .astro/ (keeps node_modules)
	rm -rf dist .astro
