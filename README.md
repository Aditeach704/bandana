# Bandana Agarbatti — Multi-page Store

A responsive multi-page storefront and staff/admin workspace for Bandana Agarbatti. Company information supplied by the owner: **founded in 1994 by Madan Mohan Ghatak**. Every public HTML page includes the small Silence Devs promotion in the footer.

## Run locally
1. Install Node.js 18+.
2. Copy `.env.example` to `.env` and set strong, unique `SESSION_SECRET`, `STAFF_EMAIL`, `STAFF_PASSWORD`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` values.
3. Run `npm install` and `npm start`.
4. Open `http://localhost:3000`.

On Android/Termux, keep the project under `$HOME` (for example `~/Bandana-Agarbatti`) rather than shared `/storage/emulated/0`, because npm packages may require symlinks.

## Initial development credentials
If no matching role account exists, the local-only defaults are `staff@bandana.local` / `ChangeMe123!` and `admin@bandana.local` / `ChangeAdmin123!`. **Change these before starting the public service.** Users are seeded once; changing environment variables later does not rotate an existing account's password. Remove the default seeded account or update its credentials before launch.

## Real data, not demo timestamps
Orders, users and catalogue data are stored on the server in `data/orders.json`, `data/users.json` and `data/products.json`. Order creation/update timestamps are generated on the server with `new Date().toISOString()`. Staff/admin dashboards query server APIs and periodically refresh; they do not use fabricated order dates or sample orders. `GET /api/health` exposes the server's current UTC timestamp. No sample orders are preloaded. Product catalogue prices seeded from the provided catalogue are preliminary; verify every name, pack size and price against the original catalogue before taking real orders. Images are placeholders until you add licensed product photos under `public/images/products/` and update `data/products.json`.

## Orders and payment status
Customers must register/sign in, add products to cart and provide recipient name, phone, complete address, city, state, six-digit PIN, optional landmark and delivery notes. Orders appear in the staff panel with address and a Google Maps search link. Staff can assign delivery personnel and change status. Payment defaults to cash on delivery and is **Pending**; staff must only mark an order **Paid** after independently verifying actual receipt. Online payment is deliberately not processed; selecting it does not charge anyone or mark an order paid. Configure a real Razorpay/other payment gateway, signature verification and webhook handling before enabling online payments.

## Page inventory
- Public: home, about, contact, FAQ, search, offers, order tracking, privacy, terms, shipping, refund, 404.
- Auth: login, register, forgot/reset password, verify account.
- Products: catalogue, details, agarbatti, dhoop, dhuno, puja products, reviews.
- Cart: cart, checkout, order success/failure.
- Customer: dashboard, profile, addresses, orders, order details, wishlist, change password.
- Staff: login, dashboard, orders, order details, customers, delivery, inventory.
- Admin: login, dashboard, products, add/edit product, categories, orders, customers, staff, coupons, reports, settings.

## Important production limitations
This is a functioning starter, not a hardened production commerce deployment. JSON file storage can lose updates under concurrent writes and is not suitable for multiple server instances. Express's default memory session store is not production-safe. Before taking real customer data, migrate to PostgreSQL/MySQL and a persistent session store, use HTTPS, rate limiting, CSRF protection, audited role management, encrypted backups, logging, data-retention controls and a tested restore plan. Password reset and verification pages explain that email is not configured; they do not pretend to send emails. The business should review tax, privacy, consumer, shipping and refund terms before launch.

## API overview
- `GET /api/health`, `GET /api/time`, `GET /api/me`
- `POST /api/register`, `POST /api/login`, `POST /api/logout`
- `GET /api/products`, `GET /api/products/:id`
- `POST /api/orders`, `GET /api/orders/mine`, `GET /api/orders/:id`
- Staff: `GET /api/staff/orders`, `GET /api/staff/summary`, `PATCH /api/staff/orders/:id`
- Admin: `/api/admin/products`, `/api/admin/orders`, `/api/admin/users`, `/api/admin/staff`, `/api/admin/reports`, `/api/admin/summary`, `/api/admin/settings`
