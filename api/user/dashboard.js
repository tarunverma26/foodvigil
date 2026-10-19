import { setCorsHeaders } from '../_lib/cors.js';
import { SAFETY_ALERTS } from '../_lib/data.js';
import { store, isPostgres, get, query } from '../_lib/db.js';

export default async function handler(req, res) {
  if (setCorsHeaders(req, res)) return;

  try {
    let scansCount = store.scans.length;
    let reportsCount = store.reports.length;
    let evidenceCount = store.evidence.length;
    let activeAlertsCount = SAFETY_ALERTS.length;
    let recentScans = store.scans.slice(0, 3);
    let recentReports = store.reports.slice(0, 3);

    if (isPostgres) {
      try {
        const scansCountRow = await get('SELECT COUNT(*) as count FROM scanned_products');
        const reportsCountRow = await get('SELECT COUNT(*) as count FROM reports');
        const evidenceCountRow = await get('SELECT COUNT(*) as count FROM evidence');
        const alertsCountRow = await get('SELECT COUNT(*) as count FROM safety_alerts');

        if (scansCountRow) scansCount = Number(scansCountRow.count);
        if (reportsCountRow) reportsCount = Number(reportsCountRow.count);
        if (evidenceCountRow) evidenceCount = Number(evidenceCountRow.count);
        if (alertsCountRow) activeAlertsCount = Number(alertsCountRow.count);

        const recentScansRows = await query('SELECT * FROM scanned_products ORDER BY created_at DESC LIMIT 3');
        const recentReportsRows = await query('SELECT * FROM reports ORDER BY created_at DESC LIMIT 3');

        if (recentScansRows && recentScansRows.length > 0) {
          recentScans = recentScansRows.map(r => ({
            id: r.id,
            productName: r.product_name,
            brand: r.brand,
            status: r.status,
            statusLabel: r.status_label,
            licenseNumber: r.license_number,
            image: '??'
          }));
        }

        if (recentReportsRows && recentReportsRows.length > 0) {
          recentReports = recentReportsRows.map(r => ({
            id: r.id,
            trackingNumber: r.tracking_number,
            productName: r.product_name,
            category: r.category,
            city: r.city,
            status: r.status
          }));
        }
      } catch (e) {
        console.warn('DB dashboard metrics notice:', e.message);
      }
    }

    // Engagement awareness score calculation
    const baseScore = 65;
    const scanBonus = Math.min(20, scansCount * 5);
    const reportBonus = Math.min(15, reportsCount * 5);
    const awarenessScore = Math.min(100, baseScore + scanBonus + reportBonus);

    return res.status(200).json({
      success: true,
      data: {
        scansCount,
        reportsCount,
        evidenceCount,
        awarenessScore,
        activeAlertsCount,
        recentScans,
        recentReports
      }
    });

  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
