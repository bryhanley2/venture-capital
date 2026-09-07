import { useEffect, useMemo, useState } from 'react';
import { getSecondLayerMap, MapTrend, MapLayer } from '../lib/map';

export default function SecondLayerMap() {
  const [trends, setTrends] = useState<MapTrend[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    getSecondLayerMap()
      .then((d) => setTrends(d.trends))
      .catch((e) => console.warn('second layer map:', e))
      .finally(() => setLoading(false));
  }, []);

  const empty = !loading && trends.length === 0;
  const trend = trends[selected];

  const stats = useMemo(() => {
    if (!trend) return null;
    return {
      layers: trend.layers.length,
      companies: trend.layers.reduce((n, l) => n + l.companies.length, 0),
    };
  }, [trend]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-brand-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-brand-200 font-semibold tracking-wide uppercase text-sm">
            A Second Layer map
          </p>

          {trends.length > 1 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {trends.map((t, i) => (
                <button
                  key={t.trend}
                  onClick={() => setSelected(i)}
                  className={`text-sm px-3 py-1.5 rounded-full border transition ${
                    i === selected
                      ? 'bg-white text-brand-900 border-white'
                      : 'border-white/30 text-brand-100 hover:bg-white/10'
                  }`}
                >
                  {t.trend}
                </button>
              ))}
            </div>
          )}

          <h1 className="text-4xl sm:text-5xl font-bold mt-4">
            {trend?.trend || 'The AI compute buildout'}
          </h1>
          <p className="text-lg text-brand-100 mt-5 max-w-2xl">
            {trend?.trend_blurb ||
              'The dominant trend is not the opportunity. The problems it creates are.'}
          </p>
          {trend?.updated && (
            <p className="text-sm text-brand-300 mt-6">
              Auto-maintained by an AI sourcing pipeline · last refreshed {trend.updated}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-gray-600 max-w-2xl mb-4">
          Each layer below is a problem the trend <em>creates</em>. The companies in it
          are seed-stage, surfaced automatically from specialist fund portfolios, public
          filings, and sector press — then checked against the thesis. Inclusion is not an
          endorsement.
        </p>
        <p className="text-gray-500 text-sm max-w-2xl mb-10">
          This is a curated selection — the top companies per layer. The full ranked
          dealflow, the watchlist, and the company-check agent are private.
        </p>

        {loading && <p className="text-gray-500">Loading the map…</p>}
        {empty && (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-gray-500">
            The map is being compiled from the latest pipeline run — check back shortly.
          </div>
        )}

        {stats && (
          <p className="text-sm text-gray-500 mb-6">
            {stats.companies} companies across {stats.layers}{' '}
            {stats.layers === 1 ? 'layer' : 'layers'}
            {trend?.updated ? ` · refreshed ${trend.updated}` : ''}
          </p>
        )}

        <div className="space-y-6">
          {trend?.layers.map((layer, i) => (
            <LayerSection key={layer.id} layer={layer} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function LayerSection({ layer, index }: { layer: MapLayer; index: number }) {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="border-l-4 border-brand-500 p-6">
        <div className="flex items-baseline gap-3">
          <span className="text-brand-400 font-mono text-sm">{String(index + 1).padStart(2, '0')}</span>
          <h2 className="text-2xl font-bold text-gray-900">{layer.name}</h2>
          <span className="text-xs text-gray-400 ml-auto">
            {layer.companies.length} {layer.companies.length === 1 ? 'company' : 'companies'}
          </span>
        </div>
        <p className="text-gray-600 mt-2 max-w-2xl">{layer.problem}</p>
      </div>

      <div className="grid gap-px bg-gray-100 sm:grid-cols-2">
        {layer.companies.map((c) => (
          <div key={c.name} className="bg-white p-5">
            <div className="flex items-center gap-2">
              {c.website ? (
                <a
                  href={c.website}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-gray-900 hover:text-brand-700"
                >
                  {c.name}
                </a>
              ) : (
                <span className="font-semibold text-gray-900">{c.name}</span>
              )}
              {c.stage && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
                  {c.stage}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 mt-1.5">{c.blurb}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
