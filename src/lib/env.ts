import { GENERATED_DATABASE_URL } from "@/lib/generated-database-url";

const PLACEHOLDER_FRAGMENTS = [
  "your_",
  "YOUR_PROJECT",
  "example",
  "changeme",
  "placeholder",
];

export function isConfiguredSecret(value: string | undefined | null) {
  if (!value) return false;
  const trimmed = value.trim();
  if (!trimmed) return false;
  const lower = trimmed.toLowerCase();
  return !PLACEHOLDER_FRAGMENTS.some((fragment) =>
    lower.includes(fragment.toLowerCase()),
  );
}

export function getSupabaseUrl() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return isConfiguredSecret(url) ? url!.trim() : null;
}

export function getSupabaseAnonKey() {
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return isConfiguredSecret(key) ? key!.trim() : null;
}

export function getSupabaseServiceRoleKey() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return isConfiguredSecret(key) ? key!.trim() : null;
}

export function getDatabaseUrl() {
  // Prefer runtime env (local / Netlify UI with Functions scope).
  // Fall back to the build-time bake — Netlify does not expose
  // netlify.toml env vars to serverless functions at runtime.
  const runtime = process.env.DATABASE_URL;
  if (isConfiguredSecret(runtime)) return runtime!.trim();
  return isConfiguredSecret(GENERATED_DATABASE_URL)
    ? GENERATED_DATABASE_URL!.trim()
    : null;
}
