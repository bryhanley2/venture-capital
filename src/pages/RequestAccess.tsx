import { Link } from 'react-router-dom';

const MAILTO =
  'mailto:bry.hanley2@gmail.com' +
  '?subject=' + encodeURIComponent('Dealflow access request') +
  '&body=' + encodeURIComponent(
    "Hi Bryan,\n\nI'd like access to the dealflow. A bit about me:\n\n- Who I am:\n- Why I'm interested:\n\nThanks.",
  );

const INSIDE = [
  'The full ranked board — every company the pipeline has surfaced, with its second-layer logic, verified funding (cited or flagged), strengths, and risks.',
  'The watchlist — companies that aren’t ready yet, re-checked every run for a new raise, hiring, or press.',
  'The company-check agent — enter any company and get a live thesis read with sources.',
];

export default function RequestAccess() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900">Dealflow access</h1>
        <p className="text-gray-600 mt-4 max-w-2xl leading-relaxed">
          The <Link to="/map" className="text-brand-700 hover:text-brand-900">Second Layer Map</Link>{' '}
          is the public view. The dealflow itself — the working surface — is private.
        </p>

        <div className="bg-white rounded-xl border border-gray-200 p-6 mt-8">
          <h2 className="text-lg font-semibold text-gray-900">What&rsquo;s inside</h2>
          <ul className="mt-4 space-y-3">
            {INSIDE.map((t) => (
              <li key={t} className="text-gray-700 text-sm leading-relaxed flex gap-3">
                <span className="text-brand-500 mt-1">&#8212;</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-gray-600 mt-8 max-w-2xl leading-relaxed">
          Access is limited. If you&rsquo;re an investor, an operator, or evaluating this
          work, send a note and I&rsquo;ll set you up.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <a
            href={MAILTO}
            className="inline-block bg-brand-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-800 transition"
          >
            Request access
          </a>
          <Link to="/login" className="text-brand-700 font-semibold hover:text-brand-900">
            I already have a password
          </Link>
        </div>
      </div>
    </div>
  );
}
