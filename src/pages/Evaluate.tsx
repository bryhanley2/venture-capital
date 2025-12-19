import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Company, CompanyScores } from '../types';
import { FACTORS } from '../lib/factors';
import { calculateScore } from '../lib/scoring';
import { saveCompany } from '../lib/supabase';

export default function Evaluate() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);

  // Company info
  const [companyInfo, setCompanyInfo] = useState({
    name: '',
    seed_date: '',
    amount_raised: '',
    lead_investor: '',
    website: '',
  });

  // Scores and notes
  const [scores, setScores] = useState<CompanyScores>({
    factor_1a: 5,
    factor_1b: 5,
    factor_1c: 5,
    factor_2a: 5,
    factor_2b: 5,
    factor_3a: 5,
    factor_3b: 5,
    factor_4: 5,
    factor_5: 5,
    factor_6: 5,
    factor_7: 5,
  });

  const [notes, setNotes] = useState<{ [key: string]: string }>({});

  const currentFactor = FACTORS[step - 1];
  const isCompanyInfoStep = step === 0;
  const isLastFactor = step === FACTORS.length;

  const handleNext = () => {
    if (step < FACTORS.length) {
      setStep(step + 1);
    } else {
      handleSave();
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSave = async () => {
    setSaving(true);

    const result = calculateScore(scores);

    const company: Company = {
      ...companyInfo,
      ...scores,
      ...Object.fromEntries(Object.entries(notes).map(([k, v]) => [`notes_${k.replace('factor_', '')}`, v])),
      total_score: parseFloat(result.totalScore),
      success_score: parseFloat(result.successScore),
      rating: result.rating,
      decision: result.decision,
      expected_outcome: result.expectedOutcome,
      confidence: result.confidence,
      status: 'Active',
    };

    const { data, error } = await saveCompany(company);

    if (error) {
      console.error('Error saving company:', error);
      alert('Error saving company. Please try again.');
      setSaving(false);
      return;
    }

    if (data) {
      navigate(`/results/${data.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              {isCompanyInfoStep ? 'Company Information' : `Factor ${step}/${FACTORS.length}`}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round((step / (FACTORS.length + 1)) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-brand-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / (FACTORS.length + 1)) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Company Info Step */}
          {isCompanyInfoStep && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Company Information</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={companyInfo.name}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    placeholder="e.g., Airbnb"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Seed Round Date
                    </label>
                    <input
                      type="text"
                      value={companyInfo.seed_date}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, seed_date: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                      placeholder="MM/YYYY"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount Raised
                    </label>
                    <input
                      type="text"
                      value={companyInfo.amount_raised}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, amount_raised: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                      placeholder="$600K"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Lead Investor
                    </label>
                    <input
                      type="text"
                      value={companyInfo.lead_investor}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, lead_investor: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                      placeholder="e.g., Sequoia Capital"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website
                    </label>
                    <input
                      type="text"
                      value={companyInfo.website}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, website: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Factor Scoring Steps */}
          {!isCompanyInfoStep && currentFactor && (
            <div>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold text-gray-900">{currentFactor.label}</h2>
                  <span className="text-sm font-medium text-brand-600">{currentFactor.weight} weight</span>
                </div>
                <p className="text-gray-600">{currentFactor.description}</p>
              </div>

              {/* Score Slider */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-gray-700">Your Score (0-10)</label>
                  <span className="text-3xl font-bold text-brand-900">
                    {scores[currentFactor.id as keyof CompanyScores]}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.5"
                  value={scores[currentFactor.id as keyof CompanyScores]}
                  onChange={(e) =>
                    setScores({ ...scores, [currentFactor.id]: parseFloat(e.target.value) })
                  }
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0 (Worst)</span>
                  <span>5 (Average)</span>
                  <span>10 (Best)</span>
                </div>
              </div>

              {/* Scoring Guide */}
              <div className="mb-6 bg-brand-50 border border-brand-200 rounded-lg p-4">
                <h4 className="font-semibold text-sm text-gray-900 mb-3">Scoring Guide:</h4>
                <div className="space-y-2 text-sm">
                  {currentFactor.scoreGuide.map((guide, idx) => (
                    <div key={idx} className="flex">
                      <span className="font-medium text-brand-900 w-16 flex-shrink-0">
                        {guide.score}:
                      </span>
                      <span className="text-gray-700">{guide.description}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Evidence / Notes
                </label>
                <textarea
                  value={notes[currentFactor.id] || ''}
                  onChange={(e) => setNotes({ ...notes, [currentFactor.id]: e.target.value })}
                  placeholder="Why did you give this score? What's the evidence?"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  rows={4}
                ></textarea>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-8 flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={step === 0}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              ← Previous
            </button>

            <button
              onClick={handleNext}
              disabled={saving || (isCompanyInfoStep && !companyInfo.name)}
              className="px-6 py-3 bg-brand-900 text-white rounded-lg hover:bg-brand-800 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
            >
              {saving ? 'Saving...' : isLastFactor ? 'Calculate Results' : 'Next →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
