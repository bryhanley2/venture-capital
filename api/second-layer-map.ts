import type { VercelRequest, VercelResponse } from '@vercel/node';
import { googleAccessToken } from './_shared.js';

// PUBLIC endpoint — no APP_TOKEN. It reads ONLY the "Second Layer Map" tab,
// which the pipeline writes with publish-safe fields (no scores, risks, or
// contacts). Do not widen what this returns.
const MAP_TAB = 'Second Layer Map';

type Row = Record<string, string>;

interface Company { name: string; blurb: string; stage: string; website: string; }
interface Layer { id: string; name: string; problem: string; order: number; companies: Company[]; }
interface Trend { trend: string; trend_blurb: string; updated: string; layers: Layer[]; }

function rows(values: string[][] | undefined): Row[] {
  if (!values || values.length < 2) return [];
  const head = values[0];
  const hideIdx = head.indexOf('Hide');
  return values.slice(1)
    .filter((r) => (r[6] || '').trim()) // has a Company (col G)
    .filter((r) => hideIdx === -1 || !(r[hideIdx] || '').trim()) // manual 'Hide' flag
    .map((r) => {
      const o: Row = {};
      head.forEach((h, i) => { o[h] = (r[i] ?? '').toString(); });
      return o;
    });
}

// Group one trend's rows into ordered layers with their companies.
function toTrend(trendRows: Row[]): Trend {
  const byId = new Map<string, Layer>();
  for (const r of trendRows) {
    const id = r['Layer ID'];
    if (!id) continue;
    if (!byId.has(id)) {
      byId.set(id, {
        id,
        name: r['Layer'] || id,
        problem: r['Problem'] || '',
        order: parseInt(r['Layer Order'] || '99', 10),
        companies: [],
      });
    }
    byId.get(id)!.companies.push({
      name: r['Company'] || '',
      blurb: r['Blurb'] || '',
      stage: r['Stage'] || '',
      website: r['Website'] || '',
    });
  }
  return {
    trend: trendRows[0]['Trend'] || '',
    trend_blurb: trendRows[0]['Trend Blurb'] || '',
    updated: trendRows.map((r) => r['Updated'] || '').sort().reverse()[0] || '',
    layers: [...byId.values()].sort((a, b) => a.order - b.order),
  };
}

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const sheetId = process.env.GOOGLE_SHEET_ID;
    if (!sheetId) throw new Error('GOOGLE_SHEET_ID not configured');
    const token = await googleAccessToken('https://www.googleapis.com/auth/spreadsheets.readonly');

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(`'${MAP_TAB}'!A1:Z2000`)}?majorDimension=ROWS`;
    const gr = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    if (gr.status === 400) {
      // Tab doesn't exist yet — the pipeline hasn't built a map. Not an error.
      res.setHeader('Cache-Control', 's-maxage=300');
      res.status(200).json({ trends: [] });
      return;
    }
    if (!gr.ok) throw new Error(`Sheets API ${gr.status}: ${(await gr.text()).slice(0, 200)}`);
    const body = (await gr.json()) as { values?: string[][] };
    const all = rows(body.values);

    // Group by trend; each trend keeps its own layers, companies, and refresh date.
    const groups = new Map<string, Row[]>();
    for (const r of all) {
      const key = (r['Trend'] || '').trim();
      if (!key) continue;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(r);
    }
    const trends = [...groups.values()]
      .map(toTrend)
      .filter((t) => t.layers.length)
      .sort((a, b) => (b.updated || '').localeCompare(a.updated || ''));

    res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=86400');
    res.status(200).json({ trends });
  } catch (e: any) {
    res.status(500).json({ error: e?.message || 'second-layer-map failed' });
  }
}
