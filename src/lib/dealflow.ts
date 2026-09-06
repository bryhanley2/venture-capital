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

export interface CompanyCheck {
  company: string;
  url?: string;
  is_operating_company?: boolean;
  is_second_layer?: 'yes' | 'borderline' | 'no';
  second_layer_reason?: string;
  current_stage?: string;
  total_raised_usd?: number | null;
  latest_round?: string | null;
  founded_year?: string | null;
  founders?: string;
  traction?: string;
  take?: string;
  sources?: string[];
  raw?: string;
  parsed?: null;
}

export async function checkCompany(company: string, url?: string): Promise<CompanyCheck> {
  const r = await fetch('/api/company-check', {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ company, url }),
  });
  const j = await r.json();
  if (!r.ok) throw new Error(j.error || `company-check ${r.status}`);
  return j as CompanyCheck;
}

/** Numeric score from the "Weighted %" cell (may be blank). */
export function scoreOf(row: DealRow): number {
  const n = parseFloat((row['Weighted %'] || '').toString());
  return Number.isFinite(n) ? n : 0;
}

export function tierOf(score: number): { label: string; klass: string } {
  if (score >= 80) return { label: 'Strong Yes', klass: 'bg-green-100 text-green-800 border-green-300' };
  if (score >= 70) return { label: 'Deep Dive', klass: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
  if (score >= 64) return { label: 'Recommended', klass: 'bg-blue-100 text-blue-800 border-blue-300' };
  if (score >= 55) return { label: 'Watch', klass: 'bg-amber-100 text-amber-800 border-amber-300' };
  return { label: 'Backlog', klass: 'bg-gray-100 text-gray-600 border-gray-300' };
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
