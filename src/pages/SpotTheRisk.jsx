import React, { useState } from 'react';
import { 
  Eye, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck, 
  FlaskConical, 
  HelpCircle, 
  FileWarning, 
  Info,
  ChevronDown,
  ChevronUp,
  Ban,
  PhoneCall
} from 'lucide-react';
import { ADULTERATION_SCENARIOS } from '../data/foodvigilData';
import { Link } from 'react-router-dom';

export default function SpotTheRisk() {
  const [activeCategory, setActiveCategory] = useState(ADULTERATION_SCENARIOS[0].id);

  const selectedScenario = ADULTERATION_SCENARIOS.find(s => s.id === activeCategory) || ADULTERATION_SCENARIOS[0];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
          <Eye className="w-3.5 h-3.5" />
          <span>Consumer Awareness & Education</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-forest-900">
          Spot the Risk: Adulteration Guide
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
          Learn practical signs to identify potential adulteration in everyday Indian staples, safe consumer practices, and when to avoid or report suspect items.
        </p>
      </div>

      {/* Scientific Integrity Disclaimer Banner */}
      <div className="p-4 bg-slate-900 text-white rounded-2xl flex items-start space-x-3 shadow-soft-sm text-xs">
        <Info className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-slate-100 uppercase tracking-wider text-[11px] block">
            Scientific Accuracy & Testing Integrity Disclaimer:
          </span>
          <p className="text-slate-300 leading-relaxed text-[11px]">
            Visual and household checks are preliminary consumer awareness tools and do not constitute certified analytical proof. Definitive confirmation of chemical dyes, heavy metals, or prohibited compounds requires formal laboratory testing (HPLC, GC-MS) conducted by an authorized Food Analyst under the Food Safety and Standards Act, 2006.
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-thin">
        {ADULTERATION_SCENARIOS.map((item) => {
          const isActive = activeCategory === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveCategory(item.id)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                isActive
                  ? 'bg-forest-900 text-white border-forest-900 shadow-soft-sm font-bold'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.title.split('(')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Active Category Deep Dive */}
      <div className="card-surface p-6 sm:p-8 space-y-8 animate-fadeIn">
        
        {/* Category Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <span className="text-4xl p-3 bg-slate-100 rounded-2xl shadow-soft-sm">
              {selectedScenario.icon}
            </span>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {selectedScenario.tag}
              </span>
              <h2 className="font-display font-extrabold text-xl sm:text-2xl text-forest-900 mt-1">
                {selectedScenario.title}
              </h2>
            </div>
          </div>

          <Link
            to={`/report?category=${encodeURIComponent(selectedScenario.title)}`}
            className="btn-forest text-xs py-2 px-4 self-start sm:self-center"
          >
            <FileWarning className="w-4 h-4" />
            <span>Report Suspicious {selectedScenario.title.split(' ')[0]}</span>
          </Link>
        </div>

        {/* 1. What to look for */}
        <div className="space-y-2">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            <span>1. What to Look For (Common Contaminants & Adulterants)</span>
          </h3>
          <div className="p-4 bg-slate-50 rounded-xl text-xs text-slate-700 leading-relaxed border border-slate-200/80 font-medium">
            {selectedScenario.whatToLookFor}
          </div>
        </div>

        {/* 2. Common Warning Signs */}
        <div className="space-y-3">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>2. Key Warning Signs & Preliminary Observations</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {selectedScenario.warningSigns.map((sign, i) => (
              <div key={i} className="p-3.5 bg-amber-50/50 border border-amber-200/80 rounded-xl text-xs text-slate-800 flex items-start space-x-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{sign}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Safe Consumer Practices & 4. When to Avoid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Safe Practices */}
          <div className="space-y-2">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>3. Safe Consumer Practices</span>
            </h3>
            <ul className="p-4 bg-emerald-50/40 rounded-xl border border-emerald-200/80 space-y-2 text-xs text-slate-700">
              {selectedScenario.safePractices.map((prac, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <span className="text-emerald-700 font-bold">•</span>
                  <span>{prac}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* When to Avoid */}
          <div className="space-y-2">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Ban className="w-4 h-4 text-rose-600" />
              <span>4. When to Avoid Consumption</span>
            </h3>
            <div className="p-4 bg-rose-50/40 rounded-xl border border-rose-200/80 text-xs text-slate-800 leading-relaxed space-y-2">
              <p>{selectedScenario.whenToAvoid}</p>
            </div>
          </div>

        </div>

        {/* 5. When to Report */}
        <div className="p-4 bg-slate-900 text-white rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="font-bold text-xs text-emerald-400 uppercase tracking-wider">
              5. When to Report to Authorities
            </span>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              {selectedScenario.whenToReport}
            </p>
          </div>

          <Link
            to="/report"
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-xl text-xs font-bold whitespace-nowrap flex-shrink-0 transition-colors"
          >
            File Safety Report
          </Link>
        </div>

      </div>

    </div>
  );
}
