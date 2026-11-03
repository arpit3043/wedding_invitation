"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isSupabaseConfigured()) {
      setError(
        "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local.",
      );
      return;
    }

    const supabase = createClient();
    if (!supabase) {
      setError("Unable to initialise authentication.");
      return;
    }

    setLoading(true);
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setLoading(false);

    if (authError) {
      setError(authError.message);
      return;
    }

    router.replace("/admin");
    router.refresh();
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-ivory px-6 paper-texture">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md border border-champagne bg-paper/90 p-8 shadow-sm"
      >
        <p className="font-[family-name:var(--font-cormorant)] text-xs tracking-[0.25em] uppercase text-gold">
          Private
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-playfair)] text-3xl text-wine">
          Wedding Dashboard
        </h1>
        <p className="mt-2 text-sm text-ink-soft">
          Sign in to review RSVP responses.
        </p>

        <label className="mt-8 block text-sm text-ink">
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full border border-champagne bg-ivory px-3 py-2.5 outline-none focus:border-gold"
          />
        </label>

        <label className="mt-4 block text-sm text-ink">
          Password
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full border border-champagne bg-ivory px-3 py-2.5 outline-none focus:border-gold"
          />
        </label>

        {error ? (
          <p className="mt-4 text-sm text-wine" role="alert">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full bg-wine px-4 py-3 text-sm tracking-wide text-ivory disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
