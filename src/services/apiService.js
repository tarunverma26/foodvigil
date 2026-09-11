import { 
  SAMPLE_PRODUCTS, 
  FOOD_ADDITIVES_DATA, 
  DEMO_FSSAI_REGISTRY, 
  SAFETY_ALERTS_DATA, 
  ADULTERATION_SCENARIOS, 
  INITIAL_USER_REPORTS, 
  INITIAL_EVIDENCE_ITEMS 
} from '../data/foodvigilData';

const getBackendApiBase = () => {
  if (typeof window !== 'undefined') {
    // Relative path leverages Vite dev server proxy or same-origin production backend
    return '/api/v1';
  }
  return 'http://127.0.0.1:5000/api/v1';
};

const BACKEND_API_BASE = getBackendApiBase();

// Storage keys for local persistence
const STORAGE_REPORTS_KEY = 'foodvigil_user_reports';
const STORAGE_EVIDENCE_KEY = 'foodvigil_user_evidence';
const STORAGE_SCANS_KEY = 'foodvigil_user_scans';

const getStoredData = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (e) {
    return fallback;
  }
};

const setStoredData = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Storage error', e);
  }
};

async function fetchWithFallback(path, options) {
  const isBrowser = typeof window !== 'undefined';
  const hostname = isBrowser ? window.location.hostname : 'localhost';

  const candidateUrls = [
    // 1. Relative path (Vite proxy)
    path.startsWith('/') ? path : `/api/v1/${path}`,
    // 2. Direct LAN / Host IP on port 5000
    isBrowser && hostname ? `http://${hostname}:5000${path.startsWith('/') ? path : '/api/v1/' + path}` : null,
    // 3. Direct Loopback IPv4
    `http://127.0.0.1:5000${path.startsWith('/') ? path : '/api/v1/' + path}`,
    // 4. Direct localhost
    `http://localhost:5000${path.startsWith('/') ? path : '/api/v1/' + path}`
  ].filter(Boolean);

  const uniqueUrls = [...new Set(candidateUrls)];

  let lastError = null;
  for (const url of uniqueUrls) {
    try {
      const response = await fetch(url, options);
      // If 404 or connection issue, try next candidate
      if (response.status === 404) {
        continue;
      }
      return response;
    } catch (err) {
      lastError = err;
    }
  }

  // If all failed, throw the last error
  throw lastError || new Error('Unable to connect to backend server');
}

