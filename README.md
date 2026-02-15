# ESQLGuru

Your ESQL code guru.

## Project structure

This repository includes a starter monorepo-like layout for:
- `apps/web` for the frontend,
- `apps/api` for backend services and validator/reviewer logic,
- `docs` for architecture, API contracts, and planning,
- `data` for snippet templates and standards,
- `scripts` and top-level dev utilities.

## Quick start

```bash
npm install
./scripts/dev.sh
```

API will run at `http://localhost:3000` with:
- `GET /health`
- `POST /generate-snippet`
- `POST /validate-esql`
- `POST /review-esql`

## Validate locally

```bash
./scripts/test.sh
./scripts/lint.sh
```
