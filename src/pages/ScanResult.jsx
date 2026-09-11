import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Info, 
  CheckCircle2, 
  ChevronRight, 
  ExternalLink, 
  FileWarning, 
  RotateCcw, 
  Scale, 
  Sparkles, 
  Building2, 
  Layers, 
  Coins,
  Lock,
  Unlock,
  Activity,
  Flame,
  Wheat,
  Share2,
  Check,
  AlertOctagon,
  HelpCircle
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';
import { SAMPLE_PRODUCTS, FOOD_ADDITIVES_DATA } from '../data/foodvigilData';
import DeepAnalysisModal from '../components/DeepAnalysisModal';
import WalletConnectModal from '../components/WalletConnectModal';
import { algorandWalletService } from '../services/algorandWallet';

export default function ScanResult() {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('summary');
  const [selectedAdditive, setSelectedAdditive] = useState(null);
  const [copied, setCopied] = useState(false);
  const [deepAnalysisModalOpen, setDeepAnalysisModalOpen] = useState(false);
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [currentWallet, setCurrentWallet] = useState(null);

  useEffect(() => {
    setCurrentWallet(algorandWalletService.getConnectedWallet());
  }, []);

  // Get scan data from route state or fallback
  const scanData = location.state?.scanData || location.state?.product || SAMPLE_PRODUCTS[0];

  useEffect(() => {
    if (scanData?.detectedAdditives?.length > 0) {
      const code = scanData.detectedAdditives[0];
      const data = FOOD_ADDITIVES_DATA[code] || {
        code: `INS ${code}`,
        name: `Additive INS ${code}`,
        purpose: 'Regulated Food Additive',
        fact: 'Permitted food additive under Codex & FSSAI regulations.',
        consumerNote: 'Check dietary intake limits if sensitive to synthetic compounds.'
      };
      setSelectedAdditive(data);
    }
  }, [scanData]);

  if (!scanData) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">No Scan Data Found</h2>
        <p className="text-xs text-slate-500">Please scan a food product label or select a sample preset.</p>
        <Link to="/scan" className="btn-forest inline-flex">
          Go to Scanner
        </Link>
      </div>
    );
  }

  // Extract structured groups (Requirement #5)
  const structured = scanData.structuredIngredients || [];
  const goodGroup = scanData.groups?.good || structured.filter(i => i.classification === 'good') || [];
  const neutralGroup = scanData.groups?.neutral || structured.filter(i => i.classification === 'neutral') || [];
  const harmfulGroup = scanData.groups?.harmful || structured.filter(i => i.classification === 'harmful') || [];
  const unclearGroup = scanData.groups?.unclear || structured.filter(i => i.classification === 'unclear') || [];

  // Nutrition Chart Data formatting
  const nutritionChartData = [
    { name: 'Total Carbs', value: scanData.nutrition?.carbs || scanData.nutrition?.carbohydrates || 60, unit: 'g', color: '#10b981' },
    { name: 'Added Sugar', value: scanData.nutrition?.sugar || scanData.nutrition?.addedSugar || 24, unit: 'g', color: '#f59e0b' },
    { name: 'Total Fat', value: scanData.nutrition?.fat || scanData.nutrition?.totalFat || 18, unit: 'g', color: '#ef4444' },
    { name: 'Protein', value: scanData.nutrition?.protein || 6, unit: 'g', color: '#047857' },
  ];

  // Real FSSAI 14-Digit Format Check (regex: ^[0-9]{14}$)
  const rawFssaiNumber = scanData.fssaiNumber || scanData.licenseNumber || '';
  const cleanFssaiDigits = rawFssaiNumber ? String(rawFssaiNumber).replace(/[^0-9]/g, '') : '';
  const isFssaiFormatValid = /^[0-9]{14}$/.test(cleanFssaiDigits);
  const hasFssaiNumber = cleanFssaiDigits.length > 0;
  const fssaiStatus = scanData.fssaiStatus || (hasFssaiNumber 
    ? (isFssaiFormatValid ? 'Format Valid' : 'Format Invalid')
    : 'No FSSAI Number Visible');
  const fssaiStatusLabel = scanData.fssaiStatusLabel || (hasFssaiNumber
    ? (isFssaiFormatValid ? 'Format Valid (14 Digits)' : `Format Invalid (${cleanFssaiDigits.length} digits, 14 required)`)
    : 'No FSSAI Number Visible on Pack');
  const fssaiNote = scanData.fssaiNote || 'Format-checked only — not confirmed against government database';

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner Navigation & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-brand-border">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-brand-muted">Gemini 2.5 Vision Analysis</span>
            <ChevronRight className="w-3.5 h-3.5 text-brand-muted/60" />
            <span className="text-xs font-bold text-forest-900">{scanData.category || 'Packaged Food'}</span>
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-text">
            {scanData.productName || scanData.productGuess}
          </h1>
          <p className="text-xs text-brand-muted font-medium">
            AI Identification: <span className="font-bold text-brand-text">{scanData.productGuess || scanData.productName}</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setDeepAnalysisModalOpen(true)}
            className="btn-orange py-2 px-3.5 text-xs font-bold flex items-center space-x-1.5 shadow-sm"
          >
            <Coins className="w-3.5 h-3.5 text-white" />
            <span>Unlock Deep AI ($0.005 USDC)</span>
          </button>

          <button
            onClick={handleCopy}
            className="btn-secondary py-2 px-3 text-xs font-medium"
            title="Share Report"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-brand-muted" />}
            <span>{copied ? 'Copied' : 'Share'}</span>
          </button>

          <Link
            to="/scan"
            className="btn-secondary py-2 px-3 text-xs font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5 text-brand-muted" />
            <span>Scan Another</span>
          </Link>
        </div>
      </div>

      {/* PAID x402 PROMO BANNER */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-forest-900 via-forest-800 to-forest-900 text-white rounded-2xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 border border-forest-700/50">
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
            <Coins className="w-5 h-5 text-brand-orange" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-extrabold text-sm sm:text-base text-white">
                x402 Pay-Per-Use Deep Toxicological AI
              </h3>
              <span className="text-[10px] font-mono uppercase bg-brand-orange text-white font-black px-1.5 py-0.2 rounded">
                $0.005 USDC
              </span>
            </div>
            <p className="text-xs text-white/80 mt-0.5">
              Instant on-chain micropayment on Algorand TestNet routed via GoPlausible facilitator.
            </p>
          </div>
        </div>

        <button
          onClick={() => setDeepAnalysisModalOpen(true)}
          className="w-full sm:w-auto px-5 py-2.5 bg-brand-orange hover:bg-amber-600 text-white text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center space-x-1.5 flex-shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>Demo HTTP 402 Flow</span>
        </button>
      </div>

      {/* Safety Score / Status Summary Card */}
      <div className="card-surface p-6 sm:p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          
          {/* Status Badge */}
          <div className="space-y-2 md:border-r border-brand-border md:pr-6">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-muted">
              Safety Assessment
            </span>
            <div className="flex items-center space-x-3">
              <span className={`text-sm px-3.5 py-1.5 font-bold font-display rounded-full border ${
                scanData.status === 'urgent' ? 'bg-rose-50 border-rose-300 text-rose-900' :
                scanData.status === 'attention' ? 'bg-amber-50 border-amber-300 text-amber-900' :
                'bg-emerald-50 border-emerald-300 text-emerald-900'
              }`}>
                {scanData.statusLabel || 'Good Standing'}
              </span>
            </div>
            <p className="text-xs text-brand-muted leading-relaxed">
              {scanData.explanation || 'Analyzed directly from physical packaging using Gemini 2.5 Multimodal Vision.'}
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="space-y-2 md:border-r border-brand-border md:pr-6 md:pl-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-muted">
              Ingredients Classification
            </span>
            <div className="flex items-center space-x-2 text-xs font-bold">
              <span className="text-emerald-700 font-extrabold text-sm">{goodGroup.length} Good</span>
              <span className="text-brand-muted/60">•</span>
              <span className="text-brand-text font-extrabold text-sm">{neutralGroup.length} Neutral</span>
              <span className="text-brand-muted/60">•</span>
              <span className="text-rose-700 font-extrabold text-sm">{harmfulGroup.length} Harmful</span>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {scanData.detectedAdditives?.map((code) => (
                <span 
                  key={code}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-50/80 text-brand-text font-semibold border border-amber-200/70"
                >
                  INS {code}
                </span>
              ))}
            </div>
          </div>

          {/* FSSAI Quick Status */}
          <div className="space-y-2 md:pl-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-muted">
                FSSAI License
              </span>
              <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                isFssaiFormatValid 
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
                  : hasFssaiNumber 
                  ? 'bg-rose-50 text-rose-800 border-rose-300' 
                  : 'bg-brand-bg text-brand-muted border-brand-border'
              }`}>
                {isFssaiFormatValid ? (
                  <>
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Format Valid</span>
                  </>
                ) : hasFssaiNumber ? (
                  <>
                    <AlertOctagon className="w-3 h-3 text-rose-600" />
                    <span>Format Invalid</span>
                  </>
                ) : (
                  <>
                    <HelpCircle className="w-3 h-3 text-brand-muted" />
                    <span>Not Visible</span>
                  </>
                )}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <Building2 className="w-4 h-4 text-forest-800 flex-shrink-0" />
              <span className="font-mono text-xs font-bold text-brand-text truncate">
                {hasFssaiNumber ? cleanFssaiDigits : 'No FSSAI Number Visible'}
              </span>
            </div>

            <p className="text-[10px] text-brand-muted leading-tight">
              {fssaiNote}
            </p>

            <div className="pt-1 flex items-center justify-between text-xs font-semibold">
              <Link
                to={`/verify?q=${cleanFssaiDigits || '10014021001234'}`}
                className="text-forest-800 hover:text-forest-900 inline-flex items-center space-x-1 text-[11px] font-bold"
              >
                <span>Decode 14-Digits</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
              <a
                href="https://foscos.fssai.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-muted hover:text-brand-text inline-flex items-center space-x-1 text-[11px]"
              >
                <span>FOSCOS Portal</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* REQUIREMENT #5: STRUCTURED INGREDIENTS GROUPS SPLIT (Good, Neutral, Harmful, Unclear) */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Layers className="w-5 h-5 text-forest-800" />
          <h2 className="font-display font-extrabold text-xl text-forest-900">
            Structured Ingredient Breakdown (Multimodal Classification)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* GROUP 1: HARMFUL / HIGH ATTENTION */}
          <div className="p-5 bg-rose-50/70 border border-rose-200 rounded-3xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-rose-200">
              <div className="flex items-center space-x-2 text-rose-900 font-bold text-xs">
                <AlertOctagon className="w-4 h-4 text-rose-600" />
                <span>Harmful / High Attention ({harmfulGroup.length})</span>
              </div>
              <span className="text-[10px] font-bold uppercase bg-rose-200 text-rose-900 px-2 py-0.5 rounded-full">
                Attention
              </span>
            </div>

            {harmfulGroup.length === 0 ? (
              <p className="text-xs text-brand-muted py-3 italic text-center">
                No high-risk chemical dyes or harmful additives flagged.
              </p>
            ) : (
              <div className="space-y-2.5">
                {harmfulGroup.map((item, idx) => (
                  <div key={idx} className="p-3 bg-white rounded-xl border border-rose-200/80 shadow-soft-sm space-y-1">
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-xs text-rose-950">{item.name}</span>
                      {item.insCode && (
                        <span className="text-[10px] font-mono font-bold bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded">
                          INS {item.insCode}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-rose-900 leading-snug">{item.reason}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* GROUP 2: GOOD / BENEFICIAL INGREDIENTS */}
          <div className="p-5 bg-emerald-50/70 border border-emerald-200 rounded-3xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-emerald-200">
              <div className="flex items-center space-x-2 text-emerald-900 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Good / Wholesome Ingredients ({goodGroup.length})</span>
              </div>
              <span className="text-[10px] font-bold uppercase bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full">
                Wholesome
              </span>
            </div>

            {goodGroup.length === 0 ? (
              <p className="text-xs text-brand-muted py-3 italic text-center">
                No primary whole food ingredients detected.
              </p>
            ) : (
              <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
                {goodGroup.map((item, idx) => (
                  <div key={idx} className="p-3 bg-white rounded-xl border border-emerald-200/80 shadow-soft-sm space-y-1">
                    <span className="font-bold text-xs text-forest-900 block">{item.name}</span>
                    <p className="text-[11px] text-brand-muted leading-snug">{item.reason}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* GROUP 3: NEUTRAL / STANDARD CULINARY */}
          <div className="p-5 bg-white border border-brand-border rounded-3xl space-y-3 shadow-soft-sm">
            <div className="flex items-center justify-between pb-2 border-b border-brand-border">
              <div className="flex items-center space-x-2 text-brand-text font-bold text-xs">
                <Info className="w-4 h-4 text-brand-muted" />
                <span>Neutral Ingredients ({neutralGroup.length})</span>
              </div>
              <span className="text-[10px] font-bold uppercase bg-amber-50 text-amber-900 border border-amber-200/60 px-2 py-0.5 rounded-full">
                Standard
              </span>
            </div>

            {neutralGroup.length === 0 ? (
              <p className="text-xs text-brand-muted py-3 italic text-center">
                No standard common ingredients listed.
              </p>
            ) : (
              <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
                {neutralGroup.map((item, idx) => (
                  <div key={idx} className="p-3 bg-brand-bg/50 rounded-xl border border-brand-border/70 shadow-soft-sm space-y-1">
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-xs text-brand-text">{item.name}</span>
                      {item.insCode && (
                        <span className="text-[10px] font-mono font-bold bg-amber-100/70 text-amber-900 px-1.5 py-0.5 rounded">
                          INS {item.insCode}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-brand-muted leading-snug">{item.reason}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* UNCLEAR INGREDIENTS GROUP - REQUIREMENT #4 */}
        {unclearGroup.length > 0 && (
          <div className="p-4 bg-amber-50 border border-amber-300 rounded-2xl space-y-2 text-xs text-amber-900">
            <div className="flex items-center space-x-2 font-bold">
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span>Unclear / Occluded Label Text Flagged ({unclearGroup.length})</span>
            </div>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              The following ingredients were partially obscured or blurry on the packaging label:
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {unclearGroup.map((item, idx) => (
                <span key={idx} className="px-2.5 py-1 bg-white border border-amber-300 rounded-lg font-mono text-[11px] text-amber-900">
                  {item.name}: <em>{item.reason}</em>
                </span>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Main Content Grid: Macro Bars & Additive Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Nutrition Profile Breakdown */}
        <div className="card-surface p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-extrabold text-base text-forest-900">
              Nutritional Snapshot
            </h3>
            <span className="text-[10px] text-brand-muted font-semibold">Per 100g</span>
          </div>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={nutritionChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip 
                  formatter={(val, name, props) => [`${val} ${props.payload.unit}`, 'Declared']}
                  contentStyle={{ fontSize: '11px', borderRadius: '8px' }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {nutritionChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-brand-border text-xs text-brand-muted">
            <div className="flex justify-between">
              <span>Energy:</span>
              <strong className="text-brand-text">{scanData.nutrition?.calories || 480} kcal</strong>
            </div>
            <div className="flex justify-between">
              <span>Sodium (Salt):</span>
              <strong className="text-brand-text">{scanData.nutrition?.sodium || 780} mg</strong>
            </div>
          </div>
        </div>

        {/* INS Additives Inspector */}
        <div className="card-surface p-6 lg:col-span-2 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-brand-border">
            <div className="flex items-center space-x-2">
              <Layers className="w-4 h-4 text-forest-800" />
              <h3 className="font-display font-extrabold text-base text-forest-900">
                Statutory Additive Matrix
              </h3>
            </div>
            <span className="text-[10px] text-brand-muted">Select additive to inspect</span>
          </div>

          {/* Additive Selector Buttons */}
          <div className="flex flex-wrap gap-2">
            {scanData.detectedAdditives?.map((code) => (
              <button
                key={code}
                onClick={() => {
                  const data = FOOD_ADDITIVES_DATA[code] || {
                    code: `INS ${code}`,
                    name: `Additive INS ${code}`,
                    purpose: 'Food Processing Additive',
                    fact: 'Permitted under FSSAI Standards.',
                    consumerNote: 'Standard food processing substance.'
                  };
                  setSelectedAdditive(data);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                  selectedAdditive?.code?.includes(code)
                    ? 'bg-forest-900 text-amber-300 font-bold shadow-sm'
                    : 'bg-brand-bg hover:bg-amber-100/50 text-brand-text border border-brand-border'
                }`}
              >
                <span>INS {code}</span>
              </button>
            ))}
          </div>

          {/* Selected Additive Details Card */}
          {selectedAdditive && (
            <div className="p-4 bg-brand-bg/40 rounded-2xl border border-brand-border space-y-4 text-xs animate-fadeIn">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-[10px] font-mono text-forest-800 font-bold uppercase">{selectedAdditive.code}</div>
                  <h4 className="font-bold text-sm text-forest-900">{selectedAdditive.name}</h4>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                  {selectedAdditive.purpose}
                </span>
              </div>

              {/* Fact vs AI Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 bg-white rounded-xl border border-brand-border space-y-1">
                  <div className="font-bold text-brand-text text-[11px] flex items-center gap-1">
                    <span className="text-forest-800">●</span> Fact (Codex / FSSAI)
                  </div>
                  <p className="text-[11px] text-brand-muted leading-relaxed">{selectedAdditive.fact}</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-brand-border space-y-1">
                  <div className="font-bold text-brand-text text-[11px] flex items-center gap-1">
                    <span className="text-brand-orange">●</span> AI Consumer Guidance
                  </div>
                  <p className="text-[11px] text-brand-muted leading-relaxed">{selectedAdditive.consumerNote}</p>
                </div>
              </div>
            </div>
          )}

          {/* Grievance Link */}
          <div className="pt-2 flex items-center justify-between text-xs">
            <span className="text-brand-muted">Notice mislabeling or foreign matter?</span>
            <Link
              to={`/report?product=${encodeURIComponent(scanData.productName || scanData.productGuess || '')}&batch=${encodeURIComponent(scanData.batchNumber || '')}`}
              className="font-bold text-rose-700 hover:text-rose-800 flex items-center gap-1"
            >
              <FileWarning className="w-3.5 h-3.5" />
              <span>Report Grievance</span>
            </Link>
          </div>

        </div>

      </div>

      {/* FSSAI STATUTORY LICENSE FORMAT & DISCLOSURE CARD */}
      <div className="card-surface p-6 sm:p-7 space-y-4 border-l-4 border-l-forest-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-brand-border">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-forest-900">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-sm sm:text-base text-forest-900">
                FSSAI Statutory License Status
              </h3>
              <p className="text-[11px] text-brand-muted">
                Extracted via Multimodal Vision AI & Validated against Statutory Format Standard
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
              isFssaiFormatValid 
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
                : hasFssaiNumber 
                ? 'bg-rose-50 text-rose-800 border-rose-300' 
                : 'bg-brand-bg text-brand-muted border-brand-border'
            }`}>
              {isFssaiFormatValid ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Format Valid (14 Digits)</span>
                </>
              ) : hasFssaiNumber ? (
                <>
                  <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />
                  <span>Format Invalid ({cleanFssaiDigits.length} digits, 14 required)</span>
                </>
              ) : (
                <>
                  <HelpCircle className="w-3.5 h-3.5 text-brand-muted" />
                  <span>No FSSAI Number Visible</span>
                </>
              )}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3.5 bg-brand-bg/40 rounded-xl border border-brand-border space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-brand-muted">Extracted License Number</span>
            <div className="font-mono text-sm font-bold text-brand-text">
              {hasFssaiNumber ? cleanFssaiDigits : 'Not Visible on Packaging'}
            </div>
            <p className="text-[10px] text-brand-muted">Raw text extracted by Gemini Vision from physical label</p>
          </div>

          <div className="p-3.5 bg-brand-bg/40 rounded-xl border border-brand-border space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-brand-muted">Format Standard Check</span>
            <div className={`font-mono text-sm font-bold ${isFssaiFormatValid ? 'text-forest-800' : 'text-rose-700'}`}>
              {isFssaiFormatValid ? 'Regex Pass: ^[0-9]{14}$' : hasFssaiNumber ? `Regex Fail: ${cleanFssaiDigits.length}/14 digits` : 'No digits to test'}
            </div>
            <p className="text-[10px] text-brand-muted">Valid Indian FSSAI licenses must contain exactly 14 digits</p>
          </div>

          <div className="p-3.5 bg-brand-bg/40 rounded-xl border border-brand-border space-y-1 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-brand-muted">Official Actions</span>
              <div className="flex flex-wrap gap-2 pt-1">
                <Link
                  to={`/verify?q=${cleanFssaiDigits || '10014021001234'}`}
                  className="px-2.5 py-1 bg-white border border-brand-border rounded-lg text-xs font-bold text-forest-900 hover:bg-amber-50 transition-colors inline-flex items-center gap-1 shadow-soft-sm"
                >
                  <span>Decode Anatomy</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
                <a
                  href="https://foscos.fssai.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 bg-white border border-brand-border rounded-lg text-xs font-bold text-brand-text hover:bg-brand-bg transition-colors inline-flex items-center gap-1 shadow-soft-sm"
                >
                  <span>FOSCOS Portal</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>
            <p className="text-[10px] text-brand-muted">Cross-reference state code, enrollment year & license level</p>
          </div>
        </div>

        {/* Consumer Statutory Disclosure Banner */}
        <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl flex items-start gap-2.5 text-amber-900 text-xs">
          <Info className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <strong className="font-bold">Statutory Consumer Notice:</strong>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              Format-checked only — not confirmed against government database. AI vision models extract printed text from packaging labels and verify structural adherence to the 14-digit FSSAI specification. Live active validity, manufacturing premises registration, and inspection histories must be verified directly on the official <a href="https://foscos.fssai.gov.in" target="_blank" rel="noopener noreferrer" className="underline font-bold hover:text-amber-950">FSSAI FOSCOS portal</a>.
            </p>
          </div>
        </div>
      </div>

      {/* Deep Analysis Modal */}
      <DeepAnalysisModal
        isOpen={deepAnalysisModalOpen}
        onClose={() => setDeepAnalysisModalOpen(false)}
        product={scanData}
        currentWallet={currentWallet}
        onOpenWalletModal={() => setWalletModalOpen(true)}
      />

      {/* Wallet Connect Modal */}
      <WalletConnectModal
        isOpen={walletModalOpen}
        onClose={() => setWalletModalOpen(false)}
        currentWallet={currentWallet}
        onWalletConnected={(w) => setCurrentWallet(w)}
      />

    </div>
  );
}
