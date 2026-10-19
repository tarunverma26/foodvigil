import { setCorsHeaders } from './_lib/cors.js';
import { query, run, store, isPostgres } from './_lib/db.js';

export default async function handler(req, res) {
  if (setCorsHeaders(req, res)) return;

  if (req.method === 'POST') {
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
      } = req.body || {};

      if (!productName || !brand || !batchNumber || !storeName || !city) {
        return res.status(400).json({ success: false, message: 'Missing required report fields.' });
      }

      const trackingNumber = `FV-IN-2026-${Math.floor(100000 + Math.random() * 900000)}`;
      const id = `REP-${Date.now()}`;
      const evidenceCount = (evidenceItems || []).length;

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
        evidenceCount,
        created_at: new Date().toISOString()
      };

      if (isPostgres) {
        try {
          await run(
            `INSERT INTO reports (
              id, tracking_number, product_name, brand, category, 
              fssai_license, batch_number, store_name, city, 
              description, health_impact, status, status_step, evidence_count
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Submitted', 1, ?)`,
            [id, trackingNumber, productName, brand, category, fssaiLicense || '', batchNumber, storeName, city, description, healthImpact || '', evidenceCount]
          );
        } catch (e) {
          console.warn('DB report write notice:', e.message);
        }
      }

      // Add to in-memory store
      store.reports.unshift(createdReport);

      return res.status(201).json({ success: true, data: createdReport });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  if (req.method === 'GET') {
    try {
      if (isPostgres) {
        try {
          const rows = await query('SELECT * FROM reports ORDER BY created_at DESC');
          if (rows && rows.length > 0) {
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
            return res.status(200).json({ success: true, count: reports.length, data: reports });
          }
        } catch (e) {
          console.warn('DB get reports notice:', e.message);
        }
      }

      return res.status(200).json({
        success: true,
        count: store.reports.length,
        data: store.reports.map(r => ({
          ...r,
          dateSubmitted: r.dateSubmitted || (r.created_at ? new Date(r.created_at).toLocaleDateString('en-IN') : 'Today')
        }))
      });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  return res.status(405).json({ success: false, error: 'Method Not Allowed' });
}
