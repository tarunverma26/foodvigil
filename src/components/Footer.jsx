import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, PhoneCall, ExternalLink, AlertCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-[#E8DCB8] bg-white text-[#64776B] text-xs mt-20 relative z-10">
      
      {/* Consumer Journey Banner */}
      <div className="border-b border-[#E8DCB8] bg-[#FFF9EF] py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-[#1F5D42] font-bold text-sm">
            <span className="w-2 h-2 rounded-full bg-[#4F9D69]" />
            <span>The FoodVigil Consumer Safety Journey:</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-[#19352A]">
            <span className="px-3 py-1 bg-white border border-[#E8DCB8] rounded-lg shadow-sm text-[#1F5D42] font-bold">1. SCAN</span>
            <span className="text-[#E68A35]">→</span>
            <span className="px-3 py-1 bg-white border border-[#E8DCB8] rounded-lg shadow-sm text-[#1F5D42] font-bold">2. UNDERSTAND</span>
            <span className="text-[#E68A35]">→</span>
            <span className="px-3 py-1 bg-white border border-[#E8DCB8] rounded-lg shadow-sm text-[#1F5D42] font-bold">3. VERIFY</span>
            <span className="text-[#E68A35]">→</span>
            <span className="px-3 py-1 bg-white border border-[#E8DCB8] rounded-lg shadow-sm text-[#1F5D42] font-bold">4. DETECT</span>
            <span className="text-[#E68A35]">→</span>
            <span className="px-3 py-1 bg-white border border-[#E8DCB8] rounded-lg shadow-sm text-[#1F5D42] font-bold">5. REPORT</span>
            <span className="text-[#E68A35]">→</span>
            <span className="px-3 py-1 bg-[#1F5D42] text-white rounded-lg shadow-sm font-bold">6. ACT</span>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#E8DCB8]">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-[#1F5D42] flex items-center justify-center text-white">
                <ShieldCheck className="w-5 h-5 text-[#E68A35]" />
              </div>
              <span className="font-display font-extrabold text-lg text-[#1F5D42]">
                FOOD <span className="text-[#E68A35]">VIGIL</span>
              </span>
            </div>
            <p className="text-[#64776B] leading-relaxed text-[11px]">
              AI-powered consumer food safety and transparency platform. Demystifying packaged food labels, verifying 14-digit statutory licenses, and enabling evidence-backed consumer grievance filing across India.
            </p>
            <div className="text-[11px] font-semibold text-[#1F5D42]">
              “See Beyond the Label.”
            </div>
          </div>

          {/* Col 2: Core Modules */}
          <div className="space-y-2.5">
            <h4 className="font-bold uppercase tracking-wider text-[#1F5D42] text-xs">
              Platform Features
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li><Link to="/scan" className="hover:text-[#1F5D42] hover:underline transition-colors">AI Food Label Scanner</Link></li>
              <li><Link to="/verify" className="hover:text-[#1F5D42] hover:underline transition-colors">FSSAI License Validation</Link></li>
              <li><Link to="/alerts" className="hover:text-[#1F5D42] hover:underline transition-colors">Safety Alerts & Recalls</Link></li>
              <li><Link to="/spot-the-risk" className="hover:text-[#1F5D42] hover:underline transition-colors">Spot the Risk (Adulteration Matrix)</Link></li>
              <li><Link to="/report" className="hover:text-[#1F5D42] hover:underline transition-colors">Report a Food Safety Issue</Link></li>
              <li><Link to="/evidence" className="hover:text-[#1F5D42] hover:underline transition-colors">My Evidence Vault</Link></li>
            </ul>
          </div>

          {/* Col 3: Official Portals */}
          <div className="space-y-2.5">
            <h4 className="font-bold uppercase tracking-wider text-[#1F5D42] text-xs">
              Official Indian Portals
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <a href="https://foscos.fssai.gov.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-[#1F5D42]">
                  <span>FOSCOS FSSAI Portal</span>
                  <ExternalLink className="w-3 h-3 text-[#64776B]" />
                </a>
              </li>
              <li>
                <a href="https://foodsafetyconnect.fssai.gov.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-[#1F5D42]">
                  <span>Food Safety Connect (FSSAI)</span>
                  <ExternalLink className="w-3 h-3 text-[#64776B]" />
                </a>
              </li>
              <li>
                <a href="https://consumerhelpline.gov.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-[#1F5D42]">
                  <span>National Consumer Helpline (NCH 1915)</span>
                  <ExternalLink className="w-3 h-3 text-[#64776B]" />
                </a>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#1F5D42]">
                  Trust, Safety & Standards Methodology
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Consumer Helpline */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-[#1F5D42] text-xs">
              Statutory Consumer Support
            </h4>
            <div className="p-3.5 bg-[#FFF9EF] border border-[#E8DCB8] rounded-xl space-y-1.5">
              <div className="flex items-center space-x-2 text-[#1F5D42] font-bold text-xs">
                <PhoneCall className="w-4 h-4 text-[#246B4A]" />
                <span>Call 1915 (National Toll-Free)</span>
              </div>
              <p className="text-[10px] text-[#64776B] leading-snug">
                Department of Consumer Affairs National Consumer Helpline. (Mon–Sat 9:30 AM to 5:30 PM).
              </p>
            </div>
            <div className="text-[10px] text-[#64776B] flex items-start gap-1">
              <AlertCircle className="w-3.5 h-3.5 text-[#E68A35] flex-shrink-0 mt-0.5" />
              <span>FoodVigil is an independent educational platform. AI outputs provide guidance and do not replace official laboratory certifications.</span>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#64776B]">
          <div>
            © {new Date().getFullYear()} FOOD VIGIL India. Built for consumer safety, food transparency, and statutory compliance.
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/about" className="hover:text-[#1F5D42]">Privacy & Terms</Link>
            <span>•</span>
            <Link to="/about" className="hover:text-[#1F5D42]">Fact vs AI Methodology</Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
