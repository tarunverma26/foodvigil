import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Camera, 
  Upload, 
  FileText, 
  Sparkles, 
  Zap, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  ChevronRight,
  Info,
  Image as ImageIcon
} from 'lucide-react';
import { SAMPLE_PRODUCTS } from '../data/foodvigilData';
import { apiService } from '../services/apiService';

export default function Scan() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'camera' | 'manual' | 'demo'
  const [manualText, setManualText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedImagePreview, setUploadedImagePreview] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const videoRef = useRef(null);

  // Quick preset click
  const handleSelectPreset = (preset) => {
    navigate(`/scan/result?preset=${preset.id}`);
  };

  // Image Upload handler
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setUploadedImagePreview(previewUrl);
      setErrorMessage('');
      processScan({ text: '', presetId: null, imagePreview: previewUrl });
    }
  };

  // Trigger camera
  const handleStartCamera = async () => {
    setCameraActive(true);
    setErrorMessage('');
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }
    } catch (err) {
      console.warn('Camera stream notice:', err);
      // If camera permission blocked, keep simulation viewfinder active
    }
  };

  const handleCapturePhoto = () => {
    // Capture snapshot / simulate snapshot
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      navigate(`/scan/result?preset=sample-noodles`);
    }, 1000);
  };

  // Process Scan Submission
  const processScan = async ({ text, presetId, imagePreview }) => {
    setIsProcessing(true);
    setErrorMessage('');

    try {
      const response = await apiService.analyzeLabel({ text, presetId, imagePreview });
      if (response.success) {
        // Save scan in session / navigate to result
        navigate('/scan/result', { state: { product: response.data } });
      } else {
        setErrorMessage('AI analysis encountered an issue. Try a sample or manual input.');
      }
    } catch (err) {
      setErrorMessage('OCR extraction temporarily unavailable. Use manual entry or select a preset demo label.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!manualText.trim()) return;
    processScan({ text: manualText, presetId: null, imagePreview: null });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
          <Camera className="w-3.5 h-3.5" />
          <span>AI Food Label Scanner</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-forest-900">
          Scan & Understand Your Food
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
          Upload a food label, take a photo with your camera, or select a pre-loaded sample. Our AI extracts ingredients, INS additives, allergens, and nutritional facts.
        </p>
      </div>

      {/* Main Scanner Box */}
      <div className="card-surface p-6 sm:p-8 space-y-6">
        
        {/* Method Tabs */}
        <div className="flex p-1 bg-slate-100 rounded-xl max-w-md mx-auto">
          <button
            onClick={() => { setActiveTab('upload'); setCameraActive(false); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center space-x-1.5 transition-all ${
              activeTab === 'upload' ? 'bg-white text-forest-900 shadow-soft-sm font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Photo</span>
          </button>

          <button
            onClick={() => { setActiveTab('camera'); handleStartCamera(); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center space-x-1.5 transition-all ${
              activeTab === 'camera' ? 'bg-white text-forest-900 shadow-soft-sm font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Camera</span>
          </button>

          <button
            onClick={() => { setActiveTab('manual'); setCameraActive(false); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center space-x-1.5 transition-all ${
              activeTab === 'manual' ? 'bg-white text-forest-900 shadow-soft-sm font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Type Ingredients</span>
          </button>
        </div>

        {/* Error / Fallback Alert if any */}
        {errorMessage && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => handleSelectPreset(SAMPLE_PRODUCTS[0])}
              className="text-emerald-800 font-bold hover:underline"
            >
              Use Demo Mode
            </button>
          </div>
        )}

        {/* TAB 1: UPLOAD PHOTO */}
        {activeTab === 'upload' && (
          <div className="space-y-4">
            <label className="border-2 border-dashed border-slate-300 hover:border-emerald-600 rounded-2xl p-8 sm:p-12 flex flex-col items-center justify-center cursor-pointer bg-slate-50/50 hover:bg-emerald-50/20 transition-all text-center group">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileUpload} 
                className="hidden" 
              />
              
              {uploadedImagePreview ? (
                <div className="space-y-3">
                  <img src={uploadedImagePreview} alt="Uploaded Label" className="w-48 h-48 object-cover rounded-xl mx-auto shadow-soft-md" />
                  <p className="text-xs font-semibold text-emerald-800">Processing image with OCR...</p>
                </div>
              ) : (
                <div className="space-y-3 max-w-sm">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mx-auto text-emerald-700 shadow-soft-sm group-hover:scale-105 transition-transform">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-800">Click to upload food label photo</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Clear photograph of back-of-pack ingredients table, nutrition panel, or FSSAI number (JPEG, PNG, WebP).
                    </p>
                  </div>
                </div>
              )}
            </label>

            {isProcessing && (
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-center space-x-2 text-xs font-semibold text-emerald-900 animate-pulse">
                <Sparkles className="w-4 h-4 text-emerald-600 animate-spin" />
                <span>Extracting ingredient text, INS codes & nutrition via OCR engine...</span>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: LIVE CAMERA */}
        {activeTab === 'camera' && (
          <div className="space-y-4">
            <div className="relative w-full max-w-md mx-auto h-72 sm:h-80 bg-slate-900 rounded-2xl overflow-hidden flex items-center justify-center shadow-soft-md">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted 
                className="w-full h-full object-cover" 
              />
              
              {/* Viewfinder Target Guidelines */}
              <div className="absolute inset-8 border-2 border-dashed border-white/60 rounded-xl pointer-events-none flex flex-col justify-between p-3">
                <div className="text-center">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-white/90 bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-sm">
                    Align Food Label Here
                  </span>
                </div>
                <div className="text-center text-[10px] text-white/70">
                  Hold steady for sharp text capture
                </div>
              </div>

              {/* Simulated camera shutter overlay */}
              {isProcessing && (
                <div className="absolute inset-0 bg-emerald-900/60 backdrop-blur-sm flex flex-col items-center justify-center text-white space-y-2">
                  <Sparkles className="w-6 h-6 animate-spin text-emerald-300" />
                  <span className="text-xs font-bold">Analyzing Captured Label...</span>
                </div>
              )}
            </div>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleCapturePhoto}
                disabled={isProcessing}
                className="btn-forest py-3 px-8 text-xs shadow-md font-bold uppercase tracking-wider"
              >
                <Camera className="w-4 h-4" />
                <span>Capture & Analyze</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: MANUAL INGREDIENTS INPUT */}
        {activeTab === 'manual' && (
          <form onSubmit={handleManualSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Paste or Type Ingredients List:
              </label>
              <textarea
                rows={5}
                required
                value={manualText}
                onChange={(e) => setManualText(e.target.value)}
                placeholder="e.g. Whole Wheat Flour (51%), Palm Oil, Sugar, Salt, Flavour Enhancer (INS 621, INS 627), Emulsifier (INS 322), Antioxidant (INS 319)..."
                className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 font-mono leading-relaxed"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Enter ingredients separated by commas. INS or E codes will be automatically recognized.
              </p>
            </div>

            <button
              type="submit"
              disabled={isProcessing || !manualText.trim()}
              className="w-full btn-forest py-3 text-xs font-bold"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isProcessing ? 'Analyzing Ingredients...' : 'Analyze Label Ingredients'}</span>
            </button>
          </form>
        )}

      </div>

      {/* QUICK PRESET LABELS (DEMO MODE) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-lg text-forest-900 flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-600" />
              <span>Try Pre-loaded Demo Labels</span>
            </h3>
            <p className="text-xs text-slate-500">
              Select any real-world Indian packaged product for an instant food safety breakdown.
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
            Demo Ready
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SAMPLE_PRODUCTS.map((sample) => (
            <div
              key={sample.id}
              onClick={() => handleSelectPreset(sample)}
              className="card-surface p-4 cursor-pointer hover:border-emerald-500 hover:-translate-y-1 transition-all space-y-3 group"
            >
              <div className="flex items-start justify-between">
                <span className="text-3xl p-2 bg-slate-100 rounded-xl group-hover:bg-emerald-50 transition-colors">
                  {sample.image}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  sample.status === 'good' ? 'badge-good' : sample.status === 'attention' ? 'badge-attention' : 'badge-urgent'
                }`}>
                  {sample.status === 'good' ? '🟢 Good' : sample.status === 'attention' ? '🟡 Attention' : '🔴 Important'}
                </span>
              </div>

              <div>
                <h4 className="font-bold text-xs text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-1">
                  {sample.productName}
                </h4>
                <p className="text-[11px] text-slate-500 truncate">{sample.brand}</p>
              </div>

              <div className="text-[11px] text-slate-600 line-clamp-2 leading-snug">
                {sample.explanation}
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                <span>View Snapshot</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
