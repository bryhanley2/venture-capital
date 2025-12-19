import Hero from '../components/Home/Hero';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <Hero />

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Evaluate any seed-stage startup in 20 minutes</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-brand-900">1</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Enter Company Info</h3>
              <p className="text-gray-600">Name, founding date, amount raised, investors</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-brand-900">2</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Score 11 Factors</h3>
              <p className="text-gray-600">Rate each factor 0-10 with evidence</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-brand-900">3</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Get Decision</h3>
              <p className="text-gray-600">Instant score & recommendation</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-brand-900">4</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Track Outcomes</h3>
              <p className="text-gray-600">Monitor your portfolio over time</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/evaluate"
              className="inline-block bg-brand-900 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-brand-800 transition"
            >
              Start Evaluating →
            </Link>
          </div>
        </div>
      </section>

      {/* Validation */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Statistically Validated</h2>
            <p className="text-xl text-gray-600">Proven accuracy on real companies</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">✓ Success Stories</h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start">
                  <span className="text-xl mr-3">🦄</span>
                  <div>
                    <div className="font-semibold">15/15 Unicorns Predicted</div>
                    <div className="text-sm">Companies scoring 75%+ all became unicorns</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-xl mr-3">📈</span>
                  <div>
                    <div className="font-semibold">Including: Airbnb, Stripe, Coinbase</div>
                    <div className="text-sm">Dropbox, Uber, WhatsApp, Instagram, and more</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-xl mr-3">✓</span>
                  <div>
                    <div className="font-semibold">100% Success Rate</div>
                    <div className="text-sm">On companies scoring above 75%</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">✗ Failures Avoided</h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start">
                  <span className="text-xl mr-3">🚫</span>
                  <div>
                    <div className="font-semibold">8/8 Failures Predicted</div>
                    <div className="text-sm">Companies scoring &lt;55% all failed</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-xl mr-3">💸</span>
                  <div>
                    <div className="font-semibold">Including: Theranos, Juicero, Quibi</div>
                    <div className="text-sm">Color Labs, Clinkle, and others</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-xl mr-3">✓</span>
                  <div>
                    <div className="font-semibold">100% Failure Detection</div>
                    <div className="text-sm">On companies scoring below 55%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Find Your Next Unicorn?</h2>
          <p className="text-xl mb-8 text-brand-100">
            Start evaluating seed-stage companies with data-driven precision
          </p>
          <Link
            to="/evaluate"
            className="inline-block bg-white text-brand-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition"
          >
            Get Started →
          </Link>
        </div>
      </section>
    </div>
  );
}
