# Enggal Group API (NestJS)

A RESTful API for managing Enggal Group data: Brands, Promos, Outlets, Team Members, News (Berita), Users, and Careers. Built with NestJS 11, Prisma, and PostgreSQL.

## Features
- CRUD for core resources: `brand`, `promo`, `outlet`, `team`, `berita`, `user`, `user-career`
- File uploads with static serving via `/uploads`
- Global response normalization (success envelope)
- Centralized error handling (validation-aware error envelope)
- API documentation via Swagger and Scalar

## Tech Stack
- NestJS 11, Express
- Prisma ORM
- PostgreSQL (via Docker in local dev)
- Swagger (`/api`) and Scalar API Reference (`/swagger`)

## Getting Started

### Prerequisites
- Node.js >= 20, npm >= 10
- Docker (for local PostgreSQL)

### Setup & Run
```bash
cd be
npm install

# Configure database connection
cat > .env << 'EOF'
DATABASE_URL="postgresql://postgres:password@localhost:5435/enggal_group"
EOF

# Start local database (from repo root)
docker compose up -d

# Apply migrations and generate Prisma client
npx prisma migrate dev
npx prisma generate

# Start the API (port 3003)
npm run start:dev
```

### API Docs
- Swagger UI: http://localhost:3003/api
- Scalar Reference: http://localhost:3003/swagger

## Response Envelope
Successful responses are wrapped by `TransformInterceptor`:
```json
{
  "statusCode": 200,
  "message": "Success",
  "data": { /* resource payload */ }
}
```
Errors are handled by `HttpExceptionFilter`:
```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "data": { /* validationErrors when applicable */ }
}
```

## Endpoints Summary
- `POST /upload` (multipart: `file`) → returns file URL under `/uploads/<filename>`
- `GET /uploads/:filename` → serves uploaded assets

- `POST /brand` (multipart: `logo`, body: `nama`, `description`) → create brand
- `GET /brand?page&limit` → list brands (paginated)
- `GET /brand/:id` → brand details
- `PUT /brand/:id` (multipart: `logo` optional) → update brand
- `DELETE /brand/:id` → delete brand

- `POST /promo` (multipart: `image`, body: `title`, `subtitle`, `description`, `syaratKetentuan`, `berlakuHingga`, `brandId`) → create promo
- `GET /promo?page&limit&brandId?` → list promos (paginated, filter by brand)
- `GET /promo/:id` → promo details
- `PUT /promo/:id` (multipart: `image` optional) → update promo
- `DELETE /promo/:id` → delete promo

- `POST /outlet` (JSON) → create outlet
- `GET /outlet?page&limit&brandId?` → list outlets (paginated, filter by brand)
- `GET /outlet/:id` → outlet details
- `PUT /outlet/:id` → update outlet
- `DELETE /outlet/:id` → delete outlet

- `POST /team` (JSON) → create team member
- `GET /team?page&limit` → list team (paginated)
- `GET /team/:id` → team details
- `PUT /team/:id` → update team member
- `DELETE /team/:id` → delete team member

- `POST /berita` (multipart: `image` optional, body: `judul`, `createdDate`, `penulis`, `content`) → create news
- `GET /berita?page&limit` → list news (paginated)
- `GET /berita/:id` → news details
- `PUT /berita/:id` (multipart: `image` optional) → update news
- `DELETE /berita/:id` → delete news

- `POST /user` (JSON) → create user
- `GET /user` → list all users
- `GET /user/:id` → user details
- `PUT /user/:id` → update user
- `DELETE /user/:id` → delete user

- `POST /user-career` (JSON) → create career entry
- `GET /user-career?page&limit` → list careers (paginated)
- `GET /user-career/:id` → career details
- `PUT /user-career/:id` → update career entry
- `DELETE /user-career/:id` → delete career entry

## File Upload Examples
Create Brand:
```bash
curl -X POST "http://localhost:3003/brand" \
  -H "Content-Type: multipart/form-data" \
  -F "nama=Bakso Enggal" \
  -F "description=Restoran bakso prasmanan pertama di Indonesia" \
  -F "logo=@./logo.png"
```
Create Promo:
```bash
curl -X POST "http://localhost:3003/promo" \
  -H "Content-Type: multipart/form-data" \
  -F "title=Promo Spesial Akhir Tahun" \
  -F "subtitle=Diskon hingga 50%" \
  -F "description=Nikmati potongan harga besar" \
  -F "syaratKetentuan=Berlaku minimal Rp500.000" \
  -F "berlakuHingga=2024-12-31" \
  -F "brandId=<brand-uuid>" \
  -F "image=@./promo.jpg"
```

## Integration Notes
- CORS is enabled for common methods and headers
- Static files are served from `/uploads/`
- Swagger spec is written to `be/swagger-spec.json` on server start

### Generate Types for Frontend (Optional)
```bash
# from fe/dashboard
npx openapi-typescript ../../be/swagger-spec.json -o src/api/types.ts
```

## Authentication
Swagger is configured with Bearer auth, but guards are not yet enforced on controllers. Planned addition: JWT-based auth module.

## Testing
```bash
npm run test         # unit
npm run test:e2e     # e2e
npm run test:cov     # coverage
```

## License
Internal project. Copyright © Enggal Group.
