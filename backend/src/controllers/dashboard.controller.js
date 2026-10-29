import { query, get } from '../db/db.js';

export const dashboardController = {
  // GET /api/v1/user/dashboard
  async getDashboard(req, res) {
    try {
      const scansCountRow = await get('SELECT COUNT(*) as count FROM scanned_products');
      const reportsCountRow = await get('SELECT COUNT(*) as count FROM reports');
      const evidenceCountRow = await get('SELECT COUNT(*) as count FROM evidence');
      const alertsCountRow = await get('SELECT COUNT(*) as count FROM safety_alerts');

      const scansCount = scansCountRow ? scansCountRow.count : 0;
      const reportsCount = reportsCountRow ? reportsCountRow.count : 0;
      const evidenceCount = evidenceCountRow ? evidenceCountRow.count : 0;
      const activeAlertsCount = alertsCountRow ? alertsCountRow.count : 0;

      // Engagement awareness score calculation
      const baseScore = 65;
      const scanBonus = Math.min(20, scansCount * 5);
      const reportBonus = Math.min(15, reportsCount * 5);
      const awarenessScore = Math.min(100, baseScore + scanBonus + reportBonus);

      const recentScansRows = await query('SELECT * FROM scanned_products ORDER BY created_at DESC LIMIT 3');
      const recentReportsRows = await query('SELECT * FROM reports ORDER BY created_at DESC LIMIT 3');

      const recentScans = recentScansRows.map(r => ({
        id: r.id,
        productName: r.product_name,
        brand: r.brand,
        status: r.status,
        statusLabel: r.status_label,
        licenseNumber: r.license_number,
        image: '📦'
      }));

      const recentReports = recentReportsRows.map(r => ({
        id: r.id,
        trackingNumber: r.tracking_number,
        productName: r.product_name,
        category: r.category,
        city: r.city,
        status: r.status
      }));

      res.json({
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
      res.status(500).json({ success: false, error: err.message });
    }
  }
};
