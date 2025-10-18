# Enggal Group API Reference (Summary)

Base URL: `http://localhost:3003`

## Auth
Swagger is configured with Bearer auth (Authorization: `Bearer <token>`). Guards are not currently enforced; planned addition.

## Response Envelope
All endpoints return a normalized envelope:
```json
{
  "statusCode": 200,
  "message": "Success",
  "data": { /* payload */ }
}
```
Errors:
```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "data": { /* validationErrors when applicable */ }
}
```

## Static Assets
- `GET /uploads/:filename` → serves uploaded files

## Uploads
- `POST /upload` (multipart: `file`) → returns object with file URL under `/uploads/<filename>`

Example:
```bash
curl -X POST "http://localhost:3003/upload" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@./image.png"
```

---

## Brand
- `POST /brand` (multipart) fields:
  - `nama` (string)
  - `description` (string)
  - `logo` (binary) required
- `GET /brand?page&limit`
- `GET /brand/:id`
- `PUT /brand/:id` (multipart) fields:
  - `nama` (string)
  - `description` (string)
  - `logo` (binary) optional
- `DELETE /brand/:id`

Create example:
```bash
curl -X POST "http://localhost:3003/brand" \
  -H "Content-Type: multipart/form-data" \
  -F "nama=Bakso Enggal" \
  -F "description=Restoran bakso prasmanan pertama di Indonesia" \
  -F "logo=@./logo.png"
```

---

## Promo
- `POST /promo` (multipart) fields:
  - `title`, `subtitle`, `description`, `syaratKetentuan`, `berlakuHingga` (YYYY-MM-DD), `brandId`, `image` (binary) required
- `GET /promo?page&limit&brandId?`
- `GET /promo/:id`
- `PUT /promo/:id` (multipart; `image` optional)
- `DELETE /promo/:id`

Create example:
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

---

## Outlet
- `POST /outlet` (JSON)
- `GET /outlet?page&limit&brandId?`
- `GET /outlet/:id`
- `PUT /outlet/:id` (JSON)
- `DELETE /outlet/:id`

Create example:
```bash
curl -X POST "http://localhost:3003/outlet" \
  -H "Content-Type: application/json" \
  -d '{
    "brandId": "<brand-uuid>",
    "kota": "Malang",
    "jamOperasional": "10:00-21:00",
    "lokasi": "Jl. Contoh No. 123",
    "image": "/uploads/outlet.jpg",
    "googleMapsLink": "https://maps.google.com/...",
    "whatsappUrl": "https://wa.me/6281234567890"
  }'
```

---

## Team
- `POST /team` (JSON)
- `GET /team?page&limit`
- `GET /team/:id`
- `PUT /team/:id` (JSON)
- `DELETE /team/:id`

---

## Berita (News)
- `POST /berita` (multipart; `image` optional) fields:
  - `judul`, `createdDate` (YYYY-MM-DD), `penulis`, `content`, `image` (binary optional)
- `GET /berita?page&limit`
- `GET /berita/:id`
- `PUT /berita/:id` (multipart; `image` optional)
- `DELETE /berita/:id`

Create example:
```bash
curl -X POST "http://localhost:3003/berita" \
  -H "Content-Type: multipart/form-data" \
  -F "judul=Grand Opening Outlet Baru" \
  -F "createdDate=2025-01-15" \
  -F "penulis=Tim Marketing" \
  -F "content=Konten berita..." \
  -F "image=@./berita.jpg"
```

---

## User
- `POST /user` (JSON)
- `GET /user` (list)
- `GET /user/:id`
- `PUT /user/:id` (JSON)
- `DELETE /user/:id`

---

## User Career
- `POST /user-career` (JSON)
- `GET /user-career?page&limit`
- `GET /user-career/:id`
- `PUT /user-career/:id` (JSON)
- `DELETE /user-career/:id`

---

## Docs & Spec
- Swagger UI: `http://localhost:3003/api`
- Scalar API Reference: `http://localhost:3003/swagger`
- Raw OpenAPI JSON: `http://localhost:3003/api-json` (use this to generate typed clients)

## Notes
- All list endpoints use query params `page` and `limit` (default: page 1, limit 10; max limit 100)
- Files saved under `/uploads/<filename>`; use provided URLs in records