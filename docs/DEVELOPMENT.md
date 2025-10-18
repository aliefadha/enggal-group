# Development & Collaboration Guide

This document standardizes how we work across backend (NestJS) and frontend (React). It complements the README files.

## Branching & Version Control
- Main branches: `main` (production), `develop` (integration)
- Feature branches: `feature/<scope>-<short-desc>` (e.g., `feature/brand-crud`)
- Fix branches: `fix/<scope>-<short-desc>` (e.g., `fix/promo-pagination`)
- Release branches: `release/<version>` (e.g., `release/1.0.0`)
- Tag releases and generate changelogs.

Commit style:
- Use concise, imperative messages: "Add brand logo upload", "Fix outlet list filter"
- Group small changes in a single commit; avoid noisy granular commits unless necessary

Pull requests:
- Target `develop`; squash-and-merge recommended for clean history
- Include description, screenshots (if UI), and link to issue/task
- PR template checklist:
  - [ ] Code compiles and lints
  - [ ] Tests (if applicable) updated or added
  - [ ] API docs (Swagger) updated if endpoints change
  - [ ] README updated if commands or env change
  - [ ] No hard-coded secrets; `.env` documented

## Environment & Secrets
- Backend: `.env` (see `be/.env.example`), critical keys:
  - `DATABASE_URL`, `PORT` (default 3003)
- Frontend: `.env.local` per app:
  - `VITE_API_URL` for API base
- Do NOT commit `.env*`; use `.env.example` for structure

## Coding Standards
Backend (NestJS):
- DTOs validate input (class-validator); controllers only orchestrate, services own business logic
- Use `ValidationPipe` and `TransformInterceptor` expectations for envelopes
- Keep Swagger decorators up-to-date (request/response schemas)

Frontend (React + Vite):
- Use React Query for data fetching/cache; Axios client with interceptors
- Co-locate components and hooks; avoid deep prop drilling; use context sparingly
- Type safety via TypeScript & Zod (runtime validation for requests/responses)
- Lazy-load large modules and images; leverage `vite-plugin-svgr` for SVGs as needed

## Testing Strategy
- Backend:
  - Unit tests for services and DTO validation
  - Integration tests against a test DB (Postgres in Docker)
  - Seed minimal data for list endpoints and pagination
- Frontend:
  - Unit tests for hooks/components (Vitest + React Testing Library)
  - Integration tests for flows (login, CRUD screens once auth exists)
  - Snapshot tests for critical UI

## Performance Targets
- Frontend bundle budget: initial JavaScript < 200KB gzip in production
- List rendering uses virtualization for long lists (e.g., >100 items)
- Images: responsive sizes; avoid loading full-res in list views
- React Query: cacheTime tuned; prefetch hot lists (promo/brand)

## CI/CD (Recommended)
- Lint + type-check on push/PR
- Backend test workflow (Nest + Prisma)
- Frontend build check (Vite) and basic tests
- Optionally generate and publish Swagger spec artifact

## API Types Generation (Optional)
- Generate `swagger-spec.json` and use `orval` or `swagger-typescript-api` to produce typed clients for dashboard
- Store generated clients under `fe/dashboard/src/api/` and exclude from manual edits

## Release & Documentation
- Update `README.md` when commands or envs change
- Update `docs/API.md` when endpoints or payloads change
- Maintain CHANGELOG.md at root; tag releases

## Troubleshooting
- Backend: check `PORT`, `DATABASE_URL`, Prisma migrations; confirm `docker-compose up -d` works
- Frontend: verify `VITE_API_URL` and CORS; inspect network tab for envelope structure