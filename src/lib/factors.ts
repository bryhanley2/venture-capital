import { FactorInfo } from '../types';

export const FACTORS: FactorInfo[] = [
  {
    id: 'factor_1a',
    label: '1A. Founder-Market Fit',
    weight: '10%',
    description: 'Does the founder have relevant domain expertise and experience?',
    scoreGuide: [
      { score: '9-10', description: 'Prior exit + deep domain expertise' },
      { score: '7-8', description: 'Strong background, 2-5 years relevant experience' },
      { score: '5-6', description: 'Some relevant experience, adjacent domain' },
      { score: '3-4', description: 'Limited experience, young founder learning' },
      { score: '0-2', description: 'No relevant experience' },
    ],
  },
  {
    id: 'factor_1b',
    label: '1B. Technical Execution',
    weight: '8%',
    description: 'Can the team actually build the product?',
    scoreGuide: [
      { score: '9-10', description: 'Strong technical team, working product, proven builders' },
      { score: '7-8', description: 'Competent technical execution, solid prototype' },
      { score: '5-6', description: 'Basic technical capability, early MVP' },
      { score: '3-4', description: 'Weak technical skills, struggling to build' },
      { score: '0-2', description: 'Cannot build product, vaporware' },
    ],
  },
  {
    id: 'factor_1c',
    label: '1C. Founder Commitment',
    weight: '7%',
    description: 'Are founders all-in? Have they made personal sacrifices?',
    scoreGuide: [
      { score: '9-10', description: 'Quit jobs, full-time, invested savings, burned bridges' },
      { score: '7-8', description: 'Full-time, committed, but some safety net' },
      { score: '5-6', description: 'Part-time or recent commitment' },
      { score: '3-4', description: 'Side project mentality, minimal sacrifice' },
      { score: '0-2', description: 'Not committed, keeping day job' },
    ],
  },
  {
    id: 'factor_2a',
    label: '2A. Early Product-Market Fit',
    weight: '12%',
    description: 'Evidence of users wanting/using the product?',
    scoreGuide: [
      { score: '9-10', description: 'Users obsessed, organic growth, strong retention' },
      { score: '7-8', description: 'Good engagement, users coming back consistently' },
      { score: '5-6', description: 'Some users engaged, moderate retention' },
      { score: '3-4', description: 'Low engagement, poor retention' },
      { score: '0-2', description: 'No users or product not launched' },
    ],
  },
  {
    id: 'factor_2b',
    label: '2B. Revenue Signals',
    weight: '8%',
    description: 'Any revenue or monetization proof points?',
    scoreGuide: [
      { score: '9-10', description: 'Strong revenue, proven unit economics' },
      { score: '7-8', description: 'Some revenue, clear path to monetization' },
      { score: '5-6', description: 'Early revenue or paying pilots' },
      { score: '3-4', description: 'Minimal revenue, unclear monetization' },
      { score: '0-2', description: '$0 revenue (note: acceptable for some models)' },
    ],
  },
  {
    id: 'factor_3a',
    label: '3A. Market Size (TAM)',
    weight: '12%',
    description: 'Is the addressable market large enough for a unicorn?',
    scoreGuide: [
      { score: '9-10', description: '$50B+ TAM, massive market opportunity' },
      { score: '7-8', description: '$10-50B TAM, large market' },
      { score: '5-6', description: '$1-10B TAM, medium market' },
      { score: '3-4', description: '$100M-$1B TAM, small market' },
      { score: '0-2', description: '<$100M TAM, too small for venture returns' },
    ],
  },
  {
    id: 'factor_3b',
    label: '3B. Timing & Competition',
    weight: '8%',
    description: 'Is now the right time? What about competition?',
    scoreGuide: [
      { score: '9-10', description: 'Perfect timing, greenfield, technology enabler ready' },
      { score: '7-8', description: 'Good timing, beatable competition' },
      { score: '5-6', description: 'Okay timing, crowded but differentiated' },
      { score: '3-4', description: 'Poor timing, too early or too late' },
      { score: '0-2', description: 'Terrible timing, entrenched competition' },
    ],
  },
  {
    id: 'factor_4',
    label: '4. Traction - Quantitative',
    weight: '7%',
    description: 'Growth metrics: users, revenue, engagement',
    scoreGuide: [
      { score: '9-10', description: 'Explosive growth (>20% weekly), going viral' },
      { score: '7-8', description: 'Strong growth (10-20% weekly)' },
      { score: '5-6', description: 'Steady growth (5-10% weekly)' },
      { score: '3-4', description: 'Slow growth (<5% weekly)' },
      { score: '0-2', description: 'No growth or declining' },
    ],
  },
  {
    id: 'factor_5',
    label: '5. Traction - Qualitative',
    weight: '8%',
    description: 'How do users feel about the product?',
    scoreGuide: [
      { score: '9-10', description: 'Users LOVE it, would be devastated if it went away' },
      { score: '7-8', description: 'Users really like it, strong NPS' },
      { score: '5-6', description: 'Users find it useful, decent feedback' },
      { score: '3-4', description: 'Mixed feedback, some churn' },
      { score: '0-2', description: 'Users don\'t care, high churn' },
    ],
  },
  {
    id: 'factor_6',
    label: '6. Capital Efficiency',
    weight: '10%',
    description: 'How much has been accomplished with how little capital?',
    scoreGuide: [
      { score: '9-10', description: 'Built on <$100K, extremely lean' },
      { score: '7-8', description: 'Efficient, good progress on reasonable budget' },
      { score: '5-6', description: 'Average efficiency for stage' },
      { score: '3-4', description: 'Capital intensive, burning fast' },
      { score: '0-2', description: 'Massive burn, very inefficient' },
    ],
  },
  {
    id: 'factor_7',
    label: '7. Investor Signal',
    weight: '10%',
    description: 'Quality of existing investors and interest from top VCs',
    scoreGuide: [
      { score: '9-10', description: 'Top-tier lead (Sequoia, a16z, Benchmark)' },
      { score: '7-8', description: 'Solid tier-1 or tier-2 lead' },
      { score: '5-6', description: 'Reputable angels or smaller funds' },
      { score: '3-4', description: 'Unknown investors' },
      { score: '0-2', description: 'Red flag investors or none' },
    ],
  },
];

export function getFactorById(id: string): FactorInfo | undefined {
  return FACTORS.find((f) => f.id === id);
}
