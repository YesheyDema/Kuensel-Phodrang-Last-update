-- Run this SQL in your Supabase SQL Editor to create required tables

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ============================================================
-- ADMIN USERS TABLE
-- ============================================================

CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text,
  role text DEFAULT 'admin',
  permissions text[] DEFAULT ARRAY['manage_donations', 'view_reports'],
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Explicit table grants (required for Data API access behavior changes)
GRANT SELECT ON public.admin_users TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.admin_users TO service_role;

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);

-- Enable RLS (Row Level Security)
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policy: Only authenticated users can view admin_users
CREATE POLICY "admins_can_view" ON admin_users
  FOR SELECT USING (email = 'codemasterwang@gmail.com' AND is_active = true);

-- Insert the default admin user metadata.
-- The actual password lives in Supabase Auth, not in this table.
INSERT INTO admin_users (email, name, role)
VALUES ('codemasterwang@gmail.com', 'Admin', 'admin')
ON CONFLICT (email) DO NOTHING;

-- ============================================================
-- DONATIONS TABLE
-- ============================================================

CREATE TABLE IF NOT EXISTS donations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_name text,
  donor_email text,
  donor_phone text,
  donor_country text,
  is_anonymous boolean DEFAULT false,
  amount numeric DEFAULT 0,
  purpose text,
  prayer_intention text,
  journal_number text UNIQUE,
  screenshot_path text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'rejected')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Explicit table grants (required for Data API access behavior changes)
GRANT INSERT ON public.donations TO anon;
GRANT SELECT, INSERT, UPDATE ON public.donations TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.donations TO service_role;

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_donations_status ON donations(status);
CREATE INDEX IF NOT EXISTS idx_donations_created_at ON donations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_donations_journal_number ON donations(journal_number);

-- Enable RLS
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

-- Policy: Public can insert donations (for form submission)
CREATE POLICY "anyone_can_insert_donations" ON donations
  FOR INSERT WITH CHECK (true);

-- Policy: Only authenticated admins can select/update donations
CREATE POLICY "admins_can_view_donations" ON donations
  FOR SELECT USING (auth.jwt() ->> 'email' = 'codemasterwang@gmail.com');

CREATE POLICY "admins_can_update_donations" ON donations
  FOR UPDATE USING (auth.jwt() ->> 'email' = 'codemasterwang@gmail.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'codemasterwang@gmail.com');

-- ============================================================
-- DONATIONS TABLE - Add Column if Using Updated Schema
-- ============================================================

-- If you had an existing donations table without prayer_intention, add it:
-- ALTER TABLE donations ADD COLUMN IF NOT EXISTS prayer_intention text;

