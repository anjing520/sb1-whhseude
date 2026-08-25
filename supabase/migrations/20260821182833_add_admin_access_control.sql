/*
# Add status column, profiles table, and admin access control

1. Modified Tables
   - `quote_requests`
     - Add `status` (text, not null, default 'new') — workflow state of a request.
       Allowed values: new, reviewed, contacted, archived.
     - Add index on `created_at` to support the admin list's default date sorting.

2. New Tables
   - `profiles`
     - `id` (uuid, primary key) — mirrors auth.users.id, one row per user.
     - `role` (text, not null, default 'member') — 'member' or 'admin'.
     - `created_at` (timestamptz) — when the profile was created.
   - A trigger auto-creates a 'member' profile whenever a new auth user signs up,
     so every authenticated user has a corresponding profile row.

3. New Functions
   - `handle_new_user()` — SECURITY DEFINER trigger function that inserts a
     profile row for each new auth.users row.
   - `is_admin()` — SECURITY DEFINER helper that returns true when the calling
     user's profile has role = 'admin'. Used inside RLS policies so the access
     check lives on the server, not in the browser.

4. Security
   - Enable RLS on `profiles`.
   - profiles SELECT: a user can read their own row; admins can read all rows.
   - quote_requests SELECT + UPDATE: restricted to authenticated users whose
     profile role is 'admin' (via is_admin()). The existing anon INSERT policy
     stays in place so the public quote form and edge function continue to work.
   - EXECUTE on is_admin() is granted to authenticated so policies can call it.
   - EXECUTE on handle_new_user() needs no grant (called by the trigger only).

5. Notes
   1. The first admin must be promoted manually after signing up. Run:
      UPDATE profiles SET role = 'admin' WHERE id = '<auth-user-id>';
      or filter by email via a join to auth.users.
   2. The edge function inserts with the service role key, which bypasses RLS,
      so the new SELECT/UPDATE policies do not affect public quote submission.
*/

-- 1. status column + index on quote_requests
ALTER TABLE quote_requests
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'new'
  CHECK (status IN ('new', 'reviewed', 'contacted', 'archived'));

CREATE INDEX IF NOT EXISTS quote_requests_created_at_idx
  ON quote_requests (created_at DESC);

-- 2. profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'member' CHECK (role IN ('member', 'admin')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 3. trigger to auto-create a profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, role) VALUES (NEW.id, 'member');
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 4. is_admin helper
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

REVOKE EXECUTE ON FUNCTION public.is_admin() FROM anon, authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

-- 5. profiles policies
DROP POLICY IF EXISTS "select_own_or_all_profiles" ON profiles;
CREATE POLICY "select_own_or_all_profiles" ON profiles
  FOR SELECT TO authenticated
  USING (auth.uid() = id OR public.is_admin());

-- 6. quote_requests admin policies
DROP POLICY IF EXISTS "admins_select_quote_requests" ON quote_requests;
CREATE POLICY "admins_select_quote_requests" ON quote_requests
  FOR SELECT TO authenticated
  USING (public.is_admin());

DROP POLICY IF EXISTS "admins_update_quote_requests" ON quote_requests;
CREATE POLICY "admins_update_quote_requests" ON quote_requests
  FOR UPDATE TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());