export const apiService = {
  // 1. Multimodal Gemini Scan & Direct Label Analysis
  async analyzeLabel({ text, presetId, imagePreview, productName }) {
    // 1. Preset handling
    if (presetId) {
      const match = SAMPLE_PRODUCTS.find((p) => p.id === presetId);
      if (match) {
        this.recordScan(match);
        return { success: true, data: match };
      }
    }

    // 2. Direct Backend Call (Gemini Multimodal Vision API)
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 90000);

      console.log(`🚀 Dispatching image analysis to backend with multi-origin fallback...`);

      const response = await fetchWithFallback('/api/v1/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text, 
          presetId, 
          imageBase64: imagePreview, 
          productName,
          clientTimestamp: Date.now()
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      const json = await response.json().catch(() => null);

      if (response.ok && json && json.success && json.data) {
        console.log('✅ Gemini Vision analysis received successfully from backend');
        this.recordScan(json.data);
        return { success: true, data: json.data, provider: json.provider };
      }

      // Explicit error handling from backend
      if (json && (json.error || json.message)) {
        console.error('❌ Backend returned scan error:', json.error || json.message);
        return { 
          success: false, 
          error: json.error || json.message,
          isExplicitError: true
        };
      }

      if (!response.ok) {
        return {
          success: false,
          error: `Backend server error (${response.status}: ${response.statusText}). Please check server logs and retry.`,
          isExplicitError: true
        };
      }
    } catch (networkErr) {
      if (networkErr.name === 'AbortError') {
        console.error('❌ Request aborted due to 90s client timeout');
        return {
          success: false,
          error: 'Gemini Vision AI request timed out after 90 seconds. Please verify your network connection and try again with a compressed image.',
          isExplicitError: true
        };
      }
      console.error('❌ Backend connection network error:', networkErr);
      return {
        success: false,
        error: `Unable to connect to the backend server. Please ensure the backend API server is running on port 5000.`,
        isExplicitError: true
      };
    }

    // If text was manually provided, process text
    if (text && text.trim().length > 3) {
      const cleanText = text.trim();
      const parts = cleanText.split(/[,;\n•]+/).map(s => s.trim()).filter(Boolean);
      const ingredients = parts.map(name => {
        const isHarmful = /ins\s*(102|110|211|319|320|951)|msg|tartrazine|benzoate|tbhq|aspartame/i.test(name);
        const isGood = /whole|atta|wheat|oats|milk|fruit|curcumin|honey|spice|herb/i.test(name);
        return {
          name,
          insCode: (name.match(/(?:ins|e)\s*([0-9]{3,4})/i) || [])[1] || null,
          classification: isHarmful ? 'harmful' : isGood ? 'good' : 'neutral',
          reason: isHarmful ? 'Chemical additive or synthetic dye requiring consumer awareness.' : isGood ? 'Natural whole food component.' : 'Standard culinary ingredient.'
        };
      });

      const goodGroup = ingredients.filter(i => i.classification === 'good');
      const neutralGroup = ingredients.filter(i => i.classification === 'neutral');
      const harmfulGroup = ingredients.filter(i => i.classification === 'harmful');

      const manualProduct = {
        id: `scan-manual-${Date.now()}`,
        productName: productName || 'Manual Ingredient Formulation',
        productGuess: productName || 'Manual Ingredient Formulation',
        brand: 'Custom Input',
        category: 'Custom Formulation',
        image: '📝',
        status: harmfulGroup.length > 0 ? 'urgent' : 'good',
        statusLabel: harmfulGroup.length > 0 ? 'Important Health Information' : 'Good Standing',
        licenseNumber: '10014021001234',
        fssaiStatus: 'Active & Verified',
        manufacturerInfo: 'Entered manually by consumer',
        batchNumber: `MAN-${Math.floor(1000 + Math.random() * 9000)}`,
        expiryDate: 'N/A',
        labelCompleteness: 90,
        ingredients: parts,
        structuredIngredients: ingredients,
        groups: {
          good: goodGroup,
          neutral: neutralGroup,
          harmful: harmfulGroup,
          unclear: []
        },
        detectedAdditives: ingredients.filter(i => i.insCode).map(i => i.insCode),
        allergens: cleanText.toLowerCase().includes('wheat') ? ['Contains Wheat (Gluten)'] :
                   cleanText.toLowerCase().includes('milk') ? ['Contains Milk'] :
                   cleanText.toLowerCase().includes('soy') ? ['Contains Soy'] : ['Review packaging allergen declaration'],
        nutrition: {
          servingSize: '100g',
          calories: 280,
          protein: 5.2,
          totalFat: 11.4,
          saturatedFat: 4.2,
          transFat: 0.0,
          carbohydrates: 38.5,
          addedSugar: 4.8,
          dietaryFiber: 2.4,
          sodium: 460
        },
        observations: [`Parsed ${parts.length} ingredients from manual text entry.`],
        attentionItems: harmfulGroup.length > 0 ? harmfulGroup.map(h => `${h.name}: ${h.reason}`) : ['No high-attention chemical additives detected.'],
        explanation: `Analysis completed for manual ingredient entry. Detected ${harmfulGroup.length} high-attention additive(s).`,
        confidence: 95
      };

      this.recordScan(manualProduct);
      return { success: true, data: manualProduct };
    }

    // Explicit error message if backend is unreachable
    return {
      success: false,
      error: 'Unable to connect to the backend server at http://localhost:5000. Please ensure the backend API server is running.',
      isExplicitError: true
    };
  },

  recordScan(product) {
    const scans = getStoredData(STORAGE_SCANS_KEY, []);
    const exists = scans.find(s => s.id === product.id);
    if (!exists) {
      setStoredData(STORAGE_SCANS_KEY, [product, ...scans.slice(0, 19)]);
    }
  },

  getScannedProducts() {
    return getStoredData(STORAGE_SCANS_KEY, SAMPLE_PRODUCTS.slice(0, 2));
  },

  // 2. FSSAI & Business Verification
  async verifyBusiness(query) {
    try {
      const response = await fetchWithFallback(`/api/v1/business/verify?query=${encodeURIComponent(query)}`);
      if (response.ok) {
        const json = await response.json();
        if (json.success && json.data) {
          return { success: true, isDemoData: json.isDemoData, data: json.data };
        }
      }
    } catch (e) {
      console.warn('Backend verify call notice:', e.message);
    }

    // Fallback
    await new Promise((resolve) => setTimeout(resolve, 400));
    const cleanQuery = query.trim().toLowerCase();
    const match = DEMO_FSSAI_REGISTRY.find(
      (b) => b.licenseNumber.includes(cleanQuery) || b.businessName.toLowerCase().includes(cleanQuery) || b.brandName.toLowerCase().includes(cleanQuery)
    );

    if (match) {
      return { success: true, isDemoData: true, data: match };
    }

    const numOnly = cleanQuery.replace(/[^0-9]/g, '');
    if (numOnly.length === 14) {
      const stateCode = numOnly.substring(1, 3);
      const year = `20${numOnly.substring(3, 5)}`;
      return {
        success: true,
        isDemoData: true,
        data: {
          licenseNumber: numOnly,
          businessName: `Registered Food Operator (#${numOnly.substring(8)})`,
          brandName: 'Commercial Trade Entity',
          premisesAddress: `Plot ${numOnly.substring(10)}, Industrial Zone, State Code ${stateCode}, India`,
          category: numOnly.startsWith('1') ? 'Central Food License (Manufacturing)' : 'State Food Registration',
          status: 'ACTIVE',
          statusCode: 'active',
          issueDate: `10-May-${year}`,
          validUpto: '09-May-2028',
          hygieneRating: 4,
          inspectionGrade: 'Grade A (Standard Compliance)',
          lastVerified: new Date().toISOString().split('T')[0],
          isDemoData: true,
          publicNotices: []
        }
      };
    }

    return { 
      success: false, 
      message: 'No matching FSSAI record or business found. Verify the 14-digit number or business spelling.' 
    };
  },

  // 3. Safety Alerts & Recalls
  async getAlerts(filters = {}) {
    try {
      const params = new URLSearchParams(filters);
      const response = await fetchWithFallback(`/api/v1/alerts?${params.toString()}`);
      if (response.ok) {
        const json = await response.json();
        if (json.success && json.data) {
          return { success: true, data: json.data };
        }
      }
    } catch (e) {
      console.warn('Backend alerts call notice:', e.message);
    }

    // Fallback
    await new Promise((resolve) => setTimeout(resolve, 200));
    let results = [...SAFETY_ALERTS_DATA];
    if (filters.severity && filters.severity !== 'all') {
      results = results.filter(a => a.severity.toLowerCase() === filters.severity.toLowerCase());
    }
    if (filters.category && filters.category !== 'all') {
      results = results.filter(a => a.category.toLowerCase().includes(filters.category.toLowerCase()));
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      results = results.filter(a => 
        a.title.toLowerCase().includes(q) || 
        a.product.toLowerCase().includes(q) || 
        a.manufacturer.toLowerCase().includes(q)
      );
    }
    return { success: true, data: results };
  },

  // 4. Adulteration Awareness Scenarios
  getAdulterationGuides() {
    return ADULTERATION_SCENARIOS;
  },

  // 5. Reports Management
  async submitReport(reportData) {
    try {
      const response = await fetchWithFallback('/api/v1/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reportData)
      });
      if (response.ok) {
        const json = await response.json();
        if (json.success && json.data) {
          const currentReports = getStoredData(STORAGE_REPORTS_KEY, INITIAL_USER_REPORTS);
          setStoredData(STORAGE_REPORTS_KEY, [json.data, ...currentReports]);
          return { success: true, data: json.data };
        }
      }
    } catch (e) {
      console.warn('Backend report submit notice:', e.message);
    }

    const trackingNumber = `FV-IN-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    const newReport = {
      id: `FV-REP-${Date.now()}`,
      trackingNumber,
      dateSubmitted: new Date().toLocaleDateString('en-IN'),
      status: 'Submitted',
      statusStep: 1,
      ...reportData,
      evidenceCount: (reportData.evidenceItems || []).length
    };

    const currentReports = getStoredData(STORAGE_REPORTS_KEY, INITIAL_USER_REPORTS);
    const updatedReports = [newReport, ...currentReports];
    setStoredData(STORAGE_REPORTS_KEY, updatedReports);

    return { success: true, data: newReport };
  },

  getReports() {
    return getStoredData(STORAGE_REPORTS_KEY, INITIAL_USER_REPORTS);
  },

  // 6. Evidence Vault
  getEvidence() {
    return getStoredData(STORAGE_EVIDENCE_KEY, INITIAL_EVIDENCE_ITEMS);
  },

  // 7. User Dashboard Metrics
  getUserDashboard() {
    const scans = this.getScannedProducts();
    const reports = this.getReports();
    const evidence = this.getEvidence();

    const baseScore = 65;
    const scanBonus = Math.min(20, scans.length * 5);
    const reportBonus = Math.min(15, reports.length * 5);
    const awarenessScore = Math.min(100, baseScore + scanBonus + reportBonus);

    return {
      scansCount: scans.length,
      reportsCount: reports.length,
      evidenceCount: evidence.length,
      awarenessScore,
      recentScans: scans.slice(0, 3),
      recentReports: reports.slice(0, 3),
      activeAlertsCount: SAFETY_ALERTS_DATA.length
    };
  }
};
