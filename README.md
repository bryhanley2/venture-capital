# BryanHanley.VC

The public site and private cockpit for a Second Layer seed-stage sourcing
operation. The heavy lifting — sourcing, funding verification, thesis scoring —
runs in a separate repo (`second-layer-verticals`); this app reads that
pipeline's output and adds a live company-check agent.

## Pages

| Route | Access | What it is |
|---|---|---|
| `/` | public | The thesis and how the engine works |
| `/map` | public | The Second Layer Map — one trend, its problem layers, the companies at each |
| `/about` | public | Background |
| `/login` | public | Password gate (localStorage) |
| `/dealflow` | private | Ranked board + watchlist + "check any company" agent |

## Local dev

```bash
npm install
npm run dev
```

`.env.local` for the frontend:

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_SITE_PASSWORD=...
VITE_APP_TOKEN=...
```

The `/api/*` routes only run on Vercel (or `vercel dev`) and need the server-side
variables listed in `DEALFLOW_SETUP.md`.

## Deployment

Vercel, connected to `main`. Environment variables and the Google service-account
setup are documented in `DEALFLOW_SETUP.md`. Recovery steps for a new machine are
in `RECOVERY.md`.

© 2026 Bryan Hanley.
