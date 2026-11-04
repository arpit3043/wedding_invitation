import { NextResponse } from "next/server";
import { z } from "zod";
import { dbQuery, isDatabaseConfigured } from "@/lib/db";
import { createAdminClient } from "@/lib/supabase/admin";

const schema = z.object({
  guest_name: z
    .string()
    .trim()
    .min(2, "Name is too short")
    .max(80, "Name is too long")
    .regex(/^[\p{L}\p{M}\s.'’-]+$/u, "Please enter a valid name"),
  contact_number: z
    .string()
    .trim()
    .min(7, "Please share a contact number")
    .max(20, "Contact number is too long")
    .regex(/^[\d\s+\-()]+$/, "Please enter a valid contact number"),
  message: z
    .string()
    .trim()
    .max(500, "Please keep your message under 500 characters")
    .optional()
    .nullable(),
  attendance_status: z.enum(["attending", "unable"]),
});

type RsvpRow = {
  id: string;
  guest_name: string;
  contact_number: string | null;
  message: string | null;
  attendance_status: "attending" | "unable";
};

type RsvpPayload = {
  guestName: string;
  contactNumber: string;
  message: string | null;
  attendanceStatus: "attending" | "unable";
};

async function upsertViaPostgres(
  payload: RsvpPayload,
): Promise<{ row: RsvpRow; duplicate: boolean } | { error: string }> {
  const { guestName, contactNumber, message, attendanceStatus } = payload;

  try {
    const existing = await dbQuery<{ id: string }>(
      `select id
       from public.rsvps
       where guest_name = $1::citext
       limit 1`,
      [guestName],
    );

    if (!existing) {
      return { error: "Database is not configured." };
    }

    if (existing.rows[0]) {
      const updated = await dbQuery<RsvpRow>(
        `update public.rsvps
         set attendance_status = $2,
             contact_number = $3,
             message = $4,
             updated_at = now()
         where id = $1
         returning id, guest_name::text, contact_number, message, attendance_status`,
        [existing.rows[0].id, attendanceStatus, contactNumber, message],
      );

      if (!updated?.rows[0]) {
        return { error: "Unable to update your RSVP. Please try again." };
      }

      return { row: updated.rows[0], duplicate: true };
    }

    const inserted = await dbQuery<RsvpRow>(
      `insert into public.rsvps (guest_name, attendance_status, contact_number, message)
       values ($1, $2, $3, $4)
       returning id, guest_name::text, contact_number, message, attendance_status`,
      [guestName, attendanceStatus, contactNumber, message],
    );

    if (!inserted?.rows[0]) {
      return { error: "Unable to save your RSVP. Please try again." };
    }

    return { row: inserted.rows[0], duplicate: false };
  } catch (error) {
    const code =
      typeof error === "object" && error && "code" in error
        ? String((error as { code?: string }).code)
        : "";

    if (code === "23505") {
      try {
        const again = await dbQuery<RsvpRow>(
          `update public.rsvps
           set attendance_status = $2,
               contact_number = $3,
               message = $4,
               updated_at = now()
           where guest_name = $1::citext
           returning id, guest_name::text, contact_number, message, attendance_status`,
          [guestName, attendanceStatus, contactNumber, message],
        );

        if (again?.rows[0]) {
          return { row: again.rows[0], duplicate: true };
        }
      } catch {
        // fall through
      }
    }

    console.error("RSVP postgres upsert failed:", error);
    return {
      error:
        "Unable to reach the RSVP database from the server. Please try again in a moment.",
    };
  }
}

async function upsertViaSupabase(
  payload: RsvpPayload,
): Promise<{ row: RsvpRow; duplicate: boolean } | { error: string } | null> {
  const supabase = createAdminClient();
  if (!supabase) return null;

  const { guestName, contactNumber, message, attendanceStatus } = payload;

  const { data: existing, error: lookupError } = await supabase
    .from("rsvps")
    .select("id, guest_name, contact_number, message, attendance_status")
    .ilike("guest_name", guestName)
    .maybeSingle();

  if (lookupError) {
    return { error: "Unable to check existing RSVPs. Please try again." };
  }

  if (existing) {
    const { data, error } = await supabase
      .from("rsvps")
      .update({
        attendance_status: attendanceStatus,
        contact_number: contactNumber,
        message,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existing.id)
      .select("id, guest_name, contact_number, message, attendance_status")
      .single();

    if (error || !data) {
      return { error: "Unable to update your RSVP. Please try again." };
    }

    return { row: data as RsvpRow, duplicate: true };
  }

  const { data, error } = await supabase
    .from("rsvps")
    .insert({
      guest_name: guestName,
      attendance_status: attendanceStatus,
      contact_number: contactNumber,
      message,
    })
    .select("id, guest_name, contact_number, message, attendance_status")
    .single();

  if (error) {
    if (error.code === "23505") {
      return {
        row: {
          id: "",
          guest_name: guestName,
          contact_number: contactNumber,
          message,
          attendance_status: attendanceStatus,
        },
        duplicate: true,
      };
    }
    return { error: "Unable to save your RSVP. Please try again." };
  }

  return { row: data as RsvpRow, duplicate: false };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Invalid RSVP details." },
      { status: 400 },
    );
  }

  const { guest_name, contact_number, message, attendance_status } = parsed.data;
  const payload: RsvpPayload = {
    guestName: guest_name.replace(/\s+/g, " ").trim(),
    contactNumber: contact_number.replace(/\s+/g, " ").trim(),
    message: message?.trim() ? message.trim() : null,
    attendanceStatus: attendance_status,
  };

  if (isDatabaseConfigured()) {
    const result = await upsertViaPostgres(payload);
    if ("error" in result) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      duplicate: result.duplicate,
      ...result.row,
    });
  }

  const viaSupabase = await upsertViaSupabase(payload);
  if (viaSupabase) {
    if ("error" in viaSupabase) {
      return NextResponse.json({ error: viaSupabase.error }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      duplicate: viaSupabase.duplicate,
      ...viaSupabase.row,
    });
  }

  return NextResponse.json(
    {
      error:
        "RSVP storage is not configured. Set DATABASE_URL (or Supabase service role keys) in the host environment.",
    },
    { status: 503 },
  );
}
