import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NightMarketParallax from './components/NightMarketParallax';
import Home from './pages/Home';
import Scan from './pages/Scan';
import ScanResult from './pages/ScanResult';
import Verify from './pages/Verify';
import Alerts from './pages/Alerts';
import SpotTheRisk from './pages/SpotTheRisk';
import ReportIssue from './pages/ReportIssue';
import MyReports from './pages/MyReports';
import EvidenceVault from './pages/EvidenceVault';
import Dashboard from './pages/Dashboard';
import About from './pages/About';

function ScrollToTop() {
  const { pathname } = React.useMemo(() => window.location, []);
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [isRainActive, setIsRainActive] = useState(true);
  const [isLowPower, setIsLowPower] = useState(false);

  return (
    <Router>
      <div className="relative min-h-screen flex flex-col bg-[#050811] text-slate-900 font-sans selection:bg-emerald-500 selection:text-white">
        <ScrollToTop />

        {/* Layered 5-Depth 3D Night-Market Parallax Scene */}
        <NightMarketParallax 
          isRainActive={isRainActive} 
          isLowPower={isLowPower} 
        />

        {/* Sticky Header with Ambient Toggles */}
        <Navbar 
          isRainActive={isRainActive}
          setIsRainActive={setIsRainActive}
          isLowPower={isLowPower}
          setIsLowPower={setIsLowPower}
        />

        {/* Dynamic Main Content Container */}
        <main className="relative z-10 flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/scan" element={<Scan />} />
            <Route path="/scan/result" element={<ScanResult />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/spot-the-risk" element={<SpotTheRisk />} />
            <Route path="/report" element={<ReportIssue />} />
            <Route path="/my-reports" element={<MyReports />} />
            <Route path="/evidence" element={<EvidenceVault />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer />
      </div>
    </Router>
  );
}
