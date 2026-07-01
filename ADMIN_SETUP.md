# Admin Setup Instructions

## Environment Variables Setup

1. **Copy the template to your local env file:**
   ```bash
   cp .env.local.example .env.local
   ```

2. **Update `.env.local` with your credentials** (see credentials below):
   - NEXT_PUBLIC_SUPABASE_URL ✓ (already provided)
   - NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ✓ (already provided)
   - SUPABASE_SERVICE_ROLE_KEY (retrieve from Supabase → Project Settings → API)
   - ADMIN_EMAIL (set to `codemasterwang@gmail.com`)

3. **IMPORTANT:** Never commit `.env.local` to git. It's already in `.gitignore`.

---

## Database Setup

1. **Go to your Supabase Project → SQL Editor**
2. **Copy and run all SQL from `supabase_admin_table.sql`**
3. This creates:
   - `admin_users` table (stores admin metadata)
   - Index on email (for fast lookups)
   - RLS policies (Row Level Security)
   - Default admin user metadata entry

---

## Create Admin Auth User

1. **Go to Supabase → Authentication → Users**
2. **Click "Create new user"** or **Invite user**
3. **Use these credentials:**
   - Email: `codemasterwang@gmail.com`
   - Password: create this in Supabase Auth

**NOTE:** Supabase Auth stores the password. Do not put the password in a table.

---

## Storage Setup

1. **Go to Supabase → Storage → Buckets**
2. **Create new bucket:**
   - Name: `donation-screenshots`
   - Privacy: Private (only authenticated users can access)

---

## Test the Setup

1. **Start the dev server:**
   ```bash
   pnpm dev
   ```

2. **Go to:**
   - Donation form: `http://localhost:3000/donate`
   - Admin login: `http://localhost:3000/admin/login`
   - Forgot password: `http://localhost:3000/admin/login/forgot-password`

3. **Admin login credentials:**
   - Email: `codemasterwang@gmail.com`
   - Password: the password you set in Supabase Auth

---

## Your Generated Admin Credentials

**Email:** codemasterwang@gmail.com  
**Temporary Password:** set in Supabase Auth

⚠️ **SECURITY NOTES:**
- Change the password after first login
- Store the service role key securely (never share or commit)
- Only the email set in `ADMIN_EMAIL` env var can access admin APIs
- All API requests are validated server-side

---

## Retrieve Service Role Key

1. Go to **Supabase Dashboard** → **Project Settings**
2. Click **API** tab
3. Copy the **Service Role Key** (labeled `service_role`)
4. Paste it into `.env.local` as `SUPABASE_SERVICE_ROLE_KEY`
