
import { query, run } from '../db/db.js';

export const evidenceController = {
  // GET /api/v1/evidence
  async getEvidence(req, res) {
    try {
      const rows = await query(`
        SELECT e.*, r.tracking_number, r.product_name 
        FROM evidence e 
        LEFT JOIN reports r ON e.report_id = r.id 
        ORDER BY e.created_at DESC
      `);

      const items = rows.map(r => ({
        id: r.id,
        fileName: r.file_name,
        type: r.file_type,
        relatedReport: r.tracking_number ? `${r.tracking_number} (${r.product_name})` : 'General Evidence',
        uploadDate: new Date(r.created_at).toLocaleDateString('en-IN'),
        fileSize: r.file_size,
        fileType: r.file_name.endsWith('.pdf') ? 'application/pdf' : 'image/jpeg',
        status: 'Attached to Active Dossier'
      }));

      res.json({ success: true, count: items.length, data: items });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  // POST /api/v1/evidence
  async uploadEvidence(req, res) {
    try {
      const { reportId, fileName, fileType, fileSize } = req.body;
      const id = `EVD-${Date.now()}`;
      await run(
        `INSERT INTO evidence (id, report_id, file_name, file_type, file_size, storage_path)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [id, reportId || null, fileName || 'Evidence_File.jpg', fileType || 'Tax Invoice', fileSize || '1.5 MB', `/uploads/${fileName || 'file.jpg'}`]
      );
      res.status(201).json({ success: true, data: { id, fileName, fileType, fileSize } });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
};
