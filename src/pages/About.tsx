export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900">About</h1>

        <p className="mt-4 text-lg text-gray-700 leading-relaxed">
          My name is Bryan Hanley, a startup operator based in New York, USA.
        </p>

        <div className="mt-8 space-y-6 text-gray-700 leading-relaxed">
          <h2 className="text-2xl font-bold text-gray-900">Where the thesis came from</h2>
          <p>
            My &ldquo;Second Layer Approach&rdquo; investment thesis emerged from my
            interest in and work within startups. As someone passionate about venture
            investing, I realized early on in my career at a startup the significant role
            of AI in reshaping how we work, and subsequently, where investors are
            committing their capital to help drive this change.
          </p>
          <p>
            The speed in which AI has scaled, from new features to entire new platforms,
            is monumental — and, put simply, not every industry is meeting this level of
            growth. Operational burdens, knowledge barriers, and compliance challenges
            inhibit AI&rsquo;s implementation, limiting the technology&rsquo;s impact
            across many (or even all) industries today.
          </p>
          <p>
            Despite implementation challenges, we are starting to turn the corner on
            AI&rsquo;s impact at the corporate level. Companies are adopting it at
            increasing rates, with top large language models realizing significant gains
            from their shift to corporate-level integration. Many of the impacts AI will
            have on industries, as well as the companies and workers within them, is yet
            to be understood.
          </p>
          <p>
            The Second Layer Approach seeks to identify this &ldquo;yet to be
            understood&rdquo; — pinpointing areas of both opportunity and risk where
            investors should be focusing today (but oftentimes, are not).
          </p>
          <p>
            The world of AI is changing quickly. The founders who are looking ahead to
            AI&rsquo;s impact on the industries of tomorrow, and mitigating the inevitable
            risks the technology will bring, will be the ones worth remembering. And the
            investors who recognize these signals and bet on these founders early on will
            be the ones who capitalize.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 pt-2">The engine and the cockpit</h2>
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

          <h2 className="text-2xl font-bold text-gray-900 pt-2">Built with AI</h2>
          <p>
            The whole system was built as an exercise in using AI to do venture work — not
            as a chat assistant, but as the engineering surface for a real sourcing
            operation. It&rsquo;s part of my work with Venture Institute demonstrating how
            AI changes what one person can source, verify, and cover.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-6 text-brand-700 font-semibold">
          <a
            href="https://www.linkedin.com/in/bryan-stanley-hanley/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-900"
          >
            LinkedIn
          </a>
          <a
            href="https://bryanhanley.substack.com/about"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-900"
          >
            Substack
          </a>
          <a href="mailto:bry.hanley2@gmail.com" className="hover:text-brand-900">
            Email
          </a>
        </div>
      </div>
    </div>
  );
}
