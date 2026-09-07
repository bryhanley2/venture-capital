const APP_TOKEN = import.meta.env.VITE_APP_TOKEN as string | undefined;

function headers() {
  return {
    'Content-Type': 'application/json',
    ...(APP_TOKEN ? { 'x-app-token': APP_TOKEN } : {}),
  };
}

export interface DealRow {
  _tab: string;
  Date: string;
  Company: string;
  Stage: string;
  'Total Raised': string;
  Vertical: string;
  Source: string;
  'Second Layer Logic': string;
  Description: string;
  Founders: string;
  'Weighted %': string;
  Decision: string;
  Summary: string;
  Strengths: string;
  Risks: string;
  Website: string;
  LinkedIn: string;
  [k: string]: string;
}

export interface WatchRow {
  Company: string;
  Website: string;
  Vertical: string;
  Added: string;
  Source: string;
  'Last Score': string;
  'Last Stage': string;
  'Last Funding': string;
  'Last Checked': string;
  'Last Signal': string;
  Status: string;
  Notes: string;
  [k: string]: string;
}

export interface DealflowData {
  companies: DealRow[];
  watchlist: WatchRow[];
}

export async function getDealflow(): Promise<DealflowData> {
  const r = await fetch('/api/dealflow', { headers: headers() });
  const j = await r.json();
  if (!r.ok) throw new Error(j.error || `dealflow ${r.status}`);
  return { companies: (j.companies || []) as DealRow[], watchlist: (j.watchlist || []) as WatchRow[] };
}

/** Numeric score from the "Weighted %" cell (may be blank). */
export function scoreOf(row: DealRow): number {
  const n = parseFloat((row['Weighted %'] || '').toString());
  return Number.isFinite(n) ? n : 0;
}

/** USD parsed from a "Total Raised" cell, or null when it's unverified / blank.
 * Verified cells lead with the figure, e.g. "12,500,000 (single source) · …". */
export function fundingUsd(raw: string): number | null {
  const s = (raw || '').trim();
  if (!s || /^unverified/i.test(s)) return null;
  const m = s.match(/^\$?\s*([\d,]+(?:\.\d+)?)\s*([mMbBkK])?/);
  if (!m) return null;
  const n = parseFloat(m[1].replace(/,/g, ''));
  if (!Number.isFinite(n)) return null;
  const unit = (m[2] || '').toLowerCase();
  const mult = unit === 'k' ? 1e3 : unit === 'm' ? 1e6 : unit === 'b' ? 1e9 : 1;
  return n * mult;
}

const HARD_CAP_USD = 10_000_000;

// Trailing words that don't distinguish one company from another.
const GENERIC_SUFFIX = new Set([
  'climate', 'technologies', 'technology', 'tech', 'ai', 'labs', 'lab',
  'systems', 'system', 'energy', 'inc', 'io', 'app', 'hq', 'co', 'corp',
  'company', 'solutions', 'group', 'holdings', 'ventures', 'partners',
]);

function normName(s: string): string {
  return (s || '').toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
}
function hostOfUrl(u: string): string {
  try { return new URL(u).hostname.replace(/^www\./, '').toLowerCase(); } catch { return ''; }
}

/** Collapse rows that are the same company: same website host, identical
 * normalised name, or one name is the other plus a single generic word
 * ("Crux" / "Crux Climate"). Keeps the highest-scored row, newest on a tie. */
export function dedupeRows(rows: DealRow[]): DealRow[] {
  const better = (a: DealRow, b: DealRow) =>
    scoreOf(a) !== scoreOf(b)
      ? scoreOf(a) > scoreOf(b) ? a : b
      : (a.Date || '') >= (b.Date || '') ? a : b;

  const kept: DealRow[] = [];
  outer: for (const r of [...rows].sort((a, b) => scoreOf(b) - scoreOf(a))) {
    const host = hostOfUrl(r.Website);
    const nm = normName(r.Company);
    const words = nm.split(' ');
    for (let i = 0; i < kept.length; i++) {
      const k = kept[i];
      const kHost = hostOfUrl(k.Website);
      const kNm = normName(k.Company);
      const kWords = kNm.split(' ');
      const sameHost = host && kHost && host === kHost;
      const sameName = nm && nm === kNm;
      const prefix =
        (words.length === kWords.length + 1 && nm.startsWith(kNm + ' ') && GENERIC_SUFFIX.has(words[words.length - 1])) ||
        (kWords.length === words.length + 1 && kNm.startsWith(nm + ' ') && GENERIC_SUFFIX.has(kWords[kWords.length - 1]));
      if (sameHost || sameName || prefix) {
        kept[i] = better(k, r);
        continue outer;
      }
    }
    kept.push(r);
  }
  return kept;
}

/** Board-ready rows: drop anything verified over the $10M thesis cap, then dedupe. */
export function cleanBoardRows(rows: DealRow[]): DealRow[] {
  const withinCap = rows.filter((r) => {
    const usd = fundingUsd(r['Total Raised']);
    return usd == null || usd <= HARD_CAP_USD;
  });
  return dedupeRows(withinCap);
}

export function tierOf(score: number): { label: string; klass: string } {
  if (score >= 80) return { label: 'Strong Yes', klass: 'bg-green-100 text-green-800 border-green-300' };
  if (score >= 70) return { label: 'Deep Dive', klass: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
  if (score >= 64) return { label: 'Recommended', klass: 'bg-blue-100 text-blue-800 border-blue-300' };
  if (score >= 55) return { label: 'Watch', klass: 'bg-amber-100 text-amber-800 border-amber-300' };
  return { label: 'Backlog', klass: 'bg-gray-100 text-gray-600 border-gray-300' };
}

/** The pipeline appends [ABOVE_RANGE] / [BELOW_RANGE] / [UNVERIFIED] to the
 * "Total Raised" cell; a clean cell means the figure is inside the thesis
 * target ($1.8M–$4M). REJECT (over the $10M cap) never reaches the sheet. */
export type SizeStatus = 'in_range' | 'below_range' | 'above_range' | 'unverified';

export function sizeStatusOf(raw: string): SizeStatus {
  const v = (raw || '').toUpperCase();
  if (v.includes('[ABOVE_RANGE]')) return 'above_range';
  if (v.includes('[BELOW_RANGE]')) return 'below_range';
  if (v.includes('UNVERIFIED')) return 'unverified';
  return 'in_range';
}

export function fundingChip(raw: string): { text: string; klass: string } {
  const v = (raw || '').toLowerCase();
  if (v.includes('unverified')) return { text: 'Funding unverified', klass: 'bg-amber-50 text-amber-700 border-amber-200' };
  if (v.includes('[!]') || v.includes('conflict') || v.includes('mismatch'))
    return { text: 'Funding flagged', klass: 'bg-red-50 text-red-700 border-red-200' };
  if (v.includes('single source')) return { text: 'Funding: single source', klass: 'bg-blue-50 text-blue-700 border-blue-200' };
  if (raw && raw !== '0') return { text: `Funding: ${raw}`, klass: 'bg-green-50 text-green-700 border-green-200' };
  return { text: 'Funding: —', klass: 'bg-gray-50 text-gray-500 border-gray-200' };
}
