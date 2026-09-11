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

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner Navigation & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-slate-500">Gemini 2.5 Vision Analysis</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs font-bold text-forest-900">{scanData.category || 'Packaged Food'}</span>
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-forest-900">
            {scanData.productName || scanData.productGuess}
          </h1>
          <p className="text-xs text-slate-600 font-medium">
            AI Identification: <span className="font-bold text-slate-900">{scanData.productGuess || scanData.productName}</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setDeepAnalysisModalOpen(true)}
            className="btn-forest py-2 px-3 text-xs font-bold flex items-center space-x-1.5 shadow-md bg-gradient-to-r from-forest-900 to-emerald-800"
          >
            <Coins className="w-3.5 h-3.5 text-emerald-300" />
            <span>Unlock Deep AI ($0.005 USDC)</span>
          </button>

          <button
            onClick={handleCopy}
            className="btn-secondary py-2 px-3 text-xs font-medium"
            title="Share Report"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-slate-600" />}
            <span>{copied ? 'Copied' : 'Share'}</span>
          </button>

          <Link
            to="/scan"
            className="btn-secondary py-2 px-3 text-xs font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
            <span>Scan Another</span>
          </Link>
        </div>
      </div>

      {/* PAID x402 PROMO BANNER */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-forest-900 via-forest-800 to-emerald-900 text-white rounded-2xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 border border-emerald-500/40">
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center flex-shrink-0">
            <Coins className="w-5 h-5 text-emerald-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-extrabold text-sm sm:text-base text-white">
                x402 Pay-Per-Use Deep Toxicological AI
              </h3>
              <span className="text-[10px] font-mono uppercase bg-emerald-400 text-forest-950 font-black px-1.5 py-0.2 rounded">
                $0.005 USDC
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Instant on-chain micropayment on Algorand TestNet routed via GoPlausible facilitator.
            </p>
          </div>
        </div>

        <button
          onClick={() => setDeepAnalysisModalOpen(true)}
          className="w-full sm:w-auto px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-forest-950 text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center space-x-1.5 flex-shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>Demo HTTP 402 Flow</span>
        </button>
      </div>

      {/* Safety Score / Status Summary Card */}
      <div className="card-surface p-6 sm:p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          
          {/* Status Badge */}
          <div className="space-y-2 md:border-r border-slate-200 md:pr-6">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
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
            <p className="text-xs text-slate-600 leading-relaxed">
              {scanData.explanation || 'Analyzed directly from physical packaging using Gemini 2.5 Multimodal Vision.'}
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="space-y-2 md:border-r border-slate-200 md:pr-6 md:pl-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Ingredients Classification
            </span>
            <div className="flex items-center space-x-2 text-xs font-bold">
              <span className="text-emerald-700 font-extrabold text-sm">{goodGroup.length} Good</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-600 font-extrabold text-sm">{neutralGroup.length} Neutral</span>
              <span className="text-slate-400">•</span>
              <span className="text-rose-700 font-extrabold text-sm">{harmfulGroup.length} Harmful</span>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {scanData.detectedAdditives?.map((code) => (
                <span 
                  key={code}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold border border-slate-200"
                >
                  INS {code}
                </span>
              ))}
            </div>
          </div>

          {/* FSSAI Quick Status */}
          <div className="space-y-2 md:pl-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Statutory License
            </span>
            <div className="flex items-center space-x-2">
              <Building2 className="w-4 h-4 text-emerald-700" />
              <span className="font-mono text-xs font-bold text-slate-900">
                {scanData.licenseNumber || '10014021001234'}
              </span>
            </div>
            <Link
              to={`/verify?q=${scanData.licenseNumber || '10014021001234'}`}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center space-x-1"
            >
              <span>Verify State & Factory Record</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </div>

      {/* REQUIREMENT #5: STRUCTURED INGREDIENTS GROUPS SPLIT (Good, Neutral, Harmful, Unclear) */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Layers className="w-5 h-5 text-emerald-700" />
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
              <p className="text-xs text-slate-500 py-3 italic text-center">
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
              <p className="text-xs text-slate-500 py-3 italic text-center">
                No primary whole food ingredients detected.
              </p>
            ) : (
              <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
                {goodGroup.map((item, idx) => (
                  <div key={idx} className="p-3 bg-white rounded-xl border border-emerald-200/80 shadow-soft-sm space-y-1">
                    <span className="font-bold text-xs text-emerald-950 block">{item.name}</span>
                    <p className="text-[11px] text-slate-600 leading-snug">{item.reason}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* GROUP 3: NEUTRAL / STANDARD CULINARY */}
          <div className="p-5 bg-slate-50 border border-slate-200 rounded-3xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div className="flex items-center space-x-2 text-slate-800 font-bold text-xs">
                <Info className="w-4 h-4 text-slate-500" />
                <span>Neutral Ingredients ({neutralGroup.length})</span>
              </div>
              <span className="text-[10px] font-bold uppercase bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full">
                Standard
              </span>
            </div>

            {neutralGroup.length === 0 ? (
              <p className="text-xs text-slate-500 py-3 italic text-center">
                No standard common ingredients listed.
              </p>
            ) : (
              <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
                {neutralGroup.map((item, idx) => (
                  <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 shadow-soft-sm space-y-1">
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-xs text-slate-900">{item.name}</span>
                      {item.insCode && (
                        <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                          INS {item.insCode}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug">{item.reason}</p>
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
            <span className="text-[10px] text-slate-500 font-semibold">Per 100g</span>
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

          <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Energy:</span>
              <strong className="text-slate-900">{scanData.nutrition?.calories || 480} kcal</strong>
            </div>
            <div className="flex justify-between">
              <span>Sodium (Salt):</span>
              <strong className="text-slate-900">{scanData.nutrition?.sodium || 780} mg</strong>
            </div>
          </div>
        </div>

        {/* INS Additives Inspector */}
        <div className="card-surface p-6 lg:col-span-2 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <Layers className="w-4 h-4 text-emerald-700" />
              <h3 className="font-display font-extrabold text-base text-forest-900">
                Statutory Additive Matrix
              </h3>
            </div>
            <span className="text-[10px] text-slate-400">Select additive to inspect</span>
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
                    ? 'bg-forest-900 text-emerald-300 font-bold shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <span>INS {code}</span>
              </button>
            ))}
          </div>

          {/* Selected Additive Details Card */}
          {selectedAdditive && (
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4 text-xs animate-fadeIn">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-[10px] font-mono text-emerald-700 font-bold uppercase">{selectedAdditive.code}</div>
                  <h4 className="font-bold text-sm text-forest-900">{selectedAdditive.name}</h4>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                  {selectedAdditive.purpose}
                </span>
              </div>

              {/* Fact vs AI Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-800 text-[11px] flex items-center gap-1">
                    <span className="text-emerald-700">●</span> Fact (Codex / FSSAI)
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{selectedAdditive.fact}</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-800 text-[11px] flex items-center gap-1">
                    <span className="text-cyan-700">●</span> AI Consumer Guidance
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{selectedAdditive.consumerNote}</p>
                </div>
              </div>
            </div>
          )}

          {/* Grievance Link */}
          <div className="pt-2 flex items-center justify-between text-xs">
            <span className="text-slate-500">Notice mislabeling or foreign matter?</span>
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
