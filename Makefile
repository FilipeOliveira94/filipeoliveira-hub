# filipeoliveira-hub — common development commands

NPM ?= npm
BASE_PATH ?= /
# Chrome for axe and Lighthouse: the newest Playwright Chromium when there is
# one; otherwise the installed Google Chrome is used.
CHROME_PATH ?= $(lastword $(wildcard $(HOME)/.cache/ms-playwright/chromium-*/chrome-linux64/chrome))
export CHROME_PATH

.PHONY: help install dev build check lint test links photos pairs axe lighthouse domain verify docs-lint clean

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

photos: ## Fails on an image file outside the D-027 places, tracked or added since origin/main
	$(NPM) run photos

pairs: ## Checks that every page in dist/ and every content item has its PT/EN pair
	$(NPM) run pairs

axe: ## Runs axe on every page of dist/ in light and dark (needs Chrome)
	BASE_PATH=$(BASE_PATH) $(NPM) run axe

lighthouse: ## Runs Lighthouse CI on dist/ built with BASE_PATH=/ (needs Chrome)
	$(NPM) run lighthouse

domain: ## Checks the live custom domain: HTTPS, certificate and redirects (SITE_URL and PAGES_URL required)
	@test -n "$(SITE_URL)" -a -n "$(PAGES_URL)" || { echo "Usage: make domain SITE_URL=https://<domain> PAGES_URL=https://<user>.github.io/<repo>/"; exit 2; }
	node scripts/check-domain.mjs --site "$(SITE_URL)" --pages "$(PAGES_URL)"

verify: lint check test docs-lint photos ## Everything CI runs: builds and checks in both base path modes, axe and Lighthouse
	BASE_PATH=/ $(NPM) run build && BASE_PATH=/ $(NPM) run links
	$(NPM) run pairs && BASE_PATH=/ $(NPM) run axe && $(NPM) run lighthouse
	BASE_PATH=/filipeoliveira-hub $(NPM) run build && BASE_PATH=/filipeoliveira-hub $(NPM) run links

docs-lint: ## Checks the Markdown tables (no empty header)
	python3 scripts/check_markdown_tables.py

clean: ## Removes dist/, .astro/, .lighthouseci/ and WSL Chrome profiles (keeps node_modules)
	rm -rf dist .astro .lighthouseci ./C:*
