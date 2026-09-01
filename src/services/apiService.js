import { 
  SAMPLE_PRODUCTS, 
  FOOD_ADDITIVES_DATA, 
  DEMO_FSSAI_REGISTRY, 
  SAFETY_ALERTS_DATA, 
  ADULTERATION_SCENARIOS, 
  INITIAL_USER_REPORTS, 
  INITIAL_EVIDENCE_ITEMS 
} from '../data/foodvigilData';

// Storage keys for local persistence
const STORAGE_REPORTS_KEY = 'foodvigil_user_reports';
const STORAGE_EVIDENCE_KEY = 'foodvigil_user_evidence';
const STORAGE_SCANS_KEY = 'foodvigil_user_scans';

// Helper to initialize local storage
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

export const apiService = {
  // 1. Scan / Analyze Food Label
  async analyzeLabel({ text, presetId, imagePreview }) {
    await new Promise((resolve) => setTimeout(resolve, 600)); // Simulate async network call

    // If preset selected
    if (presetId) {
      const match = SAMPLE_PRODUCTS.find((p) => p.id === presetId);
      if (match) {
        this.recordScan(match);
        return { success: true, data: match };
      }
    }

    // Dynamic parsing from raw ingredient text
    const cleanText = text || '';
    const insRegex = /(?:INS|E)[\s-]?([0-9]{3,4}[a-z]?)/gi;
    const detectedCodes = [];
    let match;
    while ((match = insRegex.exec(cleanText)) !== null) {
      const code = match[1].toLowerCase().replace(/[^0-9]/g, '');
      if (!detectedCodes.includes(code)) detectedCodes.push(code);
    }

    // Also check standard keywords
    if (cleanText.toLowerCase().includes('msg') || cleanText.toLowerCase().includes('monosodium glutamate')) {
      if (!detectedCodes.includes('621')) detectedCodes.push('621');
    }
    if (cleanText.toLowerCase().includes('tartrazine')) {
      if (!detectedCodes.includes('102')) detectedCodes.push('102');
    }
    if (cleanText.toLowerCase().includes('sodium benzoate')) {
      if (!detectedCodes.includes('211')) detectedCodes.push('211');
    }
    if (cleanText.toLowerCase().includes('aspartame')) {
      if (!detectedCodes.includes('951')) detectedCodes.push('951');
    }

    const hasHighRiskAdditives = detectedCodes.some(c => ['102', '110', '211', '319', '320', '951'].includes(c));
    const status = hasHighRiskAdditives ? 'urgent' : detectedCodes.length > 0 ? 'attention' : 'good';
    const statusLabel = status === 'good' ? 'Good Informational Standing' : status === 'attention' ? 'Needs Consumer Attention' : 'Important Information';

    const dynamicProduct = {
      id: `scan-${Date.now()}`,
      productName: 'Custom Food Product Formulation',
      brand: 'Scanned Food Package',
      category: 'Packaged Food',
      image: '📦',
      status,
      statusLabel,
      licenseNumber: 'Not detected on current crop',
      fssaiStatus: 'Pending Verification',
      manufacturerInfo: 'Extracted from image label',
      batchNumber: 'LOT-' + Math.floor(1000 + Math.random() * 9000),
      expiryDate: 'Check packaging stamp',
      labelCompleteness: 85,
      ingredients: cleanText.split(/[,;\n]+/).map(s => s.trim()).filter(Boolean),
      detectedAdditives: detectedCodes,
      allergens: cleanText.toLowerCase().includes('wheat') ? ['Contains Wheat (Gluten)'] : cleanText.toLowerCase().includes('milk') ? ['Contains Milk'] : ['Review packaging allergen declaration'],
      nutrition: {
        servingSize: '100g',
        calories: 240,
        protein: 4.2,
        totalFat: 9.5,
        saturatedFat: 3.2,
        transFat: 0.0,
        carbohydrates: 34.0,
        addedSugar: 4.5,
        dietaryFiber: 1.8,
        sodium: 420
      },
      observations: [
        `Extracted ${detectedCodes.length} identifiable food additives from provided ingredient text.`,
        'Nutritional composition estimated based on standard product category markers.'
      ],
      attentionItems: hasHighRiskAdditives 
        ? ['Contains additives categorized under High Attention (e.g. synthetic colors or preservatives).']
        : ['Standard regulatory additives detected; no critical alerts.'],
      explanation: `FoodVigil AI analyzed the declared ingredients. The formulation contains ${detectedCodes.length} additive(s). Consumers are encouraged to verify allergen declarations and expiry stamps on the physical pack.`,
      confidence: 91
    };

    this.recordScan(dynamicProduct);
    return { success: true, data: dynamicProduct };
  },

  // Record scan in local user history
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
    await new Promise((resolve) => setTimeout(resolve, 500));
    const cleanQuery = query.trim().toLowerCase();

    // Check exact license or name match in demo registry
    const match = DEMO_FSSAI_REGISTRY.find(
      (b) => b.licenseNumber.includes(cleanQuery) || b.businessName.toLowerCase().includes(cleanQuery) || b.brandName.toLowerCase().includes(cleanQuery)
    );

    if (match) {
      return { success: true, isDemoData: true, data: match };
    }

    // Dynamic structure validation for 14-digit numbers
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
          category: numOnly.startsWith('1') ? 'Central Food License (Manufacturing & Packaging)' : 'State Food Registration',
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
    await new Promise((resolve) => setTimeout(resolve, 300));
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
    await new Promise((resolve) => setTimeout(resolve, 600));

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

    // Save evidence items to vault
    if (reportData.evidenceItems && reportData.evidenceItems.length > 0) {
      const currentEvidence = getStoredData(STORAGE_EVIDENCE_KEY, INITIAL_EVIDENCE_ITEMS);
      const newEv = reportData.evidenceItems.map((item, idx) => ({
        id: `EVD-${Date.now()}-${idx}`,
        fileName: item.name,
        type: item.type || 'Submitted Evidence Document',
        relatedReport: `${trackingNumber} (${reportData.productName})`,
        uploadDate: new Date().toLocaleDateString('en-IN'),
        fileSize: item.size || '1.5 MB',
        fileType: 'image/jpeg',
        status: 'Attached to Active Dossier'
      }));
      setStoredData(STORAGE_EVIDENCE_KEY, [...newEv, ...currentEvidence]);
    }

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

    // Food Safety Awareness Score: Engagement metric (not medical/official)
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
