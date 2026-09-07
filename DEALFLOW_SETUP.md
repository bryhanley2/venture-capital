# Dealflow feature — setup

The `/dealflow` page (login-gated) has two parts:

1. **Watchlist** — the pipeline's `Watchlist` sheet tab: thesis-fit companies that
   weren't ready yet, with the movement signals the pipeline picked up on its last
   re-check.
2. **Dealflow board** — reads the Second Layer pipeline's Google Sheet and shows every
   company it has written, ranked by weighted score, filterable by vertical and funding
   range, paginated. Duplicate companies and rows over the $10M cap are collapsed on the
   client.

The heavy pipeline stays exactly where it is — manual `workflow_dispatch` in
`second-layer-verticals`. This site never triggers it, and **this site makes no
Anthropic API calls at all** — every endpoint is a Google Sheets read.

There is also a **public** page at `/map` (the Second Layer Map) — no login. It
reads only the pipeline's `Second Layer Map` tab, which holds publish-safe fields
(company, one-line description, stage, website) and no scores, risks, or contacts.
`api/second-layer-map.ts` is the only unauthenticated endpoint; keep it that way.

## Vercel environment variables

Set these in **Project → Settings → Environment Variables**:

| Name | Exposed to browser? | What it is |
|---|---|---|
| `VITE_APP_TOKEN` | yes (build-time) | Long random string. The browser sends it to `/api/dealflow`. |
| `APP_TOKEN` | no | **Same value** as `VITE_APP_TOKEN`. `/api/dealflow` checks it. |
| `GOOGLE_SERVICE_ACCOUNT_JSON` | no | The service-account JSON, pasted as one line. |
| `GOOGLE_SHEET_ID` | no | The pipeline spreadsheet's ID (from its URL). |

Plus the existing `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_SITE_PASSWORD`.

`ANTHROPIC_API_KEY` and `PIPELINE_MODEL` are **not used by this site** — you can
remove them from Vercel.

## Google service account

1. In Google Cloud console, create a service account and a **JSON key** for it.
2. Open the pipeline's Google Sheet → **Share** → add the service account's
   `client_email` as a **Viewer**.
3. Paste the whole JSON file as `GOOGLE_SERVICE_ACCOUNT_JSON`.

The same service account the pipeline uses works — read-only (`spreadsheets.readonly`)
is all this site requests.

## Local dev

`.env.local` needs `VITE_APP_TOKEN` for the frontend. The `/api` routes only run on
Vercel (or `vercel dev`), so under plain `npm run dev` the board shows an error until
deployed.

## Files

- `api/_shared.ts` — `APP_TOKEN` gate + Google access-token minting
- `api/dealflow.ts` — GET, returns `{ companies, watchlist }` from the sheet
- `api/second-layer-map.ts` — public GET, returns `{ trends }` for the map page
- `src/lib/dealflow.ts` — typed client + score/tier/funding/dedupe helpers
- `src/pages/Dealflow.tsx` — the board page
