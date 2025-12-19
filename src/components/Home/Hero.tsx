import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-brand-900 to-brand-600 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6">
            Evaluate Seed Stage Startups
            <br />
            with Data-Driven Precision
          </h1>
          <p className="text-xl mb-8 text-brand-100">
            A statistically-validated model that predicts unicorns with 93% accuracy
          </p>
          <Link
            to="/evaluate"
            className="inline-block bg-white text-brand-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition"
          >
            Start Evaluation →
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
            <div className="text-4xl font-bold mb-2">93%</div>
            <div className="text-brand-100">Prediction Accuracy</div>
            <div className="text-sm text-brand-200 mt-2">On clear investment decisions</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
            <div className="text-4xl font-bold mb-2">50+</div>
            <div className="text-brand-100">Companies Validated</div>
            <div className="text-sm text-brand-200 mt-2">Including Airbnb, Stripe, Coinbase</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
            <div className="text-4xl font-bold mb-2">11</div>
            <div className="text-brand-100">Weighted Factors</div>
            <div className="text-sm text-brand-200 mt-2">From founder to market timing</div>
          </div>
        </div>
      </div>
    </section>
  );
}
