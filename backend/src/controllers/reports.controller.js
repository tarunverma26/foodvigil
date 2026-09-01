import { query, run, get } from '../db/db.js';

export const reportsController = {
  // POST /api/v1/reports
  async createReport(req, res) {
    try {
      const { 
        productName, 
        brand, 
        category, 
        fssaiLicense, 
        batchNumber, 
        storeName, 
        city, 
        description, 
        healthImpact,
        evidenceItems 
      } = req.body;

      if (!productName || !brand || !batchNumber || !storeName || !city) {
        return res.status(400).json({ success: false, message: 'Missing required report fields.' });
      }

      const trackingNumber = `FV-IN-2026-${Math.floor(100000 + Math.random() * 900000)}`;
      const id = `REP-${Date.now()}`;
      const evidenceCount = (evidenceItems || []).length;

      await run(
        `INSERT INTO reports (
          id, tracking_number, product_name, brand, category, 
          fssai_license, batch_number, store_name, city, 
          description, health_impact, status, status_step, evidence_count
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Submitted', 1, ?)`,
        [id, trackingNumber, productName, brand, category, fssaiLicense || '', batchNumber, storeName, city, description, healthImpact || '', evidenceCount]
      );

      // Save attached evidence items to DB
      if (evidenceItems && evidenceItems.length > 0) {
        for (let i = 0; i < evidenceItems.length; i++) {
          const item = evidenceItems[i];
          const evId = `EVD-${Date.now()}-${i}`;
          await run(
            `INSERT INTO evidence (id, report_id, file_name, file_type, file_size, storage_path)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [evId, id, item.name || `Document_${i+1}.jpg`, item.type || 'Tax Invoice', item.size || '1.5 MB', `/uploads/${item.name || 'evidence.jpg'}`]
          );
        }
      }

      const createdReport = {
        id,
        trackingNumber,
        productName,
        brand,
        category,
        fssaiLicense,
        batchNumber,
        storeName,
        city,
        description,
        healthImpact,
        status: 'Submitted',
        statusStep: 1,
        dateSubmitted: new Date().toLocaleDateString('en-IN'),
        evidenceCount
      };

      res.status(201).json({ success: true, data: createdReport });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  // GET /api/v1/reports
  async getReports(req, res) {
    try {
      const rows = await query('SELECT * FROM reports ORDER BY created_at DESC');
      const reports = rows.map(r => ({
        id: r.id,
        trackingNumber: r.tracking_number,
        productName: r.product_name,
        brand: r.brand,
        category: r.category,
        fssaiLicense: r.fssai_license,
        batchNumber: r.batch_number,
        storeName: r.store_name,
        city: r.city,
        description: r.description,
        healthImpact: r.health_impact,
        status: r.status,
        statusStep: r.status_step,
        evidenceCount: r.evidence_count,
        dateSubmitted: new Date(r.created_at).toLocaleDateString('en-IN')
      }));
      res.json({ success: true, count: reports.length, data: reports });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
};
