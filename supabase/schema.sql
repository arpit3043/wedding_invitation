-- Arpit & Muskan wedding invitation — Supabase schema
-- Run in the Supabase SQL editor after creating your project.

create extension if not exists citext;

create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  guest_name citext not null,
  attendance_status text not null check (attendance_status in ('attending', 'unable')),
  contact_number text,
  message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Safe upgrades for existing projects
alter table public.rsvps add column if not exists contact_number text;
alter table public.rsvps add column if not exists message text;

-- Prevent accidental duplicate guest names (case-insensitive via citext)
create unique index if not exists rsvps_guest_name_unique on public.rsvps (guest_name);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists rsvps_set_updated_at on public.rsvps;
create trigger rsvps_set_updated_at
before update on public.rsvps
for each row execute function public.set_updated_at();

alter table public.rsvps enable row level security;

-- Public guests do NOT read or write the table directly.
-- All guest RSVP writes go through /api/rsvp (DATABASE_URL or service role).

-- Authenticated administrators can review responses in /admin
drop policy if exists "Admins can read RSVPs" on public.rsvps;
create policy "Admins can read RSVPs"
on public.rsvps
for select
to authenticated
using (true);

drop policy if exists "Admins can update RSVPs" on public.rsvps;
create policy "Admins can update RSVPs"
on public.rsvps
for update
to authenticated
using (true)
with check (true);

-- Create an admin user in Authentication → Users, then sign in at /admin/login
-- Tip: disable public sign-ups in Authentication → Providers → Email.
