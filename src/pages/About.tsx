import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About This Platform</h1>
        
        {/* Mission/Introduction */}
        <div className="mb-8">
	  <h2 className="text-2xl font-bold text-gray-900 mb-3">The Mission</h2>
          <p className="text-gray-700 mb-4">
            Most seed-stage investors rely on gut instinct and founder charisma. This framework takes a different approach: quantifying the 11 factors that separate billion-dollar outcomes from failures, validated against 50 historical seed-stage companies.
          </p>
        </div>

        {/* The Approach */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">The Approach</h2>
          <p className="text-gray-700 mb-4">
            This platform applies data-driven rigor to seed-stage investing, validated by correctly identifying all 15 unicorns and all 8 failures in a 50-company historical analysis. The framework reveals the 11 factors that separate billion-dollar outcomes from inevitable shutdowns.
          </p>
        </div>

        {/* The Results */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">The Results</h2>
          <p className="text-gray-700 mb-4">
            Every evaluation strengthens the model. As outcomes emerge and patterns crystallize, the framework becomes increasingly precise at separating meaningful signals from market noise—creating a compounding advantage over time.
          </p>
          <p className="text-gray-700 mb-4">
            By analyzing patterns across successful and failed companies, the framework reveals which factors consistently predict unicorn outcomes. Understanding what drove Stripe, Airbnb, and Coinbase from seed to $10B+ enables earlier identification of tomorrow's breakthrough companies—before traditional metrics catch on.
          </p>
          <p className="text-gray-700">
            Framework validated across 50 historical seed-stage companies.
          </p>
        </div>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
