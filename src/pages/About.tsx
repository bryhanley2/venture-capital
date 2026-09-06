export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900">About</h1>

        <div className="prose prose-gray mt-8 space-y-6 text-gray-700 leading-relaxed">
          <p>
            I&rsquo;m Bryan Hanley. I invest in seed-stage companies through a lens I call
            Second Layer: the biggest returns often go not to the companies riding a
            dominant trend, but to the ones solving the problems that trend creates.
            Satellite proliferation is the trend; RF detection for the blind spots it
            leaves is the second layer.
          </p>

          <h2 className="text-2xl font-bold text-gray-900">The engine and the cockpit</h2>
          <p>
            This site has two parts. The <strong>pipeline</strong> is the engine — a
            manual-trigger system that sources companies from specialist fund portfolios,
            public filings, and sector programs, verifies their funding against citable
            sources, filters for thesis fit, and scores what survives. The{' '}
            <strong>web app</strong> is the cockpit: the ranked dealflow board, a watchlist
            that tracks promising-but-not-yet companies for movement between runs, a live
            agent that checks any company against the thesis, and the public Second Layer
            Map.
          </p>
          <p>
            The pipeline proposes; a human decides. Every funding number is cited or
            flagged, the system fails loudly rather than writing quiet guesses, and no
            investment call is automated.
          </p>

          <h2 className="text-2xl font-bold text-gray-900">Built with AI</h2>
          <p>
            The whole system was built as an exercise in using AI to do venture work — not
            as a chat assistant, but as the engineering surface for a real sourcing
            operation. It&rsquo;s part of my work with Venture Institute demonstrating how
            AI changes what a solo investor can build and cover.
          </p>
        </div>

        <div className="mt-10 flex gap-6 text-brand-700 font-semibold">
          <a
            href="https://www.linkedin.com/in/bryan-stanley-hanley/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-900"
          >
            LinkedIn
          </a>
          <a href="mailto:bry.hanley2@gmail.com" className="hover:text-brand-900">
            Email
          </a>
        </div>
      </div>
    </div>
  );
}
