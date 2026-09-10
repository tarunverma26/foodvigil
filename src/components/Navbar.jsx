import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Camera, 
  SearchCheck, 
  AlertOctagon, 
  Eye, 
  FileWarning, 
  FolderLock, 
  LayoutDashboard, 
  Menu, 
  X,
  Sparkles,
  Info,
  CloudRain,
  Zap,
  Wallet,
  Coins
} from 'lucide-react';
import WalletConnectModal from './WalletConnectModal';
import { algorandWalletService } from '../services/algorandWallet';

export default function Navbar({ isRainActive, setIsRainActive, isLowPower, setIsLowPower }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [currentWallet, setCurrentWallet] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentWallet(algorandWalletService.getConnectedWallet());
  }, []);

  const navLinks = [
    { path: '/scan', label: 'Scan Food', icon: Camera },
    { path: '/verify', label: 'Verify Business', icon: SearchCheck },
    { path: '/alerts', label: 'Safety Alerts', icon: AlertOctagon },
    { path: '/spot-the-risk', label: 'Spot the Risk', icon: Eye },
    { path: '/report', label: 'Report Issue', icon: FileWarning },
    { path: '/evidence', label: 'Evidence Vault', icon: FolderLock },
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  ];

  const isActive = (path) => {
    if (path === '/scan' && location.pathname.startsWith('/scan')) return true;
    return location.pathname === path;
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/94 backdrop-blur-xl border-b border-slate-200/90 shadow-soft-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            
            {/* Logo & Brand */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-xl bg-forest-900 flex items-center justify-center text-white shadow-soft-sm group-hover:bg-forest-800 transition-colors">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-extrabold text-xl tracking-tight text-forest-900">
                    Food<span className="text-emerald-600">Vigil</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    India
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium leading-none mt-0.5">
                  See Beyond the Label.
                </p>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                      active
                        ? 'bg-forest-50 text-forest-900 font-bold border border-emerald-300 shadow-soft-sm'
                        : 'text-slate-600 hover:text-forest-900 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${active ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Controls */}
            <div className="hidden sm:flex items-center space-x-2.5">
              
              {/* CONNECT WALLET BUTTON (Pera / Defly / Algorand TestNet) */}
              <button
                onClick={() => setWalletModalOpen(true)}
                className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                  currentWallet
                    ? 'bg-emerald-50 border-emerald-300 text-forest-900 shadow-sm'
                    : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-amber-600 shadow-md hover:brightness-105'
                }`}
                title={currentWallet ? `Connected: ${currentWallet.address}` : 'Connect Algorand Wallet'}
              >
                <Wallet className="w-3.5 h-3.5" />
                <span>
                  {currentWallet 
                    ? `${currentWallet.balanceUSDC} USDC` 
                    : 'Connect Wallet'}
                </span>
              </button>

              {/* Ambient Rain Toggle */}
              {setIsRainActive && (
                <button
                  onClick={() => setIsRainActive(!isRainActive)}
                  className={`p-2 rounded-xl border transition-all ${
                    isRainActive
                      ? 'bg-cyan-50 border-cyan-300 text-cyan-700 shadow-sm'
                      : 'bg-slate-100 border-slate-200 text-slate-400 hover:text-slate-600'
                  }`}
                  title={isRainActive ? 'Rain Effect: Active' : 'Rain Effect: Paused'}
                >
                  <CloudRain className="w-4 h-4" />
                </button>
              )}

              {/* Eco Motion Toggle */}
              {setIsLowPower && (
                <button
                  onClick={() => setIsLowPower(!isLowPower)}
                  className={`p-2 rounded-xl border transition-all ${
                    isLowPower
                      ? 'bg-amber-50 border-amber-300 text-amber-700'
                      : 'bg-slate-100 border-slate-200 text-slate-400 hover:text-slate-600'
                  }`}
                  title={isLowPower ? 'Parallax: Low Motion Mode' : 'Parallax: 3D High Quality'}
                >
                  <Zap className="w-4 h-4" />
                </button>
              )}

              <Link
                to="/scan"
                className="btn-forest text-xs py-2 px-4 shadow-sm font-bold"
              >
                <Camera className="w-4 h-4 text-emerald-300" />
                <span>Scan Food</span>
              </Link>
            </div>

            {/* Mobile Hamburger Menu Toggle */}
            <div className="flex items-center space-x-2 lg:hidden">
              <button
                onClick={() => setWalletModalOpen(true)}
                className="p-2 rounded-xl bg-amber-500 text-white"
                title="Connect Wallet"
              >
                <Wallet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-2 shadow-soft-lg animate-fadeIn">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between p-3 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? 'bg-forest-50 text-forest-900 font-bold border border-emerald-200'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 ${active ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {active && <span className="w-2 h-2 rounded-full bg-emerald-600" />}
                </Link>
              );
            })}

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => { setMobileMenuOpen(false); setWalletModalOpen(true); }}
                className="text-xs font-bold text-amber-700 flex items-center gap-1"
              >
                <Wallet className="w-3.5 h-3.5" />
                <span>{currentWallet ? `${currentWallet.balanceUSDC} USDC` : 'Connect Algorand Wallet'}</span>
              </button>
              <Link
                to="/scan"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-forest text-xs py-1.5 px-3"
              >
                Scan Food
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Wallet Connect Modal */}
      <WalletConnectModal
        isOpen={walletModalOpen}
        onClose={() => setWalletModalOpen(false)}
        currentWallet={currentWallet}
        onWalletConnected={(w) => setCurrentWallet(w)}
      />
    </>
  );
}
