import Hero from '../components/Home/Hero';
import { Link } from 'react-router-dom';

const STEPS = [
  {
    n: 1,
    title: 'Source',
    body: 'Specialist fund portfolios, SEC filings, sector press, accelerator cohorts, and program awardees — scraped and diffed run over run so only genuinely new companies enter.',
  },
  {
    n: 2,
    title: 'Verify',
    body: 'Every funding figure is cross-checked against Crunchbase, SEC Form D, and the company’s own site. It carries a source and a confidence level, or it is marked unverified.',
  },
  {
    n: 3,
    title: 'Filter',
    body: 'A thesis test drops companies that are the trend rather than a second-layer response to it, and rejects funds, accelerators, and programs.',
  },
  {
    n: 4,
    title: 'Score',
    body: 'A 9-factor rubric, fed each company’s own website and web-searched context, ranks the survivors. The score is a sort key, not a gate.',
  },
];

export default function Home() {
  return (
    <div>
      <Hero />

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900">How the engine works</h2>
          <p className="text-lg text-gray-600 mt-3 max-w-2xl">
            A manual-trigger pipeline. It runs on demand, does the expensive research, and
            writes a ranked list — the analyst still owns every decision.
          </p>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mt-12">
            {STEPS.map((s) => (
              <div key={s.n}>
                <div className="w-11 h-11 bg-brand-100 rounded-full flex items-center justify-center text-brand-900 font-bold">
                  {s.n}
                </div>
                <h3 className="font-semibold text-lg mt-4">{s.title}</h3>
                <p className="text-gray-600 mt-1.5 text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 md:grid-cols-2">
          <Link
            to="/map"
            className="block bg-white rounded-xl border border-gray-200 p-8 hover:border-brand-400 transition"
          >
            <h3 className="text-xl font-bold text-gray-900">The Second Layer Map</h3>
            <p className="text-gray-600 mt-2">
              One dominant trend, the problem layers it creates, and the seed-stage
              companies attacking each — auto-maintained by the pipeline. Public.
            </p>
            <span className="text-brand-700 font-semibold mt-4 inline-block">Open the map &rarr;</span>
          </Link>

          <Link
            to="/dealflow"
            className="block bg-white rounded-xl border border-gray-200 p-8 hover:border-brand-400 transition"
          >
            <h3 className="text-xl font-bold text-gray-900">Dealflow</h3>
            <p className="text-gray-600 mt-2">
              The full ranked board, a watchlist of companies tracked for movement, and a
              live &ldquo;check any company against the thesis&rdquo; agent. Private.
            </p>
            <span className="text-brand-700 font-semibold mt-4 inline-block">Go to dealflow &rarr;</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
