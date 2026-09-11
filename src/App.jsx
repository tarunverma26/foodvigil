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
  return (
    <Router>
      <div className="relative min-h-screen flex flex-col bg-[#FFF9EF] text-[#19352A] font-sans selection:bg-[#246B4A] selection:text-white">
        <ScrollToTop />

        {/* Subtle Warm Food Safety Background Motif */}
        <NightMarketParallax />

        {/* Sticky Header with FOOD VIGIL Branding, Single Scan Tab & Working Login */}
        <Navbar />

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
