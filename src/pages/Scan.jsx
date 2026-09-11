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
  Check,
  AlertOctagon,
  Eye,
  Minimize2
} from 'lucide-react';
import { SAMPLE_PRODUCTS } from '../data/foodvigilData';
import { apiService } from '../services/apiService';
import { compressImageForVision } from '../utils/imageCompressor';

export default function Scan() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'camera' | 'manual' | 'demo'
  const [manualText, setManualText] = useState('');
  const [productTitleInput, setProductTitleInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [uploadedImagePreview, setUploadedImagePreview] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Quick preset click
  const handleSelectPreset = (preset) => {
    navigate('/scan/result', { state: { scanData: preset } });
  };

  // Direct Multimodal Gemini Vision Scan Pipeline with Image Compression
  const processImageWithGemini = async (rawImageSource) => {
    setIsProcessing(true);
    setStatusText('Optimizing packaging photo for fast AI processing...');
    setErrorMessage('');

    try {
      // 1. Client-side Image Compression (max 1280px, quality 0.85) to prevent network lag & timeouts
      const compressedImage = await compressImageForVision(rawImageSource, 1280, 1280, 0.85);

      setStatusText('Analyzing label with Gemini Multimodal Vision AI...');

      // 2. Direct call to single multimodal endpoint (with fresh image data)
      const response = await apiService.analyzeLabel({
        text: null,
        presetId: null,
        imagePreview: compressedImage,
        productName: productTitleInput || undefined
      });

      if (response.success && response.data) {
        setStatusText('Structured ingredient data extracted! Loading safety dossier...');
        setTimeout(() => {
          setIsProcessing(false);
          navigate('/scan/result', { state: { scanData: response.data } });
        }, 400);
      } else {
        setIsProcessing(false);
        setErrorMessage(
          response.error || 'Gemini Vision AI analysis could not complete. Please provide a clear, well-lit photo of the label.'
        );
      }
    } catch (err) {
      console.error('Gemini Multimodal Scan error:', err);
      setIsProcessing(false);
      setErrorMessage(
        `Analysis failed: ${err.message || 'Unable to reach backend vision service'}. Please retry with a clear photo.`
      );
    }
  };

  // Image Upload handler
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setErrorMessage('');
      const reader = new FileReader();
      reader.onload = async (event) => {
        const dataUrl = event.target.result;
        setUploadedImagePreview(dataUrl);
        await processImageWithGemini(dataUrl);
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
      setErrorMessage('Could not open camera stream. Please upload an image file instead.');
    }
  };

  const handleCapturePhoto = async () => {
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

      await processImageWithGemini(dataUrl);
    }
  };

  // Manual Submission handler
  const handleManualSubmit = async (e) => {
    e.preventDefault();
    if (!manualText.trim()) return;

    setIsProcessing(true);
    setStatusText('Parsing declared ingredients & classifying safety thresholds...');
    setErrorMessage('');

    try {
      const response = await apiService.analyzeLabel({
        text: manualText,
        presetId: null,
        imagePreview: null,
        productName: productTitleInput || undefined
      });

      if (response.success && response.data) {
        navigate('/scan/result', { state: { scanData: response.data } });
      } else {
        setErrorMessage(response.error || 'Could not parse manual ingredients.');
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
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Gemini Multimodal Vision AI Engine</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-forest-900">
          AI Food Label Scanner
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
          Upload any physical food packaging photo. Gemini Multimodal AI extracts the exact printed ingredient list, INS additives, and categorizes them into Good, Neutral, and Harmful groups.
        </p>
      </div>

      {/* Tabs Switcher */}
      <div className="flex justify-center">
        <div className="inline-flex p-1 bg-slate-200/80 rounded-2xl border border-slate-300/80 shadow-soft-sm">
          <button
            onClick={() => { setActiveTab('upload'); setCameraActive(false); setErrorMessage(''); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
              activeTab === 'upload'
                ? 'bg-white text-forest-900 shadow-soft-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Upload Photo</span>
          </button>

          <button
            onClick={() => { setActiveTab('camera'); handleStartCamera(); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
              activeTab === 'camera'
                ? 'bg-white text-forest-900 shadow-soft-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Live Camera</span>
          </button>

          <button
            onClick={() => { setActiveTab('manual'); setCameraActive(false); setErrorMessage(''); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
              activeTab === 'manual'
                ? 'bg-white text-forest-900 shadow-soft-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Type Ingredients</span>
          </button>

          <button
            onClick={() => { setActiveTab('demo'); setCameraActive(false); setErrorMessage(''); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
              activeTab === 'demo'
                ? 'bg-white text-forest-900 shadow-soft-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Quick Demos</span>
          </button>
        </div>
      </div>

      {/* ERROR BANNER */}
      {errorMessage && (
        <div className="p-4 bg-rose-50 border-2 border-rose-300 rounded-2xl flex items-start space-x-3 text-xs text-rose-900 animate-fadeIn">
          <AlertOctagon className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-sm text-rose-950">Scan Analysis Notice</h4>
            <p className="text-rose-800 leading-relaxed font-medium">{errorMessage}</p>
            <p className="text-[11px] text-rose-700">
              Tip: Ensure the packaging label is upright, well-lit, and the ingredients list text is in focus.
            </p>
          </div>
        </div>
      )}

      {/* ACTIVE PROCESSING STATE */}
      {isProcessing && (
        <div className="card-surface p-8 text-center space-y-4 animate-fadeIn border-2 border-emerald-500/50">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto text-emerald-600">
            <RefreshCw className="w-7 h-7 animate-spin text-emerald-600" />
          </div>
          <div className="space-y-1">
            <h3 className="font-display font-extrabold text-lg text-forest-900">
              Gemini Vision AI Engine Processing
            </h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto">{statusText}</p>
          </div>
        </div>
      )}

      {/* TAB 1: UPLOAD PHOTO */}
      {!isProcessing && activeTab === 'upload' && (
        <div className="card-surface p-6 sm:p-10 space-y-6">
          <div className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-3xl p-8 sm:p-12 text-center transition-all bg-slate-50/50 hover:bg-emerald-50/20 group">
            <input
              type="file"
              accept="image/*"
              id="file-upload"
              onChange={handleFileUpload}
              className="hidden"
            />
            <label htmlFor="file-upload" className="cursor-pointer space-y-4 block">
              <div className="w-16 h-16 rounded-2xl bg-forest-50 group-hover:bg-forest-100 flex items-center justify-center text-emerald-700 mx-auto transition-colors shadow-soft-sm">
                <Upload className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-bold text-base text-slate-800 group-hover:text-forest-900">
                  Click to select food label photo
                </h3>
                <p className="text-xs text-slate-500">
                  Auto-compressed & analyzed via Gemini Multimodal Vision API (JPG, PNG, WEBP)
                </p>
              </div>
              <span className="btn-forest text-xs py-2.5 px-6 inline-flex shadow-sm">
                Browse Files
              </span>
            </label>
          </div>
        </div>
      )}

      {/* TAB 2: LIVE CAMERA */}
      {!isProcessing && activeTab === 'camera' && (
        <div className="card-surface p-6 sm:p-8 space-y-6 text-center">
          <div className="relative rounded-3xl overflow-hidden bg-slate-950 aspect-video max-w-xl mx-auto shadow-xl border border-slate-800">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 border-2 border-emerald-400/40 rounded-3xl pointer-events-none m-6 border-dashed animate-pulse" />
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={handleCapturePhoto}
              className="btn-forest py-3 px-8 text-xs font-bold uppercase tracking-wider shadow-lg flex items-center space-x-2"
            >
              <Camera className="w-4 h-4 text-emerald-300" />
              <span>Capture Label</span>
            </button>
            <button
              onClick={() => { setCameraActive(false); setActiveTab('upload'); }}
              className="btn-secondary text-xs py-3 px-4"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: TYPE INGREDIENTS */}
      {!isProcessing && activeTab === 'manual' && (
        <form onSubmit={handleManualSubmit} className="card-surface p-6 sm:p-8 space-y-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Product Title (Optional)
            </label>
            <input
              type="text"
              value={productTitleInput}
              onChange={(e) => setProductTitleInput(e.target.value)}
              placeholder="e.g. Masala Instant Noodles or Mango Nectar"
              className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-600"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Declared Ingredients List
            </label>
            <textarea
              rows={5}
              value={manualText}
              onChange={(e) => setManualText(e.target.value)}
              placeholder="Paste or type ingredients list, e.g.: Refined Wheat Flour, Palm Oil, Iodised Salt, INS 621, INS 102, INS 211, INS 319, Spices..."
              className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-sans focus:outline-none focus:border-emerald-600"
            />
          </div>

          <button
            type="submit"
            className="w-full btn-forest py-3.5 text-xs font-bold uppercase tracking-wider shadow-md"
          >
            Analyze Ingredients
          </button>
        </form>
      )}

      {/* TAB 4: QUICK DEMOS */}
      {!isProcessing && activeTab === 'demo' && (
        <div className="space-y-4">
          <div className="text-center text-xs text-slate-500 font-semibold">
            Choose a verified FMCG packaging formulation to inspect:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {SAMPLE_PRODUCTS.map((prod) => (
              <button
                key={prod.id}
                onClick={() => handleSelectPreset(prod)}
                className="card-surface p-5 text-left hover:border-emerald-500 hover:shadow-soft-md transition-all group space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{prod.image}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    prod.status === 'urgent' ? 'bg-rose-100 text-rose-800' :
                    prod.status === 'attention' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {prod.statusLabel.split(' ')[0]}
                  </span>
                </div>
                <h4 className="font-bold text-xs text-slate-900 group-hover:text-forest-900">
                  {prod.productName}
                </h4>
                <p className="text-[11px] text-slate-500">{prod.brand}</p>
                <div className="text-[10px] font-mono text-emerald-700 font-semibold pt-1 border-t border-slate-100">
                  {prod.detectedAdditives.length} Additive(s) Flagged →
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
