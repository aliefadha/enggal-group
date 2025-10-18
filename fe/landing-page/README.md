# Enggal Group Landing Page (React + Vite)

A React-based public site for showcasing Enggal Group content (brands, promos, outlets, team, and latest news).

## Features (Planned/Typical)
- Display brands and their promos
- List outlets with location info and maps links
- Present team members
- Show latest berita (news) with images

## Getting Started
```bash
cd fe/landing-page
npm install
npm run dev
```

## Integration with Backend (Suggested)
Point the landing page to the same backend used by the admin dashboard and consume read-only endpoints:
- Brands: `GET /brand?page&limit`
- Promos: `GET /promo?page&limit&brandId?`
- Outlets: `GET /outlet?page&limit&brandId?`
- Team: `GET /team?page&limit`
- Berita: `GET /berita?page&limit`
- Static assets: `GET /uploads/:filename`

Example fetch using native `fetch`:
```ts
async function getBrands(page = 1, limit = 10) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/brand?page=${page}&limit=${limit}`)
  const envelope = await res.json() // { statusCode, message, data }
  return envelope.data
}
```

## Environment
- Reuse `VITE_API_URL` if needed (create `.env.local`):
```bash
VITE_API_URL="http://localhost:3003"
```

## Notes
- The landing page focuses on read-only views; mutations happen in the admin dashboard.
- Images in records reference `/uploads/<filename>` served by the backend.

## Deployment
- Standard Vite build: `npm run build` → deploy `dist/` to static hosting.

## License
Internal project. Copyright © Enggal Group.
