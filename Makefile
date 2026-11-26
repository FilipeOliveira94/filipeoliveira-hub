# filipeoliveira-hub — common development commands
#
# The Astro project has not been generated yet (I-01). Until then, the targets
# that depend on package.json stop with a message and install or create nothing.
# The commands are a forecast for Astro; I-01 adjusts them to the real scripts.

NPM ?= npm
NPX ?= npx

.PHONY: docs-lint help install dev build check clean

# Stops the recipe if the Astro project does not exist yet.
define require_package
	@if [ ! -f package.json ]; then \
		echo "package.json not found: the Astro project has not been generated yet (I-01, see ROADMAP.md)." >&2; \
		exit 1; \
	fi
endef

help: ## Lists the available targets
	@awk 'BEGIN {FS = ":.*##"; printf "Targets:\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  %-10s %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

install: ## Installs the dependencies (npm ci when there is a lockfile)
	$(require_package)
	@if [ -f package-lock.json ]; then $(NPM) ci; else $(NPM) install; fi

dev: ## Starts the Astro development server
	$(require_package)
	$(NPM) run dev

build: ## Builds the static site into dist/
	$(require_package)
	$(NPM) run build

check: ## Runs astro check
	$(require_package)
	$(NPX) astro check

docs-lint: ## Checks the Markdown tables (no empty header)
	python3 scripts/check_markdown_tables.py

clean: ## Removes dist/ and .astro/ (keeps node_modules)
	rm -rf dist .astro
