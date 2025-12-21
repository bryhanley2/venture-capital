export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">About BryanHanley.VC</h1>
          
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">The Mission</h2>
              <p className="text-gray-700">
                Built by Bryan Hanley, to help aspiring and grounded VCs find the next wave of world-changing founders.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">The Approach</h2>
              <p className="text-gray-700">
                This platform brings quantitative rigor to seed-stage investing through a statistically-validated model.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">The Results</h2>
              <p className="text-gray-700">93% overall prediction accuracy. 100% accuracy on clear cases.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}