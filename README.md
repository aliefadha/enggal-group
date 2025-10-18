# Enggal Group Monorepo

A full-stack monorepo containing:
- Backend API (NestJS + Prisma + PostgreSQL) at `be/`
- Admin Dashboard (React + Vite) at `fe/dashboard/`
- Public Landing Page (React + Vite) at `fe/landing-page/`
- Local PostgreSQL via `docker-compose.yml`

## Purpose
Provide a robust administration interface and public site for managing and showcasing Enggal Group content: Brands, Promos, Outlets, Team Members, News (Berita), and Users/Careers. The backend exposes REST endpoints with consistent response envelopes and documentation via Swagger.

## Tech Stack
- Backend: NestJS 11, Prisma, PostgreSQL, Swagger
- Frontend: React 19 + Vite
- Infra: Docker (PostgreSQL)

## Directory Structure
```
enggal-group/
├── be/                 # NestJS API server
├── fe/
│   ├── dashboard/      # React admin dashboard
│   └── landing-page/   # React public site
└── docker-compose.yml  # Local Postgres service
```

## Quickstart

### 1) Start Database
```bash
# From repo root
docker compose up -d
```
Postgres will be available at `localhost:5435`.

### 2) Backend API
```bash
cd be
npm install

# Create .env with your database connection
cat > .env << 'EOF'
DATABASE_URL="postgresql://postgres:password@localhost:5435/enggal_group"
EOF

# Migrate and generate Prisma client
npx prisma migrate dev
npx prisma generate

# Start server (port 3003)
npm run start:dev
```
- API Docs: http://localhost:3003/api (Swagger UI)
- API Reference: http://localhost:3003/swagger
- Static uploads served at: `http://localhost:3003/uploads/<filename>`

### 3) Admin Dashboard
```bash
cd fe/dashboard
npm install

# Create .env.local to point to backend
cat > .env.local << 'EOF'
VITE_API_URL="http://localhost:3003"
EOF

npm run dev
```

### 4) Landing Page
```bash
cd fe/landing-page
npm install
npm run dev
```

## API Response & Error Envelope
All backend responses are normalized:
```json
// Success
{
  "statusCode": 200,
  "message": "Success",
  "data": { ... }
}
```
```json
// Error
{
  "statusCode": 400,
  "message": "Validation failed",
  "data": { /* validationErrors when applicable */ }
}
```

## File Uploads
Some endpoints require multipart/form-data:
- Brand: `logo` (required on create)
- Promo: `image` (required on create)
- Berita: `image` (optional)
- Generic upload: `POST /upload` with `file`

Example (create brand):
```bash
curl -X POST "http://localhost:3003/brand" \
  -H "Content-Type: multipart/form-data" \
  -F "nama=Bakso Enggal" \
  -F "description=Restoran bakso prasmanan pertama di Indonesia" \
  -F "logo=@./path/to/logo.png"
```

## Generating Frontend API Types (Optional)
After backend starts, it writes `swagger-spec.json`. Use it to generate TypeScript types for FE:
```bash
# From fe/dashboard
npx openapi-typescript ../../be/swagger-spec.json -o src/api/types.ts
```

## Development Conventions
- Branch naming: `feature/fe-dashboard-<scope>`, `feature/be-<module>-<scope>`, `fix/...`, `chore/...`, `docs/...`
- Commit style: Conventional Commits (e.g., `feat(brand): add logo upload`)
- Code review: lint, typecheck, build must pass before merge

## Troubleshooting
- DB connection refused: ensure Docker is running and port 5435 is available
- Prisma errors: verify `DATABASE_URL` and run `npx prisma migrate dev`
- CORS: backend enables CORS with credentials; ensure FE uses the correct `VITE_API_URL`

## License
Internal project. Copyright © Enggal Group.