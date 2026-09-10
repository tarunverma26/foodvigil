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
  Image as ImageIcon,
  Check
} from 'lucide-react';
import { createWorker } from 'tesseract.js';
import { SAMPLE_PRODUCTS } from '../data/foodvigilData';
import { apiService } from '../services/apiService';

export default function Scan() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'camera' | 'manual' | 'demo'
  const [manualText, setManualText] = useState('');
  const [productTitleInput, setProductTitleInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [ocrProgress, setOcrProgress] = useState(0);
  const [ocrStatusText, setOcrStatusText] = useState('');
  const [extractedOcrText, setExtractedOcrText] = useState('');
  const [uploadedImagePreview, setUploadedImagePreview] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Quick preset click
  const handleSelectPreset = (preset) => {
    navigate(`/scan/result?preset=${preset.id}`);
  };

  // Run Real Optical Character Recognition (OCR) using Tesseract.js
  const runOcrOnImage = async (imageSource) => {
    setIsProcessing(true);
    setOcrProgress(10);
    setOcrStatusText('Initializing Optical Character Recognition engine...');
    setErrorMessage('');

    try {
      const worker = await createWorker('eng');
      
      setOcrProgress(30);
      setOcrStatusText('Scanning label text & identifying character glyphs...');

      const ret = await worker.recognize(imageSource);
      await worker.terminate();

      const rawText = ret.data.text.trim();
      setOcrProgress(80);
      setOcrStatusText('Text recognized! Parsing ingredients, INS codes & nutrition...');

      if (rawText.length > 5) {
        setExtractedOcrText(rawText);
        // Process extracted text with API service
        const response = await apiService.analyzeLabel({
          text: rawText,
          presetId: null,
          imagePreview: typeof imageSource === 'string' ? imageSource : null,
          productName: productTitleInput || undefined
        });

        setOcrProgress(100);
        setTimeout(() => {
          setIsProcessing(false);
          if (response.success) {
            navigate('/scan/result', { state: { product: response.data } });
          }
        }, 600);
      } else {
        // Text is sparse, let user review or edit
        setOcrStatusText('Low contrast text detected. Please review or type ingredients.');
        setIsProcessing(false);
        setManualText(rawText);
        setActiveTab('manual');
      }
    } catch (ocrErr) {
      console.warn('Tesseract OCR error:', ocrErr);
      setErrorMessage('OCR engine encountered low image resolution. You can type or paste the ingredients manually.');
      setIsProcessing(false);
    }
  };

  // Image Upload handler
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target.result;
        setUploadedImagePreview(dataUrl);
        runOcrOnImage(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger camera
  const handleStartCamera = async () => {
    setCameraActive(true);
    setErrorMessage('');
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }
    } catch (err) {
      console.warn('Camera stream notice:', err);
    }
  };

  const handleCapturePhoto = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current || document.createElement('canvas');
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      setUploadedImagePreview(dataUrl);
      setCameraActive(false);

      // Stop camera stream tracks
      if (video.srcObject) {
        const tracks = video.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }

      runOcrOnImage(dataUrl);
    }
  };

  // Manual Submission handler
  const handleManualSubmit = async (e) => {
    e.preventDefault();
    if (!manualText.trim()) return;

    setIsProcessing(true);
    setOcrProgress(50);
    setOcrStatusText('Analyzing ingredients & matching statutory safety regulations...');

    try {
      const response = await apiService.analyzeLabel({
        text: manualText,
        presetId: null,
        imagePreview: null,
        productName: productTitleInput || undefined
      });

      if (response.success) {
        navigate('/scan/result', { state: { product: response.data } });
      }
    } catch (err) {
      setErrorMessage('Analysis service temporarily unavailable.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <canvas ref={canvasRef} className="hidden" />

      {/* Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
          <Camera className="w-3.5 h-3.5" />
          <span>Real Optical Label OCR Scanner</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-forest-900">
          Scan & Analyze Any Food Product
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
          Upload any packaged food photo, take a picture with your camera, or type ingredients. Our OCR engine extracts exact declared ingredients, INS additive codes, allergens, and nutritional facts.
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
            <span>Live Camera</span>
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
              onClick={() => setActiveTab('manual')}
              className="text-emerald-800 font-bold hover:underline"
            >
              Enter Text Manually
            </button>
          </div>
        )}

        {/* Live OCR Progress Bar */}
        {isProcessing && (
          <div className="p-5 bg-forest-50/80 rounded-2xl border border-emerald-300 space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between text-xs font-bold text-forest-900">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-emerald-600 animate-spin" />
                <span>{ocrStatusText}</span>
              </div>
              <span className="font-mono text-emerald-700">{ocrProgress}%</span>
            </div>

            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-600 transition-all duration-300 rounded-full"
                style={{ width: `${ocrProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* TAB 1: UPLOAD PHOTO */}
        {activeTab === 'upload' && !isProcessing && (
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
                  <p className="text-xs font-semibold text-emerald-800">Click to choose a different photo</p>
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
                  <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-[11px] font-bold">
                    Powered by Real OCR Engine
                  </span>
                </div>
              )}
            </label>
          </div>
        )}

        {/* TAB 2: LIVE CAMERA */}
        {activeTab === 'camera' && !isProcessing && (
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
              <div className="absolute inset-8 border-2 border-dashed border-white/70 rounded-xl pointer-events-none flex flex-col justify-between p-3">
                <div className="text-center">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-white/90 bg-black/50 px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                    Align Food Label Inside Box
                  </span>
                </div>
                <div className="text-center text-[10px] text-white/80 bg-black/40 px-2 py-0.5 rounded-full self-center">
                  Hold steady for clear character capture
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleCapturePhoto}
                className="btn-forest py-3 px-8 text-xs shadow-md font-bold uppercase tracking-wider"
              >
                <Camera className="w-4 h-4" />
                <span>Snap & Run OCR</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: MANUAL INGREDIENTS INPUT */}
        {activeTab === 'manual' && !isProcessing && (
          <form onSubmit={handleManualSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Product Name / Brand (Optional):
              </label>
              <input
                type="text"
                value={productTitleInput}
                onChange={(e) => setProductTitleInput(e.target.value)}
                placeholder="e.g. Britannia 50-50 Maska Chaska, Haldiram Bhujia, Maggi Noodles..."
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 mb-3"
              />

              <label className="block text-xs font-bold text-slate-700 mb-1">
                Ingredients List / Label Text: *
              </label>
              <textarea
                rows={5}
                required
                value={manualText}
                onChange={(e) => setManualText(e.target.value)}
                placeholder="e.g. Whole Wheat Flour (56%), Edible Vegetable Oil, Sugar, Salt, Flavour Enhancer (INS 621), Synthetic Colour (INS 102, INS 110), Preservative (INS 211), Antioxidant (INS 319)..."
                className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 font-mono leading-relaxed"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Type or paste ingredients separated by commas. Any INS or E numbers (e.g. INS 621, INS 102, INS 211, INS 319) will be detected automatically.
              </p>
            </div>

            <button
              type="submit"
              disabled={!manualText.trim()}
              className="w-full btn-forest py-3 text-xs font-bold"
            >
              <Sparkles className="w-4 h-4" />
              <span>Analyze Declared Ingredients</span>
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
              <span>Or Try Real-World Pre-loaded Benchmark Products</span>
            </h3>
            <p className="text-xs text-slate-500">
              Select verified packaged food formulations from major Indian FMCG brands.
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
            Verified Benchmarks
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
