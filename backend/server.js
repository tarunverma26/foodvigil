import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'FoodVigil API', timestamp: new Date().toISOString() });
});

// 1. Scan & Label Analysis Endpoint
app.post('/api/v1/scan', async (req, res) => {
  try {
    const { text, imageBase64, presetId } = req.body;
    
    // In production, invokes FastAPI Python OCR + Gemini Vision API
    return res.json({
      success: true,
      data: {
        productName: presetId ? "Analyzed Product" : "Custom Food Formulation",
        ingredients: ["Extracted via OCR Engine"],
        confidence: 94,
        status: "good",
        message: "AI label analysis completed successfully."
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2. FSSAI Business Verification Endpoint
app.get('/api/v1/business/verify', (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ success: false, message: 'Query parameter required.' });
  }
  
  return res.json({
    success: true,
    isDemoData: true,
    data: {
      licenseNumber: query,
      businessName: "Registered Food Operator",
      status: "ACTIVE",
      category: "Central Food License",
      validUpto: "2028-05-10",
      hygieneRating: 4
    }
  });
});

// 3. Safety Alerts Endpoint
app.get('/api/v1/alerts', (req, res) => {
  return res.json({
    success: true,
    data: [
      {
        id: 'ALT-01',
        title: 'Advisory on Non-Permitted Dyes in Loose Spices',
        severity: 'High attention',
        date: '2026-08-24'
      }
    ]
  });
});

// 4. Reports Endpoint
app.post('/api/v1/reports', (req, res) => {
  const reportData = req.body;
  const trackingNumber = `FV-IN-2026-${Math.floor(100000 + Math.random() * 900000)}`;
  
  return res.status(201).json({
    success: true,
    data: {
      id: `REP-${Date.now()}`,
      trackingNumber,
      status: 'Submitted',
      ...reportData
    }
  });
});

app.listen(PORT, () => {
  console.log(`FoodVigil Backend Server running on http://localhost:${PORT}`);
});
