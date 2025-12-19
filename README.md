# BryanHanley.VC - Seed Stage Investment Analysis Platform

A data-driven platform for evaluating seed-stage startups with 93% prediction accuracy.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment Variables
Create `.env.local`:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_SITE_PASSWORD=YourSecurePassword123
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

## 📊 Features

- ✅ 11-factor weighted scoring model (Bryan's exact weights)
- ✅ 93% prediction accuracy (validated on 50 companies)
- ✅ Password-protected access
- ✅ Portfolio tracking
- ✅ Mobile responsive
- ✅ Export capabilities

## 🗄️ Database Setup

Run this SQL in your Supabase project:

```sql
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP DEFAULT NOW(),
  
  -- Company Info
  name TEXT NOT NULL,
  seed_date TEXT,
  amount_raised TEXT,
  lead_investor TEXT,
  website TEXT,
  
  -- Scoring (11 factors, 0-10)
  factor_1a DECIMAL(3,1),
  factor_1b DECIMAL(3,1),
  factor_1c DECIMAL(3,1),
  factor_2a DECIMAL(3,1),
  factor_2b DECIMAL(3,1),
  factor_3a DECIMAL(3,1),
  factor_3b DECIMAL(3,1),
  factor_4 DECIMAL(3,1),
  factor_5 DECIMAL(3,1),
  factor_6 DECIMAL(3,1),
  factor_7 DECIMAL(3,1),
  
  -- Notes
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
  
  -- Results
  total_score DECIMAL(5,2),
  success_score DECIMAL(5,2),
  rating TEXT,
  decision TEXT,
  expected_outcome TEXT,
  confidence TEXT,
  
  -- Outcome Tracking
  status TEXT,
  actual_outcome TEXT,
  outcome_date TEXT,
  outcome_value TEXT
);
```

## 🔐 Default Login

Password: `BryanVC2025` (change in .env.local)

## 📦 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Cost
- Domain: $12/year
- Hosting: FREE (Vercel)
- Database: FREE (Supabase)

## 📄 License

© 2025 Bryan Hanley. All rights reserved.
