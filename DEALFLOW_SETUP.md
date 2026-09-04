# Dealflow feature — setup

The `/dealflow` page (login-gated) has three parts:

1. **Check a company** — one live Claude + web-search pass that assesses any company you
   type against the thesis (~$0.05 per check). This is the only thing on the site that
   spends API credit, and it is behind the login + a shared-secret header.
2. **Watchlist** — the pipeline's `Watchlist` sheet tab: thesis-fit companies that
   weren't ready yet, with the movement signals the pipeline picked up on its last
   re-check. Read-only, no extra config.
3. **Dealflow board** — reads the Second Layer pipeline's Google Sheet (read-only) and
   shows every company it has written, ranked by weighted score, filterable by vertical.

The heavy pipeline stays exactly where it is — manual `workflow_dispatch` in
`second-layer-verticals`. This site never triggers it.

## Vercel environment variables

Set these in **Project → Settings → Environment Variables** (Production + Preview):

| Name | Exposed to browser? | What it is |
|---|---|---|
| `VITE_APP_TOKEN` | yes (build-time) | Long random string. The browser sends it to the API routes. |
| `APP_TOKEN` | no | **Same value** as `VITE_APP_TOKEN`. The API routes check it. |
| `ANTHROPIC_API_KEY` | no | `sk-ant-…` — pays for "Check a company". |
| `PIPELINE_MODEL` | no | Optional. Defaults to `claude-sonnet-5`. |
| `GOOGLE_SERVICE_ACCOUNT_JSON` | no | The read-only service-account JSON, pasted as one line. |
| `GOOGLE_SHEET_ID` | no | The pipeline spreadsheet's ID (from its URL). |

Plus the existing `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_SITE_PASSWORD`.

## Google service account

1. In Google Cloud console, create a service account, then create a **JSON key** for it.
2. Open the pipeline's Google Sheet → **Share** → add the service account's
   `client_email` as a **Viewer**.
3. Paste the whole JSON file as the value of `GOOGLE_SERVICE_ACCOUNT_JSON` (Vercel accepts
   multi-line values; the code also tolerates `\n`-escaped keys).

The same service account the pipeline already uses works — just make sure it can read the
sheet. Read-only scope (`spreadsheets.readonly`) is all this site requests.

## Local dev

`.env.local` needs `VITE_APP_TOKEN` for the frontend. The `/api` routes only run on
Vercel (or `vercel dev`), so for pure `npm run dev` the board and checker will return
errors until deployed or run under `vercel dev` with the server vars set.

## Files

- `api/_shared.ts` — `APP_TOKEN` gate + Google access-token minting
- `api/dealflow.ts` — GET, returns `{ count, companies }` from the sheet
- `api/company-check.ts` — POST `{ company, url? }`, returns the assessment JSON
- `src/lib/dealflow.ts` — typed client + score/tier/funding helpers
- `src/pages/Dealflow.tsx` — the page
