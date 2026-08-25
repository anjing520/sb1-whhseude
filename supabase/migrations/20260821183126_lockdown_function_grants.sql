/*
# Lock down SECURITY DEFINER function execute grants

1. Security Changes
   - Revoke EXECUTE on `handle_new_user()` from PUBLIC. This trigger function
     is only invoked by the `on_auth_user_created` trigger, never via the REST
     API, so no role needs direct EXECUTE.
   - Revoke EXECUTE on `is_admin()` from PUBLIC, then grant to `authenticated`
     only. It is called inside RLS policies (which run as the caller), so only
     authenticated users need it. anon never has a useful auth.uid(), so
     is_admin() returns false for them regardless.

2. Notes
   1. These functions previously inherited the default `GRANT EXECUTE TO PUBLIC`,
      which meant the anon role could call them via /rest/v1/rpc/. Revoking from
      PUBLIC closes that surface.
   2. The profiles auto-creation trigger still works: trigger functions run with
      the privileges of the table owner regardless of EXECUTE grants.
*/

REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated;

REVOKE EXECUTE ON FUNCTION public.is_admin() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM anon;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;
