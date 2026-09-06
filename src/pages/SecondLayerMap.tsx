import { useEffect, useState } from 'react';
import { getSecondLayerMap, SecondLayerMap as MapData, MapLayer } from '../lib/map';

export default function SecondLayerMap() {
  const [data, setData] = useState<MapData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSecondLayerMap()
      .then(setData)
      .catch((e) => console.warn('second layer map:', e))
      .finally(() => setLoading(false));
  }, []);

  // A public page: a fetch failure and "not built yet" both land on the same
  // neutral empty state — never a raw error string.
  const empty = !loading && (!data || !data.layers.length);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-brand-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-brand-200 font-semibold tracking-wide uppercase text-sm">
            A Second Layer map
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mt-3">
            {data?.trend || 'The AI compute buildout'}
          </h1>
          <p className="text-lg text-brand-100 mt-5 max-w-2xl">
            {data?.trend_blurb ||
              'The dominant trend is not the opportunity. The problems it creates are.'}
          </p>
          {data?.updated && (
            <p className="text-sm text-brand-300 mt-6">
              Auto-maintained by an AI sourcing pipeline · last refreshed {data.updated}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-gray-600 max-w-2xl mb-10">
          Each layer below is a problem the buildout <em>creates</em>. The companies in it
          are seed-stage, surfaced automatically from specialist fund portfolios, public
          filings, and sector press — then checked against the thesis. Inclusion is not an
          endorsement.
        </p>

        {loading && <p className="text-gray-500">Loading the map…</p>}
        {empty && (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-gray-500">
            The map is being compiled from the latest pipeline run — check back shortly.
          </div>
        )}

        <div className="space-y-6">
          {data?.layers.map((layer, i) => (
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
