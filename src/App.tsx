import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Dealflow from './pages/Dealflow';
import RequestAccess from './pages/RequestAccess';
import SecondLayerMap from './pages/SecondLayerMap';
import About from './pages/About';
import { isAuthenticated } from './lib/supabase';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/map" element={<SecondLayerMap />} />
            <Route path="/about" element={<About />} />
            {/* Not a redirect: unauthenticated visitors get the request-access page. */}
            <Route path="/dealflow" element={isAuthenticated() ? <Dealflow /> : <RequestAccess />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
