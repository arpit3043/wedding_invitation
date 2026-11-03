import { Suspense } from "react";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { AdminDashboard, type RsvpRow } from "@/components/AdminDashboard";
import { createClient } from "@/lib/supabase/server";

async function AdminContent() {
  await connection();

  const supabase = await createClient();

  if (!supabase) {
    redirect("/admin/login");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data, error } = await supabase
    .from("rsvps")
    .select(
      "id, guest_name, contact_number, message, attendance_status, created_at, updated_at",
    )
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-ivory px-6">
        <p className="max-w-md text-center text-wine">
          Unable to load RSVPs. Confirm the schema is applied and your account
          can read the table. ({error.message})
        </p>
      </main>
    );
  }

  return <AdminDashboard initialRows={(data || []) as RsvpRow[]} />;
}

export default function AdminPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-ivory">
          <p className="font-[family-name:var(--font-playfair)] text-xl text-wine">
            Loading dashboard…
          </p>
        </main>
      }
    >
      <AdminContent />
    </Suspense>
  );
}
