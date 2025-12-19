-- BryanHanley.VC Database Schema
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP DEFAULT NOW(),
  
  -- Company Information
  name TEXT NOT NULL,
  seed_date TEXT,
  amount_raised TEXT,
  lead_investor TEXT,
  website TEXT,
  
  -- Factor Scores (0-10 scale)
  factor_1a DECIMAL(3,1),  -- Founder-Market Fit
  factor_1b DECIMAL(3,1),  -- Technical Execution
  factor_1c DECIMAL(3,1),  -- Founder Commitment
  factor_2a DECIMAL(3,1),  -- Early Product-Market Fit
  factor_2b DECIMAL(3,1),  -- Revenue Signals
  factor_3a DECIMAL(3,1),  -- Market Size (TAM)
  factor_3b DECIMAL(3,1),  -- Timing & Competition
  factor_4 DECIMAL(3,1),   -- Traction - Quantitative
  factor_5 DECIMAL(3,1),   -- Traction - Qualitative
  factor_6 DECIMAL(3,1),   -- Capital Efficiency
  factor_7 DECIMAL(3,1),   -- Investor Signal
  
  -- Evidence/Notes for each factor
  notes_1a TEXT,
  notes_1b TEXT,
  notes_1c TEXT,
  notes_2a TEXT,
  notes_2b TEXT,
  notes_3a TEXT,
  notes_3b TEXT,
  notes_4 TEXT,
  notes_5 TEXT,
  notes_6 TEXT,
  notes_7 TEXT,
  
  -- Calculated Results
  total_score DECIMAL(5,2),     -- Weighted total (0-10)
  success_score DECIMAL(5,2),   -- Percentage (0-100)
  rating TEXT,                  -- Star rating (★ to ★★★★★)
  decision TEXT,                -- Investment decision
  expected_outcome TEXT,        -- Expected outcome description
  confidence TEXT,              -- Confidence level
  
  -- Outcome Tracking (for future use)
  status TEXT,                  -- Active, Exited, Failed
  actual_outcome TEXT,          -- Actual outcome description
  outcome_date TEXT,            -- Date of exit/failure
  outcome_value TEXT            -- Exit valuation
);

-- Create index on created_at for faster sorting
CREATE INDEX IF NOT EXISTS idx_companies_created_at ON companies(created_at DESC);

-- Create index on success_score for filtering
CREATE INDEX IF NOT EXISTS idx_companies_success_score ON companies(success_score DESC);
