import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">BryanHanley.VC</h3>
            <p className="text-gray-400">Data-driven seed stage investment analysis</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Links</h4>
            <div className="space-y-2 text-gray-400">
              <div>
                <Link to="/methodology" className="hover:text-white transition">
                  Methodology
                </Link>
              </div>
              <div>
                <Link to="/portfolio" className="hover:text-white transition">
                  Portfolio
                </Link>
              </div>
              <div>
                <Link to="/about" className="hover:text-white transition">
                  About
                </Link>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="space-y-2 text-gray-400">
              <div>
                <a
                  href="https://www.linkedin.com/in/bryan-stanley-hanley/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  LinkedIn
                </a>
              </div>
              <div>
                <a href="mailto:bry.hanley2@gmail.com" className="hover:text-white transition">
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© 2025 Bryan Hanley. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
