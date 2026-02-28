# Ward Program App

Ward Program is a web application for creating, managing, and sharing weekly church meeting
programs.

It supports both an editor experience for authorized users and a clean, ward-facing program view for
attendees. The goal is to make preparing church meeting agendas faster, more consistent, and easy to
publish online.

### What this application does

- Builds and edits weekly meeting programs (agenda structure, music, speakers, and prayers)
- Supports role-based/authenticated workflows for protected editing
- Renders a public-facing program view for ward members
- Includes account flows such as sign up, login, forgot/reset password, and auth callbacks
- Provides reusable templates/components for common program sections

### Tech used

- **Framework:** Next.js (App Router) + React 18
- **Language:** TypeScript
- **Styling/UI:** Tailwind CSS, Material UI (MUI), Emotion
- **Backend/Auth/Data:** Supabase (`@supabase/ssr`, `@supabase/supabase-js`)
- **Rich text editing:** Tiptap editor (`@tiptap/react` + extensions)
- **Other libraries:** Lodash, react-qr-code, Cloudflare Turnstile (`@marsidev/react-turnstile`)
- **Tooling:** PostCSS, Autoprefixer

### Run locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Live demo

[https://www.wardprogram.com/](https://www.wardprogram.com/)

### ISR for ward pages (`/ward/[id]`)

Public ward pages use Next.js Data Cache + ISR-style revalidation.

- Read path: `app/ward/WardProgramPage.tsx` fetches ward bulletin data with:
    - `next.revalidate` (time-based cache window)
    - `next.tags` using `ward-bulletin:<id>`
- Publish path: `app/api/bulletin/route.ts` updates bulletin data and calls
  `revalidateTag('ward-bulletin:<id>', 'max')` to invalidate cached data for that ward.

#### Environment requirements

Set these in your deployment environment:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

#### Verify ISR behavior (production)

Use a production deployment (not local dev) for accurate ISR behavior.

1. Open `/ward/<id>` and confirm content renders.
2. Open the same URL again and confirm it is fast/stable (cache hit behavior).
3. Update content from the editor and click Save (publish endpoint).
4. Refresh `/ward/<id>` and confirm updated content is visible (tag revalidation worked).

Notes:

- Revalidation is request-driven after TTL expires (not a timed cron job).
- On-demand `revalidateTag` provides near-immediate freshness after publish.
