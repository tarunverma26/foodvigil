import { query } from '../db/db.js';

export const alertsController = {
  // GET /api/v1/alerts
  async getAlerts(req, res) {
    try {
      const { search, severity, category } = req.query;
      let sql = 'SELECT * FROM safety_alerts WHERE 1=1';
      const params = [];

      if (severity && severity !== 'all') {
        sql += ' AND LOWER(severity) = LOWER(?)';
        params.push(severity);
      }
      if (category && category !== 'all') {
        sql += ' AND LOWER(category) LIKE LOWER(?)';
        params.push(`%${category}%`);
      }
      if (search && search.trim()) {
        sql += ' AND (LOWER(title) LIKE LOWER(?) OR LOWER(product) LIKE LOWER(?) OR LOWER(manufacturer) LIKE LOWER(?))';
        params.push(`%${search}%`, `%${search}%`, `%${search}%`);
      }

      sql += ' ORDER BY date_issued DESC';

      const rows = await query(sql, params);
      const alerts = rows.map(r => ({
        id: r.id,
        title: r.title,
        category: r.category,
        severity: r.severity,
        date: r.date_issued,
        region: r.region,
        product: r.product,
        manufacturer: r.manufacturer,
        reason: r.reason,
        source: r.source,
        actionRequired: r.action_required
      }));

      res.json({ success: true, count: alerts.length, data: alerts });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
};
