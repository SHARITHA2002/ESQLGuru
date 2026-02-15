# ESQLGuru

Your ESQL code guru.

## Project structure

This repository includes a starter monorepo-like layout for:
- `apps/web` for the frontend,
- `apps/api` for backend services and validator/reviewer logic,
- `docs` for architecture, API contracts, and planning,
- `data` for snippet templates and standards,
- `scripts` and top-level dev utilities.

## What to do next

1. Follow `docs/mvp-implementation-plan.md` to build the first usable MVP.
2. Define request/response payloads in `docs/api-contracts.md` and mirror them in `packages/shared-types`.
3. Implement API routes in `apps/api/src/routes` and wire them from `apps/api/src/main.ts`.
4. Build deterministic validator rules in `apps/api/src/validators/rules` and test them.
5. Connect the web pages under `apps/web/src/app/routes` to real API calls.

## Suggested immediate milestone

Target a first internal demo with this flow:
- paste ESQL,
- run validator,
- get rule-based findings,
- request AI review,
- copy improved suggestions.
