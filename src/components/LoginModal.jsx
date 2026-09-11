import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Building2,
  FileText,
  Eye,
  EyeOff
} from 'lucide-react';
import { authService, DEMO_PROFILES } from '../services/authService';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [activeTab, setActiveTab] = useState('demo'); // 'demo' | 'login' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('Consumer Advocate');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const handleEmailLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = authService.loginWithEmail(email, password);
      setSuccessMessage(`Welcome back, ${user.name}!`);
      setTimeout(() => {
        setLoading(false);
        if (onLoginSuccess) onLoginSuccess(user);
        onClose();
      }, 500);
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Failed to sign in.');
    }
  };

  const handleDemoLogin = (profileId) => {
    setError('');
    setLoading(true);

    try {
      const user = authService.loginWithDemo(profileId);
      setSuccessMessage(`Signed in as ${user.name} (${user.badge})`);
      setTimeout(() => {
        setLoading(false);
        if (onLoginSuccess) onLoginSuccess(user);
        onClose();
      }, 400);
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Demo sign in failed.');
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = authService.signup(name, email, password, role);
      setSuccessMessage(`Account created! Welcome to FoodVigil, ${user.name}!`);
      setTimeout(() => {
        setLoading(false);
        if (onLoginSuccess) onLoginSuccess(user);
        onClose();
      }, 500);
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Registration failed.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#19352A]/50 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl border border-[#E8DCB8] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner */}
        <div className="p-6 bg-gradient-to-r from-[#1F5D42] via-[#246B4A] to-[#1F5D42] text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white">
              <ShieldCheck className="w-6 h-6 text-[#E68A35]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-xl text-white">
                  FOOD <span className="text-[#E68A35]">VIGIL</span>
                </span>
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-white/20 text-white">
                  Portal
                </span>
              </div>
              <p className="text-xs text-emerald-100 mt-0.5">
                Consumer Food Safety & Statutory Verification Platform
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-5 pt-3 border-t border-white/15">
            <button
              onClick={() => { setActiveTab('demo'); setError(''); }}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'demo'
                  ? 'bg-white text-[#1F5D42] shadow-sm'
                  : 'text-emerald-100 hover:bg-white/10'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E68A35]" />
              <span>1-Click Demo</span>
            </button>
            <button
              onClick={() => { setActiveTab('login'); setError(''); }}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'login'
                  ? 'bg-white text-[#1F5D42] shadow-sm'
                  : 'text-emerald-100 hover:bg-white/10'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setActiveTab('signup'); setError(''); }}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'signup'
                  ? 'bg-white text-[#1F5D42] shadow-sm'
                  : 'text-emerald-100 hover:bg-white/10'
              }`}
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 space-y-5">
          
          {error && (
            <div className="p-3 bg-[#FDF1F0] border border-[#F5C2C0] rounded-xl flex items-center gap-2 text-xs text-[#B52F2B]">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 bg-[#EEF8F1] border border-[#C4E6D0] rounded-xl flex items-center gap-2 text-xs text-[#1F5D42] font-semibold">
              <CheckCircle2 className="w-4 h-4 text-[#4F9D69] flex-shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* TAB 1: 1-CLICK DEMO PROFILES */}
          {activeTab === 'demo' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#64776B]">
                  Select a Pre-Loaded Demo Profile:
                </span>
                <span className="text-[11px] text-[#E68A35] font-semibold">
                  Instant Access
                </span>
              </div>

              <div className="space-y-2.5">
                {DEMO_PROFILES.map((profile) => (
                  <button
                    key={profile.id}
                    onClick={() => handleDemoLogin(profile.id)}
                    disabled={loading}
                    className="w-full p-3.5 bg-[#FFF9EF] hover:bg-[#FAF0DE] border border-[#E8DCB8] hover:border-[#E68A35] rounded-2xl flex items-center justify-between text-left transition-all group shadow-sm hover:shadow-md"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl p-2 bg-white rounded-xl shadow-soft-sm border border-[#E8DCB8]">
                        {profile.avatar}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-[#1F5D42] group-hover:text-[#19352A]">
                            {profile.name}
                          </h4>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EAF5EE] text-[#1F5D42] border border-[#BCE2CB]">
                            {profile.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#64776B]">{profile.role}</p>
                        <p className="text-[10px] text-[#64776B]/80 font-mono mt-0.5">{profile.email}</p>
                      </div>
                    </div>

                    <div className="w-8 h-8 rounded-xl bg-white group-hover:bg-[#246B4A] group-hover:text-white flex items-center justify-center text-[#246B4A] border border-[#E8DCB8] transition-colors flex-shrink-0">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: EMAIL / PASSWORD SIGN IN */}
          {activeTab === 'login' && (
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#19352A]">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#64776B] absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. tarun@foodvigil.in"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#FFF9EF] border border-[#E8DCB8] rounded-xl text-xs sm:text-sm text-[#19352A] placeholder:text-[#64776B]/60 focus:outline-none focus:border-[#246B4A] focus:bg-white transition-all font-sans"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#19352A]">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#64776B] absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full pl-10 pr-10 py-2.5 bg-[#FFF9EF] border border-[#E8DCB8] rounded-xl text-xs sm:text-sm text-[#19352A] placeholder:text-[#64776B]/60 focus:outline-none focus:border-[#246B4A] focus:bg-white transition-all font-sans"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-[#64776B] hover:text-[#19352A]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-forest py-2.5 text-xs font-bold uppercase tracking-wider shadow-md"
              >
                {loading ? 'Authenticating...' : 'Sign In'}
              </button>
            </form>
          )}

          {/* TAB 3: CREATE ACCOUNT */}
          {activeTab === 'signup' && (
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#19352A]">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#64776B] absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Dr. Tarun Verma"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#FFF9EF] border border-[#E8DCB8] rounded-xl text-xs sm:text-sm text-[#19352A] placeholder:text-[#64776B]/60 focus:outline-none focus:border-[#246B4A] focus:bg-white transition-all font-sans"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#19352A]">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#64776B] absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. user@example.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#FFF9EF] border border-[#E8DCB8] rounded-xl text-xs sm:text-sm text-[#19352A] placeholder:text-[#64776B]/60 focus:outline-none focus:border-[#246B4A] focus:bg-white transition-all font-sans"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#19352A]">Account Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FFF9EF] border border-[#E8DCB8] rounded-xl text-xs sm:text-sm text-[#19352A] focus:outline-none focus:border-[#246B4A] focus:bg-white transition-all font-sans"
                >
                  <option value="Consumer Advocate">Consumer Rights Advocate</option>
                  <option value="Food Safety Researcher">Food Safety Researcher / Student</option>
                  <option value="FSSAI Licensed Business">FSSAI Licensed Food Business</option>
                  <option value="Parent / Nutrition Enthusiast">Parent / Nutrition Enthusiast</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#19352A]">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#64776B] absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full pl-10 pr-10 py-2.5 bg-[#FFF9EF] border border-[#E8DCB8] rounded-xl text-xs sm:text-sm text-[#19352A] placeholder:text-[#64776B]/60 focus:outline-none focus:border-[#246B4A] focus:bg-white transition-all font-sans"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-[#64776B] hover:text-[#19352A]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-forest py-2.5 text-xs font-bold uppercase tracking-wider shadow-md"
              >
                {loading ? 'Creating Account...' : 'Register & Join FoodVigil'}
              </button>
            </form>
          )}

        </div>

        {/* Footer Disclaimer */}
        <div className="px-6 py-3.5 bg-[#FFF9EF] border-t border-[#E8DCB8] flex items-center justify-between text-[11px] text-[#64776B]">
          <span>🛡️ Independent Consumer Platform</span>
          <span>Demystifying Indian Food Labels</span>
        </div>

      </div>
    </div>
  );
}