# SafeTrade Frontend (Next.js 16)

Modern, black‑themed Next.js app for the SafeTrade marketplace.

## Tech
- Next.js 16 (App Router)
- React 19
- Tailwind CSS
- Lucide icons
- Pusher client for Reverb realtime notifications

## Prerequisites
- Node.js 20+
- Backend API running at `http://localhost:8000`
- Reverb (WebSocket) running on `127.0.0.1:8080`

## Setup
```bash
cd /Users/mustakimahmedhasan/Workspace/Programming/projects/CSE311/frontend
npm install
```

Create `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_REVERB_KEY=local
NEXT_PUBLIC_REVERB_HOST=127.0.0.1
NEXT_PUBLIC_REVERB_PORT=8080
NEXT_PUBLIC_REVERB_SCHEME=http
```

Run:
```bash
npm run dev
```

Open: `http://localhost:3000`

## Scripts
- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run start` — run production build
- `npm run lint` — lint

## Key Pages
- `/` — Home
- `/shop` — Browse, search, filter, sort, paginate
- `/shop/[id]` — Product details
- `/cart` — Cart view + remove
- `/checkout` — Apply coupon + invoice preview
- `/orders` — Orders + return requests per item
- `/orders/[id]` — Invoice view
- `/returns` — Return request form (optional)
- `/dashboard` — Seller dashboard
- `/dashboard/post` — Create listing
- `/admin` — Admin dashboard
- `/admin/users` — Manage users + roles
- `/admin/products` — Manage listings
- `/admin/coupons` — Manage coupons
- `/admin/returns` — Approve/reject returns
- `/notifications` — Realtime notifications

## Auth
JWT tokens are stored in `localStorage` and used for API requests. Navbar updates based on role.

## Realtime Notifications
The app connects to Reverb via Pusher client and listens on:
`private-users.{id}` for `notification.created`.

If Reverb is down, pages still work; notifications update once it’s back.

## Project Structure
- `app/` — routes and pages
- `components/` — UI components
- `lib/` — API clients, auth helpers, realtime
- `styles/` — global styles

## Notes
- Icons use `lucide-react`.
- Pagination uses 2 items per page (testing). Adjust in `app/shop/page.tsx`.
