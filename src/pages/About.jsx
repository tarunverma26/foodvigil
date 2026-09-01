import React from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Scale, 
  HeartPulse, 
  CheckCircle2, 
  Info, 
  FileText, 
  PhoneCall, 
  ExternalLink 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Trust, Ethics & Standards</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-forest-900">
          About FoodVigil India
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
          “See Beyond the Label.” Demystifying food safety, empowering Indian households with transparent data, and facilitating structured grievance redressal.
        </p>
      </div>

      {/* Core Mission */}
      <div className="card-surface p-6 sm:p-8 space-y-4">
        <h2 className="font-display font-bold text-lg text-forest-900">
          Our Mission & Consumer Philosophy
        </h2>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          In an increasingly complex food ecosystem, Indian consumers face scattered regulatory databases, technical INS additive codes, and confusing marketing claims. FoodVigil was created to bridge this transparency gap through a clear 6-step lifecycle:
        </p>
        <div className="p-4 bg-forest-50/70 border border-emerald-200 rounded-xl text-xs font-semibold text-forest-900 text-center">
          SCAN → UNDERSTAND → VERIFY → DETECT → REPORT → ACT
        </div>
      </div>

      {/* Trust & AI Safety Principles */}
      <div className="card-surface p-6 sm:p-8 space-y-6">
        <h2 className="font-display font-bold text-lg text-forest-900 flex items-center gap-2">
          <Scale className="w-5 h-5 text-emerald-700" />
          <span>Trust & Safety Principles</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
            <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>1. Fact vs. AI Distinction</span>
            </h3>
            <p className="text-slate-600 leading-relaxed">
              We strictly distinguish between declared label facts, AI-assisted translations, and general consumer advice.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
            <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>2. No Unsupported Medical Claims</span>
            </h3>
            <p className="text-slate-600 leading-relaxed">
              We do not automatically label permitted food additives as "toxic" without scientific context from regulatory bodies (FSSAI, EFSA, Codex).
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
            <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>3. Grounded Adulteration Guidance</span>
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Visual and kitchen tests are presented as initial screening tools, clearly noting that formal certification requires accredited analytical laboratories.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
            <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>4. Structured Legal Redressal</span>
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Generated consumer dossiers adhere strictly to the format expected by the National Consumer Helpline (NCH 1915) and FSSAI Food Safety Connect.
            </p>
          </div>

        </div>
      </div>

      {/* Statutory Disclaimers */}
      <div className="p-6 bg-slate-900 text-white rounded-3xl space-y-3 text-xs leading-relaxed">
        <h3 className="font-bold text-sm text-emerald-400 uppercase tracking-wider">
          Statutory Regulatory Notice
        </h3>
        <p className="text-slate-300">
          FoodVigil is an independent open educational project. It is not affiliated with or endorsed directly by the Food Safety and Standards Authority of India (FSSAI) or the Ministry of Consumer Affairs. For formal administrative licensing, please visit <a href="https://foscos.fssai.gov.in" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline">foscos.fssai.gov.in</a>.
        </p>
      </div>

    </div>
  );
}
