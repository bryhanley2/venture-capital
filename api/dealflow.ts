import type { VercelRequest, VercelResponse } from '@vercel/node';
import { authorised, googleAccessToken } from './_shared.js';

// Column order written by second-layer-verticals/pipeline_utils.PIPELINE_HEADERS
const HEADERS = [
  'Date', 'Company', 'Stage', 'Total Raised', 'Vertical', 'Source',
  'Second Layer Logic', 'Description', 'Passed Gates', 'Founders',
  '1A_FMF', '1B_Tech', '1C_Commit', '2A_PMF', '3A_TAM', '3B_Timing',
  '5_TrxQl', '6_CapEff', '7_Investor',
  'Weighted %', 'Decision', 'Summary', 'Strengths', 'Risks',
  'Website', 'LinkedIn',
];

const TABS = ['Vertical Pipeline', 'On-Demand Pipeline'];
const WATCHLIST_TAB = 'Watchlist';

type Row = Record<string, string>;

function toRows(values: string[][] | undefined, tab: string): Row[] {
  if (!values || values.length < 2) return [];
  const head = values[0];
  return values.slice(1)
    .filter((r) => (r[1] || '').trim()) // has a Company name
    .map((r) => {
      const o: Row = { _tab: tab };
      head.forEach((h, i) => { o[h] = (r[i] ?? '').toString(); });
      // normalise using our known header set too, in case the sheet header drifted
      HEADERS.forEach((h, i) => { if (o[h] === undefined) o[h] = (r[i] ?? '').toString(); });
      return o;
    });
}

// The Watchlist tab is header-driven (written by vertical_pipeline._WATCHLIST_HEADERS).
function toWatchRows(values: string[][] | undefined): Row[] {
  if (!values || values.length < 2) return [];
  const head = values[0];
  return values.slice(1)
    .filter((r) => (r[0] || '').trim()) // has a Company name
    .map((r) => {
      const o: Row = {};
      head.forEach((h, i) => { o[h] = (r[i] ?? '').toString(); });
      return o;
    });
}

const MOVED_FIRST: Record<string, number> = { graduated: 0, moved: 1, watching: 2, dropped: 3 };

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!authorised(req, res)) return;
  try {
    const sheetId = process.env.GOOGLE_SHEET_ID;
    if (!sheetId) throw new Error('GOOGLE_SHEET_ID not configured');
    const token = await googleAccessToken('https://www.googleapis.com/auth/spreadsheets.readonly');
    const auth = { headers: { Authorization: `Bearer ${token}` } };

    // batchGet 400s the whole request if any range names a tab that doesn't
    // exist yet, so ask which tabs exist first and only request those.
    const metaUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}?fields=sheets.properties.title`;
    const mr = await fetch(metaUrl, auth);
    if (!mr.ok) throw new Error(`Sheets API ${mr.status}: ${(await mr.text()).slice(0, 300)}`);
    const meta = (await mr.json()) as { sheets?: { properties?: { title?: string } }[] };
    const present = new Set((meta.sheets || []).map((s) => s.properties?.title).filter(Boolean) as string[]);

    const wantTabs = [...TABS, WATCHLIST_TAB].filter((t) => present.has(t));
    const byTab = new Map<string, string[][] | undefined>();
    if (wantTabs.length) {
      const ranges = wantTabs.map((t) => `ranges=${encodeURIComponent(`'${t}'!A1:Z2000`)}`).join('&');
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values:batchGet?${ranges}&majorDimension=ROWS`;
      const gr = await fetch(url, auth);
      if (!gr.ok) throw new Error(`Sheets API ${gr.status}: ${(await gr.text()).slice(0, 300)}`);
      const body = (await gr.json()) as { valueRanges?: { values?: string[][] }[] };
      (body.valueRanges || []).forEach((v, i) => byTab.set(wantTabs[i], v.values));
    }

    const companies: Row[] = [];
    TABS.forEach((t) => { companies.push(...toRows(byTab.get(t), t)); });

    // newest first, then by score desc within a run
    companies.sort((a, b) => {
      const d = (b['Date'] || '').localeCompare(a['Date'] || '');
      if (d !== 0) return d;
      return parseFloat(b['Weighted %'] || '0') - parseFloat(a['Weighted %'] || '0');
    });

    const watchlist = toWatchRows(byTab.get(WATCHLIST_TAB)).sort((a, b) => {
      const sa = MOVED_FIRST[(a['Status'] || 'watching').toLowerCase()] ?? 2;
      const sb = MOVED_FIRST[(b['Status'] || 'watching').toLowerCase()] ?? 2;
      if (sa !== sb) return sa - sb;
      return (b['Last Checked'] || '').localeCompare(a['Last Checked'] || '');
    });

    res.setHeader('Cache-Control', 's-maxage=120, stale-while-revalidate=600');
    res.status(200).json({ count: companies.length, companies, watchlist });
  } catch (e: any) {
    res.status(500).json({ error: e?.message || 'dealflow failed' });
  }
}
