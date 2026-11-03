# Arpit & Muskan — Digital Wedding Invitation

A premium, responsive wedding invitation for **Arpit & Muskan** (01–05 December 2026).

Warm ivory, champagne, dusty rose, sage, wine, and antique gold — with storytelling, live countdown, ritual explanations, Maps & Calendar links, RSVP, a private dashboard, and an in-app wedding assistant.

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Features

- Full-screen opening invitation with a gentle “Open Invitation” interaction
- Editorial story, live countdown to 04 December 2026, and a five-event timeline
- Ritual information modals for each celebration
- Google Maps directions and Google Calendar “add event” links (no auth required)
- RSVP with emotional confirmations, persisted in Supabase
- Private admin dashboard at `/admin`
- **Ask Arpit & Muskan** AI assistant via AI Gateway (with a local knowledge fallback)
- Optional soft instrumental music toggle (off by default)

## Environment variables

See `.env.example`.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anon key (auth + constrained client use) |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only RSVP writes |
| `AI_GATEWAY_API_KEY` | Vercel AI Gateway key for the assistant |
| `AI_GATEWAY_MODEL` | Optional model id (default `openai/gpt-4o-mini`) |

Without Supabase or AI keys, the site still runs: RSVP uses demo mode, and the assistant answers from the local wedding knowledge base.

## Supabase setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL editor.
3. Create an admin user under **Authentication → Users**.
4. Disable public sign-ups for Email.
5. Add the env vars above and restart the app.
6. Sign in at `/admin/login`.

RLS allows authenticated admins to read RSVPs. Guest submissions go through `/api/rsvp` using the service role so the guest list is never publicly readable.

## Music (optional)

Place a licensed soft instrumental file at:

```text
public/audio/wedding-instrumental.mp3
```

The mute/unmute control appears only when the file loads successfully. Music never autoplays.

## Project structure

```text
src/
  app/           # routes, layout, API
  components/    # UI sections
  data/wedding.ts
  hooks/
  lib/           # maps, calendar, supabase
supabase/schema.sql
```

Event content lives in `src/data/wedding.ts` — edit that file to update schedule copy.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Deploy

Deploy to Vercel (or any Next.js host). Set the same environment variables in the hosting dashboard. Point your custom domain at the deployment when ready.
