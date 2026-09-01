import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, PhoneCall, ExternalLink, AlertCircle, HeartHandshake } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600 text-xs mt-20">
      
      {/* Consumer Journey Banner */}
      <div className="border-b border-slate-100 bg-slate-50/70 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-forest-900 font-bold text-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>The FoodVigil Journey:</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-slate-700">
            <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg shadow-soft-sm text-forest-900 font-bold">1. SCAN</span>
            <span className="text-slate-300">→</span>
            <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg shadow-soft-sm text-forest-900 font-bold">2. UNDERSTAND</span>
            <span className="text-slate-300">→</span>
            <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg shadow-soft-sm text-forest-900 font-bold">3. VERIFY</span>
            <span className="text-slate-300">→</span>
            <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg shadow-soft-sm text-forest-900 font-bold">4. DETECT</span>
            <span className="text-slate-300">→</span>
            <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg shadow-soft-sm text-forest-900 font-bold">5. REPORT</span>
            <span className="text-slate-300">→</span>
            <span className="px-3 py-1 bg-forest-900 text-white rounded-lg shadow-soft-sm font-bold">6. ACT</span>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-200">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-forest-900 flex items-center justify-center text-white">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="font-display font-extrabold text-lg text-forest-900">
                Food<span className="text-emerald-600">Vigil</span>
              </span>
            </div>
            <p className="text-slate-500 leading-relaxed text-[11px]">
              AI-powered consumer food safety and transparency platform. Demystifying packaged food labels, verifying business licenses, and enabling structured consumer reporting across India.
            </p>
            <div className="text-[11px] font-semibold text-emerald-700">
              “See Beyond the Label.”
            </div>
          </div>

          {/* Col 2: Core Modules */}
          <div className="space-y-2.5">
            <h4 className="font-bold uppercase tracking-wider text-slate-900 text-xs">
              Platform Features
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li><Link to="/scan" className="hover:text-forest-900 transition-colors">AI Food Label Scanner</Link></li>
              <li><Link to="/verify" className="hover:text-forest-900 transition-colors">FSSAI Business Verification</Link></li>
              <li><Link to="/alerts" className="hover:text-forest-900 transition-colors">Safety Alerts & Recalls</Link></li>
              <li><Link to="/spot-the-risk" className="hover:text-forest-900 transition-colors">Spot the Risk (Adulteration Guide)</Link></li>
              <li><Link to="/report" className="hover:text-forest-900 transition-colors">Report a Food Safety Issue</Link></li>
              <li><Link to="/evidence" className="hover:text-forest-900 transition-colors">My Evidence Vault</Link></li>
            </ul>
          </div>

          {/* Col 3: Official Portals */}
          <div className="space-y-2.5">
            <h4 className="font-bold uppercase tracking-wider text-slate-900 text-xs">
              Official Indian Resources
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <a href="https://foscos.fssai.gov.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-forest-900">
                  <span>FOSCOS FSSAI Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a href="https://foodsafetyconnect.fssai.gov.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-forest-900">
                  <span>Food Safety Connect (FSSAI)</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a href="https://consumerhelpline.gov.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-forest-900">
                  <span>National Consumer Helpline (NCH)</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <Link to="/about" className="hover:text-forest-900">
                  Trust & Safety Standards
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Consumer Helpline */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-slate-900 text-xs">
              Consumer Support
            </h4>
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
              <div className="flex items-center space-x-2 text-forest-900 font-bold text-xs">
                <PhoneCall className="w-4 h-4 text-emerald-600" />
                <span>Call 1915 (National Toll-Free)</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-snug">
                Ministry of Consumer Affairs National Consumer Helpline. (Mon–Sat 9:30 AM to 5:30 PM).
              </p>
            </div>
            <div className="text-[10px] text-slate-500 flex items-start gap-1">
              <AlertCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
              <span>FoodVigil is an independent educational platform. AI outputs provide guidance and do not replace official laboratory certifications.</span>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} FoodVigil India. Built for consumer awareness, food safety, and transparent markets.
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/about" className="hover:text-slate-600">Privacy & Terms</Link>
            <span>•</span>
            <Link to="/about" className="hover:text-slate-600">Fact vs AI Methodology</Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
