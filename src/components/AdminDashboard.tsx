"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export type RsvpRow = {
  id: string;
  guest_name: string;
  contact_number: string | null;
  message: string | null;
  attendance_status: "attending" | "unable";
  created_at: string;
  updated_at: string;
};

type Filter = "all" | "attending" | "unable";

export function AdminDashboard({ initialRows }: { initialRows: RsvpRow[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [rows] = useState(initialRows);

  const stats = useMemo(() => {
    const total = rows.length;
    const attending = rows.filter((r) => r.attendance_status === "attending").length;
    const unable = rows.filter((r) => r.attendance_status === "unable").length;
    const percentage = total === 0 ? 0 : Math.round((attending / total) * 100);
    return { total, attending, unable, percentage };
  }, [rows]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((row) => {
      const matchesFilter =
        filter === "all" ? true : row.attendance_status === filter;
      const matchesQuery =
        !q ||
        row.guest_name.toLowerCase().includes(q) ||
        (row.contact_number || "").toLowerCase().includes(q) ||
        (row.message || "").toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [rows, filter, query]);

  const signOut = async () => {
    const supabase = createClient();
    await supabase?.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-ivory px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-[family-name:var(--font-cormorant)] text-xs tracking-[0.25em] uppercase text-gold">
              Arpit & Muskan
            </p>
            <h1 className="mt-2 font-[family-name:var(--font-playfair)] text-3xl text-wine sm:text-4xl">
              RSVP Dashboard
            </h1>
          </div>
          <button
            type="button"
            onClick={signOut}
            className="border border-champagne px-4 py-2 text-sm text-ink-soft hover:bg-blush"
          >
            Sign out
          </button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total responses", value: stats.total },
            { label: "Attending", value: stats.attending },
            { label: "Unable to attend", value: stats.unable },
            { label: "Attendance %", value: `${stats.percentage}%` },
          ].map((card) => (
            <div
              key={card.label}
              className="border border-champagne bg-paper px-4 py-5"
            >
              <p className="text-xs tracking-wide uppercase text-ink-soft">
                {card.label}
              </p>
              <p className="mt-2 font-[family-name:var(--font-playfair)] text-3xl text-wine">
                {card.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, number, or message"
            className="w-full border border-champagne bg-paper px-3 py-2.5 text-sm outline-none focus:border-gold sm:max-w-xs"
          />
          <div className="flex flex-wrap gap-2">
            {(
              [
                ["all", "All"],
                ["attending", "Attending"],
                ["unable", "Unable"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setFilter(value)}
                className={`px-3 py-2 text-sm ${
                  filter === value
                    ? "bg-wine text-ivory"
                    : "border border-champagne text-ink-soft hover:bg-blush"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 overflow-x-auto border border-champagne bg-paper">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-champagne bg-blush/40 text-ink-soft">
              <tr>
                <th className="px-4 py-3 font-medium">Guest</th>
                <th className="px-4 py-3 font-medium">Contact</th>
                <th className="px-4 py-3 font-medium">Message</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Submitted</th>
              </tr>
            </thead>
            <tbody>
              {visible.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-ink-soft">
                    No RSVP responses match your filters yet.
                  </td>
                </tr>
              ) : (
                visible.map((row) => (
                  <tr key={row.id} className="border-t border-champagne/70 align-top">
                    <td className="px-4 py-3 text-ink">{row.guest_name}</td>
                    <td className="px-4 py-3 text-ink-soft whitespace-nowrap">
                      {row.contact_number || "—"}
                    </td>
                    <td className="max-w-xs px-4 py-3 text-ink-soft">
                      {row.message || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={
                          row.attendance_status === "attending"
                            ? "text-sage"
                            : "text-ink-soft"
                        }
                      >
                        {row.attendance_status === "attending"
                          ? "Attending"
                          : "Unable to attend"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-ink-soft whitespace-nowrap">
                      {new Date(row.created_at).toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
