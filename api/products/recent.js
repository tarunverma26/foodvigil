import { setCorsHeaders } from '../_lib/cors.js';
import { store, isPostgres, query } from '../_lib/db.js';

export default async function handler(req, res) {
  if (setCorsHeaders(req, res)) return;

  try {
    if (isPostgres) {
      try {
        const rows = await query('SELECT * FROM scanned_products ORDER BY created_at DESC LIMIT 10');
        if (rows && rows.length > 0) {
          const products = rows.map(r => ({
            id: r.id,
            productName: r.product_name,
            brand: r.brand,
            category: r.category,
            status: r.status,
            statusLabel: r.status_label,
            ingredients: JSON.parse(r.ingredients_json || '[]'),
            detectedAdditives: JSON.parse(r.detected_additives_json || '[]'),
            allergens: JSON.parse(r.allergens_json || '[]'),
            nutrition: JSON.parse(r.nutrition_json || '{}'),
            licenseNumber: r.license_number,
            batchNumber: r.batch_number,
            expiryDate: r.expiry_date,
            explanation: r.explanation,
            confidence: r.confidence
          }));
          return res.status(200).json({ success: true, data: products });
        }
      } catch (e) {
        console.warn('DB recent scans notice:', e.message);
      }
    }

    return res.status(200).json({
      success: true,
      data: store.scans.slice(0, 10)
    });

  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
