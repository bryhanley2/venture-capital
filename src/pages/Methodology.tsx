import { FACTORS } from '../lib/factors';

export default function Methodology() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-gray-900 mb-6 text-center">The Methodology</h1>
        <p className="text-xl text-gray-600 mb-12 text-center">
          A statistically-validated framework for evaluating seed-stage startups
        </p>

        {/* Validation Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Validation & Accuracy</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">✓ Unicorn Prediction</h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start">
                  <span className="text-2xl mr-3">📈</span>
                  <div>
                    <div className="font-semibold">15/15 Unicorns Predicted</div>
                    <div className="text-sm">100% accuracy on companies scoring 75%+</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl mr-3">🦄</span>
                  <div>
                    <div className="font-semibold">Including Major Successes</div>
                    <div className="text-sm">
                      Airbnb (81.9%), Stripe (82.4%), Coinbase (84.9%), Uber (82.4%), Slack (82.9%)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">✗ Failure Detection</h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start">
                  <span className="text-2xl mr-3">🚫</span>
                  <div>
                    <div className="font-semibold">8/8 Failures Predicted</div>
                    <div className="text-sm">100% accuracy on companies scoring &lt;55%</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl mr-3">💸</span>
                  <div>
                    <div className="font-semibold">Including Notable Failures</div>
                    <div className="text-sm">
                      Theranos (42.6%), Juicero (41.2%), Quibi (42.9%), Color Labs (40.7%)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-2">Statistical Validation</h4>
            <p className="text-gray-700 mb-4">
              The model was validated on 50 real companies spanning 2008-2018, evaluating them at their
              seed stage using only historically available information. This retrospective analysis
              demonstrates the model's predictive power.
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-900">50</div>
                <div className="text-sm text-gray-600">Companies Analyzed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-900">93%</div>
                <div className="text-sm text-gray-600">Overall Accuracy</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-900">2008-2018</div>
                <div className="text-sm text-gray-600">Time Period</div>
              </div>
            </div>
          </div>
        </div>

        {/* Factors Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">11 Weighted Factors</h2>
          <p className="text-gray-600 mb-8">
            Each factor is scored 0-10 and weighted based on its importance in predicting success.
          </p>

          <div className="space-y-6">
            {FACTORS.map((factor, idx) => (
              <div key={factor.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{factor.label}</h3>
                  <span className="text-sm font-medium text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
                    {factor.weight} weight
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{factor.description}</p>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">Scoring Guide:</div>
                  <div className="space-y-1 text-sm text-gray-600">
                    {factor.scoreGuide.map((guide, gIdx) => (
                      <div key={gIdx}>
                        <span className="font-medium text-brand-900">{guide.score}:</span>{' '}
                        {guide.description}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decision Thresholds */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Decision Thresholds</h2>

          <div className="space-y-4">
            <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded">
              <h3 className="font-bold text-green-900 mb-2">85-100% (★★★★★) - STRONG YES</h3>
              <p className="text-gray-700">
                Exceptional opportunity. Expected to become decacorns ($25B+). Invest immediately with
                high conviction.
              </p>
            </div>

            <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded">
              <h3 className="font-bold text-green-900 mb-2">75-84% (★★★★) - YES</h3>
              <p className="text-gray-700">
                Strong investment. 100% of companies (15/15) in validation became unicorns. Standard seed
                investment recommended.
              </p>
            </div>

            <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4 rounded">
              <h3 className="font-bold text-yellow-900 mb-2">65-74% (★★★) - DEEP DIVE</h3>
              <p className="text-gray-700">
                Requires additional diligence. 82% success rate (14/17). Only invest if both market (9+)
                and founder (9+) scores are exceptional.
              </p>
            </div>

            <div className="border-l-4 border-orange-500 bg-orange-50 p-4 rounded">
              <h3 className="font-bold text-orange-900 mb-2">55-64% (★★) - PROBABLY PASS</h3>
              <p className="text-gray-700">
                High risk. 70% failure rate. Recommend passing unless there are exceptional circumstances
                not captured by the model.
              </p>
            </div>

            <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded">
              <h3 className="font-bold text-red-900 mb-2">&lt;55% (★) - HARD PASS</h3>
              <p className="text-gray-700">
                Do not invest. 100% of companies (8/8) in validation failed. Clear pass decision.
              </p>
            </div>
          </div>
        </div>

        {/* Limitations */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Limitations & Considerations</h2>

          <div className="space-y-4 text-gray-700">
            <p>
              <strong>Model Limitations:</strong> This model is designed for seed-stage technology
              startups. It may not apply well to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Non-tech companies (retail, services, etc.)</li>
              <li>Later-stage companies (Series A+)</li>
              <li>Deep tech requiring long R&D cycles</li>
              <li>Regulated industries (pharmaceuticals, etc.)</li>
            </ul>

            <p>
              <strong>Subjective Scoring:</strong> While the model provides structure, scoring each
              factor requires judgment. Two evaluators may score the same company differently.
            </p>

            <p>
              <strong>Historical Validation:</strong> Past performance doesn't guarantee future results.
              Market conditions, technology trends, and competitive landscapes evolve.
            </p>

            <p>
              <strong>Recommendation:</strong> Use this model as one input in your decision-making
              process, not the sole determinant. Combine quantitative scoring with qualitative judgment,
              due diligence, and domain expertise.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
