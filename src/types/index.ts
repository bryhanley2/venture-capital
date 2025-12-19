export interface CompanyScores {
  factor_1a: number; // Founder-Market Fit
  factor_1b: number; // Technical Execution
  factor_1c: number; // Founder Commitment
  factor_2a: number; // Early PMF
  factor_2b: number; // Revenue Signals
  factor_3a: number; // Market Size (TAM)
  factor_3b: number; // Timing & Competition
  factor_4: number;  // Traction - Quantitative
  factor_5: number;  // Traction - Qualitative
  factor_6: number;  // Capital Efficiency
  factor_7: number;  // Investor Signal
}

export interface CompanyNotes {
  notes_1a?: string;
  notes_1b?: string;
  notes_1c?: string;
  notes_2a?: string;
  notes_2b?: string;
  notes_3a?: string;
  notes_3b?: string;
  notes_4?: string;
  notes_5?: string;
  notes_6?: string;
  notes_7?: string;
}

export interface Company {
  id?: string;
  created_at?: string;
  
  // Company Info
  name: string;
  seed_date?: string;
  amount_raised?: string;
  lead_investor?: string;
  website?: string;
  
  // Scores
  factor_1a?: number;
  factor_1b?: number;
  factor_1c?: number;
  factor_2a?: number;
  factor_2b?: number;
  factor_3a?: number;
  factor_3b?: number;
  factor_4?: number;
  factor_5?: number;
  factor_6?: number;
  factor_7?: number;
  
  // Notes
  notes_1a?: string;
  notes_1b?: string;
  notes_1c?: string;
  notes_2a?: string;
  notes_2b?: string;
  notes_3a?: string;
  notes_3b?: string;
  notes_4?: string;
  notes_5?: string;
  notes_6?: string;
  notes_7?: string;
  
  // Results
  total_score?: number;
  success_score?: number;
  rating?: string;
  decision?: string;
  expected_outcome?: string;
  confidence?: string;
  
  // Outcome Tracking
  status?: string;
  actual_outcome?: string;
  outcome_date?: string;
  outcome_value?: string;
}

export interface ScoringResult {
  totalScore: string;
  successScore: string;
  rating: string;
  decision: string;
  expectedOutcome: string;
  confidence: string;
}

export interface FactorBreakdown {
  founderQuality: CategoryScore;
  productMarketFit: CategoryScore;
  marketTiming: CategoryScore;
  traction: CategoryScore;
  efficiency: CategoryScore;
  investor: CategoryScore;
}

export interface CategoryScore {
  score: number;
  weight: string;
  label: string;
}

export interface FactorInfo {
  id: string;
  label: string;
  weight: string;
  description: string;
  scoreGuide: { score: string; description: string }[];
}
