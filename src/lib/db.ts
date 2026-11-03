import { Pool, type QueryResultRow } from "pg";
import { getDatabaseUrl } from "@/lib/env";

declare global {
  // eslint-disable-next-line no-var
  var __weddingPgPool: Pool | undefined;
}

function getPool() {
  const raw = getDatabaseUrl();
  if (!raw) return null;

  if (!global.__weddingPgPool) {
    // Supabase uses a certificate chain Node may not trust locally.
    // Force TLS without CA verification for the server-side RSVP path.
    const connectionString = raw
      .replace(/([?&])sslmode=[^&]*/g, "$1")
      .replace(/[?&]$/, "");

    global.__weddingPgPool = new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
      max: 5,
    });
  }

  return global.__weddingPgPool;
}

export async function dbQuery<T extends QueryResultRow>(
  text: string,
  params: unknown[] = [],
) {
  const pool = getPool();
  if (!pool) return null;
  try {
    return await pool.query<T>(text, params);
  } catch (error) {
    // Drop a poisoned pool (e.g. after SSL misconfig) so the next request retries cleanly.
    try {
      await pool.end();
    } catch {
      // ignore
    }
    global.__weddingPgPool = undefined;
    throw error;
  }
}

export function isDatabaseConfigured() {
  return Boolean(getDatabaseUrl());
}
