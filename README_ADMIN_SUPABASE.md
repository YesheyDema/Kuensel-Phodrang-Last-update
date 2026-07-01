# Admin & Donation System with Supabase

## Quick Start

See **[ADMIN_SETUP.md](ADMIN_SETUP.md)** for complete setup instructions and credentials.

## Overview

This project integrates Supabase for:
- **Admin Authentication** — secure login at `/admin/login`
- **Donation Management** — admin dashboard at `/admin/dashboard`
- **File Storage** — payment screenshots via Supabase Storage
- **Database** — all donations and admin data stored securely

## Features

✅ Public donation form with optional screenshot upload  
✅ Admin login (Supabase Auth, fixed email)  
✅ Forgot password and password reset flow  
✅ Admin dashboard to view & verify donations  
✅ Donor names display (optional anonymous donations)  
✅ Phone number & screenshot upload (optional)  
✅ Server-side validation & authorization  
✅ Signed URLs for screenshot access (no direct file exposure)

## File Structure

- **[ADMIN_SETUP.md](ADMIN_SETUP.md)** — Step-by-step setup guide (START HERE)
- **[supabase_admin_table.sql](supabase_admin_table.sql)** — SQL to create admin metadata and donation policies
- **[.env.local.example](.env.local.example)** — Template for environment variables
- **lib/supabase-browser.ts** — Client-side Supabase client
- **lib/supabase-server.ts** — Server-side Supabase admin client
- **app/api/donations/route.ts** — Public donation submission API
- **app/api/admin/verify/route.ts** — Admin-only donation verification API
- **app/admin/login/page.tsx** — Admin login page
- **app/admin/dashboard/page.tsx** — Admin dashboard

## Key Implementation Details

### API Endpoints

**POST /api/donations**
- Public endpoint to submit donations
- Accepts FormData with optional `screenshot` file
- Returns 200 on success, stores in Supabase

**GET /api/donations**
- Admin-only endpoint (requires valid Supabase session token)
- Returns all donations with signed screenshot URLs

**POST /api/admin/verify**
- Admin-only endpoint to change donation status
- Requires valid Supabase token + ADMIN_EMAIL match
- Body: `{id, status}` where status is "verified" or "rejected"

### Security

✓ Service role key stored in `.env.local` (server-only, not committed)  
✓ Admin APIs validate email against `ADMIN_EMAIL` env var, defaulting to `codemasterwang@gmail.com`  
✓ Screenshots stored in private Supabase bucket  
✓ Signed URLs generated server-side (time-limited access)  
✓ Row-level security (RLS) on database tables  

## Next Steps

1. Follow [ADMIN_SETUP.md](ADMIN_SETUP.md)
2. Run SQL in Supabase
3. Create admin auth user
4. Set environment variables
5. Test login at `/admin/login`

