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
      <div className="text-center space-y-3 max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-md border border-[#E8DCB8] shadow-sm">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#EAF5EE] text-[#1F5D42] text-xs font-bold border border-[#BCE2CB]">
          <Sparkles className="w-3.5 h-3.5 text-[#E68A35]" />
          <span>Gemini Multimodal Vision AI Engine</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#1F5D42]">
          AI Food Label Scanner
        </h1>
        <p className="text-[#19352A] text-xs sm:text-sm leading-relaxed font-medium">
          Upload any physical food packaging photo. Gemini Multimodal AI extracts the exact printed ingredient list, INS additives, and categorizes them into Good, Neutral, and Harmful groups.
        </p>
      </div>

      {/* Tabs Switcher */}
      <div className="flex justify-center">
        <div className="inline-flex p-1 bg-white rounded-2xl border border-[#E8DCB8] shadow-sm">
          <button
            onClick={() => { setActiveTab('upload'); setCameraActive(false); setErrorMessage(''); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
              activeTab === 'upload'
                ? 'bg-[#1F5D42] text-white shadow-sm'
                : 'text-[#19352A] hover:text-[#1F5D42] hover:bg-[#FFF9EF]'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Upload Photo</span>
          </button>

          <button
            onClick={() => { setActiveTab('camera'); handleStartCamera(); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
              activeTab === 'camera'
                ? 'bg-[#1F5D42] text-white shadow-sm'
                : 'text-[#19352A] hover:text-[#1F5D42] hover:bg-[#FFF9EF]'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Live Camera</span>
          </button>

          <button
            onClick={() => { setActiveTab('manual'); setCameraActive(false); setErrorMessage(''); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
              activeTab === 'manual'
                ? 'bg-[#1F5D42] text-white shadow-sm'
                : 'text-[#19352A] hover:text-[#1F5D42] hover:bg-[#FFF9EF]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Type Ingredients</span>
          </button>

          <button
            onClick={() => { setActiveTab('demo'); setCameraActive(false); setErrorMessage(''); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
              activeTab === 'demo'
                ? 'bg-[#1F5D42] text-white shadow-sm'
                : 'text-[#19352A] hover:text-[#1F5D42] hover:bg-[#FFF9EF]'
            }`}
          >
            <Zap className="w-4 h-4 text-[#E68A35]" />
            <span>Quick Demos</span>
          </button>
        </div>
      </div>

      {/* ERROR BANNER */}
      {errorMessage && (
        <div className="p-4 bg-[#FDF1F0] border-2 border-[#F5C2C0] rounded-2xl flex items-start space-x-3 text-xs text-[#B52F2B] animate-fadeIn">
          <AlertOctagon className="w-5 h-5 text-[#D9534F] flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-sm text-[#A82D29]">Scan Analysis Notice</h4>
            <p className="text-[#B52F2B] leading-relaxed font-medium">{errorMessage}</p>
            <p className="text-[11px] text-[#A82D29]">
              Tip: Ensure the packaging label is upright, well-lit, and the ingredients list text is in focus.
            </p>
          </div>
        </div>
      )}

      {/* ACTIVE PROCESSING STATE */}
      {isProcessing && (
        <div className="card-surface p-8 text-center space-y-4 animate-fadeIn border-2 border-[#246B4A]">
          <div className="w-14 h-14 rounded-2xl bg-[#EAF5EE] flex items-center justify-center mx-auto text-[#246B4A]">
            <RefreshCw className="w-7 h-7 animate-spin text-[#246B4A]" />
          </div>
          <div className="space-y-1">
            <h3 className="font-display font-extrabold text-lg text-[#1F5D42]">
              Gemini Vision AI Engine Processing
            </h3>
            <p className="text-xs text-[#64776B] max-w-md mx-auto">{statusText}</p>
          </div>
        </div>
      )}

      {/* TAB 1: UPLOAD PHOTO */}
      {!isProcessing && activeTab === 'upload' && (
        <div className="card-surface p-6 sm:p-10 space-y-6">
          <div className="border-2 border-dashed border-[#E8DCB8] hover:border-[#246B4A] rounded-3xl p-8 sm:p-12 text-center transition-all bg-[#FFF9EF]/50 hover:bg-[#EAF5EE]/40 group">
            <input
              type="file"
              accept="image/*"
              id="file-upload"
              onChange={handleFileUpload}
              className="hidden"
            />
            <label htmlFor="file-upload" className="cursor-pointer space-y-4 block">
              <div className="w-16 h-16 rounded-2xl bg-[#EAF5EE] group-hover:bg-white flex items-center justify-center text-[#1F5D42] mx-auto transition-colors shadow-soft-sm border border-[#BCE2CB]">
                <Upload className="w-8 h-8 text-[#246B4A]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-bold text-base text-[#19352A] group-hover:text-[#1F5D42]">
                  Click to select food label photo
                </h3>
                <p className="text-xs text-[#64776B]">
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
          <div className="relative rounded-3xl overflow-hidden bg-[#19352A] aspect-video max-w-xl mx-auto shadow-xl border border-[#E8DCB8]">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 border-2 border-[#E68A35]/60 rounded-3xl pointer-events-none m-6 border-dashed animate-pulse" />
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={handleCapturePhoto}
              className="btn-forest py-3 px-8 text-xs font-bold uppercase tracking-wider shadow-md flex items-center space-x-2"
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
            <label className="block text-xs font-bold uppercase tracking-wider text-[#19352A]">
              Product Title (Optional)
            </label>
            <input
              type="text"
              value={productTitleInput}
              onChange={(e) => setProductTitleInput(e.target.value)}
              placeholder="e.g. Masala Instant Noodles or Mango Nectar"
              className="w-full p-3 bg-[#FFF9EF] border border-[#E8DCB8] rounded-xl text-xs text-[#19352A] focus:outline-none focus:border-[#246B4A]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#19352A]">
              Declared Ingredients List
            </label>
            <textarea
              rows={5}
              value={manualText}
              onChange={(e) => setManualText(e.target.value)}
              placeholder="Paste or type ingredients list, e.g.: Refined Wheat Flour, Palm Oil, Iodised Salt, INS 621, INS 102, INS 211, INS 319, Spices..."
              className="w-full p-3.5 bg-[#FFF9EF] border border-[#E8DCB8] rounded-xl text-xs text-[#19352A] font-sans focus:outline-none focus:border-[#246B4A]"
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
          <div className="text-center text-xs text-[#64776B] font-semibold">
            Choose a verified FMCG packaging formulation to inspect:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {SAMPLE_PRODUCTS.map((prod) => (
              <button
                key={prod.id}
                onClick={() => handleSelectPreset(prod)}
                className="card-surface p-5 text-left hover:border-[#246B4A] hover:shadow-md transition-all group space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{prod.image}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    prod.status === 'urgent' ? 'badge-urgent' :
                    prod.status === 'attention' ? 'badge-attention' : 'badge-good'
                  }`}>
                    {prod.statusLabel.split(' ')[0]}
                  </span>
                </div>
                <h4 className="font-bold text-xs text-[#19352A] group-hover:text-[#1F5D42]">
                  {prod.productName}
                </h4>
                <p className="text-[11px] text-[#64776B]">{prod.brand}</p>
                <div className="text-[10px] font-mono text-[#1F5D42] font-semibold pt-1 border-t border-[#E8DCB8]">
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
