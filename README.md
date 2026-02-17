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
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Live demo

[https://www.wardprogram.com/](https://www.wardprogram.com/)
