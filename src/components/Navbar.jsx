import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  Wallet,
  User,
  LogOut,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import WalletConnectModal from './WalletConnectModal';
import LoginModal from './LoginModal';
import { algorandWalletService } from '../services/algorandWallet';
import { authService } from '../services/authService';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [currentWallet, setCurrentWallet] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const location = useLocation();

  useEffect(() => {
    setCurrentWallet(algorandWalletService.getConnectedWallet());
    setCurrentUser(authService.getCurrentUser());

    const unsubscribe = authService.subscribe((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  // ONLY ONE "Scan Food" tab is in this list
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

  const handleLogout = () => {
    authService.logout();
    setUserDropdownOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#FFF9EF]/95 backdrop-blur-md border-b border-[#E8DCB8] shadow-sm">
        <div className="max-w-[1600px] w-full mx-auto px-3 sm:px-5 lg:px-6 xl:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18 gap-2 lg:gap-4">
            
            {/* FOOD VIGIL Branding */}
            <Link to="/" className="flex items-center space-x-2.5 sm:space-x-3 group flex-shrink-0">
              <div className="w-10 h-10 rounded-xl bg-[#1F5D42] border border-[#246B4A] flex items-center justify-center text-white shadow-sm group-hover:bg-[#19352A] transition-colors flex-shrink-0">
                <ShieldCheck className="w-6 h-6 text-[#E68A35]" />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-[#1F5D42]">
                    FOOD <span className="text-[#E68A35]">VIGIL</span>
                  </span>
                  <span className="inline-flex items-center justify-center text-[9px] uppercase font-extrabold tracking-wider px-1.5 py-0.5 rounded bg-[#EAF5EE] text-[#1F5D42] border border-[#BCE2CB] leading-none">
                    India
                  </span>
                </div>
                <p className="text-[10px] text-[#64776B] font-semibold tracking-tight leading-tight mt-1">
                  See Beyond the Label.
                </p>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center space-x-1 2xl:space-x-1.5 flex-shrink">
              {navLinks.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative flex items-center space-x-1.5 px-2.5 2xl:px-3 py-1.5 2xl:py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                      active
                        ? 'bg-[#EAF5EE] text-[#1F5D42] font-bold border border-[#BCE2CB] shadow-soft-sm'
                        : 'text-[#19352A] hover:text-[#1F5D42] hover:bg-[#FAF0DE]'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${active ? 'text-[#1F5D42]' : 'text-[#64776B]'}`} />
                    <span>{item.label}</span>
                    {active && (
                      <span className="absolute bottom-1 right-2 w-1.5 h-1.5 rounded-full bg-[#E68A35]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Controls: Wallet & Working Login (Desktop) */}
            <div className="hidden xl:flex items-center space-x-2 2xl:space-x-2.5 flex-shrink-0">
              
              {/* CONNECT WALLET (x402 Micropayments) */}
              <button
                onClick={() => setWalletModalOpen(true)}
                className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all border whitespace-nowrap ${
                  currentWallet
                    ? 'bg-[#EAF5EE] border-[#BCE2CB] text-[#1F5D42] shadow-sm'
                    : 'bg-white hover:bg-[#FAF0DE] text-[#E68A35] border-[#E8DCB8] shadow-sm hover:border-[#E68A35]'
                }`}
                title={currentWallet ? `Connected: ${currentWallet.address}` : 'Connect Algorand Wallet for x402 AI'}
              >
                <Wallet className="w-3.5 h-3.5 text-[#E68A35] flex-shrink-0" />
                <span>
                  {currentWallet 
                    ? `${currentWallet.balanceUSDC} USDC` 
                    : 'Connect Wallet'}
                </span>
              </button>

              {/* USER AUTHENTICATION / LOGIN OPTION */}
              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center space-x-2 px-3 py-1.5 bg-white hover:bg-[#FAF0DE] border border-[#E8DCB8] rounded-xl text-xs font-bold text-[#1F5D42] shadow-sm transition-all whitespace-nowrap"
                  >
                    <span className="text-base">{currentUser.avatar || '👨‍🔬'}</span>
                    <span className="max-w-[100px] 2xl:max-w-[120px] truncate">{currentUser.name.split(' ')[0]}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-[#64776B] flex-shrink-0" />
                  </button>

                  {/* User Profile Dropdown Menu */}
                  {userDropdownOpen && (
                    <div 
                      className="absolute right-0 mt-2 w-64 bg-white border border-[#E8DCB8] rounded-2xl shadow-xl p-3 space-y-2 z-50 animate-fadeIn"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="p-2.5 bg-[#FFF9EF] rounded-xl border border-[#E8DCB8] space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-[#1F5D42]">{currentUser.name}</span>
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#EAF5EE] text-[#1F5D42] border border-[#BCE2CB]">
                            {currentUser.badge || 'Member'}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#64776B]">{currentUser.role}</p>
                        <p className="text-[10px] text-[#64776B]/80 font-mono truncate">{currentUser.email}</p>
                      </div>

                      <div className="pt-1 space-y-1 text-xs font-semibold">
                        <Link
                          to="/dashboard"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center space-x-2 p-2 hover:bg-[#FFF9EF] rounded-lg text-[#19352A]"
                        >
                          <LayoutDashboard className="w-3.5 h-3.5 text-[#246B4A]" />
                          <span>My Safety Dashboard</span>
                        </Link>
                        <Link
                          to="/my-reports"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center space-x-2 p-2 hover:bg-[#FFF9EF] rounded-lg text-[#19352A]"
                        >
                          <FileWarning className="w-3.5 h-3.5 text-[#E68A35]" />
                          <span>Grievance Dossiers</span>
                        </Link>
                      </div>

                      <div className="pt-2 border-t border-[#E8DCB8]">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-2 p-2 hover:bg-[#FDF1F0] rounded-lg text-xs font-bold text-[#D9534F] transition-colors"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setLoginModalOpen(true)}
                  className="btn-forest text-xs py-2 px-4 shadow-sm font-bold whitespace-nowrap flex-shrink-0 flex items-center space-x-1.5"
                >
                  <User className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>Sign In</span>
                </button>
              )}

            </div>

            {/* Mobile & Tablet Action Controls (< xl: 1280px) */}
            <div className="flex items-center space-x-2 xl:hidden flex-shrink-0">
              <button
                onClick={() => setWalletModalOpen(true)}
                className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-white border border-[#E8DCB8] text-[#E68A35] text-xs font-bold shadow-sm"
                title="Connect Wallet"
              >
                <Wallet className="w-4 h-4 flex-shrink-0" />
                <span className="hidden sm:inline">{currentWallet ? `${currentWallet.balanceUSDC} USDC` : 'Wallet'}</span>
              </button>

              {currentUser ? (
                <button
                  onClick={() => setLoginModalOpen(true)}
                  className="flex items-center space-x-1.5 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-white border border-[#E8DCB8] text-xs font-bold text-[#1F5D42] shadow-sm"
                >
                  <span className="text-sm">{currentUser.avatar || '👨‍🔬'}</span>
                  <span className="hidden sm:inline max-w-[80px] truncate">{currentUser.name.split(' ')[0]}</span>
                </button>
              ) : (
                <button
                  onClick={() => setLoginModalOpen(true)}
                  className="btn-forest text-xs py-1.5 px-3 shadow-sm font-bold flex items-center space-x-1.5"
                  title="Sign In"
                >
                  <User className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="inline">Sign In</span>
                </button>
              )}

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-white border border-[#E8DCB8] text-[#19352A] hover:bg-[#FAF0DE] shadow-sm flex items-center justify-center"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-[#E8DCB8] px-4 py-4 space-y-2 shadow-xl animate-fadeIn">
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
                      ? 'bg-[#EAF5EE] text-[#1F5D42] font-bold border border-[#BCE2CB]'
                      : 'text-[#19352A] hover:bg-[#FFF9EF]'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 ${active ? 'text-[#1F5D42]' : 'text-[#64776B]'}`} />
                    <span>{item.label}</span>
                  </div>
                  {active && <span className="w-2 h-2 rounded-full bg-[#E68A35]" />}
                </Link>
              );
            })}

            <div className="pt-3 border-t border-[#E8DCB8] flex items-center justify-between">
              <button
                onClick={() => { setMobileMenuOpen(false); setWalletModalOpen(true); }}
                className="text-xs font-bold text-[#E68A35] flex items-center gap-1"
              >
                <Wallet className="w-3.5 h-3.5" />
                <span>{currentWallet ? `${currentWallet.balanceUSDC} USDC` : 'Connect Wallet'}</span>
              </button>

              {currentUser ? (
                <button
                  onClick={() => { setMobileMenuOpen(false); handleLogout(); }}
                  className="text-xs font-bold text-[#D9534F] flex items-center gap-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              ) : (
                <button
                  onClick={() => { setMobileMenuOpen(false); setLoginModalOpen(true); }}
                  className="btn-forest text-xs py-1.5 px-3"
                >
                  Sign In
                </button>
              )}
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

      {/* User Login Modal */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
        }}
      />
    </>
  );
}
