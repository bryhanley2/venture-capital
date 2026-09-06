import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import ProtectedRoute from './components/Layout/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Dealflow from './pages/Dealflow';
import SecondLayerMap from './pages/SecondLayerMap';
import About from './pages/About';

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
            <Route
              path="/dealflow"
              element={
                <ProtectedRoute>
                  <Dealflow />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
