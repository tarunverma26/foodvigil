import { setCorsHeaders } from './_lib/cors.js';
import { SAFETY_ALERTS } from './_lib/data.js';
import { query, isPostgres } from './_lib/db.js';

export default async function handler(req, res) {
  if (setCorsHeaders(req, res)) return;

  try {
    const { search, severity, category } = req.query;

    if (isPostgres) {
      try {
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
        if (rows && rows.length > 0) {
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
          return res.status(200).json({ success: true, count: alerts.length, data: alerts });
        }
      } catch (e) {
        console.warn('DB alerts query notice:', e.message);
      }
    }

    // In-memory filter
    let results = [...SAFETY_ALERTS];

    if (severity && severity !== 'all') {
      results = results.filter(a => a.severity.toLowerCase() === severity.toLowerCase());
    }
    if (category && category !== 'all') {
      results = results.filter(a => a.category.toLowerCase().includes(category.toLowerCase()));
    }
    if (search && search.trim()) {
      const q = search.toLowerCase();
      results = results.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.product.toLowerCase().includes(q) ||
        a.manufacturer.toLowerCase().includes(q)
      );
    }

    return res.status(200).json({
      success: true,
      count: results.length,
      data: results
    });

  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
