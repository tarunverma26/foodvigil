import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Coins, 
  ExternalLink, 
  Activity, 
  Lock, 
  Unlock,
  Layers,
  ArrowRight,
  FileCheck,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { algorandWalletService } from '../services/algorandWallet';

export default function DeepAnalysisModal({ isOpen, onClose, product, currentWallet, onOpenWalletModal }) {
  const [statusState, setStatusState] = useState(null); // { step, title, details, payload }
  const [isProcessing, setIsProcessing] = useState(false);
  const [unlockedResult, setUnlockedResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleStartPaymentFlow = async () => {
    setIsProcessing(true);
    setErrorMsg('');
    setUnlockedResult(null);

    try {
      const result = await algorandWalletService.executeX402PaymentAndAnalysis({
        ingredients: product.ingredients?.join(', ') || '',
        productName: product.productName,
        category: product.category,
        onStatusChange: (status) => {
          setStatusState(status);
        }
      });

      if (result.success) {
        setUnlockedResult(result.data);
        confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
      }
    } catch (e) {
      console.error(e);
      setErrorMsg('x402 payment handshake encountered an error.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-lg animate-fadeIn overflow-y-auto">
      <div className="card-surface w-full max-w-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative border border-emerald-500/30 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1 pr-8">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
            <Coins className="w-3.5 h-3.5 text-emerald-600" />
            <span>x402 Micropayment Protocol on Algorand</span>
          </div>
          <h2 className="font-display font-black text-2xl text-forest-900">
            Deep AI Toxicological & Adulteration Analysis
          </h2>
          <p className="text-xs text-slate-600">
            Pay-per-use premium intelligence unlocked via server-side HTTP 402 flow for <strong className="text-slate-900">{product.productName}</strong>.
          </p>
        </div>

        {/* Product Summary Tag */}
        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between text-xs">
          <div>
            <span className="text-[10px] text-slate-400 font-semibold block">Target Formulation:</span>
            <span className="font-bold text-slate-900">{product.productName}</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-semibold block">x402 Price:</span>
            <span className="font-mono font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded">
              $0.005 USDC
            </span>
          </div>
        </div>

        {/* INITIAL STATE: PROMPT TO PAY */}
        {!isProcessing && !unlockedResult && (
          <div className="space-y-5">
            <div className="p-5 bg-gradient-to-br from-forest-900 to-emerald-900 text-white rounded-2xl space-y-3">
              <div className="flex items-center space-x-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>What will be unlocked:</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-200">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Deep Toxicological Profiling</strong>: ADI limits, endocrine/cellular risks & vulnerable population alerts.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Chemical Adulteration Screening</strong>: Metanil Yellow, Sudan Red, Formalin & foreign fat detection.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>On-Chain Proof Certificate</strong>: Verifiable transaction receipt on Algorand TestNet via GoPlausible.</span>
                </li>
              </ul>
            </div>

            {/* Wallet status banner */}
            <div className="p-3 bg-slate-100 rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <span className={`w-2 h-2 rounded-full ${currentWallet ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                <span className="text-slate-700 font-medium">
                  {currentWallet 
                    ? `Connected: ${currentWallet.provider.toUpperCase()} (${currentWallet.address.substring(0, 10)}...)` 
                    : 'No wallet connected (will prompt on click)'}
                </span>
              </div>
              {currentWallet && (
                <span className="font-mono text-emerald-800 font-bold">
                  {currentWallet.balanceUSDC} USDC
                </span>
              )}
            </div>

            <button
              onClick={handleStartPaymentFlow}
              className="w-full btn-forest py-3.5 text-xs font-bold uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
            >
              <Coins className="w-4 h-4 text-emerald-300" />
              <span>Unlock with $0.005 USDC (Trigger HTTP 402 Flow)</span>
              <ArrowRight className="w-4 h-4 text-emerald-300" />
            </button>
          </div>
        )}

        {/* REAL-TIME 4-STEP x402 SEQUENCE ANIMATION */}
        {isProcessing && statusState && (
          <div className="p-6 bg-slate-900 text-white rounded-2xl space-y-5 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-emerald-400 animate-spin" />
                <span className="font-mono text-xs font-bold text-emerald-300">
                  x402 Algorand Settlement Engine Active
                </span>
              </div>
              <span className="text-xs font-mono text-slate-400">Step {statusState.step} / 5</span>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-sm text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>{statusState.title}</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-mono bg-slate-950 p-3 rounded-xl border border-slate-800">
                {statusState.details}
              </p>
            </div>

            {/* Stepper progress bars */}
            <div className="grid grid-cols-4 gap-2 pt-2">
              {[1, 2, 3, 4].map((s) => (
                <div 
                  key={s} 
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    statusState.step >= s ? 'bg-emerald-500' : 'bg-slate-800'
                  }`} 
                />
              ))}
            </div>
          </div>
        )}

        {/* UNLOCKED RESULT DISPLAY (HTTP 200 OK) */}
        {unlockedResult && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Header Success Badge */}
            <div className="p-4 bg-emerald-50 border-2 border-emerald-500/80 rounded-2xl flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                    HTTP 200 OK — Payment Verified On-Chain
                  </span>
                  <h4 className="font-bold text-sm text-forest-900">
                    FoodVigil Certified AI Safety Dossier Unlocked
                  </h4>
                </div>
              </div>
              <span className="badge-good text-[10px] font-mono px-2 py-0.5 rounded-md font-bold">
                $0.005 USDC Settled
              </span>
            </div>

            {/* On-Chain Settlement Proof Banner */}
            <div className="p-3.5 bg-slate-900 text-white rounded-xl space-y-1.5 text-xs font-mono">
              <div className="flex justify-between items-center text-slate-400 text-[10px]">
                <span>ALGORAND TESTNET TX ID:</span>
                <span className="text-emerald-400">GoPlausible Verified</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-emerald-300 text-xs truncate max-w-[340px]">
                  {unlockedResult.paymentDetails.txId}
                </span>
                <a
                  href={`https://lora.algokit.io/testnet/transaction/${unlockedResult.paymentDetails.txId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 text-[11px]"
                >
                  <span>Explorer</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Deep Safety Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 block font-semibold">Safety Score</span>
                <span className="font-black text-forest-900 text-base">{unlockedResult.deepSafetyMetrics.overallSafetyScore}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 block font-semibold">Risk Classification</span>
                <span className="font-bold text-amber-700 text-xs uppercase">{unlockedResult.deepSafetyMetrics.overallRiskClassification}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 block font-semibold">Chemical Additives</span>
                <span className="font-black text-slate-900 text-base">{unlockedResult.deepSafetyMetrics.totalAdditivesDetected} Detected</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 block font-semibold">FSSAI Index</span>
                <span className="font-bold text-emerald-700 text-xs">Conforms</span>
              </div>
            </div>

            {/* Toxicological Profiles */}
            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Deep Toxicological Profiles ({unlockedResult.toxicologicalProfiles.length})</span>
              </h4>

              <div className="space-y-2.5">
                {unlockedResult.toxicologicalProfiles.map((item, i) => (
                  <div key={i} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 text-xs">
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-slate-900">{item.name}</span>
                      <span className="text-[10px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                        ADI: {item.adiLimit}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-snug">
                      <strong className="text-slate-700">Health Impact:</strong> {item.healthConcerns.join(', ')}
                    </p>
                    <p className="text-[11px] text-emerald-800 leading-snug">
                      <strong className="text-emerald-900">Consumer Action:</strong> {item.recommendation}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Adulteration Screening */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
              <h4 className="font-bold text-slate-900">Commodity Adulteration Screen</h4>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                <div>• Non-Permitted Dyes: <strong className="text-emerald-700">{unlockedResult.adulterationScreening.suspectedNonPermittedDyes}</strong></div>
                <div>• Chemical Neutralizers: <strong className="text-emerald-700">{unlockedResult.adulterationScreening.syntheticNeutralizers}</strong></div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full btn-secondary text-xs py-2.5 font-bold"
            >
              Close Dossier
            </button>

          </div>
        )}

      </div>
    </div>
  );
}
