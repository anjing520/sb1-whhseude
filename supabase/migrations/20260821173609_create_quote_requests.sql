/*
# Create quote_requests table

1. New Tables
   - `quote_requests`
     - `id` (uuid, primary key) — unique identifier for each request
     - `name` (text, not null) — contact person's full name
     - `email` (text, not null) — contact email address
     - `phone` (text) — optional phone number
     - `company` (text) — optional company name
     - `service` (text, not null) — the logistics service requested (e.g. Air Freight)
     - `origin` (text) — optional shipment origin
     - `destination` (text) — optional shipment destination
     - `message` (text) — optional additional details
     - `created_at` (timestamptz) — when the request was submitted

2. Security
   - Enable RLS on `quote_requests`.
   - This is a public marketing site with no sign-in. Visitors submit quote
     requests anonymously, so INSERT is allowed for `anon` and `authenticated`.
   - No public SELECT/UPDATE/DELETE policies are added, so submitted requests
     cannot be read back or modified from the anon-key frontend (write-only intake).

3. Notes
   1. The form only ever inserts; it never reads existing submissions, so the
      absence of a SELECT policy is intentional and keeps submissions private.
*/

CREATE TABLE IF NOT EXISTS quote_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text DEFAULT '',
  company text DEFAULT '',
  service text NOT NULL,
  origin text DEFAULT '',
  destination text DEFAULT '',
  message text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anyone_can_submit_quote" ON quote_requests;
CREATE POLICY "anyone_can_submit_quote" ON quote_requests FOR INSERT
  TO anon, authenticated WITH CHECK (true);
