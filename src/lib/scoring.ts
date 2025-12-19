import { CompanyScores, ScoringResult, FactorBreakdown } from '../types';

// BRYAN'S EXACT WEIGHTS - DO NOT MODIFY
const WEIGHTS = {
  factor_1a: 0.10, // Founder-Market Fit
  factor_1b: 0.08, // Technical Execution
  factor_1c: 0.07, // Founder Commitment
  factor_2a: 0.12, // Early PMF
  factor_2b: 0.08, // Revenue Signals
  factor_3a: 0.12, // Market Size
  factor_3b: 0.08, // Timing & Competition
  factor_4: 0.07,  // Traction Quant
  factor_5: 0.08,  // Traction Qual
  factor_6: 0.10,  // Capital Efficiency
  factor_7: 0.10,  // Investor Signal
};

export function calculateScore(scores: CompanyScores): ScoringResult {
  // Calculate weighted total (0-10 scale)
  const totalScore =
    scores.factor_1a * WEIGHTS.factor_1a +
    scores.factor_1b * WEIGHTS.factor_1b +
    scores.factor_1c * WEIGHTS.factor_1c +
    scores.factor_2a * WEIGHTS.factor_2a +
    scores.factor_2b * WEIGHTS.factor_2b +
    scores.factor_3a * WEIGHTS.factor_3a +
    scores.factor_3b * WEIGHTS.factor_3b +
    scores.factor_4 * WEIGHTS.factor_4 +
    scores.factor_5 * WEIGHTS.factor_5 +
    scores.factor_6 * WEIGHTS.factor_6 +
    scores.factor_7 * WEIGHTS.factor_7;

  // Convert to percentage (0-100%)
  const successScore = totalScore * 10;

  // Determine rating
  let rating = '';
  if (successScore >= 85) rating = '★★★★★';
  else if (successScore >= 75) rating = '★★★★';
  else if (successScore >= 65) rating = '★★★';
  else if (successScore >= 55) rating = '★★';
  else rating = '★';

  // Determine decision and expected outcome
  let decision = '';
  let expectedOutcome = '';
  let confidence = '';

  if (successScore >= 85) {
    decision = 'STRONG YES - Invest Immediately';
    expectedOutcome = 'Decacorn ($25B+)';
    confidence = 'VERY HIGH';
  } else if (successScore >= 75) {
    decision = 'YES - Standard Investment';
    expectedOutcome = 'Unicorn ($1B+)';
    confidence = 'VERY HIGH (100% validation)';
  } else if (successScore >= 65) {
    decision = 'DEEP DIVE - Conditional Yes';
    expectedOutcome = 'Potential Unicorn (82% success rate)';
    confidence = 'MEDIUM';
  } else if (successScore >= 55) {
    decision = 'PROBABLY PASS';
    expectedOutcome = 'Likely Fails (70% failure rate)';
    confidence = 'HIGH';
  } else {
    decision = 'HARD PASS';
    expectedOutcome = 'Always Fails (100% failure rate)';
    confidence = 'VERY HIGH';
  }

  return {
    totalScore: totalScore.toFixed(2),
    successScore: successScore.toFixed(1),
    rating,
    decision,
    expectedOutcome,
    confidence,
  };
}

export function getFactorBreakdown(scores: CompanyScores): FactorBreakdown {
  return {
    founderQuality: {
      score:
        ((scores.factor_1a * WEIGHTS.factor_1a +
          scores.factor_1b * WEIGHTS.factor_1b +
          scores.factor_1c * WEIGHTS.factor_1c) *
          10) /
        0.25,
      weight: '25%',
      label: 'Founder Quality',
    },
    productMarketFit: {
      score:
        ((scores.factor_2a * WEIGHTS.factor_2a + scores.factor_2b * WEIGHTS.factor_2b) * 10) /
        0.2,
      weight: '20%',
      label: 'Product-Market Fit',
    },
    marketTiming: {
      score:
        ((scores.factor_3a * WEIGHTS.factor_3a + scores.factor_3b * WEIGHTS.factor_3b) * 10) /
        0.2,
      weight: '20%',
      label: 'Market Size & Timing',
    },
    traction: {
      score: ((scores.factor_4 * WEIGHTS.factor_4 + scores.factor_5 * WEIGHTS.factor_5) * 10) / 0.15,
      weight: '15%',
      label: 'Traction',
    },
    efficiency: {
      score: (scores.factor_6 * WEIGHTS.factor_6 * 10) / 0.1,
      weight: '10%',
      label: 'Capital Efficiency',
    },
    investor: {
      score: (scores.factor_7 * WEIGHTS.factor_7 * 10) / 0.1,
      weight: '10%',
      label: 'Investor Signal',
    },
  };
}

export function getDecisionColor(successScore: number): string {
  if (successScore >= 75) return 'text-green-600';
  if (successScore >= 65) return 'text-yellow-600';
  return 'text-red-600';
}

export function getDecisionBgColor(successScore: number): string {
  if (successScore >= 75) return 'bg-green-50 border-green-500';
  if (successScore >= 65) return 'bg-yellow-50 border-yellow-500';
  return 'bg-red-50 border-red-500';
}

export function getBarColor(score: number): string {
  if (score >= 80) return 'bg-green-500';
  if (score >= 60) return 'bg-yellow-500';
  return 'bg-red-500';
}
