import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { scanController } from './controllers/scan.controller.js';
import { businessController } from './controllers/business.controller.js';
import { alertsController } from './controllers/alerts.controller.js';
import { reportsController } from './controllers/reports.controller.js';
import { evidenceController } from './controllers/evidence.controller.js';
import { dashboardController } from './controllers/dashboard.controller.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Static uploads folder
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health check
app.get('/api/health', (req, res) => {
  const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  res.json({
    status: 'healthy',
    service: 'FoodVigil Production API',
    database: 'SQLite Connected',
    geminiConfigured: Boolean(geminiKey),
    geminiKeyPreview: geminiKey ? `${geminiKey.substring(0, 6)}...${geminiKey.slice(-4)}` : 'Not Configured',
    timestamp: new Date().toISOString()
  });
});

// 1. AI Scan & OCR Endpoints (Supporting both /api/v1, /api, and direct routes)
app.post(['/api/v1/scan', '/api/scan', '/scan'], scanController.analyzeLabel);
app.post(['/api/v1/analyze-label', '/api/analyze-label', '/analyze-label'], scanController.analyzeLabel);
app.get(['/api/v1/products/recent', '/api/products/recent', '/products/recent'], scanController.getRecentScans);

// 2. FSSAI Business Verification Endpoint
app.get(['/api/v1/business/verify', '/api/business/verify', '/business/verify'], businessController.verifyBusiness);

// 3. Safety Alerts & Recalls Endpoint
app.get(['/api/v1/alerts', '/api/alerts', '/alerts'], alertsController.getAlerts);

// 4. Consumer Reports Endpoints
app.post(['/api/v1/reports', '/api/reports', '/reports'], reportsController.createReport);
app.get(['/api/v1/reports', '/api/reports', '/reports'], reportsController.getReports);

// 5. Evidence Vault Endpoints
app.get(['/api/v1/evidence', '/api/evidence', '/evidence'], evidenceController.getEvidence);
app.post(['/api/v1/evidence', '/api/evidence', '/evidence'], evidenceController.uploadEvidence);

// 6. User Dashboard Metrics Endpoint
app.get(['/api/v1/user/dashboard', '/api/user/dashboard', '/user/dashboard'], dashboardController.getDashboard);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found.` });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ success: false, error: err.message || 'Internal Server Error' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`=======================================================`);
  console.log(`🛡️  FoodVigil Production Backend API Running!`);
  console.log(`🌐  Local URL: http://localhost:${PORT}`);
  console.log(`📊  Health check: http://localhost:${PORT}/api/health`);
  console.log(`=======================================================`);
});
