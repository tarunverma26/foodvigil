import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Camera, 
  SearchCheck, 
  ShieldCheck, 
  AlertOctagon, 
  Eye, 
  FileWarning, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Search, 
  Check,
  ChevronRight,
  TrendingUp,
  FileText
} from 'lucide-react';
import { SAMPLE_PRODUCTS, SAFETY_ALERTS_DATA } from '../data/foodvigilData';

export default function Home() {
  const navigate = useNavigate();
  const [quickFssaiInput, setQuickFssaiInput] = useState('');
  const demoProduct = SAMPLE_PRODUCTS[0]; // NutriBite Biscuits

  const handleQuickVerify = (e) => {
    e.preventDefault();
    if (quickFssaiInput.trim()) {
      navigate(`/verify?q=${encodeURIComponent(quickFssaiInput.trim())}`);
    } else {
      navigate('/verify');
    }
  };

  return (
    <div className="space-y-16 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative pt-10 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Hero Left Content (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left p-6 sm:p-9 rounded-3xl bg-white border border-[#E8DCB8] shadow-md">
            
            {/* Tagline Pill */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#EAF5EE] border border-[#BCE2CB] text-[#1F5D42] text-xs font-bold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#E68A35]" />
              <span>India’s Consumer Food Safety & Transparency Platform</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#1F5D42] tracking-tight leading-[1.12]">
              See Beyond <br className="hidden sm:block" />
              <span className="text-[#E68A35]">
                the Label.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-[#64776B] text-base sm:text-lg max-w-xl leading-relaxed">
              Understand what you eat. Verify what you buy. Detect adulteration signs. Take evidence-backed action when something isn't right.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                to="/scan"
                className="btn-forest py-3.5 px-6 text-sm shadow-md font-bold"
              >
                <Camera className="w-4 h-4 text-emerald-300" />
                <span>Scan Food Label</span>
                <ArrowRight className="w-4 h-4 text-emerald-300 ml-1" />
              </Link>

              <Link
                to="/verify"
                className="btn-secondary py-3.5 px-6 text-sm font-bold"
              >
                <SearchCheck className="w-4 h-4 text-[#1F5D42]" />
                <span>Verify a Product / FSSAI</span>
              </Link>
            </div>

            {/* Quick FSSAI Search input */}
            <form onSubmit={handleQuickVerify} className="pt-2 max-w-md">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={quickFssaiInput}
                  onChange={(e) => setQuickFssaiInput(e.target.value)}
                  placeholder="Enter 14-digit FSSAI No. (e.g. 10014021001234)"
                  className="w-full pl-4 pr-24 py-3 rounded-xl bg-[#FFF9EF] border border-[#E8DCB8] text-xs text-[#19352A] placeholder:text-[#64776B]/60 focus:outline-none focus:border-[#246B4A] focus:bg-white transition-all shadow-inner font-sans"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 px-3.5 py-1.5 bg-[#246B4A] hover:bg-[#1F5D42] text-white font-bold rounded-lg text-xs transition-colors shadow-sm"
                >
                  Verify
                </button>
              </div>
            </form>

            {/* Trust Highlights */}
            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-[#64776B] font-semibold">
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#4F9D69]" />
                <span>Fact-Checked INS Codes</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#4F9D69]" />
                <span>14-Digit FSSAI Validation</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#4F9D69]" />
                <span>Legal-Ready NCH 1915 Reports</span>
              </div>
            </div>

          </div>

          {/* Hero Right: Live Interactive Label Scanner Mockup (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative card-surface p-6 space-y-4">
              
              {/* Card Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#E8DCB8]">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#4F9D69] animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1F5D42]">
                    Live AI Scanner Demonstration
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#EAF5EE] text-[#1F5D42] border border-[#BCE2CB] font-bold">
                  Vision OCR Active
                </span>
              </div>

              {/* Product Preview Box */}
              <div className="flex items-start space-x-3 p-3.5 bg-[#FFF9EF] rounded-2xl border border-[#E8DCB8]">
                <span className="text-3xl p-2 bg-white rounded-xl shadow-soft-sm border border-[#E8DCB8]">{demoProduct.image}</span>
                <div className="flex-1 overflow-hidden">
                  <h4 className="font-bold text-xs text-[#19352A] truncate">{demoProduct.productName}</h4>
                  <p className="text-[11px] text-[#64776B]">{demoProduct.brand} • FSSAI: {demoProduct.licenseNumber}</p>
                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="badge-good text-[10px] px-2 py-0.5 rounded-md font-bold">
                      ● {demoProduct.statusLabel}
                    </span>
                  </div>
                </div>
              </div>

              {/* Extracted Ingredients Preview */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] text-[#64776B] font-semibold">
                  <span>Decoded Ingredients:</span>
                  <span className="text-[#1F5D42] font-bold">100% Transparent</span>
                </div>
                <div className="p-3 bg-[#FFF9EF] rounded-xl text-xs text-[#19352A] space-y-2 border border-[#E8DCB8]">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#19352A]">Whole Wheat Atta & Oats</span>
                    <span className="text-[10px] font-bold text-[#1F5D42] bg-[#EAF5EE] border border-[#BCE2CB] px-1.5 py-0.5 rounded">65% Whole Grain</span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-[#E8DCB8]">
                    <div>
                      <span className="font-semibold text-[#19352A]">INS 322 (Soy Lecithin)</span>
                      <p className="text-[10px] text-[#64776B]">Natural plant emulsifier from soybeans</p>
                    </div>
                    <span className="badge-neutral text-[10px] px-1.5 py-0.5 rounded">Informational</span>
                  </div>
                </div>
              </div>

              {/* AI Explanation Snippet */}
              <div className="p-3.5 bg-[#EAF5EE] border border-[#BCE2CB] rounded-2xl text-xs text-[#1F5D42] space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[#1F5D42] text-[11px]">
                  <Sparkles className="w-3.5 h-3.5 text-[#E68A35]" />
                  <span>AI Consumer Guidance:</span>
                </div>
                <p className="text-[11px] text-[#19352A] leading-snug">
                  “Predominantly whole grains with zero synthetic colours or artificial preservatives. Contains soy allergen.”
                </p>
              </div>

              {/* Interactive Demo CTA */}
              <Link
                to={`/scan/result?preset=${demoProduct.id}`}
                className="w-full btn-forest py-2.5 text-xs font-bold shadow-sm"
              >
                <span>View Full Food Safety Snapshot</span>
                <ChevronRight className="w-3.5 h-3.5 text-emerald-300" />
              </Link>

            </div>
          </div>

        </div>
      </section>

      {/* THE 6-STEP CONSUMER JOURNEY */}
      <section className="card-surface mx-4 sm:px-6 lg:px-8 max-w-7xl lg:mx-auto py-12 px-6 sm:px-8 space-y-8 text-center shadow-md">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#E68A35]">
            The Consumer Safety Lifecycle
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#1F5D42] mt-1">
            How FOOD VIGIL Protects You
          </h2>
          <p className="text-[#64776B] text-xs sm:text-sm max-w-xl mx-auto mt-1">
            A comprehensive system designed to eliminate confusion, verify authenticity, and take formal action.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 text-left">
          
          <div className="p-4 rounded-2xl bg-[#FFF9EF] border border-[#E8DCB8] space-y-2 hover:border-[#246B4A] transition-colors shadow-sm">
            <div className="w-8 h-8 rounded-xl bg-[#1F5D42] text-white flex items-center justify-center font-bold text-xs">
              1
            </div>
            <h3 className="font-bold text-sm text-[#1F5D42]">SCAN</h3>
            <p className="text-[11px] text-[#64776B] leading-relaxed">
              Capture packaging photo or ingredients label using camera or upload.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFF9EF] border border-[#E8DCB8] space-y-2 hover:border-[#246B4A] transition-colors shadow-sm">
            <div className="w-8 h-8 rounded-xl bg-[#1F5D42] text-white flex items-center justify-center font-bold text-xs">
              2
            </div>
            <h3 className="font-bold text-sm text-[#1F5D42]">UNDERSTAND</h3>
            <p className="text-[11px] text-[#64776B] leading-relaxed">
              Decode complex INS numbers, added sugars, and allergens in plain language.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFF9EF] border border-[#E8DCB8] space-y-2 hover:border-[#246B4A] transition-colors shadow-sm">
            <div className="w-8 h-8 rounded-xl bg-[#1F5D42] text-white flex items-center justify-center font-bold text-xs">
              3
            </div>
            <h3 className="font-bold text-sm text-[#1F5D42]">VERIFY</h3>
            <p className="text-[11px] text-[#64776B] leading-relaxed">
              Check 14-digit FSSAI licenses, hygiene scores, and active public notices.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFF9EF] border border-[#E8DCB8] space-y-2 hover:border-[#246B4A] transition-colors shadow-sm">
            <div className="w-8 h-8 rounded-xl bg-[#1F5D42] text-white flex items-center justify-center font-bold text-xs">
              4
            </div>
            <h3 className="font-bold text-sm text-[#1F5D42]">DETECT</h3>
            <p className="text-[11px] text-[#64776B] leading-relaxed">
              Spot adulteration warning signs in milk, spices, oils, ghee, and sweets.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFF9EF] border border-[#E8DCB8] space-y-2 hover:border-[#246B4A] transition-colors shadow-sm">
            <div className="w-8 h-8 rounded-xl bg-[#1F5D42] text-white flex items-center justify-center font-bold text-xs">
              5
            </div>
            <h3 className="font-bold text-sm text-[#1F5D42]">REPORT</h3>
            <p className="text-[11px] text-[#64776B] leading-relaxed">
              Follow guided wizard to record bills, batch photos, and violation statements.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFF9EF] border border-[#E8DCB8] space-y-2 hover:border-[#246B4A] transition-colors shadow-sm">
            <div className="w-8 h-8 rounded-xl bg-[#246B4A] text-white flex items-center justify-center font-bold text-xs">
              6
            </div>
            <h3 className="font-bold text-sm text-[#1F5D42]">ACT</h3>
            <p className="text-[11px] text-[#64776B] leading-relaxed">
              Download legal-ready PDF formatted for FSSAI & National Consumer Helpline 1915.
            </p>
          </div>

        </div>
      </section>

      {/* WHY FOODVIGIL? (5 CORE PILLARS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-1 p-6 rounded-3xl bg-white border border-[#E8DCB8] shadow-sm max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E68A35]">
            Consumer Empowerment
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#1F5D42]">
            Why FOOD VIGIL?
          </h2>
          <p className="text-[#64776B] text-xs sm:text-sm">
            Addressing four critical gaps in Indian food transparency: complexity, scattered registries, low adulteration awareness, and difficult grievance filing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="card-surface p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#EAF5EE] border border-[#BCE2CB] flex items-center justify-center text-[#1F5D42]">
              <Camera className="w-5 h-5 text-[#246B4A]" />
            </div>
            <h3 className="font-bold text-base text-[#1F5D42]">Understand Complex Labels</h3>
            <p className="text-xs text-[#64776B] leading-relaxed">
              Translate confusing E-numbers (e.g. INS 621, INS 102, INS 211) into clear facts without unfounded scaremongering or sensationalism.
            </p>
          </div>

          <div className="card-surface p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#EAF5EE] border border-[#BCE2CB] flex items-center justify-center text-[#1F5D42]">
              <SearchCheck className="w-5 h-5 text-[#246B4A]" />
            </div>
            <h3 className="font-bold text-base text-[#1F5D42]">Verify Business Licenses</h3>
            <p className="text-xs text-[#64776B] leading-relaxed">
              Validate 14-digit FSSAI licenses, registered premises, business categories, and official surveillance audit histories in one place.
            </p>
          </div>

          <div className="card-surface p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#EAF5EE] border border-[#BCE2CB] flex items-center justify-center text-[#1F5D42]">
              <AlertOctagon className="w-5 h-5 text-[#246B4A]" />
            </div>
            <h3 className="font-bold text-base text-[#1F5D42]">Official Safety Alerts</h3>
            <p className="text-xs text-[#64776B] leading-relaxed">
              Stay informed with direct statutory recalls and regional public health advisories with transparent official references.
            </p>
          </div>

          <div className="card-surface p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#EAF5EE] border border-[#BCE2CB] flex items-center justify-center text-[#1F5D42]">
              <Eye className="w-5 h-5 text-[#246B4A]" />
            </div>
            <h3 className="font-bold text-base text-[#1F5D42]">Recognize Adulteration</h3>
            <p className="text-xs text-[#64776B] leading-relaxed">
              Learn practical warning signs for kitchen staples (milk, ghee, honey, turmeric, chilli) to spot suspicious items early.
            </p>
          </div>

          <div className="card-surface p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#EAF5EE] border border-[#BCE2CB] flex items-center justify-center text-[#1F5D42]">
              <FileWarning className="w-5 h-5 text-[#246B4A]" />
            </div>
            <h3 className="font-bold text-base text-[#1F5D42]">Structured Reporting Dossier</h3>
            <p className="text-xs text-[#64776B] leading-relaxed">
              Generate structured, evidence-backed complaints formatted for the FSSAI Food Safety Connect portal and National Consumer Helpline (NCH 1915).
            </p>
          </div>

          <div className="card-surface p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#EAF5EE] border border-[#BCE2CB] flex items-center justify-center text-[#1F5D42]">
              <ShieldCheck className="w-5 h-5 text-[#246B4A]" />
            </div>
            <h3 className="font-bold text-base text-[#1F5D42]">Secure Evidence Vault</h3>
            <p className="text-xs text-[#64776B] leading-relaxed">
              Keep tax invoices, packaging photos, and batch numbers organized in a centralized evidence vault for official reference.
            </p>
          </div>

        </div>
      </section>

      {/* RECENT STATUTORY SAFETY ALERTS TICKER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 bg-white border border-[#E8DCB8] text-[#19352A] rounded-3xl space-y-4 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E8DCB8]">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#E68A35] animate-ping" />
              <h3 className="font-bold text-sm text-[#1F5D42] uppercase tracking-wider">
                Recent Public Food Safety Notices & Recalls
              </h3>
            </div>
            <Link to="/alerts" className="text-xs text-[#246B4A] hover:text-[#1F5D42] font-semibold flex items-center gap-1">
              <span>View All Alerts Repository</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SAFETY_ALERTS_DATA.slice(0, 2).map((alert) => (
              <div key={alert.id} className="p-4 rounded-2xl bg-[#FFF9EF] border border-[#E8DCB8] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FEF7EC] text-[#A36412] border border-[#F8D9A8]">
                    {alert.severity}
                  </span>
                  <span className="text-[11px] text-[#64776B]">{alert.date}</span>
                </div>
                <h4 className="font-bold text-xs text-[#1F5D42]">{alert.title}</h4>
                <p className="text-[11px] text-[#64776B] line-clamp-2 leading-relaxed">{alert.reason}</p>
                <div className="text-[10px] text-[#64776B]/80 font-mono pt-1">
                  Source: {alert.source.split('Ref:')[0]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
