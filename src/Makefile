# ======================
# Config
# ======================

# Default env file (can be overridden: make migrate ENV_FILE=.env.testing)
ENV_FILE ?= .env
PHP_ART = php artisan --env=$(shell basename $(ENV_FILE) | sed 's/.env//; s/\.//g')
INIT_FILE = /var/www/html/.initialized
LARAVEL_PATH=./src


# ======================
# Phony Targets
# ======================
.PHONY: migrate refresh rollback tinker cache-clear optimize \
		composer-update composer-install npm-install npm-build npm-dev \
		test env create-env force-env env-check init setup help


# ======================
# Laravel / Artisan
# ======================

migrate:
	@echo "🔄 Running migrations with $(ENV_FILE)..."
	$(PHP_ART) migrate
	@echo "✅ Migrations complete!"

refresh:
	@echo "🧹 Refreshing database with $(ENV_FILE)..."
	$(PHP_ART) migrate:fresh --seed
	$(MAKE) cache-clear
	@echo "✅ Database refreshed!"

rollback:
	$(PHP_ART) migrate:rollback

tinker:
	$(PHP_ART) tinker

cache-clear:
	$(PHP_ART) clear-compiled
	$(PHP_ART) config:clear
	$(PHP_ART) cache:clear
	$(PHP_ART) route:clear
	$(PHP_ART) view:clear

optimize:
	$(PHP_ART) optimize


# ======================
# Composer / NPM
# ======================

composer-update:
	composer update --ignore-platform-reqs

composer-install:
	@if [ ! -f vendor/autoload.php ]; then \
		echo "📦 Installing PHP dependencies..."; \
		composer install --no-interaction --prefer-dist --optimize-autoloader --ignore-platform-reqs; \
	else \
		echo "✅ PHP dependencies already installed. Skipping."; \
	fi

npm-install:
	@if [ ! -d node_modules ] || [ ! -f node_modules/.package-lock.json ]; then \
		echo "📦 Installing JS dependencies..."; \
		npm ci; \
	else \
		echo "✅ JS dependencies already installed. Skipping."; \
	fi

npm-build:
	npm run build

npm-dev:
	npm run dev


# ======================
# Testing
# ======================

test:
	@echo "🧪 Running tests with $(ENV_FILE)..."
	$(PHP_ART) test


# ======================
# ENV
# ======================

env:
	@if [ ! -f .env ]; then \
		cp .env.example .env && echo "✅ .env created from .env.example"; \
		$(PHP_ART) key:generate --ansi --force; \
	fi

force-env:
	cp .env.example .env && echo "♻️  .env recreated from example"
	$(PHP_ART) key:generate --ansi --force

# ======================
# 🧩 Install pre-commit and hooks
# ======================

install-pre-commit-hooks:
	@echo "🔧 Installing pre-commit hooks..."
	pre-commit install --install-hooks
	@echo "✅ Pre-commit hooks installed."

# 🧱 Run or reinstall pre-commit hooks
refresh-install-pre-commit-hooks:
	pre-commit uninstall
	pre-commit install --install-hooks
	@echo "🔁 Hooks reinstalled."

run-pre-commit:
	pre-commit run --all-files


# ======================
# Project Setup
# ======================

init:
	@if [ ! -f $(INIT_FILE) ]; then \
		$(MAKE) env; \
		$(PHP_ART) migrate:fresh --seed > /dev/null && echo "✅ Migrations & seeding complete!"; \
        touch $(INIT_FILE); \
		echo "✅ Laravel init complete!"; \
	else \
		echo "✅ Init already done. Skipping."; \
	fi

setup: composer-install init npm-install npm-build install-pre-commit-hooks
	@echo "✅ Project setup complete! Ready to code 🚀"


# ======================
# Help
# ======================

help:
	@echo "Available targets:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'
