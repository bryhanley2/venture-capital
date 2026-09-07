import { useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  getDealflow, DealRow, WatchRow,
  scoreOf, tierOf, fundingChip, sizeStatusOf, cleanBoardRows,
} from '../lib/dealflow';

const PAGE_SIZE = 20;

export default function Dealflow() {
  const [rows, setRows] = useState<DealRow[]>([]);
  const [watchlist, setWatchlist] = useState<WatchRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    getDealflow()
      .then((d) => { setRows(d.companies); setWatchlist(d.watchlist); })
      .catch((e) => setErr(e?.message || 'Could not load dealflow'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <header>
          <h1 className="text-4xl font-bold text-gray-900">Dealflow</h1>
          <p className="text-gray-600 mt-2 max-w-2xl">
            Seed-stage companies surfaced and screened by the Second Layer pipeline —
            an AI agent that sources from specialist fund portfolios, verifies funding
            against citable sources, and scores against the thesis.
          </p>
        </header>

        <WatchlistPanel rows={watchlist} loading={loading} />
        <DealBoard rows={rows} loading={loading} err={err} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Watchlist — companies tracked for movement between runs            */
/* ------------------------------------------------------------------ */
function watchStatus(s: string): { label: string; klass: string; rank: number } {
  const v = (s || 'watching').toLowerCase();
  if (v === 'graduated')
    return { label: 'Raised past seed', klass: 'bg-red-100 text-red-800 border-red-300', rank: 0 };
  if (v === 'moved')
    return { label: 'Moved', klass: 'bg-amber-100 text-amber-800 border-amber-300', rank: 1 };
  if (v === 'dropped')
    return { label: 'Dropped', klass: 'bg-gray-100 text-gray-500 border-gray-300', rank: 3 };
  return { label: 'Watching', klass: 'bg-blue-100 text-blue-700 border-blue-300', rank: 2 };
}

function WatchlistPanel({ rows, loading }: { rows: WatchRow[]; loading: boolean }) {
  const [showAll, setShowAll] = useState(false);
  if (loading || !rows.length) return null;

  const movers = rows.filter((r) => ['moved', 'graduated'].includes((r.Status || '').toLowerCase()));
  const shown = showAll ? rows : movers.length ? movers : rows.slice(0, 5);

  return (
    <Section>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Watchlist
          {movers.length > 0 && (
            <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
              {movers.length} moved
            </span>
          )}
        </h2>
        <button
          onClick={() => setShowAll((s) => !s)}
          className="text-sm text-brand-700 hover:text-brand-900"
        >
          {showAll ? 'Show movers only' : `Show all ${rows.length}`}
        </button>
      </div>
      <p className="text-sm text-gray-500 -mt-2 mb-4">
        Thesis-fit companies that weren't ready yet. The pipeline re-checks them each run
        for new funding, hiring, site changes, and press.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b border-gray-200">
              <th className="py-2 pr-4 font-medium">Company</th>
              <th className="py-2 pr-4 font-medium">Status</th>
              <th className="py-2 pr-4 font-medium">Last signal</th>
              <th className="py-2 pr-4 font-medium">Checked</th>
            </tr>
          </thead>
          <tbody>
            {shown.map((r) => {
              const st = watchStatus(r.Status);
              return (
                <tr key={`${r.Company}:${r.Added}`} className="border-b border-gray-100 align-top">
                  <td className="py-3 pr-4 font-medium text-gray-900">
                    {r.Website ? (
                      <a href={r.Website} target="_blank" rel="noreferrer" className="hover:text-brand-700">
                        {r.Company}
                      </a>
                    ) : r.Company}
                    <div className="text-xs font-normal text-gray-400">{r.Vertical}</div>
                  </td>
                  <td className="py-3 pr-4">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${st.klass}`}>
                      {st.label}
                    </span>
                    {(r['Last Stage'] || r['Last Funding']) && (
                      <div className="text-xs text-gray-500 mt-1">
                        {[r['Last Stage'], r['Last Funding']].filter(Boolean).join(' · ')}
                      </div>
                    )}
                  </td>
                  <td className="py-3 pr-4 text-gray-600 max-w-md">{r['Last Signal'] || '—'}</td>
                  <td className="py-3 pr-4 text-gray-400 whitespace-nowrap">{r['Last Checked'] || 'not yet'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  The ranked dealflow board                                          */
/* ------------------------------------------------------------------ */
function DealBoard({ rows, loading, err }: { rows: DealRow[]; loading: boolean; err: string }) {
  const [vertical, setVertical] = useState('all');
  const [fund, setFund] = useState<'target' | 'all'>('target');
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState<string | null>(null);

  // Drop over-cap rows and merge duplicate companies once, up front.
  const base = useMemo(() => cleanBoardRows(rows), [rows]);

  const verticals = useMemo(() => {
    const s = new Set(base.map((r) => r.Vertical).filter(Boolean));
    return ['all', ...Array.from(s).sort()];
  }, [base]);

  const filtered = useMemo(() => {
    let f = vertical === 'all' ? base : base.filter((r) => r.Vertical === vertical);
    if (fund === 'target') f = f.filter((r) => sizeStatusOf(r['Total Raised']) !== 'above_range');
    return [...f].sort((a, b) => scoreOf(b) - scoreOf(a));
  }, [base, vertical, fund]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const clampedPage = Math.min(page, pageCount - 1);
  const shown = filtered.slice(clampedPage * PAGE_SIZE, clampedPage * PAGE_SIZE + PAGE_SIZE);

  const reset = (fn: () => void) => { fn(); setPage(0); setOpen(null); };

  if (loading) return <Section><p className="text-gray-500">Loading dealflow…</p></Section>;
  if (err) return <Section><p className="text-red-600 text-sm">{err}</p></Section>;
  if (!rows.length) return <Section><p className="text-gray-500 text-sm">No companies yet — run the pipeline from GitHub Actions.</p></Section>;

  return (
    <Section>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          {filtered.length} compan{filtered.length === 1 ? 'y' : 'ies'}
          {fund === 'target' && rows.length > filtered.length && (
            <span className="ml-2 text-xs font-normal text-gray-400">
              in thesis range
            </span>
          )}
        </h2>
        <div className="flex flex-wrap gap-2">
          <select
            value={fund}
            onChange={(e) => reset(() => setFund(e.target.value as 'target' | 'all'))}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-500"
          >
            <option value="target">In thesis range (≤ $4M)</option>
            <option value="all">All within cap (≤ $10M)</option>
          </select>
          <select
            value={vertical}
            onChange={(e) => reset(() => setVertical(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-500"
          >
            {verticals.map((v) => (
              <option key={v} value={v}>{v === 'all' ? 'All verticals' : v}</option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500 text-sm py-4">
          No companies match this filter.{' '}
          {fund === 'target' && (
            <button onClick={() => reset(() => setFund('all'))} className="text-brand-700 hover:text-brand-900">
              Show all within cap
            </button>
          )}
        </p>
      ) : (
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b border-gray-200">
              <th className="py-2 pr-4 font-medium">Company</th>
              <th className="py-2 pr-4 font-medium">Vertical</th>
              <th className="py-2 pr-4 font-medium">Score</th>
              <th className="py-2 pr-4 font-medium">Tier</th>
              <th className="py-2 pr-4 font-medium">Funding</th>
              <th className="py-2 pr-4 font-medium">Source</th>
            </tr>
          </thead>
          <tbody>
            {shown.map((r) => {
              const key = `${r._tab}:${r.Company}:${r.Date}`;
              const sc = scoreOf(r);
              const tier = tierOf(sc);
              const fc = fundingChip(r['Total Raised']);
              const isOpen = open === key;
              return (
                <FragmentRow key={key}>
                  <tr
                    className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                    onClick={() => setOpen(isOpen ? null : key)}
                  >
                    <td className="py-3 pr-4 font-medium text-gray-900">
                      {r.Website ? (
                        <a href={r.Website} target="_blank" rel="noreferrer"
                           className="hover:text-brand-700" onClick={(e) => e.stopPropagation()}>
                          {r.Company}
                        </a>
                      ) : r.Company}
                    </td>
                    <td className="py-3 pr-4 text-gray-600">{r.Vertical || '—'}</td>
                    <td className="py-3 pr-4 tabular-nums text-gray-900">{sc ? `${sc.toFixed(0)}%` : '—'}</td>
                    <td className="py-3 pr-4">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${tier.klass}`}>
                        {tier.label}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${fc.klass}`}>{fc.text}</span>
                    </td>
                    <td className="py-3 pr-4 text-gray-500">{r.Source || '—'}</td>
                  </tr>
                  {isOpen && (
                    <tr className="bg-gray-50/70 border-b border-gray-100">
                      <td colSpan={6} className="py-4 px-2">
                        <div className="grid gap-3 md:grid-cols-2 text-sm">
                          <Detail label="What they do" value={r.Description || r.Summary} />
                          <Detail label="Second Layer logic" value={r['Second Layer Logic']} />
                          <Detail label="Founders" value={r.Founders} />
                          <Detail label="Strengths" value={r.Strengths} />
                          <Detail label="Risks" value={r.Risks} />
                          <Detail label="Contact" value={[r.Website, r.LinkedIn].filter(Boolean).join('  ·  ')} />
                        </div>
                      </td>
                    </tr>
                  )}
                </FragmentRow>
              );
            })}
          </tbody>
        </table>
      </div>
      )}

      {filtered.length > 0 && pageCount > 1 && (
        <div className="flex items-center justify-between mt-4 text-sm">
          <button
            onClick={() => { setPage((p) => Math.max(0, p - 1)); setOpen(null); }}
            disabled={clampedPage === 0}
            className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-40"
          >
            ← Previous
          </button>
          <span className="text-gray-500">
            Page {clampedPage + 1} of {pageCount}
          </span>
          <button
            onClick={() => { setPage((p) => Math.min(pageCount - 1, p + 1)); setOpen(null); }}
            disabled={clampedPage >= pageCount - 1}
            className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-40"
          >
            Next →
          </button>
        </div>
      )}
    </Section>
  );
}

function Section({ children }: { children: ReactNode }) {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">{children}</section>
  );
}
function FragmentRow({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
function Detail({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div>
      <div className="text-gray-500">{label}</div>
      <div className="text-gray-800 whitespace-pre-wrap">{value}</div>
    </div>
  );
}
