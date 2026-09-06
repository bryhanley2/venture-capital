# Recovery — rebuilding this on a new machine

If the computer you normally work on is lost or unavailable, **nothing here is gone.**
The code is on GitHub, the site's secrets are stored on Vercel, the site itself is served
by Vercel, and the dealflow data lives in the pipeline's Google Sheet. This file is the
checklist to get back to a working setup.

## What lives where (almost none of it is on your laptop)

| Thing | Where it actually lives |
|---|---|
| All code + branch history | GitHub: `github.com/bryhanley2/venture-capital` |
| The live site (bryanhanleyvc.com) | Vercel — keeps serving even with no computer |
| Site secrets / API keys | Vercel → Project → **Settings → Environment Variables** (values are viewable there) |
| Dealflow data shown on `/dealflow` | The pipeline's Google Sheet (repo `second-layer-verticals`) |
| "Check a company" agent | Vercel serverless function `api/company-check.ts` + `ANTHROPIC_API_KEY` |

## New-machine setup

1. Install **Git**, **Node.js**, and (if you use it) **Claude Code**.
2. Clone:
   ```
   git clone https://github.com/bryhanley2/venture-capital.git
   cd venture-capital
   npm install
   ```
3. Recreate **`.env.local`** in the project root (see below).
4. `npm run dev` for local work. Deploys happen automatically when you push / merge —
   Vercel is already connected to the GitHub repo.

## Environment variables

### `.env.local` (local dev only — 4 values, safe to recreate)

```
VITE_SUPABASE_URL=...        # Supabase dashboard → Project Settings → API
VITE_SUPABASE_ANON_KEY=...   # same page (the "anon / public" key)
VITE_SITE_PASSWORD=...       # whatever you choose — the site's login gate
VITE_APP_TOKEN=...           # any long random string; must match APP_TOKEN in Vercel
```

All four of these are also set in Vercel, where the values **are** visible — so you can
copy them straight out of the Vercel dashboard.

### Vercel — Project Settings → Environment Variables (names only)

| Name | Browser-exposed | What it is | If lost |
|---|---|---|---|
| `VITE_SUPABASE_URL` | yes | Supabase project URL | Supabase dashboard |
| `VITE_SUPABASE_ANON_KEY` | yes | Supabase anon key | Supabase dashboard |
| `VITE_SITE_PASSWORD` | yes | Login gate password | you choose |
| `VITE_APP_TOKEN` | yes | Shared secret the browser sends to `/api/*` | you choose; must equal `APP_TOKEN` |
| `APP_TOKEN` | no | Same value as `VITE_APP_TOKEN`; the API routes check it | you choose |
| `ANTHROPIC_API_KEY` | no | Claude key for "Check a company" (~$0.05/call) | console.anthropic.com → new key |
| `PIPELINE_MODEL` | no | *Optional.* Agent model. Default `claude-sonnet-5`. | leave unset |
| `GOOGLE_SERVICE_ACCOUNT_JSON` | no | Read-only service-account JSON (one line) for the Sheet | Google Cloud Console → service account → Keys → add JSON key, then share the Sheet with its `client_email` as Viewer |
| `GOOGLE_SHEET_ID` | no | The pipeline spreadsheet's ID | it's in `second-layer-verticals/RECOVERY.md`; the Sheet is in your Google Drive |

See `DEALFLOW_SETUP.md` for the fuller explanation of the dealflow feature.

## The one thing worth doing now

Vercel will show you its env-var values, so this repo is low-risk. Still, keep one copy in
a password manager:

- **Supabase** URL + anon key
- **Anthropic API key**
- **Google service-account JSON** (shared with `second-layer-verticals` — one file covers both)

Each is a few minutes to regenerate if lost. No code or data is ever lost — it's all on
GitHub, Vercel, and Google Sheets.
