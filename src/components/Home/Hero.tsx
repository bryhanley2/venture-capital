import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="bg-brand-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <p className="text-brand-300 font-semibold tracking-wide uppercase text-sm">
          A seed-stage sourcing thesis
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold mt-4 leading-tight max-w-3xl">
          The trend is not the opportunity.
          <br />
          The problems it creates are.
        </h1>
        <p className="text-lg text-brand-100 mt-6 max-w-2xl leading-relaxed">
          Second Layer investing means backing the companies that solve problems
          <em> created by</em> a dominant trend — not the companies that <em>are</em> the
          trend. This site is the sourcing engine that finds them: an AI pipeline that
          reads specialist fund portfolios and public filings, verifies funding against
          citable sources, and scores every company against the thesis.
        </p>
        <div className="flex flex-wrap gap-4 mt-9">
          <Link
            to="/map"
            className="inline-block bg-white text-brand-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            See the Second Layer Map
          </Link>
          <Link
            to="/dealflow"
            className="inline-block border border-white/30 px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
          >
            Dealflow
          </Link>
        </div>
      </div>
    </section>
  );
}
