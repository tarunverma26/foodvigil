import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams, Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  Sparkles, 
  SearchCheck, 
  AlertOctagon, 
  Tag, 
  HeartHandshake, 
  FileText, 
  ChevronRight, 
  ArrowLeft,
  PieChart as PieIcon,
  Activity,
  Layers,
  Building2,
  Calendar,
  Share2
} from 'lucide-react';
import { SAMPLE_PRODUCTS, FOOD_ADDITIVES_DATA } from '../data/foodvigilData';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

export default function ScanResult() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const presetParam = searchParams.get('preset');
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // If state passed from Scan page
    if (location.state?.product) {
      setProduct(location.state.product);
    } else if (presetParam) {
      const match = SAMPLE_PRODUCTS.find(p => p.id === presetParam);
      if (match) setProduct(match);
      else setProduct(SAMPLE_PRODUCTS[0]);
    } else {
      setProduct(SAMPLE_PRODUCTS[0]);
    }
  }, [location.state, presetParam]);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400 mb-3 animate-spin">
          <Activity className="w-6 h-6" />
        </div>
        <p className="text-xs text-slate-500">Loading Food Safety Snapshot...</p>
      </div>
    );
  }

  // Nutrition Chart Data
  const macroChartData = [
    { name: 'Carbs', grams: product.nutrition.carbohydrates, color: '#3b82f6' },
    { name: 'Sugar', grams: product.nutrition.addedSugar, color: '#f59e0b' },
    { name: 'Total Fat', grams: product.nutrition.totalFat, color: '#f97316' },
    { name: 'Protein', grams: product.nutrition.protein, color: '#10b981' },
    { name: 'Fiber', grams: product.nutrition.dietaryFiber, color: '#8b5cf6' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Navigation & Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/scan')}
          className="flex items-center space-x-1 text-xs font-semibold text-slate-600 hover:text-forest-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Scanner</span>
        </button>

        <div className="flex items-center space-x-2 text-xs">
          <span className="text-slate-400">AI Confidence:</span>
          <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            {product.confidence}% Verified
          </span>
        </div>
      </div>

      {/* OVERALL FOOD SAFETY SNAPSHOT BANNER */}
      <div className="card-surface p-6 sm:p-8 space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div className="flex items-start space-x-4">
            <span className="text-4xl p-3 bg-slate-100 rounded-2xl shadow-soft-sm">{product.image}</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{product.category}</span>
                <span className="text-slate-300">•</span>
                <span className="text-xs text-slate-500 font-medium">Batch: {product.batchNumber}</span>
              </div>
              <h1 className="font-display font-extrabold text-xl sm:text-2xl text-forest-900 mt-0.5">
                {product.productName}
              </h1>
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                Brand: <span className="font-bold text-slate-900">{product.brand}</span>
              </p>
            </div>
          </div>

          {/* Status Indicator Badge */}
          <div className={`p-4 rounded-2xl border flex items-center space-x-3 self-start sm:self-center ${
            product.status === 'good' 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
              : product.status === 'attention' 
              ? 'bg-amber-50 border-amber-200 text-amber-900' 
              : 'bg-rose-50 border-rose-200 text-rose-900'
          }`}>
            {product.status === 'good' ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
            ) : product.status === 'attention' ? (
              <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0" />
            ) : (
              <AlertOctagon className="w-6 h-6 text-rose-600 flex-shrink-0" />
            )}
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider opacity-75">
                Overall Information Status
              </div>
              <div className="text-sm font-extrabold font-display">
                {product.status === 'good' ? '🟢 Good' : product.status === 'attention' ? '🟡 Needs Attention' : '🔴 Important Information'}
              </div>
            </div>
          </div>
        </div>

        {/* AI EXPLANATION SECTION (Objective, fact-distinguished) */}
        <div className="p-5 bg-forest-50/70 border border-emerald-200 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-forest-900 font-bold text-xs">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span>AI Consumer Explanation</span>
            </div>
            <span className="text-[10px] text-slate-500 font-medium">
              AI-generated explanation — verify with official sources.
            </span>
          </div>

          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            {product.explanation}
          </p>

          {/* Observations & Attention bullets */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                Key Label Observations:
              </span>
              <ul className="space-y-1 text-xs text-slate-600">
                {product.observations.map((obs, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{obs}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                Items for Attention:
              </span>
              <ul className="space-y-1 text-xs text-slate-600">
                {product.attentionItems.map((att, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-amber-600 font-bold">⚠️</span>
                    <span>{att}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>

      {/* MAIN CARDS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Additives & Ingredients (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Additives & INS Codes Card */}
          <div className="card-surface p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <Tag className="w-4 h-4 text-emerald-700" />
                <h3 className="font-bold text-sm text-slate-900">
                  Decoded Food Additives ({product.detectedAdditives.length})
                </h3>
              </div>
              <span className="text-[11px] text-slate-500">
                INS / E-Number Registry
              </span>
            </div>

            {product.detectedAdditives.length === 0 ? (
              <div className="p-6 bg-slate-50 rounded-xl text-center text-xs text-slate-500 space-y-1">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
                <p className="font-bold text-slate-700">No synthetic INS additives detected</p>
                <p className="text-[11px]">Clean whole-ingredient formulation declared.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {product.detectedAdditives.map((code) => {
                  const info = FOOD_ADDITIVES_DATA[code] || {
                    code: `INS ${code}`,
                    name: `Additive ${code}`,
                    purpose: 'Food Processing Agent',
                    category: 'Informational',
                    simpleExplanation: 'Standard additive used in processed foods.',
                    fact: 'Permitted substance regulated under FSSAI standards.',
                    aiInterpretation: 'Declared on ingredients panel.',
                    consumerNote: 'Check personal sensitivities if applicable.'
                  };

                  return (
                    <div key={code} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-forest-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                              {info.code}
                            </span>
                            <span className="font-bold text-xs text-slate-900">{info.name}</span>
                          </div>
                          <span className="text-[11px] text-slate-500 mt-0.5 block">
                            Purpose: <span className="font-semibold text-slate-700">{info.purpose}</span>
                          </span>
                        </div>

                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                          info.category === 'High attention' ? 'badge-urgent' : info.category === 'Attention' ? 'badge-attention' : 'badge-neutral'
                        }`}>
                          {info.category}
                        </span>
                      </div>

                      {/* Simple explanation */}
                      <p className="text-xs text-slate-700 font-medium bg-white p-2.5 rounded-lg border border-slate-100 leading-relaxed">
                        💡 <span className="font-semibold text-slate-900">Simple explanation:</span> {info.simpleExplanation}
                      </p>

                      {/* Fact -> AI interpretation -> Consumer guidance */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] pt-1">
                        <div className="p-2 bg-white rounded-lg border border-slate-100">
                          <span className="font-bold text-slate-800 block text-[10px] uppercase text-emerald-800">1. Fact</span>
                          <span className="text-slate-600 leading-snug">{info.fact}</span>
                        </div>

                        <div className="p-2 bg-white rounded-lg border border-slate-100">
                          <span className="font-bold text-slate-800 block text-[10px] uppercase text-blue-800">2. AI Interpretation</span>
                          <span className="text-slate-600 leading-snug">{info.aiInterpretation}</span>
                        </div>

                        <div className="p-2 bg-white rounded-lg border border-slate-100">
                          <span className="font-bold text-slate-800 block text-[10px] uppercase text-amber-800">3. Consumer Guidance</span>
                          <span className="text-slate-600 leading-snug">{info.consumerNote}</span>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

          </div>

          {/* Full Ingredients Declaration */}
          <div className="card-surface p-6 space-y-3">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-700" />
              <span>Full Extracted Ingredients List</span>
            </h3>
            <div className="p-3.5 bg-slate-50 rounded-xl text-xs text-slate-700 leading-relaxed font-sans border border-slate-200/80">
              {product.ingredients.join(', ')}
            </div>
            <p className="text-[10px] text-slate-400">
              Ingredients are legally listed in descending order of incoming weight (predominant ingredients listed first).
            </p>
          </div>

        </div>

        {/* RIGHT COLUMN: Allergens, Nutrition, FSSAI & Recalls (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Allergens Declaration */}
          <div className="card-surface p-6 space-y-3">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Allergen Declaration</span>
            </h3>

            <div className="space-y-2">
              {product.allergens.map((allergen, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-200 text-xs font-semibold text-amber-900 flex items-center gap-2">
                  <span>⚠️</span>
                  <span>{allergen}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-slate-500">
              Always check the physical label if you have severe life-threatening allergies.
            </p>
          </div>

          {/* Nutritional Breakdown & Chart */}
          <div className="card-surface p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <PieIcon className="w-4 h-4 text-emerald-700" />
                <span>Nutritional Values</span>
              </h3>
              <span className="text-[11px] text-slate-500 font-medium">
                Serving: {product.nutrition.servingSize}
              </span>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-500 block">Energy</span>
                <span className="font-bold text-slate-900 text-sm">{product.nutrition.calories} kcal</span>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-500 block">Added Sugar</span>
                <span className={`font-bold text-sm ${product.nutrition.addedSugar > 8 ? 'text-amber-700' : 'text-slate-900'}`}>
                  {product.nutrition.addedSugar}g
                </span>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-500 block">Sodium</span>
                <span className={`font-bold text-sm ${product.nutrition.sodium > 600 ? 'text-rose-700' : 'text-slate-900'}`}>
                  {product.nutrition.sodium}mg
                </span>
              </div>
            </div>

            {/* Visual Recharts Bar Chart */}
            <div className="pt-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                Macronutrient Balance (Grams / Serving):
              </span>
              <div className="h-36 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={macroChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                    <Bar dataKey="grams" radius={[4, 4, 0, 0]}>
                      {macroChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* FSSAI License & Recall Radar Card */}
          <div className="card-surface p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-emerald-700" />
                <span>Licence & Business Verification</span>
              </h3>
              <span className="text-[10px] px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200 font-semibold">
                {product.fssaiStatus}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">14-Digit FSSAI No.:</span>
                <span className="font-mono font-bold text-slate-900">{product.licenseNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Manufacturer:</span>
                <span className="font-medium text-slate-800 text-right max-w-[200px] truncate">{product.manufacturerInfo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Best Before / Expiry:</span>
                <span className="font-semibold text-slate-800">{product.expiryDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Label Completeness:</span>
                <span className="font-bold text-emerald-700">{product.labelCompleteness}%</span>
              </div>
            </div>

            {/* Direct Link to Verify in Official Module */}
            <Link
              to={`/verify?q=${encodeURIComponent(product.licenseNumber)}`}
              className="w-full py-2.5 bg-slate-100 hover:bg-forest-50 text-forest-900 font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              <SearchCheck className="w-4 h-4 text-emerald-700" />
              <span>Verify License in FSSAI Directory</span>
            </Link>
          </div>

          {/* Action CTAs: Report or Share */}
          <div className="p-4 bg-slate-100/70 rounded-2xl flex items-center justify-between gap-3 text-xs">
            <span className="text-slate-600 font-medium">Found something suspicious with this product?</span>
            <Link
              to={`/report?product=${encodeURIComponent(product.productName)}&fssai=${encodeURIComponent(product.licenseNumber)}`}
              className="btn-forest text-xs py-2 px-3.5 flex-shrink-0"
            >
              Report Issue
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}
