import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Company } from '../types';
import { getCompany } from '../lib/supabase';
import { getDecisionColor, getDecisionBgColor, getBarColor, getFactorBreakdown } from '../lib/scoring';

export default function Results() {
  const { id } = useParams<{ id: string }>();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadCompany(id);
    }
  }, [id]);

  const loadCompany = async (companyId: string) => {
    const { data, error } = await getCompany(companyId);

    if (error) {
      console.error('Error loading company:', error);
      return;
    }

    setCompany(data);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading results...</div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="text-xl text-gray-600">Company not found</div>
      </div>
    );
  }

  const breakdown = getFactorBreakdown({
    factor_1a: company.factor_1a || 0,
    factor_1b: company.factor_1b || 0,
    factor_1c: company.factor_1c || 0,
    factor_2a: company.factor_2a || 0,
    factor_2b: company.factor_2b || 0,
    factor_3a: company.factor_3a || 0,
    factor_3b: company.factor_3b || 0,
    factor_4: company.factor_4 || 0,
    factor_5: company.factor_5 || 0,
    factor_6: company.factor_6 || 0,
    factor_7: company.factor_7 || 0,
  });

  const successScore = company.success_score || 0;
  const decisionColorClass = getDecisionColor(successScore);
  const decisionBgClass = getDecisionBgColor(successScore);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{company.name}</h1>
          <p className="text-gray-600">
            {company.seed_date && `${company.seed_date} • `}
            {company.amount_raised && `${company.amount_raised} • `}
            {company.lead_investor}
          </p>
        </div>

        {/* Main Results Card */}
        <div className={`bg-white rounded-xl shadow-lg p-8 mb-8 border-2 ${decisionBgClass}`}>
          {/* Score Display */}
          <div className="text-center mb-8">
            <div className={`text-7xl font-bold ${decisionColorClass} mb-2`}>
              {successScore.toFixed(1)}%
            </div>
            <div className="text-3xl font-semibold text-gray-900 mb-2">{company.rating}</div>
            <div className="text-lg text-gray-700">SUCCESS SCORE</div>
          </div>

          {/* Decision Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-xs text-gray-600 mb-1">Recommendation</div>
              <div className={`text-lg font-bold ${decisionColorClass}`}>
                {successScore >= 75 ? '✓ INVEST' : successScore >= 65 ? '🤔 DEEP DIVE' : '✗ PASS'}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-xs text-gray-600 mb-1">Expected Outcome</div>
              <div className="text-lg font-bold text-gray-900 line-clamp-2">
                {company.expected_outcome}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-xs text-gray-600 mb-1">Confidence</div>
              <div className="text-lg font-bold text-gray-900">{company.confidence}</div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-xs text-gray-600 mb-1">Validation</div>
              <div className="text-lg font-bold text-gray-900">
                {successScore >= 75 ? '100% (15/15)' : successScore >= 55 ? '82%' : '100%'}
              </div>
            </div>
          </div>

          {/* Decision Description */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-gray-900 mb-2">What This Means:</h4>
            <div className="text-gray-700 text-sm">
              {successScore >= 85 && (
                <p>
                  <strong>Exceptional opportunity.</strong> Companies scoring 85%+ historically become
                  decacorns ($25B+). Strong recommendation to invest immediately.
                </p>
              )}
              {successScore >= 75 && successScore < 85 && (
                <p>
                  <strong>Strong investment opportunity.</strong> All 15 companies scoring 75%+ in our
                  validation became unicorns. This meets the threshold for standard seed investment.
                </p>
              )}
              {successScore >= 65 && successScore < 75 && (
                <p>
                  <strong>Requires deeper diligence.</strong> 82% of companies in this range succeeded,
                  but further analysis recommended. Only invest if market opportunity is 9+/10 AND founder
                  quality is 9+/10.
                </p>
              )}
              {successScore >= 55 && successScore < 65 && (
                <p>
                  <strong>High risk.</strong> 70% of companies in this range failed. Recommend passing
                  unless there are exceptional circumstances not captured by the model.
                </p>
              )}
              {successScore < 55 && (
                <p>
                  <strong>Do not invest.</strong> 100% of companies scoring below 55% in our validation
                  failed. This is a clear pass.
                </p>
              )}
            </div>
          </div>

          {/* Factor Breakdown */}
          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Category Breakdown</h3>
            <div className="space-y-4">
              {Object.entries(breakdown).map(([key, category]) => (
                <div key={key}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">
                      {category.label} ({category.weight})
                    </span>
                    <span className="font-semibold">{category.score.toFixed(1)}/10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all ${getBarColor(category.score * 10)}`}
                      style={{ width: `${category.score * 10}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex gap-4">
            <Link
              to="/portfolio"
              className="flex-1 px-6 py-3 bg-brand-900 text-white rounded-lg hover:bg-brand-800 transition font-semibold text-center"
            >
              View Portfolio
            </Link>
            <Link
              to="/evaluate"
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold text-center"
            >
              Evaluate Another
            </Link>
          </div>
        </div>

        {/* Detailed Scores */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Individual Factor Scores</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { id: '1a', label: '1A. Founder-Market Fit', score: company.factor_1a },
              { id: '1b', label: '1B. Technical Execution', score: company.factor_1b },
              { id: '1c', label: '1C. Founder Commitment', score: company.factor_1c },
              { id: '2a', label: '2A. Early PMF', score: company.factor_2a },
              { id: '2b', label: '2B. Revenue Signals', score: company.factor_2b },
              { id: '3a', label: '3A. Market Size', score: company.factor_3a },
              { id: '3b', label: '3B. Timing & Competition', score: company.factor_3b },
              { id: '4', label: '4. Traction - Quant', score: company.factor_4 },
              { id: '5', label: '5. Traction - Qual', score: company.factor_5 },
              { id: '6', label: '6. Capital Efficiency', score: company.factor_6 },
              { id: '7', label: '7. Investor Signal', score: company.factor_7 },
            ].map((factor) => (
              <div key={factor.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900">{factor.label}</span>
                  <span className="text-2xl font-bold text-brand-900">{factor.score}/10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${getBarColor((factor.score || 0) * 10)}`}
                    style={{ width: `${(factor.score || 0) * 10}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
