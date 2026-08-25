import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const VALID_SERVICES = [
  "Air Freight",
  "Ocean Freight",
  "Customs Clearance",
  "Warehousing",
  "Other",
];

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

export function isString(v: unknown): v is string {
  return typeof v === "string";
}

export function asString(v: unknown, max = 500): string | null {
  if (!isString(v)) return null;
  const trimmed = v.trim();
  if (trimmed.length === 0 || trimmed.length > max) return null;
  return trimmed;
}

export function asEmail(v: unknown): string | null {
  if (!isString(v)) return null;
  const trimmed = v.trim().toLowerCase();
  if (trimmed.length === 0 || trimmed.length > 320) return null;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed) ? trimmed : null;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  const url = new URL(req.url);
  const path = url.pathname.replace(/^\/+|\/+$/g, "");
  const segments = path.split("/");
  const action = segments[segments.length - 1];

  if (action !== "quote-requests") {
    return json({ error: "Not found" }, 404);
  }

  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  let payload: Record<string, unknown>;
  try {
    payload = await req.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const name = asString(payload.name, 120);
  const email = asEmail(payload.email);
  if (!name || !email) {
    return json({
      error: "A valid name and email are required.",
    }, 400);
  }

  const service = isString(payload.service) && VALID_SERVICES.includes(payload.service)
    ? payload.service
    : null;
  if (!service) {
    return json({
      error: `service must be one of: ${VALID_SERVICES.join(", ")}`,
    }, 400);
  }

  const phone = asString(payload.phone, 40) ?? "";
  const company = asString(payload.company, 160) ?? "";
  const origin = asString(payload.origin, 160) ?? "";
  const destination = asString(payload.destination, 160) ?? "";
  const message = asString(payload.message, 2000) ?? "";

  const row = { name, email, phone, company, service, origin, destination, message };

  const { data, error } = await supabase
    .from("quote_requests")
    .insert(row)
    .select("id, created_at")
    .single();

  if (error) {
    console.error("insert failed:", error.message);
    return json({ error: "Could not save your request. Please try again." }, 500);
  }

  return json({ ok: true, id: data.id, created_at: data.created_at }, 201);
});
