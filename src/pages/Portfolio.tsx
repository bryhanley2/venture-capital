import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Company } from '../types';
import { getCompanies } from '../lib/supabase';
import { getDecisionColor } from '../lib/scoring';

export default function Portfolio() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'invest' | 'deep-dive' | 'pass'>('all');

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    const { data, error } = await getCompanies();

    if (error) {
      console.error('Error loading companies:', error);
      return;
    }

    setCompanies(data || []);
    setLoading(false);
  };

  const filteredCompanies = companies.filter((c) => {
    if (filter === 'all') return true;
    const score = c.success_score || 0;
    if (filter === 'invest') return score >= 75;
    if (filter === 'deep-dive') return score >= 65 && score < 75;
    if (filter === 'pass') return score < 65;
    return true;
  });

  const stats = {
    total: companies.length,
    invest: companies.filter((c) => (c.success_score || 0) >= 75).length,
    deepDive: companies.filter((c) => {
      const score = c.success_score || 0;
      return score >= 65 && score < 75;
    }).length,
    pass: companies.filter((c) => (c.success_score || 0) < 65).length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading portfolio...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Portfolio</h1>
          <Link
            to="/evaluate"
            className="bg-brand-900 text-white px-6 py-3 rounded-lg hover:bg-brand-800 transition font-semibold"
          >
            + Evaluate Company
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div
            onClick={() => setFilter('all')}
            className={`bg-white rounded-lg p-6 text-center cursor-pointer transition ${
              filter === 'all' ? 'ring-2 ring-brand-600' : 'hover:shadow-lg'
            }`}
          >
            <div className="text-4xl font-bold text-brand-900">{stats.total}</div>
            <div className="text-sm text-gray-600 mt-2">Total Evaluated</div>
          </div>

          <div
            onClick={() => setFilter('invest')}
            className={`bg-white rounded-lg p-6 text-center cursor-pointer transition ${
              filter === 'invest' ? 'ring-2 ring-green-600' : 'hover:shadow-lg'
            }`}
          >
            <div className="text-4xl font-bold text-green-600">{stats.invest}</div>
            <div className="text-sm text-gray-600 mt-2">Invest (75%+)</div>
          </div>

          <div
            onClick={() => setFilter('deep-dive')}
            className={`bg-white rounded-lg p-6 text-center cursor-pointer transition ${
              filter === 'deep-dive' ? 'ring-2 ring-yellow-600' : 'hover:shadow-lg'
            }`}
          >
            <div className="text-4xl font-bold text-yellow-600">{stats.deepDive}</div>
            <div className="text-sm text-gray-600 mt-2">Deep Dive (65-74%)</div>
          </div>

          <div
            onClick={() => setFilter('pass')}
            className={`bg-white rounded-lg p-6 text-center cursor-pointer transition ${
              filter === 'pass' ? 'ring-2 ring-red-600' : 'hover:shadow-lg'
            }`}
          >
            <div className="text-4xl font-bold text-red-600">{stats.pass}</div>
            <div className="text-sm text-gray-600 mt-2">Pass (&lt;65%)</div>
          </div>
        </div>

        {/* Companies Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {filteredCompanies.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No companies yet</h3>
              <p className="text-gray-600 mb-6">Start evaluating companies to build your portfolio</p>
              <Link
                to="/evaluate"
                className="inline-block bg-brand-900 text-white px-6 py-3 rounded-lg hover:bg-brand-800 transition font-semibold"
              >
                Evaluate Your First Company
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Company
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                      Score
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                      Rating
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                      Decision
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredCompanies.map((company) => {
                    const score = company.success_score || 0;
                    const decisionClass = getDecisionColor(score);

                    return (
                      <tr key={company.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">{company.name}</div>
                          <div className="text-sm text-gray-500">{company.lead_investor}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {company.seed_date || company.created_at?.split('T')[0]}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`text-xl font-bold ${decisionClass}`}>
                            {score.toFixed(1)}%
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center text-lg">{company.rating}</td>
                        <td className="px-6 py-4 text-center">
                          {score >= 75 && (
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                              Invest
                            </span>
                          )}
                          {score >= 65 && score < 75 && (
                            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                              Deep Dive
                            </span>
                          )}
                          {score < 65 && (
                            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                              Pass
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <Link
                            to={`/results/${company.id}`}
                            className="text-brand-600 hover:text-brand-800 font-medium"
                          >
                            View →
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Summary Stats */}
        {companies.length > 0 && (
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="text-gray-600">Average Score</div>
                <div className="text-2xl font-bold text-gray-900">
                  {(
                    companies.reduce((sum, c) => sum + (c.success_score || 0), 0) / companies.length
                  ).toFixed(1)}
                  %
                </div>
              </div>
              <div>
                <div className="text-gray-600">Investment Rate</div>
                <div className="text-2xl font-bold text-gray-900">
                  {((stats.invest / stats.total) * 100).toFixed(0)}%
                </div>
              </div>
              <div>
                <div className="text-gray-600">Pass Rate</div>
                <div className="text-2xl font-bold text-gray-900">
                  {((stats.pass / stats.total) * 100).toFixed(0)}%
                </div>
              </div>
              <div>
                <div className="text-gray-600">Deep Dive Rate</div>
                <div className="text-2xl font-bold text-gray-900">
                  {((stats.deepDive / stats.total) * 100).toFixed(0)}%
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
