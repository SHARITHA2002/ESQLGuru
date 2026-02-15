# ESQLGuru MVP Implementation Plan

This plan turns the current scaffold into a usable internal tool for IBM ACE / ESQL developers.

## Goal
Deliver an MVP that supports:
1. ESQL snippet generation,
2. deterministic ESQL validation,
3. AI-assisted code review.

## Phase 1: Foundation (1-2 days)
- Pick backend runtime (Node/TypeScript assumed in current scaffold).
- Add `package.json` files for `apps/api` and `apps/web`.
- Add a root workspace config to run both projects together.
- Introduce shared response/request types in `packages/shared-types`.

## Phase 2: API first (2-3 days)
- Implement HTTP server in `apps/api/src/main.ts`.
- Add endpoints:
  - `POST /generate-snippet`
  - `POST /validate-esql`
  - `POST /review-esql`
  - `GET /health`
- Return consistent JSON envelopes from all endpoints.

## Phase 3: Validation engine (2-3 days)
- Implement deterministic rules first:
  - naming conventions,
  - exception handling requirement,
  - SQL safety checks,
  - hardcoded value detection.
- Add severity levels (`low`, `medium`, `high`) and line hints.
- Add unit tests for each rule.

## Phase 4: Prompted generation/review (2-3 days)
- Finalize prompt templates in `apps/api/src/prompts`.
- Add model client retry + timeout handling.
- Parse model output into strict schema before returning it.

## Phase 5: Web UI (2-3 days)
- Build three pages:
  - Generate,
  - Validate,
  - Review.
- Add a Monaco editor and result panes.
- Provide copy-to-clipboard and JSON download actions.

## Phase 6: Team readiness (1-2 days)
- Add `.env` setup guide and secrets handling notes.
- Add docs for extending rule packs.
- Prepare short internal demo workflow for colleagues.

## Definition of done (MVP)
- Users can paste ESQL and receive deterministic validation results.
- Users can generate at least 4 snippet categories from templates/prompts.
- Users can request a structured AI code review with prioritized findings.
- Basic tests pass in API project and core UI renders without errors.
