import React, { useState } from 'react';
import { 
  Wallet, 
  X, 
  CheckCircle2, 
  ExternalLink, 
  Copy, 
  Check, 
  LogOut, 
  Sparkles,
  ShieldCheck,
  Zap,
  Coins
} from 'lucide-react';
import { algorandWalletService } from '../services/algorandWallet';

export default function WalletConnectModal({ isOpen, onClose, onWalletConnected, currentWallet }) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleConnect = async (provider) => {
    setIsConnecting(true);
    try {
      const wallet = await algorandWalletService.connectWallet(provider);
      if (onWalletConnected) {
        onWalletConnected(wallet);
      }
      onClose();
    } catch (e) {
      console.error('Wallet connect error:', e);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    algorandWalletService.disconnectWallet();
    if (onWalletConnected) {
      onWalletConnected(null);
    }
    onClose();
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-950/80 backdrop-blur-md animate-fadeIn">
      <div className="card-surface w-full max-w-md p-6 space-y-6 shadow-2xl relative border border-brand-border">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-brand-muted hover:text-brand-text hover:bg-brand-bg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
            <Coins className="w-3.5 h-3.5 text-forest-800" />
            <span>x402 Algorand Micropayments</span>
          </div>
          <h3 className="font-display font-black text-xl text-forest-900">
            {currentWallet ? 'Connected Algorand Wallet' : 'Connect Algorand Wallet'}
          </h3>
          <p className="text-xs text-brand-muted">
            {currentWallet 
              ? 'Ready for instant $0.005 USDC pay-per-use deep analysis on Algorand TestNet.' 
              : 'Select your preferred Algorand wallet provider to unlock Deep AI Safety Reports.'}
          </p>
        </div>

        {/* IF ALREADY CONNECTED */}
        {currentWallet ? (
          <div className="space-y-4">
            <div className="p-4 bg-brand-bg/60 rounded-2xl border border-brand-border space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-brand-text capitalize">
                    {currentWallet.provider} Wallet (Connected)
                  </span>
                </div>
                <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                  Algorand TestNet
                </span>
              </div>

              <div className="flex items-center justify-between text-xs bg-white p-2.5 rounded-xl border border-brand-border shadow-soft-sm">
                <span className="font-mono text-[11px] text-brand-text truncate max-w-[240px]">
                  {currentWallet.address}
                </span>
                <button
                  onClick={() => handleCopy(currentWallet.address)}
                  className="p-1.5 text-brand-muted hover:text-forest-900 transition-colors"
                  title="Copy address"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Balances */}
              <div className="grid grid-cols-2 gap-2 text-center text-xs pt-1">
                <div className="p-2 bg-emerald-50 rounded-xl border border-emerald-200/80">
                  <span className="text-[10px] text-emerald-800 font-semibold block">USDC Balance (ASA #10458941)</span>
                  <span className="font-bold text-forest-900 text-sm">{currentWallet.balanceUSDC} USDC</span>
                </div>
                <div className="p-2 bg-white rounded-xl border border-brand-border shadow-soft-sm">
                  <span className="text-[10px] text-brand-muted font-semibold block">ALGO Balance (Gas)</span>
                  <span className="font-bold text-brand-text text-sm">{currentWallet.balanceALGO} ALGO</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={handleDisconnect}
                className="w-full btn-secondary text-xs py-2.5 text-rose-700 hover:bg-rose-50 border-rose-200 font-bold"
              >
                <LogOut className="w-4 h-4" />
                <span>Disconnect Wallet</span>
              </button>
            </div>
          </div>
        ) : (
          /* WALLET OPTIONS */
          <div className="space-y-3">
            {/* 1. Pera Wallet */}
            <button
              onClick={() => handleConnect('pera')}
              disabled={isConnecting}
              className="w-full p-3.5 bg-white hover:bg-brand-bg border-2 border-brand-border hover:border-forest-800 rounded-2xl flex items-center justify-between transition-all group shadow-soft-sm text-left"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center font-black text-slate-900 shadow-sm text-base">
                  🟡
                </div>
                <div>
                  <h4 className="font-bold text-xs text-brand-text group-hover:text-forest-900">
                    Pera Wallet (Algorand)
                  </h4>
                  <p className="text-[11px] text-brand-muted">Official Algorand Mobile & Web Wallet</p>
                </div>
              </div>
              <span className="text-xs font-bold text-forest-800">Connect →</span>
            </button>

            {/* 2. Defly Wallet */}
            <button
              onClick={() => handleConnect('defly')}
              disabled={isConnecting}
              className="w-full p-3.5 bg-white hover:bg-brand-bg border-2 border-brand-border hover:border-forest-800 rounded-2xl flex items-center justify-between transition-all group shadow-soft-sm text-left"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center font-black text-white shadow-sm text-base">
                  🟣
                </div>
                <div>
                  <h4 className="font-bold text-xs text-brand-text group-hover:text-forest-900">
                    Defly Wallet (Algorand DeFi)
                  </h4>
                  <p className="text-[11px] text-brand-muted">DeFi & Smart Contract Mobile Wallet</p>
                </div>
              </div>
              <span className="text-xs font-bold text-forest-800">Connect →</span>
            </button>

            {/* 3. Algorand TestNet 1-Click Faucet Wallet (Demo Ready) */}
            <button
              onClick={() => handleConnect('testnet')}
              disabled={isConnecting}
              className="w-full p-3.5 bg-emerald-50/70 hover:bg-emerald-100/70 border-2 border-emerald-400/80 rounded-2xl flex items-center justify-between transition-all group shadow-soft-sm text-left"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-forest-900 text-brand-orange flex items-center justify-center font-black shadow-sm text-base">
                  ⚡
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-xs text-forest-900">
                      Algorand TestNet Demo Account
                    </h4>
                    <span className="text-[9px] font-bold uppercase tracking-wider bg-brand-orange text-white px-1.5 py-0.2 rounded">
                      Instant
                    </span>
                  </div>
                  <p className="text-[11px] text-brand-muted">Pre-funded with 50 USDC TestNet balance</p>
                </div>
              </div>
              <span className="text-xs font-bold text-forest-900">1-Click Sign →</span>
            </button>
          </div>
        )}

        {/* GoPlausible Facilitator Guarantee */}
        <div className="p-3 bg-brand-bg/80 border border-brand-border rounded-xl text-[11px] text-brand-muted flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-forest-800 flex-shrink-0" />
            <span>Facilitator: <strong className="text-brand-text">GoPlausible (x402 protocol)</strong></span>
          </div>
          <span className="font-mono text-[10px] text-brand-muted font-bold">$0.005 USDC/scan</span>
        </div>

      </div>
    </div>
  );
}
